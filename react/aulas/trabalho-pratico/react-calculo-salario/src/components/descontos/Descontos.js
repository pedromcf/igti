import React, { Component } from 'react';
import Desconto from './Desconto';
import css from './descontos.module.css';

export default class Descontos extends Component {
  render() {
    const {
      salarioBaseInss,
      descontoInss,
      percDescInss,
      salarioBaseIRPF,
      descontoIRPF,
      percDescIRPF,
    } = this.props;

    return (
      <div className={css.flexRow}>
        <Desconto value={salarioBaseInss} label="Base Inss" />
        <Desconto
          value={descontoInss}
          percentual={percDescInss}
          label="Desconto Inss"
        />
        <Desconto value={salarioBaseIRPF} label="Base IRPF" />
        <Desconto
          value={descontoIRPF}
          percentual={percDescIRPF}
          label="Desconto IRPF"
        />
      </div>
    );
  }
}
