var table;
     
$(document).ready(function() {
  console.log("gover/menu03_3.js start");
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
	  console.log("object askMenu01:"+object.privateUseRadio02); 
	  
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

function loadDataTable(params) {
    console.log("-----start loadDataTable----------");
    console.log("Params:", params); // params 객체 출력

    table = $('#userTable').DataTable({
        fixedColumns: { start: 3 },
        scrollCollapse: true,
        scrollX: true,
        scrollY: 600,
        paging: true,
        "oLanguage": { "sLengthMenu": "_MENU_" },
        dom: '<"top"<"dt-title">Bl><"dt-center-in-div"r><"bottom"tp><"clear">',
        buttons: [{ extend: 'excel', text: '엑셀 다운로드' }],
        pageLength: 50,
        bPaginate: true,
        bLengthChange: true,
        bInfo: false,
        lengthMenu: [[10, 50, 100, -1], ["10건", "50건", "100건", "All"]],
        bAutoWidth: false,
        processing: true,
        ordering: true,
        bServerSide: true,
        searching: false,
        destroy: true,
        order: [[12, 'desc']],
        rowReorder: { dataSrc: 'b_seq' },
        ajax: {
            url: "/gover/menu03_3DataTableList",
            type: "POST",
            datatype: "json",
            data: function(d) {
                d.jisa = ljsIsNull(params.jisa) ? '' : params.jisa;
                d.gover_no = params.gover_no;
                d.use_purpos = params.use_purpos;
                d.pmt_office = params.pmt_office;
                d.adm_office = ljsIsNull(params.adm_office) ? '' : params.adm_office;
				d.cancel_yn = params.cancel_yn;
				d.pay_date_start = params.pay_date_start;
				d.pay_date_end = params.pay_date_end;
                d.idx = params.idx;

                // 주소
                var ask = (params.privateUseRadio03 == undefined || params.privateUseRadio03 == null) ? '0' : params.privateUseRadio03;
                console.log("privateUseRadio03:" + ask);

                // 입력형 주소 입력 시
                if (ask == "0") {
                    d.saddr = (params.addressFull == undefined || params.addressFull == null) ? '' : params.addressFull;
                }
                // 선택형 주소 입력 시
                else {
                    var addrs = params.sido_nm || '';
                    if (!ljsIsNull(params.sgg_nm)) addrs += " " + params.sgg_nm;
                    if (!ljsIsNull(params.emd_nm)) addrs += " " + params.emd_nm;
                    if (!ljsIsNull(params.ri_nm)) addrs += " " + params.ri_nm;
                    d.saddr = (addrs == undefined || addrs == null || addrs == "undefined") ? '' : addrs;
                }
                console.log("saddr:" + d.saddr);
            },
            dataSrc: function(json) {
                console.log("-------------json---------------");
                console.log(json);
                $("#dataTableTotalCount").html(json.recordsTotal);
                return json.data;
            }
        },
        columns: [
            { data: "no", "orderable": false },
            { data: "jisa", "defaultContent": "" },
            { data: "address", "defaultContent": "" },
            { data: "gover_no", "defaultContent": "" },
			{ data: "필지수", "defaultContent": "" },
			{ data: "jimok_text", "defaultContent": "" },
			{ data: "use_purpos", "defaultContent": "" },
			{ data: "period", "defaultContent": "" },
			{ data: "gover_length", "defaultContent": "" },
			{ data: "gover_area", "defaultContent": "" },
            { data: "pmt_office", "defaultContent": "" },
            { data: "adm_office", "defaultContent": "" },
			{ data: "pay_date", "defaultContent": "" },
			{ data: "pay_money", "defaultContent": "" },
			{ data: "cancel_yn", "defaultContent": "" },
			{ data: "cancel_date", "defaultContent": "" },
            {
                data: "idx", "defaultContent": "",
                render: function(data, type, row, meta) {
                    return `<button class="viewDetailButton" id='moveMap' x=${row.x} y=${row.y}>위치보기</button> `;
                }
            },
			{ data: "echo_no", "defaultContent": "" }
        ],
        columnDefs: [
            { "className": "dt-head-center", "targets": "_all" },
            { className: 'dt-center', "targets": "_all" },
            { targets: [0], width: "50px" },
            { targets: [1], width: "150px" },
            { targets: [2], width: "400px" },
            { targets: [3], width: "150px" },
            { targets: [4], width: "100px" },
            { targets: [5], width: "200px" },
            { targets: [6], width: "150px" },
            { targets: [7], width: "150px" },
            { targets: [8], width: "200px" },
            { targets: [9], width: "100px" },
            { targets: [10], width: "200px" },
            { targets: [11], width: "100px" },
            { targets: [12], width: "100px" },
            { targets: [13], width: "100px" },
            { targets: [14], width: "100px" },
			{ targets: [15], width: "100px" },
			{ targets: [16], width: "100px" },
			{ targets: [17], width: "100px" },
        ]
    });

    table.on('click', 'tr', function(event) {
        var target = $(event.target);
        var isButtonCell = target.closest('td').index() === 16;

        if (isButtonCell) {
            return;
        } else {
            var data = table.row(this).data();
            console.log(data);
            console.log(data.idx);

            var url = "/gover/useDetail?idx=" + data.idx;
            window.location = url;
        }
    });
}


$(document).on("click","#moveMap",function(){
	//openMapWindow();
//	mapWindow = window.open('', 'mapWindow', 'width=2000,height=1000');
	const x = $(this).attr('x')
	const y = $(this).attr('y')
	moveToCityHall(x,y);
})

function moveToCityHall(x,y) {
		console.log("--------moveToCityHall-------------");
		//console.log(sessionStorage.getItem("2pmsMap"));
		//var mapW=window.mapWindow;
		//console.log(window.name);
		//var mapW=window.name;
	if (mapWindow) {
	    var cityHallCoords = {};

        if(x != 'null' && y != 'null'){
//            cityHallCoords = { lon: 126.9779692, lat: 37.566535, zoom: 16 }; //테스트를 위해 임시로 넣어둠
            cityHallCoords = { lon: y, lat: x, zoom: 16 };
            mapWindow.postMessage(cityHallCoords, '*'); // 모든 출처에 메시지 전송
        }
        else{
            alert("해당 위치에 대한 좌표가 없습니다.");
        }
		//mapWindow.postMessage(cityHallCoords, 'http://10.168.0.247:8080/'); // 특정 사이트에 전송

	} else {
	    alert("지도가 열려 있지 않습니다.");
	/* 	mapWindow = window.open('http://10.168.0.247:8080/', 'mapWindow', 'width=2000,height=1000');
		var cityHallCoords = { lon: 126.9779692, lat: 37.566535, zoom: 16 };
		//mapWindow.postMessage(cityHallCoords, 'http://10.168.0.247:8080/'); // 특정 사이트에 전송
		mapWindow.postMessage(cityHallCoords, '*'); // 모든 출처에 메시지 전송 */
	}
}
