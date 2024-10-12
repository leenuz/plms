package com.slsolution.plms.noti;

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
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
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
@RequestMapping("/land/noti")
@CrossOrigin(origins="*",allowedHeaders="*")
public class notiController {
	@Autowired
	private MainService mainService;
	
	// 이설공사 확인 필지
	@GetMapping(path="/menu01") //http://localhost:8080/api/get/dbTest
    public ModelAndView list(HttpServletRequest httpRequest, HttpServletResponse response) throws Exception {
		/*******************************/
        //받은 세션 Map으로 전환
        Map<String, Object> sessionMap = CommonUtil.requestSessionToMap(httpRequest);
        /*******************************/
		
		HashMap params = new HashMap();
		params.put("LOGIN_JISA", (String)sessionMap.get("jisa"));    //지사정보 param에 싣기
		
		ArrayList<HashMap> jisalist = mainService.selectQuery("commonSQL.selectAllJisaList",params);
		ArrayList<HashMap> sidolist = mainService.selectQuery("commonSQL.getSidoMaster",params);
		
		ModelAndView mav = new ModelAndView();
		
		mav.addObject("jisaList",jisalist);
		mav.addObject("sidoList",sidolist);
		//241006 - 지사정보 추가
		mav.addObject("loginJisa", (String)sessionMap.get("jisa"));
		
		mav.setViewName("content/noti/menu01");
		return mav;
	}
	
	
	/**
	 * 이설공사 확인필지 - 데이터테이블 조회 API
	 * 
	 * @param req  HttpServletRequest - 클라이언트 요청 파라미터를 처리
	 * @param res  HttpServletResponse - 서버의 응답 처리
	 * @return     ResponseEntity - 조회된 데이터를 JSON 형식으로 반환
	 * @throws Exception 예외 처리
	 * 
	 * @author 손지민
	 * @since 2024.10.12
	 * @version 1.0
	 */
	@RequestMapping(value = "/DataTableList", method = { RequestMethod.GET, RequestMethod.POST }) // http://localhost:8080/api/get/dbTest
	public ResponseEntity<?> datatableList(HttpServletRequest req, HttpServletResponse res) throws Exception {

		// DataTables 관련 파라미터 처리
		int draw = Integer.parseInt(req.getParameter("draw"));
		int start = Integer.parseInt(req.getParameter("start"));
		int length = Integer.parseInt(req.getParameter("length"));
		
		// 정렬 관련 파라미터 처리
		String orderColumn = req.getParameter("order[0][column]");
		String orderDirection = req.getParameter("order[0][dir]");
		String orderColumnName = req.getParameter("columns[" + orderColumn + "][data]");
		String[] order_cols = req.getParameterValues("order");


		// 검색 조건
		String jisa = req.getParameter("jisa"); // 지사
		String gubun = req.getParameter("gubun"); // 구분
		String juso = req.getParameter("juso"); 
		String sido_nm = req.getParameter("sido_nm");
		String sgg_nm = req.getParameter("sgg_nm");
		String emd_nm = req.getParameter("emd_nm");
		String ri_nm = req.getParameter("ri_nm");
		String jibun = req.getParameter("jibun");

		// 검색 조건 - 날짜 필터
		String start_date = req.getParameter("start_date");
		String end_date = req.getParameter("end_date");

		// 검색 파라미터 설정
		HashMap params = new HashMap();
		params.put("draw", draw);
		params.put("start", start);
		params.put("length", length);
		
		params.put("jisa", jisa);
		params.put("gubun", gubun);
		params.put("juso", juso);
		params.put("sido_nm", sido_nm);
		params.put("sgg_nm", sgg_nm);
		params.put("emd_nm", emd_nm);
		params.put("ri_nm", ri_nm);
		params.put("jibun", jibun);

		// 정렬 조건 설정
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
		log.info("param: " + params);

		// 데이터 조회
		Object count = mainService.selectCountQuery("notiSQL.selectNotiTotalCount", params);
		int total = (int) count;
		ArrayList<HashMap> list = mainService.selectQuery("notiSQL.selectNotiAllList", params);

		// 결과 구성
		HashMap<String, Object> resultmap = new HashMap();
		resultmap.put("draw", draw);
		resultmap.put("recordsTotal", total);
		resultmap.put("recordsFiltered", total);
		resultmap.put("data", list);

		// JSON 변환 및 반환
		JSONObject obj = new JSONObject(resultmap);
		return ResponseEntity.ok(obj.toString());
	}
	
	@PostMapping("/deleteJijuk")
	public ResponseEntity<?> deleteJijuk(@RequestParam("id") String id) throws Exception {
	    try {
	        // id를 정수형으로 변환
	        int intId = Integer.parseInt(id);
	        
	        HashMap<String, Object> params = new HashMap<>();
	        params.put("id", intId); // 정수형 id를 params에 넣음
	        
	        // 삭제 쿼리 실행
	        mainService.UpdateQuery("notiSQL.deleteJijuk", params); 
	        
	        return ResponseEntity.ok().body("삭제 완료");
	    } catch (NumberFormatException e) {
	        // id가 정수형으로 변환되지 않으면 예외 처리
	        return ResponseEntity.badRequest().body("유효하지 않은 id 값입니다.");
	    }
	}

}
