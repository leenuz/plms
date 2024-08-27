//총 검색건수 a 링크 관련 이벤트 
const dataContentLinkEvet = () => {
       
    const dataBoxsSecondLink = document.querySelectorAll(".dataBoxsSecond .dataContent a");
    const dataBoxsFirstLink = document.querySelectorAll(".dataBoxsFirst .dataContent a");
  

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
                  const findLink = link.getElementsByClassName("ForLink")[0];
                   if(findLink){
                     const LinkText = findLink.children[0].innerText;
                     const newStr = String(LinkText.trim());
                     if(newStr === '지상권'){
                           link.setAttribute("href" , "/components/subHtml/menu01/groundDetail.html");
                     }else if(newStr === '점용'){
                           link.setAttribute("href" , "/components/subHtml/menu01/occupationDetails.html");
                     }else if(newStr === '미설정'){
                           link.setAttribute("href" , "/components/subHtml/menu01/unsetOccupationDetails.html");
                     }else if(newStr === '회사토지'){
                           link.setAttribute("href" , "/components/subHtml/menu01/companyLandDetails.html");
                     }else{
                           link.setAttribute("href" , "");
                     }
               }
                }
          
                initialLinks();

          link.addEventListener("mouseover" , () => {
               const findLink = link.getElementsByClassName("ForLink")[0];
               if(findLink){
                     const LinkText = findLink.children[0].innerText;
                     const newStr = String(LinkText.trim());
                     if(newStr === '지상권'){
                           link.setAttribute("href" , "/components/subHtml/menu01/groundDetail.html");
                     }else if(newStr === '점용'){
                           link.setAttribute("href" , "/components/subHtml/menu01/occupationDetails.html");
                     }else if(newStr === '미설정'){
                           link.setAttribute("href" , "/components/subHtml/menu01/unsetOccupationDetails.html");
                     }else if(newStr === '회사토지'){
                           link.setAttribute("href" , "/components/subHtml/menu01/companyLandDetails.html");
                     }else{
                           link.setAttribute("href" , "");
                     }
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
  dataContentLinkEvet();
