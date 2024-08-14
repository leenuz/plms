package com.slsolution.plms.notset;

import java.util.ArrayList;
import java.util.HashMap;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.EnableAsync;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.ModelAndView;

import com.slsolution.plms.MainService;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@EnableAsync
@RequiredArgsConstructor
@RestController
@RequestMapping("/notset")
@CrossOrigin(origins="*",allowedHeaders="*")
public class notsetController {
	
	@Autowired
	private MainService mainService;
	
	
	//unsetOccupationDetails
		@GetMapping(path="/unsetOccupationDetails") //http://localhost:8080/api/get/dbTest
	    public ModelAndView unsetOccupationDetails(HttpServletRequest httpRequest, HttpServletResponse response) throws Exception {
			ModelAndView mav=new ModelAndView();
			

			HashMap params = new HashMap();
			ArrayList<HashMap>  list=new ArrayList<HashMap>();

			String idx = httpRequest.getParameter("idx");
			String index = httpRequest.getParameter("index");

			params.put("idx",idx);
			params.put("index",index);
			params.put("manage_no",idx);
			log.info("idx:"+idx);
			log.info("index:"+index);


			ArrayList<HashMap> data = mainService.selectQuery("notsetSQL.selectAllData",params);
			ArrayList<HashMap> soujaList = mainService.selectQuery("notsetSQL.selectSoyujaData",params);
			ArrayList<HashMap> atcFileList = mainService.selectQuery("notsetSQL.selectAtcFileList",params);

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
			mav.addObject("memoList",notsetMemoList);

	      			mav.setViewName("content/notset/unsetOccupationDetails");
	      			return mav;
	    }


}
