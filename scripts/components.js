/*jshint esversion: 6 */

import {
  toHTML,
} from './helpers.js';

import {
  updateState,
  stepForwards,
} from './app.js';

export class RadioGroup {
  constructor(options, id) {
    this.options = options;
    this.id = id;
    this.onchange = this.onchange.bind(this);
  }

  onchange(index) {
    updateState(this.id, this.options[index]);
    setTimeout(() => {
      stepForwards();
    }, 400);
  }

  render() {
    const html = toHTML(`
      <div class="radio-group">
        ${this.options.map((option, index) => {
          return `<div class="radio-button">
            <input id="${this.id}-${index}" type="radio" name="${this.id}-group">
            <label for="${this.id}-${index}">${option}</label>
          </div>`;
        }).join(' ')}
      </div>`);

    html.querySelectorAll('input').forEach((input, index) => {
      input.onchange = () => {
        this.onchange(index);
      };
    });

    return html.body.childNodes[0];
  }
}

export class RadioQuestion {
  constructor(args) {
    this.label = args.label;
    this.explainer = args.explainer;
    this.options = args.options;
    this.id = args.id;
  }

  render() {
    const radioOptions = new RadioGroup(this.options, this.id);
    const html = toHTML(`
      <div class="load-in">
        <div class="question-heading">
          <h1>${this.label}</h1>
          <p class="explainer">${this.explainer}</p>
        </div>
        <div class="form-container"></div>
      </div>
    `);

    html.querySelector('.form-container').appendChild(radioOptions.render());

    return html.body.childNodes[0];
  }
}
