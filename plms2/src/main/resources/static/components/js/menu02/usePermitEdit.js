// 대상토지 click 이벤트

const usePermitEditInfoAddBtnEvent = () => {
    const infoContentsDetailBox = document.querySelector('#usePermitEdit .targetLand .contWrap');
    const infoContentsBox = infoContentsDetailBox.querySelector('.contentsBox');
    const infoAddBtn = infoContentsDetailBox.querySelectorAll('.addBtn');
    const infoContents = infoContentsDetailBox.querySelectorAll('.contents');
    const infoTitles = infoContentsDetailBox.querySelector('.titles');


    infoContentsBox.addEventListener('click', function (event) {

        // 버튼 클릭시 추가되게
        if (event.target.classList.contains('addBtn')) {
            // ul 만들기
            const infoUl = document.createElement('ul');
            infoUl.classList.add('contents');

            for (let i = 1; i <= 5; i++) {
                // li 만들기
                const infoLi = document.createElement('li');
                infoLi.classList.add('content');

                if (i == 1) {
                    // 첫번째 li
                    infoLi.classList.add('addressInfoWidth');
                    infoLi.classList.add('addressInfoBox');
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
                    addressBtn.textContent = '검색';

                    // li안에 넣기
                    infoLi.appendChild(addressBtn);


                } else if (i == 2) {
                    infoLi.classList.add('contentBox');
                    // ul.secondContents 만들기
                    const secondUl = document.createElement('ul');
                    secondUl.classList.add('secondContents');

                    for (let q = 0; q < 5; q++) {
                        // li.secondContent 만들기
                        const secondLi = document.createElement('li');
                        secondLi.classList.add('secondContent');

                        if (q == 3) {
                            secondLi.classList.add('largeSecondTitle');

                        }

                        // input 만들기
                        const secondInput = document.createElement('input');
                        secondInput.type = 'text';

                        if (q != 3) {
                            secondInput.readOnly = true;
                            secondInput.classList.add('notWriteInput');
                        }

                        secondLi.appendChild(secondInput);
                        secondUl.appendChild(secondLi);
                    }

                    infoLi.appendChild(secondUl);
                } else if (2 < i && i < 5) {

                    const infoInput = document.createElement('input');
                    infoInput.type = 'text';
                    infoInput.readOnly = true;
                    infoInput.classList.add('notWriteInput');

                    // li안에 넣기
                    infoLi.append(infoInput);

                } else if (i == 5) {
                    infoLi.classList.add('titleBtnWrap');
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
        // 토지 추가 검색 팝업 버튼
        if (event.target.classList.contains('searchAddressBtn')) {
            var searchBtn = event.target;
            const popupOpen = document.querySelector("#land_searchResultsPopup .popupWrap");
            searchBtn.classList.add("open");
            popupOpen.classList.add("active");
        }

    })

}
usePermitEditInfoAddBtnEvent();


/* 토지추가검색팝업오픈 */

const landAddSearchResultOpenPopUp02 = () => {

   const landAddSearchBtn02 = document.querySelectorAll("#usePermitEdit .searchAddressBtn");
   const landAddSearchResultPop02 = document.querySelector(".usePermitEditLandSearchWrapper");
   let htmlFilePath = '/components/popuphtml/land_searchResultsPopup.html'; // 삽입할 html 파일 경로

   if(landAddSearchBtn02.length > 0){
      
      let xhr = new XMLHttpRequest();
      xhr.open('GET', htmlFilePath, true);
      xhr.onreadystatechange = function() {
          if (xhr.readyState == 4 && xhr.status == 200) {
              landAddSearchResultPop02.innerHTML = xhr.responseText;
              runScriptsInElement(landAddSearchResultPop02); // 삽입된 html내 스크립트 실행 함수 호출
          }
      };
      xhr.send();
      console.log('landRightSearchResultPop 작동');

      landAddSearchBtn02.forEach((btn) => {
         btn.addEventListener("click" , () => {

            const popupOpen = document.querySelector("#land_searchResultsPopup .popupWrap");
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

landAddSearchResultOpenPopUp02();