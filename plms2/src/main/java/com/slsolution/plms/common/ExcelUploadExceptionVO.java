package com.slsolution.plms.common;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class ExcelUploadExceptionVO {
	int rownum;
	String cause;              
}
