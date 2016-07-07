import scrollTo from './scrollTo';

export default function(){
  // Get a list of all links in the page
  var anchors = document.getElementsByTagName('a');
  var i = 0;
  var n = anchors.length;

  for (i; i<n; i++) {
    var anchor = anchors[i];

    if (  !anchor.getAttribute('data-linkProcessed') &&
          anchor.href &&
          (anchor.hostname && anchor.hostname !== location.hostname)
        ) {

      // External Links
      anchor.addEventListener('click', external);
      anchor.setAttribute('data-linkProcessed', true);

    } else if ( !anchor.getAttribute('data-linkProcessed') &&
                (anchor.href && anchor.href.indexOf('#') != -1) &&
                (anchor.hostname == location.hostname) &&
                ((anchor.pathname == location.pathname) || ('/'+anchor.pathname == location.pathname)) &&
                (anchor.search == location.search)
              ) {

      // Hash on the same page
      anchor.addEventListener('click', scroll);
    }
  }

  function external(event) {
    event.stopPropagation();
    event.preventDefault();

    window.open(this.href, 'fromEcho');
  }

  function ease(t) {
    return t*(2-t)
  }

  function scroll(event) {
    event.stopPropagation();
    event.preventDefault();

    var targetStr = this.hash.substring(1);
    var target = document.getElementById(targetStr);
    scrollTo(target.offsetTop, 1000, ease);
  }
}

