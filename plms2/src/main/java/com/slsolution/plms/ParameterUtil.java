package com.slsolution.plms;


import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.nio.charset.StandardCharsets;
import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.HashMap;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import com.slsolution.plms.json.JSONArray;
import com.slsolution.plms.json.JSONException;
import com.slsolution.plms.json.JSONObject;

import jakarta.servlet.http.HttpServletRequest;


public class ParameterUtil {
	
//	public static void checkContryCode(String body, String[] keys) throws GateWayException, JSONException {
//		JSONObject target = null;
//
//		try {
//			target = new JSONObject(body.trim());
//		} catch (Exception e1) {
//			GateWayException e = new GateWayException("요청 JSON 데이터 오류 입니다!");
//			throw e;
//		}
//
//		// 전체 데이터 검사
//		for (String key : keys) {
//			if (!target.has(key)) {
//				GateWayException checkMendatoryException = new GateWayException("필수 파라미터 [" + key + "] 이 없습니다.");
//				throw checkMendatoryException;
//			}
//
//			String value = ParameterUtil.NVL(String.valueOf(target.get(key)), "");
//
//			if ("".equals(value)) {
//				GateWayException checkMendatoryException = new GateWayException("필수 파라미터 [" + key + "] 에 값이 없습니다.");
//				throw checkMendatoryException;
//			}
//
//		}
//		
//	}
	
	
	public static String NVL(String target, String value) {

		if (target == null || target.equals("") || target.equals("null") || target.equals(" ")) {
			target = value;

		}

		return target.trim();
	}

	/**
	 * default 세팅
	 *
	 * @param Properties객체, 세팅할 키값, 값 범위, 기본값
	 * @return String
	 * @throws CheckMendatoryException
	 */
	public static void defaultValueSetting(HashMap<String, Object> map, JSONObject target, String key, String mapKey, String defaultVal) throws GateWayException, JSONException {
		if (!target.has(key)) {
			map.put(mapKey, defaultVal);
		} else {
			String val = String.valueOf(target.get(key));
			if ("".equals(val.trim())) {
				map.put(mapKey, defaultVal);
			} else {
				map.put(mapKey, val);
			}
		}
	}

	/**
	 * default 세팅
	 *
	 * @param Properties객체, 세팅할 키값, 값 범위, 기본값
	 * @return String
	 * @throws CheckMendatoryException
	 */
	public static void defaultValueSetting(HashMap<String, Object> map, JSONObject target, String key, String mapKey, String[] valArr, String defaultVal) throws GateWayException, JSONException {
		if (!target.has(key)) {
			map.put(mapKey, defaultVal);
		} else {
			String val = String.valueOf(target.get(key));
			if ("".equals(val.trim())) {
				map.put(mapKey, defaultVal);
			} else {
				boolean flag = true;
				for (String code : valArr) {
					if (val.equals(code)) {
						flag = false;
					}
				}
				if (flag) {
					if (key.equals("type")) {
						GateWayException checkMendatoryException = new GateWayException("차량의 유형을 확인해 주세요.");
						throw checkMendatoryException;
					} else {
						GateWayException checkMendatoryException = new GateWayException("파라미터 [" + key + "] 값에 잘못된 값이 존재 합니다.");
						throw checkMendatoryException;
					}
				} else {
					map.put(mapKey, val);
				}
			}
		}
	}

	/**
	 * location option default 세팅
	 *
	 * @param Properties객체, 세팅할 키값, 값 범위, 기본값
	 * @return String
	 * @throws CheckMendatoryException
	 */
	public static void locationDefaultValueSetting(HashMap<String, Object> map, JSONObject target, String[] mapKeys, String[] valArr, String defaultVal) throws GateWayException, JSONException {

		for (String key : mapKeys) {
			if (!target.has(key)) {
				map.put(key, defaultVal); // -1값으로 셋팅하고, 엔진 요청시에 체크해서 기본값으로 요청
			} else {
				String val = String.valueOf(target.get(key));

				if ("".equals(val.trim())) {
					map.put(key, defaultVal);
				} else {
					boolean flag = true;
					for (String code : valArr) {
						if (val.equals(code)) {
							flag = false;
						}
					}
					if (flag) {
						GateWayException checkMendatoryException = new GateWayException("allocationOption - 파라미터 [" + key + "] 값에 잘못된 값이 존재 합니다.");
						throw checkMendatoryException;
					} else {
						map.put(key, val);
					}
				}
			}
		}
	}

	//데이터 유효성 검사.(범위 지정)
	public static void validationValue(JSONObject target, String key, String[] valArr) throws GateWayException, JSONException {
		String val = String.valueOf(target.get(key));
		if (val == null || "".equals(val)) {

		} else {
			boolean flag = true;
			for (String code : valArr) {
				if (val.equals(code)) {
					flag = false;
				}
			}
			if (flag) {
				GateWayException checkMendatoryException = new GateWayException("파라미터 [" + key + "] 값에 잘못된 값이 존재 합니다.");
				throw checkMendatoryException;

			}
		}
	}

	/**
	 * default 세팅 _숫자형 데이터 값범위 체크
	 *
	 * @param HashMap    : HashMap 객체
	 * @param key        : key 네임
	 * @param startVal   : 값범위 시작
	 * @param defaultVal : 기본값
	 * @return String
	 * @throws GateWayException
	 */
	public static void defaultValueSetting(HashMap<String, Object> map, JSONObject target, String key, String mapKey, int startVal, String defaultVal) throws GateWayException, JSONException {

		if (!target.has(key)) {
			map.put(mapKey, defaultVal);
		} else {
			String val = target.getString(key);
			if ("".equals(val.trim())) {
				map.put(mapKey, defaultVal);
			} else {
				try {
					double dobleVal = Double.parseDouble(val);

					if (dobleVal < startVal) {
						GateWayException e = new GateWayException("파라미터 [" + key + "] 값은 " + startVal + "보다 큰 값을 입력해야 합니다.");
						throw e;
					}
					map.put(mapKey, val);
				} catch (NumberFormatException ne) {
					GateWayException e = new GateWayException("파라미터 [" + key + "] 입력 데이터 오류 입니다.");
					throw e;
				}
			}
		}
	}

	/**
	 * default 세팅 _숫자형 데이터 값범위 체크
	 *
	 * @param properties : properties 객체
	 * @param key        : key 네임
	 * @param startVal   : 값범위 시작
	 * @param endVal     : 값범위 끝
	 * @param defaultVal : 기본값
	 * @return String
	 * @throws GateWayException
	 */
	public static void defaultValueSetting(HashMap<String, Object> map, JSONObject target, String key, String mapKey, int startVal, int endVal, String defaultVal) throws GateWayException, JSONException {
		if (!target.has(key)) {
			map.put(mapKey, defaultVal);
		} else {
			String val = String.valueOf(target.get(key));
			if ("".equals(val.trim())) {
				map.put(mapKey, defaultVal);
			} else {
				try {
					int intVal = Integer.parseInt(val);

					if (intVal < startVal || intVal > endVal) {
						GateWayException e = new GateWayException("파라미터 [" + key + "] 값이 " + startVal + "보다 작거나 " + endVal + "보다 큰값 입니다.");
						throw e;
					}
					if (key.equals("skillPer") && intVal % 10 != 0) {
						GateWayException e = new GateWayException("차량의 숙련도(100~10)를 10단위로 입력하여 주세요.");
						throw e;
					}

					map.put(mapKey, val);
				} catch (NumberFormatException ne) {
					GateWayException e = new GateWayException("파라미터 [" + key + "] 입력 데이터 오류 입니다.");
					throw e;
				}

			}
		}
	}

	/**
	 * default 세팅 _숫자형 데이터 값범위 체크
	 */
	public static void defaultValueCode(HashMap<String, Object> map, JSONObject target, String key, String mapKey, int len, String defaultVal) throws GateWayException, JSONException {
		if (!target.has(key)) {
			map.put(mapKey, defaultVal);
		} else {
			String val = String.valueOf(target.get(key));
			if (val == "null" || "".equals(val.trim())) {
				map.put(mapKey, defaultVal);
			} else {
				try {
					Pattern p = null;

					p = Pattern.compile("^[0-9]{" + len + "}$");

					Matcher match = p.matcher(val);
					if (!match.find()) {
						GateWayException e = new GateWayException("권역 정보를 확인하여 주세요.");
						throw e;
					}

					map.put(mapKey, val);
				} catch (NumberFormatException ne) {
					GateWayException e = new GateWayException("파라미터 [" + key + "] 입력 데이터 오류 입니다.");
					throw e;
				}

			}
		}
	}

	/**
	 * 좌표 유효성 체크.
	 */
	public static boolean checkCoord(String lonX, String latY) {

		//태국판에서 좌표 유효성 검사 패스
	/*	if (lonX == null || lonX.length() == 0) {
			return false;
		} else if (latY == null || latY.length() == 0) {
			return false;
		}

		try {
			double dLonX = Double.parseDouble(lonX);

			if (dLonX < 124.9 || dLonX > 131.5) {
				return false;
			}

		} catch (Exception e) {
			return false;
		}

		try {
			double dLatY = Double.parseDouble(latY);

			if (dLatY < 32.5 || dLatY > 39.4) {
				return false;
			}
		} catch (Exception e) {
			return false;
		}
*/

		return true;
	}

	/**
	 * 숫자 유효성 체크
	 * - [0/영문/한글/특수문자] 로 시작할 수 없음
	 * - 숫자만
	 *
	 * @param length : 자리수
	 * @param val    : 유효성 체크 대상
	 * @throws GateWayException
	 */
	public static void isValidateNumber(int len, String val) throws GateWayException {
		Pattern p = null;

		p = Pattern.compile("^[0-9]{" + len + "}$");

		Matcher match = p.matcher(val);
		if (!match.find()) {
			GateWayException e = new GateWayException("권역 정보를 확인하여 주세요. ");
			throw e;
		}
	}

	/**
	 * 날짜 형식과 유효한 날짜인지 확인
	 *
	 * @param Properties객체, key, 값 형식
	 */
	public static void checkDateValid(String date, String format) throws GateWayException {
		Boolean result = false;

		try {
			DateFormat df = new SimpleDateFormat(format);
			df.setLenient(false);
			df.parse(date);
			result = true;

			if (date.length() != format.length())
				result = false;

		} catch (ParseException e) {
			result = false;
		} catch (Exception e) {
			result = false;
		}

		if (!result) {
			GateWayException exception = new GateWayException("배송 시작 희망 시간은 시간(0~23), 분(0~59) 값으로 설정하셔야 됩니다.");
			throw exception;
		}
	}

	public static boolean overlapId(JSONArray bodyArray, String checkKey) throws GateWayException {
		HashMap<String, String> overlapMap = new HashMap<>();

		int arraySize = bodyArray.length();

		try {
			for (int i = 0; i < arraySize; i++) {
				JSONObject bodyObject = (JSONObject) bodyArray.get(i);
				String checkId = String.valueOf(bodyObject.get(checkKey));

				if (overlapMap.containsKey(checkId)) {
					return false;
				} else {
					overlapMap.put(checkId, "");
				}
			}
		} catch (Exception e) {
			return false;
		}

		return true;
	}

	/**
	 * requestBody -> String 변환
	 *
	 * @param HttpServletRequest
	 * @return String
	 * @throws IOException
	 */
	public static String getRequestBodyToStr(HttpServletRequest request) throws IOException {
		StringBuffer sb = new StringBuffer();
		BufferedReader bufferedReader = null;

		//bufferedReader =  request.getReader() ; //new BufferedReader(new InputStreamReader(inputStream));
		bufferedReader = new BufferedReader(new InputStreamReader(request.getInputStream(), StandardCharsets.UTF_8));
		char[] charBuffer = new char[128];
		int bytesRead;
		while ((bytesRead = bufferedReader.read(charBuffer)) != -1) {
			//System.out.println(charBuffer);
			sb.append(charBuffer, 0, bytesRead);
		}
		//System.out.println("LJS sb:"+sb);
		return sb.toString();
	}

	/**
	 * String, Key -> Key값에 대한 JSONObject 추출.
	 *
	 * @throws GateWayException
	 */
	public static JSONObject getJsonBodyToObject(String body, String key) throws GateWayException {

		JSONObject jsonObject = null;
		JSONObject target = null;

		try {
			target = new JSONObject(body.trim());
			jsonObject = (JSONObject) target.get(key);
		} catch (Exception e1) {
			GateWayException e = new GateWayException("요청 JSON 데이터 오류 입니다!");
			throw e;
		}
		return jsonObject;
	}

	/**
	 * String, Key -> Key값에 대한 JSONObject 추출.
	 *
	 * @throws GateWayException
	 */
	public static JSONArray getJsonBodyToArray(String body, String key) throws GateWayException {

		JSONArray jsonArray = null;
		JSONObject target = null;

		try {
			target = new JSONObject(body.trim());
			//System.out.println("target:"+target);
			jsonArray = (JSONArray) target.get(key);
		} catch (Exception e1) {
			GateWayException e = new GateWayException("요청 JSON 데이터 오류 입니다!");
			throw e;
		}
		return jsonArray;
	}

	/**
	 * String 값 만 입력.
	 *
	 * @throws GateWayException
	 */
	public static void settingValueString(HashMap<String, Object> map, JSONObject target, String key, String mapKey, String parentKey) throws GateWayException {

		try {
			if (!(target.get(key) instanceof String)) {
				GateWayException checkMendatoryException = new GateWayException("파라미터 [" + parentKey + "]의" + " [" + key + "] 값에 잘못된 값이 존재 합니다.");
				throw checkMendatoryException;
			} else {
				String val = String.valueOf(target.get(key));
				map.put(mapKey, val);
			}
		} catch (JSONException ee) {
			GateWayException checkMendatoryException = new GateWayException("파라미터 [" + parentKey + "]의" + " [" + key + "] 값에 잘못된 값이 존재 합니다.");
			throw checkMendatoryException;
		}
	}
}
