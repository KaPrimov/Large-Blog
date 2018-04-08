package com.kalin.large.core.service.temp;

import com.kalin.large.core.model.article.beans.ArticleFileDTO;
import com.kalin.large.core.model.temp.TempFileUpload;
import com.kalin.large.core.service.exception.BusinessLogicException;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;

/**
 * Temporary File upload business service
 */
public interface TempFileUploadService {

	/**
	 * Clean all temporary files by session id </br>
	 * The clean means, these files will be removed permanently by the file system,</br>
	 * as well as in the DD
	 * @param sessionId {@link String}
	 * @throws BusinessLogicException
	 */
	default void cleanAllTempFilesBySessionId(final String sessionId) throws BusinessLogicException {

	}

	/**
	 * Clean all temporary files older than days parameter </br>
	 * The clean means, these files will be removed permanently by the file system,</br>
	 * as well as in the DB
	 * @param days {@link Integer}
	 * @throws BusinessLogicException
	 */
	void cleanAllTempFilesOlderThan(final int days) throws BusinessLogicException;

	/**
	 * Move temporary uploaded file to destination folder. </br>
	 * After successfully moving to destination folder, the file will be deleted on the file system,
	 * as well as in the DB
	 * @param destinationFolder The specific destination folder
	 * @param tempFileUploadId The id of specific {@link TempFileUpload}
	 * @return Returns the {@link File} of the new File moved to the destination folder
	 * @throws BusinessLogicException
	 */
	File moveTempFileTo(final File destinationFolder, final Long tempFileUploadId) throws BusinessLogicException;
	
	/**
	 * Upload temporary specific file into the file system, as well into DB. </br>
	 * It must not exceed the allowed size, which if configured</br>
	 * Returns created {@link TempFileUpload}
	 * @param multipartFile {@link MultipartFile}
	 * @param sessionId {@link String}
	 * @return {@link TempFileUpload}
	 */
	TempFileUpload uploadTemporaryFile(final MultipartFile multipartFile, final String sessionId) throws BusinessLogicException;
	
	/**
	 * Finds the name of temporary file and returns it as byte array. </br>
	 * Returns array of {@link byte}s
	 * @param id {@link Long}
	 * @return array of {@link byte}s
	 */
	byte[] getTemporaryFile(final Long id);

	/**
	 * Deletes temporary file from the file system and from the database
	 * @param articleFileDTO {@link ArticleFileDTO}
	 */
	boolean deleteTemporaryFile(ArticleFileDTO articleFileDTO);
}
