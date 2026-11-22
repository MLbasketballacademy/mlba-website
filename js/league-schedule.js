/* Fall league schedule page: date + team filters over the schedule that is already in the HTML.
   The schedule itself is plain HTML (readable without JavaScript); this only shows/hides games.
   It also keeps a page that was left open (e.g. on a phone) from silently showing an old schedule:
   see "Published-schedule check" below. */
(function () {
  var root = document.getElementById('sched');
  var form = document.getElementById('sched-filters');
  if (!root || !form) return;
  var dateSel = document.getElementById('sched-date');
  var teamSel = document.getElementById('sched-team');
  var count = document.getElementById('sched-count');
  var empty = document.getElementById('sched-empty');
  var days = Array.prototype.slice.call(root.querySelectorAll('.sched-day'));
  var games = Array.prototype.slice.call(root.querySelectorAll('.sched-game'));

  // Date options from the day headings; team options from the team names in the games.
  days.forEach(function (day) {
    var o = document.createElement('option');
    o.value = day.getAttribute('data-date');
    o.textContent = day.querySelector('.sched-date').textContent;
    dateSel.appendChild(o);
  });
  var teams = {};
  root.querySelectorAll('.sg-team').forEach(function (el) {
    // Guest (non-league) opponents carry no data-team and are not offered in the team filter.
    if (!el.hasAttribute('data-team')) return;
    teams[el.getAttribute('data-team')] = {
      label: el.getAttribute('data-label'),
      order: el.getAttribute('data-order')
    };
  });
  Object.keys(teams).sort(function (a, b) { return teams[a].order.localeCompare(teams[b].order); }).forEach(function (key) {
    var o = document.createElement('option');
    o.value = key;
    o.textContent = teams[key].label;
    teamSel.appendChild(o);
  });

  function apply() {
    var d = dateSel.value, t = teamSel.value, shown = 0;
    games.forEach(function (g) {
      var ok = (!d || g.getAttribute('data-date') === d) &&
               (!t || (' ' + g.getAttribute('data-teams') + ' ').indexOf(' ' + t + ' ') !== -1);
      g.hidden = !ok;
      if (ok) shown++;
      g.querySelectorAll('.sg-team').forEach(function (el) {
        el.classList.toggle('is-selected', !!t && el.getAttribute('data-team') === t);
      });
    });
    root.querySelectorAll('.sched-gym').forEach(function (gym) {
      gym.hidden = !gym.querySelector('.sched-game:not([hidden])');
    });
    days.forEach(function (day) {
      day.hidden = !day.querySelector('.sched-game:not([hidden])');
    });
    empty.hidden = shown !== 0;
    count.textContent = (d || t)
      ? 'Showing ' + shown + (shown === 1 ? ' game' : ' games') + (t ? ' for ' + teams[t].label : '') + '.'
      : 'Showing all ' + shown + ' games.';
  }

  // Filters carried through an automatic update (?team=&date=). Values not on this schedule are ignored.
  var params = new URLSearchParams(location.search);
  function pick(sel, value) {
    if (!value) return;
    for (var i = 0; i < sel.options.length; i++) if (sel.options[i].value === value) { sel.value = value; return; }
  }
  pick(dateSel, params.get('date'));
  pick(teamSel, params.get('team'));

  var lastFilterUse = 0;
  function filterUsed() { lastFilterUse = Date.now(); }
  [dateSel, teamSel].forEach(function (sel) {
    ['focus', 'pointerdown', 'keydown'].forEach(function (ev) { sel.addEventListener(ev, filterUsed); });
    sel.addEventListener('change', function () { filterUsed(); apply(); });
  });
  document.getElementById('sched-reset').addEventListener('click', function () {
    filterUsed(); dateSel.value = ''; teamSel.value = ''; apply();
  });
  form.hidden = false;
  apply();

  // ── Published-schedule check ─────────────────────────────────────────────────────────────────────
  // The page carries the version of the schedule it shows (<meta name="schedule-version">, a hash of the
  // generated schedule — scripts/schedule-version.mjs). schedule-version.json holds the published version.
  // It is checked on load, when the page becomes visible again, when the browser comes back online, and
  // about every 2 minutes while visible, always bypassing the browser cache. Only a DIFFERENT version reloads
  // the page — keeping the selected team and date — and never while someone is using a filter. A failed
  // check changes nothing; the next one tries again.
  //
  // GitHub Pages' CDN caches every file for up to 10 minutes and ignores query strings, so for a few minutes
  // after a publish the version file and the page can disagree. If a reload still lands on the old page, it
  // waits one check interval and tries again (at most MAX_ATTEMPTS times), then asks the visitor to refresh.
  var metaV = document.querySelector('meta[name="schedule-version"]');
  var metaP = document.querySelector('meta[name="schedule-published"]');
  var pageVersion = metaV ? metaV.getAttribute('content') : '';
  if (!pageVersion || !window.fetch) return;

  var CHECK_EVERY_MS = 2 * 60 * 1000;
  var MIN_GAP_MS = 10 * 1000;       // visibility / online / pageshow can fire together: one check is enough
  var FILTER_QUIET_MS = 8 * 1000;   // no reload within 8 s of someone touching a filter
  var MAX_ATTEMPTS = 5;             // 5 tries, ~2 min apart, covers the CDN's 10-minute cache
  var timer = null, deferTimer = null, inFlight = false, lastCheck = 0, pending = null, holdUntil = 0;

  var notice = document.createElement('p');
  notice.className = 'sched-updated-notice';
  notice.setAttribute('role', 'status');
  notice.hidden = true;
  form.parentNode.insertBefore(notice, form);
  var noticeTimer = null;
  function showNotice(text, sticky) {
    notice.textContent = text;
    notice.hidden = false;
    clearTimeout(noticeTimer);
    if (!sticky) noticeTimer = setTimeout(function () { notice.hidden = true; }, 12000);
  }
  function formatPublished(iso) {
    var d = new Date(iso);
    if (isNaN(d.getTime())) return '';
    try {
      return d.toLocaleString('en-US', { timeZone: 'America/Los_Angeles', weekday: 'short', month: 'short', day: 'numeric', hour: 'numeric', minute: '2-digit', timeZoneName: 'short' });
    } catch (e) { return d.toLocaleString(); }
  }

  // Arrived here through an automatic update?
  var arrivedFor = params.get('sv') || '';
  var attempt = parseInt(params.get('sa') || '0', 10) || 0;
  if (params.get('su') === '1' && arrivedFor) {
    if (arrivedFor === pageVersion) {
      var when = metaP ? formatPublished(metaP.getAttribute('content')) : '';
      showNotice('Schedule updated' + (when ? ' — published ' + when : '') + '.');
    } else {
      holdUntil = Date.now() + CHECK_EVERY_MS; // the CDN still served the old page: wait before trying again
    }
    if (window.history && history.replaceState) {
      ['su', 'sv', 'sa', 'team', 'date'].forEach(function (k) { params.delete(k); });
      var qs = params.toString();
      history.replaceState(null, '', location.pathname + (qs ? '?' + qs : '') + location.hash);
    }
  }

  function filterBusy() { return Date.now() - lastFilterUse < FILTER_QUIET_MS; }

  function reloadTo(v) {
    var next = arrivedFor === v.version ? attempt + 1 : 1;
    if (next > MAX_ATTEMPTS) {
      showNotice('A newer schedule was published. Refresh the page in a few minutes to see it.', true);
      pending = null;
      return;
    }
    var q = new URLSearchParams();
    if (teamSel.value) q.set('team', teamSel.value);
    if (dateSel.value) q.set('date', dateSel.value);
    q.set('sv', v.version);
    q.set('sa', String(next));
    q.set('su', '1');
    location.replace(location.pathname + '?' + q.toString() + location.hash);
  }

  function tryReload() {
    clearTimeout(deferTimer);
    if (!pending || document.hidden) return;   // hidden: reload when they come back
    var wait = Math.max(holdUntil - Date.now(), filterBusy() ? lastFilterUse + FILTER_QUIET_MS - Date.now() : 0);
    if (wait > 0) { deferTimer = setTimeout(tryReload, wait + 250); return; }
    reloadTo(pending);
  }

  function check(force) {
    if (inFlight || document.hidden) return;
    if (navigator.onLine === false) return;    // the 'online' event checks again
    if (!force && Date.now() - lastCheck < MIN_GAP_MS) return;
    inFlight = true;
    lastCheck = Date.now();
    fetch('schedule-version.json?t=' + Date.now(), { cache: 'no-store', credentials: 'omit' })
      .then(function (r) { if (!r.ok) throw new Error('HTTP ' + r.status); return r.json(); })
      .then(function (v) {
        if (v && typeof v.version === 'string' && /^[0-9a-f]{8,64}$/.test(v.version) && v.version !== pageVersion) {
          pending = v;
          tryReload();
        } else {
          pending = null;                       // unchanged (or already showing it): nothing to do
        }
      })
      .catch(function () { /* offline, timeout or a bad response: keep the page as is and retry later */ })
      .then(function () { inFlight = false; });
  }

  function schedule() {
    clearTimeout(timer);
    if (document.hidden) return;
    timer = setTimeout(function () { check(true); schedule(); }, CHECK_EVERY_MS);
  }

  document.addEventListener('visibilitychange', function () {
    if (document.hidden) { clearTimeout(timer); return; }
    check(false);
    if (pending) tryReload();
    schedule();
  });
  window.addEventListener('online', function () { check(true); schedule(); });
  // A phone restoring the page from its back/forward cache does not re-run this script.
  window.addEventListener('pageshow', function (e) { if (e.persisted) { check(true); schedule(); } });

  check(true);
  schedule();
})();
