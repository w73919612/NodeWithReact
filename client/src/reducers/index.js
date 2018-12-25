import { combineReducers } from 'redux';
import { reducer as reduxForm } from 'redux-form'; //ES2015 syntax allows us to
                      // use "as" to change the variable name we will use in our
                      // code. "reducer" must be used when using redux-form, but
                      // perhaps "reducer" is too generic for our code, so we
                      // will use "as reduxForm" to make it more clear in our
                      // code.
                      
import authReducer from './authReducer';

export default combineReducers ({
  auth: authReducer,
  form: reduxForm
});
