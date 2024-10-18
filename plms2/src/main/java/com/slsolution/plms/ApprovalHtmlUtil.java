package com.slsolution.plms;

import java.io.BufferedReader;
import java.io.ByteArrayInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.OutputStream;
import java.math.BigDecimal;
import java.net.HttpURLConnection;
import java.net.MalformedURLException;
import java.net.URL;
import java.sql.SQLException;
import java.text.DecimalFormat;
import java.text.NumberFormat;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Locale;
import java.util.Map;
import java.util.Properties;

import javax.xml.parsers.DocumentBuilderFactory;
import javax.xml.xpath.XPath;
import javax.xml.xpath.XPathFactory;

import org.apache.tika.metadata.Database;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationContext;
import org.springframework.context.ApplicationContextAware;
import org.springframework.stereotype.Component;
import org.w3c.dom.Document;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.slsolution.plms.config.GlobalConfig;
import com.slsolution.plms.jisang.jisangController;
import com.slsolution.plms.json.JSONArray;
import com.slsolution.plms.json.JSONException;
import com.slsolution.plms.json.JSONObject;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.extern.slf4j.Slf4j;



@Component
@Slf4j
public class ApprovalHtmlUtil implements ApplicationContextAware {
	
	private String str_FILE_URL = ""; // 파일의 기본 경로

	private String plmsDomain = "http://plms.dopco.co.kr";
//	private String plmsDomain = "http://plmsdev.dopco.co.kr";
	CommonUtil CU=new CommonUtil();
	
	 private static ApplicationContext context;

	    // ApplicationContext 주입
	    @Override
	    public void setApplicationContext(ApplicationContext applicationContext) {
	        context = applicationContext;
	    }
	
	
	
	private String sHeader = "<head>\n <meta charset=\"utf-8\">\n <meta name=\"viewport\" content=\"width=device-width, initial-scale=1, maximum-scale=1, minimum-scale=1, user-scalable=no\" />\n <!--익스9렌더링-->\n <meta http-equiv=\"X-UA-Compatible\" content=\"IE=edge\" />\n <!--익스8이하렌더링-->\n <title>송유관 지상권관리시스템</title>\n <style>\n @font-face {"
			+ "\n font-family : 'NanumGothicBold';\n src: url('../../font/NanumGothicBold.eot');\n src: url('../../font/NanumGothicBold.eot?#iefix') format('embedded-opentype'), url('../../font/NanumGothicBold.woff') format('woff'), url('../../font/NanumGothicBold.ttf') format('truetype'), url('../../font/NanumGothicBold.svg#NanumGothicBold') format('svg');\n font-weight: normal;"
			+ "\n font-style: normal;\n }"
			+ "\n html, body, div, span, object, iframe,h1, h2, h3, h4, h5, h6, p, blockquote, pre, abbr, address, cite, code, del, dfn, em, img, ins, kbd, q, samp, small, strong, sub, sup, var, b, i,dl, dt, dd, ol, ul, li, fieldset, form, label, legend, table, caption, tbody, tfoot, thead, tr, th, td, article, aside, canvas, details, figcaption, figure, footer, header, hgroup, menu, nav, section, summary, time, mark, audio, video { margin:0; padding:0; border:0; outline:0; font-size:12px; background:transparent;}"
			+ "\n html, body { width: 1400px; height: 100%; }\n body { margin:0; padding:0;font-family: 'NanumGothic', sans-serif;font-size:12px;color:#242424;}\n nav ul { list-style:none; }\n img { border: 0; vertical-align:middle; }\n a { margin:0; padding:0; vertical-align:baseline; background:transparent; text-decoration: none; color:#242424; }"
			+ "\n p {line-height: 22px;}\n button { font-size: 11px; }\n table { width: 100%; border-collapse:collapse; border-spacing:0;}\n th { font-family : 'NanumGothicBold'; }\n th, td {border-width:1px; padding:2px 8px; color:#3c3c3c; }\n hr { display:block; height:1px; border:0; border-top:1px solid #cccccc; margin:1em 0; padding:0; }"
			+ "\n input, select, textarea { font-size: 1.0em;	vertical-align: middle;	margin: 0px; border-radius: 0; outline-style: none; box-sizing: border-box; }\n input[type=\"text\"], input[type=\"tel\"], input[type=\"password\"], input[type=\"number\"], input[type=\"email\"] {\n border: 1px solid #C2C2bE;"
			+ "\n font-family: \"NanumGothic\", \"Malgun Gothic\", \"맑은고딕\", dotum, \"돋움\", sans-serif, 'Arial';\n margin: 0px;\n color: #595959;\n line-height: 150%;\n padding: 3px 5px;\n height: 22px;\n }\n textarea {\n border: 1px solid #C2C2bE;\n font-family: \"NanumGothic\", \"Malgun Gothic\", \"맑은고딕\", dotum, \"돋움\", sans-serif, 'Arial';"
			+ "\n color: #595959;\n margin: 0px;\n background: #fff;\n resize: none;\n }\n select {\n border: 1px solid #C2C2bE;\n font-family: \"NanumGothic\", \"Malgun Gothic\", \"맑은고딕\", dotum, \"돋움\", sans-serif, 'Arial';\n margin: 0px;\n color: #595959;\n line-height: 180%;\n padding: 3px 5px;\n height: 22px;\n }\n h2 {"
			+ "\n color:#383838;\n margin-left:3px;\n margin-bottom:7px;\n font-size:25px;\n font-family : 'NanumGothicBold', sans-serif;\n color: #24334b;\n }\n h3 {\n color:#383838;\n margin-left:3px;\n margin-bottom:20px;\n font-size:20px;\n font-family : 'NanumGothicBold', sans-serif;;\n }\n h3:before {"
			+ "\n content: url(../../image/arrow_icon.png);\n vertical-align: middle;\n margin-right: 10px;\n }\n h4 {\n color: #383838;\n margin-left:3px;\n margin-bottom:7px;\n font-size:16px;\n font-family : 'NanumGothicBold', sans-serif;\n }\n h4:before {\n content: url(../../image/arrow2_icon.png);\n margin-right: 7px;"
			+ "\n margin-bottom: 5px;\n }\n h5 {\n color: #e46428;\n margin-left:3px;\n margin-bottom:7px;\n font-weight: normal;\n font-size: 14px;\n }\n .none {flex-direction: none;}\n #wrap {position: relative; min-height: 100%; overflow: hidden; }\n /*헤더*/"
			+ "\n #header { position: fixed; top: 0; left: 0; bottom: 0; width: 230px; height: 100%; min-height: 800px; padding-left: 25px; box-sizing: border-box; background-color: #2e3f59; z-index: 9999; }\n #header h1 img { margin-top: 38px; }\n /*메뉴 1Dep*/\n .depth1 { margin-top: 95px; }"
			+ "\n .depth1 > ul > li { display: block; width: 205px; height: 53px; margin-top: 15px; line-height: 53px; background: url(../../image/menu_bg_off.gif) no-repeat left bottom; }\n .depth1 > ul > li:first-child { margin-top: 0;}\n .depth1 > ul > li.on { background: url(../../image/menu_bg_on.gif) no-repeat left bottom; }"
			+ "\n .depth1 > ul > li:hover { background: url(../../image/menu_bg_on.gif) no-repeat left bottom; }\n .depth1 > ul > li >a {font-family: 'NanumGothicBold'; font-size: 16px; color: #fff; }\n /*메뉴 2Dep*/\n .depth2 { width: 185px; height: 100%; background: url(../../image/gnb2_bg.gif) repeat-y; position: absolute; top: 0; left: 230px;"
			+ "\n box-shadow: 5px 0 10px #c9c9c9; z-index: 9990; }\n .depth2 > ul { margin-left: 23px; }\n .depth2 > ul > li { display: block; line-height: 16px; margin-bottom: 15px; }\n .depth2 > ul > li > a.on { color: #ffa45c; }\n .depth2 > ul > li > a { font-family: 'NanumGothicBold'; font-size: 14px; color: #fff; }\n .depth2 > ul > li > a:hover { color: #ffa45c; }"
			+ "\n /*사용자 로그인*/\n #user_login { position: absolute; top: 170px; }\n #user_login > div { display: inline-block; }\n #user_login img { vertical-align: middle; }\n #user_login span { color: #9ca2ac; font-family: 'NanumGothicBold', sans-serif; margin-left: 3px; }\n #user_login a { color: #9ca2ac; font-family: 'NanumGothicBold', sans-serif; }"
			+ "\n #user_login p { color: #9ca2ac; font-family: 'NanumGothicBold', sans-serif; margin-top: 3px; }\n #user_login #accessTime { width: 100px; height: 20px; line-height: 20px; text-align: center; border-radius: 5px; background-color: #45536a; margin-left: 8px; }\n #user_login #accessTime span:first-child { border-right: #9ca2ac; }\n /*컨테이너*/"
			+ "\n #container { position: relative; z-index: 50; }\n .article { position: relative; min-height: 300px; width: 980px; }\n .title { margin-bottom: 30px; border-bottom: 1px solid #c1c1c1; font-family: 'NanumGothicBold', sans-serif; }\n .entry_area { padding: 10px 20px; border: 1px solid #d4d4d4; position: relative; }\n /*테이블*/\n .entry { width: 100%; }"
			+ "\n .entry select, .entry input[type=\"text\"] { width: 120px; height: 26px; }\n .dataTables_scrollHead {\n overflow: hidden;\n position: relative;\n border: 0px;\n width: 100%;\n }\n .dataTables_scrollHeadInner {\n box-sizing: border-box;\n width: 100%;\n padding-right: 17px;\n }\n .dataTables_scrollBody {"
			+ "\n position: relative;\n overflow-y: scroll;\n max-height: 595px;\n width: 100%;\n margin-top: -1px;\n }\n .dataTables_scrollBodyInner {\n box-sizing: border-box;\n width: 1113px;\n }\n .base1 {\n width: 100%;\n text-align: center;\n }\n .base1 th {\n height: 22px;\n background-color: #f3f3f3;"
			+ "\n border-left: 1px solid #d3d3d3;\n border-bottom: 1px solid #d3d3d3;\n vertical-align: middle;\n }\n .base1 tr:first-child th:first-child {\n border-left: 0;\n }\n .base1 tr:first-child th {\n border-top: 2px solid #2e3f59;\n }\n .base1 td {\n height: 22px;\n border-bottom: 1px solid #d3d3d3;"
			+ "\n border-left: 1px solid #d3d3d3;\n }\n .base1 td:first-child {\n border-left: 0;\n }\n .base3 {\n width: 100%;\n border-top: 1px solid #d3d3d3;\n text-align: center;\n }\n .base3 th {\n height: 22px;\n background-color: #f3f3f3;\n border-left: 1px solid #d3d3d3;\n border-bottom: 1px solid #d3d3d3;"
			+ "\n vertical-align: middle;\n }\n .base3 tr:first-child th:first-child {\n border-left: 0;\n }\n .base3 td {\n height: 22px;\n border-bottom: 1px solid #d3d3d3;\n border-left: 1px solid #d3d3d3;\n }\n .base3 td:first-child {\n border-left: 0;\n }\n .base4 {\n width:100%;\n border-top:2px solid #2e3f59;"
			+ "\n }\n .base4 tr {\n border-top:1px solid #d3d3d3;\n border-bottom:1px solid #d3d3d3;\n }\n .base4 th {\n height:22px;\n text-align:center;\n background-color:#f3f3f3;\n border-left:1px solid #d3d3d3;\n }\n .base4 th:first-child {\n border-left:0;\n }\n .base4 td {\n text-align:left;"
			+ "\n border-top:1px solid #d3d3d3;\n border-left:1px solid #d3d3d3;\n }\n .base4 td.inner_tag select {\n width: 100%;\n padding: 0;\n padding-left: 3px;\n border: 0;\n }\n .base4 td.inner_tag input[type=\"text\"] {\n width: 100%;\n padding: 0 7px;\n border: 0;\n }\n .base5 {\n width:100%;"
			+ "\n text-align:center;\n }\n .base5 tr {\n border-bottom:1px solid #d3d3d3;\n }\n .base5 th {\n height:22px;\n background-color:#f3f3f3;\n border-left: 1px solid #d3d3d3;\n }\n .base5 tr:first-child th {\n border-top: 2px solid #2e3f59;\n }\n .base5 tr:first-child th:first-child {\n border-left:0;\n }"
			+ "\n .base5 td {\n height: 22px;\n border-top:1px solid #d3d3d3;\n border-left:1px solid #d3d3d3;\n }\n .base5 td:first-child {\n border-left:0;\n }\n .base5 td.inner_tag input[type=\"text\"] {\n width: 100%;\n padding: 0;\n border: 0;\n text-align: center;\n }\n .pop_01 .dataTables_scrollBodyInner {"
			+ "\n width: 423px;\n }\n /*버튼*/\n .btnarea01 { text-align: right; margin: 10px 0 30px; }\n .btnarea04 { text-align: center; margin: 15px 0 25px; }\n .btn01 {\n width: 100px;\n height: 28px;\n font-family: 'NanumGothicBold', sans-serif;\n color: #fff;\n line-height: 28px;\n border-radius: 3px;\n background-color: #dc8037;"
			+ "\n border: 1px solid #dc8037;\n outline: none;\n text-align: center;\n margin-left: 10px;\n display: inline-block;\n }\n .btn01:link {\n color: #fff;\n }\n .btn03 {\n width: 100px;\n height: 28px;\n font-family: 'NanumGothicBold', sans-serif;\n color: #fff;\n line-height: 28px;\n border-radius: 3px;"
			+ "\n border: 1px solid #e4af51;\n background-color: #e4af51;\n outline: none;\n text-align: center;\n margin-left: 10px;\n display: inline-block;\n }\n .btn03:link {\n color: #fff;\n }\n .btn04 {\n width: 100px;\n height: 28px;\n font-family: 'NanumGothicBold', sans-serif;\n color: #e4af51;"
			+ "\n line-height: 28px;\n border-radius: 3px;\n border: 1px solid #e4af51;\n background-color: #fff;\n outline: none;\n text-align: center;\n margin-left: 10px;\n display: inline-block;\n }\n .btn04:link {\n color: #e4af51;\n }\n .intbl {\n clear:both;\n padding:4px 10px;\n margin:0;\n border-radius:2px;"
			+ "\n background-color:#868686;\n outline:none;\n text-align:center;\n display: inline-block;\n }\n .intbl_btn {\n padding:0;\n margin:0;\n font-family: 'NanumGothicBold';\n display:block;\n font-size:12px;\n color: #fff;\n }\n .intbl2 {\n clear:both;\n padding:4px 20px;\n border-radius:2px;"
			+ "\n background-color:#868686;\n outline:none;\n text-align:center;\n display: inline-block;\n }\n /*팝업*/\n .pop_title {\n height: 45px;\n line-height: 45px;\n background: #feedc1;\n border-bottom: 2px solid #2e3f59;\n padding: 0 25px;\n font-family: 'NanumGothicBold', sans-serif;\n }\n .pop_title span {"
			+ "\n color: #503e18;\n font-size: 22px;\n margin-left: 15px;\n }\n .pop_title img {\n margin-bottom: 8px;\n }\n .pop_01 {\n width: 500px;\n position: absolute;\n top: 20px;\n left: 45%;\n margin-left:-250px;\n border: 1px solid #2e3f59;\n background-color: #fff;\n z-index: 999;\n }\n .pop_03 {"
			+ "\n border: 1px solid #2e3f59;\n background-color: #fff;\n z-index: 999;\n }\n .pop_cont {\n padding: 0 30px;\n margin-top: 25px;\n }\n .pop_03 .pop_cont {\n padding: 0 30px;\n margin: 25px 0;\n }\n .pop_03 .dataTables_scrollBodyInner {\n width: 923px;\n }\n .text {\n background-color: #fff;\n border: 1px solid #d3d3d3;\n padding: 3px 5px;\n }\n </style>\n </head>";

	/**
	 * FileManager init Method FileManager
	 */
	public ApprovalHtmlUtil() {
		Properties env = new Properties();
		//InputStream is = getClass().getResourceAsStream("/db.properties");
		try {
			//env.load(is);
		} catch (Exception es) {
			es.printStackTrace();
			System.err.println("Can't read the properties file. Make sure env.properties is in the CLASSPATH");
		}

		str_FILE_URL = env.getProperty("FILE_URL");
	}

	/**
	 * 지상권 사용승락 html
	 * 
	 * @param map
	 **/
	public String getPERMIT_HTML(HashMap map, HttpServletRequest request, HttpServletResponse response) {
		GlobalConfig GC = context.getBean(GlobalConfig.class);
		CommonUtil cu = new CommonUtil();
		StringBuffer sbHtml = new StringBuffer();

		sbHtml.append(
				" <!DOCTYPE html>               																																																																																																																																																																																																																			\n");
		sbHtml.append(" <html lang=\"ko\" xmlns=\"http://www.w3.org/1999/xhtml\">                \n");
		sbHtml.append("           \n");
		sbHtml.append(sHeader);
		sbHtml.append("           \n");
		sbHtml.append(" <body>    \n");
		sbHtml.append("     <!-- wrap -->              \n");
		sbHtml.append("     <div id=\"wrap\">          \n");

		/** 첨부 서류 **/
		int n_fileCount = Integer.parseInt(String.valueOf(map.get("fileCount")));

		String str_FILE_PATH = ""; // 파일경로
		String str_FILE_NM = ""; // 파일네임
		String str_FILE_SEQ = ""; // 파일SEQ
		String str_PMT_NO = "";

		if (n_fileCount > 0) {
			ArrayList list = (ArrayList) map.get("fileList");

			sbHtml.append("           <form id='file_download_form' method='post' action='" + plmsDomain + "/dcl/jr/downloadFile' >                   \n");
			sbHtml.append("            <input type='hidden' name='file_no' />                  \n");
			sbHtml.append("            <input type='hidden' name='file_seq' />                   \n");
			sbHtml.append("            <input type='hidden' name='file_gubun' value='gover' />                  \n");
			sbHtml.append("            </form>                 \n");

//			for (int i = 0; i < 6; i++) {
//				HashMap hm = new HashMap();
//
//				if (5 == i) {
//					if (n_fileCount > 5) {
//						hm = (HashMap) list.get(i);
//						str_FILE_PATH = str_FILE_URL + cu.evl(String.valueOf(hm.get("FILE_PATH")), "");
//						str_FILE_NM = cu.evl(String.valueOf(hm.get("FILE_NM")), "");
//						str_FILE_SEQ = cu.evl(String.valueOf(hm.get("SEQ")), "");
//						str_PMT_NO = cu.evl(String.valueOf(hm.get("PMT_NO")), "");
//					} else {
//						str_FILE_PATH = "#";
//						str_FILE_NM = "";
//						str_FILE_SEQ = "";
//						str_PMT_NO = "";
//					}
//
//				} 
//				else {
//					hm = (HashMap) list.get(i);
//					str_FILE_PATH = str_FILE_URL + cu.evl(String.valueOf(hm.get("FILE_PATH")), "");
//					str_FILE_NM = cu.evl(String.valueOf(hm.get("FILE_NM")), "");
//					str_FILE_SEQ = cu.evl(String.valueOf(hm.get("SEQ")), "");
//					str_PMT_NO = cu.evl(String.valueOf(hm.get("PMT_NO")), "");
//				}
//
//				sbHtml.append("           <form id='file_download_form" + i + "' method='post' action='" + plmsDomain + "/dcl/jr/downloadFile' >                   \n");
//				sbHtml.append("            <input type='hidden' name='file_no' value='" + str_PMT_NO + "'/>                  \n");
//				sbHtml.append("            <input type='hidden' name='file_seq' value='" + str_FILE_SEQ + "' />                   \n");
//				sbHtml.append("            <input type='hidden' name='file_gubun' value='jisang_pmt' />                  \n");
//				sbHtml.append("            </form>                 \n");
//			}
		}

		sbHtml.append("           \n");
		sbHtml.append("         <!-- 컨테이너 -->      \n");
		sbHtml.append("         <div id=\"container\"> \n");
		sbHtml.append(" 			<!-- 팝업 : 지상권 사용 승락 등록 -->         \n");
		sbHtml.append("             <div class=\"pop_03\">                  \n");
		sbHtml.append("                 <div class=\"pop_title\">           \n");
		sbHtml.append("<span>지상권 사용 승락</span>                   \n");
		sbHtml.append("                 </div>         \n");
		sbHtml.append("                 <div class=\"pop_cont\">            \n");
		sbHtml.append("<!-- * 대상토지 -->             \n");
		sbHtml.append("<h4>대상토지</h4>               \n");
		sbHtml.append("<table class=\"base5\">         \n");
		sbHtml.append("            <colgroup>          \n");
		sbHtml.append("                <col style=\"width:254px\" />        \n");
		sbHtml.append("                <col style=\"width:94px\" />        \n");
		sbHtml.append("                <col style=\"width:94px\" />        \n");
		sbHtml.append("                <col style=\"width:94px\" />        \n");
		sbHtml.append("                <col style=\"width:94px\" />        \n");
		sbHtml.append("                <col style=\"width:94px\" />        \n");
		sbHtml.append("                <col style=\"width:94px\" />        \n");
		sbHtml.append("            </colgroup>         \n");
		sbHtml.append("            <thead>             \n");
		sbHtml.append("                <tr>            \n");
		sbHtml.append("                    <th scope=\"col\" rowspan=\"2\">주소</th>             \n");
		sbHtml.append("                    <th scope=\"col\" colspan=\"5\">지상권 설정</th>      \n");
		sbHtml.append("                    <th scope=\"col\" rowspan=\"2\">소유자</th>           \n");
		sbHtml.append("                    <th scope=\"col\" rowspan=\"2\">사용자</th>           \n");
		sbHtml.append("                </tr>           \n");
		sbHtml.append("                <tr>            \n");
		sbHtml.append("                    <th scope=\"col\">지목</th>      \n");
		sbHtml.append("                    <th scope=\"col\">전체면적(㎡)</th>                   \n");
		sbHtml.append("                    <th scope=\"col\">설정면적(㎡)</th>                   \n");
		sbHtml.append("                    <th scope=\"col\">설정금액</th> \n");
		sbHtml.append("                    <th scope=\"col\">자산분류번호</th>   \n");
		sbHtml.append("                </tr>           \n");
		sbHtml.append("            </thead>            \n");
		sbHtml.append("            <tbody>             \n");

		int n_toguCnt = Integer.parseInt(String.valueOf(map.get("togiCount")));
		if (n_toguCnt > 0) {
			ArrayList list = (ArrayList) map.get("togiList");
			for (int i = 0; i < n_toguCnt; i++) {
				HashMap hm = (HashMap) list.get(i);

				sbHtml.append("                <tr>            \n");
				sbHtml.append("                    <td>" + cu.evl(String.valueOf(hm.get("addr")), "") + "</td>               \n");
				sbHtml.append("                    <td>" + cu.evl(String.valueOf(hm.get("jimok")), "") + "</td> \n");
				sbHtml.append("                    <td>" + cu.evl(String.valueOf(hm.get("all_area")), "") + "</td>\n");
				sbHtml.append("                    <td>" + cu.evl(String.valueOf(hm.get("set_area")), "") + "</td>\n");
				sbHtml.append("                    <td class=\"inner_tag\">         \n");
				sbHtml.append("   " + cu.evl(String.valueOf(hm.get("set_money")), "") + "                    \n");
				sbHtml.append("                    </td>       \n");
				sbHtml.append("                    <td>" + cu.evl(String.valueOf(hm.get("jasan_no")), "") + "</td>                  \n");
				sbHtml.append("                    <td>" + cu.evl(String.valueOf(hm.get("soyuja")), "") + "</td>                  \n");
				sbHtml.append("                    <td class=\"inner_tag\">         \n");
				sbHtml.append("   " + cu.evl(String.valueOf(hm.get("pmt_user")), "") + "  \n");
				sbHtml.append("                    </td>       \n");
				sbHtml.append("                </tr>           \n");
			}
		} else {
			sbHtml.append("            <tr colspan=\"8\"><td>조회결과가 없습니다.</td></tr>            \n");
		}
		sbHtml.append("            </tbody>            \n");
		sbHtml.append("        </table>                \n");
		sbHtml.append("<br>       \n");
		sbHtml.append("<br>       \n");
		sbHtml.append("<!-- * 상세 내용 -->            \n");
		sbHtml.append("<h4>상세 내용</h4>              \n");
		sbHtml.append("<table class=\"base4\">         \n");
		sbHtml.append("    <colgroup>                  \n");
		sbHtml.append("        <col style=\"width:252px\" />                \n");
		sbHtml.append("        <col style=\"width:666px\" />                \n");
		sbHtml.append("    </colgroup>                 \n");
		sbHtml.append("    <tbody>\n");
		sbHtml.append("        <tr>                    \n");
		sbHtml.append("            <th scope=\"row\">사용 목적</th>         \n");

		/** 상세내용 **/
		int n_listCnt = Integer.parseInt(String.valueOf(map.get("count")));
		String str_USE_PURPOS = ""; // 사용목적
		String str_USE_ST_DATE = ""; // 시작 사용 기간
		String str_USE_ED_DATE = ""; // 끝 사용 기간
		String str_SPOT_RESULT = ""; // 관로위치 및 송유관 이격거리 현장확인 결과
		String str_RIVEW = ""; // 검토 의견
		String str_CONTRACT = ""; // 약정 사항

		if (n_listCnt > 0) {
			ArrayList list = (ArrayList) map.get("list");
			HashMap hm = (HashMap) list.get(0);
			str_USE_PURPOS = cu.evl(String.valueOf(hm.get("use_purpos")), "");
			str_USE_ST_DATE = cu.evl(String.valueOf(hm.get("use_st_date")), "");
			str_USE_ED_DATE = cu.evl(String.valueOf(hm.get("use_ed_date")), "");
			str_SPOT_RESULT = cu.evl(String.valueOf(hm.get("spot_result")), "");
			str_RIVEW = cu.evl(String.valueOf(hm.get("rivew")), "");
			str_CONTRACT = cu.evl(String.valueOf(hm.get("contract")), "");

		}

		sbHtml.append("            <td>" + str_USE_PURPOS + "</td>                  \n");
		sbHtml.append("        </tr>                   \n");
		sbHtml.append("        <tr>                    \n");
		sbHtml.append("            <th scope=\"row\">사용 기간</th>         \n");
		sbHtml.append("            <td>                \n");
		sbHtml.append("                <span>" + str_USE_ST_DATE + " ~ " + str_USE_ED_DATE + "</span>              \n");
		sbHtml.append("            </td>               \n");
		sbHtml.append("        </tr>                   \n");
		sbHtml.append("        <tr>                    \n");
		sbHtml.append("            <th scope=\"row\">검토 의견</th>         \n");
		sbHtml.append("            <td>                \n");
		sbHtml.append("                <p>             \n");
		sbHtml.append("                    * 관로 위치 및 송유관 이격거리 현장확인 결과          \n");
		sbHtml.append("                </p>            \n");
		sbHtml.append("                <p class=\"text\">                   \n");
		sbHtml.append("                    " + str_SPOT_RESULT + "    \n");
		sbHtml.append("                </p>            \n");
		sbHtml.append("                <p>             \n");
		sbHtml.append("                    * 검토 의견 \n");
		sbHtml.append("                </p>            \n");
		sbHtml.append("                <p class=\"text\">                   \n");
		sbHtml.append("                    " + str_RIVEW + "                   \n");
		sbHtml.append("                </p>            \n");
		sbHtml.append("                <p>             \n");
		sbHtml.append("                    * 약정 사항 \n");
		sbHtml.append("                </p>            \n");
		sbHtml.append("                <p class=\"text\">                   \n");
		sbHtml.append("                    " + str_CONTRACT + "                 \n");
		sbHtml.append("                </p>            \n");
		sbHtml.append("            </td>               \n");
		sbHtml.append("        </tr>                   \n");
		sbHtml.append("    </tbody>                    \n");
		sbHtml.append("</table>   \n");
		sbHtml.append("<br>       \n");
		sbHtml.append("<br>       \n");
		sbHtml.append("<!-- * 첨부 서류 -->            \n");
		sbHtml.append("<h4>첨부 서류</h4>              \n");
		sbHtml.append("<table class=\"base5\">         \n");
		sbHtml.append("    <colgroup>                  \n");
		sbHtml.append("        <col style=\"width:120px\" />                \n");
		sbHtml.append("        <col style=\"width:340px\" />                \n");
		sbHtml.append("        <col style=\"width:230px\" />                \n");
		sbHtml.append("        <col style=\"width:230px\" />                \n");
		sbHtml.append("    </colgroup>                 \n");
		sbHtml.append("    <thead>\n");
		sbHtml.append("        <tr>                    \n");
		sbHtml.append("            <th scope=\"col\" colspan=\"2\">파일내용</th>                 \n");
		sbHtml.append("            <th scope=\"col\">파일명</th>            \n");
		sbHtml.append("            <th scope=\"col\">파일선택</th>          \n");
		sbHtml.append("        </tr>                   \n");
		sbHtml.append("    </thead>                    \n");
		sbHtml.append("    <tbody>\n");

		// /** 첨부 서류 **/
		// int n_fileCount = Integer.parseInt(String.valueOf(
		// map.get("fileCount") ));
		//
		// String str_FILE_PATH= ""; // 파일경로
		// String str_FILE_NM= ""; // 파일네임
		// String str_FILE_SEQ= ""; // 파일SEQ
		// String str_PMT_NO= "";

		if (n_fileCount > 0) {
			ArrayList list = (ArrayList) map.get("fileList");

			for (int i = 0; i < 10; i++) {
				HashMap hm = new HashMap();
				log.info("hm:"+hm);
				if (9 == i) {
					if (n_fileCount > 9) {
						hm = (HashMap) list.get(i);
						str_FILE_PATH =cu.evl(String.valueOf(hm.get("file_path")), "");
						str_FILE_NM = cu.evl(String.valueOf(hm.get("file_nm")), "");
						str_FILE_SEQ = cu.evl(String.valueOf(hm.get("seq")), "");
						str_PMT_NO = cu.evl(String.valueOf(hm.get("pmt_no")), "");
					} else {
						str_FILE_PATH = "#";
						str_FILE_NM = "";
						str_FILE_SEQ = "";
						str_PMT_NO = "";
					}

				} else {
					hm = (HashMap) list.get(i);
					str_FILE_PATH =cu.evl(String.valueOf(hm.get("file_path")), "");
					//str_FILE_PATH = str_FILE_URL + cu.evl(String.valueOf(hm.get("file_path")), "");
					str_FILE_NM = cu.evl(String.valueOf(hm.get("file_nm")), "");
					str_FILE_SEQ = cu.evl(String.valueOf(hm.get("seq")), "");
					str_PMT_NO = cu.evl(String.valueOf(hm.get("pmt_no")), "");
				}

				System.out.println("str_FILE_PATH=" + str_FILE_PATH);
				System.out.println("str_FILE_NM=" + str_FILE_NM);
				System.out.println("str_FILE_SEQ=" + str_FILE_SEQ);
				System.out.println("str_PMT_NO=" + str_PMT_NO);

				sbHtml.append("        <tr>                    \n");
				if (0 == i) {
					sbHtml.append("            <td rowspan=\"10\">필수 증빙서류</td>     \n");
					sbHtml.append("            <td style=\"text-align:left;\">1. 토지사용 승낙(원)서</td>    \n");
				} else if (1 == i) {
					sbHtml.append("            <td style=\"text-align:left; border-left:1px solid #d3d3d3;\">2. 토지사용 기본조건</td>                   \n");
				} else if (2 == i) {
					sbHtml.append("            <td style=\"text-align:left; border-left:1px solid #d3d3d3;\">3. 굴착시 안전조치 사항</td>     \n");
				} else if (3 == i) {
					sbHtml.append("            <td style=\"text-align:left; border-left:1px solid #d3d3d3;\">4. 각서</td>                  \n");
				} else if (4 == i) {
					sbHtml.append("            <td style=\"text-align:left; border-left:1px solid #d3d3d3;\">5. 등기사항 전부 증명서</td>          \n");
				}else if (5 == i) {
					sbHtml.append("            <td style=\"text-align:left; border-left:1px solid #d3d3d3;\">6. 토지대장</td>          \n");
				}else if (6 == i) {
					sbHtml.append("            <td style=\"text-align:left; border-left:1px solid #d3d3d3;\">7. 지적도(관로표기)</td>          \n");
				}else if (7 == i) {
					sbHtml.append("            <td style=\"text-align:left; border-left:1px solid #d3d3d3;\">8. 현장사진</td>          \n");
				}else if (8 == i) {
					sbHtml.append("            <td style=\"text-align:left; border-left:1px solid #d3d3d3;\">9. 검토 의견서</td>          \n");
				}else if (9 == i) {
					sbHtml.append("            <td style=\"text-align:left; border-left:1px solid #d3d3d3;\">10. 도면(용지도,위치도 등),민원인 관계서류</td>          \n");
				}
//				else if (10 == i) {
//					sbHtml.append("            <td style=\"text-align:left; border-left:1px solid #d3d3d3;\">5. 현장 확인자의 자필 서명이 포함된 검토 의견서</td>          \n");
//				}
//				else if (5 == i) {
//					sbHtml.append("            <td>참고증빙</td>   \n");
//					sbHtml.append("            <td style=\"text-align:left;\">6. 기타 사용 승인 관련 부속서류\n");
//					sbHtml.append("                <br />&nbsp;&nbsp;&nbsp;(건축물 배치도, 공사관련 서류 등)</td>                 \n");
//
//				}

				sbHtml.append("            <td style=\"text-align:left;\">" + str_FILE_NM + "&nbsp;&nbsp;</td>                   \n");
				sbHtml.append("            <td>                \n");
				//sbHtml.append("                <input type='button' id='file" + i + "' value='파일선택' />          \n");
				sbHtml.append("      \n");
				// sbHtml.append(" <script> \n");
				// sbHtml.append(" $(\"#file"+i+"\").click(function(){
				// window.open(\""+str_FILE_PATH+"\"); }); \n");
				// sbHtml.append(" </script> \n");

				String type = "";
				if (str_FILE_NM != null && !str_FILE_NM.equals("")) {
					String pathSplit[] = str_FILE_NM.split("\\.");
					type = pathSplit[1].toLowerCase();
				}

//				if (type.equals("jpg") || type.equals("png") || type.equals("gif") || type.equals("bmp")) {
//					sbHtml.append("            <script>               \n");
//					sbHtml.append("                 $('#file" + i + "').click(function(){ window.open(\"" + str_FILE_PATH + "\");  });    \n");
//					sbHtml.append("            </script>               \n");
//				} else if (!type.equals("")) {
//					sbHtml.append("            <script>               \n");
//					sbHtml.append("                 $('#file" + i + "').click(function(){ document.getElementById('file_download_form" + i + "').submit();	  });    \n");
//					sbHtml.append("            </script>               \n");
//
//				}
				if ("DEV".equals(GC.getServerName())) {
				//개발
				sbHtml.append("<button class=\"fileDownloadBtn\" onclick=\"window.open('https://dgisdev.dopco.co.kr:8443/land/common/downloadfile?"
						  + "filePath=" + cu.evl(str_FILE_PATH, "") 
						    + "&fileName=" + cu.evl(str_FILE_NM, "") 
						    + "&fileJisangNo=" + str_PMT_NO
						    + "&fileSeq=" + cu.evl(str_FILE_SEQ,"") 
						    + "&fileGubun=gover', '_blank')\">다운로드 <span class=\"downloadIcon\"></span></button>\n");
				}
				else if ("LIVE".equals(GC.getServerName())) {
				//운영
				sbHtml.append("<button class=\"fileDownloadBtn\" onclick=\"window.open('https://dgis.dopco.co.kr:8443/land/common/downloadfile?"
					    + "filePath=" + cu.evl(str_FILE_PATH, "") 
					    + "&fileName=" + cu.evl(str_FILE_NM, "") 
					    + "&fileJisangNo=" + str_PMT_NO
					    + "&fileSeq=" + cu.evl(str_FILE_SEQ,"") 
					    + "&fileGubun=jisang_pmt', '_blank')\">다운로드 <span class=\"downloadIcon\"></span></button>\n");
				}
				else {
					sbHtml.append("<button class=\"fileDownloadBtn\" onclick=\"window.open('https://dgisdev.dopco.co.kr:8443/land/common/downloadfile?"
							  + "filePath=" + cu.evl(str_FILE_PATH, "") 
							    + "&fileName=" + cu.evl(str_FILE_NM, "") 
							    + "&fileJisangNo=" + str_PMT_NO
							    + "&fileSeq=" + cu.evl(str_FILE_SEQ,"") 
							    + "&fileGubun=gover', '_blank')\">다운로드 <span class=\"downloadIcon\"></span></button>\n");
				}
				sbHtml.append("            </td>               \n");
				sbHtml.append("        </tr>                   \n");

			}
		}

		sbHtml.append("    </tbody>                    \n");
		sbHtml.append("</table>   \n");
		sbHtml.append("                 </div>         \n");
		sbHtml.append("             </div>             \n");
		sbHtml.append("         </div>                 \n");
		sbHtml.append("     </div>\n");
		sbHtml.append(" </body>   \n");
		sbHtml.append(" </html> \n");

		return sbHtml.toString();
	}

	public String getGover_HTML(String TYPE, String GOVER_NO, String NextSeq, String FileSeq, String PmtNo, HttpServletRequest request, HttpServletResponse response) {
		
		MainService mainService = context.getBean(MainService.class);

		/** 조회 시작 **/
		ArrayList list = new ArrayList();
		ArrayList pnu_list = new ArrayList();
		ArrayList pmt_list = new ArrayList();
		ArrayList modify_list = new ArrayList();
		ArrayList file_list = new ArrayList();

		HashMap kibon_map = new HashMap();
		HashMap togi_map = new HashMap();
		HashMap pmt_map = new HashMap();
		HashMap file_map = new HashMap();

		CommonUtil cu = new CommonUtil();

		String goverNo = GOVER_NO;
		String str_result = "Y";

		try {
			HashMap params = new HashMap();
			params.put("GOVERNO", goverNo);
			params.put("GOVER_NO", goverNo);
			params.put("FILENO", goverNo);
			params.put("SEQ", NextSeq);
			params.put("PMTNO", PmtNo);

			list=mainService.selectQuery("jisangSQL.selectGoverList", params);
			//list = (ArrayList) Database.getInstance().queryForList("Json.selectGoverList", params); // 기본정보
			//pnu_list = (ArrayList) Database.getInstance().queryForList("Json.selectGoverPnuList", params); // 소속토지정보
			pnu_list=mainService.selectQuery("jisangSQL.selectGoverPnuList", params);
			//pmt_list = (ArrayList) Database.getInstance().queryForList("Json.selectGoverPmtList", params); // 허가
			pmt_list=mainService.selectQuery("jisangSQL.selectGoverPmtList", params);						// 정보
			params.put("SEQ", FileSeq);
			//file_list = (ArrayList) Database.getInstance().queryForList("Json.selectGoverRowDetail_FilesObject", params); // 첨부파일
			file_list=mainService.selectQuery("jisangSQL.selectGoverRowDetail_FilesObject", params);						// 정보
//			System.out.println("$$$ params=" + params);
			if (list.size() > 0) {
				kibon_map.put("GOVER_NO", cu.evl((String) ((HashMap) list.get(0)).get("GOVER_NO"), ""));
				kibon_map.put("JISA", cu.evl((String) ((HashMap) list.get(0)).get("JISA"), ""));
				kibon_map.put("YONGDO", cu.evl((String) ((HashMap) list.get(0)).get("YONGDO"), ""));
				kibon_map.put("PIPE_NAME", cu.evl((String) ((HashMap) list.get(0)).get("PIPE_NAME"), ""));
				kibon_map.put("PIPE_METER", cu.evl(String.valueOf(((HashMap) list.get(0)).get("PIPE_METER")), ""));
				kibon_map.put("SUN_GUBUN", cu.evl((String) ((HashMap) list.get(0)).get("SUN_GUBUN"), ""));
				kibon_map.put("USE_PURPOS", cu.evl((String) ((HashMap) list.get(0)).get("USE_PURPOS"), ""));
				kibon_map.put("GOVER_ST_DATE", cu.evl((String) ((HashMap) list.get(0)).get("GOVER_ST_DATE"), ""));
				kibon_map.put("GOVER_ED_DATE", cu.evl((String) ((HashMap) list.get(0)).get("GOVER_ED_DATE"), ""));
			}
			if (pnu_list.size() > 0) {
				for (int i = 0; i < pnu_list.size(); i++) {
					String SIDO = cu.evl((String) ((HashMap) pnu_list.get(i)).get("SIDO_NM"), "");
					String SGG = cu.evl((String) ((HashMap) pnu_list.get(i)).get("SGG_NM"), "");
					String EMD = cu.evl((String) ((HashMap) pnu_list.get(i)).get("EMD_NM"), "");
					String RI = cu.evl((String) ((HashMap) pnu_list.get(i)).get("RI_NM"), "");
					String JIBUN = cu.evl((String) ((HashMap) pnu_list.get(i)).get("JIBUN"), "");
					String ADDR = "";

					if (!SIDO.equals(""))
						ADDR += SIDO + " ";
					if (!SGG.equals(""))
						ADDR += SGG + " ";
					if (!EMD.equals(""))
						ADDR += EMD + " ";
					if (!RI.equals(""))
						ADDR += RI + " ";
					if (!JIBUN.equals(""))
						ADDR += JIBUN + " ";

					togi_map.put("ADDR" + i, ADDR);
					togi_map.put("GOVER_OWN_YN" + i, cu.evl((String) ((HashMap) pnu_list.get(i)).get("GOVER_OWN_YN"), ""));
					togi_map.put("JIJUK_AREA" + i, cu.evl((String) ((HashMap) pnu_list.get(i)).get("JIJUK_AREA"), ""));
					togi_map.put("GOVER_LENGTH" + i, cu.evl((String) ((HashMap) pnu_list.get(i)).get("GOVER_LENGTH"), ""));
					togi_map.put("GOVER_AREA" + i, cu.evl((String) ((HashMap) pnu_list.get(i)).get("GOVER_AREA"), ""));
				}
			}
			if (pmt_list.size() > 0) {
				for (int i = 0; i < pmt_list.size(); i++) {
					pmt_map.put("PMT_NO" + i, cu.evl((String) ((HashMap) pmt_list.get(i)).get("PMT_NO"), ""));
					pmt_map.put("PMT_NAME" + i, cu.evl((String) ((HashMap) pmt_list.get(i)).get("PMT_NAME"), ""));
					pmt_map.put("SISEOLNAME" + i, cu.evl((String) ((HashMap) pmt_list.get(i)).get("SISEOLNAME"), ""));
					pmt_map.put("PMT_OFFICE" + i, cu.evl((String) ((HashMap) pmt_list.get(i)).get("PMT_OFFICE"), ""));
					pmt_map.put("ADM_OFFICE" + i, cu.evl((String) ((HashMap) pmt_list.get(i)).get("ADM_OFFICE"), ""));
					pmt_map.put("GOVER_LENGTH" + i, cu.evl((String) (((HashMap) pmt_list.get(i)).get("GOVER_LENGTH")), ""));
					pmt_map.put("GOVER_AREA" + i, cu.evl((String) ((HashMap) pmt_list.get(i)).get("GOVER_AREA"), ""));
					pmt_map.put("DOSIPLAN" + i, cu.evl((String) ((HashMap) pmt_list.get(i)).get("DOSIPLAN"), ""));
					pmt_map.put("PMT_FIRST_DATE" + i, cu.evl((String) ((HashMap) pmt_list.get(i)).get("PMT_FIRST_DATE"), ""));
					pmt_map.put("PMT_ST_DATE" + i, cu.evl((String) ((HashMap) pmt_list.get(i)).get("PMT_ST_DATE"), ""));
					pmt_map.put("PMT_ED_DATE" + i, cu.evl((String) ((HashMap) pmt_list.get(i)).get("PMT_ED_DATE"), ""));
					pmt_map.put("NEXT_DATE" + i, cu.evl((String) ((HashMap) pmt_list.get(i)).get("NEXT_DATE"), ""));
					pmt_map.put("BUSEO" + i, cu.evl((String) ((HashMap) pmt_list.get(i)).get("BUSEO"), ""));
					pmt_map.put("NM" + i, cu.evl((String) ((HashMap) pmt_list.get(i)).get("NM"), ""));
					pmt_map.put("PHONE_NUMBER" + i, cu.evl((String) ((HashMap) pmt_list.get(i)).get("PHONE_NUMBER"), ""));
					pmt_map.put("PAY_WAY" + i, cu.evl((String) ((HashMap) pmt_list.get(i)).get("PAY_WAY"), ""));
					pmt_map.put("PAY_DATE" + i, cu.evl((String) ((HashMap) pmt_list.get(i)).get("PAY_DATE"), ""));
					pmt_map.put("PAY_MONEY" + i, cu.evl((String) ((HashMap) pmt_list.get(i)).get("PAY_MONEY"), ""));
				}
			}
			if (file_list.size() > 0) {
				for (int i = 0; i < file_list.size(); i++) {
					file_map.put("FILE_PATH" + i, cu.evl((String) ((HashMap) file_list.get(i)).get("FILE_PATH"), ""));
					file_map.put("FILE_NM" + i, cu.evl((String) ((HashMap) file_list.get(i)).get("FILE_NM"), ""));

				}
			}

//			System.out.println("file_list=" + file_list);

		} catch (Exception e) {
			e.printStackTrace();
		}

		/* 조회 끝 */
		StringBuffer sbHtml = new StringBuffer();

		sbHtml.append(
				" <!DOCTYPE html>																																																																																																																																																																																																																																																													\n");
		sbHtml.append(" <html lang=\"ko\" xmlns=\"http://www.w3.org/1999/xhtml\"> \n");
		sbHtml.append("                 \n");
		sbHtml.append(sHeader);
		sbHtml.append("                 \n");
		sbHtml.append(" <body>          \n");

		sbHtml.append("           <form id='file_download_form' method='post' action='" + plmsDomain + "/dcl/jr/downloadFile' >                   \n");
		sbHtml.append("            <input type='hidden' name='file_no' />                  \n");
		sbHtml.append("            <input type='hidden' name='file_seq' />                   \n");
		sbHtml.append("            <input type='hidden' name='file_gubun' value='gover' />                  \n");
		sbHtml.append("            </form>                 \n");

		if (file_list.size() > 0) {
			for (int i = 0; i < file_list.size(); i++) {
				String str_GOVER_NO = cu.evl(String.valueOf(((HashMap) file_list.get(i)).get("GOVER_NO")), "");
				String str_FILE_SEQ = cu.evl(String.valueOf(((HashMap) file_list.get(i)).get("FILE_SEQ")), "");
//				System.out.println("str_GOVER_NO=" + str_GOVER_NO + " , str_FILE_SEQ=" + str_FILE_SEQ);
				sbHtml.append("           <form id='file_download_form" + i + "' method='post' action='" + plmsDomain + "/dcl/jr/downloadFile' >                   \n");
				sbHtml.append("            <input type='hidden' name='file_no' value='" + str_GOVER_NO + "'/>                  \n");
				sbHtml.append("            <input type='hidden' name='file_seq' value='" + str_FILE_SEQ + "' />                   \n");
				sbHtml.append("            <input type='hidden' name='file_gubun' value='gover' />                  \n");
				sbHtml.append("            </form>                 \n");
			}
		}
		sbHtml.append("     <!-- wrap -->                    \n");
		sbHtml.append("     <div id=\"wrap\">                \n");
		sbHtml.append("         <!-- 컨테이너 -->            \n");
		sbHtml.append("         <div id=\"container\">       \n");
		sbHtml.append("			 <div class=\"title\">		");
		sbHtml.append("			 	<h2>점용 상신/갱신</h2>		");
		sbHtml.append("			 </div>		");
		sbHtml.append("			 <div class=\"article\">		");
		sbHtml.append("			 <!-- *기본 정보 -->		");
		sbHtml.append("			 <h4>기본 정보</h4>		");
		sbHtml.append("			 <table class=\"base4\">		");
		sbHtml.append("			 <colgroup>		");
		sbHtml.append("			 	<col style=\"width:20%\" />	");
		sbHtml.append("			 	<col style=\"width:30%\" />	");
		sbHtml.append("			 	<col style=\"width:20%\" />	");
		sbHtml.append("			 	<col style=\"width:30%\" />	");
		sbHtml.append("			 </colgroup>		");
		sbHtml.append("			 <tbody>		");
		if (TYPE.equals("update")) {
			sbHtml.append("			 	<tr>		");
			sbHtml.append("			 		<th scope=\"row\">관리번호</th>		");
			sbHtml.append("			 		<td class=\"inner_tag\" colspan=\"3\">		");
			sbHtml.append("					<span style=\"width:100%; display:inline-block; text-align:center;\">" + kibon_map.get("GOVER_NO") + "</span>	");
			sbHtml.append("			 		</td>");
			sbHtml.append("			 	</tr>	");
		}
		sbHtml.append("			 	<tr>		");
		sbHtml.append("			 		<th scope=\"row\">담당지사</th>	");
		sbHtml.append("			 		<td class=\"inner_tag\">	");
		sbHtml.append("			 			<span style=\"width:100%; display:inline-block; text-align:center;\">" + kibon_map.get("JISA") + "</span>	");
		sbHtml.append("			 		</td>	");
		sbHtml.append("			 		<th scope=\"row\">용도</th>	");
		sbHtml.append("			 		<td class=\"inner_tag\">	");
		sbHtml.append("			 			<span style=\"width:100%; display:inline-block; text-align:center;\">" + kibon_map.get("YONGDO") + "</span>	");
		sbHtml.append("			 		</td>	");
		sbHtml.append("			 	</tr>	");
		sbHtml.append("			 	<tr>		");
		sbHtml.append("			 		<th scope=\"row\">관로명(구간)</th>	");
		sbHtml.append("			 		<td class=\"inner_tag\">	");
		sbHtml.append("			 			<span style=\"width:100%; display:inline-block; text-align:center;\">" + kibon_map.get("PIPE_NAME") + "</span>	");
		sbHtml.append("			 		</td>	");
		sbHtml.append("			 		<th scope=\"row\">관경 및 단/복선</th>	");
		sbHtml.append("			 		<td class=\"inner_tag\">	");
		sbHtml.append("			 			<span style=\"width:47%; display:inline-block; text-align:center; border-right:1px solid #d3d3d3;\">" + kibon_map.get("PIPE_METER") + "</span>	");
		sbHtml.append("			 			<span style=\"width:47%; display:inline-block; text-align:center;\">" + kibon_map.get("SUN_GUBUN") + "</span>	");
		sbHtml.append("			 		</td>	");
		sbHtml.append("			 	</tr>	");
		sbHtml.append("			 	<tr>		");
		sbHtml.append("			 		<th>점용 목적</th>	");
		sbHtml.append("			 		<td class=\"inner_tag\">	");
		sbHtml.append("			 			<span style=\"width:100%; display:inline-block; text-align:center;\">" + kibon_map.get("USE_PURPOS") + "</span>	");
		sbHtml.append("			 		</td>	");
		sbHtml.append("			 		<th>점용 기간</th>	");
		sbHtml.append("			 		<td class=\"inner_tag\">		");
		sbHtml.append("			 			<span style=\"width:100%; display:inline-block; text-align:center;\">" + kibon_map.get("GOVER_ST_DATE") + " ~ " + kibon_map.get("GOVER_ED_DATE") + "</span>	");
		sbHtml.append("			 		</td>	");
		sbHtml.append("			 	</tr>	");
		sbHtml.append("			 </tbody>		");
		sbHtml.append("			 </table>		");
		sbHtml.append("			 <br>		");
		sbHtml.append("			 <!-- *소속 토지 정보 -->");
		sbHtml.append("			 <h4>소속 토지 정보</h4>");
		sbHtml.append("			 <table class=\'base4\'>");
		sbHtml.append("			 	<colgroup>");
		sbHtml.append("			 		<col style=\'width:20%\' />");
		sbHtml.append("			 		<col style=\'width:30%\' />");
		sbHtml.append("			 		<col style=\'width:20%\' />");
		sbHtml.append("			 		<col style=\'width:30%\' />");
		sbHtml.append("			 	</colgroup>");
		sbHtml.append("			 	<tbody>");
		if (pnu_list.size() > 0) {
			for (int i = 0; i < pnu_list.size(); i++) {
				sbHtml.append("			 		<tr>");
				sbHtml.append("			 			<th scope=\'row\'>행정구역</th>");
				sbHtml.append("			 			<td class=\'inner_tag\' colspan=\'3\'>");
				sbHtml.append("			 				<span style=\"width:100%; display:inline-block; text-align:center;\">" + togi_map.get("ADDR" + i) + "</span>	");
				sbHtml.append("			 			</td>");
				sbHtml.append("			 		</tr>");
				sbHtml.append("			 		<tr>");
				sbHtml.append("			 			<th scope=\'row\'>국공유지 여부</th>");
				sbHtml.append("			 			<td class=\'inner_tag\'>");
				sbHtml.append("			 				<span style=\"width:100%; display:inline-block; text-align:center;\">" + togi_map.get("GOVER_OWN_YN" + i) + "</span>	");
				sbHtml.append("			 			</td>");
				sbHtml.append("			 			<th scope=\'row\'>전체면적</th>");
				sbHtml.append("			 			<td class=\'inner_tag\'>");
				sbHtml.append("			 				<span style=\"width:100%; display:inline-block; text-align:center;\">" + togi_map.get("JIJUK_AREA" + i) + "</span>	");
				sbHtml.append("			 			</td>");
				sbHtml.append("			 		</tr>");
				sbHtml.append("			 		<tr>");
				sbHtml.append("			 			<th scope=\'row\'>연장(m)</th>");
				sbHtml.append("			 			<td class=\'inner_tag\'>");
				sbHtml.append("			 				<span style=\"width:100%; display:inline-block; text-align:center;\">" + togi_map.get("GOVER_LENGTH" + i) + "</span>	");
				sbHtml.append("			 			</td>");
				sbHtml.append("			 			<th scope=\'row\'>면적(㎥)</th>");
				sbHtml.append("			 			<td class=\'inner_tag\'>");
				sbHtml.append("			 				<span style=\"width:100%; display:inline-block; text-align:center;\">" + togi_map.get("GOVER_AREA" + i) + "</span>	");
				sbHtml.append("			 			</td>");
				sbHtml.append("			 		</tr>");
			}
		} else {
			sbHtml.append("			 		<tr>");
			sbHtml.append("			 			<th scope=\'row\'>행정구역</th>");
			sbHtml.append("			 			<td class=\'inner_tag\' colspan=\'3\'></td>");
			sbHtml.append("			 			");
			sbHtml.append("			 		</tr>");
			sbHtml.append("			 		<tr>");
			sbHtml.append("			 			<th scope=\'row\'>국공유지 여부</th>");
			sbHtml.append("			 			<td class=\'inner_tag\'></td>");
			sbHtml.append("			 			");
			sbHtml.append("			 			<th scope=\'row\'>전체면적</th>");
			sbHtml.append("			 			<td class=\'inner_tag\'></td>");
			sbHtml.append("			 			");
			sbHtml.append("			 		</tr>");
			sbHtml.append("			 		<tr>");
			sbHtml.append("			 			<th scope=\'row\'>연장(m)</th>");
			sbHtml.append("			 			<td class=\'inner_tag\'></td>");
			sbHtml.append("			 			");
			sbHtml.append("			 			<th scope=\'row\'>면적(㎥)</th>");
			sbHtml.append("			 			<td class=\'inner_tag\'></td>");
			sbHtml.append("			 			");
			sbHtml.append("			 		</tr>");
		}
		sbHtml.append("			 	</tbody>");
		sbHtml.append("			 </table>");
		sbHtml.append("			 <br>		");
		sbHtml.append("			 <!-- *점용 허가 기본 정보 -->");
		sbHtml.append("			 <h4>점용 허가 기본 정보</h4>");
		sbHtml.append("			 <table class=\"base5\">");
		sbHtml.append("			 	<colgroup>");
		sbHtml.append("			 		<col style=\'width:80px\' />");
		sbHtml.append("			 		<col style=\'width:107px\' />");
		sbHtml.append("			 		<col style=\'width:107px\' />");
		sbHtml.append("			 		<col style=\'width:107px\' />");
		sbHtml.append("			 		<col style=\'width:107px\' />");
		sbHtml.append("			 		<col style=\'width:107px\' />");
		sbHtml.append("			 		<col style=\'width:107px\' />");
		sbHtml.append("			 		<col style=\'width:107px\' />");
		sbHtml.append("			 		<col style=\'width:107px\' />");
		sbHtml.append("			 	</colgroup>");
		sbHtml.append("			 	<thead>");
		sbHtml.append("			 		<tr>");
		sbHtml.append("			 			<th scope=\"col\">순번</th>");
		sbHtml.append("			 			<th scope=\"col\">허가번호</th>");
		sbHtml.append("			 			<th scope=\"col\">허가명</th>");
		sbHtml.append("			 			<th scope=\"col\">시설명칭</th>");
		sbHtml.append("			 			<th scope=\"col\">허가관청</th>");
		sbHtml.append("			 			<th scope=\"col\">관리청</th>");
		sbHtml.append("				 		<th scope=\"col\">연장(m)</th>");
		sbHtml.append("				 		<th scope=\"col\">면적(㎥)</th>");
		sbHtml.append("				 		<th scope=\"col\">도시계획 <br/> 설정여부</th>");
		sbHtml.append("				 	</tr>");
		sbHtml.append("				</thead>");
		sbHtml.append("			 	<tbody>");
		if (pmt_list.size() > 0) {
			for (int i = 0; i < pmt_list.size(); i++) {
				sbHtml.append("			 		<tr>");
				sbHtml.append("			 			<td>" + (i + 1) + "</td>");
				sbHtml.append("			 			<td>" + pmt_map.get("PMT_NO" + i) + "</td>");
				sbHtml.append("			 			<td>" + pmt_map.get("PMT_NAME" + i) + "</td>");
				sbHtml.append("			 			<td>" + pmt_map.get("SISEOLNAME" + i) + "</td>");
				sbHtml.append("			 			<td>" + pmt_map.get("PMT_OFFICE" + i) + "</td>");
				sbHtml.append("			 			<td>" + pmt_map.get("ADM_OFFICE" + i) + "</td>");
				sbHtml.append("			 			<td>" + pmt_map.get("GOVER_LENGTH" + i) + "</td>");
				sbHtml.append("			 			<td>" + pmt_map.get("GOVER_AREA" + i) + "</td>");
				sbHtml.append("			 			<td>" + pmt_map.get("DOSIPLAN" + i) + "</td>");
				sbHtml.append("				 	</tr>");
			}

		} else {
			sbHtml.append("			 		<tr>");
			sbHtml.append("			 			<td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td>");
			sbHtml.append("				 	</tr>");
		}
		sbHtml.append("			 	</tbody>");
		sbHtml.append("			 </table>");
		sbHtml.append("			 <br>		");
		sbHtml.append("			 <!-- *점용 허가 및 점용료 납부 현황 -->");
		sbHtml.append("			 <h4>점용 허가 및 점용료 납부 현황</h4>");
		sbHtml.append("			 <table class=\"base5\">");
		sbHtml.append("			 	<colgroup>");
		sbHtml.append("			 		<col style=\'width:4%\' />");
		sbHtml.append("			 		<col style=\'width:15%\' />");
		sbHtml.append("			 		<col style=\'width:15%\' />");
		sbHtml.append("			 		<col style=\'width:10%\' />");
		sbHtml.append("			 		<col style=\'width:9%\' />");
		sbHtml.append("			 		<col style=\'width:9%\' />");
		sbHtml.append("			 		<col style=\'width:11%\' />");
		sbHtml.append("			 		<col style=\'width:9%\' />");
		sbHtml.append("			 		<col style=\'width:9%\' />");
		sbHtml.append("			 		<col style=\'width:9%\' />");
		sbHtml.append("			 	</colgroup>");
		sbHtml.append("			 	<thead>");
		sbHtml.append("			 		<tr>");
		sbHtml.append("			 			<th scope=\"col\" rowspan=\"2\">순번</th>");
		sbHtml.append("			 			<th scope=\"col\" colspan=\"2\">허가기간</th>");
		sbHtml.append("			 			<th scope=\"col\" rowspan=\"2\">차기예정일</th>");
		sbHtml.append("			 			<th scope=\"col\" colspan=\"3\">관리 부서</th>");
		sbHtml.append("			 			<th scope=\"col\" colspan=\"3\">점용료 납부현황</th>");
		sbHtml.append("				 	</tr>");
		sbHtml.append("			 		<tr>");
		sbHtml.append("			 			<th>시작일</th>");
		sbHtml.append("			 			<th>종료일</th>");
		sbHtml.append("			 			<th>부서</th>");
		sbHtml.append("			 			<th>담당자</th>");
		sbHtml.append("			 			<th>연락처</th>");
		sbHtml.append("			 			<th>납부방법</th>");
		sbHtml.append("			 			<th>납부연월일</th>");
		sbHtml.append("			 			<th>금액</th>");
		sbHtml.append("				 	</tr>");
		sbHtml.append("				</thead>");
		sbHtml.append("			 	<tbody>");
		if (pmt_list.size() > 0) {
			for (int i = 0; i < pmt_list.size(); i++) {
				sbHtml.append("			 		<tr>");
				sbHtml.append("			 			<td>" + (i + 1) + "</td>");
				sbHtml.append("			 			<td>" + pmt_map.get("PMT_ST_DATE" + i) + "</td>");
				sbHtml.append("			 			<td>" + pmt_map.get("PMT_ED_DATE" + i) + "</td>");
				sbHtml.append("			 			<td>" + pmt_map.get("NEXT_DATE" + i) + "</td>");
				sbHtml.append("			 			<td>" + pmt_map.get("BUSEO" + i) + "</td>");
				sbHtml.append("			 			<td>" + pmt_map.get("NM" + i) + "</td>");
				sbHtml.append("			 			<td>" + pmt_map.get("PHONE_NUMBER" + i) + "</td>");
				sbHtml.append("			 			<td>" + pmt_map.get("PAY_WAY" + i) + "</td>");
				sbHtml.append("			 			<td>" + pmt_map.get("PAY_DATE" + i) + "</td>");
				sbHtml.append("			 			<td>" + pmt_map.get("PAY_MONEY" + i) + "</td>");
				sbHtml.append("				 	</tr>");
			}
		} else {
			sbHtml.append("			 		<tr>");
			sbHtml.append("			 			<td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td>");
			sbHtml.append("				 	</tr>");
		}
		sbHtml.append("			 	</tbody>");
		sbHtml.append("			 </table>");
		sbHtml.append("			 <br>		");
		sbHtml.append("			 <!-- *첨부 파일 -->");
		sbHtml.append("			 <h4>첨부 파일</h4>");
		sbHtml.append("			 <table class=\"base5\">");
		sbHtml.append("			 	<colgroup>");
		sbHtml.append("			 		<col style=\'width:80%\' />");
		sbHtml.append("			 		<col style=\'width:20%\' />");
		sbHtml.append("			 	</colgroup>");
		sbHtml.append("			 	<thead>");
		sbHtml.append("			 		<tr>");
		sbHtml.append("			 			<th scope=\"col\">파일명</th>");
		sbHtml.append("			 			<th scope=\"col\">파일보기</th>");
		sbHtml.append("				 	</tr>");
		sbHtml.append("				</thead>");
		sbHtml.append("			 	<tbody>");
		if (file_list.size() > 0) {
			for (int i = 0; i < file_list.size(); i++) {
				sbHtml.append("			 		<tr>");
				sbHtml.append("			 			<td>" + file_map.get("FILE_NM" + i) + "</td>");
				String str_FILE_PATH = str_FILE_URL + file_map.get("FILE_PATH" + i);
				sbHtml.append("            <td>                \n");
				sbHtml.append("                <input type='button' id='file" + i + "' value='파일선택' />          \n");
				// sbHtml.append(" <script> \n");
				// sbHtml.append(" $(\"#file"+i+"\").click(function(){
				// window.open(\""+str_FILE_PATH+"\"); }); \n");
				// sbHtml.append(" </script> \n");

				// 파일다운로드 수정 2017.01.16*/
				String str_FILE_NM = cu.evl(String.valueOf(file_map.get("FILE_NM" + i)), ""); // 파일네임
				String type = "";

				if (str_FILE_NM != null && !str_FILE_NM.equals("")) {
					String pathSplit[] = str_FILE_NM.split("\\.");
					type = pathSplit[1].toLowerCase();
				}
				// System.out.println("type="+type);
				if (type.equals("jpg") || type.equals("png") || type.equals("gif") || type.equals("bmp")) {
					sbHtml.append("            <script>               \n");
					sbHtml.append("                 $(\"#file" + i + "\").click(function(){ window.open(\"" + str_FILE_PATH + "\");  });    \n");
					sbHtml.append("            </script>               \n");
				} else {
					sbHtml.append("            <script>               \n");
					sbHtml.append("                 $(\"#file" + i + "\").click(function(){ document.getElementById('file_download_form" + i + "').submit();	  });    \n");
					sbHtml.append("            </script>               \n");
				}
				////

				sbHtml.append("            </td>               \n");
				sbHtml.append("				 	</tr>");
			}
		} else {
			sbHtml.append("			 		<tr><td colspan=\"2\">첨부파일이 없습니다.</td></tr> 							");
		}
		sbHtml.append("			 	</tbody>																		");
		sbHtml.append("			 </table>																			");
		sbHtml.append("         </div>  \n");
		sbHtml.append("     </div>      \n");
		sbHtml.append(" </body>         \n");
		sbHtml.append("                 \n");
		sbHtml.append(" </html>         \n");

		return sbHtml.toString();

	}

	//점용료 납부/전자결재 
	public String getGover_pay_HTML(String TYPE, String GOVER_NO, String NextSeq, String FileSeq, String PmtNo,String fileList, HttpServletRequest request, HttpServletResponse response) throws JSONException {

		MainService mainService = context.getBean(MainService.class);
		GlobalConfig GC = context.getBean(GlobalConfig.class);
		/** 조회 시작 **/
		ArrayList list = new ArrayList();
		ArrayList pnu_list = new ArrayList();
		ArrayList pmt_list = new ArrayList();
		ArrayList pay_List = new ArrayList();
		ArrayList modify_list = new ArrayList();
		ArrayList file_list = new ArrayList();

		HashMap kibon_map = new HashMap();
		HashMap togi_map = new HashMap();
		HashMap pmt_map = new HashMap();
		HashMap pay_map = new HashMap();
		HashMap file_map = new HashMap();

		CommonUtil cu = new CommonUtil();

		String goverNo = GOVER_NO;
		String str_result = "Y";

		try {
			log.info("request:"+request);
			
	        // fileList를 가져옴
	      //  List<String> fileList = (List<String>) jsonRequest.get("fileList");
//			String requestParams = ParameterUtil.getRequestBodyToStr(request);
//			
//			JSONObject requestParamsObj = new JSONObject(requestParams);
//			log.info("requestParams:" + requestParams);
			log.info("--------------------start getGover_pay_HTML--------------");
			// JSONObject requestParamObj=new JSONObject(requestParams);
			HashMap params = new HashMap();
//			JSONArray fileJarr=requestParamObj.getJSONArray("fileList");
			ParameterParser parser = new ParameterParser(request);
			log.info("paser:"+parser.toString());
			
			// 선택 첨부파일
			String FILE_SIZE = parser.getString("fileSize", "0"); // 선택한 파일 수
			//String FILE_LIST = parser.getString("fileList", "0"); // 선택한 파일 수
			//log.info("file_list:"+FILE_LIST);
			 //log.info("fileArr:"+fileArr);
			params.put("GOVERNO", goverNo);
			params.put("GOVER_NO", goverNo);
			params.put("gover_no", goverNo);
			params.put("FILENO", goverNo);
			params.put("SEQ", NextSeq);
			params.put("PMTNO", PmtNo);
			params.put("FILES", fileList);
			

//			list = (ArrayList) Database.getInstance().queryForList("Json.selectGoverList", params); // 기본정보
//			pnu_list = (ArrayList) Database.getInstance().queryForList("Json.selectGoverPnuList", params); // 소속토지정보
//			pmt_list = (ArrayList) Database.getInstance().queryForList("Json.selectGoverPmtLastForApproval", params); // 허가 정보
//			pay_List = (ArrayList) Database.getInstance().queryForList("Json.selectGoverPayList", params); // 납부실적목록

			
			list = (ArrayList) mainService.selectQuery("goverSQL.selectGoverList", params); // 기본정보
			pnu_list = (ArrayList) mainService.selectQuery("goverSQL.selectGoverPnuList", params); // 소속토지정보
			pmt_list = (ArrayList) mainService.selectQuery("goverSQL.selectGoverPmtLastForApproval", params); // 허가 정보 부서정보
			pay_List = (ArrayList) mainService.selectQuery("goverSQL.selectGoverPayList", params); // 납부실적목록
			for(int i=0;i<pnu_list.size();i++) {
				log.info("pnu_list:"+pnu_list.get(i));
			}
		
			params.put("SEQ", FileSeq);

//			for (int i = 0; i < Integer.parseInt(FILE_SIZE); i++) {
//				params.put("FILE_SEQ", parser.getString("gv_fileSeq" + i, "0"));
//			//	file_list.add((HashMap) Database.getInstance().queryForObject("Json.selectGoverRowDetail_FilesObject", params)); // 첨부파일
//				file_list.add((HashMap) mainService.selectHashmapQuery("goverSQL.selectGoverRowDetail_FilesObject", params)); // 첨부파일
//			}
//			file_list = mainService.selectQuery("goverSQL.selectGoverRowDetail_FilesObject", params);
			if (fileList.length()>0) file_list = mainService.selectQuery("goverSQL.selectGoverRowDetail_FilesObjectFromIdx", params);
			//if (fileList.length()>0) file_list = mainService.selectQuery("goverSQL.selectGoverRowDetail_FilesObject", params);
			log.info("fileList:"+fileList);
//			System.out.println("$$$ params=" + params);
			log.info("list:"+list.get(0));
			if (list.size() > 0) {
				// 기본정보
				kibon_map.put("GOVER_NO", cu.evl((String) ((HashMap) list.get(0)).get("gover_no"), ""));
				kibon_map.put("JISA", cu.evl((String) ((HashMap) list.get(0)).get("jisa"), ""));
				kibon_map.put("GOVER_OWN_YN", cu.evl((String) ((HashMap) list.get(0)).get("gover_own_yn"), ""));
				kibon_map.put("GOVER_OVERLAP_YN", cu.evl((String) ((HashMap) list.get(0)).get("gover_overlap_yn"), ""));
				kibon_map.put("YONGDO", cu.evl((String) ((HashMap) list.get(0)).get("yongdo"), ""));
				kibon_map.put("PIPE_NAME", cu.evl((String) ((HashMap) list.get(0)).get("pipename"), ""));
				kibon_map.put("PIPE_METER", cu.evl(String.valueOf(((HashMap) list.get(0)).get("pipe_meter")), ""));
				kibon_map.put("PIPE_METER2", cu.evl(String.valueOf(((HashMap) list.get(0)).get("pipe_meter2")), ""));
				kibon_map.put("SUN_GUBUN", cu.evl((String) ((HashMap) list.get(0)).get("sun_gubun"), ""));
				kibon_map.put("USE_PURPOS", cu.evl((String) ((HashMap) list.get(0)).get("use_purpos"), ""));
				kibon_map.put("ADDRESS", cu.evl((String) ((HashMap) list.get(0)).get("sido_nm"), "") + " " + cu.evl((String) ((HashMap) list.get(0)).get("sgg_nm"), "") + " " + cu.evl((String) ((HashMap) list.get(0)).get("emd_nm"), "") + " " + cu.evl((String) ((HashMap) list.get(0)).get("ri_nm"), "") + " " + cu.evl((String) ((HashMap) list.get(0)).get("jibun"), ""));
				
				kibon_map.put("JIJUK_AREA", cu.evl(String.valueOf(((HashMap) list.get(0)).get("jijuk_area")), ""));
				kibon_map.put("JIMOK_TEXT", cu.evl((String) ((HashMap) list.get(0)).get("jimok_text"), ""));
				//kibon_map.put("JIJUK_AREA", cu.evl((String) ((HashMap) list.get(0)).get("jijuk_area"), ""));
				kibon_map.put("ADDRESS", cu.evl((String) ((HashMap) list.get(0)).get("address"), ""));
				kibon_map.put("DOSIPLAN", cu.evl((String) ((HashMap) list.get(0)).get("dosiplan"), ""));
				// java.sql.Date 객체에서 toString() 호출
				java.sql.Date sqlDate = (java.sql.Date) ((HashMap) list.get(0)).get("gover_st_date");
				kibon_map.put("GOVER_ST_DATE", cu.evl(sqlDate != null ? sqlDate.toString() : "", ""));
				
				java.sql.Date sqledDate = (java.sql.Date) ((HashMap) list.get(0)).get("gover_ed_date");
				kibon_map.put("GOVER_ED_DATE", cu.evl(sqledDate != null ? sqledDate.toString() : "", ""));

				//kibon_map.put("GOVER_ST_DATE", cu.evl((String) ((HashMap) list.get(0)).get("gover_st_date"), "").toString());
				//kibon_map.put("GOVER_ED_DATE", cu.evl((String) ((HashMap) list.get(0)).get("gover_ed_date"), "").toString());

				// 관리기관정보
				kibon_map.put("PMT_NM", cu.evl((String) ((HashMap) list.get(0)).get("pmt_nm"), ""));
				kibon_map.put("PMT_OFFICE", cu.evl((String) ((HashMap) list.get(0)).get("pmt_office"), ""));
				kibon_map.put("ADM_OFFICE", cu.evl((String) ((HashMap) list.get(0)).get("adm_office"), ""));
				kibon_map.put("OFFICE_DEPART", cu.evl((String) ((HashMap) list.get(0)).get("office_depart"), ""));
				kibon_map.put("OFFICE_CHARGE", cu.evl((String) ((HashMap) list.get(0)).get("office_charege"), ""));
				kibon_map.put("OFFICE_CONTACT", cu.evl((String) ((HashMap) list.get(0)).get("office_contact"), ""));
				kibon_map.put("OFFICE_MOBILE", cu.evl((String) ((HashMap) list.get(0)).get("office_mobile"), ""));
			}
			System.out.println("kibon_map=" + kibon_map);
			// 점용허가정보
			log.info("pmt_list:"+pmt_list.get(0));
			if (pmt_list.size() > 0) {
				pmt_map.put("PMT_NO", cu.evl((String) ((HashMap) pmt_list.get(0)).get("pmt_no"), ""));
				pmt_map.put("PAY_DATE", cu.evl((String) ((HashMap) pmt_list.get(0)).get("pay_date"), ""));
				pmt_map.put("PMT_ST_DATE", cu.evl((String) ((HashMap) pmt_list.get(0)).get("pmt_st_date"), ""));
				pmt_map.put("PMT_ED_DATE", cu.evl((String) ((HashMap) pmt_list.get(0)).get("pmt_ed_date"), ""));

				pmt_map.put("PAY_MONEY", cu.evl((String) ((HashMap) pmt_list.get(0)).get("pay_money"), ""));
				pmt_map.put("PAY_VAT", cu.evl((String) (((HashMap) pmt_list.get(0)).get("gp_pay_vat")), ""));
				pmt_map.put("PAY_WAY", cu.evl((String) ((HashMap) pmt_list.get(0)).get("pay_way"), ""));
			}
//			System.out.println("pmt_map=" + pmt_map);
			// 납부실적
			if (pay_List.size() > 0) {
				for (int i = 0; i < pay_List.size(); i++) {
					pay_map.put("PAY_YR" + i, cu.evl((String) ((HashMap) pay_List.get(i)).get("pay_yr"), ""));
					pay_map.put("SEQ" + i, cu.evl(String.valueOf(((HashMap) pay_List.get(i)).get("seq")), ""));

					//pay_map.put("SEQ" + i, cu.evl((String) ((HashMap) pay_List.get(i)).get("seq"), ""));
					pay_map.put("PAY_DATE" + i, cu.evl((String) ((HashMap) pay_List.get(i)).get("pay_date"), ""));
					pay_map.put("PAY_MONEY" + i, cu.evl((String) ((HashMap) pay_List.get(i)).get("pay_money"), ""));
					pay_map.put("PMT_ST_DATE" + i, cu.evl((String) ((HashMap) pay_List.get(i)).get("pmt_st_date"), ""));
					pay_map.put("PMT_ED_DATE" + i, cu.evl((String) ((HashMap) pay_List.get(i)).get("pmt_ed_date"), ""));
					pay_map.put("ECHO_NO" + i, cu.evl((String) ((HashMap) pay_List.get(i)).get("echo_no"), ""));
				}
			}
//			System.out.println("pay_map=" + pay_map);

			if (pnu_list.size() > 0) {
				for (int i = 0; i < pnu_list.size(); i++) {
					String SIDO = cu.evl((String) ((HashMap) pnu_list.get(i)).get("sido_nm"), "");
					String SGG = cu.evl((String) ((HashMap) pnu_list.get(i)).get("sgg_nm"), "");
					String EMD = cu.evl((String) ((HashMap) pnu_list.get(i)).get("emd_nm"), "");
					String RI = cu.evl((String) ((HashMap) pnu_list.get(i)).get("ri_nm"), "");
					String JIBUN = cu.evl((String) ((HashMap) pnu_list.get(i)).get("jibun"), "");
					String ADDR = "";

					if (!SIDO.equals(""))
						ADDR += SIDO + " ";
					if (!SGG.equals(""))
						ADDR += SGG + " ";
					if (!EMD.equals(""))
						ADDR += EMD + " ";
					if (!RI.equals(""))
						ADDR += RI + " ";
					if (!JIBUN.equals(""))
						ADDR += JIBUN + " ";

					togi_map.put("ADDR" + i, ADDR);
					togi_map.put("SIDO" + i, SIDO);
					togi_map.put("SGG" + i, SGG);
					togi_map.put("EMD" + i, EMD);
					togi_map.put("RI" + i, RI);
					togi_map.put("JIBUN" + i, JIBUN);
					togi_map.put("GOVER_OWN_YN" + i, cu.evl((String) ((HashMap) pnu_list.get(i)).get("gover_own_yn"), ""));
					
					Object jijukAreaObj = ((HashMap) pnu_list.get(i)).get("jijuk_area");
					// BigDecimal을 String으로 변환하고, null 여부를 확인하여 처리
					String jijukAreaStr = (jijukAreaObj != null) ? jijukAreaObj.toString() : "";
					togi_map.put("JIJUK_AREA" + i, cu.evl(jijukAreaStr, ""));
					
					
					Object jijukLengthObj = ((HashMap) pnu_list.get(i)).get("gover_length");
					// BigDecimal을 String으로 변환하고, null 여부를 확인하여 처리
					String jijukLengthStr = (jijukLengthObj != null) ? jijukLengthObj.toString() : "";
					togi_map.put("GOVER_LENGTH" + i, cu.evl(jijukLengthStr, ""));
					
					//togi_map.put("JIJUK_AREA" + i, cu.evl((String) ((HashMap) pnu_list.get(i)).get("jijuk_area"), ""));
					//togi_map.put("GOVER_LENGTH" + i, cu.evl((String) ((HashMap) pnu_list.get(i)).get("gover_length"), ""));
					togi_map.put("GOVER_AREA" + i, cu.evl(String.valueOf(((HashMap) pnu_list.get(i)).get("gover_area")), ""));
					//togi_map.put("GOVER_AREA" + i, cu.evl((String) ((HashMap) pnu_list.get(i)).get("gover_area"), ""));
				}
			}
//			System.out.println(togi_map);
			if (file_list.size() > 0) {
				for (int i = 0; i < file_list.size(); i++) {
					file_map.put("FILE_PATH" + i, cu.evl((String) ((HashMap) file_list.get(i)).get("ga_file_path"), ""));
					file_map.put("FILE_NM" + i, cu.evl((String) ((HashMap) file_list.get(i)).get("ga_file_nm"), ""));
					BigDecimal fileSeq = (BigDecimal) ((HashMap) file_list.get(i)).get("ga_file_seq");
					file_map.put("FILE_SEQ" + i, cu.evl(fileSeq != null ? fileSeq.toString() : "", ""));
					//file_map.put("FILE_SEQ" + i, cu.evl((String) ((HashMap) file_list.get(i)).get("ga_file_seq"), ""));
					file_map.put("FILE_GOVER_NO" + i, cu.evl((String) ((HashMap) file_list.get(i)).get("ga_gover_no"), ""));
					log.info("fileMap:"+file_map);

				}
			}

			System.out.println("file_list=" + file_list);
			
		} catch (Exception e) {
			e.printStackTrace();
		}
		
		/* 조회 끝 */
		StringBuffer sbHtml = new StringBuffer();

		sbHtml.append(
				" <!DOCTYPE html>																																																																																																																																																																																																																																																													\n");
		sbHtml.append(" <html lang=\"ko\" xmlns=\"http://www.w3.org/1999/xhtml\"> \n");
		sbHtml.append("                 \n");
		sbHtml.append(sHeader);
		sbHtml.append("                 \n");
		sbHtml.append(" <body>          \n");

		sbHtml.append("           <form id='file_download_form' method='post' action='" + plmsDomain + "/dcl/jr/downloadFile' >                   \n");
		sbHtml.append("            <input type='hidden' name='file_no' />                  \n");
		sbHtml.append("            <input type='hidden' name='file_seq' />                   \n");
		sbHtml.append("            <input type='hidden' name='file_gubun' value='gover' />                  \n");
		sbHtml.append("            </form>                 \n");

		if (file_list.size() > 0) {
			for (int i = 0; i < file_list.size(); i++) {
				String str_GOVER_NO = cu.evl(String.valueOf(((HashMap) file_list.get(i)).get("ga_gover_no")), "");
				String str_FILE_SEQ = cu.evl(String.valueOf(((HashMap) file_list.get(i)).get("ga_file_seq")), "");
//				System.out.println("str_GOVER_NO=" + str_GOVER_NO + " , str_FILE_SEQ=" + str_FILE_SEQ);
				sbHtml.append("           <form id='file_download_form" + i + "' method='post' action='" + plmsDomain + "/dcl/jr/downloadFile' >                   \n");
				sbHtml.append("            <input type='hidden' name='file_no' value='" + str_GOVER_NO + "'/>                  \n");
				sbHtml.append("            <input type='hidden' name='file_seq' value='" + str_FILE_SEQ + "' />                   \n");
				sbHtml.append("            <input type='hidden' name='file_gubun' value='gover' />                  \n");
				sbHtml.append("            </form>                 \n");
			}
		}
		sbHtml.append("     <!-- wrap -->                    \n");
		sbHtml.append("     <div id=\"wrap\">                \n");
		sbHtml.append("         <!-- 컨테이너 -->            \n");
		sbHtml.append("         <div id=\"container\">       \n");
		sbHtml.append("			 <div class=\"title\">		");
		sbHtml.append("			 	<h2>점용료 납부 / 전자결재 상세보기</h2>		");
		sbHtml.append("			 </div>		");
		sbHtml.append("			 <div class=\"article\">		");
		sbHtml.append("			 <!-- *기본 정보 -->		");
		sbHtml.append("			 <h4>기본 정보</h4>		");
		sbHtml.append("			 <table class=\"base4\">		");
		sbHtml.append("			 <colgroup>		");
		sbHtml.append("			 	<col style=\"width: 10%\" />	");
		sbHtml.append("			 	<col style=\"width: 23%\" />	");
		sbHtml.append("			 	<col style=\"width: 10%\" />	");
		sbHtml.append("			 	<col style=\"width: 23%\" />	");
		sbHtml.append("			 	<col style=\"width: 10%\" />	");
		sbHtml.append("			 	<col style=\"width: 24%\" />	");
		sbHtml.append("			 </colgroup>		");
		sbHtml.append("			 <tbody>		");
		sbHtml.append("			 	<tr>		");
		sbHtml.append("			 		<th scope=\"row\">관로<br />관리번호</th>	");
		sbHtml.append("			 		<td colspan=\"5\">	");
		sbHtml.append("			 			<span style=\"width:100%; display:inline-block; text-align:center;\">" + kibon_map.get("GOVER_NO") + "</span>	");
		sbHtml.append("			 		</td>	");
		sbHtml.append("			 	</tr>	");
		sbHtml.append("			 	<tr>		");
		sbHtml.append("			 		<th scope=\"row\">담당지사</th>	");
		sbHtml.append("			 		<td>");
		sbHtml.append("			 			<span style=\"width:100%; display:inline-block; text-align:center;\">" + kibon_map.get("JISA") + "</span>	");
		sbHtml.append("			 		</td>");
		sbHtml.append("			 		<th scope=\"row\">국/사유지</th>	");
		sbHtml.append("			 		<td>");
		sbHtml.append("			 			<span style=\"width:100%; display:inline-block; text-align:center;\">" + kibon_map.get("GOVER_OWN_YN") + "</span>	");
		sbHtml.append("			 		</td>");
		sbHtml.append("			 		<th scope=\"row\">관로저촉여부</th>	");
		sbHtml.append("			 		<td>");
		sbHtml.append("			 			<span style=\"width:100%; display:inline-block; text-align:center;\">" +  kibon_map.get("GOVER_OVERLAP_YN") + "</span>	"); // TODO: 관로저촉여부 값 입력내용 확인후 수정.=> 추후 관로관리 개발후 정보적용
		sbHtml.append("			 		</td>	");
		sbHtml.append("			 	</tr>");
		sbHtml.append("			 	<tr>");
		sbHtml.append("			 		<th scope=\"row\">용도</th>	");
		sbHtml.append("			 		<td>");
		sbHtml.append("			 			<span style=\"width:100%; display:inline-block; text-align:center;\">" + kibon_map.get("YONGDO") + "</span>	");
		sbHtml.append("			 		</td>");
		sbHtml.append("			 		<th scope=\"row\">관로명</th>	");
		sbHtml.append("			 		<td>");
		sbHtml.append("			 			<span style=\"width:100%; display:inline-block; text-align:center;\">" + kibon_map.get("PIPE_NAME") + "</span>");
		sbHtml.append("			 		</td>");
		sbHtml.append("			 		<th scope=\"row\">단/복선 및 관경</th>	");
		sbHtml.append("			 		<td>");
		sbHtml.append("			 			<span style=\"width:100%; display:inline-block; text-align:center;\">" + kibon_map.get("SUN_GUBUN") + " / " + kibon_map.get("PIPE_METER") + " / " + kibon_map.get("PIPE_METER2") + "</span>	");
		sbHtml.append("			 		</td>	");
		sbHtml.append("			 	</tr>");
		sbHtml.append("			 	<tr>");
		sbHtml.append("			 		<th scope=\"row\">주소</th>	");
		sbHtml.append("			 		<td colspan=\"5\">	");
		sbHtml.append("			 			<span style=\"width:100%; display:inline-block; text-align:center;\">" + kibon_map.get("ADDRESS") + "</span>	");
		sbHtml.append("			 		</td>	");
		sbHtml.append("			 	</tr>");
		sbHtml.append("			 	<tr>");
		sbHtml.append("			 		<th scope=\"row\">지목</th>	");
		sbHtml.append("			 		<td>");
		sbHtml.append("			 			<span style=\"width:100%; display:inline-block; text-align:center;\">" + kibon_map.get("JIMOK_TEXT") + "</span>	");
		sbHtml.append("			 		</td>");
		sbHtml.append("			 		<th scope=\"row\">지적면적</th>	");
		sbHtml.append("			 		<td>");
		log.info("kibon_map:"+kibon_map);
		sbHtml.append("			 			<span style=\"width:100%; display:inline-block; text-align:center;\">" + kibon_map.get("JIJUK_AREA") + "</span>	");
		sbHtml.append("			 		</td>");
		sbHtml.append("			 		<th scope=\"row\">토지이용계획</th>	");
		sbHtml.append("			 		<td>");
		sbHtml.append("			 			<span style=\"width:100%; display:inline-block; text-align:center;\">" + kibon_map.get("DOSIPLAN") + "</span>	");
		sbHtml.append("			 		</td>	");
		sbHtml.append("			 	</tr>");
		sbHtml.append("			 </tbody>		");
		sbHtml.append("			 </table>		");
		sbHtml.append("			 <br>		");
		sbHtml.append("			 <!-- *관리기관 정보 -->");
		sbHtml.append("			 <h4>관리기관 정보</h4>");
		sbHtml.append("			 <table class=\'base4\'>");
		sbHtml.append("			 	<colgroup>");
		sbHtml.append("			 		<col style=\"width: 10%\" />	");
		sbHtml.append("			 		<col style=\"width: 23%\" />	");
		sbHtml.append("			 		<col style=\"width: 10%\" />	");
		sbHtml.append("			 		<col style=\"width: 23%\" />	");
		sbHtml.append("			 		<col style=\"width: 10%\" />	");
		sbHtml.append("			 		<col style=\"width: 24%\" />	");
		sbHtml.append("			 	</colgroup>");
		sbHtml.append("			 	<tbody>");
		sbHtml.append("			 	<tr>");
		sbHtml.append("			 		<th scope=\"row\">허가관청</th>	");
		sbHtml.append("			 		<td>");
		sbHtml.append("			 			<span style=\"width:100%; display:inline-block; text-align:center;\">" + kibon_map.get("PMT_OFFICE") + "</span>	");
		sbHtml.append("			 		</td>");
		sbHtml.append("			 		<th scope=\"row\">관리기관</th>	");
		sbHtml.append("			 		<td>");
		sbHtml.append("			 			<span style=\"width:100%; display:inline-block; text-align:center;\">" + kibon_map.get("ADM_OFFICE") + "</span>	");
		sbHtml.append("			 		</td>");
		sbHtml.append("			 		<th scope=\"row\">부서</th>	");
		sbHtml.append("			 		<td>");
		sbHtml.append("			 			<span style=\"width:100%; display:inline-block; text-align:center;\">" + kibon_map.get("OFFICE_DEPART") + "</span>	");
		sbHtml.append("			 		</td>	");
		sbHtml.append("			 	</tr>");
		sbHtml.append("			 	<tr>");
		sbHtml.append("			 		<th scope=\"row\">담당자</th>	");
		sbHtml.append("			 		<td>");
		sbHtml.append("			 			<span style=\"width:100%; display:inline-block; text-align:center;\">" + kibon_map.get("OFFICE_CHARGE") + "</span>	");
		sbHtml.append("			 		</td>");
		sbHtml.append("			 		<th scope=\"row\">연락처</th>	");
		sbHtml.append("			 		<td colspan=\"3\">");
		sbHtml.append("			 			<span style=\"width:100%; display:inline-block; text-align:center;\">" + kibon_map.get("OFFICE_CONTACT") + "</span>	");
		sbHtml.append("			 		</td>");
		sbHtml.append("			 	</tr>");
		sbHtml.append("			 	</tbody>");
		sbHtml.append("			 </table>");
		sbHtml.append("			 <br>		");
		sbHtml.append("			 <!-- *납부 정보 -->");
		log.info("pmt_map:"+pmt_map);
		sbHtml.append("			 <h4>납부 정보</h4>");
		sbHtml.append("			 <table class=\"base4\">");
		sbHtml.append("			 	<colgroup>");
		sbHtml.append("			 		<col style=\"width: 10%\" />	");
		sbHtml.append("			 		<col style=\"width: 23%\" />	");
		sbHtml.append("			 		<col style=\"width: 10%\" />	");
		sbHtml.append("			 		<col style=\"width: 23%\" />	");
		sbHtml.append("			 		<col style=\"width: 10%\" />	");
		sbHtml.append("			 		<col style=\"width: 24%\" />	");
		sbHtml.append("			 	</colgroup>");
		sbHtml.append("			 	<tbody>\n");
		sbHtml.append("			 	<tr>");
		sbHtml.append("			 		<th scope=\"row\">허가번호</th>	");
		sbHtml.append("			 		<td>\n");
		sbHtml.append("			 			<span style=\"width:100%; display:inline-block; text-align:center;\">" + pmt_map.get("PMT_NO") + "</span>	\n");
		sbHtml.append("			 		</td>\n");
		sbHtml.append("			 		<th scope=\"row\">납부일</th>	");
		sbHtml.append("			 		<td>");
		sbHtml.append("			 			<span style=\"width:100%; display:inline-block; text-align:center;\">" + pmt_map.get("PAY_DATE") + "</span>	");
		sbHtml.append("			 		</td>\n");
		sbHtml.append("			 		<th scope=\"row\">유효기간</th>	");
		sbHtml.append("			 		<td>");
		sbHtml.append("			 			<span style=\"width:100%; display:inline-block; text-align:center;\">" + pmt_map.get("PMT_ST_DATE") + " ~ " + pmt_map.get("PMT_ED_DATE") + "</span>	");
		sbHtml.append("			 		</td>\n");
		sbHtml.append("			 	</tr>\n");
		sbHtml.append("			 	<tr>");
		sbHtml.append("			 		<th scope=\"row\">금액</th>	");
		sbHtml.append("			 		<td>");
		sbHtml.append("			 			<span style=\"width:100%; display:inline-block; text-align:center;\">" + pmt_map.get("PAY_MONEY") + "</span>	");
		sbHtml.append("			 		</td>\n");
		sbHtml.append("			 		<th scope=\"row\">VAT.</th>	");
		sbHtml.append("			 		<td>");
		sbHtml.append("			 			<span style=\"width:100%; display:inline-block; text-align:center;\">" + pmt_map.get("PAY_VAT") + "</span>	");
		sbHtml.append("			 		</td>\n");
		sbHtml.append("			 		<th scope=\"row\">합계</th>	");
		sbHtml.append("			 		<td>\n");
		Long sumValue = Long.parseLong((cu.evl((String) pmt_map.get("PAY_MONEY"), "0")).replaceAll(",", ""));
		sumValue += Long.parseLong((cu.evl((String) pmt_map.get("PAY_VAT"), "0")).replaceAll(",", ""));
		DecimalFormat df = new DecimalFormat("###,###.##");
		sbHtml.append("			 			<span style=\"width:100%; display:inline-block; text-align:center;\">" + df.format(sumValue) + "</span>	");
		sbHtml.append("			 		</td>	");
		sbHtml.append("			 	</tr>\n");
		sbHtml.append("			 	<tr>");
		sbHtml.append("			 		<th scope=\"row\">납부방법</th>	");
		sbHtml.append("			 		<td colspan=\"5\">");
		sbHtml.append("			 			<span style=\"width:100%; display:inline-block; text-align:center;\">" + pmt_map.get("PAY_WAY") + "</span>	");
		sbHtml.append("			 		</td>	");
		sbHtml.append("			 	</tr>\n");
		sbHtml.append("			 	</tbody>");
		sbHtml.append("			 </table>");
		sbHtml.append("			 <br>		");
		sbHtml.append("	<h4>소속 토지 정보</h4>");
		sbHtml.append("	<table class=\"base4\">");
		sbHtml.append("		<colgroup>");
		sbHtml.append("			<col style=\"width: 10%\" />");
		sbHtml.append("			<col style=\"width: 10%\" />");
		sbHtml.append("			<col style=\"width: 10%\" />");
		sbHtml.append("			<col style=\"width: 10%\" />");
		sbHtml.append("			<col style=\"width: 10%\" />");
		sbHtml.append("			<col style=\"width: 10%\" />");
		sbHtml.append("			<col style=\"width: 10%\" />");
		sbHtml.append("			<col style=\"width: 10%\" />");
		sbHtml.append("			<col style=\"width: 10%\" />");
		sbHtml.append("		</colgroup>");
		sbHtml.append("		<thead>");
		sbHtml.append("			<tr>");
		sbHtml.append("				<th scope=\"col\">순번</th>");
		sbHtml.append("				<th scope=\"col\">시도</th>");
		sbHtml.append("				<th scope=\"col\">시군구</th>");
		sbHtml.append("				<th scope=\"col\">읍면동</th>");
		sbHtml.append("				<th scope=\"col\">리</th>");
		sbHtml.append("				<th scope=\"col\">지번</th>");
		sbHtml.append("				<th scope=\"col\">전체 면적</th>");
		sbHtml.append("				<th scope=\"col\">연장(m)</th>");
		sbHtml.append("				<th scope=\"col\">면적(㎥)</th>");
		sbHtml.append("			</tr>");
		sbHtml.append("		</thead>");
		sbHtml.append("		<thead>");
		if (pnu_list.size() > 0) {
			for (int i = 0; i < pnu_list.size(); i++) {
				sbHtml.append("			<tr>");
				sbHtml.append("				<td style=\"text-align: center;\">" + (i + 1) + "</td>");
				sbHtml.append("				<td><span style=\"width:100%; display:inline-block; text-align:center;\">" + togi_map.get("SIDO" + i) + "</span></td>");
				sbHtml.append("				<td><span style=\"width:100%; display:inline-block; text-align:center;\">" + togi_map.get("SGG" + i) + "</span></td>");
				sbHtml.append("				<td><span style=\"width:100%; display:inline-block; text-align:center;\">" + togi_map.get("EMD" + i) + "</span></td>");
				sbHtml.append("				<td><span style=\"width:100%; display:inline-block; text-align:center;\">" + togi_map.get("RI" + i) + "</span></td>");
				sbHtml.append("				<td><span style=\"width:100%; display:inline-block; text-align:center;\">" + togi_map.get("JIBUN" + i) + "</span></td>");
				sbHtml.append("				<td><span style=\"width:100%; display:inline-block; text-align:center;\">" + togi_map.get("JIJUK_AREA" + i) + "</span></td>");
				sbHtml.append("				<td><span style=\"width:100%; display:inline-block; text-align:center;\">" + togi_map.get("GOVER_LENGTH" + i) + "</span></td>");
				sbHtml.append("				<td><span style=\"width:100%; display:inline-block; text-align:center;\">" + togi_map.get("GOVER_AREA" + i) + "</span></td>");
				sbHtml.append("			</tr>");
			}
		} else {
			sbHtml.append("			 		<tr>");
			sbHtml.append("			 			<td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td>");
			sbHtml.append("				 	</tr>");
		}
		sbHtml.append("		</thead>");
		sbHtml.append("	</table>");
		sbHtml.append("			 <br>		");
		sbHtml.append("			 <!-- *첨부 파일 -->");
		sbHtml.append("			 <h4>첨부 파일</h4>");
		sbHtml.append("			 <table class=\"base5\">");
		sbHtml.append("			 	<colgroup>");
		sbHtml.append("			 		<col style=\'width:80%\' />");
		sbHtml.append("			 		<col style=\'width:20%\' />");
		sbHtml.append("			 	</colgroup>");
		sbHtml.append("			 	<thead>");
		sbHtml.append("			 		<tr>");
		sbHtml.append("			 			<th scope=\"col\">파일명</th>");
		sbHtml.append("			 			<th scope=\"col\">파일보기</th>");
		sbHtml.append("				 	</tr>");
		sbHtml.append("				</thead>");
		sbHtml.append("			 	<tbody>");
		if (file_list.size() > 0) {
			
			for (int i = 0; i < file_list.size(); i++) {
				log.info("fileList"+i+":"+file_list.get(i));
				JSONObject fobj=new JSONObject(file_list.get(i));
				sbHtml.append("			 		<tr>");
				sbHtml.append("			 			<td>" + file_map.get("FILE_NM" + i) + "</td>");
				String str_FILE_PATH = str_FILE_URL + file_map.get("FILE_PATH" + i);
				sbHtml.append("            <td>                \n");
				//sbHtml.append("                <input type='button' id='file" + i + "' value='파일선택' />          \n");

				// 파일다운로드 수정 2017.01.16*/
				String str_FILE_NM = cu.evl(String.valueOf(file_map.get("FILE_NM" + i)), ""); // 파일네임
				String type = "";

				if (str_FILE_NM != null && !str_FILE_NM.equals("")) {
					String pathSplit[] = str_FILE_NM.split("\\.");
					type = pathSplit[1].toLowerCase();
				}
				// System.out.println("type="+type);
				/*
				if (type.equals("jpg") || type.equals("png") || type.equals("gif") || type.equals("bmp")) {
					sbHtml.append("            <script>               \n");
					sbHtml.append("                 $(\"#file" + i + "\").click(function(){ window.open(\"" + str_FILE_PATH + "\");  });    \n");
					sbHtml.append("            </script>               \n");
				} else {
					sbHtml.append("            <script>               \n");
					
					sbHtml.append("                 $(\"#file" + i + "\").click(function(){ document.getElementById('file_download_form" + i + "').submit();	  });    \n");
					sbHtml.append("            </script>               \n");
					//sbHtml.append("<button class=\"fileDownloadBtn\" th:onclick=\"downloadFile('"+cu.evl((String) ((HashMap) file_list.get(i)).get("ga_file_path"), "")+"','"+cu.evl((String) ((HashMap) file_list.get(i)).get("ga_file_nm"), "")+"','"+kibon_map.get("GOVER_NO")+"','"+cu.evl((String) ((HashMap) file_list.get(i)).get("ga_file_seq"), "")+"', 'gover')\">다운로드 <span class=\"downloadIcon\"></span></button>\n");
				}
				*/
				////
				//sbHtml.append("<button class=\"fileDownloadBtn\" th:onclick=\"downloadFile('"+cu.evl((String) ((HashMap) file_list.get(i)).get("ga_file_path"), "")+"','"+cu.evl((String) ((HashMap) file_list.get(i)).get("ga_file_nm"), "")+"','"+kibon_map.get("GOVER_NO")+"','"+cu.evl((String) ((HashMap) file_list.get(i)).get("ga_file_seq"), "")+"', 'gover')\">다운로드 <span class=\"downloadIcon\"></span></button>\n");
//				sbHtml.append("<button class=\"fileDownloadBtn\" onclick=\"downloadFile('"
//				        + cu.evl((String) ((HashMap) file_list.get(i)).get("ga_file_path"), "") + "','"
//				        + cu.evl((String) ((HashMap) file_list.get(i)).get("ga_file_nm"), "") + "','"
//				        + kibon_map.get("GOVER_NO") + "','"
//				        + cu.evl(
//				            ((HashMap) file_list.get(i)).get("ga_file_seq") != null ? 
//				            ((HashMap) file_list.get(i)).get("ga_file_seq").toString() : "", 
//				            "") 
//				        + "', 'gover')\">다운로드 <span class=\"downloadIcon\"></span></button>\n");
				if ("DEV".equals(GC.getServerName())) {
				//개발
				sbHtml.append("<button class=\"fileDownloadBtn\" onclick=\"window.open('https://dgisdev.dopco.co.kr:8443/land/common/downloadfile?"
					    + "filePath=" + cu.evl((String) ((HashMap) file_list.get(i)).get("ga_file_path"), "") 
					    + "&fileName=" + cu.evl((String) ((HashMap) file_list.get(i)).get("ga_file_nm"), "") 
					    + "&fileJisangNo=" + kibon_map.get("GOVER_NO") 
					    + "&fileSeq=" + cu.evl(
					        ((HashMap) file_list.get(i)).get("ga_file_seq") != null ? 
					        ((HashMap) file_list.get(i)).get("ga_file_seq").toString() : "", 
					        "") 
					    + "&fileGubun=gover', '_blank')\">다운로드1 <span class=\"downloadIcon\"></span></button>\n");
				}
				else if ("LIVE".equals(GC.getServerName())) {
				
				//운영
				sbHtml.append("<button class=\"fileDownloadBtn\" onclick=\"window.open('https://dgis.dopco.co.kr:8443/land/common/downloadfile?"
					    + "filePath=" + cu.evl((String) ((HashMap) file_list.get(i)).get("ga_file_path"), "") 
					    + "&fileName=" + cu.evl((String) ((HashMap) file_list.get(i)).get("ga_file_nm"), "") 
					    + "&fileJisangNo=" + kibon_map.get("GOVER_NO") 
					    + "&fileSeq=" + cu.evl(
					        ((HashMap) file_list.get(i)).get("ga_file_seq") != null ? 
					        ((HashMap) file_list.get(i)).get("ga_file_seq").toString() : "", 
					        "") 
					    + "&fileGubun=gover', '_blank')\">다운로드 <span class=\"downloadIcon\"></span></button>\n");
				}

				sbHtml.append("            </td>               \n");
				sbHtml.append("				 	</tr>");
			}
		} else {
			sbHtml.append("			 		<tr><td colspan=\"2\">첨부파일이 없습니다.</td></tr> 							");
		}
		
		
		
		sbHtml.append("			 	</tbody>																		");
		sbHtml.append("			 </table>																			");
		sbHtml.append("         </div>  \n");
		sbHtml.append("     </div>      \n");
		
		//script
		sbHtml.append("<script>	\n");
		sbHtml.append("function downloadFile(filePath, fileName, fileJisangNo, fileSeq, fileGubun) {	\n");
		sbHtml.append("let param = { \"filePath\":filePath, \"fileName\":fileName, \"fileJisangNo\":fileJisangNo, \"fileSeq\":fileSeq, \"fileGubun\":fileGubun }	\n");
		sbHtml.append("$.ajax({ 	\n");	//ajax 구간[S]
		
		sbHtml.append(" url: \"https://dgisdev.dopco.co.kr:8443/land/common/downloadfile\", data : param, type:\"GET\",		\n");
		sbHtml.append(" xhrFields: { responseType: 'blob'},	\n");
		sbHtml.append(" success : function(data, status, xhr) {		\n");
		sbHtml.append(" let disposition = xhr.getResponseHeader('Content-Disposition'); let filename = 'downloaded_file';	\n");
		sbHtml.append(" if(disposition && disposition.indexOf('filename*=UTF-8\\'\\'') !== -1){	\n");
		sbHtml.append(" 	filename = decodeURIComponent(disposition.split('filename*=UTF-8\\'\\'')[1]); \n");
		sbHtml.append(" }	\n");
		sbHtml.append(" let blob = new Blob([data],{ type: xhr.getResponseHeader('Content-Type')}); \n");
		sbHtml.append(" let link = document.createElement('a');	\n");
		sbHtml.append(" link.href = window.URL.createObjectURL(blob);	\n");
		sbHtml.append(" link.download = filename;	\n");
		sbHtml.append(" document.body.appendChild(link);	\n");
		sbHtml.append(" link.click();	\n");
		sbHtml.append(" document.body.removeChild(link);	\n");
		sbHtml.append(" },");
		sbHtml.append(" error: function(err) {console.error('파일 다운로드 실패', err); }	\n");
		sbHtml.append("});");	//ajax 구간[E]
		sbHtml.append("}	\n");
		sbHtml.append("</script>	\n");
		
		sbHtml.append(" </body>         \n");
		sbHtml.append("                 \n");
		sbHtml.append(" </html>         \n");
		System.out.println(sbHtml.toString());
		return sbHtml.toString();

	}

	public String getJisang_termination_HTML(String TYPE, String JISANG_NO, String NextSeq, String FileSeq, String PmtNo, HttpServletRequest request, HttpServletResponse response) {
		GlobalConfig GC = context.getBean(GlobalConfig.class);
log.info("-------------------getJisang_termination_HTML----------------------------");
		MainService mainService = context.getBean(MainService.class);
		/** 조회 시작 **/
		ArrayList list = new ArrayList();
		ArrayList heji_list = new ArrayList();
		ArrayList soyu_list = new ArrayList();
		ArrayList file_list = new ArrayList();

		HashMap kibon_map = new HashMap();
		HashMap soyu_map = new HashMap();
		HashMap file_map = new HashMap();

		CommonUtil cu = new CommonUtil();

		String jisangNo = JISANG_NO;
		String str_result = "Y";

		try {
			HashMap params = new HashMap();
			params.put("JISANGNO", jisangNo);
			params.put("JISANG_NO", jisangNo);
			params.put("FILENO", jisangNo);
			params.put("SEQ", NextSeq);
			params.put("PMTNO", PmtNo);

			// 정보조회
			// 기본정보
			// 해지정보
			// 해지사유 검토의견 등
			list=(ArrayList) mainService.selectQuery("jisangSQL.selectJisangRowDetail_KibonInfo", params);
			//list = (ArrayList) Database.getInstance().queryForList("Json.selectJisangRowDetail_KibonInfo", params); // 기본정보
			heji_list=(ArrayList) mainService.selectQuery("jisangSQL.selectJisangDetailListNew", params);
			//heji_list = (ArrayList) Database.getInstance().queryForList("Json.selectJisangDetailList", params); // 기본정보
			soyu_list=(ArrayList) mainService.selectQuery("jisangSQL.selectJisangRowDetail_SoujaInfo", params);
			//soyu_list = (ArrayList) Database.getInstance().queryForList("Json.selectJisangRowDetail_SoujaInfo", params); // 소유자정보
			// 첨부파일
			params.put("SEQ", FileSeq);
			//file_list=(ArrayList) mainService.selectQuery("jisangSQL.selectJisangRowDetail_Files", params);
			file_list=(ArrayList) mainService.selectQuery("jisangSQL.selectJisangCancel_Files", params);
			//ArrayList reqdoc_list=(ArrayList) mainService.selectQuery("jisangSQL.selectJisangCancel_Files", params);
			
			//file_list = (ArrayList) Database.getInstance().queryForList("Json.selectJisangRowDetail_Files", params); // 첨부파일
//			System.out.println("$$$ params=" + params);
			log.info("list:"+list);
			log.info("heji_list:"+heji_list);
			log.info("soyu_list:"+soyu_list);
			log.info("file_list:"+file_list);
			if (list.size() > 0) {
				// 기본정보
				kibon_map.put("JISANG_NO", cu.evl((String) ((HashMap) list.get(0)).get("jisang_no"), ""));
				kibon_map.put("JISA", cu.evl((String) ((HashMap) list.get(0)).get("jisa"), ""));
				kibon_map.put("ADDRESS", cu.evl((String) ((HashMap) list.get(0)).get("sido_nm"), "") + " " + cu.evl((String) ((HashMap) list.get(0)).get("sgg_nm"), "") + " " + cu.evl((String) ((HashMap) list.get(0)).get("emd_nm"), "") + " " + cu.evl((String) ((HashMap) list.get(0)).get("ri_nm"), "") + " " + cu.evl((String) ((HashMap) list.get(0)).get("jibun"), ""));
				kibon_map.put("SIDO_NM", cu.evl((String) ((HashMap) list.get(0)).get("sido_nm"), ""));
				kibon_map.put("SGG_NM", cu.evl((String) ((HashMap) list.get(0)).get("sgg_nm"), ""));
				kibon_map.put("EMD_NM", cu.evl((String) ((HashMap) list.get(0)).get("emd_nm"), ""));
				kibon_map.put("RI_NM", cu.evl((String) ((HashMap) list.get(0)).get("ri_nm"), ""));
				kibon_map.put("JIBUN", cu.evl((String) ((HashMap) list.get(0)).get("jibun"), ""));
				kibon_map.put("YONGDO", cu.evl((String) ((HashMap) list.get(0)).get("yongdo"), ""));
				kibon_map.put("PIPE_NAME", cu.evl((String) ((HashMap) list.get(0)).get("pipe_name"), ""));
				kibon_map.put("PIPE_OVERLAP_YN", cu.evl((String) ((HashMap) list.get(0)).get("pipe_overlap_yn"), ""));
				kibon_map.put("SUN_GUBUN", cu.evl((String) ((HashMap) list.get(0)).get("sun_gubun"), ""));
				kibon_map.put("JIJUK_AREA", cu.evl(String.valueOf(((HashMap) list.get(0)).get("jijuk_area")), ""));
				kibon_map.put("JIMOK_TEXT", cu.evl((String) ((HashMap) list.get(0)).get("jimok_text"), ""));

			}
			if (heji_list.size() > 0) {
				kibon_map.put("CANCLE_DATE", cu.evl((String) ((HashMap) heji_list.get(0)).get("cancle_date"), ""));
				kibon_map.put("CHUIDEUK_MONEY", cu.evl((String) ((HashMap) heji_list.get(0)).get("chuideuk_money"), "0"));
				kibon_map.put("GAMMONEY", cu.evl(String.valueOf(((HashMap) heji_list.get(0)).get("gammoney")), "0"));
				kibon_map.put("REMAINDER_MONEY", cu.evl(String.valueOf(((HashMap) heji_list.get(0)).get("remainder_money")), "0"));
				kibon_map.put("CANCLE_BOSANG_MONEY", cu.evl((String) ((HashMap) heji_list.get(0)).get("cancle_bosang_money"), "0"));

				kibon_map.put("CANCLE_REASON", cu.evl((String) ((HashMap) heji_list.get(0)).get("cancle_reason"), ""));
				kibon_map.put("CANCLE_COMMENT", cu.evl((String) ((HashMap) heji_list.get(0)).get("cancle_comment"), ""));
			}
//			System.out.println("kibon_map=" + kibon_map);

			if (file_list.size() > 0) {
				for (int i = 0; i < file_list.size(); i++) {
					file_map.put("FILE_PATH" + i, cu.evl((String) ((HashMap) file_list.get(i)).get("file_path"), "").trim());
					file_map.put("FILE_NM" + i, cu.evl((String) ((HashMap) file_list.get(i)).get("file_nm"), "").trim());

				}
			}

//			System.out.println("file_list=" + file_list);

		} catch (Exception e) {
			e.printStackTrace();
		}
log.info("kibon_map:"+kibon_map);
		/* 조회 끝 */
		StringBuffer sbHtml = new StringBuffer();

		sbHtml.append(
				" <!DOCTYPE html>																																																																																																																																																																																																																																																													\n");
		sbHtml.append(" <html lang=\"ko\" xmlns=\"http://www.w3.org/1999/xhtml\"> \n");
		sbHtml.append(sHeader);
		sbHtml.append(" <body>          \n");

		sbHtml.append("           <form id='file_download_form' method='post' action='" + plmsDomain + "/dcl/jr/downloadFile' >                   \n");
		sbHtml.append("            <input type='hidden' name='file_no' />                  \n");
		sbHtml.append("            <input type='hidden' name='file_seq' />                   \n");
		sbHtml.append("            <input type='hidden' name='file_gubun' value='jisang' />                  \n");
		sbHtml.append("            </form>                 \n");

		if (file_list.size() > 0) {
			for (int i = 0; i < file_list.size(); i++) {
				String str_JISANG_NO = cu.evl(String.valueOf(((HashMap) file_list.get(i)).get("JISANG_NO")), "");
				String str_FILE_SEQ = cu.evl(String.valueOf(((HashMap) file_list.get(i)).get("FILE_SEQ")), "");
//				System.out.println("str_JISANG_NO=" + str_JISANG_NO + " , str_FILE_SEQ=" + str_FILE_SEQ);
				sbHtml.append("           <form id='file_download_form" + i + "' method='post' action='" + plmsDomain + "/dcl/jr/downloadFile' >                   \n");
				sbHtml.append("            <input type='hidden' name='file_no' value='" + str_JISANG_NO + "'/>                  \n");
				sbHtml.append("            <input type='hidden' name='file_seq' value='" + str_FILE_SEQ + "' />                   \n");
				sbHtml.append("            <input type='hidden' name='file_gubun' value='jisang' />                  \n");
				sbHtml.append("            </form>                 \n");
			}
		}
		sbHtml.append("     <!-- wrap -->                    \n");
		sbHtml.append("     <div id=\"wrap\">                \n");
		sbHtml.append("         <!-- 컨테이너 -->            \n");
		sbHtml.append("         <div id=\"container\">       \n");
		sbHtml.append("			 <div class=\"title\">		\n");
		sbHtml.append("			 	<h2>지상권 해지</h2>		\n");
		sbHtml.append("			 </div>		\n");
		sbHtml.append("			 <div class=\"article\">		\n");
		sbHtml.append("			 <!-- *기본 정보 -->		\n");
		sbHtml.append("			 <h4>기본 정보</h4>		\n");

		sbHtml.append("<table class=\"base4\">\n");
		sbHtml.append("    <colgroup>\n");
		sbHtml.append("        <col style=\"width:12%\" />\n");
		sbHtml.append("        <col style=\"width:18%\" />\n");
		sbHtml.append("        <col style=\"width:12%\" />\n");
		sbHtml.append("        <col style=\"width:18%\" />\n");
		sbHtml.append("        <col style=\"width:12%\" />\n");
		sbHtml.append("        <col style=\"width:18%\" />\n");
		sbHtml.append("    </colgroup>\n");
		sbHtml.append("    <tbody>\n");
		sbHtml.append("        <tr>\n");
		sbHtml.append("            <th scope=\"row\">지상권 번호</th>\n");
		sbHtml.append("            <td colspan=\"5\" ><span style=\"width:100%; display:inline-block; text-align:center;\">" + kibon_map.get("JISANG_NO") + "</span></td>\n");
		sbHtml.append("        </tr>\n");
		sbHtml.append("        <tr>\n");
		sbHtml.append("            <th scope=\"row\">담당지사</th>\n");
		sbHtml.append("            <td colspan=\"3\"><span style=\"width:100%; display:inline-block; text-align:center;\">" + kibon_map.get("JISA") + "</span></td>\n");
		sbHtml.append("            <th scope=\"row\">관로일치여부</th>\n");
		sbHtml.append("            <td><span style=\"width:100%; display:inline-block; text-align:center;\">" + kibon_map.get("PIPE_OVERLAP_YN") + "</span></td>\n");
		sbHtml.append("        </tr>\n");
		sbHtml.append("        <tr>\n");
		sbHtml.append("            <th scope=\"row\">용도</th>\n");
		sbHtml.append("            <td><span style=\"width:100%; display:inline-block; text-align:center;\">" + kibon_map.get("YONGDO") + "</span></td>\n");
		sbHtml.append("            <th scope=\"row\">관로명(구간)</th>\n");
		sbHtml.append("            <td><span style=\"width:100%; display:inline-block; text-align:center;\">" + kibon_map.get("PIPE_NAME") + "</span></td>\n");
		sbHtml.append("            <th scope=\"row\">단/복선</th>\n");
		sbHtml.append("            <td><span style=\"width:100%; display:inline-block; text-align:center;\">" + kibon_map.get("SUN_GUBUN") + "</span></td>\n");
		sbHtml.append("        </tr>\n");
		sbHtml.append("        <tr>\n");
		sbHtml.append("            <th scope=\"row\">시도</th>\n");
		sbHtml.append("            <td><span style=\"width:100%; display:inline-block; text-align:center;\">" + kibon_map.get("SIDO_NM") + "</span></td>\n");
		sbHtml.append("            <th scope=\"row\">시군구</th>\n");
		sbHtml.append("            <td><span style=\"width:100%; display:inline-block; text-align:center;\">" + kibon_map.get("SGG_NM") + "</span></td>\n");
		sbHtml.append("            <th scope=\"row\">읍면동</th>\n");
		sbHtml.append("            <td><span style=\"width:100%; display:inline-block; text-align:center;\">" + kibon_map.get("EMD_NM") + "</span></td>\n");
		sbHtml.append("        </tr>\n");
		sbHtml.append("        <tr>\n");
		sbHtml.append("            <th scope=\"row\">동리</th>\n");
		sbHtml.append("            <td><span style=\"width:100%; display:inline-block; text-align:center;\">" + kibon_map.get("RI_NM") + "</span></td>\n");
		sbHtml.append("            <th scope=\"row\">지번</th>\n");
		sbHtml.append("            <td><span style=\"width:100%; display:inline-block; text-align:center;\">" + kibon_map.get("JIBUN") + "</span></td>\n");
		sbHtml.append("            <th scope=\"row\">지적 면적(㎡) / 지목</th>\n");
		sbHtml.append("            <td><span style=\"width:100%; display:inline-block; text-align:center;\">" + kibon_map.get("JIJUK_AREA") + " / " + kibon_map.get("JIMOK_TEXT") + "</span></td>\n");
		sbHtml.append("        </tr>\n");
		sbHtml.append("    </tbody>\n");
		sbHtml.append("</table>\n");
		sbHtml.append("<br>\n");
		sbHtml.append("<h4>소유자 정보</h4>\n");
		sbHtml.append("        <table class=\"base4\">\n");
		sbHtml.append("            <colgroup>\n");
		sbHtml.append("                <col style=\"width:10%\" />\n");
		sbHtml.append("                <col style=\"width:16%\" />\n");
		sbHtml.append("                <col style=\"width:16%\" />\n");
		sbHtml.append("                <col style=\"width:26%\" />\n");
		sbHtml.append("                <col style=\"width:16%\" />\n");
		sbHtml.append("                <col style=\"width:16%\" />\n");
		sbHtml.append("            </colgroup>\n");
		sbHtml.append("            <thead>\n");
		sbHtml.append("            <tr>\n");
		sbHtml.append("                <th scope=\"col\">순번</th>\n");
		sbHtml.append("                <th scope=\"col\">공유지분</th>\n");
		sbHtml.append("                <th scope=\"col\">성명</th>\n");
		sbHtml.append("                <th scope=\"col\">주소</th>\n");
		sbHtml.append("                <th scope=\"col\">연락처(집)</th>\n");
		sbHtml.append("                <th scope=\"col\">연락처(모바일)</th>\n");
		sbHtml.append("            </tr>\n");
		sbHtml.append("            </thead>\n");
		sbHtml.append("            <tbody>\n");

		if (soyu_list.size() > 0) {
			int count = 1;
			for (Object map : soyu_list) {
				soyu_map = (HashMap) map;
				sbHtml.append("            <tr>\n");
				sbHtml.append("                <td><span style=\"width:100%; display:inline-block; text-align:center;\">" + count + "</span></td>\n");
				sbHtml.append("                <td><span style=\"width:100%; display:inline-block; text-align:center;\">" + cu.evl((String) soyu_map.get("js_jibun"), "") + "</span></td>\n");
				sbHtml.append("                <td><span style=\"width:100%; display:inline-block; text-align:center;\">" + cu.evl((String) soyu_map.get("js_souja_name"), "") + "</span></td>\n");
				sbHtml.append("                <td><span style=\"width:100%; display:inline-block; text-align:center;\">" + cu.evl((String) soyu_map.get("js_address"), "") + "</span></td>\n");
				sbHtml.append("                <td><span style=\"width:100%; display:inline-block; text-align:center;\">" + cu.evl((String) soyu_map.get("js_home_number"), "") + "</span></td>\n");
				sbHtml.append("                <td><span style=\"width:100%; display:inline-block; text-align:center;\">" + cu.evl((String) soyu_map.get("js_pone_number"), "") + "</span></td>\n");
				sbHtml.append("            </tr>\n");
				count++;
			}
		}
		sbHtml.append("            </tbody>\n");
		sbHtml.append("        </table>\n");
		sbHtml.append("<br>\n");
		sbHtml.append("			 <!-- *해지정보 -->\n");
		sbHtml.append("			 <h4>해지정보</h4>\n");
		sbHtml.append("			 <table class=\'base4\'>\n");
		sbHtml.append("			 	<colgroup>\n");
		sbHtml.append("			 		<col style=\"width: 20%\" />	\n");
		sbHtml.append("			 		<col style=\"width: 16%\" />	\n");
		sbHtml.append("			 		<col style=\"width: 16%\" />	\n");
		sbHtml.append("			 		<col style=\"width: 16%\" />	\n");
		sbHtml.append("			 		<col style=\"width: 16%\" />	\n");
		sbHtml.append("			 		<col style=\"width: 16%\" />	\n");
		sbHtml.append("			 	</colgroup>\n");
		sbHtml.append("            <thead>\n");
		sbHtml.append("            <tr>\n");
		sbHtml.append("                <th scope=\"col\" rowspan=\"2\">해지일자</th>\n");
		sbHtml.append("                <th scope=\"col\" colspan=\"3\">자산 가액</th>\n");
		sbHtml.append("                <th scope=\"col\" colspan=\"2\">해지 보상</th>\n");
		sbHtml.append("            </tr>\n");
		sbHtml.append("            <tr>\n");
		sbHtml.append("                <th scope=\"col\">취득 금액</th>\n");
		sbHtml.append("                <th scope=\"col\">감가상각충당금</th>\n");
		sbHtml.append("                <th scope=\"col\">잔존가액</th>\n");
		sbHtml.append("                <th scope=\"col\">보상금액</th>\n");
		sbHtml.append("                <th scope=\"col\">보상손익</th>\n");
		sbHtml.append("            </tr>\n");
		sbHtml.append("            </thead>\n");
		sbHtml.append("			 	<tbody>\n");
		sbHtml.append("			 	<tr>\n");
		sbHtml.append("                <td><span style=\"width:100%; display:inline-block; text-align:center;\">" + kibon_map.get("CANCLE_DATE") + "</span></td>\n");
		sbHtml.append("                <td><span style=\"width:100%; display:inline-block; text-align:center;\">" + kibon_map.get("CHUIDEUK_MONEY") + "</span></td>\n");
		sbHtml.append("                <td><span style=\"width:100%; display:inline-block; text-align:center;\">" + kibon_map.get("GAMMONEY") + "</span></td>\n");
		sbHtml.append("                <td><span style=\"width:100%; display:inline-block; text-align:center;\">" + kibon_map.get("REMAINDER_MONEY") + "</span></td>\n");
		sbHtml.append("                <td><span style=\"width:100%; display:inline-block; text-align:center;\">" + kibon_map.get("CANCLE_BOSANG_MONEY") + "</span></td>\n");
		sbHtml.append("                <td><span style=\"width:100%; display:inline-block; text-align:center;\">" + NumberFormat.getInstance().format((Long.parseLong(kibon_map.get("CANCLE_BOSANG_MONEY").toString().replace(",", "")) - Long.parseLong(kibon_map.get("REMAINDER_MONEY").toString().replace(",", "")))) + "</span></td>\n");
		sbHtml.append("			 	</tr>\n");
		sbHtml.append("			 	</tbody>\n");
		sbHtml.append("			 </table>\n");

		sbHtml.append("			 <br>		\n");
		sbHtml.append("			 <table class=\'base4\'>\n");
		sbHtml.append("			 	<colgroup>\n");
		sbHtml.append("			 		<col style=\"width: 20%\" />	\n");
		sbHtml.append("			 		<col style=\"width: 80%\" />	\n");
		sbHtml.append("			 	</colgroup>\n");
		sbHtml.append("            <tr>\n");
		sbHtml.append("                <th scope=\"col\">해지사유</th>\n");
		sbHtml.append("                <td scope=\"col\"><span style=\"width:100%; display:inline-block; text-align:left;\">" + kibon_map.get("CANCLE_REASON") + "</span></td>\n");
		sbHtml.append("            </tr>\n");
		sbHtml.append("            <tr>\n");
		sbHtml.append("                <th scope=\"col\">검토의견</th>\n");
		sbHtml.append("                <td scope=\"col\"><span style=\"width:100%; display:inline-block; text-align:left;padding-left: 10px;\">" + CommonUtil.nvl((String) kibon_map.get("CANCLE_COMMENT")).replaceAll("\n", "<br />") + "</span></td>\n");
		sbHtml.append("            </tr>\n");
		sbHtml.append("			 </table>\n");

		sbHtml.append("			 <br>		\n");
		sbHtml.append("			 <!-- *필수 첨부 서류 -->\n");
		sbHtml.append("			 <h4>필수 첨부 서류</h4>\n");
		sbHtml.append("			 <table class=\"base5\">\n");
		sbHtml.append("			 	<colgroup>\n");
		sbHtml.append("        <col style=\"width:120px\" />                \n");
		sbHtml.append("        <col style=\"width:340px\" />                \n");
		sbHtml.append("        <col style=\"width:230px\" />                \n");
		sbHtml.append("        <col style=\"width:230px\" />                \n");
		sbHtml.append("			 	</colgroup>\n");
		sbHtml.append("			 	<thead>\n");
		sbHtml.append("			 		<tr>\n");
		sbHtml.append("            <th scope=\"col\" colspan=\"2\">파일내용</th>                 \n");
		sbHtml.append("			 			<th scope=\"col\">파일명</th>\n");
		sbHtml.append("			 			<th scope=\"col\">파일보기</th>\n");
		sbHtml.append("				 	</tr>\n");
		sbHtml.append("				</thead>\n");
		sbHtml.append("			 	<tbody>\n");
		if (file_list.size() > 0) {
			for (int i = 0; i < file_list.size(); i++) {
				sbHtml.append("			 		<tr>\n");
				
				if (0 == i) {
					sbHtml.append("            <td rowspan=\"8\">필수 증빙서류</td>     \n");
					sbHtml.append("            <td style=\"text-align:left;\">1. 등기사항 전부 증명서</td>    \n");
				} else if (1 == i) {
					sbHtml.append("            <td style=\"text-align:left; border-left:1px solid #d3d3d3;\">2. 토지대장</td>                   \n");
				} else if (2 == i) {
					sbHtml.append("            <td style=\"text-align:left; border-left:1px solid #d3d3d3;\">3. 지적도(관로표기)</td>     \n");
				} else if (3 == i) {
					sbHtml.append("            <td style=\"text-align:left; border-left:1px solid #d3d3d3;\">4. 현장사진</td>                  \n");
				} else if (4 == i) {
					sbHtml.append("            <td style=\"text-align:left; border-left:1px solid #d3d3d3;\">5. 검토의견서</td>          \n");
				}else if (5 == i) {
					sbHtml.append("            <td style=\"text-align:left; border-left:1px solid #d3d3d3;\">6. 도면,민원인 관계서류 등</td>          \n");
				}else if (6 == i) {
					sbHtml.append("            <td style=\"text-align:left; border-left:1px solid #d3d3d3;\">7. 지상권해지 승낙서/위임장</td>          \n");
				}else if (7 == i) {
					sbHtml.append("            <td style=\"text-align:left; border-left:1px solid #d3d3d3;\">8. 지상권 해지요청 공문서(신청서)</td>          \n");
				}
				sbHtml.append("			 			<td>" + file_map.get("FILE_NM" + i) + "</td>\n");
				String str_FILE_PATH = str_FILE_URL + file_map.get("FILE_PATH" + i);
				sbHtml.append("            <td>                \n");
				//sbHtml.append("                <input type='button' id='file" + i + "' value='파일선택' />          \n");

				// 파일다운로드 수정 2017.01.16*/
				String str_FILE_NM = cu.evl(String.valueOf(file_map.get("FILE_NM" + i)), ""); // 파일네임
				String type = "";

				if (str_FILE_NM != null && !str_FILE_NM.equals("")) {
					String pathSplit[] = str_FILE_NM.split("\\.");
					type = pathSplit[1].toLowerCase();
				}
//				 System.out.println("type="+type);
//				if (type.equals("jpg") || type.equals("png") || type.equals("gif") || type.equals("bmp")) {
//					sbHtml.append("            <script>               \n");
//					sbHtml.append("                 $(\"#file" + i + "\").click(function(){ window.open(\"" + str_FILE_PATH.trim() + "\");  });    \n");
//					sbHtml.append("            </script>               \n");
//				} else {
//					sbHtml.append("            <script>               \n");
//					sbHtml.append("                 $(\"#file" + i + "\").click(function(){ document.getElementById('file_download_form" + i + "').submit();	  });    \n");
//					sbHtml.append("            </script>               \n");
//				}
				////
				
				if ("DEV".equals(GC.getServerName())) {
				//개발
				sbHtml.append("<button class=\"fileDownloadBtn\" onclick=\"window.open('https://dgisdev.dopco.co.kr:8443/land/common/downloadfile?"
					    + "filePath=" + cu.evl((String) ((HashMap) file_list.get(i)).get("file_path"), "") 
					    + "&fileName=" + cu.evl((String) ((HashMap) file_list.get(i)).get("file_nm"), "") 
					    + "&fileJisangNo=" + kibon_map.get("JISANG_NO") 
					    + "&fileSeq=" + cu.evl(
					        ((HashMap) file_list.get(i)).get("file_gubun") != null ? 
					        ((HashMap) file_list.get(i)).get("file_gubun").toString() : "", 
					        "") 
					    + "&fileGubun=jisang', '_blank')\">다운로드 <span class=\"downloadIcon\"></span></button>\n");
				}
				else if ("LIVE".equals(GC.getServerName())) {
				//운영
				sbHtml.append("<button class=\"fileDownloadBtn\" onclick=\"window.open('https://dgis.dopco.co.kr:8443/land/common/downloadfile?"
					    + "filePath=" + cu.evl((String) ((HashMap) file_list.get(i)).get("file_path"), "") 
					    + "&fileName=" + cu.evl((String) ((HashMap) file_list.get(i)).get("file_nm"), "") 
					    + "&fileJisangNo=" + kibon_map.get("JISANG_NO") 
					    + "&fileSeq=" + cu.evl(
					        ((HashMap) file_list.get(i)).get("file_gubun") != null ? 
					        ((HashMap) file_list.get(i)).get("file_gubun").toString() : "", 
					        "") 
					    + "&fileGubun=jisang', '_blank')\">다운로드 <span class=\"downloadIcon\"></span></button>\n");

				}
				else {
					sbHtml.append("<button class=\"fileDownloadBtn\" onclick=\"window.open('https://dgisdev.dopco.co.kr:8443/land/common/downloadfile?"
						    + "filePath=" + cu.evl((String) ((HashMap) file_list.get(i)).get("file_path"), "") 
						    + "&fileName=" + cu.evl((String) ((HashMap) file_list.get(i)).get("file_nm"), "") 
						    + "&fileJisangNo=" + kibon_map.get("JISANG_NO") 
						    + "&fileSeq=" + cu.evl(
						        ((HashMap) file_list.get(i)).get("file_gubun") != null ? 
						        ((HashMap) file_list.get(i)).get("file_gubun").toString() : "", 
						        "") 
						    + "&fileGubun=jisang', '_blank')\">다운로드 <span class=\"downloadIcon\"></span></button>\n");
				}
				

				sbHtml.append("            </td>               \n");
				sbHtml.append("	</tr>\n");
			}
		} else {
			sbHtml.append("			 		<tr><td colspan=\"2\">첨부파일이 없습니다.</td></tr> 							");
		}
		sbHtml.append("			 	</tbody>																		");
		sbHtml.append("			 </table>																			");
		sbHtml.append("         </div>  \n");
		sbHtml.append("     </div>      \n");
		sbHtml.append(" </body>         \n");
		sbHtml.append("                 \n");
		sbHtml.append(" </html>         \n");

		System.out.println(sbHtml.toString());

		return sbHtml.toString();

	}

	/**
	 * 지상권 분할 상신 HTML 제작
	 * 
	 * @param JISANG_NO
	 * @param request
	 * @param response
	 * @return
	 * @throws Exception 
	 */
	public String getJisang_divide_HTML(String JISANG_NO) throws Exception {
		MainService mainService = context.getBean(MainService.class);
		GlobalConfig GC = context.getBean(GlobalConfig.class);
		CommonUtil cu = new CommonUtil();
		HashMap params = new HashMap();
		// 기존데이터 조회
		params.put("JISANGNO", JISANG_NO);
		ArrayList<HashMap> ori_list=mainService.selectQuery("jisangSQL.selectJisangDetailListNew", params);
//		ArrayList<HashMap> ori_list = (ArrayList<HashMap>) Database.getInstance().queryForList("Json.selectJisangDetailList", params);

		// 분할지번 지상권 조회
		params.put("BUNHAL_ORG_NO", JISANG_NO);
		ArrayList<HashMap> bunhal_list=mainService.selectQuery("jisangSQL.selectJisangBunhalTmpList", params);
		//ArrayList<HashMap> bunhal_list = (ArrayList<HashMap>) Database.getInstance().queryForList("Json.selectJisangBunhalTmpList", params);
		
		//신규필수첨부파일 조히
		// 분할지번 지상권 조회
		params.put("JISANG_NO", JISANG_NO);
		ArrayList<HashMap> file_list=mainService.selectQuery("jisangSQL.selectJisangBunhalAtcfile", params);
		
		
		
log.info("bunhal_list:"+bunhal_list);
log.info("ori_list:"+ori_list);
log.info("file_list:"+file_list);
log.info("file_list_size:"+file_list.size());
		// 해지정보 표시만 하기위한 로직
		ArrayList<HashMap> heji_list = new ArrayList<HashMap>();
		int check_count = 0;

		for (int i = 0; i < bunhal_list.size(); i++) {
			HashMap<String, String> map = new HashMap<String, String>();
			// 분할된 정보중 해지정보 리스트
			if ("Y".equals(CommonUtil.nvl(String.valueOf(bunhal_list.get(i).get("jb_cancle_yn"))))) {
				String addrStr = CommonUtil.nvl(bunhal_list.get(i).get("jb_sido_nm").toString()) + " " + CommonUtil.nvl((String) bunhal_list.get(i).get("jb_sgg_nm")) + " " + CommonUtil.nvl((String) bunhal_list.get(i).get("jb_emd_nm")) + " " + CommonUtil.nvl((String) bunhal_list.get(i).get("jb_ri_nm")) + " " + CommonUtil.nvl((String) bunhal_list.get(i).get("jb_jibun"));
				// 해지 리스트
				map.put("addrStr", addrStr);
				map.put("heji_toji_type", ("Y".equals(bunhal_list.get(i).get("jb_gover_own_yn")) ? "국유지" : "사유지"));
				map.put("heji_chuideuk_money", CommonUtil.numberWithCommas(bunhal_list.get(i).get("jb_chuideuk_money")));
				map.put("heji_chuideuk_gammoney", CommonUtil.numberWithCommas(bunhal_list.get(i).get("jb_gammoney")));
				map.put("heji_chuideuk_remainder_money", CommonUtil.numberWithCommas(bunhal_list.get(i).get("jb_remainder_money")));
				map.put("heji_cancle_bosang_money", CommonUtil.numberWithCommas(bunhal_list.get(i).get("jb_bosang_money")));
				map.put("heji_profit_loss", CommonUtil.numberWithCommas(bunhal_list.get(i).get("jb_profit_loss")));

				heji_list.add(map);
			}
		}

		// 모지번 지상권정보 및 소유자 정보 조회

		Map<String, String> dataMap = (HashMap<String, String>) ori_list.get(0);
		String address = null;

		if (ori_list != null && !ori_list.isEmpty() && ori_list.size() > 0) {
			log.info("ori_list:"+ori_list.get(0));
			dataMap = ori_list.get(0);
			
			address = CommonUtil.nvl(dataMap.get("sido_nm")) + " " + CommonUtil.nvl(dataMap.get("sgg_nm")) + " " + CommonUtil.nvl(dataMap.get("emd_nm")) + " " + CommonUtil.nvl(dataMap.get("ri_nm")) + " " + CommonUtil.nvl(dataMap.get("jibun"));
			dataMap.put("BUNHAL_DATE", (bunhal_list.get(0).get("jb_bunhal_date")==null)?"":bunhal_list.get(0).get("jb_bunhal_date").toString());
			dataMap.put("BUNHAL_REASON", bunhal_list.get(0).get("jb_bunhal_reason").toString());
			dataMap.put("BUNHAL_COMMENT", bunhal_list.get(0).get("jb_bunhal_comment").toString());
		}
		
		// 소유자정보 조회
		Map<String, String> soyuMap = new HashMap<String, String>();
		ArrayList<HashMap> soyu_list=mainService.selectQuery("jisangSQL.selectJisangDetailSoyu", params);
		//ArrayList<HashMap> soyu_list = (ArrayList<HashMap>) Database.getInstance().queryForList("Json.selectJisangDetailSoyu", params);

		if (soyu_list != null && !soyu_list.isEmpty() && soyu_list.size() > 0) {
			soyuMap = soyu_list.get(0);
		}
log.info("soyuMap:"+soyuMap);
		StringBuffer sbHtml = new StringBuffer();

		sbHtml.append(
				" <!DOCTYPE html>               																																																																																																																																																																																																																			\n");
		sbHtml.append(" <html lang=\"ko\" xmlns=\"http://www.w3.org/1999/xhtml\">                \n");
		sbHtml.append("           \n");
		sbHtml.append(sHeader);
		sbHtml.append("           \n");
		sbHtml.append(" <body>    \n");
		sbHtml.append("     <!-- wrap -->              \n");
		sbHtml.append("     <div id=\"wrap\">          \n");
		sbHtml.append("         <!-- 컨테이너 -->      \n");
		sbHtml.append("         <div id=\"container\"> \n");
		sbHtml.append("		<h4>대상토지</h4>\n");
		sbHtml.append("		<table class=\"base3\">\n");
		sbHtml.append("			<colgroup>\n");
		sbHtml.append("				<col style=\"width: 10%\" />\n");
		sbHtml.append("				<col style=\"width: 30%\" />\n");
		sbHtml.append("				<col style=\"width: 10%\" />\n");
		sbHtml.append("				<col style=\"width: 10%\" />\n");
		sbHtml.append("				<col style=\"width: 10%\" />\n");
		sbHtml.append("				<col style=\"width: 10%\" />\n");
		sbHtml.append("				<col style=\"width: 10%\" />\n");
		sbHtml.append("			</colgroup>\n");
		sbHtml.append("			<thead>\n");
		sbHtml.append("				<tr>\n");
		sbHtml.append("					<th rowspan=\"2\">지상권번호</th>\n");
		sbHtml.append("					<th rowspan=\"2\">주소</th>\n");
		sbHtml.append("					<th colspan=\"4\">지상권설정</th>\n");
		sbHtml.append("					<th rowspan=\"2\">소유자</th>\n");
		sbHtml.append("				</tr>\n");
		sbHtml.append("				<tr>\n");
		sbHtml.append("					<th style=\"border-left: 1px solid #d3d3d3;\">지목</th>\n");
		sbHtml.append("					<th>지적면적</th>\n");
		sbHtml.append("					<th>편입면적</th>\n");
//		sbHtml.append("					<!-- <th>설정금액</th> -->\n");
		sbHtml.append("					<th>자산번호</th>\n");
		sbHtml.append("				</tr>\n");
		sbHtml.append("			</thead>\n");
		sbHtml.append("			<tbody>\n");
		sbHtml.append("				<tr>\n");
		sbHtml.append("					<td>" + JISANG_NO + "</td>\n");
		sbHtml.append("					<td>" + address + "</td>\n");
		sbHtml.append("					<td>" + CommonUtil.nvl(dataMap.get("jimok_text")) + "</td>\n");
		log.info("dataMap:"+dataMap);
		Object jijukArea = dataMap.get("jijuk_area");
		String jijukAreaStr = CommonUtil.nvl(jijukArea != null ? jijukArea.toString() : "");
		Object pyeonibArea = dataMap.get("pyeonib_area");
		String pyeonibAreaStr = CommonUtil.nvl(pyeonibArea != null ? pyeonibArea.toString() : "");
		sbHtml.append("					<td>" + jijukAreaStr + "</td>\n");
		sbHtml.append("					<td>" + pyeonibAreaStr + "</td>\n");
//		sbHtml.append("					<!-- <td>???설정금액???</td> -->\n");
		sbHtml.append("					<td>" + CommonUtil.nvl(dataMap.get("jasan_no")) + "</td>\n");
		sbHtml.append("					<td>" + CommonUtil.nvl(soyuMap.get("js_souja_name")) + "</td>\n");
		sbHtml.append("				</tr>\n");
		sbHtml.append("			</tbody>\n");
		sbHtml.append("		</table>\n");
		sbHtml.append("		<br>\n");
		sbHtml.append("		<h4 style=\"width: 300px;\">토지분할</h4>\n");
		sbHtml.append("		<table class=\"base3\">\n");
		sbHtml.append("			<colgroup>\n");
		sbHtml.append("				<col style=\"width: 4%\" />\n");
		sbHtml.append("				<col style=\"width: 8%\" />\n");
		sbHtml.append("				<col style=\"width: 40%\" />\n");
		sbHtml.append("				<col style=\"width: 5%\" />\n");
		sbHtml.append("				<col style=\"width: 4%\" />\n");
		sbHtml.append("				<col style=\"width: 7%\" />\n");
		sbHtml.append("				<col style=\"width: 7%\" />\n");
		sbHtml.append("				<col style=\"width: 7%\" />\n");
		sbHtml.append("				<col style=\"width: 7%\" />\n");
//		sbHtml.append("				<col style=\"width: 4%\" />\n");
		sbHtml.append("				<col style=\"width: 7%\" />\n");
		sbHtml.append("			</colgroup>\n");
		sbHtml.append("			<thead>\n");
		sbHtml.append("				<tr>\n");
		sbHtml.append("					<th rowspan=\"2\">순번</th>\n");
		sbHtml.append("					<th rowspan=\"2\">지상권번호</th>\n");
		sbHtml.append("					<th rowspan=\"2\">주소</th>\n");
		sbHtml.append("					<th rowspan=\"2\">토지유형</th>\n");
		sbHtml.append("					<th colspan=\"4\">지상권설정</th>\n");
		sbHtml.append("					<th rowspan=\"2\">관로저촉</th>\n");
		sbHtml.append("					<th rowspan=\"2\">해지여부</th>\n");
		sbHtml.append("				</tr>\n");
		sbHtml.append("				<tr>\n");
		sbHtml.append("					<th style=\"border-left: 1px solid #d3d3d3;\">지목</th>\n");
		sbHtml.append("					<th>지적면적</th>\n");
		sbHtml.append("					<th>편입면적</th>\n");
//		sbHtml.append("					<th>설정금액</th>\n");
		sbHtml.append("					<th>자산번호</th>\n");
		sbHtml.append("				</tr>\n");
		sbHtml.append("			</thead>\n");
		sbHtml.append("			<tbody>\n");
		int listIdx = 2;
		int bulhadIdx = 0;
		for (HashMap bunhalMap : bunhal_list) {
			String jusoText = CommonUtil.nvl((String) bunhalMap.get("jb_sido_nm")) + " " + CommonUtil.nvl((String) bunhalMap.get("jb_sgg_nm")) + " " + CommonUtil.nvl((String) bunhalMap.get("jb_emd_nm")) + " " + CommonUtil.nvl((String) bunhalMap.get("jb_ri_nm")) + " " + CommonUtil.nvl((String) bunhalMap.get("jb_jibun"));
			String jisangNo = (String) bunhalMap.get("jb_jisang_no");
			sbHtml.append("				<tr>\n");
			sbHtml.append("					<td>" + listIdx + "</td>\n");
			sbHtml.append("					<td>" + (!"".equals(CommonUtil.nvl(jisangNo)) ? jisangNo : "신규") + "</td>\n");
			sbHtml.append("					<td>" + jusoText + "</td>\n");
			sbHtml.append("					<td>" + ("Y".equals(CommonUtil.nvl((String) bunhalMap.get("jb_gover_own_yn"))) ? "국유지" : "사유지") + "</td>\n");
			sbHtml.append("					<td>" + CommonUtil.nvl((String) bunhalMap.get("jb_jimok_text")) + "</td>\n");
			sbHtml.append("					<td>" + CommonUtil.nvl(bunhalMap.get("jb_jijuk_area") != null ? bunhalMap.get("jb_jijuk_area").toString() : "") + "</td>\n");
			sbHtml.append("					<td>" + CommonUtil.nvl(bunhalMap.get("jb_pyeonib_area").toString()) + "</td>\n");
//				sbHtml.append("					<td>"+CommonUtil.nvl(bunhalMap.get("SET_MONEY").toString())+"</td>\n");
			sbHtml.append("					<td>" + CommonUtil.nvl((String) bunhalMap.get("jb_jasan_no")) + "</td>\n");
			sbHtml.append("					<td>" + ("Y".equals(bunhalMap.get("jb_pipe_yn")) ? "Y" : "N") + "</td>\n");
			sbHtml.append("					<td>" + ("Y".equals(bunhalMap.get("jb_cancle_yn")) ? "Y" : "N") + "</td>\n");
			sbHtml.append("				</tr>\n");
			listIdx++;
			bulhadIdx++;
		}
		sbHtml.append("			</tbody>\n");
		sbHtml.append("		</table>\n");
		sbHtml.append("		<br>\n");
		sbHtml.append("		<h4>해지정보</h4>\n");
		sbHtml.append("		<table class=\"base3\">\n");
		sbHtml.append("			<colgroup>\n");
		sbHtml.append("				<col style=\"width: 40%\" />\n");
		sbHtml.append("				<col style=\"width: 10%\" />\n");
		sbHtml.append("				<col style=\"width: 10%\" />\n");
		sbHtml.append("				<col style=\"width: 10%\" />\n");
		sbHtml.append("				<col style=\"width: 10%\" />\n");
		sbHtml.append("				<col style=\"width: 10%\" />\n");
		sbHtml.append("				<col style=\"width: 10%\" />\n");
		sbHtml.append("			</colgroup>\n");
		sbHtml.append("			<thead>\n");
		sbHtml.append("				<tr>\n");
		sbHtml.append("					<th rowspan=\"2\">주소</th>\n");
		sbHtml.append("					<th rowspan=\"2\">토지유형</th>\n");
		sbHtml.append("					<th colspan=\"3\">자산가액</th>\n");
		sbHtml.append("					<th colspan=\"2\">해지보상</th>\n");
		sbHtml.append("				</tr>\n");
		sbHtml.append("				<tr>\n");
		sbHtml.append("					<th style=\"border-left: 1px solid #d3d3d3;\">취득금액</th>\n");
		sbHtml.append("					<th>감가상각충당금</th>\n");
		sbHtml.append("					<th>잔존가액</th>\n");
		sbHtml.append("					<th>보상금액</th>\n");
		sbHtml.append("					<th>보상손익</th>\n");
		sbHtml.append("				</tr>\n");
		sbHtml.append("			</thead>\n");
		sbHtml.append("			<tbody>\n");
		int heji_count = 0;
		log.info("heji_list:"+heji_list);
		for (HashMap hejiMap : heji_list) {
			log.info("hejiMap:"+hejiMap);
			sbHtml.append("				<tr>\n");
			sbHtml.append("					<td>" + CommonUtil.nvl((String) hejiMap.get("addrStr")) + "</td>\n");
			sbHtml.append("					<td>" + CommonUtil.nvl((String) hejiMap.get("heji_toji_type")) + "</td>\n");
			sbHtml.append("					<td>" + CommonUtil.nvl((String) hejiMap.get("heji_chuideuk_money")) + "</td>\n");
			sbHtml.append("					<td>" + CommonUtil.nvl((String) hejiMap.get("heji_chuideuk_gammoney")) + "</td>\n");
			sbHtml.append("					<td>" + CommonUtil.nvl((String) hejiMap.get("heji_chuideuk_remainder_money")) + "</td>\n");
			sbHtml.append("					<td>" + CommonUtil.nvl((String) hejiMap.get("heji_cancle_bosang_money")) + "</td>\n");
			sbHtml.append("					<td>" + CommonUtil.nvl((String) hejiMap.get("heji_profit_loss")) + "</td>\n");
			sbHtml.append("				</tr>\n");
		}
		sbHtml.append("			</tbody>\n");
		sbHtml.append("		</table>\n");
		sbHtml.append("		<br>\n");
		sbHtml.append("		<h4>분할사유 및 검토의견</h4>\n");
		sbHtml.append("		<table class=\"base4\">\n");
		sbHtml.append("			<colgroup>\n");
		sbHtml.append("				<col style=\"width: 20%\" />\n");
		sbHtml.append("				<col style=\"width: 80%\" />\n");
		sbHtml.append("			</colgroup>\n");
		sbHtml.append("			<tr>\n");
		sbHtml.append("				<th>분할일자</th>\n");
		sbHtml.append("				<td style=\"text-align: left;\">" + dataMap.get("BUNHAL_DATE") + "</td>\n");
		sbHtml.append("			</tr>\n");
		sbHtml.append("			<tr>\n");
		sbHtml.append("				<th>분할사유</th>\n");
		sbHtml.append("				<td>" + dataMap.get("BUNHAL_REASON") + "</td>\n");
		sbHtml.append("			</tr>\n");
		sbHtml.append("			<tr>\n");
		sbHtml.append("				<th>검토의견</th>\n");
		sbHtml.append("				<td style=\"padding-left: 10px;\">" + CommonUtil.nvl(dataMap.get("BUNHAL_COMMENT")).replaceAll("\n", "<br />")+ "</td>\n");
		sbHtml.append("			</tr>\n");
		sbHtml.append("		</table>\n");
		sbHtml.append("		<br>\n");
		
		
		sbHtml.append("<!-- * 첨부 서류 -->            \n");
		sbHtml.append("<h4>첨부 서류</h4>              \n");
		sbHtml.append("<table class=\"base5\">         \n");
		sbHtml.append("    <colgroup>                  \n");
		sbHtml.append("        <col style=\"width:120px\" />                \n");
		sbHtml.append("        <col style=\"width:340px\" />                \n");
		sbHtml.append("        <col style=\"width:230px\" />                \n");
		sbHtml.append("        <col style=\"width:230px\" />                \n");
		sbHtml.append("    </colgroup>                 \n");
		sbHtml.append("    <thead>\n");
		sbHtml.append("        <tr>                    \n");
		sbHtml.append("            <th scope=\"col\" colspan=\"2\">파일내용</th>                 \n");
		sbHtml.append("            <th scope=\"col\">파일명</th>            \n");
		sbHtml.append("            <th scope=\"col\">파일선택</th>          \n");
		sbHtml.append("        </tr>                   \n");
		sbHtml.append("    </thead>                    \n");
		sbHtml.append("    <tbody>\n");

		// /** 첨부 서류 **/
		// int n_fileCount = Integer.parseInt(String.valueOf(
		// map.get("fileCount") ));
		//
		 String str_FILE_PATH= ""; // 파일경로
		 String str_FILE_NM= ""; // 파일네임
		 String str_FILE_SEQ= ""; // 파일SEQ
		 String str_PMT_NO= "";
		 log.info("######################################################");
		 log.info("file_list:"+file_list);
		if (file_list.size() > 0) {
		//	ArrayList list = (ArrayList) map.get("fileList");
				
			for (int i = 0; i< 8; i++) {
				//JSONObject obj=new JSONObject(file_list.get(i).toString());
				log.info("file_list:"+file_list.get(i));
				//log.info("obj:"+obj);
				HashMap hm = new HashMap();
				log.info("hm:"+hm);
				if ((HashMap) file_list.get(i)!=null) {
					hm = (HashMap) file_list.get(i);
					str_FILE_PATH =cu.evl(String.valueOf(hm.get("jba_file_path")), "");
					//str_FILE_PATH = str_FILE_URL + cu.evl(String.valueOf(hm.get("file_path")), "");
					str_FILE_NM = cu.evl(String.valueOf(hm.get("jba_file_nm")), "");
					str_FILE_SEQ = cu.evl(String.valueOf(hm.get("jba_fseq")), "");
					str_PMT_NO = cu.evl(String.valueOf(hm.get("jba_manage_no")), "");
				}
				else {
					str_FILE_PATH ="";
					//str_FILE_PATH = str_FILE_URL + cu.evl(String.valueOf(hm.get("file_path")), "");
					str_FILE_NM ="";
					str_FILE_SEQ ="";
					str_PMT_NO = "";
				}
				
					sbHtml.append("        <tr>                    \n");
					if (0 == i) {
						sbHtml.append("            <td rowspan=\"10\">필수 증빙서류</td>     \n");
						sbHtml.append("            <td style=\"text-align:left;\">1. 등기사항 전부 증명서</td>    \n");
						sbHtml.append("            <td style=\"text-align:left;\">" + str_FILE_NM + ")&nbsp;&nbsp;</td>                   \n");
						sbHtml.append("            <td>                \n");
						//sbHtml.append("                <input type='button' id='file" + i + "' value='파일선택' />          \n");
						sbHtml.append("      \n");
						// sbHtml.append(" <script> \n");
						// sbHtml.append(" $(\"#file"+i+"\").click(function(){
						// window.open(\""+str_FILE_PATH+"\"); }); \n");
						// sbHtml.append(" </script> \n");

						String type = "";
						if (str_FILE_NM != null && !str_FILE_NM.equals("")) {
							String pathSplit[] = str_FILE_NM.split("\\.");
							type = pathSplit[1].toLowerCase();
						}

//						if (type.equals("jpg") || type.equals("png") || type.equals("gif") || type.equals("bmp")) {
//							sbHtml.append("            <script>               \n");
//							sbHtml.append("                 $('#file" + i + "').click(function(){ window.open(\"" + str_FILE_PATH + "\");  });    \n");
//							sbHtml.append("            </script>               \n");
//						} else if (!type.equals("")) {
//							sbHtml.append("            <script>               \n");
//							sbHtml.append("                 $('#file" + i + "').click(function(){ document.getElementById('file_download_form" + i + "').submit();	  });    \n");
//							sbHtml.append("            </script>               \n");
		//
//						}
						if ("DEV".equals(GC.getServerName())) {
							//개발
							sbHtml.append("<button class=\"fileDownloadBtn\" onclick=\"window.open('https://dgisdev.dopco.co.kr:8443/land/common/downloadfile?"
									  + "filePath=" + cu.evl(str_FILE_PATH, "") 
									    + "&fileName=" + cu.evl(str_FILE_NM, "") 
									    + "&fileJisangNo=" + str_PMT_NO
									    + "&fileSeq=" + cu.evl(str_FILE_SEQ,"") 
									    + "&fileGubun=gover', '_blank')\">다운로드 <span class=\"downloadIcon\"></span></button>\n");
						}
						else if ("LIVE".equals(GC.getServerName())) {
							//운영
							sbHtml.append("<button class=\"fileDownloadBtn\" onclick=\"window.open('https://dgis.dopco.co.kr:8443/land/common/downloadfile?"
								    + "filePath=" + cu.evl(str_FILE_PATH, "") 
								    + "&fileName=" + cu.evl(str_FILE_NM, "") 
								    + "&fileJisangNo=" + str_PMT_NO
								    + "&fileSeq=" + cu.evl(str_FILE_SEQ,"") 
								    + "&fileGubun=jisang_bunhal', '_blank')\">다운로드 <span class=\"downloadIcon\"></span></button>\n");
						}
						else {
							
							sbHtml.append("<button class=\"fileDownloadBtn\" onclick=\"window.open('https://dgisdev.dopco.co.kr:8443/land/common/downloadfile?"
									  + "filePath=" + cu.evl(str_FILE_PATH, "") 
									    + "&fileName=" + cu.evl(str_FILE_NM, "") 
									    + "&fileJisangNo=" + str_PMT_NO
									    + "&fileSeq=" + cu.evl(str_FILE_SEQ,"") 
									    + "&fileGubun=gover', '_blank')\">다운로드 <span class=\"downloadIcon\"></span></button>\n");
						}
						
						
						

						sbHtml.append("            </td>               \n");
					} else if (1 == i) {
						sbHtml.append("            <td style=\"text-align:left; border-left:1px solid #d3d3d3;\">2. 토지대장</td>                   \n");
						sbHtml.append("            <td style=\"text-align:left;\">" + str_FILE_NM + "&nbsp;&nbsp;</td>                   \n");
						sbHtml.append("            <td>                \n");
						//sbHtml.append("                <input type='button' id='file" + i + "' value='파일선택' />          \n");
						sbHtml.append("      \n");
						// sbHtml.append(" <script> \n");
						// sbHtml.append(" $(\"#file"+i+"\").click(function(){
						// window.open(\""+str_FILE_PATH+"\"); }); \n");
						// sbHtml.append(" </script> \n");

						String type = "";
						if (str_FILE_NM != null && !str_FILE_NM.equals("")) {
							String pathSplit[] = str_FILE_NM.split("\\.");
							type = pathSplit[1].toLowerCase();
						}

//						if (type.equals("jpg") || type.equals("png") || type.equals("gif") || type.equals("bmp")) {
//							sbHtml.append("            <script>               \n");
//							sbHtml.append("                 $('#file" + i + "').click(function(){ window.open(\"" + str_FILE_PATH + "\");  });    \n");
//							sbHtml.append("            </script>               \n");
//						} else if (!type.equals("")) {
//							sbHtml.append("            <script>               \n");
//							sbHtml.append("                 $('#file" + i + "').click(function(){ document.getElementById('file_download_form" + i + "').submit();	  });    \n");
//							sbHtml.append("            </script>               \n");
		//
//						}
						if ("DEV".equals(GC.getServerName())) {
							//개발
							sbHtml.append("<button class=\"fileDownloadBtn\" onclick=\"window.open('https://dgisdev.dopco.co.kr:8443/land/common/downloadfile?"
									  + "filePath=" + cu.evl(str_FILE_PATH, "") 
									    + "&fileName=" + cu.evl(str_FILE_NM, "") 
									    + "&fileJisangNo=" + str_PMT_NO
									    + "&fileSeq=" + cu.evl(str_FILE_SEQ,"") 
									    + "&fileGubun=gover', '_blank')\">다운로드 <span class=\"downloadIcon\"></span></button>\n");
						}
						else if ("LIVE".equals(GC.getServerName())) {
							//운영
							sbHtml.append("<button class=\"fileDownloadBtn\" onclick=\"window.open('https://dgis.dopco.co.kr:8443/land/common/downloadfile?"
								    + "filePath=" + cu.evl(str_FILE_PATH, "") 
								    + "&fileName=" + cu.evl(str_FILE_NM, "") 
								    + "&fileJisangNo=" + str_PMT_NO
								    + "&fileSeq=" + cu.evl(str_FILE_SEQ,"") 
								    + "&fileGubun=jisang_bunhal', '_blank')\">다운로드 <span class=\"downloadIcon\"></span></button>\n");
						}
						else {
							
							sbHtml.append("<button class=\"fileDownloadBtn\" onclick=\"window.open('https://dgisdev.dopco.co.kr:8443/land/common/downloadfile?"
									  + "filePath=" + cu.evl(str_FILE_PATH, "") 
									    + "&fileName=" + cu.evl(str_FILE_NM, "") 
									    + "&fileJisangNo=" + str_PMT_NO
									    + "&fileSeq=" + cu.evl(str_FILE_SEQ,"") 
									    + "&fileGubun=gover', '_blank')\">다운로드 <span class=\"downloadIcon\"></span></button>\n");
						}

						sbHtml.append("            </td>               \n");
					} else if (2 == i) {
						sbHtml.append("            <td style=\"text-align:left; border-left:1px solid #d3d3d3;\">3. 지적도 (관로표기)</td>     \n");
						sbHtml.append("            <td style=\"text-align:left;\">" + str_FILE_NM + "&nbsp;&nbsp;</td>                   \n");
						sbHtml.append("            <td>                \n");
						//sbHtml.append("                <input type='button' id='file" + i + "' value='파일선택' />          \n");
						sbHtml.append("      \n");
						// sbHtml.append(" <script> \n");
						// sbHtml.append(" $(\"#file"+i+"\").click(function(){
						// window.open(\""+str_FILE_PATH+"\"); }); \n");
						// sbHtml.append(" </script> \n");

						String type = "";
						if (str_FILE_NM != null && !str_FILE_NM.equals("")) {
							String pathSplit[] = str_FILE_NM.split("\\.");
							type = pathSplit[1].toLowerCase();
						}

//						if (type.equals("jpg") || type.equals("png") || type.equals("gif") || type.equals("bmp")) {
//							sbHtml.append("            <script>               \n");
//							sbHtml.append("                 $('#file" + i + "').click(function(){ window.open(\"" + str_FILE_PATH + "\");  });    \n");
//							sbHtml.append("            </script>               \n");
//						} else if (!type.equals("")) {
//							sbHtml.append("            <script>               \n");
//							sbHtml.append("                 $('#file" + i + "').click(function(){ document.getElementById('file_download_form" + i + "').submit();	  });    \n");
//							sbHtml.append("            </script>               \n");
		//
//						}
						if ("DEV".equals(GC.getServerName())) {
							//개발
							sbHtml.append("<button class=\"fileDownloadBtn\" onclick=\"window.open('https://dgisdev.dopco.co.kr:8443/land/common/downloadfile?"
									  + "filePath=" + cu.evl(str_FILE_PATH, "") 
									    + "&fileName=" + cu.evl(str_FILE_NM, "") 
									    + "&fileJisangNo=" + str_PMT_NO
									    + "&fileSeq=" + cu.evl(str_FILE_SEQ,"") 
									    + "&fileGubun=gover', '_blank')\">다운로드 <span class=\"downloadIcon\"></span></button>\n");
						}
						else if ("LIVE".equals(GC.getServerName())) {
							//운영
							sbHtml.append("<button class=\"fileDownloadBtn\" onclick=\"window.open('https://dgis.dopco.co.kr:8443/land/common/downloadfile?"
								    + "filePath=" + cu.evl(str_FILE_PATH, "") 
								    + "&fileName=" + cu.evl(str_FILE_NM, "") 
								    + "&fileJisangNo=" + str_PMT_NO
								    + "&fileSeq=" + cu.evl(str_FILE_SEQ,"") 
								    + "&fileGubun=jisang_bunhal', '_blank')\">다운로드 <span class=\"downloadIcon\"></span></button>\n");
						}
						else {
							
							sbHtml.append("<button class=\"fileDownloadBtn\" onclick=\"window.open('https://dgisdev.dopco.co.kr:8443/land/common/downloadfile?"
									  + "filePath=" + cu.evl(str_FILE_PATH, "") 
									    + "&fileName=" + cu.evl(str_FILE_NM, "") 
									    + "&fileJisangNo=" + str_PMT_NO
									    + "&fileSeq=" + cu.evl(str_FILE_SEQ,"") 
									    + "&fileGubun=gover', '_blank')\">다운로드 <span class=\"downloadIcon\"></span></button>\n");
						}

						sbHtml.append("            </td>               \n");
					} else if (3 == i) {
						sbHtml.append("            <td style=\"text-align:left; border-left:1px solid #d3d3d3;\">4. 현장사진</td>                  \n");
						sbHtml.append("            <td style=\"text-align:left;\">" + str_FILE_NM + "&nbsp;&nbsp;</td>                   \n");
						sbHtml.append("            <td>                \n");
						//sbHtml.append("                <input type='button' id='file" + i + "' value='파일선택' />          \n");
						sbHtml.append("      \n");
						// sbHtml.append(" <script> \n");
						// sbHtml.append(" $(\"#file"+i+"\").click(function(){
						// window.open(\""+str_FILE_PATH+"\"); }); \n");
						// sbHtml.append(" </script> \n");

						String type = "";
						if (str_FILE_NM != null && !str_FILE_NM.equals("")) {
							String pathSplit[] = str_FILE_NM.split("\\.");
							type = pathSplit[1].toLowerCase();
						}

//						if (type.equals("jpg") || type.equals("png") || type.equals("gif") || type.equals("bmp")) {
//							sbHtml.append("            <script>               \n");
//							sbHtml.append("                 $('#file" + i + "').click(function(){ window.open(\"" + str_FILE_PATH + "\");  });    \n");
//							sbHtml.append("            </script>               \n");
//						} else if (!type.equals("")) {
//							sbHtml.append("            <script>               \n");
//							sbHtml.append("                 $('#file" + i + "').click(function(){ document.getElementById('file_download_form" + i + "').submit();	  });    \n");
//							sbHtml.append("            </script>               \n");
		//
//						}
						if ("DEV".equals(GC.getServerName())) {
							//개발
							sbHtml.append("<button class=\"fileDownloadBtn\" onclick=\"window.open('https://dgisdev.dopco.co.kr:8443/land/common/downloadfile?"
									  + "filePath=" + cu.evl(str_FILE_PATH, "") 
									    + "&fileName=" + cu.evl(str_FILE_NM, "") 
									    + "&fileJisangNo=" + str_PMT_NO
									    + "&fileSeq=" + cu.evl(str_FILE_SEQ,"") 
									    + "&fileGubun=gover', '_blank')\">다운로드 <span class=\"downloadIcon\"></span></button>\n");
						}
						else if ("LIVE".equals(GC.getServerName())) {
							//운영
							sbHtml.append("<button class=\"fileDownloadBtn\" onclick=\"window.open('https://dgis.dopco.co.kr:8443/land/common/downloadfile?"
								    + "filePath=" + cu.evl(str_FILE_PATH, "") 
								    + "&fileName=" + cu.evl(str_FILE_NM, "") 
								    + "&fileJisangNo=" + str_PMT_NO
								    + "&fileSeq=" + cu.evl(str_FILE_SEQ,"") 
								    + "&fileGubun=jisang_bunhal', '_blank')\">다운로드 <span class=\"downloadIcon\"></span></button>\n");
						}
						else {
							
							sbHtml.append("<button class=\"fileDownloadBtn\" onclick=\"window.open('https://dgisdev.dopco.co.kr:8443/land/common/downloadfile?"
									  + "filePath=" + cu.evl(str_FILE_PATH, "") 
									    + "&fileName=" + cu.evl(str_FILE_NM, "") 
									    + "&fileJisangNo=" + str_PMT_NO
									    + "&fileSeq=" + cu.evl(str_FILE_SEQ,"") 
									    + "&fileGubun=gover', '_blank')\">다운로드 <span class=\"downloadIcon\"></span></button>\n");
						}

						sbHtml.append("            </td>               \n");
					} else if (4 == i) {
						sbHtml.append("            <td style=\"text-align:left; border-left:1px solid #d3d3d3;\">5. 검토의견서</td>          \n");
						sbHtml.append("            <td style=\"text-align:left;\">" + str_FILE_NM + "&nbsp;&nbsp;</td>                   \n");
						sbHtml.append("            <td>                \n");
						//sbHtml.append("                <input type='button' id='file" + i + "' value='파일선택' />          \n");
						sbHtml.append("      \n");
						// sbHtml.append(" <script> \n");
						// sbHtml.append(" $(\"#file"+i+"\").click(function(){
						// window.open(\""+str_FILE_PATH+"\"); }); \n");
						// sbHtml.append(" </script> \n");

						String type = "";
						if (str_FILE_NM != null && !str_FILE_NM.equals("")) {
							String pathSplit[] = str_FILE_NM.split("\\.");
							type = pathSplit[1].toLowerCase();
						}

//						if (type.equals("jpg") || type.equals("png") || type.equals("gif") || type.equals("bmp")) {
//							sbHtml.append("            <script>               \n");
//							sbHtml.append("                 $('#file" + i + "').click(function(){ window.open(\"" + str_FILE_PATH + "\");  });    \n");
//							sbHtml.append("            </script>               \n");
//						} else if (!type.equals("")) {
//							sbHtml.append("            <script>               \n");
//							sbHtml.append("                 $('#file" + i + "').click(function(){ document.getElementById('file_download_form" + i + "').submit();	  });    \n");
//							sbHtml.append("            </script>               \n");
		//
//						}
						if ("DEV".equals(GC.getServerName())) {
							//개발
							sbHtml.append("<button class=\"fileDownloadBtn\" onclick=\"window.open('https://dgisdev.dopco.co.kr:8443/land/common/downloadfile?"
									  + "filePath=" + cu.evl(str_FILE_PATH, "") 
									    + "&fileName=" + cu.evl(str_FILE_NM, "") 
									    + "&fileJisangNo=" + str_PMT_NO
									    + "&fileSeq=" + cu.evl(str_FILE_SEQ,"") 
									    + "&fileGubun=gover', '_blank')\">다운로드 <span class=\"downloadIcon\"></span></button>\n");
						}
						else if ("LIVE".equals(GC.getServerName())) {
							//운영
							sbHtml.append("<button class=\"fileDownloadBtn\" onclick=\"window.open('https://dgis.dopco.co.kr:8443/land/common/downloadfile?"
								    + "filePath=" + cu.evl(str_FILE_PATH, "") 
								    + "&fileName=" + cu.evl(str_FILE_NM, "") 
								    + "&fileJisangNo=" + str_PMT_NO
								    + "&fileSeq=" + cu.evl(str_FILE_SEQ,"") 
								    + "&fileGubun=jisang_bunhal', '_blank')\">다운로드 <span class=\"downloadIcon\"></span></button>\n");
						}
						else {
							
							sbHtml.append("<button class=\"fileDownloadBtn\" onclick=\"window.open('https://dgisdev.dopco.co.kr:8443/land/common/downloadfile?"
									  + "filePath=" + cu.evl(str_FILE_PATH, "") 
									    + "&fileName=" + cu.evl(str_FILE_NM, "") 
									    + "&fileJisangNo=" + str_PMT_NO
									    + "&fileSeq=" + cu.evl(str_FILE_SEQ,"") 
									    + "&fileGubun=gover', '_blank')\">다운로드 <span class=\"downloadIcon\"></span></button>\n");
						}

						sbHtml.append("            </td>               \n");
					}else if (5 == i) {
						sbHtml.append("            <td style=\"text-align:left; border-left:1px solid #d3d3d3;\">6. 도면,민원인 관계서류 등</td>          \n");
						sbHtml.append("            <td style=\"text-align:left;\">" + str_FILE_NM + "&nbsp;&nbsp;</td>                   \n");
						sbHtml.append("            <td>                \n");
						//sbHtml.append("                <input type='button' id='file" + i + "' value='파일선택' />          \n");
						sbHtml.append("      \n");
						// sbHtml.append(" <script> \n");
						// sbHtml.append(" $(\"#file"+i+"\").click(function(){
						// window.open(\""+str_FILE_PATH+"\"); }); \n");
						// sbHtml.append(" </script> \n");

						String type = "";
						if (str_FILE_NM != null && !str_FILE_NM.equals("")) {
							String pathSplit[] = str_FILE_NM.split("\\.");
							type = pathSplit[1].toLowerCase();
						}

//						if (type.equals("jpg") || type.equals("png") || type.equals("gif") || type.equals("bmp")) {
//							sbHtml.append("            <script>               \n");
//							sbHtml.append("                 $('#file" + i + "').click(function(){ window.open(\"" + str_FILE_PATH + "\");  });    \n");
//							sbHtml.append("            </script>               \n");
//						} else if (!type.equals("")) {
//							sbHtml.append("            <script>               \n");
//							sbHtml.append("                 $('#file" + i + "').click(function(){ document.getElementById('file_download_form" + i + "').submit();	  });    \n");
//							sbHtml.append("            </script>               \n");
		//
//						}
						if ("DEV".equals(GC.getServerName())) {
							//개발
							sbHtml.append("<button class=\"fileDownloadBtn\" onclick=\"window.open('https://dgisdev.dopco.co.kr:8443/land/common/downloadfile?"
									  + "filePath=" + cu.evl(str_FILE_PATH, "") 
									    + "&fileName=" + cu.evl(str_FILE_NM, "") 
									    + "&fileJisangNo=" + str_PMT_NO
									    + "&fileSeq=" + cu.evl(str_FILE_SEQ,"") 
									    + "&fileGubun=gover', '_blank')\">다운로드 <span class=\"downloadIcon\"></span></button>\n");
						}
						else if ("LIVE".equals(GC.getServerName())) {
							//운영
							sbHtml.append("<button class=\"fileDownloadBtn\" onclick=\"window.open('https://dgis.dopco.co.kr:8443/land/common/downloadfile?"
								    + "filePath=" + cu.evl(str_FILE_PATH, "") 
								    + "&fileName=" + cu.evl(str_FILE_NM, "") 
								    + "&fileJisangNo=" + str_PMT_NO
								    + "&fileSeq=" + cu.evl(str_FILE_SEQ,"") 
								    + "&fileGubun=jisang_bunhal', '_blank')\">다운로드 <span class=\"downloadIcon\"></span></button>\n");
						}
						else {
							
							sbHtml.append("<button class=\"fileDownloadBtn\" onclick=\"window.open('https://dgisdev.dopco.co.kr:8443/land/common/downloadfile?"
									  + "filePath=" + cu.evl(str_FILE_PATH, "") 
									    + "&fileName=" + cu.evl(str_FILE_NM, "") 
									    + "&fileJisangNo=" + str_PMT_NO
									    + "&fileSeq=" + cu.evl(str_FILE_SEQ,"") 
									    + "&fileGubun=gover', '_blank')\">다운로드 <span class=\"downloadIcon\"></span></button>\n");
						}

						sbHtml.append("            </td>               \n");
					}else if (6 == i) {
						sbHtml.append("            <td style=\"text-align:left; border-left:1px solid #d3d3d3;\">7. 분할,합병/토지분할 소멸 승낙서</td>          \n");
						sbHtml.append("            <td style=\"text-align:left;\">" + str_FILE_NM + "&nbsp;&nbsp;</td>                   \n");
						sbHtml.append("            <td>                \n");
						//sbHtml.append("                <input type='button' id='file" + i + "' value='파일선택' />          \n");
						sbHtml.append("      \n");
						// sbHtml.append(" <script> \n");
						// sbHtml.append(" $(\"#file"+i+"\").click(function(){
						// window.open(\""+str_FILE_PATH+"\"); }); \n");
						// sbHtml.append(" </script> \n");

						String type = "";
						if (str_FILE_NM != null && !str_FILE_NM.equals("")) {
							String pathSplit[] = str_FILE_NM.split("\\.");
							type = pathSplit[1].toLowerCase();
						}

//						if (type.equals("jpg") || type.equals("png") || type.equals("gif") || type.equals("bmp")) {
//							sbHtml.append("            <script>               \n");
//							sbHtml.append("                 $('#file" + i + "').click(function(){ window.open(\"" + str_FILE_PATH + "\");  });    \n");
//							sbHtml.append("            </script>               \n");
//						} else if (!type.equals("")) {
//							sbHtml.append("            <script>               \n");
//							sbHtml.append("                 $('#file" + i + "').click(function(){ document.getElementById('file_download_form" + i + "').submit();	  });    \n");
//							sbHtml.append("            </script>               \n");
		//
//						}
						if ("DEV".equals(GC.getServerName())) {
							//개발
							sbHtml.append("<button class=\"fileDownloadBtn\" onclick=\"window.open('https://dgisdev.dopco.co.kr:8443/land/common/downloadfile?"
									  + "filePath=" + cu.evl(str_FILE_PATH, "") 
									    + "&fileName=" + cu.evl(str_FILE_NM, "") 
									    + "&fileJisangNo=" + str_PMT_NO
									    + "&fileSeq=" + cu.evl(str_FILE_SEQ,"") 
									    + "&fileGubun=gover', '_blank')\">다운로드 <span class=\"downloadIcon\"></span></button>\n");
						}
						else if ("LIVE".equals(GC.getServerName())) {
							//운영
							sbHtml.append("<button class=\"fileDownloadBtn\" onclick=\"window.open('https://dgis.dopco.co.kr:8443/land/common/downloadfile?"
								    + "filePath=" + cu.evl(str_FILE_PATH, "") 
								    + "&fileName=" + cu.evl(str_FILE_NM, "") 
								    + "&fileJisangNo=" + str_PMT_NO
								    + "&fileSeq=" + cu.evl(str_FILE_SEQ,"") 
								    + "&fileGubun=jisang_bunhal', '_blank')\">다운로드 <span class=\"downloadIcon\"></span></button>\n");
						}
						else {
							
							sbHtml.append("<button class=\"fileDownloadBtn\" onclick=\"window.open('https://dgisdev.dopco.co.kr:8443/land/common/downloadfile?"
									  + "filePath=" + cu.evl(str_FILE_PATH, "") 
									    + "&fileName=" + cu.evl(str_FILE_NM, "") 
									    + "&fileJisangNo=" + str_PMT_NO
									    + "&fileSeq=" + cu.evl(str_FILE_SEQ,"") 
									    + "&fileGubun=gover', '_blank')\">다운로드 <span class=\"downloadIcon\"></span></button>\n");
						}

						sbHtml.append("            </td>               \n");
					}else if (7 == i) {
						sbHtml.append("            <td style=\"text-align:left; border-left:1px solid #d3d3d3;\">8. 분할,합병 요청공문</td>          \n");
						sbHtml.append("            <td style=\"text-align:left;\">" + str_FILE_NM + "&nbsp;&nbsp;</td>                   \n");
						sbHtml.append("            <td>                \n");
						//sbHtml.append("                <input type='button' id='file" + i + "' value='파일선택' />          \n");
						sbHtml.append("      \n");
						// sbHtml.append(" <script> \n");
						// sbHtml.append(" $(\"#file"+i+"\").click(function(){
						// window.open(\""+str_FILE_PATH+"\"); }); \n");
						// sbHtml.append(" </script> \n");

						String type = "";
						if (str_FILE_NM != null && !str_FILE_NM.equals("")) {
							String pathSplit[] = str_FILE_NM.split("\\.");
							type = pathSplit[1].toLowerCase();
						}

//						if (type.equals("jpg") || type.equals("png") || type.equals("gif") || type.equals("bmp")) {
//							sbHtml.append("            <script>               \n");
//							sbHtml.append("                 $('#file" + i + "').click(function(){ window.open(\"" + str_FILE_PATH + "\");  });    \n");
//							sbHtml.append("            </script>               \n");
//						} else if (!type.equals("")) {
//							sbHtml.append("            <script>               \n");
//							sbHtml.append("                 $('#file" + i + "').click(function(){ document.getElementById('file_download_form" + i + "').submit();	  });    \n");
//							sbHtml.append("            </script>               \n");
		//
//						}
						if ("DEV".equals(GC.getServerName())) {
							//개발
							sbHtml.append("<button class=\"fileDownloadBtn\" onclick=\"window.open('https://dgisdev.dopco.co.kr:8443/land/common/downloadfile?"
									  + "filePath=" + cu.evl(str_FILE_PATH, "") 
									    + "&fileName=" + cu.evl(str_FILE_NM, "") 
									    + "&fileJisangNo=" + str_PMT_NO
									    + "&fileSeq=" + cu.evl(str_FILE_SEQ,"") 
									    + "&fileGubun=gover', '_blank')\">다운로드 <span class=\"downloadIcon\"></span></button>\n");
						}
						else if ("LIVE".equals(GC.getServerName())) {
							//운영
							sbHtml.append("<button class=\"fileDownloadBtn\" onclick=\"window.open('https://dgis.dopco.co.kr:8443/land/common/downloadfile?"
								    + "filePath=" + cu.evl(str_FILE_PATH, "") 
								    + "&fileName=" + cu.evl(str_FILE_NM, "") 
								    + "&fileJisangNo=" + str_PMT_NO
								    + "&fileSeq=" + cu.evl(str_FILE_SEQ,"") 
								    + "&fileGubun=jisang_bunhal', '_blank')\">다운로드 <span class=\"downloadIcon\"></span></button>\n");
						}
						else {
							
							sbHtml.append("<button class=\"fileDownloadBtn\" onclick=\"window.open('https://dgisdev.dopco.co.kr:8443/land/common/downloadfile?"
									  + "filePath=" + cu.evl(str_FILE_PATH, "") 
									    + "&fileName=" + cu.evl(str_FILE_NM, "") 
									    + "&fileJisangNo=" + str_PMT_NO
									    + "&fileSeq=" + cu.evl(str_FILE_SEQ,"") 
									    + "&fileGubun=gover', '_blank')\">다운로드 <span class=\"downloadIcon\"></span></button>\n");
						}

						sbHtml.append("            </td>               \n");
					
					}

					
					sbHtml.append("        </tr>                   \n");

			}	
		}
//				System.out.println("str_FILE_PATH=" + str_FILE_PATH);
//				System.out.println("str_FILE_NM=" + str_FILE_NM);
//				System.out.println("str_FILE_SEQ=" + str_FILE_SEQ);
//				System.out.println("str_PMT_NO=" + str_PMT_NO);

				
			

		sbHtml.append("    </tbody>                    \n");
		sbHtml.append("</table>   \n");
		
		
		
		
		sbHtml.append("		</div>\n");
		sbHtml.append("		</div>\n");
		sbHtml.append("</body>         \n");
		sbHtml.append("</html>         \n");

		//System.out.println("지상권 분할 전자결재 HTML START");
//		System.out.println(sbHtml.toString());
		System.out.println("지상권 분할 전자결재 HTML END");

		return sbHtml.toString();
	}

//	// 지상권 합필 전자결재 HTML
	public String getJisang_merge_HTML(String JISANG_NO, HttpServletRequest request, HttpServletResponse response) throws Exception {
		MainService mainService = context.getBean(MainService.class);
		GlobalConfig GC = context.getBean(GlobalConfig.class);
		log.info("----------------------getJisang_merge_HTML-------------------------");
		log.info("serverName:"+GC.getServerName());
		
		StringBuffer sbHtml = new StringBuffer();
		HashMap param = new HashMap();
		HashMap<String, String> mainData = new HashMap<String, String>();
		CommonUtil cu = new CommonUtil();
		param.put("REP_JISANG_NO", JISANG_NO);
		param.put("manage_no", JISANG_NO);
		
		//ArrayList<HashMap<String, String>> jisangMergeList = (ArrayList<HashMap<String, String>>) Database.getInstance().queryForList("Json.selectJisangMergeSaveList", param);
		ArrayList<HashMap> jisangMergeList = (ArrayList<HashMap>) mainService.selectQuery("jisangSQL.selectJisangMergeSaveList", param);
		
		for (int i = 0; i < jisangMergeList.size(); i++) {
			log.info("jisangMergeList:"+jisangMergeList.get(i));
			param.put("JISANGNO", jisangMergeList.get(i).get("jisang_no"));
//			List<HashMap<String, String>> soyuList = Database.getInstance().queryForList("Json.selectJisangDetailSoyu", param);
			ArrayList<HashMap> soyuList = mainService.selectQuery("jisangSQL.selectJisangDetailSoyu", param);
			log.info("soyuList:"+soyuList);
			jisangMergeList.get(i).put("SOUJA_NAME", (soyuList.size() > 0 ? soyuList.get(0).get("js_souja_name") : ""));
			if ("Y".equals(jisangMergeList.get(i).get("main_flag"))) {
				mainData = jisangMergeList.get(i);
			}

		}
		log.info("mainData:"+mainData);
		
		
		
		
		
		// 합계정보 처리
		double sumJijuk = 0.0;
		double sumPyeonib = 0.0;
		int sumSetMoney = 0;
		for (HashMap<String, String> datas : jisangMergeList) {
			sumJijuk += Double.parseDouble(CommonUtil.evl(String.valueOf(datas.get("jijuk_area")), "0"));
			sumPyeonib += Double.parseDouble(CommonUtil.evl(String.valueOf(datas.get("pyeonib_area")), "0"));
			sumSetMoney += Integer.parseInt(CommonUtil.evl(String.valueOf(datas.get("set_money")), "0"));
		}
//		sumJijuk += Double.parseDouble(CommonUtil.evl(String.valueOf(mainData.get("JIJUK_AREA")), "0"));
//		sumPyeonib += Double.parseDouble(CommonUtil.evl(String.valueOf(mainData.get("PYEONIB_AREA")), "0"));
//		sumSetMoney += Integer.parseInt(CommonUtil.evl(String.valueOf(mainData.get("SET_MONEY")), "0"));

		
		
		ArrayList file_list = (ArrayList) mainService.selectQuery("jisangSQL.selectJisangMergeAtcFile", param);
		log.info("file_list:"+file_list);
		HashMap file_map=new HashMap();
		if (file_list.size() > 0) {
			for (int i = 0; i < file_list.size(); i++) {
				file_map.put("FILE_PATH" + i, cu.evl((String) ((HashMap) file_list.get(i)).get("file_path"), "").trim());
				file_map.put("FILE_NM" + i, cu.evl((String) ((HashMap) file_list.get(i)).get("file_nm"), "").trim());

			}
		}
		
		sbHtml.append(
				" <!DOCTYPE html>               																																																																																																																																																																																																																			\n");
		sbHtml.append(" <html lang=\"ko\" xmlns=\"http://www.w3.org/1999/xhtml\">                \n");
		sbHtml.append("           \n");
		sbHtml.append(sHeader);
		sbHtml.append("           \n");
		sbHtml.append(" <body>    \n");
		sbHtml.append("     <!-- wrap -->              \n");
		sbHtml.append("     <div id=\"wrap\">          \n");
		sbHtml.append("         <!-- 컨테이너 -->      \n");
		sbHtml.append("         <div id=\"container\"> \n");
		sbHtml.append("			 	<div class=\"title\">		");
		sbHtml.append("			 		<h2>지상권 합필 상신</h2>		");
		sbHtml.append("			 	</div>		");
		sbHtml.append("<div class=\"article\">\n");
		sbHtml.append("		<!-- * 대상토지 -->\n");
		sbHtml.append("		<h4>대상토지</h4>\n");
		sbHtml.append("			<table class=\"base4\" style=\"table-layout: fixed;\">\n");
		sbHtml.append("				<colgroup>\n");
		sbHtml.append("					<col style=\"width: 10%\" />\n");
		sbHtml.append("					<col style=\"width: 10%\" />\n");
		sbHtml.append("					<col style=\"width: 20%\" />\n");
		sbHtml.append("					<col style=\"width: 10%\" />\n");
		sbHtml.append("					<col style=\"width: 10%\" />\n");
		sbHtml.append("					<col style=\"width: 10%\" />\n");
		sbHtml.append("					<col style=\"width: 10%\" />\n");
		sbHtml.append("					<col style=\"width: 10%\" />\n");
		sbHtml.append("					<col style=\"width: 10%\" />\n");
		sbHtml.append("				</colgroup>\n");
		sbHtml.append("						<thead>\n");
		sbHtml.append("							<tr>\n");
		sbHtml.append("								<th scope=\"col\" rowspan=\"2\">지상권 번호</th>\n");
		sbHtml.append("								<th scope=\"col\" rowspan=\"2\">대표<br />지상권</th>\n");
		sbHtml.append("								<th scope=\"col\" rowspan=\"2\">주소</th>\n");
		sbHtml.append("								<th scope=\"col\" colspan=\"5\">지상권 설정</th>\n");
		sbHtml.append("								<th scope=\"col\" rowspan=\"2\">소유자</th>\n");
		sbHtml.append("							</tr>\n");
		sbHtml.append("							<tr>\n");
		sbHtml.append("								<th scope=\"col\">지목</th>\n");
		sbHtml.append("								<th scope=\"col\">지적면적(㎡)</th>\n");
		sbHtml.append("								<th scope=\"col\">편입면적(㎡)</th>\n");
		sbHtml.append("								<th scope=\"col\">설정금액</th>\n");
		sbHtml.append("								<th scope=\"col\">자산번호</th>\n");
		sbHtml.append("							</tr>\n");
		sbHtml.append("						</thead>\n");
		sbHtml.append("						<tbody id=\"merge_insert_togiBody\">\n");
//		sbHtml.append("						<tr>\n");
//		sbHtml.append("								<td>"+CommonUtil.nvl((String)mainData.get("JISANG_NO"))+"</td>\n");
//		sbHtml.append("								<td class=\"inner_tag\">\n");
//		sbHtml.append("									<input type=\"checkbox\" checked=\"checked\""+ "/>\n");
//		sbHtml.append("								</td>\n");
//		sbHtml.append("								<td>\n");
//		sbHtml.append(CommonUtil.nvl((String)mainData.get("SIDO_NM")) + " "+CommonUtil.nvl((String)mainData.get("SGG_NM")) + " "+CommonUtil.nvl((String)mainData.get("EMD_NM")) + " "+CommonUtil.nvl((String)mainData.get("RI_NM")) + " "+CommonUtil.nvl((String)mainData.get("JIBUN")));
//		sbHtml.append("								</td>\n");
//		sbHtml.append("								<td>"+CommonUtil.nvl((String)mainData.get("JIMOK_TEXT"))+"</td>\n");
//		sbHtml.append("								<td>"+CommonUtil.nvl(String.valueOf(mainData.get("JIJUK_AREA")))+"</td>\n");
//		sbHtml.append("								<td>"+CommonUtil.nvl(String.valueOf(mainData.get("PYEONIB_AREA")))+"</td>\n");
//		sbHtml.append("								<td>"+CommonUtil.nvl(String.valueOf(mainData.get("SET_MONEY")))+"</td>\n");
//		sbHtml.append("								<td>"+CommonUtil.nvl((String)mainData.get("JASAN_NO"))+"</td>\n");
//		sbHtml.append("								<td></td>\n");
//		sbHtml.append("							</tr>\n");
log.info("jisangMergeList:"+jisangMergeList);
		for (HashMap<String, String> datas : jisangMergeList) {
			log.info("datas:"+datas);
			sbHtml.append("						<tr>\n");
			sbHtml.append("							<td>" + CommonUtil.nvl((String) datas.get("jisang_no")) + "</td>\n");
			sbHtml.append("							<td class=\"inner_tag\">\n");
			sbHtml.append("								" + ("Y".equals(datas.get("main_flag")) ? "Y" : "N") + "\n");
			sbHtml.append("							</td>\n");
			sbHtml.append("							<td>\n");
			sbHtml.append(CommonUtil.nvl((String) datas.get("sido_nm")) + " " + CommonUtil.nvl((String) datas.get("sgg_nm")) + " " + CommonUtil.nvl((String) datas.get("emd_nm")) + " " + CommonUtil.nvl((String) datas.get("ri_nm")) + " " + CommonUtil.nvl((String) datas.get("jibun")));
			sbHtml.append("							</td>\n");
			sbHtml.append("							<td>" + CommonUtil.nvl((String) datas.get("jimok_text")) + "</td>\n");
			sbHtml.append("							<td>" + CommonUtil.nvl(String.valueOf(datas.get("jijuk_area"))) + "</td>\n");
			sbHtml.append("							<td>" + CommonUtil.nvl(String.valueOf(datas.get("pyeonib_area"))) + "</td>\n");
			sbHtml.append("							<td>" + CommonUtil.nvl(String.valueOf(datas.get("set_money"))) + "</td>\n");
			sbHtml.append("							<td>" + CommonUtil.nvl((String) datas.get("jasan_no")) + "</td>\n");
			sbHtml.append("							<td>" + CommonUtil.nvl((String) datas.get("souja_name")) + "</td>\n");
			sbHtml.append("						</tr>\n");
		}
		sbHtml.append("						</tbody>\n");
		sbHtml.append("			</table>\n");
		sbHtml.append("			<br>\n");
		sbHtml.append("			<h4>합병 토지</h4>\n");
		sbHtml.append("			<table class=\"base4\">\n");
		sbHtml.append("				<colgroup>\n");
		sbHtml.append("					<col style=\"width: 10%;\" />\n");
		sbHtml.append("					<col style=\"width: 30%;\" />\n");
		sbHtml.append("					<col style=\"width: 10%;\" />\n");
		sbHtml.append("					<col style=\"width: 10%;\" />\n");
		sbHtml.append("					<col style=\"width: 10%;\" />\n");
		sbHtml.append("					<col style=\"width: 10%;\" />\n");
		sbHtml.append("					<col style=\"width: 10%;\" />\n");
		sbHtml.append("					<col style=\"width: 10%;\" />\n");
		sbHtml.append("				</colgroup>\n");
		sbHtml.append("				<thead>\n");
		sbHtml.append("					<tr>\n");
		sbHtml.append("						<th rowspan=\"2\">지상권번호</th>\n");
		sbHtml.append("						<th rowspan=\"2\">주소</th>\n");
		sbHtml.append("						<th colspan=\"5\">지상권설정</th>\n");
		sbHtml.append("						<th rowspan=\"2\">소유자</th>\n");
		sbHtml.append("					</tr>\n");
		sbHtml.append("					<tr>\n");
		sbHtml.append("						<th>지목</th>\n");
		sbHtml.append("						<th>지적 면적</th>\n");
		sbHtml.append("						<th>편입 면적</th>\n");
		sbHtml.append("						<th>설정 금액</th>\n");
		sbHtml.append("						<th>자산번호</th>\n");
		sbHtml.append("					</tr>\n");
		sbHtml.append("				</thead>\n");
		sbHtml.append("				<tbody>\n");
		sbHtml.append("					<tr>\n");
		sbHtml.append("						<td style=\"text-align:center;\">" + CommonUtil.nvl((String) mainData.get("jisang_no")) + "</td>\n");
		String juso = CommonUtil.nvl((String) mainData.get("sido_nm")) + " " + CommonUtil.nvl((String) mainData.get("sgg_nm")) + " " + CommonUtil.nvl((String) mainData.get("emd_nm")) + " " + CommonUtil.nvl((String) mainData.get("ri_nm")) + " " + CommonUtil.nvl((String) mainData.get("jibun"));
		sbHtml.append("						<td style=\"text-align:center;\">" + juso + "</td>\n");
		sbHtml.append("						<td style=\"text-align:center;\">" + CommonUtil.nvl((String) mainData.get("jimok_text")) + "</td>\n");
		sbHtml.append("						<td style=\"text-align:center;\">" + CommonUtil.nvl((String) String.valueOf(sumJijuk)) + "</td>\n");
		sbHtml.append("						<td style=\"text-align:center;\">" + CommonUtil.nvl((String) String.valueOf(sumPyeonib)) + "</td>\n");
		sbHtml.append("						<td style=\"text-align:center;\">" + CommonUtil.nvl((String) String.valueOf(sumSetMoney)) + "</td>\n");
		sbHtml.append("						<td style=\"text-align:center;\">" + mainData.get("jasan_no") + "</td>\n");
		sbHtml.append("						<td style=\"text-align:center;\">" + CommonUtil.nvl((String) mainData.get("SOUJA_NAME")) + "</td>\n");
		sbHtml.append("					</tr>\n");
		sbHtml.append("				</tbody>\n");
		sbHtml.append("			</table>\n");
		sbHtml.append("			<br>\n");
		sbHtml.append("			<h4>합병사유 및 검토의견</h4>\n");
		sbHtml.append("			<table class=\"base4\">\n");
		sbHtml.append("				<colgroup>\n");
		sbHtml.append("					<col style=\"width: 20%\" />\n");
		sbHtml.append("					<col style=\"width: 80%\" />\n");
		sbHtml.append("				</colgroup>\n");
		sbHtml.append("				<tr>\n");
		sbHtml.append("					<th>합병사유</th>\n");
		sbHtml.append("					<td class=\"inner_tag\">" + CommonUtil.nvl((String) mainData.get("jmt_merge_reason")) + "</td>\n");
		sbHtml.append("				</tr>\n");
		sbHtml.append("				<tr>\n");
		sbHtml.append("					<th>검토의견</th>\n");
		sbHtml.append("					<td class=\"inner_tag\">" + CommonUtil.nvl((String) mainData.get("merge_comment")).replaceAll("\n", "<br />") + "</td>\n");
		sbHtml.append("				</tr>\n");
		sbHtml.append("			</table>\n");
		
		
		
		
		sbHtml.append("			 <br>		\n");
		sbHtml.append("			 <!-- *첨부 파일 -->\n");
		sbHtml.append("			 <h4>첨부 파일</h4>\n");
		sbHtml.append("			 <table class=\"base5\">\n");
		sbHtml.append("			 	<colgroup>\n");
		sbHtml.append("			 		<col style=\'width:80%\' />\n");
		sbHtml.append("			 		<col style=\'width:20%\' />\n");
		sbHtml.append("			 	</colgroup>\n");
		sbHtml.append("			 	<thead>\n");
		sbHtml.append("			 		<tr>\n");
		sbHtml.append("			 			<th scope=\"col\">파일명</th>\n");
		sbHtml.append("			 			<th scope=\"col\">파일보기</th>\n");
		sbHtml.append("				 	</tr>\n");
		sbHtml.append("				</thead>\n");
		sbHtml.append("			 	<tbody>\n");
		if (file_list.size() > 0) {
			for (int i = 0; i < file_list.size(); i++) {
				sbHtml.append("			 		<tr>\n");
				sbHtml.append("			 			<td>" + file_map.get("FILE_NM" + i) + "</td>\n");
				String str_FILE_PATH = str_FILE_URL + file_map.get("FILE_PATH" + i);
				sbHtml.append("            <td>                \n");
				//sbHtml.append("                <input type='button' id='file" + i + "' value='파일선택' />          \n");

				// 파일다운로드 수정 2017.01.16*/
				String str_FILE_NM = cu.evl(String.valueOf(file_map.get("FILE_NM" + i)), ""); // 파일네임
				String type = "";

				if (str_FILE_NM != null && !str_FILE_NM.equals("")) {
					String pathSplit[] = str_FILE_NM.split("\\.");
					type = pathSplit[1].toLowerCase();
				}
//				 System.out.println("type="+type);
//				if (type.equals("jpg") || type.equals("png") || type.equals("gif") || type.equals("bmp")) {
//					sbHtml.append("            <script>               \n");
//					sbHtml.append("                 $(\"#file" + i + "\").click(function(){ window.open(\"" + str_FILE_PATH.trim() + "\");  });    \n");
//					sbHtml.append("            </script>               \n");
//				} else {
//					sbHtml.append("            <script>               \n");
//					sbHtml.append("                 $(\"#file" + i + "\").click(function(){ document.getElementById('file_download_form" + i + "').submit();	  });    \n");
//					sbHtml.append("            </script>               \n");
//				}
				////
				
				
				//개발
				if ("DEV".equals(GC.getServerName())) {
				sbHtml.append("<button class=\"fileDownloadBtn\" onclick=\"window.open('https://dgisdev.dopco.co.kr:8443/land/common/downloadfile?"
					    + "filePath=" + cu.evl((String) ((HashMap) file_list.get(i)).get("file_path"), "") 
					    + "&fileName=" + cu.evl((String) ((HashMap) file_list.get(i)).get("file_nm"), "") 
					    + "&fileJisangNo=" + JISANG_NO 
					    + "&fileSeq=" + cu.evl(
					        ((HashMap) file_list.get(i)).get("file_gubun") != null ? 
					        ((HashMap) file_list.get(i)).get("file_gubun").toString() : "", 
					        "") 
					    + "&fileGubun=jisang', '_blank')\">다운로드 <span class=\"downloadIcon\"></span></button>\n");
				}
				else if ("LIVE".equals(GC.getServerName())) {
				//운영
				sbHtml.append("<button class=\"fileDownloadBtn\" onclick=\"window.open('https://dgis.dopco.co.kr:8443/land/common/downloadfile?"
					    + "filePath=" + cu.evl((String) ((HashMap) file_list.get(i)).get("file_path"), "") 
					    + "&fileName=" + cu.evl((String) ((HashMap) file_list.get(i)).get("file_nm"), "") 
					    + "&fileJisangNo=" + JISANG_NO
					    + "&fileSeq=" + cu.evl(
					        ((HashMap) file_list.get(i)).get("file_gubun") != null ? 
					        ((HashMap) file_list.get(i)).get("file_gubun").toString() : "", 
					        "") 
					    + "&fileGubun=jisang', '_blank')\">다운로드 <span class=\"downloadIcon\"></span></button>\n");

				
				}
				else {
					sbHtml.append("<button class=\"fileDownloadBtn\" onclick=\"window.open('https://dgisdev.dopco.co.kr:8443/land/common/downloadfile?"
						    + "filePath=" + cu.evl((String) ((HashMap) file_list.get(i)).get("file_path"), "") 
						    + "&fileName=" + cu.evl((String) ((HashMap) file_list.get(i)).get("file_nm"), "") 
						    + "&fileJisangNo=" + JISANG_NO 
						    + "&fileSeq=" + cu.evl(
						        ((HashMap) file_list.get(i)).get("file_gubun") != null ? 
						        ((HashMap) file_list.get(i)).get("file_gubun").toString() : "", 
						        "") 
						    + "&fileGubun=jisang', '_blank')\">다운로드 <span class=\"downloadIcon\"></span></button>\n");
				}

				sbHtml.append("            </td>               \n");
				sbHtml.append("	</tr>\n");
			}
		} else {
			sbHtml.append("			 		<tr><td colspan=\"2\">첨부파일이 없습니다.</td></tr> 							");
		}
		sbHtml.append("			 	</tbody>																		");
		sbHtml.append("			 </table>																			");
		
		
		sbHtml.append("	<br>\n");
		
		
		
		sbHtml.append("	</div>\n");
		sbHtml.append("	</div>\n");
		sbHtml.append("	</div>\n");
		sbHtml.append("	<br>\n");
		sbHtml.append("	<br>\n");
		sbHtml.append("</body>         \n");
		sbHtml.append("</html>         \n");

		return sbHtml.toString();
	}

	public String getJisang_sangsin_HTML(String JISANG_NO, String gubun) throws Exception {
		MainService mainService = context.getBean(MainService.class);
		HashMap params = new HashMap();
		// 기존데이터 조회
		params.put("JISANGNO", JISANG_NO);
		ArrayList<HashMap> jisang_list = new ArrayList<HashMap>();
		if ("insert".equals(gubun)) {
			jisang_list = (ArrayList<HashMap>) mainService.selectQuery("jisangSQL.selectJisangDetailList", params);
		} else {
			jisang_list = (ArrayList<HashMap>) mainService.selectQuery("jisangSQL.selectJisangDetailTmpList", params);
		}

		// 소유자 조회
		ArrayList<HashMap> soyu_list = new ArrayList<HashMap>();
		if ("insert".equals(gubun)) {
			soyu_list = (ArrayList<HashMap>) mainService.selectQuery("jisangSQL.selectJisangDetailSoyu", params);
		} else {
			soyu_list = (ArrayList<HashMap>) mainService.selectQuery("jisangSQL.selectJisangDetailSoyuTmp", params);
		}

		// 파일 조회
		ArrayList<HashMap> file_list = new ArrayList<HashMap>();
		params.put("FILENO", JISANG_NO);
		if ("insert".equals(gubun)) {
			file_list = (ArrayList<HashMap>) mainService.selectQuery("jisangSQL.selectJisangRowDetail_Files", params);
		} else {
			params.put("DEL_FLAG", "N");
			file_list = (ArrayList<HashMap>) mainService.selectQuery("jisangSQL.selectJisangRowDetailTmp_Files", params);
		}

		Map<String, String> dataMap = (HashMap<String, String>) jisang_list.get(0);
		String address = null;

		if (jisang_list != null && !jisang_list.isEmpty() && jisang_list.size() > 0) {
			dataMap = jisang_list.get(0);
			address = CommonUtil.nvl(dataMap.get("SIDO_NM")) + " " + CommonUtil.nvl(dataMap.get("SGG_NM")) + " " + CommonUtil.nvl(dataMap.get("EMD_NM")) + " " + CommonUtil.nvl(dataMap.get("RI_NM")) + " " + CommonUtil.nvl(dataMap.get("JIBUN"));
		}

		// 소유자정보 조회
		Map<String, String> soyuMap = new HashMap<String, String>();
		if (soyu_list != null && !soyu_list.isEmpty() && soyu_list.size() > 0) {
			soyuMap = soyu_list.get(0);
		}

		StringBuffer sbHtml = new StringBuffer();

		sbHtml.append(" <!DOCTYPE html> \n");
		sbHtml.append(" <html lang=\"ko\" xmlns=\"http://www.w3.org/1999/xhtml\">                \n");
		sbHtml.append("           \n");
		sbHtml.append(sHeader);
		sbHtml.append("           \n");
		sbHtml.append(" <body>    \n");
		sbHtml.append("     <div id=\"wrap\">          \n");
		sbHtml.append("         <!-- 컨테이너 -->      \n");
		sbHtml.append("         <div id=\"container\"> \n");
		sbHtml.append("		<h4>기본정보</h4>\n");
		sbHtml.append("		<table class=\"base3\">\n");
		sbHtml.append("			<colgroup>\n");
		sbHtml.append("				<col style=\"width: 20%\" />\n");
		sbHtml.append("				<col style=\"width: 30%\" />\n");
		sbHtml.append("				<col style=\"width: 20%\" />\n");
		sbHtml.append("				<col style=\"width: 30%\" />\n");
		sbHtml.append("			</colgroup>\n");
		sbHtml.append("			<tbody>\n");
		sbHtml.append("				<tr>\n");
		sbHtml.append("					<th>담당지사</th>\n");
		sbHtml.append("					<td>" + CommonUtil.nvl(dataMap.get("jisa")) + "</td>\n");
		sbHtml.append("					<th>용도</th>\n");
		sbHtml.append("					<td>" + CommonUtil.nvl(dataMap.get("yongdo")) + "</td>\n");
		sbHtml.append("				</tr>\n");
		sbHtml.append("				<tr>\n");
		sbHtml.append("					<th>관로명(구간)</th>\n");
		sbHtml.append("					<td>" + CommonUtil.nvl(dataMap.get("pipe_name")) + "</td>\n");
		sbHtml.append("					<th>단/복선</th>\n");
		sbHtml.append("					<td>" + CommonUtil.nvl(dataMap.get("sun_gubun")) + "</td>\n");
		sbHtml.append("				</tr>\n");

		sbHtml.append("				<tr>\n");
		sbHtml.append("					<th>행정구역</th>\n");
		sbHtml.append("					<td colspan='3'>" + address + "</td>\n");
		sbHtml.append("				</tr>\n");
		sbHtml.append("				<tr>\n");
		sbHtml.append("					<th>국공유지 여부</th>\n");
		sbHtml.append("					<td>" + CommonUtil.nvl(dataMap.get("gover_own_yn")) + "</td>\n");
		sbHtml.append("					<th>지적 면적(㎡) / 지목</th>\n");
		sbHtml.append("					<td>" + dataMap.get("jijuk_area") + " / " + CommonUtil.nvl(dataMap.get("jimok_text")) + "</td>\n");
		sbHtml.append("				</tr>\n");
		sbHtml.append("			</tbody>\n");
		sbHtml.append("		</table>\n");
		sbHtml.append("		<br>\n");
		sbHtml.append("		<h4>소유자 정보</h4>\n");
		sbHtml.append("		<table class=\"base3\">\n");
		sbHtml.append("			<colgroup>\n");
		sbHtml.append("				<col style=\"width: 16%\" />\n");
		sbHtml.append("				<col style=\"width: 20%\" />\n");
		sbHtml.append("				<col style=\"width: 28%\" />\n");
		sbHtml.append("				<col style=\"width: 16%\" />\n");
		sbHtml.append("				<col style=\"width: 16%\" />\n");
		sbHtml.append("			</colgroup>\n");
		sbHtml.append("			<thead>\n");
		sbHtml.append("				<tr>\n");
		sbHtml.append("					<th scope=\"col\">공유지분</th>\n");
		sbHtml.append("					<th scope=\"col\">성명</th>\n");
		sbHtml.append("					<th scope=\"col\">주소</th>\n");
		sbHtml.append("					<th scope=\"col\">연락처(집)</th>\n");
		sbHtml.append("					<th scope=\"col\">연락처(모바일)</th>\n");
		sbHtml.append("				</tr>\n");
		sbHtml.append("			</thead>\n");
		sbHtml.append("			<tbody>\n");
		int souja_count = 0;
		for (HashMap soujaMap : soyu_list) {
			sbHtml.append("				<tr>\n");
			sbHtml.append("					<td>" + CommonUtil.nvl((String) soujaMap.get("jibun")) + "</td>\n");
			sbHtml.append("					<td>" + CommonUtil.nvl((String) soujaMap.get("souja_name")) + "</td>\n");
			sbHtml.append("					<td>" + CommonUtil.nvl((String) soujaMap.get("address")) + "</td>\n");
			sbHtml.append("					<td>" + CommonUtil.nvl((String) soujaMap.get("home_number")) + "</td>\n");
			sbHtml.append("					<td>" + CommonUtil.nvl((String) soujaMap.get("phone_number")) + "</td>\n");
			sbHtml.append("				</tr>\n");
			souja_count++;
		}
		sbHtml.append("			</tbody>\n");
		sbHtml.append("		</table>\n");
		sbHtml.append("		<br>\n");
		sbHtml.append("		<h4>지상권 정보</h4>\n");
		sbHtml.append("		<table class=\"base3\">\n");
		sbHtml.append("			<colgroup>\n");
		sbHtml.append("				<col style=\"width: 20%\" />\n");
		sbHtml.append("				<col style=\"width: 30%\" />\n");
		sbHtml.append("				<col style=\"width: 20%\" />\n");
		sbHtml.append("				<col style=\"width: 30%\" />\n");
		sbHtml.append("			</colgroup>\n");
		sbHtml.append("			<tbody>\n");
		sbHtml.append("				<tr>\n");
		sbHtml.append("					<th>등기여부</th>\n");
		sbHtml.append("					<td>" + CommonUtil.nvl(dataMap.get("comple_yn")) + "</td>\n");
		sbHtml.append("					<th>편입면적</th>\n");
		sbHtml.append("					<td>" + dataMap.get("PYEONIB_AREA") + "</td>\n");
		sbHtml.append("				</tr>\n");
		sbHtml.append("				<tr>\n");
		sbHtml.append("					<th>사용현황</th>\n");
		sbHtml.append("					<td>" + CommonUtil.nvl(dataMap.get("use_state")) + "</td>\n");
		sbHtml.append("					<th>등기일</th>\n");
		sbHtml.append("					<td>" + CommonUtil.nvl(dataMap.get("deunggi_date")) + "</td>\n");
		sbHtml.append("				</tr>\n");

		sbHtml.append("				<tr>\n");
		sbHtml.append("					<th>등기번호</th>\n");
		sbHtml.append("					<td>" + CommonUtil.nvl(dataMap.get("deunggi_no")) + "</td>\n");
		sbHtml.append("					<th>등기소</th>\n");
		sbHtml.append("					<td>" + CommonUtil.nvl(dataMap.get("deunggiso")) + "</td>\n");
		sbHtml.append("				</tr>\n");
		sbHtml.append("				<tr>\n");
		sbHtml.append("					<th>도시계획 설정여부</th>\n");
		sbHtml.append("					<td>" + CommonUtil.nvl(dataMap.get("dosiplan")) + "</td>\n");
		sbHtml.append("					<th>취득일</th>\n");
		sbHtml.append("					<td>" + CommonUtil.nvl(dataMap.get("chuideuk_date")) + "</td>\n");
		sbHtml.append("				</tr>\n");
		sbHtml.append("				<tr>\n");
		sbHtml.append("					<th>특약사항</th>\n");
		sbHtml.append("					<td>" + CommonUtil.nvl(dataMap.get("special_cont")) + "</td>\n");
		sbHtml.append("					<th>자산분류번호</th>\n");
		sbHtml.append("					<td>" + CommonUtil.nvl(dataMap.get("jasan_no")) + "</td>\n");
		sbHtml.append("				</tr>\n");
		sbHtml.append("			</tbody>\n");
		sbHtml.append("		</table>\n");
		sbHtml.append("		<br>\n");
		sbHtml.append("           <form id='file_download_form' method='post' action='" + plmsDomain + "/dcl/jr/downloadFile' >                   \n");
		sbHtml.append("            <input type='hidden' name='file_no' />                  \n");
		sbHtml.append("            <input type='hidden' name='file_seq' />                   \n");
		sbHtml.append("            <input type='hidden' name='file_gubun' value='jisang' />                  \n");
		sbHtml.append("            </form>                 ");
		sbHtml.append("		<h4>첨부파일</h4>\n");
		sbHtml.append("		<table class=\"base3\">\n");
		sbHtml.append("			<colgroup>\n");
		sbHtml.append("				<col style=\"width: 20%\" />\n");
		sbHtml.append("				<col style=\"width: 60%\" />\n");
		sbHtml.append("				<col style=\"width: 20%\" />\n");
		sbHtml.append("			</colgroup>\n");

		sbHtml.append("			<thead>\n");
		sbHtml.append("				<th>날짜</th>\n");
		sbHtml.append("				<th>파일명</th>\n");
		sbHtml.append("				<th>다운로드</th>\n");
		sbHtml.append("			</thead>\n");
		sbHtml.append("			<tbody>\n");

		String file_gubun = "insert".equals(gubun) ? "jisang" : "jisangTmp";
		if (file_list.size() > 0) {
			int fileCount = 0;
			// 첫번째폼 인식이 안되는 문제가 있어 빈폼 추가
			for (HashMap file_map : file_list) {
//				System.out.println("file_map :: " + file_map.toString());
				String file_date = file_map.get("file_path").toString().split("/")[3];
				String str_JISANG_NO = CommonUtil.evl(String.valueOf(file_map.get("jisang_no")), "");
				String str_FILE_SEQ = CommonUtil.evl(String.valueOf(file_map.get("file_seq")), "");
				sbHtml.append("           <form id='file_download_form" + fileCount + "' method='post' action='" + plmsDomain + "/dcl/jr/downloadFile' >                   \n");
				sbHtml.append("            <input type='hidden' name='file_no' value='" + str_JISANG_NO + "'/>                  \n");
				sbHtml.append("            <input type='hidden' name='file_seq' value='" + str_FILE_SEQ + "' />                   \n");
				sbHtml.append("            <input type='hidden' name='file_gubun' value='" + file_gubun + "' />                  \n");
				sbHtml.append("            </form>                 \n");
				sbHtml.append("			 		<tr>\n");
				sbHtml.append("			 			<td>\n" + file_date.substring(0, 4) + "-" + file_date.substring(4, 6) + "-" + file_date.substring(6, 8) + "\n</td>\n");
				sbHtml.append("			 			<td>\n" + file_map.get("file_nm") + "\n</td>\n");
				String str_FILE_PATH = str_FILE_URL + file_map.get("FILE_PATH");
				sbHtml.append("            			<td>                \n");
				sbHtml.append("                <input type='button' id='file" + fileCount + "' value='파일선택' />          \n");

				String str_FILE_NM = CommonUtil.evl(String.valueOf(file_map.get("file_nm")), ""); // 파일네임
				String type = "";

				if (str_FILE_NM != null && !str_FILE_NM.equals("")) {
					String pathSplit[] = str_FILE_NM.split("\\.");
					type = pathSplit[1].toLowerCase();
				}
				if (type.equals("jpg") || type.equals("png") || type.equals("gif") || type.equals("bmp")) {
					sbHtml.append("            <script>               \n");
					sbHtml.append("                 $(\"#file" + fileCount + "\").click(function(){ window.open(\"" + str_FILE_PATH + "\");  });    \n");
					sbHtml.append("            </script>               \n");
				} else {
					sbHtml.append("            <script>               \n");
					sbHtml.append("                 $(\"#file" + fileCount + "\").click(function(){ document.getElementById('file_download_form" + fileCount + "').submit();	  });    \n");
					sbHtml.append("            </script>               \n");
				}
				sbHtml.append("            			</td>               \n");
				sbHtml.append("				 	</tr>\n");
				fileCount++;
			}
		} else {
			sbHtml.append("			 		<tr><td colspan=\"3\">첨부파일이 없습니다.</td></tr> 							");
		}
		sbHtml.append("			</tbody>\n");
		sbHtml.append("		</table>\n");
		sbHtml.append("		<br>\n");
		sbHtml.append("		</div>\n");
		sbHtml.append("		</div>\n");
		sbHtml.append("		<br>\n");
		sbHtml.append("</body>         \n");
		sbHtml.append("</html>         \n");

		System.out.println("지상권 등록 전자결재 HTML START");
		System.out.println(sbHtml.toString());
		System.out.println("지상권 등록 전자결재 HTML END");

		return sbHtml.toString();
	}

	/**
	 * 민원발생 보고 전자결제 문서 생성 HTML
	 * 
	 * @param MW_SEQ
	 * @param NextSeq
	 * @param FileSeq
	 * @param PmtNo
	 * @param request
	 * @param response
	 * @return
	 */
	public String getMinwonGenerateHTML(String MW_SEQ, String NextSeq, HttpServletRequest request, HttpServletResponse response) {
		GlobalConfig GC = context.getBean(GlobalConfig.class);
		log.info("--------------getMinwonGenerateHTML----------------------");
		MainService mainService = context.getBean(MainService.class);
		/** 조회 시작 **/
		ArrayList list = new ArrayList();
		ArrayList pnu_list = new ArrayList();
		ArrayList file_list = new ArrayList();
		ArrayList map_list = new ArrayList();

		HashMap detailMap = new HashMap();
		
		HashMap pmt_map = new HashMap();
		HashMap file_map = new HashMap();

		CommonUtil cu = new CommonUtil();

		String str_result = "Y";

		try {
			HashMap params = new HashMap();
			params.put("MW_SEQ", MW_SEQ);

//			detailMap = (HashMap) Database.getInstance().queryForObject("Json.selectMinwonDetail", params);// 기본정보
//			pnu_list = (ArrayList) Database.getInstance().queryForList("Json.selectMinwonDetailToji", params); // 소속토지정보
//			file_list = (ArrayList) Database.getInstance().queryForList("Json.selectMinwonDetailFile", params); // 첨부파일
			map_list = (ArrayList) mainService.selectQuery("issueSQL.selectMinwonDetail", params);// 기본정보
			//detailMap = (HashMap) mainService.selectHashmapQuery("issueSQL.selectMinwonDetail", params);// 기본정보
			pnu_list = (ArrayList) mainService.selectQuery("issueSQL.selectMinwonDetailToji", params); // 소속토지정보
			detailMap=(HashMap) map_list.get(0);
			file_list = (ArrayList) mainService.selectQuery("issueSQL.selectMinwonDetailFile", params); // 첨부파일
			//log.info("mapList:"+map_list.get(0));
			//detailMap=map_list.get(0);
//			System.out.println("$$$ params=" + params);
			log.info("map_list:"+map_list);
			log.info("pnu_list:"+pnu_list);
			log.info("file_list:"+file_list);

			if (pnu_list.size() > 0) {
				for (int i = 0; i < pnu_list.size(); i++) {
					HashMap pnuMap = (HashMap) pnu_list.get(i);
					String SIDO = cu.evl((String) ((HashMap) pnu_list.get(i)).get("sido_nm"), "");
					String SGG = cu.evl((String) ((HashMap) pnu_list.get(i)).get("sgg_nm"), "");
					String EMD = cu.evl((String) ((HashMap) pnu_list.get(i)).get("emd_nm"), "");
					String RI = cu.evl((String) ((HashMap) pnu_list.get(i)).get("ri_nm"), "");
					String JIBUN = cu.evl((String) ((HashMap) pnu_list.get(i)).get("jibun"), "");
					String ADDR = "";

					if (!SIDO.equals(""))
						ADDR += SIDO + " ";
					if (!SGG.equals(""))
						ADDR += SGG + " ";
					if (!EMD.equals(""))
						ADDR += EMD + " ";
					if (!RI.equals(""))
						ADDR += RI + " ";
					if (!JIBUN.equals(""))
						ADDR += JIBUN + " ";

					pnuMap.put("ADDR", ADDR);
				}
			}
			if (file_list.size() > 0) {
				for (int i = 0; i < file_list.size(); i++) {
					file_map.put("FILE_PATH" + i, cu.evl((String) ((HashMap) file_list.get(i)).get("file_path"), ""));
					file_map.put("FILE_NM" + i, cu.evl((String) ((HashMap) file_list.get(i)).get("file_nm"), ""));

				}
			}

//			System.out.println("file_list=" + file_list);

		} catch (Exception e) {
			e.printStackTrace();
		}

		/* 조회 끝 */
		StringBuffer sbHtml = new StringBuffer();
log.info("dataMap:"+detailMap);
		String contents = (String) detailMap.get("mw_contents");
		System.out.println("#####" + contents);
		contents = contents.replaceAll("\n", "<br />");
		contents = contents.replaceAll("\r\n", "<br />");
		contents = contents.replaceAll("\\r\\n", "<br />");
		contents = contents.replaceAll("\\\\r\\\\n", "<br />");
		System.out.println("#####" + contents);

		sbHtml.append(" <!DOCTYPE html>\n");
		sbHtml.append(" <html lang=\"ko\" xmlns=\"http://www.w3.org/1999/xhtml\"> \n");
		sbHtml.append(sHeader);
		sbHtml.append(" <body>\n");
		sbHtml.append("<form id='file_download_form' method='post' action='" + plmsDomain + "/dcl/jr/downloadFile' >\n");
		sbHtml.append("            <input type='hidden' name='file_no' /> \n");
		sbHtml.append("            <input type='hidden' name='file_seq' /> \n");
		sbHtml.append("            <input type='hidden' name='file_gubun' value='minwon' /> \n");
		sbHtml.append("</form>\n");

		if (file_list.size() > 0) {
			for (int i = 0; i < file_list.size(); i++) {
				String str_FILE_SEQ = cu.evl(String.valueOf(((HashMap) file_list.get(i)).get("file_seq")), "");
				String str_SEQ = cu.evl(String.valueOf(((HashMap) file_list.get(i)).get("seq")), "");
				sbHtml.append("<form id='file_download_form" + i + "' method='post' action='" + plmsDomain + "/dcl/jr/downloadFile' > \n");
				sbHtml.append("            <input type='hidden' name='file_no' value='" + MW_SEQ + "'/>\n");
				sbHtml.append("            <input type='hidden' name='file_seq' value='" + str_FILE_SEQ + "' />\n");
				sbHtml.append("            <input type='hidden' name='seq' value='" + str_SEQ + "' />\n");
				sbHtml.append("            <input type='hidden' name='file_gubun' value='minwon' />\n");
				sbHtml.append("</form> \n");
			}
		}
		sbHtml.append("     <!-- wrap -->\n");
		sbHtml.append("     <div id=\"wrap\">\n");
		sbHtml.append("         <!-- 컨테이너 -->\n");
		sbHtml.append("         <div id=\"container\">\n");
//		sbHtml.append("			 <div class=\"title\">");
//		sbHtml.append("			 	<h2>지상권 민원발생 보고</h2>		");
//		sbHtml.append("			 </div>		");
		sbHtml.append("			 <div class=\"article\" style=\"display:; width: 1040px;\">		");
		
		sbHtml.append("			 <!-- *민원 정보 -->		");
		sbHtml.append("			 <h4>민원 정보</h4>		");
		sbHtml.append("			 <table class=\"base4\">		");
		sbHtml.append("			 <colgroup>		");
		sbHtml.append("			 	<col style=\"width:15%\" />	");
		sbHtml.append("			 	<col style=\"width:35%\" />	");
		sbHtml.append("			 	<col style=\"width:15%\" />	");
		sbHtml.append("			 	<col style=\"width:35%\" />	");
		sbHtml.append("			 </colgroup>");
		sbHtml.append("			 <tbody>");
		sbHtml.append("			 	<tr>");
		sbHtml.append("			 		<th scope=\"row\">민원 명</th>	");
		sbHtml.append("			 		<td class=\"inner_tag\" colspan=\"3\">	");
		sbHtml.append("			 			<span style=\"width:100%; display:inline-block; text-align:left;\">" + detailMap.get("mw_title") + "</span>	");
		sbHtml.append("			 		</td>	");
		sbHtml.append("			 	</tr>	");
		sbHtml.append("			 	<tr>		");
		sbHtml.append("			 		<th scope=\"row\">발생일자</th>	");
		sbHtml.append("			 		<td class=\"inner_tag\">	");
		sbHtml.append("			 			<span style=\"width:100%; display:inline-block; text-align:center;\">" + detailMap.get("mw_occur_date") + "</span>	");
		sbHtml.append("			 		</td>	");
		sbHtml.append("			 		<th scope=\"row\">발생지사</th>	");
		sbHtml.append("			 		<td class=\"inner_tag\">	");
		sbHtml.append("			 			<span style=\"width:100%; display:inline-block; text-align:center;\">" + detailMap.get("jisa") + "</span>	");
		sbHtml.append("			 		</td>	");
		sbHtml.append("			 	</tr>	");
		sbHtml.append("			 	<tr>");
		sbHtml.append("			 		<th scope=\"row\">민원인/토지주</th>	");
		sbHtml.append("			 		<td class=\"inner_tag\" colspan=\"3\">	");
		sbHtml.append("			              <table >		");
		sbHtml.append("			                  <colgroup>		");
		sbHtml.append("			 	              <col style=\"width:5%\" />	");
		sbHtml.append("			 	              <col style=\"width:20%\" />	");
		sbHtml.append("			 	              <col style=\"width:20%\" />	");
		sbHtml.append("			 	              <col style=\"width:20%\" />	");
		sbHtml.append("			 	              <col style=\"width:20%\" />	");
		sbHtml.append("			 	              <col style=\"width:15%\" />	");
		sbHtml.append("			                 </colgroup>");
		sbHtml.append("			                 <tbody>");
		//토지주 관련 데이터 가공
		String minwonin_tojijunm_arr[]=detailMap.get("minwonin_tojiju_nm").toString().split("\\|");
		String minwonin_tojijubirth_arr[]=detailMap.get("minwonin_tojiju_birth").toString().split("\\|");
		String tojiju_relation_arr[]=detailMap.get("tojiju_relation").toString().split("\\|");
		String minwonin_phone_arr[]=detailMap.get("minwonin_phone").toString().split("\\|");
		String field_presence_arr[]=detailMap.get("field_presence").toString().split("\\|");
		// 두 배열의 길이를 확인 (길이가 같다고 가정)
		int length = Math.min(minwonin_tojijunm_arr.length, minwonin_tojijubirth_arr.length); // 두 배열 중 더 짧은 길이로 맞춤

		// 각 인덱스의 요소를 합친 새로운 배열 생성
		String[][] combinedArray = new String[length][5];

		for (int i = 0; i < length; i++) {
		    combinedArray[i][0] = minwonin_tojijunm_arr[i];
		    combinedArray[i][1] = minwonin_tojijubirth_arr[i];
		    combinedArray[i][2] = tojiju_relation_arr[i];
		    combinedArray[i][3] = minwonin_phone_arr[i];
		    combinedArray[i][4] = field_presence_arr[i];
		  
		}
		for(int i=0;i<combinedArray.length;i++) {
			log.info("combinedArray["+i+"]"+combinedArray[i][0]);
			log.info("combinedArray["+i+"]"+combinedArray[i][1]);
			sbHtml.append("			 	               <tr>");
			sbHtml.append("			 		               <td class=\"inner_tag\">	");
			sbHtml.append("			 			              <span style=\"width:100%; display:inline-block; text-align:center;\">" + i + "</span>	");
			sbHtml.append("			 		               </td>	");
			sbHtml.append("			 		               <td class=\"inner_tag\">	");
			sbHtml.append("			 			              <span style=\"width:100%; display:inline-block; text-align:center;\">" + combinedArray[i][0] + "</span>	");
			sbHtml.append("			 		               </td>	");
			sbHtml.append("			 		               <td class=\"inner_tag\">	");
			sbHtml.append("			 			              <span style=\"width:100%; display:inline-block; text-align:center;\">" + combinedArray[i][1] + "</span>	");
			sbHtml.append("			 		               </td>	");
			sbHtml.append("			 		               <td class=\"inner_tag\">	");
			sbHtml.append("			 			              <span style=\"width:100%; display:inline-block; text-align:center;\">" + combinedArray[i][2] + "</span>	");
			sbHtml.append("			 		               </td>	");
			sbHtml.append("			 		               <td class=\"inner_tag\">	");
			sbHtml.append("			 			              <span style=\"width:100%; display:inline-block; text-align:center;\">" + combinedArray[i][3] + "</span>	");
			sbHtml.append("			 		               </td>	");
			sbHtml.append("			 		               <td class=\"inner_tag\">	");
			sbHtml.append("			 			              <span style=\"width:100%; display:inline-block; text-align:center;\">" + combinedArray[i][4] + "</span>	");
			sbHtml.append("			 		               </td>	");
			
			sbHtml.append("			 	               </tr>");
		}
		
		sbHtml.append("			                 <tbody>");
		sbHtml.append("			              </table>");
//		sbHtml.append("			 			<span style=\"width:100%; display:inline-block; text-align:left;\">" + contents + "</span>");
		sbHtml.append("			 		</td>	");
		sbHtml.append("			 	</tr>	");
		sbHtml.append("			 	<tr>");
		sbHtml.append("			 		<th scope=\"row\">토지이력</th>	");
		sbHtml.append("			 		<td class=\"inner_tag\" colspan=\"3\">	");
		sbHtml.append("			 			<span style=\"width:100%; display:inline-block; text-align:left;\">" + detailMap.get("toji_history") + "</span>");
		sbHtml.append("			 		</td>	");
		sbHtml.append("			 	</tr>	");
		sbHtml.append("			 	<tr>");
		sbHtml.append("			 		<th scope=\"row\">요구사항</th>	");
		sbHtml.append("			 		<td class=\"inner_tag\" colspan=\"3\">	");
		sbHtml.append("			 			<span style=\"width:100%; display:inline-block; text-align:left;\">" + detailMap.get("minwon_requirement") + "</span>");
		sbHtml.append("			 		</td>	");
		sbHtml.append("			 	</tr>	");
		sbHtml.append("			 	<tr>");
		sbHtml.append("			 		<th scope=\"row\">민원 내용</th>	");
		sbHtml.append("			 		<td class=\"inner_tag\" colspan=\"3\">	");
		sbHtml.append("			 			<span style=\"width:100%; display:inline-block; text-align:left;\">" + contents + "</span>");
		sbHtml.append("			 		</td>	");
		sbHtml.append("			 	</tr>	");
		sbHtml.append("			 </tbody>		");
		sbHtml.append("			 </table>		");
		sbHtml.append("			 <br>		\n");
		sbHtml.append("			 <!-- *민원 토지 -->");
		sbHtml.append("			 <h4>민원 토지</h4>");
		sbHtml.append("			 <table class=\'base4\'>");
		sbHtml.append("			 	<colgroup>");
		sbHtml.append("			 		<col style=\'width:60%\' />");
		sbHtml.append("			 		<col style=\'width:20%\' />");
		sbHtml.append("			 		<col style=\'width:20%\' />");
		sbHtml.append("			 	</colgroup>");
		sbHtml.append("			 	<tbody>");
		sbHtml.append("			 		<tr>");
		sbHtml.append("			 			<th scope=\'row\'>주소</th>");
		sbHtml.append("			 			<th scope=\'row\'>등기여부</th>");
		sbHtml.append("			 			<th scope=\'row\'>계약여부</th>");
		sbHtml.append("			 		</tr>\n");
		if (pnu_list.size() > 0) {
			for (int i = 0; i < pnu_list.size(); i++) {
				sbHtml.append("			 		<tr>");
				sbHtml.append("			 			<td class=\'inner_tag\'>");
				sbHtml.append("			 				<span style=\"width:100%; display:inline-block; text-align:center;\">" + ((HashMap<Object, Object>) pnu_list.get(i)).get("sido_nm")+" "+((HashMap<Object, Object>) pnu_list.get(i)).get("sgg_nm")+" "+((HashMap<Object, Object>) pnu_list.get(i)).get("emd_nm")+" "+((HashMap<Object, Object>) pnu_list.get(i)).get("ri_nm")+" "+((HashMap<Object, Object>) pnu_list.get(i)).get("jibun")+ "</span>");
				sbHtml.append("			 			</td>");
				sbHtml.append("			 			<td class=\'inner_tag\'>");
				sbHtml.append("			 				<span style=\"width:100%; display:inline-block; text-align:center;\">" + ((HashMap<Object, Object>) pnu_list.get(i)).get("registed_yn") + "</span>");
				sbHtml.append("			 			</td>");
				sbHtml.append("			 			<td class=\'inner_tag\'>");
				sbHtml.append("			 				<span style=\"width:100%; display:inline-block; text-align:center;\">" + ((HashMap<Object, Object>) pnu_list.get(i)).get("permitted_yn") + "</span>");
				sbHtml.append("			 			</td>");
				sbHtml.append("			 		</tr>\n");
			}
		} else {
			sbHtml.append("			 		<tr>");
			sbHtml.append("			 			<td class=\'inner_tag\'>");
			sbHtml.append("			 				<span style=\"width:100%; display:inline-block; text-align:center;\"></span>");
			sbHtml.append("			 			</td>");
			sbHtml.append("			 			<td class=\'inner_tag\'>");
			sbHtml.append("			 				<span style=\"width:100%; display:inline-block; text-align:center;\"></span>");
			sbHtml.append("			 			</td>");
			sbHtml.append("			 			<td class=\'inner_tag\'>");
			sbHtml.append("			 				<span style=\"width:100%; display:inline-block; text-align:center;\"></span>");
			sbHtml.append("			 			</td>");
			sbHtml.append("			 		</tr>\n");
		}
		sbHtml.append("			 	</tbody>");
		sbHtml.append("			 </table>");
		sbHtml.append("			 <br />		");
		sbHtml.append("			 <!-- *첨부 파일 -->");
		sbHtml.append("			 <h4>첨부 파일</h4>");
		sbHtml.append("			 <table class=\"base5\">");
		sbHtml.append("			 	<colgroup>");
		sbHtml.append("			 		<col style=\'width:80%\' />");
		sbHtml.append("			 		<col style=\'width:20%\' />");
		sbHtml.append("			 	</colgroup>");
		sbHtml.append("			 	<thead>");
		sbHtml.append("			 		<tr>");
		sbHtml.append("			 			<th scope=\"col\">파일명</th>");
		sbHtml.append("			 			<th scope=\"col\">파일보기</th>");
		sbHtml.append("				 	</tr>");
		sbHtml.append("				</thead>");
		sbHtml.append("			 	<tbody>");
		if (file_list.size() > 0) {
			for (int i = 0; i < file_list.size(); i++) {
				 HashMap fmap= (HashMap) file_list.get(i);
				sbHtml.append("			 		<tr>");
				sbHtml.append("			 			<td>" + cu.evl((String) ((HashMap) file_list.get(i)).get("file_nm"), "")  + "</td>");
				String str_FILE_PATH = str_FILE_URL + cu.evl((String) ((HashMap) file_list.get(i)).get("file_path"), "") ;
				sbHtml.append("            <td>                \n");
				//개발
				if ("DEV".equals(GC.getServerName())) {
				sbHtml.append("<button class=\"fileDownloadBtn\" onclick=\"window.open('https://dgisdev.dopco.co.kr:8443/land/common/downloadfile?"
					    + "filePath=" + cu.evl((String) ((HashMap) file_list.get(i)).get("file_path"), "") 
					    + "&fileName=" + cu.evl((String) ((HashMap) file_list.get(i)).get("file_nm"), "") 
					    + "&fileJisangNo=" + MW_SEQ 
					    + "&fileSeq=" + cu.evl(
					        ((HashMap) file_list.get(i)).get("file_gubun") != null ? 
					        ((HashMap) file_list.get(i)).get("file_gubun").toString() : "", 
					        "") 
					    + "&fileGubun=jisang', '_blank')\">다운로드 <span class=\"downloadIcon\"></span></button>\n");
				}
				else if ("LIVE".equals(GC.getServerName())) {
				//운영
				sbHtml.append("<button class=\"fileDownloadBtn\" onclick=\"window.open('https://dgis.dopco.co.kr:8443/land/common/downloadfile?"
					    + "filePath=" + cu.evl((String) ((HashMap) file_list.get(i)).get("file_path"), "") 
					    + "&fileName=" + cu.evl((String) ((HashMap) file_list.get(i)).get("file_nm"), "") 
					    + "&fileJisangNo=" + MW_SEQ
					    + "&fileSeq=" + cu.evl(
					        ((HashMap) file_list.get(i)).get("file_gubun") != null ? 
					        ((HashMap) file_list.get(i)).get("file_gubun").toString() : "", 
					        "") 
					    + "&fileGubun=jisang', '_blank')\">다운로드 <span class=\"downloadIcon\"></span></button>\n");

				
				}
				else {
					sbHtml.append("<button class=\"fileDownloadBtn\" onclick=\"window.open('http://localhost:8081/land/common/downloadfile?"
						    + "filePath=" + cu.evl((String) ((HashMap) file_list.get(i)).get("file_path"), "") 
						    + "&fileName=" + cu.evl((String) ((HashMap) file_list.get(i)).get("file_nm"), "") 
						    + "&fileJisangNo=" + MW_SEQ 
						    + "&fileSeq=" + cu.evl(
						        ((HashMap) file_list.get(i)).get("file_gubun") != null ? 
						        ((HashMap) file_list.get(i)).get("file_gubun").toString() : "", 
						        "") 
						    + "&fileGubun=jisang', '_blank')\">다운로드 <span class=\"downloadIcon\"></span></button>\n");
				}

				sbHtml.append("            </td>               \n");
				sbHtml.append("				 	</tr>");
			}
		} else {
			sbHtml.append("			 		<tr><td colspan=\"2\">첨부파일이 없습니다.</td></tr> 							");
		}
		sbHtml.append("			 	</tbody>																		");
		sbHtml.append("			 </table>																			");
		sbHtml.append("         </div>  \n");
		sbHtml.append("     </div>      \n");
		sbHtml.append(" </body>         \n");
		sbHtml.append("                 \n");
		sbHtml.append(" </html>         \n");
		//System.out.println(sbHtml.toString());
		return sbHtml.toString();
	}

	/**
	 * 민원 대응방안 수립 보고
	 * 
	 * @param MW_SEQ
	 * @param NextSeq
	 * @param request
	 * @param response
	 * @return
	 */
	public String getMinwonResponseHTML(String MW_SEQ, HttpServletRequest request, HttpServletResponse response) {
		MainService mainService = context.getBean(MainService.class);
		GlobalConfig GC = context.getBean(GlobalConfig.class);
		/** 조회 시작 **/
		ArrayList list = new ArrayList();
		ArrayList pnu_list = new ArrayList();
		ArrayList file_list = new ArrayList();
		ArrayList tmp_list = new ArrayList();

		HashMap detailMap = new HashMap();
		HashMap pmt_map = new HashMap();
		HashMap file_map = new HashMap();

		CommonUtil cu = new CommonUtil();

		String str_result = "Y";
		StringBuffer sbHtml = new StringBuffer();

		try {
			HashMap params = new HashMap();
			params.put("MW_SEQ", MW_SEQ);

//			detailMap = (HashMap) Database.getInstance().queryForObject("Json.selectMinwonDetail", params);// 기본정보
//			pnu_list = (ArrayList) Database.getInstance().queryForList("Json.selectMinwonDetailToji", params); // 소속토지정보
//			file_list = (ArrayList) Database.getInstance().queryForList("Json.selectMinwonDetailFile", params); // 첨부파일
			tmp_list = (ArrayList) mainService.selectQuery("issueSQL.selectMinwonDetail", params);// 기본정보
			detailMap=(HashMap)tmp_list.get(0);
			pnu_list = (ArrayList) mainService.selectQuery("issueSQL.selectMinwonDetailToji", params); // 소속토지정보
			file_list = (ArrayList) mainService.selectQuery("issueSQL.selectMinwonDetailFile", params); // 첨부파일
			log.info("pnuList:"+pnu_list);
//			System.out.println("$$$ params=" + params);
			if (pnu_list.size() > 0) {
				for (int i = 0; i < pnu_list.size(); i++) {
					HashMap pnuMap = (HashMap) pnu_list.get(i);
					String SIDO = cu.evl((String) ((HashMap) pnu_list.get(i)).get("sido_nm"), "");
					String SGG = cu.evl((String) ((HashMap) pnu_list.get(i)).get("sgg_nm"), "");
					String EMD = cu.evl((String) ((HashMap) pnu_list.get(i)).get("emd_nm"), "");
					String RI = cu.evl((String) ((HashMap) pnu_list.get(i)).get("ri_nm"), "");
					String JIBUN = cu.evl((String) ((HashMap) pnu_list.get(i)).get("jibun"), "");
					String ADDR = "";

					if (!SIDO.equals(""))
						ADDR += SIDO + " ";
					if (!SGG.equals(""))
						ADDR += SGG + " ";
					if (!EMD.equals(""))
						ADDR += EMD + " ";
					if (!RI.equals(""))
						ADDR += RI + " ";
					if (!JIBUN.equals(""))
						ADDR += JIBUN + " ";

					pnuMap.put("ADDR", ADDR);
				}
			}
			if (file_list.size() > 0) {
				for (int i = 0; i < file_list.size(); i++) {
					file_map.put("FILE_PATH" + i, cu.evl((String) ((HashMap) file_list.get(i)).get("file_path"), ""));
					file_map.put("FILE_NM" + i, cu.evl((String) ((HashMap) file_list.get(i)).get("file_nm"), ""));
					file_map.put("FILE_SEQ" + i, cu.evl(((HashMap) file_list.get(i)).get("file_seq").toString(), ""));

				}
			}

//			System.out.println("file_list=" + file_list);

			/* 조회 끝 */
			String contents = (String) detailMap.get("mw_contents");
			contents = contents.replaceAll("\n", "<br />");
			contents = contents.replaceAll("\r\n", "<br />");
			contents = contents.replaceAll("\\r\\n", "<br />");
			contents = contents.replaceAll("\\\\r\\\\n", "<br />");

			sbHtml.append(" <!DOCTYPE html>\n");
			sbHtml.append(" <html lang=\"ko\" xmlns=\"http://www.w3.org/1999/xhtml\"> \n");
			sbHtml.append(sHeader);
			sbHtml.append(" <body>\n");

			sbHtml.append("<form id='file_download_form' method='post' action='" + plmsDomain + "/dcl/jr/downloadFile' >\n");
			sbHtml.append("            <input type='hidden' name='file_no' /> \n");
			sbHtml.append("            <input type='hidden' name='file_seq' /> \n");
			sbHtml.append("            <input type='hidden' name='file_gubun' value='minwon' /> \n");
			sbHtml.append("</form>\n");

			if (file_list.size() > 0) {
				for (int i = 0; i < file_list.size(); i++) {
					String str_FILE_SEQ = cu.evl(String.valueOf(((HashMap) file_list.get(i)).get("file_seq")), "");
					sbHtml.append("<form id='file_download_form" + i + "' method='post' action='" + plmsDomain + "/dcl/jr/downloadFile' > \n");
					sbHtml.append("            <input type='hidden' name='file_no' value='" + MW_SEQ + "'/>\n");
					sbHtml.append("            <input type='hidden' name='file_seq' value='" + str_FILE_SEQ + "' />\n");
					sbHtml.append("            <input type='hidden' name='file_gubun' value='minwon' />\n");
					sbHtml.append("</form> \n");
				}
			}
			sbHtml.append("     <!-- wrap -->\n");
			sbHtml.append("     <div id=\"wrap\">\n");
			sbHtml.append("         <!-- 컨테이너 -->\n");
			sbHtml.append("         <div id=\"container\">\n");
//			sbHtml.append("			 <div class=\"title\">");
//			sbHtml.append("			 	<h2>지상권 민원 대응방안 수립보고</h2>		");
//			sbHtml.append("			 </div>		");
			sbHtml.append("			 <div class=\"article\">		");
			sbHtml.append("			 <!-- *민원 정보 -->		");
			sbHtml.append("			 <h4>민원 정보</h4>		");
			sbHtml.append("			 <table class=\"base4\">		");
			sbHtml.append("			 <colgroup>		");
			sbHtml.append("			 	<col style=\"width:15%\" />	");
			sbHtml.append("			 	<col style=\"width:35%\" />	");
			sbHtml.append("			 	<col style=\"width:15%\" />	");
			sbHtml.append("			 	<col style=\"width:35%\" />	");
			sbHtml.append("			 </colgroup>");
			sbHtml.append("			 <tbody>");
			sbHtml.append("			 	<tr>");
			sbHtml.append("			 		<th scope=\"row\">민원 명</th>	");
			sbHtml.append("			 		<td class=\"inner_tag\" colspan=\"3\">	");
			sbHtml.append("			 			<span style=\"width:100%; display:inline-block; text-align:left;\">" + detailMap.get("mw_title") + "</span>	");
			sbHtml.append("			 		</td>	");
			sbHtml.append("			 	</tr>	");
			sbHtml.append("			 	<tr>		");
			sbHtml.append("			 		<th scope=\"row\">발생일자</th>	");
			sbHtml.append("			 		<td class=\"inner_tag\">	");
			sbHtml.append("			 			<span style=\"width:100%; display:inline-block; text-align:center;\">" + detailMap.get("mw_occur_date") + "</span>	");
			sbHtml.append("			 		</td>	");
			sbHtml.append("			 		<th scope=\"row\">발생지사</th>	");
			sbHtml.append("			 		<td class=\"inner_tag\">	");
			sbHtml.append("			 			<span style=\"width:100%; display:inline-block; text-align:center;\">" + detailMap.get("jisa") + "</span>	");
			sbHtml.append("			 		</td>	");
			sbHtml.append("			 	</tr>	");
			sbHtml.append("			 	<tr>");
			sbHtml.append("			 		<th scope=\"row\">민원 내용</th>	");
			sbHtml.append("			 		<td class=\"inner_tag\" colspan=\"3\">	");
			sbHtml.append("			 			<span style=\"width:100%; display:inline-block; text-align:left;padding-left: 10px;\">" + contents + "</span>");
			sbHtml.append("			 		</td>	");
			sbHtml.append("			 	</tr>	");
			sbHtml.append("			 </tbody>		");
			sbHtml.append("			 </table>		");
			sbHtml.append("			 <br>		");

			sbHtml.append("			 <!-- *민원 정보 -->		");
			sbHtml.append("			 <h4>민원 대응방안</h4>		");
			sbHtml.append("			 <table class=\"base4\">		");
			sbHtml.append("			 <colgroup>		");
			sbHtml.append("			 	<col style=\"width:15%\" />	");
			sbHtml.append("			 	<col style=\"width:35%\" />	");
			sbHtml.append("			 	<col style=\"width:15%\" />	");
			sbHtml.append("			 	<col style=\"width:35%\" />	");
			sbHtml.append("			 </colgroup>");
			sbHtml.append("			 <tbody>");
			sbHtml.append("			 	<tr>");
			sbHtml.append("			 		<th scope=\"row\">이슈유형</th>");
			sbHtml.append("			 		<td class=\"inner_tag\" colspan=\"3\">");
			sbHtml.append("			 			<span style=\"width:100%; display:inline-block; text-align:left;padding-left: 10px;\">" + detailMap.get("code_str1_tmp") + " &gt; " + detailMap.get("code_str2_tmp") + " &gt; " + detailMap.get("code_str3_tmp") + "</span>	");
			sbHtml.append("			 		</td>	");
			sbHtml.append("			 	</tr>	");
			sbHtml.append("			 </tbody>		");
			sbHtml.append("			 </table>		");
			sbHtml.append("			 <br>		");

			sbHtml.append("			 <!-- *민원 토지 -->");
			sbHtml.append("			 <h4>민원 토지</h4>");
			sbHtml.append("			 <table class=\'base4\'>");
			sbHtml.append("			 	<colgroup>");
			sbHtml.append("			 		<col style=\'width:60%\' />");
			sbHtml.append("			 		<col style=\'width:20%\' />");
			sbHtml.append("			 		<col style=\'width:20%\' />");
			sbHtml.append("			 	</colgroup>");
			sbHtml.append("			 	<tbody>");
			sbHtml.append("			 		<tr>");
			sbHtml.append("			 			<th scope=\'row\'>주소</th>");
			sbHtml.append("			 			<th scope=\'row\'>등기여부</th>");
			sbHtml.append("			 			<th scope=\'row\'>계약여부</th>");
			sbHtml.append("			 		</tr>");
			if (pnu_list.size() > 0) {
				for (int i = 0; i < pnu_list.size(); i++) {
					sbHtml.append("			 		<tr>");
					sbHtml.append("			 			<td class=\'inner_tag\'>");
					sbHtml.append("			 				<span style=\"width:100%; display:inline-block; text-align:center;\">" + ((HashMap<Object, Object>) pnu_list.get(i)).get("ADDR") + "</span>");
					sbHtml.append("			 			</td>");
					sbHtml.append("			 			<td class=\'inner_tag\'>");
					sbHtml.append("			 				<span style=\"width:100%; display:inline-block; text-align:center;\">" + ((HashMap<Object, Object>) pnu_list.get(i)).get("registed_yn") + "</span>");
					sbHtml.append("			 			</td>");
					sbHtml.append("			 			<td class=\'inner_tag\'>");
					sbHtml.append("			 				<span style=\"width:100%; display:inline-block; text-align:center;\">" + ((HashMap<Object, Object>) pnu_list.get(i)).get("permitted_yn") + "</span>");
					sbHtml.append("			 			</td>");
					sbHtml.append("			 		</tr>");
				}
			} else {
				sbHtml.append("			 		<tr>");
				sbHtml.append("			 			<td class=\'inner_tag\'>");
				sbHtml.append("			 				<span style=\"width:100%; display:inline-block; text-align:center;\"></span>");
				sbHtml.append("			 			</td>");
				sbHtml.append("			 			<td class=\'inner_tag\'>");
				sbHtml.append("			 				<span style=\"width:100%; display:inline-block; text-align:center;\"></span>");
				sbHtml.append("			 			</td>");
				sbHtml.append("			 			<td class=\'inner_tag\'>");
				sbHtml.append("			 				<span style=\"width:100%; display:inline-block; text-align:center;\"></span>");
				sbHtml.append("			 			</td>");
				sbHtml.append("			 		</tr>");
			}
			sbHtml.append("			 	</tbody>");
			sbHtml.append("			 </table>");
			sbHtml.append("			 <br />		");
			sbHtml.append("			 <!-- *첨부 파일 -->");
			sbHtml.append("			 <h4>첨부 파일</h4>");
			sbHtml.append("			 <table class=\"base5\">");
			sbHtml.append("			 	<colgroup>");
			sbHtml.append("			 		<col style=\'width:80%\' />");
			sbHtml.append("			 		<col style=\'width:20%\' />");
			sbHtml.append("			 	</colgroup>");
			sbHtml.append("			 	<thead>");
			sbHtml.append("			 		<tr>");
			sbHtml.append("			 			<th scope=\"col\">파일명</th>");
			sbHtml.append("			 			<th scope=\"col\">파일보기</th>");
			sbHtml.append("				 	</tr>");
			sbHtml.append("				</thead>");
			sbHtml.append("			 	<tbody>");
			if (file_list.size() > 0) {
				for (int i = 0; i < file_list.size(); i++) {
					sbHtml.append("			 		<tr>");
					sbHtml.append("			 			<td>" + file_map.get("FILE_NM" + i) + "</td>");
					String str_FILE_PATH = str_FILE_URL + file_map.get("FILE_PATH" + i);
					sbHtml.append("            <td>                \n");
					//개발
					if ("DEV".equals(GC.getServerName())) {
					sbHtml.append("<button class=\"fileDownloadBtn\" onclick=\"window.open('https://dgisdev.dopco.co.kr:8443/land/common/downloadfile?"
						    + "filePath=" + file_map.get("FILE_PATH" + i)
						    + "&fileName=" + file_map.get("FILE_NM" + i) 
						    + "&fileJisangNo=" + MW_SEQ 
						    + "&fileSeq=" + file_map.get("FILE_SEQ"+i) 
						    + "&fileGubun=minwon', '_blank')\">다운로드 <span class=\"downloadIcon\"></span></button>\n");
					}
					else if ("LIVE".equals(GC.getServerName())) {
					//운영
					sbHtml.append("<button class=\"fileDownloadBtn\" onclick=\"window.open('https://dgis.dopco.co.kr:8443/land/common/downloadfile?"
							 + "filePath=" + file_map.get("FILE_PATH" + i)
							    + "&fileName=" + file_map.get("FILE_NM" + i) 
							    + "&fileJisangNo=" + MW_SEQ 
							    + "&fileSeq=" + file_map.get("FILE_SEQ"+i) 
							    + "&fileGubun=minwon', '_blank')\">다운로드 <span class=\"downloadIcon\"></span></button>\n");

					
					}
					else {
						sbHtml.append("<button class=\"fileDownloadBtn\" onclick=\"window.open('http://localhost:8081/land/common/downloadfile?"
								 + "filePath=" + file_map.get("FILE_PATH" + i)
								    + "&fileName=" + file_map.get("FILE_NM" + i) 
								    + "&fileJisangNo=" + MW_SEQ 
								    + "&fileSeq=" + file_map.get("FILE_SEQ"+i) 
								    + "&fileGubun=minwon', '_blank')\">다운로드 <span class=\"downloadIcon\"></span></button>\n");
					}
//					sbHtml.append("                <input type='button' id='file" + i + "' value='파일선택' />\n");
//					String str_FILE_NM = cu.evl(String.valueOf(file_map.get("FILE_NM" + i)), ""); // 파일네임
//					String type = "";
//
//					if (str_FILE_NM != null && !str_FILE_NM.equals("")) {
//						String pathSplit[] = str_FILE_NM.split("\\.");
//						type = pathSplit[1].toLowerCase();
//					}
//					if (type.equals("jpg") || type.equals("png") || type.equals("gif") || type.equals("bmp")) {
//						sbHtml.append("            <script>               \n");
//						sbHtml.append("                 $(\"#file" + i + "\").click(function(){ window.open(\"" + str_FILE_PATH + "\");  });    \n");
//						sbHtml.append("            </script>               \n");
//					} else {
//						sbHtml.append("            <script>               \n");
//						sbHtml.append("                 $(\"#file" + i + "\").click(function(){ document.getElementById('file_download_form" + i + "').submit();	  });    \n");
//						sbHtml.append("            </script>               \n");
//					}

					sbHtml.append("            </td>               \n");
					sbHtml.append("				 	</tr>");
				}
			} else {
				sbHtml.append("			 		<tr><td colspan=\"2\">첨부파일이 없습니다.</td></tr>");
			}
			sbHtml.append("			 	</tbody>");
			sbHtml.append("			 </table>");
			sbHtml.append("         </div>  \n");
			sbHtml.append("     </div>      \n");
			sbHtml.append(" </body>         \n");
			sbHtml.append("                 \n");
			sbHtml.append(" </html>         \n");
		} catch (Exception e) {
			e.printStackTrace();
		}

		return sbHtml.toString();
	}

	/**
	 * 민원 협의 보고
	 * 
	 * @param MW_SEQ
	 * @param NextSeq
	 * @param request
	 * @param response
	 * @return
	 */
	public String getMinwonAgreeHTML(String MW_SEQ, String agreeSeq, String NextSeq, HttpServletRequest request, HttpServletResponse response) {
		MainService mainService = context.getBean(MainService.class);
		GlobalConfig GC = context.getBean(GlobalConfig.class);
		/** 조회 시작 **/
		ArrayList list = new ArrayList();
		ArrayList pnu_list = new ArrayList();
		ArrayList file_list = new ArrayList();
		ArrayList agree_file_list = new ArrayList();
		ArrayList tmp_list = new ArrayList();
		HashMap detailMap = new HashMap();
		HashMap pmt_map = new HashMap();
		HashMap file_map = new HashMap();
		HashMap agreeMap = new HashMap();
		
		CommonUtil cu = new CommonUtil();

		String str_result = "Y";
		StringBuffer sbHtml = new StringBuffer();

		try {
			HashMap params = new HashMap();
			params.put("MW_SEQ", MW_SEQ);
			params.put("AGREE_SEQ", agreeSeq);

//			detailMap = (HashMap) Database.getInstance().queryForObject("Json.selectMinwonDetail", params);// 기본정보
			tmp_list = (ArrayList) mainService.selectQuery("issueSQL.selectMinwonDetail", params);// 기본정보
			log.info("tmp_list:"+tmp_list);
		
		

			if (tmp_list != null && !tmp_list.isEmpty()) {
			    detailMap = (HashMap) tmp_list.get(0);
			} else {
			    log.info("tmp_list is null or empty.");
			    // 에러 처리 로직 추가
			}
			log.info("deailMap:"+detailMap);
			//detailMap=(HashMap)tmp_list.get(0));
//			pnu_list = (ArrayList) Database.getInstance().queryForList("Json.selectMinwonDetailToji", params); // 소속토지정보
			pnu_list = (ArrayList) mainService.selectQuery("issueSQL.selectMinwonDetailToji", params); // 소속토지정보
			file_list = (ArrayList) mainService.selectQuery("issueSQL.selectMinwonDetailFile", params); // 첨부파일

			//agreeMap = (HashMap) mainService.selectHashmapQuery("issueSQL.selectMinwonAgreeData", params); // 민원협의
			ArrayList tmp_list1 = (ArrayList) mainService.selectQuery("issueSQL.selectMinwonAgreeData", params); // 민원협의
			agreeMap= (HashMap)tmp_list1.get(0);
			log.info("agreeMap:"+agreeMap);
//			log.info("tmp_list 0:"+tmp_list.get(0).toString());
//			JSONObject tmpObj=new JSONObject(tmp_list.get(0).toString());
//			log.info("tmpObj:"+tmpObj);
			//agreeMap=(HashMap)tmp_list.get(0);
			agree_file_list = (ArrayList) mainService.selectQuery("issueSQL.selectMinwonAgreeDetailFile", params); // 첨부파일

			System.out.println("$$$ params=" + params);
			if (pnu_list.size() > 0) {
				for (int i = 0; i < pnu_list.size(); i++) {
					HashMap pnuMap = (HashMap) pnu_list.get(i);
					String SIDO = cu.evl((String) ((HashMap) pnu_list.get(i)).get("sido_nm"), "");
					String SGG = cu.evl((String) ((HashMap) pnu_list.get(i)).get("sgg_nm"), "");
					String EMD = cu.evl((String) ((HashMap) pnu_list.get(i)).get("emd_nm"), "");
					String RI = cu.evl((String) ((HashMap) pnu_list.get(i)).get("ri_nm"), "");
					String JIBUN = cu.evl((String) ((HashMap) pnu_list.get(i)).get("jibun"), "");
					String ADDR = "";

					if (!SIDO.equals(""))
						ADDR += SIDO + " ";
					if (!SGG.equals(""))
						ADDR += SGG + " ";
					if (!EMD.equals(""))
						ADDR += EMD + " ";
					if (!RI.equals(""))
						ADDR += RI + " ";
					if (!JIBUN.equals(""))
						ADDR += JIBUN + " ";

					pnuMap.put("ADDR", ADDR);
				}
			}
			if (file_list.size() > 0) {
				for (int i = 0; i < file_list.size(); i++) {
					file_map.put("FILE_PATH" + i, cu.evl((String) ((HashMap) file_list.get(i)).get("file_path"), ""));
					file_map.put("FILE_NM" + i, cu.evl((String) ((HashMap) file_list.get(i)).get("file_nm"), ""));
					file_map.put("FILE_SEQ" + i, cu.evl(((HashMap) file_list.get(i)).get("file_seq").toString(), ""));
				}
			}

//			System.out.println("file_list=" + file_list);

			String contents = (String) detailMap.get("mw_contents");
			contents = contents.replaceAll("\n", "<br />");
			contents = contents.replaceAll("\r\n", "<br />");
			contents = contents.replaceAll("\\r\\n", "<br />");
			contents = contents.replaceAll("\\\\r\\\\n", "<br />");

			sbHtml.append(" <!DOCTYPE html>\n");
			sbHtml.append(" <html lang=\"ko\" xmlns=\"http://www.w3.org/1999/xhtml\"> \n");
			sbHtml.append(sHeader);
			sbHtml.append(" <body>\n");

			sbHtml.append("<form id='file_download_form' method='post' action='" + plmsDomain + "/dcl/jr/downloadFile' >\n");
			sbHtml.append("            <input type='hidden' name='file_no' /> \n");
			sbHtml.append("            <input type='hidden' name='file_seq' /> \n");
			sbHtml.append("            <input type='hidden' name='file_gubun' value='minwon' /> \n");
			sbHtml.append("</form>\n");

			/*
			 * if (file_list.size() > 0) { for (int i = 0; i < file_list.size(); i++) {
			 * String str_FILE_SEQ = cu.evl(String.valueOf(((HashMap)
			 * file_list.get(i)).get("file_seq")), "");
			 * sbHtml.append("<form id='file_download_form" + i + "' method='post' action='"
			 * + plmsDomain + "/dcl/jr/downloadFile' > \n");
			 * sbHtml.append("            <input type='hidden' name='file_no' value='" +
			 * MW_SEQ + "'/>\n");
			 * sbHtml.append("            <input type='hidden' name='file_seq' value='" +
			 * str_FILE_SEQ + "' />\n"); sbHtml.
			 * append("            <input type='hidden' name='file_gubun' value='minwon' />\n"
			 * ); sbHtml.append("</form> \n"); } }
			 * 
			 * if (agree_file_list.size() > 0) { for (int i = 0; i < agree_file_list.size();
			 * i++) { String str_FILE_SEQ = cu.evl(String.valueOf(((HashMap)
			 * agree_file_list.get(i)).get("file_seq")), "");
			 * sbHtml.append("<form id='agree_file_download_form" + i +
			 * "' method='post' action='" + plmsDomain + "/dcl/jr/downloadFile' > \n");
			 * sbHtml.append("            <input type='hidden' name='file_no' value='" +
			 * MW_SEQ + "'/>\n");
			 * sbHtml.append("            <input type='hidden' name='file_seq' value='" +
			 * str_FILE_SEQ + "' />\n"); sbHtml.
			 * append("            <input type='hidden' name='file_gubun' value='minwonAgree' />\n"
			 * ); sbHtml.append("</form> \n"); } }
			 */
			sbHtml.append("     <!-- wrap -->\n");
			sbHtml.append("     <div id=\"wrap\">\n");
			sbHtml.append("         <!-- 컨테이너 -->\n");
			sbHtml.append("         <div id=\"container\">\n");
//			sbHtml.append("			 <div class=\"title\">");
//			sbHtml.append("			 	<h2>지상권 민원협의 보고</h2>		");
//			sbHtml.append("			 </div>		");
			sbHtml.append("			 <div class=\"article\">		");
			sbHtml.append("			 <!-- *민원 정보 -->		");
			sbHtml.append("			 <h4>민원 정보</h4>		");
			sbHtml.append("			 <table class=\"base4\">		");
			sbHtml.append("			 <colgroup>		");
			sbHtml.append("			 	<col style=\"width:15%\" />	");
			sbHtml.append("			 	<col style=\"width:35%\" />	");
			sbHtml.append("			 	<col style=\"width:15%\" />	");
			sbHtml.append("			 	<col style=\"width:35%\" />	");
			sbHtml.append("			 </colgroup>");
			sbHtml.append("			 <tbody>");
			sbHtml.append("			 	<tr>");
			sbHtml.append("			 		<th scope=\"row\">민원 명</th>	");
			sbHtml.append("			 		<td class=\"inner_tag\" colspan=\"3\">	");
			sbHtml.append("			 			<span style=\"width:100%; display:inline-block; text-align:center;\">" + detailMap.get("mw_title") + "</span>	");
			sbHtml.append("			 		</td>	");
			sbHtml.append("			 	</tr>	");
			sbHtml.append("			 	<tr>");
			sbHtml.append("			 		<th scope=\"row\">이슈유형</th>");
			sbHtml.append("			 		<td class=\"inner_tag\" colspan=\"3\">");
			sbHtml.append("			 			<span style=\"width:100%; display:inline-block; text-align:center;\">" + detailMap.get("code_str1_tmp") + " &gt; " + detailMap.get("code_str2_tmp") + " &gt; " + detailMap.get("code_str3_tmp") + "</span>	");
			sbHtml.append("			 		</td>	");
			sbHtml.append("			 	</tr>	");
			sbHtml.append("			 	<tr>		");
			sbHtml.append("			 		<th scope=\"row\">발생일자</th>	");
			sbHtml.append("			 		<td class=\"inner_tag\">	");
			sbHtml.append("			 			<span style=\"width:100%; display:inline-block; text-align:center;\">" + detailMap.get("mw_occur_date") + "</span>	");
			sbHtml.append("			 		</td>	");
			sbHtml.append("			 		<th scope=\"row\">발생지사</th>	");
			sbHtml.append("			 		<td class=\"inner_tag\">	");
			sbHtml.append("			 			<span style=\"width:100%; display:inline-block; text-align:center;\">" + detailMap.get("jisa") + "</span>	");
			sbHtml.append("			 		</td>	");
			sbHtml.append("			 	</tr>	");
			sbHtml.append("			 	<tr>");
			sbHtml.append("			 		<th scope=\"row\">민원 내용</th>	");
			sbHtml.append("			 		<td class=\"inner_tag\" colspan=\"3\">	");
			sbHtml.append("			 			<span style=\"width:100%; display:inline-block; text-align:left;padding-left: 10px;\">" + contents + "</span>");
			sbHtml.append("			 		</td>	");
			sbHtml.append("			 	</tr>	");
			sbHtml.append("			 </tbody>		");
			sbHtml.append("			 </table>		");
			sbHtml.append("			 <br>		");
			sbHtml.append("			 <!-- *민원 토지 -->");
			sbHtml.append("			 <h4>민원 토지</h4>");
			sbHtml.append("			 <table class=\'base4\'>");
			sbHtml.append("			 	<colgroup>");
			sbHtml.append("			 		<col style=\'width:60%\' />");
			sbHtml.append("			 		<col style=\'width:20%\' />");
			sbHtml.append("			 		<col style=\'width:20%\' />");
			sbHtml.append("			 	</colgroup>");
			sbHtml.append("			 	<tbody>");
			sbHtml.append("			 		<tr>");
			sbHtml.append("			 			<th scope=\'row\'>주소</th>");
			sbHtml.append("			 			<th scope=\'row\'>등기여부</th>");
			sbHtml.append("			 			<th scope=\'row\'>계약여부</th>");
			sbHtml.append("			 		</tr>");
			if (pnu_list.size() > 0) {
				for (int i = 0; i < pnu_list.size(); i++) {
					sbHtml.append("			 		<tr>");
					sbHtml.append("			 			<td class=\'inner_tag\'>");
					sbHtml.append("			 				<span style=\"width:100%; display:inline-block; text-align:center;\">" + ((HashMap<Object, Object>) pnu_list.get(i)).get("addr") + "</span>");
					sbHtml.append("			 			</td>");
					sbHtml.append("			 			<td class=\'inner_tag\'>");
					sbHtml.append("			 				<span style=\"width:100%; display:inline-block; text-align:center;\">" + ((HashMap<Object, Object>) pnu_list.get(i)).get("registed_yn") + "</span>");
					sbHtml.append("			 			</td>");
					sbHtml.append("			 			<td class=\'inner_tag\'>");
					sbHtml.append("			 				<span style=\"width:100%; display:inline-block; text-align:center;\">" + ((HashMap<Object, Object>) pnu_list.get(i)).get("permitted_yn") + "</span>");
					sbHtml.append("			 			</td>");
					sbHtml.append("			 		</tr>");
				}
			} else {
				sbHtml.append("			 		<tr>");
				sbHtml.append("			 			<td class=\'inner_tag\'>");
				sbHtml.append("			 				<span style=\"width:100%; display:inline-block; text-align:center;\"></span>");
				sbHtml.append("			 			</td>");
				sbHtml.append("			 			<td class=\'inner_tag\'>");
				sbHtml.append("			 				<span style=\"width:100%; display:inline-block; text-align:center;\"></span>");
				sbHtml.append("			 			</td>");
				sbHtml.append("			 			<td class=\'inner_tag\'>");
				sbHtml.append("			 				<span style=\"width:100%; display:inline-block; text-align:center;\"></span>");
				sbHtml.append("			 			</td>");
				sbHtml.append("			 		</tr>");
			}
			sbHtml.append("			 	</tbody>");
			sbHtml.append("			 </table>");
			sbHtml.append("			 <br />		");
			sbHtml.append("			 <!-- *협의 내용 -->		");
			sbHtml.append("			 <h4>민원 협의</h4>		");
			sbHtml.append("			 <table class=\"base4\">		");
			sbHtml.append("			 <colgroup>		");
			sbHtml.append("			 	<col style=\"width:15%\" />	");
			sbHtml.append("			 	<col style=\"width:35%\" />	");
			sbHtml.append("			 	<col style=\"width:15%\" />	");
			sbHtml.append("			 	<col style=\"width:35%\" />	");
			sbHtml.append("			 </colgroup>");
			sbHtml.append("			 <tbody>");
			sbHtml.append("			 	<tr>");
			sbHtml.append("			 		<th scope=\"row\">협의 제목</th>	");
			sbHtml.append("			 		<td class=\"inner_tag\" colspan=\"3\">	");
//			String mwTitle = (tmp_list != null && !tmp_list.isEmpty() && ((HashMap) tmp_list.get(0)).get("mw_title") != null)
//	                 ? ((HashMap) tmp_list.get(0)).get("mw_title").toString() : "";

			sbHtml.append("			 			<span style=\"width:100%; display:inline-block; text-align:left;padding-left: 10px;\">" +agreeMap.get("agree_title")+ "</span>	");
			sbHtml.append("			 		</td>	");
			sbHtml.append("			 	</tr>	");
			sbHtml.append("			 	<tr>");
			sbHtml.append("			 		<th scope=\"row\">협의 날짜</th>");
			sbHtml.append("			 		<td class=\"inner_tag\">");
//			String mwOccurDate = (tmp_list != null && !tmp_list.isEmpty() && ((HashMap) tmp_list.get(0)).get("mw_occur_date") != null) ? ((HashMap) tmp_list.get(0)).get("mw_occur_date").toString() : "";
			sbHtml.append("			 			<span style=\"width:100%; display:inline-block; text-align:center;\">" +agreeMap.get("agree_date") + "</span>	");
			sbHtml.append("			 		</td>	");
			sbHtml.append("			 		<th scope=\"row\">진행상태</th>	");
			sbHtml.append("			 		<td class=\"inner_tag\">	");
//			String statusStr = (tmp_list != null && !tmp_list.isEmpty() && ((HashMap) tmp_list.get(0)).get("status_str") != null) ? ((HashMap) tmp_list.get(0)).get("status_str").toString() : "";
			sbHtml.append("			 			<span style=\"width:100%; display:inline-block; text-align:center;\">" +agreeMap.get("status_str") + "</span>	");
			sbHtml.append("			 		</td>	");
			sbHtml.append("			 	</tr>	");
			sbHtml.append("			 	<tr>		");
			sbHtml.append("			 		<th scope=\"row\">협의 내용</th>	");
			sbHtml.append("			 		<td class=\"inner_tag\" colspan=\"3\">	");
//			String mwContents = (tmp_list != null && !tmp_list.isEmpty() && ((HashMap) tmp_list.get(0)).get("mw_contents") != null) ? ((HashMap) tmp_list.get(0)).get("mw_contents").toString() : "";
			sbHtml.append("			 			<span style=\"width:100%; display:inline-block; text-align:left;padding-left: 10px; \">" + agreeMap.get("agree_contents")+ "</span>	");
			sbHtml.append("			 		</td>	");
			sbHtml.append("			 	</tr>	");
			sbHtml.append("			 	<tr>");
			sbHtml.append("			 		<th scope=\"row\">첨부파일</th>	");
			sbHtml.append("			 		<td class=\"inner_tag\" colspan=\"3\">	");
			sbHtml.append("			 <table class=\"base4\">");
			sbHtml.append("			 	<colgroup>");
			sbHtml.append("			 		<col style=\'width:80%\' />");
			sbHtml.append("			 		<col style=\'width:20%\' />");
			sbHtml.append("			 	</colgroup>");
			sbHtml.append("			 	<thead>");
			sbHtml.append("			 		<tr>");
			sbHtml.append("			 			<th scope=\"col\">파일명</th>");
			sbHtml.append("			 			<th scope=\"col\">파일보기</th>");
			sbHtml.append("				 	</tr>");
			sbHtml.append("				</thead>");
			sbHtml.append("			 	<tbody>");
			System.out.println(agree_file_list.size());
			if (agree_file_list.size() > 0) {
				for (int i = 0; i < agree_file_list.size(); i++) {
					file_map = (HashMap) agree_file_list.get(i);
					String str_FILE_NM = cu.evl(String.valueOf(file_map.get("file_nm")), ""); // 파일네임
					sbHtml.append("			 		<tr>");
					sbHtml.append("			 			<td>" + str_FILE_NM + "</td>");
					String str_FILE_PATH = str_FILE_URL + file_map.get("file_path");
					sbHtml.append("            <td>                \n");
//					sbHtml.append("                <input type='button' id='file" + i + "' value='파일선택' />\n");
					String type = "";
					//개발
					if ("DEV".equals(GC.getServerName())) {
					sbHtml.append("<button class=\"fileDownloadBtn\" onclick=\"window.open('https://dgisdev.dopco.co.kr:8443/land/common/downloadfile?"
						    + "filePath=" + file_map.get("file_path") 
						    + "&fileName=" + str_FILE_NM
						    + "&fileJisangNo=" + MW_SEQ 
						    + "&fileSeq=" + file_map.get("agree_file_seq") 
						    + "&fileGubun=minwon', '_blank')\">다운로드 <span class=\"downloadIcon\"></span></button>\n");
					}
					else if ("LIVE".equals(GC.getServerName())) {
					//운영
					sbHtml.append("<button class=\"fileDownloadBtn\" onclick=\"window.open('https://dgis.dopco.co.kr:8443/land/common/downloadfile?"
							 + "filePath=" + file_map.get("file_path") 
							    + "&fileName=" + str_FILE_NM
							    + "&fileJisangNo=" + MW_SEQ 
							    + "&fileSeq=" + file_map.get("agree_file_seq") 
							    + "&fileGubun=minwon', '_blank')\">다운로드 <span class=\"downloadIcon\"></span></button>\n");

					
					}
					else {
						sbHtml.append("<button class=\"fileDownloadBtn\" onclick=\"window.open('http://localhost:8081/land/common/downloadfile?"
								 + "filePath=" + file_map.get("file_path") 
								    + "&fileName=" + str_FILE_NM
								    + "&fileJisangNo=" + MW_SEQ 
								    + "&fileSeq=" + file_map.get("agree_file_seq") 
								    + "&fileGubun=minwon', '_blank')\">다운로드 <span class=\"downloadIcon\"></span></button>\n");
					}

//					if (str_FILE_NM != null && !str_FILE_NM.equals("")) {
//						String pathSplit[] = str_FILE_NM.split("\\.");
//						type = pathSplit[1].toLowerCase();
//					}
//					if (type.equals("jpg") || type.equals("png") || type.equals("gif") || type.equals("bmp")) {
//						sbHtml.append("            <script>               \n");
//						sbHtml.append("                 $(\"#file" + i + "\").click(function(){ window.open(\"" + str_FILE_PATH + "\");  });    \n");
//						sbHtml.append("            </script>               \n");
//					} else {
//						sbHtml.append("            <script>               \n");
//						sbHtml.append("                 $(\"#file" + i + "\").click(function(){ document.getElementById('agree_file_download_form" + i + "').submit();	  });    \n");
//						sbHtml.append("            </script>               \n");
//					}
					

					sbHtml.append("            </td>               \n");
					sbHtml.append("				 	</tr>");
				}
			} else {
				sbHtml.append("			 		<tr><td colspan=\"2\">첨부파일이 없습니다.</td></tr>");
			}
			sbHtml.append("			 	</tbody>");
			sbHtml.append("			 </table>");

			sbHtml.append("			 		</td>	");
			sbHtml.append("			 	</tr>	");
			sbHtml.append("			 </tbody>		");
			sbHtml.append("			 </table>		");
			sbHtml.append("			 <br />		");
			sbHtml.append("			 <!-- *첨부 파일 -->");
			sbHtml.append("			 <h4>첨부 파일</h4>");
			sbHtml.append("			 <table class=\"base5\">");
			sbHtml.append("			 	<colgroup>");
			sbHtml.append("			 		<col style=\'width:80%\' />");
			sbHtml.append("			 		<col style=\'width:20%\' />");
			sbHtml.append("			 	</colgroup>");
			sbHtml.append("			 	<thead>");
			sbHtml.append("			 		<tr>");
			sbHtml.append("			 			<th scope=\"col\">파일명</th>");
			sbHtml.append("			 			<th scope=\"col\">파일보기</th>");
			sbHtml.append("				 	</tr>");
			sbHtml.append("				</thead>");
			sbHtml.append("			 	<tbody>");
			if (file_list.size() > 0) {
				for (int i = 0; i < file_list.size(); i++) {
					HashMap file_map1 = new HashMap();
					file_map1 = (HashMap) file_list.get(i);
					sbHtml.append("			 		<tr>");
					sbHtml.append("			 			<td>" + file_map1.get("file_nm") + "</td>");
					String str_FILE_PATH = str_FILE_URL + file_map1.get("file_path");
					sbHtml.append("            <td>                \n");
//					sbHtml.append("                <input type='button' id='file" + i + "' value='파일선택' />\n");
					String str_FILE_NM = cu.evl(String.valueOf(file_map1.get("file_nm")), ""); // 파일네임
					String type = "";

					if (str_FILE_NM != null && !str_FILE_NM.equals("")) {
						String pathSplit[] = str_FILE_NM.split("\\.");
						type = pathSplit[1].toLowerCase();
					}
					if ("DEV".equals(GC.getServerName())) {
						sbHtml.append("<button class=\"fileDownloadBtn\" onclick=\"window.open('https://dgisdev.dopco.co.kr:8443/land/common/downloadfile?"
							    + "filePath=" +  file_map1.get("file_path")
							    + "&fileName=" + file_map1.get("file_nm")
							    + "&fileJisangNo=" + MW_SEQ 
							    + "&fileSeq=" + file_map1.get("file_seq")
							    + "&fileGubun=minwon', '_blank')\">다운로드 <span class=\"downloadIcon\"></span></button>\n");
						}
						else if ("LIVE".equals(GC.getServerName())) {
						//운영
						sbHtml.append("<button class=\"fileDownloadBtn\" onclick=\"window.open('https://dgis.dopco.co.kr:8443/land/common/downloadfile?"
								+ "filePath=" +  file_map1.get("file_path")
							    + "&fileName=" + file_map1.get("file_nm")
							    + "&fileJisangNo=" + MW_SEQ 
							    + "&fileSeq=" + file_map1.get("file_seq")
							    + "&fileGubun=minwon', '_blank')\">다운로드 <span class=\"downloadIcon\"></span></button>\n");

						
						}
						else {
							sbHtml.append("<button class=\"fileDownloadBtn\" onclick=\"window.open('http://localhost:8081/land/common/downloadfile?"
									+ "filePath=" +  file_map1.get("file_path")
								    + "&fileName=" + file_map1.get("file_nm")
								    + "&fileJisangNo=" + MW_SEQ 
								    + "&fileSeq=" + file_map1.get("file_seq")
								    + "&fileGubun=jisang', '_blank')\">다운로드 <span class=\"downloadIcon\"></span></button>\n");
						}

					sbHtml.append("            </td>               \n");
					sbHtml.append("				 	</tr>");
				}
			} else {
				sbHtml.append("			 		<tr><td colspan=\"2\">첨부파일이 없습니다.</td></tr>");
			}
			sbHtml.append("			 	</tbody>");
			sbHtml.append("			 </table>");
			sbHtml.append("         </div>  \n");
			sbHtml.append("     </div>      \n");
			sbHtml.append(" </body>         \n");
			sbHtml.append("                 \n");
			sbHtml.append(" </html>         \n");

		} catch (Exception e) {
			e.printStackTrace();
		}

		return sbHtml.toString();
	}

	/**
	 * 민원 완료 보고
	 * 
	 * @param MW_SEQ
	 * @param NextSeq
	 * @param request
	 * @param response
	 * @return
	 */
	public String getMinwonCompleteHTML(String MW_SEQ, HttpServletRequest request, HttpServletResponse response) {
		MainService mainService = context.getBean(MainService.class);
		GlobalConfig GC = context.getBean(GlobalConfig.class);
		/** 조회 시작 **/
		ArrayList list = new ArrayList();
		ArrayList pnu_list = new ArrayList();
		ArrayList file_list = new ArrayList();
		ArrayList agree_list = new ArrayList();
		ArrayList tmp_list = new ArrayList();
		HashMap detailMap = new HashMap();
		HashMap pmt_map = new HashMap();
		HashMap file_map = new HashMap();

		CommonUtil cu = new CommonUtil();

		String str_result = "Y";
		StringBuffer sbHtml = new StringBuffer();
		try {
			HashMap params = new HashMap();
			params.put("MW_SEQ", MW_SEQ);

//			detailMap = (HashMap) Database.getInstance().queryForObject("Json.selectMinwonDetail", params);// 기본정보
//			pnu_list = (ArrayList) Database.getInstance().queryForList("Json.selectMinwonDetailToji", params); // 소속토지정보
//			file_list = (ArrayList) Database.getInstance().queryForList("Json.selectMinwonDetailFile", params); // 첨부파일
//			agree_list = (ArrayList) Database.getInstance().queryForList("Json.selectMinwonDetailAgree", params); // 민원협의목록

			tmp_list = (ArrayList) mainService.selectQuery("issueSQL.selectMinwonDetail", params);// 기본정보
			detailMap=(HashMap)tmp_list.get(0);
			pnu_list = (ArrayList) mainService.selectQuery("issueSQL.selectMinwonDetailToji", params); // 소속토지정보
			file_list = (ArrayList) mainService.selectQuery("issueSQL.selectMinwonDetailFile", params); // 첨부파일
			agree_list = (ArrayList) mainService.selectQuery("issueSQL.selectMinwonDetailAgree", params); // 민원협의목록
			log.info("file_list:"+file_list);
			System.out.println("$$$ params=" + params);
			if (pnu_list.size() > 0) {
				for (int i = 0; i < pnu_list.size(); i++) {
					HashMap pnuMap = (HashMap) pnu_list.get(i);
					String SIDO = cu.evl((String) ((HashMap) pnu_list.get(i)).get("sido_nm"), "");
					String SGG = cu.evl((String) ((HashMap) pnu_list.get(i)).get("sgg_nm"), "");
					String EMD = cu.evl((String) ((HashMap) pnu_list.get(i)).get("emd_nm"), "");
					String RI = cu.evl((String) ((HashMap) pnu_list.get(i)).get("ri_nm"), "");
					String JIBUN = cu.evl((String) ((HashMap) pnu_list.get(i)).get("jibun"), "");
					String ADDR = "";

					if (!SIDO.equals(""))
						ADDR += SIDO + " ";
					if (!SGG.equals(""))
						ADDR += SGG + " ";
					if (!EMD.equals(""))
						ADDR += EMD + " ";
					if (!RI.equals(""))
						ADDR += RI + " ";
					if (!JIBUN.equals(""))
						ADDR += JIBUN + " ";

					pnuMap.put("ADDR", ADDR);
				}
			}
			if (file_list.size() > 0) {
				for (int i = 0; i < file_list.size(); i++) {
					file_map.put("FILE_PATH" + i, cu.evl((String) ((HashMap) file_list.get(i)).get("file_path"), ""));
					file_map.put("FILE_NM" + i, cu.evl((String) ((HashMap) file_list.get(i)).get("file_nm"), ""));
					file_map.put("FILE_SEQ" + i, cu.evl(((HashMap) file_list.get(i)).get("file_seq").toString(), ""));

				}
			}

//			System.out.println("file_list=" + file_list);

			String contents = (String) detailMap.get("mw_contents");
			System.out.println("#####" + contents);
			contents = contents.replaceAll("\n", "<br />");
			contents = contents.replaceAll("\r\n", "<br />");
			contents = contents.replaceAll("\\r\\n", "<br />");
			contents = contents.replaceAll("\\\\r\\\\n", "<br />");
			System.out.println("#####" + contents);

			sbHtml.append(" <!DOCTYPE html>\n");
			sbHtml.append(" <html lang=\"ko\" xmlns=\"http://www.w3.org/1999/xhtml\"> \n");
			sbHtml.append(sHeader);
			sbHtml.append(" <body>\n");

			sbHtml.append("<form id='file_download_form' method='post' action='" + plmsDomain + "/dcl/jr/downloadFile' >\n");
			sbHtml.append("            <input type='hidden' name='file_no' /> \n");
			sbHtml.append("            <input type='hidden' name='file_seq' /> \n");
			sbHtml.append("            <input type='hidden' name='file_gubun' value='minwon' /> \n");
			sbHtml.append("</form>\n");

			if (file_list.size() > 0) {
				for (int i = 0; i < file_list.size(); i++) {
					String str_FILE_SEQ = cu.evl(String.valueOf(((HashMap) file_list.get(i)).get("file_seq")), "");
					sbHtml.append("<form id='file_download_form" + i + "' method='post' action='" + plmsDomain + "/dcl/jr/downloadFile' > \n");
					sbHtml.append("            <input type='hidden' name='file_no' value='" + MW_SEQ + "'/>\n");
					sbHtml.append("            <input type='hidden' name='file_seq' value='" + str_FILE_SEQ + "' />\n");
					sbHtml.append("            <input type='hidden' name='file_gubun' value='minwon' />\n");
					sbHtml.append("</form> \n");
				}
			}
			sbHtml.append("     <!-- wrap -->\n");
			sbHtml.append("     <div id=\"wrap\">\n");
			sbHtml.append("         <!-- 컨테이너 -->\n");
			sbHtml.append("         <div id=\"container\">\n");
//			sbHtml.append("			 <div class=\"title\">");
//			sbHtml.append("			 	<h2>지상권 민원완료 보고</h2>");
//			sbHtml.append("			 </div>		");
			sbHtml.append("			 <div class=\"article\">		");
			sbHtml.append("			 <!-- *민원 정보 -->		");
			sbHtml.append("			 <h4>민원 정보</h4>		");
			sbHtml.append("			 <table class=\"base4\">		");
			sbHtml.append("			 <colgroup>		");
			sbHtml.append("			 	<col style=\"width:15%\" />	");
			sbHtml.append("			 	<col style=\"width:35%\" />	");
			sbHtml.append("			 	<col style=\"width:15%\" />	");
			sbHtml.append("			 	<col style=\"width:35%\" />	");
			sbHtml.append("			 </colgroup>");
			sbHtml.append("			 <tbody>");
			sbHtml.append("			 	<tr>");
			sbHtml.append("			 		<th scope=\"row\">민원 명</th>	");
			sbHtml.append("			 		<td class=\"inner_tag\" colspan=\"3\">	");
			sbHtml.append("			 			<span style=\"width:100%; display:inline-block; text-align:center;\">" + detailMap.get("mw_title") + "</span>	");
			sbHtml.append("			 		</td>	");
			sbHtml.append("			 	</tr>	");
			sbHtml.append("			 	<tr>");
			sbHtml.append("			 		<th scope=\"row\">이슈유형</th>");
			sbHtml.append("			 		<td class=\"inner_tag\" colspan=\"3\">");
			sbHtml.append("			 			<span style=\"width:100%; display:inline-block; text-align:center;\">" + detailMap.get("code_str1_tmp") + " &gt; " + detailMap.get("code_str2_tmp") + " &gt; " + detailMap.get("code_str3_tmp") + "</span>	");
			sbHtml.append("			 		</td>	");
			sbHtml.append("			 	</tr>");
			sbHtml.append("			 	<tr>");
			sbHtml.append("			 		<th scope=\"row\">발생일자</th>	");
			sbHtml.append("			 		<td class=\"inner_tag\">	");
			sbHtml.append("			 			<span style=\"width:100%; display:inline-block; text-align:center;\">" + detailMap.get("mw_occur_date") + "</span>	");
			sbHtml.append("			 		</td>");
			sbHtml.append("			 		<th scope=\"row\">발생지사</th>	");
			sbHtml.append("			 		<td class=\"inner_tag\">	");
			sbHtml.append("			 			<span style=\"width:100%; display:inline-block; text-align:center;\">" + detailMap.get("jisa") + "</span>");
			sbHtml.append("			 		</td>");
			sbHtml.append("			 	</tr>	");
			sbHtml.append("			 	<tr>");
			sbHtml.append("			 		<th scope=\"row\">민원 내용</th>	");
			sbHtml.append("			 		<td class=\"inner_tag\" colspan=\"3\">	");
			sbHtml.append("			 			<span style=\"width:100%; display:inline-block; text-align:left;\">" + contents + "</span>");
			sbHtml.append("			 		</td>	");
			sbHtml.append("			 	</tr>	");
			sbHtml.append("			 </tbody>		");
			sbHtml.append("			 </table>		");
			sbHtml.append("			 <br>		");
			sbHtml.append("			 <!-- *민원 토지 -->");
			sbHtml.append("			 <h4>민원 토지</h4>");
			sbHtml.append("			 <table class=\'base4\'>");
			sbHtml.append("			 	<colgroup>");
			sbHtml.append("			 		<col style=\'width:55%\' />");
			sbHtml.append("			 		<col style=\'width:15%\' />");
			sbHtml.append("			 		<col style=\'width:15%\' />");
			sbHtml.append("			 		<col style=\'width:15%\' />");
			sbHtml.append("			 	</colgroup>");
			sbHtml.append("			 	<tbody>");
			sbHtml.append("			 		<tr>");
			sbHtml.append("			 			<th scope=\'row\'>주소</th>");
			sbHtml.append("			 			<th scope=\'row\'>등기여부</th>");
			sbHtml.append("			 			<th scope=\'row\'>계약여부</th>");
			sbHtml.append("			 			<th scope=\'row\'>토지수정일자</th>");
			sbHtml.append("			 		</tr>");
			if (pnu_list.size() > 0) {
				for (int i = 0; i < pnu_list.size(); i++) {
					sbHtml.append("			 		<tr>");
					sbHtml.append("			 			<td class=\'inner_tag\'>");
					sbHtml.append("			 				<span style=\"width:100%; display:inline-block; text-align:center;\">" + ((HashMap<Object, Object>) pnu_list.get(i)).get("addr") + "</span>");
					sbHtml.append("			 			</td>");
					sbHtml.append("			 			<td class=\'inner_tag\'>");
					sbHtml.append("			 				<span style=\"width:100%; display:inline-block; text-align:center;\">" + ((HashMap<Object, Object>) pnu_list.get(i)).get("registed_yn") + "</span>");
					sbHtml.append("			 			</td>");
					sbHtml.append("			 			<td class=\'inner_tag\'>");
					sbHtml.append("			 				<span style=\"width:100%; display:inline-block; text-align:center;\">" + ((HashMap<Object, Object>) pnu_list.get(i)).get("permitted_yn") + "</span>");
					sbHtml.append("			 			</td>");
					sbHtml.append("			 			<td class=\'inner_tag\'>");
					sbHtml.append("			 				<span style=\"width:100%; display:inline-block; text-align:center;\">" + ((HashMap<Object, Object>) pnu_list.get(i)).get("comp_date") + "</span>");
					sbHtml.append("			 			</td>");
					sbHtml.append("			 		</tr>");
				}
			} else {
				sbHtml.append("			 		<tr>");
				sbHtml.append("			 			<td class=\'inner_tag\'>");
				sbHtml.append("			 				<span style=\"width:100%; display:inline-block; text-align:center;\"></span>");
				sbHtml.append("			 			</td>");
				sbHtml.append("			 			<td class=\'inner_tag\'>");
				sbHtml.append("			 				<span style=\"width:100%; display:inline-block; text-align:center;\"></span>");
				sbHtml.append("			 			</td>");
				sbHtml.append("			 			<td class=\'inner_tag\'>");
				sbHtml.append("			 				<span style=\"width:100%; display:inline-block; text-align:center;\"></span>");
				sbHtml.append("			 			</td>");
				sbHtml.append("			 			<td class=\'inner_tag\'>");
				sbHtml.append("			 				<span style=\"width:100%; display:inline-block; text-align:center;\"></span>");
				sbHtml.append("			 			</td>");
				sbHtml.append("			 		</tr>");
			}
			sbHtml.append("			 	</tbody>");
			sbHtml.append("			 </table>");
			sbHtml.append("			 <br />		");
			sbHtml.append("			 <!-- *민원 협의 -->");
			sbHtml.append("			 <h4>민원 협의</h4>");
			sbHtml.append("			 <table class=\'base4\'>");
			sbHtml.append("			 	<colgroup>");
			sbHtml.append("			 		<col style=\'width:10%\' />");
			sbHtml.append("			 		<col style=\'width:10%\' />");
			sbHtml.append("			 		<col style=\'width:30%\' />");
			sbHtml.append("			 		<col style=\'width:50%\' />");
			sbHtml.append("			 	</colgroup>");
			sbHtml.append("			 	<tbody>");
			sbHtml.append("			 		<tr>");
			sbHtml.append("			 			<th scope=\'row\'>협의일자</th>");
			sbHtml.append("			 			<th scope=\'row\'>진행 현황</th>");
			sbHtml.append("			 			<th scope=\'row\'>협의 제목</th>");
			sbHtml.append("			 			<th scope=\'row\'>협의 내용</th>");
			sbHtml.append("			 		</tr>");
			if (agree_list.size() > 0) {
				for (int i = 0; i < agree_list.size(); i++) {
					sbHtml.append("			 		<tr>");
					sbHtml.append("			 			<td class=\'inner_tag\'>");
					sbHtml.append("			 				<span style=\"width:100%; display:inline-block; text-align:center;\">" + ((HashMap<Object, Object>) agree_list.get(i)).get("agree_date") + "</span>");
					sbHtml.append("			 			</td>");
					sbHtml.append("			 			<td class=\'inner_tag\'>");
					sbHtml.append("			 				<span style=\"width:100%; display:inline-block; text-align:center;\">" + ((HashMap<Object, Object>) agree_list.get(i)).get("status_str") + "</span>");
					sbHtml.append("			 			</td>");
					sbHtml.append("			 			<td class=\'inner_tag\'>");
					sbHtml.append("			 				<span style=\"width:100%; display:inline-block; text-align:center;\">" + ((HashMap<Object, Object>) agree_list.get(i)).get("agree_title") + "</span>");
					sbHtml.append("			 			</td>");
					sbHtml.append("			 			<td class=\'inner_tag\'>");
					sbHtml.append("			 				<span style=\"width:100%; display:inline-block; text-align:center;\">" + ((HashMap<Object, Object>) agree_list.get(i)).get("agree_contents") + "</span>");
					sbHtml.append("			 			</td>");
					sbHtml.append("			 		</tr>");
				}
			} else {
				sbHtml.append("			 		<tr>");
				sbHtml.append("			 			<td class=\'inner_tag\'>");
				sbHtml.append("			 				<span style=\"width:100%; display:inline-block; text-align:center;\"></span>");
				sbHtml.append("			 			</td>");
				sbHtml.append("			 			<td class=\'inner_tag\'>");
				sbHtml.append("			 				<span style=\"width:100%; display:inline-block; text-align:center;\"></span>");
				sbHtml.append("			 			</td>");
				sbHtml.append("			 			<td class=\'inner_tag\'>");
				sbHtml.append("			 				<span style=\"width:100%; display:inline-block; text-align:center;\"></span>");
				sbHtml.append("			 			</td>");
				sbHtml.append("			 			<td class=\'inner_tag\'>");
				sbHtml.append("			 				<span style=\"width:100%; display:inline-block; text-align:center;\"></span>");
				sbHtml.append("			 			</td>");
				sbHtml.append("			 		</tr>");
			}
			sbHtml.append("			 	</tbody>");
			sbHtml.append("			 </table>");
			sbHtml.append("			 <br />		");
			sbHtml.append("			 <!-- *첨부 파일 -->");
			sbHtml.append("			 <h4>첨부 파일</h4>");
			sbHtml.append("			 <table class=\"base5\">");
			sbHtml.append("			 	<colgroup>");
			sbHtml.append("			 		<col style=\'width:80%\' />");
			sbHtml.append("			 		<col style=\'width:20%\' />");
			sbHtml.append("			 	</colgroup>");
			sbHtml.append("			 	<thead>");
			sbHtml.append("			 		<tr>");
			sbHtml.append("			 			<th scope=\"col\">파일명</th>");
			sbHtml.append("			 			<th scope=\"col\">파일보기111</th>");
			sbHtml.append("				 	</tr>");
			sbHtml.append("				</thead>");
			sbHtml.append("			 	<tbody>");
			if (file_list.size() > 0) {
				for (int i = 0; i < file_list.size(); i++) {
					sbHtml.append("			 		<tr>");
					sbHtml.append("			 			<td>" + file_map.get("FILE_NM" + i) + "</td>");
					String str_FILE_PATH = str_FILE_URL + file_map.get("FILE_PATH" + i);
					sbHtml.append("            <td>                \n");
					if ("DEV".equals(GC.getServerName())) {
						sbHtml.append("<button class=\"fileDownloadBtn\" onclick=\"window.open('https://dgisdev.dopco.co.kr:8443/land/common/downloadfile?"
							    + "filePath=" +file_map.get("FILE_PATH" + i)
							    + "&fileName=" +file_map.get("FILE_NM" + i)
							    + "&fileJisangNo=" + MW_SEQ 
							    + "&fileSeq=" + file_map.get("FILE_SEQ"+i) 
							    + "&fileGubun=minwon', '_blank')\">다운로드 <span class=\"downloadIcon\"></span></button>\n");
						}
						else if ("LIVE".equals(GC.getServerName())) {
						//운영
						sbHtml.append("<button class=\"fileDownloadBtn\" onclick=\"window.open('https://dgis.dopco.co.kr:8443/land/common/downloadfile?"
								 + "filePath=" +file_map.get("FILE_PATH" + i)
								    + "&fileName=" +file_map.get("FILE_NM" + i)
								    + "&fileJisangNo=" + MW_SEQ 
								    + "&fileSeq=" + file_map.get("FILE_SEQ"+i) 
								    + "&fileGubun=minwon', '_blank')\">다운로드 <span class=\"downloadIcon\"></span></button>\n");
						
						}
						else {
							sbHtml.append("<button class=\"fileDownloadBtn\" onclick=\"window.open('http://localhost:8081/land/common/downloadfile?"
									 + "filePath=" +file_map.get("FILE_PATH" + i)
									    + "&fileName=" +file_map.get("FILE_NM" + i)
									    + "&fileJisangNo=" + MW_SEQ 
									    + "&fileSeq=" + file_map.get("FILE_SEQ"+i) 
									    + "&fileGubun=minwon', '_blank')\">다운로드 <span class=\"downloadIcon\"></span></button>\n");
						}

					
//					String str_FILE_NM = cu.evl(String.valueOf(file_map.get("file_nm" + i)), ""); // 파일네임
//					String type = "";
//
//					if (str_FILE_NM != null && !str_FILE_NM.equals("")) {
//						String pathSplit[] = str_FILE_NM.split("\\.");
//						type = pathSplit[1].toLowerCase();
//					}
//					if (type.equals("jpg") || type.equals("png") || type.equals("gif") || type.equals("bmp")) {
//						sbHtml.append("            <script>               \n");
//						sbHtml.append("                 $(\"#file" + i + "\").click(function(){ window.open(\"" + str_FILE_PATH + "\");  });    \n");
//						sbHtml.append("            </script>               \n");
//					} else {
//						sbHtml.append("            <script>               \n");
//						sbHtml.append("                 $(\"#file" + i + "\").click(function(){ document.getElementById('file_download_form" + i + "').submit();	  });    \n");
//						sbHtml.append("            </script>               \n");
//					}

					sbHtml.append("            </td>               \n");
					sbHtml.append("				 	</tr>");
				}
			} else {
				sbHtml.append("			 		<tr><td colspan=\"2\">첨부파일이 없습니다.</td></tr>");
			}
			sbHtml.append("			 	</tbody>");
			sbHtml.append("			 </table>");
			sbHtml.append("			 <br />		");
			sbHtml.append("         </div>  \n");
			sbHtml.append("     </div>      \n");
			sbHtml.append(" </body>         \n");
			sbHtml.append("                 \n");
			sbHtml.append(" </html>         \n");

		} catch (Exception e) {
			e.printStackTrace();
		}
//		System.out.println(sbHtml.toString());
		return sbHtml.toString();
	}

	
				

}
