var uploadFiles=new Array();
// 초기화 시 모든 줄에 대해 함수 실행
$(document).ready(function() {
    console.log("gover/masterReg.js start");

    // 단/복선 초기화 및 관경 설정
    const sunGubunValue = $('#masterRegSelectBox06').val() || '단선'; // 값이 없으면 '단선'으로 설정
    toggleLineDisplay(sunGubunValue);

    // 단/복선 선택이 변경될 때마다 관경 설정
    $('#masterRegSelectBox06').on('change', function() {
        const selectedValue = $(this).val();
        toggleLineDisplay(selectedValue);
    });

    // 모든 셀렉트 박스에 대해 커스텀 셀렉트 박스 초기화 실행
    createCustomLimasterReg();  // 페이지가 로드될 때 초기화
	
	// 소속 토지 정보의 행 추가 버튼 비활성화 초기화
	$(".addBtn").prop("disabled", true);
	
	// 지사 선택 시 허가관청, 관로명 목록 업데이트를 위한 change 트리거
	 $(document).on("click", "#jisaUl li", function () {
	     const selectedJisa = $(this).text().trim();
	     $("#jisaText").text(selectedJisa);
	     $("#masterRegSelectBox01").val(selectedJisa).change(); // change 이벤트 트리거
	 });
	 
	 // 지사 선택에 따른 관로명 목록 업데이트
     $(document).on("change", "#masterRegSelectBox01", function () {
         const selectedJisa = $("#masterRegSelectBox01").val();
         if (!selectedJisa) return;

         const allData = { jisa: selectedJisa };

         $.ajax({
             url: "/gover/getPipeName", // 허가관청 목록을 가져오는 API
             data: JSON.stringify(allData),
             async: true,
             type: "POST",
             dataType: "json",
             contentType: "application/json; charset=utf-8",
             success: function (rt) {
                 const data = rt.resultData;

                 // 허가관청 리스트 초기화 및 업데이트
                 $("#pipeNameUl li").remove();
                 $("#masterRegSelectBox05 option").remove();
                 $("#pipeNameUl").append("<li><p>전체</p></li>");
                 $("#masterRegSelectBox05").append("<option value=''>전체</option>");
                 for (let i = 0; i < data.length; i++) {
                     $("#pipeNameUl").append("<li><p>" + data[i].jzn_zone_name + "</p></li>");
                     $("#masterRegSelectBox05").append("<option>" + data[i].jzn_zone_name + "</option>");
                 }
             },
             error: function (jqXHR, textStatus, errorThrown) {
                 console.error("Error: ", textStatus, errorThrown);
             }
         });
     });
	 
	 // 관리기관 선택 (선택 후 추가적인 동작이 필요하다면 이곳에 추가)
 	 $(document).on("click", "#pipeNameUl li", function () {
 	     const selectedAdmOffice = $(this).text().trim();
 	     $("#pipeNameText").text(selectedAdmOffice);
 	 });
	 
	 // 지사 선택에 따른 허가관청 목록 업데이트
      $(document).on("change", "#masterRegSelectBox01", function () {
          const selectedJisa = $("#masterRegSelectBox01").val();
          if (!selectedJisa) return;

          const allData = { jisa: selectedJisa };

          $.ajax({
              url: "/gover/getPmtOffice", // 허가관청 목록을 가져오는 API
              data: JSON.stringify(allData),
              async: true,
              type: "POST",
              dataType: "json",
              contentType: "application/json; charset=utf-8",
              success: function (rt) {
                  const data = rt.resultData;
				  
                  // 허가관청 리스트 초기화 및 업데이트
                  $("#pmtOfficeUl li").remove();
                  $("#masterRegSelectBox02 option").remove();
                  $("#pmtOfficeUl").append("<li><p>전체</p></li>");
                  $("#masterRegSelectBox02").append("<option value=''>전체</option>");
                  for (let i = 0; i < data.length; i++) {
                      $("#pmtOfficeUl").append("<li><p>" + data[i].so_pmt_office + "</p></li>");
                      $("#masterRegSelectBox02").append("<option>" + data[i].so_pmt_office + "</option>");
                  }

                  // 허가관청과 관리기관 선택을 활성화
                  checkEnableAddBtn();
              },
              error: function (jqXHR, textStatus, errorThrown) {
                  console.error("Error: ", textStatus, errorThrown);
              }
          });
      });
	 
	 // 허가관청 선택 시 관리기관 목록 업데이트
	 $(document).on("click", "#pmtOfficeUl li", function () {
	     const selectedPmtOffice = $(this).text().trim();
	     $("#pmtOfficeText").text(selectedPmtOffice);
	     $("#masterRegSelectBox02").val(selectedPmtOffice).change(); // change 이벤트 트리거
	 });
	 
	 // 허가관청 선택 시 관리기관 목록 업데이트
     $(document).on("change", "#masterRegSelectBox02", function () {
         const selectedPmtOffice = $("#masterRegSelectBox02").val();
         const selectedJisa = $("#masterRegSelectBox01").val(); // 지사 선택된 값

         if (!selectedPmtOffice || !selectedJisa) return;

         const allData = {
             pmt_office: selectedPmtOffice,
             jisa: selectedJisa
         };

         $.ajax({
             url: "/gover/getAdmOffice", // 관리기관 목록을 가져오는 API
             data: JSON.stringify(allData),
             async: true,
             type: "POST",
             dataType: "json",
             contentType: "application/json; charset=utf-8",
             success: function (rt) {
                 const data = rt.resultData;

                 // 관리기관 리스트 초기화 및 업데이트 (기본 정보)
                 $("#admOfficeUl li").remove();
                 $("#masterRegSelectBox03 option").remove();
                 $("#admOfficeUl").append("<li><p>전체</p></li>");
                 $("#masterRegSelectBox03").append("<option value=''>전체</option>");
                 for (let i = 0; i < data.length; i++) {
                     $("#admOfficeUl").append("<li><p>" + data[i].so_adm_office + "</p></li>");
                     $("#masterRegSelectBox03").append("<option>" + data[i].so_adm_office + "</option>");
                 }

                 // 관리기관 리스트 소속 토지 정보에도 업데이트
                 updateGoverAdmOffice(data);

                 // 허가관청과 관리기관 선택을 활성화
                 checkEnableAddBtn();
             },
             error: function (jqXHR, textStatus, errorThrown) {
                 console.error("Error: ", textStatus, errorThrown);
             }
         });
     });

     // 행 추가 시 관리기관 셀렉트 박스 동기화
     function updateGoverAdmOffice(data) {
         $("#goverRegSelectBox03 option").remove();
         $("#goverRegSelectBox03").append("<option value=''>전체</option>");
         for (let i = 0; i < data.length; i++) {
             $("#goverRegSelectBox03").append("<option>" + data[i].so_adm_office + "</option>");
         }

         // 커스텀 셀렉트 박스의 버튼들 업데이트
         const customSelectBtns = $("#goverUl #admOfficeUl01");
         customSelectBtns.empty();
         customSelectBtns.append("<li><p>전체</p></li>");
         for (let i = 0; i < data.length; i++) {
             customSelectBtns.append("<li><p>" + data[i].so_adm_office + "</p></li>");
         }
     }
	 
	 // 관리기관 선택 (선택 후 추가적인 동작이 필요하다면 이곳에 추가)
	 $(document).on("click", "#admOfficeUl li", function () {
	     const selectedAdmOffice = $(this).text().trim();
	     $("#admOfficeText").text(selectedAdmOffice);
	     $("#masterRegSelectBox03").val(selectedAdmOffice).change(); // change 이벤트 트리거
	 });
	 
	 // 소속 토지 정보의 관리기관 선택 (동적으로 추가된 요소에도 적용)
	 $(document).on("click", "#goverUl .customSelectBtns li", function () {
	     const selectedAdmOffice = $(this).text().trim();
	     const parentUl = $(this).closest("ul");
	     const targetSelectBox = parentUl.siblings(".hiddenSelectBox").find("select");

	     // 선택한 관리기관 값을 반영
	     parentUl.siblings(".customSelectView").text(selectedAdmOffice);
	     targetSelectBox.val(selectedAdmOffice).change();  // change 이벤트 트리거
	 });

     // 지사와 허가관청 선택 후 추가 버튼 활성화
     function checkEnableAddBtn() {
         const selectedJisa = $("#masterRegSelectBox01").val();
         const selectedPmtOffice = $("#masterRegSelectBox02").val();

         // 지사와 허가관청이 모두 선택되었을 때만 추가 버튼 활성화
         if (selectedJisa && selectedPmtOffice) {
             $(".addBtn").prop("disabled", false);
         } else {
             $(".addBtn").prop("disabled", true);
         }
     }
	 
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
    
	var rowCount=0;
    function handleFileUpload(files,obj) {
		console.log("-------------handleFileUpload---------------");
		console.log(files);
       for (var i = 0; i < files.length; i++) { // 선택된 파일들을 하나씩 처리
            var fd = new FormData(); // FormData 객체 생성 (파일 업로드를 위한 객체)
            fd.append('file', files[i]); // 파일 객체를 FormData에 추가
     		
            var status = new createStatusbar($("#fileTitleUl"),files[i].name,files[i].size,rowCount); // 파일 업로드 상태바 생성
            sendFileToServer(fd,status); // 서버로 파일 전송 함수 호출
			
			rowCount++; // 파일이 추가될 때마다 rowCount를 증가시켜 고유한 id를 유지
       }
    }

	// Status bar 생성 함수
    function createStatusbar(obj,name,size,no){
		console.log("----------start createStatusBar------------");
        console.log(obj.html());
		
		var sizeStr="";
        var sizeKB = size/1024; // 파일 크기를 문자열로 표시하기 위한 변수
        if(parseInt(sizeKB) > 1024){
            var sizeMB = sizeKB/1024;
            sizeStr = sizeMB.toFixed(2)+" MB"; // MB로 변환
        }else{
            sizeStr = sizeKB.toFixed(2)+" KB"; // KB로 표시
        }
		
        var row='<ul class="contents" id="fileListUl">';
		row+='<li class="content01 content checkboxWrap">';
		row+='<input type="checkbox" id="landRightsRegistration_attachFile'+no+'" name="landRightsRegistration_attachFile" >';
		row+='<label for="landRightsRegistration_attachFile'+no+'"></label>';
		row+='</li>';
		row+='<li class="content02 content"><input type="text" id="filename" placeholder="'+name+'" class="notWriteInput" readonly></li></ul>';
        obj.after(row); // 파일 목록이 있는 DOM 요소 뒤에 파일 정보를 추가
		
		var radio=$(row).find('input'); // row에서 input 요소를 찾음
		console.log("---------------radio checkbox----------");
		$(radio).find('input').attr("disabled",false); // 체크박스가 비활성화되지 않도록 설정
     	console.log($(radio).parent().html());
    }
	                
    function sendFileToServer(formData,status)
    {
        var uploadURL = "/gover/fileUpload/post"; //Upload URL
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
	
	// 소속 토지 정보의 행 추가 버튼 비활성화 초기화
	$(".addBtn").prop("disabled", true);
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
    clickedAllinput.addEventListener('click', function () {
        clickedSelectAllLandRightsRegist(clickedAllinput);
    })
    // 개당 선택시 전체 선택되게하기
    attachFiles.forEach((checkList) => {
        checkList.addEventListener('click', function () {

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
$(document).on("click","#deleteFileBtn",function(){
	//const attachFiles = document.querySelectorAll('input:checkbox[name="landRightsRegistration_attachFile"]:checked');
	/*$('input:checkbox[name=landRightsRegistration_attachFile]').each(function (index) {
		if($(this).is(":checked")==true){
	    	console.log($(this).val());
	    }
	})*/
	const clickedAttachFiles = document.querySelectorAll('input[name="landRightsRegistration_attachFile"]:checked');
	console.log(clickedAttachFiles);
	console.log(uploadFiles);
	for(var i=0;i<clickedAttachFiles.length;i++){
		var delEle=$(clickedAttachFiles[i]).closest("#fileListUl");
		console.log($(clickedAttachFiles[i]).closest("#fileListUl").html());
		$(delEle).remove();

	}
})

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
	const selectedPmtOffice = $("#masterRegSelectBox02").val();  // 현재 허가관청의 값
	if (selectedPmtOffice) {
	    updateGoverAdmOfficeForRow(addDiv, selectedPmtOffice);  // 추가된 행에도 관리기관 목록을 적용
	}
}

// 특정 행에 대해 관리기관 목록 동기화 함수
function updateGoverAdmOfficeForRow(row, selectedPmtOffice) {
    const selectedJisa = $("#masterRegSelectBox01").val();  // 지사 선택된 값

    if (!selectedPmtOffice || !selectedJisa) return;

    const allData = {
        pmt_office: selectedPmtOffice,
        jisa: selectedJisa
    };

    $.ajax({
        url: "/gover/getAdmOffice",  // 관리기관 목록을 가져오는 API
        data: JSON.stringify(allData),
        async: true,
        type: "POST",
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        success: function (rt) {
            const data = rt.resultData;

            // 소속 토지 정보의 관리기관 리스트 초기화 및 업데이트
            const selectBox = row.find("#goverRegSelectBox03");
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

// ID와 Name 업데이트 함수
function updateIdsAndNames(row, index) {
    row.querySelectorAll("input, select, label").forEach((element) => {
        const originalId = element.getAttribute("id");
        const originalName = element.getAttribute("name");

        if (originalId) {
            element.setAttribute("id", originalId + "_" + index);
        }
        if (originalName) {
            element.setAttribute("name", originalName + "_" + index);
        }

        const forAttribute = element.getAttribute("for");
        if (forAttribute) {
            element.setAttribute("for", forAttribute + "_" + index);
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
	console.log("----masterReg.js 임시저장 버튼 클릭----")
	console.log($("#saveForm").serialize());
    var formSerializeArray = $('#saveForm').serializeArray(); // 폼 데이터를 직렬화하여 배열로 저장
    console.log(formSerializeArray); // 배열 형태로 폼 데이터 출력
    
	var object = {};
	for (var i = 0; i < formSerializeArray.length; i++){
		if (formSerializeArray[i]['value'] === '전체') {
		    continue; // "전체"가 선택된 경우, 해당 파라미터를 넘기지 않음
		}
		object[formSerializeArray[i]['name']] = formSerializeArray[i]['value'];
	}
    
    var json = JSON.stringify(formSerializeArray); // 객체를 JSON 문자열로 변환
    console.log("----------jsonobj------------");
    console.log(json); // JSON 문자열 출력
});

// '승인요청' 버튼 클릭 시, 폼 데이터를 로그로 출력
$(document).on("click", "#requestBtn", function() {
	console.log("----masterReg.js 승인요청 버튼 클릭----")
	console.log($("#saveForm").serialize());
    var formSerializeArray = $('#saveForm').serializeArray(); // 폼 데이터를 직렬화하여 배열로 저장
    console.log(formSerializeArray); // 배열 형태로 폼 데이터 출력
    
    var object = {}; // 빈 객체 생성
    for (var i = 0; i < formSerializeArray.length; i++) { 
        object[formSerializeArray[i]['name']] = formSerializeArray[i]['value']; // 배열의 각 항목을 객체로 변환
    }
    
    var json = JSON.stringify(formSerializeArray); // 객체를 JSON 문자열로 변환
    console.log("----------jsonobj------------");
    console.log(json); // JSON 문자열 출력
});

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
            const optionValue = notsetAddSelectBox.options[i].value;
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
                if (notsetAddSelectBox.id === 'masterRegSelectBox06') {
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

    // EditCustomViewBtn의 모든 자식을 제거
    EditCustomViewBtn.empty();

    // 새로운 텍스트 노드를 추가합니다.
    EditCustomViewBtn.text(moreSelectBtnText);

    EditCustomViewBtn.removeClass('active');
    parentMoreSelectBtn.removeClass('active');

    // 선택한 걸 select의 value값으로 변경하기
    const nearByContent = $(this).closest('.selectContentArea');
    const nearBySelectBox = nearByContent.find('select');
    nearBySelectBox.val(moreSelectBtnText);
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

// **파일 첨부 기능 추가**
/*const masterRegFileEvent = () => {
    // 파일 입력 요소를 가져옴
    const masterReg_myPcFiles = document.getElementById('masterReg_myPcFiles');
    
    // masterReg_myPcFiles 요소가 존재하지 않으면 함수를 종료
    if (!masterReg_myPcFiles) {
        console.error("파일 첨부 요소를 찾을 수 없습니다.");
        return;
    }

    // 나머지 코드 - 요소가 존재할 경우만 실행
    const attachFileInfo = masterReg_myPcFiles.closest('.attachFileInfo');
    const fileUploadAfter = attachFileInfo.querySelector('.fileUploadAfter');
    const fileSaveBtn = attachFileInfo.querySelector('.fileSaveBtn');
    let fileInfoName = '';
    let fileInfoSize = '';
    let fileInfoType = '';

    masterReg_myPcFiles.addEventListener('change', function () {
        const existContents = fileUploadAfter.querySelectorAll('.contents');
        existContents.forEach((list) => list.remove());

        if (masterReg_myPcFiles.files.length > 0) {
            for (let i = 0; i <= masterReg_myPcFiles.files.length - 1; i++) {
                const file = masterReg_myPcFiles.files[i];
                fileInfoName = file.name;
                fileInfoSize = byteTransform(file.size);
                fileInfoType = file.type;

                const listBox = `
                <li class="btnbox"><button class="fileDeleteBtn"></button></li>
                <li class="content filenameBox">
                  <figure class="typeIcon"></figure><p class="fileNameText">${fileInfoName}</p>
                </li>
                <li class="content"><p>-</p></li>
                <li class="content"><p class="fileSizeText">${fileInfoSize}</p></li>
                `;
                
                const contentsUl = document.createElement('ul');
                contentsUl.classList.add('contents');
                contentsUl.innerHTML = listBox;
                fileUploadAfter.appendChild(contentsUl);
            }

            defaultFileUploadWrap.forEach((wrap) => wrap.classList.remove('active'));
            defaultFileUploadWrap[1].classList.add('active');
            fileSaveBtn.classList.add('active');
        } else {
            resetFileInput();
        }
    });

    // 파일 삭제 처리 함수
    const removeFile = (fileNameToRemove) => {
        const filesArray = Array.from(masterReg_myPcFiles.files);
        const newDataTransfer = new DataTransfer();
        filesArray.forEach(file => {
            if (file.name !== fileNameToRemove) newDataTransfer.items.add(file);
        });
        masterReg_myPcFiles.files = newDataTransfer.files;
    };

    fileUploadAfter.addEventListener('click', (event) => {
        if (event.target.classList.contains('fileDeleteBtn')) {
            const nearbyContents = event.target.closest('.contents');
            const fileNameToRemove = nearbyContents.querySelector('.fileNameText').textContent;
            removeFile(fileNameToRemove);
            nearbyContents.remove();
            if (masterReg_myPcFiles.files.length === 0) resetFileInput();
        }
    });

    function resetFileInput() {
        masterReg_myPcFiles.value = '';
        defaultFileUploadWrap.forEach((wrap) => wrap.classList.remove('active'));
        defaultFileUploadWrap[0].classList.add('active');
        fileSaveBtn.classList.remove('active');
    }

    function byteTransform(bytes) {
        const dataSize = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
        const d = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)), 10);
        return `${(bytes / (1024 ** d)).toFixed(1)} ${dataSize[d]}`;
    }
}*/
//masterRegFileEvent();

// **검색 팝업 기능 추가**
const masterRegOpenPopUp = () => {
    const masterRegSearchBtn = document.querySelectorAll("#masterReg .searchAddressBtn");
    const masterRegSearchPop = document.querySelector(".masterRegSearchPopWrapper");
    const masterRegResultFilePath = '/components/popuphtml/searchResultsPopup.html';

    if (masterRegSearchBtn) {
        let xhr = new XMLHttpRequest();
        xhr.open('GET', masterRegResultFilePath, true);
        xhr.onreadystatechange = function () {
            if (xhr.readyState == 4 && xhr.status == 200) {
                masterRegSearchPop.innerHTML = xhr.responseText;
                runScriptsInElement(masterRegSearchPop);
            }
        };
        xhr.send();
        console.log('masterRegResultPop 작동');

        masterRegSearchBtn.forEach((btn) => {
            btn.addEventListener("click", () => {
                const popupOpen = document.querySelector("#searchResultsPopup .popupWrap");
                popupOpen.classList.add("active");
            });
        });
    }

    const runScriptsInElement = (element) => {
        const scripts = element.getElementsByTagName('script');
        for (let i = 0; i < scripts.length; i++) {
            const script = document.createElement('script');
            script.textContent = scripts[i].textContent;
            document.body.appendChild(script).parentNode.removeChild(script);
        }
    };
}
//masterRegOpenPopUp();

/* 엑셀팝업불러오기 */

const ExcelPopOpenEvet = () => {

     const ExcelPopBtn = document.querySelector(".ExcelPopBtn");
     const masterRegExcelPopWrapper = document.querySelector(".masterRegExcelPopWrapper");
     let htmlFilePath = '/components/popuphtml/exceluploadPopup.html'; // 엑셀업로드

     if(ExcelPopBtn){

        let xhr = new XMLHttpRequest();
        xhr.open('GET', htmlFilePath, true);
        xhr.onreadystatechange = function() {
            if (xhr.readyState == 4 && xhr.status == 200) {
                masterRegExcelPopWrapper.innerHTML = xhr.responseText;
                runScriptsInElement(masterRegExcelPopWrapper); // 삽입된 html내 스크립트 실행 함수 호출
            }
        };
        xhr.send();
        console.log('masterRegExcelPopWrapper 작동');
        ExcelPopBtn.addEventListener("click" , () => {
        
            const popupOpen = document.getElementById("exceluploadPopup");
            if(popupOpen){

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

// 활성화 시 첨부파일 드래그 구역 클릭 시 파일 선택 창 두 번 열리는 오류 발생
// ExcelPopOpenEvet();

// 주소 검색 버튼 클릭 시
$(document).on("click",".searchAddressBtn",function(){
	
	console.log($(this).parent().parent().html());
	var idObj=$(this).parent().parent().find("#addr");
	var id=$(this).parent().parent().find("#goverIndex").val();
		
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
	  url: "/jisang/getBunhalJIjukSelect",
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
	var jimok=$(this).parent().parent().find(".popContent05").html();
	
	console.log("pnu: " + pnu);
	console.log("juso: " + juso);
	console.log("jimok: " + jimok);
	
	var openerEle=$("#goverUlDiv");
	//	console.log($(openerEle).html());
	var openerTargetEle=openerEle.find('input[id="goverIndex"][value="'+id+'"]');
	//console.log(openerTargetEle.parent().parent().html());
	
	openerTargetEle.parent().parent().find("#pnu").val(pnu);
	openerTargetEle.parent().parent().find("#addr").val(juso);
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
