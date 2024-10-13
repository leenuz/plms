// 커스텀 selectbox
const initComboBox = () => {
  const createCustomLiMasterEdit = () => {
    const contentItems = document.querySelectorAll('.selectContentArea');
    $('.selectContentArea .customSelectBtns').html('');

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
  createCustomLiMasterEdit();

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
      nearBySelectBox.value = moreBtn.getAttribute("data");
      console.log(`Selected value: ${nearBySelectBox.value}`);
      if (nearBySelectBox.getAttribute('id') == 'issueStatusSelectBox02_1') {
        loadDepth2Codes();
      } else if (nearBySelectBox.getAttribute('id') == 'issueStatusSelectBox02_2') {
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

                console.log(resultData);
                var optionsStr = '<option value="" selected>대분류</option>';
                for (row of resultData) {
                    optionsStr += '<option value="' + row.code + '">' + row.code_name + '</option>'
                }
                $('#issueStatusSelectBox02_1').html(optionsStr);
                $('#issueStatusSelectBox02_2').html('<option value="" selected>중분류</option>');
                $('#issueStatusSelectBox02_3').html('<option value="" selected>세분류</option>');

                initComboBox();
            }
		},
		error: function () {
		}
	});
})();

// 중분류 selectIssueCodeListDepth2
const loadDepth2Codes = () => {
    var depth1Code = $('#issueStatusSelectBox02_1').val();
    if (depth1Code == '') {
        $('#issueStatusSelectBox02_2').html('<option value="">중분류</option>');
        $('#issueStatusSelectBox02_3').html('<option value="">세분류</option>');
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

                var optionsStr = '<option value="">중분류</option>';
                for (row of resultData) {
                    optionsStr += '<option value="' + row.code + '">' + row.code_name + '</option>'
                }
                $('#issueStatusSelectBox02_2').html(optionsStr);
                $('#issueStatusSelectBox02_3').html('<option value="">세분류</option>');

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
    var depth1Code = $('#issueStatusSelectBox02_1').val();
    var depth2Code = $('#issueStatusSelectBox02_2').val();
    if (depth2Code == '') {
        $('#issueStatusSelectBox02_3').html('<option value="">세분류</option>');
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

                var optionsStr = '<option value="">세분류</option>';
                for (row of resultData) {
                    optionsStr += '<option value="' + row.code + '">' + row.code_name + '</option>'
                }
                $('#issueStatusSelectBox02_3').html(optionsStr);

                initComboBox();
                $($('#depth3Codes button')[0]).trigger('click')
            }
		},
		error: function () {
		}
	});
};

var jisa = '';

$('.issueStatusBtn').click(function () {
  var allData = $("#queryForm").serialize();
  jisa = $('#issueStatusSelectBox01_3').val();

  console.log(allData);
  
  $.ajax({
    url: "/statics/selectIssueStatisticsList?" + allData,
    data: JSON.stringify(allData),
    async: true,
    type: "POST",
    dataType: "json",
    contentType: 'application/json; charset=utf-8',
    beforeSend: function(request) {
        console.log("beforesend ........................");
        loadingShow();
    },
    success: function (response) {
      loadingHide();
      console.log(response);
      if (response.success = "Y") {
        const resultData = response.dataList;

        var table1Data = []; // 지상권 설정
        var table2Data = []; // 지상권 미설정
        var table3Data = []; // 점용/미점용

        // 데이터 분류
        for (var i = 0; i < resultData.length; i++) {
          var codeData = resultData[i];
          var prefix = codeData.depth1.substr(0, 2);
          if (prefix == 'DY') {
            table1Data.push(codeData);
          } else if (prefix == 'DN') {
            table2Data.push(codeData);
          } else {
            table3Data.push(codeData);
          }
        }

        if (table1Data.length > 0) {
          $('#depth1Div').show();
        } else {
          $('#depth1Div').hide();
        }
        if (table2Data.length > 0) {
          $('#depth2Div').show();
        } else {
          $('#depth2Div').hide();
        }
        if (table3Data.length > 0) {
          $('#depth3Div').show();
        } else {
          $('#depth3Div').hide();
        }

        var tbodyStr = '';

        // ### 지상권 설정 테이블
        for (var i = 0; i < table1Data.length; i++) {
          var row = table1Data[i];

          var trStr = '<tr>';
          if (i == 0) {
            trStr += '<td rowspan="' + table1Data.length + '"><p>지상권 설정</p></td>';
            trStr += '<td rowspan="' + table1Data.length + '"><p>계약 체결</p></td>';
          }
          trStr += '<td><p>' + row.depth1_name + '</p></td>';
          trStr += '<td><p>' + row.depth2_name + '</p></td>';
          trStr += '<td><p>' + row.depth3_name + '</p></td>';
          trStr += '<td><p class="textunderline" onclick="showPopup(\'' + row.depth1 + '\', \'' + row.depth2 + '\', \'' + row.depth3 + '\', \'' + row.depth1_name + '\', \'' + row.depth2_name + '\', \'' + row.depth3_name + '\')">' + row.potential_issue_cnt + '</p></td>';
          trStr += '<td><p class="textunderline" onclick="showPopup2(\'' + row.depth1 + '\', \'' + row.depth2 + '\', \'' + row.depth3 + '\', \'' + row.depth1_name + '\', \'' + row.depth2_name + '\', \'' + row.depth3_name + '\')">' + row.minwon_total_cnt + '</p></td>';
          trStr += '</tr>';

          tbodyStr += trStr;
        }
        $('#tbody1').html(tbodyStr);

        // ### 지상권 미설정 테이블
        tbodyStr = '';
        var registedIdxArr = []; // 계약체결 카운트
        var depth1IdxArr = [];
        var depth2IdxArr = [];
        var rComp = '';
        var depth1Comp = '';
        var depth2Comp = '';
        for (var i = 0; i < table2Data.length; i++) {
          var row = table2Data[i];

          if (row.registed_yn != rComp) {
            registedIdxArr.push(i);
            rComp = row.registed_yn;
          }
          if (row.depth1 != depth1Comp) {
            depth1IdxArr.push(i);
            depth1Comp = row.depth1;
          }
          if (row.depth2 != depth2Comp) {
            depth2IdxArr.push(i);
            depth2Comp = row.depth2;
          }
        }
        registedIdxArr.push(table2Data.length);
        depth1IdxArr.push(table2Data.length);
        depth2IdxArr.push(table2Data.length);

        for (var i = 0; i < table2Data.length; i++) {
          var row = table2Data[i];

          var trStr = '<tr>';
          if (i == 0) {
            trStr += '<td rowspan="' + table2Data.length + '"><p>지상권 미설정</p></td>';
          }
          if (i == registedIdxArr[0]) {
            registedIdxArr.shift();
            trStr += '<td rowspan="' + (registedIdxArr[0] - i) + '"><p>계약 ' + ((row.registed_yn != 'Y') ? '미' : '') + '체결</p></td>';
          }
          if (i == depth1IdxArr[0]) {
            depth1IdxArr.shift();
            trStr += '<td rowspan="' + (depth1IdxArr[0] - i) + '"><p>' + row.depth1_name + '</p></td>';
          }
          if (i == depth2IdxArr[0]) {
            depth2IdxArr.shift();
            trStr += '<td rowspan="' + (depth2IdxArr[0] - i) + '"><p>' + row.depth2_name + '</p></td>';
          }
          trStr += '<td><p>' + row.depth3_name + '</p></td>';
          trStr += '<td><p class="textunderline" onclick="showPopup(\'' + row.depth1 + '\', \'' + row.depth2 + '\', \'' + row.depth3 + '\', \'' + row.depth1_name + '\', \'' + row.depth2_name + '\', \'' + row.depth3_name + '\')">' + row.potential_issue_cnt + '</p></td>';
          trStr += '<td><p class="textunderline" onclick="showPopup2(\'' + row.depth1 + '\', \'' + row.depth2 + '\', \'' + row.depth3 + '\', \'' + row.depth1_name + '\', \'' + row.depth2_name + '\', \'' + row.depth3_name + '\')">' + row.minwon_total_cnt + '</p></td>';
          trStr += '</tr>';

          tbodyStr += trStr;
        }
        $('#tbody2').html(tbodyStr);

        // ### 점용 테이블
        tbodyStr = '';
        registedIdxArr = []; // 허가증 보유여부 카운트
        depth1IdxArr = [];
        depth2IdxArr = [];
        rComp = '';
        depth1Comp = '';
        depth2Comp = '';
        for (var i = 0; i < table3Data.length; i++) {
          var row = table3Data[i];

          if (row.permitted_yn != rComp) {
            registedIdxArr.push(i);
            rComp = row.permitted_yn;
          }
          if (row.depth1 != depth1Comp) {
            depth1IdxArr.push(i);
            depth1Comp = row.depth1;
          }
          if (row.depth2 != depth2Comp) {
            depth2IdxArr.push(i);
            depth2Comp = row.depth2;
          }
        }
        registedIdxArr.push(table3Data.length);
        depth1IdxArr.push(table3Data.length);
        depth2IdxArr.push(table3Data.length);

        for (var i = 0; i < table3Data.length; i++) {
          var row = table3Data[i];

          var trStr = '<tr>';
          if (i == registedIdxArr[0]) {
            registedIdxArr.shift();
            trStr += '<td rowspan="' + (registedIdxArr[0] - i) + '"><p>' + ((row.permitted_yn != 'Y') ? '미점용' : '점용') + '</p></td>';
            trStr += '<td rowspan="' + (registedIdxArr[0] - i) + '"><p>허가증 ' + ((row.permitted_yn != 'Y') ? '미' : '') + '보유</p></td>';
          }
          if (i == depth1IdxArr[0]) {
            depth1IdxArr.shift();
            trStr += '<td rowspan="' + (depth1IdxArr[0] - i) + '"><p>' + row.depth1_name + '</p></td>';
          }
          if (i == depth2IdxArr[0]) {
            depth2IdxArr.shift();
            trStr += '<td rowspan="' + (depth2IdxArr[0] - i) + '"><p>' + row.depth2_name + '</p></td>';
          }
          trStr += '<td><p>' + row.depth3_name + '</p></td>';
          trStr += '<td><p class="textunderline" onclick="showPopup(\'' + row.depth1 + '\', \'' + row.depth2 + '\', \'' + row.depth3 + '\', \'' + row.depth1_name + '\', \'' + row.depth2_name + '\', \'' + row.depth3_name + '\')">' + row.potential_issue_cnt + '</p></td>';
          trStr += '<td><p class="textunderline" onclick="showPopup2(\'' + row.depth1 + '\', \'' + row.depth2 + '\', \'' + row.depth3 + '\', \'' + row.depth1_name + '\', \'' + row.depth2_name + '\', \'' + row.depth3_name + '\')">' + row.minwon_total_cnt + '</p></td>';
          trStr += '</tr>';

          tbodyStr += trStr;
        }
        $('#tbody3').html(tbodyStr);
      }
    },
    error: function () {
    }
  });
});

function showPopup(depth1_code, depth2_code, depth3_code, depth1_name, depth2_name, depth3_name) {
    var param = 'JISA=' + jisa;
    param += '&DEPTH1NAME=' + depth1_name + '&DEPTH2NAME=' + depth2_name + '&DEPTH3NAME=' + depth3_name;
    param += '&DEPTH1CODE=' + depth1_code + '&DEPTH2CODE=' + depth2_code + '&DEPTH3CODE=' + depth3_code;

    $.ajax({
        url: "/stats/issuePopup?" + param,
        async: true,
        type: "GET",
        // dataType: "json",
        contentType: 'html/text; charset=utf-8',
        success: function (response) {
          console.log(response);
          $('#issueStatusParcelPopupWrapper').html(response);
        },
        error: function (error) {
            console.log(error);
        }
      });
}

function showPopup2(depth1_code, depth2_code, depth3_code, depth1_name, depth2_name, depth3_name) {
    var param = 'JISA=' + jisa;
    param += '&DEPTH1NAME=' + depth1_name + '&DEPTH2NAME=' + depth2_name + '&DEPTH3NAME=' + depth3_name;
    param += '&DEPTH1CODE=' + depth1_code + '&DEPTH2CODE=' + depth2_code + '&DEPTH3CODE=' + depth3_code;

    $.ajax({
        url: "/stats/issuePopup2?" + param,
        async: true,
        type: "GET",
        // dataType: "json",
        contentType: 'html/text; charset=utf-8',
        success: function (response) {
          console.log(response);
          $('#issueStatusParcelPopupWrapper').html(response);
        },
        error: function (error) {
            console.log(error);
        }
      });
}