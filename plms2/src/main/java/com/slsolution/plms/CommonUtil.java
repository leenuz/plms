package com.slsolution.plms;



import java.io.BufferedReader;
import java.io.File;
import java.io.IOException;
import java.sql.SQLException;
import java.text.DecimalFormat;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Enumeration;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.Properties;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationContext;
import org.springframework.context.ApplicationContextAware;
import org.springframework.stereotype.Component;

import com.fasterxml.jackson.core.JsonParseException;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.slsolution.plms.json.JSONArray;
import com.slsolution.plms.json.JSONException;
import com.slsolution.plms.json.JSONObject;

import jakarta.servlet.http.HttpServletRequest;
import lombok.extern.slf4j.Slf4j;

@Component
@Slf4j
public class CommonUtil implements ApplicationContextAware{

	
	 private static ApplicationContext context;

	    // ApplicationContext 주입
	 @Override
	    public void setApplicationContext(ApplicationContext applicationContext) {
	        context = applicationContext;
	    }
	
	
	// request 파라메터를 Properties 객체로 변환
    public static Properties convertToProperties(HttpServletRequest request) {

        Enumeration<String> paramEnum = request.getParameterNames();

        Properties properties = new Properties();

        if (paramEnum.hasMoreElements()) {
            do {
                String paramName = (String) paramEnum.nextElement();
                if (request.getParameter(paramName) != null && !"".equals(request.getParameter(paramName).trim())) {
                    properties.put(paramName, request.getParameter(paramName));
                }
            } while (paramEnum.hasMoreElements());
        }

        return properties;
    }
    
    public static HashMap<String, Object> JsonArraytoMap(JSONObject object) throws JSONException {
        
	     HashMap<String, Object> map = new HashMap<String, Object>();             
	     Iterator<String> keysItr = object.keys();                            
	                                                                       
	     while(keysItr.hasNext()) {                                           
	         String key = keysItr.next();
	         log.info("key:"+key);
	         Object value = object.get(key);                                  
	         if(value instanceof JSONArray) {                                 
	             value = toList((JSONArray) value);                           
	         }                                                                
	         else if(value instanceof JSONObject) {                           
	             value = JsonArraytoMap((JSONObject) value);                           
	         }        
	         System.out.println("key:"+key+",value:"+value);
	         map.put(key, value);                                             
	     }                                                                    
	                                                                          
	     return map;                                                          
	                                                                          
	 }       
	
	public static List<Object> toList(JSONArray array) throws JSONException {       
	     List<Object> list = new ArrayList<Object>();                         
	     for(int i = 0; i < array.length(); i++) {                            
	         Object value = array.get(i);                                     
	         if(value instanceof JSONArray) {                                 
	             value = toList((JSONArray) value);                           
	         }                                                                
	         else if(value instanceof JSONObject) {                           
	             value = JsonArraytoMap((JSONObject) value);                           
	         }                                                                
	         list.add(value);                                                 
	     }                                                                    
	                                                                          
	     return list;                                                         
	                                                                          
	 }
	
	public static Map<String, Object> getMapFromJsonObject(JSONObject jsonObj){
	    Map<String, Object> map = null;
	    
	    try {
	       map = new ObjectMapper().readValue(jsonObj.toString(), Map.class);
	    } catch (JsonParseException e) {
	        // TODO Auto-generated catch block
	        e.printStackTrace();
	    } catch (JsonMappingException e) {
	        // TODO Auto-generated catch block
	        e.printStackTrace();
	    } catch (IOException e) {
	        // TODO Auto-generated catch block
	        e.printStackTrace();
	    }
	    return map;
	}

	
	 public static void moveFile(String fileName, String beforeFilePath, String afterFilePath) {
	        //String path = afterFilePath+"/"+folderName;
	        String newfilePath = afterFilePath+"/"+fileName;
	        String orgFilePath=beforeFilePath+"/"+fileName;
	        File dir = new File(afterFilePath);

	        if (!dir.exists()) { //폴더 없으면 폴더 생성
	            dir.mkdirs();
	        }
	        
	        try{
	            File file =new File(orgFilePath);

	            // 옮기 고자 하는 경로로 파일 이동
	            file.renameTo(new File(newfilePath));            
	        }catch(Exception e){
	            e.printStackTrace();
	        }
	    }
	
	 
	 
	 public static void delFile(String fileName, String beforeFilePath) {
	        //String path = afterFilePath+"/"+folderName;
	       
	        String orgFilePath=beforeFilePath+"/"+fileName;
	        
	        try{
	            File file =new File(orgFilePath);

	            // 옮기 고자 하는 경로로 파일 이동
	            //file.renameTo(new File(newfilePath));
	            file.delete();
	        }catch(Exception e){
	            e.printStackTrace();
	        }
	    }
	 
	 public static String evl(String val,String defaultVal) {
		 if (null==val || "null".equals(val) || "".equals(val) || " ".equals(val)) {
			 return defaultVal;
			 
		 }
		 return val;
	 }

		public static String nvl(String val) {

			if (null == val || "null".equals(val) || "NULL".equals(val) || "".equals(val) || " ".equals(val)) {
				return "";
			}

			return val;
		}
	 
	 public static String numberWithCommas(Object x) {
			return numberWithCommas(x.toString());
		}

		public static String numberWithCommas(String x) {
			if(x == null || "null".equals(x) || x.length() == 0){
				return "0";
			}
			
			if(!isNumeric(x)){
				return x;
			}
			
			DecimalFormat formatter = new DecimalFormat("###,###.###");
					
			return formatter.format(Double.parseDouble(x));
		}
		public static boolean isNumeric(String str){
			if(str == null || str.length() == 0){
				return false;
			}

	        for (char c : str.toCharArray()) {
	            if (!Character.isDigit(c)) {
	                return false;
	            }
	        }

	        return true;
		}
		
		
		
		/**
		 * 전자결재 요청 문서번호생성
		 * @throws Exception 
		 **/
		public static  String getNextAppovalSeq() throws Exception {

			String str_AppovSEQ = "";
			try {
				MainService mainService = context.getBean(MainService.class);
				int nCount = (Integer) mainService.selectCountQuery("commonSQL.selectNextAppovalNo", null);

				if (nCount > 0) {
					str_AppovSEQ = String.valueOf(nCount);
				}
			} catch (SQLException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}

			if (!"".equals(str_AppovSEQ)) {
				String str_AppAdd = "";
				int n_appNo = str_AppovSEQ.length();

				// 숫자 다섯자리
				for (int i = n_appNo; i < 5; i++) {
					str_AppAdd += "0";
				}
				str_AppovSEQ = "plms" + str_AppAdd + str_AppovSEQ;
				System.out.println("str_ApproVal=" + str_AppovSEQ);

			}

			return str_AppovSEQ;
		}

	/**
	 * POST로 전달된 Object형식의 param Map으로 전환
	 * 이거 사용후 JSONObject로 변환가능
	 * @param targetString
	 * @return
	 */
	public static Map<String, String> convertQueryStringToJson(String targetString) {
		Map<String, String> jsonMap = new HashMap<>();
		
		//&로 분리
		String[] pairs = targetString.split("&");
		
		for(String pair : pairs) {
			// '='로 키와 값 분리
			String[] keyValue = pair.split("=", 2);	//최대 2개로 나누기
			
			//키와 값을 맵에 추가
			if(keyValue.length == 2) {
				String key = keyValue[0];
				String value = keyValue[1];
				
				//value값이 '}'로 끝나면 그걸 제거
				if(value.endsWith("}")) {
					value = value.substring(0, value.length()-1); 
				}
				
				jsonMap.put(key, value);
			}
			
		}
		return jsonMap;
	}
	
	/**
	 * request를 던지면 JSONObject변환 할수있는 Map으로 return
	 * @param request
	 * @return
	 * @throws Exception
	 */
	public static Map<String, String> requestConvertMap(HttpServletRequest request) throws Exception {
		
		Map<String, String> resultMap = new HashMap<>();
		
		StringBuilder sb = new StringBuilder();
		String line;
		
		try(BufferedReader reader = request.getReader()){
			while((line = reader.readLine()) != null) {
				sb.append(line);
			}
		}
		
		resultMap = convertQueryStringToJson(sb.toString());
		
		return resultMap;
	}
}
