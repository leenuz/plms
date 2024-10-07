/*
 * [참고] 지상권 분할에서 들어온 상세보기(forDivisionEasementDetails)는 지상권 수정 상세보기(easementDetails)랑 버튼 1개 빼고 동일해서 복사 붙여넣기 함.
*/

$(document).ready(function () {
    // 분할 버튼 클릭 이벤트 리스너
    $('.divideBtn').on('click', function () {
			 const urlParams = new URL(location.href).searchParams;
			  const idx = urlParams.get('idx');
			  const index = urlParams.get('index');
			   const js_idx = urlParams.get('js_idx');
			url = "/land/jisang/divisionRegister?idx=" + idx + "&index=" + index + "&js_idx=" + js_idx ;
			  window.location = url;
    });

    $('#mapBtn').on('click', function() {
        openMapWindow({'lon':mapCoordLng, 'lat':mapCoordLat, 'zoom':'15'});
    })
});

//첨부파일 - 파일 보기 클릭 시 팝업 기능
function openFilePopup(filePath) {
	// 절대 경로를 사용하도록 file:// 스킴을 추가
	const serverUrl = `/api/downloadFile?filePath=` + encodeURIComponent(filePath);

	// 새 창의 옵션 설정 (예: 너비 600px, 높이 400px, 스크롤바 허용 등)
	const popupOptions = "width=800,height=600,scrollbars=yes,resizable=yes";
	// 새 창 열기
	window.open(serverUrl, '파일 보기', popupOptions);
}

//첨부파일 - 다운로드 스크립트
function downloadFile(filePath, fileName, fileJisangNo, fileSeq, fileGubun) {
	//const url = `/api/download?filePath=${filePath}&fileName=${encodeURIComponent(fileName)}`;
	//  const url = `/api/download?filePath=${filePath}&fileName=${fileName}`;
	//console.log(url);
	//window.open(url, '_blank');  // 새 창이나 새 탭에서 파일 다운로드
	
	console.log(filePath);
	console.log(fileName);
	console.log(fileJisangNo);
	console.log(fileSeq);
	console.log(fileGubun);
	
	commonFileDownload(filePath, fileName, fileJisangNo, fileSeq, fileGubun);
}