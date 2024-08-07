package com.slsolution.plms;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.slsolution.plms.dao.DbMapper;



@Service
public class DbService {
	@Autowired
    DbMapper dbmapper;
    
    public List<TestDTO> getList() throws Exception{
        
        return dbmapper.getList();
        
    }
}
