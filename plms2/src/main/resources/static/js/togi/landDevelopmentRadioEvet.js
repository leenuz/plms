
/* 라디오버튼 클릭시 각 영역 사용여부  */

const landDevelopmentRadioEvet = () => {
 
   const landDevelopmentManageRadio01 = document.getElementsByName("landDevelopmentManageRadio01");

   const searchInputBox01 = document.querySelector("#dopcoLandDevelopmentManage .searchInputBox01");
   const menuAdderssInput01 = document.querySelector("#dopcoLandDevelopmentManage .menuAdderssInput01");
   const selectRadioEvet01 = document.querySelectorAll("#dopcoLandDevelopmentManage .menuRadioEvet01 .landDevelopmentManageSelectsTitleBtn");



   //토지개발관리
   if(landDevelopmentManageRadio01){

      landDevelopmentManageRadio01.forEach((radioBtns, index) => {

               //초기값
               landDevelopmentManageRadio01[0].checked = "true";
               searchInputBox01.readOnly = false;
               menuAdderssInput01.readOnly = true;
               selectRadioEvet01.forEach((btns) => btns.disabled = true);

         radioBtns.addEventListener("change" , () => {
             if(radioBtns.checked){
              if(index === 0){
                  return  searchInputBox01.readOnly = false,
                  menuAdderssInput01.readOnly = true,
                  selectRadioEvet01.forEach((btns) => btns.disabled = true);

              }else if(index === 1){
                  return searchInputBox01.readOnly = true,
                  menuAdderssInput01.readOnly = false,
                  selectRadioEvet01.forEach((btns) => btns.disabled = false);
              }else{
              }
             }
         })
      })
     }



}

landDevelopmentRadioEvet();