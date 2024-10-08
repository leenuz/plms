var loadSysCodeList = [];
var selectIndex;

// 지사 선택 시 허가관청 목록 업데이트를 위한 change 이벤트 트리거
$(document).on("click", "#sjisaUl li", function () {
    const selectedJisa = $(this).text().trim();
    $("#sjisaText").text(selectedJisa);
    $("#privateUseSelectBox01_1").val(selectedJisa).change(); // change 이벤트 트리거
});

// 지사 선택 시 허가관청 목록 업데이트
$(document).on("change", "#privateUseSelectBox01_1", function () {
    const selectedJisa = $("#privateUseSelectBox01_1").val();
    console.log("지사 선택에 따라 허가관청 목록 업데이트");
    if (!selectedJisa) return;

    const allData = { jisa: selectedJisa };

    $.ajax({
        url: "/land/gover/getPmtOffice", // 허가관청 목록을 가져오는 API
        data: JSON.stringify(allData),
        async: true,
        type: "POST",
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        success: function (rt) {
            const data = rt.resultData;

            // 허가관청 리스트 초기화 및 업데이트
            $("#spmtOfficeUl li").remove();
            $("#privateUseSelectBox01_3 option").remove();
            $("#spmtOfficeUl").append("<li><p>전체</p></li>");
            $("#privateUseSelectBox01_3").append("<option value=''>전체</option>");
            for (let i = 0; i < data.length; i++) {
                $("#spmtOfficeUl").append("<li><p>" + data[i].so_pmt_office + "</p></li>");
                $("#privateUseSelectBox01_3").append("<option>" + data[i].so_pmt_office + "</option>");
            }
        },
        error: function (jqXHR, textStatus, errorThrown) {
            console.error("Error: ", textStatus, errorThrown);
        }
    });
});

// 허가관청 선택 시 관리기관 목록 업데이트
$(document).on("click", "#spmtOfficeUl li", function () {
    const selectedPmtOffice = $(this).text().trim();
    $("#spmtOfficeText").text(selectedPmtOffice);
    $("#privateUseSelectBox01_3").val(selectedPmtOffice).change(); // change 이벤트 트리거
});

$(document).on("change", "#privateUseSelectBox01_3", function () {
    const selectedPmtOffice = $("#privateUseSelectBox01_3").val();
    const selectedJisa = $("#privateUseSelectBox01_1").val(); // 지사 선택된 값

    console.log("허가관청 선택에 따라 관리기관 목록 업데이트");
    if (!selectedPmtOffice || !selectedJisa) return;

    const allData = { 
        pmt_office: selectedPmtOffice,
        jisa: selectedJisa 
    };

    $.ajax({
        url: "/land/gover/getAdmOffice", // 관리기관 목록을 가져오는 API
        data: JSON.stringify(allData),
        async: true,
        type: "POST",
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        success: function (rt) {
            const data = rt.resultData;

            // 관리기관 리스트 초기화 및 업데이트
            $("#sadmOfficeUl li").remove();
            $("#privateUseSelectBox01_4 option").remove();
            $("#sadmOfficeUl").append("<li><p>전체</p></li>");
            $("#privateUseSelectBox01_4").append("<option value=''>전체</option>");
            for (let i = 0; i < data.length; i++) {
                $("#sadmOfficeUl").append("<li><p>" + data[i].so_adm_office + "</p></li>");
                $("#privateUseSelectBox01_4").append("<option>" + data[i].so_adm_office + "</option>");
            }
        },
        error: function (jqXHR, textStatus, errorThrown) {
            console.error("Error: ", textStatus, errorThrown);
        }
    });
});


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
	let orgAdminRegisterPath = '/land/gover/orgAdminPopupReg';

	if (orgAdminRegisterPopWrapper) {
		let xhr = new XMLHttpRequest();
		xhr.open('GET', orgAdminRegisterPath, true);
		xhr.onreadystatechange = function() {
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
	let orgAdminRegisterPath = '/land/gover/orgAdminPopupRegCancel';

	if (orgAdminRegisterPopWrapper) {
		let xhr = new XMLHttpRequest();
		xhr.open('GET', orgAdminRegisterPath, true);
		xhr.onreadystatechange = function() {
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
	let orgAdminRegisterPath = '/land/gover/orgAdminPopupMod';

	if (orgAdminRegisterPopWrapper) {
		let xhr = new XMLHttpRequest();
		xhr.open('GET', orgAdminRegisterPath, true);
		xhr.onreadystatechange = function() {
			if (xhr.readyState == 4 && xhr.status == 200) {
				orgAdminRegisterPopWrapper.innerHTML = xhr.responseText;
				runScriptsInElement(orgAdminRegisterPopWrapper);
			}
		};
		xhr.send();
		console.log('orgAdminRegisterPopWrapper작동');
	}
}

// 승인대기 버튼 클릭 시 팝업
$(document).on("click", ".pendingApprovalBtn", function() {
	var ul = $(this).parent().parent().parent().parent().html();
	console.log(ul);
	
	var idx = $(this).parent().parent().parent().parent().find("#idx").val();
	console.log("idx:" + idx);
	
	const orgAdminRegisterPopWrapper = document.querySelector(".popupWrapper");

	/* let orgAdminRegisterPath = '/land/gover/orgAdminPopupAccept';
	 var buttonElement = this;  // 일반 JavaScript로 접근
	   console.log(buttonElement);  // 현재 버튼 element를 확인
	   var buttonHtml = $(this).html();  // jQuery를 사용하여 HTML 내용 가져오기
		 console.log(buttonHtml);  // 버튼 안의 HTML 내용을 출력
	 var ul=$(this).html();
		   console.log(ul);

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
	   console.log('orgAdminRegisterPopWrapper작동:showAcceptPopup');
   	
	 }*/
	var datas = { "idx": idx }
	$.ajax({
		url: "/land/gover/getGoverOfficeMngEditPage",
		type: "POST",
		data: datas,
	})
	.done(function(fragment) {
		console.log("***fragment***");
		console.log(fragment);
		$('#approve_Popup').replaceWith(fragment);
		const popupOpen = document.querySelector("#approve_Popup");
		console.log($(popupOpen).html());
		$(popupOpen).addClass("active");
		// popupOpen.classList.add("active");
	});
})


// 승인 버튼 클릭 이벤트
$(document).on("click", "#approve_Popup .approveBtn", function() {
    const idx = $("#approve_Popup").find("input[name='idx']").val(); // idx 값을 가져옴

    if (!idx) {
        alert("Invalid data");
        return;
    }

    $.ajax({
        url: '/land/gover/approveGoverOffice',
        type: 'POST',
        data: { idx: parseInt(idx, 10) },  // 정수로 변환
        success: function(result) {
            if (result === "Success") {
                alert("승인이 완료되었습니다.");
                $("#approve_Popup").removeClass("active");
            } else {
                alert("승인에 실패했습니다.");
            }
        },
        error: function(error) {
            console.error('Error:', error);
            alert("승인 중 오류가 발생했습니다.");
        }
    });
});


// 승인 팝업
function showAcceptPopup() {
	const orgAdminRegisterPopWrapper = document.querySelector(".popupWrapper");

	let orgAdminRegisterPath = '/land/gover/orgAdminPopupAccept';
	var buttonElement = this;  // 일반 JavaScript로 접근
	console.log(buttonElement);  // 현재 버튼 element를 확인
	var buttonHtml = $(this).html();  // jQuery를 사용하여 HTML 내용 가져오기
	console.log(buttonHtml);  // 버튼 안의 HTML 내용을 출력
	var ul = $(this).html();
	console.log(ul);

	if (orgAdminRegisterPopWrapper) {
		let xhr = new XMLHttpRequest();
		xhr.open('GET', orgAdminRegisterPath, true);
		xhr.onreadystatechange = function() {
			if (xhr.readyState == 4 && xhr.status == 200) {
				orgAdminRegisterPopWrapper.innerHTML = xhr.responseText;
				runScriptsInElement(orgAdminRegisterPopWrapper);
			}
		};
		xhr.send();
		console.log('orgAdminRegisterPopWrapper작동:showAcceptPopup');
	}
}


// x 버튼, 닫기, 승인 버튼 클릭 시 팝업 닫기
$(document).on("click", "#approve_Popup .topCloseBtn, #approve_Popup .closeBtn", function() {
    $("#approve_Popup").removeClass("active");
});


// 등록버튼 클릭 이벤트
$('#regBtn').on('click', function() {
	//showRegPopup();
	const popupOpen = document.querySelector("#registerPopup");
	console.log($(popupOpen).html());
	$(popupOpen).addClass("active");
	
	// 폼 초기화
	$('#saveForm')[0].reset();  // 폼의 모든 값을 초기화
	$("#jisaText").text("전체");  // 지사 셀렉트 박스 초기화
	$("#pmtOfficeText").text("전체");  // 허가관청 셀렉트 박스 초기화
});


$(document).ready(function() {
	console.log("-------------orgAdmin load--------------");
	mergeTableCells("#mainTable", 1);
	//mergeTableCells("#mainTable",2);
	
	
	/********* 241002 ************/
	//초이초이초이초이
	//코드그룹 선택시 script
	$("#codegroupTextUl li").on("click", function(){
		const selectedCodeGroup = $(this).text().trim();
		$("#selectCodeGroupText").text(selectedCodeGroup);
		showgrouplist();
		systemCodeListLoad(selectedCodeGroup);
	});
	
	//팝업 코드그룹 선택시 script
	$("#popupCodeGroupUl li").on("click", function(){
		const selectedCodeGroup = $(this).text().trim();
		$("#popupCodeGroupText").text(selectedCodeGroup);
		popupGroupList();
	});
	
	//팝업 사용여부 선택시 script
	$("#popup_useYnUl li").on("click", function(){
		const selectYn = $(this).text().trim();
		$("#popup_useYnText").text(selectYn);
		popupUseYnView();
	});
	
});


// 체크박스 선택 이벤트
function toggleElements() {
	const checkbox = document.getElementById("approvePopup_checkbox");
	const inputContainer = document.querySelector(".approve_hidden_text");
	const selectContainer = document.querySelector(".popContent_default");

	if (checkbox.checked) {
		inputContainer.classList.add("active");
		selectContainer.classList.remove("active");
	} else {
		inputContainer.classList.remove("active");
		selectContainer.classList.add("active");
	}
}

// 관리기관 등록 팝업
registerApprovePopEvet = () => {
	const registerApprovePopupOpen = document.getElementById("registerPopup");
	if (registerApprovePopupOpen) {
		registerApprovePopupOpen
			.querySelectorAll(".topCloseBtn, .closeBtn")
			.forEach(function(btn) {
				btn.addEventListener("click", () => {
					registerApprovePopupOpen.classList.remove("active");
				});
			});
		registerApprovePopupOpen
			.querySelectorAll(".topCloseBtn, .approveBtn")
			.forEach(function(btn) {
				btn.addEventListener("click", () => {
					console.log("----------------approveBtn----------------");
					
					// 폼 데이터 직렬화
					var formSerializeArray = $('#saveForm').serializeArray();
					var object = {};
					
					// 직렬화된 데이터를 object로 변환
					for (var i = 0; i < formSerializeArray.length; i++) {
						object[formSerializeArray[i]['name']] = formSerializeArray[i]['value'];
					}
					
					// 선택된 epmt_office 값 수동 추가
					object.epmt_office = document.getElementById("epmt_office").value;
					object.pmt_office = $("input[name='pmt_office']").val(); // pmt_office 값 추가

					console.log(object);
					
					// 입력값 검증: 지사, 허가관청, 관리기관이 비어있는지 확인
					if (!object.jisa) {
						alert("지사를 입력해주세요.");
						return;
					}
					if (!object.pmt_office) {
						alert("허가관청을 입력해주세요.");
						return;
					}
					if (!object.adm_office) {
						alert("관리기관을 입력해주세요.");
						return;
					}
					
					if (object.newCheck == "on") {
						object.gubun = "insert";
					} else {
						object.gubun = "modify";
					}
					$.ajax({
						url: "/land/gover/insertOfficeMng",
						type: 'POST',
						contentType: "application/json",
						data: JSON.stringify(object),
						dataType: "json",
						beforeSend: function(request) {
							console.log("beforesend ........................");
							loadingShow();
						},
						success: function(response) {
							loadingHide();
							console.log(response);
							if (response.success == "Y") {
								console.log("response.success Y");
								alert(response.message);
								registerApprovePopupOpen.classList.remove("active"); // 팝업 닫기
							} else {
								console.log("response.success N");
								alert(response.message);
							}
						},
						error: function(jqXHR, textStatus, errorThrown) {
							alert("finalBtn ajax error\n" + textStatus + ":" + errorThrown);
							return false;
						}
					});
				});
			});
	}
};

registerApprovePopEvet();

//셀렉박스 이벤트
function newcomplaintSelect01() {
	const registerApproveSelectWrapitems = document.querySelectorAll(
		"#registerPopup .popSelectWrap"
	);

	if (registerApproveSelectWrapitems) {
		registerApproveSelectWrapitems.forEach((contentitem) => {
			const nowIssueSelectBox01 = contentitem.querySelector("select");

			if (!nowIssueSelectBox01) return;

			const popCustomSelectBox01 = contentitem.querySelector(
				"#registerPopup .Popup_Custom_SelectBox"
			);
			const popCustomSelectBtns01 = popCustomSelectBox01.querySelector(
				"#registerPopup .Popup_Custom_SelectBtns"
			);

			for (let i = 0; i < nowIssueSelectBox01.length; i++) {
				const optionValue01 = nowIssueSelectBox01.options[i].value;
				const li01 = document.createElement("li");
				const button01 = document.createElement("button");
				button01.classList.add("PopupMoreSelectBtn");
				button01.type = "button";
				button01.textContent = optionValue01 == '' ? '전체' : optionValue01;
				li01.appendChild(button01);
				popCustomSelectBtns01.appendChild(li01);
			}
		});
	}
}

newcomplaintSelect01();

customSelectView01 = document.querySelectorAll(
	"#registerPopup .Popup_Custom_SelectView"
);

if (customSelectView01) {
	customSelectView01.forEach((btn) => {
		btn.addEventListener("click", function() {
			btn.classList.toggle("active");
			if (btn.nextElementSibling) {
				btn.nextElementSibling.classList.toggle("active");
			}
		});
	});
}
/*
PopupMoreSelectBtn01 = document.querySelectorAll(
	"#registerPopup .PopupMoreSelectBtn"
);

if (PopupMoreSelectBtn01) {
	PopupMoreSelectBtn01.forEach((moreBtn) => {
		moreBtn.addEventListener("click", function() {
			var moreBtnText01 = moreBtn.innerText;
			console.log(moreBtnText01);
			const parentMoreBtn01 = moreBtn.closest(".Popup_Custom_SelectBtns");
			const editViewBtn01 = parentMoreBtn01.previousElementSibling;
			while (editViewBtn01.firstChild) {
				editViewBtn01.removeChild(editViewBtn01.firstChild);
			}
			const textNode01 = document.createTextNode(moreBtnText01);

			editViewBtn01.appendChild(textNode01);
			editViewBtn01.classList.remove("active");
			parentMoreBtn01.classList.remove("active");

			const nearByContent01 = moreBtn.closest(".popSelectWrap");
			const nearBySelectBox01 = nearByContent01.querySelector("select");
			nearBySelectBox01.value = moreBtn.textContent;

			console.log(`Selected value: ${nearBySelectBox01.value}`);

			var object = {};

			object.jisa = nearBySelectBox01.value;
			console.log(object);
			// registerApprovePopupOpen.classList.remove("active");

			url = "/land/gover/getselectOfficeMng";
			$.ajax({
				url: url,
				type: 'POST',
				contentType: "application/json",
				data: JSON.stringify(object),
				dataType: "json",
				beforeSend: function(request) {
					console.log("beforesend ........................");
					loadingShow();
				},
				success: function(response) {
					console.log(response);
					if (response.success = "Y") {
						console.log("response.success Y");
						//console.log("response.resultData length:"+response.resultData.length);
						$("#epmt_office option").remove();
						$("#epmt_office").append('<option value="">전체</option>');
						for (var i = 0; i < response.result.length; i++) {
							$("#epmt_office").append("<option value='" + response.result[i].pmt_office + "'>" + response.result[i].pmt_office + "</option>");
						}
						newcomplaintSelect01();
						$("#popup_bg").show();
						$("#popup").show(500);
						//$("#addrPopupLayer tbody td").remove();
						for(var i=0;i<response.resultData.length;i++){
							$("#addrPopupTable tbody").append("<tr><td>"+response.resultData[i].juso+"</td><td><button>선택</button></td></tr>");
						}
					}
					else {
						console.log("response.success N");
					}
				},
				error: function(jqXHR, textStatus, errorThrown) {
					alert("finalBtn ajax error\n" + textStatus + ":" + errorThrown);
					return false;
				}

			});
		});
	});
}*/

// 체크박스 선택 이벤트
function toggleElements03() {
	const checkbox03 = document.getElementById("registerPopup_checkbox02");
	const inputContainer03 = document.querySelector("#registerPopup .register_hidden_text");
	const selectContainer03 = document.querySelector(
		"#registerPopup .register_title_th6 .Popup_Custom_SelectBox"
	);

	if (checkbox03.checked) {
		inputContainer03.classList.add("active");
		selectContainer03.classList.remove("active");
	} else {
		inputContainer03.classList.remove("active");
		selectContainer03.classList.add("active");
	}
}

// 지사 선택 시 허가관청 목록 업데이트
$(document).on("click", "#jisaUl li", function () {
    const selectedJisa = $(this).text().trim(); // 선택한 지사 텍스트
    $("#jisaText").text(selectedJisa); // 버튼 텍스트 변경
    $("#jisaSelectBox").val(selectedJisa).change(); // select box 값 설정 후 change 이벤트 트리거
	
	// 허가관청 초기화
	$("#pmtOfficeText").text("전체"); // 허가관청 버튼 텍스트 초기화
	$("#epmtOfficeSelectBox").val("전체"); // 허가관청 select box 초기화
	
	// 셀렉 박스 닫기
	$("#jisaText").removeClass("active"); // 셀렉 박스를 열고 닫는 클래스 제거
	$("#jisaUl").removeClass("active"); // 드롭다운 목록 닫기
});

// 지사 선택시 허가관청 목록 업데이트
$(document).on("change", "#jisaSelectBox", function () {
    const selectedJisa = $("#jisaSelectBox").val();
    console.log("지사 선택에 따라 허가관청 목록 업데이트");
    if (!selectedJisa) return;

    const allData = { jisa: selectedJisa };

    $.ajax({
        url: "/land/gover/getPmtOffice", // 허가관청 목록을 가져오는 API
        data: JSON.stringify(allData),
        async: true,
        type: "POST",
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        success: function (rt) {
            const data = rt.resultData;

            // 허가관청 리스트 초기화 및 업데이트
            $("#pmtOfficeUl li").remove(); // 기존 허가관청 목록 제거
            $("#epmtOfficeSelectBox option").remove(); // 허가관청 selectbox 옵션 초기화
            for (let i = 0; i < data.length; i++) {
                $("#pmtOfficeUl").append("<li><p>" + data[i].so_pmt_office + "</p></li>");
                $("#epmtOfficeSelectBox").append("<option>" + data[i].so_pmt_office + "</option>");
            }
        },
        error: function (jqXHR, textStatus, errorThrown) {
            console.error("Error: ", textStatus, errorThrown);
        }
    });
});

// 허가관청 선택 시 관리기관 목록 업데이트
$(document).on("click", "#pmtOfficeUl li", function () {
    const selectedPmtOffice = $(this).text().trim();
    $("#pmtOfficeText").text(selectedPmtOffice); // 화면에 선택된 허가관청 표시
    
    // 선택한 허가관청을 hidden input 및 selectbox에 반영
    $("input[name='pmt_office']").val(selectedPmtOffice); // pmt_office input에 값 설정
    $("#epmt_office").val(selectedPmtOffice); // epmt_office selectbox에 값 설정

    // 셀렉 박스 닫기
    $("#pmtOfficeText").removeClass("active"); // 셀렉 박스를 열고 닫는 클래스 제거
    $("#pmtOfficeUl").removeClass("active"); // 드롭다운 목록 닫기
});

$('#searchBtn').click(function() {
	loadData();
});

function loadData() {
	// 폼 데이터 직렬화
    var formSerializeArray = $('#searchForm').serializeArray();
    len = formSerializeArray.length;
    var dataObj = {};
	var paramStr = '';
    for (i = 0; i < len; i++) {
		var name = formSerializeArray[i].name;
		var value = formSerializeArray[i].value == '전체' ? '' : formSerializeArray[i].value;
        dataObj[name] = value;
		paramStr += '&' + name + '=' + value;
    }
	console.log(dataObj);
	var object = {};
	
	$.ajax({
		url: "/land/gover/orgAdminDataTableList?" + paramStr,
		async: true,
		type: "POST",
		dataType: "json",
		contentType: 'application/json; charset=utf-8',
		success: function (response) {
			console.log(response.data);
			var resultList = response.data;
			var tbodyStr = '';

			var depth1IdxArr = [];
			var depth2IdxArr = [];
			var depth1Comp = '';
			var depth2Comp = '';
			for (var i = 0; i < resultList.length; i++) {
				var row = resultList[i];
				
				if (row.jisa != depth1Comp) {
					depth1IdxArr.push(i);
					depth1Comp = row.jisa;
				}
				if (row.pmt_office != depth2Comp) {
					depth2IdxArr.push(i);
					depth2Comp = row.pmt_office;
				}
			}
			depth1IdxArr.push(resultList.length);
			depth2IdxArr.push(resultList.length);

			for (var i = 0; i < resultList.length; i++) {
				var row = resultList[i];
				var trStr = `
					<tr>
						<td class="smallWidth">
							<input type="hidden" id="idx" placeholder="1" value="`+row.idx+`"
								class="notWriteInput" readonly />
							<input type="text" placeholder="1" value="`+row.no+`" class="notWriteInput"
								readonly />
						</td>`;
				if (i == depth1IdxArr[0]) {
					depth1IdxArr.shift();
					trStr += `<td rowspan="`+(depth1IdxArr[0] - i)+`">
						<input type="text" placeholder="경인지사" value="`+row.jisa+`" class="notWriteInput"
							readonly />
						</td>`;
				}
				if (i == depth2IdxArr[0]) {
					depth2IdxArr.shift();
					trStr += `<td rowspan="`+(depth2IdxArr[0] - i)+`">
								<input type="text" placeholder="당진시" value="`+row.pmt_office+`"
									class="notWriteInput" readonly />
							</td>`;
				}
				trStr += `<td>
							<input type="text" placeholder="하천계획과" value="`+row.adm_office+`"
								class="notWriteInput" readonly onclick="showModPopup()" />
						</td>
						<td>`;
				if (row.approve=='N') {
					trStr += `
									<div class="btnWrap">
										<div class="btnBox"">
											<button class="pendingApprovalBtn">승인대기</button>
										</div>
									</div>
					`;
				} else {
					trStr += `
									<div class="btnWrap">
										<div class="btnBox">
											<button class="deleteBtn">삭제</button>
										</div>
									</div>
					`;
				}
				trStr += `		</td>
					</tr>				
				`;
				tbodyStr += trStr;
			}
			$('#resultTbody').html(tbodyStr);
		},
		error: function () {
		}
	});
}

/**********************/
function systemCodeEdit(obj) {
	//console.log($(obj).attr('data-row'));
	
	let originCodeJson = JSON.parse(convertToJSON($(obj).attr('data-row')));
	selectIndex = $(obj).attr('data-idx');
	//console.log(originCodeJson);
	//console.log(param);
	
	$("#systemcoderegisterPopup").show();
	
	//팝업에 세팅
	$("#popupCodeGroupText").text(originCodeJson.sc_group_code);
	$("#popup_codeVal").val(originCodeJson.sc_code);
	$("#popup_codeNameVal").val(originCodeJson.sc_code_name);
	$("#popup_sortOrderVal").val(originCodeJson.sc_sort_order);
	$("#popup_useYnVal").val(originCodeJson.sc_use_yn);
	$("#popup_useYnText").text(originCodeJson.sc_use_yn)
}

function systemCodeEdit2(obj) {
	$("#systemcoderegisterPopup").show();
	let pickIdx = $(obj).attr('data-index');
	
	console.log(loadSysCodeList[pickIdx]);
	
	let targetCodeInfo = loadSysCodeList[pickIdx];
	
	$("#popupCodeGroupText").text(targetCodeInfo.sc_group_code);
	$("#popup_codeVal").val(targetCodeInfo.sc_code);
	$("#popup_codeNameVal").val(targetCodeInfo.sc_code_name);
	$("#popup_sortOrderVal").val(targetCodeInfo.sc_sort_order);
	$("#popup_useYnVal").val(targetCodeInfo.sc_use_yn);
	$("#popup_useYnText").text(targetCodeInfo.sc_use_yn);
}

//시스템 코드 수정, 변경
function popupInfoSave() {
	let targetOriginInfo;
	
	if($("#editBtn_" + selectIndex).is('[data-row]')) {
		targetOriginInfo = JSON.parse(convertToJSON($("#editBtn_" + selectIndex).attr('data-row')));
	} else {
		targetOriginInfo = loadSysCodeList[selectIndex]
	}
	
	console.log(targetOriginInfo);
	
	let param = {
		"NEW_GROUP_CODE" : $("#popupCodeGroupText").text(),
		"NEW_CODE" : $("#popup_codeVal").val(), 
		"NEW_CODE_NAME" : $("#popup_codeNameVal").val(),
		"NEW_SORT_ORDER" : $("#popup_sortOrderVal").val(),
		"USE_YN" : $("#popup_useYnText").text(),
		"ORIGIN_NEW_GROUP_CODE" : targetOriginInfo.sc_group_code,
		"ORIGIN_CODE" : targetOriginInfo.sc_code,
		"ORIGIN_CODE_NAME" : targetOriginInfo.sc_code_name,
		"ORIGIN_SORT_ORDER" : targetOriginInfo.sc_sort_order,
	}
	
	console.log(param);
	
	$.ajax({
		url : "/land/gover/updateSysCode",
		data: param,
		type: "POST",
		dataType: "JSON",
		contentType: "application/json; charset=UTF-8",
		success: function(response) {
			console.log(response);
			if(response.message == 'Y') {
				alert('시스템 코드를 수정했습니다.');
				window.location.reload();
			} else {
				alert('시스템 코드를 수정에 실패했습니다.');
			}
		},
		error : function(error) {
			console.log(error);
			alert('코드 수정에 실패했습니다.');
		}
	});
}

//시스템 코드 등록
function newSystemCodePopup() {
	console.log('신규등록');
	
	//기존에 세팅된 값이 있을수 있으므로 초기화
	$("#popupCodeGroupText").text('전체');
	$("#popup_codeVal").val('');
	$("#popup_codeNameVal").val('');
	$("#popup_sortOrderVal").val('');
	$("#popup_useYnVal").val('');
	$("#popup_useYnText").text('Y');
	
	$("#systemcoderegisterPopup").show();
	
	$("#popup_saveBtn").attr('onclick', 'newSystemCodeInsert()');
}

function newSystemCodeInsert() {
	let param = {
		"NEW_GROUP_CODE" : $("#popupCodeGroupText").text(),
		"NEW_CODE" : $("#popup_codeVal").val(), 
		"NEW_CODE_NAME" : $("#popup_codeNameVal").val(),
		"NEW_SORT_ORDER" : $("#popup_sortOrderVal").val(),
		"USE_YN" : $("#popup_useYnText").text(),
	}
	
	console.log('신규등록 정보');
	console.log(param);
	
	$.ajax({
		url : "/land/gover/insertSysCode",
		data: param,
		type: "POST",
		dataType: "JSON",
		contentType: "application/json; charset=UTF-8",
		success: function(response) {
			console.log(response);
			if(response.message == 'Y') {
				alert('시스템 코드가 신규등록 되었습니다.');
				window.location.reload();
			} else {
				alert('시스템 코드를 등록에 실패했습니다.');
			}
		},
		error : function(error) {
			console.log(error);
			alert('코드 수정에 실패했습니다.');
		}
	});
	
}


function convertToJSON(input) {
	input = input.substring(1, input.length, - 1);
	
	const keyValuePairs = input.split(', ');
	
	const result = {};
	
	keyValuePairs.forEach(pair => {
		const [key, value] = pair.split('=');
		result[key] = value.endsWith('}') ? value.slice(0, -1) : value;
	});
	
	return JSON.stringify(result, null , 2);
}

//시스템 코드 불러오기 
function systemCodeListLoad(selectCodeGroup) {
	// /land/gover/orgSysCode
	
	let param = {
		"CODE_GROUP" : selectCodeGroup
	}
	
	if(param.CODE_GROUP == '전체') {
		param.CODE_GROUP = '-';
	}
	
	$.ajax({
		url : "/land/gover/selectSysCodeList",
		data : param,
		type : "POST",
		dataType : "JSON",
		success : function(res) {
			console.log(res);
			if(res.message == 'Y') {
				codeListLoadTbody(res.result);
			} else {
				alert('코드 조회중 오류가 발생했습니다.');
			}
		},
		error : function(error) {
			console.log(error);
			alert('코드 조회에 실패했습니다.');
		}
	});
	
}

function codeListLoadTbody(codeList) {
	let innerHtml = '';
	
	loadSysCodeList = codeList;
	
	for(let i = 0 ; i < codeList.length ; i++) {
		
		let codeInfo = codeList[i];
		
		innerHtml += '<tr>';
		
		innerHtml += '<td><input type="text" value="'+codeInfo.sc_group_code+'" id="codeGroupVal_'+i+'"></td>';
		innerHtml += '<td><input type="text" value="'+codeInfo.sc_code+'" id="codeVal_'+i+'"></td>';
		innerHtml += '<td><input type="text" value="'+codeInfo.sc_code_name+'" id="codeNameVal_'+i+'"></td>';
		innerHtml += '<td><input type="text" value="'+codeInfo.sc_sort_order+'" id="sortOrderVal_'+i+'"></td>';
		innerHtml += '<td><input type="text" value="'+codeInfo.sc_use_yn+'" id="useYnVal_'+i+'"></td>';
		
		innerHtml += '<td><div class="btnWrap"><div class="btnBox">';
		innerHtml += '<button class="pendingApprovalBtn2" data-index="'+i+'" id="editBtn_'+i+'" onclick="systemCodeEdit2(this)">수정</button>';
		innerHtml += '</div></div></td>';
		
		innerHtml += '</tr>';
	}
	
	$("#orgsyscodeTbody").empty();
	$("#orgsyscodeTbody").html(innerHtml);
	console.log(loadSysCodeList);
}

//상단 코드그룹 셀렉트박스 클릭시 작동 - 단순 화면 작동 function
function showgrouplist() {
	let boxViewYn = $("#codegroupTextUl").parent().hasClass('active');
	
	if(boxViewYn) {
		$("#codegroupTextUl").parent().removeClass('active');
	} else {
		$("#codegroupTextUl").parent().addClass('active');
	}
}

function popupEditClose() {
	$("#systemcoderegisterPopup").hide();
	$("#popup_saveBtn").attr('onclick', 'popupInfoSave()');
}

function popupGroupList() {
	let boxViewYn = $("#popupCodeGroupUl").hasClass('active');
	
	if(boxViewYn) {
		$("#popupCodeGroupUl").removeClass('active');
	} else {
		$("#popupCodeGroupUl").addClass('active');
	}
}

function popupUseYnView() {
	let boxViewYn = $("#popup_useYnUl").hasClass('active');
	
	if(boxViewYn) {
		$("#popup_useYnUl").removeClass('active');
	} else {
		$("#popup_useYnUl").addClass('active');
	}
}

/**********************/