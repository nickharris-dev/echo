// Fire an event when the viewport is resized;
define(function(require){
  // An Event for when the resize is finished (runs once)
  var resize;
  // An Event that runs while the window is resizing (Don't want to add things
  // directly on the resize event as it runs every 4 pixels or so while the
  // window is resizing, so it can get very slow)
  var dragResize;

  if (typeof CustomEvent === 'function') { // Good Browsers
    resize = new CustomEvent('resized');
    dragResize = new CustomEvent('debouncedResize');
  } else { // IE
    resize = document.createEvent('CustomEvent');
    dragResize = document.createEvent('CustomEvent');
    resize.initCustomEvent('resized');
    dragResize.initCustomEvent('debouncedResize');
  }

  // Holder for the window width - Set to initial width so we can return it
  // and use it as soon as the module is loaded
  var w = window.innerWidth;

  // Variables for the debouncedResize event
  var ticking = false;

  function requestTick() {
    if (!ticking) requestAnimationFrame(update);
    ticking = true;
  }

  function update() {
    ticking = false;
    dragResize.viewportSize = window.innerWidth;
    window.dispatchEvent(dragResize);
  }

  // Variables for the resized event
  var timer;

  // function that runs when the resize has ended
  function dragEnd() {
    resize.viewportSize = window.innerWidth;
    window.dispatchEvent(resize);
  }

  function dragEndCalculator() {
    // Cancel the current running timer
    clearTimeout(timer);
    // Starts a timer, so dragEnd will only fire if the timer gets to zero,
    // which will only happen when the user stops resizing their viewport
    timer = setTimeout(dragEnd, 250);
  }

  // Runs every 4px or so of drag, keep it VERY lean
  function onDrag() {
    dragEndCalculator();
    requestTick();
  }

  window.addEventListener('resize', onDrag);

  // return the initial width for use immediately
  return w;
});
