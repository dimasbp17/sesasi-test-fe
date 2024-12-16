import React, { useState } from 'react';
import { IoIosEye, IoIosEyeOff } from 'react-icons/io';

const Input = ({
  label,
  type = 'text',
  name,
  placeholder,
  value,
  onChange,
  required = false,
  isTextarea = false,
  rows = 4,
  error = false,
}) => {
  const [showPassword, setShowPassword] = useState(false);

  const handleTogglePassword = () => {
    setShowPassword((prev) => !prev);
  };

  const inputType = type === 'password' && showPassword ? 'text' : type;

  return (
    <div className="w-full mb-4 font-poppins">
      {label && (
        <label
          htmlFor={name}
          className="block mb-1 text-sm font-medium text-gray-800"
        >
          {label}
        </label>
      )}
      <div className="relative">
        {isTextarea ? (
          <textarea
            id={name}
            name={name}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            required={required}
            rows={rows}
            className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-gray-500"
          ></textarea>
        ) : (
          <>
            <input
              type={inputType}
              id={name}
              name={name}
              placeholder={placeholder}
              value={value}
              onChange={onChange}
              required={required}
              className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-gray-500"
            />
            {type === 'password' && (
              <button
                type="button"
                onClick={handleTogglePassword}
                className="absolute inset-y-0 flex items-center text-gray-800 right-3"
              >
                {showPassword ? (
                  <IoIosEye size={20} />
                ) : (
                  <IoIosEyeOff size={20} />
                )}
              </button>
            )}
          </>
        )}
      </div>
      {error && <p className="text-xs text-red-500">{error}</p>}
    </div>
  );
};

export default Input;
