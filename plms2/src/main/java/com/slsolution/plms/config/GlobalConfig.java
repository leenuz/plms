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
	private static String goverFileTempDir;
	private static String jisangFileDataDir;
	private static String goverFileDataDir;
	private static String jisangBunhalDataDir;
	private static String notsetFileTempDir;
	private static String notsetFileDataDir;
	private static String jisangReqDoc1Dir;
	private static String jisangReqDoc2Dir;
	
	private static String serverName;
	
	
	
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
	
	//점용 임시저장 디렉토리
	@Value("${plms.goverFileTempDir}")
	public void setGoverFileTempDir(String str) {
		goverFileTempDir=str;
	}
	public static String getGoverFileTempDir() {
		return goverFileTempDir;
	}
	
	
	@Value("${plms.jisangFileDataDir}")
	public void setJisangFileDataDir(String str) {
		jisangFileDataDir=str;
	}
	public static String getJisangFileDataDir() {
		return jisangFileDataDir;
	}
	
	@Value("${plms.goverFileDataDir}")
	public void setGoverFileDataDir(String str) {
		goverFileDataDir=str;
	}
	public static String getGoverFileDataDir() {
		return goverFileDataDir;
	}
	
	
	//지상권분할첨부서류
	@Value("${plms.jisangBunhalDataDir}")
	public void setJisangBunhalDataDir(String str) {
		jisangBunhalDataDir=str;
	}
	public static String getJisangBunhalDataDir() {
		return jisangBunhalDataDir;
	}
	
	//미설정파일관리
	@Value("${plms.notsetFileTempDir}")
	public void setNotsetFileTempDir(String str) {
		notsetFileTempDir=str;
	}
	public static String getNotsetFileTempDir() {
		return notsetFileTempDir;
	}
	
	@Value("${plms.notsetFileDataDir}")
	public void setNotsetFileDataDir(String str) {
		notsetFileDataDir=str;
	}
	public static String getNotsetFileDataDir() {
		return notsetFileDataDir;
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
	
	@Value("${server.name}")
	public void setServerName(String sn) {
		serverName = sn;
	}
	
	public static String getServerName() {
		return serverName;
	}
	

}
