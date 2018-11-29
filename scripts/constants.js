/*jshint esversion: 6 */

export const INSURANCE_SITUATION = [
  'I don\'t have any',
  'I have an existing policy',
  'I\'m not sure'
];

export const HAS_INSURANCE = [
  'I\'d like a better rate',
  'I’d like better coverage',
  'None of these'
];

export const NO_INSURANCE = [
  'I\'m a new business',
  'I just need to check the box',
  'It\'s time to get coverered',
];

export const NAVIGATION_ITEMS = [
  // 'About you',
  'Business info',
  'Coverage',
  'Summary'
];

export const ORGANIZATION_TYPES = [
  'Common Ownership',
  'Corporation',
  'Executor Trustee',
  'Government',
  'Individual',
  'Joint Venture',
  'Limited Partnership',
  'LLC',
  'LLP',
  'Non-Profit',
  'Partnership',
  'Religious',
  'Sole Proprietorship',
  'Trust Estate',
];

export const MOCK_DATA = {
  "bizDetails": {
    "legalBusinessName": "Bobby Vans",
    "hasBizDba": "No",
    "bizEmailAddress": "bobbyvans@gmail.com",
    "sameAsMailing": "Yes",
    "ownOrRent": "I rent my workspace",
    "moreThanOneLocation": "No"
  },
  "bizAddress": {
    "businessStreetAddress": "34 Exchange Place",
    "businessAddressCity": "New York",
    "businessAddressState": "NY",
    "businessAddressZip": "10013"
  },
  "operationsInfo": {
    "numEmployees": "30"
  },
  "propertyInfo": {
    "squareFootage": "2800",
    "numberOfFloors": "2",
    "bppValue": "$600,000"
  },
  "coverageOption": "standardCoverage"
}
