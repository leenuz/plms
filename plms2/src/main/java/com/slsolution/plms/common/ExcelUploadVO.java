package com.slsolution.plms.common;


import org.springframework.web.multipart.MultipartFile;

import lombok.Data;

@Data
public class ExcelUploadVO {
	MultipartFile file;
	int fieldRowIdx;
	int dataRowIdx;
}
