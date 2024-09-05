// 커스텀 selectbox

const createCustomLiRightChangeStat = () => {
    const contentItems = document.querySelectorAll('.selectContentArea');

    contentItems.forEach(contentItem => {

        if (contentItem.classList.contains('passedSelect')) {
            return ;
        }

        const notsetAddSelectBox = contentItem.querySelector('select');
        // select가 없으면 return
        if (!notsetAddSelectBox) return;

        const customSelectBox = contentItem.querySelector('.customSelectBox');
        const customSelectBtns = customSelectBox.querySelector('.customSelectBtns');

        for (let i = 0; i < notsetAddSelectBox.length; i++) {
            const optionValue = notsetAddSelectBox.options[i].value;
            const li = document.createElement('li');
            const button = document.createElement('button');
            button.classList.add('moreSelectBtn');
            button.type = 'button';
            button.textContent = optionValue;
            li.appendChild(button);
            customSelectBtns.appendChild(li);
        }

        // 중복 안되게 만들기
        const customSelectLi = customSelectBtns.querySelectorAll('li');

        if (customSelectLi.length>0) {
            contentItem.classList.add('passedSelect');
        }


    });
}
createCustomLiRightChangeStat();


const customSelectView = document.querySelectorAll('.customSelectView')

customSelectView.forEach((btn) => {
    btn.addEventListener('click', function () {
        btn.classList.toggle('active');

        if (btn.nextElementSibling) {
            btn.nextElementSibling.classList.toggle('active');

        }
    })
})


// customSelectBtns 리스트 click 했을 때 해당 내용으로 바뀌게하기


const moreSelectBtnEventForRightChangeStat = () => {

    const customSelectBtns = document.querySelectorAll('#rightChangeStat .customSelectBtns');

    customSelectBtns.forEach((btn) => {
        
        btn.addEventListener('click', function(event){
            if (event.target.classList.contains('moreSelectBtn')) {

                const moreBtn = event.target;

                var moreSelectBtnText = moreBtn.innerText;
                console.log(moreSelectBtnText);
                const parentMoreSelectBtn = moreBtn.closest('.customSelectBtns')
                const EditCustomViewBtn = parentMoreSelectBtn.previousElementSibling;

                while (EditCustomViewBtn.firstChild) {
                    EditCustomViewBtn.removeChild(EditCustomViewBtn.firstChild);
                }
                const textNode = document.createTextNode(moreSelectBtnText);
                EditCustomViewBtn.appendChild(textNode);

                EditCustomViewBtn.classList.remove('active')
                parentMoreSelectBtn.classList.remove('active')


                // 선택한 걸 select의 value값으로 변경하기

                const nearByContent = moreBtn.closest('.selectContentArea');
                const nearBySelectBox = nearByContent.querySelector('select');
                nearBySelectBox.value = moreBtn.textContent;
                console.log(`Selected value: ${nearBySelectBox.value}`);
            }
        })
    })

}

moreSelectBtnEventForRightChangeStat();

// 현재 연도를 구하는 방법
const findYearForRightChangeStat = () => {
    const currentYear = new Date().getFullYear();
    console.log(currentYear);
    const yearBox = [];

    for (let x = 0; x<= 4 ; x++) {
        yearBox.push(currentYear - x);
    };
    console.log(yearBox);

    const yearboxSelectBox = document.querySelectorAll('select.getYearSelectBox');

    yearboxSelectBox.forEach((select) => {

        for (let z = 0 ; z<5 ; z++) {
            const yearOptuion = document.createElement('option');
    
            yearOptuion.textContent = yearBox[4-z]+'년';
            yearOptuion.value = yearBox[4-z]+'년';
    
            select.appendChild(yearOptuion);
        }
        createCustomLiRightChangeStat();
    })
    
}
findYearForRightChangeStat();

// 월을 구하는 방법

const findMonthForRightChangeStat = () => {
    const monthSelectBox = document.querySelectorAll('select.getMonthSelectBox');

    monthSelectBox.forEach((monthSelect) => {
        for (let y = 1; y<= 12 ; y++) {
            const monthOption = document.createElement('option');

            monthOption.textContent = y +'월';
            monthOption.value = y +'월' ;
            

            monthSelect.appendChild(monthOption);
        };

        createCustomLiRightChangeStat();
    });

};
findMonthForRightChangeStat();

// 필지정보 팝업
//const rightChangeStatPopEvet = () => {
//
//    const parcelPopupOpen = document.querySelectorAll("#rightChangeStat .parcelNumArea");
//    const rightChangeStatParcelPopWrapper = document.querySelector(".rightChangeStatParcelPopWrapper");
//    let approvalFilePath = '/components/popuphtml/superficies_statistics_Popup/pilji_info_Popup.html'; // 잠재이슈 등록 필지 조회
//
//    if (parcelPopupOpen) {
//
//        let xhr = new XMLHttpRequest();
//        xhr.open('GET', approvalFilePath, true);
//        xhr.onreadystatechange = function () {
//            if (xhr.readyState == 4 && xhr.status == 200) {
//                rightChangeStatParcelPopWrapper.innerHTML = xhr.responseText;
//                runScriptsInElement(rightChangeStatParcelPopWrapper); // 삽입된 html내 스크립트 실행 함수 호출
//            }
//        };
//        xhr.send();
//        console.log('rightChangeStatParcelPopWrapper 작동');
//
//        parcelPopupOpen.forEach((parcelpopOpen) => {
//            parcelpopOpen.addEventListener('click', function () {
//
//                const popupOpen = document.getElementById("pilji_info_Popup");
//                if (popupOpen) {
//
//                    popupOpen.classList.add("active");
//                }
//            })
//        });
//
//        // 삽입된 html내 스크립트 실행 함수
//        const runScriptsInElement = (element) => {
//            const scripts = element.getElementsByTagName('script');
//            for (let i = 0; i < scripts.length; i++) {
//                const script = document.createElement('script');
//                script.textContent = scripts[i].textContent;
//                document.body.appendChild(script).parentNode.removeChild(script);
//            }
//        }
//
//
//    }
//
//}
//
//rightChangeStatPopEvet();


$(document).on("click",".parcelNumArea",function(){

						  const popupOpen = document.querySelector("#searchResultsPopup .popupWrap");
						  	   $(popupOpen).addClass("open");
						  	   popupOpen.classList.add("active");

				   	   	});

$(document).on("click",".topCloseBtn",function(){

	var targetDiv=$("#searchResultPopDiv").parent().find("#searchResultPopup").find(".popupWrap");
	$(".popupWrap").removeClass("active");
//	$(".popupWrap").toggleClass("active");
});

$(document).on("click","#popupCloseBtn",function(){

	var targetDiv=$("#searchResultPopDiv").parent().find("#searchResultPopup").find(".popupWrap");
	$(".popupWrap").removeClass("active");
//	$(".popupWrap").toggleClass("active");
});