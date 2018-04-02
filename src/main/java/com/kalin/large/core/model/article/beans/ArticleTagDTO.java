package com.kalin.large.core.model.article.beans;

import java.io.Serializable;

/**
 * Tag DTO
 */
public class ArticleTagDTO implements Serializable {

	private static final long serialVersionUID = 8106031550128125L;
	private Long id;
	private String name;
	
	/**
	 * Default constructor
	 */
	public ArticleTagDTO() {  }
	
	/** 	
	 * @param id
	 * @param name
	 */
	public ArticleTagDTO(Long id, String name) {
		this.id = id;
		this.name = name;
	}
	
	/**
	 * 
	 * @param name
	 */
	public ArticleTagDTO(String name) {
		this.name = name;
	}

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
	 * @return the {@link String} value of name
	 */
	public String getName() {
		return name;
	}

	/**
	 * @param name to set
	 */
	public void setName(String name) {
		this.name = name;
	}
}
