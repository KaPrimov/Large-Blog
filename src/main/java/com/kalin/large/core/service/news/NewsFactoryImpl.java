package com.kalin.large.core.service.news;

import com.kalin.large.core.model.article.ArticleStatusEnum;
import com.kalin.large.core.model.article.beans.ArticleImageDTO;
import com.kalin.large.core.model.news.News;
import com.kalin.large.core.model.news.beans.NewsDTO;
import com.kalin.large.core.model.user.User;
import com.kalin.large.core.service.article.ArticleFileFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.Date;
import java.util.stream.Collectors;


/**
 * Factory implementation for {@link News} entity
 */
@Component
public class NewsFactoryImpl implements NewsFactory {
	
	/*--------------------------------------------------- FACTORIES --------------------------------------------------*/

	private final ArticleFileFactory articleFileFactory;

	@Autowired
	public NewsFactoryImpl(ArticleFileFactory articleFileFactory) {
		this.articleFileFactory = articleFileFactory;
	}

	/*------------------------------------------------------ API -----------------------------------------------------*/

	/**
	 * @see com.kalin.large.core.service.news.NewsFactory#createFrom(NewsDTO, User)
	 */
	@Override
	public News createFrom(final NewsDTO newsDTO, final User user) {
		News news = new News();
		news.setBody(newsDTO.getBody());	
		news.setTitle(newsDTO.getTitle());
		news.setSubtitle(newsDTO.getSubtitle());
		news.setShortDescription(newsDTO.getShortDescription());
		news.setUser(user);
		news.setStartDate(newsDTO.getStartDate() == null ? new Date() : newsDTO.getStartDate());
		news.setEndDate(newsDTO.getEndDate());
		news.setImagePath(newsDTO.getImagePath());
		news.setStatus(ArticleStatusEnum.DRAFT);
		return news;
	}

	/**
	 * @see com.kalin.large.core.service.news.NewsFactory#createFrom(News)
	 */
	@Override
	public NewsDTO createFrom(final News news) {		
		NewsDTO newsDTO = new NewsDTO(news);

		newsDTO.setShortDescription(news.getShortDescription());
		newsDTO.setArticleFiles(news.getArticleFiles().stream().map(articleFileFactory::createDTOFrom).collect(Collectors.toSet()));
		
		ArticleImageDTO imageDTO = new ArticleImageDTO();
		imageDTO.setId(news.getId());
		imageDTO.setImage(news.getImagePath());
		newsDTO.setImage(imageDTO);
		
		return newsDTO;
	}
}
