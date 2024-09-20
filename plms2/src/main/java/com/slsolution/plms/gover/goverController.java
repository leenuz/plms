package com.slsolution.plms.gover;

import java.io.File;
import java.util.ArrayList;
import java.util.Enumeration;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.Properties;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.scheduling.annotation.EnableAsync;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;

import org.springframework.web.bind.annotation.RequestBody;

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
@RequestMapping("/gover")
@CrossOrigin(origins="*",allowedHeaders="*")
public class goverController {
	
	@Autowired
	private MainService mainService;
	
	@Autowired
	private GlobalConfig GC;
	
	@GetMapping(path="/api/list") //http://localhost:8080/api/get/dbTest
    public void apiList(HttpServletRequest httpRequest, HttpServletResponse response) throws Exception {
        
//        List<TestDTO> list = new ArrayList<TestDTO>();
//        list = dbService.getList();
		HashMap params = new HashMap();
		ArrayList<HashMap>  list=new ArrayList<HashMap>();
		//List<CountryModel> list = masterDataBaseService.getCountry();
		//ArrayList<HashMap> list = sqlSession.selectList("selectAllList",params);
				
		list=mainService.selectQuery("goverSQL.selectAllList", params);
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
				
		list=mainService.selectQuery("goverSQL.selectAllList", params);
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
      			mav.setViewName("content/gover/list");
      			return mav;
    }

	@GetMapping(path="/view/write") //http://localhost:8080/api/get/dbTest
    public ModelAndView viewWrite(HttpServletRequest httpRequest, HttpServletResponse response) throws Exception {
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
      			mav.setViewName("content/gover/write");
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
      			mav.setViewName("content/gover/view");
      			return mav;
    }
	
	
	//occupationDetails
		@GetMapping(path="/occupationDetails") //http://localhost:8080/api/get/dbTest
	    public ModelAndView occupationDetails(HttpServletRequest httpRequest, HttpServletResponse response) throws Exception {
			ModelAndView mav=new ModelAndView();
			
			
//	        List<TestDTO> list = new ArrayList<TestDTO>();
//	        list = dbService.getList();
			HashMap params = new HashMap();
			ArrayList<HashMap>  list=new ArrayList<HashMap>();
			//List<CountryModel> list = masterDataBaseService.getCountry();
			//ArrayList<HashMap> list = sqlSession.selectList("selectAllList",params);
					
//			list=mainService.selectQuery("jisangSQL.selectAllList", params);
//	        log.info("jisang /list:"+list.toString());
	        //nhServ1.test();
	        //ts.Test1();
//	        HashMap<String,Object> resultmap=new HashMap();
//	        resultmap.put("resultCode","0000");
//	        resultmap.put("resultData",list);
//	        resultmap.put("resultMessage","success");
//	        JSONObject obj =new JSONObject(resultmap);
////	        System.out.println(obj);
//	       
//	      //log.info("jo:"+jo);
//	      			response.setCharacterEncoding("UTF-8");
//	      			response.setHeader("Access-Control-Allow-Origin", "*");
//	      			response.setHeader("Cache-Control", "no-cache");
//	      			response.resetBuffer();
//	      			response.setContentType("application/json");
//	      			//response.getOutputStream().write(jo);
//	      			response.getWriter().print(obj);
//	      			response.getWriter().flush();
//	       // return new ModelAndView("dbTest", "list", list);

			String idx = httpRequest.getParameter("idx");
			String index = httpRequest.getParameter("index");
			String gidx = httpRequest.getParameter("gidx");

			params.put("idx",idx);
			params.put("index",index);
//			log.info("params:"+params);
			ArrayList<HashMap> data = mainService.selectQuery("goverSQL.selectAllData",params);
			ArrayList<HashMap> permitList = mainService.selectQuery("goverSQL.selectPermitList",params);
			ArrayList<HashMap> pnuList = mainService.selectQuery("goverSQL.selectPnuList",params);
			ArrayList<HashMap> atcFileList = mainService.selectQuery("goverSQL.selectAtcFileList",params);
			HashMap jijuk = new HashMap<>();
			jijuk.put("x", 0);
			jijuk.put("y", 0);

			HashMap targetParam = new HashMap();
			targetParam.put("idx",Integer.parseInt(gidx));
			ArrayList<HashMap> pnuTargetList = new ArrayList<HashMap>();
			if(!gidx.equals("0")){
				pnuTargetList = mainService.selectQuery("goverSQL.selectPnuTargetList",targetParam);
				params.put("pnu", pnuTargetList.get(0).get("gp_pnu"));

				if (pnuTargetList.size() > 0) {
					HashMap jijukParam = new HashMap<>();
					jijukParam.put("sido_nm", pnuTargetList.get(0).get("gp_sido_nm"));
					jijukParam.put("sgg_nm", pnuTargetList.get(0).get("gp_sgg_nm"));
					jijukParam.put("emd_nm", pnuTargetList.get(0).get("gp_emd_nm"));
					jijukParam.put("ri_nm", pnuTargetList.get(0).get("gp_ri_nm"));
					jijukParam.put("jibun", pnuTargetList.get(0).get("gp_jibun"));
					ArrayList<HashMap> jijukList = mainService.selectQuery("commonSQL.selectJijuk", jijukParam);
					if (jijukList.size() > 0) {
						jijuk = jijukList.get(0);
					}
				}
			}

			// 소속 토지정보 각각의 좌표 가져오기
			for (int i = 0; i < pnuList.size(); i++) {
				HashMap jijukParam = new HashMap<>();
				jijukParam.put("sido_nm", pnuList.get(i).get("gp_sido_nm"));
				jijukParam.put("sgg_nm", pnuList.get(i).get("gp_sgg_nm"));
				jijukParam.put("emd_nm", pnuList.get(i).get("gp_emd_nm"));
				jijukParam.put("ri_nm", pnuList.get(i).get("gp_ri_nm"));
				jijukParam.put("jibun", pnuList.get(i).get("gp_jibun"));
				ArrayList<HashMap> jijukList = mainService.selectQuery("commonSQL.selectJijuk", jijukParam);
				if (jijukList.size() > 0) {
					pnuList.get(i).put("lng", jijukList.get(0).get("x"));
					pnuList.get(i).put("lat", jijukList.get(0).get("y"));
				}
			}


//			ArrayList<HashMap> goverPnuAtcFileList = mainService.selectQuery("goverSQL.selectPnuAtcFileList",params);
			ArrayList<HashMap> goverPnuAtcFileList = mainService.selectQuery("jisangSQL.selectPnuAtcFileList",params);
//			ArrayList<HashMap> jisangPermitList = mainService.selectQuery("goverSQL.selectPermitList",params);
//			ArrayList<HashMap> jisangModifyList = mainService.selectQuery("goverSQL.selectModifyList",params);
//			ArrayList<HashMap> jisangMergeList = mainService.selectQuery("goverSQL.selectMergeList",params);
			params.put("manage_no",idx);
			ArrayList<HashMap> goverMemoList = mainService.selectQuery("commonSQL.selectMemoList",params);

			log.info("params:"+params);
			log.info("data:"+data.get(0));
			log.info("pnu:"+pnuTargetList.get(0).get("gp_pnu"));
//			log.info("jm_pipe_yn:"+data.get(0).get("gm_pipe_yn"));
			log.info("gm_youngdo:"+data.get(0).get("gm_youngdo"));
			log.info("gm_pipe_name:"+data.get(0).get("gm_pipe_name"));
			log.info("permitList:"+permitList);
			log.info("atcFileList:"+atcFileList);
			log.info("goverMemoList:"+goverMemoList);
//			log.info("jm_jijuk_area:"+data.get(0).get("gm_jijuk_area"));
//			log.info("jisangPermitList:"+jisangPermitList);
//
//			log.info("souja count:"+soujaList.size());
//			log.info("soujaList:"+soujaList);
//			log.info("atcFileList:"+atcFileList);

			mav.addObject("resultData",data.get(0));
			mav.addObject("permitList",permitList);
			mav.addObject("pnuList",pnuList);
			mav.addObject("atcFileList",atcFileList);
			mav.addObject("pnuTargetList",pnuTargetList);
			mav.addObject("jijuk", jijuk);

			mav.addObject("goverPnuAtcFileList",goverPnuAtcFileList);
			mav.addObject("memoList",goverMemoList);
//			mav.addObject("atcFileList",atcFileList);
//			mav.addObject("jisangModifyList",jisangModifyList);
//			mav.addObject("jisangMergeList",jisangMergeList);

			mav.setViewName("content/gover/occupationDetails");
			return mav;
	    }
		
		// 지사 선택에 따라 허가관청 목록을 반환하는 API
	    @PostMapping("/getPmtOffice")
	    public ResponseEntity<Map<String, Object>> getPmtOffice(@RequestBody Map<String, String> requestData) throws Exception {
	    	log.info("getPmtOffice 컨트롤러 동작");
	        String selectedJisa = requestData.get("jisa");

	        // 직접 SQL 쿼리를 호출하여 데이터를 가져옴
	        HashMap<String, Object> params = new HashMap<>();
	        params.put("jisa", selectedJisa);

	        // SQL 호출하여 데이터 가져오기
	        ArrayList<HashMap> pmtOfficeList = mainService.selectQuery("goverSQL.selectPmtOfficesByJisa", params);

	        // 결과를 담은 Map 객체 생성
	        Map<String, Object> response = new HashMap<>();
	        response.put("resultData", pmtOfficeList);

	        return new ResponseEntity<>(response, HttpStatus.OK);
	    }

	    // 허가관청 선택에 따라 관리기관 목록을 반환하는 API
	    @PostMapping("/getAdmOffice")
	    public ResponseEntity<Map<String, Object>> getAdmOffice(@RequestBody Map<String, String> requestData) throws Exception{
	        String selectedJisa = requestData.get("jisa");
	        String selectedPmtOffice = requestData.get("pmt_office");

	        // SQL 호출을 위한 파라미터 설정
	        HashMap<String, Object> params = new HashMap<>();
	        params.put("jisa", selectedJisa);
	        params.put("pmt_office", selectedPmtOffice);

	        // SQL 호출하여 데이터 가져오기
	        ArrayList<HashMap> admOfficeList = mainService.selectQuery("goverSQL.selectAdmOfficesByJisaAndPmtOffice", params);

	        // 결과를 담은 Map 객체 생성
	        Map<String, Object> response = new HashMap<>();
	        response.put("resultData", admOfficeList);

	        return new ResponseEntity<>(response, HttpStatus.OK);
	    }
	    

	    // 지사 선택에 따라 관로명 목록을 반환하는 API
	    @PostMapping("/getPipeName")
	    public ResponseEntity<Map<String, Object>> getPipeName(@RequestBody Map<String, String> requestData) throws Exception {
	    	log.info("getPipeName 컨트롤러 동작");
	        String selectedJisa = requestData.get("jisa");

	        // 직접 SQL 쿼리를 호출하여 데이터를 가져옴
	        HashMap<String, Object> params = new HashMap<>();
	        params.put("jisa", selectedJisa);

	        // SQL 호출하여 데이터 가져오기
	        ArrayList<HashMap> pipeNameList = mainService.selectQuery("goverSQL.selectPipeNameByJisa", params);

	        log.info("pipeNameList: "+ pipeNameList);
	        
	        // 결과를 담은 Map 객체 생성
	        Map<String, Object> response = new HashMap<>();
	        response.put("resultData", pipeNameList);

	        return new ResponseEntity<>(response, HttpStatus.OK);
	    }
		
		@GetMapping(path="/menu03_1") //http://localhost:8080/api/get/dbTest
	    public ModelAndView menu03_1(HttpServletRequest httpRequest, HttpServletResponse response) throws Exception {
//			response.setHeader("X-Frame-Options", "SAMEORIGIN");
//			response.setHeader("Content-Security-Policy", " frame-ancestors 'self'");
			HashMap params = new HashMap();
			ArrayList<HashMap>  list=new ArrayList<HashMap>();
			ArrayList<HashMap> jisaList = mainService.selectQuery("commonSQL.selectJisaList",params);
			ArrayList<HashMap> jimoklist = mainService.selectQuery("commonSQL.selectJimokList",params);
			ArrayList<HashMap> sidolist = mainService.selectQuery("commonSQL.getSidoMaster",params);
			ArrayList<HashMap> usePurposlist = mainService.selectQuery("commonSQL.selectUsePurposList",params);
			
			ModelAndView mav=new ModelAndView();
			mav.addObject("jisaList",jisaList);
			mav.addObject("resultJimokList",jimoklist);
			mav.addObject("sidoList",sidolist);
			mav.addObject("usePurposlist",usePurposlist);
			
			mav.setViewName("content/gover/menu03_1");
			return mav;
		}
		
		@GetMapping(path="/menu03_2") //http://localhost:8080/api/get/dbTest
	    public ModelAndView menu03_2(HttpServletRequest httpRequest, HttpServletResponse response) throws Exception {
//			response.setHeader("X-Frame-Options", "SAMEORIGIN");
//			response.setHeader("Content-Security-Policy", " frame-ancestors 'self'");
			HashMap params = new HashMap();
			ArrayList<HashMap>  list=new ArrayList<HashMap>();
			ArrayList<HashMap> jisaList = mainService.selectQuery("commonSQL.selectJisaList",params);
			ArrayList<HashMap> jimoklist = mainService.selectQuery("commonSQL.selectJimokList",params);
			ArrayList<HashMap> sidolist = mainService.selectQuery("commonSQL.getSidoMaster",params);
			ArrayList<HashMap> usePurposlist = mainService.selectQuery("commonSQL.selectUsePurposList",params);
			
			ModelAndView mav=new ModelAndView();
			mav.addObject("jisaList",jisaList);
			mav.addObject("resultJimokList",jimoklist);
			mav.addObject("sidoList",sidolist);
			mav.addObject("usePurposlist",usePurposlist);
			
			mav.setViewName("content/gover/menu03_2");
			
			return mav;
		}
		@GetMapping(path="/menu03_3") //http://localhost:8080/api/get/dbTest
	    public ModelAndView menu03_3(HttpServletRequest httpRequest, HttpServletResponse response) throws Exception {
//			response.setHeader("X-Frame-Options", "SAMEORIGIN");
//			response.setHeader("Content-Security-Policy", " frame-ancestors 'self'");
			HashMap params = new HashMap();
			ArrayList<HashMap>  list=new ArrayList<HashMap>();
			ArrayList<HashMap> jisaList = mainService.selectQuery("commonSQL.selectJisaList",params);
			ArrayList<HashMap> jimoklist = mainService.selectQuery("commonSQL.selectJimokList",params);
			ArrayList<HashMap> sidolist = mainService.selectQuery("commonSQL.getSidoMaster",params);
			ArrayList<HashMap> usePurposlist = mainService.selectQuery("commonSQL.selectUsePurposList",params);
			
			ModelAndView mav=new ModelAndView();
			mav.addObject("jisaList",jisaList);
			mav.addObject("resultJimokList",jimoklist);
			mav.addObject("sidoList",sidolist);
			mav.addObject("usePurposlist",usePurposlist);
			
			mav.setViewName("content/gover/menu03_3");
			
			return mav;
		}

		@GetMapping(path="/orgAdmin") //http://localhost:8080/api/get/dbTest
	    public ModelAndView orgAdmin(HttpServletRequest httpRequest, HttpServletResponse response) throws Exception {
//			response.setHeader("X-Frame-Options", "SAMEORIGIN");
//			response.setHeader("Content-Security-Policy", " frame-ancestors 'self'");
			ModelAndView mav=new ModelAndView();
			mav.setViewName("content/gover/orgAdmin");
			return mav;
		}

		@GetMapping(path="/orgAdminPopupAccept") //http://localhost:8080/api/get/dbTest
	    public ModelAndView orgAdminPopupAccept(HttpServletRequest httpRequest, HttpServletResponse response) throws Exception {
//			response.setHeader("X-Frame-Options", "SAMEORIGIN");
//			response.setHeader("Content-Security-Policy", " frame-ancestors 'self'");
			ModelAndView mav=new ModelAndView();
			mav.setViewName("content/gover/orgAdminPopupAccept");
			return mav;
		}

		@GetMapping(path="/orgAdminPopupMod") //http://localhost:8080/api/get/dbTest
	    public ModelAndView orgAdminPopupMod(HttpServletRequest httpRequest, HttpServletResponse response) throws Exception {
//			response.setHeader("X-Frame-Options", "SAMEORIGIN");
//			response.setHeader("Content-Security-Policy", " frame-ancestors 'self'");
			ModelAndView mav=new ModelAndView();
			mav.setViewName("content/gover/orgAdminPopupMod");
			return mav;
		}

		@GetMapping(path="/orgAdminPopupReg") //http://localhost:8080/api/get/dbTest
	    public ModelAndView orgAdminPopupReg(HttpServletRequest httpRequest, HttpServletResponse response) throws Exception {
//			response.setHeader("X-Frame-Options", "SAMEORIGIN");
//			response.setHeader("Content-Security-Policy", " frame-ancestors 'self'");
			ModelAndView mav=new ModelAndView();
			mav.setViewName("content/gover/orgAdminPopupReg");
			return mav;
		}

		@GetMapping(path="/orgAdminPopupRegCancel") //http://localhost:8080/api/get/dbTest
	    public ModelAndView orgAdminPopupRegCancel(HttpServletRequest httpRequest, HttpServletResponse response) throws Exception {
//			response.setHeader("X-Frame-Options", "SAMEORIGIN");
//			response.setHeader("Content-Security-Policy", " frame-ancestors 'self'");
			ModelAndView mav=new ModelAndView();
			mav.setViewName("content/gover/orgAdminPopupRegCancel");
			return mav;
		}

		@GetMapping(path="/masterReg") //http://localhost:8080/api/get/dbTest
	    public ModelAndView masterReg(HttpServletRequest httpRequest, HttpServletResponse response) throws Exception {
//			response.setHeader("X-Frame-Options", "SAMEORIGIN");
//			response.setHeader("Content-Security-Policy", " frame-ancestors 'self'");
			
			ModelAndView mav = new ModelAndView();
			HashMap params = new HashMap();
			
			ArrayList<HashMap> jisaList = mainService.selectQuery("commonSQL.selectJisaList",params);
			ArrayList<HashMap> jimokList = mainService.selectQuery("commonSQL.selectJimokList",params);
			ArrayList<HashMap> usePurposlist = mainService.selectQuery("commonSQL.selectUsePurposList",params);
			
			log.info("jisaList:"+jisaList);
			log.info("jimokList:"+jimokList);
			
			mav.addObject("jisaList",jisaList);
			mav.addObject("jimokList",jimokList);
			mav.addObject("usePurposlist",usePurposlist);
			
			mav.setViewName("content/gover/masterReg");
			return mav;
		}
		
		
		@RequestMapping(value="/menu03_1DataTableList", method = {RequestMethod.GET, RequestMethod.POST}) //http://localhost:8080/api/get/dbTest
		public ResponseEntity<?> datatableList03_1(HttpServletRequest req, HttpServletResponse res) throws Exception {

			
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
			String gover_no = req.getParameter("gover_no");
			String use_purpos=req.getParameter("use_purpos");
			String pmt_office = req.getParameter("pmt_office");
			String adm_office = req.getParameter("adm_office");
			String save_status=req.getParameter("save_status");
			String idx=req.getParameter("idx");
			String address=req.getParameter("saddr");

			Map map = req.getParameterMap();

			HashMap params = new HashMap();
			params.put("draw",draw);
			params.put("start",start);
			params.put("length",length);
			
			params.put("jisa",jisa);
			params.put("gover_no",gover_no);
			params.put("use_purpos",use_purpos);
			params.put("pmt_office",pmt_office);
			params.put("adm_office",adm_office);
			params.put("save_status",save_status);
			params.put("idx", idx);
			params.put("address", address);

//			String[] right_arr= {};
//			right_arr=right_type.split(",");
//			params.put("right_type", right_arr);

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

			Object count= mainService.selectCountQuery("goverSQL.selectTotalCount", params);
			int total=(int)count;

			ArrayList<HashMap> list = mainService.selectQuery("goverSQL.selectGoverList",params);
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
		
		// masterEdit 상세 조회
		@GetMapping(path="/masterEdit") //http://localhost:8080/api/get/dbTest
	    public ModelAndView masterEdit(HttpServletRequest httpRequest, HttpServletResponse response) throws Exception {
			ModelAndView mav=new ModelAndView();
			
			log.info("점용 마스터 수정 컨트롤러 동작");
			HashMap params = new HashMap();
			ArrayList<HashMap>  list=new ArrayList<HashMap>();
			
			String idx = httpRequest.getParameter("idx");
			String index = httpRequest.getParameter("index");
			
			params.put("idx",idx);
			params.put("gover_no",idx);
			params.put("index",index);
			log.info("params:"+params);

			ArrayList<HashMap> jisaList = mainService.selectQuery("commonSQL.selectJisaList",params);
			ArrayList<HashMap> data = mainService.selectQuery("goverSQL.selectAllData",params);
			ArrayList<HashMap> goverModifyList = mainService.selectQuery("goverSQL.selectModifyList",params);
			ArrayList<HashMap> atcFileList = mainService.selectQuery("goverSQL.selectAtcFileList",params);
			ArrayList<HashMap> goverMemoList = mainService.selectQuery("goverSQL.selectMemoList",params);
			ArrayList<HashMap> jimokList = mainService.selectQuery("commonSQL.selectJimokList",params);
			ArrayList<HashMap> goverPnuList = mainService.selectQuery("goverSQL.selectPnuList",params);
			ArrayList<HashMap> usePurposlist = mainService.selectQuery("commonSQL.selectUsePurposList",params);
			
		    // goverPnuList 크기 구하기
		    int goverPnuListSize = goverPnuList.size();
			
			log.info("data:"+data.get(0));
			log.info("jisaList:"+jisaList);
			log.info("goverModifyList:"+goverModifyList);
			log.info("atcFileList:"+atcFileList);
			log.info("goverMemoList:"+goverMemoList);
			log.info("jimokList:"+jimokList);
			log.info("goverPnuList:"+goverPnuList);
			log.info("goverPnuListSize:" + goverPnuListSize);
			log.info("usePurposlist:" + usePurposlist);
//			log.info("jm_pipe_yn:"+data.get(0).get("jm_pipe_yn"));

			mav.addObject("resultData",data.get(0));
			mav.addObject("jisaList",jisaList);
	  		mav.addObject("goverModifyList",goverModifyList);
	  		mav.addObject("atcFileList",atcFileList);
	  		mav.addObject("memoList",goverMemoList);
	  		mav.addObject("jimokList",jimokList);
	  		mav.addObject("pnuList",goverPnuList);
	  		mav.addObject("pnuListSize", goverPnuListSize);
	  		mav.addObject("usePurposlist",usePurposlist);
  			
  			mav.setViewName("content/gover/masterEdit");
  			return mav;
	    }
		
		// 소속 토지 정보를 제공하는 API
		@GetMapping("/getGoverPnuList")
		public ResponseEntity<?> getGoverPnuList(HttpServletRequest request, HttpServletResponse response) throws Exception {
		        // 요청된 idx에 맞는 소속 토지 정보를 조회
		        String idx = request.getParameter("idx");

		        log.info("-----------getGoverPnuList 동작-------------");
		        if (idx == null || idx.isEmpty()) {
		            return ResponseEntity.badRequest().body("idx 없음");
		        }

		        HashMap<String, Object> params = new HashMap<>();
		        params.put("idx", idx);

		        // 소속 토지 정보 조회 (SQL 매퍼 또는 서비스 호출)
		        ArrayList<HashMap> goverPnuList = mainService.selectQuery("goverSQL.selectPnuList", params);

		        log.info("goverPnuList: " + goverPnuList);
		        // 조회 결과가 없을 경우 빈 리스트 반환
		        if (goverPnuList == null || goverPnuList.isEmpty()) {
		            return ResponseEntity.noContent().build();
		        }

		        // 결과를 JSON으로 반환
		        HashMap<String, Object> resultMap = new HashMap<>();
		        resultMap.put("data", goverPnuList);

		        // 성공적으로 조회된 데이터를 JSON으로 반환
		        JSONObject jsonResponse = new JSONObject(resultMap);
		        return ResponseEntity.ok(jsonResponse.toString());
		}

		
		@RequestMapping(value="/menu03_2DataTableList", method = {RequestMethod.GET, RequestMethod.POST}) //http://localhost:8080/api/get/dbTest
		public ResponseEntity<?> datatableList03_2(HttpServletRequest req, HttpServletResponse res) throws Exception {
			
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
			String gover_no = req.getParameter("gover_no");
			String use_purpos = req.getParameter("use_purpos");
			String pmt_office = req.getParameter("pmt_office");
			String adm_office = req.getParameter("adm_office");
			String pay_date_start=req.getParameter("pay_date_start");
			String pay_date_end = req.getParameter("pay_date_end");
			String address = req.getParameter("saddr");
			String idx = req.getParameter("idx");

			Map map = req.getParameterMap();

			HashMap params = new HashMap();
			params.put("draw",draw);
			params.put("start",start);
			params.put("length",length);
			
			params.put("jisa",jisa);
			params.put("gover_no",gover_no);
			params.put("use_purpos",use_purpos);
			params.put("pmt_office",pmt_office);
			params.put("adm_office",adm_office);
			params.put("pay_date_start",pay_date_start);
			params.put("pay_date_end",pay_date_end);
			params.put("address", address);
			params.put("idx", idx);

//			String[] right_arr= {};
//			right_arr=right_type.split(",");
//			params.put("right_type", right_arr);

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

			Object count= mainService.selectCountQuery("goverSQL.selectTotalCount03_2", params);
			int total=(int)count;

			ArrayList<HashMap> list = mainService.selectQuery("goverSQL.selectGoverList03_2",params);
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

		//feeDetail  상세 조회
		@GetMapping(path="/feeDetail") //http://localhost:8080/api/get/dbTest
	    public ModelAndView feeDetail(HttpServletRequest httpRequest, HttpServletResponse response) throws Exception {
			log.info("점용 feeDetail 컨트롤러 동작");
			
			ModelAndView mav=new ModelAndView();
			
			String idx = httpRequest.getParameter("idx");
			String index = httpRequest.getParameter("index");
			
		    HashMap<String, String> params = new HashMap<>();
		    params.put("idx", idx);
		    params.put("gover_no", idx);
		    params.put("index", index);
		    log.info("params:" + params);

		    // 데이터 조회
			ArrayList<HashMap> data = mainService.selectQuery("goverSQL.selectAllData",params);
			ArrayList<HashMap> goverModifyList = mainService.selectQuery("goverSQL.selectModifyList",params);
			ArrayList<HashMap> atcFileList = mainService.selectQuery("goverSQL.selectAtcFileList",params);
			ArrayList<HashMap> goverPnuList = mainService.selectQuery("goverSQL.selectPnuList",params);
			ArrayList<HashMap> goverPermitList = mainService.selectQuery("goverSQL.selectPermitList",params);

			// 조회 데이터 로그
			log.info("data:"+data.get(0));
			log.info("goverModifyList:"+goverModifyList);
			log.info("atcFileList:"+atcFileList);
			log.info("goverPnuList:"+goverPnuList);
			log.info("goverPermitList:"+goverPermitList);

			// 각 리스트가 null 또는 비어있는 경우 처리
			if (data == null || data.isEmpty()) {
		        log.error("No data found for idx: " + idx);
		        mav.addObject("resultData", new HashMap<>());
		    } else {
		        mav.addObject("resultData", data.get(0));
		    }
		    
		    // 각 리스트가 null 또는 비어있는 경우 처리
		    if (goverModifyList == null || goverModifyList.isEmpty()) {
		        mav.addObject("goverModifyList", new ArrayList<>());
		    } else {
		        mav.addObject("goverModifyList", goverModifyList);
		    }
		    
		    if (atcFileList == null || atcFileList.isEmpty()) {
		        mav.addObject("atcFileList", new ArrayList<>());
		    } else {
		        mav.addObject("atcFileList", atcFileList);
		    }
		    
		    if (goverPnuList == null || goverPnuList.isEmpty()) {
		        mav.addObject("goverPnuList", new HashMap<>());
		    } else {
		        mav.addObject("goverPnuList", goverPnuList.get(0));
		    }
		    
		    if (goverPermitList == null || goverPermitList.isEmpty()) {
		        mav.addObject("goverPermitList", new HashMap<>());
		        mav.addObject("goverPermitListAll", new ArrayList<>());
		    } else {
		        mav.addObject("goverPermitList", goverPermitList.get(0));
		        mav.addObject("goverPermitListAll", goverPermitList);
		    }
		    
  			mav.setViewName("content/gover/feeDetail");
  			return mav;
	    }
		
		@RequestMapping(value="/menu03_3DataTableList", method = {RequestMethod.GET, RequestMethod.POST}) //http://localhost:8080/api/get/dbTest
		public ResponseEntity<?> datatableList03_3(HttpServletRequest req, HttpServletResponse res) throws Exception {
			
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
			String gover_no = req.getParameter("gover_no");
			String use_purpos = req.getParameter("use_purpos");
			String pmt_office = req.getParameter("pmt_office");
			String adm_office = req.getParameter("adm_office");
			String cancel_yn = req.getParameter("cancel_yn");
			String pay_date_start = req.getParameter("pay_date_start");
			String pay_date_end = req.getParameter("pay_date_end");
			String address = req.getParameter("saddr");
			String idx = req.getParameter("idx");

			Map map = req.getParameterMap();

			HashMap params = new HashMap();
			params.put("draw",draw);
			params.put("start",start);
			params.put("length",length);
			
			params.put("jisa",jisa);
			params.put("gover_no",gover_no);
			params.put("use_purpos",use_purpos);
			params.put("pmt_office",pmt_office);
			params.put("adm_office",adm_office);
			params.put("cancel_yn",cancel_yn);
			params.put("pay_date_start",pay_date_start);
			params.put("pay_date_end",pay_date_end);
			params.put("address", address);
			params.put("idx", idx);

//			String[] right_arr= {};
//			right_arr=right_type.split(",");
//			params.put("right_type", right_arr);

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

			Object count= mainService.selectCountQuery("goverSQL.selectTotalCount03_3", params);
			int total=(int)count;

			ArrayList<HashMap> list = mainService.selectQuery("goverSQL.selectGoverList03_3",params);
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

		//feeDetail  상세 조회
		@GetMapping(path="/useDetail") //http://localhost:8080/api/get/dbTest
	    public ModelAndView useDetail(HttpServletRequest httpRequest, HttpServletResponse response) throws Exception {
//					response.setHeader("X-Frame-Options", "SAMEORIGIN");
//					response.setHeader("Content-Security-Policy", " frame-ancestors 'self'");
			ModelAndView mav=new ModelAndView();
			
			log.info("useDetail 컨트롤러 동작");
//			        List<TestDTO> list = new ArrayList<TestDTO>();
//			        list = dbService.getList();
			HashMap params = new HashMap();
			ArrayList<HashMap>  list=new ArrayList<HashMap>();
			
			String idx = httpRequest.getParameter("idx");
			String index = httpRequest.getParameter("index");
			
			params.put("idx",idx);
			params.put("gover_no",idx);
			params.put("index",index);
			log.info("params:"+params);

			// 점용 마스터 조회
			ArrayList<HashMap> data = mainService.selectQuery("goverSQL.selectAllData",params);
			ArrayList<HashMap> goverModifyList = mainService.selectQuery("goverSQL.selectModifyList",params);
			ArrayList<HashMap> atcFileList = mainService.selectQuery("goverSQL.selectAtcFileList",params);
			
////					ArrayList<HashMap> soujaList = mainService.selectQuery("goverSQL.selectSoyujaData",params);
////					ArrayList<HashMap> jisangPermitList = mainService.selectQuery("goverSQL.selectPermitList",params);
////					ArrayList<HashMap> jisangMergeList = mainService.selectQuery("goverSQL.selectMergeList",params);
////					params.put("pnu", data.get(0).get("jm_pnu"));
////					ArrayList<HashMap> jisangIssueList = mainService.selectQuery("goverSQL.selectIssueList",params);
////					log.info("jisangIssueList size:"+jisangIssueList.size());
////					
////					if (jisangIssueList.size()>0) {
////						log.info("1:"+jisangIssueList.get(0).get("pi_code_depth1"));
////						log.info("2:"+jisangIssueList.get(0).get("pi_code_depth2"));
////						log.info("3:"+jisangIssueList.get(0).get("pi_code_depth3"));
////						params.put("issueManualCode1", jisangIssueList.get(0).get("pi_code_depth1"));
////						params.put("issueManualCode2", jisangIssueList.get(0).get("pi_code_depth2"));
////						params.put("issueManualCode3", jisangIssueList.get(0).get("pi_code_depth3"));
////					}
////					
////					ArrayList<HashMap> jisangPnuAtcFileList = mainService.selectQuery("goverSQL.selectPnuAtcFileList",params);
////					ArrayList<HashMap> jisangIssueHistoryList = mainService.selectQuery("goverSQL.selectIssueHistoryList",params);
////					ArrayList<HashMap> jisangIssueCodeAtcFileList = mainService.selectQuery("goverSQL.selectIssueCodeAtcFileList",params);
////					ArrayList<HashMap> jisangMemoList = mainService.selectQuery("commonSQL.selectMemoList",params);
////					log.info("params:"+params);
////					log.info("data:"+data.get(0));
////					log.info("jm_pipe_yn:"+data.get(0).get("jm_pipe_yn"));
////					log.info("jm_youngdo:"+data.get(0).get("jm_youngdo"));
////					log.info("jm_pipe_name:"+data.get(0).get("jm_pipe_name"));
////					log.info("jm_jijuk_area:"+data.get(0).get("jm_jijuk_area"));
////					log.info("jisangPermitList:"+jisangPermitList);
////					log.info("jisangIssueList:"+jisangIssueList);
////					log.info("souja count:"+soujaList.size());
////					log.info("soujaList:"+soujaList);
////					log.info("atcFileList:"+atcFileList);
////					log.info("jisangPnuAtcFileList:"+jisangPnuAtcFileList);
////					log.info("jisangIssueHistoryList:"+jisangIssueHistoryList);
////					log.info("jisangMemoList:"+jisangMemoList);
////					log.info("jisangIssueCodeAtcFileList:"+jisangIssueCodeAtcFileList);

			mav.addObject("resultData",data.get(0));
	  		mav.addObject("goverModifyList",goverModifyList);
	  		mav.addObject("atcFileList",atcFileList);
	  		
//		  		mav.addObject("soujaList",soujaList);
//		  		mav.addObject("jisangPermitList",jisangPermitList);
//		  		mav.addObject("jisangMergeList",jisangMergeList);
//		  		mav.addObject("jisangPnuAtcFileList",jisangPnuAtcFileList);
//		  		mav.addObject("jisangIssueList",jisangIssueList);
//		  		mav.addObject("jisangIssueHistoryList",jisangIssueHistoryList);
//		  		mav.addObject("memoList",jisangMemoList);
//		  		mav.addObject("jisangIssueCodeAtcFileList",jisangIssueCodeAtcFileList);
  			
  			mav.setViewName("content/gover/useDetail");
  			return mav;
	    }
		
		//feeDetail  상세 조회
		@GetMapping(path="/occupancyEndReg") //http://localhost:8080/api/get/dbTest
	    public ModelAndView occupancyEndReg(HttpServletRequest httpRequest, HttpServletResponse response) throws Exception {
//							response.setHeader("X-Frame-Options", "SAMEORIGIN");
//							response.setHeader("Content-Security-Policy", " frame-ancestors 'self'");
			ModelAndView mav=new ModelAndView();
			
			log.info("useDetail 컨트롤러 동작");
//					        List<TestDTO> list = new ArrayList<TestDTO>();
//					        list = dbService.getList();
			HashMap params = new HashMap();
			ArrayList<HashMap>  list=new ArrayList<HashMap>();
			
			String idx = httpRequest.getParameter("idx");
			String index = httpRequest.getParameter("index");
			
			params.put("idx",idx);
			params.put("gover_no",idx);
			params.put("index",index);
			log.info("params:"+params);

			// 점용 마스터 조회
			ArrayList<HashMap> data = mainService.selectQuery("goverSQL.selectAllData",params);
			ArrayList<HashMap> goverModifyList = mainService.selectQuery("goverSQL.selectModifyList",params);
			ArrayList<HashMap> atcFileList = mainService.selectQuery("goverSQL.selectAtcFileList",params);
			
////							ArrayList<HashMap> soujaList = mainService.selectQuery("goverSQL.selectSoyujaData",params);
////							ArrayList<HashMap> jisangPermitList = mainService.selectQuery("goverSQL.selectPermitList",params);
////							ArrayList<HashMap> jisangMergeList = mainService.selectQuery("goverSQL.selectMergeList",params);
////							params.put("pnu", data.get(0).get("jm_pnu"));
////							ArrayList<HashMap> jisangIssueList = mainService.selectQuery("goverSQL.selectIssueList",params);
////							log.info("jisangIssueList size:"+jisangIssueList.size());
////							
////							if (jisangIssueList.size()>0) {
////								log.info("1:"+jisangIssueList.get(0).get("pi_code_depth1"));
////								log.info("2:"+jisangIssueList.get(0).get("pi_code_depth2"));
////								log.info("3:"+jisangIssueList.get(0).get("pi_code_depth3"));
////								params.put("issueManualCode1", jisangIssueList.get(0).get("pi_code_depth1"));
////								params.put("issueManualCode2", jisangIssueList.get(0).get("pi_code_depth2"));
////								params.put("issueManualCode3", jisangIssueList.get(0).get("pi_code_depth3"));
////							}
////							
////							ArrayList<HashMap> jisangPnuAtcFileList = mainService.selectQuery("goverSQL.selectPnuAtcFileList",params);
////							ArrayList<HashMap> jisangIssueHistoryList = mainService.selectQuery("goverSQL.selectIssueHistoryList",params);
////							ArrayList<HashMap> jisangIssueCodeAtcFileList = mainService.selectQuery("goverSQL.selectIssueCodeAtcFileList",params);
////							ArrayList<HashMap> jisangMemoList = mainService.selectQuery("commonSQL.selectMemoList",params);
////							log.info("params:"+params);
////							log.info("data:"+data.get(0));
////							log.info("jm_pipe_yn:"+data.get(0).get("jm_pipe_yn"));
////							log.info("jm_youngdo:"+data.get(0).get("jm_youngdo"));
////							log.info("jm_pipe_name:"+data.get(0).get("jm_pipe_name"));
////							log.info("jm_jijuk_area:"+data.get(0).get("jm_jijuk_area"));
////							log.info("jisangPermitList:"+jisangPermitList);
////							log.info("jisangIssueList:"+jisangIssueList);
////							log.info("souja count:"+soujaList.size());
////							log.info("soujaList:"+soujaList);
////							log.info("atcFileList:"+atcFileList);
////							log.info("jisangPnuAtcFileList:"+jisangPnuAtcFileList);
////							log.info("jisangIssueHistoryList:"+jisangIssueHistoryList);
////							log.info("jisangMemoList:"+jisangMemoList);
////							log.info("jisangIssueCodeAtcFileList:"+jisangIssueCodeAtcFileList);

			mav.addObject("resultData",data.get(0));
	  		mav.addObject("goverModifyList",goverModifyList);
	  		mav.addObject("atcFileList",atcFileList);
	  		
//				  		mav.addObject("soujaList",soujaList);
//				  		mav.addObject("jisangPermitList",jisangPermitList);
//				  		mav.addObject("jisangMergeList",jisangMergeList);
//				  		mav.addObject("jisangPnuAtcFileList",jisangPnuAtcFileList);
//				  		mav.addObject("jisangIssueList",jisangIssueList);
//				  		mav.addObject("jisangIssueHistoryList",jisangIssueHistoryList);
//				  		mav.addObject("memoList",jisangMemoList);
//				  		mav.addObject("jisangIssueCodeAtcFileList",jisangIssueCodeAtcFileList);
  			
  			mav.setViewName("content/gover/occupancyEndReg");
  			return mav;
	    }
		
		
		@RequestMapping(value = "/fileUpload/post") //ajax에서 호출하는 부분
	    @ResponseBody
	    public HashMap upload(MultipartHttpServletRequest multipartRequest) { //Multipart로 받는다.
	         
	        Iterator<String> itr =  multipartRequest.getFileNames();
	        
	        String filePath = GC.getGoverFileTempDir(); //설정파일로 뺀다.
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
		
		
		@PostMapping(path="/selectGoverList") //http://localhost:8080/api/get/dbTest
	    public void selectGoverList(HttpServletRequest httpRequest, HttpServletResponse response) throws Exception {
			String requestParams = ParameterUtil.getRequestBodyToStr(httpRequest);
			JSONObject requestParamsObj=new JSONObject(requestParams);
			log.info("requestParams:"+requestParams);
			String goverNo =requestParamsObj.getString("GOVERNO");
			log.info("goverNo:"+goverNo);
			
			HashMap params=new HashMap();
			params.put("gover_no",goverNo);
					//parser.getString("goverNo", "");
			ArrayList<HashMap<String, Object>> goverList = new ArrayList<HashMap<String, Object>>();
			goverList = (ArrayList)mainService.selectQuery("goverSQL.selectGoverList", params); //기본정보
			
			 HashMap jo=new HashMap();
		        jo.put("data",goverList);
		        
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
		@PostMapping(path="/selectGoverPnuList") //http://localhost:8080/api/get/dbTest
	    public void selectGoverPnuList(HttpServletRequest httpRequest, HttpServletResponse response) throws Exception {
			String requestParams = ParameterUtil.getRequestBodyToStr(httpRequest);
			JSONObject requestParamsObj=new JSONObject(requestParams);
			log.info("requestParams:"+requestParams);
			String goverNo =requestParamsObj.getString("GOVERNO");
			log.info("goverNo:"+goverNo);
			
			HashMap params=new HashMap();
			params.put("gover_no",goverNo);
					//parser.getString("goverNo", "");
			ArrayList<HashMap<String, Object>> goverList = new ArrayList<HashMap<String, Object>>();
			goverList = (ArrayList)mainService.selectQuery("goverSQL.selectGoverPnuList", params); //기본정보
			
			 HashMap jo=new HashMap();
		        jo.put("data",goverList);
		        
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
		
		// 점용료 납부 / 전자결제 상신시
		@Transactional
		@PostMapping(path="/insertGoverPaySangsin")
		public void insertGoverPaySangsin(HttpServletRequest request, HttpServletResponse response) throws Exception {
			String requestParams = ParameterUtil.getRequestBodyToStr(request);
			
			JSONObject requestParamsObj=new JSONObject(requestParams);
			log.info("requestParams:"+requestParams);
			ArrayList list = new ArrayList();
			
			String PAGETYPE = requestParamsObj.getString("PAGETYPE"); // 수정화면에서 상신을 눌렀는지
			String GOVER_NO = requestParamsObj.getString("GOVER_NO"); // 관리번호
			String JISA = requestParamsObj.getString("JISA");
			String PMT_OFFICE = requestParamsObj.getString("PMT_OFFICE");
			String ADM_OFFICE = requestParamsObj.getString("ADM_OFFICE");
			String OFFICE_DEPART = requestParamsObj.getString("OFFICE_DEPART");
			String OFFICE_CHARGE = requestParamsObj.getString("OFFICE_CHARGE");
			String OFFICE_CONTACT = requestParamsObj.getString("OFFICE_CONTACT");
			String OFFICE_MOBILE = requestParamsObj.getString("OFFICE_MOBILE");
			String PMT_NO = requestParamsObj.getString("PMT_NO");
			String PAY_DATE = requestParamsObj.getString("PAY_DATE");
			String PAY_MONEY = requestParamsObj.getString("PAY_MONEY");
			String PAY_VAT = requestParamsObj.getString("PAY_VAT");
			String PMT_ST_DATE = requestParamsObj.getString("PMT_ST_DATE");
			String PMT_ED_DATE = requestParamsObj.getString("PMT_ED_DATE");
			String PAY_WAY = requestParamsObj.getString("PAY_WAY");
			String USE_PURPOS = requestParamsObj.getString("USE_PURPOS")==null?"":requestParamsObj.getString("USE_PURPOS");
			String PMT_GOVER_LENGTH = requestParamsObj.getString("PMT_GOVER_LENGTH");
			String PMT_GOVER_AREA = requestParamsObj.getString("PMT_GOVER_AREA");
			//String PNU_CNT = requestParamsObj.getString("pnuCnt", "0"); // 소속토지 수
			
			String USER_ID = String.valueOf(request.getSession().getAttribute("userId"));
			String USER_NAME = String.valueOf(request.getSession().getAttribute("userName"));
			
			String str_GUBUN = "";
			String str_GOVERNO = GOVER_NO;
			
			String str_result = "Y";
//			
			// 확인
//			String GOVER_NO = parser.getString("GOVER_NO", ""); // 관리번호
//			String JISA = parser.getString("JISA", "");
//			String PMT_OFFICE = parser.getString("PMT_OFFICE", "");
//			String ADM_OFFICE = parser.getString("ADM_OFFICE", "");
//			String OFFICE_DEPART = parser.getString("OFFICE_DEPART", "");
//			String OFFICE_CHARGE = parser.getString("OFFICE_CHARGE", "");
//			String OFFICE_CONTACT = parser.getString("OFFICE_CONTACT", "");
//			String OFFICE_MOBILE = parser.getString("OFFICE_MOBILE", "");
//			String PMT_NO = parser.getString("PMT_NO", "");
//			String PAY_DATE = parser.getString("PAY_DATE", "");
//			String PAY_MONEY = parser.getString("PAY_MONEY", "");
//			String PAY_VAT = parser.getString("PAY_VAT", "");
//			String PMT_ST_DATE = parser.getString("PMT_ST_DATE", "");
//			String PMT_ED_DATE = parser.getString("PMT_ED_DATE", "");
//			String PAY_WAY = parser.getString("PAY_WAY", "");
//			String USE_PURPOS = parser.getString("USE_PURPOS", "");
//			String PMT_GOVER_LENGTH = parser.getString("PMT_GOVER_LENGTH", "");
//			String PMT_GOVER_AREA = parser.getString("PMT_GOVER_AREA", "");
//			String PNU_CNT = parser.getString("pnuCnt", "0"); // 소속토지 수
//			
//			String USER_ID = String.valueOf(request.getSession().getAttribute("userId"));
//			String USER_NAME = String.valueOf(request.getSession().getAttribute("userName"));
//			
//			String str_GUBUN = "";
//			String str_GOVERNO = GOVER_NO;
//			
//			String str_result = "Y";
//			
			
			HashMap map = new HashMap();
			
			try {
				HashMap params = new HashMap();
				params.put("GOVER_NO", GOVER_NO);
				params.put("JISA", JISA);
				params.put("PMT_OFFICE", PMT_OFFICE);
				params.put("ADM_OFFICE", ADM_OFFICE);
				params.put("OFFICE_DEPART", OFFICE_DEPART);
				params.put("OFFICE_CHARGE", OFFICE_CHARGE);
				params.put("OFFICE_CONTACT", OFFICE_CONTACT);
				params.put("OFFICE_MOBILE", OFFICE_MOBILE);
				params.put("PMT_NO", PMT_NO==null?"":PMT_NO);
				params.put("PAY_DATE", PAY_DATE==null?"":PAY_DATE);
				params.put("PAY_MONEY", PAY_MONEY);
				params.put("PAY_VAT", PAY_VAT);
				params.put("PMT_ST_DATE", PMT_ST_DATE==null?"":PMT_ST_DATE);
				params.put("PMT_ED_DATE", PMT_ED_DATE==null?"":PMT_ED_DATE);
				params.put("PAY_WAY", PAY_WAY);
				params.put("PMT_NAME", (USE_PURPOS==null)?"":USE_PURPOS);
				params.put("PMT_GOVER_LENGTH", (PMT_GOVER_LENGTH==null)?null:PMT_GOVER_LENGTH);
				params.put("PMT_GOVER_AREA", PMT_GOVER_AREA==null?null:PMT_GOVER_AREA);

				params.put("USER_ID", USER_ID);
				params.put("USER_NAME", USER_NAME);

				/**********************
				 * 다음 지상권 번호 조회 시작
				 **********************/
				int nNextSeq = 0;
//				nNextSeq = (Integer) Database.getInstance().queryForObject("Json.selectNextGoverNo", params);
				nNextSeq = (Integer) mainService.selectCountQuery("goverSQL.selectNextGoverNo", params);
				params.put("NEXTSEQ", nNextSeq);

				System.out.println("납부정보 params = " + params);
				mainService.InsertQuery("goverSQL.insertGoverPmt", params);
//				Database.getInstance().insert("Json.insertGoverPmt", params); // 납부정보 신규등록
				// 납부관련 전자결재 상신 시점의 소속 토지정보를 로그테이블에 저장한다. >> 해당 내용은 납부실적 토지목록 보기
				// 목록에서 확인할 수 있다.
				// 소속 토지정보 검색
				ArrayList pnuList = mainService.selectQuery("goverSQL.selectGoverPnuList", params);
				if (!pnuList.isEmpty()) {
					HashMap logParams = new HashMap(); // 맵 객체 선언

					for (int i = 0; i < pnuList.size(); i++) {
						logParams = new HashMap(); // 맵 객체 초기화

						logParams.put("GOVER_NO", GOVER_NO);
						logParams.put("PMT_SEQ", nNextSeq);

						// 소속 토지정보 로깅용 seq 조회(생성)
						//String logSeq = (String) Database.getInstance().queryForObject("Json.selectGoverPnuLogSeq", logParams);
						ArrayList logSeqList=(ArrayList) mainService.selectQuery("goverSQL.selectGoverPnuLogSeq", logParams);
						log.info("logSeqList:"+logSeqList.get(0));
						
//						String logSeq = (ArrayList) mainService.selectQuery("Json.selectGoverPnuLogSeq", logParams);
//						logLisg.info
						String logSeq=logSeqList.get(0).toString();
						System.out.println("logSeq = " + logSeq);
						logParams.put("LOG_SEQ", logSeq);
						logParams.put("PNU", ((HashMap) pnuList.get(i)).get("PNU"));
						logParams.put("ADDRCODE", ((HashMap) pnuList.get(i)).get("PNU"));
						logParams.put("ECHO_NO", ((HashMap) pnuList.get(i)).get("ECHO_NO"));
						logParams.put("SIDO_NM", ((HashMap) pnuList.get(i)).get("SIDO_NM"));
						logParams.put("SGG_NM", ((HashMap) pnuList.get(i)).get("SGG_NM"));
						logParams.put("EMD_NM", ((HashMap) pnuList.get(i)).get("EMD_NM"));
						logParams.put("RI_NM", ((HashMap) pnuList.get(i)).get("RI_NM"));
						logParams.put("JIBUN", ((HashMap) pnuList.get(i)).get("JIBUN"));
						logParams.put("JIBUN_FULL", ((HashMap) pnuList.get(i)).get("JIBUN_FULL"));
						logParams.put("JIJUK_AREA", ((HashMap) pnuList.get(i)).get("JIJUK_AREA"));
						logParams.put("JIMOK_TEXT", ((HashMap) pnuList.get(i)).get("JIMOK_TEXT"));
						logParams.put("DOSIPLAN", ((HashMap) pnuList.get(i)).get("DOSIPLAN"));
						logParams.put("GOVER_OWN_YN", ((HashMap) pnuList.get(i)).get("GOVER_OWN_YN"));
						logParams.put("GOVER_LENGTH", ((HashMap) pnuList.get(i)).get("GOVER_LENGTH"));
						logParams.put("GOVER_AREA", ((HashMap) pnuList.get(i)).get("GOVER_AREA"));
						logParams.put("ADM_OFFICE", ((HashMap) pnuList.get(i)).get("ADM_OFFICE"));
						logParams.put("USE_PURPOS", ((HashMap) pnuList.get(i)).get("USE_PURPOS"));
//
//						// 소속 토지정보 저장처리
						System.out.println("소속 토지정보 params = " + logParams);
//						Database.getInstance().insert("Json.insertGoverPnuLog", logParams);
						mainService.InsertQuery("goverSQL.insertGoverPnuLog", logParams);
					}
				}
				
				if ("update".equals(PAGETYPE)) {
					ApprovalHtmlUtil eph=new ApprovalHtmlUtil();
					ApprovalUtil epc= new ApprovalUtil();
					
					CommonUtil cu = new CommonUtil();

					String str_appNo = cu.getNextAppovalSeq();
					boolean res_Echo = false;

					if ("".equals(str_appNo)) {
						map.put("message", "N");
					} else {
//						String str_UserId = String.valueOf(request.getSession().getAttribute("userId"));
//						String str_userName = String.valueOf(request.getSession().getAttribute("userName"));
//						String str_userDeptcd = String.valueOf(request.getSession().getAttribute("userDeptcd"));
//						String str_userDeptnm = String.valueOf(request.getSession().getAttribute("userDeptnm"));
//						String str_userUPDeptcd = String.valueOf(request.getSession().getAttribute("userUPDeptcd"));
						String str_UserId = "105681";
						String str_userName = "박영환";
						String str_userDeptcd = "D250500";
						String str_userDeptnm = "IT전략.지원팀";
						String str_userUPDeptcd = "S250100";
						res_Echo = epc.GetPLMSDataforXML(str_appNo, eph.getGover_pay_HTML("", str_GOVERNO, "", "", "", request, response), str_UserId, "", "", "GetHoldUsageDataforXML", str_userName, str_userDeptcd, str_userDeptnm, str_userUPDeptcd);
					}
					if (res_Echo) {

						// 문서번호 업데이트
						map.put("DOCKEY", str_appNo);
						map.put("message", "Y");
						map.put("GOVER_NO", str_GOVERNO);
						map.put("SEQ", nNextSeq);
//						Database.getInstance().update("Json.updateGoverEchoNo", map);
						mainService.InsertQuery("goverSQL.updateGoverEchoNo", map);

						System.out.println("%%%%%%%%%%%%map=" + map);
						// 문서 URL조회
						//ArrayList echolist = (ArrayList) Database.getInstance().queryForList("Json.selectGoverDocInfo", map);
						ArrayList echolist = (ArrayList) mainService.selectQuery("goverSQL.selectGoverDocInfo", map);
						if (null != echolist && echolist.size() > 0) {
							String str_EchoNo = String.valueOf(((HashMap) echolist.get(0)).get("OUT_URL"));
							System.out.println("str_EchoNo=====" + str_EchoNo);
							map.put("OUT_URL", str_EchoNo);
						}

					} else {
						map.put("message", "N");
					}
				}

				if (list != null)
					map.put("count", list.size());
				else
					map.put("count", 0);
			}catch (Exception e) {
				str_result = "N";
				e.printStackTrace();
			}

			
			// 상신처리

			map.put("message", str_result);
			map.put("GOVERNO", str_GOVERNO);
			map.put("result", list);
			
			 HashMap jo=new HashMap();
		        jo.put("data","");
		        
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
		}
		
		
		
		// 점용 해지 등록
		@Transactional
		@PostMapping(path="/insertGoverTerminationAdd")
		public void insertGoverTerminationAdd(HttpServletRequest request, HttpServletResponse response) throws Exception {
			String requestParams = ParameterUtil.getRequestBodyToStr(request);
			
			JSONObject requestParamsObj=new JSONObject(requestParams);
			log.info("requestParams:"+requestParams);
			ParameterParser parser = new ParameterParser(request);
//			String cancleDate = parser.getString("cancleDate", "");
//			String userName = parser.getString("userName", "");
//			String goverNo = parser.getString("goverNo", "");
			String empCd = String.valueOf(request.getSession().getAttribute("userId"));
			String cancleDate = requestParamsObj.getString("cancleDate");
			String userName = requestParamsObj.getString("userName");
			String goverNo = requestParamsObj.getString("goverNo");
			

			String str_result = "Y";
			try {

				HashMap params = new HashMap();
				params.put("GOVERNO", goverNo);
				params.put("GOVER_NO", goverNo);
				params.put("USERNAME", userName);
				params.put("CANCLEDATE", cancleDate);
				params.put("EMPCD", empCd);

				/** 소속된 토지 조회 **/
				ArrayList list = (ArrayList) mainService.selectQuery("goverSQL.selectGoverPnuList", params); //결과대문자로 넘어옴
				if (list.size() > 0) {
					for (int i = 0; i < list.size(); i++) {

						String strPNU = "";
						strPNU = (String) ((HashMap) list.get(i)).get("PNU");
						params.put("STR_PNU", strPNU);

						log.info("insertGoverTerminationAdd >>>>> 점용해제 PNU = " + strPNU);
						/** JIJUK_MASTER 테이블 지상권 해제 **/
						mainService.UpdateQuery("goverSQL.updateJijukMasterStatus_Gover", params);

						// 해지후 미설정,미점용으로 등록
						HashMap dataMap = new HashMap();
						dataMap = (HashMap) list.get(i);

						System.out.println("dataMap :: " + dataMap.toString());

						ArrayList NotsetList = (ArrayList) mainService.selectQuery("goverSQL.selectNotsetNextNo", null);
						String Next_notsetNo = String.valueOf(Integer.parseInt((String) ((HashMap) NotsetList.get(0)).get("NOW_NOTSETNO")) + 1);
						int n_Next_notsetNo = Next_notsetNo.length();

						String add_Zero = "";
						for (int j = 0; j < (6 - n_Next_notsetNo); j++) {
							add_Zero += "0";
						}
						Next_notsetNo = "N_" + add_Zero + Next_notsetNo;

						dataMap.put("NOTSET_NO", Next_notsetNo);
						mainService.InsertQuery("songyuSQL.insertNotsetMaster", dataMap);
						dataMap.put("STATUS", "NOTSET");
						dataMap.put("JISANGNO", Next_notsetNo);
						mainService.UpdateQuery("songyuSQL.updateTogiJisang_Status", dataMap);
					}
				}

				/** JISANG_MASTER 테이블 지상권 해제 **/
				mainService.UpdateQuery("goverSQL.insertGoverTerminationAdd", params);
				
				params.put("GUBUN", "해지");
				params.put("CONT", "점용 해지 [등록자:"+userName+", 해지일자:"+cancleDate+"]");
				mainService.InsertQuery("goverSQL.insertGoverModifyHistory", params);

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
		
		
		// 점용 마스터 등록 수정
		@Transactional
		@PostMapping(path="/insertGoverMaster")
		public void insertGoverMaster(HttpServletRequest request, HttpServletResponse response) throws Exception {
			//json으로 값을 받을때
			String requestParams = ParameterUtil.getRequestBodyToStr(request);
			JSONObject requestParamsObj=new JSONObject(requestParams);
			log.info("requestParams:"+requestParams);
			
			ArrayList list = new ArrayList();
			ParameterParser parser = new ParameterParser(request);
			log.info(""+parser);
//			String PAGETYPE = parser.getString("PAGETYPE", ""); // 수정화면에서 상신을 눌렀는지
//																// 확인
//			String JISA = parser.getString("JISA", ""); // 지사
//			String YONGDO = parser.getString("YONGDO", ""); // 용도
//			String PIPE_NAME = parser.getString("PIPE_NAME", ""); // 관로명
//			String PIPE_METER = parser.getString("PIPE_METER", ""); // 관경
//			String PIPE_METER2 = parser.getString("PIPE_METER2", ""); // 관경
//			String SUN_GUBUN = parser.getString("SUN_GUBUN", ""); // 단/복선
//			// String USE_PURPOS = parser.getString("USE_PURPOS", ""); // 점용 목록
//			String GOVER_ST_DATE = parser.getString("GOVER_ST_DATE", ""); // 점용기간 시작
//			String GOVER_ED_DATE = parser.getString("GOVER_ED_DATE", ""); // 점용기간 끝
//			String PMT_OFFICE = parser.getString("PMT_OFFICE", ""); // 허가관청
//			String ADM_OFFICE = parser.getString("ADM_OFFICE", ""); // 관리기관
//			String OFFICE_DEPART = parser.getString("OFFICE_DEPART", ""); // 관리부서
//			String OFFICE_CHARGE = parser.getString("OFFICE_CHARGE", ""); // 부서담당자
//			String OFFICE_CONTACT = parser.getString("OFFICE_CONTACT", ""); // 담당자연락처
//			String OFFICE_MOBILE = parser.getString("OFFICE_MOBILE", ""); // 담당자연락처
//			String GOVER_PERIOD = parser.getString("GOVER_PERIOD", ""); // 담당자연락처
//			String SAVE_STATUS = parser.getString("SAVE_STATUS", ""); // 담당자연락처
//			String gubun = parser.getString("gubun", ""); // 구분( modify : 수정, insert
//															// : 등록 )
//			String ori_GOVER_NO = parser.getString("GOVER_NO", "");
//			String PNU_CNT = parser.getString("pnuCnt", "0"); // 소속토지 수
//			String PMT_CNT = parser.getString("pmtCnt", "0"); // 허가정보 수
//			String FILE_CNT = parser.getString("fileCnt", "0"); // 파일수
//			String fileseq = parser.getString("fileseq", ""); // 파일 seq
//
//			String modifyReason1 = parser.getString("modifyReason1", ""); // 변경이력-기본정보
//			String modifyReason2 = parser.getString("modifyReason2", ""); // 변경이력-소속토지정보
//			String modifyReason3 = parser.getString("modifyReason3", ""); // 변경이력-허가기본정보
//			String modifyReason4 = parser.getString("modifyReason4", ""); // 변경이력-허가관리
//																			// 및
//																			// 납부현황
//
//			String USER_ID = String.valueOf(request.getSession().getAttribute("userId"));
//			String USER_NAME = String.valueOf(request.getSession().getAttribute("userName"));
//			
//			
//			//ljs 이슈정보 추가
//			String NEWREGREASON=parser.getString("newRegReason","");
//			String OCCUNONPAYREASON=parser.getString("occuNonPayReason","");
//			String PERMPOSSYN=parser.getString("permPossYn","");
//			String OCCUPREPAYYN=parser.getString("occuPrePayYn","");
//			String OCCUPREPAYDATE=parser.getString("occuPrePayDate","");
			
			
			String PAGETYPE = requestParamsObj.getString("PAGETYPE"); // 수정화면에서 상신을 눌렀는지
			// 확인
			String JISA = requestParamsObj.getString("JISA"); // 지사
			String YONGDO = requestParamsObj.getString("YONGDO"); // 용도
			String PIPE_NAME = requestParamsObj.getString("PIPE_NAME"); // 관로명
			String PIPE_METER = requestParamsObj.getString("PIPE_METER"); // 관경
			String PIPE_METER2 = requestParamsObj.getString("PIPE_METER2"); // 관경
			String SUN_GUBUN = requestParamsObj.getString("SUN_GUBUN"); // 단/복선
			// String USE_PURPOS = parser.getString("USE_PURPOS", ""); // 점용 목록
			String GOVER_ST_DATE = requestParamsObj.getString("GOVER_ST_DATE"); // 점용기간 시작
			String GOVER_ED_DATE = requestParamsObj.getString("GOVER_ED_DATE"); // 점용기간 끝
			String PMT_OFFICE = requestParamsObj.getString("PMT_OFFICE"); // 허가관청
			String ADM_OFFICE = requestParamsObj.getString("ADM_OFFICE"); // 관리기관
			String OFFICE_DEPART = requestParamsObj.getString("OFFICE_DEPART"); // 관리부서
			String OFFICE_CHARGE = requestParamsObj.getString("OFFICE_CHARGE"); // 부서담당자
			String OFFICE_CONTACT = requestParamsObj.getString("OFFICE_CONTACT"); // 담당자연락처
			String OFFICE_MOBILE = requestParamsObj.getString("OFFICE_MOBILE"); // 담당자연락처
			String GOVER_PERIOD = requestParamsObj.getString("GOVER_PERIOD"); // 담당자연락처
			String SAVE_STATUS = requestParamsObj.getString("SAVE_STATUS"); // 담당자연락처
			String gubun = requestParamsObj.getString("gubun"); // 구분( modify : 수정, insert
					// : 등록 )
			String ori_GOVER_NO = requestParamsObj.getString("GOVER_NO");
			String PNU_CNT = requestParamsObj.getString("pnuCnt"); // 소속토지 수
			String PMT_CNT = requestParamsObj.getString("pmtCnt"); // 허가정보 수
			String FILE_CNT = requestParamsObj.getString("fileCnt"); // 파일수
			String fileseq = requestParamsObj.getString("fileseq"); // 파일 seq
			
			String modifyReason1 = requestParamsObj.getString("modifyReason1"); // 변경이력-기본정보
			String modifyReason2 = requestParamsObj.getString("modifyReason2"); // 변경이력-소속토지정보
			String modifyReason3 = requestParamsObj.getString("modifyReason3"); // 변경이력-허가기본정보
			String modifyReason4 = requestParamsObj.getString("modifyReason4"); // 변경이력-허가관리
									// 및
									// 납부현황
			
			String USER_ID = String.valueOf(request.getSession().getAttribute("userId"));
			String USER_NAME = String.valueOf(request.getSession().getAttribute("userName"));
			
			
			//ljs 이슈정보 추가
			String NEWREGREASON=parser.getString("newRegReason","");
			String OCCUNONPAYREASON=parser.getString("occuNonPayReason","");
			String PERMPOSSYN=parser.getString("permPossYn","");
			String OCCUPREPAYYN=parser.getString("occuPrePayYn","");
			String OCCUPREPAYDATE=parser.getString("occuPrePayDate","");

			System.out.println("modifyReason1=" + modifyReason1);
			System.out.println("modifyReason2=" + modifyReason2);
			System.out.println("modifyReason3=" + modifyReason3);
			System.out.println("modifyReason4=" + modifyReason4);

			String str_GUBUN = "";
			String str_GOVERNO = "";

			String str_result = "Y";
			try {

				HashMap params = new HashMap();
				//ljs 이슈 부분 추가
				params.put("NEWREGREASON",NEWREGREASON);
				params.put("OCCUNONPAYREASON",OCCUNONPAYREASON);
				params.put("PERMPOSSYN",PERMPOSSYN);
				params.put("OCCUPREPAYYN",OCCUPREPAYYN);
				params.put("OCCUPREPAYDATE",OCCUPREPAYDATE);
				
				
				params.put("JISA", JISA);
				params.put("YONGDO", YONGDO);
				params.put("PIPE_NAME", PIPE_NAME);
				params.put("PIPE_METER", PIPE_METER);
				params.put("PIPE_METER2", PIPE_METER2);
				params.put("SUN_GUBUN", SUN_GUBUN);
				params.put("STATUS", "GOVER");
				params.put("FILESEQ", fileseq);
				// params.put("USE_PURPOS", USE_PURPOS);
				params.put("GOVER_ST_DATE", GOVER_ST_DATE);
				params.put("GOVER_ED_DATE", GOVER_ED_DATE);
				params.put("PMT_OFFICE", PMT_OFFICE);
				params.put("ADM_OFFICE", ADM_OFFICE);
				params.put("OFFICE_DEPART", OFFICE_DEPART);
				params.put("OFFICE_CHARGE", OFFICE_CHARGE);
				params.put("OFFICE_CONTACT", OFFICE_CONTACT);
				params.put("OFFICE_MOBILE", OFFICE_MOBILE);
				params.put("GOVER_PERIOD", GOVER_PERIOD);
				params.put("PMT_STATUS", "임시저장"); // 등록상태
				params.put("USER_ID", USER_ID);
				params.put("USER_NAME", USER_NAME);
				params.put("SAVE_STATUS", SAVE_STATUS);

				/**********************
				 * 다음 지상권 번호 조회 시작
				 **********************/
				if (gubun.equals("modify")) {
					params.put("GOVER_NO", ori_GOVER_NO);
					params.put("JISANGNO", ori_GOVER_NO); // JIJUK_MASTER테이블 변경하기 위한
															// 변수
					params.put("GUBUN", str_GUBUN);

					str_GOVERNO = ori_GOVER_NO;

				} else {
					ArrayList GoverList = (ArrayList) mainService.selectQuery("goverSQL.selectGoverNextNo", null);

					String Next_goverNo = String.valueOf(Integer.parseInt((String) ((HashMap) GoverList.get(0)).get("NOW_GOVERNO")) + 1);
					int n_Next_goverNo = Next_goverNo.length();

					String add_Zero = "";
					for (int i = 0; i < (6 - n_Next_goverNo); i++) {
						add_Zero += "0";
					}
					Next_goverNo = "G_" + add_Zero + Next_goverNo;

					params.put("GOVER_NO", Next_goverNo);
					params.put("JISANGNO", Next_goverNo); // JIJUK_MASTER테이블 변경하기 위한
															// 변수

					str_GOVERNO = Next_goverNo;
				}

				/***********************
				 * 다음 지상권 번호 조회 끝
				 ************************/

				System.out.println("기본정보 params = " + params);
				if (gubun.equals("insert")) {
					mainService.InsertQuery("goverSQL.insertGoverMaster", params); // 기본정보
																						// 저장
				} else if (gubun.equals("modify")) {

					// 변경이력 등록
					if (!modifyReason1.equals("")) {
						params.put("GUBUN", "기본정보");
						params.put("CONT", modifyReason1);
						mainService.InsertQuery("goverSQL.insertGoverModifyHistory", params);
					}
					if (!modifyReason2.equals("")) {
						params.put("GUBUN", "소속 토지정보");
						params.put("CONT", modifyReason2);
						mainService.InsertQuery("goversQL.insertGoverModifyHistory", params);
					}
					if (!modifyReason3.equals("")) {
						params.put("GUBUN", "허가 정보 및 납부 현황");
						params.put("CONT", modifyReason3);
						mainService.InsertQuery("goverSQL.insertGoverModifyHistory", params);
					}
					System.out.println("updateGoverMaster = " + params);
					mainService.UpdateQuery("goverSQL.updateGoverMaster", params); // 기본정보
																						// 수정

				}

				// 소속토지
				for (int i = 0; i < Integer.parseInt(PNU_CNT); i++) {
					String SIDO_NM = (parser.getString("SIDO_NM" + String.valueOf(i), "")).replaceAll("전체", "");
					String SGG_NM = (parser.getString("SGG_NM" + String.valueOf(i), "")).replaceAll("전체", "");
					String EMD_NM = (parser.getString("EMD_NM" + String.valueOf(i), "")).replaceAll("전체", "");
					String RI_NM = (parser.getString("RI_NM" + String.valueOf(i), "")).replaceAll("전체", "");
					String JIBUN = parser.getString("JIBUN" + String.valueOf(i), "");
					String JIBUN_FULL = parser.getString("JIBUN_FULL" + String.valueOf(i), "");
					String ADDRCODE = parser.getString("ADDRCODE" + String.valueOf(i), "");
					String PNU = parser.getString("ChkPNU" + String.valueOf(i), "");
					String ORG_PNU = parser.getString("ORG_PNU" + String.valueOf(i), "");
					String GOVEROWNYN = parser.getString("GOVER_OWN_YN" + String.valueOf(i), "");
					String JIJUK_AREA = parser.getString("JIJUK_AREA" + String.valueOf(i), "");
					String JIMOK_TEXT = parser.getString("JIMOK_TEXT" + String.valueOf(i), "");
					String GOVER_LENGTH = parser.getString("GOVER_LENGTH" + String.valueOf(i), "");
					String GOVER_AREA = parser.getString("GOVER_AREA" + String.valueOf(i), "");
					String ADM_OFFICE_PNU = parser.getString("ADM_OFFICE" + String.valueOf(i), "");
					String USE_PURPOS_PNU = parser.getString("USE_PURPOS" + String.valueOf(i), "");
					String REP_FLAG = parser.getString("REP_FLAG" + String.valueOf(i), "");
					String ORG_PNU_NULL = parser.getString("ORG_PNU_NULL" + String.valueOf(i), ""); // pnu값이
																									// "NULL"도
																									// 아닌
																									// ""값인
																									// 예외
																									// 체크

					String PIPE_OVERLAP_YN = parser.getString("PIPE_OVERLAP_YN" + String.valueOf(i), "");

					if (SIDO_NM.equals("") && SGG_NM.equals("") && EMD_NM.equals("") && RI_NM.equals("") && JIBUN.equals(""))
						continue;

					params.put("SIDO_NM", SIDO_NM); // 시도
					params.put("SGG_NM", SGG_NM); // 시군구
					params.put("EMD_NM", EMD_NM); // 읍면동
					params.put("RI_NM", RI_NM); // 동리
					params.put("JIBUN", JIBUN); // 지번
					params.put("JIBUN_FULL", JIBUN_FULL);
					params.put("ADDRCODE", ADDRCODE); // 주소코드
					params.put("PNU", PNU); // 새로 입력받은 PNU
					params.put("ORG_PNU", ORG_PNU); // 기존PNU
					params.put("GOVEROWNYN", GOVEROWNYN); // 국공유지여부
					params.put("JIJUK_AREA", JIJUK_AREA); // 지적면적
					params.put("JIMOK_TEXT", JIMOK_TEXT); // 지목
					params.put("GOVER_LENGTH", GOVER_LENGTH); // 연장
					params.put("GOVER_AREA", GOVER_AREA); // 면적
					params.put("ADM_OFFICE", ADM_OFFICE_PNU); // 면적
					params.put("USE_PURPOS", USE_PURPOS_PNU); // 면적
					params.put("REP_FLAG", REP_FLAG); // 대표필지 플래그
					params.put("PIPEYN", PIPE_OVERLAP_YN); // 대표필지 플래그
					System.out.println("insertGoverList >>>>>> insertGoverPnu Params" + params);
					
					// 로그처리를 위해 변경전 지적마스터 데이터 조회
					HashMap logParam = (HashMap) mainService.selectHashmapQuery("songyuSQL.selectJijukBeforePNU", params);

					if (gubun.equals("modify")) {
						if (i == 0) {
							/**
							 * 기존의 PNU 삭제하기 전에 JIJUK_MASTER 테이블에서 미설정으로 바꿔줌
							 **/
							ArrayList goverlist = (ArrayList) mainService.selectQuery("goverSQL.selectGoverPnuList", params);
							String str_BeforePNU = "";

							if (null != goverlist && goverlist.size() > 0) {
								HashMap hm = new HashMap();

								for (int j = 0; j < goverlist.size(); j++) {
									str_BeforePNU = (String) ((HashMap) goverlist.get(j)).get("PNU");
									str_BeforePNU = CommonUtil.nvl(str_BeforePNU);
									params.put("STR_PNU", str_BeforePNU);

									if (!str_BeforePNU.equals("NULL") && !str_BeforePNU.equals("")) {
										// ** JIJUK_MASTER 테이블 지상권 해제**//
										System.out.println("insertGoverList >>>>>> cancelGoverPnu PNU=" + str_BeforePNU);
										
										mainService.UpdateQuery("goverSQL.updateJijukMasterStatus_Gover", params);
									}
								}
							}
							mainService.UpdateQuery("goverSQL.deleteGoverPNU", params); // 기존
																							// 삭제
						}
					}
					
					if(logParam != null ) {
						logParam.put("JISANG_NO", ori_GOVER_NO);
						logParam.put("JISANG_STATUS","GOVER");
						logParam.put("GOVER_OWN_YN", GOVEROWNYN);
						logParam.put("PIPE_OVERLAP_YN", PIPE_OVERLAP_YN);
						logParam.put("JISA", JISA);
						logParam.put("LOG_USER", String.valueOf(request.getSession().getAttribute("userId")));
						logParam.put("LOG_TYPE", "U");
						mainService.InsertQuery("songyuSQL.insertJijukLog", logParam);
					}

					String CANCLE_YN = parser.getString("CANCLE_YN" + String.valueOf(i), "");// 소속토지정보
																								// -
																								// 해지여부

					System.out.println("CANCLE_YN :: " + CANCLE_YN);
					PNU = parser.getString("ChkPNU" + String.valueOf(i), "");
					ORG_PNU = parser.getString("ORG_PNU" + String.valueOf(i), "");
					String IN_PNU = ""; // DB에 Insert할 PNU

					if (CANCLE_YN.equals("N")) {
						if (gubun.equals("insert")) {
							IN_PNU = PNU;
						} else {
							if (!ORG_PNU.equals("NULL") && !PNU.equals("") && !ORG_PNU.equals(PNU)) {
								IN_PNU = PNU;
							} else if (ORG_PNU.equals("NULL") && !PNU.equals("")) {
								IN_PNU = PNU;
							} else {
								IN_PNU = ORG_PNU;
							}
						}
						// System.out.println("ORG_PNU=" + ORG_PNU);
						// System.out.println("PNU=" + PNU);
						// System.out.println("IN_PNU=" + IN_PNU);
						params.put("IN_PNU", IN_PNU);
						System.out.println("insertGoverList >>>>>> IN_PNU=" + IN_PNU);
						mainService.InsertQuery("goverSQL.insertGoverPnu", params); // PNU
																						// 테이블
																						// 저장

						if (!PNU.equals("NULL") && !ORG_PNU_NULL.equals("Y")) {
							// 미설정일시 미설정 해지
							HashMap<String, String> param = new HashMap<String, String>();
							HashMap<String, String> dataMap = new HashMap<String, String>();
							param.put("PNU", IN_PNU);
							dataMap = (HashMap<String, String>) mainService.selectHashmapQuery("goverSQL.selectTogiData", param);
							if (dataMap != null) {
								if ("NOTSET".equals(dataMap.get("JISANG_STATUS"))) {
									param.put("NOTSET_NO", dataMap.get("JISANG_NO"));
									mainService.DeleteQuery("notsetSQL.deleteNotsetMaster", param);
								}
							}

							/** JIJUK_MASTER 테이블 새로운 행정구역으로 지상권 등록 **/
							params.put("PNU", IN_PNU);
							mainService.UpdateQuery("songyuSQL.updateTogiJisang_Status", params);
							System.out.println("점용등록된 PNU=" + IN_PNU);
						}

						HashMap param = new HashMap();
						param.put("SIDO_NM", SIDO_NM); // 시도
						param.put("SGG_NM", SGG_NM); // 시군구
						param.put("EMD_NM", EMD_NM); // 읍면동
						param.put("RI_NM", RI_NM); // 동리
						param.put("JIBUN", JIBUN); // 지번
						ArrayList<HashMap> dataMapList = (ArrayList<HashMap>) mainService.selectQuery("notsetSQL.selectNotsetObject", param);

						if (dataMapList != null && dataMapList.size() > 0) {
							for (int k = 0; k < dataMapList.size(); k++) {
								//log.info(":"+dataMapList.get(k).g)
								
								param.put("NOTSET_NO", dataMapList.get(k).get("NOTSET_NO"));
								mainService.UpdateQuery("notsetSQL.deleteNotsetMaster", param);
							}
						}

					} else {
						// 20220830::미설정 미점용 등록 막아달라는 요청
						// // 해지후 미설정,미점용으로 등록
						// HashMap dataMap = new HashMap();
						//
						// params.put("GOVER_OWN_YN", GOVEROWNYN); // 국공유지여부
						//
						// System.out.println("params.toString() :: " + params.toString());
						//
						// ArrayList NotsetList = (ArrayList) Database.getInstance().queryForList("Json.selectNotsetNextNo", null);
						// String Next_notsetNo = String.valueOf(Integer.parseInt((String) ((HashMap) NotsetList.get(0)).get("NOW_NOTSETNO")) + 1);
						// int n_Next_notsetNo = Next_notsetNo.length();
						//
						// String add_Zero = "";
						// for (int j = 0; j < (6 - n_Next_notsetNo); j++) {
						// add_Zero += "0";
						// }
						// Next_notsetNo = "N_" + add_Zero + Next_notsetNo;
						//
						// params.put("NOTSET_NO", Next_notsetNo);
						// Database.getInstance().insert("Json.insertNotsetMaster", params);
						// params.put("STATUS", "NOTSET");
						// params.put("JISANGNO", Next_notsetNo);
						// Database.getInstance().update("Json.updateTogiJisang_Status", params);

						params.put("STATUS", "N");
						params.put("JISANGNO", null);
						mainService.UpdateQuery("songyuSQL.updateTogiJisang_Status2Null", params);
					}
				}

				// 20170517 - GOVER_ATCFILE테이블에 PMT_NO가 없다면 GOVER_PERMIT에서 조회해서 업데이트
				ArrayList GOVER_ATCFILE_PmtNo = (ArrayList) mainService.selectQuery("goverSQL.selectGoverRowDetailFilesObject", params);
				String Next_PMT_NO = String.valueOf(params.get("NEXTSEQ"));

				if (null != GOVER_ATCFILE_PmtNo && GOVER_ATCFILE_PmtNo.size() > 0) {

					for (int k = 0; k < GOVER_ATCFILE_PmtNo.size(); k++) {
						params.put("ADD_PMT_NO", "");
						params.put("FILESEQ", fileseq);

						HashMap hm_GAP_NO = (HashMap) GOVER_ATCFILE_PmtNo.get(k);
						String str_GAP_NO = CommonUtil.nvl(String.valueOf(hm_GAP_NO.get("ga_pmt_no")));
						String str_GAP_FILESQL = CommonUtil.nvl(String.valueOf(hm_GAP_NO.get("ga_file_seq")));

						// 파일을 건으로 업데이트
						if ("".equals(str_GAP_NO)) {
							// NEXTSEQ를 그대로 넣으면 무조건 업데이트가 되기때문에 key를 바꿈
							params.put("ADD_PMT_NO", Next_PMT_NO);
							params.put("FILESEQ", str_GAP_FILESQL);

							/** codecanyon에서 파일업로드 **/
							mainService.UpdateQuery("goverSQL.updateSeqFile_Gover", params); // 파일SEQ로
																								// PMTNO
																								// 업데이트
						} else {
							// 해당 seq에 맞는 전체파일 업데이트
							/** codecanyon에서 파일업로드 **/
							mainService.UpdateQuery("goverSQL.updateSeqFile_Gover_SEQ", params); // SEQ로
																									// 지상권번호
																									// 업데이트
						}

					}

				}

				if (gubun.equals("modify")) {
					for (int i = 0; i < Integer.parseInt(FILE_CNT); i++) {
						String IS_DEL = parser.getString("isFileDel" + String.valueOf(i), "");
						String DEL_SEQ = parser.getString("fileSeq" + String.valueOf(i), "");

						if (IS_DEL.equals("Y")) {
							System.out.println("FILE_DEL_SEQ=" + DEL_SEQ);
							params.put("SEQ", DEL_SEQ);
							mainService.UpdateQuery("goverSQL.deleteGoverFile", params);

						}
					}
				}

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
			map.put("GOVERNO", str_GOVERNO);
			map.put("result", list);

			JSONObject jo = new JSONObject(map);

			response.setCharacterEncoding("UTF-8");
			response.setHeader("Access-Control-Allow-Origin", "*");
			response.resetBuffer();
			response.setContentType("application/json");
			response.getWriter().print(jo);
			response.getWriter().flush();

		}
		
		
		
		
		
}
