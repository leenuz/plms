
// 토지개발 등록 시행자 관할 부서 click 이벤트

const landRegInfoAddBtnEvent01 = () => {
    const infoContentsDetailBox = document.querySelector('#landReg .adminDept .contWrap');
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

            for (let i = 1; i <= 4; i++) {
                // li 만들기
                const infoLi = document.createElement('li');
                infoLi.classList.add('content');
                const infoInput = document.createElement('input');
                if(i < 4){
                    infoInput.type = 'text';

                     if(i == 1){
                        infoInput.name = 'dept_nm';
                     }else if(i == 2){
                        infoInput.name = 'manager';
                     }else if(i == 3){
                        infoInput.name = 'contact_num';
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
landRegInfoAddBtnEvent01();

// ul의 순번을 구하는 함수

const getInfoIndexForLandReg = (event) => {
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

const landRegInfoAddBtnEvent02 = () => {
    const infoContentsDetailBox02 = document.querySelector('#landReg .landInfo .contWrap');
    const infoContentsBox02 = infoContentsDetailBox02.querySelector('.contentsBox');
    const infoAddBtn02 = infoContentsDetailBox02.querySelectorAll('.addBtn');
    const infoContents02 = infoContentsDetailBox02.querySelectorAll('.contents');
    const infoTitles02 = infoContentsDetailBox02.querySelector('.titles');

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

                               infoLi.appendChild(checkboxInput);
 if (i == 1) {
                                   checkboxInput.id = `landReg_checkbox_${Date.now()}_${i}`;
                               } else if (i == 4){
                                   checkboxInput.id = `landReg_MainParcelChk_${Date.now()}_${i}`;

                               }
                               // label 세팅
                               const checkboxLabel = document.createElement('label');
                               checkboxLabel.setAttribute('for', checkboxInput.id);

                               infoLi.appendChild(checkboxLabel);



                           } else if (1<i && i<4 || 4<i && i<7 || 7<i && i<12) {
           					const infoInput = document.createElement('input');
                               infoInput.type = 'text';

                               if ( i == 2){
                                   infoLi.classList.add('smallWidth');
           						infoInput.classList.add('contentsNum');
                                   infoInput.readOnly = true;
                                   infoInput.classList.add('notWriteInput');
                               } else if (4 < i && i < 7 || i == 11 ) {
                                   infoLi.classList.add('middleWidth');

           						if(i==3){
           						  infoInput.name = 'hakbo';
           						}else if(i == 5){
           						  infoInput.name = 'jeochok';
           						}else if(i == 6){
           						  infoInput.name = 'jisa';
           						}else if(i == 8){
           						  infoInput.name = 'jimok';
           						}else if(i == 9){
           						  infoInput.name = 'yeonjang';
           						}else if(i == 10){
           						  infoInput.name = 'myeonjuk';
           						}else if(i == 11){
           						  infoInput.name = 'souja';
           						}
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
                               addressInput.classList.add('notWriteInput');
                               addressInput.id = 'address';
                               addressInput.readOnly = true;
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

                               // li안에 넣기
                               infoLi.appendChild(addressBtn);
                               infoLi.classList.add('contentBox');

                           } else if (i == 12) {
                               infoLi.classList.add('btnBox');
                               infoLi.classList.add('middleWidth');

                               const viewBtn = document.createElement('button');
                               // 버튼 class 삭제
                               // viewBtn.classList.add('lightBlueBtn');
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
            contentsNum.placeholder = getInfoIndexForLandReg(infoUl) + 1;

        }
        // 삭제 버튼 누를 때
        if (event.target.classList.contains('delBtn')) {
            var thisDelContent = event.target.closest('.contents');
            thisDelContent.remove();

            const nowContents = infoContentsBox02.querySelectorAll('.contents');
            nowContents.forEach((ul) => {
                const newUlNum = ul.querySelector('.contentsNum');
                newUlNum.placeholder = getInfoIndexForLandReg(ul) + 1;

            })
        }

    })

}
landRegInfoAddBtnEvent02();



/*위치보기*/
$(document).on("click","#moveMap",function(){
	//openMapWindow();
//	mapWindow = window.open('', 'mapWindow', 'width=2000,height=1000');
	const x = $(this).attr('x')
	const y = $(this).attr('y')
	moveToCityHall(x,y);
})

function moveToCityHall(x,y) {
		console.log("--------moveToCityHall-------------");
		//console.log(sessionStorage.getItem("2pmsMap"));
		//var mapW=window.mapWindow;
		//console.log(window.name);
		//var mapW=window.name;
	if (mapWindow) {
	    var cityHallCoords = {};

        if(x != 'null' && y != 'null'){
//            cityHallCoords = { lon: 126.9779692, lat: 37.566535, zoom: 16 }; //테스트를 위해 임시로 넣어둠
            cityHallCoords = { lon: y, lat: x, zoom: 16 };
            mapWindow.postMessage(cityHallCoords, '*'); // 모든 출처에 메시지 전송
        }
        else{
            alert("해당 위치에 대한 좌표가 없습니다.");
        }
		//mapWindow.postMessage(cityHallCoords, 'http://10.168.0.247:8080/'); // 특정 사이트에 전송

	} else {
	    alert("지도가 열려 있지 않습니다.");
	/* 	mapWindow = window.open('http://10.168.0.247:8080/', 'mapWindow', 'width=2000,height=1000');
		var cityHallCoords = { lon: 126.9779692, lat: 37.566535, zoom: 16 };
		//mapWindow.postMessage(cityHallCoords, 'http://10.168.0.247:8080/'); // 특정 사이트에 전송
		mapWindow.postMessage(cityHallCoords, '*'); // 모든 출처에 메시지 전송 */
	}
}

/*첨부파일 저장*/
//var fileList=[];
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

                    console.log(itemCount); // 결과 출력

	                    var files = e.originalEvent.target.files;
//	                    fileList.push(files);

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
						row+='<input type="checkbox" id="landRegistration_attachFile'+no+'" name="landRegistration_attachFile" >';
						row+='<label for="landRegistration_attachFile'+no+'"></label>';
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

//보기 클릭 시 팝업 기능
function openFilePopup(filePath) {
    // 절대 경로를 사용하도록 file:// 스킴을 추가
    const serverUrl = `/api/downloadFile?filePath=` + encodeURIComponent(filePath);

    // 새 창의 옵션 설정 (예: 너비 600px, 높이 400px, 스크롤바 허용 등)
    const popupOptions = "width=800,height=600,scrollbars=yes,resizable=yes";
    // 새 창 열기
    window.open(serverUrl, '파일 보기', popupOptions);
}

//필지 첨부파일 관련 이벤트
document.addEventListener("DOMContentLoaded", function() {
    const deleteSelectedBtn = document.getElementById("deleteSelectedBtn");

    // 체크박스 클릭 이벤트 처리
    document.querySelectorAll('.file-checkbox').forEach(checkbox => {
        checkbox.addEventListener('change', function() {
            // 체크박스 상태에 따른 추가 로직이 필요하다면 여기에 작성
            console.log(`Checkbox with value ${this.value} is ${this.checked ? 'checked' : 'unchecked'}`);
        });
    });

    // 선택파일 삭제 버튼 클릭 이벤트 처리
    deleteSelectedBtn.addEventListener('click', function() {
        // 선택된 체크박스 값 가져오기
        const selectedCheckboxes = document.querySelectorAll('.file-checkbox:checked');

        // 체크된 체크박스들의 값과 파일 이름을 추출하여 리스트로 만듦
        const selectedFiles = Array.from(selectedCheckboxes).map(checkbox => {
            const parentLi = checkbox.closest('ul.contents'); // 체크박스가 포함된 ul 요소를 찾음
            const fileName = parentLi.querySelector('.content03.content').textContent.trim(); // 파일 이름 추출

            return {
                value: Number(checkbox.value),   // 체크박스의 value 값
                fileName: fileName       // 파일 이름
            };
        });

        console.log(selectedFiles); // 결과 확인용 콘솔 출력

        if (selectedFiles.length > 0) {
            console.log("Deleting files with IDs:", selectedFiles);

$.ajax({
    url: '/api/pnuAtcDelete',
    type: 'POST',
    contentType: 'application/json',
    data: JSON.stringify({ fileIds: selectedFiles })
})
.done(function(data) {
    if (data.resultMessage == "success") {
        // 성공적으로 삭제되었을 경우 체크박스와 관련된 리스트 항목 삭제
        alert('선택된 파일이 삭제되었습니다.');

        var params = {
            "manage_no": $("#manage_no").val(),
            "pnu": $("#pnu").val()
        };

        $.ajax({
            url: "/jisang/getAtcFileData",
            type: "POST",
            data: params
        })
        .done(function(fragment) {
            $('#pnuAtcFilesDiv').replaceWith(fragment);
        })
        .fail(function(jqXHR, textStatus, errorThrown) {
            console.error('Error:', textStatus, errorThrown);
            alert('파일 목록을 가져오는 중 오류가 발생하였습니다.');
        });
    } else {
        alert('파일 삭제에 실패하였습니다.');
    }
})
.fail(function(jqXHR, textStatus, errorThrown) {
    console.error('Error:', textStatus, errorThrown);
    alert('파일 삭제 중 오류가 발생하였습니다.');
});



        } else {
            alert('삭제할 파일을 선택해 주세요.');
        }
    });
});



//저장버튼
$(document).on("click","#finalBtn",function(){

	var formSerializeArray = $('#searchForm').serializeArray();

       len = formSerializeArray.length;
       var dataObj = {};
       for (i=0; i<len; i++) {
        dataObj[formSerializeArray[i].name] = formSerializeArray[i].value;
       }

       console.log("**dataObj**");
       console.log(dataObj);

        var json = JSON.stringify(formSerializeArray);
           console.log("----------jsonobj------------");
           console.log(json); // JSON 문자열 출력


});
$(document).on("click",".searchAddressBtn",function(){

						  const popupOpen = document.querySelector("#searchResultsPopup .popupWrap");
						  	   $(popupOpen).addClass("open");
						  	   popupOpen.classList.add("active");

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

console.log($(this).parent().parent().html());
	var juso=$(this).parent().parent().find(".popContent02").html();
	var jibun=$(this).parent().parent().find(".popContent03").html();

$(".addressData").attr("readonly", true);
$(".addressData").val(juso);
$(".popupWrap").removeClass("active");

})

//pnu없이 선택/
$(document).on("click","#notPNUBtn",function(){
    $(".addressData").val("");
	$(".addressData").removeAttr("readonly");

	var targetDiv=$("#searchResultPopDiv").parent().find("#searchResultPopup").find(".popupWrap");
	$(".popupWrap").removeClass("active");

});