package com.slsolution.plms.controller;

import java.io.InputStream;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Properties;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Controller;

import com.slsolution.plms.CommonUtil;
import com.slsolution.plms.MainService;
import com.slsolution.plms.config.GlobalConfig;

import jakarta.annotation.PostConstruct;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Component
@EnableScheduling 
public class SchedulerController {
	 @Autowired
		private MainService mainService;
	 @Autowired
	 private GlobalConfig GC;

	 
	 // 한번만 실행되도록 제어할 플래그 변수
	    private boolean hasRun = false;
	 
	 

	    
	    @PostConstruct
	    public void init() throws Exception {
	        if ("LOCAL".equalsIgnoreCase(GC.getServerName())) {
	            System.out.println("LOCAL 환경에서 jobs() 메서드를 한 번 실행");
	            jobs(); // 한 번만 실행
	        }
	    }

	    @Scheduled(fixedRate = 5000)
	    public void scheduledJobs() throws Exception {
	        if ("DEV".equalsIgnoreCase(GC.getServerName()) || "LIVE".equalsIgnoreCase(GC.getServerName()) ) {
	            jobs(); // 5초마다 실행
	        }
	    }
	    
	    

	public void jobs() throws Exception {
		
		if (!hasRun || "DEV".equalsIgnoreCase(GC.getServerName()) || "LIVE".equalsIgnoreCase(GC.getServerName())) {
            System.out.println("jobs() 메서드 실행 중...");
            // 실제 실행할 작업 추가
            hasRun = true; // LOCAL 환경에서는 첫 실행 후 플래그를 설정해 반복 방지
        }
		
//		System.out.println(System.currentTimeMillis());
		System.out.println("스케줄러 정상작동 확인용입니다.");
		// 1. 해지 상신건 완료내용 조회
		
		
		
		
		HashMap param=new HashMap();
		ArrayList<HashMap> terminationList = (ArrayList<HashMap>) mainService.selectQuery("jisangSQL.selectApprovalTermination",param);
		System.out.println("terminationList.size()="+terminationList.size());
		// 1.1 해지 상신건 결재처리된 건에 대하여 처리
		for (HashMap targetMap : terminationList) {
			try {
				//Database.getInstance().startTransaction();
				
				HashMap params = new HashMap();
				params.put("JISANG_NO", targetMap.get("jisang_no"));
				params.put("JISANGNO", targetMap.get("jisang_no"));
				params.put("ADDRCODE", targetMap.get("addrcode"));
				params.put("JIBUN", targetMap.get("jibun"));
				params.put("PNU", targetMap.get("pnu"));

				params.put("CANCLE_YN", "Y");
				params.put("CANCLE_STATUS", "해지완료");
				params.put("CANCLE_DATE", targetMap.get("cancle_date"));
				params.put("CANCLE_EMPCD", targetMap.get("cancle_empcd"));
				params.put("CANCLE_NAME", targetMap.get("cancle_name"));

				mainService.UpdateQuery("jisangSQL.UpdateJisangCancleDate", params);
				mainService.UpdateQuery("jisangSQL.UpdateJisangCancleYN", params);

				// 지적 지상권 해지
				params.put("JISANGNO", targetMap.get("JISANG_NO"));
				mainService.UpdateQuery("commonSQL.updateJijukMasterStatus", params);

				// 잠재이슈 삭제.
				params.put("DEL_COMMENT", "지상권해지에 의한 삭제");
				System.out.println(params);
				mainService.UpdateQuery("jisangSQL.deletePnuIssueForPnu", params);	// 플래그 업데이트
				mainService.DeleteQuery("jisangSQL.deletePnuIssueForPnuReal", params); // DELETE로 변경
				mainService.DeleteQuery("jisangSQL.deletePnuIssueHistory", params); // 잠재이슈 내역도 삭제 

//				//해지후 미설정,미점용으로 등록
//				HashMap dataMap = new HashMap();
//				dataMap = (HashMap) Database.getInstance().queryForObject("Json.selectJisangRowDetail_KibonInfo", params);
//
//				ArrayList NotsetList = (ArrayList) Database.getInstance().queryForList("Json.selectNotsetNextNo", null);
//				String Next_notsetNo = String.valueOf(Integer.parseInt((String) ((HashMap) NotsetList.get(0)).get("NOW_NOTSETNO")) + 1);
//				int n_Next_notsetNo = Next_notsetNo.length();
//
//				String add_Zero = "";
//				for (int i = 0; i < (6 - n_Next_notsetNo); i++) {
//					add_Zero += "0";
//				}
//				Next_notsetNo = "N_" + add_Zero + Next_notsetNo;
//
//				dataMap.put("NOTSET_NO", Next_notsetNo);
//				Database.getInstance().insert("Json.insertNotsetMaster", dataMap);
//				dataMap.put("STATUS", "NOTSET");
//				dataMap.put("JISANGNO", Next_notsetNo);
//				Database.getInstance().update("Json.updateTogiJisang_Status", dataMap);

				//Database.getInstance().commitTransaction();

			} catch (Exception e) {
				e.printStackTrace();
			} finally {
				//Database.getInstance().endTransaction();
			}
		}

//		// 2. 분할 상신건 결재완료내용 조회
		ArrayList<HashMap> bunhalTargetList = (ArrayList<HashMap>) mainService.selectQuery("jisangSQL.selectApprovalbunhal",null);
//		System.out.println("bunhalTargetList.size()="+bunhalTargetList.size());
		// 2.1 분할 결재완료건 처리
		int testSize = 0;
		for (HashMap targetMap : bunhalTargetList) {
			try {
				System.out.println("testSize="+testSize);
				System.out.println("targetMap="+targetMap.toString());
				testSize++;
				
				//Database.getInstance().startTransaction();
				/**
				 * 1. 분할 데이터 조회
				 **/

				CommonUtil comm = new CommonUtil();
				HashMap params = new HashMap();
				params.put("BUNHALYN", "Y");
				params.put("JISANGNO", targetMap.get("JISANG_NO"));
				ArrayList<HashMap> ori_list = (ArrayList<HashMap>) mainService.selectQuery("jisangSQL.selectJisangDetailListNew", params);
				ArrayList<HashMap> soyu_list = (ArrayList<HashMap>) mainService.selectQuery("jisangSQL.selectJisangDetailSoyu", params);
				params.put("BUNHAL_ORG_NO", targetMap.get("JISANG_NO"));
				ArrayList<HashMap> bunhal_list = (ArrayList<HashMap>) mainService.selectQuery("jisangSQL.selectJisangBunhalTmpList", params);

				// 분할대상 잠재이슈 조회
				ArrayList<HashMap> potentialIssue_list = (ArrayList<HashMap>) mainService.selectQuery("commonSQL.selectPnuIssue", targetMap);

				// 분할대상 모지번 첨부파일 정보 조회
				params.put("FILENO", targetMap.get("JISANG_NO"));
				//ArrayList<HashMap<String, String>> attachList = (ArrayList<HashMap<String, String>>) mainService.selectQuery("jisangSQL.selectJisangRowDetail_Files", params);
				// 반환된 리스트를 개별 요소에 대해 캐스팅
				ArrayList<HashMap<String, String>> attachList = new ArrayList<>();
				List<HashMap> resultList = (List<HashMap>) mainService.selectQuery("jisangSQL.selectJisangRowDetail_Files", params);

				for (HashMap map : resultList) {
				    attachList.add((HashMap<String, String>) map);
				}

				/**
				 * 2. 신규 데이터 생성
				 **/
				int demiseCount = 0;
				// 자료승계여부 선택과 무관하게 전부 자료 승계되도록 바꾸면서 의미가 없어졌음.
				demiseCount = bunhal_list.size();
//				for (int i = 0; i < bunhal_list.size(); i++) {
//					if ("Y".equals(bunhal_list.get(i).get("DEMISE"))) {
//						demiseCount += 1;
//					}
//				}
				
				// 모지번 정보 승계용 ; 모지번은 없을 수 없음.
				String YONGDO = comm.nvl((String) ori_list.get(0).get("yongdo"));
				String SUN_GUBUN = comm.nvl((String) ori_list.get(0).get("sun_gubun"));
				String CANCLE_YN = comm.nvl((String) ori_list.get(0).get("cancle_yn"));
				String DOSIPLAN = comm.nvl((String) ori_list.get(0).get("dosiplan"));
				String COMPLE_YN = comm.nvl((String) ori_list.get(0).get("comple_yn"));
				String USE_STATE = comm.nvl((String) ori_list.get(0).get("use_state"));
				String DEUNGGI_NO = comm.nvl((String) ori_list.get(0).get("deunggi_no"));
				String DEUNGGISO = comm.nvl((String) ori_list.get(0).get("deunggiso"));
				String DEUNGGI_DATE = comm.nvl((String) ori_list.get(0).get("deunggi_date"));
				String CHUIDEUK_DATE = comm.nvl((String) ori_list.get(0).get("chuideuk_date"));
				String PIPE_NAME = comm.nvl((String) ori_list.get(0).get("pipe_name"));
				String LOCATION = comm.nvl((String) ori_list.get(0).get("location"));
				String SPECIAL_CONT = comm.nvl((String) ori_list.get(0).get("special_cont"));
				String PERMITTED_YN = comm.nvl((String) ori_list.get(0).get("permitted_yn"));
				
				System.out.println("bunhal_list.size()="+bunhal_list.size());
				for (int i = 0; i < bunhal_list.size(); i++) {
					System.out.println("bunhal_list.get(i)="+bunhal_list.get(i).toString());

					if ("N".equals(bunhal_list.get(i).get("jb_cancle_yn"))) {
//						if (i > 0 && "N".equals(bunhal_list.get(i).get("DEMISE"))) {
						if (i > 0 ) {
							String modifyReason = "";
							String modifyReason2 = "";

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

							String sidonm = comm.nvl((String) bunhal_list.get(i).get("jb_sido_nm"));
							String gungunm = comm.nvl((String) bunhal_list.get(i).get("jb_sgg_nm"));
							String dongnm = comm.nvl((String) bunhal_list.get(i).get("jb_emd_nm"));
							String rinm = comm.nvl((String) bunhal_list.get(i).get("jb_ri_nm"));
							String jibun = comm.nvl((String) bunhal_list.get(i).get("jb_jibun"));
							String pnu = comm.nvl((String) bunhal_list.get(i).get("jb_pnu"));
							String jijukarea = comm.evl(bunhal_list.get(i).get("jb_jijuk_area").toString(), "0");
							String pyeonibarea = comm.evl((String) bunhal_list.get(i).get("jb_pyeonib_area").toString(), "0");
							String jasanNo = comm.evl((String) bunhal_list.get(i).get("jb_jasan_no"), "0");
							String ADDRCODE = comm.nvl((String) bunhal_list.get(i).get("jb_addrcode"));
							String jisanm = comm.nvl((String) bunhal_list.get(i).get("jb_jisa"));
							String goverownyn = comm.nvl((String) bunhal_list.get(i).get("jb_gover_own_yn"));
							String jimoktext = comm.nvl((String) bunhal_list.get(i).get("jb_jimok_text"));
							String pipe_yn = comm.nvl((String) bunhal_list.get(i).get("jb_pipe_yn"));

							modifyReason += comm.nvl((String) bunhal_list.get(0).get("jb_sido_nm")) + " ";
							modifyReason += comm.nvl((String) bunhal_list.get(0).get("jb_sgg_nm")) + " ";
							modifyReason += comm.nvl((String) bunhal_list.get(0).get("jb_emd_nm")) + " ";
							modifyReason += comm.nvl((String) bunhal_list.get(0).get("jb_ri_nm")) + " ";
							modifyReason += comm.nvl((String) bunhal_list.get(0).get("jb_jibun")) + " ";
							modifyReason += "(지상권 번호:" + comm.nvl((String) bunhal_list.get(0).get("js_jisang_no")) + ")에서";

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
							if (!targetMap.get("JISANG_NO").equals(""))
								modifyReason2 += "(지상권 번호:" + Next_jisangNo + ")으로 분할";
							
							/**
							 * TODO
							 * 지목, 지적면적, 편입면적, 자산분류번호, 변경이력제외 모든정보(잠재이슈포함)승계
							 * 
							 * 분할된 지번의 변경이력은 분할된 이력만 자동입력
							 */

							Addparams.put("STATUS", "JISANG");
							// 모지번 승계
							Addparams.put("JISANGNO", Next_jisangNo);
							Addparams.put("SINM", sidonm);
							Addparams.put("GUNGUNM", gungunm);
							Addparams.put("DONGNM", dongnm);
							Addparams.put("RINM", rinm);
							Addparams.put("JISANM", jisanm);
							Addparams.put("JIBUN", jibun);
							Addparams.put("JIMOKTEXT", jimoktext); // 지목 제외
//							Addparams.put("JIMOKTEXT", ""); // 지목 제외
							Addparams.put("ADDRCODE", ADDRCODE);
							Addparams.put("YONGDO", YONGDO);
							Addparams.put("ZONE", PIPE_NAME);
							Addparams.put("SUNGUBUN", SUN_GUBUN);
							Addparams.put("PNU", pnu);
							Addparams.put("JIJUKAREA", jijukarea); // 지적면적 제외
//							Addparams.put("JIJUKAREA", ""); // 지적면적 제외
							Addparams.put("COMPLEYN", COMPLE_YN);
							Addparams.put("DGSTARTDAY", DEUNGGI_DATE);
							Addparams.put("DEUNGGINO", DEUNGGI_NO);
							Addparams.put("DEUNGGISO", DEUNGGISO);
							Addparams.put("PYEONIBAREA", pyeonibarea); // 분할 입력칸에서 가져옴.
//							Addparams.put("PYEONIBAREA", ""); // 편입면적 제외
							Addparams.put("USESTATE", USE_STATE);
							Addparams.put("DOSIPLAN", DOSIPLAN);
							Addparams.put("TOJANO", "");
							Addparams.put("JASANNO", jasanNo); // 분할 입력칸에서 가져옴.
//							Addparams.put("JASANNO", ""); // 자산분류번호 제외
							Addparams.put("GOVEROWNYN", goverownyn);
							Addparams.put("CHUIDEUK_DATE", CHUIDEUK_DATE);
							Addparams.put("COMPLE_YN", COMPLE_YN);
							Addparams.put("LOCATION", LOCATION);
							Addparams.put("SPECIAL_CONT", SPECIAL_CONT);
							Addparams.put("PERMITTED_YN", PERMITTED_YN);
							Addparams.put("PIPE_YN", pipe_yn);

							Addparams.put("BUNHALORGNO", targetMap.get("JISANG_NO")); // 기존
							// 지상권번호

							Addparams.put("GUBUN", "분할");
							Addparams.put("SAVE_STATUS", "승인");
							Addparams.put("USER_ID", targetMap.get("USER_ID"));
							Addparams.put("USER_NAME", targetMap.get("USER_NAME"));
							Addparams.put("CONT", modifyReason + modifyReason2);
							System.out.println(Addparams.toString());
							mainService.InsertQuery("jisangSQL.insertJisangBunhalMasterNew", Addparams); // 기본정보 저장
							mainService.InsertQuery("jisangSQL.insertJisangModifyHistory", Addparams); // 변경이력 등록

							// 첨부파일 신규등록
							for (HashMap<String, String> attachMap : attachList) {
								System.out.println(attachMap.toString());
								attachMap.put("JISANGNO", Next_jisangNo);
								mainService.UpdateQuery("jisangSQL.insertJisangFile", attachMap);
							}

							// 지적 등록
							if (!"99999".equals(pnu) || !"NULL".equals(pnu)) {
								mainService.UpdateQuery("songyuSQL.updateTogiJisang_Status", Addparams);
							}

							// 분할대상 토지임. 신규등록하는게 맞음.
							// 잠재이슈 등록
							for (HashMap issueMap : potentialIssue_list) {
								String issueSeq = (String) mainService.selectStringQuery("songyuSQL.makePnuIssueSeq",null);
								issueMap.put("SEQ", issueSeq);
								if("99999".equals(pnu) || "null".equals(pnu) || "NULL".equals(pnu)) {
									pnu = "";
								}
								issueMap.put("PNU", pnu);
								issueMap.put("ADDRCODE", ADDRCODE);
								issueMap.put("JIBUN", jibun);
								mainService.UpdateQuery("jisangSQL.insertPnuIssue", issueMap);
							}
							
							// 소유자 등록
							if(soyu_list != null && !soyu_list.isEmpty()) {
								for( HashMap<String, String> soyuMap : soyu_list) {
									soyuMap.put("JISANGNO", Next_jisangNo);
									soyuMap.put("NAME", soyuMap.get("SOUJA_NAME"));
									soyuMap.put("ADDR", soyuMap.get("ADDRESS"));
									soyuMap.put("HOME_NUMBER", soyuMap.get("HOME_NUMBER"));
									soyuMap.put("PHNE_NUMBER", soyuMap.get("PONE_NUMBER"));
									mainService.UpdateQuery("jisangSQL.insertJisangSoyu", soyuMap);
								}
							}

						} else {
							HashMap<String, String> param1 = new HashMap<String, String>();
							param1.put("SIDO_NM", String.valueOf(bunhal_list.get(i).get("jb_sido_nm")));
							param1.put("SGG_NM", String.valueOf(bunhal_list.get(i).get("jb_sgg_nm")));
							param1.put("EMD_NM", String.valueOf(bunhal_list.get(i).get("jb_emd_nm")));
							param1.put("RI_NM", String.valueOf(bunhal_list.get(i).get("jb_ri_nm")));
							param1.put("JIBUN", String.valueOf(bunhal_list.get(i).get("jb_jibun")));
							param1.put("ADDRCODE", String.valueOf(bunhal_list.get(i).get("jb_addrcode")));
							param1.put("PYEONIB_AREA", String.valueOf(bunhal_list.get(i).get("jb_pyeonib_area")));
							param1.put("JASAN_NO", String.valueOf(bunhal_list.get(i).get("jb_jasan_no")));
							param1.put("PNU", String.valueOf(bunhal_list.get(i).get("jb_pnu")));
							param1.put("JIJUK_AREA", String.valueOf(bunhal_list.get(i).get("jb_jijuk_area")));
							param1.put("JIMOK_TEXT", String.valueOf(bunhal_list.get(i).get("jb_jimok_text")));
//							System.out.println("param.toString() :: " + param.toString());

							param.put("orgJisnagNo", String.valueOf(bunhal_list.get(0).get("jb_jisang_no")));
							mainService.UpdateQuery("jisangSQL.updateJisangJibun", param);

							// 승계지번 지적에 등록
							param1.put("STATUS", "JISANG");
							param1.put("JISANGNO", String.valueOf(bunhal_list.get(0).get("jb_jisang_no")));
							param1.put("JASANNO", String.valueOf(bunhal_list.get(0).get("jb_jasan_no")));
							param1.put("PNU", String.valueOf(bunhal_list.get(i).get("jb_pnu")));
							mainService.UpdateQuery("songyuSQL.updateTogiJisang_Status", param1);

							// 모지번임. 잠재이슈 등록할 필요가 없음.
//							// 잠재이슈 등록
//							for (HashMap issueMap : potentialIssue_list) {
//								String issueSeq = (String) Database.getInstance().queryForObject("Json.makePnuIssueSeq");
//								issueMap.put("SEQ", issueSeq);
//								issueMap.put("PNU", String.valueOf(bunhal_list.get(i).get("PNU")));
//								issueMap.put("ADDRCODE", String.valueOf(bunhal_list.get(i).get("ADDRCODE")));
//								issueMap.put("JIBUN", String.valueOf(bunhal_list.get(i).get("JIBUN")));
//								Database.getInstance().update("Json.insertPnuIssue", issueMap);
//							}
						}

//							if("Y".equals(bunhal_list.get(0).get("CANCLE_YN")) && demiseCount == 1){
//								HashMap<String,String> param = new HashMap<String,String>();
//								param.put("SIDO_NM", String.valueOf(bunhal_list.get(i).get("SIDO_NM")));
//								param.put("SGG_NM", String.valueOf(bunhal_list.get(i).get("SGG_NM")));
//								param.put("EMD_NM", String.valueOf(bunhal_list.get(i).get("EMD_NM")));
//								param.put("RI_NM", String.valueOf(bunhal_list.get(i).get("RI_NM")));
//								param.put("JIBUN", String.valueOf(bunhal_list.get(i).get("JIBUN")));
//								param.put("ADDRCODE", String.valueOf(bunhal_list.get(i).get("ADDRCODE")));
//								param.put("PNU", String.valueOf(bunhal_list.get(i).get("PNU")));
//								param.put("JIJUK_AREA", String.valueOf(bunhal_list.get(i).get("JIJUK_AREA")));
//								param.put("JIMOK_TEXT", String.valueOf(bunhal_list.get(i).get("JIMOK_TEXT")));
//								System.out.println("param.toString() :: " + param.toString());
//								
//								param.put("orgJisnagNo", String.valueOf(bunhal_list.get(0).get("JISANG_NO")));
//								Database.getInstance().update("Json.updateJisangJibun", param);
//								
//								//승계지번 지적에 등록
//								param.put("STATUS","JISANG");
//								param.put("JISANGNO",String.valueOf(bunhal_list.get(0).get("JISANG_NO")));
//								param.put("JASANNO",String.valueOf(bunhal_list.get(0).get("JASAN_NO")));
//								param.put("PNU", String.valueOf(bunhal_list.get(i).get("PNU")));
//								Database.getInstance().update("Json.updateTogiJisang_Status", param);
//								
//							}

						// 미설정에 등록되어 있을경우 정보 삭제
						HashMap<String, String> notsetDelParams = new HashMap<String, String>();
						notsetDelParams.put("SIDO_NM", String.valueOf(bunhal_list.get(i).get("jb_sido_nm"))); // 시도
						notsetDelParams.put("SGG_NM", String.valueOf(bunhal_list.get(i).get("jb_sgg_nm"))); // 시군구
						notsetDelParams.put("EMD_NM", String.valueOf(bunhal_list.get(i).get("jb_emd_nm"))); // 읍면동
						notsetDelParams.put("RI_NM", CommonUtil.nvl(String.valueOf(bunhal_list.get(i).get("jb_ri_nm")))); // 동리
						notsetDelParams.put("JIBUN", String.valueOf(bunhal_list.get(i).get("jb_jibun"))); // 지번
						HashMap<String, String> dataMap = (HashMap<String, String>) mainService.selectHashmapQuery("jisangSQL.selectNotsetObject", notsetDelParams);

						if (dataMap != null) {
							notsetDelParams.put("NOTSET_NO", dataMap.get("notset_no"));
							mainService.UpdateQuery("notsetSQL.deleteNotsetMaster", notsetDelParams);
						}
					} else {
						// 모지번 해지경우 지상권 해지 처리
						if (i == 0 && "Y".equals(bunhal_list.get(0).get("jb_cancle_yn")) && demiseCount != 1) {
							HashMap<String, String> param2 = new HashMap<String, String>();
							param2.put("JISANG_NO", comm.nvl((String) bunhal_list.get(0).get("jb_jisang_no")));
							param2.put("CANCLE_YN", "Y");
							mainService.UpdateQuery("jisangSQL.UpdateJisangCancleYN", param2);
							
							/**
							 * 지적마스터 해지처리. 지상권번호기반 삭제처리 진행.
							 */
							param2.put("JISANGNO", comm.nvl((String) bunhal_list.get(0).get("jb_jisang_no")));
							mainService.UpdateQuery("commonSQL.updateJijukMasterStatus", param2);

							// 잠재이슈 삭제.
							param2.put("PNU", comm.nvl((String) bunhal_list.get(0).get("jb_pnu")));
							param2.put("JIBUN", comm.nvl((String) bunhal_list.get(0).get("jb_jibun")));
							param2.put("ADDRCODE", comm.nvl((String) bunhal_list.get(0).get("jb_addrcode")));
							param2.put("DEL_COMMENT", "지상권해지에 의한 삭제");
							mainService.UpdateQuery("jisangSQL.deletePnuIssueForPnu", param2);
						}

//						//해지후 미설정,미점용으로 등록
//						Map Addparams = new HashMap();
//						String sidonm = comm.nvl((String) bunhal_list.get(i).get("SIDO_NM"));
//						String gungunm = comm.nvl((String) bunhal_list.get(i).get("SGG_NM"));
//						String dongnm = comm.nvl((String) bunhal_list.get(i).get("EMD_NM"));
//						String rinm = comm.nvl((String) bunhal_list.get(i).get("RI_NM"));
//						String jibun = comm.nvl((String) bunhal_list.get(i).get("JIBUN"));
//						String pnu = comm.nvl((String) bunhal_list.get(i).get("PNU"));
//						String jijukarea = comm.evl(bunhal_list.get(i).get("JIJUK_AREA").toString(), "0");
//						String pyeonibarea = comm.evl((String) bunhal_list.get(i).get("PYEONIB_AREA").toString(), "0");
//						String jasanNo = comm.evl((String) bunhal_list.get(i).get("JASAN_NO"), "0");
//						String ADDRCODE = comm.nvl((String) bunhal_list.get(i).get("ADDRCODE"));
//						String jisanm = comm.nvl((String) bunhal_list.get(i).get("JISA"));
//						String goverownyn = comm.nvl((String) bunhal_list.get(i).get("GOVER_OWN_YN"));
//						String jimoktext = comm.nvl((String) bunhal_list.get(i).get("JIMOK_TEXT"));
//
//						Addparams.put("STATUS", "NOTSET");
//						Addparams.put("SIDO_NM", sidonm);
//						Addparams.put("SGG_NM", gungunm);
//						Addparams.put("EMD_NM", dongnm);
//						Addparams.put("RI_NM", rinm);
//						Addparams.put("JISA", jisanm);
//						Addparams.put("JIBUN", jibun);
//						Addparams.put("JIJUK_AREA", jijukarea);
//						Addparams.put("JIMOK_TEXT", jimoktext);
//						Addparams.put("ADDRCODE", ADDRCODE);
//						Addparams.put("PNU", pnu);
//						Addparams.put("GOVER_OWN_YN", goverownyn);
//
//						//해지 미설정 등록시 이미 미설정에 등록된 경우 추가하지 않음
//						HashMap<String, String> notsetDelParams = new HashMap<String, String>();
//						HashMap<String, String> dataMap = (HashMap<String, String>) Database.getInstance().queryForObject("Json.selectNotsetObject", Addparams);
//						if (dataMap == null) {
//							ArrayList NotsetList = (ArrayList) Database.getInstance().queryForList("Json.selectNotsetNextNo", null);
//							String Next_notsetNo = String.valueOf(Integer.parseInt((String) ((HashMap) NotsetList.get(0)).get("NOW_NOTSETNO")) + 1);
//							int n_Next_notsetNo = Next_notsetNo.length();
//
//							String add_Zero = "";
//							for (int j = 0; j < (6 - n_Next_notsetNo); j++) {
//								add_Zero += "0";
//							}
//							Next_notsetNo = "N_" + add_Zero + Next_notsetNo;
//
//							Addparams.put("NOTSET_NO", Next_notsetNo);
//							Database.getInstance().insert("Json.insertNotsetMaster", Addparams);
//							Addparams.put("STATUS", "NOTSET");
//							Addparams.put("JISANGNO", Next_notsetNo);
//							Database.getInstance().update("Json.updateTogiJisang_Status", Addparams);
//						}

					}
				}
				HashMap map = new HashMap();
				map.put("JISANGNO", targetMap.get("JISANG_NO"));
				mainService.DeleteQuery("jisangSQL.deleteJisangBunhalTmp", map); // 임시저장 삭제 -->> 완료처리
//				Database.getInstance().update("Json.completeJisangBunhalTmp", map); // 임시저장 삭제 -->> 완료처리 // 삭제에서 플래그 완료처리로 변경. 기록확인을 위한 기능변경.

				//Database.getInstance().commitTransaction();
			} catch (Exception e) {
				e.printStackTrace();
			} finally {
				//Database.getInstance().endTransaction();
			}
		}
//		
//		// 3. 합필 상신건 결재완료내용 조회
		ArrayList<HashMap> mergeTargetList = (ArrayList<HashMap>) mainService.selectQuery("jisangSQL.selectApprovalmerge",null);
		// 3.1. 합필 결재완료건 처리
		for (HashMap targetMap : mergeTargetList) {
			try {

				//Database.getInstance().startTransaction();
				HashMap hparam = new HashMap();
				String REP_JISANG_NO = (String) targetMap.get("rep_jisang_no");

				// 대표필지 합필정보
				hparam.put("JISANG_NO", REP_JISANG_NO);
				HashMap<String, String> mainJisangMap = (HashMap<String, String>) mainService.selectHashmapQuery("jisangSQL.selectJisangMergeSaveList", hparam);

				// 임시저장된 합필정보
				hparam.put("JISANG_NO", null);
				hparam.put("REP_JISANG_NO", REP_JISANG_NO);
				//ArrayList<HashMap<String, String>> targetList = (ArrayList<HashMap<String, String>>) mainService.selectQuery("Json.selectJisangMergeSaveList", hparam);
				List<HashMap> resultList = (List<HashMap>) mainService.selectQuery("jisangSQL.selectJisangMergeSaveList", hparam);
				ArrayList<HashMap<String, String>> targetList = new ArrayList<>();

				for (HashMap map : resultList) {
				    targetList.add((HashMap<String, String>) map);
				}

				for (HashMap<String, String> datas : targetList) {

					// 합필 등록시 수정했던 내용 지상 마스터에서 수정
					mainService.UpdateQuery("jisangSQL.updateMergeJisangMaster", datas);

					// 대표지상권이 아닌 기존 지상권 정보를 삭제처리하고 지상권 합필정보 관리 테이블에 삽입한다.
					if ("N".equals(datas.get("MAIN_FLAG"))) {
						datas.put("REP_JISANG_NO", (String) targetMap.get("rep_jisang_no")); // 대표지상권 정보
						mainService.InsertQuery("jisangSQL.insertJisangMerge", datas);

						datas.put("JISANG_NO", datas.get("jisang_no")); // 삭제 지상권 번호

//						// 해지후 미설정,미점용으로 등록
//						HashMap dataMap = new HashMap();
//						dataMap = (HashMap) Database.getInstance().queryForObject("Json.selectJisangRowDetail_KibonInfo", datas);
//						ArrayList NotsetList = (ArrayList) Database.getInstance().queryForList("Json.selectNotsetNextNo", null);
//						String Next_notsetNo = String.valueOf(Integer.parseInt((String) ((HashMap) NotsetList.get(0)).get("NOW_NOTSETNO")) + 1);
//						int n_Next_notsetNo = Next_notsetNo.length();
//						String add_Zero = "";
//						for (int i = 0; i < (6 - n_Next_notsetNo); i++) {
//							add_Zero += "0";
//						}
//						Next_notsetNo = "N_" + add_Zero + Next_notsetNo;
//						dataMap.put("NOTSET_NO", Next_notsetNo);
//						Database.getInstance().insert("Json.insertNotsetMaster", dataMap);
//						dataMap.put("STATUS", "NOTSET");
//						dataMap.put("JISANGNO", Next_notsetNo);
//						Database.getInstance().update("Json.updateTogiJisang_Status", dataMap);

						mainService.DeleteQuery("jisangSQL.deleteJisangMerge1", datas); // 대상 지상권 정보 삭제처리. !!!주의 진짜로 삭제처리함 !!!

						// 변경이력을 등록한다
						String modify_reason = "지상권 " + datas.get("jisang_no") + "(자산관리번호:" + datas.get("jasan_no") + ")에서 지상권 " + mainJisangMap.get("jisang_no") + "(자산관리번호:" + mainJisangMap.get("jasan_no") + ")" + "로 합필처리";
						HashMap Addparams = new HashMap();
						Addparams.put("GUBUN", "합필");
						Addparams.put("USER_ID", targetMap.get("user_id"));
						Addparams.put("USER_NAME", targetMap.get("user_name"));
						Addparams.put("CONT", modify_reason);

						Addparams.put("JISANGNO", targetMap.get("rep_jisang_no"));
						mainService.InsertQuery("jisangSQL.insertJisangModifyHistory", Addparams);

						// 잠재이슈 삭제.
						CommonUtil comm = new CommonUtil();
						hparam.put("PNU", comm.nvl((String) datas.get("pnu")));
						hparam.put("JIBUN", comm.nvl((String) datas.get("jibun")));
						hparam.put("ADDRCODE", comm.nvl((String) datas.get("addrcode")));
						hparam.put("DEL_COMMENT", "지상권합필에 의한 삭제");
//						Database.getInstance().update("Json.deletePnuIssueForPnu", param);
						mainService.DeleteQuery("jisangSQL.deletePnuIssueForPnuReal", hparam); // DELETE로 변경
						mainService.DeleteQuery("jisangSQL.deletePnuIssueHistory", hparam); // 잠재이슈 내역도 삭제 
					} else {
						// 모지번 정보에 합필사유, 검토의견 업데이트
						mainJisangMap.put("MERGE_REASON", datas.get("merge_reason"));
						mainJisangMap.put("MERGE_COMMENT", datas.get("merge_comment"));
						mainService.UpdateQuery("jisangSQL.updateJisangMasterMergeReason", mainJisangMap);
					}

					// 합필대상 첨부파일 정보 업데이트
					//ArrayList<HashMap<String, String>> attachList = (ArrayList<HashMap<String, String>>) mainService.selectQuery("jisangSQL.selectJisangRowDetail_Files1", datas);
					// 반환된 리스트를 개별 요소에 대해 캐스팅
					ArrayList<HashMap<String, String>> attachList = new ArrayList<>();
					List<HashMap> resultList1 = (List<HashMap>) mainService.selectQuery("jisangSQL.selectJisangRowDetail_Files1", datas);

					for (HashMap map : resultList1) {
					    attachList.add((HashMap<String, String>) map);
					}

					for (HashMap<String, String> attachMap : attachList) {
						attachMap.put("JISANGNO", REP_JISANG_NO);
						mainService.UpdateQuery("jisangSQL.updateSeqFile", attachMap);
					}

				}

				// 임시저장 내용 삭제
				mainService.DeleteQuery("jisangSQL.deleteJisangMergeTmp", hparam);

				//Database.getInstance().commitTransaction();
			} catch (Exception e) {
				e.printStackTrace();
			} finally {
				//Database.getInstance().endTransaction();
			}
		}
//
//		// 4. 지상권신규등록 결재완료내용 조회
//		ArrayList<HashMap> jisnagInsertTargetList = (ArrayList<HashMap>) Database.getInstance().queryForList("Json.selectApprovaljisangInsert");
//		// 4.1. 지상권 신규등록 결재완료건 처리
//		for (HashMap targetMap : jisnagInsertTargetList) {
//			try {
//				Database.getInstance().startTransaction();
//
//				// 지상번호 셋팅
//				targetMap.put("JISANGNO", targetMap.get("JISANG_NO"));
//				targetMap.put("FILENO", targetMap.get("JISANG_NO"));
//
//				// 지상마스터 업데이트
//				ArrayList<HashMap> jisanglist = (ArrayList<HashMap>) Database.getInstance().queryForList("Json.selectJisangDetailTmpList", targetMap);
//				for (HashMap target : jisanglist) {
//					target.put("JISANGNO", target.get("JISANG_NO"));
//					target.put("SINM", target.get("SIDO_NM"));
//					target.put("GUNGUNM", target.get("SGG_NM"));
//					target.put("DONGNM", target.get("EMD_NM"));
//					target.put("RINM", target.get("RI_NM"));
//					target.put("JISANM", target.get("JISA"));
//					target.put("JASANNO", target.get("JASAN_NO"));
//					target.put("CD_STARTDAY", CommonUtil.nvl((String) target.get("CHUIDEUK_DATE")).replace("-", ""));
//					target.put("JIJUKAREA", target.get("JIJUK_AREA"));
//					target.put("ZONE", target.get("PIPE_NAME"));
//					target.put("SUNGUBUN", target.get("SUN_GUBUN"));
//					target.put("COMPLEYN", target.get("COMPLE_YN"));
//					target.put("PYEONIBAREA", target.get("PYEONIB_AREA"));
//					target.put("DGSTARTDAY", CommonUtil.nvl((String) target.get("DEUNGGI_DATE")).replace("-", ""));
//					target.put("DEUNGGINO", target.get("DEUNGGI_NO"));
//					target.put("JASANNO", target.get("JASAN_NO"));
//					target.put("USESTATE", target.get("USE_STATE"));
//					target.put("GOVEROWNYN", target.get("GOVER_OWN_YN"));
//					target.put("SPECIALCONT", target.get("SPECIAL_CONT"));
//					target.put("JIMOK", target.get("JIMOK_TEXT"));
//					target.put("SAVE_STATUS", "승인");
//					Database.getInstance().insert("Json.updateJisangMaster", target);
//					
//					// 지적마스터 수정
//					Database.getInstance().update("Json.updateTogiJisang_Status", target);
//				}
//				
//
//				// 소유자 추가
//				// 임시저장했던 소유자 리스트
//				ArrayList<HashMap> soujalist = (ArrayList<HashMap>) Database.getInstance().queryForList("Json.selectJisangDetailSoyuTmp", targetMap);
//				Database.getInstance().delete("Json.deleteJisangSoyu", targetMap);// 기존 소유자 정보 삭제
//				for (HashMap souja : soujalist) {
//					souja.put("JISANGNO", souja.get("JISANG_NO"));
//					souja.put("NAME", souja.get("SOUJA_NAME"));
//					souja.put("ADDR", souja.get("ADDRESS"));
//					souja.put("HP", souja.get("PONE_NUMBER"));
//					souja.put("TEL", souja.get("HOME_NUMBER"));
//					Database.getInstance().insert("Json.insertJisangSoyu", souja);// 임시저장했던 소유자 등록
//				}
//
//				// 변경이력 추가
//				// 임시저장했던 변경 내역
//				ArrayList<HashMap> modifylist = (ArrayList<HashMap>) Database.getInstance().queryForList("Json.selectJisangRowDetailTmp_Modify", targetMap);
//				for (HashMap modify : modifylist) {
//					modify.put("JISANGNO", modify.get("JISANG_NO"));
//					Database.getInstance().insert("Json.insertJisangModifyHistory", modify); // 임시저장 해놓았던 수정내용 등록
//				}
//				Database.getInstance().delete("Json.deleteJisangTmpModifyHistory", targetMap); // 임시저장 수정내용 삭제
//
//				// 첨부파일 추가
//				// 임시저장했던 파일 리스트 삭제여부 포함
//				ArrayList<HashMap> filelist = (ArrayList<HashMap>) Database.getInstance().queryForList("Json.selectJisangRowDetailTmp_Files", targetMap);
//				Database.getInstance().delete("Json.deleteFile", targetMap);
//				for (HashMap file : filelist) {
//					file.put("SEQ_FLAG", "N");
//					file.put("JISANGNO", file.get("JISANG_NO"));
//					if ("N".equals(file.get("DEL_FLAG"))) {
//						Database.getInstance().insert("Json.insertJisangFile_SEQ", file); // 임시저장시 삭제 되지 않은 파일 등록
//					}
//				}
//				if (filelist.size() > 0) {
//					targetMap.put("FILESEQ", filelist.get(0).get("SEQ"));
//					Database.getInstance().delete("Json.deleteAllFileTmp", targetMap); // 임시저장 파일 삭제
//				}
//
//				Database.getInstance().commitTransaction();
//			} catch (Exception e) {
//				e.printStackTrace();
//			} finally {
//				Database.getInstance().endTransaction();
//			}
//		}
//
//		// 5. 지상권사용 승락
		ArrayList<HashMap> jisnagPermitTargetList = (ArrayList<HashMap>) mainService.selectQuery("jisangSQL.selectApprovaljisangPermit",null);
		for (HashMap targetMap : jisnagPermitTargetList) {
			try {
				//Database.getInstance().startTransaction();

				HashMap params = new HashMap();
				params.put("PMT_NO", targetMap.get("pmt_no"));
				params.put("PMT_STATUS", targetMap.get("status").toString());
				//params.put("PMT_STATUS","C");
				log.info("params:"+params);
				System.out.println("PMT_STATUS 값: " + params.get("PMT_STATUS"));
				System.out.println("PMT_STATUS 타입: " + params.get("PMT_STATUS").getClass().getName());
				//"  ' 의 차이로 인한 아래 쿼리가 안통하는부분 때문에 로그 찍음
				mainService.UpdateQuery("jisangSQL.UpdateJisangPermit", params);

				//Database.getInstance().commitTransaction();
			} catch (Exception e) {
				e.printStackTrace();
			} finally {
				//Database.getInstance().endTransaction();
			}
		}
		
		
		log.info("############ 민원발생보고 상신건 결재처리된 건에 대하여 처리###################");
//
//		// 이슈관리 >> 민원관리 전자결제 체크.
//		// 1. 민원발생보고
		ArrayList<HashMap> minwonMasterList = (ArrayList<HashMap>) mainService.selectQuery("issueSQL.selectApprovalMinwonMaster",null);
		// 1.1 민원발생보고 상신건 결재처리된 건에 대하여 처리
		for (HashMap targetMap : minwonMasterList) {
//			System.out.println("##### "+targetMap.toString());
			try {
				//Database.getInstance().startTransaction();

				HashMap params = new HashMap();
				params.put("MW_SEQ", targetMap.get("mw_seq"));
				params.put("STATUS", "2"); // 민원발생상태(2)로 업데이트
				log.info("params:"+params);
				mainService.UpdateQuery("issueSQL.updateMinwonMasterApprovalStatus", params);
			//	Database.getInstance().commitTransaction();

			} catch (Exception e) {
				e.printStackTrace();
			} finally {
				//Database.getInstance().endTransaction();
			}
		}
		
		log.info("############ 민원발생보고 결재 반려된 경우###################");
//		// 1.2. 민원발생보고 결재 반려된 경우
		ArrayList<HashMap> minwonMasterRejectedList = (ArrayList<HashMap>) mainService.selectQuery("issueSQL.selectApprovalMinwonMaster",null);
		for (HashMap targetMap : minwonMasterRejectedList) {
			try {
			//	Database.getInstance().startTransaction();

				HashMap params = new HashMap();
				params.put("MW_SEQ", targetMap.get("mw_seq"));
				mainService.UpdateQuery("issueSQL.updateMinwonMasterApprovalStatusRejected", params);
				//Database.getInstance().commitTransaction();

			} catch (Exception e) {
				e.printStackTrace();
			} finally {
				//Database.getInstance().endTransaction();
			}
		}
		
//
		log.info("############ 대응방안수립 보고###################");
//		// 2. 대응방안수립 보고
		ArrayList<HashMap> minwonHandlingTmpList = (ArrayList<HashMap>) mainService.selectQuery("issueSQL.selectApprovalMinwonHandlingTmp",null);
		for (HashMap targetMap : minwonHandlingTmpList) {
			try {
				//Database.getInstance().startTransaction();

				HashMap params = new HashMap();
				params.put("MW_SEQ", targetMap.get("mw_seq"));
				params.put("MW_CODE1", targetMap.get("mw_code1"));
				params.put("MW_CODE2", targetMap.get("mw_code2"));
				params.put("MW_CODE3", targetMap.get("mw_code3"));
				params.put("STATUS", "3"); // 민원 대응방안수립 상태(3)로 업데이트
				mainService.UpdateQuery("issueSQL.updateMinwonHandling", params);
				mainService.UpdateQuery("issueSQL.updateMinwonHandlingTmpComplete", params);
				//Database.getInstance().commitTransaction();

			} catch (Exception e) {
				e.printStackTrace();
			} finally {
				//Database.getInstance().endTransaction();
			}
		}
//		// 2. 대응방안수립 보고 반려일 경우 롤백
		ArrayList<HashMap> minwonHandlingTmpRejectedList = (ArrayList<HashMap>) mainService.selectQuery("issueSQL.selectApprovalMinwonHandlingTmpRejected",null);
		for (HashMap targetMap : minwonHandlingTmpRejectedList) {
			try {
				//Database.getInstance().startTransaction();
				HashMap params = new HashMap();
				params.put("MW_SEQ", targetMap.get("mw_seq"));
				mainService.UpdateQuery("issueSQL.updateMinwonHandlingTmpEchoNoRejected", params);
				//Database.getInstance().commitTransaction();

			} catch (Exception e) {
				e.printStackTrace();
			} finally {
				//Database.getInstance().endTransaction();
			}
		}
//
//		// 3. 협의내용 보고 반려시 처리
		ArrayList<HashMap> minwonAgreementRejectList = (ArrayList<HashMap>) mainService.selectQuery("issueSQL.selectApprovalMinwonAgreementRejected",null);
		for (HashMap targetMap : minwonAgreementRejectList) {
			try {
				//Database.getInstance().startTransaction();

				HashMap params = new HashMap();
				params.put("MW_SEQ", targetMap.get("mw_seq"));
				params.put("AGREE_SEQ", targetMap.get("agree_seq"));
				mainService.UpdateQuery("issueSQL.updateMinwonAgreeApprovalCancel", params);
				//Database.getInstance().commitTransaction();

			} catch (Exception e) {
				e.printStackTrace();
			} finally {
				//Database.getInstance().endTransaction();
			}
		}
//
//		// 4. 민원 완료 보고
		ArrayList<HashMap> minwonCompleteList = (ArrayList<HashMap>) mainService.selectQuery("issueSQL.selectApprovalMinwonComplete",null);
		System.out.println("LJS:  schedulerController minwonCompleteList-----------------");
		for (HashMap targetMap : minwonCompleteList) {
			try {
				//Database.getInstance().startTransaction();

				HashMap params = new HashMap();
				params.put("MW_SEQ", targetMap.get("mw_seq"));
				params.put("STATUS", "5"); // 민원 완료 상태(5)로 업데이트
				mainService.UpdateQuery("issueSQL.updateMinwonMasterApprovalComplete", params);

				// 민원완료 후 해당 토지 잠재이슈 이슈없음으로 변경.
				ArrayList<HashMap> minwonCompletePnuList = (ArrayList<HashMap>) mainService.selectQuery("issueSQL.selectApprovalMinwonCompletePnu", params);
				for (HashMap pnuMap : minwonCompletePnuList) {
					// 이슈없음 코드에 대해서 하드코딩 처리...

					// 지상권
					if (String.valueOf(pnuMap.get("jisang_no")).startsWith("J")) {

						pnuMap.put("CODE_DEPTH1", "DY010000"); // 이슈없음
						pnuMap.put("CODE_DEPTH2", "DY010100"); // 이슈없음
						pnuMap.put("CODE_DEPTH3", "DY010101"); // 이슈없음

					}

					// 점용
					if (String.valueOf(pnuMap.get("jisang_no")).startsWith("G")) {

						pnuMap.put("CODE_DEPTH1", "GY010000"); // 점용료납부
						pnuMap.put("CODE_DEPTH2", "GY010100"); // 이슈없음
						pnuMap.put("CODE_DEPTH3", "GY010101"); // 이슈없음

					}

					// 미설정/미점용 토지
					if (String.valueOf(pnuMap.get("jisang_no")).startsWith("N")) {

						pnuMap.put("CODE_DEPTH1", "DY010000"); // 이슈없음
						pnuMap.put("CODE_DEPTH2", "DY010100"); // 이슈없음
						pnuMap.put("CODE_DEPTH3", "DY010101"); // 이슈없음

					}

					pnuMap.put("ISSUE_COMMENT", "민원완료에 의한 이슈없음 변경.");

					mainService.UpdateQuery("issueSQL.updatePnuIssue2", params);
				}

//				Database.getInstance().commitTransaction();

			} catch (Exception e) {
				e.printStackTrace();
			} finally {
//				Database.getInstance().endTransaction();
			}
		}
		ArrayList<HashMap> minwonCompleteRejectedList = (ArrayList<HashMap>) mainService.selectQuery("issueSQL.selectApprovalMinwonCompleteRejected",null);
		for (HashMap targetMap : minwonCompleteRejectedList) {
			try {
				//Database.getInstance().startTransaction();

				HashMap params = new HashMap();
				params.put("MW_SEQ", targetMap.get("mw_seq"));
				mainService.UpdateQuery("issueSQL.updateMinwonMasterApprovalCompleteCancel", params);
				//Database.getInstance().commitTransaction();

			} catch (Exception e) {
				e.printStackTrace();
			} finally {
				//Database.getInstance().endTransaction();
			}
		}

	}
//
//	public void dosiMail() throws SQLException {
//		System.out.println("스케줄러 메일 확인용입니다.");
//		try {
//			Database.getInstance().startTransaction();
//			MailUtil mailUtil = new MailUtil();
//
//			Properties env = new Properties();
//			InputStream is = getClass().getResourceAsStream("/db.properties");
//			try {
//				env.load(is);
//			} catch (Exception es) {
//				es.printStackTrace();
//				System.err.println("Can't read the properties file. " + "Make sure env.properties is in the CLASSPATH");
//			}
//
//			String serverName = env.getProperty("SERVER_NAME");
//
//			if (!"DEV".equals(serverName)) {
//				List<Map<String, Object>> listHalfMonth = Database.getInstance().queryForList("Json.selectAfterFullMoonDosiMail", null);
//				if (listHalfMonth != null && listHalfMonth.size() > 0) {
//					for (int i = 0; i < listHalfMonth.size(); i++) {
//						List<HashMap<String, String>> deptList = Database.getInstance().queryForList("Json.selectDosiRowDetail_deptInfo", listHalfMonth.get(i));
//						listHalfMonth.get(i).put("deptList", deptList);
//						listHalfMonth.get(i).put("day", "15일");
//					}
//					mailUtil.sendMailList(listHalfMonth, "dosi");
//				}
//
//				List<Map<String, Object>> listOneMonth = Database.getInstance().queryForList("Json.selectOneMonthLaterDosiMail", null);
//				if (listOneMonth != null && listOneMonth.size() > 0) {
//					for (int i = 0; i < listOneMonth.size(); i++) {
//						List<HashMap<String, String>> deptList = Database.getInstance().queryForList("Json.selectDosiRowDetail_deptInfo", listOneMonth.get(i));
//						listOneMonth.get(i).put("deptList", deptList);
//						listOneMonth.get(i).put("day", "1개월");
//					}
//					mailUtil.sendMailList(listOneMonth, "dosi");
//				}
//
//				List<Map<String, Object>> listTwoMonth = Database.getInstance().queryForList("Json.selectTwoMonthLaterDosiMail", null);
//				if (listTwoMonth != null && listTwoMonth.size() > 0) {
//					for (int i = 0; i < listTwoMonth.size(); i++) {
//						List<HashMap<String, String>> deptList = Database.getInstance().queryForList("Json.selectDosiRowDetail_deptInfo", listTwoMonth.get(i));
//						listTwoMonth.get(i).put("deptList", deptList);
//						listTwoMonth.get(i).put("day", "2개월");
//					}
//					mailUtil.sendMailList(listTwoMonth, "dosi");
//				}
//			}
//
//			Database.getInstance().commitTransaction();
//		} catch (Exception e) {
//			e.printStackTrace();
//		} finally {
//			Database.getInstance().endTransaction();
//		}
//
//	}
//
//	public void goverMail() throws SQLException {
//		System.out.println("스케줄러 메일 확인용입니다.");
//		try {
//			Database.getInstance().startTransaction();
//			MailUtil mailUtil = new MailUtil();
//
//			Properties env = new Properties();
//			InputStream is = getClass().getResourceAsStream("/db.properties");
//			try {
//				env.load(is);
//			} catch (Exception es) {
//				es.printStackTrace();
//				System.err.println("Can't read the properties file. " + "Make sure env.properties is in the CLASSPATH");
//			}
//
//			String serverName = env.getProperty("SERVER_NAME");
//
//			if (!"DEV".equals(serverName)) {
//
//				List<Map<String, Object>> listHalfMonth = Database.getInstance().queryForList("Json.selectAfterFullMoonGoverMail", null);
//				if (listHalfMonth != null && listHalfMonth.size() > 0) {
//					for (int i = 0; i < listHalfMonth.size(); i++) {
//						listHalfMonth.get(i).put("day", "15일");
//					}
//					mailUtil.sendMailList(listHalfMonth, "gover");
//				}
//
//				List<Map<String, Object>> listOneMonth = Database.getInstance().queryForList("Json.selectOneMonthLaterGoverMail", null);
//				if (listOneMonth != null && listOneMonth.size() > 0) {
//					for (int i = 0; i < listOneMonth.size(); i++) {
//						listOneMonth.get(i).put("day", "1개월");
//					}
//					mailUtil.sendMailList(listOneMonth, "gover");
//				}
//
//				List<Map<String, Object>> listTwoMonth = Database.getInstance().queryForList("Json.selectTwoMonthLaterGoverMail", null);
//				if (listTwoMonth != null && listTwoMonth.size() > 0) {
//					for (int i = 0; i < listTwoMonth.size(); i++) {
//						listTwoMonth.get(i).put("day", "2개월");
//					}
//					mailUtil.sendMailList(listTwoMonth, "gover");
//				}
//
//			}
//			Database.getInstance().commitTransaction();
//		} catch (Exception e) {
//			e.printStackTrace();
//		} finally {
//			Database.getInstance().endTransaction();
//		}
//

		
//	}
}
