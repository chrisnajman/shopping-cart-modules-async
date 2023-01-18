const currency = "GBP"

const formatter = new Intl.NumberFormat(undefined, {
  style: "currency",
  currency: `${currency}`,
})

export default function formatCurrency(amount) {
  return formatter.format(amount)
}
