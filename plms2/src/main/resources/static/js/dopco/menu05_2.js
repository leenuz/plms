//달력 input클릭시 컬러변경 이벤트
(() => {
	const dateListBox = document.querySelectorAll(".dateListBox input[type='date']");
	if (dateListBox) {
		dateListBox.forEach((btn) => {
			btn.addEventListener("click", (e) => {
				const current = e.target.parentElement;
				if (current.classList.contains("active")) {
					return current.classList.remove("active");
				}
				current.classList.add("active");
			})
		})
	}
})();

$(document).ready(function () {
	console.log("*** menu05_2.js ***");
	loadDataTable("");
});

$(document).on("click", ".sido li", function () {
	$("#sido").val($("#sidoText").text()).attr("selected", "selected");
	if ($("#sido").val() == null) return;
	var allData = { "key": $("#sido").val() };
	$.ajax({
		url: "/land/api/getSigunMaster",
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
		url: "/land/api/getDongMaster",
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
		url: "/land/api/getRiMaster",
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

$(document).on("click", "#registerBtn", function () {
	var formSerializeArray = $('#searchForm').serializeArray();
	var object = {};
	for (var i = 0; i < formSerializeArray.length; i++) {
		object[formSerializeArray[i]['name']] = formSerializeArray[i]['value'];
	}

	var json = JSON.stringify(formSerializeArray);

	console.log(json);
	console.log(object);
	loadDataTable(object);
});

function loadDataTable(params) {
	console.log(params);

	table = $('#userTable').DataTable({
		scrollCollapse: true,
		scrollX: true,
		scrollY: 600,
		paging: true,
		"oLanguage": { "sLengthMenu": "_MENU_" },
		//dom: '<"dt-center-in-div"l>B<f>r>t<>p',
		dom: '<"top"<"dt-title">Bl><"dt-center-in-div"r><"bottom"tp><"clear">',
		buttons: [{ extend: 'excel', text: '엑셀 다운로드' }],

		pageLength: 20,
		bPaginate: true,
		bLengthChange: true,
		bInfo: false,
		lengthMenu: [[10, 20, 50, -1], ["10건", "20건", "50건", "All"]],
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
			url: "/land/dopco/menu05_2DataTableList",
			type: "POST",
			datatype: "json",
			data: function(d) {
				//d=params;
				d.jisa = ljsIsNull(params.jisa) ? '' : params.jisa;
				d.jasan_no = params.jasan_no;
				d.chuideuk_date_date = params.start_date + '~' + params.end_date;
				d.start_date = params.start_date;
				d.end_date = params.end_date;
				d.cancel_yn = params.cancel_yn;

				var ask = (params.askMenu01 == undefined || params.askMenu01 == null) ? '0' : params.askMenu01;
				if (ask == "0") {
					d.saddr = (params.addressFull == undefined || params.addressFull == null) ? '' : params.addressFull;
				}
				else {
					var addrs = params.sido;
					if (ljsIsNull(params.sgg)) addrs = addrs + "";
					else addrs = addrs + " " + params.sgg;
					if (ljsIsNull(params.emd)) addrs = addrs + "";
					else addrs = addrs + " " + params.emd;
					if (ljsIsNull(params.ri)) addrs = addrs + "";
					else addrs = addrs + " " + params.ri;
					d.saddr = (addrs == undefined || addrs == null) ? '' : addrs;
					//params.sido+" "+params.sgg+" "+ljsIsNull(params.emd)?'':params.emd;//+" "+ljsIsNull(params.ri)?'':params.ri+" "+ljsIsNull(params.jibun)?'':params.jibun;
				}

				console.log("-----------d-----------");
				console.log(d);
			},
			dataSrc: function(json) {
				console.log("-------------json---------------");
				console.log(json);
				$("#dataTableTotalCount").html(json.recordsTotal);
				return json.data;
			}
		},
		initComplete: function() {
			console.log(this.api().data().length);
		},

		columns: [
			{ data: "no", "orderable": false },          // 순번
			{ data: "dom_jisa", "defaultContent": "" },      // 담당지사
			{ data: "address", "defaultContent": "" },   // 주소
			{ data: "dom_jasan_no", "defaultContent": "" },   // 자산분류번호
			{ data: "dom_dopco_status", "defaultContent": "" },   // 활용현황
			{ data: "dom_chuideuk_date", "defaultContent": "" },   // 취득일
			{ data: "dom_deunggi_date", "defaultContent": "" },   // 등기일
			{ data: "dom_jijuk_area", "defaultContent": "" },// 면적
			{ data: "dom_cancel_yn", "defaultContent": "" },// 처분여부
			{ data: "dom_cancel_date", "defaultContent": "" },// 처분일
			{ data: "dom_idx", "defaultContent": "" }, // 지도
		],
		columnDefs: [
			{ "className": "dt-head-center", "targets": "_all" }, // 모든 헤더 가운데 정렬
			{ className: 'dt-center', "targets": "_all" }, // 모든 셀 가운데 정렬
			{ targets: [0], width: "40px" },   // 순번 칼럼
			{ targets: [1], width: "100px" },  // 담당지사 칼럼
			{ targets: [2], width: "150px" },  // 주소 칼럼
			{ targets: [3], width: "100px" },  // 자산분류번호 칼럼
			{ targets: [4], width: "100px" },  // 활용현황 칼럼
			{ targets: [5], width: "100px" },  // 취득일 칼럼
			{ targets: [6], width: "100px" },  // 등기일 칼럼
			{ targets: [7], width: "100px" },  // 면적 칼럼
			{
				targets: [8], width: "100px",
				render: function(data, type, row, meta) {
					return data == null ? '미처분' : '처분';
				}
			},  // 처분여부 칼럼
			{ targets: [9], width: "100px" },  // 처분일 칼럼
			{
				targets: [10], width: "100px"
				, render: function(data, type, row, meta) {
					return `<button class="btnDesign viewDetailButton" data-x="${row.x}" data-y="${row.y}">위치보기</button>`;
				}
			}, //지도보기
		]
	});

	table.on('click', 'tr', function() {
		var target = $(event.target);
		var isButtonCell = target.closest('td').index() === 10;

		if (isButtonCell) {
			event.stopPropagation(); // 버튼 클릭 시에는 동작하지 않도록 이벤트 전파 차단
			return;
		} else {
			// 다른 열을 클릭했을 때만 상세 페이지로 이동
			console.log("--------------tr click---------------------");

			var data = table.row(this).data();
			console.log(data);
			console.log(data.idx);

			var url = "/land/dopco/compLandInfo?idx=" + data.dom_idx + '&dopcoNo=' + data.dom_dopco_no + '&cancel=Y';
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
