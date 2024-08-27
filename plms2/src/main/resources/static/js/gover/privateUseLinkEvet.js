//총 검색건수 a 링크 관련 이벤트 
const privateUseLinkEvet = () => {
       
   const dataBoxsSecondLink = document.querySelectorAll(".dataBoxsSecond03 .dataContent a.linkCont");
   const dataBoxsFirstLink = document.querySelectorAll(".dataBoxsFirst03 .dataContent a.linkCont");
 

  if(dataBoxsSecondLink){

   //현재 보여지는 데이터가 10개 이상이면 스크롤이 발생
   const linkContentIndex = dataBoxsSecondLink.length;
   const linkTitleIndex = dataBoxsFirstLink.length;

   if(linkContentIndex > 0 || linkTitleIndex > 0){
      const dataBoxswrappers = document.querySelector(".dataBoxswrappers");

            if(linkContentIndex > 10 || linkTitleIndex > 10){
                  dataBoxswrappers.classList.add("scroll")
            }else{
                  dataBoxswrappers.classList.remove("scroll")
            }
            
   }

   //dataBoxsSecond a링크 마우스 오버시
   dataBoxsSecondLink.forEach((link, index) => {
      
      //최초값설정
      const initialLinks = () => {
        link.setAttribute("href" , "/components/subHtml/menu03/masterEdit.html"); //점용마스터수정
        const otherLink = link.parentElement;
         //점용 납부/전자결재
         if(otherLink.classList.contains("privateLink02")){
            link.setAttribute("href" , "/components/subHtml/menu03/feeDetail.html"); //점용납부전자결재에서 클릭시 상세정보로 이동
      
          //점용료 내역해지
          }else if(otherLink.classList.contains("privateLink03")){
            link.setAttribute("href" , "/components/subHtml/menu03/useDetail.html"); 
          }
      }

      initialLinks();

         link.addEventListener("mouseover" , () => {

                const otherLink = link.parentElement;
                link.setAttribute("href" , "/components/subHtml/menu03/masterEdit.html"); //점용마스터수정

                 //점용 납부/전자결재
                 if(otherLink.classList.contains("privateLink02")){
                  link.classList.add("mouseEvet");
                  link.setAttribute("href" , "/components/subHtml/menu03/feeDetail.html"); //점용납부전자결재에서 클릭시 상세정보로 이동
            
                //점용료 내역해지
                }else if(otherLink.classList.contains("privateLink03")){
                  link.classList.add("mouseEvet");
                  link.setAttribute("href" , "/components/subHtml/menu03/useDetail.html"); 
                }


              //dataBoxsSecond의 a링크 전체에 불끄고 현재 a링크에만 불들어오게하기
              dataBoxsSecondLink.forEach((otherLink) => otherLink.classList.remove("mouseEvet"));
               link.classList.add("mouseEvet");

              //dataBoxsSecond의 a링크와 dataBoxsFirstLink a링크의 인덱스 일치시 dataBoxsFirstLink a 불들어오게 하기
               dataBoxsFirstLink.forEach((list, otherIndex) => {
                    if(index == otherIndex){
                        
                          dataBoxsFirstLink[index].classList.add("mouseEvet" , link.classList.contains("mouseEvet"));
                         
                    }else{
                          list.classList.remove("mouseEvet")
                    }

                    });
               }
         )

         link.addEventListener("mouseout" , () => {
               link.classList.remove("mouseEvet");
               dataBoxsFirstLink.forEach((list) => {list.classList.remove("mouseEvet")})
         })
  })

}

if(dataBoxsFirstLink){
 //dataBoxsFirst a링크 마우스 오버시
  dataBoxsFirstLink.forEach((link, index) => {
     
         link.addEventListener("mouseover" , () => {
              //dataBoxsSecond의 a링크 전체에 불끄고 현재 a링크에만 불들어오게하기
              dataBoxsFirstLink.forEach((otherLink) => otherLink.classList.remove("mouseEvet"));
              link.classList.add("mouseEvet");
              //dataBoxsSecond의 a링크와 dataBoxsFirstLink a링크의 인덱스 일치시 dataBoxsFirstLink a 불들어오게 하기
              dataBoxsSecondLink.forEach((list, otherIndex) => {
                    if(index == otherIndex){
                          dataBoxsSecondLink[index].classList.add("mouseEvet" , link.classList.contains("mouseEvet"));
                          const findLink = list.getAttribute("href");
                          link.setAttribute("href" , findLink);

                          const otherLink = list.parentElement;

                         //점용 납부/전자결재
                          if(otherLink.classList.contains("privateLink02")){ 
                              link.setAttribute("href" , "/components/subHtml/menu03/feeDetail.html");
                          }
                         //점용료 내역해지
                          else if(otherLink.classList.contains("privateLink03")){
                              link.setAttribute("href" , "/components/subHtml/menu03/useDetail.html");
                              
                            }

                    }else{
                          list.classList.remove("mouseEvet")
                    }

                    });
               }
         )

         link.addEventListener("mouseout" , () => {
            link.classList.remove("mouseEvet");
            dataBoxsSecondLink.forEach((list) => {list.classList.remove("mouseEvet")})
         })
  })

 }
 }

 privateUseLinkEvet();


//달력 input클릭시 컬러변경 이벤트
const privateDateBoxsClicEvet = () => {

      const dateListBox = document.querySelectorAll(".dateListBox input[type='date']");
      if(dateListBox){
           dateListBox.forEach((btn) => {
                 btn.addEventListener("click", (e) => {
                       const current = e.target.parentElement;
                       if(current.classList.contains("active")){
                          return current.classList.remove("active");
                       }
                       current.classList.add("active");
                            
                     })
           })
          
      }
}

privateDateBoxsClicEvet();