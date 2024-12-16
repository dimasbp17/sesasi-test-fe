import { Button, Card, Pagination } from '@mui/material';
import React, { lazy, useEffect, useState } from 'react';
import { FaProjectDiagram } from 'react-icons/fa';
import { FormattedDate } from '../../components/FormattedDate';
import LoadingPage from '../../components/LoadingPage';
import Search from '../../components/Search';
import useDebounce from '../../hook/useDebounce';
import { createProject, getProject } from '../../services/project';
import NoProject from './partials/NoProject';
import toast from 'react-hot-toast';
const CardProject = lazy(() => import('../../components/card/CardProject'));
const ModalAddProject = lazy(() =>
  import('../../components/modal/ModalAddProject')
);

const Dashboard = () => {
  const [openModal, setOpenModal] = useState(false);
  const [listProject, setListProject] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const debouncedSearchQuery = useDebounce(searchQuery, 300);
  const itemsPerPage = 6;

  useEffect(() => {
    const fetchProject = async () => {
      setLoading(true);
      try {
        const projects = await getProject();
        const sortedProjects = projects.sort(
          (a, b) => new Date(b.created_at) - new Date(a.created_at)
        );
        setListProject(sortedProjects);
      } catch (error) {
        console.error('Failed to fetch projects:', error);
        toast.error('Failed to get list project. Please try again.');
      } finally {
        setLoading(false);
      }
    };
    fetchProject();
  }, []);

  const handleAddProject = async (newProject) => {
    try {
      const createdProject = await createProject(newProject);
      if (createdProject) {
        setListProject((prevProjects) => [createdProject, ...prevProjects]);
      }
    } catch (error) {
      console.error('Failed to create project:', error);
      toast.error('Failed to create project. Please try again.');
    }
  };

  const toggleModal = () => {
    setOpenModal((prev) => !prev);
  };

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  const filteredProjects = listProject.filter((project) =>
    project.name.toLowerCase().includes(debouncedSearchQuery.toLowerCase())
  );

  const paginatedProjects = filteredProjects.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <>
      <section>
        <Card className="flex items-center justify-between p-4 my-4 font-poppins">
          <h1 className="text-2xl font-bold text-biru">List Project</h1>
          <Button
            variant="contained !capitalize !bg-biru !text-white"
            onClick={toggleModal}
          >
            Add Project
          </Button>
        </Card>
      </section>
      <section className="flex items-center justify-between mb-5">
        <Search
          value={searchQuery}
          onChange={setSearchQuery}
          placeholder="Search project..."
        />
        <div className="flex items-center gap-2 font-poppins">
          <FaProjectDiagram
            size={20}
            className="text-oren"
          />
          Total Project: <strong>{listProject.length}</strong>
        </div>
      </section>
      <section>
        {loading ? (
          <LoadingPage />
        ) : (
          <>
            <div className="grid grid-cols-1 gap-4 mb-5 md:grid-cols-2">
              {paginatedProjects.length === 0 ? (
                <div className="flex items-center justify-center mt-20 col-span-full">
                  <NoProject />
                </div>
              ) : (
                paginatedProjects.map((project) => (
                  <CardProject
                    key={project.id}
                    title={project.name}
                    description={project.description}
                    create={<FormattedDate date={project.created_at} />}
                    link={`/project/${project.id}/task`}
                  />
                ))
              )}
            </div>
            {listProject.length > itemsPerPage && (
              <div className="flex justify-center my-5">
                <Pagination
                  count={Math.ceil(listProject.length / itemsPerPage)}
                  page={currentPage}
                  onChange={handlePageChange}
                  color="primary"
                />
              </div>
            )}
          </>
        )}
      </section>
      <ModalAddProject
        open={openModal}
        onClose={toggleModal}
        onAdd={handleAddProject}
      />
    </>
  );
};

export default Dashboard;
