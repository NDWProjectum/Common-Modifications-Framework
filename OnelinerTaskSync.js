//Oneliner with save to CF from task
//ID should be replaced by the div before the table
try
{
	jQuery("#ctl00_ctl33_g_c43e33d9_7e2b_41d1_8ea3_fdb4573adbf3").find("tbody").first().append("<tr id='oneliner1'></tr>");
	var tds1 = jQuery("#ctl00_ctl33_g_c43e33d9_7e2b_41d1_8ea3_fdb4573adbf3").find("td").filter(".ms-formlabel, .ms-formbody");
	jQuery("#oneliner1").append(tds1);
	
	jQuery("#ctl00_ctl33_g_c43e33d9_7e2b_41d1_8ea3_fdb4573adbf3").find("td.ms-formlabel").width(50);
	jQuery("#ctl00_ctl33_g_c43e33d9_7e2b_41d1_8ea3_fdb4573adbf3").find("td.ms-formbody").width(150);
	
	setTimeout(function(){
	if(EditState.Editing){
		$.ajax({
			url: "../_api/ProjectData/Projects(guid'"+PDP_projUid+"')/Tasks?$select=TaskName,TaskFinishDate&$filter=TaskIsMilestone%20eq%20true",
			dataType: "json",
			success: function (tasks) {
				tasks.value.forEach(function(task){
					jQuery("h3:contains('"+ task.TaskName+"')").parent().next().find("input").val(task.TaskFinishDate.toString().split("T")[0]);
				});
			}
		});
		
		jQuery("#ctl00_ctl33_g_0c926114_3f63_4ab9_aead_4fa8fa83df99").find("input").width(100);

		function disableCFs(){
			jQuery("#ctl00_ctl33_g_0c926114_3f63_4ab9_aead_4fa8fa83df99").find("input").attr("disabled", true);
			setTimeout(disableCFs, 2000);
		}
		disableCFs();
		WPDPParts[0].IsDirty = true;
		PDPButton.SaveData();
	}
	}, 500);
}
catch(err)
{
	console.log("'CUSTOM: Oneliner fields' has failed. Error: " + err.message);
}
