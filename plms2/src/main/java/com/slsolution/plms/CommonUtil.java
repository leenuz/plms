package com.slsolution.plms;



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

import com.fasterxml.jackson.core.JsonParseException;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.slsolution.plms.json.JSONArray;
import com.slsolution.plms.json.JSONException;
import com.slsolution.plms.json.JSONObject;

import jakarta.servlet.http.HttpServletRequest;
import lombok.extern.slf4j.Slf4j;

@Slf4j
public class CommonUtil {

	
	 private static ApplicationContext context;

	    // ApplicationContext 주입
	    
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

}
