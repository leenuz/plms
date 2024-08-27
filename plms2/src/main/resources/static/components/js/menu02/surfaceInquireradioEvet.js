
/* 라디오버튼 클릭시 각 영역 사용여부  */

const menu02RadioEvet = () => {
 
   const surfaceInquireRadio01 = document.getElementsByName("surfaceInquireRadio01");
   const surfaceInquireRadio02 = document.getElementsByName("surfaceInquireRadio02");
   const surfaceInquireRadio03 = document.getElementsByName("surfaceInquireRadio03");
   const surfaceInquireRadio04 = document.getElementsByName("surfaceInquireRadio04");
   const surfaceInquireRadio05 = document.getElementsByName("surfaceInquireRadio05");

   const searchInputBox01 = document.querySelector("#dopcosurfaceInquire .searchInputBox01");
   const menuAdderssInput01 = document.querySelector("#dopcosurfaceInquire .menuAdderssInput01");
   const selectRadioEvet01 = document.querySelectorAll("#dopcosurfaceInquire .menuRadioEvet01 .surfaceInquireSelectsTitleBtn");

   const searchInputBox02 = document.querySelector("#dopcosurfaceInquire02 .searchInputBox02");
   const menuAdderssInput02 = document.querySelector("#dopcosurfaceInquire02 .menuAdderssInput02");
   const selectRadioEvet02 = document.querySelectorAll("#dopcosurfaceInquire02 .menuRadioEvet02 .surfaceInquireSelectsTitleBtn");

   const searchInputBox03 = document.querySelector("#dopcosurfaceInquire03 .searchInputBox03");
   const menuAdderssInput03 = document.querySelector("#dopcosurfaceInquire03 .menuAdderssInput03");
   const selectRadioEvet03 = document.querySelectorAll("#dopcosurfaceInquire03 .menuRadioEvet03 .surfaceInquireSelectsTitleBtn");

   const searchInputBox04 = document.querySelector("#dopcosurfaceInquire04 .searchInputBox04");
   const menuAdderssInput04 = document.querySelector("#dopcosurfaceInquire04 .menuAdderssInput04");
   const selectRadioEvet04 = document.querySelectorAll("#dopcosurfaceInquire04 .menuRadioEvet04 .surfaceInquireSelectsTitleBtn");

   const searchInputBox05 = document.querySelector("#dopcosurfaceInquire05 .searchInputBox05");
   const menuAdderssInput05 = document.querySelector("#dopcosurfaceInquire05 .menuAdderssInput05");
   const selectRadioEvet05 = document.querySelectorAll("#dopcosurfaceInquire05 .menuRadioEvet05 .surfaceInquireSelectsTitleBtn");


   //지상권내역조회
   if(surfaceInquireRadio01){

      surfaceInquireRadio01.forEach((radioBtns, index) => {

               //초기값
               surfaceInquireRadio01[0].checked = "true";
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

     //지상권내역해지
     if(surfaceInquireRadio02){


      surfaceInquireRadio02.forEach((radioBtns, index) => {
                //초기값
                surfaceInquireRadio02[0].checked = "true";
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

     //지상권분할
     if(surfaceInquireRadio03){
        surfaceInquireRadio03.forEach((radioBtns, index) => {

            //초기값
            surfaceInquireRadio03[0].checked = "true";
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

     //지상권합필
     if(surfaceInquireRadio04){
        surfaceInquireRadio04.forEach((radioBtns, index) => {

           //초기값
           surfaceInquireRadio04[0].checked = "true";
           searchInputBox04.readOnly = false;
           menuAdderssInput04.readOnly = true;
           selectRadioEvet04.forEach((btns) => btns.disabled = true);

         radioBtns.addEventListener("change" , () => {
             if(radioBtns.checked){
              if(index === 0){
                  return  searchInputBox04.readOnly = false,
                  menuAdderssInput04.readOnly = true,
                  selectRadioEvet04.forEach((btns) => btns.disabled = true);

              }else if(index === 1){
                  return searchInputBox04.readOnly = true,
                  menuAdderssInput04.readOnly = false,
                  selectRadioEvet04.forEach((btns) => btns.disabled = false);
              }else{
              }
             }
         })
      })
     }

        //지상권사용승락
        if(surfaceInquireRadio05){
        surfaceInquireRadio05.forEach((radioBtns, index) => {

            //초기값
            surfaceInquireRadio05[0].checked = "true";
            searchInputBox05.readOnly = false,
            menuAdderssInput05.readOnly = true,
            selectRadioEvet05.forEach((btns) => btns.disabled = true);

            radioBtns.addEventListener("change" , () => {
                if(radioBtns.checked){
                if(index === 0){
                    return  searchInputBox05.readOnly = false,
                    menuAdderssInput05.readOnly = true,
                    selectRadioEvet05.forEach((btns) => btns.disabled = true);

                }else if(index === 1){
                    return searchInputBox05.readOnly = true,
                    menuAdderssInput05.readOnly = false,
                    selectRadioEvet05.forEach((btns) => btns.disabled = false);
                }else{
                }
                }
            })
        })
        }
    



}

menu02RadioEvet();