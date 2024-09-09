package com.slsolution.plms.dopco;

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
		ModelAndView mav=new ModelAndView();
		mav.setViewName("content/dopco/menu05_1");
		return mav;
	}
	
	
	
	@GetMapping(path="/compLandReg") //http://localhost:8080/api/get/dbTest
    public ModelAndView compLandReg(HttpServletRequest httpRequest, HttpServletResponse response) throws Exception {
//		response.setHeader("X-Frame-Options", "SAMEORIGIN");
//		response.setHeader("Content-Security-Policy", " frame-ancestors 'self'");
		ModelAndView mav=new ModelAndView();
		mav.setViewName("content/dopco/compLandReg");
		return mav;
	}
	@GetMapping(path="/menu05_2") //http://localhost:8080/api/get/dbTest
    public ModelAndView menu05_2(HttpServletRequest httpRequest, HttpServletResponse response) throws Exception {
//		response.setHeader("X-Frame-Options", "SAMEORIGIN");
//		response.setHeader("Content-Security-Policy", " frame-ancestors 'self'");
		ModelAndView mav=new ModelAndView();
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
}
