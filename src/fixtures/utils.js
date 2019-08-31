import {rowsCodes, columnsCodes} from './constants';

export const getRandomInt = (min, max) => {
  const lowerLimit = Math.ceil (min);
  const upperLimit = Math.floor (max);
  return (
    Math.floor (Math.random () * (upperLimit - lowerLimit + 1)) + lowerLimit
  );
};

export const getRandomItems = numberOfItems => {
  const items = [];
  rowsCodes.forEach (row => {
    columnsCodes.forEach (column => {
      items.push ({
        id: row + column,
        price: getRandomInt (10, 1000),
        quantity: getRandomInt (1, 10),
      });
    });
  });
  return items;
};
