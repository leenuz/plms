
/* 체크박스 함수 */

const  handleCheckboxes = (checkboxes) =>  {

   const valuesArray = []; //셀렉박스 값 저장할 배열


   Array.from(checkboxes).forEach((checkBtn, index) => {

       //버튼 내 p값 가져오기 
       const values = checkBtn.nextElementSibling.nextElementSibling.innerText;

       checkBtn.addEventListener("change", () => {

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

const surfaceSelectEvet = (selectBtn, selectList , selectListText , selectHiddenBox, checkBoxName) => {

    const surfaceSelectsTitleBtn = document.querySelectorAll(selectBtn);
    const surfaceSelectList = document.querySelectorAll(selectList);
    const surfaceSelectListMember = document.querySelectorAll(selectListText);
    const selectWrappers = document.querySelectorAll(selectHiddenBox); //셀렉박스
  

    let answer = "";
    let checkAnswer = "";

    //셀렉버튼 최초값 함수
    const initialValues = () => {
        if( selectWrappers.length > 0){
         for(let d = 0; d <= selectWrappers.length - 1; d++){

            let selectValuesInitial = selectWrappers[d].children;
            surfaceSelectsTitleBtn[d].innerText = selectValuesInitial[0].value; //셀렉박스의 첫번째 값들이 surfaceSelectsTitleBtn값의 첫 값이 됨
            selectWrappers[d].value = surfaceSelectsTitleBtn[d].innerText; //셀렉박스의 value값을 surfaceSelectsTitleBtn값으로 설정
         
        }
      }
    }

    if(selectWrappers.length > 0){

    initialValues();//최초의값

    //체크박스가 아닐 경우, 셀렉박스 값  li p값에 담기 
    for(let i = 0; i <= selectWrappers.length - 1; i++){
    
        const selectValues = selectWrappers[i].children; //셀렉박스옵션값 

        for(let x = 0; x <= selectValues.length - 1; x++){

            answer += `<li><p>${selectValues[x].value}</p></li>`;

            //체크박스가 있는 경우, 셀렉박스 값 li input p 값 이용
            if(surfaceSelectListMember[i].classList.contains("checkBoxsContent")){ //체크박스
                checkAnswer += `<li>
                <input
                  type="checkbox"
                  id="${checkBoxName}_CheckBox0${x+1}"
                  name="${checkBoxName}" />
                <label for="${checkBoxName}_CheckBox0${x+1}"></label><p>${selectValues[x].value}</p></li>`
            }
        }

        surfaceSelectListMember[i].innerHTML = surfaceSelectListMember[i].classList.contains("checkBoxsContent") ? checkAnswer : answer;
        answer = '';
        checkAnswer = '';
    }
}

    surfaceSelectsTitleBtn.forEach((btns, index) => {
          
       btns.addEventListener("click" , () => {
         const nextSiblings = btns.nextElementSibling;
    
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
      
 
       surfaceSelectList.forEach((list) => {
          list.addEventListener("click" , (event) => {
           
            const thisBtns = event.target.parentElement.parentElement.parentElement.previousElementSibling;
            const selectContent =  event.target.parentElement.parentElement.parentElement.parentElement.previousElementSibling.children[0];//셀렉박스
            let currentSelect = selectContent.getAttribute("id");//셀렉박스아이디 가져오기
            
            if (event.target.nodeName === "P") {

                //권리확보현황, 권리제외필지조회, 권리필지조회 권리확보유형클릭시
                if( currentSelect === "menuHiddenSelectBox01_3" || currentSelect === "menuHiddenSelectBox02_3" ||  currentSelect === "menuHiddenSelectBox03_3"){
                    return surfaceSelectsTitleBtn.forEach((btn) => btn.classList.remove("active")),
                    surfaceSelectList.forEach((lists) => lists.classList.remove("active"));
                }else{ 
                    let currentSelectValue = document.getElementById(currentSelect); //현재 셀렉박스 가져오기
                    return thisBtns.innerText = event.target.innerText,
                    $(currentSelectValue).val(event.target.innerText),//셀렉박스 값에 현재 클릭된 값의 텍스트 담기 
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


export { surfaceSelectEvet, handleCheckboxes }