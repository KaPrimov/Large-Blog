package com.kalin.large.core.repository.tag;

import com.kalin.large.core.model.article.Tag;
import com.kalin.large.core.model.article.beans.ArticleTagDTO;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Set;

@Repository
public interface TagRepository extends JpaRepository<Tag, Long> {
    Tag findFirstByName(String name);

    @Query("SELECT new com.kalin.large.core.model.article.beans.ArticleTagDTO(t.id, t.name) FROM Tag AS t " +
            "WHERE t.name LIKE :pattern")
    Set<ArticleTagDTO> searchArticleTagsByName(@Param("pattern") String pattern);
}
