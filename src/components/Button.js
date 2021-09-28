import React from 'react';
import PropTypes from 'prop-types';

const Button = ({ type = 'primary', children, onClick }) => {
	return (
		<button className={`btn btn-${type}`} onClick={onClick}>
			{children}
		</button>
	);
};

Button.propTypes = {
	type: PropTypes.string,
	children: PropTypes.any,
	onClick: PropTypes.func,
};

export default Button;
