export default function(i, p) {
  function checkStyle(identifier, property) {
    var elem = elementFactory(identifier);
    var value = getComputedStyle(elem)[property];
    document.documentElement.removeChild(elem);
    elem = null;
    return value;
  }

  function elementFactory(identifier) {
    var identifierType = checkIdentifier(identifier);

    if (identifierType == 'ID') {
      elem = document.createElement('div');
      elem.setAttribute('id', identifier.substring(1));
    } else if (identifierType == 'class') {
      elem = document.createElement('div');
      elem.setAttribute('class', identifier.substring(1));
    } else {
      elem = document.createElement(identifier);
    }
    document.documentElement.appendChild(elem);

    return elem;
  }

  function checkIdentifier(identifier) {
    var character = identifier.charAt(0);
    var type;

    switch (character) {
      case '#':
        type = 'ID';
        break;
      case '.':
        type = 'class';
        break;
      default:
        type = 'element';
    }
    return type;
  }

  return checkStyle(i, p);
}
