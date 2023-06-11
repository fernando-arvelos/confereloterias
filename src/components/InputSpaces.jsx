import React, { Component } from 'react';

class InputSpaces extends Component {
  state = {
    value: '',
  };

  handleInputChange = ({ target }) => {
    const inputValue = target.value;
    const formattedValue = inputValue.replace(/\s/g, '').match(/.{1,2}/g)?.join(' ');

    this.setState({
      value: formattedValue || inputValue,
    });
  };

  render() {
    const { value } = this.state;
    return (
      <>
        <label htmlFor="userGame">Digite aqui sua aposta</label>
        <input
          type="text"
          id="userGame"
          value={ value }
          onChange={ this.handleInputChange }
        />
      </>
    );
  }
}

export default InputSpaces;
