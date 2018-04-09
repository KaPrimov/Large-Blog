package com.kalin.large.core.model.news;

import com.kalin.large.core.model.user.User;

import javax.persistence.*;
import java.io.Serializable;

/**
 * The Class NewsSeenBy.
 */
@Entity
@Table(name = "NEWS_SEEN_BY")
@AssociationOverrides({
		@AssociationOverride(name = "pk.news", joinColumns = @JoinColumn(name = "ID_NEWS")),
		@AssociationOverride(name = "pk.employee", joinColumns = @JoinColumn(name = "ID_EMPLOYEE")) })
public class NewsSeenBy implements Serializable {

	private static final long serialVersionUID = 4228045735562906524L;
	
	@EmbeddedId
	private NewsSeenById pk;
	
	public NewsSeenBy() {}
	
	NewsSeenBy(final News news, final User user) {
		pk = new NewsSeenById();
		pk.setNews(news);
		pk.setUser(user);
	}

	/**
	 * Gets the pk.
	 *
	 * @return the pk
	 */
	public NewsSeenById getPk() {
		return pk;
	}

	/**
	 * Sets the pk.
	 *
	 * @param pk the new pk
	 */
	public void setPk(NewsSeenById pk) {
		this.pk = pk;
	}
	
	/* (non-Javadoc)
	 * @see java.lang.Object#equals(java.lang.Object)
	 */
	@Override
	public boolean equals(Object obj) {
		if(this==obj){
			return true;
		}
		if(obj==null || this.getClass() != obj.getClass()){
			return false;
		}
		NewsSeenBy that = (NewsSeenBy) obj;
		return this.pk.equals(that.pk);
	}
	
	/* (non-Javadoc)
	 * @see java.lang.Object#hashCode()
	 */
	@Override
	public int hashCode() {
		return pk.hashCode();
	}
}
