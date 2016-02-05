import config from './app/config';

import fancylinks from './app/fancylinks';
fancylinks();
/*
// Development js
// ==============
if (config.isDev) {
  require('grid');
  require('dev');
}

// Helpers
// =======
function eq (node, continuous) {
  var Elementquery = require('Elementqueries');
  var idFactory = require('idFactory');
  var merge = require('merge');
  var id = idFactory(node);
  var query = new Elementquery(node, node.getAttribute('data-eq'), continuous);
  if (config.elementqueries[id]) {
    config.elementqueries[id] = merge(config.elementqueries[id], query);
  } else {
    config.elementqueries[id] = query;
  }
}

function typography (node) {
  var Elementquery = require('Elementqueries');
  var str = 'type-break:(min-width:' + node.getAttribute('data-type-break') + ')';
  config.elementqueries.typography = config.elementqueries.typography || [];
  config.elementqueries.typography.push(new Elementquery(node, str, false));
}

function nodeLoop(nodeList, func, arg1) {
  var i = 0;
  var n = nodeList.length;

  for (i;i<n;i++) {
    func(nodeList[i], arg1);
  }
}

// Element Queries
// ===============
nodeLoop(document.querySelectorAll('[data-type-break]'), typography);
nodeLoop(document.querySelectorAll('[data-eq]'), eq, false);

// Training
// ========
if (document.getElementById('Training') || document.getElementById('Location')) require('location');

// Frontpage News
if (document.getElementById('News') && parseFloat(document.getElementById('News').getAttribute('data-posts')) > 3) require('frontpagenews');

// Results
if (document.getElementById('Results')) require('results'); */
