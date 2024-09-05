/*  토지추가검색팝업오픈  */
/*
const landAddSearchResultOpenPopUp = () => {

   const landAddSearchBtn = document.querySelectorAll(".landPopBtn");
   const landAddSearchResultPop = document.querySelector(".usePermitRegistLandSearchWrapper");
   let htmlFilePath = '/components/popuphtml/land_searchResultsPopup.html'; // 삽입할 html 파일 경로

   if(landAddSearchBtn.length > 0){
      
      /*let xhr = new XMLHttpRequest();
      xhr.open('GET', htmlFilePath, true);
      xhr.onreadystatechange = function() {
          if (xhr.readyState == 4 && xhr.status == 200) {
              landAddSearchResultPop.innerHTML = xhr.responseText;
              runScriptsInElement(landAddSearchResultPop); // 삽입된 html내 스크립트 실행 함수 호출
          }
      };
      xhr.send();
      console.log('landRightSearchResultPop 작동');

      landAddSearchBtn.forEach((btn) => {
         btn.addEventListener("click" , () => {

      
            const popupOpen = document.querySelector("#land_searchResultsPopup .popupWrap");
            if(popupOpen){
               btn.classList.add("open");
               popupOpen.classList.add("active");
            }
  
        })
      })
   }


       // 삽입된 html내 스크립트 실행 함수
       const runScriptsInElement = (element) => {
         const scripts = element.getElementsByTagName('script');
         for (let i = 0; i < scripts.length; i++) {
             const script = document.createElement('script');
             script.textContent = scripts[i].textContent;
             document.body.appendChild(script).parentNode.removeChild(script);
         }
     }
     

}
*/
/*landAddSearchResultOpenPopUp();*/


const landcreatePopCustomLiResult = () => {
        // hiddenSelectBox와 PopupCustomSelectBox를 묶는 큰 wrap
        const popSelectWrapItems = document.querySelectorAll(
          "#land_searchResultsPopup .popSelectWrap"
        );

        popSelectWrapItems.forEach((contentItem) => {
          // 그 안에 있는 select를 선택
          const nowIssueSelectBox = contentItem.querySelector("select");
          // select가 없으면 return
          if (!nowIssueSelectBox) return;

          const popCustomSelectBox = contentItem.querySelector(
            ".PopupCustomSelectBox"
          );
          const popCustomSelectBtns = popCustomSelectBox.querySelector(
            ".PopupCustomSelectBtns"
          );

          for (let i = 0; i < nowIssueSelectBox.length; i++) {
            const optionValue = nowIssueSelectBox.options[i].value;
            const li = document.createElement("li");
            const button = document.createElement("button");
            button.classList.add("PopupMoreSelectBtn");
            button.type = "button";
            button.textContent = optionValue;
            li.appendChild(button);
            popCustomSelectBtns.appendChild(li);
          }
        });
      };

      landcreatePopCustomLiResult();

      // 팝업 select click 시 .PopupCustomSelectBtns 나오게

      const customSelectView = document.querySelectorAll(
        "#land_searchResultsPopup .PopupCustomSelectView"
      );

      customSelectView.forEach((btn) => {
        btn.addEventListener("click", function () {
          btn.classList.toggle("active");
          if (btn.nextElementSibling) {
            btn.nextElementSibling.classList.toggle("active");
          }
        });
      });

      // 대분류, 중분류, 소분류 안에 button click 했을 때 해당 내용으로 바뀌게하기
/*
      const PopupMoreSelectBtn = document.querySelectorAll(
        "#land_searchResultsPopup .PopupMoreSelectBtn"
      );

      PopupMoreSelectBtn.forEach((moreBtn) => {
        moreBtn.addEventListener("click", function () {
          var moreBtnText = moreBtn.innerText;
          console.log(moreBtnText);
          const parentMoreBtn = moreBtn.closest(".PopupCustomSelectBtns");
          const editViewBtn = parentMoreBtn.previousElementSibling;

          while (editViewBtn.firstChild) {
            editViewBtn.removeChild(editViewBtn.firstChild);
          }

          const textNode = document.createTextNode(moreBtnText);
          editViewBtn.appendChild(textNode);

          editViewBtn.classList.remove("active");
          parentMoreBtn.classList.remove("active");

          // 선택한 걸 select의 value값으로 변경하기

          // 팝업은 popSelectWrap로 묶는다
          const nearByContent = moreBtn.closest(".popSelectWrap");
          const nearBySelectBox = nearByContent.querySelector("select");
		  console.log("----------nearBySelectBox---------------");
		  console.log(nearBySelectBox);
		  console.log(moreBtn.textContent);
		  $(nearBySelectBox).val(moreBtn.textContent);
          nearBySelectBox.value = moreBtn.textContent;
		  
		  $(nearBySelectBox).trigger("change");
		  console.log($("#sido").val());
		 // nearBySelectBox.value = moreBtn.textContent;
          console.log(`Selected value: ${nearBySelectBox.value}`);
        });
      });
*/

function loadCustomLiLandRegist(ele) {
	console.log("---------ele---------------");
	console.log($(ele).html());
    
    console.log("---------loadCustomLiLandRegist---------------");
	
	var thisContent = ele.parent().parent().find('select');
	console.log("---------thisContent---------------");
	console.log($(thisContent).html());
	const customSelectBox = ele.closest('.PopupCustomSelectBox');
	console.log($(customSelectBox).html());
	$(customSelectBox).find("li").remove();
	var customSelectBtns = customSelectBox.find('.PopupCustomSelectBtns');
	console.log("---------PopupCustomSelectBtns---------------");
	console.log($(customSelectBtns).html());
	var optList=thisContent[0];
	//console.log(optList.length);
	console.log(optList);
	for (let i = 0; i < optList.length; i++) {
		const optionValue = optList.options[i].value;
		//console.log(optionValue);
		const li = document.createElement('li');
					//console.log(li);
		            const button = document.createElement('button');
		            button.classList.add('PopupMoreSelectBtn');
		            button.type = 'button';
					if (optionValue=="") button.textContent="전체";
		            else button.textContent = optionValue;
					//console.log("----button---");
					//console.log(button);
					
		            li.appendChild(button);
					//console.log($(li).html());
		            $(customSelectBtns).append(li);
		
	}
}


$(document).on("click",".PopupMoreSelectBtn",function(){
	console.log("---------------moreselectBtn--click----");
	var moreSelectBtnText = this.innerText;
	console.log("moreSelectBtnText:"+this.innerText);
	const parentMoreSelectBtn = this.closest('.PopupCustomSelectBtns')
	       const EditCustomViewBtn = parentMoreSelectBtn.previousElementSibling;

	       while (EditCustomViewBtn.firstChild) {
	           EditCustomViewBtn.removeChild(EditCustomViewBtn.firstChild);
	       }

	       // 새로운 텍스트 노드를 추가합니다.
	       const textNode = document.createTextNode(moreSelectBtnText);
	       EditCustomViewBtn.appendChild(textNode);

	       EditCustomViewBtn.classList.remove('active')
	       parentMoreSelectBtn.classList.remove('active')

	       // 선택한 걸 select의 value값으로 변경하기

	       const nearByContent = this.closest('.selectContentArea');
		   console.log(nearByContent);
	       const nearBySelectBox = nearByContent.querySelector('select');
		   console.log(nearBySelectBox);
		   		$(nearBySelectBox).val(this.textContent);
		   		$(nearBySelectBox).trigger("change");
		   	       nearBySelectBox.value = this.textContent;
		   	       console.log(`Selected value: ${nearBySelectBox.value}`);
	
});



      // 저장, 닫기 버튼 click시 팝업 사라지게

      const landPopupFinalBtns = document.querySelector(
        "#land_searchResultsPopup .popupWrap .lastBtnBox .finalBtn"
      );

      landPopupFinalBtns.addEventListener("click", function () {
          const PopupWrap = landPopupFinalBtns.closest(".popupWrap");
          PopupWrap.classList.remove("active");
        });


      // x 버튼 click시 팝업 사라지게
      const landtopCloseBtn = document.querySelector(
        "#land_searchResultsPopup .popupWrap .topCloseBtn"
      );

      landtopCloseBtn.addEventListener("click", function () {
          const PopupWrap = landtopCloseBtn.closest(".popupWrap");
          PopupWrap.classList.remove("active");
        });





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
}); //end ready

$(document).on("click","#jisangTogiAddBtn",function(){
	console.log("----------jisangTogiAddBtn--------------");
	
	
	
})


$(document).on("change","#landRightsRegistSelectBox09",function(){
	console.log("----------landRightsRegistSelectBox09--------------");
		getSigunMaster($("#landRightsRegistSelectBox09 option:selected").val());
	})
	
	

	$(document).on("change","#landRightsRegistSelectBox10",function(){
		getDongMaster($("#landRightsRegistSelectBox09 option:selected").val(),$("#landRightsRegistSelectBox10 option:selected").val());
	})
	
	$(document).on("change","#landRightsRegistSelectBox11",function(){
			getRiMaster($("#landRightsRegistSelectBox09 option:selected").val(),$("#landRightsRegistSelectBox10 option:selected").val(),$("#landRightsRegistSelectBox11 option:selected").val());
		})




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
								$("#landRightsRegistSelectBox10 option").remove();
								$("#landRightsRegistSelectBox10").append('<option value="">전체</option>');
								for(var i=0;i<response.resultData.length;i++){
									console.log("<option value='"+response.resultData[i].sm_gugun+"'>"+response.resultData[i].sm_gugun+"</option>");
									$("#landRightsRegistSelectBox10").append('<option value="'+response.resultData[i].sm_gugun+'">'+response.resultData[i].sm_gugun+'</option>');
								}
								//loadCustomLiLandRegist($("#gugun_ul"));
								loadCustomLiLandRegist($("#gugun_ul"));
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



function getDongMaster(sidoKey,gugunKey){
			 var url="/api/getDongMaster";
			 
	var requestData={"sidoKey":sidoKey,"gugunKey":gugunKey};
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
						$("#landRightsRegistSelectBox11 option").remove();
						$("#landRightsRegistSelectBox11").append('<option value="">전체</option>');
						for(var i=0;i<response.resultData.length;i++){
							$("#landRightsRegistSelectBox11").append('<option value="'+response.resultData[i].bm_dong+'">'+response.resultData[i].bm_dong+'</option>');
						}
						loadCustomLiLandRegist($("#dong_ul"));
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


function getRiMaster(sidoKey,gugunKey,dongKey){
				 var url="/api/getRiMaster";
				 
		var requestData={"sidoKey":sidoKey,"gugunKey":gugunKey,"dongKey":dongKey};
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
							$("#landRightsRegistSelectBox12 option").remove();
							$("#landRightsRegistSelectBox12").append('<option value="">전체</option>');
							for(var i=0;i<response.resultData.length;i++){
								$("#landRightsRegistSelectBox12").append('<option value="'+response.resultData[i].bm_dong+'">'+response.resultData[i].bm_dong+'</option>');
							}
							loadCustomLiLandRegist($("#ri_ul"));
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


$(document).on("change","#sigunmaster",function(){
	getDongMaster($("#sigunmaster option:selected").val());
})

$(document).on("click","#addrSearchBtn",function(){
	console.log("----------addrSearchBtn start-----------");
		//$("land_searchResultsPopup").addClass("open");
		 const popupOpen = document.querySelector("#land_searchResultsPopup .popupWrap");
								  	    console.log($(popupOpen).html());
								  	   //			   		              landRightsSearchBtn.classList.add("open");
								  	   $(popupOpen).addClass("open");
									   $(popupOpen).addClass("active");
								  	  // popupOpen.classList.add("active");
})


$(document).on("click","#popupSearchBtn",function(){
	
	console.log("------------------popupSearchBtn---------------------------");
	
})



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

