
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

              <article id="post-<?php the_ID(); ?>" class="post" role="article" itemscope itemprop="blogPost" itemtype="http://schema.org/BlogPosting">

                <header class="post__header">

                  <figure class="post__pic"><img
                    <?php $pic = get_field('image')['sizes']; ?>
                    alt="<?php print_r(get_field('image')['alt']); ?>"
                    src="<?php print_r($pic['hero-1000']); ?>"
                    srcset="
                      <?php print_r($pic['hero-640']); ?> <?php print_r($pic['hero-640-width']); ?>w,
                      <?php print_r($pic['hero-1000']); ?> <?php print_r($pic['hero-1000-width']); ?>w,
                      <?php print_r($pic['hero-1500']); ?> <?php print_r($pic['hero-1500-width']); ?>w,
                      <?php print_r($pic['hero-2000']); ?> <?php print_r($pic['hero-2000-width']); ?>w,
                      <?php print_r($pic['hero-3000']); ?> <?php print_r($pic['hero-3000-width']); ?>w"
                  ></figure>

                  <div class="post__hgroup">
                    <h1 class="post__title" itemprop="headline" rel="bookmark"><?php the_title(); ?></h1>
                    <p class="post__date"><time datetime="<?php the_time('Y-m-d'); ?>" itemprop="datePublished"><?php the_time(get_option('date_format')); ?></time></p>
                  </div>

                </header> <?php // end article header ?>

                <section class="post__content" itemprop="articleBody">
                  <?php
                    // the content (pretty self explanatory huh)
                    the_content();
                  ?>
                </section>

                <footer class="post__footer">
                  <p class="post__byline"><?php the_author(); ?> in <?php the_category( ', ', 'single' ); ?> </p>
                </footer>

              </article> <?php // end article ?>
