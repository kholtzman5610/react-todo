import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';

const InputWithLabel = ({
  id,
  todoTitle,
  handleTitleChange,
  children,
  onKeyDown
}) => {
  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  return (
    <>
      <label htmlFor={id}>{children}</label>
      <input
        id={id}
        type="text"
        value={todoTitle}
        onChange={handleTitleChange}
        onKeyDown={onKeyDown}
        ref={inputRef}
      />
    </>
  );
};

InputWithLabel.propTypes = {
  id: PropTypes.string.isRequired,
  todoTitle: PropTypes.string.isRequired,
  handleTitleChange: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
  onKeyDown: PropTypes.func,
};

export default InputWithLabel;
