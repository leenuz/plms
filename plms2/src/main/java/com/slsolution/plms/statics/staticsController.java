package com.slsolution.plms.statics;

import java.io.InputStream;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Calendar;
import java.util.Date;
import java.util.Enumeration;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Properties;
import java.util.SortedSet;
import java.util.TreeSet;
import java.util.stream.Collectors;

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

import com.slsolution.plms.CommonUtil;
import com.slsolution.plms.ExcelUtil;
import com.slsolution.plms.MainService;
import com.slsolution.plms.ParameterParser;
import com.slsolution.plms.ParameterUtil;
import com.slsolution.plms.config.GlobalConfig;
import com.slsolution.plms.json.JSONObject;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@EnableAsync
@RequiredArgsConstructor
@RestController
@RequestMapping("/statics")
@CrossOrigin(origins="*",allowedHeaders="*")
public class staticsController {
	@Autowired
	private MainService mainService;
	
	@Autowired
	 private GlobalConfig GC;
	
	
	
	
	
	
	
	
	

	/**
	 * 권리확보현황 마감처리
	 * 
	 * @param request
	 * @param response
	 * @throws Exception
	 */
	@Transactional
	@PostMapping(path="/deadlineProcess")
	public void deadlineProcess(HttpServletRequest request, HttpServletResponse response) throws Exception {
		String requestParams = ParameterUtil.getRequestBodyToStr(request);
		 JSONObject requestParamObj=new JSONObject(requestParams);
		ParameterParser parser = new ParameterParser(request);
		String SAVE_YEAR = requestParamObj.getString("SAVE_YEAR");
		String SAVE_QUARTER = requestParamObj.getString("SAVE_QUARTER");
		String PROCESS_DATE = requestParamObj.getString("PROCESS_DATE");
//
		HashMap map = new HashMap<>();
//
		try {

//			Properties env = new Properties();
//			InputStream is = getClass().getResourceAsStream("/db.properties");
//			try {
//				env.load(is);
//			} catch (Exception es) {
//				es.printStackTrace();
//				System.err.println("Can't read the properties file. " + "Make sure env.properties is in the CLASSPATH");
//			}

			String excelFIleBase = GC.getStatisFileDataDir();

			map = selectTogiMgtStateListReturn(request, response);

			HashMap rst = (HashMap) map.get("result");

			rst.put("SAVE_YEAR", SAVE_YEAR);
			rst.put("SAVE_QUARTER", SAVE_QUARTER);
			rst.put("PROCESS_DATE", PROCESS_DATE);
			rst.put("SAYUJI_TOTAL", String.valueOf(Long.valueOf((String) rst.get("SAYUJI_N")) + Long.valueOf((String) rst.get("SAYUJI_Y_Y")) + Long.valueOf((String) rst.get("SAYUJI_Y_N"))));
			rst.put("GUKYUJI_TOTAL", String.valueOf(Long.valueOf((String) rst.get("GUKYUJI_Y")) + Long.valueOf((String) rst.get("GUKYUJI_N")) + Long.valueOf((String) rst.get("GUKYUJI_J"))));

			// 엑셀파일 제작
			HashMap params = new HashMap();
			params.put("JISANG_STATUS", "'GOVER','JISANG','NOTSET'");
			HashMap<String,Object> ma=mainService.selectHashmapQuery("songyuSQL.selectSonguList", params);
			ArrayList<HashMap<String, Object>> list = new ArrayList();
			list.add(ma);
			//ArrayList<HashMap<String, Object>> list =(ArrayList) aaaa;
			//ArrayList<HashMap<String, Object>> list = (ArrayList<HashMap<String, Object>>) mainService.selectHashmapQuery("songyuSQL.selectSonguList", params);
//
//			// 일부 문자열 처리
			for (HashMap excelMap : list) {
				// 관경
				if (excelMap.get("PIPE_METER2") != null && !"".equals(excelMap.get("PIPE_METER2"))) {
					excelMap.put("PIPE_METER_XLS", String.valueOf(excelMap.get("PIPE_METER")) + ", " + String.valueOf(excelMap.get("PIPE_METER2")));
				} else {
					excelMap.put("PIPE_METER_XLS", CommonUtil.nvl("" + excelMap.get("PIPE_METER")));
				}
				// 소유자
				if (excelMap.get("SOUJA_CNT") != null && Integer.parseInt("" + excelMap.get("SOUJA_CNT")) > 0) {
					excelMap.put("SOUJA_NAME_XLS", String.valueOf(excelMap.get("SOUJA_NAME")) + " 외" + excelMap.get("SOUJA_CNT") + "명");
				} else {
					excelMap.put("SOUJA_NAME_XLS", CommonUtil.evl("" + excelMap.get("SOUJA_NAME"), ""));
				}
				// 토지유형 문자열
				if (excelMap.get("GOVER_OWN_YN") != null && "Y".equals(excelMap.get("GOVER_OWN_YN"))) {
					excelMap.put("GOVER_OWN_YN_XLS", "국유지");
				} else {
					excelMap.put("GOVER_OWN_YN_XLS", "사유지");
				}
				// 권리확보
				if (excelMap.get("MASTER_NO") != null) {
					if (String.valueOf(excelMap.get("MASTER_NO")).startsWith("J")) {
						excelMap.put("MASTER_TYPE", "지상권");
					} else if (String.valueOf(excelMap.get("MASTER_NO")).startsWith("G")) {
						excelMap.put("MASTER_TYPE", "점용");
					} else if (String.valueOf(excelMap.get("MASTER_NO")).startsWith("N")) {
						excelMap.put("MASTER_TYPE", "미설정");
					} else if (String.valueOf(excelMap.get("MASTER_NO")).startsWith("L")) {
						excelMap.put("MASTER_TYPE", "매입");
					} else {
						excelMap.put("MASTER_TYPE", "미설정");
					}
				}
				// 점용기간
				if (excelMap.get("PMT_ST_DATE") != null && !"".equals(excelMap.get("PMT_ST_DATE")) && excelMap.get("PMT_ED_DATE") != null && !"".equals(excelMap.get("PMT_ED_DATE"))) {
					excelMap.put("GOVER_PERIOD", CommonUtil.nvl((String) excelMap.get("PMT_ST_DATE")) + " ~ " + CommonUtil.nvl((String) excelMap.get("PMT_ED_DATE")));
				} else {
					excelMap.put("GOVER_PERIOD", "-");
				}
			}

			String[] mapNames = { "RN", // 순번
					"JISA", // 담당지사
					"PIPE_OVERLAP_YN", // 관로저촉
					"PIPE_METER_XLS", // 관경
					"SIDO_NM", // 시도
					"SGG_NM", // 시군구
					"EMD_NM", // 읍면동
					"RI_NM", // 리
					"JIBUN", // 지번
					"JIMOK_TEXT", // 지목
					"SOUJA_NAME_XLS", // 소유자
					"JIJUK_AREA", // 면적
					"GOVER_OWN_YN_XLS", // 토지유형
					"MASTER_TYPE", // 권리확보
					"JASAN_NO", // 자산번호
					"MASTER_NO", // 관리번호
					"CHUIDEUK_DATE", // 취득일
					"GOVER_PERIOD", // 점용기간
					"PAY_DATE", // 점용납부일
					"GOVER_AREA", // 설정면적
					"GOVER_LENGTH", // 설정연장
					"JASAN_MONEY", // 자산금액
					"PAY_MONEY" // 납부금액
			};
			ArrayList<String> headerStr = new ArrayList<String>();
			headerStr.add("순번");
			headerStr.add("담당지사");
			headerStr.add("관로저촉");
			headerStr.add("관경");
			headerStr.add("시도");
			headerStr.add("시군구");
			headerStr.add("읍면동");
			headerStr.add("리");
			headerStr.add("지번");
			headerStr.add("지목");
			headerStr.add("소유자");
			headerStr.add("면적");
			headerStr.add("토지유형");
			headerStr.add("권리확보");
			headerStr.add("자산번호");
			headerStr.add("관리번호");
			headerStr.add("취득일");
			headerStr.add("점용기간");
			headerStr.add("점용납부일");
			headerStr.add("설정면적");
			headerStr.add("설정연장");
			headerStr.add("자산금액");
			headerStr.add("납부금액");

			String excelFileName = ExcelUtil.makeMapList2Excel(excelFIleBase + "/uploadfile/statExcel", "권리확보현황", headerStr, mapNames, list);

			rst.put("FILE_PATH", "/uploadfile/statExcel/" + excelFileName);
			rst.put("FILE_NAME", excelFileName);
			System.out.println("권리확보현황 마감처리 ::: " + rst.toString());
			int result =(int) mainService.InsertQuery("staticSQL.insertStatisticsDeadlineProcess", rst);

			if (result > 0) {
				map.put("result", "success");
			} else {
				map.put("result", "ERROR");
			}
		} catch (Exception e) {
			e.printStackTrace();
			map.put("result", "ERROR");
		}

		JSONObject jo = new JSONObject(map);
		response.setCharacterEncoding("UTF-8");
		response.setHeader("Access-Control-Allow-Origin", "*");
		response.resetBuffer();
		response.setContentType("application/json");
		response.getWriter().print(jo);
		response.getWriter().flush();
	}
	
	
	@RequestMapping(value="/selectStatisticsDeadlineListTableList", method = {RequestMethod.GET, RequestMethod.POST}) //http://localhost:8080/api/get/dbTest
	public ResponseEntity<?> selectStatisticsDeadlineListTableList(HttpServletRequest req, HttpServletResponse res) throws Exception {
		
		//일반웹형식
		Properties requestParams = CommonUtil.convertToProperties(req);
		log.info("req:"+req);
		HashMap<String, String> returnHash = new HashMap<String, String>();
		Enumeration<String> obj1 = req.getParameterNames();
		int cnt=0;
		 
		while (obj1.hasMoreElements())
		{
			String paramName = obj1.nextElement();
			String paramValue = req.getParameter(paramName);
			returnHash.put(paramName, paramValue);
			log.info("paramName:"+paramName);
			log.info("paramValue:"+paramValue);
		}

		int draw = Integer.parseInt(req.getParameter("draw"));
		int start = Integer.parseInt(req.getParameter("start"));
		int length = Integer.parseInt(req.getParameter("length"));
		String orderColumn=req.getParameter("order[0][column]");
		String orderDirection = req.getParameter("order[0][dir]");
		String orderColumnName=req.getParameter("columns[" + orderColumn + "][data]");

		String[] order_cols=req.getParameterValues("order");

		String jisa = req.getParameter("jisa");
		String SAVE_YEAR = req.getParameter("SAVE_YEAR");
		String SAVE_QUARTER = req.getParameter("SAVE_QUARTER");
//		String dosiplan = req.getParameter("dosiplan");
//		String address = req.getParameter("saddr");
//		
//		String sido_nm = req.getParameter("sido_nm");
//		String sgg_nm = req.getParameter("sgg_nm");
//		String emd_nm = req.getParameter("emd_nm");
//		String ri_nm = req.getParameter("ri_nm");
//		String jibun = req.getParameter("jibun");
//
//		String souja = req.getParameter("souja");
//		String jasan_no = req.getParameter("jasan_no");
//		String jimok_text = req.getParameter("jimok_text")==null?"":req.getParameter("jimok_text");
//		List<String> jimokTexts=new ArrayList<String>();
//		if (jimok_text!=null && !jimok_text.trim().isEmpty())	 jimokTexts = Arrays.asList(jimok_text.split(","));
//		
//		//String[] jimokArray = jimok_text != null && !jimok_text.trim().isEmpty() ? jimok_text.split(",") : new String[0]; // 빈 배열로 초기화
//
//		String comple_yn = req.getParameter("comple_yn");
//		String cancel_yn = req.getParameter("cancel_yn");
//		String deunggi_date = req.getParameter("deunggi_date");
//		String account_yn = req.getParameter("account_yn"); //회계처리 필요여부
//		String start_date = req.getParameter("start_date");
//		String end_date = req.getParameter("end_date");

		Map map=req.getParameterMap();

		HashMap params = new HashMap();
		params.put("draw",draw);
		params.put("start",start);
		params.put("length",length);
		params.put("jisa",jisa);
		params.put("SAVE_YEAR",SAVE_YEAR);
		//params.put("SAVE_YEAR", SAVE_YEAR);
		params.put("SAVE_QUARTER",SAVE_QUARTER);
		params.put("PROCESS_DATE", "");
		params.put("PAGE_NUM", "");
		params.put("PAGE_CNT", "");
//		params.put("dosiplan",dosiplan);
//		params.put("address",address);
//		params.put("sido_nm",sido_nm);
//		params.put("sgg_nm",sgg_nm);
//		params.put("emd_nm",emd_nm);
//		params.put("ri_nm",ri_nm);
//		params.put("jibun",jibun);
//
//		params.put("souja",souja);
//		params.put("jasan_no",jasan_no);
//
//		//params.put("jimokArray", jimokArray);
//		params.put("comple_yn", comple_yn);
//		params.put("cancel_yn", cancel_yn);
//		params.put("deunggi_date", deunggi_date);
//		params.put("account_yn", account_yn);
//		params.put("start_date", start_date);
//		params.put("end_date", end_date);
//		log.info("jimokTexts.size:"+jimokTexts.size());
//		if (jimokTexts.size()>0) params.put("JIMOK_TEXT", jimokTexts);	//지목 추가
//		else params.put("JIMOK_TEXT", null);	

//		String[] right_arr= {};
//		right_arr=right_type.split(",");
//		params.put("right_type", right_arr);

//		params.put("manageYn","Y");
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

//		Object count= mainService.selectCountQuery("jisangSQL.selectJisangListCount", params);
//		int total=(int)count;

//		ArrayList<HashMap> list = mainService.selectQuery("jisangSQL.selectJisangListOrg",params);
		ArrayList dataList = new ArrayList();
		Integer totalcnt = 0;
		
			dataList = (ArrayList) mainService.selectQuery("staticSQL.selectStatisticsDeadlineData", params);
			totalcnt = (Integer) mainService.selectCountQuery("staticSQL.selectStatisticsDeadlineDataCnt", params);
			int total=totalcnt;
		
		log.info("dataList: " + dataList);
		//ArrayList<HashMap> list = mainService.selectQuery("jisangSQL.selectJisangList",params);
		//ArrayList<HashMap> list = mainService.selectQuery("jisangSQL.selectJisangListDemo",params); //demo
		//log.info("list:"+list);


		HashMap<String,Object> resultmap=new HashMap();
		resultmap.put("draw",draw);
		resultmap.put("recordsTotal",total);
		resultmap.put("recordsFiltered",total);
		resultmap.put("data",dataList);

		JSONObject obj =new JSONObject(resultmap);
		//log.info("obj:"+obj);
		return ResponseEntity.ok(obj.toString());

	}
	
	
	
	
	
	//권리확보현황 마감관리 조회
	@PostMapping(path="/selectStatisticsDeadlineList")
	public void selectStatisticsDeadlineList(HttpServletRequest request, HttpServletResponse response) throws Exception {
		ParameterParser parser = new ParameterParser(request);
		String SAVE_YEAR = parser.getString("SAVE_YEAR", "");
		String SAVE_QUARTER = parser.getString("SAVE_QUARTER", "");
		String PROCESS_DATE = parser.getString("PROCESS_DATE", "");
		String pageNum = parser.getString("pageNum", ""); // 페이지 번호
		String pageCnt = parser.getString("pageCnt", ""); // 한 페이지 갯수

		String str_result = "Y";
		ArrayList dataList = new ArrayList();
		Integer totalcnt = 0;
		try {

			HashMap params = new HashMap();
			params.put("SAVE_YEAR", SAVE_YEAR);
			params.put("SAVE_QUARTER", SAVE_QUARTER);
			params.put("PROCESS_DATE", PROCESS_DATE);
			params.put("PAGE_NUM", pageNum);
			params.put("PAGE_CNT", pageCnt);
			dataList = (ArrayList) mainService.selectQuery("staticSQL.selectStatisticsDeadlineData", params);
			totalcnt = (Integer) mainService.selectCountQuery("staticSQL.selectStatisticsDeadlineDataCnt", params);

		} catch (Exception e) {
			str_result = "N";
			e.printStackTrace();
		}
		HashMap map = new HashMap();

		map.put("message", str_result);
		map.put("dataList", dataList);
		map.put("TOTALCNT", totalcnt);

		JSONObject jo = new JSONObject(map);

		response.setCharacterEncoding("UTF-8");
		response.setHeader("Access-Control-Allow-Origin", "*");
		response.resetBuffer();
		response.setContentType("application/json");
		response.getWriter().print(jo);
		response.getWriter().flush();
	}
	
	
	
	// 통계> 권리확보현황통계> 토지 관리 현황(권리확보현황) 조회하기
	@PostMapping(path="/selectTogiMgtStateList")
		public void selectTogiMgtStateList(HttpServletRequest request, HttpServletResponse response) throws Exception {
			HashMap map = selectTogiMgtStateListReturn(request, response);

			JSONObject jo = new JSONObject(map);

			response.setCharacterEncoding("UTF-8");
			response.setHeader("Access-Control-Allow-Origin", "*");
			response.resetBuffer();
			response.setContentType("application/json");
			response.getWriter().print(jo);
			response.getWriter().flush();
		}
	
	
	
	// 토지 관리 현황(권리확보현황) 조회리스트 리턴
		public HashMap selectTogiMgtStateListReturn(HttpServletRequest request, HttpServletResponse response) throws Exception {
			String requestParams = ParameterUtil.getRequestBodyToStr(request);
			 JSONObject requestParamObj=new JSONObject(requestParams);
			ParameterParser parser = new ParameterParser(request);
			String SIDO = requestParamObj.getString("SIDO");
			String SGG = requestParamObj.getString("SGG");
			String JISA = requestParamObj.getString("JISA").replaceAll("전체", "");
			String ADDRCODE = requestParamObj.getString("ADDRCODE");
			String KIJUN =requestParamObj.getString("KIJUN");
			if(KIJUN.isEmpty()){
				KIJUN = "JISA";
			}

			CommonUtil cu = new CommonUtil();
			HashMap map = new HashMap();
			HashMap result = new HashMap();
			ArrayList sayujiList = new ArrayList();
			ArrayList gukyujiList = new ArrayList();
			ArrayList issueList = new ArrayList();
			// String SAYUJI_N = "0"; // 사유지 - 미설정
			// String SAYUJI_Y_Y = "0"; // 사유지 - 설정(등기)
			// String SAYUJI_Y_N = "0"; // 사유지 - 설정(미등기)
			// String GUKYUJI_Y = "0"; // 국유지 - 점용
			// String GUKYUJI_N = "0"; // 국유지 - 미점용
			// String GUKYUJI_J = "0"; // 국유지 - 지상권

			Long l_SAYUJI_N = 0l; // 사유지 - 미설정
			Long l_SAYUJI_Y_Y = 0l; // 사유지 - 설정(등기)
			Long l_SAYUJI_Y_N = 0l; // 사유지 - 설정(미등기)
			Long l_GUKYUJI_Y = 0l; // 국유지 - 점용
			Long l_GUKYUJI_N = 0l; // 국유지 - 미점용
			Long l_GUKYUJI_J = 0l; // 국유지 - 지상권

			try {
				HashMap params = new HashMap();
				params.put("SIDO", SIDO);
				params.put("SGG", SGG);
				params.put("JISA", JISA);
				params.put("ADDRCODE", ADDRCODE);
				params.put("KIJUN", KIJUN);
				// System.out.println(params);

				sayujiList = (ArrayList) mainService.selectQuery("issueSQL.selectTogiMgtJisangSearch", params);
				gukyujiList = (ArrayList) mainService.selectQuery("goverSQL.selectTogiMgtGoverSearch", params);
				issueList = (ArrayList) mainService.selectQuery("staticSQL.searchStatisticsTojiCount", params);

				if (sayujiList.size() > 0) {
					for (int i = 0; i < sayujiList.size(); i++) {
						String JISANG_STATUS = cu.nvl((String) ((HashMap) sayujiList.get(i)).get("jisang_status"));
						String COMPLE_YN = cu.nvl((String) ((HashMap) sayujiList.get(i)).get("comple_yn"));
						Long CNT = Long.parseLong(String.valueOf(((HashMap) sayujiList.get(i)).get("cnt")));

						if (JISANG_STATUS.equals("JISANG") && COMPLE_YN.equals("Y")) //등기
							l_SAYUJI_Y_Y += CNT;
						else if (JISANG_STATUS.equals("JISANG") && COMPLE_YN.equals("N")) //미등기
							l_SAYUJI_Y_N += CNT;
						else if (JISANG_STATUS.equals("N") || JISANG_STATUS.equals("NOTSET")) //미설정
							l_SAYUJI_N += CNT;
					}
				}
				if (gukyujiList.size() > 0) {
					for (int i = 0; i < gukyujiList.size(); i++) {
						String JISANG_STATUS = cu.nvl((String) ((HashMap) gukyujiList.get(i)).get("jisang_status"));
						// String CNT = cu.nvl(String.valueOf(((HashMap) gukyujiList.get(i)).get("CNT")));
						Long CNT = Long.parseLong(String.valueOf(((HashMap) gukyujiList.get(i)).get("cnt")));

						if (JISANG_STATUS.equals("GOVER")) //점용
							l_GUKYUJI_Y += CNT;
						else if (JISANG_STATUS.equals("JISANG"))  //지상권
							l_GUKYUJI_J += CNT;
						else if (JISANG_STATUS.equals("N") || JISANG_STATUS.equals("NOTSET")) //미점용
							l_GUKYUJI_N += CNT;
					}
				}

				result.put("SAYUJI_N", String.valueOf(l_SAYUJI_N));
				result.put("SAYUJI_Y_Y", String.valueOf(l_SAYUJI_Y_Y));
				result.put("SAYUJI_Y_N", String.valueOf(l_SAYUJI_Y_N));
				result.put("GUKYUJI_Y", String.valueOf(l_GUKYUJI_Y));
				result.put("GUKYUJI_N", String.valueOf(l_GUKYUJI_N));
				result.put("GUKYUJI_J", String.valueOf(l_GUKYUJI_J));
				result.put("issueList", issueList);
				// System.out.println("result="+result);

			} catch (Exception e) {
				map.put("code", "N");
				e.printStackTrace();
			}

			map.put("code", "Y");
			map.put("message", "success");
			map.put("result", result);

			return map;
		}
		
		
		// 토지 관리 현황(권리확보현황) > Excel 다운로드
		@PostMapping(path="/TogiMgtStateExcelDownload")
		public ModelAndView TogiMgtStateExcelDownload(HttpServletRequest request, HttpServletResponse response) throws Exception {
			String requestParams = ParameterUtil.getRequestBodyToStr(request);
			 JSONObject requestParamObj=new JSONObject(requestParams);
			ArrayList list = new ArrayList();
			ParameterParser parser = new ParameterParser(request);
			String pagegubun = requestParamObj.getString("GUBUN");
			String str_Title = "";
			String str_pageGubun = "";

			try {

				HashMap map = new HashMap();
				if ("1".equals(pagegubun)) { // 사유지

					str_Title = "사유지내역조회.xls";
					str_pageGubun = "jisasng";
					map = selectTogiMgtStateJisangExcelReturn(request, response);

				} else if ("2".equals(pagegubun)) { // 국유지

					str_Title = "국유지내역조회.xls";
					str_pageGubun = "gover";
					map = selectTogiMgtStateJisangExcelReturn(request, response);
				}
				list = (ArrayList) map.get("result");

			} catch (Exception e) {
				System.out.println(e);
			}

			response.setHeader("Content-Disposition", "attachment;filename=" + java.net.URLEncoder.encode(str_Title, "UTF-8") + ";");
			response.setHeader("Content-Type", "application/octet-stream; charset=utf-8");

			ModelAndView mav = new ModelAndView();
			mav.addObject("CommonUtil", new CommonUtil());
			mav.addObject("list", list);
			mav.addObject("pageGubun", str_pageGubun);
			mav.addObject("nTotalCount", list.size());
			mav.setViewName("togiSearch/tsExcel");

			return mav;
		}
		
		// 토지 관리 현황(권리확보현황) - 사유지 엑셀저장 조회
		public HashMap selectTogiMgtStateJisangExcelReturn(HttpServletRequest request, HttpServletResponse response) throws Exception {
			ParameterParser parser = new ParameterParser(request);
			String JISA = parser.getString("JISA", "");
			String ADDRCODE = parser.getString("ADDRCODE", "");
			String KIJUN = parser.getString("KIJUN", "JISA");
			String pagegubun = parser.getString("GUBUN", "");

			CommonUtil cu = new CommonUtil();
			HashMap map = new HashMap();
			ArrayList result = new ArrayList();

			try {
				HashMap params = new HashMap();
				params.put("JISA", JISA);
				params.put("ADDRCODE", ADDRCODE);
				params.put("KIJUN", KIJUN);
				// System.out.println(params);

				if (pagegubun.equals("1"))
					result = (ArrayList) mainService.selectQuery("Json.selectTogiMgtJisangExcelList", params); // 사유지
				else
					result = (ArrayList) mainService.selectQuery("Json.selectTogiMgtGoverExcelList", params); // 국유지

				// System.out.println("result=" + result.size());
			} catch (Exception e) {
				map.put("code", "N");
				e.printStackTrace();
			}

			map.put("code", "Y");
			map.put("message", "success");
			map.put("result", result);

			return map;
		}
		
//점용관리현황 
@PostMapping(path="/landExcelDownload")
public ModelAndView landExcelDownload(HttpServletRequest request, HttpServletResponse response) throws Exception {
			
			log.info("LJS jsonResultController.java: landExcelDownload");
			log.info(""+request);
			ArrayList<HashMap> list = new ArrayList<HashMap>();
			ArrayList<HashMap> pList = new ArrayList<HashMap>();
			ParameterParser parser = new ParameterParser(request);
			log.info(""+parser);
			String str_Title = "";
			String str_pageGubun = "";
			HashMap<String,Object> pData=new HashMap<>();
			
			try {
				String JISA=parser.getString("JISA","");
				String JIBUN = parser.getString("JIBUN", "");
				HashMap params = new HashMap();
				params.put("JISA", JISA);
			
				//통계를 위한 변수 설정
				int seoulg1=0; //서울정상
				int seoulg2=0; //경과
				int seoulg3=0; //정상필지수
				int seoulg4=0; //경과필지수
				
				int seoulp=0; //서울필지수
				int seoulp1=0; //서울 납부
				int seoulp11=0; //납부필지수
				int seoulp2=0; //서울 영구무상
				int seoulp22=0; //영구무상필지수
				int seoulp3=0; //서울 소액미청구
				int seoulp33=0; //소액미청구 필지
				int seoulp4=0; // 선납
				int seoulp44=0;
				int seoulp5=0; //기타 미납부
				 
				
				//경인
				int kyounging1=0;
				int kyounging2=0;
				int kyounging3=0; //정상필지수
				int kyounging4=0; //경과필지수
				int kyounginp=0;
				int kyounginp1=0;
				int kyounginp11=0; //납부필지수
				int kyounginp2=0;
				int kyounginp22=0; //영구무상필지수
				int kyounginp3=0;
				int kyounginp33=0; //소액미청구 필지
				int kyounginp4=0;
				int kyounginp44=0;
				int kyounginp5=0; //기타 미납부
				
				//충청
				int choungg1=0;
				int choungg2=0;
				int choungg3=0; //정상필지수
				int choungg4=0; //경과필지수
				int choungp=0;
				int choungp1=0;
				int choungp11=0; //납부필지수
				int choungp2=0;
				int choungp22=0; //영구무상필지수
				int choungp3=0;
				int choungp33=0; //소액미청구 필지
				int choungp4=0;
				int choungp44=0;
				int choungp5=0; //기타 미납부
				
				//대전
				int daejung1=0;
				int daejung2=0;
				int daejung3=0; //정상필지수
				int daejung4=0; //경과필지수
				int daejunp=0;
				int daejunp1=0;
				int daejunp11=0; //납부필지수
				int daejunp2=0;
				int daejunp22=0; //영구무상필지수
				int daejunp3=0;
				int daejunp33=0; //소액미청구 필지
				int daejunp4=0;
				int daejunp44=0;
				int daejunp5=0; //기타 미납부
				//영남
				int youngnamg1=0;
				int youngnamg2=0;
				int youngnamg3=0; //정상필지수
				int youngnamg4=0; //경과필지수
				int youngnamp=0;
				int youngnamp1=0;
				int youngnamp11=0; //납부필지수
				int youngnamp2=0;
				int youngnamp22=0; //영구무상필지수
				int youngnamp3=0;
				int youngnamp33=0; //소액미청구 필지
				int youngnamp4=0;
				int youngnamp44=0;
				int youngnamp5=0; //기타 미납부
				
				//전남
				int jeunnamg1=0;
				int jeunnamg2=0;
				int jeunnamg3=0; //정상필지수
				int jeunnamg4=0; //경과필지수
				int jeunnamp=0;
				int jeunnamp1=0;
				int jeunnamp11=0; //납부필지수
				int jeunnamp2=0;
				int jeunnamp22=0; //영구무상필지수
				int jeunnamp3=0;
				int jeunnamp33=0; //소액미청구 필지
				int jeunnamp4=0;
				int jeunnamp44=0;
				int jeunnamp5=0; //기타 미납부
				
				//전북
				int jeunbukg1=0;
				int jeunbukg2=0;
				int jeunbukg3=0; //정상필지수
				int jeunbukg4=0; //경과필지수
				int jeunbukp=0;
				int jeunbukp1=0;
				int jeunbukp11=0; //납부필지수
				int jeunbukp2=0;
				int jeunbukp22=0; //영구무상필지수
				int jeunbukp3=0;
				int jeunbukp33=0; //소액미청구 필지
				int jeunbukp4=0;
				int jeunbukp44=0; //선납필지
				int jeunbukp5=0; //기타 미납부
				
				//강원
				int gangwong1=0;
				int gangwong2=0;
				int gangwong3=0; //정상필지수
				int gangwong4=0; //경과필지수
				int gangwonp=0;
				int gangwonp1=0;
				int gangwonp11=0; //납부필지수
				int gangwonp2=0;
				int gangwonp22=0; //영구무상필지수
				int gangwonp3=0;
				int gangwonp33=0; //소액미청구 필지
				int gangwonp4=0;
				int gangwonp44=0; //선납필지
				int gangwonp5=0; //기타 미납부
				
				//경남
				int kyungnamg1=0;
				int kyungnamg2=0;
				int kyungnamg3=0; //정상필지수
				int kyungnamg4=0; //경과필지수
				int kyungnamp=0;
				int kyungnamp1=0;
				int kyungnamp11=0; //납부필지수
				int kyungnamp2=0;
				int kyungnamp22=0; //영구무상필지수
				int kyungnamp3=0;
				int kyungnamp33=0; //소액미청구 필지
				int kyungnamp4=0;
				int kyungnamp44=0; //선납필지
				int kyungnamp5=0; //기타 미납부
				
				
				
				
				str_Title = "점용허가관리현황.xls";
				str_pageGubun = "";
				list = (ArrayList) mainService.selectQuery("Json.selectNewGoverStaticList", params);
				
				log.info("list count:"+list.size());
			//	log.info(list.toString());
				
				for(int i=0;i<list.size();i++) {
					long diffDays=0;
					HashMap tList = (HashMap) list.get(i);
				//	System.out.println("JISA="+tList.get("JISA")+","+"STDATE="+tList.get("PMT_ST_DATE")+","+"NEWREGREASON="+tList.get("NEWREGREASON")+",PAYDATE="+tList.get("PAY_DATE"));
					if (tList.get("PMT_ED_DATE")!=null && tList.get("PAY_DATE")!=null) {
						//점용허가기간체크
//						DateTimeFormatter formatter=DateTimeFormatter.ofPattern("yyyy-MM-dd");
//						//SimpleDateFormat formatter=new SimpleDateFormat("yyyy-MM-dd");
//						LocalDate date1 = LocalDate.parse(tList.get("PAY_DATE").toString(),formatter);
//						LocalDate date2 = LocalDate.now();
//						LocalDate date3 = LocalDate.parse(tList.get("PMT_ED_DATE").toString(),formatter);
						
						
						Calendar getToday = Calendar.getInstance();
						getToday.setTime(new Date());
						Date date = new SimpleDateFormat("yyyy-MM-dd").parse(tList.get("PAY_DATE").toString());
						Date pmdate = new SimpleDateFormat("yyyy-MM-dd").parse(tList.get("PMT_ED_DATE").toString());
						
						Calendar toDay=Calendar.getInstance();
						toDay.setTime(date);
						
						Calendar toDay1=Calendar.getInstance();
						toDay1.setTime(pmdate);
						
						
						long diffSec = (getToday.getTimeInMillis()-toDay.getTimeInMillis())/1000;
						 diffDays=diffSec/(24*60*60);
						
						long diffSec1 = (toDay1.getTimeInMillis()-getToday.getTimeInMillis())/1000;
						long diffDays1=diffSec1/(24*60*60);
						
						
					//	log.info("diffdays="+diffDays);
					//	log.info("diffdays1="+diffDays1);
						
					
						//점용허가기간 카운팅
						 if ("서울지사".equals(tList.get("JISA")) && diffDays1>0) {
							 seoulg1++;
							 seoulg3+=Integer.parseInt(tList.get("PCOUNT").toString());
						 }
						 else if ("서울지사".equals(tList.get("JISA")) && diffDays1<0) {
							 seoulg2++;
							 seoulg4+=Integer.parseInt(tList.get("PCOUNT").toString());
						 }
						 else if ("경인지사".equals(tList.get("JISA")) && diffDays1>0) {
							 kyounging1++;
							 kyounging3+=Integer.parseInt(tList.get("PCOUNT").toString());
						 }
						 else if ("경인지사".equals(tList.get("JISA")) && diffDays1<0) {
							 kyounging2++;
							 kyounging4+=Integer.parseInt(tList.get("PCOUNT").toString());
						 }
						 else if ("강원지사".equals(tList.get("JISA")) && diffDays1>0) {
							 gangwong1++;
							 gangwong3+=Integer.parseInt(tList.get("PCOUNT").toString());
						 }
						 else if ("강원지사".equals(tList.get("JISA")) && diffDays1<0) {
							 gangwong2++;
							 gangwong4+=Integer.parseInt(tList.get("PCOUNT").toString());
						 }
						 else if ("충청지사".equals(tList.get("JISA")) && diffDays1>0) {
							 choungg1++;
							 choungg3+=Integer.parseInt(tList.get("PCOUNT").toString());
						 }
						 else if ("충청지사".equals(tList.get("JISA")) && diffDays1<0) {
							 choungg2++;
							 choungg4+=Integer.parseInt(tList.get("PCOUNT").toString());
						 }
						 else if ("대전지사".equals(tList.get("JISA")) && diffDays1>0) {
							 daejung1++;
							 daejung3+=Integer.parseInt(tList.get("PCOUNT").toString());
						 }
						 else if ("대전지사".equals(tList.get("JISA")) && diffDays1<0) {
							 daejung2++;
							 daejung4+=Integer.parseInt(tList.get("PCOUNT").toString());
						 }
						 else if ("영남지사".equals(tList.get("JISA")) && diffDays1>0) {
							 youngnamg1++;
							 youngnamg3+=Integer.parseInt(tList.get("PCOUNT").toString());
						 }
						 else if ("영남지사".equals(tList.get("JISA")) && diffDays1<0) {
							 youngnamg2++;
							 youngnamg4+=Integer.parseInt(tList.get("PCOUNT").toString());
						 }
						 else if ("전남지사".equals(tList.get("JISA")) && diffDays1>0) {
							 jeunnamg1++;
							 jeunnamg3+=Integer.parseInt(tList.get("PCOUNT").toString());
						 }
						 else if ("전남지사".equals(tList.get("JISA")) && diffDays1<0) {
							 jeunnamg2++;
							 jeunnamg4+=Integer.parseInt(tList.get("PCOUNT").toString());
						 }
						 else if ("전북지사".equals(tList.get("JISA")) && diffDays1>0) {
							 jeunbukg1++;
							 jeunbukg3+=Integer.parseInt(tList.get("PCOUNT").toString());
						 }
						 else if ("전북지사".equals(tList.get("JISA")) && diffDays1<0) {
							 jeunbukg2++;
							 jeunbukg4+=Integer.parseInt(tList.get("PCOUNT").toString());
						 }
						 else if ("경남지사".equals(tList.get("JISA")) && diffDays1>0) {
							 kyungnamg1++;
							 kyungnamg3+=Integer.parseInt(tList.get("PCOUNT").toString());
						 }
						 else if ("경남지사".equals(tList.get("JISA")) && diffDays1<0) {
							 kyungnamg2++;
							 kyungnamg4+=Integer.parseInt(tList.get("PCOUNT").toString());
						 }
						 
						 
						 if (diffDays<365) { //납부
								if ("서울지사".equals(tList.get("JISA"))) {
									seoulp1++;
									seoulp11+=Integer.parseInt(tList.get("PCOUNT").toString());
								}
								else if ("경인지사".equals(tList.get("JISA"))) {
									kyounginp1++;
									kyounginp11+=Integer.parseInt(tList.get("PCOUNT").toString());
								}
								else if ("강원지사".equals(tList.get("JISA"))) {
									gangwonp1++;
									gangwonp11+=Integer.parseInt(tList.get("PCOUNT").toString());
								}
								else if ("충청지사".equals(tList.get("JISA"))) {
									choungp1++;
									choungp11+=Integer.parseInt(tList.get("PCOUNT").toString());
								}
								else if ("대전지사".equals(tList.get("JISA"))) {
									daejunp1++;
									daejunp11+=Integer.parseInt(tList.get("PCOUNT").toString());
								}
								else if ("영남지사".equals(tList.get("JISA"))) {
									youngnamp1++;
									youngnamp11+=Integer.parseInt(tList.get("PCOUNT").toString());
								}
								else if ("전남지사".equals(tList.get("JISA"))) {
									jeunnamp1++;
									jeunnamp11+=Integer.parseInt(tList.get("PCOUNT").toString());
								}
								else if ("전북지사".equals(tList.get("JISA"))) {
									jeunbukp1++;
									jeunbukp11+=Integer.parseInt(tList.get("PCOUNT").toString());
								}
								else if ("경남지사".equals(tList.get("JISA"))) {
									kyungnamp1++;
									kyungnamp11+=Integer.parseInt(tList.get("PCOUNT").toString());
								}
								
							}
							else { //미납부
								//점용료 납부 카운팅
								 if ("서울지사".equals(tList.get("JISA")) && "1".equals(tList.get("OCCUNONPAYREASON"))) {
									 seoulp2++;
									 seoulp22+=Integer.parseInt(tList.get("PCOUNT").toString());
								 }
								 else if ("서울지사".equals(tList.get("JISA")) && "2".equals(tList.get("OCCUNONPAYREASON"))) {
									 seoulp3++;
									 seoulp33+=Integer.parseInt(tList.get("PCOUNT").toString());
								 }
								 else if ("경인지사".equals(tList.get("JISA")) && "1".equals(tList.get("OCCUNONPAYREASON"))) {
									 kyounginp2++;
									 kyounginp22+=Integer.parseInt(tList.get("PCOUNT").toString());
								 }
								 else if ("경인지사".equals(tList.get("JISA")) && "2".equals(tList.get("OCCUNONPAYREASON"))) {
									 kyounginp3++;
									 kyounginp33+=Integer.parseInt(tList.get("PCOUNT").toString());
								 }
								 else if ("강원지사".equals(tList.get("JISA")) && "1".equals(tList.get("OCCUNONPAYREASON"))) {
									 gangwonp2++;
									 gangwonp22+=Integer.parseInt(tList.get("PCOUNT").toString());
								 }
								 else if ("강원지사".equals(tList.get("JISA")) && "2".equals(tList.get("OCCUNONPAYREASON"))) {
									 gangwonp3++;
									 gangwonp33+=Integer.parseInt(tList.get("PCOUNT").toString());
								 }
								 else if ("충청지사".equals(tList.get("JISA")) && "1".equals(tList.get("OCCUNONPAYREASON"))) {
									 choungp2++;
									 choungp22+=Integer.parseInt(tList.get("PCOUNT").toString());
								 }
								 else if ("충청지사".equals(tList.get("JISA")) && "2".equals(tList.get("OCCUNONPAYREASON"))) {
									 choungp3++;
									 choungp33+=Integer.parseInt(tList.get("PCOUNT").toString());
								 }
								 else if ("대전지사".equals(tList.get("JISA")) && "1".equals(tList.get("OCCUNONPAYREASON"))) {
									 daejunp2++;
									 daejunp22+=Integer.parseInt(tList.get("PCOUNT").toString());
								 }
								 else if ("대전지사".equals(tList.get("JISA")) && "2".equals(tList.get("OCCUNONPAYREASON"))) {
									 daejunp3++;
									 daejunp33+=Integer.parseInt(tList.get("PCOUNT").toString());
								 }
								 else if ("영남지사".equals(tList.get("JISA")) && "1".equals(tList.get("OCCUNONPAYREASON"))) {
									 youngnamp2++;
									 youngnamp22+=Integer.parseInt(tList.get("PCOUNT").toString());
								 }
								 else if ("영남지사".equals(tList.get("JISA")) && "2".equals(tList.get("OCCUNONPAYREASON"))) {
									 youngnamp3++;
									 youngnamp33+=Integer.parseInt(tList.get("PCOUNT").toString());
								 }
								 else if ("전남지사".equals(tList.get("JISA")) && "1".equals(tList.get("OCCUNONPAYREASON"))) {
									 jeunnamp2++;
									 jeunnamp22+=Integer.parseInt(tList.get("PCOUNT").toString());
								 }
								 else if ("전남지사".equals(tList.get("JISA")) && "2".equals(tList.get("OCCUNONPAYREASON"))) {
									 jeunnamp3++;
									 jeunnamp33+=Integer.parseInt(tList.get("PCOUNT").toString());
								 }
								 else if ("전북지사".equals(tList.get("JISA")) && "1".equals(tList.get("OCCUNONPAYREASON"))) {
									 jeunbukp2++;
									 jeunbukp22+=Integer.parseInt(tList.get("PCOUNT").toString());
								 }
								 else if ("전북지사".equals(tList.get("JISA")) && "2".equals(tList.get("OCCUNONPAYREASON"))) {
									 jeunbukp3++;
									 jeunbukp33+=Integer.parseInt(tList.get("PCOUNT").toString());
								 }
								 else if ("경남지사".equals(tList.get("JISA")) && "1".equals(tList.get("OCCUNONPAYREASON"))) {
									 kyungnamp2++;
									 kyungnamp22+=Integer.parseInt(tList.get("PCOUNT").toString());
								 }
								 else if ("경남지사".equals(tList.get("JISA")) && "2".equals(tList.get("OCCUNONPAYREASON"))) {
									 kyungnamp3++;
									 kyungnamp33+=Integer.parseInt(tList.get("PCOUNT").toString());
								 }
								 else {
									 if ("서울지사".equals(tList.get("JISA"))) seoulp5++; 
									 else if ("경인지사".equals(tList.get("JISA"))) kyounginp5++; 
									 else if ("강원지사".equals(tList.get("JISA"))) gangwonp5++; 
									 else if ("대전지사".equals(tList.get("JISA"))) daejunp5++; 
									 else if ("영남지사".equals(tList.get("JISA"))) youngnamp5++; 
									 else if ("전남지사".equals(tList.get("JISA"))) jeunnamp5++; 
									 else if ("전북지사".equals(tList.get("JISA"))) jeunbukp5++; 
									 else if ("경남지사".equals(tList.get("JISA"))) kyungnamp5++;
								 }
										 
								 if ("서울지사".equals(tList.get("JISA")) && "1".equals(tList.get("OCCUPREPAYYN"))) {
									 seoulp4++;
									 seoulp44+=Integer.parseInt(tList.get("PCOUNT").toString());
								 }
								 else if ("경인지사".equals(tList.get("JISA")) && "1".equals(tList.get("OCCUPREPAYYN"))) {
									 kyounginp4++;
									 kyounginp44+=Integer.parseInt(tList.get("PCOUNT").toString());
								 }
								 else if ("강원지사".equals(tList.get("JISA")) && "1".equals(tList.get("OCCUPREPAYYN"))) {
									 gangwonp4++;
									 gangwonp44+=Integer.parseInt(tList.get("PCOUNT").toString());
								 }
								 else if ("충청지사".equals(tList.get("JISA")) && "1".equals(tList.get("OCCUPREPAYYN"))) {
									 choungp4++;
									 choungp44+=Integer.parseInt(tList.get("PCOUNT").toString());
								 }
								 else if ("대전지사".equals(tList.get("JISA")) && "1".equals(tList.get("OCCUPREPAYYN"))) {
									 daejunp4++;
									 daejunp44+=Integer.parseInt(tList.get("PCOUNT").toString());
								 }
								 else if ("영남지사".equals(tList.get("JISA")) && "1".equals(tList.get("OCCUPREPAYYN"))) {
									 youngnamp4++;
									 youngnamp44+=Integer.parseInt(tList.get("PCOUNT").toString());
								 }
								 else if ("전남지사".equals(tList.get("JISA")) && "1".equals(tList.get("OCCUPREPAYYN"))) {
									 jeunnamp4++;
									 jeunnamp44+=Integer.parseInt(tList.get("PCOUNT").toString());
								 }
								 else if ("전북지사".equals(tList.get("JISA")) && "1".equals(tList.get("OCCUPREPAYYN"))) {
									 jeunbukp4++;
									 jeunbukp44+=Integer.parseInt(tList.get("PCOUNT").toString());
								 }
								 else if ("경남지사".equals(tList.get("JISA")) && "1".equals(tList.get("OCCUPREPAYYN"))) {
									 kyungnamp4++;
									 kyungnamp44+=Integer.parseInt(tList.get("PCOUNT").toString());
								 }
									
									  else { if ("서울지사".equals(tList.get("JISA"))) seoulp5++; else if
									  ("경인지사".equals(tList.get("JISA"))) kyounginp5++; else if
									  ("강원지사".equals(tList.get("JISA"))) gangwonp5++; else if
									  ("대전지사".equals(tList.get("JISA"))) daejunp5++; else if
									  ("영남지사".equals(tList.get("JISA"))) youngnamp5++; else if
									  ("전남지사".equals(tList.get("JISA"))) jeunnamp5++; else if
									  ("전북지사".equals(tList.get("JISA"))) jeunbukp5++; else if
									  ("경남지사".equals(tList.get("JISA"))) kyungnamp5++; }
									 
							}
					
					}
					else {
						//null 일경우 경과로 취급
						if ("서울지사".equals(tList.get("JISA"))) seoulg2++;
						else if ("경인지사".equals(tList.get("JISA"))) kyounging2++; 
						else if ("강원지사".equals(tList.get("JISA"))) gangwong2++;
						else if ("대전지사".equals(tList.get("JISA"))) daejung2++;
						else if ("영남지사".equals(tList.get("JISA"))) youngnamg2++;
						else if ("전남지사".equals(tList.get("JISA"))) jeunnamg2++;
						else if ("전북지사".equals(tList.get("JISA"))) jeunbukg2++;
						else if ("경남지사".equals(tList.get("JISA"))) kyungnamg2++;
					}
						
					
					
					
					
				}
				
				
				//log.info("seoulg1="+seoulg1+","+"seoulg2="+seoulg2+","+"seoulp2="+seoulp2+","+"seoulp3="+seoulp3+","+"seoulp4="+seoulp4+","+"seoulp5="+seoulp5);
				//log.info("gangwong1="+gangwong1+","+"gangwong2="+gangwong2+","+"gangwonp2="+gangwonp2+","+"gangwonp3="+gangwonp3+","+"gangwonp4="+gangwonp4+","+"gangwonp5="+gangwonp5);
				//log.info("kyounging1="+kyounging1+","+"kyounging2="+kyounging2+","+"kyounginp2="+kyounginp2+","+"kyounginp3="+kyounginp3+","+"kyounginp4="+kyounginp4+",kyounginp5="+kyounginp5);
				//log.info("choungg1="+choungg1+","+"choungg2="+choungg2+","+"choungp2="+choungp2+","+"choungp3="+choungp3+","+"choungp4="+choungp4+","+"choungp5="+choungp5);
				//log.info("daejung1="+daejung1+","+"daejung2="+daejung2+","+"daejunp2="+daejunp2+","+"daejunp3="+daejunp3+","+"daejunp4="+daejunp4+","+"daejunp5="+daejunp5);
			//	log.info("youngnamg1="+youngnamg1+","+"youngnamg2="+youngnamg2+","+"youngnamp2="+youngnamp2+","+"youngnamp3="+youngnamp3+","+"youngnamp4="+youngnamp4+","+"youngnamp5="+youngnamp5);
			//	log.info("jeunnamg1="+jeunnamg1+","+"jeunnamg2="+jeunnamg2+","+"jeunnamp2="+jeunnamp2+","+"jeunnamp3="+jeunnamp3+","+"jeunnamp4="+jeunnamp4+","+"jeunnamp5="+jeunnamp5);
			//	log.info("jeunbukg1="+jeunbukg1+","+"jeunbukg2="+jeunbukg2+","+"jeunbukp2="+jeunbukp2+","+"jeunbukp3="+jeunbukp3+","+"jeunbukp4="+jeunbukp4+","+"jeunbukp5="+jeunbukp5);
			//	log.info("kyungnamg1="+kyungnamg1+","+"kyungnamg2="+kyungnamg2+","+"kyungnamp2="+kyungnamp2+","+"kyungnamp3="+kyungnamp3+","+"kyungnamp4="+kyungnamp4+","+"kyungnamp5="+kyungnamp5);
				
				
				
				HashMap map = new HashMap();
				map.put("pay", seoulp1);
				map.put("pcount1", seoulg3);map.put("pcount2", seoulg4); map.put("pcount3", seoulp11); map.put("pcount4", seoulp22);
				map.put("pcount5", seoulp33);map.put("pcount6", seoulp44);
				map.put("jisa", "서울");map.put("perm1", seoulg1); map.put("perm2", seoulg2); map.put("nonpay2", seoulp3); map.put("onpay", seoulp4);	map.put("nonpay1", seoulp2);
				 map.put("nopay", seoulp5);
				pData.put("A",map);
				map = new HashMap();
				map.put("pay", kyounginp1);
				map.put("pcount1", kyounging3);map.put("pcount2", kyounging4); map.put("pcount3", kyounginp11);map.put("pcount4", kyounginp22);
				map.put("pcount5", kyounginp33);map.put("pcount6", kyounginp44);
				map.put("jisa", "경인");map.put("perm1", kyounging1); map.put("perm2", kyounging2); map.put("nonpay1", kyounginp2); map.put("nonpay2", kyounginp3); map.put("onpay", kyounginp4);
				 map.put("nopay", kyounginp5);
				pData.put("B", map);
				map = new HashMap();
				map.put("pay", choungp1);
				map.put("pcount1", choungg3);map.put("pcount2", choungg4); map.put("pcount3", choungp11);map.put("pcount4", choungp22);
				map.put("pcount5", choungp33);map.put("pcount6", choungp44);
				map.put("jisa", "충청");map.put("perm1", choungg1); map.put("perm2", choungg2); map.put("nonpay1", choungp2); 	map.put("nonpay2", choungp3); map.put("onpay", choungp4);
				 map.put("nopay", choungp5);
				pData.put("C", map);
				map = new HashMap();
				map.put("pay", daejunp1);
				map.put("pcount1", daejung3);map.put("pcount2", daejung4); map.put("pcount3", daejunp11);map.put("pcount4", daejunp22);
				map.put("pcount5", daejunp33);map.put("pcount6", daejunp44);
				map.put("jisa", "대전");map.put("perm1", daejung1); map.put("perm2", daejung2); map.put("nonpay1", daejunp2); 	map.put("nonpay2", daejunp3); map.put("onpay", daejunp4);
				 map.put("nopay", daejunp5);
				pData.put("D", map);
				
				map = new HashMap();
				map.put("pay", youngnamp1);
				map.put("pcount1", youngnamg3);map.put("pcount2", youngnamg4); map.put("pcount3", youngnamp11);map.put("pcount4", youngnamp22);
				map.put("pcount5", youngnamp33);map.put("pcount6", youngnamp44);
				map.put("jisa", "영남");map.put("perm1", youngnamg1); map.put("perm2", youngnamg2); map.put("nonpay1", youngnamp2); 	map.put("nonpay2", youngnamp3); map.put("onpay", youngnamp4);
				 map.put("nopay", youngnamp5);
				pData.put("E", map);
				
				map = new HashMap();
				map.put("pay", jeunnamp1);
				map.put("pcount1", jeunnamg3);map.put("pcount2", jeunnamg4); map.put("pcount3", jeunnamp11);map.put("pcount4", jeunnamp22);
				map.put("pcount5", jeunnamp33);map.put("pcount6", jeunnamp44);
				map.put("jisa", "전남");map.put("perm1", jeunnamg1); map.put("perm2", jeunnamg2); map.put("nonpay1", jeunnamp2); 	map.put("nonpay2", jeunnamp3); map.put("onpay", jeunnamp4);
				 map.put("nopay", jeunnamp5);
				pData.put("F", map);
				
				map = new HashMap();
				map.put("pay", jeunbukp1);
				map.put("pcount1", jeunbukg3);map.put("pcount2", jeunbukg4);map.put("pcount3", jeunbukp11);map.put("pcount4", jeunbukp22);
				map.put("pcount5", jeunbukp33);map.put("pcount6", jeunbukp44);
				map.put("jisa", "전북");map.put("perm1", jeunbukg1); map.put("perm2", jeunbukg2); map.put("nonpay1", jeunbukp2); 	map.put("nonpay2", jeunbukp3); map.put("onpay", jeunbukp4);
				 map.put("nopay", jeunbukp5);
				pData.put("G", map);
				
				map = new HashMap();
				map.put("pay", gangwonp1);
				map.put("pcount1", gangwong3);map.put("pcount2", gangwong4); map.put("pcount3", gangwonp11);map.put("pcount4", gangwonp22);
				map.put("pcount5", gangwonp33);map.put("pcount6", gangwonp44);
				map.put("jisa", "강원");map.put("perm1", gangwong1); map.put("perm2", gangwong2); map.put("nonpay1", gangwonp2); 	map.put("nonpay2", gangwonp3); map.put("onpay", gangwonp4);
				 map.put("nopay", gangwonp5);
				pData.put("H", map);
				
				map = new HashMap();
				map.put("pay", kyungnamp1);
				map.put("pcount1", kyungnamg3); map.put("pcount2", kyungnamg4); map.put("pcount3", kyungnamp11);map.put("pcount4", kyungnamp22);
				map.put("pcount5", kyungnamp33);map.put("pcount6", kyungnamp44);
				map.put("jisa", "경남");map.put("perm1", kyungnamg1); map.put("perm2", kyungnamg2); map.put("nonpay1", kyungnamp2); 	map.put("nonpay2", kyungnamp3); map.put("onpay", kyungnamp4);
				 map.put("nopay", kyungnamp5);
				pData.put("I", map);
			//	log.info(pData);
				//List<String> keySet=new ArrayList<>(pData.keySet());
				SortedSet<String> keySet = new TreeSet<>(pData.keySet());
				//Collections.sort(keySet);
				

				
			} catch (Exception e) {
				System.out.println(e);
			}
			//list를 가공하여 출력 가능한 map으로 만들어서 넘긴다.
			//LJSWORK
		//	log.info(pData);
			//log.info(list);
			/*
			 * HashMap<String,Object> pData=new HashMap<>(); pData.put("result",map);
			 * pData.put("result1",map); pData.put("result2",map);
			 */
			//pList=map;
			
			
			
			 
			//주석 처리하면 페이지로 볼수 있다 페이지로 보이게 만든다음에 주석을 제거 하면 엑셀로 나타난다. by-ljs
			response.setHeader("Content-Disposition", "attachment;filename=" + java.net.URLEncoder.encode(str_Title, "UTF-8") + ";");
			response.setHeader("Content-Type", "application/octet-stream; charset=utf-8");
			//mapToJsonResponse(response,map);
			ModelAndView mav = new ModelAndView();
			mav.addObject("CommonUtil", new CommonUtil());
			mav.addObject("list",pData);
			mav.addObject("pageGubun", str_pageGubun);
			mav.addObject("nTotalCount", 10);
			mav.setViewName("statistics/landExcel");

			return mav;
		}


	//통계 > 이슈 민원현황 조회
	@PostMapping(path="/selectIssueStatisticsList")
	public void selectIssueStatisticsList(HttpServletRequest request, HttpServletResponse response) throws Exception {
		ParameterParser parser = new ParameterParser(request);
		String SEARCH_START_DAY = parser.getString("SEARCH_START_DAY", "");
		String SEARCH_END_DAY = parser.getString("SEARCH_END_DAY", "");
		String SEARCH_STATUS = parser.getString("SEARCH_STATUS", "");
		String SEARCH_REGISTED = parser.getString("SEARCH_REGISTED", "");
		String SEARCH_PERMITTED = parser.getString("SEARCH_PERMITTED", "");
		String SEARCH_JISA = parser.getString("SEARCH_JISA", "");
		String SEARCH_CODE_1 = parser.getString("SEARCH_CODE_1", "");
		String SEARCH_CODE_2 = parser.getString("SEARCH_CODE_2", "");
		String SEARCH_CODE_3 = parser.getString("SEARCH_CODE_3", "");
	
		ArrayList dataList = new ArrayList();
		HashMap map = new HashMap();
		try {
	
			HashMap params = new HashMap();
			params.put("SEARCH_START_DAY", SEARCH_START_DAY.replaceAll("-", ""));
			params.put("SEARCH_END_DAY", SEARCH_END_DAY.replaceAll("-", ""));
			params.put("SEARCH_STATUS", SEARCH_STATUS);
			params.put("SEARCH_REGISTED", SEARCH_REGISTED);
			params.put("SEARCH_PERMITTED", SEARCH_PERMITTED);
			params.put("SEARCH_JISA", SEARCH_JISA);
			params.put("SEARCH_CODE_1", SEARCH_CODE_1);
			params.put("SEARCH_CODE_2", SEARCH_CODE_2);
			params.put("SEARCH_CODE_3", SEARCH_CODE_3);
	
			dataList = (ArrayList) mainService.selectQuery("staticSQL.selectIssueStatisticsData", params);
	
			map.put("message", "success");
			map.put("dataList", dataList);
		} catch (Exception e) {
			map.put("message", "처리 중 오류가 발생했습니다.");
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
	
	//통계 > 권리별 증감현황 > 지사
	@PostMapping(path="/selectByRightInDeListJisa")
	public void selectByRightInDeListJisa(HttpServletRequest request, HttpServletResponse response) throws Exception {
		
		ArrayList dataList = new ArrayList();
		HashMap map = new HashMap();
		try {
	
			dataList = (ArrayList) mainService.selectQuery("staticSQL.selectByRightInDeListJisa", null);
	
			map.put("message", "success");
			map.put("dataList", dataList);
		} catch (Exception e) {
			map.put("message", "처리 중 오류가 발생했습니다.");
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
	//통계 > 권리별 증감현황 > 권리확보
	@PostMapping(path="/selectByRightInDeListByRight")
	public void selectByRightInDeListByRight(HttpServletRequest request, HttpServletResponse response) throws Exception {
		
		ArrayList dataList = new ArrayList();
		HashMap map = new HashMap();
		try {
	
			dataList = (ArrayList) mainService.selectQuery("staticSQL.selectByRightInDeListByRight", null);
	
			map.put("message", "success");
			map.put("dataList", dataList);
		} catch (Exception e) {
			map.put("message", "처리 중 오류가 발생했습니다.");
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
	
	//통계 > 권리별 증감현황 > 년,월
	@PostMapping(path="/selectByRightInDeListYYYY")
	public void selectByRightInDeListYYYY(HttpServletRequest request, HttpServletResponse response) throws Exception {
		
		ParameterParser parser = new ParameterParser(request);
		String JISA = parser.getString("JISA", "");
		System.out.println("JISA:"+JISA);
		
		ArrayList dataList = new ArrayList();
		HashMap map = new HashMap();
		try {
	
			HashMap params = new HashMap();
			params.put("JISA", JISA);
			
			dataList = (ArrayList) mainService.selectQuery("staticSQL.selectByRightInDeListYYYY", params);
	
			map.put("message", "success");
			map.put("dataList", dataList);
		} catch (Exception e) {
			map.put("message", "처리 중 오류가 발생했습니다.");
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
	//통계 > 권리별 증감현황 > 년,월
	@PostMapping(path="/selectByRightInDeListYYYYMM")
	public void selectByRightInDeListYYYYMM(HttpServletRequest request, HttpServletResponse response) throws Exception {
		
		ParameterParser parser = new ParameterParser(request);
		String JISA = parser.getString("JISA", "");
		String SELECT_YYYY = parser.getString("SELECT_YYYY", "0");
		
		ArrayList dataList = new ArrayList();
		HashMap map = new HashMap();
		try {
	
			HashMap params = new HashMap();
			params.put("JISA", JISA);
			params.put("SELECT_YYYY", Integer.parseInt(SELECT_YYYY));
			
			
			dataList = (ArrayList) mainService.selectQuery("staticSQL.selectByRightInDeListYYYYMM", params);
	
			map.put("message", "success");
			map.put("dataList", dataList);
		} catch (Exception e) {
			map.put("message", "처리 중 오류가 발생했습니다.");
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
	
	//통계 > 권리별 증감현황 > 조회
	@PostMapping(path="/selectByRightInDeList")
	public void selectByRightInDeList(HttpServletRequest request, HttpServletResponse response) throws Exception {
		ParameterParser parser = new ParameterParser(request);
		String JISA = parser.getString("JISA", "");
		String STATUS = parser.getString("STATUS", "");
		int YYYY_REF = parser.getInt("YYYY_REF");
		int MM_REF = parser.getInt("MM_REF");
		int YYYY_TG = parser.getInt("YYYY_TG");
		int MM_TG = parser.getInt("MM_TG");
		
	
		ArrayList dataList = new ArrayList();
		HashMap map = new HashMap();
		try {
	
			HashMap params = new HashMap();
			params.put("JISA", JISA);
			params.put("STATUS", STATUS);
			params.put("YYYY_REF", YYYY_REF);
			params.put("MM_REF", MM_REF);
			params.put("YYYY_TG", YYYY_TG);
			params.put("MM_TG", MM_TG);
	
			dataList = (ArrayList) mainService.selectQuery("staticSQL.selectByRightInDeList", params);
	
			map.put("message", "success");
			map.put("dataList", dataList);
		} catch (Exception e) {
			map.put("message", "처리 중 오류가 발생했습니다.");
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
	
	//통계 > 권리별 증감현황 > 조회 > 엑셀
	@RequestMapping(path="/selectByRightInDeListExcel")
	public void selectByRightInDeListExcel(HttpServletRequest request, HttpServletResponse response) throws Exception {
		ParameterParser parser = new ParameterParser(request);
		String JISA = parser.getString("JISA", "");
		String STATUS = parser.getString("STATUS", "");
		int YYYY_REF = parser.getInt("YYYY_REF");
		int MM_REF = parser.getInt("MM_REF");
		int YYYY_TG = parser.getInt("YYYY_TG");
		int MM_TG = parser.getInt("MM_TG");
		
	
		ArrayList dataList = new ArrayList();
		HashMap map = new HashMap();
		try {
	
			HashMap params = new HashMap();
			params.put("JISA", JISA);
			params.put("STATUS", STATUS);
			params.put("YYYY_REF", YYYY_REF);
			params.put("MM_REF", MM_REF);
			params.put("YYYY_TG", YYYY_TG);
			params.put("MM_TG", MM_TG);
	
			dataList = (ArrayList) mainService.selectQuery("staticSQL.selectByRightInDeList", params);
	
			map.put("message", "success");
			map.put("dataList", dataList);
		} catch (Exception e) {
			map.put("message", "처리 중 오류가 발생했습니다.");
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
	
	//통계 > 권리별 증감현황 > 조회 > 필지수 클릭 > 상세
	@PostMapping(path="/selectByRightInDeListDetail")
	public void selectByRightInDeListDetail(HttpServletRequest request, HttpServletResponse response) throws Exception {
		ParameterParser parser = new ParameterParser(request);
		String YYYY = parser.getString("YYYY", "");
		String MM = parser.getString("MM", "");
		String JISA = parser.getString("JISA", "");
		String STATUS = parser.getString("STATUS", "");
		
	
		ArrayList dataList = new ArrayList();
		HashMap map = new HashMap();
		try {
	
			HashMap params = new HashMap();
			params.put("YYYY", YYYY);
			params.put("MM", MM);
			params.put("JISA", JISA);
			params.put("STATUS", STATUS);
	
			dataList = (ArrayList) mainService.selectQuery("staticSQL.selectByRightInDeListDetail", params);
	
			map.put("message", "success");
			map.put("dataList", dataList);
		} catch (Exception e) {
			map.put("message", "처리 중 오류가 발생했습니다.");
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
	
	//통계 > 권리별 증감현황 > 조회 > 상세 - 증감현황
	@PostMapping(path="/selectByRightInDeListDetailUpDown")
	public void selectByRightInDeListDetailUpDown(HttpServletRequest request, HttpServletResponse response) throws Exception {
		ParameterParser parser = new ParameterParser(request);
		String TYPE = parser.getString("TYPE", "UP"); // 증가 : UP , 감소 : DOWN
		String JISA = parser.getString("JISA", "");
		String STATUS = parser.getString("STATUS", "");
		String YYYY_REF = parser.getString("YYYY_REF", "");
		String MM_REF = parser.getString("MM_REF", "");
		String YYYY_TG = parser.getString("YYYY_TG", "");
		String MM_TG = parser.getString("MM_TG", "");
		
	
		ArrayList dataList = new ArrayList();
		HashMap map = new HashMap();
		try {
	
			HashMap params = new HashMap();
			params.put("JISA", JISA);
			params.put("STATUS", STATUS);
			params.put("YYYY_REF", YYYY_REF);
			params.put("MM_REF", MM_REF);
			params.put("YYYY_TG", YYYY_TG);
			params.put("MM_TG", MM_TG);
	
			if("UP".equals(TYPE)) {
				dataList = (ArrayList) mainService.selectQuery("staticSQL.selectByRightInDeListDetailUp", params);
			}else {
				dataList = (ArrayList) mainService.selectQuery("staticSQL.selectByRightInDeListDetailDown", params);
			}
			
	
			map.put("message", "success");
			map.put("dataList", dataList);
		} catch (Exception e) {
			map.put("message", "처리 중 오류가 발생했습니다.");
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
	
	//통계 > 관리필지 증감현황 > 년,월
	@PostMapping(path="/selectFieldInDeListYYYY")
	public void selectFieldInDeListYYYY(HttpServletRequest request, HttpServletResponse response) throws Exception {
		ParameterParser parser = new ParameterParser(request);
		
		ArrayList dataList = new ArrayList();
		HashMap map = new HashMap();
		try {
	
			dataList = (ArrayList) mainService.selectQuery("staticSQL.selectFieldInDeListYYYY", null);
	
			map.put("message", "success");
			map.put("dataList", dataList);
		} catch (Exception e) {
			map.put("message", "처리 중 오류가 발생했습니다.");
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
	
	//통계 > 관리필지 증감현황 > 년,월
	@PostMapping(path="/selectFieldInDeListYYYYMM")
	public void selectFieldInDeListYYYYMM(HttpServletRequest request, HttpServletResponse response) throws Exception {
		ParameterParser parser = new ParameterParser(request);
		String SELECT_YYYY = parser.getString("SELECT_YYYY", "");
		
		ArrayList dataList = new ArrayList();
		HashMap map = new HashMap();
		try {
	
			HashMap params = new HashMap();
			if(!"".equals(SELECT_YYYY)) {
				params.put("SELECT_YYYY", Integer.parseInt(SELECT_YYYY));
			}
			
			
			dataList = (ArrayList) mainService.selectQuery("staticSQL.selectFieldInDeListYYYYMM", params);
	
			map.put("message", "success");
			map.put("dataList", dataList);
		} catch (Exception e) {
			map.put("message", "처리 중 오류가 발생했습니다.");
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
	
	//통계 > 관리필지 증감현황 > 메인 조회
	@PostMapping(path="/selectFieldInDeList")
	public void selectFieldInDeList(HttpServletRequest request, HttpServletResponse response) throws Exception {
		ParameterParser parser = new ParameterParser(request);
		String YYYY_REF = parser.getString("YYYY_REF", "0");
		String MM_REF = parser.getString("MM_REF", "0");
		String YYYY_TG = parser.getString("YYYY_TG", "0");
		String MM_TG = parser.getString("MM_TG", "0");
		
	
		ArrayList dataList = new ArrayList();
		HashMap map = new HashMap();
		try {
	
			HashMap params = new HashMap();
			params.put("YYYY_REF", Integer.parseInt(YYYY_REF) ); 	// 기준년
			params.put("MM_REF", Integer.parseInt(MM_REF));		// 기준월
			params.put("YYYY_TG", Integer.parseInt(YYYY_TG));		// 비교년
			params.put("MM_TG", Integer.parseInt(MM_TG));			// 비교월
	
			dataList = (ArrayList) mainService.selectQuery("staticSQL.selectFieldInDeList", params);
			
	
			map.put("message", "success");
			map.put("dataList", dataList);
		} catch (Exception e) {
			map.put("message", "처리 중 오류가 발생했습니다.");
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
	
	//통계 > 관리필지 증감현황 > 메인 조회 > 엑셀다운로드
	@RequestMapping(path="/selectFieldInDeListExcel")
	public void selectFieldInDeListExcel(HttpServletRequest request, HttpServletResponse response) throws Exception {
		ParameterParser parser = new ParameterParser(request);
		String YYYY_REF = parser.getString("YYYY_REF", "0");
		String MM_REF = parser.getString("MM_REF", "0");
		String YYYY_TG = parser.getString("YYYY_TG", "0");
		String MM_TG = parser.getString("MM_TG", "0");
		
	
		ArrayList dataList = new ArrayList();
		HashMap map = new HashMap();
		try {
	
			HashMap params = new HashMap();
			params.put("YYYY_REF", Integer.parseInt(YYYY_REF) ); 	// 기준년
			params.put("MM_REF", Integer.parseInt(MM_REF));		// 기준월
			params.put("YYYY_TG", Integer.parseInt(YYYY_TG));		// 비교년
			params.put("MM_TG", Integer.parseInt(MM_TG));			// 비교월
	
			dataList = (ArrayList) mainService.selectQuery("staticSQL.selectFieldInDeList", params);
			
	
			map.put("message", "success");
			map.put("dataList", dataList);
		} catch (Exception e) {
			map.put("message", "처리 중 오류가 발생했습니다.");
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
	
	//통계 > 관리필지 증감현황 > 상세 조회
	@PostMapping(path="/selectFieldInDeListDetail")
	public void selectFieldInDeListDetail(HttpServletRequest request, HttpServletResponse response) throws Exception {
		ParameterParser parser = new ParameterParser(request);
		String JISA = parser.getString("JISA", ""); // 지사
		String YYYY = parser.getString("YYYY", "0"); // 클릭한 년도
		String MM = parser.getString("MM", "0");		// 클릭한 월
		String GUBUN = parser.getString("GUBUN", "");// 등기, 미등기계약, 미등기미계약, 소계, 전체
		
	
		ArrayList dataList = new ArrayList();
		HashMap map = new HashMap();
		try {
	
			HashMap params = new HashMap();
			params.put("JISA", JISA);
			params.put("YYYY", Integer.parseInt(YYYY));
			params.put("MM", Integer.parseInt(MM));
	
			if("등기".equals(GUBUN)){
				dataList = (ArrayList) mainService.selectQuery("staticSQL.selectFieldInDeListDetailRegistered", params);
			}else if("미등기계약".equals(GUBUN)){
				dataList = (ArrayList) mainService.selectQuery("staticSQL.selectFieldInDeListDetailUnRegisteredContract", params);
			}else if("미등기미계약".equals(GUBUN)){
				dataList = (ArrayList) mainService.selectQuery("staticSQL.selectFieldInDeListDetailUnRegisteredUnContract", params);
			}else if("소계".equals(GUBUN)){
				dataList = (ArrayList) mainService.selectQuery("staticSQL.selectFieldInDeListDetailUnRegisteredSubtotal", params);
			}else{
				dataList = (ArrayList) mainService.selectQuery("staticSQL.selectFieldInDeListDetailAll", params);
			}
			
			
	
			map.put("message", "success");
			map.put("dataList", dataList);
		} catch (Exception e) {
			map.put("message", "처리 중 오류가 발생했습니다.");
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
	
	//통계 > 관리필지 증감현황 > 현황 상세정보 > 상세변동현황 > 메인 조회
	@PostMapping(path="/selectFieldInDeStatusBoardList")
	public void selectFieldInDeStatusBoardList(HttpServletRequest request, HttpServletResponse response) throws Exception {
		ParameterParser parser = new ParameterParser(request);
		String YYYY_REF = parser.getString("YYYY_REF", "0");
		String MM_REF = parser.getString("MM_REF", "0");
		String YYYY_TG = parser.getString("YYYY_TG", "0");
		String MM_TG = parser.getString("MM_TG", "0");
		
	
		ArrayList dataList = new ArrayList();
		HashMap map = new HashMap();
		try {
	
			HashMap params = new HashMap();
			params.put("YYYY_REF", Integer.parseInt(YYYY_REF)); 	// 기준년
			params.put("MM_REF", Integer.parseInt(MM_REF));		// 기준월
			params.put("YYYY_TG", Integer.parseInt(YYYY_TG));		// 비교년
			params.put("MM_TG", Integer.parseInt(MM_TG));			// 비교월
	
			dataList = (ArrayList) mainService.selectQuery("staticSQL.selectFieldInDeStatusBoardList", params);
			
	
			map.put("message", "success");
			map.put("dataList", dataList);
		} catch (Exception e) {
			map.put("message", "처리 중 오류가 발생했습니다.");
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
	
	//통계 > 관리필지 증감현황 > 현황 상세정보 > 상세변동현황 > 상세 클릭 조회
	@PostMapping(path="/selectFieldInDeStatusBoardListDetail")
	public void selectFieldInDeStatusBoardListDetail(HttpServletRequest request, HttpServletResponse response) throws Exception {
		ParameterParser parser = new ParameterParser(request);
		String JISA = parser.getString("JISA", "");
		String YYYY = parser.getString("YYYY", "0");
		String MM = parser.getString("MM", "0");
		String YYYY_REF = parser.getString("YYYY_REF", "0");
		String MM_REF = parser.getString("MM_REF", "0");
		String YYYY_TG = parser.getString("YYYY_TG", "0");
		String MM_TG = parser.getString("MM_TG", "0");
		String GUBUN = parser.getString("GUBUN", "");
		String GOVER_OWN = parser.getString("GOVER_OWN", "");
		String JISANG_STATUS = parser.getString("JISANG_STATUS", "");
		
		
	
		ArrayList dataList = new ArrayList();
		HashMap map = new HashMap();
		try {
	
			HashMap params = new HashMap();
			params.put("JISA", JISA); 	// 기준년
			params.put("YYYY", Integer.parseInt(YYYY));		// 기준월
			params.put("MM", Integer.parseInt(MM));		// 비교년
			params.put("YYYY_REF", Integer.parseInt(YYYY_REF)); 	// 기준년
			params.put("MM_REF", Integer.parseInt(MM_REF));		// 기준월
			params.put("YYYY_TG", Integer.parseInt(YYYY_TG));		// 비교년
			params.put("MM_TG", Integer.parseInt(MM_TG));			// 비교월
			params.put("GUBUN", GUBUN);			// 필지, 분기
			params.put("GOVER_OWN", GOVER_OWN);	// 사유지, 국유지, ""
			params.put("JISANG_STATUS", JISANG_STATUS);	// 지상권, 미등기, 미설정, 계
			
			// 필지수
			if("필지".equals(GUBUN)) {
				if("사유지".equals(GOVER_OWN)){
					if("지상권".equals(JISANG_STATUS)){
						dataList = (ArrayList) mainService.selectQuery("staticSQL.selectFieldInDeStatusBoardListPrivateRegistered", params);
					}else if("미등기".equals(JISANG_STATUS)){
						dataList = (ArrayList) mainService.selectQuery("staticSQL.selectFieldInDeStatusBoardListFieldPrivateUnRegistered", params);
					}else if("미설정".equals(JISANG_STATUS)){
						dataList = (ArrayList) mainService.selectQuery("staticSQL.selectFieldInDeStatusBoardListPrivateUnSetting", params);
					}else{ // 계
						dataList = (ArrayList) mainService.selectQuery("staticSQL.selectFieldInDeStatusBoardListPrivateProperty", params);
					}
					
				}else if("국유지".equals(GOVER_OWN)){
					dataList = (ArrayList) mainService.selectQuery("staticSQL.selectFieldInDeStatusBoardListPublicRegistered", params);
					
				}else {
					// 필지수 합계				
					dataList = (ArrayList) mainService.selectQuery("staticSQL.selectFieldInDeStatusBoardListSum", params);
				}
			}
			
			// 분기대비
			else {
				if("사유지".equals(GOVER_OWN)){
					if("지상권".equals(JISANG_STATUS)){
						dataList = (ArrayList) mainService.selectQuery("staticSQL.selectFieldInDeStatusBoardListPrivateJisang", params);
					}else if("미등기".equals(JISANG_STATUS)){
						dataList = (ArrayList) mainService.selectQuery("staticSQL.selectFieldInDeStatusBoardListPrivateUnRegistered", params);
					}else if("미설정".equals(JISANG_STATUS)){
						dataList = (ArrayList) mainService.selectQuery("staticSQL.selectFieldInDeStatusBoardListFieldPrivateUnSetting", params);
					}else{ // 계
						dataList = (ArrayList) mainService.selectQuery("staticSQL.selectFieldInDeStatusBoardListFieldPrivateProperty", params);
					}
					
				}else if("국유지".equals(GOVER_OWN)){
					dataList = (ArrayList) mainService.selectQuery("staticSQL.selectFieldInDeStatusBoardListPublicJisang", params);
					
				}else {
					// 필지수 합계				
					dataList = (ArrayList) mainService.selectQuery("staticSQL.selectFieldInDeStatusBoardListBungiSum", params);
				}
			}
	
			map.put("message", "success");
			map.put("dataList", dataList);
		} catch (Exception e) {
			map.put("message", "처리 중 오류가 발생했습니다.");
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
	
	//통계 > 관리필지 증감현황 > 현황 상세정보 > 변동사유 > 클릭 조회
	@PostMapping(path="/selectFieldInDeStatusBoardChangeList")
	public void selectFieldInDeStatusBoardChangeList(HttpServletRequest request, HttpServletResponse response) throws Exception {
		ParameterParser parser = new ParameterParser(request);
		String YYYY_REF = parser.getString("YYYY_REF", "0");
		String MM_REF = parser.getString("MM_REF", "0");
		String YYYY_TG = parser.getString("YYYY_TG", "0");
		String MM_TG = parser.getString("MM_TG", "0");
		
	
		ArrayList dataList = new ArrayList();
		HashMap map = new HashMap();
		try {
	
			HashMap params = new HashMap();
			params.put("YYYY_REF", Integer.parseInt(YYYY_REF)); 	// 기준년
			params.put("MM_REF", Integer.parseInt(MM_REF));		// 기준월
			params.put("YYYY_TG", Integer.parseInt(YYYY_TG));		// 비교년
			params.put("MM_TG", Integer.parseInt(MM_TG));			// 비교월
	
			dataList = (ArrayList) mainService.selectQuery("staticSQL.selectFieldInDeStatusBoardChangeList", params);
			
	
			map.put("message", "success");
			map.put("dataList", dataList);
		} catch (Exception e) {
			map.put("message", "처리 중 오류가 발생했습니다.");
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
	
	//통계 > 관리필지 증감현황 > 현황 상세정보 > 변동사유 > 상세 클릭 조회
	@PostMapping(path="/selectFieldInDeStatusBoardChangeListDetailUpDown")
	public void selectFieldInDeStatusBoardChangeListDetailUpDown(HttpServletRequest request, HttpServletResponse response) throws Exception {
		ParameterParser parser = new ParameterParser(request);
		String JISA = parser.getString("JISA", "");
		String YYYY_REF = parser.getString("YYYY_REF", "0");
		String MM_REF = parser.getString("MM_REF", "0");
		String YYYY_TG = parser.getString("YYYY_TG", "0");
		String MM_TG = parser.getString("MM_TG", "0");
		String GUBUN = parser.getString("GUBUN", "");
		String STATUS = parser.getString("STATUS", "");
		
	
		ArrayList dataList = new ArrayList();
		HashMap map = new HashMap();
		try {
	
			HashMap params = new HashMap();
			params.put("JISA", JISA); 							// 지사
			params.put("YYYY_REF", Integer.parseInt(YYYY_REF)); // 기준년
			params.put("MM_REF", Integer.parseInt(MM_REF));		// 기준월
			params.put("YYYY_TG", Integer.parseInt(YYYY_TG));	// 비교년
			params.put("MM_TG", Integer.parseInt(MM_TG));		// 비교월
			params.put("GUBUN", GUBUN);							// 감소 , 증가 
			params.put("STATUS", STATUS);						// (감소): 분할/ 해지/ 합필/ 권리전환 , (증가): 분할/ 사유지/ 권리전환
			
			// 감소
			if("감소".equals(GUBUN)) {
				dataList = (ArrayList) mainService.selectQuery("staticSQL.selectFieldInDeStatusBoardChangeListDetailDown", params);
			}
			
			// 증가
			else {
				dataList = (ArrayList) mainService.selectQuery("staticSQL.selectFieldInDeStatusBoardChangeListDetailUp", params);
			}
	
			map.put("message", "success");
			map.put("dataList", dataList);
		} catch (Exception e) {
			map.put("message", "처리 중 오류가 발생했습니다.");
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
	
	//민원관리 현황통계 데이터 조회
	@PostMapping(path="/selectMinwonStatusStatis")
	public void selectMinwonStatusStatis(HttpServletRequest request, HttpServletResponse response) throws Exception {
		String requestParams = ParameterUtil.getRequestBodyToStr(request);
		 JSONObject requestParamObj=new JSONObject(requestParams);
		ParameterParser parser = new ParameterParser(request);
		String jisa = requestParamObj.has("jisa")?requestParamObj.getString("jisa"):"";
		
		String status = requestParamObj.has("status")?requestParamObj.getString("status"):"";
		String occurDate = requestParamObj.has("occur_date")?requestParamObj.getString("occur_date"):"";
		
		// jisa 문자열을 ',' 기준으로 배열로 변환
		// jisa 문자열을 ',' 기준으로 배열로 변환 (null이 아닌 빈 리스트로 초기화)
		//String[] jisaArray = (jisa != null && !jisa.isEmpty()) ? jisa.split(",") : new String[0];
		String[] jisaArray = (jisa != null && !jisa.isEmpty()) 
                ? Arrays.stream(jisa.split(","))      // 쉼표로 분리된 문자열을 스트림으로 변환
                        .map(String::trim)            // 각 요소의 앞뒤 공백을 제거
                        .toArray(String[]::new)       // 다시 배열로 변환
                : new String[0]; 

		// 빈 배열이 아닌 경우에만 MyBatis로 전달 (빈 배열은 무시)
		List<String> jisaList = Arrays.asList(jisaArray);

//
		HashMap map = new HashMap<>();
//
		try {
			HashMap param = new HashMap<>();
			param.put("jisaList",  jisaList != null ? jisaList : new ArrayList<>());
			param.put("status",status);
			param.put("occurDate", occurDate);
			
			
			ArrayList dataList = (ArrayList) mainService.selectQuery("staticSQL.selectMinwonStatusStatic", param);
			

			if (dataList.size() > 0) {
				map.put("result", "success");
				map.put("data", dataList);
			} else {
				map.put("result", "ERROR");
			}
		} catch (Exception e) {
			e.printStackTrace();
			map.put("result", "ERROR");
		}

		JSONObject jo = new JSONObject(map);
		response.setCharacterEncoding("UTF-8");
		response.setHeader("Access-Control-Allow-Origin", "*");
		response.resetBuffer();
		response.setContentType("application/json");
		response.getWriter().print(jo);
		response.getWriter().flush();
	}
	
	
	//통계 > 권리별증감현황
	/*
		@PostMapping(path="/selectRightChangeStatisticsList")
		public void selectRightChangeStatisticsList(HttpServletRequest request, HttpServletResponse response) throws Exception {
			ParameterParser parser = new ParameterParser(request);
			String SEARCH_START_DAY = parser.getString("SEARCH_START_DAY", "");
			String SEARCH_END_DAY = parser.getString("SEARCH_END_DAY", "");
			String SEARCH_STATUS = parser.getString("SEARCH_STATUS", "");
			String SEARCH_REGISTED = parser.getString("SEARCH_REGISTED", "");
			String SEARCH_PERMITTED = parser.getString("SEARCH_PERMITTED", "");
			String SEARCH_JISA = parser.getString("SEARCH_JISA", "");
			String SEARCH_CODE_1 = parser.getString("SEARCH_CODE_1", "");
			String SEARCH_CODE_2 = parser.getString("SEARCH_CODE_2", "");
			String SEARCH_CODE_3 = parser.getString("SEARCH_CODE_3", "");
		
			ArrayList dataList = new ArrayList();
			HashMap map = new HashMap();
			try {
		
				HashMap params = new HashMap();
				params.put("SEARCH_START_DAY", SEARCH_START_DAY);
				params.put("SEARCH_END_DAY", SEARCH_END_DAY);
				params.put("SEARCH_STATUS", SEARCH_STATUS);
				params.put("SEARCH_REGISTED", SEARCH_REGISTED);
				params.put("SEARCH_PERMITTED", SEARCH_PERMITTED);
				params.put("SEARCH_JISA", SEARCH_JISA);
				params.put("SEARCH_CODE_1", SEARCH_CODE_1);
				params.put("SEARCH_CODE_2", SEARCH_CODE_2);
				params.put("SEARCH_CODE_3", SEARCH_CODE_3);
		
				dataList = (ArrayList) mainService.selectQuery("staticSQL.selectIssueStatisticsData", params);
		
				map.put("message", "success");
				map.put("dataList", dataList);
			} catch (Exception e) {
				map.put("message", "처리 중 오류가 발생했습니다.");
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
		*/
		
		@RequestMapping(value="/selectRightChangeListTableList", method = {RequestMethod.GET, RequestMethod.POST}) //http://localhost:8080/api/get/dbTest
		public ResponseEntity<?> selectRightChangeListTableList(HttpServletRequest req, HttpServletResponse res) throws Exception {
			
			//일반웹형식
			Properties requestParams = CommonUtil.convertToProperties(req);
			log.info("req:"+req);
			HashMap<String, String> returnHash = new HashMap<String, String>();
			Enumeration<String> obj1 = req.getParameterNames();
			int cnt=0;
			 
			while (obj1.hasMoreElements())
			{
				String paramName = obj1.nextElement();
				String paramValue = req.getParameter(paramName);
				returnHash.put(paramName, paramValue);
				log.info("paramName:"+paramName);
				log.info("paramValue:"+paramValue);
			}

			int draw = Integer.parseInt(req.getParameter("draw"));
			int start = Integer.parseInt(req.getParameter("start"));
			int length = Integer.parseInt(req.getParameter("length"));
			String orderColumn=req.getParameter("order[0][column]");
			String orderDirection = req.getParameter("order[0][dir]");
			String orderColumnName=req.getParameter("columns[" + orderColumn + "][data]");

			String[] order_cols=req.getParameterValues("order");

			String jisa = req.getParameter("jisa");
			String SAVE_YEAR = req.getParameter("SAVE_YEAR");
			String SAVE_QUARTER = req.getParameter("SAVE_QUARTER");
//			String dosiplan = req.getParameter("dosiplan");
//			String address = req.getParameter("saddr");
//			
//			String sido_nm = req.getParameter("sido_nm");
//			String sgg_nm = req.getParameter("sgg_nm");
//			String emd_nm = req.getParameter("emd_nm");
//			String ri_nm = req.getParameter("ri_nm");
//			String jibun = req.getParameter("jibun");
	//
//			String souja = req.getParameter("souja");
//			String jasan_no = req.getParameter("jasan_no");
//			String jimok_text = req.getParameter("jimok_text")==null?"":req.getParameter("jimok_text");
//			List<String> jimokTexts=new ArrayList<String>();
//			if (jimok_text!=null && !jimok_text.trim().isEmpty())	 jimokTexts = Arrays.asList(jimok_text.split(","));
//			
//			//String[] jimokArray = jimok_text != null && !jimok_text.trim().isEmpty() ? jimok_text.split(",") : new String[0]; // 빈 배열로 초기화
	//
//			String comple_yn = req.getParameter("comple_yn");
//			String cancel_yn = req.getParameter("cancel_yn");
//			String deunggi_date = req.getParameter("deunggi_date");
//			String account_yn = req.getParameter("account_yn"); //회계처리 필요여부
//			String start_date = req.getParameter("start_date");
//			String end_date = req.getParameter("end_date");

			Map map=req.getParameterMap();

			HashMap params = new HashMap();
			params.put("draw",draw);
			params.put("start",start);
			params.put("length",length);
			params.put("jisa",jisa);
			params.put("SAVE_YEAR",SAVE_YEAR);
			//params.put("SAVE_YEAR", SAVE_YEAR);
			params.put("SAVE_QUARTER",SAVE_QUARTER);
			params.put("PROCESS_DATE", "");
			params.put("PAGE_NUM", "");
			params.put("PAGE_CNT", "");
//			params.put("dosiplan",dosiplan);
//			params.put("address",address);
//			params.put("sido_nm",sido_nm);
//			params.put("sgg_nm",sgg_nm);
//			params.put("emd_nm",emd_nm);
//			params.put("ri_nm",ri_nm);
//			params.put("jibun",jibun);
	//
//			params.put("souja",souja);
//			params.put("jasan_no",jasan_no);
	//
//			//params.put("jimokArray", jimokArray);
//			params.put("comple_yn", comple_yn);
//			params.put("cancel_yn", cancel_yn);
//			params.put("deunggi_date", deunggi_date);
//			params.put("account_yn", account_yn);
//			params.put("start_date", start_date);
//			params.put("end_date", end_date);
//			log.info("jimokTexts.size:"+jimokTexts.size());
//			if (jimokTexts.size()>0) params.put("JIMOK_TEXT", jimokTexts);	//지목 추가
//			else params.put("JIMOK_TEXT", null);	

//			String[] right_arr= {};
//			right_arr=right_type.split(",");
//			params.put("right_type", right_arr);

//			params.put("manageYn","Y");
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

//			Object count= mainService.selectCountQuery("jisangSQL.selectJisangListCount", params);
//			int total=(int)count;

//			ArrayList<HashMap> list = mainService.selectQuery("jisangSQL.selectJisangListOrg",params);
			ArrayList dataList = new ArrayList();
			Integer totalcnt = 0;
			
				dataList = (ArrayList) mainService.selectQuery("staticSQL.selectStatisticsDeadlineData", params);
				totalcnt = (Integer) mainService.selectCountQuery("staticSQL.selectStatisticsDeadlineDataCnt", params);
				int total=totalcnt;
			
			log.info("dataList: " + dataList);
			//ArrayList<HashMap> list = mainService.selectQuery("jisangSQL.selectJisangList",params);
			//ArrayList<HashMap> list = mainService.selectQuery("jisangSQL.selectJisangListDemo",params); //demo
			//log.info("list:"+list);


			HashMap<String,Object> resultmap=new HashMap();
			resultmap.put("draw",draw);
			resultmap.put("recordsTotal",total);
			resultmap.put("recordsFiltered",total);
			resultmap.put("data",dataList);

			JSONObject obj =new JSONObject(resultmap);
			//log.info("obj:"+obj);
			return ResponseEntity.ok(obj.toString());

		}
		
		
		
		
		//통계 > 관리필지증감현황
				@PostMapping(path="/selectParcelChangeStatisticsList")
				public void selectParcelChangeStatisticsList(HttpServletRequest request, HttpServletResponse response) throws Exception {
					ParameterParser parser = new ParameterParser(request);
					String SEARCH_START_DAY = parser.getString("SEARCH_START_DAY", "");
					String SEARCH_END_DAY = parser.getString("SEARCH_END_DAY", "");
					String SEARCH_STATUS = parser.getString("SEARCH_STATUS", "");
					String SEARCH_REGISTED = parser.getString("SEARCH_REGISTED", "");
					String SEARCH_PERMITTED = parser.getString("SEARCH_PERMITTED", "");
					String SEARCH_JISA = parser.getString("SEARCH_JISA", "");
					String SEARCH_CODE_1 = parser.getString("SEARCH_CODE_1", "");
					String SEARCH_CODE_2 = parser.getString("SEARCH_CODE_2", "");
					String SEARCH_CODE_3 = parser.getString("SEARCH_CODE_3", "");
				
					ArrayList dataList = new ArrayList();
					HashMap map = new HashMap();
					try {
				
						HashMap params = new HashMap();
						params.put("SEARCH_START_DAY", SEARCH_START_DAY);
						params.put("SEARCH_END_DAY", SEARCH_END_DAY);
						params.put("SEARCH_STATUS", SEARCH_STATUS);
						params.put("SEARCH_REGISTED", SEARCH_REGISTED);
						params.put("SEARCH_PERMITTED", SEARCH_PERMITTED);
						params.put("SEARCH_JISA", SEARCH_JISA);
						params.put("SEARCH_CODE_1", SEARCH_CODE_1);
						params.put("SEARCH_CODE_2", SEARCH_CODE_2);
						params.put("SEARCH_CODE_3", SEARCH_CODE_3);
				
						dataList = (ArrayList) mainService.selectQuery("staticSQL.selectIssueStatisticsData", params);
				
						map.put("message", "success");
						map.put("dataList", dataList);
					} catch (Exception e) {
						map.put("message", "처리 중 오류가 발생했습니다.");
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
	
				//통계 > 관리필지증감현황 테이블 에서 조회
				@RequestMapping(value="/selectParcelChangeListTableList", method = {RequestMethod.GET, RequestMethod.POST}) //http://localhost:8080/api/get/dbTest
				public ResponseEntity<?> selectParcelChangeListTableList(HttpServletRequest req, HttpServletResponse res) throws Exception {
					
					//일반웹형식
					Properties requestParams = CommonUtil.convertToProperties(req);
					log.info("req:"+req);
					HashMap<String, String> returnHash = new HashMap<String, String>();
					Enumeration<String> obj1 = req.getParameterNames();
					int cnt=0;
					 
					while (obj1.hasMoreElements())
					{
						String paramName = obj1.nextElement();
						String paramValue = req.getParameter(paramName);
						returnHash.put(paramName, paramValue);
						log.info("paramName:"+paramName);
						log.info("paramValue:"+paramValue);
					}

					int draw = Integer.parseInt(req.getParameter("draw"));
					int start = Integer.parseInt(req.getParameter("start"));
					int length = Integer.parseInt(req.getParameter("length"));
					String orderColumn=req.getParameter("order[0][column]");
					String orderDirection = req.getParameter("order[0][dir]");
					String orderColumnName=req.getParameter("columns[" + orderColumn + "][data]");

					String[] order_cols=req.getParameterValues("order");

					String jisa = req.getParameter("jisa");
					String SAVE_YEAR = req.getParameter("SAVE_YEAR");
					String SAVE_QUARTER = req.getParameter("SAVE_QUARTER");
//					String dosiplan = req.getParameter("dosiplan");
//					String address = req.getParameter("saddr");
//					
//					String sido_nm = req.getParameter("sido_nm");
//					String sgg_nm = req.getParameter("sgg_nm");
//					String emd_nm = req.getParameter("emd_nm");
//					String ri_nm = req.getParameter("ri_nm");
//					String jibun = req.getParameter("jibun");
			//
//					String souja = req.getParameter("souja");
//					String jasan_no = req.getParameter("jasan_no");
//					String jimok_text = req.getParameter("jimok_text")==null?"":req.getParameter("jimok_text");
//					List<String> jimokTexts=new ArrayList<String>();
//					if (jimok_text!=null && !jimok_text.trim().isEmpty())	 jimokTexts = Arrays.asList(jimok_text.split(","));
//					
//					//String[] jimokArray = jimok_text != null && !jimok_text.trim().isEmpty() ? jimok_text.split(",") : new String[0]; // 빈 배열로 초기화
			//
//					String comple_yn = req.getParameter("comple_yn");
//					String cancel_yn = req.getParameter("cancel_yn");
//					String deunggi_date = req.getParameter("deunggi_date");
//					String account_yn = req.getParameter("account_yn"); //회계처리 필요여부
//					String start_date = req.getParameter("start_date");
//					String end_date = req.getParameter("end_date");

					Map map=req.getParameterMap();

					HashMap params = new HashMap();
					params.put("draw",draw);
					params.put("start",start);
					params.put("length",length);
					params.put("jisa",jisa);
					params.put("SAVE_YEAR",SAVE_YEAR);
					//params.put("SAVE_YEAR", SAVE_YEAR);
					params.put("SAVE_QUARTER",SAVE_QUARTER);
					params.put("PROCESS_DATE", "");
					params.put("PAGE_NUM", "");
					params.put("PAGE_CNT", "");
//					params.put("dosiplan",dosiplan);
//					params.put("address",address);
//					params.put("sido_nm",sido_nm);
//					params.put("sgg_nm",sgg_nm);
//					params.put("emd_nm",emd_nm);
//					params.put("ri_nm",ri_nm);
//					params.put("jibun",jibun);
			//
//					params.put("souja",souja);
//					params.put("jasan_no",jasan_no);
			//
//					//params.put("jimokArray", jimokArray);
//					params.put("comple_yn", comple_yn);
//					params.put("cancel_yn", cancel_yn);
//					params.put("deunggi_date", deunggi_date);
//					params.put("account_yn", account_yn);
//					params.put("start_date", start_date);
//					params.put("end_date", end_date);
//					log.info("jimokTexts.size:"+jimokTexts.size());
//					if (jimokTexts.size()>0) params.put("JIMOK_TEXT", jimokTexts);	//지목 추가
//					else params.put("JIMOK_TEXT", null);	

//					String[] right_arr= {};
//					right_arr=right_type.split(",");
//					params.put("right_type", right_arr);

//					params.put("manageYn","Y");
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

//					Object count= mainService.selectCountQuery("jisangSQL.selectJisangListCount", params);
//					int total=(int)count;

//					ArrayList<HashMap> list = mainService.selectQuery("jisangSQL.selectJisangListOrg",params);
					ArrayList dataList = new ArrayList();
					Integer totalcnt = 0;
					
						dataList = (ArrayList) mainService.selectQuery("staticSQL.selectStatisticsDeadlineData", params);
						totalcnt = (Integer) mainService.selectCountQuery("staticSQL.selectStatisticsDeadlineDataCnt", params);
						int total=totalcnt;
					
					log.info("dataList: " + dataList);
					//ArrayList<HashMap> list = mainService.selectQuery("jisangSQL.selectJisangList",params);
					//ArrayList<HashMap> list = mainService.selectQuery("jisangSQL.selectJisangListDemo",params); //demo
					//log.info("list:"+list);


					HashMap<String,Object> resultmap=new HashMap();
					resultmap.put("draw",draw);
					resultmap.put("recordsTotal",total);
					resultmap.put("recordsFiltered",total);
					resultmap.put("data",dataList);

					JSONObject obj =new JSONObject(resultmap);
					//log.info("obj:"+obj);
					return ResponseEntity.ok(obj.toString());

				}
	
	
//	// 토지 종합 정보 조회 > Excel 다운로드
//		public ModelAndView tsExcelDownload(HttpServletRequest request, HttpServletResponse response) throws Exception {
//
//			ParameterParser parser = new ParameterParser(request);
//			ArrayList list = null;
//
//			String EMD_NM = parser.getString("TOGI_EXCEL_EMD_NM", "");
//			String JIBUN = parser.getString("TOGI_EXCEL_JIBUN", "");
//			String JISANG_STATUS = parser.getString("TOGI_EXCEL_JISANG_STATUS", "");
//			String ALL_CHECK = parser.getString("TOGI_EXCEL_ALL_CHECK", "");
//			String JISA = parser.getString("TOGI_EXCEL_JISA", "");
//			String GUBUN = parser.getString("TOGI_EXCEL_GUBUN", "1");
//			String ADDRCODE = parser.getString("TOGI_EXCEL_ADDRCODE", "");
//
//			try {
//
//				Map params = new HashMap();
//				params.put("EMD_NM", EMD_NM);
//				params.put("JIBUN", JIBUN);
//				params.put("JISA", JISA);
//				params.put("ADDRCODE", ADDRCODE);
//
//				if (ALL_CHECK.equals("false")) {
//					params.put("JISANG_STATUS", JISANG_STATUS);
//				}
//				if (ALL_CHECK.equals("true") && GUBUN.equals("2")) {
//					params.put("JISANG_STATUS", "'JISANG','GOVER','DOPCO'");
//				}
//
//				// System.out.println(params);
//
//				list = (ArrayList) Database.getInstance().queryForList("Json.selectTogiList", params);
//
//			} catch (Exception e) {
//				System.out.println(e);
//			}
//
//			response.setHeader("Content-Disposition", "attachment;filename=" + java.net.URLEncoder.encode("토지정보조회.xls", "UTF-8") + ";");
//			response.setHeader("Content-Type", "application/octet-stream; charset=utf-8");
//
//			ModelAndView mav = new ModelAndView();
//			mav.addObject("list", list);
//			mav.addObject("nTotalCount", list.size());
//			mav.setViewName("togiSearch/tsExcel");
//
//			return mav;
//		}

}




