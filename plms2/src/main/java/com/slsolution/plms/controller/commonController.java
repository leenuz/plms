package com.slsolution.plms.controller;

import java.io.BufferedInputStream;
import java.io.BufferedOutputStream;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.util.ArrayList;
import java.util.HashMap;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.EnableAsync;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.ModelAndView;

import com.slsolution.plms.MainService;
import com.slsolution.plms.config.GlobalConfig;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
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
	    @GetMapping(path="/showPopupPage") 
		public ModelAndView showPopupPage(HttpServletRequest request, HttpServletResponse response) throws Exception {
			ModelAndView mav = new ModelAndView();
			mav.setViewName("oontent/common/payPrintPop");
			//mav.setViewName("content/gover/masterReg");
			return mav;
		}
		
		@GetMapping(path="/masterReg") //http://localhost:8080/api/get/dbTest
	    public ModelAndView masterReg(HttpServletRequest httpRequest, HttpServletResponse response) throws Exception {
//			response.setHeader("X-Frame-Options", "SAMEORIGIN");
//			response.setHeader("Content-Security-Policy", " frame-ancestors 'self'");
			
			ModelAndView mav = new ModelAndView();
			HashMap params = new HashMap();
			
			ArrayList<HashMap> jisaList = mainService.selectQuery("commonSQL.selectJisaList",params);
			ArrayList<HashMap> jimokList = mainService.selectQuery("commonSQL.selectJimokList",params);
			ArrayList<HashMap> usePurposlist = mainService.selectQuery("commonSQL.selectUsePurposList",params);
			
			log.info("jisaList:"+jisaList);
			log.info("jimokList:"+jimokList);
			
			mav.addObject("jisaList",jisaList);
			mav.addObject("jimokList",jimokList);
			mav.addObject("usePurposlist",usePurposlist);
			
			mav.setViewName("content/gover/masterReg");
			return mav;
		}
		
		
		
		//파일 다운로드 ,패스와 파일 이름 넘김다 parameter
		//filePath=
		//fileName=
		@GetMapping(path="/download")
		public void download(HttpServletRequest request, HttpServletResponse response){

			String resultStr = "";
			String path 		= "";
			String fileOriName  = request.getParameter("fileName");
			
//			if (m_strSubPath != null && m_strSubPath != "") {
//				path = path + m_strSubPath + "/" + filePath;
//			} else {
//				path = path + filePath;
//			}
			String filePath=request.getParameter("filePath");
			path = filePath;
			System.out.println("path="+path);
			
			try {
				File f = new File( path);
				if(!f.isFile()){
					resultStr = "파일이 존재하지 않습니다.";
			        response.setCharacterEncoding( "UTF-8" );
			        response.setContentType("text/html; charset=UTF-8");
			        response.getWriter().write( "<html><head><meta http-equiv=\"Content-Type\" content=\"text/html; charset=UTF-8\"><script>alert('파일이 존재하지 않습니다.'); history.back();</script></head></html>" );
			        				
				}else{
					int		filesize	= (int)f.length();
					byte	b[]			= new byte[1024];

					response.setHeader("Content-Type", "application/octet-stream;");
					response.setHeader("Content-Disposition", "attachment;filename="+java.net.URLEncoder.encode(fileOriName,"UTF-8")+";");

					response.setHeader("Content-Transfer-Encoding", "binary;");
					response.setHeader("Content-Length", ""+filesize);
					response.setHeader("Cache-Control","no-cache");
					response.setHeader("Pragma", "no-cache;");
					response.setHeader("Expires", "-1;");  
					int fsize = filesize;

					if (fsize > 0 ){
						BufferedInputStream  fin  = new BufferedInputStream(new FileInputStream(f), 1024);
						BufferedOutputStream outs = new BufferedOutputStream(response.getOutputStream(), 1024);


						int readcnt = 0;

						try
						{
							while ((readcnt = fin.read(b)) != -1){
								outs.write(b,0,readcnt);
							}

							outs.close();
							fin.close();
						} catch (Exception e) {
							System.out.println(e.getMessage());
						} finally {
							if(outs!=null) outs.close();
							if(fin!=null) fin.close();
						}
					}
				}
			}catch(FileNotFoundException e){
				System.out.println(" FileService FileNotFoundException : " + e.getMessage());
			}catch(Exception e){
				System.out.println("FileService exception :" + e.getMessage());
				resultStr = (e.toString());
			}
			
		}


}
