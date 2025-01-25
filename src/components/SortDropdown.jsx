import React from 'react';
import { Select, MenuItem } from '@mui/material';

const SortDropdown = ({ sortOption, onSortChange }) => {
  return (
    <div className="flex items-center gap-2">
      <Select
        value={sortOption}
        onChange={(e) => onSortChange(e.target.value)}
        className="!w-full !font-poppins !text-sm !h-10 lg:!w-60 !bg-white !text-gray-600 !rounded-md"
      >
        <MenuItem
          value="Newest"
          className="!text-sm"
        >
          Newest
        </MenuItem>
        <MenuItem
          value="Oldest"
          className="!text-sm"
        >
          Oldest
        </MenuItem>
        <MenuItem
          value="Name A-Z"
          className="!text-sm"
        >
          Name A-Z
        </MenuItem>
        <MenuItem
          value="Name Z-A"
          className="!text-sm"
        >
          Name Z-A
        </MenuItem>
      </Select>
    </div>
  );
};

export default SortDropdown;
