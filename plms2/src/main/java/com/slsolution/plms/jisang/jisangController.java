package com.slsolution.plms.jisang;

import java.io.File;
import java.util.*;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.scheduling.annotation.EnableAsync;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.ui.Model;
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
import com.slsolution.plms.ParameterUtil;
import com.slsolution.plms.config.GlobalConfig;
import com.slsolution.plms.json.JSONArray;
import com.slsolution.plms.json.JSONObject;

import io.swagger.v3.oas.annotations.parameters.RequestBody;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@EnableAsync
@RequiredArgsConstructor
@RestController
@RequestMapping("/jisang")
@CrossOrigin(origins="*",allowedHeaders="*")
public class jisangController {
	
	@Autowired
	private MainService mainService;
	
	 @Autowired
	 private GlobalConfig GC;
	
	 
	 @Transactional
	@RequestMapping(value="/api/Save", method = {RequestMethod.GET, RequestMethod.POST}) //http://localhost:8080/api/get/dbTest
    public void Save(HttpServletRequest httpRequest, HttpServletResponse response) throws Exception {
        
		//일반웹형식
//		Properties requestParams = CommonUtil.convertToProperties(httpRequest);
//        log.info("requestParams:"+requestParams);
        
//        //json으로 넘어올때
        String requestParams = ParameterUtil.getRequestBodyToStr(httpRequest);
        log.info("requestParams:"+requestParams);
        
        
        
        //json으로 넘어온 정보를 파싱한다 
        //다른거는 그데로 map 에 넣고 
        //파일일 경우 는 이름이 같음으로 배열에 넣어서 배열을 map에 추가 한다.
        //결과 
//         requestMap:{
//		        	special_cont=, landRightsRegistration_attachFile=on, mchuideuk_date=, mjasan_no=, mjibun=
//		        	, mdosi_plan=, mpyeonib_area=, mdeunggi_no=, mpnu=, mdeunggi_date=, mcomple_yn=, mloacation=
//		        	, mpermit_yn=
//		        	, attachFiles=[
//        					{attachFile=01_DOPCO_D001_지상권관리시스템_UIUX 화면설계서_20240816_이설반영.pptx}
//        					,{attachFile=GlobalSign_META_Upload_Guide.pdf}
//        			]
//		        	, mdeunggiso=
//		 }
       // JSONArray requestJsonArray=new JSONArray(requestParams);
      //  log.info("requestJsonArray:"+requestJsonArray);
        JSONObject requestJsonObj=new JSONObject(requestParams);
        
        HashMap<String,Object> requestMap= new HashMap<>();
        ArrayList attachArr=new ArrayList();
//        ArrayList soujaJibunArr=new ArrayList(); //소유자지분정보
//        ArrayList soujaNameArr=new ArrayList(); //소유자명
//        ArrayList soujaAddrArr=new ArrayList(); //소유자주소
//        ArrayList soujaCont1Arr=new ArrayList(); //소유자연락처1
//        ArrayList soujaCont2Arr=new ArrayList(); //소유자연락처2
//        for(int i=0;i<requestJsonArray.length();i++) {
//        	JSONObject obj=new JSONObject(requestJsonArray.get(i).toString());
//        	log.info("name:"+obj.getString("name")+",value:"+obj.getString("value"));
//        	if (obj.getString("name").equals("attachFile")) {
//        		HashMap<String,String> ufile= new HashMap<>();
//        		ufile.put(obj.getString("name"), obj.getString("value"));
//        		attachArr.add(ufile);
//        	}
//        	else if (obj.getString("name").equals("soujaJibun") && !obj.getString("value").equals("")) {
//        		HashMap<String,String> tmap= new HashMap<>();
//        		tmap.put(obj.getString("name"), obj.getString("value"));
//        		soujaJibunArr.add(tmap);
//        	}
//        	else if (obj.getString("name").equals("soujaName") && !obj.getString("value").equals("")) {
//        		HashMap<String,String> tmap= new HashMap<>();
//        		tmap.put(obj.getString("name"), obj.getString("value"));
//        		soujaNameArr.add(tmap);
//        	}
//        	else if (obj.getString("name").equals("soujaAddress") ) {
//        		HashMap<String,String> tmap= new HashMap<>();
//        		tmap.put(obj.getString("name"), obj.getString("value"));
//        		soujaAddrArr.add(tmap);
//        	}
//        	else if (obj.getString("name").equals("soujaContact1") && !obj.getString("value").equals("")) {
//        		HashMap<String,String> tmap= new HashMap<>();
//        		tmap.put(obj.getString("name"), obj.getString("value"));
//        		soujaCont1Arr.add(tmap);
//        	}
//        	else if (obj.getString("name").equals("soujaContact2") && !obj.getString("value").equals("")) {
//        		HashMap<String,String> tmap= new HashMap<>();
//        		tmap.put(obj.getString("name"), obj.getString("value"));
//        		soujaCont2Arr.add(tmap);
//        	}
//        	else requestMap.put(obj.getString("name"), obj.getString("value"));
//        	
//        	
//        	
//        	
//        	
//        	
//        	
//        	 
//        	
//        }
        	requestMap.put("attachFiles",attachArr);
        	requestMap.put("soujaInfo",requestJsonObj.getJSONArray("soujaInfo"));
//        requestMap.put("soujaNames",soujaNameArr);
//        requestMap.put("soujaAddrs",soujaAddrArr);
//        requestMap.put("soujaCont1s",soujaCont2Arr);
//        requestMap.put("soujaCont2s",soujaCont2Arr);
//        
//        log.info("soujaJibuns:"+soujaJibunArr);
//        log.info("soujaAddrs:"+soujaAddrArr);
//        log.info("requestMap:"+requestMap);
//        
//        
//        log.info("soujaJibuns count:"+soujaJibunArr.size());
        	Object seq= mainService.selectCountQuery("jisangSQL.selectJisangMasterNextval", requestMap);
    		int nseq=(int)seq;
    		requestMap.put("seq","J_"+String.format("%06d",seq));
    		requestMap.put("sido_nm", requestJsonObj.get("sido_nm"));
    		requestMap.put("sgg_nm", requestJsonObj.get("sgg_nm"));
    		requestMap.put("emd_nm", requestJsonObj.get("emd_nm"));
    		requestMap.put("ri_nm", requestJsonObj.get("ri_nm"));
    		requestMap.put("jibun", requestJsonObj.get("mjibun"));
    		requestMap.put("jisa", requestJsonObj.get("jisa"));
    		requestMap.put("chuideuk_date", requestJsonObj.get("mchuideuk_date"));
    		requestMap.put("jijuk_area", requestJsonObj.get("jijuk_area"));
    		requestMap.put("pipe_name", requestJsonObj.get("pipe_name"));
    		requestMap.put("sun_gubun", requestJsonObj.get("sun_gubun"));
    		requestMap.put("yongdo", requestJsonObj.get("youngdo"));
    		requestMap.put("dosiplan", requestJsonObj.get("mdosi_plan"));
    		requestMap.put("comple_yn", requestJsonObj.get("mcomple_yn"));
    		requestMap.put("pyeonib_area", requestJsonObj.get("mpyeonib_area"));
    		requestMap.put("deunggi_date", requestJsonObj.get("mdeunggi_date"));
    		requestMap.put("deunggi_no", requestJsonObj.get("mdeunggi_no"));
    		requestMap.put("deunggiso", requestJsonObj.get("mdeunggiso"));
    		requestMap.put("jasan_no", requestJsonObj.get("mjasan_no"));
    		requestMap.put("gover_own_yn", requestJsonObj.get("gover_own_yn"));
    		requestMap.put("pnu", requestJsonObj.get("mpnu"));
    		
    		
    		log.info("requestMap:"+requestMap);
    		mainService.InsertQuery("jisangSQL.insertJisangData", requestMap);
    		
    		
    		//소유자정보등록
    		JSONArray soujaJsonArray=requestJsonObj.getJSONArray("soujaInfo");
    		log.info("soujaJsonArray:"+soujaJsonArray);
    		for(int i=0;i<soujaJsonArray.length();i++) {
    			JSONObject obj=new JSONObject(soujaJsonArray.get(i).toString());
    			 HashMap<String, Object> soujaMap= new HashMap<>();
    			log.info("obj:"+obj);
    			soujaMap=CommonUtil.JsonArraytoMap(obj);
    			
    			soujaMap.put("seq","J_"+String.format("%06d",seq));
    			log.info("soujaMap:"+soujaMap);
    			mainService.InsertQuery("jisangSQL.insertJisangSoujaData", soujaMap);
    		}
    		
    		
        
       
        
    		
    		HashMap<String,Object> resultParam= new HashMap<>();
    		
    		resultParam.put("nseq",nseq);
    		
        // log.info("attachFile:"+httpRequest.getParameter("attachFile"));
//        List<TestDTO> list = new ArrayList<TestDTO>();
//        list = dbService.getList();
		
        HashMap<String,Object> resultmap=new HashMap();
        resultmap.put("resultCode","0000");
        resultmap.put("params", requestJsonObj);
        resultmap.put("resultData",resultParam);
        resultmap.put("resultMessage","success");
        JSONObject obj =new JSONObject(resultmap);
//        System.out.println(obj);
       
      //log.info("jo:"+jo);
      			response.setCharacterEncoding("UTF-8");
      			response.setHeader("Access-Control-Allow-Origin", "*");
      			response.setHeader("Cache-Control", "no-cache");
      			response.resetBuffer();
      			response.setContentType("application/json");
      			//response.getOutputStream().write(jo);
      			response.getWriter().print(obj);
      			response.getWriter().flush();
       // return new ModelAndView("dbTest", "list", list);
    }
	
	
	
	@GetMapping(path="/api/list") //http://localhost:8080/api/get/dbTest
    public void apiList(HttpServletRequest httpRequest, HttpServletResponse response) throws Exception {
        
//        List<TestDTO> list = new ArrayList<TestDTO>();
//        list = dbService.getList();
		HashMap params = new HashMap();
		ArrayList<HashMap>  list=new ArrayList<HashMap>();
		//List<CountryModel> list = masterDataBaseService.getCountry();
		//ArrayList<HashMap> list = sqlSession.selectList("selectAllList",params);
				
		list=mainService.selectQuery("jisangSQL.selectAllList", params);
        log.info("jisang /list:"+list.toString());
        //nhServ1.test();
        //ts.Test1();
        HashMap<String,Object> resultmap=new HashMap();
        resultmap.put("resultCode","0000");
        resultmap.put("resultData",list);
        resultmap.put("resultMessage","success");
        JSONObject obj =new JSONObject(resultmap);
//        System.out.println(obj);
       
      //log.info("jo:"+jo);
      			response.setCharacterEncoding("UTF-8");
      			response.setHeader("Access-Control-Allow-Origin", "*");
      			response.setHeader("Cache-Control", "no-cache");
      			response.resetBuffer();
      			response.setContentType("application/json");
      			//response.getOutputStream().write(jo);
      			response.getWriter().print(obj);
      			response.getWriter().flush();
       // return new ModelAndView("dbTest", "list", list);
    }
	
	
	@GetMapping(path="/view/list") //http://localhost:8080/api/get/dbTest
    public ModelAndView viewList(HttpServletRequest httpRequest, HttpServletResponse response) throws Exception {
		ModelAndView mav=new ModelAndView();
		
		
//        List<TestDTO> list = new ArrayList<TestDTO>();
//        list = dbService.getList();
		HashMap params = new HashMap();
		ArrayList<HashMap>  list=new ArrayList<HashMap>();
		//List<CountryModel> list = masterDataBaseService.getCountry();
		//ArrayList<HashMap> list = sqlSession.selectList("selectAllList",params);
				
		list=mainService.selectQuery("jisangSQL.selectAllList", params);
        log.info("jisang /list:"+list.toString());
        //nhServ1.test();
        //ts.Test1();
//        HashMap<String,Object> resultmap=new HashMap();
//        resultmap.put("resultCode","0000");
//        resultmap.put("resultData",list);
//        resultmap.put("resultMessage","success");
//        JSONObject obj =new JSONObject(resultmap);
////        System.out.println(obj);
//       
//      //log.info("jo:"+jo);
//      			response.setCharacterEncoding("UTF-8");
//      			response.setHeader("Access-Control-Allow-Origin", "*");
//      			response.setHeader("Cache-Control", "no-cache");
//      			response.resetBuffer();
//      			response.setContentType("application/json");
//      			//response.getOutputStream().write(jo);
//      			response.getWriter().print(obj);
//      			response.getWriter().flush();
//       // return new ModelAndView("dbTest", "list", list);
        
      			mav.addObject("resultList",list);
      			mav.setViewName("content/jisang/list");
      			return mav;
    }

	@GetMapping(path="/write") //http://localhost:8080/api/get/dbTest
    public ModelAndView viewWrite(HttpServletRequest httpRequest, HttpServletResponse response) throws Exception {
		ModelAndView mav=new ModelAndView();
		
		
//        List<TestDTO> list = new ArrayList<TestDTO>();
//        list = dbService.getList();
		HashMap params = new HashMap();
		ArrayList<HashMap>  list=new ArrayList<HashMap>();
		
		//List<CountryModel> list = masterDataBaseService.getCountry();
		ArrayList<HashMap> jisalist = mainService.selectQuery("commonSQL.selectAllJisaList",params);
		ArrayList<HashMap> yongdolist = mainService.selectQuery("commonSQL.selectYongdoList",params);
		ArrayList<HashMap> jimoklist = mainService.selectQuery("commonSQL.selectJimokList",params);
//		list=mainService.selectQuery("jisangSQL.selectAllList", params);
//        log.info("jisang /list:"+list.toString());
        //nhServ1.test();
        //ts.Test1();
//        HashMap<String,Object> resultmap=new HashMap();
//        resultmap.put("resultCode","0000");
//        resultmap.put("resultData",list);
//        resultmap.put("resultMessage","success");
//        JSONObject obj =new JSONObject(resultmap);
////        System.out.println(obj);
//       
//      //log.info("jo:"+jo);
//      			response.setCharacterEncoding("UTF-8");
//      			response.setHeader("Access-Control-Allow-Origin", "*");
//      			response.setHeader("Cache-Control", "no-cache");
//      			response.resetBuffer();
//      			response.setContentType("application/json");
//      			//response.getOutputStream().write(jo);
//      			response.getWriter().print(obj);
//      			response.getWriter().flush();
//       // return new ModelAndView("dbTest", "list", list);
        
      			mav.addObject("resultJisaList",jisalist);
      			mav.addObject("resultYongdoList",yongdolist);
      			mav.addObject("resultJimokList",jimoklist);
      			log.info("jisalist:"+jisalist);
      			mav.setViewName("content/jisang/write");
      			return mav;
    }
	
	@GetMapping(path="/view/view") //http://localhost:8080/api/get/dbTest
    public ModelAndView viewView(HttpServletRequest httpRequest, HttpServletResponse response) throws Exception {
		ModelAndView mav=new ModelAndView();
		
		
//        List<TestDTO> list = new ArrayList<TestDTO>();
//        list = dbService.getList();
		HashMap params = new HashMap();
		ArrayList<HashMap>  list=new ArrayList<HashMap>();
		//List<CountryModel> list = masterDataBaseService.getCountry();
		//ArrayList<HashMap> list = sqlSession.selectList("selectAllList",params);
				
//		list=mainService.selectQuery("jisangSQL.selectAllList", params);
//        log.info("jisang /list:"+list.toString());
        //nhServ1.test();
        //ts.Test1();
//        HashMap<String,Object> resultmap=new HashMap();
//        resultmap.put("resultCode","0000");
//        resultmap.put("resultData",list);
//        resultmap.put("resultMessage","success");
//        JSONObject obj =new JSONObject(resultmap);
////        System.out.println(obj);
//       
//      //log.info("jo:"+jo);
//      			response.setCharacterEncoding("UTF-8");
//      			response.setHeader("Access-Control-Allow-Origin", "*");
//      			response.setHeader("Cache-Control", "no-cache");
//      			response.resetBuffer();
//      			response.setContentType("application/json");
//      			//response.getOutputStream().write(jo);
//      			response.getWriter().print(obj);
//      			response.getWriter().flush();
//       // return new ModelAndView("dbTest", "list", list);
        
//      			mav.addObject("resultList",list);
      			mav.setViewName("content/jisang/view");
      			return mav;
    }
	
	
	//groundDetail  상세 조회
	@GetMapping(path="/groundDetail") //http://localhost:8080/api/get/dbTest
    public ModelAndView groundDetail(HttpServletRequest httpRequest, HttpServletResponse response) throws Exception {
//		response.setHeader("X-Frame-Options", "SAMEORIGIN");
//		response.setHeader("Content-Security-Policy", " frame-ancestors 'self'");
		ModelAndView mav=new ModelAndView();
		
		
//        List<TestDTO> list = new ArrayList<TestDTO>();
//        list = dbService.getList();
		HashMap params = new HashMap();
		ArrayList<HashMap>  list=new ArrayList<HashMap>();
		
		String idx = httpRequest.getParameter("idx");
		String index = httpRequest.getParameter("index");
		
		params.put("idx",idx);
		params.put("manage_no",idx);
		params.put("index",index);
		log.info("params:"+params);
		
		ArrayList<HashMap> data = mainService.selectQuery("jisangSQL.selectAllData",params);
		ArrayList<HashMap> soujaList = mainService.selectQuery("jisangSQL.selectSoyujaData",params);
		ArrayList<HashMap> atcFileList = mainService.selectQuery("jisangSQL.selectAtcFileList",params);
		
		ArrayList<HashMap> jisangPermitList = mainService.selectQuery("jisangSQL.selectPermitList",params);
		ArrayList<HashMap> jisangModifyList = mainService.selectQuery("jisangSQL.selectModifyList",params);
		ArrayList<HashMap> jisangMergeList = mainService.selectQuery("jisangSQL.selectMergeList",params);
		params.put("pnu", data.get(0).get("jm_pnu"));
		ArrayList<HashMap> jisangIssueList = mainService.selectQuery("jisangSQL.selectIssueList",params);
		log.info("jisangIssueList size:"+jisangIssueList.size());
		if (jisangIssueList.size()>0) {
			log.info("1:"+jisangIssueList.get(0).get("pi_code_depth1"));
			log.info("2:"+jisangIssueList.get(0).get("pi_code_depth2"));
			log.info("3:"+jisangIssueList.get(0).get("pi_code_depth3"));
			params.put("issueManualCode1", jisangIssueList.get(0).get("pi_code_depth1"));
			params.put("issueManualCode2", jisangIssueList.get(0).get("pi_code_depth2"));
			params.put("issueManualCode3", jisangIssueList.get(0).get("pi_code_depth3"));
		}
		ArrayList<HashMap> jisangPnuAtcFileList = mainService.selectQuery("jisangSQL.selectPnuAtcFileList",params);
		ArrayList<HashMap> jisangIssueHistoryList = mainService.selectQuery("jisangSQL.selectIssueHistoryList",params);
		ArrayList<HashMap> jisangIssueCodeAtcFileList = mainService.selectQuery("jisangSQL.selectIssueCodeAtcFileList",params);
		ArrayList<HashMap> jisangMemoList = mainService.selectQuery("commonSQL.selectMemoList",params);
		log.info("params:"+params);
		log.info("data:"+data.get(0));
		log.info("jm_pipe_yn:"+data.get(0).get("jm_pipe_yn"));
		log.info("jm_youngdo:"+data.get(0).get("jm_youngdo"));
		log.info("jm_pipe_name:"+data.get(0).get("jm_pipe_name"));
		log.info("jm_jijuk_area:"+data.get(0).get("jm_jijuk_area"));
		log.info("jisangPermitList:"+jisangPermitList);
		log.info("jisangIssueList:"+jisangIssueList);
		log.info("souja count:"+soujaList.size());
		log.info("soujaList:"+soujaList);
		log.info("atcFileList:"+atcFileList);
		log.info("jisangPnuAtcFileList:"+jisangPnuAtcFileList);
		log.info("jisangIssueHistoryList:"+jisangIssueHistoryList);
		log.info("jisangMemoList:"+jisangMemoList);
		log.info("jisangIssueCodeAtcFileList:"+jisangIssueCodeAtcFileList);
		
      			mav.addObject("resultData",data.get(0));
      			mav.addObject("soujaList",soujaList);
      			mav.addObject("jisangPermitList",jisangPermitList);
      			mav.addObject("atcFileList",atcFileList);
      			mav.addObject("jisangModifyList",jisangModifyList);
      			mav.addObject("jisangMergeList",jisangMergeList);
      			
      			mav.addObject("jisangPnuAtcFileList",jisangPnuAtcFileList);
      			mav.addObject("jisangIssueList",jisangIssueList);
      			mav.addObject("jisangIssueHistoryList",jisangIssueHistoryList);
      			mav.addObject("memoList",jisangMemoList);
      			mav.addObject("jisangIssueCodeAtcFileList",jisangIssueCodeAtcFileList);
      			mav.setViewName("content/jisang/groundDetail");
      			return mav;
    }
	
	
	//아이디를 기준으로 해당 영역만 리플래쉬 되도록 하는 로직
	@PostMapping(path="/getAtcFileData") //http://localhost:8080/api/get/dbTest
    public ModelAndView getAtcFileData(HttpServletRequest httpRequest, HttpServletResponse response) throws Exception {
		ModelAndView mav=new ModelAndView();
		HashMap params = new HashMap();
		ArrayList<HashMap>  list=new ArrayList<HashMap>();
		
		String idx = httpRequest.getParameter("manage_no");
		String pnu = httpRequest.getParameter("pnu");
		
		params.put("idx",idx);
		params.put("pnu",pnu);
		log.info("params:"+params);
		ArrayList<HashMap> jisangPnuAtcFileList = mainService.selectQuery("jisangSQL.selectPnuAtcFileList",params);
		mav.addObject("jisangPnuAtcFileList",jisangPnuAtcFileList);
		mav.setViewName("content/jisang/groundDetail :: #pnuAtcFilesDiv");
		return mav;
	}
	
	
	
	
	
	
	
//	@PostMapping("/getAtcFileData")
//    public String getAtcFileData(Model model, HttpServletRequest httpRequest) {
//		
////		ArrayList<HashMap> jisangIssueList = mainService.selectQuery("jisangSQL.selectIssueList",params);
//      model.addAttribute("Data", "");
//      return "statistics/yearchart :: #tableStat";
//    }
	
	
	
	//groundDetail  상세 조회
		@GetMapping(path="/menu02_1") //http://localhost:8080/api/get/dbTest
	    public ModelAndView menu02_1(HttpServletRequest httpRequest, HttpServletResponse response) throws Exception {
//			response.setHeader("X-Frame-Options", "SAMEORIGIN");
//			response.setHeader("Content-Security-Policy", " frame-ancestors 'self'");
			HashMap params = new HashMap();
			ArrayList<HashMap>  list=new ArrayList<HashMap>();
			ArrayList<HashMap> jisalist = mainService.selectQuery("commonSQL.selectAllJisaList",params);
			ArrayList<HashMap> jimoklist = mainService.selectQuery("commonSQL.selectJimokList",params);
			ArrayList<HashMap> sidolist = mainService.selectQuery("commonSQL.getSidoMaster",params);
			ModelAndView mav=new ModelAndView();
			mav.setViewName("content/jisang/menu02_1");

			mav.addObject("jisaList",jisalist);
			mav.addObject("resultJimokList",jimoklist);
			mav.addObject("sidoList",sidolist);
			return mav;
		}
		
		@GetMapping(path="/menu02_2") //http://localhost:8080/api/get/dbTest
	    public ModelAndView menu02_2(HttpServletRequest httpRequest, HttpServletResponse response) throws Exception {
//			response.setHeader("X-Frame-Options", "SAMEORIGIN");
//			response.setHeader("Content-Security-Policy", " frame-ancestors 'self'");
			HashMap params = new HashMap();
			ArrayList<HashMap>  list=new ArrayList<HashMap>();
			ArrayList<HashMap> jisalist = mainService.selectQuery("commonSQL.selectAllJisaList",params);
			ArrayList<HashMap> sidolist = mainService.selectQuery("commonSQL.getSidoMaster",params);
			ModelAndView mav=new ModelAndView();
			mav.setViewName("content/jisang/menu02_2");

			mav.addObject("jisaList",jisalist);
			mav.addObject("sidoList",sidolist);

			return mav;
		}
		@GetMapping(path="/menu02_3") //http://localhost:8080/api/get/dbTest
	    public ModelAndView menu02_3(HttpServletRequest httpRequest, HttpServletResponse response) throws Exception {
//			response.setHeader("X-Frame-Options", "SAMEORIGIN");
//			response.setHeader("Content-Security-Policy", " frame-ancestors 'self'");
			ModelAndView mav=new ModelAndView();
			mav.setViewName("content/jisang/menu02_3");
			return mav;
		}
		@GetMapping(path="/menu02_4") //http://localhost:8080/api/get/dbTest
	    public ModelAndView menu02_4(HttpServletRequest httpRequest, HttpServletResponse response) throws Exception {
//			response.setHeader("X-Frame-Options", "SAMEORIGIN");
//			response.setHeader("Content-Security-Policy", " frame-ancestors 'self'");
			ModelAndView mav=new ModelAndView();
			mav.setViewName("content/jisang/menu02_4");
			return mav;
		}
		@GetMapping(path="/menu02_5") //http://localhost:8080/api/get/dbTest
	    public ModelAndView menu02_5(HttpServletRequest httpRequest, HttpServletResponse response) throws Exception {
//			response.setHeader("X-Frame-Options", "SAMEORIGIN");
//			response.setHeader("Content-Security-Policy", " frame-ancestors 'self'");
			ModelAndView mav=new ModelAndView();
			mav.setViewName("content/jisang/menu02_5");
			return mav;
		}
		@GetMapping(path="/landRightsRegistration") //http://localhost:8080/api/get/dbTest
	    public ModelAndView landRightsRegistration(HttpServletRequest httpRequest, HttpServletResponse response) throws Exception {
//			response.setHeader("X-Frame-Options", "SAMEORIGIN");
//			response.setHeader("Content-Security-Policy", " frame-ancestors 'self'");
			HashMap params = new HashMap();
			ArrayList<HashMap>  list=new ArrayList<HashMap>();
			ArrayList<HashMap> jisalist = mainService.selectQuery("commonSQL.selectAllJisaList",params);
			ArrayList<HashMap> jimoklist = mainService.selectQuery("commonSQL.selectJimokList",params);
			ArrayList<HashMap> sidolist = mainService.selectQuery("commonSQL.getSidoMaster",params);
			log.info("sidolist:"+sidolist);
			ModelAndView mav=new ModelAndView();
			mav.addObject("jisaList",jisalist);
			mav.addObject("resultJimokList",jimoklist);
			mav.addObject("sidoList",sidolist);
			mav.setViewName("content/jisang/landRightsRegistration");
			return mav;
		}
		@GetMapping(path="/landTerminationRegistration") //http://localhost:8080/api/get/dbTest
		public ModelAndView landTerminationRegistration(HttpServletRequest httpRequest, HttpServletResponse response) throws Exception {
			HashMap params = new HashMap();
			ArrayList<HashMap>  list=new ArrayList<HashMap>();

			String idx = httpRequest.getParameter("idx");
			String index = httpRequest.getParameter("index");

			params.put("idx",idx);
			params.put("manage_no",idx);
			params.put("index",index);
			log.info("params:"+params);

			ArrayList<HashMap> data = mainService.selectQuery("jisangSQL.selectAllData",params);
			ArrayList<HashMap> soujaList = mainService.selectQuery("jisangSQL.selectSoyujaData",params);
			ArrayList<HashMap> atcFileList = mainService.selectQuery("jisangSQL.selectAtcFileList",params);

			//임시 저장 된 테이블 조회 시 있으면, 해당 테이블 뿌리기.
			ArrayList<HashMap> dataTmp = mainService.selectQuery("jisangSQL.selectAllTmpData",params);
			if(dataTmp.size() > 0) {
				// dataTmp의 데이터를 하나씩 처리
				HashMap<String, Object> tmpMap = dataTmp.get(0);
				HashMap<String, Object> newMap = new HashMap<>();

				// tmpMap의 모든 키를 순회하면서 "jmt_"를 "jm_"으로 바꾼 후 newMap에 넣음
				for (Map.Entry<String, Object> entry : tmpMap.entrySet()) {
					String newKey = entry.getKey().replace("jmt_", "jm_");
					newMap.put(newKey, entry.getValue());
				}
				data.remove(0);
				data.add(newMap);
			}

			ArrayList<HashMap> jisangPermitList = mainService.selectQuery("jisangSQL.selectPermitList",params);
			ArrayList<HashMap> jisangModifyList = mainService.selectQuery("jisangSQL.selectModifyList",params);
			ArrayList<HashMap> jisangMergeList = mainService.selectQuery("jisangSQL.selectMergeList",params);

			params.put("pnu", data.get(0).get("jm_pnu"));

			ArrayList<HashMap> jisangPnuAtcFileList = mainService.selectQuery("jisangSQL.selectPnuAtcFileList",params);

			ArrayList<HashMap> jisalist = mainService.selectQuery("commonSQL.selectAllJisaList",params);
			ArrayList<HashMap> jimoklist = mainService.selectQuery("commonSQL.selectJimokList",params);
			ArrayList<HashMap> sidolist = mainService.selectQuery("commonSQL.getSidoMaster",params);

			log.info("params:"+params);
			log.info("sidolist:"+sidolist);
			log.info("data:"+data.get(0));
			log.info("jm_pipe_yn:"+data.get(0).get("jm_pipe_yn"));
			log.info("jm_youngdo:"+data.get(0).get("jm_youngdo"));
			log.info("jm_pipe_name:"+data.get(0).get("jm_pipe_name"));
			log.info("jm_jijuk_area:"+data.get(0).get("jm_jijuk_area"));
			log.info("jisangPermitList:"+jisangPermitList);
			log.info("souja count:"+soujaList.size());
			log.info("soujaList:"+soujaList);
			log.info("atcFileList:"+atcFileList);
			log.info("jisangPnuAtcFileList:"+jisangPnuAtcFileList);

			ModelAndView mav=new ModelAndView();
			mav.addObject("jisaList",jisalist);
			mav.addObject("resultJimokList",jimoklist);
			mav.addObject("sidoList",sidolist);

			mav.addObject("resultData",data.get(0));
			mav.addObject("soujaList",soujaList);
			mav.addObject("jisangPermitList",jisangPermitList);
			mav.addObject("atcFileList",atcFileList);
			mav.addObject("jisangModifyList",jisangModifyList);
			mav.addObject("jisangMergeList",jisangMergeList);

			mav.addObject("jisangPnuAtcFileList",jisangPnuAtcFileList);
			mav.setViewName("content/jisang/landTerminationRegistration");
			return mav;
		}
		
		//아이디를 기준으로 해당 영역만 리플래쉬 되도록 하는 로직
		@PostMapping(path="/getBasicSearchData") //http://localhost:8080/api/get/dbTest
	    public ModelAndView getBasicSearchData(HttpServletRequest httpRequest, HttpServletResponse response) throws Exception {
			ModelAndView mav=new ModelAndView();
			HashMap params = new HashMap();
			ArrayList<HashMap>  list=new ArrayList<HashMap>();
			//log.info("httpRequest:"+Arrays.toString(httpRequest));
			String jisa = httpRequest.getParameter("jisa");
			String pnu = httpRequest.getParameter("pnu");
			String sido_nm = httpRequest.getParameter("sido");
			String sgg_nm=httpRequest.getParameter("gugun");
			String emd_nm=httpRequest.getParameter("landRightsRegistSelectBox11");
			String ri_nm=httpRequest.getParameter("landRightsRegistSelectBox12");
			String jibun=httpRequest.getParameter("mjibun");
			String address=httpRequest.getParameter("address");
			
			String addressRadioValue=httpRequest.getParameter("landRightsRegistration_addressInput");
			params.put("jisa",jisa);
			
			params.put("jibun", jibun);
			if (addressRadioValue.equals("0")) params.put("address", address);
			else {
				params.put("sido_nm",sido_nm);
				params.put("sgg_nm",sgg_nm);
				params.put("emd_nm",emd_nm);
				params.put("ri_nm",ri_nm);
			}
			params.put("addressRadioValue", addressRadioValue);
			//params.put("pnu",pnu);
			log.info("params:"+params);
			ArrayList<HashMap> jisangBasicSearchList = mainService.selectQuery("jisangSQL.selectBasicSearchList",params);
			log.info("jisangBasicSearchList:"+jisangBasicSearchList);
			mav.addObject("jisangBasicSearchList",jisangBasicSearchList);
			mav.setViewName("content/jisang/landRightsRegistration :: #searchResultPopDiv");
			return mav;
		}
		
		
		@RequestMapping(value = "/fileUpload/post") //ajax에서 호출하는 부분
	    @ResponseBody
	    public HashMap upload(MultipartHttpServletRequest multipartRequest) { //Multipart로 받는다.
	         
	        Iterator<String> itr =  multipartRequest.getFileNames();
	        
	        String filePath = GC.getJisangFileTempDir(); //설정파일로 뺀다.
	        HashMap<String,Object> resultmap=new HashMap();
	        ArrayList<HashMap> resultdataarr=new ArrayList<HashMap>();
	        HashMap resultdata=new HashMap();
	        String resultCode="0000";
	        String resultMessage="success";
	        while (itr.hasNext()) { //받은 파일들을 모두 돌린다.
	            
	            /* 기존 주석처리
	            MultipartFile mpf = multipartRequest.getFile(itr.next());
	            String originFileName = mpf.getOriginalFilename();
	            System.out.println("FILE_INFO: "+originFileName); //받은 파일 리스트 출력'
	            */
	            
	            MultipartFile mpf = multipartRequest.getFile(itr.next());
	     
	            String originalFilename = mpf.getOriginalFilename(); //파일명
	     
	            String fileFullPath = filePath+"/"+originalFilename; //파일 전체 경로
	          
	           
	            try {
	                //파일 저장
	                mpf.transferTo(new File(fileFullPath)); //파일저장 실제로는 service에서 처리
	                
	                resultdata.put("fname",originalFilename);
	                resultdata.put("fpath",fileFullPath);
	                System.out.println("originalFilename => "+originalFilename);
	                System.out.println("fileFullPath => "+fileFullPath);
	               // resultdataarr.add(resultdata);
	            } catch (Exception e) {
	            	resultCode="4001";
	            	resultdata.put("fname","");
	                resultdata.put("fpath","");
	                resultMessage="error";
	               // resultdataarr.add(resultdata);
	                System.out.println("postTempFile_ERROR======>"+fileFullPath);
	                e.printStackTrace();
	            }
	           
	          
//	            System.out.println(obj);
	           
	          //log.info("jo:"+jo);
//	          			response.setCharacterEncoding("UTF-8");
//	          			response.setHeader("Access-Control-Allow-Origin", "*");
//	          			response.setHeader("Cache-Control", "no-cache");
//	          			response.resetBuffer();
//	          			response.setContentType("application/json");
//	          			//response.getOutputStream().write(jo);
//	          			response.getWriter().print(obj);
//	          			response.getWriter().flush();
	                         
	       }
	        resultmap.put("resultCode",resultCode);
	        resultmap.put("resultData",resultdata);
	        resultmap.put("resultMessage",resultMessage);
	        JSONObject obj =new JSONObject(resultmap);
	         
	        return resultmap;
	    }

	@RequestMapping(value="/menu02_1DataTableList", method = {RequestMethod.GET, RequestMethod.POST}) //http://localhost:8080/api/get/dbTest
	public ResponseEntity<?> datatableList02_1(HttpServletRequest req, HttpServletResponse res) throws Exception {

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
		String manage_no = req.getParameter("manage_no");
		String dosiplan=req.getParameter("dosiplan");
		String address=req.getParameter("saddr");

		String souja = req.getParameter("souja");
		String jasan_no = req.getParameter("jasan_no");

		String jimok_text = req.getParameter("jimok_text");
//		String jimok_text = req.getParameter("jimok_text");
//		String jimok_text ="전,과수원,목장용지";
		String[] jimokArray = jimok_text != null && !jimok_text.trim().isEmpty() ? jimok_text.split(",") : new String[0]; // 빈 배열로 초기화

		String comple_yn=req.getParameter("comple_yn");
		String cancel_yn=req.getParameter("cancel_yn");
		String deunggi_date=req.getParameter("deunggi_date");
		String account_yn=req.getParameter("account_yn"); //회계처리 필요여부
		String start_date=req.getParameter("start_date");
		String end_date=req.getParameter("end_date");

		Map map=req.getParameterMap();

		HashMap params = new HashMap();
		params.put("draw",draw);
		params.put("start",start);
		params.put("length",length);
		params.put("jisa",jisa);
		params.put("idx",manage_no);
		params.put("dosiplan",dosiplan);
		params.put("address",address);

		params.put("souja",souja);
		params.put("jasan_no",jasan_no);

		params.put("jimokArray", jimokArray);
		params.put("comple_yn", comple_yn);
		params.put("cancel_yn", cancel_yn);
		params.put("deunggi_date", deunggi_date);
		params.put("account_yn", account_yn);
		params.put("start_date", start_date);
		params.put("end_date", end_date);

//		String[] right_arr= {};
//		right_arr=right_type.split(",");
//		params.put("right_type", right_arr);

		params.put("manageYn","Y");
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

		Object count= mainService.selectCountQuery("jisangSQL.selectTotalCount", params);
		int total=(int)count;

		ArrayList<HashMap> list = mainService.selectQuery("jisangSQL.selectJisangList",params);
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

	@PostMapping(path="/landTerminationSave")
	public void landTerminationSave(HttpServletRequest httpRequest, HttpServletResponse response) throws Exception {
		ModelAndView mav=new ModelAndView();
		HashMap params = new HashMap();
		ArrayList<HashMap>  list=new ArrayList<HashMap>();

		String jisa = httpRequest.getParameter("jisa");	//담당지사
		String yongdo = httpRequest.getParameter("yongdo");	//용도
		String pipe_name = httpRequest.getParameter("pipe_name");	//관로명(구간)
		String sun_gubun = httpRequest.getParameter("sun_gubun");	//단/복선
		String sido_nm = httpRequest.getParameter("sido_nm");	//주소
		String sgg_nm = httpRequest.getParameter("sgg_nm");	//주소
		String ri_nm = httpRequest.getParameter("ri_nm");	//주소
		String jibun = httpRequest.getParameter("jibun");	//주소
		String jijuk_area = httpRequest.getParameter("jijuk_area");	//지적면적(m²)
		String gover_own_yn = httpRequest.getParameter("gover_own_yn");	//국공유지여부

		String jasan_no = httpRequest.getParameter("jasan_no");	//자산분류번호
		String chuideuk_date = httpRequest.getParameter("chuideuk_date");	//취득일자
		String pyeonib_area = httpRequest.getParameter("pyeonib_area");	//편입면적(m2)
		String use_state = httpRequest.getParameter("use_state");	//사용현황
		String deunggi_date = httpRequest.getParameter("deunggi_date");	 //등기일
		String deunggi_no = httpRequest.getParameter("deunggi_no");	//등기번호
		String deunggiso = httpRequest.getParameter("deunggiso");	//등기소
		String dosiplan = httpRequest.getParameter("dosiplan");	//도시계획 결정여부

		String account_yn = httpRequest.getParameter("account_yn");
		String cancel_date = httpRequest.getParameter("cancel_date");
		String chuideuk_money = httpRequest.getParameter("chuideuk_money");
		String gammoney = httpRequest.getParameter("gammoney");
		String remainder_money = httpRequest.getParameter("remainder_money");
		String cancel_bosang_yn = httpRequest.getParameter("cancel_bosang_yn");
		String cancel_bosang_money = httpRequest.getParameter("cancel_bosang_money");
		String cancel_reason = httpRequest.getParameter("cancel_reason");
		String cancel_comment = httpRequest.getParameter("cancel_comment");

		String jisang_no = httpRequest.getParameter("jisang_no");
		String jIdx = httpRequest.getParameter("jIdx");

		params.put("jisa",jisa);
		params.put("yongdo",yongdo);
		params.put("pipe_name",pipe_name);
		params.put("sun_gubun",sun_gubun);
		params.put("sido_nm",sido_nm);
		params.put("sgg_nm",sgg_nm);
		params.put("ri_nm",ri_nm);
		params.put("jibun",jibun);
		if (jijuk_area != null && !jijuk_area.trim().isEmpty()) {
			params.put("jijuk_area",Integer.parseInt(jijuk_area));
		} else {
			params.put("jijuk_area", null);
		}
		params.put("gover_own_yn",gover_own_yn);

		params.put("jasan_no",jasan_no);
		params.put("chuideuk_date",chuideuk_date);
		if (pyeonib_area != null && !pyeonib_area.trim().isEmpty()) {
			params.put("pyeonib_area",Integer.parseInt(pyeonib_area));
		} else {
			params.put("pyeonib_area", null);
		}
		params.put("use_state",use_state);
		params.put("deunggi_date",deunggi_date);
		params.put("deunggi_no",deunggi_no);
		params.put("deunggiso",deunggiso);
		params.put("dosiplan",dosiplan);

		params.put("account_yn",account_yn);
		params.put("cancel_date",cancel_date);
		if (chuideuk_money != null && !chuideuk_money.trim().isEmpty()) {
			params.put("chuideuk_money", Integer.parseInt(chuideuk_money));
		} else {
			params.put("chuideuk_money", null);
		}
		if (gammoney != null && !gammoney.trim().isEmpty()) {
			params.put("gammoney",Integer.parseInt(gammoney));
		} else {
			params.put("gammoney", null);
		}
		if (remainder_money != null && !remainder_money.trim().isEmpty()) {
			params.put("remainder_money",Integer.parseInt(remainder_money));
		} else {
			params.put("remainder_money", null);
		}

		params.put("cancel_bosang_yn",cancel_bosang_yn);

		if (cancel_bosang_money != null && !cancel_bosang_money.trim().isEmpty()) {
			params.put("cancel_bosang_money",Integer.parseInt(cancel_bosang_money));
		} else {
			params.put("cancel_bosang_money", null);
		}
		params.put("cancel_reason",cancel_reason);
		params.put("cancel_comment",cancel_comment);

		params.put("jisang_no",jisang_no);
		params.put("idx",Integer.parseInt(jIdx));

		log.info("params:"+params);
		mainService.InsertQuery("jisangSQL.upsertJisangMasterTmp",params);
	}

	@PostMapping(path="/commitJisangTmp")
	public void commitJisangTmp(HttpServletRequest httpRequest, HttpServletResponse response) throws Exception {
		ModelAndView mav=new ModelAndView();
		HashMap params = new HashMap();
		ArrayList<HashMap>  list=new ArrayList<HashMap>();

		String jisang_no = httpRequest.getParameter("jisang_no");
		String jIdx = httpRequest.getParameter("jIdx");

		params.put("idx",jisang_no);
		params.put("index",jIdx);

		log.info("params:"+params);
		//임시 저장 된 테이블 조회
		ArrayList<HashMap> dataTmp = mainService.selectQuery("jisangSQL.selectAllTmpData",params);
		if(dataTmp.size() > 0) {
			// dataTmp의 데이터를 하나씩 처리
			HashMap<String, Object> tmpMap = dataTmp.get(0);
			HashMap<String, Object> updatedRow = new HashMap<>();

			// jmt_ 컬럼명을 jm_으로 변경
			for (Map.Entry<String, Object> entry : tmpMap.entrySet()) {
				String key = entry.getKey();
				Object value = entry.getValue();

				if (key.startsWith("jmt_")) {
					String newKey = key.replace("jmt_", "jm_");
					updatedRow.put(newKey, value);
				}
			}

			// 업데이트 쿼리 실행 (jm_jisang_no, jm_idx 기준)
			mainService.UpdateQuery("jisangSQL.updateJisangMaster", updatedRow);

			// 해당 레코드 jisang_master_tmp 에서 삭제
			mainService.DeleteQuery("jisangSQL.deleteJisangMasterTmp", params);
	}

	}
}
