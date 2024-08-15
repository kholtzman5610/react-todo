import React, { useEffect, useRef } from 'react';

const InputWithLabel = ({
  id,
  todoTitle,
  handleTitleChange,
  children,
}) => {
  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  return (
    <div>
      <label htmlFor={id}>{children}</label>
      <input
        id={id}
        type="text"
        value={todoTitle}
        onChange={handleTitleChange}
        ref={inputRef}
      />
    </div>
  );
};

export default InputWithLabel;
