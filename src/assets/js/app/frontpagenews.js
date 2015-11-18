define(['require', 'config', 'classes', 'ajax', 'response'], function(require, config, classes, ajax, response){
  var news = document.getElementById('News');
  var moreButton = news.querySelectorAll('.button--more-news')[0]
  var moreLink = moreButton.getAttribute('href');
  var existingWrapper = news.querySelectorAll('.posts__wrapper')[0];
  var breakPoint = 56.25*config.baseFontSize;
  var dummyPosts = [];
  var newWrapper, remotePosts;

  function createDummyPosts() {
    i = 0;
    n = 4;

    for (i; i<n; i++) {
      var article = document.createElement('article');
      var html =  '<div class="posts__post__copy  posts__post__copy--dummy">\n';
          html += '<h1 class="posts__post__heading posts__post__heading--dummy">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<br></h1>\n';
          html += '<p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;</p>\n';
          html += '</div>\n';
          html += '<figure class="posts__post__pic posts__post__pic--dummy"><div></div></figure>';

      classes.add(article, 'posts__post');
      article.innerHTML = html;

      dummyPosts.push(article);
    }
  }

  function populateDummyPosts() {
    var i = 1;
    var n = dummyPosts.length;

    existingWrapper.appendChild(dummyPosts[0]);
    newWrapper = document.createElement('div');
    classes.add(newWrapper, 'posts__wrapper');

    for (i; i<n; i++) {
      newWrapper.appendChild(dummyPosts[i]);
    }

    news.removeChild(moreButton);
    news.appendChild(newWrapper);
    news.appendChild(moreButton);
  }

  function success(xhr) {
    remotePosts = xhr.responseXML.querySelectorAll('.posts__post');

    addToPage();
  }

  function addToPage() {
    var i = 4;
    var n = 8;

    existingWrapper.removeChild(dummyPosts[0]);
    existingWrapper.appendChild(remotePosts[3]);

    for (i; i<n; i++) {
      if (remotePosts[i]) {
        var html = remotePosts[i].innerHTML;
        var dummyPost = dummyPosts[i-3];

        dummyPost.innerHTML = html;
      }
    }
  }

  if (response >= breakPoint) {
    createDummyPosts();
    populateDummyPosts();
    ajax(moreLink, success);
  }
});
