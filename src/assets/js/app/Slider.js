define(['require', 'config', 'classes', 'csssupport', 'transitionEnd'], function(require, config, classes, csssupport, transitionEnd){
  var Slider = function(container, slides) {
    this.container = container;
    this.slideClass = slides;
    this.slides = container.querySelectorAll(slides);

    this.buttons = false;
    this.scroll = false;

    // Initialise
    this.init();
  };

  Slider.prototype = {

    init: function() {
      var self = this;

      // Add classes
      classes.add(self.container, 'slider');
      // Set Start Position
      self.firstVisible = 0;
      self.calculateDimensions();
      // Add styles
      self.createStyles();
      // Create the sliding div
      self.createTray();
      // Create the controls if there's no touch support
      self.createControls();
    },

    calculateDimensions: function() {
      var self = this;

      var w = parseFloat(getComputedStyle(self.container).width);
      self.slideWidth = self.slides[0].offsetWidth;
      self.visible = Math.floor(w/self.slideWidth);
    },

    destroy: function() {
      var self = this;

      // Put the slides back
      self.moveSlidesTo(self.container);
      self.slides = self.container.querySelectorAll(self.slideClass);
      // Remove the slider elements
      self.container.removeChild(self.slider);
      // Remove the controls
      if (self.buttons) {
        self.container.removeChild(self.next);
        self.container.removeChild(self.prev);
      }
      // Remove the slider class
      classes.remove(self.container, 'slider');
      // Remove the styles
      document.head.removeChild(self.style);
    },

    createStyles: function() {
      var self = this;

      if (!self.style) {
        self.style = document.createElement('style');
        self.style.type = 'text/css';
        var left = getComputedStyle(self.container).paddingLeft;

        var css =  '.slider__tray {width:'+self.slides[0].offsetWidth*self.slides.length+'px;left:'+left+';padding-right:'+left+';position:absolute;top:0;display:inherit;}';
            css += '.slider {overflow-x: scroll;-webkit-overflow-scrolling: touch;}';

        if (self.style.styleSheet){
          self.style.styleSheet.cssText = css;
        } else {
          self.style.appendChild(document.createTextNode(css));
        }
        document.head.appendChild(self.style);
      }
    },

    moveSlidesTo: function(elem) {
      var self = this;
      var i = self.slides.length-1;
      var tag = self.slides[0].tagName;

      // Reverse loop because prepending
      for (i; i>=0; i--) {
        var div = document.createElement('div');
        var str;

        div.appendChild(self.slides[i]);
        str = div.innerHTML;

        elem.insertAdjacentHTML('afterBegin', str);
      }
    },

    createTray: function() {
      var self = this;
      var div = document.createElement('div');
      var slider = document.createElement('div');

      slider.className = 'slider__tray';
      slider.style[csssupport('transform')] = 'translate3d(0,0,0)';

      self.moveSlidesTo(slider);
      // Convert to string for use with insertAdjacentHTML
      div.appendChild(slider);
      str = div.innerHTML;
      // Use insertAdjacentHTML to prepend to container, so the reflow object
      // isn't firstchild
      self.container.insertAdjacentHTML('afterBegin', str);
      self.slider = self.container.querySelectorAll('.slider__tray')[0];
      self.slides = self.slider.querySelectorAll(self.slideClass);

      self.slider.style[csssupport('transition')] = csssupport('transform') + ' 300ms';
      self.slider.style[csssupport('transform')] = 'translate3d(0,0,0)';
    },

    createControls: function() {
      var self = this;

      self.next = document.createElement('button');
      self.prev = document.createElement('button');

      self.next.className = 'slider__button slider__button--next slider__button--active';
      self.prev.className = 'slider__button slider__button--prev';

      self.next.addEventListener('click', function(e) {
        self.advance();
        self.container.removeEventListener('scroll', scroll);
      });
      self.prev.addEventListener('click', function(e) {
        self.retreat();
        self.container.removeEventListener('scroll', scroll);
      });

      self.container.appendChild(self.next);
      self.container.appendChild(self.prev);
      self.buttons = true;

      function scroll(event) {
        if (self.buttons) {
          self.buttons = false;
          self.container.removeChild(self.next);
          self.container.removeChild(self.prev);
        }
        self.container.removeEventListener('scroll', scroll);
      }

      self.container.addEventListener('scroll', scroll);
    },

    refresh: function() {
      var self = this;

      self.calculateDimensions();
      self.checkState();
    },

    removeScroll: function() {
      var self = this;

      if (self.scroll) {
        self.scroll = false;
        self.container.style.overflowX = '';
      }
    },

    advance: function() {
      var self = this;

      self.removeScroll();

      self.firstVisible = self.firstVisible + self.visible;

      pos = -1*self.firstVisible*self.slideWidth + 'px';

      self.slider.style[csssupport('transform')] = 'translate3d('+pos+',0,0)';
      self.checkState();
    },

    retreat: function() {
      var self = this;

      self.removeScroll();

      self.firstVisible = self.firstVisible - self.visible;

      pos = -1*self.firstVisible*self.slideWidth + 'px';

      self.slider.style[csssupport('transform')] = 'translate3d('+pos+',0,0)';
      self.checkState();
    },

    checkState: function() {
      var self = this;
      var next = classes.contains(self.next, 'slider__button--active');
      var prev = classes.contains(self.prev, 'slider__button--active');

      if (self.firstVisible < 1) {
        if (!next) classes.add(self.next, 'slider__button--active');
        if (prev) classes.remove(self.prev, 'slider__button--active');
      } else if (self.firstVisible + self.visible > self.slides.length - 1) {
        if (next) classes.remove(self.next, 'slider__button--active');
        if (!prev) classes.add(self.prev, 'slider__button--active');
      } else {
        if (!next) classes.add(self.next, 'slider__button--active');
        if (!prev) classes.add(self.prev, 'slider__button--active');
      }
    }

  };

  return Slider;
});
