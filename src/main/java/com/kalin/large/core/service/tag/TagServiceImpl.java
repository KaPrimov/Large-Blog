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
@Transactional
public class TagServiceImpl implements TagService {
	/*---------------------------------------------------- Factories -------------------------------------------------*/
	private final TagFactory tagFactory;
	/*-------------------------------------------------- REPOSITORIES ------------------------------------------------*/
	private final TagRepository tagRepository;

	@Autowired
	public TagServiceImpl(TagFactory tagFactory, TagRepository tagRepository) {
		this.tagFactory = tagFactory;
		this.tagRepository = tagRepository;
	}

	/**
	 * Gets the tag with name
	 * @param {@link String} title
	 * @return {@link Tag}
	 */
	@Override
	public Tag getTagByName(final String name) {
		return tagRepository.findFirstByName(name);
	}
	
	/**
	 * @see com.kalin.large.core.service.tag.TagService#createTag(ArticleTagDTO[])
	 */
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
				resultTags.add(tagRepository.getOne(articleTagDTO.getId()));
			}
		}

		for(Tag newTag : validatedTags) {
			Tag isTagPresent = tagRepository.findFirstByName(newTag.getName());
			if(isTagPresent == null) {
				tagRepository.save(newTag);
				resultTags.add(getTagByName(newTag.getName()));
			}
		}
		
		return resultTags;
	}
	

	/**
	 * @see com.kalin.large.core.service.tag.TagService#searchArticleTagByName(String tagName)
	 */
	@Override
	public Set<ArticleTagDTO> searchArticleTagByName(String tagName) {
		Set<ArticleTagDTO> tags = new HashSet<>();
		if(tagName != null && !tagName.isEmpty()){
			tags = tagRepository.searchArticleTagsByName("%" + tagName + "%");
		}
		return tags;
	}
}
