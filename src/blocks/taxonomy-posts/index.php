<?php
/**
 * @package snow-monkey-blocks
 * @author inc2734
 * @license GPL-2.0+
 */

use Snow_Monkey\Plugin\Blocks;
use Snow_Monkey\Plugin\Blocks\App\DynamicBlocks;

register_block_type(
	__DIR__,
	array(
		'render_callback' => function ( $attributes ) {
			return DynamicBlocks::render( 'taxonomy-posts', $attributes );
		},
	)
);

/**
 * nopro
 */
if ( ! Blocks\is_pro() && ! is_admin() ) {
	wp_enqueue_style(
		'snow-monkey-blocks/taxonomy-posts/nopro',
		SNOW_MONKEY_BLOCKS_DIR_URL . '/dist/blocks/taxonomy-posts/nopro.css',
		array(),
		filemtime( SNOW_MONKEY_BLOCKS_DIR_PATH . '/dist/blocks/taxonomy-posts/nopro.css' )
	);
}

/**
 * nopro
 */
if ( ! Blocks\is_pro() && is_admin() ) {
	wp_enqueue_style(
		'snow-monkey-blocks/taxonomy-posts/nopro/editor',
		SNOW_MONKEY_BLOCKS_DIR_URL . '/dist/blocks/taxonomy-posts/nopro-editor.css',
		array(),
		filemtime( SNOW_MONKEY_BLOCKS_DIR_PATH . '/dist/blocks/taxonomy-posts/nopro-editor.css' )
	);
}
