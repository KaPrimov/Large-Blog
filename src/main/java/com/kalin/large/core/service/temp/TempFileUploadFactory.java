package com.kalin.large.core.service.temp;

import com.kalin.large.core.model.temp.TempFileUpload;
import com.kalin.large.core.service.exception.BusinessLogicException;
import org.springframework.web.multipart.MultipartFile;

public interface TempFileUploadFactory {

	
	/**
	 * Create {@link TempFileUpload} object from supplied params. 
	 *
	 * @param file {@link MultipartFile}
	 * @param sessionId {@link String}
	 * @param path {@link String}
	 * @return {@link TempFileUpload}
	 * @throws BusinessLogicException
	 */
	TempFileUpload create(final MultipartFile file, final String sessionId, final String path) throws BusinessLogicException;
}
