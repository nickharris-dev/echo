import config from './config';
import ElementResize from './ElementResize';
import InertiaScroll from './InertiaScroll';

export default class {
  constructor(element) {
    var self = this;

    self.element = element;
    self.direction = self.element.getAttribute('data-direction') || 'ltr';
    self.slider = self.element.querySelectorAll('.slider')[0];
    self.slides = self.element.querySelectorAll('.slide');
    self.slideWidth = self.slides[0].offsetWidth;
    self.reqWidth = self.slideWidth * self.slides.length;
    self.reflow = new ElementResize(element);

    self.runCheck();
    self.element.addEventListener('resizeEnd', function() {
      self.runCheck();
    });
  }

  prepare() {
    var self = this;

    self.slider.style.position = 'absolute';
    self.slider.style.top = '0';
    self.slider.style.width = self.reqWidth +'px';
    self.inertia = config.touchEnabled ? new InertiaScroll(self.slider) : false;

    if (self.direction === 'ltr') {
      self.slider.style.left = 0;
      self.slider.style.right = 'auto';
    } else if (self.direction === 'rtl') {
      self.slider.style.left = 'auto';
      self.slider.style.right = 0;
    } else {
      throw new Error('What direction is ' + self.direction + '?');
    }
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
