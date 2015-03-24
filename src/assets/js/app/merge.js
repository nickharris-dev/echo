define(function(require){
  function merge(obj1, obj2) {
    'use strict';

    var obj3 = {};
    for (var x in obj1) {
      obj3[x] = obj1[x];
    }
    for (var y in obj2) {
      obj3[y] = obj2[y];
    }
    return obj3;
  }

  return merge;
});
