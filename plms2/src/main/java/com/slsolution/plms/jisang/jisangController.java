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

import com.slsolution.plms.ApprovalHtmlUtil;
import com.slsolution.plms.ApprovalUtil;
import com.slsolution.plms.CommonUtil;
import com.slsolution.plms.MainService;
import com.slsolution.plms.ParameterParser;
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
       //ArrayList attachArr=new ArrayList();
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
        	//requestMap.put("uploadFiles",requestJsonObj.getJSONArray("uploadFiles"));
        	//requestMap.put("soujaInfo",requestJsonObj.getJSONArray("soujaInfo"));
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
    		log.info("##seq###:"+seq);
    		requestMap.put("idx",seq);
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
    		
    		//첨부파일 등록

    		JSONArray uploadJsonArray=requestJsonObj.getJSONArray("uploadFiles");
    		log.info("uploadJsonArray:"+uploadJsonArray);
    		for(int i=0;i<uploadJsonArray.length();i++) {
    			//JSONObject obj=new JSONObject(uploadJsonArray.get(i).toString());
    			String fname=uploadJsonArray.get(i).toString();
    			log.info("fname:"+fname);


    			 HashMap<String, Object> filesMap= new HashMap<>();
//
//    			filesMap=CommonUtil.JsonArraytoMap(obj);
//
    			filesMap.put("jisangNo","J_"+String.format("%06d",seq));
    			filesMap.put("seq",String.format("%06d",seq));
    			filesMap.put("fseq",i);
    			filesMap.put("fname",fname);

    			 String tempPath = GC.getJisangFileTempDir(); //설정파일로 뺀다.
    			 String dataPath = GC.getJisangFileDataDir(); //설정파일로 뺀다.
    			 filesMap.put("fpath",dataPath+"/"+fname);
    			 CommonUtil.moveFile(fname, tempPath, dataPath);
//    			log.info("filesMap:"+filesMap);
    			mainService.InsertQuery("jisangSQL.insertJisangUploadData", filesMap);
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
	@Transactional
	@RequestMapping(value="/usePermitRegisterSave", method = {RequestMethod.GET, RequestMethod.POST}) //http://localhost:8080/api/get/dbTest
    public void usePermitRegisterSave(HttpServletRequest httpRequest, HttpServletResponse response) throws Exception {
        
		//일반웹형식
//		Properties requestParams = CommonUtil.convertToProperties(httpRequest);
//        log.info("requestParams:"+requestParams);
        
//        //json으로 넘어올때
        String requestParams = ParameterUtil.getRequestBodyToStr(httpRequest);
        log.info("requestParams:"+requestParams);
        JSONObject requestJsonObj=new JSONObject(requestParams);
        
        HashMap<String,Object> requestMap= new HashMap<>();
        
        Object seq= mainService.selectCountQuery("jisangSQL.selectJisangPermitNextval",requestMap);
		int nseq=(int)seq;
		log.info("##seq###:"+seq);
        
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
        
		
		//기본등록정보 가공
		requestMap.put("idx",seq);
		
	requestMap.put("seq","P_"+String.format("%06d",seq));
	requestMap.put("purpose", requestJsonObj.get("purpose"));
	requestMap.put("spot_result", requestJsonObj.get("spot_result"));
	requestMap.put("review", requestJsonObj.get("review"));
	requestMap.put("contract", requestJsonObj.get("contract"));
	requestMap.put("useEndDate", requestJsonObj.get("useEndDate"));
	requestMap.put("useStartDate", requestJsonObj.get("useStartDate"));
	requestMap.put("pmt_status","임시저장");
		//기본등록정보 저장
		mainService.InsertQuery("jisangSQL.insertJisangPermitMaster", requestMap);
		
        
        //지상권 사용승락 대상토지 등록
        
        JSONArray desangTogis=requestJsonObj.getJSONArray("desangTogis");
        for(int i=0;i<desangTogis.length();i++) {
        	JSONObject obj=new JSONObject(desangTogis.get(i).toString());
        	log.info("obj:"+obj);
        	HashMap<String,Object> jMap= new HashMap<>();
        	jMap.put("idx", obj.get("togiManageNo"));
        	ArrayList<HashMap> data = mainService.selectQuery("jisangSQL.selectAllData",jMap);
        	log.info(data.get(0).toString());
        	
        	
        	//jisang_no로 쿼리를 날려서 가져온다 정보 그리고 토지 정보를 등록한다.
        	HashMap<String,Object> togiMap= new HashMap<>();
        	togiMap.put("seq", "P_"+String.format("%06d",seq)); //pmt_no
        	togiMap.put("jisang_no",obj.get("togiManageNo"));
        	togiMap.put("addrcode",data.get(0).get("jm_addrcode"));
        	togiMap.put("souja",obj.get("togiSouja"));
        	togiMap.put("pmt_user",obj.get("togiUseName"));
        	togiMap.put("jimok",obj.get("togiJimokText"));
        	togiMap.put("all_area",obj.get("togiJijukArea"));
        	togiMap.put("set_area",obj.get("togiPyeonibArea"));
        	togiMap.put("set_money",obj.get("togiSetMoney"));
        	togiMap.put("sido_nm",data.get(0).get("jm_sido_nm"));
        	togiMap.put("sgg_nm",data.get(0).get("jm_sgg_nm"));
        	togiMap.put("emd_nm",data.get(0).get("jm_emd_nm"));
        	togiMap.put("ri_nm",data.get(0).get("jm_ri_nm"));
        	togiMap.put("jibun",data.get(0).get("jm_jibun"));
        	togiMap.put("addr",obj.get("togiaddress"));
        	togiMap.put("jasan_no",obj.get("togiJasanNo"));
        	mainService.InsertQuery("jisangSQL.insertJisangPermitTogi", togiMap);
        	
        }
        
        //사용승락 첨부서류 등록
        for(int i=1;i<11;i++) {
        	String key=String.format("%02d",i);
        	if (requestJsonObj.get("req_doc_file"+key)!=null) {
        		HashMap<String, Object> filesMap= new HashMap<>();
//        		filesMap.put("jisangNo","J_"+String.format("%06d",seq));
//    			filesMap.put("seq",String.format("%06d",seq));
//    			filesMap.put("fseq",i);
//    			filesMap.put("fname",fname);
        	}
        }
        
        
        
        
       //ArrayList attachArr=new ArrayList();
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
        	//requestMap.put("uploadFiles",requestJsonObj.getJSONArray("uploadFiles"));
        	//requestMap.put("soujaInfo",requestJsonObj.getJSONArray("soujaInfo"));
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
//        	Object seq= mainService.selectCountQuery("jisangSQL.selectJisangMasterNextval", requestMap);
//    		int nseq=(int)seq;
//    		log.info("##seq###:"+seq);
//    		requestMap.put("idx",seq);
////    		requestMap.put("seq","J_"+String.format("%06d",seq));
//    		requestMap.put("sido_nm", requestJsonObj.get("sido_nm"));
//    		requestMap.put("sgg_nm", requestJsonObj.get("sgg_nm"));
//    		requestMap.put("emd_nm", requestJsonObj.get("emd_nm"));
//    		requestMap.put("ri_nm", requestJsonObj.get("ri_nm"));
//    		requestMap.put("jibun", requestJsonObj.get("mjibun"));
//    		requestMap.put("jisa", requestJsonObj.get("jisa"));
//    		requestMap.put("chuideuk_date", requestJsonObj.get("mchuideuk_date"));
//    		requestMap.put("jijuk_area", requestJsonObj.get("jijuk_area"));
//    		requestMap.put("pipe_name", requestJsonObj.get("pipe_name"));
//    		requestMap.put("sun_gubun", requestJsonObj.get("sun_gubun"));
//    		requestMap.put("yongdo", requestJsonObj.get("youngdo"));
//    		requestMap.put("dosiplan", requestJsonObj.get("mdosi_plan"));
//    		requestMap.put("comple_yn", requestJsonObj.get("mcomple_yn"));
//    		requestMap.put("pyeonib_area", requestJsonObj.get("mpyeonib_area"));
//    		requestMap.put("deunggi_date", requestJsonObj.get("mdeunggi_date"));
//    		requestMap.put("deunggi_no", requestJsonObj.get("mdeunggi_no"));
//    		requestMap.put("deunggiso", requestJsonObj.get("mdeunggiso"));
//    		requestMap.put("jasan_no", requestJsonObj.get("mjasan_no"));
//    		requestMap.put("gover_own_yn", requestJsonObj.get("gover_own_yn"));
//    		requestMap.put("pnu", requestJsonObj.get("mpnu"));
//    		
//    		
//    		log.info("requestMap:"+requestMap);
//    		mainService.InsertQuery("jisangSQL.insertJisangData", requestMap);
//    		
//    		
//    		//소유자정보등록
//    		JSONArray soujaJsonArray=requestJsonObj.getJSONArray("soujaInfo");
//    		log.info("soujaJsonArray:"+soujaJsonArray);
//    		for(int i=0;i<soujaJsonArray.length();i++) {
//    			JSONObject obj=new JSONObject(soujaJsonArray.get(i).toString());
//    			 HashMap<String, Object> soujaMap= new HashMap<>();
//    			log.info("obj:"+obj);
//    			soujaMap=CommonUtil.JsonArraytoMap(obj);
//    			
//    			soujaMap.put("seq","J_"+String.format("%06d",seq));
//    			log.info("soujaMap:"+soujaMap);
//    			mainService.InsertQuery("jisangSQL.insertJisangSoujaData", soujaMap);
//    		}
//    		
//    		//첨부파일 등록
//
//    		JSONArray uploadJsonArray=requestJsonObj.getJSONArray("uploadFiles");
//    		log.info("uploadJsonArray:"+uploadJsonArray);
//    		for(int i=0;i<uploadJsonArray.length();i++) {
//    			//JSONObject obj=new JSONObject(uploadJsonArray.get(i).toString());
//    			String fname=uploadJsonArray.get(i).toString();
//    			log.info("fname:"+fname);
//
//
//    			 HashMap<String, Object> filesMap= new HashMap<>();
////
////    			filesMap=CommonUtil.JsonArraytoMap(obj);
////
//    			filesMap.put("jisangNo","J_"+String.format("%06d",seq));
//    			filesMap.put("seq",String.format("%06d",seq));
//    			filesMap.put("fseq",i);
//    			filesMap.put("fname",fname);
//
//    			 String tempPath = GC.getJisangFileTempDir(); //설정파일로 뺀다.
//    			 String dataPath = GC.getJisangFileDataDir(); //설정파일로 뺀다.
//    			 filesMap.put("fpath",dataPath+"/"+fname);
//    			 CommonUtil.moveFile(fname, tempPath, dataPath);
////    			log.info("filesMap:"+filesMap);
//    			mainService.InsertQuery("jisangSQL.insertJisangUploadData", filesMap);
//    		}
//        
//       
//        
//    		
//    		HashMap<String,Object> resultParam= new HashMap<>();
//    		
//    		resultParam.put("nseq",nseq);
    		
        // log.info("attachFile:"+httpRequest.getParameter("attachFile"));
//        List<TestDTO> list = new ArrayList<TestDTO>();
//        list = dbService.getList();
		
        HashMap<String,Object> resultmap=new HashMap();
        resultmap.put("resultCode","0000");
        resultmap.put("params", requestJsonObj);
        resultmap.put("resultData","");
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
				mav.addObject("jijuk", jijuk);
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
	@GetMapping(path="/forDivisionEasementDetails") //http://localhost:8080/api/get/dbTest
	public ModelAndView forDivisionEasementDetails(HttpServletRequest httpRequest, HttpServletResponse response) throws Exception {
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

			params.put("issueManualCode1", jisangIssueList.get(0).get("pi_code_depth1"));
			params.put("issueManualCode2", jisangIssueList.get(0).get("pi_code_depth2"));
			params.put("issueManualCode3", jisangIssueList.get(0).get("pi_code_depth3"));
		}
		ArrayList<HashMap> jisangPnuAtcFileList = mainService.selectQuery("jisangSQL.selectPnuAtcFileList",params);
		ArrayList<HashMap> jisangIssueHistoryList = mainService.selectQuery("jisangSQL.selectIssueHistoryList",params);
		ArrayList<HashMap> jisangIssueCodeAtcFileList = mainService.selectQuery("jisangSQL.selectIssueCodeAtcFileList",params);
		ArrayList<HashMap> jisangMemoList = mainService.selectQuery("commonSQL.selectMemoList",params);

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
		mav.setViewName("content/jisang/forDivisionEasementDetails");
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
			

			mav.addObject("jisaList",jisalist);
			mav.addObject("resultJimokList",jimoklist);
			mav.addObject("sidoList",sidolist);
			
			mav.setViewName("content/jisang/menu02_1");
			return mav;
		}
		
		@GetMapping(path="/menu02_2") //http://localhost:8080/api/get/dbTest
	    public ModelAndView menu02_2(HttpServletRequest httpRequest, HttpServletResponse response) throws Exception {
//			response.setHeader("X-Frame-Options", "SAMEORIGIN");
//			response.setHeader("Content-Security-Policy", " frame-ancestors 'self'");
			HashMap params = new HashMap();
			ArrayList<HashMap>  list=new ArrayList<HashMap>();
			ArrayList<HashMap> jisalist = mainService.selectQuery("commonSQL.selectAllJisaList",params);
			//ArrayList<HashMap> jisalist = mainService.selectQuery("commonSQL.selectJisangListDemo",params); //demo
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
			HashMap params = new HashMap();
			ArrayList<HashMap>  list=new ArrayList<HashMap>();
			ArrayList<HashMap> jisalist = mainService.selectQuery("commonSQL.selectAllJisaList",params);
			ArrayList<HashMap> sidolist = mainService.selectQuery("commonSQL.getSidoMaster",params);

			ModelAndView mav=new ModelAndView();
			mav.setViewName("content/jisang/menu02_3");

			mav.addObject("jisaList",jisalist);
			mav.addObject("sidoList",sidolist);


			return mav;
		}
		@GetMapping(path="/menu02_4") //http://localhost:8080/api/get/dbTest
	    public ModelAndView menu02_4(HttpServletRequest httpRequest, HttpServletResponse response) throws Exception {
//			response.setHeader("X-Frame-Options", "SAMEORIGIN");
//			response.setHeader("Content-Security-Policy", " frame-ancestors 'self'");
			ModelAndView mav=new ModelAndView();

			HashMap params = new HashMap();
			ArrayList<HashMap>  list=new ArrayList<HashMap>();
			ArrayList<HashMap> jisalist = mainService.selectQuery("commonSQL.selectAllJisaList",params);
			ArrayList<HashMap> jimoklist = mainService.selectQuery("commonSQL.selectJimokList",params);
			ArrayList<HashMap> sidolist = mainService.selectQuery("commonSQL.getSidoMaster",params);

			mav.addObject("jisaList",jisalist);
			mav.addObject("resultJimokList",jimoklist);
			mav.addObject("sidoList",sidolist);
			mav.setViewName("content/jisang/menu02_4");
			return mav;
		}
		@GetMapping(path="/menu02_5") //http://localhost:8080/api/get/dbTest
	    public ModelAndView menu02_5(HttpServletRequest httpRequest, HttpServletResponse response) throws Exception {
//			response.setHeader("X-Frame-Options", "SAMEORIGIN");
//			response.setHeader("Content-Security-Policy", " frame-ancestors 'self'");
			HashMap params = new HashMap();
			ArrayList<HashMap>  list=new ArrayList<HashMap>();
			ArrayList<HashMap> jisalist = mainService.selectQuery("commonSQL.selectAllJisaList",params);
			ArrayList<HashMap> jimoklist = mainService.selectQuery("commonSQL.selectJimokList",params);
			ArrayList<HashMap> sidolist = mainService.selectQuery("commonSQL.getSidoMaster",params);
			ModelAndView mav=new ModelAndView();
			

			mav.addObject("jisaList",jisalist);
			mav.addObject("resultJimokList",jimoklist);
			mav.addObject("sidoList",sidolist);
			
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
			
			//필수첨부파일
			ArrayList<HashMap> reqDoc1list = mainService.selectQuery("jisangSQL.selectJisangReqDoc1",params);
			

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
			log.info("jisangDoc1list:"+reqDoc1list);
			
			
			
			
			
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
			
			mav.addObject("reqDoc1list",reqDoc1list);
			
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

	@PostMapping(path="/getJibunListData") //http://localhost:8080/api/get/dbTest
	public ModelAndView getJibunListData(HttpServletRequest httpRequest, HttpServletResponse response) throws Exception {
		ModelAndView mav=new ModelAndView();
		HashMap params = new HashMap();

		String idx = httpRequest.getParameter("idx");
		params.put("idx",idx);

		ArrayList<HashMap> jibunList = mainService.selectQuery("jisangSQL.selectJibunList",params);
		log.info("*idx* : " + idx);
		log.info("*jibunList* : " + jibunList);

		mav.addObject("jibunList",jibunList);

		mav.setViewName("content/jisang/menu02_3 :: #searchResultPopDiv");
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
		
		
		//해지부분 필수 첨부서류 등록
		@RequestMapping(value = "/fileUpload/reqDoc") //ajax에서 호출하는 부분
	    @ResponseBody
	    public HashMap reqDoc(HttpServletRequest httpRequest,MultipartHttpServletRequest multipartRequest) { //Multipart로 받는다.
	         
	        Iterator<String> itr =  multipartRequest.getFileNames();
	        log.info("idx:"+multipartRequest.getParameter("idx"));
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
	
	@RequestMapping(value="/menu02_5DataTableList", method = {RequestMethod.GET, RequestMethod.POST}) //http://localhost:8080/api/get/dbTest
	public ResponseEntity<?> datatableList02_5(HttpServletRequest req, HttpServletResponse res) throws Exception {

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
		String jibun = req.getParameter("jibun");
		String souja = req.getParameter("souja");
		String jasan_no = req.getParameter("jasan_no");
		String status = req.getParameter("status");


		Map map=req.getParameterMap();

		HashMap params = new HashMap();
		params.put("draw",draw);
		params.put("start",start);
		params.put("length",length);
		params.put("jisa",jisa);
		params.put("status",status);
		params.put("jibun",jibun);
		params.put("address",address);

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

		Object count= mainService.selectCountQuery("jisangSQL.selectJisangPermitTotalCount", params);
		int total=(int)count;

		ArrayList<HashMap> list = mainService.selectQuery("jisangSQL.selectJisangPermitList",params);
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

	@RequestMapping(value="/menu02BunhalDataTableList", method = {RequestMethod.GET, RequestMethod.POST}) //http://localhost:8080/api/get/dbTest
	public ResponseEntity<?> datatableList02Bunhal(HttpServletRequest req, HttpServletResponse res) throws Exception {

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
		String address=req.getParameter("saddr");
		String souja = req.getParameter("souja");
		String jasan_no = req.getParameter("jasan_no");
		String account_yn=req.getParameter("account_yn"); //회계처리 필요여부

		Map map=req.getParameterMap();

		HashMap params = new HashMap();
		params.put("draw",draw);
		params.put("start",start);
		params.put("length",length);
		params.put("jisa",jisa);
		params.put("idx",manage_no);
		params.put("address",address);

		params.put("souja",souja);
		params.put("jasan_no",jasan_no);
		params.put("account_yn", account_yn);

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

		Object count= mainService.selectCountQuery("jisangSQL.selectJisangBunhalCount", params);
		int total=(int)count;

		ArrayList<HashMap> list = mainService.selectQuery("jisangSQL.selectJisangBunhalList",params);

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

	@GetMapping(path="/divisionRegister") //http://localhost:8080/api/get/dbTest
	public ModelAndView divisionRegister(HttpServletRequest httpRequest, HttpServletResponse response) throws Exception {
		HashMap params = new HashMap();
		ArrayList<HashMap>  list=new ArrayList<HashMap>();

		String idx = httpRequest.getParameter("idx");
		String index = httpRequest.getParameter("index");
		String js_idx = httpRequest.getParameter("js_idx") != null ? httpRequest.getParameter("js_idx") : "0";

		params.put("idx",idx);
		params.put("manage_no",idx);
		params.put("index",index);
		params.put("js_idx",js_idx);

		log.info("**params**" + params);

		ArrayList<HashMap> data = mainService.selectQuery("jisangSQL.selectAllData",params);
		ArrayList<HashMap> soujaList = mainService.selectQuery("jisangSQL.selectSoyujaData",params);
		ArrayList<HashMap> bunhalList = mainService.selectQuery("jisangSQL.selectjisangBunhalList",params);
		ArrayList<HashMap> atcfilelist = mainService.selectQuery("jisangSQL.selectJisangBunhalAtcfile",params);

		ModelAndView mav=new ModelAndView();
		mav.addObject("idx",idx);
		mav.addObject("index",index);
		mav.addObject("resultData",data.get(0));
		mav.addObject("soujaList",soujaList);
		mav.addObject("bunhalList",bunhalList);
		mav.addObject("atcfileList",atcfilelist);
		
		log.info("resultData:"+ data.get(0));
		log.info("soujaList:"+soujaList);
		log.info("bunhalList:"+bunhalList);
		log.info("atcfileList:"+atcfilelist);
		mav.setViewName("content/jisang/divisionRegister");
		return mav;
	}
	
	@Transactional
	@GetMapping(path="/divisionRegisterSangsin") //http://localhost:8080/api/get/dbTest
	public ModelAndView divisionRegisterSangsin(HttpServletRequest httpRequest, HttpServletResponse response) throws Exception {
		HashMap params = new HashMap();
		ArrayList<HashMap>  list=new ArrayList<HashMap>();

		String idx = httpRequest.getParameter("idx");
		String index = httpRequest.getParameter("index");
		String js_idx = httpRequest.getParameter("js_idx") != null ? httpRequest.getParameter("js_idx") : "0";
		String USER_ID = String.valueOf(httpRequest.getSession().getAttribute("userId"));
		String USER_NAME = String.valueOf(httpRequest.getSession().getAttribute("userName"));
		String jisangno=idx;
		params.put("idx",idx);
		params.put("manage_no",idx);
		params.put("index",index);
		params.put("js_idx",js_idx);
		params.put("JISANGNO", idx);

		log.info("**params**" + params);

		ArrayList<HashMap> data = mainService.selectQuery("jisangSQL.selectAllData",params);
		ArrayList<HashMap> soujaList = mainService.selectQuery("jisangSQL.selectSoyujaData",params);
		ArrayList<HashMap> bunhalList = mainService.selectQuery("jisangSQL.selectjisangBunhalList",params);
		ArrayList<HashMap> atcfilelist = mainService.selectQuery("jisangSQL.selectJisangBunhalAtcfile",params);
		
		
		String str_result = "Y";
log.info("data:"+data.get(0));
		HashMap map = new HashMap(); // 응답용 맵
		
		String bunhal_status=data.get(0).get("jb_bunhal_status").toString();
		ApprovalHtmlUtil eph=new ApprovalHtmlUtil();
		ApprovalUtil epc= new ApprovalUtil();
		// 반려시 기존 DOCKEY로 사용
		String str_appNo = "";
		String str_AppovSEQ = "";
		if ("R".equals(bunhal_status)) {
			map.put("JISANGNO", idx);
			ArrayList<HashMap> echolist = mainService.selectQuery("jisangSQL.selectJisangBunHalDocInfo",map);
			log.info("echolist:"+echolist);
			//ArrayList<HashMap> echolist = (ArrayList<HashMap>) Database.getInstance().queryForList("Json.selectJisangBunHalDocInfo", map);
			str_appNo = (String) echolist.get(0).get("DOCKEY");
		} else {
			int nCount = (Integer) mainService.selectCountQuery("commonSQL.selectNextAppovalNo", null);

			if (nCount > 0) {
				str_AppovSEQ = String.valueOf(nCount);
			}
			//str_appNo = CommonUtil.getNextAppovalSeq();
			if (!"".equals(str_AppovSEQ)) {
				String str_AppAdd = "";
				int n_appNo = str_AppovSEQ.length();

				// 숫자 다섯자리
				for (int i = n_appNo; i < 5; i++) {
					str_AppAdd += "0";
				}
				str_AppovSEQ = "plms" + str_AppAdd + str_AppovSEQ;
				System.out.println("str_ApproVal=" + str_AppovSEQ);
				str_appNo=str_AppovSEQ;
			}
		}
		boolean res_Echo = false;
		System.out.println("insertJisangBunhalNew::"+str_appNo);
		if ("".equals(str_appNo)) {
			map.put("message", "N");
		} else {
//			String str_UserId = String.valueOf(request.getSession().getAttribute("userId"));
//			String str_userName = String.valueOf(request.getSession().getAttribute("userName"));
//			String str_userDeptcd = String.valueOf(request.getSession().getAttribute("userDeptcd"));
//			String str_userDeptnm = String.valueOf(request.getSession().getAttribute("userDeptnm"));
//			String str_userUPDeptcd = String.valueOf(request.getSession().getAttribute("userUPDeptcd"));
			String str_UserId = "105681";
			String str_userName = "박영환";
			String str_userDeptcd = "D250500";
			String str_userDeptnm = "IT전략.지원팀";
			String str_userUPDeptcd = "S250100";
			res_Echo = epc.GetPLMSDataforXML(str_appNo, eph.getJisang_divide_HTML(jisangno), str_UserId, "", "", "GetSurfaceRightsDivisionDataforXML", str_userName, str_userDeptcd, str_userDeptnm, str_userUPDeptcd);
		}
		System.out.println("insertJisangBunhalNew::"+res_Echo);

		ModelAndView mav=new ModelAndView();

		mav.addObject("resultData",data.get(0));
		mav.addObject("soujaList",soujaList);
		mav.addObject("bunhalList",bunhalList);
		mav.addObject("atcfileList",atcfilelist);
		log.info("resultData:"+ data.get(0));
		log.info("soujaList:"+soujaList);
		log.info("bunhalList:"+bunhalList);
		log.info("atcfileList:"+atcfilelist);
		mav.setViewName("content/jisang/divisionRegisterSangsin");
		return mav;
	}
	
	// 지상권 분할등록 신규 :: 분할상신
//		public void insertJisangBunhalNew(HttpServletRequest request, HttpServletResponse response) throws Exception {
//			ParameterParser parser = new ParameterParser(request);
//			String jisangno = parser.getString("jisangno", "");
//			String bunhal_status = parser.getString("bunhal_status", "");
//			String modifyReason = "";
//			String modifyReason2 = "";
//			String USER_ID = String.valueOf(request.getSession().getAttribute("userId"));
//			String USER_NAME = String.valueOf(request.getSession().getAttribute("userName"));
//
//			CommonUtil comm = new CommonUtil();
//			String str_result = "Y";
//
//			HashMap map = new HashMap(); // 응답용 맵
//
//			try {
//				Database.getInstance().startTransaction();
//
//				// 1. 기존 지상권 정보 분할여부, 분할사유, 검토의견 등록
//				Map params = new HashMap();
//				params.put("JISANGNO", jisangno);
//
//				// 5.전자결재 상신처리.
//				// 전자결재 반려시에 대한 프로세스가 없음. 따라서 원상복구 가능하도록 모지번을 제외한 하위 지상권 정보 별도처리 계획
//				ElectronicPaymentHTML eph = new ElectronicPaymentHTML(); // 상신용 HTML
//				ElectronicPaymentUtil epc = new ElectronicPaymentUtil(); // 전자결재 연계
//
//				// 반려시 기존 DOCKEY로 사용
//				String str_appNo = "";
//				// System.out.println("test :: " + bunhal_status);
//				if ("R".equals(bunhal_status)) {
//					map.put("JISANGNO", jisangno);
//					ArrayList<HashMap> echolist = (ArrayList<HashMap>) Database.getInstance().queryForList("Json.selectJisangBunHalDocInfo", map);
//					str_appNo = (String) echolist.get(0).get("DOCKEY");
//				} else {
//					str_appNo = CommonUtil.getNextAppovalSeq();
//				}
//
//				boolean res_Echo = false;
//				System.out.println("insertJisangBunhalNew::"+str_appNo);
//				if ("".equals(str_appNo)) {
//					map.put("message", "N");
//				} else {
//					String str_UserId = String.valueOf(request.getSession().getAttribute("userId"));
//					String str_userName = String.valueOf(request.getSession().getAttribute("userName"));
//					String str_userDeptcd = String.valueOf(request.getSession().getAttribute("userDeptcd"));
//					String str_userDeptnm = String.valueOf(request.getSession().getAttribute("userDeptnm"));
//					String str_userUPDeptcd = String.valueOf(request.getSession().getAttribute("userUPDeptcd"));
//					res_Echo = epc.GetPLMSDataforXML(str_appNo, eph.getJisang_divide_HTML(jisangno), str_UserId, "", "", "GetSurfaceRightsDivisionDataforXML", str_userName, str_userDeptcd, str_userDeptnm, str_userUPDeptcd);
//				}
//				System.out.println("insertJisangBunhalNew::"+res_Echo);
//				
//				if (res_Echo) {
//
//					// 문서번호 업데이트
//					map.put("DOCKEY", str_appNo);
//					str_result = "Y";
//					map.put("JISANGNO", jisangno);
//					Database.getInstance().update("Json.updateJisangBunhalEchoNo", map);
//
//					// System.out.println("%%%%%%%%%%%%map=" + map);
//					// 문서 URL조회
//					ArrayList echolist = (ArrayList) Database.getInstance().queryForList("Json.selectJisangBunHalDocInfo", map);
//					if (null != echolist && echolist.size() > 0) {
//						String str_EchoNo = String.valueOf(((HashMap) echolist.get(0)).get("OUT_URL"));
//						System.out.println("str_EchoNo=====" + str_EchoNo);
//						map.put("OUT_URL", str_EchoNo);
//					}
//
//				} else {
//					str_result = "N";
//				}
//				Database.getInstance().commitTransaction();
//
//			} catch (Exception e) {
//				str_result = "N";
//				e.printStackTrace();
//			} finally {
//				Database.getInstance().endTransaction();
//			}
//
//			map.put("message", str_result);
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
	
	
	//분할 저장
	@Transactional
	@PostMapping(path="/divisionRegisterSave")
	public void divisionRegisterSave(HttpServletRequest httpRequest, HttpServletResponse response) throws Exception {
		 String requestParams = ParameterUtil.getRequestBodyToStr(httpRequest);
	        
	        JSONObject requestJsonObj=new JSONObject(requestParams);
	        log.info("requestJsonObj:"+requestJsonObj);
	        String idx=requestJsonObj.getString("idx");
	        HashMap<String,Object> requestMap= new HashMap<>();
	        
	       
	        //대상토지 입력
	        JSONArray desangTogis=requestJsonObj.getJSONArray("togiDatas");
	        for(int i=0;i<desangTogis.length();i++) {
	        	HashMap<String,Object> sqlParams= new HashMap<>();
	        	JSONObject obj=new JSONObject(desangTogis.get(i).toString());
	        	log.info("obj:"+obj);
	        	
//	        	if(obj.getBoolean("togiCancelYn"))
//	        		log.info("#########################:"+obj.getString("togiCancelYn"));
	        	
	        	 String jisang_no="";
	        			 //"J_"+String.format("%06d",nseq);
	        	if (obj.getString("togiManageNo")==null || obj.getString("togiManageNo").toString().equals("") || obj.getString("togiManageNo")==null) {
	        		Object seq= mainService.selectCountQuery("jisangSQL.selectJisangMasterNextval",requestMap);
	    			int nseq=(int)seq;
	    			log.info("##seq###:"+seq);
	    			jisang_no="J_"+String.format("%06d",nseq);
	        	}
	        	else {
	        		jisang_no=obj.getString("togiManageNo");
	        	}
	        	
	        	
	        	
	        	sqlParams.put("jisang_no",jisang_no);
	        	
	        	
	        	
	        	sqlParams.put("togiCancelYn",obj.getString("togiCancelYn"));
	        	sqlParams.put("togiAccountYn",obj.getString("togiAccountYn"));
	        	sqlParams.put("togiDemise",obj.getString("togiDemise"));
	        	sqlParams.put("togiJasanNo",obj.getString("togiJasanNo"));
	        	sqlParams.put("togiJijukArea",obj.getString("togiJijukArea"));
	        	sqlParams.put("togiJimokText",obj.getString("togiJimokText"));
	        	sqlParams.put("togiPipeYn",obj.getString("togiPipeYn"));
	        	sqlParams.put("togiPyeonibArea",obj.getString("togiPyeonibArea"));
	        	sqlParams.put("togiTogiType",obj.getString("togiTogiType"));
	        	sqlParams.put("togiaddress",obj.getString("togiaddress"));
	        	sqlParams.put("togiBunhalStatus",obj.getString("togiBunhalStatus"));
	        	sqlParams.put("togiSidoNm",obj.getString("togiSidoNm"));
	        	sqlParams.put("togiSggNm",obj.getString("togiSggNm"));
	        	sqlParams.put("togiEmdNm",obj.getString("togiEmdNm"));
	        	sqlParams.put("togiRiNm",obj.getString("togiRiNm"));
	        	sqlParams.put("togiPnu",obj.getString("togiPnu"));
	        	sqlParams.put("togiJibun",obj.getString("togiJibun"));
	        	sqlParams.put("togiGoverOwnYn",obj.getString("togiGoverOwnYn"));
	        	
	        	
	        	sqlParams.put("bunhalDate",requestJsonObj.getString("bunhalDate"));
	        	sqlParams.put("bunhal_comment",requestJsonObj.getString("bunhal_comment"));
	        	sqlParams.put("bunhal_reason",requestJsonObj.getString("bunhal_reason"));
	        	sqlParams.put("bunhal_org_no",requestJsonObj.getString("bunhal_org_no"));
	        	sqlParams.put("bunhal_yn","Y");
	        	sqlParams.put("bunhal_jisa",requestJsonObj.getString("jisa"));
	        	
	        	
	        	sqlParams.put("cancelChuideukMoney",requestJsonObj.getString("cancelChuideukMoney"));
	        	sqlParams.put("cancelGammoney",requestJsonObj.getString("cancelGammoney"));
	        	sqlParams.put("cancelProfitLoss",requestJsonObj.getString("cancelProfitLoss"));
	        	sqlParams.put("cancelRemainderMoney",requestJsonObj.getString("cancelRemainderMoney"));
	        	
	        	
	        	
	        	//파일등록
	        	ArrayList<HashMap<String, String>> docArray = new ArrayList<>();
	    		log.info("req_doc_file01:"+requestJsonObj.getString("req_doc_file01"));
	    		if (requestJsonObj.getString("req_doc_file01")!=null && requestJsonObj.getString("req_doc_file01")!="" && !requestJsonObj.getString("req_doc_file01").equals("")) {
	    			HashMap<String,String> docMap = new HashMap();
	    			docMap.put("jisang_no",  jisang_no);
	    			docMap.put("fseq","1");
	    			docMap.put("file_name",  httpRequest.getParameter("req_doc_file01"));
	    			var fpath=GC.getJisangBunhalDataDir()+"/"+jisang_no;
	    			var tmp=GC.getJisangFileTempDir();
	    			log.info("fpath:"+fpath);
	    			docMap.put("file_path",  fpath);
	    			try {
	    			 CommonUtil.moveFile(requestJsonObj.getString("req_doc_file01"), tmp, fpath);
	    			}catch(Exception e) {
	    				
	    			}
	    			 docArray.add(docMap);
	    		}
	    		if (requestJsonObj.getString("req_doc_file02")!=null && requestJsonObj.getString("req_doc_file02")!="" && !requestJsonObj.getString("req_doc_file02").equals("")) {
	    			HashMap<String,String> docMap = new HashMap();
	    			docMap.put("jisang_no",  jisang_no);
	    			docMap.put("fseq","2");
	    			docMap.put("file_name",  requestJsonObj.getString("req_doc_file02"));
	    			var fpath=GC.getJisangBunhalDataDir()+"/"+jisang_no;
	    			var tmp=GC.getJisangFileTempDir();
	    			docMap.put("file_path",  fpath);
	    			 CommonUtil.moveFile(requestJsonObj.getString("req_doc_file02"), tmp, fpath);
	    			 docArray.add(docMap);
	    		}
	    		if (requestJsonObj.getString("req_doc_file03")!=null && requestJsonObj.getString("req_doc_file03")!="" && !requestJsonObj.getString("req_doc_file03").equals("")) {
	    			HashMap<String,String> docMap = new HashMap();
	    			docMap.put("jisang_no",  jisang_no);
	    			docMap.put("fseq","3");
	    			docMap.put("file_name",  requestJsonObj.getString("req_doc_file03"));
	    			var fpath=GC.getJisangBunhalDataDir()+"/"+jisang_no;
	    			var tmp=GC.getJisangFileTempDir();
	    			docMap.put("file_path",  fpath);
	    			 CommonUtil.moveFile(requestJsonObj.getString("req_doc_file03"), tmp, fpath);
	    			 docArray.add(docMap);
	    		}
	    		if (requestJsonObj.getString("req_doc_file04")!=null && requestJsonObj.getString("req_doc_file04")!="" && !requestJsonObj.getString("req_doc_file04").equals("")) {
	    			HashMap<String,String> docMap = new HashMap();
	    			docMap.put("jisang_no",  jisang_no);
	    			docMap.put("fseq","4");
	    			docMap.put("file_name",  requestJsonObj.getString("req_doc_file04"));
	    			var fpath=GC.getJisangBunhalDataDir()+"/"+jisang_no;
	    			var tmp=GC.getJisangFileTempDir();
	    			docMap.put("file_path",  fpath);
	    			 CommonUtil.moveFile(requestJsonObj.getString("req_doc_file04"), tmp, fpath);
	    			 docArray.add(docMap);
	    		}
	    		if (requestJsonObj.getString("req_doc_file05")!=null && requestJsonObj.getString("req_doc_file05")!="" && !requestJsonObj.getString("req_doc_file05").equals("")) {
	    			HashMap<String,String> docMap = new HashMap();
	    			docMap.put("jisang_no",  jisang_no);
	    			docMap.put("fseq","5");
	    			docMap.put("file_name",  requestJsonObj.getString("req_doc_file05"));
	    			var fpath=GC.getJisangBunhalDataDir()+"/"+jisang_no;
	    			var tmp=GC.getJisangFileTempDir();
	    			docMap.put("file_path",  fpath);
	    			 CommonUtil.moveFile(requestJsonObj.getString("req_doc_file05"), tmp, fpath);
	    			 docArray.add(docMap);
	    		}
	    		if (requestJsonObj.getString("req_doc_file06")!=null && requestJsonObj.getString("req_doc_file06")!="" && !requestJsonObj.getString("req_doc_file06").equals("")) {
	    			HashMap<String,String> docMap = new HashMap();
	    			docMap.put("jisang_no",  jisang_no);
	    			docMap.put("fseq","6");
	    			docMap.put("file_name",  requestJsonObj.getString("req_doc_file06"));
	    			var fpath=GC.getJisangBunhalDataDir()+"/"+jisang_no;
	    			var tmp=GC.getJisangFileTempDir();
	    			docMap.put("file_path",  fpath);
	    			 CommonUtil.moveFile(requestJsonObj.getString("req_doc_file06"), tmp, fpath);
	    			 docArray.add(docMap);
	    		}
	    		if (requestJsonObj.getString("req_doc_file07")!=null && requestJsonObj.getString("req_doc_file07")!="" && !requestJsonObj.getString("req_doc_file07").equals("")) {
	    			HashMap<String,String> docMap = new HashMap();
	    			docMap.put("jisang_no",  jisang_no);
	    			docMap.put("fseq","7");
	    			docMap.put("file_name",  requestJsonObj.getString("req_doc_file07"));
	    			var fpath=GC.getJisangBunhalDataDir()+"/"+jisang_no;
	    			var tmp=GC.getJisangFileTempDir();
	    			docMap.put("file_path",  fpath);
	    			 CommonUtil.moveFile(requestJsonObj.getString("req_doc_file07"), tmp, fpath);
	    			 docArray.add(docMap);
	    		}
	    		if (requestJsonObj.getString("req_doc_file08")!=null && requestJsonObj.getString("req_doc_file08")!="" && !requestJsonObj.getString("req_doc_file08").equals("")) {
	    			HashMap<String,String> docMap = new HashMap();
	    			docMap.put("jisang_no",  jisang_no);
	    			docMap.put("fseq","8");
	    			docMap.put("file_name",  requestJsonObj.getString("req_doc_file08"));
	    			var fpath=GC.getJisangBunhalDataDir()+"/"+jisang_no;
	    			var tmp=GC.getJisangFileTempDir();
	    			docMap.put("file_path",  fpath);
	    			 CommonUtil.moveFile(requestJsonObj.getString("req_doc_file08"), tmp, fpath);
	    			 docArray.add(docMap);
	    		}
	    		
	    		for(int j=0;j<docArray.size();j++) {
	    			log.info("arr"+docArray.get(j));
	    			HashMap<String,String> filesMap=docArray.get(j);
	    			log.info("filesMap:"+filesMap);
	    			 //JSONObject obbj=new JSONObject(docArray.get(i));
	    			 //log.info("obbj:"+obbj);
//	    			 HashMap<String,Object> filesMap=new HashMap<>();
//	    			 filesMap.put("jisang_no",obj.getString("jisang_no").toString());
//	    			 filesMap.put("fseq",obj.getString("fseq").toString());
//	    				filesMap.put("file_name",obj.getString("file_name").toString());
//	    			
//	    				filesMap.put("file_path",obj.getString("file_path").toString());
//	    			 log.info("filesMap:"+filesMap);
	    			Object count= mainService.selectCountQuery("jisangSQL.selectJisangBunhalAtcFileCount", filesMap);
	    			log.info("count:"+count);
	    			
	    			if ((int)count==0) {
	    				mainService.InsertQuery("jisangSQL.insertJisangBunhalAtcFile",filesMap);
	    			}
	    			else mainService.InsertQuery("jisangSQL.updateJisangBunhalAtcFile",filesMap);
	    		}
	    		
	    		//지상권번호로 존재여부 판단
	        	Object bunhalCount= mainService.selectCountQuery("jisangSQL.selectJisangBunhalChkCount", sqlParams);
    			log.info("bunhalCount:"+bunhalCount);
    			if((int)bunhalCount>0) {
    				//continue;
    				if (idx.equals(jisang_no)) {
    					//넘어온 idx 와 지상 번호가 같다면 지상마스터에도 업데이트를 한다
    					mainService.InsertQuery("jisangSQL.updateJisangBunhalMaster", sqlParams);
    					//임시저장일때는 하지 않는다
    					//mainService.InsertQuery("jisangSQL.updateJisangCancelData", sqlParams);
    				}
    				else {
    					mainService.InsertQuery("jisangSQL.updateJisangBunhalMaster", sqlParams);
    				}
    			}
    			else mainService.InsertQuery("jisangSQL.insertJisangBunhalMaster", sqlParams);
	        	
	        }
	        
	        
	        
//		ModelAndView mav=new ModelAndView();
//		HashMap params = new HashMap();
//		ArrayList<HashMap>  list=new ArrayList<HashMap>();
		//String httpRequest.getParameter("togiDatas");	//담당지사
//		JSONArray togiDatas=new JSONArray(httpRequest.getParameter("togiDatas").toString());
//		log.info("togiDatas:"+togiDatas);

//		String jisa = httpRequest.getParameter("jisa");	//담당지사
//		String yongdo = httpRequest.getParameter("yongdo");	//용도
//		String pipe_name = httpRequest.getParameter("pipe_name");	//관로명(구간)
//		String sun_gubun = httpRequest.getParameter("sun_gubun");	//단/복선
//		String sido_nm = httpRequest.getParameter("sido_nm");	//주소
//		String sgg_nm = httpRequest.getParameter("sgg_nm");	//주소
//		String ri_nm = httpRequest.getParameter("ri_nm");	//주소
//		String jibun = httpRequest.getParameter("jibun");	//주소
//		String jijuk_area = httpRequest.getParameter("jijuk_area");	//지적면적(m²)
//		String gover_own_yn = httpRequest.getParameter("gover_own_yn");	//국공유지여부
//
//		String jasan_no = httpRequest.getParameter("jasan_no");	//자산분류번호
//		String chuideuk_date = httpRequest.getParameter("chuideuk_date");	//취득일자
//		String pyeonib_area = httpRequest.getParameter("pyeonib_area");	//편입면적(m2)
//		String use_state = httpRequest.getParameter("use_state");	//사용현황
//		String deunggi_date = httpRequest.getParameter("deunggi_date");	 //등기일
//		String deunggi_no = httpRequest.getParameter("deunggi_no");	//등기번호
//		String deunggiso = httpRequest.getParameter("deunggiso");	//등기소
//		String dosiplan = httpRequest.getParameter("dosiplan");	//도시계획 결정여부
//
//		String account_yn = httpRequest.getParameter("account_yn");
//		String cancel_date = httpRequest.getParameter("cancel_date");
//		String chuideuk_money = httpRequest.getParameter("chuideuk_money");
//		String gammoney = httpRequest.getParameter("gammoney");
//		String remainder_money = httpRequest.getParameter("remainder_money");
//		String cancel_bosang_yn = httpRequest.getParameter("cancel_bosang_yn");
//		String cancel_bosang_money = httpRequest.getParameter("cancel_bosang_money");
//		String cancel_reason = httpRequest.getParameter("cancel_reason");
//		String cancel_comment = httpRequest.getParameter("cancel_comment");
//
//		String jisang_no = httpRequest.getParameter("jisang_no");
//		String jIdx = httpRequest.getParameter("jIdx");
//		
//		int docCount=0;
//		
//		
		
		
		
		
////		
//		params.put("jisa",jisa);
//		params.put("yongdo",yongdo);
//		params.put("pipe_name",pipe_name);
//		params.put("sun_gubun",sun_gubun);
//		params.put("sido_nm",sido_nm);
//		params.put("sgg_nm",sgg_nm);
//		params.put("ri_nm",ri_nm);
//		params.put("jibun",jibun);
//		if (jijuk_area != null && !jijuk_area.trim().isEmpty()) {
//			params.put("jijuk_area",Integer.parseInt(jijuk_area));
//		} else {
//			params.put("jijuk_area", null);
//		}
//		params.put("gover_own_yn",gover_own_yn);
//
//		params.put("jasan_no",jasan_no);
//		params.put("chuideuk_date",chuideuk_date);
//		if (pyeonib_area != null && !pyeonib_area.trim().isEmpty()) {
//			params.put("pyeonib_area",Integer.parseInt(pyeonib_area));
//		} else {
//			params.put("pyeonib_area", null);
//		}
//		params.put("use_state",use_state);
//		params.put("deunggi_date",deunggi_date);
//		params.put("deunggi_no",deunggi_no);
//		params.put("deunggiso",deunggiso);
//		params.put("dosiplan",dosiplan);
//
//		params.put("account_yn",account_yn);
//		params.put("cancel_date",cancel_date);
//		if (chuideuk_money != null && !chuideuk_money.trim().isEmpty()) {
//			params.put("chuideuk_money", Integer.parseInt(chuideuk_money));
//		} else {
//			params.put("chuideuk_money", null);
//		}
//		if (gammoney != null && !gammoney.trim().isEmpty()) {
//			params.put("gammoney",Integer.parseInt(gammoney));
//		} else {
//			params.put("gammoney", null);
//		}
//		if (remainder_money != null && !remainder_money.trim().isEmpty()) {
//			params.put("remainder_money",Integer.parseInt(remainder_money));
//		} else {
//			params.put("remainder_money", null);
//		}
//
//		params.put("cancel_bosang_yn",cancel_bosang_yn);
//
//		if (cancel_bosang_money != null && !cancel_bosang_money.trim().isEmpty()) {
//			params.put("cancel_bosang_money",Integer.parseInt(cancel_bosang_money));
//		} else {
//			params.put("cancel_bosang_money", null);
//		}
//		params.put("cancel_reason",cancel_reason);
//		params.put("cancel_comment",cancel_comment);
//
//		params.put("jisang_no",jisang_no);
//		//params.put("idx",Integer.parseInt(jIdx));
//
//		log.info("params:"+params);
//		
//		
//		//docMap.put("jisang_no", jisang_no);
//		for(int i=0;i<docArray.size();i++) {
//			log.info("arr"+docArray.get(i));
//			HashMap<String,String> filesMap=docArray.get(i);
//			log.info("filesMap:"+filesMap);
//			 //JSONObject obbj=new JSONObject(docArray.get(i));
//			 //log.info("obbj:"+obbj);
////			 HashMap<String,Object> filesMap=new HashMap<>();
////			 filesMap.put("jisang_no",obj.getString("jisang_no").toString());
////			 filesMap.put("fseq",obj.getString("fseq").toString());
////				filesMap.put("file_name",obj.getString("file_name").toString());
////			
////				filesMap.put("file_path",obj.getString("file_path").toString());
////			 log.info("filesMap:"+filesMap);
//			Object count= mainService.selectCountQuery("jisangSQL.selectJisangReqDoc1Count", filesMap);
//			log.info("count:"+count);
//			
//			if ((int)count==0) {
//				mainService.InsertQuery("jisangSQL.insertJisangReqDoc1",filesMap);
//			}
//			else mainService.InsertQuery("jisangSQL.updateJisangReqDoc1",filesMap);
//		}
//		//log.info("docMap:"+docMap);
//		
//		mainService.InsertQuery("jisangSQL.upsertJisangMasterTmp",params);
//		
//		
	        HashMap<String,Object> resultmap=new HashMap();
	        resultmap.put("resultCode","0000");
	        resultmap.put("params", requestJsonObj);
	        resultmap.put("resultData","");
	        resultmap.put("resultMessage","success");
	        JSONObject obj =new JSONObject(resultmap);
//	        System.out.println(obj);
	       
	      //log.info("jo:"+jo);
	      			response.setCharacterEncoding("UTF-8");
	      			response.setHeader("Access-Control-Allow-Origin", "*");
	      			response.setHeader("Cache-Control", "no-cache");
	      			response.resetBuffer();
	      			response.setContentType("application/json");
	      			//response.getOutputStream().write(jo);
	      			response.getWriter().print(obj);
	      			response.getWriter().flush();
		
		
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
		
		int docCount=0;
		
		
		ArrayList<HashMap<String, String>> docArray = new ArrayList<>();
		if (httpRequest.getParameter("req_doc_file01")!=null && httpRequest.getParameter("req_doc_file01")!="" && !httpRequest.getParameter("req_doc_file01").equals("")) {
			HashMap<String,String> docMap = new HashMap();
			docMap.put("jisang_no",  jisang_no);
			docMap.put("fseq","1");
			docMap.put("file_name",  httpRequest.getParameter("req_doc_file01"));
			var fpath=GC.getJisangReqDoc1Dir();
			var tmp=GC.getJisangFileTempDir();
			docMap.put("file_path",  fpath);
			 CommonUtil.moveFile(httpRequest.getParameter("req_doc_file01"), tmp, fpath);
			 docArray.add(docMap);
		}
		if (httpRequest.getParameter("req_doc_file02")!=null && httpRequest.getParameter("req_doc_file02")!="" && !httpRequest.getParameter("req_doc_file02").equals("")) {
			HashMap<String,String> docMap = new HashMap();
			docMap.put("jisang_no",  jisang_no);
			docMap.put("fseq","2");
			docMap.put("file_name",  httpRequest.getParameter("req_doc_file02"));
			var fpath=GC.getJisangReqDoc1Dir();
			var tmp=GC.getJisangFileTempDir();
			docMap.put("file_path",  fpath);
			 CommonUtil.moveFile(httpRequest.getParameter("req_doc_file02"), tmp, fpath);
			 docArray.add(docMap);
		}
		if (httpRequest.getParameter("req_doc_file03")!=null && httpRequest.getParameter("req_doc_file03")!="" && !httpRequest.getParameter("req_doc_file03").equals("")) {
			HashMap<String,String> docMap = new HashMap();
			docMap.put("jisang_no",  jisang_no);
			docMap.put("fseq","3");
			docMap.put("file_name",  httpRequest.getParameter("req_doc_file03"));
			var fpath=GC.getJisangReqDoc1Dir();
			var tmp=GC.getJisangFileTempDir();
			docMap.put("file_path",  fpath);
			 CommonUtil.moveFile(httpRequest.getParameter("req_doc_file03"), tmp, fpath);
			 docArray.add(docMap);
		}
		if (httpRequest.getParameter("req_doc_file04")!=null && httpRequest.getParameter("req_doc_file04")!="" && !httpRequest.getParameter("req_doc_file04").equals("")) {
			HashMap<String,String> docMap = new HashMap();
			docMap.put("jisang_no",  jisang_no);
			docMap.put("fseq","4");
			docMap.put("file_name",  httpRequest.getParameter("req_doc_file04"));
			var fpath=GC.getJisangReqDoc1Dir();
			var tmp=GC.getJisangFileTempDir();
			docMap.put("file_path",  fpath);
			 CommonUtil.moveFile(httpRequest.getParameter("req_doc_file04"), tmp, fpath);
			 docArray.add(docMap);
		}
		if (httpRequest.getParameter("req_doc_file05")!=null && httpRequest.getParameter("req_doc_file05")!="" && !httpRequest.getParameter("req_doc_file05").equals("")) {
			HashMap<String,String> docMap = new HashMap();
			docMap.put("jisang_no",  jisang_no);
			docMap.put("fseq","5");
			docMap.put("file_name",  httpRequest.getParameter("req_doc_file05"));
			var fpath=GC.getJisangReqDoc1Dir();
			var tmp=GC.getJisangFileTempDir();
			docMap.put("file_path",  fpath);
			 CommonUtil.moveFile(httpRequest.getParameter("req_doc_file05"), tmp, fpath);
			 docArray.add(docMap);
		}
		if (httpRequest.getParameter("req_doc_file06")!=null && httpRequest.getParameter("req_doc_file06")!="" && !httpRequest.getParameter("req_doc_file06").equals("")) {
			HashMap<String,String> docMap = new HashMap();
			docMap.put("jisang_no",  jisang_no);
			docMap.put("fseq","6");
			docMap.put("file_name",  httpRequest.getParameter("req_doc_file06"));
			var fpath=GC.getJisangReqDoc1Dir();
			var tmp=GC.getJisangFileTempDir();
			docMap.put("file_path",  fpath);
			 CommonUtil.moveFile(httpRequest.getParameter("req_doc_file06"), tmp, fpath);
			 docArray.add(docMap);
		}
		if (httpRequest.getParameter("req_doc_file07")!=null && httpRequest.getParameter("req_doc_file07")!="" && !httpRequest.getParameter("req_doc_file07").equals("")) {
			HashMap<String,String> docMap = new HashMap();
			docMap.put("jisang_no",  jisang_no);
			docMap.put("fseq","7");
			docMap.put("file_name",  httpRequest.getParameter("req_doc_file07"));
			var fpath=GC.getJisangReqDoc1Dir();
			var tmp=GC.getJisangFileTempDir();
			docMap.put("file_path",  fpath);
			 CommonUtil.moveFile(httpRequest.getParameter("req_doc_file07"), tmp, fpath);
			 docArray.add(docMap);
		}
		if (httpRequest.getParameter("req_doc_file08")!=null && httpRequest.getParameter("req_doc_file08")!="" && !httpRequest.getParameter("req_doc_file08").equals("")) {
			HashMap<String,String> docMap = new HashMap();
			docMap.put("jisang_no",  jisang_no);
			docMap.put("fseq","8");
			docMap.put("file_name",  httpRequest.getParameter("req_doc_file08"));
			var fpath=GC.getJisangReqDoc1Dir();
			var tmp=GC.getJisangFileTempDir();
			docMap.put("file_path",  fpath);
			 CommonUtil.moveFile(httpRequest.getParameter("req_doc_file08"), tmp, fpath);
			 docArray.add(docMap);
		}
//		
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
		
		
		//docMap.put("jisang_no", jisang_no);
		for(int i=0;i<docArray.size();i++) {
			log.info("arr"+docArray.get(i));
			HashMap<String,String> filesMap=docArray.get(i);
			log.info("filesMap:"+filesMap);
			 //JSONObject obbj=new JSONObject(docArray.get(i));
			 //log.info("obbj:"+obbj);
//			 HashMap<String,Object> filesMap=new HashMap<>();
//			 filesMap.put("jisang_no",obj.getString("jisang_no").toString());
//			 filesMap.put("fseq",obj.getString("fseq").toString());
//				filesMap.put("file_name",obj.getString("file_name").toString());
//			
//				filesMap.put("file_path",obj.getString("file_path").toString());
//			 log.info("filesMap:"+filesMap);
			Object count= mainService.selectCountQuery("jisangSQL.selectJisangReqDoc1Count", filesMap);
			log.info("count:"+count);
			
			if ((int)count==0) {
				mainService.InsertQuery("jisangSQL.insertJisangReqDoc1",filesMap);
			}
			else mainService.InsertQuery("jisangSQL.updateJisangReqDoc1",filesMap);
		}
		//log.info("docMap:"+docMap);
		
		mainService.InsertQuery("jisangSQL.upsertJisangMasterTmp",params);
		
		
		
		
		
	}
	
	
	@PostMapping(path="/deleteJisangTmpFile")
	public void deleteJisangTmpFile(HttpServletRequest httpRequest, HttpServletResponse response) throws Exception {
		ModelAndView mav=new ModelAndView();
		HashMap params = new HashMap();
		String dfile_name=httpRequest.getParameter("dfile_name");
		String manage_no=httpRequest.getParameter("jisang_no");
		String fseq=httpRequest.getParameter("fseq");
		String docNo=(httpRequest.getParameter("docNo")==null)? "1" :httpRequest.getParameter("docNo");
		
		
		HashMap param=new HashMap();
		
		param.put("fname",dfile_name);
		param.put("manage_no", manage_no);
		param.put("fseq", fseq);
		
		log.info("param:"+param);
		log.info("docNo:"+docNo);
		var fpath=GC.getJisangReqDoc1Dir();
		var tmp=GC.getJisangFileTempDir();
		if (docNo=="1") mainService.DeleteQuery("jisangSQL.jisangReqDoc1Delete", param);
		else if (docNo=="2") mainService.DeleteQuery("jisangSQL.jisangReqDoc2Delete", param);
		 CommonUtil.delFile(dfile_name, tmp);
		 CommonUtil.delFile(dfile_name, fpath);
		
		 log.info("dfile_name:"+dfile_name);
		
		
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
	
	@GetMapping(path="/usePermitRegister") //http://localhost:8080/api/get/dbTest
    public ModelAndView usePermitRegister(HttpServletRequest httpRequest, HttpServletResponse response) throws Exception {
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
		ArrayList<HashMap> sidolist = mainService.selectQuery("commonSQL.getSidoMaster",params);
		ArrayList<HashMap> jisalist = mainService.selectQuery("commonSQL.selectAllJisaList",params);
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
		
		ArrayList<HashMap> reqDoc2list = mainService.selectQuery("jisangSQL.selectJisangReqDoc2",params);
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
		log.info("reqDoc2list:"+reqDoc2list);
		
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
      			mav.addObject("jisaList",jisalist);
      			mav.addObject("sidoList",sidolist);
      			mav.addObject("jisangIssueCodeAtcFileList",jisangIssueCodeAtcFileList);
      			mav.addObject("reqDoc2list",reqDoc2list);
      			mav.setViewName("content/jisang/usePermitRegister");
      			return mav;
    }
	@PostMapping(path="/getJibunAddress") //http://localhost:8080/api/get/dbTest
	public ModelAndView getJibunAddress(HttpServletRequest httpRequest, HttpServletResponse response) throws Exception {
		ModelAndView mav=new ModelAndView();
		HashMap params = new HashMap();
		ArrayList<HashMap>  list=new ArrayList<HashMap>();
		//log.info("httpRequest:"+Arrays.toString(httpRequest));

		String address=httpRequest.getParameter("address");
		String sido_nm = httpRequest.getParameter("sido_nm");	//주소
		String sgg_nm = httpRequest.getParameter("sgg_nm");	//주소
		String emd_nm = httpRequest.getParameter("emd_nm");	//주소
		String ri_nm = httpRequest.getParameter("ri_nm");	//주소
		String jibun = httpRequest.getParameter("jibun");	//주소
		String pnu = httpRequest.getParameter("pnu");

		if (ri_nm != null) {
			params.put("ri_nm",ri_nm);
		} else {
			params.put("ri_nm", "");
		}

		params.put("address", address);
		params.put("sido_nm",sido_nm);
		params.put("sgg_nm",sgg_nm);
		params.put("emd_nm",emd_nm);
		params.put("ri_nm",ri_nm);
		params.put("jibun", jibun);
		params.put("pnu", pnu);

		log.info("params:"+params);
		ArrayList<HashMap> addressList = mainService.selectQuery("jisangSQL.bunhalAddressSearch",params);
		mav.addObject("addressList",addressList);
		mav.setViewName("content/jisang/divisionRegister :: #searchResultPopDiv");
		return mav;
	}
	
	@PostMapping(path="/getBunhalJIjukSelect") //http://localhost:8080/api/get/dbTest
	public ModelAndView getBunhalJIjukSelect(HttpServletRequest httpRequest, HttpServletResponse response) throws Exception {
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
		mav.setViewName("content/jisang/divisionRegister :: #searchResultPopDiv");
		return mav;
	}
	
	//지상권사용승락 주소 검색
	@PostMapping(path="/getPermitJisangSelect") //http://localhost:8080/api/get/dbTest
	public ModelAndView getPermitJisangSelect(HttpServletRequest httpRequest, HttpServletResponse response) throws Exception {
		ModelAndView mav=new ModelAndView();
		HashMap params = new HashMap();
		ArrayList<HashMap>  list=new ArrayList<HashMap>();
		//log.info("httpRequest:"+Arrays.toString(httpRequest));

		
		String sido_nm=httpRequest.getParameter("sido");
		String sgg_nm=httpRequest.getParameter("gugun");
		String emd_nm=httpRequest.getParameter("dong");
		String ri_nm=httpRequest.getParameter("ri");
		String jibun=httpRequest.getParameter("jibun");
		String jisa=httpRequest.getParameter("jisa");
		


		params.put("address", sido_nm+' '+sgg_nm+' '+emd_nm+' '+ri_nm+' '+jibun);
		params.put("sido_nm", sido_nm);
		params.put("sgg_nm", sgg_nm);
		params.put("emd_nm", emd_nm);
		params.put("ri_nm", ri_nm);
		params.put("jibun", jibun);
		params.put("jisa", jisa);
		
		

		log.info("params:"+params);
		ArrayList<HashMap> jisangList = mainService.selectQuery("jisangSQL.selectJisangJijukList",params);
		//log.info("jisangList:"+jisangList);
		mav.addObject("jisangList",jisangList);
		mav.setViewName("content/jisang/usePermitRegister :: #searchResultPopDiv");
		return mav;
	}
	
	
	@GetMapping(path="/usePermitDetail") //http://localhost:8080/api/get/dbTest
    public ModelAndView usePermitDetail(HttpServletRequest httpRequest, HttpServletResponse response) throws Exception {
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
		
		ArrayList<HashMap> data = mainService.selectQuery("jisangSQL.selectPermitData",params);
		//ArrayList<HashMap> data = mainService.selectQuery("jisangSQL.selectPermitData",params);
		
		log.info("data:"+data);
      			mav.addObject("resultData",data.get(0));
      			
      			
      			mav.setViewName("content/jisang/usePermitDetail");
      			return mav;
    }
	
	@GetMapping(path="/usePermitEdit") //http://localhost:8080/api/get/dbTest
    public ModelAndView usePermitEdit(HttpServletRequest httpRequest, HttpServletResponse response) throws Exception {
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
		
		ArrayList<HashMap> data = mainService.selectQuery("jisangSQL.selectPermitData",params);
		
		
      			mav.addObject("resultData",data.get(0));
      			
      			mav.setViewName("content/jisang/usePermitEdit");
      			return mav;
    }

	@GetMapping(path="/landRightMerge") //http://localhost:8080/api/get/dbTest
	public ModelAndView landRightMerge(HttpServletRequest httpRequest, HttpServletResponse response) throws Exception {
		HashMap params = new HashMap();
		ArrayList<HashMap>  list=new ArrayList<HashMap>();

		String idx = httpRequest.getParameter("idx");
		String index = httpRequest.getParameter("index");

		params.put("idx",idx);
		params.put("manage_no",idx);
		params.put("index",index);
		log.info("params:"+params);

		//ArrayList<HashMap> data = mainService.selectQuery("jisangSQL.selectAllData",params);
//		ArrayList<HashMap> soujaList = mainService.selectQuery("jisangSQL.selectSoyujaData",params);
//		ArrayList<HashMap> atcFileList = mainService.selectQuery("jisangSQL.selectAtcFileList",params);
//
//		//임시 저장 된 테이블 조회 시 있으면, 해당 테이블 뿌리기.
//		ArrayList<HashMap> dataTmp = mainService.selectQuery("jisangSQL.selectAllTmpData",params);
//		if(dataTmp.size() > 0) {
//			// dataTmp의 데이터를 하나씩 처리
//			HashMap<String, Object> tmpMap = dataTmp.get(0);
//			HashMap<String, Object> newMap = new HashMap<>();
//
//			// tmpMap의 모든 키를 순회하면서 "jmt_"를 "jm_"으로 바꾼 후 newMap에 넣음
//			for (Map.Entry<String, Object> entry : tmpMap.entrySet()) {
//				String newKey = entry.getKey().replace("jmt_", "jm_");
//				newMap.put(newKey, entry.getValue());
//			}
//			data.remove(0);
//			data.add(newMap);
//		}
//
//		ArrayList<HashMap> jisangPermitList = mainService.selectQuery("jisangSQL.selectPermitList",params);
//		ArrayList<HashMap> jisangModifyList = mainService.selectQuery("jisangSQL.selectModifyList",params);
//		ArrayList<HashMap> jisangMergeList = mainService.selectQuery("jisangSQL.selectMergeList",params);
//
//		params.put("pnu", data.get(0).get("jm_pnu"));
//
//		ArrayList<HashMap> jisangPnuAtcFileList = mainService.selectQuery("jisangSQL.selectPnuAtcFileList",params);
//
//		ArrayList<HashMap> jisalist = mainService.selectQuery("commonSQL.selectAllJisaList",params);
//		ArrayList<HashMap> jimoklist = mainService.selectQuery("commonSQL.selectJimokList",params);
//		ArrayList<HashMap> sidolist = mainService.selectQuery("commonSQL.getSidoMaster",params);
//
//		log.info("params:"+params);
//		log.info("sidolist:"+sidolist);
//		log.info("data:"+data.get(0));
//		log.info("jm_pipe_yn:"+data.get(0).get("jm_pipe_yn"));
//		log.info("jm_youngdo:"+data.get(0).get("jm_youngdo"));
//		log.info("jm_pipe_name:"+data.get(0).get("jm_pipe_name"));
//		log.info("jm_jijuk_area:"+data.get(0).get("jm_jijuk_area"));
//		log.info("jisangPermitList:"+jisangPermitList);
//		log.info("souja count:"+soujaList.size());
//		log.info("soujaList:"+soujaList);
//		log.info("atcFileList:"+atcFileList);
//		log.info("jisangPnuAtcFileList:"+jisangPnuAtcFileList);

		ModelAndView mav=new ModelAndView();
//		mav.addObject("jisaList",jisalist);
//		mav.addObject("resultJimokList",jimoklist);
//		mav.addObject("sidoList",sidolist);
//
//		mav.addObject("resultData",data.get(0));
//		mav.addObject("soujaList",soujaList);
//		mav.addObject("jisangPermitList",jisangPermitList);
//		mav.addObject("atcFileList",atcFileList);
//		mav.addObject("jisangModifyList",jisangModifyList);
//		mav.addObject("jisangMergeList",jisangMergeList);
//
//		mav.addObject("jisangPnuAtcFileList",jisangPnuAtcFileList);
		mav.setViewName("content/jisang/landRightMerge");
		return mav;
	}

	@GetMapping(path="/approval") // 전자결재-지상권해지등록
    public ModelAndView approval(HttpServletRequest httpRequest, HttpServletResponse response) throws Exception {
		ModelAndView mav=new ModelAndView();
		mav.setViewName("content/jisang/approval");
		return mav;
	}
	
	@GetMapping(path="/approval2") // 전자결재-지상권분할등록
    public ModelAndView approval2(HttpServletRequest httpRequest, HttpServletResponse response) throws Exception {
		ModelAndView mav=new ModelAndView();
		mav.setViewName("content/jisang/approval2");
		return mav;
	}

	@GetMapping(path="/approval3") // 전자결재-지상권합필등록
    public ModelAndView approval3(HttpServletRequest httpRequest, HttpServletResponse response) throws Exception {
		ModelAndView mav=new ModelAndView();
		mav.setViewName("content/jisang/approval3");
		return mav;
	}

	@GetMapping(path="/approval4") // 전자결재-지상권사용승낙등록
    public ModelAndView approval4(HttpServletRequest httpRequest, HttpServletResponse response) throws Exception {
		ModelAndView mav=new ModelAndView();
		mav.setViewName("content/jisang/approval4");
		return mav;
	}

}
