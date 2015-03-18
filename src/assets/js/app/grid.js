define(['require', 'response', 'getStyle'], function(require, response, getStyle) {
  var identifier = 'Devgrid';
  // Holders
  var overlay, svg, colWidth, gutterWidth, baseLineHeight, cols, gutters, base;

  function createOverlay() {
    var overlayStyle =  'background-position: 0 1px;';
        overlayStyle += 'display: block;';
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
    svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  }

  function createColumns() {
    var col;
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
    var fontSize = parseFloat(getComputedStyle(overlay).fontSize);
    baseLineHeight = parseFloat(gridUnit.match(/height:\s*(\d.*\d*);/)[1]);
    baseLineHeight = fontSize*baseLineHeight;
  }

  function toggleGrid() {
    if(overlay.style.display === 'block') {
      overlay.style.display = 'none';
    } else {
      overlay.style.display = 'block';
    }
  }

  window.grid = function(){
    toggleGrid();
  };

  window.columns = function(){
    toggleGrid();
  };

  window.baseline = function(){
    toggleGrid();
  };

  // Initialise
  (function () {
    createOverlay();
    calculateDimensions();
  })();
});
