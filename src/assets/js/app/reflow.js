// Fire events when an element is resized

// TODO IE support
define(function(){
  // Holder for the element;
  var element;
  // Flag for whether the element should emit events whilst it's resizing
  var continuous;
  // An Event for when the resize is finished (runs once)
  var resizeEnd;
  // An Event that runs while the window is resizing (Don't want to add things
  // directly on the resize event as it runs every 4 pixels or so while the
  // window is resizing, so it can get very slow)
  var debouncedResize;

  function init(e, c) {
    // Populate the holders
    element = e;
    continuous = c || false;
    resizeEnd = new Event('resizeEnd');
    debouncedResize = new Event('debouncedResize');

    addResizeListener();
  }

  // Append an object that's capable of emitting resize events to the element
  function addResizeListener() {
    // Make our element relative if it has no position
    if (getComputedStyle(element).position === 'static') {
      element.style.position = 'relative';
    }
    // Create an object element
    var obj = document.createElement('object');
    // styles for the object element
    var styles =  'display:block;';
        styles += 'height:100%;';
        styles += 'left:0;';
        styles += 'overflow:hidden;';
        styles += 'pointer-events:none;';
        styles += 'position:absolute;';
        styles += 'top:0;';
        styles += 'width:100%;';
        styles += 'z-index:-1;';
    obj.setAttribute('style', styles);
    obj.resizeElement = element;
    obj.onload = objectLoad;
    obj.type = 'text/html';
    obj.data = 'about:blank';
    // Append the object element to the queried element
    element.appendChild(obj);
  }

  function objectLoad() {
    this.contentDocument.defaultView.resizeTrigger = this.resizeElement;
    this.contentDocument.defaultView.addEventListener('resize', onRepaint);
  }

  // Runs every 4px or so of resize, keep it VERY lean
  function onRepaint() {
    // The on end event
    endCalculator();
    // If desired, the element can emit an event whilst resizing, off by default
    if (continuous) requestTick();
  }

  // Variables for the debouncedResize event
  var ticking = false;

  function requestTick() {
    if (!ticking) requestAnimationFrame(update);
    ticking = true;
  }

  function update() {
    ticking = false;
    debouncedResize.elementWidth = element.offsetWidth;
    element.dispatchEvent(debouncedResize);
  }

  // function that runs when the resize has ended
  function end() {
    resizeEnd.elementWidth = element.offsetWidth;
    element.dispatchEvent(resizeEnd);
  }

  // Variables for the resizeEnd event
  var timer;
  function endCalculator() {
    // Cancel the current running timer
    clearTimeout(timer);
    // Starts a timer, so dragEnd will only fire if the timer gets to zero,
    // which will only happen when the user stops resizing their viewport
    timer = setTimeout(end, 250);
  }

  return init;
});
