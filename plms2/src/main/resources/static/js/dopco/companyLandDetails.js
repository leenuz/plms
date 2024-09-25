const memoEditBtn = document.querySelectorAll('#companyLandDetails .memoSection .editBtn')
const editBefore = document.querySelectorAll('#companyLandDetails .memoSection .contents .content.btnBox .editBefore');
const editAfter = document.querySelectorAll('#companyLandDetails .memoSection .contents .content.btnBox .editAfter');
const editContent = document.querySelectorAll('#companyLandDetails .editSpace');
const registBtn = document.querySelectorAll('#companyLandDetails .registBtn');

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

            var thisEditContent01 = regiBtn.closest('.contents');
            thisEditContent01.classList.remove('editing');

            const inputs = thisEditContent01.querySelectorAll('input');
            inputs.forEach(input => {
                input.setAttribute('readonly', 'readonly');
            });
        })
    })
}

/* 이슈등록 클릭시 팝업오픈 */

const issueRegisterPopUpOpenEvet = () => {

     const issuePopBtn = document.querySelector(".issuePopBtn");
     const IssueRegisterPop = document.querySelector(".issueRegisterPopWrapper");
     let htmlFilePath = '/components/popuphtml/newIssuePopup.html'; // 삽입할 html 파일 경로

     let xhr = new XMLHttpRequest();
     xhr.open('GET', htmlFilePath, true);
     xhr.onreadystatechange = function() {
         if (xhr.readyState == 4 && xhr.status == 200) {
             IssueRegisterPop.innerHTML = xhr.responseText;
             runScriptsInElement(IssueRegisterPop); // 삽입된 html내 스크립트 실행 함수 호출
         }
     };
     xhr.send();
     console.log(' IssueRegisterPop 작동');

     issuePopBtn.addEventListener("click" , () => {
        
          const popupOpen = document.querySelector("#newIssuePopup .popupWrap");
                issuePopBtn.classList.add("open");
                popupOpen.classList.add("active");

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

issueRegisterPopUpOpenEvet();



const issueRevisePopUpOpenEvet = () => {

     const issueReviseBtn = document.querySelectorAll(".issueReviseBtn");

     if(issueReviseBtn){

        const IssueRevisePop = document.querySelector(".issueRevisePopWrapper");
        let htmlFilePath = '/components/popuphtml/editIssuePopup.html'; // 삽입할 html 파일 경로
   
        let xhr = new XMLHttpRequest();
        xhr.open('GET', htmlFilePath, true);
        xhr.onreadystatechange = function() {
            if (xhr.readyState == 4 && xhr.status == 200) {
                IssueRevisePop.innerHTML = xhr.responseText;
                runScriptsInElement(IssueRevisePop); // 삽입된 html내 스크립트 실행 함수 호출
            }
        };
        xhr.send();
        console.log('IssueRevisePop작동');

        issueReviseBtn.forEach((btns) => {
            btns.addEventListener("click" , () => {
                 btns.classList.add("open");
                 const popupOpen = document.querySelector("#editIssuePopup .popupWrap");
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

issueRevisePopUpOpenEvet();