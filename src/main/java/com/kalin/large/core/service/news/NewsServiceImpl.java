/**
 * 
 */
package com.kalin.large.core.service.news;

import com.proxiad.extranet.core.helpers.io.ProxiadExtranetFileUtil;
import com.proxiad.extranet.core.model.article.beans.ArticleFileDTO;
import com.proxiad.extranet.core.model.employee.Employee;
import com.proxiad.extranet.core.model.employee.beans.EmployeeNameDTO;
import com.proxiad.extranet.core.model.news.News;
import com.proxiad.extranet.core.model.news.beans.NewsDTO;
import com.proxiad.extranet.core.model.news.beans.NewsFilterCriteria;
import com.proxiad.extranet.core.model.notification.WebNotificationTypeEnum;
import com.proxiad.extranet.core.model.param.ParamName;
import com.proxiad.extranet.core.repository.employee.EmployeeDao;
import com.proxiad.extranet.core.repository.news.NewsDao;
import com.proxiad.extranet.core.repository.news.NewsSeenByDao;
import com.proxiad.extranet.core.service.article.CommonArticleService;
import com.proxiad.extranet.core.service.error.ErrorCode;
import com.proxiad.extranet.core.service.exception.BusinessLogicException;
import com.proxiad.extranet.core.service.messenger.ExtranetMessengerService;
import com.proxiad.extranet.core.service.notification.WebNotificationService;
import com.proxiad.extranet.core.service.param.ParameterService;
import com.proxiad.extranet.core.service.security.SecurityService;
import org.apache.commons.lang3.math.NumberUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.io.File;
import java.util.Date;
import java.util.Set;
import java.util.stream.Collectors;


/**
 * News service manages {@link News} entity and its primary data
 *
 */
@Service
public class NewsServiceImpl implements NewsService {
	
	/*--------------------------------------------------- CONSTANTS --------------------------------------------------*/
	private static final String DESCRIPTION_LENGTH_ERROR_MESSAGE = "The description length of the news should be no more than 200 characters.";
	private static final String DESCRIPTION_LENGTH_TOO_SHORT_ERROR_MESSAGE = "The description length of the news should be no less than 20 characters.";
	private static final String DESCRIPTION_REQUIRED_FIELD_ERROR_MESSAGE = "The description is required field";
	private static final String ID_REQUIRED_ERROR_MESSAGE = "ID is required in News.";
	private static final int MAXIMUM_DESCRIPTION_LENGTH = 200;
	private static final int MINIMUM_DESCRIPTION_LENGTH = 20;

	/*-------------------------------------------------- REPOSITORIES ------------------------------------------------*/
	@Autowired
	private NewsDao newsDao;
	
	@Autowired
	private NewsSeenByDao newsSeenByDao;
	
	@Autowired
	private EmployeeDao employeeDao;
	
	/*---------------------------------------------------- SERVICES --------------------------------------------------*/
	
	@Autowired
	private CommonArticleService commonArticleService;
	
	@Autowired
	private WebNotificationService webNotificationService;
	
	@Autowired
	private ExtranetMessengerService extranetMessengerService;
	
	@Autowired
	private SecurityService securityService;
	
	@Autowired
	private ParameterService parameterService;
		
	/*--------------------------------------------------- FACTORIES --------------------------------------------------*/
	@Autowired
	private NewsFactory newsFactory;

	/*------------------------------------------------------ API -----------------------------------------------------*/
	/**
	 * @see com.proxiad.extranet.core.service.news.NewsService#listAllNewsOfLoggedInUser()
	 */
	@Override
	public Set<NewsDTO> listAllNewsOfLoggedInUser() {
		return newsDao.listAllOrderByTitleBy(securityService.getLoggedInUser().getUserId());
	}
	
	/**
	 * @throws BusinessLogicException 
	 * @see com.proxiad.extranet.core.service.news.NewsService#load(Long)
	 */
	@Override
	public NewsDTO load(final Long id) throws BusinessLogicException {
		if(id == null){
			throw new BusinessLogicException(ErrorCode.News.NEWS_NOT_FOUND, "There is no News with id: " + id);
		}

		News news = newsDao.get(id);

		if(news == null) {
			throw new BusinessLogicException(ErrorCode.News.NEWS_NOT_FOUND, "There is no News with id: " + id);
		}

		return newsFactory.createFrom(news);
	}

	/**
	 * @see com.proxiad.extranet.core.service.client.NewsService#deleteNews(Long)
	 */
	@Transactional(rollbackFor = BusinessLogicException.class)
	@Override
	public void deleteNews(final Long newsId) throws DataIntegrityViolationException, BusinessLogicException {
		News news = newsDao.get(newsId);
		File newsPath = new File(parameterService.getGlobalParamAsString(ParamName.EXTRANET_REPO_PATH),parameterService.getGlobalParamAsString(ParamName.NEWS_DATA_PATH));
		ProxiadExtranetFileUtil.deleteDirectory(new File(newsPath.getAbsolutePath(), newsId.toString()));
		if(news == null){
			throw new BusinessLogicException(ErrorCode.News.NEWS_NOT_FOUND, "There is no News with id " + newsId);
		}

		newsDao.delete(news);
	}

	/**
	 * Check whether the news is for save or for update
	 */
	@Override
	@Transactional
	public Long saveOrUpdateNewsContent(final NewsDTO newsDTO) throws BusinessLogicException {
		return newsDTO.getId() == null ? storeNews(newsDTO) : updateNewsContent(newsDTO);
	}

	/**
	 * Updates the metadata of news
	 */
	@Override
	@Transactional
	public Long updateNewsMetadata(final NewsDTO newsDTO) throws BusinessLogicException {
		News news = newsDao.get(newsDTO.getId());

		if(news == null){
			throw new BusinessLogicException(ErrorCode.News.NEWS_NOT_FOUND, "There is no News with id " + newsDTO.getId());
		}
		if (newsDTO.getImage() != null) {
			commonArticleService.updateArticleImage(news, newsDTO.getImage());
		}
		commonArticleService.updateArticleTags(news, newsDTO.getTags());
		Set<Long> employeeIds = newsDTO.getTargetEmployees().stream().mapToLong(employee -> employee.getId()).boxed().collect(Collectors.toSet());
		commonArticleService.updateArticleTargetGroup(news, employeeIds, newsDTO.getTargetOffices());
		commonArticleService.updateNotificationType(news, newsDTO.getNotificationType());
		commonArticleService.updateDates(news, newsDTO.getStartDate(), newsDTO.getEndDate());
		updateDescription(news, newsDTO.getShortDescription());

		newsDao.update(news);

		return news.getId();
	}

	/**
	 * @see com.proxiad.extranet.core.service.news.NewsService#publish(Long)
	 */
	@Override
	@Transactional
	public boolean publish(final Long newsId) throws BusinessLogicException {
		News news = newsDao.get(newsId);

		if(news == null){
			throw new BusinessLogicException(ErrorCode.News.NEWS_NOT_FOUND, "There is no News with id " + newsId);
		}

		commonArticleService.validateArticleForPublish(news);
		validateNews(news);
		return commonArticleService.updateStatus(news);
	}

	/**
	 * @see com.proxiad.extranet.core.service.news.NewsService#listSeenByEmployees(Long)
	 */
	@Override
	public Set<EmployeeNameDTO> listSeenByEmployees(final Long articleId) {
		return newsSeenByDao.listEmployeesByArticleSeen(articleId);
	}
	
	/**
	 * @throws BusinessLogicException 
	 * @see com.proxiad.extranet.core.service.news.NewsService#listCurrentNews()
	 */
	@Override
	public Set<NewsDTO> listCurrentNews(final NewsFilterCriteria filterCriteria) throws BusinessLogicException {
		return newsDao.listCurrentNews(employeeDao.get(securityService.getLoggedInUser().getUserId()), new Date(), filterCriteria);
	}
	@Override
	@Transactional
	public void markNewsAsSeen(final Long newsId) {
		News news = newsDao.get(newsId);
		Long loggedUserId = securityService.getLoggedInUser().getUserId();
		if(news.getEmployee().getId() != loggedUserId && news.getSeenBy().stream().filter(seenBy -> seenBy.getPk().getEmployee().getId().equals(loggedUserId)).count()== NumberUtils.LONG_ZERO) {
			news.addSeenBy(employeeDao.get(loggedUserId));
			newsDao.update(news);
		}
	}

	/**
	 * @see com.proxiad.extranet.core.service.news.NewsService#publishPendingNews(Date)
	 */
	@Override
	public void publishPendingNews(final Date currentDate) throws BusinessLogicException {
		Set<Long> idsOfNewsSetForPublish = newsDao.findAllNewsReadyForPublish(currentDate);
		for (Long newsId : idsOfNewsSetForPublish) {
			publish(newsId);
		}
	}
	
	/**
	 * store news in the database
	 * @param newsDTO
	 * @return
	 * @throws BusinessLogicException
	 */
	private Long storeNews(final NewsDTO newsDTO) throws BusinessLogicException {
		Employee employee =  employeeDao.get(newsDTO.getIdUser());
		News news = newsFactory.createFrom(newsDTO, employee);
		newsDao.save(news);
		commonArticleService.updateArticleFiles(news, newsDTO.getArticleFiles().toArray(new ArticleFileDTO[newsDTO.getArticleFiles().size()]));
		return news.getId();
	}
	
	/**
	 * Updates only the content, title and subtitle of news
	 * @param newsDTO
	 * @return newsId {@link Long}
	 * @throws BusinessLogicException
	 */
	private Long updateNewsContent(final NewsDTO newsDTO) throws BusinessLogicException {
		News news = newsDao.get(newsDTO.getId());
		if(news == null){
			throw new BusinessLogicException(ErrorCode.News.NEWS_NOT_FOUND, "There is no News with id " + newsDTO.getId());
		}
		news.setTitle(newsDTO.getTitle());
		news.setSubtitle(newsDTO.getSubtitle());
		news.setBody(newsDTO.getBody());
		commonArticleService.updateArticleFiles(news, newsDTO.getArticleFiles().toArray(new ArticleFileDTO[newsDTO.getArticleFiles().size()]));
		if (newsDTO.getDeletedFiles().size() > 0) {
			for (ArticleFileDTO articleFileDTO : newsDTO.getDeletedFiles()) {
				commonArticleService.deleteFile(articleFileDTO);
				news.getArticleFiles().removeIf(file -> file.getId().equals(articleFileDTO.getArticleFileId()));
			}
		}
		newsDao.update(news);
		return news.getId();
	}
	
	/**
	 * checks if news is with valid status for publishing
	 * @param news
	 * @throws BusinessLogicException
	 */
	private void validateNews(final News news) throws BusinessLogicException {
		if (news.getId() == null) {
			throw new BusinessLogicException(ErrorCode.News.ID_REQUIRED_FIELD, ID_REQUIRED_ERROR_MESSAGE);
		} else if(news.getShortDescription() != null && news.getShortDescription().length() > MAXIMUM_DESCRIPTION_LENGTH) {
			throw new BusinessLogicException(ErrorCode.News.DESCRIPTION_LENGTH_TOO_LONG, DESCRIPTION_LENGTH_ERROR_MESSAGE);
		}
	}
	
	/**
	 * Update short description of a {@link News}
	 * @param news
	 * @param shortDescription
	 */
	private void updateDescription(final News news, final String shortDescription) throws BusinessLogicException {
		if (shortDescription == null || shortDescription.trim().length() == 0) {
			throw new BusinessLogicException(ErrorCode.News.DESCRIPTION_REQUIRED_FIELD, DESCRIPTION_REQUIRED_FIELD_ERROR_MESSAGE);
		} else if(shortDescription.length() > MAXIMUM_DESCRIPTION_LENGTH) {
			throw new BusinessLogicException(ErrorCode.News.DESCRIPTION_LENGTH_TOO_LONG, DESCRIPTION_LENGTH_ERROR_MESSAGE);
		} else if (shortDescription.trim().length() < MINIMUM_DESCRIPTION_LENGTH) {
			throw new BusinessLogicException(ErrorCode.News.DESCRIPTION_LENGTH_TOO_SHORT, DESCRIPTION_LENGTH_TOO_SHORT_ERROR_MESSAGE);
		}
		
		news.setShortDescription(shortDescription);
	}
	
	/**
	 * Helper method for sending of notifications to the target employees
	 * @param news
	 */
	private void sendNotificationToTargetEmployees(final News news) {
		switch(news.getNotificationType()) {
		case WEB:
			webNotificationService.createWebNotificationsForArticle(news, WebNotificationTypeEnum.NEWS);
			break;
		case MAIL:
			extranetMessengerService.sendMailNotificationForCreatedNewsToTargetEmployees(news);
			break;
		default:
			webNotificationService.createWebNotificationsForArticle(news, WebNotificationTypeEnum.NEWS);
			extranetMessengerService.sendMailNotificationForCreatedNewsToTargetEmployees(news);
		}
	}	
}
