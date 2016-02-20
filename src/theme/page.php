<?php get_header(); ?>


	<main id="main" role="main" itemscope itemprop="mainContentOfPage" itemtype="http://schema.org/Blog">

		<?php if (have_posts()) : while (have_posts()) : the_post(); ?>

		<article id="post-<?php the_ID(); ?>" class="post" role="article" itemscope itemprop="blogPost" itemtype="http://schema.org/BlogPosting" data-type-break="28rem">

      <header class="page__header">

        <figure class="page__pic"><img
          <?php $pic = get_field('image')['sizes']; ?>
          alt="<?php print_r(get_field('image')['alt']); ?>"
          src="<?php print_r($pic['page-head-1000']); ?>"
          srcset="
            <?php print_r($pic['page-head-640']); ?> <?php print_r($pic['page-head-640-width']); ?>w,
            <?php print_r($pic['page-head-1000']); ?> <?php print_r($pic['page-head-1000-width']); ?>w,
            <?php print_r($pic['page-head-1500']); ?> <?php print_r($pic['page-head-1500-width']); ?>w,
            <?php print_r($pic['page-head-2000']); ?> <?php print_r($pic['page-head-2000-width']); ?>w,
            <?php print_r($pic['page-head-3000']); ?> <?php print_r($pic['page-head-3000-width']); ?>w"
        ></figure>

        <div class="page__hgroup">
          <h1 class="page__title" itemprop="headline" rel="bookmark"><?php the_title(); ?></h1>
        </div>

      </header>

      <section class="post__content" itemprop="articleBody">
        <?php
          // the content (pretty self explanatory huh)
          the_content();
        ?>
      </section>

    </article>

		<?php endwhile; endif; ?>

	</main>

<?php include 'training.php'; ?>

<?php get_footer(); ?>
