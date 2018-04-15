package com.kalin.large.core.model.param;

/**
 * Declaration of all parameters
 *
 */
public enum ParamName {
	/** Large repository path **/
	LARGE_REPO_PATH("LARGE_REPO_PATH"),
	
	/** Directory with people's data **/
	PEOPLE_DATA_PATH("PEOPLE_DATA_PATH"),

	/** Directory for storage of temp files*/
	TEMP_FILE_PATH("TEMP_FILE_PATH"),

	/** Directory for storage of temp files*/
	NEWS_DATA_PATH("NEWS_DATA_PATH");

	private String paramName;
	
	private ParamName(final String paramName) {
		this.paramName = paramName;
	}

	/**
	 * @return the {@link String} value of paramName
	 */
	public String getValue() {
		return paramName;
	}
}
