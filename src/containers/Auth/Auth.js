import React, { Component } from 'react';
import { connect } from 'react-redux';

import classes from './Auth.css'
import { FIELDS } from '../../Forms/auth';
import { checkValidity } from '../../Forms/Utilities/utilities';
import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import Spinner from '../../components/UI/Spinner/Spinner';
import { signUp, signIn } from '../../store/actions/auth';

class Auth extends Component {
   state = {
      authForm: FIELDS,
      isSignUpMode: true
   }

   onChangedHandler = (event, inputIdentifier) => {
      const authFormCurrent = {
         ...this.state.authForm,
         [inputIdentifier] : {
            ...this.state.authForm[inputIdentifier],
            value: event.target.value,
            valid: checkValidity(event.target.value, this.state.authForm[inputIdentifier].validation),
            touched: true
         }
      }

      this.setState({authForm: authFormCurrent});
   }

   onSubmitHandler = (event) => {
      event.preventDefault();
      
      if (this.state.isSignUpMode) {
         this.props.onSignUp(this.state.authForm.email.value, this.state.authForm.password.value);
      } else {
         this.props.onSignIn(this.state.authForm.email.value, this.state.authForm.password.value);
      }
   }

   switchAuthModeHandler = () => {
      this.setState(prevState => {
         return { isSignUpMode: !prevState.isSignUpMode} ;
      });
   }

   render() {
      let formElements =  Object.keys(this.state.authForm).map(key => {
         const field = this.state.authForm[key];
         
         return (
            <Input key={key} 
               elementType={field.elementType}
               elementConfig={field.elementConfig}
               value={field.value}
               touched={field.touched}
               invalid={!field.valid}
               changed={(event) => this.onChangedHandler(event, key)} />
         )
      });

      if (this.props.loading) {
         formElements = <Spinner />
      }

      let errorMessage = null;

      if (this.props.error) {
         errorMessage = (
            <p>{this.props.error.message}</p>
         );
      }

      return (
         <div className={classes.Auth}>
            {errorMessage}
            <form onSubmit={this.onSubmitHandler}>
               {formElements}
               <Button btnType="Success">SUBMIT</Button>
            </form>
            <Button btnType="Danger" clicked={this.switchAuthModeHandler}>SWITCH TO {this.state.isSignUpMode ? 'SIGN IN' : 'SIGN UP'}</Button>
         </div>
      );
   }
}

const mapStateToProps = state => {
   return {
      loading: state.authReducer.loading,
      error: state.authReducer.error
   }
}

const mapDispatchToProps = dispatch => {
   return {
      onSignUp: (email, password) => dispatch(signUp(email, password)),
      onSignIn: (email, password) => dispatch(signIn(email, password))
   }
}

export default connect(mapStateToProps, mapDispatchToProps)(Auth);