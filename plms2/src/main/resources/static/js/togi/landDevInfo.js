/* 전자결재 문서 팝업 */

const landDevInfoapprovalPopEvet = () => {

   const approvalBtn = document.querySelector("#landDevInfo .approvalBtn");
   const landDevInfoApprovalPopWrapper = document.querySelector(".landDevInfoApprovalPopWrapper");
   let approvalFilePath = '/components/popuphtml/land_develop_Popup/add_documentPopup.html'; // 전자결재

   if(approvalBtn){

      let xhr = new XMLHttpRequest();
      xhr.open('GET', approvalFilePath, true);
      xhr.onreadystatechange = function() {
          if (xhr.readyState == 4 && xhr.status == 200) {
            landDevInfoApprovalPopWrapper.innerHTML = xhr.responseText;
              runScriptsInElement(landDevInfoApprovalPopWrapper); // 삽입된 html내 스크립트 실행 함수 호출
          }
      };
      xhr.send();
      console.log('landDevInfoApprovalPopWrapper 작동');
      approvalBtn.addEventListener("click" , () => {
      
          const popupOpen = document.getElementById("add_document_Popup");
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

//landDevInfoapprovalPopEvet();