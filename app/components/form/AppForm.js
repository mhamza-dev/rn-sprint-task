import React from "react";

// 3rd party
import { Formik } from "formik";

const AppForm = ({
  initialValues,
  validationSchema,
  onSubmit,
  children,
  innerRef,
}) => {
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
      {...(innerRef && { innerRef })}
    >
      {() => <>{children}</>}
    </Formik>
  );
};

export default AppForm;
