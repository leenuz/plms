
/* 체크박스함수 */

const surfaceInquireCheckboxes = (checkboxes) => {

    const valuesArray = []; // 체크된 값들을 저장할 배열
    const choiceCheckWrapper = document.querySelector(".choiceCheckWrapper");
    let surfaceSelectListMember02 = document.querySelector("#dopcoSurfacePart .checkBoxsContent"); // 기존 요소들을 선택할 변수 추가
    const resetBtn = document.querySelector(".resetBtn");
  
    
    Array.from(checkboxes).forEach((checkBtn) => {
  
      const values = checkBtn.nextElementSibling.nextElementSibling.innerText; // 체크박스 옆에 있는 텍스트 가져오기

      checkBtn.addEventListener("change", () => {
  
        if (checkBtn.checked) {
          // 체크박스가 체크되었을 때
          if (!valuesArray.includes(values)) {
            valuesArray.push(values); // 배열에 값 추가
          }
        } else {
          // 체크박스가 체크 해제되었을 때
          const index = valuesArray.indexOf(values);
          if (index !== -1) {
            valuesArray.splice(index, 1); // 배열에서 값 제거
          }
        }
  
        // 변경된 배열 값을 버튼의 텍스트에 삽입
        updateDisplay();
  
        // choiceCheckWrapper에서 해당 체크박스 상태에 따라 처리
        const checkboxesInWrapper = choiceCheckWrapper.querySelectorAll('input[type="checkbox"]');
        checkboxesInWrapper.forEach(checkbox => {
          if (valuesArray.includes(checkbox.nextElementSibling.nextElementSibling.innerText)) {
            checkbox.checked = true;
          } else {
            checkbox.checked = false;
          }
        });
  
        // surfaceSelectListMember02에서도 해당 체크박스 상태에 따라 처리
        const checkboxesInSurface = surfaceSelectListMember02.querySelectorAll('input[type="checkbox"]');
        checkboxesInSurface.forEach(checkbox => {
          if (valuesArray.includes(checkbox.nextElementSibling.nextElementSibling.innerText)) {
            checkbox.checked = true;
          } else {
            checkbox.checked = false;
          }
        });
  
        // choiceCheckWrapper의 위치 조정
        adjustWrapperHeight();
      });
  
    });
  
    // 초기화 함수 호출
    updateDisplay();
    adjustWrapperHeight();

    

    //초기화버튼 클릭시
    resetBtn.addEventListener("click" , () => {
        console.log('초기화클릭');
     // valuesArray 초기화
     valuesArray.length = 0;
  
     // displayElement 초기화
     updateDisplay();
 
     // choiceCheckWrapper 초기화
     choiceCheckWrapper.innerHTML = '';
 
     // surfaceSelectListMember02 내 체크박스 초기화
     const checkboxesInSurface = surfaceSelectListMember02.querySelectorAll('input[type="checkbox"]');
     checkboxesInSurface.forEach(checkbox => {
       checkbox.checked = false;
     });

     adjustWrapperHeight();

    })

  
    // 삭제 버튼 클릭 이벤트 핸들러
    const handleRemoveButtonClick = (event) => {
      const button = event.target;
      const span = button.parentElement;
      const valueToRemove = span.innerText.trim().slice(0, -1); // 마지막 'x' 문자 제거
  
      // 해당 값에 대응하는 체크박스 해제
      const correspondingCheckbox = Array.from(checkboxes).find(cb => {
        const text = cb.nextElementSibling.nextElementSibling.innerText;
        return text === valueToRemove;
      });
  
      if (correspondingCheckbox) {
        correspondingCheckbox.checked = false;
      }
  
      // 배열에서 값 제거
      const removeIndex = valuesArray.indexOf(valueToRemove);
      if (removeIndex !== -1) {
        valuesArray.splice(removeIndex, 1);
      }
  
      // 변경된 배열 값을 버튼의 텍스트에 삽입
      updateDisplay();
  
      // choiceCheckWrapper에서도 해당 값을 삭제
      const itemsToRemove = choiceCheckWrapper.querySelectorAll(`li p`);
      itemsToRemove.forEach(item => {
        if (item.textContent === valueToRemove) {
          item.parentElement.remove();
        }
      });
  
      // choiceCheckWrapper의 위치 조정
      adjustWrapperHeight();
  
      // surfaceSelectListMember02에서도 해당 체크박스 상태에 따라 처리
      const checkboxesInSurface = surfaceSelectListMember02.querySelectorAll('input[type="checkbox"]');
      checkboxesInSurface.forEach(checkbox => {
        if (valuesArray.includes(checkbox.nextElementSibling.nextElementSibling.innerText)) {
          checkbox.checked = true;
        } else {
          checkbox.checked = false;
        }
      });
    };

  // 배열에 있는 값을 displayElement와 choiceCheckWrapper에 반영하는 함수
  function updateDisplay() {
    const displayElement = checkboxes[0].parentElement.parentElement.parentElement.previousElementSibling;

    //3개 이상부터 카운트 박스형성
    if(valuesArray.length > 2){
        for(let i = 3; i <= valuesArray.length; i++){
        const countNum = document.querySelectorAll(".countNum");
        countNum[countNum.length - 1].innerText = `+${i}`
        countNum[countNum.length - 1].classList.add("active");
        }
    }else{
      //3개이하일 땐 그대로 노출
       displayElement.innerHTML = valuesArray.map(value => `<span>${value}<button class="listRemoveBtn">x</button></span><em class="countNum"></em>`).join('');
    }

    // 삭제 버튼에 이벤트 리스너 추가
    const removeButtons = displayElement.querySelectorAll('.listRemoveBtn');

    // 기존 이벤트 리스너 제거 후 새로 등록
    removeButtons.forEach(button => {
      button.removeEventListener('click', handleRemoveButtonClick);
      button.addEventListener('click', handleRemoveButtonClick);
    });

    // choiceCheckWrapper에 체크박스 상태 반영
    choiceCheckWrapper.innerHTML = valuesArray.map((value, indx) => `<li><input type="checkbox" checked id="inqureCheckNew${[indx]}" name="${value}"/><label for="inqureCheckNew${[indx]}"></label><p>${value}</p></li>`).join('');
  }

  // choiceCheckWrapper의 높이를 조정하는 함수
  function adjustWrapperHeight() {
    const heightChange =  choiceCheckWrapper.clientHeight + 100;
    surfaceSelectListMember02.style.top = `${heightChange}px`;
  }
  

// choiceCheckWrapper 내 체크박스 상태 변경 시 surfaceSelectListMember02에 반영하고 displayElement와 valuesArray에도 반영하는 로직
  choiceCheckWrapper.addEventListener('change', (event) => {
    const checkbox = event.target;
    const value = checkbox.nextElementSibling.nextElementSibling.innerText;

    if (checkbox.checked) {
      // 체크된 경우
      if (!valuesArray.includes(value)) {
        valuesArray.push(value);
      }
    } else {
      // 체크 해제된 경우
      const index = valuesArray.indexOf(value);
      if (index !== -1) {
        valuesArray.splice(index, 1);
      }
    }

    // surfaceSelectListMember02의 체크박스 상태 반영
    const checkboxesInSurface = surfaceSelectListMember02.querySelectorAll('input[type="checkbox"]');
    checkboxesInSurface.forEach(checkbox => {
      checkbox.checked = valuesArray.includes(checkbox.nextElementSibling.nextElementSibling.innerText);
    });

    // displayElement에 반영
    updateDisplay();
    adjustWrapperHeight();
  });

  
  };
  
  

  
/* 셀렉트박스 함수 */

const surfaceInquireSelectEvet = (selectBtn, selectList , selectListText , selectHiddenBox, checkBoxName) => {

    const surfaceSelectsTitleBtn = document.querySelectorAll(selectBtn);
    const surfaceSelectList = document.querySelectorAll(selectList);
    const surfaceSelectListMember = document.querySelectorAll(selectListText);
    const selectWrappers = document.querySelectorAll(selectHiddenBox); //셀렉박스
  

    let answer = "";
    let checkAnswer = "";

    surfaceSelectsTitleBtn.forEach((btns, index) => {
          
       btns.addEventListener("click" , () => {
         const nextSiblings = btns.nextElementSibling;
         const checkBoxBtns = btns.children;

         //지상권내역조회의 지목셀렉버튼내에 span이 있으면 닫히지 말아라
         if(checkBoxBtns.length > 0){
            btns.classList.remove("active");
          }

         surfaceSelectsTitleBtn.forEach((otherBtn) => {
          if (otherBtn !== btns) {
            otherBtn.classList.remove("active");
          }
         });
         btns.classList.toggle("active");
         nextSiblings.classList.toggle("active");
    
          //surfaceSelectList관련 toggle버튼
//          surfaceSelectList.forEach((box, boxIndex) => {
//          //셀렉버튼의 인덱스와  surfaceSelectList 인덱스번호가 일치하면 메뉴를 오픈하고, btn에 active를 포함
//          if (index === boxIndex) {
//             box.classList.toggle(
//                "active",
//                btns.classList.contains("active")
//             );
//          } else {
//             //그렇지 않으면 메뉴닫기
//             box.classList.remove("active");
//          }
//          });
    
       });
      

       //지목셀렉박스내의 닫기 버튼 클릭시 이벤트 , 선택 등록 클릭 시 닫기
       const closeSelectCheckBtn = document.querySelector(".checkboxRegisterBtnWrap .closeSelectCheckBtn");
       if(closeSelectCheckBtn){
        closeSelectCheckBtn.addEventListener("click" , (e) => {
            const target = e.target.parentElement.parentElement.previousElementSibling;
            const closestBtn = target.previousElementSibling; 
            target.classList.remove("active");
            closestBtn.classList.remove("active");
        })
       }
       //지목셀렉박스내의 닫기 버튼 클릭시 이벤트
       const completeSelectCheckBtn = document.querySelector(".checkboxRegisterBtnWrap .completeSelectCheckBtn");
       if(completeSelectCheckBtn){
         completeSelectCheckBtn.addEventListener("click" , (e) => {
             const target = e.target.parentElement.parentElement.previousElementSibling;
             const closestBtn = target.previousElementSibling;
             target.classList.remove("active");
             closestBtn.classList.remove("active");
        })
       }
 
       surfaceSelectList.forEach((list) => {
          list.addEventListener("click" , (event) => {
           
            const thisBtns = event.target.parentElement.parentElement.parentElement.previousElementSibling;
            const selectContent =  event.target.parentElement.parentElement.parentElement.parentElement.previousElementSibling.children[0];//셀렉박스
            let currentSelect = selectContent.getAttribute("id");//셀렉박스아이디 가져오기
            
            if (event.target.nodeName === "P") {

                //지목셀렉박스 클릭시
                if( currentSelect === "surfaceInquireSelectBox01_6"){
                    return surfaceSelectsTitleBtn.forEach((btn) => btn.classList.remove("active")),
                    surfaceSelectList.forEach((lists) => lists.classList.remove("active"));
                }
                else if(currentSelect === "menuHiddenSelectBox01_4"){
                }
                else{ 
                    let currentSelectValue = document.getElementById(currentSelect); //현재 셀렉박스 가져오기
                    return thisBtns.innerText = event.target.innerText,
                    $(currentSelectValue).val(event.target.innerText),//셀렉박스 값에 현재 클릭된 값의 텍스트 담기
                    $(currentSelectValue).trigger("change"),
                    console.log(currentSelectValue.value), //셀렉박스값표시
                    surfaceSelectsTitleBtn.forEach((btn) => btn.classList.remove("active")),
                    surfaceSelectList.forEach((lists) => lists.classList.remove("active"));
                }
            }
                
            if(event.target.nodeName === "LABEL" || event.target.nodeName === "INPUT[TYPE='CHECKBOX']" ){ return; }


      });

    });
    
    
    })
}


export { surfaceInquireSelectEvet , surfaceInquireCheckboxes}