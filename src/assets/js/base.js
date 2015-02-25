requirejs.config({
  baseUrl: 'assets/js/app',
  config: {
    'config': {
      jsReadyClass: ' js'
    }
  }
});

require(['config'], function(config){
  // Add js class to html element
  document.querySelector('html').className = document.querySelector('html').className += config.jsReadyClass;
  // Media Handling
  if (document.querySelectorAll('[data-media]').length > 0) require(['app/media']);
});
