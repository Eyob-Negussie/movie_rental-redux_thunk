import React from "react";

const Input = ({ name, label, value, type, onChange, error }) => {
  return (
    <div className="form-group">
      <label htmlFor="name">{label}</label>
      <input
        className="form-control"
        type={type}
        id={name + "-123"}
        name={name}
        value={value}
        onChange={onChange}
      />
      {error && <div className="alert alert-danger">{error}</div>}
    </div>
  );
};

export default Input;
