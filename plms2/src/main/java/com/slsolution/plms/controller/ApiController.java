package com.slsolution.plms.controller;

import java.io.File;
import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Properties;

import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.scheduling.annotation.EnableAsync;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;

import com.slsolution.plms.CommonUtil;
import com.slsolution.plms.MainService;

import com.slsolution.plms.ParameterUtil;

import com.slsolution.plms.json.JSONObject;
import com.slsolution.plms.model.BoardModel;
import com.slsolution.plms.model.CountryModel;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@EnableAsync
@RequiredArgsConstructor
@RestController
@RequestMapping("/api")
@CrossOrigin(origins="*",allowedHeaders="*")
public class ApiController {
	
	
	@Autowired
	private MainService mainService;
	
StringBuilder sb=new StringBuilder();
	
	
	
	@PostMapping("/query/result")
	public ResponseEntity<?> result(HttpServletRequest req, HttpServletResponse res) {
//		int draw = Integer.parseInt(req.getParameter("draw"));
//		int start = Integer.parseInt(req.getParameter("start"));
//		int length = Integer.parseInt(req.getParameter("length"));
		
		/*  Below is the example of datatables data we should return
		*  [
		*    { "col1" : "1", "col2" : "test1" },
		*    { "col1" : "2", "col2" : "test2" }
		*  ]
		*    {data: "email"},
                    {data: "fullNmKr"},
                    {data: "userStatCd"},
                    {data: "superUser"}
		*/
		String data = "[{\"email\":\"1\",\"fullNmKr\":\"test1\",\"userStatCd\":\"1\",\"superUser\":\"aaa\"},{\"email\":\"2\",\"fullNmKr\":\"test2\",\"userStatCd\":\"3\",\"superUser\":\"bbb\"}]";
		int total = 2;
		
		res.setContentType("application/json");
		
		sb.setLength(0);
		
		/*
		 *  {
		 *    "draw" : 1,
		 *    "recordsTotal" : 2,
		 *    "recordsFiltered" : 2,
		 *    "data" : data
		 *  }
		 */
		sb.append("{");
	
		
		sb.append("\"data\":");
		sb.append(data);
		
		sb.append("}");
		
		return ResponseEntity.ok(sb.toString());
	}
	
//	
	@GetMapping(path="/Test") //http://localhost:8080/api/get/dbTest
    public void dbTest(HttpServletRequest httpRequest, HttpServletResponse response) throws Exception {
        
//        List<TestDTO> list = new ArrayList<TestDTO>();
//        list = dbService.getList();
		HashMap params = new HashMap();
		ArrayList<HashMap>  list=new ArrayList<HashMap>();
		//List<CountryModel> list = masterDataBaseService.getCountry();
		//ArrayList<HashMap> list = sqlSession.selectList("selectAllList",params);
				
		list=mainService.selectQuery("testSQL.selectAllList", params);
        log.info("api /test:"+list.toString());
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
	
	
	
	@GetMapping(path="/dbTest") //http://localhost:8080/api/get/dbTest
    public void postgresTest(HttpServletRequest httpRequest, HttpServletResponse response) throws Exception {
        
		HashMap params = new HashMap();
		
		ArrayList<HashMap>  list=new ArrayList<HashMap>();
		list=mainService.selectQuery("testSQL.selectAllList", params);
        log.info("api /test:"+list.toString());
        log.info("LJS:"+list.toString());
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
	
	
	
	
	@RequestMapping(value="/jsonTest", method = {RequestMethod.GET, RequestMethod.POST}) //http://localhost:8080/api/get/dbTest
    public void insertTest(HttpServletRequest httpRequest, HttpServletResponse response) throws Exception {
        
		//일반웹형식
//		Properties requestParams = CommonUtil.convertToProperties(httpRequest);
//        log.info("requestParams:"+requestParams);
        
        //json으로 넘어올때
        String getRequestBody = ParameterUtil.getRequestBodyToStr(httpRequest);
        log.info("getRequestBody:"+getRequestBody);
        
        JSONObject object=new JSONObject(getRequestBody);
		
        HashMap<String,Object> resultmap=new HashMap();
        resultmap.put("resultCode","0000");
        resultmap.put("resultData",object);
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
	
	
	@RequestMapping(value="/datatableTest", method = {RequestMethod.GET, RequestMethod.POST}) //http://localhost:8080/api/get/dbTest
    public ResponseEntity<?> datatableTest(HttpServletRequest req, HttpServletResponse res) throws Exception {
        
		//일반웹형식
		Properties requestParams = CommonUtil.convertToProperties(req);
        log.info("requestParams:"+requestParams);
        
        //json으로 넘어올때
//        String getRequestBody = ParameterUtil.getRequestBodyToStr(httpRequest);
//        log.info("getRequestBody:"+getRequestBody);
        
        int draw = Integer.parseInt(req.getParameter("draw"));
		int start = Integer.parseInt(req.getParameter("start"));
		int length = Integer.parseInt(req.getParameter("length"));
		
		
		HashMap params = new HashMap();
		ArrayList<HashMap>  list=new ArrayList<HashMap>();
		list=mainService.selectQuery("jisangSQL.selectAllList2", params);
        log.info("api /test:"+list.toString());
        log.info("LJS:"+list.toString());
        String data = list.toString();
        log.info("data:"+data);
		int total = list.size();
		
	
		
		
		
		 HashMap<String,Object> resultmap=new HashMap();
	        resultmap.put("draw",draw);
	        resultmap.put("recordsTotal",2);
	        resultmap.put("recordsFiltered",2);
	        resultmap.put("data",list);
	        
	        JSONObject obj =new JSONObject(resultmap);
	        
	    	return ResponseEntity.ok(obj.toString());
//	        JSONObject obj =new JSONObject(resultmap);
//	        System.out.println(obj);
//	       
//	      //log.info("jo:"+jo);
//	      			res.setCharacterEncoding("UTF-8");
//	      			res.setHeader("Access-Control-Allow-Origin", "*");
//	      			res.setHeader("Cache-Control", "no-cache");
//	      			res.resetBuffer();
//	      			res.setContentType("application/json");
//	      			//response.getOutputStream().write(jo);
//	      			res.getWriter().print(obj);
//	      			res.getWriter().flush();
    }
	
	
	
	@RequestMapping(value="/datatableTest1", method = {RequestMethod.GET, RequestMethod.POST}) //http://localhost:8080/api/get/dbTest
    public ResponseEntity<?> datatableTest1(HttpServletRequest req, HttpServletResponse res) throws Exception {
        
		//일반웹형식
		Properties requestParams = CommonUtil.convertToProperties(req);
        log.info("requestParams:"+requestParams);
        
        //json으로 넘어올때
//        String getRequestBody = ParameterUtil.getRequestBodyToStr(httpRequest);
//        log.info("getRequestBody:"+getRequestBody);
        
//        int draw = Integer.parseInt(req.getParameter("draw"));
//		int start = Integer.parseInt(req.getParameter("start"));
//		int length = Integer.parseInt(req.getParameter("length"));
		
		
		HashMap params = new HashMap();
		ArrayList<HashMap>  list=new ArrayList<HashMap>();
		
		
		for(int i=0;i<50;i++) {
			HashMap map=new HashMap();
			map.put("email",i+"@naver.com");
			map.put("fullNmKr","fullnmKr"+i);
			map.put("userStatCd","user"+i);
			map.put("superUser","super"+i);
			list.add(map);
		}
		
		int total = list.size();
		
	
		
		
		
		 HashMap<String,Object> resultmap=new HashMap();
	       // resultmap.put("draw",draw);
	      //  resultmap.put("recordsTotal",2);
	       // resultmap.put("recordsFiltered",2);
	        resultmap.put("data",list);
	        
	        JSONObject obj =new JSONObject(resultmap);
	        
	    	return ResponseEntity.ok(obj.toString());
//	        JSONObject obj =new JSONObject(resultmap);
//	        System.out.println(obj);
//	       
//	      //log.info("jo:"+jo);
//	      			res.setCharacterEncoding("UTF-8");
//	      			res.setHeader("Access-Control-Allow-Origin", "*");
//	      			res.setHeader("Cache-Control", "no-cache");
//	      			res.resetBuffer();
//	      			res.setContentType("application/json");
//	      			//response.getOutputStream().write(jo);
//	      			res.getWriter().print(obj);
//	      			res.getWriter().flush();
    }
	
	
	
	@RequestMapping(value="/requestTest", method = {RequestMethod.GET, RequestMethod.POST}) //http://localhost:8080/api/get/dbTest
    public void requestTest(HttpServletRequest httpRequest, HttpServletResponse response) throws Exception {
        
		//일반웹형식
		Properties requestParams = CommonUtil.convertToProperties(httpRequest);
        log.info("requestParams:"+requestParams);
        
//        //json으로 넘어올때
//        String getRequestBody = ParameterUtil.getRequestBodyToStr(httpRequest);
//        log.info("getRequestBody:"+getRequestBody);
        
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
	
	
	@RequestMapping(value="/getPipeName", method = {RequestMethod.GET, RequestMethod.POST}) //http://localhost:8080/api/get/dbTest
    public void getPipeName(HttpServletRequest httpRequest, HttpServletResponse response) throws Exception {
        
		//일반웹형식
//		Properties requestParams = CommonUtil.convertToProperties(httpRequest);
//        log.info("requestParams:"+requestParams);
        
        
        
//        //json으로 넘어올때
        String getRequestBody = ParameterUtil.getRequestBodyToStr(httpRequest);
        log.info("getRequestBody:"+getRequestBody);
        JSONObject json=new JSONObject(getRequestBody.toString());
        HashMap params = new HashMap();
        params.put("idx",json.get("jisaIdx"));
		ArrayList<HashMap>  list=new ArrayList<HashMap>();
		list=mainService.selectQuery("commonSQL.selectPipeNameList", params);
//        List<TestDTO> list = new ArrayList<TestDTO>();
//        list = dbService.getList();
		
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
	@RequestMapping(value="/getAddressData", method = {RequestMethod.GET, RequestMethod.POST}) //http://localhost:8080/api/get/dbTest
    public void getAddressData(HttpServletRequest httpRequest, HttpServletResponse response) throws Exception {
        
		//일반웹형식
//		Properties requestParams = CommonUtil.convertToProperties(httpRequest);
//        log.info("requestParams:"+requestParams);
        
        
        
        //json으로 넘어올때
        String getRequestBody = ParameterUtil.getRequestBodyToStr(httpRequest);
        log.info("getRequestBody:"+getRequestBody);
        JSONObject json=new JSONObject(getRequestBody.toString());
        HashMap params = new HashMap();
        params.put("address",json.getString("address"));
        
        
        
		ArrayList<HashMap>  list=new ArrayList<HashMap>();
		if (json.getString("racheck").equals("0")) {
			list=mainService.selectQuery("commonSQL.selectAddressList", params);
		}
		else list=mainService.selectQuery("commonSQL.selectLcodeList", params);
			
//        List<TestDTO> list = new ArrayList<TestDTO>();
//        list = dbService.getList();
		
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
	
	@RequestMapping(value = "/fileUpload", method = RequestMethod.GET)
    public String dragAndDrop(Model model) {
        
        return "fileUpload";
        
    }
    
    @RequestMapping(value = "/fileUpload/post") //ajax에서 호출하는 부분
    @ResponseBody
    public HashMap upload(MultipartHttpServletRequest multipartRequest) { //Multipart로 받는다.
         
        Iterator<String> itr =  multipartRequest.getFileNames();
        
        String filePath = "D:/test"; //설정파일로 뺀다.
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
           
          
//            System.out.println(obj);
           
          //log.info("jo:"+jo);
//          			response.setCharacterEncoding("UTF-8");
//          			response.setHeader("Access-Control-Allow-Origin", "*");
//          			response.setHeader("Cache-Control", "no-cache");
//          			response.resetBuffer();
//          			response.setContentType("application/json");
//          			//response.getOutputStream().write(jo);
//          			response.getWriter().print(obj);
//          			response.getWriter().flush();
                         
       }
        resultmap.put("resultCode",resultCode);
        resultmap.put("resultData",resultdata);
        resultmap.put("resultMessage",resultMessage);
        JSONObject obj =new JSONObject(resultmap);
         
        return resultmap;
    }
	
    
    @RequestMapping(value="/getSidoMaster", method = {RequestMethod.GET, RequestMethod.POST}) //http://localhost:8080/api/get/dbTest
    public void getSidoMaster(HttpServletRequest httpRequest, HttpServletResponse response) throws Exception {
        
		//일반웹형식
//		Properties requestParams = CommonUtil.convertToProperties(httpRequest);
//        log.info("requestParams:"+requestParams);
        
        
        
//        //json으로 넘어올때
        String getRequestBody = ParameterUtil.getRequestBodyToStr(httpRequest);
        log.info("getRequestBody:"+getRequestBody);
        JSONObject json=new JSONObject(getRequestBody.toString());
        HashMap params = new HashMap();
//        params.put("idx",json.get("jisaIdx"));
		ArrayList<HashMap>  list=new ArrayList<HashMap>();
		list=mainService.selectQuery("commonSQL.getSidoMaster", params);
		log.info("sidomaster list:"+list);
		//        List<TestDTO> list = new ArrayList<TestDTO>();
//        list = dbService.getList();
		
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
    
    @RequestMapping(value="/getSigunMaster", method = {RequestMethod.GET, RequestMethod.POST}) //http://localhost:8080/api/get/dbTest
    public void getSigunMaster(HttpServletRequest httpRequest, HttpServletResponse response) throws Exception {
        
		//일반웹형식
//		Properties requestParams = CommonUtil.convertToProperties(httpRequest);
//        log.info("requestParams:"+requestParams);
        
        
        
//        //json으로 넘어올때
        String getRequestBody = ParameterUtil.getRequestBodyToStr(httpRequest);
        log.info("getRequestBody:"+getRequestBody);
        JSONObject json=new JSONObject(getRequestBody.toString());
        HashMap params = new HashMap();
        params.put("key",json.get("key"));
		ArrayList<HashMap>  list=new ArrayList<HashMap>();
		list=mainService.selectQuery("commonSQL.getSigunMaster", params);
		log.info("sidomaster list:"+list);
		//        List<TestDTO> list = new ArrayList<TestDTO>();
//        list = dbService.getList();
		
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
    
    
    @RequestMapping(value="/getDongMaster", method = {RequestMethod.GET, RequestMethod.POST}) //http://localhost:8080/api/get/dbTest
    public void getDongMaster(HttpServletRequest httpRequest, HttpServletResponse response) throws Exception {
        
		//일반웹형식
//		Properties requestParams = CommonUtil.convertToProperties(httpRequest);
//        log.info("requestParams:"+requestParams);
        
        
        
//        //json으로 넘어올때
        String getRequestBody = ParameterUtil.getRequestBodyToStr(httpRequest);
        log.info("getRequestBody:"+getRequestBody);
        JSONObject json=new JSONObject(getRequestBody.toString());
        HashMap params = new HashMap();
        params.put("sidoKey",json.get("sidoKey"));
        params.put("gugunKey",json.get("gugunKey"));
		ArrayList<HashMap>  list=new ArrayList<HashMap>();
		list=mainService.selectQuery("commonSQL.getDongMaster", params);
		log.info("sidomaster list:"+list);
		//        List<TestDTO> list = new ArrayList<TestDTO>();
//        list = dbService.getList();
		
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
    
    @RequestMapping(value="/getRiMaster", method = {RequestMethod.GET, RequestMethod.POST}) //http://localhost:8080/api/get/dbTest
    public void getRiMaster(HttpServletRequest httpRequest, HttpServletResponse response) throws Exception {
        
		//일반웹형식
//		Properties requestParams = CommonUtil.convertToProperties(httpRequest);
//        log.info("requestParams:"+requestParams);
        
        
        
//        //json으로 넘어올때
        String getRequestBody = ParameterUtil.getRequestBodyToStr(httpRequest);
        log.info("getRequestBody:"+getRequestBody);
        JSONObject json=new JSONObject(getRequestBody.toString());
        HashMap params = new HashMap();
        params.put("sidoKey",json.get("sidoKey"));
        params.put("gugunKey",json.get("gugunKey"));
        params.put("dongKey",json.get("dongKey"));
		ArrayList<HashMap>  list=new ArrayList<HashMap>();
		list=mainService.selectQuery("commonSQL.getRiMaster", params);
		log.info("sidomaster list:"+list);
		//        List<TestDTO> list = new ArrayList<TestDTO>();
//        list = dbService.getList();
		
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
    
    
    

    
    
	
}
