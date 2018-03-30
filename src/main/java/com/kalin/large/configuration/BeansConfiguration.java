package com.kalin.large.configuration;

import org.modelmapper.ModelMapper;
import org.modelmapper.PropertyMap;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import com.kalin.large.core.model.user.User;
import com.kalin.large.core.model.user.beans.RegisterUserDTO;

@Configuration
public class BeansConfiguration {
    @Bean
    public BCryptPasswordEncoder getbCryptPasswordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public ModelMapper modelMapper() {
		return new ModelMapper();
    }
}
