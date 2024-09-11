function getSidoMaster() {
    var url = "/api/getSidoMaster";

    var requestData = {};
    console.log(requestData);
    $.ajax({
        url: url,
        type: 'POST',
        contentType: "application/json",
        data: JSON.stringify(requestData),
        async: false,
        dataType: "json",
        success: function (response) {
            console.log(response);
            if (response.success = "Y") {
                console.log("response.success Y");
                console.log("response.resultData length:" + response.resultData.length);
                console.log(response.resultData);
                $("#sidoSelectBox option").remove();
                $("#sidoSelectBox").append('<option value="">전체</option>');
                for (var i = 0; i < response.resultData.length; i++) {
                    $("#sidoSelectBox").append('<option value=' + response.resultData[i].sm_name + '>' + response.resultData[i].sm_name + '</option>');
                }
                resetComboBox($("#sido_ul"));
            }
            else {
                console.log("response.success N");
            }
        },
        error: function (jqXHR, textStatus, errorThrown) {
            alert("getSidoMaster ajax error\n" + textStatus + ":" + errorThrown);
        }

    });
}

$(document).on("change", "#sidoSelectBox", function () {
    console.log("----------sidoSelectBox--------------");
    getGugunMaster($("#sidoSelectBox option:selected").val());
})

$(document).on("change", "#gugunSelectBox", function () {
    getDongMaster($("#sidoSelectBox option:selected").val(), $("#gugunSelectBox option:selected").val());
})

$(document).on("change", "#dongSelectBox", function () {
    getRiMaster($("#sidoSelectBox option:selected").val(), $("#gugunSelectBox option:selected").val(), $("#dongSelectBox option:selected").val());
})

function getGugunMaster(key) {
    var url = "/api/getSigunMaster";

    var requestData = { "key": key };
    console.log(requestData);
    $.ajax({
        url: url,
        type: 'POST',
        contentType: "application/json",
        data: JSON.stringify(requestData),
        async: false,
        dataType: "json",
        success: function (response) {
            console.log(response);
            if (response.success = "Y") {
                console.log("response.success Y");
                console.log("response.resultData length:" + response.resultData.length);
                console.log(response.resultData);
                $("#gugunSelectBox option").remove();
                $("#gugunSelectBox").append('<option value="">전체</option>');
                for (var i = 0; i < response.resultData.length; i++) {
                    console.log("<option value='" + response.resultData[i].sm_gugun + "'>" + response.resultData[i].sm_gugun + "</option>");
                    $("#gugunSelectBox").append('<option value="' + response.resultData[i].sm_gugun + '">' + response.resultData[i].sm_gugun + '</option>');
                }
                resetComboBox($("#gugun_ul"));
            }
            else {
                console.log("response.success N");
            }
        },
        error: function (jqXHR, textStatus, errorThrown) {
            alert("getSigunMaster ajax error\n" + textStatus + ":" + errorThrown);
        }

    });
}

function getDongMaster(sidoKey, gugunKey) {
    var url = "/api/getDongMaster";

    var requestData = { "sidoKey": sidoKey, "gugunKey": gugunKey };
    console.log(requestData);
    $.ajax({
        url: url,
        type: 'POST',
        contentType: "application/json",
        data: JSON.stringify(requestData),
        async: false,
        dataType: "json",
        success: function (response) {
            console.log(response);
            if (response.success = "Y") {
                console.log("response.success Y");
                console.log("response.resultData length:" + response.resultData.length);
                console.log(response.resultData);
                $("#dongSelectBox option").remove();
                $("#dongSelectBox").append('<option value="">전체</option>');
                for (var i = 0; i < response.resultData.length; i++) {
                    $("#dongSelectBox").append('<option value="' + response.resultData[i].bm_dong + '">' + response.resultData[i].bm_dong + '</option>');
                }
                resetComboBox($("#dong_ul"));
            }
            else {
                console.log("response.success N");
            }
        },
        error: function (jqXHR, textStatus, errorThrown) {
            alert("getDongMaster ajax error\n" + textStatus + ":" + errorThrown);
        }
    });
}

function getRiMaster(sidoKey, gugunKey, dongKey) {
    var url = "/api/getRiMaster";

    var requestData = { "sidoKey": sidoKey, "gugunKey": gugunKey, "dongKey": dongKey };
    console.log(requestData);
    $.ajax({
        url: url,
        type: 'POST',
        contentType: "application/json",
        data: JSON.stringify(requestData),
        async: false,
        dataType: "json",
        success: function (response) {
            console.log(response);
            if (response.success = "Y") {
                console.log("response.success Y");
                console.log("response.resultData length:" + response.resultData.length);
                console.log(response.resultData);
                $("#riSelectBox option").remove();
                $("#riSelectBox").append('<option value="">전체</option>');
                for (var i = 0; i < response.resultData.length; i++) {
                    $("#riSelectBox").append('<option value="' + response.resultData[i].rm_ri + '">' + response.resultData[i].rm_ri + '</option>');
                }
                resetComboBox($("#ri_ul"));
            }
            else {
                console.log("response.success N");
            }
        },
        error: function (jqXHR, textStatus, errorThrown) {
            alert("getRiMaster ajax error\n" + textStatus + ":" + errorThrown);
        }

    });
}

$(document).on("change", "#sigunmaster", function () {
    getDongMaster($("#sigunmaster option:selected").val());
})

function resetComboBox(ele) {
    console.log("---------ele---------------");
    console.log($(ele).html());

    console.log("---------loadCustomLiNotsetAdd---------------");

    var thisContent = ele.parent().parent().find('select');
    console.log("---------thisContent---------------");
    console.log($(thisContent).html());
    const customSelectBox = ele.closest('.customSelectBox');
    console.log($(customSelectBox).html());
    $(customSelectBox).find("li").remove();
    var customSelectBtns = customSelectBox.find('.customSelectBtns');
    console.log("---------customSelectBtns---------------");
    console.log($(customSelectBtns).html());
    var optList = thisContent[0];
    //console.log(optList.length);
    console.log(optList);
    for (let i = 0; i < optList.length; i++) {
        const optionValue = optList.options[i].value;
        //console.log(optionValue);
        const li = document.createElement('li');
        //console.log(li);
        const button = document.createElement('button');
        button.classList.add('moreSelectBtn');
        button.type = 'button';
        if (optionValue == "") button.textContent = "전체";
        else button.textContent = optionValue;
        //console.log("----button---");
        //console.log(button);

        li.appendChild(button);
        //console.log($(li).html());
        $(customSelectBtns).append(li);

    }
}

$(document).on("click", "#addressSearchBtn", function () {
    console.log("-----addressSearchBtn click------------");
    console.log('landRightSearchResultPop 작동');
    console.log("-------검색버튼 클릭-----------");
    console.log($("#saveForm").serialize());
    var formSerializeArray = $('#saveForm').serializeArray();
    console.log(formSerializeArray);
    /* console.log($("#searchResultPopDiv").html());*/

    //searchResultPopDiv 화면뿌릴 DIV
    $.ajax({
        url: "/api/getBasicSearchData",
        type: "POST",
        data: formSerializeArray,
    }).done(function (fragment) {
        //runScriptsInElement(landRightSearchResultPop); // 삽입된 html내 스크립트 실행 함수 호출
        //console.log($("#searchResultPopDiv").html());
        $('#searchResultPopDiv').replaceWith(fragment);
        const popupOpen = document.querySelector("#searchResultsPopup .popupWrap");
        console.log($(popupOpen).html());
        //			   		              landRightsSearchBtn.classList.add("open");
        $(popupOpen).addClass("open");
        popupOpen.classList.add("active");

    });
});

$(document).on("click", ".addressResultSelectBtn", function () {
    console.log("----------addressResultSelectBtn-click--------");
    console.log($(this).parent().parent().html());
    var pnu = $(this).parent().parent().find(".popContent01").html();
    var address = $(this).parent().parent().find(".popContent02").html();
    var jibun = $(this).parent().parent().find(".popContent03").html();
    var sido_nm = $(this).parent().parent().find(".popContent0201").html();
    var sgg_nm = $(this).parent().parent().find(".popContent0202").html();
    var emd_nm = $(this).parent().parent().find(".popContent0203").html();
    var ri_nm = $(this).parent().parent().find(".popContent0204").html();
    console.log("pnu:" + pnu);
    console.log("address:" + address);
    console.log("jibun:" + jibun);
    $("#maddress").val(address + " " + jibun);
    $("#raddress").val(address + " " + jibun);
    $("#mpnu").val(pnu);
    $("#mjibun").val(jibun);
    $("#sido_nm").val(sido_nm);
    $("#sgg_nm").val(sgg_nm);
    $("#emd_nm").val(emd_nm);
    $("#ri_nm").val(ri_nm);

    var targetDiv = $("#searchResultPopDiv").parent().find("#searchResultPopup").find(".popupWrap");
    $(".popupWrap").removeClass("active");
})

$(document).on("click", "#addressPopupCloseBtn", function () {
    console.log("---------addressPopupCloseBtn class click------------");
    console.log($("#searchResultPopDiv").html());
    var targetDiv = $("#searchResultPopDiv").parent().find("#searchResultPopup").find(".popupWrap");
    $("#popupWrap").toggleClass("active");
});

