import moment from 'moment'

export const removeNonNumber = (string = '') => string.replace(/[^\d]/g, '')
export const removeLeadingSpaces = (string = '') => string.replace(/^\s+/g, '')

export function getMessageError (response) {
  if (response) {
    if (response.data && response.data.message) {
      return response.data.message
    } else {
      return 'unknownError'
    }
  } else {
    return 'unknownError'
  }
}

export function getResponseError (response) {
  if (response) {
    if (response.data && response.data.errors) {
      return response.data.errors
    } else {
      return []
    }
  } else {
    return []
  }
}

export function getDataResponse (response) {
  if (response && response.data) {
    return response.data.data
  } else {
    return null
  }
}

export function getAge (dateString) {
  var birthDay = moment(dateString).format('YYYY/MM/DD')
  var today = new Date()
  var birthDate = new Date(birthDay)
  var age = today.getFullYear() - birthDate.getFullYear()
  var m = today.getMonth() - birthDate.getMonth()
  if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
    age--
  }
  return age
}

export function yearsRevenue (startYear) {
  var currentYear = new Date().getFullYear()
  var years = []
  startYear = startYear || 2018

  while (startYear <= currentYear) {
    years.push(startYear++)
  }

  return years
}
