<?php
/*
 Template Name: Front Page
*/
?>

<?php get_header(); ?>

<?php if (have_posts()) : while (have_posts()) : the_post(); ?>
	<section class="hero hero--front" id="Hero">
	  <h1>
	    <?php the_title(); ?>
	  </h1>
	</section>

	<section class="intro" itemprop="articleBody">
		<?php the_content();?>
	</section>

<?php endwhile; else : ?>
	<article id="post-not-found" class="hentry cf">
			<header class="article-header">
				<h1><?php _e( 'Oops, Post Not Found!', 'bonestheme' ); ?></h1>
		</header>
			<section class="entry-content">
				<p><?php _e( 'Uh Oh. Something is missing. Try double checking things.', 'bonestheme' ); ?></p>
		</section>
		<footer class="article-footer">
				<p><?php _e( 'This is the error message in the page-custom.php template.', 'bonestheme' ); ?></p>
		</footer>
	</article>
<?php endif; ?>

<?php include 'training.php'; ?>

<?php get_footer(); ?>
