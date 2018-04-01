package com.proxiad.extranet.core.model.article.beans;

import java.io.Serializable;
import java.util.Date;
import java.util.LinkedHashSet;
import java.util.Set;
import java.util.stream.Collectors;

import com.proxiad.extranet.core.model.article.Article;
import com.proxiad.extranet.core.model.article.ArticleNotificationTypeEnum;
import com.proxiad.extranet.core.model.article.ArticleStatusEnum;
import com.proxiad.extranet.core.model.employee.Employee;
import com.proxiad.extranet.core.model.employee.beans.EmployeeBasicDTO;
import com.proxiad.extranet.core.model.employee.beans.EmployeeNameDTO;

/**
 * Created on 08.12.2017 г.
 *
 * @author Kalin Primov <k.primov@proxiad.com>
 */
public abstract class ArticleDTO implements Serializable {
	/**
	 * Default serialVersionUID
	 */
	private static final long serialVersionUID = 488488944234821792L;
	
	protected Long id;
	protected Long idUser;
	protected EmployeeNameDTO employee;
	protected String title;
	protected String subtitle;
	protected Date startDate;
	protected Date endDate;
	protected String body;
	protected String imagePath;
	protected ArticleImageDTO image;
	protected ArticleNotificationTypeEnum notificationType;
	protected ArticleStatusEnum status;
	protected boolean directPublish;
	protected ArticleTagDTO[] tags = {};
	protected Set<EmployeeBasicDTO> targetEmployees = new LinkedHashSet<>();
	protected Set<Long> targetOffices = new LinkedHashSet<>();
	protected Set<ArticleFileDTO> articleFiles = new LinkedHashSet<>();
	protected Set<ArticleFileDTO> deletedFiles = new LinkedHashSet<>();
	
	/**
	 * Default constructor
	 */
	protected ArticleDTO() { }
	
	protected ArticleDTO(final Article article) {
		this(article.getId(), article.getEmployee(), article.getTitle(), article.getSubtitle(), article.getStartDate(), article.getEndDate(), 
				article.getBody(), article.getImagePath(), article.getNotificationType(), article.getStatus());
		this.tags = article.getTags().stream().map(articleTag -> new ArticleTagDTO(articleTag.getPk().getTag().getId(), articleTag.getPk().getTag().getName())).toArray(size -> new ArticleTagDTO[size]); 
		this.articleFiles = article.getArticleFiles().stream().map(file -> new ArticleFileDTO(file.getId(), file.getFilePath(), file.getArticle().getId())).collect(Collectors.toSet());

		if (article.getTargetEmployees().size() > 0) {
			this.setTargetEmployees(article.getTargetEmployees().stream().map(targetEmployee -> new EmployeeBasicDTO(targetEmployee.getPk().getEmployee())).collect(Collectors.toSet()));
		} else {
			this.setTargetOffices(article.getTargetOffices().stream().map(office -> office.getPk().getOffice().getId()).collect(Collectors.toSet()));
		}
	}
	
	/**
	 * 
	 * @param id
	 * @param employee
	 * @param title
	 * @param subtitle
	 * @param startDate
	 * @param endDate
	 * @param body
	 * @param imagePath
	 * @param notificationType
	 * @param status
	 */
	protected ArticleDTO(final Long id,  final Employee employee, final String title, final String subtitle, final Date startDate, final Date endDate, final String body,
			final String imagePath, final ArticleNotificationTypeEnum notificationType, final ArticleStatusEnum status){
		this(id, title, subtitle, startDate, endDate, body, imagePath, notificationType, status);
		this.employee = new EmployeeNameDTO(employee.getId(), employee.getFirstName(), employee.getMiddleName(), employee.getLastName());	
	}
	
	/**
	 * 
	 * @param id
	 * @param title
	 * @param subtitle
	 * @param startDate
	 * @param endDate
	 * @param body
	 * @param imagePath
	 * @param notificationType
	 * @param status
	 */
	protected ArticleDTO(final Long id, final String title, final String subtitle, final Date startDate, final Date endDate, final String body,
			final String imagePath, final ArticleNotificationTypeEnum notificationType, final ArticleStatusEnum status){
		this.id = id;
		this.title = title;
		this.subtitle = subtitle;
		this.body = body;
		this.startDate = startDate;
		this.endDate = endDate;
		this.imagePath = imagePath;
		this.notificationType = notificationType;
		this.status = status;
	}
	
	/**
	 * 
	 * @param id
	 * @param title
	 */
	protected ArticleDTO(final Long id, final String title){
		this.id = id;
		this.title = title;
	}
	
	
	/**
	 * 
	 * @return the {@link Long} value of id
	 */
	public Long getId() {
		return id;
	}
	
	/**
	 * 
	 * @return the {@link Long} value of id
	 */
	public void setId(Long id) {
		this.id = id;
	}

	/**
	 * @param id to set
	 */
	public Long getIdUser() {
		return idUser;
	}

	/**
	 * @param idUser to set
	 */
	public void setIdUser(Long idUser) {
		this.idUser = idUser;
	}
	
	/**
	 * @return the {@link String} value of title
	 */
	public String getTitle() {
		return title;
	}
	
	/**
	 * @param title to set
	 */
	public void setTitle(String title) {
		this.title = title;
	}
	
	/**
	 * @return the {@link String} value of subtitle
	 */
	public String getSubtitle() {
		return subtitle;
	}
	
	/**
	 * @param subtitle to set
	 */
	public void setSubtitle(String subtitle) {
		this.subtitle = subtitle;
	}
	
	/**
	 * @return the {@link Date} value of start date
	 */
	public Date getStartDate() {
		return startDate;
	}

	/**
	 * @param startDate to set
	 */
	public void setStartDate(Date startDate) {
		this.startDate = startDate;
	}
	
	/**
	 * @return the {@link Date} value of start date
	 */
	public Date getEndDate() {
		return endDate;
	}
	
	/**
	 * @param endDate to set
	 */
	public void setEndDate(Date endDate) {
		this.endDate = endDate;
	}
	
	/**
	 * @return the {@link String} value of the body
	 */
	public String getBody() {
		return body;
	}
	
	/**
	 * @param body to set
	 */
	public void setBody(String body) {
		this.body = body;
	}

	/**
	 * @return the {@link String} value of image path
	 */
	public String getImagePath() {
		return imagePath;
	}

	/**
	 * @param imagePath to set
	 */
	public void setImagePath(String imagePath) {
		this.imagePath = imagePath;
	}
	
	
	/**
	 * @return the {@link ArticleImageDTO} value of image
	 */
	public ArticleImageDTO getImage() {
		return image;
	}
	
	/**
	 * @param image to set
	 */
	public void setImage(ArticleImageDTO image) {
		this.image = image;
	}

	/**
	 * @return the {@link ArticleNotificationTypeEnum} value of notification type
	 */
	public ArticleNotificationTypeEnum getNotificationType() {
		return notificationType;
	}

	/**
	 * @param notificationType to set
	 */
	public void setNotificationType(ArticleNotificationTypeEnum notificationType) {
		this.notificationType = notificationType;
	}
	
	/**
	 * @return the {@link ArticleNotificationTypeEnum} value of status
	 */
	public ArticleStatusEnum getStatus() {
		return status;
	}

	/**
	 * @param status to set
	 */
	public void setStatus(ArticleStatusEnum status) {
		this.status = status;
	}
	
	/**
	 * @return the {@link Boolean} value of isDirectPublish
	 */
	public boolean isDirectPublish() {
		return directPublish;
	}
	
	/**
	 * @param directPublish to set
	 */
	public void setDirectPublish(boolean directPublish) {
		this.directPublish = directPublish;
	}

	/**
	 * @return the {@link Set<ArticleTagDTO>} value of tags
	 */
	public ArticleTagDTO[] getTags() {
		return tags;
	}
	
	/**
	 * @param tags to set
	 */
	public void setTags(ArticleTagDTO[] tags) {
		this.tags = tags;
	}
	
	/**
	 * @return the {@link Set<Long>} value of the ids of all targeted employees
	 */
	public Set<EmployeeBasicDTO> getTargetEmployees() {
		return targetEmployees;
	}
	
	/**
	 * @param targetEmployees to set
	 */
	public void setTargetEmployees(Set<EmployeeBasicDTO> targetEmployees) {
		this.targetEmployees = targetEmployees;
	}

	/**
	 * @return the {@link Set<Long>} value of the ids of all targeted offices
	 */
	public Set<Long> getTargetOffices() {
		return targetOffices;
	}
	
	/**
	 * @param targetOffices to set
	 */
	public void setTargetOffices(Set<Long> targetOffices) {
		this.targetOffices = targetOffices;
	}
	/**
	 * @return the {@link EmployeeNameDTO} value of the employee
	 */
	public EmployeeNameDTO getEmployee() {
		return employee;
	}

	/**
	 * @param employee to set
	 */
	public void setEmployee(EmployeeNameDTO employee) {
		this.employee = employee;
	}

	/** 
	 * @return set of {@link ArticleFileDTO}
	 */
	public Set<ArticleFileDTO> getArticleFiles() {
		return articleFiles;
	}

	/**
	 * @param articleFiles to set
	 */
	public void setArticleFiles(Set<ArticleFileDTO> articleFiles) {
		this.articleFiles = articleFiles;
	}

	/** 
	 * @return set of {@link ArticleFileDTO}
	 */
	public Set<ArticleFileDTO> getDeletedFiles() {
		return deletedFiles;
	}

	/**
	 * @param deletedFiles to set
	 */
	public void setDeletedFiles(Set<ArticleFileDTO> deletedFiles) {
		this.deletedFiles = deletedFiles;
	}
	
}