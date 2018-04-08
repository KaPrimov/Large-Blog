package com.kalin.large.core.service.document;


import com.kalin.large.core.helpers.io.LargeFileUtil;
import com.kalin.large.core.model.document.Document;
import com.kalin.large.core.model.document.beans.DocumentUpload;
import com.kalin.large.core.repository.document.DocumentRepository;
import com.kalin.large.core.service.error.ErrorCode;
import com.kalin.large.core.service.exception.BusinessLogicException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.DigestUtils;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.util.Optional;

/**
 * Created on 10.3.2017 г.
 *
 * @author Emil Doychev <e.doychev@proxiad.com>
 */
@Service
public class DocumentServiceImpl implements DocumentService {
	
	/*-------------------------------------------------- FACTORIES ---------------------------------------------------*/
	private final DocumentFactory documentFactory;
	private final DocumentRepository documentRepository;

	/*-------------------------------------------------- REPOSITORIES ------------------------------------------------*/

	@Autowired
	public DocumentServiceImpl(DocumentFactory documentFactory, DocumentRepository documentRepository) {
		this.documentFactory = documentFactory;
		this.documentRepository = documentRepository;
	}


	/*------------------------------------------------------ API -----------------------------------------------------*/

	/**
	 *
	 * @see com.kalin.large.core.service.document.DocumentService#store(DocumentUpload, String)
	 */
	@Override
	public Document store(final DocumentUpload documentUpload, final String repositoryPath) throws BusinessLogicException {
		assert documentUpload != null;

		MultipartFile file = documentUpload.getDocument();
		try {
			String fileName = generateFileName(file);

			Document document = documentFactory.create(
					file.getOriginalFilename(),
					file.getContentType(),
					fileName
			);

			documentRepository.save(document);

			LargeFileUtil.storeFile(file, fileName, repositoryPath);

			return document;
		} catch (IOException e) {
			throw new BusinessLogicException(ErrorCode.DocumentService.CANT_READ_FILE, "Can't make file's MD5 checksum");
		}
	}

	/**
	 * @see DocumentService#delete(Long, String)
	 */
	@Override
	public void delete(final Long id, final String repositoryPath) throws BusinessLogicException {
		Document document = getDocumentById(id);

		delete(document, repositoryPath);
	}

	/**
	 * @see DocumentService#delete(Long, String)
	 */
	@Override
	public void delete(final Document document, final String repositoryPath) {
		documentRepository.delete(document);

		deleteRelatedFile(document, repositoryPath);
	}

	/**
	 *	@see DocumentService#getDocumentById(Long)
	 */
	@Override
	public Document getDocumentById(final Long id) throws BusinessLogicException {
		Optional<Document>  document = documentRepository.findById(id);

		if (!document.isPresent()) {
			throw new BusinessLogicException(ErrorCode.DocumentService.DOCUMENT_NOT_FOUND,
					"Document with id " + id + " cannot be found."
			);
		}

		return document.get();
	}

	/**
	 * @see DocumentService#getFileFromDocument(Document, String)
	 */
	@Override
	public File getFileFromDocument(final Document document, final String repositoryPath) {
		return new File(repositoryPath, document.getFileName());
	}

	/**
	 * Generate MD5 hash from the file contents
	 * @param file {@link java.util.ArrayPrefixHelpers.LongCumulateTask}
	 * @return string representation of the MD5 hash
	 */
	@Override
	public String generateFileName(final MultipartFile file) throws IOException {
		return DigestUtils.md5DigestAsHex(file.getInputStream());
	}

	/**
	 * Generate MD5 hash from the fileName
	 * @param fileName String
	 * @return string representation of the MD5 hash
	 */
	@Override
	public String generateFileName(final String fileName) {
		return DigestUtils.md5DigestAsHex(fileName.getBytes());
	}

	/**
	 * Delete associated file for an {@link Document} entity
	 *
	 * @param document {@link DocumentService}
	 * @param repositoryPath {@link String}
	 */
	private void deleteRelatedFile(final Document document, final String repositoryPath) {
		assert document != null;
		LargeFileUtil.deleteFile(getFileFromDocument(document, repositoryPath));
	}
}