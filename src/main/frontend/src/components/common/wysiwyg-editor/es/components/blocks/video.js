import _Object$assign from 'babel-runtime/core-js/object/assign';
import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _possibleConstructorReturn from 'babel-runtime/helpers/possibleConstructorReturn';
import _inherits from 'babel-runtime/helpers/inherits';
import NotificationService from '../../../../../../services/services/notification.service';
import {I18n} from 'react-redux-i18n';

import React from 'react';
import ReactDOM from 'react-dom';

import {Entity, RichUtils, AtomicBlockUtils, EditorBlock} from 'draft-js';

import {updateDataOfBlock} from '../../model/index.js';


var VideoBlock = function (_React$Component) {
	_inherits(VideoBlock, _React$Component);

	function VideoBlock(props) {
		_classCallCheck(this, VideoBlock);

		//api_key = "86c28a410a104c8bb58848733c82f840"

		var _this = _possibleConstructorReturn(this, _React$Component.call(this, props));

		_this.updateData = _this.updateData.bind(_this);
		_this.dataForUpdate = _this.dataForUpdate.bind(_this);
		_this.state = {embed_data: _this.defaultData(), error: {}};
		return _this;
	}

	VideoBlock.prototype.defaultData = function defaultData() {
		var existing_data = this.props.block.getData().toJS();
		return existing_data.embed_data || {};
	};

	// will update block state


	VideoBlock.prototype.updateData = function updateData() {
		var _props = this.props,
			block = _props.block,
			blockProps = _props.blockProps;
		var _props$blockProps = this.props.blockProps,
			getEditorState = _props$blockProps.getEditorState,
			setEditorState = _props$blockProps.setEditorState;

		var data = block.getData();
		var newData = data.merge(this.state);
		return setEditorState(updateDataOfBlock(getEditorState(), block, newData));
	};

	VideoBlock.prototype.dataForUpdate = function dataForUpdate() {
		return this.props.blockProps.data.toJS();
	};

	VideoBlock.prototype.componentDidMount = function componentDidMount() {
		var _this2 = this;

		if (!this.props.blockProps.data) {
			return;
		}
		// ensure data isnt already loaded
		if (!this.dataForUpdate().endpoint && !this.dataForUpdate().provisory_text) {
			return;
		}
		return $.getJSON('https://noembed.com/embed?width=640&height=480',
			{'format': 'json', 'url': '' + this.dataForUpdate().provisory_text}, data => {
				if (data.error) {
					NotificationService.notifyError(I18n.t('wysiwyg_editor_labels.video_embedding_error'));
					return _this2.setState({embed_data: _this2.defaultData()} //JSON.parse(data.responseText)
						, _this2.updateData);
				}
				data.width = 640;
				data.height = 480;
				data.thumbnail_width = 480;
				data.thumbnail_height = 360;
				this.dataForUpdate().provisory_text = '';
				data.url = '';
				return _this2.setState({embed_data: data} //JSON.parse(data.responseText)
					, _this2.updateData);
			}, err => {
				NotificationService.notifyError(I18n.t('wysiwyg_editor_labels.video_embedding_error'));
				return  _this2.setState({error: err}); //JSON.parse(data.responseText)
			});
		//   return axios({
		//     method: 'get',
		//     url: '' + this.dataForUpdate().endpoint + this.dataForUpdate().provisory_text
		//   }).then(function (result) {
		//     console.log(result);
		//     return _this2.setState({ embed_data: result.data } //JSON.parse(data.responseText)
		//     , _this2.updateData);
		//   })['catch'](function (error) {
		//     return console.log("TODO: error", error);
		//   });
	};

	VideoBlock.prototype.classForImage = function classForImage() {
		if (this.state.embed_data.thumbnail_url) {
			return '';
		} else {
			return 'mixtapeImage--empty u-ignoreBlock';
		}
	};

	VideoBlock.prototype._onClickHandler = function _onClickHandler() {
		const e = $.Event('keydown', {keyCode: 38});
		$('#proxiad-extranet-app').trigger(e);
		$('#proxiad-extranet-app').trigger(e);
	};

	VideoBlock.prototype.render = function render() {
		return React.createElement(
			'figure',
			{className: 'graf--figure graf--iframe graf--first', tabIndex: '0'},
			React.createElement('div', {className: 'iframeContainer',
			  dangerouslySetInnerHTML: {__html: this.state.embed_data.html}}),
			React.createElement(
			  'figcaption',
			  {className: 'imageCaption'},
			  React.createElement(EditorBlock, _Object$assign({}, this.props, {'className': 'imageCaption'}))
			)
		  );
	};

	return VideoBlock;
}(React.Component);

export default VideoBlock;