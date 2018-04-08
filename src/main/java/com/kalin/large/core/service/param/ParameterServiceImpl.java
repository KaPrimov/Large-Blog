package com.kalin.large.core.service.param;

import com.kalin.large.core.model.param.ParamName;
import com.kalin.large.core.model.param.Parameter;
import com.kalin.large.core.repository.param.ParameterRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 * Parameter services access the {@link Parameter} entity
 *
 */
@Service
public class ParameterServiceImpl implements ParameterService {

	/*-------------------------------------------------- REPOSITORIES ------------------------------------------------*/
	@Autowired
	private ParameterRepository parameterRepository;

	/*------------------------------------------------------ API -----------------------------------------------------*/
	/**
	 * @see com.kalin.large.core.service.param.ParameterService#getGlobalParamAsString(ParamName)
	 */
	@Override
	public String getGlobalParamAsString(final ParamName paramName) {
		return getGlobalParamAsStringWithDefaultValue(paramName, null);
	}

	/**
	 * @see com.kalin.large.core.service.param.ParameterService#getGlobalParamAsStringWithDefaultValue(ParamName, String)
	 */
	@Override
	public String getGlobalParamAsStringWithDefaultValue(final ParamName paramName, final String defaultValue) {
		Parameter parameter = parameterRepository.findFirstByName(paramName.getValue());
		return parameter != null ? parameter.getValue() : defaultValue;
	}


	/**
	 * @see com.kalin.large.core.service.param.ParameterService#updateParamValue(ParamName, String)
	 */
	@Override
	public void updateParamValue(final ParamName paramName, final String paramValue) {
		Parameter parameter = parameterRepository.findFirstByName(paramName.getValue());
		
		if(parameter != null){
			parameter.setValue(paramValue);
			parameterRepository.save(parameter);
		}
	}
	
}
