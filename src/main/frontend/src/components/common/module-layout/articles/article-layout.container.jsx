import React from 'react';

export default class ArticleLayoutContainer extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div className="container content-wrapper">
				<div className="row col-md-12 portlet light">
					{this.props.children}
				</div>
			</div>
		);
	}
}