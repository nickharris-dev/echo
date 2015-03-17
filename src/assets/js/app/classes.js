define(['require'], function(){
  var Classes = {};

  Classes.prototype = {

    add: function(el, str) {
      if (el.classList)
        el.classList.add(str);
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
