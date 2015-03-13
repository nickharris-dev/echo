define(['require', 'reflow'], function(require, reflow){
  // min-width, max-width, min-height, max-height
  // Example value: linear:(min-width:600px) and (max-width:700px),test:(max-height:150px)

  // Get container for our node
  var element;

  function init(e, continuous) {
    element = e;

    // Attach element queries
    element.queries = queryFactory(e.getAttribute('data-eq'));
    // Prepare element to broacdcast resize events
    reflow(element,continuous);
    // Listen for those resize events
    element.addEventListener('resizeEnd', function(e){
      console.log(e);
    });
    element.addEventListener('debouncedResize', function(e){
      console.log(e);
    });
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

  // Get width
  // Compare width against each state in data-eq
  // Fire event when hitting new element query

  return init;
});
