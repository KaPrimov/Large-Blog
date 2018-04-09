package com.kalin.large.core.service.tag;

import com.kalin.large.core.model.article.Tag;
import com.kalin.large.core.model.article.beans.ArticleTagDTO;
import com.kalin.large.core.repository.tag.TagRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.HashSet;
import java.util.Set;

/**
 * Tag service manages {@link Tag} entity and its primary data
 *
 *
 */
@Service
public class TagServiceImpl implements TagService {
	/*---------------------------------------------------- Factories -------------------------------------------------*/
	@Autowired
	private TagFactory tagFactory;
	/*-------------------------------------------------- REPOSITORIES ------------------------------------------------*/
	@Autowired
	private TagRepository tagRepository;
	
	/**
	 * Gets the tag with name
	 * @param {@link String} title
	 * @return {@link Tag}
	 */
	@Override
	public Tag getTagByName(final String name) {
		return tagRepository.getTagByName(name);
	}
	
	/**
	 * Creates Tag by given {@link ArticleTagDTO}
	 * @return {@link Tag}
	 */
	@Transactional
	@Override
	public Set<Tag> createTag(final ArticleTagDTO[] tagsDTO) throws DataIntegrityViolationException {
		Set<Tag> validatedTags = new HashSet<Tag>();
		Set<Tag> resultTags = new HashSet<Tag>();
		Tag tag = null;
		
		for (ArticleTagDTO articleTagDTO : tagsDTO) {
			if(articleTagDTO.getId() == null) {
				tag = getTagByName(articleTagDTO.getName());
				if (tag == null) {
					Tag newTag= this.tagFactory.createFrom(articleTagDTO.getName());
					validatedTags.add(newTag);
				}
			} else {
				resultTags.add(tagRepository.get(articleTagDTO.getId()));
			}
		}

		for(Tag newTag : validatedTags) {
			if(!tagRepository.tagExists(newTag.getName())) {
				tagRepository.save(newTag);
				resultTags.add(getTagByName(newTag.getName()));
			}
		}
		
		return resultTags;
	}
	

	/**
	 * @see com.proxiad.extranet.core.service.tag.TagService#searchArticleTagByName(String tagName)
	 */
	@Override
	public Set<ArticleTagDTO> searchArticleTagByName(String tagName) {
		Set<ArticleTagDTO> tags = new HashSet<>();
		if(tagName != null && !tagName.isEmpty()){
			tags = tagRepository.searchArticleTagsByName(tagName);
		}
		return tags;
	}
}
