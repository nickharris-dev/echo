<?php
/*
 Template Name: Front Page
*/

?>

<?php get_header(); ?>

<?php if (have_posts()) : while (have_posts()) : the_post(); ?>
  <?php if ( have_rows('hero') ) :
    while ( have_rows('hero') ) : the_row(); ?>
  <section class="hero hero--front" id="Hero"
    <?php if( get_row_layout() === 'image'):
      smart_media_image(get_sub_field('image'), get_sub_field('focal_point_x'), get_sub_field('focal_point_y'), 'hero');
    endif; ?>>
  <?php endwhile; else: ?>
  <section class="hero hero--front" id="Hero"
  <?php endif; ?>
    <h1>
      <?php the_title(); ?>
    </h1>
	</section>

 	<section class="intro" itemprop="articleBody">
		<?php the_content();?>
	</section>

<?php endwhile; endif; ?>

<?php include 'fixtures.php'; ?>

<?php include 'results.php'; ?>

<?php
  $the_array = array(
    'post_type' => 'post',
    'posts_per_page' => 3
  );
  $posts = new WP_Query( $the_array );
  if( $posts->have_posts() ):
  	$counter = 0; ?>
    <section class="posts posts--front" id="News" data-posts="<?php echo $posts->found_posts; ?>">
    <?php while( $posts->have_posts() ):
      $posts->the_post(); ?>
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
    <?php $counter++;
    	endwhile; ?>
    	<?php if ($posts->found_posts > 3): ?>
	    	<a class="button button--more-news" href="/news">More news</a>
	    <?php endif; ?>
    </section>
<?php endif; wp_reset_query(); ?>

<?php if( get_field('roster_image') ):
  $pic = get_field('roster_image')['sizes']; ?>
  <section class="roster">
    <a class="roster__link" href="roster"><h1 class="roster__title">The Team</h1></a>
    <a class="button button--light" href="/join-us/">Join us</a>
    <img
      class="roster__pic"
      alt=""
      src="<?php print_r($pic['hero-1000']); ?>"
      srcset="
        <?php print_r($pic['hero-640']); ?> <?php print_r($pic['hero-640-width']); ?>w,
        <?php print_r($pic['hero-1000']); ?> <?php print_r($pic['hero-1000-width']); ?>w,
        <?php print_r($pic['hero-1500']); ?> <?php print_r($pic['hero-1500-width']); ?>w,
        <?php print_r($pic['hero-2000']); ?> <?php print_r($pic['hero-2000-width']); ?>w,
        <?php print_r($pic['hero-3000']); ?> <?php print_r($pic['hero-3000-width']); ?>w"
    >
  </section>
<?php endif; ?>

<?php include 'training.php'; ?>

<?php get_footer(); ?>
