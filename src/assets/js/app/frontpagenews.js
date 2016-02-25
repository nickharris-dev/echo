import config from './config';
import ajax from './ajax';
import response from './response';

export default function() {
  var news = document.getElementById('News');
  var numberOfPosts = news.getAttribute('data-posts');
  var moreButton = news.querySelectorAll('.button--more-news')[0]
  var moreLink = moreButton.getAttribute('href');
  var existingWrapper = news.querySelectorAll('.posts__wrapper')[0];
  var breakpoint = 56.25*config.baseFontSize;
  var dummyPosts = [];
  var newWrapper, remotePosts;

  function createDummyPosts() {
    var i = 0;
    var n;

    if (numberOfPosts > 4) {
      n = 4;
    } else {
      n = 1;
    }

    for (i; i<n; i++) {
      var article = document.createElement('article');
      var html =  '<div class="posts__post__copy  posts__post__copy--dummy">\n';
          html += '<h1 class="posts__post__heading posts__post__heading--dummy">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<br></h1>\n';
          html += '<p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;</p>\n';
          html += '</div>\n';
          html += '<figure class="posts__post__pic posts__post__pic--dummy"><div></div></figure>';

      article.classList.add('posts__post');
      article.innerHTML = html;

      dummyPosts.push(article);
    }
  }

  function populateDummyPosts() {
    var i = 1;
    var n = dummyPosts.length;

    existingWrapper.appendChild(dummyPosts[0]);
    newWrapper = document.createElement('div');
    newWrapper.classList.add('posts__wrapper');

    for (i; i<n; i++) {
      newWrapper.appendChild(dummyPosts[i]);
    }

    news.removeChild(moreButton);
    news.appendChild(newWrapper);
    if (numberOfPosts > 7) news.appendChild(moreButton);
  }

  function success(xhr) {
    remotePosts = xhr.responseXML.querySelectorAll('.posts__post');

    addToPage();
  }

  function addToPage() {
    var i = 4;
    var n = 8;

    dummyPosts[0].innerHTML = remotePosts[3].innerHTML;

    for (i; i<n; i++) {
      if (remotePosts[i]) {
        var html = remotePosts[i].innerHTML;
        var dummyPost = dummyPosts[i-3];

        dummyPost.innerHTML = html;
      }
    }
  }

  function hereWeGoMagic() {
    createDummyPosts();
    populateDummyPosts();
    ajax(moreLink, success);
  }
  if (response() >= breakpoint) hereWeGoMagic();

  window.addEventListener('resized', function(event){
    if (newWrapper || event.viewportSize < breakpoint) {
      return false;
    } else {
      hereWeGoMagic();
    }
  });
}
