define(['require', 'config', 'Slider'], function(require, config,Slider){
  var container = document.getElementById('Fixtures');
  var fixtures = '.fixtures__fixture';
  var slider, breakpoint, button;

  function onLoad() {
    if (config.elementqueries.fixtures && config.elementqueries.fixtures.breakpoints.linear.active) {
      linear();
      container.addEventListener('resizeEnd', linear);
    } else {
      stacked();
    }

    container.addEventListener('breakpoint', brk);
  }

  function brk(event) {
    if (event.active) {
      container.removeChild(button);
      container.style.maxHeight = '';

      linear();
      container.addEventListener('resizeEnd', linear);
    } else {
      if (slider) {
        slider.destroy();
        slider = undefined;
      }

      stacked();
      container.removeEventListener('resizeEnd', linear);
    }
  }

  function stacked() {
    button = document.createElement('button');
    var fixtureList = container.querySelectorAll(fixtures);
    var totHeight = fixtureList[0].offsetHeight*fixtureList.length;


    function showMore() {
      container.style.maxHeight = totHeight+button.offsetHeight+'px';
      button.innerHTML = 'Fewer';
      button.removeEventListener('click', showMore);
      button.addEventListener('click', showFewer);
    }

    function showFewer() {
      container.style.maxHeight = '';
      button.innerHTML = 'More';
      button.removeEventListener('click', showFewer);
      button.addEventListener('click', showMore);
    }

    button.innerHTML = 'More';
    button.className = 'fixtures__more';
    button.addEventListener('click', showMore);
    container.appendChild(button);
  }

  function linear(event) {
    // Set the variables every time
    var nodeList = container.querySelectorAll(fixtures);
    var fixtureWidth = nodeList[0].offsetWidth;
    var widthAvailable = container.offsetWidth;
    var widthNeeded = fixtureWidth*nodeList.length;

    // This check is needed because resizeEnd is always fired an instant before
    // breakpoint, so it's creating the slider before breakpoint is applied,
    // making for a massive slider tray width
    if (config.elementqueries.fixtures.breakpoints.linear.active) {
      if (widthNeeded > widthAvailable) {
        if (!slider) {
          slider = new Slider(container, fixtures);
        } else {
          slider.refresh();
        }
      }
    }
  }

  onLoad();
});
