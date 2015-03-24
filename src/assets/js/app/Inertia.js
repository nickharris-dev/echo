define(['require', 'merge'], function(require, merge){
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

      console.log(self);
    },

    on: function(event) {

    },

    release: function(event) {

    },

    drag: function(event) {

    }

  };

  return Inertia;
});
