define(['require', 'Reflow', 'classes'], function(require, Reflow, classes){
  // min-width, max-width, min-height, max-height
  // Example value: linear:(min-width:600px) and (max-width:700px),test:(max-height:150px)

  var Elementquery = function(e, b, c) {
    var self = this;

    this.element = e;
    this.continuous = c;

    // Starting dimensions
    this.height = e.offsetHeight;
    this.width = e.offsetWidth;

    // Event to be emitted on change of breakpoint
    this.breakpointEvent = new Event('breakpoint');
    this.breakpointEvent.queries = this;

    // An identifier to use in the classname later
    this.identifier = e.getAttribute('id') || this.idFactory(e.className);

    // Process the named breakpoints
    this.breakpoints = this.queryFactory(b);

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
        var units = rawData.match(/(px|r?em)/)[0];
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
        // Convert each breakpoint value to an integer representing it's size
        // in pixels
        for (var val in obj[key]) {
          obj[key][val] = calculatedValue(obj[key][val]);
        }
        // Set initial state as inactive
        obj[key].active = false;
        // Construct Classname
        obj[key].className = self.identifier + '--' + key;
        // Check breakpoint
        self.checkBreakpoint(key,obj);
      }

      // Store the breakpoints for later
      return(obj);
    },

    sizeChange: function(e){
      var self = this;
      var key;

      // Update height and width
      self.height = e.height;
      self.width = e.width;

      // loop through query
      for (key in self.breakpoints) {
        self.checkBreakpoint(key);
      }
    },

    checkBreakpoint: function(key,obj) {
      var self = this;
      var breakpoints = obj || self.breakpoints;
      var breakpoint = breakpoints[key];
      var minWidth = breakpoint['min-width'] || self.width;
      var maxWidth = breakpoint['max-width'] || self.width;
      var minHeight = breakpoint['min-height'] || self.height;
      var maxHeight = breakpoint['max-height'] || self.height;
      var widthFlag = false;
      var heightFlag = false;
      var active = false;

      if (self.width >= minWidth && self.width <= maxWidth) {
        widthFlag = true;
      }
      if (self.height >= minHeight && self.height <= maxHeight) {
        heightFlag = true;
      }

      // The breakpoint is active only if all it's tests are true
      if (widthFlag && heightFlag) {
        active = true;
      }

      // Only take any action if the breakpoint's state is changed
      if (active !== breakpoint.active) {
        if (active) {
          self.activate(key, obj);
        } else {
          self.deactivate(key, obj);
        }
      }
    },

    activate: function(key,obj) {
      var self = this;
      var breakpoints = obj || self.breakpoints;
      var breakpoint = breakpoints[key];

      self.breakpointEvent.breakpoint = key;
      self.breakpointEvent.active = true;
      breakpoint.active = true;

      classes.add(self.element, breakpoint.className);
      self.element.dispatchEvent(self.breakpointEvent);
    },

    deactivate: function(key,obj) {
      var self = this;
      var breakpoints = obj || self.breakpoints;
      var breakpoint = breakpoints[key];

      self.breakpointEvent.breakpoint = key;
      self.breakpointEvent.active = false;
      breakpoint.active = false;

      classes.remove(self.element, breakpoint.className);
      self.element.dispatchEvent(self.breakpointEvent);
    }
  };

  // Compare width against each state in data-eq
  // Fire event when hitting new element query

  return Elementquery;
});
