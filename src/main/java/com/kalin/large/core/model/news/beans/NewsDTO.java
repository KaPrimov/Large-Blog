package com.kalin.large.core.model.news.beans;

import com.kalin.large.core.model.article.ArticleStatusEnum;
import com.kalin.large.core.model.article.beans.ArticleDTO;
import com.kalin.large.core.model.news.News;
import com.kalin.large.core.model.user.User;
import com.kalin.large.core.model.user.beans.UserFullDTO;

import java.util.Date;
import java.util.LinkedHashSet;
import java.util.Set;
import java.util.stream.Collectors;

/**
 * News Data transfer object
 *
 */
public class NewsDTO extends ArticleDTO {
	
	private static final long serialVersionUID = 381688140670464051L;
	
	private String shortDescription;
	private Set<UserFullDTO> seenBy = new LinkedHashSet<>();

	public NewsDTO() {}

	/**
	 *
	 * @param id
	 * @param user
	 * @param title
	 * @param subtitle
	 * @param startDate
	 * @param endDate
	 * @param body
	 * @param imagePath
	 * @param status
	 * @param shortDescription
	 */
	public NewsDTO(final Long id, final User user, final String title, final String subtitle, final Date startDate, final Date endDate, final String body,
				   final String imagePath, final ArticleStatusEnum status, final String shortDescription){
		super(id, user, title, subtitle, startDate, endDate, body, imagePath, status);
		this.shortDescription = shortDescription;
	}
	
	/**
	 * 
	 * @param news {@link News}
	 */
	public NewsDTO(final News news){
		super(news);
		this.shortDescription = news.getShortDescription();
		this.seenBy = news.getSeenBy().stream().map(newsSeenBy -> new UserFullDTO(newsSeenBy.getPk().getUser())).collect(Collectors.toSet());
	}
	
	/**
	 * 
	 * @param id
	 * @param title
	 */
	public NewsDTO(final Long id, final String title){
		super(id, title);
	}

	/**
	 * Get the short description of the news
	 * @return {@link String} short description
	 */
	public String getShortDescription() {
		return shortDescription;
	}
	
	/** 
	 * @param shortDescription to set
	 */
	public void setShortDescription(String shortDescription) {
		this.shortDescription = shortDescription;
	}

	/**
	 * Returns seen by
	 * @return
	 */
	public Set<UserFullDTO> getSeenBy() {
		return seenBy;
	}

	/**
	 * Set seen by
	 * @param seenBy
	 */
	public void setSeenBy(Set<UserFullDTO> seenBy) {
		this.seenBy = seenBy;
	}
}