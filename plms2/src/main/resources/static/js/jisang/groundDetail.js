

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
						$("#fileListDiv").append("<div></div>");
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
