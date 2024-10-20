/* ul 태그 개수 찾기 */
const getUlCountInContentsBox = (contentsBoxElement) => {
    // contentsBoxElement 내부에서 'contents' 클래스를 가진 모든 ul 태그를 찾음
    const ulElements = contentsBoxElement.querySelectorAll('ul.contents');
    // ul 태그들의 개수를 반환
    return ulElements.length;
}

// 마지막버튼의 id값 가져오기
//const contentsBox = document.querySelector('#togiInfoDiv .contentsBox');
//
//function getLastButtonId() {
//    // ul.contents 요소 모두 가져오기
//    const ulElements = contentsBox.querySelectorAll('ul.contents');
//
//    // ul 요소가 하나 이상 있는지 확인
//    if (ulElements.length > 0) {
//        // 마지막 ul 요소 선택
//        const lastUl = ulElements[ulElements.length - 1];
//
//        // 마지막 ul 내부의 버튼 요소 선택
//        const button = lastUl.querySelector('button.searchAddressBtn.landEditSearchBtn');
//
//        // 버튼이 존재하면 id 값 반환, 존재하지 않으면 null 반환
//        return button ? button.id : null;
//    } else {
//        // ul 요소가 없을 경우 null 반환
//        return null;
//    }
//}

// 토지개발 등록 시행자 관할 부서 click 이벤트

const landEditInfoAddBtnEvent01 = () => {

    const infoContentsDetailBox = document.querySelector('#landEdit .adminDept .contWrap');
    const infoContentsBox = infoContentsDetailBox.querySelector('.contentsBox');
    const infoAddBtn = infoContentsDetailBox.querySelectorAll('.addBtn');
    const infoContents = infoContentsDetailBox.querySelectorAll('.contents');
    const infoTitles = infoContentsDetailBox.querySelector('.titles');

    infoContentsBox.addEventListener('click', function (event) {
         const contentsBoxElement = document.querySelector('#deptDiv .contentsBox');
         const indexx = getUlCountInContentsBox(contentsBoxElement);

        // 버튼 클릭시 추가되게
        if (event.target.classList.contains('addBtn')) {
            // ul 만들기
            const infoUl = document.createElement('ul');
            infoUl.classList.add('contents');

            for (let i = 1; i <= 4; i++) {
                // li 만들기
                const infoLi = document.createElement('li');
                infoLi.classList.add('content');

                if (i < 4) {
                    // input 만들기
                    const infoInput = document.createElement('input');
                    infoInput.type = 'text';
                    if(i==1){
                    infoInput.name="dept_nm_" + indexx;
                    }else if(i==2){
                   infoInput.name="manager_" + indexx;
                    }else if(i==3){
                   infoInput.name="contact_num_" + indexx;
                    }
                    infoLi.appendChild(infoInput);

                } else if (i == 4) {
                    infoLi.classList.add('smallWidth');
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

        }
        // 삭제 버튼 누를 때
        if (event.target.classList.contains('delBtn')) {
            var thisDelContent = event.target.closest('.contents');
            thisDelContent.remove();
        }

    })

}
landEditInfoAddBtnEvent01();

// ul의 순번을 구하는 함수

const getInfoIndexForLandEdit = (event) => {
    let infoUlIndex = 0;
    let element = event;

    while ((element = element.previousElementSibling) != null) {
        if (element.classList.contains('contents')) {
            infoUlIndex++;
        }
    }

    return infoUlIndex;

}

// 토지개발 등록 -> 토지 정보 click event
    const infoContentsDetailBox02 = document.querySelector('#landEdit .landInfo .contWrap');
    const infoContentsBox02 = infoContentsDetailBox02.querySelector('.contentsBox');
    const infoContents02 = infoContentsDetailBox02.querySelectorAll('.contents');
    const infoTitles02 = infoContentsDetailBox02.querySelector('.titles');

    const contentsBoxElement = document.querySelector('#togiInfoDiv .contentsBox');
    let index = getUlCountInContentsBox(contentsBoxElement);

const landEditInfoAddBtnEvent02 = () => {

    infoContentsBox02.addEventListener('click', function (event) {

        // 버튼 클릭시 추가되게
        if (event.target.classList.contains('addBtn')) {

            // ul 만들기
            const infoUl = document.createElement('ul');
            infoUl.classList.add('contents');

            for (let i = 1; i <= 13; i++) {
                // li 만들기
                const infoLi = document.createElement('li');
                infoLi.classList.add('content');

                if (i == 1 || i == 4) {
                    infoLi.classList.add('checkboxWrap');
                    infoLi.classList.add('smallWidth');

                    // input checkbox 세팅
                    const checkboxInput = document.createElement('input');
                    checkboxInput.type = 'checkbox';

                    if (i == 1) {
                     checkboxInput.id ='landEdit_Checkbox_' + index;
                     }else if (i == 4){
                     checkboxInput.id ='landEditMainParcelChk_Checkbox_' + index;
                     checkboxInput.name ='landEditMainParcelChk_Checkbox01';
                   }

                    infoLi.appendChild(checkboxInput);

                    // label 세팅
                    const checkboxLabel = document.createElement('label');

                    checkboxLabel.setAttribute('for', checkboxInput.id);

                    infoLi.appendChild(checkboxLabel);

                 }else if(i == 3){
                        infoLi.classList.add('selectContentArea');
                        const newContent = `
                          <div class="hiddenSelectBox">
                            <select id="landDevelopmentManageSelectBox01" hidden>
                              <option value="" selected>선택</option>
                              <option value="지상권">지상권</option>
                              <option value="미설정">미설정</option>
                              <option value="점용">점용</option>
                              <option value="회사토지">회사토지</option>
                            </select>
                          </div>
                          <section class="customSelectBox">
                            <button class="customSelectView">선택</button>
                            <ul class="customSelectBtns">
                                <li><button class="moreSelectBtn" type="button">지상권</button></li>
                              <li><button class="moreSelectBtn" type="button">미설정</button></li>
                                <li><button class="moreSelectBtn" type="button">점용</button></li>
                              <li><button class="moreSelectBtn" type="button">회사토지</button></li>
                            </ul>
                          </section>
                        `;

                        // infoLi에 새 내용을 추가합니다.
                        infoLi.insertAdjacentHTML('beforeend', newContent);
                        var selectElement = infoLi.querySelector('#landDevelopmentManageSelectBox01');
                        selectElement.setAttribute('name', 'hakbo_' + index);
                   } else if (1<i && i<3 || 4<i && i<7 || 7<i && i<12) {
                    const infoInput = document.createElement('input');
                       infoInput.type = 'text';

                       if ( i == 2){
                           infoLi.classList.add('smallWidth');
                        infoInput.classList.add('contentsNum');
                           infoInput.readOnly = true;
                           infoInput.classList.add('notWriteInput');
                       } else if (4 < i && i < 7 || i == 11 ) {
                           infoLi.classList.add('middleWidth');
                        if(i == 5){
                          infoInput.name = 'jeochok_'+index;
                        }else if(i == 6){
                          infoInput.name = 'jisa_'+index;
                        }else if(i == 11){
                          infoInput.name = 'souja_'+index;
                        }
                       }else if(i == 8){
                            infoInput.name = 'jimok_'+index;
                           infoInput.readOnly = true;
                        infoInput.classList.add('jimokData');
                        infoInput.classList.add('notWriteInput');
                      } else if(i == 9){
                              infoInput.name = 'yeonjang_'+index;
                        }else if(i == 10){
                          infoInput.name = 'myeonjuk_'+index;
                          infoInput.readOnly = true;
                          infoInput.classList.add('areaData');
                          infoInput.classList.add('notWriteInput');
                        }

                       // li안에 넣기
                       infoLi.append(infoInput);
                   }  else if (i == 7) {
                       infoLi.classList.add('addressWidth');
                       // div 만들기
                       const addressDiv = document.createElement('div');
                       addressDiv.classList.add('addressData');
                       // input 만들기
                       const addressInput = document.createElement('input');
                       addressInput.id = 'address_'+index;
                       addressInput.name = 'address_'+index;
                       addressInput.type = 'text';

                       // div에 input 넣기

                       addressDiv.appendChild(addressInput);
                       infoLi.appendChild(addressDiv);

                       // 검색버튼 만들기

                       const addressBtn = document.createElement('button');
                       addressBtn.classList.add('searchAddressBtn');
                       // 추가
                       addressBtn.classList.add('landRegSearchBtn');

                       addressBtn.textContent = '검색';
                        addressBtn.id= index;
                       // li안에 넣기
                       infoLi.appendChild(addressBtn);
                       infoLi.classList.add('contentBox');


                    }else if (i == 12) {
                       infoLi.classList.add('btnBox');
                       infoLi.classList.add('middleWidth');

                       const viewBtn = document.createElement('button');
                       // 버튼 class 삭제
                        viewBtn.classList.add('lightBlueBtn');
                       viewBtn.classList.add('viewDetailButton');
                       viewBtn.textContent = '위치보기';
                       viewBtn.id = 'moveMap';

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
                infoContentsBox02.appendChild(infoUl);


            }

            // 순번
            const contentsNum = infoUl.querySelector('.contentsNum');
            contentsNum.placeholder = getInfoIndexForLandEdit(infoUl) + 1;
             index++;

        }
        // 삭제 버튼 누를 때
        if (event.target.classList.contains('delBtn')) {
            var thisDelContent = event.target.closest('.contents');
            thisDelContent.remove();

            const nowContents = infoContentsDetailBox02.querySelectorAll('.contents');
            nowContents.forEach((ul) => {
                const newUlNum = ul.querySelector('.contentsNum');
                newUlNum.placeholder = getInfoIndexForLandEdit(ul) + 1;
            })

        }
        if (event.target.classList.contains('landEditSearchBtn')) {
            var searchBtn = event.target;

            const popupOpen = document.querySelector("#searchResultsPopup .popupWrap");

            popupOpen.classList.add("active");
        }

    })

}
landEditInfoAddBtnEvent02();

/* 엑셀업로드팝업 */

const landEditExcelPopEvet = () => {

    const landEditExcelPopBtn = document.querySelector(".landEditExcelPopBtn");
    const landEditExcelPopWrapper = document.querySelector(".landEditExcelPopWrapper");
    let landEditExcelFilePath = '/components/popuphtml/occupancy_Popup/exceluploadPopup.html'; // 엑셀업로드

    if(landEditExcelPopBtn){

      let xhr = new XMLHttpRequest();
      xhr.open('GET', landEditExcelFilePath , true);
      xhr.onreadystatechange = function() {
          if (xhr.readyState == 4 && xhr.status == 200) {
             landEditExcelPopWrapper.innerHTML = xhr.responseText;
              runScriptsInElement(landEditExcelPopWrapper); // 삽입된 html내 스크립트 실행 함수 호출
          }
      };
      xhr.send();

       landEditExcelPopBtn.addEventListener("click" , () => {

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

//landEditExcelPopEvet();


/*select box*/
// 커스텀 selectbox

createCustomLiDivisionRegist();

function createCustomLiDivisionRegist() {
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
            if(optionValue != ''){
            const li = document.createElement('li');
            const button = document.createElement('button');
            button.classList.add('moreSelectBtn');
            button.type = 'button';
            button.textContent = optionValue;
            li.appendChild(button);
            customSelectBtns.appendChild(li);
            }
        }

        // 함수가 한번 적용된 selectContentArea에 class 붙여서 구분한다. 중복실행 되지 않도록
        contentItem.classList.add('customLiProcessed');
    });
}

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
});


// 드래그 앤 드롭 영역 파일 첨부 관련 코드 시작
	var objDragAndDrop = $(".fileUploadBox");
	
	// 드래그 앤 드롭 영역에 파일이 들어왔을 때
	$(".fileUploadBox").on("dragenter", function(e) {
	    e.stopPropagation();
	    e.preventDefault();
	    $(this).css('border', '2px solid #0B85A1');
	});

	// 드래그 앤 드롭 영역에서 파일을 드래그할 때
	$(".fileUploadBox").on("dragover", function(e) {
	    e.stopPropagation();
	    e.preventDefault();
	});

	// 파일을 드롭할 때
	$(".fileUploadBox").on("drop", function(e) {
	    e.preventDefault();
	    $(this).css('border', '2px dotted #0B85A1');
	    var files = e.originalEvent.dataTransfer.files; // 드래그한 파일 객체를 가져옴
	    handleFileUpload(files, $(this));  // 파일 처리 함수 호출
	});

	// 드래그 앤 드롭 영역을 클릭하면 파일 선택창을 띄움
	objDragAndDrop.on('click', function(e) {
	    if (!e.isTrigger) {  // 이 조건문은 이 이벤트가 수동 트리거된 경우를 방지합니다.
	        $('input[type=file][name="fileUpload"]').trigger('click'); // 파일 선택 창을 띄우는 트리거
	    }
	});
	 
	$('input[type=file][name="fileUpload"]').on('change', function(e) {
	    var files = e.originalEvent.target.files; // 파일 선택창에서 선택된 파일들
	    handleFileUpload(files, objDragAndDrop);  // 선택된 파일들을 처리하는 함수 호출
	});
    
	var rowCount = document.querySelectorAll("#fileListDiv > ul").length + 1;  // 현재 렌더된 파일 개수 계산
	
    function handleFileUpload(files,obj) {
       for (var i = 0; i < files.length; i++) { // 선택된 파일들을 하나씩 처리
            var fd = new FormData(); // FormData 객체 생성 (파일 업로드를 위한 객체)
            fd.append('file', files[i]); // 파일 객체를 FormData에 추가
     		
            // var status = new createStatusbar($("#fileTitleUl"),files[i].name,files[i].size,rowCount); // 파일 업로드 상태바 생성
			var status = new createStatusbar($("#fileListDiv"), files[i].name, files[i].size, rowCount, files[i].nfname); // 파일 업로드 상태바 생성
            sendFileToServer(fd,status); // 서버로 파일 전송 함수 호출
			
			rowCount++; // 파일이 추가될 때마다 rowCount를 증가시켜 고유한 id를 유지
       }
    }
    
// Status bar 생성 함수
    function createStatusbar(obj, name, size, no){
		
		var sizeStr="";
        var sizeKB = size/1024; // 파일 크기를 문자열로 표시하기 위한 변수
        if(parseInt(sizeKB) > 1024){
            var sizeMB = sizeKB/1024;
            sizeStr = sizeMB.toFixed(2)+" MB"; // MB로 변환
        }else{
            sizeStr = sizeKB.toFixed(2)+" KB"; // KB로 표시
        }
		
        var row = '<ul class="contents" id="fileListUl">';
		row += '<li class="selectWidth content checkboxWrap">';
		row += '<input type="checkbox" id="landEdit_attachFile'+no+'" name="landEdit_attachFile" >';
		row += '<label for="landEdit_attachFile'+no+'"></label>';
		row += '</li>';
		row += '<li class="content registDateWidth">';
		row += '<input type="text" value="" readonly class="notWriteInput" name="registDateWidth"/>';
		row += '</li>';
		row += '<li class="content fileNameWidth">';
		row += '<input type="text" value="' + name + '" id="filename" readonly class="notWriteInput" />';
		row += '<input type="hidden" name="newFileCheckYn" value="Y">'; //
		row += '</li>';
		row += '<li class="content viewBtnBox">';
		row += '<button class="viewDetailButton lightBlueBtn">보기</button>';
		row += '</li>';
		row += '</ul>';
		
        obj.prepend(row); // 파일 목록이 있는 DOM 요소 위에 파일 정보를 추가
		
		var radio=$(row).find('input'); // row에서 input 요소를 찾음
		$(radio).find('input').attr("disabled",false); // 체크박스가 비활성화되지 않도록 설정
    }
/* 첨부파일 
var fileNo = 1;
	var uploadFiles=new Array();
	  $(document).ready(function(){

	 var objDragAndDrop = $(".fileUploadBox");

	                $(document).on("dragenter",".fileUploadBox",function(e){
	                    e.stopPropagation();
	                    e.preventDefault();
	                    $(this).css('border', '2px solid #0B85A1');
	                });
	                $(document).on("dragover",".fileUploadBox",function(e){
	                    e.stopPropagation();
	                    e.preventDefault();
	                });
	                $(document).on("drop",".fileUploadBox",function(e){

	                    $(this).css('border', '2px dotted #0B85A1');
	                    e.preventDefault();
	                    var files = e.originalEvent.dataTransfer.files;

	                    handleFileUpload(files,objDragAndDrop);
	                });

	                $(document).on('dragenter', function (e){
	                    e.stopPropagation();
	                    e.preventDefault();
	                });
	                $(document).on('dragover', function (e){
	                  e.stopPropagation();
	                  e.preventDefault();
	                  objDragAndDrop.css('border', '2px dotted #0B85A1');
	                });
	                $(document).on('drop', function (e){
	                    e.stopPropagation();
	                    e.preventDefault();
	                });
	                //drag 영역 클릭시 파일 선택창
	                objDragAndDrop.on('click',function (e){
	                    $('input[type=file]').trigger('click');
	                });

	                $('input[type=file]').on('change', function(e) {

	                const fileListDiv = document.getElementById('fileListDiv');
                    const listItems = fileListDiv.getElementsByTagName('ul');
                    const itemCount = listItems.length; // ul 요소의 갯수


	                    var files = e.originalEvent.target.files;

	                    handleFileUpload(files,objDragAndDrop);
	                });

	                function handleFileUpload(files,obj)
	                {

	                   for (var i = 0; i < files.length; i++)
	                   {
	                        var fd = new FormData();
	                        fd.append('file', files[i]);

	                        var status = new createStatusbar($("#fileTitleUl"),files[i].name,files[i].size,fileNo); //Using this we can set progress.

	                   }fileNo++;
	                }

	                var rowCount=0;
	                function createStatusbar(obj,name,size,no){

						var sizeStr="";
						                        var sizeKB = size/1024;
						                        if(parseInt(sizeKB) > 1024){
						                            var sizeMB = sizeKB/1024;
						                            sizeStr = sizeMB.toFixed(2)+" MB";
						                        }else{
						                            sizeStr = sizeKB.toFixed(2)+" KB";
						                        }
                        var now = new Date();
                        var formattedDate = now.toLocaleString();
	                    var row='<ul class="contents" id="fileListUl">';
						row+='<li class="content01 content checkboxWrap">';
						row+='<input type="checkbox" id="landEdit_myPcFiles'+no+'" name="landEdit_myPcFiles" >';
						row+='<label for="landEdit_myPcFiles'+no+'"></label>';
						row+='</li>';
						row += '<li class="content registDateWidth">';
                        row += '<input type="text" value="' + formattedDate + '" readonly class="notWriteInput" name="registDateWidth"/>';
                        row += '</li>';
                        row += '<li class="content fileNameWidth">';
                        row += '<input type="text" value="' + name + '" id="filename" readonly class="notWriteInput" />';
                        row += '</li>';
                        row += '<li class="content viewBtnBox">';
                        row += '<button class="viewDetailButton lightBlueBtn">보기</button>';
                        row += '</li>';
                        row += '</ul>';
	                    obj.after(row);

						var radio=$(row).find('input');
						$(radio).find('input').attr("disabled",false);

	                }

                    	 });
*/
/*선택파일 삭제*/
$(document).on("click","#deleteSelectedBtn",function(){
	const clickedAttachFiles = document.querySelectorAll('input[name="landEdit_attachFile"]:checked');
	for(var i=0;i<clickedAttachFiles.length;i++){
		var delEle=$(clickedAttachFiles[i]).closest("#fileListUl");
		let newFileCheck = $(delEle).find('input[name="newFileCheckYn"]').val();
		if (newFileCheck == 'Y') {
			$(delEle).remove();
		} else {
			$(delEle).css('display', 'none');
			$(delEle).find('input[name="newFileCheckYn"]').val('D');	
		}
		

	}

})

/* 첨부파일 체크박스 전체 선택 */
const clickedAllinput = document.querySelector('input[name="landEdit_file_select_all"]');

$(document).on("click","#landEdit_file_select_all",function(){
	console.log();
	let checkFlag = $('#landEdit_file_select_all').prop('checked');
	$('input[name="landEdit_attachFile"]').prop('checked', checkFlag);
   const attachFiles = document.querySelectorAll('input[name="landEdit_myPcFiles"]');

            attachFiles.forEach((checkbox) => {
                checkbox.checked = clickedAllinput.checked;
            })

})

/*대표필지 선택*/
$(document).on('change', 'input[name="landEditMainParcelChk_Checkbox01"]', function(event) {
	
    const checkedbox = event.target;
    const daepyoCheck = checkedbox.parentNode.parentNode;

    const id = checkedbox.id.split('_').reverse()[0];
    const hakbo = daepyoCheck.querySelector('button.customSelectView').innerText;
    const jeochok = daepyoCheck.querySelector(`input[name="jeochok_${id}"]`).value;
    const address = daepyoCheck.querySelector(`input[name="address_${id}"]`).value;
    const jimok = daepyoCheck.querySelector(`input[name="jimok_${id}"]`).value;
    const yeonjang = daepyoCheck.querySelector(`input[name="yeonjang_${id}"]`).value;
    const myeonjuk = daepyoCheck.querySelector(`input[name="myeonjuk_${id}"]`).value;
    const souja = daepyoCheck.querySelector(`input[name="souja_${id}"]`).value;

    if (hakbo === '선택') {
        alert("권리확보를 필수로 선택하셔야합니다.");
        checkedbox.checked = false;
        return;
    } else {
        document.querySelector('input[name="daepyoHakbo"]').value = hakbo;
        document.querySelector('input[name="daepyoJeochok"]').value = jeochok;
        document.querySelector('input[name="daepyoAddress"]').value = address;
        document.querySelector('input[name="daepyoJimok"]').value = jimok;
        document.querySelector('input[name="daepyoYeonjang"]').value = yeonjang;
        document.querySelector('input[name="daepyoMyeonjuk"]').value = myeonjuk;
        document.querySelector('input[name="daepyoSouja"]').value = souja;
    }

 if ($(this).is(':checked')) {
        // 클릭된 체크박스 외 모든 체크박스를 해제
        $('input[name="landEditMainParcelChk_Checkbox01"]').not(this).prop('checked', false);
    }

     const checkboxes = document.querySelectorAll('input[name="landEditMainParcelChk_Checkbox01"]');
//     checkboxes.forEach((checkbox) => {
//            checkbox.addEventListener('change', function() {
//                // 현재 체크된 체크박스가 어떤 것인지 확인
//
//                if (this.checked) {
//                    // 모든 체크박스를 순회하며, 현재 체크된 체크박스 외에는 해제
//                  checkboxes.forEach((cb) => {
//                               if (cb !== this) {
//                                   cb.checked = false; // 기존 체크된 체크박스 해제
//                               }
//                           });
//                }
//            });
//     });

    // 체크 없으면 빈칸으로
    const isAnyChecked = Array.from(checkboxes).some(cb => cb.checked);
    if (!isAnyChecked) {
        document.querySelector('input[name="daepyoHakbo"]').value = '';
        document.querySelector('input[name="daepyoJeochok"]').value = '';
        document.querySelector('input[name="daepyoAddress"]').value = '';
        document.querySelector('input[name="daepyoJimok"]').value = '';
        document.querySelector('input[name="daepyoYeonjang"]').value = '';
        document.querySelector('input[name="daepyoMyeonjuk"]').value = '';
        document.querySelector('input[name="daepyoSouja"]').value = '';
    }


});

/* 주소 검색 */
$(document).on("click",".searchAddressBtn",function(){
                          const clickedButtonId = $(this).attr('id');
                          var address = $('#address_'+clickedButtonId).val().trim();
                          if (address==null || address=="" || address==undefined) {
                            alert("주소를 입력해주세요.");
                            return;
                           }

                              var formSerializeArray = {
                                  address: address
                              };
   $.ajax({
				   	   	  url: "/togi/getEditTogiJIjukSelect",
				   	   	  type: "POST",
				   	   	  data: formSerializeArray,
				   	   })
				   	   .done(function (fragment) {
				   	      $('#searchResultPopDiv').replaceWith(fragment);
						  const popupOpen = document.querySelector("#searchResultsPopup .popupWrap");
						  	   $(popupOpen).addClass("open");
						  	   popupOpen.classList.add("active");
                                $('.resultSelectBtn').attr('data-index', clickedButtonId);
                           	    $('.saveBtn').attr('data-index', clickedButtonId);

 	                       });
	});

$(document).on("click",".topCloseBtn",function(){

	var targetDiv=$("#searchResultPopDiv").parent().find("#searchResultPopup").find(".popupWrap");
	$(".popupWrap").removeClass("active");
});

$(document).on("click","#popupCloseBtn",function(){

	var targetDiv=$("#searchResultPopDiv").parent().find("#searchResultPopup").find(".popupWrap");
	$(".popupWrap").removeClass("active");
});

//주소 선택 버튼
$(document).on("click",".resultSelectBtn",function(){
var id =  $('.resultSelectBtn').data('index');

    var pnu=$(this).parent().parent().find(".popContent01").html();
	var juso=$(this).parent().parent().find(".popContent02").html();
	var jibun=$(this).parent().parent().find(".popContent03").html();
	var area=$(this).parent().parent().find(".popContent07").html();
    var jimok=$(this).parent().parent().find(".popContent06").html();

//$(".addressData input").val(juso + " " +jibun);
//$(".areaData_"+id).val(area);
//$(".jimokData_"+id).val(jimok);
$("input[name='address_" + id + "']").val(juso + " " +jibun);
$("input[name='myeonjuk_" + id + "']").val(area);
$("input[name='jimok_" + id + "']").val(jimok);

 $("input[name='myeonjuk_" + id + "']").attr("readonly");
$("input[name='myeonjuk_" + id + "']").addClass("notWriteInput");
$("input[name='jimok_" + id + "']").attr("readonly");
$("input[name='jimok_" + id + "']").addClass("notWriteInput");

$(".popupWrap").removeClass("active");

})


//체크 주소 선택 등록
$(document).on("click", "#selectBtn", function() {
    const checkboxes = document.querySelectorAll('input[id="chkResultPop_Checkbox01"]:checked'); // 체크된 체크박스만 선택
    var id =  $('#selectBtn').data('index');

    checkboxes.forEach((checkbox,checkno) => {
        var jusoInfo = checkbox.parentNode.parentNode;
         const address = jusoInfo.querySelector('li.popContent02').textContent + " " +jusoInfo.querySelector('li.popContent03').textContent;
         const jimok = jusoInfo.querySelector('li.popContent06').textContent
         const area = jusoInfo.querySelector('li.popContent07').textContent
		 let sido_nm = jusoInfo.querySelector('li.popContent0201').textContent;
		 let sgg_nm = jusoInfo.querySelector('li.popContent0202').textContent;
		 let emd_nm = jusoInfo.querySelector('li.popContent0203').textContent;
		 let ri_nm = jusoInfo.querySelector('li.popContent0204').textContent;
		 let jibun = jusoInfo.querySelector("li.popContent03").textContent;
        if (checkno === 0) {
        // 선택된 칸에 데이터 넣기
          $("input[name='address_" + id + "']").val(address);
          $("input[name='myeonjuk_" + id + "']").val(area);
          $("input[name='jimok_" + id + "']").val(jimok);
			
		  $("input#sido_nm_" + id).val(sido_nm);
          $("input#sgg_nm_" + id).val(sgg_nm);
          $("input#emd_nm_" + id).val(emd_nm);
          $("input#ri_nm_" + id).val(ri_nm);
          $("input#jibun_" + id).val(jibun);
          }else{
//                 const contentsBoxElement2 = document.querySelector('#togiInfoDiv .contentsBox');
//                const index2 = getUlCountInContentsBox(contentsBoxElement2);

                      // ul 만들기
                      const infoUl = document.createElement('ul');
                      infoUl.classList.add('contents');

                      for (let i = 1; i <= 13; i++) {
                          // li 만들기
                          const infoLi = document.createElement('li');
                          infoLi.classList.add('content');

                          if (i == 1 || i == 4) {
                              infoLi.classList.add('checkboxWrap');
                              infoLi.classList.add('smallWidth');

                              // input checkbox 세팅
                              const checkboxInput = document.createElement('input');
                              checkboxInput.type = 'checkbox';

                              if (i == 1) {
                               checkboxInput.id ='landEdit_Checkbox_' + index;
                               }else if (i == 4){
                               checkboxInput.id ='landEditMainParcelChk_Checkbox_' + index;
                               checkboxInput.name ='landEditMainParcelChk_Checkbox01';
                             }

                              infoLi.appendChild(checkboxInput);

                              // label 세팅
                              const checkboxLabel = document.createElement('label');

                              checkboxLabel.setAttribute('for', checkboxInput.id);

                              infoLi.appendChild(checkboxLabel);

                           }else if(i == 3){
                                  infoLi.classList.add('selectContentArea');
                                  const newContent = `
                                    <div class="hiddenSelectBox">
                                      <select id="landDevelopmentManageSelectBox01" hidden>
                                        <option value="" selected>선택</option>
                                        <option value="지상권">지상권</option>
                                        <option value="미설정">미설정</option>
                                        <option value="점용">점용</option>
                                        <option value="회사토지">회사토지</option>
                                      </select>
                                    </div>
                                    <section class="customSelectBox">
                                      <button class="customSelectView">선택</button>
                                      <ul class="customSelectBtns">
                                          <li><button class="moreSelectBtn" type="button">지상권</button></li>
                                        <li><button class="moreSelectBtn" type="button">미설정</button></li>
                                          <li><button class="moreSelectBtn" type="button">점용</button></li>
                                        <li><button class="moreSelectBtn" type="button">회사토지</button></li>
                                      </ul>
                                    </section>
                                  `;

                                  // infoLi에 새 내용을 추가합니다.
                                  infoLi.insertAdjacentHTML('beforeend', newContent);
                                  var selectElement = infoLi.querySelector('#landDevelopmentManageSelectBox01');
                                  selectElement.setAttribute('name', 'hakbo_' + index);
                             } else if (1<i && i<3 || 4<i && i<7 || 7<i && i<12) {
                              const infoInput = document.createElement('input');
                                 infoInput.type = 'text';

                                 if ( i == 2){
                                     infoLi.classList.add('smallWidth');
                                  infoInput.classList.add('contentsNum');
                                     infoInput.readOnly = true;
                                     infoInput.classList.add('notWriteInput');
                                 } else if (4 < i && i < 7 || i == 11 ) {
                                     infoLi.classList.add('middleWidth');
                                  if(i == 5){
                                    infoInput.name = 'jeochok_'+index;
                                  }else if(i == 6){
                                    infoInput.name = 'jisa_'+index;
                                  }else if(i == 11){
                                    infoInput.name = 'souja_'+index;
                                  }
                                 }else if(i == 8){
                                      infoInput.name = 'jimok_'+index;
                                     infoInput.readOnly = true;
                                  infoInput.classList.add('jimokData');
                                  infoInput.classList.add('notWriteInput');
                                  infoInput.value=jimok;
                                } else if(i == 9){
                                        infoInput.name = 'yeonjang_'+index;
                                  }else if(i == 10){
                                    infoInput.name = 'myeonjuk_'+index;
                                    infoInput.readOnly = true;
                                    infoInput.classList.add('areaData');
                                    infoInput.classList.add('notWriteInput');
                                     infoInput.value=area;
                                  }

                                 // li안에 넣기
                                 infoLi.append(infoInput);
                             }  else if (i == 7) {
                                 infoLi.classList.add('addressWidth');
                                 // div 만들기
                                 const addressDiv = document.createElement('div');
                                 addressDiv.classList.add('addressData');
                                 // input 만들기
                                 const addressInput = document.createElement('input');
                                 addressInput.id = 'address_'+index;
                                 addressInput.name = 'address_'+index;
                                 addressInput.type = 'text';
                                 addressInput.value=address;

                                 // div에 input 넣기

                                 addressDiv.appendChild(addressInput);
                                 infoLi.appendChild(addressDiv);

                                 // 검색버튼 만들기

                                 const addressBtn = document.createElement('button');
                                 addressBtn.classList.add('searchAddressBtn');
                                 // 추가
                                 addressBtn.classList.add('landRegSearchBtn');

                                 addressBtn.textContent = '검색';
                                  addressBtn.id= index;
                                 // li안에 넣기
                                 infoLi.appendChild(addressBtn);
                                 infoLi.classList.add('contentBox');


                              }else if (i == 12) {
                                 infoLi.classList.add('btnBox');
                                 infoLi.classList.add('middleWidth');

                                 const viewBtn = document.createElement('button');
                                 // 버튼 class 삭제
                                  viewBtn.classList.add('lightBlueBtn');
                                 viewBtn.classList.add('viewDetailButton');
                                 viewBtn.textContent = '위치보기';
                                 viewBtn.id = 'moveMap';

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
                          infoContentsBox02.appendChild(infoUl);

          }
                      // 순번
                      const contentsNum = infoUl.querySelector('.contentsNum');
                      contentsNum.placeholder = getInfoIndexForLandEdit(infoUl) + 1;
                       index++;

        }
    });
    $(".popupWrap").removeClass("active");
});

//pnu없이 선택/
$(document).on("click","#notPNUBtn",function(){

    var id =  $('.resultSelectBtn').data('index');

    $("input[name='address_" + id + "']").val("");
    $("input[name='myeonjuk_" + id + "']").val("");
    $("input[name='myeonjuk_" + id + "']").removeAttr("readonly");
    $("input[name='myeonjuk_" + id + "']").removeClass("notWriteInput");
    $("input[name='jimok_" + id + "']").val("");
    $("input[name='jimok_" + id + "']").removeAttr("readonly");
    $("input[name='jimok_" + id + "']").removeClass("notWriteInput");

	var targetDiv=$("#searchResultPopDiv").parent().find("#searchResultPopup").find(".popupWrap");
	$(".popupWrap").removeClass("active");

});

/*위치보기*/
$(document).on("click","#moveMap",function(){
	//openMapWindow();
//	mapWindow = window.open('', 'mapWindow', 'width=2000,height=1000');
	const x = $(this).attr('x')
	const y = $(this).attr('y')
	moveToCityHall(x,y);
})


// 저장버튼
$(document).on("click",".saveBtn",function(){
	if(confirm('토지개발 정보를 수정하시겠습니까?')) {
	
var formSerializeArray = $('#saveForm').serializeArray();

       len = formSerializeArray.length;
       var dataObj = {};
       for (i=0; i<len; i++) {
        dataObj[formSerializeArray[i].name] = formSerializeArray[i].value;
       }

        	var togiDatas=[];
	   	var togiUls=$("#togiInfoDiv .contents");
	   	for(var i=0;i<togiUls.length;i++){
			var sido_nm=$(togiUls[i]).find("input[name='sido_nm']").val();
	   		var sgg_nm=$(togiUls[i]).find("input[name='sgg_nm']").val();
			var emd_nm=$(togiUls[i]).find("input[name='emd_nm']").val();
			var ri_nm=$(togiUls[i]).find("input[name='ri_nm']").val();
			var jibun=$(togiUls[i]).find("input[name='jibun']").val();
			var jibun_full=$(togiUls[i]).find("input[name='jibun_full']").val();
			var addrcode=$(togiUls[i]).find("input[name='addrcode']").val();
			var pnu=$(togiUls[i]).find("input[name='pnu']").val();

//			var toji_type=$(togiUls[i]).find("input[name='hakbo_" + i + "']").val(); //권리확보
			var toji_type = $(togiUls[i]).find('button.customSelectView')[0].innerText;
			//var master_yn=$(togiUls[i]).find("input[name='daepyoPilji']").val(); //대표토지
			var master_yn="N";
			if ($(togiUls[i]).find("input:checkbox[name='landEditMainParcelChk_Checkbox01']").is(":checked")==true){
				master_yn="Y";
			};
			var pipe_yn=$(togiUls[i]).find("input[name='jeochok_"+ i +"']").val();
			var jisa=$(togiUls[i]).find("input[name='jisa_"+ i +"']").val();
			var address=$(togiUls[i]).find("input[name='address_"+ i +"']").val();
			var length=$(togiUls[i]).find("input[name='yeonjang_"+ i +"']").val();
			var jimok_text=$(togiUls[i]).find("input[name='jimok_"+ i +"']").val();

			var jijuk_area=$(togiUls[i]).find("input[name='myeonjuk_"+ i +"']").val();
			var souja=$(togiUls[i]).find("input[name='souja_"+ i +"']").val();


	   		var togiObj={
				"sido_nm":ljsIsNull(sido_nm)?'':sido_nm
				,"sgg_nm":ljsIsNull(sgg_nm)?'':sgg_nm
				,"emd_nm":ljsIsNull(emd_nm)?'':emd_nm
				,"ri_nm":ljsIsNull(ri_nm)?'':ri_nm
				,"jibun_full":ljsIsNull(jibun_full)?'':jibun_full
				,"jibun":ljsIsNull(jibun)?'':jibun
				,"addrcode":ljsIsNull(addrcode)?'':addrcode
				,"pnu":ljsIsNull(pnu)?'':pnu
				,"toji_type":ljsIsNull(toji_type)?'':toji_type
				,"master_yn":ljsIsNull(master_yn)?'':master_yn
				,"pipe_yn":ljsIsNull(pipe_yn)?'N':pipe_yn
				,"jisa":ljsIsNull(jisa)?'':jisa
				,"address":ljsIsNull(address)?'':address
				,"length":ljsIsNull(length)?'':length
				,"jimok_text":ljsIsNull(jimok_text)?'':jimok_text
				,"jijuk_area":ljsIsNull(jijuk_area)?'':jijuk_area
				,"souja":ljsIsNull(souja)?'':souja

	   		}
	   		togiDatas.push(togiObj);
	   	}
	   	dataObj.togiDatas=togiDatas;

	   	var deptDatas=[];
	   	var deptUls=$("#deptDiv .contents");
	   	for(var i=0;i<deptUls.length;i++){
			var dept_nm=$(deptUls[i]).find("input[name='dept_nm_" + i + "']").val();
	   		var manager=$(deptUls[i]).find("input[name='manager_" + i + "']").val();
			var contact_num=$(deptUls[i]).find("input[name='contact_num_" + i + "']").val();

	   		var deptObj={
				"dept_nm":ljsIsNull(dept_nm)?'':dept_nm
				,"manager":ljsIsNull(manager)?'':manager
				,"contact_num":ljsIsNull(contact_num)?'':contact_num

	   		}
	   		deptDatas.push(deptObj);
	   	}
	   	dataObj.deptDatas=deptDatas;
		dataObj.gubun="modify";
		
		const attachFileUls = document.querySelectorAll('input[name="landEdit_attachFile"]');
	
		// 첨부파일
		let files = new Array();
		let fileObj = {'seq':'', 'file_seq':'', 'fname':'', 'wdate':'', 'fpath':'', 'idx':''};
		for (var i = 0; i < attachFileUls.length; i++) {
			fileObj = {'seq':'', 'file_seq':'', 'fname':'', 'wdate':'', 'fpath':'', 'idx':''};
			let file_path = $(attachFileUls[i]).prev().prev().val() || '';
			let idx = $(attachFileUls[i]).prev().prev().prev().prev().prev().val() || '';
			let seq = $(attachFileUls[i]).prev().prev().prev().prev().val() || '';
			let file_seq = $(attachFileUls[i]).prev().prev().prev().val() || '';
			var fname = $(attachFileUls[i]).parent().parent().find("#filename").val() || '';
			var wdate = $(attachFileUls[i]).parent().parent().find("input[name='registDateWidth']").val() || '';
			let newFileCheckYn = $("input[name='newFileCheckYn']").eq(i).val();
			fileObj.wdate = wdate;
			fileObj.fname = fname;
			fileObj.fpath = file_path;
			fileObj.seq = seq;
			fileObj.idx = idx;
			fileObj.file_seq = file_seq;
			fileObj.newFileCheckYn = newFileCheckYn;
			files.push(fileObj);
		}
		
		dataObj.files = files;
//		dataObj.dosiNo=""; //수정일때는 들어간다
//       location.href = "/togi/insertDosiList?idx=" + dataObj.dosiNo;
     /* */ url="/togi/insertDosiList";
	   $.ajax({

	   				url:url,
	   				type:'POST',
	   				contentType:"application/json",
	   				data:JSON.stringify(dataObj),

	   				dataType:"json",
	   				beforeSend:function(request){
	   					loadingShow();
	   				},
	   				success:function(response){
	   					loadingHide();
	   					if (response.message == 'Y'){
							alert("수정 되었습니다.");
//                            location.href = "/togi/landDevInfo?idx=" + dataObj.dosiNo;
	   					}
	   					else {
	   						console.log("response.success N");
	   					}
	   				},
	   				error:function(jqXHR,textStatus,errorThrown){
	   					alert("finalBtn ajax error\n"+textStatus+":"+errorThrown);
						return false;
	   				}

	   		});
	   		}
});

function sendFileToServer(formData,status) {
        var uploadURL = "/togi/fileUpload/post"; //Upload URL
        var extraData = {}; //Extra Data.
        var jqXHR = $.ajax({
			xhr: function() {
			    var xhrobj = $.ajaxSettings.xhr(); // 기본 XMLHttpRequest 객체 생성
			    if (xhrobj.upload) {
			        xhrobj.upload.addEventListener('progress', function(event) {
			            var percent = 0;
			            var position = event.loaded || event.position;
			            var total = event.total;
			            if (event.lengthComputable) {
			                percent = Math.ceil(position / total * 100); // 파일 업로드의 진행 상황을 계산
			            }
			            // status.setProgress(percent);  // 업로드 진행 상황을 status에 반영 (현재 주석 처리됨)
			        }, false);
			    }
			    return xhrobj;
			},
            url: uploadURL,
            type: "POST",
            contentType:false,
            processData: false,
            cache: false,
            data: formData,
            success: function(data){
            }
        }); 
    }

function attachFileDownload(filePath, fileName, fileJisangNo, fileSeq, fileGubun) {
	commonFileDownload(filePath, fileName, fileJisangNo, fileSeq, fileGubun);
}

