<?php
  $the_array = array(
    'post_type' => 'fixture'
    );
  $posts = new WP_Query( $the_array );
  if( $posts->have_posts() ): ?>
  <section class="results">
    <?php while( $posts->have_posts() ):
      $posts->the_post();
      $today = new DateTime('now');
      $pic = get_field('logo')['sizes'];
      $date = DateTime::createFromFormat('Ymd', get_field('date'));
      $home = null;
      $away = null;
      $home_score = null;
      $away_score = null;
      $video = null;
      if ($date < $today) :
        if ( have_rows('games') ) :
          while ( have_rows('games') ) : the_row();
            $weare = get_sub_field('responsibility');
              if ( $weare == 'the Home Team' ) :
                global $home;
                $home = '<abbr title="Manchester Crows">mnc</abbr>';
                $opponents = get_sub_field('away_team');
                if ( $opponents ):
                  foreach($opponents as $o):
                    global $away;
                    $away = '<abbr title="' . get_the_title($o->ID) . '">' . get_field('abbreviation', $o->ID) . '</abbr>';
                  endforeach; // $opponents as $o
                endif; // $opponent
                if ( have_rows('post_game') ) :
                  while (have_rows('post_game')) : the_row();
                    global $home_score, $away_score, $video;
                    $home_score = get_sub_field('our_score');
                    $away_score = get_sub_field('opponents_score');
                    $video = get_sub_field('video_link');
                  endwhile; // have_rows('post_game')
                endif; // have_rows('post_game')
              endif; // $weare
              if ( $home_score && $away_score ): ?>

                <article class="game game--home">
                  <?php if ($video) {
                    echo '<a class="game__video-link" href="'. $video .'">';
                  } ?>
                  <span class="game__team game__team--home"><?php echo $home; ?></span>
                  <span class="game__score game__score--home"><?php echo $home_score; ?></span>
                  <span class="game__team game__team--away"><?php echo( $away ); ?></span>
                  <span class="game__score game__score--away"><?php echo $away_score; ?></span>
                  <?php if ($video) {
                    echo '</a>';
                  } ?>
                </article>

    <?php endif; // $home_score && $away_score
          endwhile; // have_rows('games')
        endif; // have_rows('games')
      endif; // Date < Today
    endwhile; // have_posts ?>
  </section>
<?php endif; wp_reset_query(); ?>
