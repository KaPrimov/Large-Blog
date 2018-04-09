package com.kalin.large.api;

import com.proxiad.extranet.api.exception.ElementNotFound;
import com.proxiad.extranet.api.exception.RestWebServiceException;
import com.proxiad.extranet.core.model.article.Article;
import com.proxiad.extranet.core.model.employee.beans.EmployeeNameDTO;
import com.proxiad.extranet.core.model.news.News;
import com.proxiad.extranet.core.model.news.beans.NewsDTO;
import com.proxiad.extranet.core.model.news.beans.NewsFilterCriteria;
import com.proxiad.extranet.core.service.error.ErrorCode;
import com.proxiad.extranet.core.service.exception.BusinessLogicException;
import com.proxiad.extranet.core.service.news.NewsService;
import com.proxiad.extranet.core.service.security.CurrentUser;
import com.proxiad.extranet.core.service.security.SecurityService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.Set;


/**
 * REST API for access to {@link (News} entity
 */
@RestController
@RequestMapping(path = "/api/news")
public class NewsAPI {

	/*---------------------------------------------------- SERVICES --------------------------------------------------*/
	@Autowired
	private NewsService newsService;
	
	@Autowired
	private SecurityService securityService;
	
	/*------------------------------------------------------ API -----------------------------------------------------*/
	/**
	 * Return all News:
	 * @return {@link Set<News>}
	 */
	@GetMapping(produces= MediaType.APPLICATION_JSON_UTF8_VALUE)
    ResponseEntity<Set<NewsDTO>> listAllNews() {
		return ResponseEntity.ok(newsService.listAllNewsOfLoggedInUser());
	}

	
	/**
	 * Return single news with the given id::
	 * @return {@link NewsDTO}
	 */
	@GetMapping(path = "/{id}", produces= MediaType.APPLICATION_JSON_UTF8_VALUE)
    ResponseEntity<NewsDTO> findNewsById(@PathVariable final Long id) {
		try {
			return ResponseEntity.ok(newsService.load(id));
		} catch (BusinessLogicException ble) {
            throw new ElementNotFound(ErrorCode.News.NEWS_NOT_FOUND, ble.getMessage());
		}
	}
	
	/**
     * Delete {@link News} by specific id
     * @param id 
     * @return true/false with HTTP status ok
     */
	@PreAuthorize("hasPrivilege('news.articles', 'update')")
	@DeleteMapping(path="/{id}", produces= MediaType.APPLICATION_JSON_UTF8_VALUE)
    public ResponseEntity<Boolean> deleteNews(@PathVariable final Long id) {
		try {
			CurrentUser currentUser = securityService.getLoggedInUser();
			NewsDTO news = newsService.load(id);
			
			if (!(news.getEmployee().getId().equals(currentUser.getUserId()))) {
				throw new AccessDeniedException(String.format("The user: %d does not have the privilege to delete the article with id: %d.", currentUser.getUserId(), id));
			}
			
			newsService.deleteNews(id); 
	        return ResponseEntity.ok(Boolean.TRUE);
		} catch (DataIntegrityViolationException div) {
			throw new RestWebServiceException(ErrorCode.News.NEWS_IS_IN_USE, div.getMessage(), div);
		} catch (BusinessLogicException ble) {
            throw new ElementNotFound(ErrorCode.News.NEWS_NOT_FOUND, ble.getMessage());
		}
    }
	
	/**
	 * List all employees who have read an {@link Article} by its id
	 * @param id of {@link Article}
	 * @return {@link Set<EmployeeNameDTO>}
	 */
	@GetMapping(path="/seen-by/{id}", produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
	public ResponseEntity<Set<EmployeeNameDTO>> listSeenByEmployees(@PathVariable final Long id) {
		return ResponseEntity.ok(newsService.listSeenByEmployees(id));
	}
		
	/**
	 * Creates a new {@link News}
	 * @param News {@link NewsDTO}
	 * @return the new created new {@link News} with HTTP status ok
	 */
	@PreAuthorize("hasPrivilege('news.articles', 'update')")
	@PostMapping(path="/store", produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
	public ResponseEntity<Long> createOrUpdateNewsContent(@RequestBody final NewsDTO contentNews) {
	
		try {
			CurrentUser currentUser = securityService.getLoggedInUser();

			if (contentNews.getId() != null) {
				NewsDTO news = newsService.load(contentNews.getId());
				if (!news.getEmployee().getId().equals(currentUser.getUserId())) {
					throw new AccessDeniedException(String.format("The user: %d does not have the permission to update article with id: %d", currentUser.getUserId(), news.getId()));
				}
			}
			return ResponseEntity.ok(newsService.saveOrUpdateNewsContent(contentNews));
		} catch (BusinessLogicException ble) {
			switch (ble.getErrorCode()) {
			case ErrorCode.News.NEWS_NOT_FOUND:
				throw new ElementNotFound(ble.getErrorCode(), ble.getMessage());
			default:
				throw new RestWebServiceException(ble.getErrorCode(), ble.getMessage(), ble);
			}
		}
	}
	
	/**
	 * Marks article as seen
	 * @param articleId the id of the article
	 * @return  HTTP status ok
	 */
	@PostMapping(path="/mark-as-seen", produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
	public ResponseEntity<Boolean> markNewsAsSeen(@RequestBody final Long newsId) {
		newsService.markNewsAsSeen(newsId);
			return ResponseEntity.ok(Boolean.TRUE);
	}
	
	/**
	 * Updates the metadata of a given news {@link News}
	 * @param News {@link NewsDTO}
	 * @return the new created new {@link News} with HTTP status ok
	 */
	@PreAuthorize("hasPrivilege('news.articles', 'update')")
	@PutMapping(path="/update", produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
	public ResponseEntity<Long> updateNewsMetadata(@RequestBody final NewsDTO contentNews) {
		try {
			CurrentUser currentUser = securityService.getLoggedInUser();

			NewsDTO news = newsService.load(contentNews.getId());
			if (!(news.getEmployee().getId().equals(currentUser.getUserId()))) {
				throw new AccessDeniedException(String.format("The user: %d does not have the permission to update the metadata of article with id: %d", currentUser.getUserId(), news.getId()));
			}
			return ResponseEntity.ok(newsService.updateNewsMetadata(contentNews));
		} catch (BusinessLogicException ble) {
			switch (ble.getErrorCode()) {
			case ErrorCode.News.NEWS_NOT_FOUND:
				throw new ElementNotFound(ble.getErrorCode(), ble.getMessage());
			default:
				throw new RestWebServiceException(ble.getErrorCode(), ble.getMessage(), ble);
			}
		}
	}
	
	/**
	 * Publish single news {@link News}
	 * @param News {@link NewsDTO}
	 * @return the new created new {@link News} with HTTP status ok
	 */
	@PreAuthorize("hasPrivilege('news.articles', 'update')")
	@PutMapping(path="/publish/{id}", produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
	public ResponseEntity<Boolean> publishNews(@PathVariable final Long id) {
		try {
			CurrentUser currentUser = securityService.getLoggedInUser();

			NewsDTO news = newsService.load(id	);
			if (!(news.getEmployee().getId().equals(currentUser.getUserId()))) {
				throw new AccessDeniedException(String.format("The user: %d does not have the permission to update the metadata of article with id: %d", currentUser.getUserId(), news.getId()));
			}
			
			return ResponseEntity.ok(newsService.publish(id));
		} catch (BusinessLogicException ble) {
			switch (ble.getErrorCode()) {
			case ErrorCode.News.NEWS_NOT_FOUND:
				throw new ElementNotFound(ble.getErrorCode(), ble.getMessage());
			default:
				throw new RestWebServiceException(ble.getErrorCode(), ble.getMessage(), ble);
			}
		}
	}
}
