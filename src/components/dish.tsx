import { faDelicious } from '@fortawesome/free-brands-svg-icons';
import {
  faBowlFood,
  faCircleArrowRight,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';

interface IDish {
  description: string;
  name: string;
  price: number;
  photo: string;
}

export const Dish: React.FC<IDish> = ({ description, name, price, photo }) => {
  return (
    <div className=" px-8 py-4 border cursor-pointer hover:border-gray-800 transition-all ">
      <div className="mb-5 flex items-center  justify-between">
        <div>
          <h3 className="text-lg font-medium ">{name}</h3>
          <h4 className="font-medium">{description}</h4>
        </div>
        {photo === null ? (
          <FontAwesomeIcon
            icon={faBowlFood}
            className=" text-3xl flex text-green-700"
          />
        ) : (
          <div
            style={{ backgroundImage: `url(${photo})` }}
            className="bg-cover bg-center w-20 h-20"
          ></div>
        )}
      </div>

      <span>${price}</span>
    </div>
  );
};
