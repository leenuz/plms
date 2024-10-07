package com.slsolution.plms.controller;

import java.io.BufferedInputStream;
import java.io.BufferedOutputStream;
import java.io.ByteArrayInputStream;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.io.InputStream;
import java.net.URI;
import java.net.URISyntaxException;
import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;
import java.util.ArrayList;
import java.util.Enumeration;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.http.client.methods.HttpGet;
import org.apache.http.impl.client.CloseableHttpClient;
import org.apache.http.impl.client.HttpClients;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.FileSystemResource;
import org.springframework.core.io.InputStreamResource;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.scheduling.annotation.EnableAsync;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.servlet.ModelAndView;

import com.slsolution.plms.MainService;
import com.slsolution.plms.config.GlobalConfig;
import com.slsolution.plms.json.JSONArray;
import com.slsolution.plms.json.JSONObject;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@EnableAsync
@RequiredArgsConstructor
@RestController
@RequestMapping("/land/common")
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class commonController {

	@Autowired
	private MainService mainService;

	@Autowired
	private GlobalConfig GC;

	// 출력용 팝업페이지 호출
	@GetMapping(path = "/showPopupPage")
	public ModelAndView showPopupPage(HttpServletRequest request, HttpServletResponse response) throws Exception {
		ModelAndView mav = new ModelAndView();
		mav.setViewName("oontent/common/payPrintPop");
		// mav.setViewName("content/gover/masterReg");
		return mav;
	}

	@GetMapping(path = "/masterReg") // http://localhost:8080/api/get/dbTest
	public ModelAndView masterReg(HttpServletRequest httpRequest, HttpServletResponse response) throws Exception {
//			response.setHeader("X-Frame-Options", "SAMEORIGIN");
//			response.setHeader("Content-Security-Policy", " frame-ancestors 'self'");

		ModelAndView mav = new ModelAndView();
		HashMap params = new HashMap();

		ArrayList<HashMap> jisaList = mainService.selectQuery("commonSQL.selectJisaList", params);
		ArrayList<HashMap> jimokList = mainService.selectQuery("commonSQL.selectJimokList", params);
		ArrayList<HashMap> usePurposlist = mainService.selectQuery("commonSQL.selectUsePurposList", params);

		log.info("jisaList:" + jisaList);
		log.info("jimokList:" + jimokList);

		mav.addObject("jisaList", jisaList);
		mav.addObject("jimokList", jimokList);
		mav.addObject("usePurposlist", usePurposlist);

		mav.setViewName("content/gover/masterReg");
		return mav;
	}

	// 파일 다운로드 ,패스와 파일 이름 넘김다 parameter
	// filePath=
	// fileName=
	@GetMapping(path = "/download")
	public void download(HttpServletRequest request, HttpServletResponse response) {

		String fileOriName = request.getParameter("fileName");
		String filePath = "plms.dopco.co.kr/" + request.getParameter("filePath");
		//    

		System.out.println("fileOriName :: " + fileOriName);
		System.out.println("filePath :: " + filePath);
		
		// /export/home1/plms/download/G_0010/test.txt
		
//		CloseableHttpClient httpClient = HttpClients.createDefault();
//		HttpGet gttpGet = new HttpGet(filePath);
		
		try {
			File f = new File(filePath);
//			if (!f.isFile() || !f.exists()) {
//				response.setCharacterEncoding("UTF-8");
//				response.setContentType("text/html; charset=UTF-8");
//				response.getWriter().write(
//						"<html><head><meta http-equiv=\"Content-Type\" content=\"text/html; charset=UTF-8\"><script>alert('파일이 존재하지 않습니다.'); history.back();</script></head></html>");
//				return;
//
//			}

			String contentType = "application/octet-stream";

			// 241001 추가
			if (fileOriName.endsWith(".jpg") || fileOriName.endsWith(".jpeg")) {
				contentType = "image/jpeg";
			} else if (fileOriName.endsWith(".png")) {
				contentType = "image/png";
			} else if (fileOriName.endsWith(".pdf")) {
				contentType = "application/pdf";
			} else if (fileOriName.endsWith(".xls")) {
				contentType = "application/vnd.ms-excel"; // 엑셀 97-2003 형식
			} else if (fileOriName.endsWith(".xlsx")) {
				contentType = "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"; // 엑셀 2007 이후 형식
			}

			response.setHeader("Content-Type", contentType);
			response.setHeader("Content-Disposition", "attachment; filename=" + URLEncoder.encode(fileOriName, "UTF-8"));
//			response.setHeader("Content-Length", "" + String.valueOf(f.length()));
			response.setContentLengthLong(f.length());
			
			try (BufferedInputStream fin = new BufferedInputStream(new FileInputStream(f));
					BufferedOutputStream outs = new BufferedOutputStream(response.getOutputStream())) {
				byte[] buffer = new byte[8192];
				int bytesRead;
				while ((bytesRead = fin.read(buffer)) != -1) {
					outs.write(buffer, 0, bytesRead);
				}
				outs.flush();
			}
			response.flushBuffer();
		} catch (FileNotFoundException e) {
			System.out.println(" FileService FileNotFoundException : " + e.getMessage());
		} catch (Exception e) {
			System.out.println("FileService exception :" + e.getMessage());
		}
	}
	
	/************************************
	 * file 다운로드시 사용 (이걸로 통일!!)
	 * 해당 메소드로 요청시 참고 스크립트 및 메소드 ( common.js - commonFileDownload )
	 * @param filePath
	 * @param fileName
	 * @return
	 */
	@GetMapping("/downloadfile")
	public ResponseEntity<Resource> downloadFile(
				@RequestParam(name="filePath") String filePath,
				@RequestParam(name="fileName") String fileName,
				@RequestParam(name="fileJisangNo") String fileJisangNo,
				@RequestParam(name="fileSeq") String fileSeq,
				@RequestParam(name="fileGubun") String fileGubun
				) throws IOException, URISyntaxException{
		//http://plms.dopco.co.kr/dcl/jr/downloadFile?file_no=J_010602&file_seq=30988&file_gubun=jisang
		// URL 구성
//		String fileUrl = "http://plms.dopco.co.kr/"+filePath+"/"+fileName;	//IDC or Local
		String fileUrl = "http://plms.dopco.co.kr/dcl/jr/downloadFile?file_no="+fileJisangNo+"&file_seq="+fileSeq+"&file_gubun="+fileGubun;	//운영
		
		System.out.println("====================================");
		System.out.println("filePath :: " + filePath);
		System.out.println("fileName :: " + fileName);
		System.out.println("fileJisangNo :: " + fileJisangNo);
		System.out.println("fileSeq :: " + fileSeq);
		System.out.println("fileGubun :: " + fileGubun);
		System.out.println("file URL :: " + fileUrl);
		System.out.println("====================================");
		
		// RestTemplate를 사용한 외부서버로부터 파일 받아오기
		
		RestTemplate restTemplate = new RestTemplate();
		byte[] fileData = restTemplate.getForObject(new URI(fileUrl), byte[].class);
		
		if(fileData == null || fileData.length == 0) {
			throw new RuntimeException("파일을 가져올 수 없습니다. " + fileName);
		}
		
		// 파일을 클라이언트로 반환하기 위해 InputStream으로 변환
		InputStream inputStream = new ByteArrayInputStream(fileData);
		Resource resource = new InputStreamResource(inputStream);
		
		// 기본적인 MIME 타입 지정
		String contentType = "application/octet-stream";
		
		//파일이름 인코딩
		String encodedFileName = URLEncoder.encode(fileName, StandardCharsets.UTF_8.toString());
		encodedFileName = encodedFileName.replaceAll("\\+", "%20");  // 공백 처리
		
		// 클라이언트로 파일 전송(파일 이름 및 다운로드 위한 헤더 설정)
		return ResponseEntity.ok()
				.contentType(MediaType.parseMediaType(contentType))
				.header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\""+encodedFileName+"\"; filename*=UTF-8''"+ encodedFileName)
				.body(resource);
	}
	
	@GetMapping("/downloadfile2")
	public ResponseEntity<Resource> downloadFile2() throws IOException, URISyntaxException{
		//
		// URL 구성
		String fileUrl = "http://plms.dopco.co.kr/dcl/jr/downloadFile?file_no=J_010602&file_seq=30988&file_gubun=jisang";
		
		
		System.out.println("file URL :: " + fileUrl);
		
		// RestTemplate를 사용한 외부서버로부터 파일 받아오기
		RestTemplate restTemplate = new RestTemplate();
		byte[] fileData = restTemplate.getForObject(new URI(fileUrl), byte[].class);
		
		if(fileData == null || fileData.length == 0) {
			throw new RuntimeException("파일을 가져올 수 없습니다. " + "충청북도 영동군 황간면 노근리 602.pdf");
		}
		
		// 파일을 클라이언트로 반환하기 위해 InputStream으로 변환
		InputStream inputStream = new ByteArrayInputStream(fileData);
		Resource resource = new InputStreamResource(inputStream);
		
		// 기본적인 MIME 타입 지정
		String contentType = "application/octet-stream";
		
		//파일이름 인코딩
		String encodedFileName = URLEncoder.encode("충청북도 영동군 황간면 노근리 602.pdf", StandardCharsets.UTF_8.toString());
		encodedFileName = encodedFileName.replaceAll("\\+", "%20");  // 공백 처리
		
		// 클라이언트로 파일 전송(파일 이름 및 다운로드 위한 헤더 설정)
		return ResponseEntity.ok()
				.contentType(MediaType.parseMediaType(contentType))
				.header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename*=UTF-8''"+encodedFileName)
				.body(resource);
	}
	
	@GetMapping("/menusetting")
	public void menuListSetting(HttpServletRequest request, HttpServletResponse response) {
		
		HttpSession session = request.getSession();
		List<String> menuList = new ArrayList<String>();
		List<String> menu2pmsList = new ArrayList<String>();
		
		JSONObject resultObj = new JSONObject();
		
		try {
			
			Enumeration<String> attributeNames = session.getAttributeNames();
			
			ArrayList<String> attrNames = new ArrayList<>();
			Map<String, Object> attrArray =  new HashMap<String, Object>();
			
			while(attributeNames.hasMoreElements()) {
				String attributeName = attributeNames.nextElement();
//				System.out.println("Session Attribute name : " + attributeName + " || " + request.getSession().getAttribute(attributeName));
				attrNames.add(attributeName);
			}
			
			for(int i = 0 ; i < attrNames.size() ; i++ ) {
				Object valueCheck = session.getAttribute(attrNames.get(i));
//				System.out.println("att :: " + attrNames.get(i) + " || " + valueCheck);
				attrArray.put(attrNames.get(i), valueCheck);
			}
			
			JSONObject menuCheck = new JSONObject(attrArray);
			JSONObject menuPlmsResultList = new JSONObject(menuCheck.get("plmsMenu").toString());
			JSONArray menuResultList = menuPlmsResultList.getJSONArray("resultList");
			
			JSONObject menu2PmsResultList = new JSONObject(menuCheck.get("2pmsMenu").toString());
			JSONArray menu2PmsResult = menu2PmsResultList.getJSONArray("resultList");
			
//			System.out.println("================================================================================");
			
//			System.out.println("plmsMenu :: " + menuCheck.get("plmsMenu").toString());
			
//			System.out.println("================================================================================");
			
			for(int k = 0 ; k < menuResultList.length() ; k++ ) {
//				System.out.println(menuResultList.get(k).toString());
				menuList.add(menuResultList.get(k).toString());
			}
			
			for(int k = 0 ; k < menu2PmsResult.length() ; k++ ) {
//				System.out.println(menu2PmsResult.get(k).toString());
				menu2pmsList.add(menu2PmsResult.get(k).toString());
			}
			
//			System.out.println("================================================================================");
			
			resultObj.put("result", "Y");
			resultObj.put("menuList", menuList);
			resultObj.put("menu2pms", menu2pmsList);
			
			response.setCharacterEncoding("UTF-8");
	        response.setHeader("Access-Control-Allow-Origin", "*");
	        response.setHeader("Cache-Control", "no-cache");
	        response.resetBuffer();
	        response.setContentType("application/json");
	        response.getWriter().print(resultObj);
	        response.getWriter().flush();
			
		} catch(Exception e) {
			e.printStackTrace();
			
			try {
				resultObj.put("result", "Y");
				
				response.setCharacterEncoding("UTF-8");
		        response.setHeader("Access-Control-Allow-Origin", "*");
		        response.setHeader("Cache-Control", "no-cache");
		        response.resetBuffer();
		        response.setContentType("application/json");
		        response.getWriter().print(resultObj);
		        response.getWriter().flush();
			} catch(Exception ee) {
				ee.printStackTrace();
			}
		}
	}
}
