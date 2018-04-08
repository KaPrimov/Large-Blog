package com.kalin.large.core.service.temp;

import com.kalin.large.core.model.temp.TempFileUpload;
import com.kalin.large.core.service.document.DocumentService;
import com.kalin.large.core.service.error.ErrorCode;
import com.kalin.large.core.service.exception.BusinessLogicException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.sql.Timestamp;
import java.util.Date;

@Component
public class TempFileUploadFactoryImpl implements TempFileUploadFactory{

	/*---------------------------------------------------- SERVICES --------------------------------------------------*/

	private final DocumentService documentService;

	@Autowired
	public TempFileUploadFactoryImpl(DocumentService documentService) {
		this.documentService = documentService;
	}

	/*---------------------------------------------------- API --------------------------------------------------*/
	
	/**
	 * @throws BusinessLogicException
	 * @see com.kalin.large.core.service.temp.TempFileUploadFactory#create(org.springframework.web.multipart.MultipartFile, String, String)
	 */
	@Override
	public TempFileUpload create(final MultipartFile file, final String sessionId, final String path) throws BusinessLogicException {
		
		TempFileUpload tempFileUpload  = new TempFileUpload();
		Date currentDate = new Date();
        Timestamp timestamp = new Timestamp(System.currentTimeMillis());
		tempFileUpload.setCreationDate(currentDate);
		tempFileUpload.setSessionId(sessionId);
		tempFileUpload.setMimeType(file.getContentType());
		try {
			String fileName = documentService.generateFileName(String.valueOf(timestamp.getTime()) + file.getOriginalFilename());
			tempFileUpload.setName(fileName + file.getOriginalFilename().substring(file.getOriginalFilename().indexOf(".")));
		} catch (IOException e) {
			throw new BusinessLogicException(ErrorCode.DocumentService.CANT_READ_FILE, "Can't make file's MD5 checksum");
		}
		tempFileUpload.setFilePath(path);
		
		return tempFileUpload;
	}

}
