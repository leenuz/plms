//총 검색건수 page버튼 클릭시 불들어오게하기
      const pageCountEvet = () => {

        const pageCountBtn = document.querySelectorAll(".boardPageBoxs .pageCountBoxs p");
        pageCountBtn.forEach((btn) => {
             pageCountBtn[0].classList.add("active");
             btn.addEventListener(("click") , () => {
                   pageCountBtn.forEach((otherBtn) => { otherBtn.classList.remove("active"); })
                   btn.classList.toggle("active");
             })

        })   
 }
 pageCountEvet();