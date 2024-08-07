//const memoEditBtn = document.querySelectorAll('#groundDetail .memoSection .editBtn')
const editBefore = document.querySelectorAll('#groundDetail .memoSection .contents .content.btnBox .editBefore');
const editAfter = document.querySelectorAll('#groundDetail .memoSection .contents .content.btnBox .editAfter');
const editContent = document.querySelectorAll('#groundDetail .editSpace');
const registBtn = document.querySelectorAll('#groundDetail .registBtn');

/*memoEditBtn.forEach((btn) => {
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
*/
if(registBtn) {
    registBtn.forEach((regiBtn)=> {
        regiBtn.addEventListener('click',function(){

            var thisEditContent01 = regiBtn.closest('.contents');
            thisEditContent01.classList.remove('editing')

            const inputs = thisEditContent01.querySelectorAll('input');
            inputs.forEach(input => {
                input.setAttribute('readonly', 'readonly');
            });
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
    /* const runScriptsInElement = (element) => {
      // const scripts = element.getElementsByTagName('script');
       for (let i = 0; i < scripts.length; i++) {
           const script = document.createElement('script');
           script.textContent = scripts[i].textContent;
           document.body.appendChild(script).parentNode.removeChild(script);
       }
   }*/

}

groundIssueReviseOpen();