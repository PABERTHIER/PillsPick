import { IDrugState } from './type'
import { IDrugs } from '~/api/api.type'

export const mutations = {
  setAdvices(state: IDrugState, payload: IDrugs[]) {
    state.advices = payload
  },
  setCosmeticProducts(state: IDrugState, payload: IDrugs[]) {
    state.cosmeticProducts = payload
  },
  setDressings(state: IDrugState, payload: IDrugs[]) {
    state.dressings = payload
  },
  setHealthProducts(state: IDrugState, payload: IDrugs[]) {
    state.healthProducts = payload
  },
  setMotherhood(state: IDrugState, payload: IDrugs[]) {
    state.motherhood = payload
  },
  setNaturalCare(state: IDrugState, payload: IDrugs[]) {
    state.naturalCare = payload
  },
  setNutrition(state: IDrugState, payload: IDrugs[]) {
    state.nutrition = payload
  },
  setOptical(state: IDrugState, payload: IDrugs[]) {
    state.optical = payload
  },
  setOrthopedic(state: IDrugState, payload: IDrugs[]) {
    state.orthopedic = payload
  },
  setPills(state: IDrugState, payload: IDrugs[]) {
    state.pills = payload
  },
  addToCart(state: IDrugState, payload: IDrugs) {
    state.cart.push(payload)
  },
  removeToCart(state: IDrugState, payload: number) {
    state.cart = state.cart.filter((x) => x.id !== payload)
  },
  commitClearCart(state: IDrugState) {
    state.cart = []
  },
}

export default mutations
