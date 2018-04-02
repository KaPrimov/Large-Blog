import React from 'react';
import PropTypes from 'prop-types';

export default class LiElement extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			showContent: this.props.showContent,
			styleClass: this.props.styleClass,
			styleId: this.props.styleId
		};
	}

	componentWillReceiveProps(nextProps) {
		if (this.state.showContent !== nextProps.showContent) {
			this.setState({showContent: nextProps.showContent});
		}

		if (this.state.styleClass !== nextProps.styleClass) {
			this.setState({styleClass: nextProps.styleClass});
		}

		if (this.state.styleId !== nextProps.styleId) {
			this.setState({styleId: nextProps.styleId});
		}
	}

	render() {
		if (this.state.showContent == false) {
			return null;
		} else {
			return (
				<li
					className={this.state.styleClass !== undefined? this.state.styleClass : ''}
					id={this.state.styleId !== undefined? this.state.styleId : ''}>
					{this.props.children}
				</li>
			);
		}
	}
}
LiElement.propTypes = {
	styleClass: PropTypes.string,
	styleId: PropTypes.string,
};
