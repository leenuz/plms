const _____데이터테이블조회관련로직_____ = "";

var table;

$(document).ready(function() {
	console.log("/noti/menu01.js start");
	/*$('#jisa').niceSelect();*/
	//testAjax();
	//init_Table();
	commonJisaInfoCheck();
	loadDataTable("");
});


//조회하기 클릭시 상단 정보 출력 (현재는 지사 부분만 추가하였음 ... 다 불수 있게 추가해주세요)
$(document).on("click", "#registerBtn", function() {
	console.log($("#menuHiddenSelectBox01_1").val());
	console.log($("#searchForm").serialize());

	var formSerializeArray = $('#searchForm').serializeArray();
	console.log(formSerializeArray)
	var object = {};
	for (var i = 0; i < formSerializeArray.length; i++) {
		object[formSerializeArray[i]['name']] = formSerializeArray[i]['value'];
	}

	var json = JSON.stringify(formSerializeArray);

	console.log("----------jsonobj------------");
	console.log(json);
	console.log("object askMenu01:" + object.askMenu01);

	loadDataTable(object);
	console.log("-----------------------");
})


function datatablebasic() {
	new DataTable('#basicTable', {
		fixedColumns: {
			start: 3
		},
		paging: true,
		scrollCollapse: true,
		scrollX: true,
		scrollY: 300,
		dom: 'rtip',
		columnDefs: [
			{ "className": "dt-head-center", "targets": "_all" },
			{ className: 'dt-center', "targets": "_all" },
			{ targets: [0], width: "100px" },
			{ targets: [1], width: "300px" },
		]
	});
}


function loadDataTable(params) {
	console.log("-----start loadDataTable----------");
	console.log(params);

	//지사정보
	let jisaCheck = $("#loginJisa").val();

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
		rowReorder: {
			dataSrc: 'b_seq'
		},
		ajax: {
			url: "/land/noti/DataTableList",
			type: "POST",
			datatype: "json",
			data: function(d) {
				d.jisa = ljsIsNull(jisaCheck) ? ljsIsNull(params.jisa) ? '' : params.jisa : jisaCheck;
				d.gubun = params.gubun;
				d.start_date = params.start_date;
				d.end_date = params.end_date;
				
				var ask = (params.askMenu01 == undefined || params.askMenu01 == null) ? '0' : params.askMenu01;
				console.log("askmenu:" + ask);

				if (ask == "0") {
					console.log("-----------입력형------------");
					d.saddr = (params.addressFull == undefined || params.addressFull == null) ? '' : params.addressFull;
				}
				else {
					console.log("-------------선택형-------------");
					d.sido_nm = params.sido;
					d.sgg_nm = params.sgg;
					d.emd_nm = params.emd;
					d.ri_nm = params.ri;
					d.jibun = params.jibun;
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
				return json.data;
			}
		},
		initComplete: function() {
			console.log(this.api().data().length);
		},
		columns: [
			{ data: "no", "orderable": false }, //0. 순번
			{ data: "jisa" }, //1. 담당지사
			{ data: "juso" }, //2. 주소
			{ data: "jimok_text", "defaultContent": "" }, //3. 지목
			{ data: "jijuk_area", "defaultContent": "" }, //4. 지적면적
			{ data: "zone_name", "defaultContent": "" }, //5. 구간명
			{ data: "gubun", "defaultContent": "" }, //6. 구분
			{ data: "mv_date", "defaultContent": "" }, //7. 이설반영일자
			{
				data: "idx",
				render: function(data, type, row, meta) {
					// return `<button class="viewDetailButton" >위치보기</button> `;
					return `<button class="viewDetailButton" id="mapBtn" data-x="${row.x}" data-y="${row.y}">위치보기</button>`;
				}
			}, //8. 지도보기 데이터 수정필요 
			{
				data: "id",
				render: function(data, type, row, meta) {
					// 9번째 열에 삭제 버튼을 추가합니다.
					return `<button class="regisRemoveBtn" data-id="${data}">삭제</button>`;
				}
			} //9. 삭제 버튼
		],
		columnDefs: [
			{ "className": "dt-head-center", "targets": "_all" },
			{ className: 'dt-center', "targets": "_all" },
			{ targets: [0], width: "50px" }, //0. 순번
			{ targets: [1], width: "100px" }, //1. 담당지사
			{ targets: [2], width: "350px" }, //2. 주소
			{ targets: [3], width: "100px" }, //3. 지목
			{ targets: [4], width: "100px" }, //4. 지적면적
			{ targets: [5], width: "200px" }, //5. 구간명
			{ targets: [6], width: "100px" }, //6. 구분
			{ targets: [7], width: "150px" }, //7. 이설반영일자
			{ targets: [8], width: "100px" }, //8. 지도보기
			{ targets: [9], width: "100px" }, //9. 확인
		]
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
			// 좌표가 없을 때는 빈 객체를 전달하여 onePostionView 내부에서 처리
			onePositionView(undefined);
		}
	});
}

// 삭제 버튼 클릭 이벤트 (삭제 API 호출)
$(document).on('click', '.regisRemoveBtn', function() {
	const id = $(this).data('id');
	if (confirm('정말로 삭제하시겠습니까?')) {
		$.ajax({
			url: '/land/noti/deleteJijuk', // 삭제할 API 경로
			type: 'POST',
			data: { id: id },
			success: function(response) {
				alert('삭제되었습니다.');
				table.ajax.reload(); // 데이터 테이블을 다시 로드하여 변경 사항을 반영
			},
			error: function(xhr, status, error) {
				alert('삭제에 실패했습니다. 다시 시도해주세요.');
			}
		});
	}
});

const _____주소셀렉트박스관련시작_____ = "";

$(document).on("change", "#sido", function() {
	console.log("----------start sido change -------------");
	$("#sido").val($("#sidoText").text()).attr("selected", "selected");
	if ($("#sido").val() == null) return;
	var allData = { "key": $("#sido").val() }
	console.log(allData);
	$.ajax({
		url: "/land/api/getSigunMaster",
		data: JSON.stringify(allData),
		async: true,
		type: "POST",
		dataType: "json",
		contentType: 'application/json; charset=utf-8',
		success: function(rt, jqXHR) {
			console.log(rt);
			var data = rt.resultData;

			$("#sggUl li").remove();
			$("#sgg option").remove();

			$("#sggUl").append("<li><p>전체</p></li>");
			$("#sgg").append("<option value=''>전체</option>");
			for (var i = 0; i < data.length; i++) {
				console.log(data[i].sgg_nm);
				$("#sggUl").append("<li><p>" + data[i].sm_gugun + "</p></li>");
				$("#sgg").append("<option>" + data[i].sm_gugun + "</option>");
			}
			console.log("sido:" + $("#sido").val());
			$("#sido").val($("#sido").val()).attr("selected", "selected");
			// downloadExcel(rt.results);
		},
		beforeSend: function() {
			//(이미지 보여주기 처리)
			//$('#load').show();
		},
		complete: function() {
			//(이미지 감추기 처리)
			//$('#load').hide();
		},
		error: function(jqXHR, textStatus, errorThrown, responseText) {
			//alert("ajax error \n" + textStatus + " : " + errorThrown);
			console.log(jqXHR);
			console.log(jqXHR.readyState);
			console.log(jqXHR.responseText);
			console.log(jqXHR.responseJSON);
		}
	}) //end ajax
})


$(document).on("change", "#sgg", function() {
	console.log("----------start sgg change -------------");

	var allData = { "gugunKey": ljsIsNull($("#sgg option:selected").val()) ? '' : $("#sgg option:selected").val(), "sidoKey": $("#sidoText").text() }
	console.log(allData);
	$.ajax({

		url: "/land/api/getDongMaster",
		data: JSON.stringify(allData),
		async: true,
		type: "POST",
		dataType: "json",
		contentType: 'application/json; charset=utf-8',
		success: function(rt, jqXHR) {
			console.log(rt);
			var data = rt.resultData;
			$("#emdUl li").remove();
			$("#emd option").remove();
			$("#emdUl").append("<li><p>전체</p></li>");
			$("#emd").append("<option value=''>전체</option>");
			for (var i = 0; i < data.length; i++) {
				console.log(data[i].bm_dong);
				$("#emdUl").append("<li><p>" + data[i].bm_dong + "</p></li>");
				$("#emd").append("<option>" + data[i].bm_dong + "</option>");
			}
			$("#sido").val($("#sidoText").text()).attr("selected", "selected");
			$("#sgg").val($("#sggText").text()).attr("selected", "selected");
			// downloadExcel(rt.results);
		},
		beforeSend: function() {
			//(이미지 보여주기 처리)
			//$('#load').show();
		},
		complete: function() {
			//(이미지 감추기 처리)
			//$('#load').hide();
		},
		error: function(jqXHR, textStatus, errorThrown, responseText) {
			//alert("ajax error \n" + textStatus + " : " + errorThrown);
			console.log(jqXHR);
			console.log(jqXHR.readyState);
			console.log(jqXHR.responseText);
			console.log(jqXHR.responseJSON);
		}
	}) //end ajax
})


$(document).on("change", "#emd", function() {
	console.log("----------start emd change -------------");
	$("#sido").val($("#sidoText").text()).attr("selected", "selected");
	$("#sgg").val($("#sggText").text()).attr("selected", "selected");
	$("#emd").val($("#emdText").text()).attr("selected", "selected");
	var allData = { "dongKey": $("#emdText").text(), "gugunKey": $("#sggText").text(), "sidoKey": $("#sidoText").text() }
	console.log(allData);
	$.ajax({

		url: "/land/api/getRiMaster",
		data: JSON.stringify(allData),
		async: true,
		type: "POST",
		dataType: "json",
		contentType: 'application/json; charset=utf-8',
		success: function(rt, jqXHR) {
			console.log(rt);
			var data = rt.resultData;
			$("#riUl li").remove();
			$("#ri option").remove();
			$("#riUl").append("<li><p>전체</p></li>");
			$("#ri").append("<option value=''>전체</option>");
			for (var i = 0; i < data.length; i++) {
				console.log(data[i].bm_dong);
				$("#riUl").append("<li><p>" + data[i].rm_ri + "</p></li>");
				$("#ri").append("<option>" + data[i].rm_ri + "</option>");
			}
			/* $("#sido").val($("#sidoText").text()).attr("selected","selected");
			 $("#sgg").val($("#sggText").text()).attr("selected","selected");*/
			// downloadExcel(rt.results);
		},
		beforeSend: function() {
			//(이미지 보여주기 처리)
			//$('#load').show();
		},
		complete: function() {
			//(이미지 감추기 처리)
			//$('#load').hide();
		},
		error: function(jqXHR, textStatus, errorThrown, responseText) {
			//alert("ajax error \n" + textStatus + " : " + errorThrown);
			console.log(jqXHR);
			console.log(jqXHR.readyState);
			console.log(jqXHR.responseText);
			console.log(jqXHR.responseJSON);
		}
	}) //end ajax
})

/******************************************/
/******************************************/
//종섭작업

/******************************************/
/******************************************/