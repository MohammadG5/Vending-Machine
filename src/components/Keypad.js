import React, {Component} from 'react';
import {rowsCodes, columnsCodes} from '../fixtures/constants';
import '../App.css';

export class Keypad extends Component {
  state = {
    rowButtonClicked: false,
  };

  selectRow = e => {
    this.props.selectRow (e.target.innerHTML);
    this.setState ({
      rowButtonClicked: !this.state.rowButtonClicked,
    });
  };

  selectColumn = e => {
    this.props.selectColumn (e.target.innerHTML);
    this.setState ({
      rowButtonClicked: !this.state.rowButtonClicked,
    });
  };

  createButtonArray = (elements, onClick, disabled) => {
    const buttons = [];

    for (const [index, value] of elements.entries ()) {
      buttons.push (
        <button
          key={index}
          className="keypad-button"
          onClick={onClick}
          disabled={disabled}
        >
          {value}
        </button>
      );
    }
    return buttons;
  };

  render () {
    const {rowButtonClicked} = this.state;
    const rows = this.createButtonArray (
      rowsCodes,
      e => this.selectRow (e),
      rowButtonClicked
    );
    const columns = this.createButtonArray (
      columnsCodes,
      e => this.selectColumn (e),
      !rowButtonClicked
    );

    return (
      <div>
        <div className="rowC">
          <p> Select an Item </p>
        </div>
        <div className="rowC">
          {rows}
        </div>
        <div className="rowC">
          {columns}
        </div>
      </div>
    );
  }
}
