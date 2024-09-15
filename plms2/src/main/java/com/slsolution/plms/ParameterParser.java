package com.slsolution.plms;

import java.util.Enumeration;

import jakarta.servlet.http.HttpServletRequest;



public class ParameterParser {
	private HttpServletRequest request = null;

	public ParameterParser(HttpServletRequest request) {
		this.request = request;
	}

	// "" && null = InitValue
	public int getInt(String name) {
		String value = request.getParameter(name);
		return (value == null || value.equals("")) ? 0 : Integer.parseInt(value);
	}

	public int getInt(String name, int defaultValue) {
		String value = request.getParameter(name);
		return (value == null || value.equals("")) ? defaultValue : Integer.parseInt(value);
	}

	public float getFloat(String name) {
		String value = request.getParameter(name);
		return (value == null || value.equals("")) ? 0 : Float.parseFloat(value);
	}

	public float getFloat(String name, float defaultValue) {
		String value = request.getParameter(name);
		return (value == null || value.equals("")) ? defaultValue : Float.parseFloat(value);
	}

	public String getString(String name) {
		return request.getParameter(name);
	}

	public String getString(String name, String defaultValue) {
		String value = request.getParameter(name);
		return (value == null || value.equals("")) ? defaultValue : value;
	}

	public String getString(String name, String encode, String decode) {
		try {
			String value = new String(request.getParameter(name).getBytes(encode), decode);
			return value;
		} catch (Exception e) {
			return "";
		}
	}

	public String toString() {
		StringBuffer returnVal = new StringBuffer();
		Enumeration<String> paramName = request.getParameterNames();
		while (paramName.hasMoreElements()) {
			String param = paramName.nextElement();
			if (request.getParameterValues(param) != null) {
				returnVal.append("name=[" + param + "] value=[" + request.getParameterValues(param)[0] + "]\n");
				for (int i = 0; i < request.getParameterValues(param).length; i++) {
					returnVal.append("name=[" + param + i + "] value=[" + request.getParameterValues(param)[i] + "]\n");
				}
			} else {
				returnVal.append("name=[" + param + "] value=[" + request.getParameter(param) + "]\n");
			}
		}

		return returnVal.toString();
	}
}
