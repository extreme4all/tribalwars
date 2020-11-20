// ==UserScript==
// @name           extra reports
// @namespace      https://github.com/extreme4all/tribalwars/blob/master/
// @description    Extra reports
// @include        https://*tribalwars.*/game.php?*screen=report*
// @require        http://code.jquery.com/jquery-3.3.1.min.js
// ==/UserScript==
// validation https://support.innogames.com/t13125805
var i
var barack_lvl = 25
var stable_lvl = 20
var workplace_lvl = 3

function add(accumulator, a) {
    return accumulator + a;
}
//calculating build time based on lvl
function time(build_time_list){
    // console.log(build_time_list)
	var result_list = []
    var building_lvl
    var time_factor
	//console.log(time_factor)
	for (i=1;i<build_time_list.length;i++){
        if (i <=4){
            building_lvl = barack_lvl
        }else if (i <= 8) {
            building_lvl = stable_lvl
        }else {
            building_lvl = workplace_lvl
        }
        time_factor = 2/3*Math.pow(1.06,-building_lvl)
		result_list[i] = time_factor*build_time_list[i];
	}
	return result_list;
}
// formatting time
function secondsToDhms(seconds) {
	seconds = Number(seconds);
	var d = Math.floor(seconds / (3600*24));
	var h = Math.floor(seconds % (3600*24) / 3600);
	var m = Math.floor(seconds % 3600 / 60);
	var s = Math.floor(seconds % 60);

	var dDisplay = d > 0 ? d + (d == 1 ? " day, " : " days, ") : "";
	var hDisplay = h > 0 ? h + (h == 1 ? " hour, " : " hours, ") : "";
	var mDisplay = m > 0 ? m + (m == 1 ? " minute, " : " minutes, ") : "";
	var sDisplay = s > 0 ? s + (s == 1 ? " second" : " seconds") : "";
	return dDisplay + hDisplay + mDisplay + sDisplay;
}
// Insert after node
function insertAfter(newNode, referenceNode) {
    referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
}
// add data to specific node
function addData(node,mytext){
	var d = document.getElementsByClassName("report_ReportAttack")[0]
	var item = document.createElement("p")
	var textnode = document.createTextNode(mytext)
	item.appendChild(textnode)
	//d.insertBefore(item,d.children["attack_info_att"])
	insertAfter(item,d.children[node])
}
// formating number 1 234
function numberWithSpaces(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
}

var opslag;
var build_time = [""]
// get request (like jquery $get)
function ajax(url, method, callback, params = null) {
     var obj;
     try {
      obj = new XMLHttpRequest();
     } catch(e){
       try {
         obj = new ActiveXObject("Msxml2.XMLHTTP");
       } catch(e) {
         try {
           obj = new ActiveXObject("Microsoft.XMLHTTP");
         } catch(e) {
           console.log("Your browser does not support Ajax.");
           return false;
         }
       }
     }
     obj.onreadystatechange = function() {
      if(obj.readyState == 4) {
         callback(obj);
      }
     }
     obj.open(method, url, true);
     obj.send(params);
     return obj;
 }
 // get build times from interfaces page
ajax('interface.php?func=get_unit_info', 'get',function(obj) {
    opslag = obj.responseXML;
    main(opslag)
})
// main function needed as callback for ajax function
function main(opslag){
    console.log(opslag)
    opslag = opslag.getElementsByTagName("config")[0]
    for (i = 0;i<opslag.childElementCount;i++){
        build_time.push(opslag.children[i].children[0].innerHTML)
    }
    var att_loss = document.getElementById("attack_info_att_units").rows[2]
	try {
		var def_loss = document.getElementById("attack_info_def_units").rows[2]
	}
	catch(err){
		console.log(err)
	}
	var loss_arr = [att_loss ,def_loss]

    var tags = ["titel","sp","zw","bl","bo","sc","lc","bb","zc","ram","kata","rid","edel"]
    var ODD_scores = ["",1,2,4,2,2,13,12,15,8,10,20,200]
    var ODA_scores = ["",4,5,1,5,1,5,6,23,4,12,40,200,0] //extra value cause militia
	var OD_score = [ODD_scores,ODA_scores]
    var real_build_time = time(build_time);

    var rebuild_time_barrack = []
    var rebuild_time_stable = []
    var rebuild_time_workshop = []
    var ODD = []
    var ODA = []
	var OD = [ODD,ODA]
	var OD_text = ["ODD ","ODA "]

	var table = ["attack_info_att","attack_info_def"]
	var t2 = ["attack_info_def","attack_info_att"]
	try {
	for (var loss_type = 0; loss_type < loss_arr.length;loss_type++){
		for(i = 1;i < loss_arr[loss_type].querySelectorAll("td").length;i++ ){
			var loss= loss_arr[loss_type].cells[i].innerHTML
			OD[loss_type][i] = loss *OD_score[loss_type][i]
			if(i<=4){
				rebuild_time_barrack.push(loss*real_build_time[i])
			} else if (i<=8){
				rebuild_time_stable.push(loss*real_build_time[i])
			} else {
				rebuild_time_workshop.push(loss*real_build_time[i])
			}
		}
		//order is reverse cause we append at the top
		addData(table[loss_type],("Rebuild time workshop: " + secondsToDhms(rebuild_time_workshop.reduce(add))))
		addData(table[loss_type],("Rebuild time stable: " + secondsToDhms(rebuild_time_stable.reduce(add))))
		addData(table[loss_type],("Rebuild time barack: " + secondsToDhms(rebuild_time_barrack.reduce(add))))
		//addData(t2[loss_type],(OD_text[loss_type] + numberWithSpaces(OD[loss_type].reduce(add))))
		rebuild_time_barrack = []
		rebuild_time_stable = []
		rebuild_time_workshop = []
	}
	}
	catch(err){
		console.log(err)
	}
	for (i = 0; i<OD.length;i++){
		addData(t2[i],(OD_text[i] + numberWithSpaces(OD[i].reduce(add))))
	}
}
