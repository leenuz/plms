package com.slsolution.plms;



import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import jakarta.annotation.Resource;

import java.util.HashMap;
import java.util.List;



@Repository("mainDAO")
public class MainDAO { 
     
    @Autowired
    private SqlSessionTemplate sqlSession;
	
//		@Autowired
//		private masterSqlSessionTemplate sqlSession;
	
//    @Autowired
//    private slave1SqlSessionTemplate sqlSessionSelect;
     
    protected void printQueryId(String queryId) {

    }

    public Object insert(String queryId, Object params){
        printQueryId(queryId);
        return sqlSession.insert(queryId, params);
    }
     
    public Object update(String queryId, Object params){
        printQueryId(queryId);
        return sqlSession.update(queryId, params);
    }
     
    public Object delete(String queryId, Object params){
        printQueryId(queryId);
        return sqlSession.delete(queryId, params);
    }
     
    public Object selectOne(String queryId){
        printQueryId(queryId);
        return sqlSession.selectOne(queryId);
    }
     
    public Object selectOne(String queryId, Object params){
        printQueryId(queryId);
        return sqlSession.selectOne(queryId, params);
    }
    public HashMap selectOne1(String queryId, Object params){
        printQueryId(queryId);
        return sqlSession.selectOne(queryId, params);
    }
    
//    public HashMap<String, Object> selectOne(String queryId, HashMap<String, Object> params) {
//        printQueryId(queryId); // 쿼리 ID를 출력하는 메서드
//
//        // 쿼리 결과를 Object로 받아서 타입 확인 후 캐스팅
//        Object result = sqlSession.selectOne(queryId, params);
//
//        if (result instanceof HashMap) {
//            // 결과가 HashMap인 경우 그대로 반환
//            return (HashMap<String, Object>) result;
//        } else {
//            // 결과가 HashMap이 아닌 경우 빈 HashMap에 값을 넣어 반환
//            HashMap<String, Object> resultMap = new HashMap<>();
//            resultMap.put("result", result);  // 결과 값은 'result'라는 키로 저장
//            return resultMap;
//        }
//    }

    
    @SuppressWarnings("rawtypes")
    public List selectList(String queryId){
        printQueryId(queryId);
        return sqlSession.selectList(queryId);
    }
    
   
     
    @SuppressWarnings("rawtypes")
    public List selectList(String queryId, Object params){
        printQueryId(queryId);
        return sqlSession.selectList(queryId,params);
    }
}