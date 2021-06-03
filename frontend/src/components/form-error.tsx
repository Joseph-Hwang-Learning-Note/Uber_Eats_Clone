import React from 'react';

interface FormErrorProps {
    errorMessage: string;
}

const FormError: React.FC<FormErrorProps> = ({
  errorMessage,
}) => {
  return (
    <span className="font-medium text-red-500">{errorMessage}</span>
  );
};

export default FormError;
