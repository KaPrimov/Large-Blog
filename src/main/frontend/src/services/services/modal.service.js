import jQuery from "jquery";
import {I18n} from 'react-redux-i18n';


export class ModalService {
  /**
     * Shows confirm dialog, where user will confirm or not some question
     * @param body the content of the confirm modal
     * @param title Title of the confirmation
     * @param modalEffects Adding the effect due visualization
     * @returns {Observable<string>} the input or <code>null</code> if there isn't such ones
     */
    static showConfirm(body, title = null, modalEffects = ModalEffects.FADE_IN_AND_SCALE) {
        let modalContent = ModalHTMLStructureBuilder
            .createInstance()
            .setHeader(title)
            .setBody(body)
            .setModalEffects(modalEffects)
            .setButtonsType(ModalButtonsType.AGREE_DISAGREE)
            .build();

        let result = jQuery.Deferred();

        jQuery('body').append(modalContent);
        jQuery('body').append('<div class="md-overlay"></div>');

        setTimeout(() => {
            jQuery('#modal').addClass('md-show');
            jQuery(document.documentElement).addClass('md-perspective')
        }, 50);

        jQuery('.md-overlay, #modal .md-close').one('click', (event) => {
            jQuery('#modal').removeClass('md-show');
            if (jQuery('#modal').hasClass('md-setperspective')) {
                jQuery(document.documentElement).removeClass('md-perspective');
            }
            jQuery('html').removeClass('md-perspective');

            setTimeout(() => {
                jQuery('.md-overlay').remove();
                jQuery('#modal').remove();

                if (jQuery(event.target).hasClass('close-agree')) {
                    result.resolve(true);
                } else {
                    result.resolve(false);
                }
            }, 50);
        });

        return result.promise();
    }

    /**
     * Shows dynamically alert
     * @param body Adding body of the alert
     * @param title Adding title of the alert. It is <code><b>optional</b></code>
     * @param modalEffects Adding the effect due visualization
     * @returns {Observable<boolean>}
     */
    static showAlert(body, title = null, modalEffects = ModalEffects.FADE_IN_AND_SCALE) {
        let modalContent = ModalHTMLStructureBuilder
            .createInstance()
            .setHeader(title)
            .setBody(body)
            .setModalEffects(modalEffects)
            .setButtonsType(ModalButtonsType.OK)
            .build();

        let result = jQuery.Deferred();

        jQuery('body').append(modalContent);
        jQuery('title').addClass('error_title');
        jQuery('body').append('<div class="md-overlay"></div>');

        setTimeout(() => {
            jQuery('#modal').addClass('md-show');
            jQuery(document.documentElement).addClass('md-perspective');
        }, 50);

        setTimeout(()=> {
          document.getElementById('yes-btn').focus();
          jQuery('#yes-btn').keydown(function (e) {
            if (e.keyCode == 13) {
              $('.md-close.yes').click();
            }
          });
        }, 200);

        jQuery('.md-overlay, #modal .md-close').one('click', (event) => {
            jQuery('#modal').removeClass('md-show');
            jQuery('#yes-btn').off('keydown');

            if (jQuery('#modal').hasClass('md-setperspective')) {
                jQuery(document.documentElement).removeClass('md-perspective');
            }

            jQuery('html').removeClass('md-perspective');

            setTimeout(() => {
                jQuery('.md-overlay').remove();
                jQuery('#modal').remove();

                if (jQuery(event.target).hasClass('close-ok')) {
                    result.resolve(true);
                } else {
                  result.resolve(false);
                }
            }, 50);
        });

        return result.promise();
    }

    /**
     * Shows dynamically alert which can only be close by clicking Ok
     * @param body Adding body of the alert
     * @param title Adding title of the alert. It is <code><b>optional</b></code>
     * @param modalEffects Adding the effect due visualization
     * @returns {Observable<boolean>}
     */
    static showAlertNoClosing(body, title = null, modalEffects = ModalEffects.FADE_IN_AND_SCALE) {
        let modalContent = ModalHTMLStructureBuilder
            .createInstance()
            .setHeader(title)
            .setBody(body)
            .setModalEffects(modalEffects)
            .setButtonsType(ModalButtonsType.OK)
            .build();

        let result = jQuery.Deferred();

        jQuery('body').append(modalContent);
        jQuery('body').append('<div class="md-overlay"></div>');

        setTimeout(() => {
            jQuery('#modal').addClass('md-show');
            jQuery(document.documentElement).addClass('md-perspective')
        }, 50);

        setTimeout(()=> {
          document.getElementById('yes-btn').focus();
          jQuery('#yes-btn').keydown(function (e) {
            if (e.keyCode == 13) {
              $('.md-close.yes').click();
            }
          });
        }, 200);

        jQuery('.md-close').one('click', (event) => {
            jQuery('#modal').removeClass('md-show');
            if (jQuery('#modal').hasClass('md-setperspective')) {
                jQuery(document.documentElement).removeClass('md-perspective');
            }

            jQuery('#yes-btn').off('keydown');

            jQuery('html').removeClass('md-perspective');

            setTimeout(() => {
                jQuery('.md-overlay').remove();
                jQuery('#modal').remove();

                if (jQuery(event.target).hasClass('close-ok')) {
                    result.resolve(true);
                } else {
                  result.resolve(false);
                }
            }, 50);
        });

        return result.promise();
    }

    /**
     * Removes the current modal if there is one
     */
    static removeExistingAlert() {
      jQuery('#modal').removeClass('md-show');

      jQuery('html').removeClass('md-perspective');

      setTimeout(() => jQuery('#modal').remove() , 50);
    }

    /**
     * Shows prompt dialog, where user can enter some data
     * @param title Title of the confirmation
     * @param typeInput {@link TypeInput} Determination, whether the field should be text or password
     * @param noteText <code><b>optional</b></code> additional text above the field for confirmation if want to note something
     * @param modalEffects Adding the effect due visualization
     * @returns {Observable<string>} the input or <code>null</code> if there isn't such ones
     */
    static showPrompt(title, typeInput = TypeInput.TEXT, noteText, modalEffects = ModalEffects.FADE_IN_AND_SCALE) {
        let body = '';
        if (noteText) {
            body += '<p>' + noteText + '</p>';
        }
        if (typeInput == TypeInput.TEXT) {
            body += '<input type="text" class="btn-ocustom input-padding" id="prompt-value">';
        } else if (typeInput == TypeInput.PASSWORD) {
            body += '<input type="password" class="btn-ocustom input-padding" id="prompt-value">';
        }

        let modalContent = ModalHTMLStructureBuilder
            .createInstance()
            .setHeader(title)
            .setBody(body, 'text-xs-center')
            .setModalEffects(modalEffects)
            .setButtonsType(ModalButtonsType.CONFIRM_CANCEL)
            .build();

        let result = jQuery.Deferred();

        jQuery('body').append(modalContent);
        jQuery('body').append('<div class="md-overlay"></div>');

        setTimeout(() => {
            jQuery('#modal').addClass('md-show');
            jQuery(document.documentElement).addClass('md-perspective')
        }, 50);

        jQuery('.md-overlay, #modal .md-close').one('click', (event) => {
            jQuery('#modal').removeClass('md-show');
            if (jQuery('#modal').hasClass('md-setperspective')) {
                jQuery(document.documentElement).removeClass('md-perspective');
            }

            jQuery('html').removeClass('md-perspective');

            setTimeout(() => {
                if (jQuery(event.target).hasClass('close-confirm')) {
                    let value = jQuery('#prompt-value').val();
                    result.resolve(value == '' ? null : value);
                } else {
                    result.resolve(null);
                }

                jQuery('.md-overlay').remove();
                jQuery('#modal').remove();
            }, 50);
        });

        return result.promise();
    }

     /**
     * Shows dialog with two options and returns as string the one, which is chosen from the user
     * @param body The content of the options modal
     * @param title Title of the modal
     * @param firstOption Text of the first option
     * @param secondOption Text of the second option
     * @param modalEffects Adding the effect due visualization
     * @returns {Observable<string>} the input or <code>null</code> if there isn't such ones
     */
    static showOptionsModal(body, title = null, firstOption, secondOption, firstButtonUrl, secondButtonUrl, modalEffects = ModalEffects.FADE_IN_AND_SCALE) {
        let modalContent = ModalHTMLStructureBuilder
            .createInstance()
            .setHeader(title)
            .setBody(body)
            .setModalEffects(modalEffects)
            .setButtonsType(ModalButtonsType.OPTION_LINK_BUTTONS, firstOption, secondOption, firstButtonUrl, secondButtonUrl)
            .build();

        let result = jQuery.Deferred();

        jQuery('body').append(modalContent);
        jQuery('body').append('<div class="md-overlay"></div>');

        setTimeout(() => {
            jQuery('#modal').addClass('md-show');
            jQuery(document.documentElement).addClass('md-perspective')
        }, 50);

        jQuery('.md-overlay, #modal .md-close').on('click', (event) => {
            jQuery('#modal').removeClass('md-show');
            if (jQuery('#modal').hasClass('md-setperspective')) {
                jQuery(document.documentElement).removeClass('md-perspective');
            }
            jQuery('html').removeClass('md-perspective');

            setTimeout(() => {
                jQuery('.md-overlay').remove();
                jQuery('#modal').remove();

            }, 100);
            this.removeExistingAlert();
        });

        return result.promise();
    }
}

export const ModalEffects = {
    FADE_IN_AND_SCALE : 1,
    SLIDE_IN_RIGHT : 2,
    SLINE_IN_BOTTOM : 3,
    NEWSPAPER : 4,
    FALL : 5,
    SIDE_FALL : 6,
    STICKY_UP : 7,
    THREE_D_FLIP_HORIZONTAL : 8,
    THREE_D_FLIP_VERTICAL : 9,
    THREE_D_SIGN : 10,
    SUPER_SCALED : 11,
    JUST_ME : 12,
    THREE_D_SLIT : 13,
    THREE_D_ROTATE_BOTTOM : 14,
    THREE_D_ROTATE_IN_LEFT : 15,
    BLUR : 16,
    LET_ME_IN : 17,
    MAKE_WAY : 18,
    SLIP_FROM_TOP : 19
}

export const ModalButtonsType = {
    AGREE_DISAGREE : 1,
    OK : 2,
    CONFIRM_CANCEL : 3
}

export const ModalType  = {
    MODAL : 1,
    MODAL_WITH_FIXED_FOOTER : 2
}

export const TypeInput  = {
    TEXT : 1,
    PASSWORD : 2
}

/**
 * Modal Builder class
 */
class ModalHTMLStructureBuilder {
    constructor() {
      this.title = '';
      this.body = null;
      this.modalType = ModalType.MODAL;
      this.buttonsHtml = '';
      this.modalEffects= "fade-in-and-scale";
    }

    static createInstance() {
      return new ModalHTMLStructureBuilder();
    }

    setBody(body, cssClasses= '') {
        if (body != null && body != '') {
            this.body = `<article class="${cssClasses}">${body}</article>`;
        }
        return this;
    }

    setHeader(title) {
        if (title != null && title != '') {
            this.title = `${title}`;
        }
        return this;
    }

    setModalEffects(modalEffect) {
        switch (modalEffect) {
            case ModalEffects.FADE_IN_AND_SCALE:
                this.modalEffects = "fade-in-and-scale";
                break;
            case ModalEffects.SLIDE_IN_RIGHT:
                this.modalEffects = "slide-in-right";
                break;
            case ModalEffects.SLINE_IN_BOTTOM:
                this.modalEffects = "slide-in-bottom";
                break;
            case ModalEffects.NEWSPAPER:
                this.modalEffects = "newspaper";
                break;
            case ModalEffects.FALL:
                this.modalEffects = "fall";
                break;
            case ModalEffects.SIDE_FALL:
                this.modalEffects = "side-fall";
                break;
            case ModalEffects.STICKY_UP:
                this.modalEffects = "sticky-up";
                break;
            case ModalEffects.THREE_D_FLIP_HORIZONTAL:
                this.modalEffects = "three-d-flip-horizontal";
                break;
            case ModalEffects.THREE_D_FLIP_VERTICAL:
                this.modalEffects = "three-d-flip-vertical";
                break;
            case ModalEffects.THREE_D_SIGN:
                this.modalEffects = "three-d-sign";
                break;
            case ModalEffects.SUPER_SCALED:
                this.modalEffects = "super-scaled";
                break;
            case ModalEffects.JUST_ME:
                this.modalEffects = "just-me";
                break;
            case ModalEffects.THREE_D_SLIT:
                this.modalEffects = "three-d-slit";
                break;
            case ModalEffects.THREE_D_ROTATE_BOTTOM:
                this.modalEffects = "three-d-rotate-bottom";
                break;
            case ModalEffects.THREE_D_ROTATE_IN_LEFT:
                this.modalEffects = "three-d-rotate-left";
                break;
            case ModalEffects.BLUR:
                this.modalEffects = "blur";
                break;
            case ModalEffects.LET_ME_IN:
                this.modalEffects = "let-me-in";
                break;
            case ModalEffects.MAKE_WAY:
                this.modalEffects = "make-way";
                break;
            case ModalEffects.SLIP_FROM_TOP:
                this.modalEffects = "slip-from-top";
                break;
            default:
                this.modalEffects = "fade-in-and-scale";
        }

        return this;
    }

    setButtonsType(buttonsType, firstButtonOption = '', secondButtonOption = '', firstOptionUrl = '', secondOptionUrl = '') {

        switch (buttonsType) {
            case ModalButtonsType.AGREE_DISAGREE:
                this.buttonsHtml += `<button id="yes-btn" class="md-close yes btn btn-ocustom btn-sm btn-outline-secondary close-agree">${I18n.t("common.btn.yes")}</button>`;
                this.buttonsHtml += `<button class="md-close btn btn-ocustom btn-sm btn-outline-secondary close-disagree">${I18n.t("common.btn.no")}</button>`;
                break;
            case ModalButtonsType.CONFIRM_CANCEL:
                this.buttonsHtml += `<button id="yes-btn" class="md-close yes btn btn-ocustom btn-sm btn-outline-secondary close-confirm">${I18n.t("common.btn.save")}</button>`;
                this.buttonsHtml += `<button class="md-close btn btn-ocustom btn-sm btn-outline-secondary close-cancel">${I18n.t("common.btn.cancel")}</button>`;
                break;
            case ModalButtonsType.OPTION_LINK_BUTTONS:
                this.buttonsHtml += `<a href="${firstOptionUrl}" target="_blank" class="md-close btn btn-ocustom btn-sm btn-outline-secondary close-cancel" >${firstButtonOption}</a>`
                this.buttonsHtml += `<a href="${secondOptionUrl}" target="_blank" class="md-close btn btn-ocustom btn-sm btn-outline-secondary close-cancel" >${secondButtonOption}</a>`
                break;
            default:
                this.buttonsHtml += `<button id="yes-btn" class="md-close yes btn btn-ocustom btn-sm btn-outline-secondary close-ok">${I18n.t("common.btn.ok")}</button>`;
        }

        return this;
    }

    setTypeModal(modalType) {
        this.modalType = modalType;
        return this;
    }

    build(){
        let modalStructure = '';

        modalStructure += `<div id="modal" class="md-modal ${this.modalEffects}">`;
        modalStructure += `<div class="md-content">`;
        if (this.title != null && this.title != '') {
            modalStructure += `<h3>${this.title}</h3>`;
        }
        modalStructure += `<div>${this.body}</div>`;
        modalStructure += '<div class="md-footer text-xs-center">';

        modalStructure += this.buttonsHtml;

        modalStructure += '</div></div></div>';

        return modalStructure;
    }
}
