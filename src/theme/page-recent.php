<?php
  $the_array = array(
    'post_type' => 'post',
    'posts_per_page' => 3
  );
  $posts = new WP_Query( $the_array );
  if( $posts->have_posts() ):
    $counter = 0; ?>
    <section class="posts">
    <?php while( $posts->have_posts() ):
      $posts->the_post();
      $pic = get_field('image')['sizes']; ?>
      <article class="posts__post">
        <div class="posts__post__copy">
          <h1 class="posts__post__heading">
            <?php the_title(); ?>
          </h1>
          <p>
            <?php the_field('excerpt'); ?>
            <a href="<?php the_permalink(); ?>">Read More &raquo;</a>
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
            <img
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
              sizes="(min-width: 768px) 16.666666667vw, 33.3vw"
            >
           <?php endif; ?>
         </figure>
      </article>
    <?php $counter++;
      endwhile; ?>
      <a class="button" href="/news">More news</a>
    </section>
<?php endif; ?>
