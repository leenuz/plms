
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


const feeDetailCangehistoryPopEvet = () => {
    
   const historyBtn = document.querySelector("#feeDetail .historyBtn");
   const feeDetailCangehistoryPopWrappers = document.querySelector(".feeDetailCangehistoryPopWrappers");
   let htmlFilePath = '/components/popuphtml/changehistoryPopup.html'; // 삽입할 html 파일 경로

   if(feeDetailCangehistoryPopWrappers){

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

      historyBtn.addEventListener("click" , () => {
        
        const popupOpen = document.getElementById("changehistoryPopup");
        console.log(popupOpen)
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

feeDetailCangehistoryPopEvet();