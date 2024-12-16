import React from 'react';
import no_project from '../../../../public/assets/images/no-project.png';

const NoProject = () => {
  return (
    <>
      <div className="flex flex-col items-center justify-center">
        <img
          src={no_project}
          alt="No Project Available"
          className="w-[200px]"
        />
        <h1 className="text-lg font-semibold text-gray-400">
          No Project Available
        </h1>
      </div>
    </>
  );
};

export default NoProject;
