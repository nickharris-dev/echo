requirejs.config({
  baseUrl: 'assets/js/app',
  config: {
    'config': {
      jsReadyClass: ' js'
    }
  }
});

require(['config'], function(config){
  function isDev (){
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
  // Add js class to html element
  document.querySelector('html').className = document.querySelector('html').className += config.jsReadyClass;
  // Development js
  if (isDev) require(['dev']);
  // Media Handling
  if (document.querySelectorAll('[data-media]').length > 0) require(['media']);
});
