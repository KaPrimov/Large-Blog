package com.kalin.large.core.repository.article;

import com.kalin.large.core.model.article.ArticleTag;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ArticleTagRepository extends JpaRepository<ArticleTag, Long> {
}
