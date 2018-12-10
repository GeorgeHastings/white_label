/*jshint esversion: 6 */

import {
  $,
} from './helpers.js';

import {
  BreadCrumb,
  Navigation,
  HelpCard
} from './ui-components.js';
import {
  contactInfo,
  ownOrRent,
  basicBizInfo,
  constructionType,
  propertyInfo,
  chooseCoverage,
  reviewCoverage,
  bindPolicy,
  nextSteps
} from './steps.js';

import {
  HAS_INSURANCE,
  NO_INSURANCE,
} from './constants.js';

import {
  initBlockBreaker
} from './brickbreaker.js';

const STATE = {
  currentStep: 2,
  currentSubstep: 0,
  data: {}
};

const STEPS = [
  [
    contactInfo,
    ownOrRent,
    basicBizInfo,
    constructionType,
    propertyInfo
  ],
  [
    chooseCoverage,
    // reviewCoverage,
  ],
  [
    bindPolicy,
    nextSteps
  ]
];

const navigation = new Navigation(STATE.currentStep, STATE.currentSubstep);
const breadcrumb = new BreadCrumb(false, STATE.currentSubstep + 1, STEPS[STATE.currentStep].length);

export const updateState = args => {
  const step = STEPS[STATE.currentStep][STATE.currentSubstep];

  if(args.form) {
    if(!STATE.data[args.form]) {
      STATE.data[args.form] = {};
    }
    STATE.data[args.form][args.id] = args.value;
  } else {
    STATE.data[args.id] = args.value;
  }

  step.components.forEach(component => {
    if(component.show) {
      if(component.show()) {
        $(component.id).parentElement.classList.remove('_hidden');
      } else {
        $(component.id).parentElement.classList.add('_hidden');
      }
     }
  });

  if($('adminz-only')) {
    $('adminz-only').innerHTML = `<code>${JSON.stringify(STATE.data, undefined, 2)}</code>`;
  }
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

  if(step.style) {
    $('mainContainer').classList.add(step.style);
  } else {
    $('mainContainer').classList = 'main-container';
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

export const configPricingLayout = () => {
  $('wrapper').classList.add('wrapper__price-options');
  render('rightRail', new HelpCard({
    id: 'questionsHelp',
    icon: 'assets/images/question.svg',
    label: 'Questions?',
    body: 'Our licensed agents are standing by ready to assist you.',
    cta: 'Chat with an agent'
  }));
};

export const configCompeltedLayout = () => {
  $('wrapper').classList.add('wrapper__last-step');
  render('rightRail', new HelpCard({
    id: 'questionsHelp',
    icon: 'assets/images/question.svg',
    label: 'Questions?',
    body: 'Our licensed agents are standing by ready to assist you.',
    cta: 'Chat with an agent'
  }));
};

const onInit = () => {
  navigateStep(STEPS[STATE.currentStep][STATE.currentSubstep]);
};

onInit();
