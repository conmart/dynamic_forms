import React, { Component } from 'react';
import './App.css';

const buildFormState = (data) => {
  const state = {};
  for (let input of data) {
    const defaultValue = input['type'] === 'checkbox' ? false : '';
    state[input['name']] = defaultValue;
  }
  return state;
};

class Form extends Component {
  constructor(props) {
    super(props);
    const formState = buildFormState(this.props.data);
    this.state = {
      formState,
    };
  }

  changeInput = (e) => {
    const { formState } = this.state;
    const newFormState = { ...formState };
    const inputValue = e.target.type === 'checkbox'
      ? e.target.checked
      : e.target.value;
    newFormState[e.target.name] = inputValue;
    this.setState({ formState: newFormState });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const { saveResults } = this.props;
    const { formState } = this.state;
    const JSONData = JSON.stringify(formState);
    saveResults(JSONData);
  };

  render() {
    const { data } = this.props;
    const { formState } = this.state;

    return (
      <form className="form">
        {data.map((field) => {
          let showField = true;
          const conditional = field['conditional'];
          if (conditional) {
            const fn = conditional['show_if'];
            const conditionalValue = formState[conditional['name']];
            showField = fn(conditionalValue);
          }
          if (showField) {
            return (
              <div className="inputWrapper" key={field['name']}>
                <label>{field['human_label']}</label>
                <input
                  type={field['type']}
                  name={field['name']}
                  onChange={this.changeInput}
                  value={formState[field['name']]}
                />
              </div>
            );
          }
          return '';
        })}
        <button onClick={this.handleSubmit} type="submit">
          Submit
        </button>
      </form>
    );
  }
}

export default Form;
