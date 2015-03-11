define(['require', 'response'], function(require){
  // min-width, max-width, min-height, max-height
  // Example value: linear:(min-width:600px) and (max-width:700px),test:(max-height:150px)

  // Get all elements that have element queries
  var elements = document.querySelectorAll('[data-eq]');
  // Get all those that haven't already been processed
  var newElements = getUnprocessed(elements);

  function getUnprocessed(nodelist) {
    // Set up the for loop
    var i = 0;
    var n = nodelist.length;

    // A temporary array for storing objects and returning to the elements
    // variable
    var tempArray = [];

    for (i; i<n; i++) {
      var node = nodelist[i];
      if (!node.getAttribute('data-eq-processed')) {
        tempArray.push(elementFactory(node));
        node.setAttribute('data-eq-processed', '');
      }
    }

    return tempArray;
  }

  function elementFactory(node) {
    var elem = {};
    elem.node = node;
    elem.queries = queryFactory(node.getAttribute('data-eq'));

    return elem;
  }

  function queryFactory(str) {
    // Wee helper to surround something/anything with quotes
    function quoted(match) {
      return '"'+match+'"';
    }

    // Deal with "and"
    var queries = str.replace(/\)\s*and\s*\(/g, ',');
    // surround keys with double quotes
    queries = queries.replace(/(\w+-*\w*)/g,quoted);
    // Replace parenthesis with curly braces
    queries = queries.replace(/\(/g,'{').replace(/\)/g,'}');

    return(JSON.parse("{"+queries+"}"));
  }

  // Process each of those elements
    // Get width
    // Compare width against each state in data-eq
  // Fire event when hitting new element query
});
