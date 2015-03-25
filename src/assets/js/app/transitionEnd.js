define(function(require){
  function transitionEnd() {
    var key;
    var transitions = {
      'transition':'transitionend',
      'OTransition':'otransitionend',
      'MozTransition':'transitionend',
      'WebkitTransition':'webkitTransitionEnd'
    };
    var el = document.createElement('div');

    for (key in transitions) {
      if (transitions.hasOwnProperty(key) && el.style[key] !== undefined) {
        return transitions[key];
      }
    }
  }

  return transitionEnd;
});
