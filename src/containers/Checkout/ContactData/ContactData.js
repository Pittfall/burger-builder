import React, { Component } from 'react';
import { connect } from 'react-redux';

import { FIELDS } from './Fields';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Button from '../../../components/UI/Button/Button';
import Input from '../../../components/UI/Input/Input';
import classes from './ContactData.css';
import { SaveOrder } from '../../../Http/API/API';

class ContactData extends Component {
  state = {
    orderForm: FIELDS,
    loading: false,
    formIsValid: false
  }  

  orderHandler = (event) => {
    event.preventDefault();
    
    this.setState({loading: true});

    const formData = {};
    for (let formIdentifier in this.state.orderForm) {
      formData[formIdentifier] = this.state.orderForm[formIdentifier].value;
    }

    const order = {
        ingredients: this.props.ingredients,
        price: this.props.price,
        orderData: formData,
    }

    SaveOrder(order)
        .then(response => {
            this.setState({loading: false});
            this.props.history.push({pathname: "/"});
        })
        .catch(error => {
            this.setState({loading: false});
            alert(error); // Temporary alert.
        });
  }

  inputChangedHandler = (event, inputIdentifier) => {
    const orderFormCurrent = this.state.orderForm;
    orderFormCurrent[inputIdentifier].value = event.target.value;
    orderFormCurrent[inputIdentifier].valid = this.checkValidity(orderFormCurrent[inputIdentifier].value,
      orderFormCurrent[inputIdentifier].validation);
    orderFormCurrent[inputIdentifier].touched = true;

    let formIsValid = true;
    for (let i in orderFormCurrent) {
      if (!orderFormCurrent[i].valid) {
        formIsValid = false;
        break;
      }
    }

    this.setState({orderForm: orderFormCurrent, formIsValid: formIsValid});
  }
  
  checkValidity = (value, rules) => {
    let isValid = true;

    if (!rules) {
      return true;
    }

    if (rules.required) {
      isValid = value.trim() !== '' && isValid;  
    }

    if (rules.minLength) {
      isValid = value.length >= rules.minLength && isValid;
    }

    if (rules.maxLength) {
      isValid = value.length <= rules.maxLength && isValid;
    }

    if (rules.isEmail) {
      const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
      isValid = pattern.test(value) && isValid
  }

  if (rules.isNumeric) {
      const pattern = /^\d+$/;
      isValid = pattern.test(value) && isValid
  }

    return isValid;
  }

  render () {
    const formElements = Object.keys(this.state.orderForm).map(key => {
      const element = this.state.orderForm[key];

      return (
        <Input key={key}
          elementType={element.elementType} 
          elementConfig={element.elementConfig}
          value={element.value}
          invalid={!element.valid}
          touched={element.touched}
          changed={(event) => this.inputChangedHandler(event, key)} />
      )
    });

    let form = (
      <form onSubmit={this.orderHandler}>
        {formElements}
        <Button btnType="Success" disabled={!this.state.formIsValid}>ORDER</Button>
      </form>
    );

    if (this.state.loading) {
      form = <Spinner />;
    }

    return (
      <div className={classes.ContactData}>
        <h4>Please enter your contact info!</h4>
        {form}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
      ingredients: state.ingredients,
      price: state.totalPrice
  }
}

export default connect(mapStateToProps)(ContactData);