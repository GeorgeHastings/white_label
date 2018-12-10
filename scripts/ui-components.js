/*jshint esversion: 6 */

import {
  $,
  toHTML,
} from './helpers.js';

import {
  stepBackwards,
  stepForwards,
  updateState
} from './app.js';

import {
  NAVIGATION_ITEMS
} from './constants.js';

export class BreadCrumb {
  constructor(showBackButton, currentStep, totalSteps) {
    this.showBackButton = showBackButton;
    this.currentStep = currentStep;
    this.totalSteps = totalSteps;
  }

  render() {
    const html = toHTML(`
      <div class="load-in">
        <div class="back-button" ${this.showBackButton ? '' : `style="display: none;"`}>
          <img src="assets/images/arrow.svg">
        </div>
        <div class="breadcrumb">${this.currentStep} / ${this.totalSteps}</div>
      </div>
    `);

    html.querySelector('.back-button').onclick = stepBackwards;

    return html;
  }
}

export class NavigationItem {
  constructor(navName, state) {
    this.navName = navName;
    this.state = state;
  }

  render() {
    const html = toHTML(`
      <div class="nav-item ${this.state}">
        <div class="nav-circle">
          <svg height="4rem" width="4rem">
            <circle stroke-dasharray="16rem" stroke-dashoffset="0" cx="2rem" cy="2rem" r="1.82rem" stroke="#E6FAFA" stroke-width="0.38rem" fill="transparent" />
          </svg>
        </div>
        <span>${this.navName}</span>
      </div>
    `);

    return html;
  }
}

export class Navigation {
  constructor(index, subIndex) {
    this.items = NAVIGATION_ITEMS;
    this.index = index;
    this.subIndex = subIndex;
  }

  update(amount) {
    const navItems = $('navigation').querySelectorAll('.nav-item');

    navItems.forEach((item, index) => {
      if(index < this.index) {
        item.classList = 'nav-item nav-item__complete';
      } else if(index === this.index) {
        item.classList = 'nav-item nav-item__active';
        item.querySelector('circle').setAttribute('stroke-dasharray', '11.68rem');
        item.querySelector('circle').setAttribute('stroke-dashoffset', (120*amount*0.1)+'rem');
      } else {
        item.classList = 'nav-item';
      }
    });
  }

  render() {
    const html = toHTML(`
      <div id="navigation" class="navigation"></div>
    `);

    this.items.forEach((item, index) => {
      let state;
      if(this.index === index) {
        state = 'nav-item__active';
      } else if (index < this.index) {
        state = 'nav-item__complete';
      }
      html.appendChild(new NavigationItem(item, state).render());
    });

    return html;
  }
}

export class Button {
  constructor(args) {
    this.id = args.id;
    this.style = args.style;
    this.text = args.text;
    this.handleClick = args.handleClick;
  }

  render() {
    const html = toHTML(`
      <a class="button ${this.style}" href="javascript:void(0)">${this.text}</a>
    `);

    html.onclick = this.handleClick;

    return html;
  }
}

export class PricingPage {
  constructor(args) {
    this.id = args.id;
    this.label = args.label;
    this.explainer = args.explainer;
    this.components = args.components;
    this.style = args.style;
    this.loadTime = args.loadTime;
    this.oninit = args.oninit && args.oninit.bind(this);
  }

  render() {
    if(this.oninit) {
      this.oninit(this);
    }

    const html = toHTML(`
      <div class="pricing-page-container load-in">
        <div class="pricing-page-top">
          <div class="pricing-page-details">
            <h1>${this.label}</h1>
            <p class="explainer">${this.explainer}</p>
          </div>
          <div class="pricing-page-options"></div>
        </div>
        <div class="coverage-table">
          <table>
              <tr><td class="coverage-label">Property coverage</td></tr>
              <tr>
                <td>
                  <span class="tool-tip tool-tip__large" data-tooltip="
                  Coverage does not require a finding of legal liability and is available to cover
                  medical expenses incurred within a specified period by a claimant for a covered injury,
                  regardless of whether the insured was at fault.">
                  Personal property limit <img src="assets/images/tooltip.svg"></span>
                </td>
                <td>$250,000</td>
                <td>$250,000</td>
                <td>$250,000</td>
              </tr>
              <tr>
                <td>
                  <span class="tool-tip tool-tip__large" data-tooltip="
                  Coverage does not require a finding of legal liability and is available to cover
                  medical expenses incurred within a specified period by a claimant for a covered injury,
                  regardless of whether the insured was at fault.">
                  Deductible <img src="assets/images/tooltip.svg"></span>
                </td>
                <td>$5,000</td>
                <td>$2,500</td>
                <td>$1,000</td>
              </tr>
              <tr><td class="coverage-label">Liability coverage</td></tr>
              <tr>
                <td>General Liability limit</td>
                <td>$500,000</td>
                <td>$1,000,000</td>
                <td>$2,000,000</td>
              </tr>
              <tr>
                <td>Medical expenses</td>
                <td>$5,000</td>
                <td>$5,000</td>
                <td>$10,000</td>
              </tr>
              <tr><td class="coverage-label">Additional coverages</td></tr>
              <tr>
                <td>Hired & Non-owned Auto</td>
                <td></td>
                <td><img src="assets/images/check_blue.svg"></td>
                <td><img src="assets/images/check_blue.svg"></td>
              </tr>
              <tr>
                <td>Spoilage</td>
                <td></td>
                <td>$50,000</td>
                <td>$50,000</td>
              </tr>
              <tr>
                <td>Cyber and Data Liability</td>
                <td></td>
                <td>$100,000</td>
                <td>$100,000</td>
              </tr>
              <tr>
                <td>Employee Practices Liability</td>
                <td></td>
                <td></td>
                <td>$100,000</td>
              </tr>
          </table>
        </div>
      </div>
    `);

    const optionContainer = html.querySelector('.pricing-page-options');

    this.components.forEach(component => {
      optionContainer.appendChild(component.render());
    });

    // this.labels.forEach(label => {
    //   types.appendChild(label.render());
    // });

    return html;
  }
}

export class StepQuestion {
  constructor(args) {
    this.id = args.id;
    this.label = args.label;
    this.explainer = args.explainer;
    this.components = args.components;
    this.style = args.style;
    this.loadTime = args.loadTime;
    this.oninit = args.oninit && args.oninit.bind(this);
  }

  render() {
    if(this.oninit) {
      this.oninit(this);
    }

    const html = toHTML(`
      <div class="load-in">
        <div class="question-heading">
          <h1>${this.label}</h1>
          <p class="explainer">${this.explainer}</p>
        </div>
        <div class="form-container"></div>
      </div>
    `);
    const parent = html.querySelector('.form-container');

    this.components.forEach(component => {
      parent.appendChild(component.render());
    });

    return html;
  }
}

export class Coverage {
  constructor(args) {
    this.id = args.id;
    this.name = args.name;
    this.limit = args.limit;
    this.icon = args.icon;
    this.description = args.description;
  }

  render() {
    const html = toHTML(`
      <div id="${this.id}" class="coverage">
        <div class="coverage-info">
          <div class="coverage-title">
            <img src="${this.icon}">
            <h3>${this.name}</h3>
          </div>
          <p>${this.description}</p>
        </div>
        <div class="coverage-limit">${this.limit}</div>
      </div>
    `);
    return html;
  }
}

export class CoverageGroup {
  constructor(args) {
    this.id = args.id;
    this.name = args.name;
    this.coverages = args.coverages;
  }

  render() {
    const html = toHTML(`
      <div id="${this.id}" class="coverage-group">
        <h5>${this.name}</h5>
      </div>
    `);

    this.coverages.forEach(coverage => {
      html.appendChild(coverage.render());
    });

    return html;
  }
}

export class CoverageOption {
  constructor(args) {
    this.id = args.id;
    this.name = args.name;
    this.price = args.price;
    this.description = args.description;
    this.actionStyle = args.actionStyle;
    this.coverages = args.coverages;
    this.flag = args.flag;
  }

  render() {
    const html = toHTML(`
      <div class="coverage-option">
        ${this.flag ? `<div class="coverage-option-flag">${this.flag}</div>` : ''}
        <div class="coverage-option-name">${this.name}</div>
        <div class="coverage-option-price">
          <div class="coverage-option-dollars">${this.price}</div>
          / mo
        </div>
        <div class="price-annual">or $${this.price*12 - 60}/year</div>
        <div class="coverage-option-description">${this.description}</div>
        <a class="button button__small ${this.actionStyle}" href="javascript:void(0)">Learn more</a>
      </div>
    `);

    html.querySelector('.button').onclick = () => {
      updateState({
        id: 'coverageOption',
        value: this.id,
      });
      stepForwards();
    };

    return html;
  }
}

export class CoverageOptions {
  constructor(args) {
    this.id = args.id;
    this.options = args.options;
  }

  render() {
    const html = toHTML(`
      <div class="coverage-container"></div>
    `);

    this.options.forEach(option => {
      html.appendChild(option.render());
    });

    return html;
  }
}

export class DetailsSummary {
  constructor(args) {
    this.id = args.id;
    this.options = args.options;
  }

  render() {
    const html = toHTML(`
      <div class="coverage-container"></div>
    `);

    this.options.forEach(option => {
      html.appendChild(option.render());
    });

    return html;
  }
}

export class HelpCard {
  constructor(args) {
    this.id = args.id;
    this.icon = args.icon;
    this.label = args.label;
    this.body = args.body;
    this.cta = args.cta;
  }

  render() {
    const html = toHTML(`
      <div class="help-card">
        <img src="${this.icon}">
        <div>
          <h4>${this.label}</h4>
          <p class="small-text">${this.body}</p>
        </div>
        <div class="button button__small button__secondary">${this.cta}</div>
      </div>
    `);

    return html;
  }
}
