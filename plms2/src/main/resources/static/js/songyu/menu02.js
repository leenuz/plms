
var table;


$(document).ready(function() {
	console.log("songyu/menu02.js start");
	/*$('#jisa').niceSelect();*/
	//testAjax();
	//init_Table();
	loadDataTable("");

});

// 체크된 권리확보유형 보이기
//document.addEventListener('DOMContentLoaded', function () {
// const allCheckbox = document.getElementById('companylandCheckBox01');
//    const checkboxes = document.querySelectorAll('.checkBoxsContent input[type="checkbox"]');
//    const titleBtn = document.querySelector('#songyu_type');
//
// allCheckbox.addEventListener('change', function () {
//        const isChecked = allCheckbox.checked;
//        checkboxes.forEach(checkbox => {
//            checkbox.checked = isChecked;
//        });
//        updateTitle();
//    });
//       checkboxes.forEach(checkbox => {
//            checkbox.addEventListener('change', function () {
//                // 다른 체크박스가 체크되면 "전체" 체크박스를 해제
//                if (!checkbox.checked) {
//                    allCheckbox.checked = false;
//                } else {
//                    // 모든 다른 체크박스가 체크되면 "전체" 체크박스를 체크
//                    const allChecked = Array.from(checkboxes).every(cb => cb.checked);
//                    allCheckbox.checked = allChecked;
//                }
//                updateTitle();
//            });
//        });
//
//
//    function updateTitle() {
//        const selected = [];
//        checkboxes.forEach(checkbox => {
//            if (checkbox.checked) {
//                const label = checkbox.nextElementSibling.nextElementSibling;
//                selected.push(label.getAttribute('data-value'));
//            }
//        });
//
//        titleBtn.textContent = selected.length ? selected.join(', ') : '전체';
//    }
//});


//조회하기 클릭시 상단 정보 출력 (현재는 지사 부분만 추가하였음 ... 다 불수 있게 추가해주세요)
$(document).on("click", "#registerBtn", function() {
	console.log($("#searchForm").serialize());

	var formSerializeArray = $('#searchForm').serializeArray();
	//	   $('.checkBoxsContent input:checked').each(function() {
	//           formSerializeArray.push({
	//               name: $(this).attr('name'),
	//               value: $(this).next('label').siblings('p').data('value')
	//           });
	//       });
	var object = {};
	for (var i = 0; i < formSerializeArray.length; i++) {
		object[formSerializeArray[i]['name']] = formSerializeArray[i]['value'];
	}

	var json = JSON.stringify(formSerializeArray);

	//	  console.log("----------jsonobj------------");
	//	  console.log(json);
	//	  console.log("object askMenu01:"+object.askMenu01);

	loadDataTable(object);
	//	   console.log("-----------------------");

})


// 시도 선택 시
$(document).on("change", "#sido", function() {
	//	console.log("----------start sido change -------------");
	$("#sido").val($("#sidoText").text()).attr("selected", "selected");
	var allData = { "key": $("#sido").val() }
	//					   console.log(allData);
	$.ajax({

		url: "/land/api/getSigunMaster",
		data: JSON.stringify(allData),
		async: true,
		type: "POST",
		dataType: "json",
		contentType: 'application/json; charset=utf-8',
		success: function(rt, jqXHR) {
			//					      console.log(rt);
			var data = rt.resultData;

			$("#sggUl li").remove();
			$("#sgg option").remove();

			$("#sggUl").append("<li><p>전체</p></li>");
			$("#sgg").append("<option value=''>전체</option>");
			for (var i = 0; i < data.length; i++) {
				//							console.log(data[i].sgg_nm);
				$("#sggUl").append("<li><p>" + data[i].sm_gugun + "</p></li>");
				$("#sgg").append("<option>" + data[i].sm_gugun + "</option>");
			}

			//						  console.log("sido:"+$("#sido").val());
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

			//					      console.log(jqXHR);
			//					      console.log(jqXHR.readyState);
			//					      console.log(jqXHR.responseText);
			//					      console.log(jqXHR.responseJSON);
		}
	}) //end ajax 
})


$(document).on("change", "#sgg", function() {
	//	console.log("----------start sgg change -------------");

	var allData = { "gugunKey": ljsIsNull($("#sgg option:selected").val()) ? '' : $("#sgg option:selected").val(), "sidoKey": $("#sidoText").text() }
	//					   console.log(allData);
	$.ajax({

		url: "/land/api/getDongMaster",
		data: JSON.stringify(allData),
		async: true,
		type: "POST",
		dataType: "json",
		contentType: 'application/json; charset=utf-8',
		success: function(rt, jqXHR) {
			//					      console.log(rt);
			var data = rt.resultData;
			$("#emdUl li").remove();
			$("#emd option").remove();
			$("#emdUl").append("<li><p>전체</p></li>");
			$("#emd").append("<option value=''>전체</option>");
			for (var i = 0; i < data.length; i++) {
				//							console.log(data[i].bm_dong);
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

			//					      console.log(jqXHR);
			//					      console.log(jqXHR.readyState);
			//					      console.log(jqXHR.responseText);
			//					      console.log(jqXHR.responseJSON);

		}
	}) //end ajax 
})


$(document).on("change", "#emd", function() {
	//	console.log("----------start emd change -------------");
	$("#sido").val($("#sidoText").text()).attr("selected", "selected");
	$("#sgg").val($("#sggText").text()).attr("selected", "selected");
	$("#emd").val($("#emdText").text()).attr("selected", "selected");
	var allData = { "dongKey": $("#emdText").text(), "gugunKey": $("#sggText").text(), "sidoKey": $("#sidoText").text() }
	//					   console.log(allData);
	$.ajax({
		url: "/land/api/getRiMaster",
		data: JSON.stringify(allData),
		async: true,
		type: "POST",
		dataType: "json",
		contentType: 'application/json; charset=utf-8',
		success: function(rt, jqXHR) {
			//					      console.log(rt);
			var data = rt.resultData;
			$("#riUl li").remove();
			$("#ri option").remove();
			$("#riUl").append("<li><p>전체</p></li>");
			$("#ri").append("<option value=''>전체</option>");
			for (var i = 0; i < data.length; i++) {
				//							console.log(data[i].bm_dong);
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

			//					      console.log(jqXHR);
			//					      console.log(jqXHR.readyState);
			//					      console.log(jqXHR.responseText);
			//					      console.log(jqXHR.responseJSON);
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
	console.log("***************params***************");
	console.log(params);
	//var json=JSON.stringify(params);

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
		rowReorder: {
			dataSrc: 'b_seq'
		},
		//	sAjaxSources:"/land/songyu/menu01DataTableList",
		//	sServerMethod:"POST",
		ajax: {
			url: "/land/songyu/menu02DataTableList",
			type: "POST",
			datatype: "json",
			data: function(d) {
				//d=params;
				d.jisa = ljsIsNull(params.jisa) ? '' : params.jisa; // 지사
				if (params.toji_type == "국유지") { // 토지유형
					d.toji_type = "Y";
				} else if (params.toji_type == "사유지") {
					d.toji_type = "N";
				} else d.toji_type = "";
				
				var right_type = "";
				if (params.songyu_type_all != undefined && params.songyu_type_all != null) right_type = "";
				else {
					if (params.songyu_type_gover != undefined && params.songyu_type_gover != null) right_type += ",gover";
					if (params.songyu_type_jisang != undefined && params.songyu_type_jisang != null) right_type += ",jisang";
					if (params.songyu_type_notset != undefined && params.songyu_type_notset != null) right_type += ",notset";
					if (params.songyu_type_toji != undefined && params.songyu_type_toji != null) right_type += ",dopco";
				}
				d.right_type = right_type.substr(1); // 권리확보유형
				
				var ask = (params.askMenu01 == undefined || params.askMenu01 == null) ? '0' : params.askMenu01;
				if (ask == "0") {
					console.log("---------3--------------");
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
				//						console.log("saddr:"+d.saddr);
				//						console.log(params);
				console.log("-----------d-----------");
				console.log(d);
			},
			dataSrc: function(json) {
				//						console.log("-------------json---------------");
				console.log(json);
				$("#dataTableTotalCount").html(json.recordsTotal);
				//						$("div.dt-title").html('<div class="dataTitles"><h5>총 검색 건 수</h5></div>');
				return json.data;
			}
		},
		initComplete: function() {
			//					console.log(this.api().data().length );
		},
		columns: [
			{ data: "no", "orderable": false }, // 0. 순번
			{ data: "jisa" }, // 1. 담당지사
			{ data: "address" }, //2. 주소
			{ data: "pipe_yn", "defaultContent": "" }, //3. 관로저촉
			{ data: "pipe_meter", "defaultContent": "" }, //4. 관경
			{ data: "jimok_text", "defaultContent": "" }, //5. 지목
			{ data: "souja_name", "defaultContent": "" }, //6. 소유자
			{ data: "jijuk_area", "defaultContent": "" }, //7. 면적
			{ data: "toji_type", "defaultContent": "" }, //8. 토지유형
			{ data: "jisang_status" }, //9. 권리확보
			{ data: "jasan_no" }, //10. 자산번호
			{ data: "master_no" }, //11. 관리번호
			{ data: "jisang_comple_yn" }, //12. 등기여부
			{ data: "permitted_yn" }, //13. 계약유형
			{ data: "chuideuk_date" }, //14. 취득일
			{ data: "gover_date" }, //15 . 점용기간
			{ data: "pay_date" }, //16. 점용납부일
			{ data: "gover_area" }, //17. 설정면적
			{ data: "gover_length" }, //18. 설정연장
			{ data: "jasan_money" }, //19. 자산금액
			{ data: "pay_money" }, //20. 납부금액
			{ data: "registed_yn" }, //21. 등기/점용 여부
			{ data: "permitted_yn" }, //22. 계약 허가 여부
			{ data: "code_depth1_name" }, //23. 이슈유형대분류
			{ data: "code_depth2_name" }, //24. 이슈유형중분류
			{ data: "code_depth3_name" } //25. 이슈유형세분류
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
		//										       console.log(data);
		console.log("***************** " + data.idx);

		if (data.idx.substring(0, 1) == "J") { //지상권
			console.log("jisang");
			url = "/land/jisang/groundDetail?idx=" + data.idx + "&index=" + data.index;
		}
		else if (data.idx.substring(0, 1) == "G") { //점용
			url = "/land/gover/occupationDetails?idx=" + data.idx + "&index=" + data.index + "&gidx=" + data.gidx;;
		}
		else if (data.idx.substring(0, 1) == "N") { //미설정
			url = "/land/notset/unsetOccupationDetails?idx=" + data.idx + "&index=" + data.index;

		} else if (data.idx.substring(0, 1) == "T") { //토지
			url = "/land/toji/tojiDetails?idx=" + data.idx + "&index=" + data.index;
		}
		else return;
		window.location = url;
	});

}

