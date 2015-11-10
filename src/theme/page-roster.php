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
			<?php
				$posts = new WP_Query( "taxonomy=Team&term=$term->slug&posts_per_page=2" );
				if( $posts->have_posts() ):
					while( $posts->have_posts() ):
						$posts->the_post();
						$pic = get_field('photo');
						$tz  = new DateTimeZone('Europe/Brussels');
						$age = DateTime::createFromFormat('Ymd', get_field('date_of_birth'), $tz)
				  	  ->diff(new DateTime('now', $tz))
			    	  ->y;
			?>
				<article class="player">
					<img class="player__pic" src="<?php echo $pic['url']; ?>">
					<div class="player__details">
						<h1 class="player__name"><?php the_title(); ?></h1>
						<table>
							<tr>
								<th scope="row">Number</th>
								<td><?php the_field('shirt_number'); ?></td>
							</tr>
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
		</section>
	<?php endforeach; ?>

<?php include 'training.php'; ?>

<?php get_footer(); ?>
