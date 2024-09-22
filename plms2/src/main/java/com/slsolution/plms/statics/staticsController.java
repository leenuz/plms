package com.slsolution.plms.statics;

import java.io.InputStream;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Properties;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.EnableAsync;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.slsolution.plms.CommonUtil;
import com.slsolution.plms.ExcelUtil;
import com.slsolution.plms.MainService;
import com.slsolution.plms.ParameterParser;
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
@RequestMapping("/statics")
@CrossOrigin(origins="*",allowedHeaders="*")
public class staticsController {
	@Autowired
	private MainService mainService;
	
	
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

			Properties env = new Properties();
			InputStream is = getClass().getResourceAsStream("/db.properties");
			try {
				env.load(is);
			} catch (Exception es) {
				es.printStackTrace();
				System.err.println("Can't read the properties file. " + "Make sure env.properties is in the CLASSPATH");
			}

			String excelFIleBase = env.getProperty("FILE_BASE_PATH");

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
	
	// 토지 관리 현황(권리확보현황) 조회리스트 리턴
		public HashMap selectTogiMgtStateListReturn(HttpServletRequest request, HttpServletResponse response) throws Exception {
			String requestParams = ParameterUtil.getRequestBodyToStr(request);
			 JSONObject requestParamObj=new JSONObject(requestParams);
			ParameterParser parser = new ParameterParser(request);
			String SIDO = requestParamObj.getString("SIDO");
			String SGG = requestParamObj.getString("SGG");
			String JISA = requestParamObj.getString("JISA");
			String ADDRCODE = requestParamObj.getString("ADDRCODE");
			String KIJUN =requestParamObj.getString("KIJUN")==null?requestParamObj.getString("JISA"):requestParamObj.getString("KIJUN");

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
						String JISANG_STATUS = cu.nvl((String) ((HashMap) sayujiList.get(i)).get("JISANG_STATUS"));
						String COMPLE_YN = cu.nvl((String) ((HashMap) sayujiList.get(i)).get("COMPLE_YN"));
						Long CNT = Long.parseLong(String.valueOf(((HashMap) sayujiList.get(i)).get("CNT")));

						if (JISANG_STATUS.equals("JISANG") && COMPLE_YN.equals("Y"))
							l_SAYUJI_Y_Y += CNT;
						else if (JISANG_STATUS.equals("JISANG") && COMPLE_YN.equals("N"))
							l_SAYUJI_Y_N += CNT;
						else if (JISANG_STATUS.equals("N") || JISANG_STATUS.equals("NOTSET"))
							l_SAYUJI_N += CNT;
					}
				}
				if (gukyujiList.size() > 0) {
					for (int i = 0; i < gukyujiList.size(); i++) {
						String JISANG_STATUS = cu.nvl((String) ((HashMap) gukyujiList.get(i)).get("JISANG_STATUS"));
						// String CNT = cu.nvl(String.valueOf(((HashMap) gukyujiList.get(i)).get("CNT")));
						Long CNT = Long.parseLong(String.valueOf(((HashMap) gukyujiList.get(i)).get("CNT")));

						if (JISANG_STATUS.equals("GOVER"))
							l_GUKYUJI_Y += CNT;
						else if (JISANG_STATUS.equals("JISANG"))
							l_GUKYUJI_J += CNT;
						else if (JISANG_STATUS.equals("N") || JISANG_STATUS.equals("NOTSET"))
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

}
