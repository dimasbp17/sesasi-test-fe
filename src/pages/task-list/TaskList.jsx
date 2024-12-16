import { Button, Card } from '@mui/material';
import React, { lazy, useEffect, useState } from 'react';
import { FaTasks } from 'react-icons/fa';
import { useParams } from 'react-router-dom';
import LoadingPage from '../../components/LoadingPage';
import { createTask, getTask, updateStatus } from '../../services/task';
import NoTask from './partials/NoTask';
const CardTask = lazy(() => import('../../components/card/CardTask'));
const ModalAddTask = lazy(() => import('../../components/modal/ModalAddTask'));

const TaskList = () => {
  const { projectId } = useParams();
  const [openModal, setOpenModal] = useState(false);
  const [tasksList, setTasksList] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const fetchTasks = async () => {
      try {
        const taskData = await getTask(projectId);
        const sortedTask = taskData.sort(
          (a, b) => new Date(b.created_at) - new Date(a.created_at)
        );
        setTasksList(sortedTask);
      } catch (error) {
        console.error('Failed to fetch tasks:', error);
        toast.error('Failed to get list task. Please try again.');
      } finally {
        setLoading(false);
      }
    };
    fetchTasks();
  }, [projectId]);

  const handleAddTask = async (newTask) => {
    try {
      const createdTask = await createTask(projectId, newTask);
      if (createdTask) {
        setTasksList((prevTasks) => [createdTask, ...prevTasks]);
      }
    } catch (error) {
      console.error('Failed to create task:', error);
      toast.error('Failed to create task. Please try again.');
    }
  };

  const handleUpdateStatus = async (id, newStatus) => {
    try {
      await updateStatus(id, newStatus);
      setTasksList((prevTasks) =>
        prevTasks.map((task) =>
          task.id === id ? { ...task, status: newStatus } : task
        )
      );
    } catch (error) {
      console.error('Failed to update task status:', error);
      toast.error('Failed to update status task. Please try again.');
    }
  };

  const toggleModal = () => {
    setOpenModal((prev) => !prev);
  };

  return (
    <>
      <section>
        <Card className="flex items-center justify-between p-4 my-4 font-poppins">
          <h1 className="text-2xl font-bold text-biru">List Task</h1>
          <Button
            variant="contained !capitalize !bg-biru !text-white"
            onClick={toggleModal}
          >
            Add Task
          </Button>
        </Card>
      </section>
      <section className="flex justify-end">
        <div className="flex items-center gap-2 mb-5 font-poppins">
          <FaTasks
            size={20}
            className="text-oren"
          />
          Total Task: <strong>{tasksList.length}</strong>
        </div>
      </section>
      <section>
        {loading ? (
          <LoadingPage />
        ) : (
          <div className="grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-2">
            {tasksList.length === 0 ? (
              <div className="flex items-center justify-center mt-20 col-span-full">
                <NoTask />
              </div>
            ) : (
              tasksList.map((task) => (
                <CardTask
                  key={task.id}
                  id={task.id}
                  title={task.name}
                  status={task.status}
                  updateStatus={handleUpdateStatus}
                />
              ))
            )}
          </div>
        )}
      </section>
      <ModalAddTask
        open={openModal}
        onClose={toggleModal}
        onAdd={handleAddTask}
      />
    </>
  );
};

export default TaskList;
