import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {I18n} from 'react-redux-i18n';
import * as newsActions from '../../../../../services/actions/news.actions.js';
import * as articleActions from '../../../../../services/actions/article.actions.js';
import FormValidatorService from '../../../../../services/services/form-validator.service';
import MetaDataInputComponent from './meta-data-input.component.jsx';
import {ModalService} from '../../../../../services/services/modal.service';
import {isEqual} from 'underscore';
import moment from 'moment';
import PropTypes from 'prop-types';
import _ from 'lodash';
import NotificationService from '../../../../../services/services/notification.service';
import * as ArticleStatus from '../../common/article-status.constants';

class MetaDataInputContainer extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			startDate: !isNaN(moment(this.props.currentNews.startDate)) ? moment(this.props.currentNews.startDate) : null,
			endDate:  this.props.currentNews.endDate ? moment(this.props.currentNews.endDate) : null,
			shortDescription: this.props.currentNews.shortDescription,
			currentNews: this.props.currentNews,
			currentLocale: this.props.currentLocale,
			checkedTags: this.props.checkedTags,
			formChecker: {
				isValid: false, silentCheck: false, errors: [], checkedFields: {
					'startDate': true, 'endDate': true, 'shortDescription': true
				}
			},
			offices: [],
			checkedOffices: this.props.currentNews.targetOffices || [],
			checkedEmployees: this.props.currentNews.targetEmployees || [],
			isGroupMarked: (this.props.currentNews.targetEmployees && this.props.currentNews.targetEmployees.length) > 0 ? false : true
		};
		this.radioButtons = [{value: 'WEB', option: I18n.t('meta_data_section.radio_button.options.web'), dataTip: I18n.t('meta_data_section.radio_button.tooltips.web')},
			{value: 'MAIL', option: I18n.t('meta_data_section.radio_button.options.mail'), dataTip: I18n.t('meta_data_section.radio_button.tooltips.mail')}, 
			{value: 'ALL', option: I18n.t('meta_data_section.radio_button.options.all'), dataTip: I18n.t('meta_data_section.radio_button.tooltips.all')}];
		this.bindEventHandlers();
	}
	
	componentDidMount() {
		this.props.actions.listAllOffices().then(() => {
			this.validateForm(null, null, true).then(() => {	
				if (this.state.currentNews.isForPublish) {
					this.onNextPublishStep();
				}
			});
		});
	}
	
	componentWillReceiveProps(nextProps) {
		if (!(isEqual(this.state.currentNews, nextProps.currentNews))) {
			this.setState({currentNews: nextProps.currentNews});
			if (nextProps.currentNews.shortDescription) {
				this.setState({shortDescription: nextProps.currentNews.shortDescription});
			}
		}

		if (!(_.isEmpty(_.xor(this.state.checkedTags, nextProps.checkedTags)))) {
			this.setState({checkedTags: nextProps.checkedTags});
		}
		
		if (this.state.offices !== nextProps.offices) {
			this.setState({offices: nextProps.offices});
		}
		
		if (this.state.employees !== nextProps.employees) {
			this.setState({employees:nextProps.employees});
		}
		
		if (this.state.checkedEmployees !== nextProps.checkedEmployees && nextProps.checkedEmployees != undefined) {
			this.setState({checkedEmployees:nextProps.checkedEmployees});
		}
	}
	
	bindEventHandlers() {
		this.selectLocaleForCalendar = this.selectLocaleForCalendar.bind(this);
		this.onStartDateChange = this.onStartDateChange.bind(this);
		this.onEndDateChange = this.onEndDateChange.bind(this);
		this.onSaveHandler = this.onSaveHandler.bind(this);
		this.onChange = this.onChange.bind(this);
		this.onRadioButtonChange = this.onRadioButtonChange.bind(this);
		this.onOfficesChange = this.onOfficesChange.bind(this);
		this.onChangeSelectedEmployees = this.onChangeSelectedEmployees.bind(this);
		this.onSwitchTargetButtonChange = this.onSwitchTargetButtonChange.bind(this);
		this.generateNewsToSave = this.generateNewsToSave.bind(this);
		this.onNextPublishStep = this.onNextPublishStep.bind(this);
		this.onCancelPublish = this.onCancelPublish.bind(this);
	}

	onChangeSelectedEmployees(newSelectedEmployees) {
		this.setState({checkedEmployees: newSelectedEmployees});
	}

	onOfficesChange(offices) {
		this.setState({checkedOffices: offices});
	}

	onSwitchTargetButtonChange(type) {
		if(type === 'offices' && this.state.isGroupMarked) {
			return;
		} else if (type === 'employees' && !this.state.isGroupMarked) {
			return;
		}
		ModalService.showConfirm(I18n.t('meta_data_section.modal_message'), I18n.t('meta_data_section.modal_title')).then(result => {
			if (result) {
				if (type === 'offices') {
					this.setState({checkedEmployees: [], isGroupMarked: true});
				} else if (type === 'employees') {
					this.setState({checkedOffices: [], isGroupMarked: false});
				}
			}
		});
		
	}

	validateForm(field, silent, hardCheck) {
		let deffered = jQuery.Deferred();

		if (silent === undefined) {
			silent = false;
		}

		if (hardCheck === undefined) {
			hardCheck = false;
		}

		let formChecker = Object.assign({}, this.state.formChecker);
		formChecker.silentCheck = silent;

		if (field === 'startDate' || silent || hardCheck) {
			formChecker.checkedFields['startDate'] = true;
			if (this.state.startDate == null) {
				formChecker.errors['startDate'] = I18n.t('common.validation.required_field');
			} else if (this.state.currentNews && this.state.currentNews.status != ArticleStatus.PUBLISHED && moment(this.state.startDate).isBefore(moment().startOf('day'))) {
				formChecker.errors['startDate'] = I18n.t('meta_data_section.validation.start_date_in_past');
			} else {
				formChecker.errors['startDate'] = null;
			}
		}

		if (field === 'endDate' || silent || hardCheck) {
			formChecker.checkedFields['endDate'] = true;
			if(this.state.endDate == null && this.state.startDate == null) {
				formChecker.errors['endDate'] = null;
			} else if (this.state.startDate == null) {
				formChecker.errors['endDate'] = I18n.t('common.validation.connected_required_field', {fieldName: I18n.t('meta_data_section.start_date')});
			} else if (this.state.endDate != null && moment(this.state.startDate).isAfter(moment(this.state.endDate))) {
				formChecker.errors['endDate'] = I18n.t('meta_data_section.validation.start_date_is_after');
			} else {
				formChecker.errors['endDate'] = null;
			}
		}

		if (field === 'shortDescription' || silent || hardCheck) {
			if (this.state.shortDescription == null || this.state.shortDescription.trim().length == 0) {
				formChecker.errors['shortDescription'] = I18n.t('common.validation.required_field');
			} else if (this.state.shortDescription != undefined && this.state.shortDescription.trim().length < 20) {
				formChecker.errors['shortDescription'] = I18n.t('common.validation.min_length', {size: 20});
			} else if (this.state.shortDescription.length > 200) {
				formChecker.errors['shortDescription'] = I18n.t('common.validation.max_length', {size: 200});
			} else {
				formChecker.errors['shortDescription'] = null;
			}
		}

		FormValidatorService.checkForm(formChecker);
		this.setState({formChecker: formChecker}, () => deffered.resolve());

		return deffered.promise();
	}

	selectLocaleForCalendar() {
		switch (this.state.currentLocale.shortName) {
		case 'bg':
			return 'bg_BG';
		case 'fr':
			return 'fr_FR';
		default:
			return 'en-GB';
		}
	}

	onStartDateChange(date) {
		this.setState({startDate: date});

		let currentNews = Object.assign({}, this.state.currentNews);
		currentNews.startDate = date == null ? null : date.toDate().getTime();
		this.setState({currentNews: currentNews}, () => {
			this.validateForm('endDate');
			this.validateForm('startDate');
		});
	}

	onEndDateChange(date) {
		this.setState({endDate: date});

		let currentNews = Object.assign({}, this.state.currentNews);
		currentNews.endDate = date == null ? null : date.toDate().getTime();
		this.setState({currentNews: currentNews}, () => {
			this.validateForm('endDate');
			this.validateForm('startDate');
		});
	}

	onChange(event) {
		const value = event.target.value;
		this.setState({[event.target.name]: value});
		let currentNews = Object.assign({}, this.state.currentNews);
		currentNews.shortDescription = value;
		this.setState({currentNews: currentNews}, () => {
			this.validateForm('shortDescription');
		});
	}

	generateNewsToSave() {
		if(this.state.checkedEmployees.length === 0 && this.state.checkedOffices.length === 0) {
			NotificationService.notifyError(I18n.t('meta_data_section.errors.target_group_required'));
			return;
		}
		let newsToSave = Object.assign({}, this.state.currentNews);
		newsToSave.startDate = this.state.startDate;
		newsToSave.endDate = this.state.endDate;
		newsToSave.shortDescription = this.state.shortDescription;
		newsToSave.tags = this.state.checkedTags || [];
		newsToSave.notificationType = newsToSave.notificationType ? newsToSave.notificationType : 'WEB'; 
		newsToSave.targetEmployees = this.state.checkedEmployees.length !== 0 ? this.state.checkedEmployees : this.state.currentNews.targetEmployees;
		newsToSave.targetOffices = this.state.checkedOffices.length !== 0 ? this.state.checkedOffices : this.state.currentNews.targetOffices;
		return newsToSave;
	}

	onSaveHandler(event) {
		event.preventDefault();		
		this.validateForm(null, null, true).then(() => {	
			if (this.state.formChecker.isValid) {
				if (moment(this.state.startDate).startOf('day').isSame(moment().startOf('day')) && this.state.currentNews.status === ArticleStatus.PUBLISH_PENDING) {
					ModalService.showConfirm(I18n.t('meta_data_section.modal_message_save'), I18n.t('meta_data_section.modal_title')).then(result => {
						if (result) {
							this.invokeOnNextAction();
						}
					});
				} else {
					const newsToSave = this.generateNewsToSave();
					if (!newsToSave) {
						return;
					}
					this.props.actions.updateMetadataHandler(newsToSave);
				}
			} else if(this.state.formChecker.errors['shortDescription']) {
				NotificationService.notifyError(I18n.t('common.validation.required_field_with_name', {fieldName: I18n.t('meta_data_section.short_description_title')}));
			}
		});
			
	}

	onNextPublishStep() {
		this.validateForm(null, null, true).then(() => {
			if (this.state.formChecker.isValid) {
				if (moment(this.state.startDate).startOf('day').isAfter(moment().startOf('day'))) {
					ModalService.showConfirm(I18n.t('meta_data_section.modal_publish_pending_body_news', {date: moment(this.state.startDate).format('DD/MM/YYYY')}), I18n.t('meta_data_section.modal_publish_pending_title')). then(result => {
						if (result) {
							this.invokeOnNextAction();
						}
					});
				} else {
					ModalService.showConfirm(I18n.t('meta_data_section.modal_message_save'), I18n.t('meta_data_section.modal_title')).then(result => {
						if (result) {
							this.invokeOnNextAction();
						}
					});
				}				
			} else if(this.state.formChecker.errors['shortDescription']) {
				NotificationService.notifyError(I18n.t('common.validation.required_field_with_name', {fieldName: I18n.t('meta_data_section.short_description_title')}));
			} else {
				NotificationService.notifyError(I18n.t('meta_data_section.errors.invalid_data'));
			}
		});
	}

	invokeOnNextAction() {
		const newsToSave = this.generateNewsToSave();
		if (!newsToSave) {
			return;
		}
		this.props.onNext(newsToSave);
	}

	onRadioButtonChange(value) {
		let currentNews = Object.assign({}, this.state.currentNews);
		currentNews.notificationType = value;
		this.setState({currentNews: currentNews});
	}

	onCancelPublish() {
		let currentNews = Object.assign({}, this.state.currentNews);
		currentNews.status = ArticleStatus.DRAFT;
		this.setState({currentNews: currentNews});
		this.props.actions.cancelFuturePublishing(this.state.currentNews.id);
	}

	render() {
		return (
			<MetaDataInputComponent
				startDate={this.state.startDate}
				endDate={this.state.endDate}
				shortDescription={this.state.shortDescription}
				onChange={this.onChange}
				onStartDateChange={this.onStartDateChange}
				onEndDateChange={this.onEndDateChange}
				onNextPublishStep={this.onNextPublishStep}
				selectLocaleForCalendar={this.selectLocaleForCalendar}
				formChecker={this.state.formChecker}
				onSaveHandler={this.onSaveHandler}
				onRadioButtonChange={this.onRadioButtonChange}
				onOfficesChange={this.onOfficesChange}
				radioButtons={this.radioButtons}
				offices={this.state.offices}
				checkedOffices={this.state.checkedOffices}
				onChangeSelectedEmployees={this.onChangeSelectedEmployees}
				checkedEmployees={this.state.checkedEmployees}
				isGroupMarked={this.state.isGroupMarked}
				onSwitchTargetButtonChange={this.onSwitchTargetButtonChange}
				onBack={this.props.onBack}
				isPublished={this.state.currentNews.status === ArticleStatus.PUBLISHED}
				singleNews={this.state.currentNews}
				ref="metaDataInputComponent"
				onCancelPublish={this.onCancelPublish}
				currentLocale={this.state.currentLocale}
			/>
		);

	}
}

function mapStateToProps(state, ownProps) {
	return {
		currentNews: state.createNews,
		currentLocale: state.currentLocale,
		checkedTags: state.suggestedTags.checkedTags,
		offices: state.offices,
		employees: state.employees,
		checkedEmployees: ownProps.checkedEmployees
	};
}

function mapDispatchToProps(dispatch) {
	return {
		actions: bindActionCreators(Object.assign({}, newsActions, articleActions), dispatch)
	};
}

MetaDataInputContainer.propTypes = {
	currentNews: PropTypes.object.isRequired,
	currentLocale: PropTypes.object.isRequired,
	onBack: PropTypes.func.isRequired,
	checkedTags: PropTypes.array,
	offices: PropTypes.array,
	employees: PropTypes.array,
	checkedEmployees: PropTypes.array
};

export default connect(mapStateToProps, mapDispatchToProps, null, {withRef: true})(MetaDataInputContainer);