// 커스텀 selectbox

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
                            addressInputBox02.readOnly = false,
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

$(document).ready(function () {
    console.log("songyu/netsetadd.js start");

});

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
       var url = "/songyu/searchResultsPopup";
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
             url:"/songyu/searchResultsPopup",
             method:"POST",
             data:params,
             dataType:"html",
             success: eventSuccess,
             error: function(xhr, status, error) {alert(error);}
      });
      
      function eventSuccess(data)
      {
             //여기서 팝업된 창의 주소를 변경하자.
             w.location.href = "/songyu/searchResultsPopup";
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
        $(thisUl).removeClass("editing");
        $(thisUl).find('li input').attr('readonly', true);
        if (editingCount < 3) {
            $("#soujaDiv").append('<ul class="contents editing" id="soujaUl">' + addUl + '</ul>');
        }
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

$(document).on("click", "#deleteFileBtn", function () {
    //const attachFiles = document.querySelectorAll('input:checkbox[name="attachFile"]:checked');
    /*$('input:checkbox[name=attachFile]').each(function (index) {
        if($(this).is(":checked")==true){
            console.log($(this).val());
        }
    })*/
    const clickedAttachFiles = document.querySelectorAll('input[name="attachFile"]:checked');
    console.log(clickedAttachFiles);
    console.log(uploadFiles);
    for (var i = 0; i < clickedAttachFiles.length; i++) {
        var delEle = $(clickedAttachFiles[i]).closest("#fileListUl");
        console.log($(clickedAttachFiles[i]).closest("#fileListUl").html());
        $(delEle).remove();
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

	var rowCount = 0;
    function handleFileUpload(files, obj) {
        console.log("-------------handleFileUpload---------------");
        console.log(files);
        for (var i = 0; i < files.length; i++) {
            var fd = new FormData();
            fd.append('file', files[i]);

            var status = new createStatusbar($("#fileTitleUl"), files[i].name, files[i].size, rowCount); //Using this we can set progress.
            //  status.setFileNameSize(files[i].name,files[i].size);
            sendFileToServer(fd, status);

			rowCount++; // 파일이 추가될 때마다 rowCount를 증가시켜 고유한 id를 유지
        }
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

        var row = '<ul class="contents" id="fileListUl">';
        row += '<li class="content01 content checkboxWrap">';
        row += '<input type="checkbox" id="attachFile' + no + '" name="attachFile" >';
        row += '<label for="attachFile' + no + '"></label>';
        row += '</li>';
        row += '<li class="content02 content"><input type="text" id="filename" placeholder="' + name + '" class="notWriteInput" readonly></li></ul>';
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
        var uploadURL = "/jisang/fileUpload/post"; //Upload URL
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

    //저장버튼
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
        const attachFileUls = document.querySelectorAll('input[name="attachFile"]:checked');
        console.log(attachFileUls);

        //   console.log(soujaUls);
        var soujaArr = new Array();
        for (var i = 0; i < soujaUls.length; i++) {
            console.log(soujaUls[i]);
            console.log($(soujaUls[i]).find("#soujaJibun").val());
            var soujaJibun = $(soujaUls[i]).find("#soujaJibun").val();
            var soujaName = $(soujaUls[i]).find("#soujaName").val();
            var soujaAddress = $(soujaUls[i]).find("#soujaAddress").val();
            var soujaContact1 = $(soujaUls[i]).find("#soujaContact1").val();
            var soujaContact2 = $(soujaUls[i]).find("#soujaContact2").val();

            soujaJibun = (soujaJibun == "undefined" || soujaJibun == "" || soujaJibun == null) ? "" : soujaJibun;
            soujaName = (soujaName == "undefined" || soujaName == "" || soujaName == null) ? "" : soujaName;
            soujaAddress = (soujaAddress == "undefined" || soujaAddress == "" || soujaAddress == null) ? "" : soujaAddress;
            soujaContact1 = (soujaContact1 == "undefined" || soujaContact1 == "" || soujaContact1 == null) ? "" : soujaContact1;
            soujaContact2 = (soujaContact2 == "undefined" || soujaContact2 == "" || soujaContact2 == null) ? "" : soujaContact2;
            var soujaInfo = { "jibun": soujaJibun, "soujaName": soujaName, "soujaAddress": soujaAddress, "soujaContact1": soujaContact1, "soujaContact2": soujaContact2 };
            if (soujaJibun != "" && soujaName != "" && soujaAddress != "" && soujaContact1 != "") soujaArr.push(soujaInfo);
        }
        var files = new Array();
        for (var i = 0; i < attachFileUls.length; i++) {
            console.log($(attachFileUls[i]).parent().parent().html());
            var fname = $(attachFileUls[i]).parent().parent().find("#filename").attr('placeholder');
            console.log(fname);
            files.push(fname);
        }

        console.log("--------files---------");
        console.log(files);

        console.log("--------soujaArr------");
        console.log(soujaArr);
        dataObj.soujaInfo = soujaArr;
        dataObj.uploadFiles = files;

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
		dataObj.gubun="insert";
        console.log("------dataObj--------");
        console.log(dataObj);

        // 서버 전송
         url = "/songyu/insertSonguList";
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
                 console.log(response);
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

    $.ajax({
        url: "/gover/getPipeName", // 관로명 목록을 가져오는 API
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

