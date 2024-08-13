function isEmpty(str,mode){
	//mode string s , number n
	var newStr=str;
	if (newStr==null || newStr == "" || newStr==undefined || newStr=="undefined"){
		if (mode=="n") newStr=0;
		else newStr="";
	}
	
	return newStr;
	
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


