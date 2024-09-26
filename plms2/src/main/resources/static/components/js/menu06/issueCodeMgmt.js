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
})

// 2024.08.22 추가
const detailDataEvent = () => {
    const dataDetail = document.querySelectorAll('#issueCodeMgmt .tableArea table .dataDetail');

    dataDetail.forEach((detailcell) => {
        detailcell.addEventListener('click', () => {
            window.location = '/components/subHtml/menu06/issueCodeDetail.html';
        })
    })
}
detailDataEvent();

// 분류 데이터 가져오기
// 대분류 selectIssueCodeListDepth1
(() => {
	$.ajax({
		url: "/issue/selectIssueCodeListDepth1",
		async: true,
		type: "POST",
		dataType: "json",
		contentType: 'application/json; charset=utf-8',
		success: function (response) {
			console.log(response);
            if (response.message="success"){
                const resultData = response.result;

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
})();

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

// 목록 조회
function loadData() {
    var allData = {};
    allData.TYPE = $('input[name="issueCodeMgmt_rightsSecured"]:checked').val().substr(0, 1);
    allData.REGISTED_YN = $('input[name="issueCodeMgmt_contractStatus"]:checked').val();
    allData.PERMITTED_YN = $('input[name="issueCodeMgmt_contractStatus"]:checked').val();
    allData.DEPTH1 = $('#issueCodeMgmtSelectBox01_1').val();
    allData.DEPTH2 = $('#issueCodeMgmtSelectBox01_2').val();
    allData.DEPTH3 = $('#issueCodeMgmtSelectBox01_3').val();

	$.ajax({
		url: "/issue/selectIssueCodeList",
		data: JSON.stringify(allData),
		async: true,
		type: "POST",
		dataType: "json",
		contentType: 'application/json; charset=utf-8',
		success: function (response) {
			console.log(response);
            if (response.success="Y"){
                const resultData = response.result;

                var table1Data = []; // 지상권 설정
                var table2Data = []; // 지상권 미설정
                var table3Data = []; // 점용/미점용

                // 데이터 분류
                for (var i = 0; i < resultData.length; i++) {
                    var codeData = resultData[i];
                    var prefix = codeData.depth1_code.substr(0, 2);
                    if (prefix == 'DY') {
                        table1Data.push(codeData);
                    } else if (prefix == 'DN') {
                        table2Data.push(codeData);
                    } else {
                        table3Data.push(codeData);
                    }
                }

                if (table1Data.length > 0) {
                    $('#depth1Div').show();
                } else {
                    $('#depth1Div').hide();
                }
                if (table2Data.length > 0) {
                    $('#depth2Div').show();
                } else {
                    $('#depth2Div').hide();
                }
                if (table3Data.length > 0) {
                    $('#depth3Div').show();
                } else {
                    $('#depth3Div').hide();
                }

                var tbodyStr = '';

                // ### 지상권 설정 테이블
                for (var i = 0; i < table1Data.length; i++) {
                    var row = table2Data[i];
                    
                    var trStr = '<tr>';
                    if (i == 0) {
                        trStr += '<td rowspan="' + table1Data.length + '"><p>지상권 설정</p></td>';
                        trStr += '<td rowspan="' + table1Data.length + '"><p>계약 체결</p></td>';    
                    }
                    trStr += '<td><p>' + row.depth1_name + '</p></td>';
                    trStr += '<td><p>' + row.depth2_name + '</p></td>';
                    trStr += '<td><p>' + row.depth3_name + '</p></td>';
                    trStr += '</tr>';

                    tbodyStr += trStr;
                }
                $('#tbody1').html(tbodyStr);

                // ### 지상권 미설정 테이블
                tbodyStr = '';
                var registedIdxArr = []; // 계약체결 카운트
                var depth1IdxArr = [];
                var depth2IdxArr = [];
                var rComp = '';
                var depth1Comp = '';
                var depth2Comp = '';
                for (var i = 0; i < table2Data.length; i++) {
                    var row = table2Data[i];
                    
                    if (row.registed_yn != rComp) {
                        registedIdxArr.push(i);
                        rComp = row.registed_yn;
                    }
                    if (row.depth1_code != depth1Comp) {
                        depth1IdxArr.push(i);
                        depth1Comp = row.depth1_code;
                    }
                    if (row.depth2_code != depth2Comp) {
                        depth2IdxArr.push(i);
                        depth2Comp = row.depth2_code;
                    }
                }
                registedIdxArr.push(table2Data.length);
                depth1IdxArr.push(table2Data.length);
                depth2IdxArr.push(table2Data.length);

                for (var i = 0; i < table2Data.length; i++) {
                    var row = table2Data[i];

                    var trStr = '<tr>';
                    if (i == 0) {
                        trStr += '<td rowspan="' + table2Data.length + '"><p>지상권 미설정</p></td>';
                    }
                    if (i == registedIdxArr[0]) {
                        registedIdxArr.shift();
                        trStr += '<td rowspan="' + (registedIdxArr[0] - i) + '"><p>계약 ' + ((row.registed_yn != 'Y') ? '미' : '') + '체결</p></td>';
                    }
                    if (i == depth1IdxArr[0]) {
                        depth1IdxArr.shift();
                        trStr += '<td rowspan="' + (depth1IdxArr[0] - i) + '"><p>' + row.depth1_name + '</p></td>';
                    }
                    if (i == depth2IdxArr[0]) {
                        depth2IdxArr.shift();
                        trStr += '<td rowspan="' + (depth2IdxArr[0] - i) + '"><p>' + row.depth2_name + '</p></td>';
                    }
                    trStr += '<td><p>' + row.depth3_name + '</p></td>';
                    trStr += '</tr>';

                    tbodyStr += trStr;
                }
                $('#tbody2').html(tbodyStr);

                // ### 점용 테이블
                tbodyStr = '';
                registedIdxArr = []; // 허가증 보유여부 카운트
                depth1IdxArr = [];
                depth2IdxArr = [];
                rComp = '';
                depth1Comp = '';
                depth2Comp = '';
                for (var i = 0; i < table3Data.length; i++) {
                    var row = table3Data[i];
                    
                    if (row.permitted_yn != rComp) {
                        registedIdxArr.push(i);
                        rComp = row.permitted_yn;
                    }
                    if (row.depth1_code != depth1Comp) {
                        depth1IdxArr.push(i);
                        depth1Comp = row.depth1_code;
                    }
                    if (row.depth2_code != depth2Comp) {
                        depth2IdxArr.push(i);
                        depth2Comp = row.depth2_code;
                    }
                }
                registedIdxArr.push(table3Data.length);
                depth1IdxArr.push(table3Data.length);
                depth2IdxArr.push(table3Data.length);

                for (var i = 0; i < table3Data.length; i++) {
                    var row = table3Data[i];

                    var trStr = '<tr>';
                    if (i == registedIdxArr[0]) {
                        registedIdxArr.shift();
                        trStr += '<td rowspan="' + (registedIdxArr[0] - i) + '"><p>' + ((row.permitted_yn != 'Y') ? '미점용' : '점용') + '</p></td>';
                        trStr += '<td rowspan="' + (registedIdxArr[0] - i) + '"><p>허가증 ' + ((row.permitted_yn != 'Y') ? '미' : '') + '보유</p></td>';
                    }
                    if (i == depth1IdxArr[0]) {
                        depth1IdxArr.shift();
                        trStr += '<td rowspan="' + (depth1IdxArr[0] - i) + '"><p>' + row.depth1_name + '</p></td>';
                    }
                    if (i == depth2IdxArr[0]) {
                        depth2IdxArr.shift();
                        trStr += '<td rowspan="' + (depth2IdxArr[0] - i) + '"><p>' + row.depth2_name + '</p></td>';
                    }
                    trStr += '<td><p>' + row.depth3_name + '</p></td>';
                    trStr += '</tr>';

                    tbodyStr += trStr;
                }
                $('#tbody3').html(tbodyStr);
            }
		},
		error: function () {
		}
	});
}

//기본 실행
$(function(){
    $('.issueCodeMgmtBtn').click(function() {
        loadData();
    });
   loadData();
});