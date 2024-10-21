var table;
$(document).ready(function() {
	
	/*$('#jisa').niceSelect();*/
	//testAjax();
	//init_Table();
	var params={"SAVE_YEAR":"2024"}
	loadDataTable(params);
});




// 커스텀 selectbox

const createCustomLiRightCloseMng = () => {
    const contentItems = document.querySelectorAll('.selectContentArea');

    contentItems.forEach(contentItem => {
        if (contentItem.classList.contains('passedSelect')) {
            return ;
        }
        const notsetAddSelectBox = contentItem.querySelector('select');
        // select가 없으면 return
        if (!notsetAddSelectBox) return;

        const customSelectBox = contentItem.querySelector('.customSelectBox');
        const customSelectBtns = customSelectBox.querySelector('.customSelectBtns');

        for (let i = 0; i < notsetAddSelectBox.length; i++) {
            const optionValue = notsetAddSelectBox.options[i].value;
            const li = document.createElement('li');
            const button = document.createElement('button');
            button.classList.add('moreSelectBtn');
            button.type = 'button';
            button.textContent = optionValue;
            li.appendChild(button);
            customSelectBtns.appendChild(li);
        }

        // 중복 안되게 만들기
        const customSelectLi = customSelectBtns.querySelectorAll('li');

        if (customSelectLi.length>0) {
            contentItem.classList.add('passedSelect');
        }

    });
}
createCustomLiRightCloseMng();


const customSelectView = document.querySelectorAll('.customSelectView')

customSelectView.forEach((btn) => {
    btn.addEventListener('click', function () {
        btn.classList.toggle('active');

        if (btn.nextElementSibling) {
            btn.nextElementSibling.classList.toggle('active');

        }
    })
})




const moreBtnEventForRightCloseMng = () => {
    // customSelectBtns 리스트 click 했을 때 해당 내용으로 바뀌게하기


    const customSelectBtns = document.querySelectorAll('#rightCloseMng .customSelectBtns');

    
    customSelectBtns.forEach((btn) => {
        
        btn.addEventListener('click', function(event){
            if (event.target.classList.contains('moreSelectBtn')) {

                const moreBtn = event.target;

                var moreSelectBtnText = moreBtn.innerText;
                console.log(moreSelectBtnText);
                const parentMoreSelectBtn = moreBtn.closest('.customSelectBtns')
                const EditCustomViewBtn = parentMoreSelectBtn.previousElementSibling;

                while (EditCustomViewBtn.firstChild) {
                    EditCustomViewBtn.removeChild(EditCustomViewBtn.firstChild);
                }
                const textNode = document.createTextNode(moreSelectBtnText);
                EditCustomViewBtn.appendChild(textNode);

                EditCustomViewBtn.classList.remove('active')
                parentMoreSelectBtn.classList.remove('active')


                // 선택한 걸 select의 value값으로 변경하기

                const nearByContent = moreBtn.closest('.selectContentArea');
                const nearBySelectBox = nearByContent.querySelector('select');
                nearBySelectBox.value = moreBtn.textContent;
                console.log(`Selected value: ${nearBySelectBox.value}`);
            }
        })
    })
};

moreBtnEventForRightCloseMng();

// 현재 연도를 구하는 방법
const findYear = () => {
    const currentYear = new Date().getFullYear();
    console.log(currentYear);
    const yearBox = [];

    for (let x = 0; x<= 4 ; x++) {
        yearBox.push(currentYear - x);
    };
    console.log(yearBox);

    const yearboxSelectBox = document.getElementById('rightCloseMngSelectBox01_1');

    for (let z = 0 ; z<6 ; z++) {
        const yearOptuion = document.createElement('option');

        if (z == 0) {
            yearOptuion.textContent = '전체';
            yearOptuion.value = '';
        } else {            
            yearOptuion.textContent = yearBox[5-z]+'년';
            yearOptuion.value = yearBox[5-z];
        }

        yearboxSelectBox.appendChild(yearOptuion);
    }

    createCustomLiRightCloseMng();
}
findYear();

// 월을 구하는 방법

const findMonth = () => {
    const monthSelectBox = document.getElementById('rightCloseMngSelectBox01_2');

    for (let y = 0; y<= 12 ; y++) {
        const monthOption = document.createElement('option');

        if (y == 0) {
            monthOption.textContent = '전체';
            monthOption.value = '';
        } else {
            monthOption.textContent = y +'월' ;
            monthOption.value = y ;
        }

        monthSelectBox.appendChild(monthOption);
    }

    createCustomLiRightCloseMng();
}
findMonth();

// 마감처리 팝업


const rightCloseMngOffPopEvet = () => {

    const offBtn = document.querySelector("#rightCloseMng .offBtn");
    const rightCloseMngOffPopWrapper = document.querySelector(".rightCloseMngOffPopWrapper");
    let approvalFilePath = '/components/popuphtml/superficies_statistics_Popup/deadline_Popup.html'; // 마감처리

    if (offBtn) {

        let xhr = new XMLHttpRequest();
        xhr.open('GET', approvalFilePath, true);
        xhr.onreadystatechange = function () {
            if (xhr.readyState == 4 && xhr.status == 200) {
                rightCloseMngOffPopWrapper.innerHTML = xhr.responseText;
                runScriptsInElement(rightCloseMngOffPopWrapper); // 삽입된 html내 스크립트 실행 함수 호출
            }
        };
        xhr.send();
        console.log('rightCloseMngOffPopWrapper 작동');
        offBtn.addEventListener("click", () => {

            const popupOpen = document.getElementById("deadline_Popup");
            if (popupOpen) {

                popupOpen.classList.add("active");
            }

        })

        // 삽입된 html내 스크립트 실행 함수
        const runScriptsInElement = (element) => {
            const scripts = element.getElementsByTagName('script');
            for (let i = 0; i < scripts.length; i++) {
                const script = document.createElement('script');
                script.textContent = scripts[i].textContent;
                document.body.appendChild(script).parentNode.removeChild(script);
            }
        }


    }

}

rightCloseMngOffPopEvet();





$(document).on("click",".deadbtn",function(){
	
	console.log("-------------.deadbtn-----click-----------------"); 
	

	
	var year=$("#popupSelectBox01_1").val().replace('년', '').replace('선택', '');
	var month=$("#popupSelectBox01_2").val().replace('월', '').replace('선택', '');
	var date = $('#processDate').val();

	if (year == '') {
	    alert('기준 년도를 선택해 주세요.');
	    return;
	}
	if (month == '') {
	    alert('기준 월을 선택해 주세요.');
	    return;
	}
	if (date == '') {
	    alert('마감처리 일자를 선택해 주세요.');
	    return;
	}

	var params={"SAVE_YEAR":year,"SAVE_QUARTER":month, "PROCESS_DATE":date}
	//var params = {JISA: $("#rightStatusSelectBox01").val(),ADDRCODE:"",SGG:"", KIJUN:"", SIDO:""}
	console.log(params);
	//loadDataTable(params);
	//임시 저장 Go
		url = "/statics/deadlineProcess";
		
		$.ajax({

			url: url,
			type: 'POST',
			//contentType: "application/json",
			data: params,
			//dataType: "json",
			beforeSend: function(request) {
				console.log("beforesend ........................");
				loadingShow();
			},
			success: function(response) {
				loadingHide();
				console.log(response);
				if (response.success = "Y") {
					console.log("response.success Y");
					//console.log("response.resultData length:" + response.resultData.length);
					$("#save_status").val("TSAVE");
					alert("정상적으로 등록 되었습니다.");
					/*$("#popup_bg").show();
					$("#popup").show(500);
					//$("#addrPopupLayer tbody td").remove();
					for(var i=0;i<response.resultData.length;i++){
						$("#addrPopupTable tbody").append("<tr><td>"+response.resultData[i].juso+"</td><td><button>선택</button></td></tr>");
					}*/
				}
				else {
					console.log("response.success N");
				}
			},
			error: function(jqXHR, textStatus, errorThrown) {
				alert("finalBtn ajax error\n" + textStatus + ":" + errorThrown);
				return false;
			}

		});

})






$(document).on("click","#searchBtn",function(){
	
	var year=$("#rightCloseMngSelectBox01_1").val();
	var month=$("#rightCloseMngSelectBox01_2").val();
	
	var params={"SAVE_YEAR":year,"SAVE_QUARTER":month}
	console.log(params);
	loadDataTable(params);
})






function loadDataTable(params) {
	console.log("-----start loadDataTable----------");
	console.log(params);

	//var json=JSON.stringify(params);
	
	//지사정보
	let jisaCheck = $("#loginJisa").val();

	table = $('#userTable').DataTable({
		/*fixedColumns: {
			start: 3,
		},*/
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
			//$('.dt-title').html('<button style="float:right" class="dt-button buttons-excel button-html5" id="excelDownloadBtn">엑셀다운로드</button>');
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
		order: [[1, 'desc']],
		rowReorder: {
			dataSrc: 'b_seq'
		},
		//	sAjaxSources:"/land/songyu/menu01DataTableList",
		//	sServerMethod:"POST",
		ajax: {
			url: "/statics/selectStatisticsDeadlineListTableList",
			type: "POST",
			datatype: "json",
			data: function(d) {
				//d=params;
				d.jisa = ljsIsNull(jisaCheck) ? ljsIsNull(params.jisa) ? '' : params.jisa : jisaCheck;
				d.SAVE_YEAR=params.SAVE_YEAR;
				d.SAVE_QUARTER=params.SAVE_QUARTER;
				
				console.log(params);
				console.log("-----------d-----------");
				console.log(d);
			},
			dataSrc: function(json) {
				console.log("-------------json---------------");
				console.log(json);
				//$("#dataTableTotalCount").html(json.recordsTotal.toLocaleString());
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
			{ data: "save_year", "orderable": false },//0
			{ data: "save_quarter","orderable":false, "defaultContent": "" },
			{ data: "save_date"},
			{ data: "sayuji_y_y", "defaultContent": "" },
			{ data: "sayuji_y_n", "defaultContent": "" },
			{ data: "sayuji_n", "defaultContent": "" },//5
			{ data: "sayuji_total", "defaultContent": "" },
			{ data: "gukyuji_j", "defaultContent": "" },
			{ data: "gukyuji_y", "defaultContent": "" },
			{ data: "gukyuji_n", "defaultContent": "" },
			{ data: "gukyuji_total", "defaultContent": "" },//10
			
		],
		columnDefs: [

			{ "className": "dt-head-center", "targets": "_all" },
			{ className: 'dt-center', "targets": "_all" },
			{ targets: [0], width: "50px" },
			{ targets: [1], width: "30px" },
			{ targets: [2], width: "50px" }, //주소
			{ targets: [3], width: "50px" },
			{ targets: [4], width: "50px" },
			{ targets: [5], width: "50px" }, //소유자
			{ targets: [6], width: "50px" },
			{ targets: [7], width: "50px" },
			{ targets: [8], width: "50px" },
			{ targets: [9], width: "100px" }, //등기여부
			{ targets: [10], width: "100px" }, //등기일
		
			{
				targets: [11]
				, width: "100px"
				, render: function(data, type, row, meta) {
					console.log(row);
					return "<button class=\"downloadBtn\" onclick=\"window.open('http://localhost:8081/land/common/downloadfile?"
											    + "filePath=" + row.file_path 
											    + "&fileName=" + row.file_name 
											    + "&fileJisangNo="
											    + "&fileSeq=" + row.seq
											    + "&fileGubun=statistics', '_blank')\">다운로드 <span class=\"downloadIcon\"></span></button>"
					//return ` <button class="downloadBtn" id="dowloadExcelBtn">다운로드</button>`;
					//return ""
				}
			}, //지도보기
		]
	});

	}
	/*table.on('click', 'tr', function() {
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

	});*/
	
	
	$(document).on("click","#dowloadExcelBtn",function(){
		
		var data = table.row(this).data();
					console.log(data);
		
	})
	
	
	
	
	$(document).on("click","#excelDownloadBtn",function(){
			console.log("권리확보현황 엑셀 다운로드 ");
			
			
			var year=$("#rightCloseMngSelectBox01_1").val();
				var month=$("#rightCloseMngSelectBox01_2").val();
				
				var params={"SAVE_YEAR":year,"SAVE_QUARTER":month}
			
			

			         	

			
			var allData={"excel":""};
			$.ajax({
					url: "/statics/rightCloseExcelDownload",  // PNU 기준으로 데이터를 가져오는 API
					data: JSON.stringify(params),
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
						      var fileName = params.SAVE_YEAR+'년_'+params.SAVE_QUARTER+"_"+ unixTime + '.xlsx';  // 파일명 생성
				          // 엑셀 파일 다운로드
				          workbook.xlsx.writeBuffer().then(function (buffer) {
				              var blob = new Blob([buffer], { type: 'application/octet-stream' });
				              var link = document.createElement('a');
				              link.href = URL.createObjectURL(blob);
				              link.download = fileName;
				              link.click();
				          });
						
						
						
					},
					error: function(jqXHR, textStatus, errorThrown) {
						console.error("Error: ", textStatus, errorThrown);
					}
				});
		})
	