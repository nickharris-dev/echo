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
  if( $posts->have_posts() ):
    $counter = 0; ?>
    <section class="posts" id="RecentNews">
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
              src="<?php print_r($pic['news_feature-1000']); ?>"
              srcset="
                <?php print_r($pic['news_feature-640']); ?> <?php print_r($pic['news_feature-640-width']); ?>w,
                <?php print_r($pic['news_feature-1000']); ?> <?php print_r($pic['news_feature-1000-width']); ?>w,
                <?php print_r($pic['news_feature-1500']); ?> <?php print_r($pic['news_feature-1500-width']); ?>w,
                <?php print_r($pic['news_feature-2000']); ?> <?php print_r($pic['news_feature-2000-width']); ?>w,
                <?php print_r($pic['news_feature-3000']); ?> <?php print_r($pic['news_feature-3000-width']); ?>w"
              sizes="(min-width: 56.25rem) 66.666vw, 100vw"
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
              sizes="(min-width: 56.25rem) 11.111vw, (min-width: 37.5rem) 16.65vw, 33.333vw"
            ></a>
           <?php endif; ?>
         </figure>
      </article>
    <?php $counter++;
      endwhile; ?>
        </div>
    </section>
<?php endif; ?>

<?php include 'training.php'; ?>

<?php get_footer(); ?>
