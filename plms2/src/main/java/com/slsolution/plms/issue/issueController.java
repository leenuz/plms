package com.slsolution.plms.issue;

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
}
