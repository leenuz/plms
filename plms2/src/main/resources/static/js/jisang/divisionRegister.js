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
//$(document).on('click', '.moreSelectBtn', function() {
//    var moreSelectBtnText = $(this).text();
//
//    const parentMoreSelectBtn = $(this).closest('.customSelectBtns');
//    const EditCustomViewBtn = parentMoreSelectBtn.prev('.customSelectView');
//
//    // EditCustomViewBtn의 모든 자식을 제거
//    EditCustomViewBtn.empty();
//
//    // 새로운 텍스트 노드를 추가합니다.
//    EditCustomViewBtn.text(moreSelectBtnText);
//
//    EditCustomViewBtn.removeClass('active');
//    parentMoreSelectBtn.removeClass('active');
//
//    // 선택한 걸 select의 value값으로 변경하기
//    const nearByContent = $(this).closest('.selectContentArea');
//    const nearBySelectBox = nearByContent.find('select');
//    nearBySelectBox.val(moreSelectBtnText);
////    console.log(`Selected value: ${nearBySelectBox.val()}`);
//});

/*임시저장 버튼 클릭시*/
$(document).on("click","#temporarySaveBtn",function(){

	   var formSerializeArray = $('#searchForm').serializeArray();
	   var tojiBunhalArray = $('#tojiBunhalForm').serializeArray();
	   var submitArray = $('#submitForm').serializeArray();

	   var object = {};
	   for (var i = 0; i < formSerializeArray.length; i++){
	       object[formSerializeArray[i]['name']] = formSerializeArray[i]['value'];
	   }

  for (var i = 0; i < submitArray.length; i++){
	       object[submitArray[i]['name']] = submitArray[i]['value'];
	   }
//	 var groupedData = {};
     var allCheckboxes = {};

     // 모든 체크박스를 추적하기 위한 객체를 생성합니다
     $('#tojiBunhalForm input[type="checkbox"]').each(function() {
         var name = $(this).attr('name');
         var value = $(this).is(':checked') ? $(this).val() : ''; // 체크된 경우 값, 그렇지 않으면 빈 문자열
         var match = name.match(/_(\d+)$/); // 끝자리 숫자 추출
         if (match) {
             var index = match[1];
             if (!allCheckboxes[index]) {
                 allCheckboxes[index] = {};
             }
             allCheckboxes[index][name] = value; // 체크박스의 데이터를 추가
         }
     });

     // 폼 데이터를 순회하며 그룹화
     tojiBunhalArray.forEach(function(item) {
         var match = item.name.match(/_(\d+)$/); // 끝자리 숫자 추출
         if (match) {
             var index = match[1];
             if (!object[index]) {
                 object[index] = {}; // 해당 숫자의 그룹이 없으면 초기화
             }
             object[index][item.name] = item.value; // 그룹에 데이터 추가
         }
     });

     // 체크박스의 값을 그룹화된 데이터에 추가
     for (var index in allCheckboxes) {
         if (!object[index]) {
             object[index] = {}; // 해당 인덱스가 없으면 초기화
         }
         // 모든 체크박스 데이터를 그룹화된 데이터에 병합
         for (var name in allCheckboxes[index]) {
             object[index][name] = allCheckboxes[index][name];
         }
     }

//     // 필드 이름 목록을 정의
//     var fieldNames = ['bunhalAddres','divisionRegistSelectBox02','jimok', 'jijuk', 'pyenip','pipe','terminate','jaryo','divisionRegistSelectBox03']; // 예시 필드명
//     Object.keys(object).forEach(function(index) {
//         fieldNames.forEach(function(name) {
//             if (!object[index][name]) {
//                 object[index][name] = ''; // 누락된 필드를 빈 문자열로 설정
//             }
//         });
//     });

 console.log(object);
//	   var json = JSON.stringify(formSerializeArray);

 // 필수 값 체크
    let errors = [];
    var jaryoChecked = 0 ;
    var errorCount = 0;

     if (!object.divisionRegistSelectBox01) {
//            errors.push('회계처리 필요 여부는 필수 입력 항목입니다.');
            errorCount++;
        }

   Object.keys(object).forEach(function(j) {

    if (Number.isInteger(Number(j))) {
       if (!object[j]['divisionRegistSelectBox02_' + j] ||
           !object[j]['jimok_' + j] ||
           !object[j]['jijuk_' + j] ||
           !object[j]['pyenip_' + j]||
           !object[j]['divisionRegistSelectBox03_' + j] )  {
           errorCount++;
       }

       // 'jaryo_' 필드가 "on"으로 체크되어 있는지 확인
       if (object[j]['jaryo_' + j] === "on") {
           jaryoChecked++;
       }
       }
   });

         if (!object.bunhal_reason) {
           errorCount++;
       } else if (object.bunhal_reason.length < 10) {
           errors.push('분할사유는 최소 10자 이상이어야 합니다.');
       }
       if (!object.bunhal_comment) {
            errorCount++;
       } else if (object.bunhal_comment.length < 10) {
           errors.push('검토의견은 최소 10자 이상이어야 합니다.');
       }

        if(errorCount>0 ){
        errors.push('* 표시는 필수 입력값입니다.');
        }

        if(jaryoChecked == 0 ){
errors.push('자료 승계는 최소 1개 이상 선택해야 합니다.');
        }

    if (errors.length > 0) {
        alert(errors.join('\n')); // 에러 메시지들을 알림창으로 표시
        return null; // 필수 값이 누락된 경우 null 반환
    }




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

//    $('#choiceBtn').attr('data-index', buttonId);
				   //searchResultPopDiv 화면뿌릴 DIV
				   	   $.ajax({
				   	   	  url: "/jisang/getJibunAddress",
				   	   	  type: "POST",
				   	   	  data: formSerializeArray,
				   	   })
				   	   .done(function (fragment) {
//				  var buttonIdx = fragment.find('button#choiceBtn');
//				  buttonIdx.attr('data-index', buttonId);
 console.log("***fragment***");
 console.log(fragment);
				   	      $('#searchResultPopDiv').replaceWith(fragment);
						  const popupOpen = document.querySelector("#searchResultsPopup .popupWrap");
                                console.log($(popupOpen).html());
						  	   $(popupOpen).addClass("open");
						  	   popupOpen.classList.add("active");
                         $('.resultSelectBtn').attr('data-index', buttonId);
                           $('.saveBtn').attr('data-index', buttonId);
				   	   	});

});

// 주소 선택 클릭
$(document).on("click",".resultSelectBtn",function(){
var id =  $('.resultSelectBtn').data('index');

//console.log("***클릭된 id*** : " + id);
console.log($(this).parent().parent().html());
	var juso=$(this).parent().parent().find(".popContent02").html();
	var jibun=$(this).parent().parent().find(".popContent03").html();
    var sido_nm=$(this).parent().parent().find(".popContent0201").html();
	var sgg_nm=$(this).parent().parent().find(".popContent0202").html();
	var emd_nm=$(this).parent().parent().find(".popContent0203").html();
	var ri_nm=$(this).parent().parent().find(".popContent0204").html();

$(".bunhalAddres_" + id).attr("readonly", true);
$(".bunhalAddres_"+id).val(sido_nm+" "+sgg_nm + " " + emd_nm +" " +ri_nm  + " " + jibun);
//		$("#sido_nm").val(sido_nm);
//        $("#sgg_nm").val(sgg_nm);
//        $("#emd_nm").val(emd_nm);
//        $("#ri_nm").val(ri_nm);
//        $("#mpnu").val(pnu);
//        $("#mjibun").val(jibun);
})

//pnu없이 선택/
$(document).on("click",".saveBtn",function(){
    var id =  $('.saveBtn').data('index');
    $(".bunhalAddres_" + id).val("");
	$(".bunhalAddres_" + id).removeAttr("readonly");

	var targetDiv=$("#searchResultPopDiv").parent().find("#searchResultPopup").find(".popupWrap");
	$(".popupWrap").removeClass("active");
    console.log(id);

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
		    address.attr({'class':'notWriteInput bunhalAddres_'+index,
		    'name':'bunhalAddres_'+index});
        var jusoButton = addDiv.find('button.searchAddressBtn_');
            jusoButton.attr({'class': 'searchAddressBtn searchAddressBtn_' + index,
            'id': 'searchAddressBtn_' + index
            });
        var toji = addDiv.find('select.divisionRegistSelectBox02_');
                toji.attr({'id':'divisionRegistSelectBox02_'+index,
                "name":'divisionRegistSelectBox02_'+index,
                "class":'divisionRegistSelectBox02_'+index
            });
        var jimok = addDiv.find('.jimok_');
            jimok.attr({'class':'jimok_'+index,
             "name":'jimok_'+index});
         var jijuk = addDiv.find('input.jijuk_');
             jijuk.attr({'class':'jijuk_'+index,
             'name': 'jijuk_'+index});
         var pyenip = addDiv.find('input.pyenip_');
             pyenip.attr({'class':'pyenip_'+index,
             'name' : 'pyenip_'+index
             });
        var jasan= addDiv.find('input.jasan_');
            jasan.attr({'class':'jasan_'+index,
            'name' : 'jasan_'+index
            });
         var pipe = addDiv.find('input.pipe_');
             pipe.attr({'class':'pipe_'+index,
             'name' : 'pipe_'+index,
             'id': 'pipe_'+index
             });
          var label1 = pipe.closest('li').find('label').first();
              label1.attr({'for': 'pipe_'+index,
              'name' : 'pipe_'+index
              });
        var terminate = addDiv.find('input.terminate_');
             terminate.attr({'class':'terminate_'+index,
             'id': 'terminate_'+index,
             'name' : 'terminate_'+index
             });
      var label2 = terminate.closest('li').find('label').first();
              label2.attr({'for': 'terminate_'+index,
              'name' : 'terminate_'+index
              });
     var jaryo = addDiv.find('input.jaryo_');
             jaryo.attr({'class':'jaryo_'+index,
             'name' : 'jaryo_'+index,
             'id': 'jaryo_'+index
             });
      var label3 = jaryo.closest('li').find('label').first();
              label3.attr({'for': 'jaryo_'+index,
              'name' : 'jaryo_'+index
              });
  var account = addDiv.find('select#divisionRegistSelectBox03');
            account.attr({'id':'divisionRegistSelectBox03_'+index,
            'name' : 'divisionRegistSelectBox03_'+index,
             "class":'divisionRegistSelectBox03_'+index
            });


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