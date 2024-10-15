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
		});
  
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



