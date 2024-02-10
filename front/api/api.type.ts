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
  price?: number
  quantity?: number
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

export enum IStatusOrder {
  Canceled = 0,
  Pending = 1,
  InProgress = 2,
  Done = 3,
  Collected = 4,
}

export interface IOrderData {
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
  quantity: number
  price: number
}
export interface IOrders {
  idOrder: number
  status: IStatusOrder
  drugStoreName: string
  orderData: IOrderData[]
}
