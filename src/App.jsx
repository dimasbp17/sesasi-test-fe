import React from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import Dashboard from './pages/dashboard/Dashboard';
import TaskList from './pages/task-list/TaskList';
import About from './pages/about/About';

const App = () => {
  return (
    <>
      <Router>
        <MainLayout>
          <Routes>
            <Route
              path="/"
              element={<Dashboard />}
            />
            <Route
              path="/project/:projectId/task"
              element={<TaskList />}
            />
            <Route
              path="/about"
              element={<About />}
            />
          </Routes>
        </MainLayout>
      </Router>
    </>
  );
};

export default App;
