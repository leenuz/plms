import { surfaceHeaderEvet } from './surfaceHeader.js';
import { surfaceSelectEvet, handleCheckboxes } from './surfaceSelectEvet.js';

//import { surfaceInquireSelectEvet , surfaceInquireCheckboxes } from './surfaceInquireSelectEvet.js';
import { surfaceInquireSelectEvet, surfaceInquireCheckboxes } from '/js/jisang/surfaceInquireSelectEvet.js';
import { privateUseSelectEvet } from '/js/gover/privateUseSelecEvet.js';
import { landDevelopmentManageSelectEvet } from '/js/togi/landDevelopmentSelecEvet.js';
import { issueManageSelectEvet } from '/js/issue/issueManageSelecEvet.js';


console.log("---------------------------surfaceMain.js start----------------------");

window.addEventListener("load", () => {

	console.log("---------------------------surfaceMain.js start-----load-----------------");

	//header함수 실행
	surfaceHeaderEvet();

	//송유관로현황내 URL에 따라 셀렉박스 작동
	const selecBoxsEvetWrappers = () => {


		const pathName = window.location.pathname;
		console.log(pathName, 'main에서 표출');

		if (pathName === `/songyu/menu01`) {
			const companyland01 = document.getElementsByName("companyland01");
			return surfaceSelectEvet("#dopcoSurfacePart .surfaceSelectsTitleBtn", "#dopcoSurfacePart .sufaceSelectList"),
				handleCheckboxes(companyland01)
		}
		else if (pathName === `/songyu/menu02`) {
			const companyland02 = document.getElementsByName("companyland02");
			return surfaceSelectEvet("#dopcoSurfacePart02 .surfaceSelectsTitleBtn", "#dopcoSurfacePart02 .sufaceSelectList"),
				handleCheckboxes(companyland02);
		}
		else if (pathName === `/songyu/menu03`) {
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
		else if (pathName === `/gover/menu03_1`) {
			return privateUseSelectEvet("#dopcoPrivateUse01 .privateUseSelectsTitleBtn", "#dopcoPrivateUse01 .sufaceSelectList", "#dopcoPrivateUse01 .sufaceSelectList .surfaceSelectListMember", ".privateUseHiddenSelect01");
		}
		else if (pathName === `/gover/menu03_2`) {
			return privateUseSelectEvet("#dopcoPrivateUse02 .privateUseSelectsTitleBtn", "#dopcoPrivateUse02 .sufaceSelectList", "#dopcoPrivateUse02 .sufaceSelectList .surfaceSelectListMember", ".privateUseHiddenSelect02");
		}
		else if (pathName === `/gover/menu03_3`) {
			return privateUseSelectEvet("#dopcoPrivateUse03 .privateUseSelectsTitleBtn", "#dopcoPrivateUse03 .sufaceSelectList", "#dopcoPrivateUse03 .sufaceSelectList .surfaceSelectListMember", ".privateUseHiddenSelect03");
		}
		else if (pathName === `/gover/orgAdmin`) {
			return privateUseSelectEvet("#orgAdmin .privateUseSelectsTitleBtn", "#orgAdmin .sufaceSelectList", "#orgAdmin .sufaceSelectList .surfaceSelectListMember", ".privateUseHiddenSelect03");
		}
		//토지개발
		else if (pathName === `/togi/menu04_1`) {
			const dopcoLandDevelopmentManage = document.getElementsByName("dopcoLandDevelopmentManage");
			handleCheckboxes(dopcoLandDevelopmentManage);
			return landDevelopmentManageSelectEvet("#dopcoLandDevelopmentManage .landDevelopmentManageSelectsTitleBtn", "#dopcoLandDevelopmentManage .sufaceSelectList", "#dopcoLandDevelopmentManage .sufaceSelectList .surfaceSelectListMember");
		}
		//회사토지
		else if (pathName === `/dopco/menu05_1`) {
			const dopcoCompanyLand01 = document.getElementsByName("dopcoCompanyLand01");
			handleCheckboxes(dopcoCompanyLand01);
			return landDevelopmentManageSelectEvet("#dopcoCompanyLand01 .companyLandSelectsTitleBtn", "#dopcoCompanyLand01 .sufaceSelectList", "#dopcoCompanyLand01 .sufaceSelectList.surfaceSelectListMember");
		} else if (pathName === `/dopco/menu05_2`) {
			const dopcoCompanyLand01 = document.getElementsByName("dopcoCompanyLand02");
			handleCheckboxes(dopcoCompanyLand02);
			return landDevelopmentManageSelectEvet("#dopcoCompanyLand02 .companyLandSelectsTitleBtn", "#dopcoCompanyLand02 .sufaceSelectList", "#dopcoCompanyLand02 .sufaceSelectList.surfaceSelectListMember");
		}
		//이설공사 확인 필지
		else if (pathName === `/relocation/relocationCheckPilji`) {
			const relocationCheckPiljiDiv = document.getElementsByName("relocationCheckPiljiDiv");
			return surfaceSelectEvet("#relocationCheckPiljiDiv .surfaceInquireSelectsTitleBtn", "#relocationCheckPiljiDiv .sufaceSelectList"),
				handleCheckboxes(relocationCheckPiljiDiv);
		}
		//이슈코드 관리
		else if (pathName === `/issue/codeMgmt` || pathName === `/issue/menu06_1`) {
			return issueManageSelectEvet("#dopcoIssueManage .issueManageSelectsTitleBtn", "#dopcoIssueManage .sufaceSelectList", "#dopcoIssueManage .sufaceSelectList .surfaceSelectListMember", ".issueManageHiddenSelect");
		}

	}

	selecBoxsEvetWrappers();

	//241005
	console.log('메뉴 불러와봐');
	//menuListLoad();
})


/******************************/

//메뉴조회 ajax
function menuListLoad() {
	
	$.ajax({
		url : '/api/menusetting',
		type : "GET",
		success : function(res) {
			console.log(res);
			if(res.result == 'Y') {
				menuListSet(res.menuList);
			} else {
				alert('메뉴 조회중 오류가 발생했습니다.');
			}
			
		},
		error : function(error) {
			console.log(error)
		}
	});
	
} 

//메뉴
function menuListSet(result) {
	
	let innerHtml = '';
	innerHtml += '<li>'; 
	innerHtml += '	<button class="surfaceMenuBtn">';
	innerHtml += '		<span><img src="/assets/media/nav/surfaceMap.png" alt="mapIcon" onClick="openMapWindow();" /></span>지도';
	innerHtml += '	</button>';
	innerHtml += '</li>';
	
	for(let i = 0 ; i < result.length ; i++) {
		let menuInfo = JSON.parse(result[i]);
		//console.log(menuInfo);
		
		innerHtml += '<li>';
		innerHtml += '	<button class="surfaceMenuBtn">';
		innerHtml += '		<span><img src="/assets/media/nav/surfaceHammer.png" alt="nowDopco" /></span><p th:text="${row.mnName}">메뉴</p>';
		innerHtml += '	</button>';
		innerHtml += '	<div class="hiddenMenuBoxs">';
		innerHtml += '		<div class="hiddenMenuList">';
		innerHtml += '			<a href="/songyu/menu01">권리확보현황</a>';
		innerHtml += '			<a href="/songyu/menu02">권리제외필지조회</a>';
		innerHtml += '			<a href="/songyu/menu03">권리필지조회</a>';
		innerHtml += '		</div>';
		innerHtml += '	</div>';
		innerHtml += '</li>';
	}
	
	$("#naviMenuBar").html(innerHtml);
}

/******************************/