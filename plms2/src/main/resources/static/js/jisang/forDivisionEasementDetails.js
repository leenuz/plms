/*
 * [참고] 지상권 분할에서 들어온 상세보기(forDivisionEasementDetails)는 지상권 수정 상세보기(easementDetails)랑 버튼 1개 빼고 동일해서 복사 붙여넣기 함.
*/

$(document).ready(function() {
	

	$('#mapBtn').on('click', function() {
		openMapWindow({ 'lon': mapCoordLng, 'lat': mapCoordLat, 'zoom': '15' });
	})
});
/***********************************************************/
function divisionPageGo(obj){
	console.log(obj);
	
	const urlParams = new URL(location.href).searchParams;
	const idx = urlParams.get('idx');
	const index = urlParams.get('index');
	const js_idx = urlParams.get('js_idx');
	
	url = "/land/jisang/divisionRegister?idx=" + idx + "&index=" + index + "&js_idx=" + js_idx;
	
	window.location = url;
}



/***********************************************************/
//첨부파일 - 파일 보기 클릭 시 팝업 기능
function openFilePopup(filePath, fileName, fileJisangNo, fileSeq, fileGubun) {
	commonFileView(filePath, fileName, fileJisangNo, fileSeq, fileGubun);
}

//첨부파일 - 다운로드 스크립트
function downloadFile(filePath, fileName, fileJisangNo, fileSeq, fileGubun) {
	commonFileDownload(filePath, fileName, fileJisangNo, fileSeq, fileGubun);
}