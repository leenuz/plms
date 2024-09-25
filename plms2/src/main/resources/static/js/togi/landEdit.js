/* ul 태그 개수 찾기 */
const getUlCountInContentsBox = (contentsBoxElement) => {
    // contentsBoxElement 내부에서 'contents' 클래스를 가진 모든 ul 태그를 찾음
    const ulElements = contentsBoxElement.querySelectorAll('ul.contents');
    // ul 태그들의 개수를 반환
    return ulElements.length;
}

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


const landEditInfoAddBtnEvent02 = () => {

    infoContentsBox02.addEventListener('click', function (event) {

        // 버튼 클릭시 추가되게
        if (event.target.classList.contains('addBtn')) {
         const contentsBoxElement = document.querySelector('#togiInfoDiv .contentsBox');
         const index = getUlCountInContentsBox(contentsBoxElement);
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

// 파일 첨부시 모습 변경

const landEditFileEvent = () => {
    const landReg_myPcFiles = document.getElementById('landEdit_myPcFiles');
    const parcelAttachments = landReg_myPcFiles.closest('.parcelAttachments');
    const fileContWrap = parcelAttachments.querySelector('.contWrap');
    const fileTitles = fileContWrap.querySelector('#landEdit .parcelAttachments .depth1 .titles');
    const contentsBox = fileContWrap.querySelector('.contentsBox');
    var fileInfoName = '';

    landReg_myPcFiles.addEventListener('change', function () {

        // 기존의 ul 초기화

        const existContents = fileContWrap.querySelectorAll('.contents')

        existContents.forEach((list) => {
            list.remove();
        })


        fileTitles.classList.remove('active');
        contentsBox.classList.remove('contentScr');
        fileTitles.classList.remove('titleScr');

        // 시간 구하기

        const addDate = new Date();

        var year = addDate.getFullYear();
        var month = ('0' + (addDate.getMonth() + 1)).slice(-2);
        var day = ('0' + addDate.getDate()).slice(-2);
        var hours = ('0' + addDate.getHours()).slice(-2);
        var mins = ('0' + addDate.getMinutes()).slice(-2);
        var seconds = ('0' + addDate.getSeconds()).slice(-2);

        var dateFommat = year + '-' + month + '-' + day + '\u00A0' + hours + ':' + mins + ':' + seconds;

        console.log('입력 변경 시각:', dateFommat);

        if (landReg_myPcFiles.files.length > 0) {
            for (let i = 0; i <= landReg_myPcFiles.files.length - 1; i++) {

                const thisFileName = landReg_myPcFiles.files[i].name;

                fileInfoName = thisFileName;

                const checkboxLi = `<li class="content01 content"><input type="checkbox" id="landEditcustomCheckbox${i}"><label for="landEditcustomCheckbox${i}"></label>
                                    </li>`;

                const dateLi = `<li class="content02 content"><p>${dateFommat}</p></li>`;

                const filenameLi = `<li class="content03 content"><p>${fileInfoName}</p></li>`;

                const viewBtnLi = `<li class="content04 content">
                                        <button class="viewDetailButton">보기</button>
                                    </li>`;

                const listBox = checkboxLi + dateLi + filenameLi + viewBtnLi;

                const ContentsUl = document.createElement('ul');
                ContentsUl.classList.add('contents');

                ContentsUl.innerHTML = listBox;

                contentsBox.appendChild(ContentsUl);


                fileInfoName = '';

            }

            // 값 잘 담겼는지 확인
            console.log(landReg_myPcFiles.value)

            // titles border주기
            fileTitles.classList.add('active');

            if (landReg_myPcFiles.files.length >= 5) {
                contentsBox.classList.add('contentScr');
                fileTitles.classList.add('titleScr');
            }
        } else {
            // titles border 빼기
            fileTitles.classList.remove('active');
            contentsBox.classList.remove('contentScr');
            fileTitles.classList.remove('titleScr');
        }

    })

}
//landEditFileEvent()


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
      console.log('landEditExcelPopWrapper 작동');


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
           console.log(script);
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
    console.log(`Selected value: ${nearBySelectBox.val()}`);
});



/* 첨부파일 */
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

	                    var row='<ul class="contents" id="fileListUl">';
						row+='<li class="content01 content checkboxWrap">';
						row+='<input type="checkbox" id="landEdit_myPcFiles'+no+'" name="landEdit_myPcFiles" >';
						row+='<label for="landEdit_myPcFiles'+no+'"></label>';
						row+='</li>';
						row+='<li class="content02 content"><input type="text" id="filename" placeholder="'+name+'" class="notWriteInput" readonly></li></ul>';
	                    obj.after(row);

						var radio=$(row).find('input');
						$(radio).find('input').attr("disabled",false);

	                }

                    	 });

/*선택파일 삭제*/
$(document).on("click","#deleteSelectedBtn",function(){
	const clickedAttachFiles = document.querySelectorAll('input[name="landEdit_myPcFiles"]:checked');

	for(var i=0;i<clickedAttachFiles.length;i++){
		var delEle=$(clickedAttachFiles[i]).closest("#fileListUl");
		$(delEle).remove();

	}

})

/* 첨부파일 체크박스 전체 선택 */
$(document).on("click","#landEdit_file_select_all",function(){
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

    const checkboxes = document.querySelectorAll('input[name="landEditMainParcelChk_Checkbox01"]');

     checkboxes.forEach((checkbox) => {
            checkbox.addEventListener('change', function() {
                // 현재 체크된 체크박스가 어떤 것인지 확인
                if (this.checked) {
                    // 모든 체크박스를 순회하며, 현재 체크된 체크박스 외에는 해제
                  checkboxes.forEach((cb) => {
                               if (cb !== this) {
                                   cb.checked = false; // 기존 체크된 체크박스 해제
                               }
                           });
                }
            });
     });
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

        if (checkno === 0) {
        // 선택된 칸에 데이터 넣기
          $("input[name='address_" + id + "']").val(address);
          $("input[name='myeonjuk_" + id + "']").val(area);
          $("input[name='jimok_" + id + "']").val(jimok);

          }else{
                 const contentsBoxElement2 = document.querySelector('#togiInfoDiv .contentsBox');
                const index2 = getUlCountInContentsBox(contentsBoxElement2);

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
                               checkboxInput.id ='landEdit_Checkbox_' + index2;
                               }else if (i == 4){
                               checkboxInput.id ='landEditMainParcelChk_Checkbox_' + index2;
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
                                  selectElement.setAttribute('name', 'hakbo_' + index2);
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
                                    infoInput.name = 'jeochok_'+index2;
                                  }else if(i == 6){
                                    infoInput.name = 'jisa_'+index2;
                                  }else if(i == 11){
                                    infoInput.name = 'souja_'+index2;
                                  }
                                 }else if(i == 8){
                                      infoInput.name = 'jimok_'+index2;
                                     infoInput.readOnly = true;
                                  infoInput.classList.add('jimokData');
                                  infoInput.classList.add('notWriteInput');
                                  infoInput.value=jimok;
                                } else if(i == 9){
                                        infoInput.name = 'yeonjang_'+index2;
                                  }else if(i == 10){
                                    infoInput.name = 'myeonjuk_'+index2;
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
                                 addressInput.id = 'address_'+index2;
                                 addressInput.name = 'address_'+index2;
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
                                  addressBtn.id= index2;
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