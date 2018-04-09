package com.kalin.large.core.service.news;

import com.proxiad.extranet.core.model.article.ArticleNotificationTypeEnum;
import com.proxiad.extranet.core.model.article.ArticleStatusEnum;
import com.proxiad.extranet.core.model.article.beans.ArticleImageDTO;
import com.proxiad.extranet.core.model.employee.Employee;
import com.proxiad.extranet.core.model.news.News;
import com.proxiad.extranet.core.model.news.beans.NewsDTO;
import com.proxiad.extranet.core.service.article.ArticleFileFactory;
import com.proxiad.extranet.core.service.employee.EmployeeFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.Date;
import java.util.stream.Collectors;


/**
 * Factory implementation for {@link News} entity
 * 
 * @author Kalin Primov
 * @author Mihail Merkov
 */
@Component
public class NewsFactoryImpl implements NewsFactory {
	
	/*--------------------------------------------------- FACTORIES --------------------------------------------------*/
	
	@Autowired
	private EmployeeFactory employeeFactory;
	@Autowired
	private ArticleFileFactory articleFileFactory;
	
	/*------------------------------------------------------ API -----------------------------------------------------*/

	/**
	 * @see com.proxiad.extranet.core.service.news.NewsFactory#createFrom(com.proxiad.extranet.core.model.news.beans.NewsDTO, com.proxiad.extranet.core.model.employee.Employee)
	 */
	@Override
	public News createFrom(final NewsDTO newsDTO, final Employee employee) {
		News news = new News();
		news.setBody(newsDTO.getBody());	
		news.setTitle(newsDTO.getTitle());
		news.setSubtitle(newsDTO.getSubtitle());
		news.setShortDescription(newsDTO.getShortDescription());
		news.setEmployee(employee);
		news.setStartDate(newsDTO.getStartDate() == null ? new Date() : newsDTO.getStartDate());
		news.setEndDate(newsDTO.getEndDate());
		news.setImagePath(newsDTO.getImagePath());
		news.setNotificationType(newsDTO.getNotificationType() == null ? ArticleNotificationTypeEnum.WEB : newsDTO.getNotificationType());
		news.setStatus(ArticleStatusEnum.DRAFT); 
		return news;
	}

	/**
	 * @see com.proxiad.extranet.core.service.news.NewsFactory#createFrom(com.proxiad.extranet.core.model.news.News)
	 */
	@Override
	public NewsDTO createFrom(final News news) {		
		NewsDTO newsDTO = new NewsDTO(news);
		if (news.getTargetEmployees().size() > 0) {
			newsDTO.setTargetEmployees(news.getTargetEmployees().stream().map(employee -> employeeFactory.createBasicEmployeeDTOFrom(employee.getPk().getEmployee())).collect(Collectors.toSet()));
		} else {
			newsDTO.setTargetOffices(news.getTargetOffices().stream().map(office -> office.getPk().getOffice().getId()).collect(Collectors.toSet()));
		}
		newsDTO.setShortDescription(news.getShortDescription());
		newsDTO.setArticleFiles(news.getArticleFiles().stream().map(file -> articleFileFactory.createDTOFrom(file)).collect(Collectors.toSet()));
		
		ArticleImageDTO imageDTO = new ArticleImageDTO();
		imageDTO.setId(news.getId());
		imageDTO.setImage(news.getImagePath());
		newsDTO.setImage(imageDTO);
		
		return newsDTO;
	}
}
