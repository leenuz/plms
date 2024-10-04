$(document).ready(function() {
  console.log("jisang/list.js start");
//testAjax();
//init_Table();
test2();

});


function init_Table(){
  $("#mainTable").DataTable().destroy();
  var url="/land/jisang/api/list";
	 $("#mainTable").DataTable({
     "responsive": {
         "details": {
             "display": $.fn.dataTable.Responsive.display.modal( {
                 "header": function ( row ) {
                     var data = row.data();
                     return 'Details for '+data[0]+' '+data[1];
                 }
             } ),
             "renderer": $.fn.dataTable.Responsive.renderer.tableAll( {
                 tableClass: 'table'
             } )
         }
     },
				"ajax":{
					"url":url,
					
				},
				"columns": [
		          				{},
		          				{ "data": "jm_set_money" },
								{ "data": "jm_set_status" },
								{ "data": "jm_use_state" },
		          				{}
							],
				'columnDefs': [
	          					{
									 'targets': 0,
									 'searchable': false,
									 'orderable': false,
									 'width': '1%',
									 'className': 'dt-body-center',
									 'render': function (data, type, full, meta){
										 return '<input type="checkbox" name="chk">';
									 }
								},
	          					{
									 'targets': 4,
									 'searchable': false,
									 'orderable': false,
									 'width': '1%',
									 'className': 'dt-body-center',
									 'render': function (data, type, full, meta){
										 return '<input class="btn" type="button" name="delete" id="history_delete" value="삭제">';
									 }
								}
							]
			});
}

 function testAjax(){
			 var url="/land/jisang/api/list";
	var jsonData={"allocation":"aaa"};
	
			 $.ajax({
			
			url:url,
			type:'GET',
			contentType:"application/json",
			//data:JSON.stringify(jsonData),
			async:false,
			dataType:"json",
			success:function(response){
				console.log(response);
				if (response.success="Y"){
					console.log("response.success Y");
				}
				else {
					console.log("response.success N");
				}
			},
			error:function(jqXHR,textStatus,errorThrown){
				alert("ajax error\n"+textStatus+":"+errorThrown);
			}
			
		});
		 }



function test1(){
	
	 cols = JSON.parse('[{"data":"col1"}, {"data":"col2"}]');
dt_result_table = $('#dataTable').DataTable({
	"serverSide" : true,
	"processing" : true,
	"destroy" : true,
	"ajax" : {
		"type" : "GET",
		"url" : "/api/datatableTest"
	},
	"columns" : cols
});
}


function test2(){
	 $("#dataTable").DataTable({
		 "serverSide" : true,
	"processing" : true,
	"destroy" : true,
				"ajax":{
					"type":"POST",
					"url":"/api/datatableTest"
					
				},
				"columns": [

					
					{ "data": "jm_set_money" },
					{ "data": "jm_save_status"}


				],
				'columnDefs': [
					{
						 'targets': 0,
						 'searchable': false,
						 'orderable': false,
						 'width': '10%',
						 'className': 'dt-body-center'
					}

				]
			});
}
$.fn.dataTable.ext.errMode = function(obj,param,err){
                var tableId = obj.sTableId;
                console.log('Handling DataTable issue of Table '+tableId);
        };

