package com.slsolution.plms.togi;

import java.io.File;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collections;
import java.util.Enumeration;
import java.util.HashMap;
import java.util.Iterator;
import java.util.Map;
import java.util.Properties;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
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
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;
import org.springframework.web.servlet.ModelAndView;

import com.slsolution.plms.CommonUtil;
import com.slsolution.plms.MainService;
import com.slsolution.plms.ParameterParser;
import com.slsolution.plms.ParameterUtil;
import com.slsolution.plms.config.GlobalConfig;
import com.slsolution.plms.json.JSONArray;
import com.slsolution.plms.json.JSONObject;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

import java.util.ArrayList;
import java.util.HashMap;
import org.springframework.web.bind.annotation.RequestBody;


@Slf4j
@EnableAsync
@RequiredArgsConstructor
@RestController
@RequestMapping("/togi")
@CrossOrigin(origins="*",allowedHeaders="*")
public class togiController {
	@Autowired
	private MainService mainService;
	
	@Autowired
	private GlobalConfig GC;
	
	@GetMapping(path="/menu04_1") //http://localhost:8080/api/get/dbTest
    public ModelAndView menu04_1(HttpServletRequest httpRequest, HttpServletResponse response) throws Exception {
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
		
		mav.setViewName("content/togi/menu04_1");
		return mav;
	}
	
	@GetMapping(path="/landReg") //http://localhost:8080/api/get/dbTest
    public ModelAndView landReg(HttpServletRequest httpRequest, HttpServletResponse response) throws Exception {
//		response.setHeader("X-Frame-Options", "SAMEORIGIN");
//		response.setHeader("Content-Security-Policy", " frame-ancestors 'self'");
		ModelAndView mav=new ModelAndView();
		/*******************************/
		//받은 세션 Map으로 전환
		Map<String, Object> sessionMap = CommonUtil.requestSessionToMap(httpRequest);
		/*******************************/
		HashMap params = new HashMap();
		params.put("LOGIN_JISA", (String)sessionMap.get("jisa"));    //지사정보 param에 싣기
//		String pnu = httpRequest.getParameter("pnu");
		params.put("pnu","4423010300100700004");

//		ArrayList<HashMap> searchList = mainService.selectQuery("jisangSQL.selectBasicSearchList", params);
		//241006 - 지사정보 추가
		mav.addObject("loginJisa", (String)sessionMap.get("jisa"));
//		mav.addObject("searchList", searchList);
		mav.setViewName("content/togi/landReg");
		return mav;
	}
	
	// 토지 개발정보
	@GetMapping(path="/landDevInfo") //http://localhost:8080/api/get/dbTest
    public ModelAndView landDevInfo(HttpServletRequest httpRequest, HttpServletResponse response) throws Exception {

		ModelAndView mav = new ModelAndView();

		HashMap params = new HashMap();
		String idx = httpRequest.getParameter("idx");
		String index = httpRequest.getParameter("index");
		
		params.put("idx",idx);
		ArrayList<HashMap>  list=new ArrayList<HashMap>();
		ArrayList<HashMap> data = mainService.selectQuery("togiSQL.selectAllData",params);
		ArrayList<HashMap> sosokData = mainService.selectQuery("togiSQL.selectSosokData",params);
		ArrayList<HashMap> atcFileList = mainService.selectQuery("togiSQL.selectAtcFileList",params);
		ArrayList<HashMap> deptData = mainService.selectQuery("togiSQL.selectDeptData",params);
		ArrayList<HashMap> sosokList = (ArrayList<HashMap>) sosokData.stream()
			    .filter(sosok -> "N".equals(sosok.get("dm_master_yn")))
			    .collect(Collectors.toList());
		ArrayList<HashMap> masterSosokData = (ArrayList<HashMap>) sosokData.stream()
			    .filter(sosok -> "Y".equals(sosok.get("dm_master_yn")))
			    .collect(Collectors.toList());

		ArrayList<HashMap> dosiApprovalList = mainService.selectQuery("togiSQL.selectDosiApproval",params);
		
		mav.addObject("resultData",data.get(0));
		mav.addObject("sosokData",sosokData);
		mav.addObject("deptData",deptData);
		if (atcFileList == null || atcFileList.isEmpty()) { //첨부파일
		    mav.addObject("atcFileList", new ArrayList<>());
		} else {
			// 첨부파일 목록을 등록일 desc 순으로 정렬
		    Collections.reverse(atcFileList);
		    mav.addObject("atcFileList", atcFileList);
		}
		mav.addObject("masterSosokList", masterSosokData);
		mav.addObject("dosiApprovalList", dosiApprovalList);

		mav.setViewName("content/togi/landDevInfo");
		return mav;
	}
	
	// pnu 에 해당하는 dosi_master 정보 있는지 조회
	@GetMapping(path="/checkPnu")
	public ResponseEntity<?> checkPnu(HttpServletRequest httpRequest) throws Exception {

	    // HttpServletRequest를 사용하여 파라미터 읽기
	    String pnu = httpRequest.getParameter("pnu");

	    HashMap<String, Object> params = new HashMap<>();
	    params.put("pnu", pnu);

	    // pnu 값으로 dm_dosi_no 조회
	    ArrayList<HashMap> pnuData = mainService.selectQuery("togiSQL.selectDosiNoByPnu", params);

	    if (pnuData.isEmpty()) {
	        // pnu에 해당하는 데이터가 없을 경우 404 상태 반환
	        return ResponseEntity.status(HttpStatus.NOT_FOUND).body("토지개발대상토지가 아닙니다.");
	    }

	    // 조회된 dm_dosi_no 반환
	    String dmDosiNo = (String) pnuData.get(0).get("dm_dosi_no");
	    HashMap<String, String> result = new HashMap<>();
	    result.put("dm_dosi_no", dmDosiNo);

	    return ResponseEntity.ok(result);  // 정상적인 경우 dm_dosi_no 반환
	}

	
	@GetMapping(path="/landEdit") //http://localhost:8080/api/get/dbTest
    public ModelAndView landEdit(HttpServletRequest httpRequest, HttpServletResponse response) throws Exception {
		/*******************************/
		//받은 세션 Map으로 전환
		Map<String, Object> sessionMap = CommonUtil.requestSessionToMap(httpRequest);
		/*******************************/
		ModelAndView mav=new ModelAndView();

		HashMap params = new HashMap();
		params.put("LOGIN_JISA", (String)sessionMap.get("jisa"));    //지사정보 param에 싣기
		String idx = httpRequest.getParameter("idx");

		params.put("idx",idx);
		ArrayList<HashMap>  list=new ArrayList<HashMap>();
		ArrayList<HashMap> data = mainService.selectQuery("togiSQL.selectAllData",params);
		ArrayList<HashMap> deptdata = mainService.selectQuery("togiSQL.selectDeptData",params);
		ArrayList<HashMap> daepyodata = mainService.selectQuery("togiSQL.selectDaepyoData",params);
		ArrayList<HashMap> sosokData = mainService.selectQuery("togiSQL.selectSosokData",params);
		ArrayList<HashMap> atcFileList = mainService.selectQuery("togiSQL.selectAtcFileList",params);
		ArrayList<HashMap> dosiInfoData = mainService.selectQuery("togiSQL.selectDosiInfo",params);
		
		mav.addObject("resultData",data);
		mav.addObject("dosiInfoData",dosiInfoData.get(0));
		mav.addObject("deptdata",deptdata);
		mav.addObject("daepyodata",daepyodata);
		mav.addObject("sosokData",sosokData);
		if (atcFileList == null || atcFileList.isEmpty()) { //첨부파일
		    mav.addObject("atcFileList", new ArrayList<>());
		} else {
			// 첨부파일 목록을 등록일 desc 순으로 정렬
		    Collections.reverse(atcFileList);
		    mav.addObject("atcFileList", atcFileList);
		}
		//241006 - 지사정보 추가
		mav.addObject("loginJisa", (String)sessionMap.get("jisa"));
		
		mav.setViewName("content/togi/landEdit");
		return mav;
	}
	
	
	
	
	//점용마스터 엑셀 다운로드
		@PostMapping(path="/menu04_1ExcelDownload")
		public void menu04_1ExcelDownload(HttpServletRequest request, HttpServletResponse response) throws Exception {
		String requestParams = ParameterUtil.getRequestBodyToStr(request);
		JSONObject requestParamsObj=new JSONObject(requestParams);
		log.info("requestParams:"+requestParams);
		
		String jisa = requestParamsObj.has("jisa")?requestParamsObj.getString("jisa"):"";
		String address = requestParamsObj.has("saddr")?requestParamsObj.getString("saddr"):"";
		String complete_yn = requestParamsObj.has("complete_yn")?requestParamsObj.getString("complete_yn"):"";
		String start_date = requestParamsObj.has("start_date")?requestParamsObj.getString("start_date"):"";
		String end_date = requestParamsObj.has("end_date")?requestParamsObj.getString("end_date"):"";
		
		

		

		HashMap params = new HashMap();
		
		params.put("jisa",jisa);
		params.put("address",address);
		params.put("complete_yn", complete_yn);
		params.put("start_date", start_date);
		params.put("end_date", end_date);

//		String[] right_arr= {};
//		right_arr=right_type.split(",");
//		params.put("right_type", right_arr);

		
		
		log.info("params:"+params);
		

		
		
			ArrayList list = new ArrayList();
			ParameterParser parser = new ParameterParser(request);

			
			String str_result = "Y";
			try {

				 list = mainService.selectQuery("togiSQL.selectDosiListExcelData", params);

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

		mav.addObject("addressList",addressList);
		mav.setViewName("content/togi/landReg :: #searchResultPopDiv");
		return mav;
	}

	@PostMapping(path="/getEditTogiJIjukSelect") //http://localhost:8080/api/get/dbTest
	public ModelAndView getEditTogiJIjukSelect(HttpServletRequest httpRequest, HttpServletResponse response) throws Exception {
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

		mav.addObject("addressList",addressList);
		mav.setViewName("content/togi/landEdit :: #searchResultPopDiv");
		return mav;
	}

	// 토지개발 도시개발 등록 및 수정
	@Transactional
	@PostMapping(path="/insertDosiList")
		public void insertDosiList(HttpServletRequest request, HttpServletResponse response) throws Exception {
		String requestParams = ParameterUtil.getRequestBodyToStr(request);
		 log.info("requestParams:"+requestParams);
		 JSONObject requestParamObj=new JSONObject(requestParams);
		 
		 
		 	JSONArray togiArr=new JSONArray(requestParamObj.getString("togiDatas"));
		 	JSONArray deptArr=new JSONArray(requestParamObj.getString("deptDatas"));
		 	
			ParameterParser parser = new ParameterParser(request);
			String str_result = "Y";
			String gubun = null;
			String USER_ID = String.valueOf(request.getSession().getAttribute("userId"));
			String USER_NAME = String.valueOf(request.getSession().getAttribute("userName"));
			String str_DOSINO = "";
			try {
				CommonUtil comm = new CommonUtil();

				//int addDosiNumber = Integer.parseInt(parser.getString("addDosiNumber", ""));
				int addDosiNumber = togiArr.length();
				//int addDosiDeptNumber = Integer.parseInt(parser.getString("addDosiDeptNumber", ""));
				int addDosiDeptNumber = deptArr.length();

				// 수정을 위한 기존 토지,부서 사이즈
//				int deptSize = Integer.parseInt(parser.getString("deptSize", ""));
//				int togiSize = Integer.parseInt(parser.getString("togiSize", ""));

				// System.out.println("addDosiDeptNumber :: " + addDosiDeptNumber);
				// System.out.println("addDosiNumber :: " + addDosiNumber);
				HashMap<String, String> params = new HashMap<String, String>();

//				String fileseq = parser.getString("fileseq", ""); // 파일 seq
//				String filenumber = parser.getString("filenumber", ""); // 파일 수
				String bizNM = requestParamObj.getString("business_nm");
				String strDate = requestParamObj.getString("startDate").replace("-", "");
				String endDate = requestParamObj.getString("endDate").replace("-", "");
				String admOffice = requestParamObj.getString("adm_office");
				String bizOper = requestParamObj.getString("business_oper");
				String dosiNo = requestParamObj.getString("dosiNo");
				gubun = requestParamObj.getString("gubun");
				JSONArray fileArr = new JSONArray(requestParamObj.getString("files"));
				// System.out.println("#########gubun::" + gubun);
				// System.out.println("#########filenumber::" + filenumber);
				// System.out.println("#########fileseq::" + fileseq);

//				params.put("FILESEQ", fileseq);
//				params.put("FILE_SEQ", fileseq);

				// 도시마스터 채번
				

				if ("insert".equals(gubun)) {
					ArrayList DosiList = (ArrayList) mainService.selectQuery("togiSQL.selectDosiNextNo", null);
					String no = (((HashMap) DosiList.get(0)).get("now_dosino").toString());
					String Next_DosiNo = String.valueOf((Integer.parseInt(no) + 1));
					int n_Next_DosiNo = Next_DosiNo.length();

					String add_Zero = "";
					for (int j = 0; j < (6 - n_Next_DosiNo); j++) {
						add_Zero += "0";
					}
					Next_DosiNo = "D_" + add_Zero + Next_DosiNo;

					params.put("DOSI_NO", Next_DosiNo);
					
					str_DOSINO = Next_DosiNo;
				} else if ("modify".equals(gubun)) {
					params.put("dosi_no", dosiNo);
					params.put("DOSI_NO", dosiNo);
					params.put("dosiNo", dosiNo);
				}

				for (int i = 0; i < togiArr.length(); i++) {
					JSONObject obj=new JSONObject(togiArr.get(i).toString());
					String masterYN = obj.getString("master_yn"); // 대표토지 Y,N
					String togiStatus = obj.getString("toji_type").replaceAll("전체", "");
					String jisa = obj.getString("jisa").replaceAll("전체", "");
					String pipeYN = obj.getString("pipe_yn").replaceAll("전체", "");
					String sodiNm = obj.getString("sido_nm").replaceAll("전체", "");
					String gugunNM = obj.getString("sgg_nm").replaceAll("전체", "");
					String dongNm = obj.getString("emd_nm").replaceAll("전체", "");
					String riNm = obj.getString("ri_nm").replaceAll("전체", "");
					String jibun = obj.getString("jibun");
					String pnu = obj.getString("pnu");
					String jimok = obj.getString("jimok_text");
					String jijukArea = obj.getString("jijuk_area");
					String length = obj.getString("length");
					String soyou = obj.getString("souja");
					String addrCode = obj.getString("addrcode");

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

				for (int i = 0; i < deptArr.length(); i++) {
					JSONObject obj=new JSONObject(deptArr.get(i).toString());
					String deptNM = obj.getString("dept_nm");
					String mng = obj.getString("manager");
					String contactNum = obj.getString("contact_num");

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

				//파일첨부는 별도로 처리 ljs
				// 첨부파일 관련 처리
				if (gubun.equals("insert")) {
					for (int i = 0; i < fileArr.length(); i++)  {
						String file_name = fileArr.getString(i);
						
						HashMap<String, Object> filesMap = new HashMap<>();
						String chageFileName = CommonUtil.filenameAutoChange(file_name); // 파일명 교체
						
						filesMap.put("dosiNo", str_DOSINO);
						filesMap.put("seq", String.format("%06d", i));
						filesMap.put("fseq", i);
						filesMap.put("fname", file_name);
						
						String tempPath = GC.getTogiFileTempDir(); // 설정파일로 뺀다.
						String dataPath = GC.getTogiFileDataDir() + "/" + str_DOSINO; // 설정파일로 뺀다.
						filesMap.put("fpath", dataPath + "/" + chageFileName);
						
						CommonUtil.moveFile(file_name, tempPath, dataPath, chageFileName);
						
						mainService.InsertQuery("togiSQL.insertDosiUploadData", filesMap);
						
					}
				}
				if (gubun.equals("modify")) {
//					log.info("param:" + params);
					// 기존 등록된 파일리스트 삭제 - 이 로직 필요 없어짐.
					// 이제 새파일을 구분할수 있는 플래그도 값이 넘어옴.
					//mainService.DeleteQuery("goverSQL.deleteBeforeGoverAtcFileList", params);
					
					// seq 가져오기
					int nseq = (int) mainService.selectCountQuery("togiSQL.getTogiAtcFileSeq", params);
					log.info("nseq:" + nseq);
					
					// fileseq 가져오기
					for (int i = 0; i < fileArr.length(); i++) {
						
						JSONObject fobj = new JSONObject(fileArr.get(i).toString());
						
						//새파일일 경우에만 등록 로직이 이루어짐
						if("Y".equals(fobj.get("newFileCheckYn"))) {
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
							
							HashMap<String, Object> filesMap = new HashMap<>();

							filesMap.put("dosiNo", dosiNo);
							
							filesMap.put("fname", fileName);
							
							String chageFileName = CommonUtil.filenameAutoChange(fileName); 
							String tempPath = GC.getTogiFileTempDir(); // 설정파일로 뺀다.
							String dataPath = GC.getTogiFileDataDir() + "/" + str_DOSINO; // 설정파일로 뺀다.
							
							if (!flag) {
								filesMap.put("fpath", filePath);
								filesMap.put("seq", fobj.getString("seq"));
								filesMap.put("fseq", fobj.getString("file_seq"));
							} else {
								filesMap.put("fpath", dataPath + chageFileName);
								filesMap.put("seq", String.format("%06d", i));
								filesMap.put("fseq", nseq + i);
							}
							
							CommonUtil.moveFile(fileName, tempPath, dataPath, chageFileName);
							
							log.info("filesMap:" + filesMap);
							mainService.InsertQuery("togiSQL.insertDosiUploadData", filesMap);
						} else if ("D".equals(fobj.get("newFileCheckYn"))) {
							HashMap<String, Object> filesMap = new HashMap<>();
							String filePath = fobj.getString("fpath");
							String fileName = fobj.getString("fname");
							String fileIdx = fobj.getString("idx");
							filesMap.put("dosi_no", dosiNo);
							filesMap.put("idx", fileIdx);
							mainService.InsertQuery("togiSQL.dosiDeleteFile", filesMap);
							
							
						}
					}
				}

				//mainService.UpdateQuery("togiSQL.updateDosiSeqFile", params);
				

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

	@PostMapping(path="/DosiDelete")
	public HashMap DosiDelete(HttpServletRequest request, HttpServletResponse response) throws Exception {
		String requestParams = ParameterUtil.getRequestBodyToStr(request);
		log.info("requestParams:"+requestParams);
		JSONObject requestParamObj=new JSONObject(requestParams);
		HashMap<String, Object> resultMap = new HashMap<>();
		String dosiNo = requestParamObj.getString("dosiNo");
		HashMap params = new HashMap();
		params.put("dosi_no", dosiNo);

		int result = (int)mainService.UpdateQuery("togiSQL.deleteDosiMaster", params);
		result += (int)mainService.UpdateQuery("togiSQL.deleteDosiInfo", params);
		result += (int)mainService.UpdateQuery("togiSQL.deleteDosiDept", params);
		result += (int)mainService.UpdateQuery("togiSQL.deleteDosiFile", params);

		HashMap map = new HashMap();
		map.put("dosiNo", dosiNo);

		JSONObject jo = new JSONObject(map);
		resultMap.put("result", result);
		return resultMap;

	}
	
	@RequestMapping(value = "/fileUpload/post") // ajax에서 호출하는 부분
	@ResponseBody
	public HashMap upload(MultipartHttpServletRequest multipartRequest) { // Multipart로 받는다.

		Iterator<String> itr = multipartRequest.getFileNames();

		String filePath = GC.getTogiFileTempDir(); // 설정파일로 뺀다.

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
			
			int lastIndex = originalFilename.lastIndexOf(".");
			
			String justFileName = originalFilename.substring(0, lastIndex);	//파일명
			String justFileType = originalFilename.substring(lastIndex +1); //확장자명
			
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

		}
		resultmap.put("resultCode", resultCode);
		resultmap.put("resultData", resultdata);
		resultmap.put("resultMessage", resultMessage);
		JSONObject obj = new JSONObject(resultmap);

		return resultmap;
	}
	
	// 토지 개발정보 > 전자결재 문서 열람 추가
	@PostMapping("/insertDosiDoc")
	public HashMap insertDosiDoc(HttpServletRequest request, HttpServletResponse response) throws Exception {
		// JSON 데이터를 문자열로 읽음
	    String requestParams = ParameterUtil.getRequestBodyToStr(request);
	    HashMap<String, Object> resultMap = new HashMap<String, Object>();
	    HashMap<String, Object> param = new HashMap<String, Object>();
	    
	    // 문자열을 JSON 객체로 변환
	    JSONObject requestParamObj = new JSONObject(requestParams);
	    Object seq = mainService.selectCountQuery("togiSQL.selectDosiApprovalNextSeq",param);
		int doc_seq = (int)seq;
		String no = "";
		
	    // JSON 객체에서 직접 값 추출
	    String doc_title = requestParamObj.optString("doc_title", "");
	    String dockey = requestParamObj.optString("dockey", "");
	    String doc_date = requestParamObj.optString("doc_date", "");
	    String doc_url = requestParamObj.optString("doc_url", "");
	    String doc_no = requestParamObj.optString("doc_no", "");
	    
	    
	    param.put("dosi_no", doc_no);
	    param.put("doc_seq", doc_seq);
	    param.put("doc_title", doc_title);
	    param.put("dockey", dockey);
	    param.put("doc_date", doc_date);
	    param.put("doc_url", doc_url);
	    
	    int result = (int) mainService.InsertQuery("togiSQL.insertDosiApproval", param);
	    
	    if (result > 0) {
	    	param.put("idx", doc_no);
	    	ArrayList<HashMap> dosiApprovalList = mainService.selectQuery("togiSQL.selectDosiApproval",param);
	    	resultMap.put("approvalList", dosiApprovalList);
	    }
	    resultMap.put("result", result);
		JSONObject obj = new JSONObject(resultMap);
		return resultMap;
	}
	
	// 토지 개발정보 > 전자결재 문서 열람 삭제
	@PostMapping("/deleteDosiDoc")
	public HashMap deleteDosiDoc(HttpServletRequest request, HttpServletResponse response) throws Exception {
		// JSON 데이터를 문자열로 읽음
	    String requestParams = ParameterUtil.getRequestBodyToStr(request);
	    HashMap<String, Object> resultMap = new HashMap<String, Object>();
	    HashMap<String, Object> param = new HashMap<String, Object>();
	    
	    // 문자열을 JSON 객체로 변환
	    JSONObject requestParamObj = new JSONObject(requestParams);
	    
	    JSONArray delArr = new JSONArray(requestParamObj.getString("delList"));
	    int result = 0;
	    for(int i = 0; i < delArr.length(); i++) {
	    	JSONObject delObj = new JSONObject(delArr.getString(i));
	    	param.put("dosi_no", delObj.getString("doc_no"));
	    	param.put("dosi_seq", delObj.getString("doc_seq"));
	    	
	    	result += (int)mainService.UpdateQuery("togiSQL.updateDosiApproval", param);
	    }
	    resultMap.put("result", result);
		return resultMap;
	}
	
	// 완료처리 / 취소처리
	@PostMapping("/complete")
	public HashMap completeTogiInfo(HttpServletRequest request, HttpServletResponse response) throws Exception {
		HashMap<String, Object> resultMap = new HashMap<String, Object>();
		String requestParams = ParameterUtil.getRequestBodyToStr(request);
	    HashMap<String, Object> param = new HashMap<String, Object>();
	    
	    // 문자열을 JSON 객체로 변환
	    JSONObject requestParamObj = new JSONObject(requestParams);
	    String dosi_no = requestParamObj.getString("dosiNo");
	    param.put("di_dosi_no", dosi_no);
	    ArrayList<HashMap> complete = mainService.selectQuery("togiSQL.selectDosiCompleteYn", param);
	    String selectedYn = (String) complete.get(0).get("di_complete_yn");
	    String completeYn = "";
	    String compleStr = "";
	    String compleMsg = "";
	    if ("N".equals(selectedYn)) {
	    	completeYn = "Y";
	    	compleStr = "완료처리";
	    	compleMsg = "완료";
	    } else {
	    	completeYn = "N";
	    	compleStr = "취소처리";
	    	compleMsg = "취소";
	    	param.put("di_complete_date", completeYn);
	    }
	    param.put("di_complete_yn", completeYn);
	    
	    int result = (int) mainService.UpdateQuery("togiSQL.updateDosiComplete", param);
	    resultMap.put("complete", completeYn);
	    resultMap.put("completeStr", compleStr);
	    resultMap.put("completeMsg", compleMsg);
	    resultMap.put("result", result);
		return resultMap;
	}
	
	// 완료처리 / 취소처리
		@PostMapping("/delete")
		public HashMap deleteTogiInfo(HttpServletRequest request, HttpServletResponse response) throws Exception {
			HashMap<String, Object> resultMap = new HashMap<String, Object>();
			String requestParams = ParameterUtil.getRequestBodyToStr(request);
		    HashMap<String, Object> param = new HashMap<String, Object>();
		    
		    // 문자열을 JSON 객체로 변환
		    JSONObject requestParamObj = new JSONObject(requestParams);
		    String dosi_no = requestParamObj.getString("dosiNo");
		    String file_seq = requestParamObj.getString("fileSeq");
		    param.put("dosi_no", dosi_no);
		    if (!"".equals(file_seq) || file_seq != null) {
		    	param.put("file_seq", file_seq);
		    }
		    int result = (int) mainService.DeleteQuery("togiSQL.deleteDosiFile", param);
		    result += (int) mainService.DeleteQuery("togiSQL.deleteDosiDept", param);
		    result += (int) mainService.DeleteQuery("togiSQL.deleteDosiInfo", param);
		    result += (int) mainService.DeleteQuery("togiSQL.deleteDosiMaster", param);
		    
		    resultMap.put("result", result);
			return resultMap;
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
				String filePath = GC.getTogiFileDataDir() + "/" + jsonObject.get("gover_no"); // 설정파일로 뺀다.
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
