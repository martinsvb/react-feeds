import { messages, rules } from './index';

export class Validator {

  constructor(lang, valRules, model, own = {rules: null, messages: null}) {
    this.valRules = valRules;
    this.model = model;
    this.rules = own.rules || rules;
    this.messages = own.messages ? own.messages[lang] : messages[lang];
  }

  validate(validation, value) {
    
    for (let rule of validation) {
      let ruleArr = rule.split(':');
      rule = ruleArr[0];
      if (!Object.keys(this.rules).includes(rule)) {
        continue;
      }
      
      let params = ruleArr[1] ? ruleArr[1].split(',') : [];
      params.push(value);

      if (['pair'].includes(rule)) {
        params.push(this.model);
      }

      if (!this.rules[rule](...params)) {
        let message = this.messages[rule];

        if (['minLength', 'maxLength', 'pair'].includes(rule)) {
          message = message.replace('%', params[0]);
        }

        return message;
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
