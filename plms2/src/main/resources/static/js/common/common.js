//241005
var selectDivId;

/*function EmptyToStr(str,mode){
	//mode string s , number n
	var newStr=str;
	if (newStr==null || newStr == "" || newStr==undefined || newStr=="undefined"){
		if (mode=="n") newStr=0;
		else newStr="";
	}
	
	return newStr;
	
}*/

function isEmpty(str,mode){
	//mode string s , number n
	var newStr=str;
	if (newStr==null || newStr == "" || newStr==undefined || newStr=="undefined"){
		/*if (mode=="n") newStr=0;
		else newStr="";*/
		return true;
	}
	
	return false;
	
}

function loadingShow(){
	console.log("loading show....");
	var maskHeight=$(document).height();
	var maskWidth=window.document.body.clientWidth;
	
	var mask = "<div id='mask' style='position:absolute; z-index:100; background-color:#000000; left:0; top:0;'></div>";
	$('body').append(mask);
	$("#mask").css({
		'width': maskWidth,
		'height':maskHeight,
		'opacity':'0.4'
	})
	$("#loadingBar").show();
}

function loadingHide(){
	console.log("loading hide....");
	$("#mask").remove();
	$("#loadingBar").hide();
}

function addCommas(nStr)
{
    nStr += '';
    x = nStr.split('.');
    x1 = x[0];
    x2 = x.length > 1 ? '.' + x[1] : '';
    var rgx = /(\d+)(\d{3})/;
    while (rgx.test(x1)) {
        x1 = x1.replace(rgx, '$1' + ',' + '$2');
    }
    return x1 + x2;
}

function ljsIsNull(str){
	var rtn=false;
	if (typeof str=="undefined" || str=="" || str==null){
		rtn=true;
	}
	else rtn=false;
	
	return rtn;
}




function scrFn_loadScript(url, callback, charset='UTF-8')
{
    // <head> 를 찾음
    var head = document.getElementsByTagName('head')[0];
    
    // script 라는 Element를 만듦
    var script = document.createElement('script');
    
    script.type = 'text/javascript';
    script.charset = charset;
    
    var loaded = false;

    // Firefox, Chrome 등, script.onload를 이용해서 로딩 완료 여부를 확인한다.
    script.onload = function ()
    {
        if (callback)
        {
            callback();
        }
    }
    
    // 스크립트 경로 지정
    script.src = url;
    
    // <head>에 script 추가
    head.appendChild(script);
}


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
	 


function checkData(str,mode,message="오류메세지 미확인"){
	console.log("--------checkData---------");
	console.log("str:"+str);
	console.log("mode:"+mode);
	if (this.isEmpty(str,mode)) {
		console.log("------------------null-------------");
		alert(message);
		return false;
	}
	return true;
}



function mergeTableCells(tableId, columnIndex) {
    var rows = $(tableId + ' tr');
    var previousCell = null;
    var rowspan = 1;

    rows.each(function(index) {
        var currentCell = $(this).find('td').eq(columnIndex);
		console.log(currentCell);
		console.log("cur:"+currentCell.find("input").val());
		//console.log("pre:"+previousCell.text());
		
        if (previousCell === null) {
            previousCell = currentCell;
        } else if (currentCell.find("input").val() === previousCell.find("input").val()) {
            rowspan++;
            currentCell.remove();  // 중복된 셀 제거
        } else {
            if (rowspan > 1) {
                previousCell.attr('rowspan', rowspan);
            }
            previousCell = currentCell;
            rowspan = 1;
        }
    });

    // 마지막 그룹 처리
    if (rowspan > 1) {
        previousCell.attr('rowspan', rowspan);
    }
}


/**
 * 진행 현황 관련 함수
 **/
//진행 현황 데이터
const progStatusMap = {
    "임시저장": "1",
    "민원발생": "2",
    "대응방안수립": "3",
    "협의중": "4",
    "완료": "5"
};
// 진행 현황 상태 찾는 함수
function findProgStatus(input) {
    if (progStatusMap[input]) {
        return progStatusMap[input];
    }
    const statusEntry = Object.entries(progStatusMap).find(([key, value]) => value === input);
    return statusEntry ? statusEntry[0] : null; 
}



function commonCurrentPagePrint(id) {
	let prtContent = document.getElementById('id');
	let initBody; 
	
	console.log('common print gd');
	
	
	window.onbeforeprint = function() {
		initBody = document.body.innerHTML;
		document.body.innerHTML = prtContent.innerHTML;
	}
	
	window.onafterprint = function() {
		document.body.innerHTML = initBody;
	}
	
	window.print();
}


/***************************************************************************/
// 좌측 사이드바 메뉴 및 공통 동작 script들 
/***************************************************************************/

function commonFunctionTest() {
	console.log('해당 페이지는 common.js 사용 가능');
}

//좌측사이드바 지도메뉴버튼
function goto2pmsMap() {
	// 자식 창에서 부모 창으로 메시지 보내기
	if (window.opener) {
		const message = { type: "setMap" };
		window.opener.postMessage(message, '*');  // 부모 창으로 메시지 전송
	}
}

//
function largeMenuClick(obj, id){
	
	if(selectDivId != id) {
		$('.surfaceMenuBtn').removeClass('addClick active');
		$('.hiddenMenuBoxs').removeClass('surfacemunuOpen');
		selectDivId = id;
	} else {
		selectDivId = id;
	}
	
	if($(obj).hasClass('addClick active')) {
		$(obj).removeClass('addClick active')
		$("#"+id).removeClass('surfacemunuOpen');
	} else {
		$(obj).addClass('addClick active');
		$("#"+id).addClass('surfacemunuOpen');
	}
}

//지도보기(이동,위치) 공통
function positionView(objInfo) {
	//({'lon':mapCoordLng, 'lat':mapCoordLat, 'zoom':'15'});
	//({'lon':mapCoordLng, 'lat':mapCoordLat});
	
	console.log(objInfo)
	
	// 자식 창에서 부모 창으로 메시지 보내기
	if (window.opener) {
		const message = {
			type: "setCenter",
			lon: mapCoordLng,
			lat: mapCoordLat,
			zoom: 19,
			markers: [[127.387205, 36.43472], [127.376596, 36.411514], [127.464146, 36.437349], [127.469639, 36.398030], [127.328186, 36.425660]]
		};
		window.opener.postMessage(message, '*');  // 부모 창으로 메시지 전송
	}
}	



function commonJisaInfoCheck() {
	let jisaName = $("#loginJisa").val();	//각 해당 페이지의 hidden type으로 되있는 값 존재
	
	if(jisaName != '') {
		$("#jisaNameDiv").text(jisaName);
		$("#jisaNameDiv").attr('disabled', true);
	} else {
		$("#jisaNameDiv").text('전체');
		$("#jisaNameDiv").attr('disabled', false);
	}
	
}

//공통 파일 다운로드 ajax
function commonFileDownload(filePath, fileName, fileJisangNo, fileSeq, fileGubun) {
	
	let param = {
		"filePath" : filePath,
		"fileName" : fileName,
		"fileJisangNo" : fileJisangNo,
		"fileSeq" : fileSeq,		
		"fileGubun" : fileGubun
	};
	
	console.log(param);
	
	$.ajax({
		url : "/land/common/downloadfile",
		data : param,
		type : "GET",
		xhrFields: {
			responseType: 'blob'
		},
		success: function(data, status, xhr){
			
			let disposition = xhr.getResponseHeader('Content-Disposition');
			let filename = 'downloaded_file'; //기본 파일명
			
			//Content-Disposition에서 파일명 추출
			if(disposition && disposition.indexOf('filename*=UTF-8\'\'') !== -1) {
				filename = decodeURIComponent(disposition.split('filename*=UTF-8\'\'')[1]);
			}
			
			//Blob을 URL로 변환
			let blob = new Blob([data],{ type: xhr.getResponseHeader('Content-Type') });  // Blob을 Content-Type에 맞게 설정
			let link = document.createElement('a');
			link.href = window.URL.createObjectURL(blob);
			link.download = filename;
			
			//링크 강제 클릭 다운로드
			document.body.appendChild(link);
			link.click(); // 파일 다운로드 실행
			document.body.removeChild(link);
		},
		error: function(err) {
			console.error('파일 다운로드 실패', err);
		}
	});
} 

//공통파일 보기
function commonFileView(filePath, fileName, fileJisangNo, fileSeq, fileGubun) {
	
	console.log("f_path :: " + filePath);
	console.log("f_name :: " + fileName);
	console.log("f_jisangNo :: " + fileJisangNo);
	console.log("f_seq :: " + fileSeq);
	console.log("f_gubun ::" + fileGubun);
	
	let selectUrl = '';
	
	//샘플 URL = "http://plms.dopco.co.kr/dcl/jr/downloadFile?file_no=J_010602&file_seq=30988&file_gubun=jisang
	const url = "http://plms.dopco.co.kr/dcl/jr/downloadFile?file_no="+fileJisangNo+"&file_seq="+fileSeq+"&file_gubun="+fileGubun;
	console.log("down URL :: " + url);
	window.open(url, '_self');  // 새 창이나 새 탭에서 파일 다운로드
}

//쿼리 path obeject화
function queryValueToObject(str) {
	const cleanedStr = str.slice(1,-1);
	
	const entries = cleanedStr.split(', ').map(entry => {
		const [key, value] = entry.split('=');
		
		let parsedValue = value === 'null' ? null : isNaN(value) ? value : Number(value);
		return [key, parsedValue];
	});
	
	const jsonObj = Object.fromEntries(entries);
	
	return jsonObj;
}
/***************************************************************************/
/***************************************************************************/