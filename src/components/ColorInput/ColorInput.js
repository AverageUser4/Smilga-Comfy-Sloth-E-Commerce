import React from 'react';
import PropTypes from 'prop-types';
import css from './ColorInput.module.css';
import { ReactComponent as Checkmark } from '../../assets/checkmark.svg';

function ColorInput({ name, value, currentValue, handleChange, size = 16 }) {
  const isChecked = value === currentValue;
  const labelStyles = { minWidth: size, height: size };

  return (
    <label className="hidden-radio-label" style={labelStyles}>
      <input 
        className="hidden-radio"
        type="radio"
        name={name}
        value={value}
        checked={isChecked}
        onChange={handleChange}
      />
      {
        value ?
          <span  
            className={`${css['color']} ${isChecked ? css['color--active'] : ''}`}
            style={{ backgroundColor: value }}>{isChecked && <Checkmark/>}</span>
        :
          <span className={`text-button ${isChecked ? 'text-button--active' : ''}`}>All</span>
      }
    </label>
  );
}

ColorInput.propTypes = {
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  currentValue: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired,
  size: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  defaultChecked: PropTypes.bool
};

export default ColorInput;