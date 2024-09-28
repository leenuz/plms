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




function loadFileList() {
    var code = $('#code').val();

    $.ajax({
        url: '/issue/selectIssueManualFileVersionList?CODE=' + code,
        type: 'POST',
        contentType: "application/json",
        async: false,
        dataType: "json",
        success: function (response) {
            console.log(response);
            var result = response.result;

            var contentStr = '';

            for (row of result) {
                var rowStr = `
                    < li class="content largeWidth" >
                    <input type="text" readonly class="notWriteInput" placeholder="계약 후 지상권 등기진행 누락" value="` + row.MANUAL_TITLE + `">
                    </li>
                    <li class="content middleWidth">
                        <input type="text" readonly class="notWriteInput" placeholder="토지사용승락서.docx" value="` + row.FILE_NM + `">
                    </li>
                    <li class="content middleWidth">
                        <input type="text" readonly class="notWriteInput" placeholder="2021-11-05 13:20:80.0" value="` + row.FILE_REGDATE + `">
                    </li>
                    <li class="content btnBox">
                        <button class="downloadBtn">다운로드</button>
                    </li>
                    <li class="content btnBox">
                        <button class="reviseBtn">개정</button>
                    </li>
                    <li class="content btnBox">
                        <button class="delBtn">삭제</button>
                    </li>
                `;
                contentStr += rowStr;
            }
            var contentStr = "";

            $('#fileListUL').html(contentStr);
        },
        error: function (jqXHR, textStatus, errorThrown) {
            alert("ajax error\n" + textStatus + ":" + errorThrown);
        }

    });
}

function deleteFile() {

}