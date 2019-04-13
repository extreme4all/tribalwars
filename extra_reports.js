// ==UserScript==
// @name           extra reports
// @namespace      https://github.com/extreme4all/tribalwars/blob/master/
// @description    Extra reports
// @include        https://*tribalwars.*/game.php?*screen=report*

// ==/UserScript==
var i
function add(accumulator, a) {
    return accumulator + a;
}
function time(build_time_list){
	var result_list = []
	var building_lvl = 20
	var time_factor = 2/3*Math.pow(1.06,-building_lvl)
	console.log(time_factor)
	for (i=1;i<build_time_list.length;i++){
		result_list[i] = time_factor*build_time_list[i];
	}
	return result_list;
}
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
function insertAfter(newNode, referenceNode) {
    referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
}
function addData(node,mytext){
	var d = document.getElementsByClassName("report_ReportAttack")[0]
	var item = document.createElement("p")
	var textnode = document.createTextNode(mytext)
	item.appendChild(textnode)
	//d.insertBefore(item,d.children["attack_info_att"])
	insertAfter(item,d.children[node])
}
function numberWithSpaces(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
}

function getbuiltime(){
	var opslag
	var bt = [""]
	$.get("interface.php?func=get_unit_info", function(data){
	    opslag = data
	});
	opslag = opslag.getElementsByTagName("config")[0]
	for (i = 0;i<opslag.childElementCount;i++){bt.push(opslag.children[i].children[0].innerHTML)}
	return bt
}
var attacker_loss = document.getElementById("attack_info_att_units")
var def_loss = document.getElementById("attack_info_def_units")
var ta = document.getElementById("attack_info_att")
var td = document.getElementById("attack_info_def")

var a = attacker_loss.rows[2]
var d = def_loss.rows[2]

var tags = ["titel","sp","zw","bl","bo","sc","lc","bb","zc","ram","kata","rid","edel"]
var ODD_scores = ["",1,2,4,2,2,13,12,15,8,10,20,200]
var ODA_scores = ["",4,5,1,5,1,5,6,23,4,12,40,200]
var build_time = getbuiltime()
var real_build_time = time(build_time);

var rebuild_time_barrack = []
var rebuild_time_stable = []
var rebuild_time_workshop = []
var ODD = []
var ODA = []



for(i = 1;i<a.querySelectorAll("td").length;i++ ){
	var loss= a.cells[i].innerHTML
	ODD[i] = loss * ODD_scores[i]
	if(i<=4){
		rebuild_time_barrack.push(loss*real_build_time[i])
	} else if (i<=8){
		rebuild_time_stable.push(loss*real_build_time[i])
	} else {
		rebuild_time_workshop.push(loss*real_build_time[i])
	}
}

addData("attack_info_att",("Rebuild time workshop: " + secondsToDhms(rebuild_time_workshop.reduce(add))))
addData("attack_info_att",("Rebuild time stable: " + secondsToDhms(rebuild_time_stable.reduce(add))))
addData("attack_info_att",("Rebuild time barack: " + secondsToDhms(rebuild_time_barrack.reduce(add))))
console.log("ODD " + ODD.reduce(add))
rebuild_time_barrack = []
rebuild_time_stable = []
rebuild_time_workshop = []
for(i = 1;i<d.querySelectorAll("td").length-1;i++ ){
	loss = d.cells[i].innerHTML
	ODA[i] = loss * ODA_scores[i]
	if(i<=4){
		rebuild_time_barrack.push(loss*real_build_time[i])
	} else if (i<=8){
		rebuild_time_stable.push(loss*real_build_time[i])
	} else {
		rebuild_time_workshop.push(loss*real_build_time[i])
	}
}

addData("attack_info_def",("Rebuild time workshop: " + secondsToDhms(rebuild_time_workshop.reduce(add))))
addData("attack_info_def",("Rebuild time stable: " + secondsToDhms(rebuild_time_stable.reduce(add))))
addData("attack_info_def",("Rebuild time barack: " + secondsToDhms(rebuild_time_barrack.reduce(add))))
console.log("ODA " + ODA.reduce(add))

addData("attack_info_def",("ODD " + numberWithSpaces(ODD.reduce(add))))
addData("attack_info_att",("ODA " + numberWithSpaces(ODA.reduce(add))))



