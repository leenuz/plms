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
});

 
const loadData = () => {
    var params = {JISA:  $("#rightStatusSelectBox01").val() , ADDRCODE:"",SGG:"", KIJUN:"", SIDO:""}
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
            if(response == 'Y'){
                const result = response.result;
                if(result != null && result != undefined){
                    //사유지
                    const sayuji_yy = parseInt(reslut.SAYUJI_Y_Y, 0);
                    const sayuji_yn = parseInt(reslut.SAYUJI_Y_N, 0);
                    const sayuji_n = parseInt(reslut.SAYUJI_N, 0);
                    const sayuji_sum = sayuji_yy + sayuji_yn + sayuji_n;
                    $("#SAYUJI_Y_Y").val(sayuji_yy);
                    $("#SAYUJI_Y_N").val(sayuji_yn);
                    $("#SAYUJI_N").val(sayuji_n);
                    $("#SAYUJI_SUM").val(sayuji_sum);
                    //국유지
                    const gukyuji_y = parseInt(reslut.GUKYUJI_Y, 0);
                    const gukyuji_j = parseInt(reslut.GUKYUJI_J, 0);
                    const gukyuji_n = parseInt(reslut.GUKYUJI_N, 0);
                    const gukyuji_sum = gukyuji_y + gukyuji_j + gukyuji_n;
                    $("#GUKYUJI_Y").val(gukyuji_y);
                    $("#GUKYUJI_J").val(gukyuji_j);
                    $("#GUKYUJI_N").val(gukyuji_n);
                    $("#gukyuji_sum").val(gukyuji_sum);
                    //이슈
                    // id="issueList_01"
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