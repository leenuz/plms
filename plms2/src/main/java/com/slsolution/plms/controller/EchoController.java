package com.slsolution.plms.controller;

import java.io.BufferedReader;
import java.io.ByteArrayInputStream;
import java.io.InputStreamReader;
import java.io.OutputStream;
import java.net.HttpURLConnection;
import java.net.URL;

import javax.xml.parsers.DocumentBuilderFactory;
import javax.xml.xpath.XPath;
import javax.xml.xpath.XPathFactory;

import org.springframework.scheduling.annotation.EnableAsync;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import org.w3c.dom.Document;

import com.slsolution.plms.ApprovalUtil;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@EnableAsync
@RequiredArgsConstructor
@RestController
@RequestMapping("/land/dcl")
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class EchoController {
	  /**
		 * Echo+ 에서 plms로 결재상태 여부전송
		 **/
	    @RequestMapping(value = "/GetPLMSCompforXML", method = { RequestMethod.GET, RequestMethod.POST })
		public void GetPLMSCompforXML(HttpServletRequest request, HttpServletResponse response) throws Exception {
			System.out.println("start mainController GetPLMSCompforXML");

//			ElectronicPaymentUtil epc = new ElectronicPaymentUtil();
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

//			System.out.println("############## start main EchoToPlmsTest");
			
			// 1. PLMS 인터페이스 용 웹서비스 URL
			String url = "http://localhost:8081/land/dcl/GetPLMSCompforXML";
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
