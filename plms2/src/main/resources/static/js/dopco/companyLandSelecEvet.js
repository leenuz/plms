/* 셀렉트박스 함수 */

const companyLandSelectEvet = (selectBtn, selectList , selectListText , selectHiddenBox) => {

   const surfaceSelectsTitleBtn = document.querySelectorAll(selectBtn);
   const surfaceSelectList = document.querySelectorAll(selectList);
   const surfaceSelectListMember = document.querySelectorAll(selectListText);
   const selectWrappers = document.querySelectorAll(selectHiddenBox); //셀렉박스
 

   let answer = "";

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

   //셀렉박스 값  li p값에 담기 
   for(let i = 0; i <= selectWrappers.length - 1; i++){
   
       const selectValues = selectWrappers[i].children; //셀렉박스옵션값 

       for(let x = 0; x <= selectValues.length - 1; x++){

           answer += `<li><p>${selectValues[x].value}</p></li>`;

       }

       surfaceSelectListMember[i].innerHTML = answer;
       answer = '';
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

                   let currentSelectValue = document.getElementById(currentSelect); //현재 셀렉박스 가져오기
                   return thisBtns.innerText = event.target.innerText,
                   $(currentSelectValue).val(event.target.innerText),//셀렉박스 값에 현재 클릭된 값의 텍스트 담기 
                   console.log(currentSelectValue.value), //셀렉박스값표시
                   surfaceSelectsTitleBtn.forEach((btn) => btn.classList.remove("active")),
                   surfaceSelectList.forEach((lists) => lists.classList.remove("active"));
         }
               
     });

   });
   
   
   })
}


export { companyLandSelectEvet }