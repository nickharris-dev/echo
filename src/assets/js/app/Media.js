import pixelDensity from './pixel-density';
import response from './response';
import ElementResize from './ElementResize';

export default class {
  constructor(element) {
    var self = this;

    self.element = element;
    // An object to store information for the media
    self.media = {};
    self.media.widths =       self.element.getAttribute('data-media-widths').split(',');
    self.media.heights =      self.element.getAttribute('data-media-heights').split(',');
    self.media.aspectRatio =  self.media.widths[0]/self.media.heights[0];
    self.media.focalPointY =  self.element.getAttribute('data-focalpoint-y');
    self.media.focalPointX =  self.element.getAttribute('data-focalpoint-x');
    self.media.type =         self.element.getAttribute('data-media-type');
    self.media.file =         self.element.getAttribute('data-media-file').split(',');
    self.media.ext =          divineExtension();
    self.media.size =         self.getSize();

    // If the element isn't already a resizer, make it one
    if (!this.element.classList.contains('resizing')) {
      let inst = new ElementResize(self.element);
      self.resizeObject = self.element.querySelectorAll('.resizing__object')[0];
    }

    // Only need to work out the extension once, so it doesn't need to be a method
    // media.node is created in here
    function divineExtension() {
      var ext;

      // If the media is a video, and the browser supports video
      if (self.media.type === 'video') {
        // Create a new node
        self.media.node = document.createElement('video');
        // Check which viedo format the browser supports
        if (self.media.node.canPlayType( 'video/webm; codecs="vp8, vorbis"' )) {
          ext = '.webm';
        } else if (self.media.node.canPlayType('video/mp4; codecs="mp4v.20.8"') || self.media.node.canPlayType('video/mp4; codecs="avc1.42E01E"') || self.media.node.canPlayType('video/mp4; codecs="avc1.42E01E, mp4a.40.2"')) {
          ext = '.mp4';
        } else if (self.media.node.canPlayType('video/ogg; codecs="theora"')) {
          ext = '.ogg.theora';
        } else {
          // If it doesn't support any video, serve the backup jpg
          self.media.node = document.createElement('image');
          ext = '.jpg';
        }
      } else {
        // If the media is an image, create the new node
        self.media.node = document.createElement('img');
        ext = self.media.file[0].split('.');
        ext = ext[ext.length-1];
      }
      self.media.node.classList.add('smart-media');
      return ext;
    }

    // Add a listener
    self.element.addEventListener('resizeEnd', function(event) {
      // Anonymous function to preserve scope
      self.calculate();
     });
    // Fire the initial calculation
    self.calculate();
  }

  getSize() {
    var self = this;

    var i = 0;
    var n = self.media.file.length;
    var density = pixelDensity();
    var desirableHeight = self.element.offsetHeight * density;
    var desirableWidth = self.element.offsetWidth * density;
    // Use the biggest one by default, it's safe to do it this way as
    // the options are looped and the first one big enough is used. This
    // value is only used if there's only one value (so it'll be 0) or if
    // none of the options is big enough, in which case we want the
    // biggest anyway
    var size = self.media.file.length-1;

    for (i; i<n; i++) {
      if (self.media.widths[i] >= desirableWidth && self.media.heights[i] >= desirableHeight) {
        size = i;
        break;
      }
    }

    return size;
  }

  buildSrc() {
    var self = this;
    // Return the index file that fits best
    src = self.media.file[self.media.size];
    return src;
  }

  calculate() {
    var self = this;
    var oldSize = self.media.size || 0;
    var newSize = self.getSize();

    // Conditions where we want to fetch a new file:
    if (
      // 1. There is no current one
      // 2. There's more than one file specified and
      // 3. New size is bigger than current one
      !self.media.node.src ||
      (self.media.file.length > 1 && newSize > oldSize)
    ) {
      self.media.size = newSize;
      self.process();
    } else {
      self.position();
    }
  }

  position() {
    var self = this;
    var w = self.element.offsetWidth;
    var h = self.element.offsetHeight;
    var focalPoint, height, centrePoint, reset, startPoint, width;

    // If the container's width divided by the media's aspect ration is greater
    // than the height of the container, then the media will be taller than the
    // container at 100% width, so setting the width style to 100% will ensure
    // total coverage. Otherwise, setting the height style to 100% will ensure
    // total coverage. Make sense? good.
    if (w/self.media.aspectRatio > h) {
      // Set the absolutes
      self.media.node.style.width = '100%';
      self.media.node.style.left = '0';

      // Reset the height + right position, in case of window resize
      self.media.node.style.height = '';
      self.media.node.style.right = '';

      // Get the vertical focal point as a number to be played with
      focalPoint = parseFloat(self.media.focalPointY);

      // Calculate the height of the media node
      height = w/self.media.aspectRatio;
      // Calculate the vertical centre of the container
      centrePoint = h/2;
      // Calculate the reset amount
      reset = focalPoint*(height/100);
      // Calculate the start Point
      startPoint = centrePoint-reset;

      // If the start point is greater than 0, then there would be a gap above
      // the media, therefore, aligning the top of the media with the top of the
      // container will ensure the container is covered and the focal point
      // is visible
      if (startPoint >= 0) {
        self.media.node.style.top = '0';
        self.media.node.style.bottom = '';

      // Else if the height of the media minus the amount of it that's hidden is
      // still greater than the height of the container, the container is
      // covered and the focal point is central
      } else if (height+startPoint > h) {
        self.media.node.style.top = startPoint + 'px';
        self.media.node.style.bottom = '';

      // Otherwise, there must be a gap at the bottom… so aligning the bottom of
      // the media with the bottom of the container will ensure the container is
      // covered and the focal point is visible
      } else {
        self.media.node.style.bottom = '0';
        self.media.node.style.top = '';
      }

    // So now, repeat that but in the other axis for if the height is 100%
    } else {
      self.media.node.style.height = '100%';
      self.media.node.style.top = '0';
      self.media.node.style.width = '';
      self.media.node.style.bottom = '';

      focalPoint = parseFloat(self.media.focalPointX);

      width = h*self.media.aspectRatio;
      centrePoint = w/2;
      reset = focalPoint*(width/100);
      startPoint = centrePoint-reset;

      if (startPoint >= 0) {
        self.media.node.style.left = '0';
        self.media.node.style.right = '';
      } else if (width+startPoint > w) {
        self.media.node.style.left = startPoint + 'px';
        self.media.node.style.right = '';
      } else {
        self.media.node.style.right = '0';
        self.media.node.style.left = '';
      }
    }
  }

  process() {
    var self = this;
    // Position the media element appropriately
    self.position();

    if (self.media.type === 'image') {
      self.media.node.onload = function(){
        self.element.insertBefore(self.media.node, self.resizeObject);
      }
      self.media.node.src = self.buildSrc();
    } else if (self.media.type === 'video') {
      self.media.node.src = self.buildSrc();
      self.element.insertBefore(self.media.node, self.resizeObject);

      // If it's a video, we want it to play automagically and loop
      var loop = document.createAttribute('loop');
      self.media.node.setAttributeNode(loop);
      self.media.node.play();
    }
  }
}
