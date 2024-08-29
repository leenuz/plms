// 커스텀 selectbox

const createCustomLiMasterEdit = () => {
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
//createCustomLiMasterEdit();


const customSelectView = document.querySelectorAll('.customSelectView')

customSelectView.forEach((btn) => {
    btn.addEventListener('click', function () {
        btn.classList.toggle('active');

        if (btn.nextElementSibling) {
            btn.nextElementSibling.classList.toggle('active');

        }
    })
})


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
        const lineValue = document.getElementById('masterEditSelectBox06');

        if (nearBySelectBox === lineValue) {
            const singleLine = document.querySelector('#masterEdit .lineWrap .singleLine');
            const doubleLine = document.querySelector('#masterEdit .lineWrap .doubleLine');

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



// 첨부파일 전체 선택 체크박스
const allCheckEventMasterEdit = () => {

    // 첨부파일 리스트들
    const attachFiles = document.querySelectorAll('input[name="masterEdit_attachFile"]');
    // checked가 된 첨부파일 리스트
    const clickedAttachFiles = document.querySelectorAll('input[name="masterEdit_attachFile"]:checked');
    // 전체선택 input
    const clickedAllinput = document.querySelector('input[name="masterEdit_file_select_all"]');

    // 전체선택되게 하기
    clickedAllinput.addEventListener('click', function () {
        clickedSelectAllMasterEdit(clickedAllinput);
    })
    // 개당 선택시 전체 선택되게하기
    attachFiles.forEach((checkList) => {
        checkList.addEventListener('click', function () {

            clickCheckBoxEventMasterEdit(checkList);
        })
    })

    // 개별 리스트 클릭시 전체로 변하기
    function clickCheckBoxEventMasterEdit() {
        // 최신으로 업데이트 해주기
        const clickedAttachFiles = document.querySelectorAll('input[name="masterEdit_attachFile"]:checked');

        if (attachFiles.length === clickedAttachFiles.length) {
            clickedAllinput.checked = true;
        } else {
            clickedAllinput.checked = false;
        }
    }

    // 전체선택 클릭시 
    function clickedSelectAllMasterEdit(clickedAllinput) {
        const attachFiles = document.querySelectorAll('input[name="masterEdit_attachFile"]');

        attachFiles.forEach((checkbox) => {
            checkbox.checked = clickedAllinput.checked;
        })
    }
}

//allCheckEventMasterEdit();


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
           console.log(script);
           script.textContent = scripts[i].textContent;
           document.body.appendChild(script).parentNode.removeChild(script);
       }
   }


    }
}

masterEditExcelPopOpenEvet();