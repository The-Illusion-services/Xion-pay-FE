// FormErrors.js
import React from 'react';
const errorMessages = {
  div1: ['fname', 'lname', 'phone'],
  div2: ['location', 'orderTime'],
  div3: ['zip', 'country', 'email'],
};

type FormId = keyof typeof errorMessages;

const FormErrors = ({ formId, errors }: { formId: FormId, errors: any }) => {

  return (
    <>
      {errorMessages[formId].map((errorKey, index) => (
        errors[errorKey] && <p key={index}>{errorKey} is required</p>
      ))}
    </>
  );
};

export default FormErrors;