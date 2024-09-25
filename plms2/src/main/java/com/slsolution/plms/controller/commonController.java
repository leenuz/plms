package com.slsolution.plms.controller;

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


}
