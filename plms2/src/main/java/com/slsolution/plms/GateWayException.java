package com.slsolution.plms;

public class GateWayException extends Exception {
	private String statusCode;
	private String errorCode;
	private String errorMsg;
	private String legacyResult;
	private String legacyErrorCode;
	private String legacyErrorMsg;
	
	public GateWayException(String msg){
		super(msg);
	}
	
	/**
	 * @return the statusCode
	 */
	public String getStatusCode() {
		return statusCode;
	}



	/**
	 * @param statusCode the statusCode to set
	 */
	public void setStatusCode(String statusCode) {
		this.statusCode = statusCode;
	}



	/**
	 * @return the errorCode
	 */
	public String getErrorCode() {
		return errorCode;
	}



	/**
	 * @param errorCode the errorCode to set
	 */
	public void setErrorCode(String errorCode) {
		this.errorCode = errorCode;
	}



	/**
	 * @return the errorMsg
	 */
	public String getErrorMsg() {
		return errorMsg;
	}



	/**
	 * @param errorMsg the errorMsg to set
	 */
	public void setErrorMsg(String errorMsg) {
		this.errorMsg = errorMsg;
	}

	
	
	/**
	 * @return legacyResult
	 */
	public String getLegacyResult() {
		return legacyResult;
	}

	
	
	/**
	 * @param legacyResult set
	 */
	public void setLegacyResult(String legacyResult) {
		this.legacyResult = legacyResult;
	}


	public String getLegacyErrorCode() {
		return legacyErrorCode;
	}

	public void setLegacyErrorCode(String legacyErrorCode) {
		this.legacyErrorCode = legacyErrorCode;
	}

	public String getLegacyErrorMsg() {
		return legacyErrorMsg;
	}

	public void setLegacyErrorMsg(String legacyErrorMsg) {
		this.legacyErrorMsg = legacyErrorMsg;
	}

	
	
}