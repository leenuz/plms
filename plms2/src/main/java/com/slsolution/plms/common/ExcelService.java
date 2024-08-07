package com.slsolution.plms.common;

import java.beans.IntrospectionException;
import java.beans.PropertyDescriptor;
import java.io.IOException;
import java.lang.reflect.Field;
import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;

import org.apache.commons.lang3.StringUtils;
import org.apache.poi.EncryptedDocumentException;
import org.apache.poi.openxml4j.exceptions.InvalidFormatException;
import org.apache.poi.openxml4j.opc.OPCPackage;
import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.CellType;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.apache.poi.xssf.usermodel.XSSFWorkbookFactory;
import org.springframework.stereotype.Service;



import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
public class ExcelService {
	/**
	 * 파일 업로드 읽기
	 * @param <T>
	 * @param vo
	 * @param clazz
	 * @return
	 * @throws EncryptedDocumentException
	 * @throws IOException
	 * @throws InstantiationException
	 * @throws IllegalAccessException
	 * @throws InvalidFormatException
	 */
	@SuppressWarnings("deprecation")
	public <T> List<T> convertExcelFile(ExcelUploadVO vo,  Class<T> clazz) throws EncryptedDocumentException, IOException, InstantiationException, IllegalAccessException, InvalidFormatException{
		List<T> result = new ArrayList<>();
		
		OPCPackage pkg = OPCPackage.open(vo.getFile().getInputStream());
		XSSFWorkbook workbook = (XSSFWorkbook) XSSFWorkbookFactory.createWorkbook(pkg);
		
		Sheet sheet = workbook.getSheetAt(0);
		
		// 필드명 목록
		List<String> fields = new ArrayList<>();
		// header 에서 필드명 가져옴
		Row fieldRow = sheet.getRow(vo.getFieldRowIdx());
		for(int i=0; i < fieldRow.getLastCellNum(); i++) {
			fields.add(this.getFiledNameByExcelHeader( fieldRow.getCell(i).getStringCellValue(), clazz ));
		}		
		// 데이터 취득
		for(int i= vo.getDataRowIdx(); i <= sheet.getLastRowNum(); i++) {
			Row row = sheet.getRow(i);
			int cellIdx = 0;
			T obj = clazz.newInstance();
			
			for(String fieldName : fields) {
				log.trace("================================");
				log.trace(fieldName);
				Cell cell = row.getCell(cellIdx++);
				if(cell == null) {
					continue;
				}
				String cellValue = cell.toString();
				
				
				log.trace("cellType: "  + cell.getCellType().toString());
				log.trace("cellValue : " + cellValue);
				if(StringUtils.isEmpty(cellValue)) {
					continue;
				}
				try {
					PropertyDescriptor pd = new PropertyDescriptor(fieldName, clazz);
					String simpleName = pd.getPropertyType().getSimpleName();
					switch(simpleName) {
						case "String":
							if(cell.getCellType() == CellType.NUMERIC) {
//								cell.setCellType(CellType.STRING);
								cellValue = cell.toString();
							}
							pd.getWriteMethod().invoke(obj, cellValue);
							break;
						case "Integer":
							pd.getWriteMethod().invoke(obj, (int)Double.parseDouble(cellValue));
							break;						
						case "Double": case "BigDecimal":
							pd.getWriteMethod().invoke(obj, new BigDecimal(cellValue));
							break;
						}
				} catch(IntrospectionException ie) {
					log.debug("spec 외 필드: " + fieldName);
					continue;
				} catch(Exception e) {
					e.printStackTrace();
					throw new ExcelUploadException(e, new ExcelUploadExceptionVO(i+1, fieldName));
				}
			}
			result.add(obj);
		}		
		return result;
	}
	
	/**
	 * ExcelHeader annotation을 참조하여 PropertyDescriptor에 사용될 필드명 반환
	 * 
	 * @param fieldName 
	 * @param clazz
	 * @return 
	 * @throws IntrospectionException
	 */
	private <T> String getFiledNameByExcelHeader(String fieldName, Class<T> clazz) {
		for(Field f: clazz.getDeclaredFields()) {
			ExcelHeader a = f.getDeclaredAnnotation(ExcelHeader.class);
			if(a != null && StringUtils.equals(a.value(), fieldName)) {
				return f.getName(); 
			}
		}
		return fieldName;
	}	
}
