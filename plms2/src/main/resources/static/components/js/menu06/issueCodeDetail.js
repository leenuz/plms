/* 매뉴얼 신규등록 팝업 */

const issueDetailNewMenualPopEvent = () => {

    const newAddBtn = document.querySelector("#issueCodeDetail .newAddBtn");
    const newMenualPopupWrapper = document.querySelector(".newMenualPopupWrapper");
    let approvalFilePath = '/components/popuphtml/issueCodePopup/newMenualPop.html'; // 매뉴얼 신규등록

    if (newAddBtn) {

        let xhr = new XMLHttpRequest();
        xhr.open('GET', approvalFilePath, true);
        xhr.onreadystatechange = function () {
            if (xhr.readyState == 4 && xhr.status == 200) {
                newMenualPopupWrapper.innerHTML = xhr.responseText;
                runScriptsInElement(newMenualPopupWrapper); // 삽입된 html내 스크립트 실행 함수 호출
            }
        };
        xhr.send();
        console.log('newMenualPopupWrapper 작동');
        newAddBtn.addEventListener("click", () => {

            const largeNewMenualPopup = document.getElementById("newMenualPopup");
            if (largeNewMenualPopup) {
                largeNewMenualPopup.classList.add("active");
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

issueDetailNewMenualPopEvent();