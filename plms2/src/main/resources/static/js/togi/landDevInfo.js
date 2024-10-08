
$(document).on("click",".editBtn",function() {
  const urlParams = new URL(location.href).searchParams;
  const idx = urlParams.get('idx');
  url = "/togi/landEdit?idx=" +idx;
     window.location = url;
});


$(document).on("click","#moveMap",function(){
	//openMapWindow();
//	mapWindow = window.open('', 'mapWindow', 'width=2000,height=1000');
	const x = $(this).attr('x')
	const y = $(this).attr('y')
	moveToCityHall(x,y);
})


/* 전자결재 문서 열람 추가 */
$(document).on("click",".approvalBtn",function(){
						  const popupOpen = document.querySelector("#searchResultsPopup .popupWrap");
						  	   $(popupOpen).addClass("open");
						  	   popupOpen.classList.add("active");

//                                $('.resultSelectBtn').attr('data-index', clickedButtonId);
//                           	    $('.saveBtn').attr('data-index', clickedButtonId);

	});

$(document).on("click",".topCloseBtn",function(){

	var targetDiv=$("#searchResultPopDiv").parent().find("#searchResultPopup").find(".popupWrap");
	$(".popupWrap").removeClass("active");
});

$(document).on("click","#popupCloseBtn",function(){

	var targetDiv=$("#searchResultPopDiv").parent().find("#searchResultPopup").find(".popupWrap");
	$(".popupWrap").removeClass("active");
});

  const documentView = document.querySelector('#landDevInfo .eDocView .contWrap');
  const documentViewBox = documentView.querySelector('.contentsBox');

/* ul 태그 개수 찾기 */
const getUlCountInContentsBox = (contentsBoxElement) => {
    // contentsBoxElement 내부에서 'contents' 클래스를 가진 모든 ul 태그를 찾음
    const ulElements = contentsBoxElement.querySelectorAll('ul.contents');
    // ul 태그들의 개수를 반환
    return ulElements.length;
}

//전자결재문서 추가 버튼
$(document).on("click","#saveBtn",function(){
const contentsBoxElement = document.querySelector('.contentsBox');
const ulCount = getUlCountInContentsBox(contentsBoxElement);

      const infoUl = document.createElement('ul');
              infoUl.classList.add('contents');
                infoUl.id='fileListUl';

              for (let i = 1; i <= 4; i++) {
                             // li 만들기
                             const infoLi = document.createElement('li');
                             infoLi.classList.add('content');

                             if (i == 1) {
                                 infoLi.classList.add('checkboxWrap');
                                 infoLi.classList.add('smallWidth');

                                 // input checkbox 세팅
                                 const checkboxInput = document.createElement('input');
                                 checkboxInput.type = 'checkbox';
                                 checkboxInput.name = 'landDevInfo_eDocFile';
                                 infoLi.appendChild(checkboxInput);
    		                     checkboxInput.id ='landDevInfo_eDocView_Checkbox_' + ulCount;

                                 // label 세팅
                                 const checkboxLabel = document.createElement('label');
                                 checkboxLabel.setAttribute('for', checkboxInput.id);

                                 infoLi.appendChild(checkboxLabel);

                             } else {
                                const infoInput = document.createElement('input');
                                const infoInput2 = document.createElement('input');
    		       infoInput.classList.add('notWriteInput');
    			infoInput.readOnly = true;
                                 infoInput.type = 'text';

                                 if ( i == 2){
                                     infoLi.classList.add('middleWidth');
                                     infoInput.id='docNum_' + ulCount ;
                                     infoInput.name='docNum_' + ulCount ;
                                     infoInput.placeholder = document.querySelector('input[name="documentNo"]').value;
                                 }else if(i==3){
                                   infoInput.id='docTitle_' + ulCount ;
                                  infoInput.name='docTitle_' + ulCount ;
                                   infoInput.placeholder = document.querySelector('input[name="documentTitle"]').value;
                                 }else if(i==4){
                                   infoInput.id='docDate_' + ulCount ;
                                  infoInput.name='docDate_' + ulCount ;
                                   infoInput.placeholder = document.querySelector('input[name="documentdate"]').value;
                                 infoInput2.type="hidden"
                                  infoInput2.id='docURL_' + ulCount ;
                                   infoInput2.name='docURL_' + ulCount ;
                                    infoInput2.placeholder = document.querySelector('input[name="documentURL"]').value;
                                    infoLi.append(infoInput2);
                                 }

                                 // li안에 넣기
                                 infoLi.append(infoInput);


                             }

                  infoUl.appendChild(infoLi);
                  documentViewBox.appendChild(infoUl);

             }
               $("input[name='documentNo']").val('');
               $("input[name='documentTitle']").val('');
               $("input[name='documentURL']").val('');
               $("input[name='documentdate']").val('2024-01-01');
             $(".popupWrap").removeClass("active");

});

//전자결재문서 선택파일 삭제
$(document).on("click",".delBtn",function(){
	const clickedFiles = document.querySelectorAll('input[name="landDevInfo_eDocFile"]:checked');

	for(var i=0;i<clickedFiles.length;i++){
		var delEle=$(clickedFiles[i]).closest("#fileListUl");
		$(delEle).remove();

	}

})


//완료처리버튼 클릭
$(document).on("click",".completeBtn",function(){

var formSerializeArray = $('#saveForm').serializeArray();

       len = formSerializeArray.length;
       var dataObj = {};
       for (i=0; i<len; i++) {
        dataObj[formSerializeArray[i].name] = formSerializeArray[i].value;
       }

       var fileDatas=[];
       var fileUls=$("#fileList .contents");
       	   	for(var i=0;i<fileUls.length;i++){
       			var docNum=$(fileUls[i]).find("input[name='docNum_"+i+"']").attr("placeholder");
       			var docTitle=$(fileUls[i]).find("input[name='docTitle_"+i+"']").attr("placeholder");
       			var docDate=$(fileUls[i]).find("input[name='docDate_"+i+"']").attr("placeholder");
       			var docURL=$(fileUls[i]).find("input[name='docURL_"+i+"']").attr("placeholder");

       	   		var fileObj={
       				"docNum":ljsIsNull(docNum)?'':docNum
       				,"docTitle":ljsIsNull(docTitle)?'':docTitle
       				,"docDate":ljsIsNull(docDate)?'':docDate
       				,"docURL":ljsIsNull(docURL)?'':docURL
       	   		}
       	   		fileDatas.push(fileObj);
       	   	}
       	   	dataObj.fileDatas=fileDatas;

		dataObj.gubun="modify";
//		dataObj.dosiNo=""; //수정일때는 들어간다
       console.log("**dataObj**");
       console.log(dataObj);

});