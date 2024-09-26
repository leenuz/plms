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
		
		
		
		console.log(object);
	
})