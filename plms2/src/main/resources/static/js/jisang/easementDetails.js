$(document).ready(function () {
    // 수정 버튼 클릭 이벤트 리스너
    $('.editBtn').on('click', function () {
        // data-jisang-no 속성에서 값 추출
        const jmJisangNo = $(this).data('jisang-no');
        
        // API 요청 경로 설정 (jm_jisang_no를 포함)
        const url = `/jisang/easementModification?idx=${jmJisangNo}`;

        // 페이지 이동을 통한 API 호출
        window.location.href = url;
    });

    $('#mapBtn').on('click', function() {
        openMapWindow({'lon':mapCoordLng, 'lat':mapCoordLat, 'zoom':'15'});
    })
});
