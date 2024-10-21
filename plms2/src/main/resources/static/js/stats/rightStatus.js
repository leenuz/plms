// 커스텀 selectbox

const createCustomLiRightStatus = () => {
    const contentItems = document.querySelectorAll('.selectContentArea');

    contentItems.forEach(contentItem => {
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

        contentItem.classList.add('passedSelect');
    });
}
createCustomLiRightStatus();


const customSelectView = document.querySelectorAll('.customSelectView')

customSelectView.forEach((btn) => {
    btn.addEventListener('click', function () {
        btn.classList.toggle('active');

        if (btn.nextElementSibling) {
            btn.nextElementSibling.classList.toggle('active');

        }
    })
})




const moreBtnEventForRightStatus = () => {
    // customSelectBtns 리스트 click 했을 때 해당 내용으로 바뀌게하기

    const MoreSelectBtn = document.querySelectorAll('.moreSelectBtn')

    MoreSelectBtn.forEach((moreBtn) => {
        moreBtn.addEventListener('click', function () {
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
        })
    });
};

moreBtnEventForRightStatus();

// 마감 팝업


//기본 실행
$(function(){
    $('#rightStatus .searchBtn').click(function() {
        loadData();
    });

    loadData();
});

// 숫자에 쉼표 추가하고 문자열로 변환하는 함수
function formatNumberWithComma(number) {
    return number.toLocaleString() + " 건";
}


 
const loadData = () => {
    var params = {JISA: $("#rightStatusSelectBox01").val(),ADDRCODE:"",SGG:"", KIJUN:"", SIDO:""}
	console.log(params);
	$.ajax({
		url:  "/statics/selectTogiMgtStateList",
		type: 'POST',
		contentType: "application/json",
		data: JSON.stringify(params),
		dataType: "json",
		beforeSend: function(request) {
			console.log("beforesend ........................");
			loadingShow();
		},
		success: function(response) {
			loadingHide();
            console.log(response);
            if(response!= null && response.code == 'Y'){
                const result = response.result;
                if(result != null && result != undefined){
                    //사유지
                    const sayuji_yy = parseInt(result.SAYUJI_Y_Y, 0);
                    const sayuji_yn = parseInt(result.SAYUJI_Y_N, 0);
                    const sayuji_n = parseInt(result.SAYUJI_N, 0);
                    const sayuji_sum = sayuji_yy + sayuji_yn + sayuji_n;
                    $("#SAYUJI_Y_Y").text(formatNumberWithComma(sayuji_yy));
                    $("#SAYUJI_Y_N").text(formatNumberWithComma(sayuji_yn));
                    $("#SAYUJI_N").text(formatNumberWithComma(sayuji_n));
                    $("#SAYUJI_SUM").text(formatNumberWithComma(sayuji_sum));
                    initSAYUJIChart(sayuji_yy, sayuji_yn, sayuji_n, sayuji_sum);
                    //국유지
                    const gukyuji_y = parseInt(result.GUKYUJI_Y, 0);
                    const gukyuji_j = parseInt(result.GUKYUJI_J, 0);
                    const gukyuji_n = parseInt(result.GUKYUJI_N, 0);
                    const gukyuji_sum = gukyuji_j + gukyuji_y + gukyuji_n;
                    $("#GUKYUJI_J").text(formatNumberWithComma(gukyuji_j));
                    $("#GUKYUJI_Y").text(formatNumberWithComma(gukyuji_y));
                    $("#GUKYUJI_N").text(formatNumberWithComma(gukyuji_n));
                    $("#GUKYUJI_SUM").text(formatNumberWithComma(gukyuji_sum));
                    initGUKYUJIChart(gukyuji_j, gukyuji_y, gukyuji_n, gukyuji_sum);
                    //이슈
                    const data = result.issueList;
                    const issue01Cnt = data.filter(item => item.type === "ISSUE" && item.gubun === "D")[0]?.cnt || 0;
                    const issue02Cnt = data.filter(item => item.type === "MINWON" && item.gubun === "D")[0]?.cnt || 0;
                    const issue03Cnt = data.filter(item => item.type === "ISSUE" && item.gubun === "G")[0]?.cnt || 0;
                    // 나머지 데이터 필터링 (위 조건에 맞지 않는 데이터)
                    const issue04Cnt = data.filter(item => 
                        !(
                            (item.type === "ISSUE" && item.gubun === "D") || 
                            (item.type === "MINWON" && item.gubun === "D") || 
                            (item.type === "ISSUE" && item.gubun === "G")
                        )
                    )[0]?.cnt || 0;  // 첫 번째 cnt 값만 추출, 없으면 null

                    $("#issueList_01").text(issue01Cnt);
                    $("#issueList_02").text(issue02Cnt);
                    $("#issueList_03").text(issue03Cnt);
                    $("#issueList_04").text(issue04Cnt);
                }else{
                    console.log("result null");
                }
            }else{
                console.log("response error");
            }
		},
		error: function(jqXHR, textStatus, errorThrown) {
            loadingHide();
			console.log(jqXHR);
			console.log(jqXHR.readyState);
			console.log(jqXHR.responseText);
			console.log(jqXHR.responseJSON);
		}
	});
};


// 사유지 차트
function initSAYUJIChart(yy, yn, n, sum) {
	Highcharts.chart("SAYUJI_Chart", {
		chart: {
			type: 'pie',
		},
		title: {
			text: '사유지' // 차트 제목
		},
		credits: {
			enabled: false // Highcharts 로고 제거
		},
        tooltip: {
            pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'  // 툴팁 포맷
        },
        accessibility: {
            point: {
                valueSuffix: '%'  // 접근성 옵션
            }
        },
        plotOptions: {
            pie: {
                allowPointSelect: true,  // 포인트 선택 가능 여부
                cursor: 'pointer',       // 커서 모양 변경
                dataLabels: {
                    enabled: true,       // 데이터 레이블 표시 여부
                    format: '<b>{point.name}</b><br>{point.percentage:.1f} %'  // 데이터 레이블 포맷
                }
            }
        },
        colors: ['#ACC4FF', '#2B7DE1', '#31394C'],
        series: [{
            name: '사유지',
            colorByPoint: true,
            data:  [
                { name: '자산등록(등기)', y: (yy/sum) * 100 },
                { name: '자산등록(미등기)', y: (yn/sum) * 100 },
                { name: '자산 미등록', y: (n/sum) * 100 }
            ]  // 데이터
        }]
	});
}

// 사유지 차트
function initGUKYUJIChart(j, y, n, sum) {
	Highcharts.chart("GUKYUJI_Chart", {
		chart: {
			type: 'pie' 
		},
		title: {
			text: '국유지' // 차트 제목
		},
		credits: {
			enabled: false // Highcharts 로고 제거
		},
        tooltip: {
            pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'  // 툴팁 포맷
        },
        accessibility: {
            point: {
                valueSuffix: '%'  // 접근성 옵션
            }
        },
        plotOptions: {
            pie: {
                allowPointSelect: true,  // 포인트 선택 가능 여부
                cursor: 'pointer',       // 커서 모양 변경
                dataLabels: {
                    enabled: true,       // 데이터 레이블 표시 여부
                    format: '<b>{point.name}</b><br>{point.percentage:.1f} %'  // 데이터 레이블 포맷
                }
            }
        },
        colors: ['#AFC2D9', '#43C8A0', '#FF6943'],
        series: [{
            name: '국유지',
            colorByPoint: true,
            data:  [
                { name: '점용', y: (y/sum) * 100 },
                { name: '지상권', y: (j/sum) * 100 },
                { name: '미점용', y: (n/sum) * 100 }
            ]  // 데이터
        }]
	});
}



$(document).on("click","#excelDownTogiBtn",function(){
	
		var jisa=$("#jisaText").text();
		if (jisa=="전체") jisa="";
		else jisa=jisa;
		var allData={"jisa":jisa,"gubun":"0"};
		console.log(allData);
		
		$.ajax({
				url: "/statics/TogiMgtStateExcelDownloadNew",  // PNU 기준으로 데이터를 가져오는 API
				data: JSON.stringify(allData),
				async: true,
				type: "POST",
				dataType: "json",
				contentType: "application/json; charset=utf-8",
				success: function(rt) {
					const data = rt.result;
					console.log(data); // 서버에서 받아온 데이터 확인
					var dataArr=[];
					/*var head=['순번','담당지사','관로저촉','관경','시도','시군구','읍면동','리','지번','지목','소유자','면적','토지유형','권리확보','자산번호'
					 ,'등기여부','겨약유형','취득일','점용기간','점용납부일','설정면적','설정연장','자산금액','납부금액'
					 ,'PNU','등기/점용여부','계약/허가여부','이슈유형대분류','이슈유형중분류','이슈유형세분류','허가증보유여부','영구무상점유','소액미청구','점용료선납','선납기한'];*/
					/* dataArr.push(head);	*/
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
						
						
						var rowArr=[data[i].no,data[i].sido_nm,data[i].sgg_nm,data[i].emd_nm,data[i].ri_nm,data[i].jibun,data[i].jijuk_area,data[i].jimok_text,'사',data[i].jisang_status,data[i].bigo,data[i].jasan_no,data[i].comple_yn,data[i].pipe_overlap_yn,data[i].pmt_no,data[i].dosiplan];
						dataArr.push(rowArr);	
					}
					console.log("--------------excel data------------------");
					console.log(dataArr);
					
					
					// ExcelJS 워크북과 워크시트 생성
					   var workbook = new ExcelJS.Workbook();
					   var worksheet = workbook.addWorksheet('Sheet1');


					   // 첫 번째 행의 병합된 셀 설정 (1행)
					   worksheet.mergeCells('A1:A2');  // 순번 병합
					   worksheet.mergeCells('B1:K1');  // 토지 기본 정보 병합
					   worksheet.mergeCells('L1:P1');  // 권리 확보 여부 병합

					   // 첫 번째 행의 셀 값 설정
					   worksheet.getCell('A1').value = '순번';
					   worksheet.getCell('B1').value = '토지 기본 정보';
					   worksheet.getCell('L1').value = '권리 확보 여부';

					   // 두 번째 행의 세부적인 열 제목 설정
					   worksheet.getRow(2).values = [
					       '순번', '시도', '시군구', '읍면동', '리', '지번', '면적', '지목', '토지유형', '지상권', '비고(지적변동사항)',
					       '자산분류번호', '등기완료여부', '관로일치여부', '점용허가번호', '도시계획'
					   ];

					   // 셀 스타일 정의 (폰트, 정렬, 테두리, 배경색)
					   const headerStyle = {
					       font: { bold: true },
					       alignment: { horizontal: 'center', vertical: 'middle' },
					       fill: { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFFF00' } },  // 노란색 배경
					       border: {
					           top: { style: 'thin' },
					           left: { style: 'thin' },
					           bottom: { style: 'thin' },
					           right: { style: 'thin' }
					       }
					   };

					   // 첫 번째 행과 두 번째 행에 스타일 적용
					   worksheet.getRow(1).eachCell((cell) => {
					       cell.style = headerStyle;
					   });
					   worksheet.getRow(2).eachCell((cell) => {
					       cell.style = headerStyle;
					   });

					   // 데이터 추가 (예시로 10개의 행을 추가)
					  /* var dataArr = [
					       [1, "서울지사", "A123", "M456", "서울특별시", "강남구", "삼성동", "리", "123-45", "대지", "100", "홍길동", "Y", "매매", "50", "2022-01-01", "2022-02-01", "Y", "PNU001"],
					       // 데이터 생략
					   ];*/

					   dataArr.forEach((row, index) => {
					       worksheet.addRow(row);
					   });
					   
					   

				 /* // 각 열의 데이터 길이에 따라 열 너비 설정
				    let columnLengths = new Array(headers.length).fill(10);  // 기본 길이 10

				    // 데이터와 헤더를 기반으로 최대 길이를 계산
				    worksheet.eachRow((row, rowNumber) => {
				        row.eachCell({ includeEmpty: true }, (cell, colNumber) => {
				            const cellValue = cell.value ? cell.value.toString() : '';
				            // 최대 길이를 계산하여 갱신
				            if (cellValue.length > columnLengths[colNumber - 1]) {
				                columnLengths[colNumber - 1] = cellValue.length;
				            }
				        });
				    });

				    // for문을 사용하여 각 열의 크기 설정
				    for (let i = 0; i < headers.length + 1; i++) {  // headers.length + 1: '순번'까지 포함
				        worksheet.getColumn(i + 1).width = columnLengths[i];
				    }  */
					
					// 셀 너비 설정
					   worksheet.columns = [
					       { width: 5 },  // 순번
					       { width: 20 },  // 담당지사
					       { width: 10 },  // 자산분류번호
					       { width: 20 },  // 관리번호
					       { width: 15 },  // 시도
					       { width: 20 },  // 시군구
					       { width: 15 },  // 읍면동
					       { width: 10 },  // 리
					       { width: 20 },  // 지번
					       { width: 15 },  // 지목
					       { width: 20 },  // 지적면적
					       { width: 20 },  // 소유자명
					       { width: 15 },  // 등기여부
					       { width: 15 },  // 계약유형
					       { width: 15 },  // 편입면적
					       { width: 20 },  // 취득일
					       { width: 20 },  // 등기일
						   { width: 20 },  // 사용승락여부
					       { width: 20 }   // PNU
					   ];
					   					  
					   

					   // 스타일을 각 데이터 셀에 적용
					   worksheet.eachRow((row, rowNumber) => {
					       if (rowNumber > 2) {  // 첫 번째와 두 번째 행은 헤더이므로 제외
					           row.eachCell({ includeEmpty: true }, (cell) => {
					               cell.alignment = { vertical: 'middle', horizontal: 'center' };
					               cell.border = {
					                   top: { style: 'thin' },
					                   left: { style: 'thin' },
					                   bottom: { style: 'thin' },
					                   right: { style: 'thin' }
					               };
					           });
					       }
					   });

					   // Unix time을 사용한 파일명 생성
					   var unixTime = Date.now();
					   var fileName = '사유지내역조회_' + unixTime + '.xlsx';

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




$(document).on("click","#excelDownGoverTogiBtn",function(){
	
		var jisa=$("#jisaText").text();
		if (jisa=="전체") jisa="";
		else jisa=jisa;
		var allData={"jisa":jisa,"gubun":"1"};
		console.log(allData);
		
		$.ajax({
				url: "/statics/TogiMgtStateExcelDownloadNew",  // PNU 기준으로 데이터를 가져오는 API
				data: JSON.stringify(allData),
				async: true,
				type: "POST",
				dataType: "json",
				contentType: "application/json; charset=utf-8",
				success: function(rt) {
					const data = rt.result;
					console.log(data); // 서버에서 받아온 데이터 확인
					var dataArr=[];
					/*var head=['순번','담당지사','관로저촉','관경','시도','시군구','읍면동','리','지번','지목','소유자','면적','토지유형','권리확보','자산번호'
					 ,'등기여부','겨약유형','취득일','점용기간','점용납부일','설정면적','설정연장','자산금액','납부금액'
					 ,'PNU','등기/점용여부','계약/허가여부','이슈유형대분류','이슈유형중분류','이슈유형세분류','허가증보유여부','영구무상점유','소액미청구','점용료선납','선납기한'];*/
					/* dataArr.push(head);	*/
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
						
						
						var rowArr=[data[i].no,data[i].sido_nm,data[i].sgg_nm,data[i].emd_nm,data[i].ri_nm,data[i].jibun,data[i].jijuk_area,data[i].jimok_text,'국',data[i].jisang_status,data[i].bigo,data[i].jasan_no,data[i].comple_yn,data[i].pipe_overlap_yn,data[i].pmt_no,data[i].dosiplan];
						dataArr.push(rowArr);	
					}
					console.log("--------------excel data------------------");
					console.log(dataArr);
					
					
					// ExcelJS 워크북과 워크시트 생성
					   var workbook = new ExcelJS.Workbook();
					   var worksheet = workbook.addWorksheet('Sheet1');


					   // 첫 번째 행의 병합된 셀 설정 (1행)
					   worksheet.mergeCells('A1:A2');  // 순번 병합
					   worksheet.mergeCells('B1:K1');  // 토지 기본 정보 병합
					   worksheet.mergeCells('L1:P1');  // 권리 확보 여부 병합

					   // 첫 번째 행의 셀 값 설정
					   worksheet.getCell('A1').value = '순번';
					   worksheet.getCell('B1').value = '토지 기본 정보';
					   worksheet.getCell('L1').value = '권리 확보 여부';

					   // 두 번째 행의 세부적인 열 제목 설정
					   worksheet.getRow(2).values = [
					       '순번', '시도', '시군구', '읍면동', '리', '지번', '면적', '지목', '토지유형', '지상권', '비고(지적변동사항)',
					       '자산분류번호', '등기완료여부', '관로일치여부', '점용허가번호', '도시계획'
					   ];

					   // 셀 스타일 정의 (폰트, 정렬, 테두리, 배경색)
					   const headerStyle = {
					       font: { bold: true },
					       alignment: { horizontal: 'center', vertical: 'middle' },
					       fill: { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFFF00' } },  // 노란색 배경
					       border: {
					           top: { style: 'thin' },
					           left: { style: 'thin' },
					           bottom: { style: 'thin' },
					           right: { style: 'thin' }
					       }
					   };

					   // 첫 번째 행과 두 번째 행에 스타일 적용
					   worksheet.getRow(1).eachCell((cell) => {
					       cell.style = headerStyle;
					   });
					   worksheet.getRow(2).eachCell((cell) => {
					       cell.style = headerStyle;
					   });

					   // 데이터 추가 (예시로 10개의 행을 추가)
					  /* var dataArr = [
					       [1, "서울지사", "A123", "M456", "서울특별시", "강남구", "삼성동", "리", "123-45", "대지", "100", "홍길동", "Y", "매매", "50", "2022-01-01", "2022-02-01", "Y", "PNU001"],
					       // 데이터 생략
					   ];*/

					   dataArr.forEach((row, index) => {
					       worksheet.addRow(row);
					   });
					   
					   

				 /* // 각 열의 데이터 길이에 따라 열 너비 설정
				    let columnLengths = new Array(headers.length).fill(10);  // 기본 길이 10

				    // 데이터와 헤더를 기반으로 최대 길이를 계산
				    worksheet.eachRow((row, rowNumber) => {
				        row.eachCell({ includeEmpty: true }, (cell, colNumber) => {
				            const cellValue = cell.value ? cell.value.toString() : '';
				            // 최대 길이를 계산하여 갱신
				            if (cellValue.length > columnLengths[colNumber - 1]) {
				                columnLengths[colNumber - 1] = cellValue.length;
				            }
				        });
				    });

				    // for문을 사용하여 각 열의 크기 설정
				    for (let i = 0; i < headers.length + 1; i++) {  // headers.length + 1: '순번'까지 포함
				        worksheet.getColumn(i + 1).width = columnLengths[i];
				    }  */
					
					// 셀 너비 설정
					   worksheet.columns = [
					       { width: 5 },  // 순번
					       { width: 20 },  // 담당지사
					       { width: 10 },  // 자산분류번호
					       { width: 20 },  // 관리번호
					       { width: 15 },  // 시도
					       { width: 20 },  // 시군구
					       { width: 15 },  // 읍면동
					       { width: 10 },  // 리
					       { width: 20 },  // 지번
					       { width: 15 },  // 지목
					       { width: 20 },  // 지적면적
					       { width: 20 },  // 소유자명
					       { width: 15 },  // 등기여부
					       { width: 15 },  // 계약유형
					       { width: 15 },  // 편입면적
					       { width: 20 },  // 취득일
					       { width: 20 },  // 등기일
						   { width: 20 },  // 사용승락여부
					       { width: 20 }   // PNU
					   ];
					   					  
					   

					   // 스타일을 각 데이터 셀에 적용
					   worksheet.eachRow((row, rowNumber) => {
					       if (rowNumber > 2) {  // 첫 번째와 두 번째 행은 헤더이므로 제외
					           row.eachCell({ includeEmpty: true }, (cell) => {
					               cell.alignment = { vertical: 'middle', horizontal: 'center' };
					               cell.border = {
					                   top: { style: 'thin' },
					                   left: { style: 'thin' },
					                   bottom: { style: 'thin' },
					                   right: { style: 'thin' }
					               };
					           });
					       }
					   });

					   // Unix time을 사용한 파일명 생성
					   var unixTime = Date.now();
					   var fileName = '사유지내역조회_' + unixTime + '.xlsx';

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



//점용허가과리 다운로드

$(document).on("click","#permitExcelBtn",function(){
	
		/*var jisa=$("#jisaText").text();
		if (jisa=="전체") jisa="";
		else jisa=jisa;
		if (jisa=="") {
			alert("지사를 선택해주세요");
			return;
		}*/
		var jisa=$("#jisaText").text();
		if (jisa=="전체") jisa="";
				else jisa=jisa;
		var allData={"jisa":jisa,"gubun":"1"};
		console.log(allData);
		
		$.ajax({
				url: "/statics/landExcelDownload",  // PNU 기준으로 데이터를 가져오는 API
				data: JSON.stringify(allData),
				async: true,
				type: "POST",
				dataType: "json",
				contentType: "application/json; charset=utf-8",
				success: function(rt) {
					console.log(rt);
					const data = rt.result;
					console.log(data); // 서버에서 받아온 데이터 확인
					var dataArr=[];
					/*var head=['순번','담당지사','관로저촉','관경','시도','시군구','읍면동','리','지번','지목','소유자','면적','토지유형','권리확보','자산번호'
					 ,'등기여부','겨약유형','취득일','점용기간','점용납부일','설정면적','설정연장','자산금액','납부금액'
					 ,'PNU','등기/점용여부','계약/허가여부','이슈유형대분류','이슈유형중분류','이슈유형세분류','허가증보유여부','영구무상점유','소액미청구','점용료선납','선납기한'];*/
					/* dataArr.push(head);	*/
					var jisaTmp="";
					//pay : 서울 납부
									 //pcount1 :정상필지수
									 //pcount2:경과필지수
									 //pcount3:납부필지수
									 //pcount4:영구무상필지수
									 //pcount5:소액미청구 필지
									 //pcount6:선납필지수
									 //nopay:기타미납부
									 //perm1:서울정상
									 //perm2:경과
									 //nonpay2:서울 소액미청구
									 //onpay : 선납
									 //nonpay1:서울 영구무상
									 //nopay:기타 미납부
					for(var i=0;i<data.length;i++){
						var tmpArray;
						//console.log("dataList.desc1"+dataList[i].desc1+":"+jisaTmp);
						//var gubun="";
						//if (dataList[i].jisang_status=="ALL") dataList[i].jisang_status="전체"; 
						var perm12sum=parseInt(data[i].perm1)+parseInt(data[i].perm2);
						var paysum=parseInt(data[i].pay)+parseInt(data[i].nonpay1)+parseInt(data[i].nonpay2)+parseInt(data[i].onpay);
						var nopaysum=paysum+parseInt(data[i].nopay);
						var pcount12sum=parseInt(data[i].pcount1)+parseInt(data[i].pcount2);
						var pcount36sum=parseInt(data[i].pcount3)+parseInt(data[i].pcount6);
						var pcount45sum=parseInt(data[i].pcount4)+parseInt(data[i].pcount5);
						var pcountallsum=pcount36sum+pcount45sum;
						var pcount3456sum=parseInt(data[i].pcount3)+parseInt(data[i].pcount4)+parseInt(data[i].pcount5)+parseInt(data[i].pcount6);
						var nonpay12sum=parseInt(data[i].nonpay1)+parseInt(data[i].nonpay2);
						
						var payonsum=parseInt(data[i].pay)+parseInt(data[i].onpay);
						var payallsum=nonpay12sum+payonsum
						tmpArray=[data[i].jisa,'건수',data[i].perm1,data[i].perm2,perm12sum,data[i].pay,data[i].nonpay1,data[i].nonpay2,data[i].onpay,payonsum,nonpay12sum,payallsum];
						dataArr.push(tmpArray);
						tmpArray=['','필지수',data[i].pcount1,data[i].pcount2,pcount12sum,data[i].pcount3,data[i].pcount4,data[i].pcount5,data[i].pcount6,pcount36sum,pcount45sum,pcountallsum];
							
						
						dataArr.push(tmpArray);
						jisaTmp=data[i].jisa;
					}
					console.log("--------------excel data------------------");
					console.log(dataArr);
					
					
					// ExcelJS 워크북과 워크시트 생성
					   var workbook = new ExcelJS.Workbook();
					   var worksheet = workbook.addWorksheet('Sheet1');


					  


					   worksheet.getRow(1).values = ['구분', '', '점용허가 기간', '', '', '납부', '', '', '', '','',''];
					   // "구분"은 가로와 세로로 병합 (한 번에 병합하여 오류 방지)
					   worksheet.mergeCells('A1:B1');  // 구분 (세로 병합)
					   worksheet.mergeCells('A2:B2');  // 구분 (세로 병합)
					  // worksheet.mergeCells('A1:A2');  // 구분 (세로 병합)
						
					   // 나머지 셀 병합 (점용허가 기간과 납부 영역)
					   worksheet.mergeCells('C1:E1');  // 점용허가 기간
					   worksheet.mergeCells('F1:L1');  // 납부(영구무상)
					   

					   /*// 두 번째 행 병합
					   worksheet.mergeCells('B2:B2');  // 정상
					   worksheet.mergeCells('C2:C2');  // 경과
					   worksheet.mergeCells('D2:D2');  // 합계
					   worksheet.mergeCells('F2:F2');  // 선납
					   worksheet.mergeCells('G2:H2');  // 납부 계
					   worksheet.mergeCells('I2:I2');  // 미납부
					   worksheet.mergeCells('J2:J2');  // 합계*/

					   // 첫 번째 행 데이터 입력
					  
					   worksheet.getRow(2).values = ['', '','정상', '경과', '합계', '납부', '영구무상','소액미청구', '선납', '납부(계)', '미납부', '합계'];


					  
					   // 셀 스타일 정의 (폰트, 정렬, 테두리, 배경색)
					   const headerStyle = {
					       font: { bold: true },
					       alignment: { horizontal: 'center', vertical: 'middle' },
					       fill: { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFFF00' } },  // 노란색 배경
					       border: {
					           top: { style: 'thin' },
					           left: { style: 'thin' },
					           bottom: { style: 'thin' },
					           right: { style: 'thin' }
					       }
					   };

					   // 첫 번째 행과 두 번째 행에 스타일 적용
					   worksheet.getRow(1).eachCell((cell) => {
					       cell.style = headerStyle;
					   });
					   worksheet.getRow(2).eachCell((cell) => {
					       cell.style = headerStyle;
					   });

					   // 데이터 추가 (예시로 10개의 행을 추가)
					  /* var dataArr = [
					       [1, "서울지사", "A123", "M456", "서울특별시", "강남구", "삼성동", "리", "123-45", "대지", "100", "홍길동", "Y", "매매", "50", "2022-01-01", "2022-02-01", "Y", "PNU001"],
					       // 데이터 생략
					   ];*/
						
					   dataArr.forEach((row, index) => {
					       worksheet.addRow(row);
					   });
					   
					   

				 /* // 각 열의 데이터 길이에 따라 열 너비 설정
				    let columnLengths = new Array(headers.length).fill(10);  // 기본 길이 10

				    // 데이터와 헤더를 기반으로 최대 길이를 계산
				    worksheet.eachRow((row, rowNumber) => {
				        row.eachCell({ includeEmpty: true }, (cell, colNumber) => {
				            const cellValue = cell.value ? cell.value.toString() : '';
				            // 최대 길이를 계산하여 갱신
				            if (cellValue.length > columnLengths[colNumber - 1]) {
				                columnLengths[colNumber - 1] = cellValue.length;
				            }
				        });
				    });

				    // for문을 사용하여 각 열의 크기 설정
				    for (let i = 0; i < headers.length + 1; i++) {  // headers.length + 1: '순번'까지 포함
				        worksheet.getColumn(i + 1).width = columnLengths[i];
				    }  */
					
					// 셀 너비 설정
					   worksheet.columns = [
					       { width: 5 },  // 순번
					       { width: 20 },  // 담당지사
					       { width: 10 },  // 자산분류번호
					       { width: 20 },  // 관리번호
					       { width: 15 },  // 시도
					       { width: 20 },  // 시군구
					       { width: 15 },  // 읍면동
					       { width: 10 },  // 리
					       { width: 20 },  // 지번
					       { width: 15 },  // 지목
					       { width: 20 },  // 지적면적
					       { width: 20 },  // 소유자명
					       { width: 15 },  // 등기여부
					       { width: 15 },  // 계약유형
					       { width: 15 },  // 편입면적
					       { width: 20 },  // 취득일
					       { width: 20 },  // 등기일
						   { width: 20 },  // 사용승락여부
					       { width: 20 }   // PNU
					   ];
					   					  
					   

					   // 스타일을 각 데이터 셀에 적용
					   worksheet.eachRow((row, rowNumber) => {
					       if (rowNumber > 2) {  // 첫 번째와 두 번째 행은 헤더이므로 제외
					           row.eachCell({ includeEmpty: true }, (cell) => {
					               cell.alignment = { vertical: 'middle', horizontal: 'center' };
					               cell.border = {
					                   top: { style: 'thin' },
					                   left: { style: 'thin' },
					                   bottom: { style: 'thin' },
					                   right: { style: 'thin' }
					               };
					           });
					       }
					   });

					   // Unix time을 사용한 파일명 생성
					   var unixTime = Date.now();
					   var fileName = '점용허가관리현황_' + unixTime + '.xlsx';

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


