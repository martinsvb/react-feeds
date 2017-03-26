import { messages, rules } from './index';

export class Validator {

  constructor(validation, own = {rules: null, messages: null}) {
    this.validation = validation;
    this.rules = own.rules || rules;
    this.messages = own.messages || messages;
  }

  validate() {
    
    let availRules = Object.keys(this.rules);

    for (let key in this.validation) {
      if (!availRules.includes(key)) {
        continue;
      }

      let params = this.validation[key] || [];
      let result = this.rules[key](...params);
console.log(params);
console.log(key, result);
      if (!result) {
        let message = this.messages.en[key];
console.log("m: ", message);
        if (['minLength', 'maxLength'].includes(key)) {
          message = message.replace('%', params[0]);
        }

        return message;
      }
    };

    return null;
  }
}
