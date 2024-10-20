// 커스텀 selectbox
let dataInfo = {};
createCustomLiNotsetAdd();

function createCustomLiNotsetAdd() {
    const contentItems = document.querySelectorAll('.selectContentArea');
    console.log("---------createCustomLiNotsetAdd---------------");
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
            if (optionValue == "") button.textContent = "전체";
            else button.textContent = optionValue;
            //console.log("----button---");
            //console.log(button);
            li.appendChild(button);
            //console.log($(li).html());
            customSelectBtns.appendChild(li);
        }
    });
}

function loadCustomLiNotsetAdd(ele) {
    console.log("---------ele---------------");
    console.log($(ele).html());

    console.log("---------loadCustomLiNotsetAdd---------------");

    var thisContent = ele.parent().parent().find('select');
    console.log("---------thisContent---------------");
    console.log($(thisContent).html());
    const customSelectBox = ele.closest('.customSelectBox');
    console.log($(customSelectBox).html());
    $(customSelectBox).find("li").remove();
    var customSelectBtns = customSelectBox.find('.customSelectBtns');
    console.log("---------customSelectBtns---------------");
    console.log($(customSelectBtns).html());
    var optList = thisContent[0];
    //console.log(optList.length);
    console.log(optList);
    for (let i = 0; i < optList.length; i++) {
        const optionValue = optList.options[i].value;
        //console.log(optionValue);
        const li = document.createElement('li');
        //console.log(li);
        const button = document.createElement('button');
        button.classList.add('moreSelectBtn');
        button.type = 'button';
        if (optionValue == "") button.textContent = "전체";
        else button.textContent = optionValue;
        //console.log("----button---");
        //console.log(button);

        li.appendChild(button);
        //console.log($(li).html());
        $(customSelectBtns).append(li);
    }
}

const customSelectView = document.querySelectorAll('.customSelectView')

customSelectView.forEach((btn) => {
    btn.addEventListener('click', function () {
        btn.classList.toggle('active')
        if (btn.nextElementSibling) {
            btn.nextElementSibling.classList.toggle('active');
        }
    })
})

$(document).on("click", ".moreSelectBtn", function () {
    console.log("---------------moreselectBtn--click----");
    var moreSelectBtnText = this.innerText;
    console.log("moreSelectBtnText:" + this.innerText);
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

    if (nearBySelectBox.id == 'sunGubunSelectBox') {
        if (nearBySelectBox.value == '복선') {
            $('#pipe_diameter2').show();
        } else {
            $('#pipe_diameter2').hide();
        }
    }
});

/* 라디오버튼 클릭시 각 영역 사용여부  */
const notsetAddRadioEvet = () => {
    const addressInputNames = document.getElementsByName("addressInput");
    const addressInputNames02 = document.getElementsByName("addressInput02");
    const addressInputBox01 = document.querySelector(".addressInputBox01");
    const addressInputBox02 = document.querySelector(".addressInputBox02");
    const addressInputBox03 = document.querySelector(".addressInputBox03");
    const addressInputBox04 = document.querySelector(".addressInputBox04");
    const selectRadioEvet01 = document.querySelectorAll(".selectRadioEvet01 .customSelectView");
    const selectRadioEvet02 = document.querySelectorAll(".selectRadioEvet02 .customSelectView");

    console.log(selectRadioEvet01);
    console.log(selectRadioEvet02);

    if (addressInputNames) {
        addressInputNames.forEach((radioBtns, index) => {
            radioBtns.addEventListener("change", () => {
                if (radioBtns.checked) {
                    if (index === 0) {
                        return addressInputBox01.readOnly = false,
                            addressInputBox02.readOnly = true,
                            selectRadioEvet01.forEach((btns) => btns.disabled = true);
                    } else if (index === 1) {
                        return addressInputBox01.readOnly = true,
                           // addressInputBox02.readOnly = false,
                            selectRadioEvet01.forEach((btns) => btns.disabled = false);
                    } else {
                    }
                }
            })
        })
    }

    if (addressInputNames02) {
        addressInputNames02.forEach((radioBtns, index) => {
            radioBtns.addEventListener("change", () => {
                if (radioBtns.checked) {
                    if (index === 0) {
                        return addressInputBox03.readOnly = false,
                            addressInputBox04.readOnly = true,
                            selectRadioEvet02.forEach((btns) => btns.disabled = true);
                    } else if (index === 1) {
                        return addressInputBox03.readOnly = true,
                            addressInputBox04.readOnly = false,
                            selectRadioEvet02.forEach((btns) => btns.disabled = false);
                    } else {
                    }
                }
            })
        })
    }
}

notsetAddRadioEvet();

/* 체크박스이벤트 */
const notsetAddCheckBoxsEvet = () => {
    const customCheckboxInput01 = document.getElementById("notsetAddCheckbox01");
    const customCheckBoxLabel01 = document.querySelector(".customCheckBoxLabel01");
    const customCheckboxInput02 = document.getElementById("notsetAddCheckbox02");
    const customCheckBoxLabel02 = document.querySelector(".customCheckBoxLabel02");
    const customCheckboxInput03 = document.getElementById("notsetReviseCheckbox03");
    const customCheckBoxLabel03 = document.querySelector(".customCheckBoxLabel03");
    const customCheckboxInput04 = document.getElementById("notsetReviseCheckbox04");
    const customCheckBoxLabel04 = document.querySelector(".customCheckBoxLabel04");

    if (customCheckboxInput01) {
        customCheckboxInput01.addEventListener("change", () => {
            if (customCheckboxInput01.checked) {
                customCheckBoxLabel01.classList.add("active");
            } else {
                customCheckBoxLabel01.classList.remove("active");
            }
        });
    }
    if (customCheckboxInput02) {
        customCheckboxInput02.addEventListener("change", () => {
            if (customCheckboxInput02.checked) {
                customCheckBoxLabel02.classList.add("active");
            } else {
                customCheckBoxLabel02.classList.remove("active");
            }
        })
    }
    if (customCheckboxInput03) {
        customCheckboxInput03.addEventListener("change", () => {
            if (customCheckboxInput03.checked) {
                customCheckBoxLabel03.classList.add("active");
            } else {
                customCheckBoxLabel03.classList.remove("active");
            }
        })
    }
    if (customCheckboxInput04) {
        customCheckboxInput04.addEventListener("change", () => {
            if (customCheckboxInput04.checked) {
                customCheckBoxLabel04.classList.add("active");
            } else {
                customCheckBoxLabel04.classList.remove("active");
            }
        })
    }
}

notsetAddCheckBoxsEvet();

/* 미설정/미점용 내역 수정 input_readonly */
const addReviseInputEvet = () => {
    const addDisabledInputBoxsInput = document.querySelectorAll(".addDisabledInputBoxs .contWrap .depth1 .contents li input");
    console.log(addDisabledInputBoxsInput);
    addDisabledInputBoxsInput.forEach((list) => list.setAttribute("readonly", "true"));
}

addReviseInputEvet();

/* 검색버튼 클릭시 */
const notsetAddPopEvet = () => {
    console.log("##########################");
    const notsetAddPopBtn = document.querySelector(".notsetAddPopBtn");
    console.log(notsetAddPopBtn);
    if (notsetAddPopBtn) {
        const notsetAddResultPop = document.querySelector(".notsetAddResultPop");
        console.log(notsetAddResultPop);
        let htmlFilePath = '/songyu/searchResultsPopup'; // 삽입할 html 파일 경로
        console.log("-----form array:");
        console.log($("#netsetAddForm").serialize());
        //var params=$("#netsetAddForm").serialize();
        let xhr = new XMLHttpRequest();
        xhr.open('GET', htmlFilePath, true);

        xhr.onreadystatechange = function () {
            if (xhr.readyState == 4 && xhr.status == 200) {
                notsetAddResultPop.innerHTML = xhr.responseText;
                runScriptsInElement(notsetAddResultPop); // 삽입된 html내 스크립트 실행 함수 호출
            }
        };
        xhr.send();

        console.log('notsetAddResult 작동');

        notsetAddPopBtn.addEventListener("click", () => {
            const popupOpen = document.querySelector("#searchResultsPopup .popupWrap");
            notsetAddPopBtn.classList.add("open");
            popupOpen.classList.add("active");
        });
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
};

//notsetAddPopEvet();


$(document).ready(function() {
	console.log("songyu/netsetaddRevise.js start");
	commonJisaInfoCheck();
	// 페이지 로드 시 초기 관로명 목록 업데이트
	const initialJisa = $("#jisa").val(); // 선택된 지사 값
	if (initialJisa) {
		console.log("initialJisa: " + initialJisa);
		updatePipeNameList(initialJisa); // 초기 관로명 목록 업데이트
	}
	
	// 페이지 로드 시 단/복선에 따라 관경 ui 업데이트
	const initialSunGubun = $("#sunGubunSelectBox").val();
	if (initialSunGubun) {
		console.log("initialJisa: " + initialSunGubun);
		updatePipeMeterUi(initialSunGubun); // 초기 관경 ui 업데이트
	}
	
	// 커스텀 지사 선택 UI에서 선택했을 때
	$(".content01 .customSelectItem").on("click", function() {
		const selectedJisa = $(this).data("value");
		console.log("지사 선택됨: " + selectedJisa);

		// 선택한 지사를 select box에 반영하고, change 이벤트 트리거
		$("#easementModifySelectBox01").val(selectedJisa).change();

		// 버튼 텍스트를 변경
		$(".content01 .customSelectView").text(selectedJisa);
	});

	// 담당지사 변경 시 이벤트 리스너 추가
	$("#easementModifySelectBox01").change(function() {
		const selectedJisa = $(this).val();  // 변경된 지사 값
		updatePipeNameList(selectedJisa);    // 관로명 목록 업데이트 함수 호출
	});
	
});

// 관경 UI 업데이트 함수
function updatePipeMeterUi(sunGubunValue){
    if (sunGubunValue === '복선') {
        $('#pipe_diameter2').show();
    } else {
        $('#pipe_diameter2').hide();
    }
}

// 관로명 목록 업데이트 함수
function updatePipeNameList(jisaValue) {
	const allData = { jisa: jisaValue };

	// 숨겨진 필드에서 resultData.jm_pipe_name 값을 가져옴
	const jmPipeName = $("#nm_pipe_name_hidden").val();  // hidden input의 값 읽기
	console.log("nmPipeName: " + jmPipeName);

	$.ajax({
		url: "/land/gover/getPipeName",  // 관로명 목록을 가져오는 API
		data: JSON.stringify(allData),
		type: "POST",
		dataType: "json",
		contentType: "application/json; charset=utf-8",
		success: function(rt) {
			const data = rt.resultData;
			console.log("관로명 목록 데이터:", data);

			// 기존 셀렉트 박스와 커스텀 UI 초기화
			$("#pipeNameSelectBox option").remove();  // <select> 내부 옵션 제거
			$("#pipe_name_ul").empty();  // 커스텀 <ul> 리스트 초기화

			// 받은 데이터로 관로명 목록 업데이트
			for (let i = 0; i < data.length; i++) {
				const pipeName = data[i].jzn_zone_name;
				const isSelected = pipeName === jmPipeName ? "selected" : "";  // 숨겨진 필드의 값과 비교

				console.log("pipeName: "+ pipeName);
				console.log("isSelected: "+ isSelected);
				// 실제 <select> 태그에 옵션 추가
				$("#pipeNameSelectBox").append("<option value='" + pipeName + "' " + isSelected + ">" + pipeName + "</option>");
				console.log("SelectBox 내용:", $("#pipeNameSelectBox").html());  // 추가된 option들을 출력
				// 커스텀 드롭다운 UI에 <li> 항목 추가
				$("#pipe_name_ul").append("<li class='customSelectItem moreSelectBtn' data-value='" + pipeName + "'>" + pipeName + "</li>");
				console.log("Custom UI 내용:", $("#pipe_name_ul").html());  // 추가된 <li> 항목들을 출력
			}

			// 관로명 선택값을 커스텀 버튼에 반영
			$("#pipeNameText").text(jmPipeName || "선택");

			// <li> 항목 클릭 시 <select> 업데이트 및 커스텀 UI 반영
			$(".customSelectItem").on("click", function() {
				const selectedPipeName = $(this).data("value");
				$("#pipeNameSelectBox").val(selectedPipeName).change();  // <select> 값 설정
				$("#pipeNameText").text(selectedPipeName);  // 버튼 텍스트 업데이트
			});

		},
		error: function(jqXHR, textStatus, errorThrown) {
			console.error("관로명 목록 업데이트 실패:", textStatus, errorThrown);
		}
	});
}


//조회하기 클릭시 상단 정보 출력 (현재는 지사 부분만 추가하였음 ... 다 불수 있게 추가해주세요)
$(document).on("click", "#searchBtn", function () {
    console.log($("#netsetAddForm").serialize());

    var formSerializeArray = $('#netsetAddForm').serializeArray();
    console.log(formSerializeArray)
    var object = {};
    for (var i = 0; i < formSerializeArray.length; i++) {
        object[formSerializeArray[i]['name']] = formSerializeArray[i]['value'];
    }

    var json = JSON.stringify(formSerializeArray);

    console.log("----------jsonobj------------");
    console.log(json);

    //var w=window.open("about:blank","_blank");

    //  loadDataTable(object);
    console.log("-----------------------");
    /*  var myForm = document.netsetAddForm;
       var url = "/land/songyu/searchResultsPopup";
       window.open(url ,"popForm", 
             "toolbar=no, width=540, height=467, directories=no, status=no,    scrollorbars=no, resizable=no"); 
       myForm.action =url; 
       myForm.method="post";
       myForm.target="netsetAddForm";
    
      myForm.submit();
    */

    /*  var params=$("#netsetAddForm").serialize();
      
      // ajax process
      $.ajax({
             url:"/land/songyu/searchResultsPopup",
             method:"POST",
             data:params,
             dataType:"html",
             success: eventSuccess,
             error: function(xhr, status, error) {alert(error);}
      });
      
      function eventSuccess(data)
      {
             //여기서 팝업된 창의 주소를 변경하자.
             w.location.href = "/land/songyu/searchResultsPopup";
      }*/

    /*const notsetAddPopBtn = document.querySelector(".notsetAddPopBtn");
      console.log(notsetAddPopBtn);
      if (notsetAddPopBtn) {
          const notsetAddResultPop = document.querySelector(".notsetAddResultPop");
          console.log(notsetAddResultPop);
          let htmlFilePath = '/songyu/searchResultsPopup'; // 삽입할 html 파일 경로
               console.log("-----form array:");
               console.log($("#netsetAddForm").serialize());
       //var params=$("#netsetAddForm").serialize();
          let xhr = new XMLHttpRequest();
          xhr.open('GET', htmlFilePath, true);
          
          xhr.onreadystatechange = function() {
              if (xhr.readyState == 4 && xhr.status == 200) {
                  notsetAddResultPop.innerHTML = xhr.responseText;
                  runScriptsInElement(notsetAddResultPop); // 삽입된 html내 스크립트 실행 함수 호출
              }
          };
          xhr.send();

          console.log('notsetAddResult 작동');

          notsetAddPopBtn.addEventListener("click", () => {
           const popupOpen = document.querySelector("#searchResultsPopup .popupWrap");
                  notsetAddPopBtn.classList.add("open");
                  popupOpen.classList.add("active");
          });
      }*/
})

/* // 삽입된 html내 스크립트 실행 함수
    const runScriptsInElement = (element) => {
        const scripts = element.getElementsByTagName('script');
        for (let i = 0; i < scripts.length; i++) {
            const script = document.createElement('script');
            script.textContent = scripts[i].textContent;
           // document.body.appendChild(script).parentNode.removeChild(script);
        }
    }
*/

/* 소유자 정보 입력 버튼 */
$(document).on("click", ".addBtn", function () {
    console.log("---------addBtn click-----------");

    var thisEditContent = this.closest('.contents');
    console.log(thisEditContent);
    //			thisEditContent.classList.add('editing');
    const inputs = thisEditContent.querySelectorAll('input');
	/*
    if (thisEditContent.classList.contains('editing')) {
        inputs.forEach(input => {
            input.setAttribute('readonly', 'readonly');
        });
    } else {
        inputs.forEach(input => {
            thisEditContent.classList.add('editing');
            input.removeAttribute('readonly');
        });
    }
    */
});


$(document).on("click", "#completeSoujaBtn", function () {
    console.log("------------completeSoujaBtn click---------");
    const soujaDiv = document.getElementById('soujaDiv');
    const editingElements = soujaDiv.querySelectorAll('.editing');
    const editingCount = editingElements.length;

    var thisUl = $(this).parent().parent().parent().parent();
    console.log("editingCount" + editingCount);
    var addUl = $("#soujaHiddenUl").html();

    var input = $(thisUl).find("input");
    console.log(input);
    console.log(input.length);
    console.log("0:" + $(input).eq(0).val());

    if ($(input).eq(0).val() == "" || $(input).eq(1).val() == "" || $(input).eq(2).val() == "" || $(input).eq(3).val() == "") {
        alert("입력사항을 체크하세요! 공유지분,성명,주소,연락처는 필수 입력입니다.");
        return;
    }

    if ($(input).eq(0).val() != "" && $(input).eq(1).val() != "" && $(input).eq(2).val() != "" && $(input).eq(3).val() != "") {
        //	alert("소유자 정보를 정확하게 입력해주세요!");
        let addTargetUl = '<ul class="contents editing" id="soujaUl">' + addUl + '</ul>';
        $(thisUl).find('li input').attr('readonly', false);
        $("#soujaDiv").append(addTargetUl);
        //return;
    }
    //if ($(input).eq(0).html()=="" || )

    //		$(thisUl).removeClass("editing");
    /*for(var i=0;i<input.length;i++) {
        console.log($(input).eq(i).parent().html());
    }*/

    /*$(input).forEach(input => {
        input.setAttribute('readonly', 'readonly');
    });*/
});

$(document).on("click", "#deleteSoujaBtn", function () {
    console.log("------------deleteSoujaBtn click---------");
    var thisUl = $(this).parent().parent().parent().parent();
    var thisContents = $(this).parent().parent().parent().parent().parent().find(".contents");
    console.log($(thisContents).html());
    console.log($(thisContents).length);
    if ($(thisContents).length <= 2) return;
    $(thisUl).remove();
});

/* 첨부파일 */
// 첨부파일 전체 선택 체크박스
const allCheckEventLandRightsRegist = () => {
    // 첨부파일 리스트들
    const attachFiles = document.querySelectorAll('input[name="attachFile"]');
    // checked가 된 첨부파일 리스트
    const clickedAttachFiles = document.querySelectorAll('input[name="attachFile"]:checked');
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
        const clickedAttachFiles = document.querySelectorAll('input[name="attachFile"]:checked');

        if (attachFiles.length === clickedAttachFiles.length) {
            clickedAllinput.checked = true;
        } else {
            clickedAllinput.checked = false;
        }
    }

    // 전체선택 클릭시
    function clickedSelectAllLandRightsRegist(clickedAllinput) {
        const attachFiles = document.querySelectorAll('input[name="attachFile"]');

        attachFiles.forEach((checkbox) => {
            checkbox.checked = clickedAllinput.checked;
        })
    }
}

allCheckEventLandRightsRegist();

// 체크된 첨부파일 삭제
$(document).on("click", "#deleteFileBtn", function () {
	const clickedAttachFiles = document.querySelectorAll('input[name="attachFile"]:checked');
	for (var i = 0; i < clickedAttachFiles.length; i++) {
		let delEle = $(clickedAttachFiles[i]).closest("#fileListUl");
		let checkFlag = $(delEle).find('[name="newFileCheckYn"]').val(); 
		if (checkFlag == 'Y'){
			$(delEle).remove();
		} else {
			$(delEle).find('[name="newFileCheckYn"]').val('D');
			$(delEle).hide();	
		}
		
	}
})

var uploadFiles = new Array();
$(document).ready(function () {
    var objDragAndDrop = $(".fileUploadBox");
	
    $(document).on("dragenter", ".fileUploadBox", function (e) {
        e.stopPropagation();
        e.preventDefault();
        $(this).css('border', '2px solid #0B85A1');
    });
    $(document).on("dragover", ".fileUploadBox", function (e) {
        e.stopPropagation();
        e.preventDefault();
    });
    $(document).on("drop", ".fileUploadBox", function (e) {
        $(this).css('border', '2px dotted #0B85A1');
        e.preventDefault();
        var files = e.originalEvent.dataTransfer.files;

        handleFileUpload(files, objDragAndDrop);
    });
    $(document).on('dragenter', function (e) {
        e.stopPropagation();
        e.preventDefault();
    });
    $(document).on('dragover', function (e) {
        e.stopPropagation();
        e.preventDefault();
        objDragAndDrop.css('border', '2px dotted #0B85A1');
    });
    $(document).on('drop', function (e) {
        e.stopPropagation();
        e.preventDefault();
    });
    //drag 영역 클릭시 파일 선택창
    objDragAndDrop.on('click', function (e) {
        $('input[type=file]').trigger('click');
    });
    $('input[type=file]').on('change', function (e) {
        var files = e.originalEvent.target.files;
        handleFileUpload(files, objDragAndDrop);
    });

	  var rowCount = document.querySelectorAll("#fileListDiv > ul").length + 1;  // 현재 렌더된 파일 개수 계산
    function handleFileUpload(files, obj) {
        console.log("-------------handleFileUpload---------------");
        console.log(files);
        for (var i = 0; i < files.length; i++) {
            var fd = new FormData();
            fd.append('file', files[i]);

            var status = new createStatusbar1($("#fileTitleUl"), files[i].name, files[i].size, rowCount); //Using this we can set progress.
            //  status.setFileNameSize(files[i].name,files[i].size);
            sendFileToServer(fd, status);

			rowCount++; // 파일이 추가될 때마다 rowCount를 증가시켜 고유한 id를 유지
        }
    }
	
	function createStatusbar1(obj, name, size, no) {
			
	        console.log("----------start createStatusBar------------");
	        console.log(obj.html());
	        /*var uobj=obj.parent().parent().find("#status");	
	        rowCount++;
	        var row="";
	        //if(rowCount %2 ==0) row ="even";
	        this.statusbar = $('<ul class="contents" id="fileListUl">');
	        this.filename = $('<div class='filename'></div>').appendTo(this.statusbar);
	        this.size = $("<div class='filesize'></div>").appendTo(this.statusbar);
	       // this.progressBar = $("<div class='progressBar'><div></div></div>").appendTo(this.statusbar);
	        this.abort = $("<div class='abort'>중지</div>").appendTo(this.statusbar);*/

	        var sizeStr = "";
	        var sizeKB = size / 1024;
	        if (parseInt(sizeKB) > 1024) {
	            var sizeMB = sizeKB / 1024;
	            sizeStr = sizeMB.toFixed(2) + " MB";
	        } else {
	            sizeStr = sizeKB.toFixed(2) + " KB";
	        }

	        var row = '<ul class="contents" id="fileListUl">';
	        row += '<li class="content01 content checkboxWrap">';
			row += `	<input type="hidden" name="no" value="${no}">`;
			row += `	<input type="hidden" name="name" value="${name}">`;
			row += `	<input type="hidden" name="nfname" value="">`;
			row += '	<input type="hidden" name="newFileCheckYn" value="Y">';
	        row += '<input type="checkbox" id="attachFile' + no + '" name="attachFile" >';
	        row += '<label for="attachFile' + no + '"></label>';
	        row += '</li>';
	        row += '<li class="content02 content"><input type="text" id="filename" value="' + name + '" class="notWriteInput" readonly></li></ul>';
			console.log(row);
	        obj.after(row);
	
	        var radio = $(row).find('input');
	        console.log("---------------radio checkbox----------");
	        $(radio).find('input').attr("disabled", false);
	        console.log($(radio).parent().html());

	        /* this.setFileNameSize = function(name,size){
	             var sizeStr="";
	             var sizeKB = size/1024;
	             if(parseInt(sizeKB) > 1024){
	                 var sizeMB = sizeKB/1024;
	                 sizeStr = sizeMB.toFixed(2)+" MB";
	             }else{
	                 sizeStr = sizeKB.toFixed(2)+" KB";
	             }
	      
	             $(#)
	             this.size.html(sizeStr);
	         }*/

	        /*this.setProgress = function(progress){       
	            var progressBarWidth =progress*this.progressBar.width()/ 100;  
	            this.progressBar.find('div').animate({ width: progressBarWidth }, 10).html(progress + "% ");
	            if(parseInt(progress) >= 100)
	            {
	                this.abort.hide();
	            }
	        }
	        
	        this.setAbort = function(jqxhr){
	            var sb = this.statusbar;
	            this.abort.click(function()
	            {
	                jqxhr.abort();
	                sb.hide();
	            });
	        }*/
	    }

    function createStatusbar(obj, name, size, no) {
		
        console.log("----------start createStatusBar------------");
        console.log(obj.html());
        /*var uobj=obj.parent().parent().find("#status");	
        rowCount++;
        var row="";
        //if(rowCount %2 ==0) row ="even";
        this.statusbar = $('<ul class="contents" id="fileListUl">');
        this.filename = $('<div class='filename'></div>').appendTo(this.statusbar);
        this.size = $("<div class='filesize'></div>").appendTo(this.statusbar);
       // this.progressBar = $("<div class='progressBar'><div></div></div>").appendTo(this.statusbar);
        this.abort = $("<div class='abort'>중지</div>").appendTo(this.statusbar);*/

        var sizeStr = "";
        var sizeKB = size / 1024;
        if (parseInt(sizeKB) > 1024) {
            var sizeMB = sizeKB / 1024;
            sizeStr = sizeMB.toFixed(2) + " MB";
        } else {
            sizeStr = sizeKB.toFixed(2) + " KB";
        }

        var row = '<ul class="contents" id="fileListUl1">';
        row += '<li class="content01 content checkboxWrap">';
		row += '<input type="hidden" name="ftype" id="new" >';
        row += '<input type="checkbox" id="attachFile' + no + '" name="attachFile" >';
        row += '<label for="attachFile' + no + '"></label>';
        row += '</li>';
        row += '<li class="content02 content"><input type="text" id="filename" value="' + name + '" class="notWriteInput" readonly></li></ul>';
		console.log(row);
        obj.after(row);

        var radio = $(row).find('input');
        console.log("---------------radio checkbox----------");
        $(radio).find('input').attr("disabled", false);
        console.log($(radio).parent().html());

        /* this.setFileNameSize = function(name,size){
             var sizeStr="";
             var sizeKB = size/1024;
             if(parseInt(sizeKB) > 1024){
                 var sizeMB = sizeKB/1024;
                 sizeStr = sizeMB.toFixed(2)+" MB";
             }else{
                 sizeStr = sizeKB.toFixed(2)+" KB";
             }
      
             $(#)
             this.size.html(sizeStr);
         }*/

        /*this.setProgress = function(progress){       
            var progressBarWidth =progress*this.progressBar.width()/ 100;  
            this.progressBar.find('div').animate({ width: progressBarWidth }, 10).html(progress + "% ");
            if(parseInt(progress) >= 100)
            {
                this.abort.hide();
            }
        }
        
        this.setAbort = function(jqxhr){
            var sb = this.statusbar;
            this.abort.click(function()
            {
                jqxhr.abort();
                sb.hide();
            });
        }*/
    }

    function sendFileToServer(formData, status) {
        var uploadURL = "/notset/fileUpload/post"; //Upload URL
        var extraData = {}; //Extra Data.
        var jqXHR = $.ajax({
            xhr: function () {
                var xhrobj = $.ajaxSettings.xhr();
                if (xhrobj.upload) {
                    xhrobj.upload.addEventListener('progress', function (event) {
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
            contentType: false,
            processData: false,
            cache: false,
            data: formData,
            success: function (data) {
                // status.setProgress(100);
                console.log(data);
                console.log(data.resultData);
                //console.log("-------------sendFileToServer-----------------------");
                //console.log($(this).parent().parent().parent().parent());
                //$("#status1").append("File upload Done<br>");    
                //uploadFiles.push(data.resultData.fpath);    
                //allCheckEventLandRightsRegist();   
            }
        });

        //status.setAbort(jqXHR);
    }

		
    // 수정 버튼([참고]미설정/미점용 내역 등록 내용 복사, 붙여넣기 한 내용 - 아직 수정 안함.)
    $(document).on("click", "#finalBtn", function () {
		
        console.log("---------finalBtn class click------------");
        console.log($("#saveForm").serialize());

        //데이터를 가공해서 넘김다
        var formSerializeArray = $('#saveForm').serializeArray();
        console.log(formSerializeArray);

        len = formSerializeArray.length;
        var dataObj = {};
        for (i = 0; i < len; i++) {
            dataObj[formSerializeArray[i].name] = formSerializeArray[i].value;
        }
        dataObj['memo'] = $('#memo').val();

        console.log("------dataObj--------");
        console.log(dataObj);

        const soujaUls = document.querySelectorAll('#soujaUl');
        let manageFlag = ('nm_manage' in dataObj);
        if (manageFlag) {
			dataObj.nm_manage = 'Y';
		} else {
			dataObj.nm_manage = 'N';
		}

           console.log(soujaUls);
        var soujaArr = new Array();
        for (var i = 0; i < soujaUls.length; i++) {
            console.log(soujaUls[i]);
            console.log($(soujaUls[i]).find("input[name='soujaJibun']").val());
            var soujaJibun = $(soujaUls[i]).find("input[name='soujaJibun']").val();
            var soujaName = $(soujaUls[i]).find("input[name='soujaName']").val();
            var soujaAddress = $(soujaUls[i]).find("input[name='soujaAddress']").val();
            var soujaContact1 = $(soujaUls[i]).find("input[name='soujaContact1']").val();
            var soujaContact2 = $(soujaUls[i]).find("input[name='soujaContact2']").val();
            
            soujaJibun = (soujaJibun == "undefined" || soujaJibun == "" || soujaJibun == null) ? "" : soujaJibun;
            soujaName = (soujaName == "undefined" || soujaName == "" || soujaName == null) ? "" : soujaName;
            soujaAddress = (soujaAddress == "undefined" || soujaAddress == "" || soujaAddress == null) ? "" : soujaAddress;
            soujaContact1 = (soujaContact1 == "undefined" || soujaContact1 == "" || soujaContact1 == null) ? "" : soujaContact1;
            soujaContact2 = (soujaContact2 == "undefined" || soujaContact2 == "" || soujaContact2 == null) ? "" : soujaContact2;
            var soujaInfo = { "jibun": soujaJibun, "soujaName": soujaName, "soujaAddress": soujaAddress, "soujaContact1": soujaContact1, "soujaContact2": soujaContact2 };
            if (soujaJibun != "" && soujaName != "" && soujaAddress != "" && soujaContact1 != "") soujaArr.push(soujaInfo);
		  //soujaArr.push(soujaInfo);
        }

		console.log("--------soujaArr------");
		console.log(soujaArr);
		console.log("--------files---------");
		const attachFileUls = document.querySelectorAll('input[name="attachFile"]');
		       console.log(attachFileUls);
        var files = new Array();
        var fileObj = {};
        for (let i = 0; i < attachFileUls.length; i++) {
			fileObj = {};
			let na_idx = $(attachFileUls[i]).parent().find('[name="na_idx"]').val();
			let seq = $(attachFileUls[i]).parent().find('[name="na_seq"]').val();
			let fseq = $(attachFileUls[i]).parent().find('[name="na_file_seq"]').val();
			let fpath = $(attachFileUls[i]).parent().find('[name="na_file_path"]').val();
            let fname = $(attachFileUls[i]).parent().find("[name='name']").val();
            let newFileCheck = $(attachFileUls[i]).parent().find("[name='newFileCheckYn']").val();
            fileObj.idx = na_idx;
            fileObj.seq = seq;
            fileObj.fseq = fseq;
            fileObj.fpath = fpath;
            fileObj.fname = fname;
            fileObj.newFileCheckYn = newFileCheck;
            files.push(fileObj);
        }

       
        console.log(files);

        dataObj.soujaInfo = soujaArr;
        dataObj.files = files;

        //필수정보체크
        console.log("jisa:" + dataObj.jisa);
        if (!checkData(dataObj.jisa, "s", "담당지사를 입력해주세요!")) return;
        else if (!checkData(dataObj.overlap_yn, "s", "관로일치여부블 입력해주세요!")) return;
        else if (!checkData(dataObj.pipe_name, "s", "관로명(구간)을 입력해주세요!")) return;
        else if (!checkData(dataObj.sun_gubun, "s", "선구분을 입력해주세요!")) return;
        else if(!checkData(dataObj.pipe_diameter1, "s", "관경1을 입력해주세요!")) return;
        else if (dataObj.sun_gubun == '복선' && !checkData(dataObj.pipe_diameter2, "s", "관경2를 입력해주세요!")) return;
        else if (!checkData(dataObj.gover_own_yn, "s", "국공유지여부를 입력해주세요!")) return;
        else if (!checkData(dataObj.jijuk_area, "s", "지적면적을 입력해주세요!")) return;
        else if (!checkData(dataObj.jimok_text, "s", "지목을 입력해주세요!")) return;
        else if (!checkData(dataObj.maddress, "s", "주소를 입력해주세요!")) return;
        else if (soujaArr <= 0) {
            alert("소유자 정보를 입력해주세요!");
            return;
        }
		dataObj.sidoNm=dataObj.sido_nm;
		dataObj.gugunNm=dataObj.sgg_nm;
		dataObj.dongNm=dataObj.emd_nm;
		dataObj.riNm=dataObj.ri_nm;
		dataObj.jisaNm=dataObj.jisa;
		dataObj.jibun=dataObj.mjibun;
		dataObj.goverYN=dataObj.gover_own_yn;
		dataObj.zone=dataObj.pipe_name;
		dataObj.sunGubun=dataObj.sun_gubun;
		dataObj.gubun="modify";
        console.log("------dataObj--------");
        let modifyReason1 = changeStatus1(dataObj);
        let modifyReason2 = changeStatus2(dataObj);
        let modifyReason3 = changeStatus3();
        
        dataObj.modifyReason1 = modifyReason1;
        dataObj.modifyReason2 = modifyReason2;
        dataObj.modifyReason3 = modifyReason3;
        // 서버 전송
         url = "/land/songyu/insertSonguList";
         $.ajax({
             url: url,
             type: 'POST',
             contentType: "application/json",
             data: JSON.stringify(dataObj),

             dataType: "json",
             beforeSend: function (request) {
                 console.log("beforesend ........................");
                 loadingShow();
             },
             success: function (response) {
                 loadingHide();
                 
			    if (window.name == 'minwonCompletePopup') {
	                window.opener.popupComplete();
		            window.close();
			    } else {
					alert('정상적으로 수정 되었습니다.');
				}
        //         if (response.success = "Y") {
        //             console.log("response.success Y");
        //             console.log("response.resultData length:" + response.resultData.length);
        //             alert("정상적으로 등록 되었습니다.");
        //             /*$("#popup_bg").show();
        //             $("#popup").show(500);
        //             //$("#addrPopupLayer tbody td").remove();
        //             for(var i=0;i<response.resultData.length;i++){
        //                 $("#addrPopupTable tbody").append("<tr><td>"+response.resultData[i].juso+"</td><td><button>선택</button></td></tr>");
        //             }*/
        //         }
        //         else {
        //             console.log("response.success N");
        //         }
             },
             error: function (jqXHR, textStatus, errorThrown) {
                 alert("finalBtn ajax error\n" + textStatus + ":" + errorThrown);
                 return false;
             }
         });

    });

});

// 지사 선택 시 관로명 목록 업데이트를 위한 change 트리거
$(document).on("click", "#jisaUl li", function () {
    const selectedJisa = $(this).text().trim();
    $("#jisaBtn").text(selectedJisa);
    $("#jisa").val(selectedJisa).change(); // change 이벤트 트리거
});

// 지사 선택에 따른 관로명 목록 업데이트
$(document).on("change", "#jisa", function () {
    const selectedJisa = $("#jisa").val();
    if (!selectedJisa) return;
	
    const allData = { jisa: selectedJisa };
	console.log(allData);
    $.ajax({
        url: "/land/gover/getPipeName", // 관로명 목록을 가져오는 API
        data: JSON.stringify(allData),
        async: true,
        type: "POST",
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        success: function (rt) {
            const data = rt.resultData;

            // 관로명 리스트 초기화 및 업데이트
            $("#pipe_name_ul li").remove(); // 기존 항목 제거
            $("#pipeNameSelectBox option").remove(); // 기존 option 제거
            $("#pipe_name_ul").append("<li><button class='moreSelectBtn' type='button'>전체</button></li>"); // '전체' 버튼 추가
            $("#pipeNameSelectBox").append("<option value=''>전체</option>"); // '전체' option 추가

            // 관로명 목록을 버튼으로 추가
            for (let i = 0; i < data.length; i++) {
                const pipeName = data[i].jzn_zone_name;
                // 목록에 button 요소 추가
                $("#pipe_name_ul").append("<li><button class='moreSelectBtn' type='button'>" + pipeName + "</button></li>");
                // select 박스에 option 요소 추가
                $("#pipeNameSelectBox").append("<option value='" + pipeName + "'>" + pipeName + "</option>");
            }
        },
        error: function (jqXHR, textStatus, errorThrown) {
            console.error("Error: ", textStatus, errorThrown);
        }
    });
});

// 이전버튼 클릭시
$(document).on('click', '#backBtn', function(){
	let queryString = window.location.search;
	let urlParams = new URLSearchParams(queryString);
	let backFlag = false;
	if (window.name == 'minwonCompletePopup') {
		window.close();
		return;
	}
	history.back();
});

function changeStatus1 (modifyObj) {
	let oldData = $('#dataInfo').val();
	let oldObj = queryValueToObject(oldData);
	let changeStr = '';
	
	// 지사
	changeStr += compareChanges(String(oldObj.jisa), String(modifyObj.jisa), '지사');
	changeStr += compareChanges(String(oldObj.pipe_overlap_yn), String(modifyObj.overlap_yn), '관로일치여부');
	changeStr += compareChanges(String(oldObj.nm_pipe_name), String(modifyObj.pipe_name), '관로명(구간)');
	changeStr += compareChanges(String(oldObj.nm_sun_gubun), String(modifyObj.sun_gubun), '단/복선');
	changeStr += compareChanges(String(oldObj.nm_pipe_meter), String(modifyObj.pipe_diameter1), '관경1');
	changeStr += compareChanges(String(oldObj.nm_pipe_meter2), String(modifyObj.pipe_diameter2), '관경2');
	changeStr += compareChanges(String(oldObj.gover_own_yn), String(modifyObj.gover_own_yn), '국공유지여부');
	changeStr += compareChanges(String(oldObj.nm_jijuk_area), String(modifyObj.jijuk_area), '지적면적(㎡)');
	changeStr += compareChanges(String(oldObj.nm_jimok_text), String(modifyObj.jimok_text), '지목');
	changeStr += compareChanges(String(oldObj.nm_jimok_text), String(modifyObj.jimok_text), '지목');
	changeStr += compareChanges(String(oldObj.nm_manage_yn), String(modifyObj.nm_manage), '관리제외필지');
	
	let juso = '';
	juso += oldObj.nm_sido_nm != null ? oldObj.nm_sido_nm + ' ' : '';
	juso += oldObj.nm_sgg_nm != null ? oldObj.nm_sgg_nm + ' ' : '';
	juso += oldObj.nm_emd_nm != null ? oldObj.nm_emd_nm + ' ' : '';
	juso += oldObj.nm_ri_nm != null ? oldObj.nm_ri_nm + ' ' : '';
	juso += oldObj.nm_jibun != null ? oldObj.nm_jibun : '';
	changeStr += compareChanges(juso, modifyObj.maddress, '주소');
	
	return changeStr;
}

function changeStatus2 (modifyObj) {
	
	// 소유자
	let soyujaStr = $('#soujaObj').val();
	let soyujaObj = JSON.parse(soyujaStr);
	let changeStr = '';
	
	let soyujaCnt = $('#soujaDiv #soujaUl').length; // 소유자 정보 행 개수
	
	for (let i = 0; i < soyujaCnt; i++) {
		if($('#soujaDiv #soujaUl').eq(i).find('[name="addKey"]').length > 0){
			changeStr += '소유자 정보 추가 ';
			changeStr += ' 공유지분: ' + modifyObj.soujaInfo[i].jibun;
			changeStr += ' 성명: ' + modifyObj.soujaInfo[i].soujaName;
			changeStr += ' 주소: ' + modifyObj.soujaInfo[i].soujaAddress;
			changeStr += ' 연락처1: ' + modifyObj.soujaInfo[i].soujaContact1;
			changeStr += ' 연락처2: ' + modifyObj.soujaInfo[i].soujaContact2;
		} else {
			changeStr += compareChanges(String(soyujaObj[i].ns_jibun), modifyObj.soujaInfo[i].jibun, '소유자 정보 공유지분');
			changeStr += compareChanges(String(soyujaObj[i].ns_souja_name), modifyObj.soujaInfo[i].soujaName, '소유자 정보 성명');
			changeStr += compareChanges(String(soyujaObj[i].ns_address), modifyObj.soujaInfo[i].soujaAddress, '소유자 정보 주소');
			changeStr += compareChanges(String(soyujaObj[i].ns_phone_number), modifyObj.soujaInfo[i].soujaContact1, '소유자 정보 연락처1');
			changeStr += compareChanges(String(soyujaObj[i].ns_home_number), modifyObj.soujaInfo[i].soujaContact2, '소유자 정보 연락처2');	
		}
	}
	return changeStr;
}

function changeStatus3 () {
	let changeStr = '';
	let fileCnt = $('#fileListDiv #fileListUl').length; // 소유자 정보 행 개수
	for (let i = 0; i < fileCnt; i++) {
		let fileCheckYn = $('#fileListDiv #fileListUl').eq(i).find('[name="newFileCheckYn"]');
		let fileName = $('#fileListDiv #fileListUl').eq(i).find('[name="name"]').val();
		if (fileCheckYn.val() == 'Y') {
			changeStr += ` 파일 추가 (${fileName})`;
		} else if (fileCheckYn.val() == 'D') {
			changeStr += ` 파일 삭제 (${fileName})`;
		}
	}
	return changeStr;
}

// 변경이력 비교 함수
function compareChanges(orgValue, newValue, fieldName) {
    // null과 undefined를 빈 문자열로 처리
    orgValue = orgValue === undefined || orgValue === null ? '' : orgValue;
    newValue = newValue === undefined || newValue === null ? '' : newValue;
    console.log("orgValue:"+orgValue);
	console.log("newValue:"+newValue);
	if (orgValue.trim() != newValue.trim() && newValue.trim() != '') {
	    return `${fieldName} 변경 ('${orgValue.trim()}' > '${newValue.trim()}'); `;
	}

    return '';
}

$(document).on("click", "#addressResultSelectBtn", function () {
    console.log("----------addressResultSelectBtn-click-------");
    console.log($(this).parent().parent().html());
    var pnu = $(this).parent().parent().find(".popContent01").html();
    var address = $(this).parent().parent().find(".popContent02").html();
    var jibun = $(this).parent().parent().find(".popContent03").html();
    var sido_nm = $(this).parent().parent().find(".popContent0201").html();
    var sgg_nm = $(this).parent().parent().find(".popContent0202").html();
    var emd_nm = $(this).parent().parent().find(".popContent0203").html();
    var ri_nm = $(this).parent().parent().find(".popContent0204").html();
	var bcode = $(this).parent().parent().find(".popContent0205").html();
    console.log("pnu:" + pnu);
    console.log("address:" + address);
    console.log("jibun:" + jibun);
    $("#maddress").val(address + " " + jibun);
    $("#raddress").val(address + " " + jibun);
    $("#mpnu").val(pnu);
    $("#mjibun").val(jibun);
    $("#sido_nm").val(sido_nm);
    $("#sgg_nm").val(sgg_nm);
    $("#emd_nm").val(emd_nm);
    $("#ri_nm").val(ri_nm);
	$("#addrcode").val(bcode);

    //$('#addressSearchResult').html(address + ' ' + jibun);
    var targetDiv = $("#searchResultPopDiv").parent().find("#searchResultPopup").find(".popupWrap");
    $(".popupWrap").removeClass("active");
})