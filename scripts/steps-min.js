"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.nextSteps=exports.bindPolicy=exports.reviewCoverage=exports.chooseCoverage=exports.guideLines=exports.propertyInfo=exports.constructionType=exports.basicBizInfo=exports.businessClassification=exports.ownOrRent=exports.contactInfo=void 0;var _formComponents=require("./form-components.js"),_uiComponents=require("./ui-components.js"),_helpers=require("./helpers.js"),_app=require("./app.js"),_confetti=require("./confetti.js"),_brickbreaker=require("./brickbreaker.js"),_constants=require("./constants.js"),brickBreaker=new _brickbreaker.Game,contactInfo=new _uiComponents.StepQuestion({label:"Let's cover some basics.",explainer:"This will tell us whether you're eligible and how to get in touch.",id:"contactInfo",components:[new _formComponents.InputField({label:"Legal business name",type:"text",id:"legalBusinessName",form:"basicInfo"}),new _formComponents.RadioGroup({options:["Yes","No"],id:"hasBizDba",label:"Does your business operate under a different name?",form:"basicInfo",style:"radio-group__split"}),new _formComponents.InputField({label:"Doing business as name",type:"text",id:"doingBizAs",form:"basicInfo",show:function e(){return"Yes"===(0,_app.getStatePropValue)("hasBizDba")}}),new _formComponents.Select({options:_constants.ORGANIZATION_TYPES,label:"Organization type",id:"legalEntityType",form:"basicInfo"}),new _formComponents.InputField({label:"Business email address",type:"text",id:"bizEmailAddress",form:"basicInfo",focusTip:"Invoices will be sent to this email."}),new _formComponents.AddressField({label:"Business address",id:"businessAddress",form:"businessAddress"}),new _formComponents.RadioGroup({options:["Yes","No"],id:"sameAsMailing",label:"Is this the same as your mailing address?",form:"basicInfo",style:"radio-group__split"}),new _formComponents.AddressField({label:"Business mailing address",id:"businessMailingAddress",form:"businessMailingAddress",show:function e(){return"No"===(0,_app.getStatePropValue)("sameAsMailing")}}),new _formComponents.RadioGroup({options:["Yes","No"],id:"moreThanOneLocation",label:"Do you operate more than one location?",form:"businessDetails",style:"radio-group__split"}),new _uiComponents.Button({id:"nextButton",style:"button__primary",text:"Next",handleClick:function e(){(0,_app.stepForwards)()}})]});exports.contactInfo=contactInfo;var ownOrRent=new _uiComponents.StepQuestion({label:"How would you describe where you operate your business?",explainer:"This tells us whether or not we need to insure a building.",id:"ownOrRent",components:[new _formComponents.RadioGroup({options:_constants.LRO_OPTIONS,id:"ownOrRent",form:"businessDetails"}),new _uiComponents.Button({id:"nextButton",style:"button__primary",text:"Next",handleClick:function e(){(0,_app.stepForwards)()}})]});exports.ownOrRent=ownOrRent;var businessClassification=new _uiComponents.StepQuestion({label:"What industry are you in?",explainer:"By classifying your business as accurately as possible, we'll be able to better tailor your coverage.",id:"propertyInfo",components:[new _formComponents.AskKodiakSearch({type:"text",id:"classificationCode",resultsLimit:50}),new _uiComponents.Button({id:"nextButton",style:"button__primary",text:"Next",handleClick:function e(){(0,_app.stepForwards)()}})]});exports.businessClassification=businessClassification;var basicBizInfo=new _uiComponents.StepQuestion({label:"Tell us about your business.",explainer:"This information helps us better understand your risk.",id:"operationsInfo",components:[new _formComponents.InputField({label:"Number of employees",type:"number",id:"numEmployees",form:"businessDetails"}),new _formComponents.InputField({label:"Square footage of your work space",type:"number",id:"squareFootage",form:"businessDetails"}),new _formComponents.RadioGroup({options:["1","2","3","4+"],id:"numberOfFloors",label:"Number of stories in the building",form:"businessDetails",style:"radio-group__split"}),new _formComponents.InputField({label:"Annual revenue",type:"text",id:"annualRevenue",form:"businessDetails",money:!0,hide:!0}),new _formComponents.InputField({label:"Revenue from alcohol sales",type:"text",id:"alcoholRevenue",form:"businessDetails",money:!0,hide:!0}),new _uiComponents.Button({id:"nextButton",style:"button__primary",text:"Next",handleClick:function e(){(0,_app.stepForwards)()}})]});exports.basicBizInfo=basicBizInfo;var constructionType=new _uiComponents.StepQuestion({label:"Which of these best describes your building?",explainer:"This information helps us better understand your risk.",id:"propertyInfo",components:[new _formComponents.RadioGroup({id:"bestDescriptionOfBuilding",form:"buildingClassification",options:_constants.CONSTRUCTION_TYPES}),new _uiComponents.Button({id:"nextButton",style:"button__primary",text:"Next",handleClick:function e(){(0,_app.stepForwards)()}})]});exports.constructionType=constructionType;var propertyInfo=new _uiComponents.StepQuestion({label:"What is the total value of your business’s personal property?",explainer:"This should be the cost of replacing all of your business’s belongings. Examples include furniture, computers, and equipment but not vehicles (those need separate coverage).",id:"propertyInfo",components:[new _formComponents.InputField({type:"text",id:"bppValue",form:"businessDetails",focusTip:"Value must be greater than $20,000",placeholder:"$",money:!0}),new _uiComponents.Button({id:"nextButton",style:"button__primary",text:"Next",handleClick:function e(){(0,_app.stepForwards)()}})]});exports.propertyInfo=propertyInfo;var guideLines=new _uiComponents.StepQuestion({label:"Lastly, please confirm you meet these eligibility criteria.",explainer:"Meeting these criteria means that your policy can pay out a claim.",id:"propertyInfo",components:[new _uiComponents.Guidelines({id:"guideLines"}),new _formComponents.Checkbox({id:"agreeToGuidelines",label:"I confirm that my business meets these guidelines"}),new _uiComponents.Button({id:"nextButton",style:"button__primary",text:"Get my quote",handleClick:function e(){(0,_app.stepForwards)()}})]});exports.guideLines=guideLines;var chooseCoverage=new _uiComponents.PricingPage({label:"Choose your coverage.",explainer:"Based on what you've told us we are presenting the following coverage options.",id:"chooseCoverage",loadTime:12e3,oninit:function e(){(0,_app.configPricingLayout)()},components:[new _uiComponents.CoverageOptions({id:"coverageOption",options:[new _uiComponents.CoverageOption({id:"basicCoverage",name:"Basic",price:39,description:"Light coverage for those who just need to check the box",actionStyle:"button__secondary-alt"}),new _uiComponents.CoverageOption({id:"standardCoverage",name:"Standard",price:55,description:"The most popular option for the average business",actionStyle:"button__primary",flag:"Most popular"}),new _uiComponents.CoverageOption({id:"premiumCoverage",name:"Premium",price:78,description:"Extra for those who want a little more cushion",actionStyle:"button__secondary-alt"})]})]});exports.chooseCoverage=chooseCoverage;var reviewCoverage=new _uiComponents.StepQuestion({label:"Here is the coverage",explainer:"$55/month or $600/year",style:"main-container__full-width",id:"propertyInfo",components:[new _uiComponents.CoverageGroup({id:"generalLiability",name:"Your liability coverage",coverages:[new _uiComponents.Coverage({id:"generalLiabilityLimit",name:"General Liability",limit:"$2,000,000",icon:"assets/images/auction.svg",description:'This is your "slip and fall" insurance. It covers your legal stuff.'}),new _uiComponents.Coverage({id:"medicalExpenses",name:"Medical Expenses",limit:"$5,000",icon:"assets/images/bandage-2.svg",description:"Coverage does not require a finding of legal liability and is available to cover medical expenses incurred within a specified period by a claimant for a covered injury, regardless of whether the insured was at fault."})]}),new _uiComponents.CoverageGroup({id:"propertyCoverage",name:"Your property coverage",coverages:[new _uiComponents.Coverage({id:"buildingValue",name:"Building value",limit:"$560,000",icon:"assets/images/shop-1.svg",description:"This covers vehicles you or your employees use for business operations but are not owned by the busiess. Does not include delivery."}),new _uiComponents.Coverage({id:"personalProperty",name:"Personal property",limit:"$250,000",icon:"assets/images/smartphone-laptop.svg",description:"This covers vehicles you or your employees use for business operations but are not owned by the busiess. Does not include delivery."}),new _uiComponents.Coverage({id:"deductible",name:"Deductible",limit:"$2,500",icon:"assets/images/banknote-1.svg",description:"This covers vehicles you or your employees use for business operations but are not owned by the busiess. Does not include delivery."})]}),new _uiComponents.CoverageGroup({id:"additionalCoverages",name:"Additional coverages",coverages:[new _uiComponents.Coverage({id:"hiredNonOwnedAuto",name:"Hired and Non-owned Auto",limit:"",icon:"assets/images/car.svg",description:"This covers vehicles you or your employees use for business operations but are not owned by the busiess. Does not include delivery."}),new _uiComponents.Coverage({id:"spoilage",name:"Spoilage",limit:"$50,000",icon:"assets/images/fridge.svg",description:"Coverage pays for loss of “perishable stock” when a change in temperature or humidity from a mechanical breakdown or failure of refrigeration, cooling or humidity control apparatus or equipment, as well as when loss happens from contamination by a refrigerant."}),new _uiComponents.Coverage({id:"cyberAndData",name:"Cyber and Data Liability",limit:"$100,000",icon:"assets/images/cloud-locked.svg",description:"The Data Response and Cyber Liability Coverage Endorsement insures the policyholder for certain common liability costs, expenses, fines and penalties which they may face in the event of an incident such as a data breach."})]}),new _uiComponents.Button({id:"nextButton",style:"button__primary",text:"Continue with this",handleClick:function e(){(0,_app.stepForwards)()}})],oninit:function e(o){var n=(0,_app.getStatePropValue)("coverageOption")&&(0,_app.getStatePropValue)("coverageOption").replace("Coverage","");o.label="Summary of ".concat(n||""," coverage")}});exports.reviewCoverage=reviewCoverage;var bindPolicy=new _uiComponents.StepQuestion({label:"Let's put a bow on this thing.",explainer:"Just a few more details and we'll tell you what happens next.",id:"bindPolicy",oninit:function e(){(0,_helpers.$)("wrapper").classList.remove("wrapper__price-options")},components:[new _formComponents.RadioGroup({label:"How would you like to be billed?",id:"paymentPlan",style:"radio-group__split",default:0,options:['<div class="coverage-option-price">\n          <div class="coverage-option-dollars">55</div>/ mo\n        </div>\n        <span>Pay monthly</span>\n        <p class="tiny-text">20% down</p>','<div class="coverage-option-price">\n          <div class="coverage-option-dollars">50</div>/ mo\n        </div>\n        <span>Pay annually</span><span class="tag">Save $55</span>\n        <p class="tiny-text">$600/year</p>']}),new _formComponents.DateField({label:"When would you like the policy to take effect?",id:"effectiveDate"}),new _formComponents.Checkbox({id:"agreeToTerms",label:"By checking this box you agree to get coverage for your business"}),new _uiComponents.Button({id:"nextButton",style:"button__confirm",text:"Get policy",handleClick:function e(){(0,_app.stepForwards)(),(0,_confetti.dropConfetti)("canvas"),(0,_app.configCompeltedLayout)()}})]});exports.bindPolicy=bindPolicy;var nextSteps=new _uiComponents.StepQuestion({label:"Congrats! Your insurance is on the way.",explainer:"Here's what to expect next.",id:"nextSteps",components:[new _uiComponents.List({id:"nextSteps",steps:[new _uiComponents.ListItem({id:"policyStep",icon:"assets/images/check_blue.svg",body:'Below is your policy document.\n          Download it and look it over. Feel free to each out to us if you have any questions.\n          <div class="policy-pdf"><span>businessowners-policy.pdf</span><img src="assets/images/download-2.svg"></div>\n          '}),new _uiComponents.ListItem({id:"emailStep",icon:"assets/images/check_blue.svg",body:"You'll receive an invoice in your email within the next 4 hours. From there you can enter your billing information and pay."}),new _uiComponents.ListItem({id:"coveredStep",icon:"assets/images/check_blue.svg",body:"Your coverage will start on the policies effective date."})]})]});exports.nextSteps=nextSteps;