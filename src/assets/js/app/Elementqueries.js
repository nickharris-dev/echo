define(['require', 'config', 'Reflow', 'classes'], function(require, config, Reflow, classes){
  // min-width, max-width, min-height, max-height
  // Example value: linear:(min-width:600px) and (max-width:700px),test:(max-height:150px)

  var Elementquery = function(elem, queryString, continuous) {
    var t = this;
    var eventDetail = {
      detail: {
        queries: t
      }
    };

    t.element = elem;
    t.continuous = continuous;

    // Starting dimensions
    t.height = elem.offsetHeight;
    t.width = elem.offsetWidth;

    // Event to be emitted on change of breakpoint
    if (typeof CustomEvent === 'function') { // Good Browsers
      t.breakpointEvent = new CustomEvent('breakpoint', eventDetail);
    } else {
      t.breakpointEvent = document.createEvent('CustomEvent');
      t.breakpointEvent.initCustomEvent('breakpoint', true, true, eventDetail);
    }

    // An identifier to use in the classname later
    // Unlike idFactory, use classname by default, for better BEM
    if (elem.className) {
      if (elem.classList) {
        t.identifier = elem.classList[0];
      } else {
        t.identifier = elem.className;
        t.identifier = t.identifier.split(' ')[0];
      }
    } else if (elem.getAttribute('id')) {
      t.identifier = elem.getAttribute('id').toLowerCase();;
    }
    t.identifier = t.identifier.match(/(\w+)-?/);
    t.identifier = t.identifier[1];

    // Process the named breakpoints
    t.breakpoints = t.queryFactory(queryString);

    // Prepare element to broadcast resize events
    t.reflow = new Reflow(elem, continuous);

    // …Listen for those resize events
    t.element.addEventListener('resizeEnd', function(event){
      t.sizeChange.call(t,event);
    });
    t.element.addEventListener('debouncedResize', function(event){
      t.sizeChange.call(t,event);
    });
  };

  Elementquery.prototype = {

    queryFactory: function(str) {
      var t = this;
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
            modifier = parseFloat(getComputedStyle(t.element).fontSize);
            break;
          case 'rem':
            modifier = parseFloat(config.baseFontSize);
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
        // Store name
        obj[key].name = key;
        // Set initial state as inactive
        obj[key].active = false;
        // Construct Classname
        if (t.identifier) {
          obj[key].className = t.identifier + '--' + key;
        } else {
          obj[key].className = key;
        }
        // Check breakpoint
        t.checkBreakpoint(key,obj);
      }

      // Store the breakpoints for later
      return(obj);
    },

    sizeChange: function(event){
      var t = this;
      var key;

      // Update height and width
      t.height = event.detail.height;
      t.width = event.detail.width;

      // loop through query
      for (key in t.breakpoints) {
        t.checkBreakpoint(key);
      }
    },

    checkBreakpoint: function(key,obj) {
      var t = this;
      var breakpoints = obj || t.breakpoints;
      var breakpoint = breakpoints[key];
      var minWidth = breakpoint['min-width'] || t.width;
      var maxWidth = breakpoint['max-width'] || t.width;
      var minHeight = breakpoint['min-height'] || t.height;
      var maxHeight = breakpoint['max-height'] || t.height;
      var widthFlag = false;
      var heightFlag = false;
      var active = false;

      if (t.width >= minWidth && t.width <= maxWidth) {
        widthFlag = true;
      }
      if (t.height >= minHeight && t.height <= maxHeight) {
        heightFlag = true;
      }

      // The breakpoint is active only if all it's tests are true
      if (widthFlag && heightFlag) {
        active = true;
      }

      // Only take any action if the breakpoint's state is changed
      if (active !== breakpoint.active) {
        if (active) {
          t.activate(key, obj);
        } else {
          t.deactivate(key, obj);
        }
      }
    },

    activate: function(key,obj) {
      var t = this;
      var breakpoints = obj || t.breakpoints;
      var breakpoint = breakpoints[key];

      breakpoint.active = true;

      classes.add(t.element, breakpoint.className);

      t.breakpointEvent.detail.active = true;
      t.breakpointEvent.detail.breakpoint = breakpoint;
      t.element.dispatchEvent(t.breakpointEvent);
    },

    deactivate: function(key,obj) {
      var t = this;
      var breakpoints = obj || t.breakpoints;
      var breakpoint = breakpoints[key];

      breakpoint.active = false;

      classes.remove(t.element, breakpoint.className);

      t.breakpointEvent.detail.active = false;
      t.breakpointEvent.detail.breakpoint = breakpoint;
      t.element.dispatchEvent(t.breakpointEvent);
    }
  };

  // Compare width against each state in data-eq
  // Fire event when hitting new element query

  return Elementquery;
});
