
$(document).ready(function() {
  console.log("gover/masterReg.js start");

  // 초기 로드 시 단/복선 값에 따라 관경 설정
  const sunGubunValue = $('#masterRegSelectBox06').val() || '단선'; // 값이 없으면 '단선'으로 설정
  toggleLineDisplay(sunGubunValue);

  // 단/복선 선택이 변경될 때마다 관경 설정
  $('#masterRegSelectBox06').on('change', function() {
    const selectedValue = $(this).val();
    toggleLineDisplay(selectedValue);
  });
});

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


const createCustomLimasterReg = () => {
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