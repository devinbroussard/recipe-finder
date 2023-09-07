import "./Button.css";

import PropTypes from "prop-types";
import React from "react";

const Button = ({ label, onClick, type, disabled, variant }) => (
  <button
    className="button"
    data-variant={variant}
    type={type}
    onClick={onClick}
    disabled={disabled}
    aria-disabled={disabled}
  >
    {label}
  </button>
);

Button.propTypes = {
  label: PropTypes.string.isRequired,
  onClick: PropTypes.func,
  type: PropTypes.oneOf(["button", "submit", "reset"]),
  disabled: PropTypes.bool,
  variant: PropTypes.oneOf(["primary", "danger", "dark", "light", "icon"]),
};

Button.defaultProps = {
  onClick: () => {},
  type: "button",
  disabled: false,
  variant: "primary",
};

export default Button;
