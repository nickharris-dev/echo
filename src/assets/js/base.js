var baseUrl = document.getElementById('script').getAttribute('data-main');
baseUrl = baseUrl.replace(/base/, 'app');

function baseFontSize(){
  return parseFloat(getComputedStyle(document.body).fontSize);
}

function touchEnabled(){
  if (typeof window.ontouchstart !== 'undefined') {
    return true;
  }
  return false;
}

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

requirejs.config({
  baseUrl: baseUrl,
  config: {
    'config': {
      baseFontSize: baseFontSize(),
      elementqueries: {},
      isDev: isDev(),
      jsReadyClass: ' js',
      touchEnabled: touchEnabled()
    }
  }
});

// Helpers
// =======
function eq (node, continuous) {
  require(['Elementqueries', 'idFactory', 'config'], function(Elementquery, idFactory, config){
    var id = idFactory(node);
    config.elementqueries[id] = new Elementquery(node, node.getAttribute('data-eq'), continuous);
  });
}

function typography (node) {
  require(['Elementqueries', 'config'], function(Elementquery, config){
    var str = 'type-break:(min-width:' + node.getAttribute('data-type-break') + ')';
    config.elementqueries.typography = config.elementqueries.typography || [];
    config.elementqueries.typography.push(new Elementquery(node, str, false));
  });
}

function nodeLoop(nodeList, func, arg1) {
  var i = 0;
  var n = nodeList.length;

  for (i;i<n;i++) {

    func(nodeList[i], arg1);
  }
}

require(['config'], function(config){
  // Add js class to html element
  // ============================
  document.querySelector('html').className = document.querySelector('html').className += config.jsReadyClass;
  // Development js
  // ==============
  if (config.isDev) require(['grid','dev']);
});

// Element Queries
// ===============
nodeLoop(document.querySelectorAll('[data-type-break]'), typography);
nodeLoop(document.querySelectorAll('[data-eq]'), eq, false);

// Media Handling
// ==============
if (document.querySelectorAll('[data-media]').length > 0) require(['media']);
