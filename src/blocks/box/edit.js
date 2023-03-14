import classnames from 'classnames';
import hexToRgba from 'hex-to-rgba';

import {
	ContrastChecker,
	InnerBlocks,
	InspectorControls,
	useBlockProps,
	useInnerBlocksProps,
	__experimentalPanelColorGradientSettings as PanelColorGradientSettings,
	__experimentalUseMultipleOriginColorsAndGradients as useMultipleOriginColorsAndGradients,
	__experimentalBorderRadiusControl as BorderRadiusControl,
	__experimentalColorGradientSettingsDropdown as ColorGradientSettingsDropdown,
} from '@wordpress/block-editor';

import {
	RangeControl,
	SelectControl,
	__experimentalToolsPanel as ToolsPanel,
	__experimentalToolsPanelItem as ToolsPanelItem,
	__experimentalBorderBoxControl as BorderBoxControl,
} from '@wordpress/components';

import { useSelect } from '@wordpress/data';
import { __ } from '@wordpress/i18n';

import PanelBoxShadowSettings from '@smb/component/panel-box-shadow-settings';
import { toNumber } from '@smb/helper';

// @todo For WordPress 6.0
import { useMultipleOriginColorsAndGradientsFallback } from '@smb/hooks';

// @todo For WordPress 6.0
if ( undefined === useMultipleOriginColorsAndGradients ) {
	useMultipleOriginColorsAndGradients =
		useMultipleOriginColorsAndGradientsFallback;
}

import metadata from './block.json';

export default function ( { attributes, setAttributes, className, clientId } ) {
	const {
		backgroundColor,
		backgroundGradientColor,
		borderColor,
		textColor,
		borderWidth,
		borderRadius,
		opacity,
		contentPadding,
		boxShadow,
	} = attributes;

	const hasInnerBlocks = useSelect(
		( select ) =>
			!! select( 'core/block-editor' ).getBlock( clientId )?.innerBlocks
				?.length,
		[ clientId ]
	);

	const styles = {
		'--smb-box--color': textColor || undefined,
		'--smb-box--border-radius': String( borderRadius ).match( /^\d+$/ )
			? `${ borderRadius }px`
			: borderRadius,
		'--smb-box--box-shadow': !! boxShadow.color
			? `${ boxShadow.horizontal }px ${ boxShadow.vertical }px ${
					boxShadow.blur
			  }px ${ boxShadow.spread }px ${ hexToRgba(
					boxShadow.color,
					boxShadow.opacity
			  ) }`
			: undefined,
		'--smb-box--background-color': backgroundColor || undefined,
		'--smb-box--background-image': backgroundGradientColor || undefined,
		'--smb-box--background-opacity': String( opacity ),
		'--smb-box--border-color': borderColor || undefined,
		'--smb-box--border-width': String( borderWidth ).match( /^\d+$/ )
			? `${ borderWidth }px`
			: borderWidth,
	};

	const classes = classnames( 'smb-box', className, {
		[ `smb-box--p-${ contentPadding }` ]: !! contentPadding,
	} );

	const blockProps = useBlockProps( {
		className: classes,
		style: styles,
	} );

	const innerBlocksProps = useInnerBlocksProps(
		{
			className: 'smb-box__body',
		},
		{
			renderAppender: hasInnerBlocks
				? InnerBlocks.DefaultBlockAppender
				: InnerBlocks.ButtonBlockAppender,
		}
	);

	return (
		<>
			<InspectorControls>
				<PanelColorGradientSettings
					title={ __( 'Color', 'snow-monkey-blocks' ) }
					initialOpen={ false }
					settings={ [
						{
							colorValue: textColor,
							onColorChange: ( value ) =>
								setAttributes( {
									textColor: value,
								} ),
							label: __( 'Text color', 'snow-monkey-blocks' ),
						},
					] }
					__experimentalHasMultipleOrigins={ true }
					__experimentalIsRenderedInSidebar={ true }
				>
					<ContrastChecker
						backgroundColor={ backgroundColor }
						textColor={ textColor }
					/>
				</PanelColorGradientSettings>

				<ToolsPanel label={ __( 'Border', 'snow-monkey-blocks' ) }>
					<ToolsPanelItem
						hasValue={ () =>
							borderColor !==
								metadata.attributes.borderColor.default ||
							borderWidth !==
								metadata.attributes.borderWidth.default
						}
						isShownByDefault
						label={ __( 'Border', 'snow-monkey-blocks' ) }
						onDeselect={ () =>
							setAttributes( {
								borderColor:
									metadata.attributes.borderColor.default,
								borderWidth:
									metadata.attributes.borderWidth.default,
							} )
						}
					>
						<BorderBoxControl
							{ ...useMultipleOriginColorsAndGradients() }
							className="smb-border-box-control"
							enableAlpha={ false }
							enableStyle={ false }
							onChange={ ( value ) => {
								setAttributes( {
									borderColor: value.color,
									borderWidth: value.width,
								} );
							} }
							popoverOffset={ 40 }
							popoverPlacement="left-start"
							value={ {
								color: borderColor,
								width: borderWidth,
							} }
							__experimentalHasMultipleOrigins={ true }
							__experimentalIsRenderedInSidebar={ true }
						/>
					</ToolsPanelItem>

					<ToolsPanelItem
						hasValue={ () =>
							borderRadius !==
							metadata.attributes.borderRadius.default
						}
						isShownByDefault
						label={ __( 'Border radius', 'snow-monkey-blocks' ) }
						onDeselect={ () =>
							setAttributes( {
								borderRadius:
									metadata.attributes.borderRadius.default,
							} )
						}
					>
						<div className="smb-border-radius-control">
							<BorderRadiusControl
								values={ borderRadius }
								onChange={ ( value ) => {
									setAttributes( { borderRadius: value } );
								} }
							/>
						</div>
					</ToolsPanelItem>
				</ToolsPanel>

				<ToolsPanel label={ __( 'Dimensions', 'snow-monkey-blocks' ) }>
					<ToolsPanelItem
						hasValue={ () =>
							contentPadding !==
							metadata.attributes.contentPadding.default
						}
						isShownByDefault
						label={ __( 'Padding', 'snow-monkey-blocks' ) }
						onDeselect={ () =>
							setAttributes( {
								contentPadding:
									metadata.attributes.contentPadding.default,
							} )
						}
					>
						<SelectControl
							label={ __( 'Padding', 'snow-monkey-blocks' ) }
							value={ contentPadding }
							options={ [
								{
									value: 's',
									label: __( 'S', 'snow-monkey-blocks' ),
								},
								{
									value: '',
									label: __( 'M', 'snow-monkey-blocks' ),
								},
								{
									value: 'l',
									label: __( 'L', 'snow-monkey-blocks' ),
								},
							] }
							onChange={ ( value ) =>
								setAttributes( {
									contentPadding: value,
								} )
							}
						/>
					</ToolsPanelItem>
				</ToolsPanel>

				<ToolsPanel label={ __( 'Background', 'snow-monkey-blocks' ) }>
					<div className="smb-color-gradient-settings-dropdown">
						<ColorGradientSettingsDropdown
							settings={ [
								{
									label: __( 'Color', 'snow-monkey-blocks' ),
									colorValue: backgroundColor,
									gradientValue: backgroundGradientColor,
									onColorChange: ( value ) =>
										setAttributes( {
											backgroundColor: value,
										} ),
									onGradientChange: ( value ) =>
										setAttributes( {
											backgroundGradientColor: value,
										} ),
								},
							] }
							__experimentalIsItemGroup={ false }
							__experimentalHasMultipleOrigins
							__experimentalIsRenderedInSidebar
							{ ...useMultipleOriginColorsAndGradients() }
						/>
					</div>

					<ToolsPanelItem
						hasValue={ () =>
							opacity !== metadata.attributes.opacity.default
						}
						isShownByDefault
						label={ __( 'Opacity', 'snow-monkey-blocks' ) }
						onDeselect={ () =>
							setAttributes( {
								opacity: metadata.attributes.opacity.default,
							} )
						}
					>
						<RangeControl
							label={ __( 'Opacity', 'snow-monkey-blocks' ) }
							value={ opacity }
							onChange={ ( value ) =>
								setAttributes( {
									opacity: toNumber( value, 0, 1 ),
								} )
							}
							min={ 0 }
							max={ 1 }
							step={ 0.1 }
						/>
					</ToolsPanelItem>
				</ToolsPanel>

				<PanelBoxShadowSettings
					settings={ [
						{
							colorValue: boxShadow.color || '',
							onColorChange: ( value ) => {
								boxShadow.color = value;
								setAttributes( {
									boxShadow: { ...boxShadow },
								} );
							},
							defaultValue:
								metadata.attributes.boxShadow.default.color,
						},
						{
							opacityValue: boxShadow.opacity,
							onOpacityChange: ( value ) => {
								boxShadow.opacity = value;
								setAttributes( {
									boxShadow: { ...boxShadow },
								} );
							},
							defaultValue:
								metadata.attributes.boxShadow.default.opacity,
						},
						{
							horizontalValue: boxShadow.horizontal,
							onHorizontalChange: ( value ) => {
								boxShadow.horizontal = value;
								setAttributes( {
									boxShadow: { ...boxShadow },
								} );
							},
							defaultValue:
								metadata.attributes.boxShadow.default
									.horizontal,
						},
						{
							blurValue: boxShadow.blur,
							onBlurChange: ( value ) => {
								boxShadow.blur = value;
								setAttributes( {
									boxShadow: { ...boxShadow },
								} );
							},
							defaultValue:
								metadata.attributes.boxShadow.default.blur,
						},
						{
							spreadValue: boxShadow.spread,
							onSpreadChange: ( value ) => {
								boxShadow.spread = value;
								setAttributes( {
									boxShadow: { ...boxShadow },
								} );
							},
							defaultValue:
								metadata.attributes.boxShadow.default.spread,
						},
					] }
				/>
			</InspectorControls>

			<div { ...blockProps }>
				<div className="smb-box__background" />

				<div { ...innerBlocksProps } />
			</div>
		</>
	);
}
