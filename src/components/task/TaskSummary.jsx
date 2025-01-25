import { Card } from '@mui/material';
import React from 'react';

const TaskSummary = ({
  totalTasks,
  totalToDo,
  totalInProgress,
  totalCompleted,
  completedPercentage,
}) => {
  return (
    <>
      <Card className="p-4 font-poppins !rounded-lg !text-gray-700">
        <h1 className="mb-2 text-base font-bold text-biru">Task Information</h1>
        <div className="grid grid-cols-12 ">
          <div className="space-y-1 col-span-full md:col-span-4">
            <h3 className="flex justify-between font-semibold">
              Total Task: <span className="font-normal">{totalTasks} task</span>
            </h3>
            <h3 className="flex justify-between font-semibold">
              To Do: <span className="font-normal">{totalToDo} task</span>
            </h3>
            <h3 className="flex justify-between font-semibold">
              In Progress:
              <span className="font-normal">{totalInProgress} task</span>
            </h3>
          </div>
          <div className="md:col-span-2"></div>
          <div className="col-span-full md:col-span-6">
            <h3 className="mb-2 font-semibold">
              Completed:
              <span className="ml-2 font-normal">{totalCompleted} task</span>
            </h3>
            <div className="relative w-full h-2.5 bg-gray-300 rounded-lg">
              <div
                className="absolute h-2.5 bg-green-500 rounded-lg"
                style={{ width: `${completedPercentage}%` }}
              ></div>
            </div>
            <p className="mt-1 text-xs text-gray-600">
              {Math.round(completedPercentage)}% Completed
            </p>
          </div>
        </div>
      </Card>
    </>
  );
};

export default TaskSummary;
