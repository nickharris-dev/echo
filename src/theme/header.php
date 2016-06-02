<!doctype html>
<?php
  $is_dev = false;
  $url = site_url();
  if ($url == 'http://local.wordpress.dev') $is_dev = true; ?>
<html <?php language_attributes(); if ($is_dev) :?> class="dev"<?php endif; ?>>

	<head>
		<meta charset="utf-8">

		<?php // force Internet Explorer to use the latest rendering engine available ?>
		<meta http-equiv="X-UA-Compatible" content="IE=edge">

		<title><?php wp_title(''); ?></title>

		<?php // mobile meta (hooray!) ?>
		<meta name="HandheldFriendly" content="True">
		<meta name="MobileOptimized" content="320">
		<meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="format-detection" content="telephone=no">

		<?php // icons & favicons (for more: http://www.jonathantneal.com/blog/understand-the-favicon/) ?>
		<link rel="apple-touch-icon" href="<?php echo assets_url(); ?>/images/apple-touch-icon.png">
		<link rel="icon" href="<?php echo assets_url(); ?>/images/favicon.png">
		<!--[if IE]>
			<link rel="shortcut icon" href="<?php echo assets_url(); ?>/images/favicon.ico">
		<![endif]-->
		<?php // or, set /favicon.ico for IE10 win ?>
		<meta name="msapplication-TileColor" content="#f01d4f">
		<meta name="msapplication-TileImage" content="<?php echo assets_url(); ?>/images/win8-tile-icon.png">
    <meta name="theme-color" content="#121212">

		<link rel="pingback" href="<?php bloginfo('pingback_url'); ?>">

    <script type="text/javascript">
      document.documentElement.className += ' js';
    </script>
    <link rel="stylesheet" type="text/css" href="//cloud.typography.com/7396032/681826/css/fonts.css">
    <style>
      <?php include 'critical.php'; ?>
    </style>
    <link href="<?php echo assets_url(); ?>/css/global.{{pkg.version}}.css" rel="stylesheet">
    <?php if ($is_dev): ?><link href="<?php echo assets_url(); ?>/css/dev.{{pkg.version}}.css" rel="stylesheet"><?php endif; ?>
	</head>

	<body <?php body_class(); ?> itemscope itemtype="http://schema.org/WebPage">
    <header class="masthead" id="Header" role="banner">
      <a class="masthead__home" href="/"><img class="masthead__logo" src="<?php echo assets_url(); ?>/images/logotype.svg" alt="Manchester Crows" id="Logotype"></a>
      <a class="masthead__jump" href="#PrimaryNav">Jump to Navigation</a>
    </header>
