package com.kalin.large.core.repository.news;

import com.kalin.large.core.model.news.NewsSeenBy;
import com.kalin.large.core.model.news.NewsSeenById;
import com.kalin.large.core.model.user.beans.UserBasicDTO;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Set;

@Repository
public interface NewsSeenByRepository extends JpaRepository<NewsSeenBy, NewsSeenById> {

    @Query("SELECT new com.kalin.large.core.model.user.beans.UserBasicDTO(nsb.pk.user.id, nsb.pk.user.username) FROM NewsSeenBy AS nsb " +
            "WHERE nsb.pk.news.id = :newsId")
    Set<UserBasicDTO> listEmployeesByArticleSeen(@Param("newsId") final Long newsId);
}
