
/* 체크박스 함수 */

const  handleCheckboxes = (checkboxes) =>  {

   const valuesArray = []; //셀렉박스 값 저장할 배열


   Array.from(checkboxes).forEach((checkBtn, index) => {

       //버튼 내 p값 가져오기 
       const values = checkBtn.nextElementSibling.nextElementSibling.innerText;

       checkBtn.addEventListener("change", () => {
        console.log(checkBtn);
           //체크박스를 체크했을 때
           if (checkBtn.checked) {
               // 첫 번째 체크박스가 체크되었을 때
               if (index === 0) {
                   // 나머지 체크박스들의 체크 상태를 해제, 배열에서 제거
                   for (let i = 1; i < checkboxes.length; i++) {
                       checkboxes[i].checked = false; // 체크 해제
                       const valueToRemove = checkboxes[i].nextElementSibling.nextElementSibling.innerText;
                       const indexToRemove = valuesArray.indexOf(valueToRemove);
                       if (indexToRemove !== -1) {
                           valuesArray.splice(indexToRemove, 1); // 배열에서 제거
                       }
                   }
               } else {
                   // 첫 번째 체크박스가 체크되어 있을 때, 다른 체크박스를 체크하면 첫 번째 체크박스 해제
                   checkboxes[0].checked = false;
                   const valueToRemove = checkboxes[0].nextElementSibling.nextElementSibling.innerText;
                   const indexToRemove = valuesArray.indexOf(valueToRemove);
                   if (indexToRemove !== -1) {
                       valuesArray.splice(indexToRemove, 1); // 배열에서 제거
                   }
               }
               
               // 배열에 값 추가
               valuesArray.push(values);
           } else {
               // 체크박스가 체크 해제되었을 때 배열에서 값 제거
               const index = valuesArray.indexOf(values);
               if (index !== -1) {
                   valuesArray.splice(index, 1);
               }
           }

           // 변경된 배열 값을 버튼의 텍스트에 삽입
           const displayElement = checkboxes[0].parentElement.parentElement.parentElement.previousElementSibling;
           displayElement.innerText = valuesArray.join(', '); // 배열을 문자열로 변환해서 출력
       });
   });
}




/* 셀렉트박스 함수 */

const surfaceSelectEvet = (selectBtnElements,  selectListElements) => {

   const surfaceSelectsTitleBtn = document.querySelectorAll(selectBtnElements);
   const surfaceSelectList = document.querySelectorAll(selectListElements);
   const selectedValues = {}; // 선택된 값들을 저장할 객체

   console.log(surfaceSelectsTitleBtn);
   
   
   surfaceSelectsTitleBtn.forEach((btns, index) => {
         
      btns.addEventListener("click" , () => {
        const nextSiblings = btns.nextElementSibling;
        console.log(nextSiblings);
   
        surfaceSelectsTitleBtn.forEach((otherBtn) => {
         if (otherBtn !== btns) {
           otherBtn.classList.remove("active");
         }
        });
        btns.classList.toggle("active");
        nextSiblings.classList.toggle("active");
   
         //surfaceSelectList관련 toggle버튼
         surfaceSelectList.forEach((box, boxIndex) => {
         //셀렉버튼의 인덱스와  surfaceSelectList 인덱스번호가 일치하면 메뉴를 오픈하고, btn에 active를 포함
         if (index === boxIndex) {
            box.classList.toggle(
               "active",
               btns.classList.contains("active")
            );
         } else {
            //그렇지 않으면 메뉴닫기
            box.classList.remove("active");
         }
         });
   
      });
  
	  console.log("---------------list----------------");
   });
   
   surfaceSelectList.forEach((list) => {
   		//console.log(list);
   	
   	            list.addEventListener("click" , (event) => {
   	             
   	              const thisBtns = event.target.parentElement.parentElement.parentElement.previousElementSibling;
   	              const selectContent =  event.target.parentElement.parentElement.parentElement.parentElement.previousElementSibling.children[0];//셀렉박스
   	              let currentSelect = selectContent.getAttribute("id");//셀렉박스아이디 가져오기
   	              console.log("id:"+currentSelect);
   	              if (event.target.nodeName === "P") {

   	                  //권리확보현황, 권리제외필지조회, 권리필지조회 권리확보유형클릭시
   	                  if( currentSelect === "menuHiddenSelectBox02_3"){
   	                      return surfaceSelectsTitleBtn.forEach((btn) => btn.classList.remove("active")),
   	                      surfaceSelectList.forEach((lists) => lists.classList.remove("active"));
   	                  }
   	                  else if(currentSelect === "menuHiddenSelectBox01_5" || currentSelect === "menuHiddenSelectBox02_5"|| currentSelect === "menuHiddenSelectBox03_5"){
   	                  }
   					  else{
   	                      let currentSelectValue = document.getElementById(currentSelect); //현재 셀렉박스 가져오기
   	                      selectedValues[currentSelect] = [event.target.innerText]; // 해당 셀렉박스에 대한 선택값 초기화
                          updateSelectBox(currentSelect, thisBtns);
   						 
   	                  }

   	              }
   	                  
   	              if (event.target.nodeName === "LABEL" || event.target.nodeName === "INPUT" && event.target.type === "checkbox") {
//                      let checkbox = event.target.nodeName === "LABEL" ? event.target.previousElementSibling : event.target;
//                      let value = checkbox.nextElementSibling.nextElementSibling.innerText;
                      let checkbox = event.target.nodeName === "LABEL" ? event.target.previousElementSibling : event.target;
                      let value = checkbox.nextElementSibling.nextElementSibling ? checkbox.nextElementSibling.nextElementSibling.innerText : event.target.nextElementSibling.innerText;


                      if (!selectedValues[currentSelect]) {
                          selectedValues[currentSelect] = [];
                      }

                      if (value === "전체") {
                          const checkFlag = isAnyCheckboxChecked(checkbox);
                          if (checkbox.checked || !checkFlag) {
                              checkbox.checked = true; // "전체"가 체크된 상태에서 체크 해제되지 않도록 유지
                          } else {
                              selectedValues[currentSelect] = ["전체"];
                              uncheckAllExcept(checkbox);
                              updateSelectBoxWithoutClosing(currentSelect, thisBtns);
                          }
                      }else {
                           // "전체" 체크 해제 로직 추가
                           uncheckAllOption(checkbox);

                           if (checkbox.checked) {
                               selectedValues[currentSelect] = selectedValues[currentSelect].filter(val => val !== "전체");
                               selectedValues[currentSelect].push(value);
                           } else {
                               selectedValues[currentSelect] = selectedValues[currentSelect].filter((val) => val !== value);
                               if (selectedValues[currentSelect].length === 0) {
                                   selectedValues[currentSelect] = ["전체"];
                                   checkAllOption(checkbox);
                               }
                           }
                           updateSelectBoxWithoutClosing(currentSelect, thisBtns);
                      }
                  }
   	        });

   	      }); //end surfaceSelectList.forEach
   
          function updateSelectBox(selectId, btn) {
              let currentSelectValue = document.getElementById(selectId);
              let selectedText = selectedValues[selectId].join(", ");

              btn.innerText = selectedText;
              if (currentSelectValue) {
                  $(currentSelectValue).val(selectedText);
                  $("#" + selectId).val(selectedText);
                  $("#" + selectId).trigger("change");
              }
              surfaceSelectsTitleBtn.forEach((btn) => btn.classList.remove("active"));
              surfaceSelectList.forEach((lists) => lists.classList.remove("active"));
          }
          function updateSelectBoxWithoutClosing(selectId, btn) {
              let currentSelectValue = document.getElementById(selectId);
              let selectedText = selectedValues[selectId].join(", ");

               btn.innerText = selectedText;
               if (currentSelectValue) {
                   $(currentSelectValue).val(selectedText);
                   $("#" + selectId).val(selectedText);
                   $("#" + selectId).trigger("change");
               }
          }

          function uncheckAllExcept(exceptCheckbox) {
              const checkboxes = exceptCheckbox.closest('ul').querySelectorAll('input[type="checkbox"]');
              checkboxes.forEach(checkbox => {
                  if (checkbox !== exceptCheckbox) {
                      checkbox.checked = false;
                  }
              });
          }

          function uncheckAllOption(exceptCheckbox) {
              const checkboxes = exceptCheckbox.closest('ul').querySelectorAll('input[type="checkbox"]');
              checkboxes.forEach(checkbox => {
                  if (checkbox.nextElementSibling.nextElementSibling.innerText === "전체") {
                      checkbox.checked = false;
                  }
              });
          }

          function checkAllOption(exceptCheckbox) {
              const checkboxes = exceptCheckbox.closest('ul').querySelectorAll('input[type="checkbox"]');
              checkboxes.forEach(checkbox => {
                  if (checkbox.nextElementSibling.nextElementSibling.innerText === "전체") {
                      checkbox.checked = true;
                  }
              });
          }

          function isAnyCheckboxChecked(checkboxListSelector) {
              // 체크박스 리스트를 가져온다.
              const checkboxes = checkboxListSelector.closest('ul').querySelectorAll('input[type="checkbox"]');

              // 체크박스 중 하나라도 체크되어 있는지 확인한다.
              for (let checkbox of checkboxes) {
                  if (checkbox.checked) {
                      return true; // 하나라도 체크된 것이 있으면 true를 반환
                  }
              }

              // 모든 체크박스가 체크되지 않은 경우 false를 반환
              return false;
          }
   }


export { surfaceSelectEvet, handleCheckboxes };