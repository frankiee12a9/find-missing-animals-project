import * as yup from 'yup';

export const validationSchema = yup.object({
  title: yup.string().required(),
  content: yup.string().required(),
  location: yup.string().required(),
  detailedLocation: yup.string().optional(),
  // postLocation: yup.string().required(),
  // tag1: yup.string().required(),
  // tag1: yup.string().required(),
  // tag2: yup.string().required(),
  // tag3: yup.string().required(),
  tags: yup.array().min(3),
  // tag4: yup.string().optional(),
  // tag5: yup.string().optional(),
  files: yup.mixed().when('url', {
    is: (value: string) => !value,
    then: yup.mixed().required('Please provide at least an image'),
  }),
});

export const editPostValidationSchema = yup.object({
  title: yup.string().required(),
  content: yup.string().required(),
  location: yup.string().required(),
  detailedLocation: yup.string().optional(),
  // tag1: yup.string().required(),
  // tag2: yup.string().required(),
  // tag3: yup.string().required(),
  // tag4: yup.string().optional(),
  // tag5: yup.string().optional(),
  photos: yup.mixed().when('url', {
    is: (value: string) => !value,
    then: yup.mixed().required('Please provide at least an image'),
  }),
});
