package com.slsolution.plms.config;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;

@Component
public class GlobalConfig {
	
	
	private static String pnuAtcFileDir;
	
	@Value("${plms.pnuAtcFileDir}")
	public void setPnuAtcFileDir(String str) {
		pnuAtcFileDir=str;
	}
	public static String getPnuAtcFileDir() {
		return pnuAtcFileDir;
	}
	

}
