// Input 0
function add(b, c) {
  return b + c;
}
function time(b) {
  result_list = [];
  building_lvl = 20;
  time_factor = 2 / 3 * Math.pow(1.06, -building_lvl);
  console.log(time_factor);
  for (i = 1; i < b.length; i++) {
    result_list[i] = time_factor * b[i];
  }
  return result_list;
}
function secondsToDhms(b) {
  b = Number(b);
  var c = Math.floor(b / 86400), e = Math.floor(b % 86400 / 3600), f = Math.floor(b % 3600 / 60);
  b = Math.floor(b % 60);
  return (0 < c ? c + (1 == c ? " day, " : " days, ") : "") + (0 < e ? e + (1 == e ? " hour, " : " hours, ") : "") + (0 < f ? f + (1 == f ? " minute, " : " minutes, ") : "") + (0 < b ? b + (1 == b ? " second" : " seconds") : "");
}
function addRow(b, c) {
  var e = document.getElementById(b).insertRow(-1).insertCell(0), f = document.createTextNode(c);
  e.appendChild(f);
}
attacker_loss = document.getElementById("attack_info_att_units");
def_loss = document.getElementById("attack_info_def_units");
ta = document.getElementById("attack_info_att");
td = document.getElementById("attack_info_def");
a = attacker_loss.rows[2];
d = def_loss.rows[2];
tags = "titel sp zw bl bo sc lc bb zc ram kata rid edel".split(" ");
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
  loss = a.cells[i].innerHTML, ODD[i] = loss * ODD_scores[i], 4 >= i ? rebuild_time_barrack.push(loss * real_build_time[i]) : 8 >= i ? rebuild_time_stable.push(loss * real_build_time[i]) : rebuild_time_workshop.push(loss * real_build_time[i]);
}
addRow("attack_info_att", "Rebuild time barack: " + secondsToDhms(rebuild_time_barrack.reduce(add)));
addRow("attack_info_att", "Rebuild time stable: " + secondsToDhms(rebuild_time_stable.reduce(add)));
addRow("attack_info_att", "Rebuild time workshop: " + secondsToDhms(rebuild_time_workshop.reduce(add)));
console.log("ODD " + ODD.reduce(add));
rebuild_time_barrack = [];
rebuild_time_stable = [];
rebuild_time_workshop = [];
for (i = 1; i < d.querySelectorAll("td").length - 1; i++) {
  loss = d.cells[i].innerHTML, ODA[i] = loss * ODA_scores[i], 4 >= i ? rebuild_time_barrack.push(loss * real_build_time[i]) : 8 >= i ? rebuild_time_stable.push(loss * real_build_time[i]) : rebuild_time_workshop.push(loss * real_build_time[i]);
}
addRow("attack_info_def", "Rebuild time barack: " + secondsToDhms(rebuild_time_barrack.reduce(add)));
addRow("attack_info_def", "Rebuild time stable: " + secondsToDhms(rebuild_time_stable.reduce(add)));
addRow("attack_info_def", "Rebuild time workshop: " + secondsToDhms(rebuild_time_workshop.reduce(add)));
console.log("ODA " + ODA.reduce(add));
addRow("attack_info_def", "ODD " + ODD.reduce(add));
addRow("attack_info_att", "ODA " + ODA.reduce(add));
