package com.slsolution.plms.issue;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.EnableAsync;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.ModelAndView;

import com.slsolution.plms.MainService;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@EnableAsync
@RequiredArgsConstructor
@RestController
@RequestMapping("/issue")
@CrossOrigin(origins="*",allowedHeaders="*")
public class issueController {
	@Autowired
	private MainService mainService;
	@GetMapping(path="/menu06_1") //http://localhost:8080/api/get/dbTest
    public ModelAndView menu06_1(HttpServletRequest httpRequest, HttpServletResponse response) throws Exception {
//		response.setHeader("X-Frame-Options", "SAMEORIGIN");
//		response.setHeader("Content-Security-Policy", " frame-ancestors 'self'");
		ModelAndView mav=new ModelAndView();
		mav.setViewName("content/issue/menu06_1");
		return mav;
	}
//	
	@GetMapping(path="/issueCodeMgmt") //http://localhost:8080/api/get/dbTest
    public ModelAndView issueCodeMgmt(HttpServletRequest httpRequest, HttpServletResponse response) throws Exception {
//		response.setHeader("X-Frame-Options", "SAMEORIGIN");
//		response.setHeader("Content-Security-Policy", " frame-ancestors 'self'");
		ModelAndView mav=new ModelAndView();
		mav.setViewName("content/issue/issueCodeMgmt");
		return mav;
	}
}
