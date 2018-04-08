package com.kalin.large.core.repository.temp;

import com.kalin.large.core.model.temp.TempFileUpload;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Date;
import java.util.Set;

@Repository
public interface TempFileUploadRepository extends JpaRepository<TempFileUpload, Long> {
    Set<TempFileUpload> findAllBySessionId(final String sessionId);

    Set<TempFileUpload> findAllByCreationDateBefore(final Date creationDate);
}
