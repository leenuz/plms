package com.slsolution.plms.config;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;

@Component
public class GlobalConfig {
	
	
	private static String pnuFileDataDir;
	private static String pnuFileTempDir;
	private static String jisangFileTempDir;
	private static String goverFileTempDir;
	private static String jisangFileDataDir;
	private static String goverFileDataDir;
	private static String jisangBunhalDataDir;
	private static String jisangMergeDataDir;
	private static String notsetFileTempDir;
	private static String notsetFileDataDir;
	private static String jisangReqDoc1Dir;
	private static String jisangReqDoc2Dir;
	private static String togiFileTempDir;
	private static String togiFileDataDir;

	private static String statisFileDataDir;

	private static String dopcoFileTempDir;
	private static String dopcoFileDataDir;
	
	private static String minwonFileTempDir;
	private static String minwonFileDataDir;
	
	private static String songyuFileTempDir;
	private static String songyuFileDataDir;
	
	private static String sampleFileDataDir;
	
	private static String serverName;
	
	// 필지 임시저장 디렉토리
	@Value("${plms.pnuFileTempDir}")
	public void setPnuFileTempDir(String str) {
		pnuFileTempDir=str;
	}
	public static String getPnuFileTempDir() {
		return pnuFileTempDir;
	}
	
	// 필지 저장 디렉토리
	@Value("${plms.pnuFileDataDir}")
	public void setPnuFileDataDir(String str) {
		pnuFileDataDir=str;
	}
	public static String getPnuFileDataDir() {
		return pnuFileDataDir;
	}

	// 지상권 임시저장 디렉토리
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
	
	//점용 임시저장 디렉토리
	@Value("${plms.goverFileTempDir}")
	public void setGoverFileTempDir(String str) {
		goverFileTempDir=str;
	}
	public static String getGoverFileTempDir() {
		return goverFileTempDir;
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
	
	//지상권합필첨부서류
		@Value("${plms.jisangMergeDataDir}")
		public void setJisangMergeDataDir(String str) {
			jisangMergeDataDir=str;
		}
		public static String getJisangMergeDataDir() {
			return jisangMergeDataDir;
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

	@Value("${plms.togiFileTempDir}")
	public void setTogiFileTempDir(String str) {
		togiFileTempDir=str;
	}
	public static String getTogiFileTempDir() {
		return togiFileTempDir;
	}
	
	@Value("${plms.togiFileDataDir}")
	public void setTogiFileDataDir(String str) {
		togiFileDataDir=str;
	}
	public static String getTogiFileDataDir() {
		return togiFileDataDir;
	}
	
	@Value("${plms.statisFileDataDir}")
	public void setStatisFileDataDir(String str) {
		statisFileDataDir=str;
	}
	public static String getStatisFileDataDir() {
		return statisFileDataDir;
	}
	
	@Value("${plms.dopcoFileTempDir}")
	public void setDopcoFileTempDir(String str) {
		dopcoFileTempDir=str;
	}
	public static String getDopcoFileTempDir() {
		return dopcoFileTempDir;
	}
	
	@Value("${plms.dopcoFileDataDir}")
	public void setDopcoFileDataDir(String str) {
		dopcoFileDataDir=str;
	}
	public static String getDopcoFileDataDir() {
		return dopcoFileDataDir;
	}
	
	// 민원 첨부서류 임시
	@Value("${plms.minwonFileTempDir}")
	public void setMinwonFileTempDir(String str) {
		minwonFileTempDir = str;
	}
	
	public static String getMinwonFileTempDir() {
		return minwonFileTempDir;
	}
	
	// 민원 첨부서류 저장(민원 협의 첨부도)
	@Value("${plms.minwonFileDataDir}")
	public void setMinwonFileDataDir(String str) {
		minwonFileDataDir = str;
	}
	
	public static String getMinwonFileDataDir() {
		return minwonFileDataDir;
	}
	
	// 지상권 해지등록 양식 샘플 다운로드
    @Value("${plms.sampleFileDataDir}")
    public void setSampleFileDataDir(String sampleFileDataDir) {
        this.sampleFileDataDir = sampleFileDataDir;
    }

    public static String getSampleFileDataDir() {
        return sampleFileDataDir;
    }
    
    // 미설정/미점용 첨부파일 임시
 	@Value("${plms.songyuFileTempDir}")
 	public void setSongyuFileTempDir(String str) {
 		songyuFileTempDir = str;
 	}
 	
 	public static String getSongyuFileTempDir() {
 		return songyuFileTempDir;
 	}
 	
 	// 미설정/미점용 첨부파일
 	@Value("${plms.songyuFileDataDir}")
 	public void setSongyuFileDataDir(String str) {
 		songyuFileDataDir = str;
 	}
 	
 	public static String getSongyuFileDataDir() {
 		return songyuFileDataDir;
 	}
	
	@Value("${server.name}")
	public void setServerName(String sn) {
		serverName = sn;
	}
	
	public static String getServerName() {
		return serverName;
	}
	

}
