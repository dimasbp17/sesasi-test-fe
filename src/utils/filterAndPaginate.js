import { sortProjects } from './sort';

export const filterAndPaginate = (
  projects,
  query,
  sortOption,
  page,
  itemsPerPage
) => {
  const filteredProjects = projects.filter((project) =>
    project.name.toLowerCase().includes(query.toLowerCase())
  );
  const sortedProjects = sortProjects(filteredProjects, sortOption);
  const paginatedProjects = sortedProjects.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage
  );
  return paginatedProjects;
};
