// 커스텀 selectbox

createCustomLiLandTermination();

function createCustomLiLandTermination() {
    const contentItems = document.querySelectorAll('.selectContentArea');

    contentItems.forEach(contentItem => {
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


// // 소유자 정보 추가 click시 이벤트

// const ownerInfoAddBtn = document.querySelectorAll('#landRightsRegistration .ownerInfo .addBtn')
// const editBefore = document.querySelectorAll('#landRightsRegistration .ownerInfo .contents .content.btnBox .editBefore');
// const editAfter = document.querySelectorAll('#landRightsRegistration .ownerInfo .contents .content.btnBox .editAfter');
// const editContent = document.querySelectorAll('#landRightsRegistration .editSpace');
// const registBtn = document.querySelectorAll('#landRightsRegistration .registBtn');

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

// // 추가 버튼 click 이벤트

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

const radioButtons = document.querySelectorAll('#landRightsRegistration .defaultInfo .contWrap .depth2 .contents .content02 .radioBox .inputArea .inputWrap input[name="landRightsRegistration_addressInput"]');
const inputAreas = document.querySelectorAll('#landRightsRegistration .defaultInfo .contWrap .depth2 .contents .content02 .radioBox .inputArea');

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

const checkedRadio = document.querySelector('#landRightsRegistration .defaultInfo .contWrap .depth2 .contents .content02 .radioBox .inputArea .inputWrap input[name="landRightsRegistration_addressInput"]:checked');
if (checkedRadio) {
    checkedRadio.dispatchEvent(new Event('click'));
}



// // 첨부파일 전체 선택 체크박스
// const allCheckEventTermination = () => {

//     // 첨부파일 리스트들
//     const attachFiles = document.querySelectorAll('input[name="landTerminationRegistration_attachFile"]');
//     // checked가 된 첨부파일 리스트
//     const clickedAttachFiles = document.querySelectorAll('input[name="landTerminationRegistration_attachFile"]:checked');
//     // 전체선택 input
//     const clickedAllinput = document.querySelector('input[name="landTerminationRegistration_file_select_all"]');

//     // 전체선택되게 하기
//     clickedAllinput.addEventListener('click', function () {
//         clickedSelectAllTermination(clickedAllinput);
//     })
//     // 개당 선택시 전체 선택되게하기
//     attachFiles.forEach((checkList) => {
//         checkList.addEventListener('click', function () {

//             clickCheckBoxEventTermination(checkList);
//         })
//     })

//     // 개별 리스트 클릭시 전체로 변하기
//     function clickCheckBoxEventTermination() {
//         // 최신으로 업데이트 해주기
//         const clickedAttachFiles = document.querySelectorAll('input[name="landTerminationRegistration_attachFile"]:checked');

//         if (attachFiles.length === clickedAttachFiles.length) {
//             clickedAllinput.checked = true;
//         } else {
//             clickedAllinput.checked = false;
//         }
//     }

//     // 전체선택 클릭시 
//     function clickedSelectAllTermination(clickedAllinput) {
//         const attachFiles = document.querySelectorAll('input[name="landTerminationRegistration_attachFile"]');

//         attachFiles.forEach((checkbox) => {
//             checkbox.checked = clickedAllinput.checked;
//         })
//     }
// }

// allCheckEventTermination();


// 파일 첨부 기본 모습

const defaultFileUploadWrap = document.querySelectorAll('.fileUploadDisplay');

defaultFileUploadWrap[0].classList.add('active');



// 파일 첨부시 모습 변경, x버튼 클릭시 비우기

const landTerminationRegistrationFileEvent = () => {
    const landTerminationRegistration_myPcFiles = document.getElementById('landTerminationRegistration_myPcFiles');
    // input[type file]을 가진 제일 큰 부모
    const attachFileInfo = landTerminationRegistration_myPcFiles.closest('.attachFileInfo');
    // 업로드시 보이는 라벨
    const fileUploadAfter = attachFileInfo.querySelector('.fileUploadAfter');
    const allContents = fileUploadAfter.querySelectorAll('.contents');
    const fileSaveBtn = attachFileInfo.querySelector('.fileSaveBtn');

    var fileInfoName = '';
    var fileInfoSize = '';
    var fileInfoType = '';

    landTerminationRegistration_myPcFiles.addEventListener('change', function () {

        // 기존의 ul 초기화
        const existContents = fileUploadAfter.querySelectorAll('.contents')
        console.log(existContents)

        existContents.forEach((list) => {
            list.remove();
        })

        if (landTerminationRegistration_myPcFiles.files.length > 0) {

            for (let i = 0; i <= landTerminationRegistration_myPcFiles.files.length - 1; i++) {
                const thisFileName = landTerminationRegistration_myPcFiles.files[i].name;
                const thisFileSize = landTerminationRegistration_myPcFiles.files[i].size;
                const thisFileType = landTerminationRegistration_myPcFiles.files[i].type;

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
            console.log(landTerminationRegistration_myPcFiles.value)

            defaultFileUploadWrap.forEach((wrap) => {
                wrap.classList.remove('active');
            })
            defaultFileUploadWrap[1].classList.add('active');
            fileSaveBtn.classList.add('active');


        } else {

            landTerminationRegistration_myPcFiles.value = '';
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

            console.log(landTerminationRegistration_myPcFiles.files.length);

            // 현재 선택된 파일이 없으면 input 값 비우기
            if (landTerminationRegistration_myPcFiles.files.length === 0) {
                landTerminationRegistration_myPcFiles.value = '';
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

        landTerminationRegistration_myPcFiles.value = '';


        // 값 잘 사라졌는지 확인
        console.log(landTerminationRegistration_myPcFiles.value);


        if (landTerminationRegistration_myPcFiles.files.length == 0) {
            landTerminationRegistration_myPcFiles.value = '';
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
        const filesArray = Array.from(landTerminationRegistration_myPcFiles.files);
        const newDataTransfer = new DataTransfer();
        filesArray.forEach(file => {
            if (file.name !== fileNameToRemove) {
                newDataTransfer.items.add(file);
            }
        });
        landTerminationRegistration_myPcFiles.files = newDataTransfer.files; // 새로운 files 설정
    };

}

landTerminationRegistrationFileEvent();
