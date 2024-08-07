package com.slsolution.plms.common;

import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

/**
* 엑셀 업로드 시 필드명으로 매핑 못하는(예: 이카운트 엑셀 다운로드 양식) 헤더값 매핑용
* @author gbun
*
*/
@Target({ElementType.FIELD})
@Retention(RetentionPolicy.RUNTIME)
public @interface ExcelHeader {
	String value();
}
