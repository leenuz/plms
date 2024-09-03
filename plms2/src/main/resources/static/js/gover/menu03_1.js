
var table;
     

$(document).ready(function() {
	console.log("gover/menu03_1.js start");
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
	console.log("object askMenu01:"+object.askMenu01);
	 
	loadDataTable(object);
	console.log("-----------------------");
})


$(document).on("change","#sido_nm",function(){
	console.log("----------start sido_nm change -------------");
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


function loadDataTable(params){
	console.log("-----start loadDataTable----------");
	console.log("Params:", params); // params 객체 출력

	//var json=JSON.stringify(params);

	table=$('#userTable').DataTable({
		fixedColumns:{
			start:3,
		},
		scrollCollapse:true,
		scrollX:true,
		scrollY:600,
		paging:true,
		"oLanguage":{"sLengthMenu":"_MENU_"},
		//dom: '<"dt-center-in-div"l>B<f>r>t<>p',
		dom:'<"top"<"dt-title">Bl><"dt-center-in-div"r><"bottom"tp><"clear">',
		buttons: [{extend:'excel',text:'엑셀 다운로드'}],
		pageLength: 20,
        bPaginate: true,
        bLengthChange: true,
        bInfo:false,
        lengthMenu : [ [ 10, 50, 100, -1 ], [ "10건","50건","100건", "All" ] ],
        bAutoWidth: false,
        processing: true,
        ordering: true,
        bServerSide: true,
        searching: false,
		destroy:true,
		order:[[12,'desc']],

        rowReorder:{
			dataSrc:'b_seq'
		},
		
		//	sAjaxSources:"/songyu/menu01DataTableList",
		//	sServerMethod:"POST",
        ajax : {
            url:"/gover/menu03_1DataTableList",
            type:"POST",
			datatype:"json",
			data: function(d){
				//d=params;
				d.jisa=ljsIsNull(params.jisa)?'':params.jisa;
				d.gover_no=params.gover_no;
				d.user_purpos=params.user_purpos;
				d.pmt_office=params.pmt_office;
				d.adm_office=ljsIsNull(params.adm_office)?'':params.adm_office;
				d.save_status=params.save_status;
               
                d.idx=params.idx;

				//주소
				var ask=(params.askMenu01==undefined || params.askMenu01==null)?'0':params.askMenu01;
				console.log("askmenu:"+ask);

				//입력형 주소 입력 시
				if (ask=="0") {
					console.log("---------3--------------");
					d.saddr=(params.addressFull==undefined || params.addressFull==null)?'':params.addressFull;
				}
				//선택형 주소 입력 시
				else{
					console.log("----------------------------1--------------");
					console.log(ljsIsNull(params.sgg));
					var addrs=params.sido_nm;
					console.log("addrs:"+addrs);
					if (ljsIsNull(params.sgg)) addrs=addrs+"";
					else addrs=addrs+" "+params.sgg;
					if (ljsIsNull(params.emd)) addrs=addrs+"";
					else addrs=addrs+" "+params.emd;
					if (ljsIsNull(params.ri)) addrs=addrs+"";
					else addrs=addrs+" "+params.ri;
					//var addrs=params.sido+" "+params.sgg+" "+params.emd+" "+(params.ri==null || params.ri=="undefined") ? '' : params.ri;
					//console.log("emd:"+ljsIsNull(params.emd)?'':params.emd);
					console.log("addrs:"+addrs);
					d.saddr=(addrs==undefined || addrs==null || addrs=="undefined")?'':addrs;
					//params.sido+" "+params.sgg+" "+ljsIsNull(params.emd)?'':params.emd;//+" "+ljsIsNull(params.ri)?'':params.ri+" "+ljsIsNull(params.jibun)?'':params.jibun;
				}

				console.log("saddr:"+d.saddr);
				console.log(params);
				console.log("-----------d-----------");
				console.log(d);
			},
			
			dataSrc: function(json){
				console.log("-------------json---------------");
				console.log(json);
				$("#dataTableTotalCount").html(json.recordsTotal);
				//$("div.dt-title").html('<div class="dataTitles"><h5>총 검색 건 수</h5></div>');
				return json.data;
			}

        },
		initComplete:function(){

			console.log(this.api().data().length );

		},
        /*"fnRowCallback": function( nRow, aData, iDisplayIndex, iDisplayIndexFull ) {
		//	console.log(aData);
			$('td:eq(0)', nRow).html(iDisplayIndexFull +1);
			return nRow;
		},*/

		columns : [
			{data: "no","orderable":false},//0
			{data: "jisa","defaultContent":""},
			{data: "address","defaultContent":""},
			{data: "gover_no","defaultContent":""},
			{data: "pmt_office","defaultContent":""}, 
			{data: "adm_office","defaultContent":""},//5
			{data: "idx","defaultContent":""},
			{data: "jimok_text","defaultContent":""},
			{data: "use_purpos","defaultContent":""},
			{data: "period","defaultContent":""},
			{data: "gover_length","defaultContent":""},//10
			{data: "gover_area","defaultContent":""},
			{data: "pay_date","defaultContent":""},
			{data: "pay_money","defaultContent":""},
			{data: "idx","defaultContent":""}
		],
  
		columnDefs:[
			{"className": "dt-head-center", "targets": "_all"},
			{className: 'dt-center',"targets": "_all"},
			{targets:[0],width:"50px"},
			{targets:[1],width:"150px"},
			{targets:[2],width:"400px"}, //주소
			{targets:[3],width:"150px"},
			{targets:[4],width:"100px"},
			{targets:[5],width:"200px"}, //관리기관
			{targets:[6],width:"150px"},
			{targets:[7],width:"150px"}, //지목
			{targets:[8],width:"200px"}, //점용구분
			{targets:[9],width:"100px"}, //점용기간
			{targets:[10],width:"200px"}, //연장
			{targets:[11],width:"100px"}, //면적
			{targets:[12],width:"100px"}, //납부일
			{targets:[13],width:"100px"}, //납부금액
			{targets:[14]
				,width:"100px"
				,render: function(data, type, row, meta) {
					return `<button class="viewDetailButton" id='moveMap' x=${row.x} y=${row.y}>위치보기</button> `;
				}
			}, //지도보기
		]
	});




	table.on('click','tr',function() {

		var target = $(event.target);

            var isButtonCell = target.closest('td').index() === 14 ;

            if (isButtonCell) {
                return;
            } else {
                // 다른 열을 클릭했을 때만 상세 페이지로 이동
                console.log("--------------tr click---------------------");

                var data = table.row(this).data();
                console.log(data);
                console.log(data.idx);

                var url = "/gover/masterEdit?idx=" + data.idx;
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

