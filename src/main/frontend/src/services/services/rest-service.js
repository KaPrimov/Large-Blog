import jQuery from 'jquery';
import cookie from 'react-cookie';

/**
 * RestService
 */
export default class RestService {
	static get(url, headers = {}, contentType = 'application/json') {
		return jQuery.ajax({
			type: 'GET',
			url: `${Configuration.SERVER_PATH}${url}`,
			headers: headers,
			contentType: contentType
		});
	}

	static put(url, data = null, headers = {}, contentType = 'application/json') {
		return jQuery.ajax({
			type: 'PUT',
			url: `${Configuration.SERVER_PATH}${url}`,
			beforeSend: function(request) {
				request.setRequestHeader('X-XSRF-TOKEN', cookie.load(Configuration.X_XSRF_TOKEN_COOKIE_NAME));
			},
			data: JSON.stringify(data),
			headers: headers,
			contentType: contentType
		});
	}

	static post(url, data = null, headers = {}, contentType = 'application/json') {
		return jQuery.ajax({
			type: 'POST',
			url: `${Configuration.SERVER_PATH}${url}`,
			beforeSend: function(request) {
				request.setRequestHeader('X-XSRF-TOKEN', cookie.load(Configuration.X_XSRF_TOKEN_COOKIE_NAME));
			},
			data: JSON.stringify(data),
			headers: headers,
			contentType: contentType
		});
	}

	static delete(url, headers = {}, contentType = 'application/json', data = null) {
		return jQuery.ajax({
			type: 'DELETE',
			url: `${Configuration.SERVER_PATH}${url}`,
			beforeSend: function(request) {
				request.setRequestHeader('X-XSRF-TOKEN', cookie.load(Configuration.X_XSRF_TOKEN_COOKIE_NAME));
			},
			data: JSON.stringify(data),
			headers: headers,
			contentType: contentType
		});
	}

	static postWithCustomProperties(url, data = null, properties = {}, contentType = 'application/json', headers = {} ) {
		return jQuery.ajax({
			type: 'POST',
			url: `${Configuration.SERVER_PATH}${url}`,
			beforeSend: function(request) {
				request.setRequestHeader('X-XSRF-TOKEN', cookie.load(Configuration.X_XSRF_TOKEN_COOKIE_NAME));
			},
			data: data,
			file: data,
			headers: headers,
			contentType: contentType,
			...properties
		});
	}
}