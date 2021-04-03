export interface RestOperationResult {
  success: boolean
  code?: number
  isValid?: boolean
  errors?: { message: string; property: string; value?: string }[]
  data?: any
}
