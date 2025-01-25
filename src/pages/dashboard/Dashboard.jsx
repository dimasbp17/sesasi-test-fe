import { Button, Card, Pagination } from '@mui/material';
import React, { lazy, useCallback, useEffect, useMemo, useState } from 'react';
import toast from 'react-hot-toast';
import { FaProjectDiagram } from 'react-icons/fa';
import { FaCirclePlus } from 'react-icons/fa6';
import LoadingPage from '../../components/LoadingPage';
import Search from '../../components/Search';
import SortDropdown from '../../components/SortDropdown';
import useDebounce from '../../hook/useDebounce';
import { createProject, getProject } from '../../services/project';
import { filterAndPaginate } from '../../utils/filterAndPaginate';
import NoProject from './partials/NoProject';
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
  const [sortOption, setSortOption] = useState('Newest');
  const debouncedSearchQuery = useDebounce(searchQuery, 300);
  const itemsPerPage = 12;

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

  const handleAddProject = useCallback(async (newProject) => {
    try {
      const createdProject = await createProject(newProject);
      if (createdProject) {
        setListProject((prevProjects) => [createdProject, ...prevProjects]);
      }
    } catch (error) {
      console.error('Failed to create project:', error);
      toast.error('Failed to create project. Please try again.');
    }
  }, []);

  const toggleModal = () => {
    setOpenModal((prev) => !prev);
  };

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  const handleSortChange = (option) => {
    setSortOption(option);
  };

  const totalPageCount = useMemo(
    () => Math.ceil(listProject.length / itemsPerPage),
    [listProject, itemsPerPage]
  );

  const paginatedProjects = filterAndPaginate(
    listProject,
    debouncedSearchQuery,
    sortOption,
    currentPage,
    itemsPerPage
  );

  return (
    <>
      <section>
        <Card className="flex items-center justify-between p-4 my-4 !rounded-lg font-poppins">
          <h1 className="text-2xl font-bold text-biru">List Projects</h1>
          <Button
            variant="contained"
            className="flex gap-2 !capitalize !bg-biru !text-white"
            onClick={toggleModal}
          >
            Add Project <FaCirclePlus />
          </Button>
        </Card>
      </section>
      <section className="flex flex-col mb-5 md:flex-row md:items-center md:justify-between">
        <div className="flex items-center gap-3">
          <Search
            value={searchQuery}
            onChange={setSearchQuery}
            placeholder="Search project..."
          />
          <SortDropdown
            sortOption={sortOption}
            onSortChange={handleSortChange}
          />
        </div>
        <div className="flex items-center gap-2 mt-2 font-poppins">
          <FaProjectDiagram
            size={20}
            className="text-oren"
          />
          Total Projects: <strong>{listProject.length}</strong>
        </div>
      </section>
      <section>
        {loading ? (
          <LoadingPage />
        ) : (
          <>
            <div className="grid grid-cols-1 gap-4 mb-5 md:grid-cols-2 lg:grid-cols-3">
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
                    create={project.created_at}
                    link={`/project/${project.id}/task`}
                  />
                ))
              )}
            </div>
            {listProject.length > itemsPerPage && (
              <div className="flex justify-center my-5">
                <Pagination
                  count={totalPageCount}
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
