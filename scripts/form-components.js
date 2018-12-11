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

import {
  STATES,
} from './constants.js';

class Input {
  constructor(args) {
    this.id = args.id;
    this.label = args.label || null;
    this.form = args.form || null;
    this.style = args.style;
    this.conditional = args.conditional;
    this.hide = args.hide;
    this.show = args.show;
    this.onchange = this.onchange && this.onchange.bind(this);
  }

  oninit() {
    if(this.show) {
      this.hide = true;

      if(this.show()) {
        this.hide = false;
      }
    }
  }

  render() {
    this.oninit();
    return this.template();
  }
}

export class Checkbox extends Input {
  constructor(args) {
    super(args);
  }

  template() {
    const html = toHTML(`
      <div class="form-field form-field__checkbox ${this.style} ${this.hide ? `_hidden` : ''}">
        <label>
          <input id="${this.id}" type="checkbox">
          ${this.label}
        </label>
      </div>
    `);

    const input = html.querySelector('input');
    const selected = getStatePropValue(this.id);

    if(input.parentElement.innerText === selected) {
      input.checked = true;
    } else {
      input.checked = false;
    }

    return html;
  }
}

export class RadioGroup extends Input {
  constructor(args) {
    super(args);
    this.options = args.options;
    this.advance = args.advance || false;
    this.default = args.default;
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
  }

  template() {
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

      if(input.nextElementSibling.innerText === selected || index === this.default) {
        input.checked = true;
      } else {
        input.checked = false;
      }
    });

    return html;
  }
}

export class Select extends Input {
  constructor(args) {
    super(args);
    this.options = args.options;
    this.placeholder = args.placeholder || 'Choose one';
  }

  onchange(ev) {
    updateState({
      id: this.id,
      value: ev.target.value,
      form: this.form
    });
  }

  template() {
    const entered = this.form && getStatePropValue(this.id);
    const html = toHTML(`
      <div class="form-field ${this.style} ${this.hide ? `_hidden` : ''}">
        ${this.label ? `<label>${this.label}</label>` : ''}
        <div class="select-container">
          <select id="${this.id}" required>
            <option disabled selected value="">${this.placeholder}</option>
            ${Object.keys(this.options).map((option, index) => {
              return `<option value="${option}">${this.options[option]}</option>`;
            }).join(' ')}
          </select>
        </div>
      </div>`);

    const input = html.querySelector('select');

    input.onchange = this.onchange;

    if(entered) {
      input.value = entered;
    }

    return html;
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

  template() {
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

    return html;
  }
}

export class DateField extends Input {
  constructor(args) {
    super(args);
  }

  template() {
    const html = toHTML(`
      <div class="form-field date-picker-container">
        ${this.label ? `<label>${this.label}</label>` : ''}
        <div class="date-field-wrapper"></div>
      </div>
    `);

    const fields = [
      new InputField({
        id: 'effectiveDateMonth',
        type: 'number',
        placeholder: 'MM',
        form: 'effectiveDate',
      }),
      new InputField({
        id: 'effectiveDateDay',
        type: 'number',
        placeholder: 'DD',
        form: 'effectiveDate',
      }),
      new InputField({
        id: 'effectiveDateYear',
        type: 'number',
        placeholder: 'YYYY',
        form: 'effectiveDate',
      }),
    ];

    fields.forEach(field => {
      html.querySelector('.date-field-wrapper').appendChild(field.render());
    });

    return html;
  }
}

export class AddressField extends Input {
  constructor(args) {
    super(args);
  }

  template() {
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
      new Select({
        options: STATES,
        id: 'businessAddressState',
        style: 'form-field__state',
        placeholder: 'State',
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

    return html;
  }
}
