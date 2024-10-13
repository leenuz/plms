package com.slsolution.plms.stats;

import com.slsolution.plms.MainService;
import com.slsolution.plms.ParameterParser;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

import java.util.ArrayList;
import java.util.HashMap;

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
		//지사코드
	    ArrayList<HashMap> jisalist = mainService.selectQuery("commonSQL.selectAllJisaList", null);
		log.info("jisaList:" + jisalist);

		ModelAndView mav=new ModelAndView();
		mav.addObject("jisaList", jisalist);
		mav.setViewName("content/stats/rightStatus");
		return mav;
	}

	@GetMapping(path="/issueStatus") //http://localhost:8080/api/get/dbTest
	public ModelAndView issueStatus(HttpServletRequest httpRequest, HttpServletResponse response) throws Exception {
		//지사코드
	    ArrayList<HashMap> jisalist = mainService.selectQuery("commonSQL.selectAllJisaList", null);
		log.info("jisaList:" + jisalist);

		ModelAndView mav=new ModelAndView();
		mav.addObject("jisaList", jisalist);
		mav.setViewName("content/stats/issueStatus");
		return mav;
	}

	@GetMapping(path="/issuePopup") //http://localhost:8081/stats/parcelPopup?JISA=서울지사&YYYY=2024&MM=9&GUBUN=등기
	public ModelAndView issuePopup(HttpServletRequest httpRequest, HttpServletResponse response) throws Exception {

		ParameterParser parser = new ParameterParser(httpRequest);
		String JISA = parser.getString("JISA", "");
		String DEPTH1NAME = parser.getString("DEPTH1NAME", "");
		String DEPTH2NAME = parser.getString("DEPTH2NAME", "");
		String DEPTH3NAME = parser.getString("DEPTH3NAME", "");
		String DEPTH1CODE = parser.getString("DEPTH1CODE", "");
		String DEPTH2CODE = parser.getString("DEPTH2CODE", "");
		String DEPTH3CODE = parser.getString("DEPTH3CODE", "");

		ModelAndView mav=new ModelAndView();
		mav.addObject("jisa", JISA);
		mav.addObject("depth1code", DEPTH1CODE);
		mav.addObject("depth2code", DEPTH2CODE);
		mav.addObject("depth3code", DEPTH3CODE);
		mav.addObject("depth1name", DEPTH1NAME);
		mav.addObject("depth2name", DEPTH2NAME);
		mav.addObject("depth3name", DEPTH3NAME);
		mav.setViewName("content/stats/issuePopup");
		return mav;
	}

	@GetMapping(path="/issuePopup2") //http://localhost:8081/stats/parcelPopup?JISA=서울지사&YYYY=2024&MM=9&GUBUN=등기
	public ModelAndView issuePopup2(HttpServletRequest httpRequest, HttpServletResponse response) throws Exception {

		ParameterParser parser = new ParameterParser(httpRequest);
		String JISA = parser.getString("JISA", "");
		String DEPTH1NAME = parser.getString("DEPTH1NAME", "");
		String DEPTH2NAME = parser.getString("DEPTH2NAME", "");
		String DEPTH3NAME = parser.getString("DEPTH3NAME", "");
		String DEPTH1CODE = parser.getString("DEPTH1CODE", "");
		String DEPTH2CODE = parser.getString("DEPTH2CODE", "");
		String DEPTH3CODE = parser.getString("DEPTH3CODE", "");

		ModelAndView mav=new ModelAndView();
		mav.addObject("jisa", JISA);
		mav.addObject("depth1code", DEPTH1CODE);
		mav.addObject("depth2code", DEPTH2CODE);
		mav.addObject("depth3code", DEPTH3CODE);
		mav.addObject("depth1name", DEPTH1NAME);
		mav.addObject("depth2name", DEPTH2NAME);
		mav.addObject("depth3name", DEPTH3NAME);
		mav.setViewName("content/stats/issuePopup2");
		return mav;
	}

	@GetMapping(path="/rightChangeStat") //http://localhost:8080/api/get/dbTest
	public ModelAndView rightChangeStat(HttpServletRequest httpRequest, HttpServletResponse response) throws Exception {
		//지사코드
	    ArrayList<HashMap> jisalist = mainService.selectQuery("commonSQL.selectAllJisaList", null);
		log.info("jisaList:" + jisalist);

		ModelAndView mav=new ModelAndView();
		mav.addObject("jisaList", jisalist);
		mav.setViewName("content/stats/rightChangeStat");
		return mav;
	}

	@GetMapping(path="/parcelChangeStat") //http://localhost:8080/api/get/dbTest
	public ModelAndView parcelChangeStat(HttpServletRequest httpRequest, HttpServletResponse response) throws Exception {
		
		// 기준/비교 년도 리스트
	    ArrayList<HashMap> yyyyList = (ArrayList) mainService.selectQuery("staticSQL.selectFieldInDeListYYYY", null);
		log.info("yyyyList:" + yyyyList);
		
		ModelAndView mav=new ModelAndView();
		mav.addObject("yyyyList", yyyyList);
		mav.setViewName("content/stats/parcelChangeStat");
		return mav;
	}

	@GetMapping(path="/parcelPopup") //http://localhost:8081/stats/parcelPopup?JISA=서울지사&YYYY=2024&MM=9&GUBUN=등기
	public ModelAndView parcelPopup(HttpServletRequest httpRequest, HttpServletResponse response) throws Exception {

		ParameterParser parser = new ParameterParser(httpRequest);
		String JISA = parser.getString("JISA", "");
		String YYYY = parser.getString("YYYY", "");
		String MM = parser.getString("MM", "");
		String GUBUN = parser.getString("GUBUN", "");

		ModelAndView mav=new ModelAndView();
		mav.addObject("jisa", JISA);
		mav.addObject("yyyy", YYYY);
		mav.addObject("mm", MM);
		mav.addObject("gubun", GUBUN);
		mav.setViewName("content/stats/parcelPopup");
		return mav;
	}

	@GetMapping(path="/parcelPopup2") //http://localhost:8081/stats/parcelPopup2?JISA=서울지사&YYYY=2024&MM=9&GUBUN=필지&YYYY_REF=2024&MM_REF=9&YYYY_TG=2024&MM_TG=8&GOVER_OWN=사유지&JISANG_STATUS=지상권
	public ModelAndView parcelPopup2(HttpServletRequest httpRequest, HttpServletResponse response) throws Exception {

		ParameterParser parser = new ParameterParser(httpRequest);
		String JISA = parser.getString("JISA", "");
		String YYYY = parser.getString("YYYY", "");
		String MM = parser.getString("MM", "");
		String YYYY_REF = parser.getString("YYYY_REF", "");
		String MM_REF = parser.getString("MM_REF", "");
		String YYYY_TG = parser.getString("YYYY_TG", "");
		String MM_TG = parser.getString("MM_TG", "");
		String GUBUN = parser.getString("GUBUN", "");
		String GOVER_OWN = parser.getString("GOVER_OWN", "");
		String JISANG_STATUS = parser.getString("JISANG_STATUS", "");

		ModelAndView mav=new ModelAndView();
		mav.addObject("jisa", JISA);
		mav.addObject("yyyy", YYYY);
		mav.addObject("mm", MM);
		mav.addObject("yyyy_ref", YYYY_REF);
		mav.addObject("mm_ref", MM_REF);
		mav.addObject("yyyy_tg", YYYY_TG);
		mav.addObject("mm_tg", MM_TG);
		mav.addObject("gubun", GUBUN);
		mav.addObject("gover_own", GOVER_OWN);
		mav.addObject("jisang_status", JISANG_STATUS);
		mav.setViewName("content/stats/parcelPopup2");
		return mav;
	}

	@GetMapping(path="/parcelPopup3") //http://localhost:8081/stats/parcelPopup2?JISA=서울지사&YYYY=2024&MM=9&GUBUN=필지&YYYY_REF=2024&MM_REF=9&YYYY_TG=2024&MM_TG=8&GOVER_OWN=사유지&JISANG_STATUS=지상권
	public ModelAndView parcelPopup3(HttpServletRequest httpRequest, HttpServletResponse response) throws Exception {

		ParameterParser parser = new ParameterParser(httpRequest);
		String JISA = parser.getString("JISA", "");
		String YYYY_REF = parser.getString("YYYY_REF", "");
		String MM_REF = parser.getString("MM_REF", "");
		String YYYY_TG = parser.getString("YYYY_TG", "");
		String MM_TG = parser.getString("MM_TG", "");
		String GUBUN = parser.getString("GUBUN", "");
		String STATUS = parser.getString("STATUS", "");

		ModelAndView mav=new ModelAndView();
		mav.addObject("jisa", JISA);
		mav.addObject("yyyy_ref", YYYY_REF);
		mav.addObject("mm_ref", MM_REF);
		mav.addObject("yyyy_tg", YYYY_TG);
		mav.addObject("mm_tg", MM_TG);
		mav.addObject("gubun", GUBUN);
		mav.addObject("status", STATUS);
		mav.setViewName("content/stats/parcelPopup3");
		return mav;
	}
}
