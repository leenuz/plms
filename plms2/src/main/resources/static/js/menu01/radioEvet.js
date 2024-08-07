
/* 라디오버튼 클릭시 각 영역 사용여부  */

const menu01RadioEvet = () => {
 
    const menuRadioNames01 = document.getElementsByName("askMenu01");
    const menuRadioNames02 = document.getElementsByName("askMenu02");
    const menuRadioNames03 = document.getElementsByName("askMenu03");

    const searchInputBox01 = document.querySelector(".searchInputBox01");
    const menuAdderssInput01 = document.querySelector(".menuAdderssInput01");
    const selectRadioEvet01 = document.querySelectorAll(".menuRadioEvet01 .surfaceSelectsTitleBtn");

    const searchInputBox02 = document.querySelector(".searchInputBox02");
    const menuAdderssInput02 = document.querySelector(".menuAdderssInput02");
    const selectRadioEvet02 = document.querySelectorAll(".menuRadioEvet02 .surfaceSelectsTitleBtn");

    const searchInputBox03 = document.querySelector(".searchInputBox03");
    const menuAdderssInput03 = document.querySelector(".menuAdderssInput03");
    const selectRadioEvet03 = document.querySelectorAll(".menuRadioEvet03 .surfaceSelectsTitleBtn");

console.log("=========radio=============");
	$(menuRadioNames01[0]).prop('checked',true);
console.log(menuRadioNames01[0]);
    if(menuRadioNames01){
        menuRadioNames01.forEach((radioBtns, index) => {
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

      if(menuRadioNames02){
        menuRadioNames02.forEach((radioBtns, index) => {
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


      if(menuRadioNames03){
        menuRadioNames03.forEach((radioBtns, index) => {
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

menu01RadioEvet();