

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







