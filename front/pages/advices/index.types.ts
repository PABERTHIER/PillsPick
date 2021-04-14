import { IDrugs } from '~/api/api.type'

export interface D {
  drugs: IDrugs[]
}

export interface M {
  loadDrugs: () => void
}

export interface C {}

export interface P {}
