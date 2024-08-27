const orgAdminManagePopEvet = () => {
    
   const orgAdminRegisterPopWrapper = document.querySelector(".orgAdminRegisterPopWrapper");
   const orgAdminApprovePopWrapper = document.querySelector(".orgAdminApprovePopWrapper");
   const orgAdminRevisePopWrapper = document.querySelector(".orgAdminRevisePopWrapper");
   const orgAdminRegisterApprovePopWrapper = document.querySelector(".orgAdminRegisterApprovePopWrapper");

   let orgAdminRegisterPath = '/components/popuphtml/occupancy_Popup/registercancelPopup.html'; // 관리기간등록(등록취소버튼)
   let orgAdminApprovPath = '/components/popuphtml/occupancy_Popup/approvePopup.html'; // 관리기간승인
   let orgAdminRevisePath = '/components/popuphtml/occupancy_Popup/approvecorrectionPopup.html'; // 관리기간수정
   let orgAdminRegisterApprovePath = '/components/popuphtml/occupancy_Popup/registerPopup.html'; // 관리기간등록(승인요청버튼)

   if(orgAdminRegisterPopWrapper){

      let xhr = new XMLHttpRequest();
      xhr.open('GET', orgAdminRegisterPath, true);
      xhr.onreadystatechange = function() {
          if (xhr.readyState == 4 && xhr.status == 200) {
            orgAdminRegisterPopWrapper.innerHTML = xhr.responseText;
              runScriptsInElement(orgAdminRegisterPopWrapper); // 삽입된 html내 스크립트 실행 함수 호출
          }
      };
      xhr.send();
      console.log('orgAdminRegisterPopWrapper작동');


   }
   if(orgAdminApprovePopWrapper){

      let xhr = new XMLHttpRequest();
      xhr.open('GET', orgAdminApprovPath, true);
      xhr.onreadystatechange = function() {
          if (xhr.readyState == 4 && xhr.status == 200) {
            orgAdminApprovePopWrapper.innerHTML = xhr.responseText;
              runScriptsInElement(orgAdminApprovePopWrapper); // 삽입된 html내 스크립트 실행 함수 호출
          }
      };
      xhr.send();
      console.log('orgAdminApprovePopWrapper작동');

   }
   if(orgAdminRevisePopWrapper){

      let xhr = new XMLHttpRequest();
      xhr.open('GET', orgAdminRevisePath, true);
      xhr.onreadystatechange = function() {
          if (xhr.readyState == 4 && xhr.status == 200) {
            orgAdminRevisePopWrapper.innerHTML = xhr.responseText;
              runScriptsInElement(orgAdminRevisePopWrapper); // 삽입된 html내 스크립트 실행 함수 호출
          }
      };
      xhr.send();
      console.log('orgAdminRevisePopWrapper작동');

   }
   if(orgAdminRegisterApprovePopWrapper){

      let xhr = new XMLHttpRequest();
      xhr.open('GET', orgAdminRegisterApprovePath, true);
      xhr.onreadystatechange = function() {
          if (xhr.readyState == 4 && xhr.status == 200) {
            orgAdminRegisterApprovePopWrapper.innerHTML = xhr.responseText;
              runScriptsInElement(orgAdminRegisterApprovePopWrapper); // 삽입된 html내 스크립트 실행 함수 호출
          }
      };
      xhr.send();
      console.log('orgAdminRegisterApprovePopWrapper작동');

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

orgAdminManagePopEvet();