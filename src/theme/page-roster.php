<?php
/*
 Template Name: Roster
*/
?>

<?php get_header(); ?>

	<section class="hero hero--roster" id="Hero">
	  <h1>
	    <?php the_title(); ?>
	  </h1>
	</section>

	<?php
		$post_type = 'player';
		$terms = get_terms( 'Team' );

		foreach( $terms as $term ) :
	?>
		<section class="team team--<?php print_r($term->slug); ?>">
			<?php $c = count($terms);
				if ($c > 1) :?>
				<h1><?php print_r($term->name); ?></h1>
			<?php endif; ?>
			<div class="team__wrapper">
				<?php
					$posts = new WP_Query( "taxonomy=Team&term=$term->slug" );
					if( $posts->have_posts() ):
						while( $posts->have_posts() ):
							$posts->the_post();
							$pic = get_field('photo')['sizes'];
							$tz  = new DateTimeZone('Europe/Brussels');
							$age = DateTime::createFromFormat('Ymd', get_field('date_of_birth'), $tz)
					  	  ->diff(new DateTime('now', $tz))
				    	  ->y;
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
									sizes="(min-width: 225rem) 4.166666667vw,
										(min-width: 112.5rem) 8.333333333vw,
										(min-width: 200rem) 12.5vw,
										(min-width: 56.25rem) 16.667vw,
										(min-width: 37.5rem) 25vw,
										(min-width: 28.0625rem) 33.333vw,
										50vw"
								>
								<h1 class="player__name">
									<span class="player__number"><i>#</i><?php the_field('shirt_number'); ?></span>
									<?php the_title(); ?>
								</h1>
							</div>
							<table class="player__vitals">
								<tr>
									<th scope="row">Position</th>
									<td><?php echo strip_tags( get_the_term_list($post->ID, 'Position', '', ', ') ) ?></td>
								</tr>
								<tr>
									<th scope="row">Age</th>
									<td><?php echo $age ?></td>
								</tr>
							</table>
						</div>
					</article>
		    <?php endwhile; endif; ?>
			</div>
		</section>
	<?php endforeach; ?>

<?php include 'training.php'; ?>

<?php get_footer(); ?>
