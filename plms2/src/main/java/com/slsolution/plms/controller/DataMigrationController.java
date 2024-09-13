package com.slsolution.plms.controller;

import java.sql.Connection;
import java.sql.DriverManager;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;

import org.apache.ibatis.builder.StaticSqlSource;
import org.apache.ibatis.mapping.*;
import org.apache.ibatis.session.Configuration;
import org.apache.ibatis.session.SqlSession;
import org.apache.ibatis.session.SqlSessionFactory;
import org.apache.ibatis.session.SqlSessionFactoryBuilder;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.EnableAsync;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.slsolution.plms.MainService;
import com.slsolution.plms.ParameterUtil;
import com.slsolution.plms.common.SqlMapper;
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
@RequestMapping("/data")
@CrossOrigin(origins="*",allowedHeaders="*")
public class DataMigrationController {

	
	
	 
	@Autowired
	private MainService mainService;
	

	
//	SqlSession m_clsSession;
//	
//	 public class SqlDirect
//	 {
//	  SqlSession m_clsSession;
//	  
//	  // key = SQL, value = statement
//	  Map<String,String> m_clsMap = new HashMap<String,String>();
//	  
//	  public SqlDirect( SqlSession clsSession )
//	  {
//	   m_clsSession = clsSession;
//	  }
//	  
//	  public <T> T Insert( String strSQL, Class<T> resultType )
//	  {
//	   String strName = m_clsMap.get( strSQL );
//	   
//	   // SQL 과 관련된 statement 이름이 Configuration 에 저장되어 있지 않은 경우에 statement 를 생성한 후, Configuration 에 저장한다.
//	   if( strName == null )
//	   {
//	    // 새로운 statement 이름을 생성한다.
//	    int iMapCount = m_clsMap.size( );
//	    strName = "" + iMapCount;
//	    
//	    Configuration clsConfig = m_clsSession.getConfiguration( );
//	    SqlSource clsSS = new StaticSqlSource( clsConfig, strSQL );
//	    List<ResultMap> clsRML = new ArrayList<ResultMap>();
//	    clsRML.add( new ResultMap.Builder( clsConfig, "", resultType, new ArrayList<ResultMapping>() ).build( ) );
//	    MappedStatement clsMs = new MappedStatement.Builder( clsConfig, strName, clsSS, SqlCommandType.INSERT ).resultMaps( clsRML ).build( );
//	    clsConfig.addMappedStatement( clsMs );
//	    
//	    m_clsMap.put( strSQL, strName );
//	   }
//	   
//	   return m_clsSession.selectOne( strName );
//	  }
//	  
//	  public <T> T SelectOne( String strSQL, Class<T> resultType )
//	  {
//	   String strName = m_clsMap.get( strSQL );
//	   
//	   // SQL 과 관련된 statement 이름이 Configuration 에 저장되어 있지 않은 경우에 statement 를 생성한 후, Configuration 에 저장한다.
//	   if( strName == null )
//	   {
//	    // 새로운 statement 이름을 생성한다.
//	    int iMapCount = m_clsMap.size( );
//	    strName = "" + iMapCount;
//	    
//	    Configuration clsConfig = m_clsSession.getConfiguration( );
//	    SqlSource clsSS = new StaticSqlSource( clsConfig, strSQL );
//	    List<ResultMap> clsRML = new ArrayList<ResultMap>();
//	    clsRML.add( new ResultMap.Builder( clsConfig, "", resultType, new ArrayList<ResultMapping>() ).build( ) );
//	    MappedStatement clsMs = new MappedStatement.Builder( clsConfig, strName, clsSS, SqlCommandType.SELECT ).resultMaps( clsRML ).build( );
//	    clsConfig.addMappedStatement( clsMs );
//	    
//	    m_clsMap.put( strSQL, strName );
//	   }
//	   
//	   return m_clsSession.selectOne( strName );
//	  }
//	
//
//
//	  
//	 
//	 }
//	


	


	
	
	@RequestMapping(value="/migration", method = {RequestMethod.GET, RequestMethod.POST}) 
    public void insertTest(HttpServletRequest httpRequest, HttpServletResponse response) throws Exception {
		Class.forName( "org.postgresql.Driver" );
		
		

		//일반웹형식
//		Properties requestParams = CommonUtil.convertToProperties(httpRequest);
//        log.info("requestParams:"+requestParams);
        
        //json으로 넘어올때
        String getRequestBody = ParameterUtil.getRequestBodyToStr(httpRequest);
        log.info("getRequestBody:"+getRequestBody);
        
        JSONObject object=new JSONObject(getRequestBody);
        JSONArray arr=new JSONArray(object.getString("exceljson"));
        String mapperName=object.getString("dbname");
        //log.info("array:"+arr);
        String processCode="0000";
        String processMessage="success";
        String processText="";
        String processData="";
        		
        for(int i=0;i<arr.length();i++) {
          	//log.info("arr "+i+":"+arr.getString(i));
          	JSONObject obj=new JSONObject(arr.getString(i));
//          	log.info("obj length:"+obj.length());
//          	log.info("obj["+i+"]:"+obj);
          	Iterator keys=obj.keys();
          	HashMap param=new HashMap();
          	
          	//System.out.println("keys:"+Arrays.toString(keys));
          	for(int j=0;j<obj.length();j++) {
          		//log.info("keys "+j+":"+keys.next().toString());
          		String keyString=keys.next().toString(); 
          		param.put(keyString,obj.get(keyString));	
          		
          	}
          	log.info("param["+i+"]:"+param);
          	if (mapperName.equals("jisang_souja")) mainService.InsertQuery("migrationSQL.jisang_souja", param);
          	else if (mapperName.equals("jisang_master")) mainService.InsertQuery("migrationSQL.jisangMaster1", param);
          	else if (mapperName.equals("jisang_bunhal")) mainService.InsertQuery("migrationSQL.jisang_bunhal", param);
          	else if (mapperName.equals("notset_souja")) mainService.InsertQuery("migrationSQL.notset_souja", param);
          	else if (mapperName.equals("gover_master")) mainService.InsertQuery("migrationSQL.goverMaster", param);
          	else if (mapperName.equals("dopco_master")) mainService.InsertQuery("migrationSQL.dopcoMaster", param);
          	else if (mapperName.equals("minwon_master")) mainService.InsertQuery("migrationSQL.minwonMaster", param);
          	else if (mapperName.equals("minwon_pnu")) mainService.InsertQuery("migrationSQL.minwonPnu", param);
          	else if (mapperName.equals("minwon_agreement")) mainService.InsertQuery("migrationSQL.minwonAgreement", param);
          	else if (mapperName.equals("minwon_handling_tmp")) mainService.InsertQuery("migrationSQL.minwonHandlingTmp", param);
          	else if (mapperName.equals("minwon_atcfile")) mainService.InsertQuery("migrationSQL.minwon_atcfile", param);
          	else if (mapperName.equals("minwon_agree_atcfile")) mainService.InsertQuery("migrationSQL.minwon_agree_atcfile", param);
          	else if (mapperName.equals("notset_master")) mainService.InsertQuery("migrationSQL.notsetMaster", param);
          	else if (mapperName.equals("gover_pnu")) mainService.InsertQuery("migrationSQL.goverPnu", param);
          	else if (mapperName.equals("gover_permit")) mainService.InsertQuery("migrationSQL.gover_permit", param);
          	else if (mapperName.equals("gover_permit2")) mainService.InsertQuery("migrationSQL.gover_permit2", param);
          	else if (mapperName.equals("sigun")) mainService.InsertQuery("migrationSQL.sigun", param);
          	else if (mapperName.equals("bdong")) mainService.InsertQuery("migrationSQL.bdong", param);
          	else if (mapperName.equals("dosi_master")) mainService.InsertQuery("migrationSQL.dosi_master", param);
          	else if (mapperName.equals("dosi_info")) mainService.InsertQuery("migrationSQL.dosi_info", param);
          	else if (mapperName.equals("dosi_dept")) mainService.InsertQuery("migrationSQL.dosi_dept", param);
          	else if (mapperName.equals("jisang_atcfile")) mainService.InsertQuery("migrationSQL.jisang_atcfile", param);
          	else if (mapperName.equals("gover_atcfile")) mainService.InsertQuery("migrationSQL.gover_atcfile", param);
          	else if (mapperName.equals("issue_code_atc_file")) mainService.InsertQuery("migrationSQL.issue_code_atc_file", param);
          	else if (mapperName.equals("jisang_permit_master")) mainService.InsertQuery("migrationSQL.jisang_permit_master", param);
          	else if (mapperName.equals("jisang_modify")) mainService.InsertQuery("migrationSQL.jisang_modify", param);
          	else if (mapperName.equals("jisang_merge")) mainService.InsertQuery("migrationSQL.jisang_merge", param);
          	else if (mapperName.equals("permit_togi")) mainService.InsertQuery("migrationSQL.permit_togi", param);
          	else if (mapperName.equals("plms_approval")) mainService.InsertQuery("migrationSQL.plms_approval", param);
          	else if (mapperName.equals("sys_officemng")) mainService.InsertQuery("migrationSQL.sys_officemng", param);
          	else if (mapperName.equals("sys_code")) mainService.InsertQuery("migrationSQL.sys_code", param);
          	else if (mapperName.equals("jisang_potential_issue")) {
          		param.put("MANAGE_NO","");
          		mainService.InsertQuery("migrationSQL.potential_issue", param);
          	}
          	else if (mapperName.equals("jisang_issue_history")) mainService.InsertQuery("migrationSQL.potential_issue_history", param);
          	else {
          		processCode="0001";
          		break;
          	}
          //	mainService.InsertQuery("migrationSQL."+mapperName, param);
          	
          }
        log.info("-------------end migration ----------------");
        if (processCode.equals("0000")) {
        	 HashMap<String,Object> resultmap=new HashMap();
             resultmap.put("resultCode","0000");
            // resultmap.put("resultData",object);
             resultmap.put("resultMessage","success");
             JSONObject obj =new JSONObject(resultmap);
//             System.out.println(obj);
            
           //log.info("jo:"+jo);
           			response.setCharacterEncoding("UTF-8");
           			response.setHeader("Access-Control-Allow-Origin", "*");
           			response.setHeader("Cache-Control", "no-cache");
           			response.resetBuffer();
           			response.setContentType("application/json");
           			//response.getOutputStream().write(jo);
           			response.getWriter().print(obj);
           			response.getWriter().flush();
            // return new ModelAndView("dbTest", "list", list);
        }
        else {
        	 HashMap<String,Object> resultmap=new HashMap();
             resultmap.put("resultCode",processCode);
            // resultmap.put("resultData",object);
             resultmap.put("resultMessage","error");
             JSONObject obj =new JSONObject();
//             System.out.println(obj);
            
           //log.info("jo:"+jo);
           			response.setCharacterEncoding("UTF-8");
           			response.setHeader("Access-Control-Allow-Origin", "*");
           			response.setHeader("Cache-Control", "no-cache");
           			response.resetBuffer();
           			response.setContentType("application/json");
           			//response.getOutputStream().write(jo);
           			response.getWriter().print(obj);
           			response.getWriter().flush();
            // return new ModelAndView("dbTest", "list", list);
        }
        
        
       
    }
}
