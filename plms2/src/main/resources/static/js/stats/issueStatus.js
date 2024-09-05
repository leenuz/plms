// 커스텀 selectbox

const createCustomLiMasterEdit = () => {
    const contentItems = document.querySelectorAll('.selectContentArea');

    contentItems.forEach(contentItem => {
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
    });
}
createCustomLiMasterEdit();


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

const MoreSelectBtn = document.querySelectorAll('.moreSelectBtn')

MoreSelectBtn.forEach((moreBtn) => {
    moreBtn.addEventListener('click', function () {
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
    })
})

// 잠재이슈 등록 필지 조회 팝업
//const issueStatusParcelPopEvet = () => {
//
//    const parcelPopupOpen = document.querySelectorAll("#issueStatus .parcelPopupOpen");
//    const issueStatusParcelPopupWrapper = document.querySelector(".issueStatusParcelPopupWrapper");
//    let approvalFilePath = '/popupHtml/potential_issue_Popup.html'; // 잠재이슈 등록 필지 조회
//
//    if (parcelPopupOpen) {
//
//        let xhr = new XMLHttpRequest();
//        xhr.open('GET', approvalFilePath, true);
//        xhr.onreadystatechange = function () {
//            if (xhr.readyState == 4 && xhr.status == 200) {
//                issueStatusParcelPopupWrapper.innerHTML = xhr.responseText;
//                runScriptsInElement(issueStatusParcelPopupWrapper); // 삽입된 html내 스크립트 실행 함수 호출
//            }
//        };
//        xhr.send();
//        console.log('issueStatusParcelPopupWrapper 작동');
//
//        parcelPopupOpen.forEach((parcel) => {
//            parcel.addEventListener('click', function(){
//
//                const popupOpen = document.getElementById("potential_issue_Popup");
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
//issueStatusParcelPopEvet();


// 민원발생 필지조회 팝업
//const issueStatusComplaintPopEvet = () => {
//
//    const complaintPopupOpen = document.querySelectorAll("#issueStatus .complaintPopupOpen");
//    const issueStatusComplaintPopupWrapper = document.querySelector(".issueStatusComplaintPopupWrapper");
//    let approvalFilePath = '/popupHtml/superficies_statistics_Popup/complaints_occurred_Popup.html'; // 잠재이슈 등록 필지 조회
//
//    if (complaintPopupOpen) {
//
//        let xhr = new XMLHttpRequest();
//        xhr.open('GET', approvalFilePath, true);
//        xhr.onreadystatechange = function () {
//            if (xhr.readyState == 4 && xhr.status == 200) {
//                issueStatusComplaintPopupWrapper.innerHTML = xhr.responseText;
//                runScriptsInElement(issueStatusComplaintPopupWrapper); // 삽입된 html내 스크립트 실행 함수 호출
//            }
//        };
//        xhr.send();
//        console.log('issueStatusComplaintPopupWrapper 작동');
//
//        complaintPopupOpen.forEach((complaint) => {
//            complaint.addEventListener('click', function(){
//
//                const popupOpen = document.getElementById("complaints_occured_Popup");
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
//issueStatusComplaintPopEvet();

  /* 페이지네이션 */
const pageCountEvetForPotentialIssue = () => {
    const potentialPageCountBtn = document.querySelectorAll(
      ".pilji_info_Popup_boardPageBoxs .pageCountBoxs p"
    );
    potentialPageCountBtn.forEach((btn) => {
      potentialPageCountBtn[0].classList.add("active");
      btn.addEventListener("click", () => {
        potentialPageCountBtn.forEach((otherBtn) => {
          otherBtn.classList.remove("active");
        });
        btn.classList.toggle("active");
      });
    });
  };
  pageCountEvetForPotentialIssue();


$(document).on("click",".parcelPopupOpen",function(){

						  const popupOpen = document.querySelector("#searchResultsPopup .popupWrap");
						  	   $(popupOpen).addClass("open");
						  	   popupOpen.classList.add("active");

				   	   	});

$(document).on("click",".complaintPopupOpen",function(){

      const popupOpen = document.querySelector("#searchResultsPopup1 .popupWrap");
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