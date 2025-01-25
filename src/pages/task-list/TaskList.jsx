import { Button, Card } from '@mui/material';
import React, { lazy, useCallback, useEffect, useMemo, useState } from 'react';
import { FaCheck } from 'react-icons/fa';
import { FaCirclePlus, FaPenRuler, FaRegHourglassHalf } from 'react-icons/fa6';
import { IoMdArrowRoundBack } from 'react-icons/io';
import { useNavigate, useParams } from 'react-router-dom';
import { FormattedDate } from '../../components/FormattedDate';
import LoadingPage from '../../components/LoadingPage';
import Search from '../../components/Search';
import TaskSection from '../../components/task/TaskSection';
import TaskSummary from '../../components/task/TaskSummary';
import useDebounce from '../../hook/useDebounce';
import { getProject } from '../../services/project';
import { createTask, getTask, updateStatus } from '../../services/task';

const ModalAddTask = lazy(() => import('../../components/modal/ModalAddTask'));

const TaskList = () => {
  const { projectId } = useParams();
  const navigate = useNavigate();
  const [openModal, setOpenModal] = useState(false);
  const [tasksList, setTasksList] = useState([]);
  const [project, setProject] = useState({
    name: 'Project not found',
    created_at: null,
    description: 'Description not found',
  });
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const debouncedSearchQuery = useDebounce(searchQuery, 300);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const [tasks, projects] = await Promise.all([
          getTask(projectId),
          getProject(),
        ]);
        setTasksList(
          tasks.sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
        );
        setProject(
          projects.find((proj) => proj.id === Number(projectId)) || project
        );
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [projectId]);

  const handleAddTask = useCallback(async (newTask) => {
    try {
      const createdTask = await createTask(projectId, newTask);
      setTasksList((prev) => [createdTask, ...prev]);
    } catch (error) {
      console.error('Error creating task:', error);
    }
  }, []);

  const handleUpdateStatus = useCallback(async (id, newStatus) => {
    try {
      await updateStatus(id, newStatus);
      setTasksList((prev) =>
        prev.map((task) =>
          task.id === id ? { ...task, status: newStatus } : task
        )
      );
    } catch (error) {
      console.error('Error updating task status:', error);
    }
  }, []);

  const toggleModal = () => setOpenModal((prev) => !prev);

  const filteredTasks = tasksList.filter((task) =>
    task.name.toLowerCase().includes(debouncedSearchQuery.toLowerCase())
  );

  const taskCounts = useMemo(() => {
    return tasksList.reduce(
      (acc, task) => {
        acc.total++;
        acc[task.status.toLowerCase().replace(/\s/g, '')]++;
        return acc;
      },
      { total: 0, todo: 0, inprogress: 0, completed: 0 }
    );
  }, [tasksList]);

  return (
    <>
      <section>
        <Card className="flex items-center justify-between p-4 my-4 font-poppins !rounded-lg">
          <Button
            variant="contained"
            className="!capitalize !bg-oren !text-white !font-poppins"
            onClick={(e) => {
              e.preventDefault();
              navigate(-1);
            }}
          >
            <IoMdArrowRoundBack className="mr-2" /> Back
          </Button>
          <div className="flex gap-2">
            <Search
              value={searchQuery}
              onChange={setSearchQuery}
              placeholder="Search task..."
            />
            <Button
              variant="contained"
              className="flex gap-2 !capitalize !bg-biru !text-white !font-poppins"
              onClick={toggleModal}
            >
              Add Task <FaCirclePlus />
            </Button>
          </div>
        </Card>
      </section>

      <section className="grid grid-cols-1 gap-3 mb-4 text-sm lg:grid-cols-2">
        <Card className="!text-gray-800 p-4 font-poppins !rounded-lg">
          <h1 className="mb-2 text-base font-bold text-biru">
            Project Information
          </h1>
          <div className="grid grid-cols-12">
            <h3 className="col-span-4 font-semibold">Project Name:</h3>
            <h3 className="col-span-8">{project.name}</h3>
            <h3 className="col-span-4 my-1 font-semibold">Created At:</h3>
            <h3 className="col-span-8 my-1">
              <FormattedDate date={project.created_at} />
            </h3>
            <h3 className="col-span-4 font-semibold">Description:</h3>
            <h3 className="col-span-8">{project.description}</h3>
          </div>
        </Card>
        <TaskSummary
          totalTasks={taskCounts.total}
          totalToDo={taskCounts.todo}
          totalInProgress={taskCounts.inprogress}
          totalCompleted={taskCounts.completed}
          completedPercentage={
            (taskCounts.completed / taskCounts.total) * 100 || 0
          }
        />
      </section>

      <div className="font-poppins !rounded-lg mb-4">
        <h1 className="mb-5 text-2xl font-bold text-biru">Tasks List</h1>
        <section>
          {loading ? (
            <LoadingPage />
          ) : (
            <div className="grid grid-cols-1 gap-3 lg:grid-cols-3">
              {['To Do', 'In Progress', 'Completed'].map((status, index) => (
                <TaskSection
                  key={index}
                  title={status}
                  color={
                    status === 'To Do'
                      ? 'bg-gradient-to-r from-yellow-500 to-yellow-300'
                      : status === 'In Progress'
                      ? 'bg-gradient-to-r from-blue-500 to-blue-300'
                      : 'bg-gradient-to-r from-green-500 to-green-300'
                  }
                  icon={
                    status === 'To Do' ? (
                      <FaPenRuler size={15} />
                    ) : status === 'In Progress' ? (
                      <FaRegHourglassHalf size={15} />
                    ) : (
                      <FaCheck size={15} />
                    )
                  }
                  tasks={filteredTasks.filter((task) => task.status === status)}
                  onUpdate={handleUpdateStatus}
                />
              ))}
            </div>
          )}
        </section>
      </div>
      <ModalAddTask
        open={openModal}
        onClose={toggleModal}
        onAdd={handleAddTask}
      />
    </>
  );
};

export default TaskList;
