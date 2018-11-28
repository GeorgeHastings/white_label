/*jshint esversion: 6 */

import {
  RadioGroup,
  InputField,
  AddressField,
  DateField
} from './form-components.js';

import {
  stepForwards,
  getStatePropValue
} from './app.js';

import {
  Button,
  CoverageOption,
  CoverageOptions,
  StepQuestion,
} from './ui-components.js';

import {
  INSURANCE_SITUATION,
  HAS_INSURANCE,
  NO_INSURANCE
} from './constants.js';

export const welcome = new StepQuestion({
  label: 'Welcome, let\'s get your business insured.',
  explainer: 'We\'re going to ask you a few details about you and your business. You should have a quote in as few as 5 minutes.',
  id: 'propertyInfo',
  components: [
    new Button({
      id: 'nextButton',
      style: 'button__primary',
      text: 'Get started',
      handleClick: () => {
        stepForwards();
      }
    })
  ]
});

export const currentSituation = new StepQuestion({
  label: 'First, what is your current business insurance situation?',
  explainer: 'This helps us tailor the experience in a way that makes the most sense for you.',
  id: 'currentSituation',
  components: [
    new RadioGroup({
      options: INSURANCE_SITUATION,
      id: 'currentSituation',
      advance: true,
      form: 'introQuestions'
    }),
    new Button({
      id: 'nextButton',
      style: 'button__tertiary',
      text: 'Skip this',
      handleClick: () => {
        stepForwards();
      }
    })
  ],
});

export const reasonForShopping = new StepQuestion({
  label: 'Any particular reason why you’re shopping for it today?',
  explainer: 'This helps us tailor the experience in a way that makes the most sense for you.',
  id: 'reasonForShopping',
  components: [
    new RadioGroup({
      options: [
        'I just need proof of insurance',
        'I’m a new business',
        'It’s about time I got the right coverage',
        'None of these'
      ],
      id: 'reasonForShopping',
      advance: true,
      form: 'introQuestions'
    }),
    new Button({
      id: 'nextButton',
      style: 'button__tertiary',
      text: 'Skip this',
      handleClick: () => {
        stepForwards();
      }
    })
  ]
});

export const insuranceLiteracy = new StepQuestion({
  label: 'Lastly, how much would you say you know about business insurance?',
  explainer: 'This helps us tailor the experience in a way that makes the most sense for you.',
  id: 'insuranceLiteracy',
  components: [
    new RadioGroup({
      options: [
        'I\'m an expert',
        'I know a bit',
        'I know almost nothing',
      ],
      id: 'insuranceLiteracy',
      advance: true,
      form: 'introQuestions'
    }),
    new Button({
      id: 'nextButton',
      style: 'button__tertiary',
      text: 'Skip this',
      handleClick: () => {
        stepForwards();
      }
    })
  ]
});

export const contactInfo = new StepQuestion({
  label: 'Let\'s cover some basics.',
  explainer: 'We can use this to pull some data automatically to speed up the process.',
  id: 'contactInfo',
  components: [
    new InputField({
      label: 'Legal business name',
      type: 'text',
      id: 'legalBusinessName',
      form: 'bizDetails'
    }),
    new RadioGroup({
      options: [
        'Yes',
        'No'
      ],
      id: 'hasBizDba',
      label: 'Does your business operate under a different name?',
      form: 'bizDetails',
      style: 'radio-group__split',
      conditional: {
        value: 'Yes',
        target: 'doingBizAs'
      }
    }),
    new InputField({
      label: 'Doing business as name',
      type: 'text',
      id: 'doingBizAs',
      form: 'bizDetails',
      style: 'load-up',
      hide: true
    }),
    new InputField({
      label: 'Business email address',
      type: 'text',
      id: 'bizEmailAddress',
      form: 'bizDetails',
      focusTip: 'Invoices will be sent to this email.'
    }),
    new AddressField({
      label: 'Business address',
      id: 'businessAddress',
      form: 'bizAddress'
    }),
    new RadioGroup({
      options: [
        'Yes',
        'No'
      ],
      id: 'sameAsMailing',
      label: 'Is this the same as your mailing address?',
      form: 'bizDetails',
      style: 'radio-group__split',
      conditional: {
        value: 'No',
        target: 'businessMailingAddress'
      }
    }),
    new AddressField({
      label: 'Business mailing address',
      id: 'businessMailingAddress',
      form: 'bizMailingAddress',
      style: 'load-up',
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
      form: 'bizDetails'
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
      form: 'bizDetails',
      style: 'radio-group__split'
    }),
    new InputField({
      label: 'Number of employees',
      type: 'number',
      id: 'numEmployees',
      form: 'operationsInfo'
    }),
    new InputField({
      label: 'Square footage of your building',
      type: 'number',
      id: 'squareFootage',
      form: 'propertyInfo'
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
      form: 'propertyInfo',
      style: 'radio-group__split'
    }),
    new InputField({
      label: 'Annual revenue',
      type: 'text',
      id: 'annualRevenue',
      form: 'operationsInfo',
      money: true,
      hide: true
    }),
    new InputField({
      label: 'Revenue from alcohol sales',
      type: 'text',
      id: 'alcoholRevenue',
      form: 'operationsInfo',
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
      // label: 'Which of these best describes your building?',
      id: 'bestDescriptionOfBuilding',
      form: 'buildingClassification',
      options: [
        'Residential or small retail shop',
        'Warehouse or manufacturing facility',
        'Strip mall or small office building',
        'High rise office building',
      ],
      conditional: {
        value: 'Residential or small retail shop',
        target: 'wallMaterial'
      }
    }),
    new RadioGroup({
      options: [
        'Concrete/masonry',
        'Wood frame',
        'Not sure'
      ],
      id: 'wallMaterial',
      label: 'What are the exterior walls made of?',
      form: 'buildingClassification',
      style: 'load-up',
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

export const buildingInfo = new StepQuestion({
  label: 'Give us some details about your building.',
  explainer: 'This information helps us better understand your risk.',
  id: 'propertyInfo',
  components: [
    new InputField({
      label: 'Square footage of your building',
      type: 'number',
      id: 'squareFootage',
      form: 'propertyInfo'
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
      form: 'propertyInfo',
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

export const propertyInfo = new StepQuestion({
  label: 'What is the total value of your business’s personal property?',
  explainer: 'Your policy must include the cost of replacing all of the belongings owned by your business. This includes things like furniture and equipment. It does not include vehicles.',
  id: 'propertyInfo',
  components: [
    new InputField({
      label: 'Value of personal property',
      type: 'text',
      id: 'bppValue',
      form: 'propertyInfo',
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

export const chooseCoverage = new StepQuestion({
  label: 'Choose your coverage.',
  explainer: 'Based on what you\'ve told us we are presenting the following coverage options.',
  id: 'chooseCoverage',
  fullWidth: true,
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
    self.label = `Summary of ${getStatePropValue('coverageOption').replace('Coverage', '')} coverage`;
  }
});

export const effectiveDate = new StepQuestion({
  label: 'When would you like the policy to start?',
  explainer: 'The "effective date" indicates when your coverage starts. It will renew every year on the same day and month.',
  id: 'propertyInfo',
  components: [
    new DateField({
      id: 'effectiveDate',
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

export const bindPolicy = new StepQuestion({
  label: 'Confirm your details and you\'re on your way!',
  explainer: 'Read on up',
  id: 'bindPolicy',
  components: [
    new Button({
      id: 'nextButton',
      style: 'button__confirm',
      text: 'Get policy',
      handleClick: () => {
        stepForwards();
      }
    })
  ],
  oninit: self => {
    self.label = `Summary of ${getStatePropValue('coverageOption').replace('Coverage', '')} coverage`;
  }
});
