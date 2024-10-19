//달력 input클릭시 컬러변경 이벤트
const landDevelopmentDateBoxsClicEvet = () => {

      const dateListBox = document.querySelectorAll(".dateListBox input[type='date']");
      if(dateListBox){
           dateListBox.forEach((btn) => {
                 btn.addEventListener("click", (e) => {
                       const current = e.target.parentElement;
                       if(current.classList.contains("active")){
                          return current.classList.remove("active");
                       }
                       current.classList.add("active");

                     })
           })

      }
}

landDevelopmentDateBoxsClicEvet();


$(document).ready(function() {
	console.log("*** menu04_1.js ***");
	commonJisaInfoCheck();
	loadDataTable("");
});

$(document).on("click",".sido li",function(){
	console.log("----------start sido change -------------");
	$("#sido").val($("#sidoText").text()).attr("selected","selected");
	if ($("#sido").val()==null) return;
	var allData={"key":$("#sido").val()};
					   console.log("allDAta : " + allData);
					  $.ajax({

					    url: "/land/api/getSigunMaster",
					    data:JSON.stringify(allData),
					    async: true,
					    type:"POST",
					    dataType: "json",
					    contentType: 'application/json; charset=utf-8',
					    success: function(rt,jqXHR) {
					      console.log(rt);
						  var data=rt.resultData;

						  $("#sggUl li").remove();
						  $("#sgg option").remove();

						  $("#sggUl").append("<li><p>전체</p></li>");
						  $("#sgg").append("<option value=''>전체</option>");
						  for(var i=0;i<data.length;i++){
							console.log(data[i].sm_gugun);
							$("#sggUl").append("<li><p>"+data[i].sm_gugun+"</p></li>");
							$("#sgg").append("<option>"+data[i].sm_gugun+"</option>");
						  }

						  console.log("sido:"+$("#sido").val());
						  $("#sido").val($("#sido").val()).attr("selected","selected");
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
					    error: function(jqXHR, textStatus, errorThrown,responseText) {
					      //alert("ajax error \n" + textStatus + " : " + errorThrown);

					      console.log(jqXHR);
					      console.log(jqXHR.readyState);
					      console.log(jqXHR.responseText);
					      console.log(jqXHR.responseJSON);

					    }
					  }) //end ajax
})
console.log("*****");

$(document).on("click",".sgg li",function() {
	console.log("----------start sgg change -------------");

	var allData={"gugunKey":ljsIsNull($("#sgg option:selected").val())?'':$("#sgg option:selected").val(),"sidoKey":$("#sidoText").text()}
    					   console.log(allData);
					  $.ajax({

					    url: "/land/api/getDongMaster",
					    data:JSON.stringify(allData),
					    async: true,
					    type:"POST",
					    dataType: "json",
					    contentType: 'application/json; charset=utf-8',
					    success: function(rt,jqXHR) {
					      console.log(rt);
						  var data=rt.resultData;
						  $("#emdUl li").remove();
						  $("#emd option").remove();
						  $("#emdUl").append("<li><p>전체</p></li>");
						  $("#emd").append("<option value=''>전체</option>");
						  for(var i=0;i<data.length;i++){
							console.log(data[i].bm_dong);
							$("#emdUl").append("<li><p>"+data[i].bm_dong+"</p></li>");
							$("#emd").append("<option>"+data[i].bm_dong+"</option>");
						  }


						  $("#sido").val($("#sidoText").text()).attr("selected","selected");
						  $("#sgg").val($("#sggText").text()).attr("selected","selected");
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
					    error: function(jqXHR, textStatus, errorThrown,responseText) {
					      //alert("ajax error \n" + textStatus + " : " + errorThrown);

					      console.log(jqXHR);
					      console.log(jqXHR.readyState);
					      console.log(jqXHR.responseText);
					      console.log(jqXHR.responseJSON);

					    }
					  }) //end ajax
})


$(document).on("click",".emd li",function(){
	console.log("----------start emd change -------------");
	$("#sido").val($("#sidoText").text()).attr("selected","selected");
	$("#sgg").val($("#sggText").text()).attr("selected","selected");
	$("#emd").val($("#emdText").text()).attr("selected","selected");
	var allData={"dongKey":$("#emdText").text(),"gugunKey":$("#sggText").text(),"sidoKey":$("#sidoText").text()}
					   console.log(allData);
					  $.ajax({

					    url: "/land/api/getRiMaster",
					    data:JSON.stringify(allData),
					    async: true,
					    type:"POST",
					    dataType: "json",
					    contentType: 'application/json; charset=utf-8',
					    success: function(rt,jqXHR) {
					      console.log(rt);
						  var data=rt.resultData;
						  $("#riUl li").remove();
						  $("#ri option").remove();
						  $("#riUl").append("<li><p>전체</p></li>");
						  $("#ri").append("<option value=''>전체</option>");
						  for(var i=0;i<data.length;i++){
							console.log(data[i].bm_dong);
							$("#riUl").append("<li><p>"+data[i].rm_ri+"</p></li>");
							$("#ri").append("<option>"+data[i].rm_ri+"</option>");
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
					    error: function(jqXHR, textStatus, errorThrown,responseText) {
					      //alert("ajax error \n" + textStatus + " : " + errorThrown);

					      console.log(jqXHR);
					      console.log(jqXHR.readyState);
					      console.log(jqXHR.responseText);
					      console.log(jqXHR.responseJSON);

					    }
					  }) //end ajax
})

$(document).on("click","#registerBtn",function(){

	    var formSerializeArray = $('#searchForm').serializeArray();
         var object = {};
    	   for (var i = 0; i < formSerializeArray.length; i++){
    	       object[formSerializeArray[i]['name']] = formSerializeArray[i]['value'];
    	   }

    	   var json = JSON.stringify(formSerializeArray);

           console.log(json);
           console.log(object);
           loadDataTable(object);


});


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
		order: [[12, 'desc']],

		rowReorder: {
			dataSrc: 'b_seq'
		},
		//	sAjaxSources:"/land/songyu/menu01DataTableList",
		//	sServerMethod:"POST",
		ajax: {
			url: "/togi/menu04_1DataTableList",
			type: "POST",
			datatype: "json",
			data: function(d) {
				//d=params;
				d.jisa = ljsIsNull(jisaCheck) ? ljsIsNull(params.jisa) ? '' : params.jisa : jisaCheck;
				d.manage_no = params.manage_no;
				d.souja = params.souja;
				d.jasan_no = params.jasan_no;
				d.dosiplan = params.dosiplan;
				d.jimok_text = ljsIsNull(params.jimok_text) ? '' : params.jimok_text;
				d.complete_yn = params.complete_yn;
				d.deunggi_date = params.start_date + '~' + params.end_date;
				d.account_yn = params.account_yn;
				d.start_date = params.start_date;
				d.end_date = params.end_date;

				var ask = (params.askMenu01 == undefined || params.askMenu01 == null) ? '0' : params.askMenu01;
				console.log("askmenu:" + ask);

				if (ask == "0") {
					console.log("---------3--------------");
					d.saddr = (params.addressFull == undefined || params.addressFull == null) ? '' : params.addressFull;
				}
				else {
					console.log("----------------------------1--------------");
					console.log(ljsIsNull(params.sgg));
					var addrs = params.sido;
					console.log("addrs:" + addrs);
					if (ljsIsNull(params.sgg)) addrs = addrs + "";
					else addrs = addrs + " " + params.sgg;
					if (ljsIsNull(params.emd)) addrs = addrs + "";
					else addrs = addrs + " " + params.emd;
					if (ljsIsNull(params.ri)) addrs = addrs + "";
					else addrs = addrs + " " + params.ri;
					//var addrs=params.sido+" "+params.sgg+" "+params.emd+" "+(params.ri==null || params.ri=="undefined") ? '' : params.ri;
					//console.log("emd:"+ljsIsNull(params.emd)?'':params.emd);
					console.log("addrs:" + addrs);
					d.saddr = (addrs == undefined || addrs == null) ? '' : addrs;
					//params.sido+" "+params.sgg+" "+ljsIsNull(params.emd)?'':params.emd;//+" "+ljsIsNull(params.ri)?'':params.ri+" "+ljsIsNull(params.jibun)?'':params.jibun;
				}
				console.log("saddr:" + d.saddr);
				console.log(params);
				console.log("-----------d-----------");
				console.log(d);
			},
			dataSrc: function(json) {
				console.log("-------------json---------------");
				console.log(json);
				$("#dataTableTotalCount").html(json.recordsTotal);
				//$("div.dt-title").html('<div class="dataTitles"><h5>총 검색 건 수</h5></div>');
				return json.data;
			}
		},
		
		/*"fnRowCallback": function( nRow, aData, iDisplayIndex, iDisplayIndexFull ) {
//	console.log(aData);
	$('td:eq(0)', nRow).html(iDisplayIndexFull +1);
return nRow;
},*/
		columns: [
			{ data: "no", "orderable": false },          // 순번
			{ data: "jisa", "defaultContent": "" },      // 담당지사
			{ data: "business_nm", "defaultContent": "" }, // 사업명
			{ data: "address", "defaultContent": "" },   // 주소
			{ data: "strdate", "defaultContent": "" },   // 시작일
			{ data: "enddate", "defaultContent": "" },   // 종료일
			{ data: "adm_office", "defaultContent": "" },// 시행청
			{ data: "business_oper", "defaultContent": "" }, // 사업자
			{ data: "dept_nm", "defaultContent": "" },   // 부서명
			{ data: "manager", "defaultContent": "" },   // 담당자
			{ data: "contact_num", "defaultContent": "" }, // 연락처
			{ data: "complete_yn", "defaultContent": "" } // 완료여부
		],
		columnDefs: [
			{ "className": "dt-head-center", "targets": "_all" }, // 모든 헤더 가운데 정렬
			{ className: 'dt-center', "targets": "_all" }, // 모든 셀 가운데 정렬
			{ targets: [0], width: "50px" },   // 순번 칼럼
			{ targets: [1], width: "150px" },  // 담당지사 칼럼
			{ targets: [2], width: "150px" },  // 사업명 칼럼
			{ targets: [3], width: "400px" },  // 주소 칼럼
			{ targets: [4], width: "150px" },  // 시작일 칼럼 (사업기간)
			{ targets: [5], width: "150px" },  // 종료일 칼럼 (사업기간)
			{ targets: [6], width: "150px" },  // 시행청 칼럼
			{ targets: [7], width: "150px" },  // 사업자 칼럼
			{ targets: [8], width: "150px" },  // 부서명 칼럼 (관할부서)
			{ targets: [9], width: "150px" },  // 담당자 칼럼 (관할부서)
			{ targets: [10], width: "150px" }, // 연락처 칼럼 (관할부서)
			{ targets: [11], width: "100px" }  // 완료여부 칼럼
		]
	});

	table.on('click', 'tr', function() {

		var target = $(event.target);

		var isButtonCell = target.closest('td').index() === 12;

		if (isButtonCell) {
			return;
		} else {
			// 다른 열을 클릭했을 때만 상세 페이지로 이동
			console.log("--------------tr click---------------------");

			var data = table.row(this).data();
			console.log(data);
			console.log(data.idx);
			
			var url = "/togi/landDevInfo?idx=" + data.idx;
			window.location = url;
		}
	});
}




//엑셀 다운로드

$(document).on("click","#excelDownloadBtn",function(){
		console.log("토지개발관리조회 엑셀 다운로드 ");
		
		let jisaCheck = $("#loginJisa").val();
		var formSerializeArray = $('#searchForm').serializeArray();
		         var object = {};
		    	   for (var i = 0; i < formSerializeArray.length; i++){
		    	       object[formSerializeArray[i]['name']] = formSerializeArray[i]['value'];
		    	   }

		    	   var json = JSON.stringify(formSerializeArray);
		  
		 //-----------------------------------------------------------------
		 object.jisa = ljsIsNull(jisaCheck) ? ljsIsNull(object.jisa) ? '' : object.jisa : jisaCheck;
		object.manage_no = object.manage_no;
		object.souja = object.souja;
		object.jasan_no = object.jasan_no;
		object.dosiplan = object.dosiplan;
		object.jimok_text = ljsIsNull(object.jimok_text) ? '' : object.jimok_text;
		object.complete_yn = object.complete_yn;
		object.deunggi_date = object.start_date + '~' + object.end_date;
		object.account_yn = object.account_yn;
		object.start_date = object.start_date;
		object.end_date = object.end_date;

		var ask = (object.askMenu01 == undefined || object.askMenu01 == null) ? '0' : object.askMenu01;
		console.log("askmenu:" + ask);

		if (ask == "0") {
			console.log("---------3--------------");
			object.saddr = (object.addressFull == undefined || object.addressFull == null) ? '' : object.addressFull;
		}
		else {
			console.log("----------------------------1--------------");
			console.log(ljsIsNull(object.sgg));
			var addrs = object.sido;
			console.log("addrs:" + addrs);
			if (ljsIsNull(object.sgg)) addrs = addrs + "";
			else addrs = addrs + " " + object.sgg;
			if (ljsIsNull(object.emd)) addrs = addrs + "";
			else addrs = addrs + " " + object.emd;
			if (ljsIsNull(object.ri)) addrs = addrs + "";
			else addrs = addrs + " " + object.ri;
			//var addrs=params.sido+" "+params.sgg+" "+params.emd+" "+(params.ri==null || params.ri=="undefined") ? '' : params.ri;
			//console.log("emd:"+ljsIsNull(params.emd)?'':params.emd);
			console.log("addrs:" + addrs);
			object.saddr = (addrs == undefined || addrs == null) ? '' : addrs;
			//params.sido+" "+params.sgg+" "+ljsIsNull(params.emd)?'':params.emd;//+" "+ljsIsNull(params.ri)?'':params.ri+" "+ljsIsNull(params.jibun)?'':params.jibun;
		}

		      console.log(object);   	

		
		var allData={"excel":""};
		$.ajax({
				url: "/togi/menu04_1ExcelDownload",  // PNU 기준으로 데이터를 가져오는 API
				data: JSON.stringify(object),
				async: true,
				type: "POST",
				dataType: "json",
				contentType: "application/json; charset=utf-8",
				success: function(rt) {
					const data = rt.result;
					console.log(data); // 서버에서 받아온 데이터 확인
					var dataArr=[];
					/*var head=['순번','담당지사','관로저촉','관경','시도','시군구','읍면동','리','지번','지목','소유자','면적','토지유형','권리확보','자산번호'
					 ,'등기여부','겨약유형','취득일','점용기간','점용납부일','설정면적','설정연장','자산금액','납부금액'
					 ,'PNU','등기/점용여부','계약/허가여부','이슈유형대분류','이슈유형중분류','이슈유형세분류','허가증보유여부','영구무상점유','소액미청구','점용료선납','선납기한'];*/
					/* dataArr.push(head);	*/
					for(var i=0;i<data.length;i++){
						var togi_type="";
						if (data[i].gover_own_yn=="Y") togi_type="국유지";
						else togi_type="사유지";
						var jisangStatus="";
						if (data[i].jisang_status=="jisang") jisangStatus="지상권";
						else if (data[i].jisang_status=="gover") jisangStatus="점용";
						else if (data[i].jisang_status=="notset") jisangStatus="미설정";
						else if (data[i].jisang_status=="dopco") jisangStatus="매입";
						else jisangStatus="";
						var pmtDate = data[i].pmt_st_date == undefined ? "" : data[i].pmt_st_date + " ~ " + data[i].pmt_ed_date; //점용기간
						var occunonpayreasonTitle1 ="";
						var occunonpayreasonTitle2 ="";
						//var occunonpayreasonTitle3 ="";
						if (data[i].occunonpayreason==1) occunonpayreasonTitle1="영구 무상점용";
						if (data[i].occunonpayreason==2) occunonpayreasonTitle1="소액 미청구";
						//if (data[i].occunonpayreason==2) occunonpayreasonTitle1="소액 미청구";
						
						
						var rowArr=[data[i].no,data[i].business_nm,data[i].jisa,data[i].address,data[i].strdate,data[i].enddate,data[i].adm_office,data[i].business_oper,data[i].dept_nm,data[i].manager,data[i].contact_num,data[i].complete_yn];
						dataArr.push(rowArr);	
					}
					console.log("--------------excel data------------------");
					console.log(dataArr);
					
					
					// ExcelJS 워크북과 워크시트 생성
					   var workbook = new ExcelJS.Workbook();
					   var worksheet = workbook.addWorksheet('Sheet1');

					   // 헤더 병합
					   worksheet.mergeCells('A1:A2');  // 순번 병합
					      worksheet.mergeCells('B1:B2');  // 사업명 병합
					      worksheet.mergeCells('C1:C2');  // 지사 병합
					      worksheet.mergeCells('D1:D2');  // 토지주소 병합
					      worksheet.mergeCells('E1:F1');  // 사업기간 병합
					      worksheet.mergeCells('G1:G2');  // 시행청 병합
					      worksheet.mergeCells('H1:H2');  // 사업자 병합
					      worksheet.mergeCells('I1:K1');  // 관할부서 병합
					      worksheet.mergeCells('L1:L2');  // 완료여부 병합

					      // 첫 번째 행의 병합된 셀 값 설정
					      worksheet.getCell('A1').value = '순번';
					      worksheet.getCell('B1').value = '사업명';
					      worksheet.getCell('C1').value = '지사';
					      worksheet.getCell('D1').value = '토지주소(대표지번)';
					      worksheet.getCell('E1').value = '사업기간';
					      worksheet.getCell('G1').value = '시행청';
					      worksheet.getCell('H1').value = '사업자';
					      worksheet.getCell('I1').value = '관할부서';
					      worksheet.getCell('L1').value = '완료여부';

					      // 두 번째 행 값 설정 (2행, 하위 헤더)
					      worksheet.getCell('E2').value = '시작일';
					      worksheet.getCell('F2').value = '종료일';
					      worksheet.getCell('I2').value = '부서명';
					      worksheet.getCell('J2').value = '담당자';
					      worksheet.getCell('K2').value = '연락처';
					   
					   
					   

					  /* // 두 번째 행의 구체적인 열 제목 설정
					   const headers = ['담당지사', '자산분류번호', '관리번호', '시도', '시군구', '읍면동', '리', '지번', '지목', '지적면적', '소유자명', '등기여부', '계약유형', '편입면적', '취득일', '등기일', '사용승락여부', 'PNU'];
					   worksheet.getRow(2).values = ['순번', ...headers];
*/
					   // 스타일 적용
					   const headerStyle = {
					       font: { bold: true },
					       alignment: { horizontal: 'center', vertical: 'middle' },
					       fill: { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFFF00' } },  // 노란색 배경
					       border: {
					           top: { style: 'thin' },
					           left: { style: 'thin' },
					           bottom: { style: 'thin' },
					           right: { style: 'thin' }
					       }
					   };

					   // 첫 번째 행에 스타일 적용
					     worksheet.getRow(1).eachCell((cell) => {
					         cell.style = headerStyle;
					     });

					     // 두 번째 행에도 스타일 적용
					     worksheet.getRow(2).eachCell((cell) => {
					         cell.style = headerStyle;
					     });
					   // 데이터 추가 (예시로 10개의 행을 추가)
					  /* var dataArr = [
					       [1, "서울지사", "A123", "M456", "서울특별시", "강남구", "삼성동", "리", "123-45", "대지", "100", "홍길동", "Y", "매매", "50", "2022-01-01", "2022-02-01", "Y", "PNU001"],
					       // 데이터 생략
					   ];*/

					   dataArr.forEach((row, index) => {
					       worksheet.addRow(row);
					   });
					   
					   

				 /* // 각 열의 데이터 길이에 따라 열 너비 설정
				    let columnLengths = new Array(headers.length).fill(10);  // 기본 길이 10

				    // 데이터와 헤더를 기반으로 최대 길이를 계산
				    worksheet.eachRow((row, rowNumber) => {
				        row.eachCell({ includeEmpty: true }, (cell, colNumber) => {
				            const cellValue = cell.value ? cell.value.toString() : '';
				            // 최대 길이를 계산하여 갱신
				            if (cellValue.length > columnLengths[colNumber - 1]) {
				                columnLengths[colNumber - 1] = cellValue.length;
				            }
				        });
				    });

				    // for문을 사용하여 각 열의 크기 설정
				    for (let i = 0; i < headers.length + 1; i++) {  // headers.length + 1: '순번'까지 포함
				        worksheet.getColumn(i + 1).width = columnLengths[i];
				    }  */
					
					// 셀 너비 설정
					   worksheet.columns = [
					       { width: 5 },  // 순번
					       { width: 50 },  // 담당지사
					       { width: 10 },  // 자산분류번호
					       { width: 50 },  // 관리번호
					       { width: 15 },  // 시도
					       { width: 20 },  // 시군구
					       { width: 25 },  // 읍면동
					       { width: 20 },  // 리
					       { width: 20 },  // 지번
					       { width: 15 },  // 지목
					       { width: 20 },  // 지적면적
					       { width: 20 },  // 소유자명
					       { width: 15 },  // 등기여부
					       { width: 15 },  // 계약유형
					       { width: 15 },  // 편입면적
					       { width: 20 },  // 취득일
					       { width: 20 },  // 등기일
						   { width: 20 },  // 사용승락여부
					       { width: 20 }   // PNU
					   ];
					   					  
					   

					   // 스타일을 각 데이터 셀에 적용
					   worksheet.eachRow((row, rowNumber) => {
					       if (rowNumber > 2) {  // 첫 번째와 두 번째 행은 헤더이므로 제외
					           row.eachCell({ includeEmpty: true }, (cell) => {
					               cell.alignment = { vertical: 'middle', horizontal: 'center' };
					               cell.border = {
					                   top: { style: 'thin' },
					                   left: { style: 'thin' },
					                   bottom: { style: 'thin' },
					                   right: { style: 'thin' }
					               };
					           });
					       }
					   });

					   // Unix time을 사용한 파일명 생성
					   var unixTime = Date.now();
					   var fileName = '도시개발조회_' + unixTime + '.xlsx';

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

