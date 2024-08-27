// 커스텀 selectbox

createCustomLi();

function createCustomLi () {
    const contentItems = document.querySelectorAll('.content');

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

        // figure 제거
        // figure 요소를 다시 추가합니다.
        // const figure = document.createElement('figure');
        // EditCustomViewBtn.appendChild(figure);


        EditCustomViewBtn.classList.remove('active')
        parentMoreSelectBtn.classList.remove('active')

        // 선택한 걸 select의 value값으로 변경하기
        
        const nearByContent = moreBtn.closest('.content');
        const nearBySelectBox = nearByContent.querySelector('select');
        nearBySelectBox.value = moreBtn.textContent;
        console.log(`Selected value: ${nearBySelectBox.value}`);
    })
})


/* 라디오버튼 클릭시 각 영역 사용여부  */

const notsetAddRadioEvet = () => {
 
     const addressInputNames = document.getElementsByName("addressInput");
     const addressInputNames02 = document.getElementsByName("addressInput02");
     const addressInputBox01 = document.querySelector(".addressInputBox01");
     const addressInputBox02 = document.querySelector(".addressInputBox02");
     const addressInputBox03 = document.querySelector(".addressInputBox03");
     const addressInputBox04 = document.querySelector(".addressInputBox04");
     const selectRadioEvet01 = document.querySelectorAll(".selectRadioEvet01 .customSelectView");
     const selectRadioEvet02 = document.querySelectorAll(".selectRadioEvet02 .customSelectView");

     console.log(selectRadioEvet01);
     console.log(selectRadioEvet02);


     if(addressInputNames){
        addressInputNames.forEach((radioBtns, index) => {
           radioBtns.addEventListener("change" , () => {
               if(radioBtns.checked){
                if(index === 0){
                    return  addressInputBox01.readOnly = false,
                    addressInputBox02.readOnly = true,
                    selectRadioEvet01.forEach((btns) => btns.disabled = true);
  
                }else if(index === 1){
                    return  addressInputBox01.readOnly = true,
                    addressInputBox02.readOnly = false,
                    selectRadioEvet01.forEach((btns) => btns.disabled = false);
                }else{
                }
   
               }
           })
        })
       }

    if(addressInputNames02){
        addressInputNames02.forEach((radioBtns, index) => {
           radioBtns.addEventListener("change" , () => {
               if(radioBtns.checked){
                if(index === 0){
                    return  addressInputBox03.readOnly = false,
                    addressInputBox04.readOnly = true,
                    selectRadioEvet02.forEach((btns) => btns.disabled = true);
  
                }else if(index === 1){
                    return  addressInputBox03.readOnly = true,
                    addressInputBox04.readOnly = false,
                    selectRadioEvet02.forEach((btns) => btns.disabled = false);
                }else{
                }
   
               }
           })
        })
       }

}

notsetAddRadioEvet();



/* 체크박스이벤트 */

const notsetAddCheckBoxsEvet = () => {

     const customCheckboxInput01 = document.getElementById("notsetAddCheckbox01");
     const customCheckBoxLabel01 = document.querySelector(".customCheckBoxLabel01");
     const customCheckboxInput02 = document.getElementById("notsetAddCheckbox02");
     const customCheckBoxLabel02 = document.querySelector(".customCheckBoxLabel02");
     const customCheckboxInput03 = document.getElementById("notsetReviseCheckbox03");
     const customCheckBoxLabel03 = document.querySelector(".customCheckBoxLabel03");
     const customCheckboxInput04 = document.getElementById("notsetReviseCheckbox04");
     const customCheckBoxLabel04 = document.querySelector(".customCheckBoxLabel04");

     if(customCheckboxInput01){
     customCheckboxInput01.addEventListener("change" , () => {
        if(customCheckboxInput01.checked){
            customCheckBoxLabel01.classList.add("active");
          }else{
            customCheckBoxLabel01.classList.remove("active");
          }
     });
     }
     if(customCheckboxInput02){
     customCheckboxInput02.addEventListener("change" , () => {
        if(customCheckboxInput02.checked){
          customCheckBoxLabel02.classList.add("active");
          }else{
            customCheckBoxLabel02.classList.remove("active");
          }
     })
    }
    if(customCheckboxInput03){
     customCheckboxInput03.addEventListener("change" , () => {
        if(customCheckboxInput03.checked){
          customCheckBoxLabel03.classList.add("active");
          }else{
            customCheckBoxLabel03.classList.remove("active");
          }
     })
    }
    if(customCheckboxInput04){
     customCheckboxInput04.addEventListener("change" , () => {
        if(customCheckboxInput04.checked){
          customCheckBoxLabel04.classList.add("active");
          }else{
            customCheckBoxLabel04.classList.remove("active");
          }
     })
    }
}

notsetAddCheckBoxsEvet();




/* 미설정/미점용 내역 수정 input_readonly */

const addReviseInputEvet = () => {

     const addDisabledInputBoxsInput = document.querySelectorAll(".addDisabledInputBoxs .contWrap .depth1 .contents li input");
     console.log(addDisabledInputBoxsInput);
     addDisabledInputBoxsInput.forEach((list) => list.setAttribute("readonly", "true"));
     
}    

addReviseInputEvet();


/* 검색버튼 클릭시 */


const notsetAddPopEvet = () => {
    const notsetAddPopBtn = document.querySelector(".notsetAddPopBtn");
    console.log(notsetAddPopBtn);
    if (notsetAddPopBtn) {
        const notsetAddResultPop = document.querySelector(".notsetAddResultPop");
        let htmlFilePath = '/components/popuphtml/searchResultsPopup.html'; // 삽입할 html 파일 경로

        let xhr = new XMLHttpRequest();
        xhr.open('GET', htmlFilePath, true);
        xhr.onreadystatechange = function() {
            if (xhr.readyState == 4 && xhr.status == 200) {
                notsetAddResultPop.innerHTML = xhr.responseText;
                runScriptsInElement(notsetAddResultPop); // 삽입된 html내 스크립트 실행 함수 호출
            }
        };
        xhr.send();

        console.log('notsetAddResult 작동');

        notsetAddPopBtn.addEventListener("click", () => {
         const popupOpen = document.querySelector("#searchResultsPopup .popupWrap");
                notsetAddPopBtn.classList.add("open");
                popupOpen.classList.add("active");
        });
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

};


notsetAddPopEvet();

// 파일 첨부 기본 모습

const defaultFileUploadWrap = document.querySelectorAll('.fileUploadDisplay');

defaultFileUploadWrap[0].classList.add('active');



// 파일 첨부시 모습 변경, x버튼 클릭시 비우기

const notsetAddFileEvent = () => {

    let notsetAdd_myPcFiles
    if (document.getElementById('notsetAdd_myPcFiles')) {
        notsetAdd_myPcFiles = document.getElementById('notsetAdd_myPcFiles');
    } else if (document.getElementById('notsetAddRevise_myPcFiles')) {
        notsetAdd_myPcFiles = document.getElementById('notsetAddRevise_myPcFiles');
    }
    // input[type file]을 가진 제일 큰 부모
    const attachFileInfo = notsetAdd_myPcFiles.closest('.attachFileInfo');
    // 업로드시 보이는 라벨
    const fileUploadAfter = attachFileInfo.querySelector('.fileUploadAfter');
    const allContents = fileUploadAfter.querySelectorAll('.contents');
    const fileSaveBtn = attachFileInfo.querySelector('.fileSaveBtn');

    var fileInfoName = '';
    var fileInfoSize = '';
    var fileInfoType = '';

    notsetAdd_myPcFiles.addEventListener('change', function(){

        // 기존의 ul 초기화
        const existContents = fileUploadAfter.querySelectorAll('.contents')
        console.log(existContents)

        existContents.forEach((list) => {
            list.remove();
        })
        
        if (notsetAdd_myPcFiles.files.length > 0) {

            for (let i = 0; i <= notsetAdd_myPcFiles.files.length-1; i++) {
                const thisFileName = notsetAdd_myPcFiles.files[i].name;
                const thisFileSize = notsetAdd_myPcFiles.files[i].size;
                const thisFileType = notsetAdd_myPcFiles.files[i].type;

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
            console.log(notsetAdd_myPcFiles.value)

            defaultFileUploadWrap.forEach((wrap) => {
                wrap.classList.remove('active');
            })
            defaultFileUploadWrap[1].classList.add('active');
            fileSaveBtn.classList.add('active');


        } else {

            notsetAdd_myPcFiles.value = '';
            defaultFileUploadWrap.forEach((wrap) => {
                wrap.classList.remove('active');
            })
            defaultFileUploadWrap[0].classList.add('active');
            fileSaveBtn.classList.remove('active');
        }
    })

    // 개별 delbtn 누르면 생기는 이벤트
    fileUploadAfter.addEventListener('click',function(event){
        if (event.target.classList.contains('fileDeleteBtn')) {
            const fileDeleteBtns = fileUploadAfter.querySelectorAll('.fileDeleteBtn');
            const fileDelBtn = event.target;
            const nearbyContents = event.target.closest('.contents');
            const fileNameToRemove = nearbyContents.querySelector('.fileNameText').textContent; 

            // 파일명이랑 틀린 것만 저장하는 함수
            removeFile(fileNameToRemove);
            nearbyContents.remove();

            console.log(notsetAdd_myPcFiles.files.length);

            // 현재 선택된 파일이 없으면 input 값 비우기
            if (notsetAdd_myPcFiles.files.length === 0) {
                notsetAdd_myPcFiles.value = '';
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

    allDeleteFileBtn.addEventListener('click', function(){

        const nowAllContents = fileUploadAfter.querySelectorAll('.contents')
        nowAllContents.forEach((contents) => {
            contents.remove();
        })

        notsetAdd_myPcFiles.value = '';


        // 값 잘 사라졌는지 확인
        console.log(notsetAdd_myPcFiles.value);


        if (notsetAdd_myPcFiles.files.length == 0) {
            notsetAdd_myPcFiles.value = '';
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
        const filesArray = Array.from(notsetAdd_myPcFiles.files);
        const newDataTransfer = new DataTransfer();
        filesArray.forEach(file => {
            if (file.name !== fileNameToRemove) {
                newDataTransfer.items.add(file);
            }
        });
        notsetAdd_myPcFiles.files = newDataTransfer.files; // 새로운 files 설정
    };

}

notsetAddFileEvent();

// 소유자 정보  click이벤트

const notsetAddInfoClickEvent = () => {

    if (document.getElementById('notsetAddRevise')) {
        return;
    } 

    const infoContentsDetailBox = document.querySelector('#notsetAdd .ownerInfo .contWrap');
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

                // 1~ 2까지는 input만 있음
                if (i < 6) {

                    const infoInput = document.createElement('input');
                    infoInput.type = 'text';

                    // li안에 넣기
                    infoLi.append(infoInput);
                } else if (i == 6) {
                    infoLi.classList.add('firstBtnbox');

                    for (let r = 0; r < 2; r++) {

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

        }
        // 삭제 버튼 누를 때
        if (event.target.classList.contains('delBtn')) {
            var thisDelContent = event.target.closest('.contents');
            thisDelContent.remove();

        }
    })

}
notsetAddInfoClickEvent();

// notsetaddRevise click이벤트

const notsetAddReviseInfoClickEvent = () => {

    if (document.getElementById('notsetAdd')) {
        return;
    }

    const infoContentsDetailBoxRevise = document.querySelector('#notsetAddRevise .ownerInfo .contWrap');
    const infoContentsBoxRevise = infoContentsDetailBoxRevise.querySelector('.contentsBox');
    const infoAddBtnRevise = infoContentsDetailBoxRevise.querySelectorAll('.addBtn');
    const infoContentsRevise = infoContentsDetailBoxRevise.querySelectorAll('.contents');
    const infoTitlesRevise = infoContentsDetailBoxRevise.querySelector('.titles');


    infoContentsBoxRevise.addEventListener('click', function (event) {

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

                // 1~ 2까지는 input만 있음
                if (i < 6) {

                    const infoInput = document.createElement('input');
                    infoInput.type = 'text';

                    // li안에 넣기
                    infoLi.append(infoInput);
                } else if (i == 6) {
                    infoLi.classList.add('firstBtnbox');

                    for (let r = 0; r < 2; r++) {

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
                infoContentsBoxRevise.appendChild(infoUl);
            }

        }
        // 삭제 버튼 누를 때
        if (event.target.classList.contains('delBtn')) {
            var thisDelContent = event.target.closest('.contents');
            thisDelContent.remove();

        }
    })

}
notsetAddReviseInfoClickEvent();