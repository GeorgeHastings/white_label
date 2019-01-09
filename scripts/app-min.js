"use strict";var _helpers=require("./helpers.js"),_constants=require("./constants.js"),classcodes={office:_constants.OFFICE,salon:_constants.BEAUTY_SALON,wine:_constants.WINE_SHOP},agencies={bme:_constants.BROWN_MOORE_ENDLER,attune:_constants.ATTUNE},render=function e(n,r){(0,_helpers.$)(n).innerHTML=null,(0,_helpers.$)(n).appendChild((0,_helpers.toHTML)(r))},createChecklist=function e(n){var r="";return n.forEach(function(e){r+='<div class="check-point">'.concat(e,"</div>")}),"<div>".concat(r,"</div>")},renderAgencyElements=function e(n){render("agencyName",n.name),render("agencyName",n.name),render("aboutAgencyTitle","We're ".concat(n.name)),render("agencyPhone",n.phone),render("agencyEmail",n.email),render("reviewerLocation",n.location),render("copyRight","© 2019 ".concat(n.name)),(0,_helpers.$)("agencyLink").setAttribute("href",n.about)},renderClasscodeElements=function e(n){render("siteName",n.logo),render("siteUsp",n.displayName),render("classCodePlural",n.plural),render("checkList",createChecklist(n.checklist)),render("reviewerBusiness",n.reviewerBusiness),render("bodyBusinessType",n.plural),(0,_helpers.$)("introBg").setAttribute("style","background-image: url(../".concat(n.backgroundCover,")")),(0,_helpers.$)("flavorImage").setAttribute("src",n.flavorImg)},configParams=function e(){var n=new URLSearchParams(window.location.search),r=n.get("classcode"),s=n.get("agency");renderClasscodeElements(r?classcodes[r]:_constants.OFFICE),s&&renderAgencyElements(agencies[s])},onInit=function e(){configParams()};onInit();