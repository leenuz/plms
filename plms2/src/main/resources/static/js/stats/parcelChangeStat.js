// 커스텀 selectbox

const createCustomLiparcelChangeStat = () => {
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
createCustomLiparcelChangeStat();


const customSelectView = document.querySelectorAll('.customSelectView')

customSelectView.forEach((btn) => {
    btn.addEventListener('click', function () {
        btn.classList.toggle('active');

        if (btn.nextElementSibling) {
            btn.nextElementSibling.classList.toggle('active');

        }
    })
})


// customSelectBtns 리스트 click 했을 때 해당 내용으로 바뀌게하기


const moreSelectBtnEventForparcelChangeStat = () => {

    const customSelectBtns = document.querySelectorAll('#parcelChangeStat .customSelectBtns');

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

}

moreSelectBtnEventForparcelChangeStat();

// 현재 연도를 구하는 방법
const findYearForparcelChangeStat = () => {
    const currentYear = new Date().getFullYear();
    console.log(currentYear);
    const yearBox = [];

    for (let x = 0; x<= 4 ; x++) {
        yearBox.push(currentYear - x);
    };
    console.log(yearBox);

    const yearboxSelectBox = document.querySelectorAll('select.getYearSelectBox');

    yearboxSelectBox.forEach((select) => {

        for (let z = 0 ; z<5 ; z++) {
            const yearOptuion = document.createElement('option');
    
                       
            yearOptuion.textContent = yearBox[4-z]+'년';
            yearOptuion.value = yearBox[4-z]+'년';
            
    
            select.appendChild(yearOptuion);
        }
        createCustomLiparcelChangeStat();
    })
    
}
findYearForparcelChangeStat();

// 월을 구하는 방법

const findMonthForparcelChangeStat = () => {
    const monthSelectBox = document.querySelectorAll('select.getMonthSelectBox');

    monthSelectBox.forEach((monthSelect) => {
        for (let y = 1; y<= 12 ; y++) {
            const monthOption = document.createElement('option');


            monthOption.textContent = y+'월' ;
            monthOption.value = y ;
            

            monthSelect.appendChild(monthOption);
        };

        createCustomLiparcelChangeStat();
    });

};
findMonthForparcelChangeStat();

// 현황 상세정보 팝업
const parcelCurrentPopEvet = () => {

   const parcelChangeStatBtn = document.querySelector("#parcelChangeStat .nowDetailBtn");
   const parcelCurrentDetailPopupWrapper = document.querySelector(".parcelCurrentDetailPopupWrapper");
   let approvalFilePath = '/components/popuphtml/superficies_statistics_Popup/current_detail_info_Popup.html'; // 현황 상세정보

   if (parcelChangeStatBtn) {

       let xhr = new XMLHttpRequest();
       xhr.open('GET', approvalFilePath, true);
       xhr.onreadystatechange = function () {
           if (xhr.readyState == 4 && xhr.status == 200) {
               parcelCurrentDetailPopupWrapper.innerHTML = xhr.responseText;
               runScriptsInElement(parcelCurrentDetailPopupWrapper); // 삽입된 html내 스크립트 실행 함수 호출
           }
       };
       xhr.send();
       console.log('parcelCurrentDetailPopupWrapper 작동');

       parcelChangeStatBtn.addEventListener('click', function () {

           const popupOpen = document.getElementById("current_detail_info_Popup");
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

parcelCurrentPopEvet();


// 필지정보 팝업
const parcelInfoPopEvet = () => {

   const parcelNumArea = document.querySelectorAll("#parcelChangeStat .parcelNumArea");
   const parcelChangeParcelDetailPopWrapper = document.querySelector(".parcelChangeParcelDetailPopWrapper");
   let approvalFilePath = '/components/popuphtml/superficies_statistics_Popup/pilji_info_Popup.html'; // 필지 정보

   if (parcelNumArea) {

       let xhr = new XMLHttpRequest();
       xhr.open('GET', approvalFilePath, true);
       xhr.onreadystatechange = function () {
           if (xhr.readyState == 4 && xhr.status == 200) {
               parcelChangeParcelDetailPopWrapper.innerHTML = xhr.responseText;
               runScriptsInElement(parcelChangeParcelDetailPopWrapper); // 삽입된 html내 스크립트 실행 함수 호출
           }
       };
       xhr.send();
       console.log('parcelChangeParcelDetailPopWrapper 작동');

       parcelNumArea.forEach((parcelBtn) => {
           parcelBtn.addEventListener("click", function(){

               const popupOpen = document.getElementById("pilji_info_Popup");
               if (popupOpen) {

                   popupOpen.classList.add("active");
               }
           })
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

parcelInfoPopEvet();


//페이지네이션
const pageCountEvetForPotentialIssue = () => {
    const potentialPageCountBtn = document.querySelectorAll(
      ".pilji_info_Popup_boardPageBoxs .pageCountBoxs p"
    );
    potentialPageCountBtn.forEach((btn) => {
      potentialPageCountBtn[0].classList.add("active");
      btn.addEventListener("click", () => {
        potentialPageCountBtn.forEach((otherBtn) => {
          otherBtn.classList.remove("active");
        });
        btn.classList.toggle("active");
      });
    });
  };
  pageCountEvetForPotentialIssue();



$(document).on("click",".topCloseBtn",function(){

	var targetDiv=$("#searchResultPopDiv").parent().find("#searchResultPopup").find(".popupWrap");
	$(".popupWrap").removeClass("active");
//	$(".popupWrap").toggleClass("active");
});

$(document).on("click","#popupCloseBtn",function(){

	var targetDiv=$("#searchResultPopDiv").parent().find("#searchResultPopup").find(".popupWrap");
	$(".popupWrap").removeClass("active");
//	$(".popupWrap").toggleClass("active");
});

$('.parcelChangeStatBtn').click(function () {
    var allData = $("#queryForm").serialize();
  
    console.log(allData);
    
    $.ajax({
      url: "/statics/selectFieldInDeList?" + allData,
      data: JSON.stringify(allData),
      async: true,
      type: "POST",
      dataType: "json",
      contentType: 'application/json; charset=utf-8',
      success: function (response) {
        //console.log(response);
        if (response.success = "Y") {
          const resultData = response.dataList;
  
          $('#pREF').html($('#parcelChangeStat01_1').val() + '년 ' + $('#parcelChangeStat01_2').val() + '월');    //기준년월 출력
          $('#pTG').html($('#parcelChangeStat02_1').val() + '년 ' + $('#parcelChangeStat02_2').val() + '월');    //비교년월 출력

         //현황 상세 정보 load
          loadCurrent_detail($('#parcelChangeStat01_1').val(),$('#parcelChangeStat01_2').val(),$('#parcelChangeStat02_1').val(),$('#parcelChangeStat02_2').val());
          loadCurrent_detail_BoardChangeList($('#parcelChangeStat01_1').val(),$('#parcelChangeStat01_2').val(),$('#parcelChangeStat02_1').val(),$('#parcelChangeStat02_2').val());
  
          var tbodyStr = '';

          for (var i = 0; i < resultData.length; i++) {
            var data = resultData[i];
            var trStr = '<tr>';
            trStr += '<td><p>' + data.desc1 + '</p></td>';
            
            trStr += '<td class="parcelNumArea"><p class="textunderline" onclick="loadDataPopup(\'' + data.desc1 + '\', ' + $('#parcelChangeStat01_1').val() + ', ' + $('#parcelChangeStat01_2').val() + ', \'등기\')">' + data.ref_cmpy + '</p></td>';
            trStr += '<td class="parcelNumArea"><p class="textunderline" onclick="loadDataPopup(\'' + data.desc1 + '\', ' + $('#parcelChangeStat01_1').val() + ', ' + $('#parcelChangeStat01_2').val() + ', \'미등기계약\')">' + data.ref_cmpn_pmty + '</p></td>';
            trStr += '<td class="parcelNumArea"><p class="textunderline" onclick="loadDataPopup(\'' + data.desc1 + '\', ' + $('#parcelChangeStat01_1').val() + ', ' + $('#parcelChangeStat01_2').val() + ', \'미등기미계약\')">' + data.ref_cmpn_pmtn + '</p></td>';
            trStr += '<td class="parcelNumArea"><p class="textunderline" onclick="loadDataPopup(\'' + data.desc1 + '\', ' + $('#parcelChangeStat01_1').val() + ', ' + $('#parcelChangeStat01_2').val() + ', \'소계\')">' + data.ref_cmpn + '</p></td>';
            trStr += '<td class="parcelNumArea"><p class="textunderline" onclick="loadDataPopup(\'' + data.desc1 + '\', ' + $('#parcelChangeStat01_1').val() + ', ' + $('#parcelChangeStat01_2').val() + ', \'전체\')">' + data.ref_sum + '</p></td>';

            trStr += '<td class="parcelNumArea"><p class="textunderline" onclick="loadDataPopup(\'' + data.desc1 + '\', ' + $('#parcelChangeStat02_1').val() + ', ' + $('#parcelChangeStat02_2').val() + ', \'등기\')">' + data.tg_cmpy + '</p></td>';
            trStr += '<td class="parcelNumArea"><p class="textunderline" onclick="loadDataPopup(\'' + data.desc1 + '\', ' + $('#parcelChangeStat02_1').val() + ', ' + $('#parcelChangeStat02_2').val() + ', \'미등기계약\')">' + data.tg_cmpn_pmty + '</p></td>';
            trStr += '<td class="parcelNumArea"><p class="textunderline" onclick="loadDataPopup(\'' + data.desc1 + '\', ' + $('#parcelChangeStat02_1').val() + ', ' + $('#parcelChangeStat02_2').val() + ', \'미등기미계약\')">' + data.tg_cmpn_pmtn + '</p></td>';
            trStr += '<td class="parcelNumArea"><p class="textunderline" onclick="loadDataPopup(\'' + data.desc1 + '\', ' + $('#parcelChangeStat02_1').val() + ', ' + $('#parcelChangeStat02_2').val() + ', \'소계\')">' + data.tg_cmpn + '</p></td>';
            trStr += '<td class="parcelNumArea"><p class="textunderline" onclick="loadDataPopup(\'' + data.desc1 + '\', ' + $('#parcelChangeStat02_1').val() + ', ' + $('#parcelChangeStat02_2').val() + ', \'전체\')">' + data.tg_sum + '</p></td>';

            trStr += '<td class="parcelNumArea"><p>' + data.cmpy_dif + '</p></td>';
            trStr += '<td class="parcelNumArea"><p>' + data.cmpn_pmty_dif + '</p></td>';
            trStr += '<td class="parcelNumArea"><p>' + data.cmpn_pmtn_dif + '</p></td>';
            trStr += '<td class="parcelNumArea"><p>' + data.cmpn_dif + '</p></td>';
            trStr += '<td class="parcelNumArea"><p>' + data.sum_dif + '</p></td>';


            trStr += '</tr>';

            tbodyStr += trStr;
          }
  
          
          $('#tbody1').html(tbodyStr);
  
          
        }
      },
      error: function () {
      }
    });
  });

  function loadDataPopup(jisa, yyyy, mm, gubun) {

    $.ajax({
        url: "/stats/parcelPopup?JISA=" + jisa + "&YYYY=" + yyyy + "&MM=" + mm + "&GUBUN=" + gubun,
        async: true,
        type: "GET",
        // dataType: "json",
        contentType: 'html/text; charset=utf-8',
        success: function (response) {
          console.log(response);
          $('#searchResultPopDiv').html(response);
        },
        error: function (error) {
            console.log(error);
        }
      });
    
  }
  
  
  
  
  
  

  //조회하기 버튼 클릭
  $(document).on("click","#parcelChangeStatExcelDownloadBtn",function(){
	var allData = $("#queryForm").serialize();
	 console.log("-------------allData------------------");
	 console.log(allData);
  	/*exportDivToExcel();
  	return;*/
  	
  	//표를 비우기
  	//$("#resultList").empty();
	//url: "/statics/selectFieldInDeList?" + allData,
  	var requestUrl = "/statics/selectFieldInDeList?" + allData;
  	
  	var params=JSON.stringify(allData);
  	
  	$.ajax({
			
  			
  		    type: 'POST',
			data: JSON.stringify(allData),
  		    url: requestUrl,
			dataType: "json",
  			success : function(response) {
  //				console.log(response.dataList);
  //				console.log(response.dataList.length);
  				
  				var dataList = response.dataList;
  				console.log(dataList);
  				exportToExcel(params,dataList);
  			},
  			error:function(request,status,error){
  	 			alert("code:"+request.resultCode+"\n"+"message:"+request.resultMessage+"\n"+"error:"+error);
  	 		}	
  		});
  	
  });
  
  
  
  

  function exportToExcel(params,dataList) {
       console.log("-----start exportToExcel-----");
	   var paramObj=serializeToJSON(params);
	   console.log(paramObj);
  	 console.log(dataList);
  	   // 워크북 및 시트 생성
  	   // 엑셀 워크북 및 워크시트 생성
  	          var workbook = new ExcelJS.Workbook();
  	          var worksheet = workbook.addWorksheet('Sheet1');
			  var REF_STR=paramObj.YYYY_REF+"년 "+paramObj.MM_REF+"월";
			  var TG_STR=paramObj.YYYY_TG+"년 "+paramObj.MM_TG.replace(/\\/g, '')+"월";
			  worksheet.getRow(1).values = ['지사구분', REF_STR, '', '', '', '',TG_STR, '', '', '', '', '증감', '', '', '', ''];
			  // 첫 번째 행 병합 (지사구분, 2024년 1월, 2024년 2월, 증감)
			  worksheet.mergeCells('A1:A3');  // 지사구분
			  worksheet.mergeCells('B1:F1');  // 2024년 1월
			  worksheet.mergeCells('G1:K1');  // 2024년 2월
			  worksheet.mergeCells('L1:P1');  // 증감
			  worksheet.getRow(2).values = ['', '등기', '미등기', '', '', '전체', '등기', '미등기', '', '', '전체', '등기', '미등기', '', '', '전체'];
			  // 두 번째 행 병합 (2024년 1월, 미등기, 소계 등)
			  worksheet.mergeCells('B2:B3'); // 2024년 1월 - 등기
			  worksheet.mergeCells('C2:E2'); // 2024년 1월 - 미등기
			  worksheet.mergeCells('F2:F3'); // 2024년 1월 - 전체
			  worksheet.mergeCells('G2:G3'); // 2024년 2월 - 등기
			  worksheet.mergeCells('H2:J2'); // 2024년 2월 - 미등기
			  worksheet.mergeCells('K2:K3'); // 2024년 2월 - 전체
			  worksheet.mergeCells('L2:L3'); // 증감 - 등기
			  worksheet.mergeCells('M2:O2'); // 증감 - 미등기
			  worksheet.mergeCells('P2:P3'); // 증감 - 전체

			  // 첫 번째 행 데이터 추가
			  
			  worksheet.getRow(3).values = ['', '', '계약', '미계약', '소계', '', '', '계약', '미계약', '소계', '', '', '계약', '미계약', '소계', ''];

			 
			 
  	          var data =[];
  			  var jisaTmp="";
  			  for(var i=0;i<dataList.length;i++){
  				    var tmpArray;
  					console.log("dataList.desc1"+dataList[i].desc1+":"+jisaTmp);
  					//var gubun="";
  					if (dataList[i].jisang_status=="ALL") dataList[i].jisang_status="전체"; 
  					if (dataList[i].desc1==jisaTmp){
  						tmpArray=['',dataList[i].jisang_status,dataList[i].ref_cnt,dataList[i].jisang_status,dataList[i].tg_cnt,dataList[i].jisang_status,dataList[i].add_cnt,dataList[i].del_cnt];
  					}
  					else tmpArray=[dataList[i].desc1,dataList[i].ref_cmpy,dataList[i].ref_cmpn_pmty,dataList[i].ref_cmpn_pmtn,dataList[i].ref_cmpn,dataList[i].ref_sum,dataList[i].tg_cmpy,dataList[i].tg_cmpn_pmty,dataList[i].tg_cmpn_pmtn,dataList[i].tg_cmpn,dataList[i].tg_sum,dataList[i].cmpy_dif,dataList[i].cmpn_pmty_dif,dataList[i].cmpn_pmtn_dif,dataList[i].cmpn_dif,dataList[i].sum_dif];
  					data.push(tmpArray);
  					jisaTmp=dataList[i].desc1;
  			  }
  			  console.log("-------------last data---------------");
  			  console.log(data);
  			  
  			 

  	          // 각 행에 데이터 추가
  	          data.forEach(row => {
  	              worksheet.addRow(row);
  	          });

  	          // 스타일 및 너비 설정
  	          worksheet.columns = [
  	              { width: 15 }, // 지사구분
  	              { width: 10 }, // 기준년월 - 권리
  	              { width: 10 }, // 기준년월 - 필지수
  	              { width: 10 }, // 비교년월 - 권리
  	              { width: 10 }, // 비교년월 - 필지수
  	              { width: 10 }, // 증감현황 - 구분
  	              { width: 10 }, // 증감현황 - 증가
  	              { width: 10 }  // 증감현황 - 감소
  	          ];

  	          const headerStyle = {
  	              font: { bold: true, size: 12 },
  	              alignment: { horizontal: 'center', vertical: 'middle' },
  	              border: {
  	                  top: { style: 'thin' },
  	                  left: { style: 'thin' },
  	                  bottom: { style: 'thin' },
  	                  right: { style: 'thin' }
  	              }
  	          };

  	          // 헤더 스타일 적용
  	          worksheet.getRow(1).eachCell(cell => {
  	              cell.style = headerStyle;
  	          });
  	          worksheet.getRow(2).eachCell(cell => {
  	              cell.style = headerStyle;
  	          });
			  worksheet.getRow(3).eachCell(cell => {
	              cell.style = headerStyle;
	          });

  	          // 데이터 셀 스타일 적용
  	          worksheet.eachRow({ includeEmpty: true }, (row, rowNumber) => {
  	              if (rowNumber > 3) {
  	                  row.eachCell(cell => {
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

  	          // 엑셀 파일 다운로드
  	          workbook.xlsx.writeBuffer().then(function (buffer) {
  	              var blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
  	              var link = document.createElement('a');
  	              link.href = URL.createObjectURL(blob);
  	              link.download = '관리필지별증감현황.xlsx';
  	              link.click();
  	          });
     }
	 
	 
	 
	 
	 

/*
	 $(document).on("click","#excelDownloadBtn",function(){
	 console.log("-------------excelDownloadBtn-------------");
	 event.preventDefault();

	 	console.log($("#hiddenGubun").val());//비교기준년월
	 				console.log($("#hiddenDesc").val());//비교기준년월
	 				console.log($("#hiddenYear").val());//비교기준년월
	 				console.log($("#hiddenMonth").val());//비교기준년월
	 				console.log($("#hiddenJisangStatus").val());//비교기준년월
	   var gubun=$("#hiddenGubun").val();
	   var year = $("#hiddenYear").val();
	   var month = $("#hiddenMonth").val();
	   var desc = $("#hiddenDesc").val();
	   var jisangStatus = $("#hiddenJisangStatus").val();
	   var type=$("#hiddenType").val();//비교기준년월
	   var yearRef=$("#hiddenYearRef").val();//비교기준년월
	   var monthRef=$("#hiddenMonthRef").val();//비교기준년월
	   var yearTg=$("#hiddenYearTg").val();//비교기준년월
	   var monthTg=$("#hiddenMonthTg").val();//비교기준년월
	   if (gubun=="G"){
	 		excelDownLoad1(year,month,desc,jisangStatus);	
	   }
	   else {
	 	//excelDownLoad2(type,yearRef,monthRef,yearTg,monthTg,desc,jisangStatus);
	 	console.log("month")
	 	excelDownLoad3(type,yearRef,monthRef,yearTg,monthTg,desc,jisangStatus);
	   }
	    

	 })


	 function excelDownLoad1(year,month,desc,jisangStatus){
	 	var requestUrl = '/statics/selectByRightInDeListDetail';
	 	
	 	if(jisangStatus == "ALL"){jisangStatus = "";}
	 	
	 	var params = {
	 			"YYYY" : year 			
	 			,"MM" : month	
	 			,"JISA" : desc		
	 			,"STATUS" : jisangStatus		
	 			
	 	};
	 	
	 	console.log(params);
	 	
	 	$.ajax({
	 			data : params,
	 		    type: 'POST',
	 		    url: requestUrl,
	 			success : function(response) {
	 				resultData = response.dataList;

	                 console.log(response);
	 				var data=response.dataList;
	 				              
	 				                
	                 var dataArr=[];
	 				var head=['순번','발생지사','주소','권리확보'];
	 				 dataArr.push(head);	
	 				for(var i=0;i<data.length;i++){
	 					var togi_type="";
	 					if (data[i].gover_own_yn=="Y") togi_type="국유지";
	 					else togi_type="사유지";
	 					var jisangStatus="";
	 					var jisangStatusTmp = data[i].jisang_status ? data[i].jisang_status.toLowerCase() : '';
	 					if (jisangStatusTmp=="jisang") jisangStatus="지상권";
	 					else if (jisangStatusTmp=="gover") jisangStatus="점용";
	 					else if (jisangStatusTmp=="notset") jisangStatus="미설정";
	 					else if (jisangStatusTmp=="dopco") jisangStatus="매입";
	 					else jisangStatus="";
	 					var pmtDate = data[i].pmt_st_date == undefined ? "" : data[i].pmt_st_date + " ~ " + data[i].pmt_ed_date; //점용기간
	 					var occunonpayreasonTitle1 ="";
	 					var occunonpayreasonTitle2 ="";
	 					//var occunonpayreasonTitle3 ="";
	 					if (data[i].occunonpayreason==1) occunonpayreasonTitle1="영구 무상점용";
	 					if (data[i].occunonpayreason==2) occunonpayreasonTitle1="소액 미청구";
	 					//if (data[i].occunonpayreason==2) occunonpayreasonTitle1="소액 미청구";
	 					var mw_status_title="";
	 					//if (data[i].mm_status==)
	 					var juso=data[i].mp_sido_nm+" "+data[i].mp_sgg_nm+" "+data[i].mp_emd_nm+" "+data[i].mp_ri_nm+" "+data[i].mp_jibun;
	 					var rowArr=[data[i].seq,data[i].desc1,data[i].juso,data[i].jisang_status];
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
	 					if (rowNumber>1){
	 						row.eachCell((cell, colNumber) => {
	 			                  cell.font = { size: 10, bold: false };
	 			                  cell.alignment = { vertical: 'middle', horizontal: 'center' };
	 			                  cell.border = {
	 			                      top: { style: 'thin' },
	 			                      left: { style: 'thin' },
	 			                      bottom: { style: 'thin' },
	 			                      right: { style: 'thin' }
	 			                  };
	 			              });
	 					}
	 					else{
	 						row.eachCell((cell, colNumber) => {
	 			                  cell.font = { size: 12, bold: true };
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

	 				  
	 				  var unixTime = Date.now();
	 				  
	 				  var date = new Date(unixTime);  // Unix 타임스탬프를 Date 객체로 변환

	 				  // 년-월-일 형식으로 변환
	 				  var year = date.getFullYear();
	 				  var month = String(date.getMonth() + 1).padStart(2, '0');  // 월은 0부터 시작하므로 1을 더함
	 				  var day = String(date.getDate()).padStart(2, '0');  // 일

	 				  var formattedDate = year + '-' + month + '-' + day;
	 				  
	 				  
	 				      var fileName = '권리별증감현황_필지정보.xlsx';  // 파일명 생성
	 		          // 엑셀 파일 다운로드
	 		          workbook.xlsx.writeBuffer().then(function (buffer) {
	 		              var blob = new Blob([buffer], { type: 'application/octet-stream' });
	 		              var link = document.createElement('a');
	 		              link.href = URL.createObjectURL(blob);
	 		              link.download = fileName;
	 		              link.click();
	 		          });
	 				
	 			},
	 			error:function(request,status,error){
	 	 			alert("code:"+request.resultCode+"\n"+"message:"+request.resultMessage+"\n"+"error:"+error);
	 	 		}	
	 		});


	 }



	 function excelDownLoad3(type,yearRef,monthRef,yearTg,monthTg,desc,jisangStatus){
	 //	var requestUrl = '/statics/selectByRightInDeListDetail';
	 	
	 	if(jisangStatus == "ALL"){jisangStatus = "";}
	 	
	 var requestUrl = '/statics/selectByRightInDeListDetailUpDown';
	 	var params = {
	 	    "TYPE": type,
	 	    "JISA": desc,
	 	    "STATUS": jisangStatus,
	 	    "YYYY_REF": Number(yearRef),
	 	    "MM_REF": Number(monthRef),
	 	    "YYYY_TG": Number(yearTg),
	 	    "MM_TG": Number(monthTg)
	 	};

	    		
	    		console.log(params);
	    		
	 		console.log(requestUrl);
	 		// AJAX 요청
	 		$.ajax({
	 						data : params,
	 					    type: 'POST',
	 					    url: requestUrl,
	 						success : function(response) {
	 							resultData = response.dataList;

	 			                console.log(response);
	 							var data=response.dataList;
	 							              
	 							                
	 			                var dataArr=[];
	 							var head=['순번','발생지사','주소','권리확보'];
	 							 dataArr.push(head);	
	 							for(var i=0;i<data.length;i++){
	 								var togi_type="";
	 								if (data[i].gover_own_yn=="Y") togi_type="국유지";
	 								else togi_type="사유지";
	 								var jisangStatus="";
	 								var jisangStatusTmp = data[i].jisang_status ? data[i].jisang_status.toLowerCase() : '';
	 								if (jisangStatusTmp=="jisang") jisangStatus="지상권";
	 								else if (jisangStatusTmp=="gover") jisangStatus="점용";
	 								else if (jisangStatusTmp=="notset") jisangStatus="미설정";
	 								else if (jisangStatusTmp=="dopco") jisangStatus="매입";
	 								else jisangStatus="";
	 								var pmtDate = data[i].pmt_st_date == undefined ? "" : data[i].pmt_st_date + " ~ " + data[i].pmt_ed_date; //점용기간
	 								var occunonpayreasonTitle1 ="";
	 								var occunonpayreasonTitle2 ="";
	 								//var occunonpayreasonTitle3 ="";
	 								if (data[i].occunonpayreason==1) occunonpayreasonTitle1="영구 무상점용";
	 								if (data[i].occunonpayreason==2) occunonpayreasonTitle1="소액 미청구";
	 								//if (data[i].occunonpayreason==2) occunonpayreasonTitle1="소액 미청구";
	 								var mw_status_title="";
	 								//if (data[i].mm_status==)
	 								var juso=data[i].mp_sido_nm+" "+data[i].mp_sgg_nm+" "+data[i].mp_emd_nm+" "+data[i].mp_ri_nm+" "+data[i].mp_jibun;
	 								var rowArr=[(i+1),data[i].desc1,data[i].juso,data[i].jisang_status];
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
	 								if (rowNumber>1){
	 									row.eachCell((cell, colNumber) => {
	 						                  cell.font = { size: 10, bold: false };
	 						                  cell.alignment = { vertical: 'middle', horizontal: 'center' };
	 						                  cell.border = {
	 						                      top: { style: 'thin' },
	 						                      left: { style: 'thin' },
	 						                      bottom: { style: 'thin' },
	 						                      right: { style: 'thin' }
	 						                  };
	 						              });
	 								}
	 								else{
	 									row.eachCell((cell, colNumber) => {
	 						                  cell.font = { size: 12, bold: true };
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

	 							  
	 							  var unixTime = Date.now();
	 							  
	 							  var date = new Date(unixTime);  // Unix 타임스탬프를 Date 객체로 변환

	 							  // 년-월-일 형식으로 변환
	 							  var year = date.getFullYear();
	 							  var month = String(date.getMonth() + 1).padStart(2, '0');  // 월은 0부터 시작하므로 1을 더함
	 							  var day = String(date.getDate()).padStart(2, '0');  // 일

	 							  var formattedDate = year + '-' + month + '-' + day;
	 							  var fileName="";
	 							  if (type=="UP") fileName = '권리별증감현황_증가필지정보.xlsx';  // 파일명 생성
	 							  else  fileName = '권리별증감현황_감소필지정보.xlsx';  // 파일명 생성
	 					          // 엑셀 파일 다운로드
	 					          workbook.xlsx.writeBuffer().then(function (buffer) {
	 					              var blob = new Blob([buffer], { type: 'application/octet-stream' });
	 					              var link = document.createElement('a');
	 					              link.href = URL.createObjectURL(blob);
	 					              link.download = fileName;
	 					              link.click();
	 					          });
	 							
	 						},
	 						error:function(request,status,error){
	 				 			alert("code:"+request.resultCode+"\n"+"message:"+request.resultMessage+"\n"+"error:"+error);
	 				 		}	
	 					});



	  }*/
