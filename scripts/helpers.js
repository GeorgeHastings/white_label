/*jshint esversion: 6 */

String.prototype.splice = function(start, delCount, newSubStr) {
    return this.slice(0, start) + newSubStr + this.slice(start + Math.abs(delCount));
};

export const $ = id =>
  document.getElementById(id);

export const toHTML = template => {
  return new DOMParser().parseFromString(template, 'text/html');
};

export const intToMoney = (value) => {
  let val = value.toString();
  let commator = 3;
  val = val.replace(/([,$]|\D)/g,'');
  let len = val.length;
  console.log(val)
  while(commator < len) {
    let comma = len - commator;
    val = val.splice(comma, 0, ',');
    commator += 3;
  }
  return '$' + val;
};
