define(['require', 'config', 'Reflow', 'InertiaScroll'], function(require, config, Reflow, InertiaScroll){
  var results = document.getElementById('Results');
  var slider = results.querySelectorAll('.results__wrapper')[0];
  var games = results.querySelectorAll('.game');
  var gameWidth = games[0].offsetWidth;
  var reqWidth = gameWidth * games.length;
  var reflow = new Reflow(results, false);
  var inertia = false;

  function prepareSlider() {
    slider.style.width = reqWidth +'px';
    slider.classList.add('results__wrapper--slide');
    if (config.touchEnabled) inertia = new InertiaScroll(slider);
  }

  function destroySlider() {
    slider.setAttribute('style', '');
    slider.classList.remove('results__wrapper--slide');
    if (inertia) inertia.destroy();
  }

  function carouselFactory() {
    prepareSlider();
  }

  function carouselBomb() {
    destroySlider();
  }

  function runCheck(event) {
    if (results.offsetWidth < reqWidth) {
      carouselFactory();
    } else {
      carouselBomb();
    }
  }

  runCheck();
  results.addEventListener('resizeEnd', runCheck);
});
