package com.kalin.large.core.model.news;

import com.kalin.large.core.model.user.User;

import javax.persistence.Embeddable;
import javax.persistence.ManyToOne;
import java.io.Serializable;

/**
 * The Class NewsSeenById.
 *
 */
@Embeddable
public class NewsSeenById implements Serializable{

	/** The Constant serialVersionUID. */
	private static final long serialVersionUID = 8492400155005315335L;
	
	/** The news. */
	@ManyToOne
	private News news;
	
	/** The user. */
	@ManyToOne
	private User user;

	/**
	 * Gets the news.
	 *
	 * @return the news
	 */
	public News getNews() {
		return news;
	}

	/**
	 * Sets the news.
	 *
	 * @param news the new news
	 */
	public void setNews(News news) {
		this.news = news;
	}

	/**
	 * Gets the user.
	 *
	 * @return the user
	 */
	public User getUser() {
		return user;
	}

	/**
	 * Sets the user.
	 *
	 * @param user the new user
	 */
	public void setUser(User user) {
		this.user = user;
	}
	
	/* (non-Javadoc)
	 * @see java.lang.Object#equals(java.lang.Object)
	 */
	@Override
	public boolean equals(Object o) {
		if(this.equals(o)){
			return true;
		}
		if(o == null || getClass() != o.getClass()){
			return false;
		}
		
		NewsSeenById that = (NewsSeenById) o;
		
		if(!this.news.equals(that.news)){
			return false;
		}
		return this.user.equals(that.user);
		
	}
	
	
	/* (non-Javadoc)
	 * @see java.lang.Object#hashCode()
	 */
	@Override
	public int hashCode() {
		int result = 0;
		result = 31 * result + this.news.hashCode();
		result = 31 * result + this.user.hashCode();
		return result;
		
	}
	
}