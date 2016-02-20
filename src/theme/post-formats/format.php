
              <?php
                /*
                 * This is the default post format.
                 *
                 * So basically this is a regular post. if you don't want to use post formats,
                 * you can just copy ths stuff in here and replace the post format thing in
                 * single.php.
                 *
                 * The other formats are SUPER basic so you can style them as you like.
                 *
                 * Again, If you want to remove post formats, just delete the post-formats
                 * folder and replace the function below with the contents of the "format.php" file.
                */
              ?>

              <article id="post-<?php the_ID(); ?>" class="post" role="article" itemscope itemprop="blogPost" itemtype="http://schema.org/BlogPosting" data-type-break="28rem">

                <header class="post__header">
                  <?php if ( have_rows('hero') ) :
                    while ( have_rows('hero') ) : the_row(); ?>
                    <figure class="hero hero--post" <?php if( get_row_layout() === 'image'):
                      smart_media_image(get_sub_field('image'), get_sub_field('focal_point_x'), get_sub_field('focal_point_y'), 'hero');
                    endif; ?>></figure>
                  <?php endwhile; endif; ?>

                  <div class="post__hgroup">
                    <h1 class="post__title" itemprop="headline" rel="bookmark"><?php the_title(); ?></h1>
                    <p class="post__subtitle"><?php the_field('excerpt'); ?></p>
                  </div>

                </header> <?php // end article header ?>

                <section class="post__content" itemprop="articleBody">
                  <p class="post__date"><time datetime="<?php the_time('Y-m-d'); ?>" itemprop="datePublished"><?php the_time(get_option('date_format')); ?></time></p>
                  <?php
                    // the content (pretty self explanatory huh)
                    the_content();
                  ?>
                </section>

                <footer class="post__footer">
                  <p class="post__byline"><?php the_author(); ?> in <?php the_category( ', ', 'single' ); ?> </p>
                </footer>

              </article>
