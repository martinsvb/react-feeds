export const rules = {

  minLength: (minLength, value) => value.length >= minLength,

  maxLength: (maxLength, value) => value.length <= maxLength,

  email: (value) => /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(value),

  emailSimple: (value) => /(\w)+@[A-Za-z]+\.[A-Za-z]{2,}/.test(value),

  pair: (name, secName, value, model) => value === model[secName],

  required: (value) => value ? true : false,

  regex: (r, neg = false, value) => neg ? !r.test(value) : r.test(value)
}
