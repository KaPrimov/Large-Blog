import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _possibleConstructorReturn from 'babel-runtime/helpers/possibleConstructorReturn';
import _inherits from 'babel-runtime/helpers/inherits';
import _Object$assign from 'babel-runtime/core-js/object/assign';
import NotificationService from '../../../../../../services/services/notification.service';
import {I18n} from 'react-redux-i18n';

import React from 'react';
import ReactDOM from 'react-dom';

import {Entity, RichUtils, AtomicBlockUtils, EditorBlock} from 'draft-js';


import {updateDataOfBlock} from '../../model/index.js';

var EmbedBlock = function (_React$Component) {
	_inherits(EmbedBlock, _React$Component);

	function EmbedBlock(props) {
		_classCallCheck(this, EmbedBlock);

		//api_key = "86c28a410a104c8bb58848733c82f840"

		var _this = _possibleConstructorReturn(this, _React$Component.call(this, props));

		_this.updateData = _this.updateData.bind(_this);
		_this.dataForUpdate = _this.dataForUpdate.bind(_this);
		_this.componentDidMount = _this.componentDidMount.bind(_this);
		_this.state = {
			embed_data: _this.defaultData(),
			error: ''
		};
		return _this;
	}

	EmbedBlock.prototype.defaultData = function defaultData() {
		var existing_data = this.props.block.getData().toJS();
		return existing_data.embed_data || {};
	};

	// will update block state


	EmbedBlock.prototype.updateData = function updateData() {
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

	EmbedBlock.prototype.dataForUpdate = function dataForUpdate() {

		return this.props.blockProps.data.toJS();
	};

	EmbedBlock.prototype.componentDidMount = function componentDidMount() {
		var _this2 = this;

		if (!this.props.blockProps.data) {
			return;
		}

		// ensure data isnt already loaded
		// unless @dataForUpdate().endpoint or @dataForUpdate().provisory_text

		if (!this.dataForUpdate().endpoint && !this.dataForUpdate().provisory_text) {
			//debugger
			return;
		}
		return $.getJSON('https://noembed.com/embed',
			{'format': 'json', 'url': '' + this.dataForUpdate().provisory_text}, data => {
				data.width = 640;
				data.height = 480;
				data.thumbnail_width = 480;
				data.thumbnail_height = 360;
				if (data.error) {
					NotificationService.notifyError(I18n.t('wysiwyg_editor_labels.embedding_error'));
					return _this2.setState({embed_data: _this2.defaultData()} //JSON.parse(data.responseText)
						, _this2.updateData);
				}
				return _this2.setState({embed_data: data} //JSON.parse(data.responseText)
					, _this2.updateData);
			}, err => {
				NotificationService.notifyError(I18n.t('wysiwyg_editor_labels.embedding_error'));
				return  _this2.setState({error: err}); //JSON.parse(data.responseText)
			});    
		// return axios({
		//   method: 'get',
		//   url: '' + this.dataForUpdate().endpoint + this.dataForUpdate().provisory_text + '&scheme=https'
		// }).then(function (result) {

		//   return _this2.setState({ embed_data: result.data } //JSON.parse(data.responseText)
		//   , _this2.updateData);
		// })['catch'](function (error) {

		//   _this2.setState({
		//     error: error.response.data.error_message });
		//   return console.log("TODO: error");
		// });
	};

	EmbedBlock.prototype.classForImage = function classForImage() {
		if (this.state.embed_data.images) {
			return '';
		} else {
			return 'mixtapeImage--empty u-ignoreBlock';
		}
	};
	//if @state.embed_data.thumbnail_url then "" else "mixtapeImage--empty u-ignoreBlock"

	EmbedBlock.prototype.picture = function picture() {
		if (this.state.embed_data.images && this.state.embed_data.images.length > 0) {
			return this.state.embed_data.images[0].url;
		} else {
			return '';
		}
	};

	EmbedBlock.prototype.render = function render() {
		this.props.block.set('text', 'Pesho');
		//block = @.props
		//foo = @.props.blockProps
		//data = Entity.get(block.block.getEntityAt(0)).getData()
		// if (this.state.error !== {}) {
		// 	return null;
		// }
		return React.createElement(
			'figure',
			{className: 'graf--figure graf--iframe graf--first', tabIndex: '0'},
			React.createElement('div', {className: 'embedContainer',
				dangerouslySetInnerHTML: {__html: this.state.embed_data.html}}),
			React.createElement(
				'figcaption',
				{className: 'imageCaption'},
				React.createElement(EditorBlock, _Object$assign({}, this.props, {'className': 'imageCaption'}))
			)
		);
	};

	return EmbedBlock;
}(React.Component);

export default EmbedBlock;