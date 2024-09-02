// 커스텀 selectbox

$(document).ready(function() {
  console.log("gover/masterReg.js start");
  /*$('#jisa').niceSelect();*/
//testAjax();
//init_Table();
});

// '임시저장' 버튼 클릭 시, 폼 데이터를 로그로 출력
$(document).on("click", "#draftSaveBtn", function() {
	console.log("----masterReg.js 임시저장 버튼 클릭----")
	console.log($("#saveForm").serialize());
    var formSerializeArray = $('#saveForm').serializeArray(); // 폼 데이터를 직렬화하여 배열로 저장
    console.log(formSerializeArray); // 배열 형태로 폼 데이터 출력
    
    var object = {}; // 빈 객체 생성
    for (var i = 0; i < formSerializeArray.length; i++) { 
        object[formSerializeArray[i]['name']] = formSerializeArray[i]['value']; // 배열의 각 항목을 객체로 변환
    }
    
    var json = JSON.stringify(formSerializeArray); // 객체를 JSON 문자열로 변환
    console.log("----------jsonobj------------");
    console.log(json); // JSON 문자열 출력
});

// '승인요청' 버튼 클릭 시, 폼 데이터를 로그로 출력
$(document).on("click", "#requestBtn", function() {
	console.log("----masterReg.js 승인요청 버튼 클릭----")
	console.log($("#saveForm").serialize());
    var formSerializeArray = $('#saveForm').serializeArray(); // 폼 데이터를 직렬화하여 배열로 저장
    console.log(formSerializeArray); // 배열 형태로 폼 데이터 출력
    
    var object = {}; // 빈 객체 생성
    for (var i = 0; i < formSerializeArray.length; i++) { 
        object[formSerializeArray[i]['name']] = formSerializeArray[i]['value']; // 배열의 각 항목을 객체로 변환
    }
    
    var json = JSON.stringify(formSerializeArray); // 객체를 JSON 문자열로 변환
    console.log("----------jsonobj------------");
    console.log(json); // JSON 문자열 출력
});


const createCustomLimasterReg = () => {
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
createCustomLimasterReg();



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
const masterRegSelectboxClickEvent01 = () => {
    const contentContainer = document.querySelectorAll('#masterReg .contWrap');
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

masterRegSelectboxClickEvent01();

// customSelectBtns 리스트 click 했을 때 해당 내용으로 바뀌게하기

 const MoreSelectBtn = document.querySelectorAll('.moreSelectBtn')

 MoreSelectBtn.forEach((moreBtn) => {
     moreBtn.addEventListener('click', function () {
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
         const lineValue = document.getElementById('masterRegSelectBox06');

         if (nearBySelectBox === lineValue) {
             const singleLine = document.querySelector('#masterReg .lineWrap .singleLine');
             const doubleLine = document.querySelector('#masterReg .lineWrap .doubleLine');

             if (lineValue.value == '단선') {
                 doubleLine.style.display = 'none';
                 singleLine.style.display = 'block';
             } else if (lineValue.value == '복선') {
                 singleLine.style.display = 'none';
                 doubleLine.style.display = 'flex';
             }
         }
     })
 })

const masterRegSelectboxClickEvent02 = ()=> {
    const contentContainer02 = document.querySelectorAll('#masterReg .contWrap');

    // 초기모습
    const lineWrap = document.querySelector('#masterReg .lineWrap');
    const lineContents = lineWrap.querySelectorAll('#masterReg .lineContent');
    // 먼저 class제거해주기
    lineContents.forEach((line) => {
        line.classList.remove('active');
    })
    lineContents[0].classList.add('active');

    // east, west 감싼 제일 큰 wrap, active 붙으면 display:block
    const secondTitleWrap = document.querySelector('#masterReg .defaultInfo .contWrap .secondTitleWrap');
    // titles 높이(active 붙으면 height 90px)
    const defaultInfoTitles = document.querySelector('#masterReg .defaultInfo .contWrap .depth1 .titles');

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
                const lineValue = document.getElementById('masterRegSelectBox06');

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
};

masterRegSelectboxClickEvent02();


// ul의 순번을 구하는 함수

const getInfoIndex = (event) => {
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

const masterRegInfoAddBtnEvent = () => {
    const infoContentsDetailBox = document.querySelector('#masterReg .landAdressInfo .contWrap');
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

            for (let i = 1; i <= 12; i++) {
                // li 만들기
                const infoLi = document.createElement('li');
                infoLi.classList.add('content');

                if (i == 1) {
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
                } else if (i == 2 || i == 3 || i == 7 || i == 10 ) {

                    // selectbox 세팅하기
                    infoLi.classList.add('selectContentArea');

                    if ( i == 2) {
                        infoLi.classList.add('largeWidth');
                    } else if (i == 3 || i == 10) {
                        infoLi.classList.add('middleWidth');
                    }

                    // select 담을 큰 그릇 만들기
                    const divideHidden = document.createElement('div');
                    divideHidden.classList.add('hiddenSelectBox');
                    // select tag 만들기
                    const divideSelect = document.createElement('select');
                    // id 안겹치게
                    divideSelect.id = `masterRegSelectBox${Date.now()}_${i}`;
                    divideSelect.name = divideSelect.id;
                    divideSelect.hidden = true;

                    // option 만들기

                    if ( i == 2 ) {
                        const facilityOption = ['전체', '강서구-건설과', '한강사업본부-운영총괄과', '안전건설과','덕양구-안전건설과' ]
                        for (let n = 0 ; n<5 ; n++ ) {
                            const divideOption = document.createElement('option');
                            divideOption.value = facilityOption[n];
                            divideOption.textContent = facilityOption[n];

                            divideSelect.appendChild(divideOption);
                        }

                    } else if ( i == 3) {
                        for (let n = 1; n < 11; n++) {
                            const divideOption = document.createElement('option');

                            if (n == 1) {
                                divideOption.value = '선택';
                                divideOption.textContent = '선택';
                            } else {
                                divideOption.value = `선택${n}`;
                                divideOption.textContent = `선택${n}`;
                            }


                            divideSelect.appendChild(divideOption);
                        }
                    } else if (i == 7) {
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
                    } else if ( i == 10 ) {
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
                    customButton.textContent = allOption[0].value;

                    // custom list
                    const customUl = document.createElement('ul');
                    customUl.classList.add('customSelectBtns');

                    customSection.appendChild(customButton);
                    customSection.appendChild(customUl);

                    infoLi.appendChild(customSection);

                } else if (i == 4) {
                    infoLi.classList.add('checkboxWrap');

                    // input checkbox 세팅
                    const checkboxInput = document.createElement('input');
                    checkboxInput.type = 'checkbox';
                    checkboxInput.id = `masterReg_checkbox_${Date.now()}_${i}`;

                    infoLi.appendChild(checkboxInput);

                    // label 세팅
                    const checkboxLabel = document.createElement('label');
                    checkboxLabel.setAttribute('for', checkboxInput.id);

                    infoLi.appendChild(checkboxLabel);

                }  else if (i == 5) {
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

                } else if (i == 6 || i ==8 || i == 9) {
                    if(i == 6) {
                        infoLi.classList.add('middleWidth');
                    }

                    // input 만들기
                    const infoInput = document.createElement('input');
                    infoInput.type = 'text';

                    infoLi.appendChild(infoInput);

                } else if (i == 11) {
                    infoLi.classList.add('btnBox');
                    
                    const viewBtn = document.createElement('button');
                    // 버튼 class 추가
                    viewBtn.classList.add('miniBtn');
                    viewBtn.classList.add('lightBlueBtn');
                    viewBtn.classList.add('viewDetailButton');
                    viewBtn.textContent = '위치보기';

                    infoLi.appendChild(viewBtn);
                } else if (i == 12) {
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

            createCustomLimasterReg();

            // 순번
            const contentsNum = infoUl.querySelector('.contentsNum');
            contentsNum.placeholder = getInfoIndex(infoUl) + 1;

        }
        // 삭제 버튼 누를 때
        if (event.target.classList.contains('delBtn')) {
            var thisDelContent = event.target.closest('.contents');
            thisDelContent.remove();

            const nowContents = infoContentsBox.querySelectorAll('.contents');
            nowContents.forEach((ul) => {
                const newUlNum = ul.querySelector('.contentsNum');
                newUlNum.placeholder = getInfoIndex(ul) + 1;

            })

        }
        // 검색 버튼 누를 때
        if (event.target.classList.contains('searchAddressBtn')) {
            const searchbtn =  event.target;
            const popupOpen = document.querySelector("#searchResultsPopup .popupWrap");
            searchbtn.classList.add("open");
            popupOpen.classList.add("active");
        }

    })

}
masterRegInfoAddBtnEvent();

// 파일 첨부 기본 모습

const defaultFileUploadWrap = document.querySelectorAll('.fileUploadDisplay');

defaultFileUploadWrap[0].classList.add('active');

// 파일 첨부시 모습 변경, x버튼 클릭시 비우기

const masterRegFileEvent = () => {
    const masterReg_myPcFiles = document.getElementById('masterReg_myPcFiles');
    // input[type file]을 가진 제일 큰 부모
    const attachFileInfo = masterReg_myPcFiles.closest('.attachFileInfo');
    // 업로드시 보이는 라벨
    const fileUploadAfter = attachFileInfo.querySelector('.fileUploadAfter');
    const allContents = fileUploadAfter.querySelectorAll('.contents');
    const fileSaveBtn = attachFileInfo.querySelector('.fileSaveBtn');

    var fileInfoName = '';
    var fileInfoSize = '';
    var fileInfoType = '';

    masterReg_myPcFiles.addEventListener('change', function () {

        // 기존의 ul 초기화
        const existContents = fileUploadAfter.querySelectorAll('.contents')
        console.log(existContents)

        existContents.forEach((list) => {
            list.remove();
        })

        if (masterReg_myPcFiles.files.length > 0) {

            for (let i = 0; i <= masterReg_myPcFiles.files.length - 1; i++) {
                const thisFileName = masterReg_myPcFiles.files[i].name;
                const thisFileSize = masterReg_myPcFiles.files[i].size;
                const thisFileType = masterReg_myPcFiles.files[i].type;

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
            console.log(masterReg_myPcFiles.value)

            defaultFileUploadWrap.forEach((wrap) => {
                wrap.classList.remove('active');
            })
            defaultFileUploadWrap[1].classList.add('active');
            fileSaveBtn.classList.add('active');


        } else {

            masterReg_myPcFiles.value = '';
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

            console.log(masterReg_myPcFiles.files.length);

            // 현재 선택된 파일이 없으면 input 값 비우기
            if (masterReg_myPcFiles.files.length === 0) {
                masterReg_myPcFiles.value = '';
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

        masterReg_myPcFiles.value = '';


        // 값 잘 사라졌는지 확인
        console.log(masterReg_myPcFiles.value);


        if (masterReg_myPcFiles.files.length == 0) {
            masterReg_myPcFiles.value = '';
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
        const filesArray = Array.from(masterReg_myPcFiles.files);
        const newDataTransfer = new DataTransfer();
        filesArray.forEach(file => {
            if (file.name !== fileNameToRemove) {
                newDataTransfer.items.add(file);
            }
        });
        masterReg_myPcFiles.files = newDataTransfer.files; // 새로운 files 설정
    };

}

masterRegFileEvent();

/* 검색결과팝업 */

const masterRegOpenPopUp = () => {

    const masterRegSearchBtn = document.querySelectorAll("#masterReg .searchAddressBtn");
    const masterRegSearchPop = document.querySelector(".masterRegSearchPopWrapper");
    let masterRegResultFilePath = '/components/popuphtml/searchResultsPopup.html'; // 삽입할 html 파일 경로

    if (masterRegSearchBtn) {

        let xhr = new XMLHttpRequest();
        xhr.open('GET', masterRegResultFilePath, true);
        xhr.onreadystatechange = function () {
            if (xhr.readyState == 4 && xhr.status == 200) {
                masterRegSearchPop.innerHTML = xhr.responseText;
                runScriptsInElement(masterRegSearchPop); // 삽입된 html내 스크립트 실행 함수 호출
            }
        };
        xhr.send();
        console.log('masterRegResultPop 작동');

        masterRegSearchBtn.forEach((btn) => {

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

masterRegOpenPopUp();

/* 엑셀팝업불러오기 */

const ExcelPopOpenEvet = () => {

     const ExcelPopBtn = document.querySelector(".ExcelPopBtn");
     const masterRegExcelPopWrapper = document.querySelector(".masterRegExcelPopWrapper");
     let htmlFilePath = '/components/popuphtml/occupancy_Popup/exceluploadPopup.html'; // 엑셀업로드

     if(ExcelPopBtn){

        let xhr = new XMLHttpRequest();
        xhr.open('GET', htmlFilePath, true);
        xhr.onreadystatechange = function() {
            if (xhr.readyState == 4 && xhr.status == 200) {
                masterRegExcelPopWrapper.innerHTML = xhr.responseText;
                runScriptsInElement(masterRegExcelPopWrapper); // 삽입된 html내 스크립트 실행 함수 호출
            }
        };
        xhr.send();
        console.log('masterRegExcelPopWrapper 작동');
        ExcelPopBtn.addEventListener("click" , () => {
        
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
            script.textContent = scripts[i].textContent;
            document.body.appendChild(script).parentNode.removeChild(script);
        }
    }


     }
}



ExcelPopOpenEvet();