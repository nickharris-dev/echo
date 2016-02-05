import easing from './easing';

/* bits and bytes of the scrollTo function inspired by the works of Benjamin DeCock */
export default function(Y, duration, easingFunction, callback) {
    var start = Date.now(),
      elem = document.documentElement.scrollTop?document.documentElement:document.body,
      from = elem.scrollTop;

    if(from === Y) {
        if (callback) callback();
        return; /* Prevent scrolling to the Y point if already there */
    }

    function min(a,b) {
      return a<b?a:b;
    }

    function scroll(timestamp) {

        var currentTime = Date.now(),
            time = min(1, ((currentTime - start) / duration)),
            easedT = easingFunction(time);

        elem.scrollTop = (easedT * (Y - from)) + from;

        if  (time < 1) requestAnimationFrame(scroll);
        else if(callback) callback();
    }

    requestAnimationFrame(scroll)
}
