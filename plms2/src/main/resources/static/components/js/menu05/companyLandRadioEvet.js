
/* 라디오버튼 클릭시 각 영역 사용여부  */

const companyLandRadioEvet = () => {
 
   const companyLandRadio01 = document.getElementsByName("companyLandRadio01");
   const companyLandRadio02 = document.getElementsByName("companyLandRadio02");

   const searchInputBox01 = document.querySelector("#dopcoCompanyLand01 .searchInputBox01");
   const menuAdderssInput01 = document.querySelector("#dopcoCompanyLand01 .menuAdderssInput01");
   const selectRadioEvet01 = document.querySelectorAll("#dopcoCompanyLand01 .menuRadioEvet01 .companyLandSelectsTitleBtn");

   const searchInputBox02 = document.querySelector("#dopcoCompanyLand02 .searchInputBox02");
   const menuAdderssInput02 = document.querySelector("#dopcoCompanyLand02 .menuAdderssInput02");
   const selectRadioEvet02 = document.querySelectorAll("#dopcoCompanyLand02 .menuRadioEvet02 .companyLandSelectsTitleBtn");



    //회사토지조회
    if(companyLandRadio01){

        companyLandRadio01.forEach((radioBtns, index) => {

                //초기값
                companyLandRadio01[0].checked = "true";
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

        //회사토지처분
        if(companyLandRadio02){

            companyLandRadio02.forEach((radioBtns, index) => {

                    //초기값
                    companyLandRadio02[0].checked = "true";
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



}

companyLandRadioEvet();