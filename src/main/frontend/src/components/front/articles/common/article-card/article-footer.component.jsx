import React from 'react';
import PropTypes from 'prop-types';
import ArticleCardAuthor from './article-card-author.component.jsx';
import ArticleCardReader from './article-card-reader.component.jsx';
import ArticleStats from '../article-stats/article-stats.component.jsx';

class ArticleFooter extends React.Component {
	constructor(props) {
		super(props);

		this.state={
			modalIsOpen: false
		};

		this.openModal = this.openModal.bind(this);
		this.closeModal = this.closeModal.bind(this);
		this.getReadersBarStyleClass = this.getReadersBarStyleClass.bind(this);
	}

	openModal(e) {
		e.preventDefault();
		this.setState({modalIsOpen: true});
	}

	closeModal(e) {
		e.preventDefault();
		this.setState({modalIsOpen: false});
	}

	getReadersBarStyleClass(){
		switch (this.props.newsArticle.tags.length){
		case 1: 
			return 'readers-read-bar-unique-user';
		case 2:
			return 'readers-read-bar-for-two';
		default:
			return 'readers-read-bar';
		}
	}
	render () {
		return (
			<footer className="row article-footer-bar">
				<div className="col-xs-6">
					<ArticleCardAuthor 
						author={this.props.newsArticle.employee}
						hasProfileReadPrivilege={this.props.hasProfileReadPrivilege}
					/>
				</div>
				<div className="col-xs-6">
					<div className="number-of-readers-read-bar">
						<section className="reader-article-read">
							<figure className="eye-component hidden-sm-up" onClick={this.openModal}>
								<ArticleStats 
									isOpen={this.state.modalIsOpen} 
									onRequestClose={this.closeModal}
									employeesPerArticle={this.props.newsArticle.seenBy} />
								<div className="reader-saw-article" >{this.props.newsArticle.seenBy && this.props.newsArticle.seenBy.length > 0 ? this.props.newsArticle.seenBy.length : '' }</div>
								{this.props.newsArticle.seenBy && this.props.newsArticle.seenBy.length > 0 ? <i className="fa fa-eye fa-lg" aria-hidden="true"></i> : ''}
							</figure>
							<div className={this.getReadersBarStyleClass()}>
								<div className="reader-social-bookmark-item hidden-xs-down">{this.props.newsArticle.seenBy && this.props.newsArticle.seenBy.length > 0 ? this.props.newsArticle.seenBy.length : ''}</div>
								<table className="readers-avatar" onClick={this.openModal}>
									<ArticleStats 
										isOpen={this.state.modalIsOpen} 
										onRequestClose={this.closeModal}
										employeesPerArticle={this.props.newsArticle.seenBy}
										hasProfileReadPrivilege={this.props.hasProfileReadPrivilege} />
									<tbody>
										<tr className="reader">
											{this.props.newsArticle.seenBy && this.props.newsArticle.seenBy.length != 0 && this.props.newsArticle.seenBy.map((reader, counter) =>{
												return(
													<td key={reader.id} className= {`user${counter} hidden-xs-down`}>
														<ArticleCardReader
															readerId = {reader.id}
															countReader = {counter}
														/>
													</td>
												);
											}).slice(0, 3)}
										</tr>
									</tbody>
								</table>
							</div>
						</section>
					</div>
				</div>
			</footer>
		);
	}
};

ArticleFooter.propTypes = {
	newsArticle: PropTypes.object.isRequired,
	hasProfileReadPrivilege: PropTypes.bool.isRequired
};

export default ArticleFooter;