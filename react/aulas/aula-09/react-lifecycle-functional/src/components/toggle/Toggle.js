import React, { Component } from 'react';

export default function Toogle(props) {
  const { onToggle, enabled } = props;

  const handleChange = (event) => {
    const isChecked = event.target.checked;
    onToggle(isChecked);
  };

  return (
    <div className="switch">
      <label>
        Mostrar usuários:
        <input type="checkbox" checked={enabled} onChange={handleChange} />
        <span className="lever"></span>
      </label>
    </div>
  );
}
