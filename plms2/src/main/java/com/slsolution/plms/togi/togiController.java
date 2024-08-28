package com.slsolution.plms.togi;

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
@RequestMapping("/togi")
@CrossOrigin(origins="*",allowedHeaders="*")
public class togiController {
	@Autowired
	private MainService mainService;
	
	@GetMapping(path="/menu04_1") //http://localhost:8080/api/get/dbTest
    public ModelAndView menu04_1(HttpServletRequest httpRequest, HttpServletResponse response) throws Exception {
//		response.setHeader("X-Frame-Options", "SAMEORIGIN");
//		response.setHeader("Content-Security-Policy", " frame-ancestors 'self'");
		ModelAndView mav=new ModelAndView();
		mav.setViewName("content/togi/menu04_1");
		return mav;
	}
	
	@GetMapping(path="/landReg") //http://localhost:8080/api/get/dbTest
    public ModelAndView landReg(HttpServletRequest httpRequest, HttpServletResponse response) throws Exception {
//		response.setHeader("X-Frame-Options", "SAMEORIGIN");
//		response.setHeader("Content-Security-Policy", " frame-ancestors 'self'");
		ModelAndView mav=new ModelAndView();
		mav.setViewName("content/togi/landReg");
		return mav;
	}
	@GetMapping(path="/landDevInfo") //http://localhost:8080/api/get/dbTest
    public ModelAndView landDevInfo(HttpServletRequest httpRequest, HttpServletResponse response) throws Exception {
//		response.setHeader("X-Frame-Options", "SAMEORIGIN");
//		response.setHeader("Content-Security-Policy", " frame-ancestors 'self'");
		ModelAndView mav=new ModelAndView();
		mav.setViewName("content/togi/landDevInfo");
		return mav;
	}
	@GetMapping(path="/landEdit") //http://localhost:8080/api/get/dbTest
    public ModelAndView landEdit(HttpServletRequest httpRequest, HttpServletResponse response) throws Exception {
//		response.setHeader("X-Frame-Options", "SAMEORIGIN");
//		response.setHeader("Content-Security-Policy", " frame-ancestors 'self'");
		ModelAndView mav=new ModelAndView();
		mav.setViewName("content/togi/landEdit");
		return mav;
	}
	
}
