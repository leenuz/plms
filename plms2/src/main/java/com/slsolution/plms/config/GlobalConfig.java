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
	private static String jisangReqDoc1Dir;
	private static String jisangReqDoc2Dir;
	
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
	
	@Value("${plms.jisangReqDoc1Dir}")
	public void setJisangReqDoc1Dir(String str) {
		jisangReqDoc1Dir=str;
	}
	public static String getJisangReqDoc1Dir() {
		return jisangReqDoc1Dir;
	}
	
	@Value("${plms.jisangReqDoc2Dir}")
	public void setJisangReqDoc2Dir(String str) {
		jisangReqDoc2Dir=str;
	}
	public static String getJisangReqDoc2Dir() {
		return jisangReqDoc2Dir;
	}
	

}
