import React from 'react';
import { Link } from 'react-router-dom';

interface IRestaurant {
  id: string;
  coverImg: string;
  name: string;
  categoryName?: string;
}

export const Restaurant: React.FC<IRestaurant> = ({
  id,
  coverImg,
  name,
  categoryName,
}) => {
  return (
    <Link to={`/restaurant/${id}`}>
    <div className="flex flex-col">
      <div
        style={{ backgroundImage: `url(${coverImg})` }}
        className=" bg-gray-400 bg-cover bg-center mb-3 py-28 "
      ></div>
      <h3 className="text-xl ">{name}</h3>

      <span className=" border-t-2  border-gray-400 text-gray-400 ">
        {categoryName}
      </span>
    </div>
    </Link>
  );
};
