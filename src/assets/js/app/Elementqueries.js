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

    // Check for initial active states
    for (var key in this.breakpoints) {
      this.checkBreakpoint(key);
    }

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
      var self = this;
      var obj;

      // Wee helper to surround something/anything with quotes
      function quoted(match) {
        return '"'+match+'"';
      }

      // helper to get px values from px/em/rem values in the string
      function calculatedValue(rawData) {
        var num = parseFloat(rawData);
        var units = rawData.match(/(px|em|rem)/)[0];
        var modifier, value;

        switch (units) {
          case 'px':
            modifier = 1;
            break;
          case 'em':
            modifier = parseFloat(getComputedStyle(self.element).fontSize);
            break;
          case 'rem':
            modifier = parseFloat(getComputedStyle(document.body).fontSize);
            break;
          default:
            throw new Error('Woah, that\'s not a unit I recognise, son. px, em or rem only');
        }

        value = num*modifier;

        return value;
      }

      // Deal with "and"
      var queries = str.replace(/\)\s*and\s*\(/g, ',');
      // surround keys with double quotes
      queries = queries.replace(/(\w+-*\w*)/g,quoted);
      // Replace parenthesis with curly braces
      queries = queries.replace(/\(/g,'{').replace(/\)/g,'}');

      obj = JSON.parse("{"+queries+"}");

      // Convert values
      // Loop through obj
      for (var key in obj) {
        // Loop through each breakpoint
        for (var val in obj[key]) {
          obj[key][val] = calculatedValue(obj[key][val]);
        }
      }

      return(obj);
    },

    sizeChange: function(e){
      var self = this;
      var key;

      // loop through query
      for (key in self.breakpoints) {
        self.checkBreakpoint(key);
      }
    },

    checkBreakpoint: function(key) {
      var self = this;
      var obj = self.breakpoints[key];

      self.breakpoints[key].active = self.breakpoints[key].state || false;
      console.log(self.breakpoints);
    }
  };

  // Get width
  // Compare width against each state in data-eq
  // Fire event when hitting new element query

  return Elementquery;
});
