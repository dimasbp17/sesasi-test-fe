import { Button, Dialog, DialogActions, DialogContent } from '@mui/material';
import React, { useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { IoClose } from 'react-icons/io5';
import { statusTask } from '../../data/constant/statusTask';
import { taskValidationSchema } from '../../lib/validations/taskValidation';
import Input from '../input/Input';

const ModalAddTask = ({ open, onClose, onAdd }) => {
  const [formData, setFormData] = useState({ name: '', status: '' });
  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  const handleStatusChange = (status) => {
    setFormData((prev) => ({ ...prev, status }));
    setErrors((prev) => ({ ...prev, status: '' }));
  };

  const validate = async () => {
    try {
      await taskValidationSchema.validate(formData, { abortEarly: false });
      setErrors({});
      return true;
    } catch (validationErrors) {
      const newErrors = {};
      validationErrors.inner.forEach((error) => {
        newErrors[error.path] = error.message;
      });
      setErrors(newErrors);
      return false;
    }
  };

  const handleAdd = async () => {
    const isValid = await validate();
    if (isValid) {
      await onAdd({ ...formData });
      toast.success('Add task success');
      setFormData({ name: '', status: '' });
      setErrors({});
      onClose();
    }
  };

  return (
    <>
      <Dialog
        open={open}
        onClose={onClose}
        fullWidth
        maxWidth="sm"
        className="font-poppins"
      >
        <DialogContent>
          <div className="flex items-center justify-between mb-5">
            <h1 className="text-xl font-bold">Add New Task</h1>
            <button onClick={onClose}>
              <IoClose size={20} />
            </button>
          </div>

          <Input
            label="Task Name"
            type="text"
            name="name"
            placeholder="Enter task name"
            value={formData.name}
            onChange={handleInputChange}
            error={errors.name}
          />
          <div>
            <h1 className="block mb-1 text-sm font-medium text-gray-800">
              Task Status
            </h1>
            <div className="flex gap-2">
              {statusTask.map((status) => (
                <button
                  key={status.id}
                  className={`rounded-full px-3 py-2 text-sm border transition-all ${
                    formData.status === status.status
                      ? 'bg-blue-500 text-white border-blue-500'
                      : 'bg-white text-blue-500 border-blue-500'
                  }`}
                  onClick={() =>
                    handleStatusChange(
                      formData.status === status.status ? '' : status.status
                    )
                  }
                >
                  {status.status}
                </button>
              ))}
            </div>
            {errors.status && (
              <p className="text-xs text-red-500">{errors.status}</p>
            )}
          </div>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={onClose}
            color="error"
            className="!capitalize"
          >
            Cancel
          </Button>
          <Button
            onClick={handleAdd}
            color="primary"
            variant="contained"
            className="!bg-biru !text-white !capitalize"
          >
            Add Task
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default ModalAddTask;
