import CITIES from '../fixtures/cities'
import STATES from '../fixtures/states'
import _ from 'lodash'

export function cities () {
  const data = _.map(CITIES, (city) => {
    return {
      name: city.name,
      label: city.name_with_type,
      value: city.code
    }
  })
  return _.sortBy(data, city => city.name)
}

export function states (code) {
  if (code) {
    const data = _.map(STATES, (state) => {
      return {
        name: state.name,
        label: state.name_with_type,
        value: state.code,
        parentCode: state.parent_code
      }
    })
    const filterData = _.filter(data, value => value.parentCode === code)
    return _.sortBy(filterData, state => state.name)
  } else {
    return []
  }
}
