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

    return html.body.childNodes[0];
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

    return html.body.childNodes[0];
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
    const parent = html.querySelector('.navigation');

    this.items.forEach((item, index) => {
      let state;
      if(this.index === index) {
        state = 'nav-item__active';
      } else if (index < this.index) {
        state = 'nav-item__complete';
      }
      parent.appendChild(new NavigationItem(item, state).render());
    });

    return html.body.childNodes[0];
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

    html.querySelector('.button').onclick = this.handleClick;

    return html.body.childNodes[0];
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

    return html.body.childNodes[0];
  }
}

export class CoverageOption {
  constructor(args) {
    this.id = args.id;
    this.name = args.name;
    this.price = args.price;
    this.actionStyle = args.actionStyle;
    this.coverages = args.coverages;
  }

  render() {
    const html = toHTML(`
      <div class="coverage-option">
        <div class="coverage-name">${this.name}</div>
        <div class="coverage-price">
          <div class="coverage-dollars">${this.price}</div>
          / month
        </div>
        <div class="price-annual">or $${this.price*12 - 60}/year</div>
        <a class="button button__small ${this.actionStyle}" href="javascript:void(0)">Learn more</a>
        <div class="coverage-limits">
          ${this.coverages.map(coverage => {
            return `
              <div class="coverage">
                <div class="coverage-label">${coverage.name}</div>
                <div class="coverage-limit">${coverage.limit}</div>
              </div>
            `;
          }).join(' ')}
        </div>
      </div>
    `);

    html.querySelector('.button').onclick = () => {
      updateState({
        id: 'coverageOption',
        value: this.id,
      });
      stepForwards();
    };

    return html.body.childNodes[0];
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
      html.querySelector('.coverage-container').appendChild(option.render());
    });

    return html.body.childNodes[0];
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
      html.querySelector('.coverage-container').appendChild(option.render());
    });

    return html.body.childNodes[0];
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
          <h3>${this.label}</h3>
          <p class="small-text">${this.body}</p>
        </div>
        <div class="button button__small button__secondary">${this.cta}</div>
      </div>
    `);

    return html.body.childNodes[0];
  }
}
