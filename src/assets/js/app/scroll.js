define(['require'], function(){
  // Throttle scroll

  // Events
  var scrollEnd = new Event('scrollEnd');
  var debouncedScroll = new Event('debouncedScroll');
  debouncedScroll.position = {};

  // Helpers
  var lastKnownY = 0;
  var ticking = false;

  function onScroll() {
    lastKnownY = window.scrollY;
    requestTick();
  }

  function requestTick() {
    if (!ticking) {
      requestAnimationFrame(update);
    }
    ticking = true;
  }

  function update() {
    ticking = false;

    debouncedScroll.position.y = lastKnownY;
    window.dispatchEvent(debouncedScroll);
  }

  window.addEventListener('scroll', onScroll, false);

  return document.body.scrollTop;
});
