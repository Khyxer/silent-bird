import React from "react";

export const UIInputBase = ({
  id,
  type,
  placeholder,
  value,
  onChange,
  loading = false,
}) => {
  return (
    <input
      className="border border-gray-color select-none focus:border-light-color duration-200 rounded-full w-full py-3 px-5 outline-none  disabled:opacity-70 disabled:pointer-events-none"
      id={id}
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      autoComplete="off"
      disabled={loading}
    />
  );
};
