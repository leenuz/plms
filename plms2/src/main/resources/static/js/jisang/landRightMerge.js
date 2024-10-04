// 커스텀 selectbox

// createCustomLiLandMerge();

// function createCustomLiLandMerge() {
//     const contentItems = document.querySelectorAll('.selectContentArea');

//     contentItems.forEach(contentItem => {
//         const notsetAddSelectBox = contentItem.querySelector('select');
//         // select가 없으면 return
//         if (!notsetAddSelectBox) return;

//         const customSelectBox = contentItem.querySelector('.customSelectBox');
//         const customSelectBtns = customSelectBox.querySelector('.customSelectBtns');

//         for (let i = 0; i < notsetAddSelectBox.length; i++) {
//             const optionValue = notsetAddSelectBox.options[i].value;
//             const li = document.createElement('li');
//             const button = document.createElement('button');
//             button.classList.add('moreSelectBtn');
//             button.type = 'button';
//             button.textContent = optionValue;
//             li.appendChild(button);
//             customSelectBtns.appendChild(li);
//         };
//     });
// };
var uploadFiles=[];
const createCustomLiLandMerge = () => {
    const contentItems = document.querySelectorAll('.selectContentArea');

    contentItems.forEach(contentItem => {

        // 추가
        if (contentItem.classList.contains('customLiProcessed')) {
            return;
        }

        const notsetAddSelectBox = contentItem.querySelector('select');
        const customSelectBox = contentItem.querySelector('.customSelectBox');
        const customSelectBtns = customSelectBox.querySelector('.customSelectBtns');
        // select가 없으면 return
        if (!notsetAddSelectBox) return;


        for (let i = 0; i < notsetAddSelectBox.length; i++) {
            const optionValue = notsetAddSelectBox.options[i].value;
            const li = document.createElement('li');
            const button = document.createElement('button');
            button.classList.add('moreSelectBtn');
            button.type = 'button';
            button.textContent = optionValue;
            li.appendChild(button);
            customSelectBtns.appendChild(li);
        };

        // 함수가 한번 적용된 selectContentArea에 class 붙여서 구분한다. 중복실행 되지 않도록
        contentItem.classList.add('customLiProcessed');
    });
}

createCustomLiLandMerge();
// 주석처리
// const customSelectView = document.querySelectorAll('.customSelectView')

// customSelectView.forEach((btn) => {
//     btn.addEventListener('click', function(){
//         btn.classList.toggle('active');

//         if (btn.nextElementSibling) {
//             btn.nextElementSibling.classList.toggle('active');

//         }
//     })
// } )

const landRightMergeSelectEvent01 = () => {

    const landRightMergeContainer01 = document.querySelectorAll('#landRightMerge .contWrap');

    landRightMergeContainer01.forEach((wrap) => {
        wrap.addEventListener('click',function(event){
            if (event.target.classList.contains('customSelectView')) {
                const btn = event.target;

                btn.classList.toggle('active');

                if (btn.nextElementSibling) {
                    btn.nextElementSibling.classList.toggle('active');

                };
            };
        });
    });
};
landRightMergeSelectEvent01();


$(document).on("click","#docFileDelBtn",function(){
	console.log("---------------docFileDelBtn---------------");
	var $currentElement = $(this);
	console.log($(this).parent().parent().html());
	var inputFseq=$(this).parent().parent().find("#fseq").val();
	var inputValue=$(this).parent().parent().find(".notWriteInput").val();
	console.log(inputValue);
	if (inputValue!=null || inputValue!=""){
		var params={"dfile_name":inputValue,"jisang_no":$("#hiddenJisangNo").val(),"fseq":inputFseq,"docNo":"2"}

		console.log(params);


		//임시파일 삭제
		$.ajax({
		          url: "/land/jisang/deleteJisangTmpFile",
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

const landRightMergeSelectEvent02 = () => {

    const landRightMergeContainer02 = document.querySelectorAll('#landRightMerge .contWrap');
    
    landRightMergeContainer02.forEach((wrap) => {
        wrap.addEventListener('click', function(event){
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

landRightMergeSelectEvent02();

// 토지분할 추가 click시 이벤트

// const divisionAddBtn = document.querySelectorAll('#landRightMerge .addBtn');
// const divisionRegistBtn = document.querySelectorAll('#landRightMerge .registBtn');
// const divisionEditBefore = document.querySelectorAll('#landRightMerge .contents .content.btnBox .editBefore');
// const divisionEditAfter = document.querySelectorAll('#landRightMerge .contents .content.btnBox .editAfter');

// divisionAddBtn.forEach((btn) => {
//     btn.addEventListener('click', function(){
//         var thisEditContent = btn.closest('.contents');
//         thisEditContent.classList.add('editing');
//     });
// });

// if (divisionRegistBtn) {
//     divisionRegistBtn.forEach((regiBtn) => {
//         regiBtn.addEventListener('click',function(){
//             var registContents = regiBtn.closest('.contents');
//             registContents.classList.remove('editing');
//         });
//     });
// };


// 대상토지 click 이벤트

const landRightMergeInfoAddBtnEvent = () => {
    const infoContentsDetailBox = document.querySelector('#landRightMerge .targetLand .contWrap');
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
            infoUl.id = 'tojiUl';

            for (let i = 1; i <= 9; i++) {
                // li 만들기
                const infoLi = document.createElement('li');
                infoLi.classList.add('content');

                if (i == 1 || i == 6) {
                    const infoInput = document.createElement('input');
                    infoInput.type = 'text';
//                    infoInput.readOnly = true;
                    infoInput.value  = "신규"
                    infoInput.classList.add('notWriteInput');
                    infoInput.id = "jisang_no";
                    if(i == 1){
                        mergeIndex++;
                        const mergeIndexInput = document.createElement('input');
                        mergeIndexInput.type = "hidden";
                        mergeIndexInput.id = "mergeIndex";
                        mergeIndexInput.value = mergeIndex;

                        const tojiPnuInput = document.createElement('input');
                        tojiPnuInput.type = "hidden";
                        tojiPnuInput.id = "togipnu";
                        tojiPnuInput.value = "";

                        const tojiSidoInput = document.createElement('input');
                        tojiSidoInput.type = "hidden";
                        tojiSidoInput.id = "togisido_nm";
                        tojiSidoInput.value = "";

                        const tojiSggNmInput = document.createElement('input');
                        tojiSggNmInput.type = "hidden";
                        tojiSggNmInput.id = "togisgg_nm";
                        tojiSggNmInput.value = "";

                        const tojiEmdNmInput = document.createElement('input');
                        tojiEmdNmInput.type = "hidden";
                        tojiEmdNmInput.id = "togiemd_nm";
                        tojiEmdNmInput.value = "";

                        const tojiRiNmInput = document.createElement('input');
                        tojiRiNmInput.type = "hidden";
                        tojiRiNmInput.id = "togiri_nm";
                        tojiRiNmInput.value = "";

                        const tojiJibunInput = document.createElement('input');
                        tojiJibunInput.type = "hidden";
                        tojiJibunInput.id = "togijibun";
                        tojiJibunInput.value = "";

                        infoLi.append(mergeIndexInput);
                        infoLi.append(tojiPnuInput);
                        infoLi.append(tojiSidoInput);
                        infoLi.append(tojiSggNmInput);
                        infoLi.append(tojiEmdNmInput);
                        infoLi.append(tojiRiNmInput);
                        infoLi.append(tojiJibunInput);
                    }

                    if(i == 6) infoInput.id = "souja";

                    // li안에 넣기
                    infoLi.append(infoInput);
                } else if (i == 2) {
                    infoLi.classList.add('checkboxWrap');

                    // input checkbox 세팅
                    const checkboxInput = document.createElement('input');
                    checkboxInput.type = 'checkbox';
                    checkboxInput.id = `landRightMerge_checkbox_${Date.now()}_${i}`;
                    checkboxInput.className  = 'single-select-checkbox';
                    checkboxInput.name = 'repLandRight';

                    infoLi.appendChild(checkboxInput);

                    // label 세팅
                    const checkboxLabel = document.createElement('label');
                    checkboxLabel.setAttribute('for', checkboxInput.id);

                    infoLi.appendChild(checkboxLabel);

                } else if (i == 3) {
                    // 3번째 li
                    infoLi.classList.add('addressInfoWidth');
                    infoLi.classList.add('addressInfoBox');
                    // div 만들기
                    const addressDiv = document.createElement('div');
                    addressDiv.classList.add('addressData');
                    // input 만들기
                    const addressInput = document.createElement('input');
                    addressInput.classList.add('notWriteInput');
//                    addressInput.readOnly = true;
                    addressInput.type = 'text';
                    addressInput.id = "merge_address";

                    // div에 input 넣기

                    addressDiv.appendChild(addressInput);
                    infoLi.appendChild(addressDiv);

                    // 검색버튼 만들기

                    const addressBtn = document.createElement('button');
                    addressBtn.classList.add('searchAddressBtn');
                    addressBtn.textContent = '검색';

                    // li안에 넣기
                    infoLi.appendChild(addressBtn);

                } else if (i == 4 || i == 8) {
                    // selectbox 세팅하기
                    infoLi.classList.add('selectContentArea');
                    // select 담을 큰 그릇 만들기
                    const divideHidden = document.createElement('div');
                    divideHidden.classList.add('hiddenSelectBox');
                    // select tag 만들기
                    const divideSelect = document.createElement('select');
                    // id 안겹치게
                    divideSelect.id = `landMergeSelectBox_${Date.now()}_${i}`;
                    divideSelect.name = divideSelect.id;
                    divideSelect.hidden = true;

                    // option 만들기
//                    for (let n = 1; n < 3; n++) {
//                        const divideOption = document.createElement('option');
//                        divideOption.value = `선택${n}`;
//                        divideOption.textContent = `선택${n}`;
//
//                        divideSelect.appendChild(divideOption);
//                    }
                    const divideOption1 = document.createElement('option');
                    const divideOption2 = document.createElement('option');

                    if(i == 4){
                        divideOption1.value = `국유지`;
                        divideOption1.textContent = `국유지`;

                        divideOption2.value = `사유지`;
                        divideOption2.textContent = `사유지`;
                    }
                    else{
                        divideOption1.value = `Y`;
                        divideOption1.textContent = `Y`;

                        divideOption2.value = `N`;
                        divideOption2.textContent = `N`;
                    }

                    divideSelect.appendChild(divideOption1);
                    divideSelect.appendChild(divideOption2);

                    divideHidden.appendChild(divideSelect);
                    infoLi.appendChild(divideHidden);

                    // custom select
                    const customSection = document.createElement('section');
                    customSection.classList.add('customSelectBox');

                    // custom button
                    const customButton = document.createElement('button');
                    customButton.classList.add('customSelectView');
                    if(i == 4) customButton.id = "toji_type";
                    else customButton.id = "account_yn";
//                    if (i == 4) {
                    customButton.textContent = '선택';
//                    }

                    // custom list
                    const customUl = document.createElement('ul');
                    customUl.classList.add('customSelectBtns');

                    customSection.appendChild(customButton);
                    customSection.appendChild(customUl);

                    infoLi.appendChild(customSection);


                } else if (i == 5) {

                    infoLi.classList.add('contentBox');
                    // ul.secondContents 만들기
                    const secondUl = document.createElement('ul');
                    secondUl.classList.add('secondContents');

                    for (let q = 0; q < 5; q++) {
                        // li.secondContent 만들기
                        const secondLi = document.createElement('li')
                        secondLi.classList.add('secondContent');

                        if (q == 3) {
                            secondLi.classList.add('largeSecondTitle');
                        }

                        // input 만들기
                        const secondInput = document.createElement('input');
                        secondInput.type = 'text';
//                        secondInput.readOnly = true;
                        secondInput.classList.add('notWriteInput');
                        if(q == 0){
                            secondInput.id = "jimok_text";
                        }else if(q == 1){
                            secondInput.id = "jijuk_area";
                        }else if(q == 2){
                            secondInput.id = "pyeonib_area";
                        }else if(q == 3){
                            secondInput.id = "set_money";
                        }else if(q == 4){
                            secondInput.id = "jasan_no";
                        }

                        secondLi.appendChild(secondInput);
                        secondUl.appendChild(secondLi);
                    }

                    infoLi.appendChild(secondUl);

                } else if (i == 7) {
                    const viewBtn = document.createElement('button');
                    viewBtn.classList.add('viewDetailButton');
                    viewBtn.textContent = '위치보기';
                    viewBtn.setAttribute('x', 'null');
                    viewBtn.setAttribute('y', 'null');

                    infoLi.appendChild(viewBtn);
                } else if (i == 9) {
                    infoLi.classList.add('titleBtnWrap');
                    infoLi.classList.add('btnBox');

                    for (let w = 0; w<2; w++) {
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

            createCustomLiLandMerge();
        }
        // 삭제 버튼 누를 때
        if (event.target.classList.contains('delBtn')) {
            var thisDelContent = event.target.closest('.contents');

            //체크 박스 태그 가져와서 체크 되어있을 시 체크 해재
            const checkbox = thisDelContent.querySelector('input[name="repLandRight"]');
            if(checkbox && checkbox.checked){
                checkbox.click();
            }

            mergeIndex--;
            thisDelContent.remove();
        }
        // 검색 버튼 누를 때
//        if (event.target.classList.contains('searchAddressBtn')) {
//            var searchBtn = event.target;
//            const popupOpen = document.querySelector("#searchResultsPopup .popupWrap");
//            searchBtn.classList.add("open");
//            popupOpen.classList.add("active");
//        }

    })

}
landRightMergeInfoAddBtnEvent();

/* js추가 검색팝업오픈 */

//const landRightMergeSearchOpenPopUp = () => {
//
//    const landRightMergeSearchBtn = document.querySelectorAll(".searchAddressBtn");
//    const landRightMergeearchResultPop = document.querySelector(".landRightMergeSearchPopWrappers");
//    let htmlFilePath = '/components/popuphtml/searchResultsPopup.html'; // 삽입할 html 파일 경로
//
//    if (landRightMergeSearchBtn) {
//
//        let xhr = new XMLHttpRequest();
//        xhr.open('GET', htmlFilePath, true);
//        xhr.onreadystatechange = function () {
//            if (xhr.readyState == 4 && xhr.status == 200) {
//                landRightMergeearchResultPop.innerHTML = xhr.responseText;
//                runScriptsInElement(landRightMergeearchResultPop); // 삽입된 html내 스크립트 실행 함수 호출
//            }
//        };
//        xhr.send();
//        console.log('landRightMergeSearchResultPop 작동');
//
//        landRightMergeSearchBtn.forEach((searchBtn) => {
//            searchBtn.addEventListener('click', () => {
//                const popupOpen = document.querySelector("#searchResultsPopup .popupWrap");
//                searchBtn.classList.add("open");
//                popupOpen.classList.add("active");
//            })
//        })
//
//        // 삽입된 html내 스크립트 실행 함수
//        const runScriptsInElement = (element) => {
//            const scripts = element.getElementsByTagName('script');
//            for (let i = 0; i < scripts.length; i++) {
//                const script = document.createElement('script');
//                script.textContent = scripts[i].textContent;
//                document.body.appendChild(script).parentNode.removeChild(script);
//            }
//        }
//
//    }
//}

//landRightMergeSearchOpenPopUp();

//대표지상권 체크박스 이벤트 설정
$(document).on('change', 'input[name="repLandRight"]', function(event) {

        if (this.checked) {
            // Select all checkboxes with the class 'single-select-checkbox'
            const checkboxes = document.querySelectorAll('.single-select-checkbox');
            // Uncheck all other checkboxes
            checkboxes.forEach(cb => {
                if (cb !== this) {
                    cb.checked = false;
                }
            });

            const parentRow  = this.closest('ul.contents');

            // 값을 가져와서 id가 "mergeToji_" 로 시작하는 요소들에 값 넣기
            document.getElementById("mergeToji_no").value = parentRow.querySelector('input#jisang_no').value || '';
            document.getElementById("mergeToji_address").value = parentRow.querySelector('input#merge_address').value || '';
            document.getElementById("mergeToji_jimok").value = parentRow.querySelector('input#jimok_text').value || '';
            document.getElementById("mergeToji_jasan_money").value = parentRow.querySelector('input#jasan_no').value || '';
            document.getElementById("mergeToji_souja").value = parentRow.querySelector('input#souja').value || '';

            // 모든 'jijuk_area' ID를 가진 요소를 선택합니다.
            const jijukAreaElements = document.querySelectorAll('input#jijuk_area');
            const jijukAreaValues = Array.from(jijukAreaElements).map(input => input.value || 0);
            // 지적면적 합산 계산
            const totalJijukArea = jijukAreaValues.reduce((acc, value) => acc + (parseFloat(value) || 0), 0);
            document.getElementById('mergeToji_jijuk').value = totalJijukArea;

            // 모든 'pyeonib_area' ID를 가진 요소를 선택합니다.
            const pyeonibAreaElements = document.querySelectorAll('input#pyeonib_area');
            const pyeonibAreaValues = Array.from(pyeonibAreaElements).map(input => input.value || 0);
            // 편입면적 합산 계산
            const totalPyeonibArea = pyeonibAreaValues.reduce((acc, value) => acc + (parseFloat(value) || 0), 0);
            document.getElementById('mergeToji_pyeonib_area').value = totalPyeonibArea;

            // 모든 'set_money' ID를 가진 요소를 선택합니다.
            const setMoneyElements = document.querySelectorAll('input#set_money');
            const setMoneyValues = Array.from(setMoneyElements).map(input => input.value || 0);
            // 편입면적 합산 계산
            const totalSetMoney = setMoneyValues.reduce((acc, value) => acc + (parseFloat(value) || 0), 0);
            document.getElementById('mergeToji_set_money').value = totalSetMoney;

        } else {
              // 체크가 해제되었을 때
              document.getElementById("mergeToji_no").value = '';
              document.getElementById("mergeToji_address").value = '';
              document.getElementById("mergeToji_jimok").value = '';
              document.getElementById("mergeToji_jijuk").value = '';
              document.getElementById("mergeToji_pyeonib_area").value = '';
              document.getElementById("mergeToji_set_money").value = '';
              document.getElementById("mergeToji_jasan_money").value = '';
              document.getElementById("mergeToji_souja").value = '';
        }
});

let mergeIndex = document.getElementById('lastIndex').value;
//   주소 검색
$(document).on("click",".searchAddressBtn",function(){
//console.log($(this).parent().parent().html());
		var idObj=$(this).parent().parent().find(".addressData input");
		var id=$(this).parent().parent().find("#mergeIndex").val();
//		var sido_nm=$(this).parent().parent().find("#togisido_nm").val();
//		var sgg_nm=$(this).parent().parent().find("#togisgg_nm").val();
//		var emd_nm=$(this).parent().parent().find("#togiemd_nm").val();
//		var ri_nm=$(this).parent().parent().find("#togiri_nm").val();
//		var jibun=$(this).parent().parent().find("#togijibun").val();

//		console.log(idObj.val());
//    	console.log(id);

		var addr=idObj.val();
		var datas={"address":addr,"sido_nm":"","sgg_nm":"","emd_nm":"","ri_nm":"","jibun":""}
//        console.log($(this).parent().html());
//        console.log(datas);

        //searchResultPopDiv 화면뿌릴 DIV
        if (addr==null || addr=="" || addr==undefined) {
            alert("주소를 입력해주세요.");
            return;
        }
        $.ajax({
            url: "/land/jisang/getBunhalJIjukSelect",
            type: "POST",
            data: datas,
        })
        .done(function (fragment) {
//         console.log("***fragment***");
//         console.log(fragment);
          $('#searchResultPopDiv').replaceWith(fragment);
          const popupOpen = document.querySelector("#searchResultsPopup .popupWrap");
//                console.log($(popupOpen).html());
               $(popupOpen).addClass("open");
               popupOpen.classList.add("active");
             $('.resultSelectBtn').attr('data-index', id);
            $('.saveBtn').attr('data-index', id);
        });

});

// 주소 선택 클릭
$(document).on("click",".resultSelectBtn",function(){
var id =  $('.resultSelectBtn').data('index');

console.log("***클릭된 id*** : " + id);
console.log($(this).parent().parent().html());
var pnu=$(this).parent().parent().find(".popContent01").html();
	var juso=$(this).parent().parent().find(".popContent02").html();
	var jibun=$(this).parent().parent().find(".popContent03").html();
    var sido_nm=$(this).parent().parent().find(".popContent0201").html();
	var sgg_nm=$(this).parent().parent().find(".popContent0202").html();
	var emd_nm=$(this).parent().parent().find(".popContent0203").html();
	var ri_nm=$(this).parent().parent().find(".popContent0204").html();

	var openerEle=$("#tojiDiv");
//	console.log($(openerEle).html());
	var openerTargetEle=openerEle.find('input[id="mergeIndex"][value="'+id+'"]');
	openerTargetEle.parent().parent().find("#merge_address").val(sido_nm+" "+sgg_nm + " " + emd_nm +" " +ri_nm  + " " + jibun);
	openerTargetEle.parent().parent().find("#togisido_nm").val(sido_nm);
    openerTargetEle.parent().parent().find("#togisgg_nm").val(sgg_nm);
    openerTargetEle.parent().parent().find("#togiemd_nm").val(emd_nm);
    openerTargetEle.parent().parent().find("#togiri_nm").val(ri_nm);
    openerTargetEle.parent().parent().find("#togijibun").val(jibun);
	openerTargetEle.parent().parent().find("#togipnu").val(pnu);
$(".merge_address_" + id).attr("readonly", true);
$(".merge_address_"+id).val(sido_nm+" "+sgg_nm + " " + emd_nm +" " +ri_nm  + " " + jibun);
})

//pnu없이 선택/
$(document).on("click",".saveBtn",function(){
    var id =  $('.saveBtn').data('index');
    $(".merge_address_" + id).val("");
	$(".merge_address_" + id).removeAttr("readonly");

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


/*임시저장 버튼 클릭시*/
$(document).on("click",".temporarySaveBtn",function(){
    var object = {};
    var togiDatas=[];
    var togiUls=$("#tojiDiv #tojiUl");

    //합필 토지 정보
    const mergeToji_no = $("#mergeToji_no").val();
    const mergeToji_address = $("#mergeToji_address").val();
    const mergeToji_jimok = $("#mergeToji_jimok").val();
    const mergeToji_jijuk = $("#mergeToji_jijuk").val();
    const mergeToji_pyeonib_area = $("#mergeToji_pyeonib_area").val();
    const mergeToji_set_money = $("#mergeToji_set_money").val();
    const mergeToji_jasan_money = $("#mergeToji_jasan_money").val();
    const mergeToji_souja = $("#mergeToji_souja").val();
    const mergeToji_accountYn = $("#mergeToji_accountYn").val();
    const merge_reason = $("#merge_reason").val();
    const merge_comment = $("#merge_comment").val();

    // 필수 값 체크
    let errors = [];

    //대표 지상권 체크 확인
    let repLandRightCheck = false;
    const checkboxes = document.querySelectorAll('.single-select-checkbox');
    // Uncheck all other checkboxes
    for (const cb of checkboxes) {
        if (cb.checked) {
            repLandRightCheck = true;
            break;
        }
    }

    if(!repLandRightCheck){
        errors.push('대표지상권 체크는 필수입니다.');
    }

    if (!merge_reason) {
        errors.push('합병사유는 필수입니다.');
    } else if (merge_reason.length < 10) {
        errors.push('합병사유는 최소 10자 이상이어야 합니다.');
    }
    if (!merge_comment) {
        errors.push('검토의견은 필수입니다.');
    } else if (merge_comment.length < 10) {
        errors.push('검토의견은 최소 10자 이상이어야 합니다.');
    }

    // 에러가 있을 경우 처리 (예: 에러 메시지 출력)
    if (errors.length > 0) {
        alert(errors.join('\n')); // 에러 메시지들을 알림창으로 표시
        return null; // 필수 값이 누락된 경우 null 반환
    }

    object.MERGE_INSERT_REASON = merge_reason; // 합필사유
    object.MERGE_INSERT_COMMENT = merge_comment; // 검토의견

    object.MAIN_JISANG_NO = mergeToji_no;
    object.MAIN_TMP_JISANG_NO = "";
    object.MERGE_INSERT_CNT = togiUls.length;
    object.MERGE_STATUS = "임시저장";
    object.GUBUN = "save";

    for(var i=0;i<togiUls.length;i++){
        var togiJisa=$("#jisa").val();
        var togiManageNo=$(togiUls[i]).find("input#jisang_no").val();
        var togiaddress=$(togiUls[i]).find("input#merge_address").val();
        var togiTogiType=$(togiUls[i]).find("button#toji_type").text().trim();
        var togiJimokText=$(togiUls[i]).find("input#jimok_text").val();
        var togiJijukArea=$(togiUls[i]).find("input#jijuk_area").val();
        var togiPyeonibArea=$(togiUls[i]).find("input#pyeonib_area").val();
        var togiSetMoney=$(togiUls[i]).find("input#set_money").val();
        var togiJasanNo=$(togiUls[i]).find("input#jasan_no").val();
        var togiSouja=$(togiUls[i]).find("input#souja").val();
        var togiAccountYn=$(togiUls[i]).find("button#account_yn").text().trim();

        if(togiTogiType == "선택"){
            alert("토지 유형은 필수 입니다.");
            return null;
        }
        if(togiAccountYn == "선택"){
            alert("회계처리필요여부는 필수 입니다.");
            return null;
        }

        var gover_own_yn="";
        if (togiTogiType=="국유지") gover_own_yn='Y';
        else gover_own_yn='N';
        var togiBunhalStatus="임시저장";
        var togiSidoNm=$(togiUls[i]).find("#togisido_nm").val();
        var togiSggNm=$(togiUls[i]).find("#togisgg_nm").val();
        var togiEmdNm=$(togiUls[i]).find("#togiemd_nm").val();
        var togiRiNm=$(togiUls[i]).find("#togiri_nm").val();
        var togiJibun=$(togiUls[i]).find("#togijibun").val();
        var togiPnu=$(togiUls[i]).find("#togipnu").val();

        //console.log("togiManageNo:"+togiManageNo);
        var togiObj={
            "togiSidoNm":ljsIsNull(togiSidoNm)?'':togiSidoNm
            ,"togiSggNm":togiSggNm
            ,"togiEmdNm":togiEmdNm
            ,"togiRiNm":togiRiNm
            ,"togiJibun":togiJibun
            ,"togiPnu":togiPnu
            ,"jm_jisang_no":togiManageNo
            ,"togiaddress":togiaddress.trim()
            ,"togiTogiType":togiTogiType
            ,"jm_jimok_text":togiJimokText
            ,"jm_jijuk_area":ljsIsNull(togiJijukArea)?'':togiJijukArea
            ,"jm_pyeonib_area":togiPyeonibArea
            ,"jm_set_money":togiSetMoney
            ,"jm_jasan_no":togiJasanNo
            ,"togiAccountYn":togiAccountYn
            ,"togiBunhalStatus":togiBunhalStatus
            ,"togiGoverOwnYn":gover_own_yn
            ,"togiJisa":togiJisa
        }
        console.log(togiObj);
        togiDatas.push(togiObj);
    }
     console.log("----------togiDatas-------------");
     console.log(togiDatas);

     object.mergeList=togiDatas;
console.log(object);
     url="/land/jisang/saveJisangMerge";
     $.ajax({
        url:url,
        type:'POST',
        contentType:"application/json",
        data:JSON.stringify(object),

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
            alert("finalBtn ajax error\n"+textStatus+":"+errorThrown);
            return false;
        }

     });

});

$(document).on("click",".viewDetailButton",function(){
	const x = $(this).attr('x')
	const y = $(this).attr('y')
	moveToCityHall(x,y);
})


$(document).ready(function(){
    //체크 박스 중 대표 지상권 번호 체크 하기
    let repJisangNo = document.getElementById('repJisangNo').value;
    // value 속성이 repJisangNo과 같은 <input> 태그 찾기
    const targetInputs = document.querySelectorAll(`input[value="${repJisangNo}"]`);

    if(targetInputs.length > 1){
        const targetInput = targetInputs[1];
        if (targetInput) {
            // 해당 <input>을 감싸는 <li> 태그 찾기
            const parentUl = targetInput.closest('ul');

            if (parentUl) {
                // <li> 내에서 체크박스 찾기
                const checkbox = parentUl.querySelector('input[type="checkbox"]');

                if (checkbox) {
                    // 체크박스를 클릭
                    checkbox.click();
                }
            }
        }
    }




    $('input[name=landRightMerge_myPcFiles01]').on('change', function(e) {
	        var files = e.originalEvent.target.files;
	        handleFileUpload1(files,this,"01");
	});
	$('input[name=landRightMerge_myPcFiles02]').on('change', function(e) {
	       var files = e.originalEvent.target.files;
	       handleFileUpload1(files,this,"02");
	});
	$('input[name=landRightMerge_myPcFiles03]').on('change', function(e) {
		       var files = e.originalEvent.target.files;
		       handleFileUpload1(files,this,"03");

	});
	$('input[name=landRightMerge_myPcFiles04]').on('change', function(e) {
		       var files = e.originalEvent.target.files;
		       handleFileUpload1(files,this,"04");
	});
	$('input[name=landRightMerge_myPcFiles05]').on('change', function(e) {
		       var files = e.originalEvent.target.files;
		       handleFileUpload1(files,this,"05");
	});
	$('input[name=landRightMerge_myPcFiles06]').on('change', function(e) {
		       var files = e.originalEvent.target.files;
		       handleFileUpload1(files,this,"06");
	});
	$('input[name=landRightMerge_myPcFiles07]').on('change', function(e) {
		       var files = e.originalEvent.target.files;
		       handleFileUpload1(files,this,"07");
	});
	$('input[name=landRightMerge_myPcFiles08]').on('change', function(e) {
		       var files = e.originalEvent.target.files;
		       handleFileUpload1(files,this,"08");
	});

    function handleFileUpload1(files,obj,idx) {
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

    function sendFileToServer1(formData,status,no) {
        var idx=$("#hiddenJisangNo").val();
        console.log($("#hiddenJisangNo").val());
        var uploadURL = "/land/jisang/fileUpload/reqDoc?idx="+idx; //Upload URL
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