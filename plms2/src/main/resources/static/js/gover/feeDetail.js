
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
    //let htmlFilePath = '/components/popuphtml/occupancyfeePopup.html'; // 삽입할 html 파일 경로

	if(feeDetailPayBtn){
/*
       let xhr = new XMLHttpRequest();
       xhr.open('GET', htmlFilePath, true);
       xhr.onreadystatechange = function() {
           if (xhr.readyState == 4 && xhr.status == 200) {
               feeDetailPayPopWrappers.innerHTML = xhr.responseText;
               runScriptsInElement(feeDetailPayPopWrappers); // 삽입된 html내 스크립트 실행 함수 호출
           }
       };
       xhr.send();
       */
		console.log('masterRegExcelPopWrapper 작동');
		feeDetailPayBtn.addEventListener("click" , () => {
			const popupOpen = document.getElementById("occupancyfeePopup");
			if(popupOpen){
				popupOpen.classList.add("active");
			}
		})
		//x버튼, 닫기, 승인요청 클릭시 팝업클로즈
	  const occupancyfeePopupOpen = document.getElementById("occupancyfeePopup");
	  if (occupancyfeePopupOpen) {
	    occupancyfeePopupOpen
	      .querySelectorAll(".topCloseBtn, .finalBtn")
	      .forEach(function (btn) {
	        btn.addEventListener("click", () => {
	          occupancyfeePopupOpen.classList.remove("active");
	        });
	      });
	  }

   // 삽입된 html내 스크립트 실행 함수
/*
   const runScriptsInElement = (element) => {
       const scripts = element.getElementsByTagName('script');
       for (let i = 0; i < scripts.length; i++) {
           const script = document.createElement('script');
           script.textContent = scripts[i].textContent;
           document.body.appendChild(script).parentNode.removeChild(script);
       }
   }
*/

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
function downloadFile(filePath, fileName, fileJisangNo, fileSeq, fileGubun) {
	//const url = `/api/download?filePath=${filePath}&fileName=${encodeURIComponent(fileName)}`;
	//  const url = `/api/download?filePath=${filePath}&fileName=${fileName}`;
	//console.log(url);
	//window.open(url, '_blank');  // 새 창이나 새 탭에서 파일 다운로드
	
	console.log(filePath);
	console.log(fileName);
	console.log(fileJisangNo);
	console.log(fileSeq);
	console.log(fileGubun);
	
	commonFileDownload(filePath, fileName, fileJisangNo, fileSeq, fileGubun);
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

$(document).on("click","#sangsinBtn",function(){
	
	console.log("sangsin");
	
	var gover_no=$("#p_gover_no").val();
	var jisa=$("#p_jisa").val();
	var pmt_office=$("#p_pmt_office").val();
	var adm_office=$("#p_adm_office").val();
	var office_depart=$("#p_office_depart").val();
	var office_charege=$("#p_office_charege").val();
	var office_contact=$("#p_office_contact").val();
	var pmt_no=$("#pmt_no").val();
	var pay_date=$("#pay_date").val();
	var pay_money=$("#pay_money").val();
	var pay_vat=$("#pay_vat").val();
	var pmt_st_date=$("#pmt_st_date").val();
	var pmt_ed_date=$("#pmt_ed_date").val();
	var pmt_no=$("#p_office_contact").val();
	var pmt_no=$("#p_office_contact").val();
	var pay_way=$("#pay_way").val();
	var use_purpos="";
	var pmt_gover_length="";
	var pmt_gover_area="";
	
	//pnulist 
	console.log("----------javascript array test-----------");
								
								   console.log(pnuArray);  // JavaScript 배열로 출력
	
	
	
	var jsonData={"GOVER_NO":gover_no,"loginKey":"","JISA":jisa
				,"PMT_OFFICE":pmt_office,"ADM_OFFICE":adm_office
				,"OFFICE_DEPART":office_depart,"OFFICE_CHARGE":office_charege
				,"OFFICE_CONTACT":office_contact
				,"PMT_NO":pmt_no
				,"PAY_DATE":pay_date
				,"PAY_MONEY":pay_money
				,"PAY_VAT":pay_vat
				,"PMT_ST_DATE":pmt_st_date
				,"PMT_ED_DATE":pmt_ed_date
				,"PAY_WAY":pay_way
				,"USE_PURPOS":use_purpos
				,"PMT_GOVER_LENGTH":pmt_gover_length
				,"PMT_GOVER_AREA":pmt_gover_area
				,"PAGETYPE":"update" //update=수정에서 
				,"OFFICE_MOBILE":""
				,"pnuCnt":pnuArray.length
				,"pnuList":pnuArray
				};
		console.log(jsonData);
		
		var url="/land/gover/insertGoverPaySangsin";
		//	var jsonDatas=encodeURIComponent(JSON.stringify(data));
			
				$.ajax({
					
					url:url,
					type:'POST',
					contentType:"application/json",
					data:JSON.stringify(jsonData),
					async:false,
					dataType:"json",
					
					success:function(response){
						console.log(response);
						if (response.success="Y"){
							console.log("response.success Y");
							alert("상신이 완료 되었습니다.");
							
							
							
						}
						else {
							console.log("response.success N");
						}
					},
					error:function(jqXHR,textStatus,errorThrown){
						alert("ajax error\n"+textStatus+":"+errorThrown);
					}
					
				});
	
})
