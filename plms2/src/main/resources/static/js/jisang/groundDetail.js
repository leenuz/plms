var mapWindow;
var uploadFiles = new Array();
$(document).on("click","#moveMap",function(){
	//openMapWindow();
	// mapWindow = window.open('', 'mapWindow', 'width=2000,height=1000');
	// moveToCityHall();

	openMapWindow({'lon':mapCoordLng, 'lat':mapCoordLat});
})

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
	objDragAndDrop.on('click', function(e) {
		console.log("---------------- 파일 클릭 트리거 ---------------");
    $('input[type=file]').trigger('click'); // 파일 선택 창을 띄우는 트리거
	});
	 
	$('input[type=file]').on('change', function(e) {
		console.log("-------------change 이벤트 트리거");
	    var files = e.originalEvent.target.files; // 파일 선택창에서 선택된 파일들
	    handleFileUpload(files, objDragAndDrop);  // 선택된 파일들을 처리하는 함수 호출
	});
    
	var rowCount = document.querySelectorAll("#fileListDiv > ul").length + 1;  // 현재 렌더된 파일 개수 계산
	function handleFileUpload(files, obj) {
		console.log("-------------handleFileUpload---------------");
		console.log(files);
		for (var i = 0; i < files.length; i++) { // 선택된 파일들을 하나씩 처리
			var fd = new FormData(); // FormData 객체 생성 (파일 업로드를 위한 객체)
			fd.append('file', files[i]); // 파일 객체를 FormData에 추가

			// var status = new createStatusbar($("#fileTitleUl"),files[i].name,files[i].size,rowCount); // 파일 업로드 상태바 생성
			var status = new createStatusbar($("#fileListDiv"), files[i].name, files[i].size, rowCount); // 파일 업로드 상태바 생성
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
		row += '<li class="selectWidth content checkboxWrap">';
		row += '<input type="checkbox" id="masterEdit_attachFile' + no + '" name="masterEdit_attachFile" >';
		row += '<label for="masterEdit_attachFile' + no + '"></label>';
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
	const clickedAttachFiles = document.querySelectorAll('input[name="masterEdit_attachFile"]:checked');
	console.log(clickedAttachFiles);
	console.log(uploadFiles);
	for(var i=0;i<clickedAttachFiles.length;i++){
		var delEle=$(clickedAttachFiles[i]).closest("#fileListUl");
		console.log($(clickedAttachFiles[i]).closest("#fileListUl").html());
		$(delEle).remove();

	}
})


$(document).on("click",".bunhalBtn",function(){
     const urlParams = new URL(location.href).searchParams;
      const idx = urlParams.get('idx');
      const index = urlParams.get('index');
       const js_idx = urlParams.get('js_idx');
	  url = "/jisang/divisionRegister?idx=" + idx + "&index=" + index + "&js_idx=" + js_idx ;
      window.location = url;
});

// 첨부파일 저장 버튼
$(document).on("click","#fileSaveBtn",function(){
	console.log("--------------start fileSaveBtn---------");
	console.log(uploadFiles);
	//console.log($("#uploadForm").serialize());
	/*var files=$("input[name='fileUpload']")[0].files;
	for(var i=0;i<files.length;i++){
		console.log("filename:"+files[i].name);
	}*/
	var manage_no=$("#manage_no").val();
		if (manage_no==null || manage_no=="undefined"){
			alert("지상권 관리 번호를 찾을수 없습니다.");
			return;
		}
		console.log(uploadFiles.length);
		if (uploadFiles.length<1){
			alert("첨부파일이 없습니다.");
					return;
		}
	var params={"manage_no":$("#manage_no").val(),"pnu":$("#pnu").val(),"files":uploadFiles};
	url="/api/pnuAtcUpload";
	$.ajax({
			
				url:url,
				type:'POST',
				contentType:"application/json",
				data:JSON.stringify(params),
				
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
						console.log("response.resultData length:"+response.resultData.length);
						/*$("#popup_bg").show();
						$("#popup").show(500);
						//$("#addrPopupLayer tbody td").remove();
						for(var i=0;i<response.resultData.length;i++){
							$("#addrPopupTable tbody").append("<tr><td>"+response.resultData[i].juso+"</td><td><button>선택</button></td></tr>");
						}*/
						console.log(params);
						//$("#pnuAtcFilesDiv").replaceWith()
						uploadFiles=[];
						$("#fileListDiv div").remove();
						$("#fileListDiv").append("<div id='flist'></div>");
						$.ajax({
						       url: "/jisang/getAtcFileData",
						       type: "POST",
						       data: params,
						   })
						   .done(function (fragment) {
						       $('#pnuAtcFilesDiv').replaceWith(fragment);
						   });
					}
					else {
						console.log("response.success N");
					}
				},
				error:function(jqXHR,textStatus,errorThrown){
					alert("getAddressData ajax error\n"+textStatus+":"+errorThrown);
				}
			
		})
	
});

//필지 첨부파일 관련 이벤트
document.addEventListener("DOMContentLoaded", function() {
    const deleteSelectedBtn = document.getElementById("deleteSelectedBtn");

    // 체크박스 클릭 이벤트 처리
    document.querySelectorAll('.file-checkbox').forEach(checkbox => {
        checkbox.addEventListener('change', function() {
            // 체크박스 상태에 따른 추가 로직이 필요하다면 여기에 작성
            console.log(`Checkbox with value ${this.value} is ${this.checked ? 'checked' : 'unchecked'}`);
        });
    });

    /*// 선택파일 삭제 버튼 클릭 이벤트 처리
    deleteSelectedBtn.addEventListener('click', function() {
        // 선택된 체크박스 값 가져오기
        const selectedCheckboxes = document.querySelectorAll('.file-checkbox:checked');

        // 체크된 체크박스들의 값과 파일 이름을 추출하여 리스트로 만듦
        const selectedFiles = Array.from(selectedCheckboxes).map(checkbox => {
            const parentLi = checkbox.closest('ul.contents'); // 체크박스가 포함된 ul 요소를 찾음
            const fileName = parentLi.querySelector('.content03.content').textContent.trim(); // 파일 이름 추출

            return {
                value: Number(checkbox.value),   // 체크박스의 value 값
                fileName: fileName       // 파일 이름
            };
        });

        console.log(selectedFiles); // 결과 확인용 콘솔 출력

        if (selectedFiles.length > 0) {
            console.log("Deleting files with IDs:", selectedFiles);

            // 서버로 삭제 요청 보내기 (예: AJAX 요청)
            fetch('/api/pnuAtcDelete', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ fileIds: selectedFiles }),
            })
            .then(response => response.json())
            .then(data => {
                if (data.resultMessage == "success") {
                    // 성공적으로 삭제되었을 경우 체크박스와 관련된 리스트 항목 삭제

                    alert('선택된 파일이 삭제되었습니다.');
                    var params={"manage_no":$("#manage_no").val(),"pnu":$("#pnu").val()};
                    $.ajax({
                           url: "/jisang/getAtcFileData",
                           type: "POST",
                           data: params,
                       })
                       .done(function (fragment) {
                           $('#pnuAtcFilesDiv').replaceWith(fragment);
                       });
                } else {
                    alert('파일 삭제에 실패하였습니다.');
                }
            })
            .catch(error => {
                console.error('Error:', error);
                alert('파일 삭제 중 오류가 발생하였습니다.');
            });
        } else {
            alert('삭제할 파일을 선택해 주세요.');
        }
    });*/
});

//보기 클릭 시 팝업 기능
function openFilePopup(filePath) {
    // 절대 경로를 사용하도록 file:// 스킴을 추가
    const serverUrl = `/api/downloadFile?filePath=` + encodeURIComponent(filePath);

    // 새 창의 옵션 설정 (예: 너비 600px, 높이 400px, 스크롤바 허용 등)
    const popupOptions = "width=800,height=600,scrollbars=yes,resizable=yes";
    // 새 창 열기
    window.open(serverUrl, '파일 보기', popupOptions);
}

//다운로드 스크립트
function downloadFile(filePath, fileName) {
      const url = `/api/download?filePath=${filePath}&fileName=${encodeURIComponent(fileName)}`;
	 //  const url = `/api/download?filePath=${filePath}&fileName=${fileName}`;
	   console.log(url);
       window.open(url, '_blank');  // 새 창이나 새 탭에서 파일 다운로드
   }

const memoEditBtn = document.querySelectorAll('#groundDetail .memoSection .editBtn')
const editBefore = document.querySelectorAll('#groundDetail .memoSection .contents .content.btnBox .editBefore');
const editAfter = document.querySelectorAll('#groundDetail .memoSection .contents .content.btnBox .editAfter');
const editContent = document.querySelectorAll('#groundDetail .editSpace');
const registBtn = document.querySelectorAll('#groundDetail .registBtn');
const delBtn = document.querySelectorAll('#groundDetail .delBtn');
console.log("--------------------");
console.log(memoEditBtn);


/*
function loadMemoEditBtn(){
	memoEditBtn.forEach((btn) => {
		
	    btn.addEventListener('click', function () {
	        var thisEditContent = btn.closest('.contents');
	        console.log(thisEditContent);

	        thisEditContent.classList.add('editing');
	        
	        // const inputs = thisEditContent.querySelectorAll('input');
	        const inputs = thisEditContent.querySelectorAll('.editSpace input');

	        if (thisEditContent.classList.contains('editing')) {
	            inputs.forEach(input => {
	                input.removeAttribute('readonly');
	            });
	        } else {
	            inputs.forEach(input => {
	                input.setAttribute('readonly', 'readonly');
	            });
	        }



	    })
	})

}*/

/*memoEditBtn.forEach((btn) => {
	
    btn.addEventListener('click', function () {
        var thisEditContent = btn.closest('.contents');
        console.log(thisEditContent);

        thisEditContent.classList.add('editing');
        
        // const inputs = thisEditContent.querySelectorAll('input');
        const inputs = thisEditContent.querySelectorAll('.editSpace input');

        if (thisEditContent.classList.contains('editing')) {
            inputs.forEach(input => {
                input.removeAttribute('readonly');
            });
        } else {
            inputs.forEach(input => {
                input.setAttribute('readonly', 'readonly');
            });
        }



    })
})*/

/*if(registBtn) {
    registBtn.forEach((regiBtn)=> {
        regiBtn.addEventListener('click',function(){

            var thisEditContent01 = regiBtn.closest('.contents');
            thisEditContent01.classList.remove('editing')
			
            const inputs = thisEditContent01.querySelectorAll('input');
            inputs.forEach(input => {
                input.setAttribute('readonly', 'readonly');
            });
			
			
			
			
			console.log("------------registBtn end-------------");
			console.log($(thisEditContent01).find("#wname").val());
			console.log($(thisEditContent01).find("#wmemo").val());
			console.log($(thisEditContent01).find("#idx").val());
			var idx=$(thisEditContent01).find("#idx").val();
			var mode="";
			if (idx==0 || idx=="undefiled" ||idx==null) mode="insert";
			else mode="update";
			var mparams={"mode":mode,"idx":idx,"manage_no":$("#manage_no").val(), "wname":$(thisEditContent01).find("#wname").val(),"wmemo":$(thisEditContent01).find("#wmemo").val()};
			console.log(mparams);
			$.ajax({
			      url: "/api/putMemoData",
			      type: "POST",
			      data: mparams,
				  success:function(memoList){
					$('#memoDiv').replaceWith(memoList);
					loadMemoEditBtn();
					
				  }
			 });
        })
    })
}*/



/*if(delBtn) {
    delBtn.forEach((dBtn)=> {
        dBtn.addEventListener('click',function(){

            var thisEditContent01 = dBtn.closest('.contents');
          //  thisEditContent01.classList.remove('editing')
			
            const inputs = thisEditContent01.querySelectorAll('input');
            inputs.forEach(input => {
                input.setAttribute('readonly', 'readonly');
            });
			
			
			
			
			console.log("------------delBtn end-------------");
			
			console.log($(thisEditContent01).find("#idx").val());
			var idx=$(thisEditContent01).find("#idx").val();
			var mode="";
			if (idx==0 || idx=="undefiled" ||idx==null) {
			return;
				}
			
			var mparams={"idx":$(thisEditContent01).find("#idx").val()};
			console.log(mparams);
			$.ajax({
			      url: "/api/deleteMemoData",
			      type: "POST",
			      data: mparams,
			 })
			 .done(function (fragment) {
				$('#memoDiv').replaceWith(fragment);
				scrFn_loadScript('/js/jisang/groundDetail.js');
			  });
        })
    })
	
	
}
*/


/* 잠재이슈 수정 팝업 오픈 */

const groundIssueReviseOpen = () => {

    const groundIssueReviseBtn = document.querySelectorAll(".groundIssueReviseBtn");

      if(groundIssueReviseBtn){

       const groundIssueRevisePop = document.querySelector(".groundIssueRevisePopWrappers");
       let htmlFilePath = '/components/popuphtml/editIssuePopup.html'; // 삽입할 html 파일 경로
  
       let xhr = new XMLHttpRequest();
       xhr.open('GET', htmlFilePath, true);
       xhr.onreadystatechange = function() {
           if (xhr.readyState == 4 && xhr.status == 200) {
               //groundIssueRevisePop.innerHTML = xhr.responseText;
              // runScriptsInElement(groundIssueRevisePop); // 삽입된 html내 스크립트 실행 함수 호출
           }
       };
       xhr.send();
       console.log('IssueRevisePop작동');


       groundIssueReviseBtn.forEach((btn) => {
            btn.addEventListener("click", () => {
               btn.classList.add("open");
               const popupOpen = document.querySelector("#editIssuePopup .popupWrap");
                if(popupOpen){
                   popupOpen.classList.add("active");
                }
            })
         })
      }
        
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

groundIssueReviseOpen();

/*
$(document).on("click","#deleteMemoBtn",function(){
	console.log("--------start--- deletememobtn--------");
	
	var thisDeleteContent = delBtn.closest('.contents');
	var idx=$(thisDeleteContent).find("#idx").val();
				var mode="";
				if (idx==0 || idx=="undefiled" ||idx==null) {
					return;
				}
				
				var mparams={"idx":idx};
				console.log(mparams);
				$.ajax({
				      url: "/api/deleteMemoData",
				      type: "POST",
				      data: mparams,
				 })
				 .done(function (fragment) {
				
				  });
})
*/



/*//thymreaf refresh samepl
$(document).on("click",".addBtn",function(){
	console.log("--------addBtn click----------------");
	
	var dBtn = document.querySelectorAll('#groundDetail .delBtn');
	console.log(dBtn);
	var thisDeleteContent = this.closest('.contents');
	console.log(thisDeleteContent);
		var idx=$(thisDeleteContent).find("#idx").val();
		var mparams={"idx":idx};
		console.log(mparams);
		$.ajax({
						      url: "/api/getMemoData",
						      type: "POST",
						      data: mparams,
						 })
						 .done(function (fragment) {
							console.log("------- add Btn done ----------");
							$('#memoDiv').replaceWith(fragment);
						  });
	 
})*/

$(document).on("click",".addBtn",function(){
	console.log("--------addBtn click----------------");
	var thisContent = this.closest('.contents');
	var wname=$(thisContent).find("#wname").val();
	var wmemo=$(thisContent).find("#wmemo").val();
	var idx=$(thisContent).find("#idx").val();
	if (idx==null || idx==undefined){
		alert("현재 필드 부터 작성후 추가를 해주세요.");
		return;
	}
	
	var MainContentDiv = this.closest('.contentScr');
	var thisNullContent = $(MainContentDiv).find("ul").eq(0).html();
	console.log(MainContentDiv);
	console.log("-------------------------");
	console.log(thisNullContent);
	$(MainContentDiv).append("<ul class='contents'>"+thisNullContent+"</ul>");
	
});

$(document).on("click",".editBtn",function(){
	console.log("--------editBtn click----------------");
	var thisContent = this.closest('.contents');
	console.log(thisContent);
	thisContent.classList.add('editing');
	const inputs = thisContent.querySelectorAll('.editSpace input');

	        if (thisContent.classList.contains('editing')) {
	            inputs.forEach(input => {
	                input.removeAttribute('readonly');
	            });
	        } else {
	            inputs.forEach(input => {
	                input.setAttribute('readonly', 'readonly');
	            });
	        }
	
});


$(document).on("click",".registBtn",function(){
		var thisContent = this.closest('.contents');
	            thisContent.classList.remove('editing')
				
				const inputs = thisContent.querySelectorAll('input');
				            inputs.forEach(input => {
				                input.setAttribute('readonly', 'readonly');
				            });
							
							
							
							
							console.log("------------registBtn start-------------");
							console.log($(thisContent).find("#wname").val());
							console.log($(thisContent).find("#wmemo").val());
							console.log($(thisContent).find("#idx").val());
							var wname=$(thisContent).find("#wname").val();
							var wmemo=$(thisContent).find("#wmemo").val();
							var idx=$(thisContent).find("#idx").val();
							var manage_no=$("#manage_no").val();
							var mode="";
							if (manage_no=="undefined" || manage_no==null || manage_no=="") {
								alert("입력한 데이터가 없습니다.");
								return;
							}
							if (wname=="undefined" || wname==null || wname=="" || wname==undefined){
								alert("내용을 확인해주세요.");
								return;
							}
							if (idx==0 || idx=="undefined" ||idx==null) mode="insert";
							else mode="update";
							var mparams={"mode":mode,"idx":idx,"manage_no":$("#manage_no").val(), "wname":$(thisContent).find("#wname").val(),"wmemo":$(thisContent).find("#wmemo").val()};
							console.log(mparams);
							$.ajax({
							      url: "/api/putMemoData",
							      type: "POST",
							      data: mparams,
								  success:function(memoList){
									$('#memoDiv').replaceWith(memoList);
									//loadMemoEditBtn();
									
								  }
							 });
	
});


$(document).on("click","#deleteMemoBtn",function(){
	var thisContent = this.closest('.contents');


	console.log("------------deleteMemoBtn end-------------");

	console.log($(thisContent).find("#idx").val());
	var idx=$(thisContent).find("#idx").val();
	var manage_no=$("#manage_no").val();
	if (manage_no=="undefined" || manage_no==null || manage_no=="") {
		alert("입력한 데이터가 없습니다.");
		return;
	}
	var mode="";
	if (idx==0 || idx=="undefined" ||idx==null) {
	return;
		}
     
	var mparams={"idx":$(thisContent).find("#idx").val(),"manage_no":$("#manage_no").val()};
	console.log(mparams);
	
	$.ajax({
	      url: "/api/deleteMemoData",
	      type: "POST",
	      data: mparams,
	 })
	 .done(function (fragment) {
		$('#memoDiv').replaceWith(fragment);
		
	  });
});


// 선택파일 삭제 버튼
$(document).on("click","#deleteSelectedBtn",function(){
	console.log("------------deleteSelectedBtn end-------------");

	const selectedCheckboxes = document.querySelectorAll('.file-checkbox:checked');

    // 체크된 체크박스들의 값과 파일 이름을 추출하여 리스트로 만듦
    const selectedFiles = Array.from(selectedCheckboxes).map(checkbox => {
        const parentLi = checkbox.closest('ul.contents'); // 체크박스가 포함된 ul 요소를 찾음
        const fileName = parentLi.querySelector('.content03.content').textContent.trim(); // 파일 이름 추출

        return {
            value: Number(checkbox.value),   // 체크박스의 value 값
            fileName: fileName       // 파일 이름
        };
    });

    console.log(selectedFiles); // 결과 확인용 콘솔 출력

    if (selectedFiles.length > 0) {
        console.log("Deleting files with IDs:", selectedFiles);

        // 서버로 삭제 요청 보내기 (예: AJAX 요청)
        fetch('/api/pnuAtcDelete', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ fileIds: selectedFiles }),
        })
        .then(response => response.json())
        .then(data => {
            if (data.resultMessage == "success") {
                // 성공적으로 삭제되었을 경우 체크박스와 관련된 리스트 항목 삭제

                alert('선택된 파일이 삭제되었습니다.');
                var params={"manage_no":$("#manage_no").val(),"pnu":$("#pnu").val()};
                $.ajax({
                       url: "/jisang/getAtcFileData",
                       type: "POST",
                       data: params,
                   })
                   .done(function (fragment) {
                       $('#pnuAtcFilesDiv').replaceWith(fragment);
                   });
            } else {
                alert('파일 삭제에 실패하였습니다.');
            }
        })
        .catch(error => {
            console.error('Error:', error);
            alert('파일 삭제 중 오류가 발생하였습니다.');
        });
    } else {
        alert('삭제할 파일을 선택해 주세요.');
    }
});

$('#openFileWindow').click(function() {
           // 파일 URL을 텍스트 입력에서 가져옴
           const fileUrl = $(this).parent().parent().find('#fileUrl').val();
console.log(fileUrl);
           if (!fileUrl) {
               alert('파일 URL을 입력하세요.');
               return;
           }

           // 파일 확장자 추출
           const fileExtension = fileUrl.split('.').pop().toLowerCase();

           // 새 창 열기
           const newWindow = window.open('', '_blank', 'width=800,height=600');

           // 파일 종류에 따라 처리
           if (fileExtension === 'pdf') {
               // PDF 파일을 iframe으로 표시
               newWindow.document.write(`
                   <html>
                   <head>
                       <title>PDF 파일 보기</title>
                   </head>
                   <body>
                       <h2>PDF 파일</h2>
                       <iframe src="${fileUrl}" width="100%" height="100%" style="border:none;"></iframe>
                       <button onclick="window.close();">닫기</button>
                   </body>
                   </html>
               `);
           } else if (fileExtension === 'jpg' || fileExtension === 'png' || fileExtension === 'gif') {
               // 이미지 파일을 img 태그로 표시
               newWindow.document.write(`
                   <html>
                   <head>
                       <title>이미지 보기</title>
                   </head>
                   <body>
                       <h2>이미지 파일</h2>
                       <img src="${fileUrl}" style="max-width: 100%; height: auto;" />
                       <button onclick="window.close();">닫기</button>
                   </body>
                   </html>
               `);
           } else {
               // PDF, 이미지 외에는 직접 표시하지 않음 (다운로드 유도)
               newWindow.document.write(`
                   <html>
                   <head>
                       <title>파일 보기</title>
                   </head>
                   <body>
                       <h2>문서 파일 보기</h2>
                       <p>브라우저에서 이 파일을 표시할 수 없습니다. <a href="${fileUrl}" download>여기를 클릭해 다운로드하세요</a>.</p>
                       <button onclick="window.close();">닫기</button>
                   </body>
                   </html>
               `);
           }

           // 새 창의 문서 업데이트 완료 후 리소스 해제 (메모리 누수 방지)
           newWindow.document.close();
       });


$(function() {
	$('#jijukNewWindowBtn').click(function() {
		//window.open('http://202.68.225.158:8080/mapJijuk?lon=126.9562273&lat=37.5544849&lv=17', 'jijukWindow', 'width=1024,height=768');
		// window.open('http://202.68.225.158:8080/mapJijuk?lon=128.4923014&lat=35.908302&lv=17', 'jijukWindow', 'width=1024,height=768');
		window.open(mapUrl, 'jijukWindow', 'width=1024,height=768,left=100,top=100');
		//http://10.168.0.247:8080/sample/map/2pms.html
	});
});


