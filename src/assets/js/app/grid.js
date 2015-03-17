define(['require', 'response', 'getStyle'], function(require, response, getStyle) {
  var identifier = 'Devgrid';
  // Holders for the shapes that will create the grid in the svg;
  var cols, base;

  var overlay = document.createElement('div');
  var overlayStyle =  'background-position: 0 1px';
      overlayStyle += 'display: block;';
      overlayStyle += 'height: 100%;';
      overlayStyle += 'left: 0;';
      overlayStyle += 'pointer-events: none;';
      overlayStyle += 'position: absolute;';
      overlayStyle += 'top: 0;';
      overlayStyle += 'width: 100%;';
      overlayStyle += 'z-index: 100;';

  overlay.setAttribute('id', identifier);
  overlay.setAttribute('style', overlayStyle);

  document.body.appendChild(overlay);

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
});
