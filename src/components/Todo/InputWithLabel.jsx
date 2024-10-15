import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';

const InputWithLabel = ({
  id,
  todoTitle,
  handleTitleChange,
  handleKeyDown,
  children,
}) => {
  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  return (
    <>
      <label htmlFor={id}>{children}</label>
      <textarea
        id={id}
        value={todoTitle}
        onChange={handleTitleChange}
        onKeyDown={handleKeyDown}
        ref={inputRef}
        rows="3"
      />
    </>
  );
};

InputWithLabel.propTypes = {
  id: PropTypes.string.isRequired,
  todoTitle: PropTypes.string.isRequired,
  handleTitleChange: PropTypes.func.isRequired,
  handleKeyDown: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
};

export default InputWithLabel;
