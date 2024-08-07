package com.slsolution.plms;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.properties.ConfigurationPropertiesScan;

@ConfigurationPropertiesScan
@SpringBootApplication
public class Plms2Application {

	public static void main(String[] args) {
		SpringApplication.run(Plms2Application.class, args);
	}

}
