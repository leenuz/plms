package com.slsolution.plms.model;

import lombok.Builder;
import lombok.Data;
import lombok.NonNull;

@Builder
@Data
public class BoardModel {
	private int id;
	@NonNull @Builder.Default private String title = "No Title";
	@NonNull @Builder.Default private String contents = "No Contents";
	@NonNull @Builder.Default private String use_yn = "No option";
	@NonNull @Builder.Default private String register_id = "No option";
	

}
