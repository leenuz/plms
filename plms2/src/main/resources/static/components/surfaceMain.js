import { surfaceHeaderEvet } from './surfaceHeader.js';
import { surfaceSelectEvet , handleCheckboxes } from './js/surfaceSelectEvet.js';
import { surfaceInquireSelectEvet , surfaceInquireCheckboxes } from './js/menu02/surfaceInquireSelectEvet.js';
import { privateUseSelectEvet } from './js/menu03/privateUseSelecEvet.js';
import { landDevelopmentManageSelectEvet } from './js/menu04/landDevelopmentSelecEvet.js';
import { companyLandSelectEvet } from './js/menu05/companyLandSelecEvet.js';
import { issueManageSelectEvet } from './js/menu06/issueManageSelecEvet.js'

window.addEventListener("load" , () => {


      //header함수 실행
      surfaceHeaderEvet();

     //URL에 따라 셀렉박스 작동
      const selecBoxsEvetWrappers = () => {


            const pathName = window.location.pathname;
            console.log(pathName, 'main에서 표출');
            //송유관로현황
            if(pathName === `/components/subHtml/menu01/menu01_1.html`){
            const companyland01 = document.getElementsByName("companyland01");
            return surfaceSelectEvet("#dopcoSurfacePart .surfaceSelectsTitleBtn" ,"#dopcoSurfacePart .sufaceSelectList", "#dopcoSurfacePart .sufaceSelectList .surfaceSelectListMember" , ".menuHiddenSelect01" , "companyland01"),
            handleCheckboxes(companyland01)
                 
            }
            else if(pathName === `/components/subHtml/menu01/menu01_2.html`){
            const companyland02 = document.getElementsByName("companyland02");
            return surfaceSelectEvet("#dopcoSurfacePart02 .surfaceSelectsTitleBtn" ,"#dopcoSurfacePart02 .sufaceSelectList" ,"#dopcoSurfacePart02 .sufaceSelectList .surfaceSelectListMember" , ".menuHiddenSelect02" , "companyland02"),
            handleCheckboxes(companyland02);
            }
            else if(pathName === `/components/subHtml/menu01/menu01_3.html`){
             const companyland03 = document.getElementsByName("companyland03");
             return surfaceSelectEvet("#dopcoSurfacePart03 .surfaceSelectsTitleBtn" ,"#dopcoSurfacePart03 .sufaceSelectList"  ,"#dopcoSurfacePart03 .sufaceSelectList .surfaceSelectListMember" , ".menuHiddenSelect03" , "companyland03"),
             handleCheckboxes(companyland03);
            }
            //지상권
            else if(pathName === `/components/subHtml/menu02/menu02_1.html`){
                  const inquireCheckCont01 = document.getElementsByName("inquireCheckCont01");
                  return  surfaceInquireSelectEvet("#dopcosurfaceInquire .surfaceInquireSelectsTitleBtn" ,"#dopcosurfaceInquire .sufaceSelectList"  ,"#dopcosurfaceInquire .sufaceSelectList .surfaceSelectListMember" , ".surfaceInquireHiddenSelect01" , "inquireCheckCont01"),
                  surfaceInquireCheckboxes(inquireCheckCont01);
                  
            }else if(pathName === `/components/subHtml/menu02/menu02_2.html`){
                  return surfaceInquireSelectEvet("#dopcosurfaceInquire02 .surfaceInquireSelectsTitleBtn" ,"#dopcosurfaceInquire02 .sufaceSelectList"  ,"#dopcosurfaceInquire02 .sufaceSelectList .surfaceSelectListMember" , ".surfaceInquireHiddenSelect02");
            
            }else if(pathName === `/components/subHtml/menu02/menu02_3.html`){
                  return surfaceInquireSelectEvet("#dopcosurfaceInquire03 .surfaceInquireSelectsTitleBtn" ,"#dopcosurfaceInquire03 .sufaceSelectList"  ,"#dopcosurfaceInquire03 .sufaceSelectList .surfaceSelectListMember" , ".surfaceInquireHiddenSelect03");
            
            }else if(pathName === `/components/subHtml/menu02/menu02_4.html`){
                  return surfaceInquireSelectEvet("#dopcosurfaceInquire04 .surfaceInquireSelectsTitleBtn" ,"#dopcosurfaceInquire04 .sufaceSelectList"  ,"#dopcosurfaceInquire04 .sufaceSelectList .surfaceSelectListMember" , ".surfaceInquireHiddenSelect04");
            
            }else if(pathName === `/components/subHtml/menu02/menu02_5.html`){
                  return surfaceInquireSelectEvet("#dopcosurfaceInquire05 .surfaceInquireSelectsTitleBtn" ,"#dopcosurfaceInquire05 .sufaceSelectList"  ,"#dopcosurfaceInquire05 .sufaceSelectList .surfaceSelectListMember" , ".surfaceInquireHiddenSelect05");
            
            }//점용
            else if(pathName === `/components/subHtml/menu03/menu03_1.html`){
                  return privateUseSelectEvet("#dopcoPrivateUse01 .privateUseSelectsTitleBtn" ,"#dopcoPrivateUse01 .sufaceSelectList"  ,"#dopcoPrivateUse01 .sufaceSelectList .surfaceSelectListMember" , ".privateUseHiddenSelect01");
            }else if(pathName === `/components/subHtml/menu03/menu03_2.html`){
                  return privateUseSelectEvet("#dopcoPrivateUse02 .privateUseSelectsTitleBtn" ,"#dopcoPrivateUse02 .sufaceSelectList"  ,"#dopcoPrivateUse02 .sufaceSelectList .surfaceSelectListMember" , ".privateUseHiddenSelect02");
            }else if(pathName === `/components/subHtml/menu03/menu03_3.html`){
                  return privateUseSelectEvet("#dopcoPrivateUse03 .privateUseSelectsTitleBtn" ,"#dopcoPrivateUse03 .sufaceSelectList"  ,"#dopcoPrivateUse03 .sufaceSelectList .surfaceSelectListMember" , ".privateUseHiddenSelect03");
            }//토지개발
            else if(pathName === `/components/subHtml/menu04/menu04_1.html`){
                  return landDevelopmentManageSelectEvet("#dopcoLandDevelopmentManage .landDevelopmentManageSelectsTitleBtn" ,"#dopcoLandDevelopmentManage .sufaceSelectList"  ,"#dopcoLandDevelopmentManage .sufaceSelectList .surfaceSelectListMember" , ".landDevelopmentManageHiddenSelect");
            }//회사토지
            else if(pathName === `/components/subHtml/menu05/menu05_1.html`){
                  return companyLandSelectEvet("#dopcoCompanyLand01 .companyLandSelectsTitleBtn" ,"#dopcoCompanyLand01 .sufaceSelectList"  ,"#dopcoCompanyLand01 .sufaceSelectList .surfaceSelectListMember" , ".companyLandHiddenSelect01");
            }else if(pathName === `/components/subHtml/menu05/menu05_2.html`){
                  return companyLandSelectEvet("#dopcoCompanyLand02 .companyLandSelectsTitleBtn" ,"#dopcoCompanyLand02 .sufaceSelectList"  ,"#dopcoCompanyLand02 .sufaceSelectList .surfaceSelectListMember" , ".companyLandHiddenSelect02");
            }//이슈관리
            else if(pathName === `/components/subHtml/menu06/menu06_1.html`){
                  return issueManageSelectEvet("#dopcoIssueManage .issueManageSelectsTitleBtn" ,"#dopcoIssueManage .sufaceSelectList"  ,"#dopcoIssueManage .sufaceSelectList .surfaceSelectListMember" , ".issueManageHiddenSelect");
            }else if(pathName === `/components/subHtml/menu06/codeMgmt.html`){
                  return issueManageSelectEvet("#dopcoIssueManage .issueManageSelectsTitleBtn" ,"#dopcoIssueManage .sufaceSelectList"  ,"#dopcoIssueManage .sufaceSelectList .surfaceSelectListMember" , ".issueManageHiddenSelect");
            }


      }

      selecBoxsEvetWrappers();


})


