import React from 'react';

interface CAtegory {
  category: {
    coverImage?: string | null;
    name: string;
  };
}

export const Category: React.FC<CAtegory> = ({ category }) => {
  return (
    <div className="flex flex-col group items-center cursor-pointer">
      <div
        className="w-16 h-16 bg-cover bg-gray-200 group-hover:bg-gray-300 rounded-full"
        style={{
          backgroundImage: `url(${category.coverImage})`,
        }}
      ></div>
      <span className="mt-1 text-sm text-center text-green-700 font-medium 2xl:text-sm">
        {category.name}
      </span>
    </div>
  );
};
