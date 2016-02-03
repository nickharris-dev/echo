 function support(prop) {
    var div = document.createElement('div');
    var vendors = ['Khtml','Ms','O','Moz','Webkit'];
    var len = vendors.length;

    if ( prop in div.style ) return prop;

    prop = prop.replace(/^[a-z]/, function(val) {
      return val.toUpperCase();
    });

    while(len--) {
      var prefixed = vendors[len] + prop;
      if ( prefixed in div.style ) return prefixed;
    }
    return false;
};

module.exports = support;
