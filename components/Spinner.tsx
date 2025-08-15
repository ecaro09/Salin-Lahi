
import React from 'react';

export const Spinner: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center gap-4 py-8">
        <div className="w-12 h-12 border-4 border-t-emerald-600 border-gray-200 rounded-full animate-spin"></div>
        <p className="text-emerald-700 font-semibold">Analyzing your item, sandali lang...</p>
    </div>
  );
};
