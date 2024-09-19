package com.slsolution.plms;


import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import jakarta.annotation.Resource;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;



@Service
public class MainServiceImpl implements  com.slsolution.plms.MainService {
	
	/** LbsServerDAO */
    @Resource(name="mainDAO")
    private MainDAO mainDAO;
    
	
    
    /**
     * 정보를 등록한다
     *
     * @param HashMap - 저장 할 정보가 담긴 HashMap
     * @param string - 쿼리 정보가 담긴 string
     * @return Object
     * @throws Exception
     */
    @Transactional(readOnly=false, propagation=Propagation.REQUIRED)
    public Object InsertQuery(String string, HashMap hashMap) throws Exception {
        return mainDAO.insert(string, hashMap);
    }
    
    /**
     * 정보를 조회한다
     *
     * @param HashMap - 저장 할 정보가 담긴 HashMap
     * @param string - 쿼리 정보가 담긴 string
     * @return Object
     * @throws Exception
     */
    @Transactional (readOnly=false, propagation=Propagation.REQUIRED)
    public ArrayList<HashMap> selectQuery(String string, HashMap hashMap) throws Exception {
    	return (ArrayList<HashMap>)mainDAO.selectList(string, hashMap);
    }
    
   
    
    
    /**
     * 정보의 카운트를 조회한다
     *
     * @param HashMap - 저장 할 정보가 담긴 HashMap
     * @param string - 쿼리 정보가 담긴 string
     * @return Object
     * @throws Exception
     */
    @Transactional (readOnly=true, propagation=Propagation.REQUIRED)
    public Object selectCountQuery(String string, HashMap hashMap) throws Exception {
    	return mainDAO.selectOne(string, hashMap);
    }
    
    @Transactional (readOnly=false, propagation=Propagation.REQUIRED)
    public Object selectHashMapQuery(String string, HashMap hashMap) throws Exception {
    	return mainDAO.selectOne1(string, hashMap);
    }
    @Transactional (readOnly=false, propagation=Propagation.REQUIRED)
    public String selectStringQuery(String string, HashMap hashMap) throws Exception {
    	return mainDAO.selectOne2(string, hashMap);
    }

    
//    @Transactional(readOnly = false, propagation = Propagation.REQUIRED)
//    public HashMap<String, Object> selectHashMapQuery(String queryId, HashMap<String, Object> params) throws Exception {
//        // DAO에서 HashMap으로 결과 조회
//        return (HashMap<String, Object>) mainDAO.selectOne(queryId, params);
//    }
    /**
     * 정보를 수정한다
     *
     * @param HashMap - 저장 할 정보가 담긴 HashMap
     * @param string - 쿼리 정보가 담긴 string
     * @return Object
     * @throws Exception
     */
    @Transactional(readOnly=false, propagation=Propagation.REQUIRED)
    public Object UpdateQuery(String string, HashMap hashMap) throws Exception {
    	return mainDAO.update(string, hashMap);
    }

    /**
     * 정보를 삭제한다
     *
     * @param HashMap - 저장 할 정보가 담긴 HashMap
     * @param string - 쿼리 정보가 담긴 string
     * @return Object
     * @throws Exception
     */
    @Transactional(readOnly=false, propagation=Propagation.REQUIRED)
    public Object DeleteQuery(String string, HashMap hashMap) throws Exception {
    	return mainDAO.delete(string, hashMap);
    }

	@Override
	public HashMap<String, Object> selectHashmapQuery(String string, HashMap hashMap) throws Exception {
		// TODO Auto-generated method stub
		return null;
	}
}
