import { messages, rules } from './index';

export class Validator {

  constructor(validation, lang, own = {rules: null, messages: null}) {
    this.validation = validation;
    this.rules = own.rules || rules;
    this.messages = own.messages ? own.messages[lang] : messages[lang];
  }

  validate() {
    
    let availRules = Object.keys(this.rules);

    for (let key in this.validation) {
      if (!availRules.includes(key)) {
        continue;
      }

      let params = this.validation[key] || [];

      if (!this.rules[key](...params)) {
        let message = this.messages[key];

        if (['minLength', 'maxLength'].includes(key)) {
          message = message.replace('%', params[0]);
        }

        return message;
      }
    };

    return null;
  }
}
