
/* 라디오버튼 클릭시 각 영역 사용여부  */

const issueManageRadioEvet = () => {
 
   const issueManageRadio01 = document.getElementsByName("issueManageRadio01");

   const searchInputBox01 = document.querySelector("#dopcoIssueManage .searchInputBox01");
   const menuAdderssInput01 = document.querySelector("#dopcoIssueManage .menuAdderssInput01");
   const selectRadioEvet01 = document.querySelectorAll("#dopcoIssueManage .menuRadioEvet01 .issueManageSelectsTitleBtn");




    //민원관리조회
    if(issueManageRadio01){

       issueManageRadio01.forEach((radioBtns, index) => {

                //초기값
                issueManageRadio01[0].checked = "true";
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

issueManageRadioEvet();