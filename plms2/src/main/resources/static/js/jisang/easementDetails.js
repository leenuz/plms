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




//보기 클릭 시 팝업 기능
function openFilePopup(filePath) {
	console.log(filePath);
    // 절대 경로를 사용하도록 file:// 스킴을 추가
    const serverUrl = `/api/downloadFile?filePath=` + encodeURIComponent(filePath);

    // 새 창의 옵션 설정 (예: 너비 600px, 높이 400px, 스크롤바 허용 등)
    const popupOptions = "width=800,height=600,scrollbars=yes,resizable=yes";
    // 새 창 열기
    window.open(serverUrl, '파일 보기', popupOptions);
}

//다운로드 스크립트
function downloadFile(filePath, fileName) {
      const url = `/api/download?filePath=${filePath}&fileName=${encodeURIComponent(fileName)}`;
	 //  const url = `/api/download?filePath=${filePath}&fileName=${fileName}`;
	   console.log(url);
       window.open(url, '_blank');  // 새 창이나 새 탭에서 파일 다운로드
   }

