import React, {Component} from 'react';
import Select from 'react-select';
import '../App.css';

export class List extends Component {
  state = {
    selectedOption: this.props.options[0],
    options: this.props.options,
  };
  handleChange = selectedOption => {
    this.setState ({selectedOption});
  };
  render () {
    const {selectedOption, options} = this.state;

    return (
      <Select
        className="currency-list"
        value={selectedOption}
        onChange={this.handleChange}
        options={options}
      />
    );
  }
}
