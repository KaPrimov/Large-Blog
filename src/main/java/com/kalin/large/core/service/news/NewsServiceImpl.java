/**
 * 
 */
package com.kalin.large.core.service.news;

import com.kalin.large.core.helpers.io.LargeFileUtil;
import com.kalin.large.core.model.article.beans.ArticleFileDTO;
import com.kalin.large.core.model.news.News;
import com.kalin.large.core.model.news.beans.NewsDTO;
import com.kalin.large.core.model.news.beans.NewsFilterCriteria;
import com.kalin.large.core.model.param.ParamName;
import com.kalin.large.core.model.user.User;
import com.kalin.large.core.model.user.beans.UserBasicDTO;
import com.kalin.large.core.repository.news.NewsRepository;
import com.kalin.large.core.repository.news.NewsSeenByRepository;
import com.kalin.large.core.repository.user.UserRepository;
import com.kalin.large.core.service.article.CommonArticleService;
import com.kalin.large.core.service.error.ErrorCode;
import com.kalin.large.core.service.exception.BusinessLogicException;
import com.kalin.large.core.service.param.ParameterService;
import com.kalin.large.core.service.security.SecurityService;
import org.apache.commons.lang3.math.NumberUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.io.File;
import java.util.Date;
import java.util.Set;


/**
 * News service manages {@link News} entity and its primary data
 *
 */
@Service
@Transactional
public class NewsServiceImpl implements NewsService {
	
	/*--------------------------------------------------- CONSTANTS --------------------------------------------------*/
	private static final String DESCRIPTION_LENGTH_ERROR_MESSAGE = "The description length of the news should be no more than 200 characters.";
	private static final String DESCRIPTION_LENGTH_TOO_SHORT_ERROR_MESSAGE = "The description length of the news should be no less than 20 characters.";
	private static final String DESCRIPTION_REQUIRED_FIELD_ERROR_MESSAGE = "The description is required field";
	private static final String ID_REQUIRED_ERROR_MESSAGE = "ID is required in News.";
	private static final int MAXIMUM_DESCRIPTION_LENGTH = 200;
	private static final int MINIMUM_DESCRIPTION_LENGTH = 20;

	/*-------------------------------------------------- REPOSITORIES ------------------------------------------------*/

	private final NewsRepository newsRepository;

	private final NewsSeenByRepository newsSeenByRepository;

	private final UserRepository userRepository;
	
	/*---------------------------------------------------- SERVICES --------------------------------------------------*/

	private final CommonArticleService commonArticleService;

	private final SecurityService securityService;

	private final ParameterService parameterService;
		
	/*--------------------------------------------------- FACTORIES --------------------------------------------------*/

	private final NewsFactory newsFactory;

	@Autowired
	public NewsServiceImpl(NewsRepository newsRepository, NewsSeenByRepository newsSeenByRepository, UserRepository userRepository, CommonArticleService commonArticleService, SecurityService securityService, ParameterService parameterService, NewsFactory newsFactory) {
		this.newsRepository = newsRepository;
		this.newsSeenByRepository = newsSeenByRepository;
		this.userRepository = userRepository;
		this.commonArticleService = commonArticleService;
		this.securityService = securityService;
		this.parameterService = parameterService;
		this.newsFactory = newsFactory;
	}

	/*------------------------------------------------------ API -----------------------------------------------------*/
	/**
	 * @see com.kalin.large.core.service.news.NewsService#listAllNewsOfLoggedInUser()
	 */
	@Override
	public Set<NewsDTO> listAllNewsOfLoggedInUser() {
		return newsRepository.listAllOrderByTitleBy(securityService.getLoggedInUser().getId());
	}
	
	/**
	 * @throws BusinessLogicException 
	 * @see com.kalin.large.core.service.news.NewsService#load(Long)
	 */
	@Override
	public NewsDTO load(final Long id) throws BusinessLogicException {
		if(id == null){
			throw new BusinessLogicException(ErrorCode.News.NEWS_NOT_FOUND, "Specify id for the news");
		}

		News news = newsRepository.get(id);

		if(news == null) {
			throw new BusinessLogicException(ErrorCode.News.NEWS_NOT_FOUND, "There is no News with id: " + id);
		}
		return newsFactory.createFrom(news);
	}

	/**
	 * @see com.kalin.large.core.service.news.NewsService#deleteNews(Long)
	 */
	@Transactional(rollbackFor = BusinessLogicException.class)
	@Override
	public void deleteNews(final Long newsId) throws DataIntegrityViolationException, BusinessLogicException {
		News news = newsRepository.get(newsId);
		File newsPath = new File(parameterService.getGlobalParamAsString(ParamName.LARGE_REPO_PATH),parameterService.getGlobalParamAsString(ParamName.PEOPLE_DATA_PATH));
		LargeFileUtil.deleteDirectory(new File(newsPath.getAbsolutePath(), newsId.toString()));

		if(news == null) {
			throw new BusinessLogicException(ErrorCode.News.NEWS_NOT_FOUND, "There is no News with id " + newsId);
		}

		newsRepository.delete(news);
	}

	/**
	 * Check whether the news is for save or for update
	 */
	@Override
	public Long saveOrUpdateNewsContent(final NewsDTO newsDTO) throws BusinessLogicException {
		return newsDTO.getId() == null ? storeNews(newsDTO) : updateNewsContent(newsDTO);
	}

	/**
	 * Updates the metadata of news
	 */
	@Override
	public Long updateNewsMetadata(final NewsDTO newsDTO) throws BusinessLogicException {
		News news = newsRepository.get(newsDTO.getId());

		if(news == null) {
			throw new BusinessLogicException(ErrorCode.News.NEWS_NOT_FOUND, "There is no News with id " + newsDTO.getId());
		}
		if (newsDTO.getImage() != null) {
			commonArticleService.updateArticleImage(news, newsDTO.getImage());
		}
		commonArticleService.updateArticleTags(news, newsDTO.getTags());

		commonArticleService.updateDates(news, newsDTO.getStartDate(), newsDTO.getEndDate());
		updateDescription(news, newsDTO.getShortDescription());

		newsRepository.update(news);

		return news.getId();
	}

	/**
	 * @see com.kalin.large.core.service.news.NewsService#publish(Long)
	 */
	@Override
	public boolean publish(final Long newsId) throws BusinessLogicException {
		News news = newsRepository.get(newsId);

		if(news == null) {
			throw new BusinessLogicException(ErrorCode.News.NEWS_NOT_FOUND, "There is no News with id " + newsId);
		}
		commonArticleService.validateArticleForPublish(news);
		validateNews(news);
		return commonArticleService.updateStatus(news);
	}

	/**
	 * @see com.kalin.large.core.service.news.NewsService#listSeenByEmployees(Long)
	 */
	@Override
	public Set<UserBasicDTO> listSeenByEmployees(final Long articleId) {
		return newsSeenByRepository.listEmployeesByArticleSeen(articleId);
	}

	/**
	 * @throws BusinessLogicException
	 * @see com.kalin.large.core.service.news.NewsService#listCurrentNews(NewsFilterCriteria)
	 */
	@Override
	public Set<NewsDTO> listCurrentNews(final NewsFilterCriteria filterCriteria) throws BusinessLogicException {
		return newsRepository.listCurrentNews(new Date(), filterCriteria);
	}
	@Override
	public void markNewsAsSeen(final Long newsId) {
		News news = newsRepository.get(newsId);

		Long loggedUserId = securityService.getLoggedInUser().getId();
		if(!news.getUser().getId().equals(loggedUserId) && news.getSeenBy().stream().filter(seenBy -> seenBy.getPk().getUser().getId().equals(loggedUserId)).count()== NumberUtils.LONG_ZERO) {
			news.addSeenBy(userRepository.getOne(loggedUserId));
			newsRepository.update(news);
		}
	}

	/**
	 * @see com.kalin.large.core.service.news.NewsService#publishPendingNews(Date)
	 */
	@Override
	public void publishPendingNews(final Date currentDate) throws BusinessLogicException {
		Set<Long> idsOfNewsSetForPublish = newsRepository.findAllNewsReadyForPublish(currentDate);
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
		User user =  userRepository.getOne(newsDTO.getIdUser());
		News news = newsFactory.createFrom(newsDTO, user);
		newsRepository.save(news);
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
		News news = newsRepository.get(newsDTO.getId());

		if(news == null) {
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
		newsRepository.update(news);
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
}
