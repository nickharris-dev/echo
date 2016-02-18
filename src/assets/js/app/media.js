import pixelDensity from './pixel-density';
import response from './response';
import ElementResize from './ElementResize';

export default function(){
  var processedMessage = 'processed';
  var mediaElements = {};

  getUnprocessed(document.querySelectorAll('[data-media]'));

  function makeid() {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for( var i=0; i < 5; i++ )
      text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
  }

  // Basically a container for a loop that will return all the media elements
  // that haven't yet been processed
  function getUnprocessed(nodelist) {
    // Set up for the for loop, define them here and the loop is quicker (it
    // doesn't have to keep calculating the values)
    var i = 0;
    var len = nodelist.length;

    for (i; i<len; i++) {
      node = nodelist[i];
      // Check if the data attribute is already populated
      if (node.getAttribute('data-media') !== processedMessage) {
        // If not, create the reflow (if it doesn't exist)
        if (!node.classList.contains('resizing')) {
          let inst = new ElementResize(node);
        }
        // Generate an identifier
        var ident = makeid();
        // Store that identifier on the node
        node.setAttribute('data-ident', ident);
        // and create another object with lots of lovely details
        var elem = {};
        elem.media = {};

        elem.media.widths = node.getAttribute('data-media-widths').split(',');
        elem.media.heights = node.getAttribute('data-media-heights').split(',');
        elem.media.aspectRatio = elem.media.widths[0]/elem.media.heights[0];
        elem.media.focalPointY = node.getAttribute('data-focalpoint-y');
        elem.media.focalPointX = node.getAttribute('data-focalpoint-x');
        elem.media.type = node.getAttribute('data-media-type');
        elem.media.file = node.getAttribute('data-media-file').split(',');
        elem.media.ext = divineExtension(elem);
        elem.media.size = getSize(elem, node.offsetHeight, node.offsetWidth);

        // Add to the object
        mediaElements[ident] = elem;
        // Add a listener
        node.addEventListener('resizeEnd', calculate);
        // Mark the node as processed so if I need to run this all again
        // after an AJAX call, I won't be doubling my efforts
        node.setAttribute('data-media', processedMessage);
        // Fire the initial calculation
        calculate.call(node);
      }
    }
  }

  // Used in getUnprocessed()
  function divineExtension(elem) {
    var ext;
    // If the media is a video, and the browser supports video
    if (elem.media.type === 'video') {
      // Create a new node
      elem.media.node = document.createElement('video');
      // Check which viedo format the browser supports
      if (elem.media.node.canPlayType( 'video/webm; codecs="vp8, vorbis"' )) {
        ext = '.webm';
      } else if (elem.media.node.canPlayType('video/mp4; codecs="mp4v.20.8"') || elem.media.node.canPlayType('video/mp4; codecs="avc1.42E01E"') || elem.media.node.canPlayType('video/mp4; codecs="avc1.42E01E, mp4a.40.2"')) {
        ext = '.mp4';
      } else if (elem.media.node.canPlayType('video/ogg; codecs="theora"')) {
        ext = '.ogg.theora';
      } else {
        // If it doesn't support any video, serve the backup jpg
        elem.media.node = document.createElement('image');
        ext = '.jpg';
      }
    } else {
      // If the media is an image, create the new node
      elem.media.node = document.createElement('img');
      ext = elem.media.file[0].split('.');
      ext = ext[ext.length-1];
    }
    elem.media.node.classList.add('smart-media');
    return ext;
  }

  function getSize(elem, h, w) {
    var i = 0;
    var n = elem.media.file.length;
    var density = pixelDensity();
    var desirableHeight = h * density;
    var desirableWidth = w * density;
    // Use the biggest one by default, it's safe to do it this way as
    // the options are looped and the first one big enough is used. This
    // value is only used if there's only one value (so it'll be 0) or if
    // none of the options is big enough, in which case we want the
    // biggest anyway
    var size = elem.media.file.length-1;

    for (i; i<n; i++) {
      if (elem.media.widths[i] >= desirableWidth && elem.media.heights[i] >= desirableHeight) {
        size = i;
        break;
      }
    }

    return size;
  }

  // Used in process()
  function buildSrc(elem) {
    // Return the file that fits best
    src = elem.media.file[elem.media.size];
    return src;
  }

  // Used in process()
  function position(node, h, w) {
    var elem = mediaElements[node.getAttribute('data-ident')];
    var focalPoint, height, centrePoint, reset, startPoint, width;

    // If the container's width divided by the media's aspect ration is greater
    // than the height of the container, then the media will be taller than the
    // container at 100% width, so setting the width style to 100% will ensure
    // total coverage. Otherwise, setting the height style to 100% will ensure
    // total coverage. Make sense? good.
    if (w/elem.media.aspectRatio > h) {
      // Set the absolutes
      elem.media.node.style.width = '100%';
      elem.media.node.style.left = '0';

      // Reset the height + right position, in case of window resize
      elem.media.node.style.height = '';
      elem.media.node.style.right = '';

      // Get the vertical focal point as a number to be played with
      focalPoint = parseFloat(elem.media.focalPointY);

      // Calculate the height of the media node
      height = w/elem.media.aspectRatio;
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
        elem.media.node.style.top = '0';
        elem.media.node.style.bottom = '';

      // Else if the height of the media minus the amount of it that's hidden is
      // still greater than the height of the container, the container is
      // covered and the focal point is central
      } else if (height+startPoint > h) {
        elem.media.node.style.top = startPoint + 'px';
        elem.media.node.style.bottom = '';

      // Otherwise, there must be a gap at the bottom… so aligning the bottom of
      // the media with the bottom of the container will ensure the container is
      // covered and the focal point is visible
      } else {
        elem.media.node.style.bottom = '0';
        elem.media.node.style.top = '';
      }

    // So now, repeat that but in the other axis for if the height is 100%
    } else {
      elem.media.node.style.height = '100%';
      elem.media.node.style.top = '0';
      elem.media.node.style.width = '';
      elem.media.node.style.bottom = '';

      focalPoint = parseFloat(elem.media.focalPointX);

      width = h*elem.media.aspectRatio;
      centrePoint = w/2;
      reset = focalPoint*(width/100);
      startPoint = centrePoint-reset;

      if (startPoint >= 0) {
        elem.media.node.style.left = '0';
        elem.media.node.style.right = '';
      } else if (width+startPoint > w) {
        elem.media.node.style.left = startPoint + 'px';
        elem.media.node.style.right = '';
      } else {
        elem.media.node.style.right = '0';
        elem.media.node.style.left = '';
      }
    }
  }

  function process(node, h, w) {
    var elem = mediaElements[node.getAttribute('data-ident')];
    // Position the media element appropriately
    position(node, h, w);

    if (elem.media.type === 'image') {
      elem.media.node.onload = function(){
        node.appendChild(elem.media.node);
      }
      elem.media.node.src = buildSrc(elem);
    } else if (elem.media.type === 'video') {
      elem.media.node.src = buildSrc(elem);
      node.appendChild(elem.media.node);

      // If it's a video, we want it to play automagically and loop
      var loop = document.createAttribute('loop');
      elem.media.node.setAttributeNode(loop);
      elem.media.node.play();
    }
  }

  function calculate(event) {
    var elem = mediaElements[this.getAttribute('data-ident')];
    var h, w;

    if (event && event.detail) {
      h = event.detail.height;
      w = event.detail.width;
    } else {
      h = this.offsetHeight;
      w = this.offsetWidth;
    }

    // Conditions where we want to fetch a new file:
    if (
      // 1. There is no current one
      // 2. There's more than one file specified and
      // 3. New size is bigger than current one
      !elem.media.node.src ||
      (elem.media.file.length > 1 && getSize(elem, h, w) > elem.media.size)
    ) {
      // There's no need to remove the element before processing, as the
      // existing element is just updated with the new src
      process(node, h, w);
    } else {
      position(node, h, w);
    }
  }

  // Todo - addEventListener on ajax success
};
