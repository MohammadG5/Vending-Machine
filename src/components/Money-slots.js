import React, {Component} from 'react';
import {List} from './List';
import {coins, notes} from '../fixtures/constants';
import '../App.css';

export class MoneySlot extends Component {
  addCredit = creditType => {
    const addedCredit = this.refs[creditType].state.selectedOption.value;
    this.props.addCredit (addedCredit);
  };

  addCreditCard = () => {
    this.props.addCreditCard ();
  };

  render () {
    return (
      <div>
        <div className="rowC">
          <List ref="coins" options={coins} className="currency-list" />
          <button
            className="currency-button"
            onClick={e => this.addCredit ('coins')}
          >
            Insert a Coin
          </button>
        </div>
        <div className="rowC">
          <List ref="notes" options={notes} className="currency-list" />
          <button
            className="currency-button"
            onClick={e => this.addCredit ('notes')}
          >
            Insert a Note
          </button>
        </div>
        <div className="rowC">
          <button className="card-button" onClick={() => this.addCreditCard ()}>
            Insert a credit card
          </button>
        </div>
      </div>
    );
  }
}
