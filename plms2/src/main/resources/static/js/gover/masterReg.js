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
             url: "/land/gover/getPipeName", // 허가관청 목록을 가져오는 API
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
              url: "/land/gover/getPmtOffice", // 허가관청 목록을 가져오는 API
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
             url: "/land/gover/getAdmOffice", // 관리기관 목록을 가져오는 API
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
	var objDragAndDropExcel = $(".popfileUploadBox");
	
	// 드래그 앤 드롭 영역에 파일이 들어왔을 때
	$(".fileUploadBox").on("dragenter", function(e) {
	    e.stopPropagation();
	    e.preventDefault();
	    $(this).css('border', '2px solid #0B85A1');
	});
	
	// 드래그 앤 드롭 영역에 파일이 들어왔을 때
	$(".popfileUploadBox").on("dragenter", function(e) {
	    e.stopPropagation();
	    e.preventDefault();
	    $(this).css('border', '2px solid #0B85A1');
	});

	// 드래그 앤 드롭 영역에서 파일을 드래그할 때
	$(".fileUploadBox").on("dragover", function(e) {
	    e.stopPropagation();
	    e.preventDefault();
	});
	
	// 드래그 앤 드롭 영역에서 파일을 드래그할 때
		$(".popfileUploadBox").on("dragover", function(e) {
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
	// 파일을 드롭할 때
		$(".popfileUploadBox").on("drop", function(e) {
		    e.preventDefault();
		    $(this).css('border', '2px dotted #0B85A1');
		
		    var files = e.originalEvent.dataTransfer.files; // 드래그한 파일 객체를 가져옴
		    handleFileUploadExcel(files, $(this));  // 파일 처리 함수 호출*/
		});

	// 드래그 앤 드롭 영역을 클릭하면 파일 선택창을 띄움
	objDragAndDrop.on('click', function(e) {
		console.log("---------------- 파일 클릭 트리거 ---------------");
	    if (!e.isTrigger) {  // 이 조건문은 이 이벤트가 수동 트리거된 경우를 방지합니다.
	        $('input[type=file][name=fileUpload]').trigger('click'); // 파일 선택 창을 띄우는 트리거
	    }
	});
	
	// 드래그 앤 드롭 영역을 클릭하면 파일 선택창을 띄움
		objDragAndDropExcel.on('click', function(e) {
			console.log("---------------- 파일 클릭 트리거 ---------------");
		    if (!e.isTrigger) {  // 이 조건문은 이 이벤트가 수동 트리거된 경우를 방지합니다.
		        $('input[type=file][name=excelPopup_file]').trigger('click'); // 파일 선택 창을 띄우는 트리거
		    }
		});
	
	 
	$('input[type=file][name="fileUpload"]').on('change', function(e) {
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
	
	/*function handleFileUploadExcel(files,obj) {
			console.log("-------------handleExcelFileUpload---------------");
			console.log(files);
	       for (var i = 0; i < files.length; i++) { // 선택된 파일들을 하나씩 처리
	            var fd = new FormData(); // FormData 객체 생성 (파일 업로드를 위한 객체)
	            fd.append('file', files[i]); // 파일 객체를 FormData에 추가
	     		
	            var status = new createStatusbar($("#fileTitleUl"),files[i].name,files[i].size,rowCount); // 파일 업로드 상태바 생성
	            sendFileToServer(fd,status); // 서버로 파일 전송 함수 호출
				for (let i = 0; i <= excelPopup_myPcFiles.files.length - 1; i++) {
					
				}
				rowCount++; // 파일이 추가될 때마다 rowCount를 증가시켜 고유한 id를 유지
	       }
	    }*/
	
		/*excelPopup_myPcFiles.addEventListener('change', function (e) {

					
					
					
					
					
					
					
					
					
					
					
					
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
			      })*/

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

function addRowExcel(obj) {
	console.log("-------------addrowExcel-----------");
		console.log(obj);
	
	var thisUl=$(this).parent().parent().parent().parent();
	//console.log(thisUl);
	var addUl=$("#row-template").html();
	
    
	//addUl.find()
	
	
	
	
	var addDiv = $('<ul class="contents" id="goverUl">'+addUl+'</ul>');
	
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
        url: "/land/gover/getAdmOffice",  // 관리기관 목록을 가져오는 API
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
		if (formSerializeArray[i]['value'] === '전체' || formSerializeArray[i]['value'] ==='') {
		    continue; // "전체"가 선택된 경우, 해당 파라미터를 넘기지 않음
		}
		object[formSerializeArray[i]['name']] = formSerializeArray[i]['value'];
	}
    
	
	console.log("대상토지 정보");
	   	var togiDatas=[];
	   	var togiUls=$("#goverUlDiv #goverUl");
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
	   	for(var i=0;i<togiUls.length;i++){
			var sido_nm=$(togiUls[i]).find("input[name='sido_nm']").val();
	   		var sgg_nm=$(togiUls[i]).find("input[name='sgg_nm']").val();
			var emd_nm=$(togiUls[i]).find("input[name='emd_nm']").val();
			var ri_nm=$(togiUls[i]).find("input[name='ri_nm']").val();
			var jibun=$(togiUls[i]).find("input[name='jibun']").val();
			var jibun_full=$(togiUls[i]).find("input[name='jibun_full']").val();
			var addrcode=$(togiUls[i]).find("input[name='addrcode']").val();
			var pnu=$(togiUls[i]).find("input[name='pnu']").val();
			var org_pnu=$(togiUls[i]).find("input[name='pnu']").val();
			var gover_own_yn=$(togiUls[i]).find("input[name='gover_own_yn']").val();
			var jijuk_area=$(togiUls[i]).find("input[name='jijuk_area']").val();
			var gover_length=$(togiUls[i]).find("input[name='gover_length']").val();
			var gover_area=$(togiUls[i]).find("input[name='gover_area']").val();
			var jimok_text=$(togiUls[i]).find("input[name='jimok_text']").val();
			if (jimok_text==null || jimok_text=="" ) jimok_text=$(togiUls[i]).find("#jimok").text();
			var adm_office=$(togiUls[i]).find("input[name='adm_office']").val();
			if (adm_office==null || adm_office=="" ) adm_office=$(togiUls[i]).find("#admOfficeBtn").text();
			var pipe_overlab_yn=$(togiUls[i]).find("input[name='pipe_overlap_yn']").val();
			if (pipe_overlab_yn==null || pipe_overlab_yn=="" ) pipe_overlab_yn=$(togiUls[i]).find("#pipeOverlapYnBtn").text();
			
			
	   		
			var rep_flag="N";
			if ($(togiUls[i]).find("input:checkbox[name='rep_flag']").is(":checked")==true){
				rep_flag="Y";
			};
			
	   		//console.log("togiManageNo:"+togiManageNo);
	   		var togiObj={
				"sido_nm":ljsIsNull(sido_nm)?'':sido_nm
				,"sgg_nm":ljsIsNull(sgg_nm)?'':sgg_nm
				,"emd_nm":ljsIsNull(emd_nm)?'':emd_nm
				,"ri_nm":ljsIsNull(ri_nm)?'':ri_nm
				,"jibun_full":ljsIsNull(jibun_full)?'':jibun_full
				,"jibun":ljsIsNull(jibun)?'':jibun
				,"addrcode":ljsIsNull(addrcode)?'':addrcode
				,"pnu":ljsIsNull(pnu)?'':pnu
				,"org_pnu":ljsIsNull(org_pnu)?'':org_pnu
				,"gover_own_yn":ljsIsNull(gover_own_yn)?'':gover_own_yn
				,"jijuk_area":ljsIsNull(jijuk_area)?'':jijuk_area
				,"gover_length":ljsIsNull(gover_length)?'':gover_length
				,"jimok_text":ljsIsNull(jimok_text)?'':jimok_text
				,"adm_office":ljsIsNull(adm_office)?'':adm_office
				,"pipe_overlab_yn":ljsIsNull(pipe_overlab_yn)?'':pipe_overlab_yn
				,"rep_flag":ljsIsNull(rep_flag)?'N':rep_flag
				,"gover_area":ljsIsNull(gover_area)?'':gover_area
				,"addKey":''
	   			
	   		}
	   		console.log(togiObj);
	   		togiDatas.push(togiObj);
	   	}
		
		//const attachFileUls = document.querySelectorAll('input[name="landRightsRegistration_attachFile"]:checked');
		const attachFileUls = document.querySelectorAll('input[name="landRightsRegistration_attachFile"]');
						   console.log(attachFileUls);
		
		var files=new Array();
					   for(var i=0;i<attachFileUls.length;i++){
						console.log($(attachFileUls[i]).parent().parent().html());
							var fname=$(attachFileUls[i]).parent().parent().find("#filename").attr('placeholder');
							console.log(fname);
							files.push(fname);
						}
	   
	     console.log("----------togiDatas-------------");
		 console.log(togiDatas);
		 console.log("----------files-------------");
		 	 console.log(files);
		 //pipe_name이 안들어와서 한번더 체크
		 if (!object.hasOwnProperty("pipe_name")) {
		     object.pipe_name = $("#pipeNameText").text();
		 }
		 if (!object.hasOwnProperty("newregreason")) {
		 		 		     var tobj = $("#newregreasonBtn").text();
		 					 if (tobj=="선택") object.newregreason="0";
		 					 else if (tobj.trim()=="사유지의 국유지 편입") object.newregreason="1";
		 					 else if (tobj.trim()=="ILI결과 발견지번") object.newregreason="2";
		 					
		 		 }
		 if (!object.hasOwnProperty("occunonpayreason")) {
		 		     var tobj = $("#occunonpayreasonBtn").text();
					 if (tobj=="선택") object.occunonpayreason="0";
					 else if (tobj.trim()=="영구 무상점용") object.occunonpayreason="1";
					 else if (tobj.trim()=="소액 미청구") object.occunonpayreason="2";
					 else if (tobj.trim()=="관할관청의 미청구") object.occunonpayreason="3";
		 }
	 	  object.occuprepayyn=$('input[name="occuprepayyn"]').is(':checked') ? 'Y' : 'N';
		 object.togiDatas=togiDatas;
		 object.files=files;
		 object.fileCnt=files.length;
		 
		 object.office_mobile="";
		 object.save_status="Q";
			object.gubun="insert"; //신규등록
		
	
	
    var json = JSON.stringify(formSerializeArray); // 객체를 JSON 문자열로 변환
    console.log("----------jsonobj------------");
    //console.log(json); // JSON 문자열 출력

	console.log(object);

	url="/land/gover/insertGoverMasterDemo"; 
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
	
	
	
});

// '승인요청' 버튼 클릭 시, 폼 데이터를 로그로 출력
$(document).on("click", "#requestBtn", function() {
	console.log("승인요청");
	var formSerializeArray = $('#saveForm').serializeArray(); // 폼 데이터를 직렬화하여 배열로 저장
	  console.log(formSerializeArray); // 배열 형태로 폼 데이터 출력
	  
	var object = {};
	for (var i = 0; i < formSerializeArray.length; i++){
		if (formSerializeArray[i]['value'] === '전체') {
		    continue; // "전체"가 선택된 경우, 해당 파라미터를 넘기지 않음
		}
		object[formSerializeArray[i]['name']] = formSerializeArray[i]['value'];
	}
	  

	console.log("대상토지 정보");
	   	var togiDatas=[];
	   	var togiUls=$("#goverUlDiv #goverUl");
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
	   	for(var i=0;i<togiUls.length;i++){
			var sido_nm=$(togiUls[i]).find("input[name='sido_nm']").val();
	   		var sgg_nm=$(togiUls[i]).find("input[name='sgg_nm']").val();
			var emd_nm=$(togiUls[i]).find("input[name='emd_nm']").val();
			var ri_nm=$(togiUls[i]).find("input[name='ri_nm']").val();
			var jibun=$(togiUls[i]).find("input[name='jibun']").val();
			var jibun_full=$(togiUls[i]).find("input[name='jibun_full']").val();
			var addrcode=$(togiUls[i]).find("input[name='addrcode']").val();
			var pnu=$(togiUls[i]).find("input[name='pnu']").val();
			var org_pnu=$(togiUls[i]).find("input[name='pnu']").val();
			var gover_own_yn=$(togiUls[i]).find("input[name='gover_own_yn']").val();
			var jijuk_area=$(togiUls[i]).find("input[name='jijuk_area']").val();
			var gover_length=$(togiUls[i]).find("input[name='gover_length']").val();
			var gover_area=$(togiUls[i]).find("input[name='gover_area']").val();
			var jimok_text=$(togiUls[i]).find("input[name='jimok_text']").val();
			var adm_office=$(togiUls[i]).find("input[name='adm_office']").val();
			var pipe_overlab_yn=$(togiUls[i]).find("input[name='pipe_overlap_yn']").val();
			
			
	   		
			var rep_flag="N";
			if ($(togiUls[i]).find("input:checkbox[name='rep_flag']").is(":checked")==true){
				rep_flag="Y";
			};
			
	   		//console.log("togiManageNo:"+togiManageNo);
	   		var togiObj={
				"sido_nm":ljsIsNull(sido_nm)?'':sido_nm
				,"sgg_nm":ljsIsNull(sgg_nm)?'':sgg_nm
				,"emd_nm":ljsIsNull(emd_nm)?'':emd_nm
				,"ri_nm":ljsIsNull(ri_nm)?'':ri_nm
				,"jibun_full":ljsIsNull(jibun_full)?'':jibun_full
				,"jibun":ljsIsNull(jibun)?'':jibun
				,"addrcode":ljsIsNull(addrcode)?'':addrcode
				,"pnu":ljsIsNull(pnu)?'':pnu
				,"org_pnu":ljsIsNull(org_pnu)?'':org_pnu
				,"gover_own_yn":ljsIsNull(gover_own_yn)?'':gover_own_yn
				,"jijuk_area":ljsIsNull(jijuk_area)?'':jijuk_area
				,"gover_length":ljsIsNull(gover_length)?'':gover_length
				,"jimok_text":ljsIsNull(jimok_text)?'':jimok_text
				,"adm_office":ljsIsNull(adm_office)?'':adm_office
				,"pipe_overlab_yn":ljsIsNull(pipe_overlab_yn)?'':pipe_overlab_yn
				,"rep_flag":ljsIsNull(rep_flag)?'N':rep_flag
				,"gover_area":ljsIsNull(gover_area)?'':gover_area
				,"addKey":''
	   			
	   		}
	   		console.log(togiObj);
	   		togiDatas.push(togiObj);
	   	}
		
		//const attachFileUls = document.querySelectorAll('input[name="landRightsRegistration_attachFile"]:checked');
		const attachFileUls = document.querySelectorAll('input[name="landRightsRegistration_attachFile"]');
						   console.log(attachFileUls);
		
		var files=new Array();
					   for(var i=0;i<attachFileUls.length;i++){
						console.log($(attachFileUls[i]).parent().parent().html());
							var fname=$(attachFileUls[i]).parent().parent().find("#filename").attr('placeholder');
							console.log(fname);
							files.push(fname);
						}
	   
	     console.log("----------togiDatas-------------");
		 console.log(togiDatas);
		 console.log("----------files-------------");
		 	 console.log(files);
			 
		 object.togiDatas=togiDatas;
		 object.files=files;
		 object.fileCnt=files.length;
		 object.office_mobile="";
		 object.save_status="T";
			object.gubun="insert"; //승인요청
		


	  var json = JSON.stringify(formSerializeArray); // 객체를 JSON 문자열로 변환
	  console.log("----------jsonobj------------");
	  //console.log(json); // JSON 문자열 출력

	console.log(object);
	//url="/land/gover/insertGoverMaster"; //실제 임시저장
	url="/land/gover/insertGoverMasterDemo";  //상신완료 된걸로 저장 테스트용
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
				$(notsetAddSelectBox).val(selectedValue);

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
     let htmlFilePath = '/land/gover/exceluploadPopup'; // 엑셀업로드

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
 //ExcelPopOpenEvet();

 $(document).on("click",".ExcelPopBtn",function(){
	console.log("-----------ExcelPopBtn------------");
	const popupOpen1 = document.querySelector("#exceluploadPopup");
	            console.log($(popupOpen1).html());
	
	            if(popupOpen1){
				console.log("=====================");
	                //popupOpen1.classList.add("active");
					$(popupOpen1).addClass("open");
					  	   popupOpen1.classList.add("active");
	            }
 });

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
	  url: "/land/jisang/getBunhalJIjukSelect1",
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
	
	console.log("pnu: " + pnu);
	console.log("juso: " + juso);
	console.log("jimok: " + jimok);
	
	var openerEle=$("#goverUlDiv");
	//	console.log($(openerEle).html());
	var openerTargetEle=openerEle.find('input[id="goverIndex"][value="'+id+'"]');
	//console.log(openerTargetEle.parent().parent().html());
	
	openerTargetEle.parent().parent().find("#pnu").val(pnu);
	openerTargetEle.parent().parent().find("#addr").val(juso);
	openerTargetEle.parent().parent().find("#sido_nm").val(sido_nm);
	openerTargetEle.parent().parent().find("#sgg_nm").val(sgg_nm);
	openerTargetEle.parent().parent().find("#emd_nm").val(emd_nm);
	openerTargetEle.parent().parent().find("#ri_nm").val(ri_nm);
	openerTargetEle.parent().parent().find("#jibun").val(jibun);
	openerTargetEle.parent().parent().find("#jibun_full").val(jibun_full);
	openerTargetEle.parent().parent().find("#addrcode").val(addrcode);
	
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


// 엑셀 팝업 닫기 버튼 클릭 시 팝업 닫기
$(document).ready(function () {
  $('.excelbtnWrap .closeBtn').on('click', function () {
    $('#exceluploadPopup').removeClass('active'); // 팝업을 닫음
  });
});


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

//첨부파일 - 다운로드 스크립트
function downloadFile(filePath, fileName) {
	const url = `/api/download?filePath=${filePath}&fileName=${encodeURIComponent(fileName)}`;
	//  const url = `/api/download?filePath=${filePath}&fileName=${fileName}`;
	console.log(url);
	window.open(url, '_blank');  // 새 창이나 새 탭에서 파일 다운로드
}



function downloadExcel() {
	
	
				var uls=$("#goverUlDiv #goverUl");
				
				console.log(uls);
				var data1=[];
				
				 var rowTitle=['관리기관','국공유지여부','대표필지','주소','PNU','지목','점용연장','점용면적','관료일치여부'];
				 data1.push(rowTitle);
				for(var i=0;i<uls.length;i++){
					
					console.log($(uls[i]).html());
					var adm_office=$(uls[i]).find("#admOfficeBtn").text();
					var gover_own_yn=$(uls[i]).find("#goverOwnYnBtn").text();
					var rep_flag=$(uls[i]).find("input[type='checkbox']").is(":checked");
					console.log($(uls[i]).find("input[type='checkbox']").parent().html());
					var addr=$(uls[i]).find("#addr").val();
					var pnu=$(uls[i]).find("#pnu").val();
					var jimok_text=$(uls[i]).find("#jimok").val();
					var gover_length=$(uls[i]).find("input[name='gover_length']").val();
					var gover_area=$(uls[i]).find("input[name='gover_area']").val();
					var pipe_overlap_yn=$(uls[i]).find("#pipeOverlapYnBtn").text();
					var rep_text="";
					if (rep_flag) rep_text="O";
					else rep_text="X";
					console.log(rep_flag);
					var rowData=[adm_office,gover_own_yn,rep_text,addr,pnu,jimok_text,gover_length,gover_area,pipe_overlap_yn];
					 
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
		

		
	$(document).on("change","#my_file_input",function(e){
		
		
		
	});


	$(document).on("click","#excelUpload",function(){
		
		console.log("----------------excelUpload click-------------");
		
		
						 var fileInput = $("#excelPopup_file")[0]; //input file 객체를 가져온다.
						 var file=fileInput.files[0]
						console.log(file);
						if (!file) {
						                    alert("Please select an Excel file first.");
						                    return;
						                }
					    var i,f;
					    var headers;
					    var EXCEL_JSON;
					
					  
					        f = file;
							
					        var reader = new FileReader(); //FileReader를 생성한다.         
					        
					        //성공적으로 읽기 동작이 완료된 경우 실행되는 이벤트 핸들러를 설정한다.
					        reader.onload = function(e) {
					             
					          // ...엑셀파일을 읽어서 처리하는 로직...
					           var data = e.target.result; //FileReader 결과 데이터(컨텐츠)를 가져온다.
					 
					           //바이너리 형태로 엑셀파일을 읽는다.
					           var workbook = XLSX.read(data, {type: 'binary'});
					           var worksheet=workbook.Sheets[workbook.SheetNames[0]];
					           /* var i=0;
					           for (var cell in worksheet) {
					        	    if (worksheet.hasOwnProperty(cell) && cell[0] !== '!') { // 메타데이터 제외
					        	        worksheet[cell].t = 's'; // 셀 타입을 무조건 텍스트('s')로 설정
					        		}
					           } */
					           
					           EXCEL_JSON = XLSX.utils.sheet_to_json(worksheet,{raw:false,cellDates:false});
					           //엑셀파일의 시트 정보를 읽어서 JSON 형태로 변환한다.
					            workbook.SheetNames.forEach(function(item, index, array) {
								    headers=get_header_row(workbook.Sheets[item]);
								   console.log(headers);
								   /* console.log(item);
								   console.log(index);
								   console.log(array);
								   
					               EXCEL_JSON = XLSX.utils.sheet_to_json(workbook.Sheets[item]);
					              console.log(EXCEL_JSON); */
					              	
					           });//end. forEach */
					           
					           //excel 내용 header와 비교해서 공백이라 안넘어온 header 빈정보 삽입
					            for(j=0;j<headers.length;j++){
								  		for(jj=0;jj<EXCEL_JSON.length;jj++){
											  
											  if (!EXCEL_JSON[jj].hasOwnProperty(headers[j])){
												  
											//	console.log(jj+"="+headers[j]);
												/* 
												if (!isDate(EXCEL_JSON[jj].JIBUN)){
													console.log(jj+":"+EXCEL_JSON[jj].JIBUN);
												} */
												EXCEL_JSON[jj][headers[j]]="";  
											  }
										  }	
							   		}
					           console.log(EXCEL_JSON);
					
							   for(var i=0;i<EXCEL_JSON.length;i++){
							   			if (i==0){
											var openerEle=$("#goverUlDiv");
											var openerTargetEle=openerEle.find('input[id="goverIndex"][value="0"]');
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
											
										}
							   			else addRowExcel(EXCEL_JSON[i]);
							   	}
					}
					
					
					reader.readAsBinaryString(f);
					
					
					
					
				
		
	})
	

	function get_header_row(sheet) {
	    var headers = [];
	    var range = XLSX.utils.decode_range(sheet['!ref']);
	    var C, R = range.s.r; /* start in the first row */
	    /* walk every column in the range */
	    for(C = range.s.c; C <= range.e.c; ++C) {
	        var cell = sheet[XLSX.utils.encode_cell({c:C, r:R})] /* find the cell in the first row */

	        var hdr = "UNKNOWN " + C; // <-- replace with your desired default 
	        if(cell && cell.t) hdr = XLSX.utils.format_cell(cell);

	        headers.push(hdr);
	    }
	    return headers;
	}

	
	  //x버튼, 닫기, 승인요청 클릭시 팝업클로즈
	 const exceluploadPopupOpen = document.getElementById("exceluploadPopup");
	 if( exceluploadPopupOpen){
	  exceluploadPopupOpen.querySelectorAll(".topCloseBtn").forEach(function (btn) {
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

	      excelPopup_myPcFiles.addEventListener('change', function (e) {

			
			
			
			
			
			
			
			
			
			
			
			
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
	      popfileUploadAfterWrap.addEventListener('click', function (event) {
	        if (event.target.classList.contains('popfileDeleteBtn')) {
	          const popfileDeleteBtns = popfileUploadAfterWrap.querySelectorAll('.popfileDeleteBtn');
	          const popfileDelBtn = event.target;
	          const popnearbyContents = event.target.closest('.popcontents');
	          const popfileNameToRemove = popnearbyContents.querySelector('.popfileNameText').textContent;

	          // 파일명이랑 틀린 것만 저장하는 함수
	          removeFileforPop(popfileNameToRemove);
	          popnearbyContents.remove();

	          for (let b = 0; b<excelPopup_myPcFiles.files.length ; b++) {
	            console.log('현재 input[type=file]의 files name: ' + excelPopup_myPcFiles.files[b].name);
	          }

	          console.log('남은 파일의 개수:'+excelPopup_myPcFiles.files.length);

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

	      popallDeleteFileBtn.addEventListener('click', function () {

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
