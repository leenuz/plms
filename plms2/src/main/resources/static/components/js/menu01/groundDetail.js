// 메모 부분들 event
const groundDetailsMemoAddBtnEvent = () => {
    const memoContentsDetailBox = document.querySelector('#groundDetail .memoSection .contentDetailBox');
    const memoContentsBox = memoContentsDetailBox.querySelector('.contentsBox');
    const memoAddBtn = memoContentsDetailBox.querySelectorAll('.addBtn');
    const memoContents = memoContentsDetailBox.querySelectorAll('.contents');
    const memoTitles = memoContentsDetailBox.querySelector('.titles');


    memoContentsBox.addEventListener('click', function(event) {
        
        // 버튼 클릭시 추가되게
        if (event.target.classList.contains('addBtn')) {
            // ul 만들기
            const memoUl = document.createElement('ul');
            memoUl.classList.add('contents');
            
            for(let i=1; i<=5; i++) {
                // li 만들기
                const memoLi = document.createElement('li');
                memoLi.classList.add('content');
                memoLi.classList.add(`content0${i}`);
                
                if(i<4) {
                    memoLi.classList.add('editSpace');
                    const memoInput = document.createElement('input');

                    memoInput.classList.add('editingContent');
                    memoInput.type = 'text';
                    memoInput.readOnly = true;

                    memoLi.append(memoInput);
                }

                if (i == 4) {
                    const memoDiv = document.createElement('div');
                    memoDiv.classList.add('btnsWrap');


                    const memoEditBtn = document.createElement('button');
                    memoEditBtn.textContent = '수정' 
                    memoEditBtn.classList.add('editBtn');
                    memoEditBtn.classList.add('miniBtn');

                    memoDiv.appendChild(memoEditBtn);
                    memoLi.classList.add('editSpace');
                    memoLi.appendChild(memoDiv);
                }
                // content05의 경우
                if (i == 5) {
                    memoLi.classList.add('btnBox');

                    // div가 두개
                    for (let d = 0; d<2;d++) {
                        const editDiv = document.createElement('div');

                        // 첫번째 div 설정
                        if (d == 0) {
                            editDiv.classList.add('editBefore');

                            // div 안에 div 두개
                            for (let g=0; g<2;g++) {
                                const btnWrapDiv = document.createElement('div');

                                btnWrapDiv.classList.add('btnWrap');
                                const memoMiniBtn = document.createElement('button');

                                if (g == 0) {
                                    memoMiniBtn.classList.add('addBtn');
                                    memoMiniBtn.classList.add('miniBtn');
                                    memoMiniBtn.textContent = '추가';
                                } else if (g == 1) {
                                    memoMiniBtn.classList.add('delBtn');
                                    memoMiniBtn.classList.add('miniBtn');
                                    memoMiniBtn.textContent = '삭제';
                                }

                                btnWrapDiv.appendChild(memoMiniBtn);
                                
                                editDiv.appendChild(btnWrapDiv);

                            }
                        } else if (d == 1) {
                            editDiv.classList.add('editAfter');

                            const btnWrapDiv = document.createElement('div');

                            btnWrapDiv.classList.add('newBtnWrap');

                            const memoMiniBtn = document.createElement('button');
                            memoMiniBtn.classList.add('registBtn');
                            memoMiniBtn.classList.add('miniBtn');
                            memoMiniBtn.textContent = '등록'
                            btnWrapDiv.appendChild(memoMiniBtn);

                            editDiv.appendChild(btnWrapDiv);
                        }
                        
                        memoLi.appendChild(editDiv);
                    }
                    
                }

                memoUl.appendChild(memoLi);

                memoContentsBox.appendChild(memoUl);
            }
        }
        // 수정 버튼 누를 때
        if (event.target.classList.contains('editBtn')) {
            var thisEditContent = event.target.closest('.contents');
        
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
            
        }
        // 등록 버튼 누를 때
        if (event.target.classList.contains('registBtn')) {
            var thisRegistContent = event.target.closest('.contents');
            thisRegistContent.classList.remove('editing')

            const inputs = thisRegistContent.querySelectorAll('input');
            inputs.forEach(input => {
                input.setAttribute('readonly', 'readonly');
            });
        }
        // 삭제 버튼 누를 때
        if (event.target.classList.contains('delBtn')) {
            var thisDelContent = event.target.closest('.contents');

            thisDelContent.remove();

        }

        
        const memoContents = memoContentsDetailBox.querySelectorAll('.contents');

        if (memoContents.length > 4) {
            memoContentsBox.classList.add('contentScr');
            memoTitles.classList.add('titleScr');


        } else {
            memoContentsBox.classList.remove('contentScr');
            memoTitles.classList.remove('titleScr');
        }
        

    })

}
groundDetailsMemoAddBtnEvent();


// const memoBtnActionEvent = () => {

    // const memoEditBtn = document.querySelectorAll('#groundDetail .memoSection .editBtn')
    // const editBefore = document.querySelectorAll('#groundDetail .memoSection .contents .content.btnBox .editBefore');
    // const editAfter = document.querySelectorAll('#groundDetail .memoSection .contents .content.btnBox .editAfter');
    // const editContent = document.querySelectorAll('#groundDetail .editSpace');
    // const registBtn = document.querySelectorAll('#groundDetail .registBtn');
    
    // memoEditBtn.forEach((btn) => {
    //     btn.addEventListener('click', function () {
    //         var thisEditContent = btn.closest('.contents');
    //         console.log(thisEditContent);
    
    //         thisEditContent.classList.add('editing');
            
    //         // const inputs = thisEditContent.querySelectorAll('input');
    //         const inputs = thisEditContent.querySelectorAll('.editSpace input');
    
    //         if (thisEditContent.classList.contains('editing')) {
    //             inputs.forEach(input => {
    //                 input.removeAttribute('readonly');
    //             });
    //         } else {
    //             inputs.forEach(input => {
    //                 input.setAttribute('readonly', 'readonly');
    //             });
    //         }
    
    
    
    //     })
    // })
    
    // if(registBtn) {
    //     registBtn.forEach((regiBtn)=> {
    //         regiBtn.addEventListener('click',function(){
    
    //             var thisEditContent01 = regiBtn.closest('.contents');
    //             thisEditContent01.classList.remove('editing')
    
    //             const inputs = thisEditContent01.querySelectorAll('input');
    //             inputs.forEach(input => {
    //                 input.setAttribute('readonly', 'readonly');
    //             });
    //         })
    //     })
    // }


// }
// memoBtnActionEvent();

// 잠재이슈 팝업
/* 이슈등록 클릭시 팝업오픈 */

const groundIssueRegisterPopUpOpenEvet = () => {

    const issuePopBtn = document.querySelector(".issuePopBtn");
    const IssueRegisterPop = document.querySelector(".issueRegisterPopWrapper");
    let htmlFilePath = '/components/popuphtml/newIssuePopup.html'; // 삽입할 html 파일 경로

    let xhr = new XMLHttpRequest();
    xhr.open('GET', htmlFilePath, true);
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4 && xhr.status == 200) {
            IssueRegisterPop.innerHTML = xhr.responseText;
            runScriptsInElement(IssueRegisterPop); // 삽입된 html내 스크립트 실행 함수 호출
        }
    };
    xhr.send();
    console.log(' IssueRegisterPop 작동');

    issuePopBtn.addEventListener("click", () => {

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

groundIssueRegisterPopUpOpenEvet();

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
               groundIssueRevisePop.innerHTML = xhr.responseText;
               runScriptsInElement(groundIssueRevisePop); // 삽입된 html내 스크립트 실행 함수 호출
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

// 파일 첨부시 모습 변경

const groundDetailFileEvent = () => {
    const groundDetail_myPcFiles = document.getElementById('groundDetail_myPcFiles');
    const parcelAttachments = groundDetail_myPcFiles.closest('.parcelAttachments');
    const fileContWrap =  parcelAttachments.querySelector('.contWrap');
    const fileTitles = fileContWrap.querySelector('#groundDetail .parcelAttachments .depth1 .titles');
    const contentsBox = fileContWrap.querySelector('.contentsBox');
    var fileInfoName = '';

    groundDetail_myPcFiles.addEventListener('change', function(){
        
        // 기존의 ul 초기화

        const existContents = fileContWrap.querySelectorAll('.contents')

        existContents.forEach((list) => {
            list.remove();
        })

        
        fileTitles.classList.remove('active');
        contentsBox.classList.remove('contentScr');
        fileTitles.classList.remove('titleScr');

        // 시간 구하기

        const addDate = new Date();

        var year = addDate.getFullYear();
        var month = ('0' + (addDate.getMonth() + 1)).slice(-2);
        var day = ('0' + addDate.getDate()).slice(-2);
        var hours = ('0' + addDate.getHours()).slice(-2);
        var mins = ('0' + addDate.getMinutes()).slice(-2);
        var seconds = ('0' + addDate.getSeconds()).slice(-2);

        var dateFommat = year + '-' + month + '-' + day + '\u00A0' + hours +':'+mins+':'+seconds;

        console.log('입력 변경 시각:', dateFommat);

        if(groundDetail_myPcFiles.files.length > 0) {
            for (let i = 0 ; i <= groundDetail_myPcFiles.files.length-1 ; i++) {

                const thisFileName = groundDetail_myPcFiles.files[i].name;

                fileInfoName = thisFileName;

                const checkboxLi = `<li class="content01 content"><input type="checkbox" id="groundcustomCheckbox${i}"><label for="groundcustomCheckbox${i}"></label>
                                    </li>`;

                const dateLi = `<li class="content02 content">${dateFommat}</li>`;

                const filenameLi = `<li class="content03 content">
                                        ${fileInfoName}
                                    </li>`;

                const viewBtnLi = `<li class="content04 content">
                                        <button class="viewDetailButton">보기</button>
                                    </li>`;

                const listBox = checkboxLi + dateLi + filenameLi + viewBtnLi;

                const ContentsUl = document.createElement('ul');
                ContentsUl.classList.add('contents');

                ContentsUl.innerHTML = listBox;

                contentsBox.appendChild(ContentsUl);
                

                fileInfoName='';

            }

            // 값 잘 담겼는지 확인
            console.log(groundDetail_myPcFiles.value)

            // titles border주기
            fileTitles.classList.add('active');

            if (groundDetail_myPcFiles.files.length >= 5) {
                contentsBox.classList.add('contentScr');
                fileTitles.classList.add('titleScr');
            }
        } else {
            // titles border 빼기
            fileTitles.classList.remove('active');
            contentsBox.classList.remove('contentScr');
            fileTitles.classList.remove('titleScr');
        }

    })
    
}


groundDetailFileEvent();