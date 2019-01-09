/*jshint esversion: 6 */

import {
  $,
  toHTML,
  getFormField
} from './helpers.js';

import {
  BEAUTY_SALON,
  OFFICE,
  WINE_SHOP,
  BROWN_MOORE_ENDLER,
  ATTUNE
} from './constants.js';

const classcodes = {
  office: OFFICE,
  salon: BEAUTY_SALON,
  wine: WINE_SHOP
};

const agencies = {
  bme: BROWN_MOORE_ENDLER,
  attune: ATTUNE
};

const render = (id, content) => {
  $(id).innerHTML = null;
  $(id).appendChild(toHTML(content));
};

const createChecklist = items => {
  let list = ``;

  items.forEach(item => {
    list += `<div class="check-point">${item}</div>`;
  });

  return `<div>${list}</div>`;
};

const renderAgencyElements = agency => {
  render('agencyName', agency.name);
  render('agencyName', agency.name);
  render('aboutAgencyTitle', `We\'re ${agency.name}`);
  render('agencyPhone', agency.phone);
  render('agencyEmail', agency.email);
  render('reviewerLocation', agency.location);
  render('copyRight', `© 2019 ${agency.name}`);
  $('agencyLink').setAttribute('href', agency.about);
};

const renderClasscodeElements = classcode => {
  render('siteName', classcode.logo);
  render('siteUsp', classcode.displayName);
  render('classCodePlural', classcode.plural);
  render('checkList', createChecklist(classcode.checklist));
  render('reviewerBusiness', classcode.reviewerBusiness);
  render('bodyBusinessType', classcode.plural);
  $('introBg').setAttribute('style', `background-image: url(${classcode.backgroundCover})`);
  $('flavorImage').setAttribute('src', classcode.flavorImg);
};

const configParams = () => {
  const urlParams = new URLSearchParams(window.location.search);
  const classcode = urlParams.get('classcode');
  const agency = urlParams.get('agency');
  if(classcode) {
    renderClasscodeElements(classcodes[classcode]);
  } else {
    renderClasscodeElements(OFFICE);
  }
  if(agency) {
    renderAgencyElements(agencies[agency]);
  }
};

const onInit = () => {
  configParams();
};

onInit();
