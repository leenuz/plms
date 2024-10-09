$(document).on("click",".editBtn",function() {
  const urlParams = new URL(location.href).searchParams;
  const idx = urlParams.get('idx');
  url = "/land/jisang/usePermitEdit?idx=" +idx;
     window.location = url;
});


//다운로드 스크립트
function downloadFile(filePath, fileName, fileJisangNo, fileSeq, fileGubun) {
	console.log(filePath);
	console.log(fileName);
	console.log(fileJisangNo);
	console.log(fileSeq);
	console.log(fileGubun);
	
	commonFileDownload(filePath, fileName, fileJisangNo, fileSeq, 'permit');
}


   $(document).on("click","#sangsinCancelBtn",function(){
	console.log("sangsinCancelBtn");
	//var dataObj = [];
	var pmt_no=$("#pmt_no").val();
	//dataObj.pmt_no=pmt_no;
	var dataObj={"pmt_no":pmt_no} 
	url="/land/jisang/updateJisangPmtSangsinCancel";
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
			 				console.log("response.success Y");
			 				//console.log("response.resultData length:"+response.resultData.length);
			 				alert("결재가 취소 되었습니다.");
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
			 			alert("mainSaveBtn ajax error\n"+textStatus+":"+errorThrown);
			 			return false;
			 		}

			    	});
	
   })
   
   
   
   $(document).on("click","#deleteBtn",function(){
   console.log("deleteBtn");
   //var dataObj = [];
   var pmt_no=$("#pmt_no").val();
   //dataObj.pmt_no=pmt_no;
   var dataObj={"pmt_no":pmt_no} 
   url="/land/jisang/updateJisangPmtSangsinDel";
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
   		 				console.log("response.success Y");
   		 				//console.log("response.resultData length:"+response.resultData.length);
   		 				alert("삭제 되었습니다.");
						window.history.back();
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
   		 			alert("mainSaveBtn ajax error\n"+textStatus+":"+errorThrown);
   		 			return false;
   		 		}

   		    	});

     })