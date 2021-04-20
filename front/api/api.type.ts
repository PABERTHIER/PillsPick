export interface RestOperationResult {
  success: boolean
  code?: number
  isValid?: boolean
  errors?: { message: string; property: string; value?: string }[]
  data?: any
}

export interface IDrugs {
  id: number
  name: string
  type: string
  instructions: string
  pictureId: number
  cisCode: number
  routeAdministration: string
  owner: string
  isWatched: boolean
  headerName: string
}

export interface IDrugStores {
  id: number
  url: string
  name: string
  holdersName: string
  address: string
  departement: string
  area: string
  zipCode: string
  city: string
}

export interface IUser {
  id: number
  name: string
  lastName: string
  birthDate: string
  address: string
  zipCode: string
  city: string
  ssNumber: number
  mail: string
  phoneNumber: string
  type: string
}

export interface IChemist {
  id: number
  name: string
  lastName: string
  birthDate: string
  address: string
  zipCode: string
  city: string
  idNumber: number
  drugStoreId: number
  mail: string
  phoneNumber: string
  type: string
}
