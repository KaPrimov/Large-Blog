//import toastr from 'toastr';
import HashTable from './hashtable';
import iziToast from 'izitoast';

export default class NotificationService {

/**
 * Common notify success
 */
	static notifySuccess(text) {
		//toastr.success(text);
		iziToast.success({
			message: text,
			position: 'topRight',
			timeout: 3000
		});
	}

	/**
   * Common notify warning
   */
	static notifyWarning(text) {
		if (hasToShowMessage(text)) {
			//toastr.warning(text);
			iziToast.warning({
				message: text,
				position: 'bottomCenter',
				timeout: 3000
			});
		}
	}

	/**
   * Common notify error
   */
	static notifyError(text) {
		if (hasToShowMessage(text)) {
			//toastr.error(text);
			iziToast.error({
				message: text,
				position: 'bottomCenter',
				timeout: 3000
			});
		}
	}
}

const notifications = new HashTable();
const debugMode = false;
const intervalTimeDeleteAllNotification = 1000;
const expiredTimeForNotificationMessages = 3000;

function hasToShowMessage(message){
	if (checkExistingMessage(message)) {
		if (debugMode) {
			console.log('The message is already added in the Hashmap');
		}
		return false;
	} else {
		if (debugMode) {
			console.log('New message will be added to Hashmap');
		}
		addMessage(message);
		return true;
	}
}

function addMessage(message) {
	let hashCodeMsg = HashTable.getHashCode(message);
	notifications.setItem(hashCodeMsg, Date.now());
	if (debugMode) {
		console.log('New message:' + hashCodeMsg + '  was successfully added to Hashmap');
	}
}

function checkExistingMessage(message) {
	let hashCodeMsg = HashTable.getHashCode(message);
	return notifications.getItem(hashCodeMsg) !== undefined;
}

// Forever
setInterval(() => deleteAllNotifications(intervalTimeDeleteAllNotification), expiredTimeForNotificationMessages);

function deleteAllNotifications(interval) {
	if (debugMode) {
		console.log('in deleteAllNotifications()');
	}
	notifications.each(function(k, v){
		if(Date.now() - v >= interval) {
			notifications.removeItem(k);
			if (debugMode) {
				console.log('A message was removed from Hashmap');
			}
		}
	});
}
