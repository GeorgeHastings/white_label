/*jshint esversion: 6 */

import {
  $,
  toHTML,
  intToMoney,
  getFormField
} from './helpers.js';

import {
  STATE,
  updateState,
  stepForwards,
} from './app.js';

export class RadioGroup {
  constructor(args) {
    this.options = args.options;
    this.id = args.id;
    this.label = args.label || null;
    this.advance = args.advance || false;
    this.form = args.form || null;
    this.style = args.style;
    this.onchange = this.onchange.bind(this);
    this.conditional = args.conditional;
  }

  onchange(index) {
    updateState({
      id: this.id,
      value: this.options[index],
      form: this.form
    });

    if(this.advance) {
      setTimeout(() => {
        stepForwards();
      }, 400);
    }

    if(this.conditional) {
      if(this.conditional.value === this.options[index]) {
        $(this.conditional.target).parentElement.classList.remove('_hidden');
      } else {
        $(this.conditional.target).parentElement.classList.add('_hidden');
      }
    }
  }

  render() {
    const html = toHTML(`
      <div class="form-field ${this.style}">
        ${this.label ? `<label>${this.label}</label>` : ''}
        <div class="radio-group">
          ${this.options.map((option, index) => {
            return `<div class="radio-button">
              <input id="${this.id}-${index}" type="radio" name="${this.id}-group">
              <label for="${this.id}-${index}">${option}</label>
            </div>`;
          }).join(' ')}
        </div>
      </div>`);

    html.querySelectorAll('input').forEach((input, index) => {
      const selected = this.form && STATE.data[this.form] ? STATE.data[this.form][this.id] : STATE.data[this.id];

      input.onchange = () => {
        this.onchange(index);
      };

      if(input.nextElementSibling.innerText === selected) {
        input.checked = true;
      } else {
        input.checked = false;
      }
    });

    return html.body.childNodes[0];
  }
}

export class StepQuestion {
  constructor(args) {
    this.id = args.id;
    this.label = args.label;
    this.explainer = args.explainer;
    this.components = args.components;
    this.fullWidth = args.fullWidth;
  }

  render() {
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

export class InputField {
  constructor(args) {
    this.type = args.type || 'text';
    this.label = args.label;
    this.id = args.id;
    this.placeholder = args.placeholder || '';
    this.style = args.style || '';
    this.form = args.form || null;
    this.onchange = this.onchange.bind(this);
    this.money = args.money;
    this.focusTip = args.focusTip;
    this.hide = args.hide;
  }

  onchange(ev) {
    updateState({
      id: this.id,
      value: ev.target.value,
      form: this.form
    });
  }

  render() {
    const entered = this.form && STATE.data[this.form] ? STATE.data[this.form][this.id] : STATE.data[this.id];
    const html = toHTML(`
      <div class="form-field ${this.style} ${this.hide ? `_hidden` : ''}">
        ${this.label ? `<label>${this.label}</label>` : ''}
        <input id="${this.id}" type="${this.type}" placeholder="${this.placeholder}">
        ${this.focusTip ? `<span class="focus-tip">${this.focusTip}</span>` : ''}
      </div>
    `);
    const input = html.querySelector('input');

    input.onchange = this.onchange;

    if(this.money) {
      input.oninput = () => {
        input.value = intToMoney(input.value);
      };
    }

    if(entered) {
      input.value = entered;
    }

    return html.body.childNodes[0];
  }
}

export class DateField {
  constructor(args) {
    this.id = args.id;
    this.label = args.label;
    this.month = args.month;
    this.day = args.day;
    this.year = args.year;
  }

  render() {
    const html = toHTML(`
      <div class="form-field date-picker-container">
        ${this.label ? `<label>${this.label}</label>` : ''}
      </div>
    `);

    const fields = [
      new InputField({
        id: 'effectiveDateMonth',
        type: 'number',
        placeholder: 'MM',
        form: 'effectiveDate'
      }),
      new InputField({
        id: 'effectiveDateDay',
        type: 'number',
        placeholder: 'DD',
        form: 'effectiveDate'
      }),
      new InputField({
        id: 'effectiveDateYear',
        type: 'number',
        placeholder: 'YYYY',
        form: 'effectiveDate'
      }),
    ];

    fields.forEach(field => {
      html.querySelector('.date-picker-container').appendChild(field.render());
    });

    return html.body.childNodes[0];
  }
}

export class AddressField {
  constructor(args) {
    this.id = args.id;
    this.label = args.label;
    this.form = args.form;
    this.hide = args.hide;
    this.style = args.style;
  }

  render() {
    const html = toHTML(`
      <div class="form-field ${this.style} ${this.hide ? '_hidden' : ''}">
        <label>${this.label}</label>
        <div class="address-fields-container" id="${this.id}"></div>
      </div>
    `);
    const parent = html.querySelector('.address-fields-container');

    const address1 = new InputField({
      type: 'text',
      id: 'businessStreetAddress',
      placeholder: 'Street address',
      form: this.form
    });

    const city = new InputField({
      type: 'text',
      id: 'businessAddressCity',
      placeholder: 'City',
      style: 'form-field__city',
      form: this.form
    });

    const state = new InputField({
      type: 'text',
      id: 'businessAddressState',
      placeholder: 'State',
      style: 'form-field__state',
      form: this.form
    });

    const zip = new InputField({
      type: 'text',
      id: 'businessAddressZip',
      placeholder: 'Zip',
      style: 'form-field__zip',
      form: this.form
    });

    [address1, city, state, zip].forEach(field => {
      parent.appendChild(field.render());
    });

    return html.body.childNodes[0];
  }
}
