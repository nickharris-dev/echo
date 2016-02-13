import config from './config';
import response from './response';
import getStyle from './getStyle';

export default function() {
  var identifier = 'Devgrid';
  var windowWidth = response();
  var store = {
    columns: 'devGrid__columns',
    gutters: 'devGrid__gutters',
    baseline: 'devGrid__baseline',
    opacity: 'devGrid__opacity'
  };
  var svgNS = 'http://www.w3.org/2000/svg';
  // Holders
  var overlay, colWidth, gutterWidth, baseLineHeight;

  function Shape(svg,w,h,c,x,y) {
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
        overlayStyle += 'height: '+ document.body.offsetHeight +'px;';
        overlayStyle += 'left: 0;';
        overlayStyle += 'opacity:'+ localStorage.getItem(store.opacity) +';';
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

    var svg = document.createElementNS(svgNS, 'svg');
    svg.setAttributeNS (null, "viewBox", "0 0 " + w + " " + h);
    svg.setAttributeNS (null, "width", w);
    svg.setAttributeNS (null, "height", h);

    if (localStorage.getItem(store.columns)) createCols(svg);
    if (localStorage.getItem(store.gutters)) createGutters(svg);
    if (localStorage.getItem(store.baseline)) createBaseline(svg);

    var svgString = new XMLSerializer().serializeToString(svg);
    var svgData = btoa(svgString);
    overlay.style.backgroundImage = 'url("data:image/svg+xml;base64,'+svgData+'")';
  }

  function createCols(svg) {
    var cols = [];
    cols[0] = new Shape(svg,colWidth,baseLineHeight,'rgba(0,255,255,0.5)');
    cols[1] = new Shape(svg,colWidth,baseLineHeight,'rgba(0,0,0,0.35)',colWidth);
  }

  function createGutters(svg) {
    var gutters = [];
    gutters[0] = new Shape(svg,gutterWidth,baseLineHeight,'rgba(0,255,255,0.8)');
    gutters[1] = new Shape(svg,gutterWidth,baseLineHeight,'rgba(0,255,255,0.8)',colWidth-gutterWidth);
    gutters[2] = new Shape(svg,gutterWidth,baseLineHeight,'rgba(0,0,0,0.35)',colWidth);
    gutters[3] = new Shape(svg,gutterWidth,baseLineHeight,'rgba(0,0,0,0.35)',colWidth*2-gutterWidth);
  }

  function createBaseline(svg) {
    var base = new Shape(svg,colWidth*2,1,'rgb(255,0,0');
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
        result = x*parseFloat(config.baseFontSize);
        break;
      case '%':
        result = y/100*x;
        break;
    }

    return result;
  }

  function calculateDimensions() {
    // Columns
    colWidth = parseFloat(getStyle('.grid-unit', 'width'));

    // Gutters
    gutterWidth = parseFloat(getStyle('.grid-unit', 'padding'));

    // Baseline
    baseLineHeight = parseFloat(getStyle('.grid-unit', 'height'));
  }

  function createGrid() {
    if (!localStorage.getItem(store.opacity)) localStorage.setItem(store.opacity, 0.2);
    createOverlay();
    calculateDimensions();
    createSVG();
  }

  function destroyGrid() {
    document.body.removeChild(overlay);

    if (localStorage.getItem(store.columns)) localStorage.removeItem(store.columns);
    if (localStorage.getItem(store.gutters)) localStorage.removeItem(store.gutters);
    if (localStorage.getItem(store.baseline)) localStorage.removeItem(store.baseline);
  }

  function rebuildGrid() {
    calculateDimensions();
    createSVG();
  }

  function toggleGrid(elem) {
    var others = [];
    var message;

    switch(elem) {
      case 'columns':
        others[0] = 'gutters';
        others[1] = 'baseline';
        break;
      case 'gutters':
        others[0] = 'columns';
        others[1] = 'baseline';
        break;
      case 'baseline':
        others[0] = 'gutters';
        others[1] = 'columns';
        break;
    }

    function add() {
      localStorage.setItem(store[elem], true);
      if (localStorage.getItem(store[others[0]]) || localStorage.getItem(store[others[1]])) {
        rebuildGrid();
      } else {
        createGrid();
      }
      message = elem+' ON';
    }

    function remove() {
      localStorage.removeItem(store[elem]);
      if (localStorage.getItem(store[others[0]]) || localStorage.getItem(store[others[1]])) {
        rebuildGrid();
      } else {
        destroyGrid();
      }
      message = elem+' OFF';
    }

    if (localStorage.getItem(store[elem])) {
      remove();
    } else {
      add();
    }

    return message;
  }

  window.grid = function (opacity) {
    var message;

    if (localStorage.getItem(store.columns) && localStorage.getItem(store.gutters) && localStorage.getItem(store.baseline)) {
      if (opacity) {
        localStorage.setItem(store.opacity, opacity);
        overlay.style.opacity = opacity;
        message = "grid @ " + localStorage.getItem(store.opacity)*100 + '%';
      } else {
        destroyGrid();
        message = "grid OFF";
      }
    } else {
      if (opacity) localStorage.setItem(store.opacity, opacity);
      if (document.getElementById(identifier)) destroyGrid();
      localStorage.setItem(store.columns, true);
      localStorage.setItem(store.gutters, true);
      localStorage.setItem(store.baseline, true);
      createGrid();
      message = "grid @ " + localStorage.getItem(store.opacity)*100 + '%';
    }
    return message;
  };

  window.columns = function () {
    return toggleGrid('columns');
  };

  window.gutters = function () {
    return toggleGrid('gutters');
  };

  window.baseline = function () {
    return toggleGrid('baseline');
  };

  // Initialise
  (function () {
    if (localStorage.getItem(store.columns) || localStorage.getItem(store.gutters) || localStorage.getItem(store.baseline)) {
      createGrid();
    }

    window.addEventListener('resized', function(e){
      if (document.getElementById(identifier)) {
        windowWidth = e.viewportSize;
        rebuildGrid();
      }
    });
  })();
}
