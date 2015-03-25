define(['require', 'merge', 'csssupport'], function(require, merge, csssupport){
  var Inertia = function(elem, obj) {
    var defaults = {};
    defaults.direction = 'vertical'; // horizontal || vertical

    this.element = elem;
    this.options = merge(defaults,obj);

    if (this.options.direction === 'horizontal') {
      this.max = parseInt(getComputedStyle(elem).width, 10) - elem.parentNode.offsetWidth;
    } else {
      this.max = parseInt(getComputedStyle(elem).height, 10) - elem.parentNode.offsetHeight;
    }
    this.offset = this.min = 0;
    this.pressed = false;

    // Initialise
    this.init();
  };

  Inertia.prototype = {

    init: function() {
      var self = this;

      if (window.ontouchstart !== 'undefined') {
        self.element.addEventListener('touchstart', function(event){
          self.on.call(self,event);
        });
        self.element.addEventListener('touchmove', function(event){
          self.drag.call(self,event);
        });
        self.element.addEventListener('touchend', function(event){
          self.release.call(self,event);
        });
      }
      self.element.addEventListener('mousedown', function(event){
        self.on.call(self,event);
      });
      self.element.addEventListener('mousemove', function(event){
        self.drag.call(self,event);
      });
      self.element.addEventListener('mouseup', function(event){
        self.release.call(self,event);
      });
    },

    on: function(event) {
      var self = this;

      self.pressed = true;
      self.reference = self.pos(event);

      event.preventDefault();
      event.stopPropagation();
      return false;
    },

    release: function(event) {
      var self = this;

      self.pressed = false;

      event.preventDefault();
      event.stopPropagation();
      return false;
    },

    drag: function(event) {
      var self = this;
      var n, delta;

      if (self.pressed) {
          n = self.pos(event);
          delta = self.reference - n;
          if (delta > 2 || delta < -2) {
              self.reference = n;
              self.scroll(self.offset + delta);
          }
      }

      event.preventDefault();
      event.stopPropagation();
      return false;
    },

    pos: function(event) {
      var self = this;
      var clientAxis = self.options.direction === 'vertical' ? 'clientY' : 'clientX';
      // touch
      if (event.targetTouches && (event.targetTouches.length >= 1)) {
        return event.targetTouches[0][clientAxis];
      }
      // mouse
      return event[clientAxis];
    },

    scroll: function(n) {
      var self = this;

      self.offset = (n > self.max) ? self.max : (n < self.min) ? self.min : n;

      if (self.options.direction === 'vertical') {
        self.element.style[csssupport('transform')] = 'translate3d(0,' + (-self.offset) + 'px,0)';
      } else {
        self.element.style[csssupport('transform')] = 'translate3d(' + (-self.offset) + 'px,0,0)';
      }
    }

  };

  return Inertia;
});
