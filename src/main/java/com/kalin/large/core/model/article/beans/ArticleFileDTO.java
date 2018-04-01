package com.proxiad.extranet.core.model.article.beans;

import com.proxiad.extranet.core.model.article.ArticleFile;
import com.proxiad.extranet.core.model.temp.TempFileUpload;

/**
 * {@link ArticleFileDTO} beans, contains the <code>articleFileId</code> field, 
 * if the {@link ArticleFile} already exist, or <code>tempFileUploadId</code>,
 * which is the id of new uploaded {@link TempFileUpload}, which should be moved
 * and created as {@link ArticleFile}
 * @author Mihail Merkov
 * @author Kalin Primov
 */
public class ArticleFileDTO {
	private Long articleFileId;
	private Long tempFileUploadId;
	private String fileName;
	private Long articleId;	
	
	public ArticleFileDTO() {}

	public ArticleFileDTO(Long articleFileId, String fileName, Long articleId) {
		this.articleFileId = articleFileId;
		this.fileName = fileName;
		this.articleId = articleId;
	}

	public Long getArticleFileId() {
		return articleFileId;
	}	
	
	public void setArticleFileId(Long articleFileId) {
		this.articleFileId = articleFileId;
	}
	
	public Long getTempFileUploadId() {
		return tempFileUploadId;
	}
	
	public void setTempFileUploadId(Long tempFileUploadId) {
		this.tempFileUploadId = tempFileUploadId;
	}
	
	public String getFileName() {
		return fileName;
	}
	
	public void setFileName(String fileName) {
		this.fileName = fileName;
	}
	
	public Long getArticleId() {
		return articleId;
	}
	
	public void setArticleId(Long articleId) {
		this.articleId = articleId;
	}	
}
