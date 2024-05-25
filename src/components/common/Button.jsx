import React from 'react'
import PropTypes from 'prop-types'

import './Button.css'

const Button = React.forwardRef(({ children, className = '', onClick, ...props }, ref) => {
  return (
    <button className={`custom-button ${className}`}  {...props} ref={ref}  onClick={onClick}>
        {children}
    </button>
  )
})

Button.displayName = 'CustomButton'

Button.propTypes = {
  className: PropTypes?.string,
  children: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.node,
  ]),
  onClick: PropTypes.func
}

export default Button