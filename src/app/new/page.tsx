'use client';
import React, { useState } from 'react';
import { ErrorMessage, Field, Form, Formik, FormikValues } from 'formik';
import * as Yup from 'yup';
import { Input, Textarea } from '@material-tailwind/react';
import { useRouter } from 'next/navigation';

import { createCardItem } from '@/app/helpers/client/cards';
import LoadingBoundary from '@/components/LoadingBoundary';

const validationSchema = Yup.object({
  title: Yup.string().required('Title is required'),
  description: Yup.string().required('Description is required'),
  imgSrc: Yup.string().required('Image is required'),
});
const CardForm = () => {
  const [image, setImage] = useState<File>({} as File);
  const { push } = useRouter();

  const initialValues = {
    title: '',
    description: '',
    imgSrc: null,
    file: null,
  };

  const handleUploadImage = (
    event: React.ChangeEvent<HTMLInputElement>,
    setFieldValue: (key: string, value: string) => void,
  ) => {
    const file = event.target.files![0];
    setImage(file);
    setFieldValue('imgSrc', file.name);
  };

  const onSubmit = async (values: FormikValues) => {
    const createCardItemPayload: API.CreateCardItemPayload = {
      ...(values as API.CreateCardItemPayload),
      image,
    };

    const response = await createCardItem(createCardItemPayload);
    if (response) {
      push(`/dashboard/${response.id}`);
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      validateOnBlur={false}
      onSubmit={onSubmit}
    >
      {({ dirty, touched, errors, setFieldValue, isValid, isSubmitting }) => (
        <LoadingBoundary isLoading={isSubmitting}>
          <Form className="max-w-full bg-white p-10 shadow-card">
            <div className="mb-4">
              <label className="block font-medium text-gray-700">Title</label>
              <Field
                as={Input}
                name="title"
                className={`form-input ${
                  touched.title && errors.title ? 'border-red-500' : ''
                }`}
              />
              <ErrorMessage
                name="title"
                component="div"
                className="text-red-500"
              />
            </div>
            <div className="mb-4">
              <label className="block font-medium text-gray-700">
                Description
              </label>
              <Field
                as={Textarea}
                name="description"
                className={`form-textarea ${
                  touched.description && errors.description
                    ? 'border-red-500'
                    : ''
                }`}
              />
              <ErrorMessage
                name="description"
                component="div"
                className="text-red-500"
              />
            </div>
            <div className="mb-4">
              <label className="block font-medium text-gray-700">Image</label>
              <Field
                as={Input}
                type="file"
                name="imgSrc"
                className={`form-input ${
                  touched.imgSrc && errors.imgSrc ? 'border-red-500' : ''
                }`}
                value={undefined}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                  event.preventDefault();
                  handleUploadImage(event, setFieldValue);
                }}
              />
              <ErrorMessage
                name="imgSrc"
                component="div"
                className="text-red-500"
              />
            </div>
            <button
              type="submit"
              className="w-full rounded bg-primary-100 px-4 py-2 font-semibold text-white disabled:bg-primary-200"
              disabled={!(isValid && dirty) || isSubmitting}
            >
              Submit
            </button>
          </Form>
        </LoadingBoundary>
      )}
    </Formik>
  );
};

export default CardForm;
