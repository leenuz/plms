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

        // 타임리프에서 전달된 jm_account_yn 값을 data-selected 속성에서 가져오기
        const selectedValue = customSelectBox.getAttribute('data-selected');

        for (let i = 0; i < notsetAddSelectBox.length; i++) {
            const optionValue = notsetAddSelectBox.options[i].value;
            const li = document.createElement('li');
            const button = document.createElement('button');
            button.classList.add('moreSelectBtn');
            button.type = 'button';
            button.textContent = optionValue;

            // jm_account_yn 값과 일치하는 버튼을 눌러진 상태로 표시
            if (optionValue === selectedValue) {
                button.classList.add('selected'); // 선택된 상태를 표현하기 위해 클래스를 추가
                let currentSelectValue = document.getElementById("landTerminateSelectBox01"); //현재 셀렉박스 가져오기
                 const customSelectViewBtn = customSelectBox.querySelector('.customSelectView');

                customSelectViewBtn.innerText = selectedValue;
                $(currentSelectValue).val(selectedValue);//셀렉박스 값에 현재 클릭된 값의 텍스트 담기
                $(currentSelectValue).trigger("change");
            }
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

const ownerInfoAddBtn = document.querySelectorAll('#landRightsRegistration .ownerInfo .addBtn')
const editBefore = document.querySelectorAll('#landRightsRegistration .ownerInfo .contents .content.btnBox .editBefore');
const editAfter = document.querySelectorAll('#landRightsRegistration .ownerInfo .contents .content.btnBox .editAfter');
const editContent = document.querySelectorAll('#landRightsRegistration .editSpace');
const registBtn = document.querySelectorAll('#landRightsRegistration .registBtn');

ownerInfoAddBtn.forEach((btn) => {
    btn.addEventListener('click', function () {
        var thisEditContent = btn.closest('.contents');
        console.log(thisEditContent);

        thisEditContent.classList.add('editing');

        const inputs = thisEditContent.querySelectorAll('input');

        if (thisEditContent.classList.contains('editing')) {
            inputs.forEach(input => {
                input.removeAttribute('readonly');
            });
        } else {
            inputs.forEach(input => {
                input.setAttribute('readonly', 'readonly');
            });
        }



    });
});

// 추가 버튼 click 이벤트

if (registBtn) {
    registBtn.forEach((regiBtn) => {
        regiBtn.addEventListener('click', function () {

            var thisEditContent01 = regiBtn.closest('.contents');
            thisEditContent01.classList.remove('editing')

            const inputs = thisEditContent01.querySelectorAll('input');
            inputs.forEach(input => {
                input.setAttribute('readonly', 'readonly');
            });
        })
    })
}

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



// 첨부파일 전체 선택 체크박스
const allCheckEventTermination = () => {

    // 첨부파일 리스트들
    const attachFiles = document.querySelectorAll('input[name="landTerminationRegistration_attachFile"]');
    // checked가 된 첨부파일 리스트
    const clickedAttachFiles = document.querySelectorAll('input[name="landTerminationRegistration_attachFile"]:checked');
    // 전체선택 input
    const clickedAllinput = document.querySelector('input[name="landTerminationRegistration_file_select_all"]');

    // 전체선택되게 하기
    clickedAllinput.addEventListener('click', function () {
        clickedSelectAllTermination(clickedAllinput);
    })
    // 개당 선택시 전체 선택되게하기
    attachFiles.forEach((checkList) => {
        checkList.addEventListener('click', function () {

            clickCheckBoxEventTermination(checkList);
        })
    })

    // 개별 리스트 클릭시 전체로 변하기
    function clickCheckBoxEventTermination() {
        // 최신으로 업데이트 해주기
        const clickedAttachFiles = document.querySelectorAll('input[name="landTerminationRegistration_attachFile"]:checked');

        if (attachFiles.length === clickedAttachFiles.length) {
            clickedAllinput.checked = true;
        } else {
            clickedAllinput.checked = false;
        }
    }

    // 전체선택 클릭시 
    function clickedSelectAllTermination(clickedAllinput) {
        const attachFiles = document.querySelectorAll('input[name="landTerminationRegistration_attachFile"]');

        attachFiles.forEach((checkbox) => {
            checkbox.checked = clickedAllinput.checked;
        })
    }
}

allCheckEventTermination();

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
	                    var files = e.originalEvent.target.files;
	                    handleFileUpload(files,objDragAndDrop);
	                });

	                function handleFileUpload(files,obj)
	                {
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

						var sizeStr="";
						                        var sizeKB = size/1024;
						                        if(parseInt(sizeKB) > 1024){
						                            var sizeMB = sizeKB/1024;
						                            sizeStr = sizeMB.toFixed(2)+" MB";
						                        }else{
						                            sizeStr = sizeKB.toFixed(2)+" KB";
						                        }

	                    var row='<ul class="contents" id="fileListUl">';
						row+='<li class="selectWidth content checkboxWrap">';
						row+='<input type="checkbox" id="landRightsRegistration_attachFile'+no+'" name="landRightsRegistration_attachFile" >';
						row+='<label for="landRightsRegistration_attachFile'+no+'"></label>';
						row+='</li>';
						row+='<li class="content registDateWidth"><input type="text" id="filename" th:placeholder="'+'[[${val.pa_file_path}]]'+'" class="notWriteInput" readonly></li>';
						row+='<li class="content fileNameWidth"><input type="text" id="filename" placeholder="'+name+'" class="notWriteInput" readonly></li>';
						row+='<li class="content"><button class="viewDetailButton" th:onclick="openFilePopup([[${val.pa_file_path}]])">보기</button></li></ul>';
	                    obj.after(row);

						var radio=$(row).find('input');
						console.log("---------------radio checkbox----------");
						$(radio).find('input').attr("disabled",false);
	                 	console.log($(radio).parent().html());
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
	                            //$("#status1").append("File upload Done<br>");
								uploadFiles.push(data.resultData.fpath);
								//allCheckEventLandRightsRegist();
	                        }
	                    });

	                    //status.setAbort(jqXHR);
	                }

	 });