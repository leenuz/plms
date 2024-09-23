package com.slsolution.plms.dopco;

import java.util.ArrayList;
import java.util.Enumeration;
import java.util.HashMap;
import java.util.Map;
import java.util.Properties;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.scheduling.annotation.EnableAsync;

import org.springframework.web.bind.annotation.*;

import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import org.springframework.web.servlet.ModelAndView;

import com.slsolution.plms.CommonUtil;
import com.slsolution.plms.MainService;
import com.slsolution.plms.ParameterParser;
import com.slsolution.plms.ParameterUtil;
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
@RequestMapping("/dopco")
@CrossOrigin(origins="*",allowedHeaders="*")
public class dopcoController {
	
	@Autowired
	private MainService mainService;
	

	@GetMapping(path="/menu05_1") //http://localhost:8080/api/get/dbTest
    public ModelAndView menu05_1(HttpServletRequest httpRequest, HttpServletResponse response) throws Exception {
//		response.setHeader("X-Frame-Options", "SAMEORIGIN");
//		response.setHeader("Content-Security-Policy", " frame-ancestors 'self'");
		HashMap params = new HashMap();
		ArrayList<HashMap> list=new ArrayList<HashMap>();
		ArrayList<HashMap> jisalist = mainService.selectQuery("commonSQL.selectAllJisaList",params);
		ArrayList<HashMap> sidolist = mainService.selectQuery("commonSQL.getSidoMaster",params);

		ModelAndView mav=new ModelAndView();
		mav.addObject("jisaList",jisalist);
		mav.addObject("sidoList",sidolist);
		mav.setViewName("content/dopco/menu05_1");
		return mav;
	}
	
	
	
	@GetMapping(path="/compLandReg") //http://localhost:8080/api/get/dbTest
    public ModelAndView compLandReg(HttpServletRequest httpRequest, HttpServletResponse response) throws Exception {
//		response.setHeader("X-Frame-Options", "SAMEORIGIN");
//		response.setHeader("Content-Security-Policy", " frame-ancestors 'self'");
		HashMap params = new HashMap();
		ArrayList<HashMap> jimoklist = mainService.selectQuery("commonSQL.selectJimokList",params);
		ArrayList<HashMap> addressList = mainService.selectQuery("jisangSQL.bunhalAddressSearch",params);
		ArrayList<HashMap> jisalist = mainService.selectQuery("commonSQL.selectAllJisaList",params);
		ModelAndView mav=new ModelAndView();
		mav.setViewName("content/dopco/compLandReg");
		mav.addObject("addressList",addressList);
		mav.addObject("resultJimokList",jimoklist);
		mav.addObject("jisaList",jisalist);

		return mav;
	}
	@PostMapping(path="/getBunhalJIjukSelect") //http://localhost:8080/api/get/dbTest
	public ModelAndView getBunhalJIjukSelect(HttpServletRequest httpRequest, HttpServletResponse response) throws Exception {
		ModelAndView mav=new ModelAndView();
		HashMap params = new HashMap();
		ArrayList<HashMap>  list=new ArrayList<HashMap>();
		//log.info("httpRequest:"+Arrays.toString(httpRequest));

		String address=httpRequest.getParameter("address");
		String sido_nm=httpRequest.getParameter("sido_nm");
		String sgg_nm=httpRequest.getParameter("sgg_nm");
		String emd_nm=httpRequest.getParameter("emd_nm");
		String ri_nm=httpRequest.getParameter("ri_nm");
		String jibun=httpRequest.getParameter("jibun");



		params.put("address", address);
		params.put("sido_nm", sido_nm);
		params.put("sgg_nm", sgg_nm);
		params.put("emd_nm", emd_nm);
		params.put("ri_nm", ri_nm);
		params.put("jibun", jibun);



		log.info("params:"+params);
		ArrayList<HashMap> addressList = mainService.selectQuery("commonSQL.selectAddressFromJijuk",params);
		log.info("addressList:"+addressList);
		mav.addObject("addressList",addressList);
		mav.setViewName("content/dopco/compLandReg :: #searchResultPopDiv");
		return mav;
	}

	@GetMapping(path="/menu05_2") //http://localhost:8080/api/get/dbTest
    public ModelAndView menu05_2(HttpServletRequest httpRequest, HttpServletResponse response) throws Exception {
		HashMap params = new HashMap();
		ArrayList<HashMap> list=new ArrayList<HashMap>();
		ArrayList<HashMap> jisalist = mainService.selectQuery("commonSQL.selectAllJisaList",params);
		ArrayList<HashMap> sidolist = mainService.selectQuery("commonSQL.getSidoMaster",params);

		ModelAndView mav=new ModelAndView();
		mav.addObject("jisaList",jisalist);
		mav.addObject("sidoList",sidolist);
		mav.setViewName("content/dopco/menu05_2");
		return mav;
	}

	@GetMapping(path="/compLandInfo") //http://localhost:8080/api/get/dbTest
	public ModelAndView compLandInfo(HttpServletRequest httpRequest, HttpServletResponse response) throws Exception {
//		response.setHeader("X-Frame-Options", "SAMEORIGIN");
//		response.setHeader("Content-Security-Policy", " frame-ancestors 'self'");
		ModelAndView mav=new ModelAndView();
		HashMap params = new HashMap();
		ArrayList<HashMap>  list=new ArrayList<HashMap>();
		
		String idx = httpRequest.getParameter("idx");
		//String index = httpRequest.getParameter("index");
		
		params.put("idx",idx);
		params.put("manage_no",idx);
	//	params.put("index",index);
		log.info("params:"+params);
		
		ArrayList<HashMap> data = mainService.selectQuery("dopcoSQL.selectAllData",params);
		HashMap jijuk = new HashMap<>();
		jijuk.put("x", 0);
		jijuk.put("y", 0);
		if (data.size() > 0) {
			HashMap jijukParam = new HashMap<>();
			jijukParam.put("sido_nm", data.get(0).get("jm_sido_nm"));
			jijukParam.put("sgg_nm", data.get(0).get("jm_sgg_nm"));
			jijukParam.put("emd_nm", data.get(0).get("jm_emd_nm"));
			jijukParam.put("ri_nm", data.get(0).get("jm_ri_nm"));
			jijukParam.put("jibun", data.get(0).get("jm_jibun"));

			ArrayList<HashMap> jijukList = mainService.selectQuery("commonSQL.selectJijuk", jijukParam);
			if (jijukList.size() > 0) {
				jijuk = jijukList.get(0);
			}
			else {
				jijuk = new HashMap<>();
				jijuk.put("x", 0);
				jijuk.put("y", 0);
			}
		}
//		ArrayList<HashMap> soujaList = mainService.selectQuery("jisangSQL.selectSoyujaData",params);
//		ArrayList<HashMap> atcFileList = mainService.selectQuery("jisangSQL.selectAtcFileList",params);
//		
//		ArrayList<HashMap> jisangPermitList = mainService.selectQuery("jisangSQL.selectPermitList",params);
//		ArrayList<HashMap> jisangModifyList = mainService.selectQuery("jisangSQL.selectModifyList",params);
//		ArrayList<HashMap> jisangMergeList = mainService.selectQuery("jisangSQL.selectMergeList",params);
//		params.put("pnu", data.get(0).get("jm_pnu"));
//		ArrayList<HashMap> jisangIssueList = mainService.selectQuery("jisangSQL.selectIssueList",params);
//		log.info("jisangIssueList size:"+jisangIssueList.size());
//		if (jisangIssueList.size()>0) {
//			log.info("1:"+jisangIssueList.get(0).get("pi_code_depth1"));
//			log.info("2:"+jisangIssueList.get(0).get("pi_code_depth2"));
//			log.info("3:"+jisangIssueList.get(0).get("pi_code_depth3"));
//			params.put("issueManualCode1", jisangIssueList.get(0).get("pi_code_depth1"));
//			params.put("issueManualCode2", jisangIssueList.get(0).get("pi_code_depth2"));
//			params.put("issueManualCode3", jisangIssueList.get(0).get("pi_code_depth3"));
//		}
//		ArrayList<HashMap> jisangPnuAtcFileList = mainService.selectQuery("jisangSQL.selectPnuAtcFileList",params);
//		ArrayList<HashMap> jisangIssueHistoryList = mainService.selectQuery("jisangSQL.selectIssueHistoryList",params);
//		ArrayList<HashMap> jisangIssueCodeAtcFileList = mainService.selectQuery("jisangSQL.selectIssueCodeAtcFileList",params);
//		ArrayList<HashMap> jisangMemoList = mainService.selectQuery("commonSQL.selectMemoList",params);
//		log.info("params:"+params);
//		log.info("data:"+data.get(0));
//		log.info("jm_pipe_yn:"+data.get(0).get("jm_pipe_yn"));
//		log.info("jm_youngdo:"+data.get(0).get("jm_youngdo"));
//		log.info("jm_pipe_name:"+data.get(0).get("jm_pipe_name"));
//		log.info("jm_jijuk_area:"+data.get(0).get("jm_jijuk_area"));
//		log.info("jisangPermitList:"+jisangPermitList);
//		log.info("jisangIssueList:"+jisangIssueList);
//		log.info("souja count:"+soujaList.size());
//		log.info("soujaList:"+soujaList);
//		log.info("atcFileList:"+atcFileList);
//		log.info("jisangPnuAtcFileList:"+jisangPnuAtcFileList);
//		log.info("jisangIssueHistoryList:"+jisangIssueHistoryList);
//		log.info("jisangMemoList:"+jisangMemoList);
//		log.info("jisangIssueCodeAtcFileList:"+jisangIssueCodeAtcFileList);
		mav.setViewName("content/dopco/compLandInfo");
		return mav;
	}
	
	@GetMapping(path="/compLandDispReg") //http://localhost:8080/api/get/dbTest
    public ModelAndView compLandDispReg(HttpServletRequest httpRequest, HttpServletResponse response) throws Exception {
//		response.setHeader("X-Frame-Options", "SAMEORIGIN");
//		response.setHeader("Content-Security-Policy", " frame-ancestors 'self'");
		ModelAndView mav=new ModelAndView();
		mav.setViewName("content/dopco/compLandDispReg");
		return mav;
	}

	@RequestMapping(value="/menu05_1DataTableList", method = {RequestMethod.GET, RequestMethod.POST}) //http://localhost:8080/api/get/dbTest
	public ResponseEntity<?> menu05_1DataTableList(HttpServletRequest req, HttpServletResponse res) throws Exception {

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
		
		
		String address=req.getParameter("saddr");

		
		String jasan_no = req.getParameter("jasan_no");

				
		String start_date=req.getParameter("start_date"); //취득기간
		String end_date=req.getParameter("end_date");

		Map map=req.getParameterMap();

		HashMap params = new HashMap();
		params.put("draw",draw);
		params.put("start",start);
		
		params.put("jisa",jisa);
		
		params.put("address",address);

		
		params.put("jasan_no",jasan_no);

		
		params.put("start_date", start_date);
		params.put("end_date", end_date);

//		String[] right_arr= {};
//		right_arr=right_type.split(",");
//		params.put("right_type", right_arr);

		
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

		Object count= mainService.selectCountQuery("dopcoSQL.selectTotalCount", params);
		int total=(int)count;

		ArrayList<HashMap> list = mainService.selectQuery("dopcoSQL.selectDopcoList",params);
		//ArrayList<HashMap> list = mainService.selectQuery("jisangSQL.selectJisangListDemo",params); //demo
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
	
	
	@RequestMapping(value="/menu05_2DataTableList", method = {RequestMethod.GET, RequestMethod.POST}) //http://localhost:8080/api/get/dbTest
	public ResponseEntity<?> menu05_2DataTableList(HttpServletRequest req, HttpServletResponse res) throws Exception {

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
		
		
		String address=req.getParameter("saddr");

		
		String jasan_no = req.getParameter("jasan_no");
		String cancel_yn = req.getParameter("cancel_yn");

				
		String start_date=req.getParameter("start_date"); //취득기간
		String end_date=req.getParameter("end_date");

		Map map=req.getParameterMap();

		HashMap params = new HashMap();
		params.put("draw",draw);
		params.put("start",start);
		
		params.put("jisa",jisa);
		
		params.put("address",address);

		
		params.put("jasan_no",jasan_no);

		
		params.put("start_date", start_date);
		params.put("end_date", end_date);

//		String[] right_arr= {};
//		right_arr=right_type.split(",");
//		params.put("right_type", right_arr);

		
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

		Object count= mainService.selectCountQuery("dopcoSQL.selectcancelTotalCount", params);
		int total=(int)count;

		ArrayList<HashMap> list = mainService.selectQuery("dopcoSQL.selectDopcoCancelList",params);
		//ArrayList<HashMap> list = mainService.selectQuery("jisangSQL.selectJisangListDemo",params); //demo
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
	
	
	// 회사토지 내용 등록
	@Transactional
	@PostMapping(path="/insertDopcoList")
		public void insertDopcoList(HttpServletRequest request, HttpServletResponse response) throws Exception {
		String requestParams = ParameterUtil.getRequestBodyToStr(request);
		JSONObject requestParamsObj=new JSONObject(requestParams);
		
		
		
		log.info("requestParams:"+requestParams);
		
		JSONArray rightArr=new JSONArray(requestParamsObj.getString("rightDatas"));
		
		
			ArrayList list = new ArrayList();
			ParameterParser parser = new ParameterParser(request);
			String JISA = requestParamsObj.getString("jisa").replaceAll("전체", "");
			String YONGDO = requestParamsObj.getString("yongdo");
			String PIPE_NAME = requestParamsObj.getString("pipe_name");
			String SUN_GUBUN = requestParamsObj.getString("sun_gubun");

			String SIDO_NM = (requestParamsObj.getString("sido_nm").replaceAll("전체", ""));
			String SGG_NM = (requestParamsObj.getString("sgg_nm").replaceAll("전체", ""));
			String EMD_NM = (requestParamsObj.getString("emd_nm").replaceAll("전체", ""));
			String RI_NM = (requestParamsObj.getString("ri_nm").replaceAll("전체", ""));
			String JIBUN = requestParamsObj.getString("jibun");
			String GOVER_OWN_YN =requestParamsObj.has("gover_own_yn")?requestParamsObj.getString("gover_own_yn"):"N";
			String JIJUKAREA = requestParamsObj.getString("areaData");
			String JIMOK_TEXT = requestParamsObj.getString("jimok_text");
			String PNU = requestParamsObj.getString("pnu");
			String ORG_PNU = requestParamsObj.getString("pnu");
			String ADDRCODE = requestParamsObj.getString("addrcode");

			String DOSIPLAN = requestParamsObj.getString("dosiplan");
			String DOPCO_STATUS = requestParamsObj.getString("current");
			String JASAN_NO = requestParamsObj.getString("jasan");

			String COMPLE_YN = requestParamsObj.getString("comple_yn");
			String DEUNGGI_DATE = requestParamsObj.getString("deunggiDate");
			String DEUNGGI_NO = requestParamsObj.getString("deunggiNo");
			String DEUNGGISO = requestParamsObj.getString("deunggiso");
			String CHUIDEUK_DATE = requestParamsObj.getString("chuideukDate"); // 취득일

			String gubun = requestParamsObj.getString("gubun"); // 구분( modify : 수정, insert
															// : 등록 )
			String ori_DOPCO_NO = requestParamsObj.getString("dopcoNo");
			//String RIGHT_CNT = requestParamsObj.has("RIGHT_CNT")?requestParamsObj.getString("RIGHT_CNT"):"0"; // 후순위권리내역 수
			String RIGHT_CNT =String.valueOf(rightArr.length());
			String TOJA_CNT = requestParamsObj.has("TOJA_CNT")?requestParamsObj.getString("toja_cnt"):"0"; // 투자오더 수
			String FILE_CNT = requestParamsObj.has("FILE_CNT")?requestParamsObj.getString("file_cnt"):"0"; // 파일수
			
			String fileseq ="";

			String modifyReason1 ="";
			String modifyReason2 = "";
			String modifyReason3 = "";
			String modifyReason4 = "";
			String modifyReason5 = "";
			if ("modify".equals(gubun)) {
			 fileseq = requestParamsObj.has("fileseq")?requestParamsObj.getString("fileseq"):""; // 파일 seq

			 modifyReason1 = requestParamsObj.getString("modifyReason1"); // 변경이력-기본정보
			 modifyReason2 = requestParamsObj.getString("modifyReason2"); // 변경이력-소속토지정보
			 modifyReason3 = requestParamsObj.getString("modifyReason3"); // 변경이력-지상권정보
			 modifyReason4 = requestParamsObj.getString("modifyReason4"); // 변경이력-권리확보내역
			 modifyReason5 = requestParamsObj.getString("modifyReason5"); // 변경이력-후순위권리내역
			}

			String USER_ID = String.valueOf(request.getSession().getAttribute("userId"));
			String USER_NAME = String.valueOf(request.getSession().getAttribute("userName"));
//			String JISA = parser.getString("JISA", "").replaceAll("전체", "");
//			String YONGDO = parser.getString("YONGDO", "");
//			String PIPE_NAME = parser.getString("PIPE_NAME", "");
//			String SUN_GUBUN = parser.getString("SUN_GUBUN", "");
//
//			String SIDO_NM = (parser.getString("SIDO_NM", "").replaceAll("전체", ""));
//			String SGG_NM = (parser.getString("SGG_NM", "").replaceAll("전체", ""));
//			String EMD_NM = (parser.getString("EMD_NM", "").replaceAll("전체", ""));
//			String RI_NM = (parser.getString("RI_NM", "").replaceAll("전체", ""));
//			String JIBUN = parser.getString("JIBUN", "");
//			String GOVER_OWN_YN = parser.getString("GOVER_OWN_YN", "N");
//			String JIJUKAREA = parser.getString("JIJUKAREA", "");
//			String JIMOK_TEXT = parser.getString("JIMOK_TEXT", "");
//			String PNU = parser.getString("PNU", "");
//			String ORG_PNU = parser.getString("ORG_PNU", "");
//			String ADDRCODE = parser.getString("ADDRCODE", "");
//
//			String DOSIPLAN = parser.getString("DOSIPLAN", "");
//			String DOPCO_STATUS = parser.getString("DOPCO_STATUS", "");
//			String JASAN_NO = parser.getString("JASAN_NO", "");
//
//			String COMPLE_YN = parser.getString("COMPLE_YN", "");
//			String DEUNGGI_DATE = parser.getString("DEUNGGI_DATE", "");
//			String DEUNGGI_NO = parser.getString("DEUNGGI_NO", "");
//			String DEUNGGISO = parser.getString("DEUNGGISO", "");
//			String CHUIDEUK_DATE = parser.getString("CHUIDEUK_DATE", ""); // 취득일
//
//			String gubun = parser.getString("GUBUN", ""); // 구분( modify : 수정, insert
//															// : 등록 )
//			String ori_DOPCO_NO = parser.getString("DOPCO_NO", "");
//			String RIGHT_CNT = parser.getString("RIGHT_CNT", "0"); // 후순위권리내역 수
//			String TOJA_CNT = parser.getString("TOJA_CNT", "0"); // 투자오더 수
//			String FILE_CNT = parser.getString("FILE_CNT", "0"); // 파일수
//
//			String fileseq = parser.getString("fileseq", ""); // 파일 seq
//
//			String modifyReason1 = parser.getString("modifyReason1", ""); // 변경이력-기본정보
//			String modifyReason2 = parser.getString("modifyReason2", ""); // 변경이력-소속토지정보
//			String modifyReason3 = parser.getString("modifyReason3", ""); // 변경이력-지상권정보
//			String modifyReason4 = parser.getString("modifyReason4", ""); // 변경이력-권리확보내역
//			String modifyReason5 = parser.getString("modifyReason5", ""); // 변경이력-후순위권리내역
//
//			String USER_ID = String.valueOf(request.getSession().getAttribute("userId"));
//			String USER_NAME = String.valueOf(request.getSession().getAttribute("userName"));

			// System.out.println("modifyReason1="+modifyReason1);
			// System.out.println("modifyReason2="+modifyReason2);
			// System.out.println("modifyReason3="+modifyReason3);
			// System.out.println("modifyReason4="+modifyReason4);
			// System.out.println("modifyReason5="+modifyReason5);

			String str_result = "Y";
			try {

				HashMap params = new HashMap();

				params.put("JISA", JISA);
				params.put("YONGDO", YONGDO);
				params.put("PIPE_NAME", PIPE_NAME);
				params.put("SUN_GUBUN", SUN_GUBUN);
				params.put("SIDO_NM", SIDO_NM);
				params.put("SGG_NM", SGG_NM);
				params.put("EMD_NM", EMD_NM);
				params.put("RI_NM", RI_NM);
				params.put("JIBUN", JIBUN);
				params.put("GOVEROWNYN", GOVER_OWN_YN);
				params.put("JIJUKAREA", JIJUKAREA);
				params.put("JIMOK_TEXT", JIMOK_TEXT);
				params.put("PNU", PNU);
				params.put("ADDRCODE", ADDRCODE);
				params.put("DOSIPLAN", DOSIPLAN);
				params.put("DOPCO_STATUS", DOPCO_STATUS);
				params.put("JASANNO", JASAN_NO);
				params.put("COMPLE_YN", COMPLE_YN);
				params.put("DEUNGGI_DATE", DEUNGGI_DATE);
				params.put("DEUNGGI_NO", DEUNGGI_NO);
				params.put("DEUNGGISO", DEUNGGISO);
				params.put("STATUS", "DOPCO");
				params.put("FILESEQ", fileseq);
				params.put("USER_ID", USER_ID);
				params.put("USER_NAME", USER_NAME);
				params.put("CHUIDEUK_DATE", CHUIDEUK_DATE);

				/**********************
				 * 다음 회사토지 번호 조회 시작
				 **********************/
				if (gubun.equals("modify")) {
					params.put("DOPCO_NO", ori_DOPCO_NO);
					params.put("JISANGNO", ori_DOPCO_NO); // JIJUK_MASTER테이블 변경하기 위한
															// 변수

				} else {
					ArrayList DopcoList = (ArrayList) mainService.selectQuery("dopcoSQL.selectDopcoNextNo", null);

					String no=(((HashMap) DopcoList.get(0)).get("now_dopcono").toString());
					//String Next_DosiNo = String.valueOf(Integer.parseInt((String) ((HashMap) DosiList.get(0)).get("now_dosino")) + 1);
					String Next_dopcoNo = String.valueOf((Integer.parseInt(no)+1));
					//String Next_dopcoNo = String.valueOf(Integer.parseInt((String) ((HashMap) DopcoList.get(0)).get("NOW_DOPCONO")) + 1);
					int n_Next_dopcoNo = Next_dopcoNo.length();

					String add_Zero = "";
					for (int i = 0; i < (6 - n_Next_dopcoNo); i++) {
						add_Zero += "0";
					}
					Next_dopcoNo = "L_" + add_Zero + Next_dopcoNo;

					params.put("DOPCO_NO", Next_dopcoNo);
					params.put("JISANGNO", Next_dopcoNo); // JIJUK_MASTER테이블 변경하기 위한
															// 변수
				}

				/***********************
				 * 다음 회사토지 번호 조회 끝
				 ************************/

				if (gubun.equals("insert")) {
					mainService.InsertQuery("dopcoSQL.insertDopcoMaster", params); // 기본정보
																						// 저장
																						// System.out.println("기본정보 params = " + params);
				} else if (gubun.equals("modify")) {

					/***********************
					 * 행정구역이 변경이 되면, 기존의 행정구역은 미설정으로 바꾸고, 변경된 행정구역을 지상권으로 설정함.
					 ************************/
					// 행정구역이 같지않다면 JIJUK_MASTER 테이블 지상권 해제

					String IN_PNU = ORG_PNU;

					// System.out.println("ORG_PNU=" + ORG_PNU);
					// System.out.println("PNU=" + PNU);

					if (!ORG_PNU.equals("NULL") && !PNU.equals("")) {
						if (!ORG_PNU.equals(PNU)) {
							System.out.println("insertDopcoTerminationAdd >>>>> 회사토지 해제된 PNU = " + ORG_PNU);
							params.put("STR_PNU", ORG_PNU);
							mainService.UpdateQuery("goverSQL.updateJijukMasterStatus_Gover", params);
							IN_PNU = PNU;
						}
					} else if (ORG_PNU.equals("NULL") && !PNU.equals("")) {
						IN_PNU = PNU;
					}

					// System.out.println("IN_PNU=" + IN_PNU);
					params.put("IN_PNU", IN_PNU);
					mainService.UpdateQuery("dopcoSQL.updateDopcoMaster", params); // 기본정보
																						// 수정

					// 변경이력 등록
					if (!modifyReason1.equals("")) {
						params.put("GUBUN", "기본정보");
						params.put("CONT", modifyReason1);
						mainService.InsertQuery("dopcoSQL.insertDopcoModifyHistory", params);
					}
					if (!modifyReason2.equals("")) {
						params.put("GUBUN", "소속 토지정보");
						params.put("CONT", modifyReason2);
						mainService.InsertQuery("Json.insertDopcoModifyHistory", params);
					}
					if (!modifyReason3.equals("")) {
						params.put("GUBUN", "지상권 정보");
						params.put("CONT", modifyReason3);
						mainService.InsertQuery("Json.insertDopcoModifyHistory", params);
					}
					if (!modifyReason4.equals("")) {
						params.put("GUBUN", "권리확보 내역");
						params.put("CONT", modifyReason4);
						mainService.InsertQuery("Json.insertDopcoModifyHistory", params);
					}
					if (!modifyReason5.equals("")) {
						params.put("GUBUN", "후순위 권리 내역");
						params.put("CONT", modifyReason5);
						mainService.InsertQuery("Json.insertDopcoModifyHistory", params);
					}

				}
				if (!PNU.equals("NULL") && !PNU.equals("")) {
					/** JIJUK_MASTER 테이블 새로운 행정구역으로 지상권 등록 **/
					mainService.UpdateQuery("songyuSQL.updateTogiJisang_Status", params);
					// System.out.println("회사토지로 등록 params = " + params);
				}

				/*
				 * //투자오더 for(int i = 0; i < Integer.parseInt(TOJA_CNT); i++){ String TOJA = parser.getString("TOJA"+String.valueOf(i), ""); params.put("TOJA", TOJA); if(gubun.equals("modify")){ if(i==0){ Database.getInstance().update("Json.deleteDopcoToja", params); // 기존 정보 삭제 } } if(!TOJA.equals("")){ //System.out.println("투자오더 params = " + params); Database.getInstance().insert("Json.insertDopcoTojaOrder", params); // 투자오더 테이블 저장 } }
				 */

				// 후순위 권리내역
				for (int i = 0; i < rightArr.length(); i++) {
					JSONObject obj=new JSONObject(rightArr.get(i).toString());
					String RIGHT_NAME = obj.getString("RIGHT_NAME"); // 권리명
					String RIGHT_MONEY = obj.getString("RIGHT_MONEY"); // 설정금액
					String RIGHT_DATE = obj.getString("RIGHT_DATE"); // 설정일
					String CANCLE_DATE = obj.getString("CANCLE_DATE"); // 해지일
					String RIGHT_UNAME = obj.getString("RIGHT_UNAME"); // 성명
					String RIGHT_PHONE = obj.getString("RIGHT_PHONE"); // 연락처
					String RIGHT_ADDR = obj.getString("RIGHT_ADDR"); // 주소

					params.put("RIGHT_NAME", RIGHT_NAME);
					params.put("RIGHT_MONEY", RIGHT_MONEY);
					params.put("RIGHT_DATE", RIGHT_DATE);
					params.put("CANCLE_DATE", CANCLE_DATE);
					params.put("RIGHT_UNAME", RIGHT_UNAME);
					params.put("RIGHT_PHONE", RIGHT_PHONE);
					params.put("RIGHT_ADDR", RIGHT_ADDR);

					if (gubun.equals("modify")) {
						if (i == 0) {
							mainService.UpdateQuery("dopcoSQL.deleteDopcoRight", params); // 기존
																							// 정보
																							// 삭제
						}
					}

					if (!RIGHT_NAME.equals("") || !RIGHT_MONEY.equals("") || !RIGHT_DATE.equals("") || !CANCLE_DATE.equals("") && !RIGHT_UNAME.equals("") || !RIGHT_UNAME.equals("") || !RIGHT_PHONE.equals("") || !RIGHT_ADDR.equals("")) {

						mainService.InsertQuery("dopcoSQL.insertDopcoRight", params); // 후순위
																						// 권리내역
																						// 테이블
																						// 저장
																						// System.out.println("후순위 권리내역 params = " + params);
					}

				}
				/*
				 * //첨부파일 MultipartHttpServletRequest multipart = (MultipartHttpServletRequest) request; List<HashMap> listfile; FileManager fm = new FileManager(); for(int i=0; i < Integer.parseInt(FILE_CNT); i++){ listfile = fm.upload(multipart, "uploadFile"+i); if (listfile != null && listfile.size() > 0) { params.put("FILE_NM", listfile.get(0).get("fileName")); params.put("FILE_PATH", listfile.get(0).get("filePath")); if(gubun.equals("modify")){ if(i==0){ Database.getInstance().update("Json.deleteDopcoFile", params); } } Database.getInstance().insert("Json.insertDopcoFile", params); } }
				 */

				if (gubun.equals("modify")) {
					for (int i = 0; i < Integer.parseInt(FILE_CNT); i++) {
						String IS_DEL = parser.getString("isFileDel" + String.valueOf(i), "");
						String DEL_SEQ = parser.getString("fileSeq" + String.valueOf(i), "");

						if (IS_DEL.equals("Y")) {
							System.out.println("FILE_DEL_SEQ=" + DEL_SEQ);
							// params.put("SEQ", DEL_SEQ);
							mainService.UpdateQuery("dopcoSQL.deleteFile_dopco", params);

						}
					}
				}
				
				/** codecanyon에서 파일업로드 **/
				//mainService.UpdateQuery("dopcoSQL.updateSeqFile_Dopco", params); // 파일테이블에
																					// 지상권번호
							//메모추가 해야함														// 업데이트

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
	
	// 회사토지 해지 등록(처분)
	@Transactional
	@PostMapping(path="/insertDopcoTerminationAdd")
		public void insertDopcoTerminationAdd(HttpServletRequest request, HttpServletResponse response) throws Exception {
		String requestParams = ParameterUtil.getRequestBodyToStr(request);
		JSONObject requestParamsObj=new JSONObject(requestParams);
		log.info("requestParams:"+requestParams);
			ParameterParser parser = new ParameterParser(request);
			String cancleDate = requestParamsObj.getString("cancleDate");
			String userName = requestParamsObj.getString("userName");
			String dopcoNo = requestParamsObj.getString("dopcoNo");
			String pnu = requestParamsObj.getString("pnu");
			String empCd = String.valueOf(request.getSession().getAttribute("userId"));

			String str_result = "Y";
			try {

				HashMap params = new HashMap();
				params.put("DOPCO_NO", dopcoNo);
				params.put("USERNAME", userName);
				params.put("CANCLEDATE", cancleDate);
				params.put("STR_PNU", pnu);
				params.put("EMPCD", empCd);

				System.out.println("insertDopcoTerminationAdd >>>>> 회사토지 해제된 PNU = " + pnu);
				/** JIJUK_MASTER 테이블 지상권 해제 **/
				mainService.UpdateQuery("goverSQL.updateJijukMasterStatus_Gover", params);

				/** DOPCO_MASTER 테이블 해제 등록 **/
				mainService.UpdateQuery("dopcoSQL.insertDopcoTerminationAdd", params);

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
	
	
	
}
