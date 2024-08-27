
/* 라디오버튼 클릭시 각 영역 사용여부  */

const menu03RadioEvet = () => {
 
   const privateUseRadio01 = document.getElementsByName("privateUseRadio01");
   const privateUseRadio02 = document.getElementsByName("privateUseRadio02");
   const privateUseRadio03 = document.getElementsByName("privateUseRadio03");

   const searchInputBox01 = document.querySelector("#dopcoPrivateUse01 .searchInputBox01");
   const menuAdderssInput01 = document.querySelector("#dopcoPrivateUse01 .menuAdderssInput01");
   const selectRadioEvet01 = document.querySelectorAll("#dopcoPrivateUse01 .menuRadioEvet01 .privateUseSelectsTitleBtn");

   const searchInputBox02 = document.querySelector("#dopcoPrivateUse02 .searchInputBox02");
   const menuAdderssInput02 = document.querySelector("#dopcoPrivateUse02 .menuAdderssInput02");
   const selectRadioEvet02 = document.querySelectorAll("#dopcoPrivateUse02 .menuRadioEvet02 .privateUseSelectsTitleBtn");

   const searchInputBox03 = document.querySelector("#dopcoPrivateUse03 .searchInputBox03");
   const menuAdderssInput03 = document.querySelector("#dopcoPrivateUse03 .menuAdderssInput03");
   const selectRadioEvet03 = document.querySelectorAll("#dopcoPrivateUse03 .menuRadioEvet03 .privateUseSelectsTitleBtn");


   //점용마스터
   if(privateUseRadio01){

      privateUseRadio01.forEach((radioBtns, index) => {

               //초기값
               privateUseRadio01[0].checked = "true";
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

     //점용 납부/전자결재
     if(privateUseRadio02){


      privateUseRadio02.forEach((radioBtns, index) => {
                //초기값
                privateUseRadio02[0].checked = "true";
                searchInputBox02.readOnly = false;
                menuAdderssInput02.readOnly = true;
                selectRadioEvet02.forEach((btns) => btns.disabled = true);

         radioBtns.addEventListener("change" , () => {
             if(radioBtns.checked){
              if(index === 0){
                  return  searchInputBox02.readOnly = false,
                  menuAdderssInput02.readOnly = true,
                  selectRadioEvet02.forEach((btns) => btns.disabled = true);

              }else if(index === 1){
                  return searchInputBox02.readOnly = true,
                  menuAdderssInput02.readOnly = false,
                  selectRadioEvet02.forEach((btns) => btns.disabled = false);
              }else{
              }
             }
         })
      })
     }

     //점용료내역해지
     if(privateUseRadio03){


        privateUseRadio03.forEach((radioBtns, index) => {
                  //초기값
                  privateUseRadio03[0].checked = "true";
                  searchInputBox03.readOnly = false;
                  menuAdderssInput03.readOnly = true;
                  selectRadioEvet03.forEach((btns) => btns.disabled = true);
  
           radioBtns.addEventListener("change" , () => {
               if(radioBtns.checked){
                if(index === 0){
                    return  searchInputBox03.readOnly = false,
                    menuAdderssInput03.readOnly = true,
                    selectRadioEvet03.forEach((btns) => btns.disabled = true);
  
                }else if(index === 1){
                    return searchInputBox03.readOnly = true,
                    menuAdderssInput03.readOnly = false,
                    selectRadioEvet03.forEach((btns) => btns.disabled = false);
                }else{
                }
               }
           })
        })
       }
    



}

menu03RadioEvet();