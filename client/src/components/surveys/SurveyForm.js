//SurveyForm shows a form for a user to add input.
import _ from 'lodash'; //by convention we use the underscore to say its from lodash
import React, { Component } from 'react';
import {reduxForm, Field} from 'redux-form'; //curly braces says we just want a specific
                                      // thing from redux-form.
                                      //Field component allows us to show any
                                      // traditional HTML element
import { Link } from 'react-router-dom';
import SurveyField from './SurveyField';
import validateEmails from '../../utils/validateEmails'

import formFields from './formFields';

class SurveyForm extends Component {
  renderFields() {
    return _.map(formFields, ({ label, name }) => {
        return (
          <Field key={name} component={SurveyField} type="text" label={label} name={name}/>
        );
    });
  }
  render() {
    return (
      <div>
        <form
          //equivalent: this and next
          //onSubmit={this.props.handleSubmit(() => this.props.onSurveySubmit())}
          onSubmit={this.props.handleSubmit(this.props.onSurveySubmit)}
        >
          {this.renderFields()}
          <Link to="/surveys" className="red btn-flat white-text">
            Cancel
          </Link>
          <button type="submit" className="teal btn-flat right white-text">
            Next
            <i className="material-icons right">done</i>
          </button>
        </form>
      </div>
    );
  }
}

function validate(values) {
  const errors = {};

  errors.recipients  = validateEmails(values.recipients || '');

  _.each(formFields, ({ name, noValueErrorMsg }) => {
    if (!values[name]) {
      errors[name] = noValueErrorMsg;
    }
  });

  return errors;
}

//redux form helper
export default reduxForm({
  //validate: validate
  validate, //ES2015 syntax
  form: 'surveyForm',
  destroyOnUnmount: false
})(SurveyForm);
