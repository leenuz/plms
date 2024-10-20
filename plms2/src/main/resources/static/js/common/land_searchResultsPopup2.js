/**
 * land_searchResultsPopup2.js
 */

$(document).ready(function() {
	init();
});

//스크립트 확인
function init() {
	console.log('commonAddrSearch Activate...');
}
//*****************************************************************************
//*****************************************************************************
//***************************셀렉트박스 스크립트 [S]**********************************
//시도 선택
function selectSido(obj) {
	//select 박스, ul요소 가져오기
	let sidoElement = $("#sidoSelectBox option");
	let ulElement = $("#sidoSelectUl");
	
	// Step 2. ul안에 기존 li요소들제거
	ulElement.empty();
	
	// Step 3. option항목들 순회
	sidoElement.each(function(index) {
		let optionTxt = $(this).val(); // 옵션의 텍스트;
		
		// Step 4. 새로운 li요소 생성하고 붙이고
		let li = `<li><button class="PopupMoreSelectBtn" id="sidoListBtn_${index}">${optionTxt}</button></li>`;
		
		// Step 5. ul에 li요소 추가
		ulElement.append(li);
		
		$("#sidoListBtn_"+index).on('click', function(){
			let selectedValue = $(this).text();  // 선택된 버튼의 텍스트
			$("#sidoSelectValue").text(selectedValue);  // 선택된 값으로 텍스트 변경
			searchRemainAddress('sigungu');	//시군구 검색
		});
		
	});
	
	if(ulElement.hasClass('active')) {
		ulElement.removeClass('active');
	} else {
		ulElement.addClass('active');
	}
}

//시군구 선택 - 위의 시도 선택 로직과 동일 - 모듈화는 나중에
function selectSigungu() {
	//select 박스, ul요소 가져오기
	let sidoElement = $("#sigunguSelectBox option");
	let ulElement = $("#sigunguSelectUl");
	
	// Step 2. ul안에 기존 li요소들제거
	ulElement.empty();
	
	// Step 3. option항목들 순회
	sidoElement.each(function(index) {
		let optionTxt = $(this).val(); // 옵션의 텍스트;
		
		// Step 4. 새로운 li요소 생성하고 붙이고
		let li = `<li><button class="PopupMoreSelectBtn" id="sigunguListBtn_${index}">${optionTxt}</button></li>`;
		
		// Step 5. ul에 li요소 추가
		ulElement.append(li);
		
		$("#sigunguListBtn_"+index).on('click', function(){
			let selectedValue = $(this).text();  // 선택된 버튼의 텍스트
			$("#sigunguSelectValue").text(selectedValue);  // 선택된 값으로 텍스트 변경
			searchRemainAddress('emd');	//읍면동 검색
		});
		
	});
	
	if(ulElement.hasClass('active')) {
		ulElement.removeClass('active');
	} else {
		ulElement.addClass('active');
	}
}

//읍면동 선택 - 위의 시도 선택 로직과 동일 - 모듈화는 나중에
function selectEmd() {
	//select 박스, ul요소 가져오기
	let sidoElement = $("#emdSelectBox option");
	let ulElement = $("#emdSelectUl");
	
	// Step 2. ul안에 기존 li요소들제거
	ulElement.empty();
	
	// Step 3. option항목들 순회
	sidoElement.each(function(index) {
		let optionTxt = $(this).val(); // 옵션의 텍스트;
		
		// Step 4. 새로운 li요소 생성하고 붙이고
		let li = `<li><button class="PopupMoreSelectBtn" id="emdListBtn_${index}">${optionTxt}</button></li>`;
		
		// Step 5. ul에 li요소 추가
		ulElement.append(li);
		
		$("#emdListBtn_"+index).on('click', function(){
			let selectedValue = $(this).text();  // 선택된 버튼의 텍스트
			$("#emdSelectValue").text(selectedValue);  // 선택된 값으로 텍스트 변경
			searchRemainAddress('emd');	//읍면동 검색
		});
		
	});
	
	if(ulElement.hasClass('active')) {
		ulElement.removeClass('active');
	} else {
		ulElement.addClass('active');
	}
}

//리 선택 - 위의 시도 선택 로직과 동일 - 모듈화는 나중에
function selectRi() {
	//select 박스, ul요소 가져오기
	let sidoElement = $("#riSelectBox option");
	let ulElement = $("#riSelectUl");
	
	// Step 2. ul안에 기존 li요소들제거
	ulElement.empty();
	
	// Step 3. option항목들 순회
	sidoElement.each(function(index) {
		let optionTxt = $(this).val(); // 옵션의 텍스트;
		
		// Step 4. 새로운 li요소 생성하고 붙이고
		let li = `<li><button class="PopupMoreSelectBtn" id="riListBtn_${index}">${optionTxt}</button></li>`;
		
		// Step 5. ul에 li요소 추가
		ulElement.append(li);
		
		$("#riListBtn_"+index).on('click', function(){
			let selectedValue = $(this).text();  // 선택된 버튼의 텍스트
			$("#riSelectValue").text(selectedValue);  // 선택된 값으로 텍스트 변경
			//searchRemainAddress('ri');	//리 검색...은 안해도되지 않나?
		});
		
	});
	
	if(ulElement.hasClass('active')) {
		ulElement.removeClass('active');
	} else {
		ulElement.addClass('active');
	}
}
//*****************************************************************************
//***************************셀렉트박스 스크립트 [E]**********************************
//*****************************************************************************

//시군구 정보 불러오기
function searchRemainAddress(nextVal) {
	const params = jusoParamValidation();	//validation 체크
	params.SELECT_OPTION = nextVal;	// 타입값 (시군구, 읍면동, 리)
	
	console.log(params);
	
	$.ajax({
		url: '/land/common/searchRemainAddress',
		data: JSON.stringify(params),
		type: "POST",
		success: function (data) {
			makeSelectBoxContentFunc(data, nextVal);
		},
		error: function(error) {
			alert('주소 검색에 실패했습니다.');
		}
	});
}

function makeSelectBoxContentFunc(data, nextVal){
	
	if(nextVal == 'sigungu') {
		console.log('시군구값 세팅');
		console.log(data);
		
		let sbHtml = '';
		
		if(data.result == 'Y') {
			let sigunguList = data.sigunguList;
			
			if(sigunguList.length > 0) {
				for(let i = 0 ;i < sigunguList.length ; i++) {
					let sigunguInfo = sigunguList[i];
					sbHtml += '<option value="'+sigunguInfo.sgg_nm+'">'+sigunguInfo.sgg_nm+'</option>';
				}
				$("#sigunguSelectBox").empty();
				$("#sigunguSelectBox").append(sbHtml);
			}
		}
		
		
	} else if(nextVal == 'emd') {
		console.log('읍면동값 세팅');
		console.log(data);
	}
}

// 주소값 validation
function jusoParamValidation() {
	let validationObj = {};
	
	if($("#sidoSelectValue").text() != '선택') {
		validationObj.SELECT_SIDO = commonNvl($("#sidoSelectValue").text(), -1);
	}
	
	if($("#sigunguSelectValue").text() != '선택') {
		validationObj.SELECT_SIGUNGU = commonNvl($("#sigunguSelectValue").text(), -1);
	}
	
	if($("#emdSelectValue").text() != '선택') {
		
	}
	
	if() {
		
	}
	
	
	validationObj.SELECT_EMD = commonNvl($("#emdSelectValue").text(), -1);
	validationObj.SELECT_RI = commonNvl($("#riSelectValue").text(), -1);
	
	return validationObj;
}