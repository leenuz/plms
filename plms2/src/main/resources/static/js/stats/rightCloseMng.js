var table;
$(document).ready(function() {
	
	/*$('#jisa').niceSelect();*/
	//testAjax();
	//init_Table();
	var params={"SAVE_YEAR":"2024"}
	loadDataTable(params);
});




// 커스텀 selectbox

const createCustomLiRightCloseMng = () => {
    const contentItems = document.querySelectorAll('.selectContentArea');

    contentItems.forEach(contentItem => {
        if (contentItem.classList.contains('passedSelect')) {
            return ;
        }
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
        const customSelectLi = customSelectBtns.querySelectorAll('li');

        if (customSelectLi.length>0) {
            contentItem.classList.add('passedSelect');
        }

    });
}
createCustomLiRightCloseMng();


const customSelectView = document.querySelectorAll('.customSelectView')

customSelectView.forEach((btn) => {
    btn.addEventListener('click', function () {
        btn.classList.toggle('active');

        if (btn.nextElementSibling) {
            btn.nextElementSibling.classList.toggle('active');

        }
    })
})




const moreBtnEventForRightCloseMng = () => {
    // customSelectBtns 리스트 click 했을 때 해당 내용으로 바뀌게하기


    const customSelectBtns = document.querySelectorAll('#rightCloseMng .customSelectBtns');

    
    customSelectBtns.forEach((btn) => {
        
        btn.addEventListener('click', function(event){
            if (event.target.classList.contains('moreSelectBtn')) {

                const moreBtn = event.target;

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
            }
        })
    })
};

moreBtnEventForRightCloseMng();

// 현재 연도를 구하는 방법
const findYear = () => {
    const currentYear = new Date().getFullYear();
    console.log(currentYear);
    const yearBox = [];

    for (let x = 0; x<= 4 ; x++) {
        yearBox.push(currentYear - x);
    };
    console.log(yearBox);

    const yearboxSelectBox = document.getElementById('rightCloseMngSelectBox01_1');

    for (let z = 0 ; z<6 ; z++) {
        const yearOptuion = document.createElement('option');

        if (z == 0) {
            yearOptuion.textContent = '전체';
            yearOptuion.value = '';
        } else {            
            yearOptuion.textContent = yearBox[5-z]+'년';
            yearOptuion.value = yearBox[5-z];
        }

        yearboxSelectBox.appendChild(yearOptuion);
    }

    createCustomLiRightCloseMng();
}
findYear();

// 월을 구하는 방법

const findMonth = () => {
    const monthSelectBox = document.getElementById('rightCloseMngSelectBox01_2');

    for (let y = 0; y<= 12 ; y++) {
        const monthOption = document.createElement('option');

        if (y == 0) {
            monthOption.textContent = '전체';
            monthOption.value = '';
        } else {
            monthOption.textContent = y +'월' ;
            monthOption.value = y ;
        }

        monthSelectBox.appendChild(monthOption);
    }

    createCustomLiRightCloseMng();
}
findMonth();

// 마감처리 팝업


const rightCloseMngOffPopEvet = () => {

    const offBtn = document.querySelector("#rightCloseMng .offBtn");
    const rightCloseMngOffPopWrapper = document.querySelector(".rightCloseMngOffPopWrapper");
    let approvalFilePath = '/components/popuphtml/superficies_statistics_Popup/deadline_Popup.html'; // 마감처리

    if (offBtn) {

        let xhr = new XMLHttpRequest();
        xhr.open('GET', approvalFilePath, true);
        xhr.onreadystatechange = function () {
            if (xhr.readyState == 4 && xhr.status == 200) {
                rightCloseMngOffPopWrapper.innerHTML = xhr.responseText;
                runScriptsInElement(rightCloseMngOffPopWrapper); // 삽입된 html내 스크립트 실행 함수 호출
            }
        };
        xhr.send();
        console.log('rightCloseMngOffPopWrapper 작동');
        offBtn.addEventListener("click", () => {

            const popupOpen = document.getElementById("deadline_Popup");
            if (popupOpen) {

                popupOpen.classList.add("active");
            }

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

rightCloseMngOffPopEvet();





$(document).on("click",".deadbtn",function(){
	
	var year=$("#popupSelectBox01_1").val().replace('년', '').replace('선택', '');
	var month=$("#popupSelectBox01_2").val().replace('월', '').replace('선택', '');
	var date = $('#processDate').val();

	if (year == '') {
	    alert('기준 년도를 선택해 주세요.');
	    return;
	}
	if (month == '') {
	    alert('기준 월을 선택해 주세요.');
	    return;
	}
	if (date == '') {
	    alert('마감처리 일자를 선택해 주세요.');
	    return;
	}

	var params={"SAVE_YEAR":year,"SAVE_QUARTER":month, "PROCESS_DATE":date}
	console.log(params);
	//loadDataTable(params);
	//임시 저장 Go
		url = "/statics/deadlineProcess";
		
		$.ajax({

			url: url,
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
				if (response.success = "Y") {
					console.log("response.success Y");
					//console.log("response.resultData length:" + response.resultData.length);
					$("#save_status").val("TSAVE");
					alert("정상적으로 등록 되었습니다.");
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
			error: function(jqXHR, textStatus, errorThrown) {
				alert("finalBtn ajax error\n" + textStatus + ":" + errorThrown);
				return false;
			}

		});

})






$(document).on("click","#searchBtn",function(){
	
	var year=$("#rightCloseMngSelectBox01_1").val();
	var month=$("#rightCloseMngSelectBox01_2").val();
	
	var params={"SAVE_YEAR":year,"SAVE_QUARTER":month}
	console.log(params);
	loadDataTable(params);
})






function loadDataTable(params) {
	console.log("-----start loadDataTable----------");
	console.log(params);

	//var json=JSON.stringify(params);
	
	//지사정보
	let jisaCheck = $("#loginJisa").val();

	table = $('#userTable').DataTable({
		/*fixedColumns: {
			start: 3,
		},*/
		scrollCollapse: true,
		scrollX: true,
		scrollY: 600,
		paging: true,
		"oLanguage": { "sLengthMenu": "_MENU_" },
		//dom: '<"dt-center-in-div"l>B<f>r>t<>p',
		dom: '<"top"<"dt-title">Bl><"dt-center-in-div"r><"bottom"tp><"clear">',
		buttons: [{ extend: 'excel', text: '엑셀 다운로드' }],
		pageLength: 20,
		bPaginate: true,
		bLengthChange: true,
		bInfo: false,
		lengthMenu: [[10, 20, 50, -1], ["10건", "20건", "50건", "All"]],
		bAutoWidth: false,
		processing: true,
		ordering: true,
		bServerSide: true,
		searching: false,
		destroy: true,
		order: [[1, 'desc']],
		rowReorder: {
			dataSrc: 'b_seq'
		},
		//	sAjaxSources:"/land/songyu/menu01DataTableList",
		//	sServerMethod:"POST",
		ajax: {
			url: "/statics/selectStatisticsDeadlineListTableList",
			type: "POST",
			datatype: "json",
			data: function(d) {
				//d=params;
				d.jisa = ljsIsNull(jisaCheck) ? ljsIsNull(params.jisa) ? '' : params.jisa : jisaCheck;
				d.SAVE_YEAR=params.SAVE_YEAR;
				d.SAVE_QUARTER=params.SAVE_QUARTER;
				
				console.log(params);
				console.log("-----------d-----------");
				console.log(d);
			},
			dataSrc: function(json) {
				console.log("-------------json---------------");
				console.log(json);
				//$("#dataTableTotalCount").html(json.recordsTotal.toLocaleString());
				//$("div.dt-title").html('<div class="dataTitles"><h5>총 검색 건 수</h5></div>');
				return json.data;
			}
		},
		initComplete: function() {

			console.log(this.api().data().length);

		},
		/*"fnRowCallback": function( nRow, aData, iDisplayIndex, iDisplayIndexFull ) {
//	console.log(aData);
	$('td:eq(0)', nRow).html(iDisplayIndexFull +1);
return nRow;
},*/

		columns: [
			{ data: "save_year", "orderable": false },//0
			{ data: "save_quarter", "defaultContent": "" },
			{ data: "save_date"},
			{ data: "sayuji_y_y", "defaultContent": "" },
			{ data: "sayuji_y_n", "defaultContent": "" },
			{ data: "sayuji_n", "defaultContent": "" },//5
			{ data: "sayuji_total", "defaultContent": "" },
			{ data: "gukyuji_j", "defaultContent": "" },
			{ data: "gukyuji_y", "defaultContent": "" },
			{ data: "gukyuji_n", "defaultContent": "" },
			{ data: "gukyuji_total", "defaultContent": "" },//10
			
		],
		columnDefs: [

			{ "className": "dt-head-center", "targets": "_all" },
			{ className: 'dt-center', "targets": "_all" },
			{ targets: [0], width: "50px" },
			{ targets: [1], width: "30px" },
			{ targets: [2], width: "50px" }, //주소
			{ targets: [3], width: "50px" },
			{ targets: [4], width: "50px" },
			{ targets: [5], width: "50px" }, //소유자
			{ targets: [6], width: "50px" },
			{ targets: [7], width: "50px" },
			{ targets: [8], width: "50px" },
			{ targets: [9], width: "100px" }, //등기여부
			{ targets: [10], width: "100px" }, //등기일
		
			{
				targets: [11]
				, width: "100px"
				, render: function(data, type, row, meta) {
					return ` <button class="downloadBtn">다운로드</button>`;
				}
			}, //지도보기
		]
	});

	}
	/*table.on('click', 'tr', function() {
		var target = $(event.target);

		var isButtonCell = target.closest('td').index() === 12;

		if (isButtonCell) {
			event.stopPropagation(); // 버튼 클릭 시에는 동작하지 않도록 이벤트 전파 차단
			return;
		} else {
			// 다른 열을 클릭했을 때만 상세 페이지로 이동
			console.log("--------------tr click---------------------");

			var data = table.row(this).data();
			console.log(data);
			console.log(data.idx);

			var url = "/land/jisang/easementDetails?idx=" + data.idx;
			window.location = url;
		}

	});*/