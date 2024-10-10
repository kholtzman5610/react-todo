import React from 'react';
import PropTypes from 'prop-types';

const Navigation = ({ children }) => {
  return <nav className='navbar'>{React.Children.toArray(children)}</nav>;
};

Navigation.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Navigation;
