//SurveyFormReview shows users their form inputs for review
import _ from 'lodash';
import React from 'react';
import { connect } from 'react-redux';
import formFields from './formFields';
import { withRouter } from 'react-router-dom';
import * as actions from '../../actions';

const SurveyFormReview = ({ onCancel, formValues, submitSurvey, history }) => {

  //repeating field so lets just request the two properties we want with ES2015 syntax
  // const reviewFields = _.map(formFields, field => {
  //   // When producing a list, we need to make sure every element has a unique key
  //   return (
  //     <div key={field.name}>
  //       <label>{field.label}</label>
  //       <div>
  //         {formValues[field.name]}
  //       </div>
  //     </div>
  //   );
  // });

  const reviewFields = _.map(formFields, ({name, label}) => {
    // When producing a list, we need to make sure every element has a unique key
    return (
      <div key={name}>
        <label>{label}</label>
        <div>
          {formValues[name]}
        </div>
      </div>
    );
  });

  return (
    <div>
      <h5>Please confirm your entries</h5>
      {reviewFields}
      <button className="yellow darken-3 white-text btn-flat" onClick={onCancel}>
        Back
      </button>
      <button onClick={() => submitSurvey(formValues, history)} className="green btn-flat white-text right">
        Send Survey
        <i className="material-icons right">email</i>
      </button>
    </div>
  );
};



function mapStateToProps(state) {
  return { formValues: state.form.surveyForm.values };
}

export default connect(mapStateToProps, actions)(withRouter(SurveyFormReview));
