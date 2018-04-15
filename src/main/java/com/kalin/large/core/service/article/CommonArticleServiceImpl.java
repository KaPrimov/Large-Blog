package com.kalin.large.core.service.article;

import com.kalin.large.core.helpers.datetime.LargeDateUtil;
import com.kalin.large.core.helpers.exception.ImageProcessingException;
import com.kalin.large.core.helpers.image.ImageProcessingHelper;
import com.kalin.large.core.helpers.io.LargeFileUtil;
import com.kalin.large.core.model.article.*;
import com.kalin.large.core.model.article.beans.ArticleFileDTO;
import com.kalin.large.core.model.article.beans.ArticleImageDTO;
import com.kalin.large.core.model.article.beans.ArticleTagDTO;
import com.kalin.large.core.model.param.ParamName;
import com.kalin.large.core.repository.article.ArticleFileRepository;
import com.kalin.large.core.repository.article.ArticleRepository;
import com.kalin.large.core.repository.article.ArticleTagRepository;
import com.kalin.large.core.repository.user.UserRepository;
import com.kalin.large.core.service.error.ErrorCode;
import com.kalin.large.core.service.exception.BusinessLogicException;
import com.kalin.large.core.service.param.ParameterService;
import com.kalin.large.core.service.tag.TagFactory;
import com.kalin.large.core.service.tag.TagService;
import com.kalin.large.core.service.temp.TempFileUploadService;
import org.apache.commons.io.IOUtils;
import org.apache.commons.lang3.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.io.BufferedInputStream;
import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.*;
import java.util.stream.Collectors;

/**
 * Common {@link Article} service manager
 */
@Service
@Transactional
public class CommonArticleServiceImpl implements CommonArticleService {
	
	/*--------------------------------------------------- CONSTANTS --------------------------------------------------*/
	private static final Logger logger = LoggerFactory.getLogger(CommonArticleServiceImpl.class);
	private static final String DEFAULT_ARTICLE_PHOTO_PIC_RESOURCE_PATH = "static/assets/images/default-photo.png";
	private static final String ID_REQUIRED_FIELD_ERROR_MESSAGE = "Every Article should have an ID.";
	private static final String TITLE_REQUIRED_FIELD_ERROR_MESSAGE = "Every Article should have a title.";
	private static final String BODY_REQUIRED_FIELD_ERROR_MESSAGE = "Every Article should have a body.";
	private static final String START_DATE_REQUIRED_FIELD_ERROR_MESSAGE = "Every Article should have a start date.";
	private static final String STATUS_REQUIRED_FIELD_ERROR_MESSAGE = "Every Article should have a status.";
	private static final String START_DATA_REQUIRED_ERROR_MESSAGE = "Start date is a required field";
	private static final String START_DATE_IN_THE_PAST_MESSAGE = "Start date can not be set to a date, which is in the past";
	private static final String ARTICLE_NOT_FOUND_ERROR_MESSAGE = "there is no article with the given id";
	private static final String DEFAULT_ARTICLE_IMAGE_RESOURCE_PATH = "static/assets/images/default-photo.png";
	private static final int MAX_ARTICLE_CONTENT_IMAGE_WIDTH_IN_PIXELS = 1000;
	private static final int MAX_ARTICLE_IMAGE_WIDTH_IN_PIXELS = 500;
	/*-------------------------------------------------- REPOSITORIES ------------------------------------------------*/
	private final ArticleRepository articleRepository;
	
	private final UserRepository userRepository;
	
	private final ArticleTagRepository articleTagRepository;
	
	private final ArticleFileRepository articleFileRepository;
	
	/*---------------------------------------------------- SERVICES --------------------------------------------------*/
	private final ParameterService parameterService;
	
	private final TagService tagService;

	private final TempFileUploadService tempFileUploadService;
	
	/*---------------------------------------------------- FACTORIES --------------------------------------------------*/
	private final TagFactory tagFactory;
	
	private final ArticleFileFactory articleFileFactory;

	@Autowired
	public CommonArticleServiceImpl(ArticleRepository articleRepository, UserRepository userRepository, ArticleTagRepository articleTagRepository, ArticleFileRepository articleFileRepository, 
									ParameterService parameterService, TagService tagService, TempFileUploadService tempFileUploadService, TagFactory tagFactory, ArticleFileFactory articleFileFactory) {
		this.articleRepository = articleRepository;
		this.userRepository = userRepository;
		this.articleTagRepository = articleTagRepository;
		this.articleFileRepository = articleFileRepository;
		this.parameterService = parameterService;
		this.tagService = tagService;
		this.tempFileUploadService = tempFileUploadService;
		this.tagFactory = tagFactory;
		this.articleFileFactory = articleFileFactory;
	}

	/*------------------------------------------------------ API -----------------------------------------------------*/
	
	/**
	 * @see com.kalin.large.core.service.article.CommonArticleService#findAllTagsFor(Long)
	 */
	@Override
	public Set<Tag> findAllTagsFor(final Long articleId) {
		return articleTagRepository.findAllTagsFor(articleId);
	}

	/**
	 * @see com.kalin.large.core.service.article.CommonArticleService#updateArticleTags(Article, ArticleTagDTO[])
	 */
	@Override
	public void updateArticleTags(final Article article, final ArticleTagDTO[] tagsDTO) throws BusinessLogicException {
		Set<ArticleTag> oldTargetTags = article.getTags();
		Set<ArticleTag> newTargetTags = new LinkedHashSet<>();

		if (tagsDTO == null || tagsDTO.length == 0) {
			for (ArticleTag articleTag : oldTargetTags) {
				this.articleTagRepository.delete(articleTag);
			}
			article.setTags(Collections.emptySet());
			return;
		}
		Set<Long> tagIds = Arrays.stream(tagsDTO).filter(tag -> tag.getId() != null).map(tag -> tag.getId()).collect(Collectors.toSet());
		for (ArticleTag articleTag : oldTargetTags) {
			if (tagIds != null && tagIds.size() != 0 && tagIds.stream().anyMatch(tagId -> tagId.equals(articleTag.getPk().getTag().getId()))) {
				newTargetTags.add(articleTag);
			} else {
				this.articleTagRepository.delete(articleTag);
			}
		}

		Set<Tag> tags = tagService.createTag(tagsDTO);

		for(Tag tag : tags){
			ArticleTag articleTag = tagFactory.createFrom(tag, article);
			newTargetTags.add(articleTag);
		}

		article.setTags(newTargetTags);
	}

	/**
	 * @see com.kalin.large.core.service.article.CommonArticleService#updateArticleFiles(Article, ArticleFileDTO[])
	 */
	@Override
	public void updateArticleFiles(final Article article, final ArticleFileDTO[] articleFilesDTO) throws BusinessLogicException {
		final File destinationFolder = getBasicArticleFolderCreateIfNotExists(article.getId());
		for (ArticleFileDTO articleFileDTO : articleFilesDTO) {
			if (articleFileDTO.getTempFileUploadId() != null && articleFileDTO.getArticleFileId() == null) {
				File savedFile = tempFileUploadService.moveTempFileTo(destinationFolder, articleFileDTO.getTempFileUploadId());
				ArticleFile articleFile = articleFileFactory.createEntityFrom(savedFile, article);
				articleFileRepository.save(articleFile);
				try {
					ImageProcessingHelper.resizeImageToMaxWidth(MAX_ARTICLE_CONTENT_IMAGE_WIDTH_IN_PIXELS, savedFile);
				} catch (IOException | ImageProcessingException e) {
					if (logger.isDebugEnabled()) {
						logger.debug("There was a problem with resizing of an ArticleImage with id: {}", articleFile.getId(), e);
					}
				}
			}
		}
	}

	/**
	 * @see com.kalin.large.core.service.article.CommonArticleService#validateArticleForPublish(Article)
	 */
	@Override
	public void validateArticleForPublish(final Article article) throws BusinessLogicException {
		if (article.getId() == null) {
			throw new BusinessLogicException(ErrorCode.Articles.ID_REQUIRED_FIELD, ID_REQUIRED_FIELD_ERROR_MESSAGE);
		} else if(article.getTitle() == null) {
			throw new BusinessLogicException(ErrorCode.Articles.TITLE_REQUIRED_FIELD, TITLE_REQUIRED_FIELD_ERROR_MESSAGE);
		} else if(article.getStartDate() == null) {
			throw new BusinessLogicException(ErrorCode.Articles.START_DATE_REQUIRED_FIELD, START_DATE_REQUIRED_FIELD_ERROR_MESSAGE);
		} else if(article.getBody() == null) {
			throw new BusinessLogicException(ErrorCode.Articles.BODY_REQUIRED_FIELD, BODY_REQUIRED_FIELD_ERROR_MESSAGE);
		} else if (article.getStatus() == null) {
			throw new BusinessLogicException(ErrorCode.Articles.STATUS_REQUIRED_FIELD, STATUS_REQUIRED_FIELD_ERROR_MESSAGE);
		}
	}

	/**
	 * @see com.kalin.large.core.service.article.CommonArticleService#updateArticleImage(Article, ArticleImageDTO)
	 */
	@Transactional(rollbackFor = BusinessLogicException.class)
	@Override
	public Long updateArticleImage(final Article article, final ArticleImageDTO newsImageDto) throws BusinessLogicException {
		if (article == null) {
			throw new BusinessLogicException(ErrorCode.News.NEWS_NOT_FOUND,	"Passed is null article.");
		}

		updateArticleImageFile(article, newsImageDto.getImage());

		articleRepository.saveAndFlush(article);

		return article.getId();
	}

	/**
	 * @see com.kalin.large.core.service.article.CommonArticleService#getArticlePhoto(Long)
	 */
	@Override
	public byte[] getArticlePhoto(final Long articleId) {
		Article article = articleRepository.getOne(articleId);
		BufferedInputStream bufferedInputStream = null;
		byte[] profilePictureRaw = null;
		byte[] defaultPictureRaw = null;
		try {
			bufferedInputStream = new BufferedInputStream(
					getClass().getClassLoader().getResourceAsStream(DEFAULT_ARTICLE_PHOTO_PIC_RESOURCE_PATH));
			defaultPictureRaw = IOUtils.toByteArray(bufferedInputStream);
		} catch (IOException e) {
			logger.error("Fail reading article's photo", e);
		} finally {
			IOUtils.closeQuietly(bufferedInputStream);
		}

		if (article == null || StringUtils.isBlank(article.getImagePath())) {
			return defaultPictureRaw;
		}

		File specificArticleFolder = getBasicArticleFolderCreateIfNotExists(articleId);

		File articlePhoto = new File(specificArticleFolder, article.getImagePath());

		if (!articlePhoto.exists() || !articlePhoto.isFile()) {
			return defaultPictureRaw;
		}

		try {
			bufferedInputStream = new BufferedInputStream(new FileInputStream(articlePhoto));
			profilePictureRaw = IOUtils.toByteArray(bufferedInputStream);
		} catch (IOException e) {
			logger.error("Fail reading article's photo", e);
			return defaultPictureRaw;
		} finally {
			IOUtils.closeQuietly(bufferedInputStream);
		}

		return profilePictureRaw;
	}
	
	/**
	 * @see com.kalin.large.core.service.article.CommonArticleServiceImpl#updateDates(Article, Date, Date)
	 */
	@Override
	public void updateDates(final Article article, final Date startDate, final Date endDate) throws BusinessLogicException {
		if (startDate == null) {
			throw new BusinessLogicException(ErrorCode.Articles.START_DATE_REQUIRED_FIELD, START_DATA_REQUIRED_ERROR_MESSAGE);
		}
		Calendar calendarStartDate = Calendar.getInstance();
		calendarStartDate.setTime(startDate);
		Calendar calendarEndDate = Calendar.getInstance();
		if (endDate != null) {
			calendarEndDate.setTime(endDate);
			article.setEndDate(LargeDateUtil.calculateAbsoluteEndOfTheDay(calendarEndDate).getTime());
		} else {
			article.setEndDate(null);
		}
		Calendar startDateMidnight = LargeDateUtil.calculateMidnight(calendarStartDate);
		article.setStartDate(startDateMidnight.getTime());
	}

	/**
	 * @see com.kalin.large.core.service.article.CommonArticleServiceImpl#getArticleImage(Long)
	 */
	@Override
	public byte[] getArticleImage(final Long articleId) {
		Article article = articleRepository.getOne(articleId);
		BufferedInputStream bufferedInputStream = null;
		byte[] articleImageRaw = null;
		byte[] defaultImageRaw = null;
		try {
			bufferedInputStream = new BufferedInputStream(getClass().getClassLoader().getResourceAsStream(DEFAULT_ARTICLE_IMAGE_RESOURCE_PATH));
			defaultImageRaw = IOUtils.toByteArray(bufferedInputStream);
		} catch (IOException e) {
			logger.error("Fail reading profile picture", e);
		} finally {
			IOUtils.closeQuietly(bufferedInputStream);
		}

		if (article == null || StringUtils.isBlank(article.getImagePath())) {
			return defaultImageRaw;
		}

		File specificArticleFolder = getBasicArticleFolderCreateIfNotExists(articleId);

		File articleImage = new File(specificArticleFolder, article.getImagePath());

		if (!articleImage.exists() || !articleImage.isFile()) {
			return defaultImageRaw;
		}

		try {
			bufferedInputStream = new BufferedInputStream(new FileInputStream(articleImage));
			articleImageRaw = IOUtils.toByteArray(bufferedInputStream);
		} catch (IOException e) {
			logger.error("Fail reading article image", e);
			return defaultImageRaw;
		} finally {
			IOUtils.closeQuietly(bufferedInputStream);
		}

		return articleImageRaw;
	}

	/**
	 * @see com.kalin.large.core.service.article.CommonArticleServiceImpl#getArticleFile(Long, Long)
	 */
	@Override
	public byte[] getArticleFile(final Long articleId, final Long articleFileId) {
		Article article = articleRepository.getOne(articleId);
		ArticleFile articleFile = articleFileRepository.getOne(articleFileId);
		BufferedInputStream bufferedInputStream = null;
		byte[] articleImageFileRaw = null;
		byte[] defaultImageRaw = null;
		try {
			bufferedInputStream = new BufferedInputStream(getClass().getClassLoader().getResourceAsStream(DEFAULT_ARTICLE_IMAGE_RESOURCE_PATH));
			defaultImageRaw = IOUtils.toByteArray(bufferedInputStream);
		} catch (IOException e) {
			// never will happen
			logger.error("Fail reading article file", e);
		} finally {
			IOUtils.closeQuietly(bufferedInputStream);
		}

		if (article == null || StringUtils.isBlank(articleFile.getFilePath())) {
			return defaultImageRaw;
		}

		File specificArticleFolder = getBasicArticleFolderCreateIfNotExists(articleId);

		File articleImage = new File(specificArticleFolder, articleFile.getFilePath());

		if (!articleImage.exists() || !articleImage.isFile()) {
			return defaultImageRaw;
		}

		try {
			bufferedInputStream = new BufferedInputStream(new FileInputStream(articleImage));
			articleImageFileRaw = IOUtils.toByteArray(bufferedInputStream);
		} catch (IOException e) {
			logger.error("Fail a picture", e);
			return defaultImageRaw;
		} finally {
			IOUtils.closeQuietly(bufferedInputStream);
		}

		return articleImageFileRaw;
	}

	/**
	 * @see com.kalin.large.core.service.article.CommonArticleService#deleteFile(ArticleFileDTO)
	 */
	@Override
	@Transactional
	public boolean deleteFile(ArticleFileDTO articleFileDTO) {
		ArticleFile articleFile = articleFileRepository.findArticleFileByFilePath(articleFileDTO.getFileName());
		
		
		File specificArticleFolder = getBasicArticleFolderCreateIfNotExists(articleFile.getArticle().getId());

		File articleImage = new File(specificArticleFolder, articleFile.getFilePath());
		try {
			Files.delete(Paths.get(articleImage.getAbsolutePath()));
			articleFileRepository.delete(articleFile);
			return true;
		} catch (IOException e) {
			return false;
		}
	}
	
	/**
	 * @see com.kalin.large.core.service.article.CommonArticleService#cancelPublishing(Long)
	 */
	@Override
	@Transactional
	public Boolean cancelPublishing(Long id) throws BusinessLogicException {
		Optional<Article> optionalArticle = articleRepository.findById(id);

		if (!optionalArticle.isPresent()) {
			throw new BusinessLogicException(ErrorCode.Articles.ARTICLE_NOT_FOUND, ARTICLE_NOT_FOUND_ERROR_MESSAGE);
		}

		Article article = optionalArticle.get();
		
		if (article.getStatus() != ArticleStatusEnum.PUBLISH_PENDING) {
			return false;
		}
		
		article.setStatus(ArticleStatusEnum.DRAFT);
		articleRepository.saveAndFlush(article);
		return true;
	}
	
	/**
	 * @see com.kalin.large.core.service.article.CommonArticleService#updateStatus(Article)
	 */
	@Override
	public boolean updateStatus(final Article article) throws BusinessLogicException {
		
		if (article.getStatus() == ArticleStatusEnum.PUBLISHED) {
			return false;
		}
		
		Calendar todaysDate = LargeDateUtil.calculateMidnight(Calendar.getInstance());
		Calendar startDate = Calendar.getInstance();
		startDate.setTime(article.getStartDate());
		if (startDate.after(todaysDate)) {
			article.setStatus(ArticleStatusEnum.PUBLISH_PENDING);
		} else if (todaysDate.equals(startDate)) {
			article.setStatus(ArticleStatusEnum.PUBLISHED);
		} else {
			throw new BusinessLogicException(ErrorCode.Articles.START_DATE_IN_THE_PAST, START_DATE_IN_THE_PAST_MESSAGE);
		}
		return true;
	}

	/**
	 *
	 * @param news {@link Article}
	 * @param picContent {@link String}
	 * @return the id of the updated {@link Article}
	 * @throws BusinessLogicException with the following error codes:
	 *                                <ul>
	 *                                <li>{@link ErrorCode.Articles#ARTICLE_NOT_FOUND} if there is no news with
	 *                                supplied {@link Article#id}</li>
	 *                                <li>{@link ErrorCode.Articles#FILE_ACCESS_DENIED} in case there is {@link SecurityException} while working
	 *                                with the profile picture file.</li>
	 *                                </ul>
	 */
	private void updateArticleImageFile(final Article news, final String picContent) throws BusinessLogicException {
		try {
			if (picContent != null) {
				if (!picContent.equalsIgnoreCase(news.getImagePath())) {
					deleteArticleImage(news);
					String articleImage;
					articleImage = LargeFileUtil.saveToImageFile(picContent, news.getId(), getBasicArticleFolderCreateIfNotExists(news.getId()), MAX_ARTICLE_IMAGE_WIDTH_IN_PIXELS);
					news.setImagePath(articleImage);
				}
			} else {
				deleteArticleImage(news);
			}
		} catch (SecurityException se) {
			throw new BusinessLogicException(ErrorCode.Articles.FILE_ACCESS_DENIED, "Access to the file system denied: " + se.getMessage(), se);
		} catch (ImageProcessingException ipe) {
			throw new BusinessLogicException(ErrorCode.UserService.FILE_IS_NOT_A_PICTURE, ipe.getMessage(), ipe);
		}
	}
	
	/**
	 * Returns the {@link File} with the basic {@link Article} directory, where
	 * will be deployed all {@link Article} specific resources
	 * 
	 * @param articleId
	 *            the id of desired {@link Article}
	 * @return {@link File}
	 */
	private File getBasicArticleFolderCreateIfNotExists(final Long articleId) {
		File baseRepositoryPath = LargeFileUtil.createFolderIfDoesNotExist(parameterService.getGlobalParamAsString(ParamName.LARGE_REPO_PATH));
		File articleDataFolder = LargeFileUtil.createFolderIfDoesNotExist(baseRepositoryPath, parameterService.getGlobalParamAsString(ParamName.NEWS_DATA_PATH));

		return LargeFileUtil.createFolderIfDoesNotExist(articleDataFolder, articleId.toString());
	}
	
	/**
	 * Delete image of an {@code article} by:
	 * <ul>
	 * <li>deleting the physical file</li>
	 * <li>setting the {@link Article#imagePath} attribute to
	 * {@code null}</li>
	 * </ul>
	 *
	 * The method is silent if no physical file exists - it still will set the
	 * {@link Article#imagePath} attribute to {@code null}.
	 *
	 * @param article
	 */
	private void deleteArticleImage(final Article article) {
		if (article.getImagePath() != null) {
			File picFile = new File( getBasicArticleFolderPath(article) + File.separator + article.getImagePath());

			if (picFile.exists()) {
				picFile.delete();
			}

			article.setImagePath(null);
		}
	}
	
	/**
	 * Returns the basic folder for single article {@code article} as {@link String}
	 * @param article
	 */
	private String getBasicArticleFolderPath(final Article article) {
		File basicArticleFolder = getBasicArticleFolderCreateIfNotExists(article.getId());
		return basicArticleFolder.getAbsolutePath();
	}
}
