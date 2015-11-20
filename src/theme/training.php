<?php
  $page_id = 537;
  if( have_rows('training', $page_id) ):
    $rowCount = count(get_field('training'));
    if ($rowCount % 2 == 0) {
      $rowis = 'even';
    } else {
      $rowis = 'odd';
    }
    $count = 0; ?>
  <section class="training training--<?php echo $rowis; ?>" id="Training">
    <h1 class="training__heading">
      Train with us
    </h1>
    <div class="training__wrapper">
      <?php while( have_rows('training', $page_id) ): the_row();
        // vars
        $venue_name = get_sub_field('venue_name');
        $venue_address = get_sub_field('venue_address');
        $venue_postcode = get_sub_field('venue_postcode');
        $venue_lat = get_sub_field('venue_lat');
        $venue_lng = get_sub_field('venue_lng');
      ?>

      <article class="training__session" data-lat="<?php echo $venue_lat; ?>" data-lng="<?php echo $venue_lng; ?>" id="Map<?php echo $count; ?>" data-eq="stacked:(min-width: 45rem)">
        <div class="training__info">
          <?php if (have_rows('team')):
            while( have_rows('team') ): the_row();
          ?>
            <section class="training__team">
              <h1><?php $team = get_sub_field('team'); echo $team->name; ?></h1>
              <?php if (have_rows('sessions')):
                while( have_rows('sessions') ): the_row();
                // vars
                $day = get_sub_field('day');
                $next = get_sub_field('next_session');
                $start = get_sub_field('start_time');
                $end = get_sub_field('end_time');
                $next_start = get_sub_field('next_session_start_time');
                $next_end = get_sub_field('next_session_end_time');
                // Logic
                $session_date = new DateTime();
                $session_date->add(DateInterval::createFromDateString('yesterday'));
                $today = new DateTime();

                if ($next) $session_date = DateTime::createFromFormat('Ymd', $next);

                if ($session_date >= $today) {
                  $next_day = $session_date->format('l');
                  $next_session = $session_date->format('jS F');
                } else {
                  $next_session = false;
                }
              ?>
                <h3 class="training__day"><?php echo $day; ?>s</h3>
                <time><i class="hour"><?php echo $start; ?></i> to <i class="hour"><?php echo $end; ?></i></time><br>

                <?php if ($next_session || $next_start || $next_end) : ?>
                  <p class="important">The next <?php echo $day; ?> <?php echo $team->name; ?> session is
                  <?php if ($next_session): ?>
                    on <?php if($next_day != $day):?><strong><?php echo $next_day; ?></strong><?php endif; ?>
                    <?php echo $next_session; ?><?php endif;
                    if ($next_start || $next_end):
                      if ($next_start != $start || $next_end != $end): ?>
                       at <i class="hour"><?php if($next_start) {
                          echo $next_start;
                        } else {
                          echo $start;
                        } ?></i> until <i class="hour"><?php if($next_end) {
                          echo $next_end;
                        } else {
                          echo $end;
                        } ?></i><?php endif; endif;?>.</p>
                <?php endif; ?>
              <?php endwhile;
                endif; ?>
            </section>
            <?php endwhile;
              endif; ?>
            <section class="training__location">
          <h1 class="training__venue"><?php echo $venue_name; ?></h1>
          <address>
            <?php echo $venue_address; ?>,
            <i class="postcode"><?php echo $venue_postcode; ?></i>
          </address>
          <h2>Directions</h2>
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
            </section>
          </div>
          <div class="training__map"></div>
        </article>
        <?php if ($count > 0 && $count % 2 != 0): ?>
          </div>
          <div class="training__wrapper">
        <?php endif; ?>
      <?php $count++; endwhile; ?>
    </div>
  </section>
<?php endif; ?>
