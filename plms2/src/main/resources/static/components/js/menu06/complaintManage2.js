//console.log('왜 진작 스크립트를 분리할 생각을...');

var rowCount2 = 0;
var togiDataList = [];
var deleteFileListArr = [];
/****************************
 * 
 * 민원상신 / 수정 팝업 위한 스크립트들
 * 
 ****************************/

$(function() {
	console.log("===== complainManage2.js start =====");
	
	deleteFileListArr = [];
	
	let objDragAndDrop = $("#newminwon_fileUploadBox");
	
	$('input[type=file][name="newTempMinwon_fileUpload"]').on('change', function(e) {
	    var files = e.originalEvent.target.files; // 파일 선택창에서 선택된 파일들
	    console.log('민원 수정/상신 파일업로드');
	    handleFileUpload2(files, objDragAndDrop);  // 선택된 파일들을 처리하는 함수 호출
	});
	
})

//민원 수정 팝업 열기
function tempSaveMinwonEdit(){
	$("#newcomplaint_Edit_Popup").show();
	showDim();
	newMinwonEditInfoLoad();
}

//민원 수정 팝업 닫기
function complaintEditPopupClose() {
	$("#newcomplaint_Edit_Popup").hide();
	hideDim();
}

//파일 업로드 Step.1
function handleFileUpload2(files, obj) {
	console.log("-------------handleFileUpload---------------");
	//console.log(files);
	for (var i = 0; i < files.length; i++) { // 선택된 파일들을 하나씩 처리
		var fd = new FormData(); // FormData 객체 생성 (파일 업로드를 위한 객체)
		fd.append('file', files[i]); // 파일 객체를 FormData에 추가

		// var status = new createStatusbar($("#fileTitleUl"),files[i].name,files[i].size,rowCount); // 파일 업로드 상태바 생성
		var status = new createStatusbar_minwonEdit($("#newminwon_fileTitleUl"), files[i].name, files[i].size, files[i].nfname); // 파일 업로드 상태바 생성
		sendFileToServer_minwonEdit(fd, status); // 서버로 파일 전송 함수 호출

		rowCount2++; // 파일이 추가될 때마다 rowCount를 증가시켜 고유한 id를 유지
		
		//scrollToBottomOfFileList(); // 파일이 추가될 때 스크롤 이동
	}
}

// Status bar 생성 함수
function createStatusbar_minwonEdit (obj, name, size, no) {
	console.log("----------start createStatusBar------------");
	//console.log(obj.html());

	var sizeStr = "";
	var sizeKB = size / 1024; // 파일 크기를 문자열로 표시하기 위한 변수
	if (parseInt(sizeKB) > 1024) {
		var sizeMB = sizeKB / 1024;
		sizeStr = sizeMB.toFixed(2) + " MB"; // MB로 변환
	} else {
		sizeStr = sizeKB.toFixed(2) + " KB"; // KB로 표시
	}

	let nextNo = ($("#newminwon_fileTitleUl").children().length) - 1;

	//보이는 화면 UI 추가 - obj 말고 그냥 div id 정했으니 그냥 추가 해줘도 됨.
    let rowHtml = '';
    
    rowHtml += '<ul class="popcontents" name="fileListUl">';
	rowHtml += '<li class="popBtnbox">';
	rowHtml += '	<button class="popAllDeleteFileBtn" onclick="deleteFileListFunc(this, '+nextNo+')"></button>';
	rowHtml += '</li>';
	rowHtml += '<li class="popcontent popfilenameBox">';
	rowHtml += '<input type="hidden" value="'+ +'">';
	rowHtml += '<figure class="poptypeIcon"></figure><p class="popfileNameText" id="minwonFileName_'+nextNo+'">'+name+'</p></li>';
	rowHtml += '<li class="popcontent"><p>완료</p></li>';
	rowHtml += '<li class="popcontent"><p class="popfileSizeText">'+sizeStr+'</p></li>';
	rowHtml += '</ul>';
	
	$("#newminwon_fileTitleUl").append(rowHtml);
	
	
	//scrollToBottomOfFileList(); // 파일이 추가될 때 스크롤 이동
}


function sendFileToServer_minwonEdit(formData, status) {
	
	var uploadURL = "/issue/fileUpload/post"; //Upload URL
	var extraData = {}; //Extra Data.
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
		contentType: false,
		processData: false,
		cache: false,
		data: formData,
		success: function(data) {
			// status.setProgress(100);
			console.log(data);
			console.log(data.resultData);
			//console.log("-------------sendFileToServer-----------------------");
			//console.log($(this).parent().parent().parent().parent());
			//$("#status1").append("File upload Done<br>");    
			uploadFiles.push(data.resultData.fpath);    
			//allCheckEventLandRightsRegist();   
		}
	});
	//status.setAbort(jqXHR);
}


/***** 버튼 눌렀을시 ul 추가 삭제 이벤트 (토지 정보) *****/
function infoadd() {
    // ul이 들어갈 공간 지정
    const landinfoList = document.querySelector(".landinfo_box");
    // 체크박스 시작 id번호
    let checkboxCounter = 2;

    landinfoList.addEventListener("click", function(event) {
        if (
            event.target &&
            event.target.classList.contains("complaint_addition")
        ) {
            addLandInfo();
        }
        if (event.target && event.target.classList.contains("complaint_delete")) {
            deleteLandInfo(event.target);
        }
    });

    function addLandInfo() {
        // ul 추가
        const newListItem = document.createElement("ul");
        // 추가 되는 ul에 "landinfo_content" class 이름 붙힘
        newListItem.classList.add("landinfo_content");

        // ul 추가 될때마다 체크박스 id에 +1씩 더해서 나오게
        const checkboxId = `newcomplaint_checkbox${checkboxCounter++}`;

        // 추가 버튼 누를시 추가되는 내용
        newListItem.innerHTML = `
	              <li class="landinfo_content_2" id="minwon_${document.querySelectorAll(".landinfo_content").length + 1}" value="${document.querySelectorAll(".landinfo_content").length + 1}">
	              	${document.querySelectorAll(".landinfo_content").length + 1}
	              </li>
	              <li class="landinfo_content_3">
	                <input type="checkbox" id="${checkboxId}" class="approve_checkbox" />
	                <label for="${checkboxId}" class="approve_checkbox_label"></label>
	              </li>
	              <li class="landinfo_content_4">
	                <input type="text" name="minwonAddr" id="minwonAddr_${document.querySelectorAll(".landinfo_content").length + 1}"/>
	                <button class="landStatusPopOpenBtn" value="${document.querySelectorAll(".landinfo_content").length + 1}">검색</button>
	              </li>
	              <li class="landinfo_content_5"><input type="text" id="minwonRegiYn_${document.querySelectorAll(".landinfo_content").length + 1}" readonly /></li>
	              <li class="landinfo_content_6"><input type="text" id="minwonContYn_${document.querySelectorAll(".landinfo_content").length + 1}" readonly /></li>
	              <li class="landinfo_content_7"><input type="text" id="minwonActualAreaYn_${document.querySelectorAll(".landinfo_content").length + 1}" /></li>
	              <li class="landinfo_content_8">
	                <div class="landinfocontent_btn_wrap1">
	                  <input type="hidden" name="addrInfoStr" id="minwonAddrInfo_${document.querySelectorAll(".landinfo_content").length + 1}"/>
	                  <button class="complaint_addition">추가</button>
	                </div>
	                <div class="landinfocontent_btn_wrap2">
	                  <button class="complaint_delete">삭제</button>
	                </div>
	              </li>
	              `;

        // 검색 버튼에 class명 추가
        // ul들어갈 공간 div의 자식 요소로 ul지정
        landinfoList.appendChild(newListItem);
    }

    // 행 삭제
    function deleteLandInfo(button) {
        // 누른 삭제 버튼이 위치한 행
        const listItem = button.closest(".landinfo_content");
        // 누른 삭제 버튼이 있는 행 제거
        if (listItem) {
            landinfoList.removeChild(listItem);
        }
        // 순번 업데이트
        updateOrderNumbers();

        //대표필지 없으면 대표 필지정보 초기화
        if ($('.landinfo_box input[type="checkbox"]:checked').length === 0) {
            setReqLand();
        }
    }

    // 순번 업데이트
    function updateOrderNumbers() {
        // 모든 .landinfo_content 요소를 선택
        document.querySelectorAll(".landinfo_content").forEach((item, index) => {
            // 모든 .landinfo_content의 순번을 업데이트
            item.querySelector(".landinfo_content_2").textContent = index + 1;
        });
    }
}

infoadd();

/***** 민원 내용 민원인/토지주 추가 + 셀렉트 *****/
function complaintsselect() {
    function initializeCustomSelect(contentitem) {
        const nowIssueSelectBox03 = contentitem.querySelector("select");

        if (!nowIssueSelectBox03) return;

        const popCustomSelectBox03 = contentitem.querySelector(
            ".Popup_Custom_SelectBox"
        );
        const popCustomSelectBtns03 = popCustomSelectBox03.querySelector(
            ".Popup_Custom_SelectBtns"
        );

        // 중복을 피하기 위해 초기화
        popCustomSelectBtns03.innerHTML = "";

        nowIssueSelectBox03.querySelectorAll("option").forEach((option) => {
            const optionValue03 = option.value;
            const li03 = document.createElement("li");
            const button03 = document.createElement("button");
            button03.classList.add("PopupMoreSelectBtn");
            button03.type = "button";
            button03.textContent = optionValue03;
            li03.appendChild(button03);
            popCustomSelectBtns03.appendChild(li03);
        });

        const selectViewButton = popCustomSelectBox03.querySelector(
            ".Popup_Custom_SelectView"
        );
        selectViewButton.addEventListener("click", function() {
            selectViewButton.classList.toggle("active");
            popCustomSelectBtns03.classList.toggle("active");
        });

        // 버튼 클릭시 옵션 선택 처리
        popCustomSelectBtns03
            .querySelectorAll(".PopupMoreSelectBtn")
            .forEach((moreBtn) => {
                moreBtn.addEventListener("click", function() {
                    const moreBtnText = moreBtn.innerText;
                    const editViewBtn = popCustomSelectBox03.querySelector(
                        ".Popup_Custom_SelectView"
                    );
                    editViewBtn.textContent = moreBtnText;
                    editViewBtn.classList.remove("active");
                    popCustomSelectBtns03.classList.remove("active");
                    nowIssueSelectBox03.value = moreBtn.textContent;

                    //console.log(`Selected value: ${nowIssueSelectBox03.value}`);
                });
            });
    }

    function newcomplaintSelect03() {
        const newcomplaintSelectWrapitems = document.querySelectorAll(
            "#newcomplaint_Popup .popSelectWrap"
        );
        newcomplaintSelectWrapitems.forEach((contentitem) => {
            initializeCustomSelect(contentitem);
        });
    }

    // 페이지로드시 기존의 select 요소 초기화
    newcomplaintSelect03();

    const landinfoList = document.querySelector(".com_content_contents_1");

    landinfoList.addEventListener("click", function(event) {
        if (
            event.target &&
            event.target.classList.contains("complaint_addition")
        ) {
            addLandInfo();
        }
        if (event.target && event.target.classList.contains("complaint_delete")) {
            deleteLandInfo(event.target);
        }
    });

    function addLandInfo() {
        const newListItem = document.createElement("ul");
        newListItem.classList.add("landowner_wrap");

        newListItem.innerHTML = `
	            <li class="landowner_num"><input type="text" value="${document.querySelectorAll(".landowner_wrap").length + 1}" readonly /></li>
	            <li><input type="text" id="landowner_name_${document.querySelectorAll(".landowner_wrap").length + 1}" /></li>
	            <li><input type="text" id="landowner_birthday_${document.querySelectorAll(".landowner_wrap").length + 1}" /></li>
	            <li><input type="text" id="landowner_relation_${document.querySelectorAll(".landowner_wrap").length + 1}" /></li>
	            <li><input type="text" id="landowner_phone_${document.querySelectorAll(".landowner_wrap").length + 1}"/></li>
	            <li class="popSelectWrap">
	                <div class="hidden_SelectBox">
	                    <select hidden>
	                        <option value="Y">Y</option>
	                        <option value="N">N</option>
	                    </select>
	                </div>
	                <div class="Popup_Custom_SelectBox">
	                    <button class="Popup_Custom_SelectView" id="landowner_presence_${document.querySelectorAll(".landowner_wrap").length + 1}" data-idx="${document.querySelectorAll(".landowner_wrap").length + 1}" onclick="selectPresence(this)">Y/N</button>
	                    <ul class="Popup_Custom_SelectBtns"></ul>
	                </div>
	            </li>
	            <li class="landowner_btns">
	                <div class="landinfocontent_btn_wrap1">
	                    <button class="complaint_addition">추가</button>
	                </div>
	                <div class="landinfocontent_btn_wrap2">
	                    <button class="complaint_delete">삭제</button>
	                </div>
	            </li>
	        `;

        landinfoList.appendChild(newListItem);

        // 추가된 커스텀 셀렉트 요소 초기화
        initializeCustomSelect(newListItem.querySelector(".popSelectWrap"));
    }

    // 행 삭제
    function deleteLandInfo(button) {
        const listItem = button.closest(".landowner_wrap");
        if (listItem) {
            landinfoList.removeChild(listItem);
        }
        updateOrderNumbers();
    }

    // 순번 업데이트
    function updateOrderNumbers() {
        document.querySelectorAll(".landowner_wrap").forEach((item, index) => {
            item.querySelector(".landowner_num input").value = index + 1;
        });
    }
}

complaintsselect();

//신규민원 -> 주소 검색
$(document).on("click", ".landinfo .landStatusPopOpenBtn", function() {
	
	const targetId = 'minwonAddr_' + ($(this).val());
	const targetIdx = $(this).val();
	var addr = $(this).parent().find("input").val().trim();
	
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
		$("#minwinEditPopAddrSearchPopNoPnu").attr('data-index', targetIdx);
   	});
});

//주소검색 팝업에서 선택 버튼 - 주소 검색한거 선택
function miwonSearchAddr(obj) {
	let selectAddrInfo = queryValueToObject($(obj).attr('data-info'));
	let idxCheck = $(obj).attr('data-index');
	//console.log(selectAddrInfo);
	//console.log(idxCheck);
	
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



//주소 팝업 닫기 
function searchPopClose() {
	
	let popupOnCheck = $("#minwon_searchPopupWrap").hasClass('active');
	
	if(popupOnCheck) {
		$("#minwon_searchPopupWrap").removeClass('active');
	} else {
		$("#minwon_searchPopupWrap").addClass('active');
	}

}

//민원 수정 정보 세팅
function newMinwonEditInfoLoad() {
	
	let param = {"MW_SEQ" : $("#minwonSeq").val()};
	
	$.ajax({
		url: '/issue/tempsaveMinwonInfoLoad',
		type: "POST",
		data: param,
		success : function(data, jqXHR) {
			loadTempMinwonDataSetting(data);
		},
		error: function(err) {
			console.log(err);
		}
	})
	.done(function(data){
		if(data.result) {
			console.log(data);
		}
	})
	.fail(function() {
		console.error("AJAX 요청 실패");
	})
	;
	
	
}

//불러온 데이터 세팅
function loadTempMinwonDataSetting(data) {
	//console.log(data);
	let resultList = data.resultList;	//민원상세정보
	let tmpList = data.tmpList;		//임시저장할때의정보..?
	let tojiList = data.tojiList;	//토지정보
	let fileList = data.fileList;	//첨부파일
	let agreeList = data.agreeList;
	
	//민원정보 세팅
	if(Object.entries(resultList).length > 0) {
		$("input[name='MW_TITLE']").val(resultList.mm_mw_title);
		$("#tempMinwonJisa").text(resultList.mm_jisa);
		$("input[name='MW_OCCUR_DATE']").val(resultList.mm_mw_occur_date);
	}
	
	//토지정보 세팅
	if(tojiList.length > 0) {
		
		let tojiHtml = '';
		
		let repToji = null;	//대표필지
		let repTojiIdx = 0;
		
		//for[S]
		for(let k = 0 ; k < tojiList.length ; k++) {
			let tojiInfo = tojiList[k];
			let tojiString = JSON.stringify(tojiInfo).replace(/"/g, '&quot;');
			
			//대표필지 찾기
			if(tojiInfo.rep_yn == 'Y') {
				repToji = tojiInfo;
				repTojiIdx = (k+1);
			}
			
			tojiHtml += '<ul class="landinfo_content">';
				
			tojiHtml += '<li class="landinfo_content_2" id="minwon_'+(k+1)+'">'+(k+1)+'</li>';
			tojiHtml += '<li class="landinfo_content_3">';
			tojiHtml += '	<input type="checkbox" id="newcomplaint_checkbox'+(k+1)+'" class="approve_checkbox" />';
			tojiHtml += '	<label for="newcomplaint_checkbox'+(k+1)+'" class="approve_checkbox_label"></label>';
			tojiHtml += '</li>';
			tojiHtml += '<li class="landinfo_content_4">';
			tojiHtml += '	<input type="text" name="minwonAddr" id="minwonAddr_'+(k+1)+'" value="'+tojiInfo.addr+'" />';
			tojiHtml += '	<button class="landStatusPopOpenBtn" value="'+(k+1)+'">검색</button>';
			tojiHtml += '</li>';
			tojiHtml += '<li class="landinfo_content_5"><input type="text" id="minwonRegiYn_'+(k+1)+'" value="'+tojiInfo.registed_yn+'" readonly/></li>';
			tojiHtml += '<li class="landinfo_content_6"><input type="text" id="minwonContYn_'+(k+1)+'" value="'+tojiInfo.permitted_yn+'" readonly/></li>';
			tojiHtml += '<li class="landinfo_content_7"><input type="text" id="minwonActualAreaYn_'+(k+1)+'" value="'+tojiInfo.mp_actualarea+'" onkeyDown="onlyNumberingInput(event)" maxlength="15"/></li>';
			tojiHtml += '<li class="landinfo_content_8">';
			tojiHtml += '	<input type="hidden" name="addrInfoStr" id="minwonAddrInfo_'+(k+1)+'" value="'+tojiString+'" />';
			tojiHtml += '	<button class="complaint_addition">추가</button>';
			tojiHtml += '</li>';
			
			tojiHtml += '</ul>';
			
		}//for[E]
		$("#minwon_tojiInfoList").empty();
		$("#minwon_tojiInfoList").append(tojiHtml);
		
		//대표필지
		if(repToji != null) {
			$("input[name='REP_ADDRESS']").val(repToji.addr);
			$("input[name='REGISTED_YN']").val(repToji.registed_yn);
			$("input[name='PERMITTED_YN']").val(repToji.permitted_yn);
			
			$("#newcomplaint_checkbox"+repTojiIdx).prop("checked", true);
			
		}
	}
	
	//민원내용
	minwonin_name_Arr = resultList.minwonin_tojiju_nm.split("|");	//성명
	minwonin_birth_Arr = resultList.minwonin_tojiju_birth.split("|");	//생년월일
	minwonin_relation_Arr = resultList.tojiju_relation.split("|");	//토지주와 관계
	minwonin_phone_Arr = resultList.minwonin_phone.split("|");	//연락처
	minwonin_presence_Arr = resultList.field_presence.split("|");	//현장입회
	
	let minwoninHtml = '';
	
	//for[S]
	for(let i = 0  ; i < minwonin_name_Arr.length ; i++) {
		let m_name = minwonin_name_Arr[i];
		let m_birth = minwonin_birth_Arr[i];
		let m_relation = minwonin_relation_Arr[i];
		let m_phone = minwonin_phone_Arr[i];
		let m_presence = minwonin_presence_Arr[i];
		
		minwoninHtml += '<ul class="landowner_wrap">';
		
		minwoninHtml += '	<li class="landowner_num">';
		minwoninHtml += '		<input type="text" value="'+(i+1)+'" readonly />';
		minwoninHtml += '	</li>';
		minwoninHtml += '	<li><input type="text" id="landowner_name_'+(i+1)+'" value="'+m_name+'" maxlength="30"/></li>';
		minwoninHtml += '	<li><input type="text" id="landowner_birthday_'+(i+1)+'" value="'+m_birth+'" /></li>';
		minwoninHtml += '	<li><input type="text" id="landowner_relation_'+(i+1)+'" value="'+m_relation+'" maxlength="20" /></li>';
		minwoninHtml += '	<li><input type="text" id="landowner_phone_'+(i+1)+'" value="'+m_phone+'" maxlength="15" /></li>';
		minwoninHtml += '	<li class="popSelectWrap">';
		minwoninHtml += '		<div class="hidden_SelectBox">';
		minwoninHtml += '			<select hidden>';
		minwoninHtml += '				<option value="Y">Y</option>';
		minwoninHtml += '				<option value="N">N</option>';
		minwoninHtml += '			</select>';
		minwoninHtml += '		</div>';
		minwoninHtml += '		<div class="Popup_Custom_SelectBox">';
		minwoninHtml += '			<button class="Popup_Custom_SelectView" id="landowner_presence_'+(i+1)+'" data-idx="'+(i+1)+'" onclick="selectPresence(this)">'+m_presence+'</button>';
		minwoninHtml += '			<ul class="Popup_Custom_SelectBtns"></ul>';
		minwoninHtml += '		</div>';
		minwoninHtml += '	</li>';
		minwoninHtml += '	<li class="landowner_btns_default">';
		minwoninHtml += '		<button class="complaint_addition">추가</button>';
		minwoninHtml += '	</li>';
		
		minwoninHtml += '</ul>';
	}
	//for[E]
	
	$("#minwonin_totiju_body").empty();
	$("#minwonin_totiju_body").append(minwoninHtml);
	
	//토지이력
	$("textarea[name='MW_HISTORY']").val(resultList.toji_history);
	//요구사항
	$("textarea[name='MW_REQUIREMENTS']").val(resultList.minwon_requirement);
	//내용
	$("textarea[name='MW_CONTENTS']").val(resultList.minwon_content);
	
	//첨부파일
	if(fileList.length > 0) {
		let fileHtml = '';
		
		for(let z = 0 ; z < fileList.length ; z++) {
			let fileInfo = fileList[z];
			
			
			fileHtml += '<ul class="popcontents" name="fileListUl">';
			fileHtml += '<li class="popBtnbox">';
			fileHtml += '	<button class="popAllDeleteFileBtn" onclick="deleteFileListFunc(this, '+z+')"></button>';
			fileHtml += '</li>';
			fileHtml += '<li class="popcontent popfilenameBox">';
			fileHtml += '<input type="hidden" value="-">';
			fileHtml += '<figure class="poptypeIcon"></figure><p class="popfileNameText" id="minwonFileName_'+z+'">'+fileInfo.file_nm+'</p></li>';
			fileHtml += '<li class="popcontent"><p>완료</p></li>';
			fileHtml += '<li class="popcontent"><p class="popfileSizeText">-</p></li>';
			fileHtml += '</ul>';
			
		}
		$("#newminwon_fileTitleUl").append(fileHtml);
	}
}

//대표필지 체크박스 스크립트
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

//대표 필지정보 입력
function setReqLand(addr = "", reg_yn = "", contract_yn = "") {
	$('.daepyo_pilji_list_1 input[type="text"]').val(addr); //주소
	$('.daepyo_pilji_list_2 input[type="text"]').val(reg_yn);  //등기여부
	$('.daepyo_pilji_list_3 input[type="text"]').val(contract_yn); //계약여부
}

//현장입회여부 셀렉트박스
function selectPresence(obj){
	console.log($(obj).attr('data-idx'));
	
	//select 박스, ul요소 가져오기
	let selectBox = $(obj).closest('li').find('.hidden_SelectBox select');
	let customSelectList = $(obj).closest('li').find('.Popup_Custom_SelectBtns');
	
	// Step 2. ul안에 기존 li요소들제거
	customSelectList.empty();
	
	if(customSelectList.hasClass('active')) {
		customSelectList.removeClass('active');
		return false;
	}
	
	// Step 3. option항목들 순회
	selectBox.find('option').each(function() {
		let optionTxt =  $(this).text(); // 옵션의 텍스트;
		
		// Step 4. 새로운 li요소 생성하고 붙이고
		let li = $('<li></li>');
		let p = $('<p></p>').text(optionTxt);
		
		li.append(p);
		
		//li에 클릭 이벤트 추가 및 버튼 텍스트 변경
		li.on('click', function(){
			$(obj).text(optionTxt);
			customSelectList.removeClass('active');	//선택하면 사라져야.
		});
		
		// Step 5. ul에 li요소 추가
		customSelectList.append(li);
	});
	
	customSelectList.addClass('active');
}

//파일삭제 -  저장 눌러야지 삭제됨. (DB만)
function deleteFileListFunc(obj, idx) {
	let deleteFileNm = $("#minwonFileName_"+idx).text();
	$("[name='fileListUl'").eq(idx).remove();
	deleteFileListArr.push(deleteFileNm)
}


//신규민원팝업 데이터 json
function getPopupJsonData2() {
	
	var formSerializeArray = $('#newEditMinwonSaveFormPop').serializeArray();
	len = formSerializeArray.length;
	
	var dataObj = {};	//return할 param 내용
	
	for(let i = 0; i < len; i++) {
		dataObj[formSerializeArray[i].name] = formSerializeArray[i].value;
	}

	dataObj.JISA = $("#tempMinwonJisa").text();

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
		obj.rep_yn = $(ul).find('.landinfo_content_3 input').is(':checked') ? "Y" : "N"; //대표필지여부
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
		obj.attendance = $("#landowner_presence_"+index).text() == 'Y/N'? 'N' : $("#landowner_presence_"+index).text(); //현장입회
		dataObj.userList.push(obj);
	});

	//첨부파일
	let fileCheck = [];
	
	for(let t = 0 ; t < $("#newminwon_fileTitleUl").children().length ; t++){
		fileCheck.push($("#minwonFileName_"+t).text());
	}
	
	//첨푸파일 삭제 리스트
	dataObj.deleteFileList = deleteFileListArr;
	
	//dataObj.files = newComplaintRegiFiles;
	//dataObj.filesLength = newComplaintRegiFiles.length;
	fileCheck.pop();
	dataObj.files = fileCheck;
	dataObj.filesLength = fileCheck.length;

	//신규 파일은 SEQ가 없음
	dataObj.MW_SEQ = $("#minwonSeq").val()
	
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
		let owerPresence = commonNvl( $("#landowner_presence_"+(p+1)).text(), "N" )  + "|";

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

	dataObj.makeType = "EDIT";

	return dataObj;
}


//저장버튼
function editInfoSave() {
	let paramData = getPopupJsonData2();
	console.log(paramData);
	
	$.ajax({
		url: "/issue/saveMinwonData",
		data: JSON.stringify(paramData),
		async: true,
		type: "POST",
		dataType: "json",
		contentType: 'application/json; charset=utf-8',
		processData: false,
		success: function(data, jqXHR) {
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
			//console.log(jqXHR);
			console.log(jqXHR.readyState);
			//console.log(jqXHR.responseText);
			console.log(jqXHR.responseJSON);
		}
	}); //end ajax
	
}

//저장버튼
function editInfoSangsin() {
	let paramData = getPopupJsonData2();
	//상신할땐 Flag 값 Y로 전달. 임시저장땐 전달 안해도 OK
	paramData.SANGSIN_FLAG = "Y";
	console.log(paramData);
	
	/*
	$.ajax({
		url: "/issue/saveMinwonData",
		data: JSON.stringify(paramData),
		async: true,
		type: "POST",
		dataType: "json",
		contentType: 'application/json; charset=utf-8',
		processData: false,
		success: function(data, jqXHR) {
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
	*/
}