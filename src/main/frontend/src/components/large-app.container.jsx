import React from 'react';
import Navigation from './front/common/navigation/navigation.container.jsx';
class LargeAppContainer extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<article id="large-application">
				<Navigation />	
				{this.props.children}
			</article>
		);
	}
}

export default LargeAppContainer;