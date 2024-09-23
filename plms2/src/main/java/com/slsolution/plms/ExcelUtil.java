package com.slsolution.plms;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.IOException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;

import org.apache.poi.hssf.usermodel.HSSFCell;
import org.apache.poi.hssf.usermodel.HSSFCellStyle;
import org.apache.poi.hssf.usermodel.HSSFRow;
import org.apache.poi.hssf.usermodel.HSSFSheet;
import org.apache.poi.hssf.usermodel.HSSFWorkbook;
import org.apache.poi.hssf.util.HSSFColor;
import org.apache.poi.ss.usermodel.BorderStyle;
import org.apache.poi.ss.usermodel.CellStyle;
import org.apache.poi.ss.usermodel.CellType;
import org.apache.poi.ss.usermodel.IndexedColors;
import org.apache.poi.xssf.usermodel.XSSFCell;
import org.apache.poi.xssf.usermodel.XSSFSheet;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.apache.poi.ss.usermodel.HorizontalAlignment;
import org.apache.poi.ss.usermodel.IndexedColors;

public class ExcelUtil {

	public static List<HashMap<String, String>> excelFileToMapList(String filePath, String[] headerArr) {
		List<HashMap<String, String>> returnList = null;
		FileInputStream fis = null;
		XSSFWorkbook workbook = null;
		XSSFSheet sheet = null;

		try {
			returnList = new ArrayList<HashMap<String, String>>();
			fis = new FileInputStream(filePath);
			workbook = new XSSFWorkbook(fis);
			sheet = workbook.getSheetAt(0);
			int rows = sheet.getPhysicalNumberOfRows();
			int headCells = sheet.getRow(0).getPhysicalNumberOfCells();
			String[] headers = new String[headCells];

			for (int headIdx = 0; headIdx < headCells; headIdx++) {
				headers[headIdx] = sheet.getRow(0).getCell(headIdx).getStringCellValue();
			}

			for (int i = 1; i < rows; i++) {
				HashMap<String, String> rowMap = new HashMap<>();
				for (int cellIdx = 0; cellIdx < headCells; cellIdx++) {
					String headersStr = headers[cellIdx];

					for (int j = 0; j < headerArr.length; j++) {
						if (headerArr[j].split(":")[0].equals(headersStr)) {
							headersStr = headerArr[j].split(":")[1];
						}
					}

					if (sheet.getRow(i).getCell(cellIdx) != null) {
						if (sheet.getRow(i).getCell(cellIdx).getCellType() == CellType.STRING) {
							rowMap.put(headersStr, sheet.getRow(i).getCell(cellIdx).getStringCellValue());
						}

						if (sheet.getRow(i).getCell(cellIdx).getCellType() == CellType.NUMERIC) {
							rowMap.put(headersStr, String.valueOf(Math.round(sheet.getRow(i).getCell(cellIdx).getNumericCellValue())));
						}

						if (sheet.getRow(i).getCell(cellIdx).getCellType() == CellType.BOOLEAN) {
							rowMap.put(headersStr, String.valueOf(sheet.getRow(i).getCell(cellIdx).getBooleanCellValue()));
						}

						if (sheet.getRow(i).getCell(cellIdx).getCellType() == CellType.BLANK) {
						}
					}
				}
				returnList.add(rowMap);
			}

		} catch (Exception e) {
			e.printStackTrace();
		} finally {
			try {
				if (workbook != null)
					workbook.close();
				if (fis != null)
					fis.close();
			} catch (Exception e2) {
				e2.printStackTrace();
			}
		}

		return returnList;
	}

	@SuppressWarnings("resource")
	public static String makeMapList2Excel(String xlsFilePath, String sheetNameStr, List<String> headerTextList, String[] mapNames, ArrayList<HashMap<String, Object>> dataList) throws IOException {
		Date today = new Date();
		SimpleDateFormat formatter = new SimpleDateFormat("yyMMddHHmmss");

		// 실제적인 엑셀 파일명
		String xlsFileName = formatter.format(today) + ".xls";
		// 지정된 경로의 폴더가 없으면 폴더를 생성.
		File fileDirectory = new File(xlsFilePath);
		if (!fileDirectory.exists()) {
			fileDirectory.mkdirs();
		}

		// 파일을 생성.
		File xlsFile = new File(xlsFilePath, xlsFileName);
		if (!xlsFile.exists())
			xlsFile.createNewFile();

		HSSFWorkbook wb = new HSSFWorkbook();
		HSSFSheet sheet = wb.createSheet(sheetNameStr);
		HSSFRow row0 = sheet.createRow(0);

		// 헤더 스타일 작성
		HSSFCellStyle headerStyle = wb.createCellStyle();
		headerStyle.setBorderBottom(BorderStyle.DOUBLE);
		headerStyle.setBottomBorderColor(IndexedColors.BLACK.getIndex());
		headerStyle.setBorderLeft(BorderStyle.THIN);
		headerStyle.setLeftBorderColor(IndexedColors.BLACK.getIndex());
		headerStyle.setBorderRight(BorderStyle.THIN);
		headerStyle.setRightBorderColor(IndexedColors.BLACK.getIndex());
		headerStyle.setBorderTop(BorderStyle.THIN);
		headerStyle.setTopBorderColor(IndexedColors.BLACK.getIndex());
		headerStyle.setAlignment(HorizontalAlignment.CENTER);
		headerStyle.setFillForegroundColor(IndexedColors.YELLOW.getIndex());

		/*
		 * 헤더 작성.
		 */
		for (int ii = 0; ii < headerTextList.size(); ii++) {
			HSSFCell headerCell = row0.createCell(ii, CellType.STRING);
			headerCell.setCellValue((String) headerTextList.get(ii));

			headerCell.setCellStyle(headerStyle);
			sheet.setColumnWidth(ii, 4800);
		}

		// 엑셀 내용 작성
		for (int i = 0; i < dataList.size(); i++) {
			// 로우 생성
			HSSFRow row = sheet.createRow(i + 1);

			if (dataList.get(i) != null) {

				for (int j = 0; j < mapNames.length; j++) {
					// Cell 생성
					HSSFCell cell = row.createCell(j, CellType.STRING);

					if ( dataList.get(i).get(mapNames[j]) == null || "".equals(dataList.get(i).get(mapNames[j]))) {
						cell.setCellValue("");
					} else {
						cell.setCellValue(CommonUtil.evl(""+dataList.get(i).get(mapNames[j]), ""));
					}

				} // Cell FOR 문
			}
		} // Row FOR문

		FileOutputStream fileOut = new FileOutputStream(xlsFile);
		wb.write(fileOut);
		fileOut.close();

		return xlsFileName;
	}

}
