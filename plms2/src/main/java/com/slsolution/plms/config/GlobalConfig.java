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
	private static String jisangFileTempDir;
	private static String jisangFileDataDir;
	
	@Value("${plms.pnuAtcFileDir}")
	public void setPnuAtcFileDir(String str) {
		pnuAtcFileDir=str;
	}
	public static String getPnuAtcFileDir() {
		return pnuAtcFileDir;
	}
	
	@Value("${plms.jisangFileTempDir}")
	public void setJisangFileTempDir(String str) {
		jisangFileTempDir=str;
	}
	public static String getJisangFileTempDir() {
		return jisangFileTempDir;
	}
	
	@Value("${plms.jisangFileDataDir}")
	public void setJisangFileDataDir(String str) {
		jisangFileDataDir=str;
	}
	public static String getJisangFileDataDir() {
		return jisangFileDataDir;
	}
	

}
