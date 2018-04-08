package com.kalin.large.core.model.document;

import javax.persistence.*;
import java.util.Date;

/**
 * Entity representing the data for one employee document from its personal record.
 *
 */
@Entity
@Table(name = "DOCUMENT")
public class Document {
	@Id
	@Column(name = "ID_DOCUMENT")
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@Column(name = "NAME")
	private String name;

	@Column(name = "FILE_TYPE")
	private String fileType;

	@Column(name = "FILE_NAME")
	private String fileName;

	@Column(name = "SUBMIT_DATE")
	private Date submitDate;

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

	/**
	 * @return the {@link String} value of fileType
	 */
	public String getFileType() {
		return fileType;
	}

	/**
	 * @param fileType to set
	 */
	public void setFileType(String fileType) {
		this.fileType = fileType;
	}

	/**
	 * @return the {@link String} value of fileName
	 */
	public String getFileName() {
		return fileName;
	}

	/**
	 * @param fileName to set
	 */
	public void setFileName(String fileName) {
		this.fileName = fileName;
	}

	/**
	 * @return the {@link Date} value of submitDate
	 */
	public Date getSubmitDate() {
		return submitDate;
	}

	/**
	 * @param submitDate to set
	 */
	public void setSubmitDate(Date submitDate) {
		this.submitDate = submitDate;
	}

	/**
	 * @see Object#equals(Object)
	 */
	@Override
	public boolean equals(Object o) {
		if (this == o)
			return true;
		if (o == null || getClass() != o.getClass())
			return false;

		Document document = (Document) o;

		if (!id.equals(document.id))
			return false;
		if (!name.equals(document.name))
			return false;
		if (!fileType.equals(document.fileType))
			return false;
		if (!fileName.equals(document.fileName))
			return false;

		return submitDate.equals(document.submitDate);
	}

	/**
	 * @see Object#hashCode()
	 */
	@Override
	public int hashCode() {
		int result = id.hashCode();
		result = 31 * result + name.hashCode();
		result = 31 * result + fileType.hashCode();
		result = 31 * result + fileName.hashCode();
		result = 31 * result + submitDate.hashCode();
		return result;
	}
}
