//커스텀 selectbox

createCustomLiEasementModify();

function createCustomLiEasementModify() {
    const contentItems = document.querySelectorAll('.selectContentArea');

    contentItems.forEach(contentItem => {
        const easementModificationSelectBox = contentItem.querySelector('select');
        // select가 없으면 return
        if (!easementModificationSelectBox) return;

        const customSelectBox = contentItem.querySelector('.customSelectBox');
        const customSelectBtns = customSelectBox.querySelector('.customSelectBtns');

        for (let i = 0; i < easementModificationSelectBox.length; i++) {
            const optionValue = easementModificationSelectBox.options[i].value;
            const li = document.createElement('li');
            const button = document.createElement('button');
            button.classList.add('moreSelectBtn');
            button.type = 'button';
            button.textContent = optionValue;
            li.appendChild(button);
            customSelectBtns.appendChild(li);
        }
    });
}


const customSelectView = document.querySelectorAll('.customSelectView')

customSelectView.forEach((btn) => {
    btn.addEventListener('click', function(){

        btn.classList.toggle('active')
        if (btn.nextElementSibling) {
            btn.nextElementSibling.classList.toggle('active')


        }
    })
} )


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
    })
})


// 소유자 정보 추가 click시 이벤트

// const ownerInfoAddBtn = document.querySelectorAll('#easementModification .ownerInfo .addBtn')
// const editBefore = document.querySelectorAll('#easementModification .ownerInfo .contents .content.btnBox .editBefore');
// const editAfter = document.querySelectorAll('#easementModification .ownerInfo .contents .content.btnBox .editAfter');
// const editContent = document.querySelectorAll('#easementModification .editSpace');
// const registBtn = document.querySelectorAll('#easementModification .registBtn');

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

// 추가
// 소유자 정보 click 이벤트

const easementModiInfoAddBtnEvent = () => {
    const infoContentsDetailBox = document.querySelector('#easementModification .ownerInfo .contentDetailBox');
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

            for (let i = 1; i <= 6; i++) {
                // li 만들기
                const infoLi = document.createElement('li');
                infoLi.classList.add('content');
                infoLi.classList.add(`content0${i}`);

                if (i < 6) {
                    infoLi.classList.add('editSpace');
                    const infoInput = document.createElement('input');

                    infoInput.classList.add('editingContent');
                    infoInput.type = 'text';

                    infoLi.append(infoInput);
                }
                // content06의 경우
                if (i == 6) {
                    infoLi.classList.add('btnBox');

                    // div가 두개
                    for (let d = 0; d < 2; d++) {
                        const editDiv = document.createElement('div');

                        // 첫번째 div 설정
                        if (d == 0) {
                            editDiv.classList.add('editBefore');

                            // div 안에 div 두개
                            for (let g = 0; g < 2; g++) {
                                const btnWrapDiv = document.createElement('div');

                                btnWrapDiv.classList.add('btnWrap');
                                const infoMiniBtn = document.createElement('button');

                                if (g == 0) {
                                    infoMiniBtn.classList.add('addBtn');
                                    infoMiniBtn.classList.add('miniBtn');
                                    infoMiniBtn.textContent = '추가';
                                } else if (g == 1) {
                                    infoMiniBtn.classList.add('delBtn');
                                    infoMiniBtn.classList.add('miniBtn');
                                    infoMiniBtn.textContent = '삭제';
                                }

                                btnWrapDiv.appendChild(infoMiniBtn);

                                editDiv.appendChild(btnWrapDiv);

                            }
                        } else if (d == 1) {
                            editDiv.classList.add('editAfter');

                            const btnWrapDiv = document.createElement('div');

                            btnWrapDiv.classList.add('newBtnWrap');

                            const infoMiniBtn = document.createElement('button');
                            infoMiniBtn.classList.add('registBtn');
                            infoMiniBtn.classList.add('miniBtn');
                            infoMiniBtn.textContent = '등록'
                            btnWrapDiv.appendChild(infoMiniBtn);

                            editDiv.appendChild(btnWrapDiv);
                        }

                        infoLi.appendChild(editDiv);
                    }

                }

                infoUl.appendChild(infoLi);

                infoContentsBox.appendChild(infoUl);
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


        const infoContents = infoContentsDetailBox.querySelectorAll('.contents');

        if (infoContents.length > 4) {
            infoContentsBox.classList.add('contentScr');
            infoTitles.classList.add('titleScr');


        } else {
            infoContentsBox.classList.remove('contentScr');
            infoTitles.classList.remove('titleScr');
        }


    })

}
easementModiInfoAddBtnEvent();


// 기본 정보 -> 주소 검색

const radioButtons = document.querySelectorAll('#easementModification .defaultInfo .contWrap .depth2 .contents .content02 .radioBox .inputArea .inputWrap input[name="easementModification_addressInput"]');
const inputAreas = document.querySelectorAll('#easementModification .defaultInfo .contWrap .depth2 .contents .content02 .radioBox .inputArea');

radioButtons.forEach((radio) => {
    radio.addEventListener('click', () => {
        inputAreas.forEach((area) => {
            if (area.contains(radio)) {
                area.querySelectorAll(':scope > *:not(.inputWrap)').forEach((child) => {
                    child.classList.remove('disabled');
                });
            } else {
                area.querySelectorAll(':scope > *:not(.inputWrap)').forEach((child) => {
                    child.classList.add('disabled');
                });
            }
        });

    });
});

const checkedRadio = document.querySelector('#easementModification .defaultInfo .contWrap .depth2 .contents .content02 .radioBox .inputArea .inputWrap input[name="easementModification_addressInput"]:checked');
if (checkedRadio) {
    checkedRadio.dispatchEvent(new Event('click'));
}


// 첨부파일 전체 선택 체크박스
// const AllCheckEventEasementModification = () => {

//     // 첨부파일 리스트들
//     const attachFiles = document.querySelectorAll('input[name="easementModification_attachFile"]');
//     // checked가 된 첨부파일 리스트
//     const clickedAttachFiles = document.querySelectorAll('input[name="easementModification_attachFile"]:checked');
//     // 전체선택 input
//     const clickedAllinput = document.querySelector('input[name="easementModification_file_select_all"]');

//     // 전체선택되게 하기
//     clickedAllinput.addEventListener('click', function () {
//         clickedSelectAllEasementModification(clickedAllinput);
//     })
//     // 개당 선택시 전체 선택되게하기
//     attachFiles.forEach((checkList) => {
//         checkList.addEventListener('click', function () {

//             clickCheckBoxEventEasementModification(checkList);
//         })
//     })

//     // 개별 리스트 클릭시 전체로 변하기
//     function clickCheckBoxEventEasementModification() {
//         // 최신으로 업데이트 해주기
//         const clickedAttachFiles = document.querySelectorAll('input[name="easementModification_attachFile"]:checked');

//         if (attachFiles.length === clickedAttachFiles.length) {
//             clickedAllinput.checked = true;
//         } else {
//             clickedAllinput.checked = false;
//         }
//     }

//     // 전체선택 클릭시 
//     function clickedSelectAllEasementModification(clickedAllinput) {
//         const attachFiles = document.querySelectorAll('input[name="easementModification_attachFile"]');

//         attachFiles.forEach((checkbox) => {
//             checkbox.checked = clickedAllinput.checked;
//         })
//     }
// }

// AllCheckEventEasementModification();

// 파일 첨부 기본 모습

const defaultFileUploadWrap = document.querySelectorAll('.fileUploadDisplay');

defaultFileUploadWrap[0].classList.add('active');



// 파일 첨부시 모습 변경, x버튼 클릭시 비우기

const easementModificationFileEvent = () => {
    const easementModification_myPcFiles = document.getElementById('easementModification_myPcFiles');
    // input[type file]을 가진 제일 큰 부모
    const attachFileInfo = easementModification_myPcFiles.closest('.attachFileInfo');
    // 업로드시 보이는 라벨
    const fileUploadAfter = attachFileInfo.querySelector('.fileUploadAfter');
    const allContents = fileUploadAfter.querySelectorAll('.contents');
    const fileSaveBtn = attachFileInfo.querySelector('.fileSaveBtn');

    var fileInfoName = '';
    var fileInfoSize = '';
    var fileInfoType = '';

    easementModification_myPcFiles.addEventListener('change', function () {

        // 기존의 ul 초기화
        const existContents = fileUploadAfter.querySelectorAll('.contents')
        console.log(existContents)

        existContents.forEach((list) => {
            list.remove();
        })

        if (easementModification_myPcFiles.files.length > 0) {

            for (let i = 0; i <= easementModification_myPcFiles.files.length - 1; i++) {
                const thisFileName = easementModification_myPcFiles.files[i].name;
                const thisFileSize = easementModification_myPcFiles.files[i].size;
                const thisFileType = easementModification_myPcFiles.files[i].type;

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
            console.log(easementModification_myPcFiles.value)

            defaultFileUploadWrap.forEach((wrap) => {
                wrap.classList.remove('active');
            })
            defaultFileUploadWrap[1].classList.add('active');
            fileSaveBtn.classList.add('active');


        } else {

            easementModification_myPcFiles.value = '';
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

            console.log(easementModification_myPcFiles.files.length);

            // 현재 선택된 파일이 없으면 input 값 비우기
            if (easementModification_myPcFiles.files.length === 0) {
                easementModification_myPcFiles.value = '';
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
        easementModification_myPcFiles.value = '';


        // 값 잘 사라졌는지 확인
        console.log(easementModification_myPcFiles.value);


        if (easementModification_myPcFiles.files.length == 0) {
            easementModification_myPcFiles.value = '';
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
        const filesArray = Array.from(easementModification_myPcFiles.files);
        const newDataTransfer = new DataTransfer();
        filesArray.forEach(file => {
            if (file.name !== fileNameToRemove) {
                newDataTransfer.items.add(file);
            }
        });
        easementModification_myPcFiles.files = newDataTransfer.files; // 새로운 files 설정
    };

}

easementModificationFileEvent();


/* js추가 검색팝업오픈 */

const easeModificationOpenPopUp = () => {

     const easeModificationBtn = document.querySelector(".easeModificationBtn");
     const easeModificationResultPop = document.querySelector(".easeModificationResultPopWrapper");
     let htmlFilePath = '/components/popuphtml/searchResultsPopup.html'; // 삽입할 html 파일 경로

     if(easeModificationBtn){
        
        let xhr = new XMLHttpRequest();
        xhr.open('GET', htmlFilePath, true);
        xhr.onreadystatechange = function() {
            if (xhr.readyState == 4 && xhr.status == 200) {
                easeModificationResultPop.innerHTML = xhr.responseText;
                runScriptsInElement(easeModificationResultPop); // 삽입된 html내 스크립트 실행 함수 호출
            }
        };
        xhr.send();
        console.log('easeModificationResultPop 작동');
        easeModificationBtn.addEventListener("click" , () => {
        
            const popupOpen = document.querySelector("#searchResultsPopup .popupWrap");
            easeModificationBtn.classList.add("open");
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

easeModificationOpenPopUp();