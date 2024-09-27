/* 이슈보기팝업 */

const IssuePopupOpenEvet = () => {
    const issuePopBtn = document.querySelectorAll("#dopcoIssueManage .issuePopBtn");
    const issueManageIssuePopWrap = document.querySelector(".issueManageIssuePopWrapper");
    let issuePopFilePath = '/components/popuphtml/issue_management_Popup/issue_Popup.html'; // 삽입할 html 파일 경로

    if (issuePopBtn) {
        // let xhr = new XMLHttpRequest();
        // xhr.open('GET', issuePopFilePath, true);
        // xhr.onreadystatechange = function () {
        //     if (xhr.readyState == 4 && xhr.status == 200) {
        //         issueManageIssuePopWrap.innerHTML = xhr.responseText;
        //         runScriptsInElement(issueManageIssuePopWrap); // 삽입된 html내 스크립트 실행 함수 호출
        //     }
        // };
        // xhr.send();
        // console.log('issueManageIssuePopWrap 작동');

        issuePopBtn.forEach((btn) => {
            btn.addEventListener("click", () => {
                const popupOpen = document.getElementById("issuePopup");
                if (popupOpen) {
                    popupOpen.classList.add("active");
                }
            })
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
// IssuePopupOpenEvet();

/* 신규민원등록 팝업 */
const newIssueRegisterOpenEvet = () => {
    const newIssueBtn = document.querySelector("#dopcoIssueManage .newIssueBtn");
    const issueManageNewIssuePopWrap = document.querySelector(".issueManageNewIssuePopWrapper");
    let newIssuePopFilePath = '/components/popuphtml/issue_management_Popup/newcomplaint.html'; // 삽입할 html 파일 경로
    if (newIssueBtn) {
        // let xhr = new XMLHttpRequest();
        // xhr.open('GET', newIssuePopFilePath, true);
        // xhr.onreadystatechange = function () {
        //     if (xhr.readyState == 4 && xhr.status == 200) {
        //         issueManageNewIssuePopWrap.innerHTML = xhr.responseText;
        //         runScriptsInElement(issueManageNewIssuePopWrap); // 삽입된 html내 스크립트 실행 함수 호출
        //     }
        // };
        // xhr.send();
        // console.log('issueManageNewIssuePopWrap 작동');
        newIssueBtn.addEventListener("click", () => {
            const popupOpen = document.getElementById("newcomplaint_Popup");
            if (popupOpen) {
                popupOpen.classList.add("active");
                // js 추가
                const issueManageLandStatusPopWrapper = document.querySelector(".issueManageLandStatusPopWrapper");
                if (issueManageLandStatusPopWrapper.classList.contains('passed')) { return };

                let landStatusPopFilePath = '/components/popuphtml/issueCodePopup/landStatusPop.html'; // 삽입할 html 파일 경로

                let xhr = new XMLHttpRequest();
                xhr.open('GET', landStatusPopFilePath, true);
                xhr.onreadystatechange = function () {
                    if (xhr.readyState == 4 && xhr.status == 200) {
                        issueManageLandStatusPopWrapper.innerHTML = xhr.responseText;
                        runScriptsInElement(issueManageLandStatusPopWrapper); // 삽입된 html내 스크립트 실행 함수 호출
                    }
                };
                xhr.send();
                console.log('issueManageLandStatusPopWrapper 작동');

                issueManageLandStatusPopWrapper.classList.add('passed')
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
newIssueRegisterOpenEvet()


// /* 현황통계 팝업 오픈 */
// const issueTotalPopOpenEvet = () => {
//     const issueManageTotalBtn = document.querySelector("#dopcoIssueManage .issueManageTotalBtn");
//     const issueManageIssueTotalPopWrap = document.querySelector(".issueManageIssueTotalWrapper");
//     let issueTotalPopFilePath = '/components/popuphtml/issueTotalPop.html'; // 삽입할 html 파일 경로

//     if (issueManageTotalBtn) {
//         // let xhr = new XMLHttpRequest();
//         // xhr.open('GET', issueTotalPopFilePath, true);
//         // xhr.onreadystatechange = function () {
//         //     if (xhr.readyState == 4 && xhr.status == 200) {
//         //         issueManageIssueTotalPopWrap.innerHTML = xhr.responseText;
//         //         runScriptsInElement(issueManageIssueTotalPopWrap); // 삽입된 html내 스크립트 실행 함수 호출
//         //     }
//         // };
//         // xhr.send();
//         // console.log('issueManageIssueTotalPopWrap 작동');

//         issueManageTotalBtn.addEventListener("click", () => {

//             const popupOpen = document.getElementById("issueTotalPopContent");
//             if (popupOpen) {
//                 popupOpen.classList.add("active");
//             }
//         })

//         // 삽입된 html내 스크립트 실행 함수
//         const runScriptsInElement = (element) => {
//             const scripts = element.getElementsByTagName('script');
//             for (let i = 0; i < scripts.length; i++) {
//                 const script = document.createElement('script');
//                 script.textContent = scripts[i].textContent;
//                 document.body.appendChild(script).parentNode.removeChild(script);
//             }
//         }
//     }
// }

// issueTotalPopOpenEvet()

/* x표시 클릭시 닫기 */

const issueTotalcloseBtn = document.querySelector(".issueTotalcloseBtn");
const issueTotalPopContentWrap = document.getElementById("issueTotalPopContent");

if(issueTotalcloseBtn){
issueTotalcloseBtn.addEventListener("click" , () => {
  issueTotalPopContentWrap.classList.remove("active");
})
}

/* 셀렉트박스 함수 */

const issueTotalSelectEvet = (reload = false) => {

const issueTotalSelectsTitleBtn = document.querySelectorAll(".issueTotalPopWrap .issueTotalSelectsTitleBtn");
const issueTotalSelectList = document.querySelectorAll(".issueTotalPopWrap .sufaceSelectList");
const issueTotalSelectListMember = document.querySelectorAll(".issueTotalPopWrap .sufaceSelectList .surfaceSelectListMember");
const issueTotalselectWrappers = document.querySelectorAll(".issueTotalHiddenSelect"); //셀렉박스


let issueTotalAnswer = "";
let issueTotalCheckAnswer = "";

//셀렉버튼 최초값 함수
const initialValues = () => {
   if(issueTotalselectWrappers.length > 0){
    for(let d = 0; d <= issueTotalselectWrappers.length - 1; d++){

       let issueTotalselectValuesInitial = issueTotalselectWrappers[d].children;
       issueTotalSelectsTitleBtn[d].innerText = issueTotalselectValuesInitial[0].value; //셀렉박스의 첫번째 값들이 surfaceSelectsTitleBtn값의 첫 값이 됨
       issueTotalselectWrappers[d].value = issueTotalSelectsTitleBtn[d].innerText; //셀렉박스의 value값을 surfaceSelectsTitleBtn값으로 설정
       
    //    if(issueTotalSelectListMember[d].classList.contains("selectChoice")){ 
    //       issueTotalSelectsTitleBtn[d].innerText = `전체`;
    //       }
   }
 }
}

if(issueTotalselectWrappers.length > 0){

initialValues();//최초의값

//체크박스가 아닐 경우, 셀렉박스 값  li p값에 담기 
for(let i = 0; i <= issueTotalselectWrappers.length - 1; i++){

   const selectValues = issueTotalselectWrappers[i].children; //셀렉박스옵션값 

   for(let x = 0; x <= selectValues.length - 1; x++){

     issueTotalAnswer += `<li><p>${selectValues[x].value}</p></li>`;

       //체크박스가 있는 경우, 셀렉박스 값 li input p 값 이용
       if(issueTotalSelectListMember[i].classList.contains("checkBoxsContent")){ //체크박스
         issueTotalCheckAnswer += `<li>
           <input
             type="checkbox"
             id="issueTotalPopCheckBox0${x+1}"
             name="issueTotalPopCheck" />
           <label for="issueTotalPopCheckBox0${x+1}"></label><p>${selectValues[x].value}</p></li>`
       }
   }

   issueTotalSelectListMember[i].innerHTML = issueTotalSelectListMember[i].classList.contains("checkBoxsContent") ? issueTotalCheckAnswer : issueTotalAnswer;
   issueTotalAnswer = '';
   issueTotalCheckAnswer = '';
}
}

if(reload){
    return;
}

issueTotalSelectsTitleBtn.forEach((btns, index) => {
     
  btns.addEventListener("click" , () => {
    const nextSiblings = btns.nextElementSibling;

    issueTotalSelectsTitleBtn.forEach((otherBtn) => {
     if (otherBtn !== btns) {
       otherBtn.classList.remove("active");
     }
    });
    btns.classList.toggle("active");
    nextSiblings.classList.toggle("active");

     //surfaceSelectList관련 toggle버튼
    issueTotalSelectList.forEach((box, boxIndex) => {
     //셀렉버튼의 인덱스와  surfaceSelectList 인덱스번호가 일치하면 메뉴를 오픈하고, btn에 active를 포함
     if (index === boxIndex) {
        box.classList.toggle(
           "active",
           btns.classList.contains("active")
        );
     } else {
        //그렇지 않으면 메뉴닫기
        box.classList.remove("active");
     }
     });

  });
 

});

  issueTotalSelectList.forEach((list) => {
     list.addEventListener("click" , (event) => {
      
       const thisBtns = event.target.parentElement.parentElement.parentElement.previousElementSibling;
       const selectContent =  event.target.parentElement.parentElement.parentElement.parentElement.previousElementSibling.children[0];//셀렉박스
       let currentSelect = selectContent.getAttribute("id");//셀렉박스아이디 가져오기
       
       if (event.target.nodeName === "P") {

           //빌생지사클릭시
           if( currentSelect === "issueTotalHiddenSelectBox01"){
               return issueTotalSelectsTitleBtn.forEach((btn) => btn.classList.remove("active")),
               issueTotalSelectList.forEach((lists) => lists.classList.remove("active"));
           }else{ 
               let currentSelectValue = document.getElementById(currentSelect); //현재 셀렉박스 가져오기

               return thisBtns.innerText = event.target.innerText,
               $(currentSelectValue).val(event.target.innerText),//셀렉박스 값에 현재 클릭된 값의 텍스트 담기 
               console.log(currentSelectValue.value), //셀렉박스값표시
               selectMinwonStatusStatis(false),
               issueTotalSelectsTitleBtn.forEach((btn) => btn.classList.remove("active")),
               issueTotalSelectList.forEach((lists) => lists.classList.remove("active"));
           }

       }
           
       if(event.target.nodeName === "LABEL" || event.target.nodeName === "INPUT[TYPE='CHECKBOX']" ){ return; }


 });

});

}


issueTotalSelectEvet();


/* 체크박스 함수 */

const issueTatalCheckboxes = (checkboxes) =>  {
const issueTotalPopCheck = document.getElementsByName("issueTotalPopCheck");
checkboxes = issueTotalPopCheck;

const valuesArray = []; //셀렉박스 값 저장할 배열

if(checkboxes){
Array.from(checkboxes).forEach((checkBtn, index) => {

  //버튼 내 p값 가져오기 
  const values = checkBtn.nextElementSibling.nextElementSibling.innerText;

  checkBtn.addEventListener("change", () => {

      //체크박스를 체크했을 때
      if (checkBtn.checked) {
          // 첫 번째 체크박스가 체크되었을 때
          if (index === 0) {
              // 나머지 체크박스들의 체크 상태를 해제, 배열에서 제거
              for (let i = 1; i < checkboxes.length; i++) {
                  checkboxes[i].checked = false; // 체크 해제
                  const valueToRemove = checkboxes[i].nextElementSibling.nextElementSibling.innerText;
                  const indexToRemove = valuesArray.indexOf(valueToRemove);
                  if (indexToRemove !== -1) {
                      valuesArray.splice(indexToRemove, 1); // 배열에서 제거
                  }
              }
          } else {
              // 첫 번째 체크박스가 체크되어 있을 때, 다른 체크박스를 체크하면 첫 번째 체크박스 해제
              checkboxes[0].checked = false;
              const valueToRemove = checkboxes[0].nextElementSibling.nextElementSibling.innerText;
              const indexToRemove = valuesArray.indexOf(valueToRemove);
              if (indexToRemove !== -1) {
                  valuesArray.splice(indexToRemove, 1); // 배열에서 제거
              }
          }
          
          // 배열에 값 추가
          valuesArray.push(values);
      } else {
          // 체크박스가 체크 해제되었을 때 배열에서 값 제거
          const index = valuesArray.indexOf(values);
          if (index !== -1) {
              valuesArray.splice(index, 1);
          }
      }

      // 변경된 배열 값을 버튼의 텍스트에 삽입
      const displayElement = checkboxes[0].parentElement.parentElement.parentElement.previousElementSibling;
      displayElement.innerText = valuesArray.join(', '); // 배열을 문자열로 변환해서 출력

      selectMinwonStatusStatis(false);

  });
});

}

}

issueTatalCheckboxes();



//팝업 숨김
function closeComplaintregisterPopup() {
    const complaintregisterPopupOpen = document.getElementById("newcomplaint_Popup");
    complaintregisterPopupOpen.classList.remove("active");
}

//신규민원팝업 데이터 json
function getPopupJsonData() {
    var formSerializeArray = $('#saveFormPop').serializeArray();
    len = formSerializeArray.length;
    var dataObj = {};
    for (i = 0; i < len; i++) {
        dataObj[formSerializeArray[i].name] = formSerializeArray[i].value;
    }

    dataObj.JISA = (ljsIsNull(dataObj.JISA) || dataObj.JISA == "전체") ? '' : dataObj.JISA;

    //토지 정보
    dataObj.tojiList = [];
    $(".landinfo_box .landinfo_content").each(function(index, ul) {
        var obj = {}; // 각 UL에 대한 개별 객체 생성
        obj.REP_YN = $(ul).find('.landinfo_content_3 input').is(':checked') ? "Y" : "N"; //대표필지여부
        obj.saddr =  $(ul).find('.landinfo_content_4 input').val(); //주소
        obj.REGISTED_YN = $(ul).find('.landinfo_content_5 input').val(); //등기여부
        obj.PERMITTED_YN = $(ul).find('.landinfo_content_6 input').val(); //계약여부
        obj.AREA = $(ul).find('.landinfo_content_7 input').val(); //실저촉면적
        dataObj.tojiList.push(obj);
    });

    //민원인/토지주 정보
    dataObj.userList = [];
    $(".com_content_contents_1 .landowner_wrap").each(function(index, ul) {
        var obj = {}; // 각 UL에 대한 개별 객체 생성
        obj.num = $(ul).find('input').eq(0).val() //순번
        obj.name =  $(ul).find('input').eq(1).val(); //성명
        obj.birth_date = $(ul).find('input').eq(2).val(); //생년월일
        obj.relation = $(ul).find('input').eq(3).val(); //토지주와 관계
        obj.phone = $(ul).find('input').eq(4).val(); //연락처
        obj.attendance = $(ul).find('select').val(); //현장입회
        dataObj.userList.push(obj);
    });

    //첨부파일
    const newComplaintRegiPopup_myPcFiles = document.getElementById("complaint_contents_contents3_Popup_file");
    const newComplaintRegiFiles = newComplaintRegiPopup_myPcFiles.files;
    dataObj.files = newComplaintRegiFiles;

    console.log(dataObj);
    return JSON.stringify(dataObj);
}

//신규민원 -> 저장
$(document).on("click", "#newcomplaint_Popup .approveBtn", function () {
    getPopupJsonData();
    // $.ajax({
	// 	url: "/issue/",
	// 	data: getPopupJsonData(),
	// 	async: true,
	// 	type: "POST",
	// 	dataType: "json",
	// 	contentType: 'application/json; charset=utf-8',
	// 	success: function (data, jqXHR) {
    //         console.log(data);
    //         if(data.message != null && data.message != undefined && data.message == "success"){
    //             closeComplaintregisterPopup();
    //         }else{
    //              alert(data.message);
    //         }
	// 	},
	// 	beforeSend: function () {
	// 		//(이미지 보여주기 처리)
	// 		//$('#load').show();
    //         // loadingShow();
	// 	},
	// 	complete: function () {
	// 		//(이미지 감추기 처리)
	// 		//$('#load').hide();
    //         // loadingHide();
	// 	},
	// 	error: function (jqXHR, textStatus, errorThrown, responseText) {
	// 		//alert("ajax error \n" + textStatus + " : " + errorThrown);
	// 		console.log(jqXHR);
	// 		console.log(jqXHR.readyState);
	// 		console.log(jqXHR.responseText);
	// 		console.log(jqXHR.responseJSON);
	// 	}
	// }); //end ajax
});
//신규민원 -> 상신
$(document).on("click", "#newcomplaint_Popup .sangsinBtn", function () {
    getPopupJsonData();
    // $.ajax({
        // 	url: "/issue/",
        // 	data: getPopupJsonData(),
        // 	async: true,
        // 	type: "POST",
        // 	dataType: "json",
        // 	contentType: 'application/json; charset=utf-8',
        // 	success: function (data, jqXHR) {
        //         console.log(data);
        //         if(data.message != null && data.message != undefined && data.message == "success"){
        //             closeComplaintregisterPopup();
        //         }else{
        //              alert(data.message);
        //         }
        // 	},
        // 	beforeSend: function () {
        // 		//(이미지 보여주기 처리)
        // 		//$('#load').show();
        //         // loadingShow();
        // 	},
        // 	complete: function () {
        // 		//(이미지 감추기 처리)
        // 		//$('#load').hide();
        //         // loadingHide();
        // 	},
        // 	error: function (jqXHR, textStatus, errorThrown, responseText) {
        // 		//alert("ajax error \n" + textStatus + " : " + errorThrown);
        // 		console.log(jqXHR);
        // 		console.log(jqXHR.readyState);
        // 		console.log(jqXHR.responseText);
        // 		console.log(jqXHR.responseJSON);
        // 	}
        // }); //end ajax
});

//신규민원 -> 검색
var togiDataList = [];
$(document).on("click", ".landinfo .landStatusPopOpenBtn", function () {
    const idx = $(this).closest("li").siblings(".landinfo_content_2").text()
    var addr = $(this).parent().find("input").val().trim();
    console.log(addr);
    if (addr == null || addr == "" || addr == undefined) {
        alert("주소를 입력해주세요.");
        return;
    }
    const popupLayout = $('#landStatusPopup')
    $.ajax({
        url: "/issue/getMinwonJijukSelectNotModel",
        type: "GET",
        data: { "address": addr },
        dataType: "json",
        success: function (response) {
            console.log(response);
            const datas = response.result;
            togiDataList = datas;
            const popContentBox = popupLayout.find('.popContentBox');
            if (datas.length > 0) {
                popContentBox.empty(); //자식 요소 모두 제거
                $.each(datas, function (index, item) {
                    var newItem = `
                            <ul class="popContents">
                                <li class="popContent01">
                                    <p>${item.pnu}</p>
                                </li>
                                <li class="popContent02">
                                    <p>${item.juso}</p>
                                </li>
                                <li class="popContent03">
                                    <p>${item.jibun}</p>
                                </li>
                                <li class="popContent04">
                                    <button class="resultSelectBtn" onclick="resultSelectBtnClick(this, ${idx-1}, ${index})">선택</button>
                                </li>
                                <li class="popContent05">
                                    <p></p>
                                </li>
                            </ul>`;
                    popContentBox.append(newItem);
                });
                popupLayout.addClass('active');
            } else {
                alert("검색 된 결과가 없습니다.")
                console.log("response.length = 0");
            }
        },
        error: function (xhr, status, error) {
            console.log("Error: " + error);
        }
    });
});

//대표 필지정보 입력
function setReqLand(addr= "", reg_yn = "", contract_yn = ""){
    $('.daepyo_pilji_list_1 input[type="text"]').val(addr); //주소
    $('.daepyo_pilji_list_2 input[type="text"]').val(reg_yn);  //등기여부
    $('.daepyo_pilji_list_3 input[type="text"]').val(contract_yn); //계약여부
}

//신규민원 -> 검색 -> 선택 버튼
const resultSelectBtnClick = function (view, ulIdx, dataIdx) {
    const address = togiDataList[dataIdx].juso;
    const master_yn = togiDataList[dataIdx].master_yn;
    const registed_yn = togiDataList[dataIdx].registed_yn;
    const permitted_yn = togiDataList[dataIdx].permitted_yn;

    //체크박스
    if(master_yn == "Y"){
        $('.approve_checkbox').prop('checked', false);
        $(".landinfo_content_3 input[type='checkbox']").eq(ulIdx).prop('checked', true);
        //대표 필지 정보 입력
        setReqLand(address, registed_yn, permitted_yn)
    }
   
    $(".landinfo_content_4 input[type='text']").eq(ulIdx).val(address);  //주소
    $('.landinfo_content_5 input[type="text"]').eq(ulIdx).val(registed_yn);  //등기여부
    $('.landinfo_content_6 input[type="text"]').eq(ulIdx).val(permitted_yn); //계약여부

    $('#landStatusPopup').removeClass('active');
}

$(document).on("change", ".approve_checkbox", function () {
    // 선택된 체크박스가 체크된 경우
    if ($(this).is(":checked")) {
        // 현재 체크박스를 제외한 다른 체크박스의 체크 해제
        $(".approve_checkbox").not(this).prop("checked", false);
        const info = $(this).closest("ul");
        const juso = info.find(".landinfo_content_4 input[type='text']").val()
        const content_5 = info.find(".landinfo_content_5 input[type='text']").val()
        const content_6 = info.find(".landinfo_content_6 input[type='text']").val()
        setReqLand(juso,content_5,content_6);
    }else{
        if($('.landinfo_box input[type="checkbox"]:checked').length === 0){
            setReqLand();
        }
    }
});

var saveJsonData = [];
function loadDataTable(params) {
    console.log("-----start loadDataTable----------");
    console.log("Params:", params); // params 객체 출력

    //var json=JSON.stringify(params);
    table = $('#userTable').DataTable({
        // fixedColumns: {
        //     start: 3,
        // },
        scrollCollapse: true,
        scrollX: true,
        scrollY: 600,
        paging: true,
        "oLanguage": { "sLengthMenu": "_MENU_" },
        dom: '<"top"<"dt-title">Bl><"dt-center-in-div"r><"bottom"tp><"clear">',
        buttons: [{ extend: 'excel', text: '엑셀 다운로드' }],
        pageLength: 50,
        bPaginate: true,
        bLengthChange: true,
        bInfo: false,
        lengthMenu: [[10, 50, 100, -1], ["10건", "50건", "100건", "All"]],
        bAutoWidth: false,
        processing: true,
        ordering: true,
        bServerSide: true,
        searching: false,
        destroy: true,
        order: [[12, 'desc']],
        rowReorder: {
            dataSrc: 'b_seq'
        },
        ajax: {
            url: "/issue/menu06_1DataTableList",
            type: "POST",
            datatype: "json",
            data: function (d) {
                //d=params;
                d.jisa = ljsIsNull(params.jisa) ? '' : params.jisa;
                d.start_date = params.start_date;
                d.end_date = params.end_date;

                d.code1 = params.depth1Code;
                d.code2 = params.depth2Code;
                d.code3 = params.depth3Code;
                d.mw_title = params.mw_title;

                d.status = findProgStatus(params.status)

                //주소
                var ask = (params.issueManageRadio01 == undefined || params.issueManageRadio01 == null) ? '0' : params.issueManageRadio01;
                console.log("issueManageRadio01:" + ask);

                //입력형 주소 입력 시
                if (ask == "0") {
                    console.log("---------3--------------");
                    d.saddr = (params.addressFull == undefined || params.addressFull == null) ? '' : params.addressFull;
                }
                //선택형 주소 입력 시
                else {
                    console.log("----------------------------1--------------");
                    console.log(ljsIsNull(params.sgg));
                    var addrs = params.sido;
                    console.log("addrs:" + addrs);
                    if (ljsIsNull(params.sgg)) addrs = addrs + "";
                    else addrs = addrs + " " + params.sgg;
                    if (ljsIsNull(params.emd)) addrs = addrs + "";
                    else addrs = addrs + " " + params.emd;
                    if (ljsIsNull(params.ri)) addrs = addrs + "";
                    else addrs = addrs + " " + params.ri;
                    if (ljsIsNull(params.jibun)) addrs = addrs + "";
                    else addrs = addrs + " " + params.jibun;
                    //var addrs=params.sido+" "+params.sgg+" "+params.emd+" "+(params.ri==null || params.ri=="undefined") ? '' : params.ri;
                    //console.log("emd:"+ljsIsNull(params.emd)?'':params.emd);
                    console.log("addrs:" + addrs);
                    d.saddr = (addrs == undefined || addrs == null || addrs == "undefined") ? '' : addrs;
                    //params.sido+" "+params.sgg+" "+ljsIsNull(params.emd)?'':params.emd;//+" "+ljsIsNull(params.ri)?'':params.ri+" "+ljsIsNull(params.jibun)?'':params.jibun;
                }

                console.log("saddr:" + d.saddr);
                console.log(params);
                console.log("-----------d-----------");
                console.log(d);

            },

            dataSrc: function (json) {
                console.log("-------------json---------------");
                console.log(json);
                $("#dataTableTotalCount").html(json.recordsTotal);

                saveJsonData = json.data;
                return json.data;
            }

        },
        initComplete: function () {
            console.log(this.api().data().length);
        },
        columns: [
            { data: "mm_mw_title", "defaultContent": "" },//0
            { data: "address", "defaultContent": "" },
            {
                data: "mm_status", render: function (data, type, row, meta) {
                    return findProgStatus(data)
                }
            },
            { data: "mm_idx", "defaultContent": "" },
            { data: "mm_occur_date", "defaultContent": "" },
            { data: "mm_comple_date", "defaultContent": "" }//5
        ],

        columnDefs: [
            { "className": "dt-head-center", "targets": "_all" },
            { className: 'dt-center', "targets": "_all" },
            { targets: [0], width: "200px" },
            { targets: [1], width: "250px" },
            { targets: [2], width: "50px" },
            {
                targets: [3]
                , width: "50px"
                , render: function (data, type, row, meta) {
                    return `<button class="btnDesign issuePopBtn" onclick="issuePop(${data})" >이슈보기</button>`;
                }
            },
            { targets: [4], width: "50px" },
            { targets: [5], width: "50px" }
        ]
    });

    table.on('click', 'tr', function () {
        var target = $(event.target);

        var isButtonCell = target.closest('td').index() === 3;

        if (isButtonCell) {
            return;
        } else {
            // 다른 열을 클릭했을 때만 상세 페이지로 이동
            console.log("--------------tr click---------------------");
            var data = table.row(this).data();
            var url = "/issue/complaintManage?mw_seq=" + data.mm_mw_seq;

            history.replaceState({ page: 'current' }, document.title);

            window.location = url;
        }
    });
}

//리스트 이슈 팝업
function issuePop(idx) {
    const data = saveJsonData.find(function (obj) { return obj.mm_idx == idx })
    const popupOpen = document.getElementById("issuePopup");
    if (popupOpen) {
        $("#issuePopup .issue_content").text(`${data.mm_mw_code1} > ${data.mm_mw_code2} > ${data.mm_mw_code3}`)
        popupOpen.classList.add("active");
    }
}

//현황 팝업
function hyeonhwangPop() {
    const popupOpen = document.getElementById("issueTotalPopContent");
    if (popupOpen) {
        popupOpen.classList.add("active");
    }
}


//조회하기 클릭시 상단 정보 출력
$(document).on("click", "#searchBtn", function () {
    var formSerializeArray = $('#searchForm').serializeArray();
    var object = {};
    for (var i = 0; i < formSerializeArray.length; i++) {
        if (formSerializeArray[i]['value'] === '전체') {
            continue; // "전체"가 선택된 경우, 해당 파라미터를 넘기지 않음
        }
        object[formSerializeArray[i]['name']] = formSerializeArray[i]['value'];
    }

    var json = JSON.stringify(formSerializeArray);

    console.log("----------jsonobj------------");
    console.log(json);
    console.log("object issueManageRadio01:" + object.issueManageRadio01);

    loadDataTable(object);
    console.log("-----------------------");
})

//민원관리 -> 현황통계
$(document).on("click", ".issueManageTotalBtn", function () {
    selectMinwonStatusStatis();
});

function initChart(containerID, data){
    Highcharts.chart(containerID, {
        chart: {
            type: 'column' // 'bar'로 변경하면 수평 막대 차트가 됩니다.
        },
        title: {
            text: '' // 차트 제목 제거
        },
        credits: {
            enabled: false // Highcharts 로고 제거
        },
        legend: {
            // layout: 'vertical', // 세로 방향으로 표시
            align: 'left', // 왼쪽 정렬
            verticalAlign: 'top', // 위쪽 정렬
            x: 0, // 왼쪽에서의 위치
            y: 0 // 위쪽에서의 위치
        },
        xAxis: {
            title: "",
            categories: data.jisaList
        },
        yAxis: {
            title: "",
            min: 0,
            stackLabels: {
                enabled: true,
                formatter: function () {
                    return this.total; // 0이 아닐 때만 표시
                },
                style: {
                    fontWeight: 'bold',
                    color: 'gray'
                }
            }
        },
        tooltip: {
            shared: true,
            useHTML: true
        },
        plotOptions: {
            column: {
                stacking: 'normal', // 스택 방식 설정
                dataLabels: {
                    enabled: true,  // 데이터 레이블을 활성화
                    formatter: function() {
                        return this.y !== 0 ? this.y : null;  // 값이 0이 아니면 표시
                    },
                    color: '#000000',  // 데이터 레이블 색상
                    style: {
                        fontWeight: 'bold'  // 레이블 스타일 설정
                    }
                }
            }
        },
        colors: ['#7bb6ff', '#534fc0', '#fc9642', '#49bb59'], // 색상 배열
        series: data.charData
    });
}
function selectMinwonStatusStatis(isAll = true){
    var jisa = "";
    var status =  "";
    var occur_date =  "";
    if(!isAll){
        jisa =  $(".issueTotalSelectsTitleBtn").eq(0).text() == "전체" ? "" : $(".issueTotalSelectsTitleBtn").eq(0).text();
        status =  $("#issueTotalHiddenSelectBox02").val()[0] == "전체" ? "" : findProgStatus($("#issueTotalHiddenSelectBox02").val()[0]);
        occur_date =  $("#issueTotalHiddenSelectBox03").val()[0] == "전체" ? "" : $("#issueTotalHiddenSelectBox03").val()[0];
    }
    
    var allData = { "jisa":jisa, "status": status, "occur_date": occur_date};
    console.log(allData);
    $.ajax({
        url: "/statics/selectMinwonStatusStatis",
        data: JSON.stringify(allData),
        type: "POST",
        dataType: "json",
        success: function (res) {
            console.log(res);
            const result = res.result;
            const data = res.data;
            if(result != null && result != undefined && result == "success"){
                const convertData = convetHyeonhwangData(data);
                console.log("--- convertData");
                console.log(convertData);
                
                //발생지사 리스트 추가
                if(isAll){
                    const hiddenBox = $('#issueTotalPopContent #issueTotalHiddenSelectBox01')
                    hiddenBox.empty();
                    hiddenBox.append(`<option value="전체">전체</option>`);
                    $.each(convertData.jisaList, function (index, jisa) {
                        var newItem = `<option value="${jisa}">${jisa}</option>`;
                        hiddenBox.append(newItem);
                    });
                
                    $('#issueTotalPopContent #issueTotalPopCheckBox01').prop('checked', true);
                    //select , check init
                    issueTotalSelectEvet(true);
                    issueTatalCheckboxes();
                }

                //지사 리스트 추가
                const jisaBox = $('#issueTotalPopContent .issueDataTextScrollBoxs');
                jisaBox.empty();
                $.each(convertData.data, function (index, data) {
                    var newItem = `<ul class="datas">
                                        <li><p>${data.mm_jisa}</p></li>
                                        <li><p>${data.status_2_count}</p></li>
                                        <li><p>${data.status_3_count}</p></li>
                                        <li><p>${data.status_4_count}</p></li>
                                        <li><p>${data.status_5_count}</p></li>
                                    </ul>`;
                    jisaBox.append(newItem);
                });

            
                //차트
                initChart("container", convertData);
                
                hyeonhwangPop();
            }else{
                alert("현황 통계 데이터가 없습니다.");
            }
        },
        beforeSend: function () {
            //(이미지 보여주기 처리)
            //$('#load').show();
        },
        complete: function () {
            //(이미지 감추기 처리)
            //$('#load').hide();
        },
        error: function (jqXHR, textStatus, errorThrown, responseText) {
            //alert("ajax error \n" + textStatus + " : " + errorThrown);
            console.log(jqXHR);
            console.log(jqXHR.readyState);
            console.log(jqXHR.responseText);
            console.log(jqXHR.responseJSON);
        }
    }) //end ajax
}


//현황 데이터를 변환
function convetHyeonhwangData(data){
    const returnObj = {};
    returnObj.data = data;
    returnObj.jisaList = data.map(item => item.mm_jisa);

    //차트 데이터 만들기
    returnObj.charData = [];
    const obj02 = {
        name: data[0].status_2_title,
        data: data.map(item => item.status_2_count)
    };
    const obj03 = {
        name: data[0].status_3_title,
        data: data.map(item => item.status_3_count)
    };
    const obj04 = {
        name: data[0].status_4_title,
        data: data.map(item => item.status_4_count)
    };
    const obj05 = {
        name: data[0].status_5_title,
        data: data.map(item => item.status_5_count)
    };
   
    returnObj.charData.push(obj02);
    returnObj.charData.push(obj03);
    returnObj.charData.push(obj04);
    returnObj.charData.push(obj05);
    return returnObj;
}

//조회하기 클릭시 상단 정보 출력
$(document).on("click", "#searchBtn", function () {
    var formSerializeArray = $('#searchForm').serializeArray();
    var object = {};
    for (var i = 0; i < formSerializeArray.length; i++) {
        if (formSerializeArray[i]['value'] === '전체') {
            continue; // "전체"가 선택된 경우, 해당 파라미터를 넘기지 않음
        }
        object[formSerializeArray[i]['name']] = formSerializeArray[i]['value'];
    }

    var json = JSON.stringify(formSerializeArray);

    console.log("----------jsonobj------------");
    console.log(json);
    console.log("object issueManageRadio01:" + object.issueManageRadio01);

    loadDataTable(object);
    console.log("-----------------------");
})

$(document).on("click", ".sido li", function () {
    $("#sido").val($("#sidoText").text()).attr("selected", "selected");
    if ($("#sido").val() == null) return;
    var allData = { "key": $("#sido").val() };
    $.ajax({
        url: "/api/getSigunMaster",
        data: JSON.stringify(allData),
        async: true,
        type: "POST",
        dataType: "json",
        contentType: 'application/json; charset=utf-8',
        success: function (rt, jqXHR) {
            var data = rt.resultData;

            $("#sggUl li").remove();
            $("#sgg option").remove();

            $("#sggUl").append("<li><p>전체</p></li>");
            $("#sgg").append("<option value=''>전체</option>");
            for (var i = 0; i < data.length; i++) {
                $("#sggUl").append("<li><p>" + data[i].sm_gugun + "</p></li>");
                $("#sgg").append("<option>" + data[i].sm_gugun + "</option>");
            }

            $("#sido").val($("#sido").val()).attr("selected", "selected");
            // downloadExcel(rt.results);
        },
        beforeSend: function () {
            //(이미지 보여주기 처리)
            //$('#load').show();
        },
        complete: function () {
            //(이미지 감추기 처리)
            //$('#load').hide();
        },
        error: function (jqXHR, textStatus, errorThrown, responseText) {
            //alert("ajax error \n" + textStatus + " : " + errorThrown);
            console.log(jqXHR);
            console.log(jqXHR.readyState);
            console.log(jqXHR.responseText);
            console.log(jqXHR.responseJSON);
        }
    }) //end ajax
})

$(document).on("click", ".sgg li", function () {
    var allData = { "gugunKey": ljsIsNull($("#sgg option:selected").val()) ? '' : $("#sgg option:selected").val(), "sidoKey": $("#sidoText").text() }

    $.ajax({
        url: "/api/getDongMaster",
        data: JSON.stringify(allData),
        async: true,
        type: "POST",
        dataType: "json",
        contentType: 'application/json; charset=utf-8',
        success: function (rt, jqXHR) {
            var data = rt.resultData;
            $("#emdUl li").remove();
            $("#emd option").remove();
            $("#emdUl").append("<li><p>전체</p></li>");
            $("#emd").append("<option value=''>전체</option>");
            for (var i = 0; i < data.length; i++) {
                $("#emdUl").append("<li><p>" + data[i].bm_dong + "</p></li>");
                $("#emd").append("<option>" + data[i].bm_dong + "</option>");
            }

            $("#sido").val($("#sidoText").text()).attr("selected", "selected");
            $("#sgg").val($("#sggText").text()).attr("selected", "selected");
            // downloadExcel(rt.results);
        },
        beforeSend: function () {
            //(이미지 보여주기 처리)
            //$('#load').show();
        },
        complete: function () {
            //(이미지 감추기 처리)
            //$('#load').hide();
        },
        error: function (jqXHR, textStatus, errorThrown, responseText) {
            //alert("ajax error \n" + textStatus + " : " + errorThrown);
            console.log(jqXHR);
            console.log(jqXHR.readyState);
            console.log(jqXHR.responseText);
            console.log(jqXHR.responseJSON);
        }
    }) //end ajax
})

$(document).on("click", ".emd li", function () {
    $("#sido").val($("#sidoText").text()).attr("selected", "selected");
    $("#sgg").val($("#sggText").text()).attr("selected", "selected");
    $("#emd").val($("#emdText").text()).attr("selected", "selected");
    var allData = { "dongKey": $("#emdText").text(), "gugunKey": $("#sggText").text(), "sidoKey": $("#sidoText").text() }

    $.ajax({
        url: "/api/getRiMaster",
        data: JSON.stringify(allData),
        async: true,
        type: "POST",
        dataType: "json",
        contentType: 'application/json; charset=utf-8',
        success: function (rt, jqXHR) {
            var data = rt.resultData;
            $("#riUl li").remove();
            $("#ri option").remove();
            $("#riUl").append("<li><p>전체</p></li>");
            $("#ri").append("<option value=''>전체</option>");
            for (var i = 0; i < data.length; i++) {
                $("#riUl").append("<li><p>" + data[i].rm_ri + "</p></li>");
                $("#ri").append("<option>" + data[i].rm_ri + "</option>");
            }
        },
        beforeSend: function () {
        },
        complete: function () {
        },
        error: function (jqXHR, textStatus, errorThrown, responseText) {
            //alert("ajax error \n" + textStatus + " : " + errorThrown);
            console.log(jqXHR);
            console.log(jqXHR.readyState);
            console.log(jqXHR.responseText);
            console.log(jqXHR.responseJSON);
        }
    }) //end ajax
})



//일반 실행
$(function () {
    var formSerializeArray = $('#searchForm').serializeArray();
    var object = {};
    for (var i = 0; i < formSerializeArray.length; i++) {
        if (formSerializeArray[i]['value'] === '전체') {
            continue; // "전체"가 선택된 경우, 해당 파라미터를 넘기지 않음
        }
        object[formSerializeArray[i]['name']] = formSerializeArray[i]['value'];
    }

    var json = JSON.stringify(formSerializeArray);

    console.log("----------jsonobj------------");
    console.log(json);
    console.log("object issueManageRadio01:" + object.issueManageRadio01);

    loadDataTable(object);
    console.log("-----------------------");
})











// ***** 콤보박스 *****************
// 커스텀 selectbox
const initComboBox = () => {
    const createCustomLiIssueCodeMgmt = () => {
        const contentItems = document.querySelectorAll('.selectICodeContentArea');
        $('.selectICodeContentArea .customSelectBtns').html('');
    
        contentItems.forEach(contentItem => {
            const notsetAddSelectBox = contentItem.querySelector('select');
            // select가 없으면 return
            if (!notsetAddSelectBox) return;
    
            const customSelectBox = contentItem.querySelector('.customSelectBox');
            const customSelectBtns = customSelectBox.querySelector('.customSelectBtns');
    
            for (let i = 0; i < notsetAddSelectBox.length; i++) {
                const optionValue = notsetAddSelectBox.options[i].value;
                const optionText = notsetAddSelectBox.options[i].text;
                const li = document.createElement('li');
                const button = document.createElement('button');
                button.classList.add('moreSelectBtn');
                button.type = 'button';
                button.textContent = optionText;
                button.setAttribute('data', optionValue)
                li.appendChild(button);
                customSelectBtns.appendChild(li);
            }
        });
    }
    createCustomLiIssueCodeMgmt();
    
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
            const nearByContent = moreBtn.closest('.selectICodeContentArea');
            const nearBySelectBox = nearByContent.querySelector('select');
            nearBySelectBox.value = moreBtn.getAttribute("data");
            console.log(`Selected value: ${nearBySelectBox.value}`);
            if(nearBySelectBox.getAttribute('id') == 'issueCodeMgmtSelectBox01_1') {
                loadDepth2Codes();
            } else if (nearBySelectBox.getAttribute('id') == 'issueCodeMgmtSelectBox01_2') {
                loadDepth3Codes();
            };
        })
    })
};

initComboBox();

const customSelectView = document.querySelectorAll('.customSelectView')
    
customSelectView.forEach((btn) => {
    btn.addEventListener('click', function () {
        btn.classList.toggle('active');

        if (btn.nextElementSibling) {
            btn.nextElementSibling.classList.toggle('active');

        }
    })
});

// 분류 데이터 가져오기
// 대분류 selectIssueCodeListDepth1
(() => {
	$.ajax({
		url: "/issue/selectIssueCodeListDepth1",
		async: true,
		type: "POST",
		dataType: "json",
		contentType: 'application/json; charset=utf-8',
		success: function (response) {
			console.log(response);
            if (response.message="success"){
                const resultData = response.result;

                var optionsStr = '<option value="" selected>전체</option>';
                for (row of resultData) {
                    optionsStr += '<option value="' + row.code + '">' + row.code_name + '</option>'
                }
                $('#issueCodeMgmtSelectBox01_1').html(optionsStr);
                $('#issueCodeMgmtSelectBox01_2').html('<option value="" selected>전체</option>');
                $('#issueCodeMgmtSelectBox01_3').html('<option value="" selected>전체</option>');

                initComboBox();
            }
		},
		error: function () {
		}
	});
})();

// 중분류 selectIssueCodeListDepth2
const loadDepth2Codes = () => {
    var depth1Code = $('#issueCodeMgmtSelectBox01_1').val();
    if (depth1Code == '') {
        $('#issueCodeMgmtSelectBox01_2').html('<option value="">전체</option>');
        $('#issueCodeMgmtSelectBox01_3').html('<option value="">전체</option>');
        initComboBox();
        $($('#depth2Codes button')[0]).trigger('click')
        $($('#depth3Codes button')[0]).trigger('click')
        return;
    }

	$.ajax({
		url: "/issue/selectIssueCodeListDepth2?DEPTH1=" + depth1Code,
		async: true,
		type: "POST",
		dataType: "json",
		contentType: 'application/json; charset=utf-8',
		success: function (response) {
			console.log(response);
            if (response.message="success"){
                const resultData = response.result;

                var optionsStr = '<option value="">전체</option>';
                for (row of resultData) {
                    optionsStr += '<option value="' + row.code + '">' + row.code_name + '</option>'
                }
                $('#issueCodeMgmtSelectBox01_2').html(optionsStr);
                $('#issueCodeMgmtSelectBox01_3').html('<option value="">전체</option>');

                initComboBox();
                $($('#depth2Codes button')[0]).trigger('click')
                $($('#depth3Codes button')[0]).trigger('click')
            }
		},
		error: function () {
		}
	});
};

// 세분류 selectIssueCodeListDepth2
const loadDepth3Codes = () => {
    var depth1Code = $('#issueCodeMgmtSelectBox01_1').val();
    var depth2Code = $('#issueCodeMgmtSelectBox01_2').val();
    if (depth2Code == '') {
        $('#issueCodeMgmtSelectBox01_3').html('<option value="">전체</option>');
        initComboBox();
        $($('#depth3Codes button')[0]).trigger('click');
        return;
    }

	$.ajax({
		url: "/issue/selectIssueCodeListDepth3?DEPTH1=" + depth1Code + '&DEPTH2=' + depth2Code,
		async: true,
		type: "POST",
		dataType: "json",
		contentType: 'application/json; charset=utf-8',
		success: function (response) {
			console.log(response);
            if (response.message="success"){
                const resultData = response.result;

                var optionsStr = '<option value="">전체</option>';
                for (row of resultData) {
                    optionsStr += '<option value="' + row.code + '">' + row.code_name + '</option>'
                }
                $('#issueCodeMgmtSelectBox01_3').html(optionsStr);

                initComboBox();
                $($('#depth3Codes button')[0]).trigger('click')
            }
		},
		error: function () {
		}
	});
};

