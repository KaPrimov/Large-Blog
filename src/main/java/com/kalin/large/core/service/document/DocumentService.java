package com.kalin.large.core.service.document;

import com.kalin.large.core.model.document.Document;
import com.kalin.large.core.model.document.beans.DocumentUpload;
import com.kalin.large.core.service.exception.BusinessLogicException;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;

/**
 * Document service for a {@link Document} operationrs
 *
 */
public interface DocumentService {
	/**
	 * Store uploaded document into employee's repository
	 *
	 * @param documentUpload the document
	 * @param repositoryPath the path to the directory where the physical file is kept
	 * @return the new {@link Document} entity
	 */
	Document store(final DocumentUpload documentUpload, final String repositoryPath) throws BusinessLogicException;

	/**
	 * Delete a {@link Document} entity and its related physical file
	 * @param id the identity of the document into the database
	 * @param repositoryPath the path to the directory where the physical file is kept
	 */
	void delete(final Long id, final String repositoryPath) throws BusinessLogicException;

	/**
	 * Delete a {@link Document} entity and its related physical file
	 * @param document the document into the database
	 * @param repositoryPath the path to the directory where the physical file is kept
	 */
	void delete(final Document document, final String repositoryPath) throws BusinessLogicException;

	/**
	 * Return {@link File} object, which represents the physical file associated with given {@link Document}
	 * @param document the document
	 * @return {@link File}
	 */
	File getFileFromDocument(final Document document, final String repositoryPath);

	/**
	 * Get document by its Id
	 * @param id {@link Long}
	 * @return {@link Document}
	 * @throws BusinessLogicException
	 */
	Document getDocumentById(final Long id) throws BusinessLogicException;

	/**
	 * Generate MD5 hash from the file contents
	 * @param file {@link MultipartFile}
	 * @return string representation of the MD5 hash
	 */
	String generateFileName(final MultipartFile file) throws IOException;

	/**
	 * Generate MD5 hash from the file name
	 * @param fileName {@link String}
	 * @return string representation of the MD5 hash
	 */
	String generateFileName(final String fileName) throws IOException;
}
