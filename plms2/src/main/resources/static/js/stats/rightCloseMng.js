// 커스텀 selectbox

const createCustomLiRightCloseMng = () => {
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
createCustomLiRightCloseMng();


const customSelectView = document.querySelectorAll('.customSelectView')

customSelectView.forEach((btn) => {
    btn.addEventListener('click', function () {
        btn.classList.toggle('active');

        if (btn.nextElementSibling) {
            btn.nextElementSibling.classList.toggle('active');

        }
    })
})




const moreBtnEventForRightCloseMng = () => {
    // customSelectBtns 리스트 click 했을 때 해당 내용으로 바뀌게하기


    const customSelectBtns = document.querySelectorAll('#rightCloseMng .customSelectBtns');

    
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
};

moreBtnEventForRightCloseMng();

// 현재 연도를 구하는 방법
const findYear = () => {
    const currentYear = new Date().getFullYear();
    console.log(currentYear);
    const yearBox = [];

    for (let x = 0; x<= 4 ; x++) {
        yearBox.push(currentYear - x);
    };
    console.log(yearBox);

    const yearboxSelectBox = document.getElementById('rightCloseMngSelectBox01_1');

    for (let z = 0 ; z<6 ; z++) {
        const yearOptuion = document.createElement('option');

        if (z == 0) {
            yearOptuion.textContent = '전체';
            yearOptuion.value = '전체';
        } else {            
            yearOptuion.textContent = yearBox[5-z]+'년';
            yearOptuion.value = yearBox[5-z]+'년';
        }

        yearboxSelectBox.appendChild(yearOptuion);
    }

    createCustomLiRightCloseMng();
}
findYear();

// 월을 구하는 방법

const findMonth = () => {
    const monthSelectBox = document.getElementById('rightCloseMngSelectBox01_2');

    for (let y = 0; y<= 12 ; y++) {
        const monthOption = document.createElement('option');

        if (y == 0) {
            monthOption.textContent = '전체';
            monthOption.value = '전체';
        } else {
            monthOption.textContent = y +'월' ;
            monthOption.value = y+'월' ;
        }

        monthSelectBox.appendChild(monthOption);
    }

    createCustomLiRightCloseMng();
}
findMonth();

// 마감처리 팝업


const rightCloseMngOffPopEvet = () => {

    const offBtn = document.querySelector("#rightCloseMng .offBtn");
    const rightCloseMngOffPopWrapper = document.querySelector(".rightCloseMngOffPopWrapper");
    let approvalFilePath = '/components/popuphtml/superficies_statistics_Popup/deadline_Popup.html'; // 마감처리

    if (offBtn) {

        let xhr = new XMLHttpRequest();
        xhr.open('GET', approvalFilePath, true);
        xhr.onreadystatechange = function () {
            if (xhr.readyState == 4 && xhr.status == 200) {
                rightCloseMngOffPopWrapper.innerHTML = xhr.responseText;
                runScriptsInElement(rightCloseMngOffPopWrapper); // 삽입된 html내 스크립트 실행 함수 호출
            }
        };
        xhr.send();
        console.log('rightCloseMngOffPopWrapper 작동');
        offBtn.addEventListener("click", () => {

            const popupOpen = document.getElementById("deadline_Popup");
            if (popupOpen) {

                popupOpen.classList.add("active");
            }

        })

        // 삽입된 html내 스크립트 실행 함수
        const runScriptsInElement = (element) => {
            const scripts = element.getElementsByTagName('script');
            for (let i = 0; i < scripts.length; i++) {
                const script = document.createElement('script');
                script.textContent = scripts[i].textContent;
                document.body.appendChild(script).parentNode.removeChild(script);
            }
        }


    }

}

rightCloseMngOffPopEvet();