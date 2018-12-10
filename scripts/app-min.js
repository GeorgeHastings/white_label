"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.configCompeltedLayout=exports.configPricingLayout=exports.stepBackwards=exports.stepForwards=exports.getStatePropValue=exports.updateState=void 0;var _helpers=require("./helpers.js"),_uiComponents=require("./ui-components.js"),_steps=require("./steps.js"),_constants=require("./constants.js"),_brickbreaker=require("./brickbreaker.js");function _typeof(e){return(_typeof="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function e(t){return typeof t}:function e(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t})(e)}var STATE={currentStep:0,currentSubstep:0,data:{}},STEPS=[[_steps.contactInfo,_steps.ownOrRent,_steps.basicBizInfo,_steps.constructionType,_steps.propertyInfo],[_steps.chooseCoverage],[_steps.bindPolicy,_steps.nextSteps]],navigation=new _uiComponents.Navigation(STATE.currentStep,STATE.currentSubstep),breadcrumb=new _uiComponents.BreadCrumb(!1,STATE.currentSubstep+1,STEPS[STATE.currentStep].length),updateState=function e(t){var r=STEPS[STATE.currentStep][STATE.currentSubstep];t.form?(STATE.data[t.form]||(STATE.data[t.form]={}),STATE.data[t.form][t.id]=t.value):STATE.data[t.id]=t.value,r.components.forEach(function(e){e.show&&(e.show()?(0,_helpers.$)(e.id).parentElement.classList.remove("_hidden"):(0,_helpers.$)(e.id).parentElement.classList.add("_hidden"))}),(0,_helpers.$)("adminz-only")&&((0,_helpers.$)("adminz-only").innerHTML="<code>".concat(JSON.stringify(STATE.data,void 0,2),"</code>"))};exports.updateState=updateState;var getStatePropValue=function e(t){for(var r in STATE.data)if("object"===_typeof(STATE.data[r])){for(var n in STATE.data[r])if(n===t)return STATE.data[r][n]}else if(t===r)return STATE.data[r]};exports.getStatePropValue=getStatePropValue;var render=function e(t,r){(0,_helpers.$)(t).innerHTML=null,(0,_helpers.$)(t).appendChild(r.render())},navigateStep=function e(t){var r=0<STATE.currentSubstep||0<STATE.currentStep;breadcrumb.showBackButton=r,breadcrumb.currentStep=STATE.currentSubstep+1,breadcrumb.totalSteps=STEPS[STATE.currentStep].length,navigation.index=STATE.currentStep,t.style?(0,_helpers.$)("mainContainer").classList.add(t.style):(0,_helpers.$)("mainContainer").classList="main-container",window.scrollTo(0,0),render("breadCrumb",breadcrumb),render("questionContainer",t),(0,_helpers.$)("navigation")||render("navigationContainer",navigation),navigation.update(breadcrumb.currentStep/breadcrumb.totalSteps)},stepForwards=function e(){STATE.currentSubstep++,navigation.subIndex++;var t=STEPS[STATE.currentStep][STATE.currentSubstep];if(!t){if(STATE.currentStep++,navigation.index++,STATE.currentSubstep=0,navigation.subIndex=0,!STEPS[STATE.currentStep])return;t=STEPS[STATE.currentStep][STATE.currentSubstep]}t.loadTime?((0,_helpers.$)("fullScreenLoader").classList.remove("_hidden"),setTimeout(function(){(0,_helpers.$)("fullScreenLoader").classList.add("_hidden"),navigateStep(t)},t.loadTime)):navigateStep(t)};exports.stepForwards=stepForwards;var stepBackwards=function e(){STATE.currentSubstep--,navigation.subIndex--;var t=STEPS[STATE.currentStep][STATE.currentSubstep];if(!t){if(STATE.currentStep--,navigation.index--,STATE.currentSubstep=STEPS[STATE.currentStep].length-1,navigation.subIndex=STEPS[STATE.currentStep].length-1,!STEPS[STATE.currentStep])return;t=STEPS[STATE.currentStep][STATE.currentSubstep]}navigateStep(t)};exports.stepBackwards=stepBackwards;var configPricingLayout=function e(){(0,_helpers.$)("wrapper").classList.add("wrapper__price-options"),render("rightRail",new _uiComponents.HelpCard({id:"questionsHelp",icon:"assets/images/question.svg",label:"Questions?",body:"Our licensed agents are standing by ready to assist you.",cta:"Chat with an agent"}))};exports.configPricingLayout=configPricingLayout;var configCompeltedLayout=function e(){(0,_helpers.$)("wrapper").classList.add("wrapper__last-step"),render("rightRail",new _uiComponents.HelpCard({id:"questionsHelp",icon:"assets/images/question.svg",label:"Questions?",body:"Our licensed agents are standing by ready to assist you.",cta:"Chat with an agent"}))};exports.configCompeltedLayout=configCompeltedLayout;var onInit=function e(){navigateStep(STEPS[STATE.currentStep][STATE.currentSubstep])};onInit();