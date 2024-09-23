// 삽입된 html내 스크립트 실행 함수
const runScriptsInElement = (element) => {
  const scripts = element.getElementsByTagName('script');
  for (let i = 0; i < scripts.length; i++) {
    const script = document.createElement('script');
    script.textContent = scripts[i].textContent;
    document.body.appendChild(script).parentNode.removeChild(script);
  }
}

// 신규등록 팝업
function showRegPopup() {
  const orgAdminRegisterPopWrapper = document.querySelector(".popupWrapper");
  let orgAdminRegisterPath = '/gover/orgAdminPopupReg';

  if (orgAdminRegisterPopWrapper) {
    let xhr = new XMLHttpRequest();
    xhr.open('GET', orgAdminRegisterPath, true);
    xhr.onreadystatechange = function () {
      if (xhr.readyState == 4 && xhr.status == 200) {
        orgAdminRegisterPopWrapper.innerHTML = xhr.responseText;
        runScriptsInElement(orgAdminRegisterPopWrapper);
      }
    };
    xhr.send();
    console.log('orgAdminRegisterPopWrapper작동');
  }
}

// 신규취소 팝업
function showRegCancelPopup() {
  const orgAdminRegisterPopWrapper = document.querySelector(".popupWrapper");
  let orgAdminRegisterPath = '/gover/orgAdminPopupRegCancel';

  if (orgAdminRegisterPopWrapper) {
    let xhr = new XMLHttpRequest();
    xhr.open('GET', orgAdminRegisterPath, true);
    xhr.onreadystatechange = function () {
      if (xhr.readyState == 4 && xhr.status == 200) {
        orgAdminRegisterPopWrapper.innerHTML = xhr.responseText;
        runScriptsInElement(orgAdminRegisterPopWrapper);
      }
    };
    xhr.send();
    console.log('orgAdminRegisterPopWrapper작동');
  }
}

// 수정 팝업
function showModPopup() {
  const orgAdminRegisterPopWrapper = document.querySelector(".popupWrapper");
  let orgAdminRegisterPath = '/gover/orgAdminPopupMod';

  if (orgAdminRegisterPopWrapper) {
    let xhr = new XMLHttpRequest();
    xhr.open('GET', orgAdminRegisterPath, true);
    xhr.onreadystatechange = function () {
      if (xhr.readyState == 4 && xhr.status == 200) {
        orgAdminRegisterPopWrapper.innerHTML = xhr.responseText;
        runScriptsInElement(orgAdminRegisterPopWrapper);
      }
    };
    xhr.send();
    console.log('orgAdminRegisterPopWrapper작동');
  }
}

$(document).on("click",".pendingApprovalBtn",function(){
	var ul=$(this).parent().parent().parent().parent().html();
	
	 	console.log(ul);
		var idx=$(this).parent().parent().parent().parent().find("#idx").val();
		console.log("idx:"+idx);
		const orgAdminRegisterPopWrapper = document.querySelector(".popupWrapper");
		  
		  
		 /* let orgAdminRegisterPath = '/gover/orgAdminPopupAccept';
		  var buttonElement = this;  // 일반 JavaScript로 접근
		    console.log(buttonElement);  // 현재 버튼 element를 확인
			var buttonHtml = $(this).html();  // jQuery를 사용하여 HTML 내용 가져오기
			  console.log(buttonHtml);  // 버튼 안의 HTML 내용을 출력
		  var ul=$(this).html();
		  	console.log(ul);

		  if (orgAdminRegisterPopWrapper) {
		    let xhr = new XMLHttpRequest();
		    xhr.open('GET', orgAdminRegisterPath, true);
		    xhr.onreadystatechange = function () {
		      if (xhr.readyState == 4 && xhr.status == 200) {
		        orgAdminRegisterPopWrapper.innerHTML = xhr.responseText;
		        runScriptsInElement(orgAdminRegisterPopWrapper);
		      }
		    };
		    xhr.send();
		    console.log('orgAdminRegisterPopWrapper작동:showAcceptPopup');
			
		  }*/
		  var datas={"idx":idx}
		   $.ajax({
	   	   	  url: "/gover/getGoverOfficeMngEditPage",
	   	   	  type: "POST",
	   	   	  data: datas,
	   	   })
	   	   .done(function (fragment) {
  
			   console.log("***fragment***");
			   console.log(fragment);
			   $('#approve_Popup').replaceWith(fragment);
			   const popupOpen = document.querySelector("#approve_Popup");
			                                  console.log($(popupOpen).html());
			   					  	   $(popupOpen).addClass("active");
			   					  	  // popupOpen.classList.add("active");
		   });
		  
})


// 승인 팝업
function showAcceptPopup() {
  const orgAdminRegisterPopWrapper = document.querySelector(".popupWrapper");
  
  
  let orgAdminRegisterPath = '/gover/orgAdminPopupAccept';
  var buttonElement = this;  // 일반 JavaScript로 접근
    console.log(buttonElement);  // 현재 버튼 element를 확인
	var buttonHtml = $(this).html();  // jQuery를 사용하여 HTML 내용 가져오기
	  console.log(buttonHtml);  // 버튼 안의 HTML 내용을 출력
  var ul=$(this).html();
  	console.log(ul);

  if (orgAdminRegisterPopWrapper) {
    let xhr = new XMLHttpRequest();
    xhr.open('GET', orgAdminRegisterPath, true);
    xhr.onreadystatechange = function () {
      if (xhr.readyState == 4 && xhr.status == 200) {
        orgAdminRegisterPopWrapper.innerHTML = xhr.responseText;
        runScriptsInElement(orgAdminRegisterPopWrapper);
      }
    };
    xhr.send();
    console.log('orgAdminRegisterPopWrapper작동:showAcceptPopup');
	
  }
}

// 등록버튼 클릭 이벤트
$('.vividBlueBtn').on('click', function() {
  //showRegPopup();
  		const popupOpen = document.querySelector("#registerPopup");
        console.log($(popupOpen).html());
  	   $(popupOpen).addClass("active");
  	  
});

/*
$(document).on("change","#jisa",function(){
	console.log("------jisa change------------");
})
*/


$(document).ready(function(){
	console.log("-------------orgAdmin load--------------");
	mergeTableCells("#mainTable",1);
	//mergeTableCells("#mainTable",2);
	
})


//스크롤이벤트_ 목록이 6개 이상일 경우 스크롤발생
 approveScrollLength = document.querySelectorAll(
     ".approvehistorycontent_wrap ul"
 );
 historycontent = document.querySelector(".approvehistorycontent_wrap");
 if (approveScrollLength.length >= 6) {
     historycontent.classList.add("scroll");
 } else {
     historycontent.classList.remove("scroll");
 }

 //x버튼, 닫기, 승인요청 클릭시 팝업클로즈
 approve_PopupPopupOpen = document.getElementById("approve_Popup");
 if (approve_PopupPopupOpen) {
     approve_PopupPopupOpen
         .querySelectorAll(".topCloseBtn, .finalBtn")
         .forEach(function (btn) {
             btn.addEventListener("click", () => {
                 approve_PopupPopupOpen.classList.remove("active");
             });
         });
 }

 // 체크박스 선택 이벤트
 function toggleElements() {
     const checkbox = document.getElementById("approvePopup_checkbox");
     const inputContainer = document.querySelector(".approve_hidden_text");
     const selectContainer = document.querySelector(".popContent_default");

     if (checkbox.checked) {
         inputContainer.classList.add("active");
         selectContainer.classList.remove("active");
     } else {
         inputContainer.classList.remove("active");
         selectContainer.classList.add("active");
     }
 }
 
 
 
 registerApprovePopEvet = () => {
       const registerApprovePopupOpen = document.getElementById("registerPopup");
       if (registerApprovePopupOpen) {
           registerApprovePopupOpen
               .querySelectorAll(".topCloseBtn, .closeBtn")
               .forEach(function (btn) {
                   btn.addEventListener("click", () => {

                       registerApprovePopupOpen.classList.remove("active");
                   });
                   
               });
           registerApprovePopupOpen
           .querySelectorAll(".topCloseBtn, .approveBtn")
           .forEach(function (btn) {
               btn.addEventListener("click", () => {
 				console.log("----------------approveBtn----------------");
				var formSerializeArray = $('#saveForm').serializeArray();
				var object = {};
				   for (var i = 0; i < formSerializeArray.length; i++){
					if (formSerializeArray[i].name=="togiBunhalJisangNo") continue;
						   object[formSerializeArray[i]['name']] = formSerializeArray[i]['value'];
				   }
				   console.log(object);
				   if (object.newCheck=="on") object.gubun="insert";
				   else object.gubun="modify";
                  // registerApprovePopupOpen.classList.remove("active");
				  
				  url="/gover/insertOfficeMng"; 
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
				  
				  
				  
               });
			   
			   
			  
       }
   };
   
   

   registerApprovePopEvet();

   //셀렉박스 이벤트
   function newcomplaintSelect01() {
       const registerApproveSelectWrapitems = document.querySelectorAll(
           "#registerPopup .popSelectWrap"
       );

       if (registerApproveSelectWrapitems) {
           registerApproveSelectWrapitems.forEach((contentitem) => {
               const nowIssueSelectBox01 = contentitem.querySelector("select");

               if (!nowIssueSelectBox01) return;

               const popCustomSelectBox01 = contentitem.querySelector(
                   "#registerPopup .Popup_Custom_SelectBox"
               );
               const popCustomSelectBtns01 = popCustomSelectBox01.querySelector(
                   "#registerPopup .Popup_Custom_SelectBtns"
               );

               for (let i = 0; i < nowIssueSelectBox01.length; i++) {
                   const optionValue01 = nowIssueSelectBox01.options[i].value;
                   const li01 = document.createElement("li");
                   const button01 = document.createElement("button");
                   button01.classList.add("PopupMoreSelectBtn");
                   button01.type = "button";
                   button01.textContent = optionValue01 == '' ? '전체' : optionValue01;
                   li01.appendChild(button01);
                   popCustomSelectBtns01.appendChild(li01);
               }
           });
       }
   }

   newcomplaintSelect01();

   customSelectView01 = document.querySelectorAll(
       "#registerPopup .Popup_Custom_SelectView"
   );

   if (customSelectView01) {
       customSelectView01.forEach((btn) => {
           btn.addEventListener("click", function () {
               btn.classList.toggle("active");
               if (btn.nextElementSibling) {
                   btn.nextElementSibling.classList.toggle("active");
               }
           });
       });
   }

   PopupMoreSelectBtn01 = document.querySelectorAll(
       "#registerPopup .PopupMoreSelectBtn"
   );

   if (PopupMoreSelectBtn01) {
       PopupMoreSelectBtn01.forEach((moreBtn) => {
           moreBtn.addEventListener("click", function () {
               var moreBtnText01 = moreBtn.innerText;
               console.log(moreBtnText01);
               const parentMoreBtn01 = moreBtn.closest(".Popup_Custom_SelectBtns");
               const editViewBtn01 = parentMoreBtn01.previousElementSibling;
               while (editViewBtn01.firstChild) {
                   editViewBtn01.removeChild(editViewBtn01.firstChild);
               }
               const textNode01 = document.createTextNode(moreBtnText01);

               editViewBtn01.appendChild(textNode01);
               editViewBtn01.classList.remove("active");
               parentMoreBtn01.classList.remove("active");

               const nearByContent01 = moreBtn.closest(".popSelectWrap");
               const nearBySelectBox01 = nearByContent01.querySelector("select");
               nearBySelectBox01.value = moreBtn.textContent;

               console.log(`Selected value: ${nearBySelectBox01.value}`);
			   
			   
			   var object = {};
			   				   
			   				   
			   				   object.jisa=nearBySelectBox01.value;
							   console.log(object);
			                     // registerApprovePopupOpen.classList.remove("active");
			   				 
			   				  url="/gover/getselectOfficeMng"; 
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
			   				  		   			   					
			   				  		   			   					console.log(response);
			   				  		   			   					if (response.success="Y"){
			   				  		   			   						console.log("response.success Y");
			   				  		   			   						//console.log("response.resultData length:"+response.resultData.length);
																		$("#epmt_office option").remove();
																		
																		$("#epmt_office").append('<option value="">전체</option>');
																		for(var i=0;i<response.result.length;i++){
			   				  		   			   							$("#epmt_office").append("<option value='"+response.result[i].pmt_office+"'>"+response.result[i].pmt_office+"</option>");
			   				  		   			   						}
																		newcomplaintSelect01();
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
       });
   }

   // 체크박스 선택 이벤트
   function toggleElements03() {
       const checkbox03 = document.getElementById("registerPopup_checkbox02");
       const inputContainer03 = document.querySelector("#registerPopup .register_hidden_text");
       const selectContainer03 = document.querySelector(
           "#registerPopup .register_title_th6 .Popup_Custom_SelectBox"
       );

       if (checkbox03.checked) {
           inputContainer03.classList.add("active");
           selectContainer03.classList.remove("active");
       } else {
           inputContainer03.classList.remove("active");
           selectContainer03.classList.add("active");
       }
   }