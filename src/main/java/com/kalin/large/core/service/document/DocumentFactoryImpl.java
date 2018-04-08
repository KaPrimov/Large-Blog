package com.kalin.large.core.service.document;

import com.kalin.large.core.model.document.Document;
import org.springframework.stereotype.Component;

import java.util.Date;

@Component
public class DocumentFactoryImpl implements DocumentFactory {
	/**
	 * @see DocumentFactory#create(String, String, String)
	 */
	@Override
	public Document create(final String name, final String fileType, final String fileName) {
		Document document = new Document();
		document.setName(name);
		document.setFileType(fileType);
		document.setFileName(fileName);
		document.setSubmitDate(new Date());

		return document;
	}
}
