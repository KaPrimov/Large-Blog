package com.kalin.large.api;

import com.kalin.large.core.model.article.beans.ArticleFileDTO;
import com.kalin.large.core.model.temp.TempFileUpload;
import com.kalin.large.core.service.exception.BusinessLogicException;
import com.kalin.large.core.service.exception.RestWebServiceException;
import com.kalin.large.core.service.temp.TempFileUploadService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpSession;

@RestController
@RequestMapping(path = "/api/temp")
public class TempAPI {

	/*---------------------------------------------------- SERVICES --------------------------------------------------*/
	
	private final TempFileUploadService tempFileUploadService;

	@Autowired
	public TempAPI(TempFileUploadService tempFileUploadService) {
		this.tempFileUploadService = tempFileUploadService;
	}

	/*------------------------------------------------------ API -----------------------------------------------------*/
	
	/**
	 * Upload a {@link MultipartFile}
	 * @param file {@link MultipartFile}
	 */
	@PostMapping(produces= MediaType.APPLICATION_JSON_UTF8_VALUE)
	public ResponseEntity<TempFileUpload> uploadTempFile(@RequestBody final MultipartFile file, final HttpSession session) {
		try {
			return ResponseEntity.ok(tempFileUploadService.uploadTemporaryFile(file, session.getId()));
		} catch (BusinessLogicException ble) {
			throw new RestWebServiceException(ble.getErrorCode(), ble.getMessage(), ble);
		}	
	}
	
	/**
	 * Get specific File
	 * 
	 * @param id
	 *            the id of some {@link TempFileUpload}
	 * @return byte[] representation of the file
	 */
	@GetMapping(path = "/{id}/tempFile", produces = MediaType.IMAGE_JPEG_VALUE)
	public ResponseEntity<byte[]> getArticlePhoto(@PathVariable final Long id) {
		return ResponseEntity.ok(tempFileUploadService.getTemporaryFile(id));
	}
	

	/**
	 * Get specific article file by {@link ArticleFileDTO}
	 * 
	 * @param articleFileDTO the data needed for saving a file{@link ArticleFileDTO}
	 * @return {@link Boolean}
	 */
	@DeleteMapping(path = "/delete", produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
	public ResponseEntity<Boolean> getArticleFile(@RequestBody final ArticleFileDTO articleFileDTO) {
		return ResponseEntity.ok(tempFileUploadService.deleteTemporaryFile(articleFileDTO));
	}
}
