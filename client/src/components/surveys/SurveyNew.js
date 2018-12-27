//SurveyNew shows SurveyForm and SurveyReview
import React, { Component } from 'react';
import SurveyForm from './SurveyForm';
import SurveyFormReview from './SurveyFormReview';
import {reduxForm} from 'redux-form'; //curly braces says we just want a specific
                                      // thing from redux-form.
                                      //Field component allows us to show any
                                      // traditional HTML element

class SurveyNew extends Component {
  //classical way of assigning state with REACT:
  // constructor(props) {
  //   super(props);
  //   this.state = { new: true };
  // }

  //but with the create-react-app: (it has a nice little Babel program embedded)
  state = { showFormReview: false };

  renderContent() {
    if (this.state.showFormReview) {
      return (
        <SurveyFormReview
          onCancel={() => this.setState({ showFormReview: false })}
        />
      );
    }
    return (
      <SurveyForm
        onSurveySubmit={() => this.setState({ showFormReview: true})}
      />
    );
  }

  render() {
    return (
      <div>
        {this.renderContent()}
      </div>
    );
  }
}

export default reduxForm({
  form: 'surveyForm'
})(SurveyNew);
