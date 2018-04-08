package com.kalin.large.core.helpers.io;


import com.kalin.large.core.helpers.exception.ImageProcessingException;
import com.kalin.large.core.helpers.image.ImageProcessingHelper;
import com.kalin.large.core.service.error.ErrorCode;
import com.kalin.large.core.service.exception.BusinessLogicException;
import com.kalin.large.core.service.user.UserServiceImpl;
import org.apache.commons.io.FileUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.crypto.codec.Hex;
import org.springframework.web.multipart.MultipartFile;

import java.io.*;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.util.Base64;

/**
 * Util class for manipulation of files in extranet app. It handles common operations like creating directories, uploading / deleting files
 */
public final class LargeFileUtil {

	private LargeFileUtil() {}
	
	private static final Logger logger = LoggerFactory.getLogger(UserServiceImpl.class);

	/**
	 * Store a image file from Base64 encoded byte array. Skips the first 18
	 * characters ('image/jpeg;base64,'). The name of the file is formed as MD5
	 * hash of the image content + the id of the employee.
	 *
	 * @param b64pic
	 *            the base64 encoded byte array of the image content
	 * @return the name of the generated image file or null if the b64pic param
	 *         is not a valid base64 encoded byte array.
	 */
	public static String saveToImageFile(final String b64pic, final Long entityId, final File specificFolder, final int maxImageWidthInPx) throws ImageProcessingException {
		if (b64pic != null && b64pic.length() > 23) {
			try {
				String pic = b64pic.substring(23);

				String fileName = "photo" + entityId + ".jpg";
				try {
					MessageDigest digest = MessageDigest.getInstance("MD5");
					byte[] md5 = digest.digest((entityId + pic).getBytes("UTF-8"));
					fileName = new String(Hex.encode(md5)) + ".jpg";
				} catch (NoSuchAlgorithmException e) {
					logger.error("Wrong algorithm: " + e.getMessage(), e);
				} catch (UnsupportedEncodingException e) {
					logger.error("Hashing fails. ", e);
				}

				File imageFile = new File(specificFolder, fileName);

				byte[] data = Base64.getDecoder().decode(pic);

				byte[] resizedPicture = ImageProcessingHelper.resizeImageToMaxWidth(maxImageWidthInPx, data);
				try (OutputStream stream = new FileOutputStream(imageFile)) {
					logger.debug("Writing image to " + imageFile.getAbsolutePath());
					stream.write(resizedPicture);
				}

				return fileName;
			} catch (IOException e) {
				logger.error("Cannot write image file: " + e.getMessage(), e);
			}
		} else {
			logger.debug("No valid image supplied. Skip image file creation.");
		}

		return null;
	}

	/**
	 * Creates directory in not existent. If so, it does not make another or replace the current one
	 * @param path {@link String}
	 */
	public static File createFolderIfDoesNotExist(final String path) {
		File specificFolder = new File(path);
		if (!specificFolder.exists()) {
			specificFolder.mkdirs();
		}
		return specificFolder;
	}
	
	/**
	 * Creates directory in not existent. If so, it does not make another or replace the current one
	 * @param path {@link File}
	 */
	public static File createFolderIfDoesNotExist(final File path) {
		if (!path.exists()) {
			path.mkdirs();
		}
		return path;
	}

	/**
	 * Creates directory in not existent. If so, it does not make another or replace the current one
	 * @param baseRepositoryPath {@link File}
     * @param path {@link String}
	 */
	public static File createFolderIfDoesNotExist(final File baseRepositoryPath, final String path) {
		File specificFolder = new File(baseRepositoryPath, path);

		if (!specificFolder.exists()) {
			specificFolder.mkdirs();
		}
		return specificFolder;
	}
	
	/**
	 * Stores a file in a directory
	 *
	 * @param file the file to be stored
	 * @param fileName the name for the new file
	 * @param path the location to store the file
	 */
	public static void storeFile(final MultipartFile file, final String fileName, final String path) throws BusinessLogicException {
		logger.debug("Storing file '{}' in '{}' with name '{}'...", file.getOriginalFilename(), path, fileName);

		logger.debug("File content type: {}",  file.getContentType());

		final Path location = Paths.get(path + File.separator + fileName);

		try {
			Files.copy(file.getInputStream(), location, StandardCopyOption.REPLACE_EXISTING);
		} catch (IOException e) {
			logger.error("Can't write file in repository: {}", path, e);

			throw new BusinessLogicException(ErrorCode.DocumentService.CANT_WRITE_FILE,
					"Can't write file in repository: {}" + path
			);
		}
	}

	/**
	 * Deletes the file if exists
	 * @param file
	 */
	public static void deleteFile(final File file) {
		if (file.exists()) {
			file.delete();
		}
	}
	
	/**
	 * Delete directory
	 * @param directory
	 * @throws BusinessLogicException
	 */
	public static void deleteDirectory(final File directory) throws BusinessLogicException {
		try {
			FileUtils.deleteDirectory(directory);
		} catch (IOException e) {
			logger.error("Can't delete directory from path: {}", directory.getAbsolutePath(), e);

			throw new BusinessLogicException(ErrorCode.DocumentService.CANT_DELETE_DIRECTORY,
					"Can't delete directory from path: " + directory.getAbsolutePath()
			);
		}
	}
	
	/**
	 * Finds directory and returns it, if exists.
	 * @param baseRepositoryPath {@link File}
     * @param path {@link String}
	 */
	public static File findDirectory(final File baseRepositoryPath, final String path) {
		File specificFolder = new File(baseRepositoryPath, path);

		if (!specificFolder.exists()) {
			return null;
		}
		return specificFolder;
	}
}
