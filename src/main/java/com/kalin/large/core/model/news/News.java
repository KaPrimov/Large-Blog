package com.kalin.large.core.model.news;

import com.kalin.large.core.model.article.Article;
import com.kalin.large.core.model.user.User;
import org.apache.commons.lang3.math.NumberUtils;

import javax.persistence.*;
import java.io.Serializable;
import java.util.LinkedHashSet;
import java.util.Set;

/**
 * The Class News
 */
@Entity
@Table(name = "NEWS")
@PrimaryKeyJoinColumn(name = "ID_NEWS")
public class News extends Article implements Serializable {
	
	private static final long serialVersionUID = -1321872651017299578L;
	
	@Column(name = "SHORT_DESCRIPTION")
	private String shortDescription;
	
	@OneToMany(mappedBy = "pk.news", fetch = FetchType.LAZY, cascade = {CascadeType.ALL})
	private Set<NewsSeenBy> seenBy = new LinkedHashSet<>(NumberUtils.INTEGER_ZERO);

	/**
	 * Gets the short description.
	 *
	 * @return the short description
	 */
	public String getShortDescription() {
		return shortDescription;
	}

	/**
	 * Sets the short description.
	 *
	 * @param shortDescription the new short description
	 */
	public void setShortDescription(String shortDescription) {
		this.shortDescription = shortDescription;
	}
	
	public Set<NewsSeenBy> getSeenBy() {
		return seenBy;
	}

	public void setSeenBy(Set<NewsSeenBy> seenBy) {
		this.seenBy = seenBy;
	}
	
	public void addSeenBy(final User user) {
		seenBy.add(new NewsSeenBy(this, user));
	}

	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		
		News that = (News) obj;
		if (shortDescription == null) {
			if (that.shortDescription != null)
				return false;
		} else if (!shortDescription.equals(that.shortDescription))
			return false;
		return true;
	}

	@Override
	public int hashCode() {
		final int prime = 31;
		int result = super.hashCode();
		result = prime * result + ((shortDescription == null) ? 0 : shortDescription.hashCode());
		return result;
	}

}
