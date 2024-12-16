import { Card } from '@mui/material';
import React from 'react';

const About = () => {
  return (
    <>
      <Card className="p-5 my-5 bg-white font-poppins">
        <p>
          ProjecTask is a website that has a function to manage projects and
          tasks. Users can add projects by filling out a form by entering the
          project name and project description. Users can also add tasks to each
          project that has been created. And there is a status bag that can be
          dynamically changed according to its status. Overall, this application
          organizes projects and tasks optimally, effectively and efficiently.
        </p>
      </Card>
    </>
  );
};

export default About;
