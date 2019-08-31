import React, {Component} from 'react';
import {Header} from './components/Header';
import {Keypad} from './components/Keypad';
import {MoneySlot} from './components/Money-slots';
import {getRandomItems} from './fixtures/utils';
import './App.css';

class VendingMachine extends Component {
  state = {
    credit: 0,
    change: 0,
    selectedRow: '',
    selectedColumn: '',
    selectedItem: '',
    items: getRandomItems (25),
    changeReturned: true,
    hasCreditCard: false,
  };

  selectRow = selectedRow => {
    this.setState ({
      selectedRow,
      selectedColumn: '',
      selectedItem: '',
      changeReturned: false,
    });
  };

  selectColumn = selectedColumn => {
    this.setState ({
      selectedColumn,
      selectedItem: this.state.items.find (item => {
        return item.id === this.state.selectedRow + selectedColumn;
      }),
    });
  };

  addCredit = addedCredit => {
    this.setState ({credit: this.state.credit + addedCredit});
  };

  getCredit = () => {
    return this.state.credit / 100;
  };

  addCreditCard = () => {
    this.setState ({hasCreditCard: true});
  };

  getItemPrice () {
    return this.state.selectedItem.price / 100;
  }

  showItemPrice () {
    if (this.state.changeReturned) return '';
    if (this.state.selectedItem.quantity < 1) return 'Snack not available';
    return this.state.selectedItem ? this.getItemPrice () + '$' : '';
  }

  showSelectedItem () {
    if (this.state.changeReturned) return '';
    return this.state.selectedRow + this.state.selectedColumn;
  }

  getDispensedItem () {
    if (!this.state.changeReturned && !this.state.hasCreditCard) {
      if (this.getCredit () < this.getItemPrice ()) return '';
    }
    if (this.state.selectedItem.quantity < 1) return '';
    return this.state.selectedItem.id;
  }

  getChange () {
    if (!this.state.changeReturned) {
      if (this.state.selectedItem.quantity < 1) return '';
      const items = this.state.items;
      items.forEach ((element, index) => {
        if (element.id === this.state.selectedItem.id) {
          items[index].quantity -= 1;
        }
      });
      if (this.state.hasCreditCard) {
        const change =
          'Credit Card ' +
          (this.getCredit () > 0 ? 'and ' + this.getCredit () + '$' : '');
        this.setState ({
          change,
          items,
          hasCreditCard: false,
          credit: 0,
          changeReturned: true,
        });
        return change;
      }
      if (this.getCredit () < this.getItemPrice ()) return '';
      const change = this.getCredit () - this.getItemPrice () + '$';
      this.setState ({change, items, credit: 0, changeReturned: true});
      return change;
    }
    return this.state.change;
  }

  render () {
    return (
      <div className="App">
        <Header />
        <Keypad
          selectRow={e => this.selectRow (e)}
          selectColumn={e => this.selectColumn (e)}
        />
        <div className="rowC">
          <div className="rowC">
            <p>
              Selected Item
            </p>
          </div>
          <div className="rowC">
            <p>
              {this.showSelectedItem ()}
            </p>
          </div>
        </div>
        <div className="rowC">
          <div className="rowC">
            <p>
              Item's price
            </p>
          </div>
          <div className="rowC">
            <p>
              {this.showItemPrice ()}
            </p>
          </div>
        </div>
        <div className="rowC">
          <p>
            Credit: {' '}
            {this.state.hasCreditCard ? 'Credit Card + ' : null}
            {this.getCredit ()}
            $
          </p>
        </div>
        <MoneySlot
          addCredit={addedCredit => this.addCredit (addedCredit)}
          addCreditCard={() => this.addCreditCard ()}
        />
        <div className="rowC">
          <p>
            Dispensed Item: {' '}
            {this.state.selectedItem ? this.getDispensedItem () : ''}
          </p>
        </div>
        <div className="rowC">
          <p>
            Dispensed Change: {' '}
            {this.state.selectedItem ? this.getChange () : ''}
          </p>
        </div>
      </div>
    );
  }
}

export default VendingMachine;
