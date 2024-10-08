package com.slsolution.plms.stats;

import com.slsolution.plms.MainService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.EnableAsync;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.ModelAndView;

@Slf4j
@EnableAsync
@RequiredArgsConstructor
@RestController
@RequestMapping("/stats")
@CrossOrigin(origins="*",allowedHeaders="*")
public class statsController {
	@Autowired
	private MainService mainService;

	@GetMapping(path="/rightCloseMng") //http://localhost:8080/api/get/dbTest
	public ModelAndView rightCloseMng(HttpServletRequest httpRequest, HttpServletResponse response) throws Exception {
		ModelAndView mav=new ModelAndView();
		mav.setViewName("content/stats/rightCloseMng");
		return mav;
	}

	@GetMapping(path="/rightStatus") //http://localhost:8080/api/get/dbTest
	public ModelAndView rightStatus(HttpServletRequest httpRequest, HttpServletResponse response) throws Exception {
		ModelAndView mav=new ModelAndView();
		mav.setViewName("content/stats/rightStatus");
		return mav;
	}

	@GetMapping(path="/issueStatus") //http://localhost:8080/api/get/dbTest
	public ModelAndView issueStatus(HttpServletRequest httpRequest, HttpServletResponse response) throws Exception {
		ModelAndView mav=new ModelAndView();
		mav.setViewName("content/stats/issueStatus");
		return mav;
	}

	@GetMapping(path="/rightChangeStat") //http://localhost:8080/api/get/dbTest
	public ModelAndView rightChangeStat(HttpServletRequest httpRequest, HttpServletResponse response) throws Exception {
		ModelAndView mav=new ModelAndView();
		mav.setViewName("content/stats/rightChangeStat");
		return mav;
	}

	@GetMapping(path="/parcelChangeStat") //http://localhost:8080/api/get/dbTest
	public ModelAndView parcelChangeStat(HttpServletRequest httpRequest, HttpServletResponse response) throws Exception {
		ModelAndView mav=new ModelAndView();
		mav.setViewName("content/stats/parcelChangeStat");
		return mav;
	}
}
