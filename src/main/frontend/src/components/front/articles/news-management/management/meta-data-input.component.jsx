import React from 'react';
import {Translate} from 'react-redux-i18n';
import PropTypes from 'prop-types';
import StartEndDateComponent from '../../common/article-metadata/start-end-date.component.jsx';
import UploadArticleImageContainer from '../../../../common/image-upload/upload-image.container.jsx';
import DisplayArticleImage from '../../../../common/image-upload/display-article-image.component.jsx';
import {I18n} from 'react-redux-i18n';
import {Link} from 'react-router';
import ShortDescriptionComponent from './short-description.component.jsx';
import NotificationTypesSelector from './notification-types-selector.component.jsx';
import ArticleTagsCreationComponent from './article-tag-creation.component.jsx';
import ShowNotificationType from '../../common/article-metadata/show-notification-type.component.jsx';
import NewsShowTags from '../../common/article-metadata/news-show-tags.component.jsx';
import NewsShowDates from '../../common/article-metadata/news-show-dates.components.jsx';
import ArticleShowText from '../../common/article-metadata/article-show-text.component.jsx';
import * as ArticleStatus from '../../common/article-status.constants';
import ArticleApi from '../../../../../services/api/article.api';
import moment from 'moment';



export default class MetaDataInputComponent extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		let {startDate, endDate, onStartDateChange, onEndDateChange, selectLocaleForCalendar, currentLocale,
			formChecker, onSaveHandler, shortDescription, onChange, onRadioButtonChange, radioButtons,
			onBack, isPublished, singleNews, onNextPublishStep, onCancelPublish} = this.props;
		return (
			
			<section className='create-article-editor'>
				<div>
					<div className='portlet light article-management'>
						<div className="portlet-title">
							<span className="caption"><Translate value="article_management_container.meta_data_label" /></span>
						</div>
						<div className="portlet-body metadata-portlet" style={{minHeight: '720px'}}>
							{isPublished ? 
								singleNews.imagePath == '' || singleNews.imagePath == null ? 
									null : 
									<DisplayArticleImage 
										imgSrc={ArticleApi.getArticlePhotoPathByArticleId(singleNews.id)}
										title={I18n.t('meta_data_section.show_article_image_title')}
										subtitle={I18n.t('meta_data_section.show_article_image_subtitle')}
										withoutControls={true}
									/>
								:							
								<UploadArticleImageContainer
									title={I18n.t('meta_data_section.image_upload_title')}
									subtitle={I18n.t('meta_data_section.image_upload_subtitle')}
									ref='uploadArticleImageContainer'
								/>
							}
							{isPublished ? 
								<ArticleShowText
									title={I18n.t('meta_data_section.show_news_description_title')}
									subtitle={I18n.t('meta_data_section.show_news_description_subtitle')}
									text={singleNews.shortDescription}
								/> : 
								<ShortDescriptionComponent 
									onChange={onChange}
									titleValue={I18n.t('meta_data_section.short_description_title')}
									subtitleValue={I18n.t('meta_data_section.short_description_subtitle')}
									shortDescription={shortDescription}
									formChecker={formChecker}
								/>
							}
							{isPublished ? 	
								singleNews.tags.length > 0 ?
									<NewsShowTags 
										tags={singleNews.tags}
										title={I18n.t('meta_data_section.show_tags_title')}
										subtitle={I18n.t('meta_data_section.show_tags_subtitle')}
									/> : null
								:
								<ArticleTagsCreationComponent 
									titleValue={I18n.t('meta_data_section.tags_title')}
									subtitleValue={I18n.t('meta_data_section.tags_subtitle')}
								/>}
							{isPublished ?
								<ShowNotificationType 
									type={singleNews.notificationType}
									title={I18n.t('meta_data_section.notifications_title')}
									subtitle={I18n.t('meta_data_section.show_notifications_subtitle')}
								/>
								:
								<NotificationTypesSelector 
									name={'notificationType'}
									titleValue={I18n.t('meta_data_section.notifications_title')}
									subtitleValue={I18n.t('meta_data_section.notifications_subtitle')}
									onRadioButtonChange={onRadioButtonChange}
									radioButtons={radioButtons}
									selected={singleNews.notificationType}
								/>	
							}
							{isPublished ? 
								<NewsShowDates 
									startDate={!isNaN(moment(singleNews.startDate)) ? moment(singleNews.startDate) : null}
									endDate={singleNews.endDate ? moment(singleNews.endDate) : null}
									selectLocaleForCalendar={this.props.selectLocaleForCalendar}
									title={I18n.t('meta_data_section.show_article_dates_title')}
									subtitle={I18n.t('meta_data_section.show_article_dates_subtitle')}
									currentLocale={currentLocale}
								/> 
								:			
								<StartEndDateComponent
									startDate={startDate}
									endDate={endDate}
									onStartDateChange={onStartDateChange}
									onEndDateChange={onEndDateChange}
									selectLocaleForCalendar={selectLocaleForCalendar}
									formChecker={formChecker}
									title={I18n.t('meta_data_section.date_creation_title')}
									subtitle={I18n.t('meta_data_section.date_creation_subtitle')}
								/>
							}
							<div className='row mx-auto'>
								{singleNews.status !== ArticleStatus.PUBLISHED &&
									<button onClick={() => onBack(singleNews)} className={`btn btn-sm btn-ocustom create-metadata-button ${singleNews.status !== ArticleStatus.PUBLISHED ? 'col-xs-4' : 'col-xs-12'}` }>
										<Translate value="common.btn.back" />
									</button>
								}
								{singleNews.status !== ArticleStatus.PUBLISHED &&
								<button onClick={onSaveHandler} className='standart-button-workflow btn-ocustom btn btn-sm col-xs-4 create-metadata-button' >
									<Translate value="meta_data_section.save_button" />
								</button>}
								{singleNews.status === ArticleStatus.PUBLISH_PENDING &&
								<button onClick={onCancelPublish} className='standart-button-workflow btn-ocustom btn btn-sm col-xs-4 create-metadata-button' >
									<Translate value="meta_data_section.cancel_publish" />
								</button>}
								{singleNews.status === ArticleStatus.DRAFT && <button className="standart-button-workflow btn-sm col-xs-4 btn-ocustom btn create-metadata-button" onClick={onNextPublishStep}>
									<Translate value="meta_data_section.to_publish_button" />
								</button>}
								{singleNews.status === ArticleStatus.PUBLISHED &&
								<div className='row mx-auto'>
									<Link to='news/regulation-management' className="btn btn-sm btn-ocustom col-xs-8 create-metadata-button offset-xs-2">
										<Translate value="regulation_management.to_all_regulations" />
									</Link>
								</div>}
							</div>
						</div>
					</div>
				</div>
			</section>
		);
	}
}

MetaDataInputComponent.propTypes = {
	onStartDateChange: PropTypes.func.isRequired,
	onEndDateChange: PropTypes.func.isRequired,
	onOfficesChange: PropTypes.func.isRequired,
	selectLocaleForCalendar: PropTypes.func.isRequired,
	formChecker: PropTypes.object.isRequired,
	onChangeSelectedEmployees: PropTypes.func.isRequired, 
	onSaveHandler: PropTypes.func.isRequired, 
	onRadioButtonChange: PropTypes.func.isRequired, 
	radioButtons: PropTypes.array.isRequired,
	onChange: PropTypes.func.isRequired, 
	startDate: PropTypes.object,
	endDate: PropTypes.object, 
	shortDescription: PropTypes.string, 
	offices: PropTypes.array,
	currentSelectedOffices: PropTypes.array,
	isGroupMarked: PropTypes.bool, 
	onSwitchTargetButtonChange: PropTypes.func, 
	checkedEmployees: PropTypes.array,
	onCancelPublish: PropTypes.func
};