/*jshint esversion: 6 */

import {
  $,
} from './helpers.js';
import { dropColors } from './wingdings.js';
import {
  BreadCrumb,
  Navigation
} from './ui-components.js';
import {
  welcome,
  currentSituation,
  reasonForShopping,
  insuranceLiteracy,
  contactInfo,
  ownOrRent,
  basicBizInfo,
  buildingInfo,
  constructionType,
  propertyInfo,
  chooseCoverage,
  reviewCoverage,
  effectiveDate,
  bindPolicy
} from './steps.js';

import {
  HAS_INSURANCE,
  NO_INSURANCE,
} from './constants.js';

const STATE = {
  currentStep: 0,
  currentSubstep: 0,
  data: {}
};

const STEPS = [
  // [
  //   welcome,
  //   currentSituation,
  //   reasonForShopping,
  //   insuranceLiteracy
  // ],
  [
    contactInfo,
    ownOrRent,
    basicBizInfo,
    constructionType,
    propertyInfo
  ],
  // [
  //   buildingInfo,
  //   propertyInfo
  // ],
  [
    chooseCoverage,
    reviewCoverage,
  ],
  [
    effectiveDate,
    bindPolicy
  ]
];

const navigation = new Navigation(STATE.currentStep, STATE.currentSubstep);
const breadcrumb = new BreadCrumb(false, STATE.currentSubstep + 1, STEPS[STATE.currentStep].length);

export const updateState = args => {
  if(args.form) {
    if(!STATE.data[args.form]) {
      STATE.data[args.form] = {};
    }
    STATE.data[args.form][args.id] = args.value;
  } else {
    STATE.data[args.id] = args.value;
  }
  $('adminz-only').innerHTML = `<code>${JSON.stringify(STATE.data, undefined, 2)}</code>`;
};

export const getStatePropValue = id => {
  for(let prop in STATE.data) {
    if (typeof STATE.data[prop] === 'object') {
      for(let subprop in STATE.data[prop]) {
        if(subprop === id) {
          return STATE.data[prop][subprop];
        }
      }
    } else if(id === prop) {
      return STATE.data[prop];
    }
  }
};

const render = (id, component) => {
  $(id).innerHTML = null;
  $(id).appendChild(component.render());
};

const navigateStep = step => {
  const showBack = STATE.currentSubstep > 0 || STATE.currentStep > 0 ? true : false;
  breadcrumb.showBackButton = showBack;
  breadcrumb.currentStep = STATE.currentSubstep + 1;
  breadcrumb.totalSteps = STEPS[STATE.currentStep].length;
  navigation.index = STATE.currentStep;

  if(step.fullWidth) {
    $('mainContainer').classList.add('main-container__full-width');
  } else {
    $('mainContainer').classList = 'main-container';
  }

  if(step.id === 'reasonForShopping') {
    if(STATE.data.introQuestions && STATE.data.introQuestions.currentSituation === 'I don\'t have any') {
      step.components[0].options = NO_INSURANCE;
    } else {
      step.components[0].options = HAS_INSURANCE;
    }
  }

  window.scrollTo(0, 0);

  render('breadCrumb', breadcrumb);
  render('questionContainer', step);

  if($('navigation')) {
    navigation.update(breadcrumb.currentStep/breadcrumb.totalSteps);
  } else {
    render('navigationContainer', navigation);
    navigation.update(breadcrumb.currentStep/breadcrumb.totalSteps);
  }

  // const searchParamString = `q=URLUtils.searchParams&step=${STATE.currentStep}&substep=${STATE.currentSubstep}`;
  // const searchParams = new URLSearchParams(searchParamString);
  // window.location.replace(window.location.origin + searchParams);
};

export const stepForwards = () => {
  STATE.currentSubstep++;
  navigation.subIndex++;
  let step = STEPS[STATE.currentStep][STATE.currentSubstep];

  if(!step) {
    STATE.currentStep++;
    navigation.index++;
    STATE.currentSubstep = 0;
    navigation.subIndex = 0;

    if(STEPS[STATE.currentStep]) {
      step = STEPS[STATE.currentStep][STATE.currentSubstep];
    } else {
      return;
    }
  }

  if(step.loadTime) {
    $('fullScreenLoader').classList.remove('_hidden');
    setTimeout(() => {
      $('fullScreenLoader').classList.add('_hidden');
      navigateStep(step);
    }, step.loadTime);
  } else {
    navigateStep(step);
  }
};

export const stepBackwards = () => {
  STATE.currentSubstep--;
  navigation.subIndex--;
  let step = STEPS[STATE.currentStep][STATE.currentSubstep];

  if(!step) {
    STATE.currentStep--;
    navigation.index--;
    STATE.currentSubstep = STEPS[STATE.currentStep].length - 1;
    navigation.subIndex = STEPS[STATE.currentStep].length - 1;

    if(STEPS[STATE.currentStep]) {
      step = STEPS[STATE.currentStep][STATE.currentSubstep];
    } else {
      return;
    }
  }

  navigateStep(step);
};

const onInit = () => {
  navigateStep(STEPS[STATE.currentStep][STATE.currentSubstep]);
};

onInit();
