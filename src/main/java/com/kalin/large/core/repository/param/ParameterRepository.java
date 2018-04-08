package com.kalin.large.core.repository.param;

import com.kalin.large.core.model.param.Parameter;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ParameterRepository extends JpaRepository<Parameter, Long> {
    Parameter findFirstByName(final String name);
}
