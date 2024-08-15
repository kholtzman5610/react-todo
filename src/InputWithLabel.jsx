import React, { useEffect, useRef } from 'react';

const InputWithLabel = ({
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
      <label htmlFor="todoTitle">{children}</label>
      <input
        id="todoTitle"
        type="text"
        value={todoTitle}
        onChange={handleTitleChange}
        ref={inputRef}
      />
    </div>
  );
};

export default InputWithLabel;
