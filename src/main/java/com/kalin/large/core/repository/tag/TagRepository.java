package com.kalin.large.core.repository.tag;

import com.kalin.large.core.model.article.Tag;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TagRepository extends JpaRepository<Tag, Long> {
}
