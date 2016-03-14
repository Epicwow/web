$(function() {

//	$('#datepicker').datepicker({
//		format: 'yyyy-mm-dd',
//		language: 'zh-CN',
//		autoclose: true
//	})
	initAddr();
});


// ============ 地址选择 ==============//

//加载省份信息
function initAddr() {
	//加载省份
	$.ajax({
		url : '/static/data/pronvince.json',
		type : "post",
		dataType : "json",
		async : false,
		data : {
		},
		success : function(response){
			var province_options = "<option selected='selected' value=''>请选择省</option>";
			for(var i=0; i<response.length; i++){
				var province = response[i];
				province_options += "<option value='"+province.ProID+","+province.name+"'>"+province.name+"</option>";
			}
			$("#province").html(province_options);
		},
		error : function(XMLHttpRequest, textStatus, errorThrown) {
            alert(XMLHttpRequest.status);
            alert(XMLHttpRequest.readyState);
            alert(errorThrown);
		}
	});
	
	//当省份发生变化时
	$("#province").change(function(){
		 var province = $(this).val();
		 var city_options = "<option selected='selected' value=''>请选择市</option>";
		 var area_options = "<option selected='selected' value=''>请选择区</option>";
		 if(null==province||""==province){
			 $("#city").html(city_options);
		 }else{//根据所选省份，列出市区
			 $.ajax({
					url : '/static/data/city.json',
					type : "post",
					dataType : "json",
					async : false,
					data : {
					},
					success : function(response){
						for(var i=0; i<response.length; i++){
							var city = response[i];
							if(city.ProID==province.split(",")[0]){
								city_options += "<option value='"+city.CityID+","+city.name+"'>"+city.name+"</option>";
							}
						}
						$("#city").html(city_options);
					},
					error : function(XMLHttpRequest, textStatus, errorThrown) {
			            alert(XMLHttpRequest.status);
			            alert(XMLHttpRequest.readyState);
			            alert(errorThrown);
					}
				});
		 }
		 $("#area").html(area_options);
		 
	});
	
	//市发生变化时
	$("#city").change(function(){
		var city = $(this).val();
		var area_options = "<option selected='selected' value=''>请选择区</option>";
		if(null==city||""==city){
			$("#area").html(city_options);
		}else{
			$.ajax({
				url : '/static/data/area.json',
				type : "post",
				dataType : "json",
				async : false,
				data : {
				},
				success : function(response){
					for(var i=0; i<response.length; i++){
						var area = response[i];
						if(area.CityID==city.split(",")[0]){
							area_options += "<option value='"+area.CityID+","+area.DisName+"'>"+area.DisName+"</option>";
						}
					}
					$("#area").html(area_options);
				},
				error : function(XMLHttpRequest, textStatus, errorThrown) {
		            alert(XMLHttpRequest.status);
		            alert(XMLHttpRequest.readyState);
		            alert(errorThrown);
				}
			});
		}
	});
}

// ============ 地址选择结束 ==============//


function checkInfo(){
	var name = $("#name").val();
	var graduate_time = $("#graduate_time").val();
	var first_job_entry_time = $("#first_job_entry_time").val();
	var second_job_entry_time = $("#second_job_entry_time").val();
	var o_time = $("#o_time").val();
	var nums_of_buddhism_book=$("#nums_of_buddhism_book").val();
	var mobile = $("#mobile").val();
	var sex = $("#sex").val();
	var mz = $("#mz").val();
	var birthday = $("#datepicker").val();
	var province = $("#province").val();
	var city = $("#city").val();
	var area = $("#area").val();
	var detailaddr = $("#detailaddr").val();
	var degree = $("#degree").val();
	var reason2learning_dharma = $("#reason2learning_dharma").val();
	var deep_understanding_of_dharma = $("#deep_understanding_of_dharma").val();

	//参数合理性判断
	if(null==name||""==name.trim()){
		alert("请填写姓名!");
		$("#name").focus();
		return false;
	}
	if(isNaN(graduate_time)){
		alert("请填写数字!");
		$("#graduate_time").focus();
		return false;
	}
	if(isNaN(first_job_entry_time)){
		alert("请填写数字!");
		$("#first_job_entry_time").focus();
		return false;
	}
	if(isNaN(second_job_entry_time)){
		alert("请填写数字!");
		$("#second_job_entry_time").focus();
		return false;
	}
	if(isNaN(o_time)){
		alert("请填写数字!");
		$("#o_time").focus();
		return false;
	}
	if(isNaN(nums_of_buddhism_book)){
		alert("请填写数字!");
		$("#nums_of_buddhism_book").focus();
		return false;
	}
	if(null==mobile||""==mobile.trim()){
		alert("请填写手机!");
		$("#mobile").focus();
		return false;
	}
	if(null==sex||""==sex.trim()){
		alert("请填写性别!");
		$("#sex").focus();
		return false;
	}
	if(null==mz||""==mz.trim()){
		alert("请填写民族!");
		$("#mz").focus();
		return false;
	}
	//此处出生日期验证略显费劲，可使用 if(!isNaN(birthday)&&birthday.length==6)进行判断
	if(null==birthday||""==birthday.trim()){
		alert("请填写生日!");
		$("#datepicker").focus();
		return false;
	}else{
		if(isNaN(birthday)){
			alert("请填写数字!");
			$("#datepicker").focus();
			return false;
		}else{
			if(birthday.length!=8){
				alert("请填写有效出生日期,如 19890506 ");
				$("#datepicker").focus();
				return false;
			}
		}
	}
	if(null==province||""==province.trim()){
		alert("请填写省份!");
		$("#province").focus();
		return false;
	}
	if(null==city||""==city.trim()){
		alert("请填写城市!");
		$("#city").focus();
		return false;
	}
	if(null==area||""==area.trim()){
		alert("请填写区县!");
		$("#area").focus();
		return false;
	}
	if(null==detailaddr||""==detailaddr.trim()){
		alert("请填写详细住址!");
		$("#detailaddr").focus();
		return false;
	}
	if(null==degree||""==degree.trim()){
		alert("请填写文化程度!");
		$("#degree").focus();
		return false;
	}
	if(null==reason2learning_dharma||""==reason2learning_dharma.trim()){
		alert("请填写学佛因缘!");
		$("#reason2learning_dharma").focus();
		return false;
	}
	if(null==deep_understanding_of_dharma||""==deep_understanding_of_dharma.trim()){
		alert("对佛法了解程度!");
		$("#reason2learning_dharma").focus();
		return false;
	}

}
