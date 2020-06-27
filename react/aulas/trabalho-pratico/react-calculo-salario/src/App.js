import React, { Component } from 'react';
import Header from './components/header/Header';
import Descontos from './components/descontos/Descontos';
import Salario from './components/salario/Salario';
import {
  calculoInss,
  calculoIRPF,
  calculoPorcentagem,
} from './helpers/calculoHelpers.js';
import Bars from './components/bars/Bars';

export default class App extends Component {
  constructor() {
    super();

    this.state = {
      salario: '',
      salarioBaseInss: '',
      descontoInss: '',
      percDescInss: '',
      salarioBaseIRPF: '',
      descontoIRPF: '',
      percDescIRPF: '',
      salarioLiquido: '',
      percSalarioLiquido: '',
    };
  }

  handleChangeSalario = (newText) => {
    this.setState({
      salario: newText,
    });

    //calculo descontos INSS
    const descontoInss = calculoInss(newText);
    const percDescInss = calculoPorcentagem(newText, descontoInss);

    const salarioBaseIRPF = newText - descontoInss;
    const descontoIRPF = calculoIRPF(salarioBaseIRPF);
    const percDescIRPF = calculoPorcentagem(salarioBaseIRPF, descontoIRPF);

    const salarioLiquido = newText - descontoInss - descontoIRPF;
    const percSalarioLiquido = calculoPorcentagem(newText, salarioLiquido);
    this.setState({
      salarioBaseInss: newText,
      descontoInss,
      percDescInss,
      salarioBaseIRPF,
      descontoIRPF,
      percDescIRPF,
      salarioLiquido,
      percSalarioLiquido,
    });
  };

  render() {
    const {
      salario,
      salarioBaseInss,
      descontoInss,
      percDescInss,
      salarioBaseIRPF,
      descontoIRPF,
      percDescIRPF,
      salarioLiquido,
      percSalarioLiquido,
    } = this.state;

    return (
      <div>
        <div>
          <h1>Calculo de Salário</h1>
          <Header
            salario={salario}
            onChangeSalario={this.handleChangeSalario}
          />
          <Descontos
            salarioBaseInss={salarioBaseInss}
            descontoInss={descontoInss}
            percDescInss={percDescInss}
            salarioBaseIRPF={salarioBaseIRPF}
            descontoIRPF={descontoIRPF}
            percDescIRPF={percDescIRPF}
          />
          <Salario value={salarioLiquido} perc={percSalarioLiquido} />
        </div>
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Bars value={percDescInss} color="#e67e22" />
          <Bars value={percDescIRPF} color="#c0392b" />
          <Bars value={percSalarioLiquido} color="#16a085" />
        </div>
      </div>
    );
  }
}
