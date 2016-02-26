<aside class="archives">
  <div class="archives__wrapper">
    <div class="archive archive--category">
      <h1 class="archive__heading">View news about</h1>
      <ul class="archive__list">
      <?php
          $args = array(
            'title_li' => 0
          );
          wp_list_categories( $args );
      ?>
      </ul>
    </div>
    <div class="archive archive--yearly">
      <h1 class="archive__heading">View news from</h1>
      <ul class="archive__list">
        <?php $args = array(
          'type' => 'yearly',
        );
        wp_get_archives( $args ); ?>
      </ul>
    </div>
  </div>
</aside>
