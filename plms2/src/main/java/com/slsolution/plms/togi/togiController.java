package com.slsolution.plms.togi;

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

import com.slsolution.plms.CommonUtil;
import com.slsolution.plms.MainService;
import com.slsolution.plms.ParameterParser;
import com.slsolution.plms.ParameterUtil;
import com.slsolution.plms.json.JSONObject;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

import java.util.ArrayList;
import java.util.HashMap;

@Slf4j
@EnableAsync
@RequiredArgsConstructor
@RestController
@RequestMapping("/togi")
@CrossOrigin(origins="*",allowedHeaders="*")
public class togiController {
	@Autowired
	private MainService mainService;
	
	@GetMapping(path="/menu04_1") //http://localhost:8080/api/get/dbTest
    public ModelAndView menu04_1(HttpServletRequest httpRequest, HttpServletResponse response) throws Exception {
		HashMap params = new HashMap();
		ArrayList<HashMap> list=new ArrayList<HashMap>();
		ArrayList<HashMap> jisalist = mainService.selectQuery("commonSQL.selectAllJisaList",params);
		ArrayList<HashMap> sidolist = mainService.selectQuery("commonSQL.getSidoMaster",params);

		ModelAndView mav=new ModelAndView();
		mav.addObject("jisaList",jisalist);
		mav.addObject("sidoList",sidolist);

		mav.setViewName("content/togi/menu04_1");
		return mav;
	}
	
	@GetMapping(path="/landReg") //http://localhost:8080/api/get/dbTest
    public ModelAndView landReg(HttpServletRequest httpRequest, HttpServletResponse response) throws Exception {
//		response.setHeader("X-Frame-Options", "SAMEORIGIN");
//		response.setHeader("Content-Security-Policy", " frame-ancestors 'self'");
		ModelAndView mav=new ModelAndView();
		mav.setViewName("content/togi/landReg");
		return mav;
	}
	@GetMapping(path="/landDevInfo") //http://localhost:8080/api/get/dbTest
    public ModelAndView landDevInfo(HttpServletRequest httpRequest, HttpServletResponse response) throws Exception {

		ModelAndView mav=new ModelAndView();

		HashMap params = new HashMap();
		ArrayList<HashMap>  list=new ArrayList<HashMap>();
		ArrayList<HashMap> data = mainService.selectQuery("togiSQL.selectAllData",params);

		String idx = httpRequest.getParameter("idx");

		params.put("idx",idx);
		mav.addObject("resultData",data.get(0));

		mav.setViewName("content/togi/landDevInfo");
		return mav;
	}
	@GetMapping(path="/landEdit") //http://localhost:8080/api/get/dbTest
    public ModelAndView landEdit(HttpServletRequest httpRequest, HttpServletResponse response) throws Exception {


		ModelAndView mav=new ModelAndView();

		mav.setViewName("content/togi/landEdit");
		return mav;
	}
	
	
	
	//토지조회리스트
	@RequestMapping(value="/menu04_1DataTableList", method = {RequestMethod.GET, RequestMethod.POST}) //http://localhost:8080/api/get/dbTest
	public ResponseEntity<?> datatableList04_1(HttpServletRequest req, HttpServletResponse res) throws Exception {

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

		
		String complete_yn=req.getParameter("complete_yn");
		
		
		
		String start_date=req.getParameter("start_date");
		String end_date=req.getParameter("end_date");

		Map map=req.getParameterMap();

		HashMap params = new HashMap();
		params.put("draw",draw);
		params.put("start",start);
		params.put("length",length);
		params.put("jisa",jisa);
		
		
		params.put("address",address);

		
		params.put("complete_yn", complete_yn);
	
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

		Object count= mainService.selectCountQuery("togiSQL.selectDosiListCount", params);
		int total=(int)count;

		ArrayList<HashMap> list = mainService.selectQuery("togiSQL.selectDosiList",params);
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
	
	@PostMapping(path="/getTogiJIjukSelect") //http://localhost:8080/api/get/dbTest
	public ModelAndView getTogiJIjukSelect(HttpServletRequest httpRequest, HttpServletResponse response) throws Exception {
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
		//log.info("addressList:"+addressList);
		mav.addObject("addressList",addressList);
		mav.setViewName("content/togi/landReg :: #togiInfoDiv");
		return mav;
	}
	
	
	// 토지개발 도시개발 등록 및 수정
	@Transactional
	@PostMapping(path="/insertDosiList")
		public void insertDosiList(HttpServletRequest request, HttpServletResponse response) throws Exception {
		String requestParams = ParameterUtil.getRequestBodyToStr(request);
		 log.info("requestParams:"+requestParams);
		 JSONObject requestParamObj=new JSONObject(requestParams);
			ParameterParser parser = new ParameterParser(request);
			String str_result = "Y";
			String gubun = null;
			String USER_ID = String.valueOf(request.getSession().getAttribute("userId"));
			String USER_NAME = String.valueOf(request.getSession().getAttribute("userName"));

			try {
				CommonUtil comm = new CommonUtil();

				int addDosiNumber = Integer.parseInt(parser.getString("addDosiNumber", ""));
				int addDosiDeptNumber = Integer.parseInt(parser.getString("addDosiDeptNumber", ""));

				// 수정을 위한 기존 토지,부서 사이즈
				int deptSize = Integer.parseInt(parser.getString("deptSize", ""));
				int togiSize = Integer.parseInt(parser.getString("togiSize", ""));

				// System.out.println("addDosiDeptNumber :: " + addDosiDeptNumber);
				// System.out.println("addDosiNumber :: " + addDosiNumber);
				HashMap<String, String> params = new HashMap<String, String>();

				String fileseq = parser.getString("fileseq", ""); // 파일 seq
				String filenumber = parser.getString("filenumber", ""); // 파일 수
				String bizNM = parser.getString("bizNM", "");
				String strDate = parser.getString("strDate", "").replace("-", "");
				String endDate = parser.getString("endDate", "").replace("-", "");
				String admOffice = parser.getString("admOffice", "");
				String bizOper = parser.getString("bizOper", "");
				String dosiNo = parser.getString("dosiNo", "");
				gubun = parser.getString("gubun", "");

				// System.out.println("#########gubun::" + gubun);
				// System.out.println("#########filenumber::" + filenumber);
				// System.out.println("#########fileseq::" + fileseq);

				params.put("FILESEQ", fileseq);
				params.put("FILE_SEQ", fileseq);

				// 도시마스터 채번
				ArrayList DosiList = (ArrayList) mainService.selectQuery("togiSQL.selectDosiNextNo", null);

				if ("insert".equals(gubun)) {
					String Next_DosiNo = String.valueOf(Integer.parseInt((String) ((HashMap) DosiList.get(0)).get("NOW_DOSINO")) + 1);
					int n_Next_DosiNo = Next_DosiNo.length();

					String add_Zero = "";
					for (int j = 0; j < (6 - n_Next_DosiNo); j++) {
						add_Zero += "0";
					}
					Next_DosiNo = "D_" + add_Zero + Next_DosiNo;

					params.put("DOSI_NO", Next_DosiNo);
				} else if ("modify".equals(gubun)) {
					params.put("DOSI_NO", dosiNo);
				}

				for (int i = 0; i < addDosiNumber; i++) {
					String masterYN = parser.getString("masterYN" + i, ""); // 대표토지 Y,N
					String togiStatus = parser.getString("togiStatus" + i, "").replaceAll("전체", "");
					String jisa = parser.getString("jisa" + i, "").replaceAll("전체", "");
					String pipeYN = parser.getString("pipeYN" + i, "").replaceAll("전체", "");
					String sodiNm = parser.getString("sidoNm" + i, "").replaceAll("전체", "");
					String gugunNM = parser.getString("gugunNM" + i, "").replaceAll("전체", "");
					String dongNm = parser.getString("dongNm" + i, "").replaceAll("전체", "");
					String riNm = parser.getString("riNm" + i, "").replaceAll("전체", "");
					String jibun = parser.getString("jibun" + i, "");
					String pnu = parser.getString("pnu" + i, "");
					String jimok = parser.getString("jimok" + i, "");
					String jijukArea = parser.getString("jijukArea" + i, "");
					String length = parser.getString("length" + i, "");
					String soyou = parser.getString("soyou" + i, "");
					String addrCode = parser.getString("addrCode" + i, "");

					if ("modify".equals(gubun)) {
						if (i == 0) {
							mainService.InsertQuery("togiSQL.deleteDosiMaster", params);
						}

					}

					params.put("MASTER_YN", masterYN);
					params.put("TOJI_TYPE", togiStatus);
					params.put("JISA", jisa);
					params.put("PIPE_YN", pipeYN);
					params.put("SIDO_NM", sodiNm);
					params.put("SGG_NM", gugunNM);
					params.put("EMD_NM", dongNm);
					params.put("RI_NM", riNm);
					params.put("JIBUN", jibun);
					params.put("PNU", pnu);
					params.put("JIMOK_TEXT", jimok);
					params.put("JIJUK_AREA", jijukArea);
					params.put("LENGTH", length);
					params.put("SOYOUJA", soyou);
					params.put("ADDRCODE", addrCode);

					mainService.InsertQuery("togiSQL.insertDosiMaster", params);
				}

				params.put("BUSINESS_NM", bizNM);
				params.put("STRDATE", strDate);
				params.put("ENDDATE", endDate);
				params.put("ADM_OFFICE", admOffice);
				params.put("BUSINESS_OPER", bizOper);

				if ("modify".equals(gubun)) {
					mainService.InsertQuery("togiSQL.deleteDosiInfo", params);
				}

				// 도시개발 정보 추가
				params.put("USER_ID", USER_ID);
				mainService.InsertQuery("togiSQL.insertDosiInfo", params);

				for (int i = 0; i < addDosiDeptNumber; i++) {
					String deptNM = parser.getString("deptNM" + i, "");
					String mng = parser.getString("mng" + i, "");
					String contactNum = parser.getString("contactNum" + i, "");

					params.put("DEPT_NM", deptNM);
					params.put("MANAGER", mng);
					params.put("CONTACT_NUM", contactNum);

					if ("modify".equals(gubun)) {
						// 수정일 경우 기존 부서정보 모두 삭제 후 재등록처리
						if (i == 0) {
							mainService.InsertQuery("togiSQL.deleteDosiDept", params);
						}
					}

					// 부서 추가
					mainService.InsertQuery("togiSQL.insertDosiDept", params);

				}

				// 첨부파일 관련 처리
				if (gubun.equals("modify")) {
					// System.out.println("filenumber = " + filenumber);
					for (int i = 0; i < Integer.parseInt(filenumber); i++) {
						String IS_DEL = parser.getString("isFileDel" + String.valueOf(i), "");
						String DEL_SEQ = parser.getString("fileSeq" + String.valueOf(i), "");

						if (IS_DEL.equals("Y")) {
							// System.out.println("FILE_DEL_SEQ=" + DEL_SEQ);

							// 조회용 parma셋팅
							params.put("SEQ", "");
							params.put("DOSI_NO", String.valueOf((params.get("DOSI_NO"))));
							params.put("FILE_SEQ", DEL_SEQ);
							ArrayList File_list = (ArrayList) mainService.selectQuery("togiSQL.selectDosiRowDetail_Files", params); // 첨부
																																				// 파일

							params.put("SEQ", DEL_SEQ);
							mainService.UpdateQuery("togiSQL.dosiDeleteFile", params);
						}
					}
				}

				mainService.UpdateQuery("togiSQL.updateDosiSeqFile", params);
				

			} catch (Exception e) {
				str_result = "N";
				e.printStackTrace();
			}

			HashMap map = new HashMap();
			map.put("message", str_result);
			map.put("gubun", gubun);

			JSONObject jo = new JSONObject(map);

			response.setCharacterEncoding("UTF-8");
			response.setHeader("Access-Control-Allow-Origin", "*");
			response.resetBuffer();
			response.setContentType("application/json");
			response.getWriter().print(jo);
			response.getWriter().flush();

		}

	
}
