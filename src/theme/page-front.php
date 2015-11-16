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
				<p><?php _e( 'This is the error message in the page-font.php template.', 'bonestheme' ); ?></p>
		</footer>
	</article>
<?php endif; ?>

<?php
  $the_array = array(
    'post_type' => 'post',
    'posts_per_page' => 3
  );
  $posts = new WP_Query( $the_array );
  if( $posts->have_posts() ):
  	$counter = 0; ?>
    <section class="posts posts--front">
    <?php while( $posts->have_posts() ):
      $posts->the_post();
      $pic = get_field('image')['sizes']; ?>
      <?php if ($counter == 1) :?>
      	<div class="posts__wrapper">
      <?php endif; ?>
      <article class="posts__post">
        <div class="posts__post__copy">
          <h1 class="posts__post__heading">
            <a href="<?php the_permalink(); ?>"><?php the_title(); ?></a>
          </h1>
          <p>
          	<?php the_field('excerpt'); ?>
          </p>
        </div>
        <figure class="posts__post__pic">
          <?php if($counter < 1) : ?>
            <img
              alt="<?php print_r(get_field('image')['alt']); ?>"
              src="<?php print_r($pic['hero-1000']); ?>"
              srcset="
                <?php print_r($pic['hero-640']); ?> <?php print_r($pic['hero-640-width']); ?>w,
                <?php print_r($pic['hero-1000']); ?> <?php print_r($pic['hero-1000-width']); ?>w,
                <?php print_r($pic['hero-1500']); ?> <?php print_r($pic['hero-1500-width']); ?>w,
                <?php print_r($pic['hero-2000']); ?> <?php print_r($pic['hero-2000-width']); ?>w",
                <?php print_r($pic['hero-3000']); ?> <?php print_r($pic['hero-3000-width']); ?>w"
            >
           <?php else: ?>
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
              sizes="(min-width: 37.5rem) 16.666666667vw, 33.3vw"
            ></a>
           <?php endif; ?>
         </figure>
      </article>
      <?php if ($counter == 2) :?>
      	</div>
      <?php endif; ?>
    <?php $counter++;
    	endwhile; ?>
    	<?php if ($posts->found_posts > 3): ?>
	    	<a class="button"href="/news">More news</a>
	    <?php endif; ?>
    </section>
<?php endif; ?>

<section class="roster">
	<a class="roster__link" href="roster"><h1 class="roster__title">Roster</h1></a>
</section>

<?php include 'training.php'; ?>

<?php get_footer(); ?>
