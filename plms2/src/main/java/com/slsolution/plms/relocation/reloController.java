package com.slsolution.plms.relocation;

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

import java.util.ArrayList;
import java.util.HashMap;

@Slf4j
@EnableAsync
@RequiredArgsConstructor
@RestController
@RequestMapping("/relocation")
@CrossOrigin(origins="*",allowedHeaders="*")
public class reloController {
	@Autowired
	private MainService mainService;

	@GetMapping(path="/relocationCheckPilji") //http://localhost:8080/api/get/dbTest
	public ModelAndView relocationCheckPilji(HttpServletRequest httpRequest, HttpServletResponse response) throws Exception {
		HashMap params = new HashMap();
		ArrayList<HashMap> jisalist = mainService.selectQuery("commonSQL.selectAllJisaList",params);
		ArrayList<HashMap> sidolist = mainService.selectQuery("commonSQL.getSidoMaster",params);

		ModelAndView mav=new ModelAndView();
		mav.addObject("jisaList",jisalist);
		mav.addObject("sidoList",sidolist);
		mav.setViewName("content/relocation/relocationCheckPilji");
		return mav;
	}

}
