package com.kalin.large.api;

import com.kalin.large.core.model.article.Tag;
import com.kalin.large.core.model.article.beans.ArticleTagDTO;
import com.kalin.large.core.service.tag.TagService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.Set;

/**
 * REST API for access to {@link Tag} entity
 *
 */

@RestController
@RequestMapping(path = "/api/tags")
public class TagAPI {
	
	/*---------------------------------------------------- SERVICES --------------------------------------------------*/
	private final TagService tagService;

	@Autowired
	public TagAPI(TagService tagService) {
		this.tagService = tagService;
	}

	/**
	 * Return tag which correspond to the given keyword:
	 * @param keyWord
	 * @return {@link Set<String>}
	 */
	@GetMapping(path = "/search", produces= MediaType.APPLICATION_JSON_UTF8_VALUE)
	public ResponseEntity<Set<ArticleTagDTO>> search(@RequestParam(required = false, defaultValue = "false") final String keyWord) {
		return ResponseEntity.ok(tagService.searchArticleTagByName(keyWord));
	}
}
