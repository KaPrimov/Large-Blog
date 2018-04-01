import React from 'react';
import {bindActionCreators} from 'redux';
import * as employeeActions from '../../../../../../services/actions/employee.actions';
import * as officeActions from '../../../../../../services/actions/office.actions';
import {connect} from 'react-redux';
import ShowTargetOfficesComponent from './show-target-offices.component.jsx';
import ShowTargetEmployeesComponent from './show-target-employees.component.jsx';
import FieldCreationLabelComponent from '../field-creation-label.component.jsx';

class ShowTargetGroupContainer extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			offices: this.props.offices,
			employees: this.props.employees,
			article: this.props.article
		};
	}
    
	componentDidMount() {
		this.props.actions.listAllOffices();
	}
    
	componentWillReceiveProps(nextProps) {
		if (this.state.offices !== nextProps.offices) {
			this.setState({offices: nextProps.offices});
		}
		if (nextProps.article) {
			this.setState({article: nextProps.article});
		}
	}
    
	render() {
		let data = null;
		if (this.state.article.targetOffices.length > 0) {
			let officesToVisualise = this.state.offices.filter(office => this.state.article.targetOffices.includes(office.id));
			data = <ShowTargetOfficesComponent offices={officesToVisualise} />;
		} else if (this.state.article.targetEmployees.length > 0 ) {
			data = <ShowTargetEmployeesComponent employees={this.state.article.targetEmployees} />;
		}
		return (
			<div>
				<FieldCreationLabelComponent
					title={this.props.choosenTargetGroupsTitle}
					subtitle={this.props.choosenTargetGroupsSubtitle}
				/>
				{data}
			</div>
		);
	}
}


function mapStateToProps(state) {
	return {
		offices: state.offices,
		employees: state.employees
	};
}

function mapDispatchToProps(dispatch) {
	return {
		actions: bindActionCreators(Object.assign({}, employeeActions, officeActions), dispatch)
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(ShowTargetGroupContainer);