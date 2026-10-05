// Filter tabs for the robotics project grid. Without JS the tabs stay hidden and every card shows.
(function () {
  var buttons = document.querySelectorAll('.filter');
  var cards = document.querySelectorAll('.card[data-cats]');
  buttons.forEach(function (btn) {
    btn.addEventListener('click', function () {
      var f = btn.getAttribute('data-filter');
      buttons.forEach(function (b) { b.setAttribute('aria-pressed', String(b === btn)); });
      cards.forEach(function (card) {
        var cats = card.getAttribute('data-cats').split(' ');
        card.hidden = !(f === 'all' || cats.indexOf(f) !== -1);
      });
    });
  });
})();
