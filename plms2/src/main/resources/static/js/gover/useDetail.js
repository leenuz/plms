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

useDetailCangehistoryPopEvet();