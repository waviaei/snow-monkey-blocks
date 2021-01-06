import classnames from 'classnames';

import { RichText, InnerBlocks, useBlockProps } from '@wordpress/block-editor';

export default function ( { attributes, className } ) {
	const {
		wrapperTagName,
		titleTagName,
		title,
		subtitle,
		lede,
		lgImageID,
		lgImageURL,
		lgImageAlt,
		lgImageMediaType,
		lgImageRepeat,
		lgFocalPoint,
		mdImageID,
		mdImageURL,
		mdImageAlt,
		mdImageMediaType,
		mdImageRepeat,
		mdFocalPoint,
		smImageID,
		smImageURL,
		smImageAlt,
		smImageMediaType,
		smImageRepeat,
		smFocalPoint,
		height,
		contentsAlignment,
		maskColor,
		maskColor2,
		maskColorAngle,
		maskOpacity,
		textColor,
		parallax,
		isSlim,
	} = attributes;

	const TagName = wrapperTagName;

	const classes = classnames(
		'smb-section',
		'smb-section-with-bgimage',
		`smb-section-with-bgimage--${ contentsAlignment }`,
		`smb-section-with-bgimage--${ height }`,
		className,
		{
			'js-bg-parallax': !! parallax,
		}
	);

	const bgimageClasses = classnames( 'smb-section-with-bgimage__bgimage', {
		'js-bg-parallax__bgimage': !! parallax,
	} );

	const containerClasses = classnames( 'c-container', {
		'u-slim-width': !! isSlim,
	} );

	const isLgVideo = 'video' === lgImageMediaType;
	const isLgImage =
		'image' === lgImageMediaType || undefined === lgImageMediaType;
	const hasLgBackground = !! lgImageURL;
	const lgPointValue =
		lgFocalPoint && ! parallax
			? `${ lgFocalPoint.x * 100 }% ${ lgFocalPoint.y * 100 }%`
			: undefined;

	const isMdVideo = 'video' === mdImageMediaType;
	const isMdImage =
		'image' === mdImageMediaType || undefined === mdImageMediaType;
	const hasMdBackground = !! mdImageURL;
	const mdPointValue =
		mdFocalPoint && ! parallax
			? `${ mdFocalPoint.x * 100 }% ${ mdFocalPoint.y * 100 }%`
			: undefined;

	const isSmVideo = 'video' === smImageMediaType;
	const isSmImage =
		'image' === smImageMediaType || undefined === smImageMediaType;
	const hasSmBackground = !! smImageURL;
	const smPointValue =
		smFocalPoint && ! parallax
			? `${ smFocalPoint.x * 100 }% ${ smFocalPoint.y * 100 }%`
			: undefined;

	const sectionStyles = {
		color: textColor || undefined,
	};

	const maskStyles = {};
	if ( maskColor ) {
		maskStyles.backgroundColor = maskColor;
		if ( maskColor2 ) {
			maskStyles.backgroundImage = `linear-gradient(${ maskColorAngle }deg, ${ maskColor } 0%, ${ maskColor2 } 100%)`;
		}
	}

	const lgVideoStyles = {
		opacity: maskOpacity,
		objectPosition: lgPointValue,
	};

	const norepeatableLgImageStyles = {
		opacity: maskOpacity,
		objectPosition: lgPointValue,
	};

	const repeatableLgImageStyles = {
		opacity: maskOpacity,
		backgroundImage: `url( ${ lgImageURL } )`,
		backgroundPosition: lgPointValue,
	};

	const mdVideoStyles = {
		opacity: maskOpacity,
		objectPosition: mdPointValue,
	};

	const norepeatableMdImageStyles = {
		opacity: maskOpacity,
		objectPosition: mdPointValue,
	};

	const repeatableMdImageStyles = {
		opacity: maskOpacity,
		backgroundImage: `url( ${ mdImageURL } )`,
		backgroundPosition: mdPointValue,
	};

	const smVideoStyles = {
		opacity: maskOpacity,
		objectPosition: smPointValue,
	};

	const norepeatableSmImageStyles = {
		opacity: maskOpacity,
		objectPosition: smPointValue,
	};

	const repeatableSmImageStyles = {
		opacity: maskOpacity,
		backgroundImage: `url( ${ smImageURL } )`,
		backgroundPosition: smPointValue,
	};

	return (
		<TagName
			{ ...useBlockProps.save( {
				className: classes,
				style: sectionStyles,
			} ) }
		>
			{ hasLgBackground && (
				<div
					className={ classnames(
						bgimageClasses,
						'smb-section-with-bgimage__bgimage--lg'
					) }
				>
					{ 0 < Math.abs( 1 - maskOpacity ) && (
						<div
							className="smb-section-with-bgimage__mask"
							style={ maskStyles }
						/>
					) }

					{ isLgImage &&
						( lgImageRepeat ? (
							<div
								className="smb-section-with-bgimage__repeatable-image"
								style={ repeatableLgImageStyles }
							>
								<img
									src={ lgImageURL }
									alt={ lgImageAlt }
									className={ `wp-image-${ lgImageID }` }
									style={ norepeatableLgImageStyles }
								/>
							</div>
						) : (
							<img
								src={ lgImageURL }
								alt={ lgImageAlt }
								className={ `wp-image-${ lgImageID }` }
								style={ norepeatableLgImageStyles }
							/>
						) ) }

					{ isLgVideo && (
						<video
							playsInline
							loop
							autoPlay
							muted
							src={ lgImageURL }
							style={ lgVideoStyles }
						/>
					) }
				</div>
			) }

			{ hasMdBackground && (
				<div
					className={ classnames(
						bgimageClasses,
						'smb-section-with-bgimage__bgimage--md'
					) }
				>
					{ 0 < Math.abs( 1 - maskOpacity ) && (
						<div
							className="smb-section-with-bgimage__mask"
							style={ maskStyles }
						/>
					) }

					{ isMdImage &&
						( mdImageRepeat ? (
							<div
								className="smb-section-with-bgimage__repeatable-image"
								style={ repeatableMdImageStyles }
							>
								<img
									src={ mdImageURL }
									alt={ mdImageAlt }
									className={ `wp-image-${ mdImageID }` }
									style={ norepeatableMdImageStyles }
								/>
							</div>
						) : (
							<img
								src={ mdImageURL }
								alt={ mdImageAlt }
								className={ `wp-image-${ mdImageID }` }
								style={ norepeatableMdImageStyles }
							/>
						) ) }

					{ isMdVideo && (
						<video
							playsInline
							loop
							autoPlay
							muted
							src={ mdImageURL }
							style={ mdVideoStyles }
						/>
					) }
				</div>
			) }

			{ hasSmBackground && (
				<div
					className={ classnames(
						bgimageClasses,
						'smb-section-with-bgimage__bgimage--sm'
					) }
				>
					{ 0 < Math.abs( 1 - maskOpacity ) && (
						<div
							className="smb-section-with-bgimage__mask"
							style={ maskStyles }
						/>
					) }

					{ isSmImage &&
						( smImageRepeat ? (
							<div
								className="smb-section-with-bgimage__repeatable-image"
								style={ repeatableSmImageStyles }
							>
								<img
									src={ smImageURL }
									alt={ smImageAlt }
									className={ `wp-image-${ smImageID }` }
									style={ norepeatableSmImageStyles }
								/>
							</div>
						) : (
							<img
								src={ smImageURL }
								alt={ smImageAlt }
								className={ `wp-image-${ smImageID }` }
								style={ norepeatableSmImageStyles }
							/>
						) ) }

					{ isSmVideo && (
						<video
							playsInline
							loop
							autoPlay
							muted
							src={ smImageURL }
							style={ smVideoStyles }
						/>
					) }
				</div>
			) }

			<div className={ containerClasses }>
				{ ! RichText.isEmpty( title ) &&
					! RichText.isEmpty( subtitle ) &&
					'none' !== titleTagName && (
						<RichText.Content
							tagName="div"
							className="smb-section__subtitle"
							value={ subtitle }
						/>
					) }

				{ ! RichText.isEmpty( title ) && 'none' !== titleTagName && (
					<RichText.Content
						tagName={ titleTagName }
						className="smb-section__title"
						value={ title }
					/>
				) }

				{ ! RichText.isEmpty( title ) &&
					! RichText.isEmpty( lede ) &&
					'none' !== titleTagName && (
						<RichText.Content
							tagName="div"
							className="smb-section__lede"
							value={ lede }
						/>
					) }

				<div className="smb-section__body">
					<InnerBlocks.Content />
				</div>
			</div>
		</TagName>
	);
}
