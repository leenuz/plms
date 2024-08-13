package com.slsolution.plms.songyu;

import java.util.ArrayList;
import java.util.Enumeration;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Properties;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.scheduling.annotation.EnableAsync;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.ModelAndView;

import com.slsolution.plms.CommonUtil;
import com.slsolution.plms.MainService;
import com.slsolution.plms.ParameterUtil;
import com.slsolution.plms.json.JSONObject;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@EnableAsync
@RequiredArgsConstructor
@RestController
@RequestMapping("/songyu")
@CrossOrigin(origins="*",allowedHeaders="*")
public class songyuController {

	
	@Autowired
	private MainService mainService;
	
	
	
	@GetMapping(path="/menu01") //http://localhost:8080/api/get/dbTest
    public ModelAndView viewMenu01(HttpServletRequest httpRequest, HttpServletResponse response) throws Exception {
		ModelAndView mav=new ModelAndView();

//      List<TestDTO> list = new ArrayList<TestDTO>();
//      list = dbService.getList();
		HashMap params = new HashMap();
		ArrayList<HashMap>  list=new ArrayList<HashMap>();
		
		//List<CountryModel> list = masterDataBaseService.getCountry();
		ArrayList<HashMap> jisalist = mainService.selectQuery("commonSQL.selectAllJisaList",params);
		ArrayList<HashMap> yongdolist = mainService.selectQuery("commonSQL.selectYongdoList",params);
		ArrayList<HashMap> jimoklist = mainService.selectQuery("commonSQL.selectJimokList",params);
		ArrayList<HashMap> sidolist = mainService.selectQuery("commonSQL.getSidoMaster",params);
		//ArrayList<HashMap> jimoklist = mainService.selectQuery("commonSQL.selectAllList",params);
//		list=mainService.selectQuery("jisangSQL.selectAllList", params);
//      log.info("jisang /list:"+list.toString());
      //nhServ1.test();
      //ts.Test1();
//      HashMap<String,Object> resultmap=new HashMap();
//      resultmap.put("resultCode","0000");
//      resultmap.put("resultData",list);
//      resultmap.put("resultMessage","success");
//      JSONObject obj =new JSONObject(resultmap);
////      System.out.println(obj);
//     
//    //log.info("jo:"+jo);
//    			response.setCharacterEncoding("UTF-8");
//    			response.setHeader("Access-Control-Allow-Origin", "*");
//    			response.setHeader("Cache-Control", "no-cache");
//    			response.resetBuffer();
//    			response.setContentType("application/json");
//    			//response.getOutputStream().write(jo);
//    			response.getWriter().print(obj);
//    			response.getWriter().flush();
//     // return new ModelAndView("dbTest", "list", list);
      
    			mav.addObject("jisaList",jisalist);
    			mav.addObject("resultYongdoList",yongdolist);
    			mav.addObject("resultJimokList",jimoklist);
    			mav.addObject("sidoList",sidolist);
    			log.info("jisalist:"+jisalist);
    			log.info("sidolist:"+sidolist);
    		
				mav.setViewName("content/songyu/menu01");
      			return mav;
    }
	
	@GetMapping(path="/menu01_detail") //http://localhost:8080/api/get/dbTest
    public ModelAndView viewMenu01Detail(HttpServletRequest httpRequest, HttpServletResponse response) throws Exception {
		ModelAndView mav=new ModelAndView();

//      List<TestDTO> list = new ArrayList<TestDTO>();
//      list = dbService.getList();
		HashMap params = new HashMap();
		ArrayList<HashMap>  list=new ArrayList<HashMap>();
		
		//List<CountryModel> list = masterDataBaseService.getCountry();
		ArrayList<HashMap> jisalist = mainService.selectQuery("commonSQL.selectAllJisaList",params);
		ArrayList<HashMap> yongdolist = mainService.selectQuery("commonSQL.selectYongdoList",params);
		ArrayList<HashMap> jimoklist = mainService.selectQuery("commonSQL.selectJimokList",params);
		ArrayList<HashMap> sidolist = mainService.selectQuery("commonSQL.getSidoMaster",params);
		//ArrayList<HashMap> jimoklist = mainService.selectQuery("commonSQL.selectAllList",params);
//		list=mainService.selectQuery("jisangSQL.selectAllList", params);
//      log.info("jisang /list:"+list.toString());
      //nhServ1.test();
      //ts.Test1();
//      HashMap<String,Object> resultmap=new HashMap();
//      resultmap.put("resultCode","0000");
//      resultmap.put("resultData",list);
//      resultmap.put("resultMessage","success");
//      JSONObject obj =new JSONObject(resultmap);
////      System.out.println(obj);
//     
//    //log.info("jo:"+jo);
//    			response.setCharacterEncoding("UTF-8");
//    			response.setHeader("Access-Control-Allow-Origin", "*");
//    			response.setHeader("Cache-Control", "no-cache");
//    			response.resetBuffer();
//    			response.setContentType("application/json");
//    			//response.getOutputStream().write(jo);
//    			response.getWriter().print(obj);
//    			response.getWriter().flush();
//     // return new ModelAndView("dbTest", "list", list);
      
    			mav.addObject("resultJisaList",jisalist);
    			mav.addObject("resultYongdoList",yongdolist);
    			mav.addObject("resultJimokList",jimoklist);
    			mav.addObject("sidoList",sidolist);
    			log.info("jisalist:"+jisalist);
    			log.info("sidolist:"+sidolist);
    		
				mav.setViewName("content/songyu/menu01_detail");
      			return mav;
    }
	
	
	
	
	@GetMapping(path="/notsetAdd") //http://localhost:8080/api/get/dbTest
    public ModelAndView notsetAdd(HttpServletRequest httpRequest, HttpServletResponse response) throws Exception {
		ModelAndView mav=new ModelAndView();

//      List<TestDTO> list = new ArrayList<TestDTO>();
//      list = dbService.getList();
		HashMap params = new HashMap();
		ArrayList<HashMap>  list=new ArrayList<HashMap>();
		
		//List<CountryModel> list = masterDataBaseService.getCountry();
		ArrayList<HashMap> jisalist = mainService.selectQuery("commonSQL.selectAllJisaList",params);
		ArrayList<HashMap> yongdolist = mainService.selectQuery("commonSQL.selectYongdoList",params);
		ArrayList<HashMap> jimoklist = mainService.selectQuery("commonSQL.selectJimokList",params);
		ArrayList<HashMap> sidolist = mainService.selectQuery("commonSQL.getSidoMaster",params);
//		list=mainService.selectQuery("jisangSQL.selectAllList", params);
//      log.info("jisang /list:"+list.toString());
      //nhServ1.test();
      //ts.Test1();
//      HashMap<String,Object> resultmap=new HashMap();
//      resultmap.put("resultCode","0000");
//      resultmap.put("resultData",list);
//      resultmap.put("resultMessage","success");
//      JSONObject obj =new JSONObject(resultmap);
////      System.out.println(obj);
//     
//    //log.info("jo:"+jo);
//    			response.setCharacterEncoding("UTF-8");
//    			response.setHeader("Access-Control-Allow-Origin", "*");
//    			response.setHeader("Cache-Control", "no-cache");
//    			response.resetBuffer();
//    			response.setContentType("application/json");
//    			//response.getOutputStream().write(jo);
//    			response.getWriter().print(obj);
//    			response.getWriter().flush();
//     // return new ModelAndView("dbTest", "list", list);
      
    			mav.addObject("jisaList",jisalist);
    			mav.addObject("resultYongdoList",yongdolist);
    			mav.addObject("resultJimokList",jimoklist);
    			mav.addObject("sidoList",sidolist);
    			log.info("jisalist:"+jisalist);
    		
				mav.setViewName("content/songyu/notsetAdd");
      			return mav;
    }
	
	@GetMapping(path="/searchResultsPopup") //http://localhost:8080/api/get/dbTest
    public ModelAndView searchResultsPopup(HttpServletRequest httpRequest, HttpServletResponse response) throws Exception {
		ModelAndView mav=new ModelAndView();

//      List<TestDTO> list = new ArrayList<TestDTO>();
//      list = dbService.getList();
		HashMap params = new HashMap();
		ArrayList<HashMap>  list=new ArrayList<HashMap>();
		
		//List<CountryModel> list = masterDataBaseService.getCountry();
		ArrayList<HashMap> jisalist = mainService.selectQuery("commonSQL.selectAllJisaList",params);
		ArrayList<HashMap> yongdolist = mainService.selectQuery("commonSQL.selectYongdoList",params);
		ArrayList<HashMap> jimoklist = mainService.selectQuery("commonSQL.selectJimokList",params);
		ArrayList<HashMap> sidolist = mainService.selectQuery("commonSQL.getSidoMaster",params);
//		list=mainService.selectQuery("jisangSQL.selectAllList", params);
//      log.info("jisang /list:"+list.toString());
      //nhServ1.test();
      //ts.Test1();
//      HashMap<String,Object> resultmap=new HashMap();
//      resultmap.put("resultCode","0000");
//      resultmap.put("resultData",list);
//      resultmap.put("resultMessage","success");
//      JSONObject obj =new JSONObject(resultmap);
////      System.out.println(obj);
//     
//    //log.info("jo:"+jo);
//    			response.setCharacterEncoding("UTF-8");
//    			response.setHeader("Access-Control-Allow-Origin", "*");
//    			response.setHeader("Cache-Control", "no-cache");
//    			response.resetBuffer();
//    			response.setContentType("application/json");
//    			//response.getOutputStream().write(jo);
//    			response.getWriter().print(obj);
//    			response.getWriter().flush();
//     // return new ModelAndView("dbTest", "list", list);
      
    			mav.addObject("jisaList",jisalist);
    			mav.addObject("resultYongdoList",yongdolist);
    			mav.addObject("resultJimokList",jimoklist);
    			mav.addObject("sidoList",sidolist);
    			log.info("jisalist:"+jisalist);
    		
				mav.setViewName("content/songyu/popup");
      			return mav;
    }
	
	
	
	@GetMapping(path="/menu02") //http://localhost:8080/api/get/dbTest
    public ModelAndView viewMenu02(HttpServletRequest httpRequest, HttpServletResponse response) throws Exception {
		
		HashMap params = new HashMap();
		ArrayList<HashMap>  list=new ArrayList<HashMap>();
		
		//List<CountryModel> list = masterDataBaseService.getCountry();
		ArrayList<HashMap> jisalist = mainService.selectQuery("commonSQL.selectAllJisaList",params);
		ArrayList<HashMap> yongdolist = mainService.selectQuery("commonSQL.selectYongdoList",params);
		ArrayList<HashMap> jimoklist = mainService.selectQuery("commonSQL.selectJimokList",params);
		ArrayList<HashMap> sidolist = mainService.selectQuery("commonSQL.getSidoMaster",params);
		
		
		
		ModelAndView mav=new ModelAndView();
		mav.addObject("jisaList",jisalist);
		mav.addObject("resultYongdoList",yongdolist);
		mav.addObject("resultJimokList",jimoklist);
		mav.addObject("sidoList",sidolist);
				mav.setViewName("content/songyu/menu02");
      			return mav;
    }
	
	@GetMapping(path="/menu03") //http://localhost:8080/api/get/dbTest
    public ModelAndView viewMenu03(HttpServletRequest httpRequest, HttpServletResponse response) throws Exception {

		HashMap params = new HashMap();
		ArrayList<HashMap>  list=new ArrayList<HashMap>();

		ArrayList<HashMap> jisalist = mainService.selectQuery("commonSQL.selectAllJisaList",params);
		ArrayList<HashMap> yongdolist = mainService.selectQuery("commonSQL.selectYongdoList",params);
		ArrayList<HashMap> jimoklist = mainService.selectQuery("commonSQL.selectJimokList",params);
		ArrayList<HashMap> sidolist = mainService.selectQuery("commonSQL.getSidoMaster",params);

		ModelAndView mav=new ModelAndView();
		mav.addObject("jisaList",jisalist);
		mav.addObject("resultYongdoList",yongdolist);
		mav.addObject("resultJimokList",jimoklist);
		mav.addObject("sidoList",sidolist);
		mav.setViewName("content/songyu/menu03");
		return mav;
    }
	
	@RequestMapping(value="/menu01DataTableList", method = {RequestMethod.GET, RequestMethod.POST}) //http://localhost:8080/api/get/dbTest
    public ResponseEntity<?> datatableList(HttpServletRequest req, HttpServletResponse res) throws Exception {
        
		//일반웹형식
				Properties requestParams = CommonUtil.convertToProperties(req);
		        log.info("requestParams:"+requestParams);
//		        JSONObject jobj=new JSONObject(requestParams.toString());
//		        log.info("obj:"+jobj);
		        
		        
		        //json으로 넘어올때
//		        String getRequestBody = ParameterUtil.getRequestBodyToStr(req);
//		        JSONObject object=new JSONObject(requestParams.toString());
//		        if (object!=null) {
//		        log.info("getRequestBody:"+object.getString("jisa"));
//		        }
		        //log.info("jisa="+getRequestBody.g)
		        
		        HashMap<String, String> returnHash = new HashMap<String, String>();
		        Enumeration<String> obj1 = req.getParameterNames();
		        int cnt=0;
		     

		        while (obj1.hasMoreElements())
		        {
		            String paramName = obj1.nextElement();
		            String paramValue = req.getParameter(paramName);
		            returnHash.put(paramName, paramValue);
		        }
		        
		        
		        int draw = Integer.parseInt(req.getParameter("draw"));
				int start = Integer.parseInt(req.getParameter("start"));
				int length = Integer.parseInt(req.getParameter("length"));
				String orderColumn=req.getParameter("order[0][column]");
				String orderDirection = req.getParameter("order[0][dir]");
				String orderColumnName=req.getParameter("columns[" + orderColumn + "][data]");
				
				log.info("orderColumn:"+orderColumn);
				log.info("orderColumnName:"+orderColumnName);
				log.info("orderDirection:"+orderDirection);
				String[] order_cols=req.getParameterValues("order");
//				List val=new ArrayList();
//				int mx=order_cols.length;
				
//				
				String jisa = req.getParameter("jisa");
				String manage_no = req.getParameter("manage_no");
				String right_type=req.getParameter("right_type");
				String dosiplan=req.getParameter("dosiplan");
				
				String address=req.getParameter("saddr");
				if (address.equals("undefined")) address=null;
				
				String toji_plan_type=req.getParameter("toji_plan_type");
				String toji_type=req.getParameter("toji_type");
				String right_overlap=req.getParameter("right_overlap");
				Map map=req.getParameterMap();
		        log.info("draw:"+draw);
		        log.info("length:"+length);
		        
		        	//log.info("mx:"+mx);
		        	
		       
		        
		        log.info("jisa:"+jisa);
		        log.info("manage_no:"+manage_no);
		        log.info("right_type:"+right_type);
		        log.info("toji_plan_type:"+toji_plan_type);
		       
		        
				HashMap params = new HashMap();
				params.put("draw",draw);
				params.put("start",start);
				params.put("length",length);
				params.put("jisa",req.getParameter("jisa"));
				params.put("idx",manage_no);
				params.put("dosiplan",dosiplan);
				params.put("address",address);
				params.put("toji_plan_type",toji_plan_type);
				params.put("toji_type",toji_type);
				params.put("right_overlap",right_overlap);
				String[] right_arr= {};
				right_arr=right_type.split(",");
				params.put("right_type", right_arr);
//				String right_type_str=(type_gover!=null && type_gover.equals("on"))?"gover" :""
//					+"|"+ (type_jisang!=null && type_jisang.equals("on")) ? "jisang":""+"|";
//				//if (type_gover!=null && type_gover.equals("on")) right_type_str= 
//				params.put("right_type","gover");
				if (orderColumn==null || orderColumn.equals("null")) {
					log.info("----------null--------");
					orderColumn="0";
				}
				if (Integer.parseInt(orderColumn)>0  ) {
					params.put("orderCol",orderColumnName);
					params.put("desc",orderDirection);
				
				}
				else {
					params.put("orderCol","");
					params.put("desc","");	
				}
				log.info("params:"+params);
//				ArrayList<HashMap>  list=new ArrayList<HashMap>();
				Object count= mainService.selectCountQuery("songyuSQL.selectTotalCount", params);
	            int total=(int)count;
				
				ArrayList<HashMap> list = mainService.selectQuery("songyuSQL.selectAllList",params);
			//	log.info("list:"+list);
//				for(int i=0;i<List.size();i++) {
//					HashMap map=new HashMap();
//					map.put("jm_jisa",List.get(i).get("jm_jisa"));
//					map.put("fullNmKr","fullnmKr"+i);
//					map.put("userStatCd","user"+i);
//					map.put("superUser","super"+i);
//					list.add(map);
//				}
				
				
				//int total=list.size();
			
				
				
				
				 HashMap<String,Object> resultmap=new HashMap();
			        resultmap.put("draw",draw);
			        resultmap.put("recordsTotal",total);
			        resultmap.put("recordsFiltered",total);
			        resultmap.put("data",list);
			        
			        JSONObject obj =new JSONObject(resultmap);
			        log.info("obj:"+obj);
			    	return ResponseEntity.ok(obj.toString());
//			        JSONObject obj =new JSONObject(resultmap);
//			        System.out.println(obj);
//			       
//			      //log.info("jo:"+jo);
//			      			res.setCharacterEncoding("UTF-8");
//			      			res.setHeader("Access-Control-Allow-Origin", "*");
//			      			res.setHeader("Cache-Control", "no-cache");
//			      			res.resetBuffer();
//			      			res.setContentType("application/json");
//			      			//response.getOutputStream().write(jo);
//			      			res.getWriter().print(obj);
//			      			res.getWriter().flush();
    }
	
	
	
	@RequestMapping(value="/menu02DataTableList", method = {RequestMethod.GET, RequestMethod.POST}) //http://localhost:8080/api/get/dbTest
    public ResponseEntity<?> datatableList02(HttpServletRequest req, HttpServletResponse res) throws Exception {
        
		//일반웹형식
				Properties requestParams = CommonUtil.convertToProperties(req);
		        log.info("requestParams:"+requestParams);
//		        JSONObject jobj=new JSONObject(requestParams.toString());
//		        log.info("obj:"+jobj);
		        
		        
		        //json으로 넘어올때
//		        String getRequestBody = ParameterUtil.getRequestBodyToStr(req);
//		        JSONObject object=new JSONObject(requestParams.toString());
//		        if (object!=null) {
//		        log.info("getRequestBody:"+object.getString("jisa"));
//		        }
		        //log.info("jisa="+getRequestBody.g)
		        
		        HashMap<String, String> returnHash = new HashMap<String, String>();
		        Enumeration<String> obj1 = req.getParameterNames();
		        int cnt=0;
		     

		        while (obj1.hasMoreElements())
		        {
		            String paramName = obj1.nextElement();
		            String paramValue = req.getParameter(paramName);
		            returnHash.put(paramName, paramValue);
		        }
		        
		        
		        int draw = Integer.parseInt(req.getParameter("draw"));
				int start = Integer.parseInt(req.getParameter("start"));
				int length = Integer.parseInt(req.getParameter("length"));
				String orderColumn=req.getParameter("order[0][column]");
				String orderDirection = req.getParameter("order[0][dir]");
				String orderColumnName=req.getParameter("columns[" + orderColumn + "][data]");
				log.info("orderColumn:"+orderColumn);
				log.info("orderColumnName:"+orderColumnName);
				log.info("orderDirection:"+orderDirection);
				String[] order_cols=req.getParameterValues("order");
//				List val=new ArrayList();
//				int mx=order_cols.length;
				
//				
				String jisa = req.getParameter("jisa");
				String manage_no = req.getParameter("manage_no");
//				String type_gover=req.getParameter("type_gover");
//				String type_jisang=req.getParameter("type_jisang");
//				String type_notset=req.getParameter("type_notset");
//				String type_dopco=req.getParameter("type_dopco");
		String right_type=req.getParameter("right_type");
		String dosiplan=req.getParameter("dosiplan");
		String address=req.getParameter("saddr");
		String toji_type=req.getParameter("toji_type");
		log.info("toji_type:"+toji_type);

				Map map=req.getParameterMap();
		        log.info("draw:"+draw);
		        log.info("length:"+length);
		        
		        	//log.info("mx:"+mx);

				HashMap params = new HashMap();
				params.put("draw",draw);
				params.put("start",start);
				params.put("length",length);
				params.put("jisa",req.getParameter("jisa"));
				params.put("idx",manage_no);
		params.put("dosiplan",dosiplan);
		params.put("address",address);
		params.put("toji_type",toji_type);


		String[] right_arr= {};
		right_arr=right_type.split(",");
		params.put("right_type", right_arr);

				params.put("cancelYn","N");
				if (orderColumn==null || orderColumn.equals("null")) {
					log.info("----------null--------");
					orderColumn="0";
				}
				if (Integer.parseInt(orderColumn)>0  ) {
					params.put("orderCol",orderColumnName);
					params.put("desc",orderDirection);
				
				}
				else {
					params.put("orderCol","");
					params.put("desc","");	
				}
				log.info("params:"+params);
//				ArrayList<HashMap>  list=new ArrayList<HashMap>();
				Object count= mainService.selectCountQuery("songyuSQL.selectTotalCount", params);
	            int total=(int)count;
				
				ArrayList<HashMap> list = mainService.selectQuery("songyuSQL.selectAllList",params);
			//	log.info("list:"+list);
//				for(int i=0;i<List.size();i++) {
//					HashMap map=new HashMap();
//					map.put("jm_jisa",List.get(i).get("jm_jisa"));
//					map.put("fullNmKr","fullnmKr"+i);
//					map.put("userStatCd","user"+i);
//					map.put("superUser","super"+i);
//					list.add(map);
//				}
				
				
				//int total=list.size();
			
				
				
				
				 HashMap<String,Object> resultmap=new HashMap();
			        resultmap.put("draw",draw);
			        resultmap.put("recordsTotal",total);
			        resultmap.put("recordsFiltered",total);
			        resultmap.put("data",list);
			        
			        JSONObject obj =new JSONObject(resultmap);
			        log.info("obj:"+obj);
			    	return ResponseEntity.ok(obj.toString());
//			        JSONObject obj =new JSONObject(resultmap);
//			        System.out.println(obj);
//			       
//			      //log.info("jo:"+jo);
//			      			res.setCharacterEncoding("UTF-8");
//			      			res.setHeader("Access-Control-Allow-Origin", "*");
//			      			res.setHeader("Cache-Control", "no-cache");
//			      			res.resetBuffer();
//			      			res.setContentType("application/json");
//			      			//response.getOutputStream().write(jo);
//			      			res.getWriter().print(obj);
//			      			res.getWriter().flush();
    }
	
	
	@RequestMapping(value="/menu03DataTableList", method = {RequestMethod.GET, RequestMethod.POST}) //http://localhost:8080/api/get/dbTest
    public ResponseEntity<?> datatableList03(HttpServletRequest req, HttpServletResponse res) throws Exception {
        
		//일반웹형식
				Properties requestParams = CommonUtil.convertToProperties(req);
		        log.info("requestParams:"+requestParams);
//		        JSONObject jobj=new JSONObject(requestParams.toString());
//		        log.info("obj:"+jobj);
		        
		        
		        //json으로 넘어올때
//		        String getRequestBody = ParameterUtil.getRequestBodyToStr(req);
//		        JSONObject object=new JSONObject(requestParams.toString());
//		        if (object!=null) {
//		        log.info("getRequestBody:"+object.getString("jisa"));
//		        }
		        //log.info("jisa="+getRequestBody.g)
		        
		        HashMap<String, String> returnHash = new HashMap<String, String>();
		        Enumeration<String> obj1 = req.getParameterNames();
		        int cnt=0;
		     

		        while (obj1.hasMoreElements())
		        {
		            String paramName = obj1.nextElement();
		            String paramValue = req.getParameter(paramName);
		            returnHash.put(paramName, paramValue);
		        }
		        
		        
		        int draw = Integer.parseInt(req.getParameter("draw"));
				int start = Integer.parseInt(req.getParameter("start"));
				int length = Integer.parseInt(req.getParameter("length"));
				String orderColumn=req.getParameter("order[0][column]");
				String orderDirection = req.getParameter("order[0][dir]");
				String orderColumnName=req.getParameter("columns[" + orderColumn + "][data]");

				log.info("orderColumn:"+orderColumn);
				log.info("orderColumnName:"+orderColumnName);
				log.info("orderDirection:"+orderDirection);
				String[] order_cols=req.getParameterValues("order");
//				List val=new ArrayList();
//				int mx=order_cols.length;
				
//				
				String jisa = req.getParameter("jisa");
				String manage_no = req.getParameter("manage_no");
				String right_type=req.getParameter("right_type");
				String dosiplan=req.getParameter("dosiplan");
				String address=req.getParameter("saddr");
				String toji_type=req.getParameter("toji_type");
				String right_overlap=req.getParameter("right_overlap");
				String type_gover=req.getParameter("type_gover");
				String type_jisang=req.getParameter("type_jisang");
				String type_notset=req.getParameter("type_notset");
				String type_dopco=req.getParameter("type_dopco");
				Map map=req.getParameterMap();
		        log.info("draw:"+draw);
		        log.info("length:"+length);
		        
		        	//log.info("mx:"+mx);
		        	
		       
		        
		        log.info("jisa:"+jisa);
		        log.info("manage_no:"+manage_no);
		        log.info("type_gover:"+type_gover);
		        log.info("type_jisang:"+type_jisang);
		        log.info("type_notset:"+type_notset);
		        log.info("type_dopco:"+type_dopco);
				log.info("right_type:"+right_type);

				HashMap params = new HashMap();
				params.put("draw",draw);
				params.put("start",start);
				params.put("length",length);
				params.put("jisa",req.getParameter("jisa"));
				params.put("idx",manage_no);
				params.put("dosiplan",dosiplan);
				params.put("address",address);
				params.put("toji_type",toji_type);
				params.put("right_overlap",right_overlap);

				String[] right_arr= {};
				right_arr=right_type.split(",");
				params.put("right_type", right_arr);
				
				params.put("manageYn","Y");
				if (orderColumn==null || orderColumn.equals("null")) {
					log.info("----------null--------");
					orderColumn="0";
				}
				if (Integer.parseInt(orderColumn)>0  ) {
					params.put("orderCol",orderColumnName);
					params.put("desc",orderDirection);
				
				}
				else {
					params.put("orderCol","");
					params.put("desc","");	
				}
				log.info("params:"+params);
//				ArrayList<HashMap>  list=new ArrayList<HashMap>();
				Object count= mainService.selectCountQuery("songyuSQL.selectTotalCount", params);
	            int total=(int)count;
				
				ArrayList<HashMap> list = mainService.selectQuery("songyuSQL.selectAllList",params);
			//	log.info("list:"+list);
//				for(int i=0;i<List.size();i++) {
//					HashMap map=new HashMap();
//					map.put("jm_jisa",List.get(i).get("jm_jisa"));
//					map.put("fullNmKr","fullnmKr"+i);
//					map.put("userStatCd","user"+i);
//					map.put("superUser","super"+i);
//					list.add(map);
//				}
				
				
				//int total=list.size();
			
				
				
				
				 HashMap<String,Object> resultmap=new HashMap();
			        resultmap.put("draw",draw);
			        resultmap.put("recordsTotal",total);
			        resultmap.put("recordsFiltered",total);
			        resultmap.put("data",list);
			        
			        JSONObject obj =new JSONObject(resultmap);
			        log.info("obj:"+obj);
			    	return ResponseEntity.ok(obj.toString());
//			        JSONObject obj =new JSONObject(resultmap);
//			        System.out.println(obj);
//			       
//			      //log.info("jo:"+jo);
//			      			res.setCharacterEncoding("UTF-8");
//			      			res.setHeader("Access-Control-Allow-Origin", "*");
//			      			res.setHeader("Cache-Control", "no-cache");
//			      			res.resetBuffer();
//			      			res.setContentType("application/json");
//			      			//response.getOutputStream().write(jo);
//			      			res.getWriter().print(obj);
//			      			res.getWriter().flush();
    }
	
	
}
