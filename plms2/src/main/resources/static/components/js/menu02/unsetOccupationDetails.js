const memoEditBtn = document.querySelectorAll('#unsetOccupationDetails .memoSection .editBtn')
const editBefore = document.querySelectorAll('#unsetOccupationDetails .memoSection .contents .content.btnBox .editBefore');
const editAfter = document.querySelectorAll('#unsetOccupationDetails .memoSection .contents .content.btnBox .editAfter');
const editContent = document.querySelectorAll('#unsetOccupationDetails .editSpace');
const editingHideContent = document.querySelectorAll('#unsetOccupationDetails .editingHideContent')

memoEditBtn.forEach((btn) => {
    btn.addEventListener('click', function () {
        var thisEditContent = btn.closest('.contents');
        console.log(thisEditContent);

        thisEditContent.classList.add('editing');

    })
})