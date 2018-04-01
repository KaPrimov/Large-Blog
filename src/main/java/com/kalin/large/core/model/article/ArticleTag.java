package com.kalin.large.core.model.articles;

import javax.persistence.*;
import java.io.Serializable;

/**
 * The Class ArticleTag.
 */
@Entity
@Table(name = "ARTICLE_TAG")
@AssociationOverrides({
		@AssociationOverride(name = "pk.article", joinColumns = @JoinColumn(name = "ID_ARTICLE")),
		@AssociationOverride(name = "pk.tag", joinColumns = @JoinColumn(name = "ID_TAG")) })
public class ArticleTag implements Serializable {
	
	private static final long serialVersionUID = -4398523981441289586L;
	
	@EmbeddedId
	private ArticleTagId pk = new ArticleTagId();
	
	
	public ArticleTag() {}
	
	public ArticleTag(final Article article, final Tag tag) {
		pk = new ArticleTagId();
		pk.setArticle(article);
		pk.setTag(tag);
	}
	
	/**
	 * Gets the pk.
	 *
	 * @return the pk
	 */
	public ArticleTagId getPk() {
		return pk;
	}

	/**
	 * Sets the pk.
	 *
	 * @param pk the new pk
	 */
	public void setPk(ArticleTagId pk) {
		this.pk = pk;
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

		ArticleTag that = (ArticleTag) o;

		return pk.equals(that.pk);
	}

	/**
	 * Hash code.
	 *
	 * @return the int
	 * @see Object#hashCode()
	 */
	@Override
	public int hashCode() {
		return pk.hashCode();
	}
	
}
