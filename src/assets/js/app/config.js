export default config = {
  baseline: 24,
  elementqueries: {}
};

 config.isDev = function() {
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

config.baseFontSize = function() {
  return parseFloat(getComputedStyle(document.documentElement).fontSize);
}

config.touchEnabled = function() {
  if (typeof window.ontouchstart !== 'undefined') {
    return true;
  }
  return false;
}
