// 커스텀 selectbox

createCustomLiLandRegist();

function createCustomLiLandRegist() {
    const contentItems = document.querySelectorAll('.selectContentArea');
	console.log("---------createCustomLiLandRegist---------------");
    contentItems.forEach(contentItem => {
        const notsetAddSelectBox = contentItem.querySelector('select');
	//	console.log(notsetAddSelectBox);
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
			if (optionValue=="") button.textContent="전체";
            else button.textContent = optionValue;
			//console.log("----button---");
			//console.log(button);
            li.appendChild(button);
			//console.log($(li).html());
            customSelectBtns.appendChild(li);
        }
    });
}

function loadCustomLiLandRegist(ele) {
	console.log("---------ele---------------");
	console.log($(ele).html());
	
  console.log("---------loadCustomLiLandRegist---------------");
	
	var thisContent = ele.parent().parent().find('select');
	console.log("---------thisContent---------------");
	console.log($(thisContent).html());
	const customSelectBox = ele.closest('.customSelectBox');
	console.log($(customSelectBox).html());
	$(customSelectBox).find("li").remove();
	var customSelectBtns = customSelectBox.find('.customSelectBtns');
	console.log("---------customSelectBtns---------------");
	console.log($(customSelectBtns).html());
	var optList=thisContent[0];
	//console.log(optList.length);
	console.log(optList);
	for (let i = 0; i < optList.length; i++) {
		const optionValue = optList.options[i].value;
		//console.log(optionValue);
		const li = document.createElement('li');
					//console.log(li);
		            const button = document.createElement('button');
		            button.classList.add('moreSelectBtn');
		            button.type = 'button';
					if (optionValue=="") button.textContent="전체";
		            else button.textContent = optionValue;
					//console.log("----button---");
					//console.log(button);
					
		            li.appendChild(button);
					//console.log($(li).html());
		            $(customSelectBtns).append(li);
		
	}
    /*contentItems.forEach(contentItem => {
        const notsetAddSelectBox = contentItem.querySelector('select');
		console.log(notsetAddSelectBox);
        // select가 없으면 return
        if (!notsetAddSelectBox) return;

        const customSelectBox = contentItem.querySelector('.customSelectBox');
        const customSelectBtns = customSelectBox.querySelector('.customSelectBtns');

        for (let i = 0; i < notsetAddSelectBox.length; i++) {
            const optionValue = notsetAddSelectBox.options[i].value;
            const li = document.createElement('li');
			console.log(li);
            const button = document.createElement('button');
            button.classList.add('moreSelectBtn');
            button.type = 'button';
			if (optionValue=="") button.textContent="전체";
            else button.textContent = optionValue;
			console.log("----button---");
			console.log(button);
			
            li.appendChild(button);
			console.log($(li).html());
            customSelectBtns.appendChild(li);
        }
    });*/
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



$(document).on("click",".moreSelectBtn",function(){
	console.log("---------------moreselectBtn--click----");
	var moreSelectBtnText = this.innerText;
	console.log("moreSelectBtnText:"+this.innerText);
	const parentMoreSelectBtn = this.closest('.customSelectBtns')
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

	       const nearByContent = this.closest('.selectContentArea');
	       const nearBySelectBox = nearByContent.querySelector('select');
		console.log(nearBySelectBox);
		$(nearBySelectBox).val(this.textContent);
		$(nearBySelectBox).trigger("change");
	       nearBySelectBox.value = this.textContent;
	       console.log(`Selected value: ${nearBySelectBox.value}`);
	
});

// customSelectBtns 리스트 click 했을 때 해당 내용으로 바뀌게하기
/*
const MoreSelectBtn = document.querySelectorAll('.moreSelectBtn')

MoreSelectBtn.forEach((moreBtn) => {
    moreBtn.addEventListener('click', function () {
		console.log("-------MoreSelectBtn---click--------------");
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
		console.log(nearBySelectBox);
		$(nearBySelectBox).val(moreBtn.textContent);
		$(nearBySelectBox).trigger("change");
        nearBySelectBox.value = moreBtn.textContent;
        console.log(`Selected value: ${nearBySelectBox.value}`);
		


    })
})*/


// 소유자 정보 추가 click시 이벤트

const ownerInfoAddBtn = document.querySelectorAll('#landRightsRegistration .ownerInfo .addBtn')
const editBefore = document.querySelectorAll('#landRightsRegistration .ownerInfo .contents .content.btnBox .editBefore');
const editAfter = document.querySelectorAll('#landRightsRegistration .ownerInfo .contents .content.btnBox .editAfter');
const editContent = document.querySelectorAll('#landRightsRegistration .editSpace');
const registBtn = document.querySelectorAll('#landRightsRegistration .registBtn');


$(document).on("click",".addBtn",function(){
	console.log("---------addBtn click-----------");

	var thisEditContent = this.closest('.contents');
	        console.log(thisEditContent);
//			thisEditContent.classList.add('editing');
			const inputs = thisEditContent.querySelectorAll('input');

			        if (thisEditContent.classList.contains('editing')) {
			            inputs.forEach(input => {
			              input.setAttribute('readonly', 'readonly');


			            });
			        } else {
			            inputs.forEach(input => {
			            thisEditContent.classList.add('editing');
			            input.removeAttribute('readonly');
			            });
			        }
});
$(document).on("click","#completeSoujaBtn",function(){
		console.log("------------completeSoujaBtn click---------");
        const soujaDiv = document.getElementById('soujaDiv');
        const editingElements = soujaDiv.querySelectorAll('.editing');
        const editingCount = editingElements.length;

		var thisUl=$(this).parent().parent().parent().parent();
		console.log("editingCount" + editingCount);
		var addUl=$("#soujaHiddenUl").html();

		var input=$(thisUl).find("input");
		console.log(input);
		console.log(input.length);
		console.log("0:"+$(input).eq(0).val());

		if ($(input).eq(0).val()=="" || $(input).eq(1).val()=="" || $(input).eq(2).val()=="" ||  $(input).eq(3).val()==""){
			alert("입력사항을 체크하세요! 공유지분,성명,주소는 필수 입력입니다.");
			return;
		}


		if ($(input).eq(0).val()!="" && $(input).eq(1).val()!="" && $(input).eq(2).val()!="" && $(input).eq(3).val()!="") {
		//	alert("소유자 정보를 정확하게 입력해주세요!");
			$(thisUl).removeClass("editing");
            $(thisUl).find('li input').attr('readonly', true);
			if(editingCount < 3){
			    $("#soujaDiv").append('<ul class="contents editing" id="soujaUl">'+addUl+'</ul>');
			}

			//return;
		}
		//if ($(input).eq(0).html()=="" || )

//		$(thisUl).removeClass("editing");
		/*for(var i=0;i<input.length;i++) {
			console.log($(input).eq(i).parent().html());
		}*/

					            /*$(input).forEach(input => {
					                input.setAttribute('readonly', 'readonly');
					            });*/


});


$(document).on("click","#deleteSoujaBtn",function(){
	console.log("------------deleteSoujaBtn click---------");
	var thisUl=$(this).parent().parent().parent().parent();
	var thisContents=$(this).parent().parent().parent().parent().parent().find(".contents");
	console.log($(thisContents).html());
	console.log($(thisContents).length);
	if ($(thisContents).length<=2) return;
	$(thisUl).remove();

});

/*ownerInfoAddBtn.forEach((btn) => {
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
*/
// 추가 버튼 click 이벤트

/*if (registBtn) {
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
}*/

// 기본 정보 -> 주소 검색
/*
const radioButtons = document.querySelectorAll('#landRightsRegistration .defaultInfo .contWrap .depth2 .contents .content02 .radioBox .inputArea .inputWrap input[name="landRightsRegistration_addressInput"]');
const inputAreas = document.querySelectorAll('#landRightsRegistration .defaultInfo .contWrap .depth2 .contents .content02 .radioBox .inputArea');

console.log(radioButtons);
radioButtons.forEach((radio) => {
    radio.addEventListener('click', () => {
		console.log("----------radio button click-------------");
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
});*/

const checkedRadio = document.querySelector('#landRightsRegistration .defaultInfo .contWrap .depth2 .contents .content02 .radioBox .inputArea .inputWrap input[name="landRightsRegistration_addressInput"]:checked');
if (checkedRadio) {
    checkedRadio.dispatchEvent(new Event('click'));
}

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
	//const attachFiles = document.querySelectorAll('input:checkbox[name="landRightsRegistration_attachFile"]:checked');
	/*$('input:checkbox[name=landRightsRegistration_attachFile]').each(function (index) {
		if($(this).is(":checked")==true){
	    	console.log($(this).val());
	    }
	})*/
	const clickedAttachFiles = document.querySelectorAll('input[name="landRightsRegistration_attachFile"]:checked');
	console.log(clickedAttachFiles);
	console.log(uploadFiles);
	for(var i=0;i<clickedAttachFiles.length;i++){
		var delEle=$(clickedAttachFiles[i]).closest("#fileListUl");
		console.log($(clickedAttachFiles[i]).closest("#fileListUl").html());
		$(delEle).remove();


	}

})



$(document).on("click","#basicSearchBtn",function(){

	console.log("-----basicSearchBtn click------------");




		   console.log('landRightSearchResultPop 작동');
		   console.log("-------검색버튼 클릭-----------");
		   		console.log($("#saveForm").serialize());
		   		var formSerializeArray = $('#saveForm').serializeArray();
		   			   console.log(formSerializeArray);
					  /* console.log($("#searchResultPopDiv").html());*/


				   //searchResultPopDiv 화면뿌릴 DIV
				   	   $.ajax({
				   	   	  url: "/land/jisang/getBasicSearchData",
				   	   	  type: "POST",
				   	   	  data: formSerializeArray,
				   	   })
				   	   .done(function (fragment) {
						//runScriptsInElement(landRightSearchResultPop); // 삽입된 html내 스크립트 실행 함수 호출
						//console.log($("#searchResultPopDiv").html());
				   	      $('#searchResultPopDiv').replaceWith(fragment);
						  const popupOpen = document.querySelector("#searchResultsPopup .popupWrap");
						  	    console.log($(popupOpen).html());
						  	   //			   		              landRightsSearchBtn.classList.add("open");
						  	   $(popupOpen).addClass("open");
						  	   popupOpen.classList.add("active");

				   	   	});

});

//저장버튼
$(document).on("click", "#finalBtn", function() {
	console.log("---------finalBtn class click------------");
	console.log($("#saveForm").serialize());

	//데이터를 가공해서 넘김다

	var formSerializeArray = $('#saveForm').serializeArray();
	console.log(formSerializeArray);

	len = formSerializeArray.length;
	var dataObj = {};
	for (i = 0; i < len; i++) {
		dataObj[formSerializeArray[i].name] = formSerializeArray[i].value;
	}

	console.log("------dataObj--------");
	console.log(dataObj);

	const soujaUls = document.querySelectorAll('#soujaUl');
	const attachFileUls = document.querySelectorAll('input[name="landRightsRegistration_attachFile"]');
	console.log(attachFileUls);

	//   console.log(soujaUls);
	var soujaArr = new Array();
	for (var i = 0; i < soujaUls.length; i++) {
		console.log(soujaUls[i]);
		console.log($(soujaUls[i]).find("#soujaJibun").val());
		var soujaJibun = $(soujaUls[i]).find("#soujaJibun").val();
		var soujaName = $(soujaUls[i]).find("#soujaName").val();
		var soujaAddress = $(soujaUls[i]).find("#soujaAddress").val();
		var soujaContact1 = $(soujaUls[i]).find("#soujaContact1").val();
		var soujaContact2 = $(soujaUls[i]).find("#soujaContact2").val();

		soujaJibun = (soujaJibun == "undefined" || soujaJibun == "" || soujaJibun == null) ? "" : soujaJibun;
		soujaName = (soujaName == "undefined" || soujaName == "" || soujaName == null) ? "" : soujaName;
		soujaAddress = (soujaAddress == "undefined" || soujaAddress == "" || soujaAddress == null) ? "" : soujaAddress;
		soujaContact1 = (soujaContact1 == "undefined" || soujaContact1 == "" || soujaContact1 == null) ? "" : soujaContact1;
		soujaContact2 = (soujaContact2 == "undefined" || soujaContact2 == "" || soujaContact2 == null) ? "" : soujaContact2;
		var soujaInfo = { "jibun": soujaJibun, "soujaName": soujaName, "soujaAddress": soujaAddress, "soujaContact1": soujaContact1, "soujaContact2": soujaContact2 };
		if (soujaJibun != "" && soujaName != "" && soujaAddress != "" && soujaContact1 != "") soujaArr.push(soujaInfo);
	}

	var files = new Array();
	for (var i = 0; i < attachFileUls.length; i++) {
		console.log($(attachFileUls[i]).parent().parent().html());
		var fname = $(attachFileUls[i]).parent().parent().find("#filename").attr('placeholder');
		console.log(fname);
		files.push(fname);
	}

	console.log("--------files---------");
	console.log(files);

	console.log("--------soujaArr------");
	console.log(soujaArr);
	dataObj.soujaInfo = soujaArr;
	dataObj.uploadFiles = files;

	//필수정보체크
	console.log("jisa:" + dataObj.jisa);
	if (!checkData(dataObj.jisa, "s", "담당지사를 입력해주세요!")) return;
	else if (!checkData(dataObj.overlap_yn, "s", "관로일치여부블 입력해주세요!")) return;
	else if (!checkData(dataObj.youngdo, "s", "용도블 입력해주세요!")) return;
	else if (!checkData(dataObj.pipe_name, "s", "관로명(구간)을 입력해주세요!")) return;
	else if (!checkData(dataObj.sun_gubun, "s", "선구분을 입력해주세요!")) return;
	else if (!checkData(dataObj.gover_own_yn, "s", "국공유지여부를 입력해주세요!")) return;
	else if (!checkData(dataObj.jijuk_area, "s", "지적면적을 입력해주세요!")) return;
	else if (!checkData(dataObj.jimok_text, "s", "지목을 입력해주세요!")) return;
	else if (!checkData(dataObj.account_yn, "s", "회계처리필요여부블 입력해주세요!")) return;
	else if (!checkData(dataObj.maddress, "s", "주소블 입력해주세요!")) return;
	else if (soujaArr <= 0) {
		alert("소유자 정보를 입력해주세요!");
		return;
	}
	else if (!checkData(dataObj.mcomple_yn, "s", "등기여부블 입력해주세요!")) return;
	else if (!checkData(dataObj.mpyeonib_area, "s", "편입면적을 입력해주세요!")) return;
	else if (!checkData(dataObj.mpermit_yn, "s", "계약유형을 입력해주세요!")) return;

	dataObj.gubun = "insert";
	console.log("------dataObj--------");
	console.log(dataObj);

	url = "/land/jisang/insertJisangList";
	$.ajax({

		url: url,
		type: 'POST',
		contentType: "application/json",
		data: JSON.stringify(dataObj),

		dataType: "json",
		beforeSend: function(request) {
			console.log("beforesend ........................");
			loadingShow();
		},
		success: function(response) {
			loadingHide();
			console.log(response);
			if (response.success = "Y") {
				console.log("response.success Y");
				//	console.log("response.resultData length:"+response.resultData.length);
				alert("정상적으로 등록 되었습니다.");
				window.location.href = "/land/jisang/menu02_1";
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
		error: function(jqXHR, textStatus, errorThrown) {
			alert("finalBtn ajax error\n" + textStatus + ":" + errorThrown);
			return false;
		}
	});
});


$(document).on("click","#popupCloseBtn",function(){
	console.log("---------popupCloseBtn class click------------");
	console.log($("#searchResultPopDiv").html());
	var targetDiv=$("#searchResultPopDiv").parent().find("#searchResultPopup").find(".popupWrap");
	//console.log($(targetDiv).html());
	$("#popupWrap").toggleClass("active");
	/*const PopupFinalBtns =  document.querySelectorAll('.popupWrap .lastBtnBox .finalBtn');
	const PopupWrap = PopupFinalBtns.closest('.popupWrap');
	            this.classList.toggle("active");
	            this.classList.toggle('active');*/
	//$("#searchResultPopDiv").
});
// 저장, 닫기 버튼 click시 팝업 사라지게

	const PopupFinalBtns =  document.querySelectorAll('.popupWrap .lastBtnBox .finalBtn');

	    PopupFinalBtns.forEach((button) => {
	        button.addEventListener('click',function(){

	        })
	    })

	// x 버튼 click시 팝업 사라지게

//	const topCloseBtn = document.querySelectorAll('.popupWrap .topCloseBtn');
//	    if(topCloseBtn){
//
//	        topCloseBtn.forEach((topClosebutton) => {
//
//	            topClosebutton.addEventListener('click',function(){
//	                const PopupWrap = topClosebutton.closest('.popupWrap');
//	                PopupWrap.classList.remove("active");
//	            })
//	        })
//	    }

$(document).on("click",".topCloseBtn",function(){

	var targetDiv=$("#searchResultPopDiv").parent().find("#searchResultPopup").find(".popupWrap");
	$(".popupWrap").removeClass("active");
//	$(".popupWrap").toggleClass("active");
});

// 주소 선택 클릭
$(document).on("click",".resultSelectBtn",function(){
	console.log("----------resultSelectBtn-click--------");
	console.log($(this).parent().parent().html());
	var pnu=$(this).parent().parent().find(".popContent01").html();
	var address=$(this).parent().parent().find(".popContent02").html();
	var jibun=$(this).parent().parent().find(".popContent03").html();
	var sido_nm=$(this).parent().parent().find(".popContent0201").html();
	var sgg_nm=$(this).parent().parent().find(".popContent0202").html();
	var emd_nm=$(this).parent().parent().find(".popContent0203").html();
	var ri_nm=$(this).parent().parent().find(".popContent0204").html();
	console.log("pnu:"+pnu);
	console.log("address:"+address);
	console.log("jibun:"+jibun);
	$("#maddress").val(address+" "+jibun);
	$("#raddress").val(address+" "+jibun);
	$("#mpnu").val(pnu);
	$("#mjibun").val(jibun);
	$("#sido_nm").val(sido_nm);
	$("#sgg_nm").val(sgg_nm);
	$("#emd_nm").val(emd_nm);
	$("#ri_nm").val(ri_nm);

	var targetDiv=$("#searchResultPopDiv").parent().find("#searchResultPopup").find(".popupWrap");
    	$(".popupWrap").removeClass("active");
	
	
})


		
		
/* js추가 검색팝업오픈 */
/*
const landRightSearchOpenPopUp = () => {

    const landRightsSearchBtn = document.querySelector(".landRightsSearchBtn");
    const landRightSearchResultPop = document.querySelector(".landRightSearchResultPopWrapper");
    let htmlFilePath = '/components/popuphtml/searchResultsPopup.html'; // 삽입할 html 파일 경로

    if(landRightsSearchBtn){
       
       let xhr = new XMLHttpRequest();
       xhr.open('GET', htmlFilePath, true);
       xhr.onreadystatechange = function() {
           if (xhr.readyState == 4 && xhr.status == 200) {
               landRightSearchResultPop.innerHTML = xhr.responseText;
               runScriptsInElement(landRightSearchResultPop); // 삽입된 html내 스크립트 실행 함수 호출
           }
       };
       xhr.send();
       console.log('landRightSearchResultPop 작동');
       landRightsSearchBtn.addEventListener("click" , () => {
		console.log("-------검색버튼 클릭-----------");
		console.log($("#searchForm").serialize());
		var formSerializeArray = $('#searchForm').serializeArray();
			   console.log(formSerializeArray);
           const popupOpen = document.querySelector("#searchResultsPopup .popupWrap");
           landRightsSearchBtn.classList.add("open");
           popupOpen.classList.add("active");
		   console.log($("#searchResultPopDiv").html());
		   //searchResultPopDiv 화면뿌릴 DIV
		   $.ajax({
		   	  url: "/land/jisang/getBasicSearchData",
		   	  type: "POST",
		   	  data: formSerializeArray,
		   })
		   .done(function (fragment) {
		      $('#searchResultPopDiv').replaceWith(fragment);
		   	});
		   
		
       	})

  

    }
}
*/
const runScriptsInElement = (element) => {
       const scripts = element.getElementsByTagName('script');
       for (let i = 0; i < scripts.length; i++) {
           const script = document.createElement('script');
           script.textContent = scripts[i].textContent;
           document.body.appendChild(script).parentNode.removeChild(script);
       }
   }

//landRightSearchOpenPopUp();

// 지사 선택 시  관로명 변경
$(document).on("change","#landRightsRegistSelectBox01",function(){
	
	console.log("----landRightsRegistSelectBox01-----------");	
	changPipeName();
	$("#pipe_name_ul li").remove();
	loadCustomLiLandRegist($("#pipe_name_ul"));
});

function changPipeName() {
	var url = "/land/api/getPipeName";
	console.log("----changePipeName()-----------");
	var requestData = { "jisaIdx": $("#landRightsRegistSelectBox01").val() };
	
	// 지사-전체 클릭 시 alert
	var jisaIdx = $("#landRightsRegistSelectBox01").val();
	if (jisaIdx == '') {
	    alert("지사를 선택해주세요.");
	    return;
	}

	console.log(requestData);
	$.ajax({
		url: url,
		type: 'POST',
		contentType: "application/json",
		data: JSON.stringify(requestData),
		async: false,
		dataType: "json",
		success: function(response) {
			console.log(response);
			if (response.success = "Y") {
				console.log("response.success Y");
				console.log("response.resultData length:" + response.resultData.length);
				console.log(response.resultData[0]);
				$("#landRightsRegistSelectBox04 option").remove();
				$("#landRightsRegistSelectBox04").append('<option value="">선택</option>');
				for (var i = 0; i < response.resultData.length; i++) {
					$("#landRightsRegistSelectBox04").append('<option>' + response.resultData[i].jzn_zone_name + '</option>');
				}

			}
			else {
				console.log("response.success N");
			}
		},
		error: function(jqXHR, textStatus, errorThrown) {
			alert("landRightsRegistSelectBox04 ajax error\n" + textStatus + ":" + errorThrown);
		}

	});
}

$(document).ready(function(){
	//getSidoMaster();
	commonJisaInfoCheck();
	
	insertJisaNameSet();
	
	
	
});


function getSidoMaster(){
	
	
	
			 var url="/land/api/getSidoMaster";
			 
	var requestData={};
	console.log(requestData);
		 $.ajax({
			
				url:url,
				type:'POST',
				contentType:"application/json",
				data:JSON.stringify(requestData),
				async:false,
				dataType:"json",
				success:function(response){
					console.log(response);
					if (response.success="Y"){
						console.log("response.success Y");
						console.log("response.resultData length:"+response.resultData.length);
						console.log(response.resultData);
						$("#landRightsRegistSelectBox09 option").remove();
						$("#landRightsRegistSelectBox09").append('<option value="">전체</option>');
						for(var i=0;i<response.resultData.length;i++){
							$("#landRightsRegistSelectBox09").append('<option value='+response.resultData[i].sm_name+'>'+response.resultData[i].sm_name+'</option>');
						}
						loadCustomLiLandRegist($("#sido_ul"));
					}
					else {
						console.log("response.success N");
					}
				},
				error:function(jqXHR,textStatus,errorThrown){
					alert("getSidoMaster ajax error\n"+textStatus+":"+errorThrown);
				}
			
		});
}

$(document).on("change","#landRightsRegistSelectBox09",function(){
	console.log("----------landRightsRegistSelectBox09--------------");
		getSigunMaster($("#landRightsRegistSelectBox09 option:selected").val());
	})
	
	

	$(document).on("change","#landRightsRegistSelectBox10",function(){
		getDongMaster($("#landRightsRegistSelectBox09 option:selected").val(),$("#landRightsRegistSelectBox10 option:selected").val());
	})
	
	$(document).on("change","#landRightsRegistSelectBox11",function(){
			getRiMaster($("#landRightsRegistSelectBox09 option:selected").val(),$("#landRightsRegistSelectBox10 option:selected").val(),$("#landRightsRegistSelectBox11 option:selected").val());
		})



	
	
	
	function getSigunMaster(key){
				 var url="/land/api/getSigunMaster";
				 
		var requestData={"key":key};
		console.log(requestData);
			 $.ajax({
				
					url:url,
					type:'POST',
					contentType:"application/json",
					data:JSON.stringify(requestData),
					async:false,
					dataType:"json",
					success:function(response){
						console.log(response);
						if (response.success="Y"){
							console.log("response.success Y");
							console.log("response.resultData length:"+response.resultData.length);
							console.log(response.resultData);
							$("#landRightsRegistSelectBox10 option").remove();
							$("#landRightsRegistSelectBox10").append('<option value="">전체</option>');
							for(var i=0;i<response.resultData.length;i++){
								console.log("<option value='"+response.resultData[i].sm_gugun+"'>"+response.resultData[i].sm_gugun+"</option>");
								$("#landRightsRegistSelectBox10").append('<option value="'+response.resultData[i].sm_gugun+'">'+response.resultData[i].sm_gugun+'</option>');
							}
							loadCustomLiLandRegist($("#gugun_ul"));
						}
						else {
							console.log("response.success N");
						}
					},
					error:function(jqXHR,textStatus,errorThrown){
						alert("getSidoMaster ajax error\n"+textStatus+":"+errorThrown);
					}
				
			});
	}

	
	
	function getDongMaster(sidoKey,gugunKey){
				 var url="/land/api/getDongMaster";
				 
		var requestData={"sidoKey":sidoKey,"gugunKey":gugunKey};
		console.log(requestData);
			 $.ajax({
				
					url:url,
					type:'POST',
					contentType:"application/json",
					data:JSON.stringify(requestData),
					async:false,
					dataType:"json",
					success:function(response){
						console.log(response);
						if (response.success="Y"){
							console.log("response.success Y");
							console.log("response.resultData length:"+response.resultData.length);
							console.log(response.resultData);
							$("#landRightsRegistSelectBox11 option").remove();
							$("#landRightsRegistSelectBox11").append('<option value="">전체</option>');
							for(var i=0;i<response.resultData.length;i++){
								$("#landRightsRegistSelectBox11").append('<option value="'+response.resultData[i].bm_dong+'">'+response.resultData[i].bm_dong+'</option>');
							}
							loadCustomLiLandRegist($("#dong_ul"));
						}
						else {
							console.log("response.success N");
						}
					},
					error:function(jqXHR,textStatus,errorThrown){
						alert("getDongMaster ajax error\n"+textStatus+":"+errorThrown);
					}
				
			});
	}
	
	
	function getRiMaster(sidoKey,gugunKey,dongKey){
					 var url="/land/api/getRiMaster";
					 
			var requestData={"sidoKey":sidoKey,"gugunKey":gugunKey,"dongKey":dongKey};
			console.log(requestData);
				 $.ajax({
					
						url:url,
						type:'POST',
						contentType:"application/json",
						data:JSON.stringify(requestData),
						async:false,
						dataType:"json",
						success:function(response){
							console.log(response);
							if (response.success="Y"){
								console.log("response.success Y");
								console.log("response.resultData length:"+response.resultData.length);
								console.log(response.resultData);
								$("#landRightsRegistSelectBox12 option").remove();
								$("#landRightsRegistSelectBox12").append('<option value="">전체</option>');
								for(var i=0;i<response.resultData.length;i++){
									$("#landRightsRegistSelectBox12").append('<option value="'+response.resultData[i].rm_ri+'">'+response.resultData[i].rm_ri+'</option>');
								}
								loadCustomLiLandRegist($("#ri_ul"));
							}
							else {
								console.log("response.success N");
							}
						},
						error:function(jqXHR,textStatus,errorThrown){
							alert("getDongMaster ajax error\n"+textStatus+":"+errorThrown);
						}
					
				});
		}
	

	$(document).on("change","#sigunmaster",function(){
		getDongMaster($("#sigunmaster option:selected").val());
	})
	
	
	
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
						console.log("--------------click---------------");
	                    $('input[type=file]').trigger('click');
	                });
	 
	                $('input[type=file]').on('change', function(e) {
						console.log("--------------change---------------");
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
	                    var uploadURL = "/land/jisang/fileUpload/post"; //Upload URL
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
	 
	 
	 $(document).on("click","input:checkbox[name='landRightsRegistration_attachFile']",function(){
		console.log("check box click");
	 })
	

/************************/
//등록시 지사 세팅
function insertJisaNameSet() {
	
	const jisaNameCheck = $("#loginJisa").val();
	
	if(jisaNameCheck != ''){
		$("#landRightsRegistSelectBox01").val(jisaNameCheck);
	}
	
	//기존 지사 선택시 관로 세팅하는 로직 
	//changPipeName();
	$("#pipe_name_ul li").remove();
	loadCustomLiLandRegist($("#pipe_name_ul"));
}
/************************/