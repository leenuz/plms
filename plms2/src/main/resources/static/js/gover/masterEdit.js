
$(document).ready(function() {
  console.log("gover/masterEdit.js start");

  // 초기 로드 시 단/복선 값에 따라 div 표시
  const sunGubunValue = $('#masterEditSelectBox06').val();
  toggleLineDisplay(sunGubunValue);

  // 단/복선 선택이 변경될 때마다 div 표시 변경
  $('#masterEditSelectBox06').on('change', function() {
    const selectedValue = $(this).val();
    toggleLineDisplay(selectedValue);
  });
  
  // 모든 셀렉트 박스에 대해 커스텀 셀렉트 박스 초기화 실행
  createCustomLimasterReg();  // 페이지가 로드될 때 초기화
	  
  // 소속 토지 정보를 서버에서 받아서 행을 추가
  loadGoverPnuListRows();
});

// 서버에서 소속 토지 정보를 받아와서 행을 추가하는 함수
function loadGoverPnuListRows() {
  const idx = $('#gover_no').val();  // 관리번호 또는 idx를 가져옴
  console.log("idx: "+idx);
  $.ajax({
    url: '/gover/getGoverPnuList',  // 서버에서 소속 토지 정보를 받아오는 API
    method: 'GET',
    data: { idx: idx },  // 서버로 idx 값을 전달
    success: function(response) {
      console.log("response: ", response);

      // 응답이 JSON 문자열일 경우 파싱
      let parsedResponse = typeof response === 'string' ? JSON.parse(response) : response;

	  // response.data가 존재하는지 확인 후 처리
	  if (parsedResponse && parsedResponse.data) {
	    console.log("parsedResponse.data: ", parsedResponse.data);

	    // 각 데이터 항목마다 addRow 호출 후 데이터를 삽입
		parsedResponse.data.forEach(function(item, index) {
		  console.log("-----index: -----" + index);
		  console.log("item.gp_adm_office: " + item.gp_adm_office);

		  // 새 행 추가
		  addRow();

		  // 방금 추가된 행을 선택
		  var addedRow = $('#goverUl').find('.contents').last();

		  // 각 필드에 서버에서 받은 데이터 값 채우기
		  addedRow.find('input[readonly]').attr('placeholder', index + 1);  // 순번
		  addedRow.find('select[name="masterRegSelectBox16"]').val(item.gp_adm_office);  // 관리기관
		  addedRow.find('input[name="pnu"]').val(item.gp_pnu);  // PNU
		  addedRow.find('input[name="주소"]').val(item.gp_address);  // 주소

		  // 커스텀 셀렉트 박스에 선택된 값을 표시
		  var admOfficeSelectBox = addedRow.find('select[name="adm_office"]');
		  var customSelectView = addedRow.find('.customSelectView');
		  customSelectView.text(admOfficeSelectBox.find('option:selected').text());
		});
	  } else {
	    console.error('Response does not contain data');
	  }
    },
    error: function(error) {
      console.error('소속 토지 정보를 불러오는데 실패했습니다.', error);
    }
  });
}


// 체크박스 클릭 시 다른 체크박스들 비활성화
$(document).on("click", "input[type=checkbox]", function() {
    console.log("---------checkbox 클릭됨-------------");
    const currentCheckbox = $(this);
    const isChecked = currentCheckbox.is(":checked");

    // 다른 체크박스들을 비활성화
    if (isChecked) {
        $("input[type=checkbox]").not(this).prop("checked", false);
    }

    console.log(`선택된 체크박스: ${currentCheckbox.attr("id")}`);
});

// 행 추가 함수
var index = 1;
function addRow() {
	
	var thisUl=$(this).parent().parent().parent().parent();
	console.log(thisUl);
	var addUl=$("#row-template").html();
	// console.log(addUl);

	var addDiv = $('<ul class="contents" id="goverUl">'+addUl+'</ul>');
	console.log($(addDiv).html());
	
	//멀티체크박스 클릭을 위한 조치
	var pipe = addDiv.find('#masterRegSelectBox_');
	pipe.attr({'class':'masterRegSelectBox_'+index,'name' : 'masterRegSelectBox_'+index,'id': 'masterRegSelectBox_'+index});
	var label1 = pipe.closest('li').find('label').first();
	label1.attr({'for': 'masterRegSelectBox_'+index,'name' : 'masterRegSelectBox_'+index});

	// 순번 적용
	addDiv.find('input[readonly]').attr('placeholder', index); // 순번 적용
	index++; // index 값을 증가시켜 다음 버튼에 적용

	$("#goverUlDiv").append(addDiv);

	// 추가된 모든 행에 대해 순번 재할당
	updateRowNumbers();
}

// 행 삭제 함수
function deleteRow(button) {
  const row = button.closest('.contents');
  row.remove();

  // 삭제 후 남아 있는 모든 행들의 순번을 재할당
  updateRowNumbers(); // 순번 재할당 함수 호출
}

// 모든 행에 대해 순번 업데이트 함수
function updateRowNumbers() {
    const allRows = document.querySelectorAll('.landAdressInfo .depth1 .contents:not([style*="display: none;"])');
    allRows.forEach((row, index) => {
        const seqInput = row.querySelector('input[readonly]');
        if (seqInput) {
            seqInput.setAttribute('placeholder', index + 1);  // 새로운 순번 할당
        }
    });
}

// 모든 행에 대해 순번 업데이트 함수
function updateRowNumbers() {
  const allRows = document.querySelectorAll('.landAdressInfo .depth1 .contents:not([style*="display: none;"])');
  allRows.forEach((row, index) => {
    const seqInput = row.querySelector('input[readonly]');
    if (seqInput) {
      seqInput.setAttribute('placeholder', index + 1);  // 새로운 순번 할당
    }
  });
}

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
	console.log("----masterEdit.js 임시저장 버튼 클릭----")
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

// 체크박스 상태 변경 시 점용료 선납 여부 처리
function updateOccuprepayynValue(checkbox) {
    const form = checkbox.form;
    
    if (checkbox.checked) {
        checkbox.value = "1";  // 체크된 경우 value는 1
    } else {
        // 체크 해제된 경우 체크박스 value="0"으로 설정
        var hiddenInput = document.createElement('input');
        hiddenInput.type = 'hidden';
        hiddenInput.name = checkbox.name;
        hiddenInput.value = '0';
        form.appendChild(hiddenInput);
    }
}

// 커스텀 selectbox 생성 및 이벤트 바인딩
const createCustomLimasterReg = (parentElement = document) => {
    const contentItems = parentElement.querySelectorAll('.selectContentArea');

    contentItems.forEach(contentItem => {
        const notsetAddSelectBox = contentItem.querySelector('select');
        if (!notsetAddSelectBox) return; // select가 없으면 return

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

                // 만약 단/복선 선택 박스(masterRegSelectBox06)일 경우 toggleLineDisplay 호출
                if (notsetAddSelectBox.id === 'masterRegSelectBox06') {
                    toggleLineDisplay(selectedValue);
                }
            });
        });
    });
};

//createCustomLimasterReg();

// 동적으로 추가된 요소에 이벤트를 바인딩하는 방법
$(document).on('click', '.customSelectView', function() {
    // 버튼 클릭 시 실행할 코드
    $(this).toggleClass('active');

    if ($(this).next()) {
        $(this).next().toggleClass('active');

    }
});

// .moreSelectBtn 요소에 대한 클릭 이벤트 등록
$(document).on('click', '.moreSelectBtn', function() {
    var moreSelectBtnText = $(this).text();

    const parentMoreSelectBtn = $(this).closest('.customSelectBtns');
    const EditCustomViewBtn = parentMoreSelectBtn.prev('.customSelectView');

//    // EditCustomViewBtn의 모든 자식을 제거
    EditCustomViewBtn.empty();
//
//    // 새로운 텍스트 노드를 추가합니다.
    EditCustomViewBtn.text(moreSelectBtnText);
//
    EditCustomViewBtn.removeClass('active');
    parentMoreSelectBtn.removeClass('active');
//
//    // 선택한 걸 select의 value값으로 변경하기
    const nearByContent = $(this).closest('.selectContentArea');
    const nearBySelectBox = nearByContent.find('select');
    nearBySelectBox.val(moreSelectBtnText);
    console.log(`Selected value: ${nearBySelectBox.val()}`);
});


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

allCheckEventMasterEdit();

/* 변경이력불러오기 */

const masterEditChangeHistoryOpenEvet = () => {

    const masterEditHistoryBtn = document.querySelector("#masterEdit .masterEditHistoryBtn");
    const masterEditChangeHistoryWrapper = document.querySelector(".masterEditChangeHistoryWrapper");
    let masterEditHistoryPath = '/components/popuphtml/changehistoryPopup.html'; //변경이력

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
    let masterEditExcelFilePath = '/components/popuphtml/exceluploadPopup.html'; // 엑셀업로드

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

// 선택된 버튼 값이 select 박스의 값으로 동기화되도록 JavaScript를 추가합니다.
document.querySelectorAll('.moreSelectBtn').forEach(button => {
    button.addEventListener('click', function() {
        var selectedValue = button.textContent;
        
        // 버튼에 선택된 값 표시
        var customSelectViewBtn = button.closest('.customSelectBox').querySelector('.customSelectView');
        customSelectViewBtn.textContent = selectedValue;

        // 숨겨진 select 태그의 값 업데이트
        var selectBox = button.closest('.selectContentArea').querySelector('select');
        selectBox.value = selectedValue;
    });
});
