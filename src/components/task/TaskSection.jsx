import { Card } from '@mui/material';
import React from 'react';
import CardTask from '../card/CardTask';

const TaskSection = ({ title, color, tasks, onUpdate, icon }) => {
  return (
    <>
      <Card className="!bg-[#E0E4EA] !rounded-lg">
        <div
          className={`w-full p-3 rounded-lg text-lg font-bold flex items-center gap-2 text-white ${color}`}
        >
          {icon}
          {title}
        </div>

        <div className="px-3 py-5 space-y-3">
          {tasks.length > 0 ? (
            tasks.map((task) => (
              <CardTask
                key={task.id}
                id={task.id}
                title={task.name}
                status={task.status}
                create={task.created_at}
                updateStatus={onUpdate}
              />
            ))
          ) : (
            <p className="text-sm text-center text-gray-500">
              No tasks available.
            </p>
          )}
        </div>
      </Card>
    </>
  );
};

export default TaskSection;
