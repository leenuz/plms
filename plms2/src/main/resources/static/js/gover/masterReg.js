var uploadFiles=new Array();
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
	
	// 파일 첨부 관련
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
        var files = e.originalEvent.target.files;
        handleFileUpload(files,objDragAndDrop);
    });
    
    function handleFileUpload(files,obj)
    {
		console.log("-------------handleFileUpload---------------");
		console.log(files);
       for (var i = 0; i < files.length; i++) 
       {
            var fd = new FormData();
            fd.append('file', files[i]);
     		
            var status = new createStatusbar($("#fileTitleUl"),files[i].name,files[i].size,i); //Using this we can set progress.
          //  status.setFileNameSize(files[i].name,files[i].size);
            sendFileToServer(fd,status);
     
       }
    }
	                
    var rowCount=0;
    function createStatusbar(obj,name,size,no){
		console.log("----------start createStatusBar------------");
            console.log(obj.html());
		/*var uobj=obj.parent().parent().find("#status");	
        rowCount++;
        var row="";
        //if(rowCount %2 ==0) row ="even";
        this.statusbar = $('<ul class="contents" id="fileListUl">');
        this.filename = $('<div class='filename'></div>').appendTo(this.statusbar);
        this.size = $("<div class='filesize'></div>").appendTo(this.statusbar);
       // this.progressBar = $("<div class='progressBar'><div></div></div>").appendTo(this.statusbar);
        this.abort = $("<div class='abort'>중지</div>").appendTo(this.statusbar);*/
		
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
		row+='<input type="checkbox" id="landRightsRegistration_attachFile'+no+'" name="landRightsRegistration_attachFile" >';
		row+='<label for="landRightsRegistration_attachFile'+no+'"></label>';
		row+='</li>';
		row+='<li class="content02 content"><input type="text" id="filename" placeholder="'+name+'" class="notWriteInput" readonly></li></ul>';
        obj.after(row);
		
		var radio=$(row).find('input');
		console.log("---------------radio checkbox----------");
		$(radio).find('input').attr("disabled",false);
     	console.log($(radio).parent().html());
		
       /* this.setFileNameSize = function(name,size){
            var sizeStr="";
            var sizeKB = size/1024;
            if(parseInt(sizeKB) > 1024){
                var sizeMB = sizeKB/1024;
                sizeStr = sizeMB.toFixed(2)+" MB";
            }else{
                sizeStr = sizeKB.toFixed(2)+" KB";
            }
     
            $(#)
            this.size.html(sizeStr);
        }*/
        
        /*this.setProgress = function(progress){       
            var progressBarWidth =progress*this.progressBar.width()/ 100;  
            this.progressBar.find('div').animate({ width: progressBarWidth }, 10).html(progress + "% ");
            if(parseInt(progress) >= 100)
            {
                this.abort.hide();
            }
        }
        
        this.setAbort = function(jqxhr){
            var sb = this.statusbar;
            this.abort.click(function()
            {
                jqxhr.abort();
                sb.hide();
            });
        }*/
    }
	                
    function sendFileToServer(formData,status)
    {
        var uploadURL = "/jisang/fileUpload/post"; //Upload URL
        var extraData ={}; //Extra Data.
        var jqXHR=$.ajax({
                xhr: function() {
                var xhrobj = $.ajaxSettings.xhr();
                if (xhrobj.upload) {
                        xhrobj.upload.addEventListener('progress', function(event) {
                            var percent = 0;
                            var position = event.loaded || event.position;
                            var total = event.total;
                            if (event.lengthComputable) {
                                percent = Math.ceil(position / total * 100);
                            }
                            //Set progress
                          //  status.setProgress(percent);
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
               // status.setProgress(100);
     			console.log(data);
     			console.log(data.resultData);
				//console.log("-------------sendFileToServer-----------------------");
				//console.log($(this).parent().parent().parent().parent());
                //$("#status1").append("File upload Done<br>");    
				//uploadFiles.push(data.resultData.fpath);    
				//allCheckEventLandRightsRegist();   
            }
        }); 
     
        //status.setAbort(jqXHR);
    }
});

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
	console.log(addUl);

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

// ID와 Name 업데이트 함수
function updateIdsAndNames(row, index) {
    row.querySelectorAll("input, select, label").forEach((element) => {
        const originalId = element.getAttribute("id");
        const originalName = element.getAttribute("name");

        if (originalId) {
            element.setAttribute("id", originalId + "_" + index);
        }
        if (originalName) {
            element.setAttribute("name", originalName + "_" + index);
        }

        const forAttribute = element.getAttribute("for");
        if (forAttribute) {
            element.setAttribute("for", forAttribute + "_" + index);
        }
    });
}


// 관경 표시 설정 함수
function toggleLineDisplay(value) {
  const singleLineDiv = $('.singleLine');
  const doubleLineDiv = $('.doubleLine');

  console.log('toggleLineDisplay 함수 호출, value:', value); // 디버깅용 콘솔 로그 추가

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
    
	var object = {};
	for (var i = 0; i < formSerializeArray.length; i++){
		if (formSerializeArray[i]['value'] === '전체') {
		    continue; // "전체"가 선택된 경우, 해당 파라미터를 넘기지 않음
		}
		object[formSerializeArray[i]['name']] = formSerializeArray[i]['value'];
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
//masterRegFileEvent();

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
//masterRegOpenPopUp();


/* 엑셀팝업불러오기 */

const ExcelPopOpenEvet = () => {

     const ExcelPopBtn = document.querySelector(".ExcelPopBtn");
     const masterRegExcelPopWrapper = document.querySelector(".masterRegExcelPopWrapper");
     let htmlFilePath = '/components/popuphtml/exceluploadPopup.html'; // 엑셀업로드

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