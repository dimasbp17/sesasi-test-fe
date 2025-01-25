import { Button, Dialog, DialogActions, DialogContent } from '@mui/material';
import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { IoClose } from 'react-icons/io5';
import { projectValidationSchema } from '../../lib/validations/projectValidation';
import Input from '../input/Input';

const ModalAddProject = ({ open, onClose, onAdd }) => {
  const [formData, setFormData] = useState({ name: '', description: '' });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  const validate = async () => {
    try {
      await projectValidationSchema.validate(formData, { abortEarly: false });
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
      setLoading(true);
      await onAdd({ ...formData });
      toast.success('Add project success');
      setFormData({ name: '', description: '' });
      setErrors({});
      onClose();
      setLoading(false);
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
            <h1 className="text-xl font-bold">Add New Project</h1>
            <button onClick={onClose}>
              <IoClose size={20} />
            </button>
          </div>

          <Input
            label="Project Name"
            type="text"
            name="name"
            placeholder="Enter project name"
            value={formData.name}
            onChange={handleInputChange}
            error={errors.name}
          />
          <Input
            label="Project Description"
            type="text"
            name="description"
            placeholder="Enter project description"
            value={formData.description}
            onChange={handleInputChange}
            isTextarea={true}
            error={errors.description}
          />
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
            variant="contained"
            className="!bg-biru !text-white !capitalize"
            disabled={loading}
          >
            {loading ? 'Loading...' : 'Add Project'}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default ModalAddProject;
