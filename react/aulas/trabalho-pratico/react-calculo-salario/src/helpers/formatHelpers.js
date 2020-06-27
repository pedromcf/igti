const formatterMonetario = Intl.NumberFormat('pt-BR', {
  style: 'currency',
  currency: 'BRL',
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});
function formatMonetario(value) {
  return formatterMonetario.format(value);
}

const formatter = Intl.NumberFormat('pt-BR', {
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});
function formatNumber(value) {
  return formatter.format(value);
}

export { formatMonetario, formatNumber };
