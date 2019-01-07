/*jshint esversion: 6 */

import {
  RadioGroup,
  InputField,
  AddressField,
  DateField,
  Checkbox,
  Select,
  AskKodiakSearch
} from './form-components.js';

import {
  Button,
  CoverageOption,
  CoverageOptions,
  StepQuestion,
  Guidelines,
  PricingPage,
  Coverage,
  CoverageGroup,
  ListItem,
  List
} from './ui-components.js';

import {
  $,
} from './helpers.js';

import {
  stepForwards,
  getStatePropValue,
  configCompeltedLayout,
  configPricingLayout
} from './app.js';

import {
  dropConfetti
} from './confetti.js';

import {
  Game
} from './brickbreaker.js';

import {
  ORGANIZATION_TYPES,
  CONSTRUCTION_TYPES,
  LRO_OPTIONS
} from './constants.js';

const brickBreaker = new Game();

export const contactInfo = new StepQuestion({
  label: 'Let\'s cover some basics.',
  explainer: 'This will tell us whether you\'re eligible and how to get in touch.',
  id: 'contactInfo',
  loadTime: 4000,
  components: [
    new InputField({
      label: 'Legal business name',
      type: 'text',
      id: 'legalBusinessName',
      form: 'basicInfo',
      // default: 'New Hope Flower Shop'
    }),
    new RadioGroup({
      options: [
        'Yes',
        'No'
      ],
      id: 'hasBizDba',
      // default: 1,
      label: 'Does your business operate under a different name?',
      form: 'basicInfo',
      style: 'radio-group__split',
    }),
    new InputField({
      label: 'Doing business as name',
      type: 'text',
      id: 'doingBizAs',
      form: 'basicInfo',
      show: () => {
        return getStatePropValue('hasBizDba') === 'Yes';
      }
    }),
    new Select({
      options: ORGANIZATION_TYPES,
      label: 'Organization type',
      id: 'legalEntityType',
      form: 'basicInfo'
    }),
    new InputField({
      label: 'Business email address',
      type: 'text',
      id: 'bizEmailAddress',
      form: 'basicInfo',
      focusTip: 'Invoices will be sent to this email.'
    }),
    new AddressField({
      label: 'Business address',
      id: 'businessAddress',
      // default: {
      //   street: '9 West Mechanic Street',
      //   city: 'New Hope',
      //   state: 'Pennsylvania',
      //   zip: '18938'
      // },
      form: 'businessAddress'
    }),
    new RadioGroup({
      options: [
        'Yes',
        'No'
      ],
      // default: 0,
      id: 'sameAsMailing',
      label: 'Is this the same as your mailing address?',
      form: 'basicInfo',
      style: 'radio-group__split',
    }),
    new AddressField({
      label: 'Business mailing address',
      id: 'businessMailingAddress',
      form: 'businessMailingAddress',
      show: () => {
        return getStatePropValue('sameAsMailing') === 'No';
      }
    }),
    new RadioGroup({
      options: [
        'Yes',
        'No'
      ],
      id: 'moreThanOneLocation',
      label: 'Do you operate more than one location?',
      form: 'businessDetails',
      style: 'radio-group__split'
    }),
    new Button({
      id: 'nextButton',
      style: 'button__primary',
      text: 'Next',
      handleClick: () => {
        stepForwards();
      }
    })
  ]
});

export const ownOrRent = new StepQuestion({
  label: 'How would you describe where you operate your business?',
  explainer: 'This tells us whether or not we need to insure a building.',
  id: 'ownOrRent',
  // loadTime: 1000,
  components: [
    new RadioGroup({
      options: LRO_OPTIONS,
      id: 'ownOrRent',
      form: 'businessDetails'
    }),
    new Button({
      id: 'nextButton',
      style: 'button__primary',
      text: 'Next',
      handleClick: () => {
        stepForwards();
      }
    })
  ]
});

export const businessClassification = new StepQuestion({
  label: 'What industry are you in?',
  explainer: 'By classifying your business as accurately as possible, we\'ll be able to better tailor your coverage.',
  id: 'propertyInfo',
  components: [
    new AskKodiakSearch({
      type: 'text',
      id: 'classificationCode',
      resultsLimit: 50
    }),
    new Button({
      id: 'nextButton',
      style: 'button__primary',
      text: 'Next',
      handleClick: () => {
        stepForwards();
      }
    })
  ]
});

//Exposure

export const basicBizInfo = new StepQuestion({
  label: 'Tell us about your business.',
  explainer: 'This information helps us better understand your risk.',
  id: 'operationsInfo',
  components: [
    new InputField({
      label: 'Number of employees',
      type: 'number',
      id: 'numEmployees',
      form: 'businessDetails'
    }),
    new InputField({
      label: 'Square footage of your work space',
      type: 'number',
      id: 'squareFootage',
      // default: 1491,
      form: 'businessDetails'
    }),
    new RadioGroup({
      options: [
        '1',
        '2',
        '3',
        '4+'
      ],
      id: 'numberOfFloors',
      label: 'Number of stories in the building',
      form: 'businessDetails',
      // default: 1,
      style: 'radio-group__split'
    }),
    new InputField({
      label: 'Annual revenue',
      type: 'text',
      id: 'annualRevenue',
      form: 'businessDetails',
      money: true,
      hide: true
    }),
    new InputField({
      label: 'Revenue from alcohol sales',
      type: 'text',
      id: 'alcoholRevenue',
      form: 'businessDetails',
      money: true,
      hide: true
    }),
    new Button({
      id: 'nextButton',
      style: 'button__primary',
      text: 'Next',
      handleClick: () => {
        stepForwards();
      }
    })
  ]
});

export const constructionType = new StepQuestion({
  label: 'Which of these best describes your building?',
  explainer: 'This information helps us better understand your risk.',
  id: 'propertyInfo',
  components: [
    new RadioGroup({
      id: 'bestDescriptionOfBuilding',
      form: 'buildingClassification',
      options: CONSTRUCTION_TYPES,
    }),
    new Button({
      id: 'nextButton',
      style: 'button__primary',
      text: 'Next',
      handleClick: () => {
        stepForwards();
      }
    })
  ]
});

export const propertyInfo = new StepQuestion({
  label: 'What is the total value of your business’s personal property?',
  explainer: 'This should be the cost of replacing all of your business’s belongings. Examples include furniture, computers, and equipment but not vehicles (those need separate coverage).',
  id: 'propertyInfo',
  components: [
    new InputField({
      type: 'text',
      id: 'bppValue',
      form: 'businessDetails',
      focusTip: 'Value must be greater than $20,000',
      placeholder: '$',
      money: true
    }),
    new Button({
      id: 'nextButton',
      style: 'button__primary',
      text: 'Next',
      handleClick: () => {
        stepForwards();
      }
    })
  ]
});

export const guideLines = new StepQuestion({
  label: 'Lastly, please confirm you meet these eligibility criteria.',
  explainer: 'Meeting these criteria means that your policy can pay out a claim.',
  id: 'propertyInfo',
  components: [
    new Guidelines({
      id: 'guideLines',
    }),
    new Checkbox({
      id: 'agreeToGuidelines',
      label: 'I confirm that my business meets these guidelines'
    }),
    new Button({
      id: 'nextButton',
      style: 'button__primary',
      text: 'Get my quote',
      handleClick: () => {
        stepForwards();
        // brickBreaker.init();
      }
    })
  ]
});

export const chooseCoverage = new PricingPage({
  label: 'Choose your coverage.',
  explainer: 'Based on what you\'ve told us we are presenting the following coverage options.',
  id: 'chooseCoverage',
  loadTime: 12000,
  oninit: () => {
    configPricingLayout();
    // brickBreaker.kill();
  },
  components: [
    new CoverageOptions({
      id: 'coverageOption',
      options: [
        new CoverageOption({
          id: 'basicCoverage',
          name: 'Basic',
          price: 39,
          description: 'Light coverage for those who just need to check the box',
          actionStyle: 'button__secondary-alt',
        }),
        new CoverageOption({
          id: 'standardCoverage',
          name: 'Standard',
          price: 55,
          description: 'The most popular option for the average business',
          actionStyle: 'button__primary',
          flag: 'Most popular',
        }),
        new CoverageOption({
          id: 'premiumCoverage',
          name: 'Premium',
          price: 78,
          description: 'Extra for those who want a little more cushion',
          actionStyle: 'button__secondary-alt',
        })
      ]
    })
  ]
});

export const reviewCoverage = new StepQuestion({
  label: 'Here is the coverage',
  explainer: '$55/month or $600/year',
  style: 'main-container__full-width',
  id: 'propertyInfo',
  components: [
    new CoverageGroup({
      id: 'generalLiability',
      name: 'Your liability coverage',
      coverages: [
        new Coverage({
          id: 'generalLiabilityLimit',
          name: 'General Liability',
          limit: '$2,000,000',
          icon: 'assets/images/auction.svg',
          description: 'This is your "slip and fall" insurance. It covers your legal stuff.'
        }),
        new Coverage({
          id: 'medicalExpenses',
          name: 'Medical Expenses',
          limit: '$5,000',
          icon: 'assets/images/bandage-2.svg',
          description: 'Coverage does not require a finding of legal liability and is available to cover medical expenses incurred within a specified period by a claimant for a covered injury, regardless of whether the insured was at fault.'
        })
      ]
    }),
    new CoverageGroup({
      id: 'propertyCoverage',
      name: 'Your property coverage',
      coverages: [
        new Coverage({
          id: 'buildingValue',
          name: 'Building value',
          limit: '$560,000',
          icon: 'assets/images/shop-1.svg',
          description: 'This covers vehicles you or your employees use for business operations but are not owned by the busiess. Does not include delivery.'
        }),
        new Coverage({
          id: 'personalProperty',
          name: 'Personal property',
          limit: '$250,000',
          icon: 'assets/images/smartphone-laptop.svg',
          description: 'This covers vehicles you or your employees use for business operations but are not owned by the busiess. Does not include delivery.'
        }),
        new Coverage({
          id: 'deductible',
          name: 'Deductible',
          limit: '$2,500',
          icon: 'assets/images/banknote-1.svg',
          description: 'This covers vehicles you or your employees use for business operations but are not owned by the busiess. Does not include delivery.'
        }),
      ]
    }),
    new CoverageGroup({
      id: 'additionalCoverages',
      name: 'Additional coverages',
      coverages: [
        new Coverage({
          id: 'hiredNonOwnedAuto',
          name: 'Hired and Non-owned Auto',
          limit: '',
          icon: 'assets/images/car.svg',
          description: 'This covers vehicles you or your employees use for business operations but are not owned by the busiess. Does not include delivery.'
        }),
        new Coverage({
          id: 'spoilage',
          name: 'Spoilage',
          limit: '$50,000',
          icon: 'assets/images/fridge.svg',
          description: 'Coverage pays for loss of “perishable stock” when a change in temperature or humidity from a mechanical breakdown or failure of refrigeration, cooling or humidity control apparatus or equipment, as well as when loss happens from contamination by a refrigerant.'
        }),
        new Coverage({
          id: 'cyberAndData',
          name: 'Cyber and Data Liability',
          limit: '$100,000',
          icon: 'assets/images/cloud-locked.svg',
          description: 'The Data Response and Cyber Liability Coverage Endorsement insures the policyholder for certain common liability costs, expenses, fines and penalties which they may face in the event of an incident such as a data breach.'
        }),
      ]
    }),
    new Button({
      id: 'nextButton',
      style: 'button__primary',
      text: 'Continue with this',
      handleClick: () => {
        stepForwards();
      }
    })
  ],
  oninit: self => {
    const selectedCoverage = getStatePropValue('coverageOption') && getStatePropValue('coverageOption').replace('Coverage', '');
    self.label = `Summary of ${selectedCoverage || ''} coverage`;
  }
});

export const bindPolicy = new StepQuestion({
  label: 'Let\'s put a bow on this thing.',
  explainer: 'Just a few more details and we\'ll tell you what happens next.',
  id: 'bindPolicy',
  oninit: () => {
    $('wrapper').classList.remove('wrapper__price-options');
  },
  components: [
    new RadioGroup({
      label: 'How would you like to be billed?',
      id: 'paymentPlan',
      style: 'radio-group__split',
      default: 0,
      options: [
        `<div class="coverage-option-price">
          <div class="coverage-option-dollars">55</div>/ mo
        </div>
        <span>Pay monthly</span>
        <p class="tiny-text">20% down</p>`,
        `<div class="coverage-option-price">
          <div class="coverage-option-dollars">50</div>/ mo
        </div>
        <span>Pay annually</span><span class="tag">Save $55</span>
        <p class="tiny-text">$600/year</p>`,
      ],
    }),
    new DateField({
      label: 'When would you like the policy to take effect?',
      id: 'effectiveDate',
    }),
    new Checkbox({
      id: 'agreeToTerms',
      label: 'By checking this box you agree to get coverage for your business'
    }),
    new Button({
      id: 'nextButton',
      style: 'button__confirm',
      text: 'Get policy',
      handleClick: () => {
        stepForwards();
        dropConfetti('canvas');
        configCompeltedLayout();
      }
    })
  ]
});

export const nextSteps = new StepQuestion({
  label: 'Congrats! Your insurance is on the way.',
  explainer: 'Here\'s what to expect next.',
  id: 'nextSteps',
  // loadTime: 5000,
  components: [
    new List({
      id: 'nextSteps',
      steps: [
        new ListItem({
          id: 'policyStep',
          icon: 'assets/images/check_blue.svg',
          body: `Below is your policy document.
          Download it and look it over. Feel free to each out to us if you have any questions.
          <div class="policy-pdf"><span>businessowners-policy.pdf</span><img src="assets/images/download-2.svg"></div>
          `
        }),
        new ListItem({
          id: 'emailStep',
          icon: 'assets/images/check_blue.svg',
          body: 'You\'ll receive an invoice in your email within the next 4 hours. From there you can enter your billing information and pay.'
        }),
        new ListItem({
          id: 'coveredStep',
          icon: 'assets/images/check_blue.svg',
          body: 'Your coverage will start on the policies effective date.'
        }),
      ]
    })
  ]
});
