import { messages, rules } from './index';

export class Validator {

  constructor(target, rules) {
    this.target = target;
    this.rules = rules;

    this.classes = {valid: 'valid', invalid: 'invalid'};
  }

  validate() {
    
    let availRules = Object.keys(rules);

    for (let rule in this.rules) {
      if (!availRules.includes(rule)) {
        continue;
      }

      let params = this.rules[rule] || [];

      if (!rules[rule](...params)) {
        this.setInvalid();
        return messages.en[rule];
      }
    };

    this.setValid();

    return null;
  }

  setValid() {
    if (!this.target.classList.contains(this.classes.valid)) {
      this.target.classList.add(this.classes.valid);
    }
    if (this.target.classList.contains(this.classes.invalid)) {
      this.target.classList.remove(this.classes.invalid);
    }
  }

  setInvalid() {
    if (!this.target.classList.contains(this.classes.invalid)) {
      this.target.classList.add(this.classes.invalid);
    }
    if (this.target.classList.contains(this.classes.valid)) {
      this.target.classList.remove(this.classes.valid);
    }
  }
}
