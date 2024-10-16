
var table;
     
$(document).ready(function() {
	console.log("gover/menu03_1.js start");
	//지사권한
	commonJisaInfoCheck();
	loadDataTable("");
	
	// 초기 화면에서 허가관청과 관리기관 비활성화
	$("#pmtOfficeText").attr("disabled", true);
	$("#admOfficeText").attr("disabled", true);
	$("#privateUseSelectBox01_3").attr("disabled", true);
	$("#privateUseSelectBox01_4").attr("disabled", true);
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
		if (formSerializeArray[i]['value'] === '전체' || formSerializeArray[i]['value'] === '선택') {
		    continue; // "전체"가 선택된 경우, 해당 파라미터를 넘기지 않음
		}
		object[formSerializeArray[i]['name']] = formSerializeArray[i]['value'];
	}
	   
	var json = JSON.stringify(formSerializeArray);
	
	console.log("----------jsonobj------------");
	console.log(json);
	console.log("object privateUseRadio01:"+object.privateUseRadio01);
	 
	loadDataTable(object);
	console.log("-----------------------");
})

// 지사 선택 시 허가관청 활성화
$(document).on("click", "#jisaUl li", function () {
    const selectedJisa = $(this).text().trim();
    $("#jisaText").text(selectedJisa);
    $("#privateUseSelectBox01_1").val(selectedJisa).change();
    if (selectedJisa !== "전체") {
        $("#pmtOfficeText").attr("disabled", false);
        $("#privateUseSelectBox01_3").attr("disabled", false);
    }
});

// 허가관청 선택 시 관리기관 활성화
$(document).on("click", "#pmtOfficeUl li", function () {
    const selectedPmtOffice = $(this).text().trim();
    $("#pmtOfficeText").text(selectedPmtOffice);
    $("#privateUseSelectBox01_3").val(selectedPmtOffice).change();
    if (selectedPmtOffice !== "전체") {
        $("#admOfficeText").attr("disabled", false);
        $("#privateUseSelectBox01_4").attr("disabled", false);
    }
});

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
        url: "/land/api/getSigunMaster",
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
        url: "/land/api/getDongMaster",
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
        url: "/land/api/getRiMaster",
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

// Korean    var lang_kor = {        "decimal" : "",        "emptyTable" : "데이터가 없습니다.",        "info" : "_START_ - _END_ (총 _TOTAL_ 명)",        "infoEmpty" : "0명",        "infoFiltered" : "(전체 _MAX_ 명 중 검색결과)",        "infoPostFix" : "",        "thousands" : ",",        "lengthMenu" : "_MENU_ 개씩 보기",        "loadingRecords" : "로딩중...",        "processing" : "처리중...",        "search" : "검색 : ",        "zeroRecords" : "검색된 데이터가 없습니다.",        "paginate" : {            "first" : "첫 페이지",            "last" : "마지막 페이지",            "next" : "다음",            "previous" : "이전"        },        "aria" : {            "sortAscending" : " :  오름차순 정렬",            "sortDescending" : " :  내림차순 정렬"        }    };

function loadDataTable(params) {
	console.log("-----start loadDataTable----------");
	console.log("Params:", params); // params 객체 출력

	//var json=JSON.stringify(params);

	table = $('#userTable').DataTable({
		fixedColumns: {
			start: 3,
		},
		scrollCollapse: true,
		scrollX: true,
		scrollY: 600,
		paging: true,
		"oLanguage": { "sLengthMenu": "_MENU_" },
		//dom: '<"dt-center-in-div"l>B<f>r>t<>p',
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
		order: [[3, 'desc']],
		rowReorder: {
			dataSrc: 'b_seq'
		},
		//	sAjaxSources:"/land/songyu/menu01DataTableList",
		//	sServerMethod:"POST",
		ajax: {
			url: "/land/gover/menu03_1DataTableList",
			type: "POST",
			datatype: "json",
			data: function(d) {
				//d=params;
				d.jisa = ljsIsNull(params.jisa) ? '' : params.jisa;
				d.gover_no = params.gover_no;
				d.use_purpos = params.use_purpos;
				d.pmt_office = params.pmt_office;
				d.adm_office = ljsIsNull(params.adm_office) ? '' : params.adm_office;
				d.save_status = params.save_status;
				d.idx = params.idx;

				//주소
				var ask = (params.privateUseRadio01 == undefined || params.privateUseRadio01 == null) ? '0' : params.privateUseRadio01;
				console.log("privateUseRadio01:" + ask);

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
					
					/*
					d.sido_nm = params.sido;
					d.sgg_nm = params.sgg;
					d.emd_nm = params.emd;
					d.ri_nm = params.ri;
					d.jibun = params.jibun;
					*/
				}
				console.log("saddr:" + d.saddr);
				console.log(params);
				console.log("-----------d-----------");
				console.log(d);
			},

			dataSrc: function(json) {
				console.log("-------------json---------------");
				console.log(json);
				$("#dataTableTotalCount").html(json.recordsTotal.toLocaleString());
				//$("div.dt-title").html('<div class="dataTitles"><h5>총 검색 건 수</h5></div>');
				return json.data;
			}
		},
		initComplete: function() {
			console.log(this.api().data().length);
		},
		/*"fnRowCallback": function( nRow, aData, iDisplayIndex, iDisplayIndexFull ) {
//	console.log(aData);
	$('td:eq(0)', nRow).html(iDisplayIndexFull +1);
	return nRow;
},*/
		columns: [
			{ data: "rno", "orderable": false },//0
			{ data: "jisa", "defaultContent": "" },
			{ data: "address", "defaultContent": "" },
			{ data: "gover_no", "defaultContent": "" },
			{ data: "pmt_office", "defaultContent": "" },
			{ data: "adm_office", "defaultContent": "" },//5
			{ data: "pnu_count", "defaultContent": "" },
			{ data: "jimok_text", "defaultContent": "" },
			{ data: "use_purpos", "defaultContent": "" },
			{ data: "period", "defaultContent": "" },
			{ data: "gover_length", "defaultContent": "" },//10
			{ data: "gover_area", "defaultContent": "" },
			{ data: "pay_date", "defaultContent": "" },
			{ data: "pay_money", "defaultContent": "" },
			{ data: "idx", "defaultContent": "" }
		],
		columnDefs: [
			{ "className": "dt-head-center", "targets": "_all" },
			{ className: 'dt-center', "targets": "_all" },
			{ targets: [0], width: "50px" },
			{ targets: [1], width: "150px" },
			{ targets: [2], width: "400px" }, //주소
			{ targets: [3], width: "150px" },
			{ targets: [4], width: "100px" },
			{ targets: [5], width: "200px" }, //관리기관
			{ targets: [6], width: "150px" },
			{ targets: [7], width: "150px" }, //지목
			{ targets: [8], width: "200px" }, //점용구분
			{ targets: [9], width: "100px" }, //점용기간
			{ targets: [10], width: "200px" }, //연장
			{ targets: [11], width: "100px" }, //면적
			{ targets: [12], width: "100px" }, //납부일
			{ targets: [13], width: "100px" }, //납부금액
			{
				targets: [14]
				, width: "100px"
				, render: function(data, type, row, meta) {
					//쿼리수정이 필요합니다.
					//console.log("x:", row.x, "y:", row.y);
					return `<button class="viewDetailButton" data-x="${row.x}" data-y="${row.y}">위치보기</button>`;
				}
			}, //지도보기
		]
	});

	table.on('click', 'tr', function() {

		var target = $(event.target);

		var isButtonCell = target.closest('td').index() === 14;

		if (isButtonCell) {
			event.stopPropagation(); // 버튼 클릭 시에는 동작하지 않도록 이벤트 전파 차단
			return;
		} else {
			// 다른 열을 클릭했을 때만 상세 페이지로 이동
			console.log("--------------tr click---------------------");

			var data = table.row(this).data();
			console.log(data);
			console.log(data.idx);

			var url = "/land/gover/masterEdit?idx=" + data.idx;
			window.location = url;
		}
	});

	// 위치보기 버튼 클릭 이벤트 처리
	$('#userTable').on('click', '.viewDetailButton', function(event) {
	    event.stopPropagation(); // 이벤트 전파 차단

	    // 버튼의 data 속성에서 x, y 좌표 가져오기
	    const x = $(this).data('x');
	    const y = $(this).data('y');
	    
	    console.log("x, y:", x, y);
	    
	    // 좌표가 존재하는지 확인하고, 없으면 undefined를 전달
	    if (typeof x !== 'undefined' && typeof y !== 'undefined' && x !== 'undefined' && y !== 'undefined') {
	        // 좌표가 있을 때는 좌표를 전달
	        onePositionView({ x, y });
	    } else {
	        // 좌표가 없을 때는 빈 객체를 전달하여 onePositionView 내부에서 처리
	        onePositionView(undefined);
	    }
	});
	
}


// 지사 선택 시 허가관청 목록 업데이트를 위한 change 이벤트 트리거
$(document).on("click", "#jisaUl li", function () {
    const selectedJisa = $(this).text().trim();
    $("#jisaText").text(selectedJisa);
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
            $("#pmtOfficeUl li").remove();
            $("#privateUseSelectBox01_3 option").remove();
            $("#pmtOfficeUl").append("<li><p>전체</p></li>");
            $("#privateUseSelectBox01_3").append("<option value=''>전체</option>");
            for (let i = 0; i < data.length; i++) {
                $("#pmtOfficeUl").append("<li><p>" + data[i].so_pmt_office + "</p></li>");
                $("#privateUseSelectBox01_3").append("<option>" + data[i].so_pmt_office + "</option>");
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
            $("#admOfficeUl li").remove();
            $("#privateUseSelectBox01_4 option").remove();
            $("#admOfficeUl").append("<li><p>전체</p></li>");
            $("#privateUseSelectBox01_4").append("<option value=''>전체</option>");
            for (let i = 0; i < data.length; i++) {
                $("#admOfficeUl").append("<li><p>" + data[i].so_adm_office + "</p></li>");
                $("#privateUseSelectBox01_4").append("<option>" + data[i].so_adm_office + "</option>");
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
    $("#privateUseSelectBox01_4").val(selectedAdmOffice).change(); // change 이벤트 트리거
});

