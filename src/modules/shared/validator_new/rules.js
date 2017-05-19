export const rules = {

  /**
   *  String min length check
   *  
   *  @param {number} minLength
   *  @param {string} value
   * 
   *  @return {boolean}
   */
  minLength: (minLength, value) => {

    if (!minLength || !value) {
      throw new Error('Validation rules minLength: Both parameters are required.');
    }
    minLength = Number(minLength);
    rules._typeofCheck('minLength', {minLength}, 'number');
    rules._typeofCheck('minLength', {value}, 'string');

    return value.length >= minLength;
  },

  /**
   *  String max length check
   *  
   *  @param {number} maxLength
   *  @param {string} value
   * 
   *  @return {boolean}
   */
  maxLength: (maxLength, value) => {

    if (!maxLength || !value) {
      throw new Error('Validation rules maxLength: Both parameters are required.');
    }
    maxLength = Number(maxLength);
    rules._typeofCheck('maxLength', {maxLength}, 'number');
    rules._typeofCheck('maxLength', {value}, 'string');
    
    return value.length <= maxLength;
  },

  /**
   *  String email regex check
   * 
   *  @param {string} email
   * 
   *  @return {boolean}
   */
  email: (email) => {
    
    if (!email) {
      throw new Error('Validation rules email: Parameter email is required.');
    }
    rules._typeofCheck('email', {email}, 'string');

    return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email);
  },

  /**
   *  String email simple regex check
   * 
   *  @param {string} email
   * 
   *  @return {boolean}
   */
  emailSimple: (email) => {
    
    if (!email) {
      throw new Error('Validation rules emailSimple: Parameter email is required.');
    }
    rules._typeofCheck('emailSimple', {email}, 'string');

    return /(\w)+@[A-Za-z]+\.[A-Za-z]{2,}/.test(email);
  },

  /**
   *  Values equality compare
   * 
   *  @param {string} secName name of pair input
   *  @param {any} value checked value
   *  @param {any} secValue pair value for check
   * 
   *  @return {boolean}
   */
  equal: (secName, value, secValue) => {
    
    if (!secName) {
      throw new Error('Validation rules equal: Parameter secName is required.');
    }
    rules._typeofCheck('equal', {secName}, 'string');

    return value && secValue ? value === secValue : true;
  },

  /**
   *  Value is greater than secValue compare
   * 
   *  @param {string} secName name of pair input
   *  @param {any} value checked value
   *  @param {any} secValue pair value for check
   * 
   *  @return {boolean}
   */
  greater: (secName, value, secValue) => {
    
    if (!secName) {
      throw new Error('Validation rules greater: Parameter secName is required.');
    }
    rules._typeofCheck('greater', {secName}, 'string');

    return value && secValue ? value > secValue : true;
  },

  /**
   *  Value is lower than secValue compare
   * 
   *  @param {string} secName name of pair input
   *  @param {any} value checked value
   *  @param {any} secValue pair value for check
   * 
   *  @return {boolean}
   */
  lower: (secName, value, secValue) => {
    
    if (!secName) {
      throw new Error('Validation rules lower: Parameter secName is required.');
    }
    rules._typeofCheck('lower', {secName}, 'string');

    return value && secValue ? value < secValue : true;
  },

  /**
   *  Value contains something check
   * 
   *  @param {string|number} value
   * 
   *  @return {boolean}
   */
  required: (value) => {
    
    let result = true;

    result = typeof value === 'string'
      ? value.trim() ? true : false
      : value ? true : false;
    
    return result;
  },

  /**
   *  Value contains something check
   * 
   *  @param {regex} reg
   *  @param {boolean} neg return negated result
   *  @param {string|number} value
   * 
   *  @return {boolean}
   */
  regex: (reg, neg = false, value) => {
    
    if (!reg || !value) {
      throw new Error('Validation rules regex: reg and value parameters are required.');
    }
    rules._typeofCheck('regex', {value}, 'string');
    
    return neg ? !reg.test(value) : reg.test(value);
  },

  /**
   * Value type check
   * 
   * @param {string} method
   * @param {object} checkObj
   * @param {string} type
   */
  _typeofCheck(method, checkObj, type) {
    for (const name of Object.keys(checkObj)) {
      if (type === 'number' && !/^\d+$/.test(checkObj[name])) {
        throw new Error(`Validation rules ${method}: parameter ${name} must be a number. Inserted: ${JSON.stringify(checkObj[name])}`);
      }
      else if (typeof checkObj[name] !== type) {
        throw new Error(`Validation rules ${method}: parameter ${name} must be a ${type}. Inserted: ${JSON.stringify(checkObj[name])}`);
      }
    }
  }
}
