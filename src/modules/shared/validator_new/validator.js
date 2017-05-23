import { messages, rules } from './index';

export class Validator {

  constructor(lang, valRules, own = {rules: null, messages: null}) {
    this.valRules = valRules;
    this.rules = own.rules || rules;
    this.messages = own.messages ? own.messages[lang] : messages[lang];
  }

  setModel(model) {
    this.model = model;
  }

  validate(validation, value) {
    
    const specialRules = ['equal', 'greater', 'lower', 'greaterEqual', 'lowerEqual'];

    for (let rule of validation) {
      let ruleArr = rule.split(':');
      rule = ruleArr[0];
      if (Object.keys(this.rules).includes(rule)) {
        let params = ruleArr[1] ? ruleArr[1].split(',') : [];
        params.push(value);

        if (specialRules.includes(rule)) {
          params.push(this.model[params[0]]);
        }

        try {
          if (!this.rules[rule](...params)) {
            let message = this.messages[rule];

            if (['minLength', 'maxLength', ...specialRules].includes(rule)) {
              message = message.replace('%', params[0]);
            }

            return message;
          }
        }
        catch (e) {
          console.error(e);
        }
      }
    };

    return null;
  }

  itemValid(name) {
    return this.validate(this.valRules[name], this.model[name]);
  }

  formValid(valNames) {
      let valid = true;

      for (let name in this.valRules) {
        if (valNames && !valNames.includes(name)) {
          continue;
        }
        if (this.validate(this.valRules[name], this.model[name])) {
          valid = false;
          break;
        }
      }

      return valid;
  }
}

export const valueExists = (value) => value || value === 0 || value === false;
