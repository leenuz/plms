// 커스텀 selectbox

const createCustomLiRightChangeStat = () => {
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
            const optionText = notsetAddSelectBox.options[i].text;
            const li = document.createElement('li');
            const button = document.createElement('button');
            button.classList.add('moreSelectBtn');
            button.type = 'button';
            button.textContent = optionText;
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
createCustomLiRightChangeStat();


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


const moreSelectBtnEventForRightChangeStat = () => {

    const customSelectBtns = document.querySelectorAll('#rightChangeStat .customSelectBtns');

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
                console.log(`Selected value: ${nearBySelectBox.id}`);
                
                if(nearBySelectBox.id == 'rightChangeStatSelectBox01_1'){
					//선택한 select가 지사인 경우 -> 기준 년월 조회
					//기준년월 & 비교년월 셀렉트박스를 닫고 -> 연도 선택 & 월 선택으로 문구 변경
					console.log("지사선택 -> 년월 조회");
					
					$("#customSelectBtns02_1").removeClass("active");
					$("#customSelectBtns02_2").removeClass("active");
					$("#customSelectBtns02_3").removeClass("active");
					$("#customSelectBtns02_4").removeClass("active");
					
					$("#customSelectView02_1").text("연도 선택");
					$("#customSelectView02_3").text("연도 선택");
					$("#customSelectView02_2").text("월 선택");
					$("#customSelectView02_4").text("월 선택");
					
					
					findYearAction();
					
				}else if(nearBySelectBox.id == 'rightChangeStatSelectBox02_1' || nearBySelectBox.id == 'rightChangeStatSelectBox02_3'){
					//선택한 select가 연도인경우 -> 월 조회
//					console.log("연도선택 -> 월 조회");
					findMonthAction2(nearBySelectBox.id, nearBySelectBox.value);
				}
                
                
            }
        })
    })

}

moreSelectBtnEventForRightChangeStat();

// 현재 연도를 구하는 방법
//const findYearForRightChangeStat = () => {
//    const currentYear = new Date().getFullYear();
//    console.log(currentYear);
//    const yearBox = [];
//
//    for (let x = 0; x<= 4 ; x++) {
//        yearBox.push(currentYear - x);
//    };
//    console.log(yearBox);
//
//    const yearboxSelectBox = document.querySelectorAll('select.getYearSelectBox');
//
//    yearboxSelectBox.forEach((select) => {
//
//        for (let z = 0 ; z<5 ; z++) {
//            const yearOptuion = document.createElement('option');
//    
//            yearOptuion.textContent = yearBox[4-z]+'년';
//            yearOptuion.value = yearBox[4-z]+'년';
//    
//            select.appendChild(yearOptuion);
//        }
//        createCustomLiRightChangeStat();
//    })
//    
//}
//findYearForRightChangeStat();

// 월을 구하는 방법
//const findMonthForRightChangeStat = () => {
//    const monthSelectBox = document.querySelectorAll('select.getMonthSelectBox');
//
//    monthSelectBox.forEach((monthSelect) => {
//        for (let y = 1; y<= 12 ; y++) {
//            const monthOption = document.createElement('option');
//
//            monthOption.textContent = y +'월';
//            monthOption.value = y +'월' ;
//            
//
//            monthSelect.appendChild(monthOption);
//        };
//
//        createCustomLiRightChangeStat();
//    });
//
//};
//findMonthForRightChangeStat();

// 필지정보 팝업
//const rightChangeStatPopEvet = () => {
//
//    const parcelPopupOpen = document.querySelectorAll("#rightChangeStat .parcelNumArea");
//    const rightChangeStatParcelPopWrapper = document.querySelector(".rightChangeStatParcelPopWrapper");
//    let approvalFilePath = '/components/popuphtml/superficies_statistics_Popup/pilji_info_Popup.html'; // 잠재이슈 등록 필지 조회
//
//    if (parcelPopupOpen) {
//
//        let xhr = new XMLHttpRequest();
//        xhr.open('GET', approvalFilePath, true);
//        xhr.onreadystatechange = function () {
//            if (xhr.readyState == 4 && xhr.status == 200) {
//                rightChangeStatParcelPopWrapper.innerHTML = xhr.responseText;
//                runScriptsInElement(rightChangeStatParcelPopWrapper); // 삽입된 html내 스크립트 실행 함수 호출
//            }
//        };
//        xhr.send();
//        console.log('rightChangeStatParcelPopWrapper 작동');
//
//        parcelPopupOpen.forEach((parcelpopOpen) => {
//            parcelpopOpen.addEventListener('click', function () {
//
//                const popupOpen = document.getElementById("pilji_info_Popup");
//                if (popupOpen) {
//
//                    popupOpen.classList.add("active");
//                }
//            })
//        });
//
//        // 삽입된 html내 스크립트 실행 함수
//        const runScriptsInElement = (element) => {
//            const scripts = element.getElementsByTagName('script');
//            for (let i = 0; i < scripts.length; i++) {
//                const script = document.createElement('script');
//                script.textContent = scripts[i].textContent;
//                document.body.appendChild(script).parentNode.removeChild(script);
//            }
//        }
//
//
//    }
//
//}
//
//rightChangeStatPopEvet();

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

//$(document).on("click",".parcelNumArea",function(){
//
//						  const popupOpen = document.querySelector("#searchResultsPopup .popupWrap");
//						  	   $(popupOpen).addClass("open");
//						  	   popupOpen.classList.add("active");
//
//				   	   	});
//
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

//2024-10-14 소스 수정-----------------------------------------------------------------------------------------------

var pageNum = 0;
var pageNo = 1;
var resultData = [];

//필지 팝업
function iotPopup(year,month,desc,jisangStatus){
	
	//표를 비우기
	$("#popContentBox").empty();
	$("#pagination").empty();
	
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

                $('#totalCount').html(resultData.length);
                pageNum = Math.floor(resultData.length / 10);
                if (resultData.length % 10 > 0) {
                    pageNum += 1;
                }
				
				pageNo = 1;
                display();			
				
				$("#popupNm").text("필지 정보");//검색기준년월
				$("#popupCnt").text(response.dataTotalCnt);//비교기준년월
				
				//excel다운을 위해서 검색조건을 달고 가기 위함
				$("#hiddenGubun").val("G");//비교기준년월
				$("#hiddenDesc").val(desc);//비교기준년월
				$("#hiddenYear").val(year);//비교기준년월
				$("#hiddenMonth").val(month);//비교기준년월
				$("#hiddenJisangStatus").val(jisangStatus);//비교기준년월

				
				
				const popupOpen = document.querySelector("#searchResultsPopup .popupWrap");
		  	   $(popupOpen).addClass("open");
		  	   popupOpen.classList.add("active");
			},
			error:function(request,status,error){
	 			alert("code:"+request.resultCode+"\n"+"message:"+request.resultMessage+"\n"+"error:"+error);
	 		}	
		});
	
}

//증가 & 감소 팝업
function upDownPopup(type,yearRef,monthRef,yearTg,monthTg,desc,jisangStatus){
	//표를 비우기
	$("#popContentBox").empty();
	$("#pagination").empty();
	
	var requestUrl = '/statics/selectByRightInDeListDetailUpDown';
	
	var params = {
			"TYPE" : type 			
			,"JISA" : desc	
			,"STATUS" : jisangStatus	
			,"YYYY_REF" : yearRef		
			,"MM_REF" : monthRef		
			,"YYYY_TG" : yearTg		
			,"MM_TG" : monthTg		
			
	};
	
	console.log(params);
	
	$.ajax({
			data : params,
		    type: 'POST',
		    url: requestUrl,
			success : function(response) {
				resultData = response.dataList;

                $('#totalCount').html(resultData.length);
                pageNum = Math.floor(resultData.length / 10);
                if (resultData.length % 10 > 0) {
                    pageNum += 1;
                }
				
				pageNo = 1;
                display();			
				
				$("#popupNm").text("증감 정보");//검색기준년월
				$("#popupCnt").text(response.dataTotalCnt);//비교기준년월
				//excel다운을 위해서 검색조건을 달고 가기 위함
				//type,yearRef,monthRef,yearTg,monthTg,desc,jisangStatus
				$("#hiddenGubun").val("U");//비교기준년월
				$("#hiddenDesc").val(desc);//비교기준년월
				$("#hiddenType").val(type);//비교기준년월
				$("#hiddenYearRef").val(yearRef);//비교기준년월
				$("#hiddenMonthRef").val(monthRef);//비교기준년월
				$("#hiddenYearTg").val(yearTg);//비교기준년월
				$("#hiddenMonthTg").val(monthTg);//비교기준년월
				$("#hiddenJisangStatus").val(jisangStatus);//비교기준년월
				
				const popupOpen = document.querySelector("#searchResultsPopup .popupWrap");
		  	   $(popupOpen).addClass("open");
		  	   popupOpen.classList.add("active");
			},
			error:function(request,status,error){
	 			alert("code:"+request.resultCode+"\n"+"message:"+request.resultMessage+"\n"+"error:"+error);
	 		}	
		});
}



//페이징
function display() {
        var startIdx = (pageNo - 1) * 10;

        var resultStr = '';
        for (var i = startIdx; i < startIdx + 10; i++) {
            if (i > resultData.length - 1) break;
            var row = resultData[i];

            resultStr += '<ul class="popContents">';
            resultStr += '<li class="popContent05"><p>'+(i + 1)+'</p></li>';
            resultStr += '<li class="popContent03"><p>'+row.desc1+'</p></li>';
            resultStr += '<li class="popContent06"><p>'+row.juso+'</p></li>';
            resultStr += '<li class="popContent01"><p>'+row.jisang_status+'</p></li>';
            resultStr += '</ul>';
        }

        $('#popContentBox').html(resultStr);

        // pagination
        var pagiStr = '';
        var startNo = Math.floor((pageNo - 1) / 5) * 5 + 1;
        var endNo = startNo + 5 < pageNum + 1 ? startNo + 5 : pageNum + 1;
        
        for (var i = startNo; i < endNo; i++) {
            if (i == pageNo) {
                pagiStr += '<p class="active" onclick="goPage(' + i + ')">' + i + '</p>';
            } else {
                pagiStr += '<p onclick="goPage(' + i + ')">' + i + '</p>';
            }
        }
        $('#pagination').html(pagiStr);
    }

    function prevPage() {
        if (pageNo > 1) {
            pageNo -= 1;
            display();
        }
    }

    function nextPage() {
        if (pageNo < pageNum) {
            pageNo += 1;
            display();
        }
    }

    function firstPage() {
        pageNo = 1;
        display();
    }

    function lastPage() {
        pageNo = pageNum;
        display();
    }

    function goPage(no) {
        pageNo = no;
        display();
    }

//기준 연도 & 월
function findYearAction(){
	var requestUrl = '/statics/selectByRightInDeListYYYY';
	var jisa = $("#selectedJisa").text();//지사
	if(jisa == "전체"){jisa = '';}
	
	var params = {
			"JISA" : jisa // 지사
	};
	
	console.log(params);
	
	$.ajax({
			data : params,
		    type: 'POST',
		    url: requestUrl,
			success : function(response) {
//				console.log(response.dataList);
//				console.log(response.dataList.length);
				var dataList = response.dataList;
				
				const yearboxSelectBox = document.querySelectorAll('select.getYearSelectBox');
				$("#rightChangeStatSelectBox02_1").empty();
				$("#customSelectBtns02_1").empty();
				$("#rightChangeStatSelectBox02_3").empty();
				$("#customSelectBtns02_3").empty();
				
			    yearboxSelectBox.forEach((select) => {
			        for (let i = 0 ; i<dataList.length ; i++) {
			            const yearOptuion = document.createElement('option');
			    
			            yearOptuion.textContent = dataList[i].year+'년';
			            yearOptuion.value = dataList[i].year+'년';
			    		
			            select.appendChild(yearOptuion);
			        }
			    })

			    $("#selectContentArea02_1").removeClass("passedSelect");
			    $("#selectContentArea02_3").removeClass("passedSelect");
		        createCustomLiRightChangeStat();
				
				findMonthAction(dataList[0].year);//
			},
			error:function(request,status,error){
	 			alert("code:"+request.resultCode+"\n"+"message:"+request.resultMessage+"\n"+"error:"+error);
	 		}	
		});
	
}
findYearAction();

function findMonthAction(year){
	var requestUrl = '/statics/selectByRightInDeListYYYYMM';
	var jisa = $("#selectedJisa").text();//지사
	if(jisa == "전체"){jisa = '';}
	
	var params = {
			"JISA" : jisa // 지사
			,"SELECT_YYYY" : year
	};
	
	$.ajax({
			data : params,
		    type: 'POST',
		    url: requestUrl,
			success : function(response) {
//				console.log(response.dataList);
//				console.log(response.dataList.length);
				var dataList = response.dataList;
				
				const monthSelectBox = document.querySelectorAll('select.getMonthSelectBox');
				$("#rightChangeStatSelectBox02_2").empty();
				$("#customSelectBtns02_2").empty();
				$("#rightChangeStatSelectBox02_4").empty();
				$("#customSelectBtns02_4").empty();

			    monthSelectBox.forEach((monthSelect) => {
			        for (let i = 0 ; i<dataList.length ; i++){
			            const monthOption = document.createElement('option');
			
			            monthOption.textContent =  dataList[i].month +'월';
			            monthOption.value =  dataList[i].month +'월' ;
			            
			
			            monthSelect.appendChild(monthOption);
			        };
			    });
			    $("#selectContentArea02_2").removeClass("passedSelect");
			    $("#selectContentArea02_4").removeClass("passedSelect");
		        createCustomLiRightChangeStat();
			    
			},
			error:function(request,status,error){
	 			alert("code:"+request.resultCode+"\n"+"message:"+request.resultMessage+"\n"+"error:"+error);
	 		}	
		});
}

function findMonthAction2(id, year){
	var requestUrl = '/statics/selectByRightInDeListYYYYMM';
	var jisa = $("#selectedJisa").text();//지사
	if(jisa == "전체"){jisa = '';}
	
	year = year.replace("년","");
	
	var params = {
			"JISA" : jisa // 지사
			,"SELECT_YYYY" : year
	};
	
	$.ajax({
			data : params,
		    type: 'POST',
		    url: requestUrl,
			success : function(response) {
				console.log(response.dataList);
//				console.log(response.dataList.length);
				var dataList = response.dataList;
				
				const monthSelectBox = document.querySelectorAll('select.getMonthSelectBox');
				
				if(id == "rightChangeStatSelectBox02_1"){
					$("#rightChangeStatSelectBox02_2").empty();
					$("#customSelectBtns02_2").empty();
				}else{
					$("#rightChangeStatSelectBox02_4").empty();
					$("#customSelectBtns02_4").empty();
				}

			    monthSelectBox.forEach((monthSelect) => {
			        for (let i = 0 ; i<dataList.length ; i++){
			            const monthOption = document.createElement('option');
			
			            monthOption.textContent =  dataList[i].month +'월';
			            monthOption.value =  dataList[i].month +'월' ;
			            
			
			            monthSelect.appendChild(monthOption);
			        };
			    });
			    
			    if(id == "rightChangeStatSelectBox02_1"){
					$("#selectContentArea02_2").removeClass("passedSelect");
				}else{
					$("#selectContentArea02_4").removeClass("passedSelect");
				}
			    
		        createCustomLiRightChangeStat();
			    
			},
			error:function(request,status,error){
	 			alert("code:"+request.resultCode+"\n"+"message:"+request.resultMessage+"\n"+"error:"+error);
	 		}	
		});
}

//조회하기 버튼 클릭
$(document).on("click","#rightChangeStatSearchBtn",function(){
	
	//표를 비우기
	$("#resultList").empty();
	
	var requestUrl = '/statics/selectByRightInDeList';
	
	var jisa = $("#selectedJisa").text();//지사
	if(jisa == "전체"){jisa = '';}
	var jisangStatus = $("#selectedJisangStatus").text();//권리확보현황
	if(jisangStatus == "전체"){jisangStatus = '';}
	
	var YYYY_REF = $("#customSelectView02_1").text();
	var MM_REF = $("#customSelectView02_2").text();
	var YYYY_TG = $("#customSelectView02_3").text();
	var MM_TG = $("#customSelectView02_4").text();
	
	if(YYYY_REF == "연도 선택" || YYYY_TG == "연도 선택" || MM_REF == "연도 선택" || MM_TG == "연도 선택"){
		alert("날짜를 선택해주세요.");
		return;
	}else{
		YYYY_REF = Number(YYYY_REF.replace("년",""));
		MM_REF = Number(MM_REF.replace("월",""))	;
		YYYY_TG =  Number(YYYY_TG.replace("년",""));
		MM_TG = Number(MM_TG.replace("월",""));
	}
	
	var params = {
			"JISA" : jisa 				// 지사
			,"STATUS" : jisangStatus	// 권리확보유형 ( 지상권, 미설정 등등.. )
			,"YYYY_REF" : YYYY_REF		// 기준년
			,"MM_REF" : MM_REF				// 기준월
			,"YYYY_TG" : YYYY_TG			// 비교년
			,"MM_TG" : MM_TG				// 비교월
			
	};
	
	console.log(params);
	
	$.ajax({
			data : params,
		    type: 'POST',
		    url: requestUrl,
			success : function(response) {
//				console.log(response.dataList);
//				console.log(response.dataList.length);
				
				var dataList = response.dataList;
				
				var tags = "";
				for(var i = 0; i < dataList.length; i++){
					var resultJisangStatus = dataList[i].jisang_status;
					if(resultJisangStatus == "ALL"){resultJisangStatus = "전체";}
					
					tags += '<tr>';
					//권리확보유형이 전체인 경우는 5개가 전부 나옴으로 rowspan=5 그외에는 2
					if($("#selectedJisangStatus").text() == "전체"){
						if(i%5 == 0){
							tags += '   <td rowspan="5">';
	                    	tags += '       <p>'+dataList[i].desc1+'</p>';
	                    	tags += '   </td>';	
						}	
					}else{
							tags += '   <td>';
	                    	tags += '       <p>'+dataList[i].desc1+'</p>';
	                    	tags += '   </td>';	
					}
					
                    tags += '   <td>';
                    tags += '       <p>'+resultJisangStatus+'</p>';
                    tags += '   </td>';
                    tags += '   <td class="parcelNumArea">';
                    tags += '       <p class="textunderline" onclick=\'iotPopup('+YYYY_REF+','+MM_REF+',\"'+dataList[i].desc1+'\",\"'+dataList[i].jisang_status+'\")\'>'+dataList[i].ref_cnt+'</p>';
                    tags += '   </td>';
                    tags += '   <td>';
                    tags += '       <p>'+resultJisangStatus+'</p>';
                    tags += '   </td>';
                    tags += '   <td class="parcelNumArea">';
                    tags += '       <p class="textunderline" onclick=\'iotPopup('+YYYY_TG+','+MM_TG+',\"'+dataList[i].desc1+'\",\"'+dataList[i].jisang_status+'\")\'>'+dataList[i].tg_cnt+'</p>';
                    tags += '   </td>';
                    tags += '   <td>';
                    tags += '       <p>'+resultJisangStatus+'</p>';
                    tags += '   </td>';
                    tags += '   <td class="parcelNumArea">';
                    tags += '       <p class="textunderline" onclick=\'upDownPopup(\"UP\",'+YYYY_REF+','+MM_REF+','+YYYY_TG+','+MM_TG+',\"'+dataList[i].desc1+'\",\"'+dataList[i].jisang_status+'\")\'>'+dataList[i].add_cnt+'</p>';
                    tags += '   </td>';
                    tags += '   <td class="parcelNumArea">';
                    tags += '       <p class="textunderline" onclick=\'upDownPopup(\"DOWN\",'+YYYY_REF+','+MM_REF+','+YYYY_TG+','+MM_TG+',\"'+dataList[i].desc1+'\",\"'+dataList[i].jisang_status+'\")\'>'+dataList[i].del_cnt+'</p>';
                    tags += '   </td>';
					tags += '</tr>';
				}
				
				$("#resultList").append(tags);			
				
				var resultSdate = YYYY_REF + '-' + String(MM_REF).padStart(2, '0');
				var resultEdate = YYYY_TG + '-' + String(MM_TG).padStart(2, '0');
				
				$("#resultSdate").text(resultSdate);//검색기준년월
				$("#resultEdate").text(resultEdate);//비교기준년월
				
				//모든 데이터를 로드후 실행
				$(".depth1").css("display","block");
			},
			error:function(request,status,error){
	 			alert("code:"+request.resultCode+"\n"+"message:"+request.resultMessage+"\n"+"error:"+error);
	 		}	
		});
	
});



//조회하기 버튼 클릭
$(document).on("click","#rightChangeStatExcelDownloadBtn",function(){
	
	/*exportDivToExcel();
	return;*/
	
	//표를 비우기
	//$("#resultList").empty();
	
	var requestUrl = '/statics/selectByRightInDeList';
	
	var jisa = $("#selectedJisa").text();//지사
	if(jisa == "전체"){jisa = '';}
	var jisangStatus = $("#selectedJisangStatus").text();//권리확보현황
	if(jisangStatus == "전체"){jisangStatus = '';}
	
	var YYYY_REF = $("#customSelectView02_1").text();
	var MM_REF = $("#customSelectView02_2").text();
	var YYYY_TG = $("#customSelectView02_3").text();
	var MM_TG = $("#customSelectView02_4").text();
	
	if(YYYY_REF == "연도 선택" || YYYY_TG == "연도 선택" || MM_REF == "연도 선택" || MM_TG == "연도 선택"){
		alert("날짜를 선택해주세요.");
		return;
	}else{
		YYYY_REF = Number(YYYY_REF.replace("년",""));
		MM_REF = Number(MM_REF.replace("월",""))	;
		YYYY_TG =  Number(YYYY_TG.replace("년",""));
		MM_TG = Number(MM_TG.replace("월",""));
	}
	
	var params = {
			"JISA" : jisa 				// 지사
			,"STATUS" : jisangStatus	// 권리확보유형 ( 지상권, 미설정 등등.. )
			,"YYYY_REF" : YYYY_REF		// 기준년
			,"MM_REF" : MM_REF				// 기준월
			,"YYYY_TG" : YYYY_TG			// 비교년
			,"MM_TG" : MM_TG				// 비교월
			
	};
	
	console.log(params);
	
	$.ajax({
			data : params,
		    type: 'POST',
		    url: requestUrl,
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
	 console.log(dataList);
	   // 워크북 및 시트 생성
	   // 엑셀 워크북 및 워크시트 생성
	          var workbook = new ExcelJS.Workbook();
	          var worksheet = workbook.addWorksheet('Sheet1');

			  
			  worksheet.getRow(1).values = ['지사구분', '기준년월', '', '비교년월', '', '증감현황', '', ''];
	          // 병합 셀 설정
	          worksheet.mergeCells('A1:A2');  // '지사구분' 병합
	          worksheet.mergeCells('B1:C1');  // '기준년월' 병합
	          worksheet.mergeCells('D1:E1');  // '비교년월' 병합
	          worksheet.mergeCells('F1:H1');  // '증감현황' 병합

	         
			  var yearmon=params.YYYY_REF+"-"+params.MM_REF;
			  var tyearmon=params.YYYY_TG+"-"+params.MM_TG;
	          worksheet.getRow(2).values = ['', yearmon, '필지수', tyearmon, '필지수', '구분', '증가', '감소'];

	          // 데이터 예시 (서울지사, 경인지사 등)
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
					else tmpArray=[dataList[i].desc1,dataList[i].jisang_status,dataList[i].ref_cnt,dataList[i].jisang_status,dataList[i].tg_cnt,dataList[i].jisang_status,dataList[i].add_cnt,dataList[i].del_cnt];
					data.push(tmpArray);
					jisaTmp=dataList[i].desc1;
			  }
			  console.log("-------------last data---------------");
			  console.log(data);
			  
			  /* [
	              ['서울지사', '지상권', 767, '지상권', 767, '지상권', 0, 0],
	              ['', '점용', 1015, '점용', 1015, '점용', 0, 0],
	              ['', '미설정', 512, '미설정', 512, '미설정', 0, 0],
	              ['', '회사토지', 111, '회사토지', 0, '회사토지', 111, 0],
	              ['', '전체', 2405, '전체', 2294, '전체', 111, 0],
	              ['경인지사', '지상권', 4, '지상권', 4, '지상권', 0, 0],
	              ['', '점용', 835, '점용', 835, '점용', 0, 0],
	              ['', '미설정', 70, '미설정', 70, '미설정', 0, 0],
	              ['', '회사토지', 40, '회사토지', 0, '회사토지', 40, 0],
	              ['', '전체', 949, '전체', 909, '전체', 40, 0],
	              // 다른 데이터 추가 가능
	          ];*/
			  // 마지막 지사에 대한 병합
			 // worksheet.mergeCells('A' + startRow + ':A' + (dataList.length + 2));

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

	          // 데이터 셀 스타일 적용
	          worksheet.eachRow({ includeEmpty: true }, (row, rowNumber) => {
	              if (rowNumber > 2) {
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
	              link.download = '권리별증감현황.xlsx';
	              link.click();
	          });
   }
   
   
   
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



    }
   
   
   
   