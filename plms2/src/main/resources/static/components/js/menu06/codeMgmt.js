// 커스텀 selectbox
const initComboBox = () => {
    const createCustomLiIssueCodeMgmt = () => {
        const contentItems = document.querySelectorAll('.selectICodeContentArea');
        $('.selectICodeContentArea .customSelectBtns').html('');
    
        contentItems.forEach(contentItem => {
            const notsetAddSelectBox = contentItem.querySelector('select');
            // select가 없으면 return
            if (!notsetAddSelectBox) return;
    
            const customSelectBox = contentItem.querySelector('.customSelectBox');
            const customSelectBtns = customSelectBox.querySelector('.customSelectBtns');
    
            for (let i = 0; i < notsetAddSelectBox.length; i++) {
                const optionValue = notsetAddSelectBox.options[i].value;
                const optionText = notsetAddSelectBox.options[i].text;
                const li = document.createElement('li');
                const button = document.createElement('button');
                button.classList.add('moreSelectBtn');
                button.type = 'button';
                button.textContent = optionText;
                button.setAttribute('data', optionValue)
                li.appendChild(button);
                customSelectBtns.appendChild(li);
            }
        });
    }
    createCustomLiIssueCodeMgmt();
    
    // customSelectBtns 리스트 click 했을 때 해당 내용으로 바뀌게하기
    const MoreSelectBtn = document.querySelectorAll('.moreSelectBtn')

    MoreSelectBtn.forEach((moreBtn) => {
        moreBtn.addEventListener('click', function () {
            var moreSelectBtnText = moreBtn.innerText;
            console.log(moreSelectBtnText);
            const parentMoreSelectBtn = moreBtn.closest('.customSelectBtns')
            const EditCustomViewBtn = parentMoreSelectBtn.previousElementSibling;
    
            while (EditCustomViewBtn.firstChild) {
                EditCustomViewBtn.removeChild(EditCustomViewBtn.firstChild);
            }
            const textNode = document.createTextNode(moreSelectBtnText);
            EditCustomViewBtn.appendChild(textNode);
    
            EditCustomViewBtn.classList.remove('active')
            parentMoreSelectBtn.classList.remove('active')
    
    
            // 선택한 걸 select의 value값으로 변경하기
            const nearByContent = moreBtn.closest('.selectICodeContentArea');
            const nearBySelectBox = nearByContent.querySelector('select');
            nearBySelectBox.value = moreBtn.getAttribute("data");
            console.log(`Selected value: ${nearBySelectBox.value}`);
            if(nearBySelectBox.getAttribute('id') == 'issueCodeMgmtSelectBox01_1') {
                loadDepth2Codes();
            } else if (nearBySelectBox.getAttribute('id') == 'issueCodeMgmtSelectBox01_2') {
                loadDepth3Codes();
            };
        })
    })
};

initComboBox();

const customSelectView = document.querySelectorAll('.customSelectView')
    
customSelectView.forEach((btn) => {
    btn.addEventListener('click', function () {
        btn.classList.toggle('active');

        if (btn.nextElementSibling) {
            btn.nextElementSibling.classList.toggle('active');

        }
    })
});

var depth1Datas = [];
var depth2Datas = [];
var depth3Datas = [];

// 분류 데이터 가져오기
// 대분류 selectIssueCodeListDepth1
const loadDepth1Codes = () => {
    var isCodeAdmin = $('input[name="codeManagement_radio01"]:checked').val();
    var REGISTED_YN = $('input[name="codeManagement_radio02"]:checked').val();
    var flagStr = '';
    if (isCodeAdmin == 'GN' || isCodeAdmin == 'GY') {
        flagStr = '&PERMITTED_YN=' + REGISTED_YN;
    } else {
        flagStr = '&REGISTED_YN=' + REGISTED_YN;
    }

	$.ajax({
		url: "/issue/selectIssueCodeListDepth1?IS_CODE_ADMIN=" + isCodeAdmin + flagStr,
		async: true,
		type: "POST",
		dataType: "json",
		contentType: 'application/json; charset=utf-8',
		success: function (response) {
			console.log(response);
            if (response.message="success"){
                const resultData = response.result;
                depth1Datas = resultData;

                var optionsStr = '<option value="" selected>전체</option>';
                for (row of resultData) {
                    optionsStr += '<option value="' + row.code + '">' + row.code_name + '</option>'
                }
                $('#issueCodeMgmtSelectBox01_1').html(optionsStr);
                $('#issueCodeMgmtSelectBox01_2').html('<option value="" selected>전체</option>');
                $('#issueCodeMgmtSelectBox01_3').html('<option value="" selected>전체</option>');

                initComboBox();
            }
		},
		error: function () {
		}
	});
};

loadDepth1Codes();

// 중분류 selectIssueCodeListDepth2
const loadDepth2Codes = () => {
    var depth1Code = $('#issueCodeMgmtSelectBox01_1').val();
    if (depth1Code == '') {
        $('#issueCodeMgmtSelectBox01_2').html('<option value="">전체</option>');
        $('#issueCodeMgmtSelectBox01_3').html('<option value="">전체</option>');
        initComboBox();
        $($('#depth2Codes button')[0]).trigger('click')
        $($('#depth3Codes button')[0]).trigger('click')
        return;
    }

	$.ajax({
		url: "/issue/selectIssueCodeListDepth2?DEPTH1=" + depth1Code,
		async: true,
		type: "POST",
		dataType: "json",
		contentType: 'application/json; charset=utf-8',
		success: function (response) {
			console.log(response);
            if (response.message="success"){
                const resultData = response.result;
                depth2Datas = resultData;

                var optionsStr = '<option value="">전체</option>';
                for (row of resultData) {
                    optionsStr += '<option value="' + row.code + '">' + row.code_name + '</option>'
                }
                $('#issueCodeMgmtSelectBox01_2').html(optionsStr);
                $('#issueCodeMgmtSelectBox01_3').html('<option value="">전체</option>');

                initComboBox();
                $($('#depth2Codes button')[0]).trigger('click')
                $($('#depth3Codes button')[0]).trigger('click')
            }
		},
		error: function () {
		}
	});
};

// 세분류 selectIssueCodeListDepth2
const loadDepth3Codes = () => {
    var depth1Code = $('#issueCodeMgmtSelectBox01_1').val();
    var depth2Code = $('#issueCodeMgmtSelectBox01_2').val();
    if (depth2Code == '') {
        $('#issueCodeMgmtSelectBox01_3').html('<option value="">전체</option>');
        initComboBox();
        $($('#depth3Codes button')[0]).trigger('click');
        return;
    }

	$.ajax({
		url: "/issue/selectIssueCodeListDepth3?DEPTH1=" + depth1Code + '&DEPTH2=' + depth2Code,
		async: true,
		type: "POST",
		dataType: "json",
		contentType: 'application/json; charset=utf-8',
		success: function (response) {
			console.log(response);
            if (response.message="success"){
                const resultData = response.result;
                depth3Datas = resultData;

                var optionsStr = '<option value="">전체</option>';
                for (row of resultData) {
                    optionsStr += '<option value="' + row.code + '">' + row.code_name + '</option>'
                }
                $('#issueCodeMgmtSelectBox01_3').html(optionsStr);

                initComboBox();
                $($('#depth3Codes button')[0]).trigger('click')
            }
		},
		error: function () {
		}
	});
};

// 코드관리 세분류 click 이벤트
const codeMgmtInfoAddBtnEvent = () => {
    const infoContentsDetailBox = document.querySelector('#codeMgmt .resultArea .contWrap');
    const infoSection = infoContentsDetailBox.closest('.resultArea');
    const infoContentsBox = infoContentsDetailBox.querySelector('.contentsBox');
    const infoAddBtn = infoSection.querySelectorAll('.addBtn');
    const infoContents = infoContentsDetailBox.querySelectorAll('.contents');
    const infoTitles = infoContentsDetailBox.querySelector('.titles');

    console.log(infoContents.length)

    infoSection.addEventListener('click', function (event) {
        // 버튼 클릭시 추가되게
        if (event.target.classList.contains('addBtn')) {
            // ul 만들기
            const infoUl = document.createElement('ul');
            infoUl.classList.add('contents');

            for (let i = 1; i <= 3; i++) {
                // li 만들기
                const infoLi = document.createElement('li');
                infoLi.classList.add('content');

                if (i == 1) {
                    infoLi.classList.add('checkboxWrap');

                    // input checkbox 세팅
                    const checkboxInput = document.createElement('input');
                    checkboxInput.type = 'checkbox';
                    checkboxInput.id = `codeMgmt_checkbox_${Date.now()}_${i}`;

                    infoLi.appendChild(checkboxInput);

                    // label 세팅
                    const checkboxLabel = document.createElement('label');
                    checkboxLabel.setAttribute('for', checkboxInput.id);

                    infoLi.appendChild(checkboxLabel);
                } else if (i == 2) {
                    infoLi.classList.add('largeWidth');
                    const infoInput = document.createElement('input');
                    infoInput.type = 'text';
                    infoInput.name = 'code_name';

                    // li안에 넣기
                    infoLi.append(infoInput);

                    // 히든정보
                    const hiddenInput = document.createElement('input');
                    hiddenInput.type = 'hidden';
                    hiddenInput.name = 'code';
                    hiddenInput.value = '';

                    // li안에 넣기
                    infoLi.append(hiddenInput);
                } else if (i == 3) {
                    infoLi.classList.add('middleWidth');
                    // input 만들기
                    const dateInput = document.createElement('input');
                    dateInput.type = 'text';
                    dateInput.readOnly = true;
                    dateInput.placeholder = '0';
                    dateInput.classList.add('notWriteInput');

                    infoLi.appendChild(dateInput);
                }

                infoUl.appendChild(infoLi);
            }
            infoContentsBox.appendChild(infoUl);

            const resultAreaContents = infoContentsDetailBox.querySelectorAll('.contents');

            if (resultAreaContents.length > 5) {
                infoContentsBox.classList.add('contentScr');
                infoTitles.classList.add('titleScr');
            } else {
                infoContentsBox.classList.remove('contentScr');
                infoTitles.classList.remove('titleScr');
            }
        }
        // 삭제 버튼 누를 때
        if (event.target.classList.contains('delBtn')) {
            var thisCheckedDelContent = infoContentsBox.querySelectorAll('input[type="checkbox"]:checked');
            var infoCheckboxs = infoContentsBox.querySelectorAll('input[type="checkbox"]');

            thisCheckedDelContent.forEach((checkbox) => {
                const checkedContents = checkbox.closest('.contents');

                var code = checkedContents.querySelector('input[name=code]').value;
                for (row of editDatas) {
                    if (row.code == code) {
                        row.code_del = 'Y';
                        break;
                    }
                }

                if (checkedContents) {
                    checkedContents.remove();
                }

                const resultAreaContents02 = infoContentsDetailBox.querySelectorAll('.contents');

                if (resultAreaContents02.length > 5) {
                    infoContentsBox.classList.add('contentScr');
                    infoTitles.classList.add('titleScr');
                } else {
                    infoContentsBox.classList.remove('contentScr');
                    infoTitles.classList.remove('titleScr');
                }
            })
        }

        const infoContents = infoContentsBox.querySelectorAll('.contents');

        if (infoContents.length > 4) {
            infoContentsBox.classList.add('contentScr');
            infoTitles.classList.add('titleScr');
        } else {
            infoContentsBox.classList.remove('contentScr');
            infoTitles.classList.remove('titleScr');
        }
    })
}
codeMgmtInfoAddBtnEvent();

$(document).on('change', function (e) {
    if (e.target.type == 'radio') {
        loadDepth1Codes();
    }
});

const addCodeInfo = (row)=> {
    const wakeUpTime = Date.now() + 10;
    while (Date.now() < wakeUpTime) {}
    const infoContentsDetailBox = document.querySelector('#codeMgmt .resultArea .contWrap');
    const infoSection = infoContentsDetailBox.closest('.resultArea');
    const infoContentsBox = infoContentsDetailBox.querySelector('.contentsBox');
    const infoAddBtn = infoSection.querySelectorAll('.addBtn');
    const infoContents = infoContentsDetailBox.querySelectorAll('.contents');
    const infoTitles = infoContentsDetailBox.querySelector('.titles');

    // ul 만들기
    const infoUl = document.createElement('ul');
    infoUl.classList.add('contents');

    for (let i = 1; i <= 3; i++) {
        // li 만들기
        const infoLi = document.createElement('li');
        infoLi.classList.add('content');

        if (i == 1) {
            infoLi.classList.add('checkboxWrap');

            // input checkbox 세팅
            const checkboxInput = document.createElement('input');
            checkboxInput.type = 'checkbox';
            checkboxInput.id = `codeMgmt_checkbox_${Date.now()}_${i}`;

            infoLi.appendChild(checkboxInput);

            // label 세팅
            const checkboxLabel = document.createElement('label');
            checkboxLabel.setAttribute('for', checkboxInput.id);

            infoLi.appendChild(checkboxLabel);
        } else if (i == 2) {
            infoLi.classList.add('largeWidth');
            const infoInput = document.createElement('input');
            infoInput.type = 'text';
            infoInput.name = 'code_name';
            infoInput.value = row.code_name;

            // li안에 넣기
            infoLi.append(infoInput);

            // 히든정보
            const hiddenInput = document.createElement('input');
            hiddenInput.type = 'hidden';
            hiddenInput.name = 'code';
            hiddenInput.value = row.code;

            // li안에 넣기
            infoLi.append(hiddenInput);
        } else if (i == 3) {
            infoLi.classList.add('middleWidth');
            // input 만들기
            const dateInput = document.createElement('input');
            dateInput.type = 'text';
            dateInput.readOnly = true;
            dateInput.placeholder = '0';
            dateInput.value = row.sub_1_cnt + row.sub_2_cnt;
            dateInput.classList.add('notWriteInput');

            infoLi.appendChild(dateInput);
        }

        infoUl.appendChild(infoLi);
    }
    infoContentsBox.appendChild(infoUl);

    const resultAreaContents = infoContentsDetailBox.querySelectorAll('.contents');

    if (resultAreaContents.length > 5) {
        infoContentsBox.classList.add('contentScr');
        infoTitles.classList.add('titleScr');
    } else {
        infoContentsBox.classList.remove('contentScr');
        infoTitles.classList.remove('titleScr');
    }

}

var editType = '';
var editFlag = '';
var editDepth = 0;
var editParentCode = '';
var editDatas = [];

$('#selectDepth1Btn').click(function() {
    const infoContentsDetailBox = document.querySelector('#codeMgmt .resultArea .contWrap');
    infoContentsDetailBox.querySelector('.contentsBox').innerHTML = '';

    var isCodeAdmin = $('input[name="codeManagement_radio01"]:checked').val();
    var REGISTED_YN = $('input[name="codeManagement_radio02"]:checked').val();

    editType = isCodeAdmin;
    editFlag = REGISTED_YN;
    editDepth = 1;
    editParentCode = isCodeAdmin;
    editDatas = [];
    for (row of depth1Datas) {
        var temp = { ...row }
        editDatas.push(temp);
    }

    for (row of editDatas) {
        addCodeInfo(row);
    }
});

$('#selectDepth2Btn').click(function() {
    var depth1Code = $('#issueCodeMgmtSelectBox01_1').val();
    if (depth1Code == '') {
        alert('대분류를 선택해 주세요.');
        return;
    }

    const infoContentsDetailBox = document.querySelector('#codeMgmt .resultArea .contWrap');
    infoContentsDetailBox.querySelector('.contentsBox').innerHTML = '';

    var isCodeAdmin = $('input[name="codeManagement_radio01"]:checked').val();
    var REGISTED_YN = $('input[name="codeManagement_radio02"]:checked').val();

    editType = isCodeAdmin;
    editFlag = REGISTED_YN;
    editDepth = 2;
    editParentCode = depth1Code;
    editDatas = [];
    for (row of depth2Datas) {
        var temp = { ...row }
        editDatas.push(temp);
    }

    for (row of editDatas) {
        addCodeInfo(row);
    }
});

$('#selectDepth3Btn').click(function() {
    var depth2Code = $('#issueCodeMgmtSelectBox01_2').val();
    if (depth2Code == '') {
        alert('중분류를 선택해 주세요.');
        return;
    }
    
    const infoContentsDetailBox = document.querySelector('#codeMgmt .resultArea .contWrap');
    infoContentsDetailBox.querySelector('.contentsBox').innerHTML = '';

    var isCodeAdmin = $('input[name="codeManagement_radio01"]:checked').val();
    var REGISTED_YN = $('input[name="codeManagement_radio02"]:checked').val();

    editType = isCodeAdmin;
    editFlag = REGISTED_YN;
    editDepth = 3;
    editParentCode = depth2Code;
    editDatas = [];
    for (row of depth3Datas) {
        var temp = { ...row }
        editDatas.push(temp);
    }

    for (row of editDatas) {
        addCodeInfo(row);
    }
});

$('.saveBtn').click(()=>{
    const infoContentsDetailBox = document.querySelector('#codeMgmt .resultArea .contWrap');
    const infoContents = infoContentsDetailBox.querySelectorAll('.contents');

    var saveDatas = [];

    for (content of infoContents) {
        inputName = content.querySelector('input[name=code_name]').value;
        inputCode = content.querySelector('input[name=code]').value;
        
        if (inputName == '') {
            alert('분류명이 입력되지 않았습니다.');
            return;
        }

        if (inputCode == '') { // 신규
            var data = {};
            data.code = 'NEW';
            data.code_depth = editDepth;
            data.code_name = inputName;
            if (editType == 'DN' || editType == 'DY') {
                data.REGISTED_YN = editFlag;
                data.PERMITTED_YN = '';
            } else {
                data.REGISTED_YN = '';
                data.PERMITTED_YN = editFlag;
            }

            saveDatas.push(data);
        } else {
            for (row of editDatas) {
                if (row.code == inputCode && row.code_del != 'Y') {
                    // 수정여부 체크
                    if (row.code_name != inputName) {
                        var data = {};
                        data.code = row.code;
                        data.code_name = row.code_name;
                        data.code_depth = editDepth;
                        if (editType == 'DN' || editType == 'DY') {
                            data.REGISTED_YN = editFlag;
                            data.PERMITTED_YN = '';
                        } else {
                            data.REGISTED_YN = '';
                            data.PERMITTED_YN = editFlag;
                        }
                        saveDatas.push(data); 
                    }
                    break;
                }
            }
        }
    }

    for (row of editDatas) {
        if (row.code_del == 'Y') { // 삭제
            var data = {};
            data.code_del = 'Y';
            data.code = row.code;
            data.code_name = row.code_name;
            data.code_depth = editDepth;
            if (editType == 'DN' || editType == 'DY') {
                data.REGISTED_YN = editFlag;
                data.PERMITTED_YN = '';
            } else {
                data.REGISTED_YN = '';
                data.PERMITTED_YN = editFlag;
            }
            saveDatas.push(data);        
        }
    }

    if (saveDatas.length > 0) {
        var paramStr = '';
        paramStr += 'DATA_LENGTH=' + saveDatas.length;
        paramStr += '&PARENT_CODE=' + editParentCode;

        for (var i = 0; i < saveDatas.length; i++) {
            var data = saveDatas[i];

            if (data.code_del == 'Y') {
                paramStr += '&CODE_DEL_' + i + '=Y';
            }
            paramStr += '&CODE_' + i + '=' + data.code;
            paramStr += '&CODE_DEPTH_' + i + '=' + editDepth;
            paramStr += '&CODE_NAME_' + i + '=' + data.code_name;
            paramStr += '&PERMITTED_YN_' + i + '=' + data.PERMITTED_YN;
            paramStr += '&REGISTED_YN_' + i + '=' + data.REGISTED_YN;
        }

        console.log(paramStr);
        $.ajax({
            url: "/issue/saveIssueCodeAdmin?" + paramStr,
            async: true,
            type: "POST",
            dataType: "text",
            contentType: 'application/text; charset=utf-8',
            success: function (response) {
                console.log(response);

                if (response.message="success") {
                    location.reload(true);
                }
            },
            error: function () {
            }
        });
    
    } else {
        alert('저장할 내용이 없습니다.');
    }
});