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

	// 시도 선택 시 시군구 목록 가져오기
	$("#easementModifySelectBox09").change(function() {
		const sido = $(this).val();
		console.log("시도 change 동작, sido:" + sido);
		if (sido) {
			getSigunMaster(sido);  // 시군구 목록 API 호출
		}
	});

	// 시군구 선택 시 읍면동 목록 가져오기
	$("#easementModifySelectBox10").change(function() {
		const sigungu = $(this).val();
		const sido = $("#easementModifySelectBox09").val();  // 시도 값도 함께 가져옴
		if (sigungu && sido) {
			getDongMaster(sido, sigungu);  // 읍면동 목록 API 호출
		}
	});

	// 읍면동 선택 시 리 목록 가져오기
	$("#easementModifySelectBox11").change(function() {
		const dong = $(this).val();
		const sigungu = $("#easementModifySelectBox10").val();  // 시군구 값
		const sido = $("#easementModifySelectBox09").val();  // 시도 값
		if (dong && sigungu && sido) {
			getRiMaster(sido, sigungu, dong);  // 리 목록 API 호출
		}
	});
});


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
			//$("#easementModifySelectBox04").append("<option>선택</option>");  // <select> 내부 옵션 제거
			
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
			console.log("jmPipeName:"+jmPipeName);
			
			// 관로명 선택값을 커스텀 버튼에 반영
			if (data.length==0) $(".defaultInfo .depth1 .content04 .customSelectView").text("선택");
			else $(".defaultInfo .depth1 .content04 .customSelectView").text(jmPipeName || "선택");

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


// 기본 정보 -> 주소 검색 입력형,선택형 클릭 시 활성화/비활성화
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


// 시군구 목록 가져오기
function getSigunMaster(sidoValue) {
	const allData = { key: sidoValue };

	$.ajax({
		url: "/api/getSigunMaster",
		data: JSON.stringify(allData),
		type: "POST",
		dataType: "json",
		contentType: "application/json; charset=utf-8",
		success: function(rt) {
			const data = rt.resultData;
			console.log("시군구 data: " + data);

			// 시군구 셀렉트 박스 초기화 및 추가
			const selectBox = $("#easementModifySelectBox10");
			const customSelectBtns = $("#customSelectBtns10"); // 해당 시군구에 맞는 custom 버튼

			selectBox.empty().append("<option value=''>전체</option>");
			customSelectBtns.empty(); // 해당 커스텀 UI도 초기화

			for (let i = 0; i < data.length; i++) {
				const gugun = data[i].sm_gugun;

				// 실제 <select> 태그에 옵션 추가
				selectBox.append("<option value='" + gugun + "'>" + gugun + "</option>");

				// 해당 커스텀 UI에 <li> 항목 추가
				customSelectBtns.append("<li><button type='button' class='moreSelectBtn'>" + gugun + "</button></li>");
			}

			// 커스텀 드롭다운 항목을 선택할 때 해당 select box 값만 동기화
			customSelectBtns.find(".moreSelectBtn").on("click", function() {
				const selectedText = $(this).text();
				selectBox.val(selectedText).trigger("change");
				customSelectBtns.siblings(".customSelectView").text(selectedText); // 버튼 텍스트 변경
			});
		},
		error: function(jqXHR, textStatus, errorThrown) {
			console.error("Error: ", textStatus, errorThrown);
		}
	});
}


// 읍면동 목록 가져오기
function getDongMaster(sidoValue, sigunguValue) {
	const allData = { sidoKey: sidoValue, gugunKey: sigunguValue };

	$.ajax({
		url: "/api/getDongMaster",
		data: JSON.stringify(allData),
		type: "POST",
		dataType: "json",
		contentType: "application/json; charset=utf-8",
		success: function(rt) {
			const data = rt.resultData;

			// 읍면동 셀렉트 박스 초기화 및 추가
			const selectBox = $("#easementModifySelectBox11");
			const customSelectBtns = $("#customSelectBtns11"); // 해당 읍면동에 맞는 custom 버튼

			selectBox.empty().append("<option value=''>전체</option>");
			customSelectBtns.empty(); // 해당 커스텀 UI도 초기화

			for (let i = 0; i < data.length; i++) {
				const dong = data[i].bm_dong;

				// 실제 <select> 태그에 옵션 추가
				selectBox.append("<option value='" + dong + "'>" + dong + "</option>");

				// 해당 커스텀 UI에 <li> 항목 추가
				customSelectBtns.append("<li><button type='button' class='moreSelectBtn'>" + dong + "</button></li>");
			}

			// 커스텀 드롭다운 항목을 선택할 때 해당 select box 값만 동기화
			customSelectBtns.find(".moreSelectBtn").on("click", function() {
				const selectedText = $(this).text();
				selectBox.val(selectedText).trigger("change");
				customSelectBtns.siblings(".customSelectView").text(selectedText); // 버튼 텍스트 변경
			});
		},
		error: function(jqXHR, textStatus, errorThrown) {
			console.error("Error: ", textStatus, errorThrown);
		}
	});
}


// 리 목록 가져오기
function getRiMaster(sidoValue, sigunguValue, dongValue) {
	const allData = { sidoKey: sidoValue, gugunKey: sigunguValue, dongKey: dongValue };

	$.ajax({
		url: "/api/getRiMaster",
		data: JSON.stringify(allData),
		type: "POST",
		dataType: "json",
		contentType: "application/json; charset=utf-8",
		success: function(rt) {
			const data = rt.resultData;

			// 리 셀렉트 박스 초기화 및 추가
			const selectBox = $("#easementModifySelectBox12");
			const customSelectBtns = $("#customSelectBtns12"); // 해당 리에 맞는 custom 버튼

			selectBox.empty().append("<option value=''>전체</option>");
			customSelectBtns.empty(); // 해당 커스텀 UI도 초기화

			for (let i = 0; i < data.length; i++) {
				const ri = data[i].rm_ri;

				// 실제 <select> 태그에 옵션 추가
				selectBox.append("<option value='" + ri + "'>" + ri + "</option>");

				// 해당 커스텀 UI에 <li> 항목 추가
				customSelectBtns.append("<li><button type='button' class='moreSelectBtn'>" + ri + "</button></li>");
			}

			// 커스텀 드롭다운 항목을 선택할 때 해당 select box 값만 동기화
			customSelectBtns.find(".moreSelectBtn").on("click", function() {
				const selectedText = $(this).text();
				selectBox.val(selectedText).trigger("change");
				customSelectBtns.siblings(".customSelectView").text(selectedText); // 버튼 텍스트 변경
			});
		},
		error: function(jqXHR, textStatus, errorThrown) {
			console.error("Error: ", textStatus, errorThrown);
		}
	});
}

// 주소 검색 버튼 클릭 시
$(document).on("click", "#basicSearchBtn", function() {
	console.log("-----basicSearchBtn click------------");
	console.log("-------검색버튼 클릭-----------");
	console.log($("#saveForm").serialize());
	var formSerializeArray = $('#saveForm').serializeArray();
	console.log(formSerializeArray);
	/* console.log($("#searchResultPopDiv").html());*/
	//searchResultPopDiv 화면뿌릴 DIV
	$.ajax({
		url: "/jisang/getBasicSearchDataForEdit",
		type: "POST",
		data: formSerializeArray,
	})
		.done(function(fragment) {
			//runScriptsInElement(landRightSearchResultPop); // 삽입된 html내 스크립트 실행 함수 호출
			//console.log($("#searchResultPopDiv").html());
			$('#searchResultPopDiv').replaceWith(fragment);
			const popupOpen = document.querySelector("#searchResultsPopup .popupWrap");
			console.log($(popupOpen).html());
			//			   		              landRightsSearchBtn.classList.add("open");
			$(popupOpen).addClass("open");
			popupOpen.classList.add("active");
		});
});

// 주소 검색 팝업 - x 버튼, 닫기 버튼 클릭 시 닫기 
$(document).on("click", ".topCloseBtn, #popupCloseBtn", function() {

	var targetDiv = $("#searchResultPopDiv").parent().find("#searchResultPopup").find(".popupWrap");
	$(".popupWrap").removeClass("active");
	//	$(".popupWrap").toggleClass("active");
});

// 주소 검색 팝업 - 선택 버튼 클릭 시 반영
$(document).on("click", ".resultSelectBtn", function() {
	console.log("----------resultSelectBtn-click--------");
	console.log($(this).parent().parent().html());

	var pnu = $(this).parent().parent().find(".popContent01").html();
	var address = $(this).parent().parent().find(".popContent02").html();
	var jibun = $(this).parent().parent().find(".popContent03").html();
	var sido_nm = $(this).parent().parent().find(".popContent0201").html();
	var sgg_nm = $(this).parent().parent().find(".popContent0202").html();
	var emd_nm = $(this).parent().parent().find(".popContent0203").html();
	var ri_nm = $(this).parent().parent().find(".popContent0204").html();

	console.log("pnu:" + pnu);
	console.log("address:" + address);
	console.log("jibun:" + jibun);

	$("#maddress").val(address + " " + jibun);
	$("#raddress").val(address + " " + jibun);
	$("#mpnu").val(pnu);
	$("#mjibun").val(jibun);
	$("#sido_nm").val(sido_nm);
	$("#sgg_nm").val(sgg_nm);
	$("#emd_nm").val(emd_nm);
	$("#ri_nm").val(ri_nm);

	var targetDiv = $("#searchResultPopDiv").parent().find("#searchResultPopup").find(".popupWrap");
	$(".popupWrap").removeClass("active");
})

// 주소 검색 팝업 - pnu 없이 선택 클릭 시 (개발 필요)
$(document).on("click", ".popupWrap .lastBtnBox .saveBtn", function() {
	console.log("pnu없이 선택");

})

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
	const clickedAttachFiles = document.querySelectorAll('input[name="attachFile"]:checked');
	console.log("----------------------------------");
	console.log(clickedAttachFiles);
	//console.log(uploadFiles);
	var dids=[];
	for (var i = 0; i < clickedAttachFiles.length; i++) {
		var delEle = $(clickedAttachFiles[i]).closest("#fileListUl");
		console.log($(clickedAttachFiles[i]).closest("#fileListUl").html());
		
		var ids={"jisang_no":$("#mod_jisangNo").val(),"idx":$(clickedAttachFiles[i]).closest("#fileListUl").find("#oidx").val(),"filename":$(clickedAttachFiles[i]).closest("#fileListUl").find("#filename").val()};
			//var filename={"idx":$(clickedAttachFiles[i]).closest("#fileListUl").find("#filename").val()};
			console.log("idx:"+ids);
			dids.push(ids);
		$(delEle).remove();

	}
	
	
	console.log(dids);
		var param={"fileIds":dids};

		console.log(param)

		url = "/jisang/deleteJisangAtcFile";
		         $.ajax({
		             url: url,
		             type: 'POST',
		             contentType: "application/json",
		             data: JSON.stringify(param),

		             dataType: "json",
		             beforeSend: function (request) {
		                 console.log("beforesend ........................");
		                 loadingShow();
		             },
		             success: function (response) {
		                 loadingHide();
		                 console.log(response);
		        //         if (response.success = "Y") {
		        //             console.log("response.success Y");
		        //             console.log("response.resultData length:" + response.resultData.length);
		        //             alert("정상적으로 등록 되었습니다.");
		        //             /*$("#popup_bg").show();
		        //             $("#popup").show(500);
		        //             //$("#addrPopupLayer tbody td").remove();
		        //             for(var i=0;i<response.resultData.length;i++){
		        //                 $("#addrPopupTable tbody").append("<tr><td>"+response.resultData[i].juso+"</td><td><button>선택</button></td></tr>");
		        //             }*/
		        //         }
		        //         else {
		        //             console.log("response.success N");
		        //         }
		             },
		             error: function (jqXHR, textStatus, errorThrown) {
		                 alert("finalBtn ajax error\n" + textStatus + ":" + errorThrown);
		                 return false;
		             }
		         });
	
	
})


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

const ownerInfoAddBtn = document.querySelectorAll('#landRightsRegistration .ownerInfo .addBtn')
const editBefore = document.querySelectorAll('#landRightsRegistration .ownerInfo .contents .content.btnBox .editBefore');
const editAfter = document.querySelectorAll('#landRightsRegistration .ownerInfo .contents .content.btnBox .editAfter');
const editContent = document.querySelectorAll('#landRightsRegistration .editSpace');
const registBtn = document.querySelectorAll('#landRightsRegistration .registBtn');


$(document).on("click", ".addBtn", function() {
	console.log("---------addBtn click-----------");

	var thisEditContent = this.closest('.contents');
	console.log(thisEditContent);
	//			thisEditContent.classList.add('editing');
	const inputs = thisEditContent.querySelectorAll('input');

	if (thisEditContent.classList.contains('editing')) {
		inputs.forEach(input => {
			input.setAttribute('readonly', 'readonly');


		});
	} else {
		inputs.forEach(input => {
			thisEditContent.classList.add('editing');
			input.removeAttribute('readonly');
		});
	}
});
$(document).on("click", "#completeSoujaBtn", function() {
	console.log("------------completeSoujaBtn click---------");
	const soujaDiv = document.getElementById('soujaDiv');
	const editingElements = soujaDiv.querySelectorAll('.editing');
	const editingCount = editingElements.length;

	var thisUl = $(this).parent().parent().parent().parent();
	console.log("editingCount" + editingCount);
	var addUl = $("#soujaHiddenUl").html();

	var input = $(thisUl).find("input");
	console.log(input);
	console.log(input.length);
	console.log("0:" + $(input).eq(0).val());

	if ($(input).eq(0).val() == "" || $(input).eq(1).val() == "" || $(input).eq(2).val() == "" || $(input).eq(3).val() == "") {
		alert("입력사항을 체크하세요! 공유지분,성명,주소는 필수 입력입니다.");
		return;
	}


	if ($(input).eq(0).val() != "" && $(input).eq(1).val() != "" && $(input).eq(2).val() != "" && $(input).eq(3).val() != "") {
		//	alert("소유자 정보를 정확하게 입력해주세요!");
		$(thisUl).removeClass("editing");
		$(thisUl).find('li input').attr('readonly', true);
		if (editingCount < 3) {
			$("#soujaDiv").append('<ul class="contents editing" id="soujaUl">' + addUl + '</ul>');
		}

		//return;
	}
	//if ($(input).eq(0).html()=="" || )

	//		$(thisUl).removeClass("editing");
	/*for(var i=0;i<input.length;i++) {
		console.log($(input).eq(i).parent().html());
	}*/

	/*$(input).forEach(input => {
			input.setAttribute('readonly', 'readonly');
	});*/


});


$(document).on("click", "#deleteSoujaBtn", function() {
	console.log("------------deleteSoujaBtn click---------");
	var thisUl = $(this).parent().parent().parent().parent();
	var thisContents = $(this).parent().parent().parent().parent().parent().find(".contents");
	console.log($(thisContents).html());
	console.log($(thisContents).length);
	if ($(thisContents).length <= 2) return;
	$(thisUl).remove();

});


// 첨부파일 전체 선택 체크박스
const AllCheckEventEasementModification = () => {

	// 첨부파일 리스트들
	const attachFiles = document.querySelectorAll('input[name="easementModification_attachFile"]');
	// checked가 된 첨부파일 리스트
	const clickedAttachFiles = document.querySelectorAll('input[name="easementModification_attachFile"]:checked');
	// 전체선택 input
	const clickedAllinput = document.querySelector('input[name="landRightsRegistration_file_select_all"]');

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
/*
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
*/



// 저장버튼 (개발 필요 - 지상권 등록 landRightsRegistration 참고, 현재 클릭 이벤트 x)
$(document).on("click", "#finalBtn", function() {
	console.log("---------finalBtn class click------------");
	
	
	
	
	console.log($("#saveForm").serialize());

	//데이터를 가공해서 넘김다
	var formSerializeArray = $('#saveForm').serializeArray();
	console.log(formSerializeArray);

	len = formSerializeArray.length;
	var dataObj = {};
	for (i = 0; i < len; i++) {
		dataObj[formSerializeArray[i].name] = formSerializeArray[i].value;
	}

	console.log("------dataObj--------");
	console.log(dataObj);

	const soujaUls = document.querySelectorAll('#soujaUl');
	const attachFileUls = document.querySelectorAll('input[name="landRightsRegistration_attachFile"]');
	console.log(attachFileUls);

	   console.log(soujaUls);
	var soujaArr = new Array();
	var modifyReason2 = ''; 
	for (var i = 0; i < soujaUls.length; i++) {
		console.log(soujaUls[i]);
		console.log($(soujaUls[i]).find("#soujaJibun").val());
		var soujaJibun = $(soujaUls[i]).find("input[name='soujaJibun']").val();
		var soujaName = $(soujaUls[i]).find("input[name='soujaName']").val();
		var soujaAddress = $(soujaUls[i]).find("input[name='soujaAddress']").val();
		var soujaContact1 = $(soujaUls[i]).find("input[name='soujaContact1']").val();
		var soujaContact2 = $(soujaUls[i]).find("input[name='soujaContact2']").val();
		
		var soujaJibunOrg = $(soujaUls[i]).find("input[name='soujaJibunOrg']").val();
				var soujaNameOrg = $(soujaUls[i]).find("input[name='soujaNameOrg']").val();
				var soujaAddressOrg = $(soujaUls[i]).find("input[name='soujaAddressOrg']").val();
				var soujaContact1Org = $(soujaUls[i]).find("input[name='soujaContact1Org']").val();
				var soujaContact2Org = $(soujaUls[i]).find("input[name='soujaContact2Org']").val();
				
				
		var addKey= $(soujaUls[i]).find("input[name='addKey']").val();

		soujaJibun = (soujaJibun == "undefined" || soujaJibun == "" || soujaJibun == null) ? "" : soujaJibun;
		soujaName = (soujaName == "undefined" || soujaName == "" || soujaName == null) ? "" : soujaName;
		soujaAddress = (soujaAddress == "undefined" || soujaAddress == "" || soujaAddress == null) ? "" : soujaAddress;
		soujaContact1 = (soujaContact1 == "undefined" || soujaContact1 == "" || soujaContact1 == null) ? "" : soujaContact1;
		soujaContact2 = (soujaContact2 == "undefined" || soujaContact2 == "" || soujaContact2 == null) ? "" : soujaContact2;
		var soujaInfo = { "jibun": soujaJibun, "soujaName": soujaName, "soujaAddress": soujaAddress, "soujaContact1": soujaContact1, "soujaContact2": soujaContact2 };
		console.log("soujaJibun:"+soujaJibun);
		console.log("soujaName:"+soujaName);
		console.log("soujaAddress:"+soujaAddress);
		console.log("soujaContact1:"+soujaContact1);
		if (soujaJibun != "" && soujaName != "" && soujaAddress != "" && soujaContact1 != "") {
			soujaArr.push(soujaInfo);
			console.log("--------souja 변경이력--------");
			console.log(oldSoujaArray[i]);
			
			console.log("addKey:"+addKey);
			if (addKey=="new"){
				console.log("-----------------------new-----------------");
				// 새로운 항목에 대한 변경 이력
				modifyReason2 += "소유자 정보 추가: ";
							
								modifyReason2 += compareChanges('', soujaName || '', ",성명");
								modifyReason2 += compareChanges('', soujaAddress || '', "주소");
								modifyReason2 += compareChanges('', soujaContact1 || '', "연락처1");
								modifyReason2 += compareChanges('', soujaContact2 || '', "연락처2");	
			}
			else {
			
				
				modifyReason2 += compareChanges(soujaNameOrg || '', soujaName || '', ",성명");
				modifyReason2 += compareChanges(soujaAddressOrg || '', soujaAddress || '', "주소");
				modifyReason2 += compareChanges(soujaContact1Org || '', soujaContact1 || '', "연락처1");
				modifyReason2 += compareChanges(soujaContact2Org || '', soujaContact2 || '', "연락처2");	
			}
			
		}
	}
    console.log(modifyReason2);
	var files = new Array();
	for (var i = 0; i < attachFileUls.length; i++) {
		console.log($(attachFileUls[i]).parent().parent().html());
		var fname = $(attachFileUls[i]).parent().parent().find("#filename").attr('placeholder');
		console.log(fname);
		files.push(fname);
	}

	console.log("--------files---------");
	console.log(files);

	console.log("--------soujaArr------");
	console.log(soujaArr);
	dataObj.soujaInfo = soujaArr;
	dataObj.uploadFiles = files;

	//필수정보체크
	console.log("jisa:" + dataObj.jisa);
	if (!checkData(dataObj.jisa, "s", "담당지사를 입력해주세요!")) return;
	else if (!checkData(dataObj.overlap_yn, "s", "관로일치여부블 입력해주세요!")) return;
	else if (!checkData(dataObj.youngdo, "s", "용도블 입력해주세요!")) return;
	else if (!checkData(dataObj.pipe_name, "s", "관로명(구간)을 입력해주세요!")) return;
	else if (!checkData(dataObj.sun_gubun, "s", "선구분을 입력해주세요!")) return;
	else if (!checkData(dataObj.gover_own_yn, "s", "국공유지여부를 입력해주세요!")) return;
	else if (!checkData(dataObj.jijuk_area, "s", "지적면적을 입력해주세요!")) return;
	else if (!checkData(dataObj.jimok_text, "s", "지목을 입력해주세요!")) return;
	else if (!checkData(dataObj.account_yn, "s", "회계처리필요여부블 입력해주세요!")) return;
	else if (!checkData(dataObj.maddress, "s", "주소블 입력해주세요!")) return;
	else if (soujaArr <= 0) {
		alert("소유자 정보를 입력해주세요!");
		return;
	}
	else if (!checkData(dataObj.mcomple_yn, "s", "등기여부블 입력해주세요!")) return;
	else if (!checkData(dataObj.mpyeonib_area, "s", "편입면적을 입력해주세요!")) return;
	else if (!checkData(dataObj.mpermit_yn, "s", "계약유형을 입력해주세요!")) return;

	console.log("------dataObj--------");
	console.log(dataObj);

	console.log("------------------변경정보 ------------------------");
	
	console.log(oldData);
	var modifyReason1 = getModifyReasonForBasicInfo(oldData);
		console.log("----------------modifyReason1--------------");
		console.log(modifyReason1);
		if (modifyReason1 !== "") {
			dataObj.modifyReason1 = modifyReason1;
		}
		console.log(modifyReason2);
		if (modifyReason2 !== "") {
			dataObj.modifyReason2 = modifyReason2;
		}

		
		var modifyReason3 = getModifyReasonForJisangInfo(oldData);
		if (modifyReason3 !== "") {
					dataObj.modifyReason3 = modifyReason3;
				}
	console.log(dataObj);
	

	dataObj.gubun = "modify";

	
	
	
	
	url = "/jisang/insertJisangList";
	$.ajax({
		url: url,
		type: 'POST',
		contentType: "application/json",
		data: JSON.stringify(dataObj),

		dataType: "json",
		beforeSend: function(request) {
			console.log("beforesend ........................");
			loadingShow();
		},
		success: function(response) {
			loadingHide();
			console.log(response);
			if (response.success = "Y") {
				console.log("response.success Y");
				//	console.log("response.resultData length:"+response.resultData.length);
				alert("정상적으로 등록 되었습니다.");
				/*$("#popup_bg").show();
				$("#popup").show(500);
				//$("#addrPopupLayer tbody td").remove();
				for(var i=0;i<response.resultData.length;i++){
					$("#addrPopupTable tbody").append("<tr><td>"+response.resultData[i].juso+"</td><td><button>선택</button></td></tr>");
				}*/
			}
			else {
				console.log("response.success N");
			}
		},
		error: function(jqXHR, textStatus, errorThrown) {
			alert("finalBtn ajax error\n" + textStatus + ":" + errorThrown);
			return false;
		}
	});
});



// 기본정보 변경이력 처리 함수
function getModifyReasonForBasicInfo(oldData) {
	
	
	console.log("---------------oldData--------------------");
	console.log(oldData);
    var modifyReason = '';
console.log("----------------getModifyReasonForBasicInfo--------------------");
/*var tobj=$("input[name='newregreason_org']").val();
var newregreasonOldValue="";
if (tobj=="0") newregreasonOldValue="";
else if (tobj=="1") newregreasonOldValue="사유지의 국유지 편입";
else if (tobj=="2") newregreasonOldValue="ILI결과 발견지번";

var tobj=$("input[name='occunonpayreason_org']").val();
var occunonpayreasonOldValue="";
if (tobj=="0") occunonpayreasonOldValue="";
else if (tobj=="1") occunonpayreasonOldValue="영구 무상점용";
else if (tobj=="2") occunonpayreasonOldValue="소액 미청구";
else if (tobj=="3") occunonpayreasonOldValue="관할관청의 미청구";
var newregreasonNewValue=$("#newregreasonBtn").text();
var occunonpayreasonNewValue=$("#occunonpayreasonBtn").text();*/

//console.log(newregreasonNewValue);
    modifyReason += compareChanges(oldData.jm_jisa, $("select[name='jisa']").val(), "담당지사");
	modifyReason += compareChanges(oldData.jm_pipe_yn, $("select[name='overlap_yn']").val(), "관로일치여부");
	modifyReason += compareChanges(oldData.jm_yongdo, $("select[name='youngdo']").val(), "용도");
	modifyReason += compareChanges(oldData.jm_pipe_name, $("select[name='pipe_name']").val(), "관로명");
	modifyReason += compareChanges(oldData.jm_sun_gubun, $("select[name='sun_gubun']").val(), "선구분");
	modifyReason += compareChanges(oldData.jm_gover_own_yn, $("select[name='gover_own_yn']").val(), "국공유지여부");
	modifyReason += compareChanges(oldData.jm_jijuk_area, $("input[name='jijuk_area']").val(), "지적면적");
	modifyReason += compareChanges(oldData.jm_jimok_text, $("#jimok_text_btn").text(), "지목");
	var manageyn = $("input[name='manage_yn']").is(':checked') ? "Y" : "N";
	var oldManageYn=(oldData.jm_manage_yn=="" || oldData.jm_manage_yn==null)?"N":"Y";
	modifyReason += compareChanges(oldManageYn, manageyn, "관리제외필지");
	modifyReason += compareChanges(oldData.jm_pipe_yn, $("input[name='raddress']").val(), "주소");
    /*modifyReason += compareChanges($("input[name='adm_office_org']").val(), $("#admOfficeText").text(), "관리기관");
    modifyReason += compareChanges($("input[name='office_depart_org']").val(), $("input[name='office_depart']").val(), "부서");
    modifyReason += compareChanges($("input[name='office_charege_org']").val(), $("input[name='office_charege']").val(), "담당자");
    modifyReason += compareChanges($("input[name='office_contact_org']").val(), $("input[name='office_contact']").val(), "연락처");
    modifyReason += compareChanges($("input[name='yongdo_org']").val(), $("select[name='yongdo']").val(), "용도");
    modifyReason += compareChanges($("input[name='pipe_name_org']").val(), $("select[name='pipe_name']").val(), "관로명");
    modifyReason += compareChanges($("input[name='sun_gubun_org']").val(), $("select[name='sun_gubun']").val(), "단/복선");
    modifyReason += compareChanges($("input[name='pipe_meter_org']").val(), $("input[name='pipe_meter']").val(), "관경");
    modifyReason += compareChanges($("input[name='exemptionyn_org']").val(), $("select[name='exemptionyn']").val(), "감면 여부");
    modifyReason += compareChanges($("input[name='use_purpos_org']").val(), $("select[name='use_purpos']").val(), "점용 구분");
    modifyReason += compareChanges($("input[name='gover_st_date_org']").val(), $("input[name='gover_st_date']").val(), "점용 시작일");
    modifyReason += compareChanges($("input[name='gover_ed_date_org']").val(), $("input[name='gover_ed_date']").val(), "점용 종료일");
    modifyReason += compareChanges($("input[name='gover_period_org']").val(), $("input[name='gover_period']").val(), "점용갱신주기");
    modifyReason += compareChanges(newregreasonOldValue, newregreasonNewValue, "신규등록사유");
    modifyReason += compareChanges($("input[name='permpossyn_org']").val(), $("select[name='permpossyn']").val(), "허가증 보유 여부");
    modifyReason += compareChanges(occunonpayreasonOldValue, occunonpayreasonNewValue, "점용료 미납부 사유");
    var occuprepayyn = $("input[name='occuprepayyn']").is(':checked') ? "Y" : "N";
    modifyReason += compareChanges($("input[name='occuprepayyn_org']").val(), occuprepayyn, "점용료 선납 여부");
    modifyReason += compareChanges($("input[name='occuprepaydate_org']").val(), $("input[name='occuprepaydate']").val(), "선납기한");*/
	console.log(modifyReason);
    return modifyReason;
}

function getModifyReasonForJisangInfo(oldData) {
	
	
	console.log("---------------oldData--------------------");
	console.log(oldData);
    var modifyReason = '';
console.log("----------------getModifyReasonForJisangInfo--------------------");

    modifyReason += compareChanges(oldData.jm_comple_yn, $("select[name='mcomple_yn']").val(), "등기여부");
	modifyReason += compareChanges(oldData.jm_pyeonib_area, $("input[name='mpyeonib_area']").val(), "편입면적");
	modifyReason += compareChanges(oldData.jm_location, $("input[name='mloacation']").val(), "위치");
	modifyReason += compareChanges(oldData.jm_permitted_yn, $("select[name='mpermit_yn']").val(), "계약유형");
	modifyReason += compareChanges(oldData.jm_deunggi_date, $("input[name='mdeunggi_date']").val(), "등기일");
	modifyReason += compareChanges(oldData.jm_deunggi_no, $("input[name='mdeunggi_no']").val(), "등기번호");
	modifyReason += compareChanges(oldData.jm_deunggiso, $("input[name='mdeunggiso']").val(), "등기소");
	modifyReason += compareChanges(oldData.jm_dosiplan, $("select[name='mdosi_plan']").val(), "도시계획 결정여부");
	modifyReason += compareChanges(oldData.jm_chuideuk_date, $("input[name='mchuideuk_date']").val(), "취득일");
	modifyReason += compareChanges(oldData.jm_jasan_no, $("input[name='mjasan_no']").val(), "자산분류번호");
	
	console.log(modifyReason);
    return modifyReason;
}



// 변경이력 비교 함수
function compareChanges(orgValue, newValue, fieldName) {
    // null과 undefined를 빈 문자열로 처리
    orgValue = orgValue === undefined || orgValue === null ? '' : orgValue;
    newValue = newValue === undefined || newValue === null ? '' : newValue;
    console.log("orgValue:"+orgValue);
	console.log("newValue:"+newValue);
	orgValue=(orgValue || '').toString().trim();
	if (orgValue != newValue.trim() && newValue.trim() != '') {
	    return `${fieldName} 변경 ('${orgValue.trim()}' > '${newValue.trim()}'); `;
	}

    return '';
}

