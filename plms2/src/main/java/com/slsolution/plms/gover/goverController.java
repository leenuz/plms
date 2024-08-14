package com.slsolution.plms.gover;

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
import com.slsolution.plms.jisang.jisangController;
import com.slsolution.plms.json.JSONObject;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@EnableAsync
@RequiredArgsConstructor
@RestController
@RequestMapping("/gover")
@CrossOrigin(origins="*",allowedHeaders="*")
public class goverController {
	@Autowired
	private MainService mainService;
	
	@GetMapping(path="/api/list") //http://localhost:8080/api/get/dbTest
    public void apiList(HttpServletRequest httpRequest, HttpServletResponse response) throws Exception {
        
//        List<TestDTO> list = new ArrayList<TestDTO>();
//        list = dbService.getList();
		HashMap params = new HashMap();
		ArrayList<HashMap>  list=new ArrayList<HashMap>();
		//List<CountryModel> list = masterDataBaseService.getCountry();
		//ArrayList<HashMap> list = sqlSession.selectList("selectAllList",params);
				
		list=mainService.selectQuery("goverSQL.selectAllList", params);
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
				
		list=mainService.selectQuery("goverSQL.selectAllList", params);
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
      			mav.setViewName("content/gover/list");
      			return mav;
    }

	@GetMapping(path="/view/write") //http://localhost:8080/api/get/dbTest
    public ModelAndView viewWrite(HttpServletRequest httpRequest, HttpServletResponse response) throws Exception {
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
      			mav.setViewName("content/gover/write");
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
      			mav.setViewName("content/gover/view");
      			return mav;
    }
	
	
	//occupationDetails
		@GetMapping(path="/occupationDetails") //http://localhost:8080/api/get/dbTest
	    public ModelAndView occupationDetails(HttpServletRequest httpRequest, HttpServletResponse response) throws Exception {
			ModelAndView mav=new ModelAndView();
			
			
//	        List<TestDTO> list = new ArrayList<TestDTO>();
//	        list = dbService.getList();
			HashMap params = new HashMap();
			ArrayList<HashMap>  list=new ArrayList<HashMap>();
			//List<CountryModel> list = masterDataBaseService.getCountry();
			//ArrayList<HashMap> list = sqlSession.selectList("selectAllList",params);
					
//			list=mainService.selectQuery("jisangSQL.selectAllList", params);
//	        log.info("jisang /list:"+list.toString());
	        //nhServ1.test();
	        //ts.Test1();
//	        HashMap<String,Object> resultmap=new HashMap();
//	        resultmap.put("resultCode","0000");
//	        resultmap.put("resultData",list);
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
//	       // return new ModelAndView("dbTest", "list", list);

			String idx = httpRequest.getParameter("idx");
			String index = httpRequest.getParameter("index");
			String gidx = httpRequest.getParameter("gidx");

			params.put("idx",idx);
			params.put("index",index);
//			log.info("params:"+params);
			ArrayList<HashMap> data = mainService.selectQuery("goverSQL.selectAllData",params);
			ArrayList<HashMap> permitList = mainService.selectQuery("goverSQL.selectPermitList",params);
			ArrayList<HashMap> pnuList = mainService.selectQuery("goverSQL.selectPnuList",params);
			ArrayList<HashMap> atcFileList = mainService.selectQuery("goverSQL.selectAtcFileList",params);

			HashMap targetParam = new HashMap();
			targetParam.put("idx",Integer.parseInt(gidx));
			ArrayList<HashMap> pnuTargetList = new ArrayList<HashMap>();
			if(!gidx.equals("0")){
				pnuTargetList = mainService.selectQuery("goverSQL.selectPnuTargetList",targetParam);
				params.put("pnu", pnuTargetList.get(0).get("gp_pnu"));

			}


//			ArrayList<HashMap> goverPnuAtcFileList = mainService.selectQuery("goverSQL.selectPnuAtcFileList",params);
			ArrayList<HashMap> goverPnuAtcFileList = mainService.selectQuery("jisangSQL.selectPnuAtcFileList",params);
//			ArrayList<HashMap> jisangPermitList = mainService.selectQuery("goverSQL.selectPermitList",params);
//			ArrayList<HashMap> jisangModifyList = mainService.selectQuery("goverSQL.selectModifyList",params);
//			ArrayList<HashMap> jisangMergeList = mainService.selectQuery("goverSQL.selectMergeList",params);

			log.info("params:"+params);
			log.info("data:"+data.get(0));
			log.info("pnu:"+pnuTargetList.get(0).get("gp_pnu"));
//			log.info("jm_pipe_yn:"+data.get(0).get("gm_pipe_yn"));
			log.info("gm_youngdo:"+data.get(0).get("gm_youngdo"));
			log.info("gm_pipe_name:"+data.get(0).get("gm_pipe_name"));
			log.info("permitList:"+permitList);
			log.info("atcFileList:"+atcFileList);
//			log.info("jm_jijuk_area:"+data.get(0).get("gm_jijuk_area"));
//			log.info("jisangPermitList:"+jisangPermitList);
//
//			log.info("souja count:"+soujaList.size());
//			log.info("soujaList:"+soujaList);
//			log.info("atcFileList:"+atcFileList);

			mav.addObject("resultData",data.get(0));
			mav.addObject("permitList",permitList);
			mav.addObject("pnuList",pnuList);
			mav.addObject("atcFileList",atcFileList);
			mav.addObject("pnuTargetList",pnuTargetList);

			mav.addObject("goverPnuAtcFileList",goverPnuAtcFileList);
//			mav.addObject("atcFileList",atcFileList);
//			mav.addObject("jisangModifyList",jisangModifyList);
//			mav.addObject("jisangMergeList",jisangMergeList);

			mav.setViewName("content/gover/occupationDetails");
			return mav;
	    }
}
