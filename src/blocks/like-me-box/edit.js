import { PanelBody, Placeholder, TextControl } from '@wordpress/components';
import { InspectorControls, useBlockProps } from '@wordpress/block-editor';
import { __ } from '@wordpress/i18n';

import ServerSideRender from '@wordpress/server-side-render';

export default function ( { attributes, setAttributes } ) {
	const { pageName } = attributes;

	const onChangePageName = ( value ) =>
		setAttributes( {
			pageName: value,
		} );

	return (
		<>
			<InspectorControls>
				<PanelBody
					title={ __( 'Block settings', 'snow-monkey-blocks' ) }
				>
					<TextControl
						label={ __(
							'Facebook page name',
							'snow-monkey-blocks'
						) }
						value={ pageName }
						onChange={ onChangePageName }
					/>
				</PanelBody>
			</InspectorControls>

			<div { ...useBlockProps() }>
				{ ! pageName ? (
					<Placeholder
						icon="thumbs-up"
						label={ __( 'Like me box', 'snow-monkey-blocks' ) }
					>
						{ __(
							'Please input "Facebook page name"',
							'snow-monkey-blocks'
						) }
					</Placeholder>
				) : (
					<ServerSideRender
						block="snow-monkey-blocks/like-me-box"
						attributes={ attributes }
					/>
				) }
			</div>
		</>
	);
}
