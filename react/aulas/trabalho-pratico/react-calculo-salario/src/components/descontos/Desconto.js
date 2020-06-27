import React, { Component } from 'react';
import css from './descontos.module.css';
import { formatMonetario, formatNumber } from '../../helpers/formatHelpers';

export default class Desconto extends Component {
  render() {
    const { value, label, percentual } = this.props;

    const desconto = percentual
      ? `${formatMonetario(value)} (${formatNumber(percentual)}%)`
      : formatMonetario(value);
    return (
      <div className={css.border}>
        <label htmlFor="salario-base">{label}</label>
        <input className={css.input} type="text" value={desconto} disabled />
      </div>
    );
  }
}
