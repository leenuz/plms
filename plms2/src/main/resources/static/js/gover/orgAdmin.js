// 삽입된 html내 스크립트 실행 함수
const runScriptsInElement = (element) => {
  const scripts = element.getElementsByTagName('script');
  for (let i = 0; i < scripts.length; i++) {
    const script = document.createElement('script');
    script.textContent = scripts[i].textContent;
    document.body.appendChild(script).parentNode.removeChild(script);
  }
}

// 신규등록 팝업
function showRegPopup() {
  const orgAdminRegisterPopWrapper = document.querySelector(".popupWrapper");
  let orgAdminRegisterPath = '/gover/orgAdminPopupReg';

  if (orgAdminRegisterPopWrapper) {
    let xhr = new XMLHttpRequest();
    xhr.open('GET', orgAdminRegisterPath, true);
    xhr.onreadystatechange = function () {
      if (xhr.readyState == 4 && xhr.status == 200) {
        orgAdminRegisterPopWrapper.innerHTML = xhr.responseText;
        runScriptsInElement(orgAdminRegisterPopWrapper);
      }
    };
    xhr.send();
    console.log('orgAdminRegisterPopWrapper작동');
  }
}

// 신규취소 팝업
function showRegCancelPopup() {
  const orgAdminRegisterPopWrapper = document.querySelector(".popupWrapper");
  let orgAdminRegisterPath = '/gover/orgAdminPopupRegCancel';

  if (orgAdminRegisterPopWrapper) {
    let xhr = new XMLHttpRequest();
    xhr.open('GET', orgAdminRegisterPath, true);
    xhr.onreadystatechange = function () {
      if (xhr.readyState == 4 && xhr.status == 200) {
        orgAdminRegisterPopWrapper.innerHTML = xhr.responseText;
        runScriptsInElement(orgAdminRegisterPopWrapper);
      }
    };
    xhr.send();
    console.log('orgAdminRegisterPopWrapper작동');
  }
}

// 수정 팝업
function showModPopup() {
  const orgAdminRegisterPopWrapper = document.querySelector(".popupWrapper");
  let orgAdminRegisterPath = '/gover/orgAdminPopupMod';

  if (orgAdminRegisterPopWrapper) {
    let xhr = new XMLHttpRequest();
    xhr.open('GET', orgAdminRegisterPath, true);
    xhr.onreadystatechange = function () {
      if (xhr.readyState == 4 && xhr.status == 200) {
        orgAdminRegisterPopWrapper.innerHTML = xhr.responseText;
        runScriptsInElement(orgAdminRegisterPopWrapper);
      }
    };
    xhr.send();
    console.log('orgAdminRegisterPopWrapper작동');
  }
}

// 승인 팝업
function showAcceptPopup() {
  const orgAdminRegisterPopWrapper = document.querySelector(".popupWrapper");
  let orgAdminRegisterPath = '/gover/orgAdminPopupAccept';

  if (orgAdminRegisterPopWrapper) {
    let xhr = new XMLHttpRequest();
    xhr.open('GET', orgAdminRegisterPath, true);
    xhr.onreadystatechange = function () {
      if (xhr.readyState == 4 && xhr.status == 200) {
        orgAdminRegisterPopWrapper.innerHTML = xhr.responseText;
        runScriptsInElement(orgAdminRegisterPopWrapper);
      }
    };
    xhr.send();
    console.log('orgAdminRegisterPopWrapper작동');
  }
}

// 등록버튼 클릭 이벤트
$('.vividBlueBtn').on('click', function() {
  showRegPopup();
});



$(document).ready(function(){
	console.log("-------------orgAdmin load--------------");
	mergeTableCells("#mainTable",1);
	
})