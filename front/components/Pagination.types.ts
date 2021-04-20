export interface D {
  pages: any[]
}

export interface M {
  setPages: () => void
  paginate: (data: any[]) => any[]
  goToPrevious: () => void
  goToSelected: (pageNumber: number) => void
  goToNext: () => void
}

export interface C {
  displayedData: any[]
}

export interface P {
  data: any[]
  page: number
  perPage: number
}
