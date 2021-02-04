// ==UserScript==
// @name           extra attack
// @namespace      https://github.com/extreme4all/tribalwars/blob/master/
// @description    Extra attack
// @include        https://*tribalwars.*/game.php?*screen=place*
// @require        http://code.jquery.com/jquery-3.3.1.min.js
// ==/UserScript==

var parent = document.forms[0];
var para = document.createElement("P");
var sum = 0;

parent.prepend(para);
parent.addEventListener('input', updateValue);
para.innerText = "Total amount units: " + sum

function updateValue(e) {
   sum = Number(document.forms[0].spear.value)
      + Number(parent.sword.value)
      + Number(parent.axe.value)
      + Number(parent.archer.value)
      + Number(parent.spy.value)
      + Number(parent.light.value)
      + Number(parent.marcher.value)
      + Number(parent.heavy.value)
      + Number(parent.ram.value)
      + Number(parent.catapult.value)
      + Number(parent.knight.value)
      + Number(parent.snob.value);
   para.innerText = "Total amount units: " + sum
}