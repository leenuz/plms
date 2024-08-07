package com.slsolution.plms.jisang;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Properties;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.EnableAsync;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.ModelAndView;

import com.slsolution.plms.CommonUtil;
import com.slsolution.plms.MainService;

import com.slsolution.plms.json.JSONObject;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@EnableAsync
@RequiredArgsConstructor
@RestController
@RequestMapping("/jisang")
@CrossOrigin(origins="*",allowedHeaders="*")
public class jisangController {
	
	@Autowired
	private MainService mainService;
	
	
	@RequestMapping(value="/api/Save", method = {RequestMethod.GET, RequestMethod.POST}) //http://localhost:8080/api/get/dbTest
    public void Save(HttpServletRequest httpRequest, HttpServletResponse response) throws Exception {
        
		//일반웹형식
		Properties requestParams = CommonUtil.convertToProperties(httpRequest);
        log.info("requestParams:"+requestParams);
        
//        //json으로 넘어올때
//        String getRequestBody = ParameterUtil.getRequestBodyToStr(httpRequest);
//        log.info("getRequestBody:"+getRequestBody);
        
//        List<TestDTO> list = new ArrayList<TestDTO>();
//        list = dbService.getList();
		
        HashMap<String,Object> resultmap=new HashMap();
        resultmap.put("resultCode","0000");
        resultmap.put("resultData",requestParams);
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
	
	
	
	@GetMapping(path="/api/list") //http://localhost:8080/api/get/dbTest
    public void apiList(HttpServletRequest httpRequest, HttpServletResponse response) throws Exception {
        
//        List<TestDTO> list = new ArrayList<TestDTO>();
//        list = dbService.getList();
		HashMap params = new HashMap();
		ArrayList<HashMap>  list=new ArrayList<HashMap>();
		//List<CountryModel> list = masterDataBaseService.getCountry();
		//ArrayList<HashMap> list = sqlSession.selectList("selectAllList",params);
				
		list=mainService.selectQuery("jisangSQL.selectAllList", params);
        log.info("jisang /list:"+list.toString());
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
	
	
	@GetMapping(path="/view/list") //http://localhost:8080/api/get/dbTest
    public ModelAndView viewList(HttpServletRequest httpRequest, HttpServletResponse response) throws Exception {
		ModelAndView mav=new ModelAndView();
		
		
//        List<TestDTO> list = new ArrayList<TestDTO>();
//        list = dbService.getList();
		HashMap params = new HashMap();
		ArrayList<HashMap>  list=new ArrayList<HashMap>();
		//List<CountryModel> list = masterDataBaseService.getCountry();
		//ArrayList<HashMap> list = sqlSession.selectList("selectAllList",params);
				
		list=mainService.selectQuery("jisangSQL.selectAllList", params);
        log.info("jisang /list:"+list.toString());
        //nhServ1.test();
        //ts.Test1();
//        HashMap<String,Object> resultmap=new HashMap();
//        resultmap.put("resultCode","0000");
//        resultmap.put("resultData",list);
//        resultmap.put("resultMessage","success");
//        JSONObject obj =new JSONObject(resultmap);
////        System.out.println(obj);
//       
//      //log.info("jo:"+jo);
//      			response.setCharacterEncoding("UTF-8");
//      			response.setHeader("Access-Control-Allow-Origin", "*");
//      			response.setHeader("Cache-Control", "no-cache");
//      			response.resetBuffer();
//      			response.setContentType("application/json");
//      			//response.getOutputStream().write(jo);
//      			response.getWriter().print(obj);
//      			response.getWriter().flush();
//       // return new ModelAndView("dbTest", "list", list);
        
      			mav.addObject("resultList",list);
      			mav.setViewName("content/jisang/list");
      			return mav;
    }

	@GetMapping(path="/write") //http://localhost:8080/api/get/dbTest
    public ModelAndView viewWrite(HttpServletRequest httpRequest, HttpServletResponse response) throws Exception {
		ModelAndView mav=new ModelAndView();
		
		
//        List<TestDTO> list = new ArrayList<TestDTO>();
//        list = dbService.getList();
		HashMap params = new HashMap();
		ArrayList<HashMap>  list=new ArrayList<HashMap>();
		
		//List<CountryModel> list = masterDataBaseService.getCountry();
		ArrayList<HashMap> jisalist = mainService.selectQuery("commonSQL.selectAllJisaList",params);
		ArrayList<HashMap> yongdolist = mainService.selectQuery("commonSQL.selectYongdoList",params);
		ArrayList<HashMap> jimoklist = mainService.selectQuery("commonSQL.selectJimokList",params);
//		list=mainService.selectQuery("jisangSQL.selectAllList", params);
//        log.info("jisang /list:"+list.toString());
        //nhServ1.test();
        //ts.Test1();
//        HashMap<String,Object> resultmap=new HashMap();
//        resultmap.put("resultCode","0000");
//        resultmap.put("resultData",list);
//        resultmap.put("resultMessage","success");
//        JSONObject obj =new JSONObject(resultmap);
////        System.out.println(obj);
//       
//      //log.info("jo:"+jo);
//      			response.setCharacterEncoding("UTF-8");
//      			response.setHeader("Access-Control-Allow-Origin", "*");
//      			response.setHeader("Cache-Control", "no-cache");
//      			response.resetBuffer();
//      			response.setContentType("application/json");
//      			//response.getOutputStream().write(jo);
//      			response.getWriter().print(obj);
//      			response.getWriter().flush();
//       // return new ModelAndView("dbTest", "list", list);
        
      			mav.addObject("resultJisaList",jisalist);
      			mav.addObject("resultYongdoList",yongdolist);
      			mav.addObject("resultJimokList",jimoklist);
      			log.info("jisalist:"+jisalist);
      			mav.setViewName("content/jisang/write");
      			return mav;
    }
	
	@GetMapping(path="/view/view") //http://localhost:8080/api/get/dbTest
    public ModelAndView viewView(HttpServletRequest httpRequest, HttpServletResponse response) throws Exception {
		ModelAndView mav=new ModelAndView();
		
		
//        List<TestDTO> list = new ArrayList<TestDTO>();
//        list = dbService.getList();
		HashMap params = new HashMap();
		ArrayList<HashMap>  list=new ArrayList<HashMap>();
		//List<CountryModel> list = masterDataBaseService.getCountry();
		//ArrayList<HashMap> list = sqlSession.selectList("selectAllList",params);
				
//		list=mainService.selectQuery("jisangSQL.selectAllList", params);
//        log.info("jisang /list:"+list.toString());
        //nhServ1.test();
        //ts.Test1();
//        HashMap<String,Object> resultmap=new HashMap();
//        resultmap.put("resultCode","0000");
//        resultmap.put("resultData",list);
//        resultmap.put("resultMessage","success");
//        JSONObject obj =new JSONObject(resultmap);
////        System.out.println(obj);
//       
//      //log.info("jo:"+jo);
//      			response.setCharacterEncoding("UTF-8");
//      			response.setHeader("Access-Control-Allow-Origin", "*");
//      			response.setHeader("Cache-Control", "no-cache");
//      			response.resetBuffer();
//      			response.setContentType("application/json");
//      			//response.getOutputStream().write(jo);
//      			response.getWriter().print(obj);
//      			response.getWriter().flush();
//       // return new ModelAndView("dbTest", "list", list);
        
//      			mav.addObject("resultList",list);
      			mav.setViewName("content/jisang/view");
      			return mav;
    }
	
	
	//groundDetail
	@GetMapping(path="/groundDetail") //http://localhost:8080/api/get/dbTest
    public ModelAndView groundDetail(HttpServletRequest httpRequest, HttpServletResponse response) throws Exception {
		ModelAndView mav=new ModelAndView();
		
		
//        List<TestDTO> list = new ArrayList<TestDTO>();
//        list = dbService.getList();
		HashMap params = new HashMap();
		ArrayList<HashMap>  list=new ArrayList<HashMap>();
		//List<CountryModel> list = masterDataBaseService.getCountry();
		//ArrayList<HashMap> list = sqlSession.selectList("selectAllList",params);
				
//		list=mainService.selectQuery("jisangSQL.selectAllList", params);
//        log.info("jisang /list:"+list.toString());
        //nhServ1.test();
        //ts.Test1();
//        HashMap<String,Object> resultmap=new HashMap();
//        resultmap.put("resultCode","0000");
//        resultmap.put("resultData",list);
//        resultmap.put("resultMessage","success");
//        JSONObject obj =new JSONObject(resultmap);
////        System.out.println(obj);
//       
//      //log.info("jo:"+jo);
//      			response.setCharacterEncoding("UTF-8");
//      			response.setHeader("Access-Control-Allow-Origin", "*");
//      			response.setHeader("Cache-Control", "no-cache");
//      			response.resetBuffer();
//      			response.setContentType("application/json");
//      			//response.getOutputStream().write(jo);
//      			response.getWriter().print(obj);
//      			response.getWriter().flush();
//       // return new ModelAndView("dbTest", "list", list);
        
//      			mav.addObject("resultList",list);
      			mav.setViewName("content/jisang/groundDetail");
      			return mav;
    }
	
	
}
