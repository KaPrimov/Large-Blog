package com.kalin.large.core.repository.article;

import com.kalin.large.core.model.article.Article;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ArticleRepository extends JpaRepository<Article, Long> {
}
