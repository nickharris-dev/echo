// min-width, max-width, min-height, max-height
// Example value: linear:(min-width:600px) and (max-width:700px),test:(max-height:150px)
import config from './config';
import Reflow from './Reflow';

export default class {
  constructor(elem, queryString, continuous) {
    var self = this;
    var eventDetail = {
      detail: {
        queries: self
      }
    };

    self.element = elem;
    self.continuous = continuous;

    // Starting dimensions
    self.height = elem.offsetHeight;
    self.width = elem.offsetWidth;

    // Event to be emitted on change of breakpoint
    if (typeof CustomEvent === 'function') { // Good Browsers
      self.breakpointEvent = new CustomEvent('breakpoint', eventDetail);
    } else {
      self.breakpointEvent = document.createEvent('CustomEvent');
      self.breakpointEvent.initCustomEvent('breakpoint', true, true, eventDetail);
    }

    // An identifier to use in the classname later
    // Unlike idFactory, use classname by default, for better BEM
    if (elem.className) {
      if (elem.classList) {
        self.identifier = elem.classList[0];
      } else {
        self.identifier = elem.className;
        self.identifier = self.identifier.split(' ')[0];
      }
    } else if (elem.getAttribute('id')) {
      self.identifier = elem.getAttribute('id').toLowerCase();;
    }
    self.identifier = self.identifier.match(/(\w+)-?/);
    self.identifier = self.identifier[1];

    // Process the named breakpoints
    self.breakpoints = self.queryFactory(queryString);

    // Prepare element to broadcast resize events
    let inst = new Reflow(elem, continuous);
    self.reflow = inst;

    // …Listen for those resize events
    elem.addEventListener('resizeEnd', function(event){
      self.sizeChange.call(self,event);
    });
    elem.addEventListener('debouncedResize', function(event){
      self.sizeChange.call(self,event);
    });
  }

  queryFactory(str) {
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
      if (self.identifier) {
        obj[key].className = self.identifier + '--' + key;
      } else {
        obj[key].className = key;
      }
      // Check breakpoint
      self.checkBreakpoint(key,obj);
    }

    // Store the breakpoints for later
    return(obj);
  }

  sizeChange(event){
    var self = this;
    var key;

    // Update height and width
    self.height = event.detail.height;
    self.width = event.detail.width;

    // loop through query
    for (key in self.breakpoints) {
      self.checkBreakpoint(key);
    }
  }

  checkBreakpoint(key,obj) {
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
  }

  activate(key,obj) {
    var self = this;
    var breakpoints = obj || self.breakpoints;
    var breakpoint = breakpoints[key];

    breakpoint.active = true;

    self.element.classList.add(breakpoint.className);
    if (breakpoint.className.substr(breakpoint.className.length - 10) === 'type-break') self.element.classList.add('type-break');

    self.breakpointEvent.detail.active = true;
    self.breakpointEvent.detail.breakpoint = breakpoint;
    self.element.dispatchEvent(self.breakpointEvent);
  }

  deactivate(key,obj) {
    var self = this;
    var breakpoints = obj || self.breakpoints;
    var breakpoint = breakpoints[key];

    breakpoint.active = false;

    self.element.classList.remove(breakpoint.className);
    if (breakpoint.className.substr(breakpoint.className.length - 10) === 'type-break') self.element.classList.remove('type-break');

    self.breakpointEvent.detail.active = false;
    self.breakpointEvent.detail.breakpoint = breakpoint;
    self.element.dispatchEvent(self.breakpointEvent);
  }
}

