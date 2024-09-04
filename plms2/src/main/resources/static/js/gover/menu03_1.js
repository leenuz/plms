
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
	console.log("object privateUseRadio01:"+object.privateUseRadio01);
	 
	loadDataTable(object);
	console.log("-----------------------");
})

// 주소 - 선택형 동작하도록 (id 값: sido_nm, sgg, emd, ri)
$(document).on("click", "#sido_ul li", function () {
    const selectedSido = $(this).text().trim();
    $("#sidoText").text(selectedSido);
    $("#sido_nm").val(selectedSido).change(); // change 이벤트 트리거
});

$(document).on("change", "#sido_nm", function () {
    console.log("----------start sido change -------------");
    const selectedSido = $("#sido_nm").val();
    if (!selectedSido) return;

    const allData = { key: selectedSido };
    console.log(allData);

    $.ajax({
        url: "/api/getSigunMaster",
        data: JSON.stringify(allData),
        async: true,
        type: "POST",
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        success: function (rt) {
            console.log(rt);
            const data = rt.resultData;

            $("#sggUl li").remove();
            $("#sgg option").remove();

            $("#sggUl").append("<li><p>전체</p></li>");
            $("#sgg").append("<option value=''>전체</option>");
            for (let i = 0; i < data.length; i++) {
                console.log(data[i].sm_gugun);
                $("#sggUl").append("<li><p>" + data[i].sm_gugun + "</p></li>");
                $("#sgg").append("<option>" + data[i].sm_gugun + "</option>");
            }
        },
        error: function (jqXHR, textStatus, errorThrown) {
            console.error("Error: ", textStatus, errorThrown);
        }
    });
});

$(document).on("click", "#sggUl li", function () {
    const selectedSgg = $(this).text().trim();
    $("#sggText").text(selectedSgg);
    $("#sgg").val(selectedSgg).change(); // change 이벤트 트리거
});

$(document).on("change", "#sgg", function () {
    console.log("----------start sgg change -------------");

    const allData = {
        gugunKey: $("#sgg option:selected").val() || "",
        sidoKey: $("#sidoText").text().trim()
    };
    console.log(allData);

    $.ajax({
        url: "/api/getDongMaster",
        data: JSON.stringify(allData),
        async: true,
        type: "POST",
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        success: function (rt) {
            console.log(rt);
            const data = rt.resultData;

            $("#emdUl li").remove();
            $("#emd option").remove();
            $("#emdUl").append("<li><p>전체</p></li>");
            $("#emd").append("<option value=''>전체</option>");
            for (let i = 0; i < data.length; i++) {
                console.log(data[i].bm_dong);
                $("#emdUl").append("<li><p>" + data[i].bm_dong + "</p></li>");
                $("#emd").append("<option>" + data[i].bm_dong + "</option>");
            }
        },
        error: function (jqXHR, textStatus, errorThrown) {
            console.error("Error: ", textStatus, errorThrown);
        }
    });
});

$(document).on("click", "#emdUl li", function () {
    const selectedEmd = $(this).text().trim();
    $("#emdText").text(selectedEmd);
    $("#emd").val(selectedEmd).change(); // change 이벤트 트리거
});

$(document).on("change", "#emd", function () {
    console.log("----------start emd change -------------");

    const allData = {
        dongKey: $("#emdText").text().trim(),
        gugunKey: $("#sggText").text().trim(),
        sidoKey: $("#sidoText").text().trim()
    };
    console.log(allData);

    $.ajax({
        url: "/api/getRiMaster",
        data: JSON.stringify(allData),
        async: true,
        type: "POST",
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        success: function (rt) {
            console.log(rt);
            const data = rt.resultData;

            $("#riUl li").remove();
            $("#ri option").remove();
            $("#riUl").append("<li><p>전체</p></li>");
            $("#ri").append("<option value=''>전체</option>");
            for (let i = 0; i < data.length; i++) {
                console.log(data[i].rm_ri);
                $("#riUl").append("<li><p>" + data[i].rm_ri + "</p></li>");
                $("#ri").append("<option>" + data[i].rm_ri + "</option>");
            }
        },
        error: function (jqXHR, textStatus, errorThrown) {
            console.error("Error: ", textStatus, errorThrown);
        }
    });
});

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
		pageLength: 50,
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
				var ask=(params.privateUseRadio01==undefined || params.privateUseRadio01==null)?'0':params.privateUseRadio01;
				console.log("privateUseRadio01:"+ask);

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
					if (ljsIsNull(params.jibun)) addrs=addrs+"";
					else addrs=addrs+" "+params.jibun;
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
