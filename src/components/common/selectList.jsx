import React from "react";

function SelectList({ options, name, label, onChange, error, selected }) {
  return (
    <div className="form-group">
      <label htmlFor={name}>{label}</label>
      <select
        value={selected}
        name={name}
        id={name}
        onChange={onChange}
        className="form-control"
      >
        <option value="" />
        {options.map(option => (
          <option key={option._id} value={option._id}>
            {option.genre}
          </option>
        ))}
      </select>
      {error && <div className="alert alert-danger">{error}</div>}
    </div>
  );
}

export default SelectList;
