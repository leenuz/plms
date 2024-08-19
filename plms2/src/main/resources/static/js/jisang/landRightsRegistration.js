// 커스텀 selectbox

createCustomLiLandRegist();

function createCustomLiLandRegist() {
    const contentItems = document.querySelectorAll('.selectContentArea');
	console.log("---------createCustomLiLandRegist---------------");
    contentItems.forEach(contentItem => {
        const notsetAddSelectBox = contentItem.querySelector('select');
	//	console.log(notsetAddSelectBox);
        // select가 없으면 return
        if (!notsetAddSelectBox) return;

        const customSelectBox = contentItem.querySelector('.customSelectBox');
        const customSelectBtns = customSelectBox.querySelector('.customSelectBtns');

        for (let i = 0; i < notsetAddSelectBox.length; i++) {
            const optionValue = notsetAddSelectBox.options[i].value;
			
            const li = document.createElement('li');
			
            const button = document.createElement('button');
            button.classList.add('moreSelectBtn');
            button.type = 'button';
			if (optionValue=="") button.textContent="전체";
            else button.textContent = optionValue;
			//console.log("----button---");
			//console.log(button);
            li.appendChild(button);
			//console.log($(li).html());
            customSelectBtns.appendChild(li);
        }
    });
}

function loadCustomLiLandRegist(ele) {
	/*console.log("---------ele---------------");
	console.log($(ele).html());
    */
    console.log("---------loadCustomLiLandRegist---------------");
	
	var thisContent = ele.closest('li').find("select");
	const customSelectBox = ele.closest('.customSelectBox');
	//console.log($(customSelectBox).html());
	$(customSelectBox).find("li").remove();
	var customSelectBtns = customSelectBox.find('.customSelectBtns');
	
	//console.log($(customSelectBtns).html());
	var optList=thisContent[0];
	//console.log(optList.length);
	//console.log(optList);
	for (let i = 0; i < optList.length; i++) {
		const optionValue = optList.options[i].value;
		//console.log(optionValue);
		const li = document.createElement('li');
					//console.log(li);
		            const button = document.createElement('button');
		            button.classList.add('moreSelectBtn');
		            button.type = 'button';
					if (optionValue=="") button.textContent="전체";
		            else button.textContent = optionValue;
					//console.log("----button---");
					//console.log(button);
					
		            li.appendChild(button);
					//console.log($(li).html());
		            $(customSelectBtns).append(li);
		
	}
    /*contentItems.forEach(contentItem => {
        const notsetAddSelectBox = contentItem.querySelector('select');
		console.log(notsetAddSelectBox);
        // select가 없으면 return
        if (!notsetAddSelectBox) return;

        const customSelectBox = contentItem.querySelector('.customSelectBox');
        const customSelectBtns = customSelectBox.querySelector('.customSelectBtns');

        for (let i = 0; i < notsetAddSelectBox.length; i++) {
            const optionValue = notsetAddSelectBox.options[i].value;
            const li = document.createElement('li');
			console.log(li);
            const button = document.createElement('button');
            button.classList.add('moreSelectBtn');
            button.type = 'button';
			if (optionValue=="") button.textContent="전체";
            else button.textContent = optionValue;
			console.log("----button---");
			console.log(button);
			
            li.appendChild(button);
			console.log($(li).html());
            customSelectBtns.appendChild(li);
        }
    });*/
}


const customSelectView = document.querySelectorAll('.customSelectView')

customSelectView.forEach((btn) => {
    btn.addEventListener('click', function(){
        btn.classList.toggle('active')
        if (btn.nextElementSibling) {
            btn.nextElementSibling.classList.toggle('active')


        }
    })
} )



$(document).on("click",".moreSelectBtn",function(){
	console.log("---------------moreselectBtn--click----");
	var moreSelectBtnText = this.innerText;
	console.log("moreSelectBtnText:"+this.innerText);
	const parentMoreSelectBtn = this.closest('.customSelectBtns')
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
	       const nearBySelectBox = nearByContent.querySelector('select');
		console.log(nearBySelectBox);
		$(nearBySelectBox).val(this.textContent);
		$(nearBySelectBox).trigger("change");
	       nearBySelectBox.value = this.textContent;
	       console.log(`Selected value: ${nearBySelectBox.value}`);
	
});

// customSelectBtns 리스트 click 했을 때 해당 내용으로 바뀌게하기
/*
const MoreSelectBtn = document.querySelectorAll('.moreSelectBtn')

MoreSelectBtn.forEach((moreBtn) => {
    moreBtn.addEventListener('click', function () {
		console.log("-------MoreSelectBtn---click--------------");
        var moreSelectBtnText = moreBtn.innerText;
        console.log(moreSelectBtnText);
        const parentMoreSelectBtn = moreBtn.closest('.customSelectBtns')
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

        const nearByContent = moreBtn.closest('.selectContentArea');
        const nearBySelectBox = nearByContent.querySelector('select');
		console.log(nearBySelectBox);
		$(nearBySelectBox).val(moreBtn.textContent);
		$(nearBySelectBox).trigger("change");
        nearBySelectBox.value = moreBtn.textContent;
        console.log(`Selected value: ${nearBySelectBox.value}`);
		


    })
})*/


// 소유자 정보 추가 click시 이벤트

const ownerInfoAddBtn = document.querySelectorAll('#landRightsRegistration .ownerInfo .addBtn')
const editBefore = document.querySelectorAll('#landRightsRegistration .ownerInfo .contents .content.btnBox .editBefore');
const editAfter = document.querySelectorAll('#landRightsRegistration .ownerInfo .contents .content.btnBox .editAfter');
const editContent = document.querySelectorAll('#landRightsRegistration .editSpace');
const registBtn = document.querySelectorAll('#landRightsRegistration .registBtn');

ownerInfoAddBtn.forEach((btn) => {
    btn.addEventListener('click', function () {
        var thisEditContent = btn.closest('.contents');
        console.log(thisEditContent);

        thisEditContent.classList.add('editing');

        const inputs = thisEditContent.querySelectorAll('input');

        if (thisEditContent.classList.contains('editing')) {
            inputs.forEach(input => {
                input.removeAttribute('readonly');
            });
        } else {
            inputs.forEach(input => {
                input.setAttribute('readonly', 'readonly');
            });
        }



    });
});

// 추가 버튼 click 이벤트

if (registBtn) {
    registBtn.forEach((regiBtn) => {
        regiBtn.addEventListener('click', function () {

            var thisEditContent01 = regiBtn.closest('.contents');
            thisEditContent01.classList.remove('editing')

            const inputs = thisEditContent01.querySelectorAll('input');
            inputs.forEach(input => {
                input.setAttribute('readonly', 'readonly');
            });
        })
    })
}

// 기본 정보 -> 주소 검색

const radioButtons = document.querySelectorAll('#landRightsRegistration .defaultInfo .contWrap .depth2 .contents .content02 .radioBox .inputArea .inputWrap input[name="landRightsRegistration_addressInput"]');
const inputAreas = document.querySelectorAll('#landRightsRegistration .defaultInfo .contWrap .depth2 .contents .content02 .radioBox .inputArea');

radioButtons.forEach((radio) => {
    radio.addEventListener('click', () => {
        inputAreas.forEach((area) => {
            if (area.contains(radio)) {
                area.querySelectorAll(':scope > *:not(.inputWrap)').forEach((child) => {
                    child.classList.remove('disabled');
                });
            } else {
                area.querySelectorAll(':scope > *:not(.inputWrap)').forEach((child) => {
                    child.classList.add('disabled');
                });
            }
        });

    });
});

const checkedRadio = document.querySelector('#landRightsRegistration .defaultInfo .contWrap .depth2 .contents .content02 .radioBox .inputArea .inputWrap input[name="landRightsRegistration_addressInput"]:checked');
if (checkedRadio) {
    checkedRadio.dispatchEvent(new Event('click'));
}

// 첨부파일 전체 선택 체크박스
const allCheckEventLandRightsRegist = () => {

    // 첨부파일 리스트들
    const attachFiles = document.querySelectorAll('input[name="landRightsRegistration_attachFile"]');
    // checked가 된 첨부파일 리스트
    const clickedAttachFiles = document.querySelectorAll('input[name="landRightsRegistration_attachFile"]:checked');
    // 전체선택 input
    const clickedAllinput = document.querySelector('input[name="landRightsRegistration_file_select_all"]');

    // 전체선택되게 하기
    clickedAllinput.addEventListener('click', function () {
        clickedSelectAllLandRightsRegist(clickedAllinput);
    })
    // 개당 선택시 전체 선택되게하기
    attachFiles.forEach((checkList) => {
        checkList.addEventListener('click', function () {

            clickCheckBoxEventLandRightsRegist(checkList);
        })
    })

    // 개별 리스트 클릭시 전체로 변하기
    function clickCheckBoxEventLandRightsRegist() {
        // 최신으로 업데이트 해주기
        const clickedAttachFiles = document.querySelectorAll('input[name="landRightsRegistration_attachFile"]:checked');

        if (attachFiles.length === clickedAttachFiles.length) {
            clickedAllinput.checked = true;
        } else {
            clickedAllinput.checked = false;
        }
    }

    // 전체선택 클릭시 
    function clickedSelectAllLandRightsRegist(clickedAllinput) {
        const attachFiles = document.querySelectorAll('input[name="landRightsRegistration_attachFile"]');

        attachFiles.forEach((checkbox) => {
            checkbox.checked = clickedAllinput.checked;
        })
    }
}

allCheckEventLandRightsRegist();



/* js추가 검색팝업오픈 */

const landRightSearchOpenPopUp = () => {

    const landRightsSearchBtn = document.querySelector(".landRightsSearchBtn");
    const landRightSearchResultPop = document.querySelector(".landRightSearchResultPopWrapper");
    let htmlFilePath = '/components/popuphtml/searchResultsPopup.html'; // 삽입할 html 파일 경로

    if(landRightsSearchBtn){
       
       let xhr = new XMLHttpRequest();
       xhr.open('GET', htmlFilePath, true);
       xhr.onreadystatechange = function() {
           if (xhr.readyState == 4 && xhr.status == 200) {
               landRightSearchResultPop.innerHTML = xhr.responseText;
               runScriptsInElement(landRightSearchResultPop); // 삽입된 html내 스크립트 실행 함수 호출
           }
       };
       xhr.send();
       console.log('landRightSearchResultPop 작동');
       landRightsSearchBtn.addEventListener("click" , () => {
		console.log("-------검색버튼 클릭-----------");
		console.log($("#searchForm").serialize());
          /* const popupOpen = document.querySelector("#searchResultsPopup .popupWrap");
           landRightsSearchBtn.classList.add("open");
           popupOpen.classList.add("active");*/
		
       })

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
}

landRightSearchOpenPopUp();

$(document).on("change","#landRightsRegistSelectBox01",function(){
	
	console.log("----landRightsRegistSelectBox01-----------");	
	changPipeName();
	$("#pipe_name_ul li").remove();
	loadCustomLiLandRegist($("#pipe_name_ul"));
});

function changPipeName(){
			 var url="/api/getPipeName";
	console.log("----changePipeName()-----------");		 
	var requestData={"jisaIdx":$("#landRightsRegistSelectBox01").val()};
	
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
						$("#landRightsRegistSelectBox04 option").remove();
						$("#landRightsRegistSelectBox04").append('<option>선택</option>');
						for(var i=0;i<response.resultData.length;i++){
							$("#landRightsRegistSelectBox04").append('<option>'+response.resultData[i].jzn_zone_name+'</option>');
						}
						
					}
					else {
						console.log("response.success N");
					}
				},
				error:function(jqXHR,textStatus,errorThrown){
					alert("landRightsRegistSelectBox04 ajax error\n"+textStatus+":"+errorThrown);
				}
			
		});
}
$(document).ready(function(){
	//getSidoMaster();	
});


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
						$("#landRightsRegistSelectBox09 option").remove();
						$("#landRightsRegistSelectBox09").append('<option>선택</option>');
						for(var i=0;i<response.resultData.length;i++){
							$("#landRightsRegistSelectBox09").append('<option value='+response.resultData[i].sm_name+'>'+response.resultData[i].sm_name+'</option>');
						}
						loadCustomLiLandRegist($("#sido_ul"));
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

$(document).on("change","#landRightsRegistSelectBox09",function(){
	console.log("----------landRightsRegistSelectBox09--------------");
		getSigunMaster($("#landRightsRegistSelectBox09 option:selected").val());
	})
	
	

	/*$(document).on("change","#landRightsRegistSelectBox10",function(){
		getDongMaster($("#landRightsRegistSelectBox10 option:selected").val());
	})
*/

	
	
	
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
							$("#landRightsRegistSelectBox10").append('<option>선택</option>');
							for(var i=0;i<response.resultData.length;i++){
								$("#landRightsRegistSelectBox10").append('<option value='+response.resultData[i].sm_gugun+'>'+response.resultData[i].sm_gugun+'</option>');
							}
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


	$(document).on("change","#sigunmaster",function(){
		getDongMaster($("#sigunmaster option:selected").val());
	})

/*
$(document).on("click","#basicSearchBtn",function(){
	
	console.log("-----basicSearchBtn click------------");
	
});
*/