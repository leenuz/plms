$(document).ready(function(){
	console.log("--------------ready on ----------------");
})


$(document).on("click","#saveBtn",function(){
	
	console.log($("#saveForm").serialize());
	    var formSerializeArray = $('#saveForm').serializeArray(); // 폼 데이터를 직렬화하여 배열로 저장
	    console.log(formSerializeArray); // 배열 형태로 폼 데이터 출력
	    
	    var object = {}; // 빈 객체 생성
	    for (var i = 0; i < formSerializeArray.length; i++) { 
	        object[formSerializeArray[i]['name']] = formSerializeArray[i]['value']; // 배열의 각 항목을 객체로 변환
	    }
	    
		if(!object.cancleDate.trim()) {
			alert('해지일을 선택해주세요.');
			return;
		}
		
		if(!object.userName.trim()) {
			alert('담당자를 입력해주세요.');
			$('#saveForm input[name="userName"]').val('').focus();
			return;
		}
		
		console.log(object);
		
		
		url="/land/gover/insertGoverTerminationAdd"; 
		   $.ajax({
		   			
				url:url,
				type:'POST',
				contentType:"application/json",
				data:JSON.stringify(object),
				
				dataType:"json",
				beforeSend:function(request){
					console.log("beforesend ........................");
					loadingShow();
				},
				success:function(response){
					loadingHide();
					console.log(response);
					if (response.success="Y"){
						console.log("response.success Y");
						//console.log("response.resultData length:"+response.resultData.length);
						alert("정상적으로 등록 되었습니다.");
						history.back();
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
				error:function(jqXHR,textStatus,errorThrown){
					alert("finalBtn ajax error\n"+textStatus+":"+errorThrown);
					return false;
				}
		
		}); 
	
})