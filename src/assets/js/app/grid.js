define(['require', 'response', 'getStyle'], function(require, response, getStyle) {
  var identifier = 'Devgrid';
  // Holders
  var overlay, colWidth, baseLineHeight, cols, base;

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

  function calculateDimensions() {
    var gridUnit = getStyle('.grid-unit');

    // Columns
    colWidth = parseFloat(gridUnit.match(/width:\s*(\d.*\d*)%;/)[1]);
    colWidth = response/100*colWidth;

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
