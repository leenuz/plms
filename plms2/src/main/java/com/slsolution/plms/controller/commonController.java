package com.slsolution.plms.controller;

import java.io.BufferedInputStream;
import java.io.BufferedOutputStream;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.net.URLEncoder;
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
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.scheduling.annotation.EnableAsync;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
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
@RequestMapping("/api")
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
		String filePath = request.getParameter("filePath");

		System.out.println("fileOriName :: " + fileOriName);
		System.out.println("filePath :: " + filePath);
		
//		CloseableHttpClient httpClient = HttpClients.createDefault();
//		HttpGet gttpGet = new HttpGet(filePath);
		
		try {
			File f = new File(filePath);
			if (!f.isFile() || !f.exists()) {
				response.setCharacterEncoding("UTF-8");
				response.setContentType("text/html; charset=UTF-8");
				response.getWriter().write(
						"<html><head><meta http-equiv=\"Content-Type\" content=\"text/html; charset=UTF-8\"><script>alert('파일이 존재하지 않습니다.'); history.back();</script></head></html>");
				return;

			}

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
	
	/**
	 * file 다운로드시 사용
	 * 해당 메소드로 요청시 참고 스크립트 및 메소드 ( masterEdit.js - attachFileDownload() )
	 * @param filePath
	 * @param fileName
	 * @return
	 */
	@GetMapping("/downloadfile")
	public ResponseEntity<FileSystemResource> downloadFile(@RequestParam(name="filePath") String filePath, @RequestParam(name="fileName") String fileName){
		try {
			File file = new File(filePath + File.separator + fileName);
			
			if(!file.exists()) {
				return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
			}
			
			FileSystemResource resource = new FileSystemResource(file);
			HttpHeaders headers = new HttpHeaders();
			headers.add(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=" + fileName);
			
			return new ResponseEntity<>(resource, headers, HttpStatus.OK);
			
		} catch(Exception e) {
			e.printStackTrace();
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
		}
	}
	
	
	@GetMapping("/menusetting")
	public void menuListSetting(HttpServletRequest request, HttpServletResponse response) {
		
		HttpSession session = request.getSession();
		List<String> menuList = new ArrayList<String>();
		HashMap<String, Object> resultMap = new HashMap<String, Object>();
		JSONObject resultObj = new JSONObject();
		
		try {
			
			Enumeration<String> attributeNames = session.getAttributeNames();
			
			ArrayList<String> attrNames = new ArrayList<>();
			Map<String, Object> attrArray =  new HashMap<String, Object>();
			
			while(attributeNames.hasMoreElements()) {
				String attributeName = attributeNames.nextElement();
				System.out.println("Session Attribute name : " + attributeName + " || " + request.getSession().getAttribute(attributeName));
				attrNames.add(attributeName);
			}
			
			for(int i = 0 ; i < attrNames.size() ; i++ ) {
				Object valueCheck = session.getAttribute(attrNames.get(i));
//				System.out.println("att :: " + attrNames.get(i) + " || " + valueCheck);
				attrArray.put(attrNames.get(i), valueCheck);
			}
			
			JSONObject menuCheck = new JSONObject(attrArray);
			JSONObject menu2pmsResultList = new JSONObject(menuCheck.get("plmsMenu").toString());
			JSONArray menuResultList = menu2pmsResultList.getJSONArray("resultList");
			
			System.out.println("================================================================================");
			
			System.out.println("plmsMenu :: " + menuCheck.get("plmsMenu").toString());
//			System.out.println("2pmsMenu :: " + menuCheck.get("2pmsMenu").toString());
//			System.out.println(menu2pmsResultList.getJSONArray("resultList"));
			
			System.out.println("================================================================================");
			
			for(int k = 0 ; k < menuResultList.length() ; k++ ) {
				System.out.println(menuResultList.get(k).toString());
				menuList.add(menuResultList.get(k).toString());
			}
			
			System.out.println("================================================================================");
			
			resultObj.put("result", "Y");
			resultObj.put("menuList", menuList);
			
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
