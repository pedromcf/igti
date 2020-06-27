import React, { Component } from 'react';
import css from './user.module.css';

export default function User({ user }) {
  const { login, name, picture } = user;
  return (
    <div className={css.flexRow}>
      <img
        className={css.avatar}
        src={picture.large}
        alt={name.first}
        srcset=""
      />
      <span>{name.first}</span>
    </div>
  );
}
