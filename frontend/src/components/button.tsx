import React from 'react';

interface ButtonProps {
    canClick: boolean;
    loading: boolean;
    actionText: string;
}

const Button: React.FC<ButtonProps> = ({
  canClick,
  loading,
  actionText,
}) => {
  return (
    <button className={`text-lg font-medium py-4 focus:outline-none text-white transition-colors ${
      canClick ? 'bg-lime-600 focus:bg-lime-700' : 'bg-gray-300 pointer-events-none'
    }`}>
      { loading ? 'Loading...' : actionText }
    </button>
  );
};

export default Button;
