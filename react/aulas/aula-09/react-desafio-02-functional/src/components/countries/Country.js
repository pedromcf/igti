import React, { Component } from 'react';
import css from './countries.module.css';
export default function Country({ country }) {
  const { name, flag } = country;
  return (
    <div className={`${css.border} ${css.country}`}>
      <img className={css.flag} src={flag} alt={name} />
      <span className={css.countryName}>{name}</span>
    </div>
  );
}
