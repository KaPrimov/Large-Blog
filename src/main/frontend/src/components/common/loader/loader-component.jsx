import React from 'react';
import PropTypes from 'prop-types';
import {RiseLoader} from 'halogen';

const LoaderComponent = ({loading, wrapperStyleCss, loaderStyleCss}) => {
	if (wrapperStyleCss === undefined) {
		wrapperStyleCss = {};
	}

	if (loaderStyleCss === undefined) {
		loaderStyleCss = {};
	}

	let loadingCssClass = loading ? 'loading' : '';

	return (
		<section className={`loader-wrapper animated ${loadingCssClass}`} style={wrapperStyleCss}>
			<RiseLoader color="#23385d" size="16px" margin="4px" style={loaderStyleCss}/>
		</section>
	);
};

LoaderComponent.propTypes = {
	loading: PropTypes.bool.isRequired,
	wrapperStyleCss: PropTypes.object,
	loaderStyleCss: PropTypes.object
};

export default LoaderComponent;