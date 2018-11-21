/*jshint esversion: 6 */

import {
  StepQuestion,
  RadioGroup,
  InputField,
  AddressField
} from './form-components.js';

import {
  stepForwards,
} from './app.js';

import {
  Button,
  CoverageOption,
  CoverageOptions
} from './ui-components.js';

import {
  INSURANCE_SITUATION,
  HAS_INSURANCE,
  NO_INSURANCE
} from './constants.js';

export const welcome = new StepQuestion({
  label: 'Welcome, let\'s get your business insured.',
  explainer: 'We\'re going to ask you a few details about you and your business. You should have a quote in no less than 5 minutes.',
  id: 'propertyInfo',
  fields: [
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
  fields: [
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
  fields: [
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
  fields: [
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
  label: 'Now let\'s cover some basics.',
  explainer: 'We can use this to pull some data automatically to speed up the process.',
  id: 'contactInfo',
  fields: [
    new InputField({
      label: 'Business name',
      type: 'text',
      id: 'businessName',
      form: 'bizDetails'
    }),
    new InputField({
      label: 'Email address',
      type: 'text',
      id: 'emailAddress',
      form: 'bizDetails'
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
      id: 'moreThanOneLocation',
      label: 'Do you operate more than one location?',
      form: 'bizDetails',
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
  fields: [
    new RadioGroup({
      options: [
        'I rent my workspace',
        'I own an office or building that I rent to a tenant',
        'I own a building that I fully occupy',
        'I have a home office',
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
  label: 'Tell us about your operation.',
  explainer: 'This information helps us better understand your risk.',
  id: 'operationsInfo',
  fields: [
    new InputField({
      label: 'Number of employees',
      type: 'number',
      id: 'numEmployees',
      form: 'operationsInfo'
    }),
    new InputField({
      label: 'Annual revenue',
      type: 'text',
      id: 'annualRevenue',
      form: 'operationsInfo',
      money: true
    }),
    new InputField({
      label: 'Revenue from alcohol sales',
      type: 'text',
      id: 'alcoholRevenue',
      form: 'operationsInfo',
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

export const propertyInfo = new StepQuestion({
  label: 'What is the total value of the property you would like to insure?',
  explainer: 'Your insurance policy must include the value of all of the belongings owned by your business. This includes things like furniture and equipment. It does not include vehicles.',
  id: 'propertyInfo',
  fields: [
    new InputField({
      label: 'Value of personal property',
      type: 'text',
      id: 'bppValue',
      form: 'propertyInfo',
      money: true
    }),
    // new InputField({
    //   label: 'Square footage of your building',
    //   type: 'number',
    //   id: 'squareFootage',
    //   form: 'propertyInfo'
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

export const chooseCoverage = new StepQuestion({
  label: 'Choose your coverage.',
  explainer: 'Based on what you\'ve told us we are presenting the following coverage options.',
  id: 'chooseCoverage',
  fullWidth: true,
  fields: [
    new CoverageOptions({
      id: 'CoverageOptions',
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
          id: 'basicCoverage',
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
          id: 'basicCoverage',
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
