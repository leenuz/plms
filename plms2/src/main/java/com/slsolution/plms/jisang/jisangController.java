package com.slsolution.plms.jisang;

import java.io.File;
import java.util.*;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.scheduling.annotation.EnableAsync;
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
	
	@RequestMapping(value="/api/Save", method = {RequestMethod.GET, RequestMethod.POST}) //http://localhost:8080/api/get/dbTest
    public void Save(HttpServletRequest httpRequest, HttpServletResponse response) throws Exception {
        
		//일반웹형식
//		Properties requestParams = CommonUtil.convertToProperties(httpRequest);
//        log.info("requestParams:"+requestParams);
        
//        //json으로 넘어올때
        String requestParams = ParameterUtil.getRequestBodyToStr(httpRequest);
        log.info("getRequestBody:"+requestParams);
        
//        List<TestDTO> list = new ArrayList<TestDTO>();
//        list = dbService.getList();
		
        HashMap<String,Object> resultmap=new HashMap();
        resultmap.put("resultCode","0000");
        resultmap.put("resultData",requestParams);
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
			
			String jisa = httpRequest.getParameter("jisa");
			String pnu = httpRequest.getParameter("pnu");
			
			params.put("jisa",jisa);
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

	
}
