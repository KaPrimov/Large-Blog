package com.kalin.large.core.model.article;

import javax.persistence.Embeddable;
import javax.persistence.ManyToOne;
import java.io.Serializable;

/**
 * The Class ArticleTagId.
 */
@Embeddable
public class ArticleTagId implements Serializable {

	private static final long serialVersionUID = 8545027622150288378L;

	/** The article. */
	@ManyToOne
	private Article article;

	/** The tag. */
	@ManyToOne
	private Tag tag;

	
	/**
	 * Gets the article.
	 *
	 * @return the article
	 */
	public Article getArticle() {
		return article;
	}

	/**
	 * Sets the article.
	 *
	 * @param article the new article
	 */
	public void setArticle(Article article) {
		this.article = article;
	}

	/**
	 * Gets the tag.
	 *
	 * @return the tag
	 */
	public Tag getTag() {
		return tag;
	}

	/**
	 * Sets the tag.
	 *
	 * @param tag the new tag
	 */
	public void setTag(Tag tag) {
		this.tag = tag;
	}

	/**
	 * Equals.
	 *
	 * @param o the o
	 * @return true, if successful
	 * @see Object#equals(Object)
	 */
	@Override
	public boolean equals(Object o) {
		if (this == o)
			return true;
		if (o == null || getClass() != o.getClass())
			return false;

		ArticleTagId that = (ArticleTagId) o;

		if (!article.equals(that.article))
			return false;
		return tag.equals(that.tag);
	}

	/**
	 * Hash code.
	 *
	 * @return the int
	 * @see Object#hashCode()
	 */
	@Override
	public int hashCode() {
		int result = article.hashCode();
		result = 31 * result + tag.hashCode();
		return result;
	}
	
}