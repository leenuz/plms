package com.slsolution.plms.config;

import org.springframework.boot.web.servlet.MultipartConfigFactory;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.util.unit.DataSize;
import org.springframework.web.multipart.MultipartResolver;
import org.springframework.web.multipart.support.StandardServletMultipartResolver;

import jakarta.servlet.MultipartConfigElement;

@Configuration
public class MultipartConfig {
	 @Bean
	    public MultipartResolver multipartResolver() {
	        return new StandardServletMultipartResolver();
	    }

	    @Bean
	    public MultipartConfigElement multipartConfigElement() {
	        MultipartConfigFactory factory = new MultipartConfigFactory();
	        factory.setLocation("/Users/seokjun/Downloads/test/");
//	        factory.setMaxRequestSize(DataSize.ofMegabytes(100L));
//	        factory.setMaxFileSize(DataSize.ofMegabytes(100L));

	        return factory.createMultipartConfig();
	    }

}
