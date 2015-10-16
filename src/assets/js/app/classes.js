define(['require'], function(){
  var Classes = {};

  Classes.prototype = {

    contains: function(el, str) {
      if (el.classList) {
        return el.classList.contains(str);
      } else {
        var tmp = new RegExp('(^| )' + str + '( |$)', 'gi').test(el.className);
        return tmp;
      }
    },

    add: function(el, str) {
      if (el.classList) {
        var i = 0;
        var n;

        str = str.split(' ');
        n = str.length;

        for (i; i<n; i++) {
          el.classList.add(str[i]);
        }
      }
      else
        el.className += ' ' + str;
    },

    remove: function(el, str) {
      if (el.classList)
        el.classList.remove(str);
      else
        el.className = el.className.replace(new RegExp('(^|\\b)' + str.split(' ').join('|') + '(\\b|$)', 'gi'), ' ');
    }

  };

  return Object.create(Classes.prototype);
});
