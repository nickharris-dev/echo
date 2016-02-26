<?php get_header(); ?>

<?php
	the_archive_title( '<h1 class="archive__title">', '</h1>' );
	the_archive_description( '<section class="intro">', '</section>' );
?>

<?php if (have_posts()) :
	$countPosts = $wp_the_query->post_count;
	$counter = 0; ?>

	<main class="posts posts--archive">
    <?php while (have_posts()) : the_post(); ?>
      <article class="posts__post">
        <div class="posts__post__copy">
          <h1 class="posts__post__heading">
            <a href="<?php the_permalink(); ?>"><?php the_title(); ?></a>
          </h1>
          <p class="posts__post__excerpt">
            <?php the_field('excerpt'); ?>
          </p>
        </div>
        <?php if ( have_rows('hero') ) :
          while ( have_rows('hero') ) : the_row(); ?>
          <a href="<?php the_permalink(); ?>" class="posts__post__pic" <?php if( get_row_layout() === 'image'):
            smart_media_image(get_sub_field('image'), get_sub_field('focal_point_x'), get_sub_field('focal_point_y'), 'hero');
          endif; ?>></a>
        <?php endwhile; endif; ?>
      </article>
    <?php endwhile; ?>
  </main>

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

<?php include 'mini-archives.php'; ?>

<?php include 'training.php'; ?>

<?php get_footer(); ?>
