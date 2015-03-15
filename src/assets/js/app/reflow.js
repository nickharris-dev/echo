define(function(){
  var Reflow = function(e, c) {
    this.element = e;

    // Helpers
    this.continuous = c || false;
    this.ticking = false;

    // Events
    this.resizeEnd = new Event('resizeEnd');
    this.debouncedResize = new Event('debouncedResize');
  };

  Reflow.prototype = {

    // Create an object element inside the element we want to emit reize events
    // from and watch it for resize
    init: function(){
      var self = this;

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
        self.endListenerFactory();
        // If desired, the element can emit an event whilst resizing, off by default
        if (self.continuous) self.requestTick();
      }

      // Make our element relative if it has no position
      if (getComputedStyle(self.element).position === 'static') {
        self.element.style.position = 'relative';
      }
      // Create an object element
      self.obj = document.createElement('object');
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
      self.obj.setAttribute('style', styles);
      self.obj.resizeElement = self.element;
      self.obj.onload = onObjLoad;
      self.obj.type = 'text/html';
      self.obj.data = 'about:blank';
      // Append the object element to the queried element
      self.element.appendChild(self.obj);
    },

    endListenerFactory: function(){
      var self = this;
      // Cancel the current running timer
      clearTimeout(self.timer);
      // Starts a timer, so dragEnd will only fire if the timer gets to zero,
      // which will only happen when the user stops resizing their viewport
      self.timer = setTimeout(function(){
        self.onResizeEnd.call(self);
      }, 250);
    },

    onResizeEnd: function(){
      var self = this;

      self.resizeEnd.height = self.element.offsetHeight;
      self.resizeEnd.width = self.element.offsetWidth;
      self.element.dispatchEvent(self.resizeEnd);
    },

    requestTick: function(){
      var self = this;
      if (!self.ticking) requestAnimationFrame(function(){
        self.update.call(self);
      });
      self.ticking = true;
    },

    update: function(){
      var self = this;

      self.ticking = false;
      self.debouncedResize.height = element.offsetHeight;
      self.debouncedResize.width = element.offsetWidth;
      self.element.dispatchEvent(debouncedResize);
    }

  };

  return Reflow;
});
