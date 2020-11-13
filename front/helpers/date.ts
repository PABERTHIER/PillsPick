import moment from 'moment'

export function formatDate(value: any): string {
  if (value === 0) {
    return '--/--/--'
  }
  return moment.unix(value).format('DD/MM/YYYY')
}

export function getCurrentDate(): string {
  return moment().format('DD/MM/YYYY')
}
