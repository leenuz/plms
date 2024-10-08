$(document).on("click", ".registBtn", function () {
    var formSerializeArray = $('#saveForm').serializeArray();

    len = formSerializeArray.length;
    var dataObj = {};
    for (i = 0; i < len; i++) {
        dataObj[formSerializeArray[i].name] = formSerializeArray[i].value;
    }
    console.log("**dataObj**");
    console.log(dataObj);

    if (dataObj.cancleDate == '') {
        alert('해지일을 입력해 주세요.');
        return;
    }
    if (dataObj.userName == '') {
        alert('담당자를 입력해 주세요.');
        return;
    }

    /* var json = JSON.stringify(formSerializeArray);
        console.log("----------jsonobj------------");
        console.log(json); // JSON 문자열 출력*/

    url = "/land/dopco/insertDopcoTerminationAdd";
    returnUrl = '/dopco/compLandDispReg?idx=' + dataObj.idx + '&dopcoNo=' + dataObj.dopcoNo + '&cancel=Y';
    $.ajax({
        url: url,
        type: 'POST',
        contentType: "application/json",
        data: JSON.stringify(dataObj),

        dataType: "json",
        beforeSend: function (request) {
            console.log("beforesend ........................");
            loadingShow();
        },
        success: function (response) {
            loadingHide();
            console.log(response);
            if (response.success = "Y") {
                console.log("response.success Y");
                //console.log("response.resultData length:"+response.resultData.length);
                alert("정상적으로 등록 되었습니다.");
                document.location.href = returnUrl;
                /*$("#popup_bg").show();
                $("#popup").show(500);
                //$("#addrPopupLayer tbody td").remove();
                for(var i=0;i<response.resultData.length;i++){
                    $("#addrPopupTable tbody").append("<tr><td>"+response.resultData[i].juso+"</td><td><button>선택</button></td></tr>");
                }*/
            }
            else {
                console.log("response.success N");
            }
        },
        error: function (jqXHR, textStatus, errorThrown) {
            alert("registBtn ajax error\n" + textStatus + ":" + errorThrown);
            return false;
        }
    });
});
