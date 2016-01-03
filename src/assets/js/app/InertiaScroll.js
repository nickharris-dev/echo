define(['require', 'csssupport'], function(require, csssupport){
  // Helpers
  var lastKnownX = 0;
  var offset = 0;
  var pressed = false;
  var reference = 0;
  var ticking = false;

  var InertiaScroll = function(elem) {
    var t = this;
    t.element = elem;
    t.max = t.element.offsetWidth - t.element.parentElement.offsetWidth;

    function grab(event) {
      var matrix = getComputedStyle(t.element).getPropertyValue('transform');
      matrix = matrix.slice(7, -1);
      matrix = matrix.split(',');

      pressed = true;
      offset = parseFloat(matrix[4]);
      reference = event.touches[0].clientX;
    }

    function release(event) {
      event.preventDefault();
      pressed = false;
    }

    function drag(event) {
      event.preventDefault();
      lastKnownX = event.touches[0].clientX;
      requestTick();
    }

    function requestTick() {
      if (!ticking) requestAnimationFrame(update);
      ticking = true;
    }

    function update() {
      ticking = false;
      var delta;
      if (pressed) {
        delta = reference - lastKnownX;
        if (delta > 2 || delta < -2) {
          t.updatePosition(offset - delta);
        }
      }
      return false;
    }

    t.element.addEventListener('touchstart', grab);
    t.element.addEventListener('touchmove', drag);
  };

  InertiaScroll.prototype.destroy = function() {

  };

  InertiaScroll.prototype.updatePosition = function (position) {
    var x;

    if (position < 0) {
      x = 0;
    } else if (position > this.max) {
      x = this.max;
    } else {
      x = position;
    }

    this.element.style.transform = 'matrix(1, 0, 0, 1, ' + x + ', 0)';
  };

  return InertiaScroll;
})
