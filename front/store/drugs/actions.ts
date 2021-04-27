import { Context } from '@nuxt/types'
import drugsClient from '~/api/drugsClient'
import { IDrugs } from '~/api/api.type'

export const actions = {
  async dispatchDrugs(this: Context, { commit }) {
    const drugs = await drugsClient(this.$axios).getDrugs()
    const advices = drugs.filter((x) => x.headerName === 'prescription')
    const cosmeticProducts = drugs.filter(
      (x) => x.headerName === 'cosmetic_beauty'
    )
    const dressings = drugs.filter((x) => x.headerName === 'pad')
    const healthProducts = drugs.filter((x) => x.headerName === 'heal')
    const motherhood = drugs.filter((x) => x.headerName === 'maternity')
    const naturalCare = drugs.filter((x) => x.headerName === 'natural_care')
    const nutrition = drugs.filter((x) => x.headerName === 'dietetic')
    const optical = drugs.filter((x) => x.headerName === 'optical')
    const orthopedic = drugs.filter((x) => x.headerName === 'orthopedic')
    const pills = drugs.filter((x) => x.headerName === 'drug')
    commit('setAdvices', advices)
    commit('setCosmeticProducts', cosmeticProducts)
    commit('setDressings', dressings)
    commit('setHealthProducts', healthProducts)
    commit('setMotherhood', motherhood)
    commit('setNaturalCare', naturalCare)
    commit('setNutrition', nutrition)
    commit('setOptical', optical)
    commit('setOrthopedic', orthopedic)
    commit('setPills', pills)
  },
  async dispatchAdvices(this: Context, { commit }) {
    const advices = await drugsClient(this.$axios).getDrugsByHeaderName(
      'prescription'
    )
    commit('setAdvices', advices)
  },
  async dispatchCosmeticProducts(this: Context, { commit }) {
    const cosmeticProducts = await drugsClient(
      this.$axios
    ).getDrugsByHeaderName('cosmetic_beauty')
    commit('setCosmeticProducts', cosmeticProducts)
  },
  async dispatchDressings(this: Context, { commit }) {
    const dressings = await drugsClient(this.$axios).getDrugsByHeaderName('pad')
    commit('setDressings', dressings)
  },
  async dispatchHealthProducts(this: Context, { commit }) {
    const healthProducts = await drugsClient(this.$axios).getDrugsByHeaderName(
      'heal'
    )
    commit('setHealthProducts', healthProducts)
  },
  async dispatchMotherhood(this: Context, { commit }) {
    const motherhood = await drugsClient(this.$axios).getDrugsByHeaderName(
      'maternity'
    )
    commit('setMotherhood', motherhood)
  },
  async dispatchNaturalCare(this: Context, { commit }) {
    const naturalCare = await drugsClient(this.$axios).getDrugsByHeaderName(
      'natural_care'
    )
    commit('setNaturalCare', naturalCare)
  },
  async dispatchNutrition(this: Context, { commit }) {
    const nutrition = await drugsClient(this.$axios).getDrugsByHeaderName(
      'dietetic'
    )
    commit('setNutrition', nutrition)
  },
  async dispatchOptical(this: Context, { commit }) {
    const optical = await drugsClient(this.$axios).getDrugsByHeaderName(
      'optical'
    )
    commit('setOptical', optical)
  },
  async dispatchOrthopedic(this: Context, { commit }) {
    const orthopedic = await drugsClient(this.$axios).getDrugsByHeaderName(
      'orthopedic'
    )
    commit('setOrthopedic', orthopedic)
  },
  async dispatchPills(this: Context, { commit }) {
    const pills = await drugsClient(this.$axios).getDrugsByHeaderName('drug')
    commit('setPills', pills)
  },
  addDrugToCart(this: Context, { commit }, drug: IDrugs) {
    commit('addToCart', drug)
  },
  removeDrugToCart(this: Context, { commit }, drugId: number) {
    commit('removeToCart', drugId)
  },
  clearCart(this: Context, { commit }) {
    commit('commitClearCart')
  },
}

export default actions
