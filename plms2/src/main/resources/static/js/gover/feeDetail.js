
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

const feeDetailPayPopEvet = () => {
    
    const feeDetailPayBtn = document.querySelector("#feeDetail .payBtn");
    const feeDetailPayPopWrappers = document.querySelector(".feeDetailPayPopWrappers");
    let htmlFilePath = '/components/popuphtml/occupancyfeePopup.html'; // 삽입할 html 파일 경로

    if(feeDetailPayBtn){

       let xhr = new XMLHttpRequest();
       xhr.open('GET', htmlFilePath, true);
       xhr.onreadystatechange = function() {
           if (xhr.readyState == 4 && xhr.status == 200) {
               feeDetailPayPopWrappers.innerHTML = xhr.responseText;
               runScriptsInElement(feeDetailPayPopWrappers); // 삽입된 html내 스크립트 실행 함수 호출
           }
       };
       xhr.send();
       console.log('masterRegExcelPopWrapper 작동');
       feeDetailPayBtn.addEventListener("click" , () => {
       
           const popupOpen = document.getElementById("occupancyfeePopup");
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

feeDetailPayPopEvet();


/* 손지민 2024-10-01 - 허가관청 이력보기 팝업 -- 상단에 대체 코드 있음. 이 코드 사용 안 함. */
const feeDetailCangehistoryPopEvet = () => {
	const historyBtn = document.querySelector("#feeDetail .historyBtn");
	const feeDetailCangehistoryPopWrappers = document.querySelector(".feeDetailCangehistoryPopWrappers");
	let htmlFilePath = '/components/popuphtml/changehistoryPopup.html'; // 삽입할 html 파일 경로

	if (feeDetailCangehistoryPopWrappers) {

		let xhr = new XMLHttpRequest();
		xhr.open('GET', htmlFilePath, true);
		xhr.onreadystatechange = function() {
			if (xhr.readyState == 4 && xhr.status == 200) {
				feeDetailCangehistoryPopWrappers.innerHTML = xhr.responseText;
				runScriptsInElement(feeDetailCangehistoryPopWrappers); // 삽입된 html내 스크립트 실행 함수 호출
			}
		};
		xhr.send();
		console.log('feeDetailCangehistoryPopWrappers 작동');

		historyBtn.addEventListener("click", () => {

			const popupOpen = document.getElementById("changehistoryPopup");
			console.log(popupOpen)
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
//feeDetailCangehistoryPopEvet();

//첨부파일 - 다운로드 스크립트
function downloadFile(filePath, fileName) {
	const url = `/api/download?filePath=${filePath}&fileName=${encodeURIComponent(fileName)}`;
	//  const url = `/api/download?filePath=${filePath}&fileName=${fileName}`;
	console.log(url);
	window.open(url, '_blank');  // 새 창이나 새 탭에서 파일 다운로드
}

/*
// 주소 검색 버튼 클릭 시
$(document).on("click",".historyBtn",function(){
	
	console.log($(this).parent().parent().html());
	var idObj = $(this).parent().parent().find("#addr");
	var id = $(this).parent().parent().find("#goverIndex").val();
		
	console.log(idObj.val()); 
	console.log(id);
	
	var addr = idObj.val();
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
	  const popupOpen = document.querySelector("#changehistoryPopup .popupWrap");
            console.log($(popupOpen).html());
	  	   $(popupOpen).addClass("open");
	  	   popupOpen.classList.add("active");
    	 $('.resultSelectBtn').attr('data-index', id);
       	$('.saveBtn').attr('data-index', id);
   	});

});
*/
