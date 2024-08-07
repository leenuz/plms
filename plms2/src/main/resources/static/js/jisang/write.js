$(document).ready(function(){
	console.log('jisang write.js start');
	$("#loadingBar").hide();
	$('#date-range').daterangepicker({
		    opens: 'left',
		    drops: 'down',
		    autoApply: true,
		    locale: {
		      format: 'YYYY-MM-DD',
		      separator: ' - ',
		      applyLabel: '확인',
		      cancelLabel: '취소',
		      fromLabel: 'From',
		      toLabel: 'To',
		      customRangeLabel: 'Custom',
		      daysOfWeek: ['일', '월', '화', '수', '목', '금', '토'],
		      monthNames: ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'],
		      firstDay: 0
		    },
		   // timePicker: true,                        // 시간 노출 여부
		  //  showDropdowns: true,                     // 년월 수동 설정 여부
		  //  autoApply: true,                         // 확인/취소 버튼 사용여부
		  //  timePicker24Hour: true,                  // 24시간 노출 여부(ex> true : 23:50, false : PM 11:50)
		  //  timePickerSeconds: true,                 // 초 노출 여부
		  //  singleDatePicker: true                   // 하나의 달력 사용 여부

  	});
  	
  	$('#date-range1').daterangepicker({
		    opens: 'left',
		    drops: 'down',
		    autoApply: true,
		    locale: {
		      format: 'YYYY-MM-DD',
		      separator: ' - ',
		      applyLabel: '확인',
		      cancelLabel: '취소',
		      fromLabel: 'From',
		      toLabel: 'To',
		      customRangeLabel: 'Custom',
		      daysOfWeek: ['일', '월', '화', '수', '목', '금', '토'],
		      monthNames: ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'],
		      firstDay: 0
		    },
		   // timePicker: true,                        // 시간 노출 여부
		  //  showDropdowns: true,                     // 년월 수동 설정 여부
		  //  autoApply: true,                         // 확인/취소 버튼 사용여부
		  //  timePicker24Hour: true,                  // 24시간 노출 여부(ex> true : 23:50, false : PM 11:50)
		  //  timePickerSeconds: true,                 // 초 노출 여부
		  //  singleDatePicker: true                   // 하나의 달력 사용 여부

  	});
  	
  	getSidoMaster();

	
	
})

$(document).on("change","#jisa",function(){
	changPipeName();
});

$(document).on("click","#addrButton",function(){
	console.log("addrButton start");
	
	
	console.log("ra1 value:"+$("input[name='ra1']:checked").val());
	var racheck=$("input[name='ra1']:checked").val();
	
	var url="";
	var requestData;
	
	
	
	if (racheck==0){
		if (isEmpty($("#saddress").val(),'s')==""){
			alert("주소를 입력해주세요!");
			return;
		}
	
		 url="/api/getAddressData";
		 requestData={"address":$("#saddress").val(),"racheck":racheck}
	}
	else {
		 url="/api/getAddressData";
		 requestData={"address":$("#dongmaster option:selected").val(),"racheck":racheck}
		 
	}
	//changPipeName();
	//getAddress
	
	console.log("requestData");
	console.log(requestData);
	 $.ajax({
			
				url:url,
				type:'POST',
				contentType:"application/json",
				data:JSON.stringify(requestData),
				
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
						console.log("response.resultData length:"+response.resultData.length);
						$("#popup_bg").show();
						$("#popup").show(500);
						//$("#addrPopupLayer tbody td").remove();
						for(var i=0;i<response.resultData.length;i++){
							$("#addrPopupTable tbody").append("<tr><td>"+response.resultData[i].juso+"</td><td><button>선택</button></td></tr>");
						}
					}
					else {
						console.log("response.success N");
					}
				},
				error:function(jqXHR,textStatus,errorThrown){
					alert("getAddressData ajax error\n"+textStatus+":"+errorThrown);
				}
			
		}); 
});




    $(document).on("click",".popup_bg, .close",function () {   // [2]
        $(".popup_bg").hide();
        $(".popup").hide(200);
    });
    
    $(document).on("click","#ra1",function(){
		$("#divAddress2").hide();
		$("#divAddress1").show();
	})
	$(document).on("click","#ra2",function(){
		$("#divAddress1").hide();
		$("#divAddress2").show();
	})
	
	$(document).on("change","#sidomaster",function(){
		getSigunMaster($("#sidomaster option:selected").val());
	})
	
	
	$(document).on("change","#sigunmaster",function(){
		getDongMaster($("#sigunmaster option:selected").val());
	})
	
	


function changPipeName(){
			 var url="/api/getPipeName";
			 
	var requestData={"jisaIdx":$("#jisa").val()};
	console.log(requestData);
		 $.ajax({
			
				url:url,
				type:'POST',
				contentType:"application/json",
				data:JSON.stringify(requestData),
				async:false,
				dataType:"json",
				success:function(response){
					console.log(response);
					if (response.success="Y"){
						console.log("response.success Y");
						console.log("response.resultData length:"+response.resultData.length);
						console.log(response.resultData[0]);
						$("#pipe_name option").remove();
						$("#pipe_name").append('<option>선택</option>');
						for(var i=0;i<response.resultData.length;i++){
							$("#pipe_name").append('<option>'+response.resultData[i].jzn_zone_name+'</option>');
						}
						
					}
					else {
						console.log("response.success N");
					}
				},
				error:function(jqXHR,textStatus,errorThrown){
					alert("changPipeName ajax error\n"+textStatus+":"+errorThrown);
				}
			
		});
}



function getSidoMaster(){
			 var url="/api/getSidoMaster";
			 
	var requestData={};
	console.log(requestData);
		 $.ajax({
			
				url:url,
				type:'POST',
				contentType:"application/json",
				data:JSON.stringify(requestData),
				async:false,
				dataType:"json",
				success:function(response){
					console.log(response);
					if (response.success="Y"){
						console.log("response.success Y");
						console.log("response.resultData length:"+response.resultData.length);
						console.log(response.resultData);
						$("#sidomaster option").remove();
						$("#sidomaster").append('<option>선택</option>');
						for(var i=0;i<response.resultData.length;i++){
							$("#sidomaster").append('<option value='+response.resultData[i].sm_lcode+'>'+response.resultData[i].sm_name+'</option>');
						}
						
					}
					else {
						console.log("response.success N");
					}
				},
				error:function(jqXHR,textStatus,errorThrown){
					alert("getSidoMaster ajax error\n"+textStatus+":"+errorThrown);
				}
			
		});
}

function getSigunMaster(key){
			 var url="/api/getSigunMaster";
			 
	var requestData={"key":key};
	console.log(requestData);
		 $.ajax({
			
				url:url,
				type:'POST',
				contentType:"application/json",
				data:JSON.stringify(requestData),
				async:false,
				dataType:"json",
				success:function(response){
					console.log(response);
					if (response.success="Y"){
						console.log("response.success Y");
						console.log("response.resultData length:"+response.resultData.length);
						console.log(response.resultData);
						$("#sigunmaster option").remove();
						$("#sigunmaster").append('<option>선택</option>');
						for(var i=0;i<response.resultData.length;i++){
							$("#sigunmaster").append('<option value='+response.resultData[i].sm_lcode+'>'+response.resultData[i].sm_gugun+'</option>');
						}
						
					}
					else {
						console.log("response.success N");
					}
				},
				error:function(jqXHR,textStatus,errorThrown){
					alert("getSidoMaster ajax error\n"+textStatus+":"+errorThrown);
				}
			
		});
}

function getDongMaster(key){
			 var url="/api/getDongMaster";
			 
	var requestData={"key":key};
	console.log(requestData);
		 $.ajax({
			
				url:url,
				type:'POST',
				contentType:"application/json",
				data:JSON.stringify(requestData),
				async:false,
				dataType:"json",
				success:function(response){
					console.log(response);
					if (response.success="Y"){
						console.log("response.success Y");
						console.log("response.resultData length:"+response.resultData.length);
						console.log(response.resultData);
						$("#dongmaster option").remove();
						$("#dongmaster").append('<option>선택</option>');
						for(var i=0;i<response.resultData.length;i++){
							$("#dongmaster").append('<option value='+response.resultData[i].bm_lcode+'>'+response.resultData[i].bm_dong+'</option>');
						}
						
					}
					else {
						console.log("response.success N");
					}
				},
				error:function(jqXHR,textStatus,errorThrown){
					alert("getDongMaster ajax error\n"+textStatus+":"+errorThrown);
				}
			
		});
}

$(document).on("keyup","#saddress",function(e){
	console.log("keyup");
	console.log(e.keyCode);
	
		//if (e.keyCode=="13") $("addrButton").trigger("click");
		return false;
	
});
$(document).on("keyup","#jisangWriteForm",function(e){
	console.log("keyup");
	console.log(e.keyCode);
	
		//if (e.keyCode=="13") $("addrButton").trigger("click");
		return false;
	
});





