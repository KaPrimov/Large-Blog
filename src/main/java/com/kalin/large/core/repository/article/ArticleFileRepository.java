package com.kalin.large.core.repository.article;

import com.kalin.large.core.model.article.ArticleFile;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ArticleFileRepository extends JpaRepository<ArticleFile, Long> {

    ArticleFile findArticleFileByFilePath(String fileName);
}
