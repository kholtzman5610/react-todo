import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const NavLink = ({ text, url }) => {
  return <Link to={url}>{text}</Link>;
};

NavLink.propTypes = {
  text: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
};

export default NavLink;
