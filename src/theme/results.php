<?php
  $the_array = array(
    'post_type' => 'fixture',
    'meta_key' => 'date',
    'orderby' => 'meta_value_num',
    'order' => 'ASC'
    );
  $posts = new WP_Query( $the_array );
  if( $posts->have_posts() ): ?>
  <section class="results" id="Results"><div class="results__wrapper">
    <?php while( $posts->have_posts() ):
      $posts->the_post();
      $today = strtotime('now');
      $aYearAgo = strtotime('-1 year');
      $pic = get_field('logo')['sizes'];
      $date = strtotime(get_field('date'));
      $home = null;
      $away = null;
      $home_score = null;
      $away_score = null;
      $video = null;
      $role = null;
      $flag = false;

      if ($date < $today) :
        if ( have_rows('games') ) :
          while ( have_rows('games') ) : the_row();
            $weare = get_sub_field('responsibility');
              if ( $weare == 'the Home Team' ) :

                global $home, $role;
                $role = 'home';
                $home = '<abbr title="Manchester Crows">mnc</abbr>';
                $opponents = get_sub_field('away_team');
                if ( $opponents ):
                  foreach($opponents as $o):
                    global $away;
                    $away = '<abbr title="' . get_the_title($o->ID) . '">' . get_field('abbreviation', $o->ID) . '</abbr>';
                  endforeach; // $opponents as $o
                endif; // $opponents
                if ( have_rows('post_game') ) :
                  while (have_rows('post_game')) : the_row();
                    global $flag, $home_score, $away_score, $video;
                    $home_score = get_sub_field('our_score');
                    $away_score = get_sub_field('opponents_score');
                    $video = get_sub_field('video_link');
                    $flag = true;
                  endwhile; // have_rows('post_game')
                endif; // have_rows('post_game')

              elseif ( $weare == 'the Away Team' ):

                global $away, $role;
                $away = '<abbr title="Manchester Crows">mnc</abbr>';
                $role = 'away';
                $opponents = get_sub_field('home_team');
                if ( $opponents ):
                  foreach($opponents as $o):
                    global $home;
                    $home = '<abbr title="' . get_the_title($o->ID) . '">' . get_field('abbreviation', $o->ID) . '</abbr>';
                  endforeach; // $opponents as $o
                endif; // $opponent
                if ( have_rows('post_game') ) :
                  while (have_rows('post_game')) : the_row();
                    global $flag, $home_score, $away_score, $video;
                    $home_score = get_sub_field('opponents_score');
                    $away_score = get_sub_field('our_score');
                    $video = get_sub_field('video_link');
                    $flag = true;
                  endwhile; // have_rows('post_game')
                endif; // have_rows('post_game')

              endif; // $weare

              if ( $flag ):
                if ( $weare == 'the Home Team' || $weare == 'the Away Team' ): ?>

                <article class="game game--<?php echo $role; ?>">
                  <?php if ($video) {
                    echo '<a class="game__video-link" href="'. $video .'">';
                  } ?>
                  <table class="game__results" cellpadding="0" cellspacing="0">
                    <tr>
                      <th scope="row" class="game__team game__team--home"><?php echo $home; ?></th>
                      <td class="game__score game__score--home"><?php echo $home_score; ?></td>
                    </tr>
                    <tr>
                      <th scope="row" class="game__team game__team--away"><?php echo( $away ); ?></th>
                      <td class="game__score game__score--away"><?php echo $away_score; ?></td>
                    </tr>
                  </table>
                  <?php if ($video) {
                    echo '</a>';
                  } ?>
                </article>

    <?php endif; endif; // $weare - $home_score && $away_score
          endwhile; // have_rows('games')
        endif; // have_rows('games')
      endif; // Date < Today
    endwhile; // have_posts ?>
  </div></section>
<?php endif; wp_reset_query(); ?>
