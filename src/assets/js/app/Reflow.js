define(function(){
  var Reflow = function(e, c) {
    var t = this;
    t.element = e;

    // Helpers
    t.continuous = c || false;
    t.ticking = false;

    // Events
    t.resizeEnd = new Event('resizeEnd');
    t.debouncedResize = new Event('debouncedResize');

    // Initialise
    t.init();
  };

  Reflow.prototype = {

    // Create an object element inside the element we want to emit reize events
    // from and watch it for resize
    init: function(){
      var t = this;

      function onObjLoad() {
        // Not needed outside of init(), so let's keep it anonymous
        // Context is the object element created below
        this.contentDocument.defaultView.resizeTrigger = this.resizeElement;
        this.contentDocument.defaultView.addEventListener('resize', onObjResize);
      }

      function onObjResize(e) {
        // Not needed outside of init(), so let's keep it anonymous
        // Context is the object element created below

        // The on end event
        t.endListenerFactory();
        // If desired, the element can emit an event whilst resizing, off by default
        if (t.continuous) t.requestTick();
      }

      // Make our element relative if it has no position
      if (getComputedStyle(t.element).position === 'static') {
        t.element.style.position = 'relative';
      }
      // Create an object element
      t.obj = document.createElement('object');
      t.obj.className = 'reflowObject';

      // Tell the browser this obj is a page, so it emits a resize event
      t.obj.resizeElement = t.element;
      t.obj.onload = onObjLoad;
      t.obj.type = 'text/html';
      t.obj.data = 'about:blank';

      // Create styles for the object, if they don't already exist
      if (!document.getElementById('ReflowStyle')) {
        var style = document.createElement('style');
        var css =  '.reflowObject {';
            css += 'display:block;';
            css += 'height:100%;';
            css += 'left:0;';
            css += 'overflow:hidden;';
            css += 'pointer-events:none;';
            css += 'position:absolute;';
            css += 'top:0;';
            css += 'width:100%;';
            css += 'z-index:-1;';
            css += '}';

        style.type = 'text/css';
        style.setAttribute('id', 'ReflowStyle');
        if (style.styleSheet){
          style.styleSheet.cssText = css;
        } else {
          style.appendChild(document.createTextNode(css));
        }
        document.head.appendChild(style);
      }
      // Append the object element to the queried element
      t.element.appendChild(t.obj);
    },

    endListenerFactory: function(){
      var t = this;
      // Cancel the current running timer
      clearTimeout(t.timer);
      // Starts a timer, so dragEnd will only fire if the timer gets to zero,
      // which will only happen when the user stops resizing their viewport
      t.timer = setTimeout(function(){
        t.onResizeEnd.call(t);
      }, 250);
    },

    onResizeEnd: function(){
      var t = this;

      t.resizeEnd.height = t.element.offsetHeight;
      t.resizeEnd.width = t.element.offsetWidth;
      t.element.dispatchEvent(t.resizeEnd);
    },

    requestTick: function(){
      var t = this;
      if (!t.ticking) requestAnimationFrame(function(){
        t.update.call(t);
      });
      t.ticking = true;
    },

    update: function(){
      var t = this;

      t.ticking = false;
      t.debouncedResize.height = element.offsetHeight;
      t.debouncedResize.width = element.offsetWidth;
      t.element.dispatchEvent(debouncedResize);
    }

  };

  return Reflow;
});
