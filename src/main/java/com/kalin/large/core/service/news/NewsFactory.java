package com.kalin.large.core.service.news;

import com.kalin.large.core.model.news.News;
import com.kalin.large.core.model.news.beans.NewsDTO;
import com.kalin.large.core.model.user.User;

/**
 * Factory for {@link News} entity
 *
 */
public interface NewsFactory {

	/**
	 * Create {@link News} object from supplied params. The date of creation and the creator are determined by the
	 * method.
	 * @param newsDTO {@link NewsDTO}
	 * @param user {@link User}
	 * @return {@link News}
	 */
	News createFrom(NewsDTO newsDTO, User user);
	
	/**
	 * Create a {@link NewsDTO} from {@link News}
	 * @param news
	 * @return
	 */
	NewsDTO createFrom(final News news);
}
