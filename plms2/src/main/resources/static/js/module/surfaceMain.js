import { surfaceHeaderEvet } from './surfaceHeader.js';
import { surfaceSelectEvet , handleCheckboxes } from './surfaceSelectEvet.js';


window.addEventListener("load" , () => {


      //header함수 실행
      surfaceHeaderEvet();

     //송유관로현황내 URL에 따라 셀렉박스 작동
      const selecBoxsEvetWrappers = () => {


            const pathName = window.location.pathname;
            console.log(pathName, 'main에서 표출');

            if(pathName === `/songyu/menu01`){
            const companyland01 = document.getElementsByName("companyland01");
            return surfaceSelectEvet("#dopcoSurfacePart .surfaceSelectsTitleBtn" ,"#dopcoSurfacePart .sufaceSelectList"),
            handleCheckboxes(companyland01)
            }
            else if(pathName === `/songyu/menu02`){
            const companyland02 = document.getElementsByName("companyland02");
            return surfaceSelectEvet("#dopcoSurfacePart02 .surfaceSelectsTitleBtn" ,"#dopcoSurfacePart02 .sufaceSelectList"),
            handleCheckboxes(companyland02);
            }
            else if(pathName === `/songyu/menu03`){
             const companyland03 = document.getElementsByName("companyland03");
             return surfaceSelectEvet("#dopcoSurfacePart03 .surfaceSelectsTitleBtn" ,"#dopcoSurfacePart03 .sufaceSelectList"),
             handleCheckboxes(companyland03);
            }



      }

      selecBoxsEvetWrappers();


})


