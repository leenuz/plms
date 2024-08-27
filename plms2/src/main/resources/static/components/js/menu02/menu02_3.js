
const dopcosurfaceInquireOpenPopUp = () => {

    const dopcosurfaceInquire = document.querySelectorAll("#dopcosurfaceInquire03 .positionPopBtn");
    const inquirePositionPop = document.querySelector(".inquirePositionPopWrapper");
    let htmlFilePath = '/components/popuphtml/divisionRegister_searchResultsPopup.html'; // 삽입할 html 파일 경로


    if(dopcosurfaceInquire.length > 0){

      let xhr = new XMLHttpRequest();
      xhr.open('GET', htmlFilePath, true);
      xhr.onreadystatechange = function() {
          if (xhr.readyState == 4 && xhr.status == 200) {
              inquirePositionPop.innerHTML = xhr.responseText;
              runScriptsInElement(inquirePositionPop); // 삽입된 html내 스크립트 실행 함수 호출
          }
      };
      xhr.send();
      console.log('inquirePositionPop 작동');

      dopcosurfaceInquire.forEach((btn) => {

       btn.addEventListener("click" , () => {

           const popupOpen = document.querySelector("#divisionRegister_searchResultsPopup .popupWrap");
           if(popupOpen){

            btn.classList.add("open");
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

dopcosurfaceInquireOpenPopUp();