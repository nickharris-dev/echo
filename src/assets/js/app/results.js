import config from './config';
import InertiaScroll from './InertiaScroll';

export default class {
  constructor(element) {
    var self = this;

    self.element = element;
    self.slider = self.element.querySelectorAll('.slider')[0];
    self.slides = self.element.querySelectorAll('.slide');
    self.slideWidth = self.slides[0].offsetWidth;
    self.reqWidth = self.slideWidth * self.slides.length;

    self.runCheck();
    self.element.addEventListener('resizeEnd', self.runCheck);
  }

  prepare() {
    var self = this;

    self.slider.style.width = self.reqWidth +'px';
    self.slider.classList.add('results__wrapper--slide');
    self.inertia = config.touchEnabled ? new InertiaScroll(self.slider) : false;
  }

  destroy() {
    var self = this;

    self.slider.setAttribute('style', '');
    self.slider.classList.remove('results__wrapper--slide');
    if (self.inertia) inertia.destroy();
  }

  runCheck(event) {
    var self = this;

    if (self.element.offsetWidth < self.reqWidth) {
      self.prepare();
    } else {
      self.destroy();
    }
  }
}
