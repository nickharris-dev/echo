import csssupport from './csssupport';

export default class {
  constructor(elem) {
    // Helpers
    var lastKnownX = 0;
    var x = 0;
    var pressed = false;
    var reference = 0;
    var ticking = false;

    var t = this;
    t.element = elem;
    t.max = t.element.offsetWidth - t.element.parentElement.offsetWidth;
    t.matrix = [];

    if ( getComputedStyle(t.element).getPropertyValue('transform') === 'none') {
      var str = 'matrix(';

      t.matrix[0] = 1;
      t.matrix[1] = 0;
      t.matrix[2] = 0;
      t.matrix[3] = 1;
      t.matrix[4] = 0;
      t.matrix[5] = 0;

      str += t.matrix[0];
      str += ', ' + t.matrix[1];
      str += ', ' + t.matrix[2];
      str += ', ' + t.matrix[3];
      str += ', ' + t.matrix[4];
      str += ', ' + t.matrix[5];
      str += ')';

      t.element.style.transform = str;
    } else {
      var matrix = getComputedStyle(t.element).getPropertyValue('transform');
      matrix = matrix.slice(7, -1);
      t.matrix = matrix.split(',');
    }

    function grab(event) {
      var matrix = getComputedStyle(t.element).getPropertyValue('transform');
      matrix = matrix.slice(7, -1);
      matrix = matrix.split(',');

      pressed = true;
      x = parseFloat(matrix[4]);
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
          t.updatePosition(x - delta);
        }
      }
      return false;
    }

    t.element.addEventListener('touchstart', grab);
    t.element.addEventListener('touchmove', drag);
  }

  destroy () {
    // Todo
  }

  updatePosition (position) {
    var t = this;
    var str = 'matrix(';
    var x;

    if (position < 0) {
      x = 0;
    } else if (position > t.max) {
      x = t.max;
    } else {
      x = position;
    }

    str += t.matrix[0];
    str += ', ' + t.matrix[1];
    str += ', ' + t.matrix[2];
    str += ', ' + t.matrix[3];
    str += ', ' + x;
    str += ', ' + t.matrix[5];
    str += ')';

    t.element.style.transform = str;
  }
}

