package com.proxiad.extranet.core.model.temp;

import java.io.File;
import java.io.Serializable;
import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

/**
 * This entity will manage the parameters as entity 
 * @author Mirela Vlaeva
 */
@Entity
@Table(name = "TEMP_FILE_UPLOAD")
public class TempFileUpload implements Serializable {
	
	private static final long serialVersionUID = -1429759379067393640L;

	@Id
	@Column(name = "ID_TEMP_FILE_UPLOAD")
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	
	@Column(name = "FILE_PATH")
	private String filePath;
	
	@Column(name = "SESSION_ID")
	private String sessionId;
	
	@Column(name = "MIME_TYPE")
	private String mimeType;		
	
	@Column(name = "NAME")
	private String name;
	
	@Column(name = "CREATION_DATE")
	private Date creationDate;

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

	/**
	 * @return the sessionId
	 */
	public String getSessionId() {
		return sessionId;
	}

	/**
	 * @param sessionId the sessionId to set
	 */
	public void setSessionId(String sessionId) {
		this.sessionId = sessionId;
	}

	/**
	 * @return the mimeType
	 */
	public String getMimeType() {
		return mimeType;
	}

	/**
	 * @param mimeType the mimeType to set
	 */
	public void setMimeType(String mimeType) {
		this.mimeType = mimeType;
	}

	/**
	 * @return the name
	 */
	public String getName() {
		return name;
	}

	/**
	 * @param name the name to set
	 */
	public void setName(String name) {
		this.name = name;
	}

	/**
	 * @return the creationDate
	 */
	public Date getCreationDate() {
		return creationDate;
	}

	/**
	 * @param creationDate the creationDate to set
	 */
	public void setCreationDate(Date creationDate) {
		this.creationDate = creationDate;
	}
	
	public String getAbsoluteFullPath() {
		return getFilePath() + File.separator + getName();
	}

}
