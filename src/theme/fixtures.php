<?php
  date_default_timezone_set('Greenwich');
  $date_1 = date('Ymd', strtotime("now"));
  $date_2 = date('Ymd', strtotime("+12 months"));

  $the_array = array(
    'post_type' => 'fixture',
    'posts_per_page'  => -1,
    'meta_key' => 'date',
    'meta_compare' => 'BETWEEN',
    'meta_type' => 'numeric',
    'meta_value' => array($date_1, $date_2),
    'orderby' => 'meta_value_num',
    'order' => 'ASC'
  );
  $fixtures = new WP_Query( $the_array );
  if( $fixtures->have_posts() ):
?>
  <section class="fixtures" id="Fixtures"><div class="fixtures__wrapper slider">
    <?php while( $fixtures->have_posts() ):
      $fixtures->the_post();
      $date = DateTime::createFromFormat('Ymd', get_field('date')); ?>
        <article class="fixtures__fixture slide">
          <a class="fixtures__fixture__link" href="<?php the_permalink(); ?>" style="background-color:<?php the_field('bgcolor'); ?>;background-image:url(<?php the_field('thumb'); ?>);color:<?php the_field('color'); ?>;">
            <?php if (get_field('date')): ?>
              <time class="fixtures__date"><?php echo $date->format('jS M'); ?></time>
            <?php else: ?>
              <abbr title="To Be Confirmed" class="acronym fixtures__date">TBC</abbr>
            <?php endif; ?>
            <h1 class="fixtures__title"><?php the_title(); ?></h1>
          </a>
        </article>
    <?php endwhile; ?>
  </div></section>
<?php endif; wp_reset_query(); ?>
