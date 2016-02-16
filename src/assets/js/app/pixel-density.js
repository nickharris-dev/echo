export default function() {
  // Simple return for now, in a module so that if any browsers kick up a fuss
  // later I can make this more elegant
  return window.devicePixelRatio || 1;
}

module.exports = pixelDensity();
