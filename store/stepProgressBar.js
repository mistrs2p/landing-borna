export const state = () => ({
  steps: [
    { label: 'وضعیت جسمانی' },
    { label: 'گزارش جسمانی' },
    { label: 'هدف از رژیم' },
    { label: 'گزارش آماری' },
    { label: 'دریافت رژیم' }
  ],
  components: ['Information', 'PhysicalReport', 'Goal', 'StatisticalReport', 'GetDiet'],
  information: {
    mobile: null,
    firstName: null,
    lastName: null,
    height: null,
    weight: null,
    age: null,
    wrist: null,
    gender: null,
    bmi: null
  },
  componentName: 'Information',
  toggleStepActive: 0,
  componentIndex: 0
})

export const mutations = {
  changeToggle (state, newToggle) {
    state.toggleStepActive = newToggle
  },
  setComponentName (state, name) {
    state.componentName = name
    state.componentIndex = state.components.indexOf(name)
    state.toggleStepActive = state.componentIndex
  },
  setComponentIndex (state, index) {
    state.componentName = state.components[index]
    state.componentIndex = state.components.indexOf(state.componentName)
    state.toggleStepActive = index
  },
  submitInformation (state, information) {
    state.information.mobile = information.mobile
    state.information.height = information.height
    state.information.weight = information.weight
    state.information.age = information.age
    state.information.gender = information.gender
    state.information.wrist = information.wrist
    state.information.bmi = information.bmi
  },
  updateMobile (state, number) {
    state.information.mobile = number
  },
  submitName (state, information) {
    state.information.firstName = information.firstName.trim()
    state.information.lastName = information.lastName.trim()
  },
  bmiCalculate (state) {
    const heightInMeter = state.information.height / 100
    const squaredHeight = Math.pow(heightInMeter, 2)
    state.information.bmi = state.information.weight / squaredHeight
  }
}

export const actions = {
  changeToggle ({ commit }, newToggle) {
    commit('changeToggle', newToggle)
  },
  setComponentName ({ commit }, name) {
    commit('setComponentName', name)
  },
  setComponentIndex ({ commit }, index) {
    commit('setComponentIndex', index)
  },
  submitInformation ({ commit }, information) {
    commit('submitInformation', information)
  },
  updateMobile ({ commit }, number) {
    commit('updateMobile', number)
  },
  submitName ({ commit }, information) {
    commit('submitName', information)
  },
  bmiCalculate ({ commit }) {
    commit('bmiCalculate')
  }
}

export const getters = {
  toggleStepActive (state) {
    return state.toggleStepActive
  },
  steps (state) {
    return state.steps
  },
  componentName (state) {
    return state.componentName
  },
  componentIndex (state) {
    return state.componentIndex
  },
  submitInformation (state) {
    return state.information
  }
}
