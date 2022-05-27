import * as yup from 'yup';

export const validationSchema = yup.object({
  title: yup.string().required(),
  content: yup.string().required(),
  postLocation: yup.string().optional(),
  // postLocation: yup.string().required(),
  // detailedLocation: yup.string().optional(),
  // tag1: yup.string().required(),
  tag1: yup.string().optional(),
  // tag2: yup.string().required(),
  tag2: yup.string().optional(),
  // tag3: yup.string().required(),
  tag4: yup.string().optional(),
  tag5: yup.string().optional(),
  files: yup.mixed().when('url', {
    is: (value: string) => !value,
    then: yup.mixed().required('Please provide an image'),
  }),
});
