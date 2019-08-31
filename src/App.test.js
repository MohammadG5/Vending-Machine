import React from 'react';
import ReactDOM from 'react-dom';
import {configure, shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import App from './App';
import {rowsCodes, columnsCodes} from './fixtures/constants';
import {getRandomInt} from './fixtures/utils';
configure ({adapter: new Adapter ()});

describe ('Data sanity', () => {
  it ('renders without crashing', () => {
    const div = document.createElement ('div');
    ReactDOM.render (<App />, div);
  });

  it ('initializes with default values', () => {
    const wrapper = shallow (<App />);
    expect (wrapper.state ('credit')).toBe (0);
    expect (wrapper.state ('change')).toBe (0);
    expect (wrapper.state ('selectedRow')).toBe ('');
    expect (wrapper.state ('selectedColumn')).toBe ('');
    expect (wrapper.state ('selectedItem')).toBe ('');
  });
});

describe ('Methods functionality', () => {
  it ('Selects a row', () => {
    const wrapper = shallow (<App />);
    const instance = wrapper.instance ();
    const row = rowsCodes[getRandomInt (0, rowsCodes.length - 1)];
    instance.selectRow (row);
    expect (wrapper.state ('selectedRow')).toBe (row);
  });

  it ('Selects a column', () => {
    const wrapper = shallow (<App />);
    const instance = wrapper.instance ();
    const column = columnsCodes[getRandomInt (0, columnsCodes.length - 1)];
    instance.selectColumn (column);
    expect (wrapper.state ('selectedColumn')).toBe (column);
  });

  it ('Adds credit', () => {
    const wrapper = shallow (<App />);
    const instance = wrapper.instance ();
    const addedCredit = getRandomInt (10, 1000);
    instance.addCredit (addedCredit);
    expect (wrapper.state ('credit')).toBe (addedCredit);
  });

  it ('Accumulates credit', () => {
    const wrapper = shallow (<App />);
    const instance = wrapper.instance ();
    const iterations = getRandomInt (1, 10);
    let sum = 0;
    for (let index = 0; index < iterations; index++) {
      const addedCredit = getRandomInt (10, 1000);
      sum += addedCredit;
      instance.addCredit (addedCredit);
    }
    expect (wrapper.state ('credit')).toBe (sum);
  });

  it ('Adds a credit card', () => {
    const wrapper = shallow (<App />);
    const instance = wrapper.instance ();
    instance.addCreditCard ();
    expect (wrapper.state ('hasCreditCard')).toBeTruthy;
  });

  it ('Shows the selected item', () => {
    const wrapper = shallow (<App />);
    const instance = wrapper.instance ();
    const row = rowsCodes[getRandomInt (0, rowsCodes.length - 1)];
    const column = columnsCodes[getRandomInt (0, columnsCodes.length - 1)];
    instance.selectRow (row);
    expect (instance.showSelectedItem ()).toBe (row);
    instance.selectColumn (column);
    expect (instance.showSelectedItem ()).toBe (row + column);
  });

  it ('Shows the dispensed item', () => {
    const wrapper = shallow (<App />);
    const instance = wrapper.instance ();
    const row = rowsCodes[getRandomInt (0, rowsCodes.length - 1)];
    const column = columnsCodes[getRandomInt (0, columnsCodes.length - 1)];
    instance.selectRow (row);
    instance.selectColumn (column);
    const selectedItem = wrapper.state ('selectedItem');
    const credit = selectedItem.price;
    instance.addCredit (credit);
    const expectedDispensedItem = selectedItem.quantity > 0
      ? selectedItem.id
      : '';
    expect (instance.getDispensedItem ()).toBe (expectedDispensedItem);
  });
});
