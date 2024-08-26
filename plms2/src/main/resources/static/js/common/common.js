
console.log("----------------common.js start----------------");

 
 




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

