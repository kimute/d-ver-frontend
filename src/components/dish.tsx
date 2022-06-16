import {
  faTrashAlt,
  faPlusCircle,
  faBowlFood,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { restaurant_restaurant_restaurant_menu_options } from '../__generated__/restaurant';

interface IDish {
  id?: number;
  description: string;
  name: string;
  price: number;
  photo?: string;
  isClient?: boolean;
  orderStarted?: boolean;
  options?: restaurant_restaurant_restaurant_menu_options[] | null;
  addItemOrder?: (dishId: number) => void;
  removeOrder?: (dishId: number) => void;
  isSelected?: boolean;
  // addOptionItem?: (dishId: number, option: any) => void;
  children?: object;
}

export const Dish: React.FC<IDish> = ({
  id = 0,
  description,
  name,
  price,
  photo,
  isClient = false,
  orderStarted = false,
  options,
  addItemOrder,
  isSelected,
  removeOrder,
  children: dishOptions,
}) => {
  const onClick = () => {
    if (orderStarted) {
      if (!isSelected && addItemOrder) {
        return addItemOrder(id);
      }
      if (isSelected && removeOrder) {
        return removeOrder(id);
      }
    }
  };
  return (
    <div
      className={`px-8 py-4 border cursor-pointer transition-all ${
        isSelected ? ' bg-gray-800 text-gray-400' : 'border-gray-800'
      }`}
    >
      <div className="first-line:mb-5 flex items-center  justify-between ">
        <div>
          <h3 className="text-lg font-medium ">
            {name}
            {orderStarted && (
              <button
                onClick={onClick}
                className={` ml-2 px-2 ${
                  isSelected
                    ? ' text-white text-lg '
                    : 'text-yellow-400 text-lg '
                }`}
              >
                {isSelected ? (
                  <FontAwesomeIcon icon={faTrashAlt} />
                ) : (
                  <FontAwesomeIcon icon={faPlusCircle} />
                )}
              </button>
            )}
          </h3>
          <h4 className="font-medium text-gray-400">{description}</h4>
        </div>
        {photo === null ? (
          <FontAwesomeIcon
            icon={faBowlFood}
            className=" text-3xl flex w-20 h-20 text-green-700"
          />
        ) : (
          <div
            style={{ backgroundImage: `url(${photo})` }}
            className="bg-cover bg-center w-20 h-20"
          ></div>
        )}
      </div>
      <span className="text-lg">${price}</span>

      {isClient && options && options.length !== 0 && (
        <>
          <h5 className="mt-5 mb-5 font-medium text-green-700  py-2 border-b-2">
            Options
          </h5>
          {dishOptions}
        </>
      )}
    </div>
  );
};
