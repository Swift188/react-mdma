import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const Button = ({ type = 'primary', children, href }) => {
	return (
		<Link className={`btn btn-${type}`} to={href}>
			{children}
		</Link>
	);
};

Button.propTypes = {
	type: PropTypes.string,
	children: PropTypes.any,
	href: PropTypes.string.isRequired,
};

export default Button;
