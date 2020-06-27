import React, { Component } from 'react';
import Countries from './components/countries/Countries';
import Header from './components/header/Header';

export default class App extends Component {
  constructor() {
    super();

    this.state = {
      allCountries: [],
      filteredCountries: [],
      totalPopulation: 0,
      filter: '',
    };
  }

  async componentDidMount() {
    const res = await fetch('https://restcountries.eu/rest/v2/all');

    const data = await res.json();

    const allCountries = data.map(
      ({ translations, numericCode, flag, population }) => {
        return {
          id: numericCode,
          name: translations.pt,
          filterName: translations.pt.toLowerCase(),
          flag,
          population,
        };
      }
    );

    const totalPopulation = this.calculateTotalPopulation(allCountries);

    this.setState({
      allCountries,
      filteredCountries: Object.assign([], allCountries),
      totalPopulation,
    });
  }

  calculateTotalPopulation = (countries) => {
    const totalPopulation = countries.reduce((accumulator, current) => {
      return accumulator + current.population;
    }, 0);

    return totalPopulation;
  };
  handleChangeFilter = (newText) => {
    this.setState({
      filter: newText,
    });

    const filterLowerCase = newText.toLowerCase();

    const filteredCountries = this.state.allCountries.filter((country) => {
      return country.filterName.includes(filterLowerCase);
    });
    const totalPopulation = this.calculateTotalPopulation(filteredCountries);
    this.setState({
      filteredCountries,
      totalPopulation,
    });
  };
  render() {
    const {
      allCountries,
      filter,
      filteredCountries,
      totalPopulation,
    } = this.state;
    return (
      <div className="container">
        <h1 style={styles.centeredTitle}>React Countries</h1>
        <Header
          filter={filter}
          onChangeFilter={this.handleChangeFilter}
          countryCount={filteredCountries.length}
          totalPopulation={totalPopulation}
        />

        <Countries countries={filteredCountries} />
      </div>
    );
  }
}

const styles = {
  centeredTitle: {
    textAlign: 'center',
  },
};
