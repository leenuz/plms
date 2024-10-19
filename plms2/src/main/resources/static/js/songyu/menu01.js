
var table;

$(document).ready(function() {
  console.log("songyu/menu01.js start");
  /*$('#jisa').niceSelect();*/
//testAjax();
//init_Table();
commonJisaInfoCheck();
loadDataTable("");
});


//조회하기 클릭시 상단 정보 출력 (현재는 지사 부분만 추가하였음 ... 다 불수 있게 추가해주세요)
$(document).on("click","#registerBtn",function(){
       console.log($("#menuHiddenSelectBox01_1").val());
	   console.log($("#searchForm").serialize());
	   
	   var formSerializeArray = $('#searchForm').serializeArray();
	   console.log(formSerializeArray)
	   var object = {};
	   for (var i = 0; i < formSerializeArray.length; i++){
	       object[formSerializeArray[i]['name']] = formSerializeArray[i]['value'];
	   }
	   
	   var json = JSON.stringify(formSerializeArray);
	  
	  console.log("----------jsonobj------------");
	  console.log(json);
	  console.log("object askMenu01:"+object.askMenu01); 
	  
	  
	   loadDataTable(object);
	   console.log("-----------------------");
	   
     })

$(document).on("change","#sido",function(){
	console.log("----------start sido change -------------");
	$("#sido").val($("#sidoText").text()).attr("selected","selected");
	if ($("#sido").val()==null) return;
	var allData={"key":$("#sido").val()}
					   console.log(allData);
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
							console.log(data[i].sgg_nm);
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


$(document).on("change","#sgg",function(){
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
	 

$(document).on("change","#emd",function(){
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


// Korean    var lang_kor = {        "decimal" : "",        "emptyTable" : "데이터가 없습니다.",        "info" : "_START_ - _END_ (총 _TOTAL_ 명)",        "infoEmpty" : "0명",        "infoFiltered" : "(전체 _MAX_ 명 중 검색결과)",        "infoPostFix" : "",        "thousands" : ",",        "lengthMenu" : "_MENU_ 개씩 보기",        "loadingRecords" : "로딩중...",        "processing" : "처리중...",        "search" : "검색 : ",        "zeroRecords" : "검색된 데이터가 없습니다.",        "paginate" : {            "first" : "첫 페이지",            "last" : "마지막 페이지",            "next" : "다음",            "previous" : "이전"        },        "aria" : {            "sortAscending" : " :  오름차순 정렬",            "sortDescending" : " :  내림차순 정렬"        }    };


function loadDataTable(params) {
	console.log("-----start loadDataTable----------");
	console.log(params);

	//var json=JSON.stringify(params);
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
		//dom: '<"top"<"dt-title">Bl><"dt-center-in-div"r><"bottom"tp><"clear">',
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
			url: "/land/songyu/menu01DataTableList",
			type: "POST",
			datatype: "json",
			data: function(d) {
				//d=params;
				d.jisa = ljsIsNull(jisaCheck) ? ljsIsNull(params.jisa) ? '' : params.jisa : jisaCheck;
				d.manage_no = params.manage_no;
				if (params.toji_type == "국유지") d.toji_type = "Y";
				else if (params.toji_type == "사유지") d.toji_type = "N";
				else d.toji_type = "";
				d.toji_plan_type = params.toji_plan_type;
				d.right_overlap = params.OverlapCheck01;

				var right_type = "";
				if (params.songyu_type_all != undefined && params.songyu_type_all != null) right_type = "";
				else {
					if (params.songyu_type_gover != undefined && params.songyu_type_gover != null) right_type += ",gover";
					if (params.songyu_type_jisang != undefined && params.songyu_type_jisang != null) right_type += ",jisang";
					if (params.songyu_type_notset != undefined && params.songyu_type_notset != null) right_type += ",notset";
					if (params.songyu_type_toji != undefined && params.songyu_type_toji != null) right_type += ",dopco";
				}

				console.log("right_type:" + right_type.substr(1));
				d.right_type = right_type.substr(1);
				d.dosiplan = params.dosiplan;
				
				var ask = (params.askMenu01 == undefined || params.askMenu01 == null) ? '0' : params.askMenu01;
				console.log("askmenu:" + ask);
				if (ask == "0") {
					console.log("---------입력형 주소--------------");
					d.saddr = (params.addressFull == undefined || params.addressFull == null) ? '' : params.addressFull;
				}
				else {
					console.log("------------선택형 주소--------------");
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
				$("#dataTableTotalCount").html(json.recordsTotal);
				//$("div.dt-title").html('<div class="dataTitles"><h5>총 검색 건 수</h5></div>');
				return json.data;
			}
		},
		
		columns: [
			{ data: "no", "orderable": false }, //0. 순번
			{ data: "jisa" }, //1. 지사 
			{ data: "address" }, //2. 주소
			{ data: "pipe_overlap_yn", "defaultContent": "" }, //3. 관로저촉 
			{ data: "pipe_meter", "defaultContent": "" }, //4. 관경
			{ data: "jimok_text", "defaultContent": "" }, //5. 지목
			{ data: "souja_name", "defaultContent": "" }, //6. 소유자
			{ data: "jijuk_area", "defaultContent": "" }, //7. 면적
			{ data: "toji_type", "defaultContent": "" }, //8. 토지유형
			{
			    data: "jisang_status",
			    render: function(data, type, full, meta) {
			        var rtn;
			        if (data == "jisang") rtn = "지상권";
			        else if (data == "gover") rtn = "점용";
			        else if (data == "dopco") rtn = "회사토지";
			        else if (data == "notset") rtn = "미설정";
			        else rtn = data; // 데이터가 없거나 다른 값이 있으면 그대로 출력
			        return rtn;
			    }
			}, //9. 권리확보
			{ data: "jasan_no" }, //10. 자산번호
			{ data: "master_no" }, //11. 관리번호 
			{ data: "comple_yn" }, //12. 등기여부 
			{ data: "permitted_yn" }, //13. 계약유형 
			{ data: "chuideuk_date" }, //14. 취득일 
			{ data: "gover_date" }, //15. 점용기간
			{ data: "pay_date" }, //16. 점용납부일 
			{ data: "gover_area" }, //17. 설정면적
			{ data: "gover_length" }, //18. 설정연장 
			{ data: "jasan_money" }, //19. 자산금액 
			{ data: "pay_money" }, //20. 납부금액
			{ data: "registed_yn" }, //21. 등기/점용 여부 
			{ data: "permitted_yn" }, //22. 계약허가여부
			{ data: "code_depth1_name" }, //23. 이슈유형대분류 
			{ data: "code_depth2_name" }, //24. 이슈유형중분류
			{ data: "code_depth3_name" }, //25. 이슈유형세분류 
			{ data: "dosiplan" } //26. 토지개발대상
		],
		columnDefs: [
			{ "className": "dt-head-center", "targets": "_all" },
			{ className: 'dt-center', "targets": "_all" },
			{ targets: [0], width: "50px" },
			{ targets: [1], width: "200px" },
			{ targets: [2], width: "500px" },
			{ targets: [3], width: "100px" },
			{ targets: [4], width: "100px" },
			{ targets: [5], width: "100px" },
			{ targets: [6], width: "100px" },
			{
				targets: [7]
				, width: "100px"
				, render: function(data, type, full, meta) {
					var rtn;
					rtn = addCommas(ljsIsNull(full.jijuk_area) ? '' : full.jijuk_area);
					return rtn;
				}
			}, //7. 면적
			{
				targets: [8]
				, width: "100px"
				, render: function(data, type, full, meta) {
					var rtn;
					if (full.gover_own_yn == "Y") rtn = "국유지";
					else if (full.gover_own_yn == "N") rtn = "사유지";
					else rtn = "";
					return rtn;
				}
			}, //8. 토지유형
			{
				targets: [14], width: "150px"
				, render: function(data, type, full, meta) {
					var rtn;
					if (!full.chuideuk_date) {
						rtn = "";
					}
					else rtn = full.chuideuk_date;
					return rtn;
				}
			}, //14. 취득일
			{
				targets: [15], width: "300px"
				, render: function(data, type, full, meta) {
					var rtn;
					rtn = full.pmt_st_date == undefined ? "" : full.pmt_st_date + " ~ " + full.pmt_ed_date;
					return rtn;
				}
			}, //15. 점용기간
			{
				targets: [16], width: "150px"
				, render: function(data, type, full, meta) {
					var rtn;
					if (!full.pay_date) {
						rtn = "";
					}
					else rtn = full.pay_date;
					return rtn;
				}
			}, //16. 점용납부일
			{
				targets: [17], width: "150px"
				, render: function(data, type, full, meta) {
					var rtn;
					if (!full.gover_area) {
						rtn = "";
					}
					else rtn = full.gover_area;
					return rtn;
				}
			}, //17. 설정면적
			{
				targets: [18], width: "150px"
				, render: function(data, type, full, meta) {
					var rtn;
					if (!full.gover_length) {
						rtn = "";
					}
					else rtn = full.gover_length;
					return rtn;
				}
			}, //18. 설정연장
			{
				targets: [19], width: "150px"
				, render: function(data, type, full, meta) {
					var rtn;
					if (!full.jasan_money) {
						rtn = "";
					}
					else rtn = full.jasan_money;
					return rtn;
				}
			}, //19. 자산금액
			{
				targets: [20], width: "150px"
				, render: function(data, type, full, meta) {
					var rtn;
					if (!full.pay_money) {
						rtn = "";
					}
					else rtn = addCommas(full.pay_money);
					return rtn;
				}
			} //20. 납부금액
		]
	});

	table.on('click', 'tr', function() {
		/*  var data = table.fnGetData( this );
			alert(data);*/

		console.log("--------------tr click---------------------");

		var data = table.row(this).data();
		console.log(data);
		console.log(data.idx);

		var url;
		if (data.idx.substring(0, 1) == "J") { // 지상권
			console.log("jisang");
			url = "/land/jisang/groundDetail?idx=" + data.idx + "&index=" + data.index + "&gidx=0";
		}
		else if (data.idx.substring(0, 1) == "G") { // 점용
			url = "/land/gover/occupationDetails?idx=" + data.idx + "&index=" + data.index + "&gidx=" + data.gidx;
		}
		else if (data.idx.substring(0, 1) == "N") { // 미설정
			url = "/land/notset/unsetOccupationDetails?idx=" + data.idx + "&index=" + data.index + "&gidx=0";
		}
		else if (data.idx.substring(0, 1) == "L") { // 회사토지
			url = "/land/dopco/companyLandDetails?idx=" + data.idx + "&index=" + data.index + "&gidx=0";
		}

		else return;

		window.location = url;
	});

	/*$("table th").resizable({
		handles:'e',
		stop:function(e,ui){
			$(this).width(ui.size.width);
			table.columns.adjust().draw();
		}
	});*/
	/*table
			.on('order.dt search.dt', function () {
					let i = 1;
	 
					table
							.cells(null, 0, { search: 'applied', order: 'applied' })
							.every(function (cell) {
									this.data(i++);
							});
			})
			.draw();*/

	// console.log($('#userTable').DataTable().page.info().recordsTotal);
	
	
	
	$(document).on("click","#excelDownloadBtn",function(){
		console.log("권리확보현황 엑셀 다운로드 ");
		
		
		var formSerializeArray = $('#searchForm').serializeArray();
		   console.log(formSerializeArray)
		   var object = {};
		   for (var i = 0; i < formSerializeArray.length; i++){
		       object[formSerializeArray[i]['name']] = formSerializeArray[i]['value'];
		   }
		   
		   var json = JSON.stringify(formSerializeArray);
		  
		  console.log("----------jsonobj------------");
		  console.log(json);
		  console.log("object askMenu01:"+object.askMenu01); 
		  var right_type = "";
			if (object.songyu_type_all != undefined && object.songyu_type_all != null) right_type = "";
			else {
				if (object.songyu_type_gover != undefined && object.songyu_type_gover != null) right_type += ",gover";
				if (object.songyu_type_jisang != undefined && object.songyu_type_jisang != null) right_type += ",jisang";
				if (object.songyu_type_notset != undefined && object.songyu_type_notset != null) right_type += ",notset";
				if (object.songyu_type_toji != undefined && object.songyu_type_toji != null) right_type += ",dopco";
			}

			console.log("right_type:" + right_type.substr(1));
			object.right_type = right_type.substr(1);
		
		console.log(object);
		
		

		         	

		
		var allData={"excel":""};
		$.ajax({
				url: "/land/songyu/selectSongyuMenu1ExcelData",  // PNU 기준으로 데이터를 가져오는 API
				data: JSON.stringify(object),
				async: true,
				type: "POST",
				dataType: "json",
				contentType: "application/json; charset=utf-8",
				success: function(rt) {
					const data = rt.result;
					console.log(data); // 서버에서 받아온 데이터 확인
					var dataArr=[];
					var head=['순번','담당지사','관로저촉','관경','시도','시군구','읍면동','리','지번','지목','소유자','면적','토지유형','권리확보','자산번호'
					 ,'등기여부','겨약유형','취득일','점용기간','점용납부일','설정면적','설정연장','자산금액','납부금액'
					 ,'PNU','등기/점용여부','계약/허가여부','이슈유형대분류','이슈유형중분류','이슈유형세분류','허가증보유여부','영구무상점유','소액미청구','점용료선납','선납기한'];
					 dataArr.push(head);	
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
						
						
						var rowArr=[data[i].no,data[i].jisa,data[i].pipe_overlap_yn,data[i].pipe_meter,data[i].sido_nm,data[i].sgg_nm,data[i].emd_nm,data[i].ri_nm,data[i].jibun,data[i].jimok_text,data[i].souja_name,data[i].jijuk_area,togi_type,jisangStatus,data[i].jasan_no
							,data[i].comple_yn,data[i].permitted_yn,data[i].chuideuk_date,pmtDate,data[i].pay_date,data[i].gover_area,data[i].gover_length,data[i].jasan_money,data[i].pay_money
							,data[i].pnu,data[i].registed_yn,data[i].permitted_yn,data[i].code_depth1_name,data[i].code_depth2_name,data[i].code_depth3_name,data[i].permpossyn,occunonpayreasonTitle1,occunonpayreasonTitle2,data[i].occuprepayyn,data[i].occuprepaydate];
						dataArr.push(rowArr);	
					}
					console.log("--------------excel data------------------");
					console.log(dataArr);
					
					
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

					  
					  var unixTime = Date.now();
					      var fileName = '송유관현황_' + unixTime + '.xlsx';  // 파일명 생성
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
}

