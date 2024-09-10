
// 초기화 시 모든 줄에 대해 함수 실행
$(document).ready(function() {
    console.log("gover/masterReg.js start");

    // 단/복선 초기화 및 관경 설정
    const sunGubunValue = $('#masterRegSelectBox06').val() || '단선'; // 값이 없으면 '단선'으로 설정
    toggleLineDisplay(sunGubunValue);

    // 단/복선 선택이 변경될 때마다 관경 설정
    $('#masterRegSelectBox06').on('change', function() {
        const selectedValue = $(this).val();
        toggleLineDisplay(selectedValue);
    });

    // 모든 셀렉트 박스에 대해 커스텀 셀렉트 박스 초기화 실행
    createCustomLimasterReg();  // 페이지가 로드될 때 초기화
});


$(document).on("click","input[type=checkbox]",function(){
	console.log("---------checkbox-------------");
	var targetDiv=$(this).parent().parent().parent().parent();
	console.log(targetDiv.find("ul"));
	
	
})


// 행 추가 함수
function addRow() {
  const template = document.getElementById('row-template');
  const clone = template.cloneNode(true);
  clone.style.display = '';

  // 고정된 첫 번째 줄을 제외한 새로 추가되는 줄만 대상으로 순번 계산
  const allRows = document.querySelectorAll('.landAdressInfo .depth1 .contents:not([style*="display: none;"])');
  const newRowNumber = allRows.length + 1;  // 고정된 첫 번째 줄을 제외하고 순번 계산
  clone.querySelector('input[readonly]').setAttribute('placeholder', newRowNumber);

  // 라디오 버튼의 name 속성을 유지하여 그룹화
  const newRadio = clone.querySelector('input[type="radio"]');
  if (newRadio) {
    newRadio.setAttribute('name', 'rep_flag');
  }

  // 제일 아래에 행 추가
  document.querySelector('.landAdressInfo .depth1').appendChild(clone);

  // 새로 추가된 행의 셀렉트 박스를 초기화하고 이벤트를 다시 바인딩
  createCustomLimasterReg(clone);
}

// 행 삭제 함수
function deleteRow(button) {
  const row = button.closest('.contents');
  row.remove();

  // 삭제 후 남아 있는 모든 행들의 순번을 재할당
  const allRows = document.querySelectorAll('.landAdressInfo .depth1 .contents:not([style*="display: none;"])');
  allRows.forEach((row, index) => {
    const seqInput = row.querySelector('input[readonly]');
    if (seqInput) {
      seqInput.setAttribute('placeholder', index + 1);  // 새로운 순번 할당
    }
  });
}

// 관경 표시 설정 함수
function toggleLineDisplay(value) {
  const singleLineDiv = $('.singleLine');
  const doubleLineDiv = $('.doubleLine');

  if (value === '단선') {
    singleLineDiv.show();
    doubleLineDiv.hide();
  } else if (value === '복선') {
    singleLineDiv.hide();
    doubleLineDiv.show();
  }
}

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

// 커스텀 selectbox

// 커스텀 selectbox 생성 및 이벤트 바인딩
const createCustomLimasterReg = (parentElement = document) => {
    const contentItems = parentElement.querySelectorAll('.selectContentArea');

    contentItems.forEach(contentItem => {
        const notsetAddSelectBox = contentItem.querySelector('select');
        // select가 없으면 return
        if (!notsetAddSelectBox) return;

        const customSelectBox = contentItem.querySelector('.customSelectBox');
        const customSelectBtns = customSelectBox.querySelector('.customSelectBtns');

        // 기존 버튼들 제거 후 다시 생성
        customSelectBtns.innerHTML = '';

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

        // 셀렉트 박스 보기 버튼 이벤트 바인딩
        customSelectBox.querySelector('.customSelectView').addEventListener('click', function() {
            this.classList.toggle('active');
            customSelectBtns.classList.toggle('active');
        });

        // 리스트 클릭 시 선택한 값으로 변경하는 이벤트 바인딩
        customSelectBtns.querySelectorAll('.moreSelectBtn').forEach((moreBtn) => {
            moreBtn.addEventListener('click', function() {
                const selectedValue = moreBtn.textContent;
                const parentSelectBox = customSelectBox.querySelector('.customSelectView');
                
                // 선택한 값으로 셀렉트 박스의 텍스트 변경
                parentSelectBox.textContent = selectedValue;
                notsetAddSelectBox.value = selectedValue;

                // 선택한 후 셀렉트 박스 비활성화
                customSelectBox.querySelector('.customSelectBtns').classList.remove('active');
                parentSelectBox.classList.remove('active');
            });
        });
    });
};

createCustomLimasterReg();



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

        // masterRegSelectBox06의 값이 변경될 때에만 스타일 변경(단/복선 선택에 따른 관경 변경)
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

// **파일 첨부 기능 추가**
const masterRegFileEvent = () => {
    // 파일 입력 요소를 가져옴
    const masterReg_myPcFiles = document.getElementById('masterReg_myPcFiles');
    
    // masterReg_myPcFiles 요소가 존재하지 않으면 함수를 종료
    if (!masterReg_myPcFiles) {
        console.error("파일 첨부 요소를 찾을 수 없습니다.");
        return;
    }

    // 나머지 코드 - 요소가 존재할 경우만 실행
    const attachFileInfo = masterReg_myPcFiles.closest('.attachFileInfo');
    const fileUploadAfter = attachFileInfo.querySelector('.fileUploadAfter');
    const fileSaveBtn = attachFileInfo.querySelector('.fileSaveBtn');
    let fileInfoName = '';
    let fileInfoSize = '';
    let fileInfoType = '';

    masterReg_myPcFiles.addEventListener('change', function () {
        const existContents = fileUploadAfter.querySelectorAll('.contents');
        existContents.forEach((list) => list.remove());

        if (masterReg_myPcFiles.files.length > 0) {
            for (let i = 0; i <= masterReg_myPcFiles.files.length - 1; i++) {
                const file = masterReg_myPcFiles.files[i];
                fileInfoName = file.name;
                fileInfoSize = byteTransform(file.size);
                fileInfoType = file.type;

                const listBox = `
                <li class="btnbox"><button class="fileDeleteBtn"></button></li>
                <li class="content filenameBox">
                  <figure class="typeIcon"></figure><p class="fileNameText">${fileInfoName}</p>
                </li>
                <li class="content"><p>-</p></li>
                <li class="content"><p class="fileSizeText">${fileInfoSize}</p></li>
                `;
                
                const contentsUl = document.createElement('ul');
                contentsUl.classList.add('contents');
                contentsUl.innerHTML = listBox;
                fileUploadAfter.appendChild(contentsUl);
            }

            defaultFileUploadWrap.forEach((wrap) => wrap.classList.remove('active'));
            defaultFileUploadWrap[1].classList.add('active');
            fileSaveBtn.classList.add('active');
        } else {
            resetFileInput();
        }
    });

    // 파일 삭제 처리 함수
    const removeFile = (fileNameToRemove) => {
        const filesArray = Array.from(masterReg_myPcFiles.files);
        const newDataTransfer = new DataTransfer();
        filesArray.forEach(file => {
            if (file.name !== fileNameToRemove) newDataTransfer.items.add(file);
        });
        masterReg_myPcFiles.files = newDataTransfer.files;
    };

    fileUploadAfter.addEventListener('click', (event) => {
        if (event.target.classList.contains('fileDeleteBtn')) {
            const nearbyContents = event.target.closest('.contents');
            const fileNameToRemove = nearbyContents.querySelector('.fileNameText').textContent;
            removeFile(fileNameToRemove);
            nearbyContents.remove();
            if (masterReg_myPcFiles.files.length === 0) resetFileInput();
        }
    });

    function resetFileInput() {
        masterReg_myPcFiles.value = '';
        defaultFileUploadWrap.forEach((wrap) => wrap.classList.remove('active'));
        defaultFileUploadWrap[0].classList.add('active');
        fileSaveBtn.classList.remove('active');
    }

    function byteTransform(bytes) {
        const dataSize = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
        const d = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)), 10);
        return `${(bytes / (1024 ** d)).toFixed(1)} ${dataSize[d]}`;
    }
}
masterRegFileEvent();

// **검색 팝업 기능 추가**
const masterRegOpenPopUp = () => {
    const masterRegSearchBtn = document.querySelectorAll("#masterReg .searchAddressBtn");
    const masterRegSearchPop = document.querySelector(".masterRegSearchPopWrapper");
    const masterRegResultFilePath = '/components/popuphtml/searchResultsPopup.html';

    if (masterRegSearchBtn) {
        let xhr = new XMLHttpRequest();
        xhr.open('GET', masterRegResultFilePath, true);
        xhr.onreadystatechange = function () {
            if (xhr.readyState == 4 && xhr.status == 200) {
                masterRegSearchPop.innerHTML = xhr.responseText;
                runScriptsInElement(masterRegSearchPop);
            }
        };
        xhr.send();
        console.log('masterRegResultPop 작동');

        masterRegSearchBtn.forEach((btn) => {
            btn.addEventListener("click", () => {
                const popupOpen = document.querySelector("#searchResultsPopup .popupWrap");
                popupOpen.classList.add("active");
            });
        });
    }

    const runScriptsInElement = (element) => {
        const scripts = element.getElementsByTagName('script');
        for (let i = 0; i < scripts.length; i++) {
            const script = document.createElement('script');
            script.textContent = scripts[i].textContent;
            document.body.appendChild(script).parentNode.removeChild(script);
        }
    };
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