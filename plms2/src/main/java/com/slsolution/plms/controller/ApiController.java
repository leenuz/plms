package com.slsolution.plms.controller;

import java.io.BufferedReader;
import java.io.ByteArrayInputStream;
import java.io.File;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.OutputStream;
import java.net.HttpURLConnection;
import java.net.URL;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Properties;

import javax.xml.parsers.DocumentBuilderFactory;
import javax.xml.xpath.XPath;
import javax.xml.xpath.XPathFactory;

import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.FileSystemResource;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
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
import org.springframework.web.servlet.ModelAndView;
import org.w3c.dom.Document;

import com.slsolution.plms.ApprovalUtil;
import com.slsolution.plms.CommonUtil;
import com.slsolution.plms.MainService;

import com.slsolution.plms.ParameterUtil;
import com.slsolution.plms.config.GlobalConfig;
import com.slsolution.plms.json.JSONArray;
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
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class ApiController {

    @Autowired
    private MainService mainService;

    @Autowired
    private GlobalConfig GC;

    StringBuilder sb = new StringBuilder();

    @PostMapping("/query/result")
    public ResponseEntity<?> result(HttpServletRequest req, HttpServletResponse res) {
        // int draw = Integer.parseInt(req.getParameter("draw"));
        // int start = Integer.parseInt(req.getParameter("start"));
        // int length = Integer.parseInt(req.getParameter("length"));

        /*
         * Below is the example of datatables data we should return
         * [
         * { "col1" : "1", "col2" : "test1" },
         * { "col1" : "2", "col2" : "test2" }
         * ]
         * {data: "email"},
         * {data: "fullNmKr"},
         * {data: "userStatCd"},
         * {data: "superUser"}
         */
        String data = "[{\"email\":\"1\",\"fullNmKr\":\"test1\",\"userStatCd\":\"1\",\"superUser\":\"aaa\"},{\"email\":\"2\",\"fullNmKr\":\"test2\",\"userStatCd\":\"3\",\"superUser\":\"bbb\"}]";
        int total = 2;

        res.setContentType("application/json");

        sb.setLength(0);

        /*
         * {
         * "draw" : 1,
         * "recordsTotal" : 2,
         * "recordsFiltered" : 2,
         * "data" : data
         * }
         */
        sb.append("{");

        sb.append("\"data\":");
        sb.append(data);

        sb.append("}");

        return ResponseEntity.ok(sb.toString());
    }

    @RequestMapping(value = "/dopcoApprovalTest", method = { RequestMethod.GET, RequestMethod.POST }) // http://localhost:8080/api/get/dbTest
    public void dopcoApprovalTest(HttpServletRequest httpRequest, HttpServletResponse response) throws Exception {
    	
    	HashMap<String, Object> resultmap = new HashMap();
        resultmap.put("resultCode", "0000");
        resultmap.put("resultData", httpRequest);
        resultmap.put("resultMessage", "success");
        JSONObject obj = new JSONObject(resultmap);
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
    
    
    //
    @GetMapping(path = "/Test") // http://localhost:8080/api/get/dbTest
    public void dbTest(HttpServletRequest httpRequest, HttpServletResponse response) throws Exception {

        // List<TestDTO> list = new ArrayList<TestDTO>();
        // list = dbService.getList();
        HashMap params = new HashMap();
        ArrayList<HashMap> list = new ArrayList<HashMap>();
        // List<CountryModel> list = masterDataBaseService.getCountry();
        // ArrayList<HashMap> list = sqlSession.selectList("selectAllList",params);

        list = mainService.selectQuery("testSQL.selectAllList", params);
        log.info("api /test:" + list.toString());
        // nhServ1.test();
        // ts.Test1();
        HashMap<String, Object> resultmap = new HashMap();
        resultmap.put("resultCode", "0000");
        resultmap.put("resultData", list);
        resultmap.put("resultMessage", "success");
        JSONObject obj = new JSONObject(resultmap);
        // System.out.println(obj);

        // log.info("jo:"+jo);
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

    @GetMapping(path = "/dbTest") // http://localhost:8080/api/get/dbTest
    public void postgresTest(HttpServletRequest httpRequest, HttpServletResponse response) throws Exception {

        HashMap params = new HashMap();

        ArrayList<HashMap> list = new ArrayList<HashMap>();
        list = mainService.selectQuery("testSQL.selectAllList", params);
        log.info("api /test:" + list.toString());
        log.info("LJS:" + list.toString());
        // nhServ1.test();
        // ts.Test1();
        HashMap<String, Object> resultmap = new HashMap();
        resultmap.put("resultCode", "0000");
        resultmap.put("resultData", list);
        resultmap.put("resultMessage", "success");
        JSONObject obj = new JSONObject(resultmap);
        // System.out.println(obj);

        // log.info("jo:"+jo);
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

    @RequestMapping(value = "/jsonTest", method = { RequestMethod.GET, RequestMethod.POST }) // http://localhost:8080/api/get/dbTest
    public void insertTest(HttpServletRequest httpRequest, HttpServletResponse response) throws Exception {

        // 일반웹형식
        // Properties requestParams = CommonUtil.convertToProperties(httpRequest);
        // log.info("requestParams:"+requestParams);

        // json으로 넘어올때
        String getRequestBody = ParameterUtil.getRequestBodyToStr(httpRequest);
        log.info("getRequestBody:" + getRequestBody);

        JSONObject object = new JSONObject(getRequestBody);

        HashMap<String, Object> resultmap = new HashMap();
        resultmap.put("resultCode", "0000");
        resultmap.put("resultData", object);
        resultmap.put("resultMessage", "success");
        JSONObject obj = new JSONObject(resultmap);
        // System.out.println(obj);

        // log.info("jo:"+jo);
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

    @RequestMapping(value = "/datatableTest", method = { RequestMethod.GET, RequestMethod.POST }) // http://localhost:8080/api/get/dbTest
    public ResponseEntity<?> datatableTest(HttpServletRequest req, HttpServletResponse res) throws Exception {

        // 일반웹형식
        Properties requestParams = CommonUtil.convertToProperties(req);
        log.info("requestParams:" + requestParams);

        // json으로 넘어올때
        // String getRequestBody = ParameterUtil.getRequestBodyToStr(httpRequest);
        // log.info("getRequestBody:"+getRequestBody);

        int draw = Integer.parseInt(req.getParameter("draw"));
        int start = Integer.parseInt(req.getParameter("start"));
        int length = Integer.parseInt(req.getParameter("length"));

        HashMap params = new HashMap();
        ArrayList<HashMap> list = new ArrayList<HashMap>();
        list = mainService.selectQuery("jisangSQL.selectAllList2", params);
        log.info("api /test:" + list.toString());
        log.info("LJS:" + list.toString());
        String data = list.toString();
        log.info("data:" + data);
        int total = list.size();

        HashMap<String, Object> resultmap = new HashMap();
        resultmap.put("draw", draw);
        resultmap.put("recordsTotal", 2);
        resultmap.put("recordsFiltered", 2);
        resultmap.put("data", list);

        JSONObject obj = new JSONObject(resultmap);

        return ResponseEntity.ok(obj.toString());
        // JSONObject obj =new JSONObject(resultmap);
        // System.out.println(obj);
        //
        // //log.info("jo:"+jo);
        // res.setCharacterEncoding("UTF-8");
        // res.setHeader("Access-Control-Allow-Origin", "*");
        // res.setHeader("Cache-Control", "no-cache");
        // res.resetBuffer();
        // res.setContentType("application/json");
        // //response.getOutputStream().write(jo);
        // res.getWriter().print(obj);
        // res.getWriter().flush();
    }

    @RequestMapping(value = "/datatableTest1", method = { RequestMethod.GET, RequestMethod.POST }) // http://localhost:8080/api/get/dbTest
    public ResponseEntity<?> datatableTest1(HttpServletRequest req, HttpServletResponse res) throws Exception {

        // 일반웹형식
        Properties requestParams = CommonUtil.convertToProperties(req);
        log.info("requestParams:" + requestParams);

        // json으로 넘어올때
        // String getRequestBody = ParameterUtil.getRequestBodyToStr(httpRequest);
        // log.info("getRequestBody:"+getRequestBody);

        // int draw = Integer.parseInt(req.getParameter("draw"));
        // int start = Integer.parseInt(req.getParameter("start"));
        // int length = Integer.parseInt(req.getParameter("length"));

        HashMap params = new HashMap();
        ArrayList<HashMap> list = new ArrayList<HashMap>();

        for (int i = 0; i < 50; i++) {
            HashMap map = new HashMap();
            map.put("email", i + "@naver.com");
            map.put("fullNmKr", "fullnmKr" + i);
            map.put("userStatCd", "user" + i);
            map.put("superUser", "super" + i);
            list.add(map);
        }

        int total = list.size();

        HashMap<String, Object> resultmap = new HashMap();
        // resultmap.put("draw",draw);
        // resultmap.put("recordsTotal",2);
        // resultmap.put("recordsFiltered",2);
        resultmap.put("data", list);

        JSONObject obj = new JSONObject(resultmap);

        return ResponseEntity.ok(obj.toString());
        // JSONObject obj =new JSONObject(resultmap);
        // System.out.println(obj);
        //
        // //log.info("jo:"+jo);
        // res.setCharacterEncoding("UTF-8");
        // res.setHeader("Access-Control-Allow-Origin", "*");
        // res.setHeader("Cache-Control", "no-cache");
        // res.resetBuffer();
        // res.setContentType("application/json");
        // //response.getOutputStream().write(jo);
        // res.getWriter().print(obj);
        // res.getWriter().flush();
    }

    @RequestMapping(value = "/requestTest", method = { RequestMethod.GET, RequestMethod.POST }) // http://localhost:8080/api/get/dbTest
    public void requestTest(HttpServletRequest httpRequest, HttpServletResponse response) throws Exception {

        // 일반웹형식
        Properties requestParams = CommonUtil.convertToProperties(httpRequest);
        log.info("requestParams:" + requestParams);

        // //json으로 넘어올때
        // String getRequestBody = ParameterUtil.getRequestBodyToStr(httpRequest);
        // log.info("getRequestBody:"+getRequestBody);

        // List<TestDTO> list = new ArrayList<TestDTO>();
        // list = dbService.getList();

        HashMap<String, Object> resultmap = new HashMap();
        resultmap.put("resultCode", "0000");
        resultmap.put("resultData", requestParams);
        resultmap.put("resultMessage", "success");
        JSONObject obj = new JSONObject(resultmap);
        // System.out.println(obj);

        // log.info("jo:"+jo);
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

    @RequestMapping(value = "/getPipeName", method = { RequestMethod.GET, RequestMethod.POST }) // http://localhost:8080/api/get/dbTest
    public void getPipeName(HttpServletRequest httpRequest, HttpServletResponse response) throws Exception {

        // 일반웹형식
        // Properties requestParams = CommonUtil.convertToProperties(httpRequest);
        // log.info("requestParams:"+requestParams);

        // //json으로 넘어올때
        String getRequestBody = ParameterUtil.getRequestBodyToStr(httpRequest);
        log.info("getRequestBody:" + getRequestBody);
        JSONObject json = new JSONObject(getRequestBody.toString());
        HashMap params = new HashMap();
        params.put("idx", json.get("jisaIdx"));
        ArrayList<HashMap> list = new ArrayList<HashMap>();
        list = mainService.selectQuery("commonSQL.selectPipeNameList", params);
        // List<TestDTO> list = new ArrayList<TestDTO>();
        // list = dbService.getList();

        HashMap<String, Object> resultmap = new HashMap();
        resultmap.put("resultCode", "0000");
        resultmap.put("resultData", list);
        resultmap.put("resultMessage", "success");
        JSONObject obj = new JSONObject(resultmap);
        // System.out.println(obj);

        // log.info("jo:"+jo);
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

    @RequestMapping(value = "/getAddressData", method = { RequestMethod.GET, RequestMethod.POST }) // http://localhost:8080/api/get/dbTest
    public void getAddressData(HttpServletRequest httpRequest, HttpServletResponse response) throws Exception {

        // 일반웹형식
        // Properties requestParams = CommonUtil.convertToProperties(httpRequest);
        // log.info("requestParams:"+requestParams);

        // json으로 넘어올때
        String getRequestBody = ParameterUtil.getRequestBodyToStr(httpRequest);
        log.info("getRequestBody:" + getRequestBody);
        JSONObject json = new JSONObject(getRequestBody.toString());
        HashMap params = new HashMap();
        params.put("address", json.getString("address"));

        ArrayList<HashMap> list = new ArrayList<HashMap>();
        if (json.getString("racheck").equals("0")) {
            list = mainService.selectQuery("commonSQL.selectAddressList", params);
        } else
            list = mainService.selectQuery("commonSQL.selectLcodeList", params);

        // List<TestDTO> list = new ArrayList<TestDTO>();
        // list = dbService.getList();

        HashMap<String, Object> resultmap = new HashMap();
        resultmap.put("resultCode", "0000");
        resultmap.put("resultData", list);
        resultmap.put("resultMessage", "success");
        JSONObject obj = new JSONObject(resultmap);
        // System.out.println(obj);

        // log.info("jo:"+jo);
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

    @RequestMapping(value = "/fileUpload", method = RequestMethod.GET)
    public String dragAndDrop(Model model) {

        return "fileUpload";

    }

    @RequestMapping(value = "/fileUpload/post") // ajax에서 호출하는 부분
    @ResponseBody
    public HashMap upload(MultipartHttpServletRequest multipartRequest) { // Multipart로 받는다.

        Iterator<String> itr = multipartRequest.getFileNames();

        String filePath = GC.getPnuAtcFileDir(); // 설정파일로 뺀다.
        HashMap<String, Object> resultmap = new HashMap();
        ArrayList<HashMap> resultdataarr = new ArrayList<HashMap>();
        HashMap resultdata = new HashMap();
        String resultCode = "0000";
        String resultMessage = "success";
        while (itr.hasNext()) { // 받은 파일들을 모두 돌린다.

            /*
             * 기존 주석처리
             * MultipartFile mpf = multipartRequest.getFile(itr.next());
             * String originFileName = mpf.getOriginalFilename();
             * System.out.println("FILE_INFO: "+originFileName); //받은 파일 리스트 출력'
             */

            MultipartFile mpf = multipartRequest.getFile(itr.next());

            String originalFilename = mpf.getOriginalFilename(); // 파일명

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

            // System.out.println(obj);

            // log.info("jo:"+jo);
            // response.setCharacterEncoding("UTF-8");
            // response.setHeader("Access-Control-Allow-Origin", "*");
            // response.setHeader("Cache-Control", "no-cache");
            // response.resetBuffer();
            // response.setContentType("application/json");
            // //response.getOutputStream().write(jo);
            // response.getWriter().print(obj);
            // response.getWriter().flush();

        }
        resultmap.put("resultCode", resultCode);
        resultmap.put("resultData", resultdata);
        resultmap.put("resultMessage", resultMessage);
        JSONObject obj = new JSONObject(resultmap);

        return resultmap;
    }

    @RequestMapping(value = "/getSidoMaster", method = { RequestMethod.GET, RequestMethod.POST }) // http://localhost:8080/api/get/dbTest
    public void getSidoMaster(HttpServletRequest httpRequest, HttpServletResponse response) throws Exception {

        // 일반웹형식
        // Properties requestParams = CommonUtil.convertToProperties(httpRequest);
        // log.info("requestParams:"+requestParams);

        // //json으로 넘어올때
        String getRequestBody = ParameterUtil.getRequestBodyToStr(httpRequest);
        log.info("getRequestBody:" + getRequestBody);
        JSONObject json = new JSONObject(getRequestBody.toString());
        HashMap params = new HashMap();
        // params.put("idx",json.get("jisaIdx"));
        ArrayList<HashMap> list = new ArrayList<HashMap>();
        list = mainService.selectQuery("commonSQL.getSidoMaster", params);
        log.info("sidomaster list:" + list);
        // List<TestDTO> list = new ArrayList<TestDTO>();
        // list = dbService.getList();

        HashMap<String, Object> resultmap = new HashMap();
        resultmap.put("resultCode", "0000");
        resultmap.put("resultData", list);
        resultmap.put("resultMessage", "success");
        JSONObject obj = new JSONObject(resultmap);
        // System.out.println(obj);

        // log.info("jo:"+jo);
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

    @RequestMapping(value = "/getSigunMaster", method = { RequestMethod.GET, RequestMethod.POST }) // http://localhost:8080/api/get/dbTest
    public void getSigunMaster(HttpServletRequest httpRequest, HttpServletResponse response) throws Exception {

        // 일반웹형식
        // Properties requestParams = CommonUtil.convertToProperties(httpRequest);
        // log.info("requestParams:"+requestParams);

        // //json으로 넘어올때
        String getRequestBody = ParameterUtil.getRequestBodyToStr(httpRequest);
        log.info("getRequestBody:" + getRequestBody);
        JSONObject json = new JSONObject(getRequestBody.toString());
        HashMap params = new HashMap();
        params.put("key", json.get("key"));
        ArrayList<HashMap> list = new ArrayList<HashMap>();
        list = mainService.selectQuery("commonSQL.getSigunMaster", params);
        log.info("sidomaster list:" + list);
        // List<TestDTO> list = new ArrayList<TestDTO>();
        // list = dbService.getList();

        HashMap<String, Object> resultmap = new HashMap();
        resultmap.put("resultCode", "0000");
        resultmap.put("resultData", list);
        resultmap.put("resultMessage", "success");
        JSONObject obj = new JSONObject(resultmap);
        // System.out.println(obj);

        // log.info("jo:"+jo);
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

    @RequestMapping(value = "/getDongMaster", method = { RequestMethod.GET, RequestMethod.POST }) // http://localhost:8080/api/get/dbTest
    public void getDongMaster(HttpServletRequest httpRequest, HttpServletResponse response) throws Exception {

        // 일반웹형식
        // Properties requestParams = CommonUtil.convertToProperties(httpRequest);
        // log.info("requestParams:"+requestParams);

        // //json으로 넘어올때
        String getRequestBody = ParameterUtil.getRequestBodyToStr(httpRequest);
        log.info("getRequestBody:" + getRequestBody);
        JSONObject json = new JSONObject(getRequestBody.toString());
        HashMap params = new HashMap();
        params.put("sidoKey", json.get("sidoKey"));
        params.put("gugunKey", json.get("gugunKey"));
        ArrayList<HashMap> list = new ArrayList<HashMap>();
        list = mainService.selectQuery("commonSQL.getDongMaster", params);
        log.info("sidomaster list:" + list);
        // List<TestDTO> list = new ArrayList<TestDTO>();
        // list = dbService.getList();

        HashMap<String, Object> resultmap = new HashMap();
        resultmap.put("resultCode", "0000");
        resultmap.put("resultData", list);
        resultmap.put("resultMessage", "success");
        JSONObject obj = new JSONObject(resultmap);
        // System.out.println(obj);

        // log.info("jo:"+jo);
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

    @RequestMapping(value = "/getRiMaster", method = { RequestMethod.GET, RequestMethod.POST }) // http://localhost:8080/api/get/dbTest
    public void getRiMaster(HttpServletRequest httpRequest, HttpServletResponse response) throws Exception {

        // 일반웹형식
        // Properties requestParams = CommonUtil.convertToProperties(httpRequest);
        // log.info("requestParams:"+requestParams);

        // //json으로 넘어올때
        String getRequestBody = ParameterUtil.getRequestBodyToStr(httpRequest);
        log.info("getRequestBody:" + getRequestBody);
        JSONObject json = new JSONObject(getRequestBody.toString());
        HashMap params = new HashMap();
        params.put("sidoKey", json.get("sidoKey"));
        params.put("gugunKey", json.get("gugunKey"));
        params.put("dongKey", json.get("dongKey"));
        ArrayList<HashMap> list = new ArrayList<HashMap>();
        list = mainService.selectQuery("commonSQL.getRiMaster", params);
        log.info("sidomaster list:" + list);
        // List<TestDTO> list = new ArrayList<TestDTO>();
        // list = dbService.getList();

        HashMap<String, Object> resultmap = new HashMap();
        resultmap.put("resultCode", "0000");
        resultmap.put("resultData", list);
        resultmap.put("resultMessage", "success");
        JSONObject obj = new JSONObject(resultmap);
        // System.out.println(obj);

        // log.info("jo:"+jo);
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

    @PostMapping(path = "/getBasicSearchData") // http://localhost:8080/api/get/dbTest
    public ModelAndView getBasicSearchData(HttpServletRequest httpRequest, HttpServletResponse response)
            throws Exception {
        ModelAndView mav = new ModelAndView();
        HashMap params = new HashMap();
        ArrayList<HashMap> list = new ArrayList<HashMap>();
        // log.info("httpRequest:"+Arrays.toString(httpRequest));
        String jisa = httpRequest.getParameter("jisa");
        String pnu = httpRequest.getParameter("pnu");
        String sido_nm = httpRequest.getParameter("sido");
        String sgg_nm = httpRequest.getParameter("gugun");
        String emd_nm = httpRequest.getParameter("dong");
        String ri_nm = httpRequest.getParameter("ri");
        String jibun = httpRequest.getParameter("mjibun");
        String address = httpRequest.getParameter("address");

        String addressRadioValue = httpRequest.getParameter("addressInput");
        params.put("jisa", jisa);

        params.put("jibun", jibun);
        if (addressRadioValue.equals("0"))
            params.put("address", address);
        else {
            params.put("sido_nm", sido_nm);
            params.put("sgg_nm", sgg_nm);
            params.put("emd_nm", emd_nm);
            params.put("ri_nm", ri_nm);
        }
        params.put("addressRadioValue", addressRadioValue);
        // params.put("pnu",pnu);
        log.info("params:" + params);
        ArrayList<HashMap> jisangBasicSearchList = mainService.selectQuery("jisangSQL.selectBasicSearchList", params);
        log.info("jisangBasicSearchList:" + jisangBasicSearchList);
        mav.addObject("jisangBasicSearchList", jisangBasicSearchList);
        mav.setViewName("content/common/addressList");
        return mav;
    }

    @RequestMapping(value = "/pnuAtcUpload", method = { RequestMethod.GET, RequestMethod.POST })
    public void pnuAtcUpload(HttpServletRequest httpRequest, HttpServletResponse response) throws Exception {

        // 일반웹형식
        // Properties requestParams = CommonUtil.convertToProperties(httpRequest);
        // log.info("requestParams:"+requestParams);

        // //json으로 넘어올때
        String getRequestBody = ParameterUtil.getRequestBodyToStr(httpRequest);
        log.info("getRequestBody:" + getRequestBody);
        JSONObject json = new JSONObject(getRequestBody.toString());
        log.info("manage_no:" + json.get("manage_no"));
        JSONArray jarr = json.getJSONArray("files");
        log.info("jarr:" + jarr);
        log.info("jarr0:" + jarr.get(0));
        // HashMap resParam = new HashMap();
        // resParam

        int fsize = jarr.length();
        ArrayList<HashMap> list = new ArrayList<HashMap>();
        ArrayList<HashMap> param = new ArrayList<HashMap>();
        for (int i = 0; i < fsize; i++) {
            log.info("filepath:" + jarr.get(i));
            log.info("filename:" + jarr.get(i).toString().replaceAll("^.*[\\/\\\\]", ""));

            HashMap params = new HashMap();
            params.put("manage_no", json.get("manage_no"));
            params.put("pnu", json.get("pnu"));
            params.put("filepath", jarr.get(i));
            params.put("filename", jarr.get(i).toString().replaceAll("^.*[\\/\\\\]", ""));
            params.put("fileseq", i);
            params.put("pmt_no", i);
            mainService.InsertQuery("commonSQL.pnuAtcUpload", params);
        }

        // list=mainService.selectQuery("commonSQL.getRiMaster", params);
        // log.info("sidomaster list:"+list);
        // // List<TestDTO> list = new ArrayList<TestDTO>();
        //// list = dbService.getList();

        HashMap<String, Object> resultmap = new HashMap();
        resultmap.put("resultCode", "0000");
        resultmap.put("resultData", "");
        resultmap.put("params", param);
        resultmap.put("resultMessage", "success");
        JSONObject obj = new JSONObject(resultmap);
        // System.out.println(obj);

        // log.info("jo:"+jo);
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

    @RequestMapping(value = "/pnuAtcDelete", method = { RequestMethod.GET, RequestMethod.POST })
    public void pnuAtcDelete(HttpServletRequest httpRequest, HttpServletResponse response) throws Exception {

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
            params.put("pa_idx", jsonObject.get("value"));
            mainService.DeleteQuery("commonSQL.pnuAtcDelete", params);

            // 파일 삭제 부분.
            // 파일 경로 생성
            String filePath = GC.getPnuAtcFileDir();
            ; // 설정파일로 뺀다.
            String originalFilename = jsonObject.get("fileName").toString();
            String fileFullPath = filePath + "/" + originalFilename; // 파일 전체 경로

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

    // 파일 읽기 전용 API
    @GetMapping("/downloadFile")
    public ResponseEntity<Resource> downloadFile(@RequestParam String filePath) throws IOException {
        File file = new File(filePath);
        if (!file.exists()) {
            throw new RuntimeException("File not found");
        }

        Resource resource = new FileSystemResource(file);

        String contentType = Files.probeContentType(Paths.get(file.getAbsolutePath()));
        if (contentType == null) {
            contentType = "application/octet-stream";
        }

        return ResponseEntity.ok()
                .contentType(MediaType.parseMediaType(contentType))
                .header(HttpHeaders.CONTENT_DISPOSITION, "inline; filename=\"" + file.getName() + "\"")
                .body(resource);
    }

    @PostMapping(path = "/putMemoData") // http://localhost:8080/api/get/dbTest
    public ModelAndView putMemoData(HttpServletRequest httpRequest, HttpServletResponse response) throws Exception {
        ModelAndView mav = new ModelAndView();
        HashMap params = new HashMap();
        ArrayList<HashMap> list = new ArrayList<HashMap>();

        String manage_no = httpRequest.getParameter("manage_no");
        String wname = httpRequest.getParameter("wname");
        String wmemo = httpRequest.getParameter("wmemo");
        String mode = httpRequest.getParameter("mode");
        String idx = httpRequest.getParameter("idx");

        params.put("manage_no", manage_no);
        params.put("wname", wname);
        params.put("wmemo", wmemo);
        params.put("idx", idx);

        log.info("params:" + params);
        if (mode.equals("insert"))
            mainService.InsertQuery("commonSQL.putMemoData", params);
        else
            mainService.InsertQuery("commonSQL.updateMemoData", params);
        ArrayList<HashMap> memoList = mainService.selectQuery("commonSQL.selectMemoList", params);
        mav.addObject("memoList", memoList);
        mav.setViewName("content/jisang/groundDetail :: #memoDiv");
        return mav;
    }

    @PostMapping(path = "/deleteMemoData") // http://localhost:8080/api/get/dbTest
    public ModelAndView deleteMemoData(HttpServletRequest httpRequest, HttpServletResponse response) throws Exception {
        ModelAndView mav = new ModelAndView();
        HashMap params = new HashMap();
        ArrayList<HashMap> list = new ArrayList<HashMap>();

        String idx = httpRequest.getParameter("idx");
        String manage_no = httpRequest.getParameter("manage_no");
        params.put("idx", idx);
        params.put("manage_no", manage_no);

        log.info("params:" + params);
        mainService.InsertQuery("commonSQL.deleteMemoData", params);

        ArrayList<HashMap> memoList = mainService.selectQuery("commonSQL.selectMemoList", params);
        mav.addObject("memoList", memoList);
        mav.setViewName("content/jisang/groundDetail :: #memoDiv");
        return mav;
    }

    @PostMapping(path = "/getMemoData") // http://localhost:8080/api/get/dbTest
    public ModelAndView getMemoData(HttpServletRequest httpRequest, HttpServletResponse response, Model model)
            throws Exception {
        ModelAndView mav = new ModelAndView();

        HashMap params = new HashMap();
        ArrayList<HashMap> list = new ArrayList<HashMap>();

        String idx = httpRequest.getParameter("idx");
        String manage_no = httpRequest.getParameter("manage_no");

        params.put("idx", idx);

        params.put("manage_no", manage_no);
        log.info("params:" + params);

        ArrayList<HashMap> memoList = mainService.selectQuery("commonSQL.selectMemoList", params);
        // model.addAttribute("memoList", memoList);
        mav.addObject("memoList", memoList);
        // mav.setViewName("content/jisang/groundDetail :: #memoDiv");
        mav.setViewName("content/jisang/groundDetail :: #memoDiv");
        return mav;
    }
    
    /**
	 * Echo+ 에서 plms로 결재상태 여부전송
	 **/
    @RequestMapping(value = "/GetPLMSCompforXML", method = { RequestMethod.GET, RequestMethod.POST })
	public void GetPLMSCompforXML(HttpServletRequest request, HttpServletResponse response) throws Exception {
		System.out.println("start mainController GetPLMSCompforXML");

//		ElectronicPaymentUtil epc = new ElectronicPaymentUtil();
		ApprovalUtil epc= new ApprovalUtil();
		epc.GetPLMSCompforXML(request, response);

		System.out.println("end mainController GetPLMSCompforXML");
	}
    
    
    /**
	 * Echo+ 에서 plms로 결재상태 여부전송
	 **/
    @GetMapping("/GetPLMSCompforXMLTest")
	public void GetPLMSCompforXMLTest(HttpServletRequest request, HttpServletResponse response) throws Exception {
		System.out.println("start apiController GetPLMSCompforXML Test");

//		System.out.println("############## start main EchoToPlmsTest");
		
		// 1. PLMS 인터페이스 용 웹서비스 URL
		String url = "http://localhost:8080/api/GetPLMSCompforXML";
		//String url = "http://plmsdev.dopco.co.kr/dcl/GetPLMSCompforXML";
		//String url = "http://plms.dopco.co.kr/dcl/GetPLMSCompforXML";
		//String url = "http://192.6.18.84/SimpleJaxs/PlmsToEcho";
		
		//String url = "http://localhost:8888/dcl/GetPLMSCompforXML";
		// 작성된 xml
					String xmlString = "";
					
					// 2. PLMS로 넘길 xml 생성
					StringBuffer sb = new StringBuffer();
		/*
					sb.append("<?xml version='1.0' encoding='UTF-8'?>												\n");
					sb.append("<ns0:ECHO_001_OS1_MT xmlns:ns0='http://www.dopco.co.kr/ECHO_001/Workflow_Status_Sync'> \n");
					sb.append("  <IF_CODE>																							\n");
					sb.append("        <GUBUN>PLMS</GUBUN>									\n");
					sb.append("        <LANG>1</LANG>										\n");
					sb.append("        <SDATE>20161212</SDATE>									\n");
					sb.append("        <STIME>095311</STIME>                                     \n");
					sb.append("        <USERCD>034599</USERCD>                            \n");
					sb.append("        <SEARCHKEY1>plms00011</SEARCHKEY1>     \n");
					sb.append("  </IF_CODE>	                                                  										\n");
					sb.append("  <DATA>                                                    									\n");
					sb.append("     <DOCKEY>plms00011</DOCKEY>                        														\n");
					sb.append("     <WDID>id</WDID>                        														\n");
					sb.append("     <URL>https://apv.dopco.co.kr/Line/Pages/ApprovalProcess.aspx?ApvFormID=754&amp;LegacyKey=plms00021&amp;SSOMODE=application&amp;SSOHRID=^1&amp;SSOHRPWD=^2</URL>                \n");
					sb.append("		<STATUS>Y</STATUS> 						\n");	
					sb.append("  </DATA>                         													\n");
					sb.append("</ns0:ECHO_001_OS1_MT> 	                  														\n");
					*/
					sb.append(" <soapenv:Envelope xmlns:soapenv=\"http://schemas.xmlsoap.org/soap/envelope/\" xmlns:spr=\"http://spring.plms.com/\">		\n");
					sb.append("    <soapenv:Header/>							\n");
					sb.append("    <soapenv:Body>								\n");
					sb.append("       <spr:getPLMSCompforXML>					\n");
					sb.append("          <IF_CODE>								\n");
					sb.append("             <GUBUN>PLMS</GUBUN>					\n");
					sb.append("             <LANG>3</LANG>						\n");
					sb.append("             <SDATE>20161213</SDATE>					\n");
					sb.append("             <STIME>140511</STIME>					\n");
					sb.append("            <USERCD>034599</USERCD>					\n");
					sb.append("             <SEARCHKEY1>plms00012</SEARCHKEY1>			\n");
					sb.append("         </IF_CODE>								\n");
					sb.append("         <DATA>									\n");
					sb.append("             <DOCKEY>plms00012</DOCKEY>					\n");
					sb.append("             <WDID>wdid</WDID>						\n");
					sb.append("            <URL>https://apv.dopco.co.kr/Line/Pages/ApprovalProcess.aspx?ApvFormID=754&amp;LegacyKey=plms00021&amp;SSOMODE=application&amp;SSOHRID=^1&amp;SSOHRPWD=^2</URL>							\n");
					sb.append("             <STATUS>Y</STATUS>					\n");
					sb.append("             <DISPOSE>Y</DISPOSE>					\n");
					sb.append("          </DATA>								\n");
					sb.append("       </spr:getPLMSCompforXML>					\n");
					sb.append("    </soapenv:Body>								\n");
					sb.append(" </soapenv:Envelope>								\n");
					   
					xmlString = sb.toString();
					
					//작성된 xml 확인
					System.out.println("@@@@@ Send url : " + url);
					System.out.println("@@@@@ xmlString : " + xmlString);
					
					// 3. 생성된 xml PLMS로 전송
					// httpUrlConnection 생성
					HttpURLConnection urlConnection = null;
					urlConnection = (HttpURLConnection) new URL(url).openConnection();
					urlConnection.setConnectTimeout(10000); // 응답 없을시 timeout 설정
					urlConnection.setDoInput(true);
					urlConnection.setDoOutput(true);
					urlConnection.setRequestMethod("POST"); // post 방식 전송 세팅
					urlConnection.setRequestProperty( "Content-Length",  Integer.toString(xmlString.length()));
					urlConnection.setRequestProperty("Content-Type","text/xml; charset=UTF-8"); //xml 형태 데이터 요청 세팅
					
					// 전송
					OutputStream os = null;
					os = urlConnection.getOutputStream();
			        os.write( xmlString.getBytes("utf-8") );
			        os.flush();
			        os.close();
					
					// 4. PLMS에서 받은 url 로 redirct 실행
					System.out.println("@@@@@ urlConnection.resCode : " +urlConnection.getResponseCode() );
					System.out.println("@@@@@ urlConnection.resMessage : " + urlConnection.getResponseMessage());
					
					String out_flag = null;
					String out_msg = null;
					// 200으로 code를 반환 받았을 때 실행
					if( urlConnection.getResponseCode() == 200){
						String rtnXmlStr= "";
			            InputStreamReader in = new InputStreamReader(urlConnection.getInputStream(),"utf-8");
			            BufferedReader br = new BufferedReader(in);
			            String strLine;
			            
			            while ((strLine = br.readLine()) != null){
			            	rtnXmlStr = rtnXmlStr.concat(strLine);
			            }
			            
			            // 결과xml 출력
			            System.out.println("@@@@@ RtnXml : "+ rtnXmlStr);
			            Document rtnXmlDoc = null;
			           
			    		try {
							rtnXmlDoc = DocumentBuilderFactory.newInstance().newDocumentBuilder().parse(new ByteArrayInputStream(rtnXmlStr.getBytes()));
							// xpath 생성
							XPath  xpath = XPathFactory.newInstance().newXPath();

							out_flag = xpath.compile("//*/FLAG").evaluate(rtnXmlDoc);
							out_msg = xpath.compile("//*/MSG").evaluate(rtnXmlDoc);
							
			    		} catch (Exception e) {
			    			e.printStackTrace();
			    		}
					}else{
						System.out.println("@@@@@ http response code error : " + urlConnection.getResponseCode() + "\n");
						System.out.println("@@@@@ http response message error : " + urlConnection.getResponseMessage() + "\n");
					}

						
					System.out.println("@@@@@ out_flag : " + out_flag);
					System.out.println("@@@@@ out_msg : " + out_msg);
					
					
					System.out.println("@@@@@@ XML SERVLET END~!!!!");
					
					System.out.println("############## end main EchoToPlmsTest");
	}

    
    
}
