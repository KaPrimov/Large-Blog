import { Dante, DanteEditor } from './es/index';
import { Map, fromJS } from 'immutable';
import DanteImagePopover from './es/components/popovers/image.js';
import DanteAnchorPopover from './es/components/popovers/link.js';
import DanteInlineTooltip from './es/components/popovers/addButton.js';
import DanteTooltip from './es/components/popovers/toolTip.js';
import ImageBlock from './es/components/blocks/image.js';
import EmbedBlock from './es/components/blocks/embed.js';
import VideoBlock from './es/components/blocks/video.js';
import PlaceholderBlock from './es/components/blocks/placeholder.js';
import { I18n } from 'react-redux-i18n';
import {addNewBlockAt, resetBlockWithType} from './es/model/index';

function defaultOptions(readOnly, saveHandler, deleteHandler, isTooltipHidden, show_headings, body_placeholder, availableMetadata) {
    // default options
    let options = {};

    let defaultOptions = {};
    defaultOptions.el = 'app';
    defaultOptions.content = '';
    defaultOptions.read_only = readOnly;
    defaultOptions.spellcheck = false;
    defaultOptions.title_placeholder = I18n.t('wysiwyg_editor_labels.body_title');
    defaultOptions.body_placeholder = body_placeholder;
    defaultOptions.show_headings = show_headings;
    defaultOptions.available_metadata = availableMetadata;

    defaultOptions.widgets = [
        {
            title: I18n.t('wysiwyg_editor_labels.add_image'),
            icon: 'image',
            type: 'image',
            block: ImageBlock,
            editable: true,
            renderable: true,
            breakOnContinuous: true,
            wrapper_class: "graf graf--figure",
            selected_class: "is-selected is-mediaFocused",
            selectedFn: block => {
                const { direction } = block.getData().toJS()
                switch (direction) {
                    case "left":
                        return "graf--layoutOutsetLeft"
                    case "center":
                        return ""
                    case "wide":
                        return "sectionLayout--fullWidth"
                    case "fill":
                        return "graf--layoutFillWidth"
                }
            },
            handleEnterWithoutText(ctx, block) {
                const { editorState } = ctx.state
                return ctx.onChange(addNewBlockAt(editorState, block.getKey()))
            },
            handleEnterWithText(ctx, block) {
                const { editorState } = ctx.state
                return ctx.onChange(addNewBlockAt(editorState, block.getKey()))
            },
            widget_options: {
                displayOnInlineTooltip: true,
                insertion: "upload",
                insert_block: "image"
            },
            options: {
                upload_url: 'api/temp',
                upload_headers: options.upload_headers,
                upload_formName: options.upload_formName,
                upload_callback: options.image_upload_callback,
                image_delete_callback: deleteHandler,
                image_caption_placeholder: options.image_caption_placeholder,
                upload_handler: options.upload_handler,
            }
        }, {
            icon: 'embed',
            title: I18n.t('wysiwyg_editor_labels.add_link'),
            type: 'embed',
            block: EmbedBlock,
            editable: true,
            renderable: true,
            breakOnContinuous: true,
            wrapper_class: "graf graf--figure",
            selected_class: "is-selected is-mediaFocused",
            widget_options: {
                displayOnInlineTooltip: true,
                insertion: "placeholder",
                insert_block: "embed"
            },
            options: {
                endpoint: `https://noembed.com/embed?width=640&height=480`,
                placeholder: I18n.t('wysiwyg_editor_labels.add_link_placeholder')
            },
            handleEnterWithoutText(ctx, block) {
                const { editorState } = ctx.state
                return ctx.onChange(addNewBlockAt(editorState, block.getKey()))
            },
            handleEnterWithText(ctx, block) {
                const { editorState } = ctx.state
                return ctx.onChange(addNewBlockAt(editorState, block.getKey()))
            }
        }, {
            icon: 'video',
            title: I18n.t('wysiwyg_editor_labels.add_video'),
            editable: true,
            type: 'video',
            block: VideoBlock,
            renderable: true,
            breakOnContinuous: true,
            wrapper_class: "graf--figure graf--iframe",
            selected_class: " is-selected is-mediaFocused",
            widget_options: {
                displayOnInlineTooltip: true,
                insertion: "placeholder",
                insert_block: "video"
            },
            options: {
                endpoint: `https://noembed.com/embed?width=640&height=480`,
                placeholder: I18n.t('wysiwyg_editor_labels.add_video_placeholder'),
                caption: I18n.t('wysiwyg_editor_labels.add_video_caption')
            },

            handleEnterWithoutText(ctx, block) {
                const { editorState } = ctx.state
                return ctx.onChange(addNewBlockAt(editorState, block.getKey()))
            },

            handleEnterWithText(ctx, block) {
                const { editorState } = ctx.state
                return ctx.onChange(addNewBlockAt(editorState, block.getKey()))
            }
        }, {
            renderable: true,
            editable: true,
            block: PlaceholderBlock,
            type: 'placeholder',
            wrapper_class: "is-embedable",
            selected_class: " is-selected is-mediaFocused",
            widget_options: {
                displayOnInlineTooltip: false
            },
            handleEnterWithText(ctx, block) {
                const { editorState } = ctx.state
                const data = {
                    provisory_text: block.getText(),
                    endpoint: block.getData().get('endpoint'),
                    type: block.getData().get('type')
                }

                return ctx.onChange(resetBlockWithType(editorState, data.type, data))
            }
        }
    ];

    defaultOptions.tooltips = [{
        ref: 'insert_tooltip',
        component: DanteTooltip,
        displayOnSelection: true,
        selectionElements: [
            "unstyled",
            "blockquote",
            "ordered-list",
            "unordered-list",
            "unordered-list-item",
            "ordered-list-item",
            "code-block",
            'header-one',
            'header-two',
            'header-three',
            'header-four'],
        widget_options: {
            block_types: [
                // {label: 'p', style: 'unstyled'},
                { label: 'h2', style: 'header-one', type: "block" },
                { label: 'h3', style: 'header-two', type: "block" },
                { label: 'h4', style: 'header-three', type: "block" },
                { label: 'blockquote', style: 'blockquote', type: "block" },
                { label: 'insertunorderedlist', style: 'unordered-list-item', type: "block" },
                { label: 'insertorderedlist', style: 'ordered-list-item', type: "block" },
                { label: 'code', style: 'code-block', type: "block" },
                { label: 'bold', style: 'BOLD', type: "inline" },
                { label: 'italic', style: 'ITALIC', type: "inline" }]
        }
    }, {
        ref: 'add_tooltip',
        component: DanteInlineTooltip,
        isTooltipHidden: isTooltipHidden
    }, {
        ref: 'anchor_popover',
        component: DanteAnchorPopover
    }
    // , {
    //     ref: 'image_popover',
    //     component: DanteImagePopover
    // }
]

    /** Lifecycle hooks */
    // defaultOptions.xhr = {
    //     before_handler: beforeHandler,
    //     success_handler: successHandler,
    //     error_handler: errorHandler
    // }

    defaultOptions.data_storage = {
        /** */
        save_handler: saveHandler,
        url: '',
        method: "POST",
        success_handler: null,
        failure_handler: null,
        interval: 1500
    }

    defaultOptions.default_wrappers = [
        { className: 'graf--p', block: 'unstyled' },
        { className: 'graf--h2', block: 'header-one' },
        { className: 'graf--h3', block: 'header-two' },
        { className: 'graf--h4', block: 'header-three' },
        { className: 'graf--blockquote', block: 'blockquote' },
        { className: 'graf--insertunorderedlist', block: 'unordered-list-item' },
        { className: 'graf--insertorderedlist', block: 'ordered-list-item' },
        { className: 'graf--code', block: 'code-block' },
        { className: 'graf--bold', block: 'BOLD' },
        { className: 'graf--italic', block: 'ITALIC' }]

    defaultOptions.continuousBlocks = [
        "unstyled",
        "blockquote",
        "ordered-list",
        "unordered-list",
        "unordered-list-item",
        "ordered-list-item",
        "code-block"
    ];

    defaultOptions.key_commands = {
        "alt-shift": [{ key: 65, cmd: 'add-new-block' }],
        "alt-cmd": [{ key: 49, cmd: 'toggle_block:header-one' },
        { key: 50, cmd: 'toggle_block:header-two' },
        { key: 53, cmd: 'toggle_block:blockquote' }],
        "cmd": [{ key: 66, cmd: 'toggle_inline:BOLD' },
        { key: 73, cmd: 'toggle_inline:ITALIC' },
        { key: 75, cmd: 'insert:link' }]
    };

    defaultOptions.character_convert_mapping = {
        '> ': "blockquote",
        '*.': "unordered-list-item",
        '* ': "unordered-list-item",
        '- ': "unordered-list-item",
        '1.': "ordered-list-item",
        '# ': 'header-one',
        '##': 'header-two',
        '==': "unstyled",
        '` ': "code-block"
    };

    return defaultOptions;
}

module.exports = defaultOptions;