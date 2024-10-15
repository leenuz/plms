import { surfaceHeaderEvet } from './surfaceHeader.js';
import { surfaceSelectEvet, handleCheckboxes } from './surfaceSelectEvet.js';

//import { surfaceInquireSelectEvet , surfaceInquireCheckboxes } from './surfaceInquireSelectEvet.js';
import { surfaceInquireSelectEvet, surfaceInquireCheckboxes } from '/js/jisang/surfaceInquireSelectEvet.js';
import { privateUseSelectEvet } from '/js/gover/privateUseSelecEvet.js';
import { landDevelopmentManageSelectEvet } from '/js/togi/landDevelopmentSelecEvet.js';
import { issueManageSelectEvet } from '/js/issue/issueManageSelecEvet.js';
import { companyLandSelectEvet } from '/js/dopco/companyLandSelecEvet.js'

window.addEventListener("load", () => {

	//header함수 실행
	surfaceHeaderEvet();

	//송유관로현황내 URL에 따라 셀렉박스 작동
	const selecBoxsEvetWrappers = () => {


		const pathName = window.location.pathname;
		console.log(pathName, 'main에서 표출');

		if (pathName === `/land/songyu/menu01`) {
			const companyland01 = document.getElementsByName("companyland01");
			return surfaceSelectEvet("#dopcoSurfacePart .surfaceSelectsTitleBtn", "#dopcoSurfacePart .sufaceSelectList"),
				handleCheckboxes(companyland01)
		}
		else if (pathName === `/land/songyu/menu02`) {
			const companyland02 = document.getElementsByName("companyland02");
			return surfaceSelectEvet("#dopcoSurfacePart02 .surfaceSelectsTitleBtn", "#dopcoSurfacePart02 .sufaceSelectList"),
				handleCheckboxes(companyland02);
		}
		else if (pathName === `/land/songyu/menu03`) {
			const companyland03 = document.getElementsByName("companyland03");
			return surfaceSelectEvet("#dopcoSurfacePart03 .surfaceSelectsTitleBtn", "#dopcoSurfacePart03 .sufaceSelectList"),
				handleCheckboxes(companyland03);
		}
		else if (pathName === `/land/jisang/menu02_1`) {
			const inquireCheckCont01 = document.getElementsByName("inquireCheckCont01");
			return surfaceInquireSelectEvet("#dopcoSurfacePart .surfaceSelectsTitleBtn", "#dopcoSurfacePart .sufaceSelectList", "#dopcosurfaceInquire .sufaceSelectList .surfaceSelectListMember", ".surfaceInquireHiddenSelect01", "inquireCheckCont01"),
				surfaceInquireCheckboxes(inquireCheckCont01);
		}
		else if (pathName === `/land/jisang/menu02_2`) {
			const dopcosurfaceInquire02 = document.getElementsByName("dopcosurfaceInquire02");
			return surfaceSelectEvet("#dopcosurfaceInquire02 .surfaceInquireSelectsTitleBtn", "#dopcosurfaceInquire02 .sufaceSelectList"),
				handleCheckboxes(dopcosurfaceInquire02);
		}
		else if (pathName === `/land/jisang/menu02_3`) {
			const dopcosurfaceInquire03 = document.getElementsByName("dopcosurfaceInquire03");
			return surfaceSelectEvet("#dopcosurfaceInquire03 .surfaceInquireSelectsTitleBtn", "#dopcosurfaceInquire03 .sufaceSelectList"),
				handleCheckboxes(dopcosurfaceInquire03);
		}
		else if (pathName === `/land/jisang/menu02_4`) {
			const dopcosurfaceInquire04 = document.getElementsByName("dopcosurfaceInquire04");
			return surfaceSelectEvet("#dopcosurfaceInquire04 .surfaceInquireSelectsTitleBtn", "#dopcosurfaceInquire04 .sufaceSelectList"),
				handleCheckboxes(dopcosurfaceInquire04);
		}
		else if (pathName === `/land/jisang/menu02_5`) {
			const dopcosurfaceInquire05 = document.getElementsByName("dopcosurfaceInquire05");
			return surfaceInquireSelectEvet("#dopcosurfaceInquire05 .surfaceInquireSelectsTitleBtn", "#dopcosurfaceInquire05 .sufaceSelectList", "#dopcosurfaceInquire05 .sufaceSelectList .surfaceSelectListMember", ".surfaceInquireHiddenSelect05");
			handleCheckboxes(dopcosurfaceInquire05);
		}
		//점용
		else if (pathName === `/land/gover/menu03_1`) {
			return privateUseSelectEvet("#dopcoPrivateUse01 .privateUseSelectsTitleBtn", "#dopcoPrivateUse01 .sufaceSelectList", "#dopcoPrivateUse01 .sufaceSelectList .surfaceSelectListMember", ".privateUseHiddenSelect01");
		}
		else if (pathName === `/land/gover/menu03_2`) {
			return privateUseSelectEvet("#dopcoPrivateUse02 .privateUseSelectsTitleBtn", "#dopcoPrivateUse02 .sufaceSelectList", "#dopcoPrivateUse02 .sufaceSelectList .surfaceSelectListMember", ".privateUseHiddenSelect02");
		}
		else if (pathName === `/land/gover/menu03_3`) {
			return privateUseSelectEvet("#dopcoPrivateUse03 .privateUseSelectsTitleBtn", "#dopcoPrivateUse03 .sufaceSelectList", "#dopcoPrivateUse03 .sufaceSelectList .surfaceSelectListMember", ".privateUseHiddenSelect03");
		}
		else if (pathName === `/land/gover/orgAdmin`) {
			return privateUseSelectEvet("#orgAdmin .privateUseSelectsTitleBtn", "#orgAdmin .sufaceSelectList", "#orgAdmin .sufaceSelectList .surfaceSelectListMember", ".privateUseHiddenSelect03");
		}
		//토지개발
		else if (pathName === `/togi/menu04_1`) {
			const dopcoLandDevelopmentManage = document.getElementsByName("dopcoLandDevelopmentManage");
			handleCheckboxes(dopcoLandDevelopmentManage);
			return landDevelopmentManageSelectEvet("#dopcoLandDevelopmentManage .landDevelopmentManageSelectsTitleBtn", "#dopcoLandDevelopmentManage .sufaceSelectList", "#dopcoLandDevelopmentManage .sufaceSelectList .surfaceSelectListMember");
		}
		//회사토지
		else if (pathName === `/land/dopco/menu05_1`) {
			const dopcoCompanyLand01 = document.getElementsByName("dopcoCompanyLand01");
			handleCheckboxes(dopcoCompanyLand01);
			return companyLandSelectEvet("#dopcoCompanyLand01 .companyLandSelectsTitleBtn", "#dopcoCompanyLand01 .sufaceSelectList", "#dopcoCompanyLand01 .sufaceSelectList .surfaceSelectListMember");
		} else if (pathName === `/land/dopco/menu05_2`) {
			const dopcoCompanyLand02 = document.getElementsByName("dopcoCompanyLand02");
			handleCheckboxes(dopcoCompanyLand02);
			return companyLandSelectEvet("#dopcoCompanyLand02 .companyLandSelectsTitleBtn", "#dopcoCompanyLand02 .sufaceSelectList", "#dopcoCompanyLand02 .sufaceSelectList .surfaceSelectListMember");
		}
		//이설공사 확인 필지
		else if (pathName === `/relocation/relocationCheckPilji`) {
			const relocationCheckPiljiDiv = document.getElementsByName("relocationCheckPiljiDiv");
			return surfaceSelectEvet("#relocationCheckPiljiDiv .surfaceInquireSelectsTitleBtn", "#relocationCheckPiljiDiv .sufaceSelectList"),
				handleCheckboxes(relocationCheckPiljiDiv);
		}
		//이설공사 확인필지
		else if (pathName === `/land/noti/menu01`) {
			const dopcosurfaceInquire02 = document.getElementsByName("dopcosurfaceInquire02");
			return surfaceSelectEvet("#dopcosurfaceInquire02 .surfaceInquireSelectsTitleBtn", "#dopcosurfaceInquire02 .sufaceSelectList"),
				handleCheckboxes(dopcosurfaceInquire02);
		}
		//이슈코드 관리
		else if (pathName === `/issue/codeMgmt` || pathName === `/issue/menu06_1`) {
			return issueManageSelectEvet("#dopcoIssueManage .issueManageSelectsTitleBtn", "#dopcoIssueManage .sufaceSelectList", "#dopcoIssueManage .sufaceSelectList .surfaceSelectListMember", ".issueManageHiddenSelect");
		}

	}

	selecBoxsEvetWrappers();

	//241005
	menuListLoad();
})


/******************************/

//메뉴조회 ajax
function menuListLoad() {
	
	$.ajax({
		url : '/land/common/menusetting',
		type : "GET",
		success : function(res) {
			if(res.result == 'Y') {
				menuListSet(res.menuList, res.menu2pms);
			} else {
				alert('메뉴 조회중 오류가 발생했습니다.');
			}
			
		},
		error : function(error) {
			console.log(error)
		}
	});
	
} 

//메뉴 HTML 작성
function menuListSet(result, result2) {
	
	//송유관로현황
	let songyuImg = ['/assets/media/nav/surfaceHammer.png', 'nowDopco', 'songyuLargeMenuBox'];
	let songyuUrl = ['/songyu/menu01', '/songyu/menu02', '/songyu/menu03'];
	//지상권
	let jisangImg = ['/assets/media/nav/surfaceMenu.png', 'surface', 'jisangLargeMenuBox']
	let jisangUrl = ['/land/jisang/menu02_1', '/land/jisang/landRightsRegistration', '/land/jisang/menu02_2', '/land/jisang/menu02_3', '/land/jisang/menu02_4', '/land/jisang/menu02_5'];
	//점용
	let goverImg = ['/assets/media/nav/surfacePrivate.png', 'private', 'goverLargeMenuBox']
	let goverUrl = ['/land/gover/menu03_1', '/land/gover/menu03_2', '/land/gover/menu03_3', '/land/gover/orgAdmin', '/land/gover/orgSysCode'];
	//토지개발
	let togiImg = ['/assets/media/nav/surfaceGround.png', 'develop', 'togiLargeMenuBox'];
	let togiUrl = ['/togi/menu04_1', '/togi/landReg'];
	//회사토지
	let dopcoImg = ['/assets/media/nav/surfaceGround.png', 'company', 'dopcoLargeMenuBox']
	let dopcoUrl = ['/dopco/menu05_1', '/dopco/compLandReg', '/dopco/menu05_2'];
	//이슈
	let issueImg = ['/assets/media/nav/surfaceIssue.png', 'issue', 'issueLargeMenuBox'];
	let issueUrl = ['/issue/issueCodeMgmt', '/issue/menu06_1'];
	//통계
	let statsImg = ['/assets/media/nav/total.png', 'totalIcon', 'statsLargeMenuBox'];
	let statsUrl = ['/stats/rightCloseMng', '/stats/rightStatus', '/stats/issueStatus' , '/stats/rightChangeStat', '/stats/parcelChangeStat'];
	
	/********************/
	//2pms지도메뉴 권한
	let menu2PmsList = JSON.parse(result2[0]);
	let map2PmsCheck = menu2PmsList;	//0번째가 지도 검색 메뉴
	//console.log(map2PmsCheck);
	/********************/
	
	let innerHtml = '';
	
	if(map2PmsCheck.mnLargeYn == 'Y') {
		innerHtml += '<li>'; 
		innerHtml += '	<button class="surfaceMenuBtn">';
		innerHtml += '		<span><img src="/assets/media/nav/surfaceMap.png" alt="mapIcon" onclick="goto2pmsMap();"/></span>지도';
		innerHtml += '	</button>';
		innerHtml += '</li>';
	}
	
	for(let i = 0 ; i < result.length ; i++) {
		let menuInfo = JSON.parse(result[i]);
		//console.log(menuInfo);
		
		//소메뉴 img & URL 정보 pick
		let targetImgArr = [];
		let targetMenuUrlArr = [];
		
		if(menuInfo.mnLargeName == '송유관로 현황'){
			targetImgArr = songyuImg;
			targetMenuUrlArr = songyuUrl;
		} else if(menuInfo.mnLargeName == '지상권') {
			targetImgArr = jisangImg;
			targetMenuUrlArr = jisangUrl;
		} else if(menuInfo.mnLargeName == '점용') {
			targetImgArr = goverImg;
			targetMenuUrlArr = goverUrl;
		} else if(menuInfo.mnLargeName == '토지개발') {
			targetImgArr = togiImg;
			targetMenuUrlArr = togiUrl;
		} else if(menuInfo.mnLargeName == '회사토지') {
			targetImgArr = dopcoImg;
			targetMenuUrlArr = dopcoUrl;
		} else if(menuInfo.mnLargeName == '이슈') {
			targetImgArr = issueImg;
			targetMenuUrlArr = issueUrl;
		} else { //통계
			targetImgArr = statsImg;		
			targetMenuUrlArr = statsUrl;
		}
		
		//사이드바 큰메뉴 사용여부
		if(menuInfo.mnLargeYn == 'Y') {
			
			if(menuInfo.mnLargeName == '통계') {
				innerHtml += '<li style="display:none;">';
			} else {
				innerHtml += '<li>';
			}
			
			innerHtml += '	<button class="surfaceMenuBtn" onclick="largeMenuClick(this, \''+ targetImgArr[2] +'\')">';
			innerHtml += '		<span><img src="'+targetImgArr[0]+'" alt="'+targetImgArr[1]+'" /></span>' + menuInfo.mnLargeName;
			innerHtml += '	</button>';
			innerHtml += '	<div class="hiddenMenuBoxs" id="'+targetImgArr[2]+'" >';
			innerHtml += '		<div class="hiddenMenuList">';
			
			//소메뉴 사용여부
			for(let k = 0 ; k < menuInfo.mnList.length ; k++) {
				let mnInfo = menuInfo.mnList[k];
				
				if(mnInfo.mnYN == 'Y') {
					
					if(mnInfo.mnName == '권리제외필지조회' || mnInfo.mnName == '관리필지조회' || mnInfo.mnName == '권리필지조회' || mnInfo.mnName == '토지개발 신규등록'
					   || mnInfo.mnName == '회사토지 신규등록' || mnInfo.mnName == '처분' || mnInfo.mnName == '민원관리'
					) {
						innerHtml += '<a href="'+targetMenuUrlArr[k]+'" style="display:none;">' + mnInfo.mnName + '</a>';
					} else {
						innerHtml += '<a href="'+targetMenuUrlArr[k]+'">' + mnInfo.mnName + '</a>';
					}
				}
			}
			
			innerHtml += '		</div>';
			innerHtml += '	</div>';
			innerHtml += '</li>';
			
		}
		
	}
	
	$("#naviMenuBar").empty();
	$("#naviMenuBar").html(innerHtml);
	
}

/******************************/