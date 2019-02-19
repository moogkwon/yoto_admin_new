import CITIES from '../fixtures/cities'
import STATES from '../fixtures/states'
import sortBy from 'lodash/sortBy'
import map from 'lodash/map'
import filter from 'lodash/filter'

export function cities () {
  const data = map(CITIES, (city) => {
    return {
      name: city.name,
      label: city.name_with_type,
      value: city.code
    }
  })
  return sortBy(data, city => city.name)
}

export function states (code) {
  if (code) {
    const data = map(STATES, (state) => {
      return {
        name: state.name,
        label: state.name_with_type,
        value: state.code,
        parentCode: state.parent_code
      }
    })
    const filterData = filter(data, value => value.parentCode === code)
    return sortBy(filterData, state => state.name)
  } else {
    return []
  }
}
