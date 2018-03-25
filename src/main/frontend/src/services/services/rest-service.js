import jQuery from 'jquery';
import cookie from 'react-cookie';
import * as constants from './constants';

/**
 * RestService
 */
export default class RestService {
	static get(url, headers = {}, contentType = 'application/json') {
		return jQuery.ajax({
			type: 'GET',
			url: `${constants.SERVER_PATH}${url}`,
			headers: headers,
			contentType: contentType
		});
	}

	static put(url, data = null, headers = {}, contentType = 'application/json') {
		return jQuery.ajax({
			type: 'PUT',
			url: `${constants.SERVER_PATH}${url}`,
			beforeSend: function(request) {
				request.setRequestHeader('X-XSRF-TOKEN', cookie.load('XSRF-TOKEN'));
			},
			data: JSON.stringify(data),
			headers: headers,
			contentType: contentType
		});
	}

	static post(url, data = null, headers = {}, contentType = 'application/json') {
		return jQuery.ajax({
			type: 'POST',
			url: `${constants.SERVER_PATH}${url}`,
			beforeSend: function(request) {
				request.setRequestHeader('X-XSRF-TOKEN', cookie.load('XSRF-TOKEN'));
			},
			data: JSON.stringify(data),
			headers: headers,
			contentType: contentType
		});
	}

	static delete(url, headers = {}, contentType = 'application/json', data = null) {
		return jQuery.ajax({
			type: 'DELETE',
			url: `${constants.SERVER_PATH}${url}`,
			beforeSend: function(request) {
				request.setRequestHeader('X-XSRF-TOKEN', cookie.load('XSRF-TOKEN'));
			},
			data: JSON.stringify(data),
			headers: headers,
			contentType: contentType
		});
	}

	static postWithCustomProperties(url, data = null, properties = {}, contentType = 'application/json', headers = {} ) {
		return jQuery.ajax({
			type: 'POST',
			url: `${constants.SERVER_PATH}${url}`,
			beforeSend: function(request) {
				request.setRequestHeader('X-XSRF-TOKEN', cookie.load('XSRF-TOKEN'));
			},
			data: data,
			file: data,
			headers: headers,
			contentType: contentType,
			...properties
		});
	}
}