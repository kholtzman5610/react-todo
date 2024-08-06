import React, { useEffect, useRef } from 'react';

const InputWithLabel = (props) => {
  const { id, value, onInputChange, children } = props;
  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  return (
    <>
      <label htmlFor={id}>{children}</label>
      <input
        ref={inputRef}
        id={id}
        type="text"
        value={value}
        onChange={onInputChange}
      />
    </>
  );
};

export default InputWithLabel;
