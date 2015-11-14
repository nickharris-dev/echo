<?php
  $the_array = array(
    'post_type' => 'post',
  );
  $posts = new WP_Query( $the_array );
  if( $posts->have_posts() ): ?>
    <section>
    <?php while( $posts->have_posts() ):
      $posts->the_post(); ?>
      <article>
        <h1>
          <?php the_title(); ?>
        </h1>
      </article>
    <?php endwhile; ?>
    </section>
<?php endif; ?>
