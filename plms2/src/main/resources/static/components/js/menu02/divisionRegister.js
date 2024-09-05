// 커스텀 selectbox

createCustomLiDivisionRegist();

function createCustomLiDivisionRegist() {
    const contentItems = document.querySelectorAll('.selectContentArea');

    contentItems.forEach(contentItem => {

        // 추가
        if (contentItem.classList.contains('customLiProcessed')) {
            return;
        }
        const notsetAddSelectBox = contentItem.querySelector('select');
        // select가 없으면 return
        if (!notsetAddSelectBox) return;

        const customSelectBox = contentItem.querySelector('.customSelectBox');
        const customSelectBtns = customSelectBox.querySelector('.customSelectBtns');

        for (let i = 0; i < notsetAddSelectBox.length; i++) {
            const optionValue = notsetAddSelectBox.options[i].value;
            const li = document.createElement('li');
            const button = document.createElement('button');
            button.classList.add('moreSelectBtn');
            button.type = 'button';
            button.textContent = optionValue;
            li.appendChild(button);
            customSelectBtns.appendChild(li);
        }

        // 함수가 한번 적용된 selectContentArea에 class 붙여서 구분한다. 중복실행 되지 않도록
        contentItem.classList.add('customLiProcessed');
    });
}

// const customSelectView = document.querySelectorAll('.customSelectView')

// customSelectView.forEach((btn) => {
//     btn.addEventListener('click', function(){
//         btn.classList.toggle('active');

//         if (btn.nextElementSibling) {
//             btn.nextElementSibling.classList.toggle('active');

//         }
//     })
// } )


// // // customSelectBtns 리스트 click 했을 때 해당 내용으로 바뀌게하기

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

// selectbox click Event

const divisionSelectboxClickEvent01 = () => {
    const contentContainer = document.querySelectorAll('#divisionRegister .contWrap');
    const customSelectView = document.querySelectorAll('.customSelectView');


    contentContainer.forEach((wrap) => {
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
    // contentContainer.addEventListener('click', function(event) {
    //     if (event.target.classList.contains('customSelectView')) {
    //         const btn = event.target;

    //         btn.classList.toggle('active');

    //         if (btn.nextElementSibling) {
    //             btn.nextElementSibling.classList.toggle('active');

    //         }

    //     }
    // });
};

divisionSelectboxClickEvent01();

const divisionSelectboxClickEvent02 = () => {


    // // customSelectBtns 리스트 click 했을 때 해당 내용으로 바뀌게하기
    const contentContainer02 = document.querySelectorAll('#divisionRegister .contWrap');

    contentContainer02.forEach((wrap) => {
        wrap.addEventListener('click',function(event){
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
//                console.log(`Selected value: ${nearBySelectBox.value}`);

            };
        });
    });
    // contentContainer02.addEventListener('click',function(event){
    //     if (event.target.classList.contains('moreSelectBtn')) {
    //         const moreBtn = event.target;

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

    //     }
    // })

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
}

divisionSelectboxClickEvent02();

// 주석처리

// 토지분할 추가 click시 이벤트

// const divisionAddBtn = document.querySelectorAll('#divisionRegister .addBtn');
// const divisionRegistBtn = document.querySelectorAll('#divisionRegister .registBtn');
// const divisionEditBefore = document.querySelectorAll('#divisionRegister .contents .content.btnBox .editBefore');
// const divisionEditAfter = document.querySelectorAll('#divisionRegister .contents .content.btnBox .editAfter');

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


// 소유자 정보 추가 click시 이벤트

// const ownerInfoAddBtn = document.querySelectorAll('#divisionRegister .ownerInfo .addBtn')
// const editBefore = document.querySelectorAll('#divisionRegister .ownerInfo .contents .content.btnBox .editBefore');
// const editAfter = document.querySelectorAll('#divisionRegister .ownerInfo .contents .content.btnBox .editAfter');
// const editContent = document.querySelectorAll('#divisionRegister .editSpace');
// const registBtn = document.querySelectorAll('#divisionRegister .registBtn');

// ownerInfoAddBtn.forEach((btn) => {
//     btn.addEventListener('click', function () {
//         var thisEditContent = btn.closest('.contents');
//         console.log(thisEditContent);

//         thisEditContent.classList.add('editing');

//         const inputs = thisEditContent.querySelectorAll('input');

//         if (thisEditContent.classList.contains('editing')) {
//             inputs.forEach(input => {
//                 input.removeAttribute('readonly');
//             });
//         } else {
//             inputs.forEach(input => {
//                 input.setAttribute('readonly', 'readonly');
//             });
//         }



//     });
// });

// 추가 버튼 click 이벤트

// if (registBtn) {
//     registBtn.forEach((regiBtn) => {
//         regiBtn.addEventListener('click', function () {

//             var thisEditContent01 = regiBtn.closest('.contents');
//             thisEditContent01.classList.remove('editing')

//             const inputs = thisEditContent01.querySelectorAll('input');
//             inputs.forEach(input => {
//                 input.setAttribute('readonly', 'readonly');
//             });
//         })
//     })
// }

// 기본 정보 -> 주소 검색

// const radioButtons = document.querySelectorAll('#divisionRegister .defaultInfo .contWrap .depth2 .contents .content02 .radioBox .inputArea .inputWrap input[name="divisionRegister_addressInput"]');
// const inputAreas = document.querySelectorAll('#divisionRegister .defaultInfo .contWrap .depth2 .contents .content02 .radioBox .inputArea');

// radioButtons.forEach((radio) => {
//     radio.addEventListener('click', () => {
//         inputAreas.forEach((area) => {
//             if (area.contains(radio)) {
//                 area.querySelectorAll(':scope > *:not(.inputWrap)').forEach((child) => {
//                     child.classList.remove('disabled');
//                 });
//             } else {
//                 area.querySelectorAll(':scope > *:not(.inputWrap)').forEach((child) => {
//                     child.classList.add('disabled');
//                 });
//             }
//         });

//     });
// });

// const checkedRadio = document.querySelector('#divisionRegister .defaultInfo .contWrap .depth2 .contents .content02 .radioBox .inputArea .inputWrap input[name="divisionRegister_addressInput"]:checked');
// if (checkedRadio) {
//     checkedRadio.dispatchEvent(new Event('click'));
// }

// 토지분할 click 이벤트

const divisionRegisterInfoAddBtnEvent = () => {
    const infoContentsDetailBox = document.querySelector('#divisionRegister .landDivision .contWrap');
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

            for (let i = 1; i <= 11; i++) {
                // li 만들기
                const infoLi = document.createElement('li');
                infoLi.classList.add('content');

                // 1~ 2까지는 input만 있음
                if (i < 3) {

                    const infoInput = document.createElement('input');
                    infoInput.type = 'text';
                    infoInput.readOnly = true;
                    infoInput.classList.add('notWriteInput');

                    // 첫번째 li
                    if (i == 1) {
                        infoLi.classList.add('numInfoWidth');
                        // class 추가
                        infoInput.classList.add('ulNumPlace');

                    } else if (i == 2) {
                        infoLi.classList.add('middleWidth');
                    }

                    // li안에 넣기
                    infoLi.append(infoInput);
                } else if (i == 3) {
                    // 3번째 li
                    infoLi.classList.add('addressInfoWidth');
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

                } else if (i == 4 || i == 10) {
                    // selectbox 세팅하기
                    infoLi.classList.add('selectContentArea');
                    infoLi.classList.add('middleWidth');
                    // select 담을 큰 그릇 만들기
                    const divideHidden = document.createElement('div');
                    divideHidden.classList.add('hiddenSelectBox');
                    // select tag 만들기
                    const divideSelect = document.createElement('select');
                    // id 안겹치게
                    divideSelect.id = `divisionRegistSelectBox_${Date.now()}_${i}`;
                    divideSelect.name = divideSelect.id;
                    divideSelect.hidden = true;

                    // option 만들기
                    for (let n=1; n<11; n++) {
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

                    
                } else if (i == 5){

                    infoLi.classList.add('contentBox');
                    // ul.secondContents 만들기
                    const secondUl = document.createElement('ul');
                    secondUl.classList.add('secondContents');

                    for (let q = 0; q < 4; q++) {
                        // li.secondContent 만들기
                        const secondLi = document.createElement('li')
                        secondLi.classList.add('secondContent');

                        // input 만들기
                        const secondInput = document.createElement('input');
                        secondInput.type = 'text';

                        secondLi.appendChild(secondInput);
                        secondUl.appendChild(secondLi);
                    }

                    infoLi.appendChild(secondUl);
                    
                } else if (5< i && i<9) {
                    const checkboxInput = document.createElement('input');
                    checkboxInput.type = 'checkbox';

                    const checkboxLabel = document.createElement('label');

                    if (i == 6) {
                        checkboxInput.id = `divisionRegister_pipeline_interference_0${Date.now()}_${i}`;
                        checkboxInput.name = checkboxInput.id;
                        checkboxLabel.setAttribute('for', checkboxInput.id)

                        infoLi.appendChild(checkboxInput);
                        infoLi.appendChild(checkboxLabel);
                    } else if (i == 7) {
                        checkboxInput.id = `divisionRegister_termination_status_0${Date.now()}_${i}`;
                        checkboxInput.name = checkboxInput.id;
                        checkboxLabel.setAttribute('for', checkboxInput.id)

                        infoLi.appendChild(checkboxInput);
                        infoLi.appendChild(checkboxLabel);
                    } else if (i == 8) {
                        checkboxInput.id = `divisionRegister_data_succession_0${Date.now()}_${i}`;
                        checkboxInput.name = checkboxInput.id;
                        checkboxLabel.setAttribute('for', checkboxInput.id);

                        infoLi.appendChild(checkboxInput);
                        infoLi.appendChild(checkboxLabel);
                    }
                } else if (i == 9) {
                    infoLi.classList.add('middleWidth');

                    const newViewBtn = document.createElement('button');
                    newViewBtn.classList.add('viewDetailButton');
                    newViewBtn.textContent = '위치보기';

                    infoLi.appendChild(newViewBtn);
                } else if (i == 11) {
                    infoLi.classList.add('btnBox');

                    for (let r = 0 ; r<2; r++) {

                        const btnWrapDiv = document.createElement('div');
                        btnWrapDiv.classList.add('btnWrap');

                        const miniBtn = document.createElement('button');
                        miniBtn.classList.add('miniBtn');

                        if (r == 0) {
                            miniBtn.classList.add('addBtn');
                            miniBtn.textContent = '추가';
                        } else if (r == 1) {
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


            findUlIndex(infoUl);
            createCustomLiDivisionRegist()

        }
        // 삭제 버튼 누를 때
        if (event.target.classList.contains('delBtn')) {
            var thisDelContent = event.target.closest('.contents');
            thisDelContent.remove();


            //  ul 순서 재정비
            const currentInfoContents = infoContentsDetailBox.querySelectorAll('.contents');
            currentInfoContents.forEach((ul) => {
                findUlIndex(ul);
            })

        }
        if (event.target.classList.contains('searchAddressBtn')) {
            var searchBtn = event.target;
            const popupOpen = document.querySelector("#searchResultsPopup .popupWrap");
            searchBtn.classList.add("open");
            popupOpen.classList.add("active");
        }


    })

}
divisionRegisterInfoAddBtnEvent();

const findUlIndex = (event) =>  {
    // 부모
    const parentBox = event.parentElement;
    // 자식 (ul의 형제)
    const childBox = parentBox.children;
    console.log(parentBox.children);
    const ulIndex = Array.prototype.indexOf.call(childBox, event);
    const ulNumPlace = event.querySelector('.ulNumPlace');
    ulNumPlace.placeholder = ulIndex + 1;
}

/* js추가 검색팝업오픈 */

const divisionRegistSearchOpenPopUp = () => {

    const divisionRegistSearchBtn = document.querySelectorAll(".searchAddressBtn");
    const divisionRegistearchResultPop = document.querySelector(".divisionRegistSearchPopWrappers");
    let htmlFilePath = '/components/popuphtml/searchResultsPopup.html'; // 삽입할 html 파일 경로

    if (divisionRegistSearchBtn) {

        let xhr = new XMLHttpRequest();
        xhr.open('GET', htmlFilePath, true);
        xhr.onreadystatechange = function () {
            if (xhr.readyState == 4 && xhr.status == 200) {
                divisionRegistearchResultPop.innerHTML = xhr.responseText;
                runScriptsInElement(divisionRegistearchResultPop); // 삽입된 html내 스크립트 실행 함수 호출
            }
        };
        xhr.send();
        console.log('divisionRegistearchResultPop 작동');

        divisionRegistSearchBtn.forEach((searchBtn) => {
            searchBtn.addEventListener('click', ()=> {
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

divisionRegistSearchOpenPopUp();