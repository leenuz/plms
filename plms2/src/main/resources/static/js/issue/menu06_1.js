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
IssuePopupOpenEvet();

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


/* 현황통계 팝업 오픈 */
const issueTotalPopOpenEvet = () => {
    const issueManageTotalBtn = document.querySelector("#dopcoIssueManage .issueManageTotalBtn");
    const issueManageIssueTotalPopWrap = document.querySelector(".issueManageIssueTotalWrapper");
    let issueTotalPopFilePath = '/components/popuphtml/issueTotalPop.html'; // 삽입할 html 파일 경로

    if (issueManageTotalBtn) {
        // let xhr = new XMLHttpRequest();
        // xhr.open('GET', issueTotalPopFilePath, true);
        // xhr.onreadystatechange = function () {
        //     if (xhr.readyState == 4 && xhr.status == 200) {
        //         issueManageIssueTotalPopWrap.innerHTML = xhr.responseText;
        //         runScriptsInElement(issueManageIssueTotalPopWrap); // 삽입된 html내 스크립트 실행 함수 호출
        //     }
        // };
        // xhr.send();
        // console.log('issueManageIssueTotalPopWrap 작동');

        issueManageTotalBtn.addEventListener("click", () => {

            const popupOpen = document.getElementById("issueTotalPopContent");
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

issueTotalPopOpenEvet()


//신규민원 -> 검색
$(document).on("click", ".landinfo .landStatusPopOpenBtn", function () {
    const idx = $(this).closest("li").siblings(".landinfo_content_2").text()
    var addr = $(this).parent().find("input").val().trim();
    console.log(addr);
    var datas = { "address": addr }
    if (addr == null || addr == "" || addr == undefined) {
        alert("주소를 입력해주세요.");
        return;
    }

    const popupLayout = $('#landStatusPopup')
    $.ajax({
        url: "/issue/getBunhalJIjukSelect",
        type: "POST",
        data: datas,
        dataType: "json",
        success: function (response) {
            const popContentBox = popupLayout.find('.popContentBox');
            if (response.length > 0) {
                popContentBox.empty(); //자식 요소 모두 제거
                console.log(response);
                $.each(response, function (index, item) {
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
                            <button class="resultSelectBtn" onclick="resultSelectBtnClick(this, ${idx})">선택</button>
                        </li>
                        <li class="popContent05">
                            <p></p>
                        </li>
                    </ul>`;
                    popContentBox.append(newItem);
                });
                popupLayout.addClass('active');
            } else {
                console.log("response.length = 0");
            }
        },
        error: function (xhr, status, error) {
            console.log("Error: " + error);
        }
    });
});

//신규민원 -> 검색 -> 선택 버튼
const resultSelectBtnClick = function (view, index) {
    var juso = $(view).closest("li").siblings(".popContent02").find("p").text();
    const idx = parseInt(index) - 1;
    $(".landinfo_content_4 input[type='text']")[idx].value = juso
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
        $(".daepyo_pilji_list_1 input[type='text']").val(juso)
        $(".daepyo_pilji_list_2 input[type='text']").val(content_5)
        $(".daepyo_pilji_list_3 input[type='text']").val(content_6)
    }
});


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
                d.status = params.status;
                d.code1 = params.code1;
                d.code2 = params.code2;
                d.code3 = params.code3;
                d.mw_title = params.mw_title;


                d.idx = params.idx;

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
                    var addrs = params.sido_nm;
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
                    if (data === "1") {
                        return "임시저장";
                    } else if (data == "2") {
                        return "민원발생";
                    }
                    else if (data == "3") {
                        return "대응방안수립";
                    }
                    else if (data == "4") {
                        return "협의중";
                    }
                    else if (data == "5") {
                        return "완료";
                    } else {
                        return "";
                    }
                }
            },
            { data: "mm_idx", "defaultContent": "" },
            { data: "mm_occur_date", "defaultContent": "" },
            { data: "mm_comple_date", "defaultContent": "" }//5
        ],

        columnDefs: [
            { "className": "dt-head-center", "targets": "_all" },
            { className: 'dt-center', "targets": "_all" },
            { targets: [0], width: "100px" },
            { targets: [1], width: "150px" },
            { targets: [2], width: "50px" },
            {
                targets: [3]
                , width: "50px"
                , render: function (data, type, row, meta) {
                    return `<button class="btnDesign issuePopBtn" onclick="issuePop()" >이슈보기</button>`;
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
            var url = "/issue/complaintManage?idx=" + data.mm_idx;
            window.location = url;
        }
    });
}

function issuePop() {
    const popupOpen = document.getElementById("issuePopup");
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