'use strict';

import blockConfig from '../../../../../src/js/config/block';
import attributes from './attributes';
import edit from './edit';
import save from './save';
import transforms from './transforms';

import {
	__,
} from '@wordpress/i18n';

export const name = 'snow-monkey-blocks/step--item--free';

export const settings = {
	title: __( 'Item (Free input)', 'snow-monkey-blocks' ),
	description: __( 'It is a child block of the step block.', 'snow-monkey-blocks' ),
	icon: {
		foreground: blockConfig.blockIconColor,
		src: 'editor-ol',
	},
	category: blockConfig.blockCategories.common,
	parent: [ 'snow-monkey-blocks/step' ],
	supports: {
		anchor: true,
	},
	attributes,
	edit,
	save,
	transforms,
};