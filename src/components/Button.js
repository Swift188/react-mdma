import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const Button = ({ href = '', type = 'primary', children, onClick }) => {
	return href != '' ? (
		<Link className={`btn btn-${type}`} to={href}>
			{children}
		</Link>
	) : (
		<button className={`btn btn-${type}`} onClick={onClick}>
			{children}
		</button>
	);
};

Button.propTypes = {
	href: PropTypes.string,
	type: PropTypes.string,
	children: PropTypes.any,
	onClick: PropTypes.func,
};

export default Button;
