package com.slsolution.plms.gover;

import java.io.BufferedReader;
import java.io.File;
import java.io.IOException;
import java.net.URLDecoder;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Enumeration;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.Properties;

import org.apache.commons.lang3.StringUtils;
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

import com.slsolution.plms.ApprovalHtmlUtil;
import com.slsolution.plms.ApprovalUtil;
import com.slsolution.plms.CommonUtil;
import com.slsolution.plms.MainService;
import com.slsolution.plms.ParameterParser;
import com.slsolution.plms.ParameterUtil;
import com.slsolution.plms.config.GlobalConfig;
import com.slsolution.plms.jisang.jisangController;
import com.slsolution.plms.json.JSONArray;
import com.slsolution.plms.json.JSONObject;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@EnableAsync
@RequiredArgsConstructor
@RestController
@RequestMapping("/land/gover")
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class goverController {

	@Autowired
	private MainService mainService;

	@Autowired
	private GlobalConfig GC;

	@GetMapping(path = "/api/list") // http://localhost:8080/api/get/dbTest
	public void apiList(HttpServletRequest httpRequest, HttpServletResponse response) throws Exception {

//        List<TestDTO> list = new ArrayList<TestDTO>();
//        list = dbService.getList();
		HashMap params = new HashMap();
		ArrayList<HashMap> list = new ArrayList<HashMap>();
		// List<CountryModel> list = masterDataBaseService.getCountry();
		// ArrayList<HashMap> list = sqlSession.selectList("selectAllList",params);

		list = mainService.selectQuery("goverSQL.selectAllList", params);
		//log.info("jisang /list:" + list.toString());
		// nhServ1.test();
		// ts.Test1();
		HashMap<String, Object> resultmap = new HashMap();
		resultmap.put("resultCode", "0000");
		resultmap.put("resultData", list);
		resultmap.put("resultMessage", "success");
		JSONObject obj = new JSONObject(resultmap);
//        System.out.println(obj);

		// log.info("jo:"+jo);
		response.setCharacterEncoding("UTF-8");
		response.setHeader("Access-Control-Allow-Origin", "*");
		response.setHeader("Cache-Control", "no-cache");
		response.resetBuffer();
		response.setContentType("application/json");
		// response.getOutputStream().write(jo);
		response.getWriter().print(obj);
		response.getWriter().flush();
		// return new ModelAndView("dbTest", "list", list);
	}

	@GetMapping(path = "/view/list") // http://localhost:8080/api/get/dbTest
	public ModelAndView viewList(HttpServletRequest httpRequest, HttpServletResponse response) throws Exception {
		ModelAndView mav = new ModelAndView();

//        List<TestDTO> list = new ArrayList<TestDTO>();
//        list = dbService.getList();
		HashMap params = new HashMap();
		ArrayList<HashMap> list = new ArrayList<HashMap>();
		// List<CountryModel> list = masterDataBaseService.getCountry();
		// ArrayList<HashMap> list = sqlSession.selectList("selectAllList",params);

		list = mainService.selectQuery("goverSQL.selectAllList", params);
//		log.info("jisang /list:" + list.toString());
		// nhServ1.test();
		// ts.Test1();
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

		mav.addObject("resultList", list);
		mav.setViewName("content/gover/list");
		return mav;
	}

	@GetMapping(path = "/view/write") // http://localhost:8080/api/get/dbTest
	public ModelAndView viewWrite(HttpServletRequest httpRequest, HttpServletResponse response) throws Exception {
		ModelAndView mav = new ModelAndView();

//        List<TestDTO> list = new ArrayList<TestDTO>();
//        list = dbService.getList();
		HashMap params = new HashMap();
		ArrayList<HashMap> list = new ArrayList<HashMap>();
		// List<CountryModel> list = masterDataBaseService.getCountry();
		// ArrayList<HashMap> list = sqlSession.selectList("selectAllList",params);

//		list=mainService.selectQuery("jisangSQL.selectAllList", params);
//        log.info("jisang /list:"+list.toString());
		// nhServ1.test();
		// ts.Test1();
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

	@GetMapping(path = "/view/view") // http://localhost:8080/api/get/dbTest
	public ModelAndView viewView(HttpServletRequest httpRequest, HttpServletResponse response) throws Exception {
		ModelAndView mav = new ModelAndView();

//        List<TestDTO> list = new ArrayList<TestDTO>();
//        list = dbService.getList();
		HashMap params = new HashMap();
		ArrayList<HashMap> list = new ArrayList<HashMap>();
		// List<CountryModel> list = masterDataBaseService.getCountry();
		// ArrayList<HashMap> list = sqlSession.selectList("selectAllList",params);

//		list=mainService.selectQuery("jisangSQL.selectAllList", params);
//        log.info("jisang /list:"+list.toString());
		// nhServ1.test();
		// ts.Test1();
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

	// 송유관로 현황 - 점용 상세정보
	@GetMapping(path = "/occupationDetails") // http://localhost:8080/api/get/dbTest
	public ModelAndView occupationDetails(HttpServletRequest httpRequest, HttpServletResponse response) throws Exception {
		ModelAndView mav = new ModelAndView();
		HashMap params = new HashMap();

		String idx = httpRequest.getParameter("idx");
		String index = httpRequest.getParameter("index");
		String gidx = httpRequest.getParameter("gidx");

		params.put("idx", idx);
		params.put("index", index);
//			log.info("params:"+params);
		ArrayList<HashMap> data = mainService.selectQuery("goverSQL.selectAllData", params);
		ArrayList<HashMap> permitList = mainService.selectQuery("goverSQL.selectPermitList", params);
		ArrayList<HashMap> pnuList = mainService.selectQuery("goverSQL.selectPnuList", params);
		ArrayList<HashMap> atcFileList = mainService.selectQuery("goverSQL.selectAtcFileList", params);
		
		HashMap jijuk = new HashMap<>();
		jijuk.put("x", 0);
		jijuk.put("y", 0);

		HashMap targetParam = new HashMap();
		targetParam.put("idx", Integer.parseInt(gidx));
		ArrayList<HashMap> pnuTargetList = new ArrayList<HashMap>();
		if (!gidx.equals("0")) {
			pnuTargetList = mainService.selectQuery("goverSQL.selectPnuTargetList", targetParam);
			
			params.put("pnu", pnuTargetList.get(0).get("gp_pnu"));

			if (pnuTargetList.size() > 0) {
				HashMap jijukParam = new HashMap<>();
				jijukParam.put("sido_nm", pnuTargetList.get(0).get("gp_sido_nm"));
				jijukParam.put("sgg_nm", pnuTargetList.get(0).get("gp_sgg_nm"));
				jijukParam.put("emd_nm", pnuTargetList.get(0).get("gp_emd_nm"));
				jijukParam.put("ri_nm", pnuTargetList.get(0).get("gp_ri_nm"));
				jijukParam.put("jibun", pnuTargetList.get(0).get("gp_jibun"));
				ArrayList<HashMap> jijukList = mainService.selectQuery("commonSQL.selectJijuk", jijukParam);
				if (jijukList.size() > 0) {
					jijuk = jijukList.get(0);
				}
			}
		}
		
		//241009
		List<String> coordinateVal = new ArrayList<>();
		Integer coordinateSize = 0;

		// 소속 토지정보 각각의 좌표 가져오기
		for (int i = 0; i < pnuList.size(); i++) {
			HashMap jijukParam = new HashMap<>();
			
			System.out.println(pnuList.get(i));
			
//			jijukParam.put("sido_nm", pnuList.get(i).get("gp_sido_nm"));
//			jijukParam.put("sgg_nm", pnuList.get(i).get("gp_sgg_nm"));
//			jijukParam.put("emd_nm", pnuList.get(i).get("gp_emd_nm"));
//			jijukParam.put("ri_nm", pnuList.get(i).get("gp_ri_nm"));
//			jijukParam.put("jibun", pnuList.get(i).get("gp_jibun"));
			
			jijukParam.put("TARGET_PNU", pnuList.get(i).get("gp_pnu"));
			
			ArrayList<HashMap> jijukList = mainService.selectQuery("commonSQL.selectJijuk", jijukParam);
			
			coordinateSize += jijukList.size();
			
			if (jijukList.size() > 0) {
				pnuList.get(i).put("lng", jijukList.get(0).get("x"));
				pnuList.get(i).put("lat", jijukList.get(0).get("y"));
				
				for(int k = 0 ; k < jijukList.size() ; k++) {
					HashMap jijukInfo = jijukList.get(k);
					coordinateVal.add(jijukInfo.get("x").toString()+"|"+(String)jijukInfo.get("y").toString());
				}
				
			} else {
				pnuList.get(i).put("lng", "0");
				pnuList.get(i).put("lat", "0");
			}
		}

//			ArrayList<HashMap> goverPnuAtcFileList = mainService.selectQuery("goverSQL.selectPnuAtcFileList",params);
		ArrayList<HashMap> goverPnuAtcFileList = mainService.selectQuery("jisangSQL.selectPnuAtcFileList", params);
		params.put("pnu", data.get(0).get("jm_pnu"));
		log.info("pnu: "+ data.get(0).get("jm_pnu"));
		ArrayList<HashMap> goverIssueList = mainService.selectQuery("jisangSQL.selectIssueList",params); // 잠재이슈
		log.info("goverIssueList size:"+goverIssueList.size());
		if (goverIssueList != null && !goverIssueList.isEmpty()) {
			log.info("issueManualCode1:"+goverIssueList.get(0).get("depth1_title"));
			log.info("issueManualCode2:"+goverIssueList.get(0).get("depth2_title"));
			log.info("issueManualCode3:"+goverIssueList.get(0).get("depth3_title"));
			
			params.put("issueManualCode1", goverIssueList.get(0).get("depth1_title"));
			params.put("issueManualCode2", goverIssueList.get(0).get("depth2_title"));
			params.put("issueManualCode3", goverIssueList.get(0).get("depth3_title"));
		    mav.addObject("jisangIssueList", goverIssueList.get(0)); // 잠재이슈는 1개만 있음.
		} else {
		    log.info("잠재이슈리스트 없음");
		    mav.addObject("goverIssueList", new HashMap<>()); // 빈 객체 추가
		}
		ArrayList<HashMap> goverModifyList = mainService.selectQuery("goverSQL.selectModifyList",params);
		ArrayList<HashMap> goverIssueHistoryList = mainService.selectQuery("goverSQL.selectIssueHistoryList",params); // 잠재이슈 변경 이력
		ArrayList<HashMap> goverIssueCodeAtcFileList = mainService.selectQuery("jisangSQL.selectIssueCodeAtcFileList",params); // 잠재이슈 대응방안 메뉴얼
		ArrayList<HashMap> goverMemoList = mainService.selectQuery("commonSQL.selectMemoList", params); // 메모
//			ArrayList<HashMap> jisangMergeList = mainService.selectQuery("goverSQL.selectMergeList",params);
		params.put("manage_no", idx);

		log.info("params:" + params);
		log.info("data:" + data.get(0));
		log.info("pnu:" + pnuTargetList.get(0).get("gp_pnu"));
		log.info("permitList:" + permitList);
		log.info("atcFileList:" + atcFileList);
		log.info("goverMemoList:" + goverMemoList);
//			log.info("jm_jijuk_area:"+data.get(0).get("gm_jijuk_area"));
//			log.info("jisangPermitList:"+jisangPermitList);
//			log.info("souja count:"+soujaList.size());
//			log.info("soujaList:"+soujaList);
//			log.info("atcFileList:"+atcFileList);

		mav.addObject("resultData", data.get(0));
		mav.addObject("pnuTargetList", pnuTargetList); //대상 토지정보
		mav.addObject("pnuList", pnuList); // 소속 토지정보
		mav.addObject("permitList", permitList); // 허가정보
		mav.addObject("jijuk", jijuk);
		if (atcFileList == null || atcFileList.isEmpty()) { // 첨부파일
		    mav.addObject("atcFileList", new ArrayList<>());
		} else {
		    mav.addObject("atcFileList", atcFileList);
		}
		if (goverModifyList == null || goverModifyList.isEmpty()) { // 변경이력
		    mav.addObject("goverModifyList", new ArrayList<>());
		} else {
		    mav.addObject("goverModifyList", goverModifyList);
		}
		if (goverPnuAtcFileList == null || goverPnuAtcFileList.isEmpty()) { // 필지 첨부파일
		    mav.addObject("goverPnuAtcFileList", new ArrayList<>());
		} else {
		    mav.addObject("goverPnuAtcFileList", goverPnuAtcFileList);
		}
		if (goverIssueHistoryList == null || goverIssueHistoryList.isEmpty()) { //잠재이슈 변경이력
		    mav.addObject("goverIssueHistoryList", new ArrayList<>());
		} else {
		    mav.addObject("goverIssueHistoryList", goverIssueHistoryList);
		}
		if (goverIssueCodeAtcFileList == null || goverIssueCodeAtcFileList.isEmpty()) { //잠재이슈 대응 메뉴얼
		    mav.addObject("goverIssueCodeAtcFileList", new ArrayList<>());
		} else {
		    mav.addObject("goverIssueCodeAtcFileList", goverIssueCodeAtcFileList);
		}
		if (goverMemoList == null || goverMemoList.isEmpty()) { // 메모
		    mav.addObject("memoList", new ArrayList<>());
		} else {
		    mav.addObject("memoList", goverMemoList);
		}
		
		//지도보기, 이동관련
		mav.addObject("jijukCoordList", coordinateVal);
		mav.addObject("jijukCoordSize", coordinateSize);

		mav.setViewName("content/gover/occupationDetails");
		return mav;
	}
	

	// 지사 선택에 따라 허가관청 목록을 반환하는 API
	@PostMapping("/getPmtOffice")
	public ResponseEntity<Map<String, Object>> getPmtOffice(@RequestBody Map<String, String> requestData)
			throws Exception {
		log.info("getPmtOffice 컨트롤러 동작");
		String selectedJisa = requestData.get("jisa");

		// 직접 SQL 쿼리를 호출하여 데이터를 가져옴
		HashMap<String, Object> params = new HashMap<>();
		params.put("jisa", selectedJisa);

		// SQL 호출하여 데이터 가져오기
		ArrayList<HashMap> pmtOfficeList = mainService.selectQuery("goverSQL.selectPmtOfficesByJisa", params);

		// 결과를 담은 Map 객체 생성
		Map<String, Object> response = new HashMap<>();
		response.put("resultData", pmtOfficeList);

		return new ResponseEntity<>(response, HttpStatus.OK);
	}

	// 허가관청 선택에 따라 관리기관 목록을 반환하는 API
	@PostMapping("/getAdmOffice")
	public ResponseEntity<Map<String, Object>> getAdmOffice(@RequestBody Map<String, String> requestData)
			throws Exception {
		String selectedJisa = requestData.get("jisa");
		String selectedPmtOffice = requestData.get("pmt_office");

		// SQL 호출을 위한 파라미터 설정
		HashMap<String, Object> params = new HashMap<>();
		params.put("jisa", selectedJisa);
		params.put("pmt_office", selectedPmtOffice);

		// SQL 호출하여 데이터 가져오기
		ArrayList<HashMap> admOfficeList = mainService.selectQuery("goverSQL.selectAdmOfficesByJisaAndPmtOffice",
				params);

		// 결과를 담은 Map 객체 생성
		Map<String, Object> response = new HashMap<>();
		response.put("resultData", admOfficeList);

		return new ResponseEntity<>(response, HttpStatus.OK);
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

//		log.info("pipeNameList: " + pipeNameList);

		// 결과를 담은 Map 객체 생성
		Map<String, Object> response = new HashMap<>();
		response.put("resultData", pipeNameList);

		return new ResponseEntity<>(response, HttpStatus.OK);
	}

	@GetMapping(path = "/menu03_1") // http://localhost:8080/api/get/dbTest
	public ModelAndView menu03_1(HttpServletRequest httpRequest, HttpServletResponse response) throws Exception {

		HashMap params = new HashMap();

		ArrayList<HashMap> jisaList = mainService.selectQuery("commonSQL.selectAllJisaList", params);
		ArrayList<HashMap> jimoklist = mainService.selectQuery("commonSQL.selectJimokList", params);
		ArrayList<HashMap> sidolist = mainService.selectQuery("commonSQL.getSidoMaster", params);
		ArrayList<HashMap> usePurposlist = mainService.selectQuery("commonSQL.selectUsePurposList", params);

		ModelAndView mav = new ModelAndView();
		mav.addObject("jisaList", jisaList);
		mav.addObject("resultJimokList", jimoklist);
		mav.addObject("sidoList", sidolist);
		mav.addObject("usePurposlist", usePurposlist);

		mav.setViewName("content/gover/menu03_1");
		return mav;
	}

	@GetMapping(path = "/menu03_2") // http://localhost:8080/api/get/dbTest
	public ModelAndView menu03_2(HttpServletRequest httpRequest, HttpServletResponse response) throws Exception {
//			response.setHeader("X-Frame-Options", "SAMEORIGIN");
//			response.setHeader("Content-Security-Policy", " frame-ancestors 'self'");
		HashMap params = new HashMap();

		ArrayList<HashMap> jisaList = mainService.selectQuery("commonSQL.selectAllJisaList", params);
		ArrayList<HashMap> jimoklist = mainService.selectQuery("commonSQL.selectJimokList", params);
		ArrayList<HashMap> sidolist = mainService.selectQuery("commonSQL.getSidoMaster", params);
		ArrayList<HashMap> usePurposlist = mainService.selectQuery("commonSQL.selectUsePurposList", params);

		ModelAndView mav = new ModelAndView();
		mav.addObject("jisaList", jisaList);
		mav.addObject("resultJimokList", jimoklist);
		mav.addObject("sidoList", sidolist);
		mav.addObject("usePurposlist", usePurposlist);

		mav.setViewName("content/gover/menu03_2");

		return mav;
	}

	@GetMapping(path = "/menu03_3") // http://localhost:8080/api/get/dbTest
	public ModelAndView menu03_3(HttpServletRequest httpRequest, HttpServletResponse response) throws Exception {
//			response.setHeader("X-Frame-Options", "SAMEORIGIN");
//			response.setHeader("Content-Security-Policy", " frame-ancestors 'self'");
		HashMap params = new HashMap();

		ArrayList<HashMap> jisalist = mainService.selectQuery("commonSQL.selectAllJisaList", params);
		ArrayList<HashMap> jimoklist = mainService.selectQuery("commonSQL.selectJimokList", params);
		ArrayList<HashMap> sidolist = mainService.selectQuery("commonSQL.getSidoMaster", params);
		ArrayList<HashMap> usePurposlist = mainService.selectQuery("commonSQL.selectUsePurposList", params);

		ModelAndView mav = new ModelAndView();
		mav.addObject("jisaList", jisalist);
		mav.addObject("resultJimokList", jimoklist);
		mav.addObject("sidoList", sidolist);
		mav.addObject("usePurposlist", usePurposlist);

		mav.setViewName("content/gover/menu03_3");

		return mav;
	}

	@RequestMapping(value = "/menu03_1DataTableList", method = { RequestMethod.GET, RequestMethod.POST }) // http://localhost:8080/api/get/dbTest
	public ResponseEntity<?> datatableList03_1(HttpServletRequest req, HttpServletResponse res) throws Exception {
		// 일반웹형식
		Properties requestParams = CommonUtil.convertToProperties(req);

		HashMap<String, String> returnHash = new HashMap<String, String>();
		Enumeration<String> obj1 = req.getParameterNames();
		int cnt = 0;

		while (obj1.hasMoreElements()) {
			String paramName = obj1.nextElement();
			String paramValue = req.getParameter(paramName);
			returnHash.put(paramName, paramValue);
		}

		int draw = Integer.parseInt(req.getParameter("draw"));
		int start = Integer.parseInt(req.getParameter("start"));
		int length = Integer.parseInt(req.getParameter("length"));
		String orderColumn = req.getParameter("order[0][column]");
		String orderDirection = req.getParameter("order[0][dir]");
		String orderColumnName = req.getParameter("columns[" + orderColumn + "][data]");

		String[] order_cols = req.getParameterValues("order");

		String jisa = req.getParameter("jisa");
		String gover_no = req.getParameter("gover_no");
		String use_purpos = req.getParameter("use_purpos");
		String pmt_office = req.getParameter("pmt_office");
		String adm_office = req.getParameter("adm_office");
		String save_status = req.getParameter("save_status");
		String address = req.getParameter("saddr");
		String sido_nm = req.getParameter("sido_nm");
		String sgg_nm = req.getParameter("sgg_nm");
		String emd_nm = req.getParameter("emd_nm");
		String ri_nm = req.getParameter("ri_nm");
		String jibun = req.getParameter("jibun");

		String idx = req.getParameter("idx");

		Map map = req.getParameterMap();

		HashMap params = new HashMap();
		params.put("draw", draw);
		params.put("start", start);
		params.put("length", length);

		params.put("jisa", jisa);
		params.put("gover_no", gover_no);
		params.put("use_purpos", use_purpos);
		params.put("pmt_office", pmt_office);
		params.put("adm_office", adm_office);
		params.put("save_status", save_status);
		params.put("idx", idx);
		params.put("address", address);
		params.put("sido_nm", sido_nm);
		params.put("sgg_nm", sgg_nm);
		params.put("emd_nm", emd_nm);
		params.put("ri_nm", ri_nm);
		params.put("jibun", jibun);

		params.put("manageYn", "Y");
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

		Object count = mainService.selectCountQuery("goverSQL.selectGoverMasterSearchCount", params);
		int total = (int) count;

		// ArrayList<HashMap> list =
		// mainService.selectQuery("goverSQL.selectGoverList",params);
		ArrayList<HashMap> list = mainService.selectQuery("goverSQL.selectGoverMasterSearchList", params);
//		log.info("list:" + list);

		HashMap<String, Object> resultmap = new HashMap();
		resultmap.put("draw", draw);
		resultmap.put("recordsTotal", total);
		resultmap.put("recordsFiltered", total);
		resultmap.put("data", list);

		JSONObject obj = new JSONObject(resultmap);
//		log.info("obj:" + obj);
		return ResponseEntity.ok(obj.toString());
	}

	@RequestMapping(value = "/menu03_2DataTableList", method = { RequestMethod.GET, RequestMethod.POST }) // http://localhost:8080/api/get/dbTest
	public ResponseEntity<?> datatableList03_2(HttpServletRequest req, HttpServletResponse res) throws Exception {

		// 일반웹형식
		Properties requestParams = CommonUtil.convertToProperties(req);

		HashMap<String, String> returnHash = new HashMap<String, String>();
		Enumeration<String> obj1 = req.getParameterNames();
		int cnt = 0;

		while (obj1.hasMoreElements()) {
			String paramName = obj1.nextElement();
			String paramValue = req.getParameter(paramName);
			returnHash.put(paramName, paramValue);
		}

		int draw = Integer.parseInt(req.getParameter("draw"));
		int start = Integer.parseInt(req.getParameter("start"));
		int length = Integer.parseInt(req.getParameter("length"));
		String orderColumn = req.getParameter("order[0][column]");
		String orderDirection = req.getParameter("order[0][dir]");
		String orderColumnName = req.getParameter("columns[" + orderColumn + "][data]");

		String[] order_cols = req.getParameterValues("order");

		String jisa = req.getParameter("jisa");
		String gover_no = req.getParameter("gover_no");
		String use_purpos = req.getParameter("use_purpos");
		String pmt_office = req.getParameter("pmt_office");
		String adm_office = req.getParameter("adm_office");
		String pay_date_start = req.getParameter("pay_date_start");
		String pay_date_end = req.getParameter("pay_date_end");
		String address = req.getParameter("saddr");
		String idx = req.getParameter("idx");

		Map map = req.getParameterMap();

		HashMap params = new HashMap();
		params.put("draw", draw);
		params.put("start", start);
		params.put("length", length);

		params.put("jisa", jisa);
		params.put("gover_no", gover_no);
		params.put("use_purpos", use_purpos);
		params.put("pmt_office", pmt_office);
		params.put("adm_office", adm_office);
		params.put("pay_date_start", pay_date_start);
		params.put("pay_date_end", pay_date_end);
		params.put("address", address);
		params.put("idx", idx);

//			String[] right_arr= {};
//			right_arr=right_type.split(",");
//			params.put("right_type", right_arr);

		params.put("manageYn", "Y");
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

		Object count = mainService.selectCountQuery("goverSQL.selectGoverMasterSearchCount", params);
		int total = (int) count;

		// ArrayList<HashMap> list =
		// mainService.selectQuery("goverSQL.selectGoverList",params);
		ArrayList<HashMap> list = mainService.selectQuery("goverSQL.selectGoverMasterSearchList", params);
//		log.info("list:" + list);
//			Object count= mainService.selectCountQuery("goverSQL.selectTotalCount03_2", params);
//			int total=(int)count;
//
//			ArrayList<HashMap> list = mainService.selectQuery("goverSQL.selectGoverList03_2",params);
//			log.info("list:"+list);

		HashMap<String, Object> resultmap = new HashMap();
		resultmap.put("draw", draw);
		resultmap.put("recordsTotal", total);
		resultmap.put("recordsFiltered", total);
		resultmap.put("data", list);

		JSONObject obj = new JSONObject(resultmap);
//		log.info("obj:" + obj);

		return ResponseEntity.ok(obj.toString());
	}

	@RequestMapping(value = "/menu03_3DataTableList", method = { RequestMethod.GET, RequestMethod.POST }) // http://localhost:8080/api/get/dbTest
	public ResponseEntity<?> datatableList03_3(HttpServletRequest req, HttpServletResponse res) throws Exception {

		// 일반웹형식
		Properties requestParams = CommonUtil.convertToProperties(req);

		HashMap<String, String> returnHash = new HashMap<String, String>();
		Enumeration<String> obj1 = req.getParameterNames();
		int cnt = 0;

		while (obj1.hasMoreElements()) {
			String paramName = obj1.nextElement();
			String paramValue = req.getParameter(paramName);
			returnHash.put(paramName, paramValue);
		}

		int draw = Integer.parseInt(req.getParameter("draw"));
		int start = Integer.parseInt(req.getParameter("start"));
		int length = Integer.parseInt(req.getParameter("length"));
		String orderColumn = req.getParameter("order[0][column]");
		String orderDirection = req.getParameter("order[0][dir]");
		String orderColumnName = req.getParameter("columns[" + orderColumn + "][data]");

		String[] order_cols = req.getParameterValues("order");

		String jisa = req.getParameter("jisa");
		String gover_no = req.getParameter("gover_no");
		String use_purpos = req.getParameter("use_purpos");
		String pmt_office = req.getParameter("pmt_office");
		String adm_office = req.getParameter("adm_office");
		String cancel_yn = req.getParameter("cancel_yn");

		String pay_date_start = req.getParameter("pay_date_start");
		String pay_date_end = req.getParameter("pay_date_end");
		String address = req.getParameter("saddr");
		String idx = req.getParameter("idx");

		Map map = req.getParameterMap();

		HashMap params = new HashMap();
		params.put("draw", draw);
		params.put("start", start);
		params.put("length", length);

		params.put("jisa", jisa);
		params.put("gover_no", gover_no);
		params.put("use_purpos", use_purpos);
		params.put("pmt_office", pmt_office);
		params.put("adm_office", adm_office);
		// params.put("cancel_yn",cancel_yn);
		if ("N".equals(cancel_yn)) {
			params.put("cancel_yn", null); // null 조건을 추가하기 위해 cancel_yn에 null 값을 전달
			params.put("cancel_yn_condition", "'N'  OR GM.gm_cancle_yn IS NULL or GM.gm_cancle_yn = ''");
		} else {
			params.put("cancel_yn", cancel_yn);
		}
		// params.put("cancel_yn","N");
		params.put("TEST", "Y");
		params.put("pay_date_start", pay_date_start);
		params.put("pay_date_end", pay_date_end);
		params.put("address", address);
		params.put("idx", idx);

//			String[] right_arr= {};
//			right_arr=right_type.split(",");
//			params.put("right_type", right_arr);

		params.put("manageYn", "Y");
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

		Object count = mainService.selectCountQuery("goverSQL.selectGoverMasterCancelSearchCount", params);
		int total = (int) count;

		// ArrayList<HashMap> list =
		// mainService.selectQuery("goverSQL.selectGoverList",params);
		ArrayList<HashMap> list = mainService.selectQuery("goverSQL.selectGoverMasterCancelSearchList", params);
//		log.info("list:" + list);

//			Object count= mainService.selectCountQuery("goverSQL.selectTotalCount03_3", params);
//			int total=(int)count;
//
//			ArrayList<HashMap> list = mainService.selectQuery("goverSQL.selectGoverList03_3",params);
//			log.info("list:"+list);

		HashMap<String, Object> resultmap = new HashMap();
		resultmap.put("draw", draw);
		resultmap.put("recordsTotal", total);
		resultmap.put("recordsFiltered", total);
		resultmap.put("data", list);

		JSONObject obj = new JSONObject(resultmap);
//		log.info("obj:" + obj);

		return ResponseEntity.ok(obj.toString());
	}

	@GetMapping(path = "/masterReg") // http://localhost:8080/api/get/dbTest
	public ModelAndView masterReg(HttpServletRequest httpRequest, HttpServletResponse response) throws Exception {
//			response.setHeader("X-Frame-Options", "SAMEORIGIN");
//			response.setHeader("Content-Security-Policy", " frame-ancestors 'self'");

		ModelAndView mav = new ModelAndView();
		HashMap params = new HashMap();

		ArrayList<HashMap> jisaList = mainService.selectQuery("commonSQL.selectAllJisaList", params);
		ArrayList<HashMap> jimokList = mainService.selectQuery("commonSQL.selectJimokList", params);
		ArrayList<HashMap> usePurposlist = mainService.selectQuery("commonSQL.selectUsePurposList", params);

		log.info("jisaList:" + jisaList);
		log.info("jimokList:" + jimokList);

		mav.addObject("jisaList", jisaList);
		mav.addObject("jimokList", jimokList);
		mav.addObject("usePurposlist", usePurposlist);

		mav.setViewName("content/gover/masterReg");
		return mav;
	}

	// masterEdit 상세 조회
	@GetMapping(path = "/masterEdit") // http://localhost:8080/api/get/dbTest
	public ModelAndView masterEdit(HttpServletRequest httpRequest, HttpServletResponse response) throws Exception {
		ModelAndView mav = new ModelAndView();

//		log.info("점용 마스터 수정 컨트롤러 동작");
		HashMap params = new HashMap();
		ArrayList<HashMap> list = new ArrayList<HashMap>();

		String idx = httpRequest.getParameter("idx");
		String index = httpRequest.getParameter("index");

		params.put("idx", idx);
		params.put("gover_no", idx);
		params.put("GOVER_NO", idx);
		params.put("index", index);
//		log.info("params:" + params);

		ArrayList<HashMap> jisaList = mainService.selectQuery("commonSQL.selectAllJisaList", params);
		ArrayList<HashMap> data = mainService.selectQuery("goverSQL.selectAllData", params);
		ArrayList<HashMap> goverModifyList = mainService.selectQuery("goverSQL.selectModifyList", params);
		ArrayList<HashMap> goverModifyOfficeList = mainService.selectQuery("goverSQL.selectModifyOfficeList", params);
		ArrayList<HashMap> atcFileList = mainService.selectQuery("goverSQL.selectAtcFileList", params);
		ArrayList<HashMap> goverMemoList = mainService.selectQuery("goverSQL.selectMemoList", params);
		ArrayList<HashMap> jimokList = mainService.selectQuery("commonSQL.selectJimokList", params);
		// ArrayList<HashMap> goverPnuList =
		// mainService.selectQuery("goverSQL.selectPnuList",params);
		ArrayList<HashMap> usePurposlist = mainService.selectQuery("commonSQL.selectUsePurposList", params);

//			goverList = (ArrayList) Database.getInstance().queryForList("Json.selectGoverList", params); //기본정보
		ArrayList<HashMap> goverPnuList = (ArrayList) mainService.selectQuery("goverSQL.selectGoverPnuList", params); // 소속토지정보
//			pmtList = (ArrayList) Database.getInstance().queryForList("Json.selectGoverPmtList", params); //허가 정보
//			fileList = (ArrayList) Database.getInstance().queryForList("Json.selectGoverRowDetail_Files", params); //첨부파일
//			modifyList = (ArrayList) Database.getInstance().queryForList("Json.selectGoverModifyHistory", params); //첨부파일

		//241009
		List<String> coordinateVal = new ArrayList<>();
		Integer coordinateSize = 0;
		
		// goverPnuList 크기 구하기
		int goverPnuListSize = goverPnuList.size();	//PNU로 꺼내야
		
		for(int k = 0 ; k < goverPnuListSize ; k++) {
			log.info("goverPnuList:"+goverPnuList.get(k));
			HashMap sosokTogiParam = new HashMap();
			
			sosokTogiParam.put("TARGET_PNU", goverPnuList.get(k).get("pnu"));
			
			ArrayList<HashMap> jijukList = mainService.selectQuery("commonSQL.selectJijuk", sosokTogiParam);
			coordinateSize += jijukList.size();
			
			if(jijukList.size() == 0) {
				//
			} else {
				for(int z = 0 ; z < jijukList.size() ; z++) {
					HashMap jijukInfo = jijukList.get(z);
					coordinateVal.add(jijukInfo.get("x").toString()+"|"+(String)jijukInfo.get("y").toString());
				}
			}
		}

		log.info("data:" + data.get(0));
		log.info("jisaList:" + jisaList);
		log.info("goverModifyList:" + goverModifyList);
		log.info("goverModifyOfficeList:" + goverModifyOfficeList);
		log.info("atcFileList:" + atcFileList);
		log.info("goverMemoList:" + goverMemoList);
		log.info("jimokList:" + jimokList);
		log.info("goverPnuList:" + goverPnuList);
		log.info("goverPnuListSize:" + goverPnuListSize);
		log.info("usePurposlist:" + usePurposlist);

		mav.addObject("resultData", data.get(0));
		mav.addObject("jisaList", jisaList);
		mav.addObject("goverModifyList", goverModifyList);
		mav.addObject("goverModifyOfficeList", goverModifyOfficeList);
		mav.addObject("atcFileList", atcFileList);
		mav.addObject("memoList", goverMemoList);
		mav.addObject("jimokList", jimokList);
		mav.addObject("pnuList", goverPnuList);
		mav.addObject("pnuListSize", goverPnuListSize);
		mav.addObject("usePurposlist", usePurposlist);
		
		mav.addObject("jijukCoordList", coordinateVal);
		mav.addObject("jijukCoordSize", coordinateSize);

		mav.setViewName("content/gover/masterEdit");
		return mav;
	}

	// feeDetail 상세 조회
	@GetMapping(path = "/feeDetail") // http://localhost:8080/api/get/dbTest
	public ModelAndView feeDetail(HttpServletRequest httpRequest, HttpServletResponse response) throws Exception {
		log.info("feeDetail 컨트롤러 동작");

		ModelAndView mav = new ModelAndView();

		String idx = httpRequest.getParameter("idx");
		String index = httpRequest.getParameter("index");

		HashMap<String, String> params = new HashMap<>();
		params.put("idx", idx);
		params.put("gover_no", idx);

		params.put("GOVER_NO", idx);
		params.put("GOVERNO", idx);
		params.put("index", index);
		log.info("params:" + params);

		// 데이터 조회
		// ArrayList<HashMap> data =
		// mainService.selectQuery("goverSQL.selectAllData",params);

		ArrayList<HashMap> goverModifyList = mainService.selectQuery("goverSQL.selectModifyList", params);
		ArrayList<HashMap> goverModifyOfficeList = mainService.selectQuery("goverSQL.selectModifyOfficeList", params);
		ArrayList<HashMap> atcFileList = mainService.selectQuery("goverSQL.selectAtcFileList", params);
		ArrayList<HashMap> goverPnuList = (ArrayList) mainService.selectQuery("goverSQL.selectGoverPnuList", params); // 소속토지정보
		// ArrayList<HashMap> goverPnuList =
		// mainService.selectQuery("goverSQL.selectPnuList",params);
		ArrayList<HashMap> goverPermitList = mainService.selectQuery("goverSQL.selectPermitList", params);
		ArrayList<HashMap> repFlagPnu = mainService.selectQuery("goverSQL.selectRepFlagPnu", params);

		ArrayList<HashMap> goverList = mainService.selectQuery("goverSQL.selectGoverDetailList", params); // 기본정보
//			goverList = (ArrayList) Database.getInstance().queryForList("Json.selectGoverList", params); //기본정보 //이건 테이블 리스트에서 활용
//			pnuList = (ArrayList) Database.getInstance().queryForList("Json.selectGoverPnuList", params); //소속토지정보
////			pmtList = (ArrayList)Database.getInstance().queryForList("Json.selectGoverPmtList", params); //허가 정보
//			pmtList = (ArrayList) Database.getInstance().queryForList("Json.selectGoverPmtLast", params); //마지막 허가 정보
//			fileList = (ArrayList) Database.getInstance().queryForList("Json.selectGoverRowDetail_Files", params); //첨부파일
//			modifyList = (ArrayList) Database.getInstance().queryForList("Json.selectGoverModifyHistory", params); //첨부파일
//
		ArrayList<HashMap> payList = (ArrayList) mainService.selectQuery("goverSQL.selectGoverPayList", params); // 납부실적목록

		// 조회 데이터 로그
		/*
		 * log.info("data:"+goverList.get(0));
		 * log.info("goverModifyList:"+goverModifyList);
		 * log.info("goverModifyOfficeList:"+goverModifyOfficeList);
		 * log.info("atcFileList:"+atcFileList); log.info("goverPnuList:"+goverPnuList);
		 * log.info("goverPermitList:"+goverPermitList);
		 * log.info("repFlagPnu:"+repFlagPnu);
		 */
		// 각 리스트가 null 또는 비어있는 경우 처리
		if (goverList == null || goverList.isEmpty()) {
			log.error("No data found for idx: " + idx);
			mav.addObject("resultData", new HashMap<>());
		} else {
			mav.addObject("resultData", goverList.get(0));
		}

		mav.addObject("repFlagPnu", repFlagPnu); // 점용 대표필지 정보

		// 각 리스트가 null 또는 비어있는 경우 처리
		if (goverModifyList == null || goverModifyList.isEmpty()) {
			mav.addObject("goverModifyList", new ArrayList<>());
		} else {
			mav.addObject("goverModifyList", goverModifyList);
		}

		// 각 리스트가 null 또는 비어있는 경우 처리
		if (goverModifyOfficeList == null || goverModifyOfficeList.isEmpty()) {
			mav.addObject("goverModifyOfficeList", new ArrayList<>());
		} else {
			mav.addObject("goverModifyOfficeList", goverModifyOfficeList);
		}

		if (atcFileList == null || atcFileList.isEmpty()) {
			mav.addObject("atcFileList", new ArrayList<>());
		} else {
			mav.addObject("atcFileList", atcFileList);
		}

		if (goverPnuList == null || goverPnuList.isEmpty()) {
			mav.addObject("goverPnuList", new HashMap<>());
		} else {
			mav.addObject("goverPnuList", goverPnuList);
		}

		if (goverPermitList == null || goverPermitList.isEmpty()) {
			mav.addObject("goverPermitListAll", new ArrayList<>());
		} else {
			mav.addObject("goverPermitListAll", goverPermitList);
		}

		mav.setViewName("content/gover/feeDetail");
		return mav;
	}

	// useDetail 상세 조회
	@GetMapping(path = "/useDetail") // http://localhost:8080/api/get/dbTest
	public ModelAndView useDetail(HttpServletRequest httpRequest, HttpServletResponse response) throws Exception {
		log.info("useDetail 컨트롤러 동작");

		ModelAndView mav = new ModelAndView();

		HashMap params = new HashMap();

		String idx = httpRequest.getParameter("idx");
		String index = httpRequest.getParameter("index");

		params.put("idx", idx);
		params.put("gover_no", idx);
		params.put("GOVERNO", idx);
		params.put("index", index);

		log.info("params:" + params);

		ArrayList<HashMap> data = mainService.selectQuery("goverSQL.selectAllData", params);
		ArrayList<HashMap> goverModifyList = mainService.selectQuery("goverSQL.selectModifyList", params);
		ArrayList<HashMap> goverModifyOfficeList = mainService.selectQuery("goverSQL.selectModifyOfficeList", params);
		ArrayList<HashMap> atcFileList = mainService.selectQuery("goverSQL.selectAtcFileList", params);
		ArrayList<HashMap> goverPnuList = mainService.selectQuery("goverSQL.selectPnuList", params);
		ArrayList<HashMap> goverPermitList = mainService.selectQuery("goverSQL.selectPermitList", params);

		mav.addObject("resultData", data.get(0));
		mav.addObject("goverModifyList", goverModifyList);
		mav.addObject("goverModifyOfficeList", goverModifyOfficeList);
		mav.addObject("atcFileList", atcFileList);
		mav.addObject("goverPnuList", goverPnuList);
		mav.addObject("goverPermitList", goverPermitList);

		mav.setViewName("content/gover/useDetail");
		return mav;
	}

	// occupancyEndReg 상세 조회
	@GetMapping(path = "/occupancyEndReg") // http://localhost:8080/api/get/dbTest
	public ModelAndView occupancyEndReg(HttpServletRequest httpRequest, HttpServletResponse response) throws Exception {
		ModelAndView mav = new ModelAndView();

		log.info("occupancyEndReg 컨트롤러 동작");

		String idx = httpRequest.getParameter("idx");
		String index = httpRequest.getParameter("index");

		HashMap params = new HashMap();
		params.put("idx", idx);
		params.put("gover_no", idx);
		params.put("index", index);
		log.info("params:" + params);

		ArrayList<HashMap> data = mainService.selectQuery("goverSQL.selectAllData", params);
		ArrayList<HashMap> goverModifyList = mainService.selectQuery("goverSQL.selectModifyList", params);
		ArrayList<HashMap> atcFileList = mainService.selectQuery("goverSQL.selectAtcFileList", params);
		ArrayList<HashMap> goverPnuList = mainService.selectQuery("goverSQL.selectPnuList", params);
		ArrayList<HashMap> goverPermitList = mainService.selectQuery("goverSQL.selectPermitList", params);

		log.info("data:" + data.get(0));

		mav.addObject("resultData", data.get(0));
		mav.addObject("goverModifyList", goverModifyList);
		mav.addObject("atcFileList", atcFileList);
		mav.addObject("goverPnuList", goverPnuList);
		mav.addObject("goverPermitList", goverPermitList);

		mav.setViewName("content/gover/occupancyEndReg");
		return mav;
	}

	@GetMapping(path = "/orgAdmin") // http://localhost:8080/api/get/dbTest
	public ModelAndView orgAdmin(HttpServletRequest httpRequest, HttpServletResponse response) throws Exception {
//			response.setHeader("X-Frame-Options", "SAMEORIGIN");
////			response.setHeader("Content-Security-Policy", " frame-ancestors 'self'");
//			String requestParams = ParameterUtil.getRequestBodyToStr(httpRequest);
//			JSONObject requestParamsObj=new JSONObject(requestParams);
//			log.info("requestParams:"+requestParams);
//			
		ArrayList list = new ArrayList();
		ArrayList addlist = new ArrayList();
		ArrayList<HashMap> jisalist = new ArrayList();
		ParameterParser parser = new ParameterParser(httpRequest);

		String str_result = "Y";
		ArrayList returnList = new ArrayList();
		try {

			HashMap params = new HashMap();

//				String JISA = requestParamsObj.getString("JISA");
			params.put("JISA", "");
			// int count=(int)mainService.selectCountQuery("goverSQL.selectOfficeJisaCount",
			// params);
			// list = (ArrayList) mainService.selectQuery("goverSQL.selectOfficeInfoAll",
			// params);
			jisalist = mainService.selectQuery("commonSQL.selectAllJisaList", params);

		} catch (Exception e) {
			str_result = "N";
			e.printStackTrace();
		}

		HashMap map = new HashMap();

		ModelAndView mav = new ModelAndView();
		mav.addObject("list", list);
		mav.addObject("jisaList", jisalist);
		log.info("jisalist:" + jisalist);
		mav.setViewName("content/gover/orgAdmin");
		return mav;
	}

	@RequestMapping(value = "/orgAdminDataTableList", method = { RequestMethod.GET, RequestMethod.POST }) // http://localhost:8080/api/get/dbTest
	public ResponseEntity<?> orgAdminDataTableList(HttpServletRequest req, HttpServletResponse res) throws Exception {
		String jisa = req.getParameter("jisa");
		String pmt_office = req.getParameter("pmt_office");
		String adm_office = req.getParameter("adm_office");

		HashMap params = new HashMap();
		params.put("JISA", jisa);
		params.put("PMT_OFFICE", pmt_office);
		params.put("ADM_OFFICE", adm_office);

		log.info("params:" + params);
		ArrayList list = new ArrayList();
		try {
			list = (ArrayList) mainService.selectQuery("goverSQL.selectOfficeInfoAll", params);
		} catch (Exception e) {
			e.printStackTrace();
		}

		// 결과를 JSON으로 반환
		HashMap<String, Object> resultMap = new HashMap<>();
		resultMap.put("data", list);
		JSONObject obj = new JSONObject(resultMap);
//		log.info("obj:" + obj);
		return ResponseEntity.ok(obj.toString());
	}

	@GetMapping(path = "/orgAdminPopupAccept") // http://localhost:8080/api/get/dbTest
	public ModelAndView orgAdminPopupAccept(HttpServletRequest httpRequest, HttpServletResponse response)
			throws Exception {
//			response.setHeader("X-Frame-Options", "SAMEORIGIN");
//			response.setHeader("Content-Security-Policy", " frame-ancestors 'self'");
		ModelAndView mav = new ModelAndView();
		mav.setViewName("content/gover/orgAdminPopupAccept");
		return mav;
	}

	@GetMapping(path = "/orgAdminPopupMod") // http://localhost:8080/api/get/dbTest
	public ModelAndView orgAdminPopupMod(HttpServletRequest httpRequest, HttpServletResponse response)
			throws Exception {
		HashMap params = new HashMap();
		ArrayList<HashMap> jisalist = mainService.selectQuery("commonSQL.selectAllJisaList", params);

		// response.setHeader("X-Frame-Options", "SAMEORIGIN");
//			response.setHeader("Content-Security-Policy", " frame-ancestors 'self'");
		ModelAndView mav = new ModelAndView();
		mav.addObject("jisaList", jisalist);

		mav.setViewName("content/gover/orgAdminPopupMod");
		return mav;
	}

	@GetMapping(path = "/orgAdminPopupReg") // http://localhost:8080/api/get/dbTest
	public ModelAndView orgAdminPopupReg(HttpServletRequest httpRequest, HttpServletResponse response)
			throws Exception {
		HashMap params = new HashMap();
		ArrayList<HashMap> jisalist = mainService.selectQuery("commonSQL.selectAllJisaList", params);

//			response.setHeader("X-Frame-Options", "SAMEORIGIN");
//			response.setHeader("Content-Security-Policy", " frame-ancestors 'self'");
		ModelAndView mav = new ModelAndView();
		mav.addObject("jisaList", jisalist);

		mav.setViewName("content/gover/orgAdminPopupReg");
		return mav;
	}

	@GetMapping(path = "/orgAdminPopupRegCancel") // http://localhost:8080/api/get/dbTest
	public ModelAndView orgAdminPopupRegCancel(HttpServletRequest httpRequest, HttpServletResponse response)
			throws Exception {
//			response.setHeader("X-Frame-Options", "SAMEORIGIN");
//			response.setHeader("Content-Security-Policy", " frame-ancestors 'self'");
		ModelAndView mav = new ModelAndView();
		mav.setViewName("content/gover/orgAdminPopupRegCancel");
		return mav;
	}

	@GetMapping(path = "/orgSysCode") // http://localhost:8080/api/get/dbTest
	public ModelAndView orgSysCode(HttpServletRequest httpRequest, HttpServletResponse response) throws Exception {

		ArrayList list = new ArrayList();
		ArrayList addlist = new ArrayList();
		ArrayList<HashMap> codelist = new ArrayList();
		ParameterParser parser = new ParameterParser(httpRequest);

		String str_result = "Y";
		ArrayList returnList = new ArrayList();

		try {
			HashMap params = new HashMap();
			params.put("JISA", "");
			// 코드 그룹만 조회<?>
			list = (ArrayList) mainService.selectQuery("goverSQL.selectSysGroupCodeList", params);
			// 전체 코드리스트 조회
			codelist = (ArrayList) mainService.selectQuery("goverSQL.selectSysCodeList", params);
		} catch (Exception e) {
			str_result = "N";
			e.printStackTrace();
		}

		HashMap map = new HashMap();

		ModelAndView mav = new ModelAndView();
		mav.addObject("list", codelist);
		mav.addObject("codegroupList", list);
		mav.setViewName("content/gover/orgSysCode");

		return mav;
	}

	// 소속 토지 정보를 제공하는 API
	@GetMapping("/getGoverPnuList")
	public ResponseEntity<?> getGoverPnuList(HttpServletRequest request, HttpServletResponse response)
			throws Exception {
		// 요청된 idx에 맞는 소속 토지 정보를 조회
		String idx = request.getParameter("idx");

		log.info("-----------getGoverPnuList 동작-------------");
		if (idx == null || idx.isEmpty()) {
			return ResponseEntity.badRequest().body("idx 없음");
		}

		HashMap<String, Object> params = new HashMap<>();
		params.put("idx", idx);

		// 소속 토지 정보 조회 (SQL 매퍼 또는 서비스 호출)
		ArrayList<HashMap> goverPnuList = mainService.selectQuery("goverSQL.selectPnuList", params);

		log.info("goverPnuList: " + goverPnuList);
		// 조회 결과가 없을 경우 빈 리스트 반환
		if (goverPnuList == null || goverPnuList.isEmpty()) {
			return ResponseEntity.noContent().build();
		}

		// 결과를 JSON으로 반환
		HashMap<String, Object> resultMap = new HashMap<>();
		resultMap.put("data", goverPnuList);

		// 성공적으로 조회된 데이터를 JSON으로 반환
		JSONObject jsonResponse = new JSONObject(resultMap);
		return ResponseEntity.ok(jsonResponse.toString());
	}

	@RequestMapping(value = "/fileUpload/post") // ajax에서 호출하는 부분
	@ResponseBody
	public HashMap upload(MultipartHttpServletRequest multipartRequest) { // Multipart로 받는다.

		Iterator<String> itr = multipartRequest.getFileNames();

		String filePath = GC.getGoverFileTempDir(); // 설정파일로 뺀다.
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

//	            System.out.println(obj);

			// log.info("jo:"+jo);
//	          			response.setCharacterEncoding("UTF-8");
//	          			response.setHeader("Access-Control-Allow-Origin", "*");
//	          			response.setHeader("Cache-Control", "no-cache");
//	          			response.resetBuffer();
//	          			response.setContentType("application/json");
//	          			//response.getOutputStream().write(jo);
//	          			response.getWriter().print(obj);
//	          			response.getWriter().flush();

		}
		resultmap.put("resultCode", resultCode);
		resultmap.put("resultData", resultdata);
		resultmap.put("resultMessage", resultMessage);
		JSONObject obj = new JSONObject(resultmap);

		return resultmap;
	}

	@PostMapping(path = "/selectGoverList") // http://localhost:8080/api/get/dbTest
	public void selectGoverList(HttpServletRequest httpRequest, HttpServletResponse response) throws Exception {
		String requestParams = ParameterUtil.getRequestBodyToStr(httpRequest);
		JSONObject requestParamsObj = new JSONObject(requestParams);
		log.info("requestParams:" + requestParams);
		String goverNo = requestParamsObj.getString("GOVERNO");
		log.info("goverNo:" + goverNo);

		HashMap params = new HashMap();
		params.put("gover_no", goverNo);
		// parser.getString("goverNo", "");
		ArrayList<HashMap<String, Object>> goverList = new ArrayList<HashMap<String, Object>>();
		goverList = (ArrayList) mainService.selectQuery("goverSQL.selectGoverList", params); // 기본정보

		HashMap jo = new HashMap();
		jo.put("data", goverList);

		JSONObject obj = new JSONObject(jo);
		// log.info("jo:"+jo);
		response.setCharacterEncoding("UTF-8");
		response.setHeader("Access-Control-Allow-Origin", "*");
		response.setHeader("Cache-Control", "no-cache");
		response.resetBuffer();
		response.setContentType("application/json");
		// response.getOutputStream().write(jo);
		response.getWriter().print(obj);
		response.getWriter().flush();
	}

	@PostMapping(path = "/selectGoverPnuList") // http://localhost:8080/api/get/dbTest
	public void selectGoverPnuList(HttpServletRequest httpRequest, HttpServletResponse response) throws Exception {
		String requestParams = ParameterUtil.getRequestBodyToStr(httpRequest);
		JSONObject requestParamsObj = new JSONObject(requestParams);
		log.info("requestParams:" + requestParams);
		String goverNo = requestParamsObj.getString("GOVERNO");
		log.info("goverNo:" + goverNo);

		HashMap params = new HashMap();
		params.put("gover_no", goverNo);
		// parser.getString("goverNo", "");
		ArrayList<HashMap<String, Object>> goverList = new ArrayList<HashMap<String, Object>>();
		goverList = (ArrayList) mainService.selectQuery("goverSQL.selectGoverPnuList", params); // 기본정보

		HashMap jo = new HashMap();
		jo.put("data", goverList);

		JSONObject obj = new JSONObject(jo);
		// log.info("jo:"+jo);
		response.setCharacterEncoding("UTF-8");
		response.setHeader("Access-Control-Allow-Origin", "*");
		response.setHeader("Cache-Control", "no-cache");
		response.resetBuffer();
		response.setContentType("application/json");
		// response.getOutputStream().write(jo);
		response.getWriter().print(obj);
		response.getWriter().flush();

	}

	// 점용료 납부 / 전자결제 상신시
	@Transactional
	@PostMapping(path = "/insertGoverPaySangsin")
	public void insertGoverPaySangsin(HttpServletRequest request, HttpServletResponse response) throws Exception {
		String requestParams = ParameterUtil.getRequestBodyToStr(request);

		JSONObject requestParamsObj = new JSONObject(requestParams);
		log.info("requestParams:" + requestParams);
		ArrayList list = new ArrayList();

		// String PAGETYPE = requestParamsObj.getString("PAGETYPE"); // 수정화면에서 상신을 눌렀는지
		String PAGETYPE = "update"; // 수정화면에서 상신을 눌렀는지
		String GOVER_NO = requestParamsObj.getString("GOVER_NO"); // 관리번호
		String JISA = requestParamsObj.getString("JISA");
		String PMT_OFFICE = requestParamsObj.getString("PMT_OFFICE");
		String ADM_OFFICE = requestParamsObj.getString("ADM_OFFICE");
		String OFFICE_DEPART = requestParamsObj.getString("OFFICE_DEPART");
		String OFFICE_CHARGE = requestParamsObj.getString("OFFICE_CHARGE");
		String OFFICE_CONTACT = requestParamsObj.getString("OFFICE_CONTACT");
		String OFFICE_MOBILE = requestParamsObj.getString("OFFICE_MOBILE");
		String PMT_NO = requestParamsObj.getString("PMT_NO");
		String PAY_DATE = requestParamsObj.getString("PAY_DATE");
		String PAY_MONEY = requestParamsObj.getString("PAY_MONEY");
		String PAY_VAT = requestParamsObj.getString("PAY_VAT");
		String PMT_ST_DATE = requestParamsObj.getString("PMT_ST_DATE");
		String PMT_ED_DATE = requestParamsObj.getString("PMT_ED_DATE");
		String PAY_WAY = requestParamsObj.getString("PAY_WAY");
		String USE_PURPOS = requestParamsObj.getString("USE_PURPOS") == null ? ""
				: requestParamsObj.getString("USE_PURPOS");
		String PMT_GOVER_LENGTH = requestParamsObj.getString("PMT_GOVER_LENGTH");
		String PMT_GOVER_AREA = requestParamsObj.getString("PMT_GOVER_AREA");
		// JSONArray pnuLists=new JSONArray(requestParamsObj.get("pnuCnt"));
		String PNU_CNT = String.valueOf(requestParamsObj.get("pnuCnt")); // 소속토지 수

		String USER_ID = String.valueOf(request.getSession().getAttribute("userId"));
		String USER_NAME = String.valueOf(request.getSession().getAttribute("userName"));
     
		String str_GUBUN = "";
		String str_GOVERNO = GOVER_NO;
		String file_list=String.valueOf(requestParamsObj.get("fileList")); // 소속토지 수
log.info("file_list:"+file_list);
		String str_result = "Y";
//			
		// 확인
//			String GOVER_NO = parser.getString("GOVER_NO", ""); // 관리번호
//			String JISA = parser.getString("JISA", "");
//			String PMT_OFFICE = parser.getString("PMT_OFFICE", "");
//			String ADM_OFFICE = parser.getString("ADM_OFFICE", "");
//			String OFFICE_DEPART = parser.getString("OFFICE_DEPART", "");
//			String OFFICE_CHARGE = parser.getString("OFFICE_CHARGE", "");
//			String OFFICE_CONTACT = parser.getString("OFFICE_CONTACT", "");
//			String OFFICE_MOBILE = parser.getString("OFFICE_MOBILE", "");
//			String PMT_NO = parser.getString("PMT_NO", "");
//			String PAY_DATE = parser.getString("PAY_DATE", "");
//			String PAY_MONEY = parser.getString("PAY_MONEY", "");
//			String PAY_VAT = parser.getString("PAY_VAT", "");
//			String PMT_ST_DATE = parser.getString("PMT_ST_DATE", "");
//			String PMT_ED_DATE = parser.getString("PMT_ED_DATE", "");
//			String PAY_WAY = parser.getString("PAY_WAY", "");
//			String USE_PURPOS = parser.getString("USE_PURPOS", "");
//			String PMT_GOVER_LENGTH = parser.getString("PMT_GOVER_LENGTH", "");
//			String PMT_GOVER_AREA = parser.getString("PMT_GOVER_AREA", "");
//			String PNU_CNT = parser.getString("pnuCnt", "0"); // 소속토지 수
//			
//			String USER_ID = String.valueOf(request.getSession().getAttribute("userId"));
//			String USER_NAME = String.valueOf(request.getSession().getAttribute("userName"));
//			
//			String str_GUBUN = "";
//			String str_GOVERNO = GOVER_NO;
//			
//			String str_result = "Y";
//			

		HashMap map = new HashMap();

		try {
			HashMap params = new HashMap();
			params.put("GOVER_NO", GOVER_NO);
			params.put("JISA", JISA);
			params.put("PMT_OFFICE", PMT_OFFICE);
			params.put("ADM_OFFICE", ADM_OFFICE);
			params.put("OFFICE_DEPART", OFFICE_DEPART);
			params.put("OFFICE_CHARGE", OFFICE_CHARGE);
			params.put("OFFICE_CONTACT", OFFICE_CONTACT);
			params.put("OFFICE_MOBILE", OFFICE_MOBILE);
			params.put("PMT_NO", PMT_NO == null ? "" : PMT_NO);
			params.put("PAY_DATE", PAY_DATE == null ? "" : PAY_DATE);
			params.put("PAY_MONEY", PAY_MONEY);
			params.put("PAY_VAT", PAY_VAT);
			params.put("PMT_ST_DATE", PMT_ST_DATE == null ? "" : PMT_ST_DATE);
			params.put("PMT_ED_DATE", PMT_ED_DATE == null ? "" : PMT_ED_DATE);
			params.put("PAY_WAY", PAY_WAY);
			params.put("PMT_NAME", (USE_PURPOS == null) ? "" : USE_PURPOS);
			params.put("PMT_GOVER_LENGTH", (PMT_GOVER_LENGTH == null) ? null : PMT_GOVER_LENGTH);
			params.put("PMT_GOVER_AREA", PMT_GOVER_AREA == null ? null : PMT_GOVER_AREA);

			params.put("USER_ID", USER_ID);
			params.put("USER_NAME", USER_NAME);

			/**********************
			 * 다음 지상권 번호 조회 시작
			 **********************/
			int nNextSeq = 0;
//				nNextSeq = (Integer) Database.getInstance().queryForObject("Json.selectNextGoverNo", params);
			nNextSeq = (Integer) mainService.selectCountQuery("goverSQL.selectNextGoverNo", params);
			params.put("NEXTSEQ", nNextSeq);

			System.out.println("납부정보 params = " + params);
			mainService.InsertQuery("goverSQL.insertGoverPmt", params);
//				Database.getInstance().insert("Json.insertGoverPmt", params); // 납부정보 신규등록
			// 납부관련 전자결재 상신 시점의 소속 토지정보를 로그테이블에 저장한다. >> 해당 내용은 납부실적 토지목록 보기
			// 목록에서 확인할 수 있다.
			// 소속 토지정보 검색
			ArrayList pnuList = mainService.selectQuery("goverSQL.selectGoverPnuList", params);
			if (!pnuList.isEmpty()) {
				HashMap logParams = new HashMap(); // 맵 객체 선언

				for (int i = 0; i < pnuList.size(); i++) {

//					log.info("obj:" + pnuList.get(i));
					logParams = new HashMap(); // 맵 객체 초기화

					logParams.put("GOVER_NO", ((HashMap) pnuList.get(i)).get("gover_no"));
					logParams.put("PMT_SEQ", nNextSeq);

					// 소속 토지정보 로깅용 seq 조회(생성)
					// String logSeq = (String)
					// Database.getInstance().queryForObject("Json.selectGoverPnuLogSeq",
					// logParams);
					ArrayList logSeqList = (ArrayList) mainService.selectQuery("goverSQL.selectGoverPnuLogSeq",
							logParams);
					log.info("logSeqList:" + logSeqList.get(0));

//						String logSeq = (ArrayList) mainService.selectQuery("Json.selectGoverPnuLogSeq", logParams);
//						logLisg.info
					String logSeq = logSeqList.get(0).toString();
					System.out.println("logSeq = " + logSeq);
					logParams.put("LOG_SEQ", logSeq);
					logParams.put("PNU", ((HashMap) pnuList.get(i)).get("pnu"));
					logParams.put("ADDRCODE", ((HashMap) pnuList.get(i)).get("addrcode"));
					logParams.put("ECHO_NO", ((HashMap) pnuList.get(i)).get("echo_no"));
					logParams.put("SIDO_NM", ((HashMap) pnuList.get(i)).get("sido_nm"));
					logParams.put("SGG_NM", ((HashMap) pnuList.get(i)).get("sgg_nm"));
					logParams.put("EMD_NM", ((HashMap) pnuList.get(i)).get("emd_nm"));
					logParams.put("RI_NM", ((HashMap) pnuList.get(i)).get("ri_nm"));
					logParams.put("JIBUN", ((HashMap) pnuList.get(i)).get("jibun"));
					logParams.put("JIBUN_FULL", ((HashMap) pnuList.get(i)).get("jibun_full"));
					logParams.put("JIJUK_AREA", ((HashMap) pnuList.get(i)).get("jijuk_area"));
					logParams.put("JIMOK_TEXT", ((HashMap) pnuList.get(i)).get("jimok_text"));
					logParams.put("DOSIPLAN", ((HashMap) pnuList.get(i)).get("dosiplan"));
					logParams.put("GOVER_OWN_YN", ((HashMap) pnuList.get(i)).get("gover_own_yn"));
					logParams.put("GOVER_LENGTH", ((HashMap) pnuList.get(i)).get("gover_length"));
					logParams.put("GOVER_AREA", ((HashMap) pnuList.get(i)).get("gover_area"));
					logParams.put("ADM_OFFICE", ((HashMap) pnuList.get(i)).get("adm_office"));
					logParams.put("USE_PURPOS", ((HashMap) pnuList.get(i)).get("use_purpos"));
//
//						// 소속 토지정보 저장처리
					System.out.println("소속 토지정보 params = " + logParams);
//						Database.getInstance().insert("Json.insertGoverPnuLog", logParams);
					mainService.InsertQuery("goverSQL.insertGoverPnuLog", logParams);
				}
			}

			if ("update".equals(PAGETYPE)) {
				ApprovalHtmlUtil eph = new ApprovalHtmlUtil();
				ApprovalUtil epc = new ApprovalUtil();

				CommonUtil cu = new CommonUtil();

				String str_appNo = cu.getNextAppovalSeq();
				boolean res_Echo = false;

				if ("".equals(str_appNo)) {
					map.put("message", "N");
				} else {
					String str_UserId = String.valueOf(request.getSession().getAttribute("userId"));
					String str_userName = String.valueOf(request.getSession().getAttribute("userName"));
					String str_userDeptcd = String.valueOf(request.getSession().getAttribute("userDeptcd"));
					String str_userDeptnm = String.valueOf(request.getSession().getAttribute("userDeptnm"));
					String str_userUPDeptcd = String.valueOf(request.getSession().getAttribute("userUPDeptcd"));
					log.info("str_UserId:" + str_UserId);
					log.info("str_userName:" + str_userName);
					log.info("str_userDeptcd:" + str_userDeptcd);
					log.info("str_userDeptnm:" + str_userDeptnm);
					log.info("str_userUPDeptcd:" + str_userUPDeptcd);

//						String str_UserId = "105681";
//						String str_userName = "박영환";
//						String str_userDeptcd = "D250500";
//						String str_userDeptnm = "IT전략.지원팀";
//						String str_userUPDeptcd = "S250100";
					log.info("str_GOVERNO:" + str_GOVERNO);

					log.info("session:" + request.getSession().toString());

					res_Echo = epc.GetPLMSDataforXML(str_appNo,
							eph.getGover_pay_HTML("", str_GOVERNO, "", "", "",file_list, request, response), str_UserId, "", "",
							"GetHoldUsageDataforXML", str_userName, str_userDeptcd, str_userDeptnm, str_userUPDeptcd);
				}
				if (res_Echo) {

					// 문서번호 업데이트
					map.put("DOCKEY", str_appNo);
					map.put("message", "Y");
					map.put("GOVER_NO", str_GOVERNO);
					map.put("SEQ", nNextSeq);
//						Database.getInstance().update("Json.updateGoverEchoNo", map);
					mainService.InsertQuery("goverSQL.updateGoverEchoNo", map);

					System.out.println("%%%%%%%%%%%%map=" + map);
					// 문서 URL조회
					// ArrayList echolist = (ArrayList)
					// Database.getInstance().queryForList("Json.selectGoverDocInfo", map);
					ArrayList echolist = (ArrayList) mainService.selectQuery("goverSQL.selectGoverDocInfo", map);
					if (null != echolist && echolist.size() > 0) {
						String str_EchoNo = String.valueOf(((HashMap) echolist.get(0)).get("pa_out_url"));
						System.out.println("str_EchoNo=====" + str_EchoNo);
						map.put("OUT_URL", str_EchoNo);
					}

				} else {
					map.put("message", "N");
				}
			}

			if (list != null)
				map.put("count", list.size());
			else
				map.put("count", 0);
		} catch (Exception e) {
			str_result = "N";
			e.printStackTrace();
		}

		// 상신처리

		map.put("message", str_result);
		map.put("GOVERNO", str_GOVERNO);
		map.put("result", list);

		HashMap jo = new HashMap();
		jo.put("data", "");

		JSONObject obj = new JSONObject(map);
		// log.info("jo:"+jo);
		response.setCharacterEncoding("UTF-8");
		response.setHeader("Access-Control-Allow-Origin", "*");
		response.setHeader("Cache-Control", "no-cache");
		response.resetBuffer();
		response.setContentType("application/json");
		// response.getOutputStream().write(jo);
		response.getWriter().print(obj);
		response.getWriter().flush();
	}

	// 점용 해지 등록
	@Transactional
	@PostMapping(path = "/insertGoverTerminationAdd")
	public void insertGoverTerminationAdd(HttpServletRequest request, HttpServletResponse response) throws Exception {
		String requestParams = ParameterUtil.getRequestBodyToStr(request);

		JSONObject requestParamsObj = new JSONObject(requestParams);
		log.info("requestParams:" + requestParams);
		ParameterParser parser = new ParameterParser(request);
//			String cancleDate = parser.getString("cancleDate", "");
//			String userName = parser.getString("userName", "");
//			String goverNo = parser.getString("goverNo", "");
		String empCd = String.valueOf(request.getSession().getAttribute("userId"));
		String cancleDate = requestParamsObj.getString("cancleDate");
		String userName = requestParamsObj.getString("userName");
		String goverNo = requestParamsObj.getString("goverNo");

		String str_result = "Y";
		try {

			HashMap params = new HashMap();
			params.put("GOVERNO", goverNo);
			params.put("GOVER_NO", goverNo);
			params.put("USERNAME", userName);
			params.put("CANCLEDATE", cancleDate);
			params.put("EMPCD", empCd);

			/** 소속된 토지 조회 **/
			ArrayList list = (ArrayList) mainService.selectQuery("goverSQL.selectGoverPnuList", params); // 결과대문자로 넘어옴
			if (list.size() > 0) {
				for (int i = 0; i < list.size(); i++) {

					String strPNU = "";
					strPNU = (String) ((HashMap) list.get(i)).get("PNU");
					params.put("STR_PNU", strPNU);

					log.info("insertGoverTerminationAdd >>>>> 점용해제 PNU = " + strPNU);
					/** JIJUK_MASTER 테이블 지상권 해제 **/
					mainService.UpdateQuery("goverSQL.updateJijukMasterStatus_Gover", params);

					// 해지후 미설정,미점용으로 등록
					HashMap dataMap = new HashMap();
					dataMap = (HashMap) list.get(i);

					System.out.println("dataMap :: " + dataMap.toString());

					ArrayList NotsetList = (ArrayList) mainService.selectQuery("goverSQL.selectNotsetNextNo", null);
					int no = Integer
							.parseInt((((HashMap) NotsetList.get(0)).get("now_notsetno").toString()).toString());
					String Next_notsetNo = String.valueOf(no + 1);
					int n_Next_notsetNo = Next_notsetNo.length();

					String add_Zero = "";
					for (int j = 0; j < (6 - n_Next_notsetNo); j++) {
						add_Zero += "0";
					}
					Next_notsetNo = "N_" + add_Zero + Next_notsetNo;

					dataMap.put("notset_no", Next_notsetNo);
					mainService.InsertQuery("songyuSQL.insertNotsetMaster", dataMap);
					dataMap.put("STATUS", "NOTSET");
					dataMap.put("JISANGNO", Next_notsetNo);
					mainService.UpdateQuery("songyuSQL.updateTogiJisang_Status", dataMap);
				}
			}

			/** JISANG_MASTER 테이블 지상권 해제 **/
			mainService.UpdateQuery("goverSQL.insertGoverTerminationAdd", params);

			params.put("GUBUN", "해지");
			params.put("CONT", "점용 해지 [등록자:" + userName + ", 해지일자:" + cancleDate + "]");
			mainService.InsertQuery("goverSQL.insertGoverModifyHistory", params);

		} catch (Exception e) {
			str_result = "N";
			e.printStackTrace();
		}
		HashMap map = new HashMap();

		map.put("message", str_result);

		JSONObject jo = new JSONObject(map);

		response.setCharacterEncoding("UTF-8");
		response.setHeader("Access-Control-Allow-Origin", "*");
		response.resetBuffer();
		response.setContentType("application/json");
		response.getWriter().print(jo);
		response.getWriter().flush();
	}

	// 점용 마스터 등록 수정 실제 상신완료 된 걸로 등록
	// 초초초이
	@Transactional
	@PostMapping(path = "/insertGoverMasterDemo")
	public void insertGoverMasterDemo(HttpServletRequest request, HttpServletResponse response) throws Exception {
		// json으로 값을 받을때
		String requestParams = ParameterUtil.getRequestBodyToStr(request);
		JSONObject requestParamsObj = new JSONObject(requestParams);
		log.info("requestParams:" + requestParams);

		ArrayList list = new ArrayList();
		ParameterParser parser = new ParameterParser(request);
		log.info("" + parser);
//		String PAGETYPE = parser.getString("PAGETYPE", ""); // 수정화면에서 상신을 눌렀는지 확인
//		String JISA = parser.getString("JISA", ""); // 지사
//		String YONGDO = parser.getString("YONGDO", ""); // 용도
//		String PIPE_NAME = parser.getString("PIPE_NAME", ""); // 관로명
//		String PIPE_METER = parser.getString("PIPE_METER", ""); // 관경
//		String PIPE_METER2 = parser.getString("PIPE_METER2", ""); // 관경
//		String SUN_GUBUN = parser.getString("SUN_GUBUN", ""); // 단/복선
//		String USE_PURPOS = parser.getString("USE_PURPOS", ""); // 점용 목록
//		String GOVER_ST_DATE = parser.getString("GOVER_ST_DATE", ""); // 점용기간 시작
//		String GOVER_ED_DATE = parser.getString("GOVER_ED_DATE", ""); // 점용기간 끝
//		String PMT_OFFICE = parser.getString("PMT_OFFICE", ""); // 허가관청
//		String ADM_OFFICE = parser.getString("ADM_OFFICE", ""); // 관리기관
//		String OFFICE_DEPART = parser.getString("OFFICE_DEPART", ""); // 관리부서
//		String OFFICE_CHARGE = parser.getString("OFFICE_CHARGE", ""); // 부서담당자
//		String OFFICE_CONTACT = parser.getString("OFFICE_CONTACT", ""); // 담당자연락처
//		String OFFICE_MOBILE = parser.getString("OFFICE_MOBILE", ""); // 담당자연락처
//		String GOVER_PERIOD = parser.getString("GOVER_PERIOD", ""); // 담당자연락처
//		String SAVE_STATUS = parser.getString("SAVE_STATUS", ""); // 담당자연락처
//		String gubun = parser.getString("gubun", ""); // 구분( modify : 수정, insert : 등록 )
//		String ori_GOVER_NO = parser.getString("GOVER_NO", "");
//		String PNU_CNT = parser.getString("pnuCnt", "0"); // 소속토지 수
//		String PMT_CNT = parser.getString("pmtCnt", "0"); // 허가정보 수
//		String FILE_CNT = parser.getString("fileCnt", "0"); // 파일수
//		String fileseq = parser.getString("fileseq", ""); // 파일 seq
//
//		String modifyReason1 = parser.getString("modifyReason1", ""); // 변경이력-기본정보
//		String modifyReason2 = parser.getString("modifyReason2", ""); // 변경이력-소속토지정보
//		String modifyReason3 = parser.getString("modifyReason3", ""); // 변경이력-허가기본정보
//		String modifyReason4 = parser.getString("modifyReason4", ""); // 변경이력-허가관리 및 납부현황
//
//		String USER_ID = String.valueOf(request.getSession().getAttribute("userId"));
//		String USER_NAME = String.valueOf(request.getSession().getAttribute("userName"));
//				
		//ljs 이슈정보 추가
//		String NEWREGREASON = parser.getString("newRegReason", "");
//		String OCCUNONPAYREASON = parser.getString("occuNonPayReason", "");
//		String PERMPOSSYN = parser.getString("permPossYn", "");
//		String OCCUPREPAYYN = parser.getString("occuPrePayYn", "");
//		String OCCUPREPAYDATE = parser.getString("occuPrePayDate", "");

		String PAGETYPE = requestParamsObj.has("pagetype") ? requestParamsObj.getString("PAGETYPE") : ""; // 수정화면에서 상신을 눌렀는지
		// 확인
		String JISA = requestParamsObj.getString("jisa"); // 지사
		String YONGDO = requestParamsObj.getString("yongdo"); // 용도
		String PIPE_NAME = requestParamsObj.has("pipe_name") ? requestParamsObj.getString("pipe_name") : ""; // 관로명
		String PIPE_METER = requestParamsObj.has("pipe_meter_single") ? requestParamsObj.getString("pipe_meter_single") : requestParamsObj.getString("pipe_meter"); // 관경
		String PIPE_METER2 = requestParamsObj.has("pipe_meter2") ? requestParamsObj.getString("pipe_meter2") : ""; // 관경
		String SUN_GUBUN = requestParamsObj.getString("sun_gubun"); // 단/복선
		String USE_PURPOS = requestParamsObj.getString("use_purpos"); // 점용 목록
		String GOVER_ST_DATE = requestParamsObj.getString("gover_st_date"); // 점용기간 시작
		String GOVER_ED_DATE = requestParamsObj.getString("gover_ed_date"); // 점용기간 끝
		String PMT_OFFICE = requestParamsObj.has("pmt_office") ? requestParamsObj.getString("pmt_office") : ""; // 허가관청
		String ADM_OFFICE = requestParamsObj.has("adm_office") ? requestParamsObj.getString("adm_office") : ""; // 관리기관
		String OFFICE_DEPART = requestParamsObj.getString("office_depart"); // 관리부서
		String OFFICE_CHARGE = requestParamsObj.has("office_charege") ? requestParamsObj.getString("office_charege") : ""; // 부서담당자
		String OFFICE_CONTACT = requestParamsObj.getString("office_contact"); // 담당자연락처
		String OFFICE_MOBILE = requestParamsObj.getString("office_mobile"); // 담당자연락처
		// String GOVER_PERIOD = requestParamsObj.getString("gover_period"); // 담당자연락처
		String GOVER_PERIOD = requestParamsObj.has("gover_period") ? requestParamsObj.getString("gover_period") : ""; // 점용갱신주기
		String EXEMPTIONYN = requestParamsObj.getString("exemptionyn"); // 감면여부

		String SAVE_STATUS = requestParamsObj.getString("save_status"); // 저장 코드 T:승인대기 R:반려 Q:임시저장
		String gubun = requestParamsObj.getString("gubun"); // 구분( modify : 수정, insert : 등록 )
		String memo = requestParamsObj.has("memo") ? requestParamsObj.getString("memo") : "";
		String ori_GOVER_NO = requestParamsObj.has("gover_no") ? requestParamsObj.getString("gover_no") : "";

		String PNU_CNT = requestParamsObj.has("pnuCnt") ? requestParamsObj.getString("pnuCnt") : "0"; // 소속토지 수
		String PMT_CNT = requestParamsObj.has("pmtCnt") ? requestParamsObj.getString("pmtCnt") : "0"; // 허가정보 수
		String FILE_CNT = requestParamsObj.has("fileCnt") ? requestParamsObj.getString("fileCnt") : "0"; // 파일수
		String fileseq = requestParamsObj.has("fileseq") ? requestParamsObj.getString("fileseq") : ""; // 파일 seq

		String modifyReason1 = requestParamsObj.has("modifyReason1") ? requestParamsObj.getString("modifyReason1") : ""; // 변경이력-기본정보
		String modifyReason2 = requestParamsObj.has("modifyReason2") ? requestParamsObj.getString("modifyReason2") : ""; // 변경이력-소속토지정보
		String modifyReason3 = requestParamsObj.has("modifyReason3") ? requestParamsObj.getString("modifyReason3") : ""; // 변경이력-허가기본정보
		String modifyReason4 = requestParamsObj.has("modifyReason4") ? requestParamsObj.getString("modifyReason4") : ""; // 변경이력-허가관리
		String modifyReason5 = requestParamsObj.optString("modifyReason5", ""); // 변경이력 - 허가관청 및 납부현황

		String USER_ID = String.valueOf(request.getSession().getAttribute("userId"));
		String USER_NAME = String.valueOf(request.getSession().getAttribute("userName"));

		// ljs 이슈정보 추가
		String NEWREGREASON = requestParamsObj.has("newregreason") ? requestParamsObj.getString("newregreason") : "";
		String OCCUNONPAYREASON = requestParamsObj.has("occunonpayreason") ? requestParamsObj.getString("occunonpayreason") : "";
		String PERMPOSSYN = requestParamsObj.has("permpossyn") ? requestParamsObj.getString("permpossyn") : "";
		String OCCUPREPAYYN = requestParamsObj.has("occuprepayyn") ? requestParamsObj.getString("occuprepayyn") : "";
		String OCCUPREPAYDATE = requestParamsObj.has("occuprepaydate") ? requestParamsObj.getString("occuprepaydate") : "";

		JSONArray togiArr = new JSONArray(requestParamsObj.getString("togiDatas"));
		JSONArray fileArr = new JSONArray(requestParamsObj.getString("files"));

		String str_GUBUN = "";
		String str_GOVERNO = "";

		String str_result = "Y";
		
		try {

			HashMap params = new HashMap();
			// ljs 이슈 부분 추가
			params.put("NEWREGREASON", NEWREGREASON);
			params.put("OCCUNONPAYREASON", OCCUNONPAYREASON);
			params.put("PERMPOSSYN", PERMPOSSYN);
			params.put("OCCUPREPAYYN", OCCUPREPAYYN);
			params.put("OCCUPREPAYDATE", OCCUPREPAYDATE);

			params.put("JISA", JISA);
			params.put("YONGDO", YONGDO);
			params.put("PIPE_NAME", PIPE_NAME);
			params.put("PIPE_METER", PIPE_METER);
			params.put("PIPE_METER2", PIPE_METER2);
			params.put("SUN_GUBUN", SUN_GUBUN);
			params.put("STATUS", "GOVER");
			params.put("FILESEQ", fileseq);
			params.put("USE_PURPOS", USE_PURPOS);
			params.put("GOVER_ST_DATE", GOVER_ST_DATE);
			params.put("GOVER_ED_DATE", GOVER_ED_DATE);
			params.put("PMT_OFFICE", PMT_OFFICE);
			params.put("ADM_OFFICE", ADM_OFFICE);
			params.put("OFFICE_DEPART", OFFICE_DEPART);
			params.put("OFFICE_CHARGE", OFFICE_CHARGE);
			params.put("OFFICE_CONTACT", OFFICE_CONTACT);
			params.put("OFFICE_MOBILE", OFFICE_MOBILE);
			params.put("EXEMPTIONYN", EXEMPTIONYN);
			params.put("GOVER_PERIOD", GOVER_PERIOD);
			params.put("PMT_STATUS", "임시저장"); // 등록상태
			params.put("USER_ID", USER_ID);
			params.put("USER_NAME", USER_NAME);
			params.put("SAVE_STATUS", "Q");
			//params.put("SAVE_STATUS", SAVE_STATUS);

			/**********************
			 * 다음 지상권 번호 조회 시작
			 **********************/
			if (gubun.equals("modify")) {
				params.put("GOVER_NO", ori_GOVER_NO);
				params.put("JISANGNO", ori_GOVER_NO); // JIJUK_MASTER테이블 변경하기 위한
														// 변수
				params.put("GUBUN", str_GUBUN);

				str_GOVERNO = ori_GOVER_NO;

			} else {
				ArrayList GoverList = (ArrayList) mainService.selectQuery("songyuSQL.selectGoverNextNo", null);
				String no = (((HashMap) GoverList.get(0)).get("now_governo").toString());
//				log.info(":" + (Integer.parseInt(no) + 1));
				String Next_goverNo = String.valueOf((Integer.parseInt(no) + 1));
				int n_Next_goverNo = Next_goverNo.length();

				String add_Zero = "";
				for (int i = 0; i < (6 - n_Next_goverNo); i++) {
					add_Zero += "0";
				}
				Next_goverNo = "G_" + add_Zero + Next_goverNo;

				params.put("GOVER_NO", Next_goverNo);
				params.put("JISANGNO", Next_goverNo); // JIJUK_MASTER테이블 변경하기 위한 변수

				str_GOVERNO = Next_goverNo;
			}

			/***********************
			 * 다음 지상권 번호 조회 끝
			 ************************/
			System.out.println("기본정보 params = " + params);
			
			if (gubun.equals("insert")) {
				mainService.InsertQuery("goverSQL.insertGoverMaster", params); // 기본정보 저장
				// 메모가 비어 있지 않은 경우에만 commonSQL.putMemoData 실행
				if (memo != null && !memo.trim().isEmpty()) {
					HashMap memoParam = new HashMap();
					memoParam.put("manage_no", str_GOVERNO);
					memoParam.put("wname", USER_NAME);
					memoParam.put("wid", USER_ID);
					memoParam.put("wmemo", memo);

					mainService.InsertQuery("commonSQL.putMemoData", memoParam);
				}
			} else if (gubun.equals("modify")) {

				// 변경이력 등록
				if (!modifyReason1.equals("")) {
					params.put("GUBUN", "기본정보");
					params.put("CONT", modifyReason1);
					mainService.InsertQuery("goverSQL.insertGoverModifyHistory", params);
				}
				if (!modifyReason2.equals("")) {
					params.put("GUBUN", "소속 토지정보");
					params.put("CONT", modifyReason2);
					mainService.InsertQuery("goverSQL.insertGoverModifyHistory", params);
				}
				if (!modifyReason3.equals("")) {
					params.put("GUBUN", "허가 정보 및 납부 현황");
					params.put("CONT", modifyReason3);
					mainService.InsertQuery("goverSQL.insertGoverModifyHistory", params);
				}
				if (!modifyReason5.equals("")) {
					params.put("GUBUN", "허가 관청");
					params.put("CONT", modifyReason5);
					mainService.InsertQuery("goverSQL.insertGoverModifyHistory", params);
				}
				System.out.println("updateGoverMaster = " + params);
				
				mainService.UpdateQuery("goverSQL.updateGoverMaster", params); // 기본정보 수정

			}

			// 소속토지
			for (int i = 0; i < togiArr.length(); i++) {
				JSONObject obj = new JSONObject(togiArr.get(i).toString());
				String ADDKEY = obj.getString("addKey");
				String SIDO_NM = (obj.getString("sido_nm")).replaceAll("전체", "");
				String SGG_NM = (obj.getString("sgg_nm")).replaceAll("전체", "");
				String EMD_NM = (obj.getString("emd_nm")).replaceAll("전체", "");
				String RI_NM = (obj.getString("ri_nm")).replaceAll("전체", "");
				String JIBUN = obj.getString("jibun");
				String JIBUN_FULL = obj.getString("jibun_full");
				String ADDRCODE = obj.getString("addrcode");
				String PNU = obj.getString("pnu");
				String ORG_PNU = obj.getString("org_pnu");
				String GOVEROWNYN = obj.getString("gover_own_yn");
				String JIJUK_AREA = obj.getString("jijuk_area");
				String JIMOK_TEXT = obj.getString("jimok_text");
				String GOVER_LENGTH = obj.getString("gover_length");
				String GOVER_AREA = obj.getString("gover_area");
				String ADM_OFFICE_PNU = obj.getString("adm_office");
				String USE_PURPOS_PNU = obj.has("use_purpos") ? obj.getString("use_purpos") : "";
				String REP_FLAG = obj.getString("rep_flag");
				String ORG_PNU_NULL = obj.has("org_pnu_null") ? obj.getString("org_pnu_null") : ""; // pnu값이 "NULL"도 아닌""값인 예외 체크

				String PIPE_OVERLAP_YN = obj.getString("pipe_overlab_yn");
				
				if ("".equals(GOVER_AREA)) {
					GOVER_AREA = null;
				}
				if ("".equals(GOVER_LENGTH)) {
					GOVER_LENGTH = null;
				}
//				String SIDO_NM = (parser.getString("SIDO_NM" + String.valueOf(i), "")).replaceAll("전체", "");
//				String SGG_NM = (parser.getString("SGG_NM" + String.valueOf(i), "")).replaceAll("전체", "");
//				String EMD_NM = (parser.getString("EMD_NM" + String.valueOf(i), "")).replaceAll("전체", "");
//				String RI_NM = (parser.getString("RI_NM" + String.valueOf(i), "")).replaceAll("전체", "");
//				String JIBUN = parser.getString("JIBUN" + String.valueOf(i), "");
//				String JIBUN_FULL = parser.getString("JIBUN_FULL" + String.valueOf(i), "");
//				String ADDRCODE = parser.getString("ADDRCODE" + String.valueOf(i), "");
//				String PNU = parser.getString("ChkPNU" + String.valueOf(i), "");
//				String ORG_PNU = parser.getString("ORG_PNU" + String.valueOf(i), "");
//				String GOVEROWNYN = parser.getString("GOVER_OWN_YN" + String.valueOf(i), "");
//				String JIJUK_AREA = parser.getString("JIJUK_AREA" + String.valueOf(i), "");
//				String JIMOK_TEXT = parser.getString("JIMOK_TEXT" + String.valueOf(i), "");
//				String GOVER_LENGTH = parser.getString("GOVER_LENGTH" + String.valueOf(i), "");
//				String GOVER_AREA = parser.getString("GOVER_AREA" + String.valueOf(i), "");
//				String ADM_OFFICE_PNU = parser.getString("ADM_OFFICE" + String.valueOf(i), "");
//				String USE_PURPOS_PNU = parser.getString("USE_PURPOS" + String.valueOf(i), "");
//				String REP_FLAG = parser.getString("REP_FLAG" + String.valueOf(i), "");
//				String ORG_PNU_NULL = parser.getString("ORG_PNU_NULL" + String.valueOf(i), ""); // pnu값이 "NULL"도 아닌 ""값인 예외 체크
//				String PIPE_OVERLAP_YN = parser.getString("PIPE_OVERLAP_YN" + String.valueOf(i), "");

				if (SIDO_NM.equals("") && SGG_NM.equals("") && EMD_NM.equals("") && RI_NM.equals("")&& JIBUN.equals(""))
					continue;

				params.put("SIDO_NM", SIDO_NM); // 시도
				params.put("SGG_NM", SGG_NM); // 시군구
				params.put("EMD_NM", EMD_NM); // 읍면동
				params.put("RI_NM", RI_NM); // 동리
				params.put("JIBUN", JIBUN); // 지번
				params.put("JIBUN_FULL", JIBUN_FULL);
				params.put("ADDRCODE", ADDRCODE); // 주소코드
				params.put("PNU", PNU); // 새로 입력받은 PNU
				params.put("ORG_PNU", ORG_PNU); // 기존PNU
				params.put("GOVEROWNYN", GOVEROWNYN); // 국공유지여부
				params.put("JIJUK_AREA", JIJUK_AREA); // 지적면적 (지적구역...화면상에선 위치보기 버튼이던데..)
				params.put("JIMOK_TEXT", JIMOK_TEXT); // 지목
				params.put("GOVER_LENGTH", GOVER_LENGTH); // 점용연장!!
				params.put("GOVER_AREA", GOVER_AREA); // 점용면적!!
				params.put("ADM_OFFICE", ADM_OFFICE_PNU); // 관리기관!!
				params.put("USE_PURPOS", USE_PURPOS_PNU); // 점용구분!!
				params.put("REP_FLAG", REP_FLAG); // 대표필지!!
				params.put("PIPEYN", PIPE_OVERLAP_YN); // 관로일치 여부!!
				
				System.out.println("insertGoverList >>>>>> insertGoverPnu Params" + params);

				// 로그처리를 위해 변경전 지적마스터 데이터 조회
				HashMap logParam = (HashMap) mainService.selectHashmapQuery("songyuSQL.selectJijukBeforePNU", params);

				if (gubun.equals("modify")) {
					if (i == 0) {
						/**
						 * 기존의 PNU 삭제하기 전에 JIJUK_MASTER 테이블에서 미설정으로 바꿔줌
						 **/
						ArrayList goverlist = (ArrayList) mainService.selectQuery("goverSQL.selectGoverPnuList",
								params);
						String str_BeforePNU = "";

						if (null != goverlist && goverlist.size() > 0) {
							HashMap hm = new HashMap();

							for (int j = 0; j < goverlist.size(); j++) {
								str_BeforePNU = (String) ((HashMap) goverlist.get(j)).get("PNU");
								str_BeforePNU = CommonUtil.nvl(str_BeforePNU);
								params.put("STR_PNU", str_BeforePNU);

								if (!str_BeforePNU.equals("NULL") && !str_BeforePNU.equals("")) {
									// ** JIJUK_MASTER 테이블 지상권 해제**//
									System.out.println("insertGoverList >>>>>> cancelGoverPnu PNU=" + str_BeforePNU);

									mainService.UpdateQuery("goverSQL.updateJijukMasterStatus_Gover", params);
								}
							}
						}
						mainService.UpdateQuery("goverSQL.deleteGoverPNU", params); // 기존삭제
					}
				}

				if (logParam != null) {
					logParam.put("JISANG_NO", ori_GOVER_NO);
					logParam.put("JISANG_STATUS", "GOVER");
					logParam.put("GOVER_OWN_YN", GOVEROWNYN);
					logParam.put("PIPE_OVERLAP_YN", PIPE_OVERLAP_YN);
					logParam.put("JISA", JISA);
					logParam.put("LOG_USER", String.valueOf(request.getSession().getAttribute("userId")));
					logParam.put("LOG_TYPE", "U");
					mainService.InsertQuery("songyuSQL.insertJijukLog", logParam);
				}

				String CANCLE_YN = obj.has("CANCEL_YN") ? obj.getString("CANCLE_YN") : "N";// 소속토지정보 - 해지여부
				System.out.println("CANCLE_YN :: " + CANCLE_YN);
				
				PNU = obj.getString("pnu");
				ORG_PNU = obj.getString("org_pnu");
				String IN_PNU = ""; // DB에 Insert할 PNU

				if (CANCLE_YN.equals("N")) {
					if (gubun.equals("insert")) {
						IN_PNU = PNU;
					} else {
						if (!ORG_PNU.equals("NULL") && !PNU.equals("") && !ORG_PNU.equals(PNU)) {
							IN_PNU = PNU;
						} else if (ORG_PNU.equals("NULL") && !PNU.equals("")) {
							IN_PNU = PNU;
						} else {
							IN_PNU = ORG_PNU;
						}
					}
					
					params.put("IN_PNU", IN_PNU);
					System.out.println("insertGoverList >>>>>> IN_PNU=" + IN_PNU);

					// 여기서 ADDKEY==add 면 업데이트 new 면 insert
//					if ("add".equals(ADDKEY) && gubun.equals("modify")) {
//						mainService.UpdateQuery("goverSQL.updateGoverPnu", params); // PNU
//					} else
					mainService.InsertQuery("goverSQL.insertGoverPnu", params); // PNU 테이블 저장

					if (!PNU.equals("NULL") && !ORG_PNU_NULL.equals("Y")) {
						// 미설정일시 미설정 해지
						HashMap<String, String> param = new HashMap<String, String>();
						HashMap<String, String> dataMap = new HashMap<String, String>();
						param.put("PNU", IN_PNU);
						dataMap = (HashMap<String, String>) mainService.selectHashmapQuery("goverSQL.selectTogiData", param);
						if (dataMap != null) {
							if ("NOTSET".equals(dataMap.get("JISANG_STATUS"))) {
								param.put("NOTSET_NO", dataMap.get("JISANG_NO"));
								mainService.DeleteQuery("notsetSQL.deleteNotsetMaster", param);
							}
						}

						/** JIJUK_MASTER 테이블 새로운 행정구역으로 지상권 등록 **/
						params.put("PNU", IN_PNU);
						mainService.UpdateQuery("songyuSQL.updateTogiJisang_Status", params);
						System.out.println("점용등록된 PNU=" + IN_PNU);
					}

					HashMap param = new HashMap();
					
					param.put("SIDO_NM", SIDO_NM); // 시도
					param.put("SGG_NM", SGG_NM); // 시군구
					param.put("EMD_NM", EMD_NM); // 읍면동
					param.put("RI_NM", RI_NM); // 동리
					param.put("JIBUN", JIBUN); // 지번
					
					ArrayList<HashMap> dataMapList = (ArrayList<HashMap>) mainService.selectQuery("notsetSQL.selectNotsetObject", param);

					if (dataMapList != null && dataMapList.size() > 0) {
						for (int k = 0; k < dataMapList.size(); k++) {
							param.put("NOTSET_NO", dataMapList.get(k).get("NOTSET_NO"));
							mainService.UpdateQuery("notsetSQL.deleteNotsetMaster", param);
						}
					}

				} else {
					// 20220830::미설정 미점용 등록 막아달라는 요청
					// // 해지후 미설정,미점용으로 등록
					// HashMap dataMap = new HashMap();
					//
					// params.put("GOVER_OWN_YN", GOVEROWNYN); // 국공유지여부
					//
					// System.out.println("params.toString() :: " + params.toString());
					//
					// ArrayList NotsetList = (ArrayList)
					// Database.getInstance().queryForList("Json.selectNotsetNextNo", null);
					// String Next_notsetNo = String.valueOf(Integer.parseInt((String) ((HashMap)
					// NotsetList.get(0)).get("NOW_NOTSETNO")) + 1);
					// int n_Next_notsetNo = Next_notsetNo.length();
					//
					// String add_Zero = "";
					// for (int j = 0; j < (6 - n_Next_notsetNo); j++) {
					// add_Zero += "0";
					// }
					// Next_notsetNo = "N_" + add_Zero + Next_notsetNo;
					//
					// params.put("NOTSET_NO", Next_notsetNo);
					// Database.getInstance().insert("Json.insertNotsetMaster", params);
					// params.put("STATUS", "NOTSET");
					// params.put("JISANGNO", Next_notsetNo);
					// Database.getInstance().update("Json.updateTogiJisang_Status", params);

					params.put("STATUS", "N");
					params.put("JISANGNO", null);
					mainService.UpdateQuery("songyuSQL.updateTogiJisang_Status2Null", params);
				}
			}
			
			log.info("params:" + params);
			
			if (Integer.parseInt(FILE_CNT) > 0) {
				// 20170517 - GOVER_ATCFILE테이블에 PMT_NO가 없다면 GOVER_PERMIT에서 조회해서 업데이트
//				ArrayList GOVER_ATCFILE_PmtNo = (ArrayList) mainService
//						.selectQuery("goverSQL.selectGoverRowDetailFilesObject", params);
//				String Next_PMT_NO = String.valueOf(params.get("NEXTSEQ"));
//
//				if (null != GOVER_ATCFILE_PmtNo && GOVER_ATCFILE_PmtNo.size() > 0) {
//
//					for (int k = 0; k < GOVER_ATCFILE_PmtNo.size(); k++) {
//						params.put("ADD_PMT_NO", "");
//						params.put("FILESEQ", fileseq);
//
//						HashMap hm_GAP_NO = (HashMap) GOVER_ATCFILE_PmtNo.get(k);
//						String str_GAP_NO = CommonUtil.nvl(String.valueOf(hm_GAP_NO.get("ga_pmt_no")));
//						String str_GAP_FILESQL = CommonUtil.nvl(String.valueOf(hm_GAP_NO.get("ga_file_seq")));
//
//						// 파일을 건으로 업데이트
//						if ("".equals(str_GAP_NO)) {
//							// NEXTSEQ를 그대로 넣으면 무조건 업데이트가 되기때문에 key를 바꿈
//							params.put("ADD_PMT_NO", Next_PMT_NO);
//							params.put("FILESEQ", str_GAP_FILESQL);
//
//							/** codecanyon에서 파일업로드 **/
//							mainService.UpdateQuery("goverSQL.updateSeqFile_Gover", params); // 파일SEQ로 PMTNO 업데이트
//						} else {
//							// 해당 seq에 맞는 전체파일 업데이트
//							/** codecanyon에서 파일업로드 **/
//							mainService.UpdateQuery("goverSQL.updateSeqFile_Gover_SEQ", params); // SEQ로 지상권번호 업데이트
//						}
//
//					}
//
//				}
				
				//======== 첨부파일 =========
				if (gubun.equals("insert")) {
					for (int i = 0; i < fileArr.length(); i++) {
						// JSONObject fobj=new JSONObject(fileArr.get(i).toString());
						String file_name = fileArr.getString(i);
						log.info("file_name:" + file_name);
						HashMap<String, Object> filesMap = new HashMap<>();
						
						filesMap.put("goverNo", str_GOVERNO);
						filesMap.put("seq", String.format("%06d", i));
						filesMap.put("fseq", i);
						filesMap.put("fname", file_name);
						//
						String tempPath = GC.getGoverFileTempDir(); // 설정파일로 뺀다.
						String dataPath = GC.getGoverFileDataDir() + "/" + str_GOVERNO; // 설정파일로 뺀다.
						filesMap.put("fpath", dataPath + "/" + file_name);

						CommonUtil.moveFile(file_name, tempPath, dataPath);
						
						log.info("filesMap:" + filesMap);
						log.info("tempPath:" + tempPath);
						log.info("dataPath:" + dataPath);
						
						mainService.InsertQuery("goverSQL.insertGoverUploadData", filesMap);

					}
				}

				if (gubun.equals("modify")) {
//					for (int i = 0; i < Integer.parseInt(FILE_CNT); i++) {
//						String IS_DEL = parser.getString("isFileDel" + String.valueOf(i), "");
//						String DEL_SEQ = parser.getString("fileSeq" + String.valueOf(i), "");
//
//						if (IS_DEL.equals("Y")) {
//							System.out.println("FILE_DEL_SEQ=" + DEL_SEQ);
//							params.put("SEQ", DEL_SEQ);
//							mainService.UpdateQuery("goverSQL.deleteGoverFile", params);
//
//						}
//					}
					log.info("param:" + params);
					
					
					if(!"LOCAL".equals(GC.getServerName()) && !"IDC".equals(GC.getServerName())) {
						// 기존 등록된 파일리스트 삭제
						mainService.DeleteQuery("goverSQL.deleteBeforeGoverAtcFileList", params);
					}
					
					// seq 가져오기
					int nseq = (int) mainService.selectCountQuery("goverSQL.getGoverAtcFileSeq", params);
					log.info("nseq:" + nseq);
					
					// fileseq 가져오기
					for (int i = 0; i < fileArr.length(); i++) {
						JSONObject fobj = new JSONObject(fileArr.get(i).toString());
						String filePath = fobj.getString("fpath");
						String fileName = fobj.getString("fname");
						String[] paths = Arrays.copyOf(filePath.split("/"), filePath.split("/").length - 1);
						boolean flag = true;
						for (String item : paths) {
							if (item.contains("upload")) {
								flag = false;
								break;
							}
						}
						
//						String file_name = fileArr.getString(i);
						
//						log.info("file_name:" + file_name);
						HashMap<String, Object> filesMap = new HashMap<>();

						filesMap.put("goverNo", str_GOVERNO);
						
						filesMap.put("fname", fileName);
						String tempPath = GC.getGoverFileTempDir(); // 설정파일로 뺀다.
						String dataPath = GC.getGoverFileDataDir() + "/" + str_GOVERNO; // 설정파일로 뺀다.
						if (!flag) {
							filesMap.put("fpath", filePath);
							filesMap.put("seq", fobj.getString("ga_seq"));
							filesMap.put("fseq", fobj.getString("ga_file_seq"));
						} else {
							filesMap.put("fpath", dataPath + "/" + fileName);
							filesMap.put("seq", String.format("%06d", i));
							filesMap.put("fseq", nseq + i);
						}
						
						CommonUtil.moveFile(fileName, tempPath, dataPath);
						
						log.info("filesMap:" + filesMap);
						mainService.InsertQuery("goverSQL.insertGoverUploadData", filesMap);

					}
				}
			}

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
		map.put("GOVERNO", str_GOVERNO);
		map.put("result", list);

		log.info("gubun ::" + gubun);
		log.info("serverName :: " + GC.getServerName());
		
		JSONObject jo = new JSONObject(map);

		response.setCharacterEncoding("UTF-8");
		response.setHeader("Access-Control-Allow-Origin", "*");
		response.resetBuffer();
		response.setContentType("application/json");
		response.getWriter().print(jo);
		response.getWriter().flush();

	}

	// 점용 마스터 등록 수정
	@Transactional
	@PostMapping(path = "/insertGoverMaster")
	public void insertGoverMaster(HttpServletRequest request, HttpServletResponse response) throws Exception {
		// json으로 값을 받을때
		String requestParams = ParameterUtil.getRequestBodyToStr(request);
		JSONObject requestParamsObj = new JSONObject(requestParams);
		log.info("requestParams:" + requestParams);

		ArrayList list = new ArrayList();
		ParameterParser parser = new ParameterParser(request);
		log.info("" + parser);
//		String PAGETYPE = parser.getString("PAGETYPE", ""); // 수정화면에서 상신을 눌렀는지 확인
//		String JISA = parser.getString("JISA", ""); // 지사
//		String YONGDO = parser.getString("YONGDO", ""); // 용도
//		String PIPE_NAME = parser.getString("PIPE_NAME", ""); // 관로명
//		String PIPE_METER = parser.getString("PIPE_METER", ""); // 관경
//		String PIPE_METER2 = parser.getString("PIPE_METER2", ""); // 관경
//		String SUN_GUBUN = parser.getString("SUN_GUBUN", ""); // 단/복선
//		String USE_PURPOS = parser.getString("USE_PURPOS", ""); // 점용 목록
//		String GOVER_ST_DATE = parser.getString("GOVER_ST_DATE", ""); // 점용기간 시작
//		String GOVER_ED_DATE = parser.getString("GOVER_ED_DATE", ""); // 점용기간 끝
//		String PMT_OFFICE = parser.getString("PMT_OFFICE", ""); // 허가관청
//		String ADM_OFFICE = parser.getString("ADM_OFFICE", ""); // 관리기관
//		String OFFICE_DEPART = parser.getString("OFFICE_DEPART", ""); // 관리부서
//		String OFFICE_CHARGE = parser.getString("OFFICE_CHARGE", ""); // 부서담당자
//		String OFFICE_CONTACT = parser.getString("OFFICE_CONTACT", ""); // 담당자연락처
//		String OFFICE_MOBILE = parser.getString("OFFICE_MOBILE", ""); // 담당자연락처
//		String GOVER_PERIOD = parser.getString("GOVER_PERIOD", ""); // 담당자연락처
//		String SAVE_STATUS = parser.getString("SAVE_STATUS", ""); // 담당자연락처
//		String gubun = parser.getString("gubun", ""); // 구분( modify : 수정, insert : 등록 )
//		String ori_GOVER_NO = parser.getString("GOVER_NO", "");
//		String PNU_CNT = parser.getString("pnuCnt", "0"); // 소속토지 수
//		String PMT_CNT = parser.getString("pmtCnt", "0"); // 허가정보 수
//		String FILE_CNT = parser.getString("fileCnt", "0"); // 파일수
//		String fileseq = parser.getString("fileseq", ""); // 파일 seq
//
//		String modifyReason1 = parser.getString("modifyReason1", ""); // 변경이력-기본정보
//		String modifyReason2 = parser.getString("modifyReason2", ""); // 변경이력-소속토지정보
//		String modifyReason3 = parser.getString("modifyReason3", ""); // 변경이력-허가기본정보
//		String modifyReason4 = parser.getString("modifyReason4", ""); // 변경이력-허가관리 및 납부현황
//
//		String USER_ID = String.valueOf(request.getSession().getAttribute("userId"));
//		String USER_NAME = String.valueOf(request.getSession().getAttribute("userName"));
//				
		//ljs 이슈정보 추가
//		String NEWREGREASON = parser.getString("newRegReason", "");
//		String OCCUNONPAYREASON = parser.getString("occuNonPayReason", "");
//		String PERMPOSSYN = parser.getString("permPossYn", "");
//		String OCCUPREPAYYN = parser.getString("occuPrePayYn", "");
//		String OCCUPREPAYDATE = parser.getString("occuPrePayDate", "");

		String PAGETYPE = requestParamsObj.has("pagetype") ? requestParamsObj.getString("PAGETYPE") : ""; // 수정화면에서 상신을 눌렀는지
		// 확인
		String JISA = requestParamsObj.getString("jisa"); // 지사
		String YONGDO = requestParamsObj.getString("yongdo"); // 용도
		String PIPE_NAME = requestParamsObj.has("pipe_name") ? requestParamsObj.getString("pipe_name") : ""; // 관로명
		String PIPE_METER = requestParamsObj.has("pipe_meter_single") ? requestParamsObj.getString("pipe_meter_single") : requestParamsObj.getString("pipe_meter"); // 관경
		String PIPE_METER2 = requestParamsObj.has("pipe_meter2") ? requestParamsObj.getString("pipe_meter2") : ""; // 관경
		String SUN_GUBUN = requestParamsObj.getString("sun_gubun"); // 단/복선
		String USE_PURPOS = requestParamsObj.getString("use_purpos"); // 점용 목록
		String GOVER_ST_DATE = requestParamsObj.getString("gover_st_date"); // 점용기간 시작
		String GOVER_ED_DATE = requestParamsObj.getString("gover_ed_date"); // 점용기간 끝
		String PMT_OFFICE = requestParamsObj.has("pmt_office") ? requestParamsObj.getString("pmt_office") : ""; // 허가관청
		String ADM_OFFICE = requestParamsObj.has("adm_office") ? requestParamsObj.getString("adm_office") : ""; // 관리기관
		String OFFICE_DEPART = requestParamsObj.getString("office_depart"); // 관리부서
		String OFFICE_CHARGE = requestParamsObj.has("office_charege") ? requestParamsObj.getString("office_charege") : ""; // 부서담당자
		String OFFICE_CONTACT = requestParamsObj.getString("office_contact"); // 담당자연락처
		String OFFICE_MOBILE = requestParamsObj.getString("office_mobile"); // 담당자연락처
		// String GOVER_PERIOD = requestParamsObj.getString("gover_period"); // 담당자연락처
		String GOVER_PERIOD = requestParamsObj.has("gover_period") ? requestParamsObj.getString("gover_period") : ""; // 점용갱신주기
		String EXEMPTIONYN = requestParamsObj.getString("exemptionyn"); // 감면여부

		String SAVE_STATUS = requestParamsObj.getString("save_status"); // 저장 코드 T:승인대기 R:반려 Q:임시저장
		String gubun = requestParamsObj.getString("gubun"); // 구분( modify : 수정, insert : 등록 )
		String memo = requestParamsObj.has("memo") ? requestParamsObj.getString("memo") : "";
		String ori_GOVER_NO = requestParamsObj.has("gover_no") ? requestParamsObj.getString("gover_no") : "";

		String PNU_CNT = requestParamsObj.has("pnuCnt") ? requestParamsObj.getString("pnuCnt") : "0"; // 소속토지 수
		String PMT_CNT = requestParamsObj.has("pmtCnt") ? requestParamsObj.getString("pmtCnt") : "0"; // 허가정보 수
		String FILE_CNT = requestParamsObj.has("fileCnt") ? requestParamsObj.getString("fileCnt") : "0"; // 파일수
		String fileseq = requestParamsObj.has("fileseq") ? requestParamsObj.getString("fileseq") : ""; // 파일 seq

		String modifyReason1 = requestParamsObj.has("modifyReason1") ? requestParamsObj.getString("modifyReason1") : ""; // 변경이력-기본정보
		String modifyReason2 = requestParamsObj.has("modifyReason2") ? requestParamsObj.getString("modifyReason2") : ""; // 변경이력-소속토지정보
		String modifyReason3 = requestParamsObj.has("modifyReason3") ? requestParamsObj.getString("modifyReason3") : ""; // 변경이력-허가기본정보
		String modifyReason4 = requestParamsObj.has("modifyReason4") ? requestParamsObj.getString("modifyReason4") : ""; // 변경이력-허가관리
		String modifyReason5 = requestParamsObj.optString("modifyReason5", ""); // 변경이력 - 허가관청 및 납부현황

		String USER_ID = String.valueOf(request.getSession().getAttribute("userId"));
		String USER_NAME = String.valueOf(request.getSession().getAttribute("userName"));

		// ljs 이슈정보 추가
		String NEWREGREASON = requestParamsObj.has("newregreason") ? requestParamsObj.getString("newregreason") : "";
		String OCCUNONPAYREASON = requestParamsObj.has("occunonpayreason") ? requestParamsObj.getString("occunonpayreason") : "";
		String PERMPOSSYN = requestParamsObj.has("permpossyn") ? requestParamsObj.getString("permpossyn") : "";
		String OCCUPREPAYYN = requestParamsObj.has("occuprepayyn") ? requestParamsObj.getString("occuprepayyn") : "";
		String OCCUPREPAYDATE = requestParamsObj.has("occuprepaydate") ? requestParamsObj.getString("occuprepaydate") : "";

		JSONArray togiArr = new JSONArray(requestParamsObj.getString("togiDatas"));
		JSONArray fileArr = new JSONArray(requestParamsObj.getString("files"));

		String str_GUBUN = "";
		String str_GOVERNO = "";

		String str_result = "Y";
		
		try {

			HashMap params = new HashMap();
			// ljs 이슈 부분 추가
			params.put("NEWREGREASON", NEWREGREASON);
			params.put("OCCUNONPAYREASON", OCCUNONPAYREASON);
			params.put("PERMPOSSYN", PERMPOSSYN);
			params.put("OCCUPREPAYYN", OCCUPREPAYYN);
			params.put("OCCUPREPAYDATE", OCCUPREPAYDATE);

			params.put("JISA", JISA);
			params.put("YONGDO", YONGDO);
			params.put("PIPE_NAME", PIPE_NAME);
			params.put("PIPE_METER", PIPE_METER);
			params.put("PIPE_METER2", PIPE_METER2);
			params.put("SUN_GUBUN", SUN_GUBUN);
			params.put("STATUS", "GOVER");
			params.put("FILESEQ", fileseq);
			params.put("USE_PURPOS", USE_PURPOS);
			params.put("GOVER_ST_DATE", GOVER_ST_DATE);
			params.put("GOVER_ED_DATE", GOVER_ED_DATE);
			params.put("PMT_OFFICE", PMT_OFFICE);
			params.put("ADM_OFFICE", ADM_OFFICE);
			params.put("OFFICE_DEPART", OFFICE_DEPART);
			params.put("OFFICE_CHARGE", OFFICE_CHARGE);
			params.put("OFFICE_CONTACT", OFFICE_CONTACT);
			params.put("OFFICE_MOBILE", OFFICE_MOBILE);
			params.put("EXEMPTIONYN", EXEMPTIONYN);
			params.put("GOVER_PERIOD", GOVER_PERIOD);
			params.put("PMT_STATUS", "임시저장"); // 등록상태
			params.put("USER_ID", USER_ID);
			params.put("USER_NAME", USER_NAME);
			//params.put("SAVE_STATUS", "A");
			params.put("SAVE_STATUS", SAVE_STATUS);

			/**********************
			 * 다음 지상권 번호 조회 시작
			 **********************/
			if (gubun.equals("modify")) {
				params.put("GOVER_NO", ori_GOVER_NO);
				params.put("JISANGNO", ori_GOVER_NO); // JIJUK_MASTER테이블 변경하기 위한
														// 변수
				params.put("GUBUN", str_GUBUN);

				str_GOVERNO = ori_GOVER_NO;

			} else {
				ArrayList GoverList = (ArrayList) mainService.selectQuery("songyuSQL.selectGoverNextNo", null);
				String no = (((HashMap) GoverList.get(0)).get("now_governo").toString());
//				log.info(":" + (Integer.parseInt(no) + 1));
				String Next_goverNo = String.valueOf((Integer.parseInt(no) + 1));
				int n_Next_goverNo = Next_goverNo.length();

				String add_Zero = "";
				for (int i = 0; i < (6 - n_Next_goverNo); i++) {
					add_Zero += "0";
				}
				Next_goverNo = "G_" + add_Zero + Next_goverNo;

				params.put("GOVER_NO", Next_goverNo);
				params.put("JISANGNO", Next_goverNo); // JIJUK_MASTER테이블 변경하기 위한 변수

				str_GOVERNO = Next_goverNo;
			}

			/***********************
			 * 다음 지상권 번호 조회 끝
			 ************************/
			System.out.println("기본정보 params = " + params);
			
			if (gubun.equals("insert")) {
				mainService.InsertQuery("goverSQL.insertGoverMaster", params); // 기본정보 저장
				// 메모가 비어 있지 않은 경우에만 commonSQL.putMemoData 실행
				if (memo != null && !memo.trim().isEmpty()) {
					HashMap memoParam = new HashMap();
					memoParam.put("manage_no", str_GOVERNO);
					memoParam.put("wname", USER_NAME);
					memoParam.put("wid", USER_ID);
					memoParam.put("wmemo", memo);

					mainService.InsertQuery("commonSQL.putMemoData", memoParam);
				}
			} else if (gubun.equals("modify")) {

				// 변경이력 등록
				if (!modifyReason1.equals("")) {
					params.put("GUBUN", "기본정보");
					params.put("CONT", modifyReason1);
					mainService.InsertQuery("goverSQL.insertGoverModifyHistory", params);
				}
				if (!modifyReason2.equals("")) {
					params.put("GUBUN", "소속 토지정보");
					params.put("CONT", modifyReason2);
					mainService.InsertQuery("goverSQL.insertGoverModifyHistory", params);
				}
				if (!modifyReason3.equals("")) {
					params.put("GUBUN", "허가 정보 및 납부 현황");
					params.put("CONT", modifyReason3);
					mainService.InsertQuery("goverSQL.insertGoverModifyHistory", params);
				}
				if (!modifyReason5.equals("")) {
					params.put("GUBUN", "허가 관청");
					params.put("CONT", modifyReason5);
					mainService.InsertQuery("goverSQL.insertGoverModifyHistory", params);
				}
				System.out.println("updateGoverMaster = " + params);
				
				mainService.UpdateQuery("goverSQL.updateGoverMaster", params); // 기본정보 수정

			}

			// 소속토지
			for (int i = 0; i < togiArr.length(); i++) {
				JSONObject obj = new JSONObject(togiArr.get(i).toString());
				String ADDKEY = obj.getString("addKey");
				String SIDO_NM = (obj.getString("sido_nm")).replaceAll("전체", "");
				String SGG_NM = (obj.getString("sgg_nm")).replaceAll("전체", "");
				String EMD_NM = (obj.getString("emd_nm")).replaceAll("전체", "");
				String RI_NM = (obj.getString("ri_nm")).replaceAll("전체", "");
				String JIBUN = obj.getString("jibun");
				String JIBUN_FULL = obj.getString("jibun_full");
				String ADDRCODE = obj.getString("addrcode");
				String PNU = obj.getString("pnu");
				String ORG_PNU = obj.getString("org_pnu");
				String GOVEROWNYN = obj.getString("gover_own_yn");
				String JIJUK_AREA = obj.getString("jijuk_area");
				String JIMOK_TEXT = obj.getString("jimok_text");
				String GOVER_LENGTH = obj.getString("gover_length");
				String GOVER_AREA = obj.getString("gover_area");
				String ADM_OFFICE_PNU = obj.getString("adm_office");
				String USE_PURPOS_PNU = obj.has("use_purpos") ? obj.getString("use_purpos") : "";
				String REP_FLAG = obj.getString("rep_flag");
				String ORG_PNU_NULL = obj.has("org_pnu_null") ? obj.getString("org_pnu_null") : ""; // pnu값이 "NULL"도 아닌""값인 예외 체크

				String PIPE_OVERLAP_YN = obj.getString("pipe_overlab_yn");

//				String SIDO_NM = (parser.getString("SIDO_NM" + String.valueOf(i), "")).replaceAll("전체", "");
//				String SGG_NM = (parser.getString("SGG_NM" + String.valueOf(i), "")).replaceAll("전체", "");
//				String EMD_NM = (parser.getString("EMD_NM" + String.valueOf(i), "")).replaceAll("전체", "");
//				String RI_NM = (parser.getString("RI_NM" + String.valueOf(i), "")).replaceAll("전체", "");
//				String JIBUN = parser.getString("JIBUN" + String.valueOf(i), "");
//				String JIBUN_FULL = parser.getString("JIBUN_FULL" + String.valueOf(i), "");
//				String ADDRCODE = parser.getString("ADDRCODE" + String.valueOf(i), "");
//				String PNU = parser.getString("ChkPNU" + String.valueOf(i), "");
//				String ORG_PNU = parser.getString("ORG_PNU" + String.valueOf(i), "");
//				String GOVEROWNYN = parser.getString("GOVER_OWN_YN" + String.valueOf(i), "");
//				String JIJUK_AREA = parser.getString("JIJUK_AREA" + String.valueOf(i), "");
//				String JIMOK_TEXT = parser.getString("JIMOK_TEXT" + String.valueOf(i), "");
//				String GOVER_LENGTH = parser.getString("GOVER_LENGTH" + String.valueOf(i), "");
//				String GOVER_AREA = parser.getString("GOVER_AREA" + String.valueOf(i), "");
//				String ADM_OFFICE_PNU = parser.getString("ADM_OFFICE" + String.valueOf(i), "");
//				String USE_PURPOS_PNU = parser.getString("USE_PURPOS" + String.valueOf(i), "");
//				String REP_FLAG = parser.getString("REP_FLAG" + String.valueOf(i), "");
//				String ORG_PNU_NULL = parser.getString("ORG_PNU_NULL" + String.valueOf(i), ""); // pnu값이 "NULL"도 아닌 ""값인 예외 체크
//				String PIPE_OVERLAP_YN = parser.getString("PIPE_OVERLAP_YN" + String.valueOf(i), "");

				if (SIDO_NM.equals("") && SGG_NM.equals("") && EMD_NM.equals("") && RI_NM.equals("")&& JIBUN.equals(""))
					continue;

				params.put("SIDO_NM", SIDO_NM); // 시도
				params.put("SGG_NM", SGG_NM); // 시군구
				params.put("EMD_NM", EMD_NM); // 읍면동
				params.put("RI_NM", RI_NM); // 동리
				params.put("JIBUN", JIBUN); // 지번
				params.put("JIBUN_FULL", JIBUN_FULL);
				params.put("ADDRCODE", ADDRCODE); // 주소코드
				params.put("PNU", PNU); // 새로 입력받은 PNU
				params.put("ORG_PNU", ORG_PNU); // 기존PNU
				params.put("GOVEROWNYN", GOVEROWNYN); // 국공유지여부
				params.put("JIJUK_AREA", JIJUK_AREA); // 지적면적
				params.put("JIMOK_TEXT", JIMOK_TEXT); // 지목
				params.put("GOVER_LENGTH", GOVER_LENGTH); // 연장
				params.put("GOVER_AREA", GOVER_AREA); // 면적
				params.put("ADM_OFFICE", ADM_OFFICE_PNU); // 면적
				params.put("USE_PURPOS", USE_PURPOS_PNU); // 면적
				params.put("REP_FLAG", REP_FLAG); // 대표필지 플래그
				params.put("PIPEYN", PIPE_OVERLAP_YN); // 대표필지 플래그
				
				System.out.println("insertGoverList >>>>>> insertGoverPnu Params" + params);

				// 로그처리를 위해 변경전 지적마스터 데이터 조회
				HashMap logParam = (HashMap) mainService.selectHashmapQuery("songyuSQL.selectJijukBeforePNU", params);

				if (gubun.equals("modify")) {
					if (i == 0) {
						/**
						 * 기존의 PNU 삭제하기 전에 JIJUK_MASTER 테이블에서 미설정으로 바꿔줌
						 **/
						ArrayList goverlist = (ArrayList) mainService.selectQuery("goverSQL.selectGoverPnuList",
								params);
						String str_BeforePNU = "";

						if (null != goverlist && goverlist.size() > 0) {
							HashMap hm = new HashMap();

							for (int j = 0; j < goverlist.size(); j++) {
								str_BeforePNU = (String) ((HashMap) goverlist.get(j)).get("PNU");
								str_BeforePNU = CommonUtil.nvl(str_BeforePNU);
								params.put("STR_PNU", str_BeforePNU);

								if (!str_BeforePNU.equals("NULL") && !str_BeforePNU.equals("")) {
									// ** JIJUK_MASTER 테이블 지상권 해제**//
									System.out.println("insertGoverList >>>>>> cancelGoverPnu PNU=" + str_BeforePNU);

									mainService.UpdateQuery("goverSQL.updateJijukMasterStatus_Gover", params);
								}
							}
						}
						mainService.UpdateQuery("goverSQL.deleteGoverPNU", params); // 기존삭제
					}
				}

				if (logParam != null) {
					logParam.put("JISANG_NO", ori_GOVER_NO);
					logParam.put("JISANG_STATUS", "GOVER");
					logParam.put("GOVER_OWN_YN", GOVEROWNYN);
					logParam.put("PIPE_OVERLAP_YN", PIPE_OVERLAP_YN);
					logParam.put("JISA", JISA);
					logParam.put("LOG_USER", String.valueOf(request.getSession().getAttribute("userId")));
					logParam.put("LOG_TYPE", "U");
					mainService.InsertQuery("songyuSQL.insertJijukLog", logParam);
				}

				String CANCLE_YN = obj.has("CANCEL_YN") ? obj.getString("CANCLE_YN") : "N";// 소속토지정보 - 해지여부
				System.out.println("CANCLE_YN :: " + CANCLE_YN);
				
				PNU = obj.getString("pnu");
				ORG_PNU = obj.getString("org_pnu");
				String IN_PNU = ""; // DB에 Insert할 PNU

				if (CANCLE_YN.equals("N")) {
					if (gubun.equals("insert")) {
						IN_PNU = PNU;
					} else {
						if (!ORG_PNU.equals("NULL") && !PNU.equals("") && !ORG_PNU.equals(PNU)) {
							IN_PNU = PNU;
						} else if (ORG_PNU.equals("NULL") && !PNU.equals("")) {
							IN_PNU = PNU;
						} else {
							IN_PNU = ORG_PNU;
						}
					}
					
					params.put("IN_PNU", IN_PNU);
					System.out.println("insertGoverList >>>>>> IN_PNU=" + IN_PNU);

					// 여기서 ADDKEY==add 면 업데이트 new 면 insert
//					if ("add".equals(ADDKEY) && gubun.equals("modify")) {
//						mainService.UpdateQuery("goverSQL.updateGoverPnu", params); // PNU
//					} else
					mainService.InsertQuery("goverSQL.insertGoverPnu", params); // PNU 테이블 저장

					if (!PNU.equals("NULL") && !ORG_PNU_NULL.equals("Y")) {
						// 미설정일시 미설정 해지
						HashMap<String, String> param = new HashMap<String, String>();
						HashMap<String, String> dataMap = new HashMap<String, String>();
						param.put("PNU", IN_PNU);
						dataMap = (HashMap<String, String>) mainService.selectHashmapQuery("goverSQL.selectTogiData", param);
						if (dataMap != null) {
							if ("NOTSET".equals(dataMap.get("JISANG_STATUS"))) {
								param.put("NOTSET_NO", dataMap.get("JISANG_NO"));
								mainService.DeleteQuery("notsetSQL.deleteNotsetMaster", param);
							}
						}

						/** JIJUK_MASTER 테이블 새로운 행정구역으로 지상권 등록 **/
						params.put("PNU", IN_PNU);
						mainService.UpdateQuery("songyuSQL.updateTogiJisang_Status", params);
						System.out.println("점용등록된 PNU=" + IN_PNU);
					}

					HashMap param = new HashMap();
					
					param.put("SIDO_NM", SIDO_NM); // 시도
					param.put("SGG_NM", SGG_NM); // 시군구
					param.put("EMD_NM", EMD_NM); // 읍면동
					param.put("RI_NM", RI_NM); // 동리
					param.put("JIBUN", JIBUN); // 지번
					
					ArrayList<HashMap> dataMapList = (ArrayList<HashMap>) mainService.selectQuery("notsetSQL.selectNotsetObject", param);

					if (dataMapList != null && dataMapList.size() > 0) {
						for (int k = 0; k < dataMapList.size(); k++) {
							param.put("NOTSET_NO", dataMapList.get(k).get("NOTSET_NO"));
							mainService.UpdateQuery("notsetSQL.deleteNotsetMaster", param);
						}
					}

				} else {
					// 20220830::미설정 미점용 등록 막아달라는 요청
					// // 해지후 미설정,미점용으로 등록
					// HashMap dataMap = new HashMap();
					//
					// params.put("GOVER_OWN_YN", GOVEROWNYN); // 국공유지여부
					//
					// System.out.println("params.toString() :: " + params.toString());
					//
					// ArrayList NotsetList = (ArrayList)
					// Database.getInstance().queryForList("Json.selectNotsetNextNo", null);
					// String Next_notsetNo = String.valueOf(Integer.parseInt((String) ((HashMap)
					// NotsetList.get(0)).get("NOW_NOTSETNO")) + 1);
					// int n_Next_notsetNo = Next_notsetNo.length();
					//
					// String add_Zero = "";
					// for (int j = 0; j < (6 - n_Next_notsetNo); j++) {
					// add_Zero += "0";
					// }
					// Next_notsetNo = "N_" + add_Zero + Next_notsetNo;
					//
					// params.put("NOTSET_NO", Next_notsetNo);
					// Database.getInstance().insert("Json.insertNotsetMaster", params);
					// params.put("STATUS", "NOTSET");
					// params.put("JISANGNO", Next_notsetNo);
					// Database.getInstance().update("Json.updateTogiJisang_Status", params);

					params.put("STATUS", "N");
					params.put("JISANGNO", null);
					mainService.UpdateQuery("songyuSQL.updateTogiJisang_Status2Null", params);
				}
			}
			
			log.info("params:" + params);
			
			if (Integer.parseInt(FILE_CNT) > 0) {
				// 20170517 - GOVER_ATCFILE테이블에 PMT_NO가 없다면 GOVER_PERMIT에서 조회해서 업데이트
//				ArrayList GOVER_ATCFILE_PmtNo = (ArrayList) mainService
//						.selectQuery("goverSQL.selectGoverRowDetailFilesObject", params);
//				String Next_PMT_NO = String.valueOf(params.get("NEXTSEQ"));
//
//				if (null != GOVER_ATCFILE_PmtNo && GOVER_ATCFILE_PmtNo.size() > 0) {
//
//					for (int k = 0; k < GOVER_ATCFILE_PmtNo.size(); k++) {
//						params.put("ADD_PMT_NO", "");
//						params.put("FILESEQ", fileseq);
//
//						HashMap hm_GAP_NO = (HashMap) GOVER_ATCFILE_PmtNo.get(k);
//						String str_GAP_NO = CommonUtil.nvl(String.valueOf(hm_GAP_NO.get("ga_pmt_no")));
//						String str_GAP_FILESQL = CommonUtil.nvl(String.valueOf(hm_GAP_NO.get("ga_file_seq")));
//
//						// 파일을 건으로 업데이트
//						if ("".equals(str_GAP_NO)) {
//							// NEXTSEQ를 그대로 넣으면 무조건 업데이트가 되기때문에 key를 바꿈
//							params.put("ADD_PMT_NO", Next_PMT_NO);
//							params.put("FILESEQ", str_GAP_FILESQL);
//
//							/** codecanyon에서 파일업로드 **/
//							mainService.UpdateQuery("goverSQL.updateSeqFile_Gover", params); // 파일SEQ로 PMTNO 업데이트
//						} else {
//							// 해당 seq에 맞는 전체파일 업데이트
//							/** codecanyon에서 파일업로드 **/
//							mainService.UpdateQuery("goverSQL.updateSeqFile_Gover_SEQ", params); // SEQ로 지상권번호 업데이트
//						}
//
//					}
//
//				}
				
				//======== 첨부파일 =========
				if (gubun.equals("insert")) {
					for (int i = 0; i < fileArr.length(); i++) {
						// JSONObject fobj=new JSONObject(fileArr.get(i).toString());
						String file_name = fileArr.getString(i);
						log.info("file_name:" + file_name);
						HashMap<String, Object> filesMap = new HashMap<>();
						
						filesMap.put("goverNo", str_GOVERNO);
						filesMap.put("seq", String.format("%06d", i));
						filesMap.put("fseq", i);
						filesMap.put("fname", file_name);
						//
						String tempPath = GC.getGoverFileTempDir(); // 설정파일로 뺀다.
						String dataPath = GC.getGoverFileDataDir() + "/" + str_GOVERNO; // 설정파일로 뺀다.
						filesMap.put("fpath", dataPath + "/" + file_name);

						CommonUtil.moveFile(file_name, tempPath, dataPath);
						
						log.info("filesMap:" + filesMap);
						log.info("tempPath:" + tempPath);
						log.info("dataPath:" + dataPath);
						
						mainService.InsertQuery("goverSQL.insertGoverUploadData", filesMap);

					}
				}

				if (gubun.equals("modify")) {
//					for (int i = 0; i < Integer.parseInt(FILE_CNT); i++) {
//						String IS_DEL = parser.getString("isFileDel" + String.valueOf(i), "");
//						String DEL_SEQ = parser.getString("fileSeq" + String.valueOf(i), "");
//
//						if (IS_DEL.equals("Y")) {
//							System.out.println("FILE_DEL_SEQ=" + DEL_SEQ);
//							params.put("SEQ", DEL_SEQ);
//							mainService.UpdateQuery("goverSQL.deleteGoverFile", params);
//
//						}
//					}
					log.info("param:" + params);
					
					
					if(!"LOCAL".equals(GC.getServerName())|| !"IDC".equals(GC.getServerName())) {
						// 기존 등록된 파일리스트 삭제
						mainService.DeleteQuery("goverSQL.deleteBeforeGoverAtcFileList", params);
					}
					
					// seq 가져오기
					int nseq = (int) mainService.selectCountQuery("goverSQL.getGoverAtcFileSeq", params);
					log.info("nseq:" + nseq);
					
					// fileseq 가져오기
					for (int i = 0; i < fileArr.length(); i++) {
						// JSONObject fobj=new JSONObject(fileArr.get(i).toString());
						String file_name = fileArr.getString(i);
						log.info("file_name:" + file_name);
						HashMap<String, Object> filesMap = new HashMap<>();

						filesMap.put("goverNo", str_GOVERNO);
						filesMap.put("seq", String.format("%06d", i));
						filesMap.put("fseq", nseq + i);
						filesMap.put("fname", file_name);

						String tempPath = GC.getGoverFileTempDir(); // 설정파일로 뺀다.
						String dataPath = GC.getGoverFileDataDir() + "/" + str_GOVERNO; // 설정파일로 뺀다.
						filesMap.put("fpath", dataPath + "/" + file_name);
						
						CommonUtil.moveFile(file_name, tempPath, dataPath);
						
						log.info("filesMap:" + filesMap);
						mainService.InsertQuery("goverSQL.insertGoverUploadData", filesMap);

					}
				}
			}

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
		map.put("GOVERNO", str_GOVERNO);
		map.put("result", list);

		log.info("gubun ::" + gubun);
		log.info("serverName :: " + GC.getServerName());
		
		JSONObject jo = new JSONObject(map);

		response.setCharacterEncoding("UTF-8");
		response.setHeader("Access-Control-Allow-Origin", "*");
		response.resetBuffer();
		response.setContentType("application/json");
		response.getWriter().print(jo);
		response.getWriter().flush();

	}

	// 점용 상신
	@PostMapping(path = "/selectGoverEcho")
	public void selectGoverEcho(HttpServletRequest request, HttpServletResponse response) throws Exception {
//			ArrayList list = new ArrayList();
//			ArrayList togiList = new ArrayList();
//			ArrayList fileList = new ArrayList();
//
//			ParameterParser parser = new ParameterParser(request);
//			String gover_no = parser.getString("GOVER_NO", "");
//			String type = parser.getString("TYPE", "");
//
//			/*** 파라미터 하드코딩 ***/
//			// gover_no = "G_000201";
//			// type = "update";
//			/*** 파라미터 하드코딩 ***/
//			String str_result = "Y";
//
//			ElectronicPaymentHTML eph = new ElectronicPaymentHTML(); // 상신용 HTML
//			ElectronicPaymentUtil epc = new ElectronicPaymentUtil(); // 전자결재 연계
//			CommonUtil cu = new CommonUtil();
//
//			String str_appNo = cu.getNextAppovalSeq();
//			boolean res_Echo = false;
//
//			HashMap map = new HashMap();
//
//			if ("".equals(str_appNo)) {
//				map.put("message", "N");
//			} else {
//				String str_UserId = String.valueOf(request.getSession().getAttribute("userId"));
//				String str_userName = String.valueOf(request.getSession().getAttribute("userName"));
//				String str_userDeptcd = String.valueOf(request.getSession().getAttribute("userDeptcd"));
//				String str_userDeptnm = String.valueOf(request.getSession().getAttribute("userDeptnm"));
//				String str_userUPDeptcd = String.valueOf(request.getSession().getAttribute("userUPDeptcd"));
//				res_Echo = epc.GetPLMSDataforXML(str_appNo, eph.getGover_HTML("", gover_no, "", "", "", request, response), str_UserId, "", "", "GetHoldUsageDataforXML", str_userName, str_userDeptcd, str_userDeptnm, str_userUPDeptcd);
//			}
//
//			if (res_Echo) {
//
//				// 문서번호 업데이트
//				map.put("DOCKEY", str_appNo);
//				map.put("message", "Y");
//				map.put("GOVER_NO", gover_no);
//				Database.getInstance().update("Json.updateGoverEchoNo", map);
//
//				// System.out.println("%%%%%%%%%%%%map=" + map);
//				// 문서 URL조회
//				ArrayList echolist = (ArrayList) Database.getInstance().queryForList("Json.selectGoverDocInfo", map);
//				if (null != echolist && echolist.size() > 0) {
//					String str_EchoNo = String.valueOf(((HashMap) echolist.get(0)).get("OUT_URL"));
//					System.out.println("str_EchoNo=====" + str_EchoNo);
//					map.put("OUT_URL", str_EchoNo);
//				}
//
//			} else {
//				map.put("message", "N");
//			}

		JSONObject jo = new JSONObject("");

		response.setCharacterEncoding("UTF-8");
		response.setHeader("Access-Control-Allow-Origin", "*");
		response.resetBuffer();
		response.setContentType("application/json");
		response.getWriter().print(jo);
		response.getWriter().flush();
	}

	// 승인처리 / 반려처리
	@PostMapping(path = "/updateGoverSaveStatus")
	public void updateGoverSaveStatus(HttpServletRequest request, HttpServletResponse response) throws Exception {
		String requestParams = ParameterUtil.getRequestBodyToStr(request);
		JSONObject requestParamsObj = new JSONObject(requestParams);
		log.info("requestParams:" + requestParams);

		ArrayList list = new ArrayList();
		ParameterParser parser = new ParameterParser(request);

		String goverNo = requestParamsObj.getString("goverNo");
		String saveStatus = (!requestParamsObj.has("saveStatus") || requestParamsObj.getString("saveStatus") == null)
				? ""
				: requestParamsObj.getString("saveStatus");
		String str_result = "Y";
		try {

			HashMap params = new HashMap();
			params.put("GOVER_NO", goverNo);
			params.put("SAVE_STATUS", saveStatus);

			System.out.println("updateGoverSaveStatus params=" + params);

			mainService.UpdateQuery("goverSQL.updateGoverMasterStatus", params);

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

		JSONObject jo = new JSONObject(map);

		response.setCharacterEncoding("UTF-8");
		response.setHeader("Access-Control-Allow-Origin", "*");
		response.resetBuffer();
		response.setContentType("application/json");
		response.getWriter().print(jo);
		response.getWriter().flush();
	}

	@PostMapping(path = "/insertOfficeMng")
	@ResponseBody // JSON 응답을 위해 추가
	public HashMap<String, Object> insertOfficeMng(HttpServletRequest request) {
		HashMap<String, Object> responseMap = new HashMap<>();
		List<HashMap<String, Object>> targetInfo = new ArrayList<>();
		String str_result = "Y";
		String msgType = "";

		try {
			String requestParams = ParameterUtil.getRequestBodyToStr(request);
			JSONObject requestParamsObj = new JSONObject(requestParams);
			log.info("requestParams:" + requestParams);

			HashMap<String, Object> params = new HashMap<>();
			String JISA = requestParamsObj.getString("jisa");
			String PMT_OFFICE = requestParamsObj.getString("pmt_office");
			String ADM_OFFICE = requestParamsObj.getString("adm_office");
			String GUBUN = requestParamsObj.getString("gubun");

			String str_adm_seq = "";

			if ("modify".equals(GUBUN)) {
				str_adm_seq = requestParamsObj.getString("adm_seq");
				params.put("seq", str_adm_seq);
				targetInfo = (ArrayList) mainService.selectQuery("goverSQL.selectOfficeTargetInfo", params);
				log.info("targetInfo:" + targetInfo.toString());
			} else {

				// so_adm_seq 가져오기
				ArrayList<HashMap<String, Object>> tmp = (ArrayList) mainService
						.selectQuery("goverSQL.selectMaxOfficeMng", params);
				String mx_adm_seq = tmp.get(0).get("mx_adm_seq").toString();
				log.info("mx_adm_seq:" + mx_adm_seq);
				str_adm_seq = mx_adm_seq;
			}
			// Insert params
			params.put("ADM_SEQ", Long.parseLong(str_adm_seq));
			params.put("JISA", JISA);
			params.put("PMT_OFFICE", PMT_OFFICE);
			params.put("ADM_OFFICE", ADM_OFFICE);
			params.put("APPROVE", "N");

			log.info("insertOfficeMng params=" + params);
			if ("modify".equals(GUBUN)) {
				mainService.UpdateQuery("goverSQL.updateOfficeMng", params); // 기본정보 저장
				msgType = "수정";

			} else {
				mainService.InsertQuery("goverSQL.insertOfficeMng", params); // 기본정보 저장
				msgType = "등록";
			}

			if ("modify".equals(GUBUN)) {
				params.put("GUBUN", "수정");
				StringBuilder reason = new StringBuilder();

				if (!JISA.equals(targetInfo.get(0).get("jisa"))) {
					reason.append("관리지사 = ").append(targetInfo.get(0).get("jisa")).append(" -> ").append(JISA)
							.append("<br />");
				}
				if (!PMT_OFFICE.equals(targetInfo.get(0).get("pmt_office"))) {
					reason.append("허가관청 = ").append(targetInfo.get(0).get("pmt_office")).append(" -> ")
							.append(PMT_OFFICE).append("<br />");
				}
				if (!ADM_OFFICE.equals(targetInfo.get(0).get("adm_office"))) {
					reason.append("관리기관 = ").append(targetInfo.get(0).get("adm_office")).append(" -> ")
							.append(ADM_OFFICE).append("<br />");
				}
				String brTag = "<br />";
				if (reason.length() >= brTag.length()
						&& reason.substring(reason.length() - brTag.length()).equals(brTag)) {
					reason.delete(reason.length() - brTag.length(), reason.length());
				}
				params.put("CONT", reason.toString());
			} else {
				params.put("GUBUN", "신규등록");
				String reason = "관리지사 = " + JISA + ", 허가관청 = " + PMT_OFFICE + ", 관리기관 = " + ADM_OFFICE;
				params.put("CONT", reason);
//		            mainService.InsertQuery("goverSQL.insertOfficeHistory", params);
			}

			// History 저장 (필요 시)
			mainService.InsertQuery("goverSQL.insertOfficeHistory", params);

			responseMap.put("success", "Y");
			responseMap.put("message", msgType + " 성공");
		} catch (Exception e) {
			log.error("Error during insertOfficeMng", e);
			str_result = "N";
			responseMap.put("success", "N");
			responseMap.put("message", msgType + " 실패");
		}

		return responseMap;
	}

	// 점용관리기관조회
	@PostMapping(path = "/selectOfficeInfoAll")
	public void selectOfficeInfoAll(HttpServletRequest request, HttpServletResponse response) throws Exception {
		String requestParams = ParameterUtil.getRequestBodyToStr(request);
		JSONObject requestParamsObj = new JSONObject(requestParams);
		log.info("requestParams:" + requestParams);

		ArrayList list = new ArrayList();
		ArrayList addlist = new ArrayList();

		ParameterParser parser = new ParameterParser(request);

		String str_result = "Y";
		ArrayList returnList = new ArrayList();
		try {

			HashMap params = new HashMap();

			String JISA = requestParamsObj.getString("JISA");
			params.put("JISA", JISA);

			list = (ArrayList) mainService.selectQuery("goverSQL.selectOfficeInfoAll", params);

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
		map.put("loginKey", String.valueOf(request.getSession().getAttribute("loginKey")));

		JSONObject jo = new JSONObject(map);

		response.setCharacterEncoding("UTF-8");
		response.setHeader("Access-Control-Allow-Origin", "*");
		response.resetBuffer();
		response.setContentType("application/json");
		response.getWriter().print(jo);
		response.getWriter().flush();
	}

	// 점용관리기관등록시 기존데이터가 있을때
	@PostMapping(path = "/getselectOfficeMng")
	public void getselectOfficeMng(HttpServletRequest request, HttpServletResponse response) throws Exception {
		String requestParams = ParameterUtil.getRequestBodyToStr(request);
		JSONObject requestParamsObj = new JSONObject(requestParams);
		log.info("requestParams:" + requestParams);

		ArrayList list = new ArrayList();
		ArrayList addlist = new ArrayList();

		ParameterParser parser = new ParameterParser(request);

		String str_result = "Y";
		ArrayList returnList = new ArrayList();
		try {

			HashMap params = new HashMap();

			String JISA = requestParamsObj.getString("jisa");
			params.put("JISA", JISA);

			list = (ArrayList) mainService.selectQuery("goverSQL.selectOfficeInfoAll", params);

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
		map.put("loginKey", String.valueOf(request.getSession().getAttribute("loginKey")));

		JSONObject jo = new JSONObject(map);

		response.setCharacterEncoding("UTF-8");
		response.setHeader("Access-Control-Allow-Origin", "*");
		response.resetBuffer();
		response.setContentType("application/json");
		response.getWriter().print(jo);
		response.getWriter().flush();
	}

	// 관리기관 관리 - 승인 대기 팝업
	@PostMapping(path = "/getGoverOfficeMngEditPage") // http://localhost:8080/api/get/dbTest
	public ModelAndView getGoverOfficeMngEditPage(HttpServletRequest httpRequest, HttpServletResponse response)
			throws Exception {
		ModelAndView mav = new ModelAndView();

		// log.info("httpRequest:"+Arrays.toString(httpRequest))

		String idx = httpRequest.getParameter("idx");

		HashMap params = new HashMap();
		params.put("idx", idx);
		log.info("params: " + params);

		ArrayList<HashMap> list = mainService.selectQuery("goverSQL.selectOfficeInfo", params);
		log.info("list: " + list.get(0));

		params.put("seq", list.get(0).get("adm_seq"));
		ArrayList<HashMap> historyList = mainService.selectQuery("goverSQL.selectOfficeHistoryList", params);
		// log.info("addressList:"+addressList);
		mav.addObject("data", list.get(0));
		mav.addObject("historyList", historyList);
		log.info("historyList:" + historyList);
		mav.setViewName("content/gover/orgAdmin :: #approve_Popup");
		return mav;
	}

	// 관리기관 관리 - 승인
	@PostMapping(path = "/approveGoverOffice")
	public ResponseEntity<String> approveGoverOffice(HttpServletRequest request) throws Exception {
		String idx = request.getParameter("idx");

		if (idx == null || idx.isEmpty()) {
			return ResponseEntity.badRequest().body("Invalid idx");
		}

		HashMap<String, Object> params = new HashMap<>();
		params.put("idx", idx);

		// so_approve 값을 Y로 업데이트
		int result = (int) mainService.UpdateQuery("goverSQL.updateApproveStatus", params);

		if (result > 0) {
			return ResponseEntity.ok("Success");
		} else {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to update approval status");
		}
	}

	// 점용 상신취소
	@PostMapping(path = "/updateSangsinCancel")
	public void updateSangsinCancel(HttpServletRequest request, HttpServletResponse response) throws Exception {
		String requestParams = ParameterUtil.getRequestBodyToStr(request);
		JSONObject requestParamsObj = new JSONObject(requestParams);
		log.info("requestParams:" + requestParams);

		ParameterParser parser = new ParameterParser(request);
		String goverNo = requestParamsObj.getString("goverNo");
		String str_result = "Y";
		String str_STATUS = "";
		log.info("=========상신취소=======");
		log.info("goverNo=" + goverNo);

		try {
			HashMap params = new HashMap();
			params.put("GOVERNO", goverNo);

			ArrayList echolist = (ArrayList) mainService.selectQuery("goverSQL.selectGoverDocInfo", params);
			if (null != echolist && echolist.size() > 0) {
				str_STATUS = String.valueOf(((HashMap) echolist.get(0)).get("STATUS"));
			}

			log.info("str_STATUS=" + str_STATUS);
			log.info("========================");

			if (str_STATUS == null || str_STATUS.equals(""))
				mainService.UpdateQuery("goverSQL.updateGoverMasterDockey", params);

		} catch (Exception e) {
			str_result = "N";
			e.printStackTrace();
		}
		HashMap map = new HashMap();
		map.put("message", str_result);
		map.put("status", str_STATUS);

		JSONObject jo = new JSONObject(map);

		response.setCharacterEncoding("UTF-8");
		response.setHeader("Access-Control-Allow-Origin", "*");
		response.resetBuffer();
		response.setContentType("application/json");
		response.getWriter().print(jo);
		response.getWriter().flush();

	}

	// 점용마스트 > 신규이슈등록버튼 이벤트 - ljs WORKING
//		public void goverNewIssueNewSave(HttpServletRequest request, HttpServletResponse response) throws Exception {
//					ArrayList list = new ArrayList();
//					ArrayList pmlist = new ArrayList();
//					ParameterParser parser = new ParameterParser(request);
//					log.info(parser);
//					String gover_no = parser.getString("gover_no", "");
//					String newRegReason = parser.getString("newRegReason", "");
//					String newRegReasonContent = parser.getString("newRegReasonContent", "");
//					String permPossYn = parser.getString("permPossYn", "");
//					String occuNonPayReason = parser.getString("occuNonPayReason", "");
//					String prepayYn=parser.getString("prepayYn", "");
//					String occuPrePayDate=parser.getString("occuPrePayDate","");
//					
//					Map params = new HashMap();
//					
//					params.put("GOVER_NO",gover_no);
//					params.put("NEWREGREASON", newRegReason);
//					params.put("NEWREGREASONCONTENT", newRegReasonContent);
//					params.put("PERMPOSSYN",permPossYn);
//					params.put("OCCUNONPAYREASON", occuNonPayReason);
//					params.put("PREPAYYN", prepayYn);
//					params.put("OCCUPREPAYDATE",occuPrePayDate);
//					log.info("params:"+params);
//					try {
//						 Database.getInstance().update("Json.updateGoverMasterNew", params);
//						list = (ArrayList) Database.getInstance().queryForList("Json.selectNewIssueList", params);
//					} catch (Exception e) { e.printStackTrace(); }
//					
//					System.out.println(list.toString());
//					log.info(list.toString());
//					
//					if (list.size()>0) {
//						//기존 내용이 있다면 강제로 지우고 다시 등록한다.
//						try {
//							//LJSWORK
//							//params.put("SEQ",))
//							list.clear();
//							Database.getInstance().update("Json.deleteNewIssue", params);
//							list = (ArrayList) Database.getInstance().queryForList("Json.selectNewIssueList", params);
//						}  catch (Exception e) { e.printStackTrace(); }
//						
//					}
//					
//					//params.put("CODE_DEPTH1", "DY010000");	// 이슈없음
//					//params.put("CODE_DEPTH2", "DY010100");	// 이슈없음
//				//	params.put("CODE_DEPTH3", "DY010101");	// 이슈없음
////					params.put("CODE_DEPTH1", CODE_DEPTH1);
////					params.put("CODE_DEPTH2", CODE_DEPTH2);
////					params.put("CODE_DEPTH3", CODE_DEPTH3);
////					params.put("ISSUE_COMMENT", ISSUE_COMMENT);
////					params.put("HISTORY_TYPE", HISTORY_TYPE);
////					params.put("HISTORY_CONTENT", HISTORY_CONTENT);
////					params.put("REGISTED_YN", REGISTED_YN);
////					params.put("PERMITTED_YN", PERMITTED_YN);
////					params.put("LNEWREG", newRegReason);
////					params.put("LPERMITIONYN", permPossYn);
////					params.put("LOCCUP_FEE", LOCCUP_FEE);
////					params.put("LPREPAY", LPREPAY);
//					//1 해당 디비에서 gover_no 로 등록된 것이 있는지 확인
//					String SEQ="";
//					HashMap map = new HashMap();
//					log.info("list size:"+list.size());
//					if (list.size()<=0) {
//						//신규추가 입력
//						map.put("message","Y");
//						pmlist = (ArrayList) Database.getInstance().queryForList("Json.selectgoverpermt", params);
//						log.info("pmlist size:"+pmlist.size());
//						if (pmlist.size()>0) {
//							HashMap pmMapList = (HashMap) pmlist.get(0);
//							
//							
//							
//							log.info("pay date:"+pmMapList.get("PAY_DATE"));
//							log.info("pmt_et_date:"+pmMapList.get("PMT_ED_DATE"));
//							log.info(pmMapList);
//							log.info(pmlist);
//							log.info("["+gover_no.substring(0,1)+"]");
//							log.info("pmlist paydate:"+pmlist.get(0));
//						
//							
//							//납부기한 초과 체크
////							DateTimeFormatter formatter=DateTimeFormatter.ofPattern("yyyy-MM-dd");
////							LocalDate date1 = LocalDate.parse(pmMapList.get("PAY_DATE").toString(),formatter);
////							LocalDate date2 = LocalDate.now();
////							LocalDate date3 = LocalDate.parse(pmMapList.get("PMT_ED_DATE").toString(),formatter);
//							
//							
//							Calendar getToday = Calendar.getInstance();
//							getToday.setTime(new Date());
//							Date date = new SimpleDateFormat("yyyy-MM-dd").parse(pmMapList.get("PAY_DATE").toString());
//							Date pmdate = new SimpleDateFormat("yyyy-MM-dd").parse(pmMapList.get("PMT_ED_DATE").toString());
//							
//							Calendar toDay=Calendar.getInstance();
//							toDay.setTime(date);
//							
//							Calendar toDay1=Calendar.getInstance();
//							toDay1.setTime(pmdate);
//							
//							
//							long diffSec = (getToday.getTimeInMillis()-toDay.getTimeInMillis())/1000;
//							long diffDays=diffSec/(24*60*60);
//							
//							long diffSec1 = (toDay1.getTimeInMillis()-getToday.getTimeInMillis())/1000;
//							long diffDays1=diffSec1/(24*60*60);
//							
//							
//							log.info("diffdays="+diffDays);
//							log.info("diffdays1="+diffDays1);
//							
//							
//							//카테고리 매칭 시작
//							//log.info("status:"+pmMapList.get("JISANG_STATUS"));
//							//String jisanStatus=pmMapList.get("JISANG_STATUS").toString();
//							//점용 미점용 세팅
//							if ("G".equals(gover_no.substring(0,1))){ //점용
//								params.put("REGISTED_YN", "GY");
//							}
//							else if("N".equals(gover_no.substring(0,1))) { //미점용
//								params.put("REGISTED_YN", "GN");
//							}
//							
//							
//							/*
//							 * //허가증 보유여부에 따라 납부 미납부로 나뉜다 if ("Y".equals(permPossYn)) { //허가증 보유 //대분류 if
//							 * (diffDays<365) { params.put("CODE_DEPTH1", "GY010000"); //점용료 납부
//							 * params.put("CODE_DEPTH2", "GY010100"); //이슈없음 params.put("CODE_DEPTH3",
//							 * "GY010101"); //이슈없음 } else if (diffDays>365 ||
//							 * pmMapList.get("PAY_DATE").toString().equals("") ) { params.put("CODE_DEPTH1",
//							 * "GY020000"); //점용료 미납부 } } else { if (diffDays<365) params.put("CODE_DEPTH1",
//							 * "GY010000"); else if (diffDays>365 ||
//							 * pmMapList.get("PAY_DATE").toString().equals("") ) params.put("CODE_DEPTH1",
//							 * "GY030000"); }
//							 * 
//							 * 
//							 * 
//							 * //중분류 세팅 if ( "1".equals(occuNonPayReason) || "2".equals(occuNonPayReason) ||
//							 * "1".equals(prepayYn)) { //점용료 납부이면서 이슈없음 params.put("CODE_DEPTH2",
//							 * "GY020100"); //이슈없음 } else if ("N".equals(permPossYn) &&
//							 * ("1".equals(occuNonPayReason) || "2".equals(occuNonPayReason) ||
//							 * "1".equals(prepayYn))) { //점용료 납부이면서 이슈없음 params.put("CODE_DEPTH2",
//							 * "GY020100"); //이슈없음 } else if (diffDays>365 || "3".equals(occuNonPayReason))
//							 * params.put("CODE_DEPTH2", "GY020200"); //관리관청의 미청구 else if
//							 * ("1".equals(newRegReason)) params.put("CODE_DEPTH2", "GN040300"); //토지소유자 변경
//							 * 주로 미점용 허가증 미보유시 기존 체크 이나 변경 신규매칭 방법으로 else if ("2".equals(newRegReason))
//							 * params.put("CODE_DEPTH2", "GN010200"); //신규발견
//							 * 
//							 */
//							
//							//세분류 를 기준으로 위로 역세팅
//							if (diffDays<365) {
//								params.put("CODE_DEPTH3", "GY010101"); //이슈없음
//								params.put("CODE_DEPTH2", "GY010100"); //이슈없음
//								params.put("CODE_DEPTH1", "GY010000");//점용료납부
//								params.put("HISTORY_CONTENT", "신규 등록: [점용료납부 &gt; 이슈없음 &gt; 이슈없음], 사유: [신규등록]");
//								params.put("PERMITTED_YN", "Y");
//								
//							}
//							
//							else if ("1".equals(occuNonPayReason)) {
//								params.put("CODE_DEPTH3", "GY020101"); //영구무상점용
//								params.put("CODE_DEPTH2", "GY020100"); //이슈없음
//								params.put("CODE_DEPTH1", "GY020000"); //점용료 미납부
//								params.put("HISTORY_CONTENT", "신규 등록: [점용료미납부 &gt; 이슈없음 &gt; 영구무상점용], 사유: [신규등록]");
//								params.put("PERMITTED_YN", "Y");
//							}
//							else if ("2".equals(occuNonPayReason)) {
//								params.put("CODE_DEPTH3", "GY020102"); //소액미청구
//								params.put("CODE_DEPTH2", "GY020100"); //이슈없음
//								params.put("CODE_DEPTH1", "GY020000"); //점용료 미납부
//								params.put("HISTORY_CONTENT", "신규 등록: [점용료미납부 &gt; 이슈없음 &gt; 소액미청구], 사유: [신규등록]");
//								params.put("PERMITTED_YN", "Y");
//							}
//							else if ("1".equals(prepayYn) && diffDays< 365 ) {
//								params.put("CODE_DEPTH3", "GY020103"); //점용료 선납 기타 조건 검토 해야함
//								params.put("CODE_DEPTH2", "GY020100"); //이슈없음
//								params.put("CODE_DEPTH1", "GY020000"); //점용료 미납부
//								params.put("HISTORY_CONTENT", "신규 등록: [점용료미납부 &gt; 이슈없음 &gt; 점용료 선납], 사유: [신규등록]");
//								params.put("PERMITTED_YN", "Y");
//							}
//							else if ("1".equals(newRegReason)) {
//								params.put("CODE_DEPTH3", "GN010101"); //사유지의 국유지 편입
//								params.put("CODE_DEPTH2", "GN010100"); //토지소유자발견
//								params.put("CODE_DEPTH1", "GN010000"); //점용료 미납부
//								params.put("HISTORY_CONTENT", "신규 등록: [점용료미납부 &gt; 토지소유자발견 &gt; 사유지의 국육지 편입], 사유: [신규등록]");
//								params.put("PERMITTED_YN", "N");
//							}
//							else if ("2".equals(newRegReason)) {
//								params.put("CODE_DEPTH3", "GN010201"); //ILI조사결과 확인
//								params.put("CODE_DEPTH2", "GN010200");//신규발견
//								params.put("CODE_DEPTH1", "GN010000");//점용료미납부
//								params.put("HISTORY_CONTENT", "신규 등록: [점용료미납부 &gt; 신규발견 &gt; ILI조사결과 학인], 사유: [신규등록]");
//								params.put("PERMITTED_YN", "N");
//								
//							}
//							else if ((diffDays>365 || "3".equals(occuNonPayReason))&& diffDays1>0) {
//								params.put("CODE_DEPTH3", "GY020201"); //점용기간 미경과
//								params.put("CODE_DEPTH2", "GY020200"); //관리관청의 미청구
//								params.put("CODE_DEPTH1", "GY020000"); //점용료 미납부
//								params.put("HISTORY_CONTENT", "신규 등록: [점용료미납부 &gt; 관리관청의 미청구 &gt; 점용기간 미경과], 사유: [신규등록]");
//								params.put("PERMITTED_YN", "Y");
//							}
//							else if ((diffDays>365 || "3".equals(occuNonPayReason))&& diffDays1<0) {
//								params.put("CODE_DEPTH3", "GY020202"); //점용기간 경과
//								params.put("CODE_DEPTH2", "GY020200"); //관리관청의 미청구
//								params.put("CODE_DEPTH1", "GY020000"); //점용료미납부
//								params.put("HISTORY_CONTENT", "신규 등록: [점용료미납부 &gt; 관리관청의 미청구 &gt; 점용기간 경과], 사유: [신규등록]");
//								params.put("PERMITTED_YN", "Y");
//							}
//							
//							else if ("N".equals(permPossYn)) {
//								params.put("CODE_DEPTH3", "GY030101"); //허가재검증
//								params.put("CODE_DEPTH2", "GY030100"); //관리관청의미청구
//								params.put("CODE_DEPTH1", "GY030000"); //점용료 미납부
//								params.put("HISTORY_CONTENT", "신규 등록: [점용료미납부 &gt; 관리관청의 미청구 &gt; 허가재검증], 사유: [신규등록]");
//								params.put("PERMITTED_YN", "N");
//							}
//						}
//						
//						//else if ()
//						params.put("LNEWREG", newRegReason);
//						params.put("LPERMITIONYN", permPossYn);
//						params.put("ISSUE_COMMENT", newRegReasonContent);
//						params.put("HISTORY_TYPE", "신규 등록");
//						//params.put("HISTORY_CONTENT", "변경되는 모든 내용 변경 ");
//						
//						log.info(params);
//						//만들 마지막 seq를 가져온다.
//						SEQ = (String) Database.getInstance().queryForObject("Json.makeGoverIssueSeq", params);
//						map.put("newseq",SEQ);
//						
//						
//						int result = Database.getInstance().update("Json.insertGoverIssue", params);
//						
//						log.info("LJS result:"+result);
//						//Database.getInstance().insert("Json.insertNewIssueItem", params);
//						if (result > 0) {
//							//Database.getInstance().update("Json.insertPnuIssueHistory", params);
//							Database.getInstance().update("Json.insertGoverIssueHistory", params);
//						}
//					}
//					else {
//						map.put("message","N");
//					}
//					
//					//map.put("result",list);
//					
//					/*
//					 * if (list != null) map.put("count", list.size()); else map.put("count", 0);
//					 * 
//					 * map.put("message", str_result); map.put("result", list);
//					 */
//
//					JSONObject jo = new JSONObject(map);
//
//					response.setCharacterEncoding("UTF-8");
//					response.setHeader("Access-Control-Allow-Origin", "*");
//					response.resetBuffer();
//					response.setContentType("application/json");
//					response.getWriter().print(jo);
//					response.getWriter().flush();
//				}

	// 관리기관 관리 - 수정 팝업
	@PostMapping(path = "/getGoverOfficeMngHistoryList") // http://localhost:8080/api/get/dbTest
	public ResponseEntity<?> getGoverOfficeMngHistoryList(HttpServletRequest request, HttpServletResponse response)
			throws Exception {
		ModelAndView mav = new ModelAndView();

		// log.info("httpRequest:"+Arrays.toString(httpRequest))

		String requestParams = ParameterUtil.getRequestBodyToStr(request);
		System.out.println("requestParams:" + requestParams);
		JSONObject requestParamsObj = new JSONObject(requestParams);
		System.out.println();
		log.info("requestParams:" + requestParams);

		System.out.println("sdjfkljalsjfklasjklfjkladsj :: " + requestParamsObj.getString("adm_seq"));
		String idx = requestParamsObj.getString("adm_seq");

		HashMap params = new HashMap();
		params.put("seq", idx);
		log.info("params: " + params);

		ArrayList<HashMap> historyList = mainService.selectQuery("goverSQL.selectOfficeHistoryList", params);
		// log.info("addressList:"+addressList);
		mav.addObject("historyList", historyList);
		log.info("historyList:" + historyList);
		mav.setViewName("/gover/orgAdmin :: #approve_correction_Popup");
		return ResponseEntity.ok(historyList);
	}

	@PostMapping(path = "/selectSysCodeList")
	public void selectSysCodeList(HttpServletRequest request, HttpServletResponse response) throws Exception {

		// 여기임
		Map<String, String> requestMap = CommonUtil.requestConvertMap(request);

		JSONObject paramObject = new JSONObject(requestMap.toString());

		ArrayList list = new ArrayList();
		ArrayList addlist = new ArrayList();

		String groupCode = paramObject.optString("CODE_GROUP", "");

		if ("-".equals(groupCode)) {
			groupCode = "";
		}

		System.out.println(paramObject.toString());

		/*******************
		 * 
		 * 세션 테스트 241004
		 * 
		 *******************/
		Object checkId = request.getSession().getAttribute("userId");
		System.out.println("checkId :: " + checkId);
		System.out.println("checkId :: " + checkId);
		System.out.println("checkId :: " + checkId);
		System.out.println("checkId :: " + checkId);

		String str_result = "Y";
		ArrayList returnList = new ArrayList();
		try {

			HashMap params = new HashMap();
			params.put("GROUP_CODE", groupCode);

			list = (ArrayList) mainService.selectQuery("goverSQL.selectSysCodeList", params);

			if (list.size() > 0) {
				for (int i = 0; i < list.size(); i++) {
					HashMap hm = new HashMap();
					hm.put("sc_code", (String) ((HashMap) list.get(i)).get("sc_code"));
					hm.put("sc_code_name", (String) ((HashMap) list.get(i)).get("sc_code_name"));
					hm.put("sc_group_code", (String) ((HashMap) list.get(i)).get("sc_group_code"));
					hm.put("sc_sort_order", String.valueOf(((HashMap) list.get(i)).get("sc_sort_order")));
					hm.put("sc_use_yn", (String) ((HashMap) list.get(i)).get("sc_use_yn"));
					returnList.add(hm);
				}
			}

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
		map.put("result", returnList);
		map.put("loginKey", String.valueOf(request.getSession().getAttribute("loginKey")));

		JSONObject jo = new JSONObject(map);

		response.setCharacterEncoding("UTF-8");
		response.setHeader("Access-Control-Allow-Origin", "*");
		response.resetBuffer();
		response.setContentType("application/json");
		response.getWriter().print(jo);
		response.getWriter().flush();
	}

	@PostMapping(path = "/insertSysCode")
	public void insertSysCode(HttpServletRequest request, HttpServletResponse response) throws Exception {

		Map<String, String> requestMap = CommonUtil.requestConvertMap(request);

		JSONObject jsonRequest = new JSONObject(requestMap.toString());

		String CODE = jsonRequest.optString("NEW_CODE", "");
		String GROUP_CODE = jsonRequest.optString("NEW_GROUP_CODE", "");
		String CODE_NAME = URLDecoder.decode(jsonRequest.optString("NEW_CODE_NAME", ""));
		Integer SORT_ORDER = jsonRequest.optInt("NEW_SORT_ORDER", 99);
		String USE_YN = jsonRequest.optString("USE_YN", "Y");

		String str_result = "Y";

		try {

			HashMap params = new HashMap();
			params.put("GROUP_CODE", GROUP_CODE);
			params.put("CODE", CODE);
			params.put("CODE_NAME", CODE_NAME);
			params.put("SORT_ORDER", SORT_ORDER);
			params.put("USE_YN", USE_YN);

			System.out.println("insertSysCode params=" + params);

			// SORT_ORDER만 UPDATE함으로 생략
//				mainService.InsertQuery("goverSQL.updateSysCodeSortOrder", params);

			// 신규 시스템 코드 등록
			mainService.InsertQuery("goverSQL.insertSysCode", params); // 기본정보

		} catch (Exception e) {
			str_result = "N";
			e.printStackTrace();
		}

		HashMap map = new HashMap();
		map.put("message", str_result);
		map.put("loginKey", String.valueOf(request.getSession().getAttribute("loginKey")));

		JSONObject jo = new JSONObject(map);

		response.setCharacterEncoding("UTF-8");
		response.setHeader("Access-Control-Allow-Origin", "*");
		response.resetBuffer();
		response.setContentType("application/json");
		response.getWriter().print(jo);
		response.getWriter().flush();
	}

	@PostMapping(path = "/updateSysCode")
	public void updateSysCode(HttpServletRequest request, HttpServletResponse response) throws Exception {

		StringBuilder sb = new StringBuilder();
		String line;

		try (BufferedReader reader = request.getReader()) {
			while ((line = reader.readLine()) != null) {
				sb.append(line);
			}
		}

		// POST형식으로 넘어온 param을 Map 타입으로 변형
		Map<String, String> testMap = CommonUtil.convertQueryStringToJson(sb.toString());

		JSONObject jsonRequest = new JSONObject(testMap.toString());

		String NEW_GROUP_CODE = jsonRequest.optString("NEW_GROUP_CODE", "");
		String NEW_CODE = jsonRequest.optString("NEW_CODE", "");
		String NEW_CODE_NAME = URLDecoder.decode(jsonRequest.optString("NEW_CODE_NAME", ""));
		String NEW_SORT_ORDER = jsonRequest.optString("NEW_SORT_ORDER", "");
		String USE_YN = jsonRequest.optString("USE_YN", "Y");

		String ORIGIN_NEW_GROUP_CODE = jsonRequest.optString("ORIGIN_NEW_GROUP_CODE", "");
		String ORIGIN_CODE = jsonRequest.optString("ORIGIN_CODE", "");
		String ORIGIN_CODE_NAME = URLDecoder.decode(jsonRequest.optString("ORIGIN_CODE_NAME", ""));
		String ORIGIN_SORT_ORDER = jsonRequest.optString("ORIGIN_SORT_ORDER", "");

		String str_result = "Y";

		try {

			HashMap params = new HashMap();
			// 새로 갱신될 시스템 코드의 정보
			params.put("NEW_GROUP_CODE", NEW_GROUP_CODE);
			params.put("NEW_CODE", NEW_CODE);
			params.put("NEW_CODE_NAME", NEW_CODE_NAME);
			params.put("NEW_SORT_ORDER", Integer.parseInt(NEW_SORT_ORDER));
			params.put("USE_YN", USE_YN);

			// 갱신될 시스템 코드의 원래 정보
			params.put("ORIGIN_NEW_GROUP_CODE", ORIGIN_NEW_GROUP_CODE);
			params.put("ORIGIN_CODE", ORIGIN_CODE);
			params.put("ORIGIN_CODE_NAME", ORIGIN_CODE_NAME);
			params.put("ORIGIN_SORT_ORDER", Integer.parseInt(ORIGIN_SORT_ORDER));

//				System.out.println("updateSysCode params=" + params);

			// 241002 :: SORT_ORDER만 갱신하는 쿼리 - SORT_ORDER만 갱신하는 기능이 아니기 때문에 주석 처리
//				mainService.InsertQuery("goverSQL.updateSysCodeSortOrder", params); // 기본정보

			// 시스템코드 정보 갱신 쿼리
			mainService.InsertQuery("goverSQL.updateSysCode", params); // 기본정보

		} catch (Exception e) {
			str_result = "N";
			e.printStackTrace();
		}

		HashMap map = new HashMap();
		map.put("message", str_result);
		map.put("loginKey", String.valueOf(request.getSession().getAttribute("loginKey")));

		JSONObject jo = new JSONObject(map);

		response.setCharacterEncoding("UTF-8");
		response.setHeader("Access-Control-Allow-Origin", "*");
		response.resetBuffer();
		response.setContentType("application/json");
		response.getWriter().print(jo);
		response.getWriter().flush();
	}

	@PostMapping(path = "/deleteOfficeMng")
	@ResponseBody // JSON 응답을 위해 추가
	public HashMap<String, Object> deleteOfficeMng(HttpServletRequest request) {
		HashMap<String, Object> responseMap = new HashMap<>();
		String msgType = "";
		String str_result = "";
		try {
			String requestParams = ParameterUtil.getRequestBodyToStr(request);
			JSONObject requestParamsObj = new JSONObject(requestParams);
			log.info("requestParams:" + requestParams);

			HashMap<String, Object> params = new HashMap<>();
			String ADM_SEQ = requestParamsObj.getString("adm_seq");

			params.put("ADM_SEQ", Long.parseLong(ADM_SEQ));
			mainService.UpdateQuery("goverSQL.deleteOfficeMng", params); // 기본정보 저장

			responseMap.put("success", "Y");
			responseMap.put("message", "삭제 성공");
		} catch (Exception e) {
			log.error("Error during insertOfficeMng", e);
			str_result = "N";
			responseMap.put("success", "N");
			responseMap.put("message", "삭제 실패");
		}

		return responseMap;

	}

	// 점용 마스터 수정 - 소속 토지 정보 - 필지 정보 버튼 - 엑셀 다운로드용
	@PostMapping("/selectPnuExcelDownload")
	public ResponseEntity<Map<String, Object>> selectPnuExcelDownload(@RequestBody Map<String, Object> requestData)
			throws Exception {
		// 요청 데이터에서 pnu 리스트 추출
		ArrayList<String> pnuList = (ArrayList<String>) requestData.get("pnuData");
		log.info("pnuList: " + pnuList);

		// 결과 데이터를 저장할 리스트
		ArrayList<HashMap> resultData = new ArrayList<>();

		// 각 pnu에 대해 반복문을 돌면서 데이터를 가져옴
		for (String pnu : pnuList) {
			HashMap<String, Object> params = new HashMap<>();
			params.put("pnu", pnu);

			// SQL 쿼리 실행하여 pnu에 해당하는 데이터 가져오기
			ArrayList<HashMap> singlePnuData = mainService.selectQuery("goverSQL.selectPnuData", params);
			log.info("singlePnuData: " + singlePnuData);

			// 해당 pnu의 데이터를 resultData에 추가
			if (singlePnuData != null && !singlePnuData.isEmpty()) {
				resultData.addAll(singlePnuData);
			}
		}

		// 결과를 담은 Map 객체 생성
		Map<String, Object> response = new HashMap<>();
		response.put("resultData", resultData);

		// 결과 반환
		return new ResponseEntity<>(response, HttpStatus.OK);
	}

	@RequestMapping(value = "/deleteGoverAtcfile1", method = { RequestMethod.GET, RequestMethod.POST })
	public void deleteGoverAtcfile1(HttpServletRequest httpRequest, HttpServletResponse response) throws Exception {

		// 일반웹형식
		// Properties requestParams = CommonUtil.convertToProperties(httpRequest);
		// log.info("requestParams:"+requestParams);

		// //json으로 넘어올때
		String getRequestBody = ParameterUtil.getRequestBodyToStr(httpRequest);
		boolean result = false;
		String resultMessage = "";
		
		log.info("getRequestBody:" + getRequestBody);
		
		JSONObject json = new JSONObject(getRequestBody.toString());
		JSONArray idxarr = json.getJSONArray("fileIds");
		
		log.info("idxarr:" + idxarr);
		log.info("idxarr0:" + idxarr.get(0));

		int fsize = idxarr.length();

		for (int i = 0; i < fsize; i++) {
			log.info("delete IDX:" + idxarr.get(i));

			HashMap params = new HashMap();
			JSONObject jsonObject = (JSONObject) idxarr.get(i);
			params.put("idx", jsonObject.get("idx"));

			// 파일 삭제 부분.
			// 파일 경로 생성
			String filePath = GC.getGoverFileDataDir() + "/" + jsonObject.get("gover_no"); // 설정파일로 뺀다.
			String originalFilename = jsonObject.get("filename").toString();
			String fileFullPath = filePath + "/" + originalFilename; // 파일 전체 경로

			File file = new File(fileFullPath);
			
			log.info("=============================");
			log.info("* fileFullPath :: " + fileFullPath);
			log.info("=============================");
			
			// 파일이 존재하는지 확인
			if (file.exists()) {
				// 파일 삭제
				if (file.delete()) {
					// 파일 삭제 성공
					log.info("파일 삭제 성공");
					result = true;
					resultMessage = "파일이 삭제되었습니다.";
					//삭제가 성공해야지 지워야함
					mainService.DeleteQuery("goverSQL.deleteGoverAtcFile", params);
				} else {
					// 파일 삭제 실패시 에러
					log.error("===== 파일 삭제에 실패했습니다. =====");
					resultMessage = "파일 삭제에 실패했습니다.";
				}
			} else {
				// 파일 없을때 에러
				log.error("===== 파일이 없습니다. =====");
				resultMessage = "파일이 없습니다.";
			}
		}

		HashMap<String, Object> resultmap = new HashMap();
		resultmap.put("resultCode", "0000");
		resultmap.put("resultData", idxarr);
		resultmap.put("result", result);
		resultmap.put("resultMessage", resultMessage);
		JSONObject obj = new JSONObject(resultmap);

		response.setCharacterEncoding("UTF-8");
		response.setHeader("Access-Control-Allow-Origin", "*");
		response.setHeader("Cache-Control", "no-cache");
		response.resetBuffer();
		response.setContentType("application/json");
		// response.getOutputStream().write(jo);
		response.getWriter().print(obj);
		response.getWriter().flush();
		// return new ModelAndView("dbTest", "list", list);
	}

}
