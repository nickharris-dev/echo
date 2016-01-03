define(['require'], function(){
  // Throttle scroll

  // Events
  var scrollEnd;
  var debouncedScroll;
  var eventDetail = {
    detail: {
      position: {}
    }
  };

  if (typeof CustomEvent === 'function') { // Good browsers
    scrollEnd = new CustomEvent('scrollEnd', eventDetail);
    debouncedScroll = new CustomEvent('debouncedScroll', eventDetail);
  } else { // Not good browsers
    scrollEnd = document.createEvent('Event');
    debouncedScroll = document.createEvent('Event');
    scrollEnd.initEvent('scrollEnd', true, true, eventDetail);
    debouncedScroll.initEvent('debouncedScroll', true, true, eventDetail);
  }

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

    debouncedScroll.detail.position.y = lastKnownY;
    window.dispatchEvent(debouncedScroll);
  }

  window.addEventListener('scroll', onScroll, false);

  return document.body.scrollTop;
});
