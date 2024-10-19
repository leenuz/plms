var table;
let lastSelectedjisa = null;
let lastPmtOffice = null;
     
$(document).ready(function() {
  console.log("gover/menu03_3.js start");
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
		//buttons: [{ extend: 'excel', text: '엑셀 다운로드' }],
		buttons: [],
		initComplete: function() {
			$('.dt-title').html('<button style="float:right" class="dt-button buttons-excel button-html5" id="excelDownloadBtn">엑셀다운로드</button>');
			console.log(this.api().data().length);
		},
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
		rowReorder: { dataSrc: 'b_seq' },
		ajax: {
			url: "/land/gover/menu03_3DataTableList",
			type: "POST",
			datatype: "json",
			data: function(d) {
				d.jisa = ljsIsNull(params.jisa) ? '' : params.jisa;
				d.gover_no = params.gover_no;
				d.use_purpos = params.use_purpos;
				d.pmt_office = params.pmt_office;
				d.adm_office = params.adm_office;
				console.log(params.adm_office);
				// d.adm_office = ljsIsNull(params.adm_office) ? '' : params.adm_office;
				// 해지 여부 조건 추가
				if (params.cancel_yn === "해지") {
					d.cancel_yn = "Y";
				} else if (params.cancel_yn === "미해지") {
					d.cancel_yn = "N";
				} else {
					d.cancel_yn = ""; // 해지 여부가 없을 때 기본값 처리
				}
				d.pay_date_start = params.pay_date_start;
				d.pay_date_end = params.pay_date_end;
				d.idx = params.idx;

				// 주소
				var ask = (params.privateUseRadio03 == undefined || params.privateUseRadio03 == null) ? '0' : params.privateUseRadio03;
				console.log("privateUseRadio03:" + ask);

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

					/* 2024.10.04 손지민 - 선택행 주소 검색 시 시도/시군구/읍면동/리/지번 분리 검색
					d.sido_nm = params.sido_nm;
					d.sgg_nm = params.sgg;
					d.emd_nm = params.emd;
					d.ri_nm = params.ri;
					d.jibun = params.jibun;
					*/
				}
				console.log("saddr:" + d.saddr);
				console.log(d);
			},
			dataSrc: function(json) {
				console.log("-------------json---------------");
				console.log(json);
				$("#dataTableTotalCount").html(json.recordsTotal.toLocaleString());
				return json.data;
			}
		},
		columns: [
			{ data: "no", "orderable": false },
			{ data: "jisa", "defaultContent": "" },
			{ data: "address", "defaultContent": "" },
			{ data: "gover_no", "defaultContent": "" },
			{ data: "pnu_count", "defaultContent": "" },
			{ data: "jimok_text", "defaultContent": "" },
			{ data: "use_purpos", "defaultContent": "" },
			{ data: "period", "defaultContent": "" },
			{ data: "gover_length", "defaultContent": "" },
			{ data: "gover_area", "defaultContent": "" },
			{ data: "pmt_office", "defaultContent": "" },
			{ data: "adm_office", "defaultContent": "" },
			{ data: "pay_date", "defaultContent": "" },
			{ data: "pay_money", "defaultContent": "" },
			{
				data: "cancel_yn",
				"defaultContent": "",
				render: function(data, type, row, meta) {
					var cancelYnTrimmed = (data && data.trim()) || "";  // 공백 제거 후 null 체크
					if (cancelYnTrimmed === "Y") {
						return '해지'; // 해지일 경우 "해지" 표기
					} else {
						return '미해지'; // null 또는 미해지일 경우 "미해지" 표기
					}
				}
			},
			{
				data: "cancel_date",
				"defaultContent": "",
				render: function(data, type, row, meta) {
					var cancelYnTrimmed = (row.cancel_yn && row.cancel_yn.trim()) || "";  // 공백 제거 후 null 체크
					if (cancelYnTrimmed === "Y") {
						return data ? data : ''; // 해지일 경우 일자 표기
					} else {
						// 미해지 또는 null일 경우 해지 버튼 추가
						return `<button class="privateRemoveBtn" id='cancelBtn'>해지</a></button>`;
					}
				}
			},
			{
				data: "idx", "defaultContent": "",
				render: function(data, type, row, meta) {
					//쿼리 수정이 필요합니다.
					return `<button class="viewDetailButton" id="mapBtn" data-x="${row.x}" data-y="${row.y}">위치보기</button>`;
				}
			}, // 지도 위치보기
			//{ data: "echo_no", "defaultContent": "" }
			{
				data: "idx", "defaultContent": "",
				render: function(data, type, row, meta) {
					return `<button class="viewDetailButton" id='echoFile'>상세보기</button> `;
				}
			} // ECHO 문서보기 버튼 기능
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
			{ targets: [15], width: "100px" },
			{ targets: [16], width: "100px" },
			{ targets: [17], width: "100px" },
		]
	});

	table.on('click', 'tr', function(event) {
		var data = table.row(this).data();
		var target = $(event.target);
		var isButtonCell = [15, 16, 17].includes(target.closest('td').index());

		if (isButtonCell) {
			return;
		} else {
			var data = table.row(this).data();
			console.log(data);
			console.log(data.idx);

			var url = "/land/gover/useDetail?idx=" + data.idx;
			window.location = url;
		}
	});
	
	// 위치보기 버튼 클릭 이벤트 처리
	$('#userTable').on('click', '#mapBtn', function(event) {
	    event.stopPropagation(); // 이벤트 전파 차단

	    // 버튼의 data 속성에서 x, y 좌표 가져오기
	    const x = $(this).data('x');
	    const y = $(this).data('y');
	    
	    console.log("x, y:", x, y);
	    
	    // 좌표가 존재하는지 확인하고, 없으면 undefined를 전달
	    if (typeof x !== 'undefined' && typeof y !== 'undefined' && x !== 'undefined' && y !== 'undefined' && x !== null && y !== null) {
	        // 좌표가 있을 때는 좌표를 전달
	        onePositionView({ x, y });
	    } else {
	        // 좌표가 없을 때는 빈 객체를 전달하여 onePositionView 내부에서 처리
	        onePositionView(undefined);
	    }
	});
}

// '해지' 버튼에 대한 클릭 이벤트 처리
$(document).on('click', '#cancelBtn', function(event) {
    event.stopPropagation();  // 다른 이벤트 전파 방지

    // 현재 클릭한 row의 데이터를 가져옴
    var row = $(this).closest('tr');
    var data = table.row(row).data();
    console.log(data);

    // 해당 idx를 이용해 페이지로 이동
    var url = "/land/gover/occupancyEndReg?idx=" + data.idx;
    window.location = url;
});


// 지사 선택 시 허가관청 목록 업데이트
$(document).on("click", "#jisaUl li", function () {
    const selectedJisa = $(this).text().trim();
    $("#jisaText").text(selectedJisa);
    
    // 20240930 jyoh 지사 선택시 허가관청 전체 표기
    if (selectedJisa != lastSelectedjisa) {
		$("#privateUseSelectBox03_1").val(selectedJisa).change(); // change 이벤트 트리거
		// 20241001 jyoh 지사 선택시 허가관청, 관리기간 "전체"로 초기화
		$('.privateUseSectionContDevide:first .sectionMenuListBoxs .privateUseSelects button.privateUseSelectsTitleBtn')
			.not(':first')
			.not(':eq(0)')
			.not(':last')
			.text('전체')
	}
    
    lastSelectedjisa = selectedJisa;
});

$(document).on("change", "#privateUseSelectBox03_1", function () {
    const selectedJisa = $("#privateUseSelectBox03_1").val();
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
            $("#privateUseSelectBox03_3 option").remove();
            $("#pmtOfficeUl").append("<li><p>전체</p></li>");
            $("#privateUseSelectBox03_3").append("<option value=''>전체</option>");
            for (let i = 0; i < data.length; i++) {
                $("#pmtOfficeUl").append("<li><p>" + data[i].so_pmt_office + "</p></li>");
                $("#privateUseSelectBox03_3").append("<option>" + data[i].so_pmt_office + "</option>");
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
    if (lastPmtOffice != selectedPmtOffice) {
		$("#privateUseSelectBox03_3").val(selectedPmtOffice).change(); // change 이벤트 트리거
		// 20241001 jyoh 허가관청 선택시 관리기관 "전체"로 초기화
		$('.privateUseSectionContDevide:first .sectionMenuListBoxs .privateUseSelects button.privateUseSelectsTitleBtn')
		.not(':lt(3)')
		.not(':last')
		.text('전체');
	}
    lastPmtOffice = selectedPmtOffice;
});

$(document).on("change", "#privateUseSelectBox03_3", function () {
    const selectedPmtOffice = $("#privateUseSelectBox03_3").val();
    const selectedJisa = $("#privateUseSelectBox03_1").val(); // 지사 선택된 값

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
            $("#privateUseSelectBox03_4 option").remove();
            $("#admOfficeUl").append("<li><p>전체</p></li>");
            $("#privateUseSelectBox03_4").append("<option value=''>전체</option>");
            for (let i = 0; i < data.length; i++) {
                $("#admOfficeUl").append("<li><p>" + data[i].so_adm_office + "</p></li>");
                $("#privateUseSelectBox03_4").append("<option>" + data[i].so_adm_office + "</option>");
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
    $("#privateUseSelectBox03_4").val(selectedAdmOffice).change(); // change 이벤트 트리거
});




//엑셀 다운로드

$(document).on("click","#excelDownloadBtn",function(){
		console.log("점용해지내역조회 엑셀 다운로드 ");
		
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
		  
		  //------------------------------
		
		  object.jisa = ljsIsNull(object.jisa) ? '' : object.jisa;
		object.gover_no = object.gover_no;
		object.use_purpos = object.use_purpos;
		object.pmt_office = object.pmt_office;
		object.adm_office = object.adm_office;
		console.log(object.adm_office);
		// object.adm_office = ljsIsNull(object.adm_office) ? '' : object.adm_office;
		// 해지 여부 조건 추가
		if (object.cancel_yn === "해지") {
			object.cancel_yn = "Y";
		} else if (object.cancel_yn === "미해지") {
			object.cancel_yn = "N";
		} else {
			object.cancel_yn = ""; // 해지 여부가 없을 때 기본값 처리
		}
		object.pay_date_start = object.pay_date_start;
		object.pay_date_end = object.pay_date_end;
		object.idx = object.idx;

		// 주소
		var ask = (object.privateUseRadio03 == undefined || object.privateUseRadio03 == null) ? '0' : object.privateUseRadio03;
		console.log("privateUseRadio03:" + ask);

		// 입력형 주소 입력 시
		if (ask == "0") {
			object.saddr = (object.addressFull == undefined || object.addressFull == null) ? '' : object.addressFull;
		}
		// 선택형 주소 입력 시
		else {
			var addrs = object.sido_nm || '';
			if (!ljsIsNull(object.sgg)) addrs += " " + object.sgg;
			if (!ljsIsNull(object.emd)) addrs += " " + object.emd;
			if (!ljsIsNull(object.ri)) addrs += " " + object.ri;
			if (!ljsIsNull(object.jibun)) addrs += " " + object.jibun;
			object.saddr = (addrs == undefined || addrs == null || addrs == "undefined") ? '' : addrs;

			/* 2024.10.04 손지민 - 선택행 주소 검색 시 시도/시군구/읍면동/리/지번 분리 검색
			d.sido_nm = params.sido_nm;
			d.sgg_nm = params.sgg;
			d.emd_nm = params.emd;
			d.ri_nm = params.ri;
			d.jibun = params.jibun;
			*/
		}
		      console.log(object);  
			   	

	
		var allData={"excel":""};
		$.ajax({
			url: "/land/gover/menu03_3ExcelDownload",  // PNU 기준으로 데이터를 가져오는 API
			data: JSON.stringify(object),
			async: true,
			type: "POST",
			dataType: "json",
			contentType: "application/json; charset=utf-8",
			success: function(rt) {
				const data = rt.result;
				console.log(data); // 서버에서 받아온 데이터 확인
				var head=['순번','점용관리번호','담당지사','토지주소','점용구분','허가번호','허가관청','허가기간 시작일','허가기간 종료일','납부일','금액','해지여부','해지일','PNU'];
				var dataArr=[];
				 dataArr.push(head);	
				for(var i=0;i<data.length;i++){
					
					var goverDate=data[i].gover_st_date+"~"+data[i].gover_ed_date; 
					
					var rowArr=[data[i].no,data[i].gover_no,data[i].jisa,data[i].address,data[i].use_purpos,data[i].pmt_no,data[i].pmt_office,data[i].pmt_st_date,data[i].pmt_ed_date,data[i].pay_date,data[i].pay_money,data[i].cancle_date,data[i].pnu];
					dataArr.push(rowArr);	
				}
					console.log("--------------excel data------------------");
					console.log(dataArr);
					
					
					// ExcelJS 워크북과 워크시트 생성
					   var workbook = new ExcelJS.Workbook();
					   var worksheet = workbook.addWorksheet('Sheet1');

					  /* // 헤더 병합
					   worksheet.mergeCells('A1:A2');  // '순번' 열
					   worksheet.mergeCells('B1:K1');  // '토지 기본 정보' 병합
					   worksheet.mergeCells('L1:S1');  // '권리 확보 여부' 병합

					   // 첫 번째 행의 병합된 셀 값 설정
					   worksheet.getCell('A1').value = '순번';
					   worksheet.getCell('B1').value = '토지 기본 정보';
					   worksheet.getCell('L1').value = '권리 확보 여부';*/

					   // 두 번째 행의 구체적인 열 제목 설정
					  /* const headers = ['담당지사', '자산분류번호', '관리번호', '시도', '시군구', '읍면동', '리', '지번', '지목', '지적면적', '소유자명', '등기여부', '계약유형', '편입면적', '취득일', '등기일', '사용승락여부', 'PNU'];
					   worksheet.getRow(2).values = ['순번', ...headers];
*/
// ExcelJS를 이용해 워크북과 워크시트 생성
			          var workbook = new ExcelJS.Workbook();
			          var worksheet = workbook.addWorksheet('Sheet1');

			          // 헤더와 데이터 추가 (빈 셀도 미리 생성)
			          worksheet.columns = head.map(h => ({ header: h, key: h, width: 20 }));
					  dataArr.slice(1).forEach(row => {
					          var rowObject = worksheet.addRow(row);
					          rowObject.eachCell({ includeEmpty: true }, function(cell, colNumber) {
					              cell.value = cell.value || '';  // 공백일 경우 빈 문자열로 초기화
					          });
					      });

						  
						
						  
			          // 스타일 정의 (글꼴, 테두리, 정렬)
			          worksheet.eachRow((row, rowNumber) => {
			              row.eachCell((cell, colNumber) => {
			                  cell.font = { size: 10, bold: true };
			                  cell.alignment = { vertical: 'middle', horizontal: 'center' };
			                  cell.border = {
			                      top: { style: 'thin' },
			                      left: { style: 'thin' },
			                      bottom: { style: 'thin' },
			                      right: { style: 'thin' }
			                  };
			              });
			          });
					   // Unix time을 사용한 파일명 생성
					   var unixTime = Date.now();
					   var fileName = '점용내역해지조회_' + unixTime + '.xlsx';

					   // 엑셀 파일 다운로드
					   workbook.xlsx.writeBuffer().then(function (buffer) {
					       var blob = new Blob([buffer], { type: 'application/octet-stream' });
					       var link = document.createElement('a');
					       link.href = URL.createObjectURL(blob);
					       link.download = fileName;
					       link.click();
					   });
					
					
				},
				error: function(jqXHR, textStatus, errorThrown) {
					console.error("Error: ", textStatus, errorThrown);
				}
			});
	})
	
