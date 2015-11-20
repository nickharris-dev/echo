<?php
/* Bones Custom Post Type Example
This page walks you through creating
a custom post type and taxonomies. You
can edit this one or copy the following code
to create another one.

I put this in a separate file so as to
keep it organized. I find it easier to edit
and change things if they are concentrated
in their own file.

Developed by: Eddie Machado
URL: http://themble.com/bones/
*/

// Flush rewrite rules for custom post types
add_action( 'after_switch_theme', 'bones_flush_rewrite_rules' );

// Flush your rewrite rules
function bones_flush_rewrite_rules() {
	flush_rewrite_rules();
}

// let's create the function for the custom type
function custom_posts() {
	// creating (registering) the custom type
	register_post_type( 'fixture', /* (http://codex.wordpress.org/Function_Reference/register_post_type) */
		// let's now add all the options for this post type
		array( 'labels' => array(
			'name' => __( 'Fixtures', 'bonestheme' ), /* This is the Title of the Group */
			'singular_name' => __( 'Fixture', 'bonestheme' ), /* This is the individual type */
			'all_items' => __( 'All Fixtures', 'bonestheme' ), /* the all items menu item */
			'add_new' => __( 'Add New', 'bonestheme' ), /* The add new menu item */
			'add_new_item' => __( 'Add New Fixture', 'bonestheme' ), /* Add New Display Title */
			'edit' => __( 'Edit', 'bonestheme' ), /* Edit Dialog */
			'edit_item' => __( 'Edit Fixtures', 'bonestheme' ), /* Edit Display Title */
			'new_item' => __( 'New Fixture', 'bonestheme' ), /* New Display Title */
			'view_item' => __( 'View Fixture', 'bonestheme' ), /* View Display Title */
			'search_items' => __( 'Search Fixtures', 'bonestheme' ), /* Search Custom Type Title */
			'not_found' =>  __( 'Nothing found in the Database.', 'bonestheme' ), /* This displays if there are no entries yet */
			'not_found_in_trash' => __( 'Nothing found in Trash', 'bonestheme' ), /* This displays if there is nothing in the trash */
			'parent_item_colon' => ''
			), /* end of arrays */
			'description' => __( 'Upcoming game days', 'bonestheme' ), /* Custom Type Description */
			'public' => true,
			'publicly_queryable' => true,
			'exclude_from_search' => false,
			'show_ui' => true,
			'query_var' => true,
			'menu_position' => 5, /* this is what order you want it to appear in on the left hand side menu */
			'menu_icon' => get_stylesheet_directory_uri() . '/library/images/fixture-icon.png', /* the icon for the custom post type menu */
			'rewrite'	=> array( 'slug' => 'fixture', 'with_front' => false ), /* you can specify its url slug */
			'has_archive' => 'fixture', /* you can rename the slug here */
			'capability_type' => 'post',
			'hierarchical' => false,
			/* the next one is important, it tells what's enabled in the post editor */
			'supports' => array( 'title', 'editor', 'author', 'thumbnail', 'revisions')
		) /* end of options */
	); /* end of register post type */

	// creating (registering) the custom type
	register_post_type( 'player', /* (http://codex.wordpress.org/Function_Reference/register_post_type) */
		// let's now add all the options for this post type
		array( 'labels' => array(
			'name' => __( 'Players', 'bonestheme' ), /* This is the Title of the Group */
			'singular_name' => __( 'Player', 'bonestheme' ), /* This is the individual type */
			'all_items' => __( 'All Players', 'bonestheme' ), /* the all items menu item */
			'add_new' => __( 'Add New Player', 'bonestheme' ), /* The add new menu item */
			'add_new_item' => __( 'Add New Player', 'bonestheme' ), /* Add New Display Title */
			'edit' => __( 'Edit', 'bonestheme' ), /* Edit Dialog */
			'edit_item' => __( 'Edit Players', 'bonestheme' ), /* Edit Display Title */
			'new_item' => __( 'New Player', 'bonestheme' ), /* New Display Title */
			'view_item' => __( 'View Player', 'bonestheme' ), /* View Display Title */
			'search_items' => __( 'Search Players', 'bonestheme' ), /* Search Custom Type Title */
			'not_found' =>  __( 'Nothing found in the Database.', 'bonestheme' ), /* This displays if there are no entries yet */
			'not_found_in_trash' => __( 'Nothing found in Trash', 'bonestheme' ), /* This displays if there is nothing in the trash */
			'parent_item_colon' => ''
			), /* end of arrays */
			'description' => __( 'Team members', 'bonestheme' ), /* Custom Type Description */
			'public' => true,
			'publicly_queryable' => true,
			'exclude_from_search' => false,
			'show_ui' => true,
			'query_var' => true,
			'menu_position' => 6, /* this is what order you want it to appear in on the left hand side menu */
			'menu_icon' => get_stylesheet_directory_uri() . '/library/images/player-icon.png', /* the icon for the custom post type menu */
			'rewrite'	=> array( 'slug' => 'player', 'with_front' => false ), /* you can specify its url slug */
			'has_archive' => 'player', /* you can rename the slug here */
			'capability_type' => 'post',
			'hierarchical' => false,
			/* the next one is important, it tells what's enabled in the post editor */
			'supports' => array( 'title', 'revisions')
		) /* end of options */
	); /* end of register post type */

	register_post_type( 'opponent', /* (http://codex.wordpress.org/Function_Reference/register_post_type) */
		// let's now add all the options for this post type
		array( 'labels' => array(
			'name' => __( 'Opposing Teams', 'bonestheme' ), /* This is the Title of the Group */
			'singular_name' => __( 'Opposing Team', 'bonestheme' ), /* This is the individual type */
			'all_items' => __( 'All Opposing Teams', 'bonestheme' ), /* the all items menu item */
			'add_new' => __( 'Add New Opposing Team', 'bonestheme' ), /* The add new menu item */
			'add_new_item' => __( 'Add New Opposing Team', 'bonestheme' ), /* Add New Display Title */
			'edit' => __( 'Edit', 'bonestheme' ), /* Edit Dialog */
			'edit_item' => __( 'Edit Opposing Teams', 'bonestheme' ), /* Edit Display Title */
			'new_item' => __( 'New Opposing Team', 'bonestheme' ), /* New Display Title */
			'view_item' => __( 'View Opposing Team', 'bonestheme' ), /* View Display Title */
			'search_items' => __( 'Search Opposing Teams', 'bonestheme' ), /* Search Custom Type Title */
			'not_found' =>  __( 'Nothing found in the Database.', 'bonestheme' ), /* This displays if there are no entries yet */
			'not_found_in_trash' => __( 'Nothing found in Trash', 'bonestheme' ), /* This displays if there is nothing in the trash */
			'parent_item_colon' => ''
			), /* end of arrays */
			'description' => __( 'Team members', 'bonestheme' ), /* Custom Type Description */
			'public' => true,
			'publicly_queryable' => true,
			'exclude_from_search' => false,
			'show_ui' => true,
			'query_var' => true,
			'menu_position' => 7, /* this is what order you want it to appear in on the left hand side menu */
			'menu_icon' => get_stylesheet_directory_uri() . '/library/images/opponent-icon.png', /* the icon for the custom post type menu */
			'rewrite'	=> array( 'slug' => 'opponent', 'with_front' => false ), /* you can specify its url slug */
			'has_archive' => 'opponent', /* you can rename the slug here */
			'capability_type' => 'post',
			'hierarchical' => false,
			/* the next one is important, it tells what's enabled in the post editor */
			'supports' => array( 'title', 'revisions')
		) /* end of options */
	); /* end of register post type */

	/* this adds your post categories to your custom post type */
	// register_taxonomy_for_object_type( 'category', 'fixture' );
	/* this adds your post tags to your custom post type */
	// register_taxonomy_for_object_type( 'post_tag', 'fixture' );

}

	// adding the function to the Wordpress init
	add_action( 'init', 'custom_posts');

	/*
	for more information on taxonomies, go here:
	http://codex.wordpress.org/Function_Reference/register_taxonomy
	*/

	// now let's add custom categories (these act like categories)
	register_taxonomy( 'Position',
		array('player'), /* if you change the name of register_post_type( 'player', then you have to change this */
		array('hierarchical' => true,     /* if this is true, it acts like categories */
			'labels' => array(
				'name' => __( 'Positions', 'bonestheme' ), /* name of the custom taxonomy */
				'singular_name' => __( 'Position', 'bonestheme' ), /* single taxonomy name */
				'search_items' =>  __( 'Search Positions', 'bonestheme' ), /* search title for taxomony */
				'all_items' => __( 'All Positions', 'bonestheme' ), /* all title for taxonomies */
				'parent_item' => __( 'Parent Position', 'bonestheme' ), /* parent title for taxonomy */
				'parent_item_colon' => __( 'Parent Position:', 'bonestheme' ), /* parent taxonomy title */
				'edit_item' => __( 'Edit Position', 'bonestheme' ), /* edit custom taxonomy title */
				'update_item' => __( 'Update Position', 'bonestheme' ), /* update title for taxonomy */
				'add_new_item' => __( 'Add New Position', 'bonestheme' ), /* add new title for taxonomy */
				'new_item_name' => __( 'New Position Name', 'bonestheme' ) /* name title for taxonomy */
			),
			'show_admin_column' => true,
			'show_ui' => true,
			'query_var' => true,
			'rewrite' => array( 'slug' => 'custom-slug' ),
		)
	);

	register_taxonomy( 'Team',
		array('player'), /* if you change the name of register_post_type( 'player', then you have to change this */
		array('hierarchical' => true,     /* if this is true, it acts like categories */
			'labels' => array(
				'name' => __( 'Teams', 'bonestheme' ), /* name of the custom taxonomy */
				'singular_name' => __( 'Team', 'bonestheme' ), /* single taxonomy name */
				'search_items' =>  __( 'Search Teams', 'bonestheme' ), /* search title for taxomony */
				'all_items' => __( 'All Teams', 'bonestheme' ), /* all title for taxonomies */
				'parent_item' => __( 'Parent Team', 'bonestheme' ), /* parent title for taxonomy */
				'parent_item_colon' => __( 'Parent Team:', 'bonestheme' ), /* parent taxonomy title */
				'edit_item' => __( 'Edit Team', 'bonestheme' ), /* edit custom taxonomy title */
				'update_item' => __( 'Update Team', 'bonestheme' ), /* update title for taxonomy */
				'add_new_item' => __( 'Add New Team', 'bonestheme' ), /* add new title for taxonomy */
				'new_item_name' => __( 'New Team Name', 'bonestheme' ) /* name title for taxonomy */
			),
			'show_admin_column' => true,
			'show_ui' => true,
			'query_var' => true,
			'rewrite' => array( 'slug' => 'custom-slug' ),
		)
	);

	register_taxonomy( 'Conference',
		array('opponent'), /* if you change the name of register_post_type( 'opponent', then you have to change this */
		array('hierarchical' => true,     /* if this is true, it acts like categories */
			'labels' => array(
				'name' => __( 'Conference', 'bonestheme' ), /* name of the custom taxonomy */
				'singular_name' => __( 'Conference', 'bonestheme' ), /* single taxonomy name */
				'search_items' =>  __( 'Search Conferences', 'bonestheme' ), /* search title for taxomony */
				'all_items' => __( 'All Conferences', 'bonestheme' ), /* all title for taxonomies */
				'parent_item' => __( 'Parent Conference', 'bonestheme' ), /* parent title for taxonomy */
				'parent_item_colon' => __( 'Parent Conference:', 'bonestheme' ), /* parent taxonomy title */
				'edit_item' => __( 'Edit Conference', 'bonestheme' ), /* edit custom taxonomy title */
				'update_item' => __( 'Update Conference', 'bonestheme' ), /* update title for taxonomy */
				'add_new_item' => __( 'Add New Conference', 'bonestheme' ), /* add new title for taxonomy */
				'new_item_name' => __( 'New Conference Name', 'bonestheme' ) /* name title for taxonomy */
			),
			'show_admin_column' => true,
			'show_ui' => true,
			'query_var' => true,
			'rewrite' => array( 'slug' => 'custom-slug' ),
		)
	);

	// now let's add custom tags (these act like categories)
	// register_taxonomy( 'custom_tag',
	// 	array('fixture'), /* if you change the name of register_post_type( 'fixture', then you have to change this */
	// 	array('hierarchical' => false,    /* if this is false, it acts like tags */
	// 		'labels' => array(
	// 			'name' => __( 'Custom Tags', 'bonestheme' ), /* name of the custom taxonomy */
	// 			'singular_name' => __( 'Custom Tag', 'bonestheme' ), /* single taxonomy name */
	// 			'search_items' =>  __( 'Search Custom Tags', 'bonestheme' ), /* search title for taxomony */
	// 			'all_items' => __( 'All Custom Tags', 'bonestheme' ), /* all title for taxonomies */
	// 			'parent_item' => __( 'Parent Custom Tag', 'bonestheme' ), /* parent title for taxonomy */
	// 			'parent_item_colon' => __( 'Parent Custom Tag:', 'bonestheme' ), /* parent taxonomy title */
	// 			'edit_item' => __( 'Edit Custom Tag', 'bonestheme' ), /* edit custom taxonomy title */
	// 			'update_item' => __( 'Update Custom Tag', 'bonestheme' ), /* update title for taxonomy */
	// 			'add_new_item' => __( 'Add New Custom Tag', 'bonestheme' ), /* add new title for taxonomy */
	// 			'new_item_name' => __( 'New Custom Tag Name', 'bonestheme' ) /* name title for taxonomy */
	// 		),
	// 		'show_admin_column' => true,
	// 		'show_ui' => true,
	// 		'query_var' => true,
	// 	)
	// );

	/*
		looking for custom meta boxes?
		check out this fantastic tool:
		https://github.com/jaredatch/Custom-Metaboxes-and-Fields-for-WordPress
	*/


?>
