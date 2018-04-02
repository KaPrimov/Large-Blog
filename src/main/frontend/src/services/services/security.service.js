import jQuery from 'jquery';

export default class SecurityService {

	/**
   * Checks whether the authenticated user - if exists, has access permisions
   * Example: access("hasRole[ivan],hasRole[niki],hasPrivilege[menu:create],hasPrivilege[dashboard:all]")
   */
	static access(authenticatedUser, requiredAuthorities, any) {
		if (!authenticatedUser) {
			return false;
		}
		if (authenticatedUser.authorities[Configuration.Roles.SUPER_ADMIN] !== undefined) {
			return true;
		}

		if (requiredAuthorities === undefined) {
			return true;
		}

		if (any === undefined) {
			any = false;
		}

		let authorities = requiredAuthorities.split(',');
		let hasAccess = false;

		for (let i = 0; i < authorities.length; i++) {
			let authority = authorities[i];
			authority = jQuery.trim(authority);
			let isRole = authority.indexOf('hasRole') > -1;
			if (isRole) {
				let role = this.getArgument(authority);
				let hasRole = this.hasRole(authenticatedUser, role);
				if (any && hasRole) {
					hasAccess = true;
					break;
				} else if (!any && !hasRole) {
					hasAccess = false;
					break;
				} else if (!any && hasRole) {
					hasAccess = true;
				}
			} else {
				let privilegeArgs = this.getArgument(authority).split(':');
				let privilegeName = privilegeArgs[0];
				let privilegeType = privilegeArgs[1];

				if (privilegeName === undefined || privilegeName == null || jQuery.trim(privilegeName) == '' || privilegeType == null) {
					hasAccess = false;
					break;
				}

				let hasPrivilege = this.hasPrivilege(authenticatedUser, privilegeName, privilegeType);
				if (any && hasPrivilege) {
					hasAccess = true;
					break;
				} else if (!any && !hasPrivilege) {
					hasAccess = false;
					break;
				} else if (!any && hasPrivilege) {
					hasAccess = true;
				}
			}
		}

		return hasAccess;
	}

	/**
   * Checks the logged user for specific Role
   */
	static hasRole(authenticatedUser, role) {
		if (!authenticatedUser) {
			return false;
		}

		if (authenticatedUser && authenticatedUser.authorities[Configuration.Roles.SUPER_ADMIN] !== undefined) {
			return true;
		}

		if (role.indexOf('ROLE_') == -1) {
			role = 'ROLE_' + role;
		}

		if (authenticatedUser.authorities.map(a => a.toLowerCase()).indexOf(role.toLowerCase()) === -1) {
			return false;
		}

		return true;
	}

	/**
   * Checks the logged user for specific Privilege
   */
	static hasPrivilege(authenticatedUser, privilegeName, privilegeType) {
		if (!authenticatedUser) {
			return false;
		}

		if (authenticatedUser.authorities[Configuration.Roles.SUPER_ADMIN] !== undefined) {
			return true;
		}

		let privileges = this.buildPrivilege(privilegeName, privilegeType);

		for (let i = 0; i < privileges.length; i++) {
			let privilege = privileges[i];
			if (authenticatedUser.authorities[privilege] === undefined) {
				return false;
			}
		}

		return true;
	}

	/**
   * Build privileges by type and name
   * @param name
   * @param type
   * @returns {Array}
   */
	static buildPrivilege(name, type) {
		let privileges = [];

		switch (type) {
		case 'all':
			privileges.push(name + ':c');
			privileges.push(name + ':r');
			privileges.push(name + ':u');
			privileges.push(name + ':d');
			break;
		case 'create':
			privileges.push(name + ':c');
			break;
		case 'read':
			privileges.push(name + ':r');
			break;
		case 'update':
			privileges.push(name + ':u');
			break;
		case 'delete':
			privileges.push(name + ':d');
			break;
		}

		return privileges;
	}

	/**
    * Helper method, which checks whether should be made new real request to the server
    * for that whether the user is still authenticated or its session is expired
    * @returns {boolean}
    */
	static shouldMakeNewRequestForUser(authenticated, lastCheckedTime) {
		let currentTime = new Date().getTime();
		let SECOND = 1000; // 1000 milliseconds is 1 second
		return (!authenticated || (lastCheckedTime == null || Math.round((currentTime - lastCheckedTime)/ SECOND) >= Configuration.TIME_FOR_REQUEST_FOR_USER_IN_SECONDS));
	}

	/**
    * Helper method, which checks whether should be made new real request to the server
    * for getting new notifications
    * @returns {boolean}
    */
	static shouldMakeNewRequestForNewNotification(authenticated, lastCheckedTime) {
		let currentTime = new Date().getTime();
		let SECOND = 1000; // 1000 milliseconds is 1 second
		return (!authenticated || (lastCheckedTime == null || Math.round((currentTime - lastCheckedTime)/ SECOND) >= Configuration.TIME_FOR_REQUEST_FOR_NOTIFICATION_IN_SECONDS));
	}

	/**
     * Helper method for fetching of argument for 'access' method
     * For example of 'hasRole[ivan]' returns ivan
     * @param authority
     * @returns {string}
     */
	static getArgument(authority) {
		return authority.substring(authority.lastIndexOf('[') + 1, authority.lastIndexOf(']'));
	}
}
