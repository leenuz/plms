// 커스텀 selectbox

const createCustomLiRightStatus = () => {
    const contentItems = document.querySelectorAll('.selectContentArea');

    contentItems.forEach(contentItem => {
        const notsetAddSelectBox = contentItem.querySelector('select');
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
            button.textContent = optionValue;
            li.appendChild(button);
            customSelectBtns.appendChild(li);
        }

        // 중복 안되게 만들기

        contentItem.classList.add('passedSelect');
    });
}
createCustomLiRightStatus();


const customSelectView = document.querySelectorAll('.customSelectView')

customSelectView.forEach((btn) => {
    btn.addEventListener('click', function () {
        btn.classList.toggle('active');

        if (btn.nextElementSibling) {
            btn.nextElementSibling.classList.toggle('active');

        }
    })
})




const moreBtnEventForRightStatus = () => {
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

            const nearByContent = moreBtn.closest('.selectContentArea');
            const nearBySelectBox = nearByContent.querySelector('select');
            nearBySelectBox.value = moreBtn.textContent;
            console.log(`Selected value: ${nearBySelectBox.value}`);
        })
    });
};

moreBtnEventForRightStatus();

// 마감 팝업


//기본 실행
$(function(){
    $('#rightStatus .searchBtn').click(function() {
        loadData();
    });

    loadData();
});

// 숫자에 쉼표 추가하고 문자열로 변환하는 함수
function formatNumberWithComma(number) {
    return number.toLocaleString() + " 건";
}


 
const loadData = () => {
    var params = {JISA: $("#rightStatusSelectBox01").val(),ADDRCODE:"",SGG:"", KIJUN:"", SIDO:""}
	console.log(params);
	$.ajax({
		url:  "/statics/selectTogiMgtStateList",
		type: 'POST',
		contentType: "application/json",
		data: JSON.stringify(params),
		dataType: "json",
		beforeSend: function(request) {
			console.log("beforesend ........................");
			loadingShow();
		},
		success: function(response) {
			loadingHide();
            console.log(response);
            if(response!= null && response.code == 'Y'){
                const result = response.result;
                if(result != null && result != undefined){
                    //사유지
                    const sayuji_yy = parseInt(result.SAYUJI_Y_Y, 0);
                    const sayuji_yn = parseInt(result.SAYUJI_Y_N, 0);
                    const sayuji_n = parseInt(result.SAYUJI_N, 0);
                    const sayuji_sum = sayuji_yy + sayuji_yn + sayuji_n;
                    $("#SAYUJI_Y_Y").text(formatNumberWithComma(sayuji_yy));
                    $("#SAYUJI_Y_N").text(formatNumberWithComma(sayuji_yn));
                    $("#SAYUJI_N").text(formatNumberWithComma(sayuji_n));
                    $("#SAYUJI_SUM").text(formatNumberWithComma(sayuji_sum));
                    initSAYUJIChart(sayuji_yy, sayuji_yn, sayuji_n, sayuji_sum);
                    //국유지
                    const gukyuji_y = parseInt(result.GUKYUJI_Y, 0);
                    const gukyuji_j = parseInt(result.GUKYUJI_J, 0);
                    const gukyuji_n = parseInt(result.GUKYUJI_N, 0);
                    const gukyuji_sum = gukyuji_j + gukyuji_y + gukyuji_n;
                    $("#GUKYUJI_J").text(formatNumberWithComma(gukyuji_j));
                    $("#GUKYUJI_Y").text(formatNumberWithComma(gukyuji_y));
                    $("#GUKYUJI_N").text(formatNumberWithComma(gukyuji_n));
                    $("#GUKYUJI_SUM").text(formatNumberWithComma(gukyuji_sum));
                    initGUKYUJIChart(gukyuji_j, gukyuji_y, gukyuji_n, gukyuji_sum);
                    //이슈
                    const data = result.issueList;
                    const issue01Cnt = data.filter(item => item.type === "ISSUE" && item.gubun === "D")[0]?.cnt || 0;
                    const issue02Cnt = data.filter(item => item.type === "MINWON" && item.gubun === "D")[0]?.cnt || 0;
                    const issue03Cnt = data.filter(item => item.type === "ISSUE" && item.gubun === "G")[0]?.cnt || 0;
                    // 나머지 데이터 필터링 (위 조건에 맞지 않는 데이터)
                    const issue04Cnt = data.filter(item => 
                        !(
                            (item.type === "ISSUE" && item.gubun === "D") || 
                            (item.type === "MINWON" && item.gubun === "D") || 
                            (item.type === "ISSUE" && item.gubun === "G")
                        )
                    )[0]?.cnt || 0;  // 첫 번째 cnt 값만 추출, 없으면 null

                    $("#issueList_01").text(issue01Cnt);
                    $("#issueList_02").text(issue02Cnt);
                    $("#issueList_03").text(issue03Cnt);
                    $("#issueList_04").text(issue04Cnt);
                }else{
                    console.log("result null");
                }
            }else{
                console.log("response error");
            }
		},
		error: function(jqXHR, textStatus, errorThrown) {
            loadingHide();
			console.log(jqXHR);
			console.log(jqXHR.readyState);
			console.log(jqXHR.responseText);
			console.log(jqXHR.responseJSON);
		}
	});
};


// 사유지 차트
function initSAYUJIChart(yy, yn, n, sum) {
	Highcharts.chart("SAYUJI_Chart", {
		chart: {
			type: 'pie',
		},
		title: {
			text: '사유지' // 차트 제목
		},
		credits: {
			enabled: false // Highcharts 로고 제거
		},
        tooltip: {
            pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'  // 툴팁 포맷
        },
        accessibility: {
            point: {
                valueSuffix: '%'  // 접근성 옵션
            }
        },
        plotOptions: {
            pie: {
                allowPointSelect: true,  // 포인트 선택 가능 여부
                cursor: 'pointer',       // 커서 모양 변경
                dataLabels: {
                    enabled: true,       // 데이터 레이블 표시 여부
                    format: '<b>{point.name}</b>: {point.percentage:.1f} %'  // 데이터 레이블 포맷
                }
            }
        },
        colors: ['#ACC4FF', '#2B7DE1', '#31394C'],
        series: [{
            name: '사유지',
            colorByPoint: true,
            data:  [
                { name: '자산등록(등기)', y: (yy/sum) * 100 },
                { name: '자산등록(미등기)', y: (yn/sum) * 100 },
                { name: '자산 미등록', y: (n/sum) * 100 }
            ]  // 데이터
        }]
	});
}

// 사유지 차트
function initGUKYUJIChart(j, y, n, sum) {
	Highcharts.chart("GUKYUJI_Chart", {
		chart: {
			type: 'pie' 
		},
		title: {
			text: '국유지' // 차트 제목
		},
		credits: {
			enabled: false // Highcharts 로고 제거
		},
        tooltip: {
            pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'  // 툴팁 포맷
        },
        accessibility: {
            point: {
                valueSuffix: '%'  // 접근성 옵션
            }
        },
        plotOptions: {
            pie: {
                allowPointSelect: true,  // 포인트 선택 가능 여부
                cursor: 'pointer',       // 커서 모양 변경
                dataLabels: {
                    enabled: true,       // 데이터 레이블 표시 여부
                    format: '<b>{point.name}</b>: {point.percentage:.1f} %'  // 데이터 레이블 포맷
                }
            }
        },
        colors: ['#AFC2D9', '#43C8A0', '#FF6943'],
        series: [{
            name: '국유지',
            colorByPoint: true,
            data:  [
                { name: '점용', y: (y/sum) * 100 },
                { name: '지상권', y: (j/sum) * 100 },
                { name: '미점용', y: (n/sum) * 100 }
            ]  // 데이터
        }]
	});
}