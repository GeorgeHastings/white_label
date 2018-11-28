/*jshint esversion: 6 */

import {
  $,
  toHTML,
  intToMoney,
  getFormField
} from './helpers.js';

import {
  getStatePropValue,
  updateState,
  stepForwards,
} from './app.js';

class Input {
  constructor(args) {
    this.id = args.id;
    this.label = args.label || null;
    this.form = args.form || null;
    this.style = args.style;
    this.conditional = args.conditional;
    this.hide = args.hide;
    this.onchange = this.onchange && this.onchange.bind(this);
  }

  oninit() {

  }
}

export class RadioGroup extends Input {
  constructor(args) {
    super(args);
    this.options = args.options;
    this.advance = args.advance || false;
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
      <div class="form-field ${this.style} ${this.hide ? `_hidden` : ''}">
        ${this.label ? `<label>${this.label}</label>` : ''}
        <div class="radio-group" id="${this.id}">
          ${this.options.map((option, index) => {
            return `<div class="radio-button">
              <input id="${this.id}-${index}" type="radio" name="${this.id}-group">
              <label for="${this.id}-${index}">${option}</label>
            </div>`;
          }).join(' ')}
        </div>
      </div>`);

    html.querySelectorAll('input').forEach((input, index) => {
      const selected = getStatePropValue(this.id);

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

export class InputField extends Input {
  constructor(args) {
    super(args);
    this.type = args.type || 'text';
    this.placeholder = args.placeholder || '';
    this.money = args.money;
    this.focusTip = args.focusTip;
  }

  onchange(ev) {
    updateState({
      id: this.id,
      value: ev.target.value,
      form: this.form
    });
  }

  render() {
    const entered = this.form && getStatePropValue(this.id);
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

export class DateField extends Input {
  constructor(args) {
    super(args);
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

export class AddressField extends Input {
  constructor(args) {
    super(args);
  }

  render() {
    const html = toHTML(`
      <div class="form-field ${this.style} ${this.hide ? '_hidden' : ''}">
        <label>${this.label}</label>
        <div class="address-fields-container" id="${this.id}"></div>
      </div>
    `);
    const parent = html.querySelector('.address-fields-container');

    const fields = [
      new InputField({
        type: 'text',
        id: 'businessStreetAddress',
        placeholder: 'Street address',
        form: this.form
      }),
      new InputField({
        type: 'text',
        id: 'businessAddressCity',
        placeholder: 'City',
        style: 'form-field__city',
        form: this.form
      }),
      new InputField({
        type: 'text',
        id: 'businessAddressState',
        placeholder: 'State',
        style: 'form-field__state',
        form: this.form
      }),
      new InputField({
        type: 'text',
        id: 'businessAddressZip',
        placeholder: 'Zip',
        style: 'form-field__zip',
        form: this.form
      })
    ];

    fields.forEach(field => {
      parent.appendChild(field.render());
    });

    return html.body.childNodes[0];
  }
}
