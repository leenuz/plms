/**
 * land_searchResultsPopup2.js
 */

var searchTargetAddressAll;
var searchTargetAddressInfo;

$(document).ready(function() {
	init();
});

$(window).on('load', function(){
	leftbarSelected();
})


//스크립트 확인
function init() {
	console.log('commonAddrSearch Activate...');
}

//*****************************************************************************
//***************************셀렉트박스 스크립트 [S]**********************************
//*****************************************************************************
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
		$("#sidoSelectValue").removeClass('active');	// focus효과
	} else {
		ulElement.addClass('active');
		$("#sidoSelectValue").addClass('active');
	}
	
	//초기화
	$("#sigunguSelectValue").text('선택');
	$("#emdSelectValue").text('선택');
	$("#riSelectValue").text('선택');
	
	
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
		$("#sigunguSelectValue").removeClass('active');
	} else {
		ulElement.addClass('active');
		$("#sigunguSelectValue").addClass('active');
	}
	
	$("#emdSelectValue").text('선택');
	$("#riSelectValue").text('선택');
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
			searchRemainAddress('ri');	//읍면동 검색
		});
		
	});
	
	if(ulElement.hasClass('active')) {
		ulElement.removeClass('active');
		$("#emdSelectValue").removeClass('active');
	} else {
		ulElement.addClass('active');
		$("#emdSelectValue").addClass('active');
	}
	$("#riSelectValue").text('선택');
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
		$("#riSelectValue").removeClass('active');
	} else {
		ulElement.addClass('active');
		$("#riSelectValue").addClass('active');
	}
}
//*****************************************************************************
//***************************셀렉트박스 스크립트 [E]**********************************
//*****************************************************************************

//시군구 정보 불러오기
function searchRemainAddress(nextVal) {
	const params = jusoParamValidation();	//validation 체크
	params.SELECT_OPTION = nextVal;	// 타입값 (시군구, 읍면동, 리)
	
	//console.log(params);
	
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
		//console.log('시군구값 세팅');
		//console.log(data);
		
		let sbHtml = '';
		
		if(data.result == 'Y') {
			let sigunguList = data.selectAddressList;
			
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
		//console.log('읍면동값 세팅');
		//console.log(data);
		
		let sbHtml = '';
		
		if(data.result == 'Y') {
			let emdList = data.selectAddressList;
			
			if(emdList.length > 0) {
				for(let i = 0 ;i < emdList.length ; i++) {
					let sigunguInfo = emdList[i];
					sbHtml += '<option value="'+sigunguInfo.emd_nm+'">'+sigunguInfo.emd_nm+'</option>';
				}
				$("#emdSelectBox").empty();
				$("#emdSelectBox").append(sbHtml);
			}
		}
	} else {
		//console.log('리 세팅');
		//console.log(data);
		
		let sbHtml = '';
		
		if(data.result == 'Y') {
			let riList = data.selectAddressList;
			
			if(riList.length > 0) {
				for(let i = 0 ;i < riList.length ; i++) {
					let riInfo = riList[i];
					sbHtml += '<option value="'+riInfo.ri_nm+'">'+riInfo.ri_nm+'</option>';
				}
				$("#riSelectBox").empty();
				$("#riSelectBox").append(sbHtml);
			}
		}
	}
}


//조회하기 버튼 - 주소 검색
function commonAddressSearchGo() {
	//validation체크 (function 위치 : 하단부)
	let targetParam = targetJusoParamValidation();
	
	//validation 통과하면 주소검색
	if(targetParam) {
		console.log(targetParam);
		
		$.ajax({
			url: '/land/common/targetAddressSearch',
			data: JSON.stringify(targetParam),
			type: "POST",
			success: function(data, jqXHR) {
				makeSearchAdressList(data);
			},
			beforeSend: function() {
				//(이미지 보여주기 처리)
				//$('#load').show();
				loadingShow();
			},
			complete: function() {
				//(이미지 감추기 처리)
				//$('#load').hide();
				loadingHide();
			},
			error: function(error) {
				console.log(error);
			}
		});
		
		
	} else {
		console.log('validation check Fail');
	}
	
}

function makeSearchAdressList(data) {
	console.log(data);
	
	if(data.result == 'Y') {
		$("#targetSearchAddrList_body").empty();
		
		if(data.targetSearchAddrListSize > 0) {
			let resultList = data.targetSearchAddrList;
			searchTargetAddressAll = resultList;
			
			let listHtml = '';
		
			for(let i = 0 ; i < resultList.length ; i++) {
				
				let targetInfo = resultList[i];
				
				listHtml += '<ul class="popContents" id="resultAddrUl_'+i+'">';
				listHtml += '<li class="popContent selectLabel">';
				listHtml += '	<input type="checkbox" id="PopupLandCheckBoxResult_'+i+'" name="resultAddrCheckboxList" data-idx="'+i+'" />';
				listHtml += '	<label for="PopupLandCheckBoxResult_'+i+'"></label>';
				listHtml += '</li>';
				listHtml += '<li class="popContent popTitle_address">'+targetInfo.juso+'</li>';
				listHtml += '<li class="popContent popTitle_num">'+targetInfo.jibun+'</li>';
				listHtml += '</ul>';
			}
			
			$("#targetSearchAddrList_body").append(listHtml);
			
			//HTML에 append하고 나서 적용. (하나만 선택되도록)
			$('input[name="resultAddrCheckboxList"]').on('change', function() {
			    // 현재 체크된 체크박스 제외하고 나머지 체크박스 해제
			    $('input[name="resultAddrCheckboxList"]').not(this).prop('checked', false);
			});
		} else {
			//검색이 0이면 PNU생성 - 버튼 파란색으로 교체
			$("#makeNewPNU_Btn").removeClass().addClass('vividBlueBtn');	//원래는 grayBtnd 이거
		}
		
		
		
	} else {
		alert('주소 검색에 실패했습니다.');
	}
}

//선택등록 버튼 - 여기가 문제(우선 전역변수(searchTargetAddressInfo)로 값을 담기는 했는데...)
function selectTargetAddress() {
	let selectedIdx = $('input[name="resultAddrCheckboxList"]:checked').data('idx');
	
	searchTargetAddressInfo = searchTargetAddressAll[selectedIdx];
	console.log(searchTargetAddressInfo);
	
	//모든걸 대비한다
	$("#justone_commonAddrSearch_result").text(searchTargetAddressInfo.juso);
	$("#justone_commonAddrSearch_result").val(searchTargetAddressInfo.juso);
	$("#justone_commonAddrSearch_result_"+commonAddrTagIndex).text(searchTargetAddressInfo.juso);
	
	//지상권
	
	//점용
	
	//토지개발
	
	//회사토지
	$("#justone_commonAddrSearch_result_goverownyn_btn").text(searchTargetAddressInfo.gover_own_yn);
	$("#compLandRegSelectBox05").val(searchTargetAddressInfo.gover_own_yn);
	$("#justone_commonAddrSearch_result_jimoktext_btn").text(searchTargetAddressInfo.jimok_text);
	$("#compLandRegSelectBox06").val(searchTargetAddressInfo.jimok_text);
	
	
	//이슈
	
	
	
	
	commonAddressSearchPopupClose(); //선택하면 우선 닫기
	//팝업 초기화(reset)은 고려
	
}

//PNU 생성 버튼
function makeNewPNU_Go() {
	let newPNU_basicInfo = targetPNUParamValidation();	//입력(선택)한 정보가 필요
	
	
	//validation 통과하면 주소검색
	if(newPNU_basicInfo) {
		
		console.log(newPNU_basicInfo);
		
		$.ajax({
			url: '/land/common/makeNewPNUInfo',
			data: JSON.stringify(newPNU_basicInfo),
			type: 'POST',
			success: function(data, jqXHR) {
				makeNewPnuCheckin(data);
			},
			beforeSend: function() {
				//(이미지 보여주기 처리)
				//$('#load').show();
				loadingShow();
			},
			complete: function() {
				//(이미지 감추기 처리)
				//$('#load').hide();
				loadingHide();
			},
			error: function(error) {
				console.log(error);
			}
			
		});
		
	}
	
}

function makeNewPnuCheckin(data) {
	console.log(data);
	if(data.result == 'Y') {
		searchTargetAddressInfo = data.justMakeNewPNUInfo;
		alert('PNU 등록이 완료되었습니다.');
		commonAddressSearchPopupClose(); //선택하면 우선 닫기
		
	}
	
	
}


//********************************************************************/
//************************** validation ******************************/
//********************************************************************/
// selectbox의 주소값 validation
function jusoParamValidation() {
	let validationObj = {};
	
	if($("#sidoSelectValue").text() != '선택') {
		validationObj.SELECT_SIDO = commonNvl($("#sidoSelectValue").text(), -1);
	}
	
	if($("#sigunguSelectValue").text() != '선택') {
		validationObj.SELECT_SIGUNGU = commonNvl($("#sigunguSelectValue").text(), -1);
	}
	
	if($("#emdSelectValue").text() != '선택') {
		validationObj.SELECT_EMD = commonNvl($("#emdSelectValue").text(), -1);
	}
	
	if($("#riSelectValue").text() != '선택') {
		validationObj.SELECT_RI = commonNvl($("#riSelectValue").text(), -1);
	}
	
	
	
	return validationObj;
}

//실제 주소찾기 조회찾기 버튼눌럿을때 작동 validation
function targetJusoParamValidation() {
	let resultObj = {};
	
	//시도는 선택 하도록 해야 하지 않을까.
	if(commonNvl($("#sidoSelectValue").text(), -1) == -1 || $("#sidoSelectValue").text() == '선택') {
		alert('시,도를 선택해 주세요.');
		return false;
	}
	
	//
	resultObj.SELECT_SIDO = $("#sidoSelectValue").text();
	resultObj.SELECT_SIGUNGU = $("#sigunguSelectValue").text();
	resultObj.SELECT_EMD = $("#emdSelectValue").text();
	resultObj.SELECT_RI = $("#riSelectValue").text();
	
	resultObj.SELECT_SAN = $("#sanCheckYn").is(':checked') == true ? "2" : "1";
	resultObj.SELECT_BON = $("#bonbunInputBox").val();
	resultObj.SELECT_BU = $("#bubunInputBox").val();
	
	return resultObj;
	
}


//PNU생성 validation
function targetPNUParamValidation() {
	let resultObj = {};
	
	//시도는 선택 하도록 해야 하지 않을까.
	if(commonNvl($("#sidoSelectValue").text(), -1) == -1 || $("#sidoSelectValue").text() == '선택') {
		alert('시,도를 선택해 주세요.');
		return false;
	}
	
	//
	resultObj.SELECT_SIDO = $("#sidoSelectValue").text();
	resultObj.SELECT_SIGUNGU = $("#sigunguSelectValue").text();
	resultObj.SELECT_EMD = $("#emdSelectValue").text();
	resultObj.SELECT_RI = $("#riSelectValue").text();
	
	//읍면동값이 '읍','면'으로 값이 끝나면 리값은 필수입니다.
	const checkEmd = resultObj.SELECT_EMD.slice(-1);
	 
	if(checkEmd == '읍' || checkEmd == '면') {
		if(resultObj.SELECT_RI == '' || resultObj.SELECT_RI == '선택') {
			alert('리 값을 선택해 주세요.');
		}
	} else {	//동이면 리값은 안들어가는걸로.
		resultObj.SELECT_RI = '';
	}
	
	//본번의 값은 필수 입니다.
	resultObj.SELECT_SAN = $("#sanCheckYn").is(':checked') == true ? "2" : "1";
	resultObj.SELECT_BON = $("#bonbunInputBox").val();
	resultObj.SELECT_BU = $("#bubunInputBox").val();
	
	if(resultObj.SELECT_BON == '' || resultObj.SELECT_BON == '선택'){
		alert('본번을 입력해주세요')
		return false;
	}
	
	return resultObj;
}

function onlyNumberInput(obj) {
	obj.value = obj.value.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1');
}


//r.e.s.e.t
function commonAddressSearchPopupReset() {
	console.log('r.e.s.e.t');
}


//********************************************************


function leftbarSelected() {
	
	console.log('좌측메뉴박스');
	
	//현재 URL 체크
	const currentURL = window.location.href;
	
	let urlTextArr = currentURL.split('/');
	
	let urlCheck = "navi_" + urlTextArr[urlTextArr.length - 2];

	$("#"+urlCheck).addClass('addClick active')
}