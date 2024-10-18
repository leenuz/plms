package com.slsolution.plms.notset;

import java.io.File;
import java.util.ArrayList;
import java.util.Collections;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.EnableAsync;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;
import org.springframework.web.servlet.ModelAndView;

import com.slsolution.plms.CommonUtil;
import com.slsolution.plms.MainService;
import com.slsolution.plms.ParameterUtil;
import com.slsolution.plms.config.GlobalConfig;
import com.slsolution.plms.json.JSONArray;
import com.slsolution.plms.json.JSONObject;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@EnableAsync
@RequiredArgsConstructor
@RestController
@RequestMapping("/land/notset")
@CrossOrigin(origins="*",allowedHeaders="*")
public class notsetController {
	
	@Autowired
	private MainService mainService;
	
	@Autowired
	private GlobalConfig GC;
	
	//송유관로현황-미설정/미점용 상세
	@GetMapping(path="/unsetOccupationDetails") //http://localhost:8080/api/get/dbTest
    public ModelAndView unsetOccupationDetails(HttpServletRequest httpRequest, HttpServletResponse response) throws Exception {
		ModelAndView mav=new ModelAndView();
		HashMap params = new HashMap();

		String idx = httpRequest.getParameter("idx");
		String index = httpRequest.getParameter("index");

		params.put("idx",idx);
		params.put("index",index);
		params.put("manage_no",idx);
		log.info("idx:"+idx);
		log.info("index:"+index);

		ArrayList<HashMap> data = mainService.selectQuery("notsetSQL.selectAllData",params); // 기본정보
		
		//241009
		List<String> coordinateVal = new ArrayList<>();
		Integer coordinateSize = 0;
		
		HashMap jijuk = new HashMap<>();
		jijuk.put("x", 0);
		jijuk.put("y", 0);
		
		if (data.size() > 0) {
			HashMap jijukParam = new HashMap<>();
			jijukParam.put("sido_nm", data.get(0).get("nm_sido_nm"));
			jijukParam.put("sgg_nm", data.get(0).get("nm_sgg_nm"));
			jijukParam.put("emd_nm", data.get(0).get("nm_emd_nm"));
			jijukParam.put("ri_nm", data.get(0).get("nm_ri_nm"));
			jijukParam.put("jibun", data.get(0).get("nm_jibun"));
			
			jijukParam.put("TARGET_PNU", data.get(0).get("nm_pnu"));

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
		
		ArrayList<HashMap> soujaList = mainService.selectQuery("notsetSQL.selectSoyujaData",params); //소유자
		ArrayList<HashMap> atcFileList = mainService.selectQuery("notsetSQL.selectAtcFileList",params); //첨부파일
		ArrayList<HashMap> notsetModifyList = mainService.selectQuery("notsetSQL.selectModifyList",params); //변경이력
		ArrayList<HashMap> notsetPnuAtcFileList = mainService.selectQuery("jisangSQL.selectPnuAtcFileList",params); // 필지 첨부파일
		
		params.put("pnu", data.get(0).get("nm_pnu"));
		log.info("pnu: " + data.get(0).get("nm_pnu"));
		ArrayList<HashMap> notsetIssueList = mainService.selectQuery("jisangSQL.selectIssueList",params); //잠재이슈
		log.info("jisangIssueList size:"+notsetIssueList.size());
		
		if (notsetIssueList != null && !notsetIssueList.isEmpty()) {
			log.info("jisangIssueList:"+notsetIssueList.get(0));
		    log.info("issueManualCode1:"+notsetIssueList.get(0).get("depth1_title"));
		    log.info("issueManualCode2:"+notsetIssueList.get(0).get("depth2_title"));
		    log.info("issueManualCode3:"+notsetIssueList.get(0).get("depth3_title"));
		    
		    params.put("issueManualCode1", notsetIssueList.get(0).get("depth1_title"));
		    params.put("issueManualCode2", notsetIssueList.get(0).get("depth2_title"));
		    params.put("issueManualCode3", notsetIssueList.get(0).get("depth3_title"));
		    mav.addObject("notsetIssueList", notsetIssueList.get(0)); // 잠재이슈는 1개만 있음.
		} else {
		    log.info("잠재이슈리스트 없음");
		    mav.addObject("notsetIssueList", new HashMap<>()); // 빈 객체 추가
		}
		ArrayList<HashMap> notsetIssueHistoryList = mainService.selectQuery("notsetSQL.selectIssueHistoryList",params); //잠재이슈 변경이력
		ArrayList<HashMap> notsetIssueCodeAtcFileList = mainService.selectQuery("jisangSQL.selectIssueCodeAtcFileList",params); //잠재이슈 대응 메뉴얼
		ArrayList<HashMap> notsetMemoList = mainService.selectQuery("commonSQL.selectMemoList",params); // 메모
		//ArrayList list4 = (ArrayList) Database.getInstance().queryForList("Json.selectNotsetRowDetail_Modify", params); // 변경이력

		mav.addObject("resultData",data.get(0)); // 기본정보
		mav.addObject("jijuk", jijuk);
		if (soujaList == null || soujaList.isEmpty()) { // 소유자 정보
		    mav.addObject("soujaList", new ArrayList<>());
		} else {
		    mav.addObject("soujaList", soujaList);
		}
		if (atcFileList == null || atcFileList.isEmpty()) { //첨부파일
			mav.addObject("atcFileList", new ArrayList<>());
		} else {
			Collections.reverse(atcFileList); // 등록일 기준으로 desc 정렬
			mav.addObject("atcFileList", atcFileList);
		}
		if (notsetModifyList == null || notsetModifyList.isEmpty()) { //변경이력
		    mav.addObject("notsetModifyList", new ArrayList<>());
		} else {
		    mav.addObject("notsetModifyList", notsetModifyList);
		}
		if (notsetPnuAtcFileList == null || notsetPnuAtcFileList.isEmpty()) { //필지 첨부파일
		    mav.addObject("notsetPnuAtcFileList", new ArrayList<>());
		} else {
			Collections.reverse(notsetPnuAtcFileList);
		    mav.addObject("notsetPnuAtcFileList", notsetPnuAtcFileList);
		}
		if (notsetIssueHistoryList == null || notsetIssueHistoryList.isEmpty()) { //잠재이슈 변경이력
		    mav.addObject("notsetIssueHistoryList", new ArrayList<>());
		} else {
		    mav.addObject("notsetIssueHistoryList", notsetIssueHistoryList);
		}
		mav.addObject("notsetIssueCodeAtcFileList",notsetIssueCodeAtcFileList);
		if (notsetIssueCodeAtcFileList == null || notsetIssueCodeAtcFileList.isEmpty()) { //잠재이슈 대응 메뉴얼
		    mav.addObject("notsetIssueCodeAtcFileList", new ArrayList<>());
		} else {
		    mav.addObject("notsetIssueCodeAtcFileList", notsetIssueCodeAtcFileList);
		}
		if (notsetMemoList == null || notsetMemoList.isEmpty()) { // 메모
		    mav.addObject("memoList", new ArrayList<>());
		} else {
		    mav.addObject("memoList", notsetMemoList);
		}
		mav.setViewName("content/notset/unsetOccupationDetails");
		
		//지도보기, 이동관련
		mav.addObject("jijukCoordList", coordinateVal);
		mav.addObject("jijukCoordSize", coordinateSize);
		
		return mav;
    }
	
	//송유관로현황-미설정/미점용 상세
	@GetMapping(path="/unsetOccupationDetails2") //http://localhost:8080/api/get/dbTest
    public ModelAndView unsetOccupationDetails2(HttpServletRequest httpRequest, HttpServletResponse response) throws Exception {
		ModelAndView mav=new ModelAndView();
		
		HashMap params = new HashMap();
		ArrayList<HashMap> list=new ArrayList<HashMap>();

		String idx = httpRequest.getParameter("idx");
		String index = httpRequest.getParameter("index");

		params.put("idx",idx);
		params.put("index",index);
		params.put("manage_no",idx);
		log.info("idx:"+idx);
		log.info("index:"+index);

		ArrayList<HashMap> data = mainService.selectQuery("notsetSQL.selectAllData",params); // 기본정보
		
		//241009
		List<String> coordinateVal = new ArrayList<>();
		Integer coordinateSize = 0;
		
		HashMap jijuk = new HashMap<>();
		jijuk.put("x", 0);
		jijuk.put("y", 0);
		
		if (data.size() > 0) {
			HashMap jijukParam = new HashMap<>();
			jijukParam.put("sido_nm", data.get(0).get("nm_sido_nm"));
			jijukParam.put("sgg_nm", data.get(0).get("nm_sgg_nm"));
			jijukParam.put("emd_nm", data.get(0).get("nm_emd_nm"));
			jijukParam.put("ri_nm", data.get(0).get("nm_ri_nm"));
			jijukParam.put("jibun", data.get(0).get("nm_jibun"));
			
			jijukParam.put("TARGET_PNU", data.get(0).get("nm_pnu"));

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
		
		ArrayList<HashMap> soujaList = mainService.selectQuery("notsetSQL.selectSoyujaData",params); //소유자
		ArrayList<HashMap> atcFileList = mainService.selectQuery("notsetSQL.selectAtcFileList",params); //첨부파일
		ArrayList<HashMap> notsetModifyList = mainService.selectQuery("notsetSQL.selectModifyList",params); //변경이력
		ArrayList<HashMap> notsetPnuAtcFileList = mainService.selectQuery("jisangSQL.selectPnuAtcFileList",params); // 필지 첨부파일
		
		params.put("pnu", data.get(0).get("nm_pnu"));
		log.info("pnu: " + data.get(0).get("nm_pnu"));
		ArrayList<HashMap> notsetIssueList = mainService.selectQuery("jisangSQL.selectIssueList",params); //잠재이슈
		log.info("jisangIssueList size:"+notsetIssueList.size());
		
		if (notsetIssueList != null && !notsetIssueList.isEmpty()) {
			log.info("jisangIssueList:"+notsetIssueList.get(0));
		    log.info("issueManualCode1:"+notsetIssueList.get(0).get("depth1_title"));
		    log.info("issueManualCode2:"+notsetIssueList.get(0).get("depth2_title"));
		    log.info("issueManualCode3:"+notsetIssueList.get(0).get("depth3_title"));
		    
		    params.put("issueManualCode1", notsetIssueList.get(0).get("depth1_title"));
		    params.put("issueManualCode2", notsetIssueList.get(0).get("depth2_title"));
		    params.put("issueManualCode3", notsetIssueList.get(0).get("depth3_title"));
		    mav.addObject("notsetIssueList", notsetIssueList.get(0)); // 잠재이슈는 1개만 있음.
		} else {
		    log.info("잠재이슈리스트 없음");
		    mav.addObject("notsetIssueList", new HashMap<>()); // 빈 객체 추가
		}
		ArrayList<HashMap> notsetIssueHistoryList = mainService.selectQuery("notsetSQL.selectIssueHistoryList",params); //잠재이슈 변경이력
		ArrayList<HashMap> notsetIssueCodeAtcFileList = mainService.selectQuery("jisangSQL.selectIssueCodeAtcFileList",params); //잠재이슈 대응 메뉴얼
		ArrayList<HashMap> notsetMemoList = mainService.selectQuery("commonSQL.selectMemoList",params); // 메모
		//ArrayList list4 = (ArrayList) Database.getInstance().queryForList("Json.selectNotsetRowDetail_Modify", params); // 변경이력

		mav.addObject("resultData",data.get(0)); // 기본정보
		mav.addObject("jijuk", jijuk);
		if (soujaList == null || soujaList.isEmpty()) { // 소유자 정보
		    mav.addObject("soujaList", new ArrayList<>());
		} else {
		    mav.addObject("soujaList", soujaList);
		}
		if (atcFileList == null || atcFileList.isEmpty()) { //첨부파일
			mav.addObject("atcFileList", new ArrayList<>());
		} else {
			Collections.reverse(atcFileList); // 등록일 desc
			mav.addObject("atcFileList", atcFileList);
		}
		if (notsetModifyList == null || notsetModifyList.isEmpty()) { //변경이력
		    mav.addObject("notsetModifyList", new ArrayList<>());
		} else {
		    mav.addObject("notsetModifyList", notsetModifyList);
		}
		if (notsetPnuAtcFileList == null || notsetPnuAtcFileList.isEmpty()) { //필지 첨부파일
		    mav.addObject("notsetPnuAtcFileList", new ArrayList<>());
		} else {
			Collections.reverse(notsetPnuAtcFileList); // 등록일 desc
		    mav.addObject("notsetPnuAtcFileList", notsetPnuAtcFileList);
		}
		if (notsetIssueHistoryList == null || notsetIssueHistoryList.isEmpty()) { //잠재이슈 변경이력
		    mav.addObject("notsetIssueHistoryList", new ArrayList<>());
		} else {
		    mav.addObject("notsetIssueHistoryList", notsetIssueHistoryList);
		}
		mav.addObject("notsetIssueCodeAtcFileList",notsetIssueCodeAtcFileList);
		if (notsetIssueCodeAtcFileList == null || notsetIssueCodeAtcFileList.isEmpty()) { //잠재이슈 대응 메뉴얼
		    mav.addObject("notsetIssueCodeAtcFileList", new ArrayList<>());
		} else {
		    mav.addObject("notsetIssueCodeAtcFileList", notsetIssueCodeAtcFileList);
		}
		if (notsetMemoList == null || notsetMemoList.isEmpty()) { // 메모
		    mav.addObject("memoList", new ArrayList<>());
		} else {
		    mav.addObject("memoList", notsetMemoList);
		}
		mav.setViewName("content/notset/unsetOccupationDetails2");
		
		//지도보기, 이동관련
		mav.addObject("jijukCoordList", coordinateVal);
		mav.addObject("jijukCoordSize", coordinateSize);
		
		return mav;
    }
	
	// 미설정/미점용 내역 수정
	@GetMapping(path="/notsetaddRevise") //http://localhost:8080/api/get/dbTest
    public ModelAndView notsetaddRevise(HttpServletRequest httpRequest, HttpServletResponse response) throws Exception {
		/*******************************/
		//받은 세션 Map으로 전환
		Map<String, Object> sessionMap = CommonUtil.requestSessionToMap(httpRequest);
		/*******************************/
		
		ModelAndView mav=new ModelAndView();

		HashMap params = new HashMap();
		params.put("LOGIN_JISA", (String)sessionMap.get("jisa"));    //지사정보 param에 싣기
		String idx = httpRequest.getParameter("idx");
		String index = httpRequest.getParameter("index");

		params.put("idx",idx);
		params.put("index",index);
		params.put("manage_no",idx);
		log.info("idx:"+idx);
		log.info("index:"+index);
		
		// commonSQL - UI 구성 목적
		ArrayList<HashMap> jisalist = mainService.selectQuery("commonSQL.selectAllJisaList",params);
		ArrayList<HashMap> yongdolist = mainService.selectQuery("commonSQL.selectYongdoList",params);
		ArrayList<HashMap> jimoklist = mainService.selectQuery("commonSQL.selectJimokList",params);
		ArrayList<HashMap> sidolist = mainService.selectQuery("commonSQL.getSidoMaster",params);
		// notsetSQL - DB 조회,화면 출력 목적
		ArrayList<HashMap> data = mainService.selectQuery("notsetSQL.selectAllData",params);
		ArrayList<HashMap> soujaList = mainService.selectQuery("notsetSQL.selectSoyujaData",params);
		ArrayList<HashMap> atcFileList = mainService.selectQuery("notsetSQL.selectAtcFileList",params);
		log.info("atcFileList: "+atcFileList);
		ArrayList<HashMap> notsetModifyList = mainService.selectQuery("notsetSQL.selectModifyList",params);
//			ArrayList<HashMap> notsetMergeList = mainService.selectQuery("notsetSQL.selectMergeList",params);
		params.put("pnu", data.get(0).get("nm_pnu"));
		ArrayList<HashMap> notsetIssueList = mainService.selectQuery("jisangSQL.selectIssueList",params);
		if (notsetIssueList.size()>0) {
			params.put("issueManualCode1", notsetIssueList.get(0).get("pi_code_depth1"));
			params.put("issueManualCode2", notsetIssueList.get(0).get("pi_code_depth2"));
			params.put("issueManualCode3", notsetIssueList.get(0).get("pi_code_depth3"));
		}
		ArrayList<HashMap> notsetIssueCodeAtcFileList = mainService.selectQuery("jisangSQL.selectIssueCodeAtcFileList",params);
		ArrayList<HashMap> notsetIssueHistoryList = mainService.selectQuery("notsetSQL.selectIssueHistoryList",params);
		ArrayList<HashMap> notsetPnuAtcFileList = mainService.selectQuery("jisangSQL.selectPnuAtcFileList",params);
		ArrayList<HashMap> notsetMemoList = mainService.selectQuery("commonSQL.selectMemoList",params);
		log.info("data:"+data.get(0));
		mav.addObject("jisaList",jisalist);
		mav.addObject("resultYongdoList",yongdolist);
		mav.addObject("resultJimokList",jimoklist);
		mav.addObject("sidoList",sidolist);
		
		mav.addObject("resultData",data.get(0));
		mav.addObject("soujaList",soujaList);
		mav.addObject("atcFileList",atcFileList);
//			mav.addObject("notsetPermitList",notsetPermitList);
		mav.addObject("notsetModifyList",notsetModifyList);
//			mav.addObject("notsetMergeList",notsetMergeList);
		mav.addObject("notsetIssueList",notsetIssueList);
		mav.addObject("jisangIssueCodeAtcFileList",notsetIssueCodeAtcFileList);
		mav.addObject("notsetIssueHistoryList",notsetIssueHistoryList);
		mav.addObject("notsetPnuAtcFileList",notsetPnuAtcFileList);
		// mav.addObject("memoList",notsetMemoList.get(0));
		//241006 - 지사정보 추가
		mav.addObject("loginJisa", (String)sessionMap.get("jisa"));
		// null 체크 및 사이즈 확인
		if (notsetMemoList != null && !notsetMemoList.isEmpty()) {
		    mav.addObject("memoList", notsetMemoList.get(0));
		} else {
		    mav.addObject("memoList", new HashMap());  // 빈 값을 넘겨줌
		}
		log.info("jisalist:"+jisalist);
	
		mav.setViewName("content/songyu/notsetaddRevise");
		return mav;
    }
	
	
	@RequestMapping(value = "/fileUpload/post") //ajax에서 호출하는 부분
    @ResponseBody
    public HashMap upload(MultipartHttpServletRequest multipartRequest) { //Multipart로 받는다.
         
        Iterator<String> itr =  multipartRequest.getFileNames();
        
        String filePath = GC.getNotsetFileTempDir(); //설정파일로 뺀다.
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

	 @RequestMapping(value = "/deleteNotsetAtcFile", method = { RequestMethod.GET, RequestMethod.POST })
	    public void deleteNotsetAtcFile(HttpServletRequest httpRequest, HttpServletResponse response) throws Exception {

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
	            
	            mainService.DeleteQuery("notsetSQL.deleteNotsetAtcFile", params);

	            // 파일 삭제 부분.
	            // 파일 경로 생성
	            String filePath = GC.getNotsetFileDataDir()+"/"+jsonObject.get("notset_no");
	            ; // 설정파일로 뺀다.
	            String originalFilename = jsonObject.get("filename").toString();
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

}
