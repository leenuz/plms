package com.slsolution.plms;

import java.io.BufferedReader;
import java.io.ByteArrayInputStream;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.OutputStream;
import java.io.UnsupportedEncodingException;
import java.net.HttpURLConnection;
import java.net.MalformedURLException;
import java.net.URL;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.HashMap;
import java.util.Locale;


import javax.xml.parsers.DocumentBuilderFactory;
import javax.xml.xpath.XPath;
import javax.xml.xpath.XPathFactory;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationContext;
import org.springframework.context.ApplicationContextAware;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;
import org.w3c.dom.Document;

import jakarta.servlet.ServletException;
import jakarta.servlet.ServletInputStream;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;



@Component
public class ApprovalUtil implements ApplicationContextAware {
	
	
	
	CommonUtil CU=new CommonUtil();
	 private static ApplicationContext context;

	    // ApplicationContext 주입
	 	
	    public void setApplicationContext(ApplicationContext applicationContext) {
	        context = applicationContext;
	    }
	
//	@Autowired
//	private MainService mainService;
//	
	@Transactional
	public boolean GetPLMSDataforXML(String DOCKEY,String HTML,String USERCD,String SDATE,String STIME
			,String GUBUN,String USERNAME,String USERDEPTCD,String USERDEPTNM,String USERUPDEPTCD) throws MalformedURLException, IOException
	{
		
		
		MainService mainService = context.getBean(MainService.class);
		System.out.println("@@@ XML SERVLET START");
		System.out.println("@@@ XML DOCKEY:"+DOCKEY);
		System.out.println("@@@ XML HTML:"+HTML);
		System.out.println("@@@ XML USERCD:"+USERCD);
		System.out.println("@@@ XML SDATE:"+SDATE);
		System.out.println("@@@ XML STIME:"+STIME);
		
		
		if ("".equals(CU.evl(SDATE,""))|| "".equals(CU.evl(STIME,""))) {
			SimpleDateFormat formmatter= new SimpleDateFormat("yyyyMMdd",Locale.KOREA);
			SimpleDateFormat formmatter2= new SimpleDateFormat("HHmmss",Locale.KOREA);
			Date curruentTime=new Date();
			
			String dTime=formmatter.format(curruentTime);
			String dTime2=formmatter2.format(curruentTime);
			
			SDATE=dTime;
			STIME=dTime2;
			
		}
		
		if ("".equals(CU.evl(DOCKEY, ""))|| "".equals(CU.evl(USERCD, ""))) {
			return false;
		}
//		
		//String url="http://localhost:8081/land/api/dopcoApprovalTest"; //로컬 테스트

		//String url="http://echo.dopco.co.kr/SmartTalk/CustomExt/Service/PLMSWebService.asmx"; //운영

		String url="http://devmos.dopcodev.com/SmartTalk/CustomExt/Service/PLMSWebService.asmx"; //새 개발기 테스트
		
		String xmlString="";
		xmlString=GetApprXmlget(DOCKEY,HTML,USERCD,SDATE,STIME,GUBUN);
		
		
		System.out.println("@@@@@@ Send url : "+url);
		System.out.println("@@@@@@ xmlString : "+xmlString);
		
		//전송
		HttpURLConnection urlConnection=null;
		urlConnection=(HttpURLConnection) new URL(url).openConnection();
		urlConnection.setConnectTimeout(10000);
		urlConnection.setDoInput(true);
		urlConnection.setDoOutput(true);
		urlConnection.setRequestMethod("POST");
		urlConnection.setRequestProperty("Content-Length",Integer.toString(xmlString.length()));
		urlConnection.setRequestProperty("Content-Type","text/xml; charset=UTF-8");
		
		
		OutputStream os=null;
		os=urlConnection.getOutputStream();
		os.write(xmlString.getBytes("utf-8"));
		os.flush();
		os.close();
		
		
		
		
		System.out.println("@@@@@ urlConnection.resCode:"+urlConnection.getResponseCode());
		System.out.println("@@@@@ urlConnection.resMessage:"+urlConnection.getResponseMessage());
		
		String out_flag=null;
		String out_url=null;
		
		if(urlConnection.getResponseCode()==200) {
			String rtnXmlStr="";
			InputStreamReader in = new InputStreamReader(urlConnection.getInputStream(),"utf-8");
			BufferedReader br= new BufferedReader(in);
			String strLine;
			while((strLine=br.readLine())!=null) {
				rtnXmlStr=rtnXmlStr.concat(strLine);
			}
			
			System.out.println("@@@ RtnXml:"+rtnXmlStr);
			Document rtnXmlDoc=null;
			
			try {
					rtnXmlDoc=DocumentBuilderFactory.newInstance().newDocumentBuilder().parse(new ByteArrayInputStream(rtnXmlStr.getBytes()));
					XPath xpath=XPathFactory.newInstance().newXPath();
					
					String p_flag="//*/out_flag";
					String p_url="//*/out_url";
					out_flag=xpath.compile(p_flag).evaluate(rtnXmlDoc);
					out_url=xpath.compile(p_url).evaluate(rtnXmlDoc);
				
			}catch(Exception e) {
				e.printStackTrace();
			}
			
		}else {
			System.out.println("@@@@@ http response code error:"+urlConnection.getResponseCode()+"\n");
			System.out.println("@@@@@ http response message error:"+urlConnection.getResponseMessage()+"\n");
		}
		
		if (out_url==null || out_url.equals("") || out_url.equals("URL Failed")) {
			
			System.out.println("파싱 테이터가 없습니다.");
			System.out.println("@@@@@@@@@@@@@@@@@@@@@XML SERVLET END~~~!!! ############");
			return false;
		}
		else {
			System.out.println("@@@@@ out_flag:"+out_flag);
			System.out.println("@@@@@ out_url:"+out_url);
			HashMap hms = new HashMap();
			
			hms.put("dockey", DOCKEY);
			hms.put("outflag", out_flag);
			hms.put("outurl", out_url);
			hms.put("usernm",USERNAME);
			hms.put("deptcd", USERUPDEPTCD);
			hms.put("deptnm", USERDEPTNM);
			hms.put("updeptcd", USERUPDEPTCD);
			
			int nCount;
			try {
				
				nCount = (Integer) mainService.selectCountQuery("commonSQL.selectGetPLMSCompforeXML", hms);
				if (nCount>0) {
					mainService.UpdateQuery("commonSQL.updateEchoOut", hms);
				}
				else {
					mainService.UpdateQuery("commonSQL.insertEchoOut", hms);
				}
			} catch (Exception e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
			
			
			
			
		}
		
		
		
		
		System.out.println("@@@@@@@@@@@@@@@@@@@@@XML SERVLET END~~~!!! ############");
		
		
		return true; 
	}
	
	
	
	private String GetApprXmlget(String dOCKEY,String hTML,String uSERCD,String sDATE,String sTIME,String gUbun) {
		StringBuffer sb=new StringBuffer();
		String str_XMLgubun="";
		
		
	      sb.append("<?xml version=\"1.0\" encoding=\"utf-8\"?>                                    \n");
	      sb.append("<soap:Envelope xmlns:xsi=\"http://www.w3.org/2001/XMLSchema-instance\" xmlns:xsd=\"http://www.w3.org/2001/XMLSchema\" xmlns:soap=\"http://schemas.xmlsoap.org/soap/envelope/\"> \n");
	      sb.append("  <soap:Body>                                                                     \n");
	      sb.append("    <"+gUbun+" xmlns=\"http://tempuri.org/\">                  \n");
	      sb.append("      <sap_datas>                                                                  \n");
	      sb.append("        <GUBUN>PLMS</GUBUN>                           \n");
	      sb.append("        <LANG></LANG>                              \n");
	      sb.append("        <SDATE>" + sDATE + "</SDATE>                           \n");
	      sb.append("        <STIME>" + sTIME + "</STIME>                                     \n");
	      sb.append("        <USERCD>" + uSERCD + "</USERCD>                            \n");
	      sb.append("        <SERARCHKEY1></SERARCHKEY1>     \n");
	      sb.append("        <DOCKEY>" + dOCKEY + "</DOCKEY>                           \n");
	      sb.append("        <TITLE></TITLE>                                       \n");
	      sb.append("        <arrDatas>                                                                                 \n");
	      sb.append("          <DATAS>                                                                               \n");
	      sb.append("            <datas_Header>                                                                  \n");
	      sb.append("               <BANFN>0000000000</BANFN>                   \n");   
	      sb.append("            </datas_Header>                                                               \n");
	      sb.append("            <arrDatas_HTML>                                                                \n");
	      sb.append("               <TEXT><![CDATA[" + hTML + "]]></TEXT>                         \n");
	      sb.append("            </arrDatas_HTML>                                                             \n");
	      /*
	      sb.append("            <datas_Header xsi:nil=\"true\" />                  \n");   
	      sb.append("            <arrDatas_HTML xsi:nil=\"true\" >                  \n");   
	      sb.append("               <TEXT><![CDATA[" + hTML + "]]></TEXT>                         \n");
	      sb.append("            </arrDatas_HTML>                                                             \n");
	      */
	      sb.append("          </DATAS>                                                                              \n");
	      sb.append("        </arrDatas>                                                                                \n");
	      sb.append("      </sap_datas>                                                                              \n");
	      sb.append("    </"+gUbun+">                                                         \n");
	      sb.append("  </soap:Body>                                                                                  \n");
	      sb.append("</soap:Envelope>                                                                                \n");
		
		
		System.out.println("@@@@@ GetPLMSDataforXMLTEST."+gUbun+" END");
		
		System.out.println(sb.toString());
		
		
		return sb.toString();
	}
	
	
	/**
	 * 결재 신청, 완료 시 처리 하는 서비스
	 * 
	 * @param request, response
	 * @throws IOException
	 */
	@Transactional
	public void GetPLMSCompforXML(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		System.out.println("@@@@@ GetPLMSDataforXML START");
		MainService mainService = context.getBean(MainService.class);
		// XML 수신
		BufferedReader br = null;
		ServletInputStream is = request.getInputStream();
		br = new BufferedReader(new InputStreamReader(is));
		String strLine;

		String rtnXmlStr = "";
		while ((strLine = br.readLine()) != null) {
			System.out.println(strLine);
			rtnXmlStr = rtnXmlStr.concat(strLine);
		}

		 System.out.println("@@@@@ rtnXmlStr : " + rtnXmlStr);

		Document rtnXmlDoc = null;

		String xml_GUBUN = "";
		String xml_LANG = "";
		String xml_SDATE = "";
		String xml_STIME = "";
		String xml_USERCD = "";
		String xml_SEARCHKEY1 = "";
		String xml_DOCKEY = "";
		String xml_WDID = "";
		String xml_URL = "";
		String xml_STATUS = "";
		String xml_DISPOSE = "";

		String str_return = "Y";
		String str_meg = "정상처리완료";
		try {
			rtnXmlDoc = DocumentBuilderFactory.newInstance().newDocumentBuilder().parse(new ByteArrayInputStream(rtnXmlStr.getBytes()));

			// xpath 생성
			XPath xpath = XPathFactory.newInstance().newXPath();

			xml_GUBUN = xpath.compile("//*/GUBUN").evaluate(rtnXmlDoc);
			xml_LANG = xpath.compile("//*/LANG").evaluate(rtnXmlDoc);
			xml_SDATE = xpath.compile("//*/SDATE").evaluate(rtnXmlDoc);
			xml_STIME = xpath.compile("//*/STIME").evaluate(rtnXmlDoc);
			xml_USERCD = xpath.compile("//*/USERCD").evaluate(rtnXmlDoc);
			xml_SEARCHKEY1 = xpath.compile("//*/SEARCHKEY1").evaluate(rtnXmlDoc);
			xml_DOCKEY = xpath.compile("//*/DOCKEY").evaluate(rtnXmlDoc);
			xml_WDID = xpath.compile("//*/WDID").evaluate(rtnXmlDoc);
			xml_URL = xpath.compile("//*/URL").evaluate(rtnXmlDoc);
			xml_STATUS = xpath.compile("//*/STATUS").evaluate(rtnXmlDoc);
			xml_DISPOSE = xpath.compile("//*/DISPOSE").evaluate(rtnXmlDoc);

			System.out.println("@@@@@ xml_DOCKEY : " + xml_DOCKEY);
			System.out.println("@@@@@ xml_STATUS : " + xml_STATUS);

		} catch (Exception e) {
			str_meg = "데이터 처리중 에러가 발생하였습니다.";
			str_return = "N";
			e.printStackTrace();
		}

		if ("".equals(CU.evl(xml_DOCKEY, ""))) {
			str_meg = "[DOCKEY]값이 없습니다.";
			str_return = "N";
		}
		if ("".equals(CU.evl(xml_STATUS, ""))) {
			str_meg = "[STATUS]값이 없습니다.";
			str_return = "N";
		}

		// DB값 저장
		if ("Y".equals(str_return)) {
			try {
				HashMap hms = new HashMap();
				hms.put("GUBUN", CU.evl(xml_GUBUN, ""));
				hms.put("LANG", CU.evl(xml_LANG, ""));
				hms.put("SDATE", CU.evl(xml_SDATE, ""));
				hms.put("STIME", CU.evl(xml_STIME, ""));
				hms.put("USERCD", CU.evl(xml_USERCD, ""));
				hms.put("SEARCHKEY1", CU.evl(xml_SEARCHKEY1, ""));
				hms.put("DOCKEY", CU.evl(xml_DOCKEY, ""));
				hms.put("WDID", CU.evl(xml_WDID, ""));
				hms.put("URL", CU.evl(xml_URL, ""));
				hms.put("STATUS", CU.evl(xml_STATUS, ""));
				hms.put("DISPOSE", CU.evl(xml_DISPOSE, ""));
				System.out.println("hms=" + hms);

				int nCount = (Integer) mainService.selectCountQuery("commonSQL.selectGetPLMSCompforXML", hms);
//
				if (nCount > 0) {
					mainService.UpdateQuery("commonSQL.updateGetPLMSCompforXML", hms);
				} else {
					mainService.InsertQuery("commonSQL.insertGetPLMSCompforXML", hms);
				}

			} catch (Exception e) {
				str_meg = "상태값을 저장하던 중 에러가 발생하였습니다.";
				str_return = "N";
				e.printStackTrace();
			}
		}

		// 결과값 리턴
		String rtnXml = getReturnXmlData(str_meg, str_return);

		// System.out.println("!!!!!!!!!!!!!!!!!! GetPLMSCompforXML return rtnXml= ["+rtnXml+"]");

		response.setContentLength(rtnXml.length());
		response.setContentType("text/xml; charset=UTF-8");

		// 전송
		OutputStream os = null;
		os = response.getOutputStream();
		os.write(rtnXml.getBytes("utf-8"));
		os.flush();
		os.close();

		System.out.println("@@@@@ ApprRtnServlet END ###");
	}
	
	
	/**
	 * 반환받은 xmlData를 이용하여 xml 생성
	 * 
	 * @param xmlData
	 * @return xmlString
	 * @throws UnsupportedEncodingException
	 */
	private String getReturnXmlData(String msg, String yn) throws UnsupportedEncodingException {
		System.out.println("@@@@@ getReturnXmlData START");

		String str_msg = msg; // URLEncoder.encode(msg, "utf-8");

		StringBuffer sb = new StringBuffer();
		sb.append("<?xml version='1.0' encoding='utf-8'?>");
		sb.append("<RETURN><FLAG>" + yn + "</FLAG>\n");
		sb.append("<MSG>" + msg + "</MSG></RETURN>                                         \n");

		return sb.toString();
	}

}
