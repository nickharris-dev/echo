define(['require', 'Reflow'], function(require, Reflow){
  // min-width, max-width, min-height, max-height
  // Example value: linear:(min-width:600px) and (max-width:700px),test:(max-height:150px)

  var Elementquery = function(e, c) {
    var self = this;

    this.element = e;
    this.continuous = c;

    this.identifier = e.getAttribute('id') || this.idFactory(e.className);

    // Process the named breakpoints from the data-attribute
    this.breakpoints = this.queryFactory(e.getAttribute('data-eq'));

    // Prepare element to broadcast resize events
    this.reflow = new Reflow(e, c);

    // …Listen for those resize events
    this.element.addEventListener('resizeEnd', function(e){
      self.sizeChange.call(self,e);
    });
    this.element.addEventListener('debouncedResize', function(e){
      self.sizeChange.call(self,e);
    });
  };

  Elementquery.prototype = {

    idFactory: function(className) {
      var str = className.split(' ')[0];

      str = str.match(/(\w+)-?/);

      return str[1];
    },

    queryFactory: function(str) {
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
    },

    sizeChange: function(e){
      var self = this;

      // loop through breakpoints
      // loop through keys
    }
  };

  // Get width
  // Compare width against each state in data-eq
  // Fire event when hitting new element query

  return Elementquery;
});
