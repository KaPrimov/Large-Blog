package com.proxiad.extranet.core.model.article.beans;

import java.io.Serializable;

/**
 * Created on 07.12.2017 г.
 *
 * @author Kalin Primov <k.primov@proxiad.com>
 */
public class ArticleImageDTO implements Serializable {
	
	private static final long serialVersionUID = -81020319521428125L;

	private Long id;

	private String image;

	/**
	 * @return the {@link Long} value of id
	 */
	public Long getId() {
		return id;
	}

	/**
	 * @param id to set
	 */
	public void setId(Long id) {
		this.id = id;
	}

	/**
	 * @return the {@link String} value of image
	 */
	public String getImage() {
		return image;
	}

	/**
	 * @param image to set
	 */
	public void setImage(String image) {
		this.image = image;
	}
}
