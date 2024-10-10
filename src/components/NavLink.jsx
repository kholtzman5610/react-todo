import React from 'react';
import PropTypes from 'prop-types';

const NavLink = ({ text, url }) => {
  return <a href={url}>{text}</a>;
};

NavLink.propTypes = {
  text: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
};

export default NavLink;
