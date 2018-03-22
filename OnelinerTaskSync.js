//Load jQuery from a console
var scr = document.createElement("script");
scr.src = "http://code.jquery.com/jquery-1.11.1.min.js";
document.body.appendChild(scr);

//Select ProjectUID from a PDP
var guid = "";

var sPageURL = decodeURIComponent(window.location.search.substring(1)),
        sURLVariables = sPageURL.split('&'),
        sParameterName,
        i;

for (i = 0; i < sURLVariables.length; i++) {
	sParameterName = sURLVariables[i].split('=');

    if (sParameterName[0].toLowerCase() === "projuid".toLowerCase()) {
        sParameterName[1] === undefined ? true : sParameterName[1];
		guid = sParameterName[1];
    }
}

//Select ProjectName from a PDP
var projName = jQuery("#zz13_idPDPQuickLaunch").find("span.menu-item-text").first().text();

//Print data from api
var _url = "http://Someurl.com";
getItems(_url);

function getItems(url) {
	$.ajax({
		url: url,
		type: "GET",
		headers: {
			"accept": "application/json;odata=verbose",
		},
		success: function (data) {
			handleData(data.d.results);
		},
		error: function (error) {
			alert(JSON.stringify(error));
		}
	});
}

function handleData(results){
	for (var i = 0; i < results.length; i++) {
		console.log(results[i]);
	}
}

//Enable toggle to description on a PDP (Only if the field has a description)
jQuery(document).ready(function() {
var h3parts = jQuery("h3");
var divparts = jQuery("div.ms-textXSmall");
var spanparts = divparts.find("span");
for(var i = 0; i< h3parts.length; i++){
	if(jQuery(spanparts[i]).text() != "" && jQuery(spanparts[i]).text() != null){
		jQuery(h3parts[i]).append("<div class='arrow-up'>&#9661; Description</div>");
		jQuery(h3parts[i]).append("<div class='arrow-down'>&#9654; Description</div>");
		jQuery(h3parts[i]).addClass("option-heading");
		jQuery(divparts[i]).addClass("option-content");
	}
}

jQuery(".option-content").hide();
jQuery(".arrow-up").hide();
jQuery(".option-heading").click(function(){
    jQuery(this).next(".option-content").slideToggle(500);
    jQuery(this).find(".arrow-up, .arrow-down").toggle();
});
});

//Check PDP for editmode
if (EditState.Editing){
	console.log("Is in editmode");
}
else{
	console.log("Is NOT in editmode");
}

//Hiding an element with CSS. This is good when element does not yet exists
jQuery("<style>a[id='Ribbon.ListItem.Manage.EditProperties-Large'] { display: none; }</style>")
	.appendTo(document.documentElement);


//Save PDP after 9 minutes of IDLE
var interval = setInterval(function() { 
    console.log("Saving because of idle in 9 minutes");
    PDPButton.SaveData();
	//clearInterval(interval); 
}, 540000);


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
