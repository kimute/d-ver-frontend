import { faCheckSquare, faSquare } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';

interface IDish {
  isSelected: boolean;
  name: string;
  extra?: number | null;
  dishId: number;
  addOptionItem: (dishId: number, optionName: string) => void;
  removeOptionItem: (dishId: number, optionName: string) => void;
}

export const DishOption: React.FC<IDish> = ({
  isSelected,
  name,
  extra,
  addOptionItem,
  removeOptionItem,
  dishId,
}) => {
  const onClick = () => {
    if (isSelected) {
      removeOptionItem(dishId, name);
    } else {
      addOptionItem(dishId, name);
    }
  };
  return (
    <span
      onClick={onClick}
      className={`flex  items-center ${isSelected ? 'text-yellow-400' : ''}`}
    >
      <h6 className="mr-2">{name}</h6>
      {extra && <h6 className="text-sm opacity-75">(${extra})</h6>}
      {isSelected ? (
        <FontAwesomeIcon className="text-center mx-2" icon={faCheckSquare} />
      ) : (
        <FontAwesomeIcon className="text-center mx-2" icon={faSquare} />
      )}
    </span>
  );
};
