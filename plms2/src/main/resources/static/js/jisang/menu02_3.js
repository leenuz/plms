
var table;

$(document).ready(function() {
	console.log("jisang/menu02_3.js start");
	/*$('#jisa').niceSelect();*/
	//testAjax();
	//init_Table();
	commonJisaInfoCheck();
	loadDataTable("");

});

$(document).on("click", ".finalBtn", function() {

	console.log($("#searchResultPopDiv").html());
	var targetDiv = $("#searchResultPopDiv").parent().find("#searchResultPopup").find(".popupWrap");
	//console.log($(targetDiv).html());
	$("#popupWrap").toggleClass("active");
});

$(document).on("click", ".topCloseBtn", function() {

	console.log($("#searchResultPopDiv").html());
	var targetDiv = $("#searchResultPopDiv").parent().find("#searchResultPopup").find(".popupWrap");
	//console.log($(targetDiv).html());
	$("#popupWrap").toggleClass("active");
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
				$("#sggUl").append("<li><p>" + data[i].sm_gugun + "</p></li>");
				$("#sgg").append("<option>" + data[i].sm_gugun + "</option>");
			}

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

	var allData = { "gugunKey": ljsIsNull($("#sgg option:selected").val()) ? '' : $("#sgg option:selected").val(), "sidoKey": $("#sidoText").text() }

	$.ajax({

		url: "/land/api/getDongMaster",
		data: JSON.stringify(allData),
		async: true,
		type: "POST",
		dataType: "json",
		contentType: 'application/json; charset=utf-8',
		success: function(rt, jqXHR) {
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
		success: function(rt, jqXHR) {

			var data = rt.resultData;
			$("#riUl li").remove();
			$("#ri option").remove();
			$("#riUl").append("<li><p>전체</p></li>");
			$("#ri").append("<option value=''>전체</option>");
			for (var i = 0; i < data.length; i++) {
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


// Korean    var lang_kor = {        "decimal" : "",        "emptyTable" : "데이터가 없습니다.",        "info" : "_START_ - _END_ (총 _TOTAL_ 명)",        "infoEmpty" : "0명",        "infoFiltered" : "(전체 _MAX_ 명 중 검색결과)",        "infoPostFix" : "",        "thousands" : ",",        "lengthMenu" : "_MENU_ 개씩 보기",        "loadingRecords" : "로딩중...",        "processing" : "처리중...",        "search" : "검색 : ",        "zeroRecords" : "검색된 데이터가 없습니다.",        "paginate" : {            "first" : "첫 페이지",            "last" : "마지막 페이지",            "next" : "다음",            "previous" : "이전"        },        "aria" : {            "sortAscending" : " :  오름차순 정렬",            "sortDescending" : " :  내림차순 정렬"        }    };


function loadDataTable(params) {
	console.log("-----start loadDataTable----------");
	console.log(params);

	//var json=JSON.stringify(params);

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
		rowReorder: {
			dataSrc: 'b_seq'
		},
		ajax: {
			url: "/land/jisang/menu02BunhalDataTableList",
			type: "POST",
			datatype: "json",
			data: function(d) {
				//d=params;
				d.jisa = ljsIsNull(jisaCheck) ? ljsIsNull(params.jisa) ? '' : params.jisa : jisaCheck;
				d.manage_no = params.manage_no;
				d.souja = params.souja;
				d.jasan_no = params.jasan_no;
				d.account_yn = params.account_yn;

				var ask = (params.askMenu01 == undefined || params.askMenu01 == null) ? '0' : params.askMenu01;

				if (ask == "0") {
					d.saddr = (params.addressFull == undefined || params.addressFull == null) ? '' : params.addressFull;
				}
				else {
					d.sido_nm = params.sido;
					d.sgg = params.sgg;
					d.emd = params.emd;
					d.ri = params.ri;
					d.jibun = params.jibun;
				}

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
		/*initComplete: function() {
			console.log(this.api().data().length);
		},*/
		/*"fnRowCallback": function( nRow, aData, iDisplayIndex, iDisplayIndexFull ) {
//	console.log(aData);
	$('td:eq(0)', nRow).html(iDisplayIndexFull +1);
return nRow;
},*/
		columns: [
			{ data: "no", "orderable": false },
			{ data: "jisa" },
			{ data: "address" },
			{ data: "jasan_no", "defaultContent": "" },
			{ data: "jimok_text", "defaultContent": "" }, //5
			{ data: "souja_name", "defaultContent": "" },
			{ data: "jijuk_area", "defaultContent": "" },
			{ data: "pyeonib_area", "defaultContent": "" },
			{ data: "chuideuk_date" },
			{ data: "deunggi_date" },
			{
				data: "idx",
				render: function(data, type, row, meta) {
					return `<button class="viewDetailButton" >지번보기</button> `;
				}
			},
			{ data: "bunhal_date" }, //분할요청일
			{
				data: "idx",
				render: function(data, type, row, meta) {
					return `<button class="viewDetailButton" id="mapBtn" data-x="${row.x}" data-y="${row.y}">위치보기</button>`;
				}
			},// 지도보기 데이터
			{
				data: "idx",
				render: function(data, type, row, meta) {
					return `<button class="viewDetailButton">문서보기</button> `;
				}
			}// ECHO 문서보기 수정필요
		],
		columnDefs: [
			{ "className": "dt-head-center", "targets": "_all" },
			{ className: 'dt-center', "targets": "_all" },
			{ targets: [0], width: "50px" },
			{ targets: [1], width: "150px" },
			{ targets: [2], width: "400px" }, //주소
			{ targets: [3], width: "150px" },
			{ targets: [4], width: "100px" },
			{ targets: [5], width: "200px" }, //소유자
			{ targets: [6], width: "150px" },
			{ targets: [7], width: "150px" },
			{ targets: [8], width: "200px" },
			{ targets: [9], width: "200px" }, //등기일
			{ targets: [10], width: "100px" }, //분할된 지번
			{ targets: [11], width: "200px" },//분할요청일
			{ targets: [12], width: "100px" }, // 지도보기
			{ targets: [13], width: "100px" }, // 문서보기
		]
	});

	table.on('click', 'tr', function() {
		var target = $(event.target);
		var data = table.row(this).data();
		var isButtonCell = target.closest('td').index() === 10 || target.closest('td').index() === 12 || target.closest('td').index() === 13;
		var url;

		if (isButtonCell) {
			if (target.closest('td').index() === 10) {
				const buttonClass = event.target.className;
				var clickData = {
					idx: data.idx
				};
				$.ajax({
					url: "/land/jisang/getJibunListData",
					type: "POST",
					data: clickData,
				})
					.done(function(fragment) {
						console.log("##################");
						console.log(fragment);
						//runScriptsInElement(landRightSearchResultPop); // 삽입된 html내 스크립트 실행 함수 호출
						//console.log($("#searchResultPopDiv").html());
						$(".popContents li").remove();
						$('.menu02_3JibunPopWrapper').replaceWith(fragment);
						const popupOpen = document.querySelector("#searchResultsPopup .popupWrap");

						$(popupOpen).addClass("open");
						popupOpen.classList.add("active");

					});
			} else if (target.closest('td').index() === 12) {
				//지도보기 클릭
				event.stopPropagation(); // 버튼 클릭 시에는 동작하지 않도록 이벤트 전파 차단
				return;
			} else {
				// ECHO 문서보기 클릭

			}
		} else {
			js_idx = data.js_idx != null ? data.js_idx : "";
			url = "/land/jisang/forDivisionEasementDetails?idx=" + data.idx + "&index=" + data.index + "&js_idx=" + js_idx;
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
	    if (typeof x !== 'undefined' && typeof y !== 'undefined' && x !== 'undefined' && y !== 'undefined') {
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
		console.log("지상권분할조회 엑셀 다운로드 ");
		
		let jisaCheck = $("#loginJisa").val();
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
		  
		
			object.jisa = ljsIsNull(jisaCheck) ? ljsIsNull(object.jisa) ? '' : object.jisa : jisaCheck;
			object.manage_no = object.manage_no;
			object.souja = object.souja;
			object.jasan_no = object.jasan_no;
			object.account_yn = object.account_yn;

			var ask = (object.askMenu01 == undefined || object.askMenu01 == null) ? '0' : object.askMenu01;

			if (ask == "0") {
				object.saddr = (object.addressFull == undefined || object.addressFull == null) ? '' : object.addressFull;
			}
			else {
				object.sido_nm = object.sido;
				object.sgg = object.sgg;
				object.emd = object.emd;
				object.ri = object.ri;
				object.jibun = object.jibun;
			}

		      console.log(object);  
			   	

	
		var allData={"excel":""};
		$.ajax({
				url: "/land/jisang/menu02_3ExcelDownload",  // PNU 기준으로 데이터를 가져오는 API
				data: JSON.stringify(object),
				async: true,
				type: "POST",
				dataType: "json",
				contentType: "application/json; charset=utf-8",
				success: function(rt) {
					const data = rt.result;
					console.log(data); // 서버에서 받아온 데이터 확인
					var dataArr=[];
					var head=['순번','자산분류번호','시도','시군구','읍면동','리','지번','담당지사','소유자명','지적면적','편입면적','취득일','등기일','PNU'];
					 dataArr.push(head);	
					for(var i=0;i<data.length;i++){
						var cancle_str=""
						if (data[i].cancel_yn=="Y") cancle_str="해지";
						else cancle_str="미해지";
						
						
						var rowArr=[data[i].no,data[i].jasan_no,data[i].sido_nm,data[i].sgg_nm,data[i].emd_nm,data[i].ri_nm,data[i].jibun,data[i].jisa,data[i].souja_name,data[i].jijuk_area,data[i].pyeonib_area,data[i].chuideuk_date,data[i].deunggi_date,data[i].pnu];
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
					   var fileName = '지상권분할조회_' + unixTime + '.xlsx';

					   // 엑셀 파일 다운로드
					   workbook.xlsx.writeBuffer().then(function (buffer) {
					       var blob = new Blob([buffer], { type: 'application/octet-stream' });
					       var link = document.createElement('a');
					       link.href = URL.createObjectURL(blob);
					       link.download = fileName;
					       link.click();
					   });
					
					/*var worksheet = XLSX.utils.aoa_to_sheet(dataArr);
					var workbook = XLSX.utils.book_new();
					XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
					
					var cellStyle = {
					    font: { sz: 10, bold: true },  // 폰트 크기(sz: 14), 굵게(bold)
					    border: {                      // 셀 테두리 설정
					        top: { style: "thick",color:{rgb:"000000"} },
					        bottom: { style: "thick",color:{rgb:"000000"} },
					        left: { style: "thick",color:{rgb:"000000"} },
					        right: { style: "thick",color:{rgb:"000000"} }
					    },
						alignment: {
						        horizontal: "center",  // Horizontal center alignment
						        vertical: "center"     // Vertical center alignment
						    }
					};
					
					// 모든 데이터 셀에 스타일 적용
					for (let row = 0; row < dataArr.length; row++) {
					    for (let col = 0; col < dataArr[row].length; col++) {
					        // 열 인덱스(A, B, C 등) 계산
					        let cellRef = XLSX.utils.encode_cell({ c: col, r: row });
					        
					        // 셀 객체가 존재하지 않으면 빈 셀을 생성
					        if (!worksheet[cellRef]) worksheet[cellRef] = { t: 's', v: '' };
					        
					        // 셀에 스타일 적용
					        worksheet[cellRef].s = cellStyle;
					    }
					}
					
					var colWidths = [];
					for (var i = 0; i < dataArr[0].length; i++) {
						if (i==0) colWidths.push({ wpx: 30 });
						else if (i==19) colWidths.push({ wpx: 200 });
						else if (i==25) colWidths.push({ wpx: 120 });
					    else colWidths.push({ wpx: 80 }); // 예시로 열마다 너비를 다르게 설정 (첫 열 100px, 두 번째 열 150px 등)
					}

					// 열 너비를 설정
					worksheet['!cols'] = colWidths;
					
					
					

				
					// 엑셀 파일 다운로드
					XLSX.writeFile(workbook, "test.xls");*/
					//commonDownloadExcel(head,dataArr,"test.xls");
					// 엑셀에 담을 데이터 준비
					/*var data1 = [];
					var rowTitle = ['관리기관', '주소', 'PNU', '점용길이 (m)', '관로면적 (㎡)'];
					data1.push(rowTitle);
					
					// 서버에서 받아온 데이터를 이용해 행 생성
					for (var i = 0; i < uls.length; i++) {
						var addr = $(uls[i]).find("#addr").val(); // 주소 값
						var pnuNo = $(uls[i]).find("#pnu").val(); // PNU 값
						
						// 서버에서 받아온 데이터를 pnuNo에 맞춰 매칭
						var matchingData = data.find(function(item) {
							return item.pnu === pnuNo; // pnu가 일치하는지 확인
						});

						// 매칭되는 데이터가 있으면 해당 데이터를 사용, 없으면 빈값 처리
						var contact_length = matchingData ? matchingData.contact_length : "";
						var contact_area = matchingData ? matchingData.contact_area : "";

						// 행 데이터 추가
						var rowData = [goverNo, addr, pnuNo, contact_length, contact_area];
						data1.push(rowData);
					}
					
					// 엑셀 파일 생성
					console.log(data1);
					var worksheet = XLSX.utils.aoa_to_sheet(data1);
					var workbook = XLSX.utils.book_new();
					XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");

					// goverNo를 활용해 파일 이름 동적으로 생성
					var fileName = goverNo + '_필지정보.xlsx';

					// 엑셀 파일 다운로드
					XLSX.writeFile(workbook, fileName);*/
				},
				error: function(jqXHR, textStatus, errorThrown) {
					console.error("Error: ", textStatus, errorThrown);
				}
			});
	})
