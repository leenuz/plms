package com.slsolution.plms;

import java.io.InputStream;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Properties;

import javax.mail.Session;
import javax.mail.Transport;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeMessage;

import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationContext;
import org.springframework.context.ApplicationContextAware;
import org.springframework.stereotype.Component;

import com.slsolution.plms.config.GlobalConfig;
import com.slsolution.plms.statics.staticsController;

import lombok.extern.slf4j.Slf4j;

import javax.mail.Address;
import javax.mail.Message;
import javax.mail.MessagingException;
import javax.mail.SendFailedException;



@Component
public class MailUtil implements ApplicationContextAware {
	
	
	private static ApplicationContext context;

    // ApplicationContext 주입
    @Override
    public void setApplicationContext(ApplicationContext applicationContext) {
        context = applicationContext;
    }

	
	
	
	

	public void sendMailList(List<Map<String, Object>> list, String gubun) throws Exception {
		
		MainService mainService = context.getBean(MainService.class);
		GlobalConfig GC = context.getBean(GlobalConfig.class);
		/***********************************************
		 *
		 * 
		 * 
		 * EMAIL_SEND_MGT TABLE에서 아직 보내지 않은 매일을 조회하여 한건씩 전송한다.
		 *
		 * 
		 * 
		 *************************************************/

		String shtml = "";
		for (Map<String, Object> data : list) {

			shtml = getHtml(gubun, data);

			ArrayList<HashMap> jisanglist = new ArrayList<HashMap>();

			HashMap params = new HashMap();

			// 관리자 그룹
			params.put("GROUP", "'ADMIN'");
			ArrayList<HashMap> adminlist = (ArrayList<HashMap>) mainService.selectQuery("commonSQL.selectAdminUserRightsdGroupList", params);

			for (HashMap adminData : adminlist) {
				params.put("EMPCD", adminData.get("EMPCD"));
				ArrayList<HashMap> rawdata = (ArrayList<HashMap>) mainService.selectQuery("commonSQL.selectAdminUserRightsdList", params);
				if (rawdata.get(0).get("EMPCD").equals(adminData.get("EMPCD")) && rawdata.get(0).get("DEPTNM").toString().contains("자산관리팀")) {
					jisanglist.add(rawdata.get(0));
				}
			}

			// 지상권 관리자 그룹
			params.put("GROUP", "'지상권 관리자','지상권 조회'");
			ArrayList<HashMap> grouplist = (ArrayList<HashMap>) mainService.selectQuery("commonSQL.selectAdminUserRightsdGroupList", params);

			for (HashMap groupData : grouplist) {
				params.put("EMPCD", groupData.get("EMPCD"));
				ArrayList<HashMap> rawdata = (ArrayList<HashMap>) mainService.selectQuery("commonSQL.selectAdminUserRightsdList", params);
				if (!rawdata.isEmpty()) {
					if (rawdata.get(0).get("EMPCD").equals(groupData.get("EMPCD"))) {
						if (rawdata.get(0).get("DEPTNM").toString().contains((String) data.get("JISA")) || rawdata.get(0).get("DEPTNM").toString().contains("자산관리팀")) {
							jisanglist.add(rawdata.get(0));
						}
					}
				}
			}

//			for(int k = 0; k < jisanglist.size(); k++){
//				shtml += "//---------------------------------------------------------------------------------------------------------------- <br> \n";
//				shtml += "Email " + k +" :: " + jisanglist.get(k).get("EMAIL_ADDR") + "@dopco.co.kr <br> \n";
//				shtml += "Name " + k +" :: " + jisanglist.get(k).get("KORNAME") + "  <br> \n";
//				shtml += "Deptnm " + k +" :: " + jisanglist.get(k).get("DEPTNM") + "  <br> \n";
//				shtml += "----------------------------------------------------------------------------------------------------------------// <br> \n";
//			}
			shtml += "</body> \n";
			shtml += "</html> \n";

			System.out.println(makeHtml(shtml));

			boolean sendResult = false;

//			Properties env = new Properties();
//			InputStream is = getClass().getResourceAsStream("/db.properties");
//			try {
//				env.load(is);
//			} catch (Exception es) {
//				es.printStackTrace();
//				System.err.println("Can't read the properties file. " + "Make sure env.properties is in the CLASSPATH");
//			}

			String serverName = GC.getServerName();

			Map map = new HashMap();
			if (!"DEV".equals(serverName)) {
				// 운영
				for (int k = 0; k < jisanglist.size(); k++) {
					System.out.println("jisanglist=" + jisanglist.get(k).toString());
					map = new HashMap();
					if ("dosi".equals(gubun))
						map.put("subject", "[토지개발관리 사업종료 알림] 사업명 : " + data.get("BUSINESS_NM"));
					else if ("gover".equals(gubun))
						map.put("subject", "[점용허가 갱신주기 알림]");

					map.put("email", jisanglist.get(k).get("EMAIL_ADDR") + "@dopco.co.kr");
//				map.put("email", "wklee@slsolution.co.kr"); //테스트
					sendResult = sendMailProcess(shtml, map); // 발송처리
				}
			} else {
				// 테스트
				map = new HashMap();
				if ("dosi".equals(gubun))
					map.put("subject", "[토지개발관리 사업종료 알림] 사업명 : " + data.get("BUSINESS_NM"));
				else if ("gover".equals(gubun))
					map.put("subject", "[점용허가 갱신주기 알림]");
//				map.put("email", "kimhoki@dopco.co.kr");
//				sendResult = sendMailProcess(shtml, map);
			}

			if (sendResult) {

				// 성공시 SEND_YN = Y

				map.put("SEND_YN", "Y");

			} else {

				// 실패시 C

				map.put("SEND_YN", "C");

			}
			System.out.println(map.toString());
//			mailDAO.updateEmailSendMgt(map);

		}

	}

	public boolean sendMailProcess(String shtml, Map<String, Object> map) {
		
		
		
		MainService mainService = context.getBean(MainService.class);
		GlobalConfig GC = context.getBean(GlobalConfig.class);
		
		
		String subject = (String) map.get("subject");
		String mailer = "CardBillSystem";
		String mailhost = "192.6.18.160"; // 신규메일서버 2019
		String mailtype = "HTML";
		try {

			Properties props = System.getProperties();
			props.put("mail.smtp.host", mailhost);
			Session session = Session.getDefaultInstance(props, null);
			Message msg = new MimeMessage(session);
			msg.setFrom(new InternetAddress("dopcoplms@dopco.co.kr")); // 발송인주소

			msg.setRecipients(Message.RecipientType.TO, InternetAddress.parse((String) map.get("email"), false)); // 받는주소

			msg.setSubject(subject);

			msg.setSentDate(new java.util.Date());

			shtml = makeHtml(shtml);

			// html 로 전송

			msg.setText(shtml);

			msg.setHeader("Content-Type", "text/html; charset=euc-kr");

			msg.setHeader("X-Mailer", mailer);

			Transport.send(msg);

			return true;

		} catch (MessagingException me) {

			me.printStackTrace();

			Exception ex = me;

			// do {

			if (ex instanceof SendFailedException) {

				SendFailedException sfex = (SendFailedException) ex;

				Address[] invalid = sfex.getInvalidAddresses();

				if (invalid != null) {

					System.out.println(" ** Invalid Addresses");

					if (invalid != null) {

						for (int i = 0; i < invalid.length; i++)

							System.out.println(" " + invalid[i]);

					}

				}

			}

			return false;

		}

	}

	public String getHtml(String gubun, Map<String, Object> data) {

		StringBuffer strb = new StringBuffer();

		if ("dosi".equals(gubun)) {
			strb.append(" \n");
			strb.append("<html lang=\"ko\"> \n");
			strb.append("<head> \n");
			strb.append("    <meta charset=\"utf-8\"> \n");
			strb.append("    <meta content=\"text/html; charset=UTF-8\" http-equiv=\"Content-Type\" /> \n");
			strb.append("    <meta content=\"IE=edge\" http-equiv=\"X-UA-Compatible\"> \n");
			strb.append("     <link rel=\"stylesheet\" media=\"all\" href=\"http://plms.dopco.co.kr/resource/css/base.css\" /> \n");
			strb.append("     <link rel=\"stylesheet\" media=\"all\" href=\"http://plms.dopco.co.kr/resource/css/layout.css\" /> \n");
			strb.append("     <link rel=\"stylesheet\" media=\"all\" href=\"http://plms.dopco.co.kr/resource/css/table.css\" /> \n");
			strb.append("     <link rel=\"stylesheet\" media=\"all\" href=\"http://plms.dopco.co.kr/resource/css/popup.css\" /> \n");
			strb.append("</head> \n");
			strb.append("<body> \n");
			strb.append("    <div id=\"form-box\" style=\"border:5px solid #eeede9;background: transparent; width:670px; padding: 15px;\" > \n");
			strb.append("        <div> \n");
			strb.append("           <img style=\"vertical-align: bottom;\" src=\"http://plms.dopco.co.kr/resource/image/logo.jpg\" alt=\"logo\">에서 알려 드립니다.<span style=\"float: right; margin-top: 10px; color:#4f4f4f;\" class=\"date\">" + data.get("TODAY") + "</span> \n");
			strb.append("        </div> \n");
			strb.append("        <img style=\"vertical-align: bottom;\" src=\"http://plms.dopco.co.kr/resource/image/line.jpg\"> \n");
			strb.append("        <div style=\"width:640px; border:1px solid #eeede9; margin-top:10px; padding: 10px; background: transparent;\" class=\"table-box\"> \n");
			strb.append("            <p style=\"color: #3b82ae; font-weight: bold; font-size: 14px;\">[토지개발관리 알림]</p> \n");
			strb.append("            <p style=\"color: #3b82ae; font-weight: bold; font-size: 14px;\">아래 도시개발사업이 종료까지 " + data.get("day") + " 남았습니다.</p> \n");
			strb.append("            <p style=\"color: #3b82ae; font-weight: bold; font-size: 14px;\">해당 도시개발사업에 따른 지상권 권리확보 및 점용허가 변경업무를 완료하여 주시길 바랍니다.</p> \n");
			strb.append("        </div> \n");
			strb.append("    </div> \n");
			strb.append("<br> \n");
			strb.append("<div class=\"article\"> \n");
			strb.append("	<div class=\"h4_cont\"> \n");
			strb.append(" \n");
			strb.append("		<!-- 기본 정보 --> \n");
			strb.append("		<h4>기본 정보</h4> \n");
			strb.append("		<table class=\"base3\"> \n");
			strb.append("			<colgroup> \n");
			strb.append("				<col style=\"width: 13%;\"> \n");
			strb.append("				<col style=\"width: 13%;\"> \n");
			strb.append("				<col style=\"width: 13%;\"> \n");
			strb.append("				<col style=\"width: 12%;\"> \n");
			strb.append("				<col style=\"width: 12%;\"> \n");
			strb.append("				<col style=\"width: 10%;\"> \n");
			strb.append("				<col style=\"width: 10%;\"> \n");
			strb.append("				<col style=\"width: 17%;\"> \n");
			strb.append("			</colgroup> \n");
			strb.append("			<tbody> \n");
			strb.append("				<tr> \n");
			strb.append("					<th scope=\"row\" rowspan=\"2\">사업명</th> \n");
			strb.append("					<th scope=\"row\" colspan=\"2\">사업기간</th> \n");
			strb.append("					<th scope=\"row\" rowspan=\"2\">시행청</th> \n");
			strb.append("					<th scope=\"row\" rowspan=\"2\">사업자</th> \n");
			strb.append("				</tr> \n");
			strb.append("				<tr> \n");
			strb.append("					<th>시작일</th> \n");
			strb.append("					<th>종료일</th> \n");
			strb.append("				</tr> \n");
			strb.append("				<tr> \n");
			strb.append("					<td>" + CommonUtil.nvl((String) data.get("BUSINESS_NM")) + "</td> \n");
			strb.append("					<td>" + data.get("STRDATE") + "</td> \n");
			strb.append("					<td>" + data.get("ENDDATE") + "</td> \n");
			strb.append("					<td>" + CommonUtil.nvl((String) data.get("ADM_OFFICE")) + "</td> \n");
			strb.append("					<td>" + CommonUtil.nvl((String) data.get("BUSINESS_OPER")) + "</td> \n");
			strb.append("				</tr> \n");
			strb.append("			</tbody> \n");
			strb.append("		</table> \n");
			strb.append("		<br> \n");
			strb.append("		<table class=\"base3\"> \n");
			strb.append("			<colgroup> \n");
			strb.append("				<col style=\"width: 13%;\"> \n");
			strb.append("				<col style=\"width: 13%;\"> \n");
			strb.append("				<col style=\"width: 13%;\"> \n");
			strb.append("			</colgroup> \n");
			strb.append("			<tbody> \n");
			strb.append("				<tr> \n");
			strb.append("					<th scope=\"row\" colspan=\"3\">관할부서</th> \n");
			strb.append("				</tr> \n");
			strb.append("				<tr> \n");
			strb.append("					<th>부서명</th> \n");
			strb.append("					<th>담당자</th> \n");
			strb.append("					<th>연락처</th> \n");
			strb.append("				</tr> \n");
			List<HashMap<String, String>> deptList = (List<HashMap<String, String>>) data.get("deptList");
			if (deptList.size() > 0) {
				for (HashMap<String, String> dept : deptList) {
					strb.append("				<tr> \n");
					strb.append("					<td>" + CommonUtil.nvl((String) dept.get("DEPT_NM")) + "</td> \n");
					strb.append("					<td>" + CommonUtil.nvl((String) dept.get("MANAGER")) + "</td> \n");
					strb.append("					<td>" + CommonUtil.nvl((String) dept.get("CONTACT_NUM")) + "</td> \n");
					strb.append("				</tr> \n");
				}
			} else {
				strb.append("				<tr> \n");
				strb.append("					<td colspan=\"3\">관할부서가 없습니다.</td> \n");
				strb.append("				</tr> \n");
			}
			strb.append("			</tbody> \n");
			strb.append("		</table> \n");
			strb.append("	</div> \n");
			strb.append("<br> \n");
			strb.append("<div class=\"h4_cont\"> \n");
			strb.append("	<h4>대표 토지정보</h4> \n");
			strb.append("	<table class=\"base3\"> \n");
			strb.append("		<colgroup> \n");
			strb.append("			<col style=\"width: 8%;\"> \n");
			strb.append("			<col style=\"width: 6%;\"> \n");
			strb.append("			<col style=\"width: 6%;\"> \n");
			strb.append("			<col style=\"width: 8%;\"> \n");
			strb.append("			<col style=\"width: 8%;\"> \n");
			strb.append("			<col style=\"width: 8%;\"> \n");
			strb.append("			<col style=\"width: 8%;\"> \n");
			strb.append("			<col style=\"width: 8%;\"> \n");
			strb.append("			<col style=\"width: 8%;\"> \n");
			strb.append("			<col style=\"width: 8%;\"> \n");
			strb.append("			<col style=\"width: 8%;\"> \n");
			strb.append("			<col style=\"width: 8%;\"> \n");
			strb.append("		</colgroup> \n");
			strb.append("		<thead> \n");
			strb.append("			<tr> \n");
			strb.append("				<th>권리<br />확보 \n");
			strb.append("				</th> \n");
			strb.append("				<th>관로<br />저촉 \n");
			strb.append("				</th> \n");
			strb.append("				<th>지사</th> \n");
			strb.append("				<th>시도</th> \n");
			strb.append("				<th>시군구</th> \n");
			strb.append("				<th>읍면동</th> \n");
			strb.append("				<th>리</th> \n");
			strb.append("				<th>지번</th> \n");
			strb.append("				<th>지목</th> \n");
			strb.append("				<th>연장(m)</th> \n");
			strb.append("				<th>면적(m²)</th> \n");
			strb.append("				<th>소유자</th> \n");
			strb.append("			</tr> \n");
			strb.append("		</thead> \n");
			strb.append("		<tbody> \n");
			strb.append("			<tr> \n");
			strb.append("				<td>" + CommonUtil.nvl((String) data.get("TOJI_TYPE")) + "</td> \n");
			strb.append("				<td>" + CommonUtil.nvl((String) data.get("PIPE_YN")) + "</td> \n");
			strb.append("				<td>" + CommonUtil.nvl((String) data.get("JISA")) + "</td> \n");
			strb.append("				<td>" + CommonUtil.nvl((String) data.get("SIDO_NM")) + "</td> \n");
			strb.append("				<td>" + CommonUtil.nvl((String) data.get("SGG_NM")) + "</td> \n");
			strb.append("				<td>" + CommonUtil.nvl((String) data.get("EMD_NM")) + "</td> \n");
			strb.append("				<td>" + CommonUtil.nvl((String) data.get("RI_NM")) + "</td> \n");
			strb.append("				<td>" + CommonUtil.nvl((String) data.get("JIBUN")) + "</td> \n");
			strb.append("				<td>" + CommonUtil.nvl((String) data.get("JIMOK_TEXT")) + "</td> \n");
			strb.append("				<td>" + CommonUtil.nvl((String) data.get("LENGTH")) + "</td> \n");
			strb.append("				<td>" + data.get("JIJUK_AREA") + "</td> \n");
			strb.append("				<td>" + CommonUtil.nvl((String) data.get("SOYOUJA")) + "</td> \n");
			strb.append("			</tr> \n");
			strb.append("		</tbody> \n");
			strb.append("	</table> \n");
			strb.append("</div> \n");
			strb.append("</div> \n");
		} else if ("gover".equals(gubun)) {
			strb.append(" \n");
			strb.append("<html lang=\"ko\"> \n");
			strb.append("<head> \n");
			strb.append("    <meta charset=\"utf-8\"> \n");
			strb.append("    <meta content=\"text/html; charset=UTF-8\" http-equiv=\"Content-Type\" /> \n");
			strb.append("    <meta content=\"IE=edge\" http-equiv=\"X-UA-Compatible\"> \n");
			strb.append("     <link rel=\"stylesheet\" media=\"all\" href=\"http://plms.dopco.co.kr/resource/css/base.css\" /> \n");
			strb.append("     <link rel=\"stylesheet\" media=\"all\" href=\"http://plms.dopco.co.kr/resource/css/layout.css\" /> \n");
			strb.append("     <link rel=\"stylesheet\" media=\"all\" href=\"http://plms.dopco.co.kr/resource/css/table.css\" /> \n");
			strb.append("     <link rel=\"stylesheet\" media=\"all\" href=\"http://plms.dopco.co.kr/resource/css/popup.css\" /> \n");
			strb.append("</head> \n");
			strb.append("<body> \n");
			strb.append("    <div id=\"form-box\" style=\"border:5px solid #eeede9;background: transparent; width:670px; padding: 15px;\" > \n");
			strb.append("        <div> \n");
			strb.append("           <img style=\"vertical-align: bottom;\" src=\"http://plms.dopco.co.kr/resource/image/logo.jpg\" alt=\"logo\">에서 알려 드립니다.<span style=\"float: right; margin-top: 10px; color:#4f4f4f;\" class=\"date\">" + data.get("TODAY") + "</span> \n");
			strb.append("        </div> \n");
			strb.append("        <img style=\"vertical-align: bottom;\" src=\"http://plms.dopco.co.kr/resource/image/line.jpg\"> \n");
			strb.append("        <div style=\"width:640px; border:1px solid #eeede9; margin-top:10px; padding: 10px; background: transparent;\" class=\"table-box\"> \n");
			strb.append("            <p style=\"color: #3b82ae; font-weight: bold; font-size: 14px;\">[점용허가 갱신주기 알림]</p> \n");
			strb.append("            <p style=\"color: #3b82ae; font-weight: bold; font-size: 14px;\">아래 송유관로부지의 점용허가 종료일이 " + data.get("day") + " 남았습니다.</p> \n");
			strb.append("            <p style=\"color: #3b82ae; font-weight: bold; font-size: 14px;\">해당 점용허가 조건에 명시된 기한 내에 점용허가 갱신업무를 완료하여 주시길 바랍니다.</p> \n");
			strb.append("        </div> \n");
			strb.append("    </div> \n");
			strb.append("<br> \n");
			strb.append("<div class=\"h4_cont\"> \n");
			strb.append("<h4>기본 정보</h4>");
			strb.append("	<table class=\"base3\">");
			strb.append("		<colgroup>");
			strb.append("			<col style=\"width: 9%\" />");
			strb.append("			<col style=\"width: 16%\" />");
			strb.append("			<col style=\"width: 9%\" />");
			strb.append("			<col style=\"width: 16%\" />");
			strb.append("			<col style=\"width: 9%\" />");
			strb.append("			<col style=\"width: 16%\" />");
			strb.append("			<col style=\"width: 9%\" />");
			strb.append("			<col style=\"width: 16%\" />");
			strb.append("		</colgroup>");
			strb.append("		<tbody>");
			strb.append("			<tr>");
			strb.append("				<th scope=\"row\" rowspan=\"2\">관리번호</th>");
			strb.append("				<td rowspan=\"2\">" + data.get("GOVER_NO") + "</td>");
			strb.append("				<th scope=\"row\">관리지사</th>");
			strb.append("				<td>");
			strb.append("					" + data.get("JISA") + "");
			strb.append("				</td>");
			strb.append("				<th scope=\"row\">허가관청</th>");
			strb.append("				<td>");
			strb.append("					" + data.get("PMT_OFFICE"));
			strb.append("				</td>");
			strb.append("				<th scope=\"row\">관리기관</th>");
			strb.append("				<td>");
			strb.append("					" + data.get("ADM_OFFICE"));
			strb.append("				</td>");
			strb.append("			</tr>");
			strb.append("			<tr>");
			strb.append("				<th scope=\"row\" style=\"border-left: 1px solid #d3d3d3;\">부서</th>");
			strb.append("				<td>" + data.get("OFFICE_DEPART") + "</td>");
			strb.append("				<th scope=\"row\">담당자</th>	");
			strb.append("				<td>" + data.get("OFFICE_CHARGE") + "</td>");
			strb.append("				<th scope=\"row\">연락처</th>	");
			strb.append("				<td>" + data.get("OFFICE_CONTACT") + "</td>");
			strb.append("			</tr>");
			strb.append("			<tr>");
			strb.append("				<th scope=\"row\">용도</th>");
			strb.append("				<td>");
			strb.append("				" + data.get("YONGDO") + "");
			strb.append("				</td>");
			strb.append("				<th scope=\"row\">관로명(구간)</th>");
			strb.append("				<td>");
			strb.append("					" + data.get("PIPE_NAME"));
			strb.append("				</td>");
			strb.append("				<th scope=\"row\">관경 및 단/복선</th>");
			strb.append("				<td colspan=\"1\">" + data.get("SUN_GUBUN") + "</td>");
			strb.append("				<td colspan=\"2\">" + data.get("PIPE_METER") + ("복선".equals(data.get("SUN_GUBUN")) ? ", " + data.get("PIPE_METER2") : "") + "</td>");
			strb.append("			</tr>");
			strb.append("			<tr>");
			strb.append("				<th>점용 목적</th>");
			strb.append("				<td>");
			strb.append("					" + data.get("USE_PURPOS"));
			strb.append("				</td>");
			strb.append("				<th>점용 기간</th>");
			strb.append("				<td colspan=\"3\">");
			strb.append("					" + data.get("GOVER_ST_DATE") + " ~ " + data.get("GOVER_ED_DATE"));
			strb.append("				</td>");
			strb.append("				<th>점용 갱신 주기</th>");
			strb.append("				<td>");
			strb.append("					" + data.get("GOVER_PERIOD"));
			strb.append("				</td>");
			strb.append("			</tr>");
			strb.append("		</tbody>");
			strb.append("	</table>");
			strb.append("	</div>");
			strb.append("<br> \n");
//			strb.append("<div class=\"h4_cont\"> \n");
//			strb.append("	<h4>대표 토지정보</h4> \n");
//			strb.append("	<table class=\"base3\"> \n");
//			strb.append("		<thead> \n");
//			strb.append("			<tr> \n");
//			strb.append("				<th>지사</th> \n");
//			strb.append("				<th>시도</th> \n");
//			strb.append("				<th>시군구</th> \n");
//			strb.append("				<th>읍면동</th> \n");
//			strb.append("				<th>리</th> \n");
//			strb.append("				<th>지번</th> \n");
//			strb.append("			</tr> \n");
//			strb.append("		</thead> \n");
//			strb.append("		<tbody> \n");
//			strb.append("			<tr> \n");
//			strb.append("				<td>"+ CommonUtil.nvl((String)data.get("JISA")) +"</td> \n");
//			strb.append("				<td>"+ CommonUtil.nvl((String)data.get("SIDO_NM")) +"</td> \n");
//			strb.append("				<td>"+ CommonUtil.nvl((String)data.get("SGG_NM")) +"</td> \n");
//			strb.append("				<td>"+ CommonUtil.nvl((String)data.get("EMD_NM")) +"</td> \n");
//			strb.append("				<td>"+ CommonUtil.nvl((String)data.get("RI_NM")) +"</td> \n");
//			strb.append("				<td>"+ CommonUtil.nvl((String)data.get("JIBUN")) +"</td> \n");
//			strb.append("			</tr> \n");
//			strb.append("		</tbody> \n");
//			strb.append("	</table> \n");
//			strb.append("</div> \n");
		}

		return strb.toString();

	}

	public String makeHtml(String str) {

		StringBuffer strb = new StringBuffer();

		for (int i = 0; i < str.length(); i++) {

			if (str.charAt(i) == '\n') {
//				strb.append("<BR>");
			} else {
				strb.append(str.charAt(i));
			}

		}

		return strb.toString();

	}

}
