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

  function eq (node, continuous) {
    require(['Elementqueries'], function(Elementquery){
      node.elementqueries = new Elementquery(node, node.getAttribute('data-eq'), continuous);
    });
  }

  function nodeLoop(nodeList, func, arg1) {
    var i = 0;
    var n = nodeList.length;

    for (i;i<n;i++) {
      func(nodeList[i], arg1);
    }
  }

  // Add js class to html element
  document.querySelector('html').className = document.querySelector('html').className += config.jsReadyClass;
  // Element Queries
  nodeLoop(document.querySelectorAll('[data-eq'), eq, false);
  // Media Handling
  if (document.querySelectorAll('[data-media]').length > 0) require(['media']);
  // Development js
  if (isDev) require(['dev']);
});
