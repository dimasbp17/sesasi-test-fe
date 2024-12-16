import * as Yup from 'yup';

export const taskValidationSchema = Yup.object({
  name: Yup.string().required('Task name is required'),
  status: Yup.string().required('Task status is required'),
});
