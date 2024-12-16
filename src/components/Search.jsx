import React from 'react';
import { IoSearch } from 'react-icons/io5';

const Search = ({ placeholder = 'Search...', value, onChange }) => {
  return (
    <div className="relative flex items-center">
      <div className="absolute text-gray-500 left-2">
        <IoSearch />
      </div>
      <input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-40 py-2 text-sm border border-gray-300 rounded-md px-7 font-poppins lg:w-60 focus:outline-none"
      />
    </div>
  );
};

export default Search;
