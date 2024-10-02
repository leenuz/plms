
/* ul 태그 개수 찾기 */
const getUlCountInContentsBox = (contentsBoxElement) => {
    // contentsBoxElement 내부에서 'contents' 클래스를 가진 모든 ul 태그를 찾음
    const ulElements = contentsBoxElement.querySelectorAll('ul.contents');
    // ul 태그들의 개수를 반환
    return ulElements.length;
}

// 대상토지 click 이벤트
const usePermitEditInfoAddBtnEvent01 = () => {

    const infoContentsDetailBox = document.querySelector('#usePermitEdit .targetLand .contWrap');
    const infoContentsBox = infoContentsDetailBox.querySelector('.contentsBox');
    const infoAddBtn = infoContentsDetailBox.querySelectorAll('.addBtn');
    const infoContents = infoContentsDetailBox.querySelectorAll('.contents');
    const infoTitles = infoContentsDetailBox.querySelector('.titles');

    infoContentsBox.addEventListener('click', function (event) {
         const contentsBoxElement = document.querySelector('#togiDiv .contentsBox');
         const index = getUlCountInContentsBox(contentsBoxElement);

        // 버튼 클릭시 추가되게
        if (event.target.classList.contains('addBtn')) {
            // ul 만들기
            const infoUl = document.createElement('ul');
            infoUl.classList.add('contents');

            for (let i = 1; i <= 9; i++) {
                // li 만들기
                const infoLi = document.createElement('li');
                infoLi.classList.add('content');

                if(i ==1){
                   infoLi.classList.add('content');
                    infoLi.classList.add('addressInfoWidth');
                     infoLi.classList.add('addressInfoBox');
                   // div 만들기
                   const addressDiv = document.createElement('div');
                   addressDiv.classList.add('addressData');
                   // input 만들기
                   const addressInput = document.createElement('input');
                   addressInput.id = 'address_'+index;
                   addressInput.name = 'address_'+index;
                   addressInput.type = 'text';

                   // div에 input 넣기

                   addressDiv.appendChild(addressInput);
                   infoLi.appendChild(addressDiv);

                   // 검색버튼 만들기

                   const addressBtn = document.createElement('button');
                   addressBtn.classList.add('searchAddressBtn');

                   addressBtn.textContent = '검색';
                    addressBtn.id= index;
                   // li안에 넣기
                   infoLi.appendChild(addressBtn);

                }else if (2<= i && i <= 6) {
                    // input 만들기

                     const secondUl = document.createElement('ul');
                      const secondContent = document.createElement('li');
                      const infoInput = document.createElement('input');

                     secondUl.classList.add('secondContents');
                     infoLi.classList.add('contentBox');
                     secondContent.classList.add('secondContent');
                    infoInput.type = 'text';


                    if(i==2){
                        infoInput.name="jimok_" + index;
                       infoInput.readOnly = true;
                        infoInput.classList.add('notWriteInput');
                    }else if(i==3){
                        infoInput.name="fullArea_" + index;
                       infoInput.readOnly = true;
                        infoInput.classList.add('notWriteInput');
                    }else if(i==4){
                        infoInput.name="serArea_" + index;
                       infoInput.readOnly = true;
                        infoInput.classList.add('notWriteInput');
                    }else if(i==5){
                        secondContent.classList.add('largeSecondTitle');
                        infoInput.name="setMoney_" + index;

                    }else if(i==6){
                        infoInput.name="jasan_" + index;
                       infoInput.readOnly = true;
                        infoInput.classList.add('notWriteInput');
                    }

                    secondContent.appendChild(infoInput);
                    secondUl.appendChild(secondContent);
                     infoLi.appendChild(secondUl);

                }else if(7<= i && i<=8) {
                    infoLi.classList.add('content');
                    const infoInput = document.createElement('input');
                    infoInput.type = 'text';
                    infoLi.appendChild(infoInput);
                    infoInput.readOnly = true;
                    infoInput.classList.add('notWriteInput');
                    if(i==7){
                        infoInput.name="soyuja_" + index;
                    }else{
                        infoInput.name="pmtUser_" + index;
                    }
                }else if (i == 9) {
                    infoLi.classList.add('titleBtnWrap');
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
usePermitEditInfoAddBtnEvent01();



/* 주소 검색 */
$(document).on("click",".searchAddressBtn",function(){
                          const clickedButtonId = $(this).attr('id');
//                          var address = $('#address_'+clickedButtonId).val().trim();

//   $.ajax({
//				   	   	  url: "/togi/getTogiJIjukSelect",
//				   	   	  type: "POST",
//				   	   	  data: formSerializeArray,
//				   	   })
//				   	   .done(function (fragment) {
//				   	      $('#searchResultPopDiv').replaceWith(fragment);
						  const popupOpen = document.querySelector("#searchResultsPopup .popupWrap");
						  	   $(popupOpen).addClass("open");
						  	   popupOpen.classList.add("active");
                                $('.resultSelectBtn').attr('data-index', clickedButtonId);
                           	    $('.saveBtn').attr('data-index', clickedButtonId);

// 	                       });
	});

$(document).on("click",".topCloseBtn",function(){

	var targetDiv=$("#searchResultPopDiv").parent().find("#searchResultPopup").find(".popupWrap");
	$(".popupWrap").removeClass("active");
});

$(document).on("click","#popupCloseBtn",function(){

	var targetDiv=$("#searchResultPopDiv").parent().find("#searchResultPopup").find(".popupWrap");
	$(".popupWrap").removeClass("active");
});
