import { Card } from '@mui/material';
import React from 'react';

const About = () => {
  return (
    <>
      <Card className="p-5 my-5 bg-white font-poppins">
        <h1 className="mb-3 text-3xl font-bold text-biru">About ProjecTask</h1>
        <p>
          <strong>ProjecTask</strong> is a website that has a function to manage
          projects and tasks. Users can add projects by filling out a form by
          entering the project name and project description. Users can also add
          tasks to each project that has been created. And there is a status bag
          that can be dynamically changed according to its status. Overall, this
          application organizes projects and tasks optimally, effectively and
          efficiently.
        </p>
        <h1 className="my-3 text-3xl font-bold text-biru">Excess</h1>
        <div>
          <ol class="pl-5 list-decimal">
            <li class="mb-2 pl-3">
              The application allows users to manage projects by saving project
              names and descriptions, providing a clear overview of project
              goals and details.
            </li>
            <li class="mb-2 pl-3">
              Users can add tasks to each project, allowing for more detailed
              organization of work within each project.
            </li>
            <li class="mb-2 pl-3">
              The status of each task can be changed dynamically, providing the
              flexibility to reflect real-time work progress.
            </li>
            <li class="mb-2 pl-3">
              With the ability to save projects, tasks, and status, this
              application helps users manage projects and tasks more
              efficiently.
            </li>
          </ol>
        </div>
      </Card>
    </>
  );
};

export default About;
