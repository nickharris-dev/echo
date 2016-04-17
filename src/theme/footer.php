    <footer role="contentinfo">
      <ul class="social">
        <li class="social__link social__link--facebook"><a href="https://www.facebook.com/ManchesterCrows/">Facebook</a></li>
        <li class="social__link social__link--twitter"><a href="https://twitter.com/manchestercrows">Twitter</a></li>
        <li class="social__link social__link--instagram"><a href="https://www.instagram.com/manchestercrows/">Instagram</a></li>
      </ul>
      <p class="email"><a href="mailto:manchester@crowsfootball.com">manchester@crowsfootball.com</a></p>
      <p class="copyright">Copyright© <?php echo date('Y'); ?> <a href="http://www.pixelenvy.co.uk">Pixel Envy Limited</a></p>
    </footer>

    <nav class="primary-nav" id="PrimaryNav">
      <li class="primary-nav__home"><a href="/">Home</a></li>
      <li><a href="/news">News</a></li>
      <li><a href="/roster">The Team</a></li>
    </nav>

    <?php
      $is_dev = false;
      $url = site_url();
      if ($url == 'http://local.wordpress.dev') $is_dev = true; ?>

    <script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyB5eJGHGiEKPg9_QiWLNTtVk9zoKAKGzeQ"></script>
    <script src="<?php echo assets_url(); ?>/js/base.1.0.5.js"></script>
    <?php if (!$is_dev): ?>
      <script>
        (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
        (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
        m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
        })(window,document,'script','//www.google-analytics.com/analytics.js','ga');

        ga('create', 'UA-73756217-1', 'auto');
        ga('send', 'pageview');

      </script>
    <?php endif; ?>
  </body>

</html>
