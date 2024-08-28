package com.slsolution.plms.gover;

import java.util.ArrayList;
import java.util.Enumeration;
import java.util.HashMap;
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
			params.put("manage_no",idx);
			ArrayList<HashMap> goverMemoList = mainService.selectQuery("commonSQL.selectMemoList",params);

			log.info("params:"+params);
			log.info("data:"+data.get(0));
			log.info("pnu:"+pnuTargetList.get(0).get("gp_pnu"));
//			log.info("jm_pipe_yn:"+data.get(0).get("gm_pipe_yn"));
			log.info("gm_youngdo:"+data.get(0).get("gm_youngdo"));
			log.info("gm_pipe_name:"+data.get(0).get("gm_pipe_name"));
			log.info("permitList:"+permitList);
			log.info("atcFileList:"+atcFileList);
			log.info("goverMemoList:"+goverMemoList);
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
			mav.addObject("memoList",goverMemoList);
//			mav.addObject("atcFileList",atcFileList);
//			mav.addObject("jisangModifyList",jisangModifyList);
//			mav.addObject("jisangMergeList",jisangMergeList);

			mav.setViewName("content/gover/occupationDetails");
			return mav;
	    }
		
		@GetMapping(path="/menu03_1") //http://localhost:8080/api/get/dbTest
	    public ModelAndView menu03_1(HttpServletRequest httpRequest, HttpServletResponse response) throws Exception {
//			response.setHeader("X-Frame-Options", "SAMEORIGIN");
//			response.setHeader("Content-Security-Policy", " frame-ancestors 'self'");
			ModelAndView mav=new ModelAndView();
			mav.setViewName("content/gover/menu03_1");
			return mav;
		}
		
		@GetMapping(path="/menu03_2") //http://localhost:8080/api/get/dbTest
	    public ModelAndView menu03_2(HttpServletRequest httpRequest, HttpServletResponse response) throws Exception {
//			response.setHeader("X-Frame-Options", "SAMEORIGIN");
//			response.setHeader("Content-Security-Policy", " frame-ancestors 'self'");
			ModelAndView mav=new ModelAndView();
			mav.setViewName("content/gover/menu03_2");
			return mav;
		}
		@GetMapping(path="/menu03_3") //http://localhost:8080/api/get/dbTest
	    public ModelAndView menu03_3(HttpServletRequest httpRequest, HttpServletResponse response) throws Exception {
//			response.setHeader("X-Frame-Options", "SAMEORIGIN");
//			response.setHeader("Content-Security-Policy", " frame-ancestors 'self'");
			ModelAndView mav=new ModelAndView();
			mav.setViewName("content/gover/menu03_3");
			return mav;
		}
		@GetMapping(path="/orgAdmin") //http://localhost:8080/api/get/dbTest
	    public ModelAndView orgAdmin(HttpServletRequest httpRequest, HttpServletResponse response) throws Exception {
//			response.setHeader("X-Frame-Options", "SAMEORIGIN");
//			response.setHeader("Content-Security-Policy", " frame-ancestors 'self'");
			ModelAndView mav=new ModelAndView();
			mav.setViewName("content/gover/orgAdmin");
			return mav;
		}
		
		@GetMapping(path="/masterReg") //http://localhost:8080/api/get/dbTest
	    public ModelAndView masterReg(HttpServletRequest httpRequest, HttpServletResponse response) throws Exception {
//			response.setHeader("X-Frame-Options", "SAMEORIGIN");
//			response.setHeader("Content-Security-Policy", " frame-ancestors 'self'");
			ModelAndView mav=new ModelAndView();
			mav.setViewName("content/gover/masterReg");
			return mav;
		}
		
		
		@RequestMapping(value="/menu03_1DataTableList", method = {RequestMethod.GET, RequestMethod.POST}) //http://localhost:8080/api/get/dbTest
		public ResponseEntity<?> datatableList03_1(HttpServletRequest req, HttpServletResponse res) throws Exception {

			//일반웹형식
			Properties requestParams = CommonUtil.convertToProperties(req);

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

			String[] order_cols=req.getParameterValues("order");

			String jisa = req.getParameter("jisa");
			String manage_no = req.getParameter("manage_no");
			String dosiplan=req.getParameter("dosiplan");
			String address=req.getParameter("saddr");

			String souja = req.getParameter("souja");
			String jasan_no = req.getParameter("jasan_no");

			String jimok_text = req.getParameter("jimok_text");
//			String jimok_text = req.getParameter("jimok_text");
//			String jimok_text ="전,과수원,목장용지";
			String[] jimokArray = jimok_text != null && !jimok_text.trim().isEmpty() ? jimok_text.split(",") : new String[0]; // 빈 배열로 초기화

			String comple_yn=req.getParameter("comple_yn");
			String cancel_yn=req.getParameter("cancel_yn");
			String deunggi_date=req.getParameter("deunggi_date");
			String account_yn=req.getParameter("account_yn"); //회계처리 필요여부
			String start_date=req.getParameter("start_date");
			String end_date=req.getParameter("end_date");

			Map map=req.getParameterMap();

			HashMap params = new HashMap();
			params.put("draw",draw);
			params.put("start",start);
			params.put("length",length);
			params.put("jisa",jisa);
			params.put("idx",manage_no);
			params.put("dosiplan",dosiplan);
			params.put("address",address);

			params.put("souja",souja);
			params.put("jasan_no",jasan_no);

			params.put("jimokArray", jimokArray);
			params.put("comple_yn", comple_yn);
			params.put("cancel_yn", cancel_yn);
			params.put("deunggi_date", deunggi_date);
			params.put("account_yn", account_yn);
			params.put("start_date", start_date);
			params.put("end_date", end_date);

//			String[] right_arr= {};
//			right_arr=right_type.split(",");
//			params.put("right_type", right_arr);

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

			Object count= mainService.selectCountQuery("goverSQL.selectTotalCount", params);
			int total=(int)count;

			ArrayList<HashMap> list = mainService.selectQuery("goverSQL.selectGoverList",params);
			log.info("list:"+list);


			HashMap<String,Object> resultmap=new HashMap();
			resultmap.put("draw",draw);
			resultmap.put("recordsTotal",total);
			resultmap.put("recordsFiltered",total);
			resultmap.put("data",list);

			JSONObject obj =new JSONObject(resultmap);
			log.info("obj:"+obj);
			return ResponseEntity.ok(obj.toString());

		}
}
