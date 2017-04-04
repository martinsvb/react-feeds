import { messages, rules } from './index';

export class Validator {

  constructor(lang, own = {rules: null, messages: null}) {
    this.rules = own.rules || rules;
    this.messages = own.messages ? own.messages[lang] : messages[lang];
  }

  validate(validation) {
    
    for (let key in validation) {
      if (!Object.keys(this.rules).includes(key)) {
        continue;
      }

      let params = validation[key] || [];

      if (!this.rules[key](...params)) {
        let message = this.messages[key];

        if (['minLength', 'maxLength', 'pair'].includes(key)) {
          message = message.replace('%', params[0]);
        }

        return message;
      }
    };

    return null;
  }

  formValid(rules) {
      
      let valid = true;

      for (let name in rules) {
        if (this.validate(rules[name])) {
          valid = false;
          break;
        }
      }

      return valid;
  }
}
