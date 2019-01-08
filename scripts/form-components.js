/*jshint esversion: 6 */

import {
  $,
  toHTML,
  intToMoney,
  getFormField,
  getEligibilityGuidelines
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
    this.default =  args.default;
    this.onchange = this.onchange && this.onchange.bind(this);
  }

  oninit() {
    if(this.show) {
      this.hide = true;
      this.style = 'load-up';

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
          <div class="checkbox-label">${this.label}</div>
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
        updateState({
          id: this.id,
          value: this.options[index],
          form: this.form
        });
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

    if(this.default) {
      input.value = this.default;
      updateState({
        id: this.id,
        value: this.default,
        form: this.form
      });
    }

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

    if(this.default) {
      input.value = this.default;
      updateState({
        id: this.id,
        value: this.default,
        form: this.form
      });
    }

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
        default: this.default && this.default.street,
        form: this.form
      }),
      new InputField({
        type: 'text',
        id: 'businessAddressCity',
        placeholder: 'City',
        style: 'form-field__city',
        default: this.default && this.default.city,
        form: this.form
      }),
      new Select({
        options: STATES,
        id: 'businessAddressState',
        style: 'form-field__state',
        placeholder: 'State',
        default: this.default && this.default.state,
        form: this.form
      }),
      new InputField({
        type: 'text',
        id: 'businessAddressZip',
        placeholder: 'Zip',
        style: 'form-field__zip',
        default: this.default && this.default.zip,
        form: this.form
      })
    ];

    fields.forEach(field => {
      parent.appendChild(field.render());
    });

    return html;
  }
}

export class AskKodiakSearch extends Input {
  constructor(args) {
    super(args);
    this.resultsLimit = args.resultsLimit;
  }

  /* jshint ignore:start */
  async search(string) {
    const URL = `https://api.askkodiak.com/v1/suggest/naics-codes/${string}`;
    if(string.length > 2) {
      let resp = await fetch(URL, {
          method: 'GET',
          mode: 'cors',
          headers: {
              'Content-Type': 'application/json',
              'Authorization': 'Basic LUwxU01MYzFkS2Y0UE9fcGU4dGs6NDFmNmEwMmNmMmEwNjBhM2Y0ZDFjNGUzYmJkMTkzYjc5MjUxYzhhMjBhODY2ZmFl'
          }
      })
      .then(response => response.json())
      .catch(error => console.error(`Fetch Error =\n`, error));
      return resp;
    } else if (string.length === 0) {
      return false;
    }
  }
  /* jshint ignore:end */

  /* jshint ignore:start */
  async getGuidelines(code) {
    const URL = `https://api.askkodiak.com/v1/product/-LVK2cvze1l9iNRoz875?naicsCodes=${code}&mergeConditionalContent=true`;
    let resp = await fetch(URL, {
        method: 'GET',
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Basic LUwxU01MYzFkS2Y0UE9fcGU4dGs6NDFmNmEwMmNmMmEwNjBhM2Y0ZDFjNGUzYmJkMTkzYjc5MjUxYzhhMjBhODY2ZmFl'
        }
    })
    .then(response => response.json())
    .catch(error => console.error(`Fetch Error =\n`, error));
    return resp;
  }
  /* jshint ignore:end */

  template() {
    const html = toHTML(`
      <div class="form-field ${this.style} ${this.hide ? `_hidden` : ''}">
        <input id="${this.id}" type="text" placeholder="Search business types e.g. “Florist”">
        <div id="searchResults" class="auto-suggest-results"></div>
      </div>
    `);
    const input = html.querySelector('input');
    const results = html.querySelector('.auto-suggest-results');
    const select = ev => {
      const value = ev.target.innerText;
      const code = ev.target.getAttribute('data-code');
      this.getGuidelines(code).then(hashresp => {
        const guidelines = hashresp.conditionalContent.naics.codes[code].include.guidelines;
        $(this.id).value = value;
        results.innerHTML = '';
        updateState({
          id: this.id,
          value: value
        });
        updateState({
          id: 'classGuidelines',
          value: guidelines
        });
      });

    };

    input.oninput = (ev) => {
      this.search(ev.target.value).then(hits => {
        results.innerHTML = '';
        if(hits && hits.hits.length > 0) {
          for(let i = 0; i < hits.hits.length; i++) {
            const hit = toHTML(`<li data-code="${hits.hits[i].hash}">${hits.hits[i]._highlightResult.description.value}</li>`);
            hit.onclick = select;
            results.appendChild(hit);
          }
        } else if(hits && hits.hits.length === 0) {
          results.innerHTML = `<li class="gray-text">No results for that term</li>`;
        } else {
          results.innerHTML = '';
        }
      });
    };

    return html;
  }
}
