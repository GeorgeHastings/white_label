"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.effectiveDate=exports.reviewCoverage=exports.chooseCoverage=exports.propertyInfo=exports.buildingInfo=exports.basicBizInfo=exports.ownOrRent=exports.contactInfo=exports.insuranceLiteracy=exports.reasonForShopping=exports.currentSituation=exports.welcome=void 0;var _formComponents=require("./form-components.js"),_app=require("./app.js"),_uiComponents=require("./ui-components.js"),_constants=require("./constants.js"),welcome=new _formComponents.StepQuestion({label:"Welcome, let's get your business insured.",explainer:"We're going to ask you a few details about you and your business. You should have a quote in as few as 5 minutes.",id:"propertyInfo",components:[new _uiComponents.Button({id:"nextButton",style:"button__primary",text:"Get started",handleClick:function e(){(0,_app.stepForwards)()}})]});exports.welcome=welcome;var currentSituation=new _formComponents.StepQuestion({label:"First, what is your current business insurance situation?",explainer:"This helps us tailor the experience in a way that makes the most sense for you.",id:"currentSituation",components:[new _formComponents.RadioGroup({options:_constants.INSURANCE_SITUATION,id:"currentSituation",advance:!0,form:"introQuestions"}),new _uiComponents.Button({id:"nextButton",style:"button__tertiary",text:"Skip this",handleClick:function e(){(0,_app.stepForwards)()}})]});exports.currentSituation=currentSituation;var reasonForShopping=new _formComponents.StepQuestion({label:"Any particular reason why you’re shopping for it today?",explainer:"This helps us tailor the experience in a way that makes the most sense for you.",id:"reasonForShopping",components:[new _formComponents.RadioGroup({options:["I just need proof of insurance","I’m a new business","It’s about time I got the right coverage","None of these"],id:"reasonForShopping",advance:!0,form:"introQuestions"}),new _uiComponents.Button({id:"nextButton",style:"button__tertiary",text:"Skip this",handleClick:function e(){(0,_app.stepForwards)()}})]});exports.reasonForShopping=reasonForShopping;var insuranceLiteracy=new _formComponents.StepQuestion({label:"Lastly, how much would you say you know about business insurance?",explainer:"This helps us tailor the experience in a way that makes the most sense for you.",id:"insuranceLiteracy",components:[new _formComponents.RadioGroup({options:["I'm an expert","I know a bit","I know almost nothing"],id:"insuranceLiteracy",advance:!0,form:"introQuestions"}),new _uiComponents.Button({id:"nextButton",style:"button__tertiary",text:"Skip this",handleClick:function e(){(0,_app.stepForwards)()}})]});exports.insuranceLiteracy=insuranceLiteracy;var contactInfo=new _formComponents.StepQuestion({label:"Let's cover some basics.",explainer:"We can use this to pull some data automatically to speed up the process.",id:"contactInfo",components:[new _formComponents.InputField({label:"Legal business name",type:"text",id:"legalBusinessName",form:"bizDetails"}),new _formComponents.RadioGroup({options:["Yes","No"],id:"hasBizDba",label:"Does your business operate under a different name?",form:"bizDetails",style:"radio-group__split",conditional:{value:"Yes",target:"doingBizAs"}}),new _formComponents.InputField({label:"Doing business as name",type:"text",id:"doingBizAs",form:"bizDetails",style:"load-up",hide:!0}),new _formComponents.InputField({label:"Business email address",type:"text",id:"bizEmailAddress",form:"bizDetails",focusTip:"Invoices will be sent to this email."}),new _formComponents.AddressField({label:"Business address",id:"businessAddress",form:"bizAddress"}),new _formComponents.RadioGroup({options:["Yes","No"],id:"sameAsMailing",label:"Is this the same as your mailing address?",form:"bizDetails",style:"radio-group__split",conditional:{value:"No",target:"businessMailingAddress"}}),new _formComponents.AddressField({label:"Business mailing address",id:"businessMailingAddress",form:"bizMailingAddress",style:"load-up",hide:!0}),new _uiComponents.Button({id:"nextButton",style:"button__primary",text:"Next",handleClick:function e(){(0,_app.stepForwards)()}})]});exports.contactInfo=contactInfo;var ownOrRent=new _formComponents.StepQuestion({label:"How would you describe where you operate your business?",explainer:"This tells us whether or not we need to insure a building.",id:"ownOrRent",components:[new _formComponents.RadioGroup({options:["I have a home office","I rent my workspace","I own an office or building that I rent to a tenant","I own a building that I fully occupy"],id:"ownOrRent",form:"bizDetails"}),new _uiComponents.Button({id:"nextButton",style:"button__primary",text:"Next",handleClick:function e(){(0,_app.stepForwards)()}})]});exports.ownOrRent=ownOrRent;var basicBizInfo=new _formComponents.StepQuestion({label:"Tell us about your business.",explainer:"This information helps us better understand your risk.",id:"operationsInfo",components:[new _formComponents.RadioGroup({options:["Yes","No"],id:"moreThanOneLocation",label:"Do you operate more than one location?",form:"bizDetails",style:"radio-group__split"}),new _formComponents.InputField({label:"Number of employees",type:"number",id:"numEmployees",form:"operationsInfo"}),new _formComponents.InputField({label:"Annual revenue",type:"text",id:"annualRevenue",form:"operationsInfo",money:!0,hide:!0}),new _formComponents.InputField({label:"Revenue from alcohol sales",type:"text",id:"alcoholRevenue",form:"operationsInfo",money:!0,hide:!0}),new _uiComponents.Button({id:"nextButton",style:"button__primary",text:"Next",handleClick:function e(){(0,_app.stepForwards)()}})]});exports.basicBizInfo=basicBizInfo;var buildingInfo=new _formComponents.StepQuestion({label:"Give us some details about your building.",explainer:"This information helps us better understand your risk.",id:"propertyInfo",components:[new _formComponents.InputField({label:"Square footage of your building",type:"number",id:"squareFootage",form:"propertyInfo"}),new _formComponents.RadioGroup({options:["1","2","3","4+"],id:"numberOfFloors",label:"Number of stories in the building",form:"propertyInfo",style:"radio-group__split"}),new _uiComponents.Button({id:"nextButton",style:"button__primary",text:"Next",handleClick:function e(){(0,_app.stepForwards)()}})]});exports.buildingInfo=buildingInfo;var propertyInfo=new _formComponents.StepQuestion({label:"What is the total value of the property you would like to insure?",explainer:"Your policy must include the cost of replacing all of the belongings owned by your business. This includes things like furniture and equipment. It does not include vehicles.",id:"propertyInfo",components:[new _formComponents.InputField({label:"Value of personal property",type:"text",id:"bppValue",form:"propertyInfo",money:!0}),new _uiComponents.Button({id:"nextButton",style:"button__primary",text:"Next",handleClick:function e(){(0,_app.stepForwards)()}})]});exports.propertyInfo=propertyInfo;var chooseCoverage=new _formComponents.StepQuestion({label:"Choose your coverage.",explainer:"Based on what you've told us we are presenting the following coverage options.",id:"chooseCoverage",fullWidth:!0,components:[new _uiComponents.CoverageOptions({id:"coverageOption",options:[new _uiComponents.CoverageOption({id:"basicCoverage",name:"Basic",price:39,actionStyle:"button__secondary-alt",coverages:[{name:"General liability limit",limit:"$500,000"},{name:"Deductible",limit:"$10,000"}]}),new _uiComponents.CoverageOption({id:"standardCoverage",name:"Standard",price:55,actionStyle:"button__primary",coverages:[{name:"General liability limit",limit:"$1,000,000"},{name:"Deductible",limit:"$5,000"},{name:"",limit:"Hired auto"},{name:"",limit:"Cyber liability"}]}),new _uiComponents.CoverageOption({id:"premiumCoverage",name:"Premium",price:78,actionStyle:"button__secondary-alt",coverages:[{name:"General liability limit",limit:"$2,000,000"},{name:"Deductible",limit:"$1,000"},{name:"",limit:"Hired auto"},{name:"",limit:"Cyber liability"},{name:"",limit:"Professional Liability"}]})]})]});exports.chooseCoverage=chooseCoverage;var reviewCoverage=new _formComponents.StepQuestion({label:"Here is the coverage",explainer:"Read on up",id:"propertyInfo",components:[new _uiComponents.Button({id:"nextButton",style:"button__primary",text:"Choose this coverage",handleClick:function e(){(0,_app.stepForwards)()}})]});exports.reviewCoverage=reviewCoverage;var effectiveDate=new _formComponents.StepQuestion({label:"When would you like the policy to start?",explainer:'The "effective date" indicates when your coverage starts. It will renew every year on the same day and month.',id:"propertyInfo",components:[new _formComponents.DateField({id:"effectiveDate"}),new _uiComponents.Button({id:"nextButton",style:"button__primary",text:"Next",handleClick:function e(){(0,_app.stepForwards)()}})]});exports.effectiveDate=effectiveDate;