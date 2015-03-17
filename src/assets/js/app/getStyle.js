define(function(require){
  function getStyle(className) {
    var classes = document.styleSheets[1].rules || document.styleSheets[1].cssRules;
    var i = 0;
    var n = classes.length;
    var answer;

    for (i; i < n; i++) {
      if (classes[i].selectorText == className) {
        answer = classes[i].cssText ? classes[i].cssText : classes[i].style.cssText;
        break;
      }
    }
    return answer;
  }

  return getStyle;
});
