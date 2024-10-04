    
var table;
     
$(document).ready(function() {
  console.log("jisang/menu02_5.js start");
  /*$('#jisa').niceSelect();*/
//testAjax();
//init_Table();
loadDataTable("");
//MergeGridCells();
//SummerizeTable('#userTable');
//MergeGridCells1('userTable',[1]);
});




//조회하기 클릭시 상단 정보 출력 (현재는 지사 부분만 추가하였음 ... 다 불수 있게 추가해주세요)
$(document).on("click","#searchBtn",function(){
       console.log($("#menuHiddenSelectBox01_1").val());
	   console.log($("#searchForm").serialize());
	   
	   var formSerializeArray = $('#searchForm').serializeArray();
	   console.log(formSerializeArray)
       // 체크박스 값들을 조합하여 문자열로 만들기
  
      
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

$(document).on("change","#sido_nm",function(){
	console.log("----------start sido change -------------");
	$("#sido_nm").val($("#sidoText").text()).attr("selected","selected");
	if ($("#sido_nm").val()==null) return;
	var allData={"key":$("#sido_nm").val()}
					   console.log(allData);
					  $.ajax({

					    url: "/api/getSigunMaster",
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

					    url: "/api/getDongMaster",
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

					    url: "/api/getRiMaster",
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
		//        "serverSide":true,
		searching: false,
		destroy: true,
		//"aaSorting": [[0, 'asc']],
		//order:[[0,'desc']],
		//rowsGroup: [9],
		rowReorder: {
			dataSrc: 'b_seq'
		},
		//	sAjaxSources:"/songyu/menu01DataTableList",
		//	sServerMethod:"POST",
		ajax: {
			url: "/land/jisang/menu02_5DataTableList",
			type: "POST",
			datatype: "json",
			data: function(d) {
				//d=params;

				d.jisa = ljsIsNull(params.jisa) ? '' : params.jisa;
				d.status = ljsIsNull(params.status) ? '' : params.status;
				d.jibun = ljsIsNull(params.jibun) ? '' : params.jibun;

				var ask = (params.askMenu01 == undefined || params.askMenu01 == null) ? '0' : params.askMenu01;
				console.log("askmenu:" + ask);


				if (ask == "0") {
					console.log("---------3--------------");
					d.saddr = (params.addressFull == undefined || params.addressFull == null) ? '' : params.addressFull;
				}
				else {
					console.log("----------------------------1--------------");
					d.sido_nm = params.sido_nm;
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
				//table.rowsgroup.update();
				return json.data;
			}
		},
		initComplete: function() {

			console.log(this.api().data().length);

		},
		drwaCallback: function(settings) {
			console.log("--------------데이터가 로드되고 테이블이 다시 그려졌습니다.----------------");

			MergeGridCells1("userTable", rCols);

		},
		//        "fnRowCallback": function( nRow, aData, iDisplayIndex, iDisplayIndexFull ) {
		//        //	console.log(aData);
		//        //table.rowsgroup.update();
		//            $('td:eq(0)', nRow).html(iDisplayIndexFull +1);
		//            return nRow;
		//        },

		columns: [
			{ data: "no", "orderable": false },//0
			{ data: "jisa", "defaultContent": "", name: "jisa" },
			{ data: "addr", "defaultContent": "" },
			{ data: "jasan_no", "defaultContent": "" },
			{ data: "jimok", "defaultContent": "" },
			{ data: "soyuja", "defaultContent": "" },//5
			{ data: "pmt_user", "defaultContent": "" },
			{ data: "use_purpos", "defaultContent": "" },
			{ data: "idx", "defaultContent": "" },
			{ data: "idx", "defaultContent": "" },
			{ data: "idx", "defaultContent": "" },//10
			{ data: "idx", },//0
			{ data: "idx", "defaultContent": "" },
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
			{
				targets: [8]
				, width: "200px"
				, render: function(data, type, row, meta) {
					var rtn = row.use_st_date + "~" + row.use_ed_date;
					return rtn;
				}
			},
			{ targets: [9], width: "100px" }, //등기여부
			{ targets: [10], width: "200px" }, //등기일
			{ targets: [11], width: "150px" },
			{
				targets: [12], width: "100px"
				, render: function(data, type, row, meta) {
					return "<button class='btnDesign'>위치보기</button> ";
				}
			},
			{
				targets: [13]
				, width: "100px"
				, render: function(data, type, row, meta) {

					return "<button class='btnDesign'>문서보기</button> ";
				}
			}, //지도보기


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

			var url = "/land/jisang/usePermitDetail?idx=" + data.idx;
			window.location = url;
		}

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
}


//JQuery DataTables 같은 데이터 합친다 -안먹힘
function MergeGridCells() {
    var dimension_cells = new Array();
    var dimension_col = null;
    var columnCount = $("#userTable tr:first th").length;
    for (dimension_col = 0; dimension_col < columnCount; dimension_col++) {
        // first_instance holds the first instance of identical td
        var first_instance = null;
        var rowspan = 1;
        // iterate through rows
        $("#userTable").find('tr').each(function () {

            // find the td of the correct column (determined by the dimension_col set above)
            var dimension_td = $(this).find('td:nth-child(' + dimension_col + ')');

            if (first_instance == null) {
                // must be the first row
                first_instance = dimension_td;
            } else if (dimension_td.text() == first_instance.text()) {
                // the current td is identical to the previous
                // remove the current td
                dimension_td.remove();
                ++rowspan;
                // increment the rowspan attribute of the first instance
                first_instance.attr('rowspan', rowspan);
            } else {
                // this cell is different from the last
                first_instance = dimension_td;
                rowspan = 1;
            }
        });
    }
}


function MergeGridCells1(TableID,rCols) {
	console.log("###############MergeGridCells1#########################");
  var dimension_cells = new Array();
  var dimension_col = null;
  for(Col in rCols) {
    dimension_col=rCols[Col];
    // first_instance holds the first instance of identical td
    var first_Hash="";
    var first_instance = null;
    var rowspan = 1;
    // iterate through rows
    $("#"+TableID+"> tbody > tr").children("td").attr('hidden', false);
    $("#"+TableID+"> tbody > tr").children("td").attr('rowspan', 1);
    $("#"+TableID).find('tr').each(function () {
      // find the td of the correct column (determined by the dimension_col set above)
      var dimension_td = $(this).find('td:nth-child(' + dimension_col + ')');
      var dim_Hash="";
      for(x=1;x<dimension_col;x++){
        dim_Hash+=$(this).find('td:nth-child(' + x + ')').text();
      }
      if (first_instance === null) {
          // must be the first row
          first_instance = dimension_td;
      } else if (dimension_td.text() === first_instance.text() && first_Hash === dim_Hash) {
          // the current td is identical to the previous AND the Hashes are as well
          // remove the current td
          // dimension_td.remove();
          dimension_td.attr('hidden', true);
          ++rowspan;
          // increment the rowspan attribute of the first instance
          first_instance.attr('rowspan', rowspan);
      } else {
          // this cell is different from the last
          first_instance = dimension_td;
          first_Hash = dim_Hash;
          rowspan = 1;
      }
    });
  }
}  

function SummerizeTable(table) {
  $(table).each(function() {
    $(table).find('td').each(function() {
      var $this = $(this);
      var col = $this.index();
      var html = $this.html();
      var row = $(this).parent()[0].rowIndex; 
      var span = 1;
      var cell_above = $($this.parent().prev().children()[col]);

      // look for cells one above another with the same text
      while (cell_above.html() === html) { // if the text is the same
        span += 1; // increase the span
        cell_above_old = cell_above; // store this cell
        cell_above = $(cell_above.parent().prev().children()[col]); // and go to the next cell above
      }

      // if there are at least two columns with the same value, 
      // set a new span to the first and hide the other
      if (span > 1) {
        // console.log(span);
        $(cell_above_old).attr('rowspan', span);
        $this.hide();
      }
      
    });
  });
}
