
// 토지개발 등록 시행자 관할 부서 click 이벤트

const landRegInfoAddBtnEvent01 = () => {
    const infoContentsDetailBox = document.querySelector('#landReg .adminDept .contWrap');
    const infoContentsBox = infoContentsDetailBox.querySelector('.contentsBox');
    const infoAddBtn = infoContentsDetailBox.querySelectorAll('.addBtn');
    const infoContents = infoContentsDetailBox.querySelectorAll('.contents');
    const infoTitles = infoContentsDetailBox.querySelector('.titles');

	console.log(infoContentsBox);
    infoContentsBox.addEventListener('click', function (event) {

        // 버튼 클릭시 추가되게
        if (event.target.classList.contains('addBtn')) {
            // ul 만들기
            const infoUl = document.createElement('ul');
            infoUl.classList.add('contents');

            for (let i = 1; i <= 4; i++) {
                // li 만들기
                const infoLi = document.createElement('li');
                infoLi.classList.add('content');

                if (i < 4) {
                    // input 만들기
                    const infoInput = document.createElement('input');
                    infoInput.type = 'text';

                    infoLi.appendChild(infoInput);

                } else if (i == 4) {
                    infoLi.classList.add('smallWidth');
                    infoLi.classList.add('btnBox');

                    for (let w = 0; w < 2; w++) {
                        const btnWrapDiv = document.createElement('div');
                        btnWrapDiv.classList.add('btnWrap');

                        const miniBtn = document.createElement('button');
                        miniBtn.classList.add('miniBtn');

                        if (w == 0) {
                            miniBtn.classList.add('addBtn');
                            miniBtn.textContent = '추가';
                        } else if (w == 1) {
                            miniBtn.classList.add('delBtn');
                            miniBtn.textContent = '삭제';
                        }

                        btnWrapDiv.appendChild(miniBtn);
                        infoLi.appendChild(btnWrapDiv);
                    }

                }

                infoUl.appendChild(infoLi);
                infoContentsBox.appendChild(infoUl);

            }

        }
        // 삭제 버튼 누를 때
        if (event.target.classList.contains('delBtn')) {
            var thisDelContent = event.target.closest('.contents');
            thisDelContent.remove();
        }

    })

}
landRegInfoAddBtnEvent01();

// ul의 순번을 구하는 함수

const getInfoIndexForLandReg = (event) => {
    let infoUlIndex = 0;
    let element = event;

    while ((element = element.previousElementSibling) != null) {
        if (element.classList.contains('contents')) {
            infoUlIndex++;
        }
    }

    return infoUlIndex;

}

// 토지개발 등록 -> 토지 정보 click event

const landRegInfoAddBtnEvent02 = () => {
    const infoContentsDetailBox02 = document.querySelector('#landReg .landInfo .contWrap');
    const infoContentsBox02 = infoContentsDetailBox02.querySelector('.contentsBox');
    const infoAddBtn02 = infoContentsDetailBox02.querySelectorAll('.addBtn');
    const infoContents02 = infoContentsDetailBox02.querySelectorAll('.contents');
    const infoTitles02 = infoContentsDetailBox02.querySelector('.titles');


    infoContentsBox02.addEventListener('click', function (event) {

        // 버튼 클릭시 추가되게
        if (event.target.classList.contains('addBtn')) {
            // ul 만들기
            const infoUl = document.createElement('ul');
            infoUl.classList.add('contents');

            for (let i = 1; i <= 13; i++) {
                // li 만들기
                const infoLi = document.createElement('li');
                infoLi.classList.add('content');

                if (i == 1 || i == 4) {
                    infoLi.classList.add('checkboxWrap');
                    infoLi.classList.add('smallWidth');

                    // input checkbox 세팅
                    const checkboxInput = document.createElement('input');
                    checkboxInput.type = 'checkbox';
                    

                    if (i == 1) {
                        checkboxInput.id = `landReg_checkbox_${Date.now()}_${i}`;
                    } else if (i == 4){
                        checkboxInput.id = `landReg_MainParcelChk_${Date.now()}_${i}`;
                    }

                    infoLi.appendChild(checkboxInput);

                    // label 세팅
                    const checkboxLabel = document.createElement('label');
                    checkboxLabel.setAttribute('for', checkboxInput.id);

                    infoLi.appendChild(checkboxLabel);

                } else if (1<i && i<4 || 4<i && i<7 || 7<i && i<12) {

                    if ( i == 2){
                        infoLi.classList.add('smallWidth');
                    } else if (4 < i && i < 7 || i == 11 ) {
                        infoLi.classList.add('middleWidth');
                    }
                    // input 만들기
                    const infoInput = document.createElement('input');
                    infoInput.type = 'text';
                    infoInput.readOnly = true;
                    infoInput.classList.add('notWriteInput');
                    if ( i ==  2) {
                        // 순번을 위해서
                        infoInput.classList.add('contentsNum');
                    }

                    // li안에 넣기
                    infoLi.append(infoInput);
                }  else if (i == 7) {
                    infoLi.classList.add('addressWidth');
                    // div 만들기
                    const addressDiv = document.createElement('div');
                    addressDiv.classList.add('addressData');
                    // input 만들기
                    const addressInput = document.createElement('input');
                    addressInput.classList.add('notWriteInput');
                    addressInput.readOnly = true;
                    addressInput.type = 'text';

                    // div에 input 넣기

                    addressDiv.appendChild(addressInput);
                    infoLi.appendChild(addressDiv);

                    // 검색버튼 만들기

                    const addressBtn = document.createElement('button');
                    addressBtn.classList.add('searchAddressBtn');
                    // 추가
                    addressBtn.classList.add('landRegSearchBtn');

                    addressBtn.textContent = '검색';

                    // li안에 넣기
                    infoLi.appendChild(addressBtn);
                    infoLi.classList.add('contentBox');

                } else if (i == 12) {
                    infoLi.classList.add('btnBox');
                    infoLi.classList.add('middleWidth');

                    const viewBtn = document.createElement('button');
                    // 버튼 class 삭제
                    // viewBtn.classList.add('lightBlueBtn');
                    viewBtn.classList.add('viewDetailButton');
                    viewBtn.textContent = '위치보기';

                    infoLi.appendChild(viewBtn);
                } else if (i == 13) {
                    infoLi.classList.add('middleWidth');
                    infoLi.classList.add('btnBox');

                    for (let w = 0; w < 2; w++) {
                        const btnWrapDiv = document.createElement('div');
                        btnWrapDiv.classList.add('btnWrap');

                        const miniBtn = document.createElement('button');
                        miniBtn.classList.add('miniBtn');

                        if (w == 0) {
                            miniBtn.classList.add('addBtn');
                            miniBtn.textContent = '추가';
                        } else if (w == 1) {
                            miniBtn.classList.add('delBtn');
                            miniBtn.textContent = '삭제';
                        }

                        btnWrapDiv.appendChild(miniBtn);
                        infoLi.appendChild(btnWrapDiv);
                    }

                }

                infoUl.appendChild(infoLi);
                infoContentsBox02.appendChild(infoUl);

            }

            // 순번
            const contentsNum = infoUl.querySelector('.contentsNum');
            contentsNum.placeholder = getInfoIndexForLandReg(infoUl) + 1;

        }
        // 삭제 버튼 누를 때
        if (event.target.classList.contains('delBtn')) {
            var thisDelContent = event.target.closest('.contents');
            thisDelContent.remove();

            const nowContents = infoContentsBox02.querySelectorAll('.contents');
            nowContents.forEach((ul) => {
                const newUlNum = ul.querySelector('.contentsNum');
                newUlNum.placeholder = getInfoIndexForLandReg(ul) + 1;

            })
        }

    })

}
landRegInfoAddBtnEvent02();

// 파일 첨부시 모습 변경

const landRegFileEvent = () => {
    const landReg_myPcFiles = document.getElementById('landReg_myPcFiles');
    const parcelAttachments = landReg_myPcFiles.closest('.parcelAttachments');
    const fileContWrap = parcelAttachments.querySelector('.contWrap');
    const fileTitles = fileContWrap.querySelector('#landReg .parcelAttachments .depth1 .titles');
    const contentsBox = fileContWrap.querySelector('.contentsBox');
    var fileInfoName = '';

    landReg_myPcFiles.addEventListener('change', function () {

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

        var dateFommat = year + '-' + month + '-' + day + '\u00A0' + hours + ':' + mins + ':' + seconds;

        console.log('입력 변경 시각:', dateFommat);

        if (landReg_myPcFiles.files.length > 0) {
            for (let i = 0; i <= landReg_myPcFiles.files.length - 1; i++) {

                const thisFileName = landReg_myPcFiles.files[i].name;

                fileInfoName = thisFileName;

                const checkboxLi = `<li class="content01 content"><input type="checkbox" id="landRegcustomCheckbox${i}"><label for="landRegcustomCheckbox${i}"></label>
                                    </li>`;

                const dateLi = `<li class="content02 content"><p>${dateFommat}</p></li>`;

                const filenameLi = `<li class="content03 content"><p>${fileInfoName}</p></li>`;

                const viewBtnLi = `<li class="content04 content">
                                        <button class="viewDetailButton">보기</button>
                                    </li>`;

                const listBox = checkboxLi + dateLi + filenameLi + viewBtnLi;

                const ContentsUl = document.createElement('ul');
                ContentsUl.classList.add('contents');

                ContentsUl.innerHTML = listBox;

                contentsBox.appendChild(ContentsUl);


                fileInfoName = '';

            }

            // 값 잘 담겼는지 확인
            console.log(landReg_myPcFiles.value)

            // titles border주기
            fileTitles.classList.add('active');

            if (landReg_myPcFiles.files.length >= 5) {
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
landRegFileEvent()

/* 검색결과팝업 */
// 검색결과 선택박스 포함된 팝업

const landRegOpenPopUp = () => {

    // 주석처리
//    const landRegSearchBtn = document.querySelectorAll("#landReg .landRegSearchBtn");
   const landRegSearchPop = document.querySelector(".landRegSearchPopWrapper");
    //    let landRegResultFilePath = '/components/popuphtml/searchResultsPopup.html'; // 삽입할 html 파일 경로
    // 추가
    let landRegResultFilePath = '/components/popuphtml/issueCodePopup/chkResultPop.html'; // 삽입할 html 파일 경로

    // 추가
    const landInfoContents = document.querySelector('#landReg .landInfo .contWrap .contentsBox');


//    if(landRegSearchBtn){
// 추가
    if (landInfoContents){
      
      let xhr = new XMLHttpRequest();
      xhr.open('GET', landRegResultFilePath, true);
      xhr.onreadystatechange = function() {
          if (xhr.readyState == 4 && xhr.status == 200) {
              landRegSearchPop.innerHTML = xhr.responseText;
              runScriptsInElement(landRegSearchPop); // 삽입된 html내 스크립트 실행 함수 호출
          }
      };
      xhr.send();
    //   console.log('landRegResultPop 작동');
    // 추가
       console.log('chkResultPop 작동');

    //    주석처리
    //    landRegSearchBtn.forEach((btn) => {

    //      btn.addEventListener("click" , () => {
      
    //         // const popupOpen = document.querySelector("#searchResultsPopup .popupWrap");
    //          const chkResultPopup = document.getElementById("chkResultPopup");
           
    //          chkResultPopup.classList.add("active");
  
    //     })
    //   })
    landInfoContents.addEventListener('click',function(event){

        if (event.target.classList.contains('landRegSearchBtn')) {

            const chkResultPopup = document.getElementById("chkResultPopup");

            chkResultPopup.classList.add("active");
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

landRegOpenPopUp();



/* 엑셀업로드팝업 */

const landRegExcelPopEvet = () => {

    const landRegExcelPopBtn = document.querySelector("#landReg .landRegExcelPopBtn");
    const landRegExcelPopWrapper = document.querySelector(".landRegExcelPopWrapper");
    let landRegExcelFilePath = '/components/popuphtml/occupancy_Popup/exceluploadPopup.html'; // 엑셀업로드

    if(landRegExcelPopBtn){

        let xhr = new XMLHttpRequest();
        xhr.open('GET', landRegExcelFilePath , true);
        xhr.onreadystatechange = function() {
            if (xhr.readyState == 4 && xhr.status == 200) {
                landRegExcelPopWrapper.innerHTML = xhr.responseText;
                runScriptsInElement(landRegExcelPopWrapper); // 삽입된 html내 스크립트 실행 함수 호출
            }
        };
        xhr.send();
        console.log('landRegExcelPopWrapper 작동');


        landRegExcelPopBtn.addEventListener("click" , () => {
            const popupOpen = document.getElementById("exceluploadPopup");

            if(popupOpen){

                popupOpen.classList.add("active");
            }

        })

   // 삽입된 html내 스크립트 실행 함수
   const runScriptsInElement = (element) => {
       const scripts = element.getElementsByTagName('script');
       for (let i = 0; i < scripts.length; i++) {
           const script = document.createElement('script');
           console.log(script);
           script.textContent = scripts[i].textContent;
           document.body.appendChild(script).parentNode.removeChild(script);
       }
   }


    }

}

landRegExcelPopEvet();


