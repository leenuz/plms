// 커스텀 selectbox

const createCustomLiComplaintManage = () => {
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
    });
}
createCustomLiComplaintManage();


const customSelectView = document.querySelectorAll('.customSelectView')

customSelectView.forEach((btn) => {
    btn.addEventListener('click', function () {
        btn.classList.toggle('active');

        if (btn.nextElementSibling) {
            btn.nextElementSibling.classList.toggle('active');

        }
    })
})


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
})


/* 민원협의내용등록수정 팝업 */

const complainManageAddComplainPopEvet = () => {

     const complainManageAddComplainBtn = document.querySelector("#complaintManage .addComplainBtn");
     const complainManageaddComplainWrapper = document.querySelector(".complainManageaddComplainWrapper");
     const complainAddFilePath = '/components/popuphtml/issue_management_Popup/complaint_register_Poppup.html'; // 삽입할 html 파일 경로

     if( complainManageAddComplainBtn){
 
        let xhr = new XMLHttpRequest();
        xhr.open('GET',  complainAddFilePath , true);
        xhr.onreadystatechange = function() {
            if (xhr.readyState == 4 && xhr.status == 200) {
                complainManageaddComplainWrapper.innerHTML = xhr.responseText;
                runScriptsInElement(complainManageaddComplainWrapper); // 삽입된 html내 스크립트 실행 함수 호출
            }
        };
        xhr.send();
        console.log('complainManageaddComplainWrapper 작동');
   
   
        complainManageAddComplainBtn.addEventListener("click" , () => {
   
              const popupOpen = document.getElementById("complaint_register_Popup");
              if(popupOpen){
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

complainManageAddComplainPopEvet();


/* 민원완료 팝업 */

const complainManageComplainFinPopEvet = () => {

    const complainManageComplainFinBtn = document.querySelector("#complaintManage .complainFinBtn");
    const complainManageComplainFinishWrapper = document.querySelector(".complainManageComplainFinishWrapper");
    const complainFinFilePath = '/components/popuphtml/issue_management_Popup/complaint_completed.html'; // 삽입할 html 파일 경로

    if(complainManageComplainFinBtn){

       let xhr = new XMLHttpRequest();
       xhr.open('GET',  complainFinFilePath , true);
       xhr.onreadystatechange = function() {
           if (xhr.readyState == 4 && xhr.status == 200) {
            complainManageComplainFinishWrapper.innerHTML = xhr.responseText;
               runScriptsInElement(complainManageComplainFinishWrapper); // 삽입된 html내 스크립트 실행 함수 호출
           }
       };
       xhr.send();
       console.log('complainManageComplainFinishWrapper 작동');
  
  
       complainManageComplainFinBtn.addEventListener("click" , () => {
  
             const popupOpen = document.getElementById("complaint_completed");
             if(popupOpen){
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

complainManageComplainFinPopEvet();


//실행
$(function(){
      // 현재 페이지의 URL에서 쿼리 스트링 부분을 가져옴
      const queryString = window.location.search;
      // URLSearchParams 객체 생성 (쿼리 스트링을 파싱)
      const urlParams = new URLSearchParams(queryString);
      // 파라미터 값 가져오기 (예: ?paramName=value 형태에서 paramName의 값)
      const mw_seq = urlParams.get('mw_seq');
      console.log("mw_seq = " + mw_seq);
      self.onDataLoad(mw_seq);
})


//지역명을 조합하는 함수
function getFullAddress(data) {
    const parts = [];
    if (data.sido_nm) parts.push(data.sido_nm);
    if (data.sgg_nm) parts.push(data.sgg_nm);
    if (data.emd_nm) parts.push(data.emd_nm);
    if (data.ri_nm) parts.push(data.ri_nm);
    if (data.jibun_full) parts.push(data.jibun_full);
    return parts.join(' ');
}

function onDataLoad(mw_seq){
	var allData = { "MW_SEQ" : mw_seq };
	$.ajax({
		url: "/issue/selectMinwonDetail",
		data: JSON.stringify(allData),
		async: true,
		type: "POST",
		dataType: "json",
		contentType: 'application/json; charset=utf-8',
		success: function (data, jqXHR) {
            console.log(data);
            const result = data.result;
            const agreeList = data.agreeList;
            const tojiList = data.tojiList;
            const fileList = data.fileList;

            $('#dopcoAllWrappers .com_name').val(result.mw_title); //민원명
            $('#dopcoAllWrappers .occ_date').val(result.mw_occur_date); //발생일자
            $('#dopcoAllWrappers .jisa').val(result.jisa); //발생지사
            $('#dopcoAllWrappers .issue_type').val(`${result.code_str1} > ${result.code_str2} > ${result.code_str3}`); //이슈타입
            $('#dopcoAllWrappers .prog_status').val(result.status_str); //진행현황
            $('#dopcoAllWrappers .land_history').text(""); //토지이력
            $('#dopcoAllWrappers .requirements').text(""); //요구사항
            $('#dopcoAllWrappers .land_contents').text(""); //내용

            $('#dopcoAllWrappers .civil_petition_land .contents').remove();
            $.each(tojiList, function (index, item) {
            var newItem = `
            <ul class="contents">
              <li class="content">
                <input type="text" readonly class="notWriteInput" value="${item.rep_yn}">
              </li>
              <li class="content largeWidth">
                <input type="text" readonly class="notWriteInput" value="${getFullAddress(item)}">
              </li>
              <li class="content">
                <input type="text" readonly class="notWriteInput" value="${item.registed_yn}">
              </li>
              <li class="content">
                <input type="text" readonly class="notWriteInput" value="${item.permitted_yn}">
              </li>
            </ul>
           `;
            $('#dopcoAllWrappers .civil_petition_land').append(newItem);
            });
		},
		beforeSend: function () {
			//(이미지 보여주기 처리)
			//$('#load').show();
            loadingShow();
		},
		complete: function () {
			//(이미지 감추기 처리)
			//$('#load').hide();
            loadingHide();
		},
		error: function (jqXHR, textStatus, errorThrown, responseText) {
			//alert("ajax error \n" + textStatus + " : " + errorThrown);
			console.log(jqXHR);
			console.log(jqXHR.readyState);
			console.log(jqXHR.responseText);
			console.log(jqXHR.responseJSON);
		}
	}) //end ajax
}
