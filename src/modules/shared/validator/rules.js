export const rules = {

  minLength: (minLength, value) => value.length >= minLength,

  maxLength: (maxLength, value) => value.length <= maxLength,

  email: (email) => /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email),

  required: (value) => value ? true : false,

  regex: (r, value) => !r.test(value)
}