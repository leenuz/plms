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
@CrossOrigin(origins="*",allowedHeaders="*")
public class issueController {
	@Autowired
	private MainService mainService;
	@GetMapping(path="/menu06_1") //http://localhost:8080/api/get/dbTest
    public ModelAndView menu06_1(HttpServletRequest httpRequest, HttpServletResponse response) throws Exception {
//		response.setHeader("X-Frame-Options", "SAMEORIGIN");
//		response.setHeader("Content-Security-Policy", " frame-ancestors 'self'");
		ModelAndView mav=new ModelAndView();
		mav.setViewName("content/issue/menu06_1");
		return mav;
	}
//	
	@GetMapping(path="/issueCodeMgmt") //http://localhost:8080/api/get/dbTest
    public ModelAndView issueCodeMgmt(HttpServletRequest httpRequest, HttpServletResponse response) throws Exception {
//		response.setHeader("X-Frame-Options", "SAMEORIGIN");
//		response.setHeader("Content-Security-Policy", " frame-ancestors 'self'");
		ModelAndView mav=new ModelAndView();
		mav.setViewName("content/issue/issueCodeMgmt");
		return mav;
	}
	@RequestMapping(value="/menu06_1DataTableList", method = {RequestMethod.GET, RequestMethod.POST}) //http://localhost:8080/api/get/dbTest
	public ResponseEntity<?> menu06_1DataTableList(HttpServletRequest req, HttpServletResponse res) throws Exception {

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

		
		

		String mw_title="";
		String code1="";
		String code2="";
		String code3="";
		String status="";
		String start_date=req.getParameter("start_date"); //취득기간
		String end_date=req.getParameter("end_date");

		Map map=req.getParameterMap();

		HashMap params = new HashMap();
		params.put("draw",draw);
		params.put("start",start);
		
		params.put("jisa",jisa); //발생지사
		params.put("mw_title",mw_title); //민원명
		params.put("code1",mw_title); //이슈유형1
		params.put("code2",mw_title); //이슈유형
		params.put("code3",mw_title); //이슈유형
		params.put("status",mw_title); //진행현황
		
		params.put("address",address);

		
		

		
		params.put("start_date", start_date); //발생일자
		params.put("end_date", end_date); //발생일자

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

		Object count= mainService.selectCountQuery("issueSQL.selectMinwonTotalCount", params);
		int total=(int)count;

		ArrayList<HashMap> list = mainService.selectQuery("issueSQL.selectMinwonList",params);
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

	@GetMapping(path="/approval") // 민뭔관리-민원등록
    public ModelAndView approval(HttpServletRequest httpRequest, HttpServletResponse response) throws Exception {
		ModelAndView mav=new ModelAndView();
		mav.setViewName("content/issue/approval");
		return mav;
	}
	
	@GetMapping(path="/approval2") // 민원관리-대응방안수립보고
    public ModelAndView approval2(HttpServletRequest httpRequest, HttpServletResponse response) throws Exception {
		ModelAndView mav=new ModelAndView();
		mav.setViewName("content/issue/approval2");
		return mav;
	}

	@GetMapping(path="/approval3") // 민원관리-민원협의보고
    public ModelAndView approval3(HttpServletRequest httpRequest, HttpServletResponse response) throws Exception {
		ModelAndView mav=new ModelAndView();
		mav.setViewName("content/issue/approval3");
		return mav;
	}

	@GetMapping(path="/approval4") // 민원관리-민원완료보고
    public ModelAndView approval4(HttpServletRequest httpRequest, HttpServletResponse response) throws Exception {
		ModelAndView mav=new ModelAndView();
		mav.setViewName("content/issue/approval4");
		return mav;
	}
	
	
	// PNU 조회
	@PostMapping(path="/selectMinwonPNUList") 
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

				//list = (ArrayList) Database.getInstance().queryForList("Json.selectMinwonPNUList", params);
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
		@PostMapping(path="/selectMinwonPNUList1") 
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

					//list = (ArrayList) Database.getInstance().queryForList("Json.selectMinwonPNUList", params);
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
	@PostMapping(path="/selectMinwonDetail") 
		public void selectMinwonDetail(HttpServletRequest request, HttpServletResponse response) throws Exception {
		 String requestParams = ParameterUtil.getRequestBodyToStr(request);
		 JSONObject requestParamObj=new JSONObject(requestParams);
			ParameterParser parser = new ParameterParser(request);
//			String MW_SEQ = parser.getString("MW_SEQ", "");
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
				log.info("detailMap:"+tmpList.get(0));
				detailMap=(HashMap)tmpList.get(0);
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
	
	//민원신규등록
	@Transactional
	@PostMapping(path="/saveMinwonData") 
	public void saveMinwonData(HttpServletRequest request, HttpServletResponse response) throws Exception {
		 String requestParams = ParameterUtil.getRequestBodyToStr(request);
		 JSONObject requestParamObj=new JSONObject(requestParams);
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
		String fileseq = requestParamObj.getString("fileseq")==null?"":requestParamObj.getString("fileseq"); // 파일 seq
		String MW_SEQ = requestParamObj.getString("MW_SEQ");
		String MW_TITLE = requestParamObj.getString("MW_TITLE");
		String MW_CONTENTS = requestParamObj.getString("MW_CONTENTS");
		String MW_OCCUR_DATE = requestParamObj.getString("MW_OCCUR_DATE");
		String JISA = requestParamObj.getString("JISA");
		String TOJI_LENGTH = requestParamObj.getString("TOJI_LENGTH");
		String SANGSIN_FLAG = requestParamObj.getString("SANGSIN_FLAG");

		Integer FILE_DEL_LENGTH = requestParamObj.getInt("FILE_DEL_LENGTH");
		JSONArray tojiList=requestParamObj.getJSONArray("tojiList");

		ArrayList list = null;
		HashMap map = new HashMap();
		int mwSeq = 0;

		try {
			//Database.getInstance().startTransaction();
			HashMap params = new HashMap();
			// 신규등록시
			if ("".equals(MW_SEQ) || "0".equals(MW_SEQ)) {

				// 민원 마스터 키 번호 생성
//				mwSeq = (int) Database.getInstance().queryForObject("Json.makeMinwonMasterKey");
				mwSeq = (int) mainService.selectCountQuery("issueSQL.makeMinwonMasterKey",params);

				MW_SEQ = String.valueOf(mwSeq);

				// 마스터 등록
				params.put("MW_SEQ", mwSeq);
				params.put("MW_TITLE", MW_TITLE);
				params.put("MW_CONTENTS", MW_CONTENTS);
				params.put("MW_OCCUR_DATE", MW_OCCUR_DATE);
				params.put("JISA", JISA);
				params.put("STATUS", "1");
				params.put("REG_ID", String.valueOf(request.getSession().getAttribute("userName")));

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
				params.put("REG_ID", String.valueOf(request.getSession().getAttribute("userName")));

//				Database.getInstance().update("Json.updateMinwonMaster", params);
				mainService.InsertQuery("issueSQL.updateMinwonMaster",params);

				// 삭제할 첨부파일 처리
				if (FILE_DEL_LENGTH > 0) {
					for (int i = 0; i < FILE_DEL_LENGTH; i++) {
						mwSeq = Integer.parseInt(MW_SEQ);
						params.put("MW_SEQ", mwSeq);
						params.put("SEQ", parser.getString("FILE_DEL_SEQ" + i, ""));
//						Database.getInstance().update("Json.deleteMinwonFile", params);
						mainService.DeleteQuery("issueSQL.deleteMinwonFile", params);
					}
				}

			}

			// 첨부파일 등록
//			params = new HashMap();
//			params.put("MW_SEQ", mwSeq);
//			params.put("FILESEQ", fileseq);
//			Database.getInstance().update("Json.updateMinwonFileKey", params);

			// 기존 토지정보 전부 삭제처리
//			Database.getInstance().delete("Json.deleteMinwonPnu", params);
			mainService.DeleteQuery("issueSQL.deleteMinwonPnu", params);

			// 토지정보 등록
//			for (int i = 0; i < Integer.parseInt(TOJI_LENGTH); i++) {
			for (int i = 0; i <tojiList.length(); i++) {
				log.info("tojiList:"+tojiList.get(i));
				JSONObject obj=new JSONObject(tojiList.get(i).toString());
				log.info("obj:"+obj);
				params = new HashMap();
				params.put("MW_SEQ", mwSeq);
				params.put("MINWON_SEQ", mwSeq);
				params.put("PNU", obj.getString("pnu"));
				params.put("ADDRCODE", (obj.getString("addrcode")==null || obj.getString("addrcode")=="null")?"":obj.getString("addrcode"));
				params.put("SIDO_NM", obj.getString("sido_nm"));
				params.put("SGG_NM", obj.getString("sgg_nm"));
				params.put("EMD_NM", obj.getString("emd_nm"));
				params.put("RI_NM", obj.getString("ri_nm"));
				params.put("JIBUN", obj.getString("jibun"));
				params.put("JIBUN_FULL", obj.getString("jibun_full"));
				params.put("REP_YN", obj.getString("rep_yn"));
				params.put("REGISTED_YN", (obj.getString("comple_yn")==null || obj.getString("comple_yn")=="null")?"":obj.getString("comple_yn"));
				params.put("PERMITTED_YN", (obj.getString("permitted_yn")==null || obj.getString("permitted_yn")=="null")?"":obj.getString("permitted_yn"));
				params.put("TOJI_TYPE","");
				params.put("REG_ID","test");
				//params.put("REG_ID", String.valueOf((request.getSession().getAttribute("userName")=="null")?"":request.getSession().getAttribute("userName")));
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
log.info("map:"+map);
log.info("SANGSIN_FLAG:"+SANGSIN_FLAG);
		/**
		 * 별도 트랜잭션 분리를 위해 이렇게 처리함. 상단 정보처리단이 정상적으로 수행됐을 경우에만 아래 전자결제 관련 처리 진행
		 */
		if ("success".equals(map.get("message")) && "Y".equals(SANGSIN_FLAG)) {

			try {
//				Database.getInstance().startTransaction();
				// 전자결재 상신 시
				ApprovalHtmlUtil eph=new ApprovalHtmlUtil();
				ApprovalUtil epc= new ApprovalUtil();
//				ElectronicPaymentHTML eph = new ElectronicPaymentHTML(); // 상신용 HTML
//				ElectronicPaymentUtil epc = new ElectronicPaymentUtil(); // 전자결재 연계

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
					String XML_GUBUN = "GetOccureComplaintsDataforXML";
					
					res_Echo = epc.GetPLMSDataforXML(str_appNo, eph.getMinwonGenerateHTML(MW_SEQ, fileseq, request, response), str_UserId, "", "", XML_GUBUN, str_userName, str_userDeptcd, str_userDeptnm, str_userUPDeptcd);
				}

				if (res_Echo) {

					// 문서번호 업데이트
					map.put("DOCKEY", str_appNo);
					map.put("MW_SEQ", MW_SEQ);
					//Database.getInstance().update("Json.updateNinwonEchoNo", map);
					mainService.InsertQuery("issueSQL.updateNinwonEchoNo", map);

					System.out.println("%%%%%%%%%%%%map=" + map);
					// 문서 URL조회
//					ArrayList echolist = (ArrayList) Database.getInstance().queryForList("Json.selectMinwonDocInfo", map);
					ArrayList echolist = (ArrayList) mainService.selectQuery("issueSQL.selectMinwonDocInfo", map);
					if (null != echolist && echolist.size() > 0) {
						String str_EchoNo = String.valueOf(((HashMap) echolist.get(0)).get("OUT_URL"));
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
				//Database.getInstance().endTransaction();
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
	@PostMapping(path="/saveMinwonHandling") 
	public void saveMinwonHandling(HttpServletRequest request, HttpServletResponse response) throws Exception {
		String requestParams = ParameterUtil.getRequestBodyToStr(request);
		 JSONObject requestParamObj=new JSONObject(requestParams);
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
				ApprovalHtmlUtil eph=new ApprovalHtmlUtil();
				ApprovalUtil epc= new ApprovalUtil();

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
					res_Echo = epc.GetPLMSDataforXML(str_appNo, eph.getMinwonResponseHTML(MW_SEQ, request, response), str_UserId, "", "", XML_GUBUN, str_userName, str_userDeptcd, str_userDeptnm, str_userUPDeptcd);
				}

				if (res_Echo) {

					// 문서번호 업데이트
					map.put("DOCKEY", str_appNo);
					map.put("MW_SEQ", params.get("MW_SEQ"));
					mainService.selectQuery("issueSQL.updateMinwonHandlingTmpEchoNo", map);

					System.out.println("%%%%%%%%%%%%map=" + map);
					// 문서 URL조회
//					ArrayList echolist = (ArrayList) Database.getInstance().queryForList("Json.selectMinwonHandlingDocInfo", map);
					ArrayList echolist = (ArrayList) mainService.selectQuery("issueSQL.selectMinwonHandlingDocInfo", map);
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
	@PostMapping(path="/saveMinwonAgreeData")
		public void saveMinwonAgreeData(HttpServletRequest request, HttpServletResponse response) throws Exception {
		String requestParams = ParameterUtil.getRequestBodyToStr(request);
		 JSONObject requestParamObj=new JSONObject(requestParams);
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
				//mainService.InsertQuery("issueSQL.updateMinwonAgreeFileKey", params);
				map.put("message", "success");

				AGREE_SEQ = String.valueOf(agreeSeq);

				// 전자결제 상신처리
				if ("Y".equals(SANGSIN_FLAG)) {
//					ElectronicPaymentHTML eph = new ElectronicPaymentHTML(); // 상신용 HTML
//					ElectronicPaymentUtil epc = new ElectronicPaymentUtil(); // 전자결재 연계
					ApprovalHtmlUtil eph=new ApprovalHtmlUtil();
					ApprovalUtil epc= new ApprovalUtil();

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
						res_Echo = epc.GetPLMSDataforXML(str_appNo, eph.getMinwonAgreeHTML(MW_SEQ, AGREE_SEQ, fileseq, request, response), str_UserId, "", "", XML_GUBUN, str_userName, str_userDeptcd, str_userDeptnm, str_userUPDeptcd);
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
	 * 민원완료처리
	 * 상신키를 눌렀을때 
	 * @param request
	 * @param response
	 * @throws Exception
	 */
	@Transactional
	@PostMapping(path="/minwonCompleteSave")
	public void minwonCompleteSave(HttpServletRequest request, HttpServletResponse response) throws Exception {
		String requestParams = ParameterUtil.getRequestBodyToStr(request);
		 JSONObject requestParamObj=new JSONObject(requestParams);
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
				ApprovalHtmlUtil eph=new ApprovalHtmlUtil();
				ApprovalUtil epc= new ApprovalUtil();

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
					res_Echo = epc.GetPLMSDataforXML(str_appNo, eph.getMinwonCompleteHTML(MW_SEQ, request, response), str_UserId, "", "", XML_GUBUN, str_userName, str_userDeptcd, str_userDeptnm, str_userUPDeptcd);
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
					ArrayList echolist = (ArrayList) mainService.selectQuery("issueSQL.selectMinwonCompleteDocInfo", map);
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
	@PostMapping(path="/cancelMinwonDataApproval")
	public void cancelMinwonDataApproval(HttpServletRequest request, HttpServletResponse response) throws Exception {
		String requestParams = ParameterUtil.getRequestBodyToStr(request);
		 JSONObject requestParamObj=new JSONObject(requestParams);
		ParameterParser parser = new ParameterParser(request);
		String MW_SEQ = requestParamObj.getString("MW_SEQ");
		HashMap map = new HashMap();
		try {
			HashMap params = new HashMap();
			params.put("MW_SEQ", MW_SEQ);
			// HashMap target = (HashMap) Database.getInstance().queryForObject("Json.selectMinwonDetail", params);
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
	@PostMapping(path="/deleteMinwonMaster")
	public void deleteMinwonMaster(HttpServletRequest request, HttpServletResponse response) throws Exception {
		String requestParams = ParameterUtil.getRequestBodyToStr(request);
		 JSONObject requestParamObj=new JSONObject(requestParams);
		ParameterParser parser = new ParameterParser(request);
		String MW_SEQ = (!requestParamObj.has("MW_SEQ")||requestParamObj.getString("MW_SEQ")==null)?"":requestParamObj.getString("MW_SEQ");

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
	@PostMapping(path="/deleteMinwonAgreeData")
		public void deleteMinwonAgreeData(HttpServletRequest request, HttpServletResponse response) throws Exception {
		String requestParams = ParameterUtil.getRequestBodyToStr(request);
		 JSONObject requestParamObj=new JSONObject(requestParams);
		 
			ParameterParser parser = new ParameterParser(request);
			String fileseq = (!requestParamObj.has("fileseq")||requestParamObj.getString("fileseq")==null)?"":requestParamObj.getString("fileseq");
			
			String MW_SEQ = (!requestParamObj.has("MW_SEQ")||requestParamObj.getString("MW_SEQ")==null)?"":requestParamObj.getString("MW_SEQ");
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
				if (detailMap != null && !detailMap.isEmpty() && ("".equals(detailMap.get("DOCKEY")) || detailMap.get("DOCKEY") == null)) {
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
	@PostMapping(path="/deleteMinwonAgreeDataAdmin")
		public void deleteMinwonAgreeDataAdmin(HttpServletRequest request, HttpServletResponse response) throws Exception {
		String requestParams = ParameterUtil.getRequestBodyToStr(request);
		 JSONObject requestParamObj=new JSONObject(requestParams);
		 
			ParameterParser parser = new ParameterParser(request);
			String fileseq = (!requestParamObj.has("fileseq")||requestParamObj.getString("fileseq")==null)?"":requestParamObj.getString("fileseq");
			
			String MW_SEQ = (!requestParamObj.has("MW_SEQ")||requestParamObj.getString("MW_SEQ")==null)?"":requestParamObj.getString("MW_SEQ");
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

}
