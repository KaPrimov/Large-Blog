package com.kalin.large.core.model.document.beans;

import org.springframework.web.multipart.MultipartFile;

import javax.validation.constraints.NotNull;

public class DocumentUploadDTO implements DocumentUpload {
	@NotNull
	private MultipartFile document;

	/**
	 * @return the {@link MultipartFile} value of document
	 */
	public MultipartFile getDocument() {
		return document;
	}
	/**
	 * @param document to set
	 */
	public void setDocument(MultipartFile document) {
		this.document = document;
	}
}
