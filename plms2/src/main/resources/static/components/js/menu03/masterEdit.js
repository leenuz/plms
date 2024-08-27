// 커스텀 selectbox

const createCustomLiMasterEdit = () => {
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
createCustomLiMasterEdit();


// const customSelectView = document.querySelectorAll('.customSelectView')

// customSelectView.forEach((btn) => {
//     btn.addEventListener('click', function () {
//         btn.classList.toggle('active');

//         if (btn.nextElementSibling) {
//             btn.nextElementSibling.classList.toggle('active');

//         }
//     })
// })

// selectbox click이벤트 함수로 묶기
const masterEditSelectboxClickEvent01 = () => {
    const contentContainer = document.querySelectorAll('#masterEdit .contWrap');
    const customSelectView = document.querySelectorAll('.customSelectView');

    contentContainer.forEach((wrap) => {
        wrap.addEventListener('click', function (event) {
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

masterEditSelectboxClickEvent01();


// customSelectBtns 리스트 click 했을 때 해당 내용으로 바뀌게하기

const masterEditSelectboxClickEvent02 = () => {
    const contentContainer02 = document.querySelectorAll('#masterEdit .contWrap');

    // 초기모습
    const lineWrap = document.querySelector('#masterEdit .lineWrap');
    const lineContents = lineWrap.querySelectorAll('#masterEdit .lineContent');
    // 먼저 class제거해주기
    lineContents.forEach((line) => {
        line.classList.remove('active');
    })
    lineContents[0].classList.add('active');

    // east, west 감싼 제일 큰 wrap, active 붙으면 display:block
    const secondTitleWrap = document.querySelector('#masterEdit .defaultInfo .contWrap .secondTitleWrap');
    // titles 높이(active 붙으면 height 90px)
    const defaultInfoTitles = document.querySelector('#masterEdit .defaultInfo .contWrap .depth1 .titles');

    secondTitleWrap.classList.add('active');
    defaultInfoTitles.classList.add('active');

    contentContainer02.forEach((wrap) => {
        wrap.addEventListener('click', function (event) {
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

                // masterRegSelectBox06의 값이 변경될 때에만 스타일 변경
                const lineValue = document.getElementById('masterEditSelectBox06');

                // east,west 나누기


                if (nearBySelectBox === lineValue) {
                    // const singleLine = document.querySelector('#masterReg .lineWrap .singleLine');
                    // const doubleLine = document.querySelector('#masterReg .lineWrap .doubleLine');

                    if (lineValue.value == '단선') {
                        // doubleLine.style.display = 'none';
                        // singleLine.style.display = 'block';

                        lineContents[0].classList.remove('active');
                        lineContents[1].classList.add('active');
                        secondTitleWrap.classList.remove('active');
                        defaultInfoTitles.classList.remove('active');

                    } else if (lineValue.value == '복선') {
                        // singleLine.style.display = 'none';
                        // doubleLine.style.display = 'flex';

                        lineContents[1].classList.remove('active');
                        lineContents[0].classList.add('active');
                        secondTitleWrap.classList.add('active');
                        defaultInfoTitles.classList.add('active');
                    }
                }

            };
        });
    });
   

}
masterEditSelectboxClickEvent02();

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

//         // masterRegSelectBox06의 값이 변경될 때에만 스타일 변경
//         const lineValue = document.getElementById('masterEditSelectBox06');

//         if (nearBySelectBox === lineValue) {
//             const singleLine = document.querySelector('#masterEdit .lineWrap .singleLine');
//             const doubleLine = document.querySelector('#masterEdit .lineWrap .doubleLine');

//             if (lineValue.value == '단선') {
//                 doubleLine.style.display = 'none';
//                 singleLine.style.display = 'block';
//             } else if (lineValue.value == '복선') {
//                 singleLine.style.display = 'none';
//                 doubleLine.style.display = 'flex';
//             }
//         }
//     })
// })

// 첨부파일 전체 선택 체크박스
// const allCheckEventMasterEdit = () => {

//     // 첨부파일 리스트들
//     const attachFiles = document.querySelectorAll('input[name="masterEdit_attachFile"]');
//     // checked가 된 첨부파일 리스트
//     const clickedAttachFiles = document.querySelectorAll('input[name="masterEdit_attachFile"]:checked');
//     // 전체선택 input
//     const clickedAllinput = document.querySelector('input[name="masterEdit_file_select_all"]');

//     // 전체선택되게 하기
//     clickedAllinput.addEventListener('click', function () {
//         clickedSelectAllMasterEdit(clickedAllinput);
//     })
//     // 개당 선택시 전체 선택되게하기
//     attachFiles.forEach((checkList) => {
//         checkList.addEventListener('click', function () {

//             clickCheckBoxEventMasterEdit(checkList);
//         })
//     })

//     // 개별 리스트 클릭시 전체로 변하기
//     function clickCheckBoxEventMasterEdit() {
//         // 최신으로 업데이트 해주기
//         const clickedAttachFiles = document.querySelectorAll('input[name="masterEdit_attachFile"]:checked');

//         if (attachFiles.length === clickedAttachFiles.length) {
//             clickedAllinput.checked = true;
//         } else {
//             clickedAllinput.checked = false;
//         }
//     }

//     // 전체선택 클릭시 
//     function clickedSelectAllMasterEdit(clickedAllinput) {
//         const attachFiles = document.querySelectorAll('input[name="masterEdit_attachFile"]');

//         attachFiles.forEach((checkbox) => {
//             checkbox.checked = clickedAllinput.checked;
//         })
//     }
// }

// allCheckEventMasterEdit();
// ul의 순번을 구하는 함수

const getInfoIndexForMasterEdit = (event) => {
    let infoUlIndex = 0;
    let element = event;

    while ((element = element.previousElementSibling) != null) {
        if (element.classList.contains('contents')) {
            infoUlIndex++;
        }
    }

    return infoUlIndex;

}

// 소속토지 click 이벤트

const masterEditInfoAddBtnEvent = () => {
    const infoContentsDetailBox = document.querySelector('#masterEdit .landAdressInfo .contWrap');
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

            for (let i = 1; i <= 13; i++) {
                // li 만들기
                const infoLi = document.createElement('li');
                infoLi.classList.add('content');

                if (i == 1 || i == 5) {
                    infoLi.classList.add('checkboxWrap');

                    if ( i == 1) {
                        infoLi.classList.add('smallWidth');
                    }

                    // input checkbox 세팅
                    const checkboxInput = document.createElement('input');
                    checkboxInput.type = 'checkbox';

                    if (i == 1) {

                        checkboxInput.id = `masterEdit_checkbox_${Date.now()}_${i}`;
                    } else if (i  == 5) {
                        checkboxInput.id = `masterEdit_checkbox_main_${Date.now()}_${i}`;
                    }

                    infoLi.appendChild(checkboxInput);

                    // label 세팅
                    const checkboxLabel = document.createElement('label');
                    checkboxLabel.setAttribute('for', checkboxInput.id);

                    infoLi.appendChild(checkboxLabel);
                } else if ( i == 2) {
                    infoLi.classList.add('smallWidth');
                    // input 만들기
                    const infoInput = document.createElement('input');
                    infoInput.type = 'text';
                    infoInput.readOnly = true;
                    infoInput.classList.add('notWriteInput');
                    // 순번을 위해서
                    infoInput.classList.add('contentsNum');


                    // li안에 넣기
                    infoLi.append(infoInput);
                } else if ( i == 3 || i == 4 || i == 8 || i == 11) {

                    // selectbox 세팅하기
                    infoLi.classList.add('selectContentArea');

                    if (i == 3) {
                        infoLi.classList.add('largeWidth');
                    } else if (i == 4 || i == 11) {
                        infoLi.classList.add('middleWidth');
                    }

                    // select 담을 큰 그릇 만들기
                    const divideHidden = document.createElement('div');
                    divideHidden.classList.add('hiddenSelectBox');
                    // select tag 만들기
                    const divideSelect = document.createElement('select');
                    // id 안겹치게
                    divideSelect.id = `masterEditSelectBox${Date.now()}_${i}`;
                    divideSelect.name = divideSelect.id;
                    divideSelect.hidden = true;

                    // option 만들기

                    if (i == 3) {
                        const facilityOption = ['전체', '강서구-건설과', '한강사업본부-운영총괄과', '안전건설과', '덕양구-안전건설과']
                        for (let n = 0; n < 5; n++) {
                            const divideOption = document.createElement('option');
                            divideOption.value = facilityOption[n];
                            divideOption.textContent = facilityOption[n];

                            divideSelect.appendChild(divideOption);
                        }

                    } else if (i == 4) {

                        const facilityOption = ['국유지', '사유지']
                        for (let n = 0; n < 2; n++) {
                            const divideOption = document.createElement('option');
                            divideOption.value = facilityOption[n];
                            divideOption.textContent = facilityOption[n];

                            divideSelect.appendChild(divideOption);
                        }
                    } else if (i == 8) {
                        for (let n = 1; n < 11; n++) {
                            const divideOption = document.createElement('option');

                            if (n == 1) {
                                divideOption.value = '전';
                                divideOption.textContent = '전';
                            } else {

                                divideOption.value = `전${n}`;
                                divideOption.textContent = `전${n}`;
                            }


                            divideSelect.appendChild(divideOption);
                        }
                    } else if (i == 11) {
                        for (let n = 1; n < 11; n++) {
                            const divideOption = document.createElement('option');

                            if (n == 1) {
                                divideOption.value = '지사선택필요';
                                divideOption.textContent = '지사선택필요';
                            } else {
                                divideOption.value = `지사선택필요${n}`;
                                divideOption.textContent = `지사선택필요${n}`;
                            }


                            divideSelect.appendChild(divideOption);
                        }
                    }


                    divideHidden.appendChild(divideSelect);
                    infoLi.appendChild(divideHidden);

                    // custom select
                    const customSection = document.createElement('section');
                    customSection.classList.add('customSelectBox');

                    // custom button
                    const customButton = document.createElement('button');
                    customButton.classList.add('customSelectView');

                    // 버튼에 들어가는 부분
                    const allOption = divideSelect.querySelectorAll('option');
                    if (i == 4 ) {
                        customButton.textContent = '선택';
                    } else {
                        customButton.textContent = allOption[0].value;
                    }
                    

                    // custom list
                    const customUl = document.createElement('ul');
                    customUl.classList.add('customSelectBtns');

                    customSection.appendChild(customButton);
                    customSection.appendChild(customUl);

                    infoLi.appendChild(customSection);

                } else if (i == 6) {
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
                    infoLi.classList.add('contentBox');

                } else if (i == 7 || i == 9 || i == 10) {
                    if (i == 7) {
                        infoLi.classList.add('middleWidth');
                    }

                    // input 만들기
                    const infoInput = document.createElement('input');
                    infoInput.type = 'text';

                    infoLi.appendChild(infoInput);

                } else if (i == 12) {
                    infoLi.classList.add('btnBox');

                    const viewBtn = document.createElement('button');
                    // 버튼 class 추가
                    viewBtn.classList.add('miniBtn');
                    viewBtn.classList.add('lightBlueBtn');
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
                infoContentsBox.appendChild(infoUl);

            }

            createCustomLiMasterEdit();

            // 순번
            const contentsNum = infoUl.querySelector('.contentsNum');
            contentsNum.placeholder = getInfoIndexForMasterEdit(infoUl) + 1;

        }
        // 삭제 버튼 누를 때
        if (event.target.classList.contains('delBtn')) {
            var thisDelContent = event.target.closest('.contents');
            thisDelContent.remove();

            const nowContents = infoContentsBox.querySelectorAll('.contents');
            nowContents.forEach((ul) => {
                const newUlNum = ul.querySelector('.contentsNum');
                newUlNum.placeholder = getInfoIndexForMasterEdit(ul) + 1;

            })
        }
        // 검색 버튼 누를 때
        if (event.target.classList.contains('searchAddressBtn')) {
            const searchbtn = event.target;
            const popupOpen = document.querySelector("#searchResultsPopup .popupWrap");
            searchbtn.classList.add("open");
            popupOpen.classList.add("active");
        }

    })

}
masterEditInfoAddBtnEvent();

// 파일 첨부 기본 모습

const defaultFileUploadWrap = document.querySelectorAll('.fileUploadDisplay');

defaultFileUploadWrap[0].classList.add('active');

// 파일 첨부시 모습 변경, x버튼 클릭시 비우기

const masterEditFileEvent = () => {
    const masterEdit_myPcFiles = document.getElementById('masterEdit_myPcFiles');
    // input[type file]을 가진 제일 큰 부모
    const attachFileInfo = masterEdit_myPcFiles.closest('.attachFileInfo');
    // 업로드시 보이는 라벨
    const fileUploadAfter = attachFileInfo.querySelector('.fileUploadAfter');
    const allContents = fileUploadAfter.querySelectorAll('.contents');
    const fileSaveBtn = attachFileInfo.querySelector('.fileSaveBtn');

    var fileInfoName = '';
    var fileInfoSize = '';
    var fileInfoType = '';

    masterEdit_myPcFiles.addEventListener('change', function () {

        // 기존의 ul 초기화
        const existContents = fileUploadAfter.querySelectorAll('.contents')
        console.log(existContents)

        existContents.forEach((list) => {
            list.remove();
        })

        if (masterEdit_myPcFiles.files.length > 0) {

            for (let i = 0; i <= masterEdit_myPcFiles.files.length - 1; i++) {
                const thisFileName = masterEdit_myPcFiles.files[i].name;
                const thisFileSize = masterEdit_myPcFiles.files[i].size;
                const thisFileType = masterEdit_myPcFiles.files[i].type;

                // 사이즈를 바꾸자
                const formattedSize = byteTransform(thisFileSize);

                // 문자열에 변수를 담자
                fileInfoName = thisFileName;
                fileInfoSize = formattedSize;
                fileInfoType = thisFileType;

                // 파일 지우는 버튼용 li

                const deleteLi = '<li class="btnbox"><button class="fileDeleteBtn"></button></li>';

                // 파일 아이콘, 파일명 들어가는 li
                const filenameBoxLi = `<li class="content filenameBox"><figure class="typeIcon"></figure><p class="fileNameText">${fileInfoName}</p></li >`;

                // 업로드 상태
                const uploadStatusLi = '<li class="content"><p>-</p></li>';

                // 파일 크기 들어가는 li
                const fileSizeLi = `<li class="content">
                    <p class="fileSizeText"> ${fileInfoSize} </p>
                </li>`;

                const listBox = deleteLi + filenameBoxLi + uploadStatusLi + fileSizeLi;

                // ul.contents 만들기
                const ContentsUl = document.createElement('ul');
                ContentsUl.classList.add('contents');

                ContentsUl.innerHTML = listBox;

                fileUploadAfter.appendChild(ContentsUl);

                // 다음 걸 받기 위해 비워주기

                fileInfoName = '';
                fileInfoSize = '';
                fileInfoType = '';

            }

            // 값 잘 담겼는지 확인
            console.log(masterEdit_myPcFiles.value)

            defaultFileUploadWrap.forEach((wrap) => {
                wrap.classList.remove('active');
            })
            defaultFileUploadWrap[1].classList.add('active');
            fileSaveBtn.classList.add('active');


        } else {

            masterEdit_myPcFiles.value = '';
            defaultFileUploadWrap.forEach((wrap) => {
                wrap.classList.remove('active');
            })
            defaultFileUploadWrap[0].classList.add('active');
            fileSaveBtn.classList.remove('active');
        }
    })

    // 개별 delbtn 누르면 생기는 이벤트
    fileUploadAfter.addEventListener('click', function (event) {
        if (event.target.classList.contains('fileDeleteBtn')) {
            const fileDeleteBtns = fileUploadAfter.querySelectorAll('.fileDeleteBtn');
            const fileDelBtn = event.target;
            const nearbyContents = event.target.closest('.contents');
            const fileNameToRemove = nearbyContents.querySelector('.fileNameText').textContent;

            // 파일명이랑 틀린 것만 저장하는 함수
            removeFile(fileNameToRemove);
            nearbyContents.remove();

            console.log(masterEdit_myPcFiles.files.length);

            // 현재 선택된 파일이 없으면 input 값 비우기
            if (masterEdit_myPcFiles.files.length === 0) {
                masterEdit_myPcFiles.value = '';
                defaultFileUploadWrap.forEach((wrap) => {
                    wrap.classList.remove('active');
                });
                defaultFileUploadWrap[0].classList.add('active');
                fileSaveBtn.classList.remove('active');
            }
        }


    })

    // 전체 삭제 버튼
    const allDeleteFileBtn = fileUploadAfter.querySelector('.allDeleteFileBtn');

    allDeleteFileBtn.addEventListener('click', function () {
        const nowAllContents = fileUploadAfter.querySelectorAll('.contents')
        nowAllContents.forEach((contents) => {
            contents.remove();
        })

        masterEdit_myPcFiles.value = '';


        // 값 잘 사라졌는지 확인
        console.log(masterEdit_myPcFiles.value);


        if (masterEdit_myPcFiles.files.length == 0) {
            masterEdit_myPcFiles.value = '';
            defaultFileUploadWrap.forEach((wrap) => {
                wrap.classList.remove('active');
            })
            defaultFileUploadWrap[0].classList.add('active');
            fileSaveBtn.classList.remove('active');
        }
    })

    // 용량 크기 변환하는 함수
    function byteTransform(bytes) {
        const dataSize = ['Bytes', 'KB', 'MB', 'GB', 'TB']

        if (bytes === 0) return 'not available';

        const d = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)), 10);
        if (d === 0) return `${bytes} ${dataSize[d]}`;
        return `${(bytes / (1024 ** d)).toFixed(1)} ${dataSize[d]}`;
    }

    // 파일 삭제처리 하는 함수
    const removeFile = (fileNameToRemove) => {
        const filesArray = Array.from(masterEdit_myPcFiles.files);
        const newDataTransfer = new DataTransfer();
        filesArray.forEach(file => {
            if (file.name !== fileNameToRemove) {
                newDataTransfer.items.add(file);
            }
        });
        masterEdit_myPcFiles.files = newDataTransfer.files; // 새로운 files 설정
    };

}

masterEditFileEvent();


/* 검색결과팝업 */

const masterEditOpenPopUp = () => {

    const masterEditSearchBtn = document.querySelectorAll("#masterEdit .searchAddressBtn");
    const masterEditSearchPop = document.querySelector(".masterEditSearchPopWrapper");
    let masterEditResultFilePath = '/components/popuphtml/searchResultsPopup.html'; // 삽입할 html 파일 경로

    if (masterEditSearchBtn) {

        let xhr = new XMLHttpRequest();
        xhr.open('GET', masterEditResultFilePath, true);
        xhr.onreadystatechange = function () {
            if (xhr.readyState == 4 && xhr.status == 200) {
                masterEditSearchPop.innerHTML = xhr.responseText;
                runScriptsInElement(masterEditSearchPop); // 삽입된 html내 스크립트 실행 함수 호출
            }
        };
        xhr.send();
        console.log('masterEditResultPop 작동');

        masterEditSearchBtn.forEach((btn) => {

            btn.addEventListener("click", () => {

                const popupOpen = document.querySelector("#searchResultsPopup .popupWrap");

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

masterEditOpenPopUp();

/* 변경이력불러오기 */

const masterEditChangeHistoryOpenEvet = () => {

    const masterEditHistoryBtn = document.querySelector("#masterEdit .masterEditHistoryBtn");
    const masterEditChangeHistoryWrapper = document.querySelector(".masterEditChangeHistoryWrapper");
    let masterEditHistoryPath = '/components/popuphtml/occupancy_Popup/changehistoryPopup.html'; //변경이력

    if(masterEditHistoryBtn){

       let xhr = new XMLHttpRequest();
       xhr.open('GET', masterEditHistoryPath, true);
       xhr.onreadystatechange = function() {
           if (xhr.readyState == 4 && xhr.status == 200) {
               masterEditChangeHistoryWrapper.innerHTML = xhr.responseText;
               runScriptsInElement(masterEditChangeHistoryWrapper); // 삽입된 html내 스크립트 실행 함수 호출
           }
       };
       xhr.send();
       console.log('masterEditChangeHistoryWrapper 작동');
       masterEditHistoryBtn.addEventListener("click" , () => {
       
           const popupOpen = document.getElementById("changehistoryPopup");
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

masterEditChangeHistoryOpenEvet();



/* 엑셀팝업불러오기 */


const masterEditExcelPopOpenEvet = () => {

    const masterEditExcelPopBtn = document.querySelector(".masterEditExcelPopBtn");
    const masterEditExcelPopWrapper = document.querySelector(".masterEditExcelPopWrapper");
    let masterEditExcelFilePath = '/components/popuphtml/occupancy_Popup/exceluploadPopup.html'; // 엑셀업로드

    if(masterEditExcelPopBtn){

       let xhr = new XMLHttpRequest();
       xhr.open('GET', masterEditExcelFilePath, true);
       xhr.onreadystatechange = function() {
           if (xhr.readyState == 4 && xhr.status == 200) {
               masterEditExcelPopWrapper.innerHTML = xhr.responseText;
               runScriptsInElement(masterEditExcelPopWrapper); // 삽입된 html내 스크립트 실행 함수 호출
           }
       };
       xhr.send();
       console.log('masterEditExcelPopWrapper 작동');
       masterEditExcelPopBtn.addEventListener("click" , () => {
       
           const popupOpen = document.getElementById("exceluploadPopup");
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

masterEditExcelPopOpenEvet();