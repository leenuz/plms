package com.slsolution.plms.controller;



import java.util.ArrayList;
import java.util.Enumeration;
import java.util.HashMap;
import java.util.List;
import java.util.Locale;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.i18n.LocaleContextHolder;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.ModelAndView;

import com.slsolution.plms.MainService;
import com.slsolution.plms.json.JSONArray;
import com.slsolution.plms.json.JSONObject;
import com.slsolution.plms.model.CountryModel;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Controller
public class MainController {
	 @Autowired
	private MainService mainService;
	
	
//	
	@GetMapping("/")
	  public ModelAndView main(HttpServletRequest request) {
		
		ModelAndView mav=new ModelAndView();
		List<String> resultList=new ArrayList<String>();
		
		try {
			
			resultList.add("AAA");
			resultList.add("BBB");
			resultList.add("CCC");
			
			HttpSession session = request.getSession();
			
			Object checkId = request.getSession().getAttribute("userId");
			System.out.println("TEST - checkId :: " + checkId);
			
			Enumeration<String> attributeNames = session.getAttributeNames();
			
			ArrayList<String> attrNames = new ArrayList<>();
			Map<String, Object> attrArray =  new HashMap<String, Object>();
			
			while(attributeNames.hasMoreElements()) {
				String attributeName = attributeNames.nextElement();
				System.out.println("Session Attribute name : " + attributeName);
				attrNames.add(attributeName);
			}
			
			for(int i = 0 ; i < attrNames.size() ; i++ ) {
				Object valueCheck = session.getAttribute(attrNames.get(i));
				System.out.println("att :: " + attrNames.get(i) + " || " + valueCheck);
				attrArray.put(attrNames.get(i), valueCheck);
			}
			
			JSONObject menuCheck = new JSONObject(attrArray);
			log.info("menuCheck:"+menuCheck);
			JSONObject menu2pmsResultList = new JSONObject(menuCheck.get("plmsMenu").toString());
			JSONArray menuResultList = menu2pmsResultList.getJSONArray("resultList");
			
			System.out.println("plmsMenu :: " + menuCheck.get("plmsMenu").toString());
			System.out.println("2pmsMenu :: " + menuCheck.get("2pmsMenu").toString());
			
//			System.out.println(menu2pmsResultList.getJSONArray("resultList"));
			
			for(int k = 0 ; k < menuResultList.length() ; k++ ) {
				System.out.println(menuResultList.get(k).toString());
			}
			
			System.out.println("========================================");
			
			mav.addObject("resultList",resultList);
			mav.setViewName("content/home");
		} catch(Exception e) {
			e.printStackTrace();
		}
		
		return mav;
	}
	@RequestMapping("/index")
	  public ModelAndView index(ModelAndView modelAndView) {
//		 Locale locale = new Locale(request.getParameter("language"));
//	        localeResolver.setLocale(request,response, locale);
	    	log.info("LJS:------------start index2 page--------");
	    	
	        
//	        log.info("LocaleResolver : {}", messageSource.getMessage("hello", new Object[]{}, localeResolver.resolveLocale(request)));
//
//	        log.info("messageSourceAccessor : {}", messageSourceAccessor.getMessage("hello"));
//	        log.info("messageSourceAccessor with LocaleResolver : {}", messageSourceAccessor.getMessage("hello", localeResolver.resolveLocale(request)));
	    	modelAndView.setViewName("index");
	    	return modelAndView;
	    }
	@RequestMapping("/datatables")
	  public ModelAndView datatables(ModelAndView modelAndView) {
//		 Locale locale = new Locale(request.getParameter("language"));
//	        localeResolver.setLocale(request,response, locale);
	    	log.info("LJS:------------start index2 page--------");
	    	
	        
//	        log.info("LocaleResolver : {}", messageSource.getMessage("hello", new Object[]{}, localeResolver.resolveLocale(request)));
//
//	        log.info("messageSourceAccessor : {}", messageSourceAccessor.getMessage("hello"));
//	        log.info("messageSourceAccessor with LocaleResolver : {}", messageSourceAccessor.getMessage("hello", localeResolver.resolveLocale(request)));
	    	modelAndView.setViewName("datatables");
	    	return modelAndView;
	    }
	
	@GetMapping(path="/mariadbTest") //http://localhost:8080/api/get/dbTest
    public void dbTest(HttpServletRequest httpRequest, HttpServletResponse response) throws Exception {
        
//        List<TestDTO> list = new ArrayList<TestDTO>();
//        list = dbService.getList();
		HashMap params = new HashMap();
		ArrayList<HashMap> list=new ArrayList<HashMap>();
		//List<CountryModel> list = masterDataBaseService.getCountry();
		list = mainService.selectQuery("testSQL.selectAllList", params);
        log.info("LJS:"+list.toString());
        //nhServ1.test();
        //ts.Test1();
        HashMap<String,Object> resultmap=new HashMap();
        resultmap.put("resultCode","0000");
        resultmap.put("resultData",list);
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
       // return new ModelAndView("dbTest", "list", list);
    }
	
	@RequestMapping(value = "/home", method=RequestMethod.GET)
	public ModelAndView goHome(HttpServletRequest request) {
		ModelAndView mav=new ModelAndView();
		List<String> resultList=new ArrayList<String>();
		resultList.add("AAA");
		resultList.add("BBB");
		resultList.add("CCC");
		
		mav.addObject("resultList",resultList);
		mav.setViewName("content/home");
		return mav;
	}
	
	@RequestMapping(value = "/board", method=RequestMethod.GET)
	public ModelAndView goboard(HttpServletRequest request) {
		ModelAndView mav=new ModelAndView();
		List<String> resultList=new ArrayList<String>();
		resultList.add("AAA");
		resultList.add("BBB");
		resultList.add("CCC");
		
		mav.addObject("resultList",resultList);
		mav.setViewName("content/board");
		return mav;
	}

}
