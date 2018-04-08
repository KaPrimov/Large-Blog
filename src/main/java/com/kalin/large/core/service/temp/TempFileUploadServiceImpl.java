package com.kalin.large.core.service.temp;

import com.kalin.large.core.helpers.io.LargeFileUtil;
import com.kalin.large.core.model.article.Article;
import com.kalin.large.core.model.article.beans.ArticleFileDTO;
import com.kalin.large.core.model.param.ParamName;
import com.kalin.large.core.model.temp.TempFileUpload;
import com.kalin.large.core.repository.temp.TempFileUploadRepository;
import com.kalin.large.core.service.error.ErrorCode;
import com.kalin.large.core.service.exception.BusinessLogicException;
import com.kalin.large.core.service.param.ParameterService;
import org.apache.commons.io.IOUtils;
import org.apache.commons.lang3.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.BufferedInputStream;
import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.Calendar;
import java.util.Date;
import java.util.Optional;
import java.util.Set;

/**
 * Service Manager for handling temp files upload and manipulation
 */
@Service
@Transactional
public class TempFileUploadServiceImpl implements TempFileUploadService {

	/*---------------------------------------------------- CONSTANTS --------------------------------------------------*/
	private static final Logger logger = LoggerFactory.getLogger(TempFileUploadServiceImpl.class);
	private static final String DEFAULT_ARTICLE_PHOTO_PIC_RESOURCE_PATH = "static/assets/images/default-photo.png";
	
	/*---------------------------------------------------- SERVICES --------------------------------------------------*/

	private final ParameterService parameterService;
	
	/*---------------------------------------------------- FACTORIES --------------------------------------------------*/
	private final TempFileUploadFactory tempFileUploadFactory;
	
	/*---------------------------------------------------- REPOSITORIES --------------------------------------------------*/
	private final TempFileUploadRepository tempFileUploadRepository;


	/*---------------------------------------------------- API --------------------------------------------------*/
	@Autowired
	public TempFileUploadServiceImpl(ParameterService parameterService, TempFileUploadFactory tempFileUploadFactory, TempFileUploadRepository tempFileUploadRepository) {
		this.parameterService = parameterService;
		this.tempFileUploadFactory = tempFileUploadFactory;
		this.tempFileUploadRepository = tempFileUploadRepository;
	}

	
	/**
	 * @see com.kalin.large.core.service.temp.TempFileUploadService#cleanAllTempFilesBySessionId(String)
	 */
	@Override
	@Transactional
	public void cleanAllTempFilesBySessionId(final String sessionId) throws BusinessLogicException {
		deleteFiles(tempFileUploadRepository.findAllBySessionId(sessionId));
	}

	/**
	 * @see com.kalin.large.core.service.temp.TempFileUploadService#cleanAllTempFilesOlderThan(int)
	 */
	@Override
	@Transactional
	public void cleanAllTempFilesOlderThan(final int days) throws BusinessLogicException {
		Calendar cal = Calendar.getInstance();
		cal.setTime(new Date());
		cal.add(Calendar.DATE, -days);
		deleteFiles(tempFileUploadRepository.findAllByCreationDateBefore(cal.getTime()));
	}

	/**
	 * @see com.kalin.large.core.service.temp.TempFileUploadService#moveTempFileTo(File, Long)
	 */
	@Override
	@Transactional
	public File moveTempFileTo(final File destinationFolder, final Long tempFileUploadId) throws BusinessLogicException {
		Optional<TempFileUpload> tempFileUploadOptional = tempFileUploadRepository.findById(tempFileUploadId);

		if(!tempFileUploadOptional.isPresent()) {
			throw new BusinessLogicException(ErrorCode.TempFileUpload.TEMP_FILE_UPLOAD_NOT_FOUND, "There is no temp file upload with the given id");
		}

		TempFileUpload tempFileUpload = tempFileUploadOptional.get();

		File oldFile = new File(tempFileUpload.getAbsoluteFullPath());

		if(!oldFile.exists()) {
			tempFileUploadRepository.delete(tempFileUpload);
			throw new BusinessLogicException(ErrorCode.TempFileUpload.ACTUAL_FILE_DOES_NOT_EXIST, "Actual file does not exist. If existed, every record with the given tempFileUploadId is deleted.");
		}

		LargeFileUtil.createFolderIfDoesNotExist(destinationFolder);
		String newFileFullPath = destinationFolder.getAbsolutePath() + File.separator + tempFileUpload.getName();
		oldFile.renameTo(new File(newFileFullPath));

        File newFile = new File(newFileFullPath);
        if(!newFile.exists()) {
			throw new BusinessLogicException(ErrorCode.TempFileUpload.UNSUCCESSFUL_FILE_MOVEMENT, "The movement of the file in the file system was unsuccessful.");
        }
		tempFileUploadRepository.delete(tempFileUpload);
		return newFile;
	}

	/**
	 * @see com.kalin.large.core.service.temp.TempFileUploadService#uploadTemporaryFile(org.springframework.web.multipart.MultipartFile, String)
	 */
	@Override
	@Transactional
	public TempFileUpload uploadTemporaryFile(final MultipartFile multipartFile, final String sessionId) throws BusinessLogicException {
		String directoryPath = parameterService.getGlobalParamAsString(ParamName.TEMP_FILE_PATH);
		LargeFileUtil.createFolderIfDoesNotExist(directoryPath);
		
		TempFileUpload  tempFileUpload = tempFileUploadFactory.create(multipartFile, sessionId, directoryPath);

		tempFileUploadRepository.save(tempFileUpload);
	
		LargeFileUtil.storeFile(multipartFile, tempFileUpload.getName(), tempFileUpload.getFilePath());

		return tempFileUpload; 
	}
	
	/**
	 * @see com.kalin.large.core.service.temp.TempFileUploadService#getTemporaryFile(Long)
	 */
	@Override
	public byte[] getTemporaryFile(Long id) {
		TempFileUpload tempFileUpload = tempFileUploadRepository.getOne(id);
		BufferedInputStream bufferedInputStream = null;
		byte[] tempFileRaw = null;
		byte[] defaultTempFileRawRaw = null;
		try {
			bufferedInputStream = new BufferedInputStream(
					getClass().getClassLoader().getResourceAsStream(DEFAULT_ARTICLE_PHOTO_PIC_RESOURCE_PATH));
			defaultTempFileRawRaw = IOUtils.toByteArray(bufferedInputStream);
		} catch (IOException e) {
			logger.error("Fail reading article's photo", e);
		} finally {
			IOUtils.closeQuietly(bufferedInputStream);
		}

		if (tempFileUpload == null || StringUtils.isBlank(tempFileUpload.getFilePath())) {
			return defaultTempFileRawRaw;
		}

		File tempFileFolder = getBasicTempFileFolderCreateIfNotExists();

		File articlePhoto = new File(tempFileFolder, tempFileUpload.getName());

		if (!articlePhoto.exists() || !articlePhoto.isFile()) {
			return defaultTempFileRawRaw;
		}

		try {
			bufferedInputStream = new BufferedInputStream(new FileInputStream(articlePhoto));
			tempFileRaw = IOUtils.toByteArray(bufferedInputStream);
		} catch (IOException e) {
			logger.error("Fail reading article's photo", e);
			return defaultTempFileRawRaw;
		} finally {
			IOUtils.closeQuietly(bufferedInputStream);
		}

		return tempFileRaw;
	}

	/**
	 * @see com.kalin.large.core.service.temp.TempFileUploadService#deleteTemporaryFile(ArticleFileDTO)
	 */
	@Override
	public boolean deleteTemporaryFile(ArticleFileDTO articleFileDTO) {
		TempFileUpload tempFileUpload = tempFileUploadRepository.getOne(articleFileDTO.getTempFileUploadId());
		try {
			Files.delete(Paths.get(tempFileUpload.getAbsoluteFullPath()));
			tempFileUploadRepository.delete(tempFileUpload);
			return true;			
		} catch (IOException e) {
			return false;
		}
	}
	/**
	 * Delete the supplied temp file iploads. This method first deletes the actual files (if existent) , 
	 * then deletes the entry from the database
	 * @param tempFiles {@link Set} of {@link TempFileUpload}
	 */
	private void deleteFiles(final Set<TempFileUpload> tempFiles) {
		for(TempFileUpload tempFile: tempFiles) {		
			LargeFileUtil.deleteFile(new File(tempFile.getFilePath(), tempFile.getName()));
			tempFileUploadRepository.delete(tempFile);
		}
	}
	

	/**
	 * Returns the {@link File} with the basic {@link Article} directory, where
	 * will be deployed all {@link Article} specific resources
	 *
	 * @return {@link File}
	 */
	private File getBasicTempFileFolderCreateIfNotExists() {

		File tempDataFolder = new File(parameterService.getGlobalParamAsString(ParamName.TEMP_FILE_PATH));

		if (!tempDataFolder.exists()) {
			tempDataFolder.mkdirs();
		}

		return tempDataFolder;
	}

}
