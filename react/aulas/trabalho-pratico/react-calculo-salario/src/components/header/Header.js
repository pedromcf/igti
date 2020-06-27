import React, { Component } from 'react';

export default class Header extends Component {
  handleInputChange = (event) => {
    const newText = event.target.value;
    this.props.onChangeSalario(newText);
  };
  render() {
    const { salario } = this.props;
    return (
      <div>
        <label>Salário Bruto</label>
        <input
          placeholder="Informe seu Salario"
          type="number"
          value={salario}
          onChange={this.handleInputChange}
        />
      </div>
    );
  }
}
