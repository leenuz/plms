// 커스텀 selectbox

// 함수명 변경
const createCustomLiCompLandReg = () => {
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

        for (let i = 1; i < notsetAddSelectBox.length; i++) {
            const optionValue = notsetAddSelectBox.options[i].value;
            const li = document.createElement('li');
            const button = document.createElement('button');
            button.classList.add('moreSelectBtn');
            button.type = 'button';
            button.textContent = optionValue;
            li.appendChild(button);
            customSelectBtns.appendChild(li);
        }

        // 함수가 한번 적용된 selectContentArea에 class 붙여서 구분한다. 중복실행 되지 않도록
        contentItem.classList.add('customLiProcessed');
    });
}
createCustomLiCompLandReg();


// const customSelectView = document.querySelectorAll('.customSelectView')

// customSelectView.forEach((btn) => {
//     btn.addEventListener('click', function () {
//         btn.classList.toggle('active');

//         if (btn.nextElementSibling) {
//             btn.nextElementSibling.classList.toggle('active');

//         }
//     })
// })



// selectbox click이벤트 함수로 묶기

const compLandReqSelectboxClickEvent01 = () => {
    const contentContainer = document.querySelectorAll('#compLandReg .contWrap');
    const customSelectView = document.querySelectorAll('.customSelectView');

    contentContainer.forEach((wrap) => {
        wrap.addEventListener('click', function (event) {
            if (event.target.classList.contains('customSelectView')) {
                const btn = event.target;

                btn.classList.toggle('active');

                if (btn.nextElementSibling) {
                    btn.nextElementSibling.classList.toggle('active');

                };

            };
        });
    })
}
compLandReqSelectboxClickEvent01();

// customSelectBtns 리스트 click 했을 때 해당 내용으로 바뀌게하기

// const MoreSelectBtn = document.querySelectorAll('.moreSelectBtn')

// MoreSelectBtn.forEach((moreBtn) => {
//     moreBtn.addEventListener('click', function () {
//         var moreSelectBtnText = moreBtn.innerText;
//         console.log(moreSelectBtnText);
//         const parentMoreSelectBtn = moreBtn.closest('.customSelectBtns')
//         const EditCustomViewBtn = parentMoreSelectBtn.previousElementSibling;

//         while (EditCustomViewBtn.firstChild) {
//             EditCustomViewBtn.removeChild(EditCustomViewBtn.firstChild);
//         }

//         // 새로운 텍스트 노드를 추가합니다.
//         const textNode = document.createTextNode(moreSelectBtnText);
//         EditCustomViewBtn.appendChild(textNode);

//         EditCustomViewBtn.classList.remove('active')
//         parentMoreSelectBtn.classList.remove('active')


//         // 선택한 걸 select의 value값으로 변경하기

//         const nearByContent = moreBtn.closest('.selectContentArea');
//         const nearBySelectBox = nearByContent.querySelector('select');
//         nearBySelectBox.value = moreBtn.textContent;
//         console.log(`Selected value: ${nearBySelectBox.value}`);
//     })
// })

const compLandRegSelectEvent02 = () => {

    const compLandRegContainer = document.querySelectorAll('#compLandReg .contWrap');

    compLandRegContainer.forEach((wrap) => {
        wrap.addEventListener('click', function (event) {
            if (event.target.classList.contains('moreSelectBtn')) {
                const moreBtn = event.target;

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

            };
        });
    });

};

compLandRegSelectEvent02();

// 후순위 권리 click 이벤트

var index=1;
const compLandRegInfoAddBtnEvent = () => {
    const infoContentsDetailBox = document.querySelector('#compLandReg .subordinateRts .contWrap');
    const infoSection = infoContentsDetailBox.closest('.subordinateRts');
    const infoContentsBox = infoContentsDetailBox.querySelector('.contentsBox');
    const infoAddBtn = infoSection.querySelectorAll('.addBtn');
    const infoContents = infoContentsDetailBox.querySelectorAll('.contents');
    const infoTitles = infoContentsDetailBox.querySelector('.titles');


    infoSection.addEventListener('click', function (event) {

        // 버튼 클릭시 추가되게
        if (event.target.classList.contains('addBtn')) {
            // ul 만들기
            const infoUl = document.createElement('ul');
            infoUl.classList.add('contents');

            for (let i = 1; i <= 8; i++) {
                // li 만들기
                const infoLi = document.createElement('li');
                infoLi.classList.add('content');

                if (i == 1) {
                    infoLi.classList.add('checkboxWrap');
                    infoLi.classList.add('smallWidth');

                    // input checkbox 세팅
                    const checkboxInput = document.createElement('input');
                    checkboxInput.type = 'checkbox';
                    checkboxInput.id = `compLandReg_checkbox_${Date.now()}_${i}`;

                    infoLi.appendChild(checkboxInput);

                    // label 세팅
                    const checkboxLabel = document.createElement('label');
                    checkboxLabel.setAttribute('for', checkboxInput.id);

                    infoLi.appendChild(checkboxLabel);


                } else if (1 < i && i < 4 || 5 < i && i < 9) {

                    const infoInput = document.createElement('input');
                    infoInput.type = 'text';

                    if(i == 2){
                        infoInput.name = 'rightName';
                    }else if(i == 3){
                        infoInput.name = 'rightMoney';
                    }else if(i == 6){
                         infoInput.name = 'rightUname';
                     }else if(i == 7){
                         infoInput.name = 'rightPhone';
                     }else if (i == 8) {
                        infoInput.name = 'rightAddr';
                        infoLi.classList.add('largeWidth');
                    }
                    // li안에 넣기
                    infoLi.append(infoInput);

                } else if (3 < i && i < 6) {
                    // date 만들기
                    // div 만들기
                    const dateDiv = document.createElement('div');
                    dateDiv.classList.add('dateInputWrap');
                    // input 만들기
                    const dateInput = document.createElement('input');
                    dateInput.type = 'date';
                    dateInput.setAttribute('data-placeholder', '날짜선택');
                    //dateInput.setAttribute('ariaRequired', 'true');
                    //dateInput.required = true;
                    if(i == 4){
                    dateInput.name = 'rightDate';
                    }else if(i ==5){
                     dateInput.name = 'cancleDate';
                    }
                    // div에 input 넣기

                    dateDiv.appendChild(dateInput);
                    infoLi.appendChild(dateDiv);
                }

                infoUl.appendChild(infoLi);
            }
            index++;
            infoContentsBox.appendChild(infoUl);

            const subordinateRtsContents = infoContentsDetailBox.querySelectorAll('.contents');

            if (subordinateRtsContents.length > 5) {
                infoContentsBox.classList.add('contentScr');
                infoTitles.classList.add('titleScr');
            } else {
                infoContentsBox.classList.remove('contentScr');
                infoTitles.classList.remove('titleScr');
            }
        }
        // 삭제 버튼 누를 때
        if (event.target.classList.contains('delBtn')) {
            var thisCheckedDelContent = infoContentsBox.querySelectorAll('input[type="checkbox"]:checked');
            var infoCheckboxs = infoContentsBox.querySelectorAll('input[type="checkbox"]');

            thisCheckedDelContent.forEach((checkbox) => {
                const checkedContents = checkbox.closest('.contents');

                if (checkedContents) {

                    if (checkbox != infoCheckboxs[0]) {
                        checkedContents.remove()
                    } else {
                        return;
                    }
                }

                const subordinateRtsContents02 = infoContentsDetailBox.querySelectorAll('.contents');
                if (subordinateRtsContents02.length > 5) {
                    infoContentsBox.classList.add('contentScr');
                    infoTitles.classList.add('titleScr');
                } else {
                    infoContentsBox.classList.remove('contentScr');
                    infoTitles.classList.remove('titleScr');
                }

            })
        }

    })

}
compLandRegInfoAddBtnEvent();


//compLandRegFileEvent();

// check박스 체크되었을 때

const checkboxEventforCompLandReg = () => {
    const checkboxSection = document.querySelector('#compLandReg .subordinateRts');
    const checkboxContents = checkboxSection.querySelectorAll('input[type="checkbox"]');
    const checkDelBtn = checkboxSection.querySelector('.delBtn');

    checkboxSection.addEventListener('click', function (event) {
        if (event.target.type === 'checkbox') {
            const checkedContents = checkboxSection.querySelectorAll('input[type="checkbox"]:checked');
            console.log(checkedContents.length);

            if (checkedContents.length > 0) {
                checkDelBtn.classList.add('active');
            } else {
                checkDelBtn.classList.remove('active');
            }

        } else if (event.target.classList.contains('delBtn')) {
            const checkedContents = checkboxSection.querySelectorAll('input[type="checkbox"]:checked');
            console.log(checkedContents.length);
            if (checkedContents.length > 0) {
                checkDelBtn.classList.add('active');
            } else {
                checkDelBtn.classList.remove('active');
            }
        }
    })

}
checkboxEventforCompLandReg();


/* js추가 검색팝업오픈 */

const compLandRegSearchOpenPopUp = () => {

    const compLandRegsSearchBtn = document.querySelector(".compLandRegsSearchBtn");
    const compLandRegSearchResultPop = document.querySelector(".compLandRegSearchResultPopWrapper");
    let htmlFilePath = '/components/popuphtml/searchResultsPopup.html'; // 삽입할 html 파일 경로

    if (compLandRegsSearchBtn) {

        let xhr = new XMLHttpRequest();
        xhr.open('GET', htmlFilePath, true);
        xhr.onreadystatechange = function () {
            if (xhr.readyState == 4 && xhr.status == 200) {
                compLandRegSearchResultPop.innerHTML = xhr.responseText;
                runScriptsInElement(compLandRegSearchResultPop); // 삽입된 html내 스크립트 실행 함수 호출
            }
        };
        xhr.send();
        console.log('compLandRegSearchResultPop 작동');
        compLandRegsSearchBtn.addEventListener("click", () => {

            const popupOpen = document.querySelector("#searchResultsPopup .popupWrap");
            compLandRegsSearchBtn.classList.add("open");
            popupOpen.classList.add("active");

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

compLandRegSearchOpenPopUp();


$(document).on("click",".registBtn",function(){

	var formSerializeArray = $('#saveForm').serializeArray();

       len = formSerializeArray.length;
       var dataObj = {};
       for (i=0; i<len; i++) {
        dataObj[formSerializeArray[i].name] = formSerializeArray[i].value;
       }

       var rightDatas=[];
	   	var rightUls=$("#rightDiv .contents");
	   	 console.log("----------deptUls------------");
	   	console.log(rightUls);
	   	/*String RIGHT_NAME = parser.getString("RIGHT_NAME" + String.valueOf(i), ""); // 권리명
					String RIGHT_MONEY = parser.getString("RIGHT_MONEY" + String.valueOf(i), ""); // 설정금액
					String RIGHT_DATE = parser.getString("RIGHT_DATE" + String.valueOf(i), ""); // 설정일
					String CANCLE_DATE = parser.getString("CANCLE_DATE" + String.valueOf(i), ""); // 해지일
					String RIGHT_UNAME = parser.getString("RIGHT_UNAME" + String.valueOf(i), ""); // 성명
					String RIGHT_PHONE = parser.getString("RIGHT_PHONE" + String.valueOf(i), ""); // 연락처
					String RIGHT_ADDR = parser.getString("RIGHT_ADDR" + String.valueOf(i), ""); // 주소*/

	   	for(var i=0;i<rightUls.length;i++){
			var rightName=$(rightUls[i]).find("input[name='rightName']").val();
	   		var rightMoney=$(rightUls[i]).find("input[name='rightMoney']").val();
			var rightDate=$(rightUls[i]).find("input[name='rightDate']").val();
			var cancleDate=$(rightUls[i]).find("input[name='cancleDate']").val();
			var rightUname=$(rightUls[i]).find("input[name='rightUname']").val();
			var rightPhone=$(rightUls[i]).find("input[name='rightPhone']").val();
			var rightAddr=$(rightUls[i]).find("input[name='rightAddr']").val();
			
			if (!rightName.replace(/ /g, "") ||
				!rightMoney.replace(/ /g, "") || 
				!rightDate.replace(/ /g, "") || 
				!cancleDate.replace(/ /g, "") || 
				!rightUname.replace(/ /g, "") || 
				!rightPhone.replace(/ /g, "") || 
				!rightAddr.replace(/ /g, "")) {
				alert('후순위 권리 내역을 확인해주세요.');
				return;
			}
			
			
	   		//console.log("togiManageNo:"+togiManageNo);
	   		var deptObj={
				"RIGHT_NAME":ljsIsNull(rightName)?'':rightName
				,"RIGHT_MONEY":ljsIsNull(rightMoney)?'':rightMoney
				,"RIGHT_DATE":ljsIsNull(rightDate)?'':rightDate
				,"CANCLE_DATE":ljsIsNull(cancleDate)?'':cancleDate
				,"RIGHT_UNAME":ljsIsNull(rightUname)?'':rightUname
				,"RIGHT_PHONE":ljsIsNull(rightPhone)?'':rightPhone
				,"RIGHT_ADDR":ljsIsNull(rightAddr)?'':rightAddr
				
	   			
	   		}
	   		console.log(deptObj);
	   		rightDatas.push(deptObj);
	   	}
	   	dataObj.rightDatas=rightDatas;
		dataObj.gubun="insert"; //modify:수정
		dataObj.dopcoNo=""; //수정일때는 들어간다
		
		const attachFileUls = document.querySelectorAll('input[name="landRegistration_attachFile"]');
		console.log(attachFileUls);
		
		let files = new Array();
		for(var i = 0; i < attachFileUls.length; i++){
			console.log($(attachFileUls[i]).parent().parent().html());
			var fname = $(attachFileUls[i]).parent().parent().find("#filename").val();
			console.log(fname);
			files.push(fname);
		}
		dataObj.files = files;
       console.log("**dataObj**");
       console.log(dataObj);

       /* var json = JSON.stringify(formSerializeArray);
           console.log("----------jsonobj------------");
           console.log(json); // JSON 문자열 출력*/
       url="/land/dopco/insertDopcoList"; 
	   $.ajax({
	   			
			url:url,
			type:'POST',
			contentType:"application/json",
			data:JSON.stringify(dataObj),
			
			dataType:"json",
			beforeSend:function(request){
				console.log("beforesend ........................");
				loadingShow();
			},
			success:function(response){
				loadingHide();
				console.log(response);
				if (response.success="Y"){
					console.log("response.success Y");
					//console.log("response.resultData length:"+response.resultData.length);
					alert("정상적으로 등록 되었습니다.");
					/*$("#popup_bg").show();
					$("#popup").show(500);
					//$("#addrPopupLayer tbody td").remove();
					for(var i=0;i<response.resultData.length;i++){
						$("#addrPopupTable tbody").append("<tr><td>"+response.resultData[i].juso+"</td><td><button>선택</button></td></tr>");
					}*/
				}
				else {
					console.log("response.success N");
				}
			},
			error:function(jqXHR,textStatus,errorThrown){
				alert("registBtn ajax error\n"+textStatus+":"+errorThrown);
				return false;
			}
		
	}); 


});
$(document).on("click",".searchBtn",function(){


	var addr = $(this).parent().find(".addressData input").val().trim();
	console.log(addr);
	var datas={"address":addr}

   if (addr==null || addr=="" || addr==undefined) {
    alert("주소를 입력해주세요.");
    return;
   }

	$.ajax({
    				   	   	  url: "/land/dopco/getBunhalJIjukSelect",
    				   	   	  type: "POST",
    				   	   	  data: datas,
    				   	   })
    				   	   .done(function (fragment) {
    				   	      $('#searchResultPopDiv').replaceWith(fragment);
    						  const popupOpen = document.querySelector("#searchResultsPopup .popupWrap");
    						  	   $(popupOpen).addClass("open");
    						  	   popupOpen.classList.add("active");
//                            	 $('.resultSelectBtn').attr('data-index', id);
//                               	$('.saveBtn').attr('data-index', id);
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
//var id =  $('.resultSelectBtn').data('index');
//
//console.log("***클릭된 id*** : " + id);
//console.log($(this).parent().parent().html());
var pnu=$(this).parent().parent().find(".popContent01").html();
	var juso=$(this).parent().parent().find(".popContent02").html();
	var jibun=$(this).parent().parent().find(".popContent03").html();
	var sido_nm=$(this).parent().parent().find(".popContent0201").html();
	var sgg_nm=$(this).parent().parent().find(".popContent0202").html();
	var emd_nm=$(this).parent().parent().find(".popContent0203").html();
	var ri_nm=$(this).parent().parent().find(".popContent0204").html();
	var addrcode=$(this).parent().parent().find(".popContent0205").html();
	var area=$(this).parent().parent().find(".popContent07").html();
    var jimok=$(this).parent().parent().find(".popContent06").html();

console.log(area);
console.log(jimok);
$(".addressData input").val(juso);
$("#sido_nm").val(sido_nm);
$("#sgg_nm").val(sgg_nm);
$("#emd_nm").val(emd_nm);
$("#ri_nm").val(ri_nm);
$("#pnu").val(pnu);
$("#jibun").val(jibun);
$("#addrcode").val(addrcode);

$(".areaData input").val(area);
$(".jimokData .customSelectView").val(jimok);
$(".jimokData #compLandRegSelectBox06").val(jimok);
 const button = document.querySelector('.jimokData .customSelectView');
       button.textContent = jimok;

$(".popupWrap").removeClass("active");
//$(".bunhalAddres_" + id).attr("readonly", true);

})

//pnu없이 선택/
$(document).on("click","#notPNUBtn",function(){

    $(".addressData input").val("");

	var targetDiv=$("#searchResultPopDiv").parent().find("#searchResultPopup").find(".popupWrap");
	$(".popupWrap").removeClass("active");

});

/*첨부파일*/
let fileNo = 1;
let uploadFiles = new Array();
$(document).ready(function() {
	let objDragAndDrop = $(".fileUploadBox");
	commonJisaInfoCheck();
	
	$(document).on("dragenter",".fileUploadBox",function(e) {
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
		let files = e.originalEvent.dataTransfer.files;
		handleFileUpload(files,objDragAndDrop);
	});
	
	$(document).on('dragenter', function (e) {
		e.stopPropagation();
		e.preventDefault();
	});
	
	$(document).on('dragover', function (e) {
		e.stopPropagation();
		e.preventDefault();
		objDragAndDrop.css('border', '2px dotted #0B85A1');
	});
	
	$(document).on('drop', function (e) {
		e.stopPropagation();
		e.preventDefault();
	});
	
	//drag 영역 클릭시 파일 선택창
	objDragAndDrop.on('click',function (e) {
		$('input[type=file]').trigger('click');
	});
	
	$('input[type=file]').on('change', function(e) {
		const fileListDiv = document.getElementById('fileListDiv');
		const listItems = fileListDiv.getElementsByTagName('ul');
		const itemCount = listItems.length; // ul 요소의 갯수
		let files = e.originalEvent.target.files;
		handleFileUpload(files,objDragAndDrop);
	});
	
	function handleFileUpload(files,obj) {
		for (let i = 0; i < files.length; i++) {
			let fd = new FormData();
			fd.append('file', files[i]);
			let status = new createStatusbar($("#fileTitleUl"),files[i].name,files[i].size,fileNo); //Using this we can set progress.
			//status.setFileNameSize(files[i].name,files[i].size);
			sendFileToServer(fd,status);
		}
		fileNo++;
	}
	
	let rowCount = 0;
	function createStatusbar(obj,name,size,no) {
		let sizeStr = "";
		let sizeKB = size/1024;
		if (parseInt(sizeKB) > 1024) {
			let sizeMB = sizeKB/1024;
			sizeStr = sizeMB.toFixed(2) + " MB";
		} else {
			sizeStr = sizeKB.toFixed(2) + " KB";
		}
		// var row='<ul class="contents" id="fileListUl">';
		// row+='<li class="content01 content checkboxWrap">';
		// row+='<input type="checkbox" id="landRegistration_attachFile'+no+'" name="landRegistration_attachFile" >';
		// row+='<label for="landRegistration_attachFile'+no+'"></label>';
		// row+='</li>';
		// row+='<li class="content02 content"><input type="text" id="filename" placeholder="'+name+'" class="notWriteInput" readonly></li></ul>';
		// obj.after(row);
		let now = new Date();
		let formattedDate = now.toLocaleString();
		let row = ``;
		row += `<ul class="contents" id="fileListUl">`;
		row += `	<input type="hidden" name="no" value="${no}">`;
		row += `	<input type="hidden" name="name" value="${name}">`;
		row += `	<input type="hidden" name="nfname" value="">`;
		row += `	<li class="content01 content checkboxWrap">`;
		row += `		<input type="checkbox" id="landRegistration_attachFile${no}" name="landRegistration_attachFile" >`;
		row += `		<label for="landRegistration_attachFile${no}"></label>`;
		row += `	</li>`;
		row += `	<li class="content02">`;
		row += `		<input type="text" value="${name}" id="filename" readonly class="notWriteInput" />`;
		row += `	</li>`;
		row += `</ul>`;
		
		obj.after(row);
	
		let radio = $(row).find('input');
		$(radio).find('input').attr("disabled",false);
	}

	function sendFileToServer(formData,status){
		let uploadURL = "/land/dopco/fileUpload/post"; //Upload URL
		let extraData = {}; //Extra Data.
		let jqXHR=$.ajax({
			xhr: function() {
				let xhrobj = $.ajaxSettings.xhr();
				if (xhrobj.upload) {
					xhrobj.upload.addEventListener('progress', function(event) {
						let percent = 0;
						let position = event.loaded || event.position;
						let total = event.total;
						if (event.lengthComputable) {
							percent = Math.ceil(position / total * 100);
						}
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
});


	 // 첨부파일 전체 선택 체크박스
	 const allCheckEventLandRightsRegist = () => {

	     // 첨부파일 리스트들
	     const attachFiles = document.querySelectorAll('input[name="landRightsRegistration_attachFile"]');
	     // checked가 된 첨부파일 리스트
	     const clickedAttachFiles = document.querySelectorAll('input[name="landRightsRegistration_attachFile"]:checked');
	     // 전체선택 input
	     const clickedAllinput = document.querySelector('input[name="landRightsRegistration_file_select_all"]');

	     // 전체선택되게 하기
	     clickedAllinput.addEventListener('click', function () {
	         clickedSelectAllLandRightsRegist(clickedAllinput);
	     })
	     // 개당 선택시 전체 선택되게하기
	     attachFiles.forEach((checkList) => {
	         checkList.addEventListener('click', function () {

	             clickCheckBoxEventLandRightsRegist(checkList);
	         })
	     })

	     // 개별 리스트 클릭시 전체로 변하기
	     function clickCheckBoxEventLandRightsRegist() {
	         // 최신으로 업데이트 해주기
	         const clickedAttachFiles = document.querySelectorAll('input[name="landRightsRegistration_attachFile"]:checked');

	         if (attachFiles.length === clickedAttachFiles.length) {
	             clickedAllinput.checked = true;
	         } else {
	             clickedAllinput.checked = false;
	         }
	     }

	     // 전체선택 클릭시
	     function clickedSelectAllLandRightsRegist(clickedAllinput) {
	         const attachFiles = document.querySelectorAll('input[name="landRightsRegistration_attachFile"]');

	         attachFiles.forEach((checkbox) => {
	             checkbox.checked = clickedAllinput.checked;
	         })
	     }
	 }
	 allCheckEventLandRightsRegist();

	 $(document).on("click","#deleteFileBtn",function(){

     	const clickedAttachFiles = document.querySelectorAll('input[name="landRegistration_attachFile"]:checked');
     	console.log(clickedAttachFiles);
     	for(var i=0;i<clickedAttachFiles.length;i++){
     		var delEle=$(clickedAttachFiles[i]).closest("#fileListUl");
     		$(delEle).remove();


     	}

     })