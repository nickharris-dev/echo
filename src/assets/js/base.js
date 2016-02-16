// imports
// =======
// Note, these don't get imported until they're actually used
import config from './app/config';
import dev from './app/dev';
import fancylinks from './app/fancylinks';
import Elementquery from './app/Elementqueries';
import grid from './app/grid';
import idFactory from './app/idFactory';
import location from './app/location';
import media from './app/media';
import merge from './app/merge';
import results from './app/results';

// Always run
// ==========
fancylinks();

// Development js
// ==============
if (config.isDev) {
  dev();
  grid();
}

// Helpers
// =======
function eq (node, continuous) {
  var id = idFactory(node);
  let query = new Elementquery(node, node.getAttribute('data-eq'), continuous);
  if (config.elementqueries[id]) {
    config.elementqueries[id] = merge(config.elementqueries[id], query);
  } else {
    config.elementqueries[id] = query;
  }
}

function typography (node) {
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

// Media
// =====
if (document.querySelectorAll('[data-media]').length > 0) media();

// Training
// ========
if (document.getElementById('Training') || document.getElementById('Location')) location();

/*
// Frontpage News
if (document.getElementById('News') && parseFloat(document.getElementById('News').getAttribute('data-posts')) > 3) require('frontpagenews');
*/
// Results
if (document.getElementById('Results')) results();
