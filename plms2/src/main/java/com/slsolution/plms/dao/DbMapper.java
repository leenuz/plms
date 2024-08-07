package com.slsolution.plms.dao;

import java.util.List;

import com.slsolution.plms.TestDTO;



public interface DbMapper {
    public List<TestDTO> getList() throws Exception;
}
 