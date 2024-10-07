
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


/* 손지민 2024-10-01 - 허가관청 이력보기 팝업 -- 상단에 대체 코드 있음. 이 코드 사용 안 함. */
const useDetailCangehistoryPopEvet = () => {

	const useDetailHistoryBtn = document.querySelector("#useDetail .useDetailHistoryBtn");
	const useDetailChangeHistoryWrapper = document.querySelector(".useDetailChangeHistoryWrapper");
	let htmlFilePath = '/components/popuphtml/changehistoryPopup.html'; // 삽입할 html 파일 경로

	if (useDetailChangeHistoryWrapper) {

		let xhr = new XMLHttpRequest();
		xhr.open('GET', htmlFilePath, true);
		xhr.onreadystatechange = function() {
			if (xhr.readyState == 4 && xhr.status == 200) {
				useDetailChangeHistoryWrapper.innerHTML = xhr.responseText;
				runScriptsInElement(useDetailChangeHistoryWrapper); // 삽입된 html내 스크립트 실행 함수 호출
			}
		};
		xhr.send();
		console.log('useDetailChangeHistoryWrapper 작동');


		useDetailHistoryBtn.addEventListener("click", () => {

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
//useDetailCangehistoryPopEvet();

$(document).on("click","#cancelSangsin",function(){
	console.log($("#saveForm").serialize());
		    var formSerializeArray = $('#saveForm').serializeArray(); // 폼 데이터를 직렬화하여 배열로 저장
		    console.log(formSerializeArray); // 배열 형태로 폼 데이터 출력
		    
		    var object = {}; // 빈 객체 생성
		    for (var i = 0; i < formSerializeArray.length; i++) { 
		        object[formSerializeArray[i]['name']] = formSerializeArray[i]['value']; // 배열의 각 항목을 객체로 변환
		    }
			
			
			
			console.log(object);
			
			url="/land/gover/updateSangsinCancel"; 
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
						alert("cancelSangsin ajax error\n"+textStatus+":"+errorThrown);
						return false;
					}
			
			}); 
})




/**********************************/
/**********************************/
//종섭작업
function printCurrentPage(){
	console.log('인쇄');
	
	let prtContent = document.getElementById('detailPrintSection');
	let initBody; 
	
	window.onbeforeprint = function() {
		initBody = document.body.innerHTML;
		document.body.innerHTML = prtContent.innerHTML;
	}
	
	window.onafterprint = function() {
		document.body.innerHTML = initBody;
	}
	
	window.print();
	
}

//상세보기 다운로드
function detailFileDownload(infoStr) {
	//let fileInfoObj = queryValueToObject(infoStr);
	console.log(infoStr);
	
	console.log(infoStr.ga_file_path);
	console.log(infoStr.ga_file_nm);
	console.log(infoStr.ga_gover_no);
	console.log(infoStr.ga_file_seq);
	console.log('gubun :: gover');
	
	commonFileDownload(infoStr.ga_file_path, infoStr.ga_file_nm, infoStr.ga_gover_no, infoStr.ga_file_seq, 'gover');
	
}
/**********************************/
/**********************************/