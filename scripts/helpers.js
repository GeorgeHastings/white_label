/*jshint esversion: 6 */

String.prototype.splice = function(start, delCount, newSubStr) {
    return this.slice(0, start) + newSubStr + this.slice(start + Math.abs(delCount));
};

export const $ = id =>
  document.getElementById(id);

export const toHTML = template => {
  const fragment = new DOMParser().parseFromString(template, 'text/html');
  return fragment.body.childNodes[0];
};

export const intToMoney = (value) => {
  let val = value.toString();
  let commator = 3;
  val = val.replace(/([,$]|\D)/g,'');
  let len = val.length;
  while(commator < len) {
    let comma = len - commator;
    val = val.splice(comma, 0, ',');
    commator += 3;
  }
  return '$' + val;
};

export const getFormField = function ( elem, selector ) {
  if(!elem.classList.contains('form-field')){
    while ((elem = elem.parentElement) && !elem.classList.contains(selector));
  }
  return elem;
};

export const getEligibilityGuidelines = code => {
  const URL = `https://api.askkodiak.com/v1/products/class-code/naics/${code}?productCodes=BOP+WORK`;
  fetch(URL, {
      method: 'GET',
      mode: 'cors',
      headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Basic LUwxU01MYzFkS2Y0UE9fcGU4dGs6NDFmNmEwMmNmMmEwNjBhM2Y0ZDFjNGUzYmJkMTkzYjc5MjUxYzhhMjBhODY2ZmFl'
      }
  })
  .then(response => response.json())
  .then(results => {
    return results;
  })
  .catch(error => console.error(`Fetch Error =\n`, error));
};
