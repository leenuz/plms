var fileRowCount = 0;	//첨부파일카운트

//일반 실행 == $(document).ready(function(){})
$(function() {
	console.log("---------- start menu06_1.js ------------");
	var formSerializeArray = $('#searchForm').serializeArray();
	var object = {};
	for (var i = 0; i < formSerializeArray.length; i++) {
		if (formSerializeArray[i]['value'] === '전체') {
			continue; // "전체"가 선택된 경우, 해당 파라미터를 넘기지 않음
		}
		object[formSerializeArray[i]['name']] = formSerializeArray[i]['value'];
	}

	var json = JSON.stringify(formSerializeArray);

	console.log("----------jsonobj------------");
	console.log(json);
	console.log("object issueManageRadio01:" + object.issueManageRadio01);

	//loadDataTable(object);
	console.log("-----------------------");
	
	//드래그 앤 드롭 영역 파일 첨부 관련 코드
	let objDragAndDrop = $("#newminwon_fileUploadBox");
	
	// 드래그 앤 드롭 영역에 파일이 들어왔을 때
	$("#newminwon_fileUploadBox").on("dragenter", function(e) {
	    e.stopPropagation();
	    e.preventDefault();
	    $(this).css('border', '2px solid #0B85A1');
	});

	// 드래그 앤 드롭 영역에서 파일을 드래그할 때
	$("#newminwon_fileUploadBox").on("dragover", function(e) {
	    e.stopPropagation();
	    e.preventDefault();
	});
	
	// 드래그 앤 드롭 영역에서 파일을 드래그할 때
	$("#newminwon_fileUploadBox").on("dragover", function(e) {
	    e.stopPropagation();
	    e.preventDefault();
	});
	
	// 파일을 드롭할 때
	$("#newminwon_fileUploadBox").on("drop", function(e) {
	    e.preventDefault();
	    $(this).css('border', '2px dotted #0B85A1');
	    var files = e.originalEvent.dataTransfer.files; // 드래그한 파일 객체를 가져옴
	    handleFileUpload(files, $(this));  // 파일 처리 함수 호출
	});
	
	$('input[type=file][name="fileUpload"]').on('change', function(e) {
	    var files = e.originalEvent.target.files; // 파일 선택창에서 선택된 파일들
	    console.log('파일업로드');
	    handleFileUpload(files, objDragAndDrop);  // 선택된 파일들을 처리하는 함수 호출
	});
	
	//페이지 로드 후 리스트 조회
	minwonListSearch();
})

/* 이슈보기팝업 */
const IssuePopupOpenEvet = () => {
	const issuePopBtn = document.querySelectorAll("#dopcoIssueManage .issuePopBtn");
	const issueManageIssuePopWrap = document.querySelector(".issueManageIssuePopWrapper");
	let issuePopFilePath = '/components/popuphtml/issue_management_Popup/issue_Popup.html'; // 삽입할 html 파일 경로

	if (issuePopBtn) {
		// let xhr = new XMLHttpRequest();
		// xhr.open('GET', issuePopFilePath, true);
		// xhr.onreadystatechange = function () {
		//     if (xhr.readyState == 4 && xhr.status == 200) {
		//         issueManageIssuePopWrap.innerHTML = xhr.responseText;
		//         runScriptsInElement(issueManageIssuePopWrap); // 삽입된 html내 스크립트 실행 함수 호출
		//     }
		// };
		// xhr.send();
		// console.log('issueManageIssuePopWrap 작동');

		issuePopBtn.forEach((btn) => {
			btn.addEventListener("click", () => {
				const popupOpen = document.getElementById("issuePopup");
				if (popupOpen) {
					popupOpen.classList.add("active");
				}
			})
		})

		// 삽입된 html내 스크립트 실행 함수
		const runScriptsInElement = (element) => {
			const scripts = element.getElementsByTagName('script');
			for (let i = 0; i < scripts.length; i++) {
				const script = document.createElement('script');
				script.textContent = scripts[i].textContent;
				document.body.appendChild(script).parentNode.removeChild(script);
			}
		}
	}
}
// IssuePopupOpenEvet();

/* 신규민원등록 팝업 */
const newIssueRegisterOpenEvet = () => {
	const newIssueBtn = document.querySelector("#dopcoIssueManage .newIssueBtn");
	const issueManageNewIssuePopWrap = document.querySelector(".issueManageNewIssuePopWrapper");
	let newIssuePopFilePath = '/components/popuphtml/issue_management_Popup/newcomplaint.html'; // 삽입할 html 파일 경로
	if (newIssueBtn) {
		// let xhr = new XMLHttpRequest();
		// xhr.open('GET', newIssuePopFilePath, true);
		// xhr.onreadystatechange = function () {
		//     if (xhr.readyState == 4 && xhr.status == 200) {
		//         issueManageNewIssuePopWrap.innerHTML = xhr.responseText;
		//         runScriptsInElement(issueManageNewIssuePopWrap); // 삽입된 html내 스크립트 실행 함수 호출
		//     }
		// };
		// xhr.send();
		// console.log('issueManageNewIssuePopWrap 작동');
		
		newIssueBtn.addEventListener("click", () => {
			loadingShow();
			$('#mask').css('z-index','1');
			const popupOpen = document.getElementById("newcomplaint_Popup");
			if (popupOpen) {
				popupOpen.classList.add("active");
				// js 추가
				const issueManageLandStatusPopWrapper = document.querySelector(".issueManageLandStatusPopWrapper");
				if (issueManageLandStatusPopWrapper.classList.contains('passed')) { return };

				let landStatusPopFilePath = '/components/popuphtml/issueCodePopup/landStatusPop.html'; // 삽입할 html 파일 경로

				let xhr = new XMLHttpRequest();
				xhr.open('GET', landStatusPopFilePath, true);
				xhr.onreadystatechange = function() {
					if (xhr.readyState == 4 && xhr.status == 200) {
						issueManageLandStatusPopWrapper.innerHTML = xhr.responseText;
						runScriptsInElement(issueManageLandStatusPopWrapper); // 삽입된 html내 스크립트 실행 함수 호출
					}
				};
				xhr.send();
				console.log('issueManageLandStatusPopWrapper 작동');

				issueManageLandStatusPopWrapper.classList.add('passed')
			}
		})

		// 삽입된 html내 스크립트 실행 함수
		const runScriptsInElement = (element) => {
			const scripts = element.getElementsByTagName('script');
			for (let i = 0; i < scripts.length; i++) {
				const script = document.createElement('script');
				script.textContent = scripts[i].textContent;
				document.body.appendChild(script).parentNode.removeChild(script);
			}
		}
		
		//등록한 내용이 있다면 reset
		
	}
	
}
newIssueRegisterOpenEvet()


// /* 현황통계 팝업 오픈 */
// const issueTotalPopOpenEvet = () => {
//     const issueManageTotalBtn = document.querySelector("#dopcoIssueManage .issueManageTotalBtn");
//     const issueManageIssueTotalPopWrap = document.querySelector(".issueManageIssueTotalWrapper");
//     let issueTotalPopFilePath = '/components/popuphtml/issueTotalPop.html'; // 삽입할 html 파일 경로

//     if (issueManageTotalBtn) {
//         // let xhr = new XMLHttpRequest();
//         // xhr.open('GET', issueTotalPopFilePath, true);
//         // xhr.onreadystatechange = function () {
//         //     if (xhr.readyState == 4 && xhr.status == 200) {
//         //         issueManageIssueTotalPopWrap.innerHTML = xhr.responseText;
//         //         runScriptsInElement(issueManageIssueTotalPopWrap); // 삽입된 html내 스크립트 실행 함수 호출
//         //     }
//         // };
//         // xhr.send();
//         // console.log('issueManageIssueTotalPopWrap 작동');

//         issueManageTotalBtn.addEventListener("click", () => {

//             const popupOpen = document.getElementById("issueTotalPopContent");
//             if (popupOpen) {
//                 popupOpen.classList.add("active");
//             }
//         })

//         // 삽입된 html내 스크립트 실행 함수
//         const runScriptsInElement = (element) => {
//             const scripts = element.getElementsByTagName('script');
//             for (let i = 0; i < scripts.length; i++) {
//                 const script = document.createElement('script');
//                 script.textContent = scripts[i].textContent;
//                 document.body.appendChild(script).parentNode.removeChild(script);
//             }
//         }
//     }
// }

// issueTotalPopOpenEvet()

/* x표시 클릭시 닫기 */

const issueTotalcloseBtn = document.querySelector(".issueTotalcloseBtn");
const issueTotalPopContentWrap = document.getElementById("issueTotalPopContent");

if (issueTotalcloseBtn) {
	issueTotalcloseBtn.addEventListener("click", () => {
		issueTotalPopContentWrap.classList.remove("active");
	})
}

/* 셀렉트박스 함수 */

const issueTotalSelectEvet = (reload = false) => {

	const issueTotalSelectsTitleBtn = document.querySelectorAll(".issueTotalPopWrap .issueTotalSelectsTitleBtn");
	const issueTotalSelectList = document.querySelectorAll(".issueTotalPopWrap .sufaceSelectList");
	const issueTotalSelectListMember = document.querySelectorAll(".issueTotalPopWrap .sufaceSelectList .surfaceSelectListMember");
	const issueTotalselectWrappers = document.querySelectorAll(".issueTotalHiddenSelect"); //셀렉박스


	let issueTotalAnswer = "";
	let issueTotalCheckAnswer = "";

	//셀렉버튼 최초값 함수
	const initialValues = () => {
		if (issueTotalselectWrappers.length > 0) {
			for (let d = 0; d <= issueTotalselectWrappers.length - 1; d++) {

				let issueTotalselectValuesInitial = issueTotalselectWrappers[d].children;
				issueTotalSelectsTitleBtn[d].innerText = issueTotalselectValuesInitial[0].value; //셀렉박스의 첫번째 값들이 surfaceSelectsTitleBtn값의 첫 값이 됨
				issueTotalselectWrappers[d].value = issueTotalSelectsTitleBtn[d].innerText; //셀렉박스의 value값을 surfaceSelectsTitleBtn값으로 설정

				//    if(issueTotalSelectListMember[d].classList.contains("selectChoice")){ 
				//       issueTotalSelectsTitleBtn[d].innerText = `전체`;
				//       }
			}
		}
	}

	if (issueTotalselectWrappers.length > 0) {

		initialValues();//최초의값

		//체크박스가 아닐 경우, 셀렉박스 값  li p값에 담기 
		for (let i = 0; i <= issueTotalselectWrappers.length - 1; i++) {

			const selectValues = issueTotalselectWrappers[i].children; //셀렉박스옵션값 

			for (let x = 0; x <= selectValues.length - 1; x++) {

				issueTotalAnswer += `<li><p>${selectValues[x].value}</p></li>`;

				//체크박스가 있는 경우, 셀렉박스 값 li input p 값 이용
				if (issueTotalSelectListMember[i].classList.contains("checkBoxsContent")) { //체크박스
					issueTotalCheckAnswer += `<li>
           <input
             type="checkbox"
             id="issueTotalPopCheckBox0${x + 1}"
             name="issueTotalPopCheck" />
           <label for="issueTotalPopCheckBox0${x + 1}"></label><p>${selectValues[x].value}</p></li>`
				}
			}

			issueTotalSelectListMember[i].innerHTML = issueTotalSelectListMember[i].classList.contains("checkBoxsContent") ? issueTotalCheckAnswer : issueTotalAnswer;
			issueTotalAnswer = '';
			issueTotalCheckAnswer = '';
		}
	}

	if (reload) {
		return;
	}

	issueTotalSelectsTitleBtn.forEach((btns, index) => {

		btns.addEventListener("click", () => {
			const nextSiblings = btns.nextElementSibling;

			issueTotalSelectsTitleBtn.forEach((otherBtn) => {
				if (otherBtn !== btns) {
					otherBtn.classList.remove("active");
				}
			});
			btns.classList.toggle("active");
			nextSiblings.classList.toggle("active");

			//surfaceSelectList관련 toggle버튼
			issueTotalSelectList.forEach((box, boxIndex) => {
				//셀렉버튼의 인덱스와  surfaceSelectList 인덱스번호가 일치하면 메뉴를 오픈하고, btn에 active를 포함
				if (index === boxIndex) {
					box.classList.toggle(
						"active",
						btns.classList.contains("active")
					);
				} else {
					//그렇지 않으면 메뉴닫기
					box.classList.remove("active");
				}
			});

		});


	});

	issueTotalSelectList.forEach((list) => {
		list.addEventListener("click", (event) => {

			const thisBtns = event.target.parentElement.parentElement.parentElement.previousElementSibling;
			const selectContent = event.target.parentElement.parentElement.parentElement.parentElement.previousElementSibling.children[0];//셀렉박스
			let currentSelect = selectContent.getAttribute("id");//셀렉박스아이디 가져오기

			if (event.target.nodeName === "P") {

				//빌생지사클릭시
				if (currentSelect === "issueTotalHiddenSelectBox01") {
					return issueTotalSelectsTitleBtn.forEach((btn) => btn.classList.remove("active")),
						issueTotalSelectList.forEach((lists) => lists.classList.remove("active"));
				} else {
					let currentSelectValue = document.getElementById(currentSelect); //현재 셀렉박스 가져오기

					return thisBtns.innerText = event.target.innerText,
						$(currentSelectValue).val(event.target.innerText),//셀렉박스 값에 현재 클릭된 값의 텍스트 담기 
						console.log(currentSelectValue.value), //셀렉박스값표시
						selectMinwonStatusStatis(false),
						issueTotalSelectsTitleBtn.forEach((btn) => btn.classList.remove("active")),
						issueTotalSelectList.forEach((lists) => lists.classList.remove("active"));
				}

			}

			if (event.target.nodeName === "LABEL" || event.target.nodeName === "INPUT[TYPE='CHECKBOX']") { return; }


		});

	});

}


issueTotalSelectEvet();


/* 체크박스 함수 */

const issueTatalCheckboxes = (checkboxes) => {
	const issueTotalPopCheck = document.getElementsByName("issueTotalPopCheck");
	checkboxes = issueTotalPopCheck;

	const valuesArray = []; //셀렉박스 값 저장할 배열

	if (checkboxes) {
		Array.from(checkboxes).forEach((checkBtn, index) => {

			//버튼 내 p값 가져오기 
			const values = checkBtn.nextElementSibling.nextElementSibling.innerText;

			checkBtn.addEventListener("change", () => {

				//체크박스를 체크했을 때
				if (checkBtn.checked) {
					// 첫 번째 체크박스가 체크되었을 때
					if (index === 0) {
						// 나머지 체크박스들의 체크 상태를 해제, 배열에서 제거
						for (let i = 1; i < checkboxes.length; i++) {
							checkboxes[i].checked = false; // 체크 해제
							const valueToRemove = checkboxes[i].nextElementSibling.nextElementSibling.innerText;
							const indexToRemove = valuesArray.indexOf(valueToRemove);
							if (indexToRemove !== -1) {
								valuesArray.splice(indexToRemove, 1); // 배열에서 제거
							}
						}
					} else {
						// 첫 번째 체크박스가 체크되어 있을 때, 다른 체크박스를 체크하면 첫 번째 체크박스 해제
						checkboxes[0].checked = false;
						const valueToRemove = checkboxes[0].nextElementSibling.nextElementSibling.innerText;
						const indexToRemove = valuesArray.indexOf(valueToRemove);
						if (indexToRemove !== -1) {
							valuesArray.splice(indexToRemove, 1); // 배열에서 제거
						}
					}

					// 배열에 값 추가
					valuesArray.push(values);
				} else {
					// 체크박스가 체크 해제되었을 때 배열에서 값 제거
					const index = valuesArray.indexOf(values);
					if (index !== -1) {
						valuesArray.splice(index, 1);
					}

					//체크박스가 모두 해제시 전체 체크박스 체크
					if (valuesArray.length <= 0) {
						checkboxes[0].checked = true;
						valuesArray.push(checkboxes[0].nextElementSibling.nextElementSibling.innerText);
					}
				}

				// 변경된 배열 값을 버튼의 텍스트에 삽입
				const displayElement = checkboxes[0].parentElement.parentElement.parentElement.previousElementSibling;
				displayElement.innerText = valuesArray.join(', '); // 배열을 문자열로 변환해서 출력


				selectMinwonStatusStatis(false);

			});
		});

	}

}

issueTatalCheckboxes();



//팝업 숨김
function closeComplaintregisterPopup() {
	const complaintregisterPopupOpen = document.getElementById("newcomplaint_Popup");
	complaintregisterPopupOpen.classList.remove("active");
}


//신규민원팝업 데이터 json
function getPopupJsonData() {
	
	var formSerializeArray = $('#saveFormPop').serializeArray();
	len = formSerializeArray.length;
	
	var dataObj = {};	//return할 param 내용
	
	for(let i = 0; i < len; i++) {
		dataObj[formSerializeArray[i].name] = formSerializeArray[i].value;
	}

	dataObj.JISA = (ljsIsNull(dataObj.JISA) || dataObj.JISA == "전체") ? '' : dataObj.JISA;

	//토지 정보 세팅
	dataObj.tojiList = [];
	
	$(".landinfo_box .landinfo_content").each(function(index, ul) {
		let addrInfoStr = $(ul).find('.landinfo_content_8 input').val();
		
		if(commonNvl(addrInfoStr, "none") == "none") {
			alert('주소 정보가 없습니다.');
			return false;
		}
		
		let obj = JSON.parse(addrInfoStr); // 각 UL에 대한 개별 객체 생성
		//let obj = {};
		obj.saddr = $(ul).find('.landinfo_content_4 input').val(); //주소
		obj.REP_YN = $(ul).find('.landinfo_content_3 input').is(':checked') ? "Y" : "N"; //대표필지여부
		obj.REGISTED_YN = $(ul).find('.landinfo_content_5 input').val(); //등기여부
		obj.PERMITTED_YN = $(ul).find('.landinfo_content_6 input').val(); //계약여부
		obj.AREA = $(ul).find('.landinfo_content_7 input').val(); //실저촉면적
		dataObj.tojiList.push(JSON.stringify(obj));
	});
	
	dataObj.TOJI_LENGTH = dataObj.tojiList.length;

	//민원인/토지주 정보
	dataObj.userList = [];
	
	$(".com_content_contents_1 .landowner_wrap").each(function(index, ul) {
		var obj = {}; // 각 UL에 대한 개별 객체 생성
		obj.num = $(ul).find('input').eq(0).val() //순번
		obj.name = $(ul).find('input').eq(1).val(); //성명
		obj.birth_date = $(ul).find('input').eq(2).val(); //생년월일
		obj.relation = $(ul).find('input').eq(3).val(); //토지주와 관계
		obj.phone = $(ul).find('input').eq(4).val(); //연락처
		obj.attendance = $(ul).find('select').val(); //현장입회
		dataObj.userList.push(obj);
	});

	//첨부파일
	//const newComplaintRegiPopup_myPcFiles = document.getElementById("complaint_contents_contents3_Popup_file");
	//const newComplaintRegiFiles = newComplaintRegiPopup_myPcFiles.files;
	
	let fileCheck = [];
	
	for(let t = 0 ; t < $("#fileTitleUl").children().length ; t++){
		fileCheck.push($("#minwonFileName_"+t).text());
	}
	
	
	//dataObj.files = newComplaintRegiFiles;
	//dataObj.filesLength = newComplaintRegiFiles.length;
	fileCheck.pop();
	dataObj.files = fileCheck;
	dataObj.filesLength = fileCheck.length;

	//신규 파일은 SEQ가 없음
	dataObj.MW_SEQ = "0";
	
	let dateCheck = $("input[name='MW_OCCUR_DATE']").val();
	if( dateCheck == '' ) {
		dateCheck = today_yyyymmdd();	//오늘 날짜로 변환(yyyymmdd)
	}
	
	dataObj.MW_OCCUR_DATE = dateCheck;
	dataObj.SANGSIN_FLAG = 'N';
	
	let min_to_nameArr = '';
	let min_to_birthArr = '';
	let min_to_relationArr = '';
	let min_to_phoneArr = '';
	let min_to_presenceArr = '';
	
	//신규
	for(let p = 0 ; p < $("#minwonin_totiju_body").children().length ; p++) {
		let ownerNm = commonNvl( $("#landowner_name_"+(p+1)).val() , "-" ) + "|";
		let ownerBirth = commonNvl( $("#landowner_birthday_"+(p+1)).val(), "-" )  + "|";
		let ownerRelation = commonNvl( $("#landowner_relation_"+(p+1)).val(), "-" )  + "|";
		let ownerPhone = commonNvl( $("#landowner_phone_"+(p+1)).val(), "-" )  + "|";
		let owerPresence = commonNvl( $("#landowner_presence"+(p+1)).text(), "N" )  + "|";
		/*
		min_to_nameArr.push(ownerNm);
		min_to_birthArr.push(ownerBirth);
		min_to_relationArr.push(ownerRelation);
		min_to_phoneArr.push(ownerPhone);
		min_to_presenceArr.push(owerPresence);
		*/
		min_to_nameArr += ownerNm;
		min_to_birthArr += ownerBirth;
		min_to_relationArr += ownerRelation;
		min_to_phoneArr += ownerPhone;
		min_to_presenceArr += owerPresence;
	}
	
	dataObj.min_to_nameArr = min_to_nameArr.slice(0, -1);
	dataObj.min_to_birthArr = min_to_birthArr.slice(0, -1);
	dataObj.min_to_relationArr = min_to_relationArr.slice(0, -1);
	dataObj.min_to_phoneArr = min_to_phoneArr.slice(0, -1);
	dataObj.min_to_presenceArr = min_to_presenceArr.slice(0, -1);

	return dataObj;
}

//신규민원 -> 신규 민원 저장
$(document).on("click", "#newcomplaint_Popup .approveBtn", function() {
	var data = getPopupJsonData();	//form안의 입력한 깂들 object화하는 function 
	console.log(data);
	
	if(data.MW_TITLE == '' || data.MW_TITLE.length == 0) {
		alert('민원명을 입력해 주세요.');
		return false;
	}
	
	
	$.ajax({
		url: "/issue/saveMinwonData",
		data: JSON.stringify(data),
		async: true,
		type: "POST",
		dataType: "json",
		contentType: 'application/json; charset=utf-8',
		processData: false,
		success: function(data, jqXHR) {
			console.log(data);
			if (data.message != null && data.message != undefined && data.message == "success") {
				alert('저장하였습니다.');
				//closeComplaintregisterPopup();
			} else {
				alert(data.message);
			}
		},
		beforeSend: function() {
			//(이미지 보여주기 처리)
			//$('#load').show();
			// loadingShow();
		},
		complete: function() {
			//(이미지 감추기 처리)
			//$('#load').hide();
			// loadingHide();
		},
		error: function(jqXHR, textStatus, errorThrown, responseText) {
			//alert("ajax error \n" + textStatus + " : " + errorThrown);
			console.log(jqXHR);
			console.log(jqXHR.readyState);
			//console.log(jqXHR.responseText);
			console.log(jqXHR.responseJSON);
		}
	}); //end ajax
	
});
//신규민원 -> 상신
$(document).on("click", "#newcomplaint_Popup .sangsinBtn", function() {
	var data = getPopupJsonData();
	data.SANGSIN_FLAG = 'Y';
	console.log(data);

	$.ajax({
		url: "/issue/saveMinwonData",
		data: JSON.stringify(data),
		async: true,
		type: "POST",
		dataType: "json",
		contentType: 'application/json; charset=utf-8',
		processData: false,
		success: function(data, jqXHR) {
			console.log(data);
			if (data.message != null && data.message != undefined && data.message == "success") {
				
				
				if (data.html.length>0){
					var urls = data.html;
					var newWindow=window.open("", "상신", "width=1200, height=700, toolbar=no, menubar=no, scrollbars=yes, resizable=yes");
					newWindow.document.open();
					newWindow.document.write(data.html);
					newWindow.document.close();
				}
				else {
					var urls = data.OUT_URL;
					window.open(urls, "상신", "width=1200, height=700, toolbar=no, menubar=no, scrollbars=yes, resizable=yes");	
				}
				
			//	closeComplaintregisterPopup();
			} else {
				alert(data.message);
			}
		},
		beforeSend: function() {
			//(이미지 보여주기 처리)
			//$('#load').show();
			// loadingShow();
		},
		complete: function() {
			//(이미지 감추기 처리)
			//$('#load').hide();
			// loadingHide();
		},
		error: function(jqXHR, textStatus, errorThrown, responseText) {
			//alert("ajax error \n" + textStatus + " : " + errorThrown);
			console.log(jqXHR);
			console.log(jqXHR.readyState);
			console.log(jqXHR.responseText);
			console.log(jqXHR.responseJSON);
		}
	}); //end ajax
});

//신규민원 -> 주소 검색
var togiDataList = [];
$(document).on("click", ".landinfo .landStatusPopOpenBtn", function() {
	
	//const targetId = $(this).closest("li").siblings(".landinfo_content_4").attr('id');
	const targetId = 'minwonAddr_' + ($(this).val());
	const targetIdx = $(this).val();
	var addr = $(this).parent().find("input").val().trim();
	
	console.log($(this).closest(".landinfo_content_4").val());
	console.log(targetId);
	
	if (addr == null || addr == "" || addr == undefined) {
		alert("주소를 입력해주세요.");
		return;
	}
	
	//const popupLayout = $('#landStatusPopup');
	loadingShow();
	$.ajax({
		url: "/issue/getMinwonJijukSelectNotModel",
		type: "POST",
		data: { "address": addr },
		success: function(response) {
			console.log('아래 .done으로 대체');
			//console.log(response);
			/*
			const datas = response.result;
			togiDataList = datas;
			const popContentBox = popupLayout.find('.popContentBox');
			if (datas.length > 0) {
				popContentBox.empty(); //자식 요소 모두 제거
				$.each(datas, function(index, item) {
					var newItem = `
                            <ul class="popContents">
                                <input type="hidden" name="addrInfoStr" value='`+ JSON.stringify(item) + `'/>
                                <li class="popContent01">
                                    <p>${item.pnu}</p>
                                </li>
                                <li class="popContent02">
                                    <p>${item.juso}</p>
                                </li>
                                <li class="popContent03">
                                    <p>${item.jibun}</p>
                                </li>
                                <li class="popContent04">
                                    <button class="resultSelectBtn" onclick="resultSelectBtnClick(this, ${idx - 1}, ${index})">선택</button>
                                </li>
                                <li class="popContent05">
                                    <p></p>
                                </li>
                            </ul>`;
					popContentBox.append(newItem);
				});
				popupLayout.addClass('active');
			} else {
				alert("검색 된 결과가 없습니다.")
				console.log("response.length = 0");
			}
			*/
		},
		error: function(xhr, status, error) {
			console.log("Error: " + error);
		}
	}).done(function (fragment) {
		// var buttonIdx = fragment.find('button#choiceBtn');
		// buttonIdx.attr('data-index', buttonId);
		//console.log("***fragment***");
		//console.log(fragment);
		loadingHide();
		$('#minwon_searchResultPopDiv').replaceWith(fragment);
		
		const popupOpen = document.querySelector("#minwon_searchResultPopDiv .popupWrap");
		//console.log($(popupOpen).html());
		
		$(popupOpen).addClass("open");
		popupOpen.classList.add("active");
		
		$('.resultSelectBtn').attr('data-index', targetIdx);
		$('.saveBtn').attr('data-index', targetIdx);
   	});
});

//대표 필지정보 입력
function setReqLand(addr = "", reg_yn = "", contract_yn = "") {
	$('.daepyo_pilji_list_1 input[type="text"]').val(addr); //주소
	$('.daepyo_pilji_list_2 input[type="text"]').val(reg_yn);  //등기여부
	$('.daepyo_pilji_list_3 input[type="text"]').val(contract_yn); //계약여부
}

//신규민원 -> 검색 -> 선택 버튼
const resultSelectBtnClick = function(view, ulIdx, dataIdx) {
	const address = togiDataList[dataIdx].juso;
	const master_yn = togiDataList[dataIdx].master_yn;
	const registed_yn = togiDataList[dataIdx].comple_yn;
	const permitted_yn = togiDataList[dataIdx].permitted_yn;
	const addrInfoStr = view.parentElement.parentElement.querySelector('input[name=addrInfoStr]').value;
	console.log(addrInfoStr);
	//체크박스
	if (master_yn == "Y") {
		$('.approve_checkbox').prop('checked', false);
		$(".landinfo_content_3 input[type='checkbox']").eq(ulIdx).prop('checked', true);
		//대표 필지 정보 입력
		setReqLand(address, registed_yn, permitted_yn)
	}
	$(".landinfo_content_4 input[type='text']").eq(ulIdx).val(address);  //주소
	$('.landinfo_content_5 input[type="text"]').eq(ulIdx).val(registed_yn);  //등기여부
	$('.landinfo_content_6 input[type="text"]').eq(ulIdx).val(permitted_yn); //계약여부
	$('.landinfo_content_8 input[type="hidden"]').eq(ulIdx).val(addrInfoStr); //계약여부

	$('#landStatusPopup').removeClass('active');
}

$(document).on("change", ".approve_checkbox", function() {
	// 선택된 체크박스가 체크된 경우
	if ($(this).is(":checked")) {
		// 현재 체크박스를 제외한 다른 체크박스의 체크 해제
		$(".approve_checkbox").not(this).prop("checked", false);
		const info = $(this).closest("ul");
		const juso = info.find(".landinfo_content_4 input[type='text']").val()
		const content_5 = info.find(".landinfo_content_5 input[type='text']").val()
		const content_6 = info.find(".landinfo_content_6 input[type='text']").val()
		setReqLand(juso, content_5, content_6);
	} else {
		if ($('.landinfo_box input[type="checkbox"]:checked').length === 0) {
			setReqLand();
		}
	}
});

var saveJsonData = [];
function loadDataTable(params) {
	
	console.log("-----start loadDataTable----------");
	
	console.log("Params:", params); // params 객체 출력

	//var json=JSON.stringify(params);
	
	table = $('#userTable').DataTable({
		// fixedColumns: {
		//     start: 3,
		// },
		scrollCollapse: true,
		scrollX: true,
		scrollY: 600,
		paging: true,
		"oLanguage": { "sLengthMenu": "_MENU_" },
		dom: '<"top"<"dt-title">Bl><"dt-center-in-div"r><"bottom"tp><"clear">',
		buttons: [{ extend: 'excel', text: '엑셀 다운로드' }],
		pageLength: 50,
		bPaginate: true,
		bLengthChange: true,
		bInfo: false,
		lengthMenu: [[10, 50, 100, -1], ["10건", "50건", "100건", "All"]],
		bAutoWidth: false,
		processing: true,
		ordering: true,
		bServerSide: true,
		searching: false,
		destroy: true,
		order: [[12, 'desc']],
		rowReorder: {
			dataSrc: 'b_seq'
		},
		ajax: {
			url: "/issue/menu06_1DataTableList",
			type: "POST",
			datatype: "json",
			data: function(d) {
				//d=params;
				d.jisa = ljsIsNull(params.jisa) ? '' : params.jisa;
				d.start_date = params.start_date;
				d.end_date = params.end_date;

				d.code1 = params.depth1Code;
				d.code2 = params.depth2Code;
				d.code3 = params.depth3Code;
				d.mw_title = params.mw_title;

				//d.status = findProgStatus(params.status)
				d.status = params.status;
				
				//주소
				var ask = (params.issueManageRadio01 == undefined || params.issueManageRadio01 == null) ? '0' : params.issueManageRadio01;
				console.log("issueManageRadio01:" + ask);

				//입력형 주소 입력 시
				if (ask == "0") {
					console.log("---------3--------------");
					d.saddr = (params.addressFull == undefined || params.addressFull == null) ? '' : params.addressFull;
				}
				//선택형 주소 입력 시
				else {
					console.log("----------------------------1--------------");
					console.log(ljsIsNull(params.sgg));
					var addrs = params.sido;
					console.log("addrs:" + addrs);
					if (ljsIsNull(params.sgg)) addrs = addrs + "";
					else addrs = addrs + " " + params.sgg;
					if (ljsIsNull(params.emd)) addrs = addrs + "";
					else addrs = addrs + " " + params.emd;
					if (ljsIsNull(params.ri)) addrs = addrs + "";
					else addrs = addrs + " " + params.ri;
					if (ljsIsNull(params.jibun)) addrs = addrs + "";
					else addrs = addrs + " " + params.jibun;
					//var addrs=params.sido+" "+params.sgg+" "+params.emd+" "+(params.ri==null || params.ri=="undefined") ? '' : params.ri;
					//console.log("emd:"+ljsIsNull(params.emd)?'':params.emd);
					console.log("addrs:" + addrs);
					d.saddr = (addrs == undefined || addrs == null || addrs == "undefined") ? '' : addrs;
					//params.sido+" "+params.sgg+" "+ljsIsNull(params.emd)?'':params.emd;//+" "+ljsIsNull(params.ri)?'':params.ri+" "+ljsIsNull(params.jibun)?'':params.jibun;
				}

				console.log("saddr:" + d.saddr);
				console.log(params);
				console.log("-----------d-----------");
				console.log(d);

			},

			dataSrc: function(json) {
				console.log("-------------json---------------");
				console.log(json);
				$("#dataTableTotalCount").html(json.recordsTotal);

				saveJsonData = json.data;
				return json.data;
			}

		},
		initComplete: function() {
			console.log(this.api().data().length);
		},
		columns: [
			{ data: "mm_mw_title", "defaultContent": "" },//0
			{ data: "address_str", "defaultContent": "" },
			{ data: "status_str", "defaultContent": ""},
			{ data: "mm_idx", "defaultContent": "" },
			{ data: "mw_occur_date", "defaultContent": "" },
			{ data: "mm_comple_date", "defaultContent": "" }//5
		],

		columnDefs: [
			{ "className": "dt-head-center", "targets": "_all" },
			{ className: 'dt-center', "targets": "_all" },
			{ targets: [0], width: "200px" },
			{ targets: [1], width: "250px" },
			{ targets: [2], width: "50px" },
			{
				targets: [3]
				, width: "50px"
				, render: function(data, type, row, meta) {
					return `<button class="btnDesign issuePopBtn" onclick="issuePop(${row.no})" >이슈보기</button>`;
				}
			},
			{ targets: [4], width: "50px" },
			{ targets: [5], width: "50px" }
		]
	});

	table.on('click', 'tr', function() {
		var target = $(event.target);

		var isButtonCell = target.closest('td').index() === 3;

		if (isButtonCell) {
			return;
		} else {
			// 다른 열을 클릭했을 때만 상세 페이지로 이동
			console.log("--------------tr click---------------------");
			var data = table.row(this).data();
			var url = "/issue/complaintManage?mw_seq=" + data.mm_mw_seq;

			history.replaceState({ page: 'current' }, document.title);

			window.location = url;
		}
	});
}

//리스트 이슈 팝업
function issuePop(idx) {
	const data = saveJsonData.find(function(obj) { return obj.no == idx })
	const popupOpen = document.getElementById("issuePopup");
	if (popupOpen) {
		$("#issuePopup .issue_content").text(`${data.code_str1} > ${data.code_str2} > ${data.code_str3}`)
		popupOpen.classList.add("active");
	}
}

//현황 팝업
function hyeonhwangPop() {
	const popupOpen = document.getElementById("issueTotalPopContent");
	if (popupOpen) {
		popupOpen.classList.add("active");
	}
}




//민원관리 -> 현황통계
$(document).on("click", ".issueManageTotalBtn", function() {
	selectMinwonStatusStatis();
});

function initChart(containerID, data) {
	Highcharts.chart(containerID, {
		chart: {
			type: 'column' // 'bar'로 변경하면 수평 막대 차트가 됩니다.
		},
		title: {
			text: '' // 차트 제목 제거
		},
		credits: {
			enabled: false // Highcharts 로고 제거
		},
		legend: {
			// layout: 'vertical', // 세로 방향으로 표시
			align: 'left', // 왼쪽 정렬
			verticalAlign: 'top', // 위쪽 정렬
			x: 0, // 왼쪽에서의 위치
			y: 0 // 위쪽에서의 위치
		},
		xAxis: {
			title: "",
			categories: data.jisaList
		},
		yAxis: {
			title: "",
			min: 0,
			stackLabels: {
				enabled: true,
				formatter: function() {
					return this.total; // 0이 아닐 때만 표시
				},
				style: {
					fontWeight: 'bold',
					color: 'gray'
				}
			}
		},
		tooltip: {
			shared: true,
			useHTML: true
		},
		plotOptions: {
			column: {
				stacking: 'normal', // 스택 방식 설정
				dataLabels: {
					enabled: true,  // 데이터 레이블을 활성화
					formatter: function() {
						return this.y !== 0 ? this.y : null;  // 값이 0이 아니면 표시
					},
					color: '#000000',  // 데이터 레이블 색상
					style: {
						fontWeight: 'bold'  // 레이블 스타일 설정
					}
				}
			}
		},
		colors: ['#7bb6ff', '#534fc0', '#fc9642', '#49bb59'], // 색상 배열
		series: data.charData
	});
}
function selectMinwonStatusStatis(isAll = true) {
	var jisa = "";
	var status = "";
	var occur_date = "";
	if (!isAll) {
		jisa = $(".issueTotalSelectsTitleBtn").eq(0).text() == "전체" ? "" : $(".issueTotalSelectsTitleBtn").eq(0).text();
		let testValue = ($("#issueTotalHiddenSelectBox02").val()[0]);	//findProgStatus($("#issueTotalHiddenSelectBox02").val()[0])
		status = $("#issueTotalHiddenSelectBox02").val()[0] == "전체" ? "" : testValue; 
		occur_date = $("#issueTotalHiddenSelectBox03").val()[0] == "전체" ? "" : $("#issueTotalHiddenSelectBox03").val()[0];
	}

	var allData = { "jisa": jisa, "status": status, "occur_date": occur_date };
	console.log(allData);
	$.ajax({
		url: "/statics/selectMinwonStatusStatis",
		data: JSON.stringify(allData),
		type: "POST",
		dataType: "json",
		success: function(res) {
			console.log(res);
			const result = res.result;
			const data = res.data;
			if (result != null && result != undefined && result == "success") {
				const convertData = convetHyeonhwangData(data);
				console.log("--- convertData");
				console.log(convertData);

				//발생지사 리스트 추가
				if (isAll) {
					const hiddenBox = $('#issueTotalPopContent #issueTotalHiddenSelectBox01')
					hiddenBox.empty();
					hiddenBox.append(`<option value="전체">전체</option>`);
					$.each(convertData.jisaList, function(index, jisa) {
						var newItem = `<option value="${jisa}">${jisa}</option>`;
						hiddenBox.append(newItem);
					});

					$('#issueTotalPopContent #issueTotalPopCheckBox01').prop('checked', true);
					//select , check init
					issueTotalSelectEvet(true);
					issueTatalCheckboxes();
				}

				//지사 리스트 추가
				const jisaBox = $('#issueTotalPopContent .issueDataTextScrollBoxs');
				jisaBox.empty();
				$.each(convertData.data, function(index, data) {
					var newItem = `<ul class="datas">
                                        <li><p>${data.mm_jisa}</p></li>
                                        <li><p>${data.status_2_count}</p></li>
                                        <li><p>${data.status_3_count}</p></li>
                                        <li><p>${data.status_4_count}</p></li>
                                        <li><p>${data.status_5_count}</p></li>
                                    </ul>`;
					jisaBox.append(newItem);
				});


				//차트
				initChart("container", convertData);

				hyeonhwangPop();
			} else {
				alert("현황 통계 데이터가 없습니다.");
			}
		},
		beforeSend: function() {
			//(이미지 보여주기 처리)
			//$('#load').show();
		},
		complete: function() {
			//(이미지 감추기 처리)
			//$('#load').hide();
		},
		error: function(jqXHR, textStatus, errorThrown, responseText) {
			//alert("ajax error \n" + textStatus + " : " + errorThrown);
			console.log(jqXHR);
			console.log(jqXHR.readyState);
			console.log(jqXHR.responseText);
			console.log(jqXHR.responseJSON);
		}
	}) //end ajax
}


//현황 데이터를 변환
function convetHyeonhwangData(data) {
	const returnObj = {};
	returnObj.data = data;
	returnObj.jisaList = data.map(item => item.mm_jisa);

	//차트 데이터 만들기
	returnObj.charData = [];
	const obj02 = {
		name: data[0].status_2_title,
		data: data.map(item => item.status_2_count)
	};
	const obj03 = {
		name: data[0].status_3_title,
		data: data.map(item => item.status_3_count)
	};
	const obj04 = {
		name: data[0].status_4_title,
		data: data.map(item => item.status_4_count)
	};
	const obj05 = {
		name: data[0].status_5_title,
		data: data.map(item => item.status_5_count)
	};

	returnObj.charData.push(obj02);
	returnObj.charData.push(obj03);
	returnObj.charData.push(obj04);
	returnObj.charData.push(obj05);
	return returnObj;
}

$(document).on("click", ".sido li", function() {
	$("#sido").val($("#sidoText").text()).attr("selected", "selected");
	if ($("#sido").val() == null) return;
	var allData = { "key": $("#sido").val() };
	$.ajax({
		url: "/land/api/getSigunMaster",
		data: JSON.stringify(allData),
		async: true,
		type: "POST",
		dataType: "json",
		contentType: 'application/json; charset=utf-8',
		success: function(rt, jqXHR) {
			var data = rt.resultData;

			$("#sggUl li").remove();
			$("#sgg option").remove();

			$("#sggUl").append("<li><p>전체</p></li>");
			$("#sgg").append("<option value=''>전체</option>");
			for (var i = 0; i < data.length; i++) {
				$("#sggUl").append("<li><p>" + data[i].sm_gugun + "</p></li>");
				$("#sgg").append("<option>" + data[i].sm_gugun + "</option>");
			}

			$("#sido").val($("#sido").val()).attr("selected", "selected");
			// downloadExcel(rt.results);
		},
		beforeSend: function() {
			//(이미지 보여주기 처리)
			//$('#load').show();
		},
		complete: function() {
			//(이미지 감추기 처리)
			//$('#load').hide();
		},
		error: function(jqXHR, textStatus, errorThrown, responseText) {
			//alert("ajax error \n" + textStatus + " : " + errorThrown);
			console.log(jqXHR);
			console.log(jqXHR.readyState);
			console.log(jqXHR.responseText);
			console.log(jqXHR.responseJSON);
		}
	}) //end ajax
})

$(document).on("click", ".sgg li", function() {
	var allData = { "gugunKey": ljsIsNull($("#sgg option:selected").val()) ? '' : $("#sgg option:selected").val(), "sidoKey": $("#sidoText").text() }

	$.ajax({
		url: "/land/api/getDongMaster",
		data: JSON.stringify(allData),
		async: true,
		type: "POST",
		dataType: "json",
		contentType: 'application/json; charset=utf-8',
		success: function(rt, jqXHR) {
			var data = rt.resultData;
			$("#emdUl li").remove();
			$("#emd option").remove();
			$("#emdUl").append("<li><p>전체</p></li>");
			$("#emd").append("<option value=''>전체</option>");
			for (var i = 0; i < data.length; i++) {
				$("#emdUl").append("<li><p>" + data[i].bm_dong + "</p></li>");
				$("#emd").append("<option>" + data[i].bm_dong + "</option>");
			}

			$("#sido").val($("#sidoText").text()).attr("selected", "selected");
			$("#sgg").val($("#sggText").text()).attr("selected", "selected");
			// downloadExcel(rt.results);
		},
		beforeSend: function() {
			//(이미지 보여주기 처리)
			//$('#load').show();
		},
		complete: function() {
			//(이미지 감추기 처리)
			//$('#load').hide();
		},
		error: function(jqXHR, textStatus, errorThrown, responseText) {
			//alert("ajax error \n" + textStatus + " : " + errorThrown);
			console.log(jqXHR);
			console.log(jqXHR.readyState);
			console.log(jqXHR.responseText);
			console.log(jqXHR.responseJSON);
		}
	}) //end ajax
})

$(document).on("click", ".emd li", function() {
	$("#sido").val($("#sidoText").text()).attr("selected", "selected");
	$("#sgg").val($("#sggText").text()).attr("selected", "selected");
	$("#emd").val($("#emdText").text()).attr("selected", "selected");
	var allData = { "dongKey": $("#emdText").text(), "gugunKey": $("#sggText").text(), "sidoKey": $("#sidoText").text() }

	$.ajax({
		url: "/land/api/getRiMaster",
		data: JSON.stringify(allData),
		async: true,
		type: "POST",
		dataType: "json",
		contentType: 'application/json; charset=utf-8',
		success: function(rt, jqXHR) {
			var data = rt.resultData;
			$("#riUl li").remove();
			$("#ri option").remove();
			$("#riUl").append("<li><p>전체</p></li>");
			$("#ri").append("<option value=''>전체</option>");
			for (var i = 0; i < data.length; i++) {
				$("#riUl").append("<li><p>" + data[i].rm_ri + "</p></li>");
				$("#ri").append("<option>" + data[i].rm_ri + "</option>");
			}
		},
		beforeSend: function() {
		},
		complete: function() {
		},
		error: function(jqXHR, textStatus, errorThrown, responseText) {
			//alert("ajax error \n" + textStatus + " : " + errorThrown);
			console.log(jqXHR);
			console.log(jqXHR.readyState);
			console.log(jqXHR.responseText);
			console.log(jqXHR.responseJSON);
		}
	}) //end ajax
})






// ***** 콤보박스 *****************
// 커스텀 selectbox
const initComboBox = () => {
	const createCustomLiIssueCodeMgmt = () => {
		const contentItems = document.querySelectorAll('.selectICodeContentArea');
		$('.selectICodeContentArea .customSelectBtns').html('');

		contentItems.forEach(contentItem => {
			const notsetAddSelectBox = contentItem.querySelector('select');
			// select가 없으면 return
			if (!notsetAddSelectBox) return;

			const customSelectBox = contentItem.querySelector('.customSelectBox');
			const customSelectBtns = customSelectBox.querySelector('.customSelectBtns');

			for (let i = 0; i < notsetAddSelectBox.length; i++) {
				const optionValue = notsetAddSelectBox.options[i].value;
				const optionText = notsetAddSelectBox.options[i].text;
				const li = document.createElement('li');
				const button = document.createElement('button');
				button.classList.add('moreSelectBtn');
				button.type = 'button';
				button.textContent = optionText;
				button.setAttribute('data', optionValue)
				li.appendChild(button);
				customSelectBtns.appendChild(li);
			}
		});
	}
	createCustomLiIssueCodeMgmt();

	// customSelectBtns 리스트 click 했을 때 해당 내용으로 바뀌게하기
	const MoreSelectBtn = document.querySelectorAll('.moreSelectBtn')

	MoreSelectBtn.forEach((moreBtn) => {
		moreBtn.addEventListener('click', function() {
			var moreSelectBtnText = moreBtn.innerText;
			console.log(moreSelectBtnText);
			const parentMoreSelectBtn = moreBtn.closest('.customSelectBtns')
			const EditCustomViewBtn = parentMoreSelectBtn.previousElementSibling;

			while (EditCustomViewBtn.firstChild) {
				EditCustomViewBtn.removeChild(EditCustomViewBtn.firstChild);
			}
			const textNode = document.createTextNode(moreSelectBtnText);
			EditCustomViewBtn.appendChild(textNode);

			EditCustomViewBtn.classList.remove('active')
			parentMoreSelectBtn.classList.remove('active')


			// 선택한 걸 select의 value값으로 변경하기
			const nearByContent = moreBtn.closest('.selectICodeContentArea');
			const nearBySelectBox = nearByContent.querySelector('select');
			nearBySelectBox.value = moreBtn.getAttribute("data");
			console.log(`Selected value: ${nearBySelectBox.value}`);
			if (nearBySelectBox.getAttribute('id') == 'issueCodeMgmtSelectBox01_1') {
				loadDepth2Codes();
			} else if (nearBySelectBox.getAttribute('id') == 'issueCodeMgmtSelectBox01_2') {
				loadDepth3Codes();
			};
		})
	})
};

initComboBox();

const customSelectView = document.querySelectorAll('.customSelectView')

customSelectView.forEach((btn) => {
	btn.addEventListener('click', function() {
		btn.classList.toggle('active');

		if (btn.nextElementSibling) {
			btn.nextElementSibling.classList.toggle('active');

		}
	})
});

// 분류 데이터 가져오기
// 대분류 selectIssueCodeListDepth1
(() => {
	$.ajax({
		url: "/issue/selectIssueCodeListDepth1",
		async: true,
		type: "POST",
		dataType: "json",
		contentType: 'application/json; charset=utf-8',
		success: function(response) {
			console.log(response);
			if (response.message = "success") {
				const resultData = response.result;

				var optionsStr = '<option value="" selected>전체</option>';
				for (row of resultData) {
					optionsStr += '<option value="' + row.code + '">' + row.code_name + '</option>'
				}
				$('#issueCodeMgmtSelectBox01_1').html(optionsStr);
				$('#issueCodeMgmtSelectBox01_2').html('<option value="" selected>전체</option>');
				$('#issueCodeMgmtSelectBox01_3').html('<option value="" selected>전체</option>');

				initComboBox();
			}
		},
		error: function() {
		}
	});
})();

// 중분류 selectIssueCodeListDepth2
const loadDepth2Codes = () => {
	var depth1Code = $('#issueCodeMgmtSelectBox01_1').val();
	if (depth1Code == '') {
		$('#issueCodeMgmtSelectBox01_2').html('<option value="">전체</option>');
		$('#issueCodeMgmtSelectBox01_3').html('<option value="">전체</option>');
		initComboBox();
		$($('#depth2Codes button')[0]).trigger('click')
		$($('#depth3Codes button')[0]).trigger('click')
		return;
	}

	$.ajax({
		url: "/issue/selectIssueCodeListDepth2?DEPTH1=" + depth1Code,
		async: true,
		type: "POST",
		dataType: "json",
		contentType: 'application/json; charset=utf-8',
		success: function(response) {
			console.log(response);
			if (response.message = "success") {
				const resultData = response.result;

				var optionsStr = '<option value="">전체</option>';
				for (row of resultData) {
					optionsStr += '<option value="' + row.code + '">' + row.code_name + '</option>'
				}
				$('#issueCodeMgmtSelectBox01_2').html(optionsStr);
				$('#issueCodeMgmtSelectBox01_3').html('<option value="">전체</option>');

				initComboBox();
				$($('#depth2Codes button')[0]).trigger('click')
				$($('#depth3Codes button')[0]).trigger('click')
			}
		},
		error: function() {
		}
	});
};

// 세분류 selectIssueCodeListDepth2
const loadDepth3Codes = () => {
	var depth1Code = $('#issueCodeMgmtSelectBox01_1').val();
	var depth2Code = $('#issueCodeMgmtSelectBox01_2').val();
	if (depth2Code == '') {
		$('#issueCodeMgmtSelectBox01_3').html('<option value="">전체</option>');
		initComboBox();
		$($('#depth3Codes button')[0]).trigger('click');
		return;
	}

	$.ajax({
		url: "/issue/selectIssueCodeListDepth3?DEPTH1=" + depth1Code + '&DEPTH2=' + depth2Code,
		async: true,
		type: "POST",
		dataType: "json",
		contentType: 'application/json; charset=utf-8',
		success: function(response) {
			console.log(response);
			if (response.message = "success") {
				const resultData = response.result;

				var optionsStr = '<option value="">전체</option>';
				for (row of resultData) {
					optionsStr += '<option value="' + row.code + '">' + row.code_name + '</option>'
				}
				$('#issueCodeMgmtSelectBox01_3').html(optionsStr);

				initComboBox();
				$($('#depth3Codes button')[0]).trigger('click')
			}
		},
		error: function() {
		}
	});
};

//파일 업로드 했을때 step.1
function handleFileUpload(files, obj) {
	console.log("-------------handleFileUpload---------------");
	console.log(files);
	
	for (var i = 0; i < files.length; i++) { // 선택된 파일들을 하나씩 처리
        var fd = new FormData(); // FormData 객체 생성 (파일 업로드를 위한 객체)
        
        fd.append('file', files[i]); // 파일 객체를 FormData에 추가
 		
        var status = new createStatusbar($("#fileTitleUl"), files[i].name, files[i].size, fileRowCount); // 파일 업로드 상태바 생성
        
        sendFileToServer(fd,status); // 서버로 파일 전송 함수 호출
		
		fileRowCount++; // 파일이 추가될 때마다 rowCount를 증가시켜 고유한 id를 유지
   }
}

//파일 업로드 했을때 step.1.5
// Status bar 생성 함수
function createStatusbar(obj, name, size, no){
	console.log("----------start createStatusBar------------");
    //console.log(obj.html());
	
	var sizeStr="";
    var sizeKB = size/1024; // 파일 크기를 문자열로 표시하기 위한 변수
    
    if(parseInt(sizeKB) > 1024){
        var sizeMB = sizeKB/1024;
        sizeStr = sizeMB.toFixed(2)+" MB"; // MB로 변환
    }else{
        sizeStr = sizeKB.toFixed(2)+" KB"; // KB로 표시
    }
	
	//보이는 화면 UI 추가 - obj 말고 그냥 div id 정했으니 그냥 추가 해줘도 됨.
    let rowHtml = '';
    
    rowHtml += '<ul class="popcontents" name="fileListUl">';
	rowHtml += '<li class="popBtnbox">';
	rowHtml += '	<button class="popAllDeleteFileBtn"></button>';
	rowHtml += '</li>';
	rowHtml += '<li class="popcontent popfilenameBox">';
	rowHtml += '<input type="hidden" value="'+ +'">';
	rowHtml += '<figure class="poptypeIcon"></figure><p class="popfileNameText" id="minwonFileName_'+no+'">'+name+'</p></li>';
	rowHtml += '<li class="popcontent"><p>완료</p></li>';
	rowHtml += '<li class="popcontent"><p class="popfileSizeText">'+sizeStr+'</p></li>';
	rowHtml += '</ul>';
    
    $("#fileTitleUl").append(rowHtml);
}


//파일 업로드 했을때 step.2
//실제 서버에 파일 업로드 (/temp폴더로...)
function sendFileToServer(formData, status) {
	
    let uploadURL = "/issue/fileUpload/post"; //Upload URL
    
    console.log('URL로 던져서 upload');
    
    var jqXHR = $.ajax({
		xhr: function() {
		    var xhrobj = $.ajaxSettings.xhr(); // 기본 XMLHttpRequest 객체 생성
		    if (xhrobj.upload) {
		        xhrobj.upload.addEventListener('progress', function(event) {
		            var percent = 0;
		            var position = event.loaded || event.position;
		            var total = event.total;
		            if (event.lengthComputable) {
		                percent = Math.ceil(position / total * 100); // 파일 업로드의 진행 상황을 계산
		            }
		            // status.setProgress(percent);  // 업로드 진행 상황을 status에 반영 (현재 주석 처리됨)
		        }, false);
		    }
		    return xhrobj;
		},
        url: uploadURL,
        type: "POST",
        contentType:false,
        processData: false,
        cache: false,
        data: formData,
        success: function(data){
           // status.setProgress(100);
 			console.log(data);
 			console.log(data.resultData);
			//console.log("-------------sendFileToServer-----------------------");
			//console.log($(this).parent().parent().parent().parent());
            //$("#status1").append("File upload Done<br>");    
			//uploadFiles.push(data.resultData.fpath);    
			//allCheckEventLandRightsRegist();   
        }
    }); 
 	
    //status.setAbort(jqXHR);
}

/*********************************************/
/*********************************************/
//민원관리 조회하기 클릭시
function minwonListSearch(){
	let formSerializeArray = $('#searchForm').serializeArray();
	let object = {};
	
	for (let i = 0; i < formSerializeArray.length; i++) {
		if (formSerializeArray[i]['value'] === '전체') {
			continue; // "전체"가 선택된 경우, 해당 파라미터를 넘기지 않음
		}
		object[formSerializeArray[i]['name']] = formSerializeArray[i]['value'];
	}

	let json = JSON.stringify(formSerializeArray);

	console.log("----------jsonobj------------");
	console.log(json);
	console.log("object issueManageRadio01:" + object.issueManageRadio01);

	console.log('조회는 나중에')
	loadDataTable(object);
	console.log("-----------------------");
}

//주소검색 팝업에서 선택 버튼 - 주소 검색한거 선택
function miwonSearchAddr(obj) {
	let selectAddrInfo = queryValueToObject($(obj).attr('data-info'));
	let idxCheck = $(obj).attr('data-index');
	console.log(selectAddrInfo);
	console.log(idxCheck);
	
	
	
	let completeYn = 'N'
	let permittedYn = 'N';
	
	if(selectAddrInfo.jisang_status == 'JISANG') {	//지상
		//COMPLE_YN - 등기여부
		//PERMITTED_YN - 계약여부 (파일명으로 올수도? 어쨌든 1개라도 있으면 Y)
		completeYn = selectAddrInfo.jm_comple_yn;
		if(selectAddrInfo.jm_permitted_yn.length > 0){
			permittedYn = 'Y';
		}
	} else if(selectAddrInfo.jisang_status == 'GOVER') {	//점용
		//준비
	} else if(selectAddrInfo.jisang_status == 'DOPCO') {	//회사토지
		//COMPLE_YN - 등기여부
		completeYn = selectAddrInfo.dom_comple_yn;
	} else if(selectAddrInfo.jisang_status == 'NOTSET') {	//미지정
		//준비
	} else {
		//패스
	}
	
	$("#minwonAddr_"+idxCheck).val(selectAddrInfo.juso);	//주소세팅
	$("#minwonAddrInfo_"+idxCheck).val(JSON.stringify(selectAddrInfo));
	$("#minwonRegiYn_"+idxCheck).val(completeYn);	//등기여부
	$("#minwonContYn_"+idxCheck).val(permittedYn);	//계약여부
	
	searchPopClose();	//팝업닫기
}

function tempTest1() {
	for(let i = 0 ; i < $("button[name='addressListInfo'").length ; i++ ) {
		
		let objCheck = queryValueToObject($("button[name='addressListInfo'").eq(i).attr('data-info'));
		console.log(objCheck);
	}
}


//주소 팝업 닫기 
function searchPopClose() {
	
	let popupOnCheck = $("#minwon_searchPopupWrap").hasClass('active');
	
	if(popupOnCheck) {
		$("#minwon_searchPopupWrap").removeClass('active');
	} else {
		$("#minwon_searchPopupWrap").addClass('active');
	}

}

//r.e.s.e.t - 신규 민원 등록 팝업
function minwonPopReset() {
	
	$("input[name='MW_TITLE'").val('');
	//토지정보리셋 - 첫줄만 남기고 다 삭제 및 data 비우기
	$(".landinfo_box").children("ul:gt(0)").remove();	
	$("#minwonAddr_1").val('');
	$('.landinfo_content_3 input').prop('checked', false);
	$("#minwonActualAreaYn_1").val('')
	//대표 필지정보 리셋
	$("input[name='REP_ADDRESS']").val('');
	$("input[name='REGISTED_YN']").val('N');
	$("input[name='PERMITTED_YN']").val('N');
	
	//민원내용 리셋
	$(".com_content_contents_1").children("ul:gt(0)").remove();	
	$("#landowner_name_1").val('');
	$("#landowner_birthday_1").val('');
	$("#landowner_relation_1").val('');
	$("#landowner_phone_1").val('');
	$("#landowner_presence_1").text('Y/N');
	
	$('textarea[name="MW_HISTORY"]').val('');
	$('textarea[name="MW_REQUIREMENTS"]').val('');
	$('textarea[name="MW_CONTENTS"]').val('');
}

/*********************************************/
/*********************************************/