/* 이슈보기팝업 */

const IssuePopupOpenEvet = () => {

    const issuePopBtn = document.querySelectorAll("#dopcoIssueManage .issuePopBtn");
    const issueManageIssuePopWrap = document.querySelector(".issueManageIssuePopWrapper");
    let issuePopFilePath = '/components/popuphtml/issue_management_Popup/issue_Popup.html'; // 삽입할 html 파일 경로
    
    if(issuePopBtn){


      let xhr = new XMLHttpRequest();
      xhr.open('GET', issuePopFilePath , true);
      xhr.onreadystatechange = function() {
          if (xhr.readyState == 4 && xhr.status == 200) {
              issueManageIssuePopWrap.innerHTML = xhr.responseText;
              runScriptsInElement( issueManageIssuePopWrap); // 삽입된 html내 스크립트 실행 함수 호출
          }
      };
      xhr.send();
      console.log('issueManageIssuePopWrap 작동');

      issuePopBtn.forEach((btn) => {

         btn.addEventListener("click" , () => {

            const popupOpen = document.getElementById("issuePopup");
 
            if(popupOpen){
 
               popupOpen.classList.add("active");
            }
 
        })
           
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

IssuePopupOpenEvet();



/* 신규민원등록 팝업 */

const newIssueRegisterOpenEvet = () => {

   const newIssueBtn = document.querySelector("#dopcoIssueManage .newIssueBtn");
   const issueManageNewIssuePopWrap = document.querySelector(".issueManageNewIssuePopWrapper");
   let newIssuePopFilePath = '/components/popuphtml/issue_management_Popup/newcomplaint.html'; // 삽입할 html 파일 경로
   
   if(newIssueBtn){


    let xhr = new XMLHttpRequest();
    xhr.open('GET', newIssuePopFilePath , true);
    xhr.onreadystatechange = function() {
        if (xhr.readyState == 4 && xhr.status == 200) {
            issueManageNewIssuePopWrap.innerHTML = xhr.responseText;
            runScriptsInElement(issueManageNewIssuePopWrap ); // 삽입된 html내 스크립트 실행 함수 호출
        }
    };
    xhr.send();
    console.log('issueManageNewIssuePopWrap 작동');


    newIssueBtn.addEventListener("click" , () => {

        const popupOpen = document.getElementById("newcomplaint_Popup");
        if(popupOpen){
            popupOpen.classList.add("active");


            // js 추가
            const issueManageLandStatusPopWrapper = document.querySelector(".issueManageLandStatusPopWrapper");
            if (issueManageLandStatusPopWrapper.classList.contains('passed')) { return };

            let landStatusPopFilePath = '/components/popuphtml/issueCodePopup/landStatusPop.html'; // 삽입할 html 파일 경로

            let xhr = new XMLHttpRequest();
            xhr.open('GET', landStatusPopFilePath, true);
            xhr.onreadystatechange = function () {
                if (xhr.readyState == 4 && xhr.status == 200) {
                    issueManageLandStatusPopWrapper.innerHTML = xhr.responseText;
                    runScriptsInElement(issueManageLandStatusPopWrapper); // 삽입된 html내 스크립트 실행 함수 호출
                }
            };
            xhr.send();
            console.log('issueManageLandStatusPopWrapper 작동');

            issueManageLandStatusPopWrapper.classList.add('passed')
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

newIssueRegisterOpenEvet()


/* 현황통계 팝업 오픈 */

const issueTotalPopOpenEvet = () => {

    const issueManageTotalBtn = document.querySelector("#dopcoIssueManage .issueManageTotalBtn");
    const issueManageIssueTotalPopWrap = document.querySelector(".issueManageIssueTotalWrapper");
    let issueTotalPopFilePath = '/components/popuphtml/issueTotalPop.html'; // 삽입할 html 파일 경로
    
    if(issueManageTotalBtn){
 
      let xhr = new XMLHttpRequest();
      xhr.open('GET',  issueTotalPopFilePath, true);
      xhr.onreadystatechange = function() {
          if (xhr.readyState == 4 && xhr.status == 200) {
              issueManageIssueTotalPopWrap.innerHTML = xhr.responseText;
              runScriptsInElement(issueManageIssueTotalPopWrap); // 삽입된 html내 스크립트 실행 함수 호출
          }
      };
      xhr.send();
      console.log('issueManageIssueTotalPopWrap 작동');
 
 
       issueManageTotalBtn.addEventListener("click" , () => {
 
            const popupOpen = document.getElementById("issueTotalPopContent");
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
 

issueTotalPopOpenEvet()


