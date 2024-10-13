const convertUTCToLocalDate = (date) => {
  if (!date) {
    return date
  }
  date = new Date(date)
  date = new Date(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate())
  return date
}

const convertLocalToUTCDate = (date) => {
  if (!date) {
    return date
  }
  date = new Date(date)
  date = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()))
  return date
}

