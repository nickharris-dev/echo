define(function(require){
  function cycleStylesheets(className) {
    var i = 0;
    var n = document.styleSheets.length;
    var answer = null;

    for (i; i<n; i++) {
      answer = checkSheet(document.styleSheets[i], className) || answer;
    }

    return answer;
  }

  function checkSheet(stylesheet, className) {
    var rules = stylesheet.rules || stylesheet.cssRules;
    var answer;

    if (rules) {
      answer = getStyle(rules, className);
      return answer;
    }
  }

  function getStyle(rules, className) {
    var i = 0;
    var n = rules.length;
    var answer;

    for (i; i < n; i++) {
      if (rules[i].selectorText == className) {
        answer = rules[i].cssText ? rules[i].cssText : rules[i].style.cssText;
      }
    }
    return answer;
  }

  return cycleStylesheets;
});
