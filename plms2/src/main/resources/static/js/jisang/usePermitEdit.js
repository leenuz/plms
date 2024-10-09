
/* ul 태그 개수 찾기 */
const getUlCountInContentsBox = (contentsBoxElement) => {
    // contentsBoxElement 내부에서 'contents' 클래스를 가진 모든 ul 태그를 찾음
    const ulElements = contentsBoxElement.querySelectorAll('ul.contents');
    // ul 태그들의 개수를 반환
    return ulElements.length;
}

// 대상토지 click 이벤트

 const infoContentsDetailBox = document.querySelector('#usePermitEdit .targetLand .contWrap');
    const infoContentsBox = infoContentsDetailBox.querySelector('.contentsBox');
    const infoAddBtn = infoContentsDetailBox.querySelectorAll('.addBtn');
    const infoContents = infoContentsDetailBox.querySelectorAll('.contents');
    const infoTitles = infoContentsDetailBox.querySelector('.titles');

const contentsBoxElement = document.querySelector('#togiDiv .contentsBox');
let index = getUlCountInContentsBox(contentsBoxElement);

const usePermitEditInfoAddBtnEvent01 = () => {



    infoContentsBox.addEventListener('click', function (event) {
		let idx = $('#togiDiv .contents').length + 1;
        // 버튼 클릭시 추가되게
        if (event.target.classList.contains('addBtn')) {
            // ul 만들기
            const infoUl = document.createElement('ul');
            infoUl.classList.add('contents');
			
			const hiddenPermitIndexInput = document.createElement('input');
                hiddenPermitIndexInput.id = 'permitIndex';
                hiddenPermitIndexInput.value = idx;
                hiddenPermitIndexInput.type = 'hidden';
                
                const hiddenTogiManageNoInput = document.createElement('input');
                hiddenTogiManageNoInput.id = 'togiManageNo';
                hiddenTogiManageNoInput.name = 'togiManageNo';
                hiddenTogiManageNoInput.type = 'hidden';
                
                const hiddenSidoNmInput = document.createElement('input');
                hiddenSidoNmInput.id = 'sido_nm';
                hiddenSidoNmInput.name = 'sido_nm';
                hiddenSidoNmInput.type = 'hidden';
                
                const hiddenSggNmInput = document.createElement('input');
                hiddenSggNmInput.id = 'sgg_nm';
                hiddenSggNmInput.name = 'sgg_nm';
                hiddenSggNmInput.type = 'hidden';
                
                const hiddenEmdNmInput = document.createElement('input');
                hiddenEmdNmInput.id = 'emd_nm';
                hiddenEmdNmInput.name = 'emd_nm';
                hiddenEmdNmInput.type = 'hidden';
                
                const hiddenRiNmInput = document.createElement('input');
                hiddenRiNmInput.id = 'ri_nm';
                hiddenRiNmInput.name = 'ri_nm';
                hiddenRiNmInput.type = 'hidden';
                
                const hiddenJibunNmInput = document.createElement('input');
                hiddenJibunNmInput.id = 'jibun';
                hiddenJibunNmInput.name = 'jibun';
                hiddenJibunNmInput.type = 'hidden';
                
                const hiddenAddrCodeNmInput = document.createElement('input');
                hiddenAddrCodeNmInput.id = 'addrcode';
                hiddenAddrCodeNmInput.name = 'addrcode';
                hiddenAddrCodeNmInput.type = 'hidden';
				
				infoUl.appendChild(hiddenPermitIndexInput);
				infoUl.appendChild(hiddenTogiManageNoInput);
				infoUl.appendChild(hiddenSidoNmInput);
				infoUl.appendChild(hiddenSggNmInput);
				infoUl.appendChild(hiddenEmdNmInput);
				infoUl.appendChild(hiddenRiNmInput);
				infoUl.appendChild(hiddenJibunNmInput);
				infoUl.appendChild(hiddenAddrCodeNmInput);
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
                   addressInput.readOnly = true;
                   addressInput.classList.add('notWriteInput');

                   // div에 input 넣기

                   addressDiv.appendChild(addressInput);
                   infoLi.appendChild(addressDiv);

                   // 검색버튼 만들기

                   const addressBtn = document.createElement('button');
                   addressBtn.classList.add('searchAddressBtn');
                    addressBtn.classList.add('addrSearchBtn');

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
                        infoInput.name="setArea_" + index;
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

                    if(i==7){
                        infoInput.name="soyuja_" + index;
                         infoInput.readOnly = true;
                    infoInput.classList.add('notWriteInput');
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
            index++;
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
//   주소 검색
$(document).on("click",".addrSearchBtn",function(){
		 const popupOpen = document.querySelector("#land_searchResultsPopup .popupWrap");
         const clickedButtonId = $(this).attr('id');
		 $(popupOpen).addClass("open");
		 $(popupOpen).addClass("active");
		   $('.addParentBtn').attr('data-index', clickedButtonId);
								  	  // popupOpen.classList.add("active");
})

$(document).on("click",".topCloseBtn",function(){

	var targetDiv=$("#searchResultPopDiv").parent().find("#searchResultPopup").find(".popupWrap");
	$(".popupWrap").removeClass("active");
});

$(document).on("click","#popupCloseBtn",function(){

	var targetDiv=$("#searchResultPopDiv").parent().find("#searchResultPopup").find(".popupWrap");
	$(".popupWrap").removeClass("active");
});


const landcreatePopCustomLiResult = () => {
        // hiddenSelectBox와 PopupCustomSelectBox를 묶는 큰 wrap
        const popSelectWrapItems = document.querySelectorAll(
          "#land_searchResultsPopup .popSelectWrap"
        );

        popSelectWrapItems.forEach((contentItem) => {
          // 그 안에 있는 select를 선택
          const nowIssueSelectBox = contentItem.querySelector("select");
          // select가 없으면 return
          if (!nowIssueSelectBox) return;

          const popCustomSelectBox = contentItem.querySelector(
            ".PopupCustomSelectBox"
          );
          const popCustomSelectBtns = popCustomSelectBox.querySelector(
            ".PopupCustomSelectBtns"
          );

          for (let i = 0; i < nowIssueSelectBox.length; i++) {
            const optionValue = nowIssueSelectBox.options[i].text;
            const li = document.createElement("li");
            const button = document.createElement("button");
            button.classList.add("PopupMoreSelectBtn");
            button.type = "button";
            button.textContent = optionValue;
            li.appendChild(button);
            popCustomSelectBtns.appendChild(li);
          }
        });
      };

     landcreatePopCustomLiResult();

      // 팝업 select click 시 .PopupCustomSelectBtns 나오게

      const customSelectView = document.querySelectorAll(
        "#land_searchResultsPopup .PopupCustomSelectView"
      );

      customSelectView.forEach((btn) => {
        btn.addEventListener("click", function () {
          btn.classList.toggle("active");
          if (btn.nextElementSibling) {
            btn.nextElementSibling.classList.toggle("active");
          }
        });
      });

      // 대분류, 중분류, 소분류 안에 button click 했을 때 해당 내용으로 바뀌게하기
/*
      const PopupMoreSelectBtn = document.querySelectorAll(
        "#land_searchResultsPopup .PopupMoreSelectBtn"
      );

      PopupMoreSelectBtn.forEach((moreBtn) => {
        moreBtn.addEventListener("click", function () {
          var moreBtnText = moreBtn.innerText;
          console.log(moreBtnText);
          const parentMoreBtn = moreBtn.closest(".PopupCustomSelectBtns");
          const editViewBtn = parentMoreBtn.previousElementSibling;

          while (editViewBtn.firstChild) {
            editViewBtn.removeChild(editViewBtn.firstChild);
          }

          const textNode = document.createTextNode(moreBtnText);
          editViewBtn.appendChild(textNode);

          editViewBtn.classList.remove("active");
          parentMoreBtn.classList.remove("active");

          // 선택한 걸 select의 value값으로 변경하기

          // 팝업은 popSelectWrap로 묶는다
          const nearByContent = moreBtn.closest(".popSelectWrap");
          const nearBySelectBox = nearByContent.querySelector("select");
		  console.log("----------nearBySelectBox---------------");
		  console.log(nearBySelectBox);
		  console.log(moreBtn.textContent);
		  $(nearBySelectBox).val(moreBtn.textContent);
          nearBySelectBox.value = moreBtn.textContent;

		  $(nearBySelectBox).trigger("change");
		  console.log($("#sido").val());
		 // nearBySelectBox.value = moreBtn.textContent;
          console.log(`Selected value: ${nearBySelectBox.value}`);
        });
      });
*/

function loadCustomLiLandRegist(ele) {


	var thisContent = ele.parent().parent().find('select');

	const customSelectBox = ele.closest('.PopupCustomSelectBox');

	$(customSelectBox).find("li").remove();
	var customSelectBtns = customSelectBox.find('.PopupCustomSelectBtns');

	var optList=thisContent[0];

	for (let i = 0; i < optList.length; i++) {
		const optionValue = optList.options[i].value;

		const li = document.createElement('li');

		            const button = document.createElement('button');
		            button.classList.add('PopupMoreSelectBtn');
		            button.type = 'button';
					if (optionValue=="") button.textContent="전체";
		            else button.textContent = optionValue;

		            li.appendChild(button);
		            $(customSelectBtns).append(li);

	}
}


$(document).on("click",".PopupMoreSelectBtn",function(){
	var moreSelectBtnText = this.innerText;
	const parentMoreSelectBtn = this.closest('.PopupCustomSelectBtns')
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
		   		$(nearBySelectBox).val(this.textContent);
		   		$(nearBySelectBox).trigger("change");
		   	       nearBySelectBox.value = this.textContent;

});

$(document).on("click",".addParentBtn",function(){
	const checkboxes = document.querySelectorAll('input[name="chk"]:checked'); // 체크된 체크박스만 선택

    let id = $(this).attr('data-index');
    
    checkboxes.forEach((checkbox,checkno) => {
		let idx = $('#togiDiv .contents').length;
		const infoUl = document.createElement('ul');
            infoUl.classList.add('contents');
            
            var jusoInfo = checkbox.parentNode.parentNode;
             const address = jusoInfo.querySelector('input#popupAddress').value + " " +  jusoInfo.querySelector('input#jibun').value ;
             const jimok = jusoInfo.querySelector('input#popupJimokText').value;
             const jijukArea = jusoInfo.querySelector('input#popupJijukArea').value;
             const pyeonibArea = jusoInfo.querySelector('input#popupPyeonibArea').value;
             const jasanNo = jusoInfo.querySelector('input#popupJasanNo').value;
             const souja = jusoInfo.querySelector('input#popupSouja').value;
             const setMoney = jusoInfo.querySelector('input#popupSetMoney').value;
             
             const sido_nm = jusoInfo.querySelector('input#sido_nm').value;
             const sgg_nm = jusoInfo.querySelector('input#sgg_nm').value;
             const ri_nm = jusoInfo.querySelector('input#ri_nm').value;
             const jibun = jusoInfo.querySelector('input#jibun').value;
             const emd_nm = jusoInfo.querySelector('input#emd_nm').value;
             
             $("input[name='sido_nm']").eq(idx).val(sido_nm);
             $("input[name='sgg_nm']").eq(idx).val(sgg_nm);
             $("input[name='ri_nm']").eq(idx).val(ri_nm);
             $("input[name='jibun']").eq(idx).val(jibun);
             $("input[name='emd_nm']").eq(idx).val(emd_nm);
             
<<<<<<< Updated upstream
=======
             idx=idx+1;
             
     if (checkno === 0) {
             // 선택된 칸에 데이터 넣기
             console.log('id ',id);
             console.log(sido_nm);
             console.log('checkno :: ',checkno);
             $("input[name='address_" + id + "']").val(address);
             $("input[name='jimok_" + id + "']").val(jimok);
             $("input[name='fullArea_" + id + "']").val(jijukArea);
             $("input[name='setArea_" + id + "']").val(pyeonibArea);
             $("input[name='jasan_" + id + "']").val(jasanNo);
             $("input[name='soyuja_" + id + "']").val(souja);
             $("input[name='setMoney_" + id + "']").val(setMoney);
>>>>>>> Stashed changes
             
             const hiddenPermitIndexInput = document.createElement('input');
                hiddenPermitIndexInput.id = 'permitIndex';
                hiddenPermitIndexInput.value = idx;
                hiddenPermitIndexInput.type = 'hidden';
                
                const hiddenTogiManageNoInput = document.createElement('input');
                hiddenTogiManageNoInput.id = 'togiManageNo';
                hiddenTogiManageNoInput.name = 'togiManageNo';
                hiddenTogiManageNoInput.type = 'hidden';
                hiddenTogiManageNoInput.value = $('#saveForm [name="pmt_no"]').val();
                
                
                const hiddenSidoNmInput = document.createElement('input');
                hiddenSidoNmInput.id = 'sido_nm';
                hiddenSidoNmInput.name = 'sido_nm';
                hiddenSidoNmInput.type = 'hidden';
                hiddenSidoNmInput.value = sido_nm;
                
                const hiddenSggNmInput = document.createElement('input');
                hiddenSggNmInput.id = 'sgg_nm';
                hiddenSggNmInput.name = 'sgg_nm';
                hiddenSggNmInput.type = 'hidden';
                hiddenSggNmInput.value = sgg_nm;
                
                const hiddenEmdNmInput = document.createElement('input');
                hiddenEmdNmInput.id = 'emd_nm';
                hiddenEmdNmInput.name = 'emd_nm';
                hiddenEmdNmInput.type = 'hidden';
                hiddenEmdNmInput.value = emd_nm;
                
                const hiddenRiNmInput = document.createElement('input');
                hiddenRiNmInput.id = 'ri_nm';
                hiddenRiNmInput.name = 'ri_nm';
                hiddenRiNmInput.type = 'hidden';
                hiddenRiNmInput.value = ri_nm;
                
                const hiddenJibunNmInput = document.createElement('input');
                hiddenJibunNmInput.id = 'jibun';
                hiddenJibunNmInput.name = 'jibun';
                hiddenJibunNmInput.type = 'hidden';
                hiddenJibunNmInput.value = jibun;
                
                const hiddenAddrCodeNmInput = document.createElement('input');
                hiddenAddrCodeNmInput.id = 'addrcode';
                hiddenAddrCodeNmInput.name = 'addrcode';
                hiddenAddrCodeNmInput.type = 'hidden';
               
                infoUl.appendChild(hiddenPermitIndexInput);
				infoUl.appendChild(hiddenTogiManageNoInput);
				infoUl.appendChild(hiddenSidoNmInput);
				infoUl.appendChild(hiddenSggNmInput);
				infoUl.appendChild(hiddenEmdNmInput);
				infoUl.appendChild(hiddenRiNmInput);
				infoUl.appendChild(hiddenJibunNmInput);
				infoUl.appendChild(hiddenAddrCodeNmInput);
     if (checkno === 0) {
             // 선택된 칸에 데이터 넣기
             $("input[name='address_" + id + "']").val(address);
             $("input[name='jimok_" + id + "']").val(jimok);
             $("input[name='fullArea_" + id + "']").val(jijukArea);
             $("input[name='setArea_" + id + "']").val(pyeonibArea);
             $("input[name='jasan_" + id + "']").val(jasanNo);
             $("input[name='soyuja_" + id + "']").val(souja);
             $("input[name='setMoney_" + id + "']").val(setMoney);
             $('#togiDiv .contents').eq(id).find("input[name='sido_nm']").val(sido_nm);
             $('#togiDiv .contents').eq(id).find("input[name='sgg_nm']").val(sgg_nm);
             $('#togiDiv .contents').eq(id).find("input[name='ri_nm']").val(ri_nm);
             $('#togiDiv .contents').eq(id).find("input[name='jibun']").val(jibun);
             $('#togiDiv .contents').eq(id).find("input[name='emd_nm']").val(emd_nm);
     }else{
<<<<<<< Updated upstream
=======
		
		 const hiddenPermitIndexInput = document.createElement('input');
                hiddenPermitIndexInput.id = 'permitIndex';
                hiddenPermitIndexInput.value = idx;
                hiddenPermitIndexInput.type = 'hidden';
                
                const hiddenTogiManageNoInput = document.createElement('input');
                hiddenTogiManageNoInput.id = 'togiManageNo';
                hiddenTogiManageNoInput.name = 'togiManageNo';
                hiddenTogiManageNoInput.type = 'hidden';
                hiddenTogiManageNoInput.value = $('#saveForm [name="pmt_no"]').val();
                
                
                const hiddenSidoNmInput = document.createElement('input');
                hiddenSidoNmInput.id = 'sido_nm';
                hiddenSidoNmInput.name = 'sido_nm';
                hiddenSidoNmInput.type = 'hidden';
                hiddenSidoNmInput.value = sido_nm;
                
                const hiddenSggNmInput = document.createElement('input');
                hiddenSggNmInput.id = 'sgg_nm';
                hiddenSggNmInput.name = 'sgg_nm';
                hiddenSggNmInput.type = 'hidden';
                hiddenSggNmInput.value = sgg_nm;
                
                const hiddenEmdNmInput = document.createElement('input');
                hiddenEmdNmInput.id = 'emd_nm';
                hiddenEmdNmInput.name = 'emd_nm';
                hiddenEmdNmInput.type = 'hidden';
                hiddenEmdNmInput.value = emd_nm;
                
                const hiddenRiNmInput = document.createElement('input');
                hiddenRiNmInput.id = 'ri_nm';
                hiddenRiNmInput.name = 'ri_nm';
                hiddenRiNmInput.type = 'hidden';
                hiddenRiNmInput.value = ri_nm;
                
                const hiddenJibunNmInput = document.createElement('input');
                hiddenJibunNmInput.id = 'jibun';
                hiddenJibunNmInput.name = 'jibun';
                hiddenJibunNmInput.type = 'hidden';
                hiddenJibunNmInput.value = jibun;
                
                const hiddenAddrCodeNmInput = document.createElement('input');
                hiddenAddrCodeNmInput.id = 'addrcode';
                hiddenAddrCodeNmInput.name = 'addrcode';
                hiddenAddrCodeNmInput.type = 'hidden';
                
                infoUl.appendChild(hiddenPermitIndexInput);
				infoUl.appendChild(hiddenTogiManageNoInput);
				infoUl.appendChild(hiddenSidoNmInput);
				infoUl.appendChild(hiddenSggNmInput);
				infoUl.appendChild(hiddenEmdNmInput);
				infoUl.appendChild(hiddenRiNmInput);
				infoUl.appendChild(hiddenJibunNmInput);
				infoUl.appendChild(hiddenAddrCodeNmInput);
>>>>>>> Stashed changes
	 // ul 만들기	
	 			
                
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
                       addressInput.readOnly = true;
                       addressInput.classList.add('notWriteInput');
                       addressInput.value=address;

                       // div에 input 넣기
                       addressDiv.appendChild(addressInput);
                       infoLi.appendChild(addressDiv);

                       // 검색버튼 만들기

                       const addressBtn = document.createElement('button');
                       addressBtn.classList.add('searchAddressBtn');
                        addressBtn.classList.add('addrSearchBtn');
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
                             infoInput.value=jimok;
                        }else if(i==3){
                            infoInput.name="fullArea_" + index;
                           infoInput.readOnly = true;
                            infoInput.classList.add('notWriteInput');
                             infoInput.value=jijukArea;
                        }else if(i==4){
                            infoInput.name="setArea_" + index;
                           infoInput.readOnly = true;
                            infoInput.classList.add('notWriteInput');
                             infoInput.value=pyeonibArea;
                        }else if(i==5){
                            secondContent.classList.add('largeSecondTitle');
                            infoInput.name="setMoney_" + index;
                             infoInput.value=setMoney;

                        }else if(i==6){
                            infoInput.name="jasan_" + index;
                           infoInput.readOnly = true;
                            infoInput.classList.add('notWriteInput');
                             infoInput.value=jasanNo;
                        }

                        secondContent.appendChild(infoInput);
                        secondUl.appendChild(secondContent);
                         infoLi.appendChild(secondUl);

                    }else if(7<= i && i<=8) {
                        infoLi.classList.add('content');
                        const infoInput = document.createElement('input');
                        infoInput.type = 'text';
                        infoLi.appendChild(infoInput);

                        if(i==7){
                            infoInput.name="soyuja_" + index;
                             infoInput.value=souja;
                             infoInput.readOnly = true;
                             infoInput.classList.add('notWriteInput');
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
				
                index++;
                
                 
                
                
                }
                });
	
				
 $(".popupWrap").removeClass("active");
 //$('#togiDiv .contents').last().remove();
})



$(document).on("change","#landRightsRegistSelectBox09",function(){
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
				 $.ajax({

						url:url,
						type:'POST',
						contentType:"application/json",
						data:JSON.stringify(requestData),
						async:false,
						dataType:"json",
						success:function(response){
							if (response.success="Y"){
								$("#landRightsRegistSelectBox10 option").remove();
								$("#landRightsRegistSelectBox10").append('<option value="">전체</option>');
								for(var i=0;i<response.resultData.length;i++){
									$("#landRightsRegistSelectBox10").append('<option value="'+response.resultData[i].sm_gugun+'">'+response.resultData[i].sm_gugun+'</option>');
								}
								//loadCustomLiLandRegist($("#gugun_ul"));
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
		 $.ajax({

				url:url,
				type:'POST',
				contentType:"application/json",
				data:JSON.stringify(requestData),
				async:false,
				dataType:"json",
				success:function(response){
					if (response.success="Y"){
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
			 $.ajax({

					url:url,
					type:'POST',
					contentType:"application/json",
					data:JSON.stringify(requestData),
					async:false,
					dataType:"json",
					success:function(response){
						if (response.success="Y"){
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


$(document).on("click","#popupSearchBtn",function(){

	var formSerializeArray = $('#searchForm').serializeArray();


	 $.ajax({
					   	   	  url: "/land/jisang/getPermitEditJisangSelect",
					   	   	  type: "POST",
					   	   	  data: formSerializeArray,

					   	   })
					   	   .done(function (fragment) {
					   	      $('#searchResultPopDiv').replaceWith(fragment);


							  const popupOpen = document.querySelector("#land_searchResultsPopup .popupWrap");
							  							  	   //			   		              landRightsSearchBtn.classList.add("open");
							  							  	   $(popupOpen).addClass("open");
							  								   $(popupOpen).addClass("active");

					   	   	});
})

//저장
$(document).on("click",".saveBtn ",function(){
	let formSerializeArray = $('#saveForm').serializeArray();
	let len = formSerializeArray.length;
	let dataObj = {};
	for (i=0; i<len; i++) {
		dataObj[formSerializeArray[i].name] = formSerializeArray[i].value;
	}

	let st_date = $('input[name="st_date"]').data('placeholder');
	dataObj['st_date'] = st_date;
	let ed_date = $('input[name="ed_date"]').data('placeholder');
	dataObj['ed_date'] = ed_date;

	var togiDatas=[];
	var togiUls=$("#togiDiv .contents");
   	for(let i = 0; i < togiUls.length; i++){
		let address=$(togiUls[i]).find("input[name='address_"+ i +"']").val();
		let jimok_text=$(togiUls[i]).find("input[name='jimok_"+ i +"']").val();
		let fullArea=$(togiUls[i]).find("input[name='fullArea_"+ i +"']").val();
		let setArea=$(togiUls[i]).find("input[name='setArea_"+ i +"']").val();
		let setMoney=$(togiUls[i]).find("input[name='setMoney_"+ i +"']").val();
		let jasan=$(togiUls[i]).find("input[name='jasan_"+ i +"']").val();
		let soyuja=$(togiUls[i]).find("input[name='soyuja_"+ i +"']").val();
		let pmtUser=$(togiUls[i]).find("input[name='pmtUser_"+ i +"']").val();
		let togiManageNo=$(togiUls[i]).find("input[name='togiManageNo']").val();
		
		let sido_nm=$(togiUls).eq(i).find("input[name='sido_nm']").val();
		let sgg_nm=$(togiUls).eq(i).find("input[name='sgg_nm']").val();
		let emd_nm=$(togiUls).eq(i).find("input[name='emd_nm']").val();
		let ri_nm=$(togiUls).eq(i).find("input[name='ri_nm']").val();
		let jibun=$(togiUls).eq(i).find("input[name='jibun']").val();
		let addrcode=$(togiUls).eq(i).find("input[name='addrcode']").val();
		
   		let togiObj={
			"address" : ljsIsNull(address) ? '' : address,
			"togiaddress" : ljsIsNull(address) ? '' : address,
			"togiJimokText" : ljsIsNull(jimok_text) ? '' : jimok_text,
			"togiJijukArea" : ljsIsNull(fullArea) ? '' : fullArea,
			"togiPyeonibArea" : ljsIsNull(setArea) ? '' : setArea,
			"togiSetMoney" : ljsIsNull(setMoney) ? '' : setMoney,
			"togiJasanNo" : ljsIsNull(jasan) ? '' : jasan,
			"togiSouja" : ljsIsNull(soyuja) ? '' : soyuja,
			"togiUseName" : ljsIsNull(pmtUser) ? '' : pmtUser,
			"togiManageNo" : ljsIsNull(togiManageNo) ? '' : togiManageNo,
			"sido_nm" : ljsIsNull(sido_nm) ? '' : sido_nm,
			"sgg_nm" : ljsIsNull(sgg_nm) ? '' : sgg_nm,
			"emd_nm" : ljsIsNull(emd_nm) ? '' : emd_nm,
			"ri_nm" : ljsIsNull(ri_nm) ? '' : ri_nm,
			"jibun" : ljsIsNull(jibun) ? '' : jibun,
			"addrcode" : ljsIsNull(addrcode) ? '' : addrcode
		}
		togiDatas.push(togiObj);
	}
	dataObj.desangTogis=togiDatas;
	dataObj.gubun="modify";
	dataObj.pmt_status="임시저장";
	url="/land/jisang/usePermitRegisterSave";
	$.ajax({
		url : url,
		type : 'POST',
		contentType : "application/json",
		data : JSON.stringify(dataObj),
		dataType : "json",
		beforeSend : function(request) {
			loadingShow();
		},
		success : function(response) {
			loadingHide();
			if (response.success="Y"){
				console.log("response.success Y");
				alert("정상적으로 등록 되었습니다.");
			} else {
				console.log("response.success N");
			}
		},
		error : function(jqXHR, textStatus, errorThrown) {
			alert("mainSaveBtn ajax error\n"+textStatus+":"+errorThrown);
			return false;
		}
	});
})

//상신
$(document).on("click",".approvalBtn ",function(){
	//fileCnt = $('#req_doc_file' +)
	let flag = true;
	for(let i = 0; i < 10; i++ ) {
		let content = $('.fileContent:eq('+i+') input').eq(2).val();
		if(content == '') {
			flag = false;
		}
	}
	
	if (!flag) {
		alert('첨부파일을 확인해주세요.');
		return;
	}
	var formSerializeArray = $('#saveForm').serializeArray();
  len = formSerializeArray.length;
       var dataObj = {};
       for (i=0; i<len; i++) {
        dataObj[formSerializeArray[i].name] = formSerializeArray[i].value;
       }

         var st_date = $('input[name="st_date"]').data('placeholder');
        dataObj['st_date'] = st_date;
        var ed_date = $('input[name="ed_date"]').data('placeholder');
        dataObj['ed_date'] = ed_date;

        var togiDatas=[];
	   	var togiUls=$("#togiDiv .contents");
	   	for(var i=0;i<togiUls.length;i++){
			var address=$(togiUls[i]).find("input[name='address_"+ i +"']").val();
			var jimok_text=$(togiUls[i]).find("input[name='jimok_"+ i +"']").val();
			var fullArea=$(togiUls[i]).find("input[name='fullArea_"+ i +"']").val();
			var setArea=$(togiUls[i]).find("input[name='setArea_"+ i +"']").val();
			var setMoney=$(togiUls[i]).find("input[name='setMoney_"+ i +"']").val();
			var jasan=$(togiUls[i]).find("input[name='jasan_"+ i +"']").val();
			var soyuja=$(togiUls[i]).find("input[name='soyuja_"+ i +"']").val();
			var pmtUser=$(togiUls[i]).find("input[name='pmtUser_"+ i +"']").val();

	   		var togiObj={
				"address":ljsIsNull(address)?'':address
				,"jimok_text":ljsIsNull(jimok_text)?'':jimok_text
				,"fullArea":ljsIsNull(fullArea)?'':fullArea
				,"setArea":ljsIsNull(setArea)?'':setArea
				,"setMoney":ljsIsNull(setMoney)?'':setMoney
				,"jasan":ljsIsNull(jasan)?'':jasan
				,"soyuja":ljsIsNull(soyuja)?'':soyuja
				,"pmtUser":ljsIsNull(pmtUser)?'':pmtUser

	   		}
	   		togiDatas.push(togiObj);
	   	}
	   	dataObj.desangTogis=togiDatas;
		dataObj.gubun="modify";
				dataObj.pmt_status="임시저장";
		 //임시저장 호출

		 		url="/land/jisang/usePermitRegisterSave";
		 		$.ajax({

		 			url:url,
		 			type:'POST',
		 			contentType:"application/json",
		 			data:JSON.stringify(dataObj),
					async:false,
		 			dataType:"json",
		 			beforeSend:function(request){
		 				console.log("beforesend ........................");
		 				//loadingShow();
		 			},
		 			success:function(response){
		 				//loadingHide();
		 				if (response.success="Y"){
		 					console.log("response.success Y");
		 					//console.log("response.resultData length:"+response.resultData.length);
		 					 dataObj.PMT_NO=response.PMT_NO;
		 					 console.log("---------------상신으로 넘겨야함-------------");
		 					
		 					
		 					url="/land/jisang/selectJisangPmtDetailListAppoval";
		 						   	$.ajax({

		 								url:url,
		 								type:'POST',
		 								contentType:"application/json",
		 								data:JSON.stringify(dataObj),

		 								dataType:"json",
		 								beforeSend:function(request){
		 									console.log("beforesend ........................");
		 									//loadingShow();
		 								},
		 								success:function(response){
		 									//loadingHide();
											console.log("----------------sangsin result----------");
		 									console.log(response);
		 									if (response.success="Y"){
		 										console.log("response.success Y");
		 										//console.log("response.resultData length:"+response.resultData.length);
		 										alert("정상적으로 상신 되었습니다.");
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
		 									alert("sangsin ajax error\n"+textStatus+":"+errorThrown);
		 									return false;
		 								}

		 						   	});
		 					
		 					
		 					
		 				}
		 				else {
		 					console.log("response.success N");
		 				}
		 			},
		 			error:function(jqXHR,textStatus,errorThrown){
		 				alert("mainSaveBtn ajax error\n"+textStatus+":"+errorThrown);
		 				return false;
		 			}

		 		});
})


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
			$('input[name=landTerminationRegistration_myPcFiles09]').on('change', function(e) {
				       var files = e.originalEvent.target.files;
				       handleFileUpload1(files,this,"09");
			});
			$('input[name=landTerminationRegistration_myPcFiles10]').on('change', function(e) {
				       var files = e.originalEvent.target.files;
				       handleFileUpload1(files,this,"10");
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
						var changeObj=$(obj).parent().parent().find("#req_doc_file"+idx).val(files[i].name);
						console.log("--------changeObj---------------");
			            sendFileToServer1(fd,status,idx);

			       }
			    }

		    var rowCount=0;
		    function createStatusbar(obj,name,size,no){
		        console.log("----------start createStatusBar------------");

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
			                //$("#status1").append("File upload Done<br>");
			                uploadFiles.push(data.resultData.fpath);
			                //allCheckEventLandRightsRegist();
			            }
			        });
			        //status.setAbort(jqXHR);
			    }
}); //end ready



$(document).on("click","#docFileDelBtn",function(){
	console.log("---------------docFileDelBtn---------------");
	var $currentElement = $(this);
	var inputFseq=$(this).parent().parent().find("#fseq").val();
	var inputValue=$(this).parent().parent().find(".notWriteInput").val();
	if (inputValue!=null || inputValue!=""){
		var params={"dfile_name":inputValue,"jisang_no":$("#hiddenJisangNo").val(),"fseq":inputFseq,"docNo":"2"}

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

})