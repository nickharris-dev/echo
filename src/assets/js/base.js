var baseUrl = document.getElementById('script').getAttribute('data-main');
baseUrl = baseUrl.replace(/base/, 'app');

function baseFontSize(){
  return parseFloat(getComputedStyle(document.documentElement).fontSize);
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
      baseline: 24,
      baseFontSize: baseFontSize(),
      elementqueries: {},
      isDev: isDev(),
      touchEnabled: touchEnabled()
    }
  }
});

// Helpers
// =======
function eq (node, continuous) {
  require(['Elementqueries', 'idFactory', 'config', 'merge'], function(Elementquery, idFactory, config, merge){
    var id = idFactory(node);
    var query = new Elementquery(node, node.getAttribute('data-eq'), continuous);
    if (config.elementqueries[id]) {
      config.elementqueries[id] = merge(config.elementqueries[id], query);
    } else {
      config.elementqueries[id] = query;
    }
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
  // Development js
  if (config.isDev) require(['grid','dev']);
});

// Element Queries
// ===============
nodeLoop(document.querySelectorAll('[data-type-break]'), typography);
nodeLoop(document.querySelectorAll('[data-eq]'), eq, false);

// Training
// ========
if (document.getElementById('Training')) require(['training']);

// Frontpage News
if (document.getElementById('News') && parseFloat(document.getElementById('News').getAttribute('data-posts')) > 3) require(['frontpagenews']);

// Results
if (document.getElementById('Results')) require(['results']);
