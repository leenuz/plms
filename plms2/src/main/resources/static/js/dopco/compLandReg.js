// 커스텀 selectbox

// 함수명 변경
const createCustomLiCompLandReg = () => {
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
createCustomLiCompLandReg();


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

const compLandReqSelectboxClickEvent01 = () => {
    const contentContainer = document.querySelectorAll('#compLandReg .contWrap');
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
    })
}
compLandReqSelectboxClickEvent01();

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

const compLandRegSelectEvent02 = () => {

    const compLandRegContainer = document.querySelectorAll('#compLandReg .contWrap');

    compLandRegContainer.forEach((wrap) => {
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

            };
        });
    });

};

compLandRegSelectEvent02();

// 후순위 권리 click 이벤트

const compLandRegInfoAddBtnEvent = () => {
    const infoContentsDetailBox = document.querySelector('#compLandReg .subordinateRts .contWrap');
    const infoSection = infoContentsDetailBox.closest('.subordinateRts');
    const infoContentsBox = infoContentsDetailBox.querySelector('.contentsBox');
    const infoAddBtn = infoSection.querySelectorAll('.addBtn');
    const infoContents = infoContentsDetailBox.querySelectorAll('.contents');
    const infoTitles = infoContentsDetailBox.querySelector('.titles');


    infoSection.addEventListener('click', function (event) {

        // 버튼 클릭시 추가되게
        if (event.target.classList.contains('addBtn')) {
            // ul 만들기
            const infoUl = document.createElement('ul');
            infoUl.classList.add('contents');

            for (let i = 1; i <= 8; i++) {
                // li 만들기
                const infoLi = document.createElement('li');
                infoLi.classList.add('content');

                if (i == 1) {
                    infoLi.classList.add('checkboxWrap');
                    infoLi.classList.add('smallWidth');

                    // input checkbox 세팅
                    const checkboxInput = document.createElement('input');
                    checkboxInput.type = 'checkbox';
                    checkboxInput.id = `compLandReg_checkbox_${Date.now()}_${i}`;

                    infoLi.appendChild(checkboxInput);

                    // label 세팅
                    const checkboxLabel = document.createElement('label');
                    checkboxLabel.setAttribute('for', checkboxInput.id);

                    infoLi.appendChild(checkboxLabel);


                } else if (1 < i && i < 4 || 5 < i && i < 9) {

                    if (i == 8) {
                        infoLi.classList.add('largeWidth');
                    }
                    const infoInput = document.createElement('input');
                    infoInput.type = 'text';

                    // li안에 넣기
                    infoLi.append(infoInput);

                } else if (3 < i && i < 6) {
                    // date 만들기
                    // div 만들기
                    const dateDiv = document.createElement('div');
                    dateDiv.classList.add('dateInputWrap');
                    // input 만들기
                    const dateInput = document.createElement('input');
                    dateInput.type = 'date';
                    dateInput.setAttribute('data-placeholder', '날짜선택');
                    dateInput.setAttribute('ariaRequired', 'true');
                    dateInput.required = true;

                    // div에 input 넣기

                    dateDiv.appendChild(dateInput);
                    infoLi.appendChild(dateDiv);
                }

                infoUl.appendChild(infoLi);
            }
            infoContentsBox.appendChild(infoUl);

            const subordinateRtsContents = infoContentsDetailBox.querySelectorAll('.contents');
            
            if (subordinateRtsContents.length > 5) {
                infoContentsBox.classList.add('contentScr');
                infoTitles.classList.add('titleScr');
            } else {
                infoContentsBox.classList.remove('contentScr');
                infoTitles.classList.remove('titleScr');
            }
        }
        // 삭제 버튼 누를 때
        if (event.target.classList.contains('delBtn')) {
            var thisCheckedDelContent = infoContentsBox.querySelectorAll('input[type="checkbox"]:checked');
            var infoCheckboxs = infoContentsBox.querySelectorAll('input[type="checkbox"]');

            thisCheckedDelContent.forEach((checkbox) => {
                const checkedContents = checkbox.closest('.contents');

                if (checkedContents) {

                    if (checkbox != infoCheckboxs[0]) {
                        checkedContents.remove()
                    } else {
                        return;
                    }
                }

                const subordinateRtsContents02 = infoContentsDetailBox.querySelectorAll('.contents');
                if (subordinateRtsContents02.length > 5) {
                    infoContentsBox.classList.add('contentScr');
                    infoTitles.classList.add('titleScr');
                } else {
                    infoContentsBox.classList.remove('contentScr');
                    infoTitles.classList.remove('titleScr');
                }

            })
        }

    })

}
compLandRegInfoAddBtnEvent();

// 파일 첨부 기본 모습

//const defaultFileUploadWrap = document.querySelectorAll('.fileUploadDisplay');

//defaultFileUploadWrap[0].classList.add('active');

// 파일 첨부시 모습 변경, x버튼 클릭시 비우기

const compLandRegFileEvent = () => {
    const compLandReg_myPcFiles = document.getElementById('compLandReg_myPcFiles');
    // input[type file]을 가진 제일 큰 부모
    const attachFileInfo = compLandReg_myPcFiles.closest('.attachFileInfo');
    // 업로드시 보이는 라벨
    const fileUploadAfter = attachFileInfo.querySelector('.fileUploadAfter');
    const allContents = fileUploadAfter.querySelectorAll('.contents');
    const fileSaveBtn = attachFileInfo.querySelector('.fileSaveBtn');

    var fileInfoName = '';
    var fileInfoSize = '';
    var fileInfoType = '';

    compLandReg_myPcFiles.addEventListener('change', function () {

        // 기존의 ul 초기화
        const existContents = fileUploadAfter.querySelectorAll('.contents')
        console.log(existContents)

        existContents.forEach((list) => {
            list.remove();
        })

        if (compLandReg_myPcFiles.files.length > 0) {

            for (let i = 0; i <= compLandReg_myPcFiles.files.length - 1; i++) {
                const thisFileName = compLandReg_myPcFiles.files[i].name;
                const thisFileSize = compLandReg_myPcFiles.files[i].size;
                const thisFileType = compLandReg_myPcFiles.files[i].type;

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
            console.log(compLandReg_myPcFiles.value)

            defaultFileUploadWrap.forEach((wrap) => {
                wrap.classList.remove('active');
            })
            defaultFileUploadWrap[1].classList.add('active');
            fileSaveBtn.classList.add('active');


        } else {

            compLandReg_myPcFiles.value = '';
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

            console.log(compLandReg_myPcFiles.files.length);

            // 현재 선택된 파일이 없으면 input 값 비우기
            if (compLandReg_myPcFiles.files.length === 0) {
                compLandReg_myPcFiles.value = '';
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

        compLandReg_myPcFiles.value = '';


        // 값 잘 사라졌는지 확인
        console.log(compLandReg_myPcFiles.value);


        if (compLandReg_myPcFiles.files.length == 0) {
            compLandReg_myPcFiles.value = '';
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
        const filesArray = Array.from(compLandReg_myPcFiles.files);
        const newDataTransfer = new DataTransfer();
        filesArray.forEach(file => {
            if (file.name !== fileNameToRemove) {
                newDataTransfer.items.add(file);
            }
        });
        compLandReg_myPcFiles.files = newDataTransfer.files; // 새로운 files 설정
    };

}

//compLandRegFileEvent();

// check박스 체크되었을 때

const checkboxEventforCompLandReg = () => {
    const checkboxSection = document.querySelector('#compLandReg .subordinateRts');
    const checkboxContents = checkboxSection.querySelectorAll('input[type="checkbox"]');
    const checkDelBtn = checkboxSection.querySelector('.delBtn');

    checkboxSection.addEventListener('click', function (event) {
        if (event.target.type === 'checkbox') {
            const checkedContents = checkboxSection.querySelectorAll('input[type="checkbox"]:checked');
            console.log(checkedContents.length);

            if (checkedContents.length > 0) {
                checkDelBtn.classList.add('active');
            } else {
                checkDelBtn.classList.remove('active');
            }

        } else if (event.target.classList.contains('delBtn')) {
            const checkedContents = checkboxSection.querySelectorAll('input[type="checkbox"]:checked');
            console.log(checkedContents.length);
            if (checkedContents.length > 0) {
                checkDelBtn.classList.add('active');
            } else {
                checkDelBtn.classList.remove('active');
            }
        }
    })

}
checkboxEventforCompLandReg();


/* js추가 검색팝업오픈 */

const compLandRegSearchOpenPopUp = () => {

    const compLandRegsSearchBtn = document.querySelector(".compLandRegsSearchBtn");
    const compLandRegSearchResultPop = document.querySelector(".compLandRegSearchResultPopWrapper");
    let htmlFilePath = '/components/popuphtml/searchResultsPopup.html'; // 삽입할 html 파일 경로

    if (compLandRegsSearchBtn) {

        let xhr = new XMLHttpRequest();
        xhr.open('GET', htmlFilePath, true);
        xhr.onreadystatechange = function () {
            if (xhr.readyState == 4 && xhr.status == 200) {
                compLandRegSearchResultPop.innerHTML = xhr.responseText;
                runScriptsInElement(compLandRegSearchResultPop); // 삽입된 html내 스크립트 실행 함수 호출
            }
        };
        xhr.send();
        console.log('compLandRegSearchResultPop 작동');
        compLandRegsSearchBtn.addEventListener("click", () => {

            const popupOpen = document.querySelector("#searchResultsPopup .popupWrap");
            compLandRegsSearchBtn.classList.add("open");
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
}

compLandRegSearchOpenPopUp();