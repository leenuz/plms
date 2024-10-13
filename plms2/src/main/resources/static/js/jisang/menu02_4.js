
var table;

$(document).ready(function() {
	console.log("jisang/menu02_4.js start");
	/*$('#jisa').niceSelect();*/
	//testAjax();
	//init_Table();
	commonJisaInfoCheck();
	loadDataTable("");
});

$(document).on("click",".finalBtn",function(){

	console.log($("#searchResultPopDiv").html());
	var targetDiv=$("#searchResultPopDiv").parent().find("#searchResultPopup").find(".popupWrap");
	//console.log($(targetDiv).html());
	$("#popupWrap").toggleClass("active");
});

$(document).on("click",".topCloseBtn",function(){

	console.log($("#searchResultPopDiv").html());
	var targetDiv=$("#searchResultPopDiv").parent().find("#searchResultPopup").find(".popupWrap");
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

//합필하기 클릭시 이벤트
$(document).on("click","#mergeBtn",function(){

	   var formSerializeArray = $('#searchForm').serializeArray();

       //체크 된 행 합필 하도록 전송
       // tbody 내의 체크된 체크박스들을 찾습니다.
       const checkedCheckboxes = document.querySelectorAll("#userTable input[type='checkbox']:checked");
       let queryParams = [];

       let repIdx = "";

       // 선택된 체크박스의 data-idx 값을 수집합니다.
       checkedCheckboxes.forEach((checkbox, index) => {
           const idxValue = checkbox.getAttribute("data-idx");
           const repIdxValue = checkbox.getAttribute("data-rep-idx");
           if(repIdxValue) repIdx = repIdxValue;
           queryParams.push(`idx${index + 1}=${idxValue}`);
       });

       // 선택된 인덱스 값을 확인
       console.log("Query parameters:", queryParams);

       url= "/land/jisang/landRightMerge?idx=";    //합필등록

       if (queryParams.length > 0) {
          // 매겨진 파라미터를 사용하여 쿼리 스트링 생성
          const queryString = queryParams.join('&');
          url = `/land/jisang/landRightMerge?${queryString}&tcount=${queryParams.length}`;
          if(repIdx) url += `&repIdx=${repIdx}`
          window.location = url;
      }
      else{
          alert('합필을 원하는 주소를 선택 하여 주세요.')
      }



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
					{targets:[1],width:"100px"},
					{targets:[2],width:"300px"},
				]
	});
}

function loadDataTable(params) {
	console.log("-----start loadDataTable----------");
	console.log(params);

	//var json=JSON.stringify(params);

	//지사정보
	let jisaCheck = $("#loginJisa").val();

	table = $('#userTable').DataTable({
		fixedColumns: {
			start: 4,
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
		order: [[14, 'desc']],
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
				d.toji_type = params.toji_type;
				d.toji_plan_type = params.toji_plan_type;
				d.right_overlap = params.OverlapCheck01;
				d.souja = params.souja;
				d.jasan_no = params.jasan_no;
				d.dosiplan = params.dosiplan;
				d.cancel_yn = params.cancel_yn;
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
					d.sgg = params.sgg;
					d.emd = params.emd;
					d.ri = params.ri;
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
			{
				render: function(data, type, row, meta) {
					return `<input type="checkbox" id="inquirecombCheck01" data-idx="${row.idx}" data-rep-idx="${row.rep_jisang_no}" data-merge-state="${row.merge_status}"/> <label for="inquirecombCheck01"></label>`;
				},
				"orderable": false
			},
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
				data: "jm_merge_rep_yn",
				render: function(data, type, row, meta) {
					//                              if(data === 'Y'){
					//                                 return `<button class="btnDesign positionPopBtn">지번보기</button>`;
					//                              }else{
					//                                 return ``;
					//                              }
					return `<button class="btnDesign positionPopBtn" >지번보기</button>`; //테스트를 위해서 버튼으로 남겨둠
				}
			},//해지여부
			{ data: "cancel_date" },//합필요청일
			{
				data: "idx",
				render: function(data, type, row, meta) {
					return `<button class="btnDesign viewDetailButton" id="mapBtn" data-x="${row.x}" data-y="${row.y}">위치보기</button>`;
				}
			},// 지도보기 데이터
			{
				data: "idx",
				render: function(data, type, row, meta) {
					return `<button class="btnDesign">문서보기</button> `;
				}
			}// ECHO 문서보기 수정필요
		],
		columnDefs: [
			{ "className": "dt-head-center", "targets": "_all" },
			{ className: 'dt-center', "targets": "_all" },
			{ targets: [0], width: "50px" },
			{ targets: [1], width: "50px" },
			{ targets: [2], width: "150px" },
			{ targets: [3], width: "400px" }, //주소
			{ targets: [4], width: "150px" },
			{ targets: [5], width: "100px" },
			{ targets: [6], width: "200px" }, //소유자
			{ targets: [7], width: "150px" },
			{ targets: [8], width: "150px" },
			{ targets: [9], width: "200px" },
			{ targets: [10], width: "200px" }, //등기일
			{ targets: [11], width: "150px" }, //폐세된 지번
			{ targets: [12], width: "200px" },//합필요청일
			{ targets: [13], width: "150px" }, // 위치보기
			{ targets: [14], width: "150px" }, // 문서보기
		],
		headerCallback: function(thead, data, start, end, display) { //순번 헤더에 스타일 적용
			$(thead).find('th').eq(1).css('background-color', '#f7f9fc'); // 스타일 추가
			$(thead).find('th').eq(1).css('border-top', '1px solid #cddbf0'); // 스타일 추가
			$(thead).find('th').eq(1).css('border-right', '1px solid #cddbf0'); // 스타일 추가
		}
	});

	table.on('click', 'tr', function() {
		var target = $(event.target);
		var data = table.row(this).data();
		var isButtonCell = target.closest('td').index() === 0 || target.closest('td').index() === 11 || target.closest('td').index() === 13 || target.closest('td').index() === 14;
		var url;

		if (isButtonCell) {
			if (target.closest('td').index() === 11) {
				// 지상권 해지등록 복붙한 코드라 수정 필요 - 폐쇄된 지번 - 지번 보기로 변경 필요
				const buttonClass = event.target.className;

				var clickData = {
					idx: data.idx
				};
				$.ajax({
					url: "/land/jisang/getJisangCancelListData",
					type: "POST",
					data: JSON.stringify(clickData),
				})
					.done(function(fragment) {
						console.log("##################");
						console.log(fragment);
						//runScriptsInElement(landRightSearchResultPop); // 삽입된 html내 스크립트 실행 함수 호출
						//console.log($("#searchResultPopDiv").html());
						$(".popContents li").remove();
						$('#searchResultsPopup').replaceWith(fragment);
						const popupOpen = document.querySelector("#searchResultsPopup .popupWrap");
						$(popupOpen).addClass("open");
						popupOpen.classList.add("active");
					});
			} else if (target.closest('td').index() === 13) {
				//지도보기 클릭
				event.stopPropagation(); // 버튼 클릭 시에는 동작하지 않도록 이벤트 전파 차단
				return;
			} else {
				// ECHO 문서보기 클릭
			}
		} else {
			url = "/land/jisang/easementDetails?idx=" + data.idx;
			console.log(url);
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

