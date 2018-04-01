package com.kalin.large.core.model.articles;

import javax.persistence.*;
import java.io.Serializable;

/**
 * This entity will manage the parameters as entity 
 * @author Mirela Vlaeva
 */
@Entity
@Table(name = "ARTICLE_FILE")
public class ArticleFile implements Serializable {
	
	private static final long serialVersionUID = -8796975135352013193L;

	@Id
	@Column(name = "ID_ARTICLE_FILE")
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	
	@ManyToOne(fetch = FetchType.EAGER)
	@JoinColumn(name = "ID_ARTICLE", nullable = false)
	private Article article;
	
	@Column(name = "FILE_PATH")
	private String filePath;

	/**
	 * @return the id
	 */
	public Long getId() {
		return id;
	}

	/**
	 * @param id the id to set
	 */
	public void setId(Long id) {
		this.id = id;
	}

	/**
	 * @return the article
	 */
	public Article getArticle() {
		return article;
	}

	/**
	 * @param article the article to set
	 */
	public void setArticle(Article article) {
		this.article = article;
	}

	/**
	 * @return the filePath
	 */
	public String getFilePath() {
		return filePath;
	}

	/**
	 * @param filePath the filePath to set
	 */
	public void setFilePath(String filePath) {
		this.filePath = filePath;
	}
	
}