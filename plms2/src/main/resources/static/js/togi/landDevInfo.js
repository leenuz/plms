
$(document).on("click",".editBtn",function() {
  const urlParams = new URL(location.href).searchParams;
  const idx = urlParams.get('idx');
  url = "/togi/landEdit?idx=" +idx;
     window.location = url;
});


$(document).on("click","#moveMap",function(){
	//openMapWindow();
//	mapWindow = window.open('', 'mapWindow', 'width=2000,height=1000');
	const x = $(this).attr('x')
	const y = $(this).attr('y')
	moveToCityHall(x,y);
})


/* 전자결재 문서 열람 추가 */
$(document).on("click",".approvalBtn",function(){
						  const popupOpen = document.querySelector("#searchResultsPopup .popupWrap");
						  	   $(popupOpen).addClass("open");
						  	   popupOpen.classList.add("active");

//                                $('.resultSelectBtn').attr('data-index', clickedButtonId);
//                           	    $('.saveBtn').attr('data-index', clickedButtonId);

	});

$(document).on("click",".topCloseBtn",function(){

	var targetDiv=$("#searchResultPopDiv").parent().find("#searchResultPopup").find(".popupWrap");
	$(".popupWrap").removeClass("active");
});

$(document).on("click","#popupCloseBtn",function(){

	var targetDiv=$("#searchResultPopDiv").parent().find("#searchResultPopup").find(".popupWrap");
	$(".popupWrap").removeClass("active");
});

  const documentView = document.querySelector('#landDevInfo .eDocView .contWrap');
  const documentViewBox = documentView.querySelector('.contentsBox');

/* ul 태그 개수 찾기 */
const getUlCountInContentsBox = (contentsBoxElement) => {
    // contentsBoxElement 내부에서 'contents' 클래스를 가진 모든 ul 태그를 찾음
    const ulElements = contentsBoxElement.querySelectorAll('ul.contents');
    // ul 태그들의 개수를 반환
    return ulElements.length;
}

//전자결재문서 추가 버튼
$(document).on("click","#saveBtn",function(){
	let contentsBoxElement = document.querySelector('.contentsBox');
	let ulCount = getUlCountInContentsBox(contentsBoxElement);
	let dataObj = {};
	
	let doc_key = $('input[name="documentNo"]').val();
	let doc_title = $('input[name="documentTitle"]').val();
	let doc_date = $('input[name="documentdate"]').val();
	let doc_url = $('input[name="documentURL"]').val();
	
	dataObj.dockey = doc_key;
	dataObj.doc_title = doc_title;
	dataObj.doc_date = doc_date;
	dataObj.doc_url = doc_url;
	dataObj.doc_no = $('#dosi_no').val();
	
	// 행을 추가하기 전에 데이터 저장
	url="/togi/insertDosiDoc"; 
	$.ajax({
		url:url,
	   	type:'POST',
	   	contentType:"application/json",
	   	data:JSON.stringify(dataObj),

		dataType:"json",
		beforeSend:function(request){
			console.log("beforesend ........................");
			loadingShow();
		},
		success:function(response){
			loadingHide();
			console.log(response);
			if (response.success="Y"){
				let infoUl = document.createElement('ul');
	infoUl.classList.add('contents');
	infoUl.id='fileListUl';

	for (let i = 1; i <= 4; i++) {
		// li 만들기
		let infoLi = document.createElement('li');
		infoLi.classList.add('content');
	
		if (i == 1) {
			infoLi.classList.add('checkboxWrap');
			infoLi.classList.add('smallWidth');
			
			// input checkbox 세팅
			let checkboxInput = document.createElement('input');
			checkboxInput.type = 'checkbox';
			checkboxInput.name = 'landDevInfo_eDocFile';
			infoLi.appendChild(checkboxInput);
			checkboxInput.id ='landDevInfo_eDocView_Checkbox_' + ulCount;
			
			// label 세팅
			let checkboxLabel = document.createElement('label');
			checkboxLabel.setAttribute('for', checkboxInput.id);
			
			infoLi.appendChild(checkboxLabel);
		} else {
			let infoInput = document.createElement('input');
			let infoInput2 = document.createElement('input');
			infoInput.classList.add('notWriteInput');
			infoInput.readOnly = true;
			infoInput.type = 'text';
			if (i == 2) {
				infoLi.classList.add('middleWidth');
				infoInput.id='docNum_' + ulCount ;
				infoInput.name='docNum_' + ulCount ;
				infoInput.placeholder = document.querySelector('input[name="documentNo"]').value;
				infoInput.value = document.querySelector('input[name="documentNo"]').value;
			} else if (i == 3){
				infoInput.id='docTitle_' + ulCount ;
				infoInput.name='docTitle_' + ulCount ;
				infoInput.placeholder = document.querySelector('input[name="documentTitle"]').value;
				infoInput.value = document.querySelector('input[name="documentTitle"]').value;
			} else if (i == 4) {
				infoInput.id='docDate_' + ulCount ;
				infoInput.name='docDate_' + ulCount ;
				infoInput.placeholder = document.querySelector('input[name="documentdate"]').value;
				infoInput.value = document.querySelector('input[name="documentdate"]').value;
				
				infoInput2.type="hidden"
				infoInput2.id='docURL_' + ulCount ;
				infoInput2.name='docURL_' + ulCount ;
				infoInput2.placeholder = document.querySelector('input[name="documentURL"]').value;
				infoInput2.value = document.querySelector('input[name="documentURL"]').value;
				infoLi.append(infoInput2);
			}
		
			// li안에 넣기
			infoLi.append(infoInput);
		}
		infoUl.appendChild(infoLi);
		documentViewBox.appendChild(infoUl);
	}
	
	$("input[name='documentNo']").val('');
	$("input[name='documentTitle']").val('');
	$("input[name='documentURL']").val('');
	$("input[name='documentdate']").val('2024-01-01');
	$(".popupWrap").removeClass("active");
			} else {
				console.log("response.success N");
			}
		},
		error:function(jqXHR,textStatus,errorThrown){
			alert("finalBtn ajax error\n"+textStatus+":"+errorThrown);
			return false;
		}
	});
	
});

//전자결재문서 선택파일 삭제
$(document).on("click",".delBtn",function(){
	const clickedFiles = document.querySelectorAll('input[name="landDevInfo_eDocFile"]:checked');
	console.log(clickedFiles);
	let dataArr = [];
	if (clickedFiles.length > 0) {
		alert('체크된 리스트가 없습니다.');
		return;
	}
	for(var i=0;i<clickedFiles.length;i++){
		let dataObj = {};
		var delEle=$(clickedFiles[i]).closest("#fileListUl");
		console.log($(clickedFiles[i]).parent().next().find('input'));
		let no = $(clickedFiles[i]).prev().prev().val();// D_000...
		let seq = $(clickedFiles[i]).prev().val();// seq
		
		dataObj.doc_no = no;
		dataObj.doc_seq = seq;
		
		dataArr.push(dataObj);
		//$(delEle).remove();
	}
	let delObj = {};
	delObj.delList = dataArr; 
	console.log(dataArr);
	url="/togi/deleteDosiDoc"; 
	$.ajax({
		url:url,
	   	type:'POST',
	   	contentType:"application/json",
	   	data:JSON.stringify(delObj),

		dataType:"json",
		beforeSend:function(request){
			console.log("beforesend ........................");
			loadingShow();
		},
		success:function(response){
			loadingHide();
			console.log(response);
			if (response.success="Y"){
				for(var i=0;i<clickedFiles.length;i++){
						let delEle=$(clickedFiles[i]).closest("#fileListUl");
						$(delEle).remove();
					}
					alert('삭제가 완료되었습니다.');
			} else {
				console.log("response.success N");
			}
		},
		error:function(jqXHR,textStatus,errorThrown){
			alert("finalBtn ajax error\n"+textStatus+":"+errorThrown);
			return false;
		}
	});
})


//완료처리버튼 클릭
$(document).on("click",".completeBtn",function(){
	console.log('토지개발 > 상세정보 > 완료처리 시작');
	let dataObj = {};
	
	dataObj.dosiNo = $('#dosi_no').val();
	console.log("**dataObj**");
	console.log(dataObj);
	console.log($(this).text());
	if(confirm('해당 토지정보를 ' + $(this).text() +'하시겠습니까?')) {
		let url="/togi/complete";
		$.ajax({
			url:url,
		   	type:'POST',
		   	contentType:"application/json",
		   	data:JSON.stringify(dataObj),
	
			dataType:"json",
			beforeSend:function(request){
				loadingShow();
			},
			success:function(response){
				loadingHide();
				console.log(response);
				if (response.result){
					alert(response.completeMsg + '처리 되었습니다.');
					$('#completeYn').text(response.compleStr);
				} else {
					console.log("response.success N");
				}
			},
			error:function(jqXHR,textStatus,errorThrown){
				alert("finalBtn ajax error\n"+textStatus+":"+errorThrown);
				return false;
			}
		});
	}
	 
	
	
});
function attachFileDownload(filePath, fileName, fileJisangNo, fileSeq, fileGubun) {
	commonFileDownload(filePath, fileName, fileJisangNo, fileSeq, fileGubun);
}