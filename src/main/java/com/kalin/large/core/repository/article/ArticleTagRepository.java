package com.kalin.large.core.repository.article;

import com.kalin.large.core.model.article.ArticleTag;
import com.kalin.large.core.model.article.ArticleTagId;
import com.kalin.large.core.model.article.Tag;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Set;

@Repository
public interface ArticleTagRepository extends JpaRepository<ArticleTag, ArticleTagId> {

    @Query("SELECT at.pk.tag FROM ArticleTag AS at " +
            "WHERE at.pk.article.id = :articleId")
    Set<Tag> findAllTagsFor(@Param("articleId") Long articleId);
}
