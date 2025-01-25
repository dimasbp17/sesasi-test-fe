import { Card, IconButton, Tooltip } from '@mui/material';
import React from 'react';
import toast from 'react-hot-toast';
import { FaCheck } from 'react-icons/fa';
import { FaPenRuler, FaRegHourglassHalf } from 'react-icons/fa6';
import { FormattedDate } from '../FormattedDate';

const CardTask = ({ id, title, status, updateStatus, create }) => {
  const handleStatusChange = async (newStatus) => {
    try {
      await updateStatus(id, newStatus);
      toast.success(`Update status to ${newStatus} success`);
    } catch (error) {
      console.error('Failed to update task status:', error);
    }
  };

  const handleToDoClick = () => handleStatusChange('To Do');
  const handleInProgressClick = () => handleStatusChange('In Progress');
  const handleCompletedClick = () => handleStatusChange('Completed');

  const statusStyles = (status) => {
    switch (status) {
      case 'To Do':
        return '!bg-yellow-400 !text-white';
      case 'In Progress':
        return '!bg-blue-500 !text-white';
      case 'Completed':
        return '!bg-green-500 !text-white';
      default:
        return 'bg-gray-100 text-gray-500';
    }
  };

  return (
    <Card className="font-poppins w-full p-3 !rounded-xl">
      <h3 className="flex items-center gap-2 text-sm font-medium text-gray-700 rounded-sm rounded-b-none">
        <div className={`rounded-full size-3 ${statusStyles(status)}`}></div>
        {title}
      </h3>
      <hr className="mt-3 mb-2 border border-gray-300" />
      <div className="flex items-center justify-between gap-2">
        <div className="text-[9px] text-gray-400">
          <FormattedDate date={create} />
        </div>
        <div className="flex items-center gap-1.5">
          {status !== 'To Do' && (
            <Tooltip title="To Do">
              <IconButton
                size="small"
                className="!bg-yellow-500"
                onClick={handleToDoClick}
              >
                <FaPenRuler
                  size={9}
                  className="text-white"
                />
              </IconButton>
            </Tooltip>
          )}
          {status !== 'In Progress' && (
            <Tooltip title="In Progress">
              <IconButton
                size="small"
                className="!bg-blue-500"
                onClick={handleInProgressClick}
              >
                <FaRegHourglassHalf
                  size={9}
                  className="text-white"
                />
              </IconButton>
            </Tooltip>
          )}
          {status !== 'Completed' && (
            <Tooltip title="Completed">
              <IconButton
                size="small"
                className="!bg-green-500"
                onClick={handleCompletedClick}
              >
                <FaCheck
                  size={9}
                  className="text-white"
                />
              </IconButton>
            </Tooltip>
          )}
        </div>
      </div>
    </Card>
  );
};

export default CardTask;
