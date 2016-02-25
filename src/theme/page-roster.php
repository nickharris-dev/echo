<?php
/*
	Template Name: Roster
*/

?>

<?php get_header(); ?>

	<header class="page__header">

    <figure class="page__pic"><img
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

    <div class="page__hgroup page__hgroup--roster">
      <h1 class="page__title" itemprop="headline" rel="bookmark"><?php the_title(); ?></h1>
    </div>

  </header>

	<?php
		$terms = get_terms( 'Team' );
		$today = new DateTime('now');
		foreach( $terms as $term ) :
	?>
		<section class="team team--<?php print_r($term->slug); ?>">
			<?php $c = count($terms);
				if ($c > 1) :?>
				<h1><?php print_r($term->name); ?></h1>
			<?php endif; ?>
			<div class="team__wrapper">
				<?php
					$players = array(
						'post_type' => 'player',
						'meta_key' => 'shirt_number',
						'orderby' => 'meta_value_num',
						'order' => 'ASC',
						'tax_query' => array(
							array(
								'taxonomy' => 'Team',
								'field' => 'slug',
								'terms' => $term->slug,
							),
						),
					);
					$posts = new WP_Query( $players );
					if( $posts->have_posts() ):
						while( $posts->have_posts() ):
							$posts->the_post();
							$pic = get_field('photo')['sizes'];
							$age = DateTime::createFromFormat('Ymd', get_field('date_of_birth'))
					  	  ->diff($today)
				    	  ->y;
				    	$experience = 0;
				    	$games_season = 0;
				    	$games_career = 0;

				    	$fixtures = get_posts(array(
				    		'post_type' => 'fixture',
				    		'meta_query' => array(
				    			array(
										'key' => 'roster',
										'value' => '"' . get_the_ID() . '"',
										'compare' => 'LIKE'
				    			)
				    		)
				    	));

				    	if ($fixtures) {
				    		foreach ($fixtures as $fixture) {
				    			$date = DateTime::createFromFormat('Ymd', get_field('date', $fixture));
				    			if ($date < $today) {
				    				$diff = $today->diff($date->sub(new DateInterval('P1Y')))->y;
				    				if($diff > $experience) {
				    					$experience = $diff;
				    				}
				    			}
				    		}
				    	}

				    	if ($experience <=1) {
				    		$experience = "Rookie";
				    	}
				?>
					<article class="player">
						<div class="player__wrapper">
							<div class="player__details">
								<img class="player__pic"
									alt="A photo of <?php the_title(); ?>"
									src="<?php print_r($pic['roster-300']); ?>"
									srcset="
										<?php print_r($pic['roster-210']); ?> <?php print_r($pic['roster-210-width']); ?>w,
										<?php print_r($pic['roster-300']); ?> <?php print_r($pic['roster-300-width']); ?>w,
										<?php print_r($pic['roster-420']); ?> <?php print_r($pic['roster-420-width']); ?>w,
										<?php print_r($pic['roster-600']); ?> <?php print_r($pic['roster-600-width']); ?>w"
									sizes="(min-width: 225em) 4.166666667vw,
										(min-width: 112.5em) 8.333333333vw,
										(min-width: 200em) 12.5vw,
										(min-width: 56.25em) 16.667vw,
										(min-width: 37.5em) 25vw,
										(min-width: 28.0625em) 33.333vw,
										50vw"
								>
								<h1 class="player__name">
									<span class="player__number"><i>#</i><?php the_field('shirt_number'); ?></span>
									<?php the_title(); ?>
								</h1>
							</div>
							<table cellpadding="0" cellspacing="0" class="player__vitals">
								<tr>
									<th scope="row">Position</th>
									<td><?php echo strip_tags( get_the_term_list($post->ID, 'Position', '', ', ') ) ?></td>
								</tr>
								<tr>
									<th scope="row">Age</th>
									<td><?php echo $age; ?></td>
								</tr>
							</table>
							<!--
							<h2 class="player__stats__heading">Stats</h2>
							<menu class="player__stats__tabs">
								<li class="player__stats__tab player__stats__tab--active">Quick</li>
								<li class="player__stats__tab">Career</li>
							</menu>
							<div class="player__stats">
								<div class="player__stats__details player__stats__details--quick">
									<table cellpadding="0" cellspacing="0">
										<tr>
											<th scope="rows">Games</th>
											<td>?</td>
										</tr>
									</table>
								</div>
								<div class="player__stats__details player__stats__details--career">
									<table cellpadding="0" cellspacing="0">
										<tr>
											<th scope="rows">Games</th>
											<td>?</td>
										</tr>
									</table>
								</div>
							</div> -->
						</div>
					</article>
		    <?php endwhile; endif; wp_reset_query(); ?>
			</div>
		</section>
	<?php endforeach; ?>

<?php include 'training.php'; ?>

<?php get_footer(); ?>
