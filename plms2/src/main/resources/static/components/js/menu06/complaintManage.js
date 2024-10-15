var dataInfo = {};
//실행
var mw_seq;
var fileRowCount = 0;

///start
$(function() {
	console.log("===== complainManage.js start =====");
	// 현재 페이지의 URL에서 쿼리 스트링 부분을 가져옴
	const queryString = window.location.search;
	// URLSearchParams 객체 생성 (쿼리 스트링을 파싱)
	const urlParams = new URLSearchParams(queryString);
	// 파라미터 값 가져오기 (예: ?paramName=value 형태에서 paramName의 값)
	mw_seq = urlParams.get('mw_seq');
	//console.log("mw_seq = " + mw_seq);
	
	//페이지 로드시 상세화면 내용 불러오기
	self.onDataLoad();
	
	let objDragAndDrop = $("#minwonconsult_fileUploadBox");
	
	//민원협의 내용 등록/수정
	$('input[type=file][name="fileUpload"]').on('change', function(e) {
	    var files = e.originalEvent.target.files; // 파일 선택창에서 선택된 파일들
	    console.log('민원협의 내용 등록/수정 파일업로드');
	    handleFileUpload(files, objDragAndDrop);  // 선택된 파일들을 처리하는 함수 호출
	});
	
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

//민원협의내용등록수정 function 호출
//complainManageAddComplainPopEvet();


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

//민원완료 작동 버튼 function호출
//complainManageComplainFinPopEvet();

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
	//const complaintRegiPopup_myPcFiles = document.getElementById('complaint_register_Popup_file');
	//const complaintRegiFiles = complaintRegiPopup_myPcFiles.files;
	
	let fileCheck = [];
	
	/* 추후 div id, name 설정 필요
	for(let t = 0 ; t < $("#minwon_consult_uploadfileList").children().length ; t++) {
		fileCheck.push();
	}
	*/
	//임시로 처음으로 첨부한 파일 하나만 넣습니다.
	fileCheck.push($(".popfileNameText").text());
	
	//dataObj.files = complaintRegiFiles;
	//fileCheck.pop();
	dataObj.files = fileCheck;
	dataObj.filesLength = fileCheck.length;

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
			$('#pop_dopcoAllWrappers .land_contents').text(result.mw_contents); //내용
			
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
				
				$.each(minwontojijus, function(index, item) {
				let newHtml = `
					 <ul class="complainant_info">
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
				$('#pop_minwonin_tojiju_nm').append(newHtml);
				});
					
					//$('#minwonin_tojiju_body').append(noDataUl);
				
			
				
				
				
			
			
			// 토지이력
			$('#toji_history').val(result.toji_history || '-');
			$('#pop_toji_history').val(result.toji_history || '-');
			
			// 요구사항
			$('#minwon_requirement').val(result.minwon_requirement || '-');
			$('#pop_minwon_requirement').val(result.minwon_requirement || '-');
			
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

//파일 업로드 했을때 step.1
function handleFileUpload(files, obj) {
	console.log("-------------handleFileUpload---------------");
	console.log(files);
	
	for (var i = 0; i < files.length; i++) { // 선택된 파일들을 하나씩 처리
        var fd = new FormData(); // FormData 객체 생성 (파일 업로드를 위한 객체)
        
        fd.append('file', files[i]); // 파일 객체를 FormData에 추가
 		
        //var status = new createStatusbar($("#fileTitleUl"), files[i].name, files[i].size, fileRowCount); // 파일 업로드 상태바 생성
        
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
 			console.log(data);
 			console.log(data.resultData);
        }
    }); 
 	
}
//===========================================================================================================

//======================민원 대응방안 수립 팝업 [S]========================
//문서보기 버튼 클릭 시 민원 대응방안 수립 팝업 열기
$(document).on("click", "#minwonResponsePopup", function() {
	// 현재 페이지의 URL에서 mw_seq 파라미터 값 추출
	const urlParams = new URLSearchParams(window.location.search);
	const mwSeq = urlParams.get('mw_seq');  // 'mw_seq' 파라미터 값 가져옴

	var datas = { "address": "example address", "mw_seq": mwSeq }; // mw_seq를 데이터에 포함

	console.log("문서보기 클릭됨");
	console.log("mw_seq: ", mwSeq);

	// Ajax 요청을 통해 데이터 처리
	$.ajax({
		url: "/issue/minwonBangan",
		type: "POST",
		data: datas
	})
		.done(function(fragment) {
			console.log("*** 데이터 수신 성공 ***");
			//console.log(fragment);

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
//========================민원 대응방안 수립 팝업 [E]========================
//==============================================================================================================
//========================민원협의 내용 등록/수정 [S]========================

//민원협의 내용 등록/수정 팝업
function minwon_contentInsertPop() {
	
}

//민원 완료 보고 팝업
function minwon_completeReportPop() {
	
}


//************************************************************************

//민원협의 팝업 열기
function minwonConsultPopupOpen() {
	console.log('팝업오픈');
	$("#complaint_register_Popup").addClass('active');
	minwonConsultInfoSearch();	//민원협의 정보 조회
}

//민원협의 팝업 닫기
function minwonConsultPopupClose() {
	$("#complaint_register_Popup").removeClass('active');
}


//파일 업로드 했을때 step.1
function handleFileUpload(files, obj) {
	console.log("-------------handleFileUpload---------------");
	console.log(files);
	
	for (var i = 0; i < files.length; i++) { // 선택된 파일들을 하나씩 처리
        var fd = new FormData(); // FormData 객체 생성 (파일 업로드를 위한 객체)
        
        fd.append('file', files[i]); // 파일 객체를 FormData에 추가
 		
        var status = new createStatusbar($("#fileTitleUl"), files[i].name, files[i].size, fileRowCount); // 파일 업로드 상태바 생성
        
        //sendFileToServer(fd,status); // 서버로 파일 전송 함수 호출
		
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
 			console.log(data);
 			console.log(data.resultData);
        }
    }); 
 	
    //status.setAbort(jqXHR);
}


function minwonConsultInfoSearch() {
	console.log('민원협의 조회');
}
//========================민원협의 내용 등록/수정 [E]========================
//************************************************************************
//==============================================================================================================
//========================민원 완료 [S]========================

$('.closeBtn, .topCloseBtn').on('click', function(){
	$('#complaint_completed').removeClass('active');
});

function complaintPopupOpen() {
	$('#complaint_completed').addClass('active');
}






//========================민원 완료 [E]========================