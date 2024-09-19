package com.slsolution.plms;

import java.util.ArrayList;
import java.util.HashMap;

public interface MainService { 
	

    /**
     * 정보를 등록한다
     *
     * @param HashMap - 저장 할 정보가 담긴 HashMap
     * @param string - 쿼리 정보가 담긴 string
     * @return Object
     * @throws Exception
     */

    public Object InsertQuery(String string, HashMap hashMap) throws Exception;
    
    
    
    

    /**
     * 정보를 조회한다
     *
     * @param HashMap - 저장 할 정보가 담긴 HashMap
     * @param string - 쿼리 정보가 담긴 string
     * @return Object
     * @throws Exception
     */
	
	public ArrayList<HashMap> selectQuery(String string, HashMap hashMap) throws Exception;
	public HashMap selectHashmapQuery(String string, HashMap hashMap) throws Exception;
	public String selectStringQuery(String string, HashMap hashMap) throws Exception;
	
	
	
	
	/**
     * 정보의 카운트를 조회한다
     *
     * @param HashMap - 저장 할 정보가 담긴 HashMap
     * @param string - 쿼리 정보가 담긴 string
     * @return Object
     * @throws Exception
     */
	public Object selectCountQuery(String string, HashMap hashMap) throws Exception;

    /**
     * 정보를 수정한다
     *
     * @param HashMap - 저장 할 정보가 담긴 HashMap
     * @param string - 쿼리 정보가 담긴 string
     * @return Object
     * @throws Exception
     */
	public Object UpdateQuery(String string, HashMap hashMap) throws Exception;

    /**
     * 정보를 삭제한다
     *
     * @param HashMap - 저장 할 정보가 담긴 HashMap
     * @param string - 쿼리 정보가 담긴 string
     * @return Object
     * @throws Exception
     */
	public Object DeleteQuery(String string, HashMap hashMap) throws Exception;
    
}