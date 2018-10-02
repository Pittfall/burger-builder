import React, { Component } from 'react';

import classes from './Auth.css'
import { FIELDS } from '../../Forms/auth';
import { checkValidity } from '../../Forms/Utilities/utilities';
import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';

class Auth extends Component {
   state = {
      authForm: FIELDS,
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

   render() {
      const formElements =  Object.keys(this.state.authForm).map(key => {
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

      return (
         <div className={classes.Auth}>
            <form>
               {formElements}
               <Button btnType="Success">SUBMIT</Button>
            </form>
         </div>
      );
   }
}

export default Auth;