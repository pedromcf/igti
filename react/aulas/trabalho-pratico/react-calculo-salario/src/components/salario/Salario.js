import React, { Component } from 'react';
import css from './salario-module.css';
import { formatMonetario, formatNumber } from '../../helpers/formatHelpers';

export default class Salario extends Component {
  render() {
    const { value, perc } = this.props;

    const salario = perc
      ? `${formatMonetario(value)} (${formatNumber(perc)}%)`
      : formatMonetario(value);
    return (
      <div className={css.border}>
        <label htmlFor="salario-liquido">Salário Líquido</label>
        <input type="text" value={salario} disabled />
      </div>
    );
  }
}
