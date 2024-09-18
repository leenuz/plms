package com.slsolution.plms;

import java.io.BufferedReader;
import java.io.ByteArrayInputStream;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.OutputStream;
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
import org.springframework.transaction.annotation.Transactional;
import org.w3c.dom.Document;




public class ApprovalUtil  {
	CommonUtil CU=new CommonUtil();
	
	@Autowired
	private MainService mainService;
	
	@Transactional
	public boolean GetPLMSDataforXML(String DOCKEY,String HTML,String USERCD,String SDATE,String STIME
			,String GUBUN,String USERNAME,String USERDEPTCD,String USERDEPTNM,String USERUPDEPTCD) throws MalformedURLException, IOException
	{
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
//		String url="https://apv.dopco.co.kr/Service/PLMSWebService.asmx";
//		String url="http://echo.depco.co.kr/SmartTalk/CustomExt/Service/PLMSWebService.asmx?,op="+GUBUN; //개발
		String url="http://localhost:8080/api/dopcoApprovalTest"; //로컬 테스트
//		String url="http://echo.depco.co.kr/SmartTalk/CustomExt/Service/PLMSWebService.asmx"; //운영
		
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
			
			hms.put("DOCKEY", DOCKEY);
			hms.put("OUTFLAG", out_flag);
			hms.put("OUTURL", out_url);
			hms.put("USERNM",USERNAME);
			hms.put("DEPTCD", USERUPDEPTCD);
			hms.put("DEPTNM", USERDEPTNM);
			hms.put("UPDEPTCD", USERUPDEPTCD);
			
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
		
		
		sb.append("<?xml version=\"1.0\" encoding=\"utf-8\"?>                                        \n");
		sb.append("<soap:Envelope xmlns:xsi=\"http://www.w3.org/2001/XMLSchema-instance\" xmlns:xsd=\"http://www.w3.org/2001/XMLSchema\" xmlns:soap=\"http://schemas.xmlsoap.org/soap/envelope/\"> \n");
		sb.append(" <soap:Body>                                                                              \n");
		sb.append("   <"+gUbun+ "xmlns=\"http://tempuri.org/\">                                  \n");
		sb.append("     <sap_datas>                                                                \n");
		sb.append("       <GUBUN>PLMS</GUBUN>                                                \n");
		sb.append("       <LANG></LANG>                                                        \n");
		sb.append("       <SDATE>"+sDATE+"</SDATE>                                             \n");
		sb.append("       <STIME>"+sTIME+"</STIME>                                             \n");
		sb.append("       <USERCD>"+uSERCD+"</USERCD>                                          \n");
		sb.append("       <SERARCHKEY1></SERARCHKEY1>    \n");
		sb.append("        <DOCKEY>"+dOCKEY+"</DOCKEY>             \n");
		sb.append("        <TITLE></TITLE>                          \n");
		sb.append("       <arrDatas>                                        \n");
		sb.append("         <DATAS>                                                        \n");
		sb.append("          <datas_Header>                                     \n");
		sb.append("            <BANFN>0000000000</BANFN>                             \n");
		sb.append("          </datas_Header>                                          \n");
		sb.append("          <arrDatas_HTML>                                      \n");
		sb.append("            <TEXT><![CDATA["+hTML+"]]></TEXT>                     \n");
		sb.append("          </arrDatas_HTML>                     \n");
		sb.append("        </DATAS>      											\n");
		sb.append("       <arrDatas>												\n");
		sb.append("    </sap_datas>                                          \n");
		sb.append("  </"+gUbun+">                                          \n");
		sb.append("</soap:Envelop>                                                                      \n");
		
		
		System.out.println("@@@@@ GetPLMSDataforXMLTEST."+gUbun+" END");
		
		System.out.println(sb.toString());
		
		
		return sb.toString();
	}
				

}
