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
			url = "/jisang/divisionRegister?idx=" + idx + "&index=" + index + "&js_idx=" + js_idx ;
			  window.location = url;
    });

    $('#mapBtn').on('click', function() {
        openMapWindow({'lon':mapCoordLng, 'lat':mapCoordLat, 'zoom':'15'});
    })
});

