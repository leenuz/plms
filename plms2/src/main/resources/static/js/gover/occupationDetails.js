const memoEditBtn = document.querySelectorAll('#occupationDetails .memoSection .editBtn')
const editBefore = document.querySelectorAll('#occupationDetails .memoSection .contents .content.btnBox .editBefore');
const editAfter = document.querySelectorAll('#occupationDetails .memoSection .contents .content.btnBox .editAfter');
const editContent = document.querySelectorAll('#occupationDetails .editSpace');
const registBtn = document.querySelectorAll('#occupationDetails .registBtn');

$(document).on("click","#moveMap",function(){
	//openMapWindow();
	// mapWindow = window.open('', 'mapWindow', 'width=2000,height=1000');
	// moveToCityHall();

	openMapWindow({'lon':mapCoordLng, 'lat':mapCoordLat});
})
//memoEditBtn.forEach((btn) => {
//    btn.addEventListener('click', function () {
//        var thisEditContent = btn.closest('.contents');
//        console.log(thisEditContent);
//
//        thisEditContent.classList.add('editing');
//
//        const inputs = thisEditContent.querySelectorAll('input');
//
//        if (thisEditContent.classList.contains('editing')) {
//            inputs.forEach(input => {
//                input.removeAttribute('readonly');
//            });
//        } else {
//            inputs.forEach(input => {
//                input.setAttribute('readonly', 'readonly');
//            });
//        }
//    })
//})

if(registBtn) {
    registBtn.forEach((regiBtn)=> {
        regiBtn.addEventListener('click',function(){

            var thisEditContent01 = regiBtn.closest('.contents');
            thisEditContent01.classList.remove('editing')

            const inputs = thisEditContent01.querySelectorAll('input');
            inputs.forEach(input => {
                input.setAttribute('readonly', 'readonly');
            });
        })
    })
}






/* 잠재이슈 수정 팝업 오픈 */

const occupationIssueReviseOpen = () => {

     const occupationIssueReviseBtn = document.querySelectorAll(".occupationIssueReviseBtn");

       if(occupationIssueReviseBtn){

        const occupationIssueRevisePop = document.querySelector(".occupationIssueReviseWrappers");
        let htmlFilePath = '/components/popuphtml/editIssuePopup.html'; // 삽입할 html 파일 경로
   
        let xhr = new XMLHttpRequest();
        xhr.open('GET', htmlFilePath, true);
        xhr.onreadystatechange = function() {
            if (xhr.readyState == 4 && xhr.status == 200) {
//                occupationIssueRevisePop.innerHTML = xhr.responseText;
//                runScriptsInElement(occupationIssueRevisePop); // 삽입된 html내 스크립트 실행 함수 호출
            }
        };
        xhr.send();
        console.log('IssueRevisePop작동');


          occupationIssueReviseBtn.forEach((btn) => {
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
//      const runScriptsInElement = (element) => {
//        const scripts = element.getElementsByTagName('script');
//        for (let i = 0; i < scripts.length; i++) {
//            const script = document.createElement('script');
//            script.textContent = scripts[i].textContent;
//            document.body.appendChild(script).parentNode.removeChild(script);
//        }
//    }

}

occupationIssueReviseOpen();

document.addEventListener("DOMContentLoaded", function() {
    // 1. 모든 depth2의 ul 요소를 선택
    const depth2UlElements = document.querySelectorAll(".contBoxMini04 .contentDetailBox .depth2 .contents");

    if (depth2UlElements.length > 1) {
        // 2. 마지막 ul을 제외한 나머지 ul 요소 제거 및 높이 합산
        let totalHeight = 0;

        depth2UlElements.forEach((ul, index) => {
            const ulHeight = ul.offsetHeight;

            if (index !== depth2UlElements.length - 1) {
                totalHeight += ulHeight; // 삭제할 ul의 높이 합산
                ul.remove(); // ul 태그 삭제
            } else {
                // 마지막 ul에 이전 ul들의 높이를 추가
                totalHeight += ulHeight;
                ul.style.height = `${totalHeight}px`;
                ul.style.display = 'flex';
                ul.style.justifyContent = 'center';
                ul.style.alignItems = 'center';
            }
        });

        // 3. 마지막 ul에 있는 버튼을 가운데 정렬
        const lastUlElement = depth2UlElements[depth2UlElements.length - 1];
        const lastButton = lastUlElement.querySelector(".viewAllBtn");

        // 마지막 li 요소의 내용을 모두 제거하고 버튼만 남김
        const lastLiElement = lastButton.parentElement;
        lastLiElement.innerHTML = '';
        lastLiElement.appendChild(lastButton);

        // 마지막 버튼 스타일 적용
        lastButton.style.display = 'block';
        lastButton.style.margin = '0 auto';
        lastButton.style.width = '150px';
        lastButton.style.textAlign = 'center';
    }

    //금액 숫자 포멧팅
    document.querySelectorAll('.content01').forEach(function(element) {
        const money = parseInt(element.getAttribute('data-money'), 10);
        if (!isNaN(money)) {
            const formatted = money.toLocaleString();
            element.querySelector('span').textContent = formatted;
        }
    });
});



$(document).on("click","#fileSaveBtn",function(){
	console.log("--------------start fileSaveBtn---------");
	console.log(uploadFiles);
	//console.log($("#uploadForm").serialize());
	/*var files=$("input[name='fileUpload']")[0].files;
	for(var i=0;i<files.length;i++){
		console.log("filename:"+files[i].name);
	}*/
	var params={"manage_no":$("#manage_no").val(),"pnu":$("#pnu").val(),"files":uploadFiles};
	console.log(uploadFiles.length);
	if (uploadFiles.length<1) {
		alert("첨부파일이 없습니다.");
		return;
	}
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


//보기 클릭 시 팝업 기능
function openFilePopup(filePath) {
    // 절대 경로를 사용하도록 file:// 스킴을 추가
    const serverUrl = `/api/downloadFile?filePath=` + encodeURIComponent(filePath);

    // 새 창의 옵션 설정 (예: 너비 600px, 높이 400px, 스크롤바 허용 등)
    const popupOptions = "width=800,height=600,scrollbars=yes,resizable=yes";
    // 새 창 열기
    window.open(serverUrl, '파일 보기', popupOptions);
}

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

//메모 기능
$(document).on("click",".addBtn",function(){
	console.log("--------addBtn click----------------");

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




							console.log("------------registBtn end-------------");
							console.log($(thisContent).find("#wname").val());
							console.log($(thisContent).find("#wmemo").val());
							console.log($(thisContent).find("#idx").val());
							var idx=$(thisContent).find("#idx").val();
							var mode="";
							if (idx==0 || idx=="undefiled" ||idx==null) mode="insert";
							else mode="update";
							var mparams={"mode":mode,"idx":idx,"manage_no":$("#manage_no").val(), "wname":$(thisContent).find("#wname").val(),"wmemo":$(thisContent).find("#wmemo").val()};
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

});

$(document).on("click",".delBtn",function(){
	var thisContent = this.closest('.contents');


	console.log("------------delBtn end-------------");

	console.log($(thisContent).find("#idx").val());
	var idx=$(thisContent).find("#idx").val();
	var mode="";
	if (idx==0 || idx=="undefiled" ||idx==null) {
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



//보기 클릭 시 팝업 기능
function openFilePopup(filePath) {
	console.log(filePath);
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



$(function() {
    $('#jijukNewWindowBtn').click(function() {
        //window.open('http://202.68.225.158:8080/mapJijuk?lon=126.9562273&lat=37.5544849&lv=17', 'jijukWindow', 'width=1024,height=768');
        // window.open('http://202.68.225.158:8080/mapJijuk?lon=128.4923014&lat=35.908302&lv=17', 'jijukWindow', 'width=1024,height=768');
        window.open(mapUrl, 'jijukWindow', 'width=1024,height=768,left=100,top=100');
        //http://10.168.0.247:8080/sample/map/2pms.html
    });
});
