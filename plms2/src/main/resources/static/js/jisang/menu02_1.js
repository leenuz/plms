
var table;

$(document).ready(function() {
	console.log("jisang/menu02_1.js start");
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
	   
	   var formSerializeArray = $('#searchForm').serializeArray();
	   console.log(formSerializeArray)
       // 체크박스 값들을 조합하여 문자열로 만들기
       var jimokText = ''; // 빈 문자열 초기화

       // .choiceCheckWrapper 안의 체크된 체크박스 값 수집
       $('.choiceCheckWrapper input[type="checkbox"]:checked').each(function() {
           jimokText += $(this).attr('name') + ','; // 값들 사이에 쉼표(,)로 구분
       });

       // 마지막 쉼표 제거
       if (jimokText.endsWith(',')) {
           jimokText = jimokText.slice(0, -1);
       }

       formSerializeArray.push({
           name: 'jimok_text',
           value: jimokText
       });

	   var object = {};
	   for (var i = 0; i < formSerializeArray.length; i++){
	       object[formSerializeArray[i]['name']] = formSerializeArray[i]['value'];
	   }
	   
	   var json = JSON.stringify(formSerializeArray);
	  
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
		//	sAjaxSources:"/land/songyu/menu01DataTableList",
		//	sServerMethod:"POST",
		ajax: {
			url: "/land/jisang/menu02_1DataTableList",
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
				d.comple_yn = params.comple_yn;
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
			{ data: "no", "orderable": false },//0
			{ data: "jisa", "defaultContent": "" },
			{ data: "address", "defaultContent": "" },
			{ data: "jasan_no", "defaultContent": "" },
			{ data: "jimok_text", "defaultContent": "" },
			{ data: "souja_name", "defaultContent": "" },//5
			{ data: "jijuk_area", "defaultContent": "" },
			{ data: "pyeonib_area", "defaultContent": "" },
			{ data: "chuideuk_date", "defaultContent": "" },
			{ data: "comple_yn", "defaultContent": "" },
			{ data: "deunggi_date", "defaultContent": "" },//10
			{ data: "account_yn", "defaultContent": "" },
			{ data: "idx" }
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
			{ targets: [9], width: "100px" }, //등기여부
			{ targets: [10], width: "200px" }, //등기일
			{ targets: [11], width: "100px" },
			{
				targets: [12]
				, width: "100px"
				, render: function(data, type, row, meta) {
					//console.log("x:", row.x, "y:", row.y);
					return `<button class="viewDetailButton" data-x="${row.x}" data-y="${row.y}">위치보기</button>`;
				}
			}, //지도보기
		]
	});


	table.on('click', 'tr', function() {
		var target = $(event.target);

		var isButtonCell = target.closest('td').index() === 12;

		if (isButtonCell) {
			event.stopPropagation(); // 버튼 클릭 시에는 동작하지 않도록 이벤트 전파 차단
			return;
		} else {
			// 다른 열을 클릭했을 때만 상세 페이지로 이동
			console.log("--------------tr click---------------------");

			var data = table.row(this).data();
			console.log(data);
			console.log(data.idx);

			var url = "/land/jisang/easementDetails?idx=" + data.idx;
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

// 위치보기 버튼에 대한 클릭 이벤트 처리
$('#userTable').on('click', '.viewDetailButton', function(event) {
    event.stopPropagation(); // 이벤트 전파 차단
    const row = table.row($(this).closest('tr')).data();
    onePositionView({ x: row.x, y: row.y });
});

$(document).on("click","#moveMap",function(){
	//openMapWindow();
//	mapWindow = window.open('', 'mapWindow', 'width=2000,height=1000');
	const x = $(this).attr('x')
	const y = $(this).attr('y')
	moveToCityHall(x,y);
})


/****************************************/
/****************************************/
//종섭작업
function jisaInfoCheck() {
	let jisaName = $("#loginJisa").val();	//hidden type으로 되있는값 (위치 :: menu02_1.html :: line-92 )
	
	if(jisaName != '') {
		$("#jisaNameDiv").text(jisaName);
		$("#jisaNameDiv").attr('disabled', true);
	} else {
		$("#jisaNameDiv").text('전체');
		$("#jisaNameDiv").attr('disabled', false);
	}
	
}


/****************************************/
/****************************************/