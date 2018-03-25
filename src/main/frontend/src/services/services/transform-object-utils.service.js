export default class TransformObjectUtils {

	/**
   * Transform the structure of authorities
   */
	static transformAuthorities(authorities) {
		let newAuthorities = [];

		authorities.map(authority => {
			newAuthorities[authority.authority] = authority.authority;
		});

		return newAuthorities;
	}

	/**
	 * I18 label transformer
	 */
	static transform(label) {
		return label.replace(/\./g, '_');
	}
}