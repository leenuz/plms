package com.slsolution.plms.issue;

import java.util.ArrayList;
import java.util.Enumeration;
import java.util.HashMap;
import java.util.Map;
import java.util.Properties;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.scheduling.annotation.EnableAsync;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.ModelAndView;

import com.slsolution.plms.ApprovalHtmlUtil;
import com.slsolution.plms.ApprovalUtil;
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
@RequestMapping("/issue")
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class issueController {
	@Autowired
	private MainService mainService;

	@GetMapping(path = "/menu06_1") // http://localhost:8080/api/get/dbTest
	public ModelAndView menu06_1(HttpServletRequest httpRequest, HttpServletResponse response) throws Exception {
		
		ModelAndView mav = new ModelAndView();
		
		try {
			HashMap params = new HashMap();
			
			params.put("CODE_DEPTH", "1");
			
			//지사코드
			ArrayList<HashMap> jisalist = mainService.selectQuery("commonSQL.selectAllJisaList", params);
			//시도코드
			ArrayList<HashMap> sidolist = mainService.selectQuery("commonSQL.getSidoMaster", params);
			//이슈유형 코드 불러오기 (이슈유형 : 첫번째 메뉴)
			ArrayList<HashMap> issueDepth1 = mainService.selectQuery("issueSQL.selectIssueCodeListDepth", params);
			
			mav.addObject("jisaList", jisalist);
			mav.addObject("sidoList", sidolist);
			mav.addObject("depthList1", issueDepth1);
			
		} catch(Exception e) {
			log.error("===  ===");
		}

		mav.setViewName("content/issue/menu06_1");
		return mav;
	}

//	
	@GetMapping(path = "/issueCodeMgmt") // http://localhost:8080/api/get/dbTest
	public ModelAndView issueCodeMgmt(HttpServletRequest httpRequest, HttpServletResponse response) throws Exception {
		ModelAndView mav = new ModelAndView();
		mav.setViewName("content/issue/issueCodeMgmt");
		return mav;
	}

	@GetMapping(path = "/codeMgmt") // http://localhost:8080/api/get/dbTest
	public ModelAndView codeMgmt(HttpServletRequest httpRequest, HttpServletResponse response) throws Exception {
		ModelAndView mav = new ModelAndView();
		mav.setViewName("content/issue/codeMgmt");
		return mav;
	}

	@GetMapping(path = "/complaintManage") // http://localhost:8080/api/get/dbTest
	public ModelAndView complaintManage(HttpServletRequest httpRequest, HttpServletResponse response) throws Exception {
		ModelAndView mav = new ModelAndView();
		mav.setViewName("content/issue/complaintManage");
		return mav;
	}

	@PostMapping(path = "/getBunhalJIjukSelect")
	@ResponseBody // 데이터를 JSON으로 반환
	public ArrayList<HashMap> getBunhalJIjukSelect(HttpServletRequest httpRequest, HttpServletResponse response)
			throws Exception {
		HashMap<String, Object> params = new HashMap<>();
		ArrayList<HashMap> list = new ArrayList<>();
		String address = httpRequest.getParameter("address");
		String sido_nm = httpRequest.getParameter("sido_nm");
		String sgg_nm = httpRequest.getParameter("sgg_nm");
		String emd_nm = httpRequest.getParameter("emd_nm");
		String ri_nm = httpRequest.getParameter("ri_nm");
		String jibun = httpRequest.getParameter("jibun");

		// 파라미터 추가
		params.put("address", address);
		params.put("sido_nm", sido_nm);
		params.put("sgg_nm", sgg_nm);
		params.put("emd_nm", emd_nm);
		params.put("ri_nm", ri_nm);
		params.put("jibun", jibun);
		// 로그 기록
		log.info("params:" + params);
		// DB 쿼리 실행
		ArrayList<HashMap> addressList = mainService.selectQuery("commonSQL.selectAddressFromJijuk", params);
		// 로그 기록
		log.info("addressList:" + addressList);
		// 데이터만 JSON 형식으로 반환
		return addressList;
	}

	// 민원관리 목록 조회
//		public void selectMinwonData(HttpServletRequest request, HttpServletResponse response) throws Exception {
//			ArrayList list = new ArrayList();
//			ArrayList addlist = new ArrayList();
//			ParameterParser parser = new ParameterParser(request);
//
//			System.out.println(parser.toString());
//
//			String SEARCH_START_DATE = parser.getString("SEARCH_START_DATE", "");
//			String SEARCH_END_DATE = parser.getString("SEARCH_END_DATE", "");
//			String MINWON_STATUS = parser.getString("MINWON_STATUS", "");
//			String DEPTH1 = parser.getString("DEPTH1", "");
//			String DEPTH2 = parser.getString("DEPTH2", "");
//			String DEPTH3 = parser.getString("DEPTH3", "");
//			String JISA = parser.getString("JISA", "");
//			String SEARCH_TEXT = parser.getString("SEARCH_TEXT", "");
//			String loginKey = String.valueOf(request.getSession().getAttribute("loginKey"));
//			String pageNum = parser.getString("pageNum", ""); // 페이지 번호
//			String pageCnt = parser.getString("pageCnt", ""); // 한 페이지 갯수
//
//			int listCount = 0;
//
//			String str_result = "Y";
//			try {
//
//				Map params = new HashMap();
//				params.put("SEARCH_START_DATE", SEARCH_START_DATE);
//				params.put("SEARCH_END_DATE", SEARCH_END_DATE);
//				params.put("MINWON_STATUS", MINWON_STATUS);
//				params.put("DEPTH1", DEPTH1);
//				params.put("DEPTH2", DEPTH2);
//				params.put("DEPTH3", DEPTH3);
//				params.put("JISA", JISA);
//				params.put("SEARCH_TEXT", SEARCH_TEXT);
//				params.put("PAGE_NUM", pageNum);
//				params.put("PAGE_CNT", pageCnt);
//
//				listCount = (int) Database.getInstance().queryForObject("Json.selectMinwonListCount", params);
//				list = (ArrayList) Database.getInstance().queryForList("Json.selectMinwonList", params);
//
//			} catch (Exception e) {
//				str_result = "N";
//				e.printStackTrace();
//			}
//			HashMap map = new HashMap();
//
//			map.put("message", str_result);
//			map.put("result", list);
//			map.put("TOTALCNT", listCount);
//			map.put("loginKey", loginKey);
//
//			JSONObject jo = new JSONObject(map);
//
//			response.setCharacterEncoding("UTF-8");
//			response.setHeader("Access-Control-Allow-Origin", "*");
//			response.resetBuffer();
//			response.setContentType("application/json");
//			response.getWriter().print(jo);
//			response.getWriter().flush();
//		}

	@RequestMapping(value = "/menu06_1DataTableList", method = { RequestMethod.GET, RequestMethod.POST }) // http://localhost:8080/api/get/dbTest
	public ResponseEntity<?> menu06_1DataTableList(HttpServletRequest req, HttpServletResponse res) throws Exception {

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
		String address = req.getParameter("saddr");

		String mw_title = req.getParameter("mw_title");
		String code1 = req.getParameter("code1");
		String code2 = req.getParameter("code2");
		String code3 = req.getParameter("code3");
		String status = req.getParameter("status");
		String start_date = req.getParameter("start_date");
		String end_date = req.getParameter("end_date");

		Map map = req.getParameterMap();

		HashMap params = new HashMap();
		params.put("draw", draw);
		params.put("start", start);

		params.put("jisa", jisa); // 발생지사
		params.put("mw_title", mw_title); // 민원명
		params.put("code1", code1); // 이슈유형1
		params.put("code2", code2); // 이슈유형
		params.put("code3", code3); // 이슈유형
		params.put("status", status); // 진행현황
		params.put("length", length);
		params.put("address", address);

		params.put("start_date", start_date); // 발생일자
		params.put("end_date", end_date); // 발생일자

//		String[] right_arr= {};
//		right_arr=right_type.split(",");
//		params.put("right_type", right_arr);

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
//		log.info("params:" + params);

		Object count = mainService.selectCountQuery("issueSQL.selectMinwonTotalCount", params);
		int total = (int) count;

		ArrayList<HashMap> list = mainService.selectQuery("issueSQL.selectMinwonListOrg", params);
		// ArrayList<HashMap> list =
		// mainService.selectQuery("jisangSQL.selectJisangListDemo",params); //demo
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

	@GetMapping(path = "/approval") // 민뭔관리-민원등록
	public ModelAndView approval(HttpServletRequest httpRequest, HttpServletResponse response) throws Exception {
		ModelAndView mav = new ModelAndView();
		mav.setViewName("content/issue/approval");
		return mav;
	}

	@GetMapping(path = "/approval2") // 민원관리-대응방안수립보고
	public ModelAndView approval2(HttpServletRequest httpRequest, HttpServletResponse response) throws Exception {
		ModelAndView mav = new ModelAndView();
		mav.setViewName("content/issue/approval2");
		return mav;
	}

	@GetMapping(path = "/approval3") // 민원관리-민원협의보고
	public ModelAndView approval3(HttpServletRequest httpRequest, HttpServletResponse response) throws Exception {
		ModelAndView mav = new ModelAndView();
		mav.setViewName("content/issue/approval3");
		return mav;
	}

	@GetMapping(path = "/approval4") // 민원관리-민원완료보고
	public ModelAndView approval4(HttpServletRequest httpRequest, HttpServletResponse response) throws Exception {
		ModelAndView mav = new ModelAndView();
		mav.setViewName("content/issue/approval4");
		return mav;
	}

	// PNU 조회
	@PostMapping(path = "/selectMinwonPNUList")
	public void selectMinwonPNUList(HttpServletRequest request, HttpServletResponse response) throws Exception {

		ArrayList list = new ArrayList();
		ParameterParser parser = new ParameterParser(request);

		String addrcode = parser.getString("addrcode", "");
		String jibun = parser.getString("jibun", "");
		String str_result = "Y";
		String setBody = "";
		try {

			HashMap params = new HashMap();
			params.put("ADDRCODE", addrcode);
			params.put("JIBUN", jibun);

			// list = (ArrayList)
			// Database.getInstance().queryForList("Json.selectMinwonPNUList", params);
			list = (ArrayList) mainService.selectQuery("issueSQL.selectMinwonPNUList", params);

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
		map.put("inHtml", setBody);

		JSONObject jo = new JSONObject(map);

		response.setCharacterEncoding("UTF-8");
		response.setHeader("Access-Control-Allow-Origin", "*");
		response.resetBuffer();
		response.setContentType("application/json");
		response.getWriter().print(jo);
		response.getWriter().flush();

	}

	// PNU 조회 전자결재 테스트용
	@PostMapping(path = "/selectMinwonPNUList1")
	public void selectMinwonPNUList1(HttpServletRequest request, HttpServletResponse response) throws Exception {

		ArrayList list = new ArrayList();
		ParameterParser parser = new ParameterParser(request);

		String addrcode = parser.getString("addrcode", "");
		String jibun = parser.getString("jibun", "");
		String str_result = "Y";
		String setBody = "";
		try {

			HashMap params = new HashMap();
			params.put("ADDRCODE", addrcode);
			params.put("JIBUN", jibun);

			// list = (ArrayList)
			// Database.getInstance().queryForList("Json.selectMinwonPNUList", params);
			list = (ArrayList) mainService.selectQuery("issueSQL.selectMinwonPNUList1", params);

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
		map.put("inHtml", setBody);

		JSONObject jo = new JSONObject(map);

		response.setCharacterEncoding("UTF-8");
		response.setHeader("Access-Control-Allow-Origin", "*");
		response.resetBuffer();
		response.setContentType("application/json");
		response.getWriter().print(jo);
		response.getWriter().flush();

	}

	// 민원관리 목록 조회
	@PostMapping(path = "/selectMinwonDetail")
	public void selectMinwonDetail(HttpServletRequest request, HttpServletResponse response) throws Exception {
		
		String requestParams = ParameterUtil.getRequestBodyToStr(request);
		JSONObject requestParamObj = new JSONObject(requestParams);
		ParameterParser parser = new ParameterParser(request);
		
		String MW_SEQ = requestParamObj.getString("MW_SEQ");
		String loginKey = String.valueOf(request.getSession().getAttribute("loginKey"));

		String str_result = "Y";
		Map detailMap = null;
		ArrayList tojiList = new ArrayList();
		ArrayList agreeList = new ArrayList();
		ArrayList fileList = new ArrayList();
		ArrayList tmpList = new ArrayList();
		try {

			HashMap params = new HashMap();
			params.put("MW_SEQ", MW_SEQ);

//				detailMap = (HashMap) Database.getInstance().queryForObject("Json.selectMinwonDetail", params);
//
//				tojiList = (ArrayList) Database.getInstance().queryForList("Json.selectMinwonDetailToji", params);
//				agreeList = (ArrayList) Database.getInstance().queryForList("Json.selectMinwonDetailAgree", params);
//				fileList = (ArrayList) Database.getInstance().queryForList("Json.selectMinwonDetailFile", params);
//				detailMap = (HashMap) mainService.selectHashmapQuery("issueSQL.selectMinwonDetail", params);
			
			tmpList = (ArrayList) mainService.selectQuery("issueSQL.selectMinwonDetail", params);
			log.info("detailMap:" + tmpList.get(0));
			detailMap = (HashMap) tmpList.get(0);
			tojiList = (ArrayList) mainService.selectQuery("issueSQL.selectMinwonDetailToji", params);
			agreeList = (ArrayList) mainService.selectQuery("issueSQL.selectMinwonDetailAgree", params);
			fileList = (ArrayList) mainService.selectQuery("issueSQL.selectMinwonDetailFile", params);

		} catch (Exception e) {
			str_result = "N";
			e.printStackTrace();
		}
		HashMap map = new HashMap();

		map.put("message", str_result);
		map.put("result", detailMap);
		map.put("tojiList", tojiList);
		map.put("agreeList", agreeList);
		map.put("fileList", fileList);
		map.put("loginKey", loginKey);

		JSONObject jo = new JSONObject(map);

		response.setCharacterEncoding("UTF-8");
		response.setHeader("Access-Control-Allow-Origin", "*");
		response.resetBuffer();
		response.setContentType("application/json");
		response.getWriter().print(jo);
		response.getWriter().flush();
	}

	// 민원신규등록 (상신) sangsin_flag = Y 이면 상신 아니면 저장
	@Transactional
	@PostMapping(path = "/saveMinwonData")
	public void saveMinwonData(HttpServletRequest request, HttpServletResponse response) throws Exception {
		
		String requestParams = ParameterUtil.getRequestBodyToStr(request);
		JSONObject requestParamObj = new JSONObject(requestParams);
		ParameterParser parser = new ParameterParser(request);
		
//		String fileseq = parser.getString("fileseq", ""); // 파일 seq
//		String MW_SEQ = parser.getString("MW_SEQ", "");
//		String MW_TITLE = parser.getString("MW_TITLE", "");
//		String MW_CONTENTS = parser.getString("MW_CONTENTS", "");
//		String MW_OCCUR_DATE = parser.getString("MW_OCCUR_DATE", "");
//		String JISA = parser.getString("JISA", "");
//		String TOJI_LENGTH = parser.getString("TOJI_LENGTH", "");
//		String SANGSIN_FLAG = parser.getString("SANGSIN_FLAG", "");
//
//		Integer FILE_DEL_LENGTH = parser.getInt("FILE_DEL_LENGTH");

		String fileseq = (!requestParamObj.has("fileseq") || requestParamObj.getString("fileseq") == null) ? "" : requestParamObj.getString("fileseq"); // 파일seq
		String MW_SEQ = requestParamObj.has("MW_SEQ")?requestParamObj.getString("MW_SEQ"):"";

		String MW_TITLE = requestParamObj.getString("MW_TITLE");
		String MW_CONTENTS = requestParamObj.getString("MW_CONTENTS");
		String MW_OCCUR_DATE = requestParamObj.getString("MW_OCCUR_DATE");
		String JISA = requestParamObj.getString("JISA");
		String TOJI_LENGTH = requestParamObj.has("TOJI_LENGTH")?requestParamObj.getString("TOJI_LENGTH"):"0";
		String SANGSIN_FLAG = requestParamObj.getString("SANGSIN_FLAG");
		
		String REG_ID = String.valueOf(request.getSession().getAttribute("userName"));

		//Integer FILE_DEL_LENGTH = requestParamObj.getInt("FILE_DEL_LENGTH");
		JSONArray tojiList = requestParamObj.getJSONArray("tojiList");

		ArrayList list = null;
		HashMap map = new HashMap();
		int mwSeq = 0;

		try {
			// Database.getInstance().startTransaction();
			HashMap params = new HashMap();
			// 신규등록시
			if ("".equals(MW_SEQ) || "0".equals(MW_SEQ)) {

				// 민원 마스터 키 번호 생성
//				mwSeq = (int) Database.getInstance().queryForObject("Json.makeMinwonMasterKey");
				mwSeq = (int) mainService.selectCountQuery("issueSQL.makeMinwonMasterKey", params);

				MW_SEQ = String.valueOf(mwSeq);

				// 마스터 등록
				params.put("MW_SEQ", mwSeq);
				params.put("MW_TITLE", MW_TITLE);
				params.put("MW_CONTENTS", MW_CONTENTS);
				params.put("MW_OCCUR_DATE", MW_OCCUR_DATE);
				params.put("JISA", JISA);
				params.put("STATUS", "1");
				params.put("REG_ID", REG_ID);

//				Database.getInstance().insert("Json.insertMinwonMaster", params);
				mainService.InsertQuery("issueSQL.insertMinwonMaster", params);

			} else {
				// 수정모드시
				mwSeq = Integer.parseInt(MW_SEQ);

				params.put("MW_SEQ", mwSeq);
				params.put("MW_TITLE", MW_TITLE);
				params.put("MW_CONTENTS", MW_CONTENTS);
				params.put("MW_OCCUR_DATE", MW_OCCUR_DATE);
				params.put("JISA", JISA);
				params.put("STATUS", "1");
				params.put("REG_ID", REG_ID);

//				Database.getInstance().update("Json.updateMinwonMaster", params);
				mainService.InsertQuery("issueSQL.updateMinwonMaster", params);

				// 삭제할 첨부파일 처리
//				if (FILE_DEL_LENGTH > 0) {
//					for (int i = 0; i < FILE_DEL_LENGTH; i++) {
//						mwSeq = Integer.parseInt(MW_SEQ);
//						params.put("MW_SEQ", mwSeq);
//						params.put("SEQ", parser.getString("FILE_DEL_SEQ" + i, ""));
////						Database.getInstance().update("Json.deleteMinwonFile", params);
//						mainService.DeleteQuery("issueSQL.deleteMinwonFile", params);
//					}
//				}

			}

			// 첨부파일 등록
			params = new HashMap();
			params.put("MW_SEQ", mwSeq);
//			params.put("FILESEQ", fileseq);
//			Database.getInstance().update("Json.updateMinwonFileKey", params);

			// 기존 토지정보 전부 삭제처리
//			Database.getInstance().delete("Json.deleteMinwonPnu", params);
			mainService.DeleteQuery("issueSQL.deleteMinwonPnu", params);

			// 토지정보 등록
//			for (int i = 0; i < Integer.parseInt(TOJI_LENGTH); i++) {
			for (int i = 0; i < tojiList.length(); i++) {

				JSONObject obj = new JSONObject(tojiList.get(i).toString());
				
				params = new HashMap();
				params.put("MW_SEQ", mwSeq);
				params.put("MINWON_SEQ", mwSeq);
				params.put("PNU", obj.getString("pnu"));
				params.put("ADDRCODE", (obj.getString("bcode") == null || obj.getString("bcode") == "null") ? ""
						: obj.getString("bcode"));
				params.put("SIDO_NM", obj.getString("sido_nm"));
				params.put("SGG_NM", obj.getString("sgg_nm"));
				params.put("EMD_NM", obj.getString("emd_nm"));
				params.put("RI_NM", obj.getString("ri_nm"));
				params.put("JIBUN", obj.getString("jibun"));
				params.put("JIBUN_FULL", obj.getString("jibun_full"));
				params.put("REP_YN", obj.getString("REP_YN"));
				params.put("REGISTED_YN",
						(obj.getString("REGISTED_YN") == null || obj.getString("REGISTED_YN") == "null") ? "N"
								: obj.getString("REGISTED_YN"));
				params.put("PERMITTED_YN",
						(obj.getString("PERMITTED_YN") == null || obj.getString("PERMITTED_YN") == "null") ? "N"
								: obj.getString("PERMITTED_YN"));
				params.put("TOJI_TYPE", "");
				//params.put("REG_ID", "test");
				params.put("REG_ID", String.valueOf(request.getSession().getAttribute("userName")));
				// params.put("REG_ID",
				// String.valueOf((request.getSession().getAttribute("userName")=="null")?"":request.getSession().getAttribute("userName")));
//				params.put("PNU", parser.getString("PNU_" + i, ""));
//				params.put("ADDRCODE", parser.getString("ADDRCODE_" + i, ""));
//				params.put("SIDO_NM", parser.getString("SIDO_NM_" + i, ""));
//				params.put("SGG_NM", parser.getString("SGG_NM_" + i, ""));
//				params.put("EMD_NM", parser.getString("EMD_NM_" + i, ""));
//				params.put("RI_NM", parser.getString("RI_NM_" + i, ""));
//				params.put("JIBUN", parser.getString("JIBUN_" + i, ""));
//				params.put("JIBUN_FULL", parser.getString("JIBUN_FULL_" + i, ""));
//				params.put("REP_YN", parser.getString("REP_YN_" + i, ""));
//				params.put("REGISTED_YN", parser.getString("REGISTED_YN_" + i, "N"));
//				params.put("PERMITTED_YN", parser.getString("PERMITTED_YN_" + i, "N"));
//				params.put("REG_ID", String.valueOf(request.getSession().getAttribute("userName")));

//				Database.getInstance().insert("Json.insertMinwonPnu", params);
				mainService.InsertQuery("issueSQL.insertMinwonPnu", params);
			}

			map.put("message", "success");
		} catch (Exception e) {
			e.printStackTrace();
			map.put("message", "처리 중 오류가 발생했습니다.");
		} finally {

		}
		log.info("map:" + map);
		log.info("SANGSIN_FLAG:" + SANGSIN_FLAG);
		
		/************************************************************/
		/************************************************************/
		/************************************************************/
		
		/**
		 * 별도 트랜잭션 분리를 위해 이렇게 처리함. 상단 정보처리단이 정상적으로 수행됐을 경우에만 아래 전자결제 관련 처리 진행
		 */
		if ("success".equals(map.get("message")) && "Y".equals(SANGSIN_FLAG)) {

			try {
//				Database.getInstance().startTransaction();
				// 전자결재 상신 시
				ApprovalHtmlUtil eph = new ApprovalHtmlUtil();
				ApprovalUtil epc = new ApprovalUtil();
//				ElectronicPaymentHTML eph = new ElectronicPaymentHTML(); // 상신용 HTML
//				ElectronicPaymentUtil epc = new ElectronicPaymentUtil(); // 전자결재 연계

				String str_appNo = CommonUtil.getNextAppovalSeq();
				boolean res_Echo = false;
				if ("".equals(str_appNo)) {
					map.put("message", "처리 중 오류가 발생했습니다.");
				} else {
					String str_UserId = String.valueOf(request.getSession().getAttribute("userId"));
					String str_userName = String.valueOf(request.getSession().getAttribute("userName"));
					String str_userDeptcd = String.valueOf(request.getSession().getAttribute("userDeptcd"));
					String str_userDeptnm = String.valueOf(request.getSession().getAttribute("userDeptnm"));
					String str_userUPDeptcd = String.valueOf(request.getSession().getAttribute("userUPDeptcd"));
//					String str_UserId = "105681";
//					String str_userName = "박영환";
//					String str_userDeptcd = "D250500";
//					String str_userDeptnm = "IT전략.지원팀";
//					String str_userUPDeptcd = "S250100";
					String XML_GUBUN = "GetOccureComplaintsDataforXML";

					res_Echo = epc.GetPLMSDataforXML(str_appNo,
							eph.getMinwonGenerateHTML(MW_SEQ, fileseq, request, response), str_UserId, "", "",
							XML_GUBUN, str_userName, str_userDeptcd, str_userDeptnm, str_userUPDeptcd);
				}

				if (res_Echo) {

					// 문서번호 업데이트
					map.put("DOCKEY", str_appNo);
					map.put("MW_SEQ", MW_SEQ);
					// Database.getInstance().update("Json.updateNinwonEchoNo", map);
					mainService.InsertQuery("issueSQL.updateNinwonEchoNo", map);

					// 문서 URL조회
//					ArrayList echolist = (ArrayList) Database.getInstance().queryForList("Json.selectMinwonDocInfo", map);
					ArrayList echolist = (ArrayList) mainService.selectQuery("issueSQL.selectMinwonDocInfo", map);
					if (null != echolist && echolist.size() > 0) {
						String str_EchoNo = String.valueOf(((HashMap) echolist.get(0)).get("pa_out_url"));
						System.out.println("str_EchoNo=====" + str_EchoNo);
						map.put("OUT_URL", str_EchoNo);
					}

				} else {
					map.put("message", "처리 중 오류가 발생했습니다.");
				}
//				Database.getInstance().commitTransaction();
				map.put("message", "success");
			} catch (Exception e) {
				e.printStackTrace();
				map.put("message", "처리 중 오류가 발생했습니다.");
			} finally {
				// Database.getInstance().endTransaction();
			}

		}

		JSONObject jo = new JSONObject(map);

		response.setCharacterEncoding("UTF-8");
		response.setHeader("Access-Control-Allow-Origin", "*");
		response.resetBuffer();
		response.setContentType("application/json");
		response.getWriter().print(jo);
		response.getWriter().flush();
	}

	/**
	 * 민원관리 대응방안수립 저장처리
	 * 
	 * @param request
	 * @param response
	 * @throws Exception
	 */
	@Transactional
	@PostMapping(path = "/saveMinwonHandling")
	public void saveMinwonHandling(HttpServletRequest request, HttpServletResponse response) throws Exception {
		String requestParams = ParameterUtil.getRequestBodyToStr(request);
		JSONObject requestParamObj = new JSONObject(requestParams);
		ParameterParser parser = new ParameterParser(request);
//		String MW_SEQ = parser.getString("MW_SEQ", "");
//		String MW_CODE1 = parser.getString("MW_CODE1", "");
//		String MW_CODE2 = parser.getString("MW_CODE2", "");
//		String MW_CODE3 = parser.getString("MW_CODE3", "");
//		String SANGSIN_FLAG = parser.getString("SANGSIN_FLAG", "");
		String MW_SEQ = requestParamObj.getString("MW_SEQ");
		String MW_CODE1 = requestParamObj.getString("MW_CODE1");
		String MW_CODE2 = requestParamObj.getString("MW_CODE2");
		String MW_CODE3 = requestParamObj.getString("MW_CODE3");
		String SANGSIN_FLAG = requestParamObj.getString("SANGSIN_FLAG");

		ArrayList list = null;
		HashMap map = new HashMap();
		try {
			HashMap params = new HashMap();
			params.put("MW_SEQ", MW_SEQ);
			params.put("MW_CODE1", MW_CODE1);
			params.put("MW_CODE2", MW_CODE2);
			params.put("MW_CODE3", MW_CODE3);
			params.put("COMPLETE_YN", "N");

//			list = (ArrayList) Database.getInstance().queryForList("Json.selectMinwonHandlingTmp", params);
			list = (ArrayList) mainService.selectQuery("issueSQL.selectMinwonHandlingTmp", params);
			if (list != null && list.size() > 0) {
				mainService.InsertQuery("issueSQL.updateMinwonHandlingTmp", params);
			} else {
				mainService.InsertQuery("issueSQL.insertMinwonHandling", params);
			}

			map.put("message", "success");

			// 전자결제 상신처리
			if ("Y".equals(SANGSIN_FLAG)) {
//				ElectronicPaymentHTML eph = new ElectronicPaymentHTML(); // 상신용 HTML
//				ElectronicPaymentUtil epc = new ElectronicPaymentUtil(); // 전자결재 연계
				ApprovalHtmlUtil eph = new ApprovalHtmlUtil();
				ApprovalUtil epc = new ApprovalUtil();

				String str_appNo = CommonUtil.getNextAppovalSeq();
				boolean res_Echo = false;
				if ("".equals(str_appNo)) {
					map.put("message", "처리 중 오류가 발생했습니다.");
				} else {
//					String str_UserId = String.valueOf(request.getSession().getAttribute("userId"));
//					String str_userName = String.valueOf(request.getSession().getAttribute("userName"));
//					String str_userDeptcd = String.valueOf(request.getSession().getAttribute("userDeptcd"));
//					String str_userDeptnm = String.valueOf(request.getSession().getAttribute("userDeptnm"));
//					String str_userUPDeptcd = String.valueOf(request.getSession().getAttribute("userUPDeptcd"));
					String str_UserId = "105681";
					String str_userName = "박영환";
					String str_userDeptcd = "D250500";
					String str_userDeptnm = "IT전략.지원팀";
					String str_userUPDeptcd = "S250100";
					String XML_GUBUN = "GetResponseComplaintsDataforXML";
					res_Echo = epc.GetPLMSDataforXML(str_appNo, eph.getMinwonResponseHTML(MW_SEQ, request, response),
							str_UserId, "", "", XML_GUBUN, str_userName, str_userDeptcd, str_userDeptnm,
							str_userUPDeptcd);
				}

				if (res_Echo) {

					// 문서번호 업데이트
					map.put("DOCKEY", str_appNo);
					map.put("MW_SEQ", params.get("MW_SEQ"));
					mainService.selectQuery("issueSQL.updateMinwonHandlingTmpEchoNo", map);

					System.out.println("%%%%%%%%%%%%map=" + map);
					// 문서 URL조회
//					ArrayList echolist = (ArrayList) Database.getInstance().queryForList("Json.selectMinwonHandlingDocInfo", map);
					ArrayList echolist = (ArrayList) mainService.selectQuery("issueSQL.selectMinwonHandlingDocInfo",
							map);
					if (null != echolist && echolist.size() > 0) {
						String str_EchoNo = String.valueOf(((HashMap) echolist.get(0)).get("OUT_URL"));
						System.out.println("str_EchoNo=====" + str_EchoNo);
						map.put("OUT_URL", str_EchoNo);
					}

				} else {
					map.put("message", "처리 중 오류가 발생했습니다.");
				}
			}

		} catch (Exception e) {
			e.printStackTrace();
			map.put("message", "처리 중 오류가 발생했습니다.");
		}

		JSONObject jo = new JSONObject(map);

		response.setCharacterEncoding("UTF-8");
		response.setHeader("Access-Control-Allow-Origin", "*");
		response.resetBuffer();
		response.setContentType("application/json");
		response.getWriter().print(jo);
		response.getWriter().flush();
	}

	// 민원협의 내용저장 상신
	@Transactional
	@PostMapping(path = "/saveMinwonAgreeData")
	public void saveMinwonAgreeData(HttpServletRequest request, HttpServletResponse response) throws Exception {
		String requestParams = ParameterUtil.getRequestBodyToStr(request);
		JSONObject requestParamObj = new JSONObject(requestParams);
		ParameterParser parser = new ParameterParser(request);
		String fileseq = requestParamObj.getString("fileseq"); // 파일 seq
		String MW_SEQ = requestParamObj.getString("MW_SEQ");
		String AGREE_SEQ = requestParamObj.getString("AGREE_SEQ");
		String AGREE_TITLE = requestParamObj.getString("AGREE_TITLE");
		String AGREE_CONTENTS = requestParamObj.getString("AGREE_CONTENTS");
		String AGREE_DATE = requestParamObj.getString("AGREE_DATE");
		String STATUS = requestParamObj.getString("STATUS");
		String SANGSIN_FLAG = requestParamObj.getString("SANGSIN_FLAG");

		ArrayList list = null;
		HashMap map = new HashMap();
		int agreeSeq = 0;
		try {
			HashMap params = new HashMap();
			// 신규등록시
			if ("".equals(AGREE_SEQ) || "0".equals(AGREE_SEQ)) {

				// 마스터 등록
				params.put("MW_SEQ", MW_SEQ);

				// 민원 협의 마스터 키 번호 생성
//					agreeSeq = (int) Database.getInstance().queryForObject("Json.makeMinwonAgreeKey", params);
				agreeSeq = (int) mainService.selectCountQuery("issueSQL.makeMinwonAgreeKey", params);

				params.put("AGREE_SEQ", agreeSeq);
				params.put("AGREE_TITLE", AGREE_TITLE);
				params.put("AGREE_CONTENTS", AGREE_CONTENTS);
				params.put("AGREE_DATE", AGREE_DATE);
				params.put("STATUS", STATUS);
				params.put("REG_ID", String.valueOf(request.getSession().getAttribute("userName")));

//					Database.getInstance().insert("Json.insertMinwonAgree", params);
				mainService.InsertQuery("issueSQL.insertMinwonAgree", params);

			} else {
				// 수정모드시
				agreeSeq = Integer.parseInt(AGREE_SEQ);

				params.put("MW_SEQ", MW_SEQ);
				params.put("AGREE_SEQ", agreeSeq);
				params.put("AGREE_TITLE", AGREE_TITLE);
				params.put("AGREE_CONTENTS", AGREE_CONTENTS);
				params.put("AGREE_DATE", AGREE_DATE);
				params.put("STATUS", STATUS);
				params.put("REG_ID", String.valueOf(request.getSession().getAttribute("userName")));

//					Database.getInstance().update("Json.updateMinwonAgree", params);
				mainService.InsertQuery("issueSQL.updateMinwonAgree", params);

			}

			// 민원 마스터 상태정보 수정(협의중 : 4)
			params.put("STATUS", "4");
//				Database.getInstance().update("Json.updateMinwonMasterStatus", params);
			mainService.InsertQuery("issueSQL.updateMinwonMasterStatus", params);

			// 첨부파일 등록
			params = new HashMap();
			params.put("MW_SEQ", MW_SEQ);
			params.put("AGREE_SEQ", agreeSeq);
			params.put("FILESEQ", fileseq);
//				Database.getInstance().update("Json.updateMinwonAgreeFileKey", params);
			// mainService.InsertQuery("issueSQL.updateMinwonAgreeFileKey", params);
			map.put("message", "success");

			AGREE_SEQ = String.valueOf(agreeSeq);

			// 전자결제 상신처리
			if ("Y".equals(SANGSIN_FLAG)) {
//					ElectronicPaymentHTML eph = new ElectronicPaymentHTML(); // 상신용 HTML
//					ElectronicPaymentUtil epc = new ElectronicPaymentUtil(); // 전자결재 연계
				ApprovalHtmlUtil eph = new ApprovalHtmlUtil();
				ApprovalUtil epc = new ApprovalUtil();

				String str_appNo = CommonUtil.getNextAppovalSeq();
				boolean res_Echo = false;
				if ("".equals(str_appNo)) {
					map.put("message", "처리 중 오류가 발생했습니다.");
				} else {
//						String str_UserId = String.valueOf(request.getSession().getAttribute("userId"));
//						String str_userName = String.valueOf(request.getSession().getAttribute("userName"));
//						String str_userDeptcd = String.valueOf(request.getSession().getAttribute("userDeptcd"));
//						String str_userDeptnm = String.valueOf(request.getSession().getAttribute("userDeptnm"));
//						String str_userUPDeptcd = String.valueOf(request.getSession().getAttribute("userUPDeptcd"));
					String str_UserId = "105681";
					String str_userName = "박영환";
					String str_userDeptcd = "D250500";
					String str_userDeptnm = "IT전략.지원팀";
					String str_userUPDeptcd = "S250100";
					String XML_GUBUN = "GetConferComplaintsDataforXML";
					res_Echo = epc.GetPLMSDataforXML(str_appNo,
							eph.getMinwonAgreeHTML(MW_SEQ, AGREE_SEQ, fileseq, request, response), str_UserId, "", "",
							XML_GUBUN, str_userName, str_userDeptcd, str_userDeptnm, str_userUPDeptcd);
				}

				if (res_Echo) {

					// 문서번호 업데이트
					map.put("DOCKEY", str_appNo);
					map.put("MW_SEQ", params.get("MW_SEQ"));
					map.put("AGREE_SEQ", AGREE_SEQ);
//						Database.getInstance().update("Json.updateMinwonAgreeEchoNo", map);
					mainService.UpdateQuery("issueSQL.updateMinwonAgreeEchoNo", map);

					System.out.println("%%%%%%%%%%%%map=" + map);
					// 문서 URL조회
//						ArrayList echolist = (ArrayList) Database.getInstance().queryForList("Json.selectMinwonAgreeDocInfo", map);
					ArrayList echolist = (ArrayList) mainService.selectQuery("issueSQL.selectMinwonAgreeDocInfo", map);
					if (null != echolist && echolist.size() > 0) {
						String str_EchoNo = String.valueOf(((HashMap) echolist.get(0)).get("OUT_URL"));
						System.out.println("str_EchoNo=====" + str_EchoNo);
						map.put("OUT_URL", str_EchoNo);
					}

				} else {
					map.put("message", "처리 중 오류가 발생했습니다.");
				}
			}

		} catch (Exception e) {
			e.printStackTrace();
			map.put("message", "처리 중 오류가 발생했습니다.");
		}

		JSONObject jo = new JSONObject(map);

		response.setCharacterEncoding("UTF-8");
		response.setHeader("Access-Control-Allow-Origin", "*");
		response.resetBuffer();
		response.setContentType("application/json");
		response.getWriter().print(jo);
		response.getWriter().flush();
	}

	/**
	 * 민원완료처리 상신키를 눌렀을때
	 * 
	 * @param request
	 * @param response
	 * @throws Exception
	 */
	@Transactional
	@PostMapping(path = "/minwonCompleteSave")
	public void minwonCompleteSave(HttpServletRequest request, HttpServletResponse response) throws Exception {
		String requestParams = ParameterUtil.getRequestBodyToStr(request);
		JSONObject requestParamObj = new JSONObject(requestParams);
		ParameterParser parser = new ParameterParser(request);
		String MW_SEQ = requestParamObj.getString("MW_SEQ");
		String STATUS = requestParamObj.getString("STATUS");

		ArrayList dataList = new ArrayList();
		HashMap map = new HashMap();
		try {

			HashMap params = new HashMap();
			params.put("MW_SEQ", MW_SEQ);

			// 1. 민원완료 가능한 상태인지 체크 ->> 상태값:협의중, 모든 협의상태가 완결.
//			int totalcnt = (Integer) Database.getInstance().queryForObject("Json.selectMinwonCompleteBeforeCheck", params);
			int totalcnt = (Integer) mainService.selectCountQuery("issueSQL.selectMinwonCompleteBeforeCheck", params);

			if (totalcnt > 0) {
				map.put("message", "완료상신이 불가능한 민원입니다. 민원상태를 확인해주세요.");
			} else {
				// 2. 민원완료정보 상신처리.

//				ElectronicPaymentHTML eph = new ElectronicPaymentHTML(); // 상신용 HTML
//				ElectronicPaymentUtil epc = new ElectronicPaymentUtil(); // 전자결재 연계
				ApprovalHtmlUtil eph = new ApprovalHtmlUtil();
				ApprovalUtil epc = new ApprovalUtil();

				String str_appNo = CommonUtil.getNextAppovalSeq();
				boolean res_Echo = false;
				if ("".equals(str_appNo)) {
					map.put("message", "처리 중 오류가 발생했습니다.");
				} else {
//					String str_UserId = String.valueOf(request.getSession().getAttribute("userId"));
//					String str_userName = String.valueOf(request.getSession().getAttribute("userName"));
//					String str_userDeptcd = String.valueOf(request.getSession().getAttribute("userDeptcd"));
//					String str_userDeptnm = String.valueOf(request.getSession().getAttribute("userDeptnm"));
//					String str_userUPDeptcd = String.valueOf(request.getSession().getAttribute("userUPDeptcd"));
					String str_UserId = "105681";
					String str_userName = "박영환";
					String str_userDeptcd = "D250500";
					String str_userDeptnm = "IT전략.지원팀";
					String str_userUPDeptcd = "S250100";
					String XML_GUBUN = "GetEndComplaintsDataforXML";
					res_Echo = epc.GetPLMSDataforXML(str_appNo, eph.getMinwonCompleteHTML(MW_SEQ, request, response),
							str_UserId, "", "", XML_GUBUN, str_userName, str_userDeptcd, str_userDeptnm,
							str_userUPDeptcd);
				}

				if (res_Echo) {

					// 문서번호 업데이트
					map.put("DOCKEY", str_appNo);
					map.put("MW_SEQ", params.get("MW_SEQ"));
//					Database.getInstance().update("Json.updateMinwonMasterCompleteEchoNo", map);
					mainService.UpdateQuery("issueSQL.updateMinwonMasterCompleteEchoNo", map);

					System.out.println("%%%%%%%%%%%%map=" + map);
					// 문서 URL조회
//					ArrayList echolist = (ArrayList) Database.getInstance().queryForList("Json.selectMinwonCompleteDocInfo", map);
					ArrayList echolist = (ArrayList) mainService.selectQuery("issueSQL.selectMinwonCompleteDocInfo",
							map);
					if (null != echolist && echolist.size() > 0) {
						String str_EchoNo = String.valueOf(((HashMap) echolist.get(0)).get("OUT_URL"));
						System.out.println("str_EchoNo=====" + str_EchoNo);
						map.put("OUT_URL", str_EchoNo);
					}
					map.put("message", "success");

				} else {
					map.put("message", "처리 중 오류가 발생했습니다.");
				}

			}

		} catch (Exception e) {
			map.put("message", "처리 중 오류가 발생했습니다.");
			map.put("result", 0);
			e.printStackTrace();
		}

		JSONObject jo = new JSONObject(map);

		response.setCharacterEncoding("UTF-8");
		response.setHeader("Access-Control-Allow-Origin", "*");
		response.resetBuffer();
		response.setContentType("application/json");
		response.getWriter().print(jo);
		response.getWriter().flush();
	}

	@Transactional
	@PostMapping(path = "/cancelMinwonDataApproval")
	public void cancelMinwonDataApproval(HttpServletRequest request, HttpServletResponse response) throws Exception {
		String requestParams = ParameterUtil.getRequestBodyToStr(request);
		JSONObject requestParamObj = new JSONObject(requestParams);
		ParameterParser parser = new ParameterParser(request);
		String MW_SEQ = requestParamObj.getString("MW_SEQ");
		HashMap map = new HashMap();
		try {
			HashMap params = new HashMap();
			params.put("MW_SEQ", MW_SEQ);
			// HashMap target = (HashMap)
			// Database.getInstance().queryForObject("Json.selectMinwonDetail", params);
			// String dockey = (String)target.get("DOCKEY");
			// params.put("DOCKEY", dockey);

			System.out.println("###" + params.toString());
			mainService.UpdateQuery("issueSQL.cancelNinwonEchoNo", params);
			map.put("message", "success");

		} catch (Exception e) {
			e.printStackTrace();
			map.put("message", "처리 중 오류가 발생했습니다.");
		}

		JSONObject jo = new JSONObject(map);
		response.setCharacterEncoding("UTF-8");
		response.setHeader("Access-Control-Allow-Origin", "*");
		response.resetBuffer();
		response.setContentType("application/json");
		response.getWriter().print(jo);
		response.getWriter().flush();
	}

	@Transactional
	@PostMapping(path = "/deleteMinwonMaster")
	public void deleteMinwonMaster(HttpServletRequest request, HttpServletResponse response) throws Exception {
		String requestParams = ParameterUtil.getRequestBodyToStr(request);
		JSONObject requestParamObj = new JSONObject(requestParams);
		ParameterParser parser = new ParameterParser(request);
		String MW_SEQ = (!requestParamObj.has("MW_SEQ") || requestParamObj.getString("MW_SEQ") == null) ? ""
				: requestParamObj.getString("MW_SEQ");

		ArrayList list = null;
		HashMap map = new HashMap();
		HashMap detailMap = null;
		try {
			HashMap params = new HashMap();
			params.put("MW_SEQ", MW_SEQ);

			detailMap = (HashMap) mainService.selectHashmapQuery("issueSQL.selectMinwonDetail", params);
			if (detailMap != null && !detailMap.isEmpty() && !"".equals(detailMap.get("DOCKEY"))) {
				mainService.UpdateQuery("issueSQL.deleteMinwonMaster", params);
			} else {
				map.put("message", "삭제처리가 불가능한 민원정보 데이터입니다.");
			}

			map.put("message", "success");

		} catch (Exception e) {
			e.printStackTrace();
			map.put("message", "처리 중 오류가 발생했습니다.");
		}

		JSONObject jo = new JSONObject(map);

		response.setCharacterEncoding("UTF-8");
		response.setHeader("Access-Control-Allow-Origin", "*");
		response.resetBuffer();
		response.setContentType("application/json");
		response.getWriter().print(jo);
		response.getWriter().flush();
	}

//	@PostMapping(path="/selectMinwonAgreeDetail")
//	public void selectMinwonAgreeDetail(HttpServletRequest request, HttpServletResponse response) throws Exception {
//		ParameterParser parser = new ParameterParser(request);
//		String MW_SEQ = parser.getString("MW_SEQ", "");
//		String AGREE_SEQ = parser.getString("AGREE_SEQ", "");
//		String loginKey = String.valueOf(request.getSession().getAttribute("loginKey"));
//
//		String str_result = "Y";
//		Map detailMap = null;
//		ArrayList fileList = new ArrayList();
//		try {
//
//			Map params = new HashMap();
//			params.put("MW_SEQ", MW_SEQ);
//			params.put("AGREE_SEQ", AGREE_SEQ);
//
//			detailMap = (HashMap) Database.getInstance().queryForObject("Json.selectMinwonAgreeData", params);
//			fileList = (ArrayList) Database.getInstance().queryForList("Json.selectMinwonAgreeDetailFile", params);
//
//		} catch (Exception e) {
//			str_result = "N";
//			e.printStackTrace();
//		}
//		HashMap map = new HashMap();
//
//		map.put("message", str_result);
//		map.put("result", detailMap);
//		map.put("fileList", fileList);
//		map.put("loginKey", loginKey);
//
//		JSONObject jo = new JSONObject(map);
//
//		response.setCharacterEncoding("UTF-8");
//		response.setHeader("Access-Control-Allow-Origin", "*");
//		response.resetBuffer();
//		response.setContentType("application/json");
//		response.getWriter().print(jo);
//		response.getWriter().flush();
//	}
	// 민원협의 삭제처리
	@Transactional
	@PostMapping(path = "/deleteMinwonAgreeData")
	public void deleteMinwonAgreeData(HttpServletRequest request, HttpServletResponse response) throws Exception {
		String requestParams = ParameterUtil.getRequestBodyToStr(request);
		JSONObject requestParamObj = new JSONObject(requestParams);

		ParameterParser parser = new ParameterParser(request);
		String fileseq = (!requestParamObj.has("fileseq") || requestParamObj.getString("fileseq") == null) ? ""
				: requestParamObj.getString("fileseq");

		String MW_SEQ = (!requestParamObj.has("MW_SEQ") || requestParamObj.getString("MW_SEQ") == null) ? ""
				: requestParamObj.getString("MW_SEQ");
		String AGREE_SEQ = requestParamObj.getString("AGREE_SEQ");

		ArrayList list = null;
		HashMap map = new HashMap();
		HashMap detailMap = null;
		int agreeSeq = 0;
		try {
			HashMap params = new HashMap();
			agreeSeq = Integer.parseInt(AGREE_SEQ);

			params.put("MW_SEQ", MW_SEQ);
			params.put("AGREE_SEQ", agreeSeq);
			params.put("REG_ID", String.valueOf(request.getSession().getAttribute("userName")));

			// 삭제가능 상태정보 체크
			detailMap = (HashMap) mainService.selectHashmapQuery("issueSQL.selectMinwonAgreeData", params);
			if (detailMap != null && !detailMap.isEmpty()
					&& ("".equals(detailMap.get("DOCKEY")) || detailMap.get("DOCKEY") == null)) {
				mainService.UpdateQuery("issueSQL.deleteMinwonAgree", params);
				map.put("message", "success");
			} else {
				// 상신되었을 경우 삭제불가.
				map.put("message", "해당 협의내용은 삭제할 수 없습니다.");
			}

		} catch (Exception e) {
			e.printStackTrace();
			map.put("message", "처리 중 오류가 발생했습니다.");
		}

		JSONObject jo = new JSONObject(map);

		response.setCharacterEncoding("UTF-8");
		response.setHeader("Access-Control-Allow-Origin", "*");
		response.resetBuffer();
		response.setContentType("application/json");
		response.getWriter().print(jo);
		response.getWriter().flush();
	}

	// 민원협의 관리자 강제삭제처리
	@Transactional
	@PostMapping(path = "/deleteMinwonAgreeDataAdmin")
	public void deleteMinwonAgreeDataAdmin(HttpServletRequest request, HttpServletResponse response) throws Exception {
		String requestParams = ParameterUtil.getRequestBodyToStr(request);
		JSONObject requestParamObj = new JSONObject(requestParams);

		ParameterParser parser = new ParameterParser(request);
		String fileseq = (!requestParamObj.has("fileseq") || requestParamObj.getString("fileseq") == null) ? ""
				: requestParamObj.getString("fileseq");

		String MW_SEQ = (!requestParamObj.has("MW_SEQ") || requestParamObj.getString("MW_SEQ") == null) ? ""
				: requestParamObj.getString("MW_SEQ");
		String AGREE_SEQ = requestParamObj.getString("AGREE_SEQ");

		ArrayList list = null;
		HashMap map = new HashMap();
		HashMap detailMap = null;
		int agreeSeq = 0;
		try {
			HashMap params = new HashMap();
			agreeSeq = Integer.parseInt(AGREE_SEQ);

			params.put("MW_SEQ", MW_SEQ);
			params.put("AGREE_SEQ", agreeSeq);
			params.put("REG_ID", String.valueOf(request.getSession().getAttribute("userName")));

			// 삭제가능 상태정보 체크 안함.
			mainService.UpdateQuery("issueSQL.deleteMinwonAgree", params);
			map.put("message", "success");

		} catch (Exception e) {
			e.printStackTrace();
			map.put("message", "처리 중 오류가 발생했습니다.");
		}

		JSONObject jo = new JSONObject(map);

		response.setCharacterEncoding("UTF-8");
		response.setHeader("Access-Control-Allow-Origin", "*");
		response.resetBuffer();
		response.setContentType("application/json");
		response.getWriter().print(jo);
		response.getWriter().flush();
	}

	// 이슈관리 -> 이슈코드관리 목록 조회
	@PostMapping(path = "/selectIssueCodeList")
	public void selectIssueCodeList(HttpServletRequest request, HttpServletResponse response) throws Exception {
		String requestParams = ParameterUtil.getRequestBodyToStr(request);
		JSONObject requestParamObj = new JSONObject(requestParams);

		log.info("LJS : jsonResultController.java selectIssueCodeList()");
		ParameterParser parser = new ParameterParser(request);
		String REGISTED_YN = requestParamObj.has("REGISTED_YN") ? requestParamObj.getString("REGISTED_YN") : "";
		String PERMITTED_YN = requestParamObj.has("PERMITTED_YN") ? requestParamObj.getString("PERMITTED_YN") : "";
		String DEPTH1 = requestParamObj.has("DEPTH1") ? requestParamObj.getString("DEPTH1") : "";
		String DEPTH2 = requestParamObj.has("DEPTH2") ? requestParamObj.getString("DEPTH2") : "";
		String DEPTH3 = requestParamObj.has("DEPTH3") ? requestParamObj.getString("DEPTH3") : "";
		String TYPE = requestParamObj.has("TYPE") ? requestParamObj.getString("TYPE") : "";

		ArrayList list = null;
		try {

			HashMap params = new HashMap();
			params.put("REGISTED_YN", REGISTED_YN);
			params.put("PERMITTED_YN", PERMITTED_YN);
			params.put("DEPTH1", DEPTH1);
			params.put("DEPTH2", DEPTH2);
			params.put("DEPTH3", DEPTH3);
			params.put("TYPE", TYPE);

			list = (ArrayList) mainService.selectQuery("issueSQL.selectIssueCodeList", params);

			HashMap map = new HashMap();

			if (list.size() > 0) {
				map.put("message", "success");
			} else {
				map.put("message", "조회된 목록이 없습니다.");
			}
			map.put("result", list);

			JSONObject jo = new JSONObject(map);

			response.setCharacterEncoding("UTF-8");
			response.setHeader("Access-Control-Allow-Origin", "*");
			response.resetBuffer();
			response.setContentType("application/json");
			response.getWriter().print(jo);
			response.getWriter().flush();

		} catch (Exception e) {
			e.printStackTrace();
		}
	}

	// 이슈관리 -> 이슈코드관리 DEPTH1 조회
	@PostMapping(path = "/selectIssueCodeListDepth1")
	public void selectIssueCodeListDepth1(HttpServletRequest request, HttpServletResponse response) throws Exception {
		log.info("LJS : jsonResultController.java selectIssueCodeListDepth1()");
		ParameterParser parser = new ParameterParser(request);
		String DEPTH1 = parser.getString("DEPTH1", "");
		String DEPTH2 = parser.getString("DEPTH2", "");
		String REGISTED_YN = parser.getString("REGISTED_YN", "");
		String PERMITTED_YN = parser.getString("PERMITTED_YN", "");
		String IS_CODE_ADMIN = parser.getString("IS_CODE_ADMIN", "");

		ArrayList list = null;
		try {

			HashMap params = new HashMap();
			params.put("CODE_DEPTH", "1");
			params.put("DEPTH1", DEPTH1);
			params.put("DEPTH2", DEPTH2);
			params.put("REGISTED_YN", REGISTED_YN);
			params.put("PERMITTED_YN", PERMITTED_YN);
			params.put("IS_CODE_ADMIN", IS_CODE_ADMIN);

			list = (ArrayList) mainService.selectQuery("issueSQL.selectIssueCodeListDepth", params);

			HashMap map = new HashMap();

			if (list.size() > 0) {
				map.put("message", "success");
			} else {
				map.put("message", "조회된 목록이 없습니다.");
			}
			map.put("result", list);

			JSONObject jo = new JSONObject(map);

			response.setCharacterEncoding("UTF-8");
			response.setHeader("Access-Control-Allow-Origin", "*");
			response.resetBuffer();
			response.setContentType("application/json");
			response.getWriter().print(jo);
			response.getWriter().flush();

		} catch (Exception e) {
			e.printStackTrace();
		}
	}

	// 이슈관리 -> 이슈코드관리 DEPTH2 조회
	@PostMapping(path = "/selectIssueCodeListDepth2")
	public void selectIssueCodeListDepth2(HttpServletRequest request, HttpServletResponse response) throws Exception {
		log.info("LJS : jsonResultController.java selectIssueCodeListDepth2()");
		ParameterParser parser = new ParameterParser(request);
		String DEPTH1 = parser.getString("DEPTH1", "");
		String DEPTH2 = parser.getString("DEPTH2", "");
		String REGISTED_YN = parser.getString("REGISTED_YN", "");
		String PERMITTED_YN = parser.getString("PERMITTED_YN", "");
		String IS_CODE_ADMIN = parser.getString("IS_CODE_ADMIN", "");

		ArrayList list = null;
		try {

			HashMap params = new HashMap();
			params.put("CODE_DEPTH", "2");
			params.put("DEPTH1", DEPTH1);
			params.put("DEPTH2", DEPTH2);
			params.put("REGISTED_YN", REGISTED_YN);
			params.put("PERMITTED_YN", PERMITTED_YN);
			params.put("IS_CODE_ADMIN", IS_CODE_ADMIN);

			list = (ArrayList) mainService.selectQuery("issueSQL.selectIssueCodeListDepth", params);

			HashMap map = new HashMap();

			if (list.size() > 0) {
				map.put("message", "success");
			} else {
				map.put("message", "조회된 목록이 없습니다.");
			}
			map.put("result", list);

			JSONObject jo = new JSONObject(map);

			response.setCharacterEncoding("UTF-8");
			response.setHeader("Access-Control-Allow-Origin", "*");
			response.resetBuffer();
			response.setContentType("application/json");
			response.getWriter().print(jo);
			response.getWriter().flush();

		} catch (Exception e) {
			e.printStackTrace();
		}
	}

	// 이슈관리 -> 이슈코드관리 DEPTH3 조회
	@PostMapping(path = "/selectIssueCodeListDepth3")
	public void selectIssueCodeListDepth3(HttpServletRequest request, HttpServletResponse response) throws Exception {
		log.info("LJS : jsonResultController.java selectIssueCodeListDepth3()");
		ParameterParser parser = new ParameterParser(request);
		String DEPTH1 = parser.getString("DEPTH1", "");
		String DEPTH2 = parser.getString("DEPTH2", "");
		String REGISTED_YN = parser.getString("REGISTED_YN", "");
		String PERMITTED_YN = parser.getString("PERMITTED_YN", "");
		String IS_CODE_ADMIN = parser.getString("IS_CODE_ADMIN", "");

		ArrayList list = null;
		try {

			HashMap params = new HashMap();
			params.put("CODE_DEPTH", "3");
			params.put("DEPTH1", DEPTH1);
			params.put("DEPTH2", DEPTH2);
			params.put("REGISTED_YN", REGISTED_YN);
			params.put("PERMITTED_YN", PERMITTED_YN);
			params.put("IS_CODE_ADMIN", IS_CODE_ADMIN);

			list = (ArrayList) mainService.selectQuery("issueSQL.selectIssueCodeListDepth", params);

			HashMap map = new HashMap();

			if (list.size() > 0) {
				map.put("message", "success");
			} else {
				map.put("message", "조회된 목록이 없습니다.");
			}
			map.put("result", list);

			JSONObject jo = new JSONObject(map);

			response.setCharacterEncoding("UTF-8");
			response.setHeader("Access-Control-Allow-Origin", "*");
			response.resetBuffer();
			response.setContentType("application/json");
			response.getWriter().print(jo);
			response.getWriter().flush();

		} catch (Exception e) {
			e.printStackTrace();
		}
	}

	// 이슈코드 상세조회
	@GetMapping(path = "/issueCodeDetail")
	public ModelAndView issueCodeDetail(HttpServletRequest request, HttpServletResponse response) throws Exception {
		log.info("LJS : jsonResultController.java selectIssueCodeDetail()");
		ParameterParser parser = new ParameterParser(request);
		String CODE = parser.getString("CODE", "");

		ArrayList list = null;
		HashMap result = new HashMap<>();
		ArrayList manualList = null;
		try {

			HashMap params = new HashMap();
			params.put("CODE", CODE);

			list = (ArrayList) mainService.selectQuery("issueSQL.selectIssueCodeDetail", params);

			// manualList = (ArrayList)
			// mainService.selectQuery("issueSQL.selectIssueCodeManualList", params);

			if (list.size() > 0) {
				result = (HashMap) list.get(0);
			}
		} catch (Exception e) {
			e.printStackTrace();
		}

		String deunggi = "";
		if (((String) result.get("code")).startsWith("DY"))
			deunggi = "지상권 설정";
		else if (((String) result.get("code")).startsWith("DN"))
			deunggi = "지상권 미설정";
		else if (((String) result.get("code")).startsWith("GY"))
			deunggi = "점용";
		else if (((String) result.get("code")).startsWith("GN"))
			deunggi = "미점용";
		result.put("deunggi", deunggi);

		String registed = "계약 미체결";
		if (result.get("registed_yn") != null && result.get("registed_yn").equals("Y"))
			deunggi = "계약 체결";
		result.put("registed", registed);

		log.info("result : " + result);

		ModelAndView mav = new ModelAndView();
		mav.addObject("result", result);
		mav.addObject("manualList", manualList);

		mav.setViewName("content/issue/issueCodeDetail");
		return mav;

	}

	// 이슈코드 상세edit
	@GetMapping(path = "/issueCodeDetailEdit")
	public ModelAndView issueCodeDetailEdit(HttpServletRequest request, HttpServletResponse response) throws Exception {
		log.info("LJS : jsonResultController.java selectIssueCodeDetail()");
		ParameterParser parser = new ParameterParser(request);
		String CODE = parser.getString("CODE", "");

		ArrayList list = null;
		HashMap result = new HashMap<>();
		ArrayList manualList = null;
		try {

			HashMap params = new HashMap();
			params.put("CODE", CODE);

			list = (ArrayList) mainService.selectQuery("issueSQL.selectIssueCodeDetail", params);

			// manualList = (ArrayList)
			// mainService.selectQuery("issueSQL.selectIssueCodeManualList", params);

			if (list.size() > 0) {
				result = (HashMap) list.get(0);
			}
		} catch (Exception e) {
			e.printStackTrace();
		}

		String deunggi = "";
		if (((String) result.get("code")).startsWith("DY"))
			deunggi = "지상권 설정";
		else if (((String) result.get("code")).startsWith("DN"))
			deunggi = "지상권 미설정";
		else if (((String) result.get("code")).startsWith("GY"))
			deunggi = "점용";
		else if (((String) result.get("code")).startsWith("GN"))
			deunggi = "미점용";
		result.put("deunggi", deunggi);

		String registed = "계약 미체결";
		if (result.get("registed_yn") != null && result.get("registed_yn").equals("Y"))
			deunggi = "계약 체결";
		result.put("registed", registed);

		log.info("result : " + result);

		ModelAndView mav = new ModelAndView();
		mav.addObject("result", result);
		mav.addObject("manualList", manualList);

		mav.setViewName("content/issue/issueCodeDetailEdit");
		return mav;

	}

	// 이슈코드 내용 없데이트
	@Transactional
	@PostMapping(path = "/updateIssueCodeText")
	public void updateIssueCodeText(HttpServletRequest request, HttpServletResponse response) throws Exception {
		log.info("LJS : jsonResultController.java updateIssueCodeText()");
		ParameterParser parser = new ParameterParser(request);
		String CODE = parser.getString("CODE", "");
		String CASE_TEXT = parser.getString("CASE_TEXT", "");
		String ETC_TEXT = parser.getString("ETC_TEXT", "");

		ArrayList list = null;
		try {

			HashMap params = new HashMap();
			params.put("CODE", CODE);
			params.put("CASE_TEXT", CASE_TEXT);
			params.put("ETC_TEXT", ETC_TEXT);
			int result = (int) mainService.UpdateQuery("issueSQL.updateIssueCodeText", params);

			HashMap map = new HashMap();
			if (result > 0) {
				map.put("message", "success");
			} else {
				map.put("message", "처리된 데이터가 없습니다.");
			}

			JSONObject jo = new JSONObject(map);

			response.setCharacterEncoding("UTF-8");
			response.setHeader("Access-Control-Allow-Origin", "*");
			response.resetBuffer();
			response.setContentType("application/json");
			response.getWriter().print(jo);
			response.getWriter().flush();

		} catch (Exception e) {
			e.printStackTrace();
		}
	}

	// 이슈 메뉴얼 파일 저장
	@Transactional
	@PostMapping(path = "/insertIssueManualFile")
	public void insertIssueManualFile(HttpServletRequest request, HttpServletResponse response) throws Exception {
		ParameterParser parser = new ParameterParser(request);
		String fileseq = parser.getString("fileseq", ""); // 파일 seq
		String CODE = parser.getString("CODE", "");
		String FILE_VERSION = parser.getString("FILE_VERSION", "");
		String MANUAL_TITLE = parser.getString("MANUAL_TITLE", "");

		ArrayList list = null;
		try {

			HashMap params = new HashMap();
			params.put("FILESEQ", fileseq);
			params.put("CODE", CODE);
			params.put("FILE_VERSION", FILE_VERSION);
			if (FILE_VERSION.equals("1.0")) {
				params.put("MANUAL_TITLE", MANUAL_TITLE);
			} else {
				params.put("MANUAL_TITLE", MANUAL_TITLE);
			}
			int result = (int) mainService.UpdateQuery("issueSQL.updateSeqFileIssue", params);

			HashMap map = new HashMap();
			if (result > 0) {
				map.put("message", "success");
			} else {
				map.put("message", "처리된 데이터가 없습니다.");
			}

			JSONObject jo = new JSONObject(map);

			response.setCharacterEncoding("UTF-8");
			response.setHeader("Access-Control-Allow-Origin", "*");
			response.resetBuffer();
			response.setContentType("application/json");
			response.getWriter().print(jo);
			response.getWriter().flush();

		} catch (Exception e) {
			e.printStackTrace();
		}
	}

	// 이슈 메뉴얼 파일 리스트 조회
	@PostMapping(path = "/selectIssueManualFileVersionList")
	public void selectIssueManualFileVersionList(HttpServletRequest request, HttpServletResponse response)
			throws Exception {
		ParameterParser parser = new ParameterParser(request);
		String CODE = parser.getString("CODE", "");
		String MANUAL_TITLE = parser.getString("MANUAL_TITLE", "");

		ArrayList list = null;
		try {

			HashMap params = new HashMap();
			params.put("CODE", CODE);
			params.put("MANUAL_TITLE", MANUAL_TITLE);

			list = (ArrayList) mainService.selectQuery("issueSQL.selectIssueManualFileVersionList", params);

			HashMap map = new HashMap();

			if (list.size() > 0) {
				map.put("message", "success");
			} else {
				map.put("message", "조회된 목록이 없습니다.");
			}
			map.put("result", list);

			JSONObject jo = new JSONObject(map);

			response.setCharacterEncoding("UTF-8");
			response.setHeader("Access-Control-Allow-Origin", "*");
			response.resetBuffer();
			response.setContentType("application/json");
			response.getWriter().print(jo);
			response.getWriter().flush();

		} catch (Exception e) {
			e.printStackTrace();
		}
	}

	// 이슈 메뉴얼 삭제 seq 기준
	@Transactional
	@PostMapping(path = "/deleteIssueManualBySeq")
	public void deleteIssueManualBySeq(HttpServletRequest request, HttpServletResponse response) throws Exception {
		log.info("LJS : jsonResultController.java deleteIssueManualBySeq()");
		ParameterParser parser = new ParameterParser(request);
		String CODE = parser.getString("CODE", "");
		String SEQ = parser.getString("SEQ", "");
		String file_seq = parser.getString("FILE_SEQ", "");

		try {

			HashMap params = new HashMap();
			params.put("CODE", CODE);
			params.put("SEQ", SEQ);
			params.put("FILE_SEQ", file_seq);

			// 물리파일 삭제는 그냥 패스

			int result = (int) mainService.DeleteQuery("issueSQL.deleteIssueManualBySeq", params);

			HashMap map = new HashMap();

			if (result > 0) {
				map.put("message", "success");
			} else {
				map.put("message", "처리된 데이터가 없습니다");
			}

			JSONObject jo = new JSONObject(map);

			response.setCharacterEncoding("UTF-8");
			response.setHeader("Access-Control-Allow-Origin", "*");
			response.resetBuffer();
			response.setContentType("application/json");
			response.getWriter().print(jo);
			response.getWriter().flush();

		} catch (Exception e) {
			e.printStackTrace();
		}
	}

	// 이슈 메뉴얼 삭제 title 기준
	@Transactional
	@PostMapping(path = "/deleteIssueManualByTitle")
	public void deleteIssueManualByTitle(HttpServletRequest request, HttpServletResponse response) throws Exception {
		log.info("LJS : jsonResultController.java deleteIssueManualByTitle()");
		ParameterParser parser = new ParameterParser(request);
		String CODE = parser.getString("CODE", "");
		String MANUAL_TITLE = parser.getString("MANUAL_TITLE", "");

		try {

			HashMap params = new HashMap();
			params.put("CODE", CODE);
			params.put("MANUAL_TITLE", MANUAL_TITLE);

			int result = (int) mainService.DeleteQuery("issueSQL.deleteIssueManualByTitle", params);

			HashMap map = new HashMap();

			if (result > 0) {
				map.put("message", "success");
			} else {
				map.put("message", "처리된 데이터가 없습니다");
			}

			JSONObject jo = new JSONObject(map);

			response.setCharacterEncoding("UTF-8");
			response.setHeader("Access-Control-Allow-Origin", "*");
			response.resetBuffer();
			response.setContentType("application/json");
			response.getWriter().print(jo);
			response.getWriter().flush();

		} catch (Exception e) {
			e.printStackTrace();
		}
	}

	// 이슈코드 저장
	@Transactional
	@PostMapping(path = "/saveIssueCodeAdmin")
	public void saveIssueCodeAdmin(HttpServletRequest request, HttpServletResponse response) throws Exception {
		log.info("LJS : jsonResultController.java saveIssueCodeAdmin()");
		ParameterParser parser = new ParameterParser(request);
		String DATA_LENGTH = parser.getString("DATA_LENGTH", "");
		String PARENT_CODE = parser.getString("PARENT_CODE", "");

		HashMap map = new HashMap();
		try {
			int result = 0;

			HashMap params = new HashMap();
			for (int i = 0; i < Integer.parseInt(DATA_LENGTH); i++) {
				params = new HashMap();
				params.put("CODE", parser.getString("CODE_" + i, ""));
				params.put("CODE_DEPTH", parser.getString("CODE_DEPTH_" + i, ""));
				params.put("CODE_NAME", parser.getString("CODE_NAME_" + i, ""));
				params.put("PERMITTED_YN", parser.getString("PERMITTED_YN_" + i, ""));
				params.put("REGISTED_YN", parser.getString("REGISTED_YN_" + i, ""));

				if ("".equals(parser.getString("CODE_NAME_" + i, ""))
						&& !"Y".equals(parser.getString("CODE_DEL_" + i, ""))) {
					throw new Exception("코드명 없음.");
				}

				// 분기처리
				if ("Y".equals(parser.getString("CODE_DEL_" + i, ""))) {
					result += (int) mainService.DeleteQuery("issueSQL.deleteIssueCode", params);
				} else if ("NEW".equals(parser.getString("CODE_" + i, ""))) {
					String newCode = null;
					if ("1".equals(parser.getString("CODE_DEPTH_" + i, ""))) {
						HashMap tmpMap = new HashMap();
						tmpMap.put("CODE", PARENT_CODE.substring(0, 2));
						newCode = (String) mainService.selectStringQuery("issueSQL.makeIssueNextCodeDepth1", tmpMap);
					}
					if ("2".equals(parser.getString("CODE_DEPTH_" + i, ""))) {
						HashMap tmpMap = new HashMap();
						tmpMap.put("CODE", PARENT_CODE.substring(0, 4));
						newCode = (String) mainService.selectStringQuery("issueSQL.makeIssueNextCodeDepth2", tmpMap);
					}
					if ("3".equals(parser.getString("CODE_DEPTH_" + i, ""))) {
						HashMap tmpMap = new HashMap();
						tmpMap.put("CODE", PARENT_CODE.substring(0, 6));
						newCode = (String) mainService.selectStringQuery("issueSQL.makeIssueNextCodeDepth3", tmpMap);
					}
					params.put("CODE", newCode);
					mainService.InsertQuery("issueSQL.insertIssueCode", params);
					result++;
				} else {
					// update
					mainService.UpdateQuery("issueSQL.updateIssueCodeName", params);
					result++;
				}
			}

			if (result > 0) {
				map.put("message", "success");
			} else {
				map.put("message", "처리된 데이터가 없습니다");
			}

		} catch (Exception e) {
			e.printStackTrace();
			map.put("message", "처리 중 오류가 발생했습니다");
		}

		JSONObject jo = new JSONObject(map);

		response.setCharacterEncoding("UTF-8");
		response.setHeader("Access-Control-Allow-Origin", "*");
		response.resetBuffer();
		response.setContentType("application/json");
		response.getWriter().print(jo);
		response.getWriter().flush();
	}

//
	// 이슈코드 삭제시 상태체크 사용중인지 이슈코드 삭제전 상태확인
	@PostMapping(path = "/checkIssueCodeStatus")
	public void checkIssueCodeStatus(HttpServletRequest request, HttpServletResponse response) throws Exception {
		log.info("LJS : jsonResultController.java checkIssueCodeStatus()");
		ParameterParser parser = new ParameterParser(request);
		String CODE = parser.getString("CODE", "");

		HashMap map = new HashMap();
		HashMap map2 = new HashMap();
		try {
			int result = 0;

			HashMap params = new HashMap();
			params.put("CODE", CODE);
			map = (HashMap) mainService.selectHashmapQuery("issueSQL.checkIssueCodeStatus", params); // 잠재이슈 체크
			map2 = (HashMap) mainService.selectHashmapQuery("issueSQL.checkIssueCodeMinwonStatus", params); // 민원 체크

			map.put("MINWON_CNT", map2.get("MINWON_CNT"));

		} catch (Exception e) {
			e.printStackTrace();
			map.put("message", "처리 중 오류가 발생했습니다");
		}

		JSONObject jo = new JSONObject(map);

		response.setCharacterEncoding("UTF-8");
		response.setHeader("Access-Control-Allow-Origin", "*");
		response.resetBuffer();
		response.setContentType("application/json");
		response.getWriter().print(jo);
		response.getWriter().flush();
	}

	@PostMapping(path = "/getMinwonJijukSelect") // http://localhost:8080/api/get/dbTest
	public ModelAndView getMinwonJijukSelect(HttpServletRequest httpRequest, HttpServletResponse response)
			throws Exception {
		ModelAndView mav = new ModelAndView();
		HashMap params = new HashMap();
		ArrayList<HashMap> list = new ArrayList<HashMap>();
		// log.info("httpRequest:"+Arrays.toString(httpRequest));

		String address = httpRequest.getParameter("address");
		String sido_nm = httpRequest.getParameter("sido_nm");
		String sgg_nm = httpRequest.getParameter("sgg_nm");
		String emd_nm = httpRequest.getParameter("emd_nm");
		String ri_nm = httpRequest.getParameter("ri_nm");
		String jibun = httpRequest.getParameter("jibun");

		params.put("address", address);
		params.put("sido_nm", sido_nm);
		params.put("sgg_nm", sgg_nm);
		params.put("emd_nm", emd_nm);
		params.put("ri_nm", ri_nm);
		params.put("jibun", jibun);

		log.info("params:" + params);
		ArrayList<HashMap> addressList = mainService.selectQuery("commonSQL.selectJijukFromJisangAddress", params);
		
		log.info("addressList:" + addressList);
		mav.addObject("addressList", addressList);
		mav.setViewName("content/issue/menu06_1");
		return mav;
	}

	// 민원 PNU 검색 (토지정보 검색)
	@PostMapping(path = "/getMinwonJijukSelectNotModel") // http://localhost:8080/api/get/dbTest
	public ModelAndView getMinwonJijukSelectNotModel(HttpServletRequest httpRequest, HttpServletResponse response)
			throws Exception {
		/*
		HashMap params = new HashMap();
		ArrayList<HashMap> list = new ArrayList<HashMap>();
		// log.info("httpRequest:"+Arrays.toString(httpRequest));

		String address = httpRequest.getParameter("address");
		String sido_nm = httpRequest.getParameter("sido_nm");
		String sgg_nm = httpRequest.getParameter("sgg_nm");
		String emd_nm = httpRequest.getParameter("emd_nm");
		String ri_nm = httpRequest.getParameter("ri_nm");
		String jibun = httpRequest.getParameter("jibun");

		params.put("address", address);
		params.put("sido_nm", sido_nm);
		params.put("sgg_nm", sgg_nm);
		params.put("emd_nm", emd_nm);
		params.put("ri_nm", ri_nm);
		params.put("jibun", jibun);

		HashMap map = new HashMap();
		log.info("params:" + params);
		ArrayList<HashMap> addressList = mainService.selectQuery("commonSQL.selectJijukFromJisangAddress", params);
		log.info("addressList:" + addressList);
		map.put("result", addressList);

		JSONObject jo = new JSONObject(map);

		response.setCharacterEncoding("UTF-8");
		response.setHeader("Access-Control-Allow-Origin", "*");
		response.resetBuffer();
		response.setContentType("application/json");
		response.getWriter().print(jo);
		response.getWriter().flush();
		*/
		
		ModelAndView mav = new ModelAndView();
		HashMap params = new HashMap();
		ArrayList<HashMap> list = new ArrayList<HashMap>();
		// log.info("httpRequest:"+Arrays.toString(httpRequest));

		String address = httpRequest.getParameter("address");
		String sido_nm = httpRequest.getParameter("sido_nm");
		String sgg_nm = httpRequest.getParameter("sgg_nm");
		String emd_nm = httpRequest.getParameter("emd_nm");
		String ri_nm = httpRequest.getParameter("ri_nm");
		String jibun = httpRequest.getParameter("jibun");

		/*
		params.put("address", address);
		params.put("sido_nm", sido_nm);
		params.put("sgg_nm", sgg_nm);
		params.put("emd_nm", emd_nm);
		params.put("ri_nm", ri_nm);
		params.put("jibun", jibun);
		*/
		String[] arr = address.split(" ");
		
		params.put("address", "");
		params.put("sido_nm", "");
		params.put("sgg_nm", "");
		params.put("emd_nm", arr[0]);
		params.put("ri_nm", arr[0]);
		params.put("jibun", arr[1]);
		

		log.info("params:" + params);
//		ArrayList<HashMap> addressList = mainService.selectQuery("commonSQL.selectJijukFromJisangAddress", params);
		ArrayList<HashMap> addressList = mainService.selectQuery("commonSQL.selectAddressFromJijuk1", params);
		
		/************************************
		 *  241012 참고 내용
		 * 
		 * jijuk_2024(일명 jijuk_master)테이블에선 등기, 계약정보등이 없습니다.
		 * 그래서 조회한 컬럼값중 jisang_status의 값을 기준으로 jisang이면 jisang_master, gover면 gover_master 테이블에서 그에 해당하는 정보를 가져와야 합니다.
		 * 이 jisang_status의 값은 현재 JISANG, GOVER, DOPCO, NOTSET, N 이렇게 6개입니다.
		 * 
		 *************************************/
		for(HashMap searchMap : addressList) {
			
			String jisangStatus = (String)searchMap.get("jisang_status");
			ArrayList<HashMap> extraAddrInfo =  new ArrayList<>();
			
			params.put("jisang_no", searchMap.get("jisang_no"));
			
			if("JISANG".equals(jisangStatus)) {
				//JIJUK PNU와 비교해서 지상권 추가정보 조회
				extraAddrInfo = mainService.selectQuery("commonSQL.selectAddressExtraInfo_JISANG", params);
			} else if("GOVER".equals(jisangStatus)) {
				extraAddrInfo = mainService.selectQuery("commonSQL.selectAddressExtraInfo_GOVER", params);
			} else if("DOPCO".equals(jisangStatus)) {
				extraAddrInfo = mainService.selectQuery("commonSQL.selectAddressExtraInfo_DOPCO", params);
			} else if("NOTSET".equals(jisangStatus)) {
				extraAddrInfo = mainService.selectQuery("commonSQL.selectAddressExtraInfo_NOTSET", params);
			} else {
				//없으면 PASS. 등기, 계약 정보등은 N으로.
				log.info("jisangStatus is N (value Check) :: " + jisangStatus);
			}
			
			//추가조회한 정보를 더해주기.....(단 추가조회한 정보가 있어야지만 수행)
			if(extraAddrInfo.size() > 0) {
				for(HashMap<String, Object> extraInfoMap : extraAddrInfo) {
					for(Map.Entry<String, Object> entry : extraInfoMap.entrySet()) {
						searchMap.put(entry.getKey(), entry.getValue());
					}
				}
			}
		}
		
//		log.info("addressList:" + addressList);
		mav.addObject("addressList", addressList);
		mav.setViewName("content/issue/menu06_1 :: #minwon_searchResultPopDiv");
		return mav;
	}

	// PNU 조회 //민원신규등록시 주소검색에서 사용
//	@PostMapping(path="/selectMinwonPNUList")
//		public void selectMinwonPNUList(HttpServletRequest request, HttpServletResponse response) throws Exception {
//
//			ArrayList list = new ArrayList();
//			ParameterParser parser = new ParameterParser(request);
//
//			String addrcode = parser.getString("addrcode", "");
//			String jibun = parser.getString("jibun", "");
//			String str_result = "Y";
//			String setBody = "";
//			try {
//
//				Map params = new HashMap();
//				params.put("ADDRCODE", addrcode);
//				params.put("JIBUN", jibun);
//
//				list = (ArrayList) Database.getInstance().queryForList("Json.selectMinwonPNUList", params);
//
//			} catch (Exception e) {
//				str_result = "N";
//				e.printStackTrace();
//			}
//
//			HashMap map = new HashMap();
//
//			if (list != null)
//				map.put("count", list.size());
//			else
//				map.put("count", 0);
//
//			map.put("message", str_result);
//			map.put("result", list);
//			map.put("inHtml", setBody);
//
//			JSONObject jo = new JSONObject(map);
//
//			response.setCharacterEncoding("UTF-8");
//			response.setHeader("Access-Control-Allow-Origin", "*");
//			response.resetBuffer();
//			response.setContentType("application/json");
//			response.getWriter().print(jo);
//			response.getWriter().flush();
//
//		}
//
//	public void selectIssueByPnu(HttpServletRequest request, HttpServletResponse response) throws Exception {
//		log.info("LJS : jsonResultController.java selectIssueByPnu()");
//		ParameterParser parser = new ParameterParser(request);
//		String PNU = parser.getString("PNU", "");
//		String ADDRCODE = parser.getString("ADDRCODE", "");
//		String JIBUN = parser.getString("JIBUN", "");
//
//		ArrayList list = null;
//		ArrayList historyList = null;
//		try {
//
//			Map params = new HashMap();
//			params.put("PNU", PNU);
//			params.put("ADDRCODE", ADDRCODE);
//			params.put("JIBUN", JIBUN);
//			log.info("LJS params:"+params);
//			list = (ArrayList) Database.getInstance().queryForList("Json.selectPnuIssue", params);
//			historyList = (ArrayList) Database.getInstance().queryForList("Json.selectPnuIssueHistoryList", params);
//
//			HashMap map = new HashMap();
//
//			if (list.size() > 0) {
//				map.put("message", "success");
//			} else {
//				map.put("message", "조회된 목록이 없습니다.");
//			}
//			map.put("result", list);
//			map.put("historyList", historyList);
//			
//			JSONObject jo = new JSONObject(map);
//
//			response.setCharacterEncoding("UTF-8");
//			response.setHeader("Access-Control-Allow-Origin", "*");
//			response.resetBuffer();
//			response.setContentType("application/json");
//			response.getWriter().print(jo);
//			response.getWriter().flush();
//
//		} catch (Exception e) {
//			e.printStackTrace();
//		}
//	}
//
//	public void selectIssueForGover(HttpServletRequest request, HttpServletResponse response) throws Exception {
//		ParameterParser parser = new ParameterParser(request);
//		String GOVER_NO = parser.getString("GOVER_NO", "");
//		log.info("LJS : jsonResultController.java selectIssueForGover()");
//		ArrayList list = null;
//		ArrayList historyList = null;
//		try {
//
//			Map params = new HashMap();
//			params.put("GOVER_NO", GOVER_NO);
//
//			list = (ArrayList) Database.getInstance().queryForList("Json.selectPnuIssueGover", params);
//			historyList = (ArrayList) Database.getInstance().queryForList("Json.selectGoverIssueHistoryList", params);
//
//			HashMap map = new HashMap();
//
//			if (list.size() > 0) {
//				map.put("message", "success");
//			} else {
//				map.put("message", "조회된 목록이 없습니다.");
//			}
//			map.put("result", list);
//			map.put("historyList", historyList);
//
//			JSONObject jo = new JSONObject(map);
//
//			response.setCharacterEncoding("UTF-8");
//			response.setHeader("Access-Control-Allow-Origin", "*");
//			response.resetBuffer();
//			response.setContentType("application/json");
//			response.getWriter().print(jo);
//			response.getWriter().flush();
//
//		} catch (Exception e) {
//			e.printStackTrace();
//		}
//	}
//
//	public void selectIssueByPnuDetail(HttpServletRequest request, HttpServletResponse response) throws Exception {
//		log.info("LJS : jsonResultController.java selectIssueByPnuDetail()");
//		ParameterParser parser = new ParameterParser(request);
//		String PNU = parser.getString("PNU", "");
//		String SEQ = parser.getString("SEQ", "");
//		String ADDRCODE = parser.getString("ADDRCODE", "");
//		String JIBUN = parser.getString("JIBUN", "");
//
//		ArrayList list = null;
//		try {
//
//			Map params = new HashMap();
//			params.put("PNU", PNU);
//			params.put("SEQ", SEQ);
//			params.put("ADDRCODE", ADDRCODE);
//			params.put("JIBUN", JIBUN);
//
//			System.out.println(params.toString());
//			list = (ArrayList) Database.getInstance().queryForList("Json.selectPnuIssueDetail", params);
//			log.info("LJS:Json.selectPnuIssueDetail data:"+list);
//			HashMap map = new HashMap();
//
//			if (list.size() > 0) {
//				map.put("message", "success");
//			} else {
//				map.put("message", "조회된 목록이 없습니다.");
//			}
//			map.put("result", list);
//
//			JSONObject jo = new JSONObject(map);
//
//			response.setCharacterEncoding("UTF-8");
//			response.setHeader("Access-Control-Allow-Origin", "*");
//			response.resetBuffer();
//			response.setContentType("application/json");
//			response.getWriter().print(jo);
//			response.getWriter().flush();
//
//		} catch (Exception e) {
//			e.printStackTrace();
//		}
//	}
//
//	public void selectIssueGoverDetail(HttpServletRequest request, HttpServletResponse response) throws Exception {
//		log.info("LJS : jsonResultController.java selectIssueGoverDetail()");
//		ParameterParser parser = new ParameterParser(request);
//		String GOVER_NO = parser.getString("GOVER_NO", "");
//		String SEQ = parser.getString("SEQ", "");
//
//		ArrayList list = null;
//		try {
//
//			Map params = new HashMap();
//			params.put("GOVER_NO", GOVER_NO);
//			params.put("SEQ", SEQ);
//
//			list = (ArrayList) Database.getInstance().queryForList("Json.selectGoverIssueDetail", params);
//
//			HashMap map = new HashMap();
//
//			if (list.size() > 0) {
//				map.put("message", "success");
//			} else {
//				map.put("message", "조회된 목록이 없습니다.");
//			}
//			map.put("result", list);
//
//			JSONObject jo = new JSONObject(map);
//
//			response.setCharacterEncoding("UTF-8");
//			response.setHeader("Access-Control-Allow-Origin", "*");
//			response.resetBuffer();
//			response.setContentType("application/json");
//			response.getWriter().print(jo);
//			response.getWriter().flush();
//
//		} catch (Exception e) {
//			e.printStackTrace();
//		}
//	}
//
//	public void insertPnuIssue(HttpServletRequest request, HttpServletResponse response) throws Exception {
//		log.info("LJS : jsonResultController.java insertPnuIssue()");
//		ParameterParser parser = new ParameterParser(request);
//		String PNU = parser.getString("PNU", "");
//		String SEQ = parser.getString("SEQ", "");
//		String ADDRCODE = parser.getString("ADDRCODE", "");
//		String JIBUN = parser.getString("JIBUN", "");
//		String CODE_DEPTH1 = parser.getString("CODE_DEPTH1", "");
//		String CODE_DEPTH2 = parser.getString("CODE_DEPTH2", "");
//		String CODE_DEPTH3 = parser.getString("CODE_DEPTH3", "");
//		String ISSUE_COMMENT = parser.getString("ISSUE_COMMENT", "");
//		String HISTORY_TYPE = parser.getString("HISTORY_TYPE", "");
//		String HISTORY_CONTENT = parser.getString("HISTORY_CONTENT", "");
//		String REGISTED_YN = parser.getString("REGISTED_YN", "");
//		String PERMITTED_YN = parser.getString("PERMITTED_YN", "");
//
//		try {
//
//			Map params = new HashMap();
//
//			if ("99999".equals(PNU) || "null".equals(PNU)) {
//				// 2023.03.09 :: pnu가 null인 경우가 있음. 
//				params.put("PNU", null);
//			} else {
//				params.put("PNU", PNU);
//			}
//
//			params.put("SEQ", SEQ);
//			params.put("ADDRCODE", ADDRCODE);
//			params.put("JIBUN", JIBUN);
//			params.put("CODE_DEPTH1", CODE_DEPTH1);
//			params.put("CODE_DEPTH2", CODE_DEPTH2);
//			params.put("CODE_DEPTH3", CODE_DEPTH3);
//			params.put("ISSUE_COMMENT", ISSUE_COMMENT);
//			params.put("HISTORY_TYPE", HISTORY_TYPE);
//			params.put("HISTORY_CONTENT", HISTORY_CONTENT);
//			params.put("REGISTED_YN", REGISTED_YN);
//			params.put("PERMITTED_YN", PERMITTED_YN);
//			System.out.println("params="+params.toString());
//			int result = 0;
//			if ("".equals(SEQ)) {
//				SEQ = (String) Database.getInstance().queryForObject("Json.makePnuIssueSeq", params);
//				params.put("SEQ", SEQ);
//				result = Database.getInstance().update("Json.insertPnuIssue", params);
//			} else {
//				result = Database.getInstance().update("Json.updatePnuIssue", params);
//			}
//			
//			System.out.println("result = "+result);
//
//			if (result > 0) {
//				Database.getInstance().update("Json.insertPnuIssueHistory", params);
//			}
//
//			HashMap map = new HashMap();
//
//			if (result > 0) {
//				map.put("message", "success");
//			} else {
//				map.put("message", "처리된 데이터가 없습니다");
//			}
//
//			JSONObject jo = new JSONObject(map);
//
//			response.setCharacterEncoding("UTF-8");
//			response.setHeader("Access-Control-Allow-Origin", "*");
//			response.resetBuffer();
//			response.setContentType("application/json");
//			response.getWriter().print(jo);
//			response.getWriter().flush();
//
//		} catch (Exception e) {
//			e.printStackTrace();
//		}
//	}
//
//	public void insertPnuIssueGover(HttpServletRequest request, HttpServletResponse response) throws Exception {
//		log.info("LJS : jsonResultController.java insertPnuIssueGover()");
//		ParameterParser parser = new ParameterParser(request);
//		String GOVER_NO = parser.getString("GOVER_NO", "");
//		String SEQ = parser.getString("SEQ", "");
//		String CODE_DEPTH1 = parser.getString("CODE_DEPTH1", "");
//		String CODE_DEPTH2 = parser.getString("CODE_DEPTH2", "");
//		String CODE_DEPTH3 = parser.getString("CODE_DEPTH3", "");
//		String ISSUE_COMMENT = parser.getString("ISSUE_COMMENT", "");
//		String HISTORY_TYPE = parser.getString("HISTORY_TYPE", "");
//		String HISTORY_CONTENT = parser.getString("HISTORY_CONTENT", "");
//		String REGISTED_YN = parser.getString("REGISTED_YN", "");
//		String PERMITTED_YN = parser.getString("PERMITTED_YN", "");
//		String LNEWREG = parser.getString("LNEWREG", "");
//		String LPERMITIONYN = parser.getString("LPERMITIONYN", "");
//		String LOCCUP_FEE = parser.getString("LOCCUP_FEE", "");
//		String LPREPAY = parser.getString("LPREPAY", "");
//
//		try {
//
//			Map params = new HashMap();
//
//			params.put("GOVER_NO", GOVER_NO);
//			params.put("CODE_DEPTH1", CODE_DEPTH1);
//			params.put("CODE_DEPTH2", CODE_DEPTH2);
//			params.put("CODE_DEPTH3", CODE_DEPTH3);
//			params.put("ISSUE_COMMENT", ISSUE_COMMENT);
//			params.put("HISTORY_TYPE", HISTORY_TYPE);
//			params.put("HISTORY_CONTENT", HISTORY_CONTENT);
//			params.put("REGISTED_YN", REGISTED_YN);
//			params.put("PERMITTED_YN", PERMITTED_YN);
//			params.put("LNEWREG", LNEWREG);
//			params.put("LPERMITIONYN", LPERMITIONYN);
//			params.put("LOCCUP_FEE", LOCCUP_FEE);
//			params.put("LPREPAY", LPREPAY);
//			int result = 0;
//			if ("".equals(SEQ)) {
//				SEQ = (String) Database.getInstance().queryForObject("Json.makeGoverIssueSeq", params);
//				params.put("SEQ", SEQ);
//				result = Database.getInstance().update("Json.insertGoverIssue", params);
//			} else {
//				params.put("SEQ", SEQ);
//				System.out.println(params);
//				result = Database.getInstance().update("Json.updateGoverIssue", params);
//			}
//
//			Database.getInstance().update("Json.insertGoverIssueHistory", params);
//
//			HashMap map = new HashMap();
//
//			if (result > 0) {
//				map.put("message", "success");
//			} else {
//				map.put("message", "처리된 데이터가 없습니다");
//			}
//
//			JSONObject jo = new JSONObject(map);
//
//			response.setCharacterEncoding("UTF-8");
//			response.setHeader("Access-Control-Allow-Origin", "*");
//			response.resetBuffer();
//			response.setContentType("application/json");
//			response.getWriter().print(jo);
//			response.getWriter().flush();
//
//		} catch (Exception e) {
//			e.printStackTrace();
//		}
//	}
//
//	public void deletePnuIssue(HttpServletRequest request, HttpServletResponse response) throws Exception {
//		ParameterParser parser = new ParameterParser(request);
//		String PNU = parser.getString("PNU", "");
//		String SEQ = parser.getString("SEQ", "");
//		String DEL_COMMENT = parser.getString("DEL_COMMENT", "");
//		String HISTORY_TYPE = parser.getString("HISTORY_TYPE", "");
//		String HISTORY_CONTENT = parser.getString("HISTORY_CONTENT", "");
//
//		try {
//
//			Map params = new HashMap();
//			params.put("PNU", PNU);
//			params.put("SEQ", SEQ);
//			params.put("DEL_COMMENT", DEL_COMMENT);
//			params.put("HISTORY_TYPE", HISTORY_TYPE);
//			params.put("HISTORY_CONTENT", HISTORY_CONTENT);
//
//			int result = Database.getInstance().update("Json.deletePnuIssue", params);
//			Database.getInstance().update("Json.insertPnuIssueHistory", params);
//
//			HashMap map = new HashMap();
//
//			if (result > 0) {
//				map.put("message", "success");
//			} else {
//				map.put("message", "처리된 데이터가 없습니다");
//			}
//
//			JSONObject jo = new JSONObject(map);
//
//			response.setCharacterEncoding("UTF-8");
//			response.setHeader("Access-Control-Allow-Origin", "*");
//			response.resetBuffer();
//			response.setContentType("application/json");
//			response.getWriter().print(jo);
//			response.getWriter().flush();
//
//		} catch (Exception e) {
//			e.printStackTrace();
//		}
//	}
//
//	public void deleteGoverIssue(HttpServletRequest request, HttpServletResponse response) throws Exception {
//		ParameterParser parser = new ParameterParser(request);
//		String GOVER_NO = parser.getString("GOVER_NO", "");
//		String SEQ = parser.getString("SEQ", "");
//		String DEL_COMMENT = parser.getString("DEL_COMMENT", "");
//		String HISTORY_TYPE = parser.getString("HISTORY_TYPE", "");
//		String HISTORY_CONTENT = parser.getString("HISTORY_CONTENT", "");
//
//		try {
//
//			Map params = new HashMap();
//			params.put("GOVER_NO", GOVER_NO);
//			params.put("SEQ", SEQ);
//			params.put("DEL_COMMENT", DEL_COMMENT);
//			params.put("HISTORY_TYPE", HISTORY_TYPE);
//			params.put("HISTORY_CONTENT", HISTORY_CONTENT);
//
//			System.out.println("params=" + params);
//
//			int result = Database.getInstance().update("Json.deleteGoverIssue", params);
//			int hisResult = Database.getInstance().update("Json.insertGoverIssueHistory", params);
//
//			System.out.println(result + " // " + hisResult);
//
//			HashMap map = new HashMap();
//
//			if (result > 0) {
//				map.put("message", "success");
//			} else {
//				map.put("message", "처리된 데이터가 없습니다");
//			}
//
//			JSONObject jo = new JSONObject(map);
//
//			System.out.println("map.toString()=" + map.toString());
//			System.out.println("jo.toString()=" + jo.toString());
//
//			response.setCharacterEncoding("UTF-8");
//			response.setHeader("Access-Control-Allow-Origin", "*");
//			response.resetBuffer();
//			response.setContentType("application/json");
//			response.getWriter().print(jo);
//			response.getWriter().flush();
//
//		} catch (Exception e) {
//			e.printStackTrace();
//		}
//	}
}
