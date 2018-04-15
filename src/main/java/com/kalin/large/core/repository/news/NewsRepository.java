package com.kalin.large.core.repository.news;

import com.kalin.large.core.model.news.News;
import com.kalin.large.core.model.news.beans.NewsDTO;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Date;
import java.util.Set;

@Repository
public interface NewsRepository extends JpaRepository<News, Long> {

    @Query("SELECT new com.kalin.large.core.model.news.beans.NewsDTO(n) FROM News AS n " +
            "WHERE n.user.id = :userId " +
            "ORDER BY n.title")
    Set<NewsDTO> listAllOrderByTitleBy(@Param("userId") Long id);

    @Query("SELECT new com.kalin.large.core.model.news.beans.NewsDTO(n) FROM News AS n " +
            "WHERE ((n.startDate < :currentDate AND n.endDate IS NULL) " +
            "OR (n.startDate < :currentDate AND n.endDate > :currentDate)) " +
            "AND n.status = 'PUBLISHED' " +
            "ORDER BY n.id DESC")
    Set<NewsDTO> listCurrentNews(@Param("currentDate") Date date);

    @Query("SELECT n.id FROM News AS n " +
            "WHERE ((n.startDate < :currentDate AND n.endDate IS NULL) " +
            "OR (n.startDate < :currentDate AND n.endDate > :currentDate)) " +
            "AND n.status = 'PUBLISH_PENDING'")
    Set<Long> findAllNewsReadyForPublish(Date currentDate);
}
