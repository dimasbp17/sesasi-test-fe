import { Button, Card } from '@mui/material';
import React from 'react';
import { FaProjectDiagram } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { FormattedDate } from '../FormattedDate';

const CardProject = ({ title, description, create, link }) => {
  return (
    <>
      <Card className="font-poppins w-full bg-white p-3 !rounded-xl">
        <div className="flex items-center -mx-3 -mt-3 rounded-xl bg-gradient-to-r from-biru via-blue-500 to-blue-300 ">
          <div className="p-1 ml-3 text-white rounded-full bg-oren">
            <FaProjectDiagram size={10} />
          </div>
          <h1 className="p-2 text-lg font-semibold text-white rounded-sm rounded-b-none">
            {title}
          </h1>
        </div>
        <h3 className="mt-3 text-sm text-justify">{description}</h3>

        <div className="flex items-end justify-between mt-5">
          <h6 className="text-[10px] text-gray-400">
            <FormattedDate date={create} />
          </h6>
          <Link to={link}>
            <Button
              variant="contained"
              className="!capitalize !bg-oren !text-white !font-poppins"
              aria-label="Lihat tugas untuk proyek"
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
