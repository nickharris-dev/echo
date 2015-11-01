<?php
  $page_id = 2;
  if( have_rows('training', $page_id) ):
    $rowCount = count(get_field('training'));
    if ($rowCount % 2 == 0) {
      $count = 'even';
    } else {
      $count = 'odd';
    } ?>
  <section class="training training--<?php echo $count; ?>" id="Training">
    <h1>
      Train with us
    </h1>
    <?php while( have_rows('training') ): the_row();
      // vars
      $day = get_sub_field('regular_day');
      $start = get_sub_field('start_time');
      $end = get_sub_field('end_time');
      $next = get_sub_field('next_session');
      $venue_name = get_sub_field('venue_name');
      $venue_address = get_sub_field('venue_address');
      $venue_postcode = get_sub_field('venue_postcode');
      $venue_lat = get_sub_field('venue_lat');
      $venue_lng = get_sub_field('venue_lng');
    ?>

    <article class="training__session" data-lat="<?php echo $venue_lat; ?>" data-lng="<?php echo $venue_lng; ?>" id="<?php echo $day; ?>Map" data-eq="stacked:(min-width: 40rem)">
      <div class="training__info">
        <h1>

          <?php echo $day; ?>s

        </h1>
        <?php
          $session_date = new DateTime();
          $session_date->add(DateInterval::createFromDateString('yesterday'));
          $today = new DateTime();

          if ($next) $session_date = DateTime::createFromFormat('Ymd', $next);
          if ($day == 'Weekend') $day = 'Sunday';

          if ($session_date >= $today) {
            $next_session = $session_date->format('l jS F');
          } else {
            $next_session = date('l jS F', strtotime($day));
          }
        ?>
        <p>

          Next:<br>
          <time><?php echo $next_session; ?>, <i class="hour"><?php echo $start; ?></i> to <i class="hour"><?php echo $end; ?></i></time><br>

        </p>
        <h2 class="training__venue"><?php echo $venue_name; ?></h2>
        <address>
          <?php echo $venue_address; ?>,
          <i class="postcode"><?php echo $venue_postcode; ?></i>
        </address>

        <h3>Directions</h3>
        <menu class="training__directions">
          <li class="training__trigger" data-type="geo">From where you are</li>
          <?php
            $trams = [];
            $trains = [];
            $buses = [];

            if( have_rows('public_transport_links') ):
              while ( have_rows('public_transport_links') ) : the_row();
                $obj = new stdClass();
                $obj->name = get_sub_field('name');
                $obj->lat = get_sub_field('lat');
                $obj->lng = get_sub_field('lng');

                if( get_row_layout() == 'tram' ):
                  array_push($trams, $obj);
                elseif( get_row_layout() == 'train' ):
                  array_push($trains, $obj);
                elseif( get_row_layout() == 'bus' ):
                  array_push($buses, $obj);
                endif;
              endwhile;
            endif; ?>
            <?php if (sizeof($trams) > 0): ?>

              <li class="training__trigger" data-locations="
              <?php for ($i = 0; $i < count($trams); $i++): ?>
                <?php $tramstop = $trams[$i];
                  if ($i > 0): ?>,<?php endif; ?>
                {
                  'name': '<?php print_r ($tramstop->name); ?>',
                  'lat': '<?php print_r ($tramstop->lat); ?>',
                  'lng': '<?php print_r ($tramstop->lng); ?>'
                }
              <?php endfor; ?>" data-type="tram">From the Nearest Tram Stop<?php if (count($trams) > 1): ?>s<?php endif; ?></li>

            <?php endif;
              if (sizeof($trains) > 0): ?>

              <li class="training__trigger" data-locations="
              <?php for ($i = 0; $i < count($trains); $i++): ?>
                <?php $trainstation = $trains[$i];
                  if ($i > 0): ?>,<?php endif; ?>
                {
                  'name': '<?php print_r ($trainstation->name); ?>',
                  'lat': '<?php print_r ($trainstation->lat); ?>',
                  'lng': '<?php print_r ($trainstation->lng); ?>'
                }
              <?php endfor; ?>" data-type="train">From the Nearest Train Station<?php if (count($trains) > 1): ?>s<?php endif; ?></li>

            <?php endif;
              if (sizeof($buses) > 0): ?>

              <li class="training__trigger" data-locations="
              <?php for ($i = 0; $i < count($buses); $i++): ?>
                <?php $busstop = $buses[$i];
                  if ($i > 0): ?>,<?php endif; ?>
                {
                  'name': '<?php print_r ($busstop->name); ?>',
                  'lat': '<?php print_r ($busstop->lat); ?>',
                  'lng': '<?php print_r ($busstop->lng); ?>'
                }
              <?php endfor; ?>" data-type="bus">From the Nearest Bus Stop<?php if (count($buses) > 1): ?>s<?php endif; ?></li>

            <?php endif; ?>
            <li class="training__postcode" data-type="postcode">
              <form>
                <input id="PostcodeInput" placeholder="From Postcode" type="text">
                <button>&gt;</button>
              </form>
            </li>
          </menu>
          <button class="training__google">Open in Google Maps</button>
        </div>
        <div class="training__map"></div>
      </article>
    <?php endwhile; ?>
  </section>
<?php endif; ?>
