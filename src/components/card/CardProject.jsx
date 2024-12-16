import { Button, Card } from '@mui/material';
import React from 'react';
import { FaProjectDiagram } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const CardProject = ({ title, description, create, link }) => {
  return (
    <>
      <Card className="font-poppins w-full bg-white p-3 !rounded-lg">
        <div className="flex items-center -mx-3 -mt-3 bg-biru">
          <div className="p-1 ml-3 text-white rounded-sm bg-oren">
            <FaProjectDiagram />
          </div>
          <h1 className="p-3 text-xl font-semibold text-white rounded-sm rounded-b-none ">
            {title}
          </h1>
        </div>

        <h3 className="mt-3 text-sm text-justify">{description}</h3>
        <div className="flex items-end justify-between mt-5">
          <h6 className="text-xs text-gray-400">Create at: {create}</h6>
          <Link to={link}>
            <Button
              variant="contained !capitalize !bg-oren !text-white !font-poppins"
              size="small"
            >
              See Task
            </Button>
          </Link>
        </div>
      </Card>
    </>
  );
};

export default CardProject;
