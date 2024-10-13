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
//필지 팝업
function iotPopup(year,month,desc,jisangStatus){
	
	//표를 비우기
	$("#popContentBox").empty();
	
	var requestUrl = '/statics/selectByRightInDeListDetail';
	
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

                display();			
				
				$("#popupNm").text("필지 정보");//검색기준년월
				$("#popupCnt").text(response.dataTotalCnt);//비교기준년월
				
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

                display();			
				
				$("#popupNm").text("증감 정보");//검색기준년월
				$("#popupCnt").text(response.dataTotalCnt);//비교기준년월
				
				const popupOpen = document.querySelector("#searchResultsPopup .popupWrap");
		  	   $(popupOpen).addClass("open");
		  	   popupOpen.classList.add("active");
			},
			error:function(request,status,error){
	 			alert("code:"+request.resultCode+"\n"+"message:"+request.resultMessage+"\n"+"error:"+error);
	 		}	
		});
}

var pageNum = 0;
var pageNo = 1;
var resultData = [];

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
        var endNo = startNo + 5;
        for (var i = startNo; i < endNo; i++) {
            pagiStr += '<p onclick="goPage(' + i + ')">' + i + '</p>';
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