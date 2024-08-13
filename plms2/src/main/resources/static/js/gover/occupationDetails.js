const memoEditBtn = document.querySelectorAll('#occupationDetails .memoSection .editBtn')
const editBefore = document.querySelectorAll('#occupationDetails .memoSection .contents .content.btnBox .editBefore');
const editAfter = document.querySelectorAll('#occupationDetails .memoSection .contents .content.btnBox .editAfter');
const editContent = document.querySelectorAll('#occupationDetails .editSpace');
const registBtn = document.querySelectorAll('#occupationDetails .registBtn');

memoEditBtn.forEach((btn) => {
    btn.addEventListener('click', function () {
        var thisEditContent = btn.closest('.contents');
        console.log(thisEditContent);

        thisEditContent.classList.add('editing');
        
        const inputs = thisEditContent.querySelectorAll('input');

        if (thisEditContent.classList.contains('editing')) {
            inputs.forEach(input => {
                input.removeAttribute('readonly');
            });
        } else {
            inputs.forEach(input => {
                input.setAttribute('readonly', 'readonly');
            });
        }



    })
})

if(registBtn) {
    registBtn.forEach((regiBtn)=> {
        regiBtn.addEventListener('click',function(){

            var thisEditContent01 = regiBtn.closest('.contents');
            thisEditContent01.classList.remove('editing')

            const inputs = thisEditContent01.querySelectorAll('input');
            inputs.forEach(input => {
                input.setAttribute('readonly', 'readonly');
            });
        })
    })
}

/* 잠재이슈 수정 팝업 오픈 */

const occupationIssueReviseOpen = () => {

     const occupationIssueReviseBtn = document.querySelectorAll(".occupationIssueReviseBtn");

       if(occupationIssueReviseBtn){

        const occupationIssueRevisePop = document.querySelector(".occupationIssueReviseWrappers");
        let htmlFilePath = '/components/popuphtml/editIssuePopup.html'; // 삽입할 html 파일 경로
   
        let xhr = new XMLHttpRequest();
        xhr.open('GET', htmlFilePath, true);
        xhr.onreadystatechange = function() {
            if (xhr.readyState == 4 && xhr.status == 200) {
                occupationIssueRevisePop.innerHTML = xhr.responseText;
                runScriptsInElement(occupationIssueRevisePop); // 삽입된 html내 스크립트 실행 함수 호출
            }
        };
        xhr.send();
        console.log('IssueRevisePop작동');


          occupationIssueReviseBtn.forEach((btn) => {
             btn.addEventListener("click", () => {
                btn.classList.add("open");
                const popupOpen = document.querySelector("#editIssuePopup .popupWrap");
                 if(popupOpen){
                    popupOpen.classList.add("active");
                 }
             })
          })
       }
         
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

occupationIssueReviseOpen();

document.addEventListener("DOMContentLoaded", function() {
    // 1. 모든 depth2의 ul 요소를 선택
    const depth2UlElements = document.querySelectorAll(".contBoxMini04 .contentDetailBox .depth2 .contents");

    if (depth2UlElements.length > 1) {
        // 2. 마지막 ul을 제외한 나머지 ul 요소 제거 및 높이 합산
        let totalHeight = 0;

        depth2UlElements.forEach((ul, index) => {
            const ulHeight = ul.offsetHeight;

            if (index !== depth2UlElements.length - 1) {
                totalHeight += ulHeight; // 삭제할 ul의 높이 합산
                ul.remove(); // ul 태그 삭제
            } else {
                // 마지막 ul에 이전 ul들의 높이를 추가
                totalHeight += ulHeight;
                ul.style.height = `${totalHeight}px`;
                ul.style.display = 'flex';
                ul.style.justifyContent = 'center';
                ul.style.alignItems = 'center';
            }
        });

        // 3. 마지막 ul에 있는 버튼을 가운데 정렬
        const lastUlElement = depth2UlElements[depth2UlElements.length - 1];
        const lastButton = lastUlElement.querySelector(".viewAllBtn");

        // 마지막 li 요소의 내용을 모두 제거하고 버튼만 남김
        const lastLiElement = lastButton.parentElement;
        lastLiElement.innerHTML = '';
        lastLiElement.appendChild(lastButton);

        // 마지막 버튼 스타일 적용
        lastButton.style.display = 'block';
        lastButton.style.margin = '0 auto';
        lastButton.style.width = '150px';
        lastButton.style.textAlign = 'center';
    }
});