<?php
/**
 * @package snow-monkey-blocks
 * @author inc2734
 * @license GPL-2.0+
 */

wp_register_style(
	'snow-monkey-blocks/media-text',
	SNOW_MONKEY_BLOCKS_DIR_URL . '/dist/blocks/media-text/style.css',
	array(),
	filemtime( SNOW_MONKEY_BLOCKS_DIR_PATH . '/dist/blocks/media-text/style.css' )
);

register_block_type(
	__DIR__
);

/**
 * excerpt_allowed_blocks
 */
add_filter(
	'excerpt_allowed_blocks',
	function( $allowed_blocks ) {
		return array_merge(
			$allowed_blocks,
			array(
				'snow-monkey-blocks/media-text',
			)
		);
	}
);