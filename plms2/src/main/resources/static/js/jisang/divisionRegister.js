// 커스텀 selectbox

createCustomLiDivisionRegist();

function createCustomLiDivisionRegist() {
    const contentItems = document.querySelectorAll('.selectContentArea');

    contentItems.forEach(contentItem => {

        // 추가
        if (contentItem.classList.contains('customLiProcessed')) {
            return;
        }
        const notsetAddSelectBox = contentItem.querySelector('select');
        // select가 없으면 return
        if (!notsetAddSelectBox) return;

        const customSelectBox = contentItem.querySelector('.customSelectBox');
        const customSelectBtns = customSelectBox.querySelector('.customSelectBtns');

        for (let i = 0; i < notsetAddSelectBox.length; i++) {

            const optionValue = notsetAddSelectBox.options[i].value;
            if(optionValue != ''){
            const li = document.createElement('li');
            const button = document.createElement('button');
            button.classList.add('moreSelectBtn');
            button.type = 'button';
            button.textContent = optionValue;
            li.appendChild(button);
            customSelectBtns.appendChild(li);
            }
        }

        // 함수가 한번 적용된 selectContentArea에 class 붙여서 구분한다. 중복실행 되지 않도록
        contentItem.classList.add('customLiProcessed');
    });
}

// 동적으로 추가된 요소에 이벤트를 바인딩하는 방법
$(document).on('click', '.customSelectView', function() {
    // 버튼 클릭 시 실행할 코드
    $(this).toggleClass('active');

    if ($(this).next()) {
        $(this).next().toggleClass('active');

    }
});

// .moreSelectBtn 요소에 대한 클릭 이벤트 등록
$(document).on('click', '.moreSelectBtn', function() {
    var moreSelectBtnText = $(this).text();

    const parentMoreSelectBtn = $(this).closest('.customSelectBtns');
    const EditCustomViewBtn = parentMoreSelectBtn.prev('.customSelectView');

//    // EditCustomViewBtn의 모든 자식을 제거
    EditCustomViewBtn.empty();
//
//    // 새로운 텍스트 노드를 추가합니다.
    EditCustomViewBtn.text(moreSelectBtnText);
//
    EditCustomViewBtn.removeClass('active');
    parentMoreSelectBtn.removeClass('active');
//
//    // 선택한 걸 select의 value값으로 변경하기
    const nearByContent = $(this).closest('.selectContentArea');
    const nearBySelectBox = nearByContent.find('select');
    nearBySelectBox.val(moreSelectBtnText);
    console.log(`Selected value: ${nearBySelectBox.val()}`);
});



$(document).on("click","#docFileDelBtn",function(){
	console.log("---------------docFileDelBtn---------------");
	var $currentElement = $(this);
	console.log($(this).parent().parent().html());
	var inputFseq=$(this).parent().parent().find("#fseq").val();
	var inputValue=$(this).parent().parent().find(".notWriteInput").val();
	console.log(inputValue);
	if (inputValue!=null || inputValue!=""){
		var params={"dfile_name":inputValue,"jisang_no":$("#hiddenJisangNo").val(),"fseq":inputFseq,"docNo":"2"}
		
		console.log(params);
		
		
		//임시파일 삭제
		$.ajax({
		          url: "/jisang/deleteJisangTmpFile",
		          type: "POST",
		          data: params,
				  
		})
		.done(function (fragment) {
		       /*loadingHide();
		       alert("저장이 완료 되었습니다.");*/
			   //$(this).parent().parent().find(".notWriteInput").val("");
			   $currentElement.parent().parent().find(".notWriteInput").val("");   
			   $currentElement.parent().parent().find(".notWriteInput").attr('placeholder','');
		    });
					
	}
	//console.log($(this).parent().parent().find(".notWriteInput").val(""));
	
})




		//파일 업로드 핸들러
		var uploadFiles=new Array();

$(document).ready(function(){
			var objDragAndDrop = $(".fileUploadBox");
		        $(document).on("dragenter",".fileUploadBox",function(e){
		        e.stopPropagation();
		        e.preventDefault();
		        $(this).css('border', '2px solid #0B85A1');
		    });
		    $(document).on("dragover",".fileUploadBox",function(e){
		        e.stopPropagation();
		        e.preventDefault();
		    });
		    $(document).on("drop",".fileUploadBox",function(e){

		        $(this).css('border', '2px dotted #0B85A1');
		        e.preventDefault();
		        var files = e.originalEvent.dataTransfer.files;

		        handleFileUpload(files,objDragAndDrop);
		    });

		    $(document).on('dragenter', function (e){
		        e.stopPropagation();
		        e.preventDefault();
		    });
		    $(document).on('dragover', function (e){
		      e.stopPropagation();
		      e.preventDefault();
		      objDragAndDrop.css('border', '2px dotted #0B85A1');
		    });
		    $(document).on('drop', function (e){
		        e.stopPropagation();
		        e.preventDefault();
		    });
		    //drag 영역 클릭시 파일 선택창
		    objDragAndDrop.on('click',function (e){
		        $('#landTerminationRegistration_myPcFiles').trigger('click');
		    });

		    $('input[name=fileupload]').on('change', function(e) {
		        var files = e.originalEvent.target.files;
		        handleFileUpload(files,objDragAndDrop);
		    });
			
			$('input[name=landTerminationRegistration_myPcFiles01]').on('change', function(e) {
			        var files = e.originalEvent.target.files;
			        handleFileUpload1(files,this,"01");
			});
			$('input[name=landTerminationRegistration_myPcFiles02]').on('change', function(e) {
			       var files = e.originalEvent.target.files;
			       handleFileUpload1(files,this,"02");
			});
			$('input[name=landTerminationRegistration_myPcFiles03]').on('change', function(e) {
				       var files = e.originalEvent.target.files;
				       handleFileUpload1(files,this,"03");
					   
			});
			$('input[name=landTerminationRegistration_myPcFiles04]').on('change', function(e) {
				       var files = e.originalEvent.target.files;
				       handleFileUpload1(files,this,"04");
			});
			$('input[name=landTerminationRegistration_myPcFiles05]').on('change', function(e) {
				       var files = e.originalEvent.target.files;
				       handleFileUpload1(files,this,"05");
			});
			$('input[name=landTerminationRegistration_myPcFiles06]').on('change', function(e) {
				       var files = e.originalEvent.target.files;
				       handleFileUpload1(files,this,"06");
			});
			$('input[name=landTerminationRegistration_myPcFiles07]').on('change', function(e) {
				       var files = e.originalEvent.target.files;
				       handleFileUpload1(files,this,"07");
			});
			$('input[name=landTerminationRegistration_myPcFiles08]').on('change', function(e) {
				       var files = e.originalEvent.target.files;
				       handleFileUpload1(files,this,"08");
			});
		    function handleFileUpload(files,obj)
		    {
		       for (var i = 0; i < files.length; i++)
		       {
		            var fd = new FormData();
		            fd.append('file', files[i]);

		            var status = new createStatusbar($("#fileTitleUl"),files[i].name,files[i].size,i); //Using this we can set progress.
		          //  status.setFileNameSize(files[i].name,files[i].size);
		            sendFileToServer(fd,status);

		       }
		    }
			
			
			
			function handleFileUpload1(files,obj,idx)
			    {
			       for (var i = 0; i < files.length; i++)
			       {
			            var fd = new FormData();
			            fd.append('file', files[i]);

			          //  var status = new createStatusbar($("#fileTitleUl"),files[i].name,files[i].size,i); //Using this we can set progress.
			          //  status.setFileNameSize(files[i].name,files[i].size);
					    console.log($(obj).parent().parent().parent().html());
						var changeObj=$(obj).parent().parent().find("#req_doc_file"+idx).val(files[i].name);
						console.log("--------changeObj---------------");
						console.log(changeObj);
			            sendFileToServer1(fd,status,idx);

			       }
			    }

		    var rowCount=0;
		    function createStatusbar(obj,name,size,no){
		        console.log("----------start createStatusBar------------");
		            console.log(obj.html());

		        var sizeStr="";
		                                var sizeKB = size/1024;
		                                if(parseInt(sizeKB) > 1024){
		                                    var sizeMB = sizeKB/1024;
		                                    sizeStr = sizeMB.toFixed(2)+" MB";
		                                }else{
		                                    sizeStr = sizeKB.toFixed(2)+" KB";
		                                }

		        var row='<ul class="contents" id="fileListUl">';
		        row+='<li class="selectWidth content checkboxWrap">';
		        row+='<input type="checkbox" id="landRightsRegistration_attachFile'+no+'" name="landRightsRegistration_attachFile" >';
		        row+='<label for="landRightsRegistration_attachFile'+no+'"></label>';
		        row+='</li>';
		        row+='<li class="content registDateWidth"><input type="text" id="filename" th:placeholder="'+'[[${val.pa_file_path}]]'+'" class="notWriteInput" readonly></li>';
		        row+='<li class="content fileNameWidth"><input type="text" id="filename" placeholder="'+name+'" class="notWriteInput" readonly></li>';
		        row+='<li class="content"><button class="viewDetailButton" th:onclick="openFilePopup([[${val.pa_file_path}]])">보기</button></li></ul>';
		        obj.after(row);

		        var radio=$(row).find('input');
		        console.log("---------------radio checkbox----------");
		        $(radio).find('input').attr("disabled",false);
		        console.log($(radio).parent().html());
		    }

		    function sendFileToServer(formData,status)
		    {
		        var uploadURL = "/jisang/fileUpload/post"; //Upload URL
		        var extraData ={}; //Extra Data.
		        var jqXHR=$.ajax({
		                xhr: function() {
		                var xhrobj = $.ajaxSettings.xhr();
		                if (xhrobj.upload) {
		                        xhrobj.upload.addEventListener('progress', function(event) {
		                            var percent = 0;
		                            var position = event.loaded || event.position;
		                            var total = event.total;
		                            if (event.lengthComputable) {
		                                percent = Math.ceil(position / total * 100);
		                            }
		                            //Set progress
		                          //  status.setProgress(percent);
		                        }, false);
		                    }
		                return xhrobj;
		            },
		            url: uploadURL,
		            type: "POST",
		            contentType:false,
		            processData: false,
		            cache: false,
		            data: formData,
		            success: function(data){
		               // status.setProgress(100);
		                console.log(data);
		                console.log(data.resultData);
		                //$("#status1").append("File upload Done<br>");
		                uploadFiles.push(data.resultData.fpath);
		                //allCheckEventLandRightsRegist();
		            }
		        });
		        //status.setAbort(jqXHR);
		    }
			
			
			function sendFileToServer1(formData,status,no)
			    {
					var idx=$("#hiddenJisangNo").val();
					console.log($("#hiddenJisangNo").val());
			        var uploadURL = "/jisang/fileUpload/reqDoc?idx="+idx; //Upload URL
			        var extraData ={}; //Extra Data.
			        var jqXHR=$.ajax({
			                xhr: function() {
			                var xhrobj = $.ajaxSettings.xhr();
			                if (xhrobj.upload) {
			                        xhrobj.upload.addEventListener('progress', function(event) {
			                            var percent = 0;
			                            var position = event.loaded || event.position;
			                            var total = event.total;
			                            if (event.lengthComputable) {
			                                percent = Math.ceil(position / total * 100);
			                            }
			                            //Set progress
			                          //  status.setProgress(percent);
			                        }, false);
			                    }
			                return xhrobj;
			            },
			            url: uploadURL,
			            type: "POST",
			            contentType:false,
			            processData: false,
			            cache: false,
			            data: formData,
			            success: function(data){
			               // status.setProgress(100);
			                console.log(data);
			                console.log(data.resultData);
			                //$("#status1").append("File upload Done<br>");
			                uploadFiles.push(data.resultData.fpath);
			                //allCheckEventLandRightsRegist();
			            }
			        });
			        //status.setAbort(jqXHR);
			    }

    //해지 정보 리스트 업데이트
    $('input[name="togiBunhalCancelYn"]').each(function() {
      if ($(this).prop('checked')) {
        console.log('Checkbox is already checked.');

        // 체크박스를 클릭하지 않지만, change 이벤트 발생
        $(this).trigger('change');
      }
    });
}); //end ready





/*임시저장 버튼 클릭시*/
$(document).on("click",".temporarySaveBtn",function(){

	   var formSerializeArray = $('#saveForm').serializeArray();
	   var tojiBunhalArray = $('#tojiBunhalForm').serializeArray();
	   var submitArray = $('#submitForm').serializeArray();

	   var object = {};
	   for (var i = 0; i < formSerializeArray.length; i++){
		if (formSerializeArray[i].name=="togiBunhalJisangNo") continue;
				else if (formSerializeArray[i].name=="togiBunhalAddr") continue;
				else if (formSerializeArray[i].name=="togiBunhalTogiType") continue;
				else if (formSerializeArray[i].name=="togiBunhalJimokText") continue;
				else if (formSerializeArray[i].name=="togiBunhalJiJukArea") continue;
				else if (formSerializeArray[i].name=="togiBunhalPyeonibArea") continue;
				else if (formSerializeArray[i].name=="togiBunhalJasanNo") continue;
				else if (formSerializeArray[i].name=="togiBunhalPipeYn") continue;
				else if (formSerializeArray[i].name=="togiBunhalCancelYn") continue;
				else if (formSerializeArray[i].name=="togiBunhalDemise") continue;
				else if (formSerializeArray[i].name=="togiBunhalAccountYn") continue;
				
	       object[formSerializeArray[i]['name']] = formSerializeArray[i]['value'];
	   }
	   
	   
	   console.log("대상토지 정보");
	   	var togiDatas=[];
	   	var togiUls=$("#tojiDiv #tojiUl");
	   	console.log(togiUls);
	   	for(var i=0;i<togiUls.length;i++){
			var togiJisa=$("#jisa").val();
	   		var togiManageNo=$(togiUls[i]).find("input[name='togiBunhalJisangNo']").val();
	   		var togiaddress=$(togiUls[i]).find("input[name='togiBunhalAddr'").val();
			var togiTogiType=$(togiUls[i]).find("select[name='togiBunhalTogiType']").val();
	   		var togiJimokText=$(togiUls[i]).find("input[name='togiBunhalJimokText']").val();
	   		var togiJijukArea=$(togiUls[i]).find("input[name='togiBunhalJiJukArea']").val();
	   		var togiPyeonibArea=$(togiUls[i]).find("input[name='togiBunhalPyeonibArea']").val();
	   		var togiJasanNo=$(togiUls[i]).find("input[name='togiBunhalJasanNo']").val();
			var togiPipeYn="N";
			if ($(togiUls[i]).find("input:checkbox[name='togiBunhalPipeYn']").is(":checked")==true){
				togiPipeYn="Y";
			};
			var togiCancelYn="N";
			if ($(togiUls[i]).find("input:checkbox[name='togiBunhalCancelYn']").is(":checked")==true){
				console.log("############");	
				togiCancelYn="Y";
			}
			 
			//var togiCancelYn=ljsIsNull($(togiUls[i]).find("input[name='togiBunhalCancelYn']").val())?'off':'on';
			var togiDemise="N";
			if ($(togiUls[i]).find("input:checkbox[name='togiBunhalDemise']").is(":checked")==true){
				togiDemise="Y";
			}
			var gover_own_yn="";
			if (togiTogiType=="국유지") gover_own_yn='Y';
			else gover_own_yn='N';
			var togiAccountYn=$(togiUls[i]).find("select[name='togiBunhalAccountYn']").val();
			var togiBunhalStatus="임시저장";
	   		var togiSidoNm=$(togiUls[i]).find("#togisido_nm").val();
			var togiSggNm=$(togiUls[i]).find("#togisgg_nm").val();
			var togiEmdNm=$(togiUls[i]).find("#togiemd_nm").val();
			var togiRiNm=$(togiUls[i]).find("#togiri_nm").val();
			
			var togiJibun=$(togiUls[i]).find("#togijibun").val();
			var togiPnu=$(togiUls[i]).find("#togipnu").val();
	   		
	   		//console.log("togiManageNo:"+togiManageNo);
	   		var togiObj={
				"togiSidoNm":ljsIsNull(togiSidoNm)?'':togiSidoNm
				,"togiSggNm":togiSggNm
				,"togiEmdNm":togiEmdNm
				,"togiRiNm":togiRiNm
				,"togiJibun":togiJibun
				,"togiPnu":togiPnu
				,"togiManageNo":togiManageNo
	   			,"togiaddress":togiaddress.trim()
				,"togiTogiType":togiTogiType
	   			,"togiJimokText":togiJimokText
	   			,"togiJijukArea":ljsIsNull(togiJijukArea)?'':togiJijukArea
	   			,"togiPyeonibArea":togiPyeonibArea
	   			,"togiJasanNo":togiJasanNo
				,"togiPipeYn":togiPipeYn
	   			,"togiCancelYn":togiCancelYn
	   			,"togiDemise":togiDemise
				,"togiAccountYn":togiAccountYn
				,"togiBunhalStatus":togiBunhalStatus
				,"togiGoverOwnYn":gover_own_yn
				,"togiJisa":togiJisa
				
	   			
	   		}
	   		console.log(togiObj);
	   		togiDatas.push(togiObj);
	   	}
	   
	     console.log("----------togiDatas-------------");
		 console.log(togiDatas);
		 
		 object.togiDatas=togiDatas;

  /*for (var i = 0; i < submitArray.length; i++){
	       object[submitArray[i]['name']] = submitArray[i]['value'];
	   }*/
//	 var groupedData = {};
     var allCheckboxes = {};

     // 모든 체크박스를 추적하기 위한 객체를 생성합니다
    /* $('#tojiBunhalForm input[type="checkbox"]').each(function() {
         var name = $(this).attr('name');
         var value = $(this).is(':checked') ? $(this).val() : ''; // 체크된 경우 값, 그렇지 않으면 빈 문자열
         var match = name.match(/_(\d+)$/); // 끝자리 숫자 추출
         if (match) {
             var index = match[1];
             if (!allCheckboxes[index]) {
                 allCheckboxes[index] = {};
             }
             allCheckboxes[index][name] = value; // 체크박스의 데이터를 추가
         }
     });*/

     // 폼 데이터를 순회하며 그룹화
     /*tojiBunhalArray.forEach(function(item) {
         var match = item.name.match(/_(\d+)$/); // 끝자리 숫자 추출
         if (match) {
             var index = match[1];
             if (!object[index]) {
                 object[index] = {}; // 해당 숫자의 그룹이 없으면 초기화
             }
             object[index][item.name] = item.value; // 그룹에 데이터 추가
         }
     });*/

     // 체크박스의 값을 그룹화된 데이터에 추가
    /* for (var index in allCheckboxes) {
         if (!object[index]) {
             object[index] = {}; // 해당 인덱스가 없으면 초기화
         }
         // 모든 체크박스 데이터를 그룹화된 데이터에 병합
         for (var name in allCheckboxes[index]) {
             object[index][name] = allCheckboxes[index][name];
         }
     }*/

//     // 필드 이름 목록을 정의
//     var fieldNames = ['bunhalAddres','divisionRegistSelectBox02','jimok', 'jijuk', 'pyenip','pipe','terminate','jaryo','divisionRegistSelectBox03']; // 예시 필드명
//     Object.keys(object).forEach(function(index) {
//         fieldNames.forEach(function(name) {
//             if (!object[index][name]) {
//                 object[index][name] = ''; // 누락된 필드를 빈 문자열로 설정
//             }
//         });
//     });

 console.log(object);
//	   var json = JSON.stringify(formSerializeArray);

 /*// 필수 값 체크
    let errors = [];
    var jaryoChecked = 0 ;
    var errorCount = 0;

     if (!object.divisionRegistSelectBox01) {
//            errors.push('회계처리 필요 여부는 필수 입력 항목입니다.');
            errorCount++;
        }

   Object.keys(object).forEach(function(j) {

    if (Number.isInteger(Number(j))) {
       if (!object[j]['divisionRegistSelectBox02_' + j] ||
           !object[j]['jimok_' + j] ||
           !object[j]['jijuk_' + j] ||
           !object[j]['pyenip_' + j]||
           !object[j]['divisionRegistSelectBox03_' + j] )  {
           errorCount++;
       }

       // 'jaryo_' 필드가 "on"으로 체크되어 있는지 확인
       if (object[j]['jaryo_' + j] === "on") {
           jaryoChecked++;
       }
       }
   });

         if (!object.bunhal_reason) {
           errorCount++;
       } else if (object.bunhal_reason.length < 10) {
           errors.push('분할사유는 최소 10자 이상이어야 합니다.');
       }
       if (!object.bunhal_comment) {
            errorCount++;
       } else if (object.bunhal_comment.length < 10) {
           errors.push('검토의견은 최소 10자 이상이어야 합니다.');
       }

        if(errorCount>0 ){
        errors.push('* 표시는 필수 입력값입니다.');
        }

        if(jaryoChecked == 0 ){
				errors.push('자료 승계는 최소 1개 이상 선택해야 합니다.');
        }

	    if (errors.length > 0) {
	        alert(errors.join('\n')); // 에러 메시지들을 알림창으로 표시
	        return null; // 필수 값이 누락된 경우 null 반환
   		}
*/

			url="/jisang/divisionRegisterSave"; 
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
			   						console.log("response.resultData length:"+response.resultData.length);
									alert("정상적으로 등록 되었습니다.");
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


//   주소 검색
$(document).on("click",".searchAddressBtn",function(){

//var formSerializeArray = $('#searchForm').serializeArray();

  //var buttonId = $(this).attr("id").split("_")[1];
//    formSerializeArray.push({
//        name: 'selectedButton',
//        value: buttonId
//    });
    // 가져온 id 값을 콘솔에 출력
//
//    const data_index = $(this).attr("data-index");

//    $('#choiceBtn').attr('data-index', buttonId);
console.log($(this).parent().parent().html());
		var idObj=$(this).parent().parent().find(".addressData input");
		var id=$(this).parent().parent().find("#bunhalIndex").val();
		var sido_nm=$(this).parent().parent().find("#togisido_nm").val();
		var sgg_nm=$(this).parent().parent().find("#togisgg_nm").val();
		var emd_nm=$(this).parent().parent().find("#togiemd_nm").val();
		var ri_nm=$(this).parent().parent().find("#togiri_nm").val();
		var jibun=$(this).parent().parent().find("#togijibun").val();
		
		console.log(idObj.val()); 
    	console.log(id);
	
		var addr=idObj.val();
		var datas={"address":addr,"sido_nm":sido_nm,"sgg_nm":sgg_nm,"emd_nm":emd_nm,"ri_nm":ri_nm,"jibun":jibun}
					   console.log($(this).parent().html());
					   console.log(datas);
					   
				  
				   //searchResultPopDiv 화면뿌릴 DIV
				   
				   if (addr==null || addr=="" || addr==undefined) {
					alert("주소를 입력해주세요.");
					return;
				   }
				 
				  
				
				   
				   
				   
				   
				   	   $.ajax({
				   	   	  url: "/jisang/getBunhalJIjukSelect",
				   	   	  type: "POST",
				   	   	  data: datas,
				   	   })
				   	   .done(function (fragment) {
//				  var buttonIdx = fragment.find('button#choiceBtn');
//				  buttonIdx.attr('data-index', buttonId);
 console.log("***fragment***");
 console.log(fragment);
				   	      $('#searchResultPopDiv').replaceWith(fragment);
						  const popupOpen = document.querySelector("#searchResultsPopup .popupWrap");
                                console.log($(popupOpen).html());
						  	   $(popupOpen).addClass("open");
						  	   popupOpen.classList.add("active");
                        	 $('.resultSelectBtn').attr('data-index', id);
                           	$('.saveBtn').attr('data-index', id);
				   	   	});

});

// 주소 선택 클릭
$(document).on("click",".resultSelectBtn",function(){
var id =  $('.resultSelectBtn').data('index');

console.log("***클릭된 id*** : " + id);
console.log($(this).parent().parent().html());
var pnu=$(this).parent().parent().find(".popContent01").html();
	var juso=$(this).parent().parent().find(".popContent02").html();
	var jibun=$(this).parent().parent().find(".popContent03").html();
    var sido_nm=$(this).parent().parent().find(".popContent0201").html();
	var sgg_nm=$(this).parent().parent().find(".popContent0202").html();
	var emd_nm=$(this).parent().parent().find(".popContent0203").html();
	var ri_nm=$(this).parent().parent().find(".popContent0204").html();
	
	var openerEle=$("#tojiDiv");
//	console.log($(openerEle).html());
	var openerTargetEle=openerEle.find('input[id="bunhalIndex"][value="'+id+'"]');
	//console.log(openerTargetEle.parent().parent().html());
	openerTargetEle.parent().parent().find("#bunhalAddres").val(sido_nm+" "+sgg_nm + " " + emd_nm +" " +ri_nm  + " " + jibun);
	openerTargetEle.parent().parent().find("#togisido_nm").val(sido_nm);
	openerTargetEle.parent().parent().find("#togisgg_nm").val(sgg_nm);
	openerTargetEle.parent().parent().find("#togiemd_nm").val(emd_nm);
	openerTargetEle.parent().parent().find("#togiri_nm").val(ri_nm);
	openerTargetEle.parent().parent().find("#togijibun").val(jibun);
	openerTargetEle.parent().parent().find("#togipnu").val(pnu);
$(".bunhalAddres_" + id).attr("readonly", true);
$(".bunhalAddres_"+id).val(sido_nm+" "+sgg_nm + " " + emd_nm +" " +ri_nm  + " " + jibun);



//		$("#sido_nm").val(sido_nm);
//        $("#sgg_nm").val(sgg_nm);
//        $("#emd_nm").val(emd_nm);
//        $("#ri_nm").val(ri_nm);
//        $("#mpnu").val(pnu);
//        $("#mjibun").val(jibun);
})

//pnu없이 선택/
$(document).on("click",".saveBtn",function(){
    var id =  $('.saveBtn').data('index');
    $(".bunhalAddres_" + id).val("");
	$(".bunhalAddres_" + id).removeAttr("readonly");

	var targetDiv=$("#searchResultPopDiv").parent().find("#searchResultPopup").find(".popupWrap");
	$(".popupWrap").removeClass("active");
    console.log(id);

});

$(document).on("click","#popupCloseBtn",function(){

	var targetDiv=$("#searchResultPopDiv").parent().find("#searchResultPopup").find(".popupWrap");
	$(".popupWrap").removeClass("active");
//	$(".popupWrap").toggleClass("active");
});

$(document).on("click",".topCloseBtn",function(){

	var targetDiv=$("#searchResultPopDiv").parent().find("#searchResultPopup").find(".popupWrap");
	$(".popupWrap").removeClass("active");
//	$(".popupWrap").toggleClass("active");
});
var index = 1;
$(document).on("click","#addBtn",function(){
	console.log("----------------editTojiBtn-------------------------");


		var thisUl=$(this).parent().parent().parent().parent();
		console.log(thisUl);
		var addUl=$("#tojiHiddenUl").html();
		console.log(addUl);
        //var findButton=$()
//		var input=$(thisUl).find("input");

		var addDiv = $('<ul class="contents" id="tojiUl">'+addUl+'</ul>');
		addDiv.find("#bunhalIndex").val(index);
		console.log($(addDiv).html());
		 
		//멀티체크박스 클릭을 위한 조치
		var pipe = addDiv.find('input.pipe_');
		pipe.attr({'class':'pipe_'+index,'name' : 'pipe_'+index,'id': 'pipe_'+index});
		var label1 = pipe.closest('li').find('label').first();
		label1.attr({'for': 'pipe_'+index,'name' : 'pipe_'+index});
					 
					 
		var terminate = addDiv.find('input.terminate_');
//		terminate.attr({'class':'terminate_'+index,'id': 'terminate_'+index,'name' : 'terminate_'+index});
		terminate.attr({'class':'terminate_'+index,'id': 'terminate_'+index,'name' : 'togiBunhalCancelYn'});
		var label2 = terminate.closest('li').find('label').first();
		label2.attr({'for': 'terminate_'+index,'name' : 'terminate_'+index});
		
		var jaryo = addDiv.find('input.jaryo_');
		jaryo.attr({'class':'jaryo_'+index,'name' : 'jaryo_'+index,'id': 'jaryo_'+index});
		var label3 = jaryo.closest('li').find('label').first();
		label3.attr({'for': 'jaryo_'+index,'name' : 'jaryo_'+index});
		

            index++; // i 값을 증가시켜 다음 버튼에 적용

         $("#tojiDiv").append(addDiv);

});


$(document).on("click",".delBtn",function(){
	console.log("------------deleteSoujaBtn click---------");
	var thisUl=$(this).parent().parent().parent().parent();
	var thisContents=$(this).parent().parent().parent().parent().parent().find(".contents");

    //체크 박스 태그 가져와서 체크 되어있을 시 체크 해재
	const checkbox = thisUl.find('input[name="togiBunhalCancelYn"]')
	if(checkbox.prop('checked')){
	    checkbox.trigger('click');
	}

	console.log($(thisContents).html());
	console.log($(thisContents).length);
	if ($(thisContents).length<=2) return;
	$(thisUl).remove();

});

//해지여부 에서 사용할 리스트 인덱스
var terminateIndex = 1;
//해지여부 클릭 이벤트
//$(document).on("change","#terminate_1",function(){
$(document).on('change', 'input[name="togiBunhalCancelYn"]', function(event) {

	console.log("----------------terminate_Yn btn-------------------------");
        const checkbox = event.target;
        const cancelInfoUl = checkbox.parentNode.parentNode;

        if (checkbox.checked) {
            // 체크박스가 선택된 경우
            var bunhalAddress = cancelInfoUl.querySelector('input#bunhalAddres').value;
            const tojiSelect = cancelInfoUl.querySelector('button#hiddenBtn').textContent.trim();

            var addUl=$("#cancelInfoHiddenUl").html();

            var addDiv = $('<ul class="contents" id="cancelInfoUl">'+addUl+'</ul>');
            addDiv.attr('id', 'terminateIndex__' + terminateIndex); // ul 태그에 전역 변수 terminateIndex id 부여

            // 체크박스에도 terminateIndex 저장
            $(checkbox).attr('data-terminate-index', terminateIndex);

            addDiv.find("bunhalIndex").val(index);
            console.log($(addDiv).html());

            if(!bunhalAddress){
                bunhalAddress = cancelInfoUl.querySelector('input#bunhalAddres').getAttribute('placeholder')
            }

            //해지 여부 체크된 주소 입력
            addDiv.find('input#cancelAddress').val(bunhalAddress);
            //해지 여부 체크된 토지유형 입력
//            addDiv.find('input#cancelTojiType').val(tojiSelect);

            $("#cancelInfoDiv").append(addDiv);
            terminateIndex++;  // 다음에 추가될 요소의 id가 고유하게 증가
        } else {
            // 체크박스 선택이 해제된 경우
            const index = $(checkbox).attr('data-terminate-index');  // 체크박스에 저장된 terminateIndex 값 가져오기
            const targetUl = $('#terminateIndex__' + index);  // terminateIndex 사용해 ul 선택
            if (targetUl.length) {
              targetUl.remove();  // 해당 ul 삭제
            }
        }
});


$(document).on("click","#sangsinBtn",function(){
	
	var url="/jisang/divisionRegisterSangsin?idx="+$("#idx").val()+"&index="+$("#index").val();
	var newWindow = window.open(url, "sangsin", "width=1500,height=800");
	

	               
	                
    // 새 창의 문서 닫기 (렌더링을 완료)
    newWindow.document.close();
})