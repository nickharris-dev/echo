import config from './config';
import ajax from './ajax';
import response from './response';
import Media from './Media';

export default function() {
  var news = document.getElementById('News');
  var numberOfPosts = news.getAttribute('data-posts');
  var footer = news.querySelectorAll('footer')[0];
  var moreButton = news.querySelectorAll('.button--more-news')[0];
  var moreLink = moreButton.getAttribute('href');
  var breakpoint = 38*config.baseFontSize;
  var dummyPosts = [];
  var remotePosts;

  function createDummyPosts() {
    var i = 0;
    var n = 3;

    for (i; i<n; i++) {
      var article = document.createElement('article');
      var html =  '<div class="posts__post__copy  posts__post__copy--dummy">\n';
          html += '<h1 class="posts__post__heading posts__post__heading--dummy">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<br></h1>\n';
          html += '<p class="posts__post__excerpt posts__post__excerpt--dummy"><span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;</span></p>\n';
          html += '</div>\n';
          html += '<div class="posts__post__pic posts__post__pic--dummy"></div>';

      article.classList.add('posts__post');
      article.innerHTML = html;

      dummyPosts.push(article);
    }
  }

  function populateDummyPosts() {
    var i = 0;
    var n = dummyPosts.length;

    for (i; i<n; i++) {
      news.insertBefore(dummyPosts[i], footer);
    }

    if (numberOfPosts < 7 && footer) news.removeChild(footer);
  }

  function success(xhr) {
    remotePosts = xhr.responseXML.querySelectorAll('.posts__post');

    addToPage();
  }

  function addToPage() {
    var i = 3;
    var n = 7;

    for (i; i<n; i++) {
      if (remotePosts[i]) {
        var html = remotePosts[i].innerHTML;
        var dummyPost = dummyPosts[i-3];

        dummyPost.innerHTML = html;
        let smart = new Media(dummyPost.querySelectorAll('[data-media]')[0]);
      }
    }
  }

  function addPosts() {
    createDummyPosts();
    populateDummyPosts();
    ajax(moreLink, success);
  }

  if (response() >= breakpoint && news.querySelectorAll('.posts__post').length < 4) addPosts();

  window.addEventListener('resized', function(event){
    if (event.viewportSize < breakpoint || news.querySelectorAll('.posts__post').length > 3) {
      return false;
    } else {
      addPosts();
    }
  });
}
