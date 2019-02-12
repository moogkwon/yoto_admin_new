export function required (val) {
  var str

  if (val === undefined || val === null) {
    return false
  }

  str = String(val).replace(/\s/g, '')
  return str.length > 0
}

export function validateEmail (email) {
  var re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  return re.test(email)
}

export function validateName (name) {
  var re = /^([^\s\d.,+_=`!@#$%^&*(){}[\]\\'":;<>/?~\s])([^\d.,+_=`!@#$%^&*(){}[\]\\'":;<>/?~])*$/
  return re.test(name)
}

export function validatePhone (phone) {
  var re = /^(84|0)\d{9,10}$/
  return re.test(phone)
}
