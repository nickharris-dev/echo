define(function(require){

  function idFactory(node) {
    var str;

    if (node.getAttribute('id')) {
      str = node.getAttribute('id');
    } else if (node.classList) {
      str = node.classList[0];
    } else {
      str = node.className;
      str = str.split(' ')[0];
    }

    str = str.match(/(\w+)-?/);
    str = str[1];

    return str;
  }

  return idFactory;
});
