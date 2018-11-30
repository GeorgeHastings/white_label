/*jshint esversion: 6 */

import {
  RadioGroup,
  InputField,
  AddressField,
  DateField,
  Checkbox,
  Select
} from './form-components.js';

import {
  stepForwards,
  getStatePropValue,
  configCompeltedLayout
} from './app.js';

import {
  dropConfetti
} from './confetti.js';

import {
  initBlockBreaker
} from './brickbreaker.js';

import {
  Button,
  CoverageOption,
  CoverageOptions,
  StepQuestion,
} from './ui-components.js';

import {
  ORGANIZATION_TYPES,
  CONSTRUCTION_TYPES
} from './constants.js';

export const contactInfo = new StepQuestion({
  label: 'Let\'s cover some basics.',
  explainer: 'We can use this to pull some data automatically to speed up the process.',
  id: 'contactInfo',
  components: [
    new InputField({
      label: 'Legal business name',
      type: 'text',
      id: 'legalBusinessName',
      form: 'basicInfo'
    }),
    new RadioGroup({
      options: [
        'Yes',
        'No'
      ],
      id: 'hasBizDba',
      label: 'Does your business operate under a different name?',
      form: 'basicInfo',
      style: 'radio-group__split',
    }),
    new InputField({
      label: 'Doing business as name',
      type: 'text',
      id: 'doingBizAs',
      form: 'basicInfo',
      style: 'load-up',
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
      form: 'businessAddress'
    }),
    new RadioGroup({
      options: [
        'Yes',
        'No'
      ],
      id: 'sameAsMailing',
      label: 'Is this the same as your mailing address?',
      form: 'basicInfo',
      style: 'radio-group__split',
    }),
    new AddressField({
      label: 'Business mailing address',
      id: 'businessMailingAddress',
      form: 'businessMailingAddress',
      style: 'load-up',
      show: () => {
        return getStatePropValue('sameAsMailing') === 'No';
      }
    }),
    new Button({
      id: 'nextButton',
      style: 'button__primary',
      text: 'Next',
      handleClick: () => {
        stepForwards();
        // initBlockBreaker();
      }
    })
  ]
});

export const ownOrRent = new StepQuestion({
  label: 'How would you describe where you operate your business?',
  explainer: 'This tells us whether or not we need to insure a building.',
  id: 'ownOrRent',
  loadTime: 3000,
  components: [
    new RadioGroup({
      options: [
        'I work from home',
        'I rent my workspace',
        'I own an office or building that I rent to a tenant',
        'I own a building that I fully occupy',
      ],
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

//Exposure

export const basicBizInfo = new StepQuestion({
  label: 'Tell us about your business.',
  explainer: 'This information helps us better understand your risk.',
  id: 'operationsInfo',
  components: [
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
  explainer: 'This helps us determine risk',
  id: 'propertyInfo',
  components: [
    new RadioGroup({
      id: 'bestDescriptionOfBuilding',
      form: 'buildingClassification',
      options: CONSTRUCTION_TYPES,
    }),
    // new RadioGroup({
    //   options: [
    //     'Concrete/masonry',
    //     'Wood frame',
    //     'Not sure'
    //   ],
    //   id: 'wallMaterial',
    //   label: 'What are the structural walls made of?',
    //   form: 'buildingClassification',
    //   style: 'load-up',
    //   show: () => {
    //     return getStatePropValue('bestDescriptionOfBuilding') === 'Residential or small retail shop' ||
    //       getStatePropValue('bestDescriptionOfBuilding') === 'None of these';
    //   }
    // }),
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
  explainer: 'Your policy must include the cost of replacing all of the belongings owned by your business. This includes things like furniture and equipment. It does not include vehicles.',
  id: 'propertyInfo',
  components: [
    new InputField({
      type: 'text',
      id: 'bppValue',
      form: 'businessDetails',
      money: true
    }),
    new Button({
      id: 'nextButton',
      style: 'button__primary',
      text: 'Calculate my rate',
      handleClick: () => {
        stepForwards();
      }
    })
  ]
});

export const chooseCoverage = new StepQuestion({
  label: 'Choose your coverage.',
  explainer: 'Based on what you\'ve told us we are presenting the following coverage options.',
  id: 'chooseCoverage',
  style: 'main-container__full-width',
  loadTime: 5000,
  components: [
    new CoverageOptions({
      id: 'coverageOption',
      options: [
        new CoverageOption({
          id: 'basicCoverage',
          name: 'Basic',
          price: 39,
          actionStyle: 'button__secondary-alt',
          coverages: [
            {
              name: 'General liability limit',
              limit: '$500,000'
            },
            {
              name: 'Deductible',
              limit: '$10,000'
            }
          ]
        }),
        new CoverageOption({
          id: 'standardCoverage',
          name: 'Standard',
          price: 55,
          actionStyle: 'button__primary',
          flag: 'Most popular',
          coverages: [
            {
              name: 'General liability limit',
              limit: '$1,000,000'
            },
            {
              name: 'Deductible',
              limit: '$5,000'
            },
            {
              name: '',
              limit: 'Hired auto'
            },
            {
              name: '',
              limit: 'Cyber liability'
            }
          ]
        }),
        new CoverageOption({
          id: 'premiumCoverage',
          name: 'Premium',
          price: 78,
          actionStyle: 'button__secondary-alt',
          coverages: [
            {
              name: 'General liability limit',
              limit: '$2,000,000'
            },
            {
              name: 'Deductible',
              limit: '$1,000'
            },
            {
              name: '',
              limit: 'Hired auto'
            },
            {
              name: '',
              limit: 'Cyber liability'
            },
            {
              name: '',
              limit: 'Professional Liability'
            }
          ]
        })
      ]
    })
  ]
});

export const reviewCoverage = new StepQuestion({
  label: 'Here is the coverage',
  explainer: 'Read on up',
  id: 'propertyInfo',
  components: [
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

// export const effectiveDate = new StepQuestion({
//   label: 'When would you like the policy to start?',
//   explainer: 'The "effective date" indicates when your coverage starts. It will renew every year on the same day and month.',
//   id: 'propertyInfo',
//   components: [
//     new DateField({
//       id: 'effectiveDate',
//     }),
//     new Button({
//       id: 'nextButton',
//       style: 'button__primary',
//       text: 'Next',
//       handleClick: () => {
//         stepForwards();
//       }
//     })
//   ]
// });

export const bindPolicy = new StepQuestion({
  label: 'Let\'s put a bow on this thing.',
  explainer: 'Read on up',
  id: 'bindPolicy',
  components: [
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
  ]
});
