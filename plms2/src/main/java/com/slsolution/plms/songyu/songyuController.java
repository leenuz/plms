package com.slsolution.plms.songyu;

import java.io.File;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Enumeration;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.Properties;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.scheduling.annotation.EnableAsync;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;
import org.springframework.web.servlet.ModelAndView;

import com.slsolution.plms.CommonUtil;
import com.slsolution.plms.MainService;
import com.slsolution.plms.ParameterParser;
import com.slsolution.plms.ParameterUtil;
import com.slsolution.plms.config.GlobalConfig;
import com.slsolution.plms.json.JSONArray;
import com.slsolution.plms.json.JSONObject;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@EnableAsync
@RequiredArgsConstructor
@RestController
@RequestMapping("/land/songyu")
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class songyuController {

	@Autowired
	private MainService mainService;

	@Autowired
	private GlobalConfig GC;

	@GetMapping(path = "/menu01") // http://localhost:8080/api/get/dbTest
	public ModelAndView viewMenu01(HttpServletRequest httpRequest, HttpServletResponse response) throws Exception {
		ModelAndView mav = new ModelAndView();
		
		/*******************************/
		//받은 세션 Map으로 전환
		Map<String, Object> sessionMap = CommonUtil.requestSessionToMap(httpRequest);
		/*******************************/
//      List<TestDTO> list = new ArrayList<TestDTO>();
//      list = dbService.getList();
		HashMap params = new HashMap();
		params.put("LOGIN_JISA", (String)sessionMap.get("jisa"));    //지사정보 param에 싣기
		ArrayList<HashMap> list = new ArrayList<HashMap>();

		// List<CountryModel> list = masterDataBaseService.getCountry();
		ArrayList<HashMap> jisalist = mainService.selectQuery("commonSQL.selectAllJisaList", params);
		ArrayList<HashMap> yongdolist = mainService.selectQuery("commonSQL.selectYongdoList", params);
		ArrayList<HashMap> jimoklist = mainService.selectQuery("commonSQL.selectJimokList", params);
		ArrayList<HashMap> sidolist = mainService.selectQuery("commonSQL.getSidoMaster", params);
		// ArrayList<HashMap> jimoklist =
		// mainService.selectQuery("commonSQL.selectAllList",params);
//		list=mainService.selectQuery("jisangSQL.selectAllList", params);
//      log.info("jisang /list:"+list.toString());
		// nhServ1.test();
		// ts.Test1();
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

		mav.addObject("jisaList", jisalist);
		mav.addObject("resultYongdoList", yongdolist);
		mav.addObject("resultJimokList", jimoklist);
		mav.addObject("sidoList", sidolist);
		
		//241006 - 지사정보 추가
		mav.addObject("loginJisa", (String)sessionMap.get("jisa"));
		log.info("jisalist:" + jisalist);
		log.info("sidolist:" + sidolist);

		mav.setViewName("content/songyu/menu01");
		return mav;
	}

	
	@GetMapping(path = "/menu01_detail") // http://localhost:8080/api/get/dbTest
	public ModelAndView viewMenu01Detail(HttpServletRequest httpRequest, HttpServletResponse response)
			throws Exception {
		ModelAndView mav = new ModelAndView();

//      List<TestDTO> list = new ArrayList<TestDTO>();
//      list = dbService.getList();
		HashMap params = new HashMap();
		ArrayList<HashMap> list = new ArrayList<HashMap>();

		// List<CountryModel> list = masterDataBaseService.getCountry();
		ArrayList<HashMap> jisalist = mainService.selectQuery("commonSQL.selectAllJisaList", params);
		ArrayList<HashMap> yongdolist = mainService.selectQuery("commonSQL.selectYongdoList", params);
		ArrayList<HashMap> jimoklist = mainService.selectQuery("commonSQL.selectJimokList", params);
		ArrayList<HashMap> sidolist = mainService.selectQuery("commonSQL.getSidoMaster", params);
		// ArrayList<HashMap> jimoklist =
		// mainService.selectQuery("commonSQL.selectAllList",params);
//		list=mainService.selectQuery("jisangSQL.selectAllList", params);
//      log.info("jisang /list:"+list.toString());
		// nhServ1.test();
		// ts.Test1();
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

		mav.addObject("resultJisaList", jisalist);
		mav.addObject("resultYongdoList", yongdolist);
		mav.addObject("resultJimokList", jimoklist);
		mav.addObject("sidoList", sidolist);
		log.info("jisalist:" + jisalist);
		log.info("sidolist:" + sidolist);

		mav.setViewName("content/songyu/menu01_detail");
		return mav;
	}

	
	// 미설정/미점용 내역 등록
	@GetMapping(path = "/notsetAdd") // http://localhost:8080/api/get/dbTest
	public ModelAndView notsetAdd(HttpServletRequest httpRequest, HttpServletResponse response) throws Exception {
		ModelAndView mav = new ModelAndView();

		HashMap params = new HashMap();

		ArrayList<HashMap> jisalist = mainService.selectQuery("commonSQL.selectAllJisaList", params);
		ArrayList<HashMap> yongdolist = mainService.selectQuery("commonSQL.selectYongdoList", params);
		ArrayList<HashMap> jimoklist = mainService.selectQuery("commonSQL.selectJimokList", params);
		ArrayList<HashMap> sidolist = mainService.selectQuery("commonSQL.getSidoMaster", params);

		mav.addObject("jisaList", jisalist);
		mav.addObject("resultYongdoList", yongdolist);
		mav.addObject("resultJimokList", jimoklist);
		mav.addObject("sidoList", sidolist);
		log.info("jisalist:" + jisalist);

		mav.setViewName("content/songyu/notsetAdd");

		return mav;
	}

	@GetMapping(path = "/searchResultsPopup") // http://localhost:8080/api/get/dbTest
	public ModelAndView searchResultsPopup(HttpServletRequest httpRequest, HttpServletResponse response)
			throws Exception {
		ModelAndView mav = new ModelAndView();

//      List<TestDTO> list = new ArrayList<TestDTO>();
//      list = dbService.getList();
		HashMap params = new HashMap();
		ArrayList<HashMap> list = new ArrayList<HashMap>();

		// List<CountryModel> list = masterDataBaseService.getCountry();
		ArrayList<HashMap> jisalist = mainService.selectQuery("commonSQL.selectAllJisaList", params);
		ArrayList<HashMap> yongdolist = mainService.selectQuery("commonSQL.selectYongdoList", params);
		ArrayList<HashMap> jimoklist = mainService.selectQuery("commonSQL.selectJimokList", params);
		ArrayList<HashMap> sidolist = mainService.selectQuery("commonSQL.getSidoMaster", params);
//		list=mainService.selectQuery("jisangSQL.selectAllList", params);
//      log.info("jisang /list:"+list.toString());
		// nhServ1.test();
		// ts.Test1();
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

		mav.addObject("jisaList", jisalist);
		mav.addObject("resultYongdoList", yongdolist);
		mav.addObject("resultJimokList", jimoklist);
		mav.addObject("sidoList", sidolist);
		log.info("jisalist:" + jisalist);

		mav.setViewName("content/songyu/popup");
		return mav;
	}

	// 권리제외필지 조회
	@GetMapping(path = "/menu02") // http://localhost:8080/api/get/dbTest
	public ModelAndView viewMenu02(HttpServletRequest httpRequest, HttpServletResponse response) throws Exception {
		/*******************************/
		//받은 세션 Map으로 전환
		Map<String, Object> sessionMap = CommonUtil.requestSessionToMap(httpRequest);
		/*******************************/
		
		HashMap params = new HashMap();
		params.put("LOGIN_JISA", (String)sessionMap.get("jisa"));    //지사정보 param에 싣기
		ArrayList<HashMap> list = new ArrayList<HashMap>();

		// List<CountryModel> list = masterDataBaseService.getCountry();
		ArrayList<HashMap> jisalist = mainService.selectQuery("commonSQL.selectAllJisaList", params);
		ArrayList<HashMap> yongdolist = mainService.selectQuery("commonSQL.selectYongdoList", params);
		ArrayList<HashMap> jimoklist = mainService.selectQuery("commonSQL.selectJimokList", params);
		ArrayList<HashMap> sidolist = mainService.selectQuery("commonSQL.getSidoMaster", params);

		ModelAndView mav = new ModelAndView();
		mav.addObject("jisaList", jisalist);
		mav.addObject("resultYongdoList", yongdolist);
		mav.addObject("resultJimokList", jimoklist);
		mav.addObject("sidoList", sidolist);
		//241006 - 지사정보 추가
		mav.addObject("loginJisa", (String)sessionMap.get("jisa"));
		
		mav.setViewName("content/songyu/menu02");
		return mav;
	}

	//권리필지조회
	@GetMapping(path = "/menu03") // http://localhost:8080/api/get/dbTest
	public ModelAndView viewMenu03(HttpServletRequest httpRequest, HttpServletResponse response) throws Exception {
		
		/*******************************/
		//받은 세션 Map으로 전환
		Map<String, Object> sessionMap = CommonUtil.requestSessionToMap(httpRequest);
		/*******************************/
		
		HashMap params = new HashMap();
		params.put("LOGIN_JISA", (String)sessionMap.get("jisa"));    //지사정보 param에 싣기
		ArrayList<HashMap> list = new ArrayList<HashMap>();

		ArrayList<HashMap> jisalist = mainService.selectQuery("commonSQL.selectAllJisaList", params);
		ArrayList<HashMap> yongdolist = mainService.selectQuery("commonSQL.selectYongdoList", params);
		ArrayList<HashMap> jimoklist = mainService.selectQuery("commonSQL.selectJimokList", params);
		ArrayList<HashMap> sidolist = mainService.selectQuery("commonSQL.getSidoMaster", params);

		ModelAndView mav = new ModelAndView();
		mav.addObject("jisaList", jisalist);
		mav.addObject("resultYongdoList", yongdolist);
		mav.addObject("resultJimokList", jimoklist);
		mav.addObject("sidoList", sidolist);
		//241006 - 지사정보 추가
		mav.addObject("loginJisa", (String)sessionMap.get("jisa"));
		mav.setViewName("content/songyu/menu03");
		return mav;
	}

	// 권리확보현황 데이터테이블
	@RequestMapping(value = "/menu01DataTableList", method = { RequestMethod.GET, RequestMethod.POST }) // http://localhost:8080/api/get/dbTest
	public ResponseEntity<?> datatableList(HttpServletRequest req, HttpServletResponse res) throws Exception {

		// 일반웹형식
		Properties requestParams = CommonUtil.convertToProperties(req);
		log.info("requestParams:" + requestParams);
		// JSONObject jobj=new JSONObject(requestParams.toString());
		// log.info("obj:"+jobj);

		// json으로 넘어올때
		// String getRequestBody = ParameterUtil.getRequestBodyToStr(req);
		// JSONObject object=new JSONObject(requestParams.toString());
		// if (object!=null) {
		// log.info("getRequestBody:"+object.getString("jisa"));
		// }
		// log.info("jisa="+getRequestBody.g)

		HashMap<String, String> returnHash = new HashMap<String, String>();
		Enumeration<String> obj1 = req.getParameterNames();
		int cnt = 0;

		while (obj1.hasMoreElements()) {
			String paramName = obj1.nextElement();
			String paramValue = req.getParameter(paramName);
			returnHash.put(paramName, paramValue);
		}

		int draw = Integer.parseInt((req.getParameter("draw") == null) ? "0" : req.getParameter("draw"));
		int start = Integer.parseInt((req.getParameter("start") == null) ? "0" : req.getParameter("start"));
		int length = Integer.parseInt((req.getParameter("length") == null) ? "0" : req.getParameter("length"));
		String orderColumn = req.getParameter("order[0][column]");
		String orderDirection = req.getParameter("order[0][dir]");
		String orderColumnName = req.getParameter("columns[" + orderColumn + "][data]");

		log.info("orderColumn:" + orderColumn);
		log.info("orderColumnName:" + orderColumnName);
		log.info("orderDirection:" + orderDirection);
		String[] order_cols = req.getParameterValues("order");

		String jisa = req.getParameter("jisa"); //지사
		String manage_no = req.getParameter("manage_no"); //관리번호
		String toji_type = req.getParameter("toji_type"); //토지유형
		String right_type = req.getParameter("right_type"); //권리확보유형
		String dosiplan = req.getParameter("dosiplan"); // 도시계획유형
		String toji_plan_type = req.getParameter("toji_plan_type"); //토지개발대상
		String right_overlap = req.getParameter("right_overlap"); //권리중복필지

		String address = req.getParameter("saddr"); // 입력형 주소
		String sido_nm = req.getParameter("sido_nm");
		String sgg_nm = req.getParameter("sgg_nm");
		String emd_nm = req.getParameter("emd_nm");
		String ri_nm = req.getParameter("ri_nm");
		String jibun = req.getParameter("jibun");

		Map map = req.getParameterMap();
		log.info("draw:" + draw);
		log.info("length:" + length);

		log.info("jisa:" + jisa);
		log.info("manage_no:" + manage_no);
		log.info("right_type:" + right_type);
		log.info("toji_plan_type:" + toji_plan_type);

		HashMap params = new HashMap();
		params.put("draw", draw);
		params.put("start", start);
		params.put("length", length);
		
		params.put("jisa", jisa);
		params.put("idx", manage_no);
		params.put("toji_type", toji_type);
		params.put("dosiplan", dosiplan);
		params.put("toji_plan_type", toji_plan_type);
		params.put("right_overlap", right_overlap);
		
		params.put("address", address);
		params.put("sido_nm",sido_nm);
		params.put("sgg_nm",sgg_nm);
		params.put("emd_nm",emd_nm);
		params.put("ri_nm",ri_nm);
		params.put("jibun",jibun);
		
		String[] right_arr = {};
		right_arr = right_type.split(",");
		params.put("right_type", right_arr);
		// String right_type_str=(type_gover!=null && type_gover.equals("on"))?"gover"
		// :""
		// +"|"+ (type_jisang!=null && type_jisang.equals("on")) ? "jisang":""+"|";
		// //if (type_gover!=null && type_gover.equals("on")) right_type_str=
		// params.put("right_type","gover");
		if (orderColumn == null || orderColumn.equals("null")) {
			log.info("----------null--------");
			orderColumn = "0";
		}
		if (Integer.parseInt(orderColumn) > 0) {
			params.put("orderCol", orderColumnName);
			params.put("desc", orderDirection);

		} else {
			params.put("orderCol", "");
			params.put("desc", "");
		}
		log.info("params:" + params);

		Object count = mainService.selectCountQuery("songyuSQL.selectTotalCount1", params);
		int total = (int) count;

		ArrayList<HashMap> list = mainService.selectQuery("songyuSQL.selectAllList3", params);
		// log.info("list:"+list);
		// for(int i=0;i<List.size();i++) {
		// HashMap map=new HashMap();
		// map.put("jm_jisa",List.get(i).get("jm_jisa"));
		// map.put("fullNmKr","fullnmKr"+i);
		// map.put("userStatCd","user"+i);
		// map.put("superUser","super"+i);
		// list.add(map);
		// }

		// int total=list.size();
		HashMap<String, Object> resultmap = new HashMap();
		resultmap.put("draw", draw);
		resultmap.put("recordsTotal", total);
		resultmap.put("recordsFiltered", total);
		resultmap.put("data", list);

		JSONObject obj = new JSONObject(resultmap);
		log.info("obj:" + obj);
		return ResponseEntity.ok(obj.toString());
		// JSONObject obj =new JSONObject(resultmap);
		// System.out.println(obj);
		//
		// //log.info("jo:"+jo);
		// res.setCharacterEncoding("UTF-8");
		// res.setHeader("Access-Control-Allow-Origin", "*");
		// res.setHeader("Cache-Control", "no-cache");
		// res.resetBuffer();
		// res.setContentType("application/json");
		// //response.getOutputStream().write(jo);
		// res.getWriter().print(obj);
		// res.getWriter().flush();
	}

	@RequestMapping(value = "/menu01DataTableList_bak", method = { RequestMethod.GET, RequestMethod.POST }) // http://localhost:8080/api/get/dbTest
	public ResponseEntity<?> datatableList_bak(HttpServletRequest req, HttpServletResponse res) throws Exception {

		// 일반웹형식
		Properties requestParams = CommonUtil.convertToProperties(req);
		log.info("requestParams:" + requestParams);
//		        JSONObject jobj=new JSONObject(requestParams.toString());
//		        log.info("obj:"+jobj);

		// json으로 넘어올때
//		        String getRequestBody = ParameterUtil.getRequestBodyToStr(req);
//		        JSONObject object=new JSONObject(requestParams.toString());
//		        if (object!=null) {
//		        log.info("getRequestBody:"+object.getString("jisa"));
//		        }
		// log.info("jisa="+getRequestBody.g)

		HashMap<String, String> returnHash = new HashMap<String, String>();
		Enumeration<String> obj1 = req.getParameterNames();
		int cnt = 0;

		while (obj1.hasMoreElements()) {
			String paramName = obj1.nextElement();
			String paramValue = req.getParameter(paramName);
			returnHash.put(paramName, paramValue);
		}

		int draw = Integer.parseInt((req.getParameter("draw") == null) ? "0" : req.getParameter("draw"));
		int start = Integer.parseInt((req.getParameter("start") == null) ? "0" : req.getParameter("start"));
		int length = Integer.parseInt((req.getParameter("length") == null) ? "0" : req.getParameter("length"));
		String orderColumn = req.getParameter("order[0][column]");
		String orderDirection = req.getParameter("order[0][dir]");
		String orderColumnName = req.getParameter("columns[" + orderColumn + "][data]");

		log.info("orderColumn:" + orderColumn);
		log.info("orderColumnName:" + orderColumnName);
		log.info("orderDirection:" + orderDirection);
		String[] order_cols = req.getParameterValues("order");
//				List val=new ArrayList();
//				int mx=order_cols.length;

//				
		String jisa = req.getParameter("jisa");
		String manage_no = req.getParameter("manage_no");
		String right_type = req.getParameter("right_type");
		String dosiplan = req.getParameter("dosiplan");

		String address = req.getParameter("saddr");
		if (address.equals("undefined"))
			address = null;

		String toji_plan_type = req.getParameter("toji_plan_type");
		String toji_type = req.getParameter("toji_type");
		String right_overlap = req.getParameter("right_overlap");
		Map map = req.getParameterMap();
		log.info("draw:" + draw);
		log.info("length:" + length);

		// log.info("mx:"+mx);

		log.info("jisa:" + jisa);
		log.info("manage_no:" + manage_no);
		log.info("right_type:" + right_type);
		log.info("toji_plan_type:" + toji_plan_type);

		HashMap params = new HashMap();
		params.put("draw", draw);
		params.put("start", start);
		params.put("length", length);
		params.put("jisa", req.getParameter("jisa"));
		params.put("idx", manage_no);
		params.put("dosiplan", dosiplan);
		params.put("address", address);
		params.put("toji_plan_type", toji_plan_type);
		params.put("toji_type", toji_type);
		params.put("right_overlap", right_overlap);
		String[] right_arr = {};
		right_arr = right_type.split(",");
		params.put("right_type", right_arr);
//				String right_type_str=(type_gover!=null && type_gover.equals("on"))?"gover" :""
//					+"|"+ (type_jisang!=null && type_jisang.equals("on")) ? "jisang":""+"|";
//				//if (type_gover!=null && type_gover.equals("on")) right_type_str= 
//				params.put("right_type","gover");
		if (orderColumn == null || orderColumn.equals("null")) {
			log.info("----------null--------");
			orderColumn = "0";
		}
		if (Integer.parseInt(orderColumn) > 0) {
			params.put("orderCol", orderColumnName);
			params.put("desc", orderDirection);

		} else {
			params.put("orderCol", "");
			params.put("desc", "");
		}
		log.info("params:" + params);
//				ArrayList<HashMap>  list=new ArrayList<HashMap>();
		Object count = mainService.selectCountQuery("songyuSQL.selectTotalCount1", params);
		int total = (int) count;

		ArrayList<HashMap> list = mainService.selectQuery("songyuSQL.selectAllList3", params);
		// log.info("list:"+list);
//				for(int i=0;i<List.size();i++) {
//					HashMap map=new HashMap();
//					map.put("jm_jisa",List.get(i).get("jm_jisa"));
//					map.put("fullNmKr","fullnmKr"+i);
//					map.put("userStatCd","user"+i);
//					map.put("superUser","super"+i);
//					list.add(map);
//				}

		// int total=list.size();
		HashMap<String, Object> resultmap = new HashMap();
		resultmap.put("draw", draw);
		resultmap.put("recordsTotal", total);
		resultmap.put("recordsFiltered", total);
		resultmap.put("data", list);

		JSONObject obj = new JSONObject(resultmap);
		log.info("obj:" + obj);
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

	// 권리제외필지조회 데이터테이블
	@RequestMapping(value = "/menu02DataTableList", method = { RequestMethod.GET, RequestMethod.POST }) // http://localhost:8080/api/get/dbTest
	public ResponseEntity<?> datatableList02(HttpServletRequest req, HttpServletResponse res) throws Exception {

		// 일반웹형식
		Properties requestParams = CommonUtil.convertToProperties(req);
		log.info("requestParams:" + requestParams);

		// json으로 넘어올때
//		        String getRequestBody = ParameterUtil.getRequestBodyToStr(req);
//		        JSONObject object=new JSONObject(requestParams.toString());
//		        if (object!=null) {
//		        log.info("getRequestBody:"+object.getString("jisa"));
//		        }
		// log.info("jisa="+getRequestBody.g)

		int draw = Integer.parseInt(req.getParameter("draw"));
		int start = Integer.parseInt(req.getParameter("start"));
		int length = Integer.parseInt(req.getParameter("length"));
		String orderColumn = req.getParameter("order[0][column]");
		String orderDirection = req.getParameter("order[0][dir]");
		String orderColumnName = req.getParameter("columns[" + orderColumn + "][data]");
		log.info("orderColumn:" + orderColumn);
		log.info("orderColumnName:" + orderColumnName);
		log.info("orderDirection:" + orderDirection);
		String[] order_cols = req.getParameterValues("order");

		String jisa = req.getParameter("jisa"); // 지사
		String toji_type = req.getParameter("toji_type"); // 토지유형
		String right_type = req.getParameter("right_type"); // 권리확보유형
		
		String address = req.getParameter("saddr"); // 입력형 주소
		String sido_nm = req.getParameter("sido_nm");
		String sgg_nm = req.getParameter("sgg_nm");
		String emd_nm = req.getParameter("emd_nm");
		String ri_nm = req.getParameter("ri_nm");
		String jibun = req.getParameter("jibun");
		
		Map map = req.getParameterMap();
		log.info("draw:" + draw);
		log.info("length:" + length);

		HashMap params = new HashMap();
		params.put("draw", draw);
		params.put("start", start);
		params.put("length", length);
		
		params.put("jisa", jisa);
		params.put("toji_type", toji_type);
		params.put("address", address);
		params.put("sido_nm",sido_nm);
		params.put("sgg_nm",sgg_nm);
		params.put("emd_nm",emd_nm);
		params.put("ri_nm",ri_nm);
		params.put("jibun",jibun);

		String[] right_arr = {};
		right_arr = right_type.split(",");
		params.put("right_type", right_arr);
		params.put("cancelYn", "Y"); // 권리제외 필지 ?? 맞나?
		
		if (orderColumn == null || orderColumn.equals("null")) {
			log.info("----------null--------");
			orderColumn = "0";
		}
		if (Integer.parseInt(orderColumn) > 0) {
			params.put("orderCol", orderColumnName);
			params.put("desc", orderDirection);

		} else {
			params.put("orderCol", "");
			params.put("desc", "");
		}
		log.info("params:" + params);
		
		Object count = mainService.selectCountQuery("songyuSQL.selectTotalCount4", params);
		int total = (int) count;

		ArrayList<HashMap> list = mainService.selectQuery("songyuSQL.selectAllList4", params);

		HashMap<String, Object> resultmap = new HashMap();
		resultmap.put("draw", draw);
		resultmap.put("recordsTotal", total);
		resultmap.put("recordsFiltered", total);
		resultmap.put("data", list);

		JSONObject obj = new JSONObject(resultmap);
		log.info("obj:" + obj);
		return ResponseEntity.ok(obj.toString());
	}

	// 관리필지조회 데이터테이블
	@RequestMapping(value = "/menu03DataTableList", method = { RequestMethod.GET, RequestMethod.POST }) // http://localhost:8080/api/get/dbTest
	public ResponseEntity<?> datatableList03(HttpServletRequest req, HttpServletResponse res) throws Exception {

		// 일반웹형식
		Properties requestParams = CommonUtil.convertToProperties(req);
		log.info("requestParams:" + requestParams);

		int draw = Integer.parseInt(req.getParameter("draw"));
		int start = Integer.parseInt(req.getParameter("start"));
		int length = Integer.parseInt(req.getParameter("length"));
		String orderColumn = req.getParameter("order[0][column]");
		String orderDirection = req.getParameter("order[0][dir]");
		String orderColumnName = req.getParameter("columns[" + orderColumn + "][data]");

		log.info("orderColumn:" + orderColumn);
		log.info("orderColumnName:" + orderColumnName);
		log.info("orderDirection:" + orderDirection);
		String[] order_cols = req.getParameterValues("order");

		String jisa = req.getParameter("jisa"); // 지사
		String manage_no = req.getParameter("manage_no"); // 관리번호
		String toji_type = req.getParameter("toji_type"); // 토지유형
		String right_type = req.getParameter("right_type"); // 권리확보유형
		String dosiplan = req.getParameter("dosiplan"); //도시계획유형
		String right_overlap = req.getParameter("right_overlap"); //권리중복필지
		
		String address = req.getParameter("saddr");
		String sido_nm = req.getParameter("sido_nm");
		String sgg_nm = req.getParameter("sgg_nm");
		String emd_nm = req.getParameter("emd_nm");
		String ri_nm = req.getParameter("ri_nm");
		String jibun = req.getParameter("jibun");
		
//		log.info("draw:" + draw);
//		log.info("length:" + length);
//		log.info("jisa:" + jisa);
//		log.info("manage_no:" + manage_no);
//		log.info("type_gover:" + type_gover);
//		log.info("type_jisang:" + type_jisang);
//		log.info("type_notset:" + type_notset);
//		log.info("type_dopco:" + type_dopco);
//		log.info("right_type:" + right_type);

		HashMap params = new HashMap();
		params.put("draw", draw);
		params.put("start", start);
		params.put("length", length);
		
		params.put("jisa", req.getParameter("jisa"));
		params.put("idx", manage_no);
		params.put("toji_type", toji_type);
		params.put("dosiplan", dosiplan);
		params.put("right_overlap", right_overlap);
		params.put("address", address);
		params.put("sido_nm",sido_nm);
		params.put("sgg_nm",sgg_nm);
		params.put("emd_nm",emd_nm);
		params.put("ri_nm",ri_nm);
		params.put("jibun",jibun);

		String[] right_arr = {};
		right_arr = right_type.split(",");
		params.put("right_type", right_arr);

		if (orderColumn == null || orderColumn.equals("null")) {
			log.info("----------null--------");
			orderColumn = "0";
		}
		if (Integer.parseInt(orderColumn) > 0) {
			params.put("orderCol", orderColumnName);
			params.put("desc", orderDirection);
		} else {
			params.put("orderCol", "");
			params.put("desc", "");
		}
		log.info("params:" + params);
		Object count = mainService.selectCountQuery("songyuSQL.selectTotalCount5", params);
		int total = (int) count;

		ArrayList<HashMap> list = mainService.selectQuery("songyuSQL.selectAllList5", params);

		HashMap<String, Object> resultmap = new HashMap();
		resultmap.put("draw", draw);
		resultmap.put("recordsTotal", total);
		resultmap.put("recordsFiltered", total);
		resultmap.put("data", list);

		JSONObject obj = new JSONObject(resultmap);
		log.info("obj:" + obj);
		return ResponseEntity.ok(obj.toString());
	}

	//TODO: 미설정(notset) temp 로 저장 - notsetController 에서 처리하도록 수정 필요
	@RequestMapping(value = "/fileUpload/post") // ajax에서 호출하는 부분
	@ResponseBody
	public HashMap upload(MultipartHttpServletRequest multipartRequest) { // Multipart로 받는다.

		Iterator<String> itr = multipartRequest.getFileNames();

		String filePath = GC.getNotsetFileTempDir(); // 설정파일로 뺀다.
		HashMap<String, Object> resultmap = new HashMap();
		ArrayList<HashMap> resultdataarr = new ArrayList<HashMap>();
		HashMap resultdata = new HashMap();
		String resultCode = "0000";
		String resultMessage = "success";
		while (itr.hasNext()) { // 받은 파일들을 모두 돌린다.

			/*
			 * 기존 주석처리 MultipartFile mpf = multipartRequest.getFile(itr.next()); String
			 * originFileName = mpf.getOriginalFilename();
			 * System.out.println("FILE_INFO: "+originFileName); //받은 파일 리스트 출력'
			 */

			MultipartFile mpf = multipartRequest.getFile(itr.next());

			String originalFilename = mpf.getOriginalFilename(); // 파일명

			String fileFullPath = filePath + "/" + originalFilename; // 파일 전체 경로

			try {
				// 파일 저장
				mpf.transferTo(new File(fileFullPath)); // 파일저장 실제로는 service에서 처리

				resultdata.put("fname", originalFilename);
				resultdata.put("fpath", fileFullPath);
				System.out.println("originalFilename => " + originalFilename);
				System.out.println("fileFullPath => " + fileFullPath);
				// resultdataarr.add(resultdata);
			} catch (Exception e) {
				resultCode = "4001";
				resultdata.put("fname", "");
				resultdata.put("fpath", "");
				resultMessage = "error";
				// resultdataarr.add(resultdata);
				System.out.println("postTempFile_ERROR======>" + fileFullPath);
				e.printStackTrace();
			}

//            System.out.println(obj);

			// log.info("jo:"+jo);
//          			response.setCharacterEncoding("UTF-8");
//          			response.setHeader("Access-Control-Allow-Origin", "*");
//          			response.setHeader("Cache-Control", "no-cache");
//          			response.resetBuffer();
//          			response.setContentType("application/json");
//          			//response.getOutputStream().write(jo);
//          			response.getWriter().print(obj);
//          			response.getWriter().flush();

		}
		resultmap.put("resultCode", resultCode);
		resultmap.put("resultData", resultdata);
		resultmap.put("resultMessage", resultMessage);
		JSONObject obj = new JSONObject(resultmap);

		return resultmap;
	}
	
	/*
	 * groundDetail.js의 sendFileToServer() 함수
	 * 탐색기에서 파일 선택했을 때 필지 정보 임시 저장
	 */
	@RequestMapping(value = "/fileUpload/post/pnu") //ajax에서 호출하는 부분
    @ResponseBody
    public HashMap uploadPnu(MultipartHttpServletRequest multipartRequest) { //Multipart로 받는다.
         
        Iterator<String> itr =  multipartRequest.getFileNames();
        
        String filePath = GC.getPnuFileTempDir(); //설정파일로 뺀다.
        HashMap<String,Object> resultmap=new HashMap();
        ArrayList<HashMap> resultdataarr=new ArrayList<HashMap>();
        HashMap resultdata=new HashMap();
        String resultCode="0000";
        String resultMessage="success";
        while (itr.hasNext()) { //받은 파일들을 모두 돌린다.
            
            /* 기존 주석처리
            MultipartFile mpf = multipartRequest.getFile(itr.next());
            String originFileName = mpf.getOriginalFilename();
            System.out.println("FILE_INFO: "+originFileName); //받은 파일 리스트 출력'
            */
            
            MultipartFile mpf = multipartRequest.getFile(itr.next());
     
            String originalFilename = mpf.getOriginalFilename(); //파일명
     
            String fileFullPath = filePath+"/"+originalFilename; //파일 전체 경로
          
           
            try {
            	
            	System.out.println("fileFullPath :: " + fileFullPath);
                //파일 저장
                mpf.transferTo(new File(fileFullPath)); //파일저장 실제로는 service에서 처리
                
                
                resultdata.put("fname",originalFilename);
                resultdata.put("fpath",fileFullPath);
                System.out.println("originalFilename => "+originalFilename);
                System.out.println("fileFullPath => "+fileFullPath);
               // resultdataarr.add(resultdata);
            } catch (Exception e) {
            	resultCode="4001";
            	resultdata.put("fname","");
                resultdata.put("fpath","");
                resultMessage="error";
               // resultdataarr.add(resultdata);
                System.out.println("postTempFile_ERROR======>"+fileFullPath);
                e.printStackTrace();
            }
           
          
//            System.out.println(obj);
           
          //log.info("jo:"+jo);
//          			response.setCharacterEncoding("UTF-8");
//          			response.setHeader("Access-Control-Allow-Origin", "*");
//          			response.setHeader("Cache-Control", "no-cache");
//          			response.resetBuffer();
//          			response.setContentType("application/json");
//          			//response.getOutputStream().write(jo);
//          			response.getWriter().print(obj);
//          			response.getWriter().flush();
                         
       }
        resultmap.put("resultCode",resultCode);
        resultmap.put("resultData",resultdata);
        resultmap.put("resultMessage",resultMessage);
        JSONObject obj =new JSONObject(resultmap);
         
        return resultmap;
    }
	
	// 미설정/미점용 등록
	@Transactional
	@PostMapping(path = "/insertSonguList")
	public void insertSonguList(HttpServletRequest request, HttpServletResponse response) throws Exception {
		String requestParams = ParameterUtil.getRequestBodyToStr(request);
		log.info("requestParams:" + requestParams);
		JSONObject requestParamObj = new JSONObject(requestParams);
		ArrayList list = new ArrayList();
		CommonUtil comm = new CommonUtil();

		ParameterParser parser = new ParameterParser(request);

//			String notsetNo = (parser.getString("notsetNo", "")); // 수정할 미설정/미점용 번호
//
//			String sinm = (parser.getString("sidoNm", "")).replaceAll("전체", ""); // 시
//			// 네임
//			String gungunm = (parser.getString("gugunNm", "")).replaceAll("전체", ""); // 시군구
//			// 네임
//			String dongnm = (parser.getString("dongNm", "")).replaceAll("전체", ""); // 동
//			// 네임
//			String rinm = (parser.getString("riNm", "")).replaceAll("전체", ""); // 리
//			// 네임
//			String jisanm = parser.getString("jisaNm", "").replaceAll("전체", ""); // 지사
//			// 네임
//			String jibun = parser.getString("jibun", ""); // 지번
//			String addrcode = parser.getString("addrcode", ""); // 주소코드
//			String jisa = parser.getString("jisa", ""); // 담당지사
//			String goverownyn = parser.getString("goverYN", "N"); // 국공유지여부
//			String zone = parser.getString("zone", ""); // 관로명(구간)
//			String sun_gubun = parser.getString("sunGubun", ""); // 단/복선
//			String pipeMeter = parser.getString("pipeMeter", ""); // 관경
//			String pipeMeter2 = parser.getString("pipeMeter2", ""); // 관경2
//			String pnu = parser.getString("pnu", ""); // 검색결과 PNU
//			String jijuk_area = parser.getString("jijukArea", ""); // 지면 면적(㎡)
//			String jimok_text = parser.getString("jimokText", ""); // 지면 면적(㎡)
//
//			String tojiType = parser.getString("tojiType", ""); // 관로일치여부
//			String pipeYn = parser.getString("pipeYn", ""); // 관로일치여부
//
//			String soyunumber = parser.getString("soyunumber", ""); // 소유자 수
//			System.out.println(parser.getString("soyunumber"));
//			String filenumber = parser.getString("filenumber", ""); // 파일 수
//
//			String gubun = parser.getString("gubun", ""); // 구분( modify : 수정, insert
//			// : 등록 )
//			String fileseq = parser.getString("fileSeq", ""); // 파일 seq
//			// int FILE_CNT = Integer.parseInt(parser.getString("flieCnt", "0")); //
//			// 파일수
//
//			String modifyReason1 = parser.getString("modifyReason1", ""); // 변경이력-기본정보
//			String modifyReason2 = parser.getString("modifyReason2", ""); // 변경이력-소유자정보
//
//			String USER_ID = String.valueOf(request.getSession().getAttribute("userId"));
//			String USER_NAME = String.valueOf(request.getSession().getAttribute("userName"));
//
//			String CONVERT_FLAG = parser.getString("CONVERT_FLAG", "N");
//			String CONVERT_BEFORE_KEY = parser.getString("CONVERT_BEFORE_KEY", "");
//
//			String str_result = "Y";
//
//			String minwon = parser.getString("minwon", ""); // 민원관리에서 넘어왔을 경우 플래그.
//			String minwonSeq = parser.getString("minwonSeq", ""); // 민원관리에서 넘어왔을 경우 플래그.

		String notsetNo = requestParamObj.has("notset_no") ? requestParamObj.getString("notset_no") : ""; // 수정할 미설정/미점용
																											// 번호

		String sinm = (requestParamObj.getString("sido_nm")).replaceAll("전체", ""); // 시
		// 네임
		String gungunm = (requestParamObj.getString("sgg_nm")).replaceAll("전체", ""); // 시군구
		// 네임
		String dongnm = (requestParamObj.getString("emd_nm")).replaceAll("전체", ""); // 동
		// 네임
		String rinm = (requestParamObj.getString("ri_nm")).replaceAll("전체", ""); // 리
		// 네임
		String jisanm = requestParamObj.getString("jisa").replaceAll("전체", ""); // 지사
		// 네임

		String addrcode = requestParamObj.getString("addrcode"); // 주소코드
		String jisa = requestParamObj.getString("jisa"); // 담당지사
		String goverownyn = requestParamObj.getString("goverYN"); // 국공유지여부
		String zone = requestParamObj.getString("zone"); // 관로명(구간)
		String sun_gubun = requestParamObj.getString("sunGubun"); // 단/복선
		String pipeMeter = requestParamObj.getString("pipe_diameter1"); // 관경
		String pipeMeter2 = requestParamObj.getString("pipe_diameter2"); // 관경2

		String jijuk_area = requestParamObj.getString("jijuk_area"); // 지면 면적(㎡)
		String jimok_text = requestParamObj.getString("jimok_text"); // 지면 면적(㎡)

		String tojiType = requestParamObj.has("tojiType") ? requestParamObj.getString("tojiType") : ""; // 관로일치여부
		String pipeYn = requestParamObj.getString("overlap_yn"); // 관로일치여부
		String memo = requestParamObj.getString("memo"); // 메모

		// String soyunumber = requestParamObj.getString("soyunumber"); // 소유자 수
		// System.out.println(requestParamObj.getString("soyunumber"));
		// String filenumber = requestParamObj.getString("filenumber"); // 파일 수

		String gubun = requestParamObj.getString("gubun"); // 구분( modify : 수정, insert
		// : 등록 )
		// String fileseq = requestParamObj.getString("fileSeq"); // 파일 seq
		// int FILE_CNT = Integer.parseInt(parser.getString("flieCnt", "0")); //
		// 파일수
		String pnu = "";
		String jibun = "";
		if (gubun.equals("insert")) {
			pnu = requestParamObj.getString("mpnu").trim(); // 검색결과 PNU
			jibun = requestParamObj.getString("mjibun"); // 지번
		} else {
			pnu = requestParamObj.getString("pnu").trim(); // 검색결과 PNU
			jibun = requestParamObj.getString("jibun"); // 지번
		}
		String modifyReason1 = requestParamObj.has("modifyReason1") ? requestParamObj.getString("modifyReason1") : ""; // 변경이력-기본정보
		String modifyReason2 = requestParamObj.has("modifyReason2") ? requestParamObj.getString("modifyReason2") : ""; // 변경이력-소유자정보

		String USER_ID = String.valueOf(request.getSession().getAttribute("userId"));
		String USER_NAME = String.valueOf(request.getSession().getAttribute("userName"));

		String CONVERT_FLAG = requestParamObj.has("CONVERT_FLAG") ? requestParamObj.getString("CONVERT_FLAG") : "N";
		String CONVERT_BEFORE_KEY = requestParamObj.has("CONVERT_BEFORE_KEY")
				? requestParamObj.getString("CONVERT_BEFORE_KEY")
				: "";

		String str_result = "Y";

		String minwon = requestParamObj.has("minwon") ? requestParamObj.getString("minwon") : ""; // 민원관리에서 넘어왔을 경우 플래그.
		String minwonSeq = requestParamObj.has("minwonSeq") ? requestParamObj.getString("minwonSeq") : ""; // 민원관리에서
																											// 넘어왔을 경우
																											// 플래그.
		log.info("notsetNo:" + notsetNo);

		JSONArray soujaArr = new JSONArray(requestParamObj.getString("soujaInfo"));
		JSONArray fileArr = new JSONArray(requestParamObj.getString("uploadFiles"));
		log.info("soujaArrsize:" + soujaArr.length());

		try {

//				ArrayList NotsetList = (ArrayList) Database.getInstance().queryForList("Json.selectNotsetNextNo", null);
			ArrayList NotsetList = (ArrayList) mainService.selectQuery("songyuSQL.selectNotsetNextNo", null);
			HashMap params = new HashMap();

			// params.put("FILESEQ", fileseq);
			params.put("NOTSET_NO", notsetNo);
			params.put("SIDO_NM", sinm);
			params.put("SGG_NM", gungunm);
			params.put("EMD_NM", dongnm);
			params.put("RI_NM", rinm);
			params.put("JISA", jisanm);
			params.put("JIBUN", jibun);
			params.put("ADDRCODE", addrcode);
			params.put("GOVER_OWN_YN", goverownyn);
			params.put("PIPE_NAME", zone);
			params.put("SUN_GUBUN", sun_gubun);
			params.put("PNU", pnu);
			params.put("JIJUK_AREA", jijuk_area);
			params.put("JIMOK_TEXT", jimok_text);
			params.put("TOJI_TYPE", tojiType);
			params.put("PIPE_YN", pipeYn);
			params.put("PIPE_METER", pipeMeter);
			params.put("PIPE_METER2", pipeMeter2);
			// params.put("FILE_SEQ", fileseq);
			params.put("USER_ID", USER_ID);
			params.put("USER_NAME", USER_NAME);
			params.put("MINWON_SEQ", minwonSeq);

//log.info("params:"+params);

			// 로깅처리를 위하여 기존 지적도 데이터 조회
			ArrayList tmpList = new ArrayList();
			tmpList = (ArrayList) mainService.selectQuery("songyuSQL.selectJijukBeforePNU", params);
			log.info("--------------tmpList:" + tmpList);
//				Map logParam = (HashMap) Database.getInstance().queryForObject("Json.selectJijukBeforePNU", params);
			HashMap logParam = (HashMap) tmpList.get(0);

			if (gubun.equals("modify")) {

				params.put("NOTSET_NO", notsetNo);
				notsetNo = (String) params.get("NOTSET_NO");

			} else {
				log.info("notsetlist:" + ((HashMap) NotsetList.get(0)).get("now_notsetno"));
				String Next_notsetNo = ""; // = String.valueOf(Integer.parseInt((String) ((HashMap)
											// NotsetList.get(0)).get("now_notsetno")) + 1);
				// HashMap에서 값을 안전하게 가져와서 처리
				Object notsetnoObj = ((HashMap) NotsetList.get(0)).get("now_notsetno");

				log.info("notsetnoObj: " + notsetnoObj);
				if (notsetnoObj != null) {
					String notsetnoStr = notsetnoObj.toString(); // 안전하게 toString() 사용
					int nextNotsetNo = Integer.parseInt(notsetnoStr) + 1;
					log.info("nextNotsetNo: " + nextNotsetNo);
					Next_notsetNo = String.valueOf(nextNotsetNo);
				} else {
					// null인 경우에 대한 처리 (예: 초기화하거나 에러 처리)
					Next_notsetNo = "1"; // 기본값 설정
				}

				int n_Next_notsetNo = Next_notsetNo.length();

				String add_Zero = "";
				for (int i = 0; i < (6 - n_Next_notsetNo); i++) {
					add_Zero += "0";
				}
				Next_notsetNo = "N_" + add_Zero + Next_notsetNo;

				params.put("NOTSET_NO", Next_notsetNo);
				params.put("notset_no", Next_notsetNo);
				notsetNo = (String) params.get("NOTSET_NO");
				log.info("notsetNo: " + notsetNo);
			}

			if (gubun.equals("insert")) {
//					Database.getInstance().insert("Json.insertNotsetMaster", params);
				mainService.InsertQuery("songyuSQL.insertNotsetMaster1", params);

				// 메모등록
				// 메모도 여기서 등록한다.
				HashMap memoParam = new HashMap();
				memoParam.put("manage_no", params.get("NOTSET_NO"));
				memoParam.put("wmemo", memo);
				memoParam.put("wname", (USER_NAME == null || USER_NAME == "null") ? "" : USER_NAME);
				mainService.InsertQuery("commonSQL.putMemoData", memoParam);

				// mainService.InsertQeury("commonSQL.putMemoData",params);
				params.put("STATUS", "NOTSET");
				params.put("GOVEROWNYN", goverownyn);
				params.put("JISANGNO", params.get("NOTSET_NO"));
				params.put("JISA", jisanm);
				params.put("PIPEYN", pipeYn);
//					Database.getInstance().update("Json.updateTogiJisang_Status", params);
				mainService.UpdateQuery("songyuSQL.updateTogiJisang_Status", params);
			} else if (gubun.equals("modify")) {

				/***********************
				 * 행정구역이 변경이 되면, 기존의 행정구역은 미설정으로 바꾸고, 변경된 행정구역을 미설정으로 변경함.
				 ************************/
				log.info("params:" + params);
				ArrayList notsetlist = (ArrayList) mainService.selectQuery("songyuSQL.selectNotsetRowDetail_KibonInfo",
						params);
				String str_BeforePNU = "";

				if (null != notsetlist && notsetlist.size() > 0) {

					HashMap hm = new HashMap();
					for (int i = 0; i < list.size(); i++) {
						str_BeforePNU = (String) ((HashMap) notsetlist.get(i)).get("PNU");
					}
				}

				// 행정구역이 같지않다면
				if (!str_BeforePNU.equals(pnu) && !str_BeforePNU.equals("NULL")) {

					// ** JIJUK_MASTER 테이블 미설정 해제**//
					params.put("JISANGNO", params.get("NOTSET_NO"));
					mainService.UpdateQuery("songyuSQL.updateNotsetMasterStatus", params);

				}

				mainService.UpdateQuery("songyuSQL.updateNotsetMaster", params); // 기본정보

				// 메모등록
				// 메모도 여기서 등록한다.
				HashMap memoParam = new HashMap();
				memoParam.put("manage_no", params.get("NOTSET_NO"));
				memoParam.put("wmemo", memo);
				memoParam.put("wname", (USER_NAME == null || USER_NAME == "null") ? "" : USER_NAME);
				mainService.InsertQuery("commonSQL.updateMemoData", memoParam);

				// 변경이력 등록
				if (!modifyReason1.equals("")) {
					params.put("GUBUN", "기본정보");
					params.put("CONT", modifyReason1);
					mainService.InsertQuery("songyuSQL.insertNotsetModifyHistory", params);
				}
				if (!modifyReason2.equals("")) {
					params.put("GUBUN", "소유자 정보");
					params.put("CONT", modifyReason2);
					mainService.InsertQuery("songyuSQL.insertNotsetModifyHistory", params);
				}

				params.put("STATUS", "NOTSET");
				params.put("GOVEROWNYN", goverownyn);
				params.put("JISANGNO", params.get("NOTSET_NO"));
				params.put("JISA", jisanm);
				params.put("PIPEYN", pipeYn);
				mainService.UpdateQuery("songyuSQL.updateTogiJisang_Status", params);
			}

			// 소유자
			for (int i = 0; i < soujaArr.length(); i++) {
				JSONObject obj = new JSONObject(soujaArr.get(i).toString());
				log.info("obj:" + obj);
				String JIBUN = obj.getString("jibun");
				String NAME = obj.getString("soujaName");
				String ADDR = obj.getString("soujaAddress");
				String TEL = obj.getString("soujaContact2");
				String PHONE = obj.getString("soujaContact1");

				params.put("JIBUN", JIBUN); // 공유지분
				params.put("NAME", NAME); // 성명
				params.put("ADDR", ADDR); // 주소
				params.put("TEL", TEL); // 연락처(집)
				params.put("PHONE", PHONE); // 연락처(집)

				if (gubun.equals("modify")) {
					if (i == 0) {
						mainService.UpdateQuery("songyuSQL.deleteNotsetSoyu", params); // 기존 소유자 삭제
					}
				}

				// if(!JIBUN.equals("") || !NAME.equals("") ||
				// !ADDR.equals("")|| !TEL.equals("")|| !HP.equals(""))
				mainService.InsertQuery("songyuSQL.insertNotsetSoyu", params); // 소유자 저장
			}

			for (int i = 0; i < fileArr.length(); i++) {
				// JSONObject fobj=new JSONObject(fileArr.get(i).toString());
				String file_name = fileArr.getString(i);
				log.info("file_name:" + file_name);
				HashMap<String, Object> filesMap = new HashMap<>();
				//
//						     			filesMap=CommonUtil.JsonArraytoMap(obj);
				//
				filesMap.put("notsetNo", String.valueOf((params.get("NOTSET_NO"))));
				filesMap.put("seq", i);
				filesMap.put("fseq", i);
				filesMap.put("fname", file_name);
				
				String chageFileName = CommonUtil.filenameAutoChange(file_name);
				String tempPath = GC.getJisangFileTempDir(); // 설정파일로 뺀다.
				String dataPath = GC.getNotsetFileDataDir() + "/" + String.valueOf((params.get("NOTSET_NO"))); // 설정파일로 뺀다.
				filesMap.put("fpath", dataPath + "/" + chageFileName);
				
				CommonUtil.moveFile(file_name, tempPath, dataPath, chageFileName);
				log.info("filesMap:" + filesMap);
				
				mainService.InsertQuery("notsetSQL.insertNotsetUploadData", filesMap);
				
				HashMap historyParam = new HashMap();
				
				params.put("GUBUN", "파일정보");
				params.put("CONT", "파일등록(" + file_name + ")");
				
				log.info("params:" + params);
				mainService.InsertQuery("songyuSQL.insertNotsetModifyHistory", params);

			}

//				if (gubun.equals("modify")) {
//					for (int i = 0; i < fileArr.length(); i++) {
//						
//						//JSONObject jobj=new JSONObject(fileArr.get(i).toString());
//						String fileName=fileArr.getString(i);
//						log.info("fileName:"+fileName);
//						String IS_DEL = parser.getString("isFileDel" + String.valueOf(i), "");
//						String DEL_SEQ = parser.getString("fileSeq" + String.valueOf(i), "");
//
//						if (IS_DEL.equals("Y")) {
//							// System.out.println("FILE_DEL_SEQ=" + DEL_SEQ);
//
//							// 조회용 parma셋팅
//							params.put("SEQ", "");
//							params.put("FILENO", String.valueOf((params.get("NOTSET_NO"))));
//							params.put("FILE_SEQ", DEL_SEQ);
//							ArrayList File_list = (ArrayList) mainService.selectQuery("songyuSQL.selectNotsetRowDetail_Files", params); // 첨부
//																																				// 파일
//
//							params.put("SEQ", DEL_SEQ);
//							mainService.UpdateQuery("songyuSQL.notsetDeleteFile", params);
//
//							// 변경이력 등록
//							if (null != File_list && File_list.size() > 0) {
//								String str_FileName = String.valueOf(((HashMap) File_list.get(0)).get("FILE_NM"));
//								params.put("GUBUN", "파일정보");
//								params.put("CONT", "파일삭제(" + str_FileName + ")");
//								mainService.InsertQuery("songyuSQL.insertNotsetModifyHistory", params);
//							}
//						}
//					}
//				}

			// 추가된 파일이 있으면 변경이력에 등록
			ArrayList seq_fileList = (ArrayList) mainService.selectQuery("songyuSQL.selectNotset_ATCFILE_NoCheck",
					params); // 첨부
								// 파일
			if (null != seq_fileList && seq_fileList.size() > 0) {
				for (int i = 0; i < seq_fileList.size(); i++) {
					HashMap fileList = (HashMap) seq_fileList.get(i);
					String str_JNo = comm.evl(String.valueOf(fileList.get("NOTSET_NO")), "");
					if ("".equals(str_JNo)) {
						String str_FilNM = comm.evl(String.valueOf(fileList.get("FILE_NM")), "");

						params.put("GUBUN", "파일정보");
						params.put("CONT", "파일등록(" + str_FilNM + ")");
						mainService.InsertQuery("songyuSQL.insertNotsetModifyHistory", params);
					}
				}
			}

			if (seq_fileList.size() > 0)
				mainService.UpdateQuery("songyuSQL.updateNotsetSeqFile", params);

			// 신규등록일때만. 수정모드가 아닐때만 신규등록처리.
			if (!"modify".equals(gubun)) {

				/**********************
				 * 잠재이슈 기본값 등록처리 지상권 미설정, 계약 미체결, 기공승낙서 미존재, 토지소유자없이 매설, 오류/무단매설
				 **********************/

				int result = 0;
				if ("99999".equals(pnu) || "null".equals(pnu) || "".equals(pnu)) {
					// 2023.03.09 :: pnu가 null인 경우가 있음.
					params.put("PNU", null);
				} else {
					params.put("PNU", pnu);
				}
				// 신규등록일때는 해당 이슈가 변경되어 이슈사항을 기록하지 않는게 맞을듯
//					params.put("ADDRCODE", addrcode);
//					params.put("JIBUN", jibun);
//					params.put("CODE_DEPTH1", "");	// 이슈없음
//					params.put("CODE_DEPTH2", "");	// 이슈없음
//					params.put("CODE_DEPTH3", "");	// 이슈없음
//					params.put("ISSUE_COMMENT", "");
//					params.put("HISTORY_TYPE", "신규 등록");
//					params.put("HISTORY_CONTENT", "신규 등록: [기공승낙서 미존재 &gt; 토지소유자없이 매설 &gt; 오류/무단매설], 사유: [신규등록]");
//					params.put("REGISTED_YN", "");
//					params.put("PERMITTED_YN", "");
//					System.out.println("params="+params.toString());
//					String SEQ = (String) mainService.selectStringQuery("songyuSQL.makePnuIssueSeq", params);
//					params.put("SEQ", SEQ);
//					result =(int)mainService.UpdateQuery("songyuSQL.insertPnuIssue", params);
//		
//					if (result > 0) {
//						mainService.UpdateQuery("songyuSQL.insertPnuIssueHistory", params);
//					}

				/**********************
				 * 잠재이슈 기본값 등록처리 지상권 설정, 계약 체결, 이슈없음, 이슈없음, 이슈없음
				 **********************/
			}

			if ("MINWON".equals(minwon)) {
				// System.out.println(params.toString());
				mainService.UpdateQuery("songyuSQL.updateMinwonPnuComplete", params);
			}

			// 로깅처리를 위하여 기존 지적도 데이터 조회
//				Map logParam = (HashMap) Database.getInstance().queryForObject("Json.selectJijukBefore", params);
			// 해지처리미설정 정보 처리
			logParam.put("JISANG_NO", notsetNo);
			logParam.put("JISANG_STATUS", "NOTSET");
			logParam.put("GOVER_OWN_YN", goverownyn);
			logParam.put("PIPE_OVERLAP_YN", pipeYn);
			logParam.put("JISA", jisa);
			logParam.put("LOG_USER", String.valueOf(request.getSession().getAttribute("userId")));
			logParam.put("LOG_TYPE", "U");
			mainService.InsertQuery("songyuSQL.insertJijukLog", logParam);

		} catch (Exception e) {
			str_result = "N";
			e.printStackTrace();
		}

		HashMap map = new HashMap();

		if (list != null)
			map.put("count", list.size());
		else
			map.put("count", 0);

		map.put("message", str_result);
		map.put("result", list);
		map.put("gubun", gubun);
		map.put("notsetNo", notsetNo);
		map.put("jibun", jibun);
		map.put("addrcode", addrcode);
		map.put("pnu", pnu);

		JSONObject jo = new JSONObject(map);

		response.setCharacterEncoding("UTF-8");
		response.setHeader("Access-Control-Allow-Origin", "*");
		response.resetBuffer();
		response.setContentType("application/json");
		response.getWriter().print(jo);
		response.getWriter().flush();
	}

	// 지사 선택에 따라 관로명 목록을 반환하는 API
	@PostMapping("/getPipeName")
	public ResponseEntity<Map<String, Object>> getPipeName(@RequestBody Map<String, String> requestData)
			throws Exception {
		log.info("getPipeName 컨트롤러 동작");
		String selectedJisa = requestData.get("jisa");

		// 직접 SQL 쿼리를 호출하여 데이터를 가져옴
		HashMap<String, Object> params = new HashMap<>();
		params.put("jisa", selectedJisa);

		// SQL 호출하여 데이터 가져오기
		ArrayList<HashMap> pipeNameList = mainService.selectQuery("goverSQL.selectPipeNameByJisa", params);

		log.info("pipeNameList: " + pipeNameList);

		// 결과를 담은 Map 객체 생성
		Map<String, Object> response = new HashMap<>();
		response.put("resultData", pipeNameList);

		return new ResponseEntity<>(response, HttpStatus.OK);
	}

	// 미설정/미점용 상세 정보
// 	public void selectRowDetailNotset(HttpServletRequest request, HttpServletResponse response) throws Exception {
//
// 		ParameterParser parser = new ParameterParser(request);
// 		String NOTSET_NO = parser.getString("notsetNo", "");
//
// 		Map params = new HashMap();
// 		params.put("NOTSET_NO", NOTSET_NO);
//
// 		ArrayList list1 = (ArrayList) Database.getInstance().queryForList("Json.selectNotsetRowDetail_KibonInfo", params); // 기본
// 		ArrayList list2 = (ArrayList) Database.getInstance().queryForList("Json.selectNotsetRowDetail_SoujaInfo", params); // 소유자
// 		System.out.println(" test :: " + params.get("NOTSET_NO"));
// 		ArrayList list3 = (ArrayList) Database.getInstance().queryForList("Json.selectNotsetRowDetail_Files", params); // 첨부 파일
// 		ArrayList list4 = (ArrayList) Database.getInstance().queryForList("Json.selectNotsetRowDetail_Modify", params); // 변경이력
//
// 		HashMap map = new HashMap();
//
// 		if (list1 != null)
// 			map.put("count", list1.size());
// 		else
// 			map.put("count", 0);
//
// 		map.put("result1", list1);
//
// 		if (list2 != null)
// 			map.put("count", list2.size());
// 		else
// 			map.put("count", 0);
//
// 		map.put("result2", list2);
//
// 		if (list3 != null)
// 			map.put("count", list3.size());
// 		else
// 			map.put("count", 0);
//
// 		map.put("result3", list3);
//
// 		if (list4 != null)
// 			map.put("count", list4.size());
// 		else
// 			map.put("count", 0);
//
// 		map.put("result4", list4);
//
// 		map.put("key", String.valueOf(request.getSession().getAttribute("loginKey")));
//
// 		JSONObject jo = new JSONObject(map);
//
// 		response.setCharacterEncoding("UTF-8");
// 		response.setHeader("Access-Control-Allow-Origin", "*");
// 		response.resetBuffer();
// 		response.setContentType("application/json");
// 		response.getWriter().print(jo);
// 		response.getWriter().flush();
//
// 	}
	
}
