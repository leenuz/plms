const surfaceHeaderEvet = () => {
	if (!window.opener) {
	
     let surfaceHeader = document.querySelector(".surfaceHeader");
     let htmlFilePath = '/components/subHtml/surfaceheader.html'; // 삽입할 HTML 파일 경로

    //console.log(surfaceHeader);
    //console.log(htmlFilePath);
	
     let xhr = new XMLHttpRequest();
     xhr.open('GET', htmlFilePath, true);
     xhr.onreadystatechange = function() {
         if (xhr.readyState == 4 && xhr.status == 200) {

            surfaceHeader.innerHTML = xhr.responseText;
            
             // 새로 추가된 HTML 내의 스크립트 실행
             let headerscripts = surfaceHeader.getElementsByTagName('script');
             //console.log(headerscripts[0]);
             for (let i = 0; i < headerscripts.length; i++) {
                 let script = document.createElement('script');
                 script.textContent = headerscripts[i].textContent;
                 document.body.appendChild(script).parentNode.removeChild(script);
             }
          
         }
     };
     xhr.send();
     //console.log('header작동');
     }
}



export { surfaceHeaderEvet }