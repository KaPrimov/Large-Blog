package com.kalin.large.core.service.news;

import com.proxiad.extranet.core.model.employee.Employee;
import com.proxiad.extranet.core.model.news.News;
import com.proxiad.extranet.core.model.news.beans.NewsDTO;

/**
 * Factory for {@link News} entity
 * 
 * @author Kalin Primov
 */
public interface NewsFactory {

	/**
	 * Create {@link News} object from supplied params. The date of creation and the creator are determined by the
	 * method.
	 * @param createNewsDto {@link CreateNewsDTO}
	 * @param employee {@link Employee}
	 * @return {@link News}
	 */
	News createFrom(NewsDTO newsDTO, Employee employee);
	
	/**
	 * Create a {@link NewsDTO} from {@link News}
	 * @param news
	 * @return
	 */
	NewsDTO createFrom(final News news);
}
