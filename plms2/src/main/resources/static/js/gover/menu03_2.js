var table;
     
$(document).ready(function() {
  console.log("gover/menu03_2.js start");
  loadDataTable("");
});

//조회하기 클릭시 상단 정보 출력
$(document).on("click","#searchBtn",function(){
	  console.log($("#menuHiddenSelectBox01_1").val());
	  console.log($("#searchForm").serialize());
	 
	  var formSerializeArray = $('#searchForm').serializeArray();
	  console.log(formSerializeArray)
	  
	  // 체크박스 값들을 조합하여 문자열로 만들기
	  var object = {};
	  for (var i = 0; i < formSerializeArray.length; i++){
		if (formSerializeArray[i]['value'] === '전체') {
		    continue; // "전체"가 선택된 경우, 해당 파라미터를 넘기지 않음
		}
	    object[formSerializeArray[i]['name']] = formSerializeArray[i]['value'];
	  }
	   
	  var json = JSON.stringify(formSerializeArray);
	
	  console.log("----------jsonobj------------");
	  console.log(json);
	  console.log("object askMenu01:"+object.privateUseRadio02); 
	  
	  loadDataTable(object);
	  console.log("-----------------------");
	   
})

// 주소 - 선택형 동작하도록 (id 값: sido_nm, sgg, emd, ri)
$(document).on("click", "#sido_ul li", function () {
    const selectedSido = $(this).text().trim();
    $("#sidoText").text(selectedSido);
    $("#sido_nm").val(selectedSido).change(); // change 이벤트 트리거
});

$(document).on("change", "#sido_nm", function () {
    console.log("----------start sido change -------------");
    const selectedSido = $("#sido_nm").val();
    if (!selectedSido) return;

    const allData = { key: selectedSido };
    console.log(allData);

    $.ajax({
        url: "/api/getSigunMaster",
        data: JSON.stringify(allData),
        async: true,
        type: "POST",
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        success: function (rt) {
            console.log(rt);
            const data = rt.resultData;

            $("#sggUl li").remove();
            $("#sgg option").remove();

            $("#sggUl").append("<li><p>전체</p></li>");
            $("#sgg").append("<option value=''>전체</option>");
            for (let i = 0; i < data.length; i++) {
                console.log(data[i].sm_gugun);
                $("#sggUl").append("<li><p>" + data[i].sm_gugun + "</p></li>");
                $("#sgg").append("<option>" + data[i].sm_gugun + "</option>");
            }
        },
        error: function (jqXHR, textStatus, errorThrown) {
            console.error("Error: ", textStatus, errorThrown);
        }
    });
});

$(document).on("click", "#sggUl li", function () {
    const selectedSgg = $(this).text().trim();
    $("#sggText").text(selectedSgg);
    $("#sgg").val(selectedSgg).change(); // change 이벤트 트리거
});

$(document).on("change", "#sgg", function () {
    console.log("----------start sgg change -------------");

    const allData = {
        gugunKey: $("#sgg option:selected").val() || "",
        sidoKey: $("#sidoText").text().trim()
    };
    console.log(allData);

    $.ajax({
        url: "/api/getDongMaster",
        data: JSON.stringify(allData),
        async: true,
        type: "POST",
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        success: function (rt) {
            console.log(rt);
            const data = rt.resultData;

            $("#emdUl li").remove();
            $("#emd option").remove();
            $("#emdUl").append("<li><p>전체</p></li>");
            $("#emd").append("<option value=''>전체</option>");
            for (let i = 0; i < data.length; i++) {
                console.log(data[i].bm_dong);
                $("#emdUl").append("<li><p>" + data[i].bm_dong + "</p></li>");
                $("#emd").append("<option>" + data[i].bm_dong + "</option>");
            }
        },
        error: function (jqXHR, textStatus, errorThrown) {
            console.error("Error: ", textStatus, errorThrown);
        }
    });
});

$(document).on("click", "#emdUl li", function () {
    const selectedEmd = $(this).text().trim();
    $("#emdText").text(selectedEmd);
    $("#emd").val(selectedEmd).change(); // change 이벤트 트리거
});

$(document).on("change", "#emd", function () {
    console.log("----------start emd change -------------");

    const allData = {
        dongKey: $("#emdText").text().trim(),
        gugunKey: $("#sggText").text().trim(),
        sidoKey: $("#sidoText").text().trim()
    };
    console.log(allData);

    $.ajax({
        url: "/api/getRiMaster",
        data: JSON.stringify(allData),
        async: true,
        type: "POST",
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        success: function (rt) {
            console.log(rt);
            const data = rt.resultData;

            $("#riUl li").remove();
            $("#ri option").remove();
            $("#riUl").append("<li><p>전체</p></li>");
            $("#ri").append("<option value=''>전체</option>");
            for (let i = 0; i < data.length; i++) {
                console.log(data[i].rm_ri);
                $("#riUl").append("<li><p>" + data[i].rm_ri + "</p></li>");
                $("#ri").append("<option>" + data[i].rm_ri + "</option>");
            }
        },
        error: function (jqXHR, textStatus, errorThrown) {
            console.error("Error: ", textStatus, errorThrown);
        }
    });
});

function datatablebasic(){
	new DataTable('#basicTable', {
		 fixedColumns:{
			start:3
		 },
    paging: true,
    scrollCollapse: true,
    scrollX: true,
    scrollY: 300,
    dom:'rtip',
    columnDefs:[
					{"className": "dt-head-center", "targets": "_all"},
					{className: 'dt-center',"targets": "_all"},
					{targets:[0],width:"100px"},
					{targets:[1],width:"300px"},
				]
	});
}

function loadDataTable(params) {
    console.log("-----start loadDataTable----------");
    console.log("Params:", params); // params 객체 출력

    table = $('#userTable').DataTable({
        fixedColumns: { start: 3 },
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
        rowReorder: { dataSrc: 'b_seq' },
        ajax: {
            url: "/gover/menu03_2DataTableList",
            type: "POST",
            datatype: "json",
            data: function(d) {
                d.jisa = ljsIsNull(params.jisa) ? '' : params.jisa;
                d.gover_no = params.gover_no;
                d.use_purpos = params.use_purpos;
                d.pmt_office = params.pmt_office;
                d.adm_office = ljsIsNull(params.adm_office) ? '' : params.adm_office;
				d.pay_date_start = params.pay_date_start;
				d.pay_date_end = params.pay_date_end;
                d.idx = params.idx;

                // 주소
                var ask = (params.privateUseRadio02 == undefined || params.privateUseRadio02 == null) ? '0' : params.privateUseRadio02;
                console.log("privateUseRadio02:" + ask);

                // 입력형 주소 입력 시
                if (ask == "0") {
                    d.saddr = (params.addressFull == undefined || params.addressFull == null) ? '' : params.addressFull;
                }
                // 선택형 주소 입력 시
                else {
                    var addrs = params.sido_nm || '';
                    if (!ljsIsNull(params.sgg)) addrs += " " + params.sgg;
                    if (!ljsIsNull(params.emd)) addrs += " " + params.emd;
                    if (!ljsIsNull(params.ri)) addrs += " " + params.ri;
                    if (!ljsIsNull(params.jibun)) addrs += " " + params.jibun;
                    d.saddr = (addrs == undefined || addrs == null || addrs == "undefined") ? '' : addrs;
                }
                console.log("saddr:" + d.saddr);
            },
            dataSrc: function(json) {
                console.log("-------------json---------------");
                console.log(json);
                $("#dataTableTotalCount").html(json.recordsTotal);
                return json.data;
            }
        },
        columns: [
            { data: "no", "orderable": false }, // 0
            { data: "jisa", "defaultContent": "" },
            { data: "address", "defaultContent": "" },
            { data: "gover_no", "defaultContent": "" },
			{ data: "pnu_count", "defaultContent": "" },
			{ data: "jimok_text", "defaultContent": "" }, //5
			{ data: "use_purpos", "defaultContent": "" },
			{ data: "period", "defaultContent": "" },
			{ data: "gover_length", "defaultContent": "" },
			{ data: "gover_area", "defaultContent": "" },
            { data: "pmt_office", "defaultContent": "" }, //10
            { data: "adm_office", "defaultContent": "" },
			{ data: "pay_date", "defaultContent": "" },
			{ data: "pay_money", "defaultContent": "" },
            {
                data: "idx", "defaultContent": "",
                render: function(data, type, row, meta) {
                    return `<button class="viewDetailButton" id='moveMap' x=${row.x} y=${row.y}>위치보기</button> `;
                }
            },
			{ data: "echo_no", "defaultContent": "",
				render: function(data, type, row, meta) {
					return `<button class="viewDetailButton">상세보기</button> `;
				}
			}	 // 15
		],
		columnDefs: [
			{ "className": "dt-head-center", "targets": "_all" },
			{ className: 'dt-center', "targets": "_all" },
			{ targets: [0], width: "50px" },
			{ targets: [1], width: "150px" },
	        { targets: [2], width: "400px" },
	        { targets: [3], width: "150px" },
	        { targets: [4], width: "100px" },
	        { targets: [5], width: "200px" },
	        { targets: [6], width: "150px" },
	        { targets: [7], width: "150px" },
	        { targets: [8], width: "200px" },
	        { targets: [9], width: "100px" },
	        { targets: [10], width: "200px" },
	        { targets: [11], width: "100px" },
	        { targets: [12], width: "100px" },
	        { targets: [13], width: "100px" },
	        { targets: [14], width: "100px" },
			{ targets: [15], width: "100px" }
		]
	});

	table.on('click', 'tr', function(event) {
		var target = $(event.target);
	    var isButtonCell = target.closest('td').index() === 14;
	
	    if (isButtonCell) {
	        return;
	    } else {
			var data = table.row(this).data();
	        console.log(data);
	        console.log(data.idx);
	
	        var url = "/gover/feeDetail?idx=" + data.idx;
			window.location = url;
		}
	});
}


$(document).on("click","#moveMap",function(){
	//openMapWindow();
//	mapWindow = window.open('', 'mapWindow', 'width=2000,height=1000');
	const x = $(this).attr('x')
	const y = $(this).attr('y')
	moveToCityHall(x,y);
})
function moveToCityHall(x,y) {
	console.log("--------moveToCityHall-------------");
	//console.log(sessionStorage.getItem("2pmsMap"));
	//var mapW=window.mapWindow;
	//console.log(window.name);
	//var mapW=window.name;
// if (mapWindow) {
	var cityHallCoords = {};

	if(x != 'null' && y != 'null'){
//            cityHallCoords = { lon: 126.9779692, lat: 37.566535, zoom: 16 }; //테스트를 위해 임시로 넣어둠
		cityHallCoords = { lon: y, lat: x, zoom: 16 };
		openMapWindow(cityHallCoords);
	}
	else{
		alert("해당 위치에 대한 좌표가 없습니다.");
	}
	//mapWindow.postMessage(cityHallCoords, 'http://10.168.0.247:8080/'); // 특정 사이트에 전송

// } else {
//     alert("지도가 열려 있지 않습니다.");
// /* 	mapWindow = window.open('http://10.168.0.247:8080/', 'mapWindow', 'width=2000,height=1000');
// 	var cityHallCoords = { lon: 126.9779692, lat: 37.566535, zoom: 16 };
// 	//mapWindow.postMessage(cityHallCoords, 'http://10.168.0.247:8080/'); // 특정 사이트에 전송
// 	mapWindow.postMessage(cityHallCoords, '*'); // 모든 출처에 메시지 전송 */
// }
}

// 지사 선택 시 허가관청 목록 업데이트
$(document).on("click", "#jisaUl li", function () {
    const selectedJisa = $(this).text().trim();
    $("#jisaText").text(selectedJisa);
    $("#privateUseSelectBox02_1").val(selectedJisa).change(); // change 이벤트 트리거
});

$(document).on("change", "#privateUseSelectBox02_1", function () {
    const selectedJisa = $("#privateUseSelectBox02_1").val();
    console.log("지사 선택에 따라 허가관청 목록 업데이트");
    if (!selectedJisa) return;

    const allData = { jisa: selectedJisa };

    $.ajax({
        url: "/gover/getPmtOffice", // 허가관청 목록을 가져오는 API
        data: JSON.stringify(allData),
        async: true,
        type: "POST",
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        success: function (rt) {
            const data = rt.resultData;

            // 허가관청 리스트 초기화 및 업데이트
            $("#pmtOfficeUl li").remove();
            $("#privateUseSelectBox02_3 option").remove();
            $("#pmtOfficeUl").append("<li><p>전체</p></li>");
            $("#privateUseSelectBox02_3").append("<option value=''>전체</option>");
            for (let i = 0; i < data.length; i++) {
                $("#pmtOfficeUl").append("<li><p>" + data[i].so_pmt_office + "</p></li>");
                $("#privateUseSelectBox02_3").append("<option>" + data[i].so_pmt_office + "</option>");
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
    $("#pmtOfficeText").text(selectedPmtOffice);
    $("#privateUseSelectBox02_3").val(selectedPmtOffice).change(); // change 이벤트 트리거
});

$(document).on("change", "#privateUseSelectBox02_3", function () {
    const selectedPmtOffice = $("#privateUseSelectBox02_3").val();
    const selectedJisa = $("#privateUseSelectBox02_1").val(); // 지사 선택된 값

    console.log("허가관청 선택에 따라 관리기관 목록 업데이트");
    if (!selectedPmtOffice || !selectedJisa) return;

    const allData = { 
        pmt_office: selectedPmtOffice,
        jisa: selectedJisa 
    };

    $.ajax({
        url: "/gover/getAdmOffice", // 관리기관 목록을 가져오는 API
        data: JSON.stringify(allData),
        async: true,
        type: "POST",
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        success: function (rt) {
            const data = rt.resultData;

            // 관리기관 리스트 초기화 및 업데이트
            $("#admOfficeUl li").remove();
            $("#privateUseSelectBox02_4 option").remove();
            $("#admOfficeUl").append("<li><p>전체</p></li>");
            $("#privateUseSelectBox02_4").append("<option value=''>전체</option>");
            for (let i = 0; i < data.length; i++) {
                $("#admOfficeUl").append("<li><p>" + data[i].so_adm_office + "</p></li>");
                $("#privateUseSelectBox02_4").append("<option>" + data[i].so_adm_office + "</option>");
            }
        },
        error: function (jqXHR, textStatus, errorThrown) {
            console.error("Error: ", textStatus, errorThrown);
        }
    });
});

// 관리기관 선택 (선택 후 추가적인 동작이 필요하다면 이곳에 추가)
$(document).on("click", "#admOfficeUl li", function () {
    const selectedAdmOffice = $(this).text().trim();
    $("#admOfficeText").text(selectedAdmOffice);
    $("#privateUseSelectBox02_4").val(selectedAdmOffice).change(); // change 이벤트 트리거
});
