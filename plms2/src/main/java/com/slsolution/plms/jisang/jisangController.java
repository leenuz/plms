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
@RequestMapping("/land/jisang")
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
	@RequestMapping(value="/usePermitRegisterSave1", method = {RequestMethod.GET, RequestMethod.POST}) //http://localhost:8080/api/get/dbTest
    public void usePermitRegisterSave1(HttpServletRequest httpRequest, HttpServletResponse response) throws Exception {
        
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
	
	
	// 지상권 사용승락 등록 insertJisangPmtList
	@Transactional
	@RequestMapping(value="/usePermitRegisterSave", method = {RequestMethod.GET, RequestMethod.POST}) //http://localhost:8080/api/get/dbTest
		public void insertJisangPmtList(HttpServletRequest request, HttpServletResponse response) throws Exception {

		
		String requestParams = ParameterUtil.getRequestBodyToStr(request);
        log.info("requestParams:"+requestParams);
        JSONObject requestJsonObj=new JSONObject(requestParams);
        
        
        JSONArray togiArr=new JSONArray(requestJsonObj.getString("desangTogis"));
			ArrayList list = new ArrayList();
			ParameterParser parser = new ParameterParser(request);

			String GUBUN = requestJsonObj.getString("gubun"); // 구분( modify : 수정, insert
															// : 등록 )
			//String TOGICNT = requestJsonObj.getString("TOGICNT"); // 대상토지 수
			String PMT_NO =requestJsonObj.has("pmt_no")?requestJsonObj.getString("pmt_no"):""; // 승락등록 번호
			String USE_PURPOS = requestJsonObj.getString("purpose"); // 사용목적
			String USE_ST_DATE = requestJsonObj.getString("useStartDate"); // 사용기간 시작
			String USE_ED_DATE = requestJsonObj.getString("useEndDate"); // 사용기간 끝
			String SPOT_RESULT = requestJsonObj.getString("spot_result"); // 현장확인결과
			String REVIEW = requestJsonObj.getString("review"); // 검토의견
			String CONTRACT = requestJsonObj.getString("contract"); // 약정사항
			String PMT_STATUS = requestJsonObj.getString("pmt_status"); // 등록상태
			String str_result = "Y";
			String resp_PMT_NO = "";
			try {
				HashMap params = new HashMap();
				params.put("USE_PURPOS", USE_PURPOS);
				params.put("USE_ST_DATE", USE_ST_DATE);
				params.put("USE_ED_DATE", USE_ED_DATE);
				params.put("SPOT_RESULT", SPOT_RESULT);
				params.put("REVIEW", REVIEW);
				params.put("CONTRACT", CONTRACT);
				params.put("PMT_STATUS", PMT_STATUS);

				/**********************
				 * 다음 지상권 번호 조회 시작
				 **********************/
				if (GUBUN.equals("modify")) {
					resp_PMT_NO = PMT_NO;
					params.put("PMT_NO", PMT_NO);
				} else {
					ArrayList PmtList = (ArrayList) mainService.selectQuery("jisangSQL.selectJisangPmtNextNo", null);
					int no=Integer.parseInt((((HashMap) PmtList.get(0)).get("now_pmt_no").toString()).toString());
					String Next_pmtNo =  String.valueOf(no + 1);
					//String Next_pmtNo = String.valueOf(Integer.parseInt((String) ((HashMap) PmtList.get(0)).get("now_pmt_no")) + 1);
					int n_Next_pmtNo = Next_pmtNo.length();

					String add_Zero = "";
					for (int i = 0; i < (6 - n_Next_pmtNo); i++) {
						add_Zero += "0";
					}
					Next_pmtNo = "P_" + add_Zero + Next_pmtNo;

					resp_PMT_NO = Next_pmtNo;
					params.put("PMT_NO", Next_pmtNo);
				}
				log.info("resp_PMT_NO:"+resp_PMT_NO);
				/***********************
				 * 다음 지상권 번호 조회 끝
				 ************************/

				if (GUBUN.equals("insert")) {
					mainService.InsertQuery("jisangSQL.insertPermitMaster", params); // 기본정보
																						// 저장
				} else if (GUBUN.equals("modify")) {
					mainService.UpdateQuery("jisangSQL.updatePermitMaster", params); // 기본정보
																						// 수정
				}

				// 대상토지
				for (int i = 0; i < togiArr.length(); i++) {
					JSONObject obj=new JSONObject(togiArr.get(i).toString());
					log.info("obj:"+obj);
					String JISANG_NO = obj.getString("togiManageNo"); // 지상권번호
					String ADDRESS = obj.getString("togiaddress"); // 주소
					String JIMOK = obj.getString("togiJimokText"); // 지목
					String JIJUK = obj.getString("togiJijukArea"); // 전체면적
					String PYENIB = obj.getString("togiPyeonibArea"); // 설정면적
					String MONEY = obj.getString("togiSetMoney"); // 설정금액
					String JASAN_NO = obj.getString("togiJasanNo"); // 자산분류번호
					String SOUJA = obj.getString("togiSouja"); // 소유자
					String USER = obj.getString("togiUseName"); // 사용자
					if(JIJUK == null || "".equals(JIJUK)) {
						JIJUK = "0";
					}
					if(PYENIB == null || "".equals(PYENIB)) {
						PYENIB = "0";
					}
					String SIDO_NM = obj.getString("sido_nm");
					String SGG_NM = obj.getString("sgg_nm");
					String EMD_NM = obj.getString("emd_nm");
					String RI_NM = obj.getString("ri_nm");
					String JIBUN = obj.getString("jibun");
					String ADDRCODE = obj.has("addrcode")?obj.getString("addrcode"):"";
					
					params.put("ADDRESS", ADDRESS);
					params.put("JIMOK", JIMOK);
					params.put("JIJUK", JIJUK);
					params.put("PYENIB", PYENIB);
					params.put("MONEY", MONEY);
					params.put("JASAN_NO", JASAN_NO);
					params.put("SOUJA", SOUJA);
					params.put("USER", USER);
					params.put("SIDO_NM", SIDO_NM);
					params.put("SGG_NM", SGG_NM);
					params.put("EMD_NM", EMD_NM);
					params.put("RI_NM", RI_NM);
					params.put("JIBUN", JIBUN);
					params.put("JISANG_NO", JISANG_NO);
					

					if (GUBUN.equals("modify")) {
						if (i == 0) {
							mainService.UpdateQuery("jisangSQL.deletePermitTogiList", params); // 기존
																								// 정보
																								// 삭제
						}
					}
					mainService.InsertQuery("jisangSQL.insertPermitTogiList", params); // 대상토지
																						// 테이블
																						// 저장
				}

				// 해당 p_no에 대한것 삭제
				mainService.DeleteQuery("jisangSQL.jisangReqDoc2FileDelete", params);
				//사용승락 첨부서류 등록
		        for(int i=1;i<11;i++) {
		        	String key=String.format("%02d",i);
		        	if (requestJsonObj.getString("req_doc_file"+key)!=null) {
		        		log.info("Key:"+key);
		        		String fname=requestJsonObj.getString("req_doc_file"+key);
		        		log.info("fname:"+fname);
		        		if (fname.equals("") || fname==null ) continue;
		        		
		        		
		        		HashMap<String, Object> filesMap= new HashMap<>();
		        		filesMap.put("PMT_NO",resp_PMT_NO);
		    			//filesMap.put("seq",String.format("%06d",i));
		    			filesMap.put("fseq",i);
		    			filesMap.put("FILE_GUBUN",Integer.parseInt(key));
		    			filesMap.put("FILE_NM",fname);
		    			 String tempPath = GC.getJisangFileTempDir(); //설정파일로 뺀다.
		     			 String dataPath = GC.getJisangFileDataDir()+"/jisangPermit/"+resp_PMT_NO; //설정파일로 뺀다.
		     			 log.info("tepPath:"+tempPath);
		     			log.info("dataPath:"+dataPath);
		     			 filesMap.put("FILE_PATH",dataPath+"/"+fname);
		     			 CommonUtil.moveFile(fname, tempPath, dataPath);
		     			log.info("filesMap:"+filesMap);
		     			
		     			
		     			
		     			//해당파일있는지체크 
//		     			int fcount=(int)mainService.selectCountQuery("jisangSQL.selectPermitFileCount", filesMap);
//		     			log.info("fcount:"+fcount);
//		     			if (fcount>0) mainService.InsertQuery("jisangSQL.updatePermitFile", filesMap);
		     			mainService.InsertQuery("jisangSQL.insertPermitFile", filesMap);
		        	}
		        }
				// 첨부파일
//				MultipartHttpServletRequest multipart = (MultipartHttpServletRequest) request;
//				List<HashMap> listfile;
//				FileManager fm = new FileManager();
//
//				for (int i = 1; i < 7; i++) {
//
//					String FILE_UPDATE_YN = parser.getString("FILE_UPDATE_YN_" + String.valueOf(i), "");
//					listfile = fm.upload(multipart, "FILE" + i);
//
//					if (listfile != null && listfile.size() > 0) {
//						params.put("FILE_NM", listfile.get(0).get("fileName"));
//						params.put("FILE_PATH", listfile.get(0).get("filePath"));
//						params.put("FILE_GUBUN", String.valueOf(i));
//						// 파일구분 1: 토지사용 승낙서, 2:등기부등본 및 토지대장, 3:위치도및지적도, 4:현장사진,
//						// 5:검토의견서, 6:부속서류
//
//						if (FILE_UPDATE_YN.equals("Y")) {
//							if (GUBUN.equals("modify")) {
//								Database.getInstance().update("Json.deletePermitFile", params); // 파일이
//																								// 변경되었다면
//																								// 기존파일
//																								// 삭제
//							}
//							Database.getInstance().insert("Json.insertPermitFile", params);
//						}
//					} else {
//						if (!FILE_UPDATE_YN.equals("Y")) {
//							params.put("FILE_GUBUN", i);
//							Database.getInstance().update("Json.deletePermitFile", params); // 파일을
//																							// 등록하지
//																							// 않았다면
//																							// 기존파일
//																							// 삭제
//						}
//					}
//
//				}

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
			map.put("PMT_NO", resp_PMT_NO);

			JSONObject jo = new JSONObject(map);

			response.setCharacterEncoding("UTF-8");
			response.setHeader("Access-Control-Allow-Origin", "*");
			response.resetBuffer();
			response.setContentType("application/json");
			response.getWriter().print(jo);
			response.getWriter().flush();

		}
	
	
	

	// 지상권 사용승락 상세조회
	@RequestMapping(value="/selectJisangPmtDetailList", method = {RequestMethod.GET, RequestMethod.POST}) 
	public void selectJisangPmtDetailList(HttpServletRequest request, HttpServletResponse response) throws Exception {
		ArrayList list = new ArrayList();
		ArrayList togiList = new ArrayList();
		ArrayList fileList = new ArrayList();

		ParameterParser parser = new ParameterParser(request);
		String PMT_NO = parser.getString("PMT_NO", "");
		String loginKey = String.valueOf(request.getSession().getAttribute("loginKey"));
		String str_UserGroup = String.valueOf(request.getSession().getAttribute("user_rights_GROUP"));

		String str_result = "Y";
		HashMap map = new HashMap();

		try {

			HashMap params = new HashMap();
			params.put("PMT_NO", PMT_NO);

			list = (ArrayList) mainService.selectQuery("jisangSQL.selectJisangPmtDetail_MASTER", params);
			togiList = (ArrayList) mainService.selectQuery("jisangSQL.selectJisangPmtDetail_TOGI", params);
			fileList = (ArrayList) mainService.selectQuery("jisangSQL.selectJisangPmtDetail_FILE", params);

			// 문서 URL조회
			ArrayList echolist = (ArrayList) mainService.selectQuery("jisangSQL.selectDocInfo", params);
			// System.out.println(" echolist.size()=" + echolist.size());
			if (null != echolist && echolist.size() > 0) {
				String str_STATUS = String.valueOf(((HashMap) echolist.get(0)).get("STATUS"));
				String str_OUT_FLAG = String.valueOf(((HashMap) echolist.get(0)).get("OUT_FLAG"));
				String str_OUT_URL = String.valueOf(((HashMap) echolist.get(0)).get("OUT_URL"));
				map.put("STATUS", str_STATUS);
				map.put("OUT_FLAG", str_OUT_FLAG);
				map.put("OUT_URL", str_OUT_URL);
			}
		} catch (Exception e) {
			str_result = "N";
			e.printStackTrace();
		}

		if (list != null)
			map.put("count", list.size());
		else
			map.put("count", 0);

		if (togiList != null)
			map.put("togiCount", togiList.size());
		else
			map.put("togiCount", 0);

		if (fileList != null)
			map.put("fileCount", fileList.size());
		else
			map.put("fileCount", 0);

		map.put("message", str_result);
		map.put("list", list);
		map.put("togiList", togiList);
		map.put("fileList", fileList);
		map.put("loginKey", loginKey);
		map.put("userGroup", str_UserGroup);

		JSONObject jo = new JSONObject(map);

		response.setCharacterEncoding("UTF-8");
		response.setHeader("Access-Control-Allow-Origin", "*");
		response.resetBuffer();
		response.setContentType("application/json");
		response.getWriter().print(jo);
		response.getWriter().flush();
	}
	
	
	// 지상권 사용승락 상신
	@Transactional
	@RequestMapping(value="/selectJisangPmtDetailListAppoval", method = {RequestMethod.GET, RequestMethod.POST}) 
	public void selectJisangPmtDetailListAppoval(HttpServletRequest request, HttpServletResponse response) throws Exception {
		
		String requestParams = ParameterUtil.getRequestBodyToStr(request);
        log.info("requestParams:"+requestParams);
        JSONObject requestJsonObj=new JSONObject(requestParams);
        

		// String requestParams = ParameterUtil.getRequestBodyToStr(request);
		 log.info("requestParams:"+requestParams);
			ArrayList list = new ArrayList();
			ArrayList togiList = new ArrayList();
			ArrayList fileList = new ArrayList();
			log.info("request:"+request);
			//ParameterParser parser = new ParameterParser(request);
			String PMT_NO = requestJsonObj.getString("PMT_NO");
			//String PMT_NO = parser.getString("PMT_NO", "");
			//String loginKey = String.valueOf(request.getSession().getAttribute("loginKey"));
			String loginKey=request.getParameter("loginKey");
log.info("loginKey:"+loginKey);
log.info("PMT_NO:"+PMT_NO);
			String str_result = "Y";
			try {

				HashMap params = new HashMap();
				params.put("PMT_NO", PMT_NO);

				list = (ArrayList) mainService.selectQuery("jisangSQL.selectJisangPmtDetail_MASTER", params); // 상세내용
				togiList = (ArrayList) mainService.selectQuery("jisangSQL.selectJisangPmtDetail_TOGI", params); // 대상토지
				fileList = (ArrayList) mainService.selectQuery("jisangSQL.selectJisangPmtDetail_FILE", params); // 첨부서류
				log.info("list:"+list);
				log.info("togiList:"+togiList);
				log.info("fileList:"+fileList);
			} catch (Exception e) {
				str_result = "N";
				e.printStackTrace();
			}
			HashMap map = new HashMap();

			if (list != null)
				map.put("count", list.size());
			else
				map.put("count", 0);

			if (togiList != null)
				map.put("togiCount", togiList.size());
			else
				map.put("togiCount", 0);

			if (fileList != null)
				map.put("fileCount", fileList.size());
			else
				map.put("fileCount", 0);

			map.put("message", str_result);
			map.put("list", list);
			map.put("togiList", togiList);
			map.put("fileList", fileList);
			map.put("loginKey", loginKey);
			
			ApprovalHtmlUtil eph=new ApprovalHtmlUtil();
			ApprovalUtil epc= new ApprovalUtil();
//
//			ElectronicPaymentHTML eph = new ElectronicPaymentHTML(); // 상신용 HTML
//			ElectronicPaymentUtil epc = new ElectronicPaymentUtil(); // 전자결재 연계
			CommonUtil cu = new CommonUtil();
//
			String str_appNo = cu.getNextAppovalSeq();
			boolean res_Echo = false;
			if ("".equals(str_appNo)) {
				map.put("message", "N");
			} else {

				String str_UserId = String.valueOf(request.getSession().getAttribute("userId"));
				String str_userName = String.valueOf(request.getSession().getAttribute("userName"));
				String str_userDeptcd = String.valueOf(request.getSession().getAttribute("userDeptcd"));
				String str_userDeptnm = String.valueOf(request.getSession().getAttribute("userDeptnm"));
				String str_userUPDeptcd = String.valueOf(request.getSession().getAttribute("userUPDeptcd"));
//				String str_UserId = "034599";
//				String str_userName = "장우형";
//				String str_userDeptcd = "D250500";
//				String str_userDeptnm = "IT전략.지원팀";
//				String str_userUPDeptcd = "S250100";
				res_Echo = epc.GetPLMSDataforXML(str_appNo, eph.getPERMIT_HTML(map, request, response), str_UserId, "", "", "GetSurfaceRightsDataforXML", str_userName, str_userDeptcd, str_userDeptnm, str_userUPDeptcd);
			}
//
			if (res_Echo) {

				// 문서번호 업데이트
				map.put("DOCKEY", str_appNo);
				map.put("message", "Y");
				map.put("PMT_NO", PMT_NO);
				//Database.getInstance().update("Json.updateJisangPmtDetailEchoNo", map);
				mainService.InsertQuery("jisangSQL.updateJisangPmtDetailEchoNo", map);

				// 문서 URL조회
				//ArrayList echolist = (ArrayList) Database.getInstance().queryForList("Json.selectDocInfo", map);
				ArrayList echolist = (ArrayList) mainService.selectQuery("jisangSQL.selectDocInfo", map);
				if (null != echolist && echolist.size() > 0) {
					String str_EchoNo = String.valueOf(((HashMap) echolist.get(0)).get("pa_out_url"));
					 System.out.println("str_EchoNo=====" + str_EchoNo);
					map.put("OUT_URL", str_EchoNo);
				}

			} else {
				map.put("message", "N");
			}

			JSONObject jo = new JSONObject(map);

			response.setCharacterEncoding("UTF-8");
			response.setHeader("Access-Control-Allow-Origin", "*");
			response.resetBuffer();
			response.setContentType("application/json");
			response.getWriter().print(jo);
			response.getWriter().flush();
		}
	
	
	
//	// 지상권 사용승락 등록 insertJisangPmtList
//		@Transactional
//		@RequestMapping(value="/insertJisangPmtList1", method = {RequestMethod.GET, RequestMethod.POST}) //http://localhost:8080/api/get/dbTest
//			public void insertJisangPmtList1(HttpServletRequest request, HttpServletResponse response) throws Exception {
//
//			
//			
//			String requestParams = ParameterUtil.getRequestBodyToStr(request);
//	        log.info("requestParams:"+requestParams);
//	        JSONObject requestJsonObj=new JSONObject(requestParams);
//	        
//	        
//	        JSONArray togiArr=new JSONArray(requestJsonObj.getString("desangTogis"));
//				ArrayList list = new ArrayList();
//				ParameterParser parser = new ParameterParser(request);
//
//				String GUBUN = requestJsonObj.getString("gubun"); // 구분( modify : 수정, insert
//																// : 등록 )
//				//String TOGICNT = requestJsonObj.getString("TOGICNT"); // 대상토지 수
//				String PMT_NO =requestJsonObj.has("pmt_no")?requestJsonObj.getString("pmt_no"):""; // 승락등록 번호
//				String USE_PURPOS = requestJsonObj.getString("purpose"); // 사용목적
//				String USE_ST_DATE = requestJsonObj.getString("useStartDate"); // 사용기간 시작
//				String USE_ED_DATE = requestJsonObj.getString("useEndDate"); // 사용기간 끝
//				String SPOT_RESULT = requestJsonObj.getString("spot_result"); // 현장확인결과
//				String RIVEW = requestJsonObj.getString("review"); // 검토의견
//				String CONTRACT = requestJsonObj.getString("contract"); // 약정사항
//				String PMT_STATUS = requestJsonObj.getString("pmt_status"); // 등록상태
//				String str_result = "Y";
//				String resp_PMT_NO = "";
//				try {
//					HashMap params = new HashMap();
//					params.put("USE_PURPOS", USE_PURPOS);
//					params.put("USE_ST_DATE", USE_ST_DATE);
//					params.put("USE_ED_DATE", USE_ED_DATE);
//					params.put("SPOT_RESULT", SPOT_RESULT);
//					params.put("RIVEW", RIVEW);
//					params.put("CONTRACT", CONTRACT);
//					params.put("PMT_STATUS", PMT_STATUS);
//
//					/**********************
//					 * 다음 지상권 번호 조회 시작
//					 **********************/
//					if (GUBUN.equals("modify")) {
//						resp_PMT_NO = PMT_NO;
//						params.put("PMT_NO", PMT_NO);
//					} else {
//						ArrayList PmtList = (ArrayList) mainService.selectQuery("jisangSQL.selectJisangPmtNextNo", null);
//						int no=Integer.parseInt((((HashMap) PmtList.get(0)).get("now_pmt_no").toString()).toString());
//						String Next_pmtNo =  String.valueOf(no + 1);
//						//String Next_pmtNo = String.valueOf(Integer.parseInt((String) ((HashMap) PmtList.get(0)).get("now_pmt_no")) + 1);
//						int n_Next_pmtNo = Next_pmtNo.length();
//
//						String add_Zero = "";
//						for (int i = 0; i < (6 - n_Next_pmtNo); i++) {
//							add_Zero += "0";
//						}
//						Next_pmtNo = "P_" + add_Zero + Next_pmtNo;
//
//						resp_PMT_NO = Next_pmtNo;
//						params.put("PMT_NO", Next_pmtNo);
//					}
//					log.info("resp_PMT_NO:"+resp_PMT_NO);
//					/***********************
//					 * 다음 지상권 번호 조회 끝
//					 ************************/
//
//					if (GUBUN.equals("insert")) {
//						mainService.InsertQuery("jisangSQL.insertPermitMaster", params); // 기본정보
//																							// 저장
//					} else if (GUBUN.equals("modify")) {
//						mainService.UpdateQuery("jisangSQL.updatePermitMaster", params); // 기본정보
//																							// 수정
//					}
//
//					// 대상토지
//					for (int i = 0; i < togiArr.length(); i++) {
//						JSONObject obj=new JSONObject(togiArr.get(i).toString());
//						String JISANG_NO = obj.getString("togiManageNo"); // 지상권번호
//						String ADDRESS = obj.getString("togiaddress"); // 주소
//						String JIMOK = obj.getString("togiJimokText"); // 지목
//						String JIJUK = obj.getString("togiJijukArea"); // 전체면적
//						String PYENIB = obj.getString("togiPyeonibArea"); // 설정면적
//						String MONEY = obj.getString("togiSetMoney"); // 설정금액
//						String JASAN_NO = obj.getString("togiJasanNo"); // 자산분류번호
//						String SOUJA = obj.getString("togiSouja"); // 소유자
//						String USER = obj.getString("togiUseName"); // 사용자
//
//						String SIDO_NM = obj.getString("sido_nm");
//						String SGG_NM = obj.getString("sgg_nm");
//						String EMD_NM = obj.getString("emd_nm");
//						String RI_NM = obj.getString("ri_nm");
//						String JIBUN = obj.getString("jibun");
//						String ADDRCODE = obj.getString("addrcode");
//
//						params.put("JISANG_NO", JISANG_NO);
//						params.put("ADDRESS", ADDRESS);
//						params.put("JIMOK", JIMOK);
//						params.put("JIJUK", JIJUK);
//						params.put("PYENIB", PYENIB);
//						params.put("MONEY", MONEY);
//						params.put("JASAN_NO", JASAN_NO);
//						params.put("SOUJA", SOUJA);
//						params.put("USER", USER);
//						params.put("SIDO_NM", SIDO_NM);
//						params.put("SGG_NM", SGG_NM);
//						params.put("EMD_NM", EMD_NM);
//						params.put("RI_NM", RI_NM);
//						params.put("JIBUN", JIBUN);
//						params.put("ADDRCODE", ADDRCODE);
//
//						if (GUBUN.equals("modify")) {
//							if (i == 0) {
//								mainService.UpdateQuery("jisangSQL.deletePermitTogiList", params); // 기존
//																									// 정보
//																									// 삭제
//							}
//						}
//						mainService.InsertQuery("jisangSQL.insertPermitTogiList", params); // 대상토지
//																							// 테이블
//																							// 저장
//					}
//
//					
//					
//					//사용승락 첨부서류 등록
//			        for(int i=1;i<11;i++) {
//			        	String key=String.format("%02d",i);
//			        	if (requestJsonObj.getString("req_doc_file"+key)!=null) {
//			        		log.info("Key:"+key);
//			        		String fname=requestJsonObj.getString("req_doc_file"+key);
//			        		log.info("fname:"+fname);
//			        		if (fname.equals("") || fname==null ) continue;
//			        		
//			        		
//			        		HashMap<String, Object> filesMap= new HashMap<>();
//			        		filesMap.put("PMT_NO",resp_PMT_NO);
//			    			//filesMap.put("seq",String.format("%06d",i));
//			    			filesMap.put("fseq",i);
//			    			filesMap.put("FILE_GUBUN",i);
//			    			filesMap.put("FILE_NM",fname);
//			    			 String tempPath = GC.getJisangFileTempDir(); //설정파일로 뺀다.
//			     			 String dataPath = GC.getJisangFileDataDir()+"/jisangPermit/"+resp_PMT_NO; //설정파일로 뺀다.
//			     			 filesMap.put("FILE_PATH",dataPath+"/"+fname);
//			     			 CommonUtil.moveFile(fname, tempPath, dataPath);
//			     			log.info("filesMap:"+filesMap);
//			     			
//			     			
//			     			//해당파일있는지체크 
//			     			int fcount=(int)mainService.selectCountQuery("jisangSQL.selectPermitFileCount", filesMap);
//			     			log.info("fcount:"+fcount);
//			     			if (fcount>0) mainService.InsertQuery("jisangSQL.updatePermitFile", filesMap);
//			     			else mainService.InsertQuery("jisangSQL.insertPermitFile", filesMap);
//			        	}
//			        }
//					// 첨부파일
////					MultipartHttpServletRequest multipart = (MultipartHttpServletRequest) request;
////					List<HashMap> listfile;
////					FileManager fm = new FileManager();
//	//
////					for (int i = 1; i < 7; i++) {
//	//
////						String FILE_UPDATE_YN = parser.getString("FILE_UPDATE_YN_" + String.valueOf(i), "");
////						listfile = fm.upload(multipart, "FILE" + i);
//	//
////						if (listfile != null && listfile.size() > 0) {
////							params.put("FILE_NM", listfile.get(0).get("fileName"));
////							params.put("FILE_PATH", listfile.get(0).get("filePath"));
////							params.put("FILE_GUBUN", String.valueOf(i));
////							// 파일구분 1: 토지사용 승낙서, 2:등기부등본 및 토지대장, 3:위치도및지적도, 4:현장사진,
////							// 5:검토의견서, 6:부속서류
//	//
////							if (FILE_UPDATE_YN.equals("Y")) {
////								if (GUBUN.equals("modify")) {
////									Database.getInstance().update("Json.deletePermitFile", params); // 파일이
////																									// 변경되었다면
////																									// 기존파일
////																									// 삭제
////								}
////								Database.getInstance().insert("Json.insertPermitFile", params);
////							}
////						} else {
////							if (!FILE_UPDATE_YN.equals("Y")) {
////								params.put("FILE_GUBUN", i);
////								Database.getInstance().update("Json.deletePermitFile", params); // 파일을
////																								// 등록하지
////																								// 않았다면
////																								// 기존파일
////																								// 삭제
////							}
////						}
//	//
////					}
//
//				} catch (Exception e) {
//					str_result = "N";
//					e.printStackTrace();
//				}
//
//				HashMap map = new HashMap();
//
//				if (list != null)
//					map.put("count", list.size());
//				else
//					map.put("count", 0);
//
//				map.put("message", str_result);
//				map.put("result", list);
//				map.put("PMT_NO", resp_PMT_NO);
//
//				JSONObject jo = new JSONObject(map);
//
//				response.setCharacterEncoding("UTF-8");
//				response.setHeader("Access-Control-Allow-Origin", "*");
//				response.resetBuffer();
//				response.setContentType("application/json");
//				response.getWriter().print(jo);
//				response.getWriter().flush();
//
//			}
	
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
		ModelAndView mav=new ModelAndView();
		HashMap params = new HashMap();
		ArrayList<HashMap> list=new ArrayList<HashMap>();
		
		String idx = httpRequest.getParameter("idx");
		String index = httpRequest.getParameter("index");
		
		params.put("idx",idx);
		params.put("manage_no",idx);
		params.put("index",index);
		log.info("params:"+params);
		
		ArrayList<HashMap> data = mainService.selectQuery("jisangSQL.selectAllData",params);
		
		//241009
		List<String> coordinateVal = new ArrayList<>();
		Integer coordinateSize = 0;
		
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
			
			jijukParam.put("TARGET_PNU", data.get(0).get("jm_pnu"));

			ArrayList<HashMap> jijukList = mainService.selectQuery("commonSQL.selectJijuk", jijukParam);
			ArrayList<HashMap> jijukPNUList2 = mainService.selectQuery("commonSQL.selectJijuk_PNU", jijukParam);
			
			coordinateSize += jijukPNUList2.size();
			
			if (jijukList.size() > 0) {
				jijuk = jijukList.get(0);
			} else {
				jijuk = new HashMap<>();
				jijuk.put("x", 0);
				jijuk.put("y", 0);
				
				for(int k = 0 ; k < jijukPNUList2.size() ; k++) {
					HashMap jijukInfo = jijukPNUList2.get(k);
					coordinateVal.add(jijukInfo.get("x").toString()+"|"+jijukInfo.get("y").toString());
				}
				
			}
		}
		
		ArrayList<HashMap> soujaList = mainService.selectQuery("jisangSQL.selectSoyujaData",params);
		ArrayList<HashMap> atcFileList = mainService.selectQuery("jisangSQL.selectAtcFileList",params);

//		ArrayList<HashMap> jisangPermitList = mainService.selectQuery("jisangSQL.selectPermitList",params);

		
		//ArrayList<HashMap> jisangPermitList = mainService.selectQuery("jisangSQL.selectPermitList",params); // 사용승락 구버전
		params.put("JISANG_NO", idx);
		ArrayList jisangPermitList = (ArrayList) mainService.selectQuery("jisangSQL.selectJisangRowDetail_Permit", params); // 사용승락 신버전
		
		ArrayList<HashMap> jisangModifyList = mainService.selectQuery("jisangSQL.selectModifyList",params);
		// jisangModifyList를 역순으로 정렬 (변경일시 내림차순 하기 위해서)
		Collections.reverse(jisangModifyList);
		
		//ArrayList<HashMap> jisangMergeList = mainService.selectQuery("jisangSQL.selectMergeList",params); // 합필 구버전
		ArrayList jisangMergeList = (ArrayList) mainService.selectQuery("jisangSQL.selectJisangRowDetail_Merge", params); // 합필 신버전

		params.put("pnu", data.get(0).get("jm_pnu"));
		log.info("pnu: "+ data.get(0).get("jm_pnu"));
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
		//ArrayList<HashMap> jisangIssueHistoryList = mainService.selectQuery("jisangSQL.selectIssueHistoryList",params);
		ArrayList<HashMap> jisangIssueCodeAtcFileList = mainService.selectQuery("jisangSQL.selectIssueCodeAtcFileList",params);
		ArrayList<HashMap> jisangMemoList = mainService.selectQuery("commonSQL.selectMemoList",params);
		
		log.info("params:"+params);
		log.info("data:"+data.get(0));
		log.info("jm_pipe_yn:"+data.get(0).get("jm_pipe_yn"));
		log.info("jm_youngdo:"+data.get(0).get("jm_youngdo"));
		log.info("jm_pipe_name:"+data.get(0).get("jm_pipe_name"));
		log.info("jm_jijuk_area:"+data.get(0).get("jm_jijuk_area"));
		log.info("jisangPermitList:"+jisangPermitList);
		log.info("jisangMergeList:"+jisangMergeList);
		log.info("jisangIssueList:"+jisangIssueList.get(0));
		log.info("souja count:"+soujaList.size());
		log.info("soujaList:"+soujaList);
		log.info("atcFileList:"+atcFileList);
		log.info("jisangPnuAtcFileList:"+jisangPnuAtcFileList);
		//log.info("jisangIssueHistoryList:"+jisangIssueHistoryList);
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
		mav.addObject("jisangIssueList",jisangIssueList.get(0)); // 잠재이슈는 1개만 있음.
		//mav.addObject("jisangIssueHistoryList",jisangIssueHistoryList);
		mav.addObject("memoList",jisangMemoList);
		mav.addObject("jisangIssueCodeAtcFileList",jisangIssueCodeAtcFileList);
		mav.setViewName("content/jisang/groundDetail");
		
		//지도보기, 이동관련
		mav.addObject("jijukCoordList", coordinateVal);
		mav.addObject("jijukCoordSize", coordinateSize);
		
		return mav;
    }
	
	
	//groundDetail  상세 조회
	@GetMapping(path="/groundDetailPrint") //http://localhost:8080/api/get/dbTest
    public ModelAndView groundDetailPrint(HttpServletRequest httpRequest, HttpServletResponse response) throws Exception {
		ModelAndView mav=new ModelAndView();
		HashMap params = new HashMap();
		ArrayList<HashMap> list=new ArrayList<HashMap>();
		
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

//			ArrayList<HashMap> jisangPermitList = mainService.selectQuery("jisangSQL.selectPermitList",params);

		
		//ArrayList<HashMap> jisangPermitList = mainService.selectQuery("jisangSQL.selectPermitList",params); // 사용승락 구버전
		params.put("JISANG_NO", idx);
		ArrayList jisangPermitList = (ArrayList) mainService.selectQuery("jisangSQL.selectJisangRowDetail_Permit", params); // 사용승락 신버전
		
		ArrayList<HashMap> jisangModifyList = mainService.selectQuery("jisangSQL.selectModifyList",params);
		// jisangModifyList를 역순으로 정렬 (변경일시 내림차순 하기 위해서)
		Collections.reverse(jisangModifyList);
		
		//ArrayList<HashMap> jisangMergeList = mainService.selectQuery("jisangSQL.selectMergeList",params); // 합필 구버전
		ArrayList jisangMergeList = (ArrayList) mainService.selectQuery("jisangSQL.selectJisangRowDetail_Merge", params); // 합필 신버전

		params.put("pnu", data.get(0).get("jm_pnu"));
		log.info("pnu: "+ data.get(0).get("jm_pnu"));
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
		log.info("jisangMergeList:"+jisangMergeList);
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
		mav.setViewName("content/jisang/groundDetailPrint");
		
		return mav;
    }
	
	// 지상권 분할- 지상권 상세정보
	@GetMapping(path="/forDivisionEasementDetails") //http://localhost:8080/api/get/dbTest
	public ModelAndView forDivisionEasementDetails(HttpServletRequest httpRequest, HttpServletResponse response) throws Exception {
		ModelAndView mav=new ModelAndView();

		HashMap params = new HashMap();
		ArrayList<HashMap>  list=new ArrayList<HashMap>();

		String idx = httpRequest.getParameter("idx");
		String index = httpRequest.getParameter("index");

		params.put("idx",idx);
		params.put("manage_no",idx);
		params.put("JISANG_NO",idx);
		params.put("index",index);
		log.info("params:"+params);

		ArrayList<HashMap> data = mainService.selectQuery("jisangSQL.selectAllData",params);
		ArrayList<HashMap> soujaList = mainService.selectQuery("jisangSQL.selectSoyujaData",params);
		ArrayList<HashMap> atcFileList = mainService.selectQuery("jisangSQL.selectAtcFileList",params);
		ArrayList<HashMap> jisangModifyList = mainService.selectQuery("jisangSQL.selectModifyList",params);
		//ArrayList<HashMap> jisangPermitList = mainService.selectQuery("jisangSQL.selectPermitList",params); // 사용승락 구버전
		ArrayList jisangPermitList = (ArrayList) mainService.selectQuery("jisangSQL.selectJisangRowDetail_Permit", params); // 사용승락 최신버전
		log.info("jisangPermitList: " + jisangPermitList);
		//ArrayList<HashMap> jisangMergeList = mainService.selectQuery("jisangSQL.selectMergeList",params); // 합필 구버전
		ArrayList jisangMergeList = (ArrayList) mainService.selectQuery("jisangSQL.selectJisangRowDetail_Merge", params); // 합필 신버전
		log.info("jisangMergeList: " + jisangMergeList);
		params.put("pnu", data.get(0).get("jm_pnu"));
		ArrayList<HashMap> jisangIssueList = new  ArrayList<HashMap>();
		log.info("jmPNU:"+data.get(0).get("jm_pnu"));
		if (data.get(0).get("jm_pnu")!=null || data.get(0).get("jm_pnu")!="" || data.get(0).get("jm_pnu").equals("")) 	jisangIssueList=mainService.selectQuery("jisangSQL.selectIssueList",params);
		log.info("jisangIssueList size:"+jisangIssueList.size());
		if (jisangIssueList.size()>0) {
			params.put("issueManualCode1", jisangIssueList.get(0).get("pi_code_depth1"));
			params.put("issueManualCode2", jisangIssueList.get(0).get("pi_code_depth2"));
			params.put("issueManualCode3", jisangIssueList.get(0).get("pi_code_depth3"));
		}
		ArrayList<HashMap> jisangPnuAtcFileList = mainService.selectQuery("jisangSQL.selectPnuAtcFileList",params);
		//ArrayList<HashMap> jisangIssueHistoryList = mainService.selectQuery("jisangSQL.selectIssueHistoryList",params);
		ArrayList<HashMap> jisangIssueCodeAtcFileList = mainService.selectQuery("jisangSQL.selectIssueCodeAtcFileList",params);
		ArrayList<HashMap> jisangMemoList = mainService.selectQuery("commonSQL.selectMemoList",params);
		
		//241009
		List<String> coordinateVal = new ArrayList<>();
		Integer coordinateSize = 0;
		
		if (data.size() > 0) {
			HashMap jijukParam = new HashMap<>();
			// 241009 - 검색조건을 PNU로 하도록 조치
			jijukParam.put("TARGET_PNU", data.get(0).get("jm_pnu"));
			
			// PNU를 통한 좌표조회
			ArrayList<HashMap> jijukList = mainService.selectQuery("commonSQL.selectJijuk", jijukParam);
			coordinateSize = jijukList.size();
			
			if(jijukList.size() == 0) {
				coordinateSize = 0;
			} else {
				for(int k = 0 ; k < jijukList.size() ; k++) {
					HashMap jijukInfo = jijukList.get(k);
					coordinateVal.add(jijukInfo.get("x").toString()+"|"+(String)jijukInfo.get("y").toString());
				}
			}
		}

		mav.addObject("resultData",data.get(0));
		mav.addObject("soujaList",soujaList);
		mav.addObject("jisangPermitList",jisangPermitList);
		mav.addObject("atcFileList",atcFileList);
		mav.addObject("jisangModifyList",jisangModifyList);
		mav.addObject("jisangMergeList",jisangMergeList);

		mav.addObject("jisangPnuAtcFileList",jisangPnuAtcFileList);
		mav.addObject("jisangIssueList",jisangIssueList);
		//mav.addObject("jisangIssueHistoryList",jisangIssueHistoryList);
		mav.addObject("memoList",jisangMemoList);
		mav.addObject("jisangIssueCodeAtcFileList",jisangIssueCodeAtcFileList);
		
		mav.addObject("jijukCoordList", coordinateVal);
		mav.addObject("jijukCoordSize", coordinateSize);
		
		mav.setViewName("content/jisang/forDivisionEasementDetails");
		
		return mav;
	}
	
	// 지상권 조회 - 지상권 상세정보
	@GetMapping(path="/easementDetails") //http://localhost:8080/api/get/dbTest
	public ModelAndView easementDetails(HttpServletRequest httpRequest, HttpServletResponse response) throws Exception {
		ModelAndView mav=new ModelAndView();

		HashMap params = new HashMap();

		String idx = httpRequest.getParameter("idx");
		String index = httpRequest.getParameter("index");

		params.put("idx",idx);
		params.put("manage_no",idx);
		params.put("JISANG_NO",idx.trim());
		params.put("index",index);
		log.info("params:"+params);

		ArrayList<HashMap> data = mainService.selectQuery("jisangSQL.selectAllData",params);
		ArrayList<HashMap> soujaList = mainService.selectQuery("jisangSQL.selectSoyujaData",params);
		ArrayList<HashMap> atcFileList = mainService.selectQuery("jisangSQL.selectAtcFileList",params);
		ArrayList jisangPermitList = (ArrayList) mainService.selectQuery("jisangSQL.selectJisangRowDetail_Permit", params); // 사용승락 최신버전
		ArrayList<HashMap> jisangModifyList = mainService.selectQuery("jisangSQL.selectModifyList",params);
		ArrayList jisangMergeList = (ArrayList) mainService.selectQuery("jisangSQL.selectJisangRowDetail_Merge", params); // 합필 신버전
		params.put("pnu", data.get(0).get("jm_pnu"));
		ArrayList<HashMap> jisangIssueList = mainService.selectQuery("jisangSQL.selectIssueList",params);
		
		//ArrayList<HashMap> jisangMergeList = mainService.selectQuery("jisangSQL.selectMergeList",params); // 합필 구버전
		//ArrayList<HashMap> jisangPermitList = mainService.selectQuery("jisangSQL.selectPermitList",params); // 사용승락 구버전
		
		log.info("jisangPermitList : " +  jisangPermitList);
		log.info("jisangIssueList size : "+jisangIssueList.size());
		
		if (jisangIssueList.size()>0) {
			params.put("issueManualCode1", jisangIssueList.get(0).get("pi_code_depth1"));
			params.put("issueManualCode2", jisangIssueList.get(0).get("pi_code_depth2"));
			params.put("issueManualCode3", jisangIssueList.get(0).get("pi_code_depth3"));
		}
		
		ArrayList<HashMap> jisangPnuAtcFileList = mainService.selectQuery("jisangSQL.selectPnuAtcFileList",params);
		ArrayList<HashMap> jisangIssueHistoryList = mainService.selectQuery("jisangSQL.selectIssueHistoryList",params);
		ArrayList<HashMap> jisangIssueCodeAtcFileList = mainService.selectQuery("jisangSQL.selectIssueCodeAtcFileList",params);
		ArrayList<HashMap> jisangMemoList = mainService.selectQuery("commonSQL.selectMemoList",params);

		HashMap<String, Object> jijuk = new HashMap<String, Object>();
		
		//241009
		List<String> coordinateVal = new ArrayList<>();
		Integer coordinateSize = 0;

		
		jijuk.put("x", 0);
		jijuk.put("y", 0);
		
		if (data.size() > 0) {
			
			HashMap jijukParam = new HashMap<>();
//			jijukParam.put("sido_nm", data.get(0).get("jm_sido_nm"));
//			jijukParam.put("sgg_nm", data.get(0).get("jm_sgg_nm"));
//			jijukParam.put("emd_nm", data.get(0).get("jm_emd_nm"));
//			jijukParam.put("ri_nm", data.get(0).get("jm_ri_nm"));
//			jijukParam.put("jibun", data.get(0).get("jm_jibun"));
			
			// 241009 - 검색조건을 PNU로 하도록 조치
			jijukParam.put("TARGET_PNU", data.get(0).get("jm_pnu"));
			
			// PNU를 통한 좌표조회
			ArrayList<HashMap> jijukList = mainService.selectQuery("commonSQL.selectJijuk", jijukParam);
			jijuk.put("resultSize", jijukList.size());
			coordinateSize = jijukList.size();
			
			if(jijukList.size() == 0) {
				jijuk.put("resultList", "-");
			} else {
				for(int k = 0 ; k < jijukList.size() ; k++) {
					HashMap jijukInfo = jijukList.get(k);
					coordinateVal.add(jijukInfo.get("x").toString()+"|"+(String)jijukInfo.get("y").toString());
				}
				jijuk.put("resultList", coordinateVal);
			}
		}

		mav.addObject("resultData",data.get(0));
		mav.addObject("jijuk", jijuk);
		mav.addObject("jijukCoordList", coordinateVal);
		mav.addObject("jijukCoordSize", coordinateSize);
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
		
		mav.setViewName("content/jisang/easementDetails");
		
		return mav;
	}
	
	// 지상권 내역 수정
	@GetMapping(path="/easementModification") //http://localhost:8080/api/get/dbTest
	public ModelAndView easementModification(HttpServletRequest httpRequest, HttpServletResponse response) throws Exception {
		ModelAndView mav=new ModelAndView();

		HashMap params = new HashMap();

		String idx = httpRequest.getParameter("idx");
		String index = httpRequest.getParameter("index");

		params.put("idx",idx);
		params.put("JISANG_NO",idx);
		params.put("manage_no",idx);
		params.put("index",index);
		log.info("params:"+params);

		ArrayList<HashMap> jisaList = mainService.selectQuery("commonSQL.selectAllJisaList",params);
		ArrayList<HashMap> jimoklist = mainService.selectQuery("commonSQL.selectJimokList",params);
		ArrayList<HashMap> sidolist = mainService.selectQuery("commonSQL.getSidoMaster",params);
		
		ArrayList<HashMap> data = mainService.selectQuery("jisangSQL.selectAllData",params);
		ArrayList<HashMap> soujaList = mainService.selectQuery("jisangSQL.selectSoyujaData",params);
		ArrayList<HashMap> atcFileList = mainService.selectQuery("jisangSQL.selectAtcFileList",params);
		//ArrayList<HashMap> jisangPermitList = mainService.selectQuery("jisangSQL.selectPermitList",params); // 사용승락 구버전
		ArrayList jisangPermitList = (ArrayList) mainService.selectQuery("jisangSQL.selectJisangRowDetail_Permit", params); // 사용승락 신버전
		ArrayList<HashMap> jisangModifyList = mainService.selectQuery("jisangSQL.selectModifyList",params);
		//ArrayList<HashMap> jisangMergeList = mainService.selectQuery("jisangSQL.selectMergeList",params); // 합필 구버전
		ArrayList jisangMergeList = (ArrayList) mainService.selectQuery("jisangSQL.selectJisangRowDetail_Merge", params); // 합필 신버전
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
log.info("data:"+data.get(0));
//log.info("atcFileList:"+atcFileList.get(0));
		mav.addObject("jisaList",jisaList);
		mav.addObject("jimoklist",jimoklist);
		mav.addObject("sidoList",sidolist);
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
		
		mav.setViewName("content/jisang/easementModification");
		
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
		mav.setViewName("content/jisang/groundDetail :: #fileListDiv");
		return mav;
	}
	//아이디를 기준으로 해당 영역만 리플래쉬 되도록 하는 로직
		@PostMapping(path="/getPnuAtcFileData") //http://localhost:8080/api/get/dbTest
	    public ModelAndView getPnuAtcFileData(HttpServletRequest httpRequest, HttpServletResponse response) throws Exception {
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
			mav.setViewName("content/jisang/groundDetail :: #fileListDiv");
			return mav;
		}
	
	
//	@PostMapping("/getAtcFileData")
//    public String getAtcFileData(Model model, HttpServletRequest httpRequest) {
//		
////		ArrayList<HashMap> jisangIssueList = mainService.selectQuery("jisangSQL.selectIssueList",params);
//      model.addAttribute("Data", "");
//      return "statistics/yearchart :: #tableStat";
//    }
	

		@GetMapping(path="/menu02_1") //http://localhost:8080/api/get/dbTest
	    public ModelAndView menu02_1(HttpServletRequest httpRequest, HttpServletResponse response) throws Exception {
            
            /*******************************/
            //받은 세션 Map으로 전환
            Map<String, Object> sessionMap = CommonUtil.requestSessionToMap(httpRequest);
            /*******************************/
			
			HashMap params = new HashMap();
            params.put("LOGIN_JISA", (String)sessionMap.get("jisa"));    //지사정보 param에 싣기
			
			ArrayList<HashMap> list = new ArrayList<HashMap>();
			ArrayList<HashMap> jisalist = mainService.selectQuery("commonSQL.selectAllJisaList",params);
			ArrayList<HashMap> jimoklist = mainService.selectQuery("commonSQL.selectJimokList",params);
			ArrayList<HashMap> sidolist = mainService.selectQuery("commonSQL.getSidoMaster",params);
			
			ModelAndView mav = new ModelAndView();

			mav.addObject("jisaList", jisalist);
			mav.addObject("resultJimokList", jimoklist);
			mav.addObject("sidoList", sidolist);
			//241006 - 지사정보 추가
			mav.addObject("loginJisa", (String)sessionMap.get("jisa"));
			
			mav.setViewName("content/jisang/menu02_1");
			return mav;
		}
		
		@GetMapping(path="/menu02_2") //http://localhost:8080/api/get/dbTest
	    public ModelAndView menu02_2(HttpServletRequest httpRequest, HttpServletResponse response) throws Exception {
//			response.setHeader("X-Frame-Options", "SAMEORIGIN");
//			response.setHeader("Content-Security-Policy", " frame-ancestors 'self'");
			
			/*******************************/
            //받은 세션 Map으로 전환
            Map<String, Object> sessionMap = CommonUtil.requestSessionToMap(httpRequest);
            /*******************************/
			
			
			HashMap params = new HashMap();
			params.put("LOGIN_JISA", (String)sessionMap.get("jisa"));    //지사정보 param에 싣기
			
			ArrayList<HashMap> jisalist = mainService.selectQuery("commonSQL.selectAllJisaList",params);
			//ArrayList<HashMap> jisalist = mainService.selectQuery("commonSQL.selectJisangListDemo",params); //demo
			ArrayList<HashMap> sidolist = mainService.selectQuery("commonSQL.getSidoMaster",params);
			
			ModelAndView mav = new ModelAndView();
			
			mav.addObject("jisaList",jisalist);
			mav.addObject("sidoList",sidolist);
			//241006 - 지사정보 추가
			mav.addObject("loginJisa", (String)sessionMap.get("jisa"));
			
			mav.setViewName("content/jisang/menu02_2");
			return mav;
		}
		
		@GetMapping(path="/menu02_3") //http://localhost:8080/api/get/dbTest
	    public ModelAndView menu02_3(HttpServletRequest httpRequest, HttpServletResponse response) throws Exception {
//			response.setHeader("X-Frame-Options", "SAMEORIGIN");
//			response.setHeader("Content-Security-Policy", " frame-ancestors 'self'");
			
			/*******************************/
            //받은 세션 Map으로 전환
            Map<String, Object> sessionMap = CommonUtil.requestSessionToMap(httpRequest);
            /*******************************/
			
			
			HashMap params = new HashMap();
			params.put("LOGIN_JISA", (String)sessionMap.get("jisa"));    //지사정보 param에 싣기
			
			ArrayList<HashMap> jisalist = mainService.selectQuery("commonSQL.selectAllJisaList",params);
			ArrayList<HashMap> sidolist = mainService.selectQuery("commonSQL.getSidoMaster",params);

			ModelAndView mav=new ModelAndView();
			
			//241006 - 지사정보 추가
			mav.addObject("loginJisa", (String)sessionMap.get("jisa"));
			
			mav.setViewName("content/jisang/menu02_3");

			mav.addObject("jisaList",jisalist);
			mav.addObject("sidoList",sidolist);

			return mav;
		}
		
		@GetMapping(path="/menu02_4") //http://localhost:8080/api/get/dbTest
	    public ModelAndView menu02_4(HttpServletRequest httpRequest, HttpServletResponse response) throws Exception {
//			response.setHeader("X-Frame-Options", "SAMEORIGIN");
//			response.setHeader("Content-Security-Policy", " frame-ancestors 'self'");
			
			/*******************************/
            //받은 세션 Map으로 전환
            Map<String, Object> sessionMap = CommonUtil.requestSessionToMap(httpRequest);
            /*******************************/
			
			ModelAndView mav=new ModelAndView();

			HashMap params = new HashMap();
			params.put("LOGIN_JISA", (String)sessionMap.get("jisa"));    //지사정보 param에 싣기
			
			ArrayList<HashMap> list= new ArrayList<HashMap>();
			ArrayList<HashMap> jisalist = mainService.selectQuery("commonSQL.selectAllJisaList",params);
			ArrayList<HashMap> jimoklist = mainService.selectQuery("commonSQL.selectJimokList",params);
			ArrayList<HashMap> sidolist = mainService.selectQuery("commonSQL.getSidoMaster",params);

			mav.addObject("jisaList", jisalist);
			mav.addObject("resultJimokList", jimoklist);
			mav.addObject("sidoList", sidolist);
			//241006 - 지사정보 추가
			mav.addObject("loginJisa", (String)sessionMap.get("jisa"));
			
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
			
			/*******************************/
            //받은 세션 Map으로 전환
            Map<String, Object> sessionMap = CommonUtil.requestSessionToMap(httpRequest);
            /*******************************/
			
			HashMap params = new HashMap();
			params.put("LOGIN_JISA", (String)sessionMap.get("jisa"));    //지사정보 param에 싣기
			
			ArrayList<HashMap> list = new ArrayList<HashMap>();
			ArrayList<HashMap> jisalist = mainService.selectQuery("commonSQL.selectAllJisaList",params);
			ArrayList<HashMap> jimoklist = mainService.selectQuery("commonSQL.selectJimokList",params);
			ArrayList<HashMap> sidolist = mainService.selectQuery("commonSQL.getSidoMaster",params);
			
			log.info("sidolist:"+sidolist);
			
			ModelAndView mav=new ModelAndView();
			
			mav.addObject("jisaList",jisalist);
			mav.addObject("resultJimokList",jimoklist);
			mav.addObject("sidoList",sidolist);
			//241006 - 지사정보 추가
			mav.addObject("loginJisa", (String)sessionMap.get("jisa"));
			
			mav.setViewName("content/jisang/landRightsRegistration");
			return mav;
		}
		
		// 지상권 해지 등록
		@GetMapping(path="/landTerminationRegistration") //http://localhost:8080/api/get/dbTest
		public ModelAndView landTerminationRegistration(HttpServletRequest httpRequest, HttpServletResponse response) throws Exception {
			HashMap params = new HashMap();
			ArrayList<HashMap> list=new ArrayList<HashMap>();

			String idx = httpRequest.getParameter("idx");
			String index = httpRequest.getParameter("index");

			params.put("idx",idx);
			params.put("manage_no",idx);
			params.put("MANAGE_NO",idx);
			params.put("JISANGNO",idx);
			params.put("index",index);
			log.info("params:"+params);


			//ArrayList<HashMap> data = mainService.selectQuery("jisangSQL.selectAllData",params);
			ArrayList<HashMap> data = mainService.selectQuery("jisangSQL.selectJisangDetailListNew",params);

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
			//ArrayList<HashMap> reqDoc1list = mainService.selectQuery("jisangSQL.selectJisangReqDoc1",params);
			ArrayList<HashMap> reqDoc1list = mainService.selectQuery("jisangSQL.selectCancelFile",params);

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
			log.info("dataAccountYn:"+data.get(0).get("account_yn"));
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
		
		// 지상권 내역 해지 - 해지 상세보기 버튼
		@GetMapping(path="/landTerminationRegistration1") //http://localhost:8080/api/get/dbTest
		public ModelAndView landTerminationRegistration1(HttpServletRequest httpRequest, HttpServletResponse response) throws Exception {
			HashMap params = new HashMap();
			ArrayList<HashMap> list=new ArrayList<HashMap>();

			String idx = httpRequest.getParameter("idx");
			String index = httpRequest.getParameter("index");

			params.put("idx",idx);
			params.put("manage_no",idx);
			params.put("JISANGNO",idx);
			params.put("index",index);
			log.info("params:"+params);


			//ArrayList<HashMap> data = mainService.selectQuery("jisangSQL.selectAllData",params);
			ArrayList<HashMap> data = mainService.selectQuery("jisangSQL.selectJisangDetailListNew",params);

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
			//ArrayList<HashMap> reqDoc1list = mainService.selectQuery("jisangSQL.selectJisangReqDoc1",params);
			ArrayList<HashMap> reqDoc1list = mainService.selectQuery("jisangSQL.selectCancelFile",params);

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
			
			mav.setViewName("content/jisang/landTerminationRegistration1");
			return mav;
		}
		
		//지상권 내역 등록 - 아이디를 기준으로 해당 영역만 리플래쉬 되도록 하는 로직
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
			
			ArrayList<HashMap> jisangBasicSearchList = new ArrayList<>(); // 변수 선언
			if (addressRadioValue.equals("0")) {
				// 입력형 선택하면 emd,ri + jibun 으로 검색하도록
				String[] arr = address.split(" ");
				
				params.put("emd_nm", arr[0]);
				params.put("ri_nm", arr[0]);
				params.put("jibun", arr[1]);
				params.put("address", "");
				
				jisangBasicSearchList = mainService.selectQuery("commonSQL.selectAddressFromJijuk1",params);
			}
			else {
				params.put("sido_nm",sido_nm);
				params.put("sgg_nm",sgg_nm);
				params.put("emd_nm",emd_nm);
				params.put("ri_nm",ri_nm);
				jisangBasicSearchList = mainService.selectQuery("jisangSQL.selectBasicSearchList",params);
			}
			params.put("addressRadioValue", addressRadioValue);
			//params.put("pnu",pnu);
			log.info("params:"+params);
			log.info("jisangBasicSearchList:"+jisangBasicSearchList);
			mav.addObject("jisangBasicSearchList",jisangBasicSearchList);
			mav.setViewName("content/jisang/landRightsRegistration :: #searchResultPopDiv");
			return mav;
		}
	
	//지상권 내역 수정 - 아이디를 기준으로 해당 영역만 리플래쉬 되도록 하는 로직
	@PostMapping(path="/getBasicSearchDataForEdit") //http://localhost:8080/api/get/dbTest
    public ModelAndView getBasicSearchDataForEdit(HttpServletRequest httpRequest, HttpServletResponse response) throws Exception {
		ModelAndView mav=new ModelAndView();
		HashMap params = new HashMap();
		ArrayList<HashMap>  list=new ArrayList<HashMap>();
		//log.info("httpRequest:"+Arrays.toString(httpRequest));
		String jisa = httpRequest.getParameter("jisa");
		String pnu = httpRequest.getParameter("pnu");
		String sido_nm = httpRequest.getParameter("sido");
		String sgg_nm=httpRequest.getParameter("sgg");
		String emd_nm=httpRequest.getParameter("emd");
		String ri_nm=httpRequest.getParameter("ri");
		String jibun=httpRequest.getParameter("jibun");
		String address = httpRequest.getParameter("address");
		
		String addressRadioValue = httpRequest.getParameter("easementModification_addressInput");
		params.put("jisa",jisa);
		
		params.put("jibun", jibun);
		ArrayList<HashMap> jisangBasicSearchList = new ArrayList<>(); // 변수 선언
		
		if (addressRadioValue.equals("0")) {
			// 입력형 선택하면 emd,ri + jibun 으로 검색하도록
			String[] arr = address.split(" ");
			
			params.put("emd_nm", arr[0]);
			params.put("ri_nm", arr[0]);
			params.put("jibun", arr[1]);
			params.put("address", "");
			
			jisangBasicSearchList = mainService.selectQuery("commonSQL.selectAddressFromJijuk1",params);
		}
		else {
			params.put("sido_nm",sido_nm);
			params.put("sgg_nm",sgg_nm);
			params.put("emd_nm",emd_nm);
			params.put("ri_nm",ri_nm);
			jisangBasicSearchList = mainService.selectQuery("jisangSQL.selectBasicSearchList",params);
		}
		params.put("addressRadioValue", addressRadioValue);
		//params.put("pnu",pnu);
		log.info("params:"+params);
		log.info("jisangBasicSearchList:"+jisangBasicSearchList);
		mav.addObject("jisangBasicSearchList",jisangBasicSearchList);
		mav.setViewName("content/jisang/easementModification :: #searchResultPopDiv");
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
	            	
	            	System.out.println("fileFullPath :: " + fileFullPath);
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
		
		
		
		@RequestMapping(value = "/fileUpload/pnuAtcFile") //ajax에서 호출하는 부분
	    @ResponseBody
	    public HashMap uploadPnuAtcFile(MultipartHttpServletRequest multipartRequest) { //Multipart로 받는다.
	         
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
		String manage_no = req.getParameter("manage_no");
		String dosiplan = req.getParameter("dosiplan");
		String address = req.getParameter("saddr");
		
		String sido_nm = req.getParameter("sido_nm");
		String sgg_nm = req.getParameter("sgg_nm");
		String emd_nm = req.getParameter("emd_nm");
		String ri_nm = req.getParameter("ri_nm");
		String jibun = req.getParameter("jibun");

		String souja = req.getParameter("souja");
		String jasan_no = req.getParameter("jasan_no");
		String jimok_text = req.getParameter("jimok_text")==null?"":req.getParameter("jimok_text");
		List<String> jimokTexts=new ArrayList<String>();
		if (jimok_text!=null && !jimok_text.trim().isEmpty())	 jimokTexts = Arrays.asList(jimok_text.split(","));
		
		//String[] jimokArray = jimok_text != null && !jimok_text.trim().isEmpty() ? jimok_text.split(",") : new String[0]; // 빈 배열로 초기화

		String comple_yn = req.getParameter("comple_yn");
		String cancel_yn = req.getParameter("cancel_yn");
		String deunggi_date = req.getParameter("deunggi_date");
		String account_yn = req.getParameter("account_yn"); //회계처리 필요여부
		String start_date = req.getParameter("start_date");
		String end_date = req.getParameter("end_date");

		Map map=req.getParameterMap();

		HashMap params = new HashMap();
		params.put("draw",draw);
		params.put("start",start);
		params.put("length",length);
		params.put("jisa",jisa);
		params.put("idx",manage_no);
		params.put("dosiplan",dosiplan);
		params.put("address",address);
		params.put("sido_nm",sido_nm);
		params.put("sgg_nm",sgg_nm);
		params.put("emd_nm",emd_nm);
		params.put("ri_nm",ri_nm);
		params.put("jibun",jibun);

		params.put("souja",souja);
		params.put("jasan_no",jasan_no);

		//params.put("jimokArray", jimokArray);
		params.put("comple_yn", comple_yn);
		params.put("cancel_yn", cancel_yn);
		params.put("deunggi_date", deunggi_date);
		params.put("account_yn", account_yn);
		params.put("start_date", start_date);
		params.put("end_date", end_date);
		log.info("jimokTexts.size:"+jimokTexts.size());
		if (jimokTexts.size()>0) params.put("JIMOK_TEXT", jimokTexts);	//지목 추가
		else params.put("JIMOK_TEXT", null);	

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

		Object count= mainService.selectCountQuery("jisangSQL.selectJisangListCount", params);
		int total=(int)count;

		ArrayList<HashMap> list = mainService.selectQuery("jisangSQL.selectJisangListOrg",params);
		log.info("list: " + list);
		//ArrayList<HashMap> list = mainService.selectQuery("jisangSQL.selectJisangList",params);
		//ArrayList<HashMap> list = mainService.selectQuery("jisangSQL.selectJisangListDemo",params); //demo
		//log.info("list:"+list);


		HashMap<String,Object> resultmap=new HashMap();
		resultmap.put("draw",draw);
		resultmap.put("recordsTotal",total);
		resultmap.put("recordsFiltered",total);
		resultmap.put("data",list);

		JSONObject obj =new JSONObject(resultmap);
		//log.info("obj:"+obj);
		return ResponseEntity.ok(obj.toString());

	}
	
	@RequestMapping(value="/menu02_2DataTableList", method = {RequestMethod.GET, RequestMethod.POST}) //http://localhost:8080/api/get/dbTest
	public ResponseEntity<?> datatableList02_2(HttpServletRequest req, HttpServletResponse res) throws Exception {
		
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
		String dosiplan = req.getParameter("dosiplan");
		String address = req.getParameter("saddr");
		
		String sido_nm = req.getParameter("sido_nm");
		String sgg_nm = req.getParameter("sgg_nm");
		String emd_nm = req.getParameter("emd_nm");
		String ri_nm = req.getParameter("ri_nm");
		String jibun = req.getParameter("jibun");
		
		String souja = req.getParameter("souja");
		String jasan_no = req.getParameter("jasan_no");
		String jimok_text = req.getParameter("jimok_text");
		String[] jimokArray = jimok_text != null && !jimok_text.trim().isEmpty() ? jimok_text.split(",") : new String[0]; // 빈 배열로 초기화

		String comple_yn = req.getParameter("comple_yn");
		String cancel_yn = req.getParameter("cancel_yn");
		String deunggi_date = req.getParameter("deunggi_date");
		String account_yn = req.getParameter("account_yn"); //회계처리 필요여부
		String start_date = req.getParameter("start_date");
		String end_date = req.getParameter("end_date");

		Map map=req.getParameterMap();

		HashMap params = new HashMap();
		params.put("draw",draw);
		params.put("start",start);
		params.put("length",length);
		params.put("jisa",jisa);
		params.put("idx",manage_no);
		params.put("dosiplan",dosiplan);
		params.put("address",address);

		params.put("sido_nm",sido_nm);
		params.put("sgg_nm",sgg_nm);
		params.put("emd_nm",emd_nm);
		params.put("ri_nm",ri_nm);
		params.put("jibun",jibun);
		
		params.put("souja",souja);
		params.put("jasan_no",jasan_no);

		params.put("jimokArray", jimokArray);
		params.put("comple_yn", comple_yn);
		params.put("cancel_yn", cancel_yn);
		if ("N".equals(cancel_yn)) {
		    params.put("cancel_yn", null);  // null 조건을 추가하기 위해 cancel_yn에 null 값을 전달
		    params.put("cancel_yn_condition", "'N'  OR JM.jm_cancle_yn IS NULL or JM.jm_cancle_yn = ''");
		} else {
		    params.put("cancel_yn", cancel_yn);
		}
		if ("N".equals(account_yn)) {
		    params.put("account_yn", null);  // null 조건을 추가하기 위해 cancel_yn에 null 값을 전달
		    params.put("account_yn_condition", "'N'  OR JM.jm_account_yn IS NULL or JM.jm_account_yn = ''");
		} else {
		    params.put("account_yn", account_yn);
		}
		params.put("deunggi_date", deunggi_date);
		//params.put("account_yn", account_yn);
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

//		Object count= mainService.selectCountQuery("jisangSQL.selectJisangListCount02_2", params);
//		int total=(int)count;
//
//		ArrayList<HashMap> list = mainService.selectQuery("jisangSQL.selectJisangListOrg02_2",params);
		
		Object count= mainService.selectCountQuery("jisangSQL.selectJisangTerminationListCount", params);
		
		int total=Optional.ofNullable((int)count).orElse(0);

		ArrayList<HashMap> list = mainService.selectQuery("jisangSQL.selectJisangTerminationList",params);
		
		
		log.info("list: " + list);
		//ArrayList<HashMap> list = mainService.selectQuery("jisangSQL.selectJisangList",params);
		//ArrayList<HashMap> list = mainService.selectQuery("jisangSQL.selectJisangListDemo",params); //demo
		//log.info("list:"+list);


		HashMap<String,Object> resultmap=new HashMap();
		resultmap.put("draw",draw);
		resultmap.put("recordsTotal",total);
		resultmap.put("recordsFiltered",total);
		resultmap.put("data",list);

		JSONObject obj =new JSONObject(resultmap);
		//log.info("obj:"+obj);
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
		String sido_nm = req.getParameter("sido_nm");
		String sgg_nm = req.getParameter("sgg_nm");
		String emd_nm = req.getParameter("emd_nm");
		String ri_nm = req.getParameter("ri_nm");
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
		params.put("address",address);
		params.put("sido_nm",sido_nm);
		params.put("sgg_nm",sgg_nm);
		params.put("emd_nm",emd_nm);
		params.put("ri_nm",ri_nm);
		params.put("jibun",jibun);

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
		String address = req.getParameter("saddr");
		String sido_nm = req.getParameter("sido_nm");
		String sgg_nm = req.getParameter("sgg");
		String emd_nm = req.getParameter("emd");
		String ri_nm = req.getParameter("ri");
		String jibun = req.getParameter("jibun");
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
		params.put("sido_nm",sido_nm);
		params.put("sgg_nm",sgg_nm);
		params.put("emd_nm",emd_nm);
		params.put("ri_nm",ri_nm);
		params.put("jibun",jibun);
		params.put("souja",souja);
		params.put("jasan_no",jasan_no);
		params.put("account_yn", account_yn);
		
		//241006
		params.put("JISA", jisa);

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

		Object count= mainService.selectCountQuery("jisangSQL.selectJisangDivisionListCount", params);
		int total=(int)count;

		ArrayList<HashMap> list = mainService.selectQuery("jisangSQL.selectJisangDivisionList",params);
//		Object count= mainService.selectCountQuery("jisangSQL.selectJisangBunhalCount", params);
//		int total=(int)count;
//
//		ArrayList<HashMap> list = mainService.selectQuery("jisangSQL.selectJisangBunhalList",params);

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
	@GetMapping(path="/divisionRegisterSangsin") //http://localhost:8080/jisang/divisionRegisterSangsin?idx=J_007487
	public void divisionRegisterSangsin(HttpServletRequest httpRequest, HttpServletResponse response) throws Exception {
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
//log.info("data:"+data.get(0));
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
			String str_UserId = String.valueOf(httpRequest.getSession().getAttribute("userId"));
			String str_userName = String.valueOf(httpRequest.getSession().getAttribute("userName"));
			String str_userDeptcd = String.valueOf(httpRequest.getSession().getAttribute("userDeptcd"));
			String str_userDeptnm = String.valueOf(httpRequest.getSession().getAttribute("userDeptnm"));
			String str_userUPDeptcd = String.valueOf(httpRequest.getSession().getAttribute("userUPDeptcd"));
			/*
			 * String str_UserId = "105681"; String str_userName = "박영환"; String
			 * str_userDeptcd = "D250500"; String str_userDeptnm = "IT전략.지원팀"; String
			 * str_userUPDeptcd = "S250100";
			 */
			res_Echo = epc.GetPLMSDataforXML(str_appNo, eph.getJisang_divide_HTML(jisangno), str_UserId, "", "", "GetSurfaceRightsDivisionDataforXML", str_userName, str_userDeptcd, str_userDeptnm, str_userUPDeptcd);
		}
		System.out.println("insertJisangBunhalNew::"+res_Echo);
		//res_Echo=true;
		if (res_Echo) {

			// 문서번호 업데이트
			map.put("DOCKEY", str_appNo);
			str_result = "Y";
			map.put("JISANGNO", jisangno);
			mainService.InsertQuery("jisangSQL.updateJisangBunhalEchoNo", map);
			
			//("Json.updateJisangBunhalEchoNo", map);
			

			 System.out.println("%%%%%%%%%%%%map=" + map);
			// 문서 URL조회
			//ArrayList echolist = (ArrayList) Database.getInstance().queryForList("Json.selectJisangBunHalDocInfo", map);
			ArrayList echolist = (ArrayList) mainService.selectQuery("jisangSQL.selectJisangBunHalDocInfo", map);
			 System.out.println("echoList0:"+echolist.get(0));
			if (null != echolist && echolist.size() > 0) {
				String str_EchoNo = String.valueOf(((HashMap) echolist.get(0)).get("pa_out_url"));
				System.out.println("bunhal str_EchoNo=====" + str_EchoNo);
				map.put("OUT_URL", str_EchoNo);
			}

		} else {
			str_result = "N";
		}

		
		map.put("message", str_result);
		//
					JSONObject jo = new JSONObject(map);
		
					response.setCharacterEncoding("UTF-8");
					response.setHeader("Access-Control-Allow-Origin", "*");
					response.resetBuffer();
					response.setContentType("application/json");
					response.getWriter().print(jo);
					response.getWriter().flush();
//		ModelAndView mav=new ModelAndView();
//
//		mav.addObject("resultData",data.get(0));
//		mav.addObject("soujaList",soujaList);
//		mav.addObject("bunhalList",bunhalList);
//		mav.addObject("atcfileList",atcfilelist);
//		log.info("resultData:"+ data.get(0));
//		log.info("soujaList:"+soujaList);
//		log.info("bunhalList:"+bunhalList);
//		log.info("atcfileList:"+atcfilelist);
//		mav.setViewName("content/jisang/divisionRegisterSangsin");
//		return mav;
	}
	
	// 지상권 분할등록 신규 :: 분할상신
	@Transactional
	@GetMapping(path="/insertJisangBunhalNew") 
		public void insertJisangBunhalNew(HttpServletRequest request, HttpServletResponse response) throws Exception {
			ParameterParser parser = new ParameterParser(request);
			//String idx = httpRequest.getParameter("idx");
			String jisangno = parser.getString("idx", "");
			String bunhal_status = parser.getString("bunhal_status", "");
			String modifyReason = "";
			String modifyReason2 = "";
			String USER_ID = String.valueOf(request.getSession().getAttribute("userId"));
			String USER_NAME = String.valueOf(request.getSession().getAttribute("userName"));

			CommonUtil comm = new CommonUtil();
			String str_result = "Y";

			HashMap map = new HashMap(); // 응답용 맵

			try {
				//Database.getInstance().startTransaction();

				// 1. 기존 지상권 정보 분할여부, 분할사유, 검토의견 등록
				Map params = new HashMap();
				params.put("JISANGNO", jisangno);

				// 5.전자결재 상신처리.
				// 전자결재 반려시에 대한 프로세스가 없음. 따라서 원상복구 가능하도록 모지번을 제외한 하위 지상권 정보 별도처리 계획
//				ElectronicPaymentHTML eph = new ElectronicPaymentHTML(); // 상신용 HTML
//				ElectronicPaymentUtil epc = new ElectronicPaymentUtil(); // 전자결재 연계
				ApprovalHtmlUtil eph=new ApprovalHtmlUtil();
				ApprovalUtil epc= new ApprovalUtil();

				// 반려시 기존 DOCKEY로 사용
				String str_appNo = "";
				// System.out.println("test :: " + bunhal_status);
				if ("R".equals(bunhal_status)) {
					map.put("JISANGNO", jisangno);
					ArrayList<HashMap> echolist = (ArrayList<HashMap>) mainService.selectQuery("jisangSQL.selectJisangBunHalDocInfo", map);
					str_appNo = (String) echolist.get(0).get("DOCKEY");
				} else {
					str_appNo = CommonUtil.getNextAppovalSeq();
				}

				boolean res_Echo = false;
				System.out.println("insertJisangBunhalNew::"+str_appNo);
				if ("".equals(str_appNo)) {
					map.put("message", "N");
				} else {
					String str_UserId = String.valueOf(request.getSession().getAttribute("userId"));
					String str_userName = String.valueOf(request.getSession().getAttribute("userName"));
					String str_userDeptcd = String.valueOf(request.getSession().getAttribute("userDeptcd"));
					String str_userDeptnm = String.valueOf(request.getSession().getAttribute("userDeptnm"));
					String str_userUPDeptcd = String.valueOf(request.getSession().getAttribute("userUPDeptcd"));
					res_Echo = epc.GetPLMSDataforXML(str_appNo, eph.getJisang_divide_HTML(jisangno), str_UserId, "", "", "GetSurfaceRightsDivisionDataforXML", str_userName, str_userDeptcd, str_userDeptnm, str_userUPDeptcd);
				}
				System.out.println("insertJisangBunhalNew::"+res_Echo);
				
				if (res_Echo) {

					// 문서번호 업데이트
					map.put("DOCKEY", str_appNo);
					str_result = "Y";
					map.put("JISANGNO", jisangno);
					mainService.UpdateQuery("jisangSQL.updateJisangBunhalEchoNo", map);

					// System.out.println("%%%%%%%%%%%%map=" + map);
					// 문서 URL조회                                                               selectJisangBunHalDocInfo
					ArrayList echolist = (ArrayList) mainService.selectQuery("jisangSQL.selectJisangBunHalDocInfo", map);
					if (null != echolist && echolist.size() > 0) {
						String str_EchoNo = String.valueOf(((HashMap) echolist.get(0)).get("pa_out_url"));
						System.out.println("str_EchoNo=====" + str_EchoNo);
						map.put("OUT_URL", str_EchoNo);
					}

				} else {
					str_result = "N";
				}
				//Database.getInstance().commitTransaction();

			} catch (Exception e) {
				str_result = "N";
				e.printStackTrace();
			} finally {
				//Database.getInstance().endTransaction();
			}

			map.put("message", str_result);

			JSONObject jo = new JSONObject(map);

			response.setCharacterEncoding("UTF-8");
			response.setHeader("Access-Control-Allow-Origin", "*");
			response.resetBuffer();
			response.setContentType("application/json");
			response.getWriter().print(jo);
			response.getWriter().flush();
		}
	
	
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
	        	
	        	log.info("sqlParams:"+sqlParams);
	        	
	        	//파일등록
	        	ArrayList<HashMap<String, String>> docArray = new ArrayList<>();
	        	
	    		log.info("req_doc_file01:"+requestJsonObj.getString("req_doc_file01"));
	    		
	    		if (requestJsonObj.getString("req_doc_file01")!=null && requestJsonObj.getString("req_doc_file01")!="" && !requestJsonObj.getString("req_doc_file01").equals("")) {
	    			HashMap<String,String> docMap = new HashMap();
	    			docMap.put("jisang_no",  jisang_no);
	    			docMap.put("fseq","1");
	    			docMap.put("file_name",  httpRequest.getParameter("req_doc_file01"));
	    			String fpath=GC.getJisangBunhalDataDir()+"/"+jisang_no;
	    			String tmp=GC.getJisangFileTempDir();
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
	    			String fpath=GC.getJisangBunhalDataDir()+"/"+jisang_no;
	    			String tmp=GC.getJisangFileTempDir();
	    			docMap.put("file_path",  fpath);
	    			 CommonUtil.moveFile(requestJsonObj.getString("req_doc_file02"), tmp, fpath);
	    			 docArray.add(docMap);
	    		}
	    		
	    		if (requestJsonObj.getString("req_doc_file03")!=null && requestJsonObj.getString("req_doc_file03")!="" && !requestJsonObj.getString("req_doc_file03").equals("")) {
	    			HashMap<String,String> docMap = new HashMap();
	    			docMap.put("jisang_no",  jisang_no);
	    			docMap.put("fseq","3");
	    			docMap.put("file_name",  requestJsonObj.getString("req_doc_file03"));
	    			String fpath=GC.getJisangBunhalDataDir()+"/"+jisang_no;
	    			String tmp=GC.getJisangFileTempDir();
	    			docMap.put("file_path",  fpath);
	    			 CommonUtil.moveFile(requestJsonObj.getString("req_doc_file03"), tmp, fpath);
	    			 docArray.add(docMap);
	    		}
	    		
	    		if (requestJsonObj.getString("req_doc_file04")!=null && requestJsonObj.getString("req_doc_file04")!="" && !requestJsonObj.getString("req_doc_file04").equals("")) {
	    			HashMap<String,String> docMap = new HashMap();
	    			docMap.put("jisang_no",  jisang_no);
	    			docMap.put("fseq","4");
	    			docMap.put("file_name",  requestJsonObj.getString("req_doc_file04"));
	    			String fpath=GC.getJisangBunhalDataDir()+"/"+jisang_no;
	    			String tmp=GC.getJisangFileTempDir();
	    			docMap.put("file_path",  fpath);
	    			 CommonUtil.moveFile(requestJsonObj.getString("req_doc_file04"), tmp, fpath);
	    			 docArray.add(docMap);
	    		}
	    		
	    		if (requestJsonObj.getString("req_doc_file05")!=null && requestJsonObj.getString("req_doc_file05")!="" && !requestJsonObj.getString("req_doc_file05").equals("")) {
	    			HashMap<String,String> docMap = new HashMap();
	    			docMap.put("jisang_no",  jisang_no);
	    			docMap.put("fseq","5");
	    			docMap.put("file_name",  requestJsonObj.getString("req_doc_file05"));
	    			String fpath=GC.getJisangBunhalDataDir()+"/"+jisang_no;
	    			String tmp=GC.getJisangFileTempDir();
	    			docMap.put("file_path",  fpath);
	    			 CommonUtil.moveFile(requestJsonObj.getString("req_doc_file05"), tmp, fpath);
	    			 docArray.add(docMap);
	    		}
	    		
	    		if (requestJsonObj.getString("req_doc_file06")!=null && requestJsonObj.getString("req_doc_file06")!="" && !requestJsonObj.getString("req_doc_file06").equals("")) {
	    			HashMap<String,String> docMap = new HashMap();
	    			docMap.put("jisang_no",  jisang_no);
	    			docMap.put("fseq","6");
	    			docMap.put("file_name",  requestJsonObj.getString("req_doc_file06"));
	    			String fpath=GC.getJisangBunhalDataDir()+"/"+jisang_no;
	    			String tmp=GC.getJisangFileTempDir();
	    			docMap.put("file_path",  fpath);
	    			 CommonUtil.moveFile(requestJsonObj.getString("req_doc_file06"), tmp, fpath);
	    			 docArray.add(docMap);
	    		}
	    		
	    		if (requestJsonObj.getString("req_doc_file07")!=null && requestJsonObj.getString("req_doc_file07")!="" && !requestJsonObj.getString("req_doc_file07").equals("")) {
	    			HashMap<String,String> docMap = new HashMap();
	    			docMap.put("jisang_no",  jisang_no);
	    			docMap.put("fseq","7");
	    			docMap.put("file_name",  requestJsonObj.getString("req_doc_file07"));
	    			String fpath=GC.getJisangBunhalDataDir()+"/"+jisang_no;
	    			String tmp=GC.getJisangFileTempDir();
	    			docMap.put("file_path",  fpath);
	    			 CommonUtil.moveFile(requestJsonObj.getString("req_doc_file07"), tmp, fpath);
	    			 docArray.add(docMap);
	    		}
	    		
	    		if (requestJsonObj.getString("req_doc_file08")!=null && requestJsonObj.getString("req_doc_file08")!="" && !requestJsonObj.getString("req_doc_file08").equals("")) {
	    			HashMap<String,String> docMap = new HashMap();
	    			docMap.put("jisang_no",  jisang_no);
	    			docMap.put("fseq","8");
	    			docMap.put("file_name",  requestJsonObj.getString("req_doc_file08"));
	    			String fpath=GC.getJisangBunhalDataDir()+"/"+jisang_no;
	    			String tmp=GC.getJisangFileTempDir();
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
	
	
	@GetMapping(path="/test1111")
	public void test1111(HttpServletRequest httpRequest, HttpServletResponse response) throws Exception {
		 String requestParams = ParameterUtil.getRequestBodyToStr(httpRequest);
		
		 log.info("requestParams:"+requestParams);
		 JSONObject requestParamObj=new JSONObject(requestParams);
		 HashMap<String,Object> resultmap=new HashMap();
	        resultmap.put("resultCode","0000");
	        resultmap.put("params", requestParamObj);
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
				String fpath=GC.getJisangReqDoc1Dir();
				String tmp=GC.getJisangFileTempDir();
				docMap.put("file_path",  fpath);
				 CommonUtil.moveFile(httpRequest.getParameter("req_doc_file01"), tmp, fpath);
				 docArray.add(docMap);
			}
			if (httpRequest.getParameter("req_doc_file02")!=null && httpRequest.getParameter("req_doc_file02")!="" && !httpRequest.getParameter("req_doc_file02").equals("")) {
				HashMap<String,String> docMap = new HashMap();
				docMap.put("jisang_no",  jisang_no);
				docMap.put("fseq","2");
				docMap.put("file_name",  httpRequest.getParameter("req_doc_file02"));
				String fpath=GC.getJisangReqDoc1Dir();
				String tmp=GC.getJisangFileTempDir();
				docMap.put("file_path",  fpath);
				 CommonUtil.moveFile(httpRequest.getParameter("req_doc_file02"), tmp, fpath);
				 docArray.add(docMap);
			}
			if (httpRequest.getParameter("req_doc_file03")!=null && httpRequest.getParameter("req_doc_file03")!="" && !httpRequest.getParameter("req_doc_file03").equals("")) {
				HashMap<String,String> docMap = new HashMap();
				docMap.put("jisang_no",  jisang_no);
				docMap.put("fseq","3");
				docMap.put("file_name",  httpRequest.getParameter("req_doc_file03"));
				String fpath=GC.getJisangReqDoc1Dir();
				String tmp=GC.getJisangFileTempDir();
				docMap.put("file_path",  fpath);
				 CommonUtil.moveFile(httpRequest.getParameter("req_doc_file03"), tmp, fpath);
				 docArray.add(docMap);
			}
			if (httpRequest.getParameter("req_doc_file04")!=null && httpRequest.getParameter("req_doc_file04")!="" && !httpRequest.getParameter("req_doc_file04").equals("")) {
				HashMap<String,String> docMap = new HashMap();
				docMap.put("jisang_no",  jisang_no);
				docMap.put("fseq","4");
				docMap.put("file_name",  httpRequest.getParameter("req_doc_file04"));
				String fpath=GC.getJisangReqDoc1Dir();
				String tmp=GC.getJisangFileTempDir();
				docMap.put("file_path",  fpath);
				 CommonUtil.moveFile(httpRequest.getParameter("req_doc_file04"), tmp, fpath);
				 docArray.add(docMap);
			}
			if (httpRequest.getParameter("req_doc_file05")!=null && httpRequest.getParameter("req_doc_file05")!="" && !httpRequest.getParameter("req_doc_file05").equals("")) {
				HashMap<String,String> docMap = new HashMap();
				docMap.put("jisang_no",  jisang_no);
				docMap.put("fseq","5");
				docMap.put("file_name",  httpRequest.getParameter("req_doc_file05"));
				String fpath=GC.getJisangReqDoc1Dir();
				String tmp=GC.getJisangFileTempDir();
				docMap.put("file_path",  fpath);
				 CommonUtil.moveFile(httpRequest.getParameter("req_doc_file05"), tmp, fpath);
				 docArray.add(docMap);
			}
			if (httpRequest.getParameter("req_doc_file06")!=null && httpRequest.getParameter("req_doc_file06")!="" && !httpRequest.getParameter("req_doc_file06").equals("")) {
				HashMap<String,String> docMap = new HashMap();
				docMap.put("jisang_no",  jisang_no);
				docMap.put("fseq","6");
				docMap.put("file_name",  httpRequest.getParameter("req_doc_file06"));
				String fpath=GC.getJisangReqDoc1Dir();
				String tmp=GC.getJisangFileTempDir();
				docMap.put("file_path",  fpath);
				 CommonUtil.moveFile(httpRequest.getParameter("req_doc_file06"), tmp, fpath);
				 docArray.add(docMap);
			}
			if (httpRequest.getParameter("req_doc_file07")!=null && httpRequest.getParameter("req_doc_file07")!="" && !httpRequest.getParameter("req_doc_file07").equals("")) {
				HashMap<String,String> docMap = new HashMap();
				docMap.put("jisang_no",  jisang_no);
				docMap.put("fseq","7");
				docMap.put("file_name",  httpRequest.getParameter("req_doc_file07"));
				String fpath=GC.getJisangReqDoc1Dir();
				String tmp=GC.getJisangFileTempDir();
				docMap.put("file_path",  fpath);
				 CommonUtil.moveFile(httpRequest.getParameter("req_doc_file07"), tmp, fpath);
				 docArray.add(docMap);
			}
			if (httpRequest.getParameter("req_doc_file08")!=null && httpRequest.getParameter("req_doc_file08")!="" && !httpRequest.getParameter("req_doc_file08").equals("")) {
				HashMap<String,String> docMap = new HashMap();
				docMap.put("jisang_no",  jisang_no);
				docMap.put("fseq","8");
				docMap.put("file_name",  httpRequest.getParameter("req_doc_file08"));
				String fpath=GC.getJisangReqDoc1Dir();
				String tmp=GC.getJisangFileTempDir();
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
	
	// 지상권 해지 저장 - 해지사유 및 검토 의견만 임시 저장처리
	@Transactional
	@PostMapping(path="/insertJisangTerminationTemp")
	public void insertJisangTerminationTemp(HttpServletRequest request, HttpServletResponse response) throws Exception {
	String requestParams = ParameterUtil.getRequestBodyToStr(request);
	 log.info("requestParams:"+requestParams);
	 JSONObject requestParamObj=new JSONObject(requestParams);
		ParameterParser parser = new ParameterParser(request);
		String jisangNo = requestParamObj.getString("jisang_no");
		String startDay = requestParamObj.getString("cancel_date").replace("-", "");
		String cancle_yes = requestParamObj.has("cancle_yes")?requestParamObj.getString("cancle_yes"):""; //해지여부
		String cancle_bosang_money = requestParamObj.getString("cancel_bosang_money");
		String empCd = String.valueOf(request.getSession().getAttribute("userId"));
		String empName = String.valueOf(request.getSession().getAttribute("userName"));
		String cancle_chuideuk_money = requestParamObj.optString("chuideuk_money").isEmpty() ? "" : requestParamObj.getString("chuideuk_money");
		String cancle_chuideuk_gammoney = requestParamObj.optString("gammoney").isEmpty() ? "" : requestParamObj.getString("gammoney");
		String cancle_chuideuk_remainder_money = requestParamObj.optString("remainder_money").isEmpty() ? "" : requestParamObj.getString("remainder_money");
		String cancle_reason = requestParamObj.getString("cancel_reason");
		String cancle_comment = requestParamObj.getString("cancel_comment");
		String cancel_bosang_yn = requestParamObj.getString("cancel_bosang_yn");
		String account_yn=requestParamObj.getString("account_yn");
		//String filenumber = requestParamObj.getString("filenumber");
		//String fileseq = requestParamObj.getString("fileseq"); // 파일 seq

		String str_result = "Y";
		try {

			HashMap params = new HashMap();
			params.put("JISANGNO", jisangNo);
			params.put("STARTDAY", startDay);
			params.put("CANCLE_YES", cancle_yes);
			params.put("CANCLE_BOSANG_MONEY", cancle_bosang_money.replace(",",""));
			params.put("CHUIDEUKMONEY", cancle_chuideuk_money.replace(",",""));
			params.put("GAMMONEY", cancle_chuideuk_gammoney.replace(",",""));
			params.put("REMAINDERMONEY", cancle_chuideuk_remainder_money.replace(",",""));
			params.put("EMPCD", empCd);
			params.put("NAME", empName);
			params.put("CANCLE_REASON", cancle_reason);
			params.put("CANCLE_COMMENT", cancle_comment);
			params.put("CANCLE_BOSANG_YN", cancel_bosang_yn);
			params.put("ACCOUNT_YN", account_yn);
			//params.put("FILESEQ", fileseq);
			params.put("CANCLE_STATUS", "임시저장");

			 //////mainService.UpdateQuery("jisangSQL.insertJisangTerminationTemp", params);

			mainService.UpdateQuery("jisangSQL.mergeJisangTermination", params);

			for(int i=1;i<9;i++) {
	        	String key=String.format("%02d",i);
	        	if (requestParamObj.getString("req_doc_file"+key)!=null) {
	        		log.info("Key:"+key);
	        		String fname=requestParamObj.getString("req_doc_file"+key);
	        		log.info("fname:"+fname);
	        		if (fname.equals("") || fname==null ) continue;
	        		
	        		
	        		HashMap<String, Object> filesMap= new HashMap<>();
	        		filesMap.put("MANAGE_NO",jisangNo);
	    			//filesMap.put("seq",String.format("%06d",i));
	    			filesMap.put("fseq",i);
	    			filesMap.put("FILE_GUBUN",i);
	    			filesMap.put("FILE_NM",fname);
	    			 String tempPath = GC.getJisangFileTempDir(); //설정파일로 뺀다.
	     			 String dataPath = GC.getJisangFileDataDir()+"/jisangCancel/"+jisangNo; //설정파일로 뺀다.
	     			 filesMap.put("FILE_PATH",dataPath+"/"+fname);
	     			 CommonUtil.moveFile(fname, tempPath, dataPath);
	     			log.info("filesMap:"+filesMap);
	     			
	     			
	     			//해당파일있는지체크 
	     			int fcount=(int)mainService.selectCountQuery("jisangSQL.selectCancelFileCount", filesMap);
	     			log.info("fcount:"+fcount);
	     			if (fcount>0) mainService.InsertQuery("jisangSQL.updateCancelFile", filesMap);
	     			else mainService.InsertQuery("jisangSQL.insertCancelFile", filesMap);
	        	}
	        }
//				for (int i = 0; i < Integer.parseInt(filenumber); i++) {
//					String IS_DEL = parser.getString("isFileDel" + String.valueOf(i), "");
//					String DEL_SEQ = parser.getString("fileseq" + String.valueOf(i), "");
//
//					if (IS_DEL.equals("Y")) {
//						// System.out.println("FILE_DEL_SEQ=" + DEL_SEQ);
//
//						// 조회용 param셋팅
//						params.put("SEQ", "");
//						params.put("FILENO", String.valueOf((params.get("JISANGNO"))));
//						params.put("FILE_SEQ", DEL_SEQ);
//					//	ArrayList File_list = (ArrayList) Database.getInstance().queryForList("Json.selectJisangRowDetail_Files", params); // 첨부
//
//						params.put("SEQ", DEL_SEQ);
//						//Database.getInstance().update("Json.deleteFile", params);
//
//						// 변경이력 등록
////						if (null != File_list && File_list.size() > 0) {
////							String str_FileName = String.valueOf(((HashMap) File_list.get(0)).get("FILE_NM"));
////							params.put("GUBUN", "파일정보");
////							params.put("CONT", "파일삭제(" + str_FileName + ")");
////							//Database.getInstance().insert("Json.insertJisangModifyHistory", params);
////						}
//					}
//				}

			// System.out.println("params=" + params);
			/** codecanyon에서 파일업로드 **/
			//Database.getInstance().update("Json.updateSeqFile", params); // 파일테이블에 지상권번호 업데이트

		} catch (Exception e) {
			str_result = "N";
			e.printStackTrace();
		}
		HashMap map = new HashMap();

		map.put("message", str_result);
		 JSONObject obj = new JSONObject(map);
    	 // log.info("jo:"+jo);
        response.setCharacterEncoding("UTF-8");
        response.setHeader("Access-Control-Allow-Origin", "*");
        response.setHeader("Cache-Control", "no-cache");
        response.resetBuffer();
        response.setContentType("application/json");
        // response.getOutputStream().write(jo);
        response.getWriter().print(obj);
        response.getWriter().flush();


		//this.mapToJsonResponse(response, map);
	}
	
	// 지상권 해지 등록 임시저장후 > 상신
	@Transactional
	@PostMapping(path="/insertJisangTerminationAdd")
		public void insertJisangTerminationAdd(HttpServletRequest request, HttpServletResponse response) throws Exception {
		 String requestParams = ParameterUtil.getRequestBodyToStr(request);
		 log.info("requestParams:"+requestParams);
		 JSONObject requestParamObj=new JSONObject(requestParams);
			ParameterParser parser = new ParameterParser(request);
			String jisangNo = parser.getString("jisangNo", "");
			String startDay = parser.getString("startDay", "").replace("-", "");
			String cancle_yes = parser.getString("cancle_yes", "");
			String cancle_bosang_money = parser.getString("cancle_bosang_money", "");
//			String empCd = String.valueOf(request.getSession().getAttribute("userId"));
//			String empName = String.valueOf(request.getSession().getAttribute("userName"));
			String empCd=parser.getString("empCd","");
			String empName=parser.getString("empName","");
			String account_yn = parser.getString("account_yn"); // 회계처리 필요여부
			String cancle_chuideuk_money = parser.getString("cancle_chuideuk_money", "");
			String cancle_chuideuk_gammoney = parser.getString("cancle_chuideuk_gammoney", "");
			String cancle_chuideuk_remainder_money = parser.getString("cancle_chuideuk_remainder_money", "");
			String cancle_reason = parser.getString("cancle_reason", "");
			String cancle_status = parser.getString("cancle_status", "");
			String cancle_comment = parser.getString("cancle_comment", "");
			String filenumber = parser.getString("filenumber", "");

			String fileseq = parser.getString("fileseq", ""); // 파일 seq

			String str_result = "Y";
			HashMap map = new HashMap();

			try {

				HashMap params = new HashMap();
				params.put("JISANGNO", jisangNo);
				params.put("STARTDAY", startDay);
				params.put("CANCLE_YES", cancle_yes);
				params.put("CANCLE_BOSANG_MONEY", cancle_bosang_money);
				params.put("CHUIDEUKMONEY", cancle_chuideuk_money);
				params.put("GAMMONEY", cancle_chuideuk_gammoney);
				params.put("REMAINDERMONEY", cancle_chuideuk_remainder_money);
				params.put("EMPCD", empCd);
				params.put("NAME", empName);
				params.put("account_yn", account_yn);
				params.put("CANCLE_REASON", cancle_reason);
				params.put("CANCLE_COMMENT", cancle_comment);
				params.put("FILESEQ", fileseq);
				params.put("CANCLE_STATUS", "상신");
				
				log.info("params:"+params);

				/** 분할한 지번인지, 분할한 지번이라면 원지번이 다른곳에서 바라보고있는지 조회 **/
				// int hunhalCnt = (Integer)
				// Database.getInstance().queryForObject("Json.selectBunhalOrgNo",
				// params);
				// System.out.println("insertJisangTerminationAdd >>>> 지상권해제params=" + params);
				// if(hunhalCnt <= 1){
				// ** JIJUK_MASTER 테이블 지상권 해제**//
				// Database.getInstance().update("Json.updateJijukMasterStatus", params);
				// }

				// Database.getInstance().update("Json.insertJisangTerminationAdd", params);

				mainService.InsertQuery("jisangSQL.mergeJisangTermination", params);// 해지정보 저장

//				for (int i = 0; i < Integer.parseInt(filenumber); i++) {
//					String IS_DEL = parser.getString("isFileDel" + String.valueOf(i), "");
//					String DEL_SEQ = parser.getString("fileSeq" + String.valueOf(i), "");
//
//					if (IS_DEL.equals("Y")) {
//						// System.out.println("FILE_DEL_SEQ=" + DEL_SEQ);
//
//						// 조회용 parma셋팅
//						params.put("SEQ", "");
//						params.put("FILENO", String.valueOf((params.get("JISANGNO"))));
//						params.put("FILE_SEQ", DEL_SEQ);
//						ArrayList File_list = (ArrayList) Database.getInstance().queryForList("Json.selectJisangRowDetail_Files", params); // 첨부
//																																			// 파일
//
//						params.put("SEQ", DEL_SEQ);
//						Database.getInstance().update("Json.deleteFile", params);
//
//						// 변경이력 등록
//						if (null != File_list && File_list.size() > 0) {
//							String str_FileName = String.valueOf(((HashMap) File_list.get(0)).get("FILE_NM"));
//							params.put("GUBUN", "파일정보");
//							params.put("CONT", "파일삭제(" + str_FileName + ")");
//							Database.getInstance().insert("Json.insertJisangModifyHistory", params);
//						}
//					}
//				}
//
				System.out.println("params=" + params);
//				/** codecanyon에서 파일업로드 **/
//				Database.getInstance().update("Json.updateSeqFile", params); // 파일테이블에 지상권번호 업데이트
//
				
				ApprovalHtmlUtil eph=new ApprovalHtmlUtil();
				ApprovalUtil epc= new ApprovalUtil();
//				// 전자결재 상신처리 및 문서번호 업데이트
//				ElectronicPaymentHTML eph = new ElectronicPaymentHTML(); // 상신용 HTML
//				ElectronicPaymentUtil epc = new ElectronicPaymentUtil(); // 전자결재 연계
				CommonUtil cu = new CommonUtil();
				String str_appNo = "";

				// 반려시 기존 DOCKEY로 사용
				if ("R".equals(cancle_status)) {
					map.put("JISANGNO", jisangNo);
					ArrayList<HashMap> echolist = (ArrayList) mainService.selectQuery("jisangSQL.selectJisangDocInfo", map);
					//ArrayList<HashMap> echolist = (ArrayList<HashMap>) Database.getInstance().queryForList("Json.selectJisangDocInfo", map);
					str_appNo = (String) echolist.get(0).get("pa_dockey");
				} else {
					str_appNo = cu.getNextAppovalSeq();
				}
				boolean res_Echo = false;
				if ("".equals(str_appNo)) {
					map.put("message", "N");
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
					res_Echo = epc.GetPLMSDataforXML(str_appNo, eph.getJisang_termination_HTML("", jisangNo, "", "", "", request, response), str_UserId, "", "", "GetSurfaceRightsCancelDataforXML", str_userName, str_userDeptcd, str_userDeptnm, str_userUPDeptcd);
				}
//
//				if (res_Echo) {
//					// 문서번호 업데이트
//					map.put("DOCKEY", str_appNo);
//					map.put("JISANGNO", jisangNo);
//					map.put("message", "Y");
//					// System.out.println("updateJisangEchoNo=" + map);
//					Database.getInstance().update("Json.updateJisangEchoNo", map);
//					Database.getInstance().update("Json.updateJisangTerminationDockey", map); // 해지정보 결재연계정보 저장
//
//					// 문서 URL조회
//					ArrayList echolist = (ArrayList) Database.getInstance().queryForList("Json.selectJisangDocInfo", map);
//					// System.out.println("echolist=" + map);
//					if (null != echolist && echolist.size() > 0) {
//						String str_EchoNo = String.valueOf(((HashMap) echolist.get(0)).get("OUT_URL"));
//						// System.out.println("str_EchoNo=====" + str_EchoNo);
//						map.put("OUT_URL", str_EchoNo);
//					}
//
//				} else {
//					map.put("message", "N");
//				}
//
			} catch (Exception e) {
				str_result = "N";
				e.printStackTrace();
			}
//
//			map.put("message", str_result);
//
//			this.mapToJsonResponse(response, map);
		}
	
	//지상합필저장
	@Transactional
	@PostMapping(path="/saveJisangMerge")
	public void saveJisangMerge(HttpServletRequest request, HttpServletResponse response) throws Exception {

		
		 String requestParams = ParameterUtil.getRequestBodyToStr(request);
		 log.info("requestParams:"+requestParams);
		 JSONObject requestParamObj=new JSONObject(requestParams);
		 //log.info(":"+request.getParameter("MERGE_INSERT_REASON"));
		// 결과 리턴용 맵객체 선언
		HashMap map = new HashMap();

		ParameterParser parser = new ParameterParser(request);
		//log.info("parser:"+requestParams.);
//		String mergereason = parser.getString("MERGE_INSERT_REASON", ""); // 합필사유
//		String mergecomment = parser.getString("MERGE_INSERT_COMMENT", ""); // 검토의견
//		String mainJisangNo = parser.getString("MAIN_JISANG_NO", ""); // 대표지상권번호
//		String mainTmpJisangNo = parser.getString("MAIN_TMP_JISANG_NO", ""); // 임시저장시 대표지상권 변경시 삭제할 모지번
//		String mergeInsertCnt = parser.getString("MERGE_INSERT_CNT", "0"); // 합병대상지상권 전체 건수
//		String merge_status = parser.getString("MERGE_STATUS", "0"); // 결재 상태
//		String gubun = parser.getString("GUBUN", ""); // 합병대상지상권 전체 건수
//		String MERGE_STATUS = ""; // 합필상태
		
		String mergereason = requestParamObj.getString("MERGE_INSERT_REASON"); // 합필사유
		String mergecomment = requestParamObj.getString("MERGE_INSERT_COMMENT"); // 검토의견
		String mainJisangNo = requestParamObj.getString("MAIN_JISANG_NO"); // 대표지상권번호
		String mainTmpJisangNo = requestParamObj.getString("MAIN_TMP_JISANG_NO"); // 임시저장시 대표지상권 변경시 삭제할 모지번
		String mergeInsertCnt = requestParamObj.getString("MERGE_INSERT_CNT"); // 합병대상지상권 전체 건수
		String merge_status = requestParamObj.getString("MERGE_STATUS"); // 결재 상태
		String gubun = requestParamObj.getString("GUBUN"); // 합병대상지상권 전체 건수
		String MERGE_STATUS = ""; // 합필상태
		//String mergereason
		
		JSONArray MergeList=requestParamObj.getJSONArray("mergeList");
		log.info("MergeList0:"+MergeList.get(0));
		
		
		int intMergeInsertCnt = Integer.parseInt(mergeInsertCnt);
		ArrayList<HashMap<String, String>> list = new ArrayList<HashMap<String, String>>();

		String USER_ID = String.valueOf(request.getSession().getAttribute("userId"));
		String USER_NAME = String.valueOf(request.getSession().getAttribute("userName"));

		String str_result = "Y";

		try {

			//Database.getInstance().startTransaction();
			HashMap param = new HashMap();
			// 임시저장시 대표지상권이 변경 됬을시 변경되기전 대표지상권으로 임시저장내용 삭제
			param.put("REP_JISANG_NO", ("".equals(CommonUtil.nvl(mainTmpJisangNo)) ? mainJisangNo : mainTmpJisangNo));
			//Database.getInstance().delete("Json.deleteJisangMergeTmp", param);

			// 임시저장
			for(int i=0;i<MergeList.length();i++) {
				
				JSONObject obj=new JSONObject(MergeList.get(i).toString());
				HashMap dataMap = new HashMap();
				String JISANG_NO = obj.getString("jm_jisang_no");
				String jimok_text = obj.getString("jm_jimok_text");
				String jijuk_area = obj.getString("jm_jijuk_area");
				String pyeonib_area = obj.getString("jm_pyeonib_area");
				String set_money = obj.getString("jm_set_money");
				String jasan_no = obj.getString("jm_jasan_no");
			//	String mainjisang = parser.getString("merge_insert_main_jisang" + i, "0");
				String dockey = obj.getString("jm_dockey");
				dataMap.put("JISANG_NO", JISANG_NO);
				dataMap.put("JIMOK_TEXT", jimok_text);
				dataMap.put("JIJUK_AREA", jijuk_area);
				dataMap.put("PYEONIB_AREA", pyeonib_area);
				dataMap.put("SET_MONEY", set_money);
				dataMap.put("JASAN_NO", jasan_no);
				dataMap.put("REP_JISANG_NO", mainJisangNo);
				dataMap.put("MERGE_REASON", mergereason);
				dataMap.put("MERGE_COMMENT", mergecomment);
				dataMap.put("DOCKEY", dockey);
				if ("insert".equals(gubun)) {
					MERGE_STATUS = "상신";
				} else if ("save".equals(gubun)) {
					MERGE_STATUS = "임시저장";
				}
				dataMap.put("MERGE_STATUS", MERGE_STATUS);
				log.info("datamap:"+dataMap);
				mainService.InsertQuery("jisangSQL.insertJisangMergeTmp", dataMap);
				
				
			}
			
//			for (int i = 0; i < intMergeInsertCnt; i++) {
//				HashMap dataMap = new HashMap();
//				String JISANG_NO = parser.getString("JISANG_NO" + i, "0");
//				String jimok_text = parser.getString("merge_insert_JIMOK_TEXT" + i, "0");
//				String jijuk_area = parser.getString("merge_insert_JIJUK_AREA" + i, "0");
//				String pyeonib_area = parser.getString("merge_insert_PYEONIB_AREA" + i, "0");
//				String set_money = parser.getString("merge_insert_SET_MONEY" + i, "0");
//				String jasan_no = parser.getString("merge_insert_JASAN_NO" + i, "0");
//				String mainjisang = parser.getString("merge_insert_main_jisang" + i, "0");
//				String dockey = parser.getString("merge_insert_DOCKEY" + i, "0");
//
//				dataMap.put("JISANG_NO", JISANG_NO);
//				dataMap.put("JIMOK_TEXT", jimok_text);
//				dataMap.put("JIJUK_AREA", jijuk_area);
//				dataMap.put("PYEONIB_AREA", pyeonib_area);
//				dataMap.put("SET_MONEY", set_money);
//				dataMap.put("JASAN_NO", jasan_no);
//				dataMap.put("REP_JISANG_NO", mainJisangNo);
//				dataMap.put("MERGE_REASON", mergereason);
//				dataMap.put("MERGE_COMMENT", mergecomment);
//				dataMap.put("DOCKEY", dockey);
//				if ("insert".equals(gubun)) {
//					MERGE_STATUS = "상신";
//				} else if ("save".equals(gubun)) {
//					MERGE_STATUS = "임시저장";
//				}
//				dataMap.put("MERGE_STATUS", MERGE_STATUS);
//
//				//Database.getInstance().insert("Json.insertJisangMergeTmp", dataMap);
//
//			}
log.info("gubun:"+gubun);
			// 상신시는 저장 후 임시저장 기반으로 상신내용 처리
			if ("insert".equals(gubun)) {
				// 전자결재 처리
				ApprovalHtmlUtil eph=new ApprovalHtmlUtil();
				ApprovalUtil epc= new ApprovalUtil();
//				ElectronicPaymentHTML eph = new ElectronicPaymentHTML(); // 상신용 HTML
//				ElectronicPaymentUtil epc = new ElectronicPaymentUtil(); // 전자결재 연계
				CommonUtil cu = new CommonUtil();

				// 반려시 기존 DOCKEY로 사용
				String str_appNo = "";
				if ("R".equals(merge_status)) {
					map.put("JISANGNO", mainJisangNo);
//					ArrayList<HashMap> echolist = (ArrayList<HashMap>) Database.getInstance().queryForList("Json.selectJisangMergeInfo", map);
					ArrayList<HashMap> echolist = (ArrayList<HashMap>) mainService.selectQuery("jisangSQL.selectJisangMergeInfo", map);
					str_appNo = (String) echolist.get(0).get("DOCKEY");
				} else {
					str_appNo = CommonUtil.getNextAppovalSeq();
				}

				boolean res_Echo = false;
				if ("".equals(str_appNo)) {
					map.put("message", "N");
				} else {
					String str_UserId = String.valueOf(request.getSession().getAttribute("userId"));
					String str_userName = String.valueOf(request.getSession().getAttribute("userName"));
					String str_userDeptcd = String.valueOf(request.getSession().getAttribute("userDeptcd"));
					String str_userDeptnm = String.valueOf(request.getSession().getAttribute("userDeptnm"));
					String str_userUPDeptcd = String.valueOf(request.getSession().getAttribute("userUPDeptcd"));
//					String str_UserId = "105681";
//					String str_userName = "박영환";
//					String str_userDeptcd = "D250500";
//					String str_userDeptnm = "IT전략.지원팀";
//					String str_userUPDeptcd = "S250100";
					res_Echo = epc.GetPLMSDataforXML(str_appNo, eph.getJisang_merge_HTML(mainJisangNo, request, response), str_UserId, "", "", "GetSurfaceRightsMergeDataforXML", str_userName, str_userDeptcd, str_userDeptnm, str_userUPDeptcd);
					log.info("res_Echo:"+res_Echo);
				}
				if (res_Echo) {

					// 문서번호 업데이트
					map.put("DOCKEY", str_appNo);
					str_result = "Y";
					map.put("JISANGNO", mainJisangNo);
					mainService.InsertQuery("jisangSQL.updateJisangMergeEchoNo", map);
					//Database.getInstance().update("Json.updateJisangMergeEchoNo", map);

					// System.out.println("%%%%%%%%%%%%map=" + map);
					// 문서 URL조회
//					ArrayList echolist = (ArrayList) Database.getInstance().queryForList("Json.selectJisangMergeInfo", map);
					ArrayList echolist = (ArrayList) mainService.selectQuery("jisangSQL.selectJisangMergeInfo", map);
					if (null != echolist && echolist.size() > 0) {
						String str_EchoNo = String.valueOf(((HashMap) echolist.get(0)).get("OUT_URL"));
						System.out.println("str_EchoNo=====" + str_EchoNo);
						map.put("OUT_URL", str_EchoNo);
					}
				} else {
					str_result = "N";
				}
			}

		//	Database.getInstance().commitTransaction();
		} catch (Exception e) {
			e.printStackTrace();
			str_result = "N";
		} finally {
			//Database.getInstance().endTransaction();
		}

		map.put("message", str_result);
		
		
//		HashMap<String, Object> resultmap = new HashMap();
//        resultmap.put("resultCode", "0000");
//        resultmap.put("resultData", httpRequest);
//        resultmap.put("resultMessage", "success");
        JSONObject obj = new JSONObject(map);
    	 // log.info("jo:"+jo);
        response.setCharacterEncoding("UTF-8");
        response.setHeader("Access-Control-Allow-Origin", "*");
        response.setHeader("Cache-Control", "no-cache");
        response.resetBuffer();
        response.setContentType("application/json");
        // response.getOutputStream().write(jo);
        response.getWriter().print(obj);
        response.getWriter().flush();

		//mapToJsonResponse(response, map);
	}

	
	@PostMapping(path="/getSaveJisangMergeData")
	public void getSaveJisangMergeData(HttpServletRequest httpRequest, HttpServletResponse response) throws Exception {
//		Properties requestParams = CommonUtil.convertToProperties(httpRequest);
//		log.info("requestParams:"+requestParams);
		  String requestParams = ParameterUtil.getRequestBodyToStr(httpRequest);
	        log.info("requestParams:"+requestParams);
	        JSONArray jarr=new JSONArray(requestParams);
	        //log.info("jarr:"+jarr.get(0));
	        ArrayList jisangList=new ArrayList();
	        for(int i=0;i<jarr.length();i++) {
	        	JSONObject obj=new JSONObject(jarr.get(i).toString());
	        	HashMap params=new HashMap();
	        	params.put("jisangNo",obj.getString("jisang_no"));
	        	log.info("params:"+params);
	        	ArrayList data=mainService.selectQuery("jisangSQL.getSaveJisangMergeData", params);
	        	jisangList.add(data.get(0));
	        	
	        	
	        }
	        HashMap jo=new HashMap();
	        jo.put("data",jisangList);
	        
	        JSONObject obj = new JSONObject(jo);
	    	 // log.info("jo:"+jo);
	        response.setCharacterEncoding("UTF-8");
	        response.setHeader("Access-Control-Allow-Origin", "*");
	        response.setHeader("Cache-Control", "no-cache");
	        response.resetBuffer();
	        response.setContentType("application/json");
	        // response.getOutputStream().write(jo);
	        response.getWriter().print(obj);
	        response.getWriter().flush();
	        
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
		String fpath=GC.getJisangReqDoc1Dir();
		String tmp=GC.getJisangFileTempDir();
		if (docNo=="1") mainService.DeleteQuery("jisangSQL.jisangReqDoc1Delete", param);
//		else if (docNo=="2") mainService.DeleteQuery("jisangSQL.jisangReqDoc2FileDelete", param);
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
//		log.info("params:"+params);
		ArrayList<HashMap> sidolist = mainService.selectQuery("commonSQL.getSidoMaster",params);
		ArrayList<HashMap> jisalist = mainService.selectQuery("commonSQL.selectAllJisaList",params);
		ArrayList<HashMap> data = mainService.selectQuery("jisangSQL.selectAllData",params);
		ArrayList<HashMap> soujaList = mainService.selectQuery("jisangSQL.selectSoyujaData",params);
		ArrayList<HashMap> atcFileList = mainService.selectQuery("jisangSQL.selectAtcFileList",params);
		
		//ArrayList<HashMap> jisangPermitList = mainService.selectQuery("jisangSQL.selectPermitList",params);
		ArrayList<HashMap> jisangModifyList = mainService.selectQuery("jisangSQL.selectModifyList",params);
		ArrayList<HashMap> jisangMergeList = mainService.selectQuery("jisangSQL.selectMergeList",params);
		params.put("pnu", data.get(0).get("jm_pnu"));
		ArrayList<HashMap> jisangIssueList = mainService.selectQuery("jisangSQL.selectIssueList",params);
	//	log.info("jisangIssueList size:"+jisangIssueList.size());
		if (jisangIssueList.size()>0) {
//			log.info("1:"+jisangIssueList.get(0).get("pi_code_depth1"));
//			log.info("2:"+jisangIssueList.get(0).get("pi_code_depth2"));
//			log.info("3:"+jisangIssueList.get(0).get("pi_code_depth3"));
			params.put("issueManualCode1", jisangIssueList.get(0).get("pi_code_depth1"));
			params.put("issueManualCode2", jisangIssueList.get(0).get("pi_code_depth2"));
			params.put("issueManualCode3", jisangIssueList.get(0).get("pi_code_depth3"));
		}
		ArrayList<HashMap> jisangPnuAtcFileList = mainService.selectQuery("jisangSQL.selectPnuAtcFileList",params);
		ArrayList<HashMap> jisangIssueHistoryList = mainService.selectQuery("jisangSQL.selectIssueHistoryList",params);
		ArrayList<HashMap> jisangIssueCodeAtcFileList = mainService.selectQuery("jisangSQL.selectIssueCodeAtcFileList",params);
		ArrayList<HashMap> jisangMemoList = mainService.selectQuery("commonSQL.selectMemoList",params);
		
		ArrayList<HashMap> reqDoc2list = mainService.selectQuery("jisangSQL.selectJisangReqDoc2",params);

		
//		  log.info("params:"+params); log.info("data:"+data.get(0));
//		  log.info("jm_pipe_yn:"+data.get(0).get("jm_pipe_yn"));
//		  log.info("jm_youngdo:"+data.get(0).get("jm_youngdo"));
//		  log.info("jm_pipe_name:"+data.get(0).get("jm_pipe_name"));
//		  log.info("jm_jijuk_area:"+data.get(0).get("jm_jijuk_area"));
//		  log.info("jisangPermitList:"+jisangPermitList);
//		  log.info("jisangIssueList:"+jisangIssueList);
//		  log.info("souja count:"+soujaList.size()); log.info("soujaList:"+soujaList);
//		  log.info("atcFileList:"+atcFileList);
//		  log.info("jisangPnuAtcFileList:"+jisangPnuAtcFileList);
//		  log.info("jisangIssueHistoryList:"+jisangIssueHistoryList);
//		  log.info("jisangMemoList:"+jisangMemoList);
//		  log.info("jisangIssueCodeAtcFileList:"+jisangIssueCodeAtcFileList);
//		  log.info("reqDoc2list:"+reqDoc2list);
		 

		
      			mav.addObject("resultData",data.get(0));
      			mav.addObject("soujaList",soujaList);
      		//	mav.addObject("jisangPermitList",jisangPermitList);
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
	
	// 기존 주소 검색
	@PostMapping(path="/getBunhalJIjukSelect1") //http://localhost:8080/api/get/dbTest
	public ModelAndView getBunhalJIjukSelect1(HttpServletRequest httpRequest, HttpServletResponse response) throws Exception {
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
	
	// 수정한 주소 검색(emd(ri)+jibun 으로 검색/어디어디서 이 API 호출해서 사용하는지 확인 안됐음.)
	@PostMapping(path="/getBunhalJIjukSelect") //http://localhost:8080/api/get/dbTest
	public ModelAndView getBunhalJIjukSelect(HttpServletRequest httpRequest, HttpServletResponse response) throws Exception {
		ModelAndView mav=new ModelAndView();
		HashMap params = new HashMap();
		//log.info("httpRequest:"+Arrays.toString(httpRequest));

		String address=httpRequest.getParameter("address");
		String sido_nm=httpRequest.getParameter("sido_nm");
		String sgg_nm=httpRequest.getParameter("sgg_nm");
		String emd_nm=httpRequest.getParameter("emd_nm");
		String ri_nm=httpRequest.getParameter("ri_nm");
		String jibun=httpRequest.getParameter("jibun");
		
		String[] arr = address.split(" ");
		
		params.put("address", "");
		params.put("sido_nm", "");
		params.put("sgg_nm", "");
		params.put("emd_nm", arr[0]);
		params.put("ri_nm", arr[0]);
		params.put("jibun", arr[1]);

		log.info("params:"+params);
		ArrayList<HashMap> addressList = mainService.selectQuery("commonSQL.selectAddressFromJijuk1",params);
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
		List<HashMap<String, Object>> fileTempList = new ArrayList<>();
		List<HashMap<String, Object>> fileProList = new ArrayList<>();
		HashMap<String, Object> fileMap = new HashMap<>();
		ModelAndView mav=new ModelAndView();
		ArrayList list = new ArrayList();
		ArrayList togiList = new ArrayList();
		ArrayList fileList = new ArrayList();
		
//        List<TestDTO> list = new ArrayList<TestDTO>();
//        list = dbService.getList();
		HashMap params = new HashMap();
		//ArrayList<HashMap>  list=new ArrayList<HashMap>();
		
		String idx = httpRequest.getParameter("idx");
		String index = httpRequest.getParameter("index");
		
		params.put("idx",idx);
		params.put("manage_no",idx);
		params.put("PMT_NO",idx);
		params.put("index",index);
		log.info("params:"+params);
		
		ArrayList<HashMap> data = mainService.selectQuery("jisangSQL.selectPermitData",params);
//		ArrayList<HashMap> jisangPnuAtcFileList = mainService.selectQuery("jisangSQL.selectAtcFileList",params);
		ArrayList<HashMap> reqDoc2list = mainService.selectQuery("jisangSQL.selectJisangReqDoc2",params);
		
		 list = (ArrayList) mainService.selectQuery("jisangSQL.selectJisangPmtDetail_MASTER", params);
		togiList = (ArrayList) mainService.selectQuery("jisangSQL.selectJisangPmtDetail_TOGI", params);
		fileList = (ArrayList) mainService.selectQuery("jisangSQL.selectJisangPmtDetail_FILE", params);
		fileTempList = fileList;
		log.info("list:"+list);
		log.info("togiList:"+togiList);
		log.info("fileList:"+fileList);

		
		for (int i = 0; i < 10; i++) {
			fileMap = new HashMap<>();
			fileMap.put("file_path", "");
			fileMap.put("file_nm", "");
			fileMap.put("pmt_no", "");
			fileMap.put("seq", 0);
			fileMap.put("file_gubun", i + 1);
			fileProList.add(fileMap);
		}
		
		for (int j = 0; j < fileTempList.size(); j++) {
			int idx1 = Integer.valueOf(String.valueOf(fileTempList.get(j).get("file_gubun"))) -1;
			fileProList.set(idx1, fileTempList.get(j));
		}
		
      	mav.addObject("resultData",list.get(0));
      	mav.addObject("tojiList", togiList);
//		mav.addObject("fileList", jisangPnuAtcFileList);
		mav.addObject("reqDoc2list", fileList);
		mav.addObject("reqDoc3list", fileProList);
		mav.setViewName("content/jisang/usePermitDetail");
		return mav;
    }
	
	
	// 지상권 사용승락 수정
	@GetMapping(path="/usePermitEdit") //http://localhost:8080/api/get/dbTest
    public ModelAndView usePermitEdit(HttpServletRequest httpRequest, HttpServletResponse response) throws Exception {
//		response.setHeader("X-Frame-Options", "SAMEORIGIN");
//		response.setHeader("Content-Security-Policy", " frame-ancestors 'self'");
		ModelAndView mav=new ModelAndView();
		
//        List<TestDTO> list = new ArrayList<TestDTO>();
//        list = dbService.getList();
		HashMap params = new HashMap();
		HashMap<String, Object> fileMap = new HashMap<>();
		List<HashMap> fileTempList = new ArrayList<>();
		List<HashMap<String, Object>> fileProList = new ArrayList<>();
		String idx = httpRequest.getParameter("idx");
		String index = httpRequest.getParameter("index");
		
		params.put("idx",idx);
		params.put("manage_no",idx);
		params.put("PMT_NO",idx);
		params.put("index",index);
		log.info("params:"+params);
		ArrayList<HashMap> data = mainService.selectQuery("jisangSQL.selectPermitData",params);
		ArrayList<HashMap> jisalist = mainService.selectQuery("commonSQL.selectAllJisaList",params);
		ArrayList<HashMap> sidolist = mainService.selectQuery("commonSQL.getSidoMaster",params);
		ArrayList<HashMap> reqDoc2list = mainService.selectQuery("jisangSQL.selectJisangReqDoc2",params);
		ArrayList<HashMap> fileList = (ArrayList) mainService.selectQuery("jisangSQL.selectJisangPmtDetail_FILE", params);
		ArrayList<HashMap> togiList = (ArrayList) mainService.selectQuery("jisangSQL.selectJisangPmtDetail_TOGI", params);
		fileTempList = fileList;
		for (int i = 0; i < 10; i++) {
			fileMap = new HashMap<>();
			fileMap.put("file_path", "");
			fileMap.put("file_nm", "");
			fileMap.put("pmt_no", "");
			fileMap.put("seq", 0);
			fileMap.put("file_gubun", i + 1);
			fileProList.add(fileMap);
		}
		
		for (int j = 0; j < fileTempList.size(); j++) {
			int idx1 = Integer.valueOf(String.valueOf(fileTempList.get(j).get("file_gubun"))) -1;
			fileProList.set(idx1, fileTempList.get(j));
		}
		
		mav.addObject("resultData",data.get(0));
		mav.addObject("tojiList", data);
		mav.addObject("jisaList", jisalist);
		mav.addObject("sidoList",sidolist);
		mav.addObject("reqDoc2list",fileList);
		mav.addObject("reqDoc3list",fileProList);
		mav.setViewName("content/jisang/usePermitEdit");

		return mav;
    }
	
	@PostMapping(path="/getPermitEditJisangSelect") //http://localhost:8080/api/get/dbTest
	public ModelAndView getPermitEditJisangSelect(HttpServletRequest httpRequest, HttpServletResponse response) throws Exception {
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
		mav.setViewName("content/jisang/usePermitEdit :: #searchResultPopDiv");
		return mav;
	}

	//지상권합필하기 눌렀을때 나오는 페이지
	@GetMapping(path="/landRightMerge") //http://localhost:8080/api/get/dbTest
	public ModelAndView landRightMerge(HttpServletRequest httpRequest, HttpServletResponse response) throws Exception {
		HashMap params = new HashMap();
		//ArrayList<HashMap>  list=new ArrayList<HashMap>();

		String idx = httpRequest.getParameter("idx");
		String index = httpRequest.getParameter("index");
		String tcount = httpRequest.getParameter("tcount");
		String repIdx = httpRequest.getParameter("repIdx");
		List<HashMap<String, String>> jisangList = new ArrayList<HashMap<String, String>>();
		String jisangCnt = "";
		for(int i=1;i<Integer.parseInt(tcount)+1;i++) {
			String jisangNo=httpRequest.getParameter("idx"+i);
		
			params.put("JISANGNO", jisangNo);
			log.info("params:"+params);
			ArrayList<HashMap<String, String>> List =(ArrayList) mainService.selectQuery("jisangSQL.selectJisangDetailList", params);
			ArrayList<HashMap<String, String>> soyuList =(ArrayList) mainService.selectQuery("jisangSQL.selectJisangDetailSoyu", params);
			for (HashMap tmpMap : List) {
				tmpMap.put("soyuList", soyuList);
				System.out.println("tmpMap=" + tmpMap);
				jisangList.add(tmpMap);
			}
		}

		if (jisangList != null && !jisangList.isEmpty()) {
			jisangCnt = String.valueOf(jisangList.size());
		}

		//필수첨부파일
		ArrayList<HashMap> reqDoc1list = mainService.selectQuery("jisangSQL.selectJisangReqDoc1",params);
		
		
//		ArrayList<HashMap<String, String>> List =(ArrayList) mainService.selectQuery("jisangSQL.selectJisangDetailListNew", params);
//		ArrayList<HashMap<String, String>> soyuList =(ArrayList) mainService.selectQuery("jisangSQL.selectJisangDetailSoyu", params);
//		List<HashMap<String, String>> soyuList = Database.getInstance().queryForList("Json.selectJisangDetailSoyu", params);
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
		log.info("jisangList:"+jisangList);
//		log.info("jisangPnuAtcFileList:"+jisangPnuAtcFileList);
		log.info("jisangDoc1list:"+reqDoc1list);

		ModelAndView mav=new ModelAndView();
//		mav.addObject("List",List);
//
//		mav.addObject("soyuList",soyuList);
		mav.addObject("jisangList", jisangList);
		mav.addObject("jisangCnt", jisangCnt);
		mav.addObject("CommonUtil", new CommonUtil());
		mav.addObject("loginKey", String.valueOf(httpRequest.getSession().getAttribute("loginKey")));
		mav.addObject("reqDoc1list", reqDoc1list);
		mav.addObject("repIdx", repIdx);
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
	
	
	
	
	// 지상권 내역 임시등록
	@Transactional
	@PostMapping(path="/insertJisangTmpList")
		public void insertJisangTmpList(HttpServletRequest request, HttpServletResponse response) throws Exception {
		String requestParams = ParameterUtil.getRequestBodyToStr(request);
		JSONObject requestParamsObj=new JSONObject(requestParams);
		log.info("requestParams:"+requestParams);
			ArrayList list = new ArrayList();
			CommonUtil comm = new CommonUtil();
			HashMap map = new HashMap();

			ParameterParser parser = new ParameterParser(request);

			String sinm = (requestParamsObj.getString("sido_nm")).replaceAll("전체", ""); // 시 네임
			String gungunm = (requestParamsObj.getString("sgg_nm")).replaceAll("전체", ""); // 시군구 네임
			String dongnm = (requestParamsObj.getString("emd_nm")).replaceAll("전체", ""); // 동 네임
			String rinm = (requestParamsObj.getString("ri_nm")).replaceAll("전체", ""); // 리 네임
			//String jisanm = requestParamsObj.getString("jisa").replaceAll("전체", ""); // 지사 네임
			String jibun = requestParamsObj.getString("mjibun"); // 지번
			String addrcode =requestParamsObj.has("addrcode")?requestParamsObj.getString("addrcode"):""; // 주소코드
			String jisa = requestParamsObj.getString("jisa"); // 담당지사
			String goverownyn =requestParamsObj.has("goverownyn")?requestParamsObj.getString("goverownyn"):"N"; // 국공유지여부
			String yongdo = requestParamsObj.getString("yongdo"); // 용도
			String zone = requestParamsObj.getString("zone"); // 관로명(구간)
			String sun_gubun = requestParamsObj.getString("sun_gubun"); // 단/복선
			String pnu = requestParamsObj.getString("pnu"); // 검색결과 PNU
			String jijuk_area = requestParamsObj.getString("jijuk_area"); // 지면 면적(㎡)
			String comple_yn = requestParamsObj.getString("comple_yn"); // 완결여부
			String pyeonib_area = requestParamsObj.getString("pyeonib_area"); // 편입 면적(㎡)
			String use_state = requestParamsObj.getString("use_state"); // 사용현황
			String dg_startday = requestParamsObj.getString("dg_startday").replace("-", ""); // 등기일
			String deunggi_no = requestParamsObj.getString("deunggi_no"); // 등기번호
			String deunggiso = requestParamsObj.getString("deunggiso"); // 등기소
			String dosiplan = requestParamsObj.getString("dosiplan"); // 도시계획
			String cd_startday = requestParamsObj.getString("cd_startday").replaceAll("-", ""); // 취득일
			String toja_no = requestParamsObj.getString("toja_no"); // 투자오더
			String jasan_no = requestParamsObj.getString("jasan_no"); // 자산분류번호
			String special_cont = requestParamsObj.getString("special_cont"); // 특약사항
			String location = requestParamsObj.getString("location"); // 위치
			String jimok = requestParamsObj.getString("jimok"); // 지목
			String wmemo=requestParamsObj.getString("jisangMemo");

			String soyunumber = requestParamsObj.getString("soyunumber"); // 소유자 수
			String okaynumber = requestParamsObj.getString("okaynumber"); // 승인자 수
			String filenumber = requestParamsObj.getString("filenumber"); // 파일 수
			String TOJA_CNT = requestParamsObj.getString("TOJA_CNT"); // 투자오더 수

			String gubun = requestParamsObj.getString("gubun"); // 구분( modify : 수정, insert
															// : 등록 )
			String mod_jisangNo = requestParamsObj.getString("mod_jisangNo"); // 수정할 지상권번호
			String fileseq = requestParamsObj.getString("fileseq"); // 파일 seq
			// int FILE_CNT = Integer.parseInt(requestParamsObj.getString("flieCnt", "0")); //
			// 파일수

			String modifyReason1 = requestParamsObj.getString("modifyReason1"); // 변경이력-기본정보
			String modifyReason2 = requestParamsObj.getString("modifyReason2"); // 변경이력-소유자정보
			String modifyReason3 = requestParamsObj.getString("modifyReason3"); // 변경이력-지상권정보

			String USER_ID = String.valueOf(request.getSession().getAttribute("userId"));
			String USER_NAME = String.valueOf(request.getSession().getAttribute("userName"));

			String CONVERT_FLAG = requestParamsObj.has("CONVERT_FLAG")?requestParamsObj.getString("CONVERT_FLAG"):"N";
			String CONVERT_PAGE = requestParamsObj.getString("CONVERT_PAGE");
			String CONVERT_BEFORE_KEY = requestParamsObj.getString("CONVERT_BEFORE_KEY");

			String XML_GUBUN = "";

			String str_result = "Y";
			String save_status = requestParamsObj.getString("save_status");
			// System.out.println("test :: " + save_status);

			try {
				
				HashMap params = new HashMap();
				params.put("FILESEQ", fileseq);
				params.put("SINM", sinm);
				params.put("GUNGUNM", gungunm);
				params.put("DONGNM", dongnm);
				params.put("RINM", rinm);
				//params.put("JISANM", jisanm);
				params.put("JIBUN", jibun);
				params.put("ADDRCODE", addrcode);
				params.put("JISA", jisa);
				params.put("GOVEROWNYN", goverownyn);
				params.put("YONGDO", yongdo);
				params.put("ZONE", zone);
				params.put("SUNGUBUN", sun_gubun);
				params.put("PNU", pnu);
				params.put("JIJUKAREA", jijuk_area);
				params.put("COMPLEYN", comple_yn);
				params.put("PYEONIBAREA", pyeonib_area);
				params.put("USESTATE", use_state);
				params.put("DGSTARTDAY", dg_startday);
				params.put("DEUNGGINO", deunggi_no);
				params.put("DEUNGGISO", deunggiso);
				params.put("DOSIPLAN", dosiplan);
				params.put("CD_STARTDAY", cd_startday);
				params.put("TOJANO", toja_no);
				params.put("JASANNO", jasan_no);
				params.put("SPECIALCONT", special_cont);
				params.put("LOCATION", location);
				params.put("STATUS", "JISANG");
				params.put("JIMOK", jimok);
				params.put("USER_ID", USER_ID);
				params.put("USER_NAME", USER_NAME);

				/**********************
				 * 다음 지상권 번호 조회 시작
				 **********************/
				if (gubun.equals("modify")) {
					params.put("JISANGNO", mod_jisangNo);

				} else {
					ArrayList JiSangList = (ArrayList) mainService.selectQuery("Json.selectJijangNextNo", null);

					String Next_jisangNo = String.valueOf(Integer.parseInt((String) ((HashMap) JiSangList.get(0)).get("NOW_JISANGNO")) + 1);
					int n_Next_jisangNo = Next_jisangNo.length();

					String add_Zero = "";
					for (int i = 0; i < (6 - n_Next_jisangNo); i++) {
						add_Zero += "0";
					}
					Next_jisangNo = "J_" + add_Zero + Next_jisangNo;

					params.put("JISANGNO", Next_jisangNo);
				}

				/***********************
				 * 다음 지상권 번호 조회 끝
				 ************************/
				if (gubun.equals("insert")) {
					mainService.InsertQuery("jisangSQL.insertJisangMaster", params); // 기본정보 저장

					// 지적테이블과 연관관계로 지상 마스터에 등록후 임시저장
					mainService.InsertQuery("jisangSQL.insertJisangMasterTmp", params); // 기본정보 임시저장 저장상태 셋팅
					params.put("SAVE_STATUS", "승인");
					mainService.UpdateQuery("jisangSQL.updateJisangMasterStatus", params);

				} else if (gubun.equals("modify")) {

					/***********************
					 * 행정구역이 변경이 되면, 기존의 행정구역은 미설정으로 바꾸고, 변경된 행정구역을 지상권으로 설정함.
					 ************************/
					ArrayList jijanglist = (ArrayList) mainService.selectQuery("jisangSQL.selectJisangList", params);
					String str_BeforePNU = "";

					if (null != jijanglist && jijanglist.size() > 0) {

						HashMap hm = new HashMap();
						for (int i = 0; i < list.size(); i++) {
							str_BeforePNU = (String) ((HashMap) jijanglist.get(i)).get("PNU");
						}
					}

					// 행정구역이 같지않다면
					if (!str_BeforePNU.equals(pnu) && !str_BeforePNU.equals("NULL")) {

						/** 분할한 지번인지, 분할한 지번이라면 원지번이 다른곳에서 바라보고있는지 조회 **/
						// int hunhalCnt = (Integer)
						// Database.getInstance().queryForObject("Json.selectBunhalOrgNo",
						// params);
						// if(hunhalCnt <= 1){
						// ** JIJUK_MASTER 테이블 지상권 해제**//
						// System.out.println("insertJisangList >>>>>> 지상권해제params=" + params);
						mainService.UpdateQuery("goverSQL.updateJijukMasterStatus", params);

						// }

					}

					mainService.DeleteQuery("jisangSQL.deleteJisangMasterTmp", params); // 기존 임시저장 데이터 삭제
					mainService.UpdateQuery("jisangSQL.insertJisangMasterTmp", params); // 기본정보
																							// 임시저장
																							// 저장상태 셋팅
					params.put("SAVE_STATUS", save_status);
					mainService.UpdateQuery("jisangSQL.updateJisangMasterStatus", params);

					// Database.getInstance().delete("Json.deleteJisangTmpModifyHistory", params);
					// 변경이력 등록
					if (!modifyReason1.equals("")) {
						params.put("GUBUN", "기본정보");
						params.put("CONT", modifyReason1);
						mainService.InsertQuery("jisangSQL.insertJisangTmpModifyHistory", params);
					}
					if (!modifyReason2.equals("")) {
						params.put("GUBUN", "소유자 정보");
						params.put("CONT", modifyReason2);
						mainService.InsertQuery("Json.insertJisangTmpModifyHistory", params);
					}
					if (!modifyReason3.equals("")) {
						params.put("GUBUN", "지상권 정보");
						params.put("CONT", modifyReason3);
						mainService.InsertQuery("Json.insertJisangTmpModifyHistory", params);
					}

					XML_GUBUN = "ModifySurfaceRightsDataforXML";

				}

				// System.out.println("params=" + params);

				// 소유자
				//소유자정보등록
	    		JSONArray soujaJsonArray=requestParamsObj.getJSONArray("soujaInfo");
				for (int i = 0; i <soujaJsonArray.length(); i++) {
					 JSONObject obj=new JSONObject(soujaJsonArray.get(i).toString());
					String JIBUN = obj.getString("jibun");
					String NAME = obj.getString("name");
					String ADDR = obj.getString("addr");
					String TEL = obj.getString("tel");
					String HP = obj.getString("hp");

					params.put("JIBUN", JIBUN); // 공유지분
					params.put("NAME", NAME); // 성명
					params.put("ADDR", ADDR); // 주소
					params.put("TEL", TEL); // 연락처(집)
					params.put("HP", HP); // 연락처(모바일)

					if (gubun.equals("modify")) {
						if (i == 0) {
							mainService.UpdateQuery("jisangSQL.deleteJisangSoyuTmp", params); // 기존
																								// 소유자
																								// 삭제
						}
					}

					// if(!JIBUN.equals("") || !NAME.equals("") ||
					// !ADDR.equals("")|| !TEL.equals("")|| !HP.equals(""))
					mainService.InsertQuery("jisangSQL.insertJisangSoyuTmp", params); // 소유자
																						// 저장
					if (gubun.equals("insert")) {
						mainService.InsertQuery("jisangSQL.insertJisangSoyu", params);
					}

				}

				/*
				 * //투자오더 for(int i = 0; i < Integer.parseInt(TOJA_CNT); i++){ String TOJA = parser.getString("TOJA"+String.valueOf(i), ""); params.put("TOJA", TOJA); if(gubun.equals("modify")){ if(i==0){ Database.getInstance().update("Json.deleteJisangToja", params); // 기존 정보 삭제 } } if(!TOJA.equals("")){ //System.out.println("투자오더 params = " + params); Database.getInstance().insert("Json.insertJisangToja", params); // 투자오더 테이블 저장 } }
				 */

				if (gubun.equals("modify")) {
					ArrayList<HashMap> fileList = new ArrayList<HashMap>();
					fileList = (ArrayList<HashMap>) mainService.selectQuery("jisangSQL.selectJISANG_ATCFILE_NoCheck", params);
					mainService.DeleteQuery("jisangsQL.deleteAllFileTmp", params);
					for (int i = 0; i < fileList.size(); i++) {
						mainService.InsertQuery("jisangSQL.insertJisangFileTmp_SEQ", fileList.get(i));
					}
					// System.out.println("filenumber :: " + filenumber);
					for (int i = 0; i < Integer.parseInt(filenumber); i++) {
						String IS_DEL = parser.getString("isFileDel" + String.valueOf(i), "");
						String DEL_SEQ = parser.getString("fileSeq" + String.valueOf(i), "");
						if (IS_DEL.equals("Y")) {
							// System.out.println("FILE_DEL_SEQ=" + DEL_SEQ);

							// 조회용 parma셋팅
							params.put("SEQ", "");
							params.put("FILENO", String.valueOf((params.get("JISANGNO"))));
							params.put("FILE_SEQ", DEL_SEQ);
							params.put("DEL_FLAG", "Y");

							mainService.InsertQuery("jisangSQL.DelFileTmp", params);
							ArrayList File_list = (ArrayList) mainService.selectQuery("jisangSQL.selectJisangRowDetailTmp_Files", params); // 첨부파일
							// 변경이력 등록
							if (null != File_list && File_list.size() > 0) {

								String str_FileName = String.valueOf(((HashMap) File_list.get(0)).get("FILE_NM"));
								params.put("GUBUN", "파일정보");
								params.put("CONT", "파일삭제(" + str_FileName + ")");
								mainService.InsertQuery("jisangSQL.insertJisangTmpModifyHistory", params);
							}
						}
					}
				}

				// 추가된 파일이 있으면 변경이력에 등록
				ArrayList seq_fileList = (ArrayList) mainService.selectQuery("jisangSQL.selectJISANG_ATCFILE_NoCheck", params); // 첨부
																																		// 파일
				if (null != seq_fileList && seq_fileList.size() > 0) {
					for (int i = 0; i < seq_fileList.size(); i++) {
						HashMap hm_fileList = (HashMap) seq_fileList.get(i);
						String str_JNo = comm.evl(String.valueOf(hm_fileList.get("JISANG_NO")), "");
						if ("".equals(str_JNo)) {
							String str_FilNM = comm.evl(String.valueOf(hm_fileList.get("FILE_NM")), "");

							params.put("GUBUN", "파일정보");
							params.put("CONT", "파일등록(" + str_FilNM + ")");
							mainService.InsertQuery("jisangSQL.insertJisangTmpModifyHistory", params);
						}
					}
				}

				if ("insert".equals(gubun)) {
					/** codecanyon에서 파일업로드 **/
					mainService.UpdateQuery("jisangSQL.updateSeqFile", params); // 파일테이블에
																					// 지상권번호
																					// 업데이트
				} else if ("modify".equals(gubun)) {
					mainService.UpdateQuery("jisangSQL.updateSeqFileTmp", params);
				}

				// ** JIJUK_MASTER 테이블 새로운 행정구역으로 지상권 등록**//
				// 토지정보 상태변경
				if (!pnu.equals("NULL")) {
					mainService.UpdateQuery("songyuSQL.updateTogiJisang_Status", params);
				}
				// System.out.println("CONVERT_PAGE :: " + CONVERT_PAGE);
				// System.out.println("CONVERT_FLAG :: " + CONVERT_FLAG);
				// 점용에서 지상권 전환용 추가
				if ("Y".equals(CONVERT_FLAG)) {
					if ("GOVER".equals(CONVERT_PAGE)) {
						HashMap convertParams = new HashMap();
						convertParams.put("PNU", pnu);
						convertParams.put("GOVER_NO", CONVERT_BEFORE_KEY);

						// 점용 토지정보 정보 조회 :: selectGoverPnuList
						ArrayList goverPnuLIst = (ArrayList) mainService.selectQuery("goverSQL.selectGoverPnuList", convertParams);

						// 점용 토지정보가 여러건일 경우 해당 토지정보만 제거 :: deleteGoverPNUObject
						if (goverPnuLIst != null && goverPnuLIst.size() > 1) {
							mainService.DeleteQuery("goverSQL.deleteGoverPNUObject", convertParams);

						} else if (goverPnuLIst.size() == 1) { // 점용 토지정보가 단건일 경우 해당 점용정보 제거 :: deleteGoverPNU
							// 삭제시 위험성이 큰 관계로 해지처리로 대체 ::
							convertParams.put("USER_NAME", USER_NAME);
							convertParams.put("EMPCD", USER_ID);
							mainService.UpdateQuery("goverSQL.insertGoverTerminationAdd", convertParams);
							mainService.DeleteQuery("goverSQL.deleteGoverPNU", convertParams);
						}
						// 점용에서 전환되었음을 변경이력에 등록
						params.put("GUBUN", "기본정보");
						params.put("CONT", "점용 [" + CONVERT_BEFORE_KEY + "] 에서 전환등록됨");
						mainService.InsertQuery("jisangSQL.insertJisangModifyHistory", params);
						XML_GUBUN = "GetSurfaceRightsDataforXML";
					} else if ("NOTSET".equals(CONVERT_PAGE)) {

						// Database.getInstance().insert("Json.insertJisangMasterNotset", params);

						params.put("GOVEROWNYN", params.get("GOVER_OWN_YN"));
						params.put("STATUS", "JISANG");
						params.put("NOTSET_NO", CONVERT_BEFORE_KEY);
						mainService.UpdateQuery("notsetSQL.deleteNotsetMaster", params);

						// 미설정,미점용 에서 전환되었음을 변경이력에 등록
						params.put("GUBUN", "기본정보");
						params.put("CONT", "미설정,미점용 [" + CONVERT_BEFORE_KEY + "] 에서 전환등록됨");
						mainService.InsertQuery("jisangSQL.insertJisangModifyHistory", params);
						XML_GUBUN = "GetSurfaceRightsDataforXML";
					}
				}

				if ("상신".equals(save_status)) {
					// 5.전자결재 상신처리.
					// 전자결재 반려시에 대한 프로세스가 없음. 따라서 원상복구 가능하도록 모지번을 제외한 하위 지상권 정보 별도처리 계획
					ApprovalHtmlUtil eph=new ApprovalHtmlUtil();
					ApprovalUtil epc= new ApprovalUtil();
//					ElectronicPaymentHTML eph = new ElectronicPaymentHTML(); // 상신용 HTML
//					ElectronicPaymentUtil epc = new ElectronicPaymentUtil(); // 전자결재 연계

					String str_appNo = CommonUtil.getNextAppovalSeq();
					boolean res_Echo = false;
					if ("".equals(str_appNo)) {
						map.put("message", "N");
					} else {
						String str_UserId = String.valueOf(request.getSession().getAttribute("userId"));
						String str_userName = String.valueOf(request.getSession().getAttribute("userName"));
						String str_userDeptcd = String.valueOf(request.getSession().getAttribute("userDeptcd"));
						String str_userDeptnm = String.valueOf(request.getSession().getAttribute("userDeptnm"));
						String str_userUPDeptcd = String.valueOf(request.getSession().getAttribute("userUPDeptcd"));
						// 전자결재 화면에서 확인가능한 문서내용 생성(html)
						res_Echo = epc.GetPLMSDataforXML(str_appNo, eph.getJisang_sangsin_HTML((String) params.get("JISANGNO"), gubun), str_UserId, "", "", XML_GUBUN, str_userName, str_userDeptcd, str_userDeptnm, str_userUPDeptcd);
						
					}

					if (res_Echo) {

						// 문서번호 업데이트
						map.put("DOCKEY", str_appNo);
						str_result = "Y";
						map.put("JISANGNO", params.get("JISANGNO"));
						mainService.UpdateQuery("jisangSQL.updateJisangTmpEchoNo", map);

						// System.out.println("%%%%%%%%%%%%map=" + map);
						// 문서 URL조회
						ArrayList echolist = (ArrayList) mainService.selectQuery("jisangSQL.selectJisangTmpDocInfo", map);
						if (null != echolist && echolist.size() > 0) {
							String str_EchoNo = String.valueOf(((HashMap) echolist.get(0)).get("OUT_URL"));
							System.out.println("str_EchoNo=====" + str_EchoNo);
							map.put("OUT_URL", str_EchoNo);
							// 전자결재용 문서 생성 완료시 팝업으로 호출할 전자결재시스팀 URL
						}

					} else {
						str_result = "N";
					}
				}

				map.put("JISANGNO", params.get("JISANGNO"));
				
			} catch (Exception e) {
				str_result = "N";
				e.printStackTrace();
			} finally {
				//Database.getInstance().endTransaction();
			}

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
	
	
	// 지상권 내역 등록
	
		@Transactional
		@PostMapping(path="/insertJisangList")
		public void insertJisangList(HttpServletRequest request, HttpServletResponse response) throws Exception {
			String requestParams = ParameterUtil.getRequestBodyToStr(request);
			JSONObject requestParamsObj = new JSONObject(requestParams);
			log.info("requestParams:" + requestParams);
			JSONArray soujaArr = new JSONArray(requestParamsObj.getString("soujaInfo"));
			JSONArray fileArr = new JSONArray(requestParamsObj.getString("uploadFiles"));
			
			ArrayList list = new ArrayList();
			CommonUtil comm = new CommonUtil();

			HashMap map = new HashMap();
			
			ParameterParser parser = new ParameterParser(request);
			
			String sinm = (requestParamsObj.getString("sido_nm")).replaceAll("전체", ""); // 시
																				// 네임
			String gungunm = (requestParamsObj.getString("sgg_nm")).replaceAll("전체", ""); // 시군구
																						// 네임
			String dongnm = (requestParamsObj.getString("emd_nm")).replaceAll("전체", ""); // 동
																					// 네임
			String rinm = (requestParamsObj.getString("ri_nm")).replaceAll("전체", ""); // 리
																				// 네임
			String jisanm = requestParamsObj.has("jisanm")?requestParamsObj.getString("jisanm"):requestParamsObj.getString("jisa"); // 지사
																					// 네임
			String jibun = requestParamsObj.getString("mjibun"); // 지번
			String addrcode =requestParamsObj.has("addrcode")?requestParamsObj.getString("addrcode"):""; // 주소코드
			String jisa = requestParamsObj.getString("jisa"); // 담당지사
			String goverownyn = requestParamsObj.getString("gover_own_yn"); // 국공유지여부
			String yongdo = requestParamsObj.getString("youngdo"); // 용도
			String zone = requestParamsObj.getString("pipe_name"); // 관로명(구간)
			String sun_gubun = requestParamsObj.getString("sun_gubun"); // 단/복선
			String pnu = requestParamsObj.getString("mpnu"); // 검색결과 PNU
			String jijuk_area = requestParamsObj.getString("jijuk_area"); // 지면 면적(㎡)
			String comple_yn = requestParamsObj.getString("mcomple_yn"); // 완결여부
			String pyeonib_area = requestParamsObj.getString("mpyeonib_area"); // 편입 면적(㎡)
			String use_state = requestParamsObj.has("use_state")?requestParamsObj.getString("use_state"):""; // 사용현황
			String dg_startday = requestParamsObj.getString("mdeunggi_date"); // 등기일
			String deunggi_no = requestParamsObj.getString("mdeunggi_no"); // 등기번호
			String deunggiso = requestParamsObj.getString("mdeunggiso"); // 등기소
			String dosiplan = requestParamsObj.getString("mdosi_plan"); // 도시계획
			String cd_startday = requestParamsObj.getString("mchuideuk_date"); // 취득일
			String toja_no = requestParamsObj.has("toja_no")?requestParamsObj.getString("toja_no"):""; // 투자오더
			String jasan_no = requestParamsObj.getString("mjasan_no"); // 자산분류번호
			String special_cont = requestParamsObj.getString("special_cont"); // 특약사항
			String location = requestParamsObj.getString("mloacation"); // 위치
			String jimok = requestParamsObj.getString("jimok_text"); // 지목
			String manage_yn = requestParamsObj.has("manage_yn") ? "Y" : "N"; // 체크박스 값이 있으면 Y, 없으면 N // 관리제외필지
			String pipeOverlapYn = requestParamsObj.getString("overlap_yn"); // 관로일치여부
			String permitted_yn = requestParamsObj.getString("mpermit_yn"); // 지목
			String wmemo=requestParamsObj.has("jisangMemo")?requestParamsObj.getString("jisangMemo"):"";
			String account_yn = requestParamsObj.getString("account_yn");
//			String soyunumber = requestParamsObj.getString("soyunumber", "0"); // 소유자 수
//			String okaynumber = requestParamsObj.getString("okaynumber", ""); // 승인자 수
//			String filenumber = requestParamsObj.getString("filenumber", ""); // 파일 수
//			String TOJA_CNT = requestParamsObj.getString("TOJA_CNT", ""); // 투자오더 수

			String gubun = requestParamsObj.getString("gubun"); // 구분( modify : 수정, insert : 등록 )
			String mod_jisangNo = requestParamsObj.has("mod_jisangNo")?requestParamsObj.getString("mod_jisangNo"):""; // 수정할 지상권번호
//			String fileseq = requestParamsObj.getString("fileseq"); // 파일 seq
			// int FILE_CNT = Integer.parseInt(requestParamsObj.getString("flieCnt", "0")); //
			// 파일수

			String modifyReason1 = requestParamsObj.has("modifyReason1")?requestParamsObj.getString("modifyReason1"):""; // 변경이력-기본정보
			String modifyReason2 = requestParamsObj.has("modifyReason2")?requestParamsObj.getString("modifyReason2"):""; // 변경이력-소유자정보
			String modifyReason3 = requestParamsObj.has("modifyReason3")?requestParamsObj.getString("modifyReason3"):""; // 변경이력-지상권정보

			String USER_ID = String.valueOf(request.getSession().getAttribute("userId"));
			String USER_NAME = String.valueOf(request.getSession().getAttribute("userName"));

			String CONVERT_FLAG = requestParamsObj.has("CONVERT_FLAG")?requestParamsObj.getString("CONVERT_FLAG"):"N";
			String CONVERT_PAGE = requestParamsObj.has("CONVERT_PAGE")?requestParamsObj.getString("CONVERT_PAGE"):"";
			String CONVERT_BEFORE_KEY = requestParamsObj.has("CONVERT_PAGE")?requestParamsObj.getString("CONVERT_BEFORE_KEY"):"";

			String str_result = "Y";
			String str_manageNo="";
			try {
				HashMap params = new HashMap();
				//params.put("FILESEQ", fileseq);
				params.put("SINM", sinm);
				params.put("GUNGUNM", gungunm);
				params.put("DONGNM", dongnm);
				params.put("RINM", rinm);
				params.put("JISANM", jisanm);
				params.put("JIBUN", jibun);
				params.put("ADDRCODE", addrcode);
				params.put("JISA", jisa);
				params.put("GOVEROWNYN", goverownyn);
				params.put("YONGDO", yongdo);
				params.put("ZONE", zone);
				params.put("SUNGUBUN", sun_gubun);
				params.put("PNU", pnu);
				params.put("JIJUKAREA", jijuk_area);
				params.put("COMPLEYN", comple_yn);
				params.put("PYEONIBAREA", pyeonib_area);
				params.put("USESTATE", use_state);
				params.put("DGSTARTDAY", dg_startday);
				params.put("DEUNGGINO", deunggi_no);
				params.put("DEUNGGISO", deunggiso);
				params.put("DOSIPLAN", dosiplan);
				params.put("CD_STARTDAY", cd_startday);
				params.put("TOJANO", toja_no);
				params.put("JASANNO", jasan_no);
				params.put("SPECIALCONT", special_cont);
				params.put("LOCATION", location);
				params.put("STATUS", "JISANG");
				params.put("JIMOK", jimok);
				params.put("MANAGE_YN", manage_yn);
				params.put("USER_ID", USER_ID);
				params.put("USER_NAME", USER_NAME);
				params.put("PERMITTED_YN", permitted_yn);				
				params.put("PIPEYN", pipeOverlapYn);
				params.put("ACCOUNTYN", account_yn);
				

				log.info("params: "+params);
				
				// 로깅처리를 위하여 기존 지적도 데이터 조회
				HashMap logParam = (HashMap) mainService.selectHashmapQuery("songyuSQL.selectJijukBeforePNU", params);
				log.info("logParam:"+logParam);
				
				/**********************
				 * 다음 지상권 번호 조회 시작
				 **********************/
				if (gubun.equals("modify")) {
					params.put("JISANGNO", mod_jisangNo);
					
					str_manageNo=mod_jisangNo;
				} else {
					ArrayList JiSangList = (ArrayList) mainService.selectQuery("jisangSQL.selectJijangNextNo", null);
					int no=Integer.parseInt((((HashMap) JiSangList.get(0)).get("now_jisangno").toString()).toString());
					log.info("jisangList:"+JiSangList.get(0));
					log.info("jisangList:"+no);
					//String Next_jisangNo = String.valueOf(Integer.parseInt((String) ((HashMap) JiSangList.get(0)).get("now_jisangno")) + 1);
					String Next_jisangNo = String.valueOf(no + 1);
					int n_Next_jisangNo = Next_jisangNo.length();

					String add_Zero = "";
					for (int i = 0; i < (6 - n_Next_jisangNo); i++) {
						add_Zero += "0";
					}
					Next_jisangNo = "J_" + add_Zero + Next_jisangNo;
					str_manageNo=Next_jisangNo;
					params.put("JISANGNO", Next_jisangNo);
				}
log.info(" 3932 params:"+params);
				/***********************
				 * 다음 지상권 번호 조회 끝
				 ************************/
				if (gubun.equals("insert")) {
					params.put("SAVE_STATUS", "승인");
					mainService.InsertQuery("jisangSQL.insertJisangMaster", params); // 기본정보
																						// 저장
					
				    // 메모가 비어 있지 않은 경우에만 commonSQL.putMemoData 실행
				    if (wmemo != null && !wmemo.trim().isEmpty()) {
				        HashMap memoParam = new HashMap();
				        memoParam.put("manage_no", str_manageNo);
				        memoParam.put("wname", USER_NAME);
				        memoParam.put("wid", USER_ID);
				        memoParam.put("wmemo", wmemo);
				        
				        mainService.InsertQuery("commonSQL.putMemoData", memoParam);
				    }
				} else if (gubun.equals("modify")) {

					/***********************
					 * 행정구역이 변경이 되면, 기존의 행정구역은 미설정으로 바꾸고, 변경된 행정구역을 지상권으로 설정함. <= 안함.
					 ************************/
					ArrayList jijanglist = (ArrayList) mainService.selectQuery("jisangSQL.selectJisangListOrg", params);
					String str_BeforePNU = "";
					String str_BeforeADDRCODE = "";
					String str_BeforeJIBUN = "";
					log.info("jijanglist:"+jijanglist);
					if (null != jijanglist && jijanglist.size() > 0) {

						HashMap hm = new HashMap();
						for (int i = 0; i < jijanglist.size(); i++) {
							//str_BeforePNU = (String) ((HashMap) jijanglist.get(i)).get("pnu");
							str_BeforePNU = (String) ((HashMap) jijanglist.get(i)).get("pnu");
							log.info("str_BeforPnu:"+str_BeforePNU);
							str_BeforeADDRCODE = (String) ((HashMap) jijanglist.get(i)).get("addrcode");
							str_BeforeJIBUN = (String) ((HashMap) jijanglist.get(i)).get("jibun");
						}
						
					}

					// 행정구역이 같지않다면
					if (!str_BeforePNU.equals(pnu) && !str_BeforePNU.equals("NULL")) {

						/** 분할한 지번인지, 분할한 지번이라면 원지번이 다른곳에서 바라보고있는지 조회 **/
						// int hunhalCnt = (Integer)
						// Database.getInstance().queryForObject("Json.selectBunhalOrgNo",
						// params);
						// if(hunhalCnt <= 1){
						// ** JIJUK_MASTER 테이블 지상권 해제 **//
						// System.out.println("insertJisangList >>>>>> 지상권해제params=" + params);
						mainService.UpdateQuery("commonSQL.updateJijukMasterStatus", params);

						// }
						

					}
					
					if (!str_BeforePNU.equals(pnu)) {

						/** 지상권 수정일 경우 잠재이슈 이전처리 **/
						HashMap issueParams = new HashMap();
						issueParams.put("JIBUN", str_BeforeJIBUN);
						issueParams.put("ADDRCODE", str_BeforeADDRCODE);
						issueParams.put("PNU", str_BeforePNU);
						log.info("issueParams:"+issueParams);
						// 1. 기존 잠재이슈 존재하는지 조회 selectPnuIssue, selectPnuIssueHistoryList
						ArrayList issuelist = (ArrayList) mainService.selectQuery("commonSQL.selectPnuIssue", issueParams);

						if(issuelist != null && issuelist.size() > 0) {
							for(int issueIdx = 0 ; issueIdx < issuelist.size() ; issueIdx++ ) {
								HashMap issueData = (HashMap) issuelist.get(issueIdx);
								ArrayList issueHistoryList = (ArrayList) mainService.selectQuery("jisangSQL.selectPnuIssueHistoryList", issueData);
								issueData.put("issueHistoryList", issueHistoryList);
							}
						}
						
						if(issuelist != null && issuelist.size() > 0) {
							for(int issueIdx = 0 ; issueIdx < issuelist.size() ; issueIdx++ ) {
								HashMap issueData = (HashMap) issuelist.get(issueIdx);
								// 2. 존재할 경우 기존 잠재이슈 삭제 deletePnuIssueForPnuReal, deletePnuIssueHistory
								mainService.UpdateQuery("jisangSQL.deletePnuIssueHistory", issueData);
								mainService.UpdateQuery("jisangSQL.deletePnuIssueForPnuReal", issueData);
								
							}
							for(int issueIdx = 0 ; issueIdx < issuelist.size() ; issueIdx++ ) {
								HashMap issueData = (HashMap) issuelist.get(issueIdx);
								ArrayList issueHistoryList = (ArrayList) issueData.get("issueHistoryList");
								// 3. 기존 잠재이슈 정보를 신규 토지로 이관처리...? insertPnuIssue, insertPnuIssueHistory
								issueData.put("JIBUN", jibun);
								issueData.put("ADDRCODE", addrcode);
								issueData.put("PNU", pnu);
								mainService.UpdateQuery("songyuSQL.insertPnuIssue", issueData);
								if(issueHistoryList!= null && issueHistoryList.size() > 0) {
									for(int ihIdx = 0 ; ihIdx < issueHistoryList.size() ; ihIdx++ ) {
										HashMap issueHistoryData = (HashMap) issueHistoryList.get(ihIdx);
										mainService.UpdateQuery("songyuSQL.insertPnuIssueHistory", issueHistoryData);
									}
								}
								
							}
								
						}
						
					}
					
					log.info("------------------aaaaaaaaaaa------------------");
					mainService.UpdateQuery("jisangSQL.updateJisangMasterNoCancel", params); // 기본정보 수정

					// 변경이력 등록
					if (!modifyReason1.equals("")) {
						params.put("GUBUN", "기본정보");
						params.put("CONT", modifyReason1);
						mainService.InsertQuery("jisangSQL.insertJisangModifyHistory", params);
					}
					if (!modifyReason2.equals("")) {
						params.put("GUBUN", "소유자 정보");
						params.put("CONT", modifyReason2);
						mainService.InsertQuery("jisangSQL.insertJisangModifyHistory", params);
					}
					if (!modifyReason3.equals("")) {
						params.put("GUBUN", "지상권 정보");
						params.put("CONT", modifyReason3);
						mainService.InsertQuery("jisangSQL.insertJisangModifyHistory", params);
					}

				}

				// System.out.println("params=" + params);

				// 소유자
				log.info("---------------------soujaArr.length(): " + soujaArr.length());
				for (int i = 0; i < soujaArr.length(); i++) {
					JSONObject obj=new JSONObject(soujaArr.get(i).toString());
					String JIBUN = obj.getString("jibun");
					String NAME = obj.getString("soujaName");
					String ADDR = obj.getString("soujaAddress");
					String PONE_NUMBER = obj.getString("soujaContact1");
					String HOME_NUMBER = obj.getString("soujaContact2");

					params.put("JIBUN", JIBUN); // 공유지분
					params.put("NAME", NAME); // 성명
					params.put("ADDR", ADDR); // 주소
					params.put("PONE_NUMBER", PONE_NUMBER); // 연락처1
					params.put("HOME_NUMBER", HOME_NUMBER); // 연락처2

					if (gubun.equals("modify")) {
						if (i == 0) {
							mainService.UpdateQuery("jisangSQL.deleteJisangSoyu", params); // 기존
																							// 소유자
																							// 삭제
						}
					}

					// if(!JIBUN.equals("") || !NAME.equals("") ||
					// !ADDR.equals("")|| !TEL.equals("")|| !HP.equals(""))
					mainService.InsertQuery("jisangSQL.insertJisangSoyu", params); // 소유자
																					// 저장

				}

				/*
				 * //투자오더 for(int i = 0; i < Integer.parseInt(TOJA_CNT); i++){ String TOJA = parser.getString("TOJA"+String.valueOf(i), ""); params.put("TOJA", TOJA); if(gubun.equals("modify")){ if(i==0){ Database.getInstance().update("Json.deleteJisangToja", params); // 기존 정보 삭제 } } if(!TOJA.equals("")){ //System.out.println("투자오더 params = " + params); Database.getInstance().insert("Json.insertJisangToja", params); // 투자오더 테이블 저장 } }
				 */

				if (gubun.equals("modify")) {
					//수정에서 의미가 없다 각 파트에서 삭제할때 변경 이력을 등록해야함
//					for (int i = 0; i < Integer.parseInt(filenumber); i++) {
//						String IS_DEL = parser.getString("isFileDel" + String.valueOf(i), "");
//						String DEL_SEQ = parser.getString("fileSeq" + String.valueOf(i), "");
//
////						if (IS_DEL.equals("Y")) {
////							// System.out.println("FILE_DEL_SEQ=" + DEL_SEQ);
////
////							// 조회용 parma셋팅
////							params.put("SEQ", "");
////							params.put("FILENO", String.valueOf((params.get("JISANGNO"))));
////							params.put("FILE_SEQ", DEL_SEQ);
////							ArrayList File_list = (ArrayList) Database.getInstance().queryForList("Json.selectJisangRowDetail_Files", params); // 첨부파일
////
////							params.put("SEQ", DEL_SEQ);
////							Database.getInstance().update("Json.deleteFile", params);
////
////							// 변경이력 등록
////							if (null != File_list && File_list.size() > 0) {
////								String str_FileName = String.valueOf(((HashMap) File_list.get(0)).get("FILE_NM"));
////								params.put("GUBUN", "파일정보");
////								params.put("CONT", "파일삭제(" + str_FileName + ")");
////								Database.getInstance().insert("Json.insertJisangModifyHistory", params);
////							}
////						}
//					}
				}

				// 추가된 파일이 있으면 등록하고 변경이력에 등록
				for (int i = 0; i < fileArr.length(); i++) {
					//JSONObject fobj=new JSONObject(fileArr.get(i).toString());
					String file_name=fileArr.getString(i);
					log.info("file_name:"+file_name);
					 HashMap<String, Object> filesMap= new HashMap<>();
					 //
//					     			filesMap=CommonUtil.JsonArraytoMap(obj);
					 //
					     			filesMap.put("jisangNo",str_manageNo);
					     			filesMap.put("seq",String.format("%06d",i));
					     			filesMap.put("fseq",i);
					     			filesMap.put("fname",file_name);
//
					     			 String tempPath = GC.getJisangFileTempDir(); //설정파일로 뺀다.
					     			 String dataPath = GC.getJisangFileDataDir()+"/"+str_manageNo; //설정파일로 뺀다.
					     			 filesMap.put("fpath",dataPath+"/"+file_name);
					     			 CommonUtil.moveFile(file_name, tempPath, dataPath);
					     			log.info("filesMap:"+filesMap);
					     			mainService.InsertQuery("jisangSQL.insertJisangUploadData", filesMap);
					     			params.put("GUBUN", "파일정보");
									params.put("CONT", "파일등록(" + file_name + ")");
									mainService.InsertQuery("jisangSQL.insertJisangModifyHistory", params);
					
				}
//				ArrayList seq_fileList = (ArrayList) Database.getInstance().queryForList("Json.selectJISANG_ATCFILE_NoCheck", params); // 첨부 파일
//				if (null != seq_fileList && seq_fileList.size() > 0) {
//					for (int i = 0; i < seq_fileList.size(); i++) {
//						HashMap hm_fileList = (HashMap) seq_fileList.get(i);
//						String str_JNo = comm.evl(String.valueOf(hm_fileList.get("JISANG_NO")), "");
//						if ("".equals(str_JNo)) {
//							String str_FilNM = comm.evl(String.valueOf(hm_fileList.get("FILE_NM")), "");
//
//							params.put("GUBUN", "파일정보");
//							params.put("CONT", "파일등록(" + str_FilNM + ")");
//							Database.getInstance().insert("Json.insertJisangModifyHistory", params);
//						}
//					}
//				}

//				/** codecanyon에서 파일업로드 **/
//				Database.getInstance().update("Json.updateSeqFile", params); // 파일테이블에 지상권번호 업데이트

				// ** JIJUK_MASTER 테이블 새로운 행정구역으로 지상권 등록**//
				// 토지정보 상태변경
				if (!pnu.equals("NULL")) {
					log.info("4130 params:"+params);
					mainService.UpdateQuery("songyuSQL.updateTogiJisang_Status", params);
				}

				// 점용에서 지상권 전환용 추가
				if ("Y".equals(CONVERT_FLAG)) {
					if ("GOVER".equals(CONVERT_PAGE)) {
						HashMap convertParams = new HashMap();
						convertParams.put("PNU", pnu);
						convertParams.put("GOVER_NO", CONVERT_BEFORE_KEY);

						// 점용 토지정보 정보 조회 :: selectGoverPnuList
						ArrayList goverPnuLIst = (ArrayList) mainService.selectQuery("goversQL.selectGoverPnuList", convertParams);

						// 점용 토지정보가 여러건일 경우 해당 토지정보만 제거 :: deleteGoverPNUObject
						if (goverPnuLIst != null && goverPnuLIst.size() > 1) {
							mainService.DeleteQuery("goverSQL.deleteGoverPNUObject", convertParams);

						} else if (goverPnuLIst.size() == 1) { // 점용 토지정보가 단건일 경우 해당 점용정보 제거 :: deleteGoverPNU
							// 삭제시 위험성이 큰 관계로 해지처리로 대체 ::
							convertParams.put("USER_NAME", USER_NAME);
							convertParams.put("EMPCD", USER_ID);
							mainService.UpdateQuery("goverSQL.insertGoverTerminationAdd", convertParams);
							mainService.DeleteQuery("goverSQL.deleteGoverPNU", convertParams);
						}
						// 점용에서 전환되었음을 변경이력에 등록
						params.put("GUBUN", "기본정보");
						params.put("CONT", "점용 [" + CONVERT_BEFORE_KEY + "] 에서 전환등록됨");
						mainService.InsertQuery("jisangSQL.insertJisangModifyHistory", params);
					} else if ("NOTSET".equals(CONVERT_PAGE)) {

						params.put("GOVEROWNYN", params.get("GOVER_OWN_YN"));
						params.put("STATUS", "JISANG");
						params.put("NOTSET_NO", CONVERT_BEFORE_KEY);
						mainService.UpdateQuery("notsetSQL.deleteNotsetMaster", params);

						// 미설정,미점용 에서 전환되었음을 변경이력에 등록
						params.put("GUBUN", "기본정보");
						params.put("CONT", "미설정,미점용 [" + CONVERT_BEFORE_KEY + "] 에서 전환등록됨");
						mainService.InsertQuery("jisangSQL.insertJisangModifyHistory", params);

						// 미설정,미점용에서 전환될 경우 파일승계처리
						ArrayList<HashMap> list3 = (ArrayList<HashMap>) mainService.selectQuery("songyuSQL.selectNotsetRowDetail_Files", params); // 미설정,미점용 첨부 파일 조회
						// 전환처리
						for (HashMap notsetAtt : list3) {
							// insertJisangFile
							notsetAtt.put("JISANGNO", params.get("JISANGNO"));
							mainService.InsertQuery("jisangSQL.insertJisangFile", notsetAtt);
							mainService.DeleteQuery("songyuSQL.notsetDeleteFile", notsetAtt);
						}

					}
				}

				if (!"modify".equals(gubun)) {
					/**********************
					 * 잠재이슈 기본값 등록처리
					 * 지상권 설정, 계약 체결, 이슈없음, 이슈없음, 이슈없음
					 **********************/
		
					int result = 0;
					if ("99999".equals(pnu) || "null".equals(pnu) || "".equals(pnu)) {
						// 2023.03.09 :: pnu가 null인 경우가 있음. 
						params.put("PNU", null);
					} else {
						params.put("PNU", pnu);
					}
		
					params.put("ADDRCODE", addrcode);
					params.put("JIBUN", jibun);
					params.put("CODE_DEPTH1", "DY010000");	// 이슈없음
					params.put("CODE_DEPTH2", "DY010100");	// 이슈없음
					params.put("CODE_DEPTH3", "DY010101");	// 이슈없음
					params.put("ISSUE_COMMENT", "지상권 신규등록");
					params.put("HISTORY_TYPE", "신규 등록");
					params.put("HISTORY_CONTENT", "신규 등록: [이슈없음 &gt; 이슈없음 &gt; 이슈없음], 사유: [신규등록]");
					params.put("REGISTED_YN", "DY");
					params.put("PERMITTED_YN", "Y");
					System.out.println("params="+params.toString());
					//int iseq=(int)
					String SEQ = (String) mainService.selectStringQuery("songyuSQL.makePnuIssueSeq", params);
					params.put("SEQ", SEQ);
					result = (int) mainService.UpdateQuery("songyuSQL.insertPnuIssue", params);
		
					if (result > 0) {
						mainService.UpdateQuery("songyuSQL.insertPnuIssueHistory", params);
					}
				
				}
				/**********************
				 * 잠재이슈 기본값 등록처리
				 * 지상권 설정, 계약 체결, 이슈없음, 이슈없음, 이슈없음
				 **********************/

				map.put("JISANGNO", params.get("JISANGNO"));
				

				// 로깅처리를 위하여 기존 지적도 데이터 조회
//				Map logParam = (HashMap) Database.getInstance().queryForObject("Json.selectJijukBefore", params);
				if(logParam != null ) {
					// 해지처리미설정 정보 처리
					logParam.put("JISANG_NO", params.get("JISANGNO"));
					logParam.put("JISANG_STATUS","JISANG");
					logParam.put("GOVER_OWN_YN", params.get("GOVER_OWN_YN"));
					logParam.put("PIPE_OVERLAP_YN", pipeOverlapYn);
					logParam.put("JISA", jisa);
					logParam.put("LOG_USER", String.valueOf(request.getSession().getAttribute("userId")));
					logParam.put("LOG_TYPE", "U");
					mainService.InsertQuery("songyouSQL.insertJijukLog", logParam);
				}

			} catch (Exception e) {
				str_result = "N";
				e.printStackTrace();
			}

			if (list != null)
				map.put("count", list.size());
			else
				map.put("count", 0);

			map.put("message", str_result);
			map.put("result", list);
log.info("map:"+map);
			JSONObject jo = new JSONObject(map);

			response.setCharacterEncoding("UTF-8");
			response.setHeader("Access-Control-Allow-Origin", "*");
			response.resetBuffer();
			response.setContentType("application/json");
			response.getWriter().print(jo);
			response.getWriter().flush();

		}
	
	// 지상권 분할 임시저장
	@Transactional
	@PostMapping(path="/insertJisangBunhalTmp")
		public void insertJisangBunhalTmp(HttpServletRequest request, HttpServletResponse response) throws Exception {
		String requestParams = ParameterUtil.getRequestBodyToStr(request);
		JSONObject requestParamsObj=new JSONObject(requestParams);
		log.info("requestParams:"+requestParams);
		
			ParameterParser parser = new ParameterParser(request);
			String bunhalreason = requestParamsObj.getString("bunhalreason"); // 분할사유
			String bunhalComment = requestParamsObj.getString("bunhalComment"); // 검토의견
			String bunhaldate = requestParamsObj.getString("bunhaldate").replace("-", "");
			// String set_money = parser.getString("set_money", ""); // 설정금액
			String pipe_yn = requestParamsObj.getString("pipe_yn"); // 관로저촉
			String cancle_yn = requestParamsObj.getString("cancle_yn"); // 해지여부
			String jisangno = requestParamsObj.getString("jisangno");
			String cnt = requestParamsObj.getString("cnt");
			String echoSangsin = requestParamsObj.getString("echoSangsin");
			String modifyReason = "";
			String modifyReason2 = "";
			String USER_ID = String.valueOf(request.getSession().getAttribute("userId"));
			String USER_NAME = String.valueOf(request.getSession().getAttribute("userName"));

			
			
			 //대상토지 입력
	        JSONArray desangTogis=requestParamsObj.getJSONArray("togiDatas");
//			String bunhalreason = parser.getString("bunhalreason", ""); // 분할사유
//			String bunhalComment = parser.getString("bunhalComment", ""); // 검토의견
//			String bunhaldate = parser.getString("bunhaldate", "").replace("-", "");
//			// String set_money = parser.getString("set_money", ""); // 설정금액
//			String pipe_yn = parser.getString("pipe_yn", ""); // 관로저촉
//			String cancle_yn = parser.getString("cancle_yn", ""); // 해지여부
//			String jisangno = parser.getString("jisangno", "");
//			String cnt = parser.getString("cnt", "");
//			String echoSangsin = parser.getString("echoSangsin", "");
//			String modifyReason = "";
//			String modifyReason2 = "";
//			String USER_ID = String.valueOf(request.getSession().getAttribute("userId"));
//			String USER_NAME = String.valueOf(request.getSession().getAttribute("userName"));

			CommonUtil comm = new CommonUtil();
			String str_result = "Y";

			HashMap map = new HashMap(); // 응답용 맵

			try {
//				Database.getInstance().startTransaction();

				// 1. 기존 지상권 정보 분할여부, 분할사유, 검토의견 등록
				HashMap params = new HashMap();
				params.put("BUNHALYN", "Y");
				params.put("BUNHALREASON", bunhalreason);
				params.put("BUNHALCOMMENT", bunhalComment);
				params.put("BUNHALDATE", bunhaldate);
				// params.put("SET_MONEY", set_money);
				params.put("PIPE_YN", pipe_yn);
				params.put("CANCLE_YN", cancle_yn);
				params.put("JISANGNO", jisangno);

				// 기존데이터 조회
				ArrayList ori_list = (ArrayList) mainService.selectQuery("jisangSQL.selectJisangDetailList", params);

				String JISA = (String) ((HashMap) ori_list.get(0)).get("JISA");

				ArrayList<HashMap> ori_soyu_list = (ArrayList<HashMap>) mainService.selectQuery("jisangSQL.selectJisangDetailSoyu", params);

				mainService.DeleteQuery("jisangSQL.deleteJisangBunhalTmp", params);

				// 2. 신규 생성된 지상권 정보 등록처리
				for (int i = 0; i <= Integer.parseInt(cnt); i++) {

					HashMap Addparams = new HashMap();
					String wonjibeonYn = parser.getString("wonjibeonYn" + String.valueOf(i), "");

					String bunhalJisangno = "";
					// String bunhalJisangno = parser.getString("bunhalJisangNo" + String.valueOf(i), "");

					/**********************
					 * 다음 지상권 번호 조회 시작
					 **********************/
					ArrayList JiSangList = (ArrayList) mainService.selectQuery("jisangSQL.selectJijangNextNo", null);

					String Next_jisangNo = String.valueOf(Integer.parseInt((String) ((HashMap) JiSangList.get(0)).get("now_jisangno")) + 1);
					int n_Next_jisangNo = Next_jisangNo.length();

					String add_Zero = "";
					for (int j = 0; j < (6 - n_Next_jisangNo); j++) {
						add_Zero += "0";
					}
					Next_jisangNo = "J_" + add_Zero + Next_jisangNo;
					bunhalJisangno = Next_jisangNo;

					String sido = parser.getString("sido" + String.valueOf(i), "");
					String gungu = parser.getString("gungu" + String.valueOf(i), "");
					String dong = parser.getString("dong" + String.valueOf(i), "");
					String ri = parser.getString("ri" + String.valueOf(i), "");
					String sidonm = (parser.getString("sidonm" + String.valueOf(i), "")).replace("전체", "");
					String gungunm = (parser.getString("gungunm" + String.valueOf(i), "")).replace("전체", "");
					String dongnm = (parser.getString("dongnm" + String.valueOf(i), "")).replace("전체", "");
					String rinm = (parser.getString("rinm" + String.valueOf(i), "")).replace("전체", "");
					String jibun = parser.getString("jibun" + String.valueOf(i), "");
					String pnu = parser.getString("pnu" + String.valueOf(i), "NULL");
					String jijukarea = parser.getString("jijukarea" + String.valueOf(i), "0");
					String pyeonibarea = parser.getString("pyeonibarea" + String.valueOf(i), "0");
					String deunggidate = parser.getString("deunggidate" + String.valueOf(i), "").replaceAll("-", "");
					String deunggiso = parser.getString("deunggiso" + String.valueOf(i), "");
					String deunggino = parser.getString("deunggino" + String.valueOf(i), "");
					String soujaname = parser.getString("soujaname" + String.valueOf(i), "");
					String address = parser.getString("address" + String.valueOf(i), "");
					String ponenumber = parser.getString("ponenumber" + String.valueOf(i), "");
					String jasanNo = parser.getString("jasanNo" + String.valueOf(i), "");
					String ADDRCODE = parser.getString("addrcode" + String.valueOf(i), "");
					String GOVEROWNYN = parser.getString("goverownyn" + String.valueOf(i), "");
					String PIPE_YN = parser.getString("pipe_yn" + String.valueOf(i), "");
					String CANCLE_YN = parser.getString("cancle_yn" + String.valueOf(i), "");
					// String SET_MONEY = parser.getString("set_money" + String.valueOf(i), "");
					String JIMOK_TEXT = parser.getString("jimoktext" + String.valueOf(i), "");
					String DOCKEY = parser.getString("dockey" + String.valueOf(i), "");
//					String DEMISE = parser.getString("demise" + String.valueOf(i), "N");
					String DEMISE = "Y"; // 2023.01.16 :: 지상권 승계 상신 시 무조건 승계하도록 로직수정.

					Addparams.put("JISANGNO", i == 0 ? jisangno : "");
					Addparams.put("SINM", sidonm);
					Addparams.put("GUNGUNM", gungunm);
					Addparams.put("DONGNM", dongnm);
					Addparams.put("RINM", rinm);
					Addparams.put("JIBUN", jibun);
					Addparams.put("JISANM", JISA);
					Addparams.put("GOVEROWNYN", GOVEROWNYN);
					Addparams.put("JIJUKAREA", jijukarea);
					Addparams.put("PYEONIBAREA", pyeonibarea);
					Addparams.put("JASANNO", jasanNo);
					Addparams.put("ADDRCODE", ADDRCODE);
					Addparams.put("PNU", pnu);
					Addparams.put("BUNHALORGNO", jisangno);
					Addparams.put("PIPE_YN", PIPE_YN);
					Addparams.put("CANCLE_YN", CANCLE_YN);
					Addparams.put("DOCKEY", DOCKEY);
					Addparams.put("DEMISE", DEMISE);
					if ("Y".equals(CANCLE_YN)) {
						String REMAINDER_MONEY = parser.getString("remainder_money" + String.valueOf(i), "0");
						String CHUIDEUK_MONEY = parser.getString("chuideuk_money" + String.valueOf(i), "0");
						String GAMMONEY = parser.getString("gammoney" + String.valueOf(i), "0");
						String BOSANG_MONEY = parser.getString("bosang_money" + String.valueOf(i), "0");
						String PROFIT_LOSS = parser.getString("profit_loss" + String.valueOf(i), "0");
						Addparams.put("REMAINDER_MONEY", REMAINDER_MONEY);
						Addparams.put("CHUIDEUK_MONEY", CHUIDEUK_MONEY);
						Addparams.put("GAMMONEY", GAMMONEY);
						Addparams.put("BOSANG_MONEY", BOSANG_MONEY);
						Addparams.put("PROFIT_LOSS", PROFIT_LOSS);
					}
					// Addparams.put("SET_MONEY", SET_MONEY);
					Addparams.put("JIMOK_TEXT", JIMOK_TEXT);
					Addparams.put("BUNHALREASON", bunhalreason);
					Addparams.put("BUNHALCOMMENT", bunhalComment);
					Addparams.put("BUNHALDATE", bunhaldate);

					mainService.InsertQuery("jisangSQL.InsertJisangBunhalTmp", Addparams);

				}

//				Database.getInstance().commitTransaction();

			} catch (Exception e) {
				str_result = "N";
				e.printStackTrace();
			} finally {
//				Database.getInstance().endTransaction();
			}

			map.put("message", str_result);

			JSONObject jo = new JSONObject(map);

			response.setCharacterEncoding("UTF-8");
			response.setHeader("Access-Control-Allow-Origin", "*");
			response.resetBuffer();
			response.setContentType("application/json");
			response.getWriter().print(jo);
			response.getWriter().flush();
		}
	
	
	// 지상권 분할등록
	@Transactional
	@PostMapping(path="/insertJisangBunhal")
		public void insertJisangBunhal(HttpServletRequest request, HttpServletResponse response) throws Exception {
		String requestParams = ParameterUtil.getRequestBodyToStr(request);
		JSONObject requestParamsObj=new JSONObject(requestParams);
		log.info("requestParams:"+requestParams);
		
		 JSONArray desangTogis=requestParamsObj.getJSONArray("togiDatas");
		
		String bunhalreason = requestParamsObj.getString("bunhalreason");
		String bunhaldate = requestParamsObj.getString("bunhaldate").replace("-", "");
		String jisangno = requestParamsObj.getString("jisangno");
		String cnt = requestParamsObj.getString("cnt");
		String modifyReason = requestParamsObj.getString("modifyReason");
		String modifyReason2 = "";
		String USER_ID = String.valueOf(request.getSession().getAttribute("userId"));
		String USER_NAME = String.valueOf(request.getSession().getAttribute("userName"));

		
			ParameterParser parser = new ParameterParser(request);
//			String bunhalreason = parser.getString("bunhalreason", "");
//			String bunhaldate = parser.getString("bunhaldate", "").replace("-", "");
//			String jisangno = parser.getString("jisangno", "");
//			String cnt = parser.getString("cnt", "");
//			String modifyReason = parser.getString("modifyReason", "");
//			String modifyReason2 = "";
//			String USER_ID = String.valueOf(request.getSession().getAttribute("userId"));
//			String USER_NAME = String.valueOf(request.getSession().getAttribute("userName"));

			CommonUtil comm = new CommonUtil();
			String str_result = "Y";
			try {

				/**
				 * 1. 기존 데이터 분할 업데이트
				 **/
				HashMap params = new HashMap();
				params.put("BUNHALYN", "Y");
				params.put("BUNHALREASON", bunhalreason);
				params.put("BUNHALDATE", bunhaldate);
				params.put("JISANGNO", jisangno);

				// 기존데이터 조회
				ArrayList ori_list = (ArrayList) mainService.selectQuery("jisangSQL.selectJisangDetailList", params);

				// 기본정보 분할 업데이트
				mainService.InsertQuery("jisangSQL.updateJisangBunhalMaster", params);

				/**
				 * 2. 신규 데이터 생성
				 **/

				for (int i = 1; i <= desangTogis.length(); i++) {
					JSONObject obj=new JSONObject(desangTogis.get(i).toString());

					/**********************
					 * 다음 지상권 번호 조회 시작
					 **********************/
					ArrayList JiSangList = (ArrayList) mainService.selectQuery("jisangSQL.selectJijangNextNo", null);

					String Next_jisangNo = String.valueOf(Integer.parseInt((String) ((HashMap) JiSangList.get(0)).get("now_jisangno")) + 1);
					int n_Next_jisangNo = Next_jisangNo.length();

					String add_Zero = "";
					for (int j = 0; j < (6 - n_Next_jisangNo); j++) {
						add_Zero += "0";
					}
					Next_jisangNo = "J_" + add_Zero + Next_jisangNo;

					/***********************
					 * 다음 지상권 번호 조회 끝
					 ************************/

					HashMap Addparams = new HashMap();
//					String wonjibeonYn = parser.getString("wonjibeonYn" + String.valueOf(i), "");
					String wonjibeonYn = "Y"; // 모지번 무조건 승계로 변경.

					String sido = obj.getString("sido");
					String gungu = obj.getString("gungu");
					String dong = obj.getString("dong");
					String ri = obj.getString("ri");
					String addrcode = dong;
					String sidonm = (obj.getString("sidonm" )).replace("전체", "");
					String gungunm = (obj.getString("gungunm")).replace("전체", "");
					String dongnm = (obj.getString("dongnm")).replace("전체", "");
					String rinm = (obj.getString("rinm")).replace("전체", "");
					String jibun = obj.getString("jibun");
					String pnu = obj.has("pnu")?obj.getString("pnu"):null;
					String jijukarea = obj.has("jijukarea")?obj.getString("jijukarea"):"0";
					String pyeonibarea = obj.has("pyeonibarea")?obj.getString("pyeonibarea"):"0";
					String deunggidate = obj.has("deunggidate")?obj.getString("deunggidate").replaceAll("-", ""):"";
					String deunggiso = obj.getString("deunggiso");
					String deunggino = obj.getString("deunggino");
					String soujaname = obj.getString("soujaname");
					String address = obj.getString("address");
					String ponenumber = obj.getString("ponenumber");
					String jasanNo = obj.getString("jasanNo");
					String ADDRCODE = obj.getString("addrcode");

					modifyReason2 = " ";
					if (!sidonm.equals(""))
						modifyReason2 += sidonm + " ";
					if (!gungunm.equals(""))
						modifyReason2 += gungunm + " ";
					if (!dongnm.equals(""))
						modifyReason2 += dongnm + " ";
					if (!rinm.equals(""))
						modifyReason2 += rinm + " ";
					if (!jibun.equals(""))
						modifyReason2 += jibun + " ";
					if (!jisangno.equals(""))
						modifyReason2 += "(지상권 번호:" + Next_jisangNo + ")으로 분할";

					if (!"".equals(ri)) {
						addrcode = ri;
					}


					HashMap logParam = null;

					// 모지번 승계
					Addparams.put("STATUS", "JISANG");
					if ("Y".equals(wonjibeonYn)) {
						Addparams.put("JISANGNO", Next_jisangNo);
						Addparams.put("SINM", comm.evl(String.valueOf(((HashMap) ori_list.get(0)).get("sido_nm")), ""));
						Addparams.put("GUNGUNM", comm.evl(String.valueOf(((HashMap) ori_list.get(0)).get("sgg_nm")), ""));
						Addparams.put("DONGNM", comm.evl(String.valueOf(((HashMap) ori_list.get(0)).get("emd_nm")), ""));
						Addparams.put("RINM", comm.evl(String.valueOf(((HashMap) ori_list.get(0)).get("ri_nm")), ""));
						Addparams.put("JISANM", comm.evl(String.valueOf(((HashMap) ori_list.get(0)).get("jisa")), ""));
						Addparams.put("JIBUN", comm.evl(jibun, ""));
						Addparams.put("ADDRCODE", comm.evl(String.valueOf(((HashMap) ori_list.get(0)).get("addrcode")), ""));
						Addparams.put("YONGDO", comm.evl(String.valueOf(((HashMap) ori_list.get(0)).get("yongdo")), ""));
						Addparams.put("ZONE", comm.evl(String.valueOf(((HashMap) ori_list.get(0)).get("pipe_name")), ""));
						Addparams.put("SUNGUBUN", comm.evl(String.valueOf(((HashMap) ori_list.get(0)).get("sun_gubun")), ""));
						Addparams.put("PNU", comm.evl(String.valueOf(((HashMap) ori_list.get(0)).get("pnu")), "NULL"));
						Addparams.put("JIJUKAREA", comm.evl(jijukarea, ""));
						Addparams.put("COMPLEYN", comm.evl(String.valueOf(((HashMap) ori_list.get(0)).get("comple_yn")), ""));
						Addparams.put("PYEONIBAREA", comm.evl(pyeonibarea, ""));
						Addparams.put("USESTATE", comm.evl(String.valueOf(((HashMap) ori_list.get(0)).get("use_state")), ""));
						Addparams.put("DGSTARTDAY", comm.evl(deunggidate.replace("-", ""), ""));
						Addparams.put("DEUNGGINO", comm.evl(deunggino, ""));
						Addparams.put("DEUNGGISO", comm.evl(deunggiso, ""));
						Addparams.put("DOSIPLAN", comm.evl(String.valueOf(((HashMap) ori_list.get(0)).get("dosiplan")), ""));
						Addparams.put("CD_STARTDAY", comm.evl(String.valueOf(((HashMap) ori_list.get(0)).get("chuideuk_date")).replace("-", ""), ""));
						Addparams.put("TOJANO", comm.evl(String.valueOf(((HashMap) ori_list.get(0)).get("toja_no")), ""));
						Addparams.put("JASANNO", comm.evl(jasanNo, ""));
						Addparams.put("GOVEROWNYN", comm.evl(String.valueOf(((HashMap) ori_list.get(0)).get("gover_own_yn")), ""));
						Addparams.put("BUNHALORGNO", comm.evl(jisangno, "")); // 기존 지상권번호
						
						logParam = (HashMap) mainService.selectHashmapQuery("commonSQL.selectJijukBefore", Addparams);
					} else {
						Addparams.put("JISANGNO", comm.evl(Next_jisangNo, ""));
						Addparams.put("SINM", comm.evl(sidonm, ""));
						Addparams.put("GUNGUNM", comm.evl(gungunm, ""));
						Addparams.put("DONGNM", comm.evl(dongnm, ""));
						Addparams.put("RINM", comm.evl(rinm, ""));
						Addparams.put("JISANM", comm.evl(String.valueOf(((HashMap) ori_list.get(0)).get("jisa")), ""));
						Addparams.put("JIBUN", comm.evl(jibun, ""));
						Addparams.put("ADDRCODE", comm.evl(ADDRCODE, ""));
						Addparams.put("YONGDO", "");
						Addparams.put("ZONE", "");
						Addparams.put("SUNGUBUN", "");
						Addparams.put("PNU", comm.evl(pnu, "NULL"));
						Addparams.put("JIJUKAREA", comm.evl(jijukarea, ""));
						Addparams.put("COMPLEYN", "");
						Addparams.put("PYEONIBAREA", comm.evl(pyeonibarea, ""));
						Addparams.put("USESTATE", "");
						Addparams.put("DGSTARTDAY", comm.evl(deunggidate, ""));
						Addparams.put("DEUNGGINO", comm.evl(deunggino, ""));
						Addparams.put("DEUNGGISO", comm.evl(deunggiso, ""));
						Addparams.put("DOSIPLAN", "");
						Addparams.put("TOJANO", "");
						Addparams.put("JASANNO", comm.evl(jasanNo, ""));
						Addparams.put("GOVEROWNYN", "");
						Addparams.put("BUNHALORGNO", comm.evl(jisangno, "")); // 기존
																				// 지상권번호

						logParam = (HashMap) mainService.selectHashmapQuery("commonSQL.selectJijukBefore", Addparams);
					}
					// System.out.println("========= in =======");
					// System.out.println("Addparams=" + Addparams);
					// System.out.println("========= out =======");

					Addparams.put("GUBUN", "분할");
					Addparams.put("USER_ID", USER_ID);
					Addparams.put("USER_NAME", USER_NAME);
					Addparams.put("CONT", modifyReason + modifyReason2);
					// System.out.println("modifyReason="+modifyReason+modifyReason2);
					mainService.InsertQuery("jisangSQL.insertJisangBunhalMaster", Addparams); // 기본정보 저장
					mainService.InsertQuery("jisangSQL.insertJisangModifyHistory", Addparams); // 변경이력 등록

					// 모지번승계Y면 소유자테이블의 기존 JISANG_NO를 새로운 JISANG_NO로 업데이트
					if ("Y".equals(wonjibeonYn)) {
						String ORI_JISAN_NO = String.valueOf(((HashMap) ori_list.get(0)).get("jisang_no"));
						// System.out.println("ORI_JISAN_NO="+ORI_JISAN_NO);
						Addparams.put("ORI_JISANGNO", ORI_JISAN_NO);
						mainService.UpdateQuery("jisangSQL.updateSoyuJa_JisangNo", Addparams);

					} else {
						Addparams.put("JIBUN", ""); // 공유지분
						Addparams.put("NAME", soujaname); // 성명
						Addparams.put("ADDR", address); // 주소
						Addparams.put("TEL", ""); // 연락처(집)
						Addparams.put("HP", ponenumber); // 연락처(모바일)

						mainService.InsertQuery("jisangSQL.insertJisangSoyu", Addparams); // 소유자
																							// 저장
					}
					
					String PNU = comm.evl(String.valueOf(((HashMap) ori_list.get(0)).get("pnu")), "");
					if (!PNU.equals("NULL")) {
						mainService.UpdateQuery("songyuSQL.updateTogiJisang_Status", Addparams); // 기존 승인내역 삭제
					}
					


					// 로깅처리를 위하여 기존 지적도 데이터 조회
//					Map logParam = (HashMap) Database.getInstance().queryForObject("Json.selectJijukBefore", params);
					// 해지처리미설정 정보 처리
					logParam.put("JISANG_NO", Next_jisangNo);
					logParam.put("JISANG_STATUS","JISANG");
					logParam.put("GOVER_OWN_YN", logParam.get("GOVER_OWN_YN_OLD"));
					logParam.put("PIPE_OVERLAP_YN", logParam.get("PIPE_OVERLAP_YN_OLD"));
					logParam.put("JISA", comm.evl(String.valueOf(((HashMap) ori_list.get(0)).get("jisa")), ""));
					logParam.put("LOG_USER", String.valueOf(request.getSession().getAttribute("userId")));
					logParam.put("LOG_TYPE", "U");
					mainService.InsertQuery("songyuSQL.insertJijukLog", logParam);
				}

			} catch (Exception e) {
				str_result = "N";
				e.printStackTrace();
			}
			HashMap map = new HashMap();

			map.put("message", str_result);

			JSONObject jo = new JSONObject(map);

			response.setCharacterEncoding("UTF-8");
			response.setHeader("Access-Control-Allow-Origin", "*");
			response.resetBuffer();
			response.setContentType("application/json");
			response.getWriter().print(jo);
			response.getWriter().flush();
		}
	
	
	// 지상권 분할 승인
	@Transactional
	@PostMapping(path="/insertJisangBunhalComplete")
		public void insertJisangBunhalComplete(HttpServletRequest request, HttpServletResponse response) throws Exception {
		
		String requestParams = ParameterUtil.getRequestBodyToStr(request);
		JSONObject requestParamsObj=new JSONObject(requestParams);
		log.info("requestParams:"+requestParams);
		
			ParameterParser parser = new ParameterParser(request);
			String jisangno = requestParamsObj.getString("jisangno");
			String USER_ID = String.valueOf(request.getSession().getAttribute("userId"));
			String USER_NAME = String.valueOf(request.getSession().getAttribute("userName"));
			String modifyReason = "";
			String modifyReason2 = "";

			CommonUtil comm = new CommonUtil();
			String str_result = "Y";
			try {
//				Database.getInstance().startTransaction();
				/**
				 * 1. 분할 데이터 조회
				 **/
				HashMap params = new HashMap();
				params.put("BUNHALYN", "Y");
				params.put("JISANGNO", jisangno);
				ArrayList<HashMap> ori_list = (ArrayList<HashMap>) mainService.selectQuery("jisangSQL.selectJisangDetailList", params);
				params.put("BUNHAL_ORG_NO", jisangno);
				ArrayList<HashMap> bunhal_list = (ArrayList<HashMap>) mainService.selectQuery("jisangSQL.selectJisangBunhalTmpList", params);

				/**
				 * 2. 신규 데이터 생성
				 **/
				// 모지번이 리스트에 0번이므로 1부터 시작
				for (int i = 1; i < bunhal_list.size(); i++) {

					/**********************
					 * 다음 지상권 번호 조회 시작
					 **********************/
					ArrayList JiSangList = (ArrayList) mainService.selectQuery("jisangSQL.selectJijangNextNo", null);

					String Next_jisangNo = String.valueOf(Integer.parseInt((String) ((HashMap) JiSangList.get(0)).get("now_jisangno")) + 1);
					int n_Next_jisangNo = Next_jisangNo.length();

					String add_Zero = "";
					for (int j = 0; j < (6 - n_Next_jisangNo); j++) {
						add_Zero += "0";
					}
					Next_jisangNo = "J_" + add_Zero + Next_jisangNo;

					/***********************
					 * 다음 지상권 번호 조회 끝
					 ************************/

					HashMap Addparams = new HashMap();
					String wonjibeonYn = requestParamsObj.has("wonjibeonYn")?requestParamsObj.getString("wonjibeonYn"):"N";

					String sidonm = comm.nvl((String) bunhal_list.get(i).get("jb_sido_nm"));
					String gungunm = comm.nvl((String) bunhal_list.get(i).get("jb_sgg_nm"));
					String dongnm = comm.nvl((String) bunhal_list.get(i).get("jb_emd_nm"));
					String rinm = comm.nvl((String) bunhal_list.get(i).get("jb_ri_nm"));
					String jibun = comm.nvl((String) bunhal_list.get(i).get("jb_jibun"));
					String pnu = comm.nvl((String) bunhal_list.get(i).get("jb_pnu"));
					//String jijukarea = comm.evl(bunhal_list.get(i).get("jijuk_area").toString(), "0");
					String jijukarea = bunhal_list.get(i).get("jb_jijuk_area") != null ? bunhal_list.get(i).get("jb_jijuk_area").toString() : "0";
					String pyeonibarea = bunhal_list.get(i).get("jb_pyeonib_area")!=null?bunhal_list.get(i).get("jb_pyeonib_area").toString():"0";
					//String pyeonibarea = comm.evl((String) bunhal_list.get(i).get("pyeonib_area").toString(), "0");
					String jasanNo = comm.evl((String) bunhal_list.get(i).get("jb_jasan_no"), "0");
					String ADDRCODE = comm.nvl((String) bunhal_list.get(i).get("jb_addrcode"));
					String jisanm = comm.nvl((String) bunhal_list.get(i).get("jb_jisa"));
					String goverownyn = comm.nvl((String) bunhal_list.get(i).get("jb_gover_own_yn"));
					String jimoktext = comm.nvl((String) bunhal_list.get(i).get("jb_jimok_text"));

					modifyReason += comm.nvl((String) bunhal_list.get(0).get("jb_sido_nm")) + " ";
					modifyReason += comm.nvl((String) bunhal_list.get(i).get("jb_sgg_nm")) + " ";
					modifyReason += comm.nvl((String) bunhal_list.get(i).get("jb_emd_nm")) + " ";
					modifyReason += comm.nvl((String) bunhal_list.get(i).get("jb_ri_nm")) + " ";
					modifyReason += comm.nvl((String) bunhal_list.get(i).get("jb_jibun")) + " ";
					modifyReason += "(지상권 번호:" + comm.nvl((String) bunhal_list.get(0).get("jb_jisang_no")) + ")에서";

					modifyReason2 = " ";
					if (!sidonm.equals(""))
						modifyReason2 += sidonm + " ";
					if (!gungunm.equals(""))
						modifyReason2 += gungunm + " ";
					if (!dongnm.equals(""))
						modifyReason2 += dongnm + " ";
					if (!rinm.equals(""))
						modifyReason2 += rinm + " ";
					if (!jibun.equals(""))
						modifyReason2 += jibun + " ";
					if (!jisangno.equals(""))
						modifyReason2 += "(지상권 번호:" + Next_jisangNo + ")으로 분할";

					Addparams.put("STATUS", "JISANG");
					// 모지번 승계
					Addparams.put("JISANGNO", Next_jisangNo);
					Addparams.put("SINM", sidonm);
					Addparams.put("GUNGUNM", gungunm);
					Addparams.put("DONGNM", dongnm);
					Addparams.put("RINM", rinm);
					Addparams.put("JISANM", jisanm);
					Addparams.put("JIBUN", jibun);
					Addparams.put("JIMOKTEXT", jimoktext);
					Addparams.put("ADDRCODE", ADDRCODE);
					Addparams.put("YONGDO", "");
					Addparams.put("ZONE", "");
					Addparams.put("SUNGUBUN", "");
					Addparams.put("PNU", pnu);
					Addparams.put("JIJUKAREA", jijukarea);
					Addparams.put("COMPLEYN", "");
					Addparams.put("DGSTARTDAY", "");
					Addparams.put("DEUNGGINO", "");
					Addparams.put("DEUNGGISO", "");
					Addparams.put("PYEONIBAREA", pyeonibarea);
					Addparams.put("USESTATE", "");
					Addparams.put("DOSIPLAN", "");
					Addparams.put("TOJANO", "");
					Addparams.put("JASANNO", jasanNo);
					Addparams.put("GOVEROWNYN", goverownyn);
					Addparams.put("BUNHALORGNO", jisangno); // 기존
															// 지상권번호
															// System.out.println("========= in =======");
															// System.out.println("Addparams=" + Addparams);
															// System.out.println("========= out =======");

					Addparams.put("GUBUN", "분할");
					Addparams.put("USER_ID", USER_ID);
					Addparams.put("USER_NAME", USER_NAME);
					Addparams.put("CONT", modifyReason + modifyReason2);
					// System.out.println("modifyReason="+modifyReason+modifyReason2);
					log.info("Addparams:"+Addparams);
					mainService.InsertQuery("jisangSQL.insertJisangBunhalMasterNew", Addparams); // 기본정보
																									// 저장
					mainService.InsertQuery("jisangSQL.insertJisangModifyHistory", Addparams); // 변경이력
																								// 등록

					String PNU = comm.evl(String.valueOf(((HashMap) bunhal_list.get(i)).get("pnu")), "");
					if (!PNU.equals("NULL")) {
						mainService.UpdateQuery("songyuSQL.updateTogiJisang_Status", Addparams); // 기존
																									// 승인내역
																									// 삭제
					}
				}
				HashMap map = new HashMap();
				map.put("JISANGNO", jisangno);
				mainService.DeleteQuery("jisangSQL.deleteJisangBunhalTmp", map);

//				Database.getInstance().commitTransaction();
			} catch (Exception e) {
				str_result = "N";
				e.printStackTrace();
			} finally {
//				Database.getInstance().endTransaction();
			}
			HashMap map = new HashMap();

			map.put("message", str_result);

			JSONObject jo = new JSONObject(map);

			response.setCharacterEncoding("UTF-8");
			response.setHeader("Access-Control-Allow-Origin", "*");
			response.resetBuffer();
			response.setContentType("application/json");
			response.getWriter().print(jo);
			response.getWriter().flush();
		}

	// 지상권 합필 승인
	@Transactional
	@PostMapping(path="/completeMerge")
		public void completeMerge(HttpServletRequest request, HttpServletResponse response) throws Exception {

		String requestParams = ParameterUtil.getRequestBodyToStr(request);
		JSONObject requestParamsObj=new JSONObject(requestParams);
		log.info("requestParams:"+requestParams);
		
			// 결과 리턴용 맵객체 선언
			HashMap map = new HashMap();

			ParameterParser parser = new ParameterParser(request);
			String mainJisangNo = requestParamsObj.getString("mainJisangNo"); // 대표지상권번호

			String USER_ID = String.valueOf(request.getSession().getAttribute("userId"));
			String USER_NAME = String.valueOf(request.getSession().getAttribute("userName"));

			String str_result = "Y";

			try {

//				Database.getInstance().startTransaction();
				HashMap param = new HashMap();

				// 대표필지 합필정보
				param.put("JISANG_NO", mainJisangNo);
				ArrayList mlist= (ArrayList) mainService.selectQuery("jisangSQL.selectJisangMergeSaveList", param);
				HashMap<String, Object> mainJisangMap=(HashMap) mlist.get(0);
				log.info("mainJisangMap:"+mainJisangMap);
				// 임시저장된 합필정보
				param.put("JISANG_NO", null);
				param.put("REP_JISANG_NO", mainJisangNo);
				ArrayList<HashMap> targetList = (ArrayList) mainService.selectQuery("jisangSQL.selectJisangMergeSaveList", param);
				
				for (HashMap<String, String> datas : targetList) {
					log.info("targetList:"+datas);
					// 합필 등록시 수정했던 내용 지상 마스터에서 수정
					mainService.UpdateQuery("jisangSQL.updateMergeJisangMaster", datas);

					// 대표지상권이 아닌 기존 지상권 정보를 삭제처리하고 지상권 합필정보 관리 테이블에 삽입한다.
					if ("N".equals(datas.get("main_flag"))) {
						datas.put("REP_JISANG_NO", mainJisangNo); // 대표지상권 정보
						mainService.InsertQuery("jisangSQL.insertJisangMerge", datas);

						datas.put("JISANG_NO", datas.get("jisang_no")); // 삭제 지상권 번호
						mainService.DeleteQuery("jisangSQL.deleteJisangMerge", datas); // 대상 지상권 정보 삭제처리. !!!주의 진짜로 삭제처리함 !!!

						// 변경이력을 등록한다
						String modify_reason = "지상권 " + datas.get("jisang_no") + "(자산관리번호:" + datas.get("jasan_no") + ")에서 지상권 " + mainJisangMap.get("jisang_no") + "(자산관리번호:" + mainJisangMap.get("jasan_no") + ")" + "로 합필처리";
						HashMap Addparams = new HashMap();
						Addparams.put("GUBUN", "합필");
						Addparams.put("USER_ID", USER_ID);
						Addparams.put("USER_NAME", USER_NAME);
						Addparams.put("CONT", modify_reason);
						log.debug("Addparams=" + Addparams);

						Addparams.put("JISANGNO", mainJisangNo);
						mainService.InsertQuery("jisangSQL.insertJisangModifyHistory", Addparams);
					} else {
						// 모지번 정보에 합필사유, 검토의견 업데이트
						mainJisangMap.put("MERGE_REASON", datas.get("jmt_merge_reason"));
						mainJisangMap.put("MERGE_COMMENT", datas.get("merge_comment"));
						mainService.UpdateQuery("jisangSQL.updateJisangMasterMergeReason", mainJisangMap);
					}
				}

				// 임시저장 내용 삭제
				mainService.DeleteQuery("jisangSQL.deleteJisangMergeTmp", param);

//				Database.getInstance().commitTransaction();
			} catch (Exception e) {
				e.printStackTrace();
				str_result = "N";
			} finally {
//				Database.getInstance().endTransaction();
			}

			map.put("message", str_result);

			JSONObject jo = new JSONObject(map);

			response.setCharacterEncoding("UTF-8");
			response.setHeader("Access-Control-Allow-Origin", "*");
			response.resetBuffer();
			response.setContentType("application/json");
			response.getWriter().print(jo);
			response.getWriter().flush();
		}
	
	// 합병 추가버튼 클릭시 지상정보 조회
	@PostMapping(path="/selectJisangDetail")
		public void selectJisangDetail(HttpServletRequest request, HttpServletResponse response) throws Exception {
		String requestParams = ParameterUtil.getRequestBodyToStr(request);
		JSONObject requestParamsObj=new JSONObject(requestParams);
		log.info("requestParams:"+requestParams);
		
			ArrayList list = new ArrayList();
			ParameterParser parser = new ParameterParser(request);

			String pnu = requestParamsObj.getString("pnu");
			String str_result = "Y";
			try {

				HashMap params = new HashMap();
				params.put("PNU", pnu);
				params.put("MERGE_CHECK", "Y");

				list = (ArrayList) mainService.selectQuery("jisangSQL.selectJisangDetailList", params);

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
	
	@RequestMapping(value = "/deleteJisangAtcFile", method = { RequestMethod.GET, RequestMethod.POST })
    public void deleteJisangAtcFile(HttpServletRequest httpRequest, HttpServletResponse response) throws Exception {

        // 일반웹형식
        // Properties requestParams = CommonUtil.convertToProperties(httpRequest);
        // log.info("requestParams:"+requestParams);

        // //json으로 넘어올때
        String getRequestBody = ParameterUtil.getRequestBodyToStr(httpRequest);
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
            
            mainService.DeleteQuery("jisangSQL.deleteJisangAtcFile", params);

            // 파일 삭제 부분.
            // 파일 경로 생성
            String filePath = GC.getNotsetFileDataDir()+"/"+jsonObject.get("jisang_no");
            
            String originalFilename = jsonObject.get("filename").toString();
            String fileFullPath = filePath + "/" + originalFilename; // 파일 전체 경로
            log.info("path:"+fileFullPath);
            File file = new File(fileFullPath);
            // 파일이 존재하는지 확인
            if (file.exists()) {
                // 파일 삭제
                if (file.delete()) {
                    // 파일 삭제 성공
                } else {
                    // 파일 삭제 실패시 에러
                }
            } else {
                // 파일 없을때 에러
            }

        }

        HashMap<String, Object> resultmap = new HashMap();
        resultmap.put("resultCode", "0000");
        resultmap.put("resultData", idxarr);
        resultmap.put("resultMessage", "success");
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
	
	
//	@PostMapping(path="/selectRowDetailTab_Merge")
//	public void selectRowDetailTab_Merge(HttpServletRequest request, HttpServletResponse response) throws Exception {
//
//		ParameterParser parser = new ParameterParser(request);
//		String JISANG_NO = parser.getString("jisangNo", "");
//
//		Map params = new HashMap();
//		params.put("JISANG_NO", JISANG_NO);
//
//		ArrayList list = (ArrayList) Database.getInstance().queryForList("Json.selectJisangRowDetail_Merge", params);
//
//		HashMap map = new HashMap();
//
//		if (list != null)
//			map.put("count", list.size());
//		else
//			map.put("count", 0);
//
//		map.put("result", list);
//		map.put("key", String.valueOf(request.getSession().getAttribute("loginKey")));
//
//		this.mapToJsonResponse(response, map);
//	}
	
	
	// 지상권 상세 정보 > 사용 승락 정보
//		public void selectRowDetailTab_Permit(HttpServletRequest request, HttpServletResponse response) throws Exception {
//
//			ParameterParser parser = new ParameterParser(request);
//			String JISANG_NO = parser.getString("jisangNo", "");
//
//			Map params = new HashMap();
//			params.put("JISANG_NO", JISANG_NO);
//
//			ArrayList list = (ArrayList) Database.getInstance().queryForList("Json.selectJisangRowDetail_Permit", params);
//
//			HashMap map = new HashMap();
//
//			if (list != null)
//				map.put("count", list.size());
//			else
//				map.put("count", 0);
//
//			map.put("result", list);
//
//			// System.out.println("list1 = " + list1);
//
//			JSONObject jo = new JSONObject(map);
//
//			response.setCharacterEncoding("UTF-8");
//			response.setHeader("Access-Control-Allow-Origin", "*");
//			response.resetBuffer();
//			response.setContentType("application/json");
//			response.getWriter().print(jo);
//			response.getWriter().flush();
//
//		}
	
	
	
	// 지상권 사용승락 상신취소
		@RequestMapping(value = "/updateJisangPmtSangsinCancel", method = { RequestMethod.GET, RequestMethod.POST })
		public void updateJisangPmtSangsinCancel(HttpServletRequest request, HttpServletResponse response) throws Exception {
			ParameterParser parser = new ParameterParser(request);
			String requestParams = ParameterUtil.getRequestBodyToStr(request);
			JSONObject requestParamsObj=new JSONObject(requestParams);
			log.info("requestParams:"+requestParams);
			String PMT_NO = requestParamsObj.getString("pmt_no");
			String str_result = "Y";
			String str_STATUS = "";
			// System.out.println("=========상신취소=======");
			// System.out.println("PMT_NO=" + PMT_NO);

			try {
				HashMap params = new HashMap();
				params.put("PMT_NO", PMT_NO);

				// ArrayList echolist =
				// (ArrayList)Database.getInstance().queryForList("Json.selectGoverDocInfo",params);
				// if(null != echolist && echolist.size() > 0){
				// str_STATUS = String.valueOf(
				// ((HashMap)echolist.get(0)).get("STATUS") );
				// }
				//
				// System.out.println("str_STATUS="+str_STATUS);
				// System.out.println("========================");
				//
				// if(str_STATUS == null || str_STATUS.equals(""))
				mainService.UpdateQuery("jisangSQL.updateJisangPmtDockey", params);

			} catch (Exception e) {
				str_result = "N";
				e.printStackTrace();
			}
			HashMap map = new HashMap();
			map.put("message", str_result);
			map.put("status", str_STATUS);

			JSONObject jo = new JSONObject(map);

			response.setCharacterEncoding("UTF-8");
			response.setHeader("Access-Control-Allow-Origin", "*");
			response.resetBuffer();
			response.setContentType("application/json");
			response.getWriter().print(jo);
			response.getWriter().flush();

		}
		
		
		// 지상권 사용승락 삭제
		@RequestMapping(value = "/updateJisangPmtSangsinDel", method = { RequestMethod.GET, RequestMethod.POST })
		public void updateJisangPmtSangsinDel(HttpServletRequest request, HttpServletResponse response) throws Exception {
			ParameterParser parser = new ParameterParser(request);
			String requestParams = ParameterUtil.getRequestBodyToStr(request);
			JSONObject requestParamsObj=new JSONObject(requestParams);
			log.info("requestParams:"+requestParams);
			String PMT_NO = requestParamsObj.getString("pmt_no");
			
			String str_result = "Y";
			String str_STATUS = "";
			// System.out.println("=========사용승락삭제=======");
			// System.out.println("PMT_NO=" + PMT_NO);

			try {
				HashMap params = new HashMap();
				params.put("PMT_NO", PMT_NO);
				//permit_togi도 지우자
				mainService.DeleteQuery("jisangSQL.deletePermitTogiList", params);
				mainService.DeleteQuery("jisangSQL.deleteJisangPmtDockey", params);

			} catch (Exception e) {
				str_result = "N";
				e.printStackTrace();
			}
			HashMap map = new HashMap();
			map.put("message", str_result);
			map.put("status", str_STATUS);

			JSONObject jo = new JSONObject(map);

			response.setCharacterEncoding("UTF-8");
			response.setHeader("Access-Control-Allow-Origin", "*");
			response.resetBuffer();
			response.setContentType("application/json");
			response.getWriter().print(jo);
			response.getWriter().flush();

		}
		
		//지상권합필 폐쇄된 지번보기
//		@RequestMapping(value = "/getJisangCancelListData", method = { RequestMethod.GET, RequestMethod.POST })
//		public void getJisangCancelListData(HttpServletRequest request, HttpServletResponse response) throws Exception {
//			ParameterParser parser = new ParameterParser(request);
//			String requestParams = ParameterUtil.getRequestBodyToStr(request);
//			JSONObject requestParamsObj=new JSONObject(requestParams);
//			log.info("requestParams:"+requestParams);
//			String idx = requestParamsObj.getString("idx");
//			
//			String str_result = "Y";
//			String str_STATUS = "";
//			 System.out.println("=========폐쇄된지번보기=======");
//			 System.out.println("idx=" + idx);
//
//			try {
//				HashMap params = new HashMap();
//				params.put("idx", idx);
//				mainService.DeleteQuery("jisangSQL.selectJisangCancelData", params);
//
//			} catch (Exception e) {
//				str_result = "N";
//				e.printStackTrace();
//			}
//			HashMap map = new HashMap();
//			map.put("message", str_result);
//			map.put("status", str_STATUS);
//
//			JSONObject jo = new JSONObject(map);
//
//			response.setCharacterEncoding("UTF-8");
//			response.setHeader("Access-Control-Allow-Origin", "*");
//			response.resetBuffer();
//			response.setContentType("application/json");
//			response.getWriter().print(jo);
//			response.getWriter().flush();
//
//		}
		
		//지상권합필 폐쇄된 지번보기
		@RequestMapping(value = "/getJisangCancelListData", method = { RequestMethod.GET, RequestMethod.POST })
		public ModelAndView getJisangCancelListData(HttpServletRequest httpRequest, HttpServletResponse response) throws Exception {
			ModelAndView mav=new ModelAndView();
			
			/*******************************/
            //받은 세션 Map으로 전환
            Map<String, Object> sessionMap = CommonUtil.requestSessionToMap(httpRequest);
            /*******************************/
		
			ArrayList<HashMap>  list=new ArrayList<HashMap>();
			//log.info("httpRequest:"+Arrays.toString(httpRequest));

			ParameterParser parser = new ParameterParser(httpRequest);
			String requestParams = ParameterUtil.getRequestBodyToStr(httpRequest);
			JSONObject requestParamsObj=new JSONObject(requestParams);
			log.info("requestParams:"+requestParams);
			String idx = requestParamsObj.getString("idx");
			
			String str_result = "Y";
			String str_STATUS = "";
			System.out.println("=========폐쇄된지번보기=======");
			System.out.println("idx=" + idx);
			
			try {
				HashMap params = new HashMap();
				params.put("idx", idx);
				params.put("LOGIN_JISA", (String)sessionMap.get("jisa"));    //지사정보 param에 싣기
				
				list = mainService.selectQuery("jisangSQL.selectJisangCancelData", params);

			} catch (Exception e) {
				e.printStackTrace();
			}
			
			log.info("list:"+list);
			
			mav.addObject("list",list);
			mav.setViewName("content/jisang/menu02_4 :: #searchResultsPopup");
			
			return mav;
		}
}
