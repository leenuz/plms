package com.slsolution.plms.common;



import lombok.Getter;

@Getter
public class ExcelUploadException extends RuntimeException{
	
	ExcelUploadExceptionVO excelUploadExceptionVO;

	/**
	 *
	 */
	private static final long serialVersionUID = 989083252960979688L;
	
	public ExcelUploadException(Exception e) {
		super(e);
	}

	public ExcelUploadException(Exception e, ExcelUploadExceptionVO vo) {
		super(e);
		this.excelUploadExceptionVO = vo;
	}
}
