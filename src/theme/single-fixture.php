<?php
/*
 * CUSTOM POST TYPE TEMPLATE
 *
 * This is the custom post type post template. If you edit the post type name, you've got
 * to change the name of this template to reflect that name change.
 *
 * For Example, if your custom post type is "register_post_type( 'bookmarks')",
 * then your single template should be single-bookmarks.php
 *
 * Be aware that you should rename 'custom_cat' and 'custom_tag' to the appropiate custom
 * category and taxonomy slugs, or this template will not finish to load properly.
 *
 * For more info: http://codex.wordpress.org/Post_Type_Templates
*/
?>

<?php get_header(); ?>

	<article id="fixture-<?php the_ID(); ?>" class="fixture">
		<header class="fixture__header">

	    <figure class="fixture__pic"><img
	      <?php $pic = get_field('image')['sizes']; ?>
	      alt="<?php print_r(get_field('image')['alt']); ?>"
	      src="<?php print_r($pic['page-head-1000']); ?>"
	      srcset="
	        <?php print_r($pic['page-head-640']); ?> <?php print_r($pic['page-head-640-width']); ?>w,
	        <?php print_r($pic['page-head-1000']); ?> <?php print_r($pic['page-head-1000-width']); ?>w,
	        <?php print_r($pic['page-head-1500']); ?> <?php print_r($pic['page-head-1500-width']); ?>w,
	        <?php print_r($pic['page-head-2000']); ?> <?php print_r($pic['page-head-2000-width']); ?>w,
	        <?php print_r($pic['page-head-3000']); ?> <?php print_r($pic['page-head-3000-width']); ?>w"
	    ></figure>

	    <div class="fixture__hgroup">
	    	<h1 class="fixture__title" itemprop="headline" rel="bookmark"><?php the_title(); ?></h1>
	    	<p class="fixture__date">
	    		<?php
	    			$date = DateTime::createFromFormat('Ymd', get_field('date'));
	    			echo $date->format('D, jS F Y');
	    		?>
	    	</p>
	    </div>

	  </header>

		<main class="fixture__content">
			<section class="fixture__intro">
				<?php the_field('introduction'); ?>
			</section>

			<div class="fixture__layout">

				<section class="fixture__information">
					<h2>Key Information</h2>
					<dl>
						<dt>Event Type</dt>
						<dd><?php the_field('type'); ?></dd>
						<dt>Indoor / Outdoor</dt>
						<dd>
							<?php if (get_field('indooroutdoor')): ?><?php the_field('indooroutdoor'); ?><?php else: ?>Unknown<?php endif; ?>
						</dd>
						<dt>Playing Surface</dt>
						<dd>
							<?php if (get_field('surface')): ?><?php the_field('surface'); ?><?php else: ?>Unknown<?php endif; ?>
						</dd>
						<dt>Parking</dt>
						<dd>
							<?php if (get_field('parking')): ?><?php the_field('parking'); ?><?php else: ?>Unknown<?php endif; ?>
						</dd>
						<dt>Changing Facilities</dt>
						<dd>
							<?php if (get_field('changing_facilities')): ?><?php the_field('changing_facilities'); ?><?php else: ?>Unknown<?php endif; ?>
						</dd>
						<?php if (get_field('facebook_event')): ?>
							<dt class="fb-title">More info:</dt>
							<dd class="fb-link"><a href="<?php the_field('facebook_event'); ?>">Facebook Event</a></dd>
						<?php endif; ?>
					</dl>
				</section>

				<?php if( have_rows('games') ): ?>
					<section class="fixture__schedule">
						<h2>Schedule</h2>
						<table cellspacing="0" cellpadding="0">
							<thead>
								<tr>
									<th>Start</th>
									<th>Home</th>
									<th>Away</th>
									<th>Officiating</th>
								</tr>
							</thead>
						<?php while ( have_rows('games') ) : the_row(); ?>
							<tr>
								<td>
									<?php if( get_sub_field('start_time') == 'TBC' ): ?>
										<abbr class="acronym" title="To be confirmed">tbc</abbr></td>
									<?php else: ?>
										<?php the_sub_field('start_time'); ?>
									<?php endif; ?>
								<td>
									<?php if( get_sub_field('responsibility') == 'the Home Team'): ?>
										<abbr title="Manchester Crows">Crows</abbr>
									<?php else:
										$teams = get_sub_field('home_team');
										if( $teams ):
											foreach( $teams as $post):
												setup_postdata($post);?>
													<abbr title="<?php the_title(); ?>"><?php the_field('team_name'); ?></abbr>
										<?php endforeach; wp_reset_postdata(); endif; ?>
									<?php endif; ?>
								</td>
								<td>
									<?php if( get_sub_field('responsibility') == 'the Away Team'): ?>
										<abbr title="Manchester Crows">Crows</abbr>
									<?php else:
										$teams = get_sub_field('away_team');
										if( $teams ):
											foreach( $teams as $post):
												setup_postdata($post);?>
													<abbr title="<?php the_title(); ?>"><?php the_field('team_name'); ?></abbr>
										<?php endforeach; wp_reset_postdata(); endif; ?>
									<?php endif; ?>
								</td>
								<td>
									<?php if( get_sub_field('responsibility') == 'Officiating'): ?>
										Crows
									<?php else:
										 the_sub_field('officiating'); ?>
									<?php endif; ?>
								</td>
							</tr>
						<?php endwhile; ?>
						</table>
					</section>
				<?php endif; ?>

				<section class="fixture__instructions">
					<h2>Player Information</h2>
					<?php the_field('player_instructions'); ?>
					<ul>
						<li>Your Crows kit</li>
						<li>Suitable cleats</li>
						<li>Food</li>
						<li>Plenty of water</li>
						<li>Something warm and waterproof for the sideline</li>
						<li>A change of clothes</li>
					</ul>
				</section>

				<section class="fixture__spectators">
					<h2>Spectators</h2>
					<?php the_field('spectators'); ?>
				</section>
			</div>
		</main>

		<?php
		  if( have_rows('location') ): ?>
		  <section class="fixture__location location" id="Location">
	      <?php while( have_rows('location') ): the_row();
	        // vars
	        $venue_name = get_sub_field('venue_name');
	        $venue_address = get_sub_field('venue_address');
	        $venue_postcode = get_sub_field('venue_postcode');
	        $venue_lat = get_sub_field('venue_lat');
	        $venue_lng = get_sub_field('venue_lng');
	      ?>
		      <article class="location__detail" data-lat="<?php echo $venue_lat; ?>" data-lng="<?php echo $venue_lng; ?>" id="Map<?php echo $count; ?>" data-eq="stacked:(min-width: 45rem)">
		        <div class="location__info">
	            <section class="location__location">
			          <h1 class="location__venue"><?php echo $venue_name; ?></h1>
			          <address>
			            <?php echo $venue_address; ?>,
			            <i class="postcode"><?php echo $venue_postcode; ?></i>
			          </address>
			          <h2>Directions</h2>
			          <menu class="location__directions">
			            <li class="location__trigger" data-type="geo">From where you are</li>
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
			              endif;
			            ?>

		              <?php if (sizeof($trams) > 0): ?>
			              <li class="location__trigger" data-locations="
			                <?php for ($i = 0; $i < count($trams); $i++): ?>
			                  <?php $tramstop = $trams[$i];
			                    if ($i > 0): ?>,<?php endif;
			                  ?>
			                  {
			                    'name': '<?php print_r ($tramstop->name); ?>',
			                    'lat': '<?php print_r ($tramstop->lat); ?>',
			                    'lng': '<?php print_r ($tramstop->lng); ?>'
			                  }
			                <?php endfor; ?>" data-type="tram">From the Nearest Tram Stop<?php if (count($trams) > 1): ?>s<?php endif; ?>
			              </li>
									<?php endif; ?>

			            <?php if (sizeof($trains) > 0): ?>
		                <li class="location__trigger" data-locations="
			                <?php for ($i = 0; $i < count($trains); $i++): ?>
			                  <?php $trainstation = $trains[$i];
			                    if ($i > 0): ?>,<?php endif;
			                  ?>
			                  {
			                    'name': '<?php print_r ($trainstation->name); ?>',
			                    'lat': '<?php print_r ($trainstation->lat); ?>',
			                    'lng': '<?php print_r ($trainstation->lng); ?>'
			                  }
			                <?php endfor; ?>" data-type="train">From the Nearest Train Station<?php if (count($trains) > 1): ?>s<?php endif; ?>
			              </li>
									<?php endif; ?>

		              <?php if (sizeof($buses) > 0): ?>
		                <li class="location__trigger" data-locations="
			                <?php for ($i = 0; $i < count($buses); $i++): ?>
			                  <?php $busstop = $buses[$i];
			                    if ($i > 0): ?>,<?php endif;
			                  ?>
			                  {
			                    'name': '<?php print_r ($busstop->name); ?>',
			                    'lat': '<?php print_r ($busstop->lat); ?>',
			                    'lng': '<?php print_r ($busstop->lng); ?>'
			                  }
			                <?php endfor; ?>" data-type="bus">From the Nearest Bus Stop<?php if (count($buses) > 1): ?>s<?php endif; ?>
			              </li>
			            <?php endif; ?>

									<?php if( have_rows('food') ): ?>
										<li class="location__trigger" data-locations="
				              <?php $x = 1; while ( have_rows('food') ) : the_row();
				              	if ($x != 1) echo(',');
				              ?>
												{
													'name': '<?php the_sub_field("name"); ?>',
													'lat': '<?php the_sub_field("lat"); ?>',
													'lng': '<?php the_sub_field("lng"); ?>'
												}
					            <?php $x++; endwhile; ?>" data-type="food">To Nearby Food
				            </li>
				          <?php endif; ?>

		              <li class="location__postcode" data-type="postcode">
		                <form>
		                  <input id="PostcodeInput" placeholder="From Postcode" type="text">
		                  <button>&gt;</button>
		                </form>
		              </li>
		            </menu>
		            <button class="location__google">Open in Google Maps</button>
	            </section>
	          </div>
	          <div class="location__map"></div>
	        </article>
				<?php endwhile; ?>
		  </section>
		<?php endif; ?>
	</article>

<?php get_footer(); ?>
