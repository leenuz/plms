package com.slsolution.plms.controller;

import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.UUID;

import org.apache.poi.ss.usermodel.CellType;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.apache.tika.Tika;
import org.apache.tika.exception.TikaException;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.multipart.MultipartFile;

import com.slsolution.plms.common.ExcelData;
import com.slsolution.plms.json.JSONObject;

import jakarta.servlet.http.HttpServletResponse;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Controller
public class FileUploadController {
	

	// 파일 업로드
	@RequestMapping("/fileUpload")
	public void fileUpLoadView(@RequestParam("uploadFile") MultipartFile file,HttpServletResponse response) 
				throws TikaException,IOException {
		log.info("--------------start uploadFile------------");
		
		// 1. 파일 저장 경로 설정 : 실제 서비스되는 위치(프로젝트 외부에 저장)
		String uploadPath = "D:/plms2/upload/";
		// 마지막에 / 있어야함
		
		// 2. 원본 파일 이름 알아오기
		String originalFileName = file.getOriginalFilename();
		
		// 3. 파일 이름이 중복되지 않도록 파일 이름 변경 : 서버에 저장할 이름
		// UUID 클래스 사용
		UUID uuid = UUID.randomUUID();
		String savedFileName = uuid.toString() + "_" + originalFileName;
		
		// 4. 파일 생성
		File newFile = new File(uploadPath + savedFileName);
		
		// 5. 서버로 전송
		file.transferTo(newFile);
		
		
		
		
		//ConvertApi apiInstance=new ConvertApi(configuration);
		ArrayList<HashMap> list=new ArrayList<HashMap>();
		
		
		InputStream iss = new FileInputStream(newFile);
		Tika tika=new Tika();
		String mimeType=tika.detect(iss);
		log.info("mimeType1111:"+mimeType);
		if (isAllowedMIMEType(mimeType)) {
			List<ExcelData> dataList = new ArrayList<>();
			FileInputStream fi=new FileInputStream(uploadPath + savedFileName);
			XSSFWorkbook workbook = new XSSFWorkbook(fi);
			Sheet worksheet = workbook.getSheetAt(0);
			String atchFileId = null;
			
			Row header = worksheet.getRow(1);
			int cellcount=header.getPhysicalNumberOfCells();
			//String[] headers=new String[cellcount];
			ArrayList headers=new ArrayList();
			for(int i=0;i<cellcount;i++) {
				header.getCell(i).setCellType(CellType.STRING);
				headers.add(header.getCell(i).getStringCellValue());
				
			}
			 log.info("cells count:"+cellcount);
			log.info("headers:"+headers);
			
			for (int i = 2; i < worksheet.getPhysicalNumberOfRows(); i++) { // 1번째 행부터 끝까지
		        Row row = worksheet.getRow(i);
		        
		       // log.info(i+":"+row.getCell(0).getStringCellValue()+","+row.getCell(1).getStringCellValue());
		        HashMap<String,Object> map=new HashMap<String,Object>();
		        for(int j=0;j<cellcount;j++) {
		        	row.getCell(j).setCellType(CellType.STRING);	
		        	map.put(headers.get(j).toString(),row.getCell(j).getStringCellValue());
		        }
		        log.info("map:"+map);
		        list.add(map);
		        
		        
		//        
		//        ExcelData data = new ExcelData();
		//        data.setNum((int) row.getCell(0).getNumericCellValue());
		//        data.setName(row.getCell(1).getStringCellValue());
		//
		//        dataList.add(data);
			}
		}
		
		
//		try (InputStream is=file.getInputStream();){
////			Tika tika=new Tika();
////			String mimeType=tika.detect(is);
////			log.info("mimeType:"+mimeType);
////			if (isAllowedMIMEType(mimeType)) {
////				 XSSFWorkbook workbook = new XSSFWorkbook(file.getInputStream());
////
////	                Sheet worksheet = workbook.getSheetAt(0);
////
////	                String atchFileId = null;
////
////	                for (int i = 1; i < worksheet.getPhysicalNumberOfRows(); i++) { // 1번째 행부터 끝까지
////	                    Row row = worksheet.getRow(i);
////	                    log.info(i+":"+row.getCell(1).getStringCellValue());
//////	                    
//////	                    ExcelData data = new ExcelData();
//////	                    data.setNum((int) row.getCell(0).getNumericCellValue());
//////	                    data.setName(row.getCell(1).getStringCellValue());
//////
//////	                    dataList.add(data);
////	                }
////			}
//		}
		
		// Model 설정 : 뷰 페이지에서 원본 파일 이름 출력
		//model.addAttribute("originalFileName", originalFileName);
		HashMap<String,Object> resultmap=new HashMap();
        resultmap.put("resultCode","0000");
        resultmap.put("resultData",list);
        resultmap.put("resultPath",uploadPath);
        resultmap.put("resultFname",savedFileName);
        resultmap.put("resultMessage","success");
        JSONObject obj =new JSONObject(resultmap);
//        System.out.println(obj);
       
      //log.info("jo:"+jo);
      			response.setCharacterEncoding("UTF-8");
      			response.setHeader("Access-Control-Allow-Origin", "*");
      			response.setHeader("Cache-Control", "no-cache");
      			response.resetBuffer();
      			response.setContentType("application/json");
      			//response.getOutputStream().write(jo);
      			response.getWriter().print(obj);
      			response.getWriter().flush();
		//return "redirect:/upload.html";
	}
	 private boolean isAllowedMIMEType(String mimeType) {
	        if (mimeType.equals("application/x-tika-ooxml"))
	            return true;
	        return false;
	    }
//	// 멀티 파일 업로드
//	@RequestMapping("/fileUploadMultiple")
//	public String fileUpLoadView(@RequestParam("uploadFileMulti") ArrayList<MultipartFile> files, 
//								Model model) throws IOException {
//		
//		
//		// 1. 파일 저장 경로 설정 : 실제 서비스되는 위치(프로젝트 외부에 저장)
//		String uploadPath = "D:/plms2/upload/";
//		// 마지막에 / 있어야함
//		
//		// 여러 개의 파일 이름 저장할 리스트 생성
//		ArrayList<String> originalFileNameList = new ArrayList<String>();
//		
//		for(MultipartFile file :files) {
//			
//			// 2. 원본 파일 이름 알아오기
//			String originalFileName = file.getOriginalFilename();
//			// 파일 이름을 리스트에 추가
//			originalFileNameList.add(originalFileName);
//			
//			// 3. 파일 이름이 중복되지 않도록 파일 이름 변경 : 서버에 저장할 이름
//			// UUID 클래스 사용
//			UUID uuid = UUID.randomUUID();
//			String savedFileName = uuid.toString() + "_" + originalFileName;
//			
//			// 4. 파일 생성
//			File newFile = new File(uploadPath + savedFileName);
//			
//			// 5. 서버로 전송
//			file.transferTo(newFile);
//			
//			// Model 설정 : 뷰 페이지에서 원본 파일 이름 출력
//			model.addAttribute("originalFileNameList", originalFileNameList);
//		}
//		return "upload/fileUploadMultipleResult";
//	}
//	
	// 파일명 변경하지 않고 파일 업로드
//		@RequestMapping("/fileOriginNameUpload")
//		public void fileOriginNameUpLoadView(@RequestParam("uploadFile") MultipartFile file, HttpServletResponse response) 
//						throws IOException {
//			
//			
//			// 1. 파일 저장 경로 설정 : 실제 서비스되는 위치(프로젝트 외부에 저장)
//			String uploadPath = "D:/plms2/upload/";
//			// 경록 마지막에 "/" 있어야함
//			
//			// 2. 원본 파일 이름 알아오기
//			String originalFileName = file.getOriginalFilename();
//			
//			// 3. 파일 생성
//			File newFile = new File(uploadPath + originalFileName);
//	
//			// 4. 서버로 전송
//			file.transferTo(newFile);
//			
//			HashMap<String,Object> resultmap=new HashMap();
//	        resultmap.put("resultCode","0000");
//	      //  resultmap.put("resultData",list);
//	        resultmap.put("resultPath",uploadPath);
//	        resultmap.put("resultFname",originalFileName);
//	        resultmap.put("resultMessage","success");
//	        JSONObject obj =new JSONObject(resultmap);
////	        System.out.println(obj);
//	       
//	      //log.info("jo:"+jo);
//	      			response.setCharacterEncoding("UTF-8");
//	      			response.setHeader("Access-Control-Allow-Origin", "*");
//	      			response.setHeader("Cache-Control", "no-cache");
//	      			response.resetBuffer();
//	      			response.setContentType("application/json");
//	      			//response.getOutputStream().write(jo);
//	      			response.getWriter().print(obj);
//	      			response.getWriter().flush();
//			
//			
////			return "upload/fileUploadResult";
//		}
//		
}
