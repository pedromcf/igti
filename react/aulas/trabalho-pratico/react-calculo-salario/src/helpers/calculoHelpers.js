import { formatDecimal } from './formatHelpers.js';

function calculoInss(value) {
  let totalCalculo = 0;
  if (value > 6101.06) {
    totalCalculo = 713.1;
  } else {
    const descontos = [
      { min: 0, max: 1045, aliquota: 0.075 },
      { min: 1045.01, max: 2089.6, aliquota: 0.09 },
      { min: 2089.61, max: 3134.4, aliquota: 0.12 },
      { min: 3134.41, max: 6101.06, aliquota: 0.14 },
    ];

    const faixas = descontos.filter((desconto) => {
      return (
        desconto.max < value || (desconto.min < value && desconto.max > value)
      );
    });
    faixas.forEach((faixa) => {
      let calculo = 0;
      if (value > faixa.max) {
        calculo = (faixa.max - faixa.min) * faixa.aliquota;
      } else {
        calculo = (value - faixa.min) * faixa.aliquota;
      }

      totalCalculo += calculo;
    });
  }
  return totalCalculo;
}

function calculoIRPF(value) {
  const descontos = [
    { min: 0, max: 1903.98, aliquota: 0.0, dedutivel: 0 },
    { min: 1903.99, max: 2826.65, aliquota: 0.075, dedutivel: 142.8 },
    { min: 2826.66, max: 3751.05, aliquota: 0.15, dedutivel: 354.8 },
    { min: 3751.06, max: 4664.68, aliquota: 0.225, dedutivel: 636.13 },
    { min: 4664.69, max: 1000000000, aliquota: 0.275, dedutivel: 869.36 },
  ];
  const faixa = descontos.find((desconto) => {
    return value > desconto.min && value < desconto.max;
  });

  // prettier-ignore
  return value === 0? 0 : (value * faixa.aliquota) - faixa.dedutivel;
}

function calculoPorcentagem(salario, desconto) {
  return (desconto / salario) * 100;
}

export { calculoInss, calculoIRPF, calculoPorcentagem };
