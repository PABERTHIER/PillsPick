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
  quantity: number
  instructions: string
  pictureId: number
}
