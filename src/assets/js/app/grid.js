define(['require', 'response', 'getStyle'], function(require, response, getStyle) {
  var identifier = 'Devgrid';
  var svgNS = 'http://www.w3.org/2000/svg';
  // Holders
  var overlay, svg, colWidth, gutterWidth, baseLineHeight, cols, gutters, base;

  function Shape(w,h,c,x,y) {
    var rect = document.createElementNS(svgNS,'rect');
    rect.setAttribute('x',x || 0);
    rect.setAttribute('y',y || 0);
    rect.setAttribute('width',w);
    rect.setAttribute('height',h);
    rect.setAttribute('fill',c);
    svg.appendChild(rect);

    return rect;
  }

  function createOverlay() {
    var overlayStyle =  'display: block;';
        overlayStyle += 'height: 100%;';
        overlayStyle += 'left: 0;';
        overlayStyle += 'pointer-events: none;';
        overlayStyle += 'position: absolute;';
        overlayStyle += 'top: 0;';
        overlayStyle += 'width: 100%;';
        overlayStyle += 'z-index: 100;';

    overlay = document.createElement('div');
    overlay.setAttribute('id', identifier);
    overlay.setAttribute('style', overlayStyle);

    document.body.appendChild(overlay);
  }

  function createSVG() {
    var h = baseLineHeight;
    var w = colWidth*2;

    svg = document.createElementNS(svgNS, 'svg');
    svg.setAttributeNS (null, "viewBox", "0 0 " + w + " " + h);
    svg.setAttributeNS (null, "width", w);
    svg.setAttributeNS (null, "height", h);

    createCols();
    createGutters();
    createBaseline();

    var svgString = new XMLSerializer().serializeToString(svg);
    var svgData = btoa(svgString);
    overlay.style.backgroundImage = 'url("data:image/svg+xml;base64,'+svgData+'")';
  }

  function createCols() {
    cols = [];
    cols[0] = new Shape(colWidth,baseLineHeight,'rgba(0,255,255,0.1)');
    cols[1] = new Shape(colWidth,baseLineHeight,'rgba(0,0,0,0.07)',colWidth);
  }

  function createGutters() {
    gutters = [];
    gutters[0] = new Shape(gutterWidth,baseLineHeight,'rgba(0,255,255,0.2)');
    gutters[1] = new Shape(gutterWidth,baseLineHeight,'rgba(0,255,255,0.2)',colWidth-gutterWidth);
    gutters[2] = new Shape(gutterWidth,baseLineHeight,'rgba(0,0,0,0.07)',colWidth);
    gutters[3] = new Shape(gutterWidth,baseLineHeight,'rgba(0,0,0,0.07)',colWidth*2-gutterWidth);
  }

  function createBaseline() {
    base = new Shape(colWidth*2,1,'rgb(255,0,0');
  }

  function calculateUnits(x,unit,y) {
    var result;

    switch (unit){
      case 'px':
        result = x;
        break;
      case 'em':
        result = x*parseFloat(getComputedStyle(overlay).fontSize);
        break;
      case 'rem':
        result = x*parseFloat(getComputedStyle(document.body).fontSize);
        break;
      case '%':
        result = y/100*x;
        break;
    }

    return result;
  }

  function calculateDimensions() {
    var gridUnit = getStyle('.grid-unit');

    // Columns
    var colEx = gridUnit.match(/width:\s*(\d*\.?\d*)(px|r?em|%);/);
    var colU = colEx[2];
    colWidth = parseFloat(colEx[1]);
    colWidth = calculateUnits(colWidth,colU,response);

    // Gutters
    var gutterEx = gridUnit.match(/padding-?\w*:\s*(\d*\.?\d*)(px|r?em|%);/);
    var gutterU = gutterEx[2];
    gutterWidth = parseFloat(gutterEx[1]);
    gutterWidth = calculateUnits(gutterWidth,gutterU,colWidth);

    // Baseline
    var fontSize = getComputedStyle(overlay).fontSize;
    fontSize = parseFloat(fontSize);
    baseLineHeight = parseFloat(gridUnit.match(/height:\s*(\d.*\d*);/)[1]);
    baseLineHeight = fontSize*baseLineHeight;
  }

  // Initialise
  (function () {
    createOverlay();
    calculateDimensions();
    createSVG();
  })();
});
