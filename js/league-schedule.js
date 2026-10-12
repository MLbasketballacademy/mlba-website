/* Fall league schedule page: date + team filters over the schedule that is already in the HTML.
   The schedule itself is plain HTML (readable without JavaScript); this only shows/hides games. */
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

  dateSel.addEventListener('change', apply);
  teamSel.addEventListener('change', apply);
  document.getElementById('sched-reset').addEventListener('click', function () {
    dateSel.value = ''; teamSel.value = ''; apply();
  });
  form.hidden = false;
  apply();
})();
