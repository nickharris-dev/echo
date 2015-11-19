<?php get_header(); ?>


	<main id="main" role="main" itemscope itemprop="mainContentOfPage" itemtype="http://schema.org/Blog">

		<?php if (have_posts()) : while (have_posts()) : the_post(); ?>

		<article id="post-<?php the_ID(); ?>" class="post" role="article" itemscope itemprop="blogPost" itemtype="http://schema.org/BlogPosting">

      <header class="post__header">

      	<?php if ( have_rows('hero') ) :
		      while ( have_rows('hero') ) : the_row(); ?>

		      <?php if( get_row_layout() === 'image'):
		        $pic = get_sub_field('image')['sizes']; ?>
		        <figure class="post__pic"><img
		          alt="<?php print_r(get_sub_field('image')['alt']); ?>"
		          src="<?php print_r($pic['news_feature-1000']); ?>"
		          srcset="
		            <?php print_r($pic['news_feature-640']); ?> <?php print_r($pic['news_feature-640-width']); ?>w,
		            <?php print_r($pic['news_feature-1000']); ?> <?php print_r($pic['news_feature-1000-width']); ?>w,
		            <?php print_r($pic['news_feature-1500']); ?> <?php print_r($pic['news_feature-1500-width']); ?>w,
		            <?php print_r($pic['news_feature-2000']); ?> <?php print_r($pic['news_feature-2000-width']); ?>w,
		            <?php print_r($pic['news_feature-3000']); ?> <?php print_r($pic['news_feature-3000-width']); ?>w"
		        ></figure>

				    <div class="post__hgroup">
			        <h1 itemprop="headline" rel="bookmark"><?php the_title(); ?></h1>
		        </div>
		      <?php endif; ?>

		    <?php endwhile; else: ?>
			    <div class="post__hgroup">
		        <h1 class="no-feature" itemprop="headline" rel="bookmark"><?php the_title(); ?></h1>
	        </div>
		    <?php endif; ?>

      </header> <?php // end article header ?>

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
