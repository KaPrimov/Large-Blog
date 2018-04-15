package com.kalin.large.core.service.tag;

import com.kalin.large.core.model.article.Article;
import com.kalin.large.core.model.article.ArticleTag;
import com.kalin.large.core.model.article.ArticleTagId;
import com.kalin.large.core.model.article.Tag;
import com.kalin.large.core.model.article.beans.ArticleTagDTO;
import org.apache.commons.lang3.StringUtils;
import org.springframework.stereotype.Component;

import java.util.Collection;

/**
 * Created on 12.12.2017 г.
 *
 * @author Kalin Primov
 */
@Component
public class TagFactoryImpl implements TagFactory {

	@Override
	public ArticleTag createFrom(Tag tag, Article article) {
		ArticleTag articleTag = new ArticleTag();
		ArticleTagId articleTagId = new ArticleTagId();
		articleTagId.setArticle(article);
		articleTagId.setTag(tag);
		articleTag.setPk(articleTagId);
		return articleTag;
	}
	@Override
	public Tag createFrom(String name) {
		Tag tag = new Tag();
		tag.setName(formatTagName(name));
		return tag;
	}
	@Override
	public ArticleTagDTO[] createArticleTagDTOsFromCollection(Collection<ArticleTag> tags) {
		ArticleTagDTO[] articleTagDTOs = new ArticleTagDTO[tags.size()];
		int index = 0;
		for (ArticleTag tag : tags) {
			ArticleTagDTO articleTagDTO = createArticleTagDTO(tag);
			articleTagDTOs[index++] = articleTagDTO;
		}
		return articleTagDTOs;
	}

	private ArticleTagDTO createArticleTagDTO(ArticleTag tag) {
		ArticleTagDTO tagDTO = new ArticleTagDTO();
		tagDTO.setId(tag.getPk().getTag().getId());
		tagDTO.setName(tag.getPk().getTag().getName());
		
		return tagDTO;
	}
	
	/**
	 * Refactor tag name to contain only letters, digits and dashes
	 * @param name
	 * @return
	 */
	private String formatTagName(final String name) {
		String result = trimWhiteSpaces(name);
		result = transformUppercaseToLowercase(result);
		result = replaceWhitespacesWithDashes(result);
		result = removeUnallowedSymbols(result);
		result = removeRepeatingDashes(result);
		return result;
	}

	/**
	 * Remove whitespacesin at the beginning and the end
	 * @param name
	 * @return
	 */
	private String trimWhiteSpaces(final String name) {
		return StringUtils.trimToNull(name);
	}
	
	/**
	 * Transform the name to lowercase
	 * @param name
	 * @return
	 */
	private String transformUppercaseToLowercase(final String name) {
		return StringUtils.lowerCase(name);
	}

	/**
	 * Replace whitespaces within the name to dashes
	 * @param name
	 * @return
	 */
	private String replaceWhitespacesWithDashes(final String name) {
		StringBuilder temp = new StringBuilder();
		for(int index = 0; index < name.length(); ++index){
			if((index == 0 && !isLetterOrDigit(name.charAt(index))) || (index == (name.length()-1) && name.charAt(index) == ' ')){
				temp.append(name.charAt(index));
			} else {
				if(name.charAt(index) == ' '){
					temp.append('-');
				} else {
					temp.append(name.charAt(index));
				}
			}
		}
		return temp.toString();
	}
	
	/**
	 * Remove sequential dashes
	 * @param name
	 * @return
	 */
	private String removeRepeatingDashes(final String name) {
		StringBuilder temp = new StringBuilder();
		boolean appendedDash = false;
		for(int index = 0; index < name.length()-1; ++index){
			if(name.charAt(index) == '-' && name.charAt(index+1) == '-'){
				if(!hasLettersAfterIndex(index, name)){
					break;
				}else {
					if(!appendedDash){
						temp.append(name.charAt(index));
					}
					appendedDash = true;
					continue;
				}
			}else {
				if(name.charAt(index) != '-'){
					temp.append(name.charAt(index));
					appendedDash = false;
				} else {
					if(index > 0 && name.charAt(index-1) != '-'){
						temp.append(name.charAt(index));
					}
				}
			}
		}
		if(isLetterOrDigit(name.charAt(name.length()-1))){
			temp.append(name.charAt(name.length()-1));
		}
		return temp.toString();
	}
	
	private boolean hasLettersAfterIndex(int position, String name) {
		for(int index = position; index < name.length(); ++index){
			if(isLetterOrDigit(name.charAt(index))){
				return true;
			}
		}
		return false;
	}

	/**
	 * Remove symbols different from digits, letters and dash
	 * @param name
	 * @return
	 */
	private String removeUnallowedSymbols(final String name) {
		StringBuilder temp = new StringBuilder();
		boolean unallowedOnly = false;
		for(int index = 0; index < name.length(); ++index){
			if((index == 0 && !isLetterOrDigit(name.charAt(index))) || (index == (name.length()-1) && name.charAt(index) == '-')){
				unallowedOnly = true;
				continue;
			}else if(isLetterOrDigit(name.charAt(index)) || name.charAt(index) == '-'){
				if(unallowedOnly == true && name.charAt(index) == '-') {
					continue;
				}
				unallowedOnly = false;
				temp.append(name.charAt(index));
			}
		}
		return temp.toString();
	}

	/**
	 * @param symbol
	 * @return true if the passed variable is a letter or a digit
	 */
	private boolean isLetterOrDigit(final char symbol) {
		 return symbol >= '0' && symbol <= '9' || 
				(symbol >= 'A' && symbol <= 'Z' || 
				symbol >= 'a' && symbol <= 'z') || 
				(symbol >= 'А' && symbol <= 'Я' || 
				symbol >= 'а' && symbol <= 'я');
	}
	
	
}
