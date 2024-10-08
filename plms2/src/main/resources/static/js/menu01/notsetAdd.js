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
		console.log("step1:");
		console.log(parentMoreSelectBtn);
        const EditCustomViewBtn = parentMoreSelectBtn.previousElementSibling;

        while (EditCustomViewBtn.firstChild) {
            EditCustomViewBtn.removeChild(EditCustomViewBtn.firstChild);
        }

        // 새로운 텍스트 노드를 추가합니다.
        const textNode = document.createTextNode(moreSelectBtnText);
        EditCustomViewBtn.appendChild(textNode);

        // figure 요소를 다시 추가합니다.
        const figure = document.createElement('figure');
        EditCustomViewBtn.appendChild(figure);


        EditCustomViewBtn.classList.remove('active')
        parentMoreSelectBtn.classList.remove('active')


    })
})


/* 라디오버튼 클릭시 각 영역 사용여부  */

const notsetAddRadioEvet = () => {
 
     const addressInputNames = document.getElementsByName("addressInput");
     const addressInputNames02 = document.getElementsByName("addressInput02");
     const addressInputBox01 = document.querySelector(".addressInputBox01");
     const addressInputBox02 = document.querySelector(".addressInputBox02");
     const addressInputBox03 = document.querySelector(".addressInputBox03");
     const addressInputBox04 = document.querySelector(".addressInputBox04");
     const selectRadioEvet01 = document.querySelectorAll(".selectRadioEvet01 .customSelectView");
     const selectRadioEvet02 = document.querySelectorAll(".selectRadioEvet02 .customSelectView");

     console.log(selectRadioEvet01);
     console.log(selectRadioEvet02);


     if(addressInputNames){
        addressInputNames.forEach((radioBtns, index) => {
           radioBtns.addEventListener("change" , () => {
               if(radioBtns.checked){
                if(index === 0){
                    return  addressInputBox01.readOnly = false,
                    addressInputBox02.readOnly = true,
                    selectRadioEvet01.forEach((btns) => btns.disabled = true);
  
                }else if(index === 1){
                    return  addressInputBox01.readOnly = true,
                    addressInputBox02.readOnly = false,
                    selectRadioEvet01.forEach((btns) => btns.disabled = false);
                }else{
                }
   
               }
           })
        })
       }

    if(addressInputNames02){
        addressInputNames02.forEach((radioBtns, index) => {
           radioBtns.addEventListener("change" , () => {
               if(radioBtns.checked){
                if(index === 0){
                    return  addressInputBox03.readOnly = false,
                    addressInputBox04.readOnly = true,
                    selectRadioEvet02.forEach((btns) => btns.disabled = true);
  
                }else if(index === 1){
                    return  addressInputBox03.readOnly = true,
                    addressInputBox04.readOnly = false,
                    selectRadioEvet02.forEach((btns) => btns.disabled = false);
                }else{
                }
   
               }
           })
        })
       }

}

notsetAddRadioEvet();



/* 체크박스이벤트 */

const notsetAddCheckBoxsEvet = () => {

     const customCheckboxInput01 = document.getElementById("notsetAddCheckbox01");
     const customCheckBoxLabel01 = document.querySelector(".customCheckBoxLabel01");
     const customCheckboxInput02 = document.getElementById("notsetAddCheckbox02");
     const customCheckBoxLabel02 = document.querySelector(".customCheckBoxLabel02");
     const customCheckboxInput03 = document.getElementById("notsetReviseCheckbox03");
     const customCheckBoxLabel03 = document.querySelector(".customCheckBoxLabel03");
     const customCheckboxInput04 = document.getElementById("notsetReviseCheckbox04");
     const customCheckBoxLabel04 = document.querySelector(".customCheckBoxLabel04");

     if(customCheckboxInput01){
     customCheckboxInput01.addEventListener("change" , () => {
        if(customCheckboxInput01.checked){
            customCheckBoxLabel01.classList.add("active");
          }else{
            customCheckBoxLabel01.classList.remove("active");
          }
     });
     }
     if(customCheckboxInput02){
     customCheckboxInput02.addEventListener("change" , () => {
        if(customCheckboxInput02.checked){
          customCheckBoxLabel02.classList.add("active");
          }else{
            customCheckBoxLabel02.classList.remove("active");
          }
     })
    }
    if(customCheckboxInput03){
     customCheckboxInput03.addEventListener("change" , () => {
        if(customCheckboxInput03.checked){
          customCheckBoxLabel03.classList.add("active");
          }else{
            customCheckBoxLabel03.classList.remove("active");
          }
     })
    }
    if(customCheckboxInput04){
     customCheckboxInput04.addEventListener("change" , () => {
        if(customCheckboxInput04.checked){
          customCheckBoxLabel04.classList.add("active");
          }else{
            customCheckBoxLabel04.classList.remove("active");
          }
     })
    }
}

notsetAddCheckBoxsEvet();




/* 미설정/미점용 내역 수정 input_readonly */

const addReviseInputEvet = () => {

     const addDisabledInputBoxsInput = document.querySelectorAll(".addDisabledInputBoxs .contWrap .depth1 .contents li input");
     console.log(addDisabledInputBoxsInput);
     addDisabledInputBoxsInput.forEach((list) => list.setAttribute("readonly", "true"));
}    

addReviseInputEvet();


/* 검색버튼 클릭시 */


const notsetAddPopEvet = () => {
    const notsetAddPopBtn = document.querySelector(".notsetAddPopBtn");
    console.log(notsetAddPopBtn);
    if (notsetAddPopBtn) {
        const notsetAddResultPop = document.querySelector(".notsetAddResultPop");
        let htmlFilePath = '/components/popuphtml/searchResultsPopup.html'; // 삽입할 html 파일 경로

        let xhr = new XMLHttpRequest();
        xhr.open('GET', htmlFilePath, true);
        xhr.onreadystatechange = function() {
            if (xhr.readyState == 4 && xhr.status == 200) {
                notsetAddResultPop.innerHTML = xhr.responseText;
                runScriptsInElement(notsetAddResultPop); // 삽입된 html내 스크립트 실행 함수 호출
            }
        };
        xhr.send();

        console.log('notsetAddResult 작동');

        notsetAddPopBtn.addEventListener("click", () => {
         const popupOpen = document.querySelector("#searchResultsPopup .popupWrap");
                notsetAddPopBtn.classList.add("open");
                popupOpen.classList.add("active");
        });
    }

// 삽입된 html내 스크립트 실행 함수
const runScriptsInElement = (element) => {
    const scripts = element.getElementsByTagName('script');
    for (let i = 0; i < scripts.length; i++) {
        const script = document.createElement('script');
        script.textContent = scripts[i].textContent;
        document.body.appendChild(script).parentNode.removeChild(script);
    }
}

};


notsetAddPopEvet();