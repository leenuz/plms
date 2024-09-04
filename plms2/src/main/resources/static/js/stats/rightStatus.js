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