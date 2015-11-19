<?php get_header(); ?>

<?php
	the_archive_title( '<h1 class="archive__title">', '</h1>' );
	the_archive_description( '<section class="intro">', '</section>' );
?>

<?php if (have_posts()) :
	$countPosts = $wp_the_query->post_count;
	$counter = 0; ?>

	<section class="posts posts--archive">
    <div class="posts__wrapper">
		<?php while (have_posts()) : the_post();
			$pic = get_field('image')['sizes'];?>

      <article class="posts__post">
        <div class="posts__post__copy">
          <p class="posts__post__date">
          	<time datetime="<?php the_time('Y-m-d'); ?>" itemprop="datePublished"><?php the_time('jS F'); ?></time>
          </p>
          <h1 class="posts__post__heading">
            <a href="<?php the_permalink(); ?>"><?php the_title(); ?></a>
          </h1>
          <p>
            <?php the_field('excerpt'); ?>
          </p>
        </div>
        <figure class="posts__post__pic">
          <a href="<?php the_permalink(); ?>"><img
              alt="<?php print_r(get_field('image')['alt']); ?>"
              src="<?php print_r($pic['square-300']); ?>"
              srcset="
                <?php print_r($pic['square-150']); ?> <?php print_r($pic['square-150-width']); ?>w,
                <?php print_r($pic['square-300']); ?> <?php print_r($pic['square-300-width']); ?>w,
                <?php print_r($pic['square-450']); ?> <?php print_r($pic['square-450-width']); ?>w,
                <?php print_r($pic['square-600']); ?> <?php print_r($pic['square-600-width']); ?>w,
                <?php print_r($pic['square-750']); ?> <?php print_r($pic['square-750-width']); ?>w,
                <?php print_r($pic['square-900']); ?> <?php print_r($pic['square-900-width']); ?>w,
                <?php print_r($pic['square-1050']); ?> <?php print_r($pic['square-1050-width']); ?>w,
                <?php print_r($pic['square-1200']); ?> <?php print_r($pic['square-1200-width']); ?>w
                "
              sizes="(min-width: 56.25rem) 11.111vw, (min-width: 37.5rem) 16.65vw, 33.333vw"
            ></a>
         </figure>
      </article>
		<?php endwhile; ?>
		</div>
	</section>

<?php else : ?>

		<article id="post-not-found" class="hentry cf">
			<header class="article-header">
				<h1><?php _e( 'Oops, Post Not Found!', 'bonestheme' ); ?></h1>
			</header>
			<section class="entry-content">
				<p><?php _e( 'Uh Oh. Something is missing. Try double checking things.', 'bonestheme' ); ?></p>
			</section>
			<footer class="article-footer">
					<p><?php _e( 'This is the error message in the archive.php template.', 'bonestheme' ); ?></p>
			</footer>
		</article>

<?php endif; ?>

<?php include 'training.php'; ?>

<?php get_footer(); ?>
