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
  propertyInfo,
  chooseCoverage
} from './steps.js';

import {
  HAS_INSURANCE,
  NO_INSURANCE,
} from './constants.js';

export const STATE = {
  currentStep: 0,
  currentSubstep: 0,
  data: {}
};

const STEPS = [
  [
    welcome,
    currentSituation,
    reasonForShopping,
    insuranceLiteracy
  ],
  [
    contactInfo,
    ownOrRent,
    basicBizInfo,
    propertyInfo
  ],
  [
    chooseCoverage
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
      step.fields[0].options = NO_INSURANCE;
    } else {
      step.fields[0].options = HAS_INSURANCE;
    }
  }

  render('breadCrumb', breadcrumb);
  render('questionContainer', step);
  render('navigationContainer', navigation);
};

export const stepForwards = () => {
  STATE.currentSubstep++;
  let step = STEPS[STATE.currentStep][STATE.currentSubstep];

  if(!step) {
    STATE.currentStep++;
    STATE.currentSubstep = 0;

    if(STEPS[STATE.currentStep]) {
      step = STEPS[STATE.currentStep][STATE.currentSubstep];
    } else {
      return;
    }
  }

  navigateStep(step);
};

export const stepBackwards = () => {
  STATE.currentSubstep--;
  let step = STEPS[STATE.currentStep][STATE.currentSubstep];

  if(!step) {
    STATE.currentStep--;
    STATE.currentSubstep = STEPS[STATE.currentStep].length - 1;

    if(STEPS[STATE.currentStep]) {
      step = STEPS[STATE.currentStep][STATE.currentSubstep];
    } else {
      return;
    }
  }

  navigateStep(step);
};

const onInit = () => {
  navigateStep(welcome);
};

onInit();
