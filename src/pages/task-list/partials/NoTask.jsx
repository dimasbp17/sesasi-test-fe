import React from 'react';
import no_task from '../../../../public/assets/images/no-task.png';

const NoTask = () => {
  return (
    <>
      <div className="flex flex-col items-center justify-center">
        <img
          src={no_task}
          alt="No Task Available"
          className="w-[200px]"
        />
        <h1 className="font-semibold text-gray-400 text-lg">
          No Task Available
        </h1>
      </div>
    </>
  );
};

export default NoTask;
