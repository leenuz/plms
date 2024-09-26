var uploadFiles = new Array();

$(document).ready(function() {
	console.log("----지상권 내역 수정 js 동작 --- ");
	// 페이지 로드 시 초기 관로명 목록 업데이트
	const initialJisa = $("#easementModifySelectBox01").val(); // 선택된 지사 값
	if (initialJisa) {
		console.log("initialJisa: " + initialJisa);
		updatePipeNameList(initialJisa); // 초기 관로명 목록 업데이트
	}

	// 커스텀 지사 선택 UI에서 선택했을 때
	$(".content01 .customSelectItem").on("click", function() {
		const selectedJisa = $(this).data("value");
		console.log("지사 선택됨: " + selectedJisa);

		// 선택한 지사를 select box에 반영하고, change 이벤트 트리거
		$("#easementModifySelectBox01").val(selectedJisa).change();

		// 버튼 텍스트를 변경
		$(".content01 .customSelectView").text(selectedJisa);
	});

	// 담당지사 변경 시 이벤트 리스너 추가
	$("#easementModifySelectBox01").change(function() {
		const selectedJisa = $(this).val();  // 변경된 지사 값
		updatePipeNameList(selectedJisa);    // 관로명 목록 업데이트 함수 호출
	});

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
	objDragAndDrop.on('click', function(e) {
		console.log("---------------- 파일 클릭 트리거 ---------------");
		if (!e.isTrigger) {  // 이 조건문은 이 이벤트가 수동 트리거된 경우를 방지합니다.
			$('input[type=file]').trigger('click'); // 파일 선택 창을 띄우는 트리거
		}
	});

	$('input[type=file]').on('change', function(e) {
		var files = e.originalEvent.target.files; // 파일 선택창에서 선택된 파일들
		handleFileUpload(files, objDragAndDrop);  // 선택된 파일들을 처리하는 함수 호출
	});

	var rowCount = 0;
	function handleFileUpload(files, obj) {
		console.log("-------------handleFileUpload---------------");
		console.log(files);
		for (var i = 0; i < files.length; i++) { // 선택된 파일들을 하나씩 처리
			var fd = new FormData(); // FormData 객체 생성 (파일 업로드를 위한 객체)
			fd.append('file', files[i]); // 파일 객체를 FormData에 추가

			var status = new createStatusbar($("#fileTitleUl"), files[i].name, files[i].size, rowCount); // 파일 업로드 상태바 생성
			sendFileToServer(fd, status); // 서버로 파일 전송 함수 호출

			rowCount++; // 파일이 추가될 때마다 rowCount를 증가시켜 고유한 id를 유지
		}
	}

	// Status bar 생성 함수
	function createStatusbar(obj, name, size, no) {
		console.log("----------start createStatusBar------------");
		console.log(obj.html());

		var sizeStr = "";
		var sizeKB = size / 1024; // 파일 크기를 문자열로 표시하기 위한 변수
		if (parseInt(sizeKB) > 1024) {
			var sizeMB = sizeKB / 1024;
			sizeStr = sizeMB.toFixed(2) + " MB"; // MB로 변환
		} else {
			sizeStr = sizeKB.toFixed(2) + " KB"; // KB로 표시
		}

		var row = '<ul class="contents" id="fileListUl">';
		row += '<li class="content01 content checkboxWrap">';
		row += '<input type="checkbox" id="landRightsRegistration_attachFile' + no + '" name="landRightsRegistration_attachFile" >';
		row += '<label for="landRightsRegistration_attachFile' + no + '"></label>';
		row += '</li>';
		row += '<li class="content02 content"><input type="text" id="filename" placeholder="' + name + '" class="notWriteInput" readonly></li></ul>';
		obj.after(row); // 파일 목록이 있는 DOM 요소 뒤에 파일 정보를 추가

		var radio = $(row).find('input'); // row에서 input 요소를 찾음
		console.log("---------------radio checkbox----------");
		$(radio).find('input').attr("disabled", false); // 체크박스가 비활성화되지 않도록 설정
		console.log($(radio).parent().html());
	}

	function sendFileToServer(formData, status) {
		var uploadURL = "/jisang/fileUpload/post"; //Upload URL
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
				//uploadFiles.push(data.resultData.fpath);    
				//allCheckEventLandRightsRegist();   
			}
		});

		//status.setAbort(jqXHR);
	}
});


// 첨부파일 전체 선택 체크박스
const allCheckEventLandRightsRegist = () => {

	// 첨부파일 리스트들
	const attachFiles = document.querySelectorAll('input[name="landRightsRegistration_attachFile"]');
	// checked가 된 첨부파일 리스트
	const clickedAttachFiles = document.querySelectorAll('input[name="landRightsRegistration_attachFile"]:checked');
	// 전체선택 input
	const clickedAllinput = document.querySelector('input[name="landRightsRegistration_file_select_all"]');

	// 전체선택되게 하기
	clickedAllinput.addEventListener('click', function() {
		clickedSelectAllLandRightsRegist(clickedAllinput);
	})
	// 개당 선택시 전체 선택되게하기
	attachFiles.forEach((checkList) => {
		checkList.addEventListener('click', function() {

			clickCheckBoxEventLandRightsRegist(checkList);
		})
	})

	// 개별 리스트 클릭시 전체로 변하기
	function clickCheckBoxEventLandRightsRegist() {
		// 최신으로 업데이트 해주기
		const clickedAttachFiles = document.querySelectorAll('input[name="landRightsRegistration_attachFile"]:checked');

		if (attachFiles.length === clickedAttachFiles.length) {
			clickedAllinput.checked = true;
		} else {
			clickedAllinput.checked = false;
		}
	}

	// 전체선택 클릭시
	function clickedSelectAllLandRightsRegist(clickedAllinput) {
		const attachFiles = document.querySelectorAll('input[name="landRightsRegistration_attachFile"]');

		attachFiles.forEach((checkbox) => {
			checkbox.checked = clickedAllinput.checked;
		})
	}
}
allCheckEventLandRightsRegist();

// 첨부파일 선택파일 삭제 기능
$(document).on("click", "#deleteFileBtn", function() {
	//const attachFiles = document.querySelectorAll('input:checkbox[name="landRightsRegistration_attachFile"]:checked');
	/*$('input:checkbox[name=landRightsRegistration_attachFile]').each(function (index) {
		if($(this).is(":checked")==true){
				console.log($(this).val());
			}
	})*/
	const clickedAttachFiles = document.querySelectorAll('input[name="landRightsRegistration_attachFile"]:checked');
	console.log(clickedAttachFiles);
	console.log(uploadFiles);
	for (var i = 0; i < clickedAttachFiles.length; i++) {
		var delEle = $(clickedAttachFiles[i]).closest("#fileListUl");
		console.log($(clickedAttachFiles[i]).closest("#fileListUl").html());
		$(delEle).remove();

	}
})

// 관로명 목록 업데이트 함수
function updatePipeNameList(jisaValue) {
	const allData = { jisa: jisaValue };

	// 숨겨진 필드에서 resultData.jm_pipe_name 값을 가져옴
	const jmPipeName = $("#jm_pipe_name_hidden").val();  // hidden input의 값 읽기
	console.log("jmPipeName: " + jmPipeName);

	$.ajax({
		url: "/gover/getPipeName",  // 관로명 목록을 가져오는 API
		data: JSON.stringify(allData),
		type: "POST",
		dataType: "json",
		contentType: "application/json; charset=utf-8",
		success: function(rt) {
			const data = rt.resultData;
			console.log("관로명 목록 데이터:", data);

			// 기존 셀렉트 박스와 커스텀 UI 초기화
			$("#easementModifySelectBox04 option").remove();  // <select> 내부 옵션 제거
			$(".defaultInfo .depth1 .content04 .customSelectBtns").empty();  // 커스텀 <ul> 리스트 초기화

			// 받은 데이터로 관로명 목록 업데이트
			for (let i = 0; i < data.length; i++) {
				const pipeName = data[i].jzn_zone_name;
				const isSelected = pipeName === jmPipeName ? "selected" : "";  // 숨겨진 필드의 값과 비교

				// 실제 <select> 태그에 옵션 추가
				$("#easementModifySelectBox04").append("<option value='" + pipeName + "' " + isSelected + ">" + pipeName + "</option>");

				// 커스텀 드롭다운 UI에 <li> 항목 추가
				$(".defaultInfo .depth1 .content04 .customSelectBtns").append("<li class='customSelectItem' data-value='" + pipeName + "'>" + pipeName + "</li>");
			}

			// 관로명 선택값을 커스텀 버튼에 반영
			$(".defaultInfo .depth1 .content04 .customSelectView").text(jmPipeName || "선택");

			// <li> 항목 클릭 시 <select> 업데이트 및 커스텀 UI 반영
			$(".customSelectItem").on("click", function() {
				const selectedPipeName = $(this).data("value");
				$("#easementModifySelectBox04").val(selectedPipeName).change();  // <select> 값 설정
				$(".defaultInfo .depth1 .content04 .customSelectView").text(selectedPipeName);  // 버튼 텍스트 업데이트
			});

		},
		error: function(jqXHR, textStatus, errorThrown) {
			console.error("관로명 목록 업데이트 실패:", textStatus, errorThrown);
		}
	});
}



//커스텀 selectbox

createCustomLiEasementModify();

function createCustomLiEasementModify() {
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


const customSelectView = document.querySelectorAll('.customSelectView')

customSelectView.forEach((btn) => {
	btn.addEventListener('click', function() {

		btn.classList.toggle('active')
		if (btn.nextElementSibling) {
			btn.nextElementSibling.classList.toggle('active')


		}
	})
})


$(document).on("click", ".moreSelectBtn", function() {
	console.log("---------------moreselectBtn--click----");
	var moreSelectBtnText = this.innerText;
	console.log("moreSelectBtnText:" + this.innerText);
	const parentMoreSelectBtn = this.closest('.customSelectBtns')
	const EditCustomViewBtn = parentMoreSelectBtn.previousElementSibling;

	while (EditCustomViewBtn.firstChild) {
		EditCustomViewBtn.removeChild(EditCustomViewBtn.firstChild);
	}

	// 새로운 텍스트 노드를 추가합니다.
	const textNode = document.createTextNode(moreSelectBtnText);
	EditCustomViewBtn.appendChild(textNode);

	EditCustomViewBtn.classList.remove('active')
	parentMoreSelectBtn.classList.remove('active')

	// 선택한 걸 select의 value값으로 변경하기

	const nearByContent = this.closest('.selectContentArea');
	const nearBySelectBox = nearByContent.querySelector('select');
	console.log(nearBySelectBox);
	$(nearBySelectBox).val(this.textContent);
	$(nearBySelectBox).trigger("change");
	nearBySelectBox.value = this.textContent;
	console.log(`Selected value: ${nearBySelectBox.value}`);

});

// customSelectBtns 리스트 click 했을 때 해당 내용으로 바뀌게하기
/*
const MoreSelectBtn = document.querySelectorAll('.moreSelectBtn')

MoreSelectBtn.forEach((moreBtn) => {
		moreBtn.addEventListener('click', function () {
				var moreSelectBtnText = moreBtn.innerText;
				console.log(moreSelectBtnText);
				const parentMoreSelectBtn = moreBtn.closest('.customSelectBtns')
				const EditCustomViewBtn = parentMoreSelectBtn.previousElementSibling;

				while (EditCustomViewBtn.firstChild) {
						EditCustomViewBtn.removeChild(EditCustomViewBtn.firstChild);
				}

				// 새로운 텍스트 노드를 추가합니다.
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
*/

// 소유자 정보 추가 click시 이벤트

const ownerInfoAddBtn = document.querySelectorAll('#easementModification .ownerInfo .addBtn')
const editBefore = document.querySelectorAll('#easementModification .ownerInfo .contents .content.btnBox .editBefore');
const editAfter = document.querySelectorAll('#easementModification .ownerInfo .contents .content.btnBox .editAfter');
const editContent = document.querySelectorAll('#easementModification .editSpace');
const registBtn = document.querySelectorAll('#easementModification .registBtn');

ownerInfoAddBtn.forEach((btn) => {
	btn.addEventListener('click', function() {
		var thisEditContent = btn.closest('.contents');
		console.log(thisEditContent);

		thisEditContent.classList.add('editing');

		const inputs = thisEditContent.querySelectorAll('input');

		if (thisEditContent.classList.contains('editing')) {
			inputs.forEach(input => {
				input.removeAttribute('readonly');
			});
		} else {
			inputs.forEach(input => {
				input.setAttribute('readonly', 'readonly');
			});
		}



	});
});

// 추가 버튼 click 이벤트

if (registBtn) {
	registBtn.forEach((regiBtn) => {
		regiBtn.addEventListener('click', function() {

			var thisEditContent01 = regiBtn.closest('.contents');
			thisEditContent01.classList.remove('editing')

			const inputs = thisEditContent01.querySelectorAll('input');
			inputs.forEach(input => {
				input.setAttribute('readonly', 'readonly');
			});
		})
	})
}

// 기본 정보 -> 주소 검색

const radioButtons = document.querySelectorAll('#easementModification .defaultInfo .contWrap .depth2 .contents .content02 .radioBox .inputArea .inputWrap input[name="easementModification_addressInput"]');
const inputAreas = document.querySelectorAll('#easementModification .defaultInfo .contWrap .depth2 .contents .content02 .radioBox .inputArea');

radioButtons.forEach((radio) => {
	radio.addEventListener('click', () => {
		inputAreas.forEach((area) => {
			if (area.contains(radio)) {
				area.querySelectorAll(':scope > *:not(.inputWrap)').forEach((child) => {
					child.classList.remove('disabled');
				});
			} else {
				area.querySelectorAll(':scope > *:not(.inputWrap)').forEach((child) => {
					child.classList.add('disabled');
				});
			}
		});

	});
});

const checkedRadio = document.querySelector('#easementModification .defaultInfo .contWrap .depth2 .contents .content02 .radioBox .inputArea .inputWrap input[name="easementModification_addressInput"]:checked');
if (checkedRadio) {
	checkedRadio.dispatchEvent(new Event('click'));
}


// 첨부파일 전체 선택 체크박스
const AllCheckEventEasementModification = () => {

	// 첨부파일 리스트들
	const attachFiles = document.querySelectorAll('input[name="easementModification_attachFile"]');
	// checked가 된 첨부파일 리스트
	const clickedAttachFiles = document.querySelectorAll('input[name="easementModification_attachFile"]:checked');
	// 전체선택 input
	const clickedAllinput = document.querySelector('input[name="easementModification_file_select_all"]');

	// 전체선택되게 하기
	clickedAllinput.addEventListener('click', function() {
		clickedSelectAllEasementModification(clickedAllinput);
	})
	// 개당 선택시 전체 선택되게하기
	attachFiles.forEach((checkList) => {
		checkList.addEventListener('click', function() {

			clickCheckBoxEventEasementModification(checkList);
		})
	})

	// 개별 리스트 클릭시 전체로 변하기
	function clickCheckBoxEventEasementModification() {
		// 최신으로 업데이트 해주기
		const clickedAttachFiles = document.querySelectorAll('input[name="easementModification_attachFile"]:checked');

		if (attachFiles.length === clickedAttachFiles.length) {
			clickedAllinput.checked = true;
		} else {
			clickedAllinput.checked = false;
		}
	}

	// 전체선택 클릭시 
	function clickedSelectAllEasementModification(clickedAllinput) {
		const attachFiles = document.querySelectorAll('input[name="easementModification_attachFile"]');

		attachFiles.forEach((checkbox) => {
			checkbox.checked = clickedAllinput.checked;
		})
	}
}

AllCheckEventEasementModification();


/* js추가 검색팝업오픈 */

const easeModificationOpenPopUp = () => {

	const easeModificationBtn = document.querySelector(".easeModificationBtn");
	const easeModificationResultPop = document.querySelector(".easeModificationResultPopWrapper");
	let htmlFilePath = '/components/popuphtml/searchResultsPopup.html'; // 삽입할 html 파일 경로

	if (easeModificationBtn) {

		let xhr = new XMLHttpRequest();
		xhr.open('GET', htmlFilePath, true);
		xhr.onreadystatechange = function() {
			if (xhr.readyState == 4 && xhr.status == 200) {
				easeModificationResultPop.innerHTML = xhr.responseText;
				runScriptsInElement(easeModificationResultPop); // 삽입된 html내 스크립트 실행 함수 호출
			}
		};
		xhr.send();
		console.log('easeModificationResultPop 작동');
		easeModificationBtn.addEventListener("click", () => {

			const popupOpen = document.querySelector("#searchResultsPopup .popupWrap");
			easeModificationBtn.classList.add("open");
			popupOpen.classList.add("active");

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

easeModificationOpenPopUp();
