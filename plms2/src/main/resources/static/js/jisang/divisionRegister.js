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
    console.log(moreSelectBtnText);

    const parentMoreSelectBtn = $(this).closest('.customSelectBtns');
    const EditCustomViewBtn = parentMoreSelectBtn.prev('.customSelectView');

    // EditCustomViewBtn의 모든 자식을 제거
    EditCustomViewBtn.empty();

    // 새로운 텍스트 노드를 추가합니다.
    EditCustomViewBtn.text(moreSelectBtnText);

    EditCustomViewBtn.removeClass('active');
    parentMoreSelectBtn.removeClass('active');

    // 선택한 걸 select의 value값으로 변경하기
    const nearByContent = $(this).closest('.selectContentArea');
    const nearBySelectBox = nearByContent.find('select');
    nearBySelectBox.val(moreSelectBtnText);
    console.log(`Selected value: ${nearBySelectBox.val()}`);
});

/*임시저장 버튼 클릭시*/
$(document).on("click","#temporarySaveBtn",function(){

	   var formSerializeArray = $('#searchForm').serializeArray();
	   var object = {};
	   for (var i = 0; i < formSerializeArray.length; i++){
	       object[formSerializeArray[i]['name']] = formSerializeArray[i]['value'];
	   }
 console.log(object);
//	   var json = JSON.stringify(formSerializeArray);
 // 필수 값 체크
    let errors = [];
    var pipeLineChecked = 0 ;
    var errorCount = 0;

     if (!object.divisionRegistSelectBox01) {
//            errors.push('회계처리 필요 여부는 필수 입력 항목입니다.');
            errorCount++;
        }
//   for (var j = 0; j < valStat.length; j++){
//
//        if (!object['divisionRegistSelectBox02_'+j]) {
//    //        errors.push('토지유형은 필수 입력 항목입니다.');
//    errorCount++;
//        }
//
//    if(object['divisionRegister_pipeline_interference_01_'+j] == true){
//    pipeLineChecked++;
//
//    }
//
//          if (!object['jimok_text_' + j]) {
//    //            errors.push('지목은 필수 입력 항목입니다.');
//                errorCount++;
//            }
//
//            // 'cancel_bosang_money' 필드 검사
//            if (!object['jijuk_area_' + j]) {
//    //            errors.push('지적면적은 필수 입력 항목입니다.');
//    errorCount++;
//            }
//
//
//            // 'cancel_reason' 필드 검사
//            if (!object['pyeonib_area_' + j]) {
//    //            errors.push('편입면적은 필수 입력 항목입니다.');
//    errorCount++;
//            }
//
//       }
         if (!object.bunhal_reason) {
//           errors.push('분할사유는 필수 입력 항목입니다.');
           errorCount++;
       } else if (object.bunhal_reason.length < 10) {

           errors.push('분할사유는 최소 10자 이상이어야 합니다.');
       }
       if (!object.bunhal_comment) {
//           errors.push('검토의견은 필수입니다.');
errorCount++;
       } else if (object.bunhal_comment.length < 10) {

           errors.push('검토의견은 최소 10자 이상이어야 합니다.');
       }

        if(errorCount>0 ){
        errors.push('* 표시는 필수 입력값입니다.');
        }
        console.log(pipeLineChecked);
//        if(pipeLineChecked == 0 ){
//errors.push('자료 승계는 최소 1개 이상 선택해야 합니다.');
//        }
    // 에러가 있을 경우 처리 (예: 에러 메시지 출력)
    if (errors.length > 0) {
        alert(errors.join('\n')); // 에러 메시지들을 알림창으로 표시
        return null; // 필수 값이 누락된 경우 null 반환
    }



//	   loadDataTable(object);

     })


//   주소 검색
$(document).on("click",".searchAddressBtn",function(){

var formSerializeArray = $('#searchForm').serializeArray();
//
  var buttonId = $(this).attr("id").split("_")[1];
//    formSerializeArray.push({
//        name: 'selectedButton',
//        value: buttonId
//    });
    // 가져온 id 값을 콘솔에 출력
//
//    const data_index = $(this).attr("data-index");
    $('#choiceBtn').attr('data-index', buttonId);
				   //searchResultPopDiv 화면뿌릴 DIV
				   	   $.ajax({
				   	   	  url: "/jisang/getJibunAddress",
				   	   	  type: "POST",
				   	   	  data: formSerializeArray,
				   	   })
				   	   .done(function (fragment) {
				   	      $('#searchResultPopDiv').replaceWith(fragment);
						  const popupOpen = document.querySelector("#searchResultsPopup .popupWrap");
                                console.log($(popupOpen).html());
						  	   $(popupOpen).addClass("open");
						  	   popupOpen.classList.add("active");

				   	   	});

});

// 주소 선택 클릭
$(document).on("click",".resultSelectBtn",function(){
console.log("***주소 클릭***")
console.log($(this).parent().parent().html());
	var juso=$(this).parent().parent().find(".popContent02").html();
	var jibun=$(this).parent().parent().find(".popContent03").html();
    var sido_nm=$(this).parent().parent().find(".popContent0201").html();
	var sgg_nm=$(this).parent().parent().find(".popContent0202").html();
	var emd_nm=$(this).parent().parent().find(".popContent0203").html();
	var ri_nm=$(this).parent().parent().find(".popContent0204").html();
		$("#bunhalAddres").val(juso + " " + jibun);
		$("#sido_nm").val(sido_nm);
        $("#sgg_nm").val(sgg_nm);
        $("#emd_nm").val(emd_nm);
        $("#ri_nm").val(ri_nm);
        $("#mpnu").val(pnu);
        $("#mjibun").val(jibun);
})

$(document).on("click",".saveBtn",function(){

	var targetDiv=$("#searchResultPopDiv").parent().find("#searchResultPopup").find(".popupWrap");
	$(".popupWrap").removeClass("active");
//	$(".popupWrap").toggleClass("active");
});

$(document).on("click","#popupCloseBtn",function(){

	var targetDiv=$("#searchResultPopDiv").parent().find("#searchResultPopup").find(".popupWrap");
	$(".popupWrap").removeClass("active");
//	$(".popupWrap").toggleClass("active");
});

$(document).on("click",".topCloseBtn",function(){

	var targetDiv=$("#searchResultPopDiv").parent().find("#searchResultPopup").find(".popupWrap");
	$(".popupWrap").removeClass("active");
//	$(".popupWrap").toggleClass("active");
});
var index = 1;
$(document).on("click",".addBtn",function(){


		var thisUl=$(this).parent().parent().parent().parent();
		var addUl=$("#tojiHiddenUl").html();
        var findButton=$()
//		var input=$(thisUl).find("input");

		var addDiv = $('<ul class="contents" id="tojiUl">'+addUl+'</ul>');

		var address = addDiv.find('input.bunhalAddres_');
		    address.attr('class','notWriteInput bunhalAddres_'+index);
        var jusoButton = addDiv.find('button.searchAddressBtn_');
            jusoButton.attr('class', 'searchAddressBtn searchAddressBtn_' + index);
              jusoButton.attr('id', 'searchAddressBtn_' + index);
        var toji = addDiv.find('button.tojiSelect_');
            toji.attr('class','customSelectView tojiSelect_'+index);
        var jimok = addDiv.find('.jimok_');
            jimok.attr('class','jimok_'+index);
         var jijuk = addDiv.find('input.jijuk_');
             jijuk.attr('class','jijuk_'+index);
         var pyenip = addDiv.find('input.pyenip_');
             pyenip.attr('class','pyenip_'+index);
        var jasan= addDiv.find('input.jasan_');
            jasan.attr('class','jasan_'+index);
         var pipe = addDiv.find('input.pipe_');
             pipe.attr('class','pipe_'+index);
             pipe.attr('id', 'pipe_'+index); // 고유한 ID 설정
              var label = pipe.closest('li').find('label').first();
              label.attr('for', 'pipe_'+index);
 var terminate = addDiv.find('input.terminate_');
             terminate.attr('class','terminate_'+index);
             terminate.attr('id', 'terminate_'+index); // 고유한 ID 설정
              var label = terminate.closest('li').find('label').first();
              label.attr('for', 'terminate_'+index);
 var jaryo = addDiv.find('input.jaryo_');
             jaryo.attr('class','jaryo_'+index);
             jaryo.attr('id', 'jaryo_'+index); // 고유한 ID 설정
              var label = jaryo.closest('li').find('label').first();
              label.attr('for', 'jaryo_'+index);
  var account = addDiv.find('button.accountYN_');
            account.attr('class','customSelectView accountYN_'+index);


            index++; // i 값을 증가시켜 다음 버튼에 적용

         $("#tojiDiv").append(addDiv);
//        $("#tojiDiv").html(addDiv);
});


$(document).on("click",".delBtn",function(){
	console.log("------------deleteSoujaBtn click---------");
	var thisUl=$(this).parent().parent().parent().parent();
	var thisContents=$(this).parent().parent().parent().parent().parent().find(".contents");
	console.log($(thisContents).html());
	console.log($(thisContents).length);
	if ($(thisContents).length<=2) return;
	$(thisUl).remove();

});