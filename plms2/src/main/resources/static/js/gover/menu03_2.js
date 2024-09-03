var table;

$(document).ready(function() {
    console.log("-----gover/menu03_2.js start-----");

    // 초기 테이블 로딩 및 이벤트 핸들러 설정
    function init() {
        console.log("init function called");
        setupFormHandler();
        loadDataTable(""); // 초기에는 빈 파라미터로 전체 데이터를 로드
    }

    function setupFormHandler() {
        // 폼 제출 이벤트 핸들링
        $('#searchForm').on('submit', function(event) {
            event.preventDefault(); // 폼 제출 기본 동작 방지
            const params = serializeFormData($(this));
            console.log("Submitting form with params: ", params);
            loadDataTable(params); // 검색 조건에 맞는 데이터 로드
        });

        // 조회 버튼 클릭 핸들러 (폼 제출과 동일하게 처리)
        $("#searchBtn").on("click", function(event) {
            event.preventDefault();
            $('#searchForm').submit();
        });
    }

    function serializeFormData($form) {
        const formData = $form.serializeArray();
        const params = {};
        $.each(formData, function(i, field) {
            params[field.name] = field.value;
        });
        console.log("------Serialized form data------");
        return params;
    }

    // 시도 선택 시 시군구 로드
    $(document).on("change", "#sido_nm", function(event) {
        event.preventDefault(); // 기본 동작 방지
        console.log("----------start sido_nm change -------------");
        if ($("#sido_nm").val() == null) return;

        var allData = { "key": $("#sido_nm").val() };
        console.log(allData);

        $.ajax({
            url: "/api/getSigunMaster",
            data: JSON.stringify(allData),
            async: true,
            type: "POST",
            dataType: "json",
            contentType: 'application/json; charset=utf-8',
            success: function(rt) {
                console.log(rt);
                var data = rt.resultData;

                // 시군구 옵션 및 리스트 초기화
                $("#sggUl li").remove();
                $("#sgg option").remove();

                $("#sggUl").append("<li><p>전체</p></li>");
                $("#sgg").append("<option value=''>전체</option>");
                for (var i = 0; i < data.length; i++) {
                    console.log(data[i].sgg_nm);
                    $("#sggUl").append("<li><p>" + data[i].sm_gugun + "</p></li>");
                    $("#sgg").append("<option>" + data[i].sm_gugun + "</option>");
                }

                // 시/도 선택 설정
                $("#sido").val($("#sido_nm").val()).attr("selected", "selected");
            },
            beforeSend: function() {
                // 로딩 이미지 등 보여주기 처리 (필요 시)
            },
            complete: function() {
                // 로딩 이미지 등 감추기 처리 (필요 시)
            },
            error: function(jqXHR) {
                console.error("AJAX error: " + jqXHR.responseText);
            }
        });
    });

    // 시군구 선택 시 읍면동 로드
    $(document).on("change", "#sgg_nm", function(event) {
        event.preventDefault(); // 기본 동작 방지
        console.log("----------start sgg change -------------");

        var allData = {
            "gugunKey": $("#sgg option:selected").val() || '',
            "sidoKey": $("#sido_nm").val()
        };
        console.log(allData);

        $.ajax({
            url: "/api/getDongMaster",
            data: JSON.stringify(allData),
            async: true,
            type: "POST",
            dataType: "json",
            contentType: 'application/json; charset=utf-8',
            success: function(rt) {
                console.log(rt);
                var data = rt.resultData;

                // 읍면동 옵션 및 리스트 초기화
                $("#emdUl li").remove();
                $("#emd option").remove();

                $("#emdUl").append("<li><p>전체</p></li>");
                $("#emd").append("<option value=''>전체</option>");
                for (var i = 0; i < data.length; i++) {
                    console.log(data[i].bm_dong);
                    $("#emdUl").append("<li><p>" + data[i].bm_dong + "</p></li>");
                    $("#emd").append("<option>" + data[i].bm_dong + "</option>");
                }

                // 시군구 선택 설정
                $("#sgg").val($("#sgg").val()).attr("selected", "selected");
            },
            beforeSend: function() {
                // 로딩 이미지 등 보여주기 처리 (필요 시)
            },
            complete: function() {
                // 로딩 이미지 등 감추기 처리 (필요 시)
            },
            error: function(jqXHR) {
                console.error("AJAX error: " + jqXHR.responseText);
            }
        });
    });

    // 읍면동 선택 시 리 로드
    $(document).on("change", "#emd_nm", function(event) {
        event.preventDefault(); // 기본 동작 방지
        console.log("----------start emd change -------------");

        var allData = {
            "dongKey": $("#emd option:selected").val() || '',
            "gugunKey": $("#sgg option:selected").val() || '',
            "sidoKey": $("#sido_nm").val()
        };
        console.log(allData);

        $.ajax({
            url: "/api/getRiMaster",
            data: JSON.stringify(allData),
            async: true,
            type: "POST",
            dataType: "json",
            contentType: 'application/json; charset=utf-8',
            success: function(rt) {
                console.log(rt);
                var data = rt.resultData;

                // 리 옵션 및 리스트 초기화
                $("#riUl li").remove();
                $("#ri option").remove();

                $("#riUl").append("<li><p>전체</p></li>");
                $("#ri").append("<option value=''>전체</option>");
                for (var i = 0; i < data.length; i++) {
                    console.log(data[i].rm_ri);
                    $("#riUl").append("<li><p>" + data[i].rm_ri + "</p></li>");
                    $("#ri").append("<option>" + data[i].rm_ri + "</option>");
                }

                // 읍면동 선택 설정
                $("#emd").val($("#emd").val()).attr("selected", "selected");
            },
            beforeSend: function() {
                // 로딩 이미지 등 보여주기 처리 (필요 시)
            },
            complete: function() {
                // 로딩 이미지 등 감추기 처리 (필요 시)
            },
            error: function(jqXHR) {
                console.error("AJAX error: " + jqXHR.responseText);
            }
        });
    });

    // 초기화 호출
    init();
});

function loadDataTable(params) {
    console.log("-----start loadDataTable----------");
    console.log("Params:", params); // params 객체 출력

    table = $('#userTable').DataTable({
        fixedColumns: { start: 3 },
        scrollCollapse: true,
        scrollX: true,
        scrollY: 600,
        paging: true,
        "oLanguage": { "sLengthMenu": "_MENU_" },
        dom: '<"top"<"dt-title">Bl><"dt-center-in-div"r><"bottom"tp><"clear">',
        buttons: [{ extend: 'excel', text: '엑셀 다운로드' }],
        pageLength: 20,
        bPaginate: true,
        bLengthChange: true,
        bInfo: false,
        lengthMenu: [[10, 50, 100, -1], ["10건", "50건", "100건", "All"]],
        bAutoWidth: false,
        processing: true,
        ordering: true,
        bServerSide: true,
        searching: false,
        destroy: true,
        order: [[12, 'desc']],
        rowReorder: { dataSrc: 'b_seq' },
        ajax: {
            url: "/gover/menu03_2DataTableList",
            type: "POST",
            datatype: "json",
            data: function(d) {
                d.jisa = ljsIsNull(params.jisa) ? '' : params.jisa;
                d.gover_no = params.gover_no;
                d.use_purpos = params.use_purpos;
                d.pmt_office = params.pmt_office;
                d.adm_office = ljsIsNull(params.adm_office) ? '' : params.adm_office;
				d.pay_date_start = params.pay_date_start;
				d.pay_date_end = params.pay_date_end;
                d.idx = params.idx;

                // 주소
                var ask = (params.privateUseRadio02 == undefined || params.privateUseRadio02 == null) ? '0' : params.privateUseRadio02;
                console.log("privateUseRadio02:" + ask);

                // 입력형 주소 입력 시
                if (ask == "0") {
                    d.saddr = (params.addressFull == undefined || params.addressFull == null) ? '' : params.addressFull;
                }
                // 선택형 주소 입력 시
                else {
                    var addrs = params.sido_nm || '';
                    if (!ljsIsNull(params.sgg_nm)) addrs += " " + params.sgg_nm;
                    if (!ljsIsNull(params.emd_nm)) addrs += " " + params.emd_nm;
                    if (!ljsIsNull(params.ri_nm)) addrs += " " + params.ri_nm;
                    d.saddr = (addrs == undefined || addrs == null || addrs == "undefined") ? '' : addrs;
                }
                console.log("saddr:" + d.saddr);
            },
            dataSrc: function(json) {
                console.log("-------------json---------------");
                console.log(json);
                $("#dataTableTotalCount").html(json.recordsTotal);
                return json.data;
            }
        },
        columns: [
            { data: "no", "orderable": false },
            { data: "jisa", "defaultContent": "" },
            { data: "address", "defaultContent": "" },
            { data: "gover_no", "defaultContent": "" },
			{ data: "필지수", "defaultContent": "" },
			{ data: "jimok_text", "defaultContent": "" },
			{ data: "use_purpos", "defaultContent": "" },
			{ data: "period", "defaultContent": "" },
			{ data: "gover_length", "defaultContent": "" },
			{ data: "gover_area", "defaultContent": "" },
            { data: "pmt_office", "defaultContent": "" },
            { data: "adm_office", "defaultContent": "" },
			{ data: "pay_date", "defaultContent": "" },
			{ data: "pay_money", "defaultContent": "" },
            {
                data: "idx", "defaultContent": "",
                render: function(data, type, row, meta) {
                    return `<button class="viewDetailButton" id='moveMap' x=${row.x} y=${row.y}>위치보기</button> `;
                }
            },
			{ data: "echo_no", "defaultContent": "" }
        ],
        columnDefs: [
            { "className": "dt-head-center", "targets": "_all" },
            { className: 'dt-center', "targets": "_all" },
            { targets: [0], width: "50px" },
            { targets: [1], width: "150px" },
            { targets: [2], width: "400px" },
            { targets: [3], width: "150px" },
            { targets: [4], width: "100px" },
            { targets: [5], width: "200px" },
            { targets: [6], width: "150px" },
            { targets: [7], width: "150px" },
            { targets: [8], width: "200px" },
            { targets: [9], width: "100px" },
            { targets: [10], width: "200px" },
            { targets: [11], width: "100px" },
            { targets: [12], width: "100px" },
            { targets: [13], width: "100px" },
            { targets: [14], width: "100px" },
			{ targets: [15], width: "100px" }
        ]
    });

    table.on('click', 'tr', function(event) {
        var target = $(event.target);
        var isButtonCell = target.closest('td').index() === 14;

        if (isButtonCell) {
            return;
        } else {
            var data = table.row(this).data();
            console.log(data);
            console.log(data.idx);

            var url = "/gover/feeDetail?idx=" + data.idx;
            window.location = url;
        }
    });
}
