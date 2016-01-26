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
			<h1 class="fixture__title" itemprop="headline" rel="bookmark"><?php the_title(); ?></h1>
			<p class="fixture__date">
				<?php
					$date = DateTime::createFromFormat('Ymd', get_field('date'));
					echo $date->format('D, jS F Y');
				?>
			</p>
		</header>

		<main class="fixture__content">
			<section class="fixture__introduction">
				<?php the_field('introduction'); ?>
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
						<td><?php if( get_sub_field('start_time') == 'TBC' ) ?><abbr class="acronym" title="To be confirmed">tbc</abbr></td>
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
					<li>Cleats suitable for <?php the_field('surface'); ?></li>
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
		</main>
	</article>

<?php get_footer(); ?>
