const memoEditBtn = document.querySelectorAll('#companyLandDetails .memoSection .editBtn')
const editBefore = document.querySelectorAll('#companyLandDetails .memoSection .contents .content.btnBox .editBefore');
const editAfter = document.querySelectorAll('#companyLandDetails .memoSection .contents .content.btnBox .editAfter');
const editContent = document.querySelectorAll('#companyLandDetails .editSpace');
const registBtn = document.querySelectorAll('#companyLandDetails .registBtn');

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

// 회사보유토지 스캔파일 - 보기 클릭 시 팝업 기능
function openFilePopup(filePath) {
	// 절대 경로를 사용하도록 file:// 스킴을 추가
	const serverUrl = `/api/downloadFile?filePath=` + encodeURIComponent(filePath);

	// 새 창의 옵션 설정 (예: 너비 600px, 높이 400px, 스크롤바 허용 등)
	const popupOptions = "width=800,height=600,scrollbars=yes,resizable=yes";
	// 새 창 열기
	window.open(serverUrl, '파일 보기', popupOptions);
}


// 회사보유토지 스캔파일 - 다운로드 스크립트
function downloadFile(filePath, fileName) {
	const url = `/api/download?filePath=${filePath}&fileName=${encodeURIComponent(fileName)}`;
	//  const url = `/api/download?filePath=${filePath}&fileName=${fileName}`;
	console.log(url);
	window.open(url, '_blank');  // 새 창이나 새 탭에서 파일 다운로드
}

if(registBtn) {
    registBtn.forEach((regiBtn)=> {
        regiBtn.addEventListener('click',function(){

            var thisEditContent01 = regiBtn.closest('.contents');
            thisEditContent01.classList.remove('editing');

            const inputs = thisEditContent01.querySelectorAll('input');
            inputs.forEach(input => {
                input.setAttribute('readonly', 'readonly');
            });
        })
    })
}

/* 이슈등록 클릭시 팝업오픈 */

const issueRegisterPopUpOpenEvet = () => {

     const issuePopBtn = document.querySelector(".issuePopBtn");
     const IssueRegisterPop = document.querySelector(".issueRegisterPopWrapper");
     let htmlFilePath = '/components/popuphtml/newIssuePopup.html'; // 삽입할 html 파일 경로

     let xhr = new XMLHttpRequest();
     xhr.open('GET', htmlFilePath, true);
     xhr.onreadystatechange = function() {
         if (xhr.readyState == 4 && xhr.status == 200) {
             IssueRegisterPop.innerHTML = xhr.responseText;
             runScriptsInElement(IssueRegisterPop); // 삽입된 html내 스크립트 실행 함수 호출
         }
     };
     xhr.send();
     console.log(' IssueRegisterPop 작동');

     issuePopBtn.addEventListener("click" , () => {
        
          const popupOpen = document.querySelector("#newIssuePopup .popupWrap");
                issuePopBtn.classList.add("open");
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

issueRegisterPopUpOpenEvet();



const issueRevisePopUpOpenEvet = () => {

     const issueReviseBtn = document.querySelectorAll(".issueReviseBtn");

     if(issueReviseBtn){

        const IssueRevisePop = document.querySelector(".issueRevisePopWrapper");
        let htmlFilePath = '/components/popuphtml/editIssuePopup.html'; // 삽입할 html 파일 경로
   
        let xhr = new XMLHttpRequest();
        xhr.open('GET', htmlFilePath, true);
        xhr.onreadystatechange = function() {
            if (xhr.readyState == 4 && xhr.status == 200) {
                IssueRevisePop.innerHTML = xhr.responseText;
                runScriptsInElement(IssueRevisePop); // 삽입된 html내 스크립트 실행 함수 호출
            }
        };
        xhr.send();
        console.log('IssueRevisePop작동');

        issueReviseBtn.forEach((btns) => {
            btns.addEventListener("click" , () => {
                 btns.classList.add("open");
                 const popupOpen = document.querySelector("#editIssuePopup .popupWrap");
                 if(popupOpen){
                    popupOpen.classList.add("active");
                 }
            })
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

issueRevisePopUpOpenEvet();


// 메모 추가 버튼
$(document).on("click", ".addBtn", function() {
	console.log("--------addBtn click----------------");
	var thisContent = this.closest('.contents');
	var wname = $(thisContent).find("#wname").val();
	var wmemo = $(thisContent).find("#wmemo").val();
	var idx = $(thisContent).find("#idx").val();
	if (idx == null || idx == undefined) {
		alert("현재 필드 부터 작성후 추가를 해주세요.");
		return;
	}

	var MainContentDiv = this.closest('.contentScr');
	var thisNullContent = $(MainContentDiv).find("ul").eq(0).html();
	console.log(MainContentDiv);
	console.log("-------------------------");
	console.log(thisNullContent);
	$(MainContentDiv).append("<ul class='contents'>" + thisNullContent + "</ul>");

});

// 메모 수정 버튼
$(document).on("click", ".editBtn", function() {
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

// 메모 등록 버튼
$(document).on("click", ".registBtn", function() {
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
	var wname = $(thisContent).find("#wname").val();
	var wmemo = $(thisContent).find("#wmemo").val();
	var idx = $(thisContent).find("#idx").val();
	var manage_no = $("#manage_no").val();
	var mode = "";
	if (manage_no == "undefined" || manage_no == null || manage_no == "") {
		alert("입력한 데이터가 없습니다.");
		return;
	}
	if (wname == "undefined" || wname == null || wname == "" || wname == undefined) {
		alert("내용을 확인해주세요.");
		return;
	}
	if (idx == 0 || idx == "undefined" || idx == null) mode = "insert";
	else mode = "update";
	var mparams = { "mode": mode, "idx": idx, "manage_no": $("#manage_no").val(), "wname": $(thisContent).find("#wname").val(), "wmemo": $(thisContent).find("#wmemo").val() };
	console.log(mparams);
	$.ajax({
		url: "/api/putMemoData",
		type: "POST",
		data: mparams,
		success: function(memoList) {
			$('#memoDiv').replaceWith(memoList);
			//loadMemoEditBtn();

		}
	});

});


// 메모 삭제 버튼
$(document).on("click", "#deleteMemoBtn", function() {
	var thisContent = this.closest('.contents');
	
	console.log("------------deleteMemoBtn end-------------");

	console.log($(thisContent).find("#idx").val());
	var idx = $(thisContent).find("#idx").val();
	var manage_no = $("#manage_no").val();
	if (manage_no == "undefined" || manage_no == null || manage_no == "") {
		alert("입력한 데이터가 없습니다.");
		return;
	}
	var mode = "";
	if (idx == 0 || idx == "undefined" || idx == null) {
		return;
	}

	var mparams = { "idx": $(thisContent).find("#idx").val(), "manage_no": $("#manage_no").val() };
	console.log(mparams);

	$.ajax({
		url: "/api/deleteMemoData",
		type: "POST",
		data: mparams,
	})
		.done(function(fragment) {
			$('#memoDiv').replaceWith(fragment);

		});
});