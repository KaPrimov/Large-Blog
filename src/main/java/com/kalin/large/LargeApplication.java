package com.kalin.large;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.web.servlet.ServletComponentScan;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.scheduling.annotation.EnableAsync;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.transaction.annotation.EnableTransactionManagement;

@SpringBootApplication
@EnableTransactionManagement
@EnableScheduling
@EnableAsync
@ComponentScan(basePackageClasses = LargeApplication.class)
@ServletComponentScan(basePackageClasses = LargeApplication.class)
public class LargeApplication {

	public static void main(String[] args) {
		SpringApplication.run(LargeApplication.class, args);
	}
}
