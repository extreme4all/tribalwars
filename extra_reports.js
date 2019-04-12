
function add(accumulator, a) {
  return accumulator + a;
}
function time(build_time_list) {
  result_list = [];
  building_lvl = 20;
  time_factor = 2 / 3 * Math.pow(1.06, -building_lvl);
  console.log(time_factor);
  for (i = 1; i < build_time_list.length; i++) {
    result_list[i] = time_factor * build_time_list[i];
  }
  return result_list;
}
function secondsToDhms(seconds) {
  seconds = Number(seconds);
  var d = Math.floor(seconds / (3600 * 24));
  var h = Math.floor(seconds % (3600 * 24) / 3600);
  var m = Math.floor(seconds % 3600 / 60);
  var s = Math.floor(seconds % 60);
  var dDisplay = d > 0 ? d + (d == 1 ? " day, " : " days, ") : "";
  var hDisplay = h > 0 ? h + (h == 1 ? " hour, " : " hours, ") : "";
  var mDisplay = m > 0 ? m + (m == 1 ? " minute, " : " minutes, ") : "";
  var sDisplay = s > 0 ? s + (s == 1 ? " second" : " seconds") : "";
  return dDisplay + hDisplay + mDisplay + sDisplay;
}
function addRow(tableID, mytext) {
  var tableRef = document.getElementById(tableID);
  var newRow = tableRef.insertRow(-1);
  var newCell = newRow.insertCell(0);
  var newText = document.createTextNode(mytext);
  newCell.appendChild(newText);
}
attacker_loss = document.getElementById("attack_info_att_units");
def_loss = document.getElementById("attack_info_def_units");
ta = document.getElementById("attack_info_att");
td = document.getElementById("attack_info_def");
a = attacker_loss.rows[2];
d = def_loss.rows[2];
tags = ["titel", "sp", "zw", "bl", "bo", "sc", "lc", "bb", "zc", "ram", "kata", "rid", "edel"];
ODD_scores = ["", 1, 2, 4, 2, 2, 13, 12, 15, 8, 10, 20, 200];
ODA_scores = ["", 4, 5, 1, 5, 1, 5, 6, 23, 4, 12, 40, 200];
build_time = ["", 510, 750, 660, 900, 450, 900, 1350, 1800, 2400, 3600, 10800, 9000];
real_build_time = time(build_time);
rebuild_time_barrack = [];
rebuild_time_stable = [];
rebuild_time_workshop = [];
ODD = [];
ODA = [];
for (i = 1; i < a.querySelectorAll("td").length; i++) {
  loss = a.cells[i].innerHTML;
  ODD[i] = loss * ODD_scores[i];
  if (i <= 4) {
    rebuild_time_barrack.push(loss * real_build_time[i]);
  } else {
    if (i <= 8) {
      rebuild_time_stable.push(loss * real_build_time[i]);
    } else {
      rebuild_time_workshop.push(loss * real_build_time[i]);
    }
  }
}
addRow("attack_info_att", "Rebuild time barack: " + secondsToDhms(rebuild_time_barrack.reduce(add)));
addRow("attack_info_att", "Rebuild time stable: " + secondsToDhms(rebuild_time_stable.reduce(add)));
addRow("attack_info_att", "Rebuild time workshop: " + secondsToDhms(rebuild_time_workshop.reduce(add)));
console.log("ODD " + ODD.reduce(add));
rebuild_time_barrack = [];
rebuild_time_stable = [];
rebuild_time_workshop = [];
for (i = 1; i < d.querySelectorAll("td").length - 1; i++) {
  loss = d.cells[i].innerHTML;
  ODA[i] = loss * ODA_scores[i];
  if (i <= 4) {
    rebuild_time_barrack.push(loss * real_build_time[i]);
  } else {
    if (i <= 8) {
      rebuild_time_stable.push(loss * real_build_time[i]);
    } else {
      rebuild_time_workshop.push(loss * real_build_time[i]);
    }
  }
}
addRow("attack_info_def", "Rebuild time barack: " + secondsToDhms(rebuild_time_barrack.reduce(add)));
addRow("attack_info_def", "Rebuild time stable: " + secondsToDhms(rebuild_time_stable.reduce(add)));
addRow("attack_info_def", "Rebuild time workshop: " + secondsToDhms(rebuild_time_workshop.reduce(add)));
console.log("ODA " + ODA.reduce(add));
addRow("attack_info_def", "ODD " + ODD.reduce(add));
addRow("attack_info_att", "ODA " + ODA.reduce(add));
