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
	console.log("*** menu05_1.js ***");
	commonJisaInfoCheck();
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
	jisaCheck = $("#loginJisa").val();
	table = $('#userTable').DataTable({
		scrollCollapse: true,
		scrollX: true,
		scrollY: 600,
		paging: true,
		"oLanguage": { "sLengthMenu": "_MENU_" },
		//dom: '<"dt-center-in-div"l>B<f>r>t<>p',
		dom: '<"top"<"dt-title">Bl><"dt-center-in-div"r><"bottom"tp><"clear">',
		//buttons: [{ extend: 'excel', text: '엑셀 다운로드' }],
		buttons: [],
		initComplete: function() {
			$('.dt-title').html('<button style="float:right" class="dt-button buttons-excel button-html5" id="excelDownloadBtn">엑셀다운로드</button>');
			console.log(this.api().data().length);
		},
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
			url: "/land/dopco/menu05_1DataTableList",
			type: "POST",
			datatype: "json",
			data: function(d) {
				//d=params;
				d.jisa = ljsIsNull(jisaCheck) ? ljsIsNull(params.jisa) ? '' : params.jisa : jisaCheck;
				d.jasan_no = params.jasan_no;
				d.chuideuk_date_date = params.start_date + '~' + params.end_date;
				d.start_date = params.start_date;
				d.end_date = params.end_date;

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
		
		columns: [
			{ data: "no", "orderable": false },          // 순번
			{ data: "jisa", "defaultContent": "" },      // 담당지사
			{ data: "address", "defaultContent": "" },   // 주소
			{ data: "jasan_no", "defaultContent": "" },   // 자산분류번호
			{ data: "dopco_status", "defaultContent": "" },   // 활용현황
			{ data: "chuideuk_date", "defaultContent": "" },   // 취득일
			{ data: "deunggi_date", "defaultContent": "" },   // 등기일
			{ data: "jijuk_area", "defaultContent": "" },// 면적
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
				targets: [8], width: "100px"
				, render: function(data, type, row, meta) {
					// console.log("x:", row.x, "y:", row.y); // 주석 풀면 로드 되면서 조회된 테이블 전체 x,y 오는지 확인 가능
					return `<button class="btnDesign viewDetailButton" data-x="${row.x}" data-y="${row.y}">위치보기</button>`;
				}
			}, //지도보기
		]
	});

	table.on('click', 'tr', function() {
		var target = $(event.target);
		var isButtonCell = target.closest('td').index() === 8;

		if (isButtonCell) {
			event.stopPropagation(); // 버튼 클릭 시에는 동작하지 않도록 이벤트 전파 차단
			return;
		} else {
			// 다른 열을 클릭했을 때만 상세 페이지로 이동
			console.log("--------------tr click---------------------");

			var data = table.row(this).data();
			console.log(data);
			console.log(data.idx);

			var url = "/land/dopco/compLandInfo?idx=" + data.idx + '&dopcoNo=' + data.dopco_no;
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
	    if (typeof x !== 'undefined' && typeof y !== 'undefined' && x !== 'undefined' && y !== 'undefined' && x !== null && y !== null) {
	        // 좌표가 있을 때는 좌표를 전달
	        onePositionView({ x, y });
	    } else {
	        // 좌표가 없을 때는 빈 객체를 전달하여 onePositionView 내부에서 처리
	        onePositionView(undefined);
	    }
	});
}



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
			url: "/land/dopco/menu05_1ExcelDownload",  // PNU 기준으로 데이터를 가져오는 API
			data: JSON.stringify(object),
			async: true,
			type: "POST",
			dataType: "json",
			contentType: "application/json; charset=utf-8",
			success: function(rt) {
				const data = rt.result;
				console.log(data); // 서버에서 받아온 데이터 확인
				var head=['순번','자산분류번호','시도','시군구','읍면동','리','지번','담당지사','활용현황','취득일','등기일','면적','PNU'];
				var dataArr=[];
				 dataArr.push(head);	
				for(var i=0;i<data.length;i++){
					
					var goverDate=data[i].gover_st_date+"~"+data[i].gover_ed_date; 
					
					var rowArr=[data[i].no,data[i].jasan_no,data[i].sido_nm,data[i].sgg_nm,data[i].emd_nm,data[i].ri_nm,data[i].yongdo,data[i].chuideuk_date,data[i].deunggi_date,data[i].jijuk_area,data[i].pnu];
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
					   var fileName = '회사토지조회_' + unixTime + '.xlsx';

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
