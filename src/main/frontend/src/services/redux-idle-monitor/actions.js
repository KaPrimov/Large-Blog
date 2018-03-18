// import {IDLESTATUS_AWAY, IDLESTATUS_EXPIRED} from './constants';
// import {_authenticationSuccess,_setLastCheckedTime, logout} from '../../actions/security.actions';
// import SecurityAPI from '../../api/security.api';
// import {ModalService} from '..//modal.service';
// import {I18n} from 'react-redux-i18n';
// import {browserHistory} from 'react-router';
// import {actions as idleActions} from './index';
// import AdalService from '..//adal.service';
// import * as ActionTypes from '../../actions/action-types.constants.js';
//
//
// //time returned is in milliseconds
// export const idleStatusDelay = idleStatus => (dispatch, getState) => {
// 	if(idleStatus === IDLESTATUS_AWAY)
// 		return 1200000; //20 mins after action
// 	if(idleStatus === IDLESTATUS_EXPIRED)
// 		return 610000; //10 mins after first notification
// };
//
// export const activeStatusAction = (dispatch, getState) => {};
//
// export const idleStatusAction = idleStatus => (dispatch, getState) => {
//
// 	if(idleStatus === IDLESTATUS_AWAY) {
// 		ModalService.showAlertNoClosing(I18n.t('redux_idle_monitor.first_timer_body') ,I18n.t('redux_idle_monitor.first_timer_title')).then(result => {
//
// 			SecurityAPI.getAuthenticatedUser().then(authenticatedUser => {
// 				dispatch((idleActions.start)());
// 				dispatch(_authenticationSuccess(authenticatedUser));
// 				dispatch(_setLastCheckedTime(new Date().getTime()));
// 			}).fail(() => {
// 				SecurityAPI.logout().then(() => {
// 					awayOKButtonClickOnEndedSessionAction(dispatch);
// 				}).fail(() => {
// 					awayOKButtonClickOnEndedSessionAction(dispatch);
// 				});
// 			});
// 		});
// 	}
//
//
// 	if(idleStatus === IDLESTATUS_EXPIRED) {
// 		SecurityAPI.getAuthenticatedUser().then(authenticatedUser => {
// 			dispatch((idleActions.start)());
// 			dispatch(_authenticationSuccess(authenticatedUser));
// 			dispatch(_setLastCheckedTime(new Date().getTime()));
// 			ModalService.removeExistingAlert();
// 		}).fail(() => {
// 			SecurityAPI.logout().then(() => {
// 				expiredStatusAction(dispatch);
// 			}).fail(() => {
// 				expiredStatusAction(dispatch);
// 			});
// 		});
// 	}
// };
//
// const expiredStatusAction = (dispatch) => {
// 	ModalService.removeExistingAlert();
// 	dispatch({type: ActionTypes.LOGOUT_SUCCESS});
// 	AdalService.logout();
// 	browserHistory.push('/');
// 	dispatch(_setLastCheckedTime(0));
// 	ModalService.showAlertNoClosing(I18n.t('redux_idle_monitor.second_timer_body'), I18n.t('redux_idle_monitor.second_timer_title')).then(result => {   });
// 	dispatch((idleActions.stop)());
// }
//
// const awayOKButtonClickOnEndedSessionAction = (dispatch) => {
// 	dispatch({type: ActionTypes.LOGOUT_SUCCESS});
// 	AdalService.logout();
// 	browserHistory.push('/');
// 	dispatch(_setLastCheckedTime(0));
// 	dispatch((idleActions.stop)());
// }
