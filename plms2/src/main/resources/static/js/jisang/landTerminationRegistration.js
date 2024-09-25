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

//파일 업로드 핸들러
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
        $('#landTerminationRegistration_myPcFiles').trigger('click');
    });

    $('input[name=fileupload]').on('change', function(e) {
        var files = e.originalEvent.target.files;
        handleFileUpload(files,objDragAndDrop);
    });
	
	$('input[name=landTerminationRegistration_myPcFiles01]').on('change', function(e) {
	        var files = e.originalEvent.target.files;
	        handleFileUpload1(files,this,"01");
	});
	$('input[name=landTerminationRegistration_myPcFiles02]').on('change', function(e) {
	       var files = e.originalEvent.target.files;
	       handleFileUpload1(files,this,"02");
	});
	$('input[name=landTerminationRegistration_myPcFiles03]').on('change', function(e) {
		       var files = e.originalEvent.target.files;
		       handleFileUpload1(files,this,"03");
			   
	});
	$('input[name=landTerminationRegistration_myPcFiles04]').on('change', function(e) {
		       var files = e.originalEvent.target.files;
		       handleFileUpload1(files,this,"04");
	});
	$('input[name=landTerminationRegistration_myPcFiles05]').on('change', function(e) {
		       var files = e.originalEvent.target.files;
		       handleFileUpload1(files,this,"05");
	});
	$('input[name=landTerminationRegistration_myPcFiles06]').on('change', function(e) {
		       var files = e.originalEvent.target.files;
		       handleFileUpload1(files,this,"06");
	});
	$('input[name=landTerminationRegistration_myPcFiles07]').on('change', function(e) {
		       var files = e.originalEvent.target.files;
		       handleFileUpload1(files,this,"07");
	});
	$('input[name=landTerminationRegistration_myPcFiles08]').on('change', function(e) {
		       var files = e.originalEvent.target.files;
		       handleFileUpload1(files,this,"08");
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
	
	
	
	function handleFileUpload1(files,obj,idx)
	    {
	       for (var i = 0; i < files.length; i++)
	       {
	            var fd = new FormData();
	            fd.append('file', files[i]);

	          //  var status = new createStatusbar($("#fileTitleUl"),files[i].name,files[i].size,i); //Using this we can set progress.
	          //  status.setFileNameSize(files[i].name,files[i].size);
			    console.log($(obj).parent().parent().parent().html());
				var changeObj=$(obj).parent().parent().find("#req_doc_file"+idx).val(files[i].name);
				console.log("--------changeObj---------------");
				console.log(changeObj);
	            sendFileToServer1(fd,status,idx);

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
	
	
	function sendFileToServer1(formData,status,no)
	    {
			var idx=$("#hiddenJisangNo").val();
			console.log($("#hiddenJisangNo").val());
	        var uploadURL = "/jisang/fileUpload/reqDoc?idx="+idx; //Upload URL
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

//저장 버튼 클릭 시 동작 이벤트
$(document).on("click","#save_btn",function(){
    console.log($("#menuHiddenSelectBox01_1").val());
    console.log($("#searchForm").serialize());

    const jmJisangNo = $(this).attr('idx');
    const jmIdx = $(this).attr('index');

    // 'landTerminationRegistrationCompensation'이라는 name을 가진 라디오 버튼 중에서
    // 체크된 요소를 선택
    const selectedRadio = document.querySelector('input[name="landTerminationRegistrationCompensation"]:checked');
    // 선택된 라디오 버튼이 있으면 그 값을 반환하고, 없으면 null 반환
    selectedRadio ? selectedRadio.value : null;

    //첨부 서류'

    const address = $('#address').attr('placeholder');
    const address_list = address.split(' ');

    const formData = {
        jisa: $('#jisa').attr('placeholder') || '',  // 담당지사
        yongdo: $('#yongdo').attr('placeholder') || '',  // 용도
        pipe_name: $('#pipe_name').attr('placeholder') || '',  // 관로명(구간)
        sun_gubun: $('#sun_gubun').attr('placeholder') || '',  // 단/복선
        sido_nm: address_list[0] || '',  // 주소1
        sgg_nm: address_list[1] || '',  // 주소2
        ri_nm: address_list[2] || '',  // 주소3
        jibun: address_list[3] || '',  // 주소4

        jijuk_area: $('#jijuk_area').attr('placeholder') || '',  // 지적면적(m²)
        gover_own_yn: $('#gover_own_yn').attr('placeholder') || '',  // 국공유지여부

        jasan_no: $('#jasan_no').attr('placeholder') || '',  // 자산분류번호
        chuideuk_date: $('#chuideuk_date').attr('placeholder') || '',  // 취득일자
        pyeonib_area: $('#pyeonib_area').attr('placeholder') || '',  // 편입면적(m²)
        use_state: $('#use_state').attr('placeholder') || '',  // 사용현황
        deunggi_date: $('#deunggi_date').attr('placeholder') || '',  // 등기일
        deunggi_no: $('#deunggi_no').attr('placeholder') || '',  // 등기번호
        deunggiso: $('#deunggiso').attr('placeholder') || '',  // 등기소
        dosiplan: $('#dosiplan').attr('placeholder') || '',  // 도시계획 결정여부

        account_yn: $('.customSelectView').text() || '',  // 회계처리 필요여부
        cancel_date: $('#cancel_date').val() || '',  // 해지일자
        chuideuk_money: $('#chuideuk_money').val() || '',  // 취득금액
        gammoney: $('#gammoney').val() || '',  // 감가삼각충당금
        remainder_money: $('#remainder_money').val() || '',  // 잔존가액
        cancel_bosang_yn: selectedRadio ? selectedRadio.value : '',  // 해지보상유무
        cancel_bosang_money: $('#cancel_bosang_money').val() || '',  // 보상금액
        cancel_reason: $('#cancel_reason').val() || '',  // 해지사유
        cancel_comment: $('#cancel_comment').val() || '',  // 검토의견
        jisang_no: jmJisangNo || '',  // 지상번호
        jIdx: jmIdx || '',  // 지상 인덱스
		req_doc_file01:$("#req_doc_file01").val() || '',
		req_doc_file02:$("#req_doc_file02").val() || '',
		req_doc_file03:$("#req_doc_file03").val() || '',
		req_doc_file04:$("#req_doc_file04").val() || '',
		req_doc_file05:$("#req_doc_file05").val() || '',
		req_doc_file06:$("#req_doc_file06").val() || '',
		req_doc_file07:$("#req_doc_file07").val() || '',
		req_doc_file08:$("#req_doc_file08").val() || ''
		
    };
	//해지의 필수 첨부파일은 jisang_req_doc1디비에 담는다
    // 필수 값 체크
    let errors = [];

    if (!formData.account_yn) {
        errors.push('회계처리 필요 여부는 필수입니다.');
    }
    if (!formData.cancel_date) {
        errors.push('해지일자는 필수입니다.');
    }
    if (!formData.cancel_bosang_yn) {
        errors.push('해지보상유무는 필수입니다.');
    }
    if (!formData.cancel_bosang_money) {
        errors.push('보상금액은 필수입니다.');
    }
    if (!formData.cancel_reason) {
        errors.push('해지사유는 필수입니다.');
    } else if (formData.cancel_reason.length < 10) {
        errors.push('해지사유는 최소 10자 이상이어야 합니다.');
    }
    if (!formData.cancel_comment) {
        errors.push('검토의견은 필수입니다.');
    } else if (formData.cancel_comment.length < 10) {
        errors.push('검토의견은 최소 10자 이상이어야 합니다.');
    }

    // 에러가 있을 경우 처리 (예: 에러 메시지 출력)
    if (errors.length > 0) {
        alert(errors.join('\n')); // 에러 메시지들을 알림창으로 표시
        return null; // 필수 값이 누락된 경우 null 반환
    }

    console.log("----------저장 Object------------");
    console.log(formData);

    landTerminationSave(formData)
    console.log("-----------------------");
    })

//상신 버튼 클릭 시 동작 이벤트
$(document).on("click","#submit_btn",function(){
//    const jmJisangNo = $(this).attr('idx');
//    const jmIdx = $(this).attr('index');

    $('#commit').css('display', 'block')
     console.log($("#menuHiddenSelectBox01_1").val());
    console.log($("#searchForm").serialize());

    const jmJisangNo = $(this).attr('idx');
    const jmIdx = $(this).attr('index');

    // 'landTerminationRegistrationCompensation'이라는 name을 가진 라디오 버튼 중에서
    // 체크된 요소를 선택
    const selectedRadio = document.querySelector('input[name="landTerminationRegistrationCompensation"]:checked');
    // 선택된 라디오 버튼이 있으면 그 값을 반환하고, 없으면 null 반환
    selectedRadio ? selectedRadio.value : null;

    //첨부 서류'

    const address = $('#address').attr('placeholder');
    const address_list = address.split(' ');

    const formData = {
        jisa: $('#jisa').attr('placeholder') || '',  // 담당지사
        yongdo: $('#yongdo').attr('placeholder') || '',  // 용도
        pipe_name: $('#pipe_name').attr('placeholder') || '',  // 관로명(구간)
        sun_gubun: $('#sun_gubun').attr('placeholder') || '',  // 단/복선
        sido_nm: address_list[0] || '',  // 주소1
        sgg_nm: address_list[1] || '',  // 주소2
        ri_nm: address_list[2] || '',  // 주소3
        jibun: address_list[3] || '',  // 주소4

        jijuk_area: $('#jijuk_area').attr('placeholder') || '',  // 지적면적(m²)
        gover_own_yn: $('#gover_own_yn').attr('placeholder') || '',  // 국공유지여부

        jasan_no: $('#jasan_no').attr('placeholder') || '',  // 자산분류번호
        chuideuk_date: $('#chuideuk_date').attr('placeholder') || '',  // 취득일자
        pyeonib_area: $('#pyeonib_area').attr('placeholder') || '',  // 편입면적(m²)
        use_state: $('#use_state').attr('placeholder') || '',  // 사용현황
        deunggi_date: $('#deunggi_date').attr('placeholder') || '',  // 등기일
        deunggi_no: $('#deunggi_no').attr('placeholder') || '',  // 등기번호
        deunggiso: $('#deunggiso').attr('placeholder') || '',  // 등기소
        dosiplan: $('#dosiplan').attr('placeholder') || '',  // 도시계획 결정여부

        account_yn: $('.customSelectView').text() || '',  // 회계처리 필요여부
        cancel_date: $('#cancel_date').val() || '',  // 해지일자
        chuideuk_money: $('#chuideuk_money').val() || '',  // 취득금액
        gammoney: $('#gammoney').val() || '',  // 감가삼각충당금
        remainder_money: $('#remainder_money').val() || '',  // 잔존가액
        cancel_bosang_yn: selectedRadio ? selectedRadio.value : '',  // 해지보상유무
        cancel_bosang_money: $('#cancel_bosang_money').val() || '',  // 보상금액
        cancel_reason: $('#cancel_reason').val() || '',  // 해지사유
        cancel_comment: $('#cancel_comment').val() || '',  // 검토의견
        jisang_no: jmJisangNo || '',  // 지상번호
        jIdx: jmIdx || '',  // 지상 인덱스
		req_doc_file01:$("#req_doc_file01").val() || '',
		req_doc_file02:$("#req_doc_file02").val() || '',
		req_doc_file03:$("#req_doc_file03").val() || '',
		req_doc_file04:$("#req_doc_file04").val() || '',
		req_doc_file05:$("#req_doc_file05").val() || '',
		req_doc_file06:$("#req_doc_file06").val() || '',
		req_doc_file07:$("#req_doc_file07").val() || '',
		req_doc_file08:$("#req_doc_file08").val() || ''
		
    };
	//해지의 필수 첨부파일은 jisang_req_doc1디비에 담는다
    // 필수 값 체크
   /* let errors = [];

    if (!formData.account_yn) {
        errors.push('회계처리 필요 여부는 필수입니다.');
    }
    if (!formData.cancel_date) {
        errors.push('해지일자는 필수입니다.');
    }
    if (!formData.cancel_bosang_yn) {
        errors.push('해지보상유무는 필수입니다.');
    }
    if (!formData.cancel_bosang_money) {
        errors.push('보상금액은 필수입니다.');
    }
    if (!formData.cancel_reason) {
        errors.push('해지사유는 필수입니다.');
    } else if (formData.cancel_reason.length < 10) {
        errors.push('해지사유는 최소 10자 이상이어야 합니다.');
    }
    if (!formData.cancel_comment) {
        errors.push('검토의견은 필수입니다.');
    } else if (formData.cancel_comment.length < 10) {
        errors.push('검토의견은 최소 10자 이상이어야 합니다.');
    }

    // 에러가 있을 경우 처리 (예: 에러 메시지 출력)
    if (errors.length > 0) {
        alert(errors.join('\n')); // 에러 메시지들을 알림창으로 표시
        return null; // 필수 값이 누락된 경우 null 반환
    }*/

    console.log("----------저장 Object------------");
    console.log(formData);

   // landTerminationSangsinSave(formData)
    console.log("-----------------------");
    })

//상신 수락 버튼 클릭 시 동작 이벤트
$(document).on("click","#commit",function(){
    loadingShow();
    const jmJisangNo = $(this).attr('idx');
    const jmIdx = $(this).attr('index');

    const formData = {
            jisang_no: jmJisangNo || '',  // 지상번호
            jIdx: jmIdx || ''  // 지상 인덱스
        };

    $.ajax({
          url: "/jisang/commitJisangTmp",
          type: "POST",
          data: formData,
     })
     .done(function (fragment) {
        loadingHide();
        $('#commit').css('display', 'none');
        alert("상신 처리 완료.");
     });
    })

//지상권 해지보상유무 라디오 버튼 클릭 시 이벤트 (유)
$(document).on("click","#radioYes",function(){
    $('#cancel_bosang_money').val('')
    })

//지상권 해지보상유무 라디오 버튼 클릭 시 이벤트 (무)
$(document).on("click","#radioNo",function(){
    $('#cancel_bosang_money').val('0')
    })

function landTerminationSave(params){
    loadingShow();
    $.ajax({
          url: "/jisang/landTerminationSave",
          type: "POST",
          data: params,
     })
     .done(function (fragment) {
        loadingHide();
        alert("저장이 완료 되었습니다.");
     });
}


function landTerminationSangsinSave(params){
    loadingShow();
    $.ajax({
          url: "/jisang/insertJisangTerminationAdd",
          type: "POST",
          data: params,
     })
     .done(function (fragment) {
        loadingHide();
        alert("저장이 완료 되었습니다.");
     });
}




$(document).on("click","#docFileDelBtn",function(){
	console.log("---------------docFileDelBtn---------------");
	var $currentElement = $(this);
	console.log($(this).parent().parent().html());
	var inputFseq=$(this).parent().parent().find("#fseq").val();
	var inputValue=$(this).parent().parent().find(".notWriteInput").val();
	console.log(inputValue);
	if (inputValue!=null || inputValue!=""){
		var params={"dfile_name":inputValue,"jisang_no":$("#hiddenJisangNo").val(),"fseq":inputFseq}
		
		console.log(params);
		
		
		//임시파일 삭제
		$.ajax({
		          url: "/jisang/deleteJisangTmpFile",
		          type: "POST",
		          data: params,
				  
		})
		.done(function (fragment) {
		       /*loadingHide();
		       alert("저장이 완료 되었습니다.");*/
			   //$(this).parent().parent().find(".notWriteInput").val("");
			   $currentElement.parent().parent().find(".notWriteInput").val("");   
			   $currentElement.parent().parent().find(".notWriteInput").attr('placeholder','');
		    });
					
	}
	//console.log($(this).parent().parent().find(".notWriteInput").val(""));
	
})