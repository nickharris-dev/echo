function config(){
  var obj = {};

  obj.baseline = 24;
  obj.baseFontSize = baseFontSize();
  obj.elementqueries = {};
  obj.isDev = isDev();
  obj.touchEnabled = touchEnabled();

  function isDev() {
    var el = document.querySelector('html');
    var className = 'dev';
    var test;

    if (el.classList) {
      test = el.classList.contains(className);
    } else {
      test = new RegExp('(^| )' + className + '( |$)', 'gi').test(el.className);
    }

    return test;
  }

  function baseFontSize() {
    return parseFloat(getComputedStyle(document.documentElement).fontSize);
  }

  function touchEnabled() {
    if (typeof window.ontouchstart !== 'undefined') {
      return true;
    }
    return false;
  }

  return obj;
}

module.exports = config();
