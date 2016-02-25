<?php
/*
 Template Name: Recent Posts
*/

?>

<?php get_header(); ?>

<?php
  $the_array = array(
    'post_type' => 'post',
    'posts_per_page' => 16
  );
  $posts = new WP_Query( $the_array );
  if( $posts->have_posts() ): ?>
    <section class="posts posts--recent">
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
    <?php endwhile; ?>
    </section>
<?php endif; wp_reset_query(); ?>

<?php include 'training.php'; ?>

<?php get_footer(); ?>
