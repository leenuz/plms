var dataInfo = {};
//실행
var mw_seq;

///start
$(function() {
	console.log("===== complainManage.js start =====");
	// 현재 페이지의 URL에서 쿼리 스트링 부분을 가져옴
	const queryString = window.location.search;
	// URLSearchParams 객체 생성 (쿼리 스트링을 파싱)
	const urlParams = new URLSearchParams(queryString);
	// 파라미터 값 가져오기 (예: ?paramName=value 형태에서 paramName의 값)
	mw_seq = urlParams.get('mw_seq');
	console.log("mw_seq = " + mw_seq);
	
	//페이지 로드시 상세화면 내용 불러오기
	self.onDataLoad();
	
	
	
})

// 커스텀 selectbox

const createCustomLiComplaintManage = () => {
	const contentItems = document.querySelectorAll('.selectContentArea');

	contentItems.forEach(contentItem => {
		const notsetAddSelectBox = contentItem.querySelector('select');
		// select가 없으면 return
		if (!notsetAddSelectBox) return;

		const customSelectBox = contentItem.querySelector('.customSelectBox');
		const customSelectBtns = customSelectBox.querySelector('.customSelectBtns');

		for (let i = 0; i < notsetAddSelectBox.length; i++) {
			const optionValue = notsetAddSelectBox.options[i].value;
			const li = document.createElement('li');
			const button = document.createElement('button');
			button.classList.add('moreSelectBtn');
			button.type = 'button';
			button.textContent = optionValue;
			li.appendChild(button);
			customSelectBtns.appendChild(li);
		}
	});
}
createCustomLiComplaintManage();

const customSelectView = document.querySelectorAll('.customSelectView')

customSelectView.forEach((btn) => {
	btn.addEventListener('click', function() {
		btn.classList.toggle('active');

		if (btn.nextElementSibling) {
			btn.nextElementSibling.classList.toggle('active');

		}
	})
})

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

		const nearByContent = moreBtn.closest('.selectContentArea');
		const nearBySelectBox = nearByContent.querySelector('select');
		nearBySelectBox.value = moreBtn.textContent;
		console.log(`Selected value: ${nearBySelectBox.value}`);
	})
})


/* 민원협의내용등록수정 팝업 */

const complainManageAddComplainPopEvet = () => {

	const complainManageAddComplainBtn = document.querySelector("#complaintManage .addComplainBtn");
	const complainManageaddComplainWrapper = document.querySelector(".complainManageaddComplainWrapper");
	const complainAddFilePath = '/components/popuphtml/issue_management_Popup/complaint_register_Poppup.html'; // 삽입할 html 파일 경로

	if (complainManageAddComplainBtn) {

		let xhr = new XMLHttpRequest();
		xhr.open('GET', complainAddFilePath, true);
		xhr.onreadystatechange = function() {
			if (xhr.readyState == 4 && xhr.status == 200) {
				complainManageaddComplainWrapper.innerHTML = xhr.responseText;
				runScriptsInElement(complainManageaddComplainWrapper); // 삽입된 html내 스크립트 실행 함수 호출
			}
		};
		xhr.send();
		console.log('complainManageaddComplainWrapper 작동');


		complainManageAddComplainBtn.addEventListener("click", () => {

			const popupOpen = document.getElementById("complaint_register_Popup");
			if (popupOpen) {
				popupOpen.classList.add("active");
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


	}



}

complainManageAddComplainPopEvet();


/* 민원완료 팝업 */

const complainManageComplainFinPopEvet = () => {

	const complainManageComplainFinBtn = document.querySelector("#complaintManage .complainFinBtn");
	const complainManageComplainFinishWrapper = document.querySelector(".complainManageComplainFinishWrapper");
	const complainFinFilePath = '/components/popuphtml/issue_management_Popup/complaint_completed.html'; // 삽입할 html 파일 경로

	if (complainManageComplainFinBtn) {

		let xhr = new XMLHttpRequest();
		xhr.open('GET', complainFinFilePath, true);
		xhr.onreadystatechange = function() {
			if (xhr.readyState == 4 && xhr.status == 200) {
				complainManageComplainFinishWrapper.innerHTML = xhr.responseText;
				runScriptsInElement(complainManageComplainFinishWrapper); // 삽입된 html내 스크립트 실행 함수 호출
			}
		};
		xhr.send();
		console.log('complainManageComplainFinishWrapper 작동');


		complainManageComplainFinBtn.addEventListener("click", () => {

			const popupOpen = document.getElementById("complaint_completed");
			if (popupOpen) {
				popupOpen.classList.add("active");
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
	}
}

complainManageComplainFinPopEvet();

//팝업 숨김
function closeComplaintregisterPopup() {
	const complaintregisterPopupOpen = document.getElementById("complaint_register_Popup");
	complaintregisterPopupOpen.classList.remove("active");
}

//팝업 데이터 json
function getPopupJsonData() {
	var formSerializeArray = $('#saveFormPop').serializeArray();
	len = formSerializeArray.length;
	var dataObj = {};
	for (i = 0; i < len; i++) {
		dataObj[formSerializeArray[i].name] = formSerializeArray[i].value;
	}

	dataObj.MW_SEQ = mw_seq;
	//dataObj.STATUS = findProgStatus(dataObj.STATUS);

	//첨부파일
	const complaintRegiPopup_myPcFiles = document.getElementById('complaint_register_Popup_file');
	const complaintRegiFiles = complaintRegiPopup_myPcFiles.files;
	dataObj.files = complaintRegiFiles;

	console.log(dataObj);
	return JSON.stringify(dataObj);
}

//협의 추가 저장
$(document).on("click", ".document_add_btnWrap .saveBtn", function() {
	if (dataInfo == null || dataInfo == undefined) {
		return
	}

	$.ajax({
		url: "/issue/saveMinwonAgreeData",
		data: getPopupJsonData(),
		async: true,
		type: "POST",
		dataType: "json",
		contentType: 'application/json; charset=utf-8',
		success: function(data, jqXHR) {
			console.log(data);
			if (data.message != null && data.message != undefined && data.message == "success") {
				closeComplaintregisterPopup();
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

//협의추가 ->상신
$(document).on("click", ".document_add_btnWrap .sangsinBtn", function() {
	if (dataInfo == null || dataInfo == undefined) {
		return
	}
	$.ajax({
		url: "/issue/minwonCompleteSave",
		data: getPopupJsonData(),
		async: true,
		type: "POST",
		dataType: "json",
		contentType: 'application/json; charset=utf-8',
		success: function(data, jqXHR) {
			console.log(data);
			if (data.message != null && data.message != undefined && data.message == "success") {
				closeComplaintregisterPopup();
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


//지역명을 조합하는 함수
function getFullAddress(data) {
	const parts = [];
	if (data.sido_nm) parts.push(data.sido_nm);
	if (data.sgg_nm) parts.push(data.sgg_nm);
	if (data.emd_nm) parts.push(data.emd_nm);
	if (data.ri_nm) parts.push(data.ri_nm);
	if (data.jibun_full) parts.push(data.jibun_full);
	return parts.join(' ');
}





//민원 현황 상세 내용 조회
function onDataLoad() {

	var allData = { "MW_SEQ": mw_seq };
	let noDataUl = '<ul class="contents" style="justify-content:center; align-items:center;"><li>조회된 정보가 없습니다.</li></ul>';
	$.ajax({
		url: "/issue/selectMinwonDetail",
		data: JSON.stringify(allData),
		async: true,
		type: "POST",
		dataType: "json",
		contentType: 'application/json; charset=utf-8',
		success: function(data, jqXHR) {
			
			console.log(data);
			dataInfo = data;
			
			const result = data.result;
			const agreeList = data.agreeList;
			const tojiList = data.tojiList;
			const fileList = data.fileList;
			console.log(data);
			
			$("#mwdetail_title").val(result.mw_title); //민원명
			$("#mwdetail_date").val(result.mw_occur_date); //발생일자
			$("#mwdetail_jisa").val(result.jisa); //발생지사
			
			//이슈 유형
			let issuetypeCheck = '';
			
			if(result.code_str1 != null) {
				issuetypeCheck += result.code_str1;
			}
			
			if(result.code_str2 != null) {
				issuetypeCheck += '>' + result.code_str2;
			}
			
			if(result.code_str3 != null) {
				issuetypeCheck += '>' + result.code_str3;
			}
			
			$("#mwdetail_prog_status").val(result.status_str); //진행현황
			
			$('#dopcoAllWrappers .land_history').text(""); //토지이력
			$('#dopcoAllWrappers .requirements').text(""); //요구사항
			$('#dopcoAllWrappers .land_contents').text(result.mw_contents); //내용
			
			// 민원인/토지주
			let minwontojijus = '';
			if (result.minwonin_tojiju_nm != null) {
				minwontojijus = result.minwonin_tojiju_nm.split("|");
			}
			
			let minwontojiju_birth = '';
			if (result.minwonin_tojiju_birth != null) {
				minwontojiju_birth = result.minwonin_tojiju_birth.split("|");
			}
			
			let tojiju_relation = '';
			if (result.tojiju_relation != null) {
				tojiju_relation = result.tojiju_relation.split("|");
			}
			
			let minwonin_phone = '';
			if (result.minwonin_phone != null) {
				minwonin_phone = result.minwonin_phone.split("|");
			}
			
			let field_presence = '';
			if (result.field_presence != null) {
				field_presence = result.field_presence.split("|");
			}
			/*
			minwontojijus = result.minwonin_tojiju_nm.split("|"); // 성명
			minwontojiju_birth = result.minwonin_tojiju_birth.split("|"); // 생년월일
			tojiju_relation = result.tojiju_relation.split("|"); // 토지주와의 관계
			minwonin_phone = result.minwonin_phone.split("|"); // 연락처
			field_presence = result.field_presence.split("|"); // 현장입회
				*/	
				$.each(minwontojijus, function(index, item) {
				let newHtml = `
					 <ul class="contents">
						<li class="content smallWidth">
							<input type="text" class="notWriteInput" placeholder="${index + 1}" readonly />
						</li>
						<li class="content smallWidth">
							<input type="text" class="notWriteInput" readonly placeholder="${item || '-'}" />
						</li>
						<li class="content">
							<input type="text" class="notWriteInput" readonly placeholder="${minwontojiju_birth[index] || '-'}"/>
						</li>
						<li class="content largeWidth">
							<input type="text" class="notWriteInput" readonly placeholder="${tojiju_relation[index] || '-'}" />
						</li>
						<li class="content largeWidth">
							<input type="text" class="notWriteInput" readonly placeholder="${minwonin_phone[index] || '-'}"/>
						</li>
						<li class="content">
							<input type="text" class="notWriteInput" readonly placeholder="${field_presence[index] || '-'}" />
						</li>
					</ul>`;
				$('#minwonin_tojiju_body').append(newHtml);	
				});
					
					//$('#minwonin_tojiju_body').append(noDataUl);
				
			
				
				
				
			
			
			// 토지이력
			$('#toji_history').val(result.toji_history || '-');
			
			// 요구사항
			$('#minwon_requirement').val(result.minwon_requirement || '-');
			
			//민원 토지 ul 추가
			if (tojiList != null && tojiList != undefined && tojiList.length > 0) {
				$('#dopcoAllWrappers .complaintLand .depth1 .contents').remove();
				$.each(tojiList, function(index, item) {
					var newItem = `
                <ul class="contents">
                <li class="content">
                    <input type="text" readonly class="notWriteInput" value="${item.rep_yn || '-'}">
                </li>
                <li class="content largeWidth">
                    <input type="text" readonly class="notWriteInput" value="${minwontojijus[index] || '-'}">
                </li>
                <li class="content">
                    <input type="text" readonly class="notWriteInput" value="${item.registed_yn || '-'}">
                </li>
                <li class="content">
                    <input type="text" readonly class="notWriteInput" value="${item.permitted_yn || '-'}">
                </li>
                </ul>
                 `;
					$('#dopcoAllWrappers .complaintLand .depth1').append(newItem);
				});
			} else {
				$('#dopcoAllWrappers .complaintLand .depth1').append(noDataUl);
			}

			//첨부파일 ul 추가
			if (fileList != null && fileList != undefined && fileList.length > 0) {
				$('#dopcoAllWrappers .attachFileInfo .depth1 .contents').remove();
				$.each(fileList, function(index, item) {
					var newItem = `
                <ul class="contents">
                <li class="content">
                    <input type="text" placeholder="" readonly="" class="notWriteInput" value="${item.file_regdate || '-'}">
                </li>
                <li class="content fileNameWidth">
                    <input type="text" placeholder="" readonly="" class="notWriteInput" value="${item.file_nm || '-'}">
                </li>
                <li class="content btnsWrap">
                    <button class="fileDownloadBtn">
                    다운로드 <span class="downloadIcon"></span>
                    </button>
                </li>
                </ul>
                `;
					$('#dopcoAllWrappers .attachFileInfo .depth1').append(newItem);
				});
			} else {
				$('#dopcoAllWrappers .attachFileInfo .depth1').append(noDataUl);
			}

			//협의내용 ul 추가
			if (agreeList != null && agreeList != undefined && agreeList.length > 0) {
				$('#dopcoAllWrappers .consultDetails .depth1 .contents').remove();
				$.each(agreeList, function(index, item) {
					var newItem = `
                <ul class="contents">
                <li class="content">
                    <input type="text" placeholder="" readonly="" class="notWriteInput" value="${item.agree_date || '-'}">
                </li>
                <li class="content smallWidth">
                    <input type="text" placeholder="" readonly="" class="notWriteInput" value="${item.status_str || '-'}">
                </li>
                <li class="content fileNameWidth">
                    <input type="text" placeholder="" readonly="" class="notWriteInput" value="${item.agree_title || '-'}">
                </li>
                <li class="content btnsWrap">
                    <button class="viewDetailButton">문서보기</button>
                </li>
                </ul>
                `;
					$('#dopcoAllWrappers .consultDetails .depth1').append(newItem);
				});
			} else {
				$('#dopcoAllWrappers .consultDetails .depth1').append(noDataUl);
			}
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
		error: function(jqXHR, textStatus, errorThrown, responseText) {
			//alert("ajax error \n" + textStatus + " : " + errorThrown);
			console.log(jqXHR);
			console.log(jqXHR.readyState);
			console.log(jqXHR.responseText);
			console.log(jqXHR.responseJSON);
		}
	}) //end ajax
}

//===========================================================================================================

//======================민원 대응방안 수립 팝업 시작========================
//문서보기 버튼 클릭 시 민원 대응방안 수립 팝업 열기
$(document).on("click", "#test1", function() {
    var datas = { "address": "example address" }; // 실제 데이터로 변경

    console.log("문서보기 클릭됨");

    // Ajax 요청을 통해 데이터 처리
    $.ajax({
        url: "/issue/minwonBangan",
        type: "POST",
        data: datas
    })
    .done(function(fragment) {
        console.log("*** 데이터 수신 성공 ***");
        console.log(fragment);

        // 팝업 열기
        $("#complainRespondContentBoxs").show();  // 팝업을 보이게 함
        const popupOpen = document.querySelector("#complainRespondContentBoxs .complainRespondPopWrap");
        $(popupOpen).addClass("open");
        popupOpen.classList.add("active");

        // 필요한 데이터 바인딩 작업
        // $('#searchResultPopDiv').replaceWith(fragment);  --> 데이터 업데이트 작업
    })
    .fail(function() {
        console.error("AJAX 요청 실패");
    });
});

// 민원 대응방안 수립 팝업 닫기 버튼
$(document).on("click", "#complainRespondContentBoxs .complainRespondcloseBtn", function() {
    $("#complainRespondContentBoxs").hide();  // 팝업을 다시 숨김
});
//========================민원 대응방안 수립 팝업 끝========================

//민원협의 내용 등록/수정 팝업
function minwon_contentInsertPop() {
	
}

//민원 완료 보고 팝업
function minwon_completeReportPop() {
	
}


//===========================================================================================================
//민원 대응방안 수립[S]
/* x표시 클릭시 닫기 */

    const complainRespondcloseBtn = document.querySelector(".complainRespondcloseBtn");
    const complainRespondContentBoxWrapper = document.getElementById("complainRespondContentBoxs");

    if (complainRespondcloseBtn) {
        complainRespondcloseBtn.addEventListener("click", () => {
            complainRespondContentBoxWrapper.classList.remove("active");
        })
    }

    /* 삭제,저장,상신,닫기 버튼 클릭시 팝업창 닫히기 */
    const closeEvetBtns = document.querySelectorAll("#complainRespondContentBoxs .closeEvetBtn");

    if (closeEvetBtns) {
        closeEvetBtns.forEach((btns) => {
            btns.addEventListener("click", () => {
                complainRespondContentBoxWrapper.classList.remove("active");
            })
        })
    }



    /* 셀렉트박스 함수 */

    const complainRespondSelectEvet = () => {

        const complainRespondSelectsTitleBtn = document.querySelectorAll(".complainRespondPopWrap .complainRespondSelectTitleBtn");
        const complainRespondSelectList = document.querySelectorAll(".complainRespondPopWrap .sufaceSelectList");
        const complainRespondSelectListMember = document.querySelectorAll(".complainRespondPopWrap .sufaceSelectList .surfaceSelectListMember");
        const complainRespondselectWrappers = document.querySelectorAll(".complainRespondHiddenSelect"); //셀렉박스


        let complainRespondAnswer = "";

        //셀렉버튼 최초값 함수
        const complainRespondInitialValues = () => {
            if (complainRespondselectWrappers.length > 0) {

                for (let d = 0; d <= complainRespondselectWrappers.length - 1; d++) {

                    let complainRespondselectValuesInitial = complainRespondselectWrappers[d].children;

                    complainRespondSelectsTitleBtn[d].innerText = complainRespondselectValuesInitial[0].value;
                    complainRespondselectWrappers[d].value = complainRespondSelectsTitleBtn[d].innerText;

                }
            }
        }


        if (complainRespondselectWrappers.length > 0) {

            complainRespondInitialValues(); //최초의값

            //셀렉박스 값  li p값에 담기 
            for (let i = 0; i <= complainRespondselectWrappers.length - 1; i++) {

                const complainRespondSelectValues = complainRespondselectWrappers[i].children; //셀렉박스옵션값 

                for (let x = 0; x <= complainRespondSelectValues.length - 1; x++) {
                    complainRespondAnswer += `<li><p>${complainRespondSelectValues[x].value}</p></li>`;
                }

                complainRespondSelectListMember[i].innerHTML = complainRespondAnswer;
                complainRespondAnswer = '';
            }
        }


        complainRespondSelectsTitleBtn.forEach((btns, index) => {

            btns.addEventListener("click", () => {
                const complainRespondNextSiblings = btns.nextElementSibling;

                complainRespondSelectsTitleBtn.forEach((otherBtn) => {
                    if (otherBtn !== btns) {
                        otherBtn.classList.remove("active");
                    }
                });
                btns.classList.toggle("active");
                complainRespondNextSiblings.classList.toggle("active");

                //surfaceSelectList관련 toggle버튼
                complainRespondSelectList.forEach((box, boxIndex) => {
                    //셀렉버튼의 인덱스와 surfaceSelectList 인덱스번호가 일치하면 메뉴를 오픈하고, btn에 active를 포함
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


            complainRespondSelectList.forEach((list) => {
                list.addEventListener("click", (event) => {

                    const complainRespondThisBtns = event.target.parentElement.parentElement.parentElement.previousElementSibling;
                    const complainRespondSelectContent = event.target.parentElement.parentElement.parentElement.parentElement.previousElementSibling.children[0]; //셀렉박스
                    let complainRespondCurrentSelect = complainRespondSelectContent.getAttribute("id"); //셀렉박스아이디 가져오기

                    if (event.target.nodeName === "P") {

                        let complainRespondCurrentSelectValue = document.getElementById(complainRespondCurrentSelect); //현재 셀렉박스 가져오기
                        return complainRespondThisBtns.innerText = event.target.innerText,
                            $(complainRespondCurrentSelectValue).val(event.target.innerText), //셀렉박스 값에 현재 클릭된 값의 텍스트 담기 
                            console.log(complainRespondCurrentSelectValue.value), //셀렉박스값표시
                            complainRespondSelectsTitleBtn.forEach((btn) => btn.classList.remove("active")),
                            complainRespondSelectList.forEach((lists) => lists.classList.remove("active"));

                    }

                });

            });


        })
    }
    complainRespondSelectEvet();
//민원 대응방안 수립[E]
//===========================================================================================================
//===========================================================================================================
//민원협의 내용 등록/수정[S]
//x버튼, 닫기, 승인요청 클릭시 팝업클로즈
    const complaintregisterPopupOpen = document.getElementById("complaint_register_Popup");

    if (complaintregisterPopupOpen) {
        complaintregisterPopupOpen.querySelectorAll(".topCloseBtn, .finalBtn")
            .forEach(function(btn) {
                btn.addEventListener("click", () => {
                    complaintregisterPopupOpen.classList.remove("active");
                });
            });
    }

    //셀렉박스 이벤트
    function complaintregisterSelect04() {
        const complaintregisterSelectWrapitems = document.querySelectorAll(
            "#complaint_register_Popup .popSelectWrap"
        );

        if (complaintregisterSelectWrapitems) {
            complaintregisterSelectWrapitems.forEach((contentitem) => {
                const nowIssueSelectBox04 = contentitem.querySelector("select");

                if (!nowIssueSelectBox04) return;

                const popCustomSelectBox04 = contentitem.querySelector(
                    "#complaint_register_Popup .Popup_Custom_SelectBox"
                );
                const popCustomSelectBtns04 = popCustomSelectBox04.querySelector(
                    "#complaint_register_Popup .Popup_Custom_SelectBtns"
                );

                for (let i = 0; i < nowIssueSelectBox04.length; i++) {
                    const optionValue04 = nowIssueSelectBox04.options[i].value;
                    const li04 = document.createElement("li");
                    const button04 = document.createElement("button");
                    button04.classList.add("PopupMoreSelectBtn");
                    button04.type = "button";
                    button04.textContent = optionValue04;
                    li04.appendChild(button04);
                    popCustomSelectBtns04.appendChild(li04);
                }
            });
        }
    }

    complaintregisterSelect04();

    const customSelectView04 = document.querySelectorAll(
        "#complaint_register_Popup .Popup_Custom_SelectView"
    );

    if (customSelectView04) {
        customSelectView04.forEach((btn) => {
            btn.addEventListener("click", function() {
                btn.classList.toggle("active");
                if (btn.nextElementSibling) {
                    btn.nextElementSibling.classList.toggle("active");
                }
            });
        });
    }

    const PopupMoreSelectBtn04 = document.querySelectorAll(
        "#complaint_register_Popup .PopupMoreSelectBtn"
    );

    if (PopupMoreSelectBtn04) {
        PopupMoreSelectBtn04.forEach((moreBtn) => {
            moreBtn.addEventListener("click", function() {
                var moreBtnText04 = moreBtn.innerText;
                console.log(moreBtnText04);
                const parentMoreBtn04 = moreBtn.closest(".Popup_Custom_SelectBtns");
                const editViewBtn04 = parentMoreBtn04.previousElementSibling;
                while (editViewBtn04.firstChild) {
                    editViewBtn04.removeChild(editViewBtn04.firstChild);
                }
                const textNode04 = document.createTextNode(moreBtnText04);

                editViewBtn04.appendChild(textNode04);
                editViewBtn04.classList.remove("active");
                parentMoreBtn04.classList.remove("active");

                const nearByContent04 = moreBtn.closest(".popSelectWrap");
                const nearBySelectBox04 = nearByContent04.querySelector("select");
                nearBySelectBox04.value = moreBtn.textContent;

                console.log(`Selected value: ${nearBySelectBox04.value}`);
            });
        });
    }
// 파일첨부 추가 스크립트
    // 파일 첨부 기본 모습

    const defaultComplaintRegiFileUploadWrap = document.querySelectorAll('.popfileUploadDisplay');

    defaultComplaintRegiFileUploadWrap[0].classList.add('active');

    // 파일 첨부시 모습 변경, x버튼 클릭시 비우기

    const complaintRegiFileEvent = () => {

        if (document.getElementById('complaint_register_Popup_file')) {

            const complaintRegiPopup_myPcFiles = document.getElementById('complaint_register_Popup_file');
            const complaintRegiFiles = complaintRegiPopup_myPcFiles.files;
            // input[type file]을 가진 제일 큰 부모
            const complaintRegiFileInfo = complaintRegiPopup_myPcFiles.closest('.complaintRegiFileInfo');
            // 업로드시 보이는 영역
            const popfileUploadAfterWrap = complaintRegiFileInfo.querySelector('.popfileUploadAfter');
            const allPopupcomplaintRegiContents = popfileUploadAfterWrap.querySelectorAll('.popcontents');

            var complaintRegipopfileInfoName = '';
            var complaintRegipopfileInfoSize = '';
            var complaintRegipopfileInfoType = '';

            complaintRegiPopup_myPcFiles.addEventListener('change', function() {

                // 기존의 ul 초기화
                const popExistContents = popfileUploadAfterWrap.querySelectorAll('.popcontents');

                popExistContents.forEach((list) => {
                    list.remove();
                })

                // 삭제 잘 되었는지 확인
                const newPopExistContents = popfileUploadAfterWrap.querySelectorAll('.popcontents');
                console.log(newPopExistContents.length);

                if (complaintRegiPopup_myPcFiles.files.length > 0) {

                    for (let i = 0; i <= complaintRegiPopup_myPcFiles.files.length - 1; i++) {
                        const thiscomplaintRegiPopFileName = complaintRegiPopup_myPcFiles.files[i].name;
                        const thiscomplaintRegiPopFileSize = complaintRegiPopup_myPcFiles.files[i].size;
                        const thiscomplaintRegiPopFileType = complaintRegiPopup_myPcFiles.files[i].type;

                        // 사이즈를 바꾸자
                        const complaintRegiformattedSize = byteTransformForPop_complaintRegi(thiscomplaintRegiPopFileSize);

                        // 문자열에 변수를 담자
                        complaintRegipopfileInfoName = thiscomplaintRegiPopFileName;
                        complaintRegipopfileInfoSize = complaintRegiformattedSize;
                        complaintRegipopfileInfoType = thiscomplaintRegiPopFileType;

                        // 파일 지우는 버튼용 li

                        const popdeleteLi = '<li class="popbtnbox"><button class="popfileDeleteBtn"></button></li>';

                        // 파일 아이콘, 파일명 들어가는 li
                        const popfilenameBoxLi = `<li class="popcontent popfilenameBox"><figure class="poptypeIcon ${complaintRegipopfileInfoName}"></figure><p class="popfileNameText">${complaintRegipopfileInfoName}</p></li >`;

                        // 업로드 상태
                        const popuploadStatusLi = '<li class="popcontent"><p>-</p></li>';

                        // 파일 크기 들어가는 li
                        const popfileSizeLi = `<li class="popcontent">
                      <p class="popfileSizeText"> ${complaintRegipopfileInfoSize} </p>
                  </li>`;

                        const listBox = popdeleteLi + popfilenameBoxLi + popuploadStatusLi + popfileSizeLi;

                        // ul.contents 만들기
                        const popContentsUl = document.createElement('ul');
                        popContentsUl.classList.add('popcontents');

                        popContentsUl.innerHTML = listBox;

                        popfileUploadAfterWrap.appendChild(popContentsUl);


                        // 값 잘 담겼는지 확인

                        console.log('담긴 파일 이름:' + thiscomplaintRegiPopFileName);


                        // 다음 걸 받기 위해 비워주기

                        complaintRegipopfileInfoName = '';
                        complaintRegipopfileInfoSize = '';
                        complaintRegipopfileInfoType = '';

                    }


                    defaultComplaintRegiFileUploadWrap.forEach((wrap) => {
                        wrap.classList.remove('active');
                    })
                    defaultComplaintRegiFileUploadWrap[1].classList.add('active');

                    if (complaintRegiPopup_myPcFiles.files.length > 2) {
                        popfileUploadAfterWrap.classList.add('scroll');
                    } else {
                        popfileUploadAfterWrap.classList.remove('scroll');
                    }


                } else {

                    complaintRegiPopup_myPcFiles.value = '';
                    defaultComplaintRegiFileUploadWrap.forEach((wrap) => {
                        wrap.classList.remove('active');
                    })
                    defaultComplaintRegiFileUploadWrap[0].classList.add('active');
                }
            })

            // 개별 delbtn 누르면 생기는 이벤트
            popfileUploadAfterWrap.addEventListener('click', function(event) {
                if (event.target.classList.contains('popfileDeleteBtn')) {
                    const popfileDeleteBtns = popfileUploadAfterWrap.querySelectorAll('.popfileDeleteBtn');
                    const popfileDelBtn = event.target;
                    const popnearbyContents = event.target.closest('.popcontents');
                    const popfileNameToRemove = popnearbyContents.querySelector('.popfileNameText').textContent;

                    // 파일명이랑 틀린 것만 저장하는 함수
                    removeFileforPop_complaintRegi(popfileNameToRemove);
                    popnearbyContents.remove();

                    for (let b = 0; b < complaintRegiPopup_myPcFiles.files.length; b++) {
                        console.log('현재 input[type=file]의 files name: ' + complaintRegiPopup_myPcFiles.files[b].name);
                    }

                    console.log('남은 파일의 개수:' + complaintRegiPopup_myPcFiles.files.length);

                    if (complaintRegiPopup_myPcFiles.files.length < 3) {
                        popfileUploadAfterWrap.classList.remove('scroll');
                    }

                    // 현재 선택된 파일이 없으면 input 값 비우기
                    if (complaintRegiPopup_myPcFiles.files.length === 0) {
                        complaintRegiPopup_myPcFiles.value = '';
                        defaultComplaintRegiFileUploadWrap.forEach((wrap) => {
                            wrap.classList.remove('active');
                        });
                        defaultComplaintRegiFileUploadWrap[0].classList.add('active');
                    }
                }


            })

            // 전체 삭제 버튼
            const popallDeleteFileBtn = popfileUploadAfterWrap.querySelector('.popAllDeleteFileBtn');

            popallDeleteFileBtn.addEventListener('click', function() {
                const nowAllContents = popfileUploadAfterWrap.querySelectorAll('.popcontents');
                nowAllContents.forEach((contents) => {
                    contents.remove();
                })

                complaintRegiPopup_myPcFiles.value = '';


                // 값 잘 사라졌는지 확인
                console.log(complaintRegiPopup_myPcFiles.value);


                if (complaintRegiPopup_myPcFiles.files.length == 0) {
                    complaintRegiPopup_myPcFiles.value = '';
                    defaultComplaintRegiFileUploadWrap.forEach((wrap) => {
                        wrap.classList.remove('active');
                    })
                    defaultComplaintRegiFileUploadWrap[0].classList.add('active');
                    popfileUploadAfterWrap.classList.remove('scroll');
                }
            })

            // 용량 크기 변환하는 함수
            function byteTransformForPop_complaintRegi(bytes) {
                const dataSizeforPop = ['Bytes', 'KB', 'MB', 'GB', 'TB']

                if (bytes === 0) return 'not available';

                const d = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)), 10);
                if (d === 0) return `${bytes} ${dataSizeforPop[d]}`;
                return `${(bytes / (1024 ** d)).toFixed(1)} ${dataSizeforPop[d]}`;
            }

            // 파일 삭제처리 하는 함수
            const removeFileforPop_complaintRegi = (popfileNameToRemove) => {
                const filesArrayforPop = Array.from(complaintRegiPopup_myPcFiles.files);
                const popNewDataTransfer = new DataTransfer();
                filesArrayforPop.forEach(file => {
                    if (file.name !== popfileNameToRemove) {
                        popNewDataTransfer.items.add(file);
                    }
                });
                complaintRegiPopup_myPcFiles.files = popNewDataTransfer.files; // 새로운 files 설정
            };
        }

    }

    complaintRegiFileEvent();
//민원협의 내용 등록/수정[E]
//===========================================================================================================
//===========================================================================================================
//민원 완료 보고[S]
//x버튼, 닫기, 승인요청 클릭시 팝업클로즈
const complaintCompletedPopupOpen = document.getElementById("complaint_completed");

if (complaintCompletedPopupOpen) {
  complaintCompletedPopupOpen.querySelectorAll(".topCloseBtn, .finalBtn")
    .forEach(function (btn) {
      btn.addEventListener("click", () => {
        complaintCompletedPopupOpen.classList.remove("active");
      });
    });
}

//민원 완료 보고[E]
//===========================================================================================================