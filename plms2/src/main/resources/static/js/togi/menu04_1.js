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
		initComplete: function() {
			console.log(this.api().data().length);
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
