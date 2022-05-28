import React from 'react';

interface IButton {
  clickOk: boolean;
  loading: boolean;
  actionText: string;
}

export const Button: React.FC<IButton> = ({ clickOk, loading, actionText }) => (
  <button
    className={`text-lg font-medium focus:outline-none text-white py-3 px-5 rounded-lg transition-colors ${
      clickOk
        ? 'bg-gray-400 hover:bg-yellow-400 transition-colors hover:text-gray-800'
        : 'bg-gray-300 pointer-events-none '
    }`}
  >
    {loading ? 'Loading...' : actionText}
  </button>
);
