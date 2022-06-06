import React from 'react';

interface IFormError {
  errorMessage: string;
}

export const FormError: React.FC<IFormError> = ({ errorMessage }) => (
  <span role="alert" className="font-medium text-red-500">
    {errorMessage}
  </span>
);
