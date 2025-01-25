export const sortProjects = (projects, option) => {
  switch (option) {
    case 'Newest':
      return projects.sort(
        (a, b) => new Date(b.created_at) - new Date(a.created_at)
      );
    case 'Oldest':
      return projects.sort(
        (a, b) => new Date(a.created_at) - new Date(b.created_at)
      );
    case 'Name A-Z':
      return projects.sort((a, b) => a.name.localeCompare(b.name));
    case 'Name Z-A':
      return projects.sort((a, b) => b.name.localeCompare(a.name));
    default:
      return projects;
  }
};
