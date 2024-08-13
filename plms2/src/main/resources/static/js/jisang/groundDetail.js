

$(document).on("click","#fileSaveBtn",function(){
	console.log("--------------start fileSaveBtn---------");
	console.log(uploadFiles);
	//console.log($("#uploadForm").serialize());
	/*var files=$("input[name='fileUpload']")[0].files;
	for(var i=0;i<files.length;i++){
		console.log("filename:"+files[i].name);
	}*/
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

    // 선택파일 삭제 버튼 클릭 이벤트 처리
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
    });
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
console.log("--------------------");
console.log(memoEditBtn);
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

if(registBtn) {
    registBtn.forEach((regiBtn)=> {
        regiBtn.addEventListener('click',function(){

           /* var thisEditContent01 = regiBtn.closest('.contents');
            thisEditContent01.classList.remove('editing')

            const inputs = thisEditContent01.querySelectorAll('input');
            inputs.forEach(input => {
                input.setAttribute('readonly', 'readonly');
            });*/
			
			
			
			
			console.log("------------registBtn end-------------");
        })
    })
}

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







