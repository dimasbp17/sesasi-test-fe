import { Card, Chip, Menu, MenuItem } from '@mui/material';
import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { BsThreeDots } from 'react-icons/bs';
import { FaCheck } from 'react-icons/fa';
import { FaPenRuler, FaRegHourglassHalf } from 'react-icons/fa6';

const CardTask = ({ id, title, status, updateStatus }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleStatusChange = async (newStatus) => {
    try {
      await updateStatus(id, newStatus);
      setAnchorEl(null);
      toast.success(`Update status to ${newStatus} success`);
    } catch (error) {
      console.error('Failed to update task status:', error);
    }
  };

  const handleToDoClick = () => handleStatusChange('To Do');
  const handleInProgressClick = () => handleStatusChange('In Progress');
  const handleCompletedClick = () => handleStatusChange('Completed');

  const statusStyle = (status) => {
    switch (status) {
      case 'To Do':
        return (
          <div className="p-2 text-white bg-yellow-500 rounded-full">
            <FaPenRuler />
          </div>
        );
      case 'In Progress':
        return (
          <div className="p-2 text-white bg-blue-500 rounded-full">
            <FaRegHourglassHalf />
          </div>
        );
      case 'Completed':
        return (
          <div className="p-2 text-white bg-green-500 rounded-full">
            <FaCheck />
          </div>
        );
      default:
        return 'bg-gray-100 text-gray-500';
    }
  };

  const chipStyles = (status) => {
    switch (status) {
      case 'To Do':
        return '!bg-yellow-100 !text-yellow-500';
      case 'In Progress':
        return '!bg-blue-100 !text-blue-500';
      case 'Completed':
        return '!bg-green-100 !text-green-500';
      default:
        return 'bg-gray-100 text-gray-500';
    }
  };

  return (
    <>
      <Card className="font-poppins w-full bg-gradient-to-r p-3 duration-300 !rounded-lg">
        <div className="flex items-center justify-between">
          <div className="text-xs">{statusStyle(status)}</div>
          <Chip
            label={status}
            className={`!text-xs !py-1 ${chipStyles(status)}`}
          />
        </div>
        <hr className="mt-3 border border-oren" />
        <h3 className="my-3 rounded-sm rounded-b-none">{title}</h3>
        <div className="flex items-center justify-end gap-2">
          <button
            id="basic-button"
            aria-controls={open ? 'basic-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
            onClick={handleClick}
          >
            <BsThreeDots size={20} />
          </button>
          <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
              'aria-labelledby': 'basic-button',
            }}
          >
            <MenuItem
              className="!text-gray-600 flex gap-2 !text-sm"
              onClick={handleToDoClick}
            >
              <FaPenRuler className="text-yellow-500" /> To Do
            </MenuItem>
            <MenuItem
              className="!text-gray-600 flex gap-2 !text-sm"
              onClick={handleInProgressClick}
            >
              <FaRegHourglassHalf className="text-blue-500" />
              In Progress
            </MenuItem>
            <MenuItem
              className="!text-gray-600 flex gap-2 !text-sm"
              onClick={handleCompletedClick}
            >
              <FaCheck className="text-green-500" /> Completed
            </MenuItem>
          </Menu>
        </div>
      </Card>
    </>
  );
};

export default CardTask;
