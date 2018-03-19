import React from 'react';

class LargeAppContainer extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<article id="large-application">
				{this.props.children}
			</article>
		);
	}
}

export default LargeAppContainer;