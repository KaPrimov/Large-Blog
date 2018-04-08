package com.kalin.large.core.service.document;


import com.kalin.large.core.model.document.Document;

public interface DocumentFactory {
	/**
	 * Create {@link Document} entity from supplied parameters. Sets {@code submitDate} to current time stamp.
	 *
	 * @param name
	 * @param fileType
	 * @param fileName
	 * @return {@link Document} entity
	 */
	Document create(final String name, final String fileType, final String fileName);
}
