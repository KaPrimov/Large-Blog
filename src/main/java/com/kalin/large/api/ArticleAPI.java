package com.kalin.large.api;

import com.kalin.large.core.model.article.Article;
import com.kalin.large.core.model.article.ArticleFile;
import com.kalin.large.core.model.article.Tag;
import com.kalin.large.core.service.article.CommonArticleService;
import com.kalin.large.core.service.error.ErrorCode;
import com.kalin.large.core.service.exception.BusinessLogicException;
import com.kalin.large.core.service.exception.ElementNotFound;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Set;

@RestController
@RequestMapping(path = "/api/article")
public class ArticleAPI {
	
	/*---------------------------------------------------- SERVICES --------------------------------------------------*/
	private final CommonArticleService commonArticleService;

	@Autowired
	public ArticleAPI(CommonArticleService commonArticleService) {
		this.commonArticleService = commonArticleService;
	}

	/*------------------------------------------------------ API -----------------------------------------------------*/
	
	/**
	 * List all tags per {@link Article} by its id
	 * @param id of {@link Article}
	 * @return {@link Set<Tag>}
	 */
	@GetMapping(path="/{id}/tags", produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
	public ResponseEntity<Set<Tag>> listAllTagsPerArticle(@PathVariable final Long id) {
		return ResponseEntity.ok(commonArticleService.findAllTagsFor(id));
	}
	
	/**
	 * Get specific photo by {@link Article}
	 * 
	 * @param id
	 *            the id of some {@link Article}
	 * @return byte[] representation of the image
	 */
	@GetMapping(path = "/{id}/photo", produces = MediaType.IMAGE_JPEG_VALUE)
	public ResponseEntity<byte[]> getArticlePhoto(@PathVariable final Long id) {
		return ResponseEntity.ok(commonArticleService.getArticlePhoto(id));
	}
	
	/**
	 * Get specific article file by {@link Article}
	 * 
	 * @param id
	 *            the id of some {@link Article}
	 * @param articleFileId
	 *            the id of some {@link ArticleFile}
	 * @return byte[] representation of the image
	 */
	@GetMapping(path = "/{id}/file/{articleFileId}", produces = MediaType.IMAGE_JPEG_VALUE)
	public ResponseEntity<byte[]> getArticleFile(@PathVariable final Long id, @PathVariable final Long articleFileId) {
		return ResponseEntity.ok(commonArticleService.getArticleFile(id, articleFileId));
	}
	
	@PutMapping(path = "/{id}/cancel-publish", produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
	public ResponseEntity<Boolean> cancelMarkedForPublishingArticle(@PathVariable final Long id) {
		try {			
			return ResponseEntity.ok(commonArticleService.cancelPublishing(id));
		} catch (BusinessLogicException ble) {
            throw new ElementNotFound(ErrorCode.Articles.ARTICLE_NOT_FOUND, ble.getMessage());
		}
	}
}
