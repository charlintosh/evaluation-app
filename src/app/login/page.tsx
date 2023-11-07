'use client';
import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage, FormikValues } from 'formik';
import * as Yup from 'yup';
import { Input } from '@material-tailwind/react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

function Login() {
  const [error, setError] = useState('');
  const router = useRouter();

  const validationSchema = Yup.object({
    username: Yup.string().required('Username is required'),
    password: Yup.string().required('Password is required'),
  });

  const initialValues = {
    username: '',
    password: '',
  };

  const handleSubmit = async (values: FormikValues) => {
    const res = await signIn('credentials', {
      ...values,
      redirect: false,
    });

    if (res?.error) setError(res.error as string);

    if (res?.ok) return router.push('/dashboard/');
  };

  return (
    <div className="flex h-[calc(100vh-4rem)] flex-col items-center justify-center">
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isValid, dirty, isSubmitting }) => (
          <Form className="w-3/12 bg-white p-10 px-8 py-10 shadow-card">
            {error && (
              <div className="mb-2 bg-red-500 p-2 text-white">{error}</div>
            )}
            <h1 className="mb-7 text-4xl font-semibold">Sign In</h1>

            <div className="mb-4">
              <label className="text-slate-300">Username</label>
              <Field
                as={Input}
                type="text"
                placeholder="Username"
                className="bg-zinc-800 mb-2 block w-full px-4 py-2"
                name="username"
              />
              <ErrorMessage
                name="username"
                component="div"
                className="text-red-500"
              />
            </div>

            <div className="mb-4">
              <label className="text-slate-300">Password</label>
              <Field
                as={Input}
                type="password"
                placeholder="Password"
                className="bg-zinc-800 mb-2 block w-full px-4 py-2"
                name="password"
              />
              <ErrorMessage
                name="password"
                component="div"
                className="text-red-500"
              />
            </div>

            <button
              type="submit"
              className="w-full rounded bg-primary-100 px-4 py-2 font-semibold text-white disabled:bg-primary-200"
              disabled={!(isValid && dirty) || isSubmitting}
            >
              Login
            </button>
            <span className="my-5 block">
              No account?{' '}
              <Link
                className="font-medium text-primary-100 hover:underline dark:text-blue-500"
                href="/register"
              >
                Create a new one!
              </Link>
            </span>
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default Login;
