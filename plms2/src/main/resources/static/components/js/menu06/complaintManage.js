var dataInfo = {};
//실행
var mw_seq;
var fileRowCount = 0;

//
var issueTypeList = '';	//이슈유형
var selectCodeGroupVal = '';	//선택한 권리확보 유형

// 민원완료 팝업 하나만 띄우기
let popupWindow = null;
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
/*	$('input[type=file][name="fileUpload"]').on('change', function(e) {
	    var files = e.originalEvent.target.files; // 파일 선택창에서 선택된 파일들
	    console.log('민원협의 내용 등록/수정 파일업로드');
	    handleFileUpload(files, objDragAndDrop);  // 선택된 파일들을 처리하는 함수 호출
	});*/
	
	
	//민원 대응방안 수립 - 권리확보 스크립트
	$("input[name='complainRespondRights']").on('click', function(){
		let complainRespondRightsVal = ($(this).val());
		respondContractMenuChange(complainRespondRightsVal);
	});
	
	//민원 대응방안 수립 - 계약여부 스크립트
	$("input[name='complainRespondContract']").on('click', function(){
		let complainRespondContractVal = ($(this).val());
		issueTypeMenuSetting(complainRespondContractVal);
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
	
	// STATUS 값 가져오기 (선택된 옵션의 텍스트 값으로 설정)
	var selectedStatus = $('#statusBtn').text();
	dataObj.STATUS = selectedStatus;

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

	// 콘솔 출력 (디버깅용)
	console.log("선택된 STATUS 텍스트: " + selectedStatus);
	console.log("dataObj[STATUS]: " + dataObj["STATUS"]);
	console.log("dataObj 전체 내용:", dataObj);
	//return JSON.stringify(dataObj);
	return dataObj;
}


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
			$('#pop_dopcoAllWrappers .complaints_content_box').text(result.mw_contents); //내용
			
			// 이슈 유형
			let issueType = `${result.code_str1} >> ${result.code_str2} >> ${result.code_str3}`;
			$('#mwdetail_issuetype').val(issueType);
			$('#pop_mwdetail_issuetype').text(issueType);
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
					console.log(item);
					var newItem = `
                <ul class="contents">
                <li class="content">
                    <input type="text" readonly class="notWriteInput" value="${item.rep_yn || '-'}">
                </li>
                <li class="content largeWidth">
                    <input type="text" readonly class="notWriteInput" value="${item.addr || '-'}">
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
			
			// 민원 완료 > 민원 토지 ul 추가
			if (tojiList != null && tojiList != undefined && tojiList.length > 0) {
				$('#pop_complaintInfo_togi ul').not(function () {
					return $(this).hasClass('complaintinfo_update_th');
				}).remove();
				
				$.each(tojiList, function(index, item) {
					let jisangNo = tojiList[index].jisang_no;
					let status = tojiList[index].jisang_status;
					let updateYn = tojiList[index].update_yn || 'N';
					let mp_idx = tojiList[index].mp_idx;
					var newItem = `<ul class="complainant_info">
							<li>${tojiList[index].addr || '-'}</li>
							<li>${updateYn}</li>
							<li class="complaintinfo_update_btn">
								<button onclick="openPopup('${jisangNo}', '${status}', ${mp_idx})">상세보기</button>
							</li>
						</ul>`;
					$('#pop_complaintInfo_togi').append(newItem);
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
                    <button class="fileDownloadBtn" onclick="attachFileDownload('${item.file_path}', '${item.file_nm}', '${item.mw_seq}', '${item.file_seq}', 'minwon')">
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
                <ul class="contents minwon-agree-row" id="minwonAgreeUl">
                <li class="content">
										<input type="hidden" class="agree-seq" id="agreeSeq" value="${item.agree_seq}">
                    <input type="text" placeholder="" readonly="" class="notWriteInput" value="${item.agree_date || '-'}">
                </li>
                <li class="content smallWidth">
                    <input type="text" placeholder="" readonly="" class="notWriteInput" value="${item.status_str || '-'}">
                </li>
                <li class="content fileNameWidth">
                    <input type="text" placeholder="" readonly="" class="notWriteInput" value="${item.agree_title || '-'}">
                </li>
                <li class="content btnsWrap">
                    <a href="${item.url}" target="_blank">
                    	<button class="viewDetailButton">문서보기</button>
                    </a>
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

	// Ajax 요청을 통해 데이터 처리 (민원 대응방안 내용 및 코드조회까지 해옴)
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
	
	if($("#issuecodeList").val() != ''){
		issueTypeList = JSON.parse($("#issuecodeList").val()).codeResultList;
	} else {
		alert('이슈유형 불러오는데 오류가 발생했습니다.');
	}
	
	showDim();
	
});

// 민원 대응방안 수립 팝업 닫기 버튼
$(document).on("click", "#complainRespondContentBoxs .complainRespondcloseBtn", function() {
	$("#complainRespondContentBoxs").hide();  // 팝업을 다시 숨김
	hideDim();
});

//계약여부 메뉴 선택시 스크립트
function respondContractMenuChange(rightsVal) {
	console.log(rightsVal);
	
	//지상권설정 : GY || 지상권미설정 : GN || 점용 : DY || 미점용 : DN
	
	let selectIssueArr = [];
	
	
	//계약여부 값 판단
	if(rightsVal == '지상권설정') {
		selectCodeGroupVal = 'DY';	//현재 이 변수는 맨위에 있습니다.
	} else if(rightsVal == '지상권미설정') {
		selectCodeGroupVal = 'DN';
	} else if(rightsVal == '점용') {
		selectCodeGroupVal = 'GY';
	} else if(rightsVal == '미점용') {
		selectCodeGroupVal = 'GN';
	} else {
		alert('이슈유형 메뉴 오류가 발생했습니다.');
		return false;
	}
	
	if(rightsVal == '지상권설정' || rightsVal == '지상권미설정') {
		$("#complainContract_jisang").show();
		$("#complainContract_gover").hide();
		
	} else {
		$("#complainContract_jisang").hide();
		$("#complainContract_gover").show();
	}
	
	//계약여부 값 판단에 의한 표출될 이슈유형 메뉴 값 세팅
	selectIssueArr = targetIssueTypeSort(selectCodeGroupVal);
	
	let targetIssue1Depth = filter_Depth(selectIssueArr, 1);
	
	//selectbox 내용 만들어주기
	makeSelectboxContent(targetIssue1Depth , 'complainRespondHiddenSelectBox01', 1); //정리된 배열, 해당 태그의 id값 필수, depth단계값 필수
	
}

//depth 분류
function filter_Depth(data, opt) {
	
	const uniqueDepth1 =[];
	const seenCodes = new Set();
	
	let depthSort;
	
	data.forEach(item => {
		
		if(opt == 1) {
			depthSort = item.depth1_code;
		} else if (opt == 2) {
			depthSort = item.depth2_code;
		} else {
			depthSort = item.depth3_code;
		}
		
		if(!seenCodes.has(depthSort)) {
			uniqueDepth1.push(item);
			seenCodes.add(depthSort);
		}
	});
	
	return uniqueDepth1;
}

//셀렉트박스 만듬 : 현재 퍼블로 인한 조치
// div로 hide한곳에 셀렉트박스를 만들고 그걸 보이는 ul에 뿌려주는 형식이라
// div로 숨긴곳에 셀렉트박스의 내용이 있어야함.
function makeSelectboxContent(targetArr, divId, opt){
	let selectBox = $("#"+divId);
	//기존 내용이 있다면 비워주기.
	selectBox.empty();
	
	if(opt == 1) {
		for(let i = 0 ; i < targetArr.length ; i++) {
			let depthInfo = targetArr[i];
			let option = $('<option></option>').val(depthInfo.depth1_code).text(depthInfo.depth1_name);
			selectBox.append(option);
		}
	} else if (opt == 2) {
		for(let i = 0 ; i < targetArr.length ; i++) {
		let depthInfo = targetArr[i];
			let option = $('<option></option>').val(depthInfo.depth2_code).text(depthInfo.depth2_name);
			selectBox.append(option);
		}
	} else {
		for(let i = 0 ; i < targetArr.length ; i++) {
			let depthInfo = targetArr[i];
			let option = $('<option></option>').val(depthInfo.depth3_code).text(depthInfo.depth3_name);
			selectBox.append(option);
		}
	}
}

//
function issueTypeMenuSetting(contractVal) {
	console.log(contractVal);
}

//값 판단에 의한 표출될 이슈유형 메뉴 값 sort :: 배열값 return
function targetIssueTypeSort(sortGroupVal) {
	let targetResultGroup = [];
	
	for(let i = 0; i < issueTypeList.length ; i++) {
		let codeInfo = issueTypeList[i];
		if(codeInfo.code_group_1 == sortGroupVal) {
			targetResultGroup.push(codeInfo);
		}
	}
	
	return targetResultGroup;
}

//셀렉트 박스와 ul의 아이디 전달
function complainSeletDepth_optionSelect(selectBoxId, ulId, btnId, listDivId) {
	//Step 1.selectbox, ul 요소 가져오기
	const selectBoxElement = $("#"+selectBoxId);
	const ulElement = $("#"+ulId);
	const btnElement = $("#"+btnId);
	const listDivElement = $("#"+listDivId);
	const depthCheck = selectBoxId.charAt(selectBoxId.length - 1);
	
	// Step 2. ul안데 기존 li요소들제거
	ulElement.empty();
	
	if(btnElement.hasClass('active')) {
		btnElement.removeClass('active');
		listDivElement.removeClass('active');
		return false;
	}
	
	// Step 3. option항목들 순회
	selectBoxElement.find('option').each(function(){
		let optionText = $(this).text();
		let optionVal = $(this).val();
		
		// Step 4. 새로운 li요소 생성
		let liElement = $("<li>").text(optionText);
		
		//li에 클릭 이벤트 추가 및 버튼 텍스트 변경
		liElement.on("click", function() {
			btnElement.text(optionText);
			btnElement.attr('data-value', optionVal);
			
			btnElement.removeClass('active');
			ulElement.removeClass('active');
			listDivElement.removeClass('active');
			
			if(depthCheck == 1) {
				console.log('1depth 선택했으니 2depth change :: '+ optionVal);
				//선택값을 비교하여 해당 메뉴만 가져옴.
				let targetIssue2Depth = setingDepth2List(targetIssueTypeSort(selectCodeGroupVal), optionVal);
				//그리고 selectbox 내용 만들어주기
				makeSelectboxContent(targetIssue2Depth , 'complainRespondHiddenSelectBox02', 2);
				//selectedByDepth1(optionVal);
			} else if(depthCheck == 2){
				console.log('2depth 선택했으니 3depth change :: ' + optionVal);
				let targetIssue3Depth = setingDepth3List(targetIssueTypeSort(selectCodeGroupVal), optionVal)
				makeSelectboxContent(targetIssue3Depth , 'complainRespondHiddenSelectBox03', 3);
			}
			
		});
		
		// Step 5. ul에 li요소 추가
		ulElement.append(liElement);
	});
	
	//
	btnElement.addClass('active');
	listDivElement.addClass('active');
}


//depth2 목록 세팅 
function setingDepth2List(depth1List, depth1Val) {
	const depth2ListCheck = depth1List.filter(item => item.depth1_code === depth1Val);
	
	const uniqueItems = Array.from(new Set(depth2ListCheck.map(item => JSON.stringify(item))))
							 .map(item => JSON.parse(item));
	
	return uniqueItems;
}

//depth3 목록 세팅 (로직은 같으나 우선 분리 시켜놓음)
function setingDepth3List(depth2List, depth2Val) {
	
	const depth3ListCheck = depth2List.filter(item => item.depth2_code === depth2Val);
	
	const uniqueItems = Array.from(new Set(depth3ListCheck.map(item => JSON.stringify(item))))
							 .map(item => JSON.parse(item));
	
	return uniqueItems;
}

//민원 대응방안 저장
function minwonComplaintSave() {
	
	let params = minwonComplaintValidation();
	
	if(params.result) {
		console.log('true면 저장 ㄱㄱ');
		console.log(params);
		
		$.ajax({
			url: '/issue/saveMinwonHandling',
			data: JSON.stringify(params),
			async: true, 
			type : 'POST',
			dataType: 'JSON',
			contentType: 'application/json; charset=utf-8',
			success: function(data, jqXHR) {
				 if(data.result) {
					alert('저장이 완료되었습니다.');
				 } else {
					alert('저장이 실패했습니다.');
				 }
			},
			error: function(error) {
				console.log(error);
				alert('저장중 오류가 발생했습니다.');
			}
		});
		
	} else {
		console.log('validation 통과 못함');
		console.log(params);
	}
	
}

//민원 대응방안 상신
function minwonComplaintSangsinGo() {
	let params = minwonComplaintValidation();
	
	param.SANGSIN_FLAG = 'Y';	//상신까지 하도록 FLAG값 전달
	
	if(params.result) {
		console.log('true면 저장 ㄱㄱ');
		console.log(params);
		
		$.ajax({
			url: '/issue/saveMinwonHandling',
			data: JSON.stringify(params),
			async: true, 
			type : 'POST',
			dataType: 'JSON',
			contentType: 'application/json; charset=utf-8',
			success: function(data, jqXHR) {
				if(data.result) {
					alert('상신이 완료 되었습니다.');
				} else {
					alert('상신을 실패 했습니다.');
				}
			},
			error: function(error) {
				console.log(error);
				alert('상신중 오류가 발생했습니다.');
			}
		});
		
	} else {
		console.log('validation 통과 못함');
		console.log(params);
	}
}

//민원 대응방안 삭제
function minComplaintDel() {
	
}

//민원 대응방안 저장전 validation 체크 - return Object
function minwonComplaintValidation() {
	
	let validationObj = {
		"result" : false
	}
	
	//권리확보
	let responsedRightsVal = $("input[name='complainRespondRights']:checked").val();
	
	//계약여부
	let complainRespondContract = $("input[name='complainRespondContract']:checked").val();
	let complainRespondContract2 = $("input[name='complainRespondContract2']:checked").val();
	let complainRespondContractVal = '';
	
	
	
	
	//이슈유형
	let issueMinwonCode_1 = $("#complainSeletDepth1_Btn").attr('data-value');
	let issueMinwonCode_2 = $("#complainSeletDepth2_Btn").attr('data-value');
	let issueMinwonCode_3 = $("#complainSeletDepth3_Btn").attr('data-value');
	
	
	//계약여부 최종값 (권리 여부에 따라 다르게)
	complainRespondContractVal = complainRespondContract;
	if(complainRespondContractVal == '' || complainRespondContractVal == null) {
		complainRespondContractVal == complainRespondContract2;
	}
	
	//저장전 validation 체크
	//각 항목 선택여부
	if( commonNvl(responsedRightsVal, -1) == -1) {
		alert('권리 확보는 필수 선택 항목입니다.');
		return false;
	}
	
	//
	if(commonNvl(complainRespondContractVal, -1) == -1) {
		alert('계약 여부는 필수 선택 항목입니다.');
		return false;
	}
	validationObj.COMPLETE_YN = complainRespondContractVal;
	
	if(commonNvl(issueMinwonCode_1, -1) == -1){
		alert('이슈유형 대분류를 선택하지 않았습니다.');
		return false;
	}
	validationObj.MW_CODE1 = issueMinwonCode_1;
	validationObj.MW_CODE1_NAME = $("#complainSeletDepth1_Btn").text();	
	
	if(commonNvl(issueMinwonCode_2, -1) == -1){
		alert('이슈유형 중분류를 선택하지 않았습니다.');
		return false;
	}
	validationObj.MW_CODE2 = issueMinwonCode_2;
	validationObj.MW_CODE2_NAME = $("#complainSeletDepth2_Btn").text();
	
	if(commonNvl(issueMinwonCode_3, -1) == -1){
		alert('이슈유형 소분류를 선택하지 않았습니다.');
		return false;
	}
	validationObj.MW_CODE3 = issueMinwonCode_3;
	validationObj.MW_CODE3_NAME = $("#complainSeletDepth3_Btn").text();
	
	validationObj.MW_SEQ = $("#minwonSeq").val();
	
	validationObj.result = true;
	
	return validationObj;
}


//========================민원 대응방안 수립 팝업 [E]========================
//==============================================================================================================
//========================민원협의 내용 등록/수정 [S]========================
//민원협의 내용 등록/수정 팝업 열기(협의 추가 버튼)
function minwonConsultPopupOpen() {
	console.log('팝업오픈');
	$("#complaint_register_Popup").addClass('active');
	showDim();
	
	// 기존 입력값 초기화 (날짜 제외)
	$("input[name='TITLE']").val(''); // 제목 초기화
	$("textarea[name='CONTENTS']").val(''); // 협의 내용 초기화
	$("select[name='STATUS']").val(''); // 진행 상태 초기화
	$(".Popup_Custom_SelectView").text('선택'); // 커스텀 UI 초기화
	$("#fileListDiv").empty(); // 첨부파일 목록 초기화
	
	//팝업오픈하고 날짜 오늘날짜로 기본세팅
	$("#consult_date_field").val(today_yyyymmdd());

}

//민원협의 내용 등록/수정 팝업 닫기
function minwonConsultPopupClose() {
	$("#complaint_register_Popup").removeClass('active');
	hideDim();
}

//민원협의 첨부파일 관련 코드
var uploadFiles = new Array();

$(document).ready(function () {
	// 드래그 앤 드롭 영역 파일 첨부 관련 코드 시작
	var objDragAndDrop = $(".fileUploadBox");
	
	// 드래그 앤 드롭 영역에 파일이 들어왔을 때
	$(".fileUploadBox").on("dragenter", function(e) {
	    e.stopPropagation();
	    e.preventDefault();
	    $(this).css('border', '2px solid #0B85A1');
	});

	// 드래그 앤 드롭 영역에서 파일을 드래그할 때
	$(".fileUploadBox").on("dragover", function(e) {
	    e.stopPropagation();
	    e.preventDefault();
	});

	// 파일을 드롭할 때
	$(".fileUploadBox").on("drop", function(e) {
	    e.preventDefault();
	    $(this).css('border', '2px dotted #0B85A1');
	    var files = e.originalEvent.dataTransfer.files; // 드래그한 파일 객체를 가져옴
	    handleFileUpload(files, $(this));  // 파일 처리 함수 호출
	});

	// 드래그 앤 드롭 영역을 클릭하면 파일 선택창을 띄움
	/*
	objDragAndDrop.on('click', function(e) {
		console.log("---------------- 파일 클릭 트리거 ---------------");
    $('input[type=file]').trigger('click'); // 파일 선택 창을 띄우는 트리거
	});
	*/
	 
	// 첨부파일 리스트에 파일이 추가될 때 스크롤 이동
	function scrollToBottomOfFileList() {
	    // 스크롤이 있는 complaints_contents_minHeight2 요소의 스크롤을 맨 아래로 이동시킴
	    var complaintsContentsDiv = document.querySelector(".complaints_contents_fileBox");
	    complaintsContentsDiv.scrollTop = complaintsContentsDiv.scrollHeight;
	}
	
	$('input[type=file]').on('change', function(e) {
		console.log("-------------change 이벤트 트리거");
	    var files = e.originalEvent.target.files; // 파일 선택창에서 선택된 파일들
	    handleFileUpload(files, objDragAndDrop);  // 선택된 파일들을 처리하는 함수 호출
			
		scrollToBottomOfFileList(); // 파일 업로드 후 리스트로 스크롤 이동
	});
    
	var rowCount = document.querySelectorAll("#fileListDiv > ul").length + 1;  // 현재 렌더된 파일 개수 계산
	
	function handleFileUpload(files, obj) {
		console.log("-------------handleFileUpload---------------");
		console.log(files);
		for (var i = 0; i < files.length; i++) { // 선택된 파일들을 하나씩 처리
			var fd = new FormData(); // FormData 객체 생성 (파일 업로드를 위한 객체)
			fd.append('file', files[i]); // 파일 객체를 FormData에 추가

			// var status = new createStatusbar($("#fileTitleUl"),files[i].name,files[i].size,rowCount); // 파일 업로드 상태바 생성
			var status = new createStatusbar($("#fileListDiv"), files[i].name, files[i].size, files[i].nfname); // 파일 업로드 상태바 생성
			sendFileToServer(fd, status); // 서버로 파일 전송 함수 호출

			rowCount++; // 파일이 추가될 때마다 rowCount를 증가시켜 고유한 id를 유지
			
			scrollToBottomOfFileList(); // 파일이 추가될 때 스크롤 이동
		}
	}

	// Status bar 생성 함수
	function createStatusbar(obj, name, size, no) {
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

		var row = '<ul class="contents" id="fileListUl">';
/*		row += '<li class="selectWidth content checkboxWrap">';
		row += '<input type="checkbox" id="masterEdit_attachFile' + no + '" name="masterEdit_attachFile" >';
		row += '<label for="masterEdit_attachFile' + no + '"></label>';
		row += '</li>';*/
		row += '<li class="content registDateWidth">';
		row += '<input type="text" value="" readonly class="notWriteInput" name="registDateWidth"/>';
		row += '</li>';
		row += '<li class="content fileNameWidth">';
		//row += '<input type="text" value="" id="filepath" readonly class="notWriteInput" hidden />';
		row += '<input type="text" value="' + name + '" id="filename" readonly class="notWriteInput" />';
		row += '<input type="hidden" name="newFileCheckYn" value="Y">';	//새로운 첨부파일 파악 여부
		row += '</li>';
		row += '<li class="content viewBtnBox">';
		//row += '<button class="viewDetailButton lightBlueBtn">보기</button>'; // 새로 추가한 파일은 보기 버튼 제거?
		row += '</li>';
		row += '<li>';
		row += '<button class="attachFileBtn grayBtn" id="deleteFileBtn">삭제</button>';
		row += '</li>';
		row += '</ul>';

		obj.prepend(row); // 파일 목록이 있는 DOM 요소 뒤에 파일 정보를 추가

		var radio = $(row).find('input'); // row에서 input 요소를 찾음
		console.log("---------------radio checkbox----------");
		$(radio).find('input').attr("disabled", false); // 체크박스가 비활성화되지 않도록 설정
		console.log($(radio).parent().html());
		
		scrollToBottomOfFileList(); // 파일이 추가될 때 스크롤 이동
	}
	                
	function sendFileToServer(formData, status) {
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
});


// 협의내용 - 행 클릭 시 팝업 열기
$(document).on('click', '#minwonAgreeUl', function() {
    var mwSeq = $('#minwonSeq').val();  // mw_seq는 따로 저장해둔 hidden 값에서 가져옴
    var agreeSeq = $(this).find('.agree-seq').val();  // 해당 행의 agree_seq 값 추출

		console.log("mw_seq: " + mw_seq + ", agreeSeq: " + agreeSeq);
    openExistingAgreePopup(mwSeq, agreeSeq);  // mw_seq와 agree_seq를 넘겨 팝업 열기
});

// 협의 내용 수정 팝업 열기 함수(기존 데이터 있을 때 행 클릭 시)
function openExistingAgreePopup(mwSeq, agreeSeq) {
    $.ajax({
        url: "/issue/getMinwonAgreeDetail",
        type: "GET",
        data: { mwSeq: mwSeq, agreeSeq: agreeSeq },
        success: function(data) {
            console.log("Received data:", data); // 전체 데이터를 출력
            
						if (data.length > 0) {
                // 팝업을 활성화
                $("#complaint_register_Popup").addClass('active');
                showDim();

                // 협의 내용을 받아와서 필드에 입력
                $("input[name='TITLE']").val(data[0].agree_title);
                $("textarea[name='CONTENTS']").html(data[0].agree_contents);  // HTML 태그가 포함된 데이터를 처리
                $("select[name='STATUS']").val(data[0].status_str).trigger('change');  // select value 설정 후 change 이벤트 발생
                $(".Popup_Custom_SelectView").text(data[0].status_str);  // 커스텀 UI의 텍스트 변경
                $("#consult_date_field").val(data[0].agree_date);

                // hidden 필드에 mw_seq와 agree_seq 값 채우기
                $("input[name='mw_seq']").val(mwSeq);
                $("input[name='agree_seq']").val(agreeSeq);
								
								// 파일 목록 추가 (AJAX)
	               $.ajax({
	                   url: "/issue/getMinwonAgreeAtcFileData",
	                   type: "POST",
	                   data: { mwSeq: mwSeq, agreeSeq: agreeSeq },
	                   success: function(fragment) {
	                       $('#fileListDiv').html(fragment); // 파일 리스트를 파일 영역에 추가
	                   },
	                   error: function(jqXHR, textStatus, errorThrown) {
	                       console.error("Error loading file list:", textStatus, errorThrown);
	                   }
	               });
            } else {
                console.error("No data found.");
            }
        },
        error: function(jqXHR, textStatus, errorThrown) {
            console.error("Error loading agree details:", textStatus, errorThrown);
        }
    });
}


// 민원협의 내용 등록/수정 팝업 -> 저장 버튼
$(document).on("click", ".document_add_btnWrap .saveBtn", function() {
	// 필수 입력값 체크
	if (!validateRequiredFields()) {
	    return; // 필수값이 없으면 함수 종료
	}
	
	if (dataInfo == null || dataInfo == undefined) {
		console.log("dataInfo is null");
		return
	}
	
	let consultInfo = getPopupJsonData();
	let minwonSeq = $("#minwonSeq").val();  // minwonSeq 값을 가져옴
	let agreeSeq = $("input[name='agree_seq']").val(); // name 속성을 사용하여 agree_seq 값을 가져옴
	console.log("consoleInfo: " + consultInfo);
	console.log(uploadFiles);
	
	// JSON 형태로 consultInfo를 전송하기 위해 문자열로 변환
	var params = {
	    "MW_SEQ": minwonSeq,
	    "AGREE_SEQ": agreeSeq, // 수정일 경우 있음, 신규일 경우 없음.
	    "files": uploadFiles,  // 파일 경로와 이름이 포함된 배열
	    "consultInfo": consultInfo,  // consultInfo도 포함해서 전송
	};

	console.log(params);
	
		$.ajax({
			url: "/issue/saveMinwonAgreeData",
			data: JSON.stringify(params),
			async: true,
			type: "POST",
			dataType: "json",
			contentType: 'application/json; charset=utf-8',
			success: function(data, jqXHR) {
				console.log(data);
				if (data.message != null && data.message != undefined && data.message == "success") {
					let agreeSeq = data.agreeSeq;  // 서버에서 전달된 agreeSeq 사용
					let mwSeq = minwonSeq;
					
					// 팝업 닫기
					closeComplaintregisterPopup();

					// "저장되었습니다." alert 띄우기
					alert('저장되었습니다.');
					
					// 페이지 새로고침 - 맨 위에 행 추가 방식 하려다가 시간 상 새로고침으로 임시 적용
					location.reload();
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
				hideDim();
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


//민원협의 내용 등록/수정 팝업 -> 상신 버튼
$(document).on("click", ".document_add_btnWrap .sangsinBtn", function() {
	
	// 필수 입력값 체크
	if (!validateRequiredFields()) {
	    return; // 필수값이 없으면 함수 종료
	}
	
	if (dataInfo == null || dataInfo == undefined) {
		console.log("dataInfo is null");
		return
	}

	let consultInfo = getPopupJsonData();
	let minwonSeq = $("#minwonSeq").val();  // minwonSeq 값을 가져옴
	let agreeSeq = $("#agreeSeq").val();  // minwonSeq 값을 가져옴
	console.log("consoleInfo: " + consultInfo);
	console.log(uploadFiles);

	// JSON 형태로 consultInfo를 전송하기 위해 문자열로 변환
	var params = {
	    "MW_SEQ": minwonSeq,
	    "AGREE_SEQ": agreeSeq, // 수정일 경우 있음, 신규일 경우 없음.
	    "files": uploadFiles,  // 파일 경로와 이름이 포함된 배열
	    "consultInfo": consultInfo,  // consultInfo도 포함해서 전송
			"SANGSIN_FLAG":"Y"
	};

	console.log(params);

		$.ajax({
			url: "/issue/saveMinwonAgreeData",
			data: JSON.stringify(params),
			async: true,
			type: "POST",
			dataType: "json",
			contentType: 'application/json; charset=utf-8',
			success: function(data, jqXHR) {
				console.log(data);
				if (data.message != null && data.message != undefined && data.message == "success") {
					/*let agreeSeq = data.agreeSeq;  // 서버에서 전달된 agreeSeq 사용
					let mwSeq = minwonSeq;*/
					//alert('상신되었습니다.');
					if (data.html.length>0){
						var urls = data.html;
						var newWindow=window.open("", "상신", "width=1200, height=700, toolbar=no, menubar=no, scrollbars=yes, resizable=yes");
						newWindow.document.open();
						newWindow.document.write(data.html);
						newWindow.document.close();
					}
					
					// 팝업 닫기
					//closeComplaintregisterPopup();

					// "저장되었습니다." alert 띄우기
				
					
					// 페이지 새로고침 - 맨 위에 행 추가 방식 하려다가 시간 상 새로고침으로 임시 적용
					//location.reload();
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
				hideDim();
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

// 민원 협의 내용 등록/수정 팝업 - 파일 다운로드 버튼
function minwonAgreefileDownload(filePath, fileName) {
    commonFileDownload(filePath, fileName, '', '', '');
}

// 민원 협의 팝업 - 파일 삭제 버튼
$(document).on("click", "#deleteFileBtn", function() {
    const parentLi = $(this).closest('ul.contents'); // 버튼이 포함된 ul 요소 찾기
    const fileName = $(parentLi).find("#filename").val();
    const idx = $(parentLi).find("#fileIdx").val();
    
    const selectedFile = {
        fileName: fileName,
        idx: idx
    };

    console.log("Deleting file:", selectedFile);

    fetch('/land/api/minwonAgreeAtcFileDelete', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ fileIds: [selectedFile] }),
    })
    .then(response => response.json())
    .then(data => {
        if (data.resultMessage == "success") {
            alert('파일이 삭제되었습니다.');
            // 성공적으로 삭제되었을 때 UI 갱신
            $(parentLi).remove();
        } else {
            alert('파일 삭제에 실패하였습니다.');
        }
    })
    .catch(error => {
        console.error('Error:', error);
        alert('파일 삭제 중 오류가 발생하였습니다.');
    });
});


// 셀렉트 박스
function complainSelectBoxOpen() {
	// Step 1. selectbox , ul요소 가져오기
	let selectBoxElement = $("#complaint_register_Selectbox01");
	let ulElement = $("#view_complaint_box");
	
	if(ulElement.hasClass('active')) {
		ulElement.removeClass('active');
		return false;
	}
	
	// Step 2. ul안데 기존 li요소들제거
	ulElement.empty();
	
	// Step 3. option항목들 순회
	selectBoxElement.find('option').each(function(){
		let optionText = $(this).text();
		
		// Step 4. 새로운 li요소 생성
		let liElement = $("<li>").text(optionText);
		
		//li에 클릭 이벤트 추가 및 버튼 텍스트 변경
		liElement.on("click", function() {
			$(".Popup_Custom_SelectView").text(optionText);
			ulElement.removeClass('active');
		})
		
		// Step 5. ul에 li요소 추가
		
		ulElement.append(liElement);
	});
	
	//
	ulElement.addClass('active');
}

// 필수 입력값 체크 함수
function validateRequiredFields() {
	// 진행상태 체크
	const selectedStatus = $('#statusBtn').text();
	if (selectedStatus === '선택') {
		alert('진행상태를 선택해주세요.');
		return false;
	}

	// 협의 날짜 체크
	const date = $("#consult_date_field").val();
	if (!date) {
		alert('협의 날짜를 입력해주세요.');
		return false;
	}

	// 협의 제목 체크
	const title = $("input[name='TITLE']").val();
	if (!title) {
		alert('협의 제목을 입력해주세요.');
		return false;
	}

	// 협의 내용 체크
	const contents = $("textarea[name='CONTENTS']").val();
	if (!contents) {
		alert('협의 내용을 입력해주세요.');
		return false;
	}

	// 모든 필드가 유효하면 true 반환
	return true;
}



//========================민원협의 내용 등록/수정 [E]========================
//==============================================================================================================
//========================민원 완료 [S]========================
//민원 완료 보고 팝업
function minwon_completeReportPop() {
	
}

$('.closeBtn, .topCloseBtn').on('click', function(){
	$('#complaint_completed').removeClass('active');
});

function complaintPopupOpen() {
	$('#complaint_completed').addClass('active');
}

function attachFileDownload(filePath, fileName, fileJisangNo, fileSeq, fileGubun) {
	commonFileDownload(filePath, fileName, fileJisangNo, fileSeq, fileGubun);
}

// 민원완료 > 상세보기 버튼 > 팝업 오픈 이벤트
function openPopup(no, status, mp_idx) {
	$('#mp_idx').val(mp_idx);
	status = status.toLowerCase();
	let url = '';
	if (status == 'jisang') {
		//지상권
		url = `/land/${status}/easementModification?idx=${no}&open=pop`;
	} else if (status == 'notset') {
		// 미설정 
		url = `/land/${status}/notsetaddRevise?idx=${no}&open=pop`;
	} else {
		// 그 외
		alert('지상권/미설정 관련 내용 호출예정');
		return;
	}
	console.log(no.toLowerCase());
	// 팝업이 열려있는지
	if (popupWindow && !popupWindow.closed) {
		// 열려있다면 열려있는 팝업에 포커싱
		popupWindow.focus();
	} else {
		// 열러있지않다면 열기
		popupWindow = window.open(url, '_blank', 'resizable');
		// 화면 크기를 기준으로 80%로 팝업 크기 조정
		const widthPercent = 0.95; // 80% 너비
		const heightPercent = 0.95; // 80% 높이
		
		const screenWidth = window.screen.width;  // 전체 화면 너비
		const screenHeight = window.screen.height; // 전체 화면 높이
		
		const newWidth = screenWidth * widthPercent;
		const newHeight = screenHeight * heightPercent;
		
		popupWindow.resizeTo(newWidth, newHeight);
		popupWindow.resizeBy(-100, -100);
		popupWindow.onload = function() {
			let doc = popupWindow.document.querySelector('#finalBtn');
		}	
	}
	
}

// 팝업이 닫히면 실행되는 함수
function popupComplete () {
	let dataObj = {'mw_seq' : $('#minwonSeq').val(), 'mp_idx' : $('#mp_idx').val()};
	$.ajax({
		url: "/issue/minwonCompleteAfter",
		data: JSON.stringify(dataObj),
		async: true,
		type: "POST",
		dataType: "json",
		contentType: 'application/json; charset=utf-8',
		success: function(res) {
			if (res.result) {
				// 민원 완료 > 민원 토지 ul 추가
				if (res.tojiList != null && res.tojiList != undefined && res.tojiList.length > 0) {
					$('#pop_complaintInfo_togi ul').not(function () {
						return $(this).hasClass('complaintinfo_update_th');
					}).remove();
					
					$.each(res.tojiList, function(index, item) {
						let jisangNo = res.tojiList[index].jisang_no;
						let status = res.tojiList[index].jisang_status;
						let updateYn = res.tojiList[index].update_yn || 'N';
						let mp_idx = res.tojiList[index].mp_idx;
						var newItem = `<ul class="complainant_info">
								<li>${res.tojiList[index].addr || '-'}</li>
								<li>${updateYn}</li>
								<li class="complaintinfo_update_btn">
									<button onclick="openPopup('${jisangNo}', '${status}', '${mp_idx}')">상세보기</button>
								</li>
							</ul>`;
						$('#pop_complaintInfo_togi').append(newItem);
					});
				} else {
					$('#dopcoAllWrappers .complaintLand .depth1').append(noDataUl);
				}
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
}

$(document).on('click', '#sangsinBtn', function() {
	console.log(dataInfo);
});

//========================민원 완료 [E]========================