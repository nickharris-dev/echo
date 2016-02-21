var configHelpers = {
  isDev: function() {
    var el = document.querySelector('html');
    var className = 'dev';
    var test;

    if (el.classList) {
      test = el.classList.contains(className);
    } else {
      test = new RegExp('(^| )' + className + '( |$)', 'gi').test(el.className);
    }

    return test;
  },

  baseFontSize: function() {
    return parseFloat(getComputedStyle(document.documentElement).fontSize);
  },

  touchEnabled: function() {
    if (typeof window.ontouchstart !== 'undefined') {
      return true;
    }
    return false;
  }
};

export default {
  baseFontSize: configHelpers.baseFontSize(),
  baseline: 24,
  elementqueries: {},
  isDev : configHelpers.isDev(),
  smartMedia : {},
  touchEnabled : configHelpers.touchEnabled()
};
