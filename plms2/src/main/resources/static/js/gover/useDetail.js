const useDetailCangehistoryPopEvet = () => {
    
   const useDetailHistoryBtn = document.querySelector("#useDetail .useDetailHistoryBtn");
   const useDetailChangeHistoryWrapper = document.querySelector(".useDetailChangeHistoryWrapper");
   let htmlFilePath = '/components/popuphtml/changehistoryPopup.html'; // 삽입할 html 파일 경로

   if(useDetailChangeHistoryWrapper){

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


      useDetailHistoryBtn.addEventListener("click" , () => {
        
         const popupOpen = document.getElementById("changehistoryPopup");
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

//useDetailCangehistoryPopEvet();
$(document).ready(function(){
	console.log("-------ready---useDetail-------------");
	
})



$(document).on("click","#cancelSangsin",function(){
	console.log($("#saveForm").serialize());
		    var formSerializeArray = $('#saveForm').serializeArray(); // 폼 데이터를 직렬화하여 배열로 저장
		    console.log(formSerializeArray); // 배열 형태로 폼 데이터 출력
		    
		    var object = {}; // 빈 객체 생성
		    for (var i = 0; i < formSerializeArray.length; i++) { 
		        object[formSerializeArray[i]['name']] = formSerializeArray[i]['value']; // 배열의 각 항목을 객체로 변환
		    }
			
			
			
			console.log(object);
			
			url="/gover/updateSangsinCancel"; 
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
/**********************************/
/**********************************/