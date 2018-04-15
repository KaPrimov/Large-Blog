package com.kalin.large.core.service.article;

import com.kalin.large.core.model.article.Article;
import com.kalin.large.core.model.article.ArticleFile;
import com.kalin.large.core.model.article.beans.ArticleFileDTO;
import org.springframework.stereotype.Component;

import java.io.File;

/**
 * Factory implementation for {@link ArticleFile} entity
 */
@Component
public class ArticleFileFactoryImpl implements ArticleFileFactory {


	@Override
	public ArticleFileDTO createDTOFrom(ArticleFile articleFile) {
		ArticleFileDTO articleFileDTO = new ArticleFileDTO();
		articleFileDTO.setArticleFileId(articleFile.getId());
		articleFileDTO.setFileName(articleFile.getFilePath());
		return articleFileDTO;
	}

	@Override
	public ArticleFile createEntityFrom(File savedFile, Article article) {
		ArticleFile articleFile = new ArticleFile();
		articleFile.setArticle(article);
		articleFile.setFilePath(savedFile.getName());
		return articleFile;
	}

}
