<?php
  $page_id = 2;
  if( have_rows('training', $page_id) ): ?>
  <section class="training" id="Training">
    <h1>
      Train with us
    </h1>
    <div class="training__wrapper">
      <?php while( have_rows('training') ): the_row();
        // vars
        $day = get_sub_field('regular_day');
        $start = get_sub_field('start_time');
        $end = get_sub_field('end_time');
        $next = get_sub_field('next_session');
        $venue_name = get_sub_field('venue_name');
        $venue_address = get_sub_field('venue_address');
        $venue_postcode = get_sub_field('venue_code');
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

            Next session: <?php echo $next_session; ?>,
            <time><i class="hour"><?php echo $start; ?></i> to <i class="hour"><?php echo $end; ?></i></time>

          </p>
          <address>
            <?php echo $venue_name; ?><br>
            <?php echo $venue_address; ?>
            <i class="postcode"><?php echo $venue_postcode; ?></i>
          </address>

          <h2>

            Directions

          </h2>
          <menu class="training__directions">
            <li data-type="geo">From where you are</li>
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

              <li data-locations="
              <?php for ($i = 0; $i < count($trams); $i++): ?>
                <?php $tramstop = $trams[$i];
                  if ($i > 0): ?>,<?php endif; ?>
                {
                  'name': '<?php print_r ($tramstop->name); ?>',
                  'lat': '<?php print_r ($tramstop->lat); ?>',
                  'lng': '<?php print_r ($tramstop->lng); ?>'
                }
              <?php endfor; ?>" data-type="tram">Nearest Tram Stop<?php if (count($trams) > 1): ?>s<?php endif; ?></li>

            <?php endif;
              if (sizeof($trains) > 0): ?>

              <li data-locations="
              <?php for ($i = 0; $i < count($trains); $i++): ?>
                <?php $trainstation = $trains[$i];
                  if ($i > 0): ?>,<?php endif; ?>
                {
                  'name': '<?php print_r ($trainstation->name); ?>',
                  'lat': '<?php print_r ($trainstation->lat); ?>',
                  'lng': '<?php print_r ($trainstation->lng); ?>'
                }
              <?php endfor; ?>" data-type="train">Nearest Train Station<?php if (count($trains) > 1): ?>s<?php endif; ?></li>

            <?php endif;
              if (sizeof($buses) > 0): ?>

              <li data-locations="
              <?php for ($i = 0; $i < count($buses); $i++): ?>
                <?php $busstop = $buses[$i];
                  if ($i > 0): ?>,<?php endif; ?>
                {
                  'name': '<?php print_r ($busstop->name); ?>',
                  'lat': '<?php print_r ($busstop->lat); ?>',
                  'lng': '<?php print_r ($busstop->lng); ?>'
                }
              <?php endfor; ?>" data-type="bus">Nearest Bus Stop<?php if (count($buses) > 1): ?>s<?php endif; ?></li>

            <?php endif; ?>
            <li data-type="postcode">
              <form>
                <input placeholder="From Postcode" type="text">
                <button>&gt;</button>
              </form>
            </li>
          </menu>
        </div>
        <div class="training__map"></div>
      </article>
    <?php endwhile; ?>
    </div>
  </section>
<?php endif; ?>
