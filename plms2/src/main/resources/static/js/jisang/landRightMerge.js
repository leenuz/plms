// 커스텀 selectbox

// createCustomLiLandMerge();

// function createCustomLiLandMerge() {
//     const contentItems = document.querySelectorAll('.selectContentArea');

//     contentItems.forEach(contentItem => {
//         const notsetAddSelectBox = contentItem.querySelector('select');
//         // select가 없으면 return
//         if (!notsetAddSelectBox) return;

//         const customSelectBox = contentItem.querySelector('.customSelectBox');
//         const customSelectBtns = customSelectBox.querySelector('.customSelectBtns');

//         for (let i = 0; i < notsetAddSelectBox.length; i++) {
//             const optionValue = notsetAddSelectBox.options[i].value;
//             const li = document.createElement('li');
//             const button = document.createElement('button');
//             button.classList.add('moreSelectBtn');
//             button.type = 'button';
//             button.textContent = optionValue;
//             li.appendChild(button);
//             customSelectBtns.appendChild(li);
//         };
//     });
// };

const createCustomLiLandMerge = () => {
    const contentItems = document.querySelectorAll('.selectContentArea');

    contentItems.forEach(contentItem => {

        // 추가
        if (contentItem.classList.contains('customLiProcessed')) {
            return;
        }

        const notsetAddSelectBox = contentItem.querySelector('select');
        const customSelectBox = contentItem.querySelector('.customSelectBox');
        const customSelectBtns = customSelectBox.querySelector('.customSelectBtns');
        // select가 없으면 return
        if (!notsetAddSelectBox) return;


        for (let i = 0; i < notsetAddSelectBox.length; i++) {
            const optionValue = notsetAddSelectBox.options[i].value;
            const li = document.createElement('li');
            const button = document.createElement('button');
            button.classList.add('moreSelectBtn');
            button.type = 'button';
            button.textContent = optionValue;
            li.appendChild(button);
            customSelectBtns.appendChild(li);
        };

        // 함수가 한번 적용된 selectContentArea에 class 붙여서 구분한다. 중복실행 되지 않도록
        contentItem.classList.add('customLiProcessed');
    });
}

createCustomLiLandMerge();
// 주석처리
// const customSelectView = document.querySelectorAll('.customSelectView')

// customSelectView.forEach((btn) => {
//     btn.addEventListener('click', function(){
//         btn.classList.toggle('active');

//         if (btn.nextElementSibling) {
//             btn.nextElementSibling.classList.toggle('active');

//         }
//     })
// } )

const landRightMergeSelectEvent01 = () => {

    const landRightMergeContainer01 = document.querySelectorAll('#landRightMerge .contWrap');

    landRightMergeContainer01.forEach((wrap) => {
        wrap.addEventListener('click',function(event){
            if (event.target.classList.contains('customSelectView')) {
                const btn = event.target;

                btn.classList.toggle('active');

                if (btn.nextElementSibling) {
                    btn.nextElementSibling.classList.toggle('active');

                };
            };
        });
    });
};
landRightMergeSelectEvent01();


// customSelectBtns 리스트 click 했을 때 해당 내용으로 바뀌게하기

// const MoreSelectBtn = document.querySelectorAll('.moreSelectBtn')

// MoreSelectBtn.forEach((moreBtn) => {
//     moreBtn.addEventListener('click', function () {
//         var moreSelectBtnText = moreBtn.innerText;
//         console.log(moreSelectBtnText);
//         const parentMoreSelectBtn = moreBtn.closest('.customSelectBtns')
//         const EditCustomViewBtn = parentMoreSelectBtn.previousElementSibling;

//         while (EditCustomViewBtn.firstChild) {
//             EditCustomViewBtn.removeChild(EditCustomViewBtn.firstChild);
//         }

//         // 새로운 텍스트 노드를 추가합니다.
//         const textNode = document.createTextNode(moreSelectBtnText);
//         EditCustomViewBtn.appendChild(textNode);


//         EditCustomViewBtn.classList.remove('active')
//         parentMoreSelectBtn.classList.remove('active')

//         // 선택한 걸 select의 value값으로 변경하기

//         const nearByContent = moreBtn.closest('.selectContentArea');
//         const nearBySelectBox = nearByContent.querySelector('select');
//         nearBySelectBox.value = moreBtn.textContent;
//         console.log(`Selected value: ${nearBySelectBox.value}`);


//     })
// })

const landRightMergeSelectEvent02 = () => {

    const landRightMergeContainer02 = document.querySelectorAll('#landRightMerge .contWrap');
    
    landRightMergeContainer02.forEach((wrap) => {
        wrap.addEventListener('click', function(event){
            if (event.target.classList.contains('moreSelectBtn')) {
                const moreBtn = event.target;

                var moreSelectBtnText = moreBtn.innerText;
                console.log(moreSelectBtnText);
                const parentMoreSelectBtn = moreBtn.closest('.customSelectBtns')
                const EditCustomViewBtn = parentMoreSelectBtn.previousElementSibling;

                while (EditCustomViewBtn.firstChild) {
                    EditCustomViewBtn.removeChild(EditCustomViewBtn.firstChild);
                }

                // 새로운 텍스트 노드를 추가합니다.
                const textNode = document.createTextNode(moreSelectBtnText);
                EditCustomViewBtn.appendChild(textNode);


                EditCustomViewBtn.classList.remove('active')
                parentMoreSelectBtn.classList.remove('active')

                // 선택한 걸 select의 value값으로 변경하기

                const nearByContent = moreBtn.closest('.selectContentArea');
                const nearBySelectBox = nearByContent.querySelector('select');
                nearBySelectBox.value = moreBtn.textContent;
                console.log(`Selected value: ${nearBySelectBox.value}`);

            };
        });
    });

};

landRightMergeSelectEvent02();

// 토지분할 추가 click시 이벤트

// const divisionAddBtn = document.querySelectorAll('#landRightMerge .addBtn');
// const divisionRegistBtn = document.querySelectorAll('#landRightMerge .registBtn');
// const divisionEditBefore = document.querySelectorAll('#landRightMerge .contents .content.btnBox .editBefore');
// const divisionEditAfter = document.querySelectorAll('#landRightMerge .contents .content.btnBox .editAfter');

// divisionAddBtn.forEach((btn) => {
//     btn.addEventListener('click', function(){
//         var thisEditContent = btn.closest('.contents');
//         thisEditContent.classList.add('editing');
//     });
// });

// if (divisionRegistBtn) {
//     divisionRegistBtn.forEach((regiBtn) => {
//         regiBtn.addEventListener('click',function(){
//             var registContents = regiBtn.closest('.contents');
//             registContents.classList.remove('editing');
//         });
//     });
// };


// 대상토지 click 이벤트

const landRightMergeInfoAddBtnEvent = () => {
    const infoContentsDetailBox = document.querySelector('#landRightMerge .targetLand .contWrap');
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

            for (let i = 1; i <= 9; i++) {
                // li 만들기
                const infoLi = document.createElement('li');
                infoLi.classList.add('content');

                if (i == 1 || i == 6) {
                    const infoInput = document.createElement('input');
                    infoInput.type = 'text';
                    infoInput.readOnly = true;
                    infoInput.classList.add('notWriteInput');

                    // li안에 넣기
                    infoLi.append(infoInput);
                } else if (i == 2) {
                    infoLi.classList.add('checkboxWrap');

                    // input checkbox 세팅
                    const checkboxInput = document.createElement('input');
                    checkboxInput.type = 'checkbox';
                    checkboxInput.id = `landRightMerge_checkbox_${Date.now()}_${i}`;

                    infoLi.appendChild(checkboxInput);

                    // label 세팅
                    const checkboxLabel = document.createElement('label');
                    checkboxLabel.setAttribute('for', checkboxInput.id);

                    infoLi.appendChild(checkboxLabel);

                } else if (i == 3) {
                    // 3번째 li
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

                } else if (i == 4 || i == 8) {
                    // selectbox 세팅하기
                    infoLi.classList.add('selectContentArea');
                    // select 담을 큰 그릇 만들기
                    const divideHidden = document.createElement('div');
                    divideHidden.classList.add('hiddenSelectBox');
                    // select tag 만들기
                    const divideSelect = document.createElement('select');
                    // id 안겹치게
                    divideSelect.id = `landMergeSelectBox_${Date.now()}_${i}`;
                    divideSelect.name = divideSelect.id;
                    divideSelect.hidden = true;

                    // option 만들기
                    for (let n = 1; n < 11; n++) {
                        const divideOption = document.createElement('option');
                        divideOption.value = `선택${n}`;
                        divideOption.textContent = `선택${n}`;

                        divideSelect.appendChild(divideOption);
                    }

                    divideHidden.appendChild(divideSelect);
                    infoLi.appendChild(divideHidden);

                    // custom select
                    const customSection = document.createElement('section');
                    customSection.classList.add('customSelectBox');

                    // custom button
                    const customButton = document.createElement('button');
                    customButton.classList.add('customSelectView');
                    if (i == 4) {
                        customButton.textContent = '선택';
                    }

                    // custom list
                    const customUl = document.createElement('ul');
                    customUl.classList.add('customSelectBtns');

                    customSection.appendChild(customButton);
                    customSection.appendChild(customUl);

                    infoLi.appendChild(customSection);


                } else if (i == 5) {

                    infoLi.classList.add('contentBox');
                    // ul.secondContents 만들기
                    const secondUl = document.createElement('ul');
                    secondUl.classList.add('secondContents');

                    for (let q = 0; q < 5; q++) {
                        // li.secondContent 만들기
                        const secondLi = document.createElement('li')
                        secondLi.classList.add('secondContent');

                        if (q == 3) {
                            secondLi.classList.add('largeSecondTitle');
                        }

                        // input 만들기
                        const secondInput = document.createElement('input');
                        secondInput.type = 'text';
                        secondInput.readOnly = true;
                        secondInput.classList.add('notWriteInput');

                        secondLi.appendChild(secondInput);
                        secondUl.appendChild(secondLi);
                    }

                    infoLi.appendChild(secondUl);

                } else if (i == 7) {
                    const viewBtn = document.createElement('button');
                    viewBtn.classList.add('viewDetailButton');
                    viewBtn.textContent = '위치보기';

                    infoLi.appendChild(viewBtn);
                } else if (i == 9) {
                    infoLi.classList.add('titleBtnWrap');
                    infoLi.classList.add('btnBox');

                    for (let w = 0; w<2; w++) {
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

            createCustomLiLandMerge();
        }
        // 삭제 버튼 누를 때
        if (event.target.classList.contains('delBtn')) {
            var thisDelContent = event.target.closest('.contents');

            thisDelContent.remove();
        }
        // 검색 버튼 누를 때
        if (event.target.classList.contains('searchAddressBtn')) {
            var searchBtn = event.target;
            const popupOpen = document.querySelector("#searchResultsPopup .popupWrap");
            searchBtn.classList.add("open");
            popupOpen.classList.add("active");
        }

    })

}
landRightMergeInfoAddBtnEvent();

/* js추가 검색팝업오픈 */

const landRightMergeSearchOpenPopUp = () => {

    const landRightMergeSearchBtn = document.querySelectorAll(".searchAddressBtn");
    const landRightMergeearchResultPop = document.querySelector(".landRightMergeSearchPopWrappers");
    let htmlFilePath = '/components/popuphtml/searchResultsPopup.html'; // 삽입할 html 파일 경로

    if (landRightMergeSearchBtn) {

        let xhr = new XMLHttpRequest();
        xhr.open('GET', htmlFilePath, true);
        xhr.onreadystatechange = function () {
            if (xhr.readyState == 4 && xhr.status == 200) {
                landRightMergeearchResultPop.innerHTML = xhr.responseText;
                runScriptsInElement(landRightMergeearchResultPop); // 삽입된 html내 스크립트 실행 함수 호출
            }
        };
        xhr.send();
        console.log('landRightMergeSearchResultPop 작동');

        landRightMergeSearchBtn.forEach((searchBtn) => {
            searchBtn.addEventListener('click', () => {
                const popupOpen = document.querySelector("#searchResultsPopup .popupWrap");
                searchBtn.classList.add("open");
                popupOpen.classList.add("active");
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

landRightMergeSearchOpenPopUp();