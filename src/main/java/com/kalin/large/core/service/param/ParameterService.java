package com.kalin.large.core.service.param;

import com.kalin.large.core.model.param.ParamName;
import com.kalin.large.core.model.param.Parameter;

/**
 * Parameter services access the {@link Parameter} entity
 *
 */
public interface ParameterService {
	
	/**
	 * Get specific parameter as {@link String}
	 * @param paramName {@link ParamName}
	 * @return {@link String} if parameter is not found returns null
	 */
	String getGlobalParamAsString(final ParamName paramName);

	String getGlobalParamAsStringWithDefaultValue(ParamName paramName, String defaultValue);

	/**
	 * The method saves the passed paramValue assigning it to the given {@link ParamName}
	 * @param paramName
	 * @param paramValue
	 */
	void updateParamValue(final ParamName paramName, final String paramValue);

}
