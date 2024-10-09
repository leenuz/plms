var uploadFiles=new Array();

$(document).ready(function() {
  // 허가관청 이력보기 버튼 클릭 시 팝업 열기
  $('.authHistBtn').on('click', function() {
    $('#changehistoryPopupDiv').fadeIn();
    $('#changehistoryPopup').addClass('active');
  });

  // 닫기 버튼 또는 상단 X 버튼 클릭 시 팝업 닫기
  $('#changehistoryPopup').on('click', '.closeBtn, .topCloseBtn', function() {
    $('#changehistoryPopupDiv').fadeOut();
    $('#changehistoryPopup').removeClass('active');
  });
});


// 허가관청 이력보기
// 스크롤이벤트_ 목록이 6개 이상일 경우 스크롤발생
const scrollLength = document.querySelectorAll(".historycontent ul");
const historycontent = document.querySelector(".historycontent");

if (scrollLength.length >= 6) {
  historycontent.classList.add("scroll");
} else {
  historycontent.classList.remove("scroll");
}

// x버튼, 닫기, 승인요청 클릭시 팝업클로즈
const changehistoryPopupOpen = document.getElementById("changehistoryPopup");
if (changehistoryPopupOpen) {
  changehistoryPopupOpen
    .querySelectorAll(".topCloseBtn, .finalBtn")
    .forEach(function (btn) {
      btn.addEventListener("click", () => {
        changehistoryPopupOpen.classList.remove("active");
      });
    });
}


// 초기화 시 모든 줄에 대해 함수 실행
$(document).ready(function() {
  console.log("gover/masterEdit.js start");
  
  // 초기 로드 시 단/복선 값에 따라 div 표시
  const sunGubunValue = $('#masterEditSelectBox06').val();
  toggleLineDisplay(sunGubunValue);
 
	// 단/복선 선택이 변경될 때마다 관경 설정
	$('#masterEditSelectBox06').on('change', function() {
		console.log("단복선 선택");
		const selectedValue = $(this).val();
	    toggleLineDisplay(selectedValue);
		console.log("selectedValue"+selectedValue);
	});

    // 모든 셀렉트 박스에 대해 커스텀 셀렉트 박스 초기화 실행
    createCustomLimasterReg();  // 페이지가 로드될 때 초기화

	// 셀렉 박스 초기화 함수 호출(담당지사,허가관청,관리기관(기본정보,소속토지정보),관로명)
	initSelectBoxes();
	
	// 지사 선택 시 허가관청, 관로명 목록 업데이트를 위한 change 트리거
	 $(document).on("click", "#jisaUl li", function () {
	     const selectedJisa = $(this).text().trim();
	     $("#jisaText").text(selectedJisa);
	     $("#masterEditSelectBox01").val(selectedJisa).change(); // change 이벤트 트리거
	 });
	 
	 // 지사 선택에 따른 허가관청, 관로명 목록 업데이트
	 $(document).on("change", "#masterEditSelectBox01", function () {
	     const selectedJisa = $("#masterEditSelectBox01").val();
	     if (selectedJisa) {
	         updatePmtOfficeList(selectedJisa); // 허가관청 목록 업데이트
	         updatePipeNameList(selectedJisa);  // 관로명 목록 업데이트
	     }
	 });
	 
	 // 허가관청 선택 시 관리기관 목록 업데이트
	 $(document).on("change", "#masterEditSelectBox02", function () {
	     const selectedPmtOffice = $("#masterEditSelectBox02").val();
	     const selectedJisa = $("#masterEditSelectBox01").val();
	     if (selectedPmtOffice && selectedJisa) {
	         updateAdmOfficeList(selectedJisa, selectedPmtOffice); // 관리기관 목록 업데이트
	     }
	 });
	 
	 // 관리기관 선택 반영
 	 $(document).on("click", "#pipeNameUl li", function () {
 	     const selectedAdmOffice = $(this).text().trim();
 	     $("#pipeNameText").text(selectedAdmOffice);
		 
 	 });
	 
	 // 허가관청 선택 시 관리기관 목록 업데이트를 위한 change 트리거
	 $(document).on("click", "#pmtOfficeUl li", function () {
	     const selectedPmtOffice = $(this).text().trim();
	     $("#pmtOfficeText").text(selectedPmtOffice);
	     $("#masterEditSelectBox02").val(selectedPmtOffice).change(); // change 이벤트 트리거
	 });
	 
	 // 관리기관 선택 (선택 후 추가적인 동작이 필요하다면 이곳에 추가)
	 $(document).on("click", "#admOfficeUl li", function () {
	     const selectedAdmOffice = $(this).text().trim();
	     $("#admOfficeText").text(selectedAdmOffice);
	     $("#masterEditSelectBox03").val(selectedAdmOffice).change(); // change 이벤트 트리거
	 });
	 
	 // 소속 토지 정보의 관리기관 선택 (첫번째 행)
	 $(document).on("click", "#goverUl .customSelectBtns li", function () {
	     const selectedAdmOffice = $(this).text().trim();
	     const parentUl = $(this).closest("ul");
		
	     const targetSelectBox = parentUl.siblings(".hiddenSelectBox").find("select");

	     // 선택한 관리기관 값을 반영
	     parentUl.siblings(".customSelectView").text(selectedAdmOffice);

		 
	     targetSelectBox.val(selectedAdmOffice).change();  // change 이벤트 트리거
	 });
	 
	 // 소속 토지 정보의 관리기관 선택 (2개 이상일 때 반복문 행)
 	 $(document).on("click", "#goverUl02 .customSelectBtns li", function () {
 	     const selectedAdmOffice = $(this).text().trim();
 	     const parentUl = $(this).closest("ul");
 	     const targetSelectBox = parentUl.siblings(".hiddenSelectBox").find("select");

 	     // 선택한 관리기관 값을 반영
 	     parentUl.siblings(".customSelectView").text(selectedAdmOffice);
 	     targetSelectBox.val(selectedAdmOffice).change();  // change 이벤트 트리거
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
	        $('input[type=file][name="fileUpload"]').trigger('click'); // 파일 선택 창을 띄우는 트리거
	    }
	});
	 
	$('input[type=file][name="fileUpload"]').on('change', function(e) {
	    var files = e.originalEvent.target.files; // 파일 선택창에서 선택된 파일들
	    handleFileUpload(files, objDragAndDrop);  // 선택된 파일들을 처리하는 함수 호출
	});
    
	var rowCount = document.querySelectorAll("#fileListDiv > ul").length + 1;  // 현재 렌더된 파일 개수 계산
	
    function handleFileUpload(files,obj) {
		console.log("-------------handleFileUpload---------------");
		console.log(files);
       for (var i = 0; i < files.length; i++) { // 선택된 파일들을 하나씩 처리
            var fd = new FormData(); // FormData 객체 생성 (파일 업로드를 위한 객체)
            fd.append('file', files[i]); // 파일 객체를 FormData에 추가
     		
            // var status = new createStatusbar($("#fileTitleUl"),files[i].name,files[i].size,rowCount); // 파일 업로드 상태바 생성
			var status = new createStatusbar($("#fileListDiv"),files[i].name,files[i].size,rowCount); // 파일 업로드 상태바 생성
            sendFileToServer(fd,status); // 서버로 파일 전송 함수 호출
			
			rowCount++; // 파일이 추가될 때마다 rowCount를 증가시켜 고유한 id를 유지
       }
    }

	// Status bar 생성 함수
    function createStatusbar(obj,name,size,no){
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
		
        var row='<ul class="contents" id="fileListUl">';
		row += '<li class="selectWidth content checkboxWrap">';
		row += '<input type="checkbox" id="masterEdit_attachFile'+no+'" name="masterEdit_attachFile" >';
		row += '<label for="masterEdit_attachFile'+no+'"></label>';
		row += '</li>';
		row += '<li class="content registDateWidth">';
		row += '<input type="text" value="" readonly class="notWriteInput" name="registDateWidth"/>';
		row += '</li>';
		row += '<li class="content fileNameWidth">';
		row += '<input type="text" value="' + name + '" id="filename" readonly class="notWriteInput" />';
		row += '</li>';
		row += '<li class="content viewBtnBox">';
		row += '<button class="viewDetailButton lightBlueBtn">보기</button>';
		row += '</li>';
		row += '</ul>';
		
        obj.append(row); // 파일 목록이 있는 DOM 요소 뒤에 파일 정보를 추가
		
		var radio=$(row).find('input'); // row에서 input 요소를 찾음
		console.log("---------------radio checkbox----------");
		$(radio).find('input').attr("disabled",false); // 체크박스가 비활성화되지 않도록 설정
     	console.log($(radio).parent().html());
    }
	                
    function sendFileToServer(formData,status) {
        var uploadURL = "/land/gover/fileUpload/post"; //Upload URL
        var extraData ={}; //Extra Data.
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
});

// 초기 셀렉 박스 초기화
function initSelectBoxes() {
    console.log("초기 셀렉 박스 초기화 시작");

    // resultData를 사용해 셀렉 박스 초기화
    const jisaValue = resultData.gm_jisa;  // 담당지사 초기화
    const pmtOfficeValue = resultData.gm_pmt_office;  // 허가관청 초기화
    const admOfficeValue = resultData.gm_adm_office;  // 관리기관 초기화
    const pipeNameValue = resultData.gm_pipe_name;  // 관로명 초기화

	console.log("지사: "+jisaValue+", pmt: "+pmtOfficeValue+", adm: "+admOfficeValue+", 관로명: "+pipeNameValue);
	
    // 담당지사 값에 따라 허가관청, 관로명 목록 업데이트
    if (jisaValue) {
        updatePmtOfficeList(jisaValue);
		updatePipeNameList(jisaValue);
    }

    // 허가관청 값에 따라 관리기관 목록 업데이트
    if (pmtOfficeValue) {
        updateAdmOfficeList(jisaValue, pmtOfficeValue);
    }
}

// 허가관청 목록 업데이트 함수
function updatePmtOfficeList(jisaValue) {
    const allData = { jisa: jisaValue };

    $.ajax({
        url: "/land/gover/getPmtOffice",
        data: JSON.stringify(allData),
        type: "POST",
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        success: function(rt) {
            const data = rt.resultData;
            console.log("허가관청 목록 데이터:", data);

            // 허가관청 셀렉 박스 초기화 및 업데이트
            $("#pmtOfficeUl li").remove();
            $("#masterEditSelectBox02 option").remove();
            for (let i = 0; i < data.length; i++) {
                $("#pmtOfficeUl").append("<li><p>" + data[i].so_pmt_office + "</p></li>");
                $("#masterEditSelectBox02").append("<option>" + data[i].so_pmt_office + "</option>");
            }

            // 허가관청 선택값을 설정
            $("#masterEditSelectBox02").val(resultData.gm_pmt_office).change();
        },
        error: function(jqXHR, textStatus, errorThrown) {
            console.error("허가관청 목록 업데이트 실패:", textStatus, errorThrown);
        }
    });
}

// 관로명 목록 업데이트 함수
function updatePipeNameList(jisaValue) {
    const allData = { jisa: jisaValue };

    $.ajax({
        url: "/land/gover/getPipeName",  // 관로명 목록을 가져오는 API
        data: JSON.stringify(allData),
        type: "POST",
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        success: function(rt) {
            const data = rt.resultData;
            console.log("관로명 목록 데이터:", data);

            // 관로명 셀렉 박스 초기화 및 업데이트
            $("#pipeNameUl li").remove();  // 기존 목록 초기화
            $("#masterEditSelectBox05 option").remove();  // 셀렉 박스 옵션 초기화

            // 받은 데이터로 관로명 목록 업데이트
            for (let i = 0; i < data.length; i++) {
                $("#pipeNameUl").append("<li><p>" + data[i].jzn_zone_name + "</p></li>");
                $("#masterEditSelectBox05").append("<option>" + data[i].jzn_zone_name + "</option>");
            }

            // 관로명 선택값을 설정
            $("#masterEditSelectBox05").val(resultData.gm_pipe_name).change();  // 초기 선택값 설정
        },
        error: function(jqXHR, textStatus, errorThrown) {
            console.error("관로명 목록 업데이트 실패:", textStatus, errorThrown);
        }
    });
}

// 관리기관 목록 업데이트 함수
function updateAdmOfficeList(jisaValue, pmtOfficeValue) {
    const allData = { jisa: jisaValue, pmt_office: pmtOfficeValue };

    $.ajax({
        url: "/land/gover/getAdmOffice",
        data: JSON.stringify(allData),
        type: "POST",
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        success: function(rt) {
            const data = rt.resultData;
            console.log("관리기관 목록 데이터:", data);

            // 관리기관 셀렉 박스 초기화 및 업데이트
            $("#admOfficeUl li").remove();
            $("#masterEditSelectBox03 option").remove();
            for (let i = 0; i < data.length; i++) {
                $("#admOfficeUl").append("<li><p>" + data[i].so_adm_office + "</p></li>");
                $("#masterEditSelectBox03").append("<option>" + data[i].so_adm_office + "</option>");
            }

            // 관리기관 선택값을 설정
            $("#masterEditSelectBox03").val(resultData.gm_adm_office).change();
			
			// 관리기관 리스트 소속 토지 정보에도 업데이트
            updateGoverAdmOffice(data);
        },
        error: function(jqXHR, textStatus, errorThrown) {
            console.error("관리기관 목록 업데이트 실패:", textStatus, errorThrown);
        }
    });
}


// 소속토지정보 - 필지 정보 - 엑셀 다운로드 팝업열기
$('#landInfoLabel').on('click', function() {
	downloadExcelForLand();
});


// 소속토지정보 - 필지 정보 엑셀 다운로드 함수
function downloadExcelForLand() {

	var uls = $("#goverUlDiv .contents");
	console.log(uls);

	var goverNo = $('#gover_no').val();
	console.log(goverNo);

	var pnuArr = [];
	for (var i = 0; i < uls.length; i++) {
		var pnu = $(uls[i]).find('#pnu').val(); // 각 ul 내부의 pnu 값을 가져오기
		pnuArr.push(pnu);
	}
	
	var allData = {"pnuData": pnuArr };
	console.log(allData);
	
	$.ajax({
		url: "/land/gover/selectPnuExcelDownload",  // PNU 기준으로 데이터를 가져오는 API
		data: JSON.stringify(allData),
		async: true,
		type: "POST",
		dataType: "json",
		contentType: "application/json; charset=utf-8",
		success: function(rt) {
			const data = rt.resultData;
			console.log(data); // 서버에서 받아온 데이터 확인
			
			// 엑셀에 담을 데이터 준비
			var data1 = [];
			var rowTitle = ['관리기관', '주소', 'PNU', '점용길이 (m)', '관로면적 (㎡)'];
			data1.push(rowTitle);
			
			// 서버에서 받아온 데이터를 이용해 행 생성
			for (var i = 0; i < uls.length; i++) {
				var addr = $(uls[i]).find("#addr").val(); // 주소 값
				var pnuNo = $(uls[i]).find("#pnu").val(); // PNU 값
				
				// 서버에서 받아온 데이터를 pnuNo에 맞춰 매칭
				var matchingData = data.find(function(item) {
					return item.pnu === pnuNo; // pnu가 일치하는지 확인
				});

				// 매칭되는 데이터가 있으면 해당 데이터를 사용, 없으면 빈값 처리
				var contact_length = matchingData ? matchingData.contact_length : "";
				var contact_area = matchingData ? matchingData.contact_area : "";

				// 행 데이터 추가
				var rowData = [goverNo, addr, pnuNo, contact_length, contact_area];
				data1.push(rowData);
			}
			
			// 엑셀 파일 생성
			console.log(data1);
			var worksheet = XLSX.utils.aoa_to_sheet(data1);
			var workbook = XLSX.utils.book_new();
			XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");

			// goverNo를 활용해 파일 이름 동적으로 생성
			var fileName = goverNo + '_필지정보.xlsx';

			// 엑셀 파일 다운로드
			XLSX.writeFile(workbook, fileName);
		},
		error: function(jqXHR, textStatus, errorThrown) {
			console.error("Error: ", textStatus, errorThrown);
		}
	});
}


// 소속토지정보 - 엑셀 다운로드
function downloadExcel() {

	var uls = $("#goverUlDiv .contents");
	console.log(uls);
	
	var data1 = [];

	var rowTitle = ['관리기관', '국공유지여부', '대표필지', '주소', 'PNU', '지목', '점용연장', '점용면적', '관료일치여부'];
	data1.push(rowTitle);
	for (var i = 0; i < uls.length; i++) {

		console.log($(uls[i]).html());
		var adm_office = $(uls[i]).find("#admOfficeText01").text();
		var gover_own_yn = $(uls[i]).find("#goverOwnYnBtn").text();
		var rep_flag = $(uls[i]).find("input[type='checkbox']").is(":checked");
		console.log($(uls[i]).find("input[type='checkbox']").parent().html());
		var addr = $(uls[i]).find("#addr").val();
		var pnu = $(uls[i]).find("#pnu").val();
		var jimok_text = $(uls[i]).find("#jimok").val();
		var gover_length = $(uls[i]).find("input[name='gover_length']").val();
		var gover_area = $(uls[i]).find("input[name='gover_area']").val();
		var pipe_overlap_yn = $(uls[i]).find("#pipeOverlapYnBtn").text();
		var rep_text = "";
		if (rep_flag) rep_text = "O";
		else rep_text = "X";
		console.log(rep_flag);
		var rowData = [adm_office, gover_own_yn, rep_text, addr, pnu, jimok_text, gover_length, gover_area, pipe_overlap_yn];

		console.log(rowData);
		data1.push(rowData);
	}
	console.log(data1);
	// div의 내용을 가져오기
	// 1. div 안의 텍스트 내용을 가져옵니다.

	// 3. SheetJS에서 워크북 생성
	var worksheet = XLSX.utils.aoa_to_sheet(data1);
	var workbook = XLSX.utils.book_new();
	XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");

	// 4. 엑셀 파일 다운로드
	XLSX.writeFile(workbook, '소속토지정보.xlsx');
}


// 엑셀 업로드 열기, 닫기
$(document).ready(function() {
	// 허가관청 이력보기 버튼 클릭 시 팝업 열기
	$('.excelUpBtn').on('click', function() {
		$('#exceluploadPopDiv').fadeIn();
		$('#exceluploadPopup').addClass('active');
	});

	// 닫기 버튼 또는 상단 X 버튼 클릭 시 팝업 닫기
	$('#changehistoryPopup').on('click', '.closeBtn, .topCloseBtn', function() {
		$('#exceluploadPopDiv').fadeOut();
		$('#exceluploadPopup').removeClass('active');
	});
});


// 엑셀파일 전송 버튼 동작
$(document).ready(function() {
	$(document).on("click", "#excelUpload", function() {
		console.log("----------------excelUpload click-------------");

		var fileInput = $("#excelPopup_file")[0]; //input file 객체를 가져온다.
		var file = fileInput.files[0]
		console.log(file);
		if (!file) {
			alert("Please select an Excel file first.");
			return;
		}

		var i, f;
		var headers;
		var EXCEL_JSON;

		f = file;

		var reader = new FileReader(); //FileReader를 생성한다.         

		//성공적으로 읽기 동작이 완료된 경우 실행되는 이벤트 핸들러를 설정한다.
		reader.onload = function(e) {

			// ...엑셀파일을 읽어서 처리하는 로직...
			var data = e.target.result; //FileReader 결과 데이터(컨텐츠)를 가져온다.

			//바이너리 형태로 엑셀파일을 읽는다.
			var workbook = XLSX.read(data, { type: 'binary' });
			var worksheet = workbook.Sheets[workbook.SheetNames[0]];
			/* var i=0;
			for (var cell in worksheet) {
				 if (worksheet.hasOwnProperty(cell) && cell[0] !== '!') { // 메타데이터 제외
						 worksheet[cell].t = 's'; // 셀 타입을 무조건 텍스트('s')로 설정
			 }
			} */

			EXCEL_JSON = XLSX.utils.sheet_to_json(worksheet, { raw: false, cellDates: false });
			//엑셀파일의 시트 정보를 읽어서 JSON 형태로 변환한다.
			workbook.SheetNames.forEach(function(item, index, array) {
				headers = get_header_row(workbook.Sheets[item]);
				console.log(headers);
				/* console.log(item);
				console.log(index);
				console.log(array);
			  
							EXCEL_JSON = XLSX.utils.sheet_to_json(workbook.Sheets[item]);
						 console.log(EXCEL_JSON); */

			});//end. forEach */

			//excel 내용 header와 비교해서 공백이라 안넘어온 header 빈정보 삽입
			for (j = 0; j < headers.length; j++) {
				for (jj = 0; jj < EXCEL_JSON.length; jj++) {

					if (!EXCEL_JSON[jj].hasOwnProperty(headers[j])) {

						//	console.log(jj+"="+headers[j]);
						/* 
						if (!isDate(EXCEL_JSON[jj].JIBUN)){
							console.log(jj+":"+EXCEL_JSON[jj].JIBUN);
						} */
						EXCEL_JSON[jj][headers[j]] = "";
					}
				}
			}
			console.log(EXCEL_JSON);

			for (var i = 0; i < EXCEL_JSON.length; i++) {
				//if (i == 0) {
				var openerEle = $("#goverUlDiv");
				var openerTargetEle = openerEle.find('input[id="goverIndex"][value="0"]');
				//console.log(openerTargetEle.parent().parent().html());
				console.log(EXCEL_JSON[i]["관리기관"]);
				openerTargetEle.parent().parent().find("#admOfficeBtn").text(EXCEL_JSON[i]["관리기관"]);
				openerTargetEle.parent().parent().find("#goverOwnYnBtn").text(EXCEL_JSON[i]["국공유지여부"]);
				openerTargetEle.parent().parent().find("#addr").val(EXCEL_JSON[i]["주소"]);
				openerTargetEle.parent().parent().find("#pnu").val(EXCEL_JSON[i]["PNU"]);
				openerTargetEle.parent().parent().find("#jimok").text(EXCEL_JSON[i]["지목"]);
				openerTargetEle.parent().parent().find("input[name='gover_length']").val(EXCEL_JSON[i]["점용연장"]);
				openerTargetEle.parent().parent().find("input[name='gover_area']").val(EXCEL_JSON[i]["점용면적"]);
				openerTargetEle.parent().parent().find("#pipeOverlapYnBtn").text(EXCEL_JSON[i]["관로일치여부"]);

				//}
				//else addRowExcel(EXCEL_JSON[i]);
				addRowExcel(EXCEL_JSON[i])
			}
		}

		reader.readAsBinaryString(f);

	})

	function get_header_row(sheet) {
		var headers = [];
		var range = XLSX.utils.decode_range(sheet['!ref']);
		var C, R = range.s.r; /* start in the first row */
		/* walk every column in the range */
		for (C = range.s.c; C <= range.e.c; ++C) {
			var cell = sheet[XLSX.utils.encode_cell({ c: C, r: R })] /* find the cell in the first row */

			var hdr = "UNKNOWN " + C; // <-- replace with your desired default 
			if (cell && cell.t) hdr = XLSX.utils.format_cell(cell);

			headers.push(hdr);
		}
		return headers;
	}


	function addRowExcel(obj) {
		console.log("-------------addrowExcel-----------");
		console.log(obj);

		var thisUl = $(this).parent().parent().parent().parent();
		//console.log(thisUl);
		var addUl = $("#row-template").html();

		//addUl.find()

		var addDiv = $('<ul class="contents" id="goverUl">' + addUl + '</ul>');

		console.log(addDiv.find("#admOfficeBtn").text());
		addDiv.find("#admOfficeBtn").text(obj["관리기관"]);
		addDiv.find("#goverOwnYnBtn").text(obj["국공유지여부"]);
		addDiv.find("#addr").val(obj["주소"]);
		addDiv.find("#pnu").val(obj["PNU"]);
		addDiv.find("#jimok").text(obj["지목"]);
		addDiv.find("input[name='gover_length']").val(obj["점용연장"]);
		addDiv.find("input[name='gover_area']").val(obj["점용면적"]);
		addDiv.find("#pipeOverlapYnBtn").text(obj["관로일치여부"]);

		addDiv.find("#goverIndex").val(index);
		//console.log($(addDiv).html());

		//멀티체크박스 클릭을 위한 조치
		var pipe = addDiv.find('#masterRegSelectBox_');
		pipe.attr({ 'class': 'masterRegSelectBox_' + index, 'name': 'masterRegSelectBox_' + index, 'id': 'masterRegSelectBox_' + index });
		var label1 = pipe.closest('li').find('label').first();
		label1.attr({ 'for': 'masterRegSelectBox_' + index, 'name': 'masterRegSelectBox_' + index });

		// 순번 적용
		addDiv.find('input[readonly]').attr('placeholder', index); // 순번 적용
		index++; // index 값을 증가시켜 다음 버튼에 적용


		$("#goverUlDiv").append(addDiv);

		// 추가된 모든 행에 대해 순번 재할당
		updateRowNumbers();

		// 추가된 행에도 관리기관 목록을 동기화
		const selectedPmtOffice = $("#masterRegSelectBox02").val();  // 현재 허가관청의 값
		if (selectedPmtOffice) {
			updateGoverAdmOfficeForRow(addDiv, selectedPmtOffice);  // 추가된 행에도 관리기관 목록을 적용
		}
	}

});

/*******엑세 업로드 팝업 스크립트 시작********/
//x버튼, 닫기, 승인요청 클릭시 팝업클로즈
const exceluploadPopupOpen = document.getElementById("exceluploadPopup");
if (exceluploadPopupOpen) {
	exceluploadPopupOpen.querySelectorAll(".topCloseBtn, .finalBtn").forEach(function(btn) {
		btn.addEventListener("click", () => {

			exceluploadPopupOpen.classList.remove("active");

		});
	});
}

// 파일 첨부 기본 모습

const defaultExcelFileUploadWrap = document.querySelectorAll('.popfileUploadDisplay');

defaultExcelFileUploadWrap[0].classList.add('active');

// 파일 첨부시 모습 변경, x버튼 클릭시 비우기

const excelFileEvent = () => {

	if (document.getElementById('excelPopup_file')) {

		const excelPopup_myPcFiles = document.getElementById('excelPopup_file');
		const excelFiles = excelPopup_myPcFiles.files;
		// input[type file]을 가진 제일 큰 부모
		const excelFileInfo = excelPopup_myPcFiles.closest('.excelFileInfo');
		// 업로드시 보이는 영역
		const popfileUploadAfterWrap = excelFileInfo.querySelector('.popfileUploadAfter');
		const allPopupExcelContents = popfileUploadAfterWrap.querySelectorAll('.popcontents');

		var excelpopfileInfoName = '';
		var excelpopfileInfoSize = '';
		var excelpopfileInfoType = '';

		excelPopup_myPcFiles.addEventListener('change', function() {

			// 기존의 ul 초기화
			const popExistContents = popfileUploadAfterWrap.querySelectorAll('.popcontents');

			popExistContents.forEach((list) => {
				list.remove();
			})

			// 삭제 잘 되었는지 확인
			const newPopExistContents = popfileUploadAfterWrap.querySelectorAll('.popcontents');
			console.log(newPopExistContents.length);

			if (excelPopup_myPcFiles.files.length > 0) {

				for (let i = 0; i <= excelPopup_myPcFiles.files.length - 1; i++) {
					const thisExcelPopFileName = excelPopup_myPcFiles.files[i].name;
					const thisExcelPopFileSize = excelPopup_myPcFiles.files[i].size;
					const thisExcelPopFileType = excelPopup_myPcFiles.files[i].type;

					// 사이즈를 바꾸자
					const excelformattedSize = byteTransformForPop(thisExcelPopFileSize);

					// 문자열에 변수를 담자
					excelpopfileInfoName = thisExcelPopFileName;
					excelpopfileInfoSize = excelformattedSize;
					excelpopfileInfoType = thisExcelPopFileType;

					// 파일 지우는 버튼용 li

					const popdeleteLi = '<li class="popbtnbox"><button class="popfileDeleteBtn"></button></li>';

					// 파일 아이콘, 파일명 들어가는 li
					const popfilenameBoxLi = `<li class="popcontent popfilenameBox"><figure class="poptypeIcon ${excelpopfileInfoName}"></figure><p class="popfileNameText">${excelpopfileInfoName}</p></li >`;

					// 업로드 상태
					const popuploadStatusLi = '<li class="popcontent"><p>-</p></li>';

					// 파일 크기 들어가는 li
					const popfileSizeLi = `<li class="popcontent">
                    <p class="popfileSizeText"> ${excelpopfileInfoSize} </p>
                </li>`;

					const listBox = popdeleteLi + popfilenameBoxLi + popuploadStatusLi + popfileSizeLi;

					// ul.contents 만들기
					const popContentsUl = document.createElement('ul');
					popContentsUl.classList.add('popcontents');

					popContentsUl.innerHTML = listBox;

					popfileUploadAfterWrap.appendChild(popContentsUl);


					// 값 잘 담겼는지 확인

					console.log('담긴 파일 이름:' + thisExcelPopFileName);


					// 다음 걸 받기 위해 비워주기

					excelpopfileInfoName = '';
					excelpopfileInfoSize = '';
					excelpopfileInfoType = '';

				}


				defaultExcelFileUploadWrap.forEach((wrap) => {
					wrap.classList.remove('active');
				})
				defaultExcelFileUploadWrap[1].classList.add('active');

				if (excelPopup_myPcFiles.files.length > 2) {
					popfileUploadAfterWrap.classList.add('scroll');
				} else {
					popfileUploadAfterWrap.classList.remove('scroll');
				}


			} else {

				excelPopup_myPcFiles.value = '';
				defaultExcelFileUploadWrap.forEach((wrap) => {
					wrap.classList.remove('active');
				})
				defaultExcelFileUploadWrap[0].classList.add('active');
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
				removeFileforPop(popfileNameToRemove);
				popnearbyContents.remove();

				for (let b = 0; b < excelPopup_myPcFiles.files.length; b++) {
					console.log('현재 input[type=file]의 files name: ' + excelPopup_myPcFiles.files[b].name);
				}

				console.log('남은 파일의 개수:' + excelPopup_myPcFiles.files.length);

				if (excelPopup_myPcFiles.files.length < 3) {
					popfileUploadAfterWrap.classList.remove('scroll');
				}

				// 현재 선택된 파일이 없으면 input 값 비우기
				if (excelPopup_myPcFiles.files.length === 0) {
					excelPopup_myPcFiles.value = '';
					defaultExcelFileUploadWrap.forEach((wrap) => {
						wrap.classList.remove('active');
					});
					defaultExcelFileUploadWrap[0].classList.add('active');
				}
			}


		})

		// 전체 삭제 버튼
		const popallDeleteFileBtn = popfileUploadAfterWrap.querySelector('.popAllDeleteFileBtn');

		popallDeleteFileBtn.addEventListener('click', function() {

			const nowAllPopcontents = popfileUploadAfterWrap.querySelectorAll('.popcontents');
			nowAllPopcontents.forEach((contents) => {
				contents.remove();
			})

			excelPopup_myPcFiles.value = '';


			// 값 잘 사라졌는지 확인
			console.log(excelPopup_myPcFiles.value);


			if (excelPopup_myPcFiles.files.length == 0) {
				excelPopup_myPcFiles.value = '';
				defaultExcelFileUploadWrap.forEach((wrap) => {
					wrap.classList.remove('active');
				})
				defaultExcelFileUploadWrap[0].classList.add('active');
				popfileUploadAfterWrap.classList.remove('scroll');
			}
		})

		// 용량 크기 변환하는 함수
		function byteTransformForPop(bytes) {
			const dataSizeforPop = ['Bytes', 'KB', 'MB', 'GB', 'TB']

			if (bytes === 0) return 'not available';

			const d = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)), 10);
			if (d === 0) return `${bytes} ${dataSizeforPop[d]}`;
			return `${(bytes / (1024 ** d)).toFixed(1)} ${dataSizeforPop[d]}`;
		}

		// 파일 삭제처리 하는 함수
		const removeFileforPop = (popfileNameToRemove) => {
			const filesArrayforPop = Array.from(excelPopup_myPcFiles.files);
			const popNewDataTransfer = new DataTransfer();
			filesArrayforPop.forEach(file => {
				if (file.name !== popfileNameToRemove) {
					popNewDataTransfer.items.add(file);
				}
			});
			excelPopup_myPcFiles.files = popNewDataTransfer.files; // 새로운 files 설정
		};
	}

}

excelFileEvent();
/*******엑세 업로드 팝업 스크립트 끝********/


// 행 추가 시 관리기관 셀렉트 박스 동기화
function updateGoverAdmOffice(data) {
	console.log("updateGoverAdmOffice 함수 실행 ");
	$("#goverEditSelectBox03 option").remove();
	for (let i = 0; i < data.length; i++) {
		$("#goverEditSelectBox03").append("<option>" + data[i].so_adm_office + "</option>");
	}

	// 커스텀 셀렉트 박스의 버튼들 업데이트(첫 줄)
	const customSelectBtns = $("#goverUl #admOfficeUl01");
	customSelectBtns.empty();
	for (let i = 0; i < data.length; i++) {
		customSelectBtns.append("<li><p>" + data[i].so_adm_office + "</p></li>");
	}

	// 커스텀 셀렉트 박스의 버튼들 업데이트(2개 이상 줄)
	const customSelectBtns02 = $("#goverUl02 #admOfficeUl01");
	customSelectBtns02.empty();
	for (let i = 0; i < data.length; i++) {
		customSelectBtns02.append("<li><p>" + data[i].so_adm_office + "</p></li>");
	}
}

// '소속 토지 정보' 내의 체크박스 클릭 시 다른 체크박스 비활성화
$(document).on("click", ".landAdressInfo input[type=checkbox]", function() {
    console.log("---------소속 토지 정보의 체크박스 클릭됨-------------");
    
    const currentCheckbox = $(this);
    const isChecked = currentCheckbox.is(":checked");

    // '소속 토지 정보' 섹션 내에서만 다른 체크박스들을 비활성화
    if (isChecked) {
        $(".landAdressInfo input[type=checkbox]").not(this).prop("checked", false);
    }

    console.log(`선택된 체크박스: ${currentCheckbox.attr("id")}`);
});

// 행 추가 함수
var index = 1;
function addRow() {
	
	var thisUl=$(this).parent().parent().parent().parent();
	console.log(thisUl);
	var addUl=$("#row-template").html();
	console.log(addUl);

	var addDiv = $('<ul class="contents" id="goverUl">'+addUl+'</ul>');
	addDiv.find("#goverIndex").val(index);
	
	// addKey 값을 'new'로 설정
	addDiv.find("input[name='addKey']").val("new");
	
	console.log($(addDiv).html());
	
	//멀티체크박스 클릭을 위한 조치
	var pipe = addDiv.find('#masterRegSelectBox_');
	pipe.attr({'class':'masterRegSelectBox_'+index,'name' : 'masterRegSelectBox_'+index,'id': 'masterRegSelectBox_'+index});
	var label1 = pipe.closest('li').find('label').first();
	label1.attr({'for': 'masterRegSelectBox_'+index,'name' : 'masterRegSelectBox_'+index});

	// 순번 적용
	addDiv.find('input[readonly]').attr('placeholder', index); // 순번 적용
	index++; // index 값을 증가시켜 다음 버튼에 적용

	$("#goverUlDiv").append(addDiv);

	// 추가된 모든 행에 대해 순번 재할당
	updateRowNumbers();
	
	// 추가된 행에도 관리기관 목록을 동기화
	const selectedPmtOffice = $("#masterEditSelectBox02").val();  // 현재 허가관청의 값
	console.log("selectedPmtOffice: "+selectedPmtOffice);
	if (selectedPmtOffice) {
	    updateGoverAdmOfficeForRow(addDiv, selectedPmtOffice);  // 추가된 행에도 관리기관 목록을 적용
	}
}

// 특정 행에 대해 관리기관 목록 동기화 함수
function updateGoverAdmOfficeForRow(row, selectedPmtOffice) {
    const selectedJisa = $("#masterEditSelectBox01").val();  // 지사 선택된 값
	console.log("selectedJisa: "+selectedJisa);

    if (!selectedPmtOffice || !selectedJisa) return;

    const allData = {
        pmt_office: selectedPmtOffice,
        jisa: selectedJisa
    };

    $.ajax({
        url: "/land/gover/getAdmOffice",  // 관리기관 목록을 가져오는 API
        data: JSON.stringify(allData),
        async: true,
        type: "POST",
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        success: function (rt) {
            const data = rt.resultData;

            // 소속 토지 정보의 관리기관 리스트 초기화 및 업데이트
            const selectBox = row.find("#goverEditSelectBox03");
            selectBox.empty().append("<option value=''>전체</option>");
            for (let i = 0; i < data.length; i++) {
                selectBox.append("<option>" + data[i].so_adm_office + "</option>");
            }

            // 커스텀 셀렉트 박스의 버튼들 업데이트
            const customSelectBtns = row.find("#admOfficeUl01");
            customSelectBtns.empty();
            customSelectBtns.append("<li><p>전체</p></li>");
            for (let i = 0; i < data.length; i++) {
                customSelectBtns.append("<li><p>" + data[i].so_adm_office + "</p></li>");
            }
        },
        error: function (jqXHR, textStatus, errorThrown) {
            console.error("Error: ", textStatus, errorThrown);
        }
    });
}

// 행 삭제 함수
function deleteRow(button) {
  const row = button.closest('.contents');
  row.remove();

  // 삭제 후 남아 있는 모든 행들의 순번을 재할당
  updateRowNumbers(); // 순번 재할당 함수 호출
}

// 모든 행에 대해 순번 업데이트 함수
function updateRowNumbers() {
    const allRows = document.querySelectorAll('.landAdressInfo .depth1 .contents:not([style*="display: none;"])');
    allRows.forEach((row, index) => {
        const seqInput = row.querySelector('input[readonly]');
        if (seqInput) {
            seqInput.setAttribute('placeholder', index + 1);  // 새로운 순번 할당
        }
    });
}

// 관경 표시 설정 함수
function toggleLineDisplay(value) {
  const singleLineDiv = $('.singleLine');
  const doubleLineDiv = $('.doubleLine');
  
  console.log('toggleLineDisplay 함수 호출, value:', value); // 디버깅용 콘솔 로그 추가

  if (value === '단선') {
    singleLineDiv.show();
    doubleLineDiv.hide();
  } else if (value === '복선') {
    singleLineDiv.hide();
    doubleLineDiv.show();
  }
}

// '임시저장' 버튼 클릭 시, 폼 데이터를 로그로 출력
$(document).on("click", "#draftSaveBtn", function() {
	console.log("----masterEdit.js 임시저장 버튼 클릭----")
	console.log($("#saveForm").serialize());
	var formSerializeArray = $('#saveForm').serializeArray(); // 폼 데이터를 직렬화하여 배열로 저장
	console.log(formSerializeArray); // 배열 형태로 폼 데이터 출력

	var object = {}; // 빈 객체 생성
	for (var i = 0; i < formSerializeArray.length; i++) {
		if (formSerializeArray[i]['value'] === '전체' || formSerializeArray[i]['value'] ==='') {
				    continue; // "전체"가 선택된 경우, 해당 파라미터를 넘기지 않음
				}
		object[formSerializeArray[i]['name']] = formSerializeArray[i]['value']; // 배열의 각 항목을 객체로 변환
	}

	// 변경이력 - 기본정보 처리
	var modifyReason1 = getModifyReasonForBasicInfo();
	console.log("----------------modifyReason1--------------");
	console.log(modifyReason1);
	if (modifyReason1 !== "") {
		object.modifyReason1 = modifyReason1;
	}

	// 변경이력 - 허가관청만 처리 (필요 시 별도 함수로 분리 가능)
	var modifyReason5 = compareChanges($("input[name='pmt_office_org']").val(), $("select[name='pmt_office']").val(), "허가관청") +
		compareChanges($("input[name='adm_office_org']").val(), $("select[name='adm_office']").val(), "관리기관");
	if (modifyReason5 !== "") {
		object.modifyReason5 = modifyReason5;
	}
	
	// 소속 토지 정보 변경 이력 처리
	var modifyReason2 = getModifyReasonForLand();
	if (modifyReason2 !== "") {
		console.log("소속토지정보 변경이력 있음: "+ modifyReason2);
    object.modifyReason2 = modifyReason2;
	}

	console.log("대상토지 정보");
	var togiDatas = [];
	var togiUls = $("#goverUlDiv #goverUl,#goverUl02");
	console.log(togiUls);

	/*String SGG_NM = (parser.getString("SGG_NM" + String.valueOf(i), "")).replaceAll("전체", "");
						String EMD_NM = (parser.getString("EMD_NM" + String.valueOf(i), "")).replaceAll("전체", "");
						String RI_NM = (parser.getString("RI_NM" + String.valueOf(i), "")).replaceAll("전체", "");
						String JIBUN = parser.getString("JIBUN" + String.valueOf(i), "");
						String JIBUN_FULL = parser.getString("JIBUN_FULL" + String.valueOf(i), "");
						String ADDRCODE = parser.getString("ADDRCODE" + String.valueOf(i), "");
						String PNU = parser.getString("ChkPNU" + String.valueOf(i), "");
						String ORG_PNU = parser.getString("ORG_PNU" + String.valueOf(i), "");
						String GOVEROWNYN = parser.getString("GOVER_OWN_YN" + String.valueOf(i), "");
						String JIJUK_AREA = parser.getString("JIJUK_AREA" + String.valueOf(i), "");
						String JIMOK_TEXT = parser.getString("JIMOK_TEXT" + String.valueOf(i), "");
						String GOVER_LENGTH = parser.getString("GOVER_LENGTH" + String.valueOf(i), "");
						String GOVER_AREA = parser.getString("GOVER_AREA" + String.valueOf(i), "");
						String ADM_OFFICE_PNU = parser.getString("ADM_OFFICE" + String.valueOf(i), "");
						String USE_PURPOS_PNU = parser.getString("USE_PURPOS" + String.valueOf(i), "");
						String REP_FLAG = parser.getString("REP_FLAG" + String.valueOf(i), "");
						String ORG_PNU_NULL = parser.getString("ORG_PNU_NULL" + String.valueOf(i), ""); // pnu값이
																										// "NULL"도*/
	console.log("-----------------togiuls-----------------");
	for (var i = 0; i < togiUls.length; i++) {
		var sido_nm = $(togiUls[i]).find("input[name='sido_nm']").val();
		var addKey = $(togiUls[i]).find("input[name='addKey']").val();
		var sgg_nm = $(togiUls[i]).find("input[name='sgg_nm']").val();
		var emd_nm = $(togiUls[i]).find("input[name='emd_nm']").val();
		var ri_nm = $(togiUls[i]).find("input[name='ri_nm']").val();
		var jibun = $(togiUls[i]).find("input[name='jibun']").val();
		var jibun_full = $(togiUls[i]).find("input[name='jibun_full']").val();
		var addrcode = $(togiUls[i]).find("input[name='addrcode']").val();
		var pnu = $(togiUls[i]).find("input[name='pnu']").val();
		var org_pnu = $(togiUls[i]).find("input[name='pnu']").val();
		var gover_own_yn = $(togiUls[i]).find("#goverOwnYnBtn").text();
		var jijuk_area = $(togiUls[i]).find("input[name='jijuk_area']").val();
		var gover_length = $(togiUls[i]).find("input[name='gover_length']").val();
		var gover_area = $(togiUls[i]).find("input[name='gover_area']").val();
		var jimok_text = $(togiUls[i]).find("#jimok").text();
		var adm_office = $(togiUls[i]).find("#admOfficeText01").text();
		var pipe_overlab_yn = $(togiUls[i]).find("#pipeOverlapYnBtn").text();
		/*console.log("jimok:"+jimok_text);
					console.log($(togiUls[i]).find("#jimok").parent().html());
		*/
		var rep_flag = "N";
		if ($(togiUls[i]).find("input:checkbox[name='rep_flag']").is(":checked") == true) {
			rep_flag = "Y";
		};

		//console.log("togiManageNo:"+togiManageNo);
		var togiObj = {
			"sido_nm": ljsIsNull(sido_nm) ? '' : sido_nm
			, "sgg_nm": ljsIsNull(sgg_nm) ? '' : sgg_nm
			, "emd_nm": ljsIsNull(emd_nm) ? '' : emd_nm
			, "ri_nm": ljsIsNull(ri_nm) ? '' : ri_nm
			, "jibun_full": ljsIsNull(jibun_full) ? '' : jibun_full
			, "jibun": ljsIsNull(jibun) ? '' : jibun
			, "addrcode": ljsIsNull(addrcode) ? '' : addrcode
			, "pnu": ljsIsNull(pnu) ? '' : pnu
			, "org_pnu": ljsIsNull(org_pnu) ? '' : org_pnu
			, "gover_own_yn": ljsIsNull(gover_own_yn) ? '' : gover_own_yn
			, "jijuk_area": ljsIsNull(jijuk_area) ? '' : jijuk_area
			, "gover_length": ljsIsNull(gover_length) ? '' : gover_length
			, "jimok_text": ljsIsNull(jimok_text) ? '' : jimok_text
			, "adm_office": ljsIsNull(adm_office) ? '' : adm_office
			, "pipe_overlab_yn": ljsIsNull(pipe_overlab_yn) ? '' : pipe_overlab_yn
			, "rep_flag": ljsIsNull(rep_flag) ? 'N' : rep_flag
			, "gover_area": ljsIsNull(gover_area) ? '' : gover_area
			, "addKey": addKey

		}

		console.log(togiObj);
		togiDatas.push(togiObj);
	}

	//첨부파일 <====== 
	//const attachFileUls = document.querySelectorAll('input[name="landRightsRegistration_attachFile"]:checked');
	const attachFileUls = document.querySelectorAll('input[name="masterEdit_attachFile"]');
	console.log(attachFileUls);
	
	var files = new Array();
	
	for (var i = 0; i < attachFileUls.length; i++) {
		//console.log($(attachFileUls[i]).parent().parent().html());
		var fname = $(attachFileUls[i]).parent().parent().find("#filename").val();
		var wdate = $(attachFileUls[i]).parent().parent().find("input[name='registDateWidth']").val();
		console.log(fname);
		console.log("wdate:" + wdate);
		if (wdate == null || wdate == "" || wdate == undefined) files.push(fname);
	}

	console.log("----------togiDatas-------------");
	console.log(togiDatas);
	console.log("----------files-------------");
	console.log(files);
	object.occuprepayyn = $('input[name="occuprepayyn"]').is(':checked') ? 'Y' : 'N';

	object.pipe_name = $("#pipeNameText").text();


	var tobj = $("#newregreasonBtn").text();
	if (tobj == "선택") object.newregreason = "0";
	else if (tobj.trim() == "사유지의 국유지 편입") object.newregreason = "1";
	else if (tobj.trim() == "ILI결과 발견지번") object.newregreason = "2";

	var tobj = $("#occunonpayreasonBtn").text();
	if (tobj == "선택") object.occunonpayreason = "0";
	else if (tobj.trim() == "영구 무상점용") object.occunonpayreason = "1";
	else if (tobj.trim() == "소액 미청구") object.occunonpayreason = "2";
	else if (tobj.trim() == "관할관청의 미청구") object.occunonpayreason = "3";


	object.adm_office = $("#admOfficeText").text();
	object.use_purpos=$("#usePurposBtn").text();
	object.togiDatas = togiDatas;
	object.files = files;
	object.fileCnt = files.length;
	object.office_mobile = "";
	object.save_status = "Q";//임시저장
	object.gubun = "modify"; //신규등록
	
	var json = JSON.stringify(formSerializeArray); // 객체를 JSON 문자열로 변환
	console.log("----------jsonobj------------");
	console.log(object);

	url = "/land/gover/insertGoverMasterDemo";

	$.ajax({

		url: url,
		type: 'POST',
		contentType: "application/json",
		data: JSON.stringify(object),
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
				//console.log("response.resultData length:"+response.resultData.length);
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
	}); // end ajax
});


// 변경이력 비교 함수
function compareChanges(orgValue, newValue, fieldName) {
    // null과 undefined를 빈 문자열로 처리
    orgValue = orgValue === undefined || orgValue === null ? '' : orgValue;
    newValue = newValue === undefined || newValue === null ? '' : newValue;
    console.log("orgValue:"+orgValue);
	console.log("newValue:"+newValue);
	if (orgValue.trim() != newValue.trim() && newValue.trim() != '') {
	    return `${fieldName} 변경 ('${orgValue.trim()}' > '${newValue.trim()}'); `;
	}

    return '';
}


// 기본정보 변경이력 처리 함수
function getModifyReasonForBasicInfo() {
    var modifyReason = '';
console.log("----------------getModifyReasonForBasicInfo--------------------");
var tobj=$("input[name='newregreason_org']").val();
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
var occunonpayreasonNewValue=$("#occunonpayreasonBtn").text();

console.log(newregreasonNewValue);
    modifyReason += compareChanges($("input[name='pmt_office_org']").val(), $("select[name='pmt_office']").val(), "허가관청");
    modifyReason += compareChanges($("input[name='adm_office_org']").val(), $("#admOfficeText").text(), "관리기관");
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
    modifyReason += compareChanges($("input[name='occuprepaydate_org']").val(), $("input[name='occuprepaydate']").val(), "선납기한");
	console.log(modifyReason);
    return modifyReason;
}


// 소속 토지 정보 변경 이력 처리 함수
function getModifyReasonForLand() {
    console.log("-------------소속토지 변경이력 처리 함수 --------------");
    var modifyReason = ''; // 최종적으로 누적된 변경 이력
    
    // 소속 토지 정보에 해당하는 UL 리스트를 가져옴
    const togiUls = $("#goverUlDiv ul.contents");

    console.log(togiUls.html());

    // 각 UL마다 값을 비교하거나 새로운 항목을 추가
    togiUls.each(function(index, ul) {
        const addKey = $(ul).find("input[name='addKey']").val();  // addKey 값을 확인
        const goverIndex = $(ul).find("input[name='goverIndex']").val();  // addKey 값을 확인
				console.log("addKey: " + addKey); // addKey 값이 제대로 들어오는지 확인
				console.log("goverIndex: " + goverIndex); // goverIndex 값이 제대로 들어오는지 확인
				
        /*if (addKey === 'new') {
					if (goverIndex === '0' && $(ul).find("input[name='pnu']").val().length == 0) {
						
					}else {
						
						// 새로운 항목일 경우 변경 이력에 추가
						            var newModifyReason = ''; // 새로운 항목에 대한 변경 이력
						            newModifyReason += "소속 토지 정보 추가: ";
						            newModifyReason += `관리기관: '${$(ul).find("select[name='adm_office']").val() || ''}', `;
						            newModifyReason += `국공유지 여부: '${$(ul).find("select[name='gover_own_yn']").val() || ''}', `;
						            newModifyReason += `대표필지: '${$(ul).find("input[name='rep_flag']").is(":checked") ? 'Y' : 'N'}', `;
						            newModifyReason += `주소: '${$(ul).find("input[name='addr']").val() || ''}', `;
						            newModifyReason += `PNU: '${$(ul).find("input[name='pnu']").val() || ''}', `;
						            newModifyReason += `지목: '${$(ul).find("select[name='jimok_text']").val() || ''}', `;
						            newModifyReason += `점용연장: '${$(ul).find("input[name='gover_length']").val() || ''}', `;
						            newModifyReason += `점용면적: '${$(ul).find("input[name='gover_area']").val() || ''}', `;
						            newModifyReason += `관로일치 여부: '${$(ul).find("select[name='pipe_overlap_yn']").val() || ''}'; `;
						            console.log("newModifyReason: " + newModifyReason);

						            // 기존 modifyReason에 누적
						            modifyReason += newModifyReason;
					}
					
        } else if (addKey === 'add') {*/
            // 기존 값과 새 값을 비교하여 변경 이력 기록
            var addModifyReason = ''; // 기존 항목에 대한 변경 이력
			var admOfficeNewValue=$(ul).find("#admOfficeText01").text();
			var goverOwnYnNewValue=$(ul).find("#goverOwnYnBtn").text();
            addModifyReason += compareChanges($(ul).find("input[name='tadm_office_org']").val() || '', admOfficeNewValue || '', "관리기관");
            addModifyReason += compareChanges($(ul).find("input[name='tgover_own_yn_org']").val() || '', goverOwnYnNewValue || '', "국공유지 여부");
            addModifyReason += compareChanges($(ul).find("input[name='trep_flag_org']").val() || '', $(ul).find("input[name='rep_flag']").is(":checked") ? 'Y' : 'N', "대표필지");
            addModifyReason += compareChanges($(ul).find("input[name='taddr_org']").val() || '', $(ul).find("input[name='addr']").val() || '', "주소");
            addModifyReason += compareChanges($(ul).find("input[name='tpnu_org']").val() || '', $(ul).find("input[name='pnu']").val() || '', "PNU");
            addModifyReason += compareChanges($(ul).find("input[name='tjimok_text_org']").val() || '', $(ul).find("select[name='jimok_text']").val() || '', "지목");
            addModifyReason += compareChanges($(ul).find("input[name='tgover_length_org']").val() || '', $(ul).find("input[name='gover_length']").val() || '', "점용연장");
            addModifyReason += compareChanges($(ul).find("input[name='tgover_area_org']").val() || '', $(ul).find("input[name='gover_area']").val() || '', "점용면적");
            addModifyReason += compareChanges($(ul).find("input[name='tpipe_overlap_yn_org']").val() || '', $(ul).find("select[name='pipe_overlap_yn']").val() || '', "관로일치 여부");
            console.log("addModifyReason: " + addModifyReason);

            // 기존 modifyReason에 누적
            modifyReason += addModifyReason;
        //}
    });

    console.log("최종 modifyReason: " + modifyReason); // 최종 누적된 변경 이력
    return modifyReason;
}


$(document).on("click","#reqApprovalBtn",function(){
	
	console.log("승인요청");
	
	var formSerializeArray = $('#saveForm').serializeArray(); // 폼 데이터를 직렬화하여 배열로 저장
    console.log(formSerializeArray); // 배열 형태로 폼 데이터 출력
    
    var object = {}; // 빈 객체 생성
    for (var i = 0; i < formSerializeArray.length; i++) { 
        object[formSerializeArray[i]['name']] = formSerializeArray[i]['value']; // 배열의 각 항목을 객체로 변환
    }
	
	object.saveStatus="T";
	object.goverNo=object.gover_no;
	console.log(object);
	
	   url="/land/gover/updateGoverSaveStatus"; 
	   $.ajax({
	   			
	   				url:url,
	   				type:'POST',
	   				contentType:"application/json",
	   				data:JSON.stringify(object),
	   				
	   				dataType:"json",
	   				beforeSend:function(request){
	   					console.log("beforesend ........................");
	   					loadingShow();
	   				},
	   				success:function(response){
	   					loadingHide();
	   					console.log(response);
	   					if (response.success="Y"){
	   						console.log("response.success Y");
	   						//console.log("response.resultData length:"+response.resultData.length);
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
	   				error:function(jqXHR,textStatus,errorThrown){
	   					alert("finalBtn ajax error\n"+textStatus+":"+errorThrown);
						return false;
	   				}
	   			
	   		}); 
	
})

// 체크박스 상태 변경 시 점용료 선납 여부 처리
function updateOccuprepayynValue(checkbox) {
	var isChecked = checkbox.checked ? 'Y' : 'N';
	        console.log("Check status:", isChecked);
    const form = checkbox.form;
    
    if (checkbox.checked) {
        checkbox.value = "1";  // 체크된 경우 value는 1
    } else {
        // 체크 해제된 경우 체크박스 value="0"으로 설정
        var hiddenInput = document.createElement('input');
        hiddenInput.type = 'hidden';
        hiddenInput.name = checkbox.name;
        hiddenInput.value = '0';
        form.appendChild(hiddenInput);
    }
}

// 커스텀 selectbox 생성 및 이벤트 바인딩
const createCustomLimasterReg = (parentElement = document) => {
    const contentItems = parentElement.querySelectorAll('.selectContentArea');

    contentItems.forEach(contentItem => {
        const notsetAddSelectBox = contentItem.querySelector('select');
        if (!notsetAddSelectBox) return; // select가 없으면 return

        const customSelectBox = contentItem.querySelector('.customSelectBox');
        const customSelectBtns = customSelectBox.querySelector('.customSelectBtns');

        // 기존 버튼들 제거 후 다시 생성
        customSelectBtns.innerHTML = '';

        for (let i = 0; i < notsetAddSelectBox.length; i++) {
            const optionValue = notsetAddSelectBox.options[i].text;
            const li = document.createElement('li');
            const button = document.createElement('button');
            button.classList.add('moreSelectBtn');
            button.type = 'button';
            button.textContent = optionValue;
            li.appendChild(button);
            customSelectBtns.appendChild(li);
        }

        // 셀렉트 박스 보기 버튼 이벤트 바인딩
        customSelectBox.querySelector('.customSelectView').addEventListener('click', function() {
            this.classList.toggle('active');
            customSelectBtns.classList.toggle('active');
        });

        // 리스트 클릭 시 선택한 값으로 변경하는 이벤트 바인딩
        customSelectBtns.querySelectorAll('.moreSelectBtn').forEach((moreBtn) => {
            moreBtn.addEventListener('click', function() {
                const selectedValue = moreBtn.textContent;
                const parentSelectBox = customSelectBox.querySelector('.customSelectView');
                
                // 선택한 값으로 셀렉트 박스의 텍스트 변경
                parentSelectBox.textContent = selectedValue;
                notsetAddSelectBox.value = selectedValue;

                // 선택한 후 셀렉트 박스 비활성화
                customSelectBox.querySelector('.customSelectBtns').classList.remove('active');
                parentSelectBox.classList.remove('active');

                // 만약 단/복선 선택 박스(masterRegSelectBox06)일 경우 toggleLineDisplay 호출
                if (notsetAddSelectBox.id === 'masterEditSelectBox06') {
                    toggleLineDisplay(selectedValue);
                }
            });
        });
    });
};

//createCustomLimasterReg();

// 동적으로 추가된 요소에 이벤트를 바인딩하는 방법
$(document).on('click', '.customSelectView', function() {
    // 버튼 클릭 시 실행할 코드
    $(this).toggleClass('active');

    if ($(this).next()) {
        $(this).next().toggleClass('active');

    }
});

// .moreSelectBtn 요소에 대한 클릭 이벤트 등록
$(document).on('click', '.moreSelectBtn', function() {
    var moreSelectBtnText = $(this).text();

    const parentMoreSelectBtn = $(this).closest('.customSelectBtns');
    const EditCustomViewBtn = parentMoreSelectBtn.prev('.customSelectView');

//    // EditCustomViewBtn의 모든 자식을 제거
    EditCustomViewBtn.empty();
//
//    // 새로운 텍스트 노드를 추가합니다.
    EditCustomViewBtn.text(moreSelectBtnText);
//
    EditCustomViewBtn.removeClass('active');
    parentMoreSelectBtn.removeClass('active');
//
//    // 선택한 걸 select의 value값으로 변경하기
    const nearByContent = $(this).closest('.selectContentArea');
    const nearBySelectBox = nearByContent.find('select');
    nearBySelectBox.val(moreSelectBtnText);
	//$(nearBySelectBox).val()
    console.log(`Selected value: ${nearBySelectBox.val()}`);
});


const customSelectView = document.querySelectorAll('.customSelectView')

customSelectView.forEach((btn) => {
    btn.addEventListener('click', function () {
        btn.classList.toggle('active');

        if (btn.nextElementSibling) {
            btn.nextElementSibling.classList.toggle('active');

        }
    })
})


// customSelectBtns 리스트 click 했을 때 해당 내용으로 바뀌게하기

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

        // masterRegSelectBox06의 값이 변경될 때에만 스타일 변경(단/복선 선택에 따른 관경 변경)
        const lineValue = document.getElementById('masterRegSelectBox06');

        if (nearBySelectBox === lineValue) {
            const singleLine = document.querySelector('#masterReg .lineWrap .singleLine');
            const doubleLine = document.querySelector('#masterReg .lineWrap .doubleLine');

            if (lineValue.value == '단선') {
                doubleLine.style.display = 'none';
                singleLine.style.display = 'block';
            } else if (lineValue.value == '복선') {
                singleLine.style.display = 'none';
                doubleLine.style.display = 'flex';
            }
        }
    })
})

// 첨부파일 전체 선택 체크박스
const allCheckEventMasterEdit = () => {

    // 첨부파일 리스트들
    const attachFiles = document.querySelectorAll('input[name="masterEdit_attachFile"]');
    // checked가 된 첨부파일 리스트
    const clickedAttachFiles = document.querySelectorAll('input[name="masterEdit_attachFile"]:checked');
    // 전체선택 input
    const clickedAllinput = document.querySelector('input[name="masterEdit_file_select_all"]');

    // 전체선택되게 하기
    clickedAllinput.addEventListener('click', function () {
        clickedSelectAllMasterEdit(clickedAllinput);
    })
    // 개당 선택시 전체 선택되게하기
    attachFiles.forEach((checkList) => {
        checkList.addEventListener('click', function () {

            clickCheckBoxEventMasterEdit(checkList);
        })
    })

    // 개별 리스트 클릭시 전체로 변하기
    function clickCheckBoxEventMasterEdit() {
        // 최신으로 업데이트 해주기
        const clickedAttachFiles = document.querySelectorAll('input[name="masterEdit_attachFile"]:checked');

        if (attachFiles.length === clickedAttachFiles.length) {
            clickedAllinput.checked = true;
        } else {
            clickedAllinput.checked = false;
        }
    }

    // 전체선택 클릭시 
    function clickedSelectAllMasterEdit(clickedAllinput) {
        const attachFiles = document.querySelectorAll('input[name="masterEdit_attachFile"]');

        attachFiles.forEach((checkbox) => {
            checkbox.checked = clickedAllinput.checked;
        })
    }
}

allCheckEventMasterEdit();


// 첨부파일 선택파일 삭제 기능
$(document).on("click","#deleteFileBtn",function(){
	//const attachFiles = document.querySelectorAll('input:checkbox[name="landRightsRegistration_attachFile"]:checked');
	/*$('input:checkbox[name=landRightsRegistration_attachFile]').each(function (index) {
		if($(this).is(":checked")==true){
	    	console.log($(this).val());
	    }
	})*/
	
	var delFiles=[];
	const clickedAttachFiles = document.querySelectorAll('input[name="masterEdit_attachFile"]:checked');

	console.log(clickedAttachFiles);
	console.log(uploadFiles);
	
	for(var i = 0 ; i < clickedAttachFiles.length ; i++){
		var delEle=$(clickedAttachFiles[i]).closest("#fileListUl");
		
		//console.log($(clickedAttachFiles[i]).closest("#fileListUl").html());
		
		var delfileName = $(clickedAttachFiles[i]).closest("#fileListUl").find("#filename").val();
		
		var idx = $(clickedAttachFiles[i]).closest("#fileListUl").find("#idx").val();
		var ids = {
			"gover_no" : $("#gover_no").val(),
			"idx" : $(clickedAttachFiles[i]).closest("#fileListUl").find("#idx").val(),
			"filename" : $(clickedAttachFiles[i]).closest("#fileListUl").find("#filename").val()
		};
		
		console.log(delfileName);
		console.log(idx);
		
		/*var data={"delfile":delFileName,"idx":idx}
				delFiles.push(data);*/
		if (idx!=null && idx!="" && idx!=undefined) {
			delFiles.push(ids);
		}
		//$(delEle).remove();
	}
	
	console.log(delFiles);
	
	var param={
		"fileIds":delFiles
	};
	
	console.log(param);
	
	if (delFiles.length > 0){
		url = "/land/gover/deleteGoverAtcfile1";
		$.ajax({
			url: url,
			type: 'POST',
			contentType: "application/json",
			data: JSON.stringify(param),
			dataType: "json",
			beforeSend: function(request) {
				console.log("beforesend ........................");
				loadingShow();
			},
			success: function(response) {
				
				if(response.result) {
					alert(response.resultMessage);
					$(delEle).remove();
				} else {
					alert(response.resultMessage);
				}
				loadingHide();
				
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
			error: function(jqXHR, textStatus, errorThrown) {
				alert("deleteFileBtn ajax error\n" + textStatus + ":" + errorThrown);
				return false;
			}
		});
			
	}
	
	
	
	//$('#searchResultPopDiv').replaceWith();
	
	
	
	
	
	
	
	
	
	
})

/* 손지민 2024-10-01 - 허가관청 이력보기 팝업 -- 상단에 대체 코드 있음. 이 코드 사용 안 함. */
const masterEditChangeHistoryOpenEvet = () => {
	const masterEditHistoryBtn = document.querySelector("#masterEdit .masterEditHistoryBtn");
	const masterEditChangeHistoryWrapper = document.querySelector(".masterEditChangeHistoryWrapper");
	let masterEditHistoryPath = '/components/popuphtml/changehistoryPopup.html'; //변경이력

	if (masterEditHistoryBtn) {

		let xhr = new XMLHttpRequest();
		xhr.open('GET', masterEditHistoryPath, true);
		xhr.onreadystatechange = function() {
			if (xhr.readyState == 4 && xhr.status == 200) {
				masterEditChangeHistoryWrapper.innerHTML = xhr.responseText;
				runScriptsInElement(masterEditChangeHistoryWrapper); // 삽입된 html내 스크립트 실행 함수 호출
			}
		};
		xhr.send();
		console.log('masterEditChangeHistoryWrapper 작동');
		masterEditHistoryBtn.addEventListener("click", () => {

			const popupOpen = document.getElementById("changehistoryPopup");
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
// masterEditChangeHistoryOpenEvet();

/* 엑셀팝업불러오기 */
const masterEditExcelPopOpenEvet = () => {

    const masterEditExcelPopBtn = document.querySelector(".masterEditExcelPopBtn");
    const masterEditExcelPopWrapper = document.querySelector(".masterEditExcelPopWrapper");
    let masterEditExcelFilePath = '/components/popuphtml/exceluploadPopup.html'; // 엑셀업로드

    if(masterEditExcelPopBtn){

       let xhr = new XMLHttpRequest();
       xhr.open('GET', masterEditExcelFilePath, true);
       xhr.onreadystatechange = function() {
           if (xhr.readyState == 4 && xhr.status == 200) {
               masterEditExcelPopWrapper.innerHTML = xhr.responseText;
               runScriptsInElement(masterEditExcelPopWrapper); // 삽입된 html내 스크립트 실행 함수 호출
           }
       };
       xhr.send();
       console.log('masterEditExcelPopWrapper 작동');
       masterEditExcelPopBtn.addEventListener("click" , () => {
       
           const popupOpen = document.getElementById("exceluploadPopup");
           console.log(popupOpen)
           if(popupOpen){

               popupOpen.classList.add("active");
           }

       })

   // 삽입된 html내 스크립트 실행 함수
   const runScriptsInElement = (element) => {
       const scripts = element.getElementsByTagName('script');
       for (let i = 0; i < scripts.length; i++) {
           const script = document.createElement('script');
           console.log(script);
           script.textContent = scripts[i].textContent;
           document.body.appendChild(script).parentNode.removeChild(script);
       }
   }


    }
}
// 주석 풀면 첨부파일 선택창이 한번 더 열리는 오류
// masterEditExcelPopOpenEvet();

// 선택된 버튼 값이 select 박스의 값으로 동기화되도록 JavaScript를 추가합니다.
document.querySelectorAll('.moreSelectBtn').forEach(button => {
    button.addEventListener('click', function() {
        var selectedValue = button.textContent;
        
        // 버튼에 선택된 값 표시
        var customSelectViewBtn = button.closest('.customSelectBox').querySelector('.customSelectView');
        customSelectViewBtn.textContent = selectedValue;

        // 숨겨진 select 태그의 값 업데이트
        var selectBox = button.closest('.selectContentArea').querySelector('select');
        selectBox.value = selectedValue;
    });
});


// 주소 검색 버튼 클릭 시
$(document).on("click",".searchAddressBtn",function(){
	
	console.log($(this).parent().parent().html());
	var idObj=$(this).parent().parent().find("#addr");
	//var id=$(this).parent().parent().find("#goverIndex").val();
	
	// 여기서 #notWriteInput의 placeholder 값을 id로 사용
    var id = $(this).parent().parent().find(".notWriteInput").attr("placeholder");
		
	console.log(idObj.val()); 
	console.log(id);
	
	var addr=idObj.val();
	var datas={"address":addr}
	console.log($(this).parent().html());
	console.log(datas);
  
	//searchResultPopDiv 화면뿌릴 DIV
	if (addr==null || addr=="" || addr==undefined) {
	  alert("주소를 입력해주세요.");
	  return;
	}
				 
	$.ajax({
		// jisang API 기능 동일하여 사용
	  url: "/land/jisang/getBunhalJIjukSelect",
   	  type: "POST",
   	  data: datas,
	})
	.done(function (fragment) {
	// var buttonIdx = fragment.find('button#choiceBtn');
	// buttonIdx.attr('data-index', buttonId);
	 console.log("***fragment***");
	 console.log(fragment);
      $('#searchResultPopDiv').replaceWith(fragment);
	  const popupOpen = document.querySelector("#searchResultsPopup .popupWrap");
            console.log($(popupOpen).html());
	  	   $(popupOpen).addClass("open");
	  	   popupOpen.classList.add("active");
    	 $('.resultSelectBtn').attr('data-index', id);
       	$('.saveBtn').attr('data-index', id);
   	});

});

// 주소 선택 클릭
$(document).on("click",".resultSelectBtn",function(){
	var id =  $('.resultSelectBtn').data('index');
	
	console.log("***클릭된 id*** : " + id);
	console.log($(this).parent().parent().html());
	var pnu=$(this).parent().parent().find(".popContent01").html();
	var juso=$(this).parent().parent().find(".popContent02").html();	
	var jibun=$(this).parent().parent().find(".popContent03").html();
    var sido_nm=$(this).parent().parent().find(".popContent0201").html();
	var sgg_nm=$(this).parent().parent().find(".popContent0202").html();
	var emd_nm=$(this).parent().parent().find(".popContent0203").html();
	var ri_nm=$(this).parent().parent().find(".popContent0204").html();
	var addrcode=$(this).parent().parent().find(".popContent0205").html();
	var jibun_full=$(this).parent().parent().find(".popContent0206").html();
	var jimok=$(this).parent().parent().find(".popContent05").html();
    var x = $(this).parent().parent().find("input[name=x]").val();
    var y = $(this).parent().parent().find("input[name=y]").val();
	
	console.log("pnu: " + pnu);
	console.log("juso: " + juso);
	console.log("jimok: " + jimok);
	
	var openerEle=$("#goverUlDiv");
	//	console.log($(openerEle).html());
	// var openerTargetEle=openerEle.find('input[id="goverIndex"][value="'+id+'"]');
	var openerTargetEle = openerEle.find('input[placeholder="' + id + '"]');
	console.log(openerTargetEle.parent().parent().html());
	
	openerTargetEle.parent().parent().find("#pnu").val(pnu);
	openerTargetEle.parent().parent().find("#addr").val(juso);
	openerTargetEle.parent().parent().find("#sido_nm").val(sido_nm);
	openerTargetEle.parent().parent().find("#sgg_nm").val(sgg_nm);
	openerTargetEle.parent().parent().find("#emd_nm").val(emd_nm);
	openerTargetEle.parent().parent().find("#ri_nm").val(ri_nm);
	openerTargetEle.parent().parent().find("#jibun").val(jibun);
	openerTargetEle.parent().parent().find("#jibun_full").val(jibun_full);
	openerTargetEle.parent().parent().find("#addrcode").val(addrcode);
    openerTargetEle.parent().parent().find("input[name=x]").val(x);
    openerTargetEle.parent().parent().find("input[name=y").val(y);
	
	// 지목 값 select 박스에 반영
	var jimokSelectBox = openerTargetEle.parent().parent().find("#jimok");
	jimokSelectBox.val(jimok); // 지목 값을 select 박스에 설정

	// customSelectBox 버튼에도 선택된 값 반영
	var customSelectView = openerTargetEle.parent().parent().find("#jimok");
	customSelectView.text(jimok); // 선택된 지목 값을 customSelectView에 표시
	
/*	$(".bunhalAddres_" + id).attr("readonly", true);
	$(".bunhalAddres_"+id).val(sido_nm+" "+sgg_nm + " " + emd_nm +" " +ri_nm  + " " + jibun);*/
	
	// 팝업 닫기
	$(".popupWrap").removeClass("active");
})

const PopupFinalBtns =  document.querySelectorAll('.popupWrap .lastBtnBox .finalBtn');

PopupFinalBtns.forEach((button) => {
    button.addEventListener('click',function(){
        const PopupWrap = button.closest('.popupWrap');
        button.classList.toggle("active");
        PopupWrap.classList.toggle('active');
    })
})

// x 버튼 click시 팝업 사라지게
const topCloseBtn = document.querySelectorAll('.popupWrap .topCloseBtn');
if(topCloseBtn){
    topCloseBtn.forEach((topClosebutton) => {
        topClosebutton.addEventListener('click',function(){
            const PopupWrap = topClosebutton.closest('.popupWrap');
            PopupWrap.classList.remove("active");
        })
    })
}

// pnu없이 선택
$(document).on("click",".saveBtn",function(){
    var id =  $('.saveBtn').data('index');
    $(".bunhalAddres_" + id).val("");
	$(".bunhalAddres_" + id).removeAttr("readonly");

	var targetDiv=$("#searchResultPopDiv").parent().find("#searchResultPopup").find(".popupWrap");
	$(".popupWrap").removeClass("active");
    console.log(id);

});

// x 버튼 클릭 시 팝업 닫기
$(document).on("click",".topCloseBtn",function(){

	var targetDiv=$("#searchResultPopDiv").parent().find("#searchResultPopup").find(".popupWrap");
	$(".popupWrap").removeClass("active");
//	$(".popupWrap").toggleClass("active");
});

function openMap(el) {
    // el.parentElement.parentElement.querySelector('input[name=x]').value
    var x = el.parentElement.parentElement.querySelector('input[name=x]').value;
    var y = el.parentElement.parentElement.querySelector('input[name=y]').value;
    moveToCityHall(x, y);
}

/***************** */
//종섭 추가
function attachFileDownload(filePath, fileName, fileJisangNo, fileSeq, fileGubun) {
	commonFileDownload(filePath, fileName, fileJisangNo, fileSeq, fileGubun);
}

function selectFilesDownload() {
	const attachFileCount = $("#fileListDiv").children().length;
	const listObj = $("#fileListDiv").children();
	let pathList = [];
	
	
	for(let i = 0 ; i < attachFileCount ; i++) {
		let checkYn = $(listObj[i].children[0].children).is(':checked');
		
		if(checkYn) {
			pathList.push($(listObj[i].children[3].children).attr('data-info'));
			
			let fileInfo = $(listObj[i].children[3].children).attr('data-info');
			let fileInfoObj = queryValueToObject(fileInfo);
			
			commonFileDownload(fileInfoObj.ga_file_path, fileInfoObj.ga_file_nm, fileInfoObj.ga_gover_no, fileInfoObj.ga_file_seq, 'gover');
			
		}
	}
}

/***************** */