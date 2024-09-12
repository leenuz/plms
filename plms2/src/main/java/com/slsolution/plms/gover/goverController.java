package com.slsolution.plms.gover;

import java.io.File;
import java.util.ArrayList;
import java.util.Enumeration;
import java.util.HashMap;
import java.util.Iterator;
import java.util.Map;
import java.util.Properties;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.scheduling.annotation.EnableAsync;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;
import org.springframework.web.servlet.ModelAndView;

import com.slsolution.plms.CommonUtil;
import com.slsolution.plms.MainService;
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
		
		@GetMapping(path="/menu03_1") //http://localhost:8080/api/get/dbTest
	    public ModelAndView menu03_1(HttpServletRequest httpRequest, HttpServletResponse response) throws Exception {
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
			
			mav.setViewName("content/gover/menu03_1");
			return mav;
		}
		
		@GetMapping(path="/menu03_2") //http://localhost:8080/api/get/dbTest
	    public ModelAndView menu03_2(HttpServletRequest httpRequest, HttpServletResponse response) throws Exception {
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
			
			mav.setViewName("content/gover/menu03_2");
			
			return mav;
		}
		@GetMapping(path="/menu03_3") //http://localhost:8080/api/get/dbTest
	    public ModelAndView menu03_3(HttpServletRequest httpRequest, HttpServletResponse response) throws Exception {
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
		
		@GetMapping(path="/masterReg") //http://localhost:8080/api/get/dbTest
	    public ModelAndView masterReg(HttpServletRequest httpRequest, HttpServletResponse response) throws Exception {
//			response.setHeader("X-Frame-Options", "SAMEORIGIN");
//			response.setHeader("Content-Security-Policy", " frame-ancestors 'self'");
			ModelAndView mav=new ModelAndView();
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
			String user_purpos=req.getParameter("user_purpos");
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
			params.put("user_purpos",user_purpos);
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

			ArrayList<HashMap> data = mainService.selectQuery("goverSQL.selectAllData",params);
			ArrayList<HashMap> goverModifyList = mainService.selectQuery("goverSQL.selectModifyList",params);
			ArrayList<HashMap> atcFileList = mainService.selectQuery("goverSQL.selectAtcFileList",params);
			ArrayList<HashMap> goverMemoList = mainService.selectQuery("goverSQL.selectMemoList",params);
			ArrayList<HashMap> goverPnuList = mainService.selectQuery("goverSQL.selectPnuList",params);
			
		    // goverPnuList 크기 구하기
		    int goverPnuListSize = goverPnuList.size();
			
			log.info("data:"+data.get(0));
			log.info("goverModifyList:"+goverModifyList);
			log.info("atcFileList:"+atcFileList);
			log.info("goverMemoList:"+goverMemoList);
			log.info("goverPnuList:"+goverPnuList);
			log.info("goverPnuListSize:" + goverPnuListSize);
//			log.info("jm_pipe_yn:"+data.get(0).get("jm_pipe_yn"));

			mav.addObject("resultData",data.get(0));
	  		mav.addObject("goverModifyList",goverModifyList);
	  		mav.addObject("atcFileList",atcFileList);
	  		mav.addObject("memoList",goverMemoList);
	  		mav.addObject("pnuList",goverPnuList);
	  		mav.addObject("pnuListSize", goverPnuListSize);
  			
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
			String use_purpos=req.getParameter("use_purpos");
			String pmt_office = req.getParameter("pmt_office");
			String adm_office = req.getParameter("adm_office");
			String pay_date_start=req.getParameter("pay_date_start");
			String pay_date_end=req.getParameter("pay_date_end");
			String address=req.getParameter("saddr");
			String idx=req.getParameter("idx");

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
			String use_purpos=req.getParameter("use_purpos");
			String pmt_office = req.getParameter("pmt_office");
			String adm_office = req.getParameter("adm_office");
			String cancel_yn = req.getParameter("cancel_yn");
			String pay_date_start=req.getParameter("pay_date_start");
			String pay_date_end=req.getParameter("pay_date_end");
			String address=req.getParameter("saddr");
			String idx=req.getParameter("idx");

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
		
}
